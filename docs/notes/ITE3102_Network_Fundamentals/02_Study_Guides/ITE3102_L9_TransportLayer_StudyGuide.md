# ITE3102 L9: Transport Layer — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Module 14: Transport Layer
> **原始檔**：`01_Raw_Materials/Lectures/Lecture9_TransportLayer.pptx`
> **題解對應**：`ITE3102_T9_Transport_StudyGuide.md`（同一課嘅 Tutorial 練習題解）
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 對照題解自測 → 考前用懶人包速記

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

L9 係整個 ITE3102 嘅「分水嶺」：之前幾課講嘅係「封包點樣由一部機去到另一部機」（Network Layer / IP），但 IP 本身**唔會講點交付、點保證送達**。Transport Layer 就係補上呢個缺口——佢係 application layer 同下面負責 network transmission 嘅 lower layers 之間嘅橋樑，負責喺唔同 host 上面運行嘅 applications 之間做 **logical communications**。

本課有兩條主線。第一條係 **Transport Layer 嘅五大職責**：追蹤個別對話（tracking individual conversations）、將數據分段再重組（segmenting and reassembling）、加 header 資訊、識別與分隔多個對話、用 segmentation 加 multiplexing 令多個對話可以交錯共用同一條網絡。第二條係 **TCP 同 UDP 兩大協議嘅取捨**：TCP 係 connection-oriented、提供可靠性（確認、排序、重傳）同 flow control；UDP 係 connectionless、best-effort、overhead 極低。之後就係 Port Number 分類（IANA 三個範圍）、Socket、`netstat` 解讀、TCP header 逐個欄位、三次交握與四次揮手、序號／確認號機制、滑動視窗與壅塞控制。

實務情境一：你喺公司電腦開住瀏覽器、收住 email、同時打 VoIP 電話——三部唔同應用嘅 traffic 走同一條線。傳輸層靠 **port numbers** 分辨邊段數據屬於邊個應用（multiplexing），靠 **socket（IP + port）** 分辨邊條連線。管理員打 `netstat` 就係想睇機器有冇「唔應該存在嘅連線」——deck 特別提醒：unexplained TCP connections 可以係重大安全威脅。

實務情境二：點解開 HTTP 網頁之前要先「等一等」？因為 TCP 要先用 **three-way handshake（SYN → SYN, ACK → ACK）** 建立 session 先可以傳數據；而 DNS 查詢用 UDP，冇 handshake、冇 ACK，快但唔保證。呢個就係「正確嘅協議配正確嘅應用」——本課所有考題幾乎都環繞呢個判斷。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **解釋 Transport Layer 嘅角色** — Explain the role of the transport layer as the link between applications and the lower layers
2. **列出 Transport Layer 五大職責** — Describe the responsibilities of the transport layer, including tracking conversations, segmenting data, and adding header information
3. **解釋 Segmentation 與 Multiplexing 嘅關係** — Explain how segmentation enables conversation multiplexing on the same network
4. **分辨 TCP 與 UDP 嘅本質** — Distinguish TCP (connection-oriented, reliable) from UDP (connectionless, best-effort)
5. **按應用需求選擇 TCP 或 UDP** — Select the right transport layer protocol for the right application
6. **分辨 IANA 三個 Port Number 範圍** — Identify well-known, registered, and private/dynamic port ranges
7. **背誦常用 Well-Known Port Numbers** — Recall the well-known port numbers for FTP, SSH, Telnet, SMTP, DNS, DHCP, TFTP, HTTP, POP3, IMAP, SNMP, and HTTPS
8. **解釋 Socket 嘅組成** — Explain that a socket is the combination of an IP address and a port number
9. **解讀 `netstat` 輸出** — Interpret the output of the `netstat` command to verify active connections
10. **分辨 UDP 與 TCP Header 欄位** — Identify the four UDP header fields (8 bytes) and the TCP header fields (20 bytes total)
11. **描述 TCP 連線建立與終止程序** — Describe the three-way handshake (SYN, SYN+ACK, ACK) and the four-step session termination (FIN, ACK, FIN, ACK)
12. **解釋六個 TCP Control Bits** — Explain URG, ACK, PSH, RST, SYN, and FIN
13. **解釋序號與確認號機制** — Explain how sequence numbers provide ordered delivery and how acknowledgement numbers work
14. **解釋 Flow Control、Window Size 與 MSS** — Explain window size, the send window, and the maximum segment size
15. **解釋重傳與壅塞控制** — Explain retransmission of unacknowledged data, selective acknowledgment (SACK), and congestion avoidance

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

本節按 deck 章節次序逐張 slide 重寫。全課封面係 **Lecture 9: Transport Layer**，內容對應 **Module 14: Transport Layer**，全課分三大部分：**Transport Layer Protocols（傳輸層協議總論與 TCP／UDP 特性）**、**UDP Communication（UDP 標頭、UDP 應用、UDP 客戶端／伺服器行為）**、**TCP Communication（TCP 標頭、TCP 應用、三次交握與四次揮手、可靠性與流量控制）**。

> **English Standard Definition:** "Module 14: Transport Layer — Transport Layer Protocols, UDP Communication, TCP Communication."

### 3.1 Transport Layer 嘅角色（Role of the Transport Layer）— slide 3

繁中解說：Transport Layer（OSI Layer 4）嘅核心定位有兩句：第一，佢負責喺**唔同 host 上面運行嘅 applications** 之間做 logical communications（注意：係 application-to-application，唔係 host-to-host）；第二，佢係 **application layer** 同下面負責 network transmission 嘅 **lower layers** 之間嘅橋樑。換句話講：上層只交低「一堆應用數據」，下層只識運送封包，中間點樣分段、點樣分辨應用、點樣保證可靠，全部係 transport layer 嘅事。

> **English Standard Definition:** "The transport layer is responsible for logical communications between applications running on different hosts."
> **English Standard Definition:** "The transport layer is the link between the application layer and the lower layers that are responsible for network transmission."

### 3.2 Transport Layer 五大職責（Transport Layer Responsibilities）— slide 4

繁中解說：Transport layer 有以下職責：

1. **Tracking individual conversations** —— 追蹤每一個獨立對話（邊個應用同邊個應用傾緊）。
2. **Segmenting data and reassembling segments** —— 將數據切細做 segments，喺目的地把 segments 重組返。
3. **Adds header information** —— 為每個 segment 加 header（port number、序號、控制位等）。
4. **Identify, separate, and manage multiple conversations** —— 識別、分隔同管理多個同時進行嘅對話。
5. **Uses segmentation and multiplexing** —— 令唔同嘅 communication conversations 可以 **interleaved**（交錯）喺同一條網絡上面傳。

> **English Standard Definition:** "The transport layer has the following responsibilities: tracking individual conversations; segmenting data and reassembling segments; adding header information; identifying, separating, and managing multiple conversations."
> **English Standard Definition:** "The transport layer uses segmentation and multiplexing to enable different communication conversations to be interleaved on the same network."

➜ 實作見 `ITE3102_PT9_TCP_UDP_CodeGuide.md`（Part 1 觀察 multiplexing：一條 wire 一個方向同一時間只有一個 PDU）

### 3.3 Conversation Multiplexing（對話多工）— slide 5

繁中解說：將數據**分段（segmenting）**成為較細嘅 chunks，係 multiplexing 嘅前提。因為切成細段之後，多個唔同嘅通訊就可以**交錯排隊**共用同一個網絡，而唔係一個對話霸住條線慢慢傳。實作上你會見到：唔同應用嘅 PDU 一個跟一個咁過線，其餘嘅喺設備度排隊——呢個就係 multiplexing 喺網絡上嘅實際樣貌。

> **English Standard Definition:** "Segmenting the data into smaller chunks enables many different communications to be multiplexed on the same network."

### 3.4 Transport Layer Protocols（傳輸層協議）— slide 6

繁中解說：關鍵概念——**IP 唔會指定封包點樣被交付或者運送**（IP 只管位址同路由）。真正負責「點樣喺 host 之間傳遞訊息」同「管理對話嘅可靠性要求」嘅，係 **transport layer protocols**。Transport layer 主要包含兩個協議：**TCP** 同 **UDP**。

> **English Standard Definition:** "IP does not specify how the delivery or transportation of the packets takes place."
> **English Standard Definition:** "Transport layer protocols specify how to transfer messages between hosts, and are responsible for managing reliability requirements of a conversation."
> **English Standard Definition:** "The transport layer includes the TCP and UDP protocols."

### 3.5 TCP 基本運作（Transmission Control Protocol）— slide 7

繁中解說：**TCP provides reliability and flow control.** TCP 嘅基本操作有五項：

1. **Number and track data segments** —— 為送往特定 host、來自特定 application 嘅 data segments 編號同追蹤。
2. **Acknowledge received data** —— 確認已收到嘅數據。
3. **Retransmit unacknowledged data** —— 過咗一段時間仍未收到確認嘅數據會重傳。
4. **Sequence data that might arrive in wrong order** —— 將可能亂序到達嘅數據重新排序。
5. **Send data at an efficient rate** —— 用接收方可以接受嘅速率有效率地傳送。

> **English Standard Definition:** "TCP provides reliability and flow control. TCP numbers and tracks data segments, acknowledges received data, retransmits any unacknowledged data after a certain amount of time, sequences data that might arrive in wrong order, and sends data at an efficient rate that is acceptable by the receiver."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q1、Q11、Q13（Reliable / Reassembles data in sequenced order / Resends lost data / Acknowledge data 全部屬 TCP）

### 3.6 UDP 基本特性（User Datagram Protocol）— slide 8

繁中解說：UDP 只提供最基本嘅功能：喺適當嘅 applications 之間交付 **datagrams**，而且 **overhead 同 data checking 都極少**。UDP 係 **connectionless** 協議——冇建立連線嘅程序。佢又叫 **best-effort delivery protocol**，因為**目的端唔會回確認**，送達同否冇人保證。

> **English Standard Definition:** "UDP provides the basic functions for delivering datagrams between the appropriate applications, with very little overhead and data checking."
> **English Standard Definition:** "UDP is a connectionless protocol."
> **English Standard Definition:** "UDP is known as a best-effort delivery protocol because there is no acknowledgment that the data is received at the destination."

### 3.7 Transport Layer Reliability：邊個協議配邊個應用 — slide 9

繁中解說：選擇原則好簡單——**要「順序」同「完整」就揀 TCP，要「快」同「容忍少量丟失」就揀 UDP**。TCP 適合：segments 必須以非常特定嘅次序到達先處理得到嘅應用，或者所有數據都必須完整收到嘅應用。UDP 適合：可以容忍傳輸期間少量數據丟失，但**傳輸延遲完全唔可以接受**嘅應用（deck 原文：delays in transmission are unacceptable）。

**應用分類（必背）**：

| 分類 | 應用 |
|---|---|
| Applications that use **Both** | **DNS, SNMP** |
| Applications that use **TCP** | **HTTP, FTP, SMTP, Telnet** |
| Applications that use **UDP** | **DHCP, TFTP, VoIP, IPTV** |

> ⚠️ 講義兩頁歸類唔同：slide 9 把 SNMP 列為「TCP 及 UDP 都用」，slide 19 歸入 UDP；實務上 SNMP 以 UDP 為主（少數情境用 TCP），考試按題目所引嘅講義頁作答。

> **English Standard Definition:** "TCP is a better choice for applications whose segments must arrive in a very specific sequence to be processed successfully, or applications in which all data must be fully received."
> **English Standard Definition:** "UDP is a better choice for applications that can tolerate some data loss during transmission, but delays in transmission are unacceptable."

### 3.8 正確嘅協議配正確嘅應用（The Right Protocol for the Right Application）— slide 10

繁中解說：UDP 亦常用喺 **request-and-reply** 應用——數據量極少、要重傳都可以好快完成（deck 原文提到 one or two segments）。例如 live video stream 有一兩個 segments 送唔到，造成嘅畫面中斷可能用戶根本聽唔出、睇唔出，所以唔值得為佢停低等重傳。相反，當「所有數據都要到、而且要按正確次序處理」係重要嘅時候就用 TCP——**databases、web browsers、email clients** 都要求所有送出嘅數據以原本狀態到達目的地。

> **English Standard Definition:** "UDP is also used by request-and-reply applications where the data is minimal, and retransmission can be done quickly."
> **English Standard Definition:** "TCP is used as the transport protocol if it is important that all the data arrives and that it can be processed in its proper sequence."
> **English Standard Definition:** "Databases, web browsers, and email clients require that all data that is sent arrives at the destination in its original condition."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q3（(iii) 要特定順序 → TCP；(iv) 容忍丟失但唔可以延遲 → UDP）

### 3.9 多重獨立通訊同 Port Numbers（Multiple Separate Communications）— slide 11

繁中解說：用戶期望**同時**收發 email、睇網站、打 VoIP 電話。TCP 同 UDP 靠一個叫 **port number** 嘅 unique identifier 去管理多個對話。**Source port number** 對應喺**本機（local host）**上面發起通訊嘅應用；**destination port number** 對應喺**遠端 host（remote host）**上面嘅目的應用。「IP 負責去邊部機，Port 負責機上邊個程式」— 呢句一定要識講。

> **English Standard Definition:** "TCP and UDP manage multiple conversations by using unique identifiers called port numbers."
> **English Standard Definition:** "The source port number is associated with the originating application on the local host, whereas the destination port number is associated with the destination application on the remote host."

### 3.10 Port Number Groups（IANA 埠號分組）— slide 12

繁中解說：**IANA（Internet Assigned Numbers Authority）** 係負責分配各種 addressing standards（包括 port numbers）嘅標準機構。三個範圍：

| Port Group | Number Range | Description |
|---|---|---|
| **Well-known Ports** | **0 to 1,023** | 保留畀常見或熱門服務同應用，例如 web browsers、email clients、remote access clients。定義好 well-known ports，令 client 可以容易識別所需服務。 |
| **Registered Ports** | **1,024 to 49,151** | 由 IANA 分配畀請求機構，用於特定 processes 或 applications。呢啲多數係用戶自行安裝嘅個別應用，而唔係會獲發 well-known port 嘅通用應用。例如 Cisco 就註冊咗 **port 1812** 畀佢嘅 **RADIUS** server authentication process。 |
| **Private and/or Dynamic Ports** | **49,152 to 65,535** | 又稱 **ephemeral ports**。client 嘅 OS 通常喺發起連線時動態分配，之後用嚟識別通訊中嘅 client 應用。 |

另外兩個一定要分清嘅概念：**Source port** 由發送方**動態揀選**，用嚟追蹤（tracking）；**Destination port** 就係話畀目的端知**要求緊邊個服務**，例如 **port 80 for web service**。

> **English Standard Definition:** "Well-known ports are 0 to 1,023 and are reserved for common or popular services and applications; registered ports are 1,024 to 49,151 and are assigned by IANA to a requesting entity; private and/or dynamic ports are 49,152 to 65,535 and are also known as ephemeral ports."
> **English Standard Definition:** "The Internet Assigned Numbers Authority (IANA) is the standards body responsible for assigning various addressing standards, including port numbers."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q14（範圍對組別配對題）

### 3.11 Well-Known Port Numbers（必背埠號表）— slide 13

繁中解說：呢張表係必背——考試直接考配對或者填充。

| Port Number | Protocol | Application |
|---|---|---|
| **20** | TCP | File Transfer Protocol (FTP) - Data |
| **21** | TCP | File Transfer Protocol (FTP) - Control |
| **22** | TCP | Secure Shell (SSH) |
| **23** | TCP | Telnet |
| **25** | TCP | Simple Mail Transfer Protocol (SMTP) |
| **53** | UDP, TCP | Domain Name Service (DNS) |
| **67** | UDP | Dynamic Host Configuration Protocol (DHCP) - Server |
| **68** | UDP | Dynamic Host Configuration Protocol - Client |
| **69** | UDP | Trivial File Transfer Protocol (TFTP) |
| **80** | TCP | Hypertext Transfer Protocol (HTTP) |
| **110** | TCP | Post Office Protocol version 3 (POP3) |
| **143** | TCP | Internet Message Access Protocol (IMAP) |
| **161** | UDP | Simple Network Management Protocol (SNMP) |
| **443** | TCP | Hypertext Transfer Protocol Secure (HTTPS) |

> **English Standard Definition:** "Well-known port numbers include FTP data 20 and control 21, SSH 22, Telnet 23, SMTP 25, DNS 53 (both UDP and TCP), DHCP server 67 and client 68, TFTP 69, HTTP 80, POP3 110, IMAP 143, SNMP 161, and HTTPS 443."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q2（Telnet 用 TCP，port 23）

### 3.12 Socket Pairs（Socket 配對）— slide 14

繁中解說：**Source 同 destination ports 係放喺 segment 入面**；然後成個 segment 會被**封裝（encapsulated）喺一個 IP packet** 之內。**Socket** 嘅定義係：**source IP address 加 source port number，或者 destination IP address 加 destination port number** 嘅組合。Socket 有兩個實用作用：令喺一部 client 上面運行嘅多個 processes 可以互相區分；亦令**連去同一個 server process 嘅多條連線**可以互相區分。另外，**source port 扮演「回郵地址」（return address）** 嘅角色，等回應可以搵返發起嘅應用。

> **English Standard Definition:** "The source and destination ports are placed within the segment. The segments are then encapsulated within an IP packet."
> **English Standard Definition:** "The combination of the source IP address and source port number, or the destination IP address and destination port number, is known as a socket."
> **English Standard Definition:** "The source port acts as a return address for the requesting application."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q5（Source socket / Destination socket 點寫）

### 3.13 `netstat` 指令解讀（The netstat Command）— slides 15–16

繁中解說：**Unexplained TCP connections 可以構成重大安全威脅**，所以 **`netstat` 係驗證連線嘅重要工具**。Slide 15 同 slide 16 內容基本重複（slide 16 再次強調「用嚟檢查網絡主機上面開住、正在運行嘅 TCP connections」，並重複 socket 定義、範例網站同郵件伺服器）。

典型輸出：

```text
C:\> netstat
Active Connections
Proto  Local Address                 Foreign Address                  State
TCP    192.168.1.124:3126            192.168.0.2:netbios-ssn          ESTABLISHED
TCP    192.168.1.124:3158            207.138.126.152:http             ESTABLISHED
TCP    192.168.1.124:3159            207.138.126.169:http             ESTABLISHED
TCP    192.168.1.124:3160            207.138.126.169:http             ESTABLISHED
TCP    192.168.1.124:3161            sc.msn.com:http                  ESTABLISHED
TCP    192.168.1.124:3166            www.cisco.com:http               ESTABLISHED
```

點睇？**Local Address** 係本機 IP 加本機 port（dynamic／well-known 都要識分），**Foreign Address** 係對端 IP 或主機名加對端 port／服務名，**State** 顯示連線狀態（例如 **ESTABLISHED**）。呢個例子係 **6 sessions, 2 clients**：本機用咗 3126、3158、3159、3160、3161、3166 六個 source ports，對外連去 `netbios-ssn`、`http` 等服務。範例內容解讀：**example websites = 207.138.126.169、sc.msn.com、www.cisco.com**；**example mail server = 207.138.126.152**。（Port 名稱 `netbios-ssn`、`http` 會以服務名顯示，唔一定顯示數字。）

> **English Standard Definition:** "Unexplained TCP connections can pose a major security threat. Netstat is an important tool to verify connections."
> **English Standard Definition:** "The netstat command is used to examine TCP connections that are open and running on a networked host."
> **English Standard Definition:** "A socket is a combination of the Transport layer port number and Network layer IP address."

➜ 實作見 `ITE3102_PT9_TCP_UDP_CodeGuide.md`（延伸指令 `netstat -n`：顯示本機 active TCP/UDP connections 同 port numbers）

### 3.14 UDP Features 同 UDP Header 結構 — slide 17

繁中解說：UDP 四大特性：

1. **Data is reconstructed in the order that it is received** —— 收到咩次序就按咩次序重組（唔會幫你排返正確次序）。
2. **Any segments that are lost are not resent** —— 丟失嘅 segments 唔會重傳。
3. **There is no session establishment** —— 冇建立 session 嘅程序。
4. **Does not inform the sender about resource availability** —— 唔會通知發送方目的端嘅資源狀況。

UDP header **遠比 TCP header 簡單**：只有**四個欄位**，總共需要 **8 bytes（即 64 bits）**。另外 UDP 係一個 **stateless protocol——冇 tracking**；可靠性（reliability）完全交由 **application** 自己處理。

> **English Standard Definition:** "The UDP header is far simpler than the TCP header. It only has four fields and requires 8 bytes (i.e. 64 bits)."
> **English Standard Definition:** "UDP is a stateless protocol — no tracking. Reliability is handled by the application."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q8、Q9（數到 4 個欄位就係 UDP；UDP overhead 8 bytes < TCP 20 bytes）

### 3.15 UDP Header Fields（UDP 標頭四欄位）— slide 18

繁中解說：UDP header 就係以下四欄，全部都係 **16-bit**：

| UDP Header Field | Description |
|---|---|
| **Source Port** | A 16-bit field used to identify the source application by port number. |
| **Destination Port** | A 16-bit field used to identify the destination application by port number. |
| **Length** | A 16-bit field that indicates the length of the UDP datagram header. |
| **Checksum** | A 16-bit field used for error checking of the datagram header and data. |

> **English Standard Definition:** "The UDP header has four fields: Source Port, Destination Port, Length, and Checksum — each a 16-bit field."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q10（同 TCP 共有嘅四個欄位：Source Port、Destination Port、Length、Checksum）

### 3.16 Applications that use UDP（用 UDP 嘅應用）— slide 19

繁中解說：UDP 嘅應用分三類（考試好鍾意考「舉兩個例子」）：

1. **Live video and multimedia applications** —— 容忍少量數據丟失但要求極低延遲。例如 **VoIP** 同 **live streaming video**。
2. **Simple request and reply applications** —— 交易簡單，host 發出請求後收唔收到回覆都未必重要。例如 **DNS** 同 **DHCP**。
3. **Applications that handle reliability themselves** —— 單向通訊，唔需要 flow control、error detection、acknowledgments、error recovery，或者應用自己搞得掂。例如 **SNMP** 同 **TFTP**。

> **English Standard Definition:** "Applications that use UDP include live video and multimedia applications (VoIP and live streaming video), simple request-and-reply applications (DNS and DHCP), and applications that handle reliability themselves (SNMP and TFTP)."

### 3.17 UDP Client 請求同 UDP Server 回應 — slides 20–21

繁中解說：UDP 嘅客戶端／伺服器行為，一問一答嘅兩半：

- **Clients Sending UDP Requests（slide 20）**：client 要求 UDP server 用 **well-known port numbers 做 destination port**；同時用**隨機 port number 做 source port**。
- **UDP Server Response（slide 21）**：server 回覆時，用**請求封包嘅 source port 做 destination port**；並用 **well-known port number 做 source port**。

換句講：一問一答之間，**source 同 destination ports 會對調**，目的係令回覆準確搵返原本發問嘅應用。

> **English Standard Definition:** "Clients sending UDP requests use well-known port numbers as the destination port and random port numbers as the source port."
> **English Standard Definition:** "A UDP server response uses the source port from the request packet as the destination port, and uses well-known port numbers as the source port."

### 3.18 UDP 一問一答流程（slide 22 圖示）— slide 22

繁中解說：slide 22 係純圖、冇可抽取嘅文字，內容係 UDP client 同 server 之間嘅一次完整一問一答（配合 slides 20–21）。

> **圖示描述**：UDP client 以**隨機 source port** 將 UDP datagram 送往 server 嘅 **well-known destination port**；server 收到後以 **well-known port 做 source port**、以 client 原本嘅 **source port 做 destination port** 回覆。整個流程**冇 session establishment、冇 acknowledgment**——一個請求、一個回應，完。

> **English Standard Definition:** "UDP communication involves no session establishment and no acknowledgements: the client sends a datagram from a random source port to a well-known destination port, and the server replies from the well-known port back to the client's source port."

### 3.19 TCP Features（TCP 四大特性）— slide 23

繁中解說：TCP 嘅四項特性，逐句都要識背：

1. **Establishes a Session** —— TCP 係 **connection-oriented protocol**，會喺轉發任何 traffic 之前，先喺來源同目的設備之間協商並建立一條永久連線（session）。
2. **Ensures Reliable Delivery** —— 由於各種原因，segment 喺網絡傳輸途中可能損壞或者完全丟失；TCP 確保由來源送出嘅每一個 segment 都會到達目的地。
3. **Provides Same-Order Delivery** —— 網絡可能提供多條傳輸速率唔同嘅路徑，所以數據可能亂序到達；TCP 負責排序。
4. **Supports Flow Control** —— 網絡主機嘅資源（記憶體、處理能力）有限。當 TCP 察覺資源過度負荷，可以要求發送應用**降低數據流速**。

> **English Standard Definition:** "TCP is a connection-oriented protocol that negotiates and establishes a permanent connection (or session) between source and destination devices prior to forwarding any traffic."
> **English Standard Definition:** "TCP ensures that each segment that is sent by the source arrives at the destination."
> **English Standard Definition:** "TCP provides same-order delivery and supports flow control: when TCP is aware that resources are overtaxed, it can request that the sending application reduce the rate of data flow."

### 3.20 TCP Header 結構（20 Bytes Total）— slide 24

繁中解說：TCP header 基本大小係 **20 Bytes Total**。各欄位同 bit 數必須背熟（考試會直接問「邊個欄位有幾多 bits」）：

- **Source Port (16 bits)**
- **Destination Port (16 bits)**
- **Sequence number (32 bits)** —— 用於數據重組（data reassembly）
- **Acknowledgment number (32 bits)** —— 下一個期望收到嘅 byte（the next byte expected）
- **Header length (4 bits)**
- **Reserved (6 bits)**
- **Control bits (6 bits)** —— **URG / ACK / PSH / RST / SYN / FIN**
- **Window (16 bits)** —— 一次可以接受嘅 byte 數（the number of bytes that can be accepted at one time）
- **Checksum (16 bits)**
- **Urgent (16 bits)**

> **English Standard Definition:** "The TCP header is 20 bytes in total, containing Source Port, Destination Port, Sequence Number, Acknowledgment Number, Header Length, Reserved, Control Bits, Window, Checksum, and Urgent."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q10（TCP 20 bytes overhead 同四個與 UDP 共通欄位）

### 3.21 TCP Header Fields 逐欄解讀 — slide 25

繁中解說：同一組欄位嘅官方描述，考填充題時直接抄句：

| TCP Header Field | Description |
|---|---|
| **Source Port** | A 16-bit field used to identify the source application by port number. |
| **Destination Port** | A 16-bit field used to identify the destination application by port number. |
| **Sequence Number** | A 32-bit field used for data reassembly purposes. |
| **Acknowledgment Number** | A 32-bit field used to indicate that data has been received and the next byte expected from the source. |
| **Header Length** | A 4-bit field known as "data offset" that indicates the length of the TCP segment header. |
| **Reserved** | A 6-bit field that is reserved for future use. |
| **Control bits** | A 6-bit field that includes bit codes, or flags, which indicate the purpose and function of the TCP segment. |
| **Window size** | A 16-bit field used to indicate the number of bytes that can be accepted at one time. |
| **Checksum** | A 16-bit field used for error checking of the segment header and data. |
| **Urgent** | A 16-bit field used to indicate if the contained data is urgent. |

> **English Standard Definition:** "The Acknowledgment Number is a 32-bit field used to indicate that data has been received and the next byte expected from the source; the Header Length is a 4-bit field known as data offset."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q12（Acknowledgment number = 接收端期望嘅下一個 byte）

### 3.22 Applications that use TCP（用 TCP 嘅應用）— slide 26

繁中解說：**TCP 包辦晒所有工序**——將 data stream 切成 segments、提供可靠性、控制數據流、重排 segments。所以凡係「一定要完整、一定要有序」嘅應用，全部都交畀 TCP 處理（HTTP、FTP、SMTP、Telnet、POP3、IMAP……）。

> **English Standard Definition:** "TCP handles all tasks associated with dividing the data stream into segments, providing reliability, controlling data flow, and reordering segments."

### 3.23 Clients Sending TCP Requests（TCP 客戶端發出請求）— slide 27

繁中解說：喺 server 上面運行嘅**每個 application process 都用一個獨立嘅 port number**。所以一部 server 可以**同時開好多個 ports**——每個 active server application 一個。呢個就係為什麼同一部 web server 可以同時服務 HTTP（80）、HTTPS（443）等唔同服務。

> **English Standard Definition:** "Each application process running on the server uses a unique port number. There can be many ports open simultaneously on a server, one for each active server application."

### 3.24 Server Sending TCP Replies（TCP 伺服器回覆）— slide 28

繁中解說：TCP server 回覆時：用**請求封包嘅 source port 做 destination port**；用**請求封包嘅 destination port 做 source port**。即係兩邊 port 對調——client 嗰個 ephemeral source port 變成回覆嘅 destination port。

> **English Standard Definition:** "A server response to a TCP client uses the source port from the request packet as the destination port, and uses the destination port from the request packet as the source port."

➜ 實作見 `ITE3102_PT9_TCP_UDP_CodeGuide.md`（Part 2a Q8：Inbound PDU 嘅 SRC／DEST PORT 對調咗）

### 3.25 TCP Connection Establishment — 3-Way Handshake（三次交握）— slide 29

繁中解說：TCP 建立連線嘅三步，每一步嘅意義：

1. **The initiating client requests a client-to-server communication session with the server.** → 控制位元：**SYN（synchronization）**
2. **The server acknowledges the client-to-server communication session and requests a server-to-client communication session.** → 控制位元：**SYN, ACK（synchronization, acknowledgement）**
3. **The initiating client acknowledges the server-to-client communication session.** → 控制位元：**ACK（acknowledgement）**

```text
Client                                                   Server
  |                                                        |
  |  1. SYN            (要求建立 client-to-server session)  |
  |  --------------------------------------------------->  |
  |                                                        |
  |  2. SYN, ACK       (確認並反向要求 server-to-client)     |
  |  <--------------------------------------------------   |
  |                                                        |
  |  3. ACK            (確認 server-to-client session)      |
  |  --------------------------------------------------->  |
  |                                                        |
  |  ============  雙向 session 建立，開始傳數據  ==========  |
```

> **English Standard Definition:** "The three-way handshake: step 1 the initiating client sends SYN; step 2 the server replies with SYN, ACK; step 3 the initiating client sends ACK."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q6（control bits 同序號推算）
➜ 實作見 `ITE3102_PT9_TCP_UDP_CodeGuide.md`（Part 2a Q3／Q7：未完成 handshake，HTTP PDU 唔會出現）

### 3.26 TCP Session Termination（四次揮手）— slide 30

繁中解說：終止 session 係**四個步驟**，兩邊各自關閉自己嘅傳送方向：

1. **Client** 冇數據再送，send 一個 set 咗 **FIN** flag 嘅 segment。
2. **Server** 送 **ACK**，確認收到 FIN，**終止 client-to-server 方向**。
3. **Server** 送 **FIN** 畀 client，終止 server-to-client 方向。
4. **Client** 回 **ACK**，確認 server 嘅 FIN。

```text
  |  --- FIN --->    1. client：我冇數據再送
  |  <-- ACK ----    2. server：確認，client-to-server 終止
  |  <-- FIN ----    3. server：終止 server-to-client
  |  --- ACK --->    4. client：確認，session 完全關閉
```

> **English Standard Definition:** "TCP session termination uses four steps: the client sends a segment with the FIN flag set; the server sends an ACK to terminate the session from client to server; the server sends a FIN to the client; the client responds with an ACK to acknowledge the FIN from the server."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q7（FIN → ACK → FIN → ACK）

### 3.27 Three-Way Handshake 分析（三個功能）— slide 31

繁中解說：三次交握其實同時完成三件事：

1. **建立目的設備喺網絡上存在**（destination device is present on the network）。
2. **驗證目的設備有 active service**，並且喺 initiating client 打算使用嘅 destination port number 上面接受請求。
3. **通知目的設備**：source client 打算喺該 port number 上面建立一個通訊 session。

通訊完成後 session 會被關閉、連線被終止。**就係呢個 connection 同 session 機制，令 TCP 嘅 reliability 功能得以成立**——所以「三次交握」唔止係儀式，佢係可靠性嘅基礎。

> **English Standard Definition:** "The functions of the three-way handshake are: it establishes that the destination device is present on the network; it verifies that the destination device has an active service accepting requests on the destination port number; and it informs the destination device that the source client intends to establish a communication session on that port number."
> **English Standard Definition:** "The connection and session mechanisms enable the TCP reliability function."

### 3.28 TCP Control Bits Field（六個控制位元）— slide 32

繁中解說：TCP header 嘅 6 個控制位元（flags），每一位代表一個功能：

| Flag | 全寫 | 意思 |
|---|---|---|
| **URG** | Urgent | Urgent pointer field significant（urgent 欄位有效） |
| **ACK** | Acknowledgment | 用於連線建立同 session 終止嘅確認 flag |
| **PSH** | Push | Push function（推送功能） |
| **RST** | Reset | 當發生錯誤或 timeout 時重設連線 |
| **SYN** | Synchronize | 用於連線建立嘅序號同步 |
| **FIN** | Finish | 發送方冇更多數據，用於 session 終止 |

> **English Standard Definition:** "The six control bit flags are: URG (urgent pointer field significant), ACK (used in connection establishment and session termination), PSH (push function), RST (reset the connection when an error or timeout occurs), SYN (synchronize sequence numbers), and FIN (no more data from sender, used in session termination)."

➜ 實作見 `ITE3102_PT9_TCP_UDP_CodeGuide.md`（題型 5：6 個 flag 位由左至右 URG ACK PSH RST SYN FIN）

### 3.29 Ordered Delivery（有序交付）— slide 33

繁中解說：TCP 排序機制嘅四個重點：

1. 喺 session setup 期間會設定一個 **initial sequence number (ISN)**。
2. 隨住 session 期間數據傳輸，**sequence number 會按已傳輸嘅 byte 數遞增**。
3. **亂序收到嘅 segments 會被留住**，等之後再處理（唔會即刻丟棄、亦唔會即刻交上應用層）。
4. **數據只有喺完整收到並重組完成之後**，先會交付畀 application layer。

> **English Standard Definition:** "During session setup, an initial sequence number (ISN) is set. As data is transmitted during the session, the sequence number is incremented by the number of bytes that have been transmitted. Segments received out of order are held for later processing. The data is delivered to the application layer only when it has been completely received and reassembled."

➜ 對照題解：`ITE3102_T9_Transport_StudyGuide.md` Q11（TCP 用 Sequence Number 重組同排序）

### 3.30 TCP Sequence Numbers and Acknowledgment（影片重點）— slide 34

繁中解說：slide 34 係 Cisco NetAcademy 影片（`Cisco NetAcademy_14.6.2_video`），主題係 **TCP sequence numbers and acknowledgment**。冇可抽取嘅文字內容，但配合 slide 24／25／33 可以完整還原佢嘅知識點。

> **圖示描述**：影片示範 TCP 發送方如何為每一個 byte 編號——起始值係 session setup 期間設定嘅 ISN，之後每傳一個 byte 就 +1；接收方回覆嘅 **acknowledgement number 就係佢下一個期望收到嘅 byte**（即已成功收到嘅最後一個 byte 加一）。所以 ACK 係「累積式」嘅：確認到第幾個 byte，就代表之前所有 byte 都已經安全收到。

> **English Standard Definition:** "The sequence number identifies the position of the data within the byte stream, and the acknowledgement number indicates the next byte expected; the sequence number is incremented by the number of bytes transmitted."

### 3.31 TCP Data Loss and Retransmission（數據丟失與重傳）— slide 35

繁中解說：**無論網絡設計得幾好，數據丟失總會偶爾發生**。TCP 提供管理 segment 丟失嘅方法，其中之一就係**為未經確認嘅數據重傳 segments（retransmit segments for unacknowledged data）**——呢個就係 TCP 可靠嘅關鍵後盾。

> **English Standard Definition:** "No matter how well designed a network is, data loss occasionally occurs. TCP provides methods of managing these segment losses, among them a mechanism to retransmit segments for unacknowledged data."

### 3.32 Selective Acknowledgment (SACK)（選擇性確認）— slide 36

繁中解說：今日嘅 host OS 通常都支援一個叫 **selective acknowledgment (SACK)** 嘅選擇性 TCP 功能，並且**喺三次交握期間協商**。如果雙方都支援 SACK，接收方就可以**明確指出邊啲 segments（bytes）已經收到，包括唔連續嘅 segments**——咁發送方就只需要重傳真正缺失嘅嗰幾段，而唔使連已收到嘅都重傳一次。純粹累積式 ACK 做唔到呢點。

> **English Standard Definition:** "Host operating systems today typically employ an optional TCP feature called selective acknowledgment (SACK), negotiated during the three-way handshake. If both hosts support SACK, the receiver can explicitly acknowledge which segments (bytes) were received, including any discontinuous segments."

### 3.33 Flow Control：Window Size 同 MSS — slide 37

繁中解說：Flow control 嘅五個關鍵事實：

1. **Window size** 決定咗「**喺等待確認之前，可以送出幾多 bytes**」（the number of bytes that can be sent before expecting an acknowledgment）。
2. **Maximum Segment Size (MSS)** 限制來源設備**喺每個 TCP segment 入面最多可以傳幾多數據**。
3. 來源會設定 **send window**——即係**喺未收到確認之前，佢可以送出嘅最後一個 byte**。
4. 通常**目的地唔會等到所有 bytes 都收齊先回確認**；**acknowledgement number 就係下一個期望收到嘅 byte 嘅編號**。
5. 來源可以**透過觀察「已送出但未被確認」嘅 TCP segments 嘅速率，去估計網絡壅塞（congestion）程度**。

> **English Standard Definition:** "The window size determines the number of bytes that can be sent before expecting an acknowledgment. The Maximum Segment Size limits the amount of data that the source device can transmit within each TCP segment."
> **English Standard Definition:** "The source sets the send window, which is the last byte that it can send without receiving an acknowledgement. The acknowledgement number is the number of the next expected byte."

### 3.34 TCP Flow Control — Window Size and Acknowledgments — slide 38

繁中解說：**Flow control 就係「目的地可以可靠接收同處理嘅數據量」**。佢透過**調整來源同目的地之間喺某個 session 嘅數據流速**，去維持 TCP 傳輸嘅可靠性——即係話，flow control 唔止保護接收方，亦係 TCP reliability 機制嘅一部分。

> **English Standard Definition:** "Flow control is the amount of data that the destination can receive and process reliably."
> **English Standard Definition:** "Flow control helps maintain the reliability of TCP transmission by adjusting the rate of data flow between source and destination for a given session."

### 3.35 Flow Control Example（滑動視窗計算範例）— slide 39

繁中解說：呢條係必考計算題，數字要記熟：

- Session 建立時，source 同 destination **同意 Initial Window Size = 10000**、**MSS = 1460**。
- Source 設定 **Send Window = 10000**（假設第一個 segment number 係 1）。
- 收到 **2 個 segments** 之後，destination 送出 **ACK = 2921**。
- Source 調整佢嘅 **Send Window = 12920**，即係佢可以再繼續送多 **10000 bytes**。
- 之後 destination 再收到 **1 個 segment**，送出 **ACK = 4381**。
- Source 再調整 **Send Window = 14380**。

點解會係 12920？因為呢度嘅 send window 係用「**最後一個可以送嘅 byte 編號**」表述：ACK = 2921 代表 2921 之前（即 byte 1–2920）全部確認收到，所以新嘅可送邊界 = 2920 + 10000 = **12920**。同理，ACK = 4381 → 4380 + 10000 = **14380**。

> **English Standard Definition:** "When the TCP session is established, TCP source and destination agree on the Initial Window Size (10000) and Maximum Segment Size (MSS = 1460). The source sets the send window (10000). The destination sends ACK = 2921 after receiving 2 segments, and the source adjusts its send window to 12920. The destination sends ACK = 4381 after receiving 1 segment, and the source adjusts its send window to 14380."

> **備註（兩種寫法）**：本 deck 用「**最後可送 byte 嘅編號**」表述 send window（10000 → 12920 → 14380）；Tutorial 題解（`ITE3102_T9_Transport_StudyGuide.md` Q15）就用「**剩餘可送 byte 數**」表述（10000 − 2 × 1460 = 7080，再 − 1460 = 5620）。兩者係同一個概念嘅兩種寫法：12920 − 2921 + 1 = 10000 bytes，7080 亦係 10000 − 2920。答題時睇清楚題目問「最後一個 byte 編號」定「剩餘 window」。

### 3.36 TCP Flow Control — Congestion Avoidance（壅塞避免）— slide 40

繁中解說：**當網絡發生壅塞（congestion），過載嘅 router 會丟棄封包**。為咗避免同控制壅塞，TCP 採用多種**congestion handling mechanisms、timers 同 algorithms**。對應考題：(c) 類問題問「A 察覺 segments 未被確認或者確認唔及時，佢可以做啲咩？」——答案就係縮細 send window、減慢發送速率（擁塞控制）。

> **English Standard Definition:** "When congestion occurs on a network, it results in packets being discarded by the overloaded router. To avoid and control congestion, TCP employs several congestion handling mechanisms, timers, and algorithms."

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/縮寫 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| Transport Layer | OSI Layer 4；喺唔同 host 嘅 applications 之間做 logical communications | "The transport layer is responsible for logical communications between applications running on different hosts." |
| Logical Communications | 應用對應用嘅邏輯通訊（唔係 host 對 host） | "The transport layer provides logical communications between applications, not between hosts." |
| Segmentation | 將數據切成 segments 以便傳送同多工 | "Segmenting data into smaller chunks enables many different communications to be multiplexed on the same network." |
| Reassembly | 喺目的地將 segments 重組返完整數據 | "Segmentation and reassembly allow the transport layer to manage individual conversations." |
| Conversation Multiplexing | 多個對話交錯共用同一條網絡 | "Uses segmentation and multiplexing to enable different communication conversations to be interleaved on the same network." |
| TCP (Transmission Control Protocol) | connection-oriented、可靠嘅傳輸層協議，提供確認、重傳、排序、flow control | "TCP provides reliability and flow control." |
| UDP (User Datagram Protocol) | connectionless、best-effort 嘅傳輸層協議，overhead 同 data checking 極少 | "UDP provides the basic functions for delivering datagrams with very little overhead and data checking." |
| Connection-Oriented | 連線導向：傳數據前先建立 session | "TCP is a connection-oriented protocol that establishes a session before forwarding any traffic." |
| Connectionless | 無連線：唔需要建立 session | "UDP is a connectionless protocol." |
| Best-Effort Delivery | 盡力送達但唔保證，冇 ACK | "UDP is known as a best-effort delivery protocol because there is no acknowledgment that the data is received at the destination." |
| Reliable Delivery | 確保每個 segment 都到達目的地 | "TCP ensures that each segment that is sent by the source arrives at the destination." |
| Same-Order Delivery / Ordered Delivery | 亂序到達嘅數據會被重排至正確次序 | "TCP provides same-order delivery." |
| Flow Control | 調整來源同目的地之間嘅數據流速，維持可靠性 | "Flow control is the amount of data that the destination can receive and process reliably." |
| Datagram | UDP 嘅傳輸單位（冇連線、冇序號） | "UDP delivers datagrams between the appropriate applications." |
| Port Number | 分辨數據屬於邊個應用程式嘅唯一識別碼 | "TCP and UDP manage multiple conversations by using unique identifiers called port numbers." |
| Source Port | 本機發起應用嘅 port；動態揀選，用嚟追蹤 | "The source port number is associated with the originating application on the local host." |
| Destination Port | 遠端目的應用嘅 port；話畀對方知要求邊個服務 | "The destination port number is associated with the destination application on the remote host." |
| Socket | IP address + port number 嘅組合 | "A socket is a combination of the Transport layer port number and Network layer IP address." |
| Return Address（source port） | source port 扮演回郵地址嘅角色 | "The source port acts as a return address for the requesting application." |
| IANA | 負責分配 port numbers 等 addressing standards 嘅機構 | "The Internet Assigned Numbers Authority (IANA) is the standards body responsible for assigning port numbers." |
| Well-Known Ports | **0 to 1,023**；保留畀常見服務 | "Well-known ports are 0 to 1,023 and are reserved for common or popular services and applications." |
| Registered Ports | **1,024 to 49,151**；由 IANA 分配畀請求機構（例：Cisco RADIUS 1812） | "Registered ports are 1,024 to 49,151 and are assigned by IANA to a requesting entity." |
| Private / Dynamic Ports (ephemeral) | **49,152 to 65,535**；client OS 動態分配 | "Private and/or dynamic ports are 49,152 to 65,535 and are also known as ephemeral ports." |
| netstat | 檢查 host 上面 open／running 嘅 TCP connections 嘅工具 | "Netstat is an important tool to verify connections; unexplained TCP connections can pose a major security threat." |
| UDP Header | 只有 4 個欄位，共 8 bytes（64 bits） | "The UDP header only has four fields and requires 8 bytes (i.e. 64 bits)." |
| Stateless Protocol | UDP 冇 tracking，可靠性交由應用處理 | "UDP is a stateless protocol — no tracking; reliability is handled by the application." |
| TCP Header | 基本 20 bytes total | "The TCP header consists of Source Port, Destination Port, Sequence Number, Acknowledgment Number, Header Length, Reserved, Control Bits, Window, Checksum and Urgent — 20 bytes total." |
| Sequence Number | 32-bit；用於 data reassembly；按已傳 byte 數遞增 | "The sequence number is a 32-bit field used for data reassembly purposes." |
| Acknowledgment Number | 32-bit；表示已收到數據，並指出下一個期望嘅 byte | "The acknowledgment number is used to indicate that data has been received and the next byte expected from the source." |
| Header Length | 4-bit；又叫 "data offset"，指出 TCP segment header 長度 | "The header length is a 4-bit field known as data offset." |
| Reserved | 6-bit；留待將來使用 | "The reserved field is a 6-bit field that is reserved for future use." |
| Control Bits | 6-bit；包含 flags 指出 segment 嘅用途同功能 | "The control bits are a 6-bit field that includes flags indicating the purpose and function of the TCP segment." |
| Window / Window Size | 16-bit；一次可以接受嘅 byte 數 | "The window is a 16-bit field used to indicate the number of bytes that can be accepted at one time." |
| Checksum | 16-bit；錯誤檢查（TCP 同 UDP 都有） | "The checksum is a 16-bit field used for error checking of the segment header and data." |
| Urgent Pointer | 16-bit；指出數據係咪 urgent | "The urgent field is used to indicate if the contained data is urgent." |
| URG | Urgent pointer field significant | "URG means the urgent pointer field is significant." |
| ACK | 確認 flag；用於連線建立同 session 終止 | "ACK is the acknowledgment flag used in connection establishment and session termination." |
| PSH | Push function | "PSH is the push function." |
| RST | 發生錯誤或 timeout 時重設連線 | "RST resets the connection when an error or timeout occurs." |
| SYN | 同步序號；用於建立連線 | "SYN synchronizes sequence numbers and is used in connection establishment." |
| FIN | 發送方冇更多數據；用於終止 session | "FIN means there is no more data from the sender and is used in session termination." |
| Three-Way Handshake | 建立 TCP session 嘅三步：SYN → SYN, ACK → ACK | "The three-way handshake is SYN, SYN-ACK, and ACK." |
| Session Termination | 終止 session 嘅四步：FIN → ACK → FIN → ACK | "TCP session termination uses four steps: FIN, ACK, FIN, ACK." |
| Initial Sequence Number (ISN) | 喺 session setup 期間設定嘅起始序號 | "During session setup, an initial sequence number (ISN) is set." |
| SACK (Selective Acknowledgment) | 選擇性確認；喺三次交握期間協商 | "SACK is negotiated during the three-way handshake; the receiver can explicitly acknowledge which segments were received, including discontinuous segments." |
| MSS (Maximum Segment Size) | 每個 TCP segment 最多可攜帶嘅數據量 | "The Maximum Segment Size limits the amount of data that the source device can transmit within each TCP segment." |
| Send Window | 未收到確認之前可以送出嘅最後一個 byte | "The source sets the send window, which is the last byte that it can send without receiving an acknowledgement." |
| Retransmission | 為未經確認嘅數據重傳 segments | "TCP provides a mechanism to retransmit segments for unacknowledged data." |
| Congestion Avoidance | 用 mechanisms、timers、algorithms 避免同控制壅塞 | "To avoid and control congestion, TCP employs several congestion handling mechanisms, timers, and algorithms." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**階段 1：先理解觀念（Understand）**
先搞清楚 transport layer 喺整個 stack 嘅位置：application layer 交低數據 → transport layer 分段、加 header（port numbers）、做 multiplexing → lower layers 負責運送。然後掌握兩條主線嘅本質分別：**TCP = connection-oriented、可靠、有序、有 flow control**；**UDP = connectionless、best-effort、overhead 低、可靠性交畀應用**。最後理解 **socket = IP + port** 呢個「唯一識別一個通訊端點」嘅概念，因為 `netstat`、Socket Pairs、TCP/UDP 客戶端／伺服器行為全部建基於此。

**階段 2：背誦英文短語（Memorize）**
必背清單：① Transport layer 角色兩句；② 五大職責；③ TCP 四大特性（Establishes a Session／Ensures Reliable Delivery／Provides Same-Order Delivery／Supports Flow Control）；④ UDP 四大特性；⑤ 三個 port ranges（0–1,023 / 1,024–49,151 / 49,152–65,535）；⑥ Well-known port 表；⑦ 六個 control bits 全寫同意思；⑧ 三次交握三步、四次揮手四步。

**階段 3：掌握計算與判斷（Calculate & Judge）**
四種必須練熟嘅操作：① **數字識別**——由 header 欄位同 bit 數判斷係 TCP 定 UDP（4 欄位 = UDP；有 Sequence／Acknowledgment 欄位 = TCP）；② **滑動視窗計算**——Initial Window Size 10000、MSS 1460 嘅範例要能即時算出 12920 / 14380；③ **應用選擇**——要有序要完整揀 TCP，要低延遲容忍丟失揀 UDP；④ **`netstat` 解讀**——分得出 local address、foreign address、state（ESTABLISHED）同 source／destination port。

**階段 4：能解答英文考題（Answer Exam Questions）**
自問自答以下典型題：
- "What are the responsibilities of the transport layer?" → tracking individual conversations、segmenting data and reassembling segments、adding header information、identifying, separating and managing multiple conversations（見 §3.2）
- "Which protocol uses less overhead — TCP or UDP?" → "UDP, because its header is only 8 bytes whereas the TCP header is 20 bytes total."
- "Match the port ranges to the IANA port groups." → "0–1,023 = well-known; 1,024–49,151 = registered; 49,152–65,535 = private/dynamic."（見 §3.10）
- "Describe the three-way handshake and the session termination." → "SYN, SYN+ACK, ACK; FIN, ACK, FIN, ACK."（見 §3.25、§3.26）
- "What is a socket?" → "The combination of an IP address and a port number."（見 §3.12）
- "How does the sender adjust its send window after receiving ACK = 2921?" → "It sets the send window to 12920."（見 §3.35）
- "How are reliability and flow control related?" → "Flow control adjusts the rate of data flow between source and destination to help maintain the reliability of TCP transmission."（見 §3.34）

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 🔢 關鍵數字（Key Numbers）

| 項目 | 數字 |
|---|---|
| UDP Header 大小 | **8 bytes（64 bits）**，4 個欄位：Source Port、Destination Port、Length、Checksum（全部 16-bit） |
| TCP Header 基本大小 | **20 Bytes Total** |
| TCP 欄位 bit 數 | Source／Destination Port 16；Sequence／Acknowledgment Number 32；Header Length 4；Reserved 6；Control Bits 6；Window 16；Checksum 16；Urgent 16 |
| Well-known Ports | **0 – 1,023** |
| Registered Ports | **1,024 – 49,151**（例：Cisco RADIUS **1812**） |
| Private / Dynamic Ports（ephemeral） | **49,152 – 65,535** |
| Flow Control 範例 | Initial Window Size **10000**、MSS **1460**、ACK **2921** → Send Window **12920**、ACK **4381** → Send Window **14380** |
| 三次交握 | **3 步：SYN → SYN, ACK → ACK** |
| 四次揮手 | **4 步：FIN → ACK → FIN → ACK** |
| 六個 Control Bits | **URG, ACK, PSH, RST, SYN, FIN** |

### 🔌 必背 Well-Known Port 速記表

| Port | Protocol | Application | 記法 |
|---|---|---|---|
| 20 | TCP | FTP - Data | FTP 數據 |
| 21 | TCP | FTP - Control | FTP 控制 |
| 22 | TCP | SSH | 安全遠端登入 |
| 23 | TCP | Telnet | 遠端登入 |
| 25 | TCP | SMTP | 寄 email |
| 53 | UDP, TCP | DNS | 域名解析（同時 UDP 同 TCP） |
| 67 / 68 | UDP | DHCP - Server / Client | 派 IP |
| 69 | UDP | TFTP | 簡易檔案傳輸 |
| 80 | TCP | HTTP | 網頁 |
| 110 | TCP | POP3 | 收 email |
| 143 | TCP | IMAP | 收 email |
| 161 | UDP | SNMP | 網絡管理 |
| 443 | TCP | HTTPS | 加密網頁 |

### ⚖️ TCP vs UDP 對比表

| 特性 | TCP | UDP |
|---|---|---|
| 連線 | Connection-oriented（要 session） | Connectionless |
| 可靠性 | Reliable（有 ACK、有重傳） | Best-effort（冇 ACK） |
| 排序 | Same-order delivery（Sequence Number） | 按收到嘅次序重組，唔排序 |
| 丟失處理 | Retransmit unacknowledged data | Lost segments are not resent |
| Flow Control | 有（Window Size、MSS） | 冇（唔通知發送方資源狀況） |
| Header | 20 bytes total | 8 bytes（4 欄位） |
| State | 有 tracking | Stateless |
| Session 建立 | Three-way handshake | 冇 session establishment |
| 典型應用 | HTTP, FTP, SMTP, Telnet, POP3, IMAP, SSH, HTTPS | DHCP, TFTP, VoIP, IPTV, DNS, SNMP |

### 🧠 英文記憶口訣（Memory Mnemonics）

- **Transport layer 五大職責**：「**Track, Segment, Header, Identify, Multiplex**」——追蹤對話、分段重組、加 header、識別分隔對話、分段＋多工交錯。
- **TCP 四大特性**：「**Session, Reliable, Same-Order, Flow Control**」。
- **UDP 四無**：**No order guarantee、No resend、No session establishment、No resource feedback**。
- **握手／分手**：**握手 SYN → SYN,ACK → ACK**；**分手 FIN → ACK → FIN → ACK**。
- **六個 Flags 由左至右**：**URG ACK PSH RST SYN FIN**。
- **Port 三大範圍**：「**Well-known at 0, Registered at 1024, Dynamic at 49152**」。
- **Socket**：「**IP + Port = Socket**」；source port 就係 **return address**。
- **Send Window**：「**送出就前移，ACK 一到就再推**」——10000 → 12920 → 14380。

### ✅ 60 秒自測清單

1. Transport layer 負責邊兩件事？（logical communications between applications／application layer 同 lower layers 之間嘅橋樑）
2. TCP 同 UDP 各自嘅 reliability 邊度嚟？（TCP：ACK＋重傳＋排序；UDP：**reliability handled by the application**）
3. Port ranges 三組數字同組名？（0–1,023 well-known／1,024–49,151 registered／49,152–65,535 private-dynamic）
4. Socket 嘅定義一句？（"A socket is a combination of the Transport layer port number and Network layer IP address."）
5. TCP header 幾多 bytes？UDP header 幾多 bytes？（20 bytes total／8 bytes）
6. 三次交握三步嘅 control bits？（SYN → SYN, ACK → ACK）
7. 四次揮手四步嘅 control bits？（FIN → ACK → FIN → ACK）
8. 六個 control bits？（URG, ACK, PSH, RST, SYN, FIN）
9. MSS 限制咩？（每個 TCP segment 可以攜帶嘅數據量）
10. 網絡壅塞時 destination 收到咩？TCP 點應對？（router 丟棄封包／用 congestion handling mechanisms、timers、algorithms 避免同控制）
