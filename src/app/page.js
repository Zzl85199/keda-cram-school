import { getCourses } from "@/lib/courses";
import Hero from "@/components/Hero";
import CoreValues from "@/components/CoreValues";
import { Section, SectionHeading } from "@/components/Section";
import CourseList from "@/components/CourseList";
import CoursesPreview from "@/components/CoursesPreview";
import TrustSection from "@/components/TrustSection";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
import Icon from "@/components/Icons";

export default async function HomePage() {
  // 在伺服器端讀取課程（來自 Google 試算表，失敗則用備援）
  const { courses, isFallback } = await getCourses();

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. 四大核心堅持 */}
      <CoreValues />

      {/* 3. 最新招生課程（資料來自 Google 試算表） */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="最新招生課程"
          title="現正招生中的課程"
          description="名額有限，歡迎把握機會預約試聽，為孩子搶得學習先機。"
        />
        <CourseList courses={courses} isFallback={isFallback} showFallbackNotice />
        <div className="mt-10 text-center">
          <Link href="/courses" className="btn-outline">
            查看所有課程
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* 4. 課程介紹預覽 */}
      <CoursesPreview />

      {/* 5. 家長信任區塊 */}
      <TrustSection />

      {/* 6. 聯絡與預約試聽 */}
      <ContactSection tone="white" />
    </>
  );
}
