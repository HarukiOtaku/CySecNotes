# ITE3102 PT9 CodeGuide — TCP and UDP Communications（TCP 與 UDP 通訊實務測驗主戰文件）

> **Lab Identity:** Packet Tracer — TCP and UDP Communications（對應 Cisco NetAcad ITN 標準活動；Packet Tracer 唔會為呢個活動評分，但 Practical Test 會照住考）
> 本文件唯一目的：令學生只靠呢份文件就喺 Packet Tracer 完成實作，並答啱 Practical Test 所有問題。

---

## 🔗 理論 recap（先睇呢度，5 分鐘入腦）

1. **TCP**（Transmission Control Protocol）係 connection-oriented 嘅可靠傳輸協議：傳 data 之前要先用 **three-way handshake**（SYN → SYN-ACK → ACK）建立 session，之後靠 **SEQUENCE NUM** 同 **ACK NUM** 保證每個 segment 都有送到、冇遺漏。
   > TCP is a connection-oriented, reliable transport protocol. It establishes a session with a three-way handshake (SYN, SYN-ACK, ACK) and uses sequence and acknowledgement numbers to guarantee delivery.
2. **UDP**（User Datagram Protocol）係 connectionless 嘅不可靠傳輸協議：冇 handshake、冇序號、冇確認，所以快但唔保證送達——DNS 呢類一問一答就係用 UDP。
   > UDP is a connectionless, unreliable transport protocol: no handshake, no sequence numbers, no acknowledgements — fast, but with no delivery guarantee.
3. **Port numbers** 用嚟做 **multiplexing**（多路複用）：多個 application 嘅 traffic 共用同一條實體線路傳輸，靠 source/destination port 決定邊個 local application 發送或者接收 data。
   > Port numbers enable multiplexing: many applications share the same wire, and the transport layer uses source/destination port numbers to decide which local application sent or should receive the data.
4. **Well-known ports（必背）**：HTTP = 80、FTP = 21、DNS = 53、SMTP = 25、POP3 = 110；client 端會用 **ephemeral source port**（通常 1024–65535）。
   > Well-known ports: HTTP 80, FTP 21, DNS 53, SMTP 25, POP3 110; clients use ephemeral source ports, typically 1024–65535.
5. 任何時刻，每條 wire 每個方向**只可以有一個 PDU** 通過，其餘要排隊（queuing）——呢個就係 multiplexing 喺網絡上嘅實際效果。
   > Only one PDU can cross a wire in each direction at any given time; the rest are queued — this is multiplexing in action.
6. **Simulation mode** 可以睇到 PDU 逐跳傳播；Simulation Panel 用**唔同顏色**代表唔同 protocol，方便篩選同追蹤。
   > In Simulation mode you watch PDUs travel hop by hop; the Simulation Panel colour-codes PDUs by protocol type.

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握的實務技能（Practical Skills）

| 技能 | 實務上做到啲咩 |
|---|---|
| Simulation mode 操作 | 用 Packet Tracer 嘅 Simulation mode + Capture/Forward 逐步追蹤 PDU |
| 產生真實 traffic | 用 `ping`、`ftp`、`nslookup` 同 Email client 產生 HTTP / FTP / DNS / Email 流量 |
| PDU 篩選 | 用 Edit Filters 淨係顯示想睇嘅 protocol（如 HTTP + TCP、DNS + UDP） |
| PDU 解剖（PDU Inspection） | 讀 Outbound / Inbound PDU Details：TCP/UDP section、SRC/DEST PORT、SEQUENCE NUM、ACK NUM、TCP flags |
| TCP vs UDP 判斷 | 從 PDU 內容分辨邊個係 connection-oriented / reliable、邊個係 connectionless / unreliable |
| Multiplexing 概念 | 解釋點解一條 wire 同一時間一個方向只可以過一個 PDU，同 port numbers 點樣分流 |

> **Core skills:** Running Simulation mode, generating HTTP/FTP/DNS/Email traffic with `ping`, `ftp`, `nslookup` and the E-Mail tool, filtering PDUs with Edit Filters, reading TCP/UDP PDU details (ports, sequence/acknowledgement numbers, flags), and telling TCP apart from UDP.

### 所需設備 / 軟體（Equipment & Software）

- **Cisco Packet Tracer**（活動檔 `.pka`，本 Lab 已預載拓撲）
- 網絡設備：**MultiServer**（伺服器，同時做 HTTP / FTP / DNS / Email server）、**HTTP Client**、**FTP Client**、**DNS Client**、**E-Mail Client**、**Switch**、**Router**
- 網絡設定（預設好晒，唔使自己設 IP）：LAN = `192.168.1.0/24`；server 同 default gateway = **192.168.1.254**；域名 = **multiserver.pt.ptu**
- 本 Lab 係「觀察 + 答問題」為主，**唔需要**入 router/switch CLI 做設定

> **Environment:** Cisco Packet Tracer with a pre-built topology: MultiServer (192.168.1.254), four clients (HTTP, FTP, DNS, E-Mail), a switch and a router on LAN 192.168.1.0/24; the domain name is multiserver.pt.ptu. All devices are pre-configured — this activity is about observation and analysis.

---

## 🛠️ 解題步驟拆解 (Walkthrough)

### Part 1 ➔ 喺 Simulation Mode 產生網絡流量（Generate Network Traffic in Simulation Mode）

#### Step 1 ➔ 產生 traffic 填充 ARP tables（原文：Generate traffic to populate Address Resolution Protocol (ARP) tables）

**解說**：Broadcast ping 令 LAN 上每一部設備都要回覆，部部機嘅 ARP table 即刻有齊 IP ↔ MAC 記錄，之後模擬先唔會俾 ARP traffic 嘈住。

1 ➔ 撳 **MultiServer** → **Desktop** tab → **Command Prompt**
2 ➔ 輸入 `ping -n 1 192.168.1.255`（ping 緊 client LAN 嘅 broadcast address）
3 ➔ 等幾秒——網絡上每個設備都會回應 MultiServer
4 ➔ 關閉 MultiServer window

> The `-n 1` option sends only one ping request instead of the usual four. Pinging the broadcast address 192.168.1.255 makes every device on the client LAN reply, which populates the ARP tables so later traffic is not delayed by ARP.

#### Step 2 ➔ 產生 Web（HTTP）traffic（原文：Generate web (HTTP) traffic）

1 ➔ 切換去 **Simulation mode**（右下角模式切換掣）
2 ➔ 撳 **HTTP Client** → 開 **Web Browser**（Desktop）
3 ➔ URL 輸入 `192.168.1.254` → 撳 **Go**——topology window 會出現 Envelopes（PDU）
4 ➔ **Minimize（縮細）但唔好關閉** HTTP Client window

> Open the Web Browser on HTTP Client, enter 192.168.1.254 in the URL field and click Go; PDUs appear in the topology window. Minimize, do not close, the client window.

#### Step 3 ➔ 產生 FTP traffic（原文：Generate FTP traffic）

1 ➔ 撳 **FTP Client** → 開 **Command Prompt**
2 ➔ 輸入 `ftp 192.168.1.254`——PDUs 會喺 simulation window 出現
3 ➔ **Minimize** FTP Client window

> Run `ftp 192.168.1.254` from the FTP Client command prompt to start an FTP session; PDUs appear in the simulation window.

#### Step 4 ➔ 產生 DNS traffic（原文：Generate DNS traffic）

1 ➔ 撳 **DNS Client** → 開 **Command Prompt**
2 ➔ 輸入 `nslookup multiserver.pt.ptu`——PDU 會喺 simulation window 出現
3 ➔ **Minimize** DNS Client window

> Run `nslookup multiserver.pt.ptu` to resolve the hostname to an IP address; a DNS PDU appears in the simulation window.

#### Step 5 ➔ 產生 Email traffic（原文：Generate Email traffic）

1 ➔ 撳 **E-Mail Client** → 開 **E Mail** tool（Desktop）
2 ➔ 撳 **Compose**，輸入：
   - **To:** `user@multiserver.pt.ptu`
   - **Subject:** 自己作一個 subject
   - **E-Mail Body:** 自己作內容
3 ➔ 撳 **Send**
4 ➔ **Minimize** E-Mail Client window

> Compose an email to user@multiserver.pt.ptu, personalize the subject and body, then click Send; this generates SMTP/POP3 traffic.

#### Step 6 ➔ 確認 traffic 已產生（原文：Verify that the traffic is generated）

- Simulation Panel 入面應該有齊每個 client 嘅 PDU entries（HTTP、FTP、DNS、Email 各有一批）
- 未見 PDU？➔ 檢查係咪真係喺 **Simulation mode**、每個 app 有冇真正執行（例如 FTP 有冇見到 login 提示）

> The Simulation Panel should now contain PDU entries for each client computer; if any are missing, confirm you are in Simulation mode and that each application actually ran.

#### Step 7 ➔ 觀察 multiplexing（原文：Examine multiplexing as the traffic crosses the network）

1 ➔ 撳 **Capture/Forward**（`>|`，向右箭嘴加一條直bar）**一次**——所有 PDU 一齊去到 switch
2 ➔ 再撳 **Capture/Forward** **六次**，觀察唔同 host 出嘅 PDU 喺網絡上行
3 ➔ 留意：**同一時間，一條 wire 每個方向只可以有一個 PDU** 通過，其餘喺設備度排隊

**Q1：What is this called？（呢個現象叫咩？）**
**答：Multiplexing（多路複用）。** 唔同 application 嘅 PDU 共用同一條物理線路，一個跟一個咁排隊傳輸，呢個就係「將多個 conversation 複用喺同一條通道」嘅 multiplexing。

> **Answer:** Multiplexing — many conversations share the same physical wire; the PDUs are queued and only one PDU can cross the wire in each direction at a time.

**Q2：A variety of PDUs appears in the event list. What is the meaning of the different colors？（唔同顏色代表咩？）**
**答：唔同顏色代表唔同 protocol 類型。** Simulation Panel 用顏色分類 PDU——例如 HTTP、DNS、TCP、UDP 各有代表色，方便你追蹤某一類 traffic。

> **Answer:** Each colour represents a different protocol type (e.g. HTTP, DNS, TCP, UDP); the colour code matches the envelope colour in the topology window.

---

### Part 2 ➔ 檢查 TCP 同 UDP 協議嘅功能（Examine the Functionality of the TCP and UDP Protocols）

### Part 2a ➔ HTTP traffic（TCP）

1 ➔ 撳 **Reset Simulation**
2 ➔ **Edit Filters** → 撳 **Show All/None** 清走所有 → 淨係揀 **HTTP** 同 **TCP** → 撳右上角紅色「x」關閉
3 ➔ 喺 **HTTP Client** 開 browser → URL 輸入 `192.168.1.254` → **Go** → Minimize 個 window
4 ➔ 連續撳 **Capture/Forward** 直到有 **HTTP PDU** 出現（topology 入面 envelope 嘅顏色同 Simulation Panel 嘅 HTTP 顏色一樣）

**Q3：Why did it take so long for the HTTP PDU to appear？（點解 HTTP PDU 要咁耐先出現？）**
**答：因為 TCP 係 connection-oriented。** HTTP 係行喺 TCP 上面，client 一定要先完成 **three-way handshake（SYN → SYN-ACK → ACK）** 建立 session，先至可以開始 send HTTP data——所以見到 HTTP PDU 之前，會先見到一連串 TCP 嘅 PDU。

> **Answer:** TCP is connection-oriented: the client must first complete the three-way handshake (SYN, SYN-ACK, ACK) before any HTTP data can be sent, so the HTTP PDU appears only after the TCP session is established.

5 ➔ 撳 HTTP PDU envelope → **Outbound PDU Details** tab → scroll 到 **第二最後**嘅 section

**Q4：What is the section labeled？（呢個 section 叫咩名？）**
**答：TCP。** 呢個 section 顯示 Layer 4（TCP segment）嘅所有欄位。

> **Answer:** The section is labeled TCP — it shows the Layer 4 TCP segment fields.

**Q5：Are these communications considered to be reliable？（呢啲通訊可靠嗎？）**
**答：可靠（Yes）。** TCP 有 sequence number、acknowledgement number 同 flags，可以確認同重傳，所以係 reliable。

> **Answer:** Yes — TCP provides sequence numbers, acknowledgement numbers and retransmission, so the communication is reliable.

**Q6：Record the SRC PORT, DEST PORT, SEQUENCE NUM, and ACK NUM values.（記低四個數值）**
**答（典型值）：** SRC PORT = 1025 或以上（client 嘅 ephemeral port），DEST PORT = **80**（HTTP well-known port），SEQUENCE NUM = 起始值（例如 0），ACK NUM = 0。**實際數字以你部 Packet Tracer 顯示為準，考實務試時照抄畫面數值。**

> **Answer:** Source port is an ephemeral port (1025+), destination port is 80 (HTTP), sequence and acknowledgement numbers are the handshake start values. Record exactly what the PDU shows.

6 ➔ 睇 **Flags** field（喺 **Window** field 隔籬）——「b」右邊 6 個位代表 6 個 TCP flags，每個位係「1」就代表該 flag 被 set：

| Flag Place（位） | 6 | 5 | 4 | 3 | 2 | 1 |
|---|---|---|---|---|---|---|
| **Value（對應 flag）** | URG | ACK | PSH | RST | SYN | FIN |

**Q7：Which TCP flags are set in this PDU？（呢個 PDU set 咗咩 flags？）**
**答：SYN。** 呢個係 three-way handshake 嘅第一步——client 發 SYN 去 server 要求建立連線。

> **Answer:** SYN — this is the first step of the three-way handshake, where the client asks the server to open a session.

7 ➔ 關閉 PDU → 繼續撳 **Capture/Forward** 直到一個**有 checkmark** 嘅 PDU 返到 HTTP Client
8 ➔ 撳嗰個 PDU → **Inbound PDU Details**

**Q8：How are the port and sequence numbers different than before？（port 同 sequence numbers 有咩唔同？）**
**答：** SRC PORT 同 DEST PORT **對調**咗（server 而家係 source，用 port 80；client 係 destination，用返原本個 ephemeral port）；SEQUENCE NUM 係 server 自己嘅起始值，ACK NUM 係「client 嘅 sequence + 1」——即 server 回覆 **SYN-ACK**。

> **Answer:** The source and destination ports are swapped, and the sequence/acknowledgement numbers change because this is the server's SYN-ACK reply (its own sequence number, acknowledging the client's SYN).

9 ➔ 撳 HTTP Client **準備 send 俾 MultiServer 嘅 HTTP PDU**（呢個係 HTTP communication 嘅開始）→ **Outbound PDU Details**

**Q9：What information is now listed in the TCP section？How are the port and sequence numbers different from the previous two PDUs？（TCP section 有咩資訊？同之前兩個 PDU 有咩唔同？）**
**答：** 呢個係**真正嘅 HTTP request（GET）**。Flags 而家係 **ACK**（可能加 PSH），SEQUENCE NUM 已經增加（代表 data 開始傳），ACK NUM 係「server 嘅 sequence + 1」——即 handshake 已完成，正式傳 data。

> **Answer:** This PDU carries the actual HTTP GET request; the ACK flag is set and the sequence number has advanced, showing the handshake is complete and data transfer has begun.

---

### Part 2b ➔ FTP traffic（TCP）

1 ➔ **Reset Simulation**
2 ➔ 喺 **FTP Client** 開 Command Prompt → 輸入 `ftp 192.168.1.254`
3 ➔ **Edit Filters** → 淨係揀 **FTP** 同 **TCP**
4 ➔ 撳 **Capture/Forward** → 撳**第二個** PDU envelope 打開
5 ➔ **Outbound PDU Details** tab → scroll 到 **TCP** section

**Q10：Are these communications considered to be reliable？（可靠嗎？）**
**答：可靠（Yes）。** FTP 都係行 TCP。

> **Answer:** Yes — FTP uses TCP, so it is reliable.

**Q11：Record the SRC PORT, DEST PORT, SEQUENCE NUM, and ACK NUM values.**
**答（典型值）：** SRC PORT = 1025 或以上（ephemeral），DEST PORT = **21**（FTP well-known port），SEQUENCE NUM = 起始值，ACK NUM = 0。以畫面實際數值為準。

> **Answer:** Source port is ephemeral (1025+), destination port is 21 (FTP); record the sequence/acknowledgement numbers exactly as shown.

**Q12：What is the value in the flag field？（flag field 值係咩？）**
**答：SYN。** 同 HTTP 一樣，FTP session 開始都係 SYN。

> **Answer:** SYN — the start of the FTP TCP session.

6 ➔ 關閉 PDU → 撳 **Capture/Forward** 直到一個**有 checkmark** 嘅 PDU 返到 FTP Client
7 ➔ 撳 PDU → **Inbound PDU Details**

**Q13：How are the port and sequence numbers different than before？（有咩唔同？）**
**答：** Ports **對調**（server source = port 21），sequence/acknowledgement numbers 改變——server 回覆 **SYN-ACK**。

> **Answer:** Ports are swapped (server uses port 21) and the sequence/acknowledgement numbers change — the server has replied with SYN-ACK.

8 ➔ 撳 **Outbound PDU Details** tab

**Q14：How are the port and sequence numbers different from the previous results？（同之前有咩唔同？）**
**答：** 今次係 client 嘅 **ACK**（完成 handshake 最後一步），SEQUENCE NUM 冇變，ACK NUM = 「server 嘅 sequence + 1」。

> **Answer:** This is the client's final ACK of the handshake; the sequence number stays the same and the acknowledgement number acknowledges the server's SYN.

9 ➔ 繼續撳 **Capture/Forward** 直到**第二個** PDU 返到 FTP Client（**唔同顏色**）→ 撳開 → **Inbound PDU Details** → scroll 過 TCP section

**Q15：What is the message from the server？（server 傳咗咩訊息？）**
**答：FTP server 嘅 banner／歡迎訊息，典型係 `220 ...`**（例如 "220 MultiServer FTP server (Version ...) ready"）——表示 FTP 連線已經建立好。

> **Answer:** The FTP server banner, typically starting with "220 ...", which announces that the FTP service is ready.

---

### Part 2c ➔ DNS traffic（UDP）

1 ➔ **Reset Simulation**
2 ➔ 重複 Part 1 嘅步驟產生 DNS traffic（DNS Client → Command Prompt → `nslookup multiserver.pt.ptu`）
3 ➔ **Edit Filters** → 淨係揀 **DNS** 同 **UDP**
4 ➔ 撳 DNS PDU envelope 打開 → 睇 **OSI Model** tab（outbound PDU）

**Q16：What is the Layer 4 protocol？（Layer 4 係咩 protocol？）**
**答：UDP。**

> **Answer:** UDP — DNS uses the connectionless UDP protocol.

**Q17：Are these communications considered to be reliable？（可靠嗎？）**
**答：唔可靠（No）。** UDP 冇確認機制，封包送唔送到係唔保證嘅。

> **Answer:** No — UDP has no acknowledgements or retransmission, so it is unreliable.

5 ➔ 開 **Outbound PDU Details** tab → 搵 **UDP** section → 記低 SRC PORT 同 DEST PORT

**Q18：Record the SRC PORT and DEST PORT values.（記低 port numbers）**
**答（典型值）：** SRC PORT = 1025 或以上（ephemeral），DEST PORT = **53**（DNS well-known port）。以畫面實際數值為準。

> **Answer:** Source port is ephemeral (1025+), destination port is 53 (DNS).

**Q19：Why are there no sequence and acknowledgement numbers？（點解冇 sequence 同 acknowledgement numbers？）**
**答：因為 UDP 係 connectionless／不可靠。** UDP header 只有 source port、destination port、length 同 checksum，根本冇序號同確認欄位——UDP 唔需要追蹤傳送順序，亦唔會確認接收。

> **Answer:** UDP is connectionless and unreliable; its header has no sequence or acknowledgement fields because UDP does not track ordering and does not acknowledge receipt.

6 ➔ 關閉 PDU → 撳 **Capture/Forward** 直到一個**有 checkmark** 嘅 PDU 返到 DNS Client
7 ➔ 撳 PDU → **Inbound PDU Details**

**Q20：How are the port and sequence numbers different than before？（有咩唔同？）**
**答：** Ports **對調**咗（server source = port 53，client destination = 原本個 ephemeral port）；UDP 依然冇 sequence / acknowledgement numbers。

> **Answer:** The ports are swapped (server replies from port 53); there are still no sequence or acknowledgement numbers because it is UDP.

**Q21：What is the last section of the PDU called？What is the IP address for the name multiserver.pt.ptu？（最後一個 section 叫咩？multiserver.pt.ptu 對應邊個 IP？）**
**答：Answers（答案 section）。** 裡面列出查詢結果：`multiserver.pt.ptu` 對應 **192.168.1.254**。

> **Answer:** The last section is the DNS Answers section; the resolved IP address for multiserver.pt.ptu is 192.168.1.254.

---

### Part 2d ➔ Email traffic（TCP）

1 ➔ **Reset Simulation**
2 ➔ 重複 Part 1 嘅步驟 send email 俾 `user@multiserver.pt.ptu`
3 ➔ **Edit Filters** → 淨係揀 **POP3**、**SMTP** 同 **TCP**
4 ➔ 撳**第一個** PDU envelope → **Outbound PDU Details** tab → scroll 到最後 section

**Q22：What transport layer protocol does email traffic use？（Email 用邊個 transport layer protocol？）**
**答：TCP。**

> **Answer:** TCP — email (SMTP/POP3) runs over TCP.

**Q23：Are these communications considered to be reliable？（可靠嗎？）**
**答：可靠（Yes）。**

> **Answer:** Yes — email uses TCP, so it is reliable.

**Q24：Record the SRC PORT, DEST PORT, SEQUENCE NUM, and ACK NUM values. What is the flag field value？（記低數值；flag field 係咩？）**
**答（典型值）：** SRC PORT = 1025 或以上（ephemeral），DEST PORT = **25**（SMTP well-known port）；flag = **SYN**（session 開始）。以畫面實際數值為準。

> **Answer:** Source port is ephemeral, destination port is 25 (SMTP); the flag is SYN because this starts the TCP session.

5 ➔ 關閉 PDU → 撳 **Capture/Forward** 直到一個**有 checkmark** 嘅 PDU 返到 E-Mail Client
6 ➔ 撳 TCP PDU envelope → **Inbound PDU Details**

**Q25：How are the port and sequence numbers different than before？（有咩唔同？）**
**答：** Ports **對調**（server source = port 25），sequence / acknowledgement numbers 改變——server 回覆 **SYN-ACK**。

> **Answer:** Ports are swapped and the sequence/acknowledgement numbers change — the server replied with SYN-ACK.

7 ➔ 撳 **Outbound PDU Details** tab

**Q26：How are the port and sequence numbers different from the previous two results？（同之前兩個結果有咩唔同？）**
**答：** 今次係 client 完成 handshake 嘅 **ACK**，SEQUENCE NUM 冇變，ACK NUM = 「server 嘅 sequence + 1」——session 正式建立。

> **Answer:** This is the client's ACK completing the handshake; the acknowledgement number now acknowledges the server's SYN.

8 ➔ 留意有**第二個唔同顏色**嘅 PDU，係 E-Mail Client 準備 send 俾 MultiServer 嘅（email communication 嘅開始）→ 撳開 → **Outbound PDU Details**

**Q27：How are the port and sequence numbers different from the previous two PDUs？（有咩唔同？）**
**答：** 呢個係真正嘅 SMTP 通訊開始（例如 `HELO`／`MAIL FROM` 指令）：DEST PORT 依然係 25，SEQUENCE NUM 已增加（data 開始傳），ACK flag set。

> **Answer:** This PDU carries the actual SMTP commands (e.g. HELO / MAIL FROM): destination port is still 25, the sequence number has advanced and the ACK flag is set.

**Q28：What email protocol is associated with TCP port 25？What protocol is associated with TCP port 110？（邊個 protocol 用 TCP port 25？邊個用 port 110？）**
**答：** Port **25 = SMTP**（Simple Mail Transfer Protocol，負責**送出** email）；port **110 = POP3**（Post Office Protocol v3，負責**接收** email）。

> **Answer:** TCP port 25 is SMTP (sending mail) and TCP port 110 is POP3 (receiving mail).

---

## 💻 關鍵 CLI 指令庫

### 教材內出現嘅指令（本 Lab 必用，全部係 PC Command Prompt 指令）

```text
! ===== Windows / PC（Command Prompt）=====

ping -n 1 192.168.1.255       ! Windows ping：-n 1 只 send 1 個 request（預設 4 個）；
                              ! 192.168.1.255 係 broadcast address，ping 佢令 LAN 所有設備回應、填滿 ARP tables
ftp 192.168.1.254             ! 同 192.168.1.254 建立 FTP 連線（TCP port 21）
nslookup multiserver.pt.ptu   ! DNS 查詢：將 hostname「multiserver.pt.ptu」解析做 IP address（UDP port 53）
```

> **Lab commands:** `ping -n 1 <broadcast>` sends a single echo request to fill ARP tables; `ftp <ip>` opens an FTP session; `nslookup <hostname>` performs a DNS name resolution.

### 延伸必備指令（Practical Test 隨時會考，全部背熟）

```text
! ===== Windows / PC（Command Prompt）=====

ipconfig                      ! 顯示本機 IP address / subnet mask / default gateway
ipconfig /all                 ! 顯示完整設定，包括 MAC address（Physical Address）
arp -a                        ! 顯示 ARP table（IP ↔ MAC 對應）
netstat -n                    ! 顯示本機 active TCP/UDP connections 同 port numbers（睇邊個 app 用緊邊個 port）
ping 192.168.1.254            ! 測試連通性：向 server 傳 4 個 ICMP echo request

! ===== Cisco IOS（Router / Switch，本 Lab 觀察為主，以下係其他 PT Lab 常用參考）=====

enable                        ! 由 user EXEC mode 進入 privileged EXEC mode
configure terminal            ! 進入 global configuration mode（簡稱 config t）
interface g0/0                ! 進入指定 interface 嘅 config mode
ip address 192.168.1.1 255.255.255.0   ! 設定 interface 嘅 IP address 同 subnet mask
no shutdown                   ! 啟動（enable）interface
exit                          ! 返回上一層 mode
show running-config           ! 顯示目前生效嘅設定
show ip interface brief       ! 顯示所有 interface 嘅 IP、狀態（up/down）、protocol
```

> **CLI command rules:** PC commands run in the client's Command Prompt; `ping -n <count>` controls the number of requests. Cisco IOS commands are case-insensitive; `show` commands are read-only, while configuration commands require `configure terminal`.

---

## 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| Simulation Panel 冇 PDU / 空白 | 未切換去 **Simulation mode**，或者 app 根本冇執行過 | 確認右下角係 Simulation mode；重新行一次產生 traffic 嘅步驟（如再打 `ftp 192.168.1.254`） |
| PDU 太多好亂，分唔清邊個係邊個 | 冇用 Edit Filters 篩選 | **Edit Filters** → **Show All/None** 清走晒 → 淨係揀想睇嘅 protocol（如 HTTP + TCP） |
| HTTP PDU 好耐先出現 | **唔係 error！** TCP 係 connection-oriented，要先完成 three-way handshake（SYN → SYN-ACK → ACK）先可以傳 data | 繼續撳 **Capture/Forward**，先會見到 TCP PDU，之後先到 HTTP PDU |
| 撳 Capture/Forward 好多次都冇新 PDU | Traffic 已經行完（全部到 destination），或者冇新 traffic 產生 | 撳 **Reset Simulation** 再重新產生 traffic |
| 喺 PDU Details 搵唔到 TCP / UDP section | Scroll 唔夠低，或者揀咗錯嘅 tab | 揀 **Outbound / Inbound PDU Details** tab，scroll 到最後一、兩個 section |
| 睇唔到 Flags field | 睇錯 section；Flags 係喺 **TCP** section、**Window** field 隔籬 | 揀 TCP section；6 個位順序係 URG ACK PSH RST SYN FIN |
| FTP 連線冇 banner 訊息 | Filters 漏咗 TCP，或者未等到 server 回覆 | 篩選 **FTP + TCP**；繼續 Capture/Forward 直到有 checkmark 嘅 PDU 返嚟 |
| DNS PDU 冇 Answers section | 揀咗 DNS **request**（outbound）而唔係 **reply**（inbound） | 揀有 **checkmark** 嘅 inbound PDU（即 server 回覆嗰個） |
| 做下一 Part 之前冇 Reset，Simulation Panel 仲有舊 PDU | 上一個 Part 嘅 traffic 未清 | 每個 Part 開始前一定撳 **Reset Simulation** |
| 教材檔案有 `<w:...>` XML 雜訊 | 原檔係 Word 轉出嚟嘅 XML 殘留 | 忽略佢；淨係跟「Instruction」正文做 |

> **Debug notes:** A missing PDU usually means you are in the wrong mode or the application never ran; "no new PDU" usually means the simulation finished — reset and regenerate; a missing section usually means you are on the wrong tab or the wrong PDU.

---

## 📝 測驗常見題型（Practical Test 應試重點）

### 題型 1 ➔ 產生指定 traffic（實操題，必考）

- 要產生 **HTTP** traffic：HTTP Client → Web Browser → URL `192.168.1.254` → Go
- 要產生 **FTP** traffic：FTP Client → Command Prompt → `ftp 192.168.1.254`
- 要產生 **DNS** traffic：DNS Client → Command Prompt → `nslookup multiserver.pt.ptu`
- 要產生 **Email** traffic：E-Mail Client → E Mail tool → Compose → Send（To: `user@multiserver.pt.ptu`）
  > Answer points: HTTP uses the Web Browser, FTP uses `ftp`, DNS uses `nslookup`, email uses the E-Mail tool — remember which client runs which application.

### 題型 2 ➔ TCP vs UDP 判斷題（從 PDU 內容分辨，最核心）

- 睇 PDU Details 有冇 **SEQUENCE NUM / ACK NUM**：有 = TCP；冇 = UDP。
- 睇 header 有冇 **flags field**：有（SYN/ACK/FIN…）= TCP；冇 = UDP。
- 問「reliable?」：TCP = Yes；UDP = No。
  > Answer points: TCP segments carry sequence and acknowledgement numbers plus flags and are reliable; UDP datagrams carry only ports, length and checksum and are unreliable.

### 題型 3 ➔ Port numbers 題（必背表）

| Service | Transport | Well-known port | Reliable? | 備註 |
|---|---|---|---|---|
| HTTP | TCP | 80 | Yes | 要完成 three-way handshake 先傳 data |
| FTP | TCP | 21 | Yes | Server banner 以 `220` 開頭 |
| DNS | UDP | 53 | No | 冇 sequence / acknowledgement numbers |
| SMTP | TCP | 25 | Yes | 負責**送出** email |
| POP3 | TCP | 110 | Yes | 負責**接收** email |

- Client 端 source port 永遠係 **ephemeral port（1024–65535，Packet Tracer 常見 1025 起）**；destination port 先係 well-known port。
  > Answer points: The client uses an ephemeral source port (1024–65535); the well-known destination ports are HTTP 80, FTP 21, DNS 53, SMTP 25, POP3 110.

### 題型 4 ➔ Three-way handshake 題

- 三步順序：**SYN → SYN-ACK → ACK**。client 出 SYN，server 回 SYN-ACK，client 再出 ACK，session 先建立。
- 常問「點解 HTTP PDU 咁耐先出現？」→ 因為 handshake 未完，data 未開始傳。
- 常問「Inbound PDU 同 Outbound 有咩唔同？」→ SRC/DEST ports 對調、sequence/acknowledgement numbers 改變。
  > Answer points: The three-way handshake is SYN, SYN-ACK, ACK; inbound replies swap the source/destination ports and change the sequence/acknowledgement numbers.

### 題型 5 ➔ TCP Flags 題

- 6 個 flag 位（由左至右）：**URG ACK PSH RST SYN FIN**。
- 第一眼見到嘅 TCP PDU（session 開始）→ **SYN**；server 回覆 → **SYN-ACK**；之後 data PDU → **ACK（可加 PSH）**。
  > Answer points: The six TCP flags are URG, ACK, PSH, RST, SYN, FIN; the first segment of a session sets SYN, the reply sets SYN+ACK, and data segments set ACK.

### 題型 6 ➔ Multiplexing 概念題

- 常問「點解同一時間一條 wire 每個方向只可以有一個 PDU？」→ 物理上一個通道一次只可以傳一個訊號，多個 conversation 要排隊輪流用——**multiplexing（queuing）**。
- 常問「唔同顏色代表咩？」→ 唔同 protocol 類型嘅 PDU。
  > Answer points: Only one PDU can cross a wire in each direction at a time; PDUs from different applications are queued and share the wire — this is multiplexing.

> **Exam tips:** 每次開始新 Part 先撳 **Reset Simulation**；用 **Edit Filters** 淨係顯示要考嘅 protocol；答 port / sequence / ack 題目時**照抄畫面顯示嘅實際數值**；答「why」題目時講得出「TCP = connection-oriented + reliable，UDP = connectionless + unreliable」。

---

## ✅ 完成 Checklist（做完 Lab 前對一次）

- [ ] 用 `ping -n 1 192.168.1.255` 填滿 ARP tables
- [ ] 產生齊 HTTP（browser）、FTP（`ftp`）、DNS（`nslookup`）、Email（E Mail tool）四種 traffic
- [ ] 答啱 multiplexing：一條 wire 一個方向同一時間只有一個 PDU，唔同顏色 = 唔同 protocol
- [ ] 答啱 HTTP PDU 慢出現嘅原因 = TCP three-way handshake 未完
- [ ] 答啱 HTTP / FTP PDU 係 reliable（TCP），DNS PDU 唔可靠（UDP）
- [ ] 背到 6 個 TCP flags：URG ACK PSH RST SYN FIN；答啱第一個 PDU 係 SYN
- [ ] 答啱 Inbound PDU 嘅 ports 對調、sequence / ack numbers 改變
- [ ] 答啱 well-known ports：HTTP 80、FTP 21、DNS 53、SMTP 25、POP3 110
- [ ] 答啱 DNS 冇 sequence / ack numbers 因為 UDP connectionless
- [ ] 答啱 DNS Answers section 顯示 `multiserver.pt.ptu` = 192.168.1.254
- [ ] 答啱 FTP server message 係 `220` banner、SMTP = port 25、POP3 = port 110
