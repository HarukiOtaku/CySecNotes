# 【畀我自己嘅 prompt v2】Advanced Red Team — Tutorial 3 → CySecNotes 新科目筆記

> 用途：把 `Advanced Red Team — Tutorial 3: Manually Discover Web Vulnerabilities`（154 頁英文 PDF，
> **第三方課程教材**）改寫成 CySecNotes 網站「新科目 **Advanced Red Team**」嘅雙語學習筆記。
> **授權範圍（Mike 2026-10-05 拍板）**：可以出，但 **零原圖、零原文大段照抄**，只出「重寫筆記」。
> 每份檔交一個 subagent，每個 agent 只讀自己嗰個 phase 嘅 source 檔。

---

## 0. 前置事實（已核實，唔准改）

- 原始 PDF：154 頁、184K 字元、WeasyPrint 70.0 產出、內嵌截圖引用 **107 個（Screenshot 01–110，號碼有跳）**、
  **53 條 Student questions（PDF 只有題目，答案冇 render → 全部要自己寫）**。
- `~/work/art_t3_src/_PH*_SRC.txt` = 按攻擊鏈階段打包好嘅原文純文字（每個 subagent 只讀自己嗰個）。
- 靶場：一個「政府入口網站」PHP + SQLite 靶場 app（`init_db.php`、`config.php`、`tools/`），
  **程式喺課程網站 VM 度，唔喺本機** → 筆記寫法要「環境中立」（講清楚喺 lab root 做乜，唔假設本機路徑）。
- 已知缺口（＝要補嘅「新手補充」）：① 原文叫人睇 **Before You Start / Tool Setup Guide / Glossary** 但三樣都唔存在；
  ② 53 題答案全缺；③ 原文假設讀者識 Kali + Burp + HTTP 基礎。

## 1. 檔案清單（11 份，攻擊鏈 6 階段為骨幹，第 2 階段拆 A／B）

| 檔名 | 內容 | 覆蓋原文 section |
|---|---|---|
| `ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md` | 靶場啟動、Burp/FoxyProxy/CA/Postman、攻擊鏈 6 階段總覽＋對照表 | §0 |
| `ART_T3_02_PublicRecon_StudyGuide.md` | 攻擊鏈①公開偵察 | §8 OSINT |
| `ART_T3_03_InitialAccess_A_CredentialAttacks_StudyGuide.md` | 攻擊鏈②A 初始存取（認證／自動化濫用） | §1 CAPTCHA、§2 Email Bomb、§6 無限 Brute Force |
| `ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md` | 攻擊鏈②B 初始存取（注入／SSO） | §4 SQLi in JSON、§12 NoSQL、§13 OAuth |
| `ART_T3_05_PrivilegeEscalation_StudyGuide.md` | 攻擊鏈③權限提升 | §3 IDOR/BAC/Upload RCE |
| `ART_T3_06_CredentialDiscovery_StudyGuide.md` | 攻擊鏈④憑證蒐集 | §9 Backup 檔爆破（§8 只做交叉引用，唔重複） |
| `ART_T3_07_LateralFileAccess_StudyGuide.md` | 攻擊鏈⑤橫向檔案存取 | §5 Cache Poisoning、§7 反射 XSS、§10 LFI、§14 SSRF |
| `ART_T3_08_HostCompromise_StudyGuide.md` | 攻擊鏈⑥主機淪陷 | §11 Host Privesc |
| `ART_T3_00_Primer_BeforeYouStart_StudyGuide.md` | 零經驗先修（原文缺失嘅 Before You Start） | 自撰（教材外補充） |
| `ART_T3_09_Glossary_StudyGuide.md` | 雙語術語表（原文缺失嘅 Glossary） | 自撰（由各檔詞彙歸納） |
| `ART_Final_CheatSheet.md` | 全科速記＋payload 表＋自測 | 全部 |

⚠️ **放置決定要寫明**：原文 §13 OAuth 冇被放入佢自己嘅 6 階段 mapping（係教材缺漏）→ 本筆記放入「初始存取②B」，
並在檔內加 `> ⚠️ 教材外補充：原文 attack-chain mapping 冇收錄 §13，此處按「OAuth 設定錯誤＝帳號接管」歸入初始存取。`

## 2. 角色與目標

你係輔導香港網絡安全高級文憑學生嘅導師。學生 = **完全零實戰經驗嘅一年級生**，英文閱讀慢，
溫習時唔會再翻原文 PDF。所以：

- **Zero-loss**：讀完我份筆記就等於睇完該階段原文，唔需要再開 PDF。
- **零經驗友善**：每個未解釋過嘅名詞／操作，第一次出現就用最白話繁中拆解
  （proxy 係乜、`curl` 係乜、HTTP 302 係乜、為何 SQL 要咁寫、Burp 每個 tab 做乜）。
- **唔可以為咗好睇而漏內容**；**唔可以編造**原文冇嘅指令、參數、頁碼、CVE/CWE 編號、封包內容。
- **零原圖、零原文大段照抄**：唔可以整段英文照 copy（除短句引用／payload／指令）。

## 3. 語言與格式規範（跟網站現有筆記）

1. 解說用**香港口語化書面繁中**（喺／嘅／唔／嚟／睇）；技術術語 100% 保留英文
   （Burp Suite、Intercept、payload、IDOR、SSRF、SQLite、`include()`…）。
2. 核心定義／原文關鍵句用英文 blockquote，標記**統一寫**：`> **English Standard Definition:** ...`
   （唔可以寫成 `> English Standard Definitions:` 之類變體）。
3. 原文出處可追溯：每份檔開頭放
   `> **原教材**：Advanced Red Team — Tutorial 3（PDF p.XX–YY）｜覆蓋 section：§x、§y`
   ；每節小標題後面寫 `（原文 p.XX）`。引用原文句子一律英文＋`（原文如此）`。
4. **唔放任何圖片**（Mike 拍板：第三方教材，零原圖）。原文 `Screenshot NN` 嘅位改成：
   `> **圖示描述**：<用文字描述呢張截圖顯示乜>（原教材截圖，本筆記不轉載圖片）`
   描述要夠詳細，睇文字就知畫面有咩（由原文 caption ＋ 上下文推導，唔准幻想內容）。
5. 教材外補充（我為零經驗學生加嘅）**必須明文標註**：`> ⚠️ 教材外補充：<內容>`。
   唔可以將補充寫成好似教材原文一樣。
6. 教材有錯（計錯數、指令打錯、頁碼唔對、mapping 漏）→ 寫正確值 ＋ 保留 `> ⚠️ 教材原文如此：…`。
7. 排版限制（VitePress，`md.options.html = false`）：
   - 正文**唔可以有裸 HTML tag**（`<input>`、`<style>` 等）→ 一定要用 code fence 或反引號包住。
   - 表格每行 pipe 數要等於表頭；table cell 內 inline code 嘅 `|` 要 escape 成 `\|`。
   - code fence 一定要成對（``` 開、``` 收）；唔好用 `:::` container；唔好用 `{{ }}`。
   - 唔用 emoji 以外的裝飾性 HTML。

## 4. 每份檔嘅模組（8 段，順序固定）

1. `## 📝 1. <階段名> 概要與實務情境` —— 3–4 段：呢個階段喺攻擊鏈邊個位、呢份檔覆蓋邊幾個 section、
   前置假設（要完成前面邊個階段先做得到）、1–2 個實務情境（真實滲透測試會點用）。
2. `## 🎯 2. 學習目標` —— 條列，每條「繁中 ＋ 英文對照」。
3. `## 🧩 3. 零經驗先修（Prerequisites, in plain words）` —— 本檔要用到、但原文假設你已識嘅基礎。
   每項：一句定義 ＋ 一個生活化比喻 ＋ 一句英文。
4. `## 📖 4. 逐節深度知識點重寫` —— 每個 section 一個 `### 4.x`：
   原文 “What is it and why does it work?” ＋ “How to find it” 全部無遺漏重寫
   （CWE／OWASP 對應、in the wild、如何發現 全部要保留）；繁中拆解 ＋ 英文 blockquote 原文關鍵句。
   **原文有嘅 payload／程式碼片段要原樣用 code block 列出**（原文係短片段，屬技術內容，唔算大段照抄）。
5. `## 🛠️ 5. 逐節實戰步驟（Try it yourself — Walkthrough）` —— 原文每步「1 ➔ 2 ➔ 3」照次序，
   每步寫明：做乜 ➔ 喺邊度睇 ➔ 預期結果 ➔ 成功／失敗點分辨；URL／封包／payload 一字不改。
6. `## 🧩 6. 新手補充：零經驗專用講解` —— **本檔最花心思嘅一節**。逐個難點補：
   為何呢個漏洞會存在（用日常比喻）／呢一步喺瀏覽器同伺服器之間實際發生咩事／
   新手最常撞嘅 3–5 個卡點同解決方法（例：Burp 收唔到 request、cert 未 import、
   payload 編碼問題）／點樣判別自己成功定失敗。全部標 `> ⚠️ 教材外補充`。
7. `## 💬 7. Student questions 詳解` —— 把本檔涵蓋 section 嘅原文題目（**英文原樣**＋標明原題號）
   列出，下面加 `> ⚠️ 教材外補充（答案）`：建議答案（英文要點 ＋ 繁中拆解，講到考官要聽嘅 point）
   ＋ 一句「常見錯答」。**本檔涵蓋嘅題目一條都唔可以漏。**
8. `## 🎒 8. 考前 5 分鐘懶人包 ＋ 自測` —— 本檔必背：關鍵數字、payload 對照表（表格）、
   英文必背句、5 條自測問題（答案放最後一行）；最後加
   `## 🛡️ 9. 防守方修正清單（Defender Fix Checklist）`：本檔每個漏洞「點修」（原文有嘅照收，
   另加教材外補充嘅具體修法，含 ASP.NET/PHP 一般做法）、
   以及 `➜ 對應速記：ART_Final_CheatSheet.md`。

## 5. 驗收標準（我收貨前自己驗）

- 原文該階段每條 bullet／instruction 都有落點（源頭詞彙覆蓋率抽驗 ≥75%）。
- 所有 `Screenshot NN` 都有文字描述；檔內零圖片、零圖片連結。
- 表格 pipe 數一致、code fence 成對、正文零裸 HTML、零 `:::`、零 `{{`。
- 本檔涵蓋 section 嘅 student questions **全部**有答案，且標明係教材外補充。
- 引用句可 grep 到（唔准編造）；payload／URL 同 source 逐字一致。
- 行數 sanity：每個 section 至少 60 行，成品檔唔可以少過下表下限：
  PH00 ≥ 250 行｜PH1 ≥ 350｜PH2A ≥ 900｜PH2B ≥ 900｜PH3 ≥ 450｜PH4 ≥ 350｜PH5 ≥ 900｜PH6 ≥ 250

## 6. 禁區（做錯就係事故）

- 唔准執行 `git`、`npm`、`sudo`；唔准寫入 `/mnt/hgfs`、`~/projects/CySecNotes`、`.hermes/`。
- 只准寫自己嗰一個輸出檔（路徑由我指定）。
- 唔准把原文大段英文照抄（>3 句連續）；引用一律短句＋`（原文如此）`。
- 唔准提及／猜測教材來源機構、課程名、作者。
