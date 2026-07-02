import { coreValues } from "@/lib/config";
import { Section, SectionHeading } from "./Section";
import Icon from "./Icons";

export default function CoreValues() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="四大核心堅持"
        title="我們對教學，有不退讓的堅持"
        description="每一項堅持，都是為了讓孩子在這裡，學得扎實、走得長遠。"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {coreValues.map((v) => (
          <div key={v.title} className="card h-full text-center hover:-translate-y-1 hover:shadow-soft">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand-deep">
              <Icon name={v.icon} className="h-7 w-7" />
            </span>
            <h3 className="mb-2 text-lg font-bold text-ink">{v.title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft">{v.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
