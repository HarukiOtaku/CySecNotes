// ============================================================
// NotesWEB — VitePress 主設定檔
// 重點：這裡有一個「自動掃描 docs/notes/ 產生側邊欄」的小引擎，
// 你以後新增 .md 檔案完全不用改任何設定，重新建置就自動出現。
// ============================================================

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 筆記資料夾位置（就是「丟 .md 進來的地方」）
const notesDir = path.resolve(__dirname, '../notes')

// ------------------------------------------------------------
// ① 資料夾名稱 → 側邊欄顯示的中文分類名稱
//    新增一個分類資料夾時，來這裡加一行對應即可
//    （沒有對應的資料夾會直接顯示原始名稱，所以不加也不會壞）
// ------------------------------------------------------------
const CATEGORY_LABELS = {
  '00-guide': '🚀 製作指南',
  'ITE3006_Information_Technology_Essentials': '💻 ITE3006 資訊科技基礎',
  'ITE3102_Network_Fundamentals': '🌐 ITE3102 網絡基礎',
  'ITP3915_Programming_Fundamentals': '🐍 ITP3915 程式基礎',
  'ITP4456_Database_Applications': '🗄️ ITP4456 資料庫應用',
  '02_Study_Guides': '📘 學習指南',
  '02_AI_Study_Guides': '📘 學習指南',
  '03_Master_Cheatsheet': '⚡ 精讀 Cheatsheet',
  '00_Prompts': '🤖 Prompt 模板',
}

// ------------------------------------------------------------
// ② 讀取 .md 檔的標題
//    優先取 frontmatter 的 title，再來是第一個 # 標題，最後才用檔名
// ------------------------------------------------------------
function extractTitle(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (fm) {
    const t = fm[1].match(/^title:\s*(.+)$/m)
    if (t) return t[1].trim().replace(/^['"]|['"]$/g, '')
  }
  const h1 = raw.match(/^#\s+(.+)$/m)
  if (h1) return h1[1].trim()
  return path.basename(filePath, '.md')
}

// ------------------------------------------------------------
// ③ 自動掃描 notes 資料夾 → 回傳側邊欄結構（支援任意深度子資料夾）
//    放法範例：
//      A) docs/notes/01-cybersecurity/xxx.md              （一層）
//      B) docs/notes/ITE3102_Network_Fundamentals/02_AI_Study_Guides/xxx.md
//                                                          （多層，會自動巢狀分組）
// ------------------------------------------------------------
function buildSidebar() {
  const walk = (dir, prefix) => {
    const items = []
    for (const entry of fs.readdirSync(dir).sort()) {
      if (entry.startsWith('.')) continue // 跳過隱藏檔
      const entryPath = path.join(dir, entry)

      if (fs.statSync(entryPath).isDirectory()) {
        const children = walk(entryPath, `${prefix}/${entry}`)
        if (children.length > 0) {
          items.push({
            text: CATEGORY_LABELS[entry] ?? entry,
            collapsed: false,
            items: children,
          })
        }
      } else if (entry.endsWith('.md') && entry !== 'index.md') {
        items.push({
          text: extractTitle(entryPath),
          link: `${prefix}/${entry.replace(/\.md$/, '')}`,
        })
      }
    }
    return items
  }
  return walk(notesDir, '/notes')
}

// ------------------------------------------------------------
// ④ 主要設定
// ------------------------------------------------------------
export default defineConfig({
  // 用 GitHub Pages 部署時，改成 base: '/你的repo名稱/'（例如 '/NotesWEB/'）
  base: '/',

  lang: 'zh-Hant',
  title: 'CySecNotes',
  description: 'HKIIT 網絡安全筆記庫 — AI 輔助整理的雙語應考筆記',

  // 顯示「最後更新」時間（來自 git commit 日期）
  lastUpdated: true,

  // 網址不帶 .html（/notes/network-security）
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0a0e16' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap',
      },
    ],
  ],

  markdown: {
    // 程式碼區塊顯示行號
    lineNumbers: true,
    // 程式碼永遠用深色主題（配合強制深色模式）
    theme: { light: 'github-dark', dark: 'github-dark' },
    image: { lazyLoading: true },
    // 把筆記正文中「沒有用反引號包住」的 HTML 標籤（例如 <style>、<head>）
    // 當成純文字顯示，避免 VitePress 把它們當成網頁標籤解析而令建置失敗
    config: (md) => {
      md.options.html = false
    },
  },

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'CySecNotes',

    // ★ 強制深色模式：永遠黑底，不顯示淺色/深色切換按鈕
    appearance: 'force-dark',

    nav: [
      { text: '首頁', link: '/' },
      { text: '📚 筆記庫', link: '/notes/' },
    ],

    // ★ 側邊欄 = 自動掃描 docs/notes/ 產生（見上方 buildSidebar）
    sidebar: buildSidebar(),

    // 右側「本頁目錄」：顯示 h2、h3
    outline: { level: [2, 3], label: '本頁目錄' },

    docFooter: { prev: '上一篇', next: '下一篇' },

    lastUpdated: {
      text: '最後更新',
      formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
    },

    // 內建本地搜尋（不需要任何外部服務）
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜尋筆記', buttonAriaLabel: '搜尋筆記' },
          modal: {
            noResultsText: '找不到相關筆記',
            resetButtonTitle: '清除搜尋條件',
            footer: {
              selectText: '選擇',
              navigateText: '切換',
              closeText: '關閉',
            },
          },
        },
      },
    },

    sidebarMenuLabel: '選單',
    returnToTopLabel: '回到頂部',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HarukiOtaku/CySecNotes' },
    ],
  },
})
