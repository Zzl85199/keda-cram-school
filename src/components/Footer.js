import Link from "next/link";
import { site, contact, navLinks } from "@/lib/config";
import Logo from "./Logo";
import Icon from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ink text-white/85">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        {/* 品牌 */}
        <div className="flex flex-col gap-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {site.tagline}
          </p>
        </div>

        {/* 快速連結 */}
        <div>
          <h3 className="mb-4 font-serif text-base font-bold text-white">網站導覽</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 聯絡資訊 */}
        <div>
          <h3 className="mb-4 font-serif text-base font-bold text-white">聯絡我們</h3>
          <ul className="flex flex-col gap-3 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{contact.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="phone" className="h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${contact.phoneTel}`} className="hover:text-white">
                {contact.phoneDisplay}
              </a>
              <span className="text-white/40">/</span>
              <a href={`tel:${contact.mobileTel}`} className="hover:text-white">
                {contact.mobileDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="line" className="h-4 w-4 shrink-0 text-accent" />
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                LINE：{contact.lineId}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-xs text-white/50">
          © {year} {site.name}　版權所有
        </div>
      </div>
    </footer>
  );
}
