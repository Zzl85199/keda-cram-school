// 區塊外框：統一上下留白與底色，讓各段落間距一致
export function Section({ children, className = "", tone = "white", id }) {
  const tones = {
    white: "bg-white",
    cream: "bg-cream",
    brand: "bg-brand-soft",
  };
  return (
    <section id={id} className={`py-16 sm:py-20 ${tones[tone] || tones.white} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

// 區塊標題：小標籤 + 大標題 + 說明，置中或靠左
export function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`mb-10 flex flex-col gap-3 sm:mb-12 ${alignment}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
    </div>
  );
}
