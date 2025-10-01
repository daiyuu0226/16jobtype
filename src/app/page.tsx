import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-[70dvh] grid place-items-center p-6">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400">
          16JobType
        </h1>
        <p className="text-lg">あなたの働き方が分かる！16タイプ働き方診断</p>
        <Link href="/quiz" className="inline-block px-6 py-3 rounded-2xl border shadow bg-black text-white">診断を始める</Link>
      </div>
    </main>
  );
}
