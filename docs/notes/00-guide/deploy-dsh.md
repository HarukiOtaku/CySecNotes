---
title: 部署 DSH（DeepSeek Harness）AI Agent & 基本使用
description: 本地 AI Agent 工作台 — 安裝、Web 介面操作、配合筆記生成的工作流程
---

# 部署 DSH（DeepSeek Harness）AI Agent & 基本使用

> 本網站的所有筆記，都是我用 **DSH** 這個 AI Agent 生成的。
> 這篇教學教你：安裝它、啟動它、用它製作屬於自己的筆記。

## DSH 是什麼？

DSH（DeepSeek Harness，npm 套件名 `@deepseek-ai/dsh`）是一個**本地 AI Agent（智能體）工作台**——它不只是聊天機器人，而是可以依照你的指示**自動讀寫檔案、執行指令、完成多步驟任務**的 AI 代理。官方口號是「Everything is a Plugin」（萬物皆插件）。

- 跑在你自己的電腦上（筆記檔案都留在本機；只有發送給 AI 模型的 API 請求會離開電腦）
- 提供 **Web 介面**：瀏覽器操作，預設網址 http://127.0.0.1:3080
- 提供 **headless 模式**：一條指令跑完一次性任務，適合自動化
- 功能由**插件（Plugin）**擴充，可按需要安裝

## 前置需求

- **Node.js 18 或以上**（本專案在 Node 24 測試通過；沒有就上 https://nodejs.org 下載 LTS 版）
- **AI 模型的金鑰／設定**：首次啟動時依介面提示設定（DSH 需要連接一個 AI 模型才能執行任務；DeepSeek API Key 的申請方法見[快速取得 DeepSeek API Key](/notes/00-guide/get-deepseek-api-key)）

## 安裝（一條指令）

在終端機（Windows 用 PowerShell 或 cmd）執行：

```bash
npm install -g @deepseek-ai/dsh
```

macOS / Linux 若出現權限錯誤，前面加 `sudo` 再試：

```bash
sudo npm install -g @deepseek-ai/dsh
```

確認安裝成功：

```bash
dsh --help
```

## 啟動 Web 介面

```bash
dsh web
```

然後瀏覽器開啟 **http://127.0.0.1:3080**，就是 DSH 的操作介面。

常用參數：

| 指令 | 用途 |
|------|------|
| `dsh web` | 啟動 Web 介面（預設 port 3080） |
| `dsh web --port 8080` | 換一個連接埠 |
| `dsh web --help` | 查看 Web 介面的所有參數 |
| `dsh --profile headless "任務描述"` | 不開瀏覽器，跑完一次性任務並印出結果 |

> 首次啟動 `web` profile 會自動初始化，第一次開啟可能要稍等。

## 基本使用

### 1. Web 介面（日常使用）

在對話框直接下指令即可，例如：

- 「將以下課堂講義內容，用我給你的 Prompt 整理成雙語 Study Guide：……」
- 「把這份 Python 筆記改寫成 Cheatsheet 格式，保留英文關鍵句」
- 「把輸出存成 `ITP3915_L11_XXX_StudyGuide.md`」（它能讀寫工作目錄的檔案）

### 2. Headless 一次性任務（指令列）

不想開瀏覽器時：

```bash
dsh --profile headless "將以下教材整理成雙語筆記：……"
```

### 3. 插件（Plugin）

DSH 的功能靠插件擴充，管理指令如下（參數會轉發給該 profile 的 pnpm）：

```bash
dsh plugin --profile web add <插件套件名>
```

官方插件清單可到官方 GitHub repo 查閱。

## 配合本筆記庫的完整工作流程

1. **準備教材**：下載課堂 Lecture PPT / Lab Sheet，把內容複製成文字
2. **開啟 DSH**：`dsh web` → 瀏覽器開 http://127.0.0.1:3080
3. **貼上 Prompt**：複製[製作指南](/notes/00-guide/make-your-own-ai-notes)中的完整 Prompt，填上課程名稱與教材內容
4. **讓 DSH 輸出**：叫它直接存成 `.md` 檔案，或手動複製結果
5. **放入筆記庫**：存到 `HKIIT_notes/` 對應課程的資料夾
6. **push 上線**：`git push` → 網站自動同步 + 更新 ✅

## 安全提示

- DSH 會按你的指示**執行指令**，請只在可信的專案與環境中使用，執行前留意它準備做的動作
- API 金鑰是敏感資料，**不要寫進會被 push 的檔案**（例如 repo 內的 `.env`）
- AI 輸出可能有錯漏，重要內容請自行核對

## 參考資源

- 官方 GitHub：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)
- 中文文檔（阿里雲 Model Studio）：[DeepSeek Harness](https://help.aliyun.com/zh/model-studio/deepseek-harness)
- Ollama 整合說明：[docs.ollama.com/integrations/deepseek-harness](https://docs.ollama.com/integrations/deepseek-harness)
- 裝好後隨時可查：`dsh --help`、`dsh web --help`
