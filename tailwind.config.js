/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色：沉穩的藍綠色，給人專業、信任的感覺
        brand: {
          DEFAULT: "#178C7A",
          deep: "#0F6B5C",
          soft: "#E6F2EF",
        },
        // 點綴色：溫暖的琥珀色，用在主要按鈕、重點標示，增添人情味
        accent: {
          DEFAULT: "#E0962E",
          deep: "#C57E1C",
          soft: "#FBEFD9",
        },
        // 文字色：偏暖的墨綠黑，比純黑更柔和耐看
        ink: {
          DEFAULT: "#1C3A35",
          soft: "#4A625D",
          muted: "#7C918C",
        },
        // 背景與線條
        cream: "#FCFBF6",
        line: "#E4EAE7",
      },
      fontFamily: {
        // 標題用襯線體（書卷感、可信賴），內文用黑體（清晰好讀）
        serif: ['"Noto Serif TC"', "serif"],
        sans: ['"Noto Sans TC"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(28, 58, 53, 0.18)",
        card: "0 4px 20px -8px rgba(28, 58, 53, 0.14)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
