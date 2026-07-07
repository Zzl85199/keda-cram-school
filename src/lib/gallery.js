// ===================================================================
//  相簿資料讀取  src/lib/gallery.js
// -------------------------------------------------------------------
//  負責：
//   1. 從 Google 試算表的 CSV 連結抓照片清單
//      （照片實際存放在 Google Drive，試算表只存「連結＋分類＋說明」）
//   2. 過濾掉沒有圖片網址、或標記「隱藏」的照片
//   3. 依 sort_order 排序
//   4. 依 category 分組，方便做分類相簿頁籤
//   5. 任何環節失敗，就顯示「尚未設定照片」的空狀態，不會讓網站壞掉
//
//  照片管理方式請看 README.md 的「校園相簿設定」章節。
//  ※ 一般維護不需要動這個檔案。
// ===================================================================

import { fetchSheetAsObjects } from "@/lib/csv";

// -------------------------------------------------------------------
//  把 Google Drive 的一般分享連結，轉成可以直接當 <img> 顯示的網址
//  支援兩種輸入：
//   1. 已經是可直接顯示的網址（http開頭）→ 原樣使用
//   2. Drive 分享連結（含 /d/檔案ID/ 或 id=檔案ID）→ 自動轉換
//  ※ 試算表建議直接用「image_url」欄位放已轉換好的連結（用公式產生，
//     見 README），這裡多做一層保護，避免主任不小心貼錯格式。
// -------------------------------------------------------------------
function toDirectImageUrl(raw) {
  if (!raw) return "";
  const value = raw.trim();

  const idMatch = value.match(/\/d\/([a-zA-Z0-9_-]+)/) || value.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
  }
  return value; // 不是 Drive 連結，就當作已經是直接圖片網址
}

// 整理單筆照片資料的格式
function normalizePhoto(raw, index) {
  return {
    id: raw.id || String(index + 1),
    image_url: toDirectImageUrl(raw.image_url || raw.drive_link),
    category: (raw.category || "未分類").trim(),
    caption: raw.caption || "",
    sort_order: Number.parseInt(raw.sort_order, 10) || 999,
    status: (raw.status || "顯示").trim(),
  };
}

// 過濾（沒圖片網址、或標記隱藏的都拿掉）＋排序
function cleanAndSort(photos) {
  return photos
    .filter((p) => p.image_url && p.status !== "隱藏")
    .sort((a, b) => a.sort_order - b.sort_order);
}

// 依分類分組，回傳 [{ category, photos: [...] }, ...]
// 分類順序＝該分類第一次出現在清單中的順序（不用另外設定）
function groupByCategory(photos) {
  const order = [];
  const map = new Map();
  for (const photo of photos) {
    if (!map.has(photo.category)) {
      map.set(photo.category, []);
      order.push(photo.category);
    }
    map.get(photo.category).push(photo);
  }
  return order.map((category) => ({ category, photos: map.get(category) }));
}

// -------------------------------------------------------------------
//  對外的主要函式：取得相簿清單
//  回傳 { photos, groups, isConfigured }
//   - photos：全部照片（已排序、已過濾隱藏）
//   - groups：依分類分組後的結果
//   - isConfigured = false 代表還沒設定試算表連結，畫面上要顯示引導文字
// -------------------------------------------------------------------
export async function getGalleryPhotos() {
  const url = process.env.NEXT_PUBLIC_GALLERY_SHEET_URL;

  if (!url || url.includes("PASTE_GOOGLE_SHEET_CSV_URL_HERE")) {
    return { photos: [], groups: [], isConfigured: false };
  }

  try {
    const objects = await fetchSheetAsObjects(url);
    const photos = cleanAndSort(objects.map(normalizePhoto));
    return {
      photos,
      groups: groupByCategory(photos),
      isConfigured: true,
    };
  } catch (err) {
    console.error("[gallery] 無法讀取 Google 試算表：", err);
    return { photos: [], groups: [], isConfigured: true, hasError: true };
  }
}
