import { getCourses } from "@/lib/courses";
import PageHero from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import CourseList from "@/components/CourseList";
import ContactSection from "@/components/ContactSection";
import Icon from "@/components/Icons";

export const metadata = {
  title: "課程介紹",
  description:
    "科達文理補習班課程介紹：國一銜接班、國一正式班、小五小六數學專班、數資及私中班，小班制升學規劃。",
};

// 各階段教學重點（靜態說明，搭配下方動態課程清單）
const stages = [
  {
    title: "小五・小六",
    focus: "數學打底 × 升學準備",
    points: ["課綱同步教學", "數感與解題訓練", "私中考試基礎", "學習習慣養成"],
  },
  {
    title: "國一銜接",
    focus: "無縫接軌國中",
    points: ["國英數銜接", "預習與複習並行", "段考總複習", "課後輔導"],
  },
  {
    title: "國中正式班",
    focus: "段考穩定 × 會考衝刺",
    points: ["主科加強", "會考趨勢掌握", "學習進度追蹤", "考前總複習"],
  },
  {
    title: "數資・私中",
    focus: "資優題型 × 私中準備",
    points: ["入班測驗篩選", "資優題型訓練", "私中考試準備", "國中資深師資"],
  },
];

export default async function CoursesPage() {
  const { courses, isFallback } = await getCourses();

  return (
    <>
      <PageHero
        eyebrow="課程介紹"
        title="量身規劃的升學課程"
        description="從國小數學到國中會考，依孩子的年級與目標，提供最適合的小班課程。"
      />

      {/* 各階段教學重點 */}
      <Section tone="white">
        <SectionHeading
          eyebrow="教學階段"
          title="每個階段，都有清楚的學習目標"
          align="left"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s) => (
            <div key={s.title} className="card h-full">
              <h3 className="text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm font-medium text-brand-deep">{s.focus}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 動態招生課程 */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="招生課程"
          title="目前開放的班別"
          description="以下課程資訊即時更新；確切時間與費用，歡迎來電或加 LINE 洽詢。"
        />
        <CourseList courses={courses} isFallback={isFallback} showFallbackNotice />
      </Section>

      <ContactSection tone="white" />
    </>
  );
}
