# CySecNotes 🛡️

**HKIIT 網絡安全筆記庫** — 用 AI 把課堂教材整理成雙語應考筆記，再用 VitePress 自動生成網站。

- 📝 筆記全部是 Markdown 純文字檔，Git 版本控管
- ⚡ 把新 `.md` 放入 `HKIIT_notes/` → push 後自動同步 + 重建 + 側邊欄自動更新
- 🌙 強制深色模式（資安風格）、手機漢堡選單、內建全文搜尋
- 🧩 完整渲染表格、程式碼區塊（含行號）、引用區塊（英文記憶卡）、提示框
- 🚀 內含「[製作指南](docs/notes/00-guide/make-your-own-ai-notes.md)」：完整公開 AI Prompt，任何人都能自製筆記

## 快速開始

需要 Node.js 18+（本專案在 Node 24 測試通過）。

```bash
npm install       # 安裝依賴
npm run dev       # 同步筆記 + 本機開發：http://localhost:5173
npm run build     # 同步筆記 + 產出靜態網站（docs/.vitepress/dist）
npm run preview   # 預覽建置結果
```

> `dev` 與 `build` 都會先自動執行 `npm run sync`，把 `HKIIT_notes/` 同步到 `docs/notes/`。

## 新增筆記（日常使用）

1. 把 `.md` 檔案放入 **`HKIIT_notes/`** 對應課程的資料夾
   （例如 `HKIIT_notes/ITE3102_Network_Fundamentals/02_Study_Guides/`）
2. `git add` → `git commit` → `git push`
3. Vercel 自動同步 + 重建，側邊欄自動更新，完成 ✅

> 不需要改任何設定檔。側邊欄由 `docs/.vitepress/config.mjs` 內的掃描引擎在建置時自動產生。
> 也可以直接放進 `docs/notes/`（同步腳本只會新增/覆蓋，不會刪除自訂內容）。

## 部署

| 平台 | 方式 | 備註 |
|------|------|------|
| **Vercel**（推薦） | 匯入 GitHub Repo，自動偵測 VitePress | 免費、全球 CDN、HTTPS 自動 |
| Netlify | 匯入 Repo，設定已附在 `netlify.toml` | 免費 |
| GitHub Pages | 使用 `.github/workflows/deploy.yml` | 需把 `base` 改成 `'/你的repo名/'` |

## 專案結構

```
CySecNotes/
├── package.json
├── netlify.toml                # Netlify 部署設定（可選）
├── .github/workflows/deploy.yml    # GitHub Pages 部署（可選）
├── scripts/
│   └── sync-notes.mjs          # ★ 筆記同步腳本（HKIIT_notes → docs/notes）
├── HKIIT_notes/                # ★ 筆記來源資料夾（新增 .md 放這裡）
│   ├── ITE3102_Network_Fundamentals/
│   ├── ITP3915_Programming_Fundamentals/
│   └── ITP4456_Database_Applications/
└── docs/
    ├── index.md                # 首頁（介紹 + 免責聲明）
    ├── .vitepress/
    │   ├── config.mjs          # 主設定 + 自動側邊欄引擎
    │   └── theme/
    │       ├── index.js
    │       └── style.css       # 資安深色主題
    ├── public/favicon.svg
    └── notes/                  # 網站讀取的筆記（由同步腳本產生）
        ├── index.md
        └── 00-guide/           # 製作指南（含完整 AI Prompt）
```

## 常見問題

**Q：新增檔案後要重啟 `npm run dev` 嗎？**
側邊欄在 dev 模式下重啟即更新（或直接 push，Vercel 會自動重建）。

**Q：`HKIIT_notes` 和 `docs/notes` 有什麼分別？**
`HKIIT_notes` 是你的「來源資料夾」（日常工作的地方）；`docs/notes` 是網站讀取的副本，由 `npm run sync` 自動生成，不用手動維護。

**Q：想改強調色？**
在 `docs/.vitepress/theme/style.css` 頂部改 `--vp-c-brand-1` 等變數即可。

## 授權

本專案僅供個人學習參考；筆記內容請以官方課堂教材為準。MIT License（程式碼部分）。
