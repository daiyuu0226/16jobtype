// src/lib/scoring.ts
import type { Dimension, Likert, Question } from "@/lib/types";
import QUESTIONS from "@/data/questions.json";

type Scores = Record<Dimension, Record<string, number>>;

export function scoreFromAnswers(answers: Record<number, Likert>) {
  const scores: Scores = {
    EI: { E: 0, I: 0 },
    PT: { P: 0, T: 0 },
    SC: { S: 0, C: 0 },
    LF: { L: 0, F: 0 }
  };

  const firstPick: Partial<Record<Dimension, string>> = {};

  // ★ any[] をやめて Question[] に
  for (const q of QUESTIONS as unknown as Question[]) {
    const v = answers[q.id];
    if (!v) continue;

    const add = (k: string, n: number) => {
      scores[q.dim][k] = (scores[q.dim][k] ?? 0) + n;
    };

    if (v === 1) { add(q.map.yes, 2); if (!firstPick[q.dim]) firstPick[q.dim] = q.map.yes; }
    else if (v === 2) { add(q.map.yes, 1); if (!firstPick[q.dim]) firstPick[q.dim] = q.map.yes; }
    else if (v === 4) { add(q.map.no, 1);  if (!firstPick[q.dim]) firstPick[q.dim] = q.map.no; }
    else if (v === 5) { add(q.map.no, 2);  if (!firstPick[q.dim]) firstPick[q.dim] = q.map.no; }
  }

  const pick = (dim: Dimension, a: string, b: string) => {
    const da = scores[dim][a], db = scores[dim][b];
    if (da > db) return a;
    if (db > da) return b;
    return (firstPick[dim] as string) || a; // tie-break
  };

  const EorI = pick("EI", "E", "I");
  const PorT = pick("PT", "P", "T");
  const SorC = pick("SC", "S", "C");
  const LorF = pick("LF", "L", "F");
  return `${EorI}-${PorT}-${SorC}-${LorF}`;
}
