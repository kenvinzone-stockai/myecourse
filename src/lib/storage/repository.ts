// Storage interfaces. The app talks only to these, so a cloud backend
// (e.g. Supabase/Postgres) can replace the browser adapters later.

import type { AppState } from "../domain/types";
import { createInitialState, parseState } from "./schema";

export interface StateRepository {
  load(): { state: AppState; warning?: string };
  save(state: AppState): void;
  clear(): void;
}

export interface AudioStore {
  put(id: string, blob: Blob): Promise<void>;
  get(id: string): Promise<Blob | undefined>;
  delete(id: string): Promise<void>;
  list(): Promise<string[]>;
  clear(): Promise<void>;
}

export const STORAGE_KEY = "elos:state:v1";

export class LocalStorageRepository implements StateRepository {
  constructor(private key = STORAGE_KEY) {}

  load() {
    if (typeof window === "undefined") return { state: createInitialState() };
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(this.key);
    } catch {
      return { state: createInitialState(), warning: "Browser storage is unavailable (private mode?). Progress will not be saved." };
    }
    if (!raw) return { state: createInitialState() };
    try {
      const parsed = parseState(JSON.parse(raw));
      if (parsed.ok) return { state: parsed.state };
      this.backupCorrupt(raw);
      return { state: createInitialState(), warning: `Saved data could not be read (${parsed.error}). A backup copy was kept; the app started fresh.` };
    } catch {
      this.backupCorrupt(raw);
      return { state: createInitialState(), warning: "Saved data was corrupted. A backup copy was kept; the app started fresh." };
    }
  }

  save(state: AppState) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(this.key, JSON.stringify(state));
  }

  clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(this.key);
  }

  private backupCorrupt(raw: string) {
    try {
      window.localStorage.setItem(`elos:corrupt-backup:${Date.now()}`, raw);
    } catch {
      /* storage full — nothing else we can do */
    }
  }
}

const DB_NAME = "elos-audio";
const STORE = "recordings";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") return reject(new Error("IndexedDB unavailable"));
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE, mode);
        const req = fn(t.objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        t.oncomplete = () => db.close();
      }),
  );
}

export class IndexedDbAudioStore implements AudioStore {
  async put(id: string, blob: Blob) {
    await tx("readwrite", (s) => s.put(blob, id));
  }
  async get(id: string) {
    return (await tx<Blob | undefined>("readonly", (s) => s.get(id) as IDBRequest<Blob | undefined>)) ?? undefined;
  }
  async delete(id: string) {
    await tx("readwrite", (s) => s.delete(id));
  }
  async list() {
    return (await tx<IDBValidKey[]>("readonly", (s) => s.getAllKeys())).map(String);
  }
  async clear() {
    await tx("readwrite", (s) => s.clear());
  }
}

// ── Export / import ────────────────────────────────────────────────────────

export type ExportFile = {
  app: "english-learning-os";
  formatVersion: 1;
  exportedAt: string;
  state: AppState;
  audio?: { id: string; type: string; data: string }[]; // base64
};

async function blobToBase64(blob: Blob): Promise<string> {
  const buf = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return btoa(bin);
}

function base64ToBlob(data: string, type: string): Blob {
  const bin = atob(data);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type });
}

export async function buildExport(state: AppState, audioStore?: AudioStore): Promise<ExportFile> {
  const file: ExportFile = { app: "english-learning-os", formatVersion: 1, exportedAt: new Date().toISOString(), state };
  if (audioStore) {
    const ids = await audioStore.list();
    file.audio = [];
    for (const id of ids) {
      const blob = await audioStore.get(id);
      if (blob) file.audio.push({ id, type: blob.type || "audio/webm", data: await blobToBase64(blob) });
    }
  }
  return file;
}

export type ImportResult = { ok: true; state: AppState; audioCount: number } | { ok: false; error: string };

export async function readImport(text: string, audioStore?: AudioStore): Promise<ImportResult> {
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return { ok: false, error: "The file is not valid JSON." };
  }
  const obj = json as Partial<ExportFile>;
  if (!obj || obj.app !== "english-learning-os") return { ok: false, error: "This file was not exported from English Learning OS." };
  const parsed = parseState(obj.state);
  if (!parsed.ok) return { ok: false, error: `Invalid learning data: ${parsed.error}` };
  let audioCount = 0;
  if (audioStore && Array.isArray(obj.audio)) {
    for (const a of obj.audio) {
      if (typeof a?.id === "string" && typeof a?.data === "string") {
        await audioStore.put(a.id, base64ToBlob(a.data, a.type || "audio/webm"));
        audioCount++;
      }
    }
  }
  return { ok: true, state: parsed.state, audioCount };
}
