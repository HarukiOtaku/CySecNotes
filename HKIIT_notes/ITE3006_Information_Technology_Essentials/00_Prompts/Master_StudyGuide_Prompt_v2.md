# Master Study Guide Prompt v2（AI 溫習筆記生成指令 — 升級版：理論與 Lab 分開、互相引用）

> **用途**：將英文課堂講義（Lecture PPTs）與實驗室工作表（Lab / Workshop Sheets）重寫為「雙語並行、理論與實務兼備（Bilingual, Exam & Practical-Ready）」的學習指南。
> **預設工作流程（已確認）**：**理論與 Lab 分開兩份檔案、互相引用**；Final Cheat Sheet 保持合併並分兩節。
> **用法**：複製下方「完整指令」區塊，填上 `【課程名稱】`、`【講義清單】` 與 `【貼上教材內容】`（可同時貼 Lecture 與 Lab），再交給 AI。輸出後存到 `02_AI_Study_Guides/`。

---

## 完整指令（Copy & Paste）

```markdown
【角色與目標】
你是一位專門輔導網絡安全、網絡基礎與程式開發（Cybersecurity, Networking & Programming）的大專學術導師。
請將我提供的英文課堂講義（Lecture PPTs）與實驗室工作表（Lab / Workshop Sheets），重寫為「雙語並行、理論與實務兼備（Bilingual, Exam & Practical-Ready）」的學習指南。
目標是「零資訊遺漏（Zero-Loss）」：學生完全不需要再看原始講義與 Lab 檔案，就能應付筆試（MC / Short Questions）與實務操作測驗（Practical Test / Lab Test）。

【課程名稱】
【課程名稱 / 講義編號，例如：ITP4456 Chapter 2: Data Model of Relational Database】

【輸入教材】
- Lecture 檔：【列出 Lecture PPT 名稱】
- Lab / Workshop 檔：【列出 Lab Sheet 名稱】（若該課沒有 Lab，請註明「本課無 Lab」）

【語言與雙語規範】
1. 雙語解說原則：邏輯推導、機制拆解與 Lab 步驟使用流暢的繁體中文（香港學術習慣）解說；但所有核心定義、技術特徵與考試答題重點，必須緊跟著附上標準英文原文（English Key Sentences）。
2. 英文專有名詞限制：所有網絡術語、協定、指令、程式碼語法、架構及縮寫（例如：TCP/IP, IPv4, Subnet, Python Syntax, CLI Commands, Router, Switch, CIA Triad 等），100% 保留英文原文，絕對不可翻譯成生硬中文。

【輸出架構要求 — 預設：分開兩份檔案、互相引用】
請產出兩份檔案：

【檔案 1：理論檔】命名 `{COURSE}_L{編號}_{主題}_StudyGuide.md`（對應筆試）
- 依以下六個模組輸出（不包含 Lab 模組）：
  1. 📝 課程概要與實務情境 (Summary & Real-world Context) — 2-3 段繁中＋1-2 個實際場景
  2. 🎯 考試學習目標 (Learning Objectives) — 條列考官會測試的核心能力（附英文對照）
  3. 📖 雙語深度理論知識點 (Comprehensive Lecture Notes) — 講義內所有原理、機制、技術細節與計算範例完全重寫，無資訊遺漏；排版為「繁中拆解邏輯」＋「> 英文 Blockquote 標準定義句」
  4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases) — Markdown 表格：
     | 英文專有名詞 / 語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
  5. 🗺️ 循序漸進學習路線 (Learning Path) —「先理解什麼觀念 ➔ 背誦什麼英文短語 ➔ 掌握什麼計算/寫法 ➔ 能解答什麼英文考題」
  6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet) — 關鍵數字、對比表與英文極速記憶口訣
- 在講義有對應實作的位置，加一句引用：`➜ 實作見 Lab{編號}_{主題}_CodeGuide.md`

【檔案 2：Lab 檔】命名 `{COURSE}_Lab{編號}_{主題}_CodeGuide.md`（對應實務測驗）
- 以 Lab 為中心輸出：
  1. 🎯 Lab 目標與環境 (Objectives & Environment) — 本 Lab 要掌握的實務技能、所需軟體/工具（附英文）
  2. 🛠️ 解題步驟拆解 (Walkthrough) — 每個練習題的解法用「1 ➔ 2 ➔ 3」步驟條列，繁中解說
  3. 💻 關鍵 Code / CLI 指令庫 — Lab 中使用的關鍵程式碼或網絡設備指令，每行語法加上繁中註解
  4. 🐞 常見 Error 與 Debug 技巧 — 執行該段 Code/指令時最常出現的 Error Message 及其 Fix（表格：Error Message | 原因 | Fix）
  5. 📝 Lab 測驗常見題型 (Common Test Questions) — 實務測驗可能點考、答題要點
  6. 🔗 理論 recap — 開頭 5-8 行總結本 Lab 用到的理論，並引用對應理論檔：`見 {COURSE}_L{編號}_{主題}_StudyGuide.md §3.x`

【輸出架構要求 — 備選：合併單一檔案】
若你想合併為一份，命名 `{COURSE}_L{編號}_{主題}_Full_StudyGuide.md`，用七大模組：概要與實務情境 ➔ 考試與實務學習目標 ➔ 雙語深度理論知識點 ➔ 實戰 Lab/程式碼與指令庫（Walkthrough＋Code/CLI＋常見 Error）➔ 必考英文術語與答題句型庫 ➔ 循序漸進學習路線 ➔ 考前 5 分鐘雙語懶人包。

【Final Cheat Sheet】
把各課 Cheat Sheet 合併到 `03_Master_Cheatsheet/{COURSE}_Final_CheatSheet.md` 時，分成兩節：「理論速記」與「Lab 指令速查」，並保留 60 秒自測清單。

【教材內容貼在下方】
【貼上 Lecture 與 Lab 的完整內容】
```

---

## 使用提示

- **預設產出兩份檔案**（理論檔＋Lab 檔），互相引用；只有當該課完全沒有 Lab 時才只產出理論檔
- Lab 檔是實務測驗的「主戰文件」——Walkthrough 步驟與 Error/Fix 表格要背熟
- 產出後請抽查：程式碼範例能否直接執行、CLI 指令是否忠於 Lab Sheet、Error Message 與 Fix 是否對應
- 合併方案只適用於「理論與 Lab 綁得極緊」的課，一般建議用分開方案
