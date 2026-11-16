"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { GlossMode, Settings } from "@/lib/domain/types";
import { audioStore, getState, replaceState, resetAll, saveProfile, updateSettings, useAppState, useToday } from "@/store/store";
import { buildExport, readImport } from "@/lib/storage/repository";
import { formatDmy, isDateKey, TOTAL_DAYS } from "@/lib/domain/dates";
import { dateOfLesson } from "@/lib/engine/plan";
import { defaultProfile, ProfileForm } from "@/components/profile/ProfileForm";
import { useAiStatus } from "@/components/writing/WritingEditor";
import { pick } from "@/lib/i18n";
import { Badge, Button, ButtonLink, Card, Field, Input, Loading, Notice, PageHeader, SectionTitle, Select } from "@/components/ui";

export default function SettingsPage() {
  const state = useAppState();
  const today = useToday();
  const router = useRouter();
  const ai = useAiStatus();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ tone: "good" | "bad"; text: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState("");
  const [withAudio, setWithAudio] = useState(true);
  const [busy, setBusy] = useState(false);
  if (!state || !today) return <Loading />;
  const lang = state.settings.uiLanguage;
  const profile = state.profile ?? defaultProfile();
  const s = state.settings;
  const set = (p: Partial<Settings>) => updateSettings(p);

  async function doExport() {
    setBusy(true);
    try {
      const file = await buildExport(getState(), withAudio ? audioStore : undefined);
      const blob = new Blob([JSON.stringify(file, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `english-os-backup-${today}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
      setMsg({ tone: "good", text: pick(lang, "Đã xuất dữ liệu.", "Data exported.") });
    } catch {
      setMsg({ tone: "bad", text: pick(lang, "Không xuất được dữ liệu.", "Export failed.") });
    }
    setBusy(false);
  }

  async function doImport(file: File) {
    setBusy(true);
    const res = await readImport(await file.text(), audioStore);
    setBusy(false);
    if (!res.ok) return setMsg({ tone: "bad", text: res.error });
    if (!window.confirm(pick(lang, "Nhập dữ liệu sẽ THAY THẾ toàn bộ tiến độ hiện tại trên thiết bị này. Tiếp tục?", "Importing will REPLACE all current progress on this device. Continue?"))) return;
    replaceState(res.state);
    setMsg({ tone: "good", text: pick(lang, `Đã nhập dữ liệu (${res.audioCount} bản ghi âm).`, `Data imported (${res.audioCount} recordings).`) });
  }

  return (
    <div className="space-y-6">
      <PageHeader title={pick(lang, "Cài đặt", "Settings")} />
      {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
      {!state.onboardingComplete && <Notice tone="info" action={<ButtonLink size="sm" href="/onboarding">{pick(lang, "Tiếp tục thiết lập", "Continue setup")}</ButtonLink>}>{pick(lang, "Bạn chưa hoàn tất bước thiết lập ban đầu.", "You haven't finished the first-run setup.")}</Notice>}

      <Card>
        <SectionTitle title={pick(lang, "Giao diện", "Interface")} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label={pick(lang, "Ngôn ngữ giao diện", "Interface language")} htmlFor="s-lang">
            <Select id="s-lang" value={s.uiLanguage} onChange={(e) => set({ uiLanguage: e.target.value as "vi" | "en" })}>
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </Select>
          </Field>
          <Field label={pick(lang, "Chú thích tiếng Việt cho từ vựng", "Vietnamese glosses")} htmlFor="s-gloss" hint={pick(lang, "Tự động: giảm dần sau Giai đoạn 2.", "Auto: fades out after Phase 2.")}>
            <Select id="s-gloss" value={s.glossMode} onChange={(e) => set({ glossMode: e.target.value as GlossMode })}>
              <option value="auto">{pick(lang, "Tự động (giảm dần)", "Auto (fade out)")}</option>
              <option value="always">{pick(lang, "Luôn hiện", "Always show")}</option>
              <option value="never">{pick(lang, "Không hiện", "Never show")}</option>
            </Select>
          </Field>
          <Field label={pick(lang, "Chế độ màu", "Theme")} htmlFor="s-theme">
            <Select id="s-theme" value={s.theme} onChange={(e) => set({ theme: e.target.value as Settings["theme"] })}>
              <option value="system">{pick(lang, "Theo hệ thống", "System")}</option>
              <option value="light">{pick(lang, "Sáng", "Light")}</option>
              <option value="dark">{pick(lang, "Tối", "Dark")}</option>
            </Select>
          </Field>
        </div>
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Hồ sơ học tập", "Learning profile")} />
        <ProfileForm value={profile} onChange={saveProfile} lang={lang} />
        <p className="mt-4 text-xs text-faint">{pick(lang, "Thay đổi được lưu ngay.", "Changes are saved immediately.")}</p>
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Lịch học", "Schedule")} />
        <p className="text-sm text-muted">
          {pick(lang, "Ngày 1", "Day 1")}: <strong className="text-ink">{formatDmy(dateOfLesson(state, 1))}</strong> · {pick(lang, "Ngày 90", "Day 90")}: <strong className="text-ink">{formatDmy(dateOfLesson(state, TOTAL_DAYS))}</strong> · Asia/Ho_Chi_Minh
        </p>
        {s.planOffsetDays > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <Badge tone="warn">{pick(lang, `Lịch đã lùi ${s.planOffsetDays} ngày`, `Plan moved forward by ${s.planOffsetDays} days`)}</Badge>
            <button className="text-muted underline" onClick={() => set({ planOffsetDays: 0 })}>{pick(lang, "Khôi phục lịch gốc (16/11/2026)", "Restore the original calendar (16/11/2026)")}</button>
          </div>
        )}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-muted">{pick(lang, "Nâng cao: giả lập ngày (để xem trước/kiểm thử)", "Advanced: simulate a date (preview / testing)")}</summary>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <Field label={pick(lang, "Ngày giả lập", "Simulated date")} htmlFor="s-sim">
              <Input id="s-sim" type="date" value={s.simulatedDate ?? ""} onChange={(e) => set({ simulatedDate: isDateKey(e.target.value) ? e.target.value : undefined })} className="!w-48" />
            </Field>
            {s.simulatedDate && <Button variant="secondary" onClick={() => set({ simulatedDate: undefined })}>{pick(lang, "Dùng ngày thật", "Use the real date")}</Button>}
          </div>
          <p className="mt-2 text-xs text-faint">{pick(lang, "Khi bật, ứng dụng coi ngày này là “hôm nay”.", "While set, the app treats this date as “today”.")}</p>
        </details>
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Dữ liệu & quyền riêng tư", "Data & privacy")} />
        <p className="text-sm leading-relaxed text-muted">{pick(lang, "Mọi dữ liệu học tập nằm trong trình duyệt này: tiến độ trong localStorage, bản ghi âm trong IndexedDB. Không có tài khoản, không gửi lên máy chủ. Hãy xuất file sao lưu định kỳ.", "All learning data stays in this browser: progress in localStorage, recordings in IndexedDB. No account, nothing is uploaded. Export a backup regularly.")}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button onClick={doExport} disabled={busy}>{pick(lang, "Xuất dữ liệu (JSON)", "Export data (JSON)")}</Button>
          <label className="inline-flex items-center gap-2 text-sm text-muted"><input type="checkbox" checked={withAudio} onChange={(e) => setWithAudio(e.target.checked)} className="accent-[var(--accent)]" />{pick(lang, "Kèm bản ghi âm", "Include recordings")}</label>
          <Button variant="secondary" onClick={() => fileRef.current?.click()} disabled={busy}>{pick(lang, "Nhập dữ liệu", "Import data")}</Button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" aria-label="Import file" onChange={(e) => { const f = e.target.files?.[0]; if (f) void doImport(f); e.target.value = ""; }} />
        </div>
        <div className="mt-6 rounded-xl border border-bad/30 p-4">
          <p className="text-sm font-medium text-ink">{pick(lang, "Xóa toàn bộ dữ liệu", "Reset all data")}</p>
          <p className="mt-1 text-sm text-muted">{pick(lang, "Xóa tiến độ, bài viết, từ vựng và bản ghi âm. Không thể hoàn tác — hãy xuất dữ liệu trước. Gõ RESET để xác nhận.", "Deletes progress, writing, vocabulary and recordings. This cannot be undone — export first. Type RESET to confirm.")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Input aria-label="Type RESET" value={confirmReset} onChange={(e) => setConfirmReset(e.target.value)} placeholder="RESET" className="!w-32" />
            <Button variant="danger" disabled={confirmReset !== "RESET"} onClick={async () => { await resetAll(); router.push("/onboarding"); }}>{pick(lang, "Xóa dữ liệu", "Reset data")}</Button>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Phản hồi AI (tùy chọn)", "AI feedback (optional)")} />
        <p className="text-sm text-muted">
          {ai === null ? "…" : ai.available ? pick(lang, `Đã kết nối: ${ai.provider}. Nút phản hồi AI xuất hiện trong phần Viết, Nói và Tổng kết tuần.`, `Connected: ${ai.provider}. AI feedback buttons appear in Writing, Speaking and Weekly review.`) : pick(lang, "Chưa cấu hình. Ứng dụng hoạt động đầy đủ với rubric tự đánh giá. Để bật, đặt ANTHROPIC_API_KEY trong file .env.local trên máy chủ (xem README) — khóa không bao giờ nằm trong trình duyệt.", "Not configured. The app works fully with self-assessment rubrics. To enable it, set ANTHROPIC_API_KEY in .env.local on the server (see README) — the key never reaches the browser.")}
        </p>
      </Card>
    </div>
  );
}
