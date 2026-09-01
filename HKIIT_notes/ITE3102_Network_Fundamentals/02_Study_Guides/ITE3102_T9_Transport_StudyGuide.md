# ITE3102 Network Fundamentals — Tutorial 9 雙語練習題解 Guide（Transport Layer: TCP/UDP）

> 本 Guide 對應教材：《Network Fundamentals Tutorial 9 – Transport Layer》。逐題保留英文題目原文，答案與解說以香港繁體中文撰寫；所有核心定義、技術特徵與答題重點均以英文標準定義句（English Blockquote）呈現，英文專有名詞一律保留原文，方便考試直接用英文作答。

---

## 📝 練習概要 (Summary)

本練習（Tutorial 9: Transport Layer）集中考核傳輸層（Transport Layer）的兩大核心協議——**TCP**（Transmission Control Protocol）與 **UDP**（User Datagram Protocol）。課題覆蓋六大範疇：① TCP 與 UDP 的特性對比（可靠性、連線導向與否、序號排序重組、額外負擔 Overhead）；② 常用應用程式（Application）所用嘅傳輸協議判斷（例如 Telnet 用 TCP）；③ 傳輸層埠號（Port Number）與 **Socket**（IP 位址 + 埠號）的識別；④ TCP 三次交握（Three-Way Handshake）與四次揮手（Connection Termination）的控制位元（Control Bits）及序號（Sequence Number）運算；⑤ TCP/UDP 標頭（Header）欄位分辨與共同欄位；⑥ 滑動視窗（Sliding Window）的數值計算與壅塞控制（Congestion Control）。

考核重點分三類：第一類係「概念判斷」——某特性屬於 TCP 定 UDP、某應用揀 TCP 定 UDP；第二類係「標頭與欄位識別」——分辨 TCP/UDP 標頭、指出 4 個共同欄位、解釋 Sequence Number 與 Acknowledgment Number 嘅作用；第三類係「數值計算」——三次交握序號推算（ISN + 1 規則）、滑動視窗剩餘窗口計算。呢三類都係 ITE3102 考試常見題型，學生若能熟記標準英文定義句（例如 "TCP is a connection-oriented, reliable protocol."），即可穩取全部分數。

---

## 🎯 練習目標 (Objectives)

完成本練習後，你應能掌握以下能力：

| 能力（繁體中文） | 英文對照 (English) |
|---|---|
| 分辨 TCP 與 UDP 的核心特性 | Distinguish the characteristics of TCP and UDP |
| 判斷應用程式使用 TCP 定 UDP | Identify whether an application uses TCP or UDP |
| 按應用需求（順序／延遲／丟失容忍度）選擇合適協議 | Choose the suitable protocol based on application requirements |
| 識別埠號範圍（IANA）與 Socket 的組成 | Identify port number ranges and the structure of a socket |
| 解讀三次交握與四次揮手的控制位元及序號推算 | Interpret control bits and sequence numbers in connection establishment and termination |
| 分辨 TCP 與 UDP 標頭欄位 | Distinguish TCP and UDP header fields |
| 計算滑動視窗（Send Window）大小 | Calculate the size of the sliding (send) window |
| 用標準英文答題句作答 | Answer exam questions with standard English phrases |

---

## ✏️ 題目與答案 Walkthrough

### Q1. 特性分類：屬於 UDP 定 TCP？

**題目原文 (Question)**：Identify each of the following characteristics as belonging to UDP or TCP：Reliable / Delivers data as it arrives / Reassembles data in sequenced order / Low overhead / Resends lost data / Acknowledge data / Does not require acknowledgements

**答案 (Answer)**：

| Characteristic（特性） | Protocol（協議） |
|---|---|
| Reliable（可靠） | **TCP** |
| Delivers data as it arrives（數據一到即交付） | **UDP** |
| Reassembles data in sequenced order（按序號順序重組數據） | **TCP** |
| Low overhead（額外負擔低） | **UDP** |
| Resends lost data（重傳丟失數據） | **TCP** |
| Acknowledge data（確認數據） | **TCP** |
| Does not require acknowledgements（毋須確認） | **UDP** |

**解題思路 (Explanation)**：判斷口訣——凡是「可靠、有序、確認、重傳、連線導向」都係 TCP；凡是「快、輕量、無確認、無序、即到即用」都係 UDP。TCP 透過 Acknowledgment（ACK）確認、Sequence Number 排序重組、逾時重傳（Retransmission）保證數據完整有序，所以 Reliable、Resends lost data、Acknowledge data、Reassembles data in sequenced order 全部屬 TCP；UDP 係 best-effort 協議，冇 ACK、冇序號、冇重傳，overhead 低，數據一到即交畀應用層（例如串流播放唔等重組），所以 Delivers data as it arrives、Low overhead、Does not require acknowledgements 屬 UDP。

> **TCP** is a connection-oriented, reliable protocol that acknowledges data, reassembles segments in sequence, and retransmits lost data.
> **UDP** is a connectionless, best-effort protocol with low overhead; it delivers datagrams as they arrive and requires no acknowledgements.

**Exam Answer Phrase**："TCP is reliable because it acknowledges data, reassembles segments in sequence, and resends lost data; UDP has low overhead and requires no acknowledgements."

---

### Q2. Telnet 使用邊個協議？

**題目原文 (Question)**：Identify the delivery method used by the protocols below (TCP/UDP/Both)：Protocol：Telnet

**答案 (Answer)**：**TCP**（Telnet 用 TCP，預設 port 23）

**解題思路 (Explanation)**：Telnet（遠端登入）需要可靠、有序嘅字元傳輸，任何一個字元缺失或次序錯亂都會搞亂整個 session，所以必須用 TCP。判斷方法：凡係需要「完整、無錯、有序」傳輸嘅應用（Web、電郵、檔案傳輸、遠端登入）都用 TCP；只有對延遲敏感、可容忍少量丟失嘅 real-time 應用先會用 UDP。

> Telnet is an application-layer protocol that uses **TCP** (port 23) because it requires a reliable, ordered data stream.

**Exam Answer Phrase**："Telnet uses TCP because it requires a reliable and ordered connection."

---

### Q3. 應用例子與協議選擇

**題目原文 (Question)**：
- (i) Give 2 applications that use TCP：__________, __________
- (ii) Give 2 applications that use UDP：__________, __________
- (iii) Is TCP or UDP better for an application whose segments must arrive in a very specific sequence？_________
- (iv) Is TCP or UDP better for an application that can tolerate some data loss but delays in transmission are unacceptable？_________

**答案 (Answer)**：
- (i) 用 TCP 嘅應用：**HTTP（Web）**、**FTP（檔案傳輸）**（亦可答 HTTPS、SSH、SMTP、Telnet、POP3、IMAP）
- (ii) 用 UDP 嘅應用：**DNS**、**DHCP**（亦可答 TFTP、SNMP、VoIP、視訊串流、線上遊戲）
- (iii) **TCP**
- (iv) **UDP**

**解題思路 (Explanation)**：
- (i)(ii) 記憶法：「要可靠傳輸嘅嘢」用 TCP（HTTP、FTP、SMTP、Telnet）；「查詢、廣播、即時串流」用 UDP（DNS 查詢、DHCP 派 IP、VoIP 語音、視訊直播）。
- (iii) 如果 segments 必須以特定順序到達，一定要 TCP——TCP 用 Sequence Number 將亂序到達嘅 segments 排序重組，先至交畀應用層；UDP 冇序號，數據亂序到達亦照交。
- (iv) 如果可容忍少量數據丟失、但延遲完全唔可以接受，揀 UDP——UDP 冇 connection setup、冇 ACK 等待、冇重傳，端到端延遲低，適合 real-time 應用（VoIP、視像會議）；TCP 一有丟包就要重傳，會造成明顯延遲。

> TCP guarantees **in-order delivery** by reassembling segments using sequence numbers.
> UDP has no acknowledgment or retransmission, so it offers **lower latency** and suits real-time applications that tolerate some loss.

**Exam Answer Phrase**："(iii) TCP, because it reassembles segments in the correct sequence. (iv) UDP, because it tolerates some data loss but minimizes transmission delay."

---

### Q4. 邊個 Header 參數將數據導向正確應用程式？

**題目原文 (Question)**：Consider the topology below. Which parameter in the TCP/UDP header is used to direct data for different applications to the correct application？____________________

**答案 (Answer)**：**Port Number（埠號）**——更準確嚟講係 **Destination Port（目的埠號）**

**解題思路 (Explanation)**：一部電腦同時行好多應用程式（Web browser、電郵 client、DNS client 等），傳輸層靠 **Port Number** 分辨數據屬於邊個應用程式（例如 HTTP = 80、DNS = 53、Telnet = 23）。Source Port 標示發送端應用，Destination Port 標示接收端應用。記憶法：**IP 負責「去邊部機」，Port 負責「機上邊個程式」**。

> The **port number** in the TCP/UDP header identifies the application (process) that should receive the data; the destination port directs each segment to the correct application on the destination host.

**Exam Answer Phrase**："The port number is used to direct data for different applications to the correct application."

---

### Q5. Socket 識別

**題目原文 (Question)**：Identify the sockets for a datagram that originates on the PC (with port 2345 selected) destined for the web server.
Source socket：_____________________
Destination socket：_____________________

**答案 (Answer)**：
- **Source socket**：PC 嘅 IP 位址 : **2345**（例如 192.168.1.10:2345）
- **Destination socket**：Web server 嘅 IP 位址 : **80**（例如 203.0.113.8:80）

**解題思路 (Explanation)**：**Socket = IP 位址 + Port 號碼**，用嚟唯一識別一個通訊端點。來源端（PC）自己揀一個 dynamic port（2345），配合自己嘅 IP 組成 source socket；目的端係 Web server，HTTP 預設用 well-known port **80**，配合 server 嘅 IP 組成 destination socket。注意：題目冇提供實際 IP，作答時寫「PC IP:2345」同「Web server IP:80」已經正確；若圖中有 IP，照抄即可。

> A **socket** is the combination of an IP address and a port number; it uniquely identifies one end point of a communication.

**Exam Answer Phrase**："Source socket = PC IP address : 2345; Destination socket = web server IP address : 80."

---

### Q6. TCP 三次交握 (Three-Way Handshake)

**題目原文 (Question)**：Consider the TCP connection establishment sequence.
(a) Write down the control bit(s) turned on in each step.
(b) If sequence number N1 = 100 (select a value)：N3 = _______, N4 = _______
(c) If sequence number N2 = 300 (select a value)：N5 = _______

**答案 (Answer)**：
- (a) Step 1：**SYN**；Step 2：**SYN + ACK**；Step 3：**ACK**
- (b) N1 = 100 → **N3 = 101**，**N4 = 101**
- (c) N2 = 300 → **N5 = 301**

（圖中標號對應：N1 = client 第一個 SYN 的 Sequence Number；N2 = server 回應 SYN+ACK 的 Sequence Number；N3 = SYN+ACK 內的 Acknowledgment Number；N4 = 第三步 ACK 的 Sequence Number；N5 = 第三步 ACK 的 Acknowledgment Number。）

**解題思路 (Explanation)**：三次交握三步曲：① client 送 **SYN**（seq = N1 = 100）；② server 回 **SYN+ACK**（seq = N2 = 300，ack = N1 + 1）；③ client 送 **ACK**（seq = N1 + 1，ack = N2 + 1）。核心規則一條：**Acknowledgment Number = 對方上一個 Sequence Number + 1**（因為 SYN 旗標會耗用一個序號）；發送方下一步嘅 Sequence Number 亦係自己上一個 +1。所以：N1 = 100 → N3 = N1 + 1 = 101、N4 = N1 + 1 = 101；N2 = 300 → N5 = N2 + 1 = 301。考試時無論數字點改，都係用「+1 規則」計。

> In the three-way handshake：① the client sends **SYN**；② the server replies with **SYN + ACK**；③ the client sends **ACK**. The acknowledgment number equals the received sequence number plus one (e.g., ack = N1 + 1), because the SYN flag consumes one sequence number.

**Exam Answer Phrase**："Step 1: SYN; Step 2: SYN+ACK; Step 3: ACK. With N1 = 100, N3 = N1 + 1 = 101 and N4 = N1 + 1 = 101; with N2 = 300, N5 = N2 + 1 = 301."

---

### Q7. TCP 四次揮手（Connection Termination）

**題目原文 (Question)**：Consider the TCP termination process. Write down the control bit turned on in each step.

**答案 (Answer)**：
- Step 1（client → server）：**FIN**
- Step 2（server → client）：**ACK**
- Step 3（server → client）：**FIN**
- Step 4（client → server）：**ACK**

**解題思路 (Explanation)**：TCP 係 full-duplex（全雙工），兩邊各自獨立關閉自己嘅傳送方向，所以終止連線要「四次揮手」：先由一方送 **FIN** 表示「我冇數據要送喇」，對方回 **ACK** 確認；之後另一方亦送 **FIN**，最初嗰方再回 **ACK**。口訣：**FIN → ACK → FIN → ACK**。對比三次交握（SYN → SYN+ACK → ACK），終止係對稱嘅四次。

> TCP termination uses a four-way handshake：**FIN, ACK, FIN, ACK** — each side closes its own direction independently (half-close).

**Exam Answer Phrase**："The TCP termination sequence is FIN, ACK, FIN, ACK."

---

### Q8. TCP 定 UDP 標頭？

**題目原文 (Question)**：Consider the transport segment header below：
Source Port (16) | Destination Port (16) | Length (16) | Checksum (16) | Application layer Data (Size varies)
State whether it is a TCP header or an UDP header. _____________

**答案 (Answer)**：**UDP header**

**解題思路 (Explanation)**：呢個 header 只有 4 個欄位、合共 **8 bytes**：Source Port、Destination Port、Length、Checksum，之後直接係 Application Data。佢冇 Sequence Number、冇 Acknowledgment Number、冇 Window、冇 Control Bits——呢啲全部係 TCP 先有嘅欄位；而且 **Length 欄位正正係 UDP 標頭嘅特徵**（TCP 冇獨立 Length 欄位，長度由 IP header 推算）。所以呢個係 UDP 標頭。

> The **UDP header** has only four fields — Source Port, Destination Port, Length, Checksum (8 bytes in total) — followed directly by the application data. TCP headers contain additional fields such as Sequence Number, Acknowledgment Number and Window.

**Exam Answer Phrase**："It is a UDP header, because it contains only Source Port, Destination Port, Length and Checksum."

---

### Q9. 邊個協議 Overhead 較少？

**題目原文 (Question)**：Which protocol uses less overhead - TCP or UDP？

**答案 (Answer)**：**UDP**

**解題思路 (Explanation)**：UDP 標頭只有 **8 bytes**；TCP 標頭最少 **20 bytes**（未計 Options）。TCP 要攜帶 Sequence Number、Acknowledgment Number、Window、Control Bits 等眾多欄位，所以 overhead 大；UDP 精簡，overhead 細——呢個亦係 UDP 適合 real-time 應用嘅原因之一。

> UDP uses less overhead：its header is only 8 bytes, whereas the TCP header is at least 20 bytes.

**Exam Answer Phrase**："UDP uses less overhead because its header is only 8 bytes, compared with 20 bytes for TCP."

---

### Q10. TCP 與 UDP 的 4 個共同欄位

**題目原文 (Question)**：The TCP header has 20 bytes of overhead to encapsulate the application layer data：Sequence Number (32)、Acknowledgement Number (32)、Header Length (4)、Reserved、Control Bits、Window (16)、Urgent (16)、Options (0 or 32 if any)。Identify the 4 fields that are common with UDP：________, ________, _________, _________

**答案 (Answer)**：**Source Port, Destination Port, Length, Checksum**

**解題思路 (Explanation)**：UDP 標頭得 4 個欄位（Source Port、Destination Port、Length、Checksum），而呢 4 個欄位 TCP 都有，所以就係兩個協議嘅共同欄位。題目列出嘅 Sequence Number、Acknowledgment Number、Header Length、Control Bits、Window、Urgent 全部係 **TCP 獨有**。記憶法：「UDP 得 4 樣嘢，而呢 4 樣 TCP 都齊」；順序就係 UDP 標頭由左至右嗰 4 個。

> The four fields common to both the TCP and UDP headers are：**Source Port, Destination Port, Length and Checksum** — exactly the four fields of the UDP header.

**Exam Answer Phrase**："The four common fields are Source Port, Destination Port, Length and Checksum."

---

### Q11. TCP 用咩資料重組同排序 segments？

**題目原文 (Question)**：What information is used by TCP to reassemble and reorder received segments？___________

**答案 (Answer)**：**Sequence Number（序號）**（配合 Acknowledgment Number 一齊使用）

**解題思路 (Explanation)**：每個 TCP segment 嘅 header 都有 **Sequence Number**，標示呢段數據喺整個 byte stream 入面由第幾 byte 開始。接收端收到 segments 後按 Sequence Number 排返正確次序、偵測有冇缺失，先至將完整有序嘅數據交畀應用層。UDP 冇呢個機制，所以數據可能亂序。

> TCP uses the **Sequence Number** in each segment header to reassemble and reorder the received segments into the correct byte order.

**Exam Answer Phrase**："TCP uses the sequence number to reassemble and reorder the received segments."

---

### Q12. Acknowledgment Number 代表咩？

**題目原文 (Question)**：During a TCP session, a destination device sends an acknowledgement number to the source device. What does the acknowledgment number represent？___________________________

**答案 (Answer)**：佢代表接收端**期望收到嘅下一個 byte 嘅 Sequence Number**，即係話「呢個號碼之前嘅所有 byte 都已經成功收到」。

**解題思路 (Explanation)**：ACK Number 係累積性（cumulative）嘅：如果接收端成功收到 byte 1 至 5000，就會回送 ack = **5001**，通知 sender「5000 或之前全部收到，你下次由 byte 5001 開始送」。公式：**Ack = 最後成功收到嘅 byte 序號 + 1**。呢個機制令 TCP 可以作流量控制同重傳判斷。

> The acknowledgment number indicates the **sequence number of the next byte** the receiver expects to receive；all bytes before that number have been successfully received (ack = last received byte + 1).

**Exam Answer Phrase**："The acknowledgment number represents the sequence number of the next byte expected by the receiver (the last received byte plus one)."

---

### Q13. 邊個協議較可靠？

**題目原文 (Question)**：Which protocol is more reliable - TCP or UDP？____________

**答案 (Answer)**：**TCP**

**解題思路 (Explanation)**：TCP 提供 ACK 確認、逾時重傳（Retransmission）、排序重組（Sequencing）、流量控制（Flow Control），所以係 reliable protocol；UDP 係 best-effort，唔保證送達、唔保證次序，所以唔可靠但快。考試常問「邊個可靠」，答案永遠係 TCP。

> TCP is more reliable because it provides acknowledgements, retransmission, sequencing and flow control；UDP is a best-effort, connectionless protocol.

**Exam Answer Phrase**："TCP is more reliable than UDP."

---

### Q14. IANA 埠號範圍配對

**題目原文 (Question)**：Match the appropriate Port Number Range on the left to the appropriate Port Group defined in the Internet Assigned Number Authority (IANA)：
Port Number Range：0 to 1023 / 1024 to 49151 / 49152 to 65535
Port Group：Registered ports / Well-known ports / Private and/or dynamic ports

**答案 (Answer)**：

| Port Number Range | Port Group（埠號組） |
|---|---|
| 0 – 1023 | **Well-known ports**（知名埠號） |
| 1024 – 49151 | **Registered ports**（註冊埠號） |
| 49152 – 65535 | **Private and/or dynamic ports**（私人／動態埠號） |

**解題思路 (Explanation)**：**Well-known ports（0–1023）** 畀常見伺服器服務用，例如 HTTP = 80、HTTPS = 443、DNS = 53、Telnet = 23、FTP = 21；**Registered ports（1024–49151）** 畀已註冊嘅應用程式用，例如 MySQL = 3306；**Private/dynamic ports（49152–65535，又稱 ephemeral ports）** 通常由 client 臨時揀用（例如 Q5 嘅 2345 就係 dynamic port）。記憶法：由 0 開始順序係「知名 → 註冊 → 動態」，三個範圍頭一個數字分別係 0、1024、49152。

> Ports **0–1023** are well-known ports, **1024–49151** are registered ports, and **49152–65535** are private (dynamic) ports, as defined by IANA.

**Exam Answer Phrase**："0–1023 = Well-known ports; 1024–49151 = Registered ports; 49152–65535 = Private/dynamic ports."

---

### Q15. 滑動視窗 (Sliding Window) 計算

**題目原文 (Question)**：Computer A would like to send data to computer B. When the TCP session is established, A and B agree on the initial window size as 10000 (bytes) and MSS (maximum segment size) as 1460 (bytes). Starting with the first byte, byte number 1, the last byte PC A can send without receiving an acknowledgment is byte 10,000 (this is A's send window).
(a) B made an acknowledgement after A has sent 2 segments. How will A adjust its Send window？Send window = ______
(b) A continues to send a segment of 1460 bytes to B and B acknowledged. How will A adjust again？Send window = ______
(c) If A determines that TCP segments are either not being acknowledged or not acknowledged in a timely manner, what can it do？__________________________________

**答案 (Answer)**：
- (a) Send window = **7080 bytes**（10000 − 2 × 1460 = 10000 − 2920）
- (b) Send window = **5620 bytes**（7080 − 1460）
- (c) A 會**縮細（reduce）自己的 Send Window／減慢發送速率**，並觸發重傳機制——即係執行壅塞控制（Congestion Control）。

**解題思路 (Explanation)**：**Send Window（滑動視窗）** 代表「未收到 ACK 之前，最多可以送出幾多 byte 數據」。A 每送出一個 segment（每個最多 MSS = 1460 bytes），未確認嘅數據就增加，視窗剩餘額度就相應減少：
- 送出 2 個 segment = 2 × 1460 = **2920 bytes** → 剩餘視窗 = 10000 − 2920 = **7080 bytes**。
- 再送出 1 個 segment（1460 bytes）→ 剩餘視窗 = 7080 − 1460 = **5620 bytes**。

補充重點：當 B 嘅 ACK 到達，視窗會**向前滑動（slide）**——左邊界推進到已確認 byte 嘅下一位（例如 ack = 2921，A 就可繼續由 byte 2921 開始送新數據），視窗恢復容量。另外留意：7 個全 segment 會超出視窗（7 × 1460 = 10220 > 10000），所以喺收到 ACK 之前 A 最多只可以連送 6 個全 segment（6 × 1460 = 8760 ≤ 10000）。(c) 如果 segments 冇被確認、或者確認唔及時，代表網絡可能壅塞（congestion），A 應該縮細 Send Window（例如將窗口減半）、減慢傳送，等網絡紓緩。

> The send window is the maximum number of unacknowledged bytes a sender may transmit. Each segment sent shrinks the remaining window by the segment size (MSS = 1460 bytes)；when an acknowledgement arrives, the window slides forward. If acknowledgements are missing or delayed, the sender **reduces its send window and slows down** (congestion control).

**Exam Answer Phrase**："(a) Send window = 10000 − 2 × 1460 = 7080 bytes. (b) Send window = 7080 − 1460 = 5620 bytes. (c) A reduces its send window and slows down transmission (congestion control)."

---

## 📖 必考英文術語與答題句型庫

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| TCP (Transmission Control Protocol) | 連線導向、可靠嘅傳輸層協議，提供確認、重傳、排序與流量控制 | "TCP is a connection-oriented, reliable protocol." |
| UDP (User Datagram Protocol) | 無連線、best-effort 嘅傳輸層協議，overhead 低、延遲低 | "UDP is a connectionless, best-effort protocol with low overhead." |
| Transport Layer | OSI 第 4 層，負責端到端傳輸，提供 Port Number 分辨應用程式 | "The transport layer provides end-to-end communication between applications." |
| Port Number | 標示應用程式嘅號碼；IP 負責去邊部機，Port 負責機上邊個程式 | "The port number directs data to the correct application." |
| Socket | IP 位址 + Port 號碼嘅組合，唯一識別一個通訊端點 | "A socket is the combination of an IP address and a port number." |
| Sequence Number | TCP header 欄位，標示數據喺 byte stream 嘅位置，用嚟排序重組 | "TCP uses the sequence number to reassemble and reorder segments." |
| Acknowledgment Number | 表示接收端期望收到嘅下一個 byte 序號（= 最後收到 byte + 1） | "The acknowledgment number is the sequence number of the next byte expected." |
| SYN (Synchronize) | 三次交握第一步嘅控制位元，用嚟建立連線及同步序號 | "The client sends SYN to initiate the connection." |
| ACK (Acknowledgment) | 確認控制位元，表示已收到數據 | "ACK confirms that data has been received." |
| FIN (Finish) | 終止連線嘅控制位元，表示一方完成數據傳送 | "FIN indicates that the sender has finished transmitting data." |
| Three-Way Handshake | 建立 TCP 連線嘅三步過程：SYN → SYN+ACK → ACK | "The three-way handshake is SYN, SYN+ACK, ACK." |
| MSS (Maximum Segment Size) | 一個 segment 最多可攜帶嘅應用數據 byte 數（例：1460 bytes） | "Each segment carries at most MSS bytes of application data." |
| Sliding Window / Send Window | 未收到 ACK 前最多可送出嘅 byte 數；送出數據會縮細，收到 ACK 會前滑 | "The send window shrinks as data is sent and slides forward when an ACK is received." |
| Congestion Control | 網絡壅塞時縮細視窗、減慢傳送嘅機制 | "The sender reduces its send window to perform congestion control." |
| Well-known Ports | IANA 埠號 0–1023，畀常見伺服器服務用（HTTP 80、DNS 53） | "Ports 0 to 1023 are well-known ports." |
| Registered Ports | IANA 埠號 1024–49151，畀已註冊應用程式用 | "Ports 1024 to 49151 are registered ports." |
| Dynamic / Private Ports | IANA 埠號 49152–65535，畀 client 臨時（ephemeral）使用 | "Ports 49152 to 65535 are private or dynamic ports." |
| Header Overhead | 標頭所佔嘅額外 bytes：TCP 20 bytes，UDP 8 bytes | "UDP uses less overhead because its header is only 8 bytes." |
| Datagram | UDP 嘅傳輸單位（冇連線、冇序號） | "UDP delivers datagrams as they arrive." |
| Reliability / Retransmission | 可靠傳輸：確認 + 逾時重傳丟失嘅 segment | "TCP resends lost data and acknowledges received data." |
| Checksum | 標頭內嘅錯誤偵測欄位，TCP 與 UDP 都有 | "The checksum is used for error detection." |
| Connection-Oriented / Connectionless | 連線導向（TCP 要建立連線）／無連線（UDP 直接送） | "TCP is connection-oriented, while UDP is connectionless." |
| Telnet | 遠端登入應用，用 TCP port 23 | "Telnet uses TCP because it requires a reliable connection." |
| IANA (Internet Assigned Numbers Authority) | 負責分配埠號範圍等編號嘅機構 | "The IANA defines the well-known, registered and dynamic port ranges." |

---

## 🗺️ 學習路線 (Learning Path)

**階段 1：先理解 (Understand)** —— 搞清楚 TCP 同 UDP 嘅本質分別：TCP = 可靠、有序、連線導向（要交握、要確認、要重傳）；UDP = 快、輕量、無連線（冇確認、冇重傳）。再理解 Port Number 點樣將數據導向正確應用程式、Socket = IP + Port。

**階段 2：背誦 (Memorize)** —— 背熟關鍵數字與英文定義句：TCP header = 20 bytes、UDP header = 8 bytes；埠號範圍 0–1023 / 1024–49151 / 49152–65535；三次交握 SYN → SYN+ACK → ACK；四次揮手 FIN → ACK → FIN → ACK。將「📖 必考英文術語與答題句型庫」每行嘅英文句讀熟，做到見題即背得出。

**階段 3：掌握計算與判斷 (Calculate & Judge)** —— 熟練三種運算／判斷：① 序號推算（Ack = 對方 seq + 1，SYN/FIN 各耗一個序號）；② 滑動視窗（送一個 segment 就扣 MSS，收到 ACK 就前滑）；③ 應用選擇（要有序揀 TCP、要低延遲揀 UDP）。自己出數字練習：例如 window = 8000、MSS = 1460，計 3 個 segment 後剩幾多。

**階段 4：能解答考題 (Answer Exam Questions)** —— 做返成份練習（唔好睇答案），每題用「答案 + 一句英文解釋」嘅格式作答；對照本 Guide 嘅 Exam Answer Phrase，確保英文句完整、術語正確。考前最後一輪：用「🎒 考前 5 分鐘雙語懶人包」快速重溫。

---

## 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 🔢 關鍵數字 (Key Numbers)

| 項目 | 數字 |
|---|---|
| UDP Header 大小 | 8 bytes（Source Port、Destination Port、Length、Checksum） |
| TCP Header 最小大小 | 20 bytes |
| 常見 MSS | 1460 bytes |
| Well-known Ports | 0 – 1023（HTTP 80、HTTPS 443、DNS 53、Telnet 23、FTP 21） |
| Registered Ports | 1024 – 49151 |
| Dynamic / Private Ports | 49152 – 65535 |
| 三次交握 | 3 步（SYN → SYN+ACK → ACK） |
| 四次揮手 | 4 步（FIN → ACK → FIN → ACK） |

### ⚖️ TCP vs UDP 對比表

| 特性 | TCP | UDP |
|---|---|---|
| Connection（連線） | Connection-oriented | Connectionless |
| Reliability（可靠） | Reliable | Best-effort（不可靠） |
| Acknowledgement（確認） | Yes（ACK） | No |
| Sequencing（排序重組） | Yes（Sequence Number） | No |
| Retransmission（重傳） | Yes | No |
| Header Overhead | 20 bytes | 8 bytes |
| Speed / Latency | 較慢（要交握、確認） | 快、低延遲 |
| 典型應用 | HTTP、FTP、Telnet、SMTP | DNS、DHCP、TFTP、VoIP、串流 |

### 🧠 英文記憶口訣 (Memory Mnemonics)

- **TCP = Trustworthy, Connection-oriented, Perfect order**（可靠、連線、有序）——所有「要確認、要重傳、要有序」嘅嘢都揀 TCP。
- **UDP = Unreliable, Datagram, Protocol**（U-D-P 三個字頭）——「快、輕、無確認」就係 UDP。
- **三次交握：SYN → SYN+ACK → ACK**；**四次揮手：FIN → ACK → FIN → ACK**。
- **ACK 規則："Ack = last received seq + 1"**（ACK = 對方上一個序號 + 1；SYN/FIN 都耗一個序號）。
- **埠號範圍："Well-known at 0, Registered at 1024, Dynamic at 49152"**。
- **滑動視窗："Shrink when sent, slide when ACKed"**（送出就縮，收到 ACK 就前滑）。

### ✅ 三步答題流程 (3-Step Answer Routine)

1. **睇題目問乜**：特性／應用選擇 → 諗 TCP 定 UDP；標頭欄位 → 數有幾多個欄位（4 個 = UDP）；序號／視窗 → 準備計數。
2. **寫答案**：填空題直接填英文術語（如 "Sequence Number"、"Well-known ports"）；配對題寫齊範圍同組名。
3. **補一句英文**：用 Exam Answer Phrase 格式補一句完整英文句解釋，例如 "TCP is reliable because it acknowledges data and resends lost data."——有解釋先至攞足分數。
