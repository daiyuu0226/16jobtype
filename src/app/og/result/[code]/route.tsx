// src/app/og/result/[code]/route.tsx
import { ImageResponse } from "next/og";
import data from "@/data/types.json";

export const runtime = "edge";

/** 結果コードの正規化（全角/各種ダッシュ→半角ハイフン、大文字化、空白除去） */
function normalizeCode(raw: string) {
  try { raw = decodeURIComponent(raw); } catch {}
  return raw.replace(/[‐-‒–—−―ー－]/g, "-").replace(/\s+/g, "").toUpperCase();
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code: raw } = await params;
  const code = normalizeCode(raw);

  const p = (data as any)[code];
  const name = p?.name ?? "16JobType";
  const emoji = p?.emoji ?? "✨";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #34D399 0%, #60A5FA 50%, #A78BFA 100%)",
          color: "#111827",
          padding: 60,
          justifyContent: "space-between",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 800 }}>16JobType</div>

        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ fontSize: 120 }}>{emoji}</div>
          <div>
            <div style={{ fontSize: 60, fontWeight: 800 }}>{name}</div>
            <div style={{ fontSize: 36, opacity: 0.85 }}>{p?.code ?? code}</div>
          </div>
        </div>

        <div style={{ fontSize: 28 }}>あなたの働き方が分かる！16タイプ働き方診断</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
