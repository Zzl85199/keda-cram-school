"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, contact } from "@/lib/config";
import Logo from "./Logo";
import Icon from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <Logo />

        {/* 桌機導覽 */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="主選單">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-[15px] font-medium transition ${
                  active
                    ? "bg-brand-soft text-brand-deep"
                    : "text-ink-soft hover:bg-cream hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 桌機右側 CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${contact.phoneTel}`} className="btn-outline px-4 py-2 text-sm">
            <Icon name="phone" className="h-4 w-4" /> 來電諮詢
          </a>
          <a
            href={contact.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-4 py-2 text-sm"
          >
            <Icon name="line" className="h-4 w-4" /> 加入 LINE
          </a>
        </div>

        {/* 手機選單按鈕 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-ink lg:hidden"
          aria-expanded={open}
          aria-label="開啟選單"
        >
          <span className="sr-only">選單</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* 手機展開選單 */}
      {open && (
        <nav className="border-t border-line bg-white lg:hidden" aria-label="行動選單">
          <div className="container-x flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium ${
                    active ? "bg-brand-soft text-brand-deep" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-2">
              <a href={`tel:${contact.phoneTel}`} className="btn-outline w-full">
                <Icon name="phone" className="h-4 w-4" /> {contact.phoneDisplay}
              </a>
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full"
                onClick={() => setOpen(false)}
              >
                <Icon name="line" className="h-4 w-4" /> 加入 LINE
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
