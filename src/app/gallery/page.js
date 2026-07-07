import PageHero from "@/components/PageHero";
import { Section } from "@/components/Section";
import ContactSection from "@/components/ContactSection";
import GalleryWall from "@/components/GalleryWall";
import { getGalleryPhotos } from "@/lib/gallery";

export const metadata = {
  title: "校園相簿",
  description:
    "科達文理補習班校園環境、上課情境與活動花絮相簿，帶你看看孩子每天學習的地方。",
};

export default async function GalleryPage() {
  const { groups, isConfigured, hasError } = await getGalleryPhotos();
  const hasPhotos = groups.length > 0;

  return (
    <>
      <PageHero
        eyebrow="眼見為憑"
        title="校園相簿"
        description="教室環境、上課情境、活動花絮，帶你看看孩子每天學習的地方。"
      />

      <Section tone="white">
        {hasPhotos ? (
          <GalleryWall groups={groups} />
        ) : (
          <EmptyState isConfigured={isConfigured} hasError={hasError} />
        )}
      </Section>

      <ContactSection tone="cream" />
    </>
  );
}

// 還沒設定試算表，或試算表目前是空的，顯示引導文字（不是網站壞掉）
function EmptyState({ isConfigured, hasError }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-dashed border-line bg-cream px-8 py-14 text-center">
      <p className="text-lg font-semibold text-ink">
        {!isConfigured ? "相簿還沒開始設定" : hasError ? "目前讀不到照片資料" : "目前還沒有照片"}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {!isConfigured
          ? "請照 README.md 的「校園相簿設定」章節，設定好 Google 試算表連結，照片就會自動顯示在這裡。"
          : hasError
          ? "請確認 Google 試算表已「發布到網路」，且格式為 CSV，稍後重新整理即可。"
          : "請在 Google 試算表中新增照片列，存檔後幾分鐘內就會顯示。"}
      </p>
    </div>
  );
}
