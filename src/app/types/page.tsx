import Link from "next/link";
// 既にある types.json を利用する想定。無ければ仮配列に差し替え。
import types from "@/data/types.json";

export default function Types() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-4">16タイプ一覧</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {(types as any[]).map((t) => (
          <Link key={t.code} href={`/result/${t.code}`} className="border rounded-xl p-4 hover:shadow">
            <h2 className="text-lg font-semibold">{t.icon} {t.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{t.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
