import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "16JobType",
  description: "あなたの働き方が分かる！16タイプ働き方診断",
  metadataBase: new URL("https://worktype16.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {/* AdSense Auto Ads（YOUR_CA_PUB_ID を置換） */}
        <Script
          id="adsense"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CA_PUB_ID"
          crossOrigin="anonymous"
        />
        {/* （任意）GAやClarityもここで next/script で読み込み */}
      </head>
      <body className="min-h-dvh flex flex-col">
        {/* --- ヘッダー（簡易ナビ） --- */}
        <header className="border-b">
          <nav className="mx-auto max-w-5xl p-4 flex gap-4 text-sm">
            <a href="/" className="font-semibold">16JobType</a>
            <a href="/quiz" className="hover:underline">診断を始める</a>
            <a href="/types" className="hover:underline">タイプ一覧</a>
            <a href="/about" className="hover:underline">このサイトについて</a>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        {/* --- フッター（審査で見られる導線） --- */}
        <footer className="border-t">
          <div className="mx-auto max-w-5xl p-4 text-sm flex flex-wrap gap-4">
            <a className="hover:underline" href="/privacy">プライバシーポリシー</a>
            <a className="hover:underline" href="/terms">利用規約</a>
            <a className="hover:underline" href="/contact">お問い合わせ</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
