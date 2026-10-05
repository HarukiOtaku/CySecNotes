# ART_T3_P4 — 攻擊鏈④ 憑證蒐集（Credential Discovery）雙語學習筆記

> **原教材**：Advanced Red Team — Tutorial 3（PDF p.104–111）｜覆蓋 section：§9 Backup File Brute Force
> **攻擊鏈位置**：④ 憑證蒐集（Credential Discovery）
> **前置階段**：① 公開偵察（Public Recon）、② 初始存取（Initial Access）、③ 權限提升（Privilege Escalation）
> **本檔範圍**：只寫 §9「Backup File Brute Force（備份檔暴力破解）」。§8 公開偵察由 `ART_T3_02_PublicRecon_StudyGuide.md` 負責（本檔只在需要時交叉引用）；§10 LFI 讀取備份檔由 `ART_T3_07_LateralFileAccess_StudyGuide.md` 負責。
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 最後對照懶人包自測

> ⚠️ 教材外補充：原文 §9 屬 credential discovery；而公開偵察（§8）見 ART_T3_02_PublicRecon_StudyGuide.md。

---

## 📝 1. 憑證蒐集 概要與實務情境（Summary & Real-world Context）

本階段係攻擊鏈嘅**第④步「憑證蒐集（Credential Discovery）」**。到咗呢一步，攻擊者通常已經（透過 ①公開偵察）摸清目標係一個「政府入口網站」PHP + SQLite 靶場 app，亦可能（透過 ②初始存取／③權限提升）已經有咗一個低權限嘅落腳點或者一個普通帳號。**憑證蒐集嘅目的，係喺伺服器上面搵到「唔應該被公開」嘅秘密** —— 資料庫帳密、API key、OAuth client secret、密碼 hash，甚至係未加密嘅密碼明文。呢啲秘密一旦落到手，就成為下一步「橫向移動」同「主機淪陷」嘅燃料。

原文 §9 聚焦其中一條**產量極高、成本極低**嘅路線：**Backup File Brute Force（備份檔暴力破解）**。開發人員為咗方便，經常喺維護／部署期間整咗一堆備份、資料庫 dump、壓縮檔、版本控制快照（source-control snapshot），然後**唔小心留咗喺網站根目錄（web root）裡面**。只要檔名係「可預測」嘅（`.bak`、`.old`、`~`、`.sql`、`.zip`、`.git`……），攻擊者就可以用一份 wordlist 逐個檔名去「撞」，撞中就整份下載。呢個係 CWE-530 所指嘅「備份檔暴露畀未授權範疇」。

**前置假設**：你已經知道目標嘅 base URL（本 lab 係 `http://localhost:8080/`），而且你（喺 §0 設定好嘅）Burp Suite / OWASP ZAP 已經可以正常攔截同轉發請求。你**唔需要**任何有效帳號就做得到 —— 因為呢啲檔案根本冇權限控制，任何知道／猜到檔名嘅人都下載得到。

**實務情境一（滲透測試）**：你受聘去測一間公司嘅內網入口網站。你唔急住去打 login form，而係先用 `ffuf`／Burp 對 `/backup/`、`/old/`、`/backups/` 撞一份「備份副檔名」wordlist。兩分鐘後你搵到 `config.php.bak`，打開一睇 —— 資料庫帳密、API secret、OAuth client secret 全部喺入面。呢一步往往係整份報告裡面「影響（Impact）」最嚴重嘅一條 finding，因為佢洩漏嘅唔止一個帳號，而係成個系統嘅信任根。

**實務情境二（真實事故）**：有公司將 `.git/` 目錄連埋網站一齊 deploy 上 production。攻擊者去 `https://target/.git/HEAD`（200 OK）之後，用工具把成個 repo clone 落嚟，再用 `git log` 逐個舊 commit 睇 —— 就算而家 live 版本已經刪走所有秘密，**舊 commit 入面嘅 secret 依然完整咁留低**（因為 Git 係「追加式」歷史，唔會真正刪除舊內容）。呢個就係原文所講「exposed source-control folders have been responsible for full source-tree disclosures」嘅原因。

---

## 🎯 2. 學習目標（Learning Objectives）

1. **講得出 backup artifact 係乜、為何會留喺 web root** — Enumerate common backup and source-control artifacts from a web root and explain why predictable backup names are dangerous
2. **列得出常見備份副檔名同命名模式** — List common patterns: editor temp files (`.swp`, `~`), renamed backups (`.bak`, `.old`, `.orig`), database dumps (`.sql`), archives (`.zip`, `.tar.gz`, `.7z`), dated archives (`site_backup_YYYYMMDD.zip`), source-control metadata (`.git`, `.svn`, `.hg`)
3. **對得上 CWE／OWASP 編號** — Map the exposure to CWE-530 and OWASP A05:2021 (Security Misconfiguration)
4. **先做 tech-stack fingerprint 再揀 wordlist** — Fingerprint the tech stack (Server, X-Powered-By headers, URL extensions, Wappalyzer) before building the wordlist
5. **用 Burp/ZAP 對 `/backup/` 做 forced browsing** — Run a forced-browse scan against a web root using Burp Suite or OWASP ZAP
6. **判別命中：HTTP 200 vs 404** — Compare status code, content type and body length; an HTTP 200 (rather than 404) confirms a directly downloadable file
7. **喺 discovery 到嘅 artifact 內搵秘密** — Open discovered artifacts and search for database credentials, API keys, password hashes, table schemas and source code
8. **由暴露嘅 `.git` 重構整份版本歷史** — Reconstruct the repository history from an exposed `.git`, including secrets deleted from the live site
9. **講得出防守修法** — State the four defender controls: store backups outside the document root, encrypt archives, use unguessable random names, strip/rotate secrets and block dotfile requests
10. **明白「檔名好難估」唔係一個 security control** — Explain why "the filename is hard to guess" is not a control

---

## 🧩 3. 零經驗先修（Prerequisites, in plain words）

以下係讀本檔之前應該要識、但原文**假設你已經識**嘅基礎。每項：定義 ＋ 一個生活化比喻 ＋ 英文一句。

**3.1 Web root（網站根目錄）**
網站伺服器「對外開放」嘅資料夾；瀏覽器打 URL 時，路徑其實就係喺呢個資料夾裡面搵檔。放咗喺 web root 裡面嘅檔案，只要檔名啱，任何人都抓得到。
比喻：好似一間屋嘅「騎樓擺檔」——擺得喺出面嘅嘢，路過嘅人都拎得走；收埋喺屋企（web root 以外）先至安全。
> The web root is the folder whose contents the web server serves to anyone who requests the matching URL.

**3.2 Brute force / enumeration（暴力破解／枚舉）**
唔係靠「計出嚟」，而係拎住一份清單（wordlist），逐個候選值去試，睇邊個「撞中」。枚舉（enumeration）就係「有系統咁逐個試、逐個記錄」。
比喻：你唔記得自己儲物櫃號碼，於是攞住 1–1000 嘅號碼牌逐個試開。
> Brute forcing means trying every candidate from a list until one succeeds.

**3.3 Wordlist（字典檔／單字清單）**
一份純文字檔，一行一個候選字串（例如常見檔名、常見密碼、常見目錄名）。工具會逐行讀出嚟當請求發出去。wordlist 嘅質素直接決定成敗 —— 一份好嘅 wordlist 比盲試快一萬倍。
比喻：wordlist 就係你嘅「候選答案清單」，清單越貼題（越配合目標技術棧），越快命中。
> A wordlist is a plain-text file of candidate strings, one per line, that an enumeration tool tries in turn.

**3.4 HTTP status code（狀態碼）**
伺服器回覆你請求時嘅一個三位數字。做呢個階段最緊要記住兩個：**200 = 成功、內容存在**、**404 = 搵唔到**。另外 301/302 係「重新導向（redirect）」、403 係「禁止存取（forbidden，即係存在但唔畀你睇）」。
比喻：200 係「有貨派」，404 係「呢個貨架冇貨」。
> HTTP 200 means the requested resource exists and is being returned; HTTP 404 means it was not found.

**3.5 Forced browsing／directory brute forcing（強制瀏覽／目錄爆破）**
即使網站冇任何連結指去 `/backup/`，你都可以「直接打 URL」去試。呢個動作叫 forced browsing —— 唔依賴網站有冇提供連結，而係靠你主動撞路徑同檔名。
比喻：雖然商場冇指示牌指去貨倉，但你逐間房開門試，總有一間冇鎖。
> Forced browsing is requesting paths and filenames directly, without relying on any link the site provides.

**3.6 Tech stack fingerprint（技術棧指紋識別）**
辨認目標用緊咩語言／框架／伺服器（PHP？Django？Tomcat？）。做法：睇 HTTP response header（`Server:`、`X-Powered-By:`）、睇 URL 結尾嘅副檔名（`.php`、`.jsp`）、用 Wappalyzer 類工具。
比喻：睇對面師傅用咩工具，就知佢砌咩傢俬 —— 你揀 wordlist 都要「對症下藥」。
> Fingerprinting is identifying a target's language, framework and server from passive signals such as headers and URL extensions.

**3.7 Source-control metadata（版本控制中繼資料）**
Git / SVN / Mercurial 等版本控制系統留喺資料夾入面嘅隱藏資料夾（`.git/`、`.svn/`、`.hg/`），用嚟記錄「成個項目嘅歷史」。若果佢跟住網站一齊上咗 production，就等於把「全部原始碼 ＋ 每個舊版本」公開。
比喻：等於你影印咗成疊文件嘅每一版草稿，連之前改走嘅錯誤都仲喺度。
> Source-control metadata folders such as `.git/` record a project's entire history, not just its current files.

**3.8 Config file（設定檔）與 secret（秘密）**
`config.php` 之類嘅檔案通常存住連資料庫嘅帳密、API key、OAuth secret。程式碼本身唔應該寫死（hardcode）秘密，但現實中經常寫死，而且備份會留住舊秘密。
比喻：config 就係「屋企鎖匙同密碼簿」，畀人睇到就等於入咗屋。
> A config file typically holds database credentials, API keys and other secrets the application needs to run.

---

## 📖 4. 逐節深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 4.1 §9 導言：本節你會學到咩（原文 p.104）

繁中解說：原文開頭講清楚本節目標 —— 你可以**從 web root 枚舉出常見嘅備份同版本控制 artifact**、**檢查搵到嘅檔案有冇 secret**、並且**理解為何「可預測嘅備份檔名」係危險嘅**。核心一句：任何「留咗喺 web root、改名／dump／壓縮／版本控制快照」嘅 artifact，只要檔名可估，就等於**任人下載**。

> **English Standard Definition:** "Backup artifacts left inside the web root — renamed configs, dumps, archives, and source-control metadata — are all reachable by anyone who guesses the predictable filenames."（原文如此）

### 4.2 What is it and why does it work?（原文 p.104）

繁中解說：開發人員喺維護或部署期間，好頻繁咁整備份、資料庫 dump、壓縮檔，或者版本控制快照。當呢啲 artifact 被**留咗喺 web root 裡面、而且用咗可預測嘅檔名**，佢哋就會經「檔名枚舉（filename enumeration）」被發現，然後被任何人下載。原文將呢個暴露分類為 **CWE-530: Exposure of Backup File to an Unauthorized Control Sphere**，對應 **OWASP A05:2021 — Security Misconfiguration**。

原文列出嘅常見模式（**原樣列出**）：

- editor temp files：`.swp`、`~`
- renamed backups：`.bak`、`.old`、`.orig`
- database dumps：`.sql`
- archives：`.zip`、`.tar.gz`、`.7z`
- dated archives：`site_backup_YYYYMMDD.zip`
- source-control metadata：`.git`、`.svn`、`.hg`

關鍵一句：**就算網站關咗目錄列表（directory listing disabled），一份「常見備份同版本控制路徑」嘅 wordlist 通常已經足夠搵到佢哋。**

> **English Standard Definition:** "Directory listing may be disabled, but a wordlist of common backup and version-control paths is usually enough to find them."（原文如此）

### 4.3 為何備份檔本身會洩密（原文 p.104–105）

繁中解說：呢個係**整個階段嘅靈魂** —— 備份檔之所以「高產量（high-yield）」，係因為佢哋往往存住**已經從 live 程式碼移除、但無喺備份度清走嘅秘密**。原文特別講：**未加密嘅備份係滲透測試同事故報告中「例行性」嘅憑證洩漏來源**。而暴露嘅版本控制資料夾，歷史上就多次導致「完整 source tree 洩漏」。

原文引用 OWASP Testing Guide：佢有一整節專門講**檢視舊備份同未被引用嘅檔案（old backup and unreferenced files）** 有冇敏感資訊。原文嘅最佳實務建議：**喺 document root 以外存放備份、加密敏感壓縮檔、確保版本控制資料夾唔會被 deploy。**

> **English Standard Definition:** "unencrypted backups are a routine source of credential leaks in penetration tests and breach reports."（原文如此）

> **English Standard Definition:** "Best practice is to store backups outside the document root, encrypt sensitive archives, and ensure source-control folders are not deployed."（原文如此）

**Lab 內嘅 .git 示範**：本 lab 會直接用暴力破解搵到 web root 入面暴露嘅 `/backup/.git`，然後可以 `git clone` 佢，重構成個 app 嘅 source history。（詳細步驟見第 5 節 walkthrough。）

### 4.4 How to find it — 方法論（原文 p.105–107）

繁中解說：原文把「點搵」拆成一連串步驟，順序好重要 —— **先 fingerprint，後撞**，唔好盲估。以下逐條重寫：

1. **先做 tech stack fingerprint**。值得猜嘅備份副檔名取決於目標用咩技術。做法：睇 HTTP response header（`Server`、`X-Powered-By`）、睇 URL 入面嘅副檔名（`.php`、`.jsp`、`.py`、`.rb`）、用 Wappalyzer 類工具 —— **先做齊呢啲，再砌 wordlist。**
2. **檢查常見位置**：`/backup/`、`/old/`、`/backups/`，同埋 document root 本身，睇有冇遺留嘅 artifact。
3. **砌一份「可預測備份模式」嘅 wordlist** —— 下面 4.5 嘅 stack table 就係原文所講嘅 canonical（標準）清單。
4. **逐個候選路徑發請求，比較三樣嘢**：status code、content type、body length。**HTTP 200、目錄列表、或者意料之外嘅 content-type，都代表有 artifact 暴露。**
5. **若 `.git` 通得到**，就由暴露嘅 metadata 重構成個 repository 歷史。
6. **打開任何搵到嘅 artifact**，搜尋：資料庫帳密、API key、密碼 hash、table schema、原始碼。

> **English Standard Definition:** "Fingerprint the stack first — Server headers, URL extensions, Wappalyzer — before building the wordlist."（原文如此）

> **English Standard Definition:** "Compare status code, content type, and body length per candidate — 200, a listing, or odd types mean exposure."（原文如此）

**為何要比較「body length」？**（新手向補充）
唔止睇 status code。有時網站會用「軟 404」——即係明明搵唔到檔案，但唔回 404，反而回一個 200 嘅「自訂錯誤頁」。呢個時候就要睇 **body length** 有冇唔同：真正存在嘅檔案 body 長度，通常同錯誤頁唔一樣。亦有時係 content-type 露餡（例如你撞 `.zip`，佢真係回 `application/zip`）。

### 4.5 技術棧對應嘅備份／敏感檔清單（原文 p.107 表，原樣列出）

繁中解說：下表係原文嘅 canonical wordlist 基礎。**用嘅時候，只挑同目標技術棧對應嘅嗰一行**，唔好盲試全部。

| Tech stack | How to fingerprint | Common backup/sensitive files to try |
|---|---|---|
| PHP | `.php` URLs; `X-Powered-By: PHP/…`; Apache/Nginx server header | `config.php.bak`, `config.php~`, `.php.swp` (Vim), `.env`, `phpinfo.php` |
| Node.js / Express | `X-Powered-By: Express`; JSON APIs; static `.js` assets | `.env`, `app.js~`, `package.json.bak`, `.git/` |
| Java / Tomcat | `.jsp`/`.do` URLs; `Server: Apache-Coyote`; Tomcat default error pages | `web.xml.bak`, `*.war.bak`, `META-INF/`, `WEB-INF/` |
| Python / Django | CSRF cookies (`csrftoken`); `Server: WSGIServer`; admin at `/admin/` | `settings.py.bak`, `.env`, `db.sqlite3~` |
| Ruby on Rails | `_session_id` cookie; `Server: Puma/Unicorn`; `/500.html` style error pages | `database.yml.bak`, `config~`, `.env` |

**無論係咩技術棧，都要另外直接探測版本控制 metadata 路徑**（原文原樣）：

```text
.git/HEAD
.svn/entries
.hg/store/00changelog.i
```

以及 IDE 嘅 project 資料夾：

```text
.idea
.vscode
```

> **English Standard Definition:** "Whatever the stack, also probe source-control metadata paths directly."（原文如此）

### 4.6 Worked example（本 lab 實例，原文 p.108）

繁中解說：原文畀咗一個「走完一次」嘅實例。本 lab 個站係**服務 `.php` 頁面、response header 顯示 Apache/PHP** —— 所以目標係一個 **PHP target**。對應嘅模式（`config.php.bak`、`.env`、`.sql` dumps、帶日期嘅 `.zip` archives、`.git/HEAD`）**正正就係 lab 故意留喺 `/backup/` 下面嘅嘢**。原文原樣列出咗呢批暴露路徑：

```text
backup/config.php.bak
backup/users_backup.sql
backup/lab.db.bak
backup/site_backup_20240720.zip
backup/source.zip
backup/.git/
```

**注意**：呢批檔名全部「可預測」—— 用嘅正係 4.2 同 4.5 列出嘅規律（`.bak`、`.sql`、`.zip`、`YYYYMMDD` 日期、`.git/`）。所以話「檔名可預測 = 可被枚舉」。

### 4.7 點判別「命中」同「成功下載」（原文 p.108）

繁中解說：原文講明 —— 對 `/backup/` 做完 forced browse 之後，**任何 HTTP 200 response 就代表「該檔案可以直接下載」**。以本 lab 為例，`tools/backup_brute.py` 腳本（原文提供嘅參考實作）會對以下 URL 報 **HTTP 200**：

```text
/backup/config.php.bak
/backup/users_backup.sql
/backup/lab.db.bak
/backup/site_backup_20240720.zip
/backup/source.zip
/backup/.git/HEAD
```

> **English Standard Definition:** "Any HTTP 200 response means the file is directly downloadable."（原文如此）

### 4.8 由 config 備份掘到嘅秘密（原文 p.108）

繁中解說：喺本 lab 嘅 `config.php.bak` 入面，原文講明佢會 render 成純文字，而且係「goldmine（金礦）」。裡面定義咗：

- 資料庫帳密：`DB_USER 'lab_app'`、`DB_PASS 'BackupP@ssw0rd!2024'`
- 一個 fake API secret
- **最值錢（對 §13 而言）嘅 OAuth 整合憑證**：`OAUTH_CLIENT_ID 'hkgov-portal-client'` 同 `OAUTH_CLIENT_SECRET`（政府 SSO 連線用）

原文金句：**「Configuration secrets removed from the live code often survive in backups like this one」** —— 亦即係話，live code 明明已經清走秘密，但備份入面照樣搵得返。

> **English Standard Definition:** "Configuration secrets removed from the live code often survive in backups like this one."（原文如此）

> **圖示描述**：原文 Screenshot 61 顯示喺 Firefox 直接瀏覽 `http://localhost:8080/backup/config.php.bak` 嘅畫面 —— 頁面以純文字渲染，可以肉眼讀到 `config.php.bak` 內容，包括 `DB_USER`、`DB_PASS`、API secret 同 OAuth client ID／secret 等設定值（因為 `.bak` 副檔名唔會被 PHP 執行，只會當成文字檔回傳）。（原教材截圖，本筆記不轉載圖片）

### 4.9 由 DB dump 掘到明文密碼（原文 p.109）

繁中解說：`/backup/users_backup.sql` 之類嘅 DB dump 可能含有使用者表（user tables）、密碼 hash，或者其他敏感紀錄。打開 SQL dump 之後，要搵：**`INSERT INTO users` 語句、password 欄位、table schema**。dump 可能露出**明文密碼**或者**弱 hash**。

本 lab 特別「甜」：dump 裡面嘅 `INSERT INTO users` 語句**逐個帳號連明文密碼都列咗出嚟，完全唔需要破解（no cracking required）**。原文仲指出：呢個 dump **印證（confirms）咗 §6 嘅暴力破解結果**（即係兩個 section 搵到嘅同一批密碼）。

> **English Standard Definition:** "here you find an INSERT INTO users statement listing every account with its password in plaintext, with no cracking required."（原文如此）

### 4.10 由 `.git` 重構版本歷史（原文 p.109–110）

繁中解說：若掃描器報 `.git/HEAD` 存在，就去 Firefox 打開 `http://localhost:8080/backup/.git/HEAD`。**成個 repository 歷史通常可以由暴露嘅 Git metadata 重構出嚟**。`.git/HEAD` 會 render，顯示當前 branch 嘅 ref（例如 `ref: refs/heads/main`）。

想進一步挖舊秘密（舊 commit 可能存有後來被刪嘅憑證或設定），你可以：
- 直接喺 web server 上面瀏覽原始 Git object；**或者**
- （如果你偏好）喺 terminal 直接 clone 暴露咗嘅 repo（原文原樣命令）：

```bash
git clone http://localhost:8080/backup/.git /tmp/lab-src && cd /tmp/lab-src && git log --oneline
```

clone 成功之後，`git log --oneline` 會列出成個項目嘅 commit —— **包括已經喺 live 站刪走嘅檔案同秘密**。

> **English Standard Definition:** "The entire repository history can usually be reconstructed from exposed Git metadata."（原文如此）

> **圖示描述**：原文 Screenshot 62 顯示喺 Firefox 打開 `http://localhost:8080/backup/.git/HEAD` 嘅畫面 —— 頁面只顯示一行純文字 ref 內容，例如 `ref: refs/heads/main`，證明該 `.git` 資料夾係對外可讀嘅（可被下載／進一步用工具重構）。（原教材截圖，本筆記不轉載圖片）

### 4.11 Recap — 每個 artifact 帶嚟咩秘密（原文 p.110 表，原樣列出）

| Artifact | Where found | What secret it yielded |
|---|---|---|
| `/backup/config.php.bak` | Forced-browse scan of `/backup/` | Database credentials (`lab_app` / `BackupP@ssw0rd!2024`) plus the OAuth client ID and secret — the starting point for Section 13 |
| `/backup/users_backup.sql` | Same scan | The users table with plaintext passwords — confirms the Section 6 brute-force results |
| `/backup/lab.db.bak` | Same scan | A full copy of the SQLite database |
| `/backup/site_backup_20240720.zip`, `/backup/source.zip` | Same scan | Archived site source trees |
| `/backup/.git/` | Same scan (`.git/HEAD` probe) | The complete version history — deleted secrets remain recoverable from old commits |

**結論（原文）**：備份同版本控制 metadata 被**存喺 document root 裡面、用可預測檔名、又冇任何存取控制**。佢哋含有憑證、schema 同 secret —— 而呢啲秘密會喺版本歷史裡面「存活」。

> **English Standard Definition:** "backups and source-control metadata are stored inside the document root with predictable names and no access controls."（原文如此）

### 4.12 How to fix（防守方修法，原文 p.110）

繁中解說：原文列咗五個方向：

1. **備份同版本控制 metadata 一律放喺 document root 以外**（最根本嘅一條）。
2. **加密敏感壓縮檔**。
3. **畀備份檔隨機、難以猜測嘅名**。
4. **由程式碼剝走秘密**（用環境注入 credentials），並且**輪替（rotate）任何曾經出現喺 commit 過嘅秘密**。
5. **喺 web server 層面封鎖或重新導向對 dotfile 嘅請求**（例如 `.git/`、`.env`）。

> **English Standard Definition:** "block or redirect requests for dotfiles such as .git/ and .env at the web server."（原文如此）

---

## 🛠️ 5. 逐節實戰步驟（Try it yourself — Walkthrough）

以下按原文「1 ➔ 2 ➔ 3……」次序重寫。每一步都寫明：**做乜 ➔ 喺邊度睇 ➔ 預期結果 ➔ 成功／失敗點分辨**。URL／命令／payload **一字不改**。

**環境提醒**：本 lab 嘅 app 喺課程網站 VM 度（唔喺本機），目標 base URL 係 `http://localhost:8080/`。所有操作喺 lab root 做。

### Step 1 — Fingerprint 目標技術棧，再砌 stack-specific wordlist

- **做乜**：先辨認目標用咩技術，唔好盲估。原文特別強調：**「Do not guess blindly: the extensions worth trying depend on the technology in use.」**
- **三個動作**：
  1. **睇 HTTP response header**。`Server: Apache/2.4`、`X-Powered-By: PHP/8.1`、或 `X-Powered-By: Express` 直接透露平台。
  2. **睇網站 URL 嘅副檔名**。`.php` 尾 → PHP；`.jsp`/servlet 路徑 → Java；**冇副檔名嘅 clean URL** 通常意味住後面係 Django 或 Rails 之類嘅框架。
  3. **用指紋工具確認**。Wappalyzer 瀏覽器擴充（或 Burp/ZAP 內建）由 response header、cookie、頁面 markup 辨認框架、語言同伺服器。
- **喺邊度睇**：瀏覽器開發者工具嘅 Network 面板 / Burp 嘅 response；Wappalyzer 圖示。
- **預期結果**：本 lab 判別為 **PHP target**（serve `.php`、Apache/PHP server header）。
- **成功／失敗點分辨**：成功 = 你能講出「呢個係 PHP + Apache」；失敗 = 你未睇過 header 就衝去撞檔（咁就違反方法論）。

### Step 2 — 對 `/backup/` 做 directory/file brute-forcer

- **做乜**：用 Burp Suite 或 OWASP ZAP，對 `http://localhost:8080/backup/` 做 forced-browse。
  - **Burp**：揀目標 → `Target > Engagement tools > Discover content`。
  - **ZAP**：右鍵目標 → `Attack > Forced Browse Site`，再揀一份「帶備份副檔名」嘅 wordlist。
- **喺邊度睇**：掃描器嘅結果列表；原文提供 `tools/backup_brute.py` 作為參考實作。
- **預期結果**：掃描器報以下 URL 為 **HTTP 200**：

```text
/backup/config.php.bak
/backup/users_backup.sql
/backup/lab.db.bak
/backup/site_backup_20240720.zip
/backup/source.zip
/backup/.git/HEAD
```

- **成功／失敗點分辨**：成功 = 見到 200（唔係 404）；**失敗 = 全部 404，通常係 wordlist 冇對應目標技術棧，或 base URL／port 打錯。**

### Step 3 — 下載搵到嘅 config 備份

- **做乜**：掃描器報出似 `/backup/config.php.bak` 嘅 URL 之後，喺 ZAP/Burp 右鍵該 request → `Open in Browser`；**或者**直接把 URL 貼入 Firefox，再儲存檔案。
- **喺邊度睇**：Firefox，或者你儲低嘅檔案。
- **預期結果**：個備份檔**會下載／直接喺瀏覽器渲染**，而唔係出 404 頁。原文提醒：**config 備份通常含有資料庫帳密同 API key。**
- **成功／失敗點分辨**：成功 = 見到 config 內容（或者檔案下載落嚟）而唔係「Not Found」；失敗 = 404 或空白頁。

### Step 4 — 檢查 config 備份裡面嘅秘密

- **做乜**：用文字編輯器打開下載嘅檔；**或者**直接瀏覽 `http://localhost:8080/backup/config.php.bak`，喺 Firefox 度閱讀。
- **喺邊度睇**：Firefox 或編輯器。原文講明呢個檔案 render 成文字（Screenshot 61）。
- **預期結果**：讀到 `DB_USER 'lab_app'`、`DB_PASS 'BackupP@ssw0rd!2024'`、一個 fake API secret，同 **OAuth 整合憑證** `OAUTH_CLIENT_ID 'hkgov-portal-client'`（同 `OAUTH_CLIENT_SECRET`）—— 呢啲係 **§13 嘅起點**。
- **成功／失敗點分辨**：成功 = 睇到上面嘅帳密欄位；**失敗 = 你睇到嘅係被 PHP 執行（即回空白），咁就係副檔名或者路徑搞錯。**

### Step 5 — 下載搵到嘅資料庫 dump

- **做乜**：喺 Firefox 打開 `/backup/users_backup.sql`，儲存個檔（會當成 `.sql` 文字檔下載）。
- **喺邊度睇**：Firefox／下載資料夾。
- **預期結果**：dump 以 `.sql` 純文字檔下載落嚟。
- **成功／失敗點分辨**：成功 = 檔案下載且係文字；失敗 = 瀏覽器直接亂碼／404。

### Step 6 — 檢查 dump 裡面嘅敏感資料

- **做乜**：用文字編輯器打開 SQL dump，搵 **`INSERT INTO users` 語句、password 欄位、table schema**。
- **喺邊度睇**：文字編輯器搜尋 `INSERT INTO users`。
- **預期結果**：原文講明 —— 呢度會搵到一個 `INSERT INTO users` 語句，**列出每個帳號連明文密碼，完全唔需要破解**。
- **成功／失敗點分辨**：成功 = 見到明文密碼或弱 hash 嘅 users 表；失敗 = dump 唔完整／你打開錯檔。

### Step 7 — 檢查有冇暴露嘅 Git repository

- **做乜**：若掃描器報 `.git/HEAD`，喺 Firefox 打開 `http://localhost:8080/backup/.git/HEAD`。
- **喺邊度睇**：Firefox（Screenshot 62）。
- **預期結果**：`.git/HEAD` render 出嚟，顯示當前 branch ref，例如 `ref: refs/heads/main`。
- **成功／失敗點分辨**：成功 = 見到 ref 一行文字（證明 `.git` 對外可讀）；失敗 = 404。

### Step 8 — 檢查 repository 歷史裡面嘅秘密

- **做乜**：舊 commit 可能含後來被刪嘅憑證或設定。可以喺 web server 上面瀏覽原始 Git object；**或者**（原文原樣）喺 terminal clone：

```bash
git clone http://localhost:8080/backup/.git /tmp/lab-src && cd /tmp/lab-src && git log --oneline
```

- **喺邊度睇**：terminal 輸出。
- **預期結果**：clone 成功，`git log --oneline` 列出項目嘅 commit —— **包括 live 站已經刪走嘅檔案同秘密**。
- **成功／失敗點分辨**：成功 = 見到 commit 列表；**失敗 = clone 報錯（通常係 `.git` 其實唔完整，或者路徑唔啱）。**

> ⚠️ 教材原文如此：原文於 p.110 將「Recap — what each artifact yielded」同「Conclusion」標成步驟 **9、10**，但內文並冇對應嘅新操作，實質只係第 4.11 節嘅總結表同結論。本筆記按內容歸入 §4.11，唔另開步驟。

---

## 🧩 6. 新手補充：零經驗專用講解

> ⚠️ 教材外補充：以下全部係原文冇寫、但零經驗學生一定會撞到嘅位。

### 6.1 為何「備份檔會洩密」？（用日常比喻）

開發者心態係「備份放喺個 site 資料夾度，反正冇 link 指過去，冇人知」。但 web server 嘅設計係：**URL 打得出、檔案存在、就有得睇** —— 唔理你有冇 link。呢個等於「你將後備鎖匙放喺大門地毯底，然後以為冇人知」：只要你採過嗰個位（wordlist），就搵到。再深一層：`.bak`／`~` 呢類副檔名**唔會被 PHP 執行**，server 只會當佢係普通文字檔咁回傳，所以連原始碼／密碼都原封不動送出。

### 6.2 呢一步喺瀏覽器同伺服器之間實際發生咩事？

你做 forced browse 時，電腦其實逐個檔名發 HTTP 請求：

```text
GET /backup/config.php.bak HTTP/1.1
Host: localhost:8080
```

伺服器收到之後，去 web root 嘅 `/backup/` 資料夾搵 `config.php.bak`：
- 搵到 → 回 `200 OK` ＋ 檔案內容（因為 `.bak` 唔係 PHP，唔會執行，直接當文字回）。
- 搵唔到 → 回 `404 Not Found`。

所以「**200 vs 404**」就係你嘅「有／冇」訊號。Burp/ZAP 幫你自動化「逐個檔名發、逐個睇 status code」。

### 6.3 新手最常撞嘅 5 個卡點

1. **盲撞、唔先 fingerprint**：原文最新嘅方法論就係「先指紋、後撞」。冇對應技術棧嘅 wordlist（例如用 Java 嘅 list 去打 PHP 站）命中率極低。**解法**：先睇 `Server`／`X-Powered-By` header，再揀 4.5 表入面對應嘅行。
2. **Burp/ZAP 收唔到 request**：通常係瀏覽器 proxy 未設好（FoxyProxy），或者 CA 憑證未 import（HTTPS 站會出憑證錯誤）。**解法**：跟 §0 設定步驟重做 proxy ＋ CA import。
3. **只睇 status code、唔睇 body length／content-type**：有啲站「軟 404」（用 200 回自訂錯誤頁）。**解法**：三樣一齊比 —— 200 ＋ body length 明顯唔同 ＋ content-type 合理，先算命中。
4. **撞到 `.php.bak` 但瀏覽器出空白**：如果你打嘅係 `config.php`（少咗 `.bak`），會畀 PHP 執行、可能回空白。**解法**：確認 URL 真係帶 `.bak`／`~` 呢個副檔名。
5. **唔知 wordlist 邊度嚟**：
   - **合規來源**：Kali 內建嘅 wordlists（例如 `dirb`、`dirbuster`、`/usr/share/wordlists/`）、SecLists（開源）等公開發佈嘅清單；本 lab 亦可自建「同技術棧對應」嘅小清單（例如由 4.5 表抄出 `config.php.bak`、`config.php~` 咁樣）。
   - **只可以喺你有書面授權嘅 lab／目標度用**。切忌對唔屬於你嘅網站落手（下面 6.4 詳講）。

### 6.4 盲爆破嘅法律風險（必讀）

> ⚠️ 教材外補充：原文假設讀者只喺 lab 做，冇講法律風險。香港學生一定要清楚。

- **未經授權嘅掃描／爆破，即使「只得 200 回應、冇做壞事」都可能構成罪行。** 香港相關：**《刑事罪行條例》（第 200 章）第 161 條「有犯罪或不誠實意圖而取用電腦」**，以及**第 60 條「刑事毀壞」**（未授權改動電腦）。跨境仲可能觸犯當地法例（例如美、英嘅 computer misuse 法）。
- **「估檔名」同「發請求」唔係免責理由**：forced browsing 一樣係「取用電腦」，只要你冇授權，就唔理你用咩工具。
- **合法邊界**：① 一定要有**書面授權（scope）**；② 只喺授權範圍（IP／域名）內做；③ 呢份筆記**只准喺課程 lab／自己擁有嘅系統**度練；④ 唔好對朋友嘅網站、公司 production、公開互聯網目標「順手試」。
- **一句總結**：技術上做得到，唔等於法律上做得到。

### 6.5 點樣判別自己「成功咗」？

| 情況 | 你應該見到 | 意義 |
|---|---|---|
| 撞中檔案 | `HTTP 200` ＋ body length 正常 ＋ content-type 合理 | 檔案存在且可下載 |
| 軟 404 | `HTTP 200` 但 body length 同錯誤頁一樣 | **誤判**，唔算命中 |
| 目錄可列 | `HTTP 200` ＋ HTML 目錄列表 | 連目錄列表都開咗，更容易 |
| 檔案受保護 | `HTTP 403` | 檔案存在但唔畀你睇 |
| 唔存在 | `HTTP 404` | 冇呢個檔案 |

---

## 💬 7. Student questions 詳解

原文 §9 共 **4 條** student questions（原文只有題目，冇 render 答案）。

### Q1（原文 p.110）
> "Why are predictable backup filenames inside the web root one of the cheapest high-yield findings in a web assessment? Explain the forced-browsing methodology and why HTTP 200 responses (rather than 404) confirm a discovery."

> ⚠️ 教材外補充（答案）：
> - **Cheapest（成本最低）**：唔需要帳號、唔需要複雜 exploit，只要有 base URL ＋ 一份 wordlist，用 Burp/ZAP 撞 `/backup/` 就得。
> - **High-yield（產量最高）**：備份檔往往含有**資料庫帳密、API key、密碼 hash、甚至明文密碼、OAuth secret、成個 source tree**（本 lab 就係樣板）。
> - **Forced-browsing methodology**：即「唔靠網站提供嘅連結，直接逐個候選路徑／檔名發 HTTP 請求」（唔同一般爬蟲只跟 link）。流程：fingerprint → 揀對應 wordlist → 逐個路徑發請求 → 比較 status code／content-type／body length。
> - **為何 200 而非 404 確認**：200 = 伺服器真係有呢個 resource 並回咗內容；404 = 唔存在。因此 **200 就係「檔案存在且可直接下載」嘅直接證據**。
> - 一句 **English 關鍵**："A 200 response means the file exists and is directly downloadable; a 404 means it does not."
> - **常見錯答**：只答「因為備份檔有密碼」，但冇解釋**為何可被發現**（因為檔名可預測 ＋ 冇權限控制）同**200 vs 404 嘅判別作用**。

### Q2（原文 p.110）
> "Why should you fingerprint the technology stack before brute-forcing backup artifacts, and which passive signals — response headers, URL extensions, default error pages, HTML comments, Wappalyzer-class tools — reveal it?"

> ⚠️ 教材外補充（答案）：
> - **為何先 fingerprint**：備份副檔名／模式**取決於技術棧**（PHP 撞 `config.php.bak`／`.php.swp`；Django 撞 `settings.py.bak`／`db.sqlite3~`；Java 撞 `web.xml.bak`／`*.war.bak`）。唔先指紋，wordlist 就會離題、命中率極低。原文原句：**"Do not guess blindly: the extensions worth trying depend on the technology in use."**
> - **Passive signals（被動訊號）**：
>   - **Response headers**：`Server:`、`X-Powered-By:`（例：`X-Powered-By: PHP/8.1`、`X-Powered-By: Express`）。
>   - **URL extensions**：`.php` → PHP；`.jsp`/`.do` → Java/Tomcat；clean URL 無副檔名 → 可能 Django/Rails。
>   - **Default error pages**：Tomcat 預設錯誤頁、Rails `/500.html` 風格頁。
>   - **HTML comments**：頁面原始碼註解有時會留低框架／路徑線索。
>   - **Wappalyzer-class tools**：由 header、cookie、markup 自動辨識框架／語言／伺服器。
> - 一句 **English 關鍵**："Fingerprint the stack first — Server headers, URL extensions, Wappalyzer — before building the wordlist."
> - **常見錯答**：只講「用 Wappalyzer」，漏咗 header／URL 副檔名／預設錯誤頁／HTML 註解呢啲被動訊號。

### Q3（原文 p.110）
> "An exposed .git directory is often more valuable than a single config backup. Explain what an attacker can reconstruct from it and name a tool or technique for pulling and inspecting an exposed repository."

> ⚠️ 教材外補充（答案）：
> - **可重構咩**：由 `.git` metadata 可以重構**成個 repository 歷史**（唔止當前版本）—— 包括已喺 live 站刪走嘅檔案、設定同秘密（因為 Git 係追加式歷史，舊 commit 嘅內容依然可以還原）。本 lab 例子：`git log --oneline` 就列出所有 commit。
> - **工具／技術**：`git clone`（例如原文本 lab 命令 `git clone http://localhost:8080/backup/.git /tmp/lab-src && cd /tmp/lab-src && git log --oneline`）；亦可喺 web server 上直接瀏覽原始 Git object。另可提 GitTools、git-dumper 之類專門由暴露 `.git` 還原 repo 嘅工具（屬業界常見做法）。
> - 一句 **English 關鍵**："An exposed .git lets you reconstruct the entire repository history, including deleted secrets."
> - **常見錯答**：只答「睇到原始碼」，但冇指出重點係**版本歷史會有 live 站已刪嘅秘密**。

### Q4（原文 p.111）
> "What storage, naming, and web-server configuration principles should govern backups and archives so they cannot be fetched over HTTP? Explain why \"the filename is hard to guess\" is not a control."

> ⚠️ 教材外補充（答案）：
> - **Storage（儲存）**：備份同版本控制 metadata 一律**放喺 document root 以外**；邊個都唔應該可以由 URL 直接觸及。
> - **Naming（命名）**：用**隨機、難以猜測嘅名**（但見下段——呢個唔可以當唯一防線）。
> - **Web-server configuration（伺服器設定）**：喺 server 層面**封鎖或重新導向對 dotfile 嘅請求**（`.git/`、`.env`）；加埋加密敏感壓縮檔、由程式碼剝走秘密（環境注入）＋ 輪替任何曾出現喺 commit 嘅秘密。
> - **為何「檔名難估」唔係一個 control**：security control 嘅定義係「一個即使攻擊者知道設計、都阻止到佢嘅機制」（唔可以靠 obscurity／保密路徑）。檔名難估只係「資訊唔公開」，一旦洩漏（例如 `.git` 洩漏、內部文件流出、或有人撞中），防線即刻崩塌；而且 wordlist 正正就係針對「可預測模式」。正確做法係**根本唔讓檔案可由 HTTP 觸及**（放 doc root 外 ＋ server 封鎖），而非靠名難估。原文亦把「give backup files random unguessable names」同「阻止 HTTP 抓取」並列，強調後兩者（存喺 doc root 外、封鎖 dotfile）先係根本。
> - 一句 **English 關鍵**："Security must not rely on the filename being hard to guess; backups should be stored outside the document root and blocked at the web server."
> - **常見錯答**：答「改名做隨機就安全」，但冇指出 obscurity **唔係** security control，亦冇提到「放喺 doc root 外 ＋ server 封鎖」呢個根本修法。

---

## 🎒 8. 考前 5 分鐘懶人包 ＋ 自測

### 8.1 必背關鍵數字／編號

| 項目 | 內容 |
|---|---|
| CWE | **CWE-530** — Exposure of Backup File to an Unauthorized Control Sphere |
| OWASP | **A05:2021 — Security Misconfiguration** |
| 命中判別 | **HTTP 200 = 存在可下載**；404 = 唔存在 |
| 本 lab 暴露路徑 | `/backup/config.php.bak`、`/backup/users_backup.sql`、`/backup/lab.db.bak`、`/backup/site_backup_20240720.zip`、`/backup/source.zip`、`/backup/.git/HEAD` |
| 目標技術棧 | PHP + Apache（`Server: Apache/…`、`X-Powered-By: PHP/…`） |
| 版本控制 metadata | `.git/`、`.svn/`、`.hg/` |

### 8.2 備份副檔名／模式對照表

| 類別 | 模式 |
|---|---|
| Editor temp | `.swp`、`~` |
| Renamed backup | `.bak`、`.old`、`.orig` |
| DB dump | `.sql` |
| Archive | `.zip`、`.tar.gz`、`.7z` |
| Dated archive | `site_backup_YYYYMMDD.zip` |
| Source-control | `.git`、`.svn`、`.hg` |
| IDE 資料夾 | `.idea`、`.vscode` |
| 其他敏感檔 | `.env`、`phpinfo.php` |

### 8.3 英文必背句

- "Backup artifacts left inside the web root — renamed configs, dumps, archives, and source-control metadata — are all reachable by anyone who guesses the predictable filenames."
- "Directory listing may be disabled, but a wordlist of common backup and version-control paths is usually enough to find them."
- "Fingerprint the stack first — Server headers, URL extensions, Wappalyzer — before building the wordlist."
- "Any HTTP 200 response means the file is directly downloadable."
- "Configuration secrets removed from the live code often survive in backups like this one."
- "The entire repository history can usually be reconstructed from exposed Git metadata."

### 8.4 自測 5 條

1. §9 對應邊個 CWE 同 OWASP 編號？
2. 為何要「先 fingerprint 技術棧、後撞檔」？
3. 撞檔時除咗 status code，仲要比較邊兩樣嘢？為何？
4. 一個暴露嘅 `.git` 比單一 config 備份值錢喺邊？
5. 點解「檔名好難估」唔可以當作一個 security control？

> 自測答案：1) CWE-530／OWASP A05:2021 Security Misconfiguration。2) 因為備份副檔名取決於技術棧，唔對應就會命中率極低。3) content type 同 body length —— 因為有「軟 404」（用 200 回錯誤頁），要三樣一齊比先準。4) 可以重構成個版本歷史，連 live 站已刪走嘅秘密都還原到。5) Security control 唔可以靠 obscurity；一旦檔名洩漏就崩塌，正確做法係放喺 document root 外 ＋ 喺 web server 封鎖。

### 8.5 5 條自測（快速核對表）

| # | 問題 | 答案關鍵字 |
|---|---|---|
| 1 | CWE／OWASP？ | CWE-530 / A05:2021 |
| 2 | 先做咩？ | fingerprint（先指紋後撞） |
| 3 | 三樣比較？ | status code / content-type / body length |
| 4 | `.git` 價值？ | 重構版本歷史（含已刪秘密） |
| 5 | 隨機檔名得唔得？ | 唔得，靠 obscurity 唔係 control |

---

## 🛡️ 9. 防守方修正清單（Defender Fix Checklist）

### 9.1 原文修法（§9 收錄）

- [ ] **備份同版本控制 metadata 放喺 document root 以外**（store backups outside the document root）。
- [ ] **加密敏感壓縮檔**（encrypt sensitive archives）。
- [ ] **畀備份檔隨機、難以猜測嘅名**（random unguessable names）。
- [ ] **由程式碼剝走秘密**：用環境注入 credentials；**輪替任何曾出現喺 commit 嘅秘密**（rotate any secret that ever appeared in a commit）。
- [ ] **喺 web server 封鎖或重新導向對 dotfile 嘅請求**（`.git/`、`.env`）。

### 9.2 教材外補充：具體修法（零經驗都做得到）

> ⚠️ 教材外補充：以下係一般業界做法，原文未逐項列出。

| 缺陷 | Apache 做法 | Nginx 做法 | PHP / 應用層做法 |
|---|---|---|---|
| `.git/`、`.env` 可讀 | 用 `<FilesMatch>` 或 `<Directory>` 封鎖 dotfile（回 403／404） | `location ~ /\.(?!well-known)` 回 404 | 部署時排除版本控制資料夾 |
| 備份檔落喺 doc root | 用 `DocumentRoot` 指向正確目錄，備份另存 doc root 外 | 同理，`root` 指向非備份目錄 | 備份腳本輸出到 doc root 外嘅路徑 |
| config 寫死秘密 | — | — | 秘密改用環境變數／secret manager，唔好 hardcode；`.env` 唔入 repo |
| 舊秘密殘留歷史 | — | — | 輪替（rotate）所有曾 commit 嘅秘密；敏感檔加入 `.gitignore` |
| 目錄列表 | `Options -Indexes` | `autoindex off;` | — |

**通用原則**：**「唔可以由 HTTP 觸及」> 「改名（obscurity）」**。改名只係 defence-in-depth 嘅一層，唔可以當唯一防線。

### 9.3 交叉引用

➜ 對應速記：ART_Final_CheatSheet.md
➜ §8 公開偵察（fingerprint 前期）：ART_T3_02_PublicRecon_StudyGuide.md
➜ §10 LFI 讀取備份檔：ART_T3_07_LateralFileAccess_StudyGuide.md
➜ §13 OAuth（原文本節掘到嘅 OAuth secret 用喺此）：ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md

---

> **本檔完** — 覆蓋原文 §9（PDF p.104–111）全部：導言、What is it and why does it work?、How to find it、Try it yourself（Step 1–8）、技術棧表、Worked example、Recap 表、Conclusion、How to fix、4 條 Student questions。
