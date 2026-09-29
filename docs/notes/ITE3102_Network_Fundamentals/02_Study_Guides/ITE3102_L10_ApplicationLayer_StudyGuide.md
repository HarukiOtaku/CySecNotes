# ITE3102 L10: Application Layer — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Module 15: Application Layer
> **原始檔**：`01_Raw_Materials/Lectures/Lecture10_ApplicationLayer.pptx`
> **題解對應**：`ITE3102_T10_Application_StudyGuide.md`（同一課嘅 Tutorial 練習題解）
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 對照題解自測 → 考前用懶人包速記

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課係整個 ITN 課程「最貼近用戶」嘅一層：**Application Layer**。前面 L8、L9 講嘅係 transport layer 點樣分段、交握、重傳，但用戶其實從來唔會直接見到 TCP／UDP——用戶見到嘅係「瀏覽器開到網頁」、「收到 email」、「打 `www.cisco.com` 就入到網站」。呢啲全部由 application layer protocols 負責。今課第一個關鍵觀念：TCP/IP 模型嘅 application layer **唔等於** OSI 嘅 application layer，而係把 OSI 最頂三層——**Application（Layer 7）、Presentation（Layer 6）、Session（Layer 5）**——嘅功能合併成一個 application layer。

跟住落嚟，Module 15 分四條主線（slide 2 嘅 agenda）：(1) **Application Layer Protocols**——application／presentation／session 三層職責、TCP/IP application layer、知名協定同 port number、client-server 同 peer-to-peer 兩種架構；(2) **Web and Email Protocols**——HTTP／HTTPS／HTML、URL 三部分、GET／POST／PUT、SMTP／POP／IMAP 三個電郵協定；(3) **IP Addressing Services**——DNS（域名轉 IP、message format、hierarchy、`nslookup`）同 DHCP（自動派 IP、DORA 四步、lease）；(4) **File Sharing Services**——FTP 雙連接、SMB 檔案分享。

考試角度：本課屬「背誦為主、判斷為輔」。必背嘅係**協定 ↔ port number ↔ 功能 ↔ transport protocol** 四方對應，同埋幾個流程次序（URL 開網頁五步、DHCP DORA 四步、FTP 兩條連接）。判斷題就考架構分類（client-server / P2P network / P2P application）同 DNS 設定出錯嘅情境分析。

**實務情境一（打 URL 之後發生咩事）**：用戶喺瀏覽器打 `http://www.cisco.com/index.html`。瀏覽器先把 URL 拆成三部分——`http`（scheme）、`www.cisco.com`（server name）、`index.html`（requested file）。跟住瀏覽器要搵 **name server** 把 `www.cisco.com` 轉成 numeric IP address（呢步就係 DNS），再向 web server 發 **HTTP GET** 要求 `index.html`，server 回 HTML code，瀏覽器解讀 HTML 並排版成畫面。整個流程任何一步斷（DNS 指錯、record 有 typo）都會「開唔到網頁」。

**實務情境二（新同事部 laptop 上唔到網）**：公司網絡用 **DHCP** 派 IP，新電腦開機時發 **DHCP Discover**（廣播搵 server），server 回 **DHCP Offer**，client 再發 **DHCP Request**，server 最後以 **DHCP Acknowledge** 確認租約。如果 DHCP 冇開或者 client 攞錯 gateway，就算 cable 插得好都上唔到網。呢個就係本課要你排得出嘅 DORA 流程。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **說出 TCP/IP application layer 對應 OSI 邊三層** — Explain that the TCP/IP application layer defines the functions of the OSI application, presentation, and session layers
2. **分辨 OSI application／presentation／session 三層嘅職責** — Describe the functions of the OSI application, presentation, and session layers
3. **解釋 TCP/IP application protocols 嘅作用同兼容性要求** — Explain the role of TCP/IP application layer protocols and why they must be implemented on both source and destination
4. **背熟各協定嘅 port number 同 transport protocol（TCP／UDP／both）** — Identify the well-known ports used by common application layer protocols
5. **分辨 client-server model、peer-to-peer network、peer-to-peer application** — Distinguish the client-server model, peer-to-peer networks and peer-to-peer applications
6. **拆解 URL 三部分並排序網頁請求流程** — Explain the interaction between a web browser and a web server using a URL
7. **分辨 HTTP 嘅 message types：GET／POST／PUT** — Distinguish HTTP message types (GET, POST, PUT)
8. **講出 HTTPS 相對 HTTP 嘅加密同認證優勢** — State how HTTPS secures and authenticates data compared with HTTP
9. **解釋 email client 同 mail server 嘅角色分工** — Explain how email clients and mail servers communicate
10. **分辨 SMTP／POP／IMAP 三個電郵協定嘅用途同儲存特性** — Distinguish SMTP, POP and IMAP in the email delivery process
11. **解釋 DNS 嘅作用、message format 四部分同 hierarchy** — Explain DNS name resolution, DNS message sections and the DNS hierarchy
12. **用 `nslookup` 手動查詢同排查 name resolution 問題** — Use the `nslookup` command to query DNS and troubleshoot resolution
13. **解釋 DHCP 點樣自動派 IP 同排出 DORA 四步訊息** — Explain DHCP automatic addressing and order the four DHCP messages
14. **說明 FTP 兩條連接（port 21 控制、port 20 資料）嘅用途** — Describe FTP's control and data connections
15. **列出 SMB 嘅三個功能同佢喺 Microsoft networking 嘅地位** — Describe SMB and its three message functions

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

> **本章次序完全跟 deck 章節**：3.1–3.8 = 10.1 Application Layer Protocols；3.9–3.15 = 10.2.1 Web and Email Protocols；3.16–3.21 = 10.2.2 IP Addressing Services；3.22–3.23 = 15.5 File Sharing Services。

### 3.1 Application Layer 總覽（The Application Layer，slide 3）

繁中解說：OSI 模型最頂三層——**application（Layer 7）、presentation（Layer 6）、session（Layer 5）**——嘅功能，喺 TCP/IP 模型裡面全部由單一層 **application layer** 負責。呢個係全課最重要嘅 mapping 觀念，亦係 Tutorial Q1 嘅直接考點。

> **English Standard Definition:** "The upper three layers of the OSI model (application, presentation, and session) define functions of the single TCP/IP application layer."

> **圖示描述**：教材原圖係左右兩個 layer stack 對照——左邊 OSI 七層（7 Application、6 Presentation、5 Session、4 Transport、3 Network、2 Data Link、1 Physical），右邊 TCP/IP 四層（Application、Transport、Internet、Network Access）；圖中以括號把 OSI 5、6、7 三層一齊指向 TCP/IP Application 層。

### 3.2 OSI Application Layer（slide 4，對應 10.1.1）

繁中解說：**Application Layer** 係最接近 end user 嘅一層，負責 source host 同 destination host 上面嘅**程式之間**交換資料。注意兩個考點：一、「最接近用戶」係位置描述；二、佢係「programs running on the source and destination hosts」之間交換資料，唔止係「用戶同電腦」之間。

> **English Standard Definition:** OSI Application Layer — "Closest to the end user. Used to exchange data between programs running on the source and destination hosts."

### 3.3 OSI Presentation Layer（slide 5，對應 10.1.1.2）

繁中解說：**Presentation Layer** 有三項工作：(1) 把 source device 嘅資料**格式化（formatting）**成 receiving device 睇得明嘅相容格式；(2) **壓縮（compressing）**資料；(3) **加密（encrypting）**資料。答題時三樣要齊，唔可以只寫「formatting」。Tutorial Q11 亦考到：GIF、JPEG、MPEG 呢啲「資料格式標準」就係屬 presentation layer 嘅職責。

> **English Standard Definition:** OSI Presentation Layer — "Formatting data at the source device into a compatible form for the receiving device. Compressing data. Encrypting data."

### 3.4 OSI Session Layer（slide 6）

繁中解說：**Session Layer** 嘅功能係建立同維持 source 與 destination 應用程式之間嘅**對話（dialogs）**。佢負責三件事：**initiate dialogs**（開始對話）、**keep them active**（保持對話活躍）、**restart sessions**（重新啟動被中斷或者長時間閒置嘅 session）。留意關鍵詞「disrupted or idle for a long period of time」——session recovery 係 session layer 專有嘅職責。

> **English Standard Definition:** OSI Session Layer — "Functions at the session layer create and maintain dialogs between source and destination applications. The session layer handles the exchange of information to initiate dialogs, keep them active, and to restart sessions that are disrupted or idle for a long period of time."

### 3.5 TCP/IP Application Layer（slide 7）

繁中解說：TCP/IP application protocols 規定咗常見互聯網功能所需嘅**格式（format）**同**控制資訊（control information）**。第二個必考點係兼容性鐵律：application layer protocol 必須**同時實作喺 source 同 destination 兩部裝置**，而且兩邊版本要**相容（compatible）**，先可以通訊。所以「只裝一邊」係唔可能成功嘅。

> **English Standard Definition:** "TCP/IP application protocols specify the format and control information necessary for common Internet functions. Application layer protocols must be implemented in both the source and destination devices and must be compatible to allow communication."

### 3.6 TCP/IP Application Layer Protocols 一覽（slides 8–9）

繁中解說：呢兩張 slide 係全課「數字心臟」，要背到可以雙向抽問（見 port 講得出協定、見協定講得出 port）。以下八個協定連 port 一字不漏照教材抄錄。

> **English Standard Definition:** TCP/IP application protocols include DNS (TCP/UDP 53), DHCP (UDP server 67, client 68), SMTP (TCP 25), POP3 (TCP 110), IMAP (TCP 143), FTP (TCP 21, TCP/UDP 20), TFTP (UDP 69), HTTP (TCP 80, 8080) and HTTPS (TCP, UDP 443).

**名稱解讀服務（Name & Address Services）**

- **DNS**（教材寫 *Domain Name Service Protocol*，標準全名 **Domain Name System**；TCP/UDP **53**）：把 **domain names 翻譯成 numeric IP addresses**。
- **DHCP**（出版教材寫 *Dynamic Host Control Protocol*；slide 26 同標準全名係 **Dynamic Host Configuration Protocol**；UDP server **67**、client **68**）：開機時**動態派發** IP address、subnet mask、default gateway 同 DNS server 畀 client stations。

**電郵協定（Email Protocols）**

- **SMTP**（TCP **25**）：令 client 可以**寄 email 去 mail server**，亦令 server 可以**寄 email 去其他 server**（雙向轉送）。
- **POP3**（TCP **110**）：令 client 可以**由 mail server 收 email，而原本嘅郵件會被刪除（original deleted）**；郵件下載到 client 本機嘅 mail application。教材用詞係「Downloads the email to the local mail application of the client」。
- **IMAP**（教材 slide 8 標示 **IMAP3**，Tutorial 題解同標準用 **IMAP4**；TCP **143**）：令 client 可以**由 mail server 收 email，而原本嘅郵件會被保留（original kept）**。

**檔案傳送同網頁協定（File Transfer & Web Protocols）**

- **FTP**（TCP **21**、TCP/UDP **20**）：定立規則，令一部 host 嘅用戶可以經網絡存取同傳送檔案去另一部 host。教材明言 FTP 係 **reliable, connection-oriented, and acknowledged** file delivery protocol。
- **TFTP**（UDP **69**）：**簡單、connectionless（無連接）**嘅檔案傳送協定。
- **HTTP**（TCP **80**, **8080**）：一套規則，用嚟喺 World Wide Web 上交換文字、圖像、聲音、影片同其他 multimedia files。
- **HTTPS**（TCP, UDP **443**）：瀏覽器用**加密（encryption）**保護 HTTP 通訊，並會**認證（authenticates）**你正在連接嘅網站。

➜ 實作見 ITE3102_PT10_WebEmail_CodeGuide.md（HTTP／HTTPS／SMTP／POP3 服務設定）

**必背對比（Tutorial Q2／Q9 直出）**

| 功能關鍵詞 | 協定 | Port | Transport |
|---|---|---|---|
| Delivery of web pages | **HTTP** | 80（另 8080） | TCP |
| Secure delivery of web pages | **HTTPS** | 443 | TCP, UDP |
| Connection-oriented file transfer | **FTP** | 21（control）／20（data） | TCP |
| Connectionless file transfer | **TFTP** | 69 | UDP |
| Forwards emails | **SMTP** | 25 | TCP |
| Retrieves emails with original deleted | **POP3** | 110 | TCP |
| Retrieves emails with original kept | **IMAP** | 143 | TCP |
| Translate domain name into IP address | **DNS** | 53 | TCP/UDP |
| Dynamic IP / mask / gateway / DNS at start-up | **DHCP** | server 67／client 68 | UDP |
| File sharing in Microsoft networks | **SMB** | —（教材無列 port） | — |

> ⚠️ 講義原文將 HTTPS 寫成 TCP, UDP 443；實務上 HTTPS 只行 TCP。考卷跟講義。

### 3.7 Client-Server Model（slide 10）

繁中解說：**Client** 同 **server processes** 兩者都屬於 application layer。呢個模型嘅核心係：application layer protocol **定義 request 同 response 嘅格式**——client 發 request，server 回 response。教材例子係用 ISP 嘅 email service 嚟 send、receive 同 store email。判斷題口訣：**「有專用伺服器提供服務」＝ client-server**（Tutorial Q12 第 1 題：workstation 向 DNS server 發 DNS request）。

> **English Standard Definition:** "Client and server processes are considered to be in the application layer. Application layer protocols describe the format of the requests and responses between clients and servers. Example of a client-server network is using an ISP's email service to send, receive and store email."

### 3.8 Peer-to-Peer (P2P) Networks（slide 11）

繁中解說：**P2P network** 最大特徵係**唔需要專用伺服器（no dedicated server is required）**。每一部裝置（叫 **peer**）都可以**按每次請求（on a per request basis）**同時做 server 同 client；喺 P2P exchange 裡面，兩部裝置喺通訊過程中地位平等（considered equal）。判斷題口訣：**無專用伺服器 + 角色按每次請求決定 = P2P network**。Tutorial Q12 第 2 題（用同事部 workstation 掛住嘅 printer 印文件）同 Q13 就係考呢點。

> **English Standard Definition:** "No dedicated server is required. Each device (a peer) can function as both a server and a client on a per request basis. In a peer-to-peer exchange, both devices are considered equal in the communication process."

### 3.9 Peer-to-Peer Applications（slide 12）

繁中解說：**P2P application** 講嘅係**軟件層面**：每一部 end device 都提供一個 **user interface**，並喺背景執行一個 **background service**。喺一次通訊裡面，**兩邊 client 會同時（simultaneously）initiate a message 同 receive a message**。判斷題口訣：**特定 user interface + background service = P2P application**（Tutorial Q13 對應兩行）。與 3.8 合併記：P2P **network** 講架構，P2P **application** 講軟件。

> **English Standard Definition:** "Each end device provides a user interface and runs a background service. Both clients simultaneously initiate a message and receive a message."

### 3.10 Common P2P Applications（slide 13，對應 10.1.2.4）

繁中解說：常見 P2P network 包括 **Direct Connect、BitTorrent、eDonkey、Freenet**（四個名要記齊）。兩種分享模式要分清：

- **BitTorrent 技術**：好多 P2P 應用容許用戶同時間互相分享「好多個檔案嘅碎片（pieces of many files）」。
- **Gnutella protocol**：部分 P2P 應用係基於 Gnutella，每個用戶同其他用戶分享「**完整檔案（whole files）**」。

> **English Standard Definition:** "Common P2P networks include: Direct Connect, BitTorrent, eDonkey, Freenet. Many P2P applications allow users to share pieces of many files with each other at the same time — this is BitTorrent technology. Some P2P applications are based on the Gnutella protocol, where each user shares whole files with other users."

Tutorial Q12 第 3 題（用即時通訊 App 下載朋友分享嘅檔案，先由目錄／定位服務確定檔案位置）就係典型 **P2P application** 情境。

### 3.11 Hypertext Transfer Protocol / Markup Language（slide 14，對應 10.2.1.1）

繁中解說：當用戶喺 web browser 打一個 web address——即 **uniform resource locator (URL)**——瀏覽器會建立一條連去 server 上運行緊嘅 **web service** 嘅連接，用嘅就係 **HTTP** 協定。HTTP 負責「傳」，HTML 負責「內容點表達」，兩者係一對拍檔。

> **English Standard Definition:** "When a web address or uniform resource locator (URL) is typed into a web browser, the web browser establishes a connection to the web service running on the server, using the HTTP protocol."

### 3.12 Web Browser 與 Web Server 嘅互動（slide 15，對應 10.2.1.1）

繁中解說：以 `http://www.cisco.com/index.html` 為例，**URL 三部分**必須背得準：

1. **`http`** — the protocol or scheme（協定／scheme）
2. **`www.cisco.com`** — the server name（伺服器名稱）
3. **`index.html`** — the specific file name requested（要求嘅指定檔案名）

跟住落嚟嘅**五步流程**（排序題直出）：

1. 瀏覽器解讀 URL 三部分；
2. 瀏覽器向 **name server** 查詢，把 `www.cisco.com` 轉成 **numeric address**（即 DNS name resolution）；
3. 瀏覽器向 server 發 **HTTP GET request**，要求 `index.html`；
4. Server 回傳呢一頁嘅 **HTML code**；
5. 瀏覽器 **deciphers（解讀）HTML code** 並把頁面 **formats（排版）**出嚟。

> **English Standard Definition:** "First, the browser interprets the three parts of the URL: 1. http (the protocol or scheme) 2. www.cisco.com (the server name) 3. index.html (the specific file name requested). Browser checks with a name server to convert www.cisco.com into a numeric address. Browser sends an HTTP GET request to the server and asks for the file index.html. Server sends the HTML code for this web page. Browser deciphers the HTML code and formats the page."

> **圖示描述**：教材原圖係 client（web browser）同 server（web server）之間嘅來回箭頭圖，箭嘴標示 request 出去、response 返嚟，並列出上面 URL 三部分同五個步驟。

➜ 實作見 ITE3102_PT10_WebEmail_CodeGuide.md（用 IP 同 hostname 分別開網頁，驗證 name resolution）

### 3.13 HTTP 與 HTTPS（slide 16，對應 Tutorial Q5／Q6）

繁中解說：**HTTP 係一個 request/response protocol**——一問一答。教材列出 **3 個常見 HTTP message types**：

- **GET** — A client request for data（向 server 請求資料）。
- **POST** — Uploads data files to the web server（上傳資料檔案）。
- **PUT** — Uploads resources or content to the web server（上傳資源或內容）。

而 **HTTPS** 就係「HTTP + 安全」：**HTTPS protocol 用 encryption 同 authentication 嚟保護資料**。一句記法：**GET 拿、POST 交（資料檔案）、PUT 放（資源／內容）**；**HTTP 明文，HTTPS 加密＋認證**。

> **English Standard Definition:** "HTTP is a request/response protocol. 3 common HTTP message types: GET — A client request for data. POST — Uploads data files to the web server. PUT — Uploads resources or content to the web server. HTTP Secure (HTTPS) protocol uses encryption and authentication to secure data."

### 3.14 Email Protocols — Client 與 Server 嘅分工（slide 17，對應 10.2.1.3）

繁中解說：呢張 slide 講嘅係**架構觀念**，唔係個別協定，好易考情境題：

- **Email clients**：同 mail servers 通訊嚟收發 email。關鍵鐵律——**email client 喺寄信時唔會直接同另一個 email client 通訊**；兩個 client 都**依賴 mail server 去 transport messages**。
- **Mail servers**：同**其他 mail servers** 通訊，把郵件由一個 domain transport 去另一個 domain。

即係話：client 對 server（收／發），server 對 server（轉送），**永遠冇 client 對 client**。

> **English Standard Definition:** "Email clients communicate with mail servers to send and receive email. An email client does not communicate directly with another email client when sending email. Instead, both clients rely on the mail server to transport messages. Mail servers communicate with other mail servers to transport messages from one domain to another."

補充標準術語：ITN 標準教材通常把「負責轉送郵件」嘅 mail server role 叫 **MTA（Mail Transfer Agent）**，把「負責把郵件放入用戶 mailbox」嘅叫 **MDA（Mail Delivery Agent）**；本 Lecture 教材只以「mail server」通稱，答題時寫 "mail servers transport messages from one domain to another" 一定安全。

### 3.15 三個電郵協定（slide 18）＋ SMTP／POP／IMAP Operation（slides 19–21）

繁中解說：電郵總共**三個協定**，一句搞清楚邊個負責推、邊個負責拉：

- **SMTP** — to **send** email（寄）。
- **POP** — to **retrieve** email（收）。
- **IMAP** — to **retrieve** email（收）。

> **English Standard Definition:** "Three protocols for email: Simple Mail Transfer Protocol (SMTP) to send email. Post Office Protocol (POP) to retrieve email. Internet Message Access Protocol (IMAP) to retrieve email."

**3.15.1 SMTP Operation（slide 19，10.2.1.4）**

繁中解說：SMTP 用嚟**寄** email。SMTP message format 要求兩部分——**message header** 同 **message body**。考點係兩者嘅規則唔同：**body 可以包含任何數量嘅文字**（any amount of text），但 **header 必須有格式正確嘅 recipient email address 同 sender address**，一個都唔可以少或者打錯。

> **English Standard Definition:** "SMTP is used to send email. SMTP message formats require a message header and a message body. Although the message body can contain any amount of text, the message header must have a properly formatted recipient email address and a sender address."

**3.15.2 POP Operation（slide 20）**

繁中解說：**POP** 由應用程式用嚟**由 mail server 收 email**。特性：email 由 server **download 落 client，然後喺 server 上刪除（deleted on the server）**。所以 POP 適合「server 儲存空間有限」嘅情況（Tutorial Q4），但缺點係換機／換地點就冇得睇返。

> **English Standard Definition:** "POP is used by an application to retrieve email from a mail server. With POP email is downloaded from the server to the client and then deleted on the server."

**3.15.3 IMAP Operation（slide 21）**

繁中解說：**IMAP** 同樣用嚟由 mail server 收 email，但行為相反：**message 嘅副本 download 落 client，而原本嘅 message 保留喺 server（stored on the server）**。因為原件仍在 server，用戶可以喺唔同裝置、唔同地點登入都睇到同一批郵件（Tutorial Q4 嘅「Enables download of emails from different locations」）。

> **English Standard Definition:** "IMAP is used to retrieve mail from a mail server. Copies of messages are downloaded from the server to the client and the original messages are stored on the server."

**必背對比（POP vs IMAP vs SMTP）**

| 協定 | 角色 | 原件去向 | Port (TCP) |
|---|---|---|---|
| **SMTP** | 寄出／server 對 server 轉送 | —（負責推） | 25 |
| **POP3** | 收信 | Download 後 **server 上刪除** | 110 |
| **IMAP** | 收信 | Download 副本，**原件留在 server** | 143 |

➜ 實作見 ITE3102_PT10_WebEmail_CodeGuide.md（Server 開 SMTP／POP3、建立 mail user、PC 設 mail client、Send／Receive／Reply 驗證）

### 3.16 Domain Name Service（slide 22，對應 10.2.2.1）

繁中解說：**DNS protocol 容許把 domain name 動態翻譯成正確嘅 IP address**（dynamic translation）。關鍵詞係 **dynamic**——即係話每次查詢都可以即時解析，唔需要人手維護表格喺用戶機。呢個就係「點解打 `www.cisco.com` 而唔使記 IP」嘅答案。

> **English Standard Definition:** "The DNS protocol allows for the dynamic translation of a domain name into the correct IP address."

### 3.17 DNS Message Format 與 Resource Records（slide 23，對應 10.2.2.2）

繁中解說：DNS server 儲存唔同類型嘅 **resource records**，用嚟做 name resolution。教材列出 DNS message 嘅四個主要 section（另有 **Header**）：

| DNS message section | Description（教材原文） |
|---|---|
| **Header** | （教材只列名；用作攜帶查詢旗標等資訊） |
| **Question** | The question for the name server（問 name server 嘅問題） |
| **Answer** | Resource Records answering the question（回答問題嘅 resource records） |
| **Authority** | Resource Records pointing toward an authority（指向權威伺服器嘅 records） |
| **Additional** | Resource Records holding additional information（額外資訊嘅 records） |

**Resolve 流程（三句必背）**：

1. Client 發 query 時，server 嘅 DNS process **先睇自己嘅 records** 去 resolve 個名；
2. 若 server **解析唔到（unable to resolve）**，佢會**聯絡其他 servers** 去解析；
3. Server 會**暫時儲存（temporarily stores）該 numbered address**，萬一同一個名再被查詢就唔使再跑一次——呢個就係 **DNS cache**。

**驗證指令**：`ipconfig /displaydns` 會顯示 Windows PC 上**所有 cached 嘅 DNS entries**。

> **English Standard Definition:** "The DNS server stores different types of resource records used to resolve names with: Header, Question, Answer, Authority, Additional. When a client makes a query, the server's DNS process will first look at its own records to resolve the name. If the server is unable to resolve the name, it contacts other servers to resolve the name. The server temporarily stores the numbered address in the event that the same name is requested again. The `ipconfig /displaydns` command displays all of the cached DNS entries on a Windows PC."

**Resource record types 補充（slide 23 註解所列「List of DNS record types」官方清單；教材擷取文字只寫「different types of resource records」，未逐項列出，以下為 ITN 標準口徑）**：

- **A** — 把 hostname 對應到 **IPv4** address（Tutorial Q10 情境裡面 apple.hk／orange.hk 嘅記錄就係 A record）。
- **AAAA** — 把 hostname 對應到 **IPv6** address。
- **NS** — 指出該 domain 嘅 **authoritative name server**（對應上面嘅 Authority section）。
- **MX** — 指出該 domain 收 email 嘅 **mail exchange server**（同 3.14 嘅 mail server 分工直接相關）。
- **CNAME** — **別名（canonical name alias）**，把一個名指向另一個名。

> **English Standard Definition (record types):** An A record maps a hostname to an IPv4 address, an AAAA record maps a hostname to an IPv6 address, an NS record identifies the authoritative name server for a domain, an MX record identifies the mail exchange server for a domain, and a CNAME record creates an alias for another name.

### 3.18 DNS Hierarchy（slide 24）

繁中解說：DNS 係**分散式（distributed）**嘅，唔係一部 server 記全世界。三個考點：

1. **每個 DNS server 只負責管理 DNS 結構中一小部分嘅 name-to-IP mappings**；
2. **唔屬自己 zone 嘅查詢，會被 forward 去其他 servers 做翻譯**；
3. **Top-level domains（TLD）** 代表組織類型或者來源國家。教材例子：**.com** = a business or industry；**.org** = a non-profit organization；**.au** = Australia；**.co** = Colombia。

> **English Standard Definition:** "Each DNS server is only responsible for managing name-to-IP mappings for that small portion of the DNS structure. Requests for zones not stored in a specific DNS server are forwarded to other servers for translation. The different top-level domains represent either the type of organization or the country of origin."

> **圖示描述**：教材原圖係一棵由上而下嘅 DNS 樹：頂層係 root，跟住 top-level domains（.com、.org、.au、.co 等），再落去係各 domain 嘅 zone 同底下嘅 host 記錄；圖意為「逐層分工、唔屬自己 zone 就轉去其他 server」。

➜ 實作見 ITE3102_PT10_DNS_DHCP_CodeGuide.md（喺 DNS server 新增 A record，再以 `nslookup` 驗證解析）

### 3.19 The `nslookup` Command（slide 25）

繁中解說：`nslookup` 有三個用途：(1) 讓用戶**手動發出 DNS queries**；(2) 用嚟**排查 name resolution 問題**；(3) 佢**有好多 options**，可以做廣泛嘅測試同驗證 DNS 流程。呢個係本課唯一要背嘅 DNS 指令（另一個要背嘅係 `ipconfig /displaydns`，見 3.17）。

> **English Standard Definition:** "The `nslookup` command allows the user to manually place DNS queries. It can also be used to troubleshoot name resolution issues. It has many options available for extensive testing and verification of the DNS process."

➜ 實作見 ITE3102_PT10_DNS_DHCP_CodeGuide.md（`ipconfig /all`、`ping`、`nslookup` 三個驗證工具）

### 3.20 Dynamic Host Configuration Protocol（slide 26，對應 15.4.6）

繁中解說：**DHCP for IPv4** 會**自動化派發** IPv4 address、subnet mask、gateway 同其他參數。三個必考細節：

1. **DHCP-distributed addresses 係有租期嘅（leased for a set period of time）**——唔係永久擁有。
2. **使用對象**：DHCP **通常用喺 end user devices**；而 **static addressing 就用喺網絡設備**，例如 **gateways、switches、servers、printers**（因為呢啲設備要固定地址先俾人搵得到）。
3. **DHCPv6（DHCP for IPv6）**為 IPv6 client 提供類似服務。

> **English Standard Definition:** "The Dynamic Host Configuration Protocol (DHCP) for IPv4 automates the assignment of IPv4 addresses, subnet masks, gateways, and other parameters. DHCP-distributed addresses are leased for a set period of time. DHCP is usually employed for end user devices. Static addressing is used for network devices, such as gateways, switches, servers, and printers. DHCPv6 (DHCP for IPv6) provides similar services for IPv6 clients."

➜ 實作見 ITE3102_PT10_DNS_DHCP_CodeGuide.md（printer 用 static IP、laptop／tablet 用 DHCP）

### 3.21 DHCP Operation — DORA（slide 27，Tutorial Q7 直出）

繁中解說：自動派 IP 嘅**四個初始訊息，次序唔可以亂**，口訣 **DORA**：

| Step | DHCP Message | 做啲咩（教材原文） |
|---|---|---|
| 1 | **DHCP Discover** | Client **broadcasts** Discover 去**搵 server**（"to find the server"） |
| 2 | **DHCP Offer** | DHCP server 回覆一個 **Offer**（"suggested lease"，提議租約） |
| 3 | **DHCP Request** | Client 發 **Request**，指明佢想用邊個 offer（"in case of multiple offers"） |
| 4 | **DHCP Acknowledge** | Server 回 **Acknowledge**，確認 lease 已 **finalized**（確認租約） |

特別考點：如果原本嘅 offer **已經唔再有效**，server 會回 **DHCPNAK**（negative acknowledgement）而唔係 ACK。另外 **DHCPv6 有一組類似嘅訊息**：**SOLICIT、ADVERTISE、INFORMATION REQUEST、REPLY**（四個名要背）。

> **English Standard Definition:** "The client broadcasts a DHCP Discover to find the server. The DHCP server replies with a DHCP Offer (suggested lease). The client sends a DHCP Request to the server that the client wants to use (in case of multiple offers). The DHCP server returns a DHCP Acknowledge to confirm that the lease has been finalized (the server would respond with a DHCPNAK if the offer is no longer valid). DHCPv6 has a similar set of messages: SOLICIT, ADVERTISE, INFORMATION REQUEST, REPLY."

> **圖示描述**：教材原圖係 client 同 DHCP server 之間四支來回箭頭（Discover 廣播出去 → Offer 回覆 → Request → Acknowledge），並標出「broadcast」同「lease」兩個關鍵詞。

### 3.22 File Transfer Protocol（slide 28，對應 15.5.1）

繁中解說：FTP 有方向同雙連接兩個考點。

**方向**：client 可以**由 server 下載（pull）**資料，亦可以**上傳（push）**資料去 server。

**兩條連接（必背！）**：

1. Client **先起第一條連接**，用 **TCP port 21**，負責 **control traffic**（控制）。
2. Client 跟住**再起第二條連接**，用 **TCP port 20**，負責**實際嘅資料傳送（actual data transfer）**。

口訣：**21 控制（Control）、20 資料（Data）**。留意先後次序——控制連接先建立，資料連接後建立。

> **English Standard Definition:** "The client can download (pull) data from the server or upload (push) data to the server. The client initiates and establishes the first connection to the server for control traffic on TCP port 21. The client then establishes the second connection to the server for the actual data transfer on TCP port 20."

➜ 實作見 ITE3102_PT10_FTP_CodeGuide.md（設定 FTP 服務、建立用戶權限、用 `put`／`get` 上下載檔案）

### 3.23 Server Message Block（slide 29，對應 15.5.2）

繁中解說：**SMB（Server Message Block）係一個 client/server file sharing protocol**。三個必記點：

1. SMB 嘅 file-sharing 同 print services 已經成為 **Microsoft networking 嘅支柱（the mainstay of Microsoft networking）**；
2. Client 會同 server 建立**長期連接（long-term connection）**，並可以**好似存取本機資源一樣**存取 server 上嘅 resources；
3. **SMB messages 有三個功能**：
   - **Start, authenticate, and terminate sessions**（開始、認證、終止 session）；
   - **Control file and printer access**（控制檔案同印表機存取）；
   - **Allow an application to send or receive messages to or from another device**（允許應用程式同其他裝置互傳訊息）。

> **English Standard Definition:** "The Server Message Block (SMB) is a client/server file sharing protocol. SMB file-sharing and print services have become the mainstay of Microsoft networking. Clients establish a long-term connection to servers and can access the resources on the server as if the resource is local to the client host. Three functions of SMB messages: start, authenticate, and terminate sessions; control file and printer access; allow an application to send or receive messages to or from another device."

**File sharing services 對照（本課三個關鍵字）**：**FTP**（reliable、connection-oriented、port 21/20）、**TFTP**（connectionless、UDP 69）、**SMB**（Microsoft file & print sharing、long-term connection）。

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| **Application Layer** | OSI 最接近 end user 嘅一層，負責 source 同 destination 上嘅程式之間交換資料；TCP/IP 模型將其等同 OSI 5、6、7 層合併 | "The upper three layers of the OSI model (application, presentation, and session) define functions of the single TCP/IP application layer." |
| **Presentation Layer** | 表示層；負責 formatting、compressing、encrypting 資料 | "The presentation layer formats data at the source device into a compatible form for the receiving device, compresses data and encrypts data." |
| **Session Layer** | 會話層；建立並維持 source 與 destination 程式之間嘅 dialogs | "The session layer creates and maintains dialogs between source and destination applications, keeping them active and restarting disrupted or idle sessions." |
| **Client-Server Model** | 客戶端-伺服器模型；有專用 server 提供服務，protocol 定義 request／response 格式 | "Client and server processes are in the application layer, and application layer protocols describe the format of the requests and responses between clients and servers." |
| **Peer-to-Peer (P2P) Network** | 對等網絡；無專用伺服器，每部 peer 按每次請求輪流做 client／server | "No dedicated server is required. Each device (a peer) can function as both a server and a client on a per request basis." |
| **Peer-to-Peer (P2P) Application** | 對等應用程式；每部 end device 有 user interface 同 background service，雙方同時收發訊息 | "Each end device provides a user interface and runs a background service, and both clients simultaneously initiate and receive a message." |
| **BitTorrent** | 把好多檔案嘅碎片同時分享嘅 P2P 技術 | "Many P2P applications allow users to share pieces of many files with each other at the same time — this is BitTorrent technology." |
| **Gnutella** | 另一種 P2P 協定，用戶之間分享完整檔案 | "Some P2P applications are based on the Gnutella protocol, where each user shares whole files with other users." |
| **Direct Connect / eDonkey / Freenet** | 常見 P2P networks | "Common P2P networks include Direct Connect, BitTorrent, eDonkey and Freenet." |
| **URL (uniform resource locator)** | 網址；由 protocol or scheme、server name、specific file name 三部分組成 | "A URL such as http://www.cisco.com/index.html is interpreted by the browser as the protocol (http), the server name (www.cisco.com) and the specific file name requested (index.html)." |
| **HTTP (Hypertext Transfer Protocol)** | 傳送網頁嘅 request/response protocol，用 TCP port 80（另 8080） | "HTTP is a request/response protocol used for exchanging text, graphic images, sound, video and other multimedia files on the World Wide Web." |
| **GET** | HTTP 方法；client 請求資料 | "GET is a client request for data." |
| **POST** | HTTP 方法；上傳資料檔案去 web server | "POST uploads data files to the web server." |
| **PUT** | HTTP 方法；上傳資源或內容去 web server | "PUT uploads resources or content to the web server." |
| **HTTPS** | HTTP 加加密同認證；用 TCP, UDP 443 | "HTTP Secure (HTTPS) uses encryption and authentication to secure data." |
| **HTML** | 網頁標記語言；browser decipher 之後排版成畫面 | "The server sends the HTML code for the web page and the browser deciphers the HTML code and formats the page." |
| **SMTP (Simple Mail Transfer Protocol)** | 寄出電郵、server 對 server 轉送；TCP 25；message 分 header 同 body | "SMTP is used to send email; the message header must have a properly formatted recipient email address and a sender address." |
| **POP3 (Post Office Protocol v3)** | 收信；下載後喺 server 刪除原件；TCP 110 | "With POP email is downloaded from the server to the client and then deleted on the server." |
| **IMAP (Internet Message Access Protocol)** | 收信；原件保留喺 server，可多地點存取；TCP 143 | "With IMAP, copies of messages are downloaded to the client and the original messages are stored on the server." |
| **Email Client / Mail Server** | 電郵客戶端只同 mail server 通訊；mail server 之間互相轉送郵件 | "An email client does not communicate directly with another email client; both clients rely on the mail server to transport messages, and mail servers communicate with other mail servers to transport messages from one domain to another." |
| **DNS (Domain Name System / Service)** | 動態把 domain name 翻譯成正確 IP address；TCP/UDP 53 | "The DNS protocol allows for the dynamic translation of a domain name into the correct IP address." |
| **Resource Records** | DNS server 儲存嘅記錄類型，包括 A、AAAA、NS、MX、CNAME | "The DNS server stores different types of resource records used to resolve names." |
| **Question / Answer / Authority / Additional** | DNS message 嘅四個 section（加 Header） | "The DNS message sections are the Question (the question for the name server), Answer (resource records answering the question), Authority (resource records pointing toward an authority) and Additional (resource records holding additional information)." |
| **DNS Hierarchy** | DNS 分散式結構；每個 server 只管一小部分 mapping，其餘 forward 去其他 server | "Each DNS server is only responsible for managing name-to-IP mappings for that small portion of the DNS structure, and requests for zones not stored in a specific DNS server are forwarded to other servers for translation." |
| **Top-Level Domain (TLD)** | 頂級域名；代表組織類型或來源國家（.com、.org、.au、.co） | "The different top-level domains represent either the type of organization or the country of origin." |
| **`nslookup`** | 手動發出 DNS query 同排查 name resolution 問題嘅指令 | "`nslookup` allows the user to manually place DNS queries and can be used to troubleshoot name resolution issues." |
| **`ipconfig /displaydns`** | 顯示 Windows PC 上所有 cached DNS entries | "The `ipconfig /displaydns` command displays all of the cached DNS entries on a Windows PC." |
| **DHCP (Dynamic Host Configuration Protocol)** | 自動派 IP、subnet mask、default gateway、DNS server；UDP server 67／client 68；地址有租期 | "DHCP automates the assignment of IPv4 addresses, subnet masks, gateways and other parameters, and DHCP-distributed addresses are leased for a set period of time." |
| **DHCP Discover / Offer / Request / Acknowledge (DORA)** | DHCP 四步初始訊息 | "The client broadcasts a DHCP Discover to find the server, the server replies with a DHCP Offer (suggested lease), the client sends a DHCP Request for the offer it wants, and the server returns a DHCP Acknowledge to confirm that the lease has been finalized." |
| **DHCPNAK / Lease** | 租約失效時嘅負面回覆／IP 租用期 | "The server would respond with a DHCPNAK if the offer is no longer valid; DHCP-distributed addresses are leased for a set period of time." |
| **DHCPv6 messages** | IPv6 版本嘅四步訊息 | "DHCPv6 has a similar set of messages: SOLICIT, ADVERTISE, INFORMATION REQUEST and REPLY." |
| **Static Addressing** | 人手設定、固定不變；用於 gateways、switches、servers、printers | "Static addressing is used for network devices, such as gateways, switches, servers and printers." |
| **FTP (File Transfer Protocol)** | reliable、connection-oriented、有 acknowledgement 嘅檔案傳送協定；port 21 控制、port 20 資料 | "FTP is a reliable, connection-oriented and acknowledged file delivery protocol that uses TCP port 21 for control traffic and TCP port 20 for the actual data transfer." |
| **Pull / Push** | 由 server 下載／上傳去 server | "The client can download (pull) data from the server or upload (push) data to the server." |
| **TFTP (Trivial File Transfer Protocol)** | 簡單、connectionless 檔案傳送協定；UDP 69 | "TFTP is a simple and connectionless file transfer protocol that uses UDP 69." |
| **SMB (Server Message Block)** | Microsoft networking 嘅 client/server 檔案同打印分享協定 | "SMB is a client/server file sharing protocol whose file-sharing and print services have become the mainstay of Microsoft networking." |
| **Long-Term Connection** | SMB client 與 server 之間嘅持續連接，資源如本機一樣 | "Clients establish a long-term connection to servers and can access the resources on the server as if the resource is local to the client host." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**第 1 步：先理解觀念（Understand）**

1. 記死 layer mapping：**TCP/IP application layer = OSI 5（Session）＋6（Presentation）＋7（Application）**。
2. 三層分工口訣：**Application＝程式之間交換資料**；**Presentation＝format / compress / encrypt**；**Session＝建立同維持 dialogs、restart session**。
3. 架構三兄弟分清：**Client-Server**（有專用 server、定義 request／response 格式）／**P2P Network**（無專用 server、per request 決定角色）／**P2P Application**（user interface ＋ background service）。
4. 流程式觀念：URL 三部分 → name server 解析 → HTTP GET → server 回 HTML → browser 排版。

**第 2 步：背誦英文短語（Memorise）**

1. Port 表：**DNS 53（TCP/UDP）、DHCP 67/68（UDP）、SMTP 25、POP3 110、IMAP 143、FTP 21+20、TFTP 69、HTTP 80/8080、HTTPS 443**——全部背到反射式。
2. **DORA**：Discover（find the server）→ Offer（suggest a lease）→ Request（identify the lease）→ Acknowledge（confirm the lease）。
3. **電郵口訣**：SMTP sends（推）／POP pulls & purges（拉＋刪）／IMAP keeps on the server（留原件）。
4. **FTP 口訣**：21 Control、20 Data，控制連接先建立、資料連接後建立。
5. **DNS 四 section**：Question／Answer／Authority／Additional（另 Header）。

**第 3 步：掌握比較同操作（Apply）**

1. 四方互轉練到熟：**功能 ↔ 協定 ↔ port ↔ transport protocol**（用 §3.6 對比表同 §6 Cheat Sheet 互相蓋住嚟默）。
2. 三個對比組要講得出分別：**HTTP vs HTTPS**（明文 vs encryption + authentication）、**FTP vs TFTP**（connection-oriented TCP vs connectionless UDP）、**POP vs IMAP**（deleted vs kept）。
3. 指令練一次：`ipconfig /displaydns`（睇 cache）、`nslookup`（手動查詢／排查）。
4. DNS 情境判斷三步：**DNS 設定有冇指去真正跑 DNS 服務嘅 server？** → **有冇該 domain 嘅 resource record？** → **record 嘅 IP 有冇 typo？**

**第 4 步：能解答英文考題（Exam-ready）**

- "Which 3 layers of the OSI model define functions of the TCP/IP application layer?" → "The Session layer, the Presentation layer and the Application layer (OSI layers 5, 6 and 7)."
- "Identify protocols that use TCP ports 21, 25, 53, 80 and 443." → "21 FTP, 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS."
- "Which protocol retrieves email with the original kept?" → "IMAP (original kept on the server); POP deletes the original."
- "The advantage of HTTPS over HTTP is that HTTPS uses ____ and ____ to secure data." → 依本 Lecture slide 16 原文填 **"encryption" 同 "authentication"**（`ITE3102_T10_Application_StudyGuide.md` 另列 SSL/TLS 為可接受答法）。
- "What are the 4 initial DHCP messages?" → "Discover, Offer, Request and Acknowledge (DORA)."
- "In FTP, what are the two connections?" → "TCP port 21 for control traffic and TCP port 20 for the actual data transfer."
- "List three functions of SMB messages." → "Start, authenticate and terminate sessions; control file and printer access; allow an application to send or receive messages to or from another device."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**① Layer mapping（考第一題嘅答案）**
- **TCP/IP Application Layer = OSI Application (7) + Presentation (6) + Session (5)**
- Application：closest to the end user，程式之間交換資料
- Presentation：**Format / Compress / Encrypt**
- Session：**Create & maintain dialogs、restart disrupted or idle sessions**
- 兼容性鐵律：protocol 要喺 **source 同 destination 兩邊都實作**且 compatible

**② Port 速記表（必背，數字唔可以錯）**

| 協定 | Port | Transport | 一句記 |
| --- | --- | --- | --- |
| **DNS** | 53 | TCP/UDP | domain name → IP address |
| **DHCP** | 67（server）／68（client） | UDP | 自動派 IP、mask、gateway、DNS（有 lease） |
| **SMTP** | 25 | TCP | 寄／forward email |
| **POP3** | 110 | TCP | 收信，**原件刪除** |
| **IMAP** | 143 | TCP | 收信，**原件保留** |
| **FTP** | 21（control）／20（data） | TCP | reliable、connection-oriented |
| **TFTP** | 69 | UDP | connectionless file transfer |
| **HTTP** | 80（另 8080） | TCP | request/response |
| **HTTPS** | 443 | TCP, UDP | encryption + authentication |
| **SMB** | 教材未列 | — | Microsoft file & print sharing |

**③ HTTP vs HTTPS**
- HTTP：**request/response protocol**，3 個 message types = **GET（request data）／POST（upload data files）／PUT（upload resources or content）**
- HTTPS：**uses encryption and authentication to secure data**，並 authenticates the website

**④ URL 三部分 + 網頁五步（排序題）**
- URL 三部分：**scheme（http）／server name（www.cisco.com）／specific file name（index.html）**
- 五步：interpret URL → name server 轉 numeric address → **HTTP GET** → server 回 **HTML code** → browser decipher + format

**⑤ Email 三協定**
- **SMTP 寄**（TCP 25；message header 要有 properly formatted recipient + sender address；body 文字不限）
- **POP 收、原件刪**（TCP 110）；**IMAP 收、原件留**（TCP 143）
- 架構鐵律：**email client 唔會直接同另一個 email client 通訊**；mail servers 之間互相 transport messages from one domain to another

**⑥ DHCP：DORA 四步**
- **D**iscover（broadcast，find the server）→ **O**ffer（suggested lease）→ **R**equest（client 指明想要邊個 offer）→ **A**cknowledge（lease finalized）
- 失效時：**DHCPNAK**；DHCPv6 版：**SOLICIT、ADVERTISE、INFORMATION REQUEST、REPLY**
- DHCP 用喺 **end user devices**；**gateways、switches、servers、printers 用 static addressing**

**⑦ DNS 四件事**
- 作用：**dynamic translation of a domain name into the correct IP address**
- Message sections：**Header、Question、Answer、Authority、Additional**
- 流程：先查自己 records → 解唔到就問其他 servers → **暫時 cache** 個 IP（用 `ipconfig /displaydns` 睇 cache）
- Hierarchy：每個 server 只管一小部分 name-to-IP mappings，其他 zone **forward** 去別的 server；TLD = 組織類型或國家（**.com** business、**.org** non-profit、**.au** Australia、**.co** Colombia）
- 指令：**`nslookup`** = 手動 DNS query + troubleshooting
- Record types：**A（IPv4）、AAAA（IPv6）、NS（authoritative server）、MX（mail server）、CNAME（alias）**

**⑧ FTP 同 SMB**
- FTP：**first connection = TCP 21 control traffic；second connection = TCP 20 actual data transfer**；可 pull（download）／push（upload）
- SMB：**client/server file sharing protocol**，Microsoft networking 嘅 mainstay，**long-term connection**，資源如本機一樣；三個功能 = **start/authenticate/terminate sessions、control file and printer access、send or receive messages to or from another device**

**⑨ 架構分類判斷表（Tutorial Q12／Q13）**

| 特徵 | Client-Server | P2P Network | P2P Application |
| --- | --- | --- | --- |
| 專用伺服器 | ✅ 有 | ❌ 無 | ❌ 無 |
| 角色設定 | 固定 | **per request basis** | 軟件決定 |
| User interface | — | — | ✅ 需要 |
| Background service | — | — | ✅ 需要 |
| 例子 | DNS 查詢、ISP email service | 用同事部 PC 掛住嘅 printer | BitTorrent、Direct Connect、eDonkey、Freenet、Gnutella 類應用 |

**⑩ 60 秒自測清單（唔准偷睇）**
1. TCP/IP application layer 等於 OSI 邊三層？（5／6／7：Session、Presentation、Application）
2. Presentation layer 三項工作？（format、compress、encrypt）
3. 見 "original kept" 揀邊個協定？見 "connectionless" 揀邊個？（IMAP；TFTP）
4. DHCP 四步同 DHCPv6 四個訊息名？（DORA；SOLICIT／ADVERTISE／INFORMATION REQUEST／REPLY）
5. FTP 兩條連接分別係邊個 port？（21 control、20 data）
6. URL 三部分？（scheme、server name、file name）
7. SMB 三個功能？（sessions、file/printer access、send/receive messages）
