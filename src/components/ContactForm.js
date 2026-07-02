"use client";

import { useState } from "react";
import { contact } from "@/lib/config";
import Icon from "./Icons";

// 預約試聽表單（目前僅前端畫面，尚未串接後端送出）
//  送出後會提示家長改用 LINE 或電話，確保訊息一定收得到。
//  日後要真正收件，可在 handleSubmit 內串接表單服務（README 有說明）。
const grades = ["小五", "小六", "國一", "國二", "國三", "其他"];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const fieldClass =
    "w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-muted focus:border-brand focus:ring-brand";

  if (submitted) {
    return (
      <div className="card text-center">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="text-xl font-bold text-ink">已收到您的需求！</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          為了讓您更快得到回覆，歡迎直接加入 LINE 或來電，由專人協助安排試聽時間。
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={contact.lineUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Icon name="line" className="h-5 w-5" /> 加入 LINE
          </a>
          <a href={`tel:${contact.phoneTel}`} className="btn-outline">
            <Icon name="phone" className="h-4 w-4" /> {contact.phoneDisplay}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
        >
          重新填寫
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          家長稱呼
          <input className={fieldClass} type="text" name="parent" placeholder="例：陳媽媽" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          聯絡電話
          <input className={fieldClass} type="tel" name="phone" placeholder="方便聯絡的手機" required />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          學生姓名
          <input className={fieldClass} type="text" name="student" placeholder="孩子的姓名" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          目前年級
          <select className={fieldClass} name="grade" defaultValue="">
            <option value="" disabled>
              請選擇年級
            </option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        想諮詢的內容
        <textarea
          className={`${fieldClass} min-h-28 resize-y`}
          name="message"
          placeholder="例：想了解國一銜接班的上課時間與費用，方便試聽嗎？"
        />
      </label>

      <button type="submit" className="btn-primary w-full sm:w-auto sm:self-start">
        送出預約需求
        <Icon name="arrow" className="h-4 w-4" />
      </button>
      <p className="text-xs text-ink-muted">
        送出即代表同意我們以電話或 LINE 與您聯繫安排試聽，不會用於其他用途。
      </p>
    </form>
  );
}
