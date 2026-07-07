import PageHero from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import TrustSection from "@/components/TrustSection";
import ContactSection from "@/components/ContactSection";
import HonorWall from "@/components/HonorWall";
import { stats } from "@/lib/config";
import { getHonors } from "@/lib/honors";
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

export default async function ResultsPage() {
  const { groups, stats: honorStats, isConfigured, hasError } = await getHonors();
  const hasHonors = groups.length > 0;

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

      {/* 榮譽榜（真實榜單，資料來自 Google 試算表） */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="榮譽榜"
          title="科達孩子的好成績，都在這裡"
          description="會考成績、私中榜、競賽獲獎、獎學金……每一項都是孩子踏實努力的成果。"
        />
        {hasHonors ? (
          <HonorWall groups={groups} stats={honorStats} />
        ) : (
          <HonorsEmptyState isConfigured={isConfigured} hasError={hasError} />
        )}
      </Section>

      {/* 家長評價（共用首頁元件） */}
      <TrustSection />

      <ContactSection tone="white" />
    </>
  );
}

// 還沒設定試算表，或試算表目前是空的，顯示引導文字（不是網站壞掉）
function HonorsEmptyState({ isConfigured, hasError }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-dashed border-line bg-white px-8 py-14 text-center">
      <p className="text-lg font-semibold text-ink">
        {!isConfigured ? "榮譽榜還沒開始設定" : hasError ? "目前讀不到榮譽榜資料" : "目前還沒有榮譽榜項目"}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {!isConfigured
          ? "請照 README.md 的「榮譽榜設定」章節，設定好 Google 試算表連結，榜單就會自動顯示在這裡。"
          : hasError
          ? "請確認 Google 試算表已「發布到網路」，且格式為 CSV，稍後重新整理即可。"
          : "請在 Google 試算表中新增榮譽榜列，存檔後幾分鐘內就會顯示。"}
      </p>
    </div>
  );
}
