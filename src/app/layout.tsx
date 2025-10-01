import "./globals.css";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "16JobType",
  description: "あなたの働き方が分かる！16タイプ働き方診断",
  metadataBase: new URL(siteUrl),
  openGraph: { title: "16JobType", description: "あなたの働き方が分かる！16タイプ働き方診断", url: siteUrl, siteName: "16JobType", type: "website" },
  twitter: { card: "summary_large_image", title: "16JobType", description: "あなたの働き方が分かる！16タイプ働き方診断" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
  return (
    <html lang="ja">
      <head>
        {GA_ID && (<>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
          <script dangerouslySetInnerHTML={{__html:`
            window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date()); gtag('config', '${GA_ID}');`}} />
        </>)}
        {CLARITY_ID && (<script dangerouslySetInnerHTML={{__html:`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_ID}");`}} />)}
      </head>
      <body className="text-[#111827]">{children}</body>
    </html>
  );
}
