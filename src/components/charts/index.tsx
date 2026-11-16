"use client";

// Small, dependency-free SVG charts. Data-first: thin lines, direct labels,
// no decorative gradients.

export type Series = { name: string; color: string; points: { x: string; y: number }[] };

export function LineChart({ series, height = 180, yMax = 100, emptyText = "No data yet" }: { series: Series[]; height?: number; yMax?: number; emptyText?: string }) {
  const n = Math.max(0, ...series.map((s) => s.points.length));
  if (n === 0) return <p className="py-10 text-center text-sm text-faint">{emptyText}</p>;
  const W = 600;
  const H = height;
  const pad = { l: 30, r: 12, t: 10, b: 22 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const x = (i: number, len: number) => pad.l + (len <= 1 ? iw / 2 : (i / (len - 1)) * iw);
  const y = (v: number) => pad.t + ih - (Math.max(0, Math.min(yMax, v)) / yMax) * ih;
  const grid = [0, 25, 50, 75, 100].filter((g) => g <= yMax);
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Trend chart: ${series.map((s) => s.name).join(", ")}`}>
        {grid.map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={W - pad.r} y1={y(g)} y2={y(g)} stroke="var(--line)" strokeWidth={1} />
            <text x={pad.l - 6} y={y(g) + 3} textAnchor="end" fontSize={10} fill="var(--faint)">
              {g}
            </text>
          </g>
        ))}
        {series.map((s) => {
          const len = s.points.length;
          const d = s.points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i, len).toFixed(1)},${y(p.y).toFixed(1)}`).join(" ");
          return (
            <g key={s.name}>
              <path d={d} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
              {s.points.map((p, i) => (
                <circle key={i} cx={x(i, len)} cy={y(p.y)} r={len > 30 ? 1.5 : 3} fill={s.color}>
                  <title>{`${s.name} · ${p.x}: ${Math.round(p.y)}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
      </svg>
      {series.length > 1 && (
        <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          {series.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}

export function BarChart({
  data,
  height = 160,
  max,
  unit = "",
  highlightIndex,
}: {
  data: { label: string; value: number; target?: number }[];
  height?: number;
  max?: number;
  unit?: string;
  highlightIndex?: number;
}) {
  if (!data.length) return null;
  const W = 600;
  const H = height;
  const pad = { l: 8, r: 8, t: 16, b: 22 };
  const m = max ?? Math.max(1, ...data.map((d) => Math.max(d.value, d.target ?? 0)));
  const bw = (W - pad.l - pad.r) / data.length;
  const ih = H - pad.t - pad.b;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Bar chart">
      {data.map((d, i) => {
        const h = (d.value / m) * ih;
        const bx = pad.l + i * bw + bw * 0.18;
        const w = bw * 0.64;
        const active = highlightIndex === i;
        return (
          <g key={d.label}>
            <rect x={bx} y={pad.t} width={w} height={ih} rx={4} fill="var(--surface-2)" />
            <rect x={bx} y={pad.t + ih - h} width={w} height={Math.max(0, h)} rx={4} fill={active ? "var(--accent)" : "var(--faint)"} opacity={active ? 1 : 0.55}>
              <title>{`${d.label}: ${Math.round(d.value)}${unit}`}</title>
            </rect>
            {d.target !== undefined && (
              <line x1={bx - 2} x2={bx + w + 2} y1={pad.t + ih - (d.target / m) * ih} y2={pad.t + ih - (d.target / m) * ih} stroke="var(--ink)" strokeDasharray="3 3" strokeWidth={1} opacity={0.4} />
            )}
            {d.value > 0 && (
              <text x={bx + w / 2} y={pad.t + ih - h - 4} textAnchor="middle" fontSize={10} fill="var(--muted)">
                {Math.round(d.value)}
              </text>
            )}
            <text x={bx + w / 2} y={H - 6} textAnchor="middle" fontSize={10} fill="var(--faint)">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ScoreBar({ label, value, band }: { label: string; value: number | undefined; band?: string }) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-sm">
        <span className="text-ink">{label}</span>
        <span className="tabular-nums text-muted">
          {value === undefined ? "—" : value}
          {band && <span className="ml-2 text-xs text-faint">{band}</span>}
        </span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div className="absolute inset-y-0 left-[60%] w-px bg-line" />
        <div className="absolute inset-y-0 left-[80%] w-px bg-line" />
        {value !== undefined && <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${value}%` }} />}
      </div>
    </div>
  );
}
