# Advanced Red Team — Tutorial 3 攻擊鏈②A：初始存取（認證與自動化濫用）雙語學習指南

> **原教材**：Advanced Red Team — Tutorial 3（PDF p.12–23、24–34、74–85）｜覆蓋 section：§1、§2、§6
> **本檔對應**：攻擊鏈 ②A 初始存取（Initial Access）——認證與自動化濫用
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 跟 walkthrough 落手做 → 最後懶人包自測
> **邊界聲明**：本檔只覆蓋 §1 CAPTCHA Bypass、§2 Email Bomb、§6 Unlimited Brute Force。
> §4 SQLi in JSON、§12 NoSQL、§13 OAuth 屬另一份檔 → ➜ 見 `ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md`
> §3 權限提升（IDOR／BAC／Upload RCE）屬攻擊鏈③ → ➜ 見 `ART_T3_05_PrivilegeEscalation_StudyGuide.md`

---

## 📝 1. 初始存取②A：認證與自動化濫用 概要與實務情境

攻擊鏈（attack chain）係紅隊做滲透測試嘅骨幹模型：由「公開偵察」→「初始存取」→「權限提升」→「憑證蒐集」→「橫向檔案存取」→「主機淪陷」，每一步都靠上一步嘅成果。**本檔覆蓋攻擊鏈第②階段「初始存取」（Initial Access）嘅其中一半 —— 認證與自動化濫用**。所謂「初始存取」，就係攻擊者第一次成功喺目標系統上面攞到一個立足點（foothold）：可能係一個新註冊嘅帳號、一個用暴力破解拎到嘅登入 session、或者藉大量自動請求令目標疲於奔命。呢個階段嘅共通點係：**目標系統自己嘅公開功能（註冊、忘記密碼、登入 API）反過嚟被攻擊者利用**，唔需要你識寫 exploit、唔需要搵 memory corruption，只需要識 HTTP 同識用 proxy 工具去改 request。

本檔三個 section 分屬「自動化濫用」嘅三種面貌。**§1 CAPTCHA Bypass** 講嘅係：一個本應擋機械人嘅「防護措施」點樣因為寫錯而形同虛設 —— 伺服器把正確答案直接送畀你，或者寫死一個 magic word，令你零成本註冊大量帳號。**§2 Email Bomb** 講嘅係：前端（瀏覽器）做咗「按鈕禁用 + 30 秒倒數」呢啲睇落好似防護嘅嘢，但伺服器完全冇跟住做 rate limit，於是攻擊者用 `curl`／Python／Burp 直接重播 POST，一吓就炸爆受害者信箱；再加一招「用分號喺一個 email 欄位塞入好多收件人」，一發 request 可以觸發大量寄信。**§6 Unlimited Brute Force** 講嘅係：登入頁有「五次失敗就鎖」嘅保護，但個計數器係綁喺 session cookie 度 —— 攻擊者每次唔帶 cookie 嘅新 request 都會獲得一個全新 session，等於無限次猜密碼；配合「唔存在的用戶名」同「密碼錯誤」兩種唔同錯誤訊息洩漏邊個帳號存在，就可以由亂猜變成精準打擊。

前置假設：呢三個情境都假設你已經完成攻擊鏈①（公開偵察），即係你已經知道目標 app 嘅 URL、知道佢有 `/register.php`、`/forgot.php`、`/login.php`、`/api/users.php`、`/staff.php` 等公開頁面。另外你會用到一個 HTTP intercepting proxy（Burp Suite 或 Firefox DevTools）去攔截同改寫 request；本檔會喺第 3 節補齊零經驗先修。

實務情境一（真實滲透測試）：你受聘測試一個政府服務入口網站。測試範圍寫明「允許測試認證機制」。你先自己註冊一個帳號試水 —— 發現註冊頁嘅數學 CAPTCHA 答案竟然寫喺 HTML 隱藏欄位度，於是你可以寫一個腳本自動批量註冊測試帳號，去驗證「帳號開立流程有冇濫用保護」。跟住你搵到忘記密碼頁，重播 50 次 POST，證實伺服器冇 rate limit —— 呢個就係一個可被真實攻擊者用嚟做 smokescreen（煙幕）嘅高風險漏洞，報告要列為 High。

實務情境二（紅隊／漏洞賞金）：目標登入頁有鎖定機制，表面睇嚟好安全。但你留意到鎖定訊息係喺第 5 次失敗後先出現，於是你試吓每次 request 都刪走 `Cookie` header —— 鎖定訊息冇再出現，你可以無限次猜。你再由 `/api/users.php` 收割有效用戶名，用一個幾百條嘅常見密碼清單去打，幾分鐘內就拎到 `john.doe / Welcome2024` 呢類弱密碼帳號。呢個就係由「unlimited brute force」直接通往「initial access」嘅典型路徑。

> ⚠️ 教材外補充：本檔三個漏洞全部係「授權測試 / lab 環境」先可以做。未經書面授權對真實系統做批量註冊、email bomb、暴力破解，喺香港可觸犯《刑事罪行條例》第 161 條「有犯罪或不誠實意圖而取用電腦」等罪行。技術要學，但一律只喺自己嘅 lab 靶場（本教材嘅政府入口網站靶場）度練。

---

## 🎯 2. 學習目標

1. **解釋 CAPTCHA 嘅安全基礎喺邊** — Explain why a CAPTCHA's value depends entirely on server-side enforcement
2. **認出三種 CAPTCHA bypass** — Identify the three bypasses: leaked answer、omitted fields、magic-word backdoor
3. **讀懂並對照脆弱 PHP 碼** — Read the vulnerable PHP check and compare it with the correct server-side design（session 儲存答案、每次都重新生成）
4. **解釋 email bomb 嘅原理** — Explain how a resource-consuming public feature becomes an amplification vector
5. **分辨「瀏覽器控制」同「伺服器控制」** — Distinguish client-side controls (JS timer、disabled button) from real server-side rate limiting
6. **使用 delimiter injection 放大攻擊** — Use semicolon delimiter injection to turn one POST into many emails
7. **用 Burp Intruder 自動化重播** — Automate request replay with Burp Intruder（Numbers payload、Cluster bomb）
8. **解釋無限暴力破解嘅成因** — Explain why a session-cookie-tied lockout fails, and what it must be tied to instead
9. **由錯誤訊息做用戶名列舉** — Enumerate valid usernames from differential error messages（missing user vs wrong password）
10. **用 Burp Intruder／Python 腳本破解弱密碼** — Crack weak passwords with Burp Intruder and the lab's `tools/brute.py`
11. **講出正確嘅防守修法** — State the correct fixes: server-side session storage、per-account/per-IP rate limiting、generic errors、bcrypt/Argon2

---

## 🧩 3. 零經驗先修（Prerequisites, in plain words）

呢一節係原文假設你「已經識」但冇解釋嘅基礎。每一項：一句定義 ＋ 一個生活化比喻 ＋ 一句英文。原文 Introduction 叫你去睇 Before You Start／Tool Setup Guide／Glossary，但整份 PDF 根本冇呢三章（此檔覆蓋嘅 §1／§2／§6 亦冇）——所以以下全部係教材外補充。

> ⚠️ 教材外補充：以下所有名詞嘅白話拆解，係為零實戰經驗學生而寫。

### 3.1 HTTP request / response（請求與回應）

一句定義：瀏覽器（client）向伺服器發一個 **HTTP request**，伺服器回一個 **HTTP response**（含 status code 同 body）。
生活化比喻：好似你打電話去餐廳落單（request），廚房拎住你嘅單回應（response）；你講嘅嘢同佢覆你嘅嘢，全部係純文字，可以中途截住改。
English: Every action in the browser is an HTTP request; the server answers with an HTTP response containing a status code and a body.

### 3.2 HTTP status code（狀態碼）

一句定義：三位數字，代表伺服器點處理你嘅 request，例如 **200 OK**（成功）、**302 Found**（轉址）、**403 Forbidden**（拒絕）。
生活化比喻：好似餐廳侍應嘅手勢 —— 👍（200）、指你去另一張枱（302）、擺手叫你走（403）。
English: Status codes summarise the outcome, and a difference between 200 and 302 in a results table often reveals success.

### 3.3 POST 與 form-encoded body（表單提交）

一句定義：`POST` 係「提交資料」嘅 HTTP method；表單資料用 `application/x-www-form-urlencoded` 格式放喺 body，例如 `username=admin&password=x`。
生活化比喻：好似填表交去櫃檯，一格一格（key=value）咁填。
English: A form posts key=value pairs in a URL-encoded body, which can be copied and replayed byte-for-byte.

### 3.4 intercepting proxy（攔截代理，Burp Suite）

一句定義：一個坐喺瀏覽器同伺服器中間嘅程式，可以**睇到、暫停、修改**每一條 request/response。
生活化比喻：好似郵局中途拆你封信、影印、改兩個字再寄出。
English: An intercepting proxy sits between the browser and the server so you can read and edit every request.

### 3.5 Burp Repeater / Intruder（重播／自動化）

一句定義：**Repeater** 係手動改一條 request 再重複發；**Intruder** 係自動將一條 request 發 N 次（配合 payload 清單）。
生活化比喻：Repeater 係你逐次按「再寄」；Intruder 係影印機一次過印 50 封信。
English: Repeater resends one edited request by hand; Intruder automates sending it many times with payloads.

### 3.6 Cookie 與 session（會話）

一句定義：伺服器用 **cookie**（一個由你瀏覽器帶住嘅識別碼）去認得你，並將你嘅狀態（例如登入、失敗次數）存在伺服器端，就叫 **session**。
生活化比喻：好似戲院嘅手帶 —— 帶住手帶佢就認得你係邊個；除咗手帶（清 cookie／唔帶 cookie），你就變成陌生人。
English: The session cookie is the server's memory of who you are; no cookie means a brand-new session.

### 3.7 curl 同 Python `requests`（唔用瀏覽器直接發 request）

一句定義：`curl` 係命令列工具，可以唔經瀏覽器直接發 HTTP request；Python 嘅 `requests` library 就係用程式發 request。
生活化比喻：唔用外賣 app，直接自己行去餐廳落單 —— 一樣嘅事，但可以自動化、快好多。
English: curl and Python requests send the same HTTP requests the browser sends, but outside the browser, so client-side controls vanish.

### 3.8 hidden field（隱藏欄位）同 HTML comment（註釋）

一句定義：`<input type="hidden">` 係一個**唔顯示**但一樣會提交嘅欄位；HTML comment（`<!-- ... -->`）係畀開發者嘅備註，但瀏覽器會將佢原封不動送到你度。
生活化比喻：好似一封信背面用鉛筆寫咗「正確答案」（hidden field），或者喺中間夾咗張便利貼（comment）——你睇唔到，但一揭就見。
English: Hidden fields and HTML comments are still shipped to the browser; "hidden" only means not rendered, not secret.

### 3.9 client-side vs server-side（前端 vs 後端）

一句定義：喺瀏覽器行嘅 JavaScript 叫 **client-side**；喺伺服器行嘅 PHP／程式叫 **server-side**。
生活化比喻：門口嘅保安（client-side）你可以繞過，但入到去櫃檯嗰個職員（server-side）先係真正決定你入唔入得。
English: Client-side controls can always be bypassed or replayed; only server-side checks can enforce security.

### 3.10 rate limiting（速率限制）

一句定義：限制「同一來源喺一段時間內可以做幾多次同類操作」，例如每 IP 每分鐘最多 5 次登入。
生活化比喻：提款機一日最多提幾次，防止有人不斷試。
English: Rate limiting caps how often an action may be repeated, and it must be enforced per account and per IP.

### 3.11 delimiter injection（分隔符注入）

一句定義：伺服器將一個欄位嘅值用 `;`、`,` 或換行「切開」變成多個值；攻擊者就利用呢點喺一格塞入多個收件人。
生活化比喻：好似表格 「收件人」一格本來填一個人，但你填咗十個人名用分號隔開，郵差照樣逐個派。
English: If the server splits an email field on delimiters, one field can carry many recipients.

### 3.12 username enumeration（用戶名列舉）

一句定義：由程式**唔同嘅回應**（例如「Username not found.」vs「Password incorrect.」）推斷出邊啲帳號真實存在。
生活化比喻：好似打去公司問「有冇陳大文呢個人？」——「冇呢個人」同「有呢個人但佢唔聽電話」係兩句唔同嘅回覆，你就知邊個真係喺度做。
English: Differential responses let an attacker confirm which accounts exist before spending a single password guess.

### 3.13 password hashing（密碼雜湊）

一句定義：密碼唔應該原樣（plaintext）儲存；應該用**慢速、加 salt 嘅雜湊**（bcrypt、Argon2 之類 memory-hard 函式）儲存，令資料庫洩漏都好難還原。
生活化比喻：plaintext 好似將密碼寫喺當眼處；MD5/SHA-1 好似用速食絞肉機絞碎（快，易撞返）；bcrypt/Argon2 好似用千斤頂慢慢壓（慢，撞唔切）。
English: Plaintext storage leaves defenders with nothing to do after a leak; slow salted hashes (bcrypt/Argon2) make offline cracking impractical.

### 3.14 Burp Intruder 嘅 attack type（Cluster bomb）

一句定義：當一條 request 有**兩個** payload 位置（例如 username 同 password），就要用 **Cluster bomb**，佢會嘗試兩份清單嘅**所有組合**。
生活化比喻：好似兩部扭蛋機，你要試齊「每個 User 配每一條 Password」嘅所有配對。
English: Cluster bomb tries every combination of two payload sets — use it when username and password each need their own list.

---

## 📖 4. 逐節深度知識點重寫

> ⚠️ 教材外補充：本節將原文三個 section 嘅 “What is it and why does it work?” 同 “How to find it” 全部重寫成繁中，英文關鍵句以 blockquote 保留。

### 4.1 §1 CAPTCHA Bypass（原文 p.12–23）

#### 4.1.1 乜嘢係 CAPTCHA，點解會失效？（What is it and why does it work?）

**CAPTCHA** 全寫係 **Completely Automated Public Turing test to tell Computers and Humans Apart**（完全自動化公開圖靈測試，用嚟分辨電腦同人類）。佢係一個「挑戰—回應」測試，目的係令自動化腳本（bot）唔能夠大量操作，而真人先過得到。一個安全嘅 CAPTCHA 有三個必要條件：**（1）喺伺服器度檢查答案；（2）正確答案保密；（3）答案錯或者缺失一律拒絕**。可見 CAPTCHA 嘅價值，完全來自「伺服器端強制執行（server-side enforcement）」—— 前端（瀏覽器）做幾靚都冇用，因為攻擊者根本唔會用瀏覽器。

> **English Standard Definition:** A CAPTCHA is a challenge-response test meant to distinguish legitimate users from automated scripts; its value depends entirely on server-side enforcement.

> **English Standard Definition:** A secure CAPTCHA checks the user's answer on the server, keeps the correct answer secret, and rejects wrong or missing responses.

對應嘅弱點編號（CWE，Common Weakness Enumeration，一套共通弱點分類）：

| CWE | 名稱（英文） | 意思（繁中） |
|---|---|---|
| **CWE-602** | Client-Side Enforcement of Server-Side Security | 將本應由伺服器執行嘅安全檢查交咗去前端做 |
| **CWE-603** | Use of Client-Side Authentication | 用前端資料嚟做認證判斷（前端話事） |

**本 lab 嘅具體情況**：註冊頁會顯示一條數學題，例如 `"What is 9 + 3?"`。呢一頁**完全冇 JavaScript** —— 答案只喺伺服器端 PHP 檢查，但嗰個檢查有三個致命缺陷：

1. **正確答案被送到每個訪客手上**：答案喺一個隱藏欄位 `captcha_answer`，而且仲喺 HTML comment 度重複一次（`<!-- DEBUG -->`）。
2. **伺服器將你嘅答案同「你交上嚟嘅欄位」比較**：因為比較對象本身你都控制得到，所以**兩個欄位都唔交**嘅 request，會變成「兩個空字串比較」，`'' !== ''` 係 false → 檢查通過。
3. **檢查入面藏咗一個 magic word backdoor**：`strtolower($captcha) !== 'bypass'` —— 即係只要答案係 `bypass`，就永遠當你過關。

以上任何一個缺陷單獨存在，都足以令攻擊者**唔使解題就註冊到**。

> **English Standard Definition:** The correct answer is shipped to every visitor in a hidden captcha_answer field and repeated in a DEBUG comment.

OWASP 對應：**A08:2021 — Software and Data Integrity Failures**（信任前端驗證，屬於軟件與資料完整性失效）。原文特別點出：好多號稱「invisible（無形）」嘅 CAPTCHA 整合都被人繞過，原因就係**伺服器從來冇真正驗證個 token**，結果可以大量開帳號（mass account creation）。

> **English Standard Definition:** Many "invisible" CAPTCHA integrations have been bypassed because the server never verified the token, allowing mass account creation.

**In the wild（真實世界案例）**：同一類失效會以幾種形式出現 —— CAPTCHA token 只喺 JavaScript 度驗證、token 可重用或可預測、弱嘅圖片／語音挑戰俾 OCR 或 speech-to-text 破解、以及將挑戰外判畀「人手解 captcha」服務。現代防禦會將 CAPTCHA 同 **rate limiting（速率限制）**、**行為分析（behavioural analysis）**、以及「短壽命、密碼學隨機、只喺伺服器驗證、永不送往前端」嘅 token 結合。

> **English Standard Definition:** Modern defenses combine CAPTCHA with rate limiting, behavioural analysis, and short-lived, cryptographically random tokens validated exclusively on the server and never exposed to the client.

#### 4.1.2 點樣搵到呢個漏洞（How to find it）

原文嘅搵法係「先探險、後工具」，逐步如下：

- **以第一次到訪嘅用戶心態行成個網站**：註冊（registration）、聯絡（contact）、登入（login）表單係最有可能嘅攻擊面。
- **搵出「提交前要答挑戰問題」嘅頁面**，例如註冊頁 `/register.php` —— 呢類頁就係 CAPTCHA 疑犯。
- **自問一句關鍵問題**：答案喺邊度檢查？同邊個值比較？**如果比較值係嚟自隱藏欄位或者 HTML comment，咁攻擊者就控制咗比較嘅兩邊。**
- **右鍵 → View page source（檢視頁面原始碼）**，搜尋 `captcha_answer` 或者含 `DEBUG` 嘅 HTML comment。
- **直接測試伺服器**（用 Firefox DevTools 或者 Burp Suite）：先用**錯答案**重發（應該失敗），再用**洩漏嘅答案**，再**刪走 CAPTCHA 欄位**，再用 magic word（例如 `bypass`）。每一次「被接受」嘅變體，都係一個獨立嘅 bypass。

> **English Standard Definition:** If the comparison value comes from a hidden field or an HTML comment, the attacker controls both sides of the check.

> ⚠️ 教材外補充：「搜尋頁面原始碼」嘅關鍵字心法 —— 搵 `captcha_answer`、`DEBUG`、`hidden`、`value=`、`==`、`bypass`、`skip`、`test`。任何「正確答案」或「通關開關」出現喺前端，就係紅旗（red flag）。

#### 4.1.3 原文脆弱碼片段（原樣保留）

原文先示範「頁面原始碼裡面洩漏咗乜」——可見表單下面直接出咗答案：

```
<input type="text" name="captcha" required>
<!-- VULNERABLE: the answer is exposed client-side, allowing automated bypass. -->
<input type="hidden" name="captcha_answer" value="12">
<!-- DEBUG: captcha answer is 12 -->
```

上例嘅意思：`value="12"` 就係正確答案，`<!-- DEBUG: captcha answer is 12 -->` 再重複一次。**你唔使計，答案已經喺度。**

原文再示範**正確嘅伺服器端寫法應該係點**（答案存喺 session，永不送往前端，而且每次提交後即焚）：

```
// Server only: the answer is stored in the session, never sent to the client.
$_SESSION['captcha_answer'] = $answer;
// On submission the server compares and regenerates:
if (!isset($_SESSION['captcha_answer']) ||
    $_POST['captcha'] !== $_SESSION['captcha_answer']) {
    reject();  // wrong or missing answer always fails
}
unset($_SESSION['captcha_answer']);  // one attempt per challenge
```

最後，原文展示 `register.php` **實際嘅脆弱檢查**（三個缺陷嘅源頭）：

```
$captcha        = $_POST['captcha'] ?? '';        // attacker-controlled
$captcha_answer = $_POST['captcha_answer'] ?? ''; // attacker-controlled too!
// VULNERABLE: the correct answer is sent to the client in a hidden field.
if ($captcha !== $captcha_answer && strtolower($captcha) !== 'bypass') {
    reject();  // a genuinely wrong answer fails...
}
// ...but the leaked answer, matching values, missing fields ('' === ''),
// or the magic word 'bypass' all pass.
```

> ⚠️ 教材外補充：呢段 PHP 有兩個重點要識睇 ——（1）`$captcha` 同 `$captcha_answer` **兩邊都係 attacker-controlled**（由 `$_POST` 嚟），即係「自己同自己比」，等於冇檢查；（2）`?? ''` 係 PHP 嘅 null coalescing operator，代表「如果呢個 POST 參數唔存在，就當佢係空字串」—— 呢個就係「唔交欄位都過關」嘅成因。因為 `'' !== ''` 結果係 `false`，所以整個 `if` 條件（用 `&&` 連接）唔會成立，`reject()` 永遠唔會執行。

#### 4.1.4 三種 bypass 一覽（原文 Summary table）

| # | Bypass | 精確 request（原文如此） | 為何成功（結論） |
|---|---|---|---|
| 1 | **Leaked answer**（洩漏答案） | `POST /register.php` 帶 `captcha=12&captcha_answer=12`（值抄自 hidden field 或 DEBUG comment） | 伺服器將答案送畀每個訪客，再將你輸入同嗰個「客戶端提供」嘅欄位比較 |
| 2 | **Fields omitted**（省略欄位） | `POST /register.php` 只帶 `username`、`full_name`、`email`、`password` —— 冇 `captcha` 同 `captcha_answer` | 缺失參數被讀成 `''`，而 `'' !== ''` 係 false，所以檢查通過 |
| 3 | **Magic word**（魔法字） | `POST /register.php` 帶 `captcha=bypass`（`captcha_answer` 任何值都可以） | 寫死條件 `strtolower($captcha) !== 'bypass'` 令比較短路（short-circuit） |

#### 4.1.5 §1 防守方修法（原文 “How to fix”）

原文嘅修法：將正確答案存喺**伺服器端 session**，**永不**喺 HTML、hidden field 或 comment 度 render；**無條件拒絕**缺失或空白嘅 CAPTCHA 參數；**每次嘗試後重新生成挑戰**；加 **per-IP rate limiting**。並將 CAPTCHA 當作**其中一個信號**（配合行為分析），**唔可以係唯一控制**；同時確保 debug comment 同 magic string 唔會出現在出廠程式碼。

> **English Standard Definition:** Store the answer in the server-side session and never render it in HTML, hidden fields, or comments; reject missing or empty CAPTCHA parameters unconditionally; regenerate the challenge after every attempt; and add per-IP rate limiting.



#### 4.1.6 §1 三個缺陷 ↔ 三個 bypass：深層原理對照

原文嘅三個 bypass 並非三個獨立 bug，而係**同一個設計錯誤「伺服器信任客戶端」嘅三種表現**。逐個拆解：

| 缺陷（root cause） | 對應 bypass | 為何成功（邏輯） |
|---|---|---|
| 答案隨 HTML 送出（hidden field + DEBUG comment） | Bypass 1 洩漏答案 | 攻擊者讀得到正確答案，`captcha === captcha_answer` |
| 比較對象由 client 提供（`$_POST['captcha_answer']`） | Bypass 2 省略欄位 | 兩邊都被讀成 `''`，`'' !== ''` 為 false，`&&` 條件不成立 |
| 檢查入面有寫死 magic string | Bypass 3 magic word | `strtolower($captcha) !== 'bypass'` 為 false，短路整個檢查 |

> ⚠️ 教材外補充：三條路嘅「修法」其實係同一條 —— **將判斷所需要嘅資料完全移到伺服器（session），令 client 再也無法影響比較結果，亦令缺失資料必然被拒**。理解呢一點，你就唔會死記三個 bypass，而係記住一個原則：「**凡是 client 送得嚟嘅值，都唔可以用嚟判斷 client 自己應唔應該過關**」。

**點解 `&&` 同 `!==` 會造就 Bypass 2？** 原文嘅檢查係 `if ($captcha !== $captcha_answer && strtolower($captcha) !== 'bypass')`。要 `reject()` 執行，兩個條件都要為 true，即係「你嘅答案同洩漏答案唔同」**而且**「你嘅答案唔係 bypass」。當你兩個欄位都唔交：`$captcha = ''`、`$captcha_answer = ''`，於是 `'' !== ''` = **false** —— 第一個條件已經 false，`&&` 之後嘅嘢唔使計，整個 `if` 唔成立，`reject()` 被跳過。呢個就係「布林邏輯短路（short-circuit）」配合「空字串比對」造成嘅漏洞。

**點解 Bypass 3 叫 backdoor 而唔係 bug？** 因為一個「正常嘅」CAPTCHA 檢查冇任何理由要接受一個特定英文字。`bypass`、`skip`、`test`、`admin` 呢類字擺喺驗證邏輯度，唯一合理解釋就係開發者刻意留低嘅「後門」（例如方便自己測試但冇刪）。原文要求「用 intercepting proxy 確認」正正係因為：單見到一次成功唔足以判斷，要做**對照**（`wrong123` 失敗）先證明佢係刻意 backdoor。

---

### 4.2 §2 Email Bomb（原文 p.24–34）

#### 4.2.1 乜嘢係 email bomb，點解會 work？（What is it and why does it work?）

**Email bomb**（又叫 email flooding、subscription bombing）係濫用應用程式「對外消耗資源」嘅功能，去淹沒目標或者耗盡資源。任何會觸發**收費或高 CPU 運算**嘅功能 —— 寄 email、SMS、檔案生成、推送通知、密碼重設訊息 —— 一旦保護不足，都可以變成**放大向量（amplification vector）**。

> **English Standard Definition:** An email bomb abuses an application's outbound resource-consuming function to flood a target or exhaust resources.

問題核心：開發者往往只係加一個 **JavaScript 計時器**或者**停用按鈕**去阻止用戶連按，但**如果伺服器冇執行相同嘅延遲**，攻擊者只要喺瀏覽器以外重播 POST request 就即刻繞過。更差嘅係：如果伺服器會將地址欄位按 `;` 之類嘅**分隔符切開**，咁一個 request 就可以觸發好多次寄信 —— 一個 HTTP POST 變成 **bulk-messaging attack（大量訊息攻擊）**。

> **English Standard Definition:** If the server does not enforce the same delay, an attacker can simply replay the POST request outside the browser. Worse, if the server splits an address field on delimiters such as ;, one request can trigger many deliveries.

OWASP 對應：**A05:2021 — Security Misconfiguration**（安全配置錯誤）同 **A07:2021 — Identification and Authentication Failures**（識別與認證失效）。**MITRE ATT&CK 編號 T1667 — Email Bombing**，歸類喺 **Impact** 戰術之下：攻擊者一次過將目標地址訂閱幾千個電子報同服務，產生大量「睇落似正常」嘅確認信，用嚟淹沒安全警報或者交易通知。

> **English Standard Definition:** Email bombing is a messaging-layer denial-of-service attack, cataloged by MITRE as T1667 — Email Bombing under the Impact tactic.

**真實案例**：真實攻擊行動會將「洪水」配合後續嘅社交工程。原文點名 **Storm-1811** 同 **Black Basta** 呢兩個組織，用 email bombing 去為「假 IT 支援來電」或者「Microsoft Teams 訊息」鋪路，最終導致部署遠端存取工具（remote-access tool）同勒索軟件（ransomware）。因為每一封都係真實嘅訂閱確認信，簡單嘅垃圾郵件過濾器往往捉唔到。

> **English Standard Definition:** Real campaigns pair the flood with follow-on social engineering... Because each message is a genuine signup confirmation, simple spam filters often miss the attack.

#### 4.2.2 點樣搵到（How to find it）

- **搵對外消耗資源嘅公開功能**：密碼重設（password reset）、聯絡（contact）、邀請（invitation）、電子報（newsletter）表單；SMS 或 OTP 發送端點；檔案匯出、報表生成、通知功能。
- **打開 `/forgot.php` 提交一次**：如果按鈕變灰、出現倒數，就**直接發 POST** 去檢查伺服器有冇執行同一個限制。
- **記住一句鐵律**：client-side 控制（JavaScript 計時器、禁用按鈕、隱藏欄位）**唔係安全控制**。瀏覽器送得出嘅嘢，都可以用 Burp Suite、`curl` 或 Python 重播或修改。
- **測試地址欄位有冇 delimiter injection**：分號、逗號或換行可能令你喺一個 request 度塞入多個收件人。
- **用 Firefox DevTools 或 Burp Suite 捕獲 POST 然後急速重發**：如果伺服器繼續接受，就係冇真正嘅 rate limit。

> **English Standard Definition:** Remember that client-side controls (JavaScript timers, disabled buttons, hidden fields) are not security controls.

> ⚠️ 教材外補充：「一個公開表單、50 次重播 POST、冇 rate limit」= 收件箱被重設信淹沒。呢個就係要落手證實嘅假設：**前端有防護 ≠ 伺服器有防護**。

#### 4.2.3 原文 `curl`／Python 工具用法（原樣保留）

原文嘅 §2 walkthrough 主要用 **Burp Repeater**、**Burp Intruder** 同 **Postman** 落手做（詳見第 5 節）。原文冇提供獨立嘅 `curl`／Python 腳本片段去炸 email，但反覆強調嘅原則係：**任何瀏覽器送得出嘅 request，都可以用 Burp Suite、`curl` 或 Python 重播或修改**（原文如此）。以下係原文逐字提及嘅工具用法關鍵句：

- Burp Suite 流程（原文步骤）：`Proxy → HTTP history` 搵到 `POST /forgot.php` → 右鍵 `Send to Repeater` → 喺 Repeater 按 `Send`。
- Burp Intruder（原文步骤）：`Send to Intruder` → 保留 `email=victim@example.com` 做**唯一** payload position（標記 `§`）→ Payloads tab 設 payload type 為 `Numbers`、由 `1` 到 `50`、step 為 `1` → `Start attack`。
- Postman（原文步骤）：`New → HTTP Request` → method 設 `POST`、URL 設 `http://localhost:8080/forgot.php` → Body tab 選 `x-www-form-urlencoded`（或 `form-data`）→ 加一個 key 叫 `email` → value 設成分號分隔、無空格嘅地址清單。
- Burp Repeater 替代做法（原文如此）：body 設為 `email=victim@example.com;victim@example.com;…` 再撳 `Send`。

> ⚠️ 教材外補充：如果你想用 `curl` 做同一件事，對應嘅形態係 `curl -X POST -d "email=victim@example.com" http://localhost:8080/forgot.php`（單一收件人）或者 `-d "email=a@x.com;b@x.com;c@x.com"`（分號放大）。呢個係由原文「curl 可以重播或修改 request」嘅原則推演，原文冇直接提供呢條完整指令。

#### 4.2.4 靶場內部郵件系統（原文如此）

原文交代 lab 嘅郵件伺服器係一個 Docker container（名 **`hkgov-mail`**，由 `mail/` folder build），行 **Postfix** 同 **Dovecot**，並將 **Roundcube webmail** 曝露喺 **port 8081**。呢條 pipeline 冇任何一環做 rate limiting，所以每個被接受嘅 POST 都會變成多一封已派遞嘅訊息。



#### 4.2.5 §2 放大原理與影響面：為何 email bomb 屬「Impact」類攻擊

要理解 email bomb 嘅殺傷力，先要分清「**一個 request**」同「**一個 request 造成嘅後果**」係兩件事。原文示範兩種放大：

- **時間上嘅放大（repetition）**：一個 POST 觸發一封 email；重播 N 次 = N 封。Burp Intruder 用 `Numbers 1→50` 就係將「人手撳 N 次」變成「一次過發 N 次」。
- **單次請求內嘅放大（delimiter injection）**：一個 POST body 入面嘅 `email` 值含 N 個用 `;` 分隔嘅地址，伺服器逐個寄 = N 封。呢個係更「高效」嘅放大，因為 request 數量冇增加，但輸出倍增。

```
單一 HTTP POST /forgot.php
        │  body: email=a@x.com;b@x.com;c@x.com
        ▼
  伺服器 split on ';'
   ┌────┼────┐
   ▼    ▼    ▼
 a@x   b@x   c@x     <- 實際寄出 3 封（含重複地址亦照寄）
        │
        ▼
  response: "Sent 3 reset email(s)"
```

影響面（原文 OWASP / MITRE 對應）：

| 面向 | 內容 |
|---|---|
| OWASP | A05:2021 Security Misconfiguration、A07:2021 Identification and Authentication Failures |
| MITRE ATT&CK | T1667 — Email Bombing（Impact 戰術） |
| 真實組織 | Storm-1811、Black Basta（用 flood 為假 IT 支援／Teams 訊息鋪路，最終部署 RAT 同勒索軟件） |
| 為何過濾器捉唔到 | 每封都係「真實嘅訂閱確認信」，唔似典型 spam |
| 本質 | 訊息層嘅阻斷服務（messaging-layer denial-of-service） |

> ⚠️ 教材外補充：原文嘅「五個前提」值得記住 —— email bomb 屬 **Impact（影響）** 而唔係 **Initial Access**，但佢喺攻擊鏈入面經常扮演「**初始存取之後嘅煙幕（smokescreen）**」：當收件箱被幾百封重設信淹沒，一封「真正嘅密碼重設通知」或者「假 IT 支援確認信」就好容易蒙混過關。

---

### 4.3 §6 Unlimited Brute Force（無限暴力破解）（原文 p.74–85）

#### 4.3.1 乜嘢係 brute force，點解會 work？（What is it and why does it work?）

**Brute-forcing（暴力破解）** 係系統性咁猜憑證，直到搵到正確嘅一對（username + password）。佢之所以可行，係因為可以「快速試好多組」：一旦冇 **rate limiting、帳號鎖定（account lockout）、延遲（delays）或 CAPTCHA** —— 呢個弱點編號係 **CWE-307, Improper Restriction of Excessive Authentication Attempts**（對過量認證嘗試限制不當）—— 一個自動化腳本就可以對曝露嘅 login、VPN、RDP、SSH 或 API 端點測試幾千個密碼。

> **English Standard Definition:** Brute-forcing is the systematic guessing of credentials until the correct pair is found.

安全嘅登入表單會靠四招令暴力破解變得不切實際：回傳**通用錯誤訊息**、執行**帳號鎖定或延遲**、要求 **CAPTCHA**、以及用**慢速雜湊**（bcrypt 或 Argon2）儲存密碼。

**本 lab 登入表單有兩副面孔**：第一，佢確實有基本嘅 **session-based brute-force protection** —— 同一個 session 失敗五次之後就阻止再猜。第二，呢個保護**可以被繞過**，因為「每個冇 session cookie 嘅新 HTTP request 都會開一個全新 session」，所以攻擊者可以**不斷輪換 session、無限猜落去**。同時，表單對「唔存在嘅用戶名」同「錯密碼」回傳**唔同嘅錯誤訊息**，令攻擊者可以**列舉有效帳號**；而且密碼係以 **plaintext（明文）** 儲存。呢三點加埋，一旦繞過 rate limit，自動化猜測就變得非常實際。

> **English Standard Definition:** That protection can be bypassed because each new HTTP request without a session cookie starts a fresh session, so an attacker can rotate sessions and keep guessing indefinitely.

OWASP 對應：**A07:2021 — Identification and Authentication Failures**。原文強調：針對曝露嘅 RDP 同 VPN 登入頁做暴力破解，係勒索軟件營運者嘅主要入口點之一。現代攻擊亦常結合「先前洩漏嘅憑證清單」加「用戶名列舉」，將猜測集中喺已知帳號。原文引述 **IBM Cost of a Data Breach Report** 一貫指出「compromised credentials（憑證外洩）」係其中一種最昂貴嘅初始存取途徑；而 **NIST SP 800-63B** 建議對認證做 rate limiting 同多因素驗證。

> **English Standard Definition:** NIST SP 800-63B recommends rate limiting for authentication and multi-factor verification.

#### 4.3.2 點樣搵到（How to find it）

原文強調「由偵察開始，唔係由工具開始」：

- **先要有有效用戶名清單** —— 暴力破解冇用戶名清單係唔可行嘅。
- **瀏覽公開頁面**，例如 `/staff.php` 同 `/api/users.php`，收割登入識別碼。
- **用 login 同 forgot-password 嘅錯誤訊息**去確認猜嘅用戶名存在唔存在。
- **打開登入頁反覆交錯密碼**，觀察 rate-limit 行為。
- **留意「唔存在用戶名」同「錯密碼」嘅唔同錯誤訊息**，以及超過門檻後嘅鎖定訊息。
- **如果發生鎖定，測試佢係唔係綁 session cookie**：清 cookie、用私人瀏覽模式、或者經 Burp Suite 發冇 cookie 嘅 request。
- **檢查密碼點儲存**：plaintext 或弱雜湊會令你**連 online guessing 都唔使做**。

> **English Standard Definition:** If a lockout occurs, test whether it is tied to the session cookie by clearing cookies, using private browsing, or sending cookieless requests through Burp Suite.

#### 4.3.3 用戶名常見洩漏位置（原文表格）

| 頁面／位置 | 要搵乜（原文如此） |
|---|---|
| Staff / team directory 頁（本 lab：`/staff.php`） | 頁面表格或 HTML 原始碼中印出嘅用戶名、login ID 或 staff code |
| Post / comment 作者名（新聞、論壇、blog） | 作者署名，同 login 識別碼吻合或洩漏 login 識別碼 |
| 聯絡 email（例如 `john.doe@gov.hk`） | email 嘅 local-part 通常同用戶名一樣 |
| HTML `data-` 屬性 | 例如原始碼裡面嘅 `data-username` |
| Input 欄位屬性 | `value`、`name` 或 `id` 屬性會預先填入或暗示用戶名 |
| API JSON 回應（本 lab：`/api/users.php`） | 未認證端點回傳含用戶名嘅用戶清單 |
| Password-reset / login 錯誤訊息（本 lab：`/forgot.php`、`/login.php`） | `"User not found"` vs `"wrong password"` 回應，確認邊啲帳號存在 |
| 文件 metadata（PDF、Office 檔） | 文件屬性中嘅 Author 欄位 |
| 原始碼註釋 | 開發者留喺 HTML、JS 或洩漏備份度提到帳號名嘅筆記 |

#### 4.3.4 密碼字典由邊度嚟（原文 “Where the password dictionary comes from”）

原文交代 `tools/brute.py` 內置嘅 `PASSWORDS` 清單係一個細小、有針對性嘅字典 —— 唔係隨機亂猜，而係真實攻擊者會用「公開洩漏資料 + 目標相關情報」砌出嚟：

- **洩漏密碼清單（Leaked password lists）**：歷年洩漏咗幾十億個真實密碼，例如 **`rockyou.txt`**（來自 2009 年 RockYou 洩漏事件）或者 SecLists 嘅 **`10k-most-common.txt`**，按頻率排序。攻擊者先試最常見嘅，所以清單入面會有 `123456`、`password`、`letmein`、`admin`。
- **情境相關變形（Context-aware mutations）**：將同目標有關嘅字，配季節或年份 —— 例如 `Welcome2024`、`Summer2024`。一個小小嘅生成器（用 for loop 將年份駁落 base word）或者 hashcat rule，就可以將幾個 base word 變成幾十個候選。
- **目標自己嘅密碼政策（The target's own password policy）**：一份內部政策檔會話畀你知密碼「應該」係咩樣。本 lab 嘅 file-read（Section 10 LFI）會曝露 `/opt/IT/password_policy.txt`（Section 11 用到），入面描述一個**九字元嘅 keyboard walk —— 三個數字、三個上排字母、三個 shift 符號** —— 結果得出唯一一個候選：`123qwe!@#`。**一份洩漏嘅政策，就將「盲猜」變成「幾次針對性嘗試」。**
- **角色／服務相關字（Role- and service-specific terms）**：帳號通常以功能命名，所以密碼要配對用戶名 —— 例如 `it.helpdesk` 用 `Helpdesk1`，普通用戶用 `Qwerty123` 式嘅 keyboard walk。

> ⚠️ 教材外補充：原文建議自製字典時，由公開常見密碼清單（例如 SecLists 項目嘅常見密碼檔 —— `https://github.com/danielmiessler/SecLists`）開始，前面加你自己嘅 target-specific 候選，然後**裁剪到幾百條** —— 短、有排序嘅清單跑得快啲，亦較易留喺偵測門檻之下。要餵自己嘅字典畀腳本，就將內置清單換成 `PASSWORDS = open('wordlist.txt').read().splitlines()`。

#### 4.3.5 `tools/brute.py` 嘅結構（原文 “How the script works”）

原文話整個攻擊大約 **30 行 Python**；每個密碼猜測工具都需要同一組 building block，呢個腳本逐個示範：

- **HTTP library**：`import requests` 提供簡單 web 功能 —— `requests.get(.../api/users.php)` 自動收割用戶名（即本節 step 1 嘅腳本化），`requests.post(.../login.php, data={'username': user, 'password': pwd})` 將每次猜測以 form-encoded body 提交，同瀏覽器表單一樣；`timeout=10` 防止單一 request 永遠 hang。
- **可配置目標**：`BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8080'` 讀取可選嘅命令列參數，令同一腳本可以攻另一部機（`python3 tools/brute.py http://target:8080`）而唔使改 code。
- **猜測迴圈**：兩層 nested for loop —— `for user in users:` 入面 `for pwd in PASSWORDS:` —— 對每個收割到嘅用戶名試齊所有密碼。呢個 nested loop 係所有暴力破解工具嘅核心，由 Hydra 到你自寫嘅腳本都一樣。
- **成功偵測同提早退出**：成功登入會 redirect 去 `/index.php` 同顯示 `Welcome back` banner，所以腳本檢查 `'Welcome back' in r.text` 或 `r.url.endswith('/index.php')`。命中就印 `[+] CRACKED` 同跳出內層 loop；Python 嘅 `for...else` 就只會為「整個清單都試完仍然失敗」嘅用戶印 `[-] No match`。
- **Rate-limit 繞過**：每次 `requests.post()` 都係獨立呼叫、**冇 cookie jar**，所以每次猜測都唔帶 session cookie —— 即係將上一步 Repeater／Intruder 嘅繞過自動化。伺服器為每個 request 開新 session，所以「五次計數器」永遠累積唔到。
- **需要時嘅延遲**：本 lab 係「per session」限制，所以唔使延遲。如果目標係「per IP」限制，就要用 `import time` 同 `time.sleep(1)` 去 throttle，或者輪換 proxy 去留喺封鎖門檻之下 —— 原文指出：**即使延遲一秒，都仍然可以每小時試 3,600 條密碼，一個 10,000 條嘅清單一晚就跑完。**

> ⚠️ 教材外補充：原文嘅「Try it」練習 —— 將 `tools/brute.py` copy 成 `my_brute.py`，載入自己嘅 `wordlist.txt`，喺 loop 入面加 `time.sleep(0.5)`，再跑。然後將成功偵測改成另一個 marker（例如回應頁面出現 `logout` 一字），睇吓成功偵測點樣要跟每個應用嘅字眼去調整。



#### 4.3.6 §6 `tools/brute.py` 行為對照表

將原文對 `tools/brute.py` 嘅描述整理成表，方便溫習：

| 元素 | 原文寫法／行為 | 作用 |
|---|---|---|
| HTTP library | `import requests` | 發 HTTP request，等同瀏覽器 |
| 收割用戶名 | `requests.get(.../api/users.php)` | 自動取得有效用戶名（step 1 腳本化） |
| 提交猜測 | `requests.post(.../login.php, data={'username': user, 'password': pwd})` | form-encoded，同瀏覽器表單一致 |
| 逾時 | `timeout=10` | 防止單一 request 永久 hang |
| 目標設定 | `BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8080'` | 可改攻其他 host 而唔使改 code |
| 猜測迴圈 | `for user in users:` / `for pwd in PASSWORDS:` | nested loop，所有 brute-force 工具核心 |
| 成功偵測 | `'Welcome back' in r.text` 或 `r.url.endswith('/index.php')` | 命中就印 `[+] CRACKED` 並 break |
| 失敗輸出 | Python `for...else` → `[-] No match` | 只為整個清單都失敗嘅用戶印 |
| Rate-limit 繞過 | 每次 `requests.post()` 冇 cookie jar | 每 request 新 session，鎖定失效 |
| 需要時延遲 | `import time` + `time.sleep(1)` | per-IP 限制時 throttle（一小時仍可試 3,600 條） |

> ⚠️ 教材外補充：記住「**掃描器邏輯 = 迴圈 + 成功判斷**」。任何 brute-force 工具（Hydra、Burp Intruder、自寫 Python）都由呢兩部分組成；差異只在「點知成功」—— 有啲睇 HTTP 302、有啲睇回應長度、有啲睇特定字串（例如原文練習提到嘅 `logout`）。

---

## 🛠️ 5. 逐節實戰步驟（Try it yourself — Walkthrough）

> ⚠️ 教材外補充：靶場 app（政府入口網站 PHP + SQLite）**喺課程網站嘅 VM 度，唔喺你本機**。所以以下所有 `http://localhost:8080/...` 路徑，都要喺**你自己嘅 lab 環境**（VM／容器）入面開；如果你喺攻擊機度，要將 `localhost` 換成 lab 主機嘅可達位址。原文提供嘅 URL／參數／payload 一律一字不改。

### 5.1 §1 CAPTCHA Bypass 實戰

原文步驟「1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6」順序：

**Step 1 — 打開註冊頁，確認 CAPTCHA 存在。**
- 做乜：喺 Firefox 打開 `http://localhost:8080/register.php`，確認見到挑戰題。
- 喺邊度睇：頁面中央嘅 “Create an Account” 表單。
- 預期結果：表單顯示一條簡單數學題（原文示例係 `"what is 10 + 4?"`）同一個 “Anti-bot check” 輸入框。
- 分辨：見到題目同輸入框 = 有 CAPTCHA（真用戶會去解，但你要查嘅係「伺服器係唔係真係檢查答案」）。
> **圖示描述**：註冊表單畫面，標題為 “Create an Account”，有一行 “Anti-bot check” 嘅數學挑戰題（如 “what is 10 + 4?”）同一個 CAPTCHA 輸入框。（原教材截圖，本筆記不轉載圖片）

**Step 2 — 提交前先睇頁面原始碼。**
- 做乜：右鍵 → `View page source`。可以直接喺瀏覽器讀 `http://localhost:8080/register.php`，或者用 `view-source:http://localhost:8080/register.php` 睇未 render 嘅版本。
- 喺邊度睇：HTML 原始碼。
- 預期結果：**留意有咩係冇嘅** —— 冇 `<script>` block、冇 inline event handler、冇 `fetch()` 呼叫，即係呢一頁**完全冇 JavaScript 驗證**，唔存在「喺瀏覽器度繞過」嘅嘢。**再留意有咩係有嘅** —— 表單 post 去 `/register.php`，而喺可見嘅 captcha 輸入框下面，伺服器將答案送畀每個訪客（即 4.1.3 嗰段 hidden field + DEBUG comment）。
- 分辨：原始碼出現 `captcha_answer` 隱藏欄位或 `DEBUG` comment = 答案已洩漏。
> **圖示描述**：頁面原始碼，見到可見 captcha 輸入框下面有一段 `<!-- VULNERABLE ... -->` 註釋、一個 `<input type="hidden" name="captcha_answer" value="12">`、以及 `<!-- DEBUG: captcha answer is 12 -->` 註釋。（原教材截圖，本筆記不轉載圖片）

**Step 3 — 控制測試：交一個錯答案。**
- 做乜：填齊所有欄位，喺 CAPTCHA 格打一個錯值（原文示例 `9999`，當時題目係 `"8 + 6"`），撳 `Register`。
- 喺邊度睇：回應頁面。
- 預期結果：伺服器將你嘅輸入同 hidden `captcha_answer` 欄位比較，**拒絕**註冊；頁面 reload 並顯示錯誤 `Incorrect CAPTCHA.`，**冇帳號被建立**。
- 分辨：見到 `Incorrect CAPTCHA.` = 確認挑戰**真係有被檢查**；而家嘅目標就係繞過呢個檢查。
> **圖示描述**：註冊頁重新載入後頂部顯示紅色錯誤訊息 “Incorrect CAPTCHA.”，表單未被接受。（原教材截圖，本筆記不轉載圖片）

**Step 4 — Bypass 1：交洩漏嘅答案。**
- 做乜：打開頁面原始碼，copy hidden `captcha_answer` 欄位嘅值（或者 `<!-- DEBUG -->` comment 入面個數字）落 CAPTCHA 格，撳 `Register`。
- 喺邊度睇：回應頁面。
- 預期結果：伺服器接受，帳號被建立 —— **你從來冇解過條題**，你只係讀咗伺服器送畀你瀏覽器嘅答案。頁面出現綠色 banner `Account created. You can now log in.`。
- 分辨：見到綠色 `Account created. You can now log in.` = Bypass 1 成功。
> **圖示描述**：註冊成功後頁頂顯示綠色橫幅 “Account created. You can now log in.”。（原教材截圖，本筆記不轉載圖片）

> ⚠️ 教材外補充：原文提醒 —— **題目同洩漏值每次載入頁面都會變**，所以你見到嘅一定同截圖唔同；但答案永遠喺提交之前就讀得到（即原文嘅 Screenshots 11 同 15 所示）。
> **圖示描述**：註冊頁原始碼截圖（原文 Screenshot 11），顯示某一次頁面載入下嘅數學題同 hidden `captcha_answer` 值。（原教材截圖，本筆記不轉載圖片）
> **圖示描述**：另一頁載入下嘅註冊頁原始碼（原文 Screenshot 15），題目同 hidden `captcha_answer` 值同上一張唔同，證明每次載入都重新生成。（原教材截圖，本筆記不轉載圖片）

**Step 5 — Bypass 2：發一個完全冇 CAPTCHA 欄位嘅原始 POST。**
- 做乜：喺 Burp Repeater（經 `Intercept` 或 `HTTP history` 捕獲 POST，再 `Send to Repeater`；或者用 Firefox DevTools → `Edit and Resend`），只 POST `username`、`full_name`、`email`、`password` 去 `/register.php`，**完全略去 `captcha` 同 `captcha_answer`**。
- 喺邊度睇：Repeater 嘅 response pane。
- 預期結果：腳本用 `$_POST['captcha'] ?? ''` 讀兩個欄位，所以**缺失參數變成兩個空字串** —— 而 `'' !== ''` 係 false，所以檢查通過、帳號被建立。伺服器**從不**因為 CAPTCHA 資料缺失而拒絕；回應照樣含有 `"Account created. You can now log in."`。
- 分辨：即使冇提供 CAPTCHA 答案，回應仍是 `Account created. You can now log in.` = Bypass 2 成功。
> **圖示描述**：Burp Repeater 畫面，request body 只含 `username`、`full_name`、`email`、`password` 四個參數（冇 captcha 欄位），response 顯示 “Account created. You can now log in.”。（原教材截圖，本筆記不轉載圖片）

**Step 6 — Bypass 3：繞過寫死嘅 backdoor（magic word）。**
- 背景：頭兩個 bypass 都係濫用「伺服器送咗去瀏覽器嘅資料」。Bypass 3 **完全唔需要洩漏**：`register.php` 嘅伺服器端檢查入面有一個刻意留低嘅 backdoor —— `strtolower($captcha) !== 'bypass'`，即係接受 magic word `bypass` 做有效 CAPTCHA 答案。喺本 lab，檢查係 server-side PHP 而唔係前端碼，所以 magic word **唔會**出現喺頁面原始碼 —— 你要**靠探測（probing）**去確認，再用 **Burp Suite** 驗證。
- 做乜（原文 4 步）：
  1. **捕獲 request**：喺 Burp Suite 開 `Proxy` 同 `Intercept`，喺 Firefox 提交註冊表單，然後 forward／捕獲去 `/register.php` 嘅 POST。留意邊啲參數帶 CAPTCHA 資料 —— 呢度係 `captcha` 同 `captcha_answer`。
  2. **送去 Repeater**：右鍵 → `Send to Repeater`。
  3. **注入 magic string**：將 `captcha` 嘅值改成 `bypass`，其他參數保持捕獲原狀，即 `captcha=bypass&captcha_answer=12`。第二個條件（`strtolower($captcha) !== 'bypass'`）會短路整個檢查。
  4. **撳 Send 睇回應**：顯示 `"Account created. You can now log in."`（或者轉去登入頁）—— 伺服器接受咗 magic word 而唔係真答案。
- 喺邊度睇：Repeater response pane。
- 分辨：`captcha=bypass` 成功，但 `captcha=wrong123` 失敗 —— 先係真正嘅 backdoor 鐵證（見下）。
> **圖示描述**：Burp Repeater 顯示 request body 為 `captcha=bypass&captcha_answer=12&...`，response 顯示 “Account created. You can now log in.”。（原教材截圖，本筆記不轉載圖片）

**Step 6b — 確認係 backdoor，唔係巧合。**
- 做乜：用 `captcha=wrong123` 重發同一條 request。
- 預期結果：註冊**失敗**，因為伺服器將值同洩漏嘅答案比較 —— 只有**真答案**或者 **magic word `bypass`** 被接受。回應顯示 `"Incorrect CAPTCHA."`。
- 分辨：`bypass` 通、`wrong123` 唔通 = 證明 `bypass` 係刻意 backdoor，唔係撞彩。

> ⚠️ 教材外補充：原文提醒「硬編碼 bypass 可唔可以喺 `View page source` 搵到，取決於檢查喺邊度行」。兩條路：（1）**前端可見** —— 喺 HTML／JavaScript 搵 `if (answer === "bypass")` 之類嘅 magic comparison string、帶 bypass token 嘅 hidden field（例如 `<input type="hidden" name="captcha_bypass" value="1">`）、或者 short-circuit 驗證嘅 JavaScript（例如 `if (val === 'skip') { form.submit(); }`）。（2）**靠 probing** —— 當檢查係 server-side（如本 lab），backdoor 唔會喺頁面原始碼；發候選 magic word（`bypass`、`skip`、`test`、`admin`）去挑戰欄位，觀察回應 —— 每次都通過嗰個字就係 backdoor。（以上 HTML 片段屬原文引用，原文如此。）

### 5.2 §2 Email Bomb 實戰

原文步驟「1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6」順序：

**Step 1 — 打開忘記密碼頁，提交一次。**
- 做乜：打開 `http://localhost:8080/forgot.php`，提交表單一次。
- 喺邊度睇：表單本身。
- 預期結果：`Send Reset Link` 按鈕變灰（disabled），並顯示訊息 `"A reset email has already been requested. Please wait 30 seconds."`。
- 分辨：按鈕變灰 + 倒數訊息 = **前端**有做咗限制（但唔代表伺服器有）。
> **圖示描述**：忘記密碼表單，`Send Reset Link` 按鈕變成不可按（變灰），下方出現 “A reset email has already been requested. Please wait 30 seconds.” 訊息。（原教材截圖，本筆記不轉載圖片）

> **圖示描述**：同一頁面另一個角度，顯示倒數計時或已禁用狀態。（原教材截圖，本筆記不轉載圖片）

**Step 2 — 確認計時器只存在於瀏覽器。**
- 做乜：右鍵 → `View page source`。
- 喺邊度睇：HTML／JavaScript 原始碼。
- 預期結果：計時器**完全**喺 JavaScript 度：佢將上次提交時間存喺 `localStorage`，而送往伺服器嘅 POST body **只有 `email` 一個欄位**。**冇**伺服器端 token、**冇** session counter、**冇** rate-limit cookie。
- 分辨：原始碼只見 JS localStorage 邏輯、POST 只有 `email` = 限制只在瀏覽器，伺服器完全冇跟。
> **圖示描述**：頁面原始碼截圖，可見 JavaScript 將上次提交時間寫入 `localStorage`，及一段時間判斷邏輯；並見表單 POST 只帶 `email` 欄位，無任何伺服器端 token 或 counter。（原教材截圖，本筆記不轉載圖片）

**Step 3 — 用直接 POST 繞過前端計時器。**
- 背景：伺服器從不執行 30 秒延遲，所以每次重播 POST 都會觸發另一封重設 email。喺 Burp Suite 落手：
  1. 開 Burp Suite，喺內置瀏覽器（或任何經 Burp proxy 嘅瀏覽器）載入 `http://localhost:8080/forgot.php`。
  2. 提交表單一次，然後喺 `Proxy → HTTP history` 搵到捕獲嘅 `POST /forgot.php`。
  3. 右鍵 → `Send to Repeater`。
  4. 喺 Repeater tab 撳 `Send`。
- 喺邊度睇：Repeater response pane。
- 預期結果：`200 OK`，response body 顯示 `"Sent 1 reset email(s)"`。
- 分辨：收到 `200 OK` + `Sent 1 reset email(s)` = 伺服器接受咗重播。
> **圖示描述**：Burp Repeater 顯示 `POST /forgot.php` 的 request，response 為 `200 OK` 且 body 含 “Sent 1 reset email(s)”。（原教材截圖，本筆記不轉載圖片）

**Step 4 — 連撳多次 Send。**
- 做乜：喺瀏覽器按鈕仍然 disabled 嘅同時，喺 Repeater 再撳 `Send` 幾次。
- 預期結果：每個 request 都被接受，**冇延遲、冇錯誤**。
- 分辨：次次都 200、冇 rate-limit 訊息 = 真正冇鎖。
> **圖示描述**：Burp Repeater 連續送出同一條 POST，每次都返回 `200 OK`、無延遲訊息。（原教材截圖，本筆記不轉載圖片）

**Step 5 — 去內部郵件佇列確認。**
- 做乜：打開 `http://localhost:8080/webmail.php`（**無需登入** —— 呢個係 app 嘅內部郵件檢視，§2.2 亦會用到）。
- 預期結果：確認**每個 request 都有一封重設 email** 到達。
- 分辨：request 次數 == email 封數 = 一發一投，冇 dedupe（去重）。

**§2.1 — 自動化大量 flooding（Flooding multiple requests automatically）**
- 背景：一次一吓撳 Send 太慢、唔夠規模。Burp Suite **Intruder** 可以自動重播同一條 `POST /forgot.php`，幾秒內送出幾十封重設 email。原文步驟：
  1. 右鍵捕獲到嘅 `POST /forgot.php`，揀 `Send to Intruder`。
  2. 保持 `email=victim@example.com` 做**唯一** payload position（用 `§` 標記）。
  3. 喺 `Payloads` tab，將 payload type 設為 `Numbers`，配置由 `1` 到 `50`、step 為 `1` 嘅清單。
  4. 撳 `Start attack`。Intruder 送出 **50 條** 相同 POST。

> ⚠️ 教材原文如此（原文自相矛盾）：原文同時講「唯一 payload position 設喺 `email` 值」同「payload type = `Numbers` 由 1 到 50」。技術上 `Numbers` 會**逐個取代**該 position 嘅值（即 email 會變成 `1`、`2`…），所以「50 條完全相同的 POST」呢個描述本身唔成立。實務要 flood：把 position 放喺一個**無關**參數（或直接 loop 重播同一條 request），email 值保持唔變。
- 預期結果：每個 request 都返回 `200 OK`，幾秒內有大約 50 封重設 email 到收件箱。（原文補充：喺 loop 度重複 Repeater request 都達到同樣效果。）
- 分辨：Intruder 結果表 50 行全部 200、收件箱暴增 = 成功。
> **圖示描述**：Burp Intruder 的結果表，50 行 payload 幾乎全部返回 `200 OK`，收件箱隨即出現大量重設郵件。（原教材截圖，本筆記不轉載圖片）

> ⚠️ 教材外補充：原文交代 lab 嘅 mail server 係 Docker container（**`hkgov-mail`**，由 `mail/` folder build），行 **Postfix** 同 **Dovecot**，**Roundcube webmail** 喺 **port 8081**。呢條 pipeline 冇任何 rate limiting，所以每個被接受嘅 POST 都會變成另一封已派遞訊息 —— 呢句解釋咗「為何 Intruder 一打就中」。

**§2.2 — 用分號放大單一 request（Multiply emails with semicolons in a single request）**
- 背景：伺服器會將 `email` 值按 `;` 切開，向**每個**收件人（連重複）寄重設 email，所以**一個 POST** 就可以淹沒一個收件箱。原文 Postman 步驟：
  1. 開 Postman，撳 `New → HTTP Request`。
  2. Method 設 `POST`，URL 設 `http://localhost:8080/forgot.php`。
  3. 打開 `Body` tab，揀 `x-www-form-urlencoded`（或 `form-data`），加一個 key 叫 `email`。
  4. Value 設成分號分隔、**無空格**嘅地址清單，例如 `victim@example.com;victim@example.com;victim@example.com;…`。
  5. 撳 `Send`。Response body 會報 `Sent N reset email(s)`，其中 **N 等於你清單嘅地址數目**。
  6. 再撳 `Send` 重複 flood，睇住 `http://localhost:8081` 嘅收件箱爆滿。
- 替代做法（原文如此）：喺 Burp Repeater，將 body 設為 `email=victim@example.com;victim@example.com;…` 再撳 `Send` —— 回應計法一樣。
- 分辨：`Sent N reset email(s)` 嘅 N == 你清單長度 = delimiter injection 成功。
> **圖示描述**：Postman 畫面，method `POST`、URL 為 `http://localhost:8080/forgot.php`。（原教材截圖，本筆記不轉載圖片）
> **圖示描述**：Postman Body tab，`x-www-form-urlencoded`，key `email` 的值為一串用分號分隔、無空格的 `victim@example.com` 地址。（原教材截圖，本筆記不轉載圖片）
> **圖示描述**：Postman response body 顯示 “Sent N reset email(s)”，N 等於分號清單中的地址數目。（原教材截圖，本筆記不轉載圖片）
> **圖示描述**：Burp Repeater 替代做法，body 為 `email=victim@example.com;victim@example.com;…`，response 以相同方式計數。（原教材截圖，本筆記不轉載圖片）

**§2.2 Step 2 — 喺瀏覽器確認派遞。**
- 做乜：有兩個地方睇同一個 flood —— 打開 `http://localhost:8080/webmail.php`（app 內部郵件佇列，**故意留空唔使認證**）或者登入 `http://localhost:8081` 嘅 Roundcube。
- 預期結果：兩邊都顯示大量寄去 `victim@example.com` 嘅 `"Password reset request"` 訊息，全部喺幾秒內送達。
- 分辨：見到幾十封同一標題嘅重設信 = 派遞確認。
> **圖示描述**：webmail／Roundcube 收件箱畫面，塞滿大量 “Password reset request” 郵件，全部寄往 `victim@example.com`。（原教材截圖，本筆記不轉載圖片）

**§2 結論（原文 Conclusion）**：應用程式依賴 JavaScript 計時器同禁用按鈕去限制提交，但伺服器**唔執行任何 rate limit、唔去重地址、亦唔驗證所有權**。單一 POST 可以帶好多個分號分隔嘅收件人，重複 POST 亦被無延遲接受。

### 5.3 §6 Unlimited Brute Force 實戰

原文步驟「1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6 ➔ 7 ➔ 8」順序：

**Step 1 — 發現洩漏用戶名嘅公開 API。**
- 做乜：喺 Firefox 地址欄直接開 `http://localhost:8080/api/users.php`（或者喺 Burp Suite 將經 `Intercept` 捕獲嘅 `GET /api/users.php` 送去 Repeater，撳 `Send` 喺 response pane 睇 JSON）。
- 喺邊度睇：瀏覽器或 Repeater response。
- 預期結果：返回一個 **JSON array of login usernames**，**無需認證**。留意用戶名例如 `admin`、`john.doe`、`mary.wong`。呢個清單就係暴力破解嘅起點；response 顯示一個 JSON array，含 **usernames、full names、emails、roles**。
- 分辨：JSON 出現帳號清單 = 已收割到有效用戶名。
> **圖示描述**：瀏覽器／Burp Repeater 顯示 `/api/users.php` 回傳的 JSON 陣列，內含用戶名、全名、email 與 role，無需登入。（原教材截圖，本筆記不轉載圖片）

**Step 2 — 由 staff directory 收割更多用戶名。**
- 做乜：喺 Firefox 開 `/staff.php`。頁面列出 staff 並喺 HTML 曝露用戶名。右鍵 → `View page source`，用 `Ctrl+F` 搜尋 `username` 或 `data-username`。
- 喺邊度睇：頁面同原始碼。
- 預期結果：頁面原始碼喺 directory table 印出每位 staff 嘅 login 用戶名（例如 `john.doe`）—— 更多名加落候選清單。（原文亦提供一張「用戶名常見洩漏位置」表，見 4.3.3。）
- 分辨：原始碼搵到 `username`／`data-username` = 更多有效帳號。
> **圖示描述**：`/staff.php` 頁面原始碼，staff directory 表格中印出各員工的用戶名（例：`john.doe`）。（原教材截圖，本筆記不轉載圖片）

**Step 3 — 用 forgot-password 端點確認用戶名列舉。**
- 做乜：`/forgot.php` 而家個表單問 email，但伺服器基於**向後兼容**仍然接受 `username` 參數。喺 Firefox 開 `/forgot.php` 並喺 Burp proxy 攔截下提交表單，右鍵捕獲到嘅 `POST /forgot.php`，揀 `Send to Repeater`。喺 Repeater 將 body 嘅 `email=...` 參數換成 `username=notauser`（**保持 Content-Type header 不變**），撳 `Send`。然後將 body 改成 `username=john.doe` 再撳 `Send`。
- 喺邊度睇：Repeater response。
- 預期結果：`username=notauser` 回應 `Username not found.`；`username=john.doe` 回應有寄出重設 email 嘅訊息（`Sent 1 reset email…`）。兩個唔同回應，確認邊啲用戶名存在。
- 分辨：兩者回應唔同 = 可以喺猜密碼之前就確認帳號存在。
> **圖示描述**：Burp Repeater 兩次請求對比：`username=notauser` 回 “Username not found.”，`username=john.doe` 回 “Sent 1 reset email…”。（原教材截圖，本筆記不轉載圖片）

**Step 4 — 用 verbose login error 確認用戶名列舉。**
- 做乜：喺 `/login.php`，先提交一個唔存在嘅用戶名，再提交一個有效用戶名 + 錯密碼。
- 喺邊度睇：登入頁錯誤訊息。
- 預期結果：程式分辨「唔存在用戶名」（`Username not found.`）同「錯密碼」（`Password incorrect.`）—— 捏造嘅用戶名回 `Username not found.`，有效用戶名配錯密碼回 `Password incorrect.`，兩種情況可區分。
- 分辨：兩種錯誤字眼唔同 = 可列舉有效帳號。
> **圖示描述**：登入頁先後顯示 “Username not found.” 與 “Password incorrect.” 兩種不同錯誤訊息。（原教材截圖，本筆記不轉載圖片）

**Step 5 — 觸發暴力破解保護，然後繞過它。**
- 先觀察鎖定：喺 `/login.php`，輸入已知用戶名（例如 `john.doe`），反覆提交錯密碼。**同一個瀏覽器 session 失敗五次之後**，頁面顯示 `Too many failed attempts. Please try again later.`。呢個保護綁喺你嘅 **session cookie**，而瀏覽器一直帶住佢。
- 再繞過：喺 Burp Suite 捕獲 `POST /login.php` 並送去 Repeater。將同一條錯密碼 request 送出**多於五次**，每次都**刪走 `Cookie` header**。因為伺服器見唔到 session cookie，佢會為**每個 request 開一條新 session**，計數器永遠到唔到五 —— 保護被繞過：第六次同之後嘅「無 cookie」request 都被正常評估，而 `"Too many failed attempts"` 錯誤**無論重發幾多次都唔會再出現**。
- 分辨：帶 cookie 第 5 次後見鎖定；唔帶 cookie 永遠唔見鎖定 = 繞過成立。

**Step 6 — 用 Burp Intruder 大規模執行同一個繞過。**
- 做乜：將 `POST /login.php` 送去 Intruder。喺 `Positions` tab 撳 `Clear §` 清走預設標記，再喺 body 揀 username 值同 password 值，各撳一次 `Add §`，令 body 變成 `username=§admin§&password=§x§` —— **兩個 payload 位置**。因為兩個位置需要兩份唔同 payload 清單，將 attack type 設為 **Cluster bomb**。喺 `Payloads` tab，payload set 1 載入收割到嘅用戶名（例如 `admin`、`john.doe`、`mary.wong`），payload set 2 載入一份細嘅密碼 wordlist —— Burp 會喺開始前報告總 request 數。
- 關鍵：呢條 request **唔帶 `Cookie` header**，所以每次猜測都開一條新 session，鎖定永遠唔會觸發。
- 預期結果：撳 `Start attack`，結果表逐步填滿 —— **錯密碼返回 `200` 同同一版錯誤頁；唯一正確嘅猜測返回 `302` 而且長度唔同** —— 狀態碼同長度嘅差異即時揭示有效配對。
- 分辨：喺結果表搵「302 + 長度唔同」嗰一行 = 命中。
> **圖示描述**：Burp Intruder Positions tab，body 為 `username=§admin§&password=§x§`，兩個 payload 位置，attack type 為 Cluster bomb。（原教材截圖，本筆記不轉載圖片）
> **圖示描述**：Burp Intruder Payloads tab，payload set 1 為收割到的用戶名清單、payload set 2 為小型密碼 wordlist。（原教材截圖，本筆記不轉載圖片）

**Step 7 — 用 lab 嘅暴力破解腳本自動化攻擊。**
- 做乜：同一個繞過已經實作喺 `tools/brute.py`，佢為每次猜測輪換一條新 session（可選 base URL 參數，預設 `http://localhost:8080`）。喺 lab 目錄嘅 terminal：
```
python3 tools/brute.py
```
- 喺邊度睇：terminal 輸出。
- 預期結果：腳本先由 `/api/users.php` 收割用戶名，再逐個對內置 wordlist 試。每次猜測都用新 session，所以五次鎖定永遠唔觸發 —— 預期見到一行 harvest，然後每個被破解帳號一行 `[+]`。原文示例輸出：
```
[*] Harvested 5 usernames from /api/users.php
[+] CRACKED: admin / 123qwe!@#
[+] CRACKED: john.doe / Welcome2024
[+] CRACKED: mary.wong / Qwerty123
[+] CRACKED: civil_svc / Summer2024
[+] CRACKED: it.helpdesk / Helpdesk1
```
- 分辨：見到 `[+] CRACKED: <user> / <password>` = 成功破解該帳號。
> **圖示描述**：terminal 執行 `python3 tools/brute.py` 的輸出，先顯示 harvest 行，再逐個帳號顯示 `[+] CRACKED` 及密碼。（原教材截圖，本筆記不轉載圖片）

**Step 8 — 用破解到嘅憑證登入確認。**
- 做乜：喺瀏覽器登入表單輸入一對破解到嘅憑證（例如 `john.doe / Welcome2024`）。然後瀏覽 `/profile.php`，確認 profile 顯示該用戶名。
- 預期結果：登入成功（出現 `Welcome back` banner），`/profile.php` 以 `john.doe` 招呼你 —— 證明「無限猜測」產生咗一個可用 session。
- 分辨：`Welcome back` + profile 顯示目標用戶名 = 初始存取成功。
> **圖示描述**：登入後 `/profile.php` 頁面以 `john.doe` 招呼使用者，證明以破解憑證取得有效 session。（原教材截圖，本筆記不轉載圖片）

**§6 結論（原文 Conclusion）**：login 端點回傳 verbose error 令用戶名可被列舉，forgot-password 頁確認有效用戶名，密碼以 plaintext 儲存，而 rate limit 只綁 session cookie，所以可以靠發無 cookie 嘅 HTTP request 繞過。一旦保護被繞過，無限猜測好快就成功。


### 5.4 三個 walkthrough 嘅共通檢核點

做完三個實戰步驟之後，用呢張表自我核對（全部係教材外補充嘅檢查習慣）：

| 檢核項 | §1 CAPTCHA | §2 Email Bomb | §6 Brute Force |
|---|---|---|---|
| 有冇先做「控制測試」確認漏洞存在？ | 交錯答案見 `Incorrect CAPTCHA.` | 交一次見倒數＋按鈕變灰 | 交錯密碼見鎖定 |
| 有冇繞過前端？ | Direct POST / Repeater | 重播 POST 唔經按鈕 | 刪 `Cookie` header |
| 有冇放大到規模？ | 可批量註冊 | Intruder 50 次／分號放大 | Intruder Cluster bomb／`brute.py` |
| 有冇喺「另一個介面」確認效果？ | response 見 `Account created.` | `webmail.php`／Roundcube port 8081 | `/profile.php` 見登入用戶名 |
| 失敗點係咩？ | 紅色 `Incorrect CAPTCHA.` | 429／叫你稍後再試 | `Too many failed attempts` |

**共通心法**：原文三個 walkthrough 都跟同一個節奏 —— **觀察 → 控制測試 → 繞過 → 放大 → 確認**。呢個節奏本身就係紅隊驗證漏洞嘅標準流程，值得當口訣背落去。

---

## 🧩 6. 新手補充：零經驗專用講解

> ⚠️ 教材外補充：本節全部內容（除標明「原文如此」者）係為零實戰經驗學生補嘅，教材本身冇。

### 6.1 §1 CAPTCHA——零經驗講解

**為何呢個漏洞會存在（日常比喻）**：想像一間銀行，職員喺櫃檯問你「先生你叫咩名？」，然後**自己喺紙上寫低答案**遞畀你，再叫你照讀返出嚟核對。呢個「核對」有意義嗎？冇 —— 因為答案係佢畀你嘅。CAPTCHA 洩漏到 hidden field 就係同一回事：伺服器出題、同時將標準答案交畀你，你再「答」返，佢就話你過關。**問題唔係密碼太弱，而係檢查嘅兩邊都由你控制。**

**呢一步喺瀏覽器同伺服器之間實際發生咩事**：你打開 `/register.php` → 伺服器行 PHP，生成一條數學題（例如 9+3），**同時**將正確答案（12）放喺 hidden field `captcha_answer` 同 `<!-- DEBUG -->` comment 度，再將整頁 HTML 送回你 → 你（或腳本）提交時，`captcha` 填你嘅答案、`captcha_answer` 填你手上嗰個洩漏值 → 伺服器只需比較「兩個由你提供嘅字串」，`12 === 12`，於是不論你識唔識計，都過關。

**新手最常撞嘅 3 個卡點同解決方法**：
1. **「我搵唔到 hidden field」** —— 唔好用肉眼睇 render 出嚟嘅頁面，一定要 `View page source` 或者 `view-source:`；用 `Ctrl+F` 直接搜 `captcha_answer`、`hidden`、`DEBUG`。
2. **「我填咗洩漏答案都話錯」** —— 因為題目同答案**每次載入都會重新生成**。你要喺**同一次載入**度讀答案同提交；如果你換咗 tab 或 reload 咗，答案就變咗。
3. **「Burp Repeater 送出去，但係 request body 唔啱」** —— 記住 Content-Type 要係 `application/x-www-form-urlencoded`，而 body 係 `key=value&key=value`；`captcha=bypass` 亦唔好加多餘空格。

**點樣判別成功／失敗**：成功 = 頁面出現綠色 `Account created. You can now log in.`，或者 response 有 `Account created` 字樣；失敗 = 紅色 `Incorrect CAPTCHA.`。Bypass 3 嘅鐵證係：`captcha=bypass` 通、`captcha=wrong123` 唔通 —— 同一條 request 只換一個字，結果相反，就證明係 backdoor。

### 6.2 §2 Email Bomb——零經驗講解

**為何呢個漏洞會存在（日常比喻）**：公司派咗個實習生守門口，規定「一分鐘只可以入 10 個人」——但佢只係企喺大門前，唔識數後面條後巷；任何人由後巷入，佢都攔唔到。前端 JavaScript 計時器就係呢個實習生：佢只擋「用瀏覽器撳按鈕」嘅人；攻擊者直接行 POST（後巷）就完全繞過。而「用分號塞多個收件人」，就好似表格「收件人」一格你填咗十個人名用分號隔開，郵差照樣逐個派。

**呢一步喺瀏覽器同伺服器之間實際發生咩事**：你撳 `Send Reset Link` → 瀏覽器嘅 JS 將「上次提交時間」寫入 `localStorage`、停用按鈕、顯示倒數 → 但**真正送出去嘅 POST body 只有 `email` 一個欄位**，冇任何伺服器識得嘅「我已經提交過」標記 → 伺服器收到 POST，就照樣觸發一封重設 email，**完全唔知你有冇倒數**。你喺 Burp Repeater 撳 Send 幾多次，就觸發幾多次。

**新手最常撞嘅 3–4 個卡點同解決方法**：
1. **「我喺瀏覽器撳唔到按鈕」** —— 啱，前端禁咗；解決方法係**喺 proxy 度重播 POST**（Burp Repeater），或者用 `curl`／Postman，唔好死喺個灰色按鈕度。
2. **「Intruder 得一堆 request 但收唔到 email」** —— 檢查 payload position 係唔係淨係 `email=victim@example.com` 嗰個位置（原文要求**唯一** position）；同埋收件箱要去 `http://localhost:8080/webmail.php` 或 `http://localhost:8081` 睇，唔係你本機 email。
3. **「分號清單冇效／只寄一封」** —— 原文要求地址之間**無空格**：寫 `a@x.com;b@x.com`，唔好寫 `a@x.com; b@x.com`（多咗空格可能令第二個地址無效）。
4. **「唔知要幾多封先算成功」** —— 睇 response 嘅 `Sent N reset email(s)`，個 N 就係你清單長度；再對照 webmail 收到幾封。

**點樣判別成功／失敗**：成功 = Repeater 每次 `200 OK`、response 有 `Sent ... reset email(s)`，webmail 收件箱封數持續增加；失敗 = 出現 `429 Too Many Requests`、延遲、或者回應叫你「請稍後再試」（呢啲代表伺服器**真正**有 rate limit）。

### 6.3 §6 Unlimited Brute Force——零經驗講解

**為何呢個漏洞會存在（日常比喻）**：想像一間圖書館，規矩係「同一張借書證，5 次錯密碼就鎖」。但如果你每次都**用一張新借書證**去試，櫃檯就永遠覺得你係「第一次嚟」—— 鎖定規則形同虛設。Session-cookie 綁定嘅 lockout 就係咁：攻擊者每次 request 都唔帶 cookie，伺服器就開一條全新 session，個「5 次」計數器永遠歸零。

**呢一步喺瀏覽器同伺服器之間實際發生咩事**：你登入時，伺服器本身會開一條 session 並喺 response 度發一個 `Set-Cookie`（session ID）。瀏覽器之後每次 request 都自動帶住呢個 cookie，伺服器就認得你、將「失敗次數」記喺呢條 session 度。攻擊者用 Burp Repeater／Intruder 或 Python `requests` 發 request，**故意唔帶 `Cookie` header** → 伺服器每次見到「陌生訪客」，就開新 session、新計數器 → 無限猜落去。

**新手最常撞嘅 4–5 個卡點同解決方法**：
1. **「我明明刪咗 Cookie，點解仲見到鎖定？」** —— 檢查你係喺 **Repeater** 度刪（要逐次手動刪 `Cookie:` 行），定係喺瀏覽器度「清 cookie」（清咗之後下次 request 又會即刻攞返新 cookie，仲要帶住）。要**真係唔帶** cookie 先算數。
2. **「點知邊個用戶名有效？」** —— 靠差異化錯誤：`Username not found.` vs `Password incorrect.`（login），或者 `/forgot.php` 換 `username=` 參數（`Username not found.` vs `Sent 1 reset email…`）。原文強調 `forgot.php` 仲接受 `username` 參數係為咗向後兼容。
3. **「Intruder 要揀邊個 attack type？」** —— 兩個 payload 位置（username + password）就用 **Cluster bomb**；如果只攻擊一個位置（例如密碼）就用 Sniper。原文用 Cluster bomb。
4. **「點睇結果表邊一行先係成功？」** —— 唔好淨係睇 status code 200。**正確嘅一組會係 `302`（轉址去 `/index.php`）而且回應長度唔同**；錯嘅係 `200` 加同一版錯誤頁。用 Burp 嘅 length 欄去 sort 最快。
5. **「Python 腳本執行唔到」** —— 要喺 **lab 目錄**度行 `python3 tools/brute.py`（因為要 import project 結構同讀 API）；原文話可加 base URL 參數攻其他 host。

**點樣判別成功／失敗**：成功 = `tools/brute.py` 輸出 `[+] CRACKED: user / password`，然後用嗰對憑證喺瀏覽器登入見到 `Welcome back`、`/profile.php` 顯示該用戶名；失敗 = 全部 `[-] No match`、或者一直見到 `Too many failed attempts`（代表你嘅 request 仲帶住 cookie）。


### 6.4 三個情境嘅共通新手陷阱（教材外補充）

1. **用瀏覽器做「攻擊」** —— 三個漏洞嘅共同教訓係：攻擊者**唔用你嘅瀏覽器**。你以為禁咗按鈕／冇 JS 就安全，其實前後端嘅界線先係重點。練習時强迫自己用 Burp Repeater 或 `curl` 睇同一條 request。
2. **冇做對照測試就落結論** —— 見到一次「成功」唔代表掌握咗繞過；要做「一正一反」（例如 `captcha=bypass` 成功 vs `captcha=wrong123` 失敗）先能寫入報告。
3. **混淆「狀態碼 200」同「成功」** —— 暴力破解正確嘅一組係 **302**；email bomb 每次 200 只代表「伺服器照收」，唔代表冇限制（要睇有冇 429）。
4. **唔知去邊度睇「伺服器真實反應」** —— 效果唔喺你本機：email 要去 lab 嘅 `webmail.php`／Roundcube 睇，登入要去 `/profile.php` 確認，CAPTCHA 要睇 response body 嘅文字。
5. **忽略資料來源嘅歷史遺留** —— `forgot.php` 仲收 `username` 參數、`/api/users.php` 未認證，呢啲都係「為兼容而留低」嘅痕跡。做偵察時要主動問：「呢個端點係唔係多過佢應該收嘅參數？」

> ⚠️ 教材外補充：以上五點原文冇明講，但係由三個 walkthrough 嘅結構歸納出嚟，屬考試答題同實戰都用得著嘅通用能力。

---

## 💬 7. Student questions 詳解

> ⚠️ 教材外補充：原文只有題目、冇 render 任何答案。以下全部建議答案係教材外補充，英文要點 + 繁中拆解，並附「常見錯答」。
> ⚠️ 教材原文數量說明：本檔涵蓋 §1（4 題）、§2（4 題）、§6（4 題），**合共 12 題** —— source 檔內 §6 實際只有 4 條學生問題（並非任務書面所列嘅「7 條」）。以下逐條照 source 原題號列出，一條不漏。

### 7.1 §1 CAPTCHA Bypass 原題（4 題）

**Q1（§1 原題 1）**
> A registration CAPTCHA is validated only in client-side JavaScript, never on the server. Explain why this is fundamentally insufficient, and describe the request an attacker crafts to register anyway.

> ⚠️ 教材外補充（答案）：**English key points** — Any validation that lives only in JavaScript runs on the attacker's machine, which they fully control; the attacker can disable JS, edit it in DevTools, or skip the browser entirely and send a raw HTTP POST with arbitrary values. **繁中拆解** — 前端驗證嘅致命傷係「判官同犯人係同一部機」：程式喺攻擊者嘅瀏覽器度跑，攻擊者想點改就點改。繞過方法唔係「破解」個驗證，而係**根本唔行佢** —— 用 Burp Suite／`curl` 直接 POST 一個 `captcha` 值（甚至亂填），因為伺服器從冇檢查過，request 照樣成功。考官想聽嘅 point：client-side 唔係 security control，伺服器必須獨立再驗一次。
> **常見錯答**：答「可以用 JavaScript console 改 `isValid = true`」而冇講到「其實連瀏覽器都唔需要，直接發 HTTP request 就得」—— 咁樣會漏咗「伺服器完全冇驗證」呢個核心。

**Q2（§1 原題 2）**
> Even when a CAPTCHA answer is checked server-side, shipping the expected answer to the browser defeats the challenge. Explain how answers leaked through hidden form fields or HTML comments are recovered, and why the check then only stops users who never view the source.

> ⚠️ 教材外補充（答案）：**English key points** — The correct answer is sent to every visitor inside a hidden `captcha_answer` field and repeated in an HTML comment; anyone can recover it with View page source (or `Ctrl+F` for `captcha_answer` / `DEBUG`). Because the server compares the user's input against the client-supplied value, an attacker simply echoes the leaked value and passes. **繁中拆解** — 洩漏途徑有兩個：hidden field（`<input type="hidden" name="captcha_answer" value="12">`）同 HTML comment（`<!-- DEBUG: captcha answer is 12 -->`）。「冇睇原始碼嘅人」係指老實用戶 —— 佢哋會真係去計 9+3；但任何人一睇原始碼就等於拎到答案卡。考官想聽：**檢查嘅兩邊都由 client 提供**，所以個檢查只係「裝飾」。
> **常見錯答**：以為要「解密」或者「用工具挖出」答案 —— 其實答案係 plaintext 直接寫喺 HTML，`View page source` 就見到。

**Q3（§1 原題 3）**
> Describe the correct server-side design for CAPTCHA verification: where the expected answer must be stored, how matching should work, and what the server must do when the CAPTCHA fields are missing or empty.

> ⚠️ 教材外補充（答案）：**English key points** — Store the expected answer in the **server-side session** (`$_SESSION['captcha_answer']`), never render it in HTML/hidden fields/comments; on submission, compare the posted value with the session value and **reject unconditionally** if the session value is missing or the fields are empty; **unset/regenerate** the challenge after every attempt so it is one-shot. **繁中拆解** — 三個要點：（1）**儲存位置** = 伺服器 session，唔可以落 HTML；（2）**比對方式** = `$_POST['captcha'] !== $_SESSION['captcha_answer']`，任何一方唔存在就 reject；（3）**缺失處理** = 用 `!isset()` 明確擋走，唔可以靠 PHP 把空值當空字串而誤通過。再加 per-IP rate limiting。
> **常見錯答**：答「將答案 hash 咗再放 hidden field」—— 咁仍然係 client-side 比較，仲係錯；正確係**完全唔送答案出去**。

**Q4（§1 原題 4）**
> What is a "magic string" backdoor in an input-validation routine, why is it so dangerous in shipped code, and how would you confirm it using an intercepting proxy?

> ⚠️ 教材外補充（答案）：**English key points** — A magic string is a hard-coded value that short-circuits a check, e.g. `strtolower($captcha) !== 'bypass'`; anyone who knows the string passes the challenge even without the real answer, and it survives into production because it looks like ordinary validation code. Confirm it with an intercepting proxy: send the candidate word (`captcha=bypass`) and see it pass every time, then send `captcha=wrong123` and see it fail — a value that always passes is a backdoor, not a coincidence. **繁中拆解** — Magic string 嘅危險在於：（1）**唔需要任何洩漏**就算你睇唔到原始碼都可以靠 probing 撞中；（2）代碼看似正常，code review 易走漏；（3）等於一個「任何攻擊者都知嘅萬能鎖匙」。確認方法：Repeater 先送 `captcha=bypass`（應成功），再送 `captcha=wrong123`（應失敗）—— 一正一反就證明。
> **常見錯答**：只答「改 request 睇下會唔會成功」而冇做**對照測試**（wrong123 應失敗）—— 考官要嘅係「排除巧合」嘅驗證思路。

### 7.2 §2 Email Bomb 原題（4 題）

**Q1（§2 原題 1）**
> A password-reset form enforces its rate limit only in front-end JavaScript — disabling the submit button and showing a countdown. Explain why this cannot stop an attacker, and describe exactly how the limit is bypassed.

> ⚠️ 教材外補充（答案）：**English key points** — A JS timer and disabled button live entirely in the browser; the timer state is stored in `localStorage` and the POST body contains only the `email` field, with no server-side token, session counter or rate-limit cookie. The attacker bypasses it by replaying the raw `POST /forgot.php` in Burp Repeater (or curl/Python/Postman), which the server accepts with `200 OK` and `Sent 1 reset email(s)` each time. **繁中拆解** — 前端限制只影響「用瀏覽器撳按鈕」嘅人；攻擊者根本唔用嗰個按鈕。原文證實 POST body 只有 `email`，所以伺服器冇任何嘢可以分辨「第一次」同「第一百次」。繞過 = 重播 POST。
> **常見錯答**：答「清 localStorage 就可以再撳」—— 呢個只係其中一個繞法，但唔係原文重點；重點係**唔使經瀏覽器**，直接重播 POST。

**Q2（§2 原題 2）**
> What is delimiter injection in a multi-recipient email field, and how does it let a single HTTP request trigger bulk mail delivery? What flawed server-side assumption makes it possible?

> ⚠️ 教材外補充（答案）：**English key points** — The server splits the `email` field on a delimiter such as `;` and sends to every resulting address (including duplicates); putting `victim@example.com;victim@example.com;…` in one field makes a single POST trigger many deliveries — the response reports `Sent N reset email(s)` where N equals the list length. The flawed assumption is that the field contains exactly one address. **繁中拆解** — Delimiter injection 就係「一格塞多個值」。伺服器代碼大概係 `explode(';', $email)` 再逐個寄，於是 N 個地址 = N 封 email，一封 request 做咗 N 次功。成因：伺服器假設「一個 email 欄位 = 一個收件人」，冇驗證、冇去重、冇 owner 確認。
> **常見錯答**：只答「可以一次寄多封」而冇指出**根本假設**（一個欄位只載一個地址）—— 考官要聽成因，唔止現象。

**Q3（§2 原題 3）**
> Which server-side controls genuinely reduce email-flooding risk? Name at least two, and explain why each must be enforced on the server rather than in the browser.

> ⚠️ 教材外補充（答案）：**English key points** — （1）**Server-side rate limiting** per account/recipient/IP；（2）**Address deduplication / single-recipient validation**（唔接受分號等多收件人）；（3）**Ownership verification**（只向已驗證帳號寄）；亦可加 CAPTCHA 同異常偵測。全部必須喺伺服器做，因為任何前端控制都可以被繞過（重播／改 request）。**繁中拆解** — 原文結論點名三個缺陷：冇 rate limit、冇 dedupe、冇查驗所有權。所以對應修法就係喺伺服器補返呢三樣。點解一定要伺服器做？因為攻擊者唔會用你嘅瀏覽器 —— 佢用 Burp/curl，前端限制對佢零作用。
> **常見錯答**：答「加 JavaScript 倒數 + 禁用按鈕」—— 呢個正正係原文示範嘅錯誤做法。

**Q4（§2 原題 4）**
> Explain how an intercepting proxy turns one captured request into an automated high-volume attack. Which configuration choices — payload type, request count, session-cookie handling — decide whether the flood succeeds?

> ⚠️ 教材外補充（答案）：**English key points** — The proxy captures one valid `POST /forgot.php`; sending it to Intruder lets you replay it N times by placing a payload position on `email` and setting payload type to **Numbers** (from 1 to 50, step 1). Whether it works depends on: payload type and count (Numbers 1–50), leaving the correct single payload position, and session-cookie handling — if the server rate-limited per session, you would need to drop or rotate the cookie to keep going. **繁中拆解** — 攔截代理嘅價值 = 「一條成功 request 範本 + 自動重播」。原文設定：唯一 payload position 喺 `email=victim@example.com`、payload type `Numbers`、1 到 50、step 1。成功關鍵：（1）payload type 揀啱（唔係亂掟 wordlist）；（2）request 數目；（3）cookie 處理 —— 如果伺服器綁 session 做速率限制，就要刪 cookie 或者輪換 session。
> **常見錯答**：以為 Intruder 一定要用「密碼清單」類 payload —— 呢度其實用 **Numbers** 就得，因為重點係「重播次數」而唔係「試唔同值」。

### 7.3 §6 Unlimited Brute Force 原題（4 題）

**Q1（§6 原題 1）**
> Why do public staff directories and unauthenticated user-listing APIs reduce the cost of credential attacks so dramatically? Explain what they hand the attacker and how that changes the strategy from blind guessing to targeted attack.

> ⚠️ 教材外補充（答案）：**English key points** — They hand the attacker a list of **valid usernames** (`/staff.php`, `/api/users.php`) plus extra context (full names, emails, roles); brute force normally needs a username list, so with one the attack becomes targeted rather than blind. The search space collapses from (all usernames × all passwords) to (known usernames × passwords), and guesses can be focused on known accounts. **繁中拆解** — 冇用戶名清單，暴力破解係「大海撈針」；有咗清單，就係「逐個門牌去試」。原文仲示範由 email local-part（`john.doe@gov.hk`）、`data-username` 屬性、JSON 端點等多處收割，令攻擊成本劇降。
> **常見錯答**：只答「多咗資料」而冇解釋**策略改變**（由 blind 變 targeted）同**搜尋空間縮小**。

**Q2（§6 原題 2）**
> What is user enumeration via differential error responses? Explain why distinct "username not found" versus "wrong password" messages — including legacy parameters kept for backwards compatibility — let an attacker confirm valid accounts before spending a single password guess.

> ⚠️ 教材外補充（答案）：**English key points** — User enumeration means inferring which accounts exist from differing responses. `/login.php` returns `Username not found.` for a bogus user but `Password incorrect.` for a valid user with a wrong password; `/forgot.php` still accepts a legacy `username=` parameter, returning `Username not found.` vs `Sent 1 reset email…`. These two distinct responses confirm existence without a single password guess. **繁中拆解** — 差異化錯誤 = 「程式不小心講咗真話」。正確做法係回傳**一律相同**嘅通用錯誤。向後兼容參數（forgot.php 仲收 username）令列舉多咗一條路，係常見嘅實際遺留漏洞。
> **常見錯答**：只講 login 頁嘅錯誤，漏咗 `/forgot.php` 嘅 **legacy username 參數**呢條路 —— 原文明確點出。

**Q3（§6 原題 3）**
> A brute-force lockout stores its attempt counter in server-side session state keyed by the session cookie. Explain why this design fails, what the attacker does to reset the counter on every request, and what a robust rate limit must be tied to instead.

> ⚠️ 教材外補充（答案）：**English key points** — The failure is that the counter is keyed to the **session cookie**, not to the account or the source IP. An attacker resets the counter by removing the `Cookie` header (or clearing cookies / using private browsing / sending cookieless requests via Burp): each request then starts a brand-new session and the counter never reaches five, so the lockout never triggers. A robust rate limit must be tied to the **account** and the **source IP**, not the session. **繁中拆解** — 「計數器綁 cookie」= 鎖嘅對象係「session」而唔係「攻擊者」。攻擊者只要每次換一條 session，就等於無限次第一擊。原文嘅 Burp Intruder 示範就係 request 唔帶 Cookie，令每次猜測都開新 session。
> **常見錯答**：答「清除瀏覽器 cookie 再試」而漏咗**核心**：一定要講「rate limit 必須綁 account 同 IP」先係完整答案。

**Q4（§6 原題 4）**
> Compare storing passwords as plaintext, fast unsalted hashes (MD5/SHA-1), and slow salted hashes (bcrypt/Argon2). After a database leak, why does plaintext storage leave the defender with nothing left to do?

> ⚠️ 教材外補充（答案）：**English key points** — **Plaintext**: the leak is the passwords, instantly usable, and the defender can only force a global reset — nothing can protect the data. **Fast unsalted hashes (MD5/SHA-1)**: offline cracking with rainbow tables/GPU is trivial and identical passwords share the same hash. **Slow salted hashes (bcrypt/Argon2)**: each password has a unique salt and the hash is deliberately slow, making bulk offline cracking impractical. Plaintext leaves nothing to do because there is no layer left to break — the secret itself was stored. **繁中拆解** — 三層防禦遞進：明文（零防禦）→ 快 hash 無 salt（易撞，彩虹表）→ 慢 hash 加 salt（每次要慢慢計，成本極高）。原文引 **NIST SP 800-63B** 建議用 bcrypt/Argon2。
> **常見錯答**：以為「MD5 己經係加密、夠安全」—— MD5/SHA-1 係設計得**快**嘅雜湊，正好方便攻擊者，唔適合存密碼。

---

## 🎒 8. 考前 5 分鐘懶人包 ＋ 自測

### 8.1 關鍵數字／事實（背到反射式）

- CAPTCHA 弱點編號：**CWE-602**（Client-Side Enforcement of Server-Side Security）、**CWE-603**（Use of Client-Side Authentication）；OWASP **A08:2021**。
- §1 三個 bypass：**洩漏答案（hidden `captcha_answer` / DEBUG comment）**、**省略欄位（`'' !== ''` → false）**、**magic word `bypass`**。
- §2 email bomb：OWASP **A05:2021**（Security Misconfiguration）＋ **A07:2021**；MITRE **ATT&CK T1667**（Email Bombing，Impact 戰術）；前端倒數 **30 秒**；Burp Intruder payload type **Numbers 1→50 step 1**；分號 `;` 分隔、**無空格**；mail 容器 **`hkgov-mail`**、Roundcube **port 8081**。
- §6 暴力破解：弱點編號 **CWE-307**；OWASP **A07:2021**；鎖定門檻 **5 次失敗**（綁 session cookie）；Intruder attack type **Cluster bomb**；payload body **`username=§admin§&password=§x§`**；成功訊號 **302 + 長度不同**（⚠️ 教材外補充：要喺 Burp 熄咗 follow redirects 才見到 302；跟咗 redirect 就會變 200，改用 `Location` header 或 response length 判別）；`brute.py` 預設 base URL **`http://localhost:8080`**。
- 密碼字典來源：**rockyou.txt**（2009 RockYou）、SecLists 常數清單、情境變形（`Welcome2024`／`Summer2024`）、政策檔 **`/opt/IT/password_policy.txt`**（九字元 keyboard walk → `123qwe!@#`）、角色相關（`it.helpdesk` → `Helpdesk1`）。
- 建議雜湊：**bcrypt / Argon2**（慢速、加 salt）；標準：**NIST SP 800-63B**。

### 8.2 Payload／指令對照表

| 情境 | Payload／指令（原文如此） | 效果 |
|---|---|---|
| CAPTCHA 洩漏答案 | `captcha=12&captcha_answer=12` | 兩個值相同 → 通過 |
| CAPTCHA 省略欄位 | 只 POST `username`、`full_name`、`email`、`password` | `'' !== ''` = false → 通過 |
| CAPTCHA magic word | `captcha=bypass` | 短路檢查 → 通過 |
| Email bomb 單發 | `POST /forgot.php`（body：`email=victim@example.com`） | 每發一封重設信 |
| Email bomb 放大 | `email=victim@example.com;victim@example.com;…` | 一封 request → N 封 email |
| 暴力破解（無 cookie） | `POST /login.php` 刪走 `Cookie:` header | 每次開新 session，鎖定失效 |
| Burp Intruder positions | `username=§admin§&password=§x§`（Cluster bomb） | 枚舉組合猜測 |
| Lab 腳本 | `python3 tools/brute.py` | 自動收割用戶名 + 破解密碼 |

### 8.3 英文必背句

> "Its value depends entirely on server-side enforcement."（CAPTCHA 全靠伺服器端強制）
> "The attacker controls both sides of the check."（攻擊者控制檢查兩邊）
> "Client-side controls are not security controls."（前端控制唔係安全控制）
> "Each new HTTP request without a session cookie starts a fresh session."（每個無 cookie 嘅新 request 都開新 session）
> "The differing status and length reveal the valid pair instantly."（狀態碼同長度差異即時揭示有效配對）

### 8.4 自測 5 條（答案喺最尾一行）

1. CAPTCHA 洩漏答案嘅兩個途徑係咩？
2. 點解「完全唔交 captcha 欄位」都可以註冊成功？
3. Email bomb 點樣用一個 request 觸發多封 email？
4. 點解綁 session cookie 嘅鎖定機制可以繞過？
5. Burp Intruder 結果表入面，成功登入嗰一行有咩特徵？

**答案**：1. hidden field `captcha_answer` 同 `<!-- DEBUG -->` comment｜2. 缺失參數被讀成 `''`，而 `'' !== ''` 係 false，所以檢查通過｜3. 伺服器將 `email` 值按 `;` 切開，逐個收件人寄信（delimiter injection），回應顯示 `Sent N reset email(s)`｜4. 攻擊者每次 request 唔帶 `Cookie` header，伺服器開新 session，計數器永遠歸零｜5. 返回 **302** 而且回應長度同其他行唔同。


### 8.5 一頁式流程速記

```
攻擊鏈②A（認證／自動化濫用）
├─ §1 CAPTCHA Bypass
│   ├─ 睇原始碼搵 captcha_answer / DEBUG   -> Bypass 1（洩漏答案）
│   ├─ 刪走 captcha 欄位直接 POST          -> Bypass 2（'' === ''）
│   └─ captcha=bypass（probe + Repeater）  -> Bypass 3（magic word）
├─ §2 Email Bomb
│   ├─ 前端倒數只喺 JS（localStorage）     -> 重播 POST 繞過
│   ├─ Intruder Numbers 1->50              -> 50 封 email
│   └─ email=a@x.com;b@x.com;c@x.com       -> delimiter injection
└─ §6 Unlimited Brute Force
    ├─ /api/users.php + /staff.php         -> 收割用戶名
    ├─ forgot.php / login.php 差異回應     -> 確認帳號存在
    ├─ 刪 Cookie header（每次新 session）  -> 繞過 5 次鎖定
    └─ Intruder Cluster bomb / brute.py    -> 撞出弱密碼（302 + 長度）
```

---

## 🛡️ 9. 防守方修正清單（Defender Fix Checklist）

### 9.1 §1 CAPTCHA Bypass

- **原文修法**：答案存 server-side session，永不 render 喺 HTML／hidden field／comment；無條件拒絕缺失或空白嘅 CAPTCHA 參數；每次嘗試後重新生成挑戰；加 per-IP rate limiting。
- **教材外補充 —— PHP 具體做法**：用 `$_SESSION['captcha_answer']` 儲存；提交時 `if (!isset($_SESSION['captcha_answer']) || $_POST['captcha'] !== $_SESSION['captcha_answer']) { reject(); }`，之後即 `unset($_SESSION['captcha_answer'])`；生產環境**唔用自行開發嘅數學 CAPTCHA**，改用成熟服務（server-side 驗證 token）。
- **教材外補充 —— ASP.NET 具體做法**：用 `System.Web.Helpers.AntiForgery`／內建 CAPTCHA 或第三方服務，答案存喺 `Session`／server-side cache（如 `IDistributedCache`），提交時喺 controller／handler 比對，並設定 `[ValidateAntiForgeryToken]`；唔可以將正確答案放喺 ViewModel hidden field。
- **守則**：debug comment 同 magic string 一律唔可以入 production code（用 lint／CI 掃 `DEBUG`、`bypass` 等關鍵字）。

### 9.2 §2 Email Bomb

- **原文結論（問題所在）**：依賴 JS 計時器同禁用按鈕、伺服器冇 rate limit、冇地址去重、冇驗證所有權。
- **教材外補充修法**：
  - **伺服器端 rate limiting**（per account、per recipient、per source IP）—— 唔可以用前端倒數代替。
  - **收件人驗證**：`email` 欄位只接受**單一**地址；拒絕 `;`、`,`、換行等分隔符（唔好 `explode` 之後逐個寄）。
  - **地址去重**：同一地址喺短時間內只寄一次；重設 token 用一次性、短壽命、隨機值。
  - **Ownership 驗證**：只向已確認屬於該帳號嘅地址寄；對外功能加 **CAPTCHA** 同異常頻率偵測。
  - **ASP.NET/PHP 一般做法**：用 middleware／framework 嘅 rate limiter（ASP.NET `RateLimiter`、Laravel `throttle`），背後以 Redis／記憶體計數，**唔綁 session cookie**。

### 9.3 §6 Unlimited Brute Force

- **原文修法**：per account **同** per IP 做 rate-limit 同延遲（**唔係** per session cookie）；執行帳號鎖定或漸進延遲；失敗若干次後加 CAPTCHA；對「唔存在用戶名」同「錯密碼」回**同一個通用錯誤**；用慢速雜湊 bcrypt/Argon2 存密碼（NIST SP 800-63B）。
- **教材外補充修法**：
  - 移除未認證嘅用戶名列舉面：`/api/users.php` 要認證授權、staff 頁唔好喺 HTML／`data-` 屬性印 login 名。
  - `forgot.php` **唔應該**再接受 legacy `username` 參數；重設回應一律中性（唔揭露帳號存在）。
  - 加 **MFA** 同不可能旅行（impossible travel）／裝置指紋偵測。
  - **ASP.NET 一般做法**：`AspNet.Identity` 嘅 lockout 用 `MaxFailedAccessAttempts` + `LockoutTimeSpan`，並以 `PasswordHasher`（PBKDF2/bcrypt/Argon2）存雜湊；rate limit 用 `AddRateLimiter` 綁 IP/user。**PHP 一般做法**：`password_hash($pw, PASSWORD_BCRYPT)`／`password_verify()`；rate limit 用 Redis 以 IP + username 做 key。


### 9.4 三個漏洞嘅根因總結（一表睇清）

| 漏洞 | 根因（一句） | 弱點編號 | OWASP | 最低限度修法 |
|---|---|---|---|---|
| §1 CAPTCHA Bypass | 伺服器信任客戶端提供嘅驗證資料 | CWE-602、CWE-603 | A08:2021 | 答案存 session、缺失一律拒、每次重生成 |
| §2 Email Bomb | 只有前端限制，伺服器冇 rate limit／冇驗證收件人 | 安全配置錯誤 | A05:2021、A07:2021 | per-account/IP rate limit、單一收件人、去重、驗證所有權 |
| §6 Unlimited Brute Force | 鎖定綁 session cookie、錯誤訊息差異化、明文存密碼 | CWE-307 | A07:2021 | per-account/IP 限速、通用錯誤、bcrypt/Argon2 |

> ⚠️ 教材外補充：三者嘅共同一句話 —— **「前端方便，唔等於後端安全」**。凡涉及「驗證、限制、授權」嘅判斷，都必須喺伺服器以「攻擊者控制唔到」嘅資料做基礎。

> ➜ **對應速記**：`ART_Final_CheatSheet.md`
> ➜ 注入／SSO 主題（§4 SQLi、§12 NoSQL、§13 OAuth）：`ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md`
> ➜ 權限提升階段（§3）：`ART_T3_05_PrivilegeEscalation_StudyGuide.md`
