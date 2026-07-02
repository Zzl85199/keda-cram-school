import PageHero from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import CoreValues from "@/components/CoreValues";
import ContactSection from "@/components/ContactSection";
import Icon from "@/components/Icons";

export const metadata = {
  title: "教學特色",
  description:
    "科達文理補習班教學特色：小班精緻教學、經驗豐富師資、嚴格但溫暖的管教、完整學習追蹤，讓孩子學得扎實。",
};

// 教學流程（這是真正的順序，所以用編號呈現才合理）
const flow = [
  {
    step: "了解孩子",
    desc: "入班前先了解孩子的程度與學習狀況，找出真正需要加強的地方。",
  },
  {
    step: "小班授課",
    desc: "嚴格控管班級人數，老師能照顧到每位學生的學習節奏。",
  },
  {
    step: "練習與檢核",
    desc: "課堂練習搭配定期測驗，確認孩子真的學會，而不是只是聽過。",
  },
  {
    step: "追蹤回報",
    desc: "持續追蹤學習狀況，主動與家長回報，讓進步看得見。",
  },
];

const highlights = [
  {
    icon: "class",
    title: "小班制，不放生任何一個孩子",
    desc: "人數精緻，老師有餘裕關注每位學生，問題當堂解決、進度緊緊跟上。",
  },
  {
    icon: "teacher",
    title: "資深師資，教得到考試重點",
    desc: "熟悉會考方向與各校段考題型，把時間花在真正會影響成績的地方。",
  },
  {
    icon: "heart",
    title: "嚴而有溫度的班級管理",
    desc: "紀律要求不打折，陪伴與鼓勵不缺席，讓孩子在安心的環境中願意努力。",
  },
  {
    icon: "chart",
    title: "完整的學習追蹤",
    desc: "從出缺席、作業到考試表現都有紀錄，定期與家長同步孩子的成長。",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="教學特色"
        title="把每個孩子，都當成自己的孩子在教"
        description="我們相信，好的教學不只是把課上完，而是真的把孩子帶起來。"
      />

      {/* 四大核心堅持（共用首頁元件） */}
      <CoreValues />

      {/* 特色詳述 */}
      <Section tone="cream">
        <SectionHeading eyebrow="我們的做法" title="不只用心，更有方法" align="left" />
        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((h) => (
            <div key={h.title} className="card flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-deep">
                <Icon name={h.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{h.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 教學流程（有先後順序，所以用編號） */}
      <Section tone="white">
        <SectionHeading
          eyebrow="教學流程"
          title="四個步驟，陪孩子穩定進步"
          description="從了解孩子到追蹤回報，每一步都不馬虎。"
        />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map((f, i) => (
            <li key={f.step} className="card h-full">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft font-serif text-lg font-bold text-accent-deep">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{f.step}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ContactSection tone="cream" />
    </>
  );
}
