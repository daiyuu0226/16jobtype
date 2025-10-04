import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://16jobtype.vercel.app";

export const metadata: Metadata = {
  title: "16JobType",
  description: "あなたの働き方が分かる！16タイプ働き方診断",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "16JobType",
    description: "あなたの働き方が分かる！16タイプ働き方診断",
    url: siteUrl,
    siteName: "16JobType",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "16JobType",
    description: "あなたの働き方が分かる！16タイプ働き方診断",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

  // 環境変数があればそちらを優先。無ければいただいた client を使います
  const AD_CLIENT =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-4939796600997241";

  return (
    <html lang="ja">
      <head>
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Microsoft Clarity */}
        {CLARITY_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}
                ;t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i
                ;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");`,
            }}
          />
        )}

        {/* Google AdSense（自動広告） */}
        {AD_CLIENT && (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>

      <body className="min-h-screen bg-[#f7f7f7] text-[#111827]">
        {children}
      </body>
    </html>
  );
}
