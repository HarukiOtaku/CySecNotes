# ART_T3 Before You Start：零經驗先修（Prerequisites Primer）— 雙語應考學習指南

> **原教材**：Advanced Red Team — Tutorial 3（教材外補充）｜對應原文 Introduction 叫你去睇、但 PDF 入面**唔存在**嘅「Before You Start」章節
> **這份檔喺系列嘅位**：全系列嘅**先修檔**（編號 `00`，喺 `ART_T3_01` 之前讀）。喺你仍未開 `ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md` 之前，先讀呢份。呢份**唔教安裝**（安裝步驟全部留喺 01 檔），只教你**概念、心態、法律邊界、工具地圖同學習路線**。
> **⚠️ 全檔性質**：本檔 **100% 係教材外補充**（原文冇呢一章）。所有內容係為零實戰經驗嘅學生而寫，唔可以當成教材原文引用。
> **前置**：冇。呢份係真·第一份。
> **⚠️ 法律聲明**：本檔關於法律嘅部分**唔係法律意見**，只作一般理解用途；實際法律責任請諮詢合資格嘅法律專業人士。

---

### 🧭 0. 呢份檔點用（How to use this primer）

呢份檔解決一個好實際嘅問題：**原文一開始就叫人「If you are completely new to web security, start with Before You Start」，但呢一章根本冇喺 PDF 出現過。** 原文由第 4 頁就開始假設你識 Kali、識 Burp、識 HTTP。對零經驗嘅你，一跳入去就會撞牆。所以呢份檔就係嗰段**缺失嘅橋**。

**呢份檔點解要存在（三個缺口）**：

1. **名詞缺口**：原文假設你聽得明 client/server、DNS、HTTP request、cookie、proxy、SQLi、NoSQL⋯，但冇解釋。
2. **法律缺口**：原文教你打靶場，但冇講清楚「幾時可以打、幾時犯法」。
3. **路線缺口**：原文冇一個「我應該由邊度開始、每節點學」嘅地圖。

**讀法建議**：呢份檔唔使一次過背晒。你可以**先讀 Part A（心態同法律）＋ Part H（攻擊鏈同路線）**，然後當你睇 01 檔同之後每一節撞到唔明嘅名詞，就返嚟查對應嘅 Part B–G。呢份檔係你嘅「字典」，唔係叫你由頭到尾死記。

> **English Standard Definition:** This primer fills the missing "Before You Start" chapter: it explains the concepts, the legal boundary, the tool map, and the learning path that the tutorial assumes you already know.

**同 `ART_T3_01` 嘅分工（重要）**：

| 內容 | 喺邊份檔 |
|---|---|
| 工具**點安裝**、靶場**點啟動**、CA **點 import**、FoxyProxy **點設定** | `ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md` |
| 工具**係乜概念**、**幾時用**、**點解要咁用** | **本檔** |
| 未解釋過嘅**名詞白話拆解**（proxy、curl、HTTP 302 係乜） | **本檔**（各 Part）＋ 各階段檔嘅第 3 節 |
| 雙語**術語表** | `ART_T3_09_Glossary_StudyGuide.md` |

> ⚠️ 教材外補充：本檔同 01 檔**刻意有少量重疊**（例如 server、proxy、SQLite 嘅定義），因為 01 檔係「環境與工具」檔，需要即場用到呢幾個概念。本檔嘅寫法係**更深入嘅概念版**，唔係重複安裝步驟。

---

## 🎯 學習目標（Learning Objectives）

讀完呢份「Before You Start」，你應該要能夠：

1. **講出呢個 lab 係乜，同點解要打佢** — Explain what a deliberately vulnerable lab is and why we practise on it
2. **用攻防兩把尺思考** — Think with two lenses: how to break it, and how to fix it
3. **清楚講出法律與道德邊界** — State the legal and ethical boundary: only your own lab or a written, authorised target
4. **解釋一個 HTTP request／response 嘅結構** — Describe the structure of an HTTP request and response
5. **分清楚 client-side 同 server-side** — Tell client-side validation apart from server-side validation
6. **讀懂一段 PHP 同 SQL** — Read simple PHP (superglobals、`include()`、字串拼接) and SQL (`SELECT`／`WHERE`／`UNION`)
7. **明白為何要將瀏覽器指向 Burp** — Explain why traffic goes browser → Burp → server
8. **講出每個工具係乜、喺邊一節用到** — Name each tool and which section of the tutorial uses it
9. **將一個網站睇成「一堆檔案 ＋ 一個資料庫」** — Picture a web app as files plus a database
10. **背出攻擊鏈 6 階段同建議學習次序** — Recite the six attack-chain phases and the recommended study order
11. **遇到卡住時有系統咁排查** — Troubleshoot in a fixed order: environment → request → payload → understanding

---

## Part A — 呢個 lab 係乜、心態、法律與道德邊界

### 🛡️ 1. 呢個 lab 係乜（What this lab is）

**一句定義**：呢個 lab 係一個**故意整到有安全漏洞嘅「政府入口網站」**——用 PHP 寫、用 SQLite 做資料庫、跑喺課程網站嘅 VM 度，表面睇落完全正常，但底層被人刻意放滿常見嘅安全錯誤（弱密碼、IDOR、SQL injection、LFI、SSRF⋯），目的係畀你**安全地**練習攻擊同防守。

**生活化比喻**：呢個 lab 就好似一個**飛行模擬器**。真機師唔會第一次學飛就上真飛機——佢入模擬器，故意飛去撞、故意熄引擎，睇吓會發生咩事，撞咗都唔會死人。你呢個 lab 就係「網站版飛行模擬器」：你可以隨便試、隨便打，因為**佢本來就係設計畀人打嘅**。

> **English Standard Definition:** A vulnerable lab is a deliberately broken application built only for practice, so you can attack it freely without hurting anyone.

> ⚠️ 教材外補充：原文原句係——呢個 lab「looks like a normal government website on the surface, but underneath it is deliberately built with common security mistakes.」重點係「**deliberately**（故意）」——呢個係佢同真實網站最關鍵嘅分別，亦係你唯一有權去打嘅原因。

**表面 vs 底下**：你要習慣一個紅隊嘅眼光——一個網站「用得、睇落正常、有 HTTPS」完全唔代表佢安全。開發者往往冇為意自己寫嘅一行 `include()`、一個 `$_GET` 就係破口。你嘅工作就係搵出呢啲「**開發者冇為意嘅錯誤**」。

> **English Standard Definition:** A site that works and looks normal is not automatically secure; your job is to find the mistakes the developer never noticed.

### 🧠 2. 你應該帶住咩心態（攻防思維）

**一句定義**：攻防思維（attacker-and-defender mindset）＝ 每次見到一個功能，同時問兩條問題：**（1）攻擊者可以點樣繞過或濫用佢？（2）防守者當初應該點寫先唔會出錯？**

**生活化比喻**：好似一個**驗樓師**。佢唔係賊，但佢要**用賊嘅手法**去試每一道門、每一扇窗——試完之後，佢唔係去偷嘢，而係寫報告叫業主「呢道門要換鎖」。紅隊做嘅嘢一模一樣：用攻擊者嘅手法，得出防守者嘅建議。

> **English Standard Definition:** Think like an attacker, but your purpose is defence: find the mistake, prove why it is dangerous, then explain the fix.

**三個唔可以帶嘅心態**（新手最易犯）：

| 唔好嘅心態 | 點解錯 | 應該點 |
|---|---|---|
| 「我撳唔到個制，所以佢安全」 | 前端限制喺你自己部機度，你部機你話事 | 用 Burp／`curl` 直接發 request 試 |
| 「我試咗一次冇事，所以冇漏洞」 | 好多漏洞要放大、重播、改 payload 先現形 | 用 Intruder 自動化、用 Repeater 慢慢改 |
| 「我睇唔明個 code 就當佢安全」 | 睇唔明唔等於冇問題 | 由「input 去咗邊」開始追 |

> **English Standard Definition:** Never trust the client: anything the browser can send can be replayed or modified outside the browser.

### ⚖️ 3. 法律與道德邊界（只可以打邊啲目標）

呢一節係全份檔**最重要**嘅一節。技術你可以慢慢學，但**越界一次就可能係刑事**。

**一句定義**：你只可以對**（1）你自己嘅 lab／靶場**，或**（2）有書面授權嘅目標**進行滲透測試；未經授權去探測、存取別人嘅系統，係**刑事罪行**，唔係「練吓技術」。

**生活化比喻**：武術館入面你可以隨便對打、對練，因為**雙方都同意、喺指定場地**。但你唔可以行出街見到人就打。授權書（authorisation）就係嗰張「同意書」——冇佢，你嘅動作就由「練習」變成「襲擊」。

> **English Standard Definition:** Only test systems you own or have explicit written authorisation to test; unauthorised access is a criminal offence, not practice.

**三條鐵律（背佢）**：

1. **只打自己 lab 或有白紙黑字授權嘅目標。** 授權範圍（scope）要清楚寫明：邊啲 IP／域名、邊段時間、准做啲乜。
2. **未經授權嘅探測已經可能犯法。** 唔一定要「入到數」先算犯法——掃埠、掃目錄、試密碼本身都可能構成未授權存取或相關罪行。
3. **書面、範圍清晰、有時限。** 口頭講「得，你打啦」唔夠；真實工作用 engagement letter／Rules of Engagement（RoE）。

**香港相關法例（一般理解，非法律意見）**：喺香港，未經授權存取電腦系統一般屬刑事罪行，可能涉及**《刑事罪行條例》（第 200 章）**中與「有犯罪或不誠實意圖而取用電腦」相關嘅條文，亦可能涉及其他成文法。呢度只係**一般理解**，**唔係法律意見**；具體條文、罰則同你嘅實際情況，請諮詢合資格法律專業人士。

> ⚠️ 教材外補充（法律，非法律意見）：本教材冇處理法律邊界，但對零經驗學生嚟講，呢點比任何 payload 都重要。真實世界連「測試第三方網站」都可能犯法；唔肯定嘅時候，**停手，先問**。

**道德同專業操守（唔止法律）**：

| 情況 | 做啲乜 |
|---|---|
| 練習時見到真實用戶資料 | 唔好複製、唔好帶走、唔好公開；只記低「證明得到就夠」 |
| 意外發現真實系統嘅漏洞（即使冇授權去打） | 走 responsible disclosure（負責任披露）渠道通知擁有者，唔好自己利用 |
| 想試一個新技術但唔肯定範圍 | **先確認授權範圍，再動手**；唔清潔嘅範圍就當唔准 |
| 課堂／朋友叫你「幫手打下某某網站」 | 冇書面授權就拒絕；「幫朋友」唔係法律抗辯 |

> **English Standard Definition:** Good practice is not only legal: minimise what you touch, never keep real user data, and report unexpected findings responsibly.

---

## Part B — 網絡與 Web 基礎（由 DNS 到 HTTP）

呢個 Part 補嘅係「原文當你識、但其實你未學過」嘅網絡同 HTTP 基礎。**你唔識呢 Part，之後每一節都會卡。**

### 🌐 4. Client／Server（客戶端／伺服器）

**一句定義**：Client（客戶端）係主動**發問**嘅一方（例如你嘅 Firefox）；Server（伺服器）係長期開住、**等住答**嘅一方（例如個靶場 app）。Client 問，Server 答。

**生活化比喻**：茶餐廳。你（client）坐低落單，廚房（server）煮好之後遞返出嚟。你唔會自己走入廚房煮——你只負責「問」，廚房負責「答」。

> **English Standard Definition:** A client sends requests; a server listens for and answers them.

### 📇 5. DNS（域名系統）

**一句定義**：DNS 係「**將人類易記嘅域名，翻譯成電腦用嘅 IP 地址**」嘅系統。你打 `www.example.com`，DNS 幫你查返佢真正嘅 IP（例如 `93.184.216.34`）。

**生活化比喻**：DNS 好似**電話簿**。你記得「陳大文」呢個名，但打電話要按號碼；DNS 就係幫你由「名」查到「號碼」嗰本簿。

> **English Standard Definition:** DNS translates a human-readable domain name into a machine-readable IP address.

> ⚠️ 教材外補充：本靶場用 `localhost` / `127.0.0.1`，**唔使 DNS 都可以直入**，因為 `127.0.0.1` 本身就係「自己部機」。但如果你打一個真域名（例如去攞 Burp CA 嗰陣），DNS 就會牽涉其中。

### 🔢 6. IP 地址

**一句定義**：IP 地址係一部機喺網絡上嘅「門牌號碼」，用嚟識別「要送去邊部機」。IPv4 例如 `192.168.1.10`；`127.0.0.1` 係一個特殊地址，永遠代表「本機自己」。

**生活化比喻**：IP 地址好似**大廈地址**——你要寄信，一定要寫清楚送去邊幢樓。

> **English Standard Definition:** An IP address identifies which machine on a network should receive the traffic.

> ⚠️ 教材外補充：`0.0.0.0` 喺啟動指令入面唔係「一個地址」，而係「**綁晒本機所有網絡介面**」嘅意思——即同一 LAN 嘅機都入得到嚟。原文提醒呢個做法**只可以喺故意有漏洞嘅靶場先接受**。

### 🚪 7. Port（埠）

**一句定義**：一部機可以同時行好多個服務（web、資料庫、SSH⋯），用「**port 號**」分開佢哋。HTTP 慣用 80、HTTPS 慣用 443；本靶場用 `8080`。

**生活化比喻**：同一幢大廈（同一部機）有好多個單位（port）。你寫地址（IP）之餘，仲要寫明去邊個單位（port）先搵到對嘅人。

> **English Standard Definition:** A port number identifies which service on the machine should handle the connection.

**本教程會見到嘅 port**：

| Port | 用途 |
|---|---|
| `8080` | 靶場 web app（`php -S 0.0.0.0:8080`）同 Burp listener |
| `443` | 一般 HTTPS |
| `80` | 一般 HTTP |
| `8088` | §7 用 `nc -lvnp 8088` 開嘅 netcat listener（收集被偷嘅 cookie） |

### 🔗 8. URL 解剖同 Query String

**一句定義**：URL 係一個資源嘅完整地址，由幾個部分組成：scheme、host、port、path、query string、fragment。

```
https://user@host.example.com:8443/path/to/page?id=42&lang=en#section
```

| 部分 | 例子 | 意思 |
|---|---|---|
| scheme | `https` | 用邊種協定（`http`／`https`） |
| userinfo | `user@` | 好少見；登入資訊 |
| host | `host.example.com` | 去邊部機（域名或 IP） |
| port | `:8443` | 去邊個服務；省略時用協定預設值 |
| path | `/path/to/page` | 要邊個資源／頁面 |
| query string | `?id=42&lang=en` | 用 `?` 開始、`&` 分隔嘅**參數** |
| fragment | `#section` | 頁內錨點；**唔會送去伺服器** |

**Query string 係乜**：URL 入面 `?` 之後嗰串，由一個或多個 `key=value` 組成，用 `&` 分開。例如 `?id=42&lang=en` 有兩個參數：`id=42`、`lang=en`。

**生活化比喻**：URL 好似一個**完整送貨地址**——大廈名（host）＋ 單位（port）＋ 房號（path）＋「特別指示」紙條（query string，例如「呢件貨要紅色」）。

> **English Standard Definition:** The query string carries parameters to the server as `key=value` pairs separated by `&`, and it is a very common place for user input to enter the application.

> ⚠️ 教材外補充：本教程好多漏洞嘅「入口」就係 query string——例如 §10 LFI 嘅 `/index.php?lang=...`、§3 IDOR 嘅 `/message.php?id=1`。你之後見到 `?xxx=` 就要打醒十二分精神：**呢度係用戶輸入，用戶輸入就係攻擊面**。

### ✉️ 9. HTTP Request 結構（Method／Path／Version／Header／Body）

**一句定義**：HTTP request 係瀏覽器（或工具）送去伺服器嘅「一封信」，由五部分組成：**method、path（＋version）、headers、空白行、body**。

```
POST /login.php HTTP/1.1
Host: localhost:8080
User-Agent: Mozilla/5.0
Content-Type: application/x-www-form-urlencoded
Cookie: PHPSESSID=abc123
Content-Length: 27

username=alice&password=secret
```

| 部分 | 例子 | 意思 |
|---|---|---|
| Request line：method | `POST` | 想做乜（見下面 GET vs POST） |
| Request line：path | `/login.php` | 目標資源 |
| Request line：version | `HTTP/1.1` | HTTP 版本 |
| Headers | `Host:`、`Cookie:`、`Content-Type:`⋯ | 元資料（描述呢封信嘅資訊） |
| 空白行 | （一個空行） | 分隔 header 同 body |
| Body | `username=alice&...` | 真正要送嘅資料（唔係每個 request 都有） |

**生活化比喻**：request 好似一封**掛號信**。信封上（request line ＋ headers）寫住「送去邊、用咩方式寄、回郵地址」；信封入面張紙（body）先係真正內容。有啲 request（例如純 `GET`）只係「敲門問吓」，可以冇 body。

> **English Standard Definition:** An HTTP request consists of a method, a path, the HTTP version, a set of headers, and an optional body.

### 📬 10. HTTP Response 結構（Status Code／Header／Body）

**一句定義**：HTTP response 係伺服器回畀你嘅「回信」，由三部分組成：**status line（狀態碼）、headers、body（內容）**。

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Set-Cookie: PHPSESSID=abc123; Path=/
Content-Length: 1234

<!DOCTYPE html>
<html>...
```

| 部分 | 例子 | 意思 |
|---|---|---|
| Status line | `HTTP/1.1 200 OK` | 版本 ＋ 三個位數字狀態碼 ＋ 短描述 |
| Headers | `Content-Type:`、`Set-Cookie:`⋯ | 回信嘅元資料 |
| Body | HTML／JSON／圖片 bytes | 真正內容 |

**生活化比喻**：response 好似你收到嘅回信：回郵戳（狀態碼）話你知「成功定失敗」，信封標籤（headers）話你知內容係咩類型，信紙（body）就係內容本身。

> **English Standard Definition:** An HTTP response consists of a status code, response headers, and an optional body.

### 🔀 11. GET vs POST（兩種最常見 method）

**一句定義**：`GET` 通常用嚟「**讀取**」資料，參數放喺 URL（query string）；`POST` 通常用嚟「**提交／改變**」資料，資料放喺 **request body**。

**生活化比喻**：`GET` 好似**睇餐牌**（你只係睇，唔改嘢）；`POST` 好似**落單叫嘢食**（你改變咗個狀態——廚房開始煮）。

| 對比 | `GET` | `POST` |
|---|---|---|
| 參數放邊 | URL query string（`?id=1`） | request body |
| 會唔會改變伺服器狀態 | 唔應該（應該係「安全」嘅） | 通常會 |
| 會唔會留喺瀏覽器歷史／log | 會（連參數） | body 通常唔會 |
| 可否重播 | 可以，好易 | 可以（用 Burp 重播一樣得） |
| 本教程例子 | `/message.php?id=1`（§3 IDOR） | `/login.php`、`/forgot.php`、`/register.php` |

> **English Standard Definition:** GET puts parameters in the URL and is meant to be safe; POST puts data in the body and is used to change state.

> ⚠️ 教材外補充：**「POST 比較安全」係一個常見誤解。** POST 只係唔顯示喺 URL，攻擊者一樣可以用 Burp Repeater／`curl` 重播。要保護嘅係**伺服器端檢查**，唔係揀邊個 method。

### 🚦 12. Status Code（狀態碼）

**一句定義**：狀態碼係伺服器回畀你嘅**三位數字**，用嚟一句講清楚「條 request 點咗」。分五大類：`1xx` 資訊、`2xx` 成功、`3xx` 轉向、`4xx` 客戶端錯誤、`5xx` 伺服器錯誤。

**生活化比喻**：狀態碼好似**餐廳回應**：`200`＝「好，你嘅嘢喺度」；`302`＝「唔喺呢度，你去隔籬房」；`401`＝「你未畀身份證明」；`403`＝「你有身份，但你冇權」；`404`＝「冇呢樣嘢」；`500`＝「廚房失火」。

| 碼 | 意思 | 本教程場景 |
|---|---|---|
| `200 OK` | 成功 | 正常頁面、成功登入 |
| `301`／`302` | 轉向（redirect） | 未登入去 admin 頁會被 302 掟去 login；**目錄爆破靠「唔係 404」判存在**（§3） |
| `401 Unauthorized` | 未認證 | 冇／錯 session |
| `403 Forbidden` | 唔夠權 | 已登入但非 admin 入 admin 頁（§3） |
| `404 Not Found` | 冇呢個資源 | 目錄爆破時「唔存在」嘅路徑 |
| `500 Internal Server Error` | 伺服器爆 | 程式出錯，有時會漏 error 訊息 |

> **English Standard Definition:** Status codes summarise the result: 2xx success, 3xx redirection, 4xx client error, 5xx server error.

> ⚠️ 教材外補充：**兩個新手必記嘅診斷點**：（1）見到 `302` 而唔係 `404`，即係「**呢條 path 存在**，不過唔畀你入」——目錄爆破就係靠呢個（§3）。（2）見到 `500` 好多時代表你嘅 payload **打亂咗條 SQL／程式**，可能已經摸到 injection point。

### 🏷️ 13. HTTP Headers（標頭）

**一句定義**：Headers 係 request／response 入面嘅「元資料」，用 `Name: Value` 格式，描述封信本身（唔係信嘅內容）。

**生活化比喻**：headers 好似信封面嘅資訊（寄件人、回郵、內容類型、郵費），唔係信紙內容，但一樣重要。

**本教程會見到嘅 headers**：

| Header | 出現喺 | 意思 |
|---|---|---|
| `Host` | request | 去邊個 host（域名／IP:port） |
| `Cookie` | request | 瀏覽器自動帶住嘅 cookie（例如 `PHPSESSID`） |
| `Set-Cookie` | response | 伺服器叫你**存**一個 cookie（登入後發 session） |
| `Content-Type` | 兩邊 | body 係咩格式（`application/x-www-form-urlencoded`、`application/json`） |
| `User-Agent` | request | 你係咩瀏覽器／工具（可被改、可被偽造） |
| `X-Username` | request | 自訂 header；本 lab 由 reverse proxy／SSO 蓋章加入，被 §7 反射成 XSS |
| `Location` | response | 302 要你去邊（redirect 目標） |

> **English Standard Definition:** Headers carry metadata such as Host, Cookie, Content-Type and User-Agent; custom headers such as X-Username also flow into the application.

> ⚠️ 教材外補充（超重要）：**你用 Burp 改一個 header，就等於可以扮任何嘢。** §7 反射型 XSS 就係因為 app 信任一個由客戶端控制嘅 `X-Username` header，直接將佢反射入 HTML。教訓：**header 一樣係用戶輸入，一樣要 escape。**

### 🍪 14. Cookie vs Session

**一句定義**：**Cookie** 係一小段由伺服器叫你存喺**瀏覽器**嘅資料（每次 request 自動帶返出去）；**Session** 係真正嘅狀態資料**存喺伺服器**，用一個 session ID（通常放喺 cookie，例如 `PHPSESSID`）嚟認人。

**生活化比喻**：你去**健身室**。入閘後職員畀你一張**儲物櫃鎖匙**（cookie；上面只有一個號碼），你嘅「會員資料同紀錄」其實存喺健身室電腦（session）——鎖匙只係用嚟搵返你嗰份紀錄。**偷到鎖匙（cookie）就等於可以扮你入去**——呢個就係 §7 XSS 偷 `PHPSESSID` 之後可以「帳號接管」嘅原因。

> **English Standard Definition:** The cookie lives in the browser; the session data lives on the server and is looked up by the session id stored in the cookie.

> ⚠️ 教材外補充：本教程特別針對「**計數器綁喺 session**」嘅錯誤——§6 unlimited brute force 之所以成功，就係因為「五次失敗就鎖」個 counter 係存喺 **session**，而攻擊者每次唔帶 cookie 就攞到一個**全新 session**，等於無限次。明白 cookie/session 你就明白成個 §6。

### 🔒 15. HTTPS／TLS（為何 Burp 要你 import CA）

**一句定義**：HTTPS ＝ HTTP ＋ TLS。TLS 係一層**加密**，令你同伺服器之間嘅內容唔畀中間人睇到；伺服器要用一張**憑證（certificate）**證明自己身份。

**生活化比喻**：HTTPS 好似一個**密封嘅信封**。中間人（Burp）想拆開睇，就要「冒充」收信人——但瀏覽器只信得過有**權威機構（CA）簽名**嘅憑證。所以你必須親手把 **Burp 嘅 CA 憑證**裝入 Firefox，等瀏覽器「信得過」Burp 係一個合法中間人。

> **English Standard Definition:** HTTPS is HTTP inside a TLS tunnel; to intercept it, Burp presents its own certificate and you must import Burp's CA into the browser's trust store.

> ⚠️ 教材外補充：呢一步嘅**安裝步驟**喺 `ART_T3_01` §0.2（去 `http://burpsuite` 下載 `cacert.der`、喺 Firefox 憑證 Authorities 度 import、剔「Trust this CA to identify websites」）。本檔只講**原理**：冇 import CA，你一去 HTTPS 網站就會彈憑證警告，Burp 收唔到內容。

---

## Part C — 網頁三層：HTML／CSS／JavaScript

呢個 Part 補「一個網頁係由邊三樣嘢砌成」，同一個關鍵安全概念：**前端做嘅檢查＝冇檢查**。

### 🧱 16. HTML（結構層）

**一句定義**：HTML（HyperText Markup Language）用**標籤（tag）**定義一個頁面嘅**結構同內容**——邊串字係標題、邊度係表格、邊度係表單。

**生活化比喻**：HTML 好似一間屋嘅**鋼筋同間隔**——決定邊度係廳、邊度係房、邊度係門口。佢講「有咩」，唔講「靚唔靚」。

> **English Standard Definition:** HTML defines the structure and content of a page.

> ⚠️ 教材外補充：本教程好多漏洞同 HTML 直接相關——§7 XSS 就係因為 app 把用戶輸入**當成 HTML 一部分輸出**，令 `<img onerror=...>` 之類嘅 payload 被瀏覽器當成真標籤執行。你唔識 HTML，就睇唔明 XSS 為何「彈出嚟」。

### 🎨 17. CSS（外觀層）

**一句定義**：CSS（Cascading Style Sheets）定義一個頁面**睇落係點**——顏色、字體、排版、大小。

**生活化比喻**：CSS 好似間屋嘅**油漆同傢俬**——令佢好睇、好住，但唔改變間隔同功能。

> **English Standard Definition:** CSS defines how the page looks.

> ⚠️ 教材外補充：CSS 一般**唔係**重要攻擊面，但你排查時要知：**CSS 係由客戶端控制嘅**——你喺 DevTools 改 CSS，只影響你自己部機嘅畫面，唔會改變伺服器任何嘢。

### ⚙️ 18. JavaScript（行為層）

**一句定義**：JavaScript（JS）係喺**瀏覽器**度執行嘅程式語言，負責令頁面「有反應」——撳掣有嘢跳、表單即時檢查、按需要載入資料。

**生活化比喻**：JavaScript 好似間屋嘅**電力同電器**——開關、燈、風扇都有反應。**但注意：呢啲全部喺你屋企（你部機）度運行**。

> **English Standard Definition:** JavaScript runs in the browser and adds behaviour to the page.

> ⚠️ 教材外補充（核心概念）：**JavaScript 喺攻擊者部機度執行。** 呢句嘢係本教程一半漏洞嘅根。你（攻擊者）完全控制自己部機，所以你可以：關掉 JS、改 JS、甚至唔用瀏覽器直接發 request。任何只靠 JS 嘅「保護」都係假嘅。

### 📄 19. view-source 同 DevTools 嘅分別

**一句定義**：**view-source** 顯示伺服器**原始送嚟嘅 HTML**；**DevTools** 顯示**執行完 JS／CSS 之後**嘅「實際（live）DOM」，仲可以讓你即場改、即場睇。

**生活化比喻**：view-source 好似「**餐廳落單前影低張原稿菜單**」；DevTools 好似「**菜單印出嚟、每樣嘢都上晒色之後，你仲要攞支筆即刻改佢**」。

> **English Standard Definition:** View-source shows the HTML the server sent; DevTools shows the live DOM after JavaScript and CSS have run.

| 工具 | 睇到咩 | 可否改 | 本教程點用 |
|---|---|---|---|
| `view-source:` | 原始 HTML（JS 未跑） | 唔可以 | 睇 hidden field、comment、inline script（§1 CAPTCHA） |
| DevTools | live DOM（JS 跑完） | 可以即改 | 睇／改表單、cookie（Storage 分頁）、network 睇 request（§3） |

> ⚠️ 教材外補充：**兩個都要識用。** 搵 CAPTCHA 漏洞（§1）要睇 `view-source` 先見到 hidden field；而睇「登入後設定咗咩 cookie」就要去 DevTools 嘅 `Storage > Cookies`（原文 §3 有講）。目標係用 `view-source:http://localhost:8080/register.php` 先睇原始碼。

### 🚧 20. Client-side vs Server-side Validation（前端驗證＝冇驗證）

**一句定義**：**Client-side validation** 喺瀏覽器（即攻擊者部機）度跑；**server-side validation** 喺伺服器度跑。**只有 server-side 先係真正嘅安全控制。**

**生活化比喻**：客戶端驗證好似「**入場前自己舉手話自己冇帶武器**」——守衛（伺服器）完全冇檢查過你，你想點報就點報。伺服器端驗證先係「**真正搜身**」。

> **English Standard Definition:** Client-side validation runs on the attacker's machine and can always be bypassed; only server-side validation is a real security control.

**為何「只做前端檢查＝冇檢查」**：

1. 前端程式（JS）跑喺**你部機**，你 100% 控制得到 → 你關掉佢、改佢，完全冇難度。
2. 你可以**完全唔用瀏覽器**——直接用 Burp／`curl`／Postman 發一個「唔跟規矩」嘅 request 去伺服器。
3. 伺服器如果冇**自己再檢查一次**，佢就會照收個亂咁嚟嘅 request。

> **English Standard Definition:** If the server never re-checks the input, a hand-crafted request that skips the browser will be accepted.

> ⚠️ 教材外補充：本教程 §1（CAPTCHA 繞過）、§2（Email Bomb，前端 30 秒倒數但後端冇 rate limit）**兩個 section 都係呢個概念嘅實例**。記住金句：**「瀏覽器送得出嘅嘢，都可以用 Burp、`curl` 或 Python 重播或修改。」**（原文如此）

---

## Part D — 伺服器端基礎：PHP 同 SQL

### 🐘 21. PHP 基本：一個 `.php` 檔案點執行

**一句定義**：`.php` 檔案**喺伺服器度執行**；瀏覽器收到嘅**唔係** PHP 程式碼，而是 PHP **執行完之後輸出嘅 HTML（或 JSON）**。

**生活化比喻**：PHP 好似一間餐廳嘅**廚房**——你（瀏覽器）落單，廚房入面點煮、用咩料（PHP 邏輯）你睇唔到；你只收到煮好嘅餸（輸出）。**原始碼唔會離開廚房。**

> **English Standard Definition:** A `.php` file is executed on the server; only its output is sent to the browser.

> ⚠️ 教材外補充：**但漏洞一樣同 PHP 有關。** 若果 PHP 程式**自己**將某段字輸出成 HTML，而嗰段字係用戶控制嘅（例如 §7 反射 `X-Username`），瀏覽器就會當佢係真 HTML 執行 → XSS。另外，如果 `config.php` 之類被**當成純文字檔**（例如 `.bak` 備份）畀你下載，原始碼就會外洩（§9）。

### 📥 22. PHP Superglobals：`$_GET`／`$_POST`／`$_SERVER`／`$_SESSION`

**一句定義**：PHP 有一批叫 **superglobal** 嘅內建陣列，自動裝住用戶送嚟嘅資料：`$_GET`（URL query string）、`$_POST`（form body）、`$_SERVER`（伺服器／請求資訊，含 headers）、`$_SESSION`（伺服器端 session 資料）、`$_COOKIE`（cookie）。

**生活化比喻**：superglobal 好似**幾個唔同嘅「收件箱」**——`$_GET` 係「貼喺 URL 上嘅紙條」，`$_POST` 係「放喺信封入面嘅紙」，`$_SERVER` 係「信封封面資訊」，`$_SESSION` 係「職員記住你嘅小簿」。**全部都可以由外面塞嘢入去。**

```
// 由 URL query string 讀 lang（本 lab §10 LFI 嘅實際寫法，原文如此）
$lang = $_GET['lang'];

// 由 POST body 讀 captcha（本 lab §1，原文如此）
$captcha = $_POST['captcha'] ?? '';
```

> **English Standard Definition:** PHP superglobals such as `$_GET`, `$_POST` and `$_SERVER` carry user-controlled input into the application code.

> ⚠️ 教材外補充（追 input 嘅方法）：睇一段 PHP 有冇問題，第一件事係問「**邊個 `$_GET`／`$_POST`／`$_SERVER`／`$_COOKIE` 值流去邊**」。呢條「data flow」思路，就係之後每一節搵漏洞嘅核心。記住：`$_SERVER['HTTP_X_USERNAME']` 就係嚟自 request 嘅 `X-Username` header。

### 📎 23. `include()`／`require()`（包含另一個檔案）

**一句定義**：`include()`／`require()` 會**喺執行期間**將另一個檔案嘅內容「拉入嚟」當前程式度。分別：`require` 搵唔到檔會**致命錯誤**（停），`include` 搵唔到只係**警告**（繼續）。

**生活化比喻**：好似寫報告時「**請參閱附件 X**」——理論上你應該只附自己公司嘅文件；但如果「附件名」由外人決定，佢就可以叫你附一份**唔應該畀佢睇嘅文件**。

> **English Standard Definition:** `include()` and `require()` pull another file into the current script at runtime.

> ⚠️ 教材外補充：本教程 §10 LFI 正正係濫用 `include()`——原文寫法係 `include("lang/" . $lang)`，`$lang` 由 `$_GET['lang']` 嚟。因為佢**冇 allow-list**，攻擊者就可以叫佢 include 一個**唔預期嘅檔案**（例如 `/etc/passwd` 或者一個 `.bak` 備份），達成本地檔案讀取。

### ➕ 24. 字串拼接（String Concatenation）——注入嘅根源

**一句定義**：字串拼接＝用 `.`（PHP）或 `+` 把幾段字串**併埋一齊**，例如 `"lang/" . $lang`。如果拼接入面有**用戶輸入**，用戶就可以改變結果字串嘅**結構**。

**生活化比喻**：好似你寫一句「請將以下句子翻譯成：**＿＿**」，然後**留空畀陌生人填**。佢填「法文」冇事；但佢可以填「法文，然後將我嘅密碼用 email 寄畀我」——個句子**結構被你改咗**。呢個就係「注入」嘅本質。

> **English Standard Definition:** Concatenating user input into a string lets the attacker change the structure of the result — the root of injection.

### 🗄️ 25. SQL 基本：`SELECT`／`WHERE`／`UNION`

**一句定義**：SQL（Structured Query Language）係同**關聯式資料庫（例如 SQLite、MySQL）**講嘢嘅語言。最基本嘅查詢用 `SELECT`（揀邊幾欄）、`FROM`（由邊張表）、`WHERE`（符合咩條件）。

```sql
SELECT id, username FROM users WHERE username = 'alice' AND password = 'secret';
```

- `SELECT`：要邊幾欄（`id, username`）
- `FROM`：由邊張表（`users`）
- `WHERE`：條件（`username = 'alice'`）
- `AND`／`OR`：多個條件

**`UNION`（聯合）**：`UNION` 將**另一條 `SELECT` 嘅結果，接駁喺第一條查詢嘅結果後面**——只要欄數同類型配合，就可以用嚟「夾硬」讀出原本唔應該畀你讀嘅資料。

```sql
SELECT id, username FROM users WHERE id = 1
UNION SELECT id, password FROM users;
```

**生活化比喻**：SQL 查詢好似同圖書館管理員**講一句指令**：「**幫我喺『用戶』架度，搵『alice』嘅紀錄**」。`UNION` 就係「**順便幫我喺『密碼』架度都攞埋落嚟，駁埋一齊**」。由於你只係「講一句嘢」，如果管理員**照你講嘅字面執行**，你就可以夾帶你自己嘅指令入去。

> **English Standard Definition:** `SELECT` reads rows, `WHERE` filters them, and `UNION` appends the result of a second query onto the first.

### 💉 26. 拼接字串為何會出 SQL Injection

**一句定義**：如果程式**唔用參數化**，而係直接將用戶輸入**拼入 SQL 字串**，攻擊者就可以用引號（`'`）等字元「**走出**」字面值範圍，令佢嘅輸入變成**查詢邏輯**。

**生活化比喻**：好似有個職員收到你張紙條「**查『alice』**」。如果你寫「**查『xxx』或者話『係』就係**」，職員照字面執行，就會畀你**睇晒全部紀錄**。你冇「破解」任何嘢——你只係**令佢執行咗你嘅邏輯**。

**通用示例（教材外示意，非原文 payload）**：程式本應砌成「查呢個 user」：

```sql
SELECT id FROM users WHERE username = '' AND password = '';
```

攻擊者喺 username 欄填 `' OR '1'='1` 之後，字串變成：

```sql
SELECT id FROM users WHERE username = '' OR '1'='1' AND password = '';
```

`'1'='1'` 永遠成立，於是條件對**每一行**都成立 → **繞過登入**。呢個就係最經典嘅 `OR '1'='1`。

> **English Standard Definition:** If untrusted input is concatenated into a query string, the attacker can break out of the value and rewrite the query logic.

> ⚠️ 教材外補充：本教程 **§4 SQL injection in a JSON object** 就係呢個原理嘅變體（輸入放喺 JSON body，注入點係 `login.php`）。要記住：攻擊者**唔係**「猜中密碼」，而係令查詢邏輯**對任何值都成立**。

**防禦：參數化查詢（parameterized queries）**

**一句定義**：參數化＝將 SQL 嘅**結構**同**資料**分開送畀資料庫；資料永遠只會被當成「值」，唔會被當成「語法」。

**生活化比喻**：好似填表——表格**印死咗**「姓名：＿＿」，你只可以**填字**，唔可以改個表格本身。咁你點都改唔到佢嘅結構。

> **English Standard Definition:** Parameterized queries keep data and code separate, so injected input can never change the query structure.

> ⚠️ 教材外補充：真實防禦係用 prepared statements（PDO／mysqli 嘅 bind）、或 ORM。**唔好**靠「自己加引號／自己過濾字元」——好易漏（原文提及本 lab 嘅 `login.php` 有個「primitive bad-list filter」，正正示範咗「黑名單過濾」有幾脆弱）。

### 🆚 27. SQLite vs MongoDB（初步差異）

**一句定義**：**SQLite** 係一個「**唔使裝 server、單一檔案**」嘅**關聯式**資料庫，用 SQL 查詢，資料係「表 ＋ 行」。**MongoDB** 係一個 **NoSQL 文件式**資料庫，資料係一啲**似 JSON 嘅 document**，查詢用**運算子物件**（`$ne`、`$gt`、`$regex`、`$where`）而唔係 SQL 文字。

**生活化比喻**：SQLite 好似一個**Excel 檔案**（表格式、一個檔、唔使額外程式）；MongoDB 好似一疊**萬用卡／JSON 卡**（每張卡可以唔同結構，你可以話「搵所有**顏色唔等於紅色**嘅卡」，`$ne` 就係「唔等於」）。

| 面向 | SQLite（relational／SQL） | MongoDB（NoSQL／document） |
|---|---|---|
| 儲存形式 | 表 + 行 | JSON 風格 document，group 成 collection |
| 查詢語言 | SQL 文字（`SELECT ... WHERE ...`） | 運算子查詢物件（`{ field: { $ne: "" } }`） |
| 注入樣式 | `' OR '1'='1` | `{"password": {"$ne": ""}}` |
| 本教程關聯 | 靶場本身用 SQLite | §12 示範 NoSQL 注入（後端喺 SQLite 上**模擬** MongoDB 行為） |

**NoSQL 注入示意（教材外概念）**：正常登入查詢係「username 等於 X 而且 password 等於 Y」。如果你送一個 **物件**而唔係字串做 password：

```javascript
db.users.findOne({ username: "admin", password: { $ne: "" } })
```

`$ne: ""` 意思係「**唔等於空字串**」——對**每一筆真紀錄**都成立，於是你登入咗。**呢個係 `OR '1'='1'` 嘅 NoSQL 版本。**

> **English Standard Definition:** SQLite is a single-file relational database queried with SQL; MongoDB stores JSON-like documents and is queried with operator objects, but both are broken by the same flaw when input becomes query logic.

> ⚠️ 教材外補充：**根因一樣**——「未受信任嘅輸入變成查詢邏輯」。換資料庫只係換 payload **外形**，唔會令漏洞消失。修法一樣係「強制型別 ＋ 參數化／schema 驗證」（§12 詳解）。

---

## Part E — 代理（Proxy）概念

### 🔁 28. 咩係 Proxy（代理）

**一句定義**：Proxy 係一個**企喺你同伺服器中間嘅「中間人」**，所有你嘅 request 都**先經過佢**、再轉去伺服器。

**生活化比喻**：Proxy 好似一個**轉運站／中間人**。你唔直接交信畀收信人，而係交畀中間人，佢幫你轉交——分別係，一個「攔截代理」會**拆開睇、甚至改內容**先轉交。

> **English Standard Definition:** A proxy is a middleman that forwards requests between a client and a server.

### ✋ 29. 咩係攔截代理（Intercepting Proxy）

**一句定義**：攔截代理係一種 proxy，佢可以**停低（intercept）**每一個 request／response，畀你**睇、改、再放行**。Burp Suite 同 OWASP ZAP 就係攔截代理。

**生活化比喻**：好似**海關檢查站**。你寄包裹（request）去外國，海關可以**拆開睇、改內容、再放行**。你係唯一有權咁做嘅人，因為係你自己設定嘅。

> **English Standard Definition:** An intercepting proxy pauses traffic so you can read and modify every request and response.

### 🔀 30. 為何要「瀏覽器 → Burp → 伺服器」

**一句定義**：將瀏覽器嘅流量**強制繞經 Burp**，你就可以見到（同改到）**瀏覽器實際送出嘅每一條 request**——而唔係只見到「表面嘅表單」。

**生活化比喻**：想像你**唔係喺客戶度落單，而係坐喺廚房門口**。瀏覽器落單、改單、重複落單，你全部睇到、全部改到。

> **English Standard Definition:** Routing the browser through Burp means every request and response passes through your hands.

**完整鏈路（本教程嘅設定）**：

```
Firefox（＋FoxyProxy 指向 proxy）
        │
        ▼
Burp Suite（listener 127.0.0.1:8080）
        │
        ▼
靶場 server（php -S，web app）
```

> ⚠️ 教材外補充：**安裝步驟全部喺 `ART_T3_01` §0.2**（FoxyProxy profile：Title `Burp`／Type `HTTP`／Hostname `127.0.0.1`／Port `8080`；CA import 等）。本檔只講原理。設定好之後，**Burp 嘅 `Proxy > HTTP history` 就會出現你每次瀏覽嘅 request**——呢個就係你之後所有攻擊嘅起點。

### 🛠️ 31. 攔截／改包原理（Intercept／Modify）

**一句定義**：當 Intercept **開**嘅時候，每個 request 會**停喺 Burp**等你決定：按 **Forward** 放行（可以改咗先放）、按 **Drop** 丟棄。你可以即場改 method、path、headers、body。

**生活化比喻**：好似 **WhatsApp 嘅「草稿」**——你打嘅訊息（request）未 send 出去之前，可以**改到滿意先撳 send**。Burp 就係幫你「攔住」每一條 request。

> **English Standard Definition:** With Intercept on, each request halts in Burp so you can forward it unchanged or edit it before sending.

> ⚠️ 教材外補充：**新手最易中嘅陷阱**——一路開住 Intercept，然後覺得「個 app 好慢好卡」。其實係**你自己**攔住咗佢。多數練習只需要睇 `HTTP history`，唔需要一直 Intercept 住（原文 §0 亦有講「驗證時熄 Intercept」）。

### 🔂 32. Repeater vs Intruder（分工）

**一句定義**：**Repeater** 用嚟**手動改一個 request、慢慢重播、即時睇 response**；**Intruder** 用嚟**自動化發送大量 request**（例如試 1000 個密碼），靠 payload 清單同 result table。

**生活化比喻**：Repeater 好似「**一對一發問**」——你改一句、問一句、睇答案；Intruder 好似「**群發**」——你寫好模板，佢自動幫你發幾千封，再幫你搵邊封有唔同反應。

> **English Standard Definition:** Repeater is for editing and resending a single request; Intruder is for automating many requests at once.

| 工具 | 做乜 | 幾時用 | 本教程位置 |
|---|---|---|---|
| **Repeater** | 改一個 request 重播 | 想慢慢試一個 payload、確認反射點 | §0.3 學；§4、§7、§14 等 |
| **Intruder** | 自動化大量 request | 試密碼、試 id 序列、目錄爆破 | §0.4 學；§2、§3、§6、§9 等 |

> ⚠️ 教材外補充（成功判斷）：Intruder 結果表如果見到**某一行嘅 length 或 status code 同其他唔同**，通常就係「中咗」（例如有效憑證）。原文金句：**"Results with different lengths or status codes usually reveal valid credentials."**（原文如此）

### ♻️ 33. 憑咩可以做重複攻擊（點解重播得）

**一句定義**：你可以重複攻擊，係因為**伺服器端冇（或得唔完整嘅）rate limit、dedupe、ownership check**——任何「只喺瀏覽器做」嘅限制，對唔用瀏覽器嘅攻擊者零效果。

**生活化比喻**：好似一個**冇人守嘅投幣機**——你㩒一次佢出一次，你㩒一千次佢出一千次。個「按鈕只可以㩒一次」嘅規矩只係**印喺張紙度**，冇人執行。

> **English Standard Definition:** Repetition attacks work because the server never enforces the limit: any control that lives only in the browser can be replayed outside it.

> ⚠️ 教材外補充：本教程 §6 unlimited brute force（counter 綁 session，清 cookie 就無限）、§2 email bomb（前端 30 秒倒數但後端冇 rate limit）都係活生生嘅例子。

---

## Part F — 工具地圖（係乜 ＋ 幾時用）

> ⚠️ 教材外補充：**本節只講「係乜、喺本篇邊一節用到」。所有安裝步驟（點裝、點設定、CA 點 import）一律見 `ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md`。** 兩者刻意分工，以免重複。

### 🧰 34. 工具總覽表

| 工具 | 一句係乜 | 比喻 | 本教程地區代表（例） |
|---|---|---|---|
| **Firefox ＋ FoxyProxy** | 瀏覽器 ＋ 一鍵切換代理嘅 extension | 電掣：啪一下就把水管駁去 Burp | 每節都用；§5、§7 |
| **Burp Suite（Proxy）** | 攔截代理，記錄／攔截流量 | 海關檢查站 | §0.2 設定；全程 |
| **Burp Suite（Repeater）** | 改一個 request 重播 | 一對一發問 | §0.3 學；§4、§7、§14 |
| **Burp Suite（Intruder）** | 自動化大量 request | 群發信 | §0.4 學；§2、§3、§6、§9 |
| **Burp Suite（Decoder）** | 編／解碼工具（URL、base64、hex） | 翻譯機 | 教材外；payload 編碼排查用 |
| **Burp Suite（Comparer）** | 對比兩個 response 有咩唔同 | 「找不同」小遊戲 | 教材外；比較 payload 前後差異 |
| **OWASP ZAP** | 另一款開源攔截代理，可代替 Burp | 同款海關、唔同牌子 | §9 備份檔爆破（Forced Browse） |
| **Postman** | API client，唔經瀏覽器手寫 request | 直接填單寄信 | §2 Email Bomb |
| **`curl`** | 命令列 HTTP client | 唔用信封套，直接手寫信寄出去 | §14 SSRF；§2 原則 |
| **gobuster／ffuf** | 目錄／檔案爆破工具 | 逐間房拍門睇邊間開 | §3 hidden admin；§9 備份檔 |
| **netcat（`nc`）** | 開監聽 port、收任何連線 | 錄音機，睇有冇人打嚟 | §7 偷 cookie（`nc -lvnp 8088`）；§14 SSRF callback |
| **Python** | 自寫攻擊／自動化腳本 | 自製機械臂 | §4（`tools/sqli_json.py`）；§6（`tools/brute.py`） |

### 📌 35. 逐個講清楚

**Firefox ＋ FoxyProxy**
一句係乜：Firefox 係本教程指定嘅瀏覽器；FoxyProxy 係一個 extension，令你可以**一鍵**喺「正常上網」同「經 Burp 代理」之間切換。
例：**每一節**都要用；尤其 §5 cache poisoning、§7 XSS 要靠佢令流量經 Burp。
勝在：想「正常」睇一個網站，撳一下就得，唔使拆設定。

> **English Standard Definition:** FoxyProxy lets you toggle browser traffic through the intercepting proxy with one click.

**Burp Suite — 五個你一定會撞到嘅部分**
- **Proxy**：攔截同記錄流量。**例**：§0.2 設定 listener `127.0.0.1:8080`、`HTTP history` 睇每條 request。
- **Repeater**：改一個 request 重播。**例**：§4 試 SQLi payload、§7 確認 header 反射、§14 試 `file://`。
- **Intruder**：自動化大量 request。**例**：§2 群發 reset email、§3 目錄爆破、§6 猜密碼、§9 備份檔爆破。
- **Decoder**（教材外補充）：base64／URL／hex 編解碼。**例**：當你懷疑 payload 被編碼搞亂（見 Part I）時用得着。
- **Comparer**（教材外補充）：並列對比兩個 response。**例**：比較「打中」同「冇打中」嘅 response 差幾多。

> **English Standard Definition:** Burp Suite is an intercepting proxy with add-on tools: Proxy for capture, Repeater for one-off edits, Intruder for automation.

> ⚠️ 教材外補充：原文主要用 **Repeater** 同 **Intruder**；**Decoder／Comparer** 原文冇特別教，但係你排查 payload 編碼同對比 response 時好有用（見 Part I 第 3 步）。

**OWASP ZAP**
一句係乜：另一款開源攔截代理，功能同 Burp 重疊，教材話你可以用佢代替 Burp。
例：**§9 備份檔爆破**——原文講可以喺 ZAP 右 Click 目標揀 `Attack > Forced Browse`（或喺 Burp 揀 `Target > Engagement tools > Discover content`）。

> **English Standard Definition:** OWASP ZAP is an open-source intercepting proxy that can replace Burp for the exercises.

**Postman**
一句係乜：一個 API client，讓你**唔經瀏覽器**手寫一個 HTTP request（method、URL、body）再送出。
例：**§2 Email Bomb**——原文叫人喺 Postman 砌一條 `POST /forgot.php`，body 用 `x-www-form-urlencoded`，key `email` 填一串分號分隔嘅地址，展示「一個 request 觸發大量寄信」。

> **English Standard Definition:** Postman sends hand-crafted HTTP requests without a browser.

**`curl`**
一句係乜：一個命令列工具，直接發 HTTP request 並顯示 **raw response**（連 headers 同 bytes）。
例：**§14 SSRF**——原文示範 `curl "http://localhost:8080/imgproxy.php?url=file:///etc/passwd"` 令 raw bytes 可見；**§2** 亦提過「request 可以用 Burp、`curl` 或 Python 重播或修改」。

```
curl "http://localhost:8080/imgproxy.php?url=file:///etc/passwd"
```

> **English Standard Definition:** `curl` sends HTTP requests from the command line and shows the raw response.

**gobuster／ffuf（同 Dirbuster）**
一句係乜：目錄／檔案**爆破**工具——用一個字典（wordlist）逐個路徑去試，睇邊啲**存在**（唔係 404）。
例：**§3** hidden admin endpoint（原文示範 `gobuster dir -u http://localhost:8080/admin -w /usr/share/wordlists/dirb/common.txt`）；**§9** 備份檔爆破。

```
gobuster dir -u http://localhost:8080/admin -w /usr/share/wordlists/dirb/common.txt
```

> **English Standard Definition:** Directory brute-force tools try each entry of a wordlist and report the paths that exist.

**netcat（`nc`）**
一句係乜：一個可以**開監聽 port、接收任何 inbound 連線**嘅工具——用嚟證明「伺服器真係有連過嚟」。
例：**§7** 偷 cookie（原文 `nc -lvnp 8088`，跟住見到 `GET /?c=PHPSESSID%3D...`）；**§14** 做 SSRF callback listener。

```
nc -lvnp 8088
```

> **English Standard Definition:** `netcat` opens a listener so you can observe inbound connections.

**Python**
一句係乜：一種通用程式語言；喺本教程，你**自己寫小工具**嚟做自動化同精準攻擊。
例：**§4**（`tools/sqli_json.py`，每個 request 問一個真／假問題做 blind SQLi）；**§6**（`tools/brute.py`，先由 `/api/users.php` 收 usernames，再逐個試密碼）。
工具安裝／用法：見 `ART_T3_01`（`tools/` 目錄內嘅 helper script）。

> **English Standard Definition:** Python scripts let you automate a targeted attack when a GUI tool is too slow or too noisy.

---

## Part G — 靶場環境心智模型（一個網站 ＝ 一堆檔案 ＋ 一個資料庫）

> ⚠️ 教材外補充：呢一節係「睇穿個網站」嘅心法。零經驗學生最需要嘅，係將「網站」呢個抽象概念，變成「**一堆喺伺服器上嘅檔案 ＋ 一個資料庫**」。

### 🗺️ 36. 心法

**一句定義**：一個 web app，本質上係**伺服器上一堆檔案**（`.php` 頁面、API、config、備份）**＋ 一個資料庫**（本 lab 係一個 SQLite 檔案）。你見到嘅「頁面」，只係呢啲檔案執行完嘅輸出。

**生活化比喻**：好似一間**茶餐廳**。你見到嘅係餐牌同食物（輸出），但背後係**一個廚房（伺服器）＋ 一堆食材同工具（檔案）＋ 一本帳簿（資料庫）**。紅隊要做嘅，就係幻想「如果我可以走入廚房，會見到啲咩」。

> **English Standard Definition:** A web app is just a set of files on a server plus a database; the pages you see are only their output.

### 🧩 37. 靶場係點砌成（分層）

| 層 | 內容 | 本 lab 例子 |
|---|---|---|
| **頁面（pages）** | 畀人用瀏覽器睇嘅 `.php` | `/index.php`、`/login.php`、`/register.php`、`/forgot.php`、`/staff.php`、`/contact.php` |
| **API（application endpoints）** | 回 JSON／做動作嘅端點 | `/api/users.php`（回 usernames）、`/api/lookup.php`、`/imgproxy.php` |
| **管理區（admin）** | 只有 admin 入到／隱藏嘅 | `/admin.php`、`/admin/index.php`、`/admin/upload.php` |
| **資料庫（database）** | 單一 SQLite 檔 | `lab.db`（由 `init_db.php` 建立） |
| **設定（config）** | 資料庫連線、密鑰 | `config.php` |
| **上傳目錄（uploads）** | 用戶上傳檔案去嘅地方 | `/uploads/`（例如 `test.txt`、`shell.php`） |
| **備份（backups）** | 開發者留低、唔應該公開嘅副本 | `/backup/`（`config.php.bak`、`users_backup.sql`、`lab.db.bak`、`site_backup_20240720.zip`、`source.zip`、`.git/`） |
| **i18n（語言檔）** | 介面多語言字串 | `includes/language.php`、`lang/` |
| **工具（tools）** | 導師／自動化示範腳本 | `tools/`（`brute.py`、`sqli_json.py`） |

> **English Standard Definition:** The target has pages, APIs, an admin area, a database, an uploads folder, backups and a tools folder — each one is a potential holding place for a mistake.

> ⚠️ 教材外補充（重點）：**每一個「唔應該被見到」嘅物（例如 `/backup/`、`config.php.bak`）都係一個潛在漏洞。** §9 備份檔爆破就係專門搵呢啲「開發者以為冇人知」嘅檔案。你之後每次見到一個新 URL，都要問：「佢後面係邊個檔案？嗰個檔案應唔應該喺度？」

### 🔍 38. 由「頁面」追到「檔案」

**一句定義**：一個 URL 通常直接對應一個伺服器上嘅檔案。`http://localhost:8080/foo.php` 對應 `foo.php`；`?lang=...` 之類嘅參數，就係餵入嗰個檔案嘅 input。

**生活化比喻**：URL 好似一個「**門牌號碼**」；`.php` 檔名就係嗰個門後面嘅「**房**」。你由門牌（URL）就可以推斷出面後面住咗邊個（`config.php`、`upload.php`⋯）。

> **English Standard Definition:** Each URL usually maps to a file on the server, and the query string feeds input into that file.

> ⚠️ 教材外補充：明白呢點之後，**披露（enumeration）就係「搵未見光嘅門牌」**——§3 目錄爆破搵 `/admin/`、§9 搵 `/backup/`。你唔需要「入侵」，好多嘢只要**估／試出個 URL** 就見到（因為開發者冇保護佢）。

---

## Part H — 攻擊鏈 6 階段同學習路線

### ⛓️ 39. 六階段概念（為何要分階段）

**一句定義**：成個 tutorial 係一條「**攻頂鏈（capstone chain）**」：**公開偵察 → 初始存取 → 權限提升 → 憑證蒐集 → 橫向檔案存取 → 主機淪陷**。分階段嘅原因係：真實攻擊**唔係一步到位**，而係**一環扣一環**——你要先用某階段嘅成果，先做得到下一階段。

**生活化比喻**：好似**打機過關**。冇偵察（第一關）就唔知有咩用戶名；冇初始存取（第二關）就冇任何「據點」；冇據點就冇得權限提升（第三關）⋯每一步都要有**前一步嘅收穫**做踏腳石。

> **English Standard Definition:** The capstone chain runs: public recon → initial access → privilege escalation → credential discovery → lateral file access → host compromise.

| 階段 | 名稱 | 目標一句 | 對應 section | 收穫（用嚟做下一步） |
|---|---|---|---|---|
| ① | 公開偵察／Public recon | 由公開來源搵有效資訊 | §8 | 有效 usernames（登入之前就有） |
| ② | 初始存取／Initial access | 攞到第一個帳號／據點 | §1、§2、§4、§6、§12（＋§13） | 一個普通帳號 |
| ③ | 權限提升／Privilege escalation | 由普通帳號升做 admin | §3 | admin 權限 |
| ④ | 憑證蒐集／Credential discovery | 執走周圍擺低嘅秘密 | §8、§9 | 密碼／密鑰／config |
| ⑤ | 橫向檔案存取／Lateral file access | 觸及更多檔案／伺服器 | §5、§7、§10、§14 | 讀檔、偷 session、攞內網 foothold |
| ⑥ | 主機淪陷／Host compromise | 由 web 用戶升到主機層 | §11 | 主機層權限 |

> ⚠️ 教材原文如此（兩個矛盾，見 `ART_T3_01`）：（1）**§8 同時出現喺階段①同④**；（2）**六階段 mapping 完全冇收錄 §13 OAuth**。本系列嘅處理：§8 主體放 ART_T3_02、ART_T3_06 只交叉引用；§13 按「OAuth 設定錯誤 ＝ 帳號接管」歸入**初始存取②B**。

### 🧭 40. 建議學習次序

**一句定義**：按攻擊鏈**由淺入深**學，唔好跳。次序：

```
ART_T3_01（環境與工具＋攻擊鏈總覽）
      ↓
ART_T3_02 公開偵察（§8）
      ↓
ART_T3_03 初始存取 — 認證／自動化濫用（§1、§2、§6）
      ↓
ART_T3_04 初始存取 — 注入／SSO（§4、§12、§13）
      ↓
ART_T3_05 權限提升（§3）
      ↓
ART_T3_06 憑證蒐集（§9；§8 交叉引用）
      ↓
ART_T3_07 橫向檔案存取（§5、§7、§10、§14）
      ↓
ART_T3_08 主機淪陷（§11）
```

**生活化比喻**：好似砌**積木塔**——你一定要由最底嗰層（環境＋偵察）開始；跳去中間，你連「要打邊個帳號」都未知。

> **English Standard Definition:** Study the phases in order, because each phase depends on the gains of the previous one.

> ⚠️ 教材外補充：**本檔（Primer）係最前面，應該喺 `ART_T3_01` 之前或同時讀。** 兩份嘅分工：Primer 畀你概念底座，01 畀你動手設定。

### 📚 41. 每一節應該點學（方法論）

**一句定義**：學每一節，都應該走同一條五步路：**（1）讀概念（係乜、點解 work）→（2）睇原文 payload／指令 →（3）喺 lab 跟住做一次 →（4）用你嘅話解釋點解成功 →（5）背防守修法。**

**生活化比喻**：好似學**游水**：睇示範（概念）→ 聽教練點做（payload）→ 落水試（walkthrough）→ 講返自己點郁手腳（理解）→ 記住安全守則（防守）。

> **English Standard Definition:** For every section: understand the concept, read the payload, run it in the lab, explain why it worked, then state the fix.

**每節 Checklist（貼喺書桌）**：

| 步驟 | 做啲乜 | 完成指標 |
|---|---|---|
| 1. 概念 | 讀「呢個係乜、點解危險」 | 可以用一句話講出漏洞本質 |
| 2. Payload | 抄低原文嘅 URL／request／code（一字不改） | 你手上有完整 payload |
| 3. 實作 | 喺 lab（Burp／`curl`）跟住做 | 見到預期嘅 response／成效 |
| 4. 理解 | 用自己嘅口語解釋「點解成功」 | 講得出前後端發生咩事 |
| 5. 防守 | 記低「點修」 | 講得出防守方要做嘅 2–3 樣 |
| 6. 自測 | 做該節嘅 5 條自測題 | 答得出 ≥4 條 |

> ⚠️ 教材外補充：**最易偷懶嘅係第 4 步。** 跟住做會成功，但唔代表你識——你要講得出「我取消咗個 cookie，所以伺服器當我係新客，counter 由零開始」呢種**因果**，先叫真正明白。

---

## Part I — 卡住嘅排查思路

### 🧯 42. 固定排查次序（環境 → 請求 → Payload 編碼 → 理解）

**一句定義**：當你「覺得冇效／唔知咩事」，唔好亂試——**按固定次序**排查：**先確認環境，再確認 request，再確認 payload 編碼，最後先懷疑自己理解錯咗。**

**生活化比喻**：好似屋企**冇電**。唔好一開始就拆電視（＝懷疑自己唔識）。要**由源頭開始**：插頭插咗未？→ 電源開咗未？→ 有冇跳掣？→ 最後先檢查部電器。**順序錯，就會喺無關嘅地方兜圈。**

> **English Standard Definition:** Debug in a fixed order: environment first, then the request itself, then the payload encoding, and only last your own understanding.

**步驟一：先確認環境（最大機會係呢度）**

| 檢查 | 通過標準 |
|---|---|
| 靶場 server 起咗？ | 終端有 `Development Server ... started`，冇返 prompt |
| 資料庫建咗？ | 去過 `init_db.php`，見到 `Database initialised successfully.` |
| FoxyProxy 揀咗 `Burp`？ | 工具列顯示 Burp 為當前 profile |
| Burp listener 開咗？ | `Proxy > Proxy settings > Proxy Listeners` 見到 `127.0.0.1:8080` Running |
| CA import 咗？ | HTTPS 冇憑證警告；`PortSwigger CA` 喺 Authorities |
| Intercept 冇白卡住你？ | 熄咗 Intercept，或者撳咗 Forward |
| 行嘅係唔係 lab 目錄？ | `tools/*.py` 要喺 lab root 行先 import 到 project |

> ⚠️ 教材外補充：**8 成「唔 work」都係呢度。** 尤其係「Burp 收唔到 request」——先問「瀏覽器有冇真係行緊 Burp？」，唔好一開始就懷疑 payload。

**步驟二：再確認 request 本身**

| 檢查 | 點做 |
|---|---|
| Method 啱唔啱？ | 原文話 `POST` 你唔好打 `GET`（例如 §3 上傳，`GET` 係 default-deny） |
| Path 啱唔啱？ | 逐字對返原文 URL（大小寫、`.php`、`/admin/`） |
| Header 齊唔齊？ | Content-Type、Cookie、自訂 header（例如 `X-Username`）有冇帶漏 |
| Cookie／session 狀態？ | 需要登入嘅練習，你有冇帶對 session？（§3 要登入；§6 要**故意唔帶**） |
| Body 格式？ | 表單用 `x-www-form-urlencoded`，JSON 用 `application/json` |

> **English Standard Definition:** After the environment, check the request itself: the exact method, path, headers and body must match the exercise.

**步驟三：再確認 payload 編碼（Encoding）**

**一句定義**：好多 payload 唔能夠原樣送去——空格、`&`、`?`、`#`、`/`、非英文字元要**編碼**（URL encoding），否則會被拆散或誤解。

**生活化比喻**：好似寄包裹要**填報關紙**——某些字要「轉碼」先寄得，唔轉就會被系統當成另一樣嘢。

| 常見問題 | 症狀 | 處理 |
|---|---|---|
| URL 內嘅空格 | 被截斷，參數唔完整 | 用 `%20` 或 `+` |
| `&`／`#` 喺值入面 | 被當成參數分隔 | 用 `%26`／`%23` |
| Traversal `../` 被過濾 | 伺服器可能連字元一齊 normalize | 試雙重編碼 `%2e%2e%2f` 或混合（視乎情境） |
| JSON 內嘅引號 | payload 拆散 JSON | 正確 escape `\"` |
| Base64／hex | 睇唔明 response 或 payload | 用 Burp Decoder 編解碼 |

> ⚠️ 教材外補充：**Burp 有 Decoder 同自動編碼**——當你見到 payload 明明打對但冇效，先懷疑「係唔係被編碼搞亂咗」。

**步驟四：最後先懷疑自己理解錯**

**一句定義**：如果頭三步全部通過，先回頭問「**我係唔係誤解咗呢個漏洞嘅原理？**」——重讀概念、對返原文 bullets、睇下係唔係假設咗一啲唔存在嘅嘢。

**生活化比喻**：好似迷路——行錯方向之前，先確認你手上張地圖係唔係**對嘅地圖**。

> **English Standard Definition:** Only after the environment, the request and the encoding all check out should you question your understanding of the vulnerability.

### 🧗 43. 新手最常撞嘅 5 個卡點（速查）

| # | 症狀 | 最可能原因 | 快速解法 |
|---|---|---|---|
| 1 | 瀏覽器開到靶場，但 Burp `HTTP history` 空白 | FoxyProxy 未選 Burp／Firefox 自己 proxy 蓋過 | 撳 FoxyProxy 揀 `Burp`；確認 `127.0.0.1:8080` |
| 2 | `http://burpsuite` 開唔到、攞唔到 CA | Burp 未開／流量冇經 Burp | 開 Burp、listener Running、FoxyProxy 揀 Burp，再試 |
| 3 | 去 HTTPS 彈憑證警告 | Burp CA 未 import 或冇剔信任 | 重做 01 檔 Step 6（import `cacert.der`、剔 Trust this CA） |
| 4 | `php -S` 報 `Address already in use` | port 8080 被佔（舊 server 未關／同 Burp 撞） | 關舊 process 或改 port；注意靶場可能喺另一部 VM |
| 5 | §13／§14 個 app 卡死（request 唔回頭） | PHP 內建 server 單執行緒，self-referential 會 deadlock | 確認啟動有加 `PHP_CLI_SERVER_WORKERS=12` |

> **English Standard Definition:** Most beginner failures are environment failures, not payload failures — check the toolchain before doubting the technique.

> ⚠️ 教材外補充（環境中立）：原文嘅靶場 app **喺課程網站嘅 VM 度，唔喺你本機**。所以見到 `http://localhost:8080/...` 時要問清楚：呢個 `localhost` 係指**靶場 VM** 定你**自己部機**？如果係本機又要 Burp listener 都喺 8080，就會撞 port。**一律唔假設，按你自己 lab 提供嘅位址／port 調整**，唔肯定就問導師。

---

## 💬 Student questions 詳解

> ⚠️ 本檔不涵蓋 student questions（見各階段檔）。
>
> 原因：本檔係**教材外自撰嘅先修檔**，唔對應原文任何 §，原文嘅 53 條 student questions 全部落喺 §1–§14 各攻擊階段。各階段嘅題目同建議答案，見對應嘅 `ART_T3_02` 至 `ART_T3_08` 各檔之「Student questions 詳解」章節。本檔嘅角色係**教你 Concepts**，唔係答題。

---

## 🎒 考前 5 分鐘懶人包 ＋ 自測

### 必背關鍵概念（一覽）

| 概念 | 一句話 |
|---|---|
| Client／Server | client 問、server 答 |
| DNS | 域名 → IP |
| Port | 同一部機唔同服務嘅門牌；本 lab 用 8080 |
| HTTP request | method ＋ path ＋ version ＋ headers ＋ body |
| HTTP response | status code ＋ headers ＋ body |
| GET vs POST | GET 參數喺 URL；POST 資料喺 body；**兩者都可被重播** |
| Status code | 2xx 成功、3xx 轉向、4xx 客戶錯、5xx 伺服錯 |
| Cookie vs Session | cookie 喺瀏覽器（存 session id）；真正狀態喺伺服器 |
| HTTPS | HTTP ＋ TLS；攔截要 import Burp CA |
| HTML／CSS／JS | 結構／外觀／行為 |
| Client-side validation | **唔係**安全控制 |
| PHP superglobal | `$_GET`／`$_POST`／`$_SERVER`／`$_SESSION` |
| `include()` | 執行期拉入另一個檔（LFI 根源） |
| SQLi 根源 | 用戶輸入被拼入 query，變成**查詢邏輯** |
| Proxy | 中間人；攔截代理可睇／改每個 request |
| Repeater vs Intruder | 一對一改 vs 大量自動化 |
| 六階段 | 偵察→初始存取→權限提升→憑證蒐集→橫向檔案→主機淪陷 |

### 必背英文句

> **English Standard Definition:** Only test systems you own or have explicit written authorisation to test; unauthorised access is a criminal offence, not practice.

> **English Standard Definition:** Client-side validation runs on the attacker's machine and can always be bypassed; only server-side validation is a real security control.

> **English Standard Definition:** If untrusted input is concatenated into a query string, the attacker can break out of the value and rewrite the query logic.

> **English Standard Definition:** An intercepting proxy sits between the browser and the server, letting you view and modify every request and response.

> **English Standard Definition:** Debug in a fixed order: environment first, then the request, then the payload encoding, and only last your own understanding.

### 自測 6 題

1. 一個 HTTP request 由邊幾部分組成？response 呢？
2. Cookie 同 session 分別儲喺邊？點解偷到 `PHPSESSID` 就等於帳號接管？
3. 為何「前端（JavaScript）驗證」唔算安全控制？
4. PHP 嘅 `$_GET`／`$_POST` 分別係收咩 input？`include()` 點解可以做成本地檔案讀取？
5. 為何要「瀏覽器 → Burp → 伺服器」？Repeater 同 Intruder 分工係點？
6. 當你「覺得唔 work」，排查嘅固定次序係咩（四步）？

**答案（最後一行）**：1. Request＝method＋path＋HTTP version＋headers＋（可選）body；Response＝status code＋headers＋（可選）body｜2. Cookie 存喺瀏覽器（只得 session id），真正狀態存喺伺服器；偷到 session id 就等於令伺服器當你係受害者，故可接管帳號｜3. 因為 JS 跑喺攻擊者控制嘅機器上，佢可以關掉／改掉／完全唔用瀏覽器，直接發 request｜4. `$_GET` 收 URL query string，`$_POST` 收 form body；`include()` 執行期拉入另一個檔，若檔名由用戶控制而無 allow-list，就可 include 到唔預期嘅檔案（LFI）｜5. 令你可以睇／改瀏覽器送出嘅每條 request 同 response；Repeater＝改一個 request 重播，Intruder＝自動化大量 request｜6. 環境 → 請求 → payload 編碼 → 最後先懷疑自己理解錯。

---

## 🛡️ 防守方修正清單（Defender Fix Checklist）

> ⚠️ 教材外補充：本檔係概念先修，冇對應單一「漏洞 section」，但下面係由本檔概念直接推導嘅**基礎防守習慣**，每一條都對應某一節嘅修法。

| 概念（本檔） | 攻擊者點濫用 | 防守做法 |
|---|---|---|
| 前端驗證（Part C） | 關掉 JS／唔用瀏覽器 | 所有檢查**伺服器端再做一次**；input validation 係 server 責任 |
| Cookie／session（Part B） | 偷 `PHPSESSID` | Cookie 加 `HttpOnly`、`Secure`、`SameSite`；登入／敏感操作重驗 |
| Header 係用戶輸入（Part B） | 反射 `X-Username` 成 XSS | 所有 output escape／encode；唔好信任任何 header |
| PHP superglobal（Part D） | 直接拼輸入入 query／`include` | 參數化查詢（prepared statements）、allow-list、型別強制 |
| 字串拼接（Part D） | SQLi／NoSQLi／LFI | 唔好拼查詢；`include()` 用白名單檔名 |
| 目錄／檔案結構（Part G） | 搵到未公開嘅 page／backup | 唔好把 backup、`.git`、`config.php.bak`、`.db` 放喺 web root；敏感檔加存取控制 |
| 冇 rate limit（Part E） | 無限 brute force／bombing | 伺服器端 rate limit、dedupe、ownership 驗證、CAPTCHA（做得對） |
| 靶場綁 `0.0.0.0`（Part B） | LAN 任何機都入到 | 只喺隔離 lab 網段用；真實環境綁 loopback 或用 firewall |

**一般做法補充（PHP／常見 stack）**：上線要 `display_errors = Off`、`expose_php = Off`；SQLite `.db` 檔同 `config.php`、`init_db.php` 唔應該被 web 直接存取（用 server config／`.htaccess` 拒絕）；設定 HTTP security headers（例如 CSP）減低 XSS 影響；定期移除預設／測試帳號同弱密碼。

➜ 對應速記：`ART_Final_CheatSheet.md`｜對應雙語詞彙：`ART_T3_09_Glossary_StudyGuide.md`｜對應設定步驟：`ART_T3_01_Setup_Tools_AttackChain_StudyGuide.md`
