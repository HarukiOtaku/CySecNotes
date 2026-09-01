# ITE3102 PT10.1 CodeGuide — Web and Email（Web 與 Email 實務測驗主戰文件）

> **Lab Identity:** Packet Tracer 10.2.1.7 — Web and Email（對應 Cisco NetAcad ITN 標準活動）
> 本文件唯一目的：令學生只靠呢份文件就喺 Packet Tracer 完成實作，並答啱 Practical Test 所有問題。
> 本 Lab 全部設定都係用 Packet Tracer 嘅 **GUI（圖形介面）** 完成——Server 用 `Services` tab，PC 用 `Desktop` tab；CLI 指令主要用嚟「驗證」同「應付測驗」。

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握的實務技能（Practical Skills）

| 技能 | 實務上做到啲咩 |
|---|---|
| Web 服務設定 | 喺 Server 開 HTTP 同 HTTPS（Secure）服務，令網頁可以被瀏覽 |
| 網頁存取驗證 | 用 PC 嘅 Web Browser 分別以 **IP** 同 **主機名稱（hostname）** 開網頁 |
| DNS 概念 | 解釋 hostname（例如 `centralserver.pt.pka`）點樣翻譯做 IP address |
| Email 伺服器設定 | 喺 Server 開 SMTP + POP3 服務、設定 domain name、建立郵件用戶 |
| Email 用戶端設定 | 喺 PC 設定收發電郵帳戶（Incoming/Outgoing Mail Server、User Name、Password） |
| 電郵流程驗證 | 由一個用戶 Send，另一個用戶 Receive，再 Reply，驗證成條電郵路徑 |

> **Core skills:** Enabling HTTP/HTTPS services on servers, verifying web access by IP and by hostname, explaining DNS name resolution, enabling SMTP/POP3 with a domain and mailbox users on servers, configuring email clients on PCs, and verifying the send/receive/reply email flow.

### 所需設備 / 軟體（Equipment & Software）

- **Cisco Packet Tracer**（本 Lab 用活動檔 `PT10.1 Packet Tracer - Web and Email.pka`）
- 網絡設備（教材原文提及）：**CentralServer**、**BranchServer**、**PC3**、**Sales**（另外有 router / switch 串連兩個網絡，教材未有列出明細）
- 本 Lab **唔需要入 CLI**——所有設定都喺 GUI 完成，重點係記熟每個 tab 嘅位置同填咩值

> **Environment:** Cisco Packet Tracer; the lab uses two servers (CentralServer, BranchServer), two endpoint devices (PC3, Sales) and routers/switches interconnecting two networks. All configuration is done through the GUI — the Services tab on servers and the Desktop tab on PCs.

### 網絡拓撲 + 關鍵 IP（必背）

- **Central 網絡 `10.10.10.0/24`**：CentralServer 個 IP 係 **10.10.10.2**；PC3 喺呢邊，佢嘅 Web 同 Mail Server 都指去 10.10.10.2
- **Branch 網絡 `172.16.0.0/24`**：Sales 喺呢邊，佢嘅 Mail Server 指去 **172.16.0.3**
- **BranchServer 有兩個身份**：由 Central 嗰邊用瀏覽器開網頁要打 **64.100.200.1**（Web 驗證用）；由 Sales 嗰邊設定電郵伺服器就要填 **172.16.0.3**——兩個 IP 都要記實，咪溝亂

| 用途 | 地址 / 名稱 | 對應設備 |
|---|---|---|
| CentralServer 網頁（IP） | `10.10.10.2` | CentralServer |
| CentralServer 網頁（hostname） | `centralserver.pt.pka` | CentralServer |
| BranchServer 網頁（IP） | `64.100.200.1` | BranchServer |
| BranchServer 網頁（hostname） | `branchserver.pt.pka` | BranchServer |
| PC3 嘅 Mail Server | `10.10.10.2`（Incoming + Outgoing） | CentralServer |
| Sales 嘅 Mail Server | `172.16.0.3`（Incoming + Outgoing） | BranchServer |

> **Addressing cheat sheet:** 10.10.10.2 = CentralServer; 64.100.200.1 = BranchServer (web, from the central side); 172.16.0.3 = BranchServer (mail, from the branch side); hostnames are `centralserver.pt.pka` and `branchserver.pt.pka`.

---

## 🛠️ 解題步驟拆解 (Walkthrough)

### Part 1 ➔ 設定 Web 服務（Configure and Verify Web Services）

**原文步驟：** Configure web services on CentralServer and BranchServer.

**Step 1 ➔** 撳 **CentralServer**，撳 `Services` tab，再撳 **HTTP**（原文：Click CentralServer and click the Services tab > HTTP）
**解說**：Server 嘅 HTTP 服務預設係關閉嘅；開咗先可以俾人用瀏覽器開網頁。注意 `Services` tab 喺 server 先有，PC 係冇嘅。

**Step 2 ➔** 撳 **On** 開啟 HTTP 同 **HTTP Secure (HTTPS)**（原文：Click On to enable HTTP and HTTP Secure (HTTPS)）
**解說**：HTTP（TCP port 80）係普通網頁；HTTPS（TCP port 443）係加密版本，網址會以 `https://` 開頭。兩個都要開。

> **HTTP vs HTTPS:** HTTP serves web pages over TCP port 80 in plain text; HTTPS serves them encrypted over TCP port 443. Both services must be toggled On for the server to respond.

**Step 3 ➔** （可選）個人化 HTML 內容（原文：Optional. Personalize the HTML code）
**解說**：教材話係 Optional——唔做都照計滿分；做咗可以令網頁顯示自己嘅文字，方便認得出係邊部 server。

**Step 4 ➔** 喺 **BranchServer** 重複 Step 1–3（原文：Repeat Step1a – 1c on BranchServer）
**解說**：兩部 server 都要開 HTTP/HTTPS，因為 Part 2 會分別開兩部嘅網頁。

> **Repeat on both servers:** HTTP and HTTPS must be enabled on CentralServer and on BranchServer, because both websites will be verified in the next part.

---

### Part 2 ➔ 用 PC3 驗證 Web 伺服器（Verify the Web Servers）

**原文步驟：** Verify the web servers by accessing the web pages. There are many endpoint devices in this network, but for the purposes of this step, use PC3.

**Step 1 ➔** 撳 **PC3**，撳 `Desktop` tab，再撳 **Web Browser**（原文：Click PC3 and click the Desktop tab > Web Browser）
**解說**：PC3 嘅 Desktop tab 有好多工具（Command Prompt、Web Browser、E Mail 等），今次用 Web Browser。

**Step 2 ➔** 喺 URL 格輸入 **`10.10.10.2`**，撳 **Go**（原文：In the URL box, enter 10.10.10.2 as the IP address and click Go. The CentralServer website displays.）
**解說**：直接用 IP 開網頁唔需要 DNS；見到 CentralServer 網站出現即係 HTTP 服務正常。**呢一步要確認 CentralServer 網站「displays」先算成功。**

**Step 3 ➔** 喺 URL 格輸入 **`64.100.200.1`**，撳 **Go**（原文：In the URL box, enter 64.100.200.1 as the IP address and click Go. The BranchServer website displays.）
**解說**：開 BranchServer 嘅網頁要打 64.100.200.1（唔係 172.16.0.3）——由 Central 網絡過嚟呢邊就用呢個地址。

**Step 4 ➔** 喺 URL 格輸入 **`centralserver.pt.pka`**，撳 **Go**（原文：In the URL box, enter centralserver.pt.pka and click Go. The CentralServer website displays.）
**解說**：今次唔用 IP，改用主機名稱。瀏覽器唔識 hostname，要先問 DNS 攞返對應 IP 先開到網頁。開到即代表 DNS name resolution 正常。

**Step 5 ➔** 喺 URL 格輸入 **`branchserver.pt.pka`**，撳 **Go**（原文：In the URL box, enter branchserver.pt.pka and click Go. The BranchServer website displays.）
**解說**：同一道理，hostname 會被翻譯做 64.100.200.1 再開網頁。

**Q（必考）：What protocol is translating the centralserver.pt.pka and branchserver.pt.pka names to IP addresses？（邊個 protocol 將主機名稱翻譯做 IP address？）**
**答：DNS（Domain Name System）。**

> **Answer:** DNS (Domain Name System). DNS translates human-friendly hostnames such as centralserver.pt.pka into IP addresses so clients can reach the server.

> **DNS port:** DNS uses UDP port 53 by default for name resolution queries.

---

### Part 3 ➔ 設定伺服器電郵服務（Configure Email Services on Servers）

**原文步驟：** Configure and Verify Email Services on Servers. Configure CentralServer to send (SMTP) and receive (POP3) Email.

**Step 1 ➔** 撳 **CentralServer**，撳 `Services` tab，再撳 **EMAIL** 掣（原文：Click CentralServer, and then select the Services tab followed by the EMAIL button）
**解說**：EMAIL 服務畫面有 SMTP 同 POP3 兩個服務，仲有 Domain Name 同 User 管理。

> **SMTP vs POP3:** SMTP (Simple Mail Transfer Protocol) is used to **send** email; POP3 (Post Office Protocol version 3) is used to **receive** email. SMTP uses TCP port 25, POP3 uses TCP port 110.

**Step 2 ➔** 撳 **On** 開啟 SMTP 同 POP3（原文：Click On to enable the SMTP and POP3）
**解說**：兩邊都要開，否則「Send 唔到」或者「Receive 唔到」。開完先做下一步。

**Step 3 ➔** 喺 Domain Name 輸入 **`centralserver.pt.pka`**，撳 **Set**（原文：Set the domain name to centralserver.pt.pka and click Set）
**解說**：domain name 必須同用戶嘅 email address 後面部分完全一致（`central-user@centralserver.pt.pka`），唔一致就會收發失敗。

> **Domain must match:** The server's domain name must exactly match the part after `@` in the mailbox addresses, or mail delivery fails.

**Step 4 ➔** 建立用戶 **`central-user`**，密碼 **`cisco`**，撳 **`+`** 加入（原文：Create a user named central-user with password cisco. Click + to add the user.）
**解說**：用戶名同密碼之後要原封不動填入 PC3 嘅電郵用戶端；加完用戶會見到佢出現喺用戶清單。

**Step 5 ➔** 喺 **BranchServer** 重複以上步驟，domain 用 **`branchserver.pt.pka`**，用戶 **`branch-user`** / 密碼 **`cisco`**（原文：Configure BranchServer to send (SMTP) and receive (POP3) Email. ... Create a user named branch-user with password cisco.）
**解說**：兩部 server 各自有自己嘅 domain 同用戶，唔好撈亂：`central-user@centralserver.pt.pka` 只存在於 CentralServer，`branch-user@branchserver.pt.pka` 只存在於 BranchServer。

> **Two independent mail domains:** CentralServer hosts `central-user@centralserver.pt.pka`; BranchServer hosts `branch-user@branchserver.pt.pka`. Each server only knows its own users.

---

### Part 4 ➔ 設定電郵用戶端（Configure Email Clients on PC3 and Sales）

**Step 1 ➔** 撳 **PC3**，撳 `Desktop` tab，再撳 **E Mail**（原文：Click PC3 and click the Desktop tab > E Mail）
**解說**：E Mail 係 Packet Tracer 內建嘅電郵用戶端（email client），等同真實世界嘅 Outlook / Mail app。

**Step 2 ➔** 照下表填晒所有欄位（原文：Enter the following values into their respective fields）

| 欄位 | PC3 要填嘅值 | Sales 要填嘅值 |
|---|---|---|
| Your Name | `Central User` | `Branch User` |
| Email Address | `central-user@centralserver.pt.pka` | `branch-user@branchserver.pt.pka` |
| Incoming Mail Server | `10.10.10.2` | `172.16.0.3` |
| Outgoing Mail Server | `10.10.10.2` | `172.16.0.3` |
| User Name | `central-user` | `branch-user` |
| Password | `cisco` | `cisco` |

**解說（PC3）**：Incoming 同 Outgoing 都係 10.10.10.2（即 CentralServer）；User Name 同 Password 一定要同 Part 3 喺 server 建立嘅一致。**解說（Sales）**：Sales 用 BranchServer，Mail Server 填 172.16.0.3（唔係 64.100.200.1）。

> **Client fields:** Email Address, User Name and Password must match the account created on the server; Incoming/Outgoing Mail Server is the server's IP address from the client's perspective.

**Step 3 ➔** 撳 **Save**，會彈出 Mail Browser 視窗（原文：Click Save. The Mail Browser window displays.）

**Step 4 ➔** 撳 **Receive**，出現 **Receive Mail Success** 訊息（原文：Click Receive. If everything has been set up correctly on both the client and server, the Mail Browser window displays the Receive Mail Success message confirmation.）
**解說**：`Receive Mail Success` 係「伺服器 + 用戶端設定啱晒」嘅鐵證——server 服務開咗、domain 啱、用戶密碼啱、網絡通，先會出現。PC3 同 Sales 都要各自做到呢步。

> **Receive Mail Success:** This confirmation proves the mail server services, domain name, user credentials and network path are all correctly configured.

⚠️ **教材提示：** 收到 Success 之後「Do not close the Sales configuration window or the Mail Browser window」——因為 Part 5 要即刻用 Sales 個 Mail Browser 寄信，關咗要重新開。

---

### Part 5 ➔ 收發電郵（Send an Email and Reply）

**Step 1 ➔** 喺 **Sales** 嘅 Mail Browser 視窗撳 **Compose**（原文：From the Sales Mail Browser window, click Compose.）

**Step 2 ➔** 填以下內容（原文：Enter the following values into their respective fields）

| 欄位 | 填咩 |
|---|---|
| To | `central-user@centralserver.pt.pka` |
| Subject | 自訂標題（Personalize the subject line.） |
| Email Body | 自訂內容（Personalize the email.） |

**解說**：收件人係 CentralServer 嘅用戶 `central-user`——兩邊網絡唔同，電郵要經 router 送去另一個網絡，呢個正正係測驗想驗證嘅嘢（跨網絡電郵）。

**Step 3 ➔** 撳 **Send**（原文：Click Send.）
**解說**：Send 係用 SMTP 將郵件交俾郵件伺服器，再轉去目的地伺服器。

**Step 4 ➔** 撳 **PC3**，開 E Mail，撳 **Receive**（原文：Click PC3. If the Mail Browser window is closed, click E Mail. Click Receive. An email from Sales displays. Double-click the email.）
**解說**：PC3 用 POP3 由 CentralServer 收信；見到 Sales 寄嚟嘅電郵，**雙擊**打開。呢一步證明「Sales 寄 → SMTP 傳送 → PC3 收到」成條路通咗。

**Step 5 ➔** 撳 **Reply**，寫埋回覆內容，撳 **Send**（原文：Click Reply, personalize a response, and click Send.）

**Step 6 ➔** 返去 **Sales**，撳 **Receive**，確認收到 PC3 嘅回覆（原文：Verify that Sales received the reply.）
**解說**：回覆（reply）都係一封新電郵，方向相反行一次完整流程。兩邊都收到之後，活動就會顯示 **100% complete**。

> **End-to-end email flow:** Sales sends via SMTP → mail servers relay the message → PC3 receives via POP3 → PC3 replies → Sales receives the reply. The activity reaches 100% when both sides complete the flow.

---

## 💻 關鍵 CLI 指令庫

本 Lab 嘅設定全部喺 GUI 做，冇 Router/Server CLI 設定檔；不過 Practical Test 成日叫你用 CLI **驗證**網絡狀態。以下指令分三組：**本 Lab 實用驗證**、**Router/Switch CLI**、**DNS 相關**。

### 1️⃣ 主機（PC）驗證指令——本 Lab 直接用到

```text
ipconfig                        ; 查看 PC 嘅 IP / Subnet Mask / Default Gateway（測驗第一件事：確認 IP 啱唔啱）
ipconfig /all                   ; 顯示更多細節，包括 DNS Server 設定
ping 10.10.10.2                 ; 測試到 CentralServer 網絡通唔通（ICMP echo request / reply）
ping centralserver.pt.pka       ; 同時測試 DNS 解唔解得掂個 hostname
nslookup centralserver.pt.pka   ; 查 hostname 翻譯做咩 IP（驗證 DNS 用，答案會係 10.10.10.2）
arp -a                          ; 查看 ARP cache（IP ↔ MAC 對應）
```

> **Host verification commands:** `ipconfig` shows the PC's IP configuration; `ping` tests IP connectivity; `nslookup` queries DNS to resolve a hostname to an IP address.

### 2️⃣ Router / Switch CLI——測驗常考嘅「設定同檢查」指令

```text
enable                          ; 由用戶模式進入特權模式（privileged EXEC mode）
configure terminal              ; 進入全域設定模式（global configuration mode）
interface g0/0                  ; 進入指定 interface（gigabitEthernet 0/0）做設定
ip address 10.10.10.1 255.255.255.0   ; 設定 interface 嘅 IPv4 地址同 subnet mask
no shutdown                     ; 開啟 interface（預設 shutdown，唔開就唔通）
ip domain-lookup                ; 開啟 DNS lookup（router 先可以解析 hostname）
ip name-server 10.10.10.2       ; 指定 DNS server 俾 router 查詢
ip host centralserver.pt.pka 10.10.10.2  ; 靜態 hostname 對應表（等於手動 DNS 記錄）
show ip interface brief         ; 快速檢查所有 interface 嘅 IP 同 up/down 狀態
show ip route                   ; 查看 routing table，確認兩個網絡點樣互通
show running-config             ; 查看目前生效嘅全部設定（檢查改咗啲咩）
show hosts                      ; 查看 router 認識嘅 hostname 對應表
```

> **Router/switch CLI:** `enable` → `configure terminal` → `interface <id>` → `ip address <ip> <mask>` → `no shutdown` is the standard interface configuration sequence; `show ip interface brief` verifies the result; `show running-config` dumps the active configuration.

### 3️⃣ DNS 服務相關（如果測驗要你自己起 DNS）

```text
ip dns server                   ; 將 router 設定做 DNS server（回答其他設備嘅查詢）
; 注意：`ip dns server` 唔接受 IP 參數；想指定 router 向邊部 DNS 伺服器查詢，用 `ip name-server <ip>`（見上文 2️⃣）
```

> **DNS on the router:** Enabling `ip dns server` makes the router answer name-resolution queries; combined with static `ip host` entries, it can resolve names like `centralserver.pt.pka` without an external DNS server.

---

## 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| 開網頁見唔到 CentralServer 網站 | CentralServer 嘅 HTTP 服務未撳 On | 返去 Server → Services → HTTP → 撳 **On**（HTTPS 都要開） |
| 打 `centralserver.pt.pka` 開唔到網頁，但打 `10.10.10.2` 開到 | DNS name resolution 失敗（冇 DNS 或者 hostname 打錯） | 確認 hostname 串法完全正確（`centralserver.pt.pka`）；測驗時用 `nslookup` 查；開唔到就用 IP 頂住 |
| 打 `64.100.200.1` 開唔到 BranchServer 網頁 | 打錯咗 BranchServer 另一個 IP（172.16.0.3）或者 HTTP 未開 | Web 驗證用 `64.100.200.1`；確認 BranchServer HTTP 已 On |
| `Receive Mail Success` 冇出現 | SMTP/POP3 未開、domain 唔啱、用戶名/密碼錯、Mail Server IP 填錯 | 逐樣檢查：Services > EMAIL 兩個都 On；domain = `centralserver.pt.pka` / `branchserver.pt.pka`；用戶 `central-user`/`branch-user` 密碼 `cisco`；Mail Server IP 10.10.10.2（PC3）/ 172.16.0.3（Sales） |
| PC3 收唔到 Sales 寄嚟嘅電郵 | 收件人地址打錯（例如 domain 唔 match）、或者 PC3 未撳 Receive | To 一定要係 `central-user@centralserver.pt.pka`；PC3 撳 Receive；雙擊先可以開封 |
| Sales 收唔到 PC3 嘅回覆 | 回覆地址錯、或者 Sales 冇撳 Receive | Reply 係自動帶返正確地址；返去 Sales 撳 Receive 驗證 |
| 寄信話 Send 失敗 | Outgoing Mail Server IP 錯、或者收件人 domain 唔存在喺任何 server | 檢查 Outgoing Mail Server 填啱（PC3=10.10.10.2、Sales=172.16.0.3）；確認收件人係已建立嘅用戶 |
| 活動百分比冇去到 100% | 有步驟未完成（例如 Reply 未寄、冇 Double-click 開信） | 按 Part 5 順序行一次：Send → Receive → Double-click → Reply → Send → 另一邊 Receive |

> **Debugging rule of thumb:** If a service fails, check the four C's in order — Configuration (service On?), Credentials (user/password), Connectivity (ping the server IP), and Consistency (domain and addresses exactly match).

---

## 📝 測驗常見題型 (Practical Test 應試重點)

### 題型 1：辨認 protocol（必考）
**問：** Which protocol translates hostnames like `centralserver.pt.pka` to IP addresses?
**答：** **DNS (Domain Name System)**。

> **Answer:** DNS (Domain Name System) translates hostnames into IP addresses.

### 題型 2：服務與 Port 對應
**問：** HTTP / HTTPS / SMTP / POP3 用咩 protocol 同 default port？

| 服務 | 用途 | Transport Protocol | Default Port |
|---|---|---|---|
| HTTP | 傳送網頁（無加密） | TCP | 80 |
| HTTPS | 傳送加密網頁 | TCP | 443 |
| SMTP | 傳送（寄出）電郵 | TCP | 25 |
| POP3 | 接收（收落嚟）電郵 | TCP | 110 |
| DNS | hostname 翻譯做 IP | UDP | 53 |

> **Port table:** HTTP=80, HTTPS=443, SMTP=25, POP3=110, DNS=53. All the mail/web services run over TCP; DNS queries normally use UDP.

### 題型 3：SMTP vs POP3 分工
**問：** 寄信用邊個 protocol？收信用邊個？
**答：** 寄信（send）用 **SMTP**；收信（receive）用 **POP3**。

> **Answer:** SMTP is used to send email; POP3 is used to receive email.

### 題型 4：點解用 IP 開到網頁但用 hostname 開唔到？
**答：** IP 係直接尋址，唔需要翻譯；hostname 要靠 **DNS** 翻譯做 IP，DNS 冇設定/唔通就會失敗。

> **Answer:** Accessing by IP requires no translation, while a hostname must first be resolved to an IP address by DNS; if DNS is unavailable or misconfigured, name-based access fails.

### 題型 5：重現設定步驟
**問：** 要喺 CentralServer 開 email 服務，步驟係咩？
**答：** Services tab → EMAIL → 開 SMTP 同 POP3（On）→ Domain Name 填 `centralserver.pt.pka` → Set → 加用戶 `central-user`（密碼 `cisco`）→ `+`。

> **Answer:** Services tab → EMAIL → enable SMTP and POP3 → set the domain name → create the mailbox user with its password.

### 題型 6：client 設定對應
**問：** PC3 嘅 Incoming / Outgoing Mail Server 填咩？Sales 呢？
**答：** PC3 填 `10.10.10.2`（CentralServer）；Sales 填 `172.16.0.3`（BranchServer）。User Name / Password 一定要同 server 建用戶時一致。

> **Answer:** PC3 uses 10.10.10.2 (CentralServer); Sales uses 172.16.0.3 (BranchServer); credentials must match the server-side mailbox exactly.

### 題型 7：流程概念題
**問：** 由 Sales 寄信俾 `central-user@centralserver.pt.pka`，成條路行咩 protocol？
**答：** Sales 個 client 用 **SMTP** 交俾 BranchServer（郵件伺服器）→ 郵件轉送去 CentralServer → PC3 用 **POP3** 由 CentralServer 收信。

> **Answer:** The sender's client pushes the message to its mail server via SMTP; mail servers relay it; the recipient's client downloads it via POP3.

---

## 🔗 理論 recap（5 分鐘入腦）

1. **HTTP（TCP 80）** 傳網頁，**HTTPS（TCP 443）** 係加密版——server 要喺 Services > HTTP 開咗先有得睇。
   > HTTP serves web pages on TCP 80; HTTPS is the encrypted version on TCP 443.
2. **DNS（UDP 53）** 將 hostname（`centralserver.pt.pka`）翻譯做 IP——所以打 IP 開到、打 hostname 開唔到 = DNS 問題。
   > DNS resolves hostnames to IP addresses on UDP 53.
3. 電郵分兩半：**SMTP（TCP 25）** 負責「寄出」，**POP3（TCP 110）** 負責「收落嚟」。
   > SMTP (port 25) sends mail; POP3 (port 110) receives mail.
4. Server 嘅 **domain name 一定要同電郵地址 `@` 之後嗰部分一致**，用戶名密碼要喺 client 一模一樣填返。
   > The mail server's domain must match the address suffix after `@`, and client credentials must match the server-side mailbox.
5. 呢啲全部係 **Application Layer（應用層）** 服務，行喺 TCP 之上；client-server 模型：client 請求、server 回應。
   > HTTP, HTTPS, SMTP and POP3 are Application Layer protocols running over TCP in a client-server model.
