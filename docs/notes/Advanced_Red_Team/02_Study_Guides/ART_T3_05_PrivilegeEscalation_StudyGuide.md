# ART_T3 ART_T3_05：權限提升（Privilege Escalation）— IDOR、Broken Access Control、Upload RCE — 雙語學習指南

> **原教材**：Advanced Red Team — Tutorial 3（PDF p.35–49）｜覆蓋 section：§3（IDOR / Broken Access Control / Upload RCE）
> **攻擊鏈位置**：③ 權限提升（Privilege Escalation）—— 承接②「初始存取」，交出④「憑證蒐集」之前嘅立足點
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 跟 §5 實戰步驟落手做一次 → 最後用 §8 懶人包自測
> **主機層權限提升**唔喺本檔：主機淪陷（host-level privesc）➜ 見 `ART_T3_08_HostCompromise_StudyGuide.md`
> **相關速記**：➜ 對應速記：`ART_Final_CheatSheet.md`
> **本檔邊界**：只覆蓋原文 §3。教材其他 stage（初始存取、橫向檔案存取）由其他分冊負責。

---

## 📝 1. 權限提升 概要與實務情境

呢個階段叫 **權限提升（Privilege Escalation）**：你已經有一個**普通帳號**（例如 `john.doe`），但你想做**只有 admin 或只有其他人**先做到嘅事。原文用一句好精準：When a user can perform actions or access resources beyond their authorized role. 呢個階段喺攻擊鏈嘅第三格 —— 前面②「初始存取」幫你搞到一個合法帳號，呢一步就係拿住呢個帳號**向上爬（變 admin）**或者**向橫爬（睇其他人資料）**，之後④「憑證蒐集」你就有更高權限去撈更多秘密。所以本階段係由「一個普通用戶」變成「半個管理員／一部伺服器」嘅橋。

本檔覆蓋原文 §3 全部內容，三條互相扣連嘅弱點：**(1) IDOR／Broken Access Control ← 換 URL 個 ID 就睇到人哋嘅訊息；(2) Broken function-level authorization ← `/admin/` 底下大部分頁面都有檢查 admin role，唯獨 `upload.php` 淨係檢查「你登入咗未」；(3) Unrestricted file upload ← 嗰個 upload 唔理 file type、仲將檔案放入 web root 執行，變成 RCE**。原文將呢三步描述為一條 attack flow：IDOR 洩漏 admin 路徑 → 目錄爆破搵到 portal 同隱藏 upload endpoint → upload endpoint 畀你 code execution。

前置假設：你要有**一個已登入嘅普通帳號**先玩到本階段（本 lab 用 `john.doe / Welcome2024`，係一個冇任何 admin 權嘅 ordinary account）。教材環境係課程網站 VM 入面嘅一個「政府入口網站」PHP + SQLite 靶場，跑喺 `http://localhost:8080`；程式**唔喺本機**，所以本筆記一律講「喺 lab root 做乜」，唔假設你本機有任何路徑。

實務情境一（橫向越權）：你係外部滲透測試員，客戶嘅客戶入口有一個「我的訊息」頁，URL 係 `/message.php?id=1`。你試住改成 `id=2`、`id=3` —— 唔單止睇到自己嘅訊息，仲睇到**其他客戶同員工之間**嘅往來，包括一封 admin 寄去 helpdesk、寫住「管理入口喺 `/admin/`」嘅內部信。呢啲由 IDOR 漏出嚟嘅「一句提示」往往就係下一格嘅鎖匙。

實務情境二（縱向越權 → RCE）：你發現 `/admin/` 目錄底下有個 `upload.php`,正常用戶睇唔到個上載表格,但你**自己砌個 POST 請求**送過去,佢竟然收貨 —— 仲收任何類型嘅檔案。你放一個 `.php` web shell 入去,瀏覽返個 URL,一個普通帳號就即刻有**伺服器級**嘅命令執行能力。真實世界（in the wild）好多 CMS／plugin 嘅完整淪陷都係由「一個唔起眼嘅 upload 功能」開始,所以 OWASP 一直將 Unrestricted upload 視為通往 full server compromise 嘅經典路徑。

> **English Standard Definition:** Privilege escalation occurs when a user can perform actions or access resources beyond their authorized role. The most common root cause is confusing authentication (proving who you are) with authorization (checking what you are allowed to do).

---

## 🎯 2. 學習目標

1. **解釋 IDOR／BOLA 嘅根因** — Explain the root cause of Insecure Direct Object Reference (IDOR / BOLA): which authorization check is missing.
2. **分辨橫向與縱向權限提升** — Distinguish horizontal escalation (one user → another user's data) from vertical escalation (normal user → admin/server actions).
3. **講出 IDOR 為何靠可預測 ID** — Explain why sequential / predictable numeric object IDs provide no protection.
4. **拆解 broken function-level authorization** — Explain why `/admin/upload.php` differs from `/admin/index.php` (session-only check vs. role check).
5. **做目錄爆破搵隱藏 endpoint** — Use directory brute-force (Gobuster / ffuf / Dirbuster / Burp Intruder) to discover unlinked admin surfaces.
6. **由頁面原始碼／JavaScript 挖掘更多 endpoint** — Review the source and JS of admin-looking pages to find extra endpoints (e.g. `upload.php`, `export.php`, `api/internal`).
7. **解讀 HTTP 狀態碼作為「存在性 oracle」** — Interpret 302 vs 404 and 403 as signals of whether an endpoint exists and whether you are authorized.
8. **手砌 multipart 上載請求** — Build a `multipart/form-data` POST by hand in Burp Repeater, including the `PHPSESSID` cookie and the right file field name.
9. **將無限制上載變成 RCE** — Turn an unrestricted upload into remote code execution by placing an executable file inside the web root.
10. **對應 OWASP 同 CWE** — Map the vulnerabilities to OWASP A01:2021 / A04:2021 and CWE-285 / CWE-639 / CWE-434.
11. **用處理器角度睇 web shell** — Explain, line by line, what `<?php echo system($_GET['cmd']); ?>` actually does on the server.
12. **寫出防守方修正清單** — State the server-side fixes: per-endpoint role checks, object-ownership checks, upload allow-listing and storage outside the web root.

---

## 🧩 3. 零經驗先修（Prerequisites, in plain words）

呢度列出本檔會用到、但原文假設你已經識嘅基礎。每項：一句定義 ＋ 一個生活化比喻 ＋ 一句英文。

### 3.1 Authentication vs. Authorization（認證 vs. 授權）

- **定義**：Authentication = 證明「你係邊個」；Authorization = 檢查「你准做啲乜」。兩個係完全唔同嘅問題。
- **比喻**：Authentication 係大廈門口拍卡（證明你有張卡）；Authorization 係入到去之後，你張卡准唔准開 18 樓嘅機房門。
- **英文**：Authentication proves who you are; authorization checks what you are allowed to do. Confusing the two is the root cause of most privilege-escalation bugs.

### 3.2 Object Reference / ID（物件參照）

- **定義**：應用程式喺 URL 或參數度用一個編號（`id`、`msg`、`order_id`）去代表某個資料庫紀錄。
- **比喻**：好似酒店房卡號 —— 如果你個卡號係 305，你試住改做 306，而前台又冇查「你係唔係 306 嘅住客」，你就有機會入人哋間房。
- **英文**：An object reference is an identifier (database record ID, filename, account number) that a user supplies to fetch an object.

### 3.3 HTTP 狀態碼：302 / 403 / 404

- **定義**：`302` = 重新導向（redirect）；`403` = 拒絕存取（Access denied）；`404` = 冇呢個路徑（Not Found）。
- **比喻**：`404` 係「呢度冇呢間舖」；`403` 係「有呢間舖，但職員唔畀你入」；`302` 係「有呢間舖，但佢叫你行去另一度（登入頁）」。
- **英文**：A 302 tells you a path exists and redirects; a 403 means the path exists but you are denied; a 404 means the path does not exist.

### 3.4 Proxy 同 Burp Suite Repeater

- **定義**：Proxy 係你瀏覽器同伺服器之間嘅「中間人」；Burp Suite 係一個攔截同改寫 HTTP 請求嘅工具，Repeater 係佢畀你**反覆改、反覆送**同一個請求嘅 tab。
- **比喻**：好似寄信時先交畀一個助手，你可以拆開信封、改內容、再寄出去 —— 而收信人只會見到改完之後嘅版本。
- **英文**：A proxy sits between browser and server; Burp Repeater lets you edit and resend a captured request as many times as you like.

### 3.5 `multipart/form-data` vs. `application/x-www-form-urlencoded`

- **定義**：普通表單用 urlencoded（只可以帶文字）；帶檔案嘅表單一定要用 multipart，佢會用 boundary 分隔每一格。
- **比喻**：urlencoded 好似一張紙寫住所有資料；multipart 好似一個公文袋，入面分開幾個信封，每個信封寫明「呢格叫 file」。
- **英文**：A file upload must use `multipart/form-data`; an ordinary urlencoded body can only carry text.

### 3.6 Session Cookie / `PHPSESSID`

- **定義**：伺服器用一個 cookie（PHP 叫 `PHPSESSID`）記住「呢個瀏覽器就係已登入嘅某某人」。
- **比喻**：好似演唱會手帶 —— 你戴住佢，工作人員就知你已經入場，唔會再查你身份證。
- **英文**：`PHPSESSID` is the session identifier the server uses to recognise your logged-in browser; stealing or copying it lets a request run as you.

### 3.7 Web Root 同 PHP 執行

- **定義**：Web root 係網站對外公開嘅資料夾；如果 PHP 冇被停用，放喺入面嘅 `.php` 檔案**用瀏覽器打開就會被執行**。
- **比喻**：好似餐廳廚房 —— 如果廚房冇鎖門，而你放一份「點煮」嘅紙入去，廚師就會照住去煮。
- **英文**：Files inside the web root can be served directly; if PHP execution is not disabled, a `.php` file placed there runs when you browse to it.

### 3.8 Directory Brute-force（目錄爆破）

- **定義**：用一份常用路徑字典，逐個試 `/admin`、`/api`、`/uploads`、`/.git` 等，睇邊個回 404、邊個回 302／403。
- **比喻**：好似逐個門牌號碼試，睇邊間屋有人應門。
- **英文**：Directory brute-force tests a wordlist of common paths to find hidden endpoints; the status code tells you what exists.

### 3.9 Web Shell

- **定義**：一個被放喺伺服器上、可以接收指令並執行嘅後門程式（例如一行 PHP）。
- **比喻**：好似喺人哋屋企偷放一個「遙控對講機」，你出聲，間屋就會照做。
- **英文**：A web shell is a backdoor that turns an HTTP request into a command executed on the server.

---

## 📖 4. 逐節深度知識點重寫（Comprehensive Notes）

### 4.1 咩係權限提升、為何會發生？（原文 p.35 — What is it and why does it work?）

繁中解說：**權限提升**就係「一個用戶可以做超過佢角色允許嘅事、或者存取超出佢權限嘅資源」。原文特別指出**最常見嘅根因係混淆 authentication 同 authorization** —— 好多開發者寫咗「你登入咗未？」嘅檢查，就以為已經安全，但完全冇寫「你係唔係 admin？」或者「呢條紀錄係唔係你嘅？」。

本 lab 將三條弱點串埋一齊：

- **Horizontal escalation（IDOR）**：訊息瀏覽器接受 `?id=`，但**從來冇檢查當前用戶係寄件人定收件人**。
- **Broken function-level authorization**：`/admin/` 底下嘅授權檢查**唔一致**。`/admin.php`（dashboard）同 `/admin/index.php`（Management Portal）都正確咁要求 admin role；但 `/admin/upload.php` 只係檢查「有冇 session」，而且**淨係喺帶檔案嘅 POST 請求**上面先檢查。
- **Unrestricted file upload**：同一個 upload helper 接受**任何檔案類型**，而且上載嘅檔案會放入 **web root 並以 PHP 執行**，將一個普通帳號變成伺服器級淪陷。

原文再定義兩種方向：**Vertical privilege escalation**（縱向）＝ 普通用戶做到管理員／伺服器級嘅動作；**Horizontal privilege escalation**（橫向）＝ 一個用戶存取另一個用戶嘅資料。

> **English Standard Definition:** Vertical privilege escalation lets a normal user perform administrative or server-level actions. Horizontal privilege escalation lets one user access another user's data.

**為何會發生（日常比喻）**：想像一間公司，門口有保安（authentication），但入面所有房門都冇鎖（authorization）。你正正經經拍卡入咗公司，跟住就可以随便入會議室、拎人哋桌面嘅文件。開發者往往將「URL 入面嗰個編號」當成秘密 —— 但編號根本唔係秘密，只係一個**預期要保密**嘅數字。

### 4.2 IDOR / BOLA 深入（原文 p.35）

繁中解說：**IDOR（Insecure Direct Object Reference，不安全直接物件參照）**，又叫 **BOLA（Broken Object Level Authorization，物件層授權失效）**，係指應用程式**直接暴露一個內部物件參照**（可能係資料庫紀錄 ID、一個檔名、或者一個帳戶號碼），並且**用用戶提供嘅識別碼去拎物件，但冇做伺服器端嘅擁有權或權限檢查**。

原文一句講中要害：**Developers often treat an identifier as if it were a secret.**（開發者往往當個識別碼係秘密。）佢畀嘅例子：發票喺 `/invoice.php?id=1024` 顯示 —— 除非伺服器確認當前登入用戶**真係擁有** invoice 1024，否則攻擊者只要將 `id` 改成 `1025`，就可以讀到另一個人嘅發票。

本 lab 入面 `/message.php?id=1` 就係一模一樣嘅漏洞：**任何已登入用戶都可以淨係改個數字，就讀到資料庫入面每一條訊息**。

> **English Standard Definition:** An Insecure Direct Object Reference (IDOR) — also known as Broken Object Level Authorization (BOLA) — occurs when an application exposes a direct reference to an internal object, such as a database record ID, a filename, or an account number, and uses that user-supplied identifier to fetch the object without performing a server-side ownership or permission check.

**為何 sequential ID 特別危險**：如果紀錄 ID 係 1、2、3、4……一路順序落去，攻擊者根本唔需要猜 —— 只需要 `id=1, id=2, id=3` 一路試。可預測嘅 ID 本身就係「送禮」。

> ⚠️ 教材外補充：正本清源 —— 「改 ID 就睇到人哋資料」呢個行為，喺業界同 API 場景常寫成「Broken Object Level Authorization（BOLA）」。API 場景（例如 REST）好常見：`GET /api/users/1001/orders` 一改個 user id 就睇到人哋單。記住：錯嘅係**伺服器冇檢查擁有權**，唔係「ID 唔夠靚」。

### 4.3 Broken function-level authorization（原文 p.35–36、p.43–44）

繁中解說：**Function-level authorization** 係指「呢個功能（唔同 endpoint）准邊個角色用」。Broken function-level authorization 就係話：同一個 admin 區域，有啲函數檢查得啱，有啲漏咗。原文嘅描述：`/admin/` 底下嘅授權檢查**inconsistent（唔一致）** —— admin dashboard 同 Management Portal 都正確 enforce 咗 admin role，但 upload helper 淨係「verify that a session exists」，而且**淨係喺帶檔案嘅 POST 請求先檢查**。

原文嘅重點細節：**A normal user is never shown the upload form; the helper must be discovered and called by hand.**（普通用戶永遠見唔到個上載表格；你要自己發現、自己手動叫佢。）

原文有一句好到肉嘅總結：**The admin surface is default-deny almost everywhere — one forgotten check on a single POST is your way in.**（admin 表面幾乎全部都係 default-deny，但一個被遺忘嘅檢查、喺單一個 POST 上面，就係你嘅入門口。）

原文亦都列出咗一個「唔一致」對照表（p.43）——下表係照原文內容重寫：

| Endpoint | 原文描述佢檢查乜（What it checks） | 普通用戶結果 |
|---|---|---|
| `/message.php?id=...` | 只檢查你登入咗 —— 對訊息冇擁有權檢查 | 可以讀所有人嘅訊息（IDOR） |
| `/admin.php` | Session ＋ admin role（`is_admin()`） | Access denied（403） |
| `/admin/index.php` | Session ＋ admin role（`is_admin()`）—— default deny | Access denied（403），同 `/admin.php` 一樣 |
| `/admin/upload.php` | GET：session ＋ admin role（default deny）。**POST 帶檔案：只檢查你登入咗 —— 冇 role check、冇 extension 或 MIME 檢查** | GET → Access denied（403）；用你嘅 session cookie POST → 接受任何類型嘅檔案 |

繁中拆解呢個表：**最緊要睇最後一行**。`upload.php` 嘅邏輯係「如果唔係 admin **而且**（唔係 POST **或者** 冇檔案），就 403」。即係話：只要你係一個**帶檔案嘅 POST**，整個「唔係 admin → 403」嘅條件就**唔成立**，於是放行。呢個就係「一個遺忘嘅檢查」。

> ⚠️ 教材外補充：為咩開發者會寫成咁？好可能係開發者想「方便任何人上載頭像／附件」，於是將檢查條件寫成「admin OR（POST 帶檔案）」，結果**意外開咗個大門**。呢類邏輯錯誤（boolean 條件寫反、`&&`／`||` 用錯）係業界 CWE-285 嘅常見來源。

### 4.4 Unrestricted file upload（原文 p.36、p.46–48）

繁中解說：**Unrestricted file upload（無限制檔案上載）** 係話同一個 upload helper **accepts any file type**，而且**上載檔案會被放入 web root 並以 PHP 執行**。原文嘅定位好清楚：**turning a normal account into a server-level compromise**（將一個普通帳號變成伺服器級淪陷）。

原文將上載變成 RCE 嘅條件，拆成「三個防禦要**一齊失效**先得」（呢點喺學生問題 3 再考一次）：

1. **Authorization（授權）**：你要叫得動嗰個 upload endpoint（本 lab 靠「session-only check」漏咗）。
2. **File-type validation（檔案類型驗證）**：冇 extension allow-list、冇 MIME 檢查。
3. **Storage location（存放位置）**：檔案放咗入 web root，而且該目錄冇停用 script 執行。

只要呢三樣任何一樣係對嘅，RCE 就唔成立。本 lab 三樣**全部錯**。

> **English Standard Definition:** Unrestricted file upload — that same upload helper also accepts any file type, and uploaded files are placed in the web root and executed as PHP, turning a normal account into a server-level compromise.

**為何「upload 目錄可以執行檔」係災難（日常比喻）**：想像一間酒樓，你只係普通顧客，但廚房（ = web root）**冇鎖門**，而廚師又**照住任何一張你放低嘅食譜去做菜**。你放一張寫住「今晚全店免費」嘅紙，廚師就照做。同理：你上載一個 `.php`，伺服器就「照住去執行」。**上載 = 送一份你自己揀內容嘅程式碼入去伺服器執行** —— 呢個就係由「普通用戶」直通「伺服器控制」嘅原因。

### 4.5 OWASP 同 CWE 對應（原文 p.36）

繁中解說：原文畀咗好清楚嘅對應，考試常考，一定要背：

- **OWASP A01:2021 — Broken Access Control**（對應 IDOR／BAC／function-level auth）
- **OWASP A04:2021 — Insecure Design**（對應 unrestricted upload）
- **CWE-285 — Improper Authorization**：endpoint 冇驗證 role 或 permission。
- **CWE-639 — Authorization Bypass Through User-Controlled Key**：IDOR／BOLA —— 物件識別碼暴露、冇擁有權檢查。
- **CWE-434 — Unrestricted Upload of File with Dangerous Type**：上載容許可執行內容。

> **English Standard Definition:** The bottom line: privilege escalation is rooted in authorization failures. CWE-285 (Improper Authorization) covers endpoints that do not verify role or permission, CWE-639 (Authorization Bypass Through User-Controlled Key) covers IDOR/BOLA vulnerabilities where an object identifier is exposed without ownership checks, and CWE-434 (Unrestricted Upload of File with Dangerous Type) covers uploads that allow executable content.

### 4.6 How to find it — 發現方法論（原文 p.36–39）

繁中解說：原文將「點搵」拆成一條四步流程。以下逐條重寫（連同發現 IDOR／BAC 嘅觀察重點）：

- **Spotting IDOR and broken access control**：留意 URL 有冇**可預測嘅物件 ID**，然後喺普通連結背後 probe 隱藏嘅 admin 表面。
- **Privilege escalation attack flow**：一個普通帳號走到一個隱藏 admin endpoint，上載 web shell，取得 admin 控制權。

實作步驟（原文 p.37–39）：

1. **以普通用戶身份登入，並瀏覽每一個用 ID 參照物件嘅功能** —— 訊息、訂單、發票、文件。做一次**清單（inventory）**。
2. **改動數值參數**，例如 `?id=`、`?msg=`、`?order_id=`，對比回應。如果你讀到另一個人嘅紀錄，就係 IDOR。
3. **用目錄爆破工具列舉隱藏目錄**（Dirbuster、Gobuster、ffuf）＋ 常用字典。搵 `/admin`、`/manage`、`/dashboard`、`/panel`。
4. **審視 admin 外表頁面嘅 source 同 JavaScript**，搵有冇提到額外 endpoint，例如 `upload.php`、`export.php`、`api/internal`。
5. **喺仍然以普通用戶身份登入嘅情況下，逐個存取已發現嘅 endpoint**。如果伺服器喺冇檢查 role 嘅情況下照樣回傳資料或表格，就係缺咗 authorization check。
6. **測試 upload endpoint** —— 測 extension filtering、MIME validation，同埋上載檔案係唔係存喺 web root、係唔係可執行。

原文亦提到 directory brute-force 係一個**正常嘅偵察步驟**，並點名工具：**Dirbuster、Gobuster、ffuf、或 Burp Intruder**，常用測試路徑包括 `/admin`、`/api`、`/uploads`、`/.git`。

> ⚠️ 教材外補充：原文有一句關鍵心法 —— **Once an admin-looking page is found, its HTML and JavaScript become a map of further endpoints, and upload features are especially valuable because a PHP, JSP, or ASP shell often grants the same privileges as the web server account.** 意思係：搵到一個似 admin 嘅頁面之後，**佢嘅 HTML 同 JS 就係一張「仲有咩 endpoint」嘅地圖**；而 upload 功能特別值錢，因為一個 PHP／JSP／ASP shell 通常就等於**web server 帳號嘅權限**。

### 4.7 3.1 Discovering the hidden admin endpoint（原文 p.41–46）

繁中解說：呢一節係本 stage 嘅「中段」。你以普通用戶身份，先**確認 admin 頁面其實守得住**（`/admin.php` 同 `/admin/index.php` 都拒絕你），再靠**目錄爆破**同**JavaScript 交叉比對**搵到守唔住嗰一個 —— `/admin/upload.php`。

原文流程重點：

- **Probe `/admin.php`**：仍然以 `john.doe` 身份，直接去 `http://localhost:8080/admin.php`。伺服器回 **"Access denied. Only administrators can view this page."** —— 呢個 dashboard **有** enforce admin role（`is_admin()` check）。原文補充：冇任何帳號時，member 頁面（例如 `/message.php`）會直接 redirect 你去 login form。
- **Probe `/admin/index.php`**：仍然以 `john.doe`，去 `http://localhost:8080/admin/index.php`。呢頁**都係 default-deny** —— 就算已登入嘅普通用戶都係收到 "Access denied. Only administrators can view this page."。portal **唔會**畀你睇佢嘅 user list 或者 upload form；**入 `/admin/` 嘅唯一一道門，就係個 upload handler**，佢仍然會回應任何已登入 session 嘅 POST 請求。
- **Enumerate `/admin`**：用目錄爆破工具 + 常用字典去打 `/admin`。Gobuster 嘅最簡命令（原文如此）：

```bash
gobuster dir -u http://localhost:8080/admin -w /usr/share/wordlists/dirb/common.txt
```

原文亦講：你可以喺 Burp Suite 用 Intruder 做同一個 scan —— 將一個請求 `/admin/§path§` 送入 Intruder，載入目錄字典做 payload，然後睇邊啲回應**唔係 404**。喺本 lab：**未登入時，每個存在嘅路徑都會回 302（redirect 去 login 頁）；已登入嘅非 admin 用戶就會收到「Access denied」頁**。Scan 確認兩個 PHP endpoint 都存在，因為佢哋回 302 而唔係 404，例如：

```
/admin/index.php (Status: 302)
/admin/upload.php (Status: 302)
```

原文再三提醒一個**新手陷阱**：**A 302 only tells you that a path exists — it does not tell you what the path is actually for.**（302 只係話你知個路徑存在，唔等於話你知佢係做乜。）要知道佢做乜，要靠你已經收集到嘅線索：你透過 IDOR 讀到嘅 admin 訊息、同 portal 嘅 JavaScript（下一點），兩者都指向 `/admin/upload.php` 就係你要手動去 reach 嘅 upload helper。

- **Cross-check portal JavaScript**：打開 portal 嘅 JS asset `http://localhost:8080/admin/js/admin.js` —— **`/admin/` 底下嘅靜態檔案係冇任何 role check 就 serve 出去**，所以就算普通用戶都開得。入面 hard-code 咗 `ADMIN_UPLOAD_ENDPOINT = '/admin/upload.php'`，證實咗 scan 搵到嗰個 endpoint。嗰個 endpoint 接受**任何已登入 session** 嘅上載；你只係要自己砌嗰個 POST 請求。

原文亦展示咗「改動後嘅 lab code」點樣明明白白顯示呢個 gap（p.43–44）——**成個 `/admin/` 樹而家都要求 admin role，除咗帶檔案嘅 POST**：

```php
// admin/index.php — default deny: viewing the portal requires the admin role.
if (!is_admin()) {
    http_response_code(403);
    die(__('error_access_denied'));
}
// admin/upload.php — every request is denied EXCEPT a POST that carries
// a file; that path only checks that some session exists (no role check,
// no extension or MIME check).
if (!is_admin() && ($_SERVER['REQUEST_METHOD'] !== 'POST'
    || !isset($_FILES['file']))) {
    http_response_code(403);
    die(__('error_access_denied'));
}
```

繁中拆解呢段 PHP：`admin/index.php` 好簡單 —— `if (!is_admin())` 就 403，冇例外。`admin/upload.php` 就係**漏洞所在**：條件係「`!is_admin()` **AND**（`REQUEST_METHOD !== 'POST'` **OR** `!isset($_FILES['file'])`）」。用普通用戶身份（`!is_admin()` 為真）睇：
- 如果係 GET，或者冇檔案 → 條件成立 → 403（default deny）。
- 如果係**帶檔案嘅 POST** → 第二個括號為假 → 整個 `AND` 為假 → **唔會 403**，直接進入上載邏輯。

即係：**唯一入到去嘅方法，就係「帶檔案嘅 POST」** —— 而嗰條路完全冇檢查 role、冇檢查 extension、冇檢查 MIME。

> ⚠️ 教材外補充：原文鼓勵你直接喺瀏覽器讀呢兩個檔（`http://localhost:8080/admin/index.php`、`http://localhost:8080/admin/upload.php`），甚至用 `view-source:` 前綴（`view-source:http://localhost:8080/admin/upload.php`）睇未 render 嘅原始碼。喺 **PHP 靶場**入面咁做等同「白盒睇 source」；喺真實世界你多數睇唔到 `.php` 原文（會 Render 成 HTML），所以實戰要靠**黑盒**手法（目錄爆破 + JS + 錯誤訊息）。

### 4.8 3.2 From upload to code execution（原文 p.46–48）

繁中解說：呢節將「上載成功」升級成「命令執行」。原文分兩步：**(1) 搵出上載檔案落喺邊；(2) 上載 web shell 再瀏覽佢。**

**步驟一：Discover where uploaded files are stored（發現上載檔案存放位置）**。原文嘅邏輯：**A web shell is only code execution once you can browse to its URL**（web shell 要**瀏覽得到佢嘅 URL** 先算 code execution），所以上載任何危險檔案之前，要先搞清檔案落喺邊。你嗰個探測上載（test.txt）已經答咗：回應顯示 `File URL: /uploads/test.txt`，即係檔案被寫入 web root 入面嘅 `/uploads/`。原文再畀兩個確認方法：

- **讀 upload helper 嘅 source**：lab 附咗 `admin/upload.php`，入面設 `$upload_dir = __DIR__ . '/../uploads/'`，每次上載之後會印出儲存 URL。
- **打開探測檔案本身**：瀏覽 `http://localhost:8080/uploads/test.txt`，確認伺服器 serve 到佢。（**`php -S` 開發伺服器對裸 `/uploads/` 目錄會回 404 —— 冇 directory listing —— 所以要測檔案 URL，唔係測資料夾。**）

原文結論：因為 `/uploads/` 位於 web root 內、而 PHP 執行又冇喺嗰度停用，**任何放入去嘅 `.php` 檔案，只要瀏覽返就會被執行**。

**步驟二：Upload a PHP web shell（上載 PHP web shell）**。建立一個叫 `shell.php` 嘅檔案，內容係：

```php
<?php echo system($_GET['cmd']); ?>
```

原文逐塊拆解呢一行（本筆記照佢嘅意思重寫）：

- `<?php ... ?>` 係 **PHP tags**：兩個 tag 之間嘅一切由伺服器上嘅 PHP 解譯器執行。瀏覽器**永遠唔會收到程式碼本身**，只會收到佢嘅輸出。
- `$_GET` 係一個 **PHP superglobal**：一個 array，裝住 URL query string 入面每一個參數。`$_GET['cmd']` 讀取名為 `cmd` 嘅參數，所以喺 URL `shell.php?cmd=id` 入面，佢就裝住字串 `id`。你喺 `cmd=` 後面打乜，就成為呢個值 —— **呢個就係你嘅攻擊輸入到達程式碼嘅路徑**。
- `system()` 係 PHP 內置函數，將一個字串當做**主機作業系統嘅 shell 命令**執行，權限係**web server 帳號嘅權限**，並回傳命令最後一行輸出。
- `echo` 將嗰個輸出印入 HTTP 回應，於是結果出現喺你瀏覽器。

原文用一句總結成條鏈：**your input in the URL → `$_GET['cmd']` → `system()` → a real command executed on the host → its output echoed back to you.** 所以瀏覽 `/uploads/shell.php?cmd=id` 就會行 Linux 嘅 `id` 命令；`?cmd=whoami`、`?cmd=ls /etc`、或者任何其他命令都一樣行得通。

原文再講：用返你喺前面 Repeater 砌好嗰個請求，將 filename 改成 `shell.php`、body 內容改成上面嗰行，再 send —— 回應確認上載，並顯示 backdoor 儲存位置：`/uploads/shell.php`。

最後，**瀏覽你發現嗰個 URL，透過 `cmd` 傳入命令**：伺服器執行命令並回傳佢嘅輸出（`id` 嘅結果，例如 `uid=1000(...) gid=1000(...)`）—— 一個普通用戶帳號而家已經有**伺服器上任意程式碼執行**能力：

```
http://localhost:8080/uploads/shell.php?cmd=id
```

**Conclusion（原文結論）**：訊息瀏覽器只檢查 authentication、唔檢查訊息擁有權（**IDOR**）。`/admin/` 底下嘅 upload helper 對所有請求都 default-deny，**除咗帶檔案嘅 POST**；而嗰個 POST 只檢查 authentication、唔檢查 admin role（**broken function-level authorization**）。最後，helper 將檔案存入 web root，又冇驗證 extension 或 MIME type，所以被上載嘅 PHP 檔案會被 serve 同被執行（**unrestricted file upload → RCE**）。

> ⚠️ 教材外補充：`<?php echo system($_GET['cmd']); ?>` 呢一行係**最經典嘅 web shell 之一**。真實世界嘅 attacker 會再用 `?cmd=` 做偵察（`whoami`、`id`、`uname -a`、`ls`、`cat /etc/passwd`），然後搵方法**由 web server 帳號升級去 root**。**注意：主機層權限提升（§11）唔喺本檔**，➜ 見 `ART_T3_08_HostCompromise_StudyGuide.md`。

---

## 🛠️ 5. 逐節實戰步驟（Try it yourself — Walkthrough）

以下按原文「1 ➔ 2 ➔ 3 ➔ 4」次序，逐步寫明：**做乜 ➔ 喺邊度睇 ➔ 預期結果 ➔ 成功／失敗點分辨**。URL／封包／payload 同原文逐字一致。

### 5.1 主線四步（原文 p.39–41）

**Step 1 — Authenticate as a normal user（以普通用戶身份登入）**

- **做乜**：透過正常 login form 登入，帳號 `john.doe / Welcome2024`（一個冇 admin 權嘅 ordinary account）。
- **喺邊度睇**：login 之後，正常 member 頁面（Messages、My Account）會照常載入。
- **預期結果**：你成功登入，見到一般用戶嘅導覽。
- **成功／失敗點分辨**：見到 Messages／My Account ＝ 成功。如果只係彈返 login form，即係帳密錯咗或者 session 冇建立。
- 原文對應截圖 → `> **圖示描述**：一個已登入嘅普通用戶介面，頁面頂部導覽顯示 Messages、My Account 等 member 選項，冇任何 admin 字樣；用戶名顯示為 john.doe。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 28）

**Step 2 — Open the internal messaging feature（打開內部訊息功能）**

- **做乜**：喺導覽列按 **Messages**，觀察寄畀／寄自 `john.doe` 嘅訊息清單；開一條訊息，留意佢嘅 URL。
- **喺邊度睇**：瀏覽器 address bar。
- **預期結果**：訊息喺 `/message.php?id=1` 打開。
- **成功／失敗點分辨**：URL 出現 `?id=` 形式嘅**數字參數** ＝ 成功找到 IDOR 嘅切入點。
- 原文對應截圖 → `> **圖示描述**：一個「Messages」收件匣列表頁，每一行係一條訊息，顯示寄件人／收件人同標題；點入其中一條後，瀏覽器 URL 顯示 /message.php?id=1 嘅數字參數。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 29）

**Step 3 — Exploit the IDOR to read other users' messages（利用 IDOR 讀其他人嘅訊息）**

- **做乜**：喺 address bar 將 `id` 值改成 `2`、`3`……一路試。應用程式從不檢查擁有權，所以你可以讀到其他用戶之間嘅訊息。
- **喺邊度睇**：每一條 `/message.php?id=N` 嘅回應內容。
- **預期結果**：你搵到一封由 **admin 寄去 it.helpdesk** 嘅訊息，提到管理入口喺 `/admin/`、upload helper 喺 `/admin/upload.php`。
- ⚠️ **教材原文如此**：原文 **§3 同 §8 對 message id 嘅講法唔一致**（§8 話 `id=1` 係 admin↔it.helpdesk、`id=2` 係自己；§3 話自己嗰條喺 `id=1`、要試 `id=2/3` 才搵到 admin 嗰條）。**以你 lab 實測為準**。
- **成功／失敗點分辨**：睇到**唔屬於 `john.doe`** 嘅訊息內容 ＝ IDOR 成功。若每條 id 都只出自己嘅訊息或者錯誤頁，就要確認 session 仍在。
- 原文對應截圖 → `> **圖示描述**：/message.php?id=2 或類似頁面顯示一封並非寄畀 john.doe 嘅內部訊息，內容明文提到管理入口 /admin/ 同 /admin/upload.php 兩個路徑。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 30）

**Step 4 — 進入 §3.1（Discovering the hidden admin endpoint）**

- **做乜**：見下節 5.2。

### 5.2 §3.1 發現隱藏 admin endpoint（原文 p.41–46）

**3.1 Step 1 — Probe the main admin dashboard（探測主 admin dashboard）**

- **做乜**：仍然係 `john.doe` 登入狀態，直接去 `http://localhost:8080/admin.php`。
- **喺邊度睇**：瀏覽器回應內容。
- **預期結果**：伺服器回 **"Access denied. Only administrators can view this page."**。
- **成功／失敗點分辨**：呢個係「**正常**」結果 —— 代表 dashboard **有** enforce admin role（`is_admin()` check）。原文補充：冇任何帳號時，member 頁面（例如 `/message.php`）會直接 redirect 你去 login form。
- 原文對應截圖 → `> **圖示描述**：瀏覽 http://localhost:8080/admin.php 之後嘅頁面，顯示一句 "Access denied. Only administrators can view this page."，代表已登入嘅普通用戶都被拒。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 31）

**3.1 Step 2 — Probe the Management Portal（探測 Management Portal）**

- **做乜**：仍然係 `john.doe`，去 `http://localhost:8080/admin/index.php`。
- **喺邊度睇**：瀏覽器回應內容。
- **預期結果**：呢頁**都係 default-deny** —— 就算已登入嘅普通用戶，都收到 "Access denied. Only administrators can view this page."。
- **成功／失敗點分辨**：portal **唔會**畀你睇佢嘅 user list 或 upload form。原文提醒：**入 `/admin/` 嘅唯一一道門，就係個 upload handler**，佢仍然會回應**任何已登入 session** 嘅 POST 請求。
- 原文對應截圖 → `> **圖示描述**：瀏覽 http://localhost:8080/admin/index.php 之後嘅頁面，同樣顯示 "Access denied. Only administrators can view this page."，portal 嘅用戶列表同上載表格都冇出現。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 82）

**3.1 Step 3 — Enumerate the /admin directory（列舉 /admin 目錄）**

- **做乜**：跑目錄爆破工具打 `/admin`，配常用字典。Gobuster 最簡命令（原文如此）：

```bash
gobuster dir -u http://localhost:8080/admin -w /usr/share/wordlists/dirb/common.txt
```

- **喺邊度睇**：工具輸出嘅 status code。原文亦可以喺 Burp Suite 用 Intruder：將 `http://localhost:8080/admin/§path§` 送入 Intruder、載入目錄字典做 payload、搵**唔係 404** 嘅回應。
- **預期結果**：本 lab 上，**未登入時每個存在嘅路徑回 302（redirect 去 login）**；**已登入嘅非 admin 用戶收到「Access denied」頁**。So scan 確認兩個 endpoint 存在（回 302 而唔係 404）：

```
/admin/index.php (Status: 302)
/admin/upload.php (Status: 302)
```

- **成功／失敗點分辨**：見到 302 而唔係 404 ＝ 路徑**存在**。原文陷阱提醒：**302 只係話你知路徑存在，唔話你知佢做乜** —— 要靠「IDOR 讀到嘅 admin 訊息」＋「portal JS」共同指向 `/admin/upload.php`。
- 原文對應截圖 → `> **圖示描述**：一個目錄爆破工具（Gobuster／ffuf／Dirbuster 或 Burp Intruder）嘅輸出清單，上面見到 /admin/index.php 同 /admin/upload.php 兩項都標住 Status: 302，其餘路徑係 404。（原教材截圖，本筆記不轉載圖片）`

**3.1 Step 4 — Cross-check the portal's JavaScript（交叉比對 portal 嘅 JS）**

- **做乜**：打開 portal 嘅 JS asset `http://localhost:8080/admin/js/admin.js`（`/admin/` 底下嘅靜態檔案冇 role check，普通用戶都開得）。
- **喺邊度睇**：JS 檔案內容。
- **預期結果**：入面 hard-code 咗 `ADMIN_UPLOAD_ENDPOINT = '/admin/upload.php'`，證實咗 scan 搵到嘅 endpoint。
- **成功／失敗點分辨**：喺 JS 度見到 `/admin/upload.php` ＝ 確認 endpoint 名同路徑。原文：嗰個 endpoint 接受**任何已登入 session** 嘅上載，你只係要**自己砌個 POST 請求**。
- 原文對應截圖 → `> **圖示描述**：瀏覽器打開 http://localhost:8080/admin/js/admin.js，見到 JavaScript 原始碼入面寫住 ADMIN_UPLOAD_ENDPOINT = '/admin/upload.php'。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 32）

原文亦指出：你可以喺瀏覽器直接讀改動後嘅 lab code（`http://localhost:8080/admin/index.php`、`http://localhost:8080/admin/upload.php`，或用 `view-source:` 前綴睇未 render 版本），睇到 4.7 節嗰兩段 `if` —— 呢兩段正正顯示咗個 gap。

- 原文對應截圖 → `> **圖示描述**：以 view-source 或直接讀檔方式顯示 admin/index.php 同 admin/upload.php 嘅 PHP 原始碼，清楚見到 admin/index.php 只有 if (!is_admin()) 檢查，而 admin/upload.php 嘅條件係「!is_admin() &&（非 POST 或冇 file）」，即帶檔案嘅 POST 可繞過。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 103、104）

**3.1 Step 5 — Copy your session cookie out of the browser（由瀏覽器抄出 session cookie）**

- **做乜**：因為 upload form 永遠唔會畀你睇到，你要**自己送請求**、並附上你嘅真實 session 作為登入憑證。打開 Firefox DevTools（F12）→ Storage → Cookies → `http://localhost:8080`，抄低 `PHPSESSID` cookie 嘅值（一個睇落隨機嘅字串，例如 `v8k2…f3a1`）。
- **喺邊度睇**：DevTools 嘅 Cookies 面板。
- **預期結果**：你得到伺服器用嚟認出你係 `john.doe` 嘅 session ID。
- **成功／失敗點分辨**：抄到一個看似隨機嘅字串 ＝ 成功。
- 原文對應截圖 → `> **圖示描述**：Firefox DevTools 嘅 Storage → Cookies 面板，選中 http://localhost:8080，見到一項 PHPSESSID 同佢嗰串隨機外觀嘅值。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 83）

**3.1 Step 6 — Build the upload request by hand in Burp Repeater（手砌上載請求）**

- **做乜**：喺 Burp 捕捉任何一個對 lab 嘅請求，right-click → Send to Repeater，再改寫成一個檔案上載。原文話四個部分最緊要：
  - **Method and path** — `POST /admin/upload.php HTTP/1.1`（GET 係 default-deny，只有 POST 入到 upload 邏輯）。
  - **Cookie header** — 貼上你抄低嘅 session：`Cookie: PHPSESSID=<your value>`。
  - **Content-Type** — 改成 `multipart/form-data; boundary=X`（普通 urlencoded body 只帶到文字；檔案要 multipart，每格用 `--boundary` 分隔）。
  - **The file field** — 一個 multipart body part，寫明 field 名、filename 同內容。
- **喺邊度睇**：Burp Repeater 嘅 request／response 面板。
- **預期結果**：一個完整嘅 multipart 上載請求，例如原文所示：

```
POST /admin/upload.php HTTP/1.1
Host: localhost:8080
Cookie: PHPSESSID=<your session id>
Content-Type: multipart/form-data; boundary=X
--X
Content-Disposition: form-data; name="file"; filename="test.txt"
Content-Type: text/plain
hello
--X--
```

- **成功／失敗點分辨**：因為個 form 對你隱藏，你**要猜 field 名**（上面 `name="file"`）。原文畀咗一個「oracle（預言機）」：**錯名 → 送一個冇檔案嘅 POST → default-deny 規則回 403 Access denied；啱名 → 回 "File uploaded successfully" 同 `File URL: /uploads/test.txt`**。原文話開發者會重用一組細範圍嘅名，逐個試：`file`、`upload`、`uploadfile`、`file_upload`、`attachment`、`userfile`、`doc`、`document`、`image`、`photo`。本 lab handler 讀 `$_FILES['file']`，所以 **`file` 先係啱嗰個名**。
- 原文對應截圖 → `> **圖示描述**：Burp Repeater 顯示一個改寫成 multipart/form-data 嘅 POST /admin/upload.php 請求，response 顯示 "File uploaded successfully" 同 File URL: /uploads/test.txt。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 84）

### 5.3 §3.2 由 upload 到 code execution（原文 p.46–48）

**3.2 Step 1 — Discover where uploaded files are stored（搵上載檔案落喺邊）**

- **做乜**：用兩種方法確認。**方法一**：讀 upload helper source —— lab 附咗 `admin/upload.php`，入面設 `$upload_dir = __DIR__ . '/../uploads/'`，每次上載後會印出儲存 URL。**方法二**：打開探測檔案本身 —— 瀏覽 `http://localhost:8080/uploads/test.txt`，確認伺服器 serve 到佢。
- **喺邊度睇**：回應同 URL。
- **預期結果**：上一步嘅回應已經印咗 `File URL: /uploads/test.txt`，即係檔案寫入 web root 內嘅 `/uploads/`。
- **成功／失敗點分辨**：**`php -S` 開發伺服器對裸 `/uploads/` 目錄回 404（冇 directory listing），所以要測檔案 URL，唔係測資料夾**。瀏覽 `/uploads/test.txt` 睇到內容 ＝ 成功。
- 原文對應截圖 → `> **圖示描述**：瀏覽器打開 http://localhost:8080/uploads/test.txt，直接顯示上載嘅純文字內容（hello），證明檔案存喺 web root 內可被直接存取。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 33）

**3.2 Step 2 — Upload a PHP web shell（上載 PHP web shell）**

- **做乜**：建立一個叫 `shell.php` 嘅檔案，內容如下（原文如此）：

```php
<?php echo system($_GET['cmd']); ?>
```

- **喺邊度睇**：Burp Repeater。用返你喺 3.1 Step 6 砌好嗰個請求，將 **filename 改成 `shell.php`**、**body 內容改成上面嗰行**，再 send。
- **預期結果**：回應確認上載，並顯示 backdoor 儲存 URL：`/uploads/shell.php`。
- **成功／失敗點分辨**：見到 `/uploads/shell.php` ＝ 成功。
- 原文對應截圖 → `> **圖示描述**：Burp Repeater 顯示 multipart 請求嘅 filename 改為 shell.php、內容為一行 PHP web shell，response 確認上載並顯示 File URL: /uploads/shell.php。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 34）

**3.2 Step 3 — Browse to the URL, passing a command via cmd（瀏覽 URL，用 cmd 傳命令）**

- **做乜**：瀏覽 `http://localhost:8080/uploads/shell.php?cmd=id`。
- **喺邊度睇**：瀏覽器回應內容。
- **預期結果**：伺服器執行命令並回傳輸出（`id` 嘅結果，例如 `uid=1000(...) gid=1000(...)`）—— 一個普通用戶帳號而家有伺服器上**任意程式碼執行**能力。
- **成功／失敗點分辨**：瀏覽器顯示命令輸出（唔係 PHP 原始碼、唔係 404）＝ RCE 成功。
- 原文對應截圖 → `> **圖示描述**：瀏覽 http://localhost:8080/uploads/shell.php?cmd=id 之後，瀏覽器顯示 Linux id 命令嘅輸出，例如 uid=1000(...) gid=1000(...)，證明 web shell 已可執行伺服器命令。（原教材截圖，本筆記不轉載圖片）`（對應 Screenshot 35）

---

## 🧩 6. 新手補充：零經驗專用講解

本節係本檔最花心思嘅一節，全部標 `> ⚠️ 教材外補充`。

### 6.1 「權限提升」到底係咩意思？

> ⚠️ 教材外補充：**「權限提升」就係你手上有嘅「身份」同你想做嘅「操作」對唔上。** 你手係 `john.doe`（普通用戶），但你想讀 admin 嘅信、想入 admin 嘅頁、想喺伺服器行命令 —— 呢啲**超出你身份嘅事**，一旦做得到就叫權限提升。有兩個方向：
> - **橫向（horizontal）**：同級之間越權 —— 你係普通用戶，但睇到**另一個普通用戶**嘅資料（IDOR 讀人哋訊息就係）。
> - **縱向（vertical）**：向上升級 —— 你係普通用戶，但做到**admin／server** 級嘅事（upload → RCE 就係）。
>
> 記住原文一句：**the most common root cause is confusing authentication with authorization.** 即係話：開發者檢查咗「你登入咗未」，但冇檢查「你准唔准」。**登入 ≠ 有權**。

### 6.2 為何 upload 目錄可以執行檔係災難？

> ⚠️ 教材外補充：正常設計入面，**上載檔案**同**執行程式**應該係兩件完全分隔嘅事。一個「上載頭像」嘅功能，理應只能收圖片、只可以存喺一個**唔會執行任何嘢**嘅位置。但本 lab 嘅 `/uploads/` 有兩個致命屬性：
> 1. **佢喺 web root 內** —— 表示你用 `http://localhost:8080/uploads/xxx.php` 就**直達得到**。
> 2. **嗰度冇停用 PHP 執行** —— 表示你瀏覽 `.php` 時，伺服器會**當佢係程式咁行**。
>
> 兩個屬性加埋 = 你上載嘅**內容會變成伺服器上執行嘅程式碼**。呢個就係「由普通用戶直通伺服器控制」嘅原因。安全做法係：收檔案時用 **allow-list（只准 image/jpeg 等）**、**改檔名（rename）**、**存喺 web root 之外**，或者喺 uploads 目錄**明文停用 script 執行**。只要做足其中一兩樣，RCE 就唔成立。

### 6.3 RCE 之後攻擊者可以做到乜？

> ⚠️ 教材外補充：一旦你有一個 web shell（`/uploads/shell.php?cmd=...`），你嘅能力就係「**喺伺服器上、用 web server 帳號嘅權限，行任意命令**」。實際上 attacker 通常會：
> - **確認身份同環境**：`id`、`whoami`、`uname -a`、`hostname`、`pwd` —— 睇吓自己係邊個帳號、部機係咩系統。
> - **蒐集敏感資料**：`ls /etc`、`cat /etc/passwd`、搵 config 檔（可能要跨去④「憑證蒐集」階段，➜ 見 `ART_T3_06_CredentialDiscovery_StudyGuide.md`）。
> - **摸底同橫向移動**：睇有冇其他服務、網絡鄰居、資料庫連接字串。
> - **升級去 root**：搵 suid 檔、核心漏洞、寫 cron 等（**主機層權限提升唔喺本檔**，➜ 見 `ART_T3_08_HostCompromise_StudyGuide.md`）。
> - **維持存取（persistence）**：留後門、加帳號。
>
> 所以「upload → RCE」唔係終點，而係**由「應用層弱點」跳到「主機層控制」嘅橋樑**，殺傷力極大。

### 6.4 呢一步喺瀏覽器同伺服器之間實際發生咩事？

> ⚠️ 教材外補充：以下用「時序」拆解一次，等你腦入面有畫面。以「手砌 upload 請求」為例：
> 1. **你喺 Burp Repeater 按 Send** —— Burp 將一個 `POST /admin/upload.php HTTP/1.1` 連 `Cookie: PHPSESSID=<值>`、`Content-Type: multipart/form-data; boundary=X` 同檔案內容，送到 `localhost:8080`。
> 2. **PHP 開始執行 `admin/upload.php`** —— 佢第一件事做個 `if` 檢查：`!is_admin()` 為真（你係普通用戶），但 `REQUEST_METHOD === 'POST'` 且 `isset($_FILES['file'])` 為真，所以括號內為假、整個條件為假 → **唔會 403**。
> 3. **伺服器讀取 `$_FILES['file']`** —— 呢個 superglobal 裝住你上載檔案嘅臨時路徑、原名、size、type。
> 4. **`move_uploaded_file()` 之類搬到 `$upload_dir`** —— `$upload_dir = __DIR__ . '/../uploads/'`，即 `admin/` 上一層嘅 `uploads/`，位置喺 **web root 內**。
> 5. **回應印出 `File URL: /uploads/shell.php`** —— 呢個就係你之後瀏覽嘅 URL。
> 6. **你瀏覽 `/uploads/shell.php?cmd=id`** —— web server 發現 `.php`，交畀 **PHP 解譯器**執行；`$_GET['cmd']` 讀到 `id`，`system()` 以 **web server 帳號權限**跑佢，`echo` 將輸出寫入 HTTP response。
> 7. **你嘅瀏覽器顯示** `uid=1000(...) gid=1000(...)` —— 到呢一刻，「檔案上載」正式變成「命令執行」。
>
> 一句總結：**你嘅輸入（URL/檔案）→ 伺服器接受 → 存喺可執行位置 → 你叫返佢執行 → 輸出回你**。每一步都冇「擁有權檢查」呢一關。

### 6.5 新手最常撞嘅 5 個卡點同解決方法

> ⚠️ 教材外補充：
> 1. **Burp 收唔到 request（Intercept 冇反應）** —— 多數係瀏覽器 proxy 未設好或者 FoxyProxy／Burp CA 未匯入。逐項檢查：Burp Proxy listener 有冇開（預設 8080）、瀏覽器 proxy 有冇指向 127.0.0.1:8080、HTTPS 的話 Burp CA cert 有冇 import 入瀏覽器 trust store。（設定細節見 `ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md`）
> 2. **POST 上載回 403 Access denied** —— 好可能係 **field 名猜錯**。記住原文嘅 oracle：冇檔案嘅 POST 會被 default-deny 擋成 403。逐個試 `file`、`upload`、`uploadfile`、`file_upload`、`attachment`、`userfile`、`doc`、`document`、`image`、`photo`。
> 3. **忘了 `Content-Type` / boundary 唔對** —— multipart 請求嘅 `Content-Type` 一定要係 `multipart/form-data; boundary=X`，而 body 每個 part 用 `--X` 分隔、收尾用 `--X--`。錯 boundary 會令伺服器解唔到檔案。
> 4. **Cookie 過期／冇帶 session** —— `PHPSESSID` 係有時效嘅。如果你中間 logout 或者開咗第二個 session，個 cookie 就失效，upload 會 403。解決：喺 DevTools 重新抄一次當前 session 值。
> 5. **payload 編碼問題／瀏覽器亂開 URL** —— 如果 `cmd=` 後面嘅命令帶空格或者特殊符號（例如 `ls /etc`），要 URL-encode（空格 → `%20`）。另外唔好用瀏覽器直接開 `/uploads/` 資料夾（`php -S` 會 404），要開**具體檔案 URL**。

### 6.6 點樣判別自己成功定失敗？

> ⚠️ 教材外補充：睇「**回應內容係唔係超出你嘅權限**」：
> - **IDOR 成功**：你（`john.doe`）睇到**唔屬於你**嘅訊息內容（例如 admin 寄 it.helpdesk）。失敗 = 每條 id 都只出自己訊息，或者彈錯誤。
> - **目錄爆破成功**：一個路徑回 **302（存在）** 而唔係 404（唔存在）。記住 302 只證明存在，唔證明用途。
> - **Broken function-level auth 成功**：用普通 session 嘅**帶檔案 POST** 得到 `File uploaded successfully`（而唔係 403）。
> - **RCE 成功**：瀏覽 `shell.php?cmd=id` 見到命令輸出（如 `uid=1000(...)`）而**唔係** PHP 原始碼、唔係 404、唔係空白頁。若見到一坨 PHP 程式碼文字，表示該目錄**冇**執行 PHP —— 即係你唔係 RCE，只係讀到檔案。

---

## 💬 7. Student questions 詳解

原文 §3 有 **3 條** student questions（PDF 只有題目，答案要自己寫）。以下逐條列出英文原題＋原題號，下面附建議答案。

### Q1（原題 1）

> Explain the root cause of an Insecure Direct Object Reference (IDOR): which authorization check is missing, why sequential numeric object IDs provide no protection, and what the server must verify on every object request.

> ⚠️ 教材外補充（答案）：
>
> **English key points**：The root cause is a missing **object-level authorization (ownership) check**. The application uses the user-supplied identifier (e.g. `id`) to fetch the record directly, but never verifies that the requesting user is allowed to access that specific object. Sequential numeric IDs provide no protection because they are **guessable / enumerable** — an attacker simply increments the value (`id=1,2,3`). On every object request the server must verify **ownership or permission**: confirm the currently authenticated user owns (or is otherwise authorised to access) that object, server-side.
>
> **繁中拆解**：考 IDOR 要答出三件事 ——**(1) 缺嘅係邊個檢查**：缺 **object-level authorization（ownership check）**，唔係缺 authentication；**(2) 為何順序 ID 冇保護**：因為順序／可預測 = 可枚舉，攻擊者毋須猜，`id++` 就掃全表；**(3) 伺服器每次要驗乜**：要喺**伺服器端**驗證「當前用戶係唔係擁有（或獲授權存取）呢個物件」—— 用 session 入面嘅身份去比對物件嘅 owner，而唔係信 URL 個數字。
>
> **常見錯答**：只答「要加密個 ID」或者「用 UUID」。UUID 可以減低可預測性，但**唔係**根本修正 —— 如果冇 ownership check，一個 leaked UUID 一樣可以越權存取。**根因係缺 authorization check，唔係 ID 形式。**

### Q2（原題 2）

> Small information leaks chain into full compromise. Describe the reconnaissance methodology for pivoting from a leaked path mention and a JavaScript asset to a hidden, unlinked administrative endpoint.

> ⚠️ 教材外補充（答案）：
>
> **English key points**：Start from the leak: an IDOR on `/message.php?id=` reveals an internal admin message mentioning `/admin/` and `/admin/upload.php`. Probe the obvious admin paths directly (`/admin.php`, `/admin/index.php`) — both are default-deny (403), so they confirm the area exists but are closed. Run **directory brute-force** (Gobuster / ffuf / Dirbuster / Burp Intruder) against `/admin` with a common wordlist; **a 302 (not 404) confirms a path exists**. Then **cross-check static assets**: browse the portal's JavaScript (`/admin/js/admin.js`), which is served without a role check to a normal user and hard-codes `ADMIN_UPLOAD_ENDPOINT = '/admin/upload.php'`. Combine the leak, the scan results, and the JS map to identify the unlinked upload endpoint, and call it by hand.
>
> **繁中拆解**：呢條考「**由細微資訊串連到完整淪陷**」嘅偵察方法論。四個 step：**(1) 起點係 leak** —— IDOR 讀到 admin 內部訊息，得到關鍵字 `/admin/`、`/admin/upload.php`；**(2) 先探已知頁** —— `/admin.php` 同 `/admin/index.php` 都 403（default-deny），證明區域存在但關咗；**(3) 目錄爆破** —— 用工具 + 字典打 `/admin`，**302 唔係 404 = 路徑存在**；**(4) 交叉比對靜態檔** —— 普通用戶竟然開得 `/admin/js/admin.js`，佢 hard-code 咗 `/admin/upload.php`，將「存在但唔知用途」嘅 302 補成「呢個就係 upload endpoint」。最後**手砌 POST 去 call 佢**。
>
> **常見錯答**：只答「用 Gobuster 掃」。掃係必要，但唔夠 —— 考點係**如何由 302 推斷用途**（靠 leak ＋ JS 兩條線索交叉比對），以及**靜態檔冇 role check 都係一條 leak**。

### Q3（原題 3）

> An unrestricted file upload becomes remote code execution only when several defenses fail together. Which three properties — authorization, file-type validation, and storage location — must all be wrong for RCE, and what does a safe design require for each?

> ⚠️ 教材外補充（答案）：
>
> **English key points**：Three defenses must all fail: (1) **Authorization** — the upload endpoint must be callable by an attacker who lacks the required role. Safe design: enforce the correct role check on every function (server-side), including file-carrying POSTs. (2) **File-type validation** — the server must not enforce an extension / MIME allow-list. Safe design: allow-list permitted extensions and MIME types (e.g. images only), validate server-side, and never trust the client-supplied filename or Content-Type. (3) **Storage location** — the file must land inside the web root and the directory must allow script execution. Safe design: rename files, store them **outside the web root**, or disable script execution on the uploads directory.
>
> **繁中拆解**：考點係「**三個防禦要一齊錯先有 RCE**」，任何一個做對都斷鏈。逐個講：
> - **Authorization**：本 lab 嘅 upload 只有 session-only check（普通用戶叫得動）。安全設計 = **每個 function 都做正確 role check**，包括帶檔案嘅 POST。
> - **File-type validation**：本 lab 乜都收。安全設計 = **allow-list extension + MIME**，伺服器端驗證，唔可以信 client 交嚟嘅 filename／Content-Type；加 magic bytes 檢查更好。
> - **Storage location**：本 lab 放入 web root 且可執行。安全設計 = **rename 檔案、存喺 web root 之外**，或**喺 uploads 目錄停用 script 執行**。
>
> **常見錯答**：只答「叫用戶唔好上載危險檔案」或者「檢查 file 尾有冇 .php」。黑名單（blocklist）容易繞過，業界標準係 **allow-list**；而且就算擋住 extension，都可能靠 MIME 或者 polyglot 檔繞過 —— 所以**三個防禦要一齊做**。

---

## 🎒 8. 考前 5 分鐘懶人包 ＋ 自測

### 8.1 本階段必背關鍵數字／事實

- 三個相扣弱點：**IDOR（horizontal）→ Broken function-level authorization → Unrestricted upload（vertical）**。
- **`/admin/upload.php`** 係全個 `/admin/` 樹唯一漏檢查嘅 endpoint，條件寫成「`!is_admin()` **AND**（非 POST **OR** 冇 file）」。
- upload 檔案落入 **`/uploads/`**（web root 內）；`$upload_dir = __DIR__ . '/../uploads/'`。
- **302 = 存在（未登入時）**；**404 = 唔存在**；**403 = 存在但你冇權**。
- OWASP：**A01:2021 Broken Access Control**、**A04:2021 Insecure Design**。
- CWE：**285**（Improper Authorization）、**639**（Authorization Bypass Through User-Controlled Key / IDOR-BOLA）、**434**（Unrestricted Upload of File with Dangerous Type）。
- 目錄爆破工具：**Dirbuster、Gobuster、ffuf、Burp Intruder**；常用路徑：`/admin`、`/api`、`/uploads`、`/.git`。
- Web shell 一行：`<?php echo system($_GET['cmd']); ?>`。

### 8.2 Payload／指令對照表

| 步驟 | 指令 / payload（原文如此） | 作用 |
|---|---|---|
| 目錄爆破 | `gobuster dir -u http://localhost:8080/admin -w /usr/share/wordlists/dirb/common.txt` | 列舉 `/admin` 底下路徑 |
| IDOR 探測 | `/message.php?id=1` → `id=2`、`id=3` | 改 ID 讀其他人訊息 |
| Session 值 | Firefox DevTools → Storage → Cookies → `PHPSESSID` | 手砌請求要附上 |
| 上載請求 | `POST /admin/upload.php HTTP/1.1` + `Cookie: PHPSESSID=<...>` + `Content-Type: multipart/form-data; boundary=X` | 繞過 default-deny |
| 檔名 oracle | `name="file"`（試：file, upload, uploadfile, file_upload, attachment, userfile, doc, document, image, photo） | 搵啱 field 名 |
| Probe 檔案 | `/uploads/test.txt` | 確認檔案可被 serve |
| Web shell | `<?php echo system($_GET['cmd']); ?>` | 一行 backdoor |
| 執行命令 | `/uploads/shell.php?cmd=id` | RCE（如 `uid=1000(...)`） |

### 8.3 英文必背句

- Privilege escalation occurs when a user can perform actions or access resources beyond their authorized role.
- Developers often treat an identifier as if it were a secret.
- A 302 only tells you that a path exists — it does not tell you what the path is actually for.
- The admin surface is default-deny almost everywhere — one forgotten check on a single POST is your way in.
- A web shell is only code execution once you can browse to its URL.

### 8.4 五條自測問題

1. IDOR 缺嘅係 authentication 定 authorization check？伺服器每次要驗乜？
2. 為何 `/admin/index.php` 拒絕你，但 `/admin/upload.php` 收你嘅檔案？（用佢個 `if` 條件解釋）
3. 目錄掃描見到 302 而唔係 404，代表咩？佢**唔**代表咩？
4. 上載變成 RCE 需要邊三個防禦同時失效？
5. `<?php echo system($_GET['cmd']); ?>` 之中，`$_GET['cmd']` 同 `system()` 分別做乜？

**答案（最後一行）**：1) authorization（object-level／ownership）；伺服器要驗當前用戶擁有或獲授權存取該物件。2) `index.php` 淨係 `!is_admin()`→403；`upload.php` 條件係「`!is_admin()` **AND**（非 POST **OR** 冇 file）」，帶檔案嘅 POST 令條件為假→放行，且冇 role／extension／MIME 檢查。3) 代表路徑**存在**（未登入時回 302 redirect 去 login）；**唔**代表你知佢做乜用途。4) authorization、file-type validation、storage location（web root + 可執行）。5) `$_GET['cmd']` 由 URL query string 讀 `cmd` 參數值（攻擊輸入）；`system()` 將該字串當 shell 命令、以 web server 帳號權限執行並回傳輸出。

---

## 🛡️ 9. 防守方修正清單（Defender Fix Checklist）

原文 “How to fix (for defenders)” 嘅要求：**喺每個 endpoint 都 enforce 伺服器端 authorization —— 檢查 admin role（唔只係 session）；喺每一個收 ID 嘅 query 驗證物件擁有權；將 upload 當作敵意（hostile）處理 —— allow-list extensions 同 MIME types、rename 檔案、存喺 web root 之外（或喺 uploads 目錄停用 script 執行）、並記錄 authorization failures。**

以下逐個漏洞列出具體修法（原文有嘅照收，另加教材外補充）：

| 漏洞 | 原文修法 | 教材外補充（具體做法） |
|---|---|---|
| IDOR / Broken Object Level Authorization | 喺每個收 ID 嘅 query 驗證物件擁有權 | 由 session 拎當前 user id，喺 SQL 加 `WHERE id = :id AND owner_id = :current_user`；用 **授權層（authorization layer／middleware）** 統一處理，唔好散落各處 |
| Broken function-level authorization | 喺 `/admin/` 底下每個 function 檢查 admin role，唔淨係 session | 用**集中式 role-based access control（RBAC）**；**default-deny** —— 新 endpoint 未明確批准就一律拒絕；`upload.php` 個 `if` 條件要重寫成先檢查 role 再檢查 method |
| Unrestricted file upload | 將 upload 當敵意；allow-list extensions 同 MIME types、rename 檔案、存喺 web root 之外（或停用 script 執行） | 伺服器端驗證 **extension allow-list + MIME + magic bytes**；**隨機 rename**；存喺 web root 之外，或喺 uploads 目錄用 web server 設定停用 PHP 執行（例如 nginx `location ~* \.php$ { deny all; }`）；設檔案大小上限；**唔好**用 client 交嚟嘅 filename |
| 一般授權失敗 | 記錄 authorization failures | 寫入 audit log（唔要只係回 403 就算）；對**大量 403／IDOR 掃描**做告警 |

**PHP／ASP.NET 一般做法補充**：

> ⚠️ 教材外補充：
> - **PHP**：上載目錄喺 Apache 用 `.htaccess` 加 `php_flag engine off`，或者用 `RewriteRule` 擋 `.php` 執行；存檔時用 `move_uploaded_file()` 之餘，改做隨機檔名 + 強制非執行目錄；驗證用 `finfo`／`getimagesize` 做 magic bytes 檢查。授權層面用 middleware 統一檢查 role，唔好逐個檔重複寫 `if`。
> - **ASP.NET**：用 `[Authorize(Roles = "Admin")]` attribute 做 function-level authorization（預設就係 per-endpoint），配合 policy-based authorization；檔案上載用 `IFormFile` 明確白名單 extension／content type，並**存喺 `wwwroot` 之外**（例如 App_Data）再用受控 controller 派發。

➜ 對應速記：`ART_Final_CheatSheet.md`
➜ 上一階段（初始存取）：`ART_T3_03_InitialAccess_A_CredentialAttacks_StudyGuide.md`、`ART_T3_04_InitialAccess_B_Injection_OAuth_StudyGuide.md`
➜ 下一階段（憑證蒐集）：`ART_T3_06_CredentialDiscovery_StudyGuide.md`
➜ 主機層權限提升（本檔唔覆蓋）：`ART_T3_08_HostCompromise_StudyGuide.md`

---

> **本檔邊界提醒**：本筆記只覆蓋原文 §3（PDF p.35–49）。攻擊鏈②（初始存取）、④（憑證蒐集）、⑤（橫向檔案存取）、⑥（主機淪陷）分別由其他分冊負責，本檔只作交叉引用。
