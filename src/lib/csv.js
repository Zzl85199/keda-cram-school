// ===================================================================
//  共用 CSV 解析工具  src/lib/csv.js
// -------------------------------------------------------------------
//  courses.js（課程）與 gallery.js（相簿）都是讀 Google 試算表發布的
//  CSV 連結，所以把解析邏輯抽出來共用一份，避免兩邊各寫一次。
//  ※ 一般維護不需要動這個檔案。
// ===================================================================

// -------------------------------------------------------------------
//  小型 CSV 解析器
//  支援被雙引號包住、內含逗號或換行的欄位。
// -------------------------------------------------------------------
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  // 去除 Windows 換行，統一成 \n
  const input = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"'; // 連續兩個引號代表一個引號
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  // 收尾：最後一個欄位 / 最後一列
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

// 把 CSV 表格轉成一筆筆物件（用第一列當欄位名稱）
export function rowsToObjects(rows) {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cols) => {
    const obj = {};
    headers.forEach((key, idx) => {
      obj[key] = (cols[idx] ?? "").trim();
    });
    return obj;
  });
}

// 把試算表發布的 CSV 連結抓下來，轉成物件陣列
// revalidateSeconds：幾秒重新抓一次最新資料（預設 5 分鐘）
export async function fetchSheetAsObjects(url, revalidateSeconds = 300) {
  const res = await fetch(url, { next: { revalidate: revalidateSeconds } });
  if (!res.ok) throw new Error("讀取失敗：HTTP " + res.status);
  const csv = await res.text();
  return rowsToObjects(parseCsv(csv));
}
