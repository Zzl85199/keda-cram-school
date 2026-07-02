import { testimonials } from "@/lib/config";
import { Section, SectionHeading } from "./Section";
import Icon from "./Icons";

// 家長信任區塊：呈現家長真實回饋，建立信任感
export default function TrustSection() {
  return (
    <Section tone="brand">
      <SectionHeading
        eyebrow="家長的信任"
        title="把孩子交給科達，家長很放心"
        description="這些回饋，是我們每天認真教學最踏實的回報。"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="card flex h-full flex-col bg-white">
            <div className="mb-3 flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, s) => (
                <Icon key={s} name="star" className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="flex-1 text-[15px] leading-relaxed text-ink-soft">
              「{t.quote}」
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft font-serif font-bold text-brand-deep">
                {t.name.slice(0, 1)}
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-ink">{t.name}</span>
                <span className="block text-ink-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
