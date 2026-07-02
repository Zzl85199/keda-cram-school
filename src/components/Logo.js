import Link from "next/link";
import { site } from "@/lib/config";

// 品牌標誌：圓角方印風格的「科達」字樣 + 中文全名
export default function Logo({ light = false }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} 首頁`}>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand
                   font-serif text-xl font-bold text-white shadow-soft transition
                   group-hover:bg-brand-deep"
      >
        {site.shortName}
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-serif text-lg font-bold ${light ? "text-white" : "text-ink"}`}
        >
          {site.name}
        </span>
        <span
          className={`text-[11px] tracking-widest ${
            light ? "text-white/70" : "text-ink-muted"
          }`}
        >
          八德 · 文理技藝補習班
        </span>
      </span>
    </Link>
  );
}
