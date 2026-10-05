# Advanced Red Team — Tutorial 3 術語表與應考速查（Glossary & Study Guide）

> **原教材**：Advanced Red Team — Tutorial 3（第三方英文教材 PDF）
> **本檔定位**：原教材喺 Aims / 前言承諾有 Glossary，但實際**並無呢一章**。本檔由本系列 8 份階段筆記（ART_T3_00 至 P6）嘅內容歸納而成，屬**教材外補充**，並非原文翻譯，亦唔係逐頁對譯。
> **覆蓋來源檔**：`ART_T3_00`（環境與工具／攻擊鏈）、`ART_T3_P1`（公開偵察）、`ART_T3_P2A`（初始存取：認證與自動化濫用）、`ART_T3_P2B`（初始存取：注入與 OAuth）、`ART_T3_P3`（權限提升）、`ART_T3_P4`（憑證蒐集）、`ART_T3_P5`（橫向檔案存取）、`ART_T3_P6`（主機淪陷）。

---

## 📖 點用呢份術語表（How to use）

- 每個術語列成四欄：**英文術語 | 繁體中文概念 | 一句話說明 | 出現喺邊份檔**。
- 每組表格之後附 `> **English Standard Definition:**` 英文標準句 —— 呢啲句式係考卷最想聽到嘅標準英文講法，背熟可即用。
- 全部**術語 100% 保留英文**；中文欄只作理解用，唔取代原文用詞。
- 第 **④ 組**係 CWE / OWASP 2031 對照總表 —— 考試最常考嘅「配對題」全在此。
- 文末有**易混淆對照**（每對寫「分別喺邊」＋一句考試答法）同 **🎒 5 分鐘術語自測**（15 題，答案喺最尾）。

> ⚠️ 本檔只收錄「出現過喺 8 份階段筆記」嘅術語；冇出現過嘅一律唔會杜撰。若日後原文／課程補充新術語，應加入相應組別並更新「出現喺邊份檔」欄。

---

## ① HTTP 與瀏覽器（HTTP & Browser Basics）

呢組係全條攻擊鏈嘅「共同語言」。任何漏洞手法，最終都係喺 HTTP request / response 上面做手腳。

| 英文術語 | 繁體中文概念 | 一句話說明 | 出現喺邊份檔 |
|---|---|---|---|
| HTTP request | HTTP 請求 | 瀏覽器（client）向伺服器發出嘅一段文字，含 method、path、header、body | P2A §3.1、P5 §3 |
| HTTP response | HTTP 回應 | 伺服器回覆嘅一段文字，含 status code、header、body | P2A §3.1、P5 §3 |
| HTTP method（`GET` / `POST`） | HTTP 方法 | `GET` 讀取資源、`POST` 提交資料；表單一般用 `POST` | P2A §3.3 |
| Request header | 請求頭 | request 開頭嘅「`名: 值`」metadata 行，例如 `User-Agent`、`Referer`、`X-Username` | P5 §3、§4.2 |
| Response header | 回應頭 | 伺服器回應嘅 metadata，例如 `Server`、`Content-Type`、`Set-Cookie`、`Location` | P4 §3.6、P5 §4.1 |
| `Content-Type` | 內容類型 | body 嘅格式，例如 `application/json`、`application/x-www-form-urlencoded`、`multipart/form-data` | P2B §3.1、P3 §3.5 |
| Body | 主體 | request / response 嘅實際內容（表單值、JSON、HTML） | P2A §3.3、P2B §3.1 |
| Query string | 查詢字串 | URL 中 `?` 之後嘅 `key=value` 參數，例如 `?lang=en`、`?id=1` | P3 §3.2、P5 §5.3 |
| Status code | 狀態碼 | 三位數字，總結伺服器點處理你嘅 request | P2A §3.2、P3 §3.3、P4 §3.4 |
| `200 OK` | 成功 | 資源存在並回傳；喺爆破／枚舉中通常代表「命中」 | P3 §3.3、P4 §4.7 |
| `302 Found` | 重新導向 | 路徑存在並導向另一位置（例如登入成功後跳主頁） | P3 §3.3、P2A §5.3 |
| `401 Unauthorized` | 未認證 | 需要登入／未提供有效認證 | P2B §3.12 |
| `403 Forbidden` | 拒絕存取 | 路徑**存在**但唔准你入（區分於 404） | P3 §3.3、P2A §5 |
| `404 Not Found` | 找不到 | 呢個路徑／檔案唔存在 | P3 §3.3、P4 §3.4 |
| Cookie | 識別資料（餅乾） | 伺服器交畀瀏覽器、之後每次請求都自動帶返嘅識別資料 | P2A §3.6、P1 §6.2 |
| Session | 會話 | 伺服器端記住「你係邊個」同你嘅狀態（登入、失敗次數） | P2A §3.6、P1 §6.2 |
| Session cookie（`PHPSESSID`） | 會話 cookie | 代表已登入身份嘅 cookie；偷到／複製到就等於你 | P3 §3.6、P5 §3 |
| `Set-Cookie` | 設定 cookie | response header，伺服器叫瀏覽器存低 cookie | P2B §3.11、P1 §6.2 |
| `Location` | 導向位址 | 302 / 301 response 中指示「去邊」嘅 header | P2B §3.11、P2A §5.3 |
| `view-source:` | 檢視原始碼 | 喺瀏覽器睇**未 render** 嘅 HTML / PHP 原文（「hidden 只係唔顯示，唔係秘密」） | P2A §5.1、P3 §6.5 |
| hidden field | 隱藏欄位 | `<input type="hidden">`，唔顯示但一樣會提交（例如 `captcha_answer`） | P2A §3.8、§4.1 |
| HTML comment | HTML 註釋 | `<!-- -->` 會原封不動送到瀏覽器，可能洩露答案（例如 `DEBUG`） | P2A §3.8、§5.1 |
| `multipart/form-data` | 多部分表單 | 帶檔案嘅表單格式，用 boundary 分隔每一格；普通表單用 urlencoded（只可帶文字） | P3 §3.5 |
| `application/x-www-form-urlencoded` | URL 編碼表單 | 以 `key=value` 逐格提交嘅表單格式，可被逐字重播 | P2A §3.3、P3 §3.5 |

> **English Standard Definition:** Every action in the browser is an HTTP request; the server answers with an HTTP response containing a status code and a body.
> **English Standard Definition:** A 302 tells you a path exists and redirects; a 403 means the path exists but you are denied; a 404 means the path does not exist.
> **English Standard Definition:** HTTP 200 means the requested resource exists and is being returned; HTTP 404 means it was not found.
> **English Standard Definition:** The session cookie is the server's memory of who you are; no cookie means a brand-new session.
> **English Standard Definition:** Hidden fields and HTML comments are still shipped to the browser; "hidden" only means not rendered, not secret.
> **English Standard Definition:** A file upload must use `multipart/form-data`; an ordinary urlencoded body can only carry text.
> **English Standard Definition:** A form posts key=value pairs in a URL-encoded body, which can be copied and replayed byte-for-byte.

### ①組 自測問答角度

- 「302、403、404 各自話你知咩？」→ 302 路徑存在且轉址；403 存在但被拒；404 唔存在。
- 「`view-source:` 同肉眼睇 render 出嚟嘅頁面有咩唔同？」→ 前者見到未 render 原始碼（hidden field、HTML comment 全部現形）。

---

## ② 代理與工具（Proxy & Tooling）

呢組對應 `ART_T3_00`（環境與工具）同各階段 walkthrough 反覆出現嘅工具介面詞。考試多數考「呢個 tab / 呢個功能係做乜」。

| 英文術語 | 繁體中文概念 | 一句話說明 | 出現喺邊份檔 |
|---|---|---|---|
| intercepting proxy | 攔截代理 | 坐喺瀏覽器同伺服器之間、可睇／暫停／改每條 request 同 response 嘅程式 | P2A §3.4、P0 §4.5 |
| Burp Suite | Burp Suite | 業界標準攔截代理，本課程主力工具 | P0 §4.5、P2A §4 |
| Intercept | 攔截 | Burp 開／熄「暫停每一條 request」嘅開關；開／熄時機係新手常見卡點 | P0 §6.4 |
| Repeater | 重播器 | 手動改一條 request 再重複發送 | P0 §4.6、P2A §3.5 |
| Intruder | 攻擊器 | 自動將同一條 request 發 N 次，配合 payload 清單 | P0 §4.7、P2A §3.5 |
| Positions | 位置分頁 | Intruder 分頁，用嚟標記 request 中邊啲位係 payload position（`§…§`） | P2A §5.3、§6 |
| payload position | 載荷位置 | request 中會被逐個 payload 取代嘅欄位（用 `§` 標記，例如 `username=§admin§`） | P2A §5.3、§6.3 |
| payload set | 載荷集合 | 餵去某一位置嘅一組清單；兩個位置就需要兩 set | P2A §5.3 |
| Clear § / Add § | 清除／加入標記 | Intruder 內先清走預設標記，再揀值加標記 | P0 §5.3、P2A §6 |
| attack type | 攻擊類型 | Intruder 嘅模式；本課 brute force 用 **Cluster bomb** | P2A §3.14、§6 |
| Sniper | 狙擊手（單位置） | 只有**一個** payload 位置（例如淨打密碼）時用嘅 attack type | P2A §6.3 |
| Cluster bomb | 集束炸彈（多組合） | 有**兩個** payload 位置時，試齊兩份清單嘅**所有組合** | P2A §3.14、§6 |
| Numbers payload | 數字載荷 | payload type 設為整數序列（例如由 `1` 到 `50`、step `1`） | P2A §5.2 |
| wordlist | 字典檔 | 一行一個候選字串嘅純文字檔，質素直接決定成敗 | P0 §5.3、P4 §3.3 |
| canary（canary value） | 金絲雀值 | 你獨有嘅標記字串，用嚟追蹤佢有冇出現喺 response，證明有反射／有 unkeyed input | P5 §3、§4.1 |
| Burp Collaborator | Collaborator | Burp 嘅外站服務，偵測目標伺服器有冇真係向外發 request（out-of-band 互動） | P5 §3、§4.4 |
| Param Miner | Param Miner | Burp 插件，用嚟掘隱藏 header / 參數同 unkeyed input | P5 §4.2 |
| Wappalyzer | Wappalyzer | 辨認目標技術棧（語言／框架／伺服器）嘅工具 | P4 §3.6 |
| Gobuster | Gobuster | 目錄／路徑爆破工具（`gobuster dir -u … -w …`） | P3 §3.8、§5.2 |
| ffuf | ffuf | 快速 web fuzzing／爆破工具 | P4 §3.2、§5.2 |
| curl | curl | 命令列工具，直接發 HTTP request、睇 raw response（含 header 同 binary） | P2A §3.7、P5 §3 |
| Python `requests` | Python requests | 用程式發 HTTP request，方便自動化大量猜測 | P2A §3.7 |
| Postman | Postman | 可以唔經瀏覽器、手寫 HTTP request 嘅 API client | P0 §6 |
| OWASP ZAP | OWASP ZAP | 另一款攔截代理／掃描工具（如 `Attack > Forced Browse Site`） | P0 §6、P4 §5.2 |
| netcat（`nc`） | netcat | 開監聽 port、接收任何連線，用嚟證明「伺服器真係有連過嚟」 | P5 §3、§4.4 |

> **English Standard Definition:** An intercepting proxy sits between the browser and the server so you can read and edit every request.
> **English Standard Definition:** Repeater lets you edit and resend a single request.
> **English Standard Definition:** Intruder automates many requests.
> **English Standard Definition:** Cluster bomb tries every combination of two payload sets — use it when username and password each need their own list.
> **English Standard Definition:** A wordlist is a plain-text file of candidate strings, one per line, that an enumeration tool tries in turn.
> **English Standard Definition:** A canary is a unique marker used to detect whether your input reaches the response.
> **English Standard Definition:** Burp Collaborator detects out-of-band interactions such as server-side fetches.
> **English Standard Definition:** `curl` sends HTTP requests from the command line and shows the raw response.

### ②組 自測問答角度

- 「兩個 payload 位置要用邊個 attack type？」→ **Cluster bomb**（一個位置用 Sniper）。
- 「Repeater 同 Intruder 最大分別？」→ Repeater 手動逐條改再送；Intruder 一條 request 自動送 N 次配 payload。
- 「canary 同 Collaborator 有咩唔同用途？」→ canary 證明**輸入有反射到 response**；Collaborator 證明**伺服器向外發 request**（out-of-band）。

---

## ③ 漏洞類型（Vulnerability Classes）

呢組係全份筆記嘅核心。每行都係一個「考題級」漏洞名 —— 記住英文全名，因為考卷用英文問。

| 英文術語 | 繁體中文概念 | 一句話說明 | 出現喺邊份檔 |
|---|---|---|---|
| IDOR（Insecure Direct Object Reference） | 不安全直接物件引用 | 用 `id=1` 呢類參數直接讀物件，但伺服器**冇檢查擁有權** | P1 §3.16、P3 §4.2 |
| BOLA（Broken Object Level Authorization） | 物件層授權失效 | IDOR 嘅業界別名（尤其 API 語境） | P3 §4.2 |
| broken access control | 存取控制失效 | 未驗證 role / 擁有權就放行；OWASP A01:2021 | P3 §4.5、P5 §4.3 |
| broken function-level authorization | 功能層授權失效 | 隱藏 admin 功能冇角色檢查（如 `admin/upload.php` 條件寫錯） | P3 §4.3 |
| unrestricted file upload | 無限制檔案上載 | 接受任何檔案型別，且放喺 web root 會被當 PHP 執行 | P3 §4.4、§4.8 |
| RCE（Remote Code Execution） | 遠端程式碼執行 | 攻擊者令伺服器執行自己提供嘅程式碼 | P3 §3.9、§4.8 |
| web shell | 網頁後門 | 放喺伺服器、收 HTTP request 就執行指令嘅後門程式 | P3 §3.9、P6 §6.1 |
| SQL injection（SQLi） | SQL 注入 | 未信任輸入直接拼入 SQL 字串，被當成查詢語法 | P2B §4、§7.1 |
| blind SQL injection | 盲注 | 睇唔到查詢結果，只能靠 true / false 回應差異逐位抽資料 | P2B §4.1、§7.1 |
| boolean-based blind SQLi | 布林盲注 | 送兩個只差一個 true / false 條件嘅 request 去問是非題 | P2B §4.1、§7.1 |
| tautology（`' OR 1=1--`） | 恆真式 | 令 WHERE 條件永遠成立嘅經典注入 payload | P2B §3.4、§4.1 |
| NoSQL operator injection | NoSQL 運算子注入 | 用 `$ne`、`$where` 等 operator 取代值，令輸入變成查詢邏輯 | P2B §12、§7.2 |
| JSON wildcard（`{"role":"*"}`） | JSON 萬用字元 | 令查詢回傳全部文件嘅 NoSQL payload | P2B §12 |
| XSS（Cross-Site Scripting） | 跨站腳本 | 把可執行 JavaScript 注入其他人睇到嘅網頁 | P5 §4.2 |
| reflected XSS | 反射型 XSS | 伺服器**即時**把輸入回彈，冇編碼、冇 sanitization | P5 §4.2、§3 |
| stored XSS | 儲存型 XSS | payload 存喺伺服器，之後每個訪客都中 | P5 §3、§4.2 |
| DOM-based XSS | DOM 型 XSS | payload 完全由客戶端 JavaScript 處理 | P5 §3、§4.2 |
| LFI（Local File Inclusion） | 本地檔案包含 | 應用基於用戶輸入載入本機檔案，`../` 可爬出預定目錄 | P5 §4.3、P6 §3.4 |
| RFI（Remote File Inclusion） | 遠端檔案包含 | LFI 嘅變種，被包含嘅檔案係由**外部 URL** 載入 | P5 §4.3 |
| path traversal / directory traversal | 路徑遍歷 | 用 `../` 序列逃出預定目錄、讀任意檔案 | P5 §3、§4.3 |
| SSRF（Server-Side Request Forgery） | 伺服器端請求偽造 | 應用代你 fetch 你畀嘅 URL，繼承伺服器嘅網絡位置同信任級別 | P5 §4.4 |
| web cache poisoning | 網頁快取污染 | 令快取存起一個毒 response，再派畀之後同 cache key 嘅訪客 | P5 §4.1 |
| unkeyed input | 未納入快取鍵嘅輸入 | 會改變 response 但唔計入 cache key 嘅輸入（攻擊根基） | P5 §3、§4.1 |
| cache key | 快取鍵 | cache 判斷「兩條 request 係否共用一份存貨」嘅依據 | P5 §3、§4.1 |
| CAPTCHA bypass | 驗證碼繞過 | 伺服器信任前端資料／答案外洩，令 CAPTCHA 形同虛設 | P2A §4.1、§5.1 |
| email bomb | 電郵轟炸 | 濫用應用嘅寄信功能灌爆目標信箱（MITRE T1667） | P2A §4.2、§5.2 |
| delimiter injection | 分隔符注入 | 用 `;` / `,` / 換行令一格欄位塞入多個值（多個收件人） | P2A §3.11、§4.2 |
| brute force | 暴力破解 | 系統性猜憑證，直到搵到正確嘅一對 | P2A §4.3、P4 §3.2 |
| rate limiting | 速率限制 | 限制同一來源一段時間內可做幾多次同類操作（須 per account + per IP） | P2A §3.10、§4.3 |
| account lockout | 帳號鎖定 | 失敗 N 次（本 lab 為 5 次）後暫停；若綁 session cookie 即可輪換繞過 | P2A §4.3、§6.3 |
| username enumeration | 用戶名列舉 | 由回覆差異（如 `Username not found.` vs `Password incorrect.`）推斷邊啲帳號存在 | P1 §3.15、P2A §3.12 |
| OAuth / SSO misconfiguration | OAuth／單一登入配置錯誤 | `redirect_uri` 冇嚴格 allow-list，令授權 code 可以被送去攻擊者 | P2B §13、§7.3 |
| open redirect | 開放轉址 | 應用接受任意 URL 作 redirect 目標，可被串連利用 | P2B §13.3、P5 §4.1 |
| CRLF / delimiter abuse | 分隔符濫用 | 用換行等分隔符把一格值切開成多個值（見 delimiter injection） | P2A §3.11 |

> **English Standard Definition:** An Insecure Direct Object Reference (IDOR) — also known as Broken Object Level Authorization (BOLA) — occurs when an application exposes a direct reference to an internal object, such as a database record ID, a filename, or an account number, and uses that user-supplied identifier to fetch the object without performing a server-side ownership or permission check.
> **English Standard Definition:** SQL injection occurs when an application builds a database query by concatenating untrusted input directly into the SQL string.
> **English Standard Definition:** NoSQL injection is simply SQL injection translated into JSON: untrusted input becomes query logic instead of a data value.
> **English Standard Definition:** XSS is CWE-79: Improper Neutralization of Input During Web Page Generation — an application includes untrusted data in a web page without proper encoding or validation, so the browser executes attacker-supplied script in the site's security context.
> **English Standard Definition:** Local File Inclusion (LFI) occurs when an application loads a file based on user-supplied input without proper validation, allowing directory traversal sequences such as `../` to escape the intended directory.
> **English Standard Definition:** Server-Side Request Forgery (SSRF) occurs when an application accepts a URL from the user and then fetches that URL from the server — because the request originates from the server, it inherits the server's network position and level of trust.
> **English Standard Definition:** Web cache poisoning tricks the cache into storing a harmful response and serving it to other users who request the same URL; the attack exploits a mismatch where the response depends on an input that is not part of the cache key, called an unkeyed input.
> **English Standard Definition:** Brute-forcing is the systematic guessing of credentials until the correct pair is found.
> **English Standard Definition:** A CAPTCHA is a challenge-response test meant to distinguish legitimate users from automated scripts; its value depends entirely on server-side enforcement.
> **English Standard Definition:** An email bomb abuses an application's outbound resource-consuming function to flood a target or exhaust resources.

### ③組 自測問答角度

- 「SQLi 同 blind SQLi 分別？」→ 前者可直接由輸出／錯誤看到結果；後者睇唔到，只能靠 true / false 差異逐位抽。
- 「XSS 三種型？」→ reflected（即時回彈）、stored（存喺伺服器）、DOM-based（前端 JS 處理）。
- 「SSRF 為何危險？」→ request 由伺服器發出，繼承伺服器網絡位置，可觸及內部服務同雲端 metadata。

---

## ④ CWE / OWASP 對照表（CWE ↔ OWASP Top 10 2021）

呢張表係「配對題」命脈：**每個弱點編號 ↔ 名稱 ↔ 出現喺邊節 ↔ OWASP 2021 分類**。CWE 名稱一律保留英文（考卷用原文）。

### 4.1 逐個 CWE 編號對照

| CWE 編號 | 弱點名稱（英文） | 出現喺邊節 | OWASP Top 10 2021 對應 |
|---|---|---|---|
| **CWE-79** | Improper Neutralization of Input During Web Page Generation | §7 Reflected XSS via HTTP Header（P5） | **A03:2021 — Injection**（Cross-Site Scripting） |
| **CWE-22** | Improper Limitation of a Pathname to a Restricted Directory | §10 LFI via Language Loader（P5） | **A01:2021 — Broken Access Control** |
| **CWE-918** | Server-Side Request Forgery (SSRF) | §14 SSRF（P5） | **A10:2021 — Server-Side Request Forgery** |
| **CWE-89** | Improper Neutralization of Special Elements used in an SQL Command | §4 SQL Injection in a JSON Object（P2B） | **A03:2021 — Injection** |
| **CWE-943** | Improper Neutralization of Special Elements in Data Query Logic | §12 NoSQL Injection via JSON Wildcard（P2B） | **A03:2021 — Injection** |
| **CWE-346** | Origin Validation Error | §13 OAuth / SSO Misconfiguration（P2B） | **A07:2021 — Identification and Authentication Failures** ＋ OWASP API Top 10 **API2 — Broken Authentication** |
| **CWE-285** | Improper Authorization | §3 Privilege Escalation（P3） | **A01:2021 — Broken Access Control** |
| **CWE-639** | Authorization Bypass Through User-Controlled Key | §3 IDOR / BOLA（P3） | **A01:2021 — Broken Access Control** |
| **CWE-434** | Unrestricted Upload of File with Dangerous Type | §3 upload → RCE（P3） | **A01:2021** ／ **A04:2021 — Insecure Design** |
| **CWE-307** | Improper Restriction of Excessive Authentication Attempts | §6 Unlimited Brute Force（P2A） | **A07:2021 — Identification and Authentication Failures** |
| **CWE-602** | Client-Side Enforcement of Server-Side Security | §1 CAPTCHA Bypass（P2A） | **A08:2021 — Software and Data Integrity Failures** |
| **CWE-603** | Use of Client-Side Authentication | §1 CAPTCHA Bypass（P2A） | **A08:2021 — Software and Data Integrity Failures** |
| **CWE-530** | Exposure of Backup File to an Unauthorized Control Sphere | §9 Backup File Brute Force（P4） | **A05:2021 — Security Misconfiguration** |

> **English Standard Definition:** SQL injection is classified as CWE-89: Improper Neutralization of Special Elements used in an SQL Command.
> **English Standard Definition:** The relevant weakness in an unsafe OAuth redirect_uri is CWE-346 (Origin Validation Error).
> **English Standard Definition:** CWE-285 (Improper Authorization) covers endpoints that do not verify role or permission, CWE-639 (Authorization Bypass Through User-Controlled Key) covers IDOR/BOLA vulnerabilities, and CWE-434 (Unrestricted Upload of File with Dangerous Type) covers uploads that allow executable content.
> **English Standard Definition:** The brute-force exposure is CWE-307, Improper Restriction of Excessive Authentication Attempts.
> **English Standard Definition:** Backup-file exposure is classified as CWE-530: Exposure of Backup File to an Unauthorized Control Sphere, mapped to OWASP A05:2021 — Security Misconfiguration.

### 4.2 OWASP Top 10 2021 分類總表（本教材出現過嘅類別）

| OWASP 編號 | 類別名稱（英文） | 出現喺邊節 |
|---|---|---|
| **A01:2021** | Broken Access Control | IDOR / BOLA、broken function-level authorization、path traversal / LFI（P1、P3、P5） |
| **A03:2021** | Injection（含 Cross-Site Scripting） | SQLi §4、NoSQLi §12（P2B）、Reflected XSS §7（P5） |
| **A04:2021** | Insecure Design | Unrestricted file upload（P3） |
| **A05:2021** | Security Misconfiguration | Backup file exposure §9（P4）、Web Cache Poisoning §5（P5） |
| **A07:2021** | Identification and Authentication Failures | Unlimited Brute Force §6（P2A）、OAuth misconfiguration §13（P2B）、Host Compromise 弱認證（P6） |
| **A08:2021** | Software and Data Integrity Failures | CAPTCHA Bypass（信任前端驗證）§1（P2A） |
| **A10:2021** | Server-Side Request Forgery | SSRF §14（P5） |
| **OWASP API2** | Broken Authentication（API Top 10） | OAuth / SSO misconfiguration §13（P2B） |

> ⚠️ 記憶重點：本教材**冇出現過** A02、A06、A09；唔好硬塞。CWE 亦只出現上面 13 個編號。

### 4.3 出現喺邊節 — 逆向速查（按階段）

| 階段 | 節 | 核心 CWE / OWASP |
|---|---|---|
| P2A | §1 CAPTCHA Bypass | CWE-602、CWE-603 ／ A08:2021 |
| P2A | §2 Email Bomb | OWASP A05:2021 ＋ A07:2021；MITRE ATT&CK **T1667** |
| P2A | §6 Unlimited Brute Force | CWE-307 ／ A07:2021 |
| P2B | §4 SQL Injection in a JSON Object | CWE-89 ／ A03:2021 |
| P2B | §12 NoSQL Injection via JSON Wildcard | CWE-943 ／ A03:2021 |
| P2B | §13 OAuth / SSO Misconfiguration | CWE-346 ／ A07:2021 ＋ API2 |
| P3 | §3 Privilege Escalation | CWE-285、CWE-639、CWE-434 ／ A01:2021、A04:2021 |
| P4 | §9 Backup File Brute Force | CWE-530 ／ A05:2021 |
| P5 | §5 Web Cache Poisoning | （原文未列 CWE）／ A05:2021 |
| P5 | §7 Reflected XSS via HTTP Header | CWE-79 ／ A03:2021 |
| P5 | §10 LFI via Language Loader | CWE-22 ／ A01:2021 |
| P5 | §14 Server-Side Request Forgery | CWE-918 ／ A10:2021 |
| P6 | §11 Host Compromise via Internal Hints | OWASP A07:2021（原文有寫；CWE 原文未列，屬補充待查證） |

> **English Standard Definition:** Map the vulnerabilities to OWASP A01:2021 / A04:2021 and CWE-285 / CWE-639 / CWE-434.
> **English Standard Definition:** Map the exposure to CWE-530 and OWASP A05:2021 (Security Misconfiguration).

---

## ⑤ 憑證與檔案（Credentials & Files）

呢組橫跨 P1（憑證由何而來）、P4（備份檔）、P6（主機檔案）。核心主線：**一半憑證 ＋ 一個可預測檔名 = 入侵入口**。

| 英文術語 | 繁體中文概念 | 一句話說明 | 出現喺邊份檔 |
|---|---|---|---|
| stealer log | 竊取日誌 | 惡意程式由中毒電腦偷到嘅瀏覽器已存密碼記錄（`host:port:username:password` 格式） | P1 §3.9、§4.3 |
| infostealer | 資訊竊取程式 | 例如 RedLine、Vidar、Raccoon，靜靜 dump 已存瀏覽器憑證 | P1 §3.9 |
| combo list | 合併憑證清單 | 由多份 stealer log 合成嘅巨型 `username:password` 檔 | P1 §3.10 |
| credential pair | 憑證對 | 一組完整嘅帳號＋密碼（例：`admin:123qwe!@#`） | P1 §3.5 |
| credential stuffing | 憑證填充 | 用已知帳密對去大量網站試登入，食「密碼重用」 | P1 §3.6 |
| password spraying | 密碼噴灑 | 用少量常見密碼去試大量已知 username，避開鎖帳 | P1 §3.7 |
| credential discovery | 憑證蒐集 | 攻擊鏈第④階段：由備份、dump、`.git` 掘出可用憑證 | P4 §4.1 |
| backup file brute force | 備份檔爆破 | 用一份 wordlist 逐個可預測檔名去撞 | P4 §4.1、§4.4 |
| `.bak` / `.old` / `.orig` | 改名備份副檔名 | 唔會被 PHP 執行，server 當普通文字檔原樣送出，原始碼／密碼洩露 | P4 §4.5、§6.1 |
| `~` / `.swp` | 編輯器暫存檔 | 編輯器留低嘅暫存備份，同樣可被下載 | P4 §4.5 |
| `.sql` | 資料庫 dump 副檔名 | 整個資料庫匯出，可能逐個帳號連明文密碼 | P4 §4.5、§4.9 |
| `.zip` / `.tar.gz` / `.7z` | 壓縮檔備份 | 帶日期命名（`site_backup_YYYYMMDD.zip`）亦屬可預測 | P4 §4.5 |
| `.git` / `.svn` / `.hg` | 版本控制中繼資料 | 若跟站台一齊上 production，等於公開全部原始碼同每個舊版本 | P4 §3.7、§4.10 |
| source-control metadata | 版本控制中繼資料 | 同上；由 `.git/HEAD` 可重構整個版本歷史 | P4 §4.5、§4.10 |
| web root / document root | 網站根目錄 | web server 對外服務嘅資料夾；放入去嘅檔案，只要檔名啱就任人抓 | P4 §3.1、P3 §3.7 |
| config file / secret | 設定檔／秘密 | `config.php` 等常存 DB 帳密、API key、OAuth secret（寫死 hardcode） | P4 §3.8、§4.8 |
| DB dump | 資料庫傾印 | 整個資料庫匯出檔；可能含 `INSERT INTO users` ＋ 明文密碼或弱 hash | P4 §4.9 |
| forced browsing | 強制瀏覽 | 唔靠站內連結，直接打 URL 撞路徑／檔名 | P4 §3.5 |
| tech stack fingerprint | 技術棧指紋識別 | 由 header（`Server`、`X-Powered-By`）、副檔名辨認語言框架伺服器 | P4 §3.6 |
| allow-list | 白名單 | 只准「已批准」嘅項（安全）；OAuth `redirect_uri` 標準做法 | P2B §4、P5 §4.3 |
| deny-list | 黑名單 | 只封「已知壞」嘅項，易被改語法繞過（最多係減速帶） | P2B §4.1、P5 §4.3 |
| SUID | Set Owner User ID | Linux 權限位；執行時以檔案擁有者（常為 root）身份運行 | P6 §3.6 |
| `/etc/passwd` | 帳號清單檔 | Linux 帳號清單，每行 `用戶名:x:UID:GID:…`，UID 0 = root；LFI 經典 PoC | P6 §3.9、P5 §4.3 |
| `www-data` | web server 帳號 | Linux 上 web server（Apache / Nginx）跑站嘅低權限帳號 | P6 §3.3 |
| keyboard-walk password | 鍵盤漫步密碼 | 手指沿相鄰鍵打嘅密碼（如 `123qwe!@#`），表面符合複雜度但極易被猜 | P6 §3.5、§4.2 |

> **English Standard Definition:** Infostealer malware (RedLine, Vidar, Raccoon) silently dumps saved browser credentials from infected machines, and those logs are sold and traded as huge combo lists.
> **English Standard Definition:** A credential pair is a complete username-and-password combination.
> **English Standard Definition:** Credential stuffing replays known username-password pairs against many sites, exploiting password reuse.
> **English Standard Definition:** Password spraying tries a few common passwords against many known usernames.
> **English Standard Definition:** Backup artifacts left inside the web root — renamed configs, dumps, archives, and source-control metadata — are all reachable by anyone who guesses the predictable filenames.
> **English Standard Definition:** Best practice is to store backups outside the document root, encrypt sensitive archives, and ensure source-control folders are not deployed.
> **English Standard Definition:** A web shell is a backdoor that turns an HTTP request into a command executed on the server.
> **English Standard Definition:** A keyboard-walk password is a password formed by walking along adjacent keys, e.g. `123qwe!@#`.

### ⑤組 自測問答角度

- 「stealer log、combo list、credential pair 三者關係？」→ stealer log 係單一竊取記錄；combo list 係多份 log 合併嘅帳密大檔；credential pair 係其中一組帳號＋密碼。
- 「`.bak` 為何比 `.php` 更危險？」→ `.php` 會被執行成 HTML 唔見原文；`.bak` 唔執行，原樣送出原始碼同密碼。
- 「allow-list 為何勝過 deny-list？」→ deny-list 只封已知壞項，改語法即可繞；allow-list 只准已批准項，保證性強。

---

## ⑥ 一般安全概念（General Security Concepts）

呢組係「串起成條攻擊鏈」嘅大局詞。答長題（essay）時用嚟開場同收尾，展示你唔止識工具，仲識全局。

| 英文術語 | 繁體中文概念 | 一句話說明 | 出現喺邊份檔 |
|---|---|---|---|
| threat model | 威脅模型 | 界定攻擊者能力／動機、資產價值同信任邊界嘅思考框架 | P2B §7.2 |
| attack chain | 攻擊鏈 | 由偵察到淪陷嘅階段串連 | P0 §4.2 |
| attack surface | 攻擊面 | 所有可被攻擊嘅入口、端點同 object reference | P1 §4.4、P2B §6 |
| recon（public recon） | 偵察（公開偵察） | 由公開來源收集情報，為後續階段鋪路 | P1 §4.1、§4.2 |
| OSINT（Open-Source Intelligence） | 公開來源情報 | 由任何人都合法睇得到嘅來源收集情報 | P1 §3.1、§4.1 |
| initial access | 初始存取 | 攻擊者第一個據點；注入（SQL / NoSQL）同認證協議配置錯誤（OAuth / SSO）係經典途徑 | P2A §4.1、P2B §4 |
| foothold | 立足點 | 最初嘅低權限落腳點（例如 web server 嘅 `www-data`） | P6 §3.1 |
| privilege escalation（privesc） | 權限提升 | 由低權限帳號升到高權限（root / administrator） | P3 §4.1、P6 §3.2 |
| vertical privilege escalation | 垂直權限提升 | 普通用戶做管理員／伺服器級動作 | P3 §4.1 |
| horizontal privilege escalation | 橫向權限提升 | 一個用戶存取另一個用戶嘅資料 | P3 §4.1 |
| lateral movement | 橫向移動 | 用偷到嘅 secrets／憑證去認證其他內部系統 | P5 §7.4 |
| host compromise | 主機淪陷 | 攻擊鏈終點：由 web 據點取得主機層控制 | P6 §4.1 |
| principle of least privilege | 最小權限原則 | 每個帳號／服務只俾「做嘢所需最少」嘅權限 | P6 §9.1 |
| defence in depth | 縱深防禦 | 多層防禦並存，一層失效仍有下一層頂住 | P5 §5.3（原始碼註解） |
| security by obscurity | 靠隱蔽做安全 | 靠「冇人知」而唔係真正控制；一旦檔名／路徑洩漏就崩塌 | P4 §6.3、§8.4 |
| authentication vs authorization | 認證 vs 授權 | 認證＝證明你係邊個；授權＝檢查你准做啲乜 | P3 §3.1 |
| out-of-band（OOB）interaction | 帶外互動 | 目標伺服器主動向攻擊者控制嘅主機發連線（Collaborator 偵測嘅對象） | P5 §3、§4.4 |
| MITRE ATT&CK | ATT&CK 知識庫 | 公開嘅攻擊者戰術／技術知識庫，每個技術有編號（如 T1667） | P1 §3.13、P2A §4.2 |

> **English Standard Definition:** The capstone chain: public recon → initial access → privilege escalation → credential discovery → lateral file access → host compromise.
> **English Standard Definition:** Privilege escalation occurs when a user can perform actions or access resources beyond their authorized role. The most common root cause is confusing authentication (proving who you are) with authorization (checking what you are allowed to do).
> **English Standard Definition:** Vertical privilege escalation lets a normal user perform administrative or server-level actions. Horizontal privilege escalation lets one user access another user's data.
> **English Standard Definition:** Least privilege means each account or service only gets the minimum access required to do its job.
> **English Standard Definition:** Client-side controls can always be bypassed or replayed; only server-side checks can enforce security.
> **English Standard Definition:** OSINT is information gathered from publicly available sources.

### ⑥組 自測問答角度

- 「attack chain 六階段次序？」→ public recon → initial access → privilege escalation → credential discovery → lateral file access → host compromise。
- 「least privilege 同 defence in depth 分別？」→ 前者講「只俾最少權限」（做減法）；後者講「多層防堵」（做加法／冗餘）。
- 「security by obscurity 為何唔算控制？」→ 佢只靠「冇人知」，唔係真正驗證；檔名一洩漏就完全崩塌。

---

## 🔀 易混淆對照（Confusable Pairs）

每一對寫「**分別喺邊**」＋「**一句考試答法**」。呢批係選擇題同短答最常設嘅陷阱。

### 1. IDOR vs Broken Access Control

| | IDOR | Broken Access Control |
|---|---|---|
| 關係 | 係 **Broken Access Control 嘅一個子類** | 係**大類**（OWASP A01:2021） |
| 核心 | 用**可控物件識別碼**（`id=`、`file=`）越權讀物件 | 任何「未驗證 role／擁有權就放行」嘅情況 |
| CWE | CWE-639（Authorization Bypass Through User-Controlled Key） | CWE-285（Improper Authorization）＋ CWE-639 |
| 例子 | `/message.php?id=2` 改成 `id=1` 睇到 admin 訊息 | 隱藏 `/admin/upload.php` 冇角色檢查、LFI、path traversal |

> **考試答法**：IDOR is a specific type of broken access control where a user-controlled object key is used without an ownership check (CWE-639); broken access control is the broader class (A01:2021) that also covers missing role checks (CWE-285).

### 2. XSS vs CSRF

| | XSS | CSRF |
|---|---|---|
| 攻擊目標 | 令**受害頁面執行攻擊者嘅 script** | 令**受害瀏覽器喺已登入狀態下代攻擊者發請求** |
| 信任被濫用 | 用戶對**網站**嘅信任 | 網站對**用戶瀏覽器**嘅信任（cookie 自動帶上） |
| 本教材出現處 | §7 Reflected XSS via HTTP Header（P5） | OAuth `state` 參數就係用嚟做 CSRF 防禦（P2B §3.9、§13） |
| 修法 | 輸出編碼、CSP、`HttpOnly` | per-session 隨機 `state`、SameSite cookie |

> **考試答法**：XSS injects script that runs in the victim's browser with the site's privileges (CWE-79); CSRF makes the victim's browser send an authenticated request without their intent — in OAuth, the `state` parameter is the built-in CSRF defense.

### 3. LFI vs RFI

| | LFI | RFI |
|---|---|---|
| 檔案來源 | **本機**檔案系統（伺服器上已有嘅檔） | **外部 URL**（攻擊者伺服器上嘅檔） |
| 觸發條件 | 輸入被拼入檔案路徑 | PHP `allow_url_include` 開啟 ＋ 輸入可控制 URL |
| CWE / OWASP | CWE-22 ／ A01:2021 | 同屬包含漏洞家族（本 lab 只示範 LFI） |
| 升級路徑 | log poisoning、session file、`php://filter`、`phar://` 升到 RCE | 直接包含攻擊者嘅 web shell |

> **考試答法**：LFI loads a file that already exists on the server (CWE-22); RFI is the sibling variant that loads a file from an attacker-controlled remote URL, and LFI can often be escalated to RCE via log poisoning, session files, or PHP wrappers.

### 4. SQL Injection vs NoSQL Injection

| | SQLi | NoSQLi |
|---|---|---|
| 目標 | 關聯式資料庫（MySQL 等）嘅 SQL 字串 | NoSQL（MongoDB）嘅 operator-based 查詢物件 |
| 注入外形 | 單引號、`UNION`、`' OR 1=1--` | `{"$ne":""}`、`{"$where":…}`、`{"role":"*"}` |
| CWE | CWE-89 | CWE-943 |
| 根因（相同） | 未信任輸入變成**查詢語法** | 未信任輸入變成**查詢邏輯**（operator） |

> **考試答法**：Both are the same root cause — untrusted input becomes query logic instead of a data value; SQLi concatenates into SQL (CWE-89) while NoSQLi smuggles operators such as `$ne` into a JSON query object (CWE-943). The canonical fix for both is parameterized queries / type checking / key allow-listing.

### 5. SSRF vs Open Redirect

| | SSRF | Open Redirect |
|---|---|---|
| 誰發 request | **伺服器**代你 fetch URL | **受害者瀏覽器**被導向攻擊者選定 URL |
| 濫用嘅嘢 | 伺服器嘅網絡位置同信任 | 用戶對該網站域名嘅信任 |
| CWE / OWASP | CWE-918 ／ A10:2021 | 常連同 OAuth `redirect_uri` 缺失出現（P2B §13.3） |
| 串連 | 讀內部服務、雲端 metadata（`169.254.169.254`） | 把受害人或授權 code 引去攻擊者站 |

> **考試答法**：SSRF makes the server fetch a user-supplied URL and inherit its network position (CWE-918); open redirect only bounces the victim's browser to an attacker-chosen URL. In an OAuth flow a loose redirect_uri can turn an open redirect into a code-leak that ends in account takeover.

### 6. Web Cache Poisoning vs XSS

| | Web Cache Poisoning | XSS |
|---|---|---|
| 核心機制 | 污染 **cache**，令毒 response 派畀之後同 key 嘅訪客 | 注入 **script** 令瀏覽器執行 |
| 影響範圍 | **乘數級**：一條 request 影響大量用戶 | 視乎型別，通常逐個用戶中 |
| 關係 | cache poisoning 係**放大器／載體**，最終可以係反射／儲存 XSS | 係**攻擊類別**本身（CWE-79） |
| 必要條件 | 存在 **unkeyed input** ＋ 回應被 cache 存起 | 輸入未編碼就輸出到頁面 |

> **考試答法**：Cache poisoning is a delivery/amplification mechanism — one request poisons a cache entry served to thousands; the poisoned response can itself carry reflected or stored XSS, open redirects or malicious script imports.

### 7. Authentication vs Authorization

| | Authentication | Authorization |
|---|---|---|
| 問題 | 「你係邊個？」 | 「你准做啲乜？」 |
| 失敗後果 | 未認證（401） | 已認證但越權（403 本應如此，卻放行 = A01） |
| 本教材關係 | P3 §3.1 明言「混淆兩者係多數權限提升漏洞嘅根因」 | IDOR、broken function-level authorization 都係授權失效 |
| OWASP | A07:2021 | A01:2021 |

> **考試答法**：Authentication proves who you are; authorization checks what you are allowed to do. Confusing the two is the root cause of most privilege-escalation bugs — a request is often authenticated but never authorized.

> **English Standard Definition:** Authentication proves who you are; authorization checks what you are allowed to do. Confusing the two is the root cause of most privilege-escalation bugs.
> **English Standard Definition:** Cache poisoning and XSS are not rivals: the former is the delivery mechanism (multiplicative, cross-user), the latter is the payload class.

---

## 🎒 5 分鐘術語自測（15 題）

> 規則：先自己答，答案喺本節最尾。填空題只需寫關鍵英文術語。

1. 填空：伺服器端記住你身份同狀態嘅機制叫 ________；代表已登入身份嘅 cookie 通常叫 session cookie（PHP 叫 `PHPSESSID`）。
2. 定義題：寫出 **IDOR** 嘅英文全名，並用一句講佢為何係「授權」問題而唔係「認證」問題。
3. 配對題：將下列 CWE 配去正確節：`CWE-89`、`CWE-943`、`CWE-79`、`CWE-22`、`CWE-918`、`CWE-530`。
4. 分辨題：**LFI** 同 **RFI** 最大分別喺邊？各舉一個字。
5. 填空：Burp Intruder 入面，兩個 payload 位置要揀嘅 attack type 係 ________；一個位置就多數用 ________。
6. 定義題：用一句解釋 **unkeyed input**，並講佢喺 web cache poisoning 嘅角色。
7. 分辨題：**XSS** 同 **CSRF** 各自濫用邊一方嘅信任？
8. 填空：SQLi 對應 OWASP 2021 嘅 ________；SSRF 對應 ________。
9. 定義題：寫出 **stealer log** 同 **combo list** 嘅分別（一句）。
10. 分辨題：**allow-list** 為何勝過 **deny-list**？用一句答。
11. 填空：`CWE-307` 嘅英文名係 Improper Restriction of ________；對應 OWASP ________。
12. 定義題：用一句解釋 **SSRF** 為何比一般「代發 request」危險（提示：網絡位置／信任）。
13. 分辨題：**vertical** 同 **horizontal** privilege escalation 分別喺邊？
14. 填空：Linux 上 web server 跑站嘅低權限帳號叫 ________；`/etc/passwd` 入面 UID `0` 代表帳號 ________。
15. 定義題：**security by obscurity** 為何唔算有效控制？舉一個本教材嘅具體情境。

### ✅ 自測答案（先自己答，再對）

1. **session**（session cookie = 代表已登入身份嘅 cookie，例如 `PHPSESSID`）。
2. **Insecure Direct Object Reference**（別名 BOLA）。佢係「授權」問題，因為用戶**已經通過認證**（真係登入咗），只係伺服器冇檢查「呢件物件係否屬於佢」就放行 → 屬 CWE-639 / A01。
3. `CWE-89` → §4 SQL Injection in a JSON Object（P2B）；`CWE-943` → §12 NoSQL Injection（P2B）；`CWE-79` → §7 Reflected XSS via HTTP Header（P5）；`CWE-22` → §10 LFI via Language Loader（P5）；`CWE-918` → §14 SSRF（P5）；`CWE-530` → §9 Backup File Brute Force（P4）。
4. LFI 載入**本機既有檔案**（CWE-22）；RFI 載入**外部 URL** 上嘅檔（需 `allow_url_include`）。
5. **Cluster bomb**；一個位置多數用 **Sniper**。
6. Unkeyed input ＝ 會改變 response、但**唔計入 cache key** 嘅輸入；因為佢唔喺 cache key 內，cache 會把「由佢決定嘅毒 response」存低，再派畀之後同 key 嘅訪客 → 呢個就係 cache poisoning 嘅根基。
7. XSS 濫用**用戶對網站**嘅信任（script 以網站 origin 執行）；CSRF 濫用**網站對用戶瀏覽器**嘅信任（cookie 自動帶上）。
8. SQLi → **A03:2021（Injection）**；SSRF → **A10:2021（Server-Side Request Forgery）**。
9. stealer log 係**單一**由中毒電腦偷到嘅憑證記錄；combo list 係由**多份** stealer log 合併而成嘅巨型 `username:password` 檔。
10. deny-list 只封「已知壞」嘅項，攻擊者改語法（編碼、大小寫、`....//` 等）即可繞過；allow-list 只准「已批准」嘅項，保證性強（OAuth `redirect_uri` 嘅標準做法）。
11. **Excessive Authentication Attempts**；OWASP **A07:2021 — Identification and Authentication Failures**。
12. 因為 request 由**伺服器**發出，會繼承伺服器嘅網絡位置同信任級別 → 可觸及內部服務、雲端 metadata（`169.254.169.254`）、唔對外開放嘅 admin interface。
13. vertical ＝ 低權限用戶做**管理員／伺服器級**動作（升級層級）；horizontal ＝ 一個用戶存取**另一個用戶**嘅資料（同層越權）。
14. `www-data`；UID `0` = **root**。
15. 因為佢只靠「冇人知」（例如「冇 link 指去備份檔」），唔係真正嘅驗證或授權控制；一旦檔名／路徑洩漏（wordlist 撞中、或被枚舉），整個防線即刻崩塌。本教材情境：備份檔（`config.php.bak`）留喺 web root，開發者以為「冇 link 就冇人搵到」。



---

## 🧭 一頁式記憶地圖（Quick Recall）

```
attack chain： recon → initial access → priv esc → credential discovery → lateral file access → host compromise

漏洞 → 編號 → OWASP：
  SQLi          CWE-89   A03:2021
  NoSQLi        CWE-943  A03:2021
  XSS           CWE-79   A03:2021
  LFI/traversal CWE-22   A01:2021
  SSRF          CWE-918  A10:2021
  IDOR/BOLA     CWE-639  A01:2021
  Improper Auth CWE-285  A01:2021
  Upload RCE    CWE-434  A01/A04:2021
  Brute force   CWE-307  A07:2021
  CAPTCHA       CWE-602/603  A08:2021
  Backup file   CWE-530  A05:2021
  OAuth redirect_uri  CWE-346  A07:2021 + API2
  Cache poisoning     (無 CWE) A05:2021
```

> **English Standard Definition:** Remember the one-line chain: public recon → initial access → privilege escalation → credential discovery → lateral file access → host compromise.

---

> **檔尾聲明**：本檔為 ART_T3 系列第 9 份（補原文缺失嘅 Glossary），一切內容由前 8 份階段筆記歸納，屬教材外補充；唔取代原文，亦唔構成任何授權——所有技術只可喺明示同意嘅靶場（例如本地 lab、合法練習平台）中使用。
