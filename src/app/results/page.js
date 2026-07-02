import PageHero from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import TrustSection from "@/components/TrustSection";
import ContactSection from "@/components/ContactSection";
import { stats } from "@/lib/config";
import Icon from "@/components/Icons";

export const metadata = {
  title: "成果與評價",
  description:
    "科達文理補習班教學成果與家長評價：小班教學、紮實的學習方法，讓孩子穩定進步，深獲八德地區家長信任。",
};

// 成果亮點（請依實際情況調整文字，避免誇大不實）
const achievements = [
  {
    title: "穩定的段考表現",
    desc: "透過課堂練習與定期測驗，孩子的段考成績普遍能維持穩定並逐步提升。",
  },
  {
    title: "扎實的會考準備",
    desc: "系統化的主科複習與考前衝刺，幫助國三學生從容面對會考。",
  },
  {
    title: "數學觀念明顯進步",
    desc: "重視觀念與解題思路，許多孩子從害怕數學，到願意主動挑戰難題。",
  },
];

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="成果與評價"
        title="孩子的進步，是我們最在意的成績"
        description="我們相信踏實累積的力量，也很高興得到許多八德家長的信任與肯定。"
      />

      {/* 數據 */}
      <Section tone="white">
        <div className="grid gap-6 rounded-3xl bg-brand-soft p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-4xl font-black text-brand-deep">{s.value}</div>
              <div className="mt-2 text-sm text-ink-soft">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <SectionHeading eyebrow="教學成果" title="踏實累積，看得見的進步" align="left" />
          <div className="grid gap-6 md:grid-cols-3">
            {achievements.map((a) => (
              <div key={a.title} className="card h-full">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep">
                  <Icon name="chart" className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-muted">
            ※ 以上為整體教學情況說明，實際成果因個人努力與起點而異。
          </p>
        </div>
      </Section>

      {/* 家長評價（共用首頁元件） */}
      <TrustSection />

      <ContactSection tone="white" />
    </>
  );
}
