import { ImageResponse } from "next/og";
import data from "@/data/types.json";

export const runtime = "edge";
export const alt = "16JobType 診断結果";

function bgFor(code?: string) {
  if (!code) return "linear-gradient(135deg, #34D399 0%, #60A5FA 50%, #A78BFA 100%)";
  return code.startsWith("E")
    ? "linear-gradient(135deg, #34D399 0%, #60A5FA 50%, #A78BFA 100%)"
    : "linear-gradient(135deg, #A78BFA 0%, #60A5FA 50%, #34D399 100%)";
}

export async function GET(_: Request, { params }: { params: { code: string } }) {
  const p = (data as any)[params.code];
  const name = p?.name ?? "16JobType";
  const emoji = p?.emoji ?? "✨";
  const code = p?.code ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: bgFor(code),
          color: "#111827",
          padding: 60,
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 800 }}>16JobType</div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ fontSize: 120 }}>{emoji}</div>
          <div>
            <div style={{ fontSize: 60, fontWeight: 800 }}>{name}</div>
            <div style={{ fontSize: 36, opacity: 0.85 }}>{code}</div>
          </div>
        </div>
        <div style={{ fontSize: 28 }}>あなたの働き方が分かる！16タイプ働き方診断</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
