"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { scoreFromAnswers } from "@/lib/scoring";
import questions from "@/data/questions.json";
import type { Likert } from "@/lib/types";
import { useRouter } from "next/navigation";

const SCALE: Likert[] = [1, 2, 3, 4, 5];
// 表示テキストだけ変更（配点ロジックはそのまま）
const LABEL: Record<Likert, string> = {
  1: "とても当てはまる",
  2: "当てはまる",
  3: "どちらともいえない",
  4: "当てはまらない",
  5: "まったく当てはまらない",
};

const LS_KEY = "quiz_answers_v1";

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, Likert>>({});

  const progress = useMemo(
    () => Math.round((100 * Object.keys(answers).length) / questions.length),
    [answers]
  );

  // 途中保存の復元
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
  }, []);

  // 自動保存
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LS_KEY, JSON.stringify(answers));
  }, [answers]);

  const set = (id: number, v: Likert) =>
    setAnswers((prev) => ({ ...prev, [id]: v }));

  const submit = () => {
    if (Object.keys(answers).length !== questions.length) return;
    const code = scoreFromAnswers(answers);
    router.push(`/result/${encodeURIComponent(code)}`);
  };

  const reset = () => {
    setAnswers({});
    if (typeof window !== "undefined") localStorage.removeItem(LS_KEY);
  };

  const onKey = useCallback(
    (qId: number, e: React.KeyboardEvent<HTMLDivElement>) => {
      const current = answers[qId] ?? 3;
      if (e.key === "ArrowLeft") {
        const nxt = Math.max(1, (current as number) - 1) as Likert;
        set(qId, nxt);
      }
      if (e.key === "ArrowRight") {
        const nxt = Math.min(5, (current as number) + 1) as Likert;
        set(qId, nxt);
      }
    },
    [answers]
  );

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-3xl font-extrabold">診断（10問）</h1>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 transition-all"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </div>

      <ol className="space-y-6">
        {questions.map((q) => (
          <li key={q.id} className="p-5 rounded-2xl border shadow bg-white">
            {/* EI/PT/… の表記は出さない */}
            <p className="text-sm text-gray-500 mb-1">Q{q.id}</p>
            <p className="text-lg font-medium mb-4">{q.text}</p>

            <div
              role="radiogroup"
              aria-label={`Q${q.id}: ${q.text}`}
              tabIndex={0}
              onKeyDown={(e) => onKey(q.id, e)}
              className="grid grid-cols-5 gap-2"
            >
              {SCALE.map((v) => {
                const active = answers[q.id] === v;
                return (
                  <button
                    key={v}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => set(q.id, v)}
                    className={`px-2 py-3 rounded-xl border transition outline-offset-2
                      ${active
                        ? "bg-black text-white border-black"
                        : "border-gray-300 bg-white hover:shadow"}`}
                  >
                    {LABEL[v]}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="pt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={Object.keys(answers).length !== questions.length}
          className="px-6 py-3 rounded-2xl border shadow bg-black text-white disabled:opacity-50"
        >
          結果を見る
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-3 rounded-2xl border shadow bg-white"
        >
          リセット
        </button>
        <span className="text-sm text-gray-500">
          {Object.keys(answers).length}/{questions.length}
        </span>
      </div>
    </main>
  );
}
