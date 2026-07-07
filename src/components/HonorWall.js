"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icons";

// 榮譽榜動態展示：
//  1. 上方數字動畫（滾動到畫面內才開始跳動，依分類統計）
//  2. 分類頁籤篩選
//  3. 雙向自動跑馬燈牆（上排往左、下排往右，滑鼠移上去暫停）
// 資料來源：src/lib/honors.js（讀取 Google 試算表 CSV）
export default function HonorWall({ groups, stats }) {
  const categories = useMemo(() => groups.map((g) => g.category), [groups]);
  const [active, setActive] = useState("全部");

  const allHonors = useMemo(() => groups.flatMap((g) => g.honors), [groups]);
  const visible = active === "全部" ? allHonors : groups.find((g) => g.category === active)?.honors ?? [];

  // 拆成兩排交錯，兩排反方向跑，畫面比較有層次
  const rowA = visible.filter((_, i) => i % 2 === 0);
  const rowB = visible.filter((_, i) => i % 2 === 1);

  return (
    <div>
      {/* 統計數字：捲動進畫面才開始跳動 */}
      {stats.length > 0 && (
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.slice(0, 4).map((s) => (
            <div key={s.category} className="rounded-2xl border border-line bg-cream px-4 py-6 text-center">
              <div className="font-serif text-3xl font-black text-brand-deep sm:text-4xl">
                <CountUp value={s.count} />
                <span className="text-xl">+</span>
              </div>
              <div className="mt-1.5 text-xs text-ink-muted sm:text-sm">{s.category}</div>
            </div>
          ))}
        </div>
      )}

      {/* 分類頁籤 */}
      <div className="mb-8 flex flex-wrap justify-center gap-2.5">
        <TabButton label="全部" active={active === "全部"} onClick={() => setActive("全部")} />
        {categories.map((c) => (
          <TabButton key={c} label={c} active={active === c} onClick={() => setActive(c)} />
        ))}
      </div>

      {/* 跑馬燈牆 */}
      {visible.length === 0 ? (
        <p className="py-16 text-center text-ink-muted">這個分類目前沒有榮譽榜項目。</p>
      ) : (
        <div className="flex flex-col gap-4">
          <MarqueeRow items={rowA} direction="left" />
          {rowB.length > 0 && <MarqueeRow items={rowB} direction="right" />}
        </div>
      )}
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-soft"
          : "rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-ink-soft transition hover:border-brand hover:text-brand-deep"
      }
    >
      {label}
    </button>
  );
}

// 一排跑馬燈：內容重複兩份無縫接軌，滑鼠移上去暫停
function MarqueeRow({ items, direction }) {
  // 內容太少時跑起來會很空虛，至少重複到 8 個再接第二份
  const loopItems = items.length < 8 ? Array.from({ length: 8 }, (_, i) => items[i % items.length]) : items;
  const durationSec = Math.max(loopItems.length * 3.2, 18);
  const animClass = direction === "left" ? "motion-safe:animate-[marquee-left_linear_infinite]" : "motion-safe:animate-[marquee-right_linear_infinite]";

  return (
    <div className="group overflow-x-auto py-1 motion-safe:overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className={`flex w-max gap-4 ${animClass} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {[...loopItems, ...loopItems].map((h, i) => (
          <HonorCard key={`${h.id}-${i}`} honor={h} />
        ))}
      </div>
    </div>
  );
}

function HonorCard({ honor }) {
  return (
    <div className="flex w-72 shrink-0 items-start gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-card sm:w-80">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
        <Icon name="star" className="h-4.5 w-4.5 fill-current" />
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-bold leading-snug text-ink">{honor.achievement}</p>
        <p className="mt-1 truncate text-xs text-ink-muted">
          {[honor.student_name, honor.year].filter(Boolean).join(" · ")}
        </p>
        {honor.detail && <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{honor.detail}</p>}
      </div>
    </div>
  );
}

// 數字從 0 跳到目標值，捲動進畫面才觸發，只跑一次
function CountUp({ value, durationMs = 1200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / durationMs, 1);
            setDisplay(Math.round(progress * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return <span ref={ref}>{display}</span>;
}
