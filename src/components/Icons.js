// 一組內建的小圖示（用 SVG，免外部圖檔、載入快、放大不模糊）
// 用法： <Icon name="phone" className="h-5 w-5" />

const paths = {
  // 四大堅持
  class: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M3 8h18M8 21h8M12 17v4" />
    </>
  ),
  teacher: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  heart: <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" />,
  chart: (
    <>
      <path d="M4 20V10M10 20V5M16 20v-7M22 20H2" />
    </>
  ),
  // 聯絡
  phone: (
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  line: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="4" />
      <path d="M8 18l-1 3 4-3" />
      <path d="M8 9.5v4M8 9.5h2.2M8 11.6h2M14 9.5v4M16.5 9.5v4l-2-4v4" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path d="M5 12.5l4 4L19 6.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  star: (
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
  ),
};

export default function Icon({ name, className = "h-6 w-6" }) {
  const content = paths[name];
  if (!content) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}
