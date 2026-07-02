import { contact, mapEmbedUrl } from "@/lib/config";
import Icon from "./Icons";

// Google 地圖嵌入：用地址自動定位，不需要申請 API 金鑰
export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line shadow-card">
      <iframe
        title={`${contact.address} 地圖`}
        src={mapEmbedUrl}
        className="h-72 w-full sm:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="flex flex-col gap-3 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-sm text-ink-soft">
          <Icon name="map" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          {contact.address}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            contact.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline px-4 py-2 text-sm"
        >
          開啟導航
          <Icon name="arrow" className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
