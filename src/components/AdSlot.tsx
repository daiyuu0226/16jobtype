"use client";

import { useEffect, useRef } from "react";

type Props = {
  slot: string;                     // data-ad-slot（広告ユニットの Slot ID）
  layout?: "in-article" | "display";
  className?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
};

export default function AdSlot({
  slot,
  layout = "display",
  className,
  fullWidth = true,
  style,
}: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  const base = {
    className: `adsbygoogle ${className ?? ""}`,
    "data-ad-client": client,
    "data-ad-slot": slot,
    style: style ?? ({ display: "block", minHeight: 1 } as const), // CLS対策
  };

  if (layout === "in-article") {
    return (
      <ins
        ref={ref as any}
        {...base}
        data-ad-format="fluid"
        data-ad-layout="in-article"
        data-ad-layout-key="-fb+5w+4e-db+86"
      />
    );
  }

  return (
    <ins
      ref={ref as any}
      {...base}
      data-ad-format="auto"
      data-full-width-responsive={fullWidth ? "true" : "false"}
    />
  );
}
