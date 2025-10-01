import data from "@/data/types.json";
import Link from "next/link";
import type { Metadata } from "next";
import ShareBox from "@/components/ShareBox";

type Params = { code: string };

function safeDecode(s: string) { try { return decodeURIComponent(s); } catch { return s; } }
function normalizeCode(raw: string): string {
  return safeDecode(raw).replace(/[‐-‒–—−―ー－]/g, "-").replace(/\s+/g, "").toUpperCase();
}

/** Next.js 15: params は Promise なので await が必要 */
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { code: raw } = await params;
  const code = normalizeCode(raw);
  const profile = (data as any)[code];

  const title = profile ? `${profile.name} | 16JobType` : "結果 | 16JobType";
  const description = profile ? `${profile.name}（${profile.code}）` : "診断結果";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const og = `${site}/og/result/${encodeURIComponent(code)}`;

  return {
    title,
    description,
    openGraph: { title, description, images: [og], url: `${site}/result/${code}` },
    twitter: { card: "summary_large_image", title, description, images: [og] }
  };
}

export default async function ResultPage(
  { params }: { params: Promise<Params> }
) {
  const { code: raw } = await params;
  const code = normalizeCode(raw);
  const profile = (data as any)[code];

  if (!profile) {
    return (
      <main className="mx-auto max-w-3xl p-6 space-y-4">
        <h1 className="text-2xl font-bold">結果が見つかりません</h1>
        <p className="text-gray-600">受け取ったコード: <code>{raw}</code></p>
        <p className="text-gray-600">正規化後: <code>{code}</code></p>
        <p className="text-gray-600">有効な例: <code>E-P-S-L</code> / <code>I-T-C-F</code> など</p>
        <div className="pt-2">
          <Link href="/" className="text-blue-600 underline">トップへ戻る</Link>
        </div>
      </main>
    );
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const shareText =
    `あなたは ${profile.emoji} ${profile.name}（${profile.code}） でした。\n` +
    `${site}/result/${code}\n\n#16JobType診断 #16ジョブタイプ診断`;

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="text-5xl" aria-hidden>{profile.emoji}</div>
        <h1 className="text-3xl font-extrabold">
          {profile.name} <span className="text-base text-gray-500 ml-2">({profile.code})</span>
        </h1>
      </div>

      <section className="p-5 rounded-2xl border shadow bg-white">
        <h2 className="text-xl font-semibold mb-2">分析</h2>
        <p className="whitespace-pre-wrap leading-relaxed">{profile.analysis}</p>
      </section>

      <div className="grid md:grid-cols-2 gap-4">
        <section className="p-5 rounded-2xl border shadow bg-white">
          <h3 className="font-semibold mb-2">強み</h3>
          <div className="flex flex-wrap gap-2">
            {profile.strengths.map((s: string, i: number) => (
              <span key={i} className="px-3 py-1 rounded-full bg-emerald-50 border text-emerald-800">{s}</span>
            ))}
          </div>
        </section>
        <section className="p-5 rounded-2xl border shadow bg-white">
          <h3 className="font-semibold mb-2">弱み</h3>
          <div className="flex flex-wrap gap-2">
            {profile.weaknesses.map((s: string, i: number) => (
              <span key={i} className="px-3 py-1 rounded-full bg-rose-50 border text-rose-800">{s}</span>
            ))}
          </div>
        </section>
      </div>

      <section className="p-5 rounded-2xl border shadow bg-white">
        <h3 className="font-semibold mb-2">向いている職種</h3>
        <div className="flex flex-wrap gap-2">
          {profile.jobs.map((s: string, i: number) => (
            <span key={i} className="px-3 py-1 rounded-full bg-sky-50 border text-sky-800">{s}</span>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-4">
        <section className="p-5 rounded-2xl border shadow bg-white">
          <h3 className="font-semibold mb-2">相性が良いタイプ</h3>
          <p>{profile.good.join("／")}</p>
        </section>
        <section className="p-5 rounded-2xl border shadow bg-white">
          <h3 className="font-semibold mb-2">注意が必要タイプ</h3>
          <p>{profile.bad.join("／")}</p>
        </section>
      </div>

      {/* ← ここだけクライアント化 */}
      <ShareBox shareText={shareText} code={profile.code} name={profile.name} />

      <div className="pt-2 flex gap-3">
        <Link href="/" className="inline-block px-6 py-3 rounded-2xl border shadow bg-black text-white">トップへ</Link>
        <Link href="/quiz" className="inline-block px-6 py-3 rounded-2xl border shadow bg-white">もう一度診断する</Link>
      </div>
    </main>
  );
}
