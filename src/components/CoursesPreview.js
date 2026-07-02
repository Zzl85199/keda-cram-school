import Link from "next/link";
import { Section, SectionHeading } from "./Section";
import Icon from "./Icons";

// 首頁的「課程介紹預覽」：用四大教學主軸，引導到完整課程頁
const programs = [
  {
    title: "國一銜接",
    desc: "提早適應國中學習節奏，國英數無縫接軌，開學不慌張。",
  },
  {
    title: "國中會考",
    desc: "緊跟會考趨勢，主科系統複習，穩紮穩打衝刺理想志願。",
  },
  {
    title: "小五小六數學",
    desc: "建立數感與解題能力，打好升私中與國中數學的基礎。",
  },
  {
    title: "私中與數資",
    desc: "資深老師授課，針對私中考試與數理資優題型加強訓練。",
  },
];

export default function CoursesPreview() {
  return (
    <Section tone="cream">
      <SectionHeading
        align="left"
        eyebrow="課程介紹"
        title="一條龍升學規劃，每個階段都銜接得上"
        description="從小學數學打底，到國中會考衝刺，我們陪孩子走完每一段關鍵旅程。"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((p, i) => (
          <Link
            key={p.title}
            href="/courses"
            className="card group flex h-full flex-col hover:-translate-y-1 hover:shadow-soft"
          >
            <span className="mb-4 font-serif text-3xl font-bold text-brand/30">
              0{i + 1}
            </span>
            <h3 className="mb-2 text-lg font-bold text-ink">{p.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-deep">
              查看課程
              <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/courses" className="btn-outline">
          看完整課程介紹
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
