// ===================================================================
//  榮譽榜資料讀取  src/lib/honors.js
// -------------------------------------------------------------------
//  負責：
//   1. 從 Google 試算表的 CSV 連結抓榮譽榜清單
//   2. 過濾掉沒有內容、或標記「隱藏」的項目
//   3. 依 sort_order 排序
//   4. 依 category 分組，方便做分類頁籤
//   5. 計算分類統計數字（給動態展示區的數字動畫用）
//   6. 任何環節失敗，就顯示「尚未設定榮譽榜」的空狀態，不會讓網站壞掉
//
//  榮譽榜管理方式請看 README.md 的「榮譽榜設定」章節。
//  ※ 一般維護不需要動這個檔案。
// ===================================================================

import { fetchSheetAsObjects } from "@/lib/csv";

// 整理單筆榮譽榜資料的格式
function normalizeHonor(raw, index) {
  return {
    id: raw.id || String(index + 1),
    student_name: raw.student_name || "",
    achievement: raw.achievement || "",
    category: (raw.category || "未分類").trim(),
    detail: raw.detail || "",
    year: raw.year || "",
    sort_order: Number.parseInt(raw.sort_order, 10) || 999,
    status: (raw.status || "顯示").trim(),
  };
}

// 過濾（沒有 achievement、或標記隱藏的都拿掉）＋排序
function cleanAndSort(honors) {
  return honors
    .filter((h) => h.achievement && h.status !== "隱藏")
    .sort((a, b) => a.sort_order - b.sort_order);
}

// 依分類分組，回傳 [{ category, honors: [...] }, ...]
// 分類順序＝該分類第一次出現在清單中的順序（不用另外設定）
function groupByCategory(honors) {
  const order = [];
  const map = new Map();
  for (const honor of honors) {
    if (!map.has(honor.category)) {
      map.set(honor.category, []);
      order.push(honor.category);
    }
    map.get(honor.category).push(honor);
  }
  return order.map((category) => ({ category, honors: map.get(category) }));
}

// -------------------------------------------------------------------
//  對外的主要函式：取得榮譽榜清單
//  回傳 { honors, groups, stats, isConfigured }
//   - honors：全部項目（已排序、已過濾隱藏）
//   - groups：依分類分組後的結果
//   - stats：[{ category, count }]，給動態數字統計使用
//   - isConfigured = false 代表還沒設定試算表連結，畫面上要顯示引導文字
// -------------------------------------------------------------------
export async function getHonors() {
  const url = process.env.NEXT_PUBLIC_HONORS_SHEET_URL;

  if (!url || url.includes("PASTE_GOOGLE_SHEET_CSV_URL_HERE")) {
    return { honors: [], groups: [], stats: [], isConfigured: false };
  }

  try {
    const objects = await fetchSheetAsObjects(url);
    const honors = cleanAndSort(objects.map(normalizeHonor));
    const groups = groupByCategory(honors);
    const stats = groups.map((g) => ({ category: g.category, count: g.honors.length }));
    return { honors, groups, stats, isConfigured: true };
  } catch (err) {
    console.error("[honors] 無法讀取 Google 試算表：", err);
    return { honors: [], groups: [], stats: [], isConfigured: true, hasError: true };
  }
}
