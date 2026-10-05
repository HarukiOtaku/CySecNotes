# ART_T3 Stage 0：環境與工具 ＋ 攻擊鏈總覽（Lab Setup, Tools & Attack-Chain Overview）— 雙語應考學習指南

> **原教材**：Advanced Red Team — Tutorial 3（PDF p.1–11）｜覆蓋 section：§0（Lab Setup）＋ front matter（Tutorial Aims、Introduction、Attack Chain、Table of Contents）
> **這份檔喺攻擊鏈嘅位**：Stage 0 = 攻擊鏈嘅「第 0 階段：環境與工具」。呢份唔係打靶，而係**起好個靶場、較好個代理、學識兩個核心工具（Repeater／Intruder）**，並且睇清楚之後 14 節會走去邊份筆記。
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 最後對照懶人包自測
> **前置**：呢份係全科第一份，冇前置檔。讀完呢份請接住讀 `ART_T3_02_PublicRecon_StudyGuide.md`。
> **原始出處**：`~/work/art_t3_src/_PH00_setup_tools_SRC.txt`（由第三方英文教材 PDF p.1–11 抽出嘅純文字）

---

## 📝 1. Stage 0（環境與工具）概要與實務情境

呢份檔覆蓋原文 **§0 Lab Setup 同 front matter**，即係成個 tutorial 嘅「地基」。原文一開頭（p.1）先列 Tutorial Aims、Main Techniques，再講 Introduction；p.2 講明「the capstone chain」= 六階段攻擊鏈；跟住 p.2–3 出 Table of Contents（§0 至 §14 共 15 節）；最後 p.4–11 就係 §0 本體，教你點樣起靶場、點樣用 Firefox＋Burp 做攔截代理、點樣用 Burp Repeater 同 Intruder。

**呢個階段喺攻擊鏈邊個位**：原文把成個攻擊流程叫做一個「capstone chain」，即係**公開偵察 → 初始存取 → 權限提升 → 憑證蒐集 → 橫向檔案存取 → 主機淪陷**六個階段。而 Stage 0（環境與工具）唔係六階段之一，佢係**六階段之前嘅準備**：冇起好靶場、冇較好代理，你之後一節都做唔到。所以本檔＝「開工前 Checklist」。

**前置假設**：原文假設你（1）已經身處一個**故意整到有漏洞嘅靶場環境**（不是真實網站）；(2) 有一部行到 PHP 嘅 lab 機（原文用 Kali 做例子）；(3) 識用瀏覽器同基本命令列。原文自己講：「If you are already comfortable proxying Firefox through Burp, you can skip to Section 1.」——即係如果你已經好熟 Burp 代理，可以直接跳去 §1。但對零經驗嘅你，**Step 0 一步都不能跳**。

**實務情境一（真實滲透測試會點用）**：真實紅隊工作第一步永遠唔係打漏洞，而係**建立工作環境**——架好一個 HTTPS/HTTP 攔截代理（Burp Suite），令所有瀏覽器流量都經你手，可以逐個 request 睇、改、重播。呢個喺真客環境一樣做法，只係目標換成有授權嘅客戶網站。Target 環境通常係一個 staging／lab、或者客戶簽好授權書（scope）嘅範圍。原文開宗明義提醒：「Binding to `0.0.0.0` lets LAN peers reach the lab, which is acceptable only because this app is deliberately vulnerable.」——即係**只可以喺故意有漏洞嘅靶場先咁做**，真實環境綁 `0.0.0.0` 係大忌。

**實務情境二**：原文個靶場表面看落係一個「**正常嘅政府入口網站**（government website）」，但底層故意放滿常見嘅安全錯誤（weak passwords、IDOR、SQLi、LFI⋯）。紅隊嘅日常工作就係：睇住表面正常嘅 app，搵出開發者**冇為意嘅錯誤**，證明佢有幾危險，再話畀防守方知點修。呢個「think like an attacker，但目的係防守」嘅思路，就係原文 Tutorial Aims 第一條。

> **English Standard Definition:** "This lab looks like a normal government website on the surface, but underneath it is deliberately built with common security mistakes. Your job is to find those mistakes, understand why they are dangerous, and learn how to fix them."

---

## 🎯 2. 學習目標（Learning Objectives）

讀完 Stage 0，你應該要能夠：

1. **啟動靶場 server 並初始化資料庫** — Start the built-in PHP server and initialise the SQLite database via `init_db.php`
2. **解釋 `PHP_CLI_SERVER_WORKERS=12` 為何必要** — Explain why the `PHP_CLI_SERVER_WORKERS` environment variable is required (avoiding deadlock on self-referential SSRF／OAuth requests)
3. **設定 Firefox 經 Burp Suite 走代理** — Configure Firefox to proxy traffic through Burp Suite via FoxyProxy
4. **安裝 Burp CA 憑證並驗證 HTTPS 攔截** — Download and import the Burp CA certificate so Burp can intercept TLS traffic
5. **用 Burp Repeater 改一個 request 再重播** — Use Burp Repeater to edit and resend a single request
6. **用 Burp Intruder 做自動化請求（positions ＋ payloads ＋ numbers）** — Use Burp Intruder to automate requests and spot valid credentials by response length／status
7. **背出攻擊鏈 6 階段同 15 個 section 嘅對應** — State the six attack-chain phases and map all 15 sections (§0–§14) to them
8. **講出預設帳號同靶場檔案結構** — State the default administrator credentials and the lab file layout (`init_db.php`、`config.php`、`tools/`)
9. **自己驗證「裝好晒」** — Run a self-check that proves the proxy chain and lab are both working

---

## 🧩 3. 零經驗先修（Prerequisites, in plain words）

以下係本檔要用到、但原文**假設你已經識**嘅基礎。每一項：一句定義 ＋ 一個生活化比喻 ＋ 一句英文。

**3.1 Server（伺服器）**
- 定義：一部長時間開住、等住收 request 再回 response 嘅電腦程式。你部電腦（client）主動問，server 被動答。
- 比喻：茶餐廳個「廚房」——你（客人／client）落單，廚房（server）煮好再遞出去。
- English: A server listens for and answers requests sent by a client.
> ⚠️ 教材外補充：本檔個靶場 server 就係一部用 PHP 寫嘅 web server，你可以用瀏覽器去「落單」。

**3.2 Localhost 同 127.0.0.1**
- 定義：`localhost` 係「本機自己」嘅別名，對應 IP `127.0.0.1`。`http://127.0.0.1:8080` 即係「去呢部機自己嘅 8080 埠」。
- 比喻：喺屋企講「我自己」，唔使出街。
- English: `localhost` (`127.0.0.1`) refers to the machine itself.

**3.3 Port（埠）**
- 定義：一部機可以同時行好多個服務，用「port 號」分開，就好似同一座大廈唔同門牌。HTTP 常用 80、HTTPS 443；本檔用 8080。
- 比喻：同一座大廈（同一部機），唔同單位（port）入唔同嘅人。
- English: A port number distinguishes different services running on the same host.

**3.4 Proxy（代理）／Intercepting Proxy（攔截代理）**
- 定義：介乎瀏覽器同 server 中間嘅「中間人」。所有 request 都要經過佢，佢可以停低、睇、改。Burp Suite 就係攔截代理。
- 比喻：一個「海關檢查站」——你寄包裹（request）去外國，海關可以拆開睇、改內容、再放行。
- English: An intercepting proxy sits between the browser and the server, letting you view and modify every request and response.
> ⚠️ 教材外補充：Burp Suite 由 PortSwigger 出，係滲透測試最常用嘅攔截代理工具。原文只叫你用，冇解釋原理，呢個係原文嘅缺口。

**3.5 HTTP Request／Response（請求／回應）**
- 定義：瀏覽器送出去嘅叫 request（有 method 例如 `GET`／`POST`、URL、headers、body）；server 回嘅叫 response（有 status code 例如 `200`、`302`、`401` 同內容）。
- 比喻：一封「掛號信」——request 係你寄出嘅信（信封寫住寄畀邊個），response 係對方回信。
- English: A request is what the browser sends; a response is what the server returns.

**3.6 TLS／HTTPS 同 CA 憑證**
- 定義：HTTPS ＝ HTTP ＋ TLS 加密。要攔截 HTTPS，Burp 要「冒充」目標網站，但瀏覽器只信得過有簽名（CA）嘅憑證——所以你要親手把 Burp 嘅 CA 憑證裝入 Firefox，等瀏覽器「信得過」Burp。
- 比喻：TLS 係一把鎖，CA 憑證係「鎖匙授權書」。Burp 要中途開信，就要你親自授權佢。
- English: To intercept HTTPS, Burp presents its own certificate, so you must import Burp's CA certificate into your browser's trust store.

**3.7 SQLite／MySQL（資料庫）**
- 定義：SQLite 係一個「唔使裝 server、單一檔案」嘅輕量資料庫；MySQL 係要另外裝 server 嘅資料庫。本靶場用 SQLite，所以**唔使裝 MySQL**。
- 比喻：SQLite 係「一個 Excel 檔案」，MySQL 係「要開一間數據中心」。
- English: The lab uses plain PHP with a local SQLite database, so MySQL is not required.

---

## 📖 4. 逐節深度知識點重寫（Comprehensive Notes — 完全替代版）

### 4.1 Front matter：Tutorial Aims 同 Main Techniques（原文 p.1）

**繁中解說**：原文開頭講清楚成個 tutorial 嘅目標有三大條：**（1）Think like an attacker**，喺一個擬真嘅政府入口網站搵出常見 web 漏洞；**（2）Exploit each vulnerability safely inside the lab**，即係喺靶場安全地利用漏洞，同時明白防守方應該點修；**（3）Progress through a 15-section attack chain**，由公開偵察一路行到主機淪陷（六階段見下）。

**Main Techniques You Will Learn（原文 p.1，共 15 項技術）**：原文列出成個 tutorial 會用到嘅技術，我照原文順序列出（每項都係之後某一節會學嘅內容）：

| # | 原文技術名稱 | 繁中意思 |
|---|---|---|
| 1 | Proxying traffic with Burp Suite (Repeater & Intruder) | 用 Burp Suite（Repeater 同 Intruder）代理流量 |
| 2 | Client-side validation bypass | 繞過前端（瀏覽器）驗證 |
| 3 | IDOR & broken access control | IDOR 同存取控制失效 |
| 4 | File upload leading to remote code execution (RCE) | 檔案上傳導致遠端程式碼執行 |
| 5 | Blind SQL injection with custom Python tooling | 盲注 SQL injection（用自製 Python 工具） |
| 6 | Web cache poisoning | Web 快取污染 |
| 7 | Brute-force attacks & rate-limit bypass | 暴力破解同繞過速率限制 |
| 8 | Reflected XSS via HTTP header | 透過 HTTP header 嘅反射型 XSS |
| 9 | OSINT & credential leaks | 公開來源情報同憑證洩漏 |
| 10 | Backup-file discovery | 備份檔發現 |
| 11 | Local file inclusion (LFI) via i18n language loaders | 透過 i18n 語言載入器嘅本地檔案包含 |
| 12 | NoSQL operator injection | NoSQL 運算子注入 |
| 13 | OAuth misconfiguration | OAuth 設定錯誤 |
| 14 | Server-side request forgery (SSRF) | 伺服器端請求偽造 |

> **English Standard Definition:** "Think like an attacker: identify common web vulnerabilities in a realistic government-portal target."

**Introduction（原文 p.1）**：原文重申呢個 lab「表面正常、底下故意有錯」，並逐一講每個 section 會教你「what it is（係乜）、how to spot it（點發現）、how to exploit it safely（點安全利用）、how to prevent it（點防）」。原文同時叫人：「If you are completely new to web security, start with Before You Start and the Tool Setup Guide. Use the Glossary whenever you see an unfamiliar term.」

> ⚠️ 教材外補充：原文叫你睇 **Before You Start**、**Tool Setup Guide**、**Glossary**，但**呢三樣喺教材入面都唔存在**（原 PDF 冇呢幾章）。呢個係原文已核實嘅缺口。本系列筆記用另兩份檔補返：`ART_T3_00_Primer_BeforeYouStart_StudyGuide.md`（零經驗先修）同 `ART_T3_09_Glossary_StudyGuide.md`（雙語術語表）。

> ⚠️ 教材原文如此：原文 Tutorial Aims 寫「a 15-section attack chain」，但 Table of Contents 嘅 §0 係 Lab Setup（環境設定），並非「攻擊」本身；真正嘅攻擊 section 係 §1–§14。

### 4.2 攻擊鏈總覽：六階段 capstone chain（原文 p.2）

**繁中解說**：原文 p.2 用一句總結條鏈嘅流向：「public recon → initial access → privilege escalation → credential discovery → lateral file access → host compromise」。下面逐階段列出原文嘅說明（含對應 section 號）：

| 階段 | 名稱（繁中／英文） | 原文說明（重點） | 對應 section |
|---|---|---|---|
| ① | 公開偵察／Public recon | 由公開來源（員工名錄、Git 歷史）蒐集 OSINT，喺登入之前就漏出有效用戶名 | §8 |
| ② | 初始存取／Initial access | 由弱嘅「前門」打入：CAPTCHA 繞過、email bombing 污染 reset flow、無限暴力破解、SQL/NoSQL injection 登入繞過 | §1、§2、§4、§6、§12 |
| ③ | 權限提升／Privilege escalation | 由低權限據點升級到 admin：IDOR、存取控制失效、隱藏管理端點、上傳功能濫用成 RCE | §3 |
| ④ | 憑證蒐集／Credential discovery | 收割「周圍放低」嘅秘密：暴力破解 backupt 檔、外洩 config 備份、stealer-log 式憑證傾倒 | §8、§9 |
| ⑤ | 橫向檔案存取／Lateral file access | 觸及更多數據／伺服器：語言載入器 LFI、web cache poisoning、SSRF、反射 XSS 偷 admin session | §5、§7、§10、§14 |
| ⑥ | 主機淪陷／Host compromise | 用 app 洩漏嘅內部提示，由 web 用戶升到主機層權限 | §11 |

> **English Standard Definition:** "The capstone chain: public recon → initial access → privilege escalation → credential discovery → lateral file access → host compromise."

> ⚠️ 教材原文如此（矛盾點一）：**§8 同時出現喺階段①（public recon）同階段④（credential discovery）**。同一節被 map 去兩個階段，係原文自己嘅 mapping 寫法（OSINT 搵用戶名既係偵察、亦係一種憑證蒐集）。本系列筆記嘅處理：§8 主體放 `ART_T3_02_PublicRecon_StudyGuide.md`，`ART_T3_06_CredentialDiscovery_StudyGuide.md` 只做交叉引用、唔重複。

> ⚠️ 教材原文如此（矛盾點二）：原文嘅六階段 mapping **完全冇收錄 §13 OAuth／SSO Misconfiguration**。呢個係教材缺漏。本系列筆記嘅處理：按「OAuth 設定錯誤 ＝ 帳號接管」嘅性質，把 §13 歸入**初始存取②B**（`ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md`），並在該檔加教材外補充標註。

### 4.3 Table of Contents：15 節 ↔ 本系列筆記檔名對照表（原文 p.2–3）

**繁中解說**：原文 Table of Contents 由 §0 排到 §14，共 **15 節**。下表係「原文 section」對「本系列邊份筆記檔」嘅完整對照（呢個表係成個科目嘅地圖，交接位一眼睇清）：

| 原文 § | 原文標題 | 繁中 | 收錄於本系列檔名 |
|---|---|---|---|
| §0 | Lab Setup | 環境與工具 | **`ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md`（本檔）** |
| §1 | CAPTCHA Bypass | CAPTCHA 繞過 | `ART_T3_03_InitialAccess_A_CredentialAttacks_StudyGuide.md` |
| §2 | Email Bomb | Email 轟炸 | `ART_T3_03_InitialAccess_A_CredentialAttacks_StudyGuide.md` |
| §3 | Admin Privilege Escalation (Hidden Endpoint) | 管理員權限提升（隱藏端點） | `ART_T3_05_PrivilegeEscalation_StudyGuide.md` |
| §4 | SQL Injection in a JSON Object | JSON 物件內嘅 SQL 注入 | `ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md` |
| §5 | Web Cache Poisoning | Web 快取污染 | `ART_T3_07_LateralFileAccess_StudyGuide.md` |
| §6 | Unlimited Brute Force | 無限暴力破解 | `ART_T3_03_InitialAccess_A_CredentialAttacks_StudyGuide.md` |
| §7 | Reflected XSS via HTTP Header | HTTP header 反射型 XSS | `ART_T3_07_LateralFileAccess_StudyGuide.md` |
| §8 | OSINT / Username Leakage | 公開情報／用戶名洩漏 | `ART_T3_02_PublicRecon_StudyGuide.md`（§4 另作交叉引用） |
| §9 | Backup File Brute Force | 備份檔暴力破解 | `ART_T3_06_CredentialDiscovery_StudyGuide.md` |
| §10 | Local File Inclusion via Language Loader | 語言載入器本地檔案包含 | `ART_T3_07_LateralFileAccess_StudyGuide.md` |
| §11 | Host Privilege Escalation via Internal Hints | 內部提示主機權限提升 | `ART_T3_08_HostCompromise_StudyGuide.md` |
| §12 | NoSQL Injection via JSON Wildcard | JSON 通配符 NoSQL 注入 | `ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md` |
| §13 | OAuth / SSO Misconfiguration | OAuth／SSO 設定錯誤 | `ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md`（教材外補充：原文 mapping 漏收） |
| §14 | Server-Side Request Forgery (SSRF) | 伺服器端請求偽造 | `ART_T3_07_LateralFileAccess_StudyGuide.md` |

**額外兩份（教材外）：**`ART_T3_00_Primer_BeforeYouStart_StudyGuide.md`（零經驗先修）、`ART_T3_09_Glossary_StudyGuide.md`（雙語術語表）；另有全科速記 `ART_Final_CheatSheet.md`。

### 4.4 §0.1 Start the lab application — 啟動靶場（原文 p.4–5）

**繁中解說**：原文講明靶場係「**plain PHP ＋ 本地 SQLite**」，所以**唔使裝 MySQL 或者其他資料庫 server**（SQLite 只係一個檔案，慳位又免安裝）。

**Step 1 — 喺 lab root 目錄啟動內建 server：**要喺「含有 `init_db.php` 同 `config.php` 嘅資料夾」（即 lab root）開一個終端，執行：

```bash
PHP_CLI_SERVER_WORKERS=12 php -S 0.0.0.0:8080
```

成功嘅話，PHP 會印一行類似 `PHP 8.x Development Server (http://0.0.0.0:8080) started`，而且**個終端會一直黐住個 server**（唔會返返 command prompt，即係 server 正在運行）。

**Step 2 — 只做一次嘅建庫：**用 Firefox 去 `http://127.0.0.1:8080/init_db.php`。成功嘅話，頁面會顯示 `Database initialised successfully.`，另外仲會報三件事：`Default admin: admin / 123qwe!@#`、`Default users have weak passwords shown in the tutorial.`、`Backup files created under /backup/ for brute-force discovery.`

**預設管理員帳號：`admin / 123qwe!@#`。**

**Step 3 — 為何需要 `PHP_CLI_SERVER_WORKERS=12`？**原文解釋：PHP 內建 server **係單執行緒（single-threaded）**，遇到「**自己叫自己**」嘅請求（self-referential）——即係 §13 OAuth 同 §14 SSRF 嗰啲 request —— 就會**死鎖（deadlock）**，卡住唔郁。設 `PHP_CLI_SERVER_WORKERS=12` 開多條 worker 分工，就唔會死鎖。

**為何綁 `0.0.0.0`？**`0.0.0.0` 代表「本機所有網絡介面」，令同一 LAN 嘅其他機都入到嚟。原文加咗一句提醒：呢個做法**只可以喺故意有漏洞嘅靶場先接受**。

> **English Standard Definition:** "The `PHP_CLI_SERVER_WORKERS=12` environment variable is required because the single-threaded built-in server deadlocks on the self-referential SSRF and OAuth requests used in Sections 13–14."

**工具選擇（原文 p.5）**：所有 web 練習一律用 **Firefox、Burp Suite 或 OWASP ZAP** 做；**Postman**（一個可以唔經瀏覽器、手寫 HTTP request 嘅 API client）只用喺 §2 其中一個練習。`tools/` 資料夾入面係導師／自動化示範用嘅 helper script，**GUI 路線可以唔理**。

### 4.5 §0.2 Configure Firefox to use Burp Suite — 瀏覽器＋代理設定（原文 p.5–9）

**繁中解說**：有幾個練習要你「睇／改 HTTP request」，所以原文用 Burp Suite 做**攔截代理**。原文講明：「If you are already comfortable proxying Firefox through Burp, you can skip to Section 1.」但對你，請一步步跟。原文共 7 步：

**Step 1 — 開 Burp Suite。**由 Kali 選單揀 `Applications > Web Application Analysis > burpsuite`，或者開終端打 `burpsuite`，等主視窗出現（Burp Suite Dashboard，用 temporary project 就可以）。

> **圖示描述**：Burp Suite Dashboard 主視窗打開（可能出現 temporary project 選項畫面，選臨時專案即可）。（原教材截圖，本筆記不轉載圖片）

**Step 2 — 檢查 proxy listener。**入 **Proxy** tab，揀 **Proxy settings** 子分頁（舊版叫 **Options**）。喺 **Proxy Listeners** 之下應該見到 **`127.0.0.1:8080`** 而且 **Running** 剔咗。Burp 就係喺呢個位等瀏覽器流量。

> **圖示描述**：Proxy settings 畫面列出一個 listener `127.0.0.1:8080`，Running 個 checkbox 已剔。（原教材截圖，本筆記不轉載圖片）

**Step 3 — 喺 Firefox 裝 FoxyProxy。**開 Firefox 去 `about:addons`，搜尋 **FoxyProxy Basic**，按 **Add to Firefox**。裝完撳工具列上嘅 FoxyProxy 圖示，揀 **Options**_FoxyProxy Basic 嘅選項頁就會開。

> **圖示描述**：FoxyProxy Basic 安裝完成，由工具列圖示開到 Options 頁。（原教材截圖，本筆記不轉載圖片）

**Step 4 — 喺 FoxyProxy 建立一個 Burp profile。**按 **Add**，填入以下四個欄位（一字不改）：

| 欄位 | 值 |
|---|---|
| Title | `Burp` |
| Type | `HTTP` |
| Hostname | `127.0.0.1` |
| Port | `8080` |

存好 profile 之後，撳 FoxyProxy 工具列圖示、揀 **Burp** 啟用——之後瀏覽器流量就會經 Burp。

> **圖示描述**：FoxyProxy 已儲存並選中 `Burp` profile，工具列選單顯示 Burp 為當前代理。（原教材截圖，本筆記不轉載圖片）

**Step 5 — 下載 Burp CA 憑證。**FoxyProxy 設成 Burp 之後，確保 Burp 嘅 **Intercept 開咗**（**Proxy > Intercept**）。用 Firefox 去 `http://burpsuite`，撳右上角嘅 **CA Certificate** 連結，下載 **`cacert.der`**。（`http://burpsuite` 係 PortSwigger 內建嘅特殊網址，會經代理直接由 Burp 回應。）

> **圖示描述**：`http://burpsuite` 頁面經代理載入成功，右上角 CA Certificate 連結已把 `cacert.der` 下載。（原教材截圖，本筆記不轉載圖片）

**Step 6 — 喺 Firefox 裝 CA 憑證。**開 Firefox **Settings**，搜 **certificates**，撳 **View Certificates**。喺 **Authorities** tab 按 **Import**，揀啱啱下載嘅 `cacert.der`，**剔「Trust this CA to identify websites」**，再按 OK。成功會無 error 匯入，而且 **PortSwigger CA** 會出現喺 Authorities 清單。

> **圖示描述**：匯入完成無報錯，Authorities 清單出現 `PortSwigger CA` 並且已信任作識別網站之用。（原教材截圖，本筆記不轉載圖片）

**Step 7 — 驗證成個鏈路通。**喺 Burp 熄咗 Intercept，用 Firefox 去 `http://localhost:8080`——靶場首頁會載入，而對應嘅 request 會出現喺 Burp 嘅 **Proxy > HTTP history** tab。

> **圖示描述**：靶場首頁喺 Firefox 成功載入，同時 Burp Proxy > HTTP history 見到對應 request 紀錄。（原教材截圖，本筆記不轉載圖片）

### 4.6 §0.3 Usage of Burp Suite Repeater — 單一請求改完再send（原文 p.9）

**繁中解說**：**Repeater** 係 Burp 最常用嘅功能——佢可以**改一個 request 然後重新發送**、即刻睇 response。用法：喺 Burp 嘅 **HTTP history** 或者 **Intercept** tab，對住任何 request **右 Click → Send to Repeater**；跟住開 **Repeater** tab，改 request，按 **Send**，右邊就會顯示 response。

> **圖示描述**：Repeater tab 畫面——左邊係可編輯嘅 request，按 Send 之後右邊顯示對應 response。（原教材截圖，本筆記不轉載圖片）

> **English Standard Definition:** "Repeater lets you edit and resend a single request."

### 4.7 §0.4 Usage of Burp Suite Intruder — 自動化大量請求（原文 p.10–11）

**繁中解說**：**Intruder** 用嚟**自動化發送大量請求**（例如試 1000 個密碼）。用法：對住一個 request **右 Click → Send to Intruder**；喺 **Positions** tab 按 **Clear §** 清走所有標記，再揀要變化嘅值、按 **Add §**（每個 `§` 包住嘅位置就係「會變嘅位」）。

跟住去 **Payloads** tab 載入或者貼上你嘅 **wordlist**（字典檔）。最後按 **Start attack**。**結果如果出現唔同嘅 response length（長度）或者 status code，通常就代表試到有效憑證。**

> **English Standard Definition:** "Results with different lengths or status codes usually reveal valid credentials."

**額外技巧（原文特別註明，用於 §2.1）**：如果要「**變化一個數字**」跨好多請求（例如把 value 由 1 試到 1000），就保留**單一個 position**，並且揀 **Numbers** payload type。

> **圖示描述**：Intruder 嘅 Positions tab，畫面見到 request 中若干值被 `§` 包住（已 Clear § 再 Add § 標記變化位）。（原教材截圖，本筆記不轉載圖片）

> **English Standard Definition:** "Intruder automates many requests."

**Further study（原文 p.11）**：原文叫你自己去睇 PortSwigger 官方文件嘅 **Burp Repeater** 同 **Burp Intruder** 兩頁（原文冇提供 URL，只講「see PortSwigger's pages」）。

---

## 🛠️ 5. 逐節實戰步驟（Try it yourself — Walkthrough）

呢節把 §0 嘅步驟按原文次序重列，每步寫明「做乜 ➔ 喺邊度睇 ➔ 預期結果 ➔ 成功／失敗點分辨」。**URL、值、參數一律照原文。**

### 5.1 啟動靶場（原文 p.4–5）

1. ➔ **做乜**：喺 lab root（含 `init_db.php` 同 `config.php` 嘅資料夾）開一個終端，打 `PHP_CLI_SERVER_WORKERS=12 php -S 0.0.0.0:8080`
   - **喺邊度睇**：同一個終端
   - **預期結果**：印出 `PHP 8.x Development Server (http://0.0.0.0:8080) started`，終端唔返 prompt
   - **成功／失敗點**：見到 `Development Server ... started` ＝ 成功；見到 `Address already in use` ＝ port 8080 被其他程式佔用（見 §6 卡點）

2. ➔ **做乜**：用 Firefox 去 `http://127.0.0.1:8080/init_db.php`（只需做一次）
   - **喺邊度睇**：Firefox 頁面
   - **預期結果**：顯示 `Database initialised successfully.` ＋ `Default admin: admin / 123qwe!@#` ＋ `Default users have weak passwords shown in the tutorial.` ＋ `Backup files created under /backup/ for brute-force discovery.`
   - **成功／失敗點**：見到 `initialised successfully` ＝ 成功；白屏／PHP error ＝ server 未起好或唔喺 lab root 執行

### 5.2 設定 Firefox ＋ Burp（原文 p.5–9）

3. ➔ **開 Burp Suite**（Kali: `Applications > Web Application Analysis > burpsuite`，或終端 `burpsuite`）
   - **睇**：Burp Dashboard 主視窗
   - **預期**：主視窗出現（temporary project 可）
   - **分辨**：見到 Dashboard ＝ 成功

4. ➔ **檢查 listener**：Burp `Proxy > Proxy settings`（舊版 `Options`）＞ `Proxy Listeners`
   - **睇**：listener 清單
   - **預期**：見到 `127.0.0.1:8080`，Running 已剔
   - **分辨**：冇 `127.0.0.1:8080` 或唔 Running ＝ 未設定好，需手動加／開

5. ➔ **裝 FoxyProxy Basic**：Firefox `about:addons` 搜 `FoxyProxy Basic` ➔ `Add to Firefox` ➔ 撳工具列圖示 ➔ `Options`
   - **睇**：FoxyProxy Options 頁
   - **預期**：選項頁打開
   - **分辨**：工具列見唔到 FoxyProxy 圖示 ＝ 未裝好，重開 Firefox

6. ➔ **建 Burp profile**：FoxyProxy `Add` ➔ Title `Burp`、Type `HTTP`、Hostname `127.0.0.1`、Port `8080` ➔ Save ➔ 撳工具列圖示揀 `Burp`
   - **睇**：FoxyProxy 工具列選單
   - **預期**：`Burp` 已儲存並被選中（流量已改經 Burp）
   - **分辨**：選單顯示 Burp 為當前 profile ＝ 成功

7. ➔ **下載 Burp CA**：Burp 確保 `Proxy > Intercept` 開住 ➔ Firefox 去 `http://burpsuite` ➔ 撳右上 `CA Certificate`
   - **睇**：Firefox 下載
   - **預期**：下載到 `cacert.der`
   - **分辨**：攞到 `cacert.der` ＝ 成功；`http://burpsuite` 開唔到 ＝ 代理鏈未通

8. ➔ **Import CA**：Firefox Settings 搜 `certificates` ➔ `View Certificates` ➔ `Authorities` ➔ `Import` ➔ 揀 `cacert.der` ➔ 剔 `Trust this CA to identify websites` ➔ OK
   - **睇**：Authorities 清單
   - **預期**：PortSwigger CA 出現喺清單，匯入無 error
   - **分辨**：見到 `PortSwigger CA` ＝ 成功

9. ➔ **驗證**：Burp 熄 Intercept ➔ Firefox 去 `http://localhost:8080`
   - **睇**：Firefox 頁面 ＋ Burp `Proxy > HTTP history`
   - **預期**：靶場首頁載入；對應 request 出現喺 HTTP history
   - **分辨**：兩樣都見到 ＝ 成條鏈通；只有頁面但 history 冇紀錄 ＝ 瀏覽器冇行 Burp 代理

### 5.3 Repeater ／ Intruder（原文 p.9–10）

10. ➔ **Repeater**：Burp `HTTP history`／`Intercept` 對住 request 右 Click ➔ `Send to Repeater` ➔ 開 Repeater tab ➔ 改 request ➔ `Send`
    - **睇**：Repeater 右邊 response 窗
    - **預期**：見到改完之後嘅 response
    - **分辨**：response 隨你改嘅 request 而變 ＝ 成功

11. ➔ **Intruder**：對住 request 右 Click ➔ `Send to Intruder` ➔ `Positions` tab ➔ `Clear §` ➔ 揀值 `Add §` ➔ `Payloads` tab 載入 wordlist ➔ `Start attack`
    - **睇**：attack 結果表（length／status code 欄）
    - **預期**：出現長度／status 唔同嘅 row ＝ 可能試到有效憑證
    - **分辨**：見到某 row length／status 與眾不同 ＝ 中；全部一模一樣 ＝ 未中或 payload 唔啱

---

## 🧩 6. 新手補充：零經驗專用講解

> ⚠️ 教材外補充：以下全部係教材原文冇、但零經驗學生一定要知嘅內容。

### 6.1 為何呢啲設定會咁「麻煩」（生活比喻）

做 web 安全，你要做嘅事就係「**中途截住對話**」。想像你同朋友寫信，你想睇／改內容——你就要（1）請一個「中介人」坐喺你屋企同郵局之間（＝把 Firefox 代理指向 Burp）；（2）如果信有封蠟（HTTPS/TLS），你仲要事先叫朋友「**信得過呢個中介人**」（＝import Burp CA）。呢兩步缺一不可：只做第一步，你改到 HTTP 但 HTTPS 會報憑證錯誤；只做第二步，瀏覽器根本冇把流量交畀中介人。

### 6.2 點樣知道自己「裝好晒」——逐項驗證步驟（Self-Check）

呢個係零經驗學生最需要嘅清單。逐項做，全部剔晒就代表環境 OK：

| # | 驗證項目 | 做法 | 通過標準 |
|---|---|---|---|
| 1 | PHP server 起到 | 睇啟動終端 | 有 `Development Server ... started`，終端唔返 prompt |
| 2 | 靶場資料庫建好 | Firefox 去 `http://127.0.0.1:8080/init_db.php` | 顯示 `Database initialised successfully.` |
| 3 | 靶場首頁開到 | Firefox 去 `http://localhost:8080` | 政府入口網站首頁載入（唔係無法連線） |
| 4 | Burp listener 開住 | Burp `Proxy > Proxy settings > Proxy Listeners` | 見到 `127.0.0.1:8080` 且 Running 已剔 |
| 5 | FoxyProxy profile 建好 | FoxyProxy 工具列圖示 | 見到 `Burp` profile，已選中 |
| 6 | Firefox 真係行 Burp | Burp 熄 Intercept，去 `http://localhost:8080` | Burp `Proxy > HTTP history` 出現該 request |
| 7 | CA 憑證已裝 | Firefox `View Certificates > Authorities` | 清單見到 `PortSwigger CA`，已信任識別網站 |
| 8 | HTTPS 攔截通 | 經代理去一個 HTTPS 網頁 | 瀏覽器**冇** `SEC_ERROR_UNKNOWN_ISSUER`／憑證警告；Burp history 有紀錄 |
| 9 | Repeater 可用 | 任一 request `Send to Repeater` ➔ `Send` | 右邊即刻出 response |
| 10 | Intruder 可用 | 任一 request `Send to Intruder` ➔ 擺 `§` ➔ `Start attack` | 結果表出到行（有 length／status） |

**一句總結**：1–3 ＝ 靶場好；4–8 ＝ 代理鏈好；9–10 ＝ 工具識用。

### 6.3 Burp 常見連接問題（新手最常撞嘅 5 個卡點）

**卡點 1：瀏覽器去 `http://localhost:8080` 直接開到靶場，但 Burp `HTTP history` 冇紀錄。**
成因：FoxyProxy 未選 `Burp` profile（或者 Firefox 自己嘅 proxy 設定蓋過 FoxyProxy）。
解法：撳 FoxyProxy 圖示 ➔ 確認已選 `Burp`；再確認 profile 係 `127.0.0.1:8080`。

**卡點 2：開 `http://burpsuite` 攞唔到 CA（一片空白／連唔到）。**
成因：Burp 未開，或者瀏覽器流量根本冇經 Burp。
解法：確認 Burp 開住、listener `127.0.0.1:8080` 係 Running、FoxyProxy 揀咗 Burp；之後先開 `http://burpsuite`。

**卡點 3：去 HTTPS 網站彈憑證警告（`SEC_ERROR_UNKNOWN_ISSUER`／`Your connection is not private`）。**
成因：Burp CA 未 import，或者 import 咗但**冇剔** `Trust this CA to identify websites`。
解法：重做 §0.2 Step 6，確認 `PortSwigger CA` 喺 Authorities 清單且已信任。

**卡點 4：`php -S` 起唔到，報 `Address already in use`／`bind failed`。**
成因：**port 8080 已被佔**——可能上一輪嘅 PHP server 未關，或者（見下面 6.5 疑問）Burp listener 同靶場都綁喺 8080。
解法：搵出佔用者並關掉舊 process，或者改其中一個服務嘅 port（環境中立講法見 6.5）。

**卡點 5：Burp 收唔到 §13／§14 嗰啲「自己叫自己」嘅 request，個 app 卡死。**
成因：PHP 內建 server 單執行緒，self-referential 請求會 deadlock。
解法：確認啟動時真係有加 `PHP_CLI_SERVER_WORKERS=12`。

**卡點 6（附）：攔截咗但個 app 唔郁。**
成因：Burp **Intercept 開住**，request 停喺 Burp 未放行。
解法：撳 **Forward** 放行，或者索性熄 Intercept，只用 HTTP history 睇（大部分練習唔需要 intercept 住）。

### 6.4 留意：Intercept 開／熄嘅時機

原文 Step 5 叫你「確保 Intercept 開咗」去攞 CA；Step 7 又叫你「熄咗 Intercept」去驗證。原因：攞 CA 嗰下你想**控制住個 flow**；而驗證鏈路嗰下你想**順暢咁 load 頁面**，唔想每次都被攔住。新手最易犯：一路開住 Intercept，然後覺得個 app「好慢好卡」——其實係你自己卡住佢。

### 6.5 疑問（教材環境中立性問題）：port 8080 撞唔撞？

原文 §0.1 叫你 `php -S 0.0.0.0:8080`（靶場綁 8080），§0.2 又話 Burp listener 係 `127.0.0.1:8080`。**如果靶場同 Burp 都喺同一部機，兩個都想綁 8080，係會撞嘅。**原文冇解釋呢點。環境中立嘅理解係：靶場程式**可能跑喺課程網站嘅 lab VM（另一部機／另一個 IP）**，而你嘅瀏覽器＋Burp 跑喺本機——咁就唔撞。所以筆記一律唔假設「靶場 = 本機」：請按你**自己 lab 提供嘅位址／port**去調整，如果靶場真係喺本機，就要改其中一個嘅 port 或分開兩部機。呢點請向導師確認（本 subagent 只讀到純文字來源，無法驗證實際 lab 拓撲）。

---

## 💬 7. Student questions 詳解

> ⚠️ 本檔不涵蓋 student questions（見各階段檔）。
>
> 原因：原文 front matter 同 §0 Lab Setup（p.1–11）**冇附任何 student question**。原文嘅 53 條題目全部落在 §1–§14 各攻擊階段。本檔（Stage 0）純粹係環境與工具＋攻擊鏈總覽，故無題可答。各階段題目同建議答案，見對應嘅 `ART_T3_P1` 至 `ART_T3_P6` 各檔之「Student questions 詳解」章節。

---

## 🎒 8. 考前 5 分鐘懶人包 ＋ 自測

### 8.1 必背關鍵數字

| 項目 | 值 |
|---|---|
| 靶場 server 啟動指令 | `PHP_CLI_SERVER_WORKERS=12 php -S 0.0.0.0:8080` |
| 靶場端口 | `8080` |
| Burp proxy listener | `127.0.0.1:8080` |
| 建庫 URL | `http://127.0.0.1:8080/init_db.php` |
| 預設管理員 | `admin / 123qwe!@#` |
| Burp CA 特殊網址 | `http://burpsuite` |
| 下載到嘅憑證檔名 | `cacert.der` |
| 憑證權威名稱 | `PortSwigger CA` |
| 攻擊鏈階段數 | 6 階段 |
| Section 總數 | 15 節（§0–§14） |
| 原文 student questions 總數 | 53 條（本檔 0 條） |

### 8.2 關鍵指令／設定對照表

| 用途 | 指令／設定 |
|---|---|
| 起靶場 | `PHP_CLI_SERVER_WORKERS=12 php -S 0.0.0.0:8080` |
| 建庫（一次） | Firefox 去 `/init_db.php` |
| FoxyProxy profile | Title `Burp`／Type `HTTP`／Host `127.0.0.1`／Port `8080` |
| 攞 Burp CA | Firefox 去 `http://burpsuite` |
| 裝 CA | Firefox View Certificates ➔ Authorities ➔ Import ➔ 剔 Trust this CA to identify websites |
| 單請求改完重播 | 右 Click ➔ Send to Repeater ➔ Send |
| 自動化大量請求 | 右 Click ➔ Send to Intruder ➔ Clear § ➔ Add § ➔ Payloads ➔ Start attack |
| 變數字序列 | Intruder：單一 position ＋ Numbers payload type |

### 8.3 英文必背句

> **English Standard Definition:** "The `PHP_CLI_SERVER_WORKERS=12` environment variable is required because the single-threaded built-in server deadlocks on the self-referential SSRF and OAuth requests used in Sections 13–14."

> **English Standard Definition:** "Results with different lengths or status codes usually reveal valid credentials."

### 8.4 自測 5 題

1. 靶場建庫要行邊條 URL？預設 admin 帳密係乜？
2. `PHP_CLI_SERVER_WORKERS=12` 為何必要？
3. FoxyProxy 個 Burp profile，四個欄位（Title／Type／Hostname／Port）分別填乜？
4. 攻擊鏈六階段係邊六個？§13 被歸入邊份筆記檔？
5. Burp Intruder 揀「Numbers」payload type 係為咗做乜？（提示：邊一節用到？）

**答案（最後一行）**：1. `http://127.0.0.1:8080/init_db.php`；`admin / 123qwe!@#`｜2. 因為 PHP 內建 server 單執行緒，遇到 self-referential 嘅 SSRF／OAuth 請求（§13–§14）會 deadlock，開 12 條 worker 避免死鎖｜3. Title=`Burp`、Type=`HTTP`、Hostname=`127.0.0.1`、Port=`8080`｜4. 公開偵察→初始存取→權限提升→憑證蒐集→橫向檔案存取→主機淪陷；§13 OAuth 歸入 `ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md`（教材外補充，原文 mapping 漏收）｜5. 為咗跨多個請求遞增一個數字值（例如 §2.1 用），做法係保留單一 position 並揀 Numbers payload type。

---

## 🛡️ 9. 防守方修正清單（Defender Fix Checklist）

> ⚠️ 教材外補充：原文 §0 主要係設定步驟，本身冇「單一漏洞」可修，但呢個階段暴露嘅安全習慣一樣有防守價值。

| 項目 | 風險 | 修正做法（防守方） |
|---|---|---|
| 靶場綁 `0.0.0.0:8080` | 同 LAN 任何機都入到，真環境等於把 app 公海化 | 只喺隔離 lab 網段使用；真實環境綁 `127.0.0.1` 或用 firewall 限制來源；即靶場都應限於授權範圍 |
| 預設帳號 `admin / 123qwe!@#` | 弱密碼、預設憑證 | 上線前移除所有預設帳號；強制首次登入改密碼；停用未使用帳號 |
| 弱密碼用戶（原文：Default users have weak passwords） | 瞬間被 brute force | 密碼複雜度政策、檢查常見弱密碼字典、加 MFA |
| 備份檔放喺 `/backup/` 可被發現 | 憑證／設定外洩 | 唔好把備份放喺 web root；`/backup/` 加認證或完全移出可存取路徑；備份加密 |
| server 綁錯介面、port 撞 | 服務互相干擾、意外暴露 | 用 reverse proxy（nginx／Apache）統一入口；服務綁 loopback 或用 container 隔離 |
| 喺生產環境裝自簽／代理 CA | 中間人可解密流量 | 只喺 lab 用 Burp CA；生產裝置唔應信任任何個人代理 CA |

**一般做法補充（PHP／常見 stack）**：PHP 應用上線要 `display_errors = Off`、`expose_php = Off`；資料庫檔（SQLite）唔應該放喺 web 可存取目錄；用 `.htaccess`／server config 拒絕存取 `*.db`、`config.php`、`init_db.php` 等敏感檔；設定好 CSP 同 HTTP security headers 防 XSS。

➜ 對應速記：`ART_Final_CheatSheet.md`
