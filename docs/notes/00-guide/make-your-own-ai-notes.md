---
title: 如何用 AI 製作屬於自己的筆記（完整 Prompt 公開）
description: 我的 AI 筆記工作流程 + 完整 Prompt v2 — 你也可以建立屬於自己的筆記網站
---

# 如何用 AI 製作屬於自己的筆記

> 這篇文章公開我整個「AI 溫習筆記」的製作方法，包括完整 Prompt 全文。
> 只要你手上有課堂講義（Lecture PPT）或 Lab 工作表，就可以整理出一份像我一樣的雙語應考筆記。
> 我是用本地 AI Agent（**DeepSeek Harness / DSH**）來執行這個 Prompt —— 部署教學見 [部署 DSH & 基本使用](/notes/00-guide/deploy-dsh)。

## 我的工作流程（4 步）

1. **收集教材**：課堂 Lecture PPT、Lab / Workshop Sheet（課程網站通常有 PDF / PPTX 可下載）
2. **交給 AI Agent 執行**：用 DSH（DeepSeek Harness）把教材內容貼進下方的 Prompt，一次處理一課（[部署 DSH 教學](/notes/00-guide/deploy-dsh)）
3. **AI 輸出兩份檔案**：
   - 理論檔 `{COURSE}_L{編號}_{主題}_StudyGuide.md`（應付筆試）
   - Lab 檔 `{COURSE}_Lab{編號}_{主題}_CodeGuide.md`（應付實務測驗）
4. **放上網站**：存入筆記資料夾後 push，網站自動更新

## 完整 Prompt（Copy & Paste）

我使用本地 AI Agent（**DeepSeek Harness / DSH**，部署教學見 [部署 DSH & 基本使用](/notes/00-guide/deploy-dsh)）執行這份 Prompt；這份 Prompt 同樣適用於任何支援長文本的 LLM（Claude、ChatGPT、Gemini 等）。填上 `【課程名稱】`、`【講義清單】`，再在最後貼上教材內容：

````markdown
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
````

## AI 會怎樣整理？（輸出結構預覽）

| 檔案 | 模組 | 用途 |
|------|------|------|
| 理論檔 | 課程概要、學習目標、雙語理論知識點、術語句型庫、學習路線、考前懶人包 | 筆試（MC / Short Questions） |
| Lab 檔 | Lab 目標、步驟拆解、Code/CLI 指令庫、Error 除錯表、測驗題型、理論 recap | 實務測驗（Practical / Lab Test） |

- **雙語原則**：邏輯用繁體中文拆解，背誦重點用 `> 英文 Blockquote` 呈現
- **零資訊遺漏**：產出後理論上不需要再看原始講義與 Lab 檔

## 使用小技巧

- **一次處理一課**：輸出過長時 AI 容易失焦，一課一課來品質最穩定
- **產出後抽查**：程式碼能否直接執行？CLI 指令是否忠於 Lab Sheet？Error Message 與 Fix 是否對應？
- **每科期末**：把各課 Cheat Sheet 合併成 `{COURSE}_Final_CheatSheet.md`，考前 5 分鐘只看它
- **沒有 Lab 的課**：改用 Prompt 中的「合併單一檔案」備選方案即可
- **換科目**：只要改 `【課程名稱】` 與教材內容，同一份 Prompt 可以套用到任何科目

::: tip 為什麼這樣設計
我的目標是「**考試導向 + 實務導向**」雙軌並行：理論檔專攻筆試英文答題，Lab 檔專攻實務測驗的操作步驟，兩者互相引用，溫習時不會漏掉任何一邊。
:::
