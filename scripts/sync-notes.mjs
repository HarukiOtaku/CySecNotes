// ============================================================
// CySecNotes — 筆記同步腳本
// 作用：把 HKIIT_notes/ 裡的筆記同步到 docs/notes/（網站讀取的位置）
// 執行：npm run sync（dev / build 指令會自動先執行它）
// 注意：只會「新增 / 覆蓋」，不會刪除 docs/notes 的其他內容
//       （所以 docs/notes 裡的自訂文章如製作指南、index.md 都會保留）
// ============================================================
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.resolve(__dirname, '../HKIIT_notes')
const DST = path.resolve(__dirname, '../docs/notes')

// 不需要同步到網站的資料夾：
// - 00_Prompts：AI Prompt 模板（已收錄在「製作指南」文章）
// - 01_Raw_Materials：原始教材（PPT/DOCX/PKA 等二進位檔，網站用不到）
const EXCLUDE = new Set(['00_Prompts', '01_Raw_Materials'])

function syncDir(from, to) {
  fs.mkdirSync(to, { recursive: true })
  for (const entry of fs.readdirSync(from)) {
    if (EXCLUDE.has(entry)) continue
    const src = path.join(from, entry)
    const dst = path.join(to, entry)
    if (fs.statSync(src).isDirectory()) {
      syncDir(src, dst)
    } else {
      fs.copyFileSync(src, dst)
    }
  }
}

if (!fs.existsSync(SRC)) {
  console.error('找不到 HKIIT_notes/ 資料夾，跳過同步（直接把 .md 放入 docs/notes/ 亦可）')
  process.exit(0)
}

syncDir(SRC, DST)
console.log('✅ 已同步 HKIIT_notes/ → docs/notes/')
