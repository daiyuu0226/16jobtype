import data from "@/data/types.json";
import Link from "next/link";

export default function ResultIndex() {
  const types = Object.values(data as any) as { code: string; name: string; emoji: string }[];
  const sorted = types.sort((a, b) => a.code.localeCompare(b.code));
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">タイプ一覧</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sorted.map((t) => (
          <Link key={t.code} href={`/result/${t.code}`} className="p-4 rounded-2xl border shadow bg-white hover:shadow-md transition">
            <div className="text-3xl" aria-hidden>{t.emoji}</div>
            <div className="font-semibold mt-1">{t.name}</div>
            <div className="text-sm text-gray-500">{t.code}</div>
          </Link>
        ))}
      </div>
      <div>
        <Link href="/" className="inline-block px-6 py-3 rounded-2xl border shadow bg-black text-white">トップへ</Link>
      </div>
    </main>
  );
}
