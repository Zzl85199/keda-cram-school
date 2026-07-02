import StatusBadge from "./StatusBadge";
import Icon from "./Icons";

// 單一課程卡片：資料由 Google 試算表動態帶入
//  「額滿」的課會把 CTA 按鈕變成不可點的灰色狀態
export default function CourseCard({ course }) {
  const isFull = course.status === "額滿";

  return (
    <article className="card flex h-full flex-col hover:-translate-y-1 hover:shadow-soft">
      {/* 標題列 */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-ink">{course.course_name}</h3>
        <StatusBadge status={course.status} />
      </div>

      {/* 基本資訊 */}
      <dl className="mb-4 flex flex-col gap-2 text-sm text-ink-soft">
        {course.target_students && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-medium text-ink">適合對象</dt>
            <dd>{course.target_students}</dd>
          </div>
        )}
        {course.start_date && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-medium text-ink">開課日期</dt>
            <dd>{course.start_date}</dd>
          </div>
        )}
        {course.class_time && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-medium text-ink">上課時間</dt>
            <dd>{course.class_time}</dd>
          </div>
        )}
      </dl>

      {/* 課程說明 */}
      {course.description && (
        <p className="mb-4 text-sm leading-relaxed text-ink-soft">{course.description}</p>
      )}

      {/* 課程特色標籤 */}
      {course.features?.length > 0 && (
        <ul className="mb-6 flex flex-wrap gap-2">
          {course.features.map((f, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-xs text-ink-soft ring-1 ring-inset ring-line"
            >
              <Icon name="check" className="h-3.5 w-3.5 text-brand" />
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* CTA 按鈕（永遠貼齊卡片底部） */}
      <div className="mt-auto pt-2">
        {isFull ? (
          <span className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-slate-100 px-6 py-3 text-base font-semibold text-slate-400">
            目前額滿
          </span>
        ) : (
          <a
            href={course.cta_url || "#contact"}
            target={course.cta_url?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            {course.cta_text || "我要諮詢"}
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}
