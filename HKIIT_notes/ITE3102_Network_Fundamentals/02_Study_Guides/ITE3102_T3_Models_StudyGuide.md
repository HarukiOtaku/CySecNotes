# ITE3102 Tutorial 3: OSI & TCP/IP Models — 雙語練習題解 Guide

> **來源**：ITE3102 Network Fundamentals — Tutorial 3: Network Models（OSI & TCP/IP Models）
> **原始檔**：`01_Raw_Materials/Tutorials/T3-Models.docx`
> **閱讀方法**：繁中解說理解答題邏輯 → 英文 Blockquote 直接背誦 → 對照答案自測 → 考前用懶人包速記

---

## 📝 1. 練習概要（Summary）

本練習是「網絡模型（Network Models）」的必修基礎課，考核兩個核心框架：**OSI Model**（7 層參考模型）與 **TCP/IP Model**（4 層實用模型）。學生需要做到三件事：第一，能完整背出兩個模型每一層的名稱，並把常見協議（**TCP**、**UDP**、**HTTP**、**DNS**、**IP**、**Ethernet** 等）正確對應到所屬層級；第二，能根據「功能描述」反推出該功能屬於哪一層（例如「path determination and logical addressing」＝ Network Layer）；第三，理解資料在層與層之間流動時的形態轉變，即 **PDU**（**Data → Segment → Packet → Frame → Bits**）與 **Encapsulation / De-encapsulation** 的順序。

練習後半部是典型的「Frame 追蹤」題：給定兩個 LAN 經路由器串連的位址表，要求學生填出 Ethernet Frame 內的 **Destination MAC**、**Source MAC**、**Source IP**、**Destination IP**。這是大專與 Cisco 考試（CCNA 級別）最愛考的陷阱題——核心規律是「**MAC address 每一跳（hop）都會更換，IP address 端到端保持不變**」。掌握這條規律，再加上「同網段直接送、跨網段送給 Default Gateway（Router）」的判斷，就能穩取全部分數。

## 🎯 2. 練習目標（Objectives）

完成本練習後，你應能掌握以下能力（附英文對照）：

1. **背誦並比較 OSI 7 層與 TCP/IP 4 層** — Describe and compare the layers of the OSI model and the TCP/IP model
2. **把協議歸類到正確層級** — Identify which protocols operate at each layer (e.g., TCP/UDP at Transport, IP/ICMP at Internet/Network, Ethernet at Data Link/Network Access)
3. **按功能描述判斷 OSI 層** — Identify the OSI layer that performs a given function (e.g., logical addressing → Network layer)
4. **按功能描述判斷 TCP/IP 層** — Identify the TCP/IP layer that performs a given function
5. **解釋網絡協議的五大規則** — Explain message sizing, encoding, timing, encapsulation, and delivery options
6. **分辨 Unicast / Multicast / Broadcast** — Distinguish one-to-one, one-to-many, and one-to-all delivery
7. **背出各層 PDU 名稱與封裝／解封順序** — Name the PDU at each layer (Data, Segment, Packet, Frame, Bits) and the encapsulation/de-encapsulation sequence
8. **填寫 Ethernet Frame 的位址欄位** — Determine the Source/Destination MAC and IP addresses of a frame for local and remote communication

---

## ✏️ 3. 題目與答案 Walkthrough

### Q1. Consider the following table for the OSI model and the TCP/IP model:

#### Q1(a) Fill in the different layers in each model and identify the following protocols to the last column: TCP, UDP ｜ DHCP, DNS, FTP, HTTP ｜ ICMP, IP (i.e. IPv4, IPv6) ｜ BOOTP, IMAP, POP, SMTP ｜ ATM, Ethernet, Frame Relay, PPP, WLAN

**✅ Answer（完整答案表）**

| OSI Model（由頂至底） | TCP/IP Model（由頂至底） | Protocols |
|---|---|---|
| **Application**（應用層） | **Application**（應用層，合併 OSI 頂三層） | DHCP, DNS, FTP, HTTP, BOOTP, IMAP, POP, SMTP |
| **Presentation**（表達層） | ↑ 併入 Application | — |
| **Session**（會話層） | ↑ 併入 Application | — |
| **Transport**（傳輸層） | **Transport**（傳輸層） | TCP, UDP |
| **Network**（網絡層） | **Internet**（網際層） | ICMP, IP (IPv4, IPv6) |
| **Data Link**（數據鏈路層） | **Network Access**（網絡存取層，合併 OSI 底兩層） | ATM, Ethernet, Frame Relay, PPP, WLAN |
| **Physical**（物理層） | ↑ 併入 Network Access | — |

**繁中答題邏輯解說**

OSI 是「參考模型」：**Application / Presentation / Session / Transport / Network / Data Link / Physical** 共 7 層；TCP/IP 是「實用模型」，把 OSI 頂三層（Application、Presentation、Session）合併為一層 **Application**，把底兩層（Data Link、Physical）合併為 **Network Access**，中間的 **Transport** 與 **Network（TCP/IP 叫 Internet）** 一一對應。協議歸類只看「功能」：凡是應用程式之間的協議（**DHCP、DNS、FTP、HTTP、BOOTP、IMAP、POP、SMTP**）全屬 Application 層；負責「可靠／不可靠端到端傳輸」的是 **TCP、UDP**（Transport）；負責「邏輯定址與路由」的是 **IP (IPv4, IPv6)**，附帶診斷用途的 **ICMP**（Network / Internet 層）；負責「把 Frame 送上實體媒介」的 LAN/WAN 技術 **ATM、Ethernet、Frame Relay、PPP、WLAN** 全屬 Data Link / Network Access 層。

> English Standard Definitions:
> - "The OSI model is a conceptual framework that standardizes the functions of a communication system into seven layers: Application, Presentation, Session, Transport, Network, Data Link, and Physical."
> - "The TCP/IP model is the practical model used on the Internet; it has four layers: Application, Transport, Internet, and Network Access."
> - "The Transport layer is responsible for end-to-end communication; TCP provides reliable delivery and UDP provides best-effort delivery."

**🎯 Exam Answer Phrase**
- "HTTP, DNS, FTP, SMTP, POP, IMAP, DHCP and BOOTP are Application layer protocols; TCP and UDP are Transport layer protocols; IP and ICMP are Internet layer protocols; Ethernet, WLAN, PPP, Frame Relay and ATM are Network Access layer protocols."

---

#### Q1(b) Identify the OSI layer that performs each of the following functions:

| 功能描述（原文） | ✅ OSI Layer（答案） |
|---|---|
| Maintains data frames | **Data Link**（數據鏈路層） |
| Performs path determination and logical addressing | **Network**（網絡層） |
| Performs encoding/decoding for binary transmission | **Physical**（物理層） |
| Provides data representation and encryption | **Presentation**（表達層） |
| Provides end-to-end connections and reliability | **Transport**（傳輸層） |
| Organizes dialogue and manages data exchange | **Session**（會話層） |
| Maintains process-to-process communications | **Application**（應用層） |

**繁中答題邏輯解說**

這類「功能 → 層」的題目要用關鍵字對號入座：見到 **frames**（幀）一定是 **Data Link**（Data Link 的 PDU 正是 Frame）；見到 **path determination**（選路）與 **logical addressing**（邏輯定址，即 IP 位址）一定是 **Network**；見到 **encoding/decoding** 與 **binary**（位元）一定是 **Physical**（物理層負責把 bit 轉成訊號）；見到 **data representation**（資料表示）與 **encryption**（加密）一定是 **Presentation**；見到 **end-to-end** 與 **reliability**（可靠性）一定是 **Transport**（TCP 的標誌）；見到 **dialogue**（對話）與 **data exchange** 管理一定是 **Session**；見到 **process-to-process**（程式與程式之間）一定是 **Application**。

> English Standard Definitions:
> - "The Data Link layer maintains data frames and provides physical addressing (MAC addresses)."
> - "The Network layer performs path determination and logical addressing using IP addresses."
> - "The Physical layer performs encoding and decoding of bits for binary transmission."
> - "The Presentation layer provides data representation (formatting) and encryption."
> - "The Transport layer provides end-to-end connections and reliability."
> - "The Session layer organizes dialogue and manages data exchange."
> - "The Application layer maintains process-to-process communications."

**🎯 Exam Answer Phrase**
- "Path determination and logical addressing are performed by the Network layer; end-to-end reliability is provided by the Transport layer; maintaining data frames is the function of the Data Link layer."

---

#### Q1(c) Identify the TCP/IP layer that performs each of the following functions:

| 功能描述（原文） | ✅ TCP/IP Layer（答案） |
|---|---|
| Controls the hardware devices and media | **Network Access**（網絡存取層） |
| Determines the best path through the network | **Internet**（網際層） |
| Represents data to the user plus encoding and dialog control | **Application**（應用層） |
| Supports communication between diverse devices | **Transport**（傳輸層） |

**繁中答題邏輯解說**

TCP/IP 只有 4 層，判別更快：**hardware devices and media**（硬件與媒介）→ **Network Access**（TCP/IP 底層就是處理硬件與實體媒介）；**best path**（最佳路徑，即路由）→ **Internet**（等於 OSI Network 層，唯一負責選路的一層）；**represents data to the user**（向用戶呈現資料）＋ **encoding** 與 **dialog control** → **Application**（TCP/IP 把 OSI 的 Application、Presentation、Session 三層功能全部併入 Application）；最後一題最容易錯——**supports communication between diverse devices**（支援不同設備之間的通訊）指的是 **Transport**，因為 TCP/IP 的 Transport 層正是負責在「不同設備上的應用程式」之間提供通訊服務（對應 Cisco 教材原文 "The transport layer supports communication between diverse devices across diverse networks"），而不是 Network Access 或 Internet。

> English Standard Definitions:
> - "The Network Access layer controls the hardware devices and media that make up the network."
> - "The Internet layer determines the best path through the network."
> - "The Application layer represents data to the user, plus encoding and dialog control."
> - "The Transport layer supports communication between diverse devices across diverse networks."

**🎯 Exam Answer Phrase**
- "In the TCP/IP model, the Network Access layer controls the hardware and media, the Internet layer determines the best path, the Transport layer supports communication between diverse devices, and the Application layer represents data to the user."

---

### Q2. In addition to identifying the source and destination, network protocols need to define the details of how a message is transmitted across a network.

#### Q2(a) Match each protocol requirement to the appropriate descriptions on the right.

| Protocol Requirement（協議要求） | ✅ 對應描述（答案） |
|---|---|
| **Message sizing**（訊息分段） | Breaks up a long message into smaller pieces（把長訊息拆成小片段） |
| **Message encoding**（訊息編碼） | Converts information into another acceptable form for transmission（把資訊轉換成另一種可傳輸的形式） |
| **Message timing**（訊息時序） | Manages access method, flow control, and response timeout（管理存取方法、流量控制與回應逾時） |
| **Message encapsulation**（訊息封裝） | Places one message format inside another message format（把一種訊息格式放入另一種訊息格式內） |
| **Message delivery options**（訊息投遞方式） | Sends out message to just an individual or to a group of people or all people at the same time（只發給一個人、一群人，或同一時間發給所有人） |

**繁中答題邏輯解說**

把五個名詞想成「傳訊息的五道工序」：(1) **Message sizing** 是「拆細」——長訊息先拆成小片段（segment/packet）方便傳輸；(2) **Message encoding** 是「轉換」——把資訊轉成另一種雙方都接受的形式（例如文字轉 bit）；(3) **Message encapsulation** 是「打包套疊」——把上一層的 PDU 放入下一層的 header 之內（一層包一層）；(4) **Message timing** 是「計時與秩序」——涵蓋 access method（何時可以開始送）、flow control（流量控制）、response timeout（等幾耐回應）；(5) **Message delivery options** 是「送給誰」——個人、群組或全部人（即 Unicast / Multicast / Broadcast）。注意最易混淆的一對：**encoding 是「轉換格式」**，**encapsulation 是「套入另一格式」**，兩個字都含「format」但意思不同——看到 "inside another" 就是 encapsulation，看到 "converts ... into another form" 就是 encoding。

> English Standard Definitions:
> - "Message sizing breaks up a long message into smaller pieces."
> - "Message encoding is the process of converting information into another acceptable form for transmission."
> - "Message encapsulation is the process of placing one message format inside another message format."
> - "Message timing manages the access method, flow control, and response timeout."
> - "Message delivery options determine whether a message is sent to an individual, a group, or everyone."

**🎯 Exam Answer Phrase**
- "Message sizing breaks a long message into pieces; message encoding converts information into another form; message encapsulation places one format inside another; message timing manages access method, flow control and response timeout; delivery options define unicast, multicast and broadcast."

---

#### Q2(b) Match each message timing to its appropriate purpose.

| Message Timing（時序項目） | ✅ 對應目的（答案） |
|---|---|
| **Flow control**（流量控制） | Ensure that packets are not dropped because too much data is being sent too quickly（確保不會因傳送太快、資料過多而丟包） |
| **Access method**（存取方法） | Determines when to begin sending messages（決定何時開始傳送訊息） |
| **Response timeout**（回應逾時） | Specifies how long to wait for responses and action to take if a response timeout occurs（指定要等多久回應，以及逾時後採取甚麼行動） |

**繁中答題邏輯解說**

三個詞都是「時間／節奏」控制，但職責不同：**Flow control** 處理「速度」——發送方送得太快會令接收方 buffer 爆滿而掉包，所以要協商傳送節奏；**Access method** 處理「開始時機」——決定「誰、幾時」可以開始送出訊息（例如 Ethernet 的 CSMA/CD）；**Response timeout** 處理「等待」——設定一個可接受的等待時間，若超過時間沒有回應就採取後續行動（例如重傳）。關鍵字速記：**too much data / too quickly → Flow control**；**when to begin → Access method**；**how long to wait → Response timeout**。

> English Standard Definitions:
> - "Flow control ensures that packets are not dropped because too much data is being sent too quickly."
> - "The access method determines when someone is able to begin sending a message."
> - "Response timeout specifies how long to wait for a response and what action to take if a response timeout occurs."

**🎯 Exam Answer Phrase**
- "Flow control prevents packet loss caused by sending too much data too quickly; the access method determines when to begin sending; response timeout specifies how long to wait for a reply."

---

#### Q2(c) Match the communication type on the right to the appropriate message delivery option.

| Message Delivery Option（投遞方式） | ✅ Communication Type（通訊類型） |
|---|---|
| **Broadcast**（廣播） | One-to-all（一對全部） |
| **Multicast**（多點傳播） | One-to-many（一對多） |
| **Unicast**（單點傳播） | One-to-one（一對一） |

**繁中答題邏輯解說**

「送給誰」三級分明：**Unicast = one-to-one**（只送給一個特定目的地，日常上網絕大多數流量）；**Multicast = one-to-many**（送給「一群」已加入群組的接收者，例如 IPTV 串流）；**Broadcast = one-to-all**（送給網段內所有人，例如 DHCP Discover 及 ARP request）。考試常把三個英文名與三個 "one-to-X" 拆開考配對，只要記住「U=one-to-one、M=one-to-many、B=one-to-all」即可秒殺。

> English Standard Definitions:
> - "Unicast is a one-to-one delivery option: a message is sent to a single destination."
> - "Multicast is a one-to-many delivery option: a message is sent to a group of interested recipients."
> - "Broadcast is a one-to-all delivery option: a message is sent to every host in the network."

**🎯 Exam Answer Phrase**
- "Unicast is one-to-one, multicast is one-to-many, and broadcast is one-to-all communication."

---

### Q3. The form that a piece of data takes at a network layer is called a Protocol Data Unit (PDU).

#### Q3(a) Fill in the PDU names PDU1 to PDU5 at the various network layers.

**✅ Answer（由頂至底）**

| 層（Layer） | PDU 名稱（答案） |
|---|---|
| Application（應用層） | **PDU1 = Data**（資料） |
| Transport（傳輸層） | **PDU2 = Segment**（段） |
| Network（網絡層） | **PDU3 = Packet**（封包） |
| Data Link（數據鏈路層） | **PDU4 = Frame**（幀） |
| Physical（物理層） | **PDU5 = Bits**（位元） |

**繁中答題邏輯解說**

**PDU（Protocol Data Unit）** 是「資料在某層的形態名稱」，一層一名字：最頂層叫 **Data**；落到 Transport 加上 header 叫 **Segment**；落到 Network 叫 **Packet**；落到 Data Link 變成 **Frame**；最後在 Physical 以 **Bits**（位元流）傳上媒介。背誦口訣：**「資料→段→包→幀→位元」**（Data → Segment → Packet → Frame → Bits），對應層數由 5、4、3、2、1 逐層向下。

> English Standard Definitions:
> - "The PDU at the Application layer is called data, at the Transport layer it is called a segment, at the Network layer it is called a packet, at the Data Link layer it is called a frame, and at the Physical layer it is called bits."
> - "A Protocol Data Unit (PDU) is the form that a piece of data takes at a particular network layer."

**🎯 Exam Answer Phrase**
- "The PDU names are: Data at the Application layer, Segment at the Transport layer, Packet at the Network layer, Frame at the Data Link layer, and Bits at the Physical layer."

---

#### Q3(b) The sequence of PDU processed during the encapsulation of the email: Data ______ ______ ______ ______

**✅ Answer**
**Data → Segment → Packet → Frame → Bits**

**繁中答題邏輯解說**

**Encapsulation（封裝）** 是由發送方「由上至下」進行的：應用程式產生 **Data** → Transport 層加 TCP/UDP header 變成 **Segment** → Network 層加 IP header 變成 **Packet** → Data Link 層加 frame header/trailer 變成 **Frame** → Physical 層轉成 **Bits** 送上媒介。每一層都「加一層 header」，所以順序必然是 Data → Segment → Packet → Frame → Bits。

> English Standard Definitions:
> - "During encapsulation, the PDU changes as it moves down the layers: Data, then Segment, then Packet, then Frame, and finally Bits for transmission."

**🎯 Exam Answer Phrase**
- "The encapsulation sequence of an email is Data → Segment → Packet → Frame → Bits."

---

#### Q3(c) The sequence is reversed in the de-encapsulation process as: ______ ______ ______ ______ Data

**✅ Answer**
**Bits → Frame → Packet → Segment → Data**

**繁中答題邏輯解說**

**De-encapsulation（解封）** 是接收方「由下至上」的逆過程：收到 **Bits** → Physical 層還原 → Data Link 層剝去 frame header 得回 **Frame** 內的 **Packet** → Network 層剝去 IP header 得回 **Segment** → Transport 層剝去 TCP/UDP header 得回 **Data** 交給應用程式。所以只是把 (b) 的順序完全倒轉——這是送分題，只要記得「封裝向下、解封向上」就不會錯。

> English Standard Definitions:
> - "De-encapsulation is the reverse process: Bits → Frame → Packet → Segment → Data, as each layer strips its own header."

**🎯 Exam Answer Phrase**
- "The de-encapsulation sequence is the reverse: Bits → Frame → Packet → Segment → Data."

---

### Q4. Consider the address settings for the devices in the LANs linked serially below.

**設備位址表（題目資料）**

| Device | Logical (IP) Address | MAC Address |
|---|---|---|
| HostA | 192.168.1.110 | AAAA.AAAA.AAAA |
| HostB | 172.16.2.99 | BBBB.BBBB.BBBB |
| ServerB | 172.16.1.99 | BBBB.1234.5678 |
| RouterA-G0 | 192.168.1.1 | AAAA.CCCC.0000 |
| RouterA-S0 | 200.1.2.17 | AAAA.EEEE.0000 |
| RouterB-G1 | 172.16.1.1 | BBBB.CCCC.1111 |
| RouterB-S1 | 200.1.2.18 | BBBB.EEEE.1111 |

**網絡結構**：LAN 1（192.168.1.0/24：HostA + RouterA-G0）— 串行 WAN（200.1.2.0/30：RouterA-S0 ↔ RouterB-S1）— LAN 2（172.16.0.0/16：ServerB、HostB + RouterB-G1）。

#### Q4(a) ServerB sending a packet to HostB — For local communication, the following Ethernet frame containing the packet will be sent:

| Frame Field | ✅ 答案 |
|---|---|
| **A1** = Destination MAC Address | **BBBB.BBBB.BBBB**（= HostB 的 MAC） |
| **A2** = Source MAC Address | **BBBB.1234.5678**（= ServerB 的 MAC） |
| **A3** = Source IP Address | **172.16.1.99**（= ServerB 的 IP） |
| **A4** = Destination IP Address | **172.16.2.99**（= HostB 的 IP） |

**繁中答題邏輯解說**

先判斷「本地還是跨網段」：ServerB（172.16.1.99）與 HostB（172.16.2.99）同屬 172.16.0.0/16（注意 Subnet Mask 是 /16，所以兩個 .x.x 都在同一網段），是 **local communication**。同網段傳送時，**不需要經過 Router**：Sender 直接用 ARP 查到目的地 HostB 的 MAC，Frame 直接由 ServerB 送到 HostB。所以 Destination MAC = HostB 的 MAC（BBBB.BBBB.BBBB），Source MAC = ServerB 自己的 MAC（BBBB.1234.5678）；IP 欄位永遠是「真正的來源與目的地」，即 Source IP = 172.16.1.99、Destination IP = 172.16.2.99。

> English Standard Definitions:
> - "For local communication, the destination MAC address is the MAC address of the destination host itself."
> - "The Source and Destination IP addresses always identify the original sender and the final receiver; they do not change during local delivery."

**🎯 Exam Answer Phrase**
- "For local communication, the frame is sent directly to the destination host: Destination MAC = BBBB.BBBB.BBBB (HostB), Source MAC = BBBB.1234.5678 (ServerB), Source IP = 172.16.1.99, Destination IP = 172.16.2.99."

---

#### Q4(b) ServerB sending a packet to HostA — For remote communication, the following frame containing the packet will be sent from ServerB to RouterB-G1:

| Frame Field | ✅ 答案 |
|---|---|
| **B1** = Destination MAC Address | **BBBB.CCCC.1111**（= RouterB-G1 的 MAC，即 Default Gateway） |
| **B2** = Source MAC Address | **BBBB.1234.5678**（= ServerB 的 MAC） |
| **B3** = Source IP Address | **172.16.1.99**（= ServerB 的 IP） |
| **B4** = Destination IP Address | **192.168.1.110**（= HostA 的 IP） |

**繁中答題邏輯解說**

ServerB 要傳給 HostA（192.168.1.110），不在同一網段，屬 **remote communication**。主機發現目的地不在自己網段時，會把 Frame 送給 **Default Gateway（Router）**——因為 ServerB 不知道 HostA 的 MAC，只知道 RouterB-G1 的 MAC。所以這一跳的 **Destination MAC = RouterB-G1 的 MAC（BBBB.CCCC.1111）**，Source MAC 仍是 ServerB 自己；而 **IP 欄位完全不變**：Source IP = ServerB（172.16.1.99），Destination IP = HostA（192.168.1.110），因為 IP 代表「最終來源與最終目的地」，永遠不會改成 Router 的 IP。這是全題最重要的規律。

> English Standard Definitions:
> - "For remote communication, the source host sends the frame to its default gateway (router), so the destination MAC address is the router's MAC address."
> - "The IP addresses are never changed to the router's addresses; they always remain the original source and final destination."

**🎯 Exam Answer Phrase**
- "For remote communication, the frame is sent to the default gateway: Destination MAC = BBBB.CCCC.1111 (RouterB-G1), Source MAC = BBBB.1234.5678 (ServerB), while Source IP = 172.16.1.99 and Destination IP = 192.168.1.110 remain unchanged."

---

#### Q4(c) When RouterB receives the frame, RouterB will de-capsulate the packet and find that it should be sent out via exit S1. Finally RouterA will receive the packet and RouterA will encapsulate the packet into the frame below for HostA:

| Frame Field | ✅ 答案 |
|---|---|
| **B5** = Destination MAC Address | **AAAA.AAAA.AAAA**（= HostA 的 MAC） |
| **B6** = Source MAC Address | **AAAA.CCCC.0000**（= RouterA-G0 的 MAC） |
| **B7** = Source IP Address | **172.16.1.99**（= ServerB 的 IP，不變） |
| **B8** = Destination IP Address | **192.168.1.110**（= HostA 的 IP，不變） |

**繁中答題邏輯解說**

Packet 沿途經過兩個 Router：RouterB 由 S1 轉送給 RouterA，RouterA 收到後 **de-capsulate**（剝去 WAN 的 Frame），查路由表發現目的地 HostA 在自己的 G0 網段（192.168.1.0/24），於是 **re-encapsulate** 成新的 Ethernet Frame 從 G0 送給 HostA。因為這是「最後一跳」，Destination MAC 換成真正目的地 **HostA 的 MAC（AAAA.AAAA.AAAA）**，Source MAC 換成送出介面 **RouterA-G0 的 MAC（AAAA.CCCC.0000）**——注意 Router 轉發時只改 MAC（Frame 每跳重造），**IP 欄位端到端完全一樣**（B7 = 172.16.1.99、B8 = 192.168.1.110）。記住口訣：**「MAC 每跳換、IP 永不變」**。

> English Standard Definitions:
> - "Each router de-encapsulates and re-encapsulates the packet with new source and destination MAC addresses at every hop."
> - "MAC addresses change at every hop, but the IP addresses remain the same end-to-end."

**🎯 Exam Answer Phrase**
- "On the final hop, RouterA-G0 sends the frame directly to HostA: Destination MAC = AAAA.AAAA.AAAA (HostA), Source MAC = AAAA.CCCC.0000 (RouterA-G0); the IP addresses B7 = 172.16.1.99 and B8 = 192.168.1.110 are unchanged because IP addresses remain the same end-to-end."

---

## 📖 4. 必考英文術語與答題句型庫

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| OSI Model | 國際標準 7 層參考模型，用於標準化網絡通訊功能 | "The OSI model is a conceptual framework that standardizes network communication into seven layers: Application, Presentation, Session, Transport, Network, Data Link, and Physical." |
| TCP/IP Model | 互聯網實際使用的 4 層模型 | "The TCP/IP model has four layers: Application, Transport, Internet, and Network Access." |
| Application Layer | 應用層；處理程式之間的溝通（HTTP、DNS、SMTP 等） | "The Application layer maintains process-to-process communications and represents data to the user." |
| Presentation Layer | 表達層；資料表示（格式轉換）與加密 | "The Presentation layer provides data representation and encryption." |
| Session Layer | 會話層；建立與管理對話 | "The Session layer organizes dialogue and manages data exchange." |
| Transport Layer | 傳輸層；端到端連線與可靠性（TCP/UDP） | "The Transport layer provides end-to-end connections and reliability; TCP is reliable, UDP is best-effort." |
| Network Layer | 網絡層；路徑決定與邏輯定址（IP） | "The Network layer performs path determination and logical addressing." |
| Internet Layer | TCP/IP 的網際層；等於 OSI Network 層，負責選路 | "The Internet layer determines the best path through the network." |
| Data Link Layer | 數據鏈路層；處理 Frame 與 MAC 定址 | "The Data Link layer maintains data frames and provides physical addressing using MAC addresses." |
| Network Access Layer | TCP/IP 的網絡存取層；控制硬件與媒介 | "The Network Access layer controls the hardware devices and media that make up the network." |
| Physical Layer | 物理層；位元編碼解碼與訊號傳輸 | "The Physical layer performs encoding and decoding of bits for binary transmission." |
| Protocol | 協議；一組管轄通訊的規則 | "A protocol is a set of rules that governs how a message is transmitted across a network." |
| Message Encoding | 訊息編碼；轉換成可傳輸的形式 | "Message encoding converts information into another acceptable form for transmission." |
| Message Sizing | 訊息分段；把長訊息拆成小片段 | "Message sizing breaks up a long message into smaller pieces." |
| Message Encapsulation | 訊息封裝；一層包一層 | "Message encapsulation places one message format inside another message format." |
| Message Timing | 訊息時序；存取方法、流量控制與回應逾時 | "Message timing manages the access method, flow control, and response timeout." |
| Flow Control | 流量控制；防止送得太快而掉包 | "Flow control ensures that packets are not dropped because too much data is being sent too quickly." |
| Access Method | 存取方法；決定何時開始傳送 | "The access method determines when to begin sending messages." |
| Response Timeout | 回應逾時；等待回應的時間上限 | "Response timeout specifies how long to wait for responses and the action to take if a timeout occurs." |
| Unicast | 單點傳播；一對一 | "Unicast is a one-to-one delivery option." |
| Multicast | 多點傳播；一對多 | "Multicast is a one-to-many delivery option." |
| Broadcast | 廣播；一對全部 | "Broadcast is a one-to-all delivery option." |
| PDU (Protocol Data Unit) | 協定資料單元；資料在某一層的形態 | "A PDU is the form that a piece of data takes at a particular network layer." |
| Segment | 傳輸層 PDU | "A segment is the PDU at the Transport layer." |
| Packet | 網絡層 PDU | "A packet is the PDU at the Network layer." |
| Frame | 數據鏈路層 PDU | "A frame is the PDU at the Data Link layer." |
| Encapsulation | 封裝；由上至下逐層加 header | "During encapsulation, data becomes a segment, then a packet, then a frame, then bits." |
| De-encapsulation | 解封；由下至上逐層剝 header | "De-encapsulation is the reverse process: bits, frame, packet, segment, data." |
| MAC Address | 實體（物理）位址；48-bit，Data Link 層使用 | "MAC addresses are physical addresses used at the Data Link layer; they change at every hop." |
| IP Address | 邏輯位址；Network/Internet 層使用 | "IP addresses are logical addresses; they remain the same end-to-end." |
| Default Gateway | 默認閘道；跨網段時 Frame 的第一站 Router | "For remote communication, a host sends the frame to its default gateway." |
| Ethernet Frame | 乙太網路幀；含 Destination/Source MAC、IP、Data、Trailer | "An Ethernet frame contains destination and source MAC addresses, source and destination IP addresses, packet data, and a trailer." |

---

## 🗺️ 5. 學習路線（Learning Path）

1. **先理解概念**：先搞懂「為何要有模型」——OSI 是標準參考（7 層），TCP/IP 是實際運行（4 層），兩者層級如何對應（頂三層合一、底兩層合一）。再理解 Encapsulation 為何「向下加 header」、De-encapsulation 為何「向上剝 header」。
2. **背誦基礎**：背熟兩套層名與 PDU 名稱（Data → Segment → Packet → Frame → Bits）；背熟每個 OSI 層的「招牌功能」一句（Network=選路+邏輯定址、Transport=端到端可靠、Data Link=幀+MAC、Physical=位元編碼……）；背熟五個 Protocol Requirements 的定義句。
3. **掌握判斷／計算**：練習「功能描述 → 層」的關鍵字速配（見到 encryption → Presentation，見到 best path → Internet 等）；熟練 Unicast/Multicast/Broadcast 與 one-to-one/one-to-many/one-to-all 的配對。
4. **能解答考題（Frame 追蹤題）**：見到位址表先畫出網絡結構與網段，然後依四步走——(i) 判斷 local 定 remote；(ii) local 時 Destination MAC = 目的地主機 MAC；(iii) remote 時 Destination MAC = Default Gateway（Router 介面）MAC；(iv) IP 欄位永遠填「真正來源與真正目的地」，永不填 Router 的 IP。最後用口訣驗證：「**MAC 每跳換、IP 永不變**」。

---

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**OSI 7 層（由頂至底，英文口訣：All People Seem To Need Data Processing）**

| 層 | 招牌功能 | PDU |
|---|---|---|
| Application | 程式間通訊（HTTP/DNS/SMTP） | Data |
| Presentation | 資料表示＋加密 | Data |
| Session | 對話管理 | Data |
| Transport | 端到端＋可靠（TCP/UDP） | Segment |
| Network | 選路＋邏輯定址（IP） | Packet |
| Data Link | 幀＋MAC 定址 | Frame |
| Physical | 位元編碼解碼 | Bits |

**TCP/IP 4 層（由頂至底）**：Application（含表達＋會話）→ Transport → Internet → Network Access（含鏈路＋物理）

**協議歸類速記**
- Application 層：HTTP、FTP、SMTP、POP、IMAP、DNS、DHCP、BOOTP
- Transport 層：TCP（可靠）、UDP（盡力而為）
- Internet 層：IP（IPv4、IPv6）、ICMP
- Network Access 層：Ethernet、WLAN、PPP、Frame Relay、ATM

**層功能關鍵字速配（Q1 必殺技）**

| 英文關鍵字 | 答案 |
|---|---|
| frames | Data Link |
| path determination / logical addressing | Network / Internet |
| encoding / binary | Physical |
| data representation / encryption | Presentation |
| end-to-end / reliability | Transport |
| dialogue / data exchange | Session |
| process-to-process / data to user | Application |
| hardware devices / media | Network Access |
| best path | Internet |
| diverse devices | Transport |

**五個 Protocol Requirements 一句記**
- Sizing = 拆細 ｜ Encoding = 轉換 ｜ Encapsulation = 套疊 ｜ Timing = 節奏（access method + flow control + response timeout）｜ Delivery = 送給誰

**Message Timing 三兄弟**
- Access method → 幾時開始送 ｜ Flow control → 防止送太快掉包 ｜ Response timeout → 等幾耐＋逾時點算

**投遞方式：U-M-B = 1-1 / 1-多 / 1-全部**（Unicast one-to-one、Multicast one-to-many、Broadcast one-to-all）

**封裝／解封順序（必背）**
- Encapsulation（向下）：Data → Segment → Packet → Frame → Bits
- De-encapsulation（向上）：Bits → Frame → Packet → Segment → Data

**Frame 追蹤題黃金口訣：「MAC 每跳換、IP 永不變」**
- Local（同網段）：Dest MAC = 目的地主機 MAC；Source MAC = 自己 MAC；IP = 真正來源／目的地
- Remote（跨網段）：Dest MAC = Default Gateway（Router 介面）MAC；IP 依然 = 真正來源／目的地
- Router 每跳：剝舊 Frame（de-encapsulate）→ 查路由 → 重造新 Frame（re-encapsulate），只換 MAC

**必背英文短句**
- "MAC addresses change at every hop, but IP addresses remain the same end-to-end."
- "For remote communication, a host sends the frame to its default gateway."
- "The encapsulation sequence is Data → Segment → Packet → Frame → Bits."
