export default function Contact() {
  const EMAIL = "daiyuu20010226@gmail.com";
  const subject = encodeURIComponent("お問い合わせ（16JobType）");
  const body = encodeURIComponent("お名前：\nご用件：\n");

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">お問い合わせ</h1>

      <p>
        ご連絡は
        {" "}
        <a className="underline" href={`mailto:${EMAIL}?subject=${subject}&body=${body}`}>
          {EMAIL}
        </a>
        {" "}
        までお願いします。
      </p>

      <p className="text-sm text-gray-600">
        ※ メールクライアントが開かない場合は、上記アドレスをコピーしてお使いください。
      </p>
    </main>
  );
}
