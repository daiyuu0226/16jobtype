export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const codes = ["E-P-S-L","E-P-S-F","E-P-C-L","E-P-C-F","E-T-S-L","E-T-S-F","E-T-C-L","E-T-C-F","I-P-S-L","I-P-S-F","I-P-C-L","I-P-C-F","I-T-S-L","I-T-S-F","I-T-C-L","I-T-C-F"];
  const now = new Date();
  return [
    { url: base, lastModified: now },
    { url: `${base}/quiz`, lastModified: now },
    { url: `${base}/result`, lastModified: now },
    ...codes.map((c) => ({ url: `${base}/result/${c}`, lastModified: now })),
  ];
}
