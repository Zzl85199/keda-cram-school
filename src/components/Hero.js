import Link from "next/link";
import { hero, contact, stats } from "@/lib/config";
import Icon from "./Icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft/70 via-cream to-white">
      {/* 背景柔和裝飾光暈 */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:py-28">
        {/* 文字 */}
        <div className="lg:col-span-7">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="mt-4 text-4xl font-black leading-[1.15] text-ink sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact#booking" className="btn-primary">
              預約試聽
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a
              href={contact.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Icon name="line" className="h-5 w-5" />
              加入 LINE
            </a>
          </div>

          {/* 信任數據條 */}
          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-2xl font-bold text-brand-deep sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs text-ink-muted sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 視覺卡片（純 CSS，不需圖檔） */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="card rotate-1 bg-white p-7 shadow-soft">
              <span className="eyebrow">為什麼選擇科達</span>
              <ul className="mt-5 flex flex-col gap-4">
                {[
                  "小班制，每個孩子都被看見",
                  "資深師資，緊跟會考與段考",
                  "嚴而有溫度，孩子讀得安心",
                  "持續追蹤，進步看得見",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-ink-soft">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <span className="text-[15px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute -bottom-5 -left-4 -z-10 h-full w-full rounded-3xl bg-brand/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
