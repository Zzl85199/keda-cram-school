import PageHero from "@/components/PageHero";
import { Section } from "@/components/Section";
import ContactSection from "@/components/ContactSection";
import MapEmbed from "@/components/MapEmbed";

export const metadata = {
  title: "聯絡我們",
  description:
    "科達文理補習班聯絡資訊：桃園市八德區東勇二路99號2、3樓，電話 (03)361-5599、0932-038-351，LINE：@519nsfpn。歡迎預約試聽。",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="聯絡我們"
        title="歡迎來電、加 LINE 或預約試聽"
        description="不論是課程內容、上課時間還是費用，我們都很樂意為您詳細說明。"
      />

      {/* 聯絡方式 + 預約表單（共用元件，這裡不重複標題） */}
      <ContactSection tone="white" withHeading={false} />

      {/* 地圖 */}
      <Section tone="cream">
        <MapEmbed />
      </Section>
    </>
  );
}
