"use client";

type Props = {
  shareText: string;
  code: string;
  name: string;
};

export default function ShareBox({ shareText, code, name }: Props) {
  const track = (eventName: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, { code, name });
    }
  };

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      track("share_copy");
      alert("コピーしました！");
    } catch {
      // 失敗時は何もしない（必要ならトースト等に差し替え）
    }
  };

  return (
    <section className="p-5 rounded-2xl border shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">SNSでシェア</h3>
      <textarea className="w-full p-3 border rounded-xl" rows={4} readOnly value={shareText} />
      <div className="mt-2 flex gap-2">
        <button className="px-4 py-2 rounded-xl border bg-black text-white" onClick={copyShare}>
          文面をコピー
        </button>
        <a
          className="px-4 py-2 rounded-xl border"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("share_x_click")}
        >
          Xで投稿
        </a>
      </div>
    </section>
  );
}
