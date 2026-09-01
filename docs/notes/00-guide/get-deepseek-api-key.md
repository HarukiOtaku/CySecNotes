---
title: 快速取得 DeepSeek API Key
description: 3 分鐘搞定 — 申請、建立 Key、充值、使用
---

# 快速取得 DeepSeek API Key

> 給 DSH 或任何 LLM 工具設定模型時，都需要一個 API Key。以下是最快的方法。

## 4 步完成

1. **開帳號**：到 [platform.deepseek.com](https://platform.deepseek.com) 註冊／登入
2. **建立 Key**：左側選單 → **API Keys** → **Create new API key** → 命名後複製（格式 `sk-...`）
3. **充值**：左側 **Billing / 充值**，按用量付費（先充少量即可）
4. **使用**：把 Key 貼到 DSH 或工具的模型設定（DSH 教學見[部署 DSH & 基本使用](/notes/00-guide/deploy-dsh)）

## 常用資料

| 項目 | 值 |
|------|-----|
| Base URL | `https://api.deepseek.com` |
| 對話模型 | `deepseek-chat` |
| 推理模型 | `deepseek-reasoner` |

## 小提示

::: warning 安全
API Key 等同「錢包密碼」——不要貼上網、不要 commit 進 GitHub repo，否則被盜用會被扣餘額。
:::

- Key 建立後**只顯示一次**，記得立刻複製存好
- 用量可在平台的 **Usage** 頁查看
