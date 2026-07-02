// ===================================================================
//  預設課程資料  src/data/fallbackCourses.js
// -------------------------------------------------------------------
//  當「Google 試算表連結沒設定」或「網路讀取失敗」時，
//  網站會改用這份資料，確保畫面永遠不會空白。
//  正式營運時，主要請在 Google 試算表維護課程；
//  這裡可保留一份基本款作為備援。
// ===================================================================

export const fallbackCourses = [
  {
    id: "1",
    course_name: "國一先修班",
    target_students: "升國一學生",
    start_date: "6月16日",
    class_time: "詳洽櫃台",
    status: "招生中",
    description:
      "幫助孩子無縫銜接小學與國中學習差異，提前掌握學習節奏。",
    features: ["國英數銜接", "預習複習", "段考總複習", "課後輔導"],
    sort_order: 1,
    cta_text: "預約試聽",
    cta_url: "https://line.me/R/ti/p/@519nsfpn",
  },
  {
    id: "2",
    course_name: "國一正式班",
    target_students: "國一學生",
    start_date: "9月1日",
    class_time: "詳洽櫃台",
    status: "即將開課",
    description:
      "從國一開始建立完整學習基礎，穩定銜接段考與會考準備。",
    features: ["小班制", "主科加強", "學習追蹤", "會考基礎"],
    sort_order: 2,
    cta_text: "立即詢問",
    cta_url: "https://line.me/R/ti/p/@519nsfpn",
  },
  {
    id: "3",
    course_name: "小五小六數學專班",
    target_students: "小五、小六學生",
    start_date: "長期招生",
    class_time: "詳洽櫃台",
    status: "招生中",
    description:
      "強化數學觀念、數感與解題能力，打好升私中與國中數學基礎。",
    features: ["課綱同步", "數感培養", "解題技巧", "基礎扎根"],
    sort_order: 3,
    cta_text: "了解課程",
    cta_url: "https://line.me/R/ti/p/@519nsfpn",
  },
  {
    id: "4",
    course_name: "數資及私中班",
    target_students: "通過測驗學生",
    start_date: "招生中",
    class_time: "詳洽櫃台",
    status: "招生中",
    description:
      "專為數學資優與私立國中考試設計，提前由國中資深老師授課。",
    features: ["入班測驗", "資優題型", "私中準備", "國中銜接"],
    sort_order: 4,
    cta_text: "預約測驗",
    cta_url: "https://line.me/R/ti/p/@519nsfpn",
  },
];
