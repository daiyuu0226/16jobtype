export type Dimension = "EI" | "PT" | "SC" | "LF";
export type Likert = 1 | 2 | 3 | 4 | 5; // 1=強YES, 5=強NO
export type Question = { id: number; dim: Dimension; text: string; map: { yes: string; no: string } };
export type TypeResult = { code: string; name: string; emoji: string; analysis: string; strengths: string[]; weaknesses: string[]; jobs: string[]; good: string[]; bad: string[] };
