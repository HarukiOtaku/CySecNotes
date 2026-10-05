# Advanced Red Team 攻擊鏈①：公開偵察（Public Recon / OSINT）雙語學習指南

> **原教材**：Advanced Red Team — Tutorial 3（PDF p.97–103）｜覆蓋 section：§8 OSINT / Username Leakage
> **攻擊鏈階段**：① 公開偵察（Public Reconnaissance）——未登入、未接觸目標前，用公開資料砌出攻擊起點
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 最後對照懶人包自測
> **本階段產出**：一份「半成品憑證清單」（username ＋ email ＋ 姓名）＋（如有）已洩漏密碼 → 交去下一階段做憑證攻擊
> **相關練習／延伸**：backup 檔爆破屬下一階段，➜ 見 ART_T3_06_CredentialDiscovery_StudyGuide.md

---

## 📝 1. 攻擊鏈①公開偵察 概要與實務情境

本檔係整條攻擊鏈嘅**第一步**。攻擊鏈嘅順序係：①公開偵察 → ②初始存取（Initial Access）→ ③權限提升 → ④憑證蒐集 → ⑤橫向檔案存取 → ⑥主機淪陷。本檔只做①：喺**未有任何帳號、未登入**嘅情況下，純粹靠公開網頁同公開資料，把目標嘅**內部登入身分（internal login identifiers）**撈出嚟。呢一步之所以排第一，係因為佢「零風險、零噪音」——你唔需要打通任何嘢，唔會觸發任何 log，就可以攞到一堆真名、username、email 格式。

**呢份檔覆蓋原文嘅邊幾個 section**：只有 §8（OSINT / Username Leakage）。原文 §8 內容分兩大塊：概念部分（What is it and why does it work?／How to find it）同實作部分（Try it yourself，一路做到 IDOR 打樁）。本檔會完整重寫兩塊，並補上原文缺失嘅新手背景同建議答案。

**前置假設**：呢個階段**唔需要**任何前置階段（佢就係第一步）。但你起碼要已經完成 §0 嘅環境設定（靶場 VM 起好、Burp + FoxyProxy + CA 裝好），因為本檔部分步驟要用到 Burp 嘅 Proxy → HTTP history 去記錄攻擊面。如果未 setup，➜ 見 `ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md`。⚠️ 教材外補充：靶場係一個「政府入口網站」風格嘅 PHP + SQLite app；程式**可能**放喺課程網站嘅 lab VM（教材文字冇明講拓撲，未經核實），所以下文所有路徑一律當「喺 lab root 做」。

**實務情境一（真實滲透測試）**：你受僱做一次授權測試，目標公司官網有公開嘅「團隊成員」頁，列出全名、職銜、email。你留意到 email 格式係 `first.last@corp.com`。同時你喺目標嘅公開 GitHub repo 度，由 commit history 搵到有人 commit 過一份 `config.php.bak`。呢啲全部係「攻擊者未入侵之前就已經有」嘅資料——**減少要猜嘅嘢**，係 OSINT 嘅全部價值。

**實務情境二（憑證填充 credential stuffing）**：你手上有一份由 infostealer 流出嘅 combo list（大量 `username:password`）。你把公司 email 網域（如 `@hkgov-service.local`）拿去同 leak 對比，發現有幾個員工用同一組 email 喺第三方論壇註冊過、又洩漏咗密碼。因為「密碼重用（password reuse）」，你手上嗰堆 username 就由「一堆可以猜嘅名」變成「ready-made credential pairs（現成憑證對）」——直接可以登入。呢個就係本階段嘅終點。

---

## 🎯 2. 學習目標

1. **定義 OSINT 並解釋為何佢通常合法、低風險** — Define Open-Source Intelligence and explain why it is usually legal and low-risk for the attacker.
2. **列出 OSINT 喺 MITRE ATT&CK 嘅對應技術編號** — Map OSINT to the MITRE ATT&CK Reconnaissance tactics: T1593, T1594, T1589, T1590.
3. **指出靶場兩個未認證洩漏點** — Identify the lab's two unauthenticated leaks: `/staff.php` and `/api/users.php`.
4. **講出「一半憑證對」嘅概念** — Explain why a username/email leak is "half of a credential pair".
5. **用瀏覽器（唔靠工具）由公開頁面撈 username** — Gather usernames from public pages using only the browser.
6. **辨認 email 格式並量產員工名字** — Recognise the email format (例如 `first.last@`) and expand it into a full target list.
7. **由 stealer log 提取憑證對** — Extract `username:password` pairs from a stealer log using `grep` and `awk`.
8. **分辨「原封不動」同「欄位移位」嘅 log 行** — Tell a normal log line apart from a URL-scheme line that shifts the columns.
9. **用登入錯誤訊息確認帳號是否存在** — Use verbose login/reset error differences to confirm which usernames are live (username enumeration).
10. **由 OSINT 一路行到可用登入，並記錄攻擊面** — Execute the whole OSINT-to-access workflow and record the newly-reachable endpoints in Burp HTTP history.
11. **講出點解 IDOR 只可以透過「比較兩個帳號」先見到** — Explain why IDOR surface is usually invisible from a single account（通常要兩個帳號互相比較；單帳號改 id 亦可測到） and is found by comparing two logins.
12. **用香港法律同倫理講出 OSINT 嘅紅線** — State the legal and ethical boundaries of performing OSINT in Hong Kong.

---

## 🧩 3. 零經驗先修（Prerequisites, in plain words）

以下係本檔會用到、但原文**假設你已經識**嘅基礎。每項：一句定義 ＋ 一個生活化比喻 ＋ 一句英文。

**（1）OSINT（Open-Source Intelligence，公開來源情報）**
定義：由**任何人都合法睇得到**嘅來源（公開網頁、公開 API、公開 repo）收集情報。
比喻：好似你 Google 一間公司嘅前台電話——你冇闖入去，只係睇佢自己貼出嚟嘅嘢。
> OSINT is information gathered from publicly available sources.

**（2）未認證端點（unauthenticated endpoint）**
定義：唔需要登入就答你嘅網址／API。
比喻：好似大廈大堂嘅訪客登記簿擺咗出嚟大門口任人睇，唔使拍卡。
> An unauthenticated endpoint returns data without requiring a login.

**（3）JSON API**
定義：一種用 JSON 格式回覆資料嘅網址，格式係一堆 `{"key": "value"}`，比 HTML 易讀易拆。
比喻：有人問你「拎份名單」，佢直接畀你一份 Excel 表，而唔係一張設計到花哩花碌嘅海報。
> A JSON API returns structured data that is far easier to parse than a rendered HTML page.

**（4）目標清單／wordlist（target list）**
定義：一行一個 username 嘅純文字檔，之後餵去登入測試或爆破用。
比喻：好似考試前整嘅「必背生字表」，一行一個，方便逐個核對。
> A target list is a plain-text wordlist with one username per line.

**（5）憑證對（credential pair）**
定義：一組完整嘅「帳號 ＋ 密碼」，例如 `admin:123qwe!@#`。
比喻：一條鎖匙**加**知邊扇門——得一半（淨係知門）冇用，兩樣齊先入得去。
> A credential pair is a complete username-and-password combination.

**（6）憑證填充（credential stuffing）**
定義：拿住**已知嘅帳密對**去大量網站試登入，食「密碼重用」。
比喻：你執到一串鎖匙，逐幢大廈門口試吓開唔開——因為好多人全屋都用同一條匙。
> Credential stuffing replays known username-password pairs against many sites, exploiting password reuse.

**（7）密碼噴灑（password spraying）**
定義：反過來——用**少量常見密碼**（如 `Welcome2024`）去試**大量**已知 username，避開鎖帳號。
比喻：唔逐戶暴力撞門，而係一次過向整幢樓嘅信箱塞同一條萬用匙試吓。
> Password spraying tries a few common passwords against many known usernames.

**（8）魚叉式網絡釣魚（spear-phishing）**
定義：針對**特定人**（有真名、職銜、email）設計嘅釣魚電郵。
比喻：唔係亂派傳單，而係叫得出你老細個名、知道你部門，令你信以為真。
> Spear-phishing is a targeted phishing attack aimed at a specific individual.

**（9）infostealer／stealer log**
定義：惡意程式（RedLine、Vidar、Raccoon）偷偷由中毒電腦掃走瀏覽器**已儲存嘅密碼**，成 log 賣出去。
比喻：唔係撬夾萬，而係有人喺你屋企裝咗部隱形影印機，你打過嘅每個密碼佢都影低咗。
> Infostealer malware silently dumps saved browser credentials from infected machines, and those logs are sold and traded.

**（10）combo list**
定義：由好多 stealer log 合併而成嘅巨型 `username:password` 檔。
比喻：好似一本「全港外賣密碼大全」，夾埋無數人中過招之後流出嚟嘅資料。
> A combo list is an aggregated file of many username-password pairs.

**（11）`grep`**
定義：喺文字檔度**逐行搵含有某字串**嘅行，然後印出嚟。
比喻：喺一本電話簿度，用螢光筆劃晒所有姓「陳」嘅行。
> grep prints the lines of a file that match a pattern.

**（12）`awk`**
定義：按**分隔符**切開每一行，然後抽指定欄位（例如第 3、第 4 欄）。
比喻：一張用逗號分開嘅表，你話「淨係要第 3 格同第 4 格」，awk 就幫你抽。
> awk splits each line by a delimiter and extracts chosen fields.

**（13）MITRE ATT&CK**
定義：一套公開嘅攻擊者行為知識庫，每個技術有編號（如 T1593）。
比喻：好似犯罪手法嘅「百科全書」，每種手法有自己嘅 ISBN。
> MITRE ATT&CK is a public knowledge base of adversary tactics and techniques with unique IDs.

**（14）OWASP Top 10**
定義：最常見嘅十大 Web 安全風險清單，每項有編號（如 A01:2021）。
比喻：好似「十大最常見廚房意外」，提醒你邊度最易出事。
> The OWASP Top 10 lists the most critical web application security risks.

**（15）username enumeration（用戶名列舉）**
定義：靠登入／重設密碼回覆嘅**差異**，判斷一個 username 到底存唔存在。
比喻：你叩門，入面有人應「你個名唔喺名單」定「密碼錯」——兩種答法已經洩漏咗邊個係真住戶。
> Username enumeration infers valid accounts from differing login or reset error messages.

**（16）IDOR（Insecure Direct Object Reference，不安全直接物件引用）**
定義：網址用 `id=2` 呢種參數直接讀資料，但**唔檢查**你有冇權睇——你改成 `id=1` 就睇到人哋嘅嘢。
比喻：酒店房卡淨係寫住「208 號房」，冇绑你身份——你改做 209 就入得去。
> IDOR is a flaw where an endpoint fetches whatever object an id-style parameter names, without checking ownership.

---

## 📖 4. 逐節深度知識點重寫（Comprehensive Notes）

### 4.1 OSINT 係乜、為何有效（What is it and why does it work?）（原文 p.97–98）

**繁中解說**：Open-Source Intelligence（OSINT）＝由**公開可得來源**收集嘅情報。放喺一個 Web app 嘅場景，呢啲來源包括：員工名錄（staff directory）、API 回應、metadata、原始碼、錯誤訊息——呢啲全部都**洩漏內部識別碼（internal identifiers）、username、email 格式或者系統細節**。

要記住一個框架：OSINT 喺 **MITRE ATT&CK** 入面屬於 **Reconnaissance（偵察）** 戰術，對應四條技術：

| MITRE 編號 | 技術名（英文） | 繁中意思 |
|---|---|---|
| **T1593** | Search Open Websites/Domains | 搜公開網站／網域 |
| **T1594** | Search Victim-Owned Websites | 搜目標自己嘅網站 |
| **T1589** | Gather Victim Identity Information | 收集目標身分資料（人名、email） |
| **T1590** | Gather Victim Network Information | 收集目標網絡資料（網段、IP） |

原文補充：OSINT 嘅**其他來源**仲包括社交媒體、招聘廣告（job postings）、憑證透明日誌（certificate transparency logs）、程式碼倉庫、paste sites、以及洩漏資料庫（breach databases）。

> **English Standard Definition:** Open-Source Intelligence (OSINT) is information gathered from publicly available sources. In a web application context, this includes staff directories, API responses, metadata, source code, and error messages that reveal internal identifiers, usernames, email formats, or system details.

**靶場實例（原文如此）**：呢個 lab 喺 `/staff.php` 開放咗一個**公開員工名錄**，喺 `/api/users.php` 開放咗一個 **JSON API**——兩者都會喺**毋須認證**嘅情況下回傳登入 username、全名（full name）、email。另外，登入表單會透過**唔同嘅錯誤訊息**確認一個 username 存唔存在。原文一句總結：**上述每項都洩漏「一半憑證對（half of a credential pair）」**。

> **English Standard Definition:** Each of these leaks half of a credential pair.

**為何高危（原文重點）**：喺 lab 以外，攻擊者用 OSINT 去——畫出組織架構、發現 email 格式、確認有效 username、搵到暴露嘅 cloud assets、建立魚叉式釣魚目標清單。原文嘅核心論點：**暴露內部登入識別碼，會把「猜憑證」呢個問題砍半**，令 credential-stuffing 活動效率大增。而最關鍵嘅一句係：**同一批資料往往係合法可以收集嘅**，所以「減少公開暴露」就成為一項重要嘅防守控制。

> **English Standard Definition:** Exposing internal login identifiers halves the credential-guessing problem and makes credential-stuffing campaigns far more efficient. The same data is often legal to collect, which is why reducing public exposure is a key defensive control.

**OWASP 對應（原文 p.98）**：呢個問題對應兩項 OWASP Top 10 —
- **A01:2021 — Broken Access Control（存取控制失效）**：`/staff.php`、`/api/users.php` 未認證就派資料。
- **A07:2021 — Identification and Authentication Failures（識別與認證失效）**：登入／重設訊息洩漏帳號是否存在。

> **English Standard Definition:** OWASP mapping: A01:2021 — Broken Access Control and A07:2021 — Identification and Authentication Failures.

原文仲講明攻擊者嘅實際用法：「Attackers use staff directories, LinkedIn, and breached credential lists to build target lists for spear-phishing and credential stuffing.」

### 4.2 點樣發現（How to find it）（原文 p.98–100）

**繁中解說**：原文叫你「Treat the application like a public website」——即係當佢係一個任何人都睇得到嘅公開網站咁行，專搵以下嘢：

- 員工名錄（staff directories）
- 團隊頁（team pages）
- 作者簡介（author profiles）
- **JSON API**
- **CSV 匯出**（CSV exports）
- **搜尋端點**（search endpoints）

原文一句總結：「Staff directories, team pages, author profiles, JSON APIs, CSV exports, and search endpoints all leak identities.」

**四個實作要點（原文 bullets 全收）**：

1. **留意 email 格式細節**——例如 `first.last@example.com`。原文講得更白：「one pattern names every employee」（一個格式就講晒每個員工嘅名）。➜ 呢個就係「量產」target list 嘅關鍵。
2. **把發現嘅 email／username 拿去對照 breach corpora 同 stealer-log traders**——如果密碼有重用，一個 username 清單即刻升值成現成憑證對。
3. **用登入／重設錯誤差異確認邊啲 username 係真帳號**——原文講明呢個技術嘅逐步做法喺 **Section 6（steps 3–4）**，而 §8 專注喺「餵資料入去」嘅 OSINT 來源。（➜ brute force 部分見 `ART_T3_03_InitialAccess_A_CredentialAttacks_StudyGuide.md`。）
4. **緊記收集到嘅資料只係「一條憑證對嘅前半」**——佢會餵去後面嘅暴力破解同魚叉式釣魚。

> **English Standard Definition:** Treat the application like a public website and look for staff directories, team pages, author profiles, JSON APIs, CSV exports, and search endpoints that return user information.

> **English Standard Definition:** Remember that the data gathered is the first half of a credential pair — it seeds the brute-force and spear-phishing campaigns of later steps.

⚠️ **教材原文如此**：原文 "How to find it" 話確認 username 嘅技術「covered step by step in Section 6 (steps 3–4); this section focuses on the OSINT sources」，但同一個 §8 嘅 Try it yourself 第 3 步其實又**親自示範咗**用 verbose login error 去確認 username。即係話 §8 同 §6 有重疊——本筆記會兩邊都保留，但你答題時唔好講「§8 完全冇提 username enumeration」。

### 4.3 Stealer log 係乜、憑證點由暗網流入攻擊鏈（原文 p.100）

**繁中解說**：原文 Try it yourself 第一步開宗明義——「Real attacks do not start from the staff page — they start from the dark web.（真實攻擊唔係由員工頁開始，係由暗網開始。）」Infostealer 惡意程式（原文點名 **RedLine、Vidar、Raccoon**）會靜靜雞由中毒機器掃走瀏覽器已儲存嘅憑證，之後啲 log 被當商品買賣，合併成巨型 **combo list**。

原文講嘅 log 格式係關鍵：**每一行＝一組已儲存憑證**，格式係

```text
host:port:username:password
```

範例：`login.hkgov-service.local:443:admin:123qwe!@#`。原文特別警告：**有啲行會帶 URL scheme 或額外欄位，令欄位數目移位（shifts the columns）**——呢點係新手最容易中招嘅位（見 §5 步驟 1 同 §6）。

**為何「現成憑證對」遠勝「猜出嚟嘅 username」**：原文一句——`admin:123qwe!@#` 呢種一行，係一個真實帳號嘅完整憑證對，**比一千個猜出嚟嘅 username 值錢**，因為佢「needs no guessing at all（完全唔使猜）」。但原文亦提醒：**洩漏密碼可能已經過期（stale）**；如果唔 work，個 username 仍然可以餵去下一步嘅爆破。

> **English Standard Definition:** Infostealer malware (RedLine, Vidar, Raccoon) silently dumps saved browser credentials from infected machines, and those logs are sold and traded as huge combo lists.

> **English Standard Definition:** Every line is one saved credential in host:port:username:password format ... Bear in mind that a leaked password can be stale — if it no longer works, the username still feeds the brute-force step below.

**原文嘅定位句（重要）**：stealer log 係**憑證嘅來源**；下面嘅步驟係教你點樣將洩漏嘅 username 拿去 app 度確認，再用密碼入去。

> **English Standard Definition:** The stealer log is the source of the credentials; the steps below show you how to confirm the leaked usernames against the application and then use the password to get inside.

### 4.4 攻擊面同 IDOR 預告（原文 p.102–103）

**繁中解說**：登入成功之後，未知嘅攻擊面會突然「彈出嚟」。原文叫呢步做「Map the attack surface for later sections」。具體係打開 Burp 嘅 **Proxy → HTTP history**，記低登入後 session 去過嘅**每個新 endpoint**，同**每個 object reference**（例如 `id=`、`uid=`、`file=` 呢類參數）。呢啲 endpoint 同 IDOR-able 引用，就係由外面睇唔到嘅 exploit surface，之後嘅 LFI、SSRF、同 §6 嘅爆破都會打呢啲位。

**IDOR 為何要「兩個帳號比較」先見到**：原文強調——個頁面對**每個帳號**都**一模一樣**，所以**單靠一個 login 係 expose 唔到佢**。你要用**唔同 user login 去比較頁面同請求**（side by side）先見到。原因係 endpoint 按 `id=` 直接讀資料，**從來唔檢查該物件屬唔屬於當前登入用戶**。

> **English Standard Definition:** An endpoint fetches whatever object an id=-style parameter names, without checking that the object belongs to the logged-in user. The page looks identical for every account, so one login cannot expose it — you find it by testing with different user logins and comparing the pages and requests side by side.

（IDOR 嘅完整利用喺 **Section 3** 逐步示範，➜ 見 `ART_T3_05_PrivilegeEscalation_StudyGuide.md`。）

---

## 🛠️ 5. 逐節實戰步驟（Try it yourself — Walkthrough）

> **背景**（⚠️ 教材外補充：原文 §8 冇寫技術棧，此句綜合全教程／§0）：靶場係一個政府入口網站風格嘅 PHP + SQLite app，內部網域係 `hkgov-service.local`。以下每個命令／URL／payload **同原文逐字一致**。原文嘅 Try it yourself 分兩層：先有三個獨立任務（步驟 1–3），第 4 步「Build a target list」再叫你跟一個 5 步嘅 OSINT-to-access 流程。本節照原文次序全部展開。

### 步驟 1：由 stealer log／breach source 撈目標憑證（原文 p.100）

**做乜**：去 lab 提供嘅 stealer log 度，搵出網域屬於目標嘅行，抽出 username ＋ password。
**喺邊度睇**：終端機，喺 lab root（lab folder）執行。
**前提（原文）**：lab 附送一個**真實 RedLine 樣本** `data/stealer_sample.log`，原文叫你當佢係你自己嗰份 `stealer.log`。

**1a. 搵目標網域（case-insensitive）**：
```bash
grep -i hkgov data/stealer_sample.log
```
- 做乜：忽略大小寫，搵出所有含 `hkgov` 嘅行。lab 嘅內部網域係 `hkgov-service.local`。
- 預期結果：印出一堆含 `hkgov-service.local` 嘅行，每行係一組 `host:port:username:password`。

**1b. 收窄到準確網域並一次過抽出憑證欄位**：
```bash
grep 'hkgov-service.local' data/stealer_sample.log | awk -F: '{print $3 ":" $4}'
# ⚠️ 教材外補充：grep 用 basic regex，`.` 會匹配任何字元 → 精準比對網域請用：grep -F 'hkgov-service.local'
```
- 做乜：`-F:` 以冒號做分隔符；`$3`＝第 3 欄（username）、`$4`＝第 4 欄（password）。輸出即係 `username:password`，一行一個。
- **預期輸出（原文列出）**：
  ```text
  admin:123qwe!@#
  john.doe:Welcome2024
  bob.chan:changeme123
  ```
- **關鍵陷阱（原文警告）**：帶 URL scheme 嘅行欄位會**移位**。例如本來想抽 `mary.wong:Passw0rd!`，但因為行頭多咗 scheme，`$3:$4` 會變成出 `443:mary.wong`。原文叫你自己睇、或者**先剝走 scheme** 再抽。

> **圖示描述**：終端機畫面，顯示 `grep -i hkgov data/stealer_sample.log` 同 `grep 'hkgov-service.local' ... | awk -F: '{print $3 ":" $4}'` 嘅執行結果。畫面逐行列出一堆 `username:password`，清楚見到 `admin:123qwe!@#`、`john.doe:Welcome2024`、`bob.chan:changeme123`，另外有一行因為帶 URL scheme 而欄位移位，顯示成 `443:mary.wong`（而唔係正常的 `mary.wong:Passw0rd!`）。（原教材截圖，本筆記不轉載圖片）

**成功／失敗點分辨**：
- 成功：輸出係一列 `username:password`，每行一對。
- 失敗（欄位移位）：見到類似 `443:mary.wong`——即係欄位整體右移一格（`$3` 由 username 變成 port `443`、`$4` 由 password 變成 username）。解決：剝走 scheme（或改用更精準嘅欄位處理）再抽。

### 步驟 2：檢查 JSON API 攞結構化用戶資料（原文 p.101）

**做乜**：直接打開 `/api/users.php`，睇佢回傳嘅結構化用戶資料。
**點做**：喺瀏覽器直接開 `/api/users.php`，或者用 DevTools 睇。
**點解要咁做（原文）**：API 比 HTML 易拆，而且**往往回傳多過頁面顯示嘅欄位**。呢個 endpoint 回傳 JSON 格式嘅 username 同 email。
**預期結果**：一個 **JSON 陣列**，每個 object 有 `username`、`full_name`、`email`、`role` 四個欄位，**完全毋須認證**。原文叫你留意：每筆記錄都把一個「真人」對應到一個登入識別碼。

> **圖示描述**：瀏覽器或 DevTools 顯示 `/api/users.php` 嘅 JSON 回應。內容係一個 JSON array，每個 object 含 `username`、`full_name`、`email`、`role` 欄位（例如把 John Doe 對應到 `john.doe`、把 Jane Smith 對應到 `jane.smith`），未登入都睇得到。（原教材截圖，本筆記不轉載圖片）

**成功／失敗點分辨**：
- 成功：見到乾淨嘅 JSON array，欄位齊全。
- 失敗：見到 HTML 登入頁或 403／302——代表你搞錯路徑或者環境未起好。

### 步驟 3：用 verbose login error 確認邊個 username 係活躍（原文 p.101）

**做乜**：返去 `/login.php`，用步驟 1／2 攞到嘅 username 去試登入（先配一個**隨機密碼**），再用一個**自己亂作嘅 username** 做對照。
**預期結果（原文逐字）**：
- 洩漏得嚟、真實存在嘅 username → 回覆 **`Password incorrect.`**（即係帳號存在，只係密碼錯）。
- 亂作嘅 username → 回覆 **`Username not found.`**（即係冇呢個帳號）。

靠呢個差異，你就可以**唔使知密碼都確認**邊啲洩漏名係真帳號。

**成功／失敗點分辨**：
- 成功：兩種 username 出現兩款唔同訊息。
- 失敗：兩種都一樣（代表目標冇咗 username enumeration，或者你未成功送出請求）。

### 步驟 4：砌目標清單 ＋ 執行完整 OSINT-to-access 流程（原文 p.101–102）

**先睇 email 格式推導**（原文示例 pattern）：
```text
Full name: John Doe  → username john.doe, email john.doe@hkgov-service.local
Full name: Jane Smith → username jane.smith, email jane.smith@hkgov-service.local
Full name: Bob Chan  → username bob.chan, email bob.chan@hkgov-service.local
```
即係格式係 `first.last@`——**一個 pattern 就講晒所有員工嘅 username 格式**。

原文叫你「Execute the whole OSINT-to-access workflow step by step, exactly as follows」，共 5 步：

**4-1. 把 username 存成檔案（wordlist）**
由 stealer log 嘅目標網域項目，整一份純文字 wordlist——**一行一個 username、冇空格**。原文話你可以用任何文字編輯器打，或者用 shell 造：
```bash
cat > users.txt <<'EOF'
admin
john.doe
bob.chan
mary.wong
support
EOF
```

> **圖示描述**：一個文字編輯器視窗，顯示新建嘅 `users.txt`。內容一行一個 username，依次係 `admin`、`john.doe`、`bob.chan`、`mary.wong`、`support`。（原教材截圖，本筆記不轉載圖片）

**4-2. 確認邊啲 username 喺目標度係真嘅**
喺 Firefox 開 `http://localhost:8080/login.php`。
- 打一個亂作嘅名（例如 `zz.nobody`）＋任何密碼 → 回覆話個 username 唔存在。
- 再打 `admin` → 訊息變成 **`Password incorrect.`** → 證明 `admin` 係真帳號（**唔使知密碼都知**）。
把每個「活躍」username 記落你嘅清單（⚠️ 教材外補充：清單本身係「一行一個 username」嘅單欄格式；若你想分開「已確認存在／待確認」，另開一份 `active.txt`，唔好當 wordlist 本身有第二欄）。

**4-3. 先試洩漏密碼（before any brute force）**
直接喺 `/login.php` 輸入洩漏嘅憑證對：`admin` / `123qwe!@#`。
預期結果：**被 redirect 去主頁，並顯示 `Welcome back` banner**——你已經以一個合法用戶身分通過認證，原因就係**密碼由 breach 重用**。

**4-4. 若洩漏密碼唔 work，就行憑證攻擊**
喺 lab folder 開終端機執行：
```bash
python3 tools/brute.py http://localhost:8080
```
腳本行為（原文）：佢會**先下載 `/api/users.php`**，然後把每個收集到嘅 username，配一小串常見密碼，POST 去 `/login.php`。
**預期輸出**：每個破解成功嘅帳號印一行 `[+]`（其餘印 `[-]`），例如：
```text
[+] CRACKED: admin / 123qwe!@#
```
原文補充：**rate limit 攔唔到佢**，因為每個請求都用一個**全新 session**。（⚠️ 教材外補充：呢句只適用於**綁 session／cookie** 嘅計數；綁 IP 嘅 rate limit 一樣攔得到。）

**4-5. 為之後嘅 section 畫攻擊面（包括隱藏嘅 IDOR 面）**
喺已認證狀態下，打開 Burp 嘅 **Proxy → HTTP history**（喺 Section 0 已設定），記低：
- session 去到嘅**每個新 endpoint**；
- 每個 object reference（例如 `id=`、`uid=`、`file=` 參數）。
呢啲「外面睇唔到」嘅 endpoint 同 IDOR-able 引用，就係之後 LFI、SSRF、同 §6 爆破要打嘅 exploit surface。

### 步驟 5：用兩個帳號比較去搵 IDOR（原文 p.102–103）

原文話呢步係「Part of that surface only reveals itself through IDOR」。做法：

**（a）用普通用戶登入，記錄 session**
用 `john.doe` / `Welcome2024` 登入，行勻全站：Home、News、Services、Staff Directory、Messages、My Account。喺 Burp 嘅 **Proxy → HTTP history**，記低**每個** request，特別係帶 object reference 嘅（例如 `GET /message.php?id=2`）。

**（b）登出，再登入第二個帳號，重複**
用 `admin` / `123qwe!@#` 登入，**逐頁**點返啲完全相同嘅頁。預期差異：navigation bar 多咗一個 **`Administration`** 項目，指向 `/admin.php`；而 HTTP history 出現普通用戶 session **從來冇**發過嘅 request（`GET /admin.php`）。

**（c）比較兩個 session**
凡係「其中一個帳號有、另一個冇」嘅連結、按鈕或 endpoint，都係**隱藏攻擊面**——外面嘅攻擊者喺登入頁 enumerate 唔到，但一旦持有任何有效帳號就掂得到。

**（d）跨帳號探測 object reference（IDOR）**
重新用 `john.doe` 登入，開 Messages，點自己嗰條 message → request 係 `GET /message.php?id=2`。
喺 Burp Repeater（或直接改 URL）用 `id=1`、`id=3`、`id=4` 重播：
- **`id=1` 回傳 `New admin tools`**——呢條係 `admin` 同 `it.helpdesk` 之間、**從來冇牽涉 john.doe** 嘅 message。
證明：viewer **淨係靠 ID 拎 row**，**從來唔檢查 ownership**。原文話 Section 3 就係端到端利用呢個 flaw。

> ⚠️ 教材原文如此：原文 **§8 同 §3 對「邊條 message 屬邊個 id」嘅講法唔一致**（§8 話 `id=1` 係 admin↔it.helpdesk 嗰條、`id=2` 係自己嗰條；§3 就話自己嗰條喺 `id=1`、要試 `id=2/3` 才搵到 admin 嘅）。兩處都忠實照抄原文 → **以你自己 lab 實測到嘅為準**。

**完成後你手上應該有（原文總結）**：一份已確認帳號清單、真名、職銜、一個可預測嘅 email 格式、同——最重要嘅——**一個 work 嘅登入**。呢個就係 brute-force、credential-stuffing、或魚叉式釣魚嘅起點，而且已經打開咗 app 嘅內部頁。

---

## 🧩 6. 新手補充：零經驗專用講解

> 本節全部係**教材外補充**，原文冇提供。目的係補原文假設你已經識嘅背景。

### 6.1 為何呢啲漏洞會存在（用日常比喻）

- **`/staff.php` 同 `/api/users.php` 點解會漏？** 好多內部工具係「方便行先」造出嚟——開發者覺得係內部用、唔使登入，結果直接擺上公網。比喻：公司把員工通訊錄貼咗喺**大廈外面嘅公佈板**，因為「自己人先會行過」——但其實個公佈板係喺條街上。
- **為何登入訊息會洩漏帳號存在？** 開發者想「幫用戶手」講清楚係「冇呢個名」定「密碼錯」，卻冇為意呢兩句正好畀攻擊者免費做帳號驗證。比喻：你叩門，入面交替答「你唔係住戶」同「你鎖匙唔啱」——兩種答法已經洩漏咗邊啲名係真住戶。
- **為何 IDOR 咁普遍？** 程式按 `id=2` 直接 `SELECT` 一 row，但**從來冇加一句「呢 row 係唔係屬於當前用戶？」** 開發者假設「用戶唔會亂改 URL」，但攻擊者偏偏就係亂改。比喻：酒店房卡淨係對應「208 號房」，冇綁你嘅身份。

### 6.2 呢一步喺瀏覽器同伺服器之間實際發生咩事

- 你打開 `/api/users.php`：瀏覽器**發出一個普通 GET**，**冇帶任何 cookie／憑證**；伺服器（因為冇檢查 session）直接喺 SQLite 查晒所有 user，回一段 JSON。全程「冇登入」係關鍵。
- 你喺 `/login.php` 打 `admin` + 錯密碼：瀏覽器 **POST** 表單去伺服器；伺服器查 `admin` 存唔存在 → 存在 → 回 `Password incorrect.`。
- 你喺 `/login.php` 打 `admin` + `123qwe!@#`：伺服器驗證通過 → 回一個 **302 redirect** 去主頁，並 **Set-Cookie** 一個 session cookie。之後每個請求都靠呢個 cookie 認你係 admin。
- 你改 URL 由 `id=2` 變 `id=1`：瀏覽器照發 GET，伺服器**冇理你係邊個**，就跟 `id=1` 撈 row 回你。

### 6.3 新手最常撞嘅 3–5 個卡點同解決方法

1. **`grep` 冇 output／output 亂**：多數係大小寫或引號問題。原文用 `grep -i hkgov`（`-i` 忽略大小寫）；收窄時用 `grep 'hkgov-service.local'`（單引號包住含點嘅網域）。搵唔到先試 `grep -i`，再慢慢收窄。
2. **`awk` 出 `443:mary.wong` 而唔係 `mary.wong:Passw0rd!`**：呢個**唔係你錯**，係原行帶咗 URL scheme（例如 `https://`），令欄位由 `$3:$4` 向後移一格。解決：先剝走 scheme（或改抽正確欄位）再抽。原文明講呢點。
3. **打開 `/api/users.php` 見到 HTML 登入頁／302**：通常係環境未起好、路徑錯、或你未用 lab root 嘅正確 host/port。原文用 `http://localhost:8080`，先確認 VM 起到、port 8080 有聽。
4. **`python3 tools/brute.py` 冇反應或報錯**：要**喺 lab folder**（lab root）執行，因為腳本用相對路徑 `tools/brute.py` 同 `http://localhost:8080`。唔喺 lab root 就會搵唔到腳本。
5. **Burp 收唔到 request**：FoxyProxy 未開、或 Burp 嘅 CA 未 import，會令 HTTPS 出錯。呢步係 §0 設定問題，➜ 見 `ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md`。
6. **點分「成功」定「失敗」**：成功嘅鐵證係**具體、可觀察**嘅嘢——見到 `Welcome back` banner、見到 `[+] CRACKED`、見到 `id=1` 回 `New admin tools`。伺服器**冇回你嘢／回你想像以外嘅嘢**就係失敗，唔好靠「感覺」。

### 6.4 【極重要】新手點樣安全地做 OSINT（唔可以對真實目標做）

> ⚠️ 教材外補充：以下係原文冇講、但零經驗學生**必須**知道嘅安全與法律紅線。

- **只可以做你有明確授權嘅目標**：本課所有目標（`hkgov-service.local`、`localhost:8080`、lab VM）都係**課程提供嘅靶場**。真實公司網站冇書面授權（scope ＋ authorization letter）就**唔可以做**，連「登入測試」都唔得。
- **想練手，用故意設計成有漏洞嘅練習靶**：例如本課嘅 lab、DVWA、OWASP Juice Shop、TryHackMe／HackTheBox 上標明可攻擊嘅機器。呢啲係**明示同意**你可以打。
- **唔好亂用真實 stealer log**：原文話 lab 附送一個「真實 RedLine 樣本」。真實嘅竊取紀錄涉及**他人私隱**——你自己去下載、持有或使用真 log，可能本身已經違法（見 6.5）。只可以喺 lab 提供、課程批准嘅情境下處理。
- **收集時「合法」唔等於「合倫理」**：OSINT 通常合法，但把收集到嘅真人資料用嚟撞人哋帳號、或做釣魚，就係另一回事。課堂練習一律用靶場假資料。
- **一旦發現真實目標有漏洞**：正確做法係**負責任披露（responsible disclosure）**——停手、唔好再利用、通知相關方或平台。切勿再深入。

### 6.5 香港法律邊界：未經授權存取屬刑事

> ⚠️ 教材外補充：以下為一般性理解，**唔構成法律意見**；如有疑問應諮詢合資格法律專業人士。

- **未經授權取用電腦／存取電腦系統，在香港屬刑事罪行**。相關法例包括：
  - 《刑事罪行條例》（香港法例第 **200** 章）**第 161 條**——「有犯罪或不誠實意圖而取用電腦」；
  - 《電訊條例》（香港法例第 **106** 章）**第 27A 條**——「藉電訊而在未獲授權下取用電腦」；
  - 另外，損毀或改動他人電腦資料亦可能觸及《刑事罪行條例》**第 60 條**（刑事毀壞）。
- **OSINT 同入侵嘅分界**：純粹**閱讀公開資料**（公開網頁、公開 API、公開 repo）通常唔屬「未經授權存取」；但一旦你**送去登入嘗試、猜密碼、改參數攞唔屬於你嘅資料**，就已經越線，可能構成未經授權存取。
- **靶場唔會越線**：因為課程同靶場已經**明示授權**你喺入面做任何嘢。所以本課所有「試登入、爆破、改 `id=`」一律**只喺靶場做**。
- **個人資料**：收集得到嘅個人資料受《個人資料（私隱）條例》（第 **486** 章）規管；即使「合法收集」，處理方式仍受限制。
- **一句記牢**：**未授權 = 刑事；有授權（target 係你自己嘅靶場／有書面同意）= 學習**。

---

## 💬 7. Student questions 詳解

> §8 原文共 **4 條** Student questions（原文只有題目，答案全部由本筆記補寫）。

### 題 1
> **原文題目（1）**：Define Open-Source Intelligence (OSINT) and explain why it is usually legal, low-risk for the attacker, and often the highest-leverage phase of a targeted engagement.

**建議答案（英文要點 ＋ 繁中拆解）**：
- **定義**：OSINT = information gathered from **publicly available sources**（公開來源情報）。喺 Web app 場景包括 staff directories、API responses、metadata、source code、error messages 等——全部都**任何人本來就睇得到**。
- **點解通常合法**：因為收集嘅係**已經公開**嘅資料，你冇繞過任何認證控制，冇「未經授權存取」——所以喺大部分司法管轄區屬合法。
- **點解低風險**：你唔需要接觸目標嘅內部系統、唔會留攻擊 log、唔會被 IDS 攔——你淨係「睇」公開嘢。
- **點解係最高槓桿（highest-leverage）**：因為佢**幾乎零成本**就把「猜憑證」嘅問題**砍半**——你攞到真名、email 格式、有效 username，之後 credential stuffing／spear-phishing 嘅成功率大幅提升，仲可以畫出攻擊面。
- **英文一句答**：OSINT is intelligence collected from public sources; because no authentication is bypassed it is usually legal and low-risk, and because it yields real usernames and email formats it removes the guessing phase of later attacks — the highest-leverage starting point.

> ⚠️ 教材外補充（答案）：**常見錯答**——只講「OSINT 係搵資料」，冇答到「為何合法（公開、毋須繞過認證）」「為何低風險（零接觸、零噪音）」同「為何高槓桿（砍半猜測成本）」三個 point。

### 題 2
> **原文題目（2）**：Why does a public staff directory that pairs full names, login usernames, and email addresses halve the attacker's work? Connect this to password spraying, credential stuffing, and targeted phishing.

**建議答案（英文要點 ＋ 繁中拆解）**：
- **核心**：一條憑證對 = username ＋ password。公開名錄**免費送你前半**（真名、username、email），所以攻擊者淨係要解決「密碼」呢一半＝**砍半**。
- **email 格式**：`first.last@` 一個 pattern 就可以**量產**全公司嘅 username／email。
- **password spraying**：你唔再要猜 username；直接用**少量常見密碼**（如 `Welcome2024`）掃**一大批確認咗存在嘅帳號**，避開鎖帳號。
- **credential stuffing**：把已知 username／email 拿去對 breach／stealer log，食**密碼重用**——一對中就即登入。
- **targeted phishing（魚叉式）**：有真名＋職銜＋email，就可以寫一封**度身訂造**、令人信以為真嘅釣魚信（冒充同事、老細）。
- **英文一句答**：A credential pair needs both halves; a staff directory hands over the username/email half for free (and reveals the email format), leaving only the password — so it feeds spraying (few passwords, many known accounts), stuffing (reused passwords from breaches), and targeted phishing (real names and addresses).

> ⚠️ 教材外補充（答案）：**常見錯答**——只答「因為有 username 方便撞密碼」，冇連到**spraying／stuffing／phishing 三條線**，亦冇提「email 格式可量產」呢點。

### 題 3
> **原文題目（3）**：Design a public staff directory that does not feed credential attacks. Cover identifier choices, access control, and login/forgot-password error behaviour.

**建議答案（英文要點 ＋ 繁中拆解）**：
- **Identifier choices（識別碼選擇）**：
  - 唔好用**可預測嘅 `first.last`**做登入 username——改用具隨機性／不可由姓名推導嘅識別碼（例如職員編號 + 內部 mapping）。
  - 分開「顯示用」同「登入用」：對外顯示名同職銜，但**唔顯示登入識別碼或 email**。
- **Access control（存取控制）**：
  - 員工名錄**唔可以未認證就派全份資料**——要登入（甚至限內部 IP／VPN）先睇得到。
  - `/api/users.php`、`/staff.php`、CSV 匯出、search endpoint **全部都要做認證＋授權檢查**，唔好淨係靠「介面冇連結」。
  - 只回**最小必要欄位**（唔要一次過回 `username`、`email`、`role`）。
- **Login / forgot-password error behaviour（錯誤訊息行為）**：
  - 用**統一、含糊**嘅訊息，例如一律回 `Invalid username or password.`，唔好分開講「Username not found.」／「Password incorrect.」。
  - **Forgot-password** 亦要統一：無論帳號存唔存在都回同一句「如帳號存在，已寄出重設連結」，並且**回應時間**要一致（避免 timing side-channel）。
  - 加 rate limiting、CAPTCHA、lockout 等，令枚舉同爆破變難。
- **英文一句答**：Use non-guessable internal identifiers (don't expose login IDs/emails), require authentication and authorisation for directories and APIs (minimum fields only), and return uniform, non-revealing messages for both login and forgot-password (plus rate limiting) so no endpoint confirms whether an account exists.

> ⚠️ 教材外補充（答案）：**常見錯答**——只答「加登入」但答漏**forgot-password 都要統一訊息**（原文題目明明點名問），亦冇提「唔可以用 `first.last` 做登入 ID」。

### 題 4
> **原文題目（4）**：Explain why a complete credential pair harvested from an infostealer or breach log is worth far more than an enumerated username, and describe the shell-based technique — grep/awk filtering and field extraction — for turning raw stealer logs into working logins.

**建議答案（英文要點 ＋ 繁中拆解）**：
- **為何完整憑證對值更多**：一個 enumerated username 只係「一半」，之後仲要**猜密碼**（有機會撞唔中、觸發 lockout）。一個完整 pair（如 `admin:123qwe!@#`）**完全唔使猜**——原文講佢「worth more than a thousand guessed usernames, because it needs no guessing at all」。
- **技術流程（原文命令）**：
  1. 用 `grep -i hkgov data/stealer_sample.log` 忽略大小寫搵目標網域行；
  2. 收窄：`grep 'hkgov-service.local' data/stealer_sample.log | awk -F: '{print $3 ":" $4}'`，用 `-F:` 以冒號分隔，抽第 3、第 4 欄出 `username:password`。
- **要注意嘅陷阱**：帶 URL scheme 嘅行會令欄位**移位**（例如出 `443:mary.wong`），要自己睇或先剝 scheme。
- **之後點用**：洩漏密碼可能過期（stale）——先直接試登入；唔 work 就攞個 username 去行爆破。
- **英文一句答**：An enumerated username still needs guessing, while a full pair needs none; use `grep` to filter the log to the target domain, then `awk -F:` to extract `$3 ":" $4` as username:password (watch for URL-scheme lines shifting the columns), try the leaked password first, and fall back to brute force if it is stale.

> ⚠️ 教材外補充（答案）：**常見錯答**——只答「用 grep 搵」，但**冇提 `awk -F: '{print $3 ":" $4}'` 呢條命令**、冇提**欄位移位陷阱**、亦冇答「為何完整 pair 值更多（唔使猜）」。

---

## 🎒 8. 考前 5 分鐘懶人包 ＋ 自測

**必背關鍵數字／字串**

- 靶場內部網域：**`hkgov-service.local`**；靶場 URL：**`http://localhost:8080`**
- 兩個未認證洩漏點：**`/staff.php`**（員工名錄）、**`/api/users.php`**（JSON API）
- JSON 欄位：**`username`、`full_name`、`email`、`role`**
- 登入錯誤差異：存在 → **`Password incorrect.`**；唔存在 → **`Username not found.`**
- Stealer log 行格式：**`host:port:username:password`**
- 樣本憑證對：**`admin:123qwe!@#`**、**`john.doe:Welcome2024`**、**`bob.chan:changeme123`**、**`mary.wong:Passw0rd!`**
- 移位陷阱輸出：**`443:mary.wong`**（原本應為 `mary.wong:Passw0rd!`）
- IDOR 端點：**`GET /message.php?id=2`**；`id=1` 回 **`New admin tools`**（admin ↔ it.helpdesk）
- admin 專屬端點：**`/admin.php`**（navigation 多 `Administration` 項目）
- Infostealer 名：**RedLine、Vidar、Raccoon**
- MITRE：**T1593、T1594、T1589、T1590**｜OWASP：**A01:2021、A07:2021**

**Payload／命令對照表**

| 目的 | 命令（原文逐字） |
|---|---|
| 忽略大小寫搵目標網域行 | `grep -i hkgov data/stealer_sample.log` |
| 收窄並抽 username:password | `grep 'hkgov-service.local' data/stealer_sample.log \| awk -F: '{print $3 ":" $4}'` |
| 造 username wordlist | `cat > users.txt <<'EOF'` … `EOF` |
| 行憑證攻擊 | `python3 tools/brute.py http://localhost:8080` |
| 記錄攻擊面 | Burp **Proxy → HTTP history** |

**英文必背句**

- Open-Source Intelligence (OSINT) is information gathered from publicly available sources.
- Exposing internal login identifiers halves the credential-guessing problem.
- Every line is one saved credential in host:port:username:password format.
- A complete credential pair is worth more than a thousand guessed usernames because it needs no guessing at all.
- The page looks identical for every account, so one login cannot expose IDOR.

**5 條自測問題**

1. 靶場邊兩個 endpoint 未認證就洩漏用戶資料？佢哋分別回傳咩格式？
2. 點解一個公開員工名錄會「halve the attacker's work」？請連到 spraying、stuffing、phishing。
3. 由 `login.hkgov-service.local:443:admin:123qwe!@#` 用 `awk -F: '{print $3 ":" $4}'` 抽出嚟嘅結果係咩？若果行頭多咗 `https://` 又會變成咩？
4. 點解 IDOR 攻擊面「單靠一個帳號係 expose 唔到」？要點做先見到？
5. OSINT 喺 MITRE ATT&CK 屬邊個 tactic？對應邊四個技術編號？

答案：1）`/staff.php` 同 `/api/users.php`；前者 HTML 員工名錄、後者 JSON array（含 username／full_name／email／role）。 2）因為憑證對有兩半，名錄免費送 username／email 前半（仲洩露 `first.last@` 格式）→ spraying 用少數密碼掃大量已知帳號、stuffing 食密碼重用、phishing 用真名職銜度身訂造。 3）`admin:123qwe!@#`；加咗 scheme 後會移位，出成 `443:admin`（即欄位整體右移一格：`443` 佔咗 username 個位、`admin` 跌入 password 個位）。 4）因為頁面對每個帳號都一模一樣，endpoint 按 `id=` 直接撈 row 而唔檢查 ownership——要用**兩個唔同帳號**登入、比較頁面同請求（side by side）先見到（例：改 `id=2` 做 `id=1` 攞到 admin 嘅 message）。 5）Reconnaissance（偵察）；T1593（搜公開網站／網域）、T1594（搜目標自有網站）、T1589（收集目標身分資料）、T1590（收集目標網絡資料）。

---

## 🛡️ 9. 防守方修正清單（Defender Fix Checklist）

**（A）原文有嘅修法（照收）**

- **減少公開暴露**：把員工名錄、`/api/users.php`、CSV 匯出、search endpoint 等**全部收喺認證之後**，唔好未登入就派身分資料——原文核心：「reducing public exposure is a key defensive control」。
- **統一登入／重設訊息**：唔好分開講 `Username not found.` 同 `Password incorrect.`——用一句含糊訊息，消除 username enumeration。
- **唔好回傳多餘欄位**：API 只回最小必要欄位，唔好一次過回 `username`、`email`、`role`。
- **補 IDOR 嘅 ownership 檢查**：`/message.php` 呢類 viewer 要**核對該物件屬唔屬於當前登入用戶**，唔好淨係靠 `id=` 撈 row（對應 OWASP **A01:2021 Broken Access Control**）。

**（B）教材外補充嘅具體修法**

> ⚠️ 教材外補充：以下為原文冇列、但實務上應做嘅修正。

- **識別碼設計**：登入 ID 唔好用可由姓名推導嘅 `first.last`（可預測＝可量產）；改用職員編號／UUID 等不可猜識別碼，並把「顯示名」同「登入 ID」分開。
- **認證與授權**：所有列舉用戶嘅 endpoint 都要 authentication ＋ authorization 雙檢；內部工具限 IP／VPN。
- **防枚舉配套**：login 同 forgot-password 一律**統一訊息 ＋ 一致回應時間**（防 timing side-channel），再加 rate limiting、CAPTCHA、account lockout。
- **一般做法（PHP）**：用框架嘅 auth middleware 守 `/staff.php`、`/api/*`；SQL 查詢一律**帶 `WHERE owner_id = :current_user`** 條件（唔淨係 `WHERE id = :id`）；輸出用 `json_encode` 只揀 whitelist 欄位。
- **一般做法（ASP.NET）**：用 `[Authorize]`／`[Authorize(Roles="Admin")]` attribute 保護 controller／endpoint；用 resource-based authorization（`IAuthorizationService`）做 per-object 檢查；API 用 DTO／ViewModel 只暴露必要欄位，唔好直接 serialize entity。
- **監測**：對「大量登入失敗」「同一 session 掃唔同 `id=`」設告警。

➜ 對應速記：ART_Final_CheatSheet.md
