// 招生狀態標籤：用顏色快速傳達資訊
//  招生中 = 綠（可報名）  即將開課 = 琥珀（把握時間）
//  額滿 = 灰紅（已滿）    已開課 = 藍灰（進行中）
const styles = {
  招生中: "bg-brand-soft text-brand-deep ring-brand/20",
  即將開課: "bg-accent-soft text-accent-deep ring-accent/30",
  額滿: "bg-rose-50 text-rose-600 ring-rose-200",
  已開課: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function StatusBadge({ status }) {
  if (!status) return null;
  const cls = styles[status] || "bg-slate-100 text-slate-600 ring-slate-200";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
