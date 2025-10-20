import Link from "next/link";
import typesData from "@/data/types.json";

/** types.json の型。最低限のキーだけ定義しておけばOK */
type TypeItem = {
  code: string;
  name: string;
  emoji?: string;     // あれば使う
  icon?: string;      // あれば使う
  summary?: string;   // 一覧の説明に使う（無ければ analysis の冒頭を抜粋）
  analysis?: string;  // 長文がある場合の代替
};

/** 配列 or 連想オブジェクトどちらでも受けられる安全な変換 */
function toArray(data: unknown): TypeItem[] {
  if (Array.isArray(data)) return data as TypeItem[];
  // 連想オブジェクト（Record<string, TypeItem>）の場合は値を配列化
  return Object.values(data as Record<string, TypeItem>);
}

export default function Types() {
  const list = toArray(typesData);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-4">16タイプ一覧</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((t) => {
          // 表示用のアイコンは emoji > icon の順で優先
          const icon = t.emoji ?? t.icon ?? "🧭";
          // 一覧の説明文：summary が無ければ analysis 冒頭 80 文字だけを抜粋
          const description =
            t.summary ??
            (t.analysis ? t.analysis.slice(0, 80) + (t.analysis.length > 80 ? "…" : "") : "");

          return (
            <Link
              key={t.code}
              href={`/result/${t.code}`}
              className="border rounded-xl p-4 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <h2 className="text-lg font-semibold">
                <span className="mr-2">{icon}</span>
                {t.name}
              </h2>
              {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
