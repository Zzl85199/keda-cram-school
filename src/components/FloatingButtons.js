import { contact } from "@/lib/config";
import Icon from "./Icons";

// 手機畫面右下角的浮動按鈕：一鍵撥號 / 加 LINE
// 桌機隱藏（桌機在頂部已有按鈕）
export default function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 lg:hidden">
      <a
        href={`tel:${contact.phoneTel}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-deep shadow-soft ring-1 ring-line"
        aria-label="撥打電話"
      >
        <Icon name="phone" className="h-6 w-6" />
      </a>
      <a
        href={contact.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-soft"
        aria-label="加入 LINE"
      >
        <Icon name="line" className="h-7 w-7" />
      </a>
    </div>
  );
}
