import Link from "next/link";

export const metadata = { title: "找不到頁面" };

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl font-black text-brand/30">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">找不到這個頁面</h1>
      <p className="mt-2 text-ink-soft">頁面可能已移除或網址有誤，回首頁再看看吧。</p>
      <Link href="/" className="btn-primary mt-8">
        回到首頁
      </Link>
    </section>
  );
}
