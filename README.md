# 科達文理補習班 官方網站

八德地區小班制升學補習班官網。使用 **Next.js + Tailwind CSS** 製作，
課程資料以 **Google 試算表** 當作簡易後台（CMS），讓非技術人員也能輕鬆維護。

---

## 目錄
1. [這個網站有什麼](#這個網站有什麼)
2. [第一次安裝與啟動](#第一次安裝與啟動)
3. [日常維護：改文字、電話、評價](#日常維護)
4. [課程資料設定（Google 試算表）](#課程資料設定)
5. [Google 試算表欄位說明與範例](#google-試算表欄位說明)
6. [校園相簿設定（本機資料夾）](#校園相簿設定)
7. [榮譽榜設定（Google 試算表）](#榮譽榜設定)
8. [部署上線](#部署上線)
9. [常見問題](#常見問題)
10. [檔案結構](#檔案結構)

---

## 這個網站有什麼

- **六個頁面**：首頁、課程介紹、教學特色、校園相簿、成果與評價、聯絡我們
- **手機優先、響應式設計**：手機、平板、電腦都好看
- **課程卡片自動產生**：直接讀取 Google 試算表，改試算表＝改網站
- **校園相簿分類動態牆**：照片直接放在 public/gallery/ 資料夾，依資料夾分類、依檔名排序
- **榮譽榜動態展示**：跑馬燈牆＋數字動畫，用 Google 試算表管理榜單內容
- **讀不到資料也不會壞**：會自動顯示預設課程或引導設定畫面
- **一鍵撥號、加 LINE、Google 地圖導航**
- **預約試聽表單**（目前為畫面，尚未串接寄信，見[常見問題](#常見問題)）
- **繁體中文 SEO**：標題、描述、地區關鍵字、地圖結構化資料

---

## 第一次安裝與啟動

> 需要先安裝 [Node.js](https://nodejs.org/)（建議 18 以上版本）。

開啟「終端機 / 命令提示字元」，切換到專案資料夾後，依序執行：

```bash
# 1. 安裝套件（只需第一次）
npm install

# 2. 建立設定檔（把範例複製成正式檔）
cp .env.local.example .env.local      # Windows 請用： copy .env.local.example .env.local

# 3. 啟動開發伺服器
npm run dev
```

完成後打開瀏覽器，前往 **http://localhost:3000** 就能看到網站。

> 還沒設定 Google 試算表也沒關係，網站會先顯示 4 筆預設課程。

---

## 日常維護

### 改電話、地址、LINE、首頁文字、家長評價
全部集中在一個檔案：

```
src/lib/config.js
```

打開後，**只修改「引號中間」的文字**即可，不要刪掉逗號、括號。例如改電話：

```js
phoneDisplay: "(03)361-5599",   // ← 改這裡的顯示文字
phoneTel: "0333615599",         // ← 改這裡的撥號數字（只能放數字）
```

改完存檔，網站會自動更新。可修改的內容包含：

| 想改什麼 | 在 config.js 裡找 |
|---|---|
| 補習班名稱、定位 | `site` |
| 電話、手機、地址、LINE、營業時間 | `contact` |
| 上方選單頁面 | `navLinks` |
| 首頁大標題 / 副標 | `hero` |
| 四大核心堅持 | `coreValues` |
| 家長評價 | `testimonials` |
| 成果數據 | `stats` |

---

## 課程資料設定

「最新招生課程」會自動讀取你的 Google 試算表。設定步驟：

### 步驟 1：建立試算表
1. 到 [Google 試算表](https://sheets.google.com) 新增一份空白試算表。
2. 第一列（標題列）填入這 11 個欄位名稱（**英文、順序需一致**）：

   ```
   id  course_name  target_students  start_date  class_time  status  description  features  sort_order  cta_text  cta_url
   ```
3. 從第二列開始，一列填一門課（範例見下一節）。

### 步驟 2：發佈成 CSV 連結
1. 左上角 **檔案 → 共用 → 發布到網路**。
2. 「連結」分頁中，下拉選擇 **要發布的那張工作表**，格式選 **逗號分隔值 (.csv)**。
3. 按 **發布**，複製產生的網址（結尾通常是 `...output=csv`）。

> 也可以用這種格式自行組裝：
> `https://docs.google.com/spreadsheets/d/<試算表ID>/gviz/tq?tqx=out:csv&sheet=<工作表名稱>`

### 步驟 3：把連結貼進設定檔
打開 `.env.local`，把網址貼進去（保留雙引號）：

```env
NEXT_PUBLIC_COURSE_SHEET_URL="https://docs.google.com/spreadsheets/d/xxxx/pub?output=csv"
```

存檔後重新啟動（`npm run dev`）即可。網站每 5 分鐘會自動抓一次最新資料。

---

## Google 試算表欄位說明

| 欄位 | 說明 | 範例 |
|---|---|---|
| `id` | 課程編號（不重複即可） | `1` |
| `course_name` | 課程名稱（**留空則該課不顯示**） | `國一先修班` |
| `target_students` | 適合對象 | `升國一學生` |
| `start_date` | 開課日期 | `6月16日` |
| `class_time` | 上課時間 | `詳洽櫃台` |
| `status` | 招生狀態（**留空則該課不顯示**） | `招生中` |
| `description` | 課程簡介 | `幫助孩子無縫銜接…` |
| `features` | 課程特色，用「、」分隔 | `國英數銜接、預習複習` |
| `sort_order` | 排序（數字越小越前面） | `1` |
| `cta_text` | 按鈕文字 | `預約試聽` |
| `cta_url` | 按鈕連結 | `https://line.me/R/ti/p/@519nsfpn` |

**狀態（status）只認得這四種**，會顯示對應顏色：
`招生中`（綠）、`即將開課`（琥珀）、`額滿`（灰，按鈕自動變不可點）、`已開課`（藍灰）。

### 範例資料（可直接複製到試算表）

| id | course_name | target_students | start_date | class_time | status | description | features | sort_order | cta_text | cta_url |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 國一先修班 | 升國一學生 | 6月16日 | 詳洽櫃台 | 招生中 | 幫助孩子無縫銜接小學與國中學習差異，提前掌握學習節奏。 | 國英數銜接、預習複習、段考總複習、課後輔導 | 1 | 預約試聽 | https://line.me/R/ti/p/@519nsfpn |
| 2 | 國一正式班 | 國一學生 | 9月1日 | 詳洽櫃台 | 即將開課 | 從國一開始建立完整學習基礎，穩定銜接段考與會考準備。 | 小班制、主科加強、學習追蹤、會考基礎 | 2 | 立即詢問 | https://line.me/R/ti/p/@519nsfpn |
| 3 | 小五小六數學專班 | 小五、小六學生 | 長期招生 | 詳洽櫃台 | 招生中 | 強化數學觀念、數感與解題能力，打好升私中與國中數學基礎。 | 課綱同步、數感培養、解題技巧、基礎扎根 | 3 | 了解課程 | https://line.me/R/ti/p/@519nsfpn |
| 4 | 數資及私中班 | 通過測驗學生 | 招生中 | 詳洽櫃台 | 招生中 | 專為數學資優與私立國中考試設計，提前由國中資深老師授課。 | 入班測驗、資優題型、私中準備、國中銜接 | 4 | 預約測驗 | https://line.me/R/ti/p/@519nsfpn |

---

## 校園相簿設定

「校園相簿」頁面（`/gallery`）會自動讀取 `public/gallery/` 資料夾裡的照片，用**分類頁籤 ＋ 動態牆**呈現，點擊可放大瀏覽。照片直接存在專案裡，不需要 Google 試算表或 Google Drive。

### 資料夾結構

```
public/gallery/
├─ 01-教室環境/
│   ├─ 01-三樓國中部教室.jpg
│   └─ 02-四樓高中部教室.jpg
├─ 02-上課情境/
│   └─ 01-小班教學.jpg
└─ 03-活動花絮/
    └─ 01-結業典禮.jpg
```

- **最外層資料夾＝分類**：資料夾名稱會變成相簿的分類頁籤。
- **資料夾／檔名開頭的數字＋「-」或「_」＝排序**：數字越小排越前面（例如 `01-`、`02-`）。不加數字也可以，會排在最後面。
- **檔名數字後面的文字＝照片說明**：會顯示在照片下方（可以不寫，只留數字）。
- **要暫時隱藏，把資料夾或檔名改成「_」開頭**（例如 `_草稿`），網站就不會顯示，也不用真的刪除檔案。

### 新增／刪除照片

1. 把照片檔案（`.jpg`／`.png`／`.webp` 皆可）拖進對應分類資料夾。
2. 用 GitHub 網頁版「Add file → Upload files」上傳，或用 Git 指令 push 上去。
3. Vercel 會自動重新部署，幾分鐘後網站就會更新。
4. 要刪除照片，就直接刪掉該檔案再重新上傳／push。

> **上傳前建議先壓縮照片**（寬度約 1600~2000px、JPEG 品質 75~80%），可以用 [Squoosh](https://squoosh.app) 之類的工具處理。這樣可以避免 GitHub 倉庫越來越肥大，網站也會載入更快。iPhone 拍的 `.HEIC` 檔案瀏覽器無法直接顯示，請先轉成 `.jpg`。

## 榮譽榜設定

「成果與評價」頁面（`/results`）裡的榮譽榜，會自動讀取你的 Google 試算表，用**分類頁籤 ＋ 動態跑馬燈牆**呈現，上方還有依分類統計、捲動進畫面才跳動的數字動畫。

### 步驟 1：建立試算表

1. 到 [Google 試算表](https://sheets.google.com) 新增一份空白試算表。
2. 第一列填入這 7 個欄位名稱：

   ```
   id  student_name  achievement  category  detail  year  sort_order  status
   ```

3. 從第二列開始，**一列填一項榮譽**：
   - `student_name`：學生姓名。**建議保護隱私，只填姓氏＋同學**，例如「陳同學」，不要填完整全名。
   - `achievement`：榮譽榜的主標題，例如「錄取武陵高中」「英語演講比賽全國第二名」。
   - `category`：分類名稱，直接打中文即可，例如「會考成績」「私中榜」「競賽獲獎」「獎學金」。**分類頁籤與統計數字會依資料自動產生**，不用另外設定。
   - `detail`：補充說明（選填），例如「數學、自然雙滿分」。
   - `year`：學年度或年份，例如「114學年」。
   - `sort_order`：數字，越小排越前面。
   - `status`：留空＝顯示；填「隱藏」＝暫時不顯示（不用刪除整列）。

### 步驟 2：發佈成 CSV 連結，貼進設定檔

跟課程資料設定完全一樣的做法：

1. **檔案 → 共用 → 發布到網路**，選這張工作表，格式選 **逗號分隔值 (.csv)**，按發布，複製網址。
2. 打開 `.env.local`，貼進去：

   ```env
   NEXT_PUBLIC_HONORS_SHEET_URL="https://docs.google.com/spreadsheets/d/xxxx/pub?output=csv"
   ```

3. 存檔後重新啟動（`npm run dev`）。網站每 5 分鐘會自動抓一次最新資料。

### 之後怎麼新增／刪除榮譽榜項目

| 想做什麼 | 怎麼做 |
|---|---|
| **新增一項榮譽** | 試算表新增一列，填學生姓名（建議用姓氏＋同學）、榮譽標題、分類 |
| **刪除項目** | 試算表把那一列整列刪除即可 |
| **暫時下架，之後還要用** | 不刪除，把該列 `status` 填「隱藏」 |
| **調整順序** | 改 `sort_order` 數字 |
| **新增一個分類** | 直接在 `category` 欄打新的分類名稱，頁籤與統計數字會自動出現 |

### 範例資料（可直接複製到試算表）

| id | student_name | achievement | category | detail | year | sort_order | status |
|---|---|---|---|---|---|---|---|
| 1 | 陳同學 | 錄取武陵高中 | 會考成績 | 五科五A++ | 114學年 | 1 | |
| 2 | 林同學 | 數理資優班錄取 | 私中榜 | | 114學年 | 2 | |
| 3 | 黃同學 | 英語演講比賽全國第二名 | 競賽獲獎 | 代表學校出賽 | 114學年 | 3 | |

> ※ 榮譽榜是公開展示在網站上的真實內容，請確認資料正確、並取得學生／家長同意後才刊登。

---

## 部署上線

最簡單的方式是 [Vercel](https://vercel.com)（Next.js 官方平台，有免費方案）：

1. 把這個專案上傳到 GitHub。
2. 在 Vercel 點 **Import Project**，選擇該倉庫。
3. 在 Vercel 專案的 **Settings → Environment Variables** 新增：
   - 名稱：`NEXT_PUBLIC_COURSE_SHEET_URL`
   - 值：你的課程 Google 試算表 CSV 連結
   - 名稱：`NEXT_PUBLIC_HONORS_SHEET_URL`
   - 值：你的榮譽榜 Google 試算表 CSV 連結
   （校園相簿不需要設定環境變數，照片直接放在 `public/gallery/` 資料夾裡即可，見上方「校園相簿設定」章節。）
4. 按 **Deploy**，幾分鐘後就會有正式網址。

> 上線後別忘了把 `src/lib/config.js` 裡的 `site.url` 改成你的正式網域，SEO 才正確。

---

## 常見問題

**Q：課程沒有更新？**
A：Google 試算表有 5 分鐘快取；稍等或在 Vercel 重新部署即可。也請確認試算表已「發布到網路」且為 CSV 格式。

**Q：表單送出後資料跑去哪了？**
A：目前表單僅為畫面，送出後會引導家長改用 LINE / 電話。若要真正收件，可在 `src/components/ContactForm.js` 的 `handleSubmit` 串接表單服務（如 Formspree、Google 表單、或自家信箱 API）。

**Q：網站文字想改成別的怎麼辦？**
A：頁面文字大多在各頁檔案（`src/app/.../page.js`）；共用的聯絡與品牌資訊在 `src/lib/config.js`。

**Q：可以換顏色嗎？**
A：可以，主色與點綴色定義在 `tailwind.config.js` 的 `colors`（`brand` 為藍綠主色、`accent` 為琥珀點綴色）。

---

## 檔案結構

```
keda-cram-school/
├─ .env.local.example      ← 設定檔範例（複製成 .env.local 使用）
├─ README.md
├─ package.json
├─ tailwind.config.js      ← 顏色、字型等設計設定
└─ src/
   ├─ app/                 ← 各頁面
   │  ├─ layout.js         ← 全站共用外框、字型、SEO
   │  ├─ page.js           ← 首頁
   │  ├─ courses/page.js   ← 課程介紹
   │  ├─ features/page.js  ← 教學特色
   │  ├─ gallery/page.js   ← 校園相簿
   │  ├─ results/page.js   ← 成果與評價
   │  └─ contact/page.js   ← 聯絡我們
   ├─ components/          ← 可重複使用的元件
   │  ├─ GalleryWall.js    ← 相簿動態牆（分類頁籤＋燈箱）
   │  └─ HonorWall.js      ← 榮譽榜動態展示（跑馬燈＋數字動畫）
   ├─ lib/
   │  ├─ config.js         ← ★最常修改：聯絡資訊與文字
   │  ├─ csv.js            ← 共用的 CSV 解析工具
   │  ├─ courses.js        ← 讀取課程 Google 試算表的程式
   │  ├─ gallery.js        ← 讀取相簿 Google 試算表的程式
   │  └─ honors.js         ← 讀取榮譽榜 Google 試算表的程式
   └─ data/
      └─ fallbackCourses.js ← 備援課程資料
```
#