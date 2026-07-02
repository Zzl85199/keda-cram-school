// 內頁頂部標題橫幅（課程介紹 / 教學特色 / 成果與評價 / 聯絡我們 共用）
export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="border-b border-line bg-gradient-to-b from-brand-soft/60 to-white">
      <div className="container-x py-14 text-center sm:py-20">
        {eyebrow && <span className="eyebrow justify-center">{eyebrow}</span>}
        <h1 className="mt-4 text-3xl font-black leading-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
