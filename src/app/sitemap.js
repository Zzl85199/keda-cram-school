import { site, navLinks } from "@/lib/config";

export default function sitemap() {
  const now = new Date();
  return navLinks.map((link) => ({
    url: `${site.url}${link.href === "/" ? "" : link.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
