import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://worktype16.com";
  return [
    { url: `${base}/` },
    { url: `${base}/about` },
    { url: `${base}/privacy` },
    { url: `${base}/terms` },
    { url: `${base}/contact` },
    { url: `${base}/types` },
  ];
}
