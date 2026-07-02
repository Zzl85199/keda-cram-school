import CourseCard from "./CourseCard";
import { contact } from "@/lib/config";
import Icon from "./Icons";

// 課程清單：把一堆課程卡片排成回應式格線
//  showFallbackNotice = true 時，會在最上方顯示「目前為預設課程」的小提醒
export default function CourseList({ courses, isFallback = false, showFallbackNotice = false }) {
  // 完全沒有資料時的友善空狀態
  if (!courses || courses.length === 0) {
    return (
      <div className="card mx-auto max-w-xl text-center">
        <p className="text-lg font-semibold text-ink">課程資訊更新中</p>
        <p className="mt-2 text-sm text-ink-soft">
          最新招生課程正在整理，歡迎直接與我們聯繫，由專人為您說明。
        </p>
        <a
          href={contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mt-5"
        >
          <Icon name="line" className="h-4 w-4" /> 用 LINE 詢問課程
        </a>
      </div>
    );
  }

  return (
    <div>
      {isFallback && showFallbackNotice && (
        <p className="mx-auto mb-8 max-w-2xl rounded-2xl bg-accent-soft px-4 py-3 text-center text-sm text-accent-deep">
          以下為預設課程範例，最新課程資訊請來電或加 LINE 洽詢。
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
