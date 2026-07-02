import "./globals.css";
import { site, contact } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

// ---- SEO（繁體中文）----
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}｜八德小班制升學補習班`,
    template: `%s｜${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "八德補習班",
    "桃園八德補習班",
    "國中會考",
    "國一銜接",
    "小五小六數學",
    "私中準備",
    "數資班",
    "小班制補習班",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name}｜八德小班制升學補習班`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    locale: "zh_TW",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#178C7A",
  width: "device-width",
  initialScale: 1,
};

// 結構化資料：讓 Google 認得這是一間在地教育機構
function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    description: site.tagline,
    url: site.url,
    telephone: contact.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "東勇二路99號2、3樓",
      addressLocality: "八德區",
      addressRegion: "桃園市",
      addressCountry: "TW",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        {/* 中文字型：思源宋體（標題）＋ 思源黑體（內文） */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocalBusinessJsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
