import { contact } from "@/lib/config";
import { Section, SectionHeading } from "./Section";
import ContactForm from "./ContactForm";
import Icon from "./Icons";

// 聯絡與預約試聽區塊：左側聯絡方式 + 右側表單
//  homepage 與 聯絡我們頁 共用這個元件
export default function ContactSection({ tone = "cream", withHeading = true }) {
  return (
    <Section tone={tone} id="contact">
      <div id="booking" className="-mt-24 pt-24" aria-hidden="true" />
      {withHeading && (
        <SectionHeading
          eyebrow="聯絡與預約試聽"
          title="想了解更多？歡迎預約試聽"
          description="留下資料或直接與我們聯繫，由專人為您說明課程、安排試聽。"
        />
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* 聯絡方式 */}
        <div className="flex flex-col gap-4">
          <a
            href={`tel:${contact.phoneTel}`}
            className="card flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-deep">
              <Icon name="phone" className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-sm text-ink-muted">電話諮詢</span>
              <span className="block text-lg font-bold text-ink">
                {contact.phoneDisplay}
              </span>
              <span className="block text-sm text-ink-soft">{contact.mobileDisplay}</span>
            </span>
          </a>

          <a
            href={contact.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
              <Icon name="line" className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-sm text-ink-muted">LINE 線上諮詢（最即時）</span>
              <span className="block text-lg font-bold text-ink">{contact.lineId}</span>
            </span>
          </a>

          <div className="card flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep">
              <Icon name="map" className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-sm text-ink-muted">補習班地址</span>
              <span className="block text-base font-semibold text-ink">
                {contact.address}
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
                <Icon name="clock" className="h-4 w-4 text-brand" />
                {contact.hours}
              </span>
            </span>
          </div>
        </div>

        {/* 表單 */}
        <ContactForm />
      </div>
    </Section>
  );
}
