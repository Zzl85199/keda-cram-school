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

// 還沒放照片，或資料夾結構有誤，顯示引導文字（不是網站壞掉）
function EmptyState({ isConfigured, hasError }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-dashed border-line bg-cream px-8 py-14 text-center">
      <p className="text-lg font-semibold text-ink">
        {!isConfigured ? "相簿還沒開始設定" : hasError ? "目前讀不到照片資料" : "目前還沒有照片"}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {!isConfigured
          ? "請照 README.md 的「校園相簿設定」章節，把照片放進 public/gallery/ 底下對應的分類資料夾。"
          : hasError
          ? "讀取 public/gallery/ 資料夾時發生錯誤，請確認資料夾與檔名格式正確。"
          : "請在 public/gallery/ 底下的分類資料夾中放入照片。"}
      </p>
    </div>
  );
}
