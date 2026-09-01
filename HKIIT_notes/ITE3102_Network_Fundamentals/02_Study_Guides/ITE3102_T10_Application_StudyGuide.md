# ITE3102 Network Fundamentals — Tutorial 10: Application Layer 應用層 雙語練習題解 Guide

> 本 Guide 對應 Tutorial 10: Applications，逐題提供「題目原文 → 答案 → 答題邏輯 → 英文答題句」，學生只靠本文件即可完成練習並掌握考試答題能力。

---

## 1. 📝 練習概要 (Summary)

本練習（Tutorial 10: Applications）集中考核 TCP/IP 模型中最上層的 **Application Layer（應用層）**。內容首先要求掌握 OSI 模型的 Layer 5–7（Session、Presentation、Application）如何合併對應到 TCP/IP 的應用層，然後逐一考核應用層的核心協定：**HTTP / HTTPS**（網頁傳送）、**FTP / TFTP**（檔案傳送）、**SMTP / POP3 / IMAP4**（電郵收發）、**DNS**（域名解析）、**DHCP**（動態 IP 分配）與 **SMB**（Microsoft 網絡檔案分享），並要求背熟各協定的標準 **TCP/UDP Port** 編號。

考核重點分為四大類：第一是「配對與分類」——把協定功能、OSI 層次、Client-Server / Peer-to-Peer 模型正確配對；第二是「流程排序」——例如 DHCP 的 DORA 四步訊息（Discover → Offer → Request → Acknowledge）與 FTP 的雙連接（Port 21 控制、Port 20 資料）；第三是「情境判斷」——例如 DNS 設定錯誤或 Resource Record 有 Typo 時能否成功上網；第四是「數字記憶」——常用 Port Number、HTTP 方法與電郵協定的儲存特性。整體而言，本練習屬於「背誦為主、判斷為輔」的基礎題型，是測驗中必取分的部分。

---

## 2. 🎯 練習目標 (Objectives)

完成本練習後，你應該有能力：

| # | 能力（繁體中文） | 英文對照 (English) |
|---|---|---|
| 1 | 說出 TCP/IP 應用層涵蓋 OSI 哪三層，並解釋其關係 | Explain that the TCP/IP application layer maps to OSI layers 5, 6 and 7 |
| 2 | 把常見應用層協定（HTTP、HTTPS、FTP、TFTP、SMTP、POP3、IMAP4、DNS、DHCP、SMB）與其功能正確配對 | Match application-layer protocols to their functions |
| 3 | 背誦並應用常用 TCP Port 編號（21、25、53、80、443） | Identify the well-known TCP ports used by common protocols |
| 4 | 分辨 SMTP / POP3 / IMAP4 在電郵傳送流程中的角色與儲存特性 | Distinguish the roles of SMTP, POP3 and IMAP4 in e-mail delivery |
| 5 | 說出 HTTPS 相對 HTTP 的優勢及其加密機制 | State how HTTPS secures data compared with HTTP |
| 6 | 分辨 HTTP 的 GET / POST / PUT 請求方法 | Match HTTP message types (GET, POST, PUT) to their purposes |
| 7 | 正確排序 DHCP 的四個初始化訊息（DORA） | Order the four DHCP messages: Discover, Offer, Request, Acknowledge |
| 8 | 說明 FTP 兩條連接（Port 21 控制、Port 20 資料）的用途 | Describe FTP's control and data connections |
| 9 | 根據協定功能填寫協定名稱、Port 與 Transport Protocol | Complete a protocol table with name, port and transport protocol |
| 10 | 分析 DNS 設定錯誤或記錄錯誤時能否成功瀏覽網頁 | Analyse DNS resolution success/failure given incorrect settings |
| 11 | 把協定與標準（如 GIF、JPEG、MPEG）分類到正確 OSI 層 | Classify protocols and standards to OSI layers 5, 6 and 7 |
| 12 | 分辨 Client-Server 模型、Peer-to-Peer Network 與 Peer-to-Peer Application | Distinguish client-server, peer-to-peer network and peer-to-peer application |

---

## 3. ✏️ 題目與答案 Walkthrough

### Q1 — TCP/IP 應用層對應 OSI 哪三層？

**題目原文 (Question):**
> Which 3 layers of the OSI model define functions of the TCP/IP application layer?
> __________________, __________________, __________________.

**✅ 答案 (Answer):**
**Session Layer (Layer 5)、Presentation Layer (Layer 6)、Application Layer (Layer 7)**

**答題邏輯 (繁中解說):**
TCP/IP 模型只有四層，而 OSI 有七層，兩者不是一一對應。TCP/IP 把 OSI 最頂三層——**Session（會話層）**、**Presentation（表示層）**、**Application（應用層）**——全部合併成一個「Application Layer」。記法：OSI 越高層越接近用戶，TCP/IP 應用層就是「用戶直接接觸」的那一層，所以把 OSI 的 5、6、7 層都收進去。

> The TCP/IP application layer combines the functions of the top three OSI layers: the Session layer, the Presentation layer and the Application layer (OSI layers 5, 6 and 7).

**💬 考試英文答題句 (Exam Answer Phrase):**
> The TCP/IP application layer is equivalent to OSI layers 5, 6 and 7 — Session, Presentation and Application.

---

### Q2 — 協定功能配對 (Protocol Matching)

**題目原文 (Question):**
> Match the function on the right to the correct protocol on the left.
> - Delivery of web pages
> - Performs connection-oriented file transfer
> - Forwards emails
> - Translate domain name into IP address
> - File sharing in Microsoft networks
> - Retrieves emails with original kept
> - Performs connectionless file transfer
> - Retrieves emails with original deleted
> - Secure delivery of web pages
> - Dynamically assigns an IP address, subnet mask, default gateway and DNS server to client stations at start-up

**✅ 答案 (Answer):**

| 功能 (Function) | 協定 (Protocol) |
|---|---|
| Delivery of web pages | **HTTP** |
| Performs connection-oriented file transfer | **FTP** |
| Forwards emails | **SMTP** |
| Translate domain name into IP address | **DNS** |
| File sharing in Microsoft networks | **SMB** |
| Retrieves emails with original kept | **IMAP (IMAP4)** |
| Performs connectionless file transfer | **TFTP** |
| Retrieves emails with original deleted | **POP (POP3)** |
| Secure delivery of web pages | **HTTPS** |
| Dynamically assigns IP address, subnet mask, default gateway and DNS server at start-up | **DHCP** |

**答題邏輯 (繁中解說):**
這題考的是「功能關鍵詞 → 協定」的直覺對應，全題有四個對比組要特別小心：

1. **HTTP vs HTTPS**：HTTPS 多一個「Secure（安全）」字眼，所以「Secure delivery of web pages」必定是 HTTPS。
2. **FTP vs TFTP**：「connection-oriented（面向連接，要交握、可靠）」是 FTP；「connectionless（無連接，不需交握）」是 TFTP。FTP 用 TCP，TFTP 用 UDP。
3. **POP vs IMAP**：「original kept（保留原件）」＝ IMAP（郵件留在伺服器）；「original deleted（刪除原件）」＝ POP（下載後從伺服器刪除）。
4. **SMTP vs POP/IMAP**：SMTP 是「Forwards（轉送/寄出）」電郵；POP/IMAP 是「Retrieves（收取）」電郵。

其餘為單一對應：網頁傳送＝HTTP、域名轉 IP＝DNS、Microsoft 網絡檔案分享＝SMB、開機動態派 IP 等設定＝DHCP。

> HTTP delivers web pages; FTP performs connection-oriented file transfer while TFTP performs connectionless file transfer; SMTP forwards e-mail, POP3 deletes the retrieved message from the server and IMAP4 keeps the original; DNS translates domain names into IP addresses; SMB provides file sharing in Microsoft networks; DHCP dynamically assigns IP configuration at start-up.

**💬 考試英文答題句 (Exam Answer Phrase):**
> HTTP is used for web page delivery, HTTPS for secure web page delivery, FTP/TFTP for file transfer, SMTP for sending e-mail, POP3/IMAP4 for retrieving e-mail, DNS for name resolution, SMB for Microsoft file sharing, and DHCP for automatic IP assignment.

---

### Q3 — 常用 TCP Port 編號

**題目原文 (Question):**
> Identify protocols that use the following TCP ports:
> 21 ________, 25 ________, 53 ________, 80 ________, 443 ________.

**✅ 答案 (Answer):**
| Port | Protocol |
|---|---|
| 21 | **FTP** |
| 25 | **SMTP** |
| 53 | **DNS** |
| 80 | **HTTP** |
| 443 | **HTTPS** |

**答題邏輯 (繁中解說):**
這五個 Port 是必背的「Well-known Ports」。記憶小技巧：**21=FTP**（檔案）、**25=SMTP**（寄信）、**53=DNS**（域名）、**80=HTTP**（網頁）、**443=HTTPS**（安全網頁）。注意題目寫明「TCP ports」；DNS 預設其實常用 **UDP 53**，但當需要區域傳輸（Zone Transfer）或回應太大時也會用 **TCP 53**，所以 DNS 是「both TCP and UDP」。

> FTP uses TCP port 21, SMTP uses TCP port 25, DNS uses port 53 (both TCP and UDP), HTTP uses TCP port 80, and HTTPS uses TCP port 443.

**💬 考試英文答題句 (Exam Answer Phrase):**
> Port 21 is used by FTP, port 25 by SMTP, port 53 by DNS, port 80 by HTTP, and port 443 by HTTPS.

---

### Q4 — 電郵傳送流程：SMTP / POP / IMAP

**題目原文 (Question):**
> Consider the E-mail delivery process that uses SMTP, POP, IMAP. Identify the protocol that is used for the following functions:
> - Receives e-mails from clients: __________
> - Forwards e-mails to remote mail servers: __________
> - Retrieves email from a mail server that has a storage limitation: __________
> - Enables download of emails from different locations: __________

**✅ 答案 (Answer):**
| 功能 (Function) | 協定 (Protocol) |
|---|---|
| Receives e-mails from clients（從客戶端收取電郵） | **POP (POP3) 或 IMAP (IMAP4)** |
| Forwards e-mails to remote mail servers（轉寄電郵至遠端郵件伺服器） | **SMTP** |
| Retrieves email from a mail server that has a storage limitation（伺服器儲存空間有限） | **POP (POP3)** |
| Enables download of emails from different locations（可從不同地點下載電郵） | **IMAP (IMAP4)** |

**答題邏輯 (繁中解說):**
電郵流程用「推拉」概念記：**SMTP 只負責「推」**——把郵件由客戶端推去郵件伺服器，再由一個郵件伺服器推去另一個（Forwards to remote mail servers）；**POP / IMAP 負責「拉」**——客戶端從郵件伺服器收取郵件（Receives e-mails from clients），所以第一行填 POP 或 IMAP 都可以。

關鍵分別在後兩行：
- **伺服器儲存有限 → POP3**：POP3 下載郵件後通常會從伺服器刪除原件（original deleted），釋放伺服器儲存空間。
- **不同地點下載 → IMAP4**：IMAP4 把郵件保留在伺服器（original kept），用戶在不同裝置/地點登入都能看到同一批郵件。

> SMTP is used to send and forward e-mail between mail servers; POP3 and IMAP4 are used by clients to retrieve e-mail. POP3 removes the message from the server after download, which suits a server with limited storage, while IMAP4 keeps messages on the server so they can be accessed from different locations.

**💬 考試英文答題句 (Exam Answer Phrase):**
> SMTP forwards e-mail to remote mail servers, while POP3 and IMAP4 receive e-mail from clients; POP3 deletes the original from the server and IMAP4 keeps it for access from multiple locations.

---

### Q5 — HTTPS 相對 HTTP 的優勢

**題目原文 (Question):**
> The advantage of HTTPS over HTTP is that HTTPS uses ________________ and ________________ to secure data.

**✅ 答案 (Answer):**
**HTTPS uses SSL (Secure Sockets Layer) / TLS (Transport Layer Security) 與 加密 (encryption) 來保護資料。**
（另一可接受配對：**authentication and encryption**——認證與加密。）

**答題邏輯 (繁中解說):**
HTTP 傳送的內容是**明文（plaintext）**，任何人都可以竊聽。HTTPS = HTTP + **SSL/TLS** 加密通道，提供三種保護：**機密性（confidentiality，加密防止竊聽）**、**完整性（integrity，防止篡改）**、**認證（authentication，確認伺服器身份）**。本題兩個空格的標準答案就是「SSL/TLS」＋「encryption」；若題目格式不同，寫「authentication and encryption」亦可接受。

> HTTPS uses SSL/TLS to encrypt and authenticate the data, providing confidentiality, integrity and authentication that plain HTTP does not offer.

**💬 考試英文答題句 (Exam Answer Phrase):**
> The advantage of HTTPS over HTTP is that HTTPS uses SSL/TLS and encryption to secure data in transit.

---

### Q6 — HTTP 訊息類型配對 (GET / POST / PUT)

**題目原文 (Question):**
> Match the HTTP message type on the left to its correct description on the right.
> - A client request for data
> - Uploads data files to the web server
> - Uploads resources or content to the web server

**✅ 答案 (Answer):**
| 描述 (Description) | HTTP 訊息類型 (Message Type) |
|---|---|
| A client request for data（客戶端請求資料） | **GET** |
| Uploads data files to the web server（上傳資料檔案） | **POST** |
| Uploads resources or content to the web server（上傳資源/內容） | **PUT** |

**答題邏輯 (繁中解說):**
HTTP 方法（Methods）按「動作」分：**GET＝「取」**，純粹向伺服器請求資料；**POST＝「送」**，把表單或資料檔案提交給伺服器處理；**PUT＝「放」**，把資源或內容直接上載到伺服器的指定位置（URI）。口訣：**GET 拿資料、POST 交資料、PUT 放內容**。

> GET requests data from a web server, POST submits data files to the server for processing, and PUT uploads resources or content to the server.

**💬 考試英文答題句 (Exam Answer Phrase):**
> GET is a client request for data, POST uploads data files to the web server, and PUT uploads resources or content to the web server.

---

### Q7 — DHCP 四個初始化訊息（DORA）

**題目原文 (Question):**
> The middle column of the table below shows the 4 initial DHCP messages that will be exchanged for automatic IP allocation. Match the step number on the left and the message content on the right to the correct DHCP message.
> - Step 1 / Step 2 / Step 3 / Step 4
> - DHCP Offer / DHCP Request / DHCP Discover / DHCP Acknowledge
> - Identify the lease / Find the server / Suggest a lease / Confirm the lease

**✅ 答案 (Answer):**
| Step | DHCP Message | 訊息內容 (Message Content) |
|---|---|---|
| Step 1 | **DHCP Discover** | Find the server（尋找伺服器） |
| Step 2 | **DHCP Offer** | Suggest a lease（提議一個租約） |
| Step 3 | **DHCP Request** | Identify the lease（確認/指明租約） |
| Step 4 | **DHCP Acknowledge** | Confirm the lease（確認租約） |

**答題邏輯 (繁中解說):**
這題用口訣 **DORA** 記：**D**iscover → **O**ffer → **R**equest → **A**cknowledge。
1. 客戶端開機廣播 **Discover**：目的係「揾伺服器」（Find the server）；
2. DHCP 伺服器回覆 **Offer**：提出可用的 IP，即「提議租約」（Suggest a lease）；
3. 客戶端回應 **Request**：指明接受邊個 offer，即「指明租約」（Identify the lease）；
4. 伺服器發出 **Acknowledge**：正式「確認租約」（Confirm the lease），客戶端即可使用該 IP。

只要記住 DORA 順序，再把「動作」配上去即可——注意 **Request 不是「請求」伺服器，而是「指明」接受哪個租約**。

> The DHCP automatic IP allocation process exchanges four messages in order: DHCP Discover (find the server), DHCP Offer (suggest a lease), DHCP Request (identify the lease) and DHCP Acknowledge (confirm the lease).

**💬 考試英文答題句 (Exam Answer Phrase):**
> The four DHCP messages are Discover, Offer, Request and Acknowledge — DORA: Discover finds the server, Offer suggests a lease, Request identifies the lease, and Acknowledge confirms it.

---

### Q8 — FTP 的兩條連接

**題目原文 (Question):**
> In FTP, the client establishes 2 connections to the server.
> The first connection on TCP port 21 is for _____________________________________
> The second connection on TCP port 20 is for ___________________________________

**✅ 答案 (Answer):**
- TCP Port 21（第一條連接）→ **控制連接（Control Connection）**：用於傳送指令與回應（如登入、切換目錄、列出檔案）。
- TCP Port 20（第二條連接）→ **資料連接（Data Connection）**：用於實際傳送檔案內容。

**答題邏輯 (繁中解說):**
FTP 獨特之處係用**兩條連接**：**Port 21 控制連接**負責「講嘢」（下指令：login、cd、ls…），**Port 20 資料連接**負責「搬貨」（實際傳檔案）。記法：**21＝控制（Control）、20＝資料（Data）**；控制連接長期保持，資料連接按需要才建立。

> FTP uses TCP port 21 for the control connection, which carries commands and replies, and TCP port 20 for the data connection, which carries the actual file data.

**💬 考試英文答題句 (Exam Answer Phrase):**
> In FTP, port 21 is the control connection for commands and port 20 is the data connection for transferring file contents.

---

### Q9 — 協定表格填空（D1–D6：功能／名稱／Port／傳輸層協定）

**題目原文 (Question):**
> Write down the Protocol Function / Protocol Name / Port Number / Transport Protocol (TCP/UDP/both) labelled D1 to D6 below.
> （註：原圖表未能完整擷取，僅餘其中一列「Connectionless active file transfer」。）

**✅ 答案 (Answer)（標準參考表，對應原圖六列）：**
| 標籤 | Protocol Function（功能） | Protocol Name | Port Number | Transport Protocol (TCP/UDP/both) |
|---|---|---|---|---|
| D1 | Connectionless active file transfer（無連接式主動檔案傳送） | **TFTP** | **69** | **UDP** |
| D2 | Delivery of web pages（傳送網頁） | **HTTP** | **80** | **TCP** |
| D3 | Secure delivery of web pages（安全傳送網頁） | **HTTPS** | **443** | **TCP** |
| D4 | Forwards e-mails（轉寄電郵） | **SMTP** | **25** | **TCP** |
| D5 | Retrieves e-mails（收取電郵） | **POP3 / IMAP4** | **110 / 143** | **TCP** |
| D6 | Translates domain name into IP address（域名解析） | **DNS** | **53** | **Both（TCP 及 UDP）** |

**答題邏輯 (繁中解說):**
原題的圖表在教材擷取時遺失，但考核邏輯一致：見到「Connectionless（無連接）」＋「file transfer」＝ **TFTP**，而 TFTP 用 **UDP 69**，因為無連接協定不需要交握、速度快但不可靠；其餘面向連接的協定（HTTP、HTTPS、SMTP、POP3、IMAP4）全部用 **TCP**。唯一例外係 **DNS**：預設以 **UDP 53** 查詢，但區域傳輸或大回應時用 **TCP 53**，所以 Transport Protocol 一欄填 **Both**。溫馨提示：作答時以你手上原圖的六列功能為準，把上表對應填入即可。

> TFTP is a connectionless file transfer protocol that uses UDP port 69; connection-oriented protocols such as HTTP, HTTPS, SMTP, POP3 and IMAP4 use TCP; DNS uses both TCP and UDP port 53.

**💬 考試英文答題句 (Exam Answer Phrase):**
> TFTP uses UDP port 69 for connectionless file transfer; HTTP, HTTPS, SMTP, POP3 and IMAP4 use TCP; DNS uses port 53 with both TCP and UDP.

---

### Q10 — DNS 情境判斷：PC1 / PC2 能否瀏覽網頁？

**題目原文 (Question):**
> Refer to the figure below.
> - The DNS setting of PC1 is 200.123.1.3
> - The DNS setting of PC2 is 200.123.1.4 (should be set as 200.123.1.3)
> - The DNS service is only enabled on the DNS server (IP address 200.123.1.3) with the following information (with typo in bold):
>   - Resource record | Domain name | IP address
>   - apple.hk | 200.123.11.5 (should be 200.123.1.5)
>   - orange.hk | 200.123.1.4
> - Can PC1 and PC2 browse the web page when the following URLs are used? banana.hk

**✅ 答案 (Answer):**
- **PC1（DNS = 200.123.1.3，正確設定）**：
  - **banana.hk → 不可以瀏覽**：DNS 伺服器上**沒有 banana.hk 的 Resource Record**，解析失敗（Name Not Found），無法取得 IP 就無法建立連線。
  - （補充）apple.hk → **不可以**：雖然有記錄，但 IP 有 Typo（200.123.11.5 應為 200.123.1.5），解析到錯誤 IP，連線去錯主機，無法瀏覽。
  - （補充）orange.hk → **可以**：記錄正確（200.123.1.4），解析成功即可瀏覽。
- **PC2（DNS = 200.123.1.4，錯誤設定）**：**所有 URL（包括 banana.hk）都不可以瀏覽**。因為 DNS 服務只開啟在 200.123.1.3，PC2 把查詢送去 200.123.1.4 根本沒有 DNS 服務回應，任何域名都無法解析。

**答題邏輯 (繁中解說):**
DNS 情境題有三個判斷重點：
1. **DNS 設定要指去「實際運行 DNS 服務」的伺服器**——PC2 指錯去 200.123.1.4，等於查無此人，全部失敗；
2. **Resource Record 必須存在**——banana.hk 沒有記錄，伺服器回應「找不到」，解析失敗；
3. **記錄的 IP 必須正確**——apple.hk 的 IP 有 Typo，就算解析成功也是去錯誤主機，仍然無法瀏覽。

> A host can browse a web page only when its DNS server setting points to a working DNS server that holds a correct resource record for the requested domain name.

**💬 考試英文答題句 (Exam Answer Phrase):**
> PC1 cannot browse banana.hk because the DNS server has no resource record for it; PC2 cannot browse any web page because its DNS setting points to 200.123.1.4, where no DNS service is running.

---

### Q11 — 協定與標準分類到 OSI 層

**題目原文 (Question):**
> Identify the following protocols and standards to the correct OSI layers: DHCP, DNS, GIF, HTTP, IMAP, JPEG, MPEG, POP, TFTP.
> - OSI layer 7 application:
> - OSI layer 6 presentation:
> - OSI layer 5 session:

**✅ 答案 (Answer):**
| OSI 層 | 協定／標準 |
|---|---|
| Layer 7 Application（應用層） | **DHCP, DNS, HTTP, IMAP, POP, TFTP** |
| Layer 6 Presentation（表示層） | **GIF, JPEG, MPEG** |
| Layer 5 Session（會話層） | **無（None of the above）** |

**答題邏輯 (繁中解說):**
這題考「協定 vs 標準格式」的分別：**Layer 7 收的是「協定」**——DHCP、DNS、HTTP、IMAP、POP、TFTP 都是定義「應用程式如何溝通」的協定；**Layer 6 收的是「資料格式標準」**——GIF、JPEG、MPEG 是圖片/影片編碼格式，負責「資料點樣表示」，屬 Presentation Layer 的職責。題目提供的協定中**沒有屬於 Session Layer（會話層）**的項目，所以第三行填「無／None」。

> HTTP, DNS, DHCP, POP, IMAP and TFTP are application-layer protocols; GIF, JPEG and MPEG are presentation-layer data format standards; none of the listed items belongs to the session layer.

**💬 考試英文答題句 (Exam Answer Phrase):**
> DHCP, DNS, HTTP, IMAP, POP and TFTP belong to the application layer; GIF, JPEG and MPEG belong to the presentation layer; none of them belongs to the session layer.

---

### Q12 — Client-Server / Peer-to-Peer Network / Peer-to-Peer Application 分類

**題目原文 (Question):**
> Identify each network communication below as an example of client-server model, peer-to-peer network, or peer-to-peer application:
> 1. A workstation initiates a DNS request when the user types www.cisco.com in the address bar of a web browser: _____________________________
> 2. A user prints a document by using a printer that is attached to a workstation of a coworker: _____________________________
> 3. A user uses WhatsApp to download a file that is shared by a friend after the file location is determined: _____________________________

**✅ 答案 (Answer):**
1. **Client-Server Model（客戶端-伺服器模型）**
2. **Peer-to-Peer Network（對等網絡）**
3. **Peer-to-Peer Application（對等應用程式）**

**答題邏輯 (繁中解說):**
判斷口訣：**「有專用伺服器」＝ Client-Server；「無專用伺服器、電腦之間直接分享資源」＝ P2P Network；「用特定應用軟件（App）直接互傳檔案」＝ P2P Application。**
1. DNS 請求由**專用 DNS 伺服器**提供服務，瀏覽器是客戶端 → **Client-Server Model**；
2. 印表機掛喺同事部工作站，用戶直接透過網絡使用，**沒有專用列印伺服器**，兩部電腦地位平等 → **Peer-to-Peer Network**；
3. WhatsApp 先由**目錄/定位服務**確定檔案位置，之後**用戶之間直接傳輸檔案**，屬典型 **Peer-to-Peer Application**（如 BitTorrent 同類）。

> In the client-server model a dedicated server provides the service; in a peer-to-peer network there is no dedicated server and resources are shared directly between peer devices; a peer-to-peer application is specific software that transfers files directly between users after the file location is determined.

**💬 考試英文答題句 (Exam Answer Phrase):**
> The DNS request is an example of the client-server model, sharing a coworker's printer is a peer-to-peer network, and WhatsApp file sharing after the location is determined is a peer-to-peer application.

---

### Q13 — Peer-to-Peer Network vs Peer-to-Peer Application 特性分類

**題目原文 (Question):**
> Identify each description below as for peer-to-peer network or for peer-to-peer application:
> - no dedicated server is required;
> - a background service is required;
> - requires a specific user interface;
> - client and server roles are set on a per request basis.

**✅ 答案 (Answer):**
| 描述 (Description) | 分類 (Category) |
|---|---|
| no dedicated server is required（無需專用伺服器） | **Peer-to-Peer Network** |
| a background service is required（需要背景服務） | **Peer-to-Peer Application** |
| requires a specific user interface（需要特定用戶介面） | **Peer-to-Peer Application** |
| client and server roles are set on a per request basis（客戶端/伺服器角色按每次請求設定） | **Peer-to-Peer Network** |

**答題邏輯 (繁中解說):**
用「**網絡層面 vs 軟件層面**」分：**Peer-to-Peer Network** 講的是「網絡架構」——沒有專用伺服器，任何一部裝置都可以按需要同時做客戶端同伺服器，角色按每次請求決定；**Peer-to-Peer Application** 講的是「應用軟件」——要安裝特定程式（有特定 User Interface），並以**背景服務（background service）**形式持續運行（例如 BT 軟件長期在背景分享檔案）。

> A peer-to-peer network requires no dedicated server and sets the client/server roles on a per-request basis, while a peer-to-peer application requires a background service and a specific user interface.

**💬 考試英文答題句 (Exam Answer Phrase):**
> "No dedicated server" and "roles set on a per-request basis" describe a peer-to-peer network; "background service" and "specific user interface" describe a peer-to-peer application.

---

## 4. 📖 必考英文術語與答題句型庫

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| **Application Layer** | TCP/IP 模型最上層，合併 OSI 的 Session、Presentation、Application 三層，提供用戶直接使用的網絡服務 | The TCP/IP application layer combines OSI layers 5, 6 and 7 (Session, Presentation and Application). |
| **HTTP (Hypertext Transfer Protocol)** | 傳送網頁的協定，用 TCP Port 80，屬無狀態請求-回應 | HTTP delivers web pages using TCP port 80. |
| **HTTPS** | HTTP 加 SSL/TLS 加密，提供機密性、完整性與認證，用 TCP Port 443 | HTTPS uses SSL/TLS to encrypt and authenticate data, providing security over HTTP. |
| **FTP (File Transfer Protocol)** | 面向連接的檔案傳送協定，Port 21 控制連接、Port 20 資料連接 | FTP is a connection-oriented file transfer protocol using TCP port 21 for control and port 20 for data. |
| **TFTP (Trivial File Transfer Protocol)** | 無連接的簡易檔案傳送協定，用 UDP Port 69，無交握、速度快但不可靠 | TFTP is a connectionless file transfer protocol that uses UDP port 69. |
| **SMTP (Simple Mail Transfer Protocol)** | 寄送/轉寄電郵的協定，用 TCP Port 25，負責「推」郵件 | SMTP forwards e-mail to remote mail servers using TCP port 25. |
| **POP3 (Post Office Protocol v3)** | 收取電郵協定，下載後通常刪除伺服器原件，適合儲存有限情況，用 TCP Port 110 | POP3 retrieves e-mail and deletes the original from the server, suiting limited server storage. |
| **IMAP4 (Internet Message Access Protocol v4)** | 收取電郵協定，郵件保留在伺服器，可從不同地點存取，用 TCP Port 143 | IMAP4 keeps the original e-mail on the server, enabling access from different locations. |
| **DNS (Domain Name System)** | 把域名翻譯成 IP 地址，用 Port 53，查詢多用 UDP、區域傳輸用 TCP | DNS translates domain names into IP addresses using port 53 (both TCP and UDP). |
| **DHCP (Dynamic Host Configuration Protocol)** | 開機時動態分配 IP、子網遮罩、預設閘道與 DNS，流程為 DORA | DHCP dynamically assigns IP configuration at start-up through Discover, Offer, Request and Acknowledge. |
| **DORA** | DHCP 四步訊息口訣：Discover → Offer → Request → Acknowledge | The DHCP process is DORA: Discover finds the server, Offer suggests a lease, Request identifies the lease, Acknowledge confirms it. |
| **SMB (Server Message Block)** | Microsoft 網絡的檔案分享協定 | SMB provides file sharing in Microsoft networks. |
| **SSL / TLS** | 加密傳輸層協定，HTTPS 賴以保護資料 | SSL/TLS provides encryption, integrity and authentication for HTTPS. |
| **GET / POST / PUT** | HTTP 方法：GET 請求資料、POST 上傳資料、PUT 上傳資源內容 | GET requests data, POST uploads data files, and PUT uploads resources or content to the web server. |
| **Client-Server Model** | 有專用伺服器提供服務，客戶端向其請求 | In the client-server model, a dedicated server provides services to clients. |
| **Peer-to-Peer Network** | 無專用伺服器的網絡，裝置角色按每次請求設定 | A peer-to-peer network requires no dedicated server; roles are set on a per-request basis. |
| **Peer-to-Peer Application** | 需要特定介面與背景服務的對等分享應用軟件 | A peer-to-peer application requires a background service and a specific user interface. |
| **Presentation Layer Standards (GIF / JPEG / MPEG)** | 表示層的資料格式標準，負責資料編碼表示 | GIF, JPEG and MPEG are presentation-layer data format standards. |
| **Well-known Ports (21/25/53/80/443)** | 知名連接埠：FTP/SMTP/DNS/HTTP/HTTPS | Port 21=FTP, 25=SMTP, 53=DNS, 80=HTTP, 443=HTTPS. |

---

## 5. 🗺️ 學習路線 (Learning Path)

**第 1 步：先理解（Understand）**
- 明白 TCP/IP 應用層 = OSI 5、6、7 層合併，以及「協定（Protocol）vs 格式標準（Format Standard）」的分別。
- 理解三大分類概念：Client-Server Model（有專用伺服器）、Peer-to-Peer Network（無專用伺服器）、Peer-to-Peer Application（特定軟件直接互傳）。

**第 2 步：背誦（Memorise）**
- 背熟 Well-known Ports：21 FTP、25 SMTP、53 DNS、80 HTTP、443 HTTPS。
- 背熟 DORA 口訣：Discover → Offer → Request → Acknowledge。
- 背熟每組對比：FTP/TFTP（有/無連接）、POP/IMAP（刪/留原件）、HTTP/HTTPS（明/密文）、SMTP/POP-IMAP（推/拉）。

**第 3 步：掌握判斷（Apply & Judge）**
- 做 Port ↔ 協定 ↔ 功能 ↔ Transport Protocol 的四方互轉練習（Q3、Q9 表格）。
- 掌握 DNS 情境判斷三步：DNS 設定是否指對伺服器？Resource Record 是否存在？記錄 IP 是否正確？（Q10）
- 掌握分類判斷口訣：有專用伺服器＝Client-Server；無專用伺服器＝P2P Network；特定軟件＋背景服務＋特定介面＝P2P Application（Q12、Q13）。

**第 4 步：能解答考題（Exam-ready）**
- 重新以「遮答案」方式完成本 Guide 全部 13 題，每題限時 1–2 分鐘。
- 對每一題默寫一條 Exam Answer Phrase（英文答題句），確保考試時能直接寫出標準英文答案。
- 最後 5 分鐘溫習第 6 節 Cheat Sheet，考前快速掃一次 Port 表、DORA 與協定對比表。

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 6.1 必背 Port Number 表

| Port | 協定 | 用途 | Transport |
|---|---|---|---|
| 21 | FTP | 控制連接（Control） | TCP |
| 20 | FTP | 資料連接（Data） | TCP |
| 25 | SMTP | 寄/轉寄電郵 | TCP |
| 53 | DNS | 域名解析 | **Both**（UDP 查詢、TCP 區域傳輸） |
| 69 | TFTP | 無連接檔案傳送 | UDP |
| 80 | HTTP | 網頁傳送 | TCP |
| 110 | POP3 | 收取電郵（刪原件） | TCP |
| 143 | IMAP4 | 收取電郵（留原件） | TCP |
| 443 | HTTPS | 安全網頁傳送 | TCP |

### 6.2 四大協定對比表

| 對比組 | 重點 |
|---|---|
| HTTP vs HTTPS | HTTP 明文；HTTPS = HTTP + SSL/TLS，提供加密、完整性、認證 |
| FTP vs TFTP | FTP 面向連接（TCP 21+20）；TFTP 無連接（UDP 69） |
| POP3 vs IMAP4 | POP3 下載即刪（適合儲存有限）；IMAP4 保留原件（適合多地點存取） |
| SMTP vs POP/IMAP | SMTP 推（寄出）；POP/IMAP 拉（收取） |

### 6.3 HTTP 方法口訣

- **GET 拿**（request data）、**POST 交**（upload data files）、**PUT 放**（upload resources/content）。

### 6.4 DHCP 口訣：DORA

> **D**iscover — Find the server → **O**ffer — Suggest a lease → **R**equest — Identify the lease → **A**cknowledge — Confirm the lease

### 6.5 OSI 分層速記

- **Layer 7 Application**：DHCP、DNS、HTTP、IMAP、POP、TFTP（協定）
- **Layer 6 Presentation**：GIF、JPEG、MPEG（格式標準）
- **Layer 5 Session**：題目列表中無

### 6.6 模型分類判斷表

| 特徵 | Client-Server | P2P Network | P2P Application |
|---|---|---|---|
| 專用伺服器 | ✅ 有 | ❌ 無 | ❌ 無 |
| 特定用戶介面 | — | ❌ | ✅ 需要 |
| 背景服務 | — | ❌ | ✅ 需要 |
| 角色設定 | 固定 | 每次請求決定 | 固定於軟件 |

### 6.7 英文記憶口訣 (Memory Mnemonics)

- **Ports**: "**F**TP **21**, **S**MTP **25**, **D**NS **53**, **H**TTP **80**, **HTTPS 443**" → 記「**F S D H H**：21-25-53-80-443」。
- **DORA**: "**D**iscover **O**ffers, **R**equest **A**ccepts"（Discover 尋找、Offer 提議、Request 指明、Acknowledge 確認）。
- **Email**: "**S**MTP **S**ends, **P**OP **P**ulls & **P**urges, **I**MAP **I**s on the server"（SMTP 寄出、POP 拉走刪除、IMAP 留在伺服器）。
- **FTP**: "**21 Control, 20 Data**" — 控制連接管指令，資料連接管檔案。
