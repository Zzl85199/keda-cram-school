// ===================================================================
//  課程資料讀取  src/lib/courses.js
// -------------------------------------------------------------------
//  負責：
//   1. 從 Google 試算表的 CSV 連結抓課程資料
//   2. 解析 CSV（支援逗號、引號、換行）
//   3. 過濾掉「沒有狀態」或「沒有課程名稱」的資料
//   4. 依 sort_order 由小到大排序
//   5. 任何環節失敗，就改用 fallbackCourses 備援資料
//
//  ※ 一般維護不需要動這個檔案。
// ===================================================================

import { fallbackCourses } from "@/data/fallbackCourses";
import { parseCsv, rowsToObjects } from "@/lib/csv";

// 認得的招生狀態（其餘狀態仍會顯示，但用預設樣式）
export const KNOWN_STATUSES = ["招生中", "即將開課", "額滿", "已開課"];

// 把 features 字串拆成陣列（支援「、」與「,」兩種分隔）
function splitFeatures(value) {
  if (!value) return [];
  return value
    .split(/[、,，]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// 整理單筆課程資料的格式
function normalizeCourse(raw, index) {
  return {
    id: raw.id || String(index + 1),
    course_name: raw.course_name || "",
    target_students: raw.target_students || "",
    start_date: raw.start_date || "",
    class_time: raw.class_time || "",
    status: raw.status || "",
    description: raw.description || "",
    features: splitFeatures(raw.features),
    sort_order: Number.parseInt(raw.sort_order, 10) || 999,
    cta_text: raw.cta_text || "我要諮詢",
    cta_url: raw.cta_url || "",
  };
}

// 過濾＋排序
function cleanAndSort(courses) {
  return courses
    .filter((c) => c.course_name && c.status) // 隱藏沒名稱或沒狀態的課
    .sort((a, b) => a.sort_order - b.sort_order); // 依 sort_order 排序
}

// -------------------------------------------------------------------
//  對外的主要函式：取得課程清單
//  回傳 { courses, isFallback }
//   - isFallback = true 代表目前顯示的是備援資料
// -------------------------------------------------------------------
export async function getCourses() {
  const url = process.env.NEXT_PUBLIC_COURSE_SHEET_URL;

  // 沒設定連結，或還是預設的提示字 → 直接用備援資料
  if (!url || url.includes("PASTE_GOOGLE_SHEET_CSV_URL_HERE")) {
    return { courses: cleanAndSort(fallbackCourses), isFallback: true };
  }

  try {
    const res = await fetch(url, {
      // 每 5 分鐘重新抓一次，老師改完試算表幾分鐘內就會更新
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("讀取失敗：HTTP " + res.status);

    const csv = await res.text();
    const objects = rowsToObjects(parseCsv(csv));
    const courses = cleanAndSort(objects.map(normalizeCourse));

    // 萬一試算表是空的，也退回備援資料
    if (courses.length === 0) {
      return { courses: cleanAndSort(fallbackCourses), isFallback: true };
    }
    return { courses, isFallback: false };
  } catch (err) {
    console.error("[courses] 無法讀取 Google 試算表，改用備援資料：", err);
    return { courses: cleanAndSort(fallbackCourses), isFallback: true };
  }
}
