"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Icon from "./Icons";

// 校園相簿：分類頁籤 ＋ 動態牆（進場淡入上移）＋ 點擊放大燈箱
// 資料來源：src/lib/gallery.js（讀取 Google 試算表 CSV）
export default function GalleryWall({ groups }) {
  const categories = useMemo(() => groups.map((g) => g.category), [groups]);
  const [active, setActive] = useState("全部");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const allPhotos = useMemo(() => groups.flatMap((g) => g.photos), [groups]);
  const visiblePhotos = active === "全部" ? allPhotos : groups.find((g) => g.category === active)?.photos ?? [];

  // 切換分類時，燈箱關閉，並讓卡片重新觸發進場動畫
  const [wallKey, setWallKey] = useState(0);
  useEffect(() => {
    setLightboxIndex(null);
    setWallKey((k) => k + 1);
  }, [active]);

  // 燈箱開啟時鎖住背景捲動 ＋ 支援鍵盤左右鍵、Esc
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => Math.min(i + 1, visiblePhotos.length - 1));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, visiblePhotos.length]);

  return (
    <div>
      {/* 分類頁籤 */}
      <div className="mb-10 flex flex-wrap justify-center gap-2.5">
        <TabButton label="全部" active={active === "全部"} onClick={() => setActive("全部")} />
        {categories.map((c) => (
          <TabButton key={c} label={c} active={active === c} onClick={() => setActive(c)} />
        ))}
      </div>

      {/* 動態牆：進場依序淡入上移 */}
      {visiblePhotos.length === 0 ? (
        <p className="py-16 text-center text-ink-muted">這個分類目前沒有照片。</p>
      ) : (
        <div key={wallKey} className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
          {visiblePhotos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-brand-soft opacity-0 shadow-card [animation-fill-mode:forwards] motion-safe:animate-[fadeUp_0.6s_ease-out]"
              style={{ animationDelay: `${Math.min(i, 20) * 60}ms` }}
            >
              <Image
                src={photo.image_url}
                alt={photo.caption || "科達文理補習班照片"}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              {photo.caption && (
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/80 to-transparent p-3 text-left text-xs leading-snug text-white transition group-hover:translate-y-0">
                  {photo.caption}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 燈箱 */}
      {lightboxIndex !== null && visiblePhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            aria-label="關閉"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => setLightboxIndex(null)}
          >
            <Icon name="check" className="h-5 w-5 rotate-45" />
          </button>

          {lightboxIndex > 0 && (
            <button
              aria-label="上一張"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => i - 1);
              }}
            >
              <Icon name="arrow" className="h-5 w-5 rotate-180" />
            </button>
          )}
          {lightboxIndex < visiblePhotos.length - 1 && (
            <button
              aria-label="下一張"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => i + 1);
              }}
            >
              <Icon name="arrow" className="h-5 w-5" />
            </button>
          )}

          <div
            className="relative max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={visiblePhotos[lightboxIndex].image_url}
              alt={visiblePhotos[lightboxIndex].caption || "科達文理補習班照片"}
              className="max-h-[85vh] rounded-xl object-contain"
            />
            {visiblePhotos[lightboxIndex].caption && (
              <p className="mt-3 text-center text-sm text-white/80">
                {visiblePhotos[lightboxIndex].caption}
              </p>
            )}
          </div>
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
