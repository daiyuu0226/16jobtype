"use client";
import AdSlot from "@/components/AdSlot";

export default function ResultAds() {
  return (
    <>
      {/* 記事内広告（本文の途中用） */}
      <AdSlot
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE!}
        layout="in-article"
        className="my-6"
      />
      {/* ページ末尾のレスポンシブ */}
      <AdSlot
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER!}
        className="mt-8"
      />
    </>
  );
}
