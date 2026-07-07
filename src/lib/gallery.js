// ===================================================================
//  相簿資料讀取  src/lib/gallery.js
// -------------------------------------------------------------------
//  負責：
//   1. 讀取 public/gallery/ 資料夾裡的照片（不再依賴 Google 試算表／Drive）
//   2. 資料夾名稱＝分類，檔名開頭數字＝排序，檔名底線後的文字＝說明文字
//   3. 依分類分組，方便做分類相簿頁籤
//   4. 任何環節失敗，就顯示空狀態，不會讓網站壞掉
//
//  照片管理方式請看 README.md 的「校園相簿設定」章節。
//  ※ 一般維護只要在 public/gallery/ 底下拖放圖片即可，不需要碰這個檔案。
// ===================================================================

import fs from "node:fs";
import path from "node:path";

const GALLERY_ROOT = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

// 資料夾／檔案名稱如果用「_」開頭，代表暫時隱藏，不會顯示在網站上
function isHidden(name) {
  return name.startsWith("_") || name === "隱藏";
}

// 把檔名／資料夾名稱拆成「排序數字」跟「顯示文字」
// 支援："01-三樓國中部教室.jpg" 或 "三樓國中部教室.jpg"（沒數字就用預設順序）
function parseName(rawName) {
  const match = rawName.match(/^(\d+)[-_](.+)$/);
  if (match) {
    return { order: Number.parseInt(match[1], 10), label: match[2] };
  }
  return { order: 999, label: rawName };
}

// 讀取單一分類資料夾裡的所有圖片
function readCategoryPhotos(categoryDir, categoryLabel, categoryOrder) {
  let entries = [];
  try {
    entries = fs.readdirSync(categoryDir, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => !isHidden(entry.name))
    .filter((entry) => IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => {
      const ext = path.extname(entry.name);
      const baseName = entry.name.slice(0, -ext.length);
      const { order, label } = parseName(baseName);
      // 相簿資料夾用資料夾名稱當分類，URL 需要處理中文與空白
      const encodedCategory = encodeURIComponent(path.basename(categoryDir));
      const encodedFile = encodeURIComponent(entry.name);
      return {
        id: `${categoryOrder}-${entry.name}`,
        image_url: `/gallery/${encodedCategory}/${encodedFile}`,
        category: categoryLabel,
        caption: label,
        sort_order: order,
      };
    })
    .sort((a, b) => a.sort_order - b.sort_order);
}

// 依分類分組，回傳 [{ category, photos: [...] }, ...]
// 分類順序＝資料夾名稱開頭數字（例如 01-教室環境、02-上課情境）
function readAllCategories() {
  let entries = [];
  try {
    entries = fs.readdirSync(GALLERY_ROOT, { withFileTypes: true });
  } catch {
    return { groups: [], isConfigured: false };
  }

  const categoryDirs = entries
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !isHidden(entry.name))
    .map((entry) => {
      const { order, label } = parseName(entry.name);
      return { dirName: entry.name, order, label };
    })
    .sort((a, b) => a.order - b.order);

  const groups = categoryDirs
    .map(({ dirName, order, label }) => ({
      category: label,
      photos: readCategoryPhotos(path.join(GALLERY_ROOT, dirName), label, order),
    }))
    .filter((group) => group.photos.length > 0);

  return { groups, isConfigured: true };
}

// -------------------------------------------------------------------
//  對外的主要函式：取得相簿清單
//  回傳 { photos, groups, isConfigured }
//   - photos：全部照片（已排序）
//   - groups：依分類分組後的結果
//   - isConfigured = false 代表 public/gallery/ 底下還沒有任何分類資料夾
// -------------------------------------------------------------------
export async function getGalleryPhotos() {
  try {
    const { groups, isConfigured } = readAllCategories();
    const photos = groups.flatMap((g) => g.photos);
    return { photos, groups, isConfigured };
  } catch (err) {
    console.error("[gallery] 無法讀取 public/gallery/：", err);
    return { photos: [], groups: [], isConfigured: true, hasError: true };
  }
}
