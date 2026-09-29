# ITE3102 Network Fundamentals — Final Cheat Sheet（考前極速總複習）

> **覆蓋範圍**：Lecture 0 Number Systems（Module 5）／ Lecture 1 Networking Today（Module 1）／ T3 Network Models（OSI & TCP/IP）／ T4 Network Access（Physical & Data Link）／ T5 Ethernet（ARP、Switch、Frame）／ T6 Network Layer（Routing、IPv4/IPv6 Header）／ T7 IPv4 Addressing & Subnetting（VLSM）／ T8 & L8 IPv6 Addressing ／ T9 Transport Layer（TCP／UDP）／ T10 Application Layer（HTTP／DNS／DHCP／Email／FTP）／ L3 Network Models（Module 3）／ L4 Network Access（Module 4 & 6）／ L5 Ethernet（Module 7）／ L6 Network Layer（Router）／ L7 IPv4 Addressing（Module 11）／ L9 Transport Layer（Module 14）／ L10 Application Layer（Module 15）
> **使用時機**：考試前 5–10 分鐘快速掃描；只保留「關鍵數字、對比表、英文口訣」。
> 詳細解說請回查：`02_Study_Guides/` 內對應各課的 Study Guide（⚠️ 正確資料夾名係 `02_Study_Guides`，唔好寫錯成任何加咗 AI 字樣嘅變體）
> ⚠️ 本檔只寫「理論」；Packet Tracer 情境、Cisco IOS 指令、Windows 指令速查由另一章負責（緊接本檔之後）。

**速覽目錄**：P1 Number Systems｜P2 Networking Today｜P3 Network Models（OSI／TCP-IP）｜P4 Network Access｜P5 Ethernet｜P6 Network Layer｜P7 IPv4 Addressing & Subnetting｜P8 IPv6 Addressing｜P9 Transport Layer｜P10 Application Layer｜P11 Network Models｜P12 Network Access｜P13 Ethernet｜P14 Network Layer｜P15 IPv4 Addressing｜P16 Transport Layer｜P17 Application Layer｜英文極速記憶句｜最後 60 秒自測清單

---

## Part 1 — Lecture 0: Number Systems（數字系統）
（來源：`ITE3102_L0_NumberSystems_StudyGuide.md`、`ITE3102_T0_Numbers_StudyGuide.md`）

### 1.1 三進制速記

| 進制 | Radix | 數字 | 網絡用途 |
|---|---|---|---|
| Decimal | 10 | 0–9 | IPv4 的 dotted decimal |
| Binary | 2 | 0、1 | 電腦／路由器內部語言 |
| Hexadecimal | 16 | 0–9, A–F | IPv6、MAC Address |

### 1.2 必背數字

- Binary 位置值表：**128 64 32 16 8 4 2 1**（2⁷→2⁰）；**1 hex digit = 4 bits**（nibble）；**2 hex digits = 1 octet = 1 Byte**
- Hex ↔ Binary：A=1010, B=1011, C=1100, D=1101, E=1110, F=1111（A=10…F=15）
- IPv4 = **32 bits = 4 octets**（每 octet 8 bits，0–255）；IPv6 = **128 bits = 32 hex digits = 8 hextets**；MAC = **48 bits = 6 octets = 12 hex digits**
- 常用等值：127 = `0111 1111` = 7F｜255 = `1111 1111` = FF｜240 = `1111 0000` = F0｜252 = `1111 1100` = FC｜200 = `1100 1000` = C8｜215 = `1101 0111` = D7

### 1.3 換算方法（四招）

| 轉換 | 方法 | 例子 |
|---|---|---|
| Binary → Decimal | bit = 1 的位置值全相加 | 11000000 = 128+64 = 192 |
| Decimal → Binary | 由 128 起「夠就減記 1、唔夠記 0」；**每 octet 寫足 8 bits** | 168 → 10101000 |
| Decimal → Hex | 先轉 8-bit binary → 由右每 4 bit 一組 → 轉 hex | 168 → 10101000 → A8 |
| Hex → Decimal | 每 digit 轉 4-bit binary → 組 8-bit → 轉 decimal（或 XY = X×16 + Y） | D2 → 11010010 → 210；7F = 7×16+15 = 127 |

- IPv4 轉 binary 例：172.19.24.5 = `10101100.00010011.00011000.00000101`；192.168.11.101 = `11000000.10101000.00001011.01100101`
- IPv6 位數題：8 組 × 4 = **32 hex digits**；× 4 bits = **128 bits**；首 4 bits = 第一個 hex digit 嘅 binary；末 16 bits = 最後一個 hextet 逐字轉 binary

### 1.4 考官易錯點

- 漏寫 leading zeros（5 寫成 `101` 而唔係 `00000101`）＝ 扣分位
- 混淆 hex `1010`（= 4112）同 binary `1010`（= 10）——先睇清題目問邊個進制
- IPv6 hextet 一定係 1–4 個 hex digit（leading zero 可省）；MAC 一定係 12 個 hex digit；IPv4 每個 octet 一定 0–255

### 1.5 英文記憶句

- "IPv4 = 32 bits = 4 octets."
- "IPv6 = 128 bits = 32 hex digits = 8 hextets."
- "Every 4 bits is represented by a single hexadecimal digit."
- "Hexadecimal is used to represent IPv6 addresses and MAC addresses."
- "Routers and computers only understand binary, while humans work in decimal."

---

## Part 2 — Lecture 1: Networking Today（今日網絡）
（來源：`ITE3102_L1_NetworkingToday_StudyGuide.md`、`ITE3102_T1_NetworkToday_StudyGuide.md`）

### 2.1 網絡三要素

| 元件 | 例子 | 一句話角色 |
|---|---|---|
| End Device | PC、Server、Printer、Smartphone | Interface between the **human** and the network |
| Intermediary Device | Switch、Router、Firewall、AP（WAP） | 連接 ＋ **regenerate and retransmit** data signals |
| Network Media | copper／fibre optic／wireless | Channel over which the message travels |

### 2.2 LAN vs WAN

| 特性 | LAN | WAN |
|---|---|---|
| 範圍 | **small** geographical area（一棟樓） | **wide** geographical area（跨城市／國家） |
| 管理 | 單一組織或個人 | 一個或多個 Service Provider |
| 頻寬 | 高 | 通常較慢 |
| 角色 | 連接 users／end devices | 連接 LAN 與 LAN（連接其他網絡） |

### 2.3 可靠網絡四大特性（英文口訣：FSSS）

| 特性 | 招牌關鍵字 | 英文關鍵句 |
|---|---|---|
| **F**ault Tolerance | always available、more than one route | "Each packet could take a different path." |
| **S**calability | expand quickly、minimal impact on performance、follow accepted standards and protocols | "Expand without impacting existing services." |
| **S**ervice Quality (QoS) | priority queues、bandwidth exceeds supply | "Primary mechanism for reliable delivery." |
| **S**ecurity | equipment protected、data protected；多層防禦 | "Security must be implemented in multiple layers." |

**CIA 三元組**：Confidentiality（只有 intended and authorized recipients 可 access and read）／ Integrity（not altered in transmission, from origin to destination）／ Availability（timely and reliable data services 畀 authorized users）

### 2.4 網絡類型

- 規模：Small Home → SOHO → Medium/Large → World Wide（Internet）
- **Internet** = worldwide collection of interconnected networks，**無單一擁有者**（IETF、ICANN、IAB 維持結構）
- **Intranet** = private connection of LANs and WANs，belongs to an organization
- **Extranet** = secure and safe access 畀另一間組織但需要 company data 嘅人士

### 2.5 連接技術（Internet Connectivity）

| 類型 | 招牌關鍵字 |
|---|---|
| Cable | uses **coaxial cable** as medium；high bandwidth、**always on** |
| Cellular | uses a **cell phone network** |
| Satellite | requires a **clear line of sight** |
| Dial-up telephone | **low bandwidth but inexpensive** |
| DSL | uses telephone line（企業用 Business DSL／SDSL） |

- 家用：Cable、DSL、Cellular、Satellite、Dial-up；企業：Dedicated Leased Line、Ethernet WAN、Business DSL (SDSL)、Satellite
- Converged Network：同一基建、同一標準，同時傳 **data + voice + video**

### 2.6 威脅 vs 防禦

| 外部威脅 External | 內部威脅 Internal | 防禦（多層） |
|---|---|---|
| Virus / Worm / Trojan | 遺失或被竊設備 | Home：Antivirus + Antispyware + Firewall |
| Spyware / Adware | 員工意外誤用 | 企業再加：Dedicated Firewall、ACL、IPS、VPN |
| Zero-day、DoS、資料攔截、身份盜竊 | 惡意員工 | 口訣：**Defense in Depth** |

### 2.7 趨勢與雲端

- 四大趨勢：**BYOD、Online Collaboration、Video、Cloud Computing**
- 四種 Cloud：**Public**（公眾）／**Private**（組織專用）／**Hybrid**（兩種以上組合）／**Custom**（行業專用）
- 其他：Smart Home、Powerline Networking（電源插座傳資料）、WISP（鄉郊無線寬頻）

### 2.8 英文記憶句

- "The internet is not owned by any individual or group."
- "Every computer on a network is called a host or end device."
- "A device in a Peer-to-Peer network can be both a client and a server."
- "Converged networks deliver data, voice, and video over the same infrastructure."

---

## Part 3 — T3: Network Models（OSI 與 TCP/IP 模型）
（來源：`ITE3102_T3_Models_StudyGuide.md`）

### 3.1 兩套模型對照（必背）

| OSI（7 層，頂至底） | TCP/IP（4 層，頂至底） | 該層協議 |
|---|---|---|
| Application | Application（合併 OSI 頂三層） | DHCP, DNS, FTP, HTTP, BOOTP, IMAP, POP, SMTP |
| Presentation | ↑ 併入 Application | — |
| Session | ↑ 併入 Application | — |
| Transport | Transport | TCP, UDP |
| Network | **Internet** | IP (IPv4/IPv6), ICMP |
| Data Link | Network Access（合併 OSI 底兩層） | ATM, Ethernet, Frame Relay, PPP, WLAN |
| Physical | ↑ 併入 Network Access | — |

- OSI 口訣：**All People Seem To Need Data Processing**（Application → Physical）
- TCP/IP 頂 3 層合一 → Application；底 2 層合一 → Network Access；中間 Transport 與 Network（叫 Internet）一一對應

### 3.2 「功能 → 層」關鍵字速配

| 英文關鍵字 | 答案 |
|---|---|
| maintains data frames | **Data Link** |
| path determination / logical addressing | **Network**（TCP/IP = Internet） |
| encoding / decoding for binary transmission | **Physical** |
| data representation / encryption | **Presentation** |
| end-to-end connections / reliability | **Transport** |
| dialogue / manages data exchange | **Session** |
| process-to-process communications | **Application** |
| controls hardware devices and media | **Network Access** |
| determines the best path | **Internet** |
| supports communication between diverse devices | **Transport** |

### 3.3 五個 Protocol Requirements（一條記）

| Requirement | 一句定義 | 繁中口訣 |
|---|---|---|
| Message sizing | breaks up a long message into smaller pieces | 拆細 |
| Message encoding | converts information into another acceptable form for transmission | 轉換 |
| Message encapsulation | places one message format **inside another** message format | 套疊 |
| Message timing | manages the access method, flow control, and response timeout | 節奏 |
| Message delivery options | sends to an individual, a group, or everyone at the same time | 送給誰 |

- 易錯：encoding（轉換格式）vs encapsulation（套入另一格式）——見 "inside another" 就係 encapsulation

### 3.4 Message Timing 三兄弟／投遞方式 U-M-B

| 項目 | 對應目的 |
|---|---|
| Access method | determines **when to begin** sending messages |
| Flow control | ensure packets are not dropped because **too much data is being sent too quickly** |
| Response timeout | specifies **how long to wait** for a response ＋ 逾時後採取嘅行動 |

| Option | 通訊類型 | 例子 |
|---|---|---|
| Unicast | one-to-one | 日常上網流量 |
| Multicast | one-to-many | IPTV 串流 |
| Broadcast | one-to-all | DHCP Discover、ARP request |

### 3.5 PDU 與封裝順序（必背）

| 層 | PDU |
|---|---|
| Application | **Data** |
| Transport | **Segment** |
| Network | **Packet** |
| Data Link | **Frame** |
| Physical | **Bits** |

- **Encapsulation（向下）**：Data → Segment → Packet → Frame → Bits
- **De-encapsulation（向上）**：Bits → Frame → Packet → Segment → Data

### 3.6 Frame 追蹤黃金定律：「MAC 每跳換、IP 永不變」

| 情況 | Destination MAC | Source MAC | Source／Destination IP |
|---|---|---|---|
| Local（同網段） | 目的地主機嘅 MAC | 自己嘅 MAC | 真正來源／目的地 |
| Remote（跨網段） | **Default Gateway（Router 介面）嘅 MAC** | 自己嘅 MAC | 真正來源／目的地 |
| Router 每跳 | 剝舊 Frame → 查路由 → 重造新 Frame，只換 MAC | 出接口嘅 MAC | 全程不變 |

### 3.7 英文記憶句

- "The OSI model is a conceptual framework that standardizes network communication into seven layers."
- "The TCP/IP model has four layers: Application, Transport, Internet, and Network Access."
- "A PDU is the form that a piece of data takes at a particular network layer."
- "MAC addresses change at every hop, but IP addresses remain the same end-to-end."
- "For remote communication, a host sends the frame to its default gateway."

---

## Part 4 — T4: Network Access（網絡存取）
（來源：`ITE3102_T4_NetworkAccess_StudyGuide.md`）

### 4.1 三個「速度」概念（次序必考）

| 概念 | 量度咩 | 關係 |
|---|---|---|
| Bandwidth | capacity of a medium to carry **raw data**（理論上限） | 最高 |
| Throughput | transfer of **bits** across the media（實際） | Bandwidth ≥ Throughput |
| Goodput | transfer of **usable data**（減 overhead） | Throughput ≥ Goodput |

- Throughput 受三因素影響：**amount of traffic、type of traffic、latency created by the network devices**
- Goodput 減走嘅 overhead：**establishing sessions、acknowledgements、encapsulation**
- 口訣：**Bandwidth ≥ Throughput ≥ Goodput（理論 ≥ 實際 ≥ 可用）**

### 4.2 媒介與訊號／Copper vs Fiber

| 媒介 | 訊號 |
|---|---|
| Copper | Electrical pulses（電脈衝） |
| Fiber-optic | Light patterns（光模式） |
| Wireless | Microwave transmissions（微波／電磁波） |

| 特性 | Copper | Fiber-optic |
|---|---|---|
| Speed | Slower | Faster |
| Distance | Shorter | Longer |
| Cost | Cheaper | More expensive |
| Ease of installation | Easy | Difficult |
| EMI/RFI | Yes（受影響） | **No（免疫）** |

- 原因：光訊號唔係電訊號，電磁場干擾唔到佢

### 4.3 電纜選用規則與銅線辨認

| 裝置組合 | 電纜 |
|---|---|
| 唔同類裝置（PC↔Switch、Switch↔Router） | **Straight-through** |
| 同類裝置（PC↔PC、Switch↔Switch、Router↔Router、PC↔Router 直連） | **Crossover** |
| PC ↔ Router/Switch 嘅 **Console 埠**（管理用） | **Rollover** |

- 口訣：**Unlike → straight；Like → cross；Console → rollover**
- Coaxial：單支中央銅芯 ＋ 金屬編織屏蔽層（最粗、圓身）；STP：絞合線對 ＋ 金屬屏蔽層（Shield），減 EMI/RFI；UTP：四對絞合銅線、**冇屏蔽**、最常見 LAN 電纜、用 RJ-45

### 4.4 無線網絡四宗罪

| Concern | 內容 |
|---|---|
| Coverage | 受實體障礙物（牆、門）、距離 AP 太遠、RF interference 限制 |
| Interference | 微波爐、無線電話、Bluetooth（亦可答其他 WLAN、Baby Monitor） |
| Security | 訊號經空氣傳播，範圍內任何人可攔截／竊聽（無實體邊界） |
| Shared Bandwidth | 多用戶同時用 WLAN → 每人分到頻寬減少、Throughput 下降 |

- Wireless AP：令無線裝置接入有線網絡（wireless ↔ wired 嘅橋樑、延伸覆蓋）；Wireless NIC Adapter：令主機有無線收發能力

### 4.5 Data Link 兩子層：LLC vs MAC

| 比較 | LLC | MAC |
|---|---|---|
| 實現方式 | Software（軟件） | Hardware / Firmware |
| 主要功能 | 對上（Network Layer）溝通；用 **Type／EtherType** 標記所載 Layer 3 協議 | 對下（Ethernet／媒體）：data link addressing、media access |
| 口訣 | 對上（Logic + Layer 3） | 對下（Media + Addressing） |

### 4.6 拓撲／Duplex／Frame 欄位

| 類型 | 三種 |
|---|---|
| WAN | **Point-to-Point**（兩點一線）／**Hub-and-Spoke**（一中心多分支）／**Mesh**（全互連、高冗餘） |
| LAN | **Star**（Switch 為中心，現今最常用）／**Ring**（環、需 Token）／**Bus**（共享主幹，主幹斷裂全癱） |

- **Half-duplex**：send **or** receive，but **not at the same time**（Walkie-talkie；舊 Hub 用 CSMA/CD）
- **Full-duplex**：send and receive **simultaneously**（Telephone；現代 Switch）

| Frame 欄位 | H／T | 功能 |
|---|---|---|
| Frame Start | **H** | Marks the beginning of the frame |
| Control | **H** | Specifies special flow control services |
| Type | **H** | Identifies the Layer 3 protocol used by the LLC |
| Addressing | **H** | Identifies source and destination hosts by MAC address |
| Error Detection | **T** | Detects transmission error（FCS） |
| Frame Stop | **T** | Marks the end of the frame |

### 4.7 英文記憶句

- "Bandwidth is the capacity of a medium to carry raw data in a given period of time."
- "Throughput is the measure of the transfer of bits across the media; goodput is the measure of usable data."
- "Use straight-through for unlike devices and crossover for like devices."
- "In half-duplex, a device can send or receive, but not both at the same time; in full-duplex, a device can send and receive simultaneously."
- "The LLC sublayer communicates with the network layer; the MAC sublayer provides addressing and media access."

---

## Part 5 — T5: Ethernet（以太網）
（來源：`ITE3102_T5_Ethernet_StudyGuide.md`）

### 5.1 ARP 流程

- 作用：**resolves an IPv4 address to a MAC address**（只喺同一 broadcast domain 內運作）
- 兩個基本功能：① an ARP table (ARP cache) 存 IP → physical address 對照；② dynamic resolution of IP addresses to physical addresses via ARP request and ARP reply
- **先查表，表冇先發 Request**；ARP Request = **Broadcast**，ARP Reply = **Unicast**

| 情況 | ARP 目標 |
|---|---|
| 目標喺同一 subnet | ARP **目標主機** 嘅 IP |
| 目標喺另一網絡 | ARP **Default Gateway（Router）** 嘅 IP |

### 5.2 Switch 兩步曲：「學 Source、查 Destination」

| Frame 情況 | 更新 MAC Table？ | 轉發 |
|---|---|---|
| 已知 Unicast | 睇 Source（通常已學） | **只出目標 Port** |
| 未知 Unicast | 學 Source MAC | **Flooding**（除來源埠外全部） |
| Broadcast（FF-FF-FF-FF-FF-FF） | 學 Source MAC | **Flooding**（除來源埠外全部） |

- 易錯：更新睇 **Source MAC**，唔係 Destination MAC（Destination 未知唔代表要更新）
- Hub 只係 Layer 1 裝置：將 Frame 重複畀同一段所有裝置；經 Hub 接嘅多部機只會喺同一個 Switch Port 被學到

### 5.3 MAC Address 結構／兩張表

| 項目 | 值 |
|---|---|
| 長度 | **48-bit = 6 Byte = 12 hexadecimal digits** |
| OUI | 頭 **3 Byte**（IEEE 分配畀廠商）；尾 3 Byte 同一 OUI 內必須唯一 |
| Broadcast MAC | **FF-FF-FF-FF-FF-FF**（ARP Request 嘅 Destination MAC） |
| MAC Address Table | **MAC ↔ Port**（Switch，Layer 2 轉發用） |
| ARP Table | **IP ↔ MAC**（Host，Layer 3 → Layer 2 用） |

### 5.4 802.3 Ethernet Frame 欄位（順序必背）

| 欄位（左至右） | 功能 |
|---|---|
| Preamble | Synchronizes the sending and receiving devices |
| Destination MAC | 目的 MAC（6 bytes） |
| Source MAC | 來源 MAC（6 bytes） |
| Type | Identifies the upper layer protocol encapsulated（例 0x0800 = IPv4） |
| Data | Encapsulated data from a higher layer |
| FCS（Trailer） | Detect errors with **cyclic redundancy check (CRC)** |

- 順序口訣：**Preamble → Dest MAC → Src MAC → Type → Data → FCS**

### 5.5 轉發模式：Store-and-Forward vs Cut-Through

| | Store-and-Forward | Cut-Through |
|---|---|---|
| 等幾耐 | Buffers frames until the **full frame** has been received | 一讀到 **destination Layer 2 address** 就轉發 |
| 錯誤檢查 | 用 CRC 檢查有冇 modified during transit；壞 Frame 丟棄 | 冇檢查 |
| 特性 | 可靠、延遲高 | 快，但 **more bandwidth may be consumed** |

### 5.6 Frame 內 MAC vs IP（本地／跨網絡）

| | 本地通訊 | 跨網絡通訊 |
|---|---|---|
| Destination MAC | 目標 PC 嘅 MAC | 第一程 = **Default Gateway 嘅 MAC**；中段 = 下一 Hop Router 接口；最後一程 = 目標 PC |
| Source MAC | 自己嘅 MAC | 每個 Hop 換成「出接口」嘅 MAC |
| Source／Destination IP | 唔變 | **全程唔變** |

### 5.7 ARP 嘅問題（效能＋保安）

| 問題 | 內容 |
|---|---|
| 效能 | 大型低頻寬網絡上大量 ARP Broadcast → **bandwidth consumption／network congestion** |
| 保安 | 攻擊者可操控 ARP 訊息內 **IP 與 MAC 嘅 mapping**，作 traffic interception |
| ARP Spoofing | 惡意主機截取 ARP Request 並回覆，令主機將目標 **IP address** 對應到惡意主機嘅 **MAC address**（Man-in-the-Middle） |

### 5.8 英文記憶句

- "ARP resolves an IPv4 address to a MAC address; a host checks its ARP table first and sends an ARP request only when no entry exists."
- "A switch learns the source MAC address and its incoming port, then forwards based on the destination MAC address."
- "A MAC address is a 48-bit value expressed as 12 hexadecimal digits; the first three bytes are the OUI."
- "Store-and-Forward buffers the entire frame and verifies it with CRC before forwarding, while Cut-Through forwards the frame as soon as the destination Layer 2 address is read."

---

## Part 6 — T6: Network Layer（網絡層）
（來源：`ITE3102_T6_Network_StudyGuide.md`）

### 6.1 Broadcast Domain 數法

- 定義：**A broadcast domain is a network; routers separate broadcast domains.**
- 口訣：**LANs ＋ Serial Links**（每條 Router-to-Router 鏈路都係一個獨立網絡）
- 易錯：Mask 係 /16 時，172.16.10.0 與 172.16.20.0 **同屬** 172.16.0.0/16，只算**一個** broadcast domain

### 6.2 兩條金規則

| 題型 | 規則 |
|---|---|
| Default Gateway | = 同 PC **同一網絡**嗰個 Router 介面嘅 IP（答案跟圖中實際標籤，例如 .1 或 .2） |
| Exit Interface | 目標網絡直接接喺自己身上 → 用**直接連接（Directly Connected）**介面；唔係 → 用**去擁有嗰個網絡嘅 Router 方向**嘅介面（經 Next Hop） |
| 轉發依據 | **Longest Match**（最長前綴／最具體路由）；Router 唔理 Packet 由邊度嚟，只跟路由表決定去邊度出 |

### 6.3 Local vs Remote 判斷

- 將目的地 IP 同自己嘅 Subnet Mask 做 **AND**：結果 = 自己網絡 ID → **Local**；唔等 → **Remote**
- **127.0.0.0/8** 係 Loopback（127.0.0.1 = 自己部機）
- Local → Frame 直接填目的地 Host 嘅 MAC；Remote → Frame 填 Default Gateway 嘅 MAC
- **Hop-by-Hop Encapsulation**：Router 收到 Frame → de-capsulate 取 Packet → 查路由表 → re-encapsulate 新 Frame（只換 MAC，IP 不變）

### 6.4 IP 三大傳遞特性（CL／BE／MI）

| 特性 | 定義 | 關鍵詞速記 |
|---|---|---|
| Connectionless | 傳送前唔建立連線；每個 Packet 獨立、自包含 PDU | connection；sender 唔知收方收到、receiver 唔知幾時到 |
| Best Effort | 冇 overhead 去 guarantee delivery；靠上層（TCP）追蹤保證 | guarantee / overhead / ensure |
| Media Independent | 獨立於傳輸媒體運作；按 MTU 調整 Packet 大小（Fragmentation） | medium / media |

### 6.5 IPv6 Header 欄位（固定 40 bytes）

| 欄位 | 功能 |
|---|---|
| Version | Always set to **0110**（= 6） |
| Traffic Class | Classifies packets for congestion control（QoS／優先級） |
| Payload Length | Identifies the size of the **data portion** of the packet |
| Next Header | Identifies the application type to the upper-layer protocol（TCP／UDP） |
| Hop Limit | 每經一個 Router 減 1；減到 0 就丟棄並通知送方 |

- IPv6 Header 刪去 IPv4 嘅 IHL、Identification、Flags、Fragment Offset、Header Checksum（轉發更快）

### 6.6 Hex Dump 拆 Frame（IPv4 Packet 解碼）

| IPv4 Header 欄位 | 長度 | 例子值 | 解讀 |
|---|---|---|---|
| Version / IHL | 1 byte | `45` | Version 4；IHL 5（× 4 = **20 bytes** header） |
| Type of Service | 1 byte | `FF` | 標示 packet 嘅 **priority**（QoS） |
| Total Length | 2 bytes | `12 34` | 成個 packet（header + data）大小 |
| TTL | 1 byte | `64` | = **100**（decimal） |
| Protocol | 1 byte | `11` | = **17 = UDP**（**6 = TCP**） |
| Source IP | 4 bytes | `C0 A8 43 69` | **192.168.67.105** |
| Destination IP | 4 bytes | `AC 1A 6F 5A` | **172.26.111.90** |

- EtherType `08 00` = IPv4；拆 Frame 步驟：**MAC 6+6 → Type 2 → IPv4 Header 20 → 逐欄讀**

### 6.7 Router 硬件、記憶體與開機

| 記憶體 | 裝咩 | 斷電 |
|---|---|---|
| RAM | **Running Configuration**（＋Packet Buffer） | 冇（Volatile） |
| ROM | **Diagnostics（POST）＋ boot instructions（Bootstrap）** | 有（只讀） |
| Flash | **IOS and system files** | 有 |
| NVRAM | **Startup Configuration** | 有 |

- 開機四步口訣 **P-B-I-C**：**P**OST（ROM）→ **B**ootstrap（ROM）→ Load IOS（**Flash** → RAM）→ Get **Startup Config**（NVRAM → RAM）
- 元件：Console port = initial configuration and CLI management；AUX port = remote management access；LAN interface = connects internal devices；WAN interface = connects routers to external networks

### 6.8 Router CLI 五種模式（實際指令見指令章）

| Mode | 名稱與用途 |
|---|---|
| R1> | User EXEC Mode（只可睇基本嘢） |
| R1# | Privileged EXEC Mode（可睇晒設定、儲存配置） |
| R1(config)# | Global Configuration Mode（全機設定） |
| R1(config-if)# | Interface Configuration Mode（介面設定） |
| R1(config-line)# | Line Configuration Mode（線路／登入設定） |

- 逐層進入：User EXEC → Privileged EXEC → Global → Interface／Line

### 6.9 兩張路由表（PC vs Router）

| 表 | 認得咩 Entry |
|---|---|
| PC `route print` | **0.0.0.0/0.0.0.0 = default gateway**；**127.0.0.1 = loopback**；自己 IP 配 **/32** = host route；**Network route（On-link）** = 去同一 broadcast domain 嘅其他 Host |
| Router `show ip route` | **C** = directly connected；**L** = local；**S** = static；**D** = EIGRP；**O** = OSPF；`via <next hop>, <interface>` 就係出口介面 |

### 6.10 英文記憶句

- "IP is connectionless, best effort and media independent."
- "No overhead is used to guarantee packet delivery."
- "The network layer performs path determination and logical addressing."
- "A router uses the longest match — the most specific route — when forwarding."
- "MAC addresses change at every hop while IP addresses remain unchanged end-to-end."

---

## Part 7 — T7: IPv4 Addressing（IPv4 定址與 Subnetting）
（來源：`ITE3102_T7_IPv4Addressing_StudyGuide.md`）

### 7.1 基礎結構

- IPv4 = **32-bit** logical address，寫成 **dotted-decimal notation**（4 個 octet，每 octet 8 bits、0–255）
- Subnet Mask：1 = network portion、0 = host portion；**Prefix Length（CIDR）** /n = mask 前面連續 n 個 1
- Mask octet 對應：128 → /25、192 → /26、224 → /27、240 → /28、248 → /29、252 → /30

### 7.2 萬能公式（必背）

| 項目 | 公式 |
|---|---|
| Network Address | IP **AND** Subnet Mask（host 位全 0） |
| Broadcast Address | Network ＋ Block Size − 1（host 位全 1） |
| Host Range | Network ＋ 1 至 Broadcast − 1 |
| 可用 Host | **2^h − 2**（h = host bit 數；減 Network 同 Broadcast） |
| Subnet 數 | 2^n（n = 向 host 借嘅 bit 數） |
| Block Size | **256 − mask 最後非 0 octet** |
| 同一 Subnet？ | 兩個 IP 分別 AND mask，Network Address 相同就係同一 subnet |

### 7.3 Prefix ↔ Mask ↔ Host 對照表

| Prefix | Subnet Mask | Block Size | 可用 Host |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | **2（Point-to-Point Link 專用）** |

### 7.4 特殊／私網範圍

| 範圍 | 記憶 |
|---|---|
| Private **10.0.0.0/8** | 任何 10.x.x.x 都係 Private |
| Private **172.16.0.0/12** | 只 172.16 至 **172.31**（**172.32 起 = Public！**，止於 172.31.255.255） |
| Private **192.168.0.0/16** | 任何 192.168.x.x 都係 Private |
| Multicast **224.0.0.0/4** | 第一 octet **224–239** |
| Broadcast 特徵 | Host 部分全 1（例 x.x.x.255） |

- Private 地址**唔可以喺 Internet 上路由**（RFC 1918）

### 7.5 N／H／B 與 U／B／M 判斷

| 判斷 | 規則 |
|---|---|
| Network (N) | host 部分**全 0** → 唔可以派畀主機 |
| Host (H) | host 部分既非全 0 亦非全 1 |
| Broadcast (B) | host 部分**全 1** → 唔可以派畀主機 |
| Unicast | 1 對 1，單一目的地 |
| Broadcast | 1 對全部（同一 subnet 所有主機） |
| Multicast | 1 對一群（224.0.0.0/4，只有 group members 收到） |

- 易錯：`123.0.255.255/16` = **B**（/16 嘅 host 部分係 255.255，全 1）；`132.4.255.255/8` = **H**（/8 嘅 broadcast 係 132.255.255.255）

### 7.6 Subnetting 算式

- /24 → /27：借 **3 bit** → **8 個 subnet**，每 subnet **Block Size = 32**（256 − 224），**30 個可用 Host**（2^5 − 2）
- Subnet 邊界（每 +32）：.0／.32／.64／.96／.128／.160／.192／.224
- 每個 subnet：**ID = 開頭地址**（host 全 0）；**Broadcast = 結尾地址**（host 全 1）；First = ID + 1；Last = Broadcast − 1
- 例（/26）：mask 255.255.255.192、Block 64；`192.172.10.178` → Network `.128`、Broadcast `.191`、Host Range `.129–.190`
- 例（/28）：Block 16、14 個 Host；`150.150.150.32/28` → Broadcast `.47`、Host `.33–.46`
- 同一 subnet 判斷：/29 時 `201.3.4.200` → network .200、`201.3.4.215` → network .208 → **唔同 subnet**；/27 時兩者 AND 224 都得 .192 → **同一 subnet**

### 7.7 設計方案與浪費（VLSM 雛形）

| Design | Prefix | 每 subnet Host | LAN1–LAN4 ＋ WAN Link 分配 |
|---|---|---|---|
| Design 1 | /27 | 30 | Subnet 0（.0–.31）、1（.32–.63）、2（.64–.95）、3（.96–.127）、4（.128–.159） |
| Design 2 | /28 | 14 | .0–.15、.16–.31、.32–.47、.48–.63、.64–.79 |

- **浪費地址 = 每個 subnet 容量 − 實際需要嘅 host 數，再加總**
- 三個 Scheme 比較（LAN1 = 50、LAN2 = 20、LAN3 = 10 為例）：A 全 /26（62 Host）＝ 106；B（/26 ＋ 2×/27）＝ 42；**C（/26 ＋ /27 ＋ /28）＝ 26，浪費最少**
- 結論句：**"By choosing a prefix that matches the actual host requirement, fewer addresses are wasted."**（即 VLSM 概念）

### 7.8 英文記憶句

- "An IPv4 address is a 32-bit address written in dotted-decimal notation as four octets."
- "The network address is obtained by ANDing the IP address with the subnet mask."
- "The broadcast address has all host bits set to 1 and is the last address of the subnet."
- "The number of usable hosts per subnet is 2 to the power of the host bits minus 2."
- "The block size is 256 minus the last non-zero octet of the subnet mask."
- "According to RFC 1918, 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 are private addresses."

---

## Part 8 — T8／L8: IPv6 Addressing（IPv6 定址）
（來源：`ITE3102_L8_IPv6Addressing_StudyGuide.md`、`ITE3102_T8_IPv6Addressing_StudyGuide.md`）

### 8.1 必背數字

- IPv6 = **128 bits** = **8 hextets**；**1 hextet = 16 bits = 4 個十六進位數字**；每個 hex digit = 4 bits
- Prefix length 範圍 **0–128**，典型 **/64**（= 64-bit Interface ID）
- **`::` 在一個位址內只可用一次**；**零段數 = 8 − 非零 hextet 數**（零段 × 16 = binary 0 個數）
- `/48` Global Routing Prefix ＋ **16-bit** Subnet ID = **2¹⁶ = 65,536 個 `/64` subnet**
- EUI-64：中間插 **`fffe`** ＋ 反轉**第 7 個 bit**（U/L bit，例 `E4` → `E6`）
- MAC Address = 48 bits（6 octets）；EUI-64 Interface ID = 64 bits

### 8.2 位址類型與前綴速記表

| 類型 | Prefix | 一句話必記 |
|---|---|---|
| GUA（Global Unicast） | **2000::/3** | Globally unique、Internet 可路由；開頭係 **2 或 3**（≈ 2000:: 至 3FFF::，佔總空間 **1/8**） |
| LLA（Link-Local） | **FE80::/10** | **每個 IPv6 介面必須有**；只在同一條 link（FE80:: 至 FEBF::）；**不可路由** |
| ULA（Unique Local） | **FC00::/7**（至 FDFF::/7） | 類似 IPv4 private address；不被全域路由 |
| Loopback | **::1/128** | Sends a packet to itself；**唔可以**配喺實體介面 |
| Unspecified | **::/128** | **只可作來源位址**，唔可以配喺介面、唔可作目的 |
| IPv4-embedded | 例 `::192.168.10.10` | 協助 IPv4 → IPv6 過渡 |
| Multicast | **FF00::/8** | **只可作目的位址**；`ff02::1` = All-nodes、`ff02::2` = All-routers |

- ⚠️ IPv6 **冇 broadcast**（IPv4 嘅廣播功能由 multicast 取代）；**全 0 主機位址 = Subnet-Router anycast，只配 Router**；IPv6 **全 1 主機位址可以用**

### 8.3 兩條縮寫規則與展開

| 規則 | 做法 | 例子 | 陷阱 |
|---|---|---|---|
| Rule 1（Short Form） | 省略每個 hextet 嘅**前導零**（每組至少保留一個數字） | `01ab`→`1ab`、`0a00`→`a00`、`00ab`→`ab`、`0DB8`→`DB8` | **尾隨零唔可以省**（`2B00` 唔可以變 `2B`） |
| Rule 2（Compressed） | **`::`** 代替**最長**一段連續全零 hextet | `2001:db8:cafe:1:0:0:0:1` → `2001:db8:cafe:1::1`；七個零段 → `::1` | **只可用一次**（否則展開唔唯一） |

- 展開例：`20AB:1234::11:12` → `20AB:1234:0000:0000:0000:0000:0011:0012`；`::` 代表 **4 段零 = 16 個 hex 零 = 64 個 binary 零**
- 混合例：`2001:0:0:0:DB8:1111:0:200` 只壓縮最長一段 → `2001::DB8:1111:0:200`（後面嘅 `0:200` 保留）
- 合法性三查（**"One `::`, eight groups, hex only."**）：`::` 最多一次、總共剛好 8 個 hextet、只限 0–9／A–F 且每組 1–4 位
- 判斷例：`::11:ab` = **Valid**；`2009::db8:1::57ab:7344` = **Invalid**（多過一個 `::`）；`a:b:c:d:e:f:12:34:56` = **Invalid**（9 個 hextet，唔係 128 bits）；`fe80:0:0:0:0:0:0:1` = **Valid**

### 8.4 GUA 三部分與責任分工

`2001:db8:acad : XXXX : 0000:0000:0000:0000 /64` → **Global Routing Prefix（48b，ISP 派）｜Subnet ID（16b，機構自己分）｜Interface ID（64b，設備生成）**

### 8.5 動態取得 GUA：RS／RA 與三種方法

- **RS（Router Solicitation）**：**host 發**，用嚟搵 Router
- **RA（Router Advertisement）**：**Router 發**（ICMPv6 訊息），帶 **prefix 同 prefix length、default gateway、DNS 位址同 domain name**
- 支援 SLAAC 嘅協議 = **ICMPv6**

| 方法 | 位址（GUA）由邊個提供 | DNS 等資料 | Default Gateway |
|---|---|---|---|
| **SLAAC** | RA 提供 prefix，設備用 **EUI-64 或隨機**造 Interface ID | 冇 | Router 的 **LLA**（RA 來源位址） |
| **SLAAC + Stateless DHCPv6** | 同上（SLAAC 自己造） | **stateless DHCPv6 server**（只派額外資訊） | Router 的 **LLA** |
| **Stateful DHCPv6** | **DHCPv6 server** 派 GUA ＋ prefix length（管理租約） | 同上 server | Router 的 **LLA** |

### 8.6 IPv4 → IPv6 過渡三大技術

| 技術 | 關鍵句 |
|---|---|
| **Dual Stack** | IPv4 and IPv6 on the same network |
| **Tunneling** | The IPv6 packet is encapsulated inside an IPv4 packet |
| **NAT64** | Allows IPv6-enabled devices to communicate with IPv4 devices（配合 DNS64） |

### 8.7 EUI-64 計算（例：E4-11-5B-3D-BE-0F）

| 步驟 | 結果 |
|---|---|
| 1. MAC → 48-bit binary | `1110 0100 – 0001 0001 – 0101 1011 – 0011 1101 – 1011 1110 – 0000 1111` |
| 2. 中間插 FFFE | `1110 0100 – 0001 0001 – 0101 1011 – 1111 1111 – 1111 1110 – 0011 1101 – 1011 1110 – 0000 1111` |
| 3. 反第 7 bit（U/L bit：0 → 1） | `1110 0110 – …`（即 `E4` → `E6`） |
| 4. 結果（hex） | **`E6-11-5B-FF-FE-3D-BE-0F`** |

- 口訣：**"Split, FFFE in the middle, flip bit 7."**

### 8.8 IPv4 vs IPv6 一覽

| 比較 | IPv4 | IPv6 |
|---|---|---|
| 長度／寫法 | 32 bits、dotted decimal | **128 bits**、hexadecimal、8 hextets |
| 網絡部分 | Subnet mask（255.255.255.0） | **Prefix length（/64）**，冇 mask |
| 廣播 | 有 Broadcast | **冇**，用 multicast 取代 |
| 自動定址 | DHCP | **SLAAC**／DHCPv6（stateless／stateful） |
| 私用 | RFC 1918（10.x、172.16–31.x、192.168.x） | **ULA（FC00::/7）** |
| 每介面位址 | 通常 1 個 | 通常 **2 個或以上**（GUA ＋ LLA） |
| IPv4／IPv6 共存 | — | **Dual Stack**／**Tunneling**／**NAT64** |

### 8.9 設定重點（指令本身見指令章）

- 靜態 GUA 用 **/64**；靜態 LLA 要用 **link-local** 關鍵字，同一條 link 內必須唯一
- Router 要轉發 IPv6 必須開 **unicast-routing**（講義未列出，實務需要）
- Windows 用 **ipconfig** 睇 GUA、Link-local IPv6 Address 同 Default Gateway（通常 fe80::1）
- 口訣：IPv6 指令同 IPv4 幾乎一樣，**只需把 `ip` 換成 `ipv6`**
- Windows **best practice**：Default Gateway 填 Router 嘅 **LLA**（SLAAC／DHCPv6 時會自動設定）

### 8.10 英文記憶句

- "An IPv6 address is 128 bits long, represented as eight groups of four hexadecimal digits separated by colons."
- "A double colon can only be used once within an address."
- "Every IPv6-enabled interface must have a link-local address (FE80::/10)."
- "Unlike IPv4, IPv6 does not have a broadcast address."
- "Packets with a source or destination LLA cannot be routed."
- "EUI-64 inserts fffe into the middle of the MAC address and reverses the 7th bit."
- "With SLAAC, the prefix comes from the RA and the device creates its own interface ID."
- "A GUA consists of the global routing prefix, the subnet ID, and the interface ID."
- "Tunneling encapsulates the IPv6 packet inside an IPv4 packet."
- "An IPv6 address is valid only if it contains exactly eight hextets, uses only hexadecimal digits, and uses the double colon at most once."

### 8.11 交叉引用

- 理論全文：`02_Study_Guides/ITE3102_L8_IPv6Addressing_StudyGuide.md`
- 題解練習：`02_Study_Guides/ITE3102_T8_IPv6Addressing_StudyGuide.md`（換算、類型配對、EUI-64、合法性判斷）

---

## Part 9 — T9: Transport Layer（傳輸層：TCP／UDP）
（來源：`ITE3102_T9_Transport_StudyGuide.md`）

### 9.1 TCP vs UDP 對比表（必背）

| 特性 | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented | Connectionless |
| Reliability | Reliable | Best-effort |
| Acknowledgement | Yes（ACK） | No |
| Sequencing | Yes（Sequence Number） | No |
| Retransmission | Yes | No |
| Header Overhead | **20 bytes**（最少） | **8 bytes** |
| Speed / Latency | 較慢（要交握、確認） | 快、低延遲 |
| 典型應用 | HTTP、FTP、Telnet | DNS、DHCP、TFTP |

- 招牌字眼：Reliable／reassembles data in sequenced order／resends lost data／acknowledge data → **TCP**；Delivers data as it arrives／low overhead／does not require acknowledgements → **UDP**

### 9.2 Header 欄位

| 協議 | 欄位 | 大小 |
|---|---|---|
| UDP | Source Port、Destination Port、Length、Checksum | **8 bytes**（4 個欄位） |
| TCP | 額外有 Sequence Number（32）、Acknowledgement Number（32）、Header Length（4）、Reserved、Control Bits、Window（16）、Urgent（16）、Options | 最少 **20 bytes** |

- **TCP 與 UDP 四個共同欄位 = Source Port、Destination Port、Length、Checksum**
- 見 Header 只有 4 個欄位、有 **Length** 欄位 → 一定係 **UDP**

### 9.3 Port Number 與 Socket

| 範圍（IANA） | Port Group |
|---|---|
| **0 – 1023** | **Well-known ports**（HTTP 80、HTTPS 443、DNS 53、Telnet 23、FTP 21） |
| **1024 – 49151** | **Registered ports**（例 MySQL 3306） |
| **49152 – 65535** | **Private and/or dynamic ports**（ephemeral，client 臨時揀，例 2345） |

- Header 內嘅 **Port Number**（實際係 **Destination Port**）將數據導向**正確嘅應用程式**
- **Socket = IP address ＋ Port number**；例 source socket = PC IP:2345、destination socket = web server IP:80
- 口訣：**IP 負責「去邊部機」，Port 負責「機上邊個程式」**

### 9.4 建立連線：Three-Way Handshake

| Step | Control Bit |
|---|---|
| 1（client → server） | **SYN** |
| 2（server → client） | **SYN + ACK** |
| 3（client → server） | **ACK** |

- 核心規則：**Acknowledgment Number = 對方上一個 Sequence Number + 1**（SYN 耗用一個序號）；自己下一個 Sequence Number 亦係 +1
- 例：N1 = 100 → N3（SYN+ACK 內 ack）= **101**、N4（第三步 seq）= **101**；N2 = 300 → N5 = **301**

### 9.5 終止連線、序號與重組

- 四次揮手次序：**FIN → ACK → FIN → ACK**（TCP 係 full-duplex，兩邊各自獨立關閉自己方向）
- TCP 用 **Sequence Number** 重組同排序 received segments（標示該段喺 byte stream 由第幾 byte 開始）
- **Acknowledgment Number = 接收端期望收到嘅下一個 byte 嘅 Sequence Number**（= 最後成功收到嘅 byte + 1，累積性）；例：收到 byte 1–5000 → 回 ack = **5001**

### 9.6 滑動視窗（Sliding Window）與壅塞控制

- Send Window = 未收到 ACK 前最多可送出嘅 byte 數；**每送一個 segment 就扣 MSS，收到 ACK 就前滑**
- 例：Window 10000、MSS 1460 → 送 2 個 segment 後 = 10000 − 2 × 1460 = **7080 bytes**；再送 1 個 = 7080 − 1460 = **5620 bytes**
- 註：7 個 segment（10220）已超出視窗，收 ACK 前最多連送 6 個（8760）
- 若 segments 冇被確認／確認唔及時 → sender **縮細 Send Window、減慢傳送**（**Congestion Control**）

### 9.7 應用選擇判斷

| 需求 | 揀 |
|---|---|
| Segments 必須以特定順序到達 | **TCP**（Sequence Number 排序重組） |
| 可容忍少量丟失但延遲不可接受 | **UDP**（無 setup、無 ACK 等待、無重傳） |
| Telnet | **TCP**（port 23，需 reliable、ordered 字元流） |
| 各 2 個例子 | TCP：HTTP、FTP（亦可 HTTPS、SSH、SMTP、Telnet、POP3、IMAP）；UDP：DNS、DHCP（亦可 TFTP、SNMP、VoIP、串流、線上遊戲） |

### 9.8 英文記憶句

- "TCP is a connection-oriented, reliable protocol that acknowledges data, reassembles segments in sequence, and retransmits lost data."
- "UDP is a connectionless, best-effort protocol with low overhead; it delivers datagrams as they arrive and requires no acknowledgements."
- "A socket is the combination of an IP address and a port number."
- "The acknowledgment number represents the sequence number of the next byte expected by the receiver."
- "The send window shrinks as data is sent and slides forward when an acknowledgement is received."
- "UDP uses less overhead because its header is only 8 bytes, compared with 20 bytes for TCP."

---

## Part 10 — T10: Application Layer（應用層：HTTP／DNS／DHCP／Email／FTP）
（來源：`ITE3102_T10_Application_StudyGuide.md`）

### 10.1 應用層對應 OSI 邊三層

- TCP/IP Application Layer = OSI **Layer 5 Session ＋ Layer 6 Presentation ＋ Layer 7 Application**
- 分類速記：**Layer 7 = 協定**（DHCP、DNS、HTTP、IMAP、POP、TFTP）；**Layer 6 = 資料格式標準**（GIF、JPEG、MPEG）；**Layer 5 = 題目列表中無**

### 10.2 協定 ↔ 功能配對（必背）

| 功能 | 協定 |
|---|---|
| Delivery of web pages | **HTTP** |
| Secure delivery of web pages | **HTTPS** |
| Performs connection-oriented file transfer | **FTP** |
| Performs connectionless file transfer | **TFTP** |
| Forwards e-mails | **SMTP** |
| Retrieves emails with original kept | **IMAP（IMAP4）** |
| Retrieves emails with original deleted | **POP（POP3）** |
| Translate domain name into IP address | **DNS** |
| File sharing in Microsoft networks | **SMB** |
| Dynamically assigns IP, subnet mask, default gateway and DNS at start-up | **DHCP** |

### 10.3 Port Number 表（必背）

| Port | 協定 | 用途 | Transport |
|---|---|---|---|
| 21 | FTP | 控制連接（Control） | TCP |
| 20 | FTP | 資料連接（Data） | TCP |
| 25 | SMTP | 寄／轉寄電郵 | TCP |
| 53 | DNS | 域名解析 | **Both**（查詢 UDP、區域傳輸 TCP） |
| 69 | TFTP | 無連接檔案傳送 | UDP |
| 80 | HTTP | 網頁傳送 | TCP |
| 110 | POP3 | 收取電郵（刪原件） | TCP |
| 143 | IMAP4 | 收取電郵（留原件） | TCP |
| 443 | HTTPS | 安全網頁傳送 | TCP |

- 口訣：**F 21、S 25、D 53、H 80、HTTPS 443**

### 10.4 四大對比組

| 對比組 | 重點 |
|---|---|
| HTTP vs HTTPS | HTTP 明文；HTTPS = HTTP ＋ **SSL/TLS**，提供 **encryption、integrity、authentication** |
| FTP vs TFTP | FTP 面向連接（TCP 21 控制 ＋ 20 資料）；TFTP 無連接（UDP 69） |
| POP3 vs IMAP4 | POP3 下載即刪（適合伺服器儲存有限）；IMAP4 保留原件（可從不同地點下載） |
| SMTP vs POP／IMAP | SMTP 負責「**推**」（寄出、轉寄至 remote mail server）；POP／IMAP 負責「**拉**」（從 server 收取） |

### 10.5 HTTP 方法與 DHCP：DORA

| 描述 | 方法 |
|---|---|
| A client request for data | **GET**（拿資料） |
| Uploads data files to the web server | **POST**（交資料） |
| Uploads resources or content to the web server | **PUT**（放內容） |

| Step | Message | 內容 |
|---|---|---|
| 1 | **DHCP Discover** | Find the server（客戶端廣播搵伺服器） |
| 2 | **DHCP Offer** | Suggest a lease（伺服器提議租約） |
| 3 | **DHCP Request** | Identify the lease（客戶端指明接受邊個 offer） |
| 4 | **DHCP Acknowledge** | Confirm the lease（伺服器確認租約） |

- 易錯：**Request 唔係「請求」伺服器，係「指明」接受邊個租約**

### 10.6 DNS 情境判斷（三步）

1. **DNS 設定要指向實際運行 DNS 服務嘅伺服器**（指向冇 DNS 服務嘅 IP → 全部域名都解析失敗）
2. **Resource Record 必須存在**（冇記錄 → Name Not Found，解析失敗）
3. **記錄嘅 IP 必須正確**（IP 有 Typo → 連去錯誤主機，仍然無法瀏覽）
- 例：PC1 DNS 設正確 → banana.hk 冇記錄 → 不可以；apple.hk IP 有 Typo → 不可以；orange.hk 正確 → 可以。PC2 DNS 設定錯誤 → 所有 URL 都不可以

### 10.7 三種模型分類

| 描述 | 分類 |
|---|---|
| 有專用伺服器提供服務（例 browser 向 DNS server 查詢） | **Client-Server Model** |
| 無專用伺服器、電腦之間直接分享資源（例用同事 workstation 上嘅印表機） | **Peer-to-Peer Network** |
| 用特定應用軟件，定位檔案後用戶之間直接互傳（例 WhatsApp／BitTorrent） | **Peer-to-Peer Application** |

| 特性 | P2P Network | P2P Application |
|---|---|---|
| No dedicated server is required | ✅ | — |
| Client and server roles are set on a per request basis | ✅ | — |
| A background service is required | — | ✅ |
| Requires a specific user interface | — | ✅ |

### 10.8 英文記憶句

- "The TCP/IP application layer combines the functions of OSI layers 5, 6 and 7 — Session, Presentation and Application."
- "DNS translates domain names into IP addresses using port 53 (both TCP and UDP)."
- "SMTP forwards e-mail to remote mail servers, while POP3 and IMAP4 are used by clients to retrieve e-mail."
- "The advantage of HTTPS over HTTP is that HTTPS uses SSL/TLS and encryption to secure data in transit."
- "The DHCP process is DORA: Discover finds the server, Offer suggests a lease, Request identifies the lease, and Acknowledge confirms it."
- "In FTP, port 21 is the control connection for commands and port 20 is the data connection for transferring file contents."
- "GET is a client request for data, POST uploads data files to the web server, and PUT uploads resources or content to the web server."

---

---

## Part 11 — L3: Network Models（協議與模型）
（來源：`ITE3102_L3_NetworkModels_StudyGuide.md` 講義深度補完；Part 3 已覆蓋嘅模型對照／PDU／投遞方式唔重覆）

### 11.1 通訊三要素與四大要求

- 三要素：**Source（sender）**、**Destination（receiver）**、**Channel（media）**（提供通訊路徑）
- 通訊要照顧四件事：**identified sender and receiver**；**common language and grammar**；**speed and timing of delivery**；**confirmation or acknowledgment**

### 11.2 Protocol 四大類型

| 類型 | 一句講清 |
|---|---|
| Network Communications | 令兩部以上設備喺一個或多個網絡通訊 |
| Network Security | authentication、data integrity、data encryption |
| Routing | 令 router 交換路由資訊、比較路徑、選最佳路徑 |
| Service Discovery | 自動偵測設備或服務 |

### 11.3 Protocol 六大功能

| 功能 | 一句講清 |
|---|---|
| Addressing | identifies sender and receiver |
| Reliability | provides guaranteed delivery |
| Flow Control | manages the rate of data transmission |
| Sequencing | 為每個 transmitted segment 加 unique label |
| Error Detection | 判斷傳輸途中資料有冇 corrupt |
| Application Interface | process-to-process communications |

### 11.4 Protocol Suite 四大家族

| Suite | 性質／維護者 |
|---|---|
| TCP/IP（Internet Protocol Suite） | **最常用**；由 **IETF** 維護 |
| OSI protocols | 由 **ISO** 同 **ITU** 開發 |
| AppleTalk / Novell NetWare | **proprietary**（廠商專有） |
| Open standard suite | TCP/IP 係 open standard：public 免費、任何 vendor 可用 |

- Open standards 鼓勵 **interoperability、competition、innovation**；standards-based 就係經標準組織批准，確保 interoperability

### 11.5 標準組織十強（一句對應）

| 組織 | 職責 |
|---|---|
| ISOC | 推廣互聯網開放發展同演進 |
| IAB | 管理同開發 internet standards |
| IETF | 開發、更新、維護 internet 同 TCP/IP 技術 |
| IRTF | 專注長期研究（long-term research） |
| ICANN | coordinates IP address allocation、domain name 管理 |
| IANA | 為 ICANN 監管 IP allocation、domain name、protocol identifiers |
| IEEE | power、healthcare、telecom、networking 標準（Ethernet、WLAN） |
| EIA | wiring、connectors、**19-inch racks** |
| TIA | radio equipment、cellular towers、VoIP、satellite |
| ITU-T | video compression、IPTV、broadband（**DSL**） |

口訣：ISOC 推廣 → IAB 管標準 → IETF 維護 TCP/IP → IRTF 研究；ICANN **統籌** → IANA **執行**。

### 11.6 分層模型四大好處＋兩個加速概念

- 四大好處：**assist in protocol design**、**prevent changes in one layer from affecting other layers**、**foster competition**、**provide a common language**
- **Segmentation** 兩大好處：**increases speed**（唔使等整份傳完）＋ **increases efficiency**（只重傳失敗嘅 segment）
- **Multiplexing**：將多條 segmented data streams **interleave** 埋一齊

### 11.7 兩套位址：Layer 2 vs Layer 3

| Layer | 別名 | 特性 |
|---|---|---|
| **Layer 2** | MAC address / physical address / data link address | **physically embedded into the NIC**；**local** addressing |
| **Layer 3** | IP address / logical address / hierarchical address / network address | **network portion**（左邊，識別 group）＋ **host portion**（識別個別設備） |

- IP packet 內嘅 source IP／destination IP 永遠係 original source 同 final destination；**well-known port numbers identify the applications**
- 主機取 IP 兩種方法：**DHCP** 動態派 ／ **statically assigned**（人手填 IP、subnet mask、default gateway、DNS）

### 11.8 英文記憶句

- "Protocols are the rules that communications will follow."
- "A protocol suite is a set of protocols that work together to provide comprehensive network communication services."
- "TCP/IP is an open standard protocol suite that is freely available to the public and can be used by any vendor."
- "Open standards encourage interoperability, competition, and innovation."
- "The IETF develops, updates, and maintains internet and TCP/IP technologies."
- "ICANN coordinates IP address allocation and the management of domain names."
- "Layered models assist in protocol design, prevent changes in one layer from affecting other layers, foster competition, and provide a common language."
- "Segmentation increases speed and increases efficiency."

---

## Part 12 — L4: Network Access（實體層與 Data Link）
（來源：`ITE3102_L4_NetworkAccess_StudyGuide.md` 講義深度補完；Part 4 已覆蓋嘅線材選用／拓撲／frame 欄位唔重覆）

### 12.1 Physical Layer 定位同三大功能區

- 職責：**transports bits across the network media**，係 encapsulation 嘅**最後一步**（將 frame encode 成 signals）

| 功能區 | 內容 |
|---|---|
| Physical Components | hardware devices、media、connectors |
| Encoding | 將 bits 轉成下一個裝置認得嘅格式 |
| Signaling | 0 同 1 喺媒介上點表示 |

### 12.2 Encoding 三招與 Signaling 三種

- Encoding 方法：**Manchester**、**4B/5B**、**8B/10B**
- Signaling：Copper = **electrical signals**；Fiber = **light pulses**；Wireless = **microwave signals**

### 12.3 四個「速度」概念同單位（Latency 係新增）

| 概念 | 定義 | 大細關係 |
|---|---|---|
| Bandwidth | capacity at which a medium can carry data | 最高（理論） |
| Throughput | transfer of bits across the media（實際） | ≤ Bandwidth |
| Goodput | usable data；= Throughput − traffic overhead | ≤ Throughput |
| **Latency** | amount of time, **including delays**, for data to travel from one point to another | 越細越好 |

- 單位：**1 Kbps = 1,000 bps｜1 Mbps = 10^6 bps｜1 Gbps = 10^9 bps｜1 Tbps = 10^12 bps**

### 12.4 銅線三兄弟＋三大麻煩

- **UTP**：無屏蔽、**最常見 networking media**、最平、用 **RJ-45**；**STP**：braided 或 foil shield（抗噪最好、貴、難裝）；**Coaxial**：單芯銅導體＋塑料絕緣＋編織銅網（同時做第二導線）＋外皮（無線天線、cable internet）

| 麻煩 | 解法 |
|---|---|
| **Attenuation** | 行得越遠訊號越弱 → 守線長上限 |
| **EMI／RFI** | 金屬 shielding ＋ grounding |
| **Crosstalk** | 絞線：一對線用相反極性，令 magnetic fields **cancel** |

- **TIA/EIA-568** 規定：cable types、cable lengths、connectors、cable termination、testing methods

### 12.5 光纖：SMF vs MMF

| | Single-Mode Fiber (SMF) | Multimode Fiber (MMF) |
|---|---|---|
| Core | 極細 | 較大 |
| 光源 | **expensive lasers** | **cheaper LEDs** |
| 用途 | long-distance | 最多 **10 Gbps / 550 meters** |
| Patch cord 顏色 | **Yellow** | **Orange／Aqua** |

- **Dispersion**：光脈衝隨時間擴散；越大 → loss of signal strength 越大（MMF 較大）
- 接頭：**ST**（Straight-Tip）、**SC**（Subscriber Connector）、**LC**（Lucent Connector）
- 四大應用：Enterprise、**FTTH**（always-on broadband）、Long-Haul、Submarine；光纖完全免疫 EMI/RFI

### 12.6 無線：四大限制＋四個 IEEE 標準

- 限制：Coverage area、Interference、Security、**Shared medium**（WLAN 行 **half-duplex**，多人同時用 → 每人頻寬下降）
- **Wi-Fi = IEEE 802.11**（WLAN）｜**Bluetooth = IEEE 802.15**（WPAN）｜**WiMAX = IEEE 802.16**（point-to-multipoint 寬頻無線接入）｜**Zigbee = IEEE 802.15.4**（低速率、低功耗 IoT）
- 兩件裝備：**Wireless AP**（集中無線訊號 → 接 copper-based infrastructure）＋ **Wireless NIC Adapters**（畀主機無線能力）

### 12.7 Data Link Layer：目的同每跳四動作

- 職責：負責 **communications between end-device NICs**，將 **Layer 3 packets 封裝成 Layer 2 frames**，做 error detection、掉棄 corrupt frames
- 兩子層：**LLC**（對上層 networking software）× **MAC**（對下硬件：data encapsulation + media access control）；標準由 **IEEE、ITU、ISO、ANSI** 定義
- Router 每跳四動作：**accept frame → de-encapsulate → re-encapsulate → forward**
- LAN／WAN frame 種類（由 logical topology + physical media 決定）：**Ethernet、802.11 Wireless、PPP、HDLC、Frame-Relay**

### 12.8 媒體存取控制：爭用式 vs 受控式

| | Contention-based（爭用式） | Controlled Access（受控式） |
|---|---|---|
| 特性 | 所有 node 行 half-duplex，**爭用媒介** | **deterministic**：每個 node 有自己嘅時間 |
| 例子 | **CSMA/CD**（legacy bus Ethernet：偵測碰撞 → 隨機等 → 重傳）；**CSMA/CA**（IEEE 802.11 WLAN：附上 time duration） | **Token Ring、ARCNET** |

### 12.9 英文記憶句

- "The physical layer transports bits across the network media and is the last step in the encapsulation process."
- "Encoding converts the stream of bits into a format recognizable by the next device in the network path."
- "Latency is the amount of time, including delays, for data to travel from one given point to another."
- "Copper cable mitigates EMI and RFI by using metallic shielding and grounding, and mitigates crosstalk by twisting opposing circuit pair wires together."
- "Single-mode fiber has a very small core and uses expensive lasers; multimode fiber has a larger core and uses less expensive LEDs."
- "The Data Link Layer consists of two sublayers: Logical Link Control (LLC) and Media Access Control (MAC)."
- "Contention-based access means all nodes compete for use of the medium, while controlled access is deterministic."

---

## Part 13 — L5: Ethernet（以太網、ARP、Switch）
（來源：`ITE3102_L5_Ethernet_StudyGuide.md`；`⚠️ 教材外補充` 標註照原文保留）

### 13.1 Ethernet 定位同兩個子層

- **最廣泛使用嘅 LAN 技術**，同時喺 **data link layer 同 physical layer** 運作；定義喺 **IEEE 802.2 同 IEEE 802.3**；**LLC（software）**同上層溝通／標明上層協議，**MAC（hardware）**做 data encapsulation + media access control

### 13.2 Ethernet Frame 大細（必背 5 個數）

| 情況 | 數值 |
|---|---|
| Frame 最小 | **64 bytes**（由 Destination MAC 數到 FCS，**Preamble 唔計**） |
| Frame 最大 | **1518 bytes** |
| Jumbo / baby giant | 大過 **1500 bytes** |
| Runt / collision fragment | 細過 **64 bytes** |
| Pad | 太細嘅 packet 加 pad，令 frame 升到 **64 bytes** |

### 13.3 Type 欄位值（識別封裝咗邊個上層協議）

- Type 值：**0x800 = IPv4｜0x86DD = IPv6｜0x806 = ARP**；FCS 用 **CRC** 偵錯

### 13.4 MAC 位址結構（必背數字）

| 項目 | 值 |
|---|---|
| 長度 | **48 bits = 12 hexadecimal digits = 6 bytes** |
| OUI | 頭 **6 個 hex digits（頭 3 bytes）**由 **IEEE** 指派畀廠商；尾 6 位喺同一 OUI 內必須唯一 |
| BIA (Burned-In Address) | MAC **永久**編碼入 ROM chip |
| Broadcast | **FF-FF-FF-FF-FF-FF**（48 個 1） |
| Multicast | 以 **01-00-5E** 開頭；IPv4 multicast range = **224.0.0.0 – 239.255.255.255** |

### 13.5 Switch 學習／轉發同 MAC 表

- 表名：**MAC address table**（又叫 **CAM table**），做 MAC ↔ port 對應
- **Learn**：睇入 frame 嘅 **source MAC + 入 port**，唔存在就加新 entry；**refresh timer** 默認保留 **5 分鐘**
- **Forward**：查 **destination MAC**；查唔到（**unknown unicast**）→ **flooding**（除入 port 外全部）；broadcast／multicast frame 一樣 flooding

### 13.6 三種 Frame 轉發模式

| | Fast-forward（= Cut-Through） | Fragment-free | Store-and-Forward |
|---|---|---|---|
| 幾時轉 | 一讀到 destination address 即轉 | 存夠 **64 bytes** 先轉 | 收晒全個 frame 先轉 |
| 檢查 | 冇 | 過濾頭 64 bytes 內嘅錯誤／collision | **CRC** 驗證，壞 frame 丟棄 |
| 特性 | 最快、可能連壞 frame 都照轉 | 折衷 | 最可靠、延遲較高 |

（**⚠️ 教材外補充**：**Fast-forward 即 Cut-Through**；**Store-and-Forward** = 緩存整個 frame、用 **CRC** 檢查有冇被改過先轉發。）

### 13.7 Memory Buffering 兩種（**⚠️ 教材外補充**）

- **Port-based**：每個入 port 有自己 queue，frame 只可經對應出 port 傳；一個 port 擠塞會拖住其他 frame
- **Shared memory**：所有 frame 入一個所有 port 共用嘅 buffer，port 動態分配空間，彈性較高

### 13.8 Duplex／Speed／Auto-MDIX

- **Full-duplex** 兩端可同時收發；**Half-duplex** 同一時間只有一端可發；**Duplex Mismatch** = 一邊 half、一邊 full
- **Auto-MDIX**：默認啟用，switch 自己偵測纜線類型（所以 crossover 屬 legacy）
- （**⚠️ 教材外補充**）**Auto-negotiation**：自動協商 **speed 同 duplex**；協商失敗（如對端寫死 half-duplex）就會出現 **duplex mismatch**

### 13.9 ARP 四種情境（本地 / 跨網絡 × Frame / ARP）

| 情境 | 查邊個 IP | Destination MAC |
|---|---|---|
| 本地通訊 Frame | — | 目的裝置自己嘅 MAC |
| 跨網絡通訊 Frame | — | **Default Gateway 嘅 MAC**（之後逐 hop 換） |
| 本地通訊 ARP | ARP **目的裝置**嘅 IP | — |
| 跨網絡通訊 ARP | ARP **只有 Default Gateway** 嘅 IP | — |

- **ARP Request = Layer 2 broadcast（FFFF.FFFF.FFFF）**；**ARP Reply = unicast**（回覆自己 MAC）
- **ARP table（ARP cache）**：IP → physical address，存喺 **RAM**；Source／Destination IP 全程唔變

### 13.10 ARP 保安同廣播域（**⚠️ 教材外補充**）

- **ARP Spoofing／poisoning**：攻擊者用自己 MAC 冒充 default gateway 發 ARP reply，令受害者送錯流量（Man-in-the-Middle）；企業用 **dynamic ARP inspection** ＋ **IP Source Guard** 核對 MAC ↔ IP 綁定
- **Broadcast domain**：一個 broadcast frame 可以到達嘅範圍；switch 唔會分割（broadcast 照 flooding），**只有 Router 先會分開**
- **Port security**：限制每個 port 可學到嘅 MAC 數量或綁定固定 MAC，防未知裝置同 MAC flooding；**collision domain** 方面 hub = 一個共用碰撞域，**switch 每個 port 各自獨立**，所以碰撞大減

### 13.11 英文記憶句

- "Ethernet is the most widely used LAN technology today and operates in the data link layer and the physical layer."
- "Minimum 64 bytes, maximum 1518 bytes, counted from the destination MAC through the FCS; the preamble is not included."
- "A MAC address is a 48-bit binary value expressed as 12 hexadecimal digits; the first 6 hexadecimal digits are the vendor-assigned OUI."
- "The Type field identifies the upper layer protocol encapsulated: 0x800 for IPv4, 0x86DD for IPv6, 0x806 for ARP."
- "Every frame that enters a switch is examined for source MAC address and port number, and the switch forwards frames by matching the destination MAC address."
- "If the destination MAC address is not in the table, the switch forwards the frame out all ports except the incoming port."
- "MAC addresses change in different frames, but the source and destination IP addresses stay the same in all frames."

---

## Part 14 — L6: Network Layer（網絡層、Router）
（來源：`ITE3102_L6_NetworkLayer_StudyGuide.md` 講義深度補完；本 Part 只寫概念同流程，IOS 指令一律見「Cisco IOS 指令速查」章）

### 14.1 Network Layer 兩大功能同封裝

- 兩大功能：**path determination（選路）** ＋ **logical addressing（邏輯定址）**
- 封裝：Transport layer 嘅 **segment** → 加 **network header** → 變成 **packet**；到目的地 **de-capsulate**，將 segment 交上 Transport layer
- Network layer 嘅 PDU 叫 **packet**

### 14.2 Packet Forwarding：逐跳換 Frame

- Router 收 frame → 拎出 packet → 將 packet 封裝入**另一個** frame（每段鏈路換一次 Layer 2 frame）
- 例子：**R2 將 packet 封裝入 PPP frame**——另一種 Layer 2 frame，**唔需要 MAC address**
- **Broadcast domain**：一個邏輯網絡，包含所有可以由「送往 data link layer broadcast address 嘅 frame」到達嘅裝置；**router 介面分隔廣播域**

### 14.3 IPv4 Header 四大欄位（必背數字）

| 欄位 | 內容 |
|---|---|
| **IHL / Header Length** | 以 **4-byte word** 為單位；最小 = **5 → 5 × 4 = 20 bytes** |
| **Total Length** | 係 **packet 資料部分**嘅大小（⚠️ 唔係 header 長度） |
| **TTL (Time To Live)** | 每跳減 1，防止 packet 喺 routing loop 內兜 |
| **Protocol** | 下一個上層協議：**1 = ICMP、6 = TCP、17 = UDP** |

### 14.4 IPv4 三大限制 vs IPv6 特性

| IPv4 限制 | 內容 |
|---|---|
| **IP address depletion** | 約 **4 billion** 個地址，新裝置指數增長 → 唔夠用 |
| **Internet routing table expansion** | 大量 routes 會拖慢 router |
| **NAT** | 令多部機共用一個 IPv4 地址；但影響需要 **end-to-end connectivity** 嘅技術 |

| IPv6 特性 | 內容 |
|---|---|
| **128-bit hierarchical addressing** | 地址空間大得多，**免 NAT** |
| 簡化 header | 欄位更少，處理更有效率 |
| 欄位改名 | Traffic Class、Flow Label、Payload Length（= 舊 Total Length）、Next Header（= Layer 4 protocol）、**Hop Limit**（取代 TTL） |
| Version 值 | **0110**（二進制） |

### 14.5 Host 轉發決策同 Default Gateway

- 判斷：目標同自己**同一 network address** → **local host**（frame 直接填對方 MAC）；唔同 → **remote host**（frame 送去 default gateway）
- **127.0.0.1** = loopback interface，ping 自己部機、測試 **TCP/IP protocol stack**
- 取 IP 兩種方法：**DHCP 動態派** ／ **static 人手設定**（IP + subnet mask + default gateway）
- **Host routing table**：`0.0.0.0 – 0.0.0.0` entry 指向 **default gateway**；`127.0.0.1` 係 loopback interface
- **Default Gateway** = 同一個網段嘅 router 介面 IP，負責將流量送去其他網絡

### 14.6 Router 功能同路由決策

- Router 專責**將 packet 由一個網絡轉去另一個網絡**
- **Directly connected network**：直接接喺自己介面上；**Remote network**：要經另一部 router 先去到
- 路由決策流程：**睇 destination IP → 決定 destination network → 查 routing table → 重封裝成新 frame，由 exit interface 出**
- 出介面兩種寫法：**exit interface** ／ **next-hop**；**directly connected network 冇 next-hop**

### 14.7 路由來源四種＋收斂

| 來源 | 點嚟 |
|---|---|
| **Direct route（代碼 C）** | 介面設好 IP 並 activate 就**自動產生** |
| **Static route（代碼 S）** | **人手**設定，固定路徑；拓撲一變就要人手改 |
| **Default static route** | `0.0.0.0 0.0.0.0`；routing table 冇去該目的地嘅路徑時使用 |
| **Dynamic route（D = EIGRP、O = OSPF）** | Router 用 routing protocols 自動交換路由資訊 |

- **Administrative Distance（AD）**：多條路去同一目的地時，**數字最低**嘅先被裝入 routing table；**directly connected = 0、static = 1、EIGRP = 90**
- AD 唔係 metric：AD 鬥「唔同來源」嘅可信度，metric 用嚟喺「同一個協議內」比路徑好壞
- **Convergence**：router 完成交換同更新 routing tables 就叫收斂咗

### 14.8 Router 硬件、介面同開機流程

- Router **係一部專門化嘅電腦**：有 **CPU** ＋ **Cisco IOS** ＋ 記憶體同儲存（RAM／ROM／NVRAM／Flash）
- 介面：**Console port** = initial configuration + CLI 管理；**AUX port**（RJ-45）= remote management access；**LAN interface** 接內部設備；**WAN interface** 接外部網絡
- 開機四步：**POST（ROM）→ Bootstrap（ROM）→ Load IOS（Flash → RAM）→ Startup Config（NVRAM → RAM；冇 config 就入 setup mode）**
- **Initial settings**：device name、securing EXEC mode、VTY lines 同密碼、legal notification、management SVI、儲存 configuration
- **Loopback interface（router 層面）**：**logical／software** interface，唔係實體 port、**自動 UP**，OSPF 好重要

### 14.9 英文記憶句

- "The function of the network layer is to determine the best path through the network (path determination and logical addressing)."
- "The network layer PDU is called a packet."
- "R1 receives the frame, takes out the packet, and encapsulates the packet in another frame."
- "Header Length (IHL) specifies the size of the packet header in 4 byte words; the minimum size is 5, meaning 20 bytes."
- "TTL is decremented at each hop to prevent packets being passed around the network in routing loops."
- "IPv6 uses 128-bit hierarchical addressing and eliminates the need for NAT."
- "A default static route is used when the routing table does not contain a path for a destination network."
- "If multiple paths to a destination exist, the path with the lowest Administrative Distance is installed in the routing table."
- "Routers have converged after they have finished exchanging and updating their routing tables."

---

## Part 15 — L7: IPv4 Addressing（IPv4 定址與 Subnetting）
### 15.1 ANDing 計算（求 Network Address）

| A | B | A AND B |
|---|---|---|
| 1 | 1 | **1** |
| 1 | 0 | 0 |
| 0 | 1 | 0 |
| 0 | 0 | 0 |

- 口訣：**只有 1 AND 1 = 1**；mask 位 = 1 → 原封不動（x AND 1 = x），mask 位 = 0 → 全部歸零（x AND 0 = 0）→ 結果必定係 host bits 全 0 嘅 **network address**。
- 示範：`192.168.10.10` AND `255.255.255.0` = **192.168.10.0**（`11000000.10101000.00001010.00001010` AND `11111111.11111111.11111111.00000000`）。
- 用途：兩個 IP 分別 AND mask，network address 相同 → 同一 subnet。
### 15.2 Mask ↔ Binary ↔ Prefix ↔ Block Size

| Prefix | Subnet Mask | 最後 octet（binary） | Block Size |
|---|---|---|---|
| /8 | 255.0.0.0 | 00000000 | — |
| /16 | 255.255.0.0 | 00000000 | — |
| /24 | 255.255.255.0 | 00000000 | 256 |
| /25 | 255.255.255.128 | 10000000 | 128 |
| /26 | 255.255.255.192 | 11000000 | 64 |
| /27 | 255.255.255.224 | 11100000 | 32 |
| /28 | 255.255.255.240 | 11110000 | 16 |
| /29 | 255.255.255.248 | 11111000 | 8 |
| /30 | 255.255.255.252 | 11111100 | 4 |

- 速記：**128→/25、192→/26、224→/27、240→/28、248→/29、252→/30**；**prefix length = mask 中 1 嘅數目**，寫成 **slash notation**。
### 15.3 三種地址（Network／Host／Broadcast）

- `192.168.10.0/24`：Network **.0**（host 全 0）｜First Host **.1**（**all 0s and a 1**）｜Last Host **.254**（**all 1s and a 0**）｜Broadcast **.255**（host 全 1）。
- IPv4 = **32-bit hierarchical address**（network portion ＋ host portion），寫成 **dotted-decimal**（4 octets、每個 0–255）；mask 由左至右逐 bit 比較，1 = network、0 = host。
- 定位：First = **Network + 1**；Last = **Broadcast − 1**；Broadcast = **Network + Block − 1**；/24 可用 host = 2^8 − 2 = **254**（network 同 broadcast 唔可以派）。
### 15.4 Octet Boundary（/8、/16、/24）

| 由 | 切去 | 借 bit | # subnets | 每 subnet # hosts |
|---|---|---|---|---|
| /8 | /16 | 8 | 256 | 65,534 |
| /8 | /24 | 16 | 65,536 | 254 |
| /16 | /24 | 8 | 256 | 254 |

- **/16 網絡全套**：/17 255.255.128.0｜2｜32,766 · /18 255.255.192.0｜4｜16,382 · /19 255.255.224.0｜8｜8,190 · /20 255.255.240.0｜16｜4,094 · /21 255.255.248.0｜32｜2,046 · /22 255.255.252.0｜64｜1,022 · /23 255.255.254.0｜128｜510 · /24 255.255.255.0｜256｜254 · /25｜512｜126 · /26｜1,024｜62 · /27｜2,048｜30 · /28｜4,096｜14 · /29｜8,192｜6 · /30｜16,384｜2。
- 鐵律：**prefix 越長 → 每 subnet host 越少**（/17 剩 15 host bit → 2^15 − 2 = 32,766）；⚠️ 教材 slide 16 尾行 `10.2255.255.254` 係打錯，正確係 **`10.255.255.254`**。
### 15.5 三個招牌例子（由需求反推借幾多 bit）

| 例 | 輸入 | 反推 | 答案 |
|---|---|---|---|
| 100 subnets | 172.16.0.0/16 | 2^6 = 64 唔夠 → 借 7 bit | **/23**、255.255.254.0、128 subnets、每 510 host |
| 1000 subnets | 10.0.0.0/8 | 2^9 = 512 唔夠 → 借 10 bit | **/18**、255.255.192.0、1024 subnets、每 16,382 host |
| 10 subnets | 172.16.0.0/22（1,022 host） | 2^4 = 16 ≥ 10 → 借 4 bit；62 ≥ 40 ✓ | **/26**、255.255.255.192 |

- ⚠️ slide 27 尾句「for a total of 128 subnets」係打錯，正確係 **1024**（同句前面已寫 2^10 = 1024）。
- 借位上限：**"The last two bits cannot be borrowed."** → /16 最多借 14 bit、/8 最多借 22 bit、最細切到 **/30**。
### 15.6 VLSM 保育計算

- 情景：需 7 subnets（**four LANs ＋ three WAN links**），最大 host = 28（Building D）。
- 固定長度揀 **/27**（2^3 = 8 subnets、每 30 host IP）→ 但 WAN link 只需 2 個地址 → 每條浪費 28、**3 × 28 = 84 個浪費**。
- 解法 **VLSM**：**subnet a subnet**——LAN 用 /27、WAN link 用 **/30**（剛好 2 host）→ 零浪費。
### 15.7 地址種類（Private／Special／Legacy／管理）

| 類型 | 範圍／重點 |
|---|---|
| Private（RFC 1918） | 10.0.0.0/8、172.16.0.0/12（172.16–172.31）、192.168.0.0/16；**唔可全球路由**，靠 **NAT** 轉譯出街 |
| Multicast | **224.0.0.0 – 239.255.255.255**（首 octet 224–239）；router 交換 routing info |
| Loopback | **127.0.0.0/8**（常用 127.0.0.1）；測試本機 TCP/IP 有冇正常 |
| Link-Local / APIPA | **169.254.0.0/16**；Windows DHCP client 搵唔到 server 時自我配置 |
| Legacy Classes | A 0/8–127/8；B 128/16–191.255/16；C 192/24–223.255.255/24；D 224–239；E 240–255 |
| IANA / RIR | IANA 派 block 畀 **5 個 RIR**，RIR 再派畀 ISP |

- Classful 已被 **classless addressing** 取代（忽略 A／B／C 規則、可用任何 prefix），因為 classful **wasted many IPv4 addresses**。
- **U／B／M**：Unicast 1 對 1；Broadcast 1 對全部（**direct** = 特定網絡、**limited** = 本機網絡）；Multicast 1 對選定群組。
### 15.8 為何要 Subnet ＋ 企業設計

- 大 broadcast domain 壞處：主機產生 **excessive broadcasts** 拖慢網絡；switch 將 broadcast 由所有介面推出去，**唯一會擋 broadcast 嘅設備 = router**。
- Subnetting 三大好處：**減整體網絡流量／提升效能**、**可於 subnet 之間實施安全政策**、**減少受異常廣播流量影響嘅設備數**。
- 切割依據：**Location（地點）／Group or Function（群組功能）／Device Type（設備類型）**。
- **Intranet** = 公司內部網絡（用 **private address**）；**DMZ** = 對外伺服器區（**必須用 public address**）。
- 定址分工：**end user clients 用 DHCP**（減錯）、**servers/peripherals 用 static**（可預測）、對外 server 用 **public IP（多數經 NAT）**、**intermediary devices** 為管理／監控／保安、**gateway = router／firewall**。
### 15.9 英文記憶句

- "A logical AND operation is used in determining the network address; only a 1 AND 1 produces a 1."
- "The prefix length is the number of bits set to 1 in the subnet mask, written in slash notation."
- "The first address has all 0s and a 1 in the host portion; the last address has all 1s and a 0."
- "Borrowing n bits creates 2^n subnets, and each subnet has 2^h minus 2 usable hosts."
- "The last two bits cannot be borrowed."
- "The only device that stops broadcasts is a router."
- "According to RFC 1918, the private ranges are 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16."
- "VLSM avoids wasting addresses by enabling us to subnet a subnet."
- "End user clients most use DHCP, while servers should have a predictable static IP address."

---

## Part 16 — L9: Transport Layer（TCP／UDP 深入）
### 16.1 Header 欄位逐個 bit 數（必背）

| 協議 | 欄位（bit） | 總大小 |
|---|---|---|
| UDP | Source Port 16、Destination Port 16、Length 16、Checksum 16 | **8 bytes（64 bits）** |
| TCP | Source Port 16、Dest Port 16、Sequence Number 32、Acknowledgment Number 32、Header Length 4、Reserved 6、Control Bits 6、Window 16、Checksum 16、Urgent 16 | **20 Bytes Total** |

- 判題：**只有 4 個欄位、有 Length 欄位 → UDP**；見到 Sequence／Acknowledgment → TCP。
- TCP 同 UDP **共有嘅 4 個欄位** = Source Port、Destination Port、Length、Checksum；**Header Length** 又叫 **data offset**（4-bit）；**Reserved** = 6-bit（留待將來用）。
### 16.2 Well-known Port 必背表

| Port | Protocol | Application |
|---|---|---|
| 20 | TCP | FTP - Data |
| 21 | TCP | FTP - Control |
| 22 | TCP | SSH |
| 23 | TCP | Telnet |
| 25 | TCP | SMTP |
| 53 | UDP, TCP | DNS |
| 67 | UDP | DHCP - Server |
| 68 | UDP | DHCP - Client |
| 69 | UDP | TFTP |
| 80 | TCP | HTTP |
| 110 | TCP | POP3 |
| 143 | TCP | IMAP |
| 161 | UDP | SNMP |
| 443 | TCP | HTTPS |

- 三大範圍：**Well-known 0–1,023／Registered 1,024–49,151（例 Cisco RADIUS 1812）／Private-Dynamic 49,152–65,535（ephemeral）**。
### 16.3 Socket 與一問一答

- **Socket = IP address ＋ Port number**；source socket 識別 client、destination socket 識別 server。
- **Source port = 回郵地址（return address）**，由發送方動態揀選；**Destination port** 話畀對方知要求緊邊個服務（例 **port 80 for web service**）；伺服器上每個 application process 用一個獨立 port。
- 一問一答時 **source／destination port 對調**：client 隨機 source port → server well-known port；回覆時 server well-known 做 source、client 原 source port 做 destination。
### 16.4 `netstat` 輸出解讀

```text
Proto  Local Address          Foreign Address            State
TCP    192.168.1.124:3126     192.168.0.2:netbios-ssn    ESTABLISHED
TCP    192.168.1.124:3158     207.138.126.152:http       ESTABLISHED
TCP    192.168.1.124:3166     www.cisco.com:http         ESTABLISHED
```

- **Local Address** = 本機 IP ＋ 本機 port；**Foreign Address** = 對端 IP／主機名 ＋ 對端 port／服務名；**State** = **ESTABLISHED**。
- 用途：檢查 host 上 **open／running 嘅 TCP connections**；**unexplained TCP connections 可以係重大安全威脅**；範例係 **6 sessions、2 clients**；指令 `netstat`／`netstat -n`。
### 16.5 三次交握 ＋ 四次揮手 ＋ 序號

| Step | 控制位 | 意思 |
|---|---|---|
| 1（client→server） | **SYN** | 要求建立 client-to-server session |
| 2（server→client） | **SYN, ACK** | 確認並反向要求 server-to-client session |
| 3（client→server） | **ACK** | 確認 server-to-client session |

- 三大功能：① 確認目的設備**喺網絡上存在**；② 驗證有 **active service** 喺該 destination port 接受請求；③ 通知目的設備 source client 打算喺該 port **建立通訊 session**。
- 呢個 connection／session 機制正正令 **TCP reliability 得以成立**。
- 四次揮手次序（兩邊各自關閉自己方向）：**FIN → ACK → FIN → ACK**。
- **Sequence Number**：session setup 時定 **ISN**，之後按已傳 byte 數遞增；**亂序到嘅 segments 會留住等重排**；**完整收到並重組完成**先交上 application layer。
- **Acknowledgment Number** = 接收端**下一個期望收到嘅 byte**（最後成功收到嘅 byte + 1，累積式）；例：收到 byte 1–5000 → ack = **5001**。
### 16.6 六個 Control Bits

| Flag | 意思 |
|---|---|
| **URG** | Urgent pointer field significant |
| **ACK** | 確認 flag（用於連線建立同 session 終止） |
| **PSH** | Push function |
| **RST** | 發生錯誤或 timeout 時 reset 連線 |
| **SYN** | synchronize sequence numbers（建立連線） |
| **FIN** | 發送方冇更多數據（終止 session） |

- 由左至右口訣：**URG ACK PSH RST SYN FIN**。
### 16.7 重傳、SACK、壅塞避免同 Flow Control

- **Retransmission**：TCP 為**未經確認嘅數據**重傳 segments（"No matter how well designed a network is, data loss occasionally occurs."）。
- **SACK（Selective Acknowledgment）**：**喺三次交握期間協商**；接收方可明確指出邊啲 segments（**包括唔連續嘅**）已收到，發送方只需重傳真正缺失嗰幾段。
- **Congestion**：過載 router 會**丟棄封包**；TCP 用 **congestion handling mechanisms、timers、algorithms** 避免同控制 → sender 縮細 send window、減慢傳送。
- **Window size** = 等 ACK 之前可送幾多 bytes；**MSS** = 每個 TCP segment 最多可攜帶嘅數據量；**Send Window** = 未收 ACK 前可送出嘅**最後一個 byte**。
- Flow control 定義：**"the amount of data that the destination can receive and process reliably."**
- Slide 39 例（**最後可送 byte 編號**）：Initial Window = **10000**、MSS = **1460**；收 2 segments → ACK **2921** → Send Window **12920**；再收 1 → ACK **4381** → Send Window **14380**。另一寫法（**剩餘 byte 數**）：10000 − 2×1460 = **7080**，再 − 1460 = **5620**。
### 16.8 英文記憶句

- "The transport layer provides logical communications between applications running on different hosts."
- "TCP is a connection-oriented protocol that establishes a session before forwarding any traffic."
- "UDP is a connectionless, best-effort protocol with very little overhead and data checking."
- "A socket is a combination of the Transport layer port number and Network layer IP address."
- "The three-way handshake is SYN, SYN, ACK, and ACK."
- "TCP session termination uses four steps: FIN, ACK, FIN, ACK."
- "The acknowledgement number indicates the next byte expected by the receiver."
- "Well-known ports are 0 to 1,023; registered ports are 1,024 to 49,151 and private ports are 49,152 to 65,535."

---

## Part 17 — L10: Application Layer（應用層協定深入）
### 17.1 OSI 上三層分工（application／presentation／session）

| OSI 層 | 職責 |
|---|---|
| 7 Application | **closest to the end user**；喺 source 同 destination 嘅**程式之間**交換資料 |
| 6 Presentation | **Format**（轉成兼容格式）／**Compress**／**Encrypt** |
| 5 Session | **Create & maintain dialogs**；initiate、keep active、**restart disrupted or idle sessions** |

- TCP/IP Application Layer = OSI **5 ＋ 6 ＋ 7** 合併成一層。
- 兼容性鐵律：protocol 要喺 **source 同 destination 兩邊都實作**且 **compatible** 先可以通訊。
- 分類速記：**Layer 7 = 協定**（DHCP／DNS／HTTP…）；**Layer 6 = 資料格式標準**（GIF／JPEG／MPEG）。
### 17.2 三種架構（client-server vs P2P）

| 特徵 | Client-Server | P2P Network | P2P Application |
|---|---|---|---|
| 專用伺服器 | 有 | 無 | 無 |
| 角色設定 | 固定 | **per request basis** | 軟件決定 |
| User interface | — | — | 需要 |
| Background service | — | — | 需要 |
| 例子 | DNS 查詢、ISP email service | 同事部 PC 掛住嘅 printer | BitTorrent、Direct Connect、eDonkey、Freenet |

- **Gnutella** = 用戶之間分享**完整檔案（whole files）**；**BitTorrent** = 同時分享**好多檔案嘅碎片（pieces of many files）**。
- Client-Server：application layer protocol **定義 request／response 嘅格式**。
### 17.3 URL 三部分 ＋ 開網頁五步

- URL 三部分：**scheme（http）／server name（www.cisco.com）／specific file name（index.html）**。
- 五步：① browser 解讀 URL → ② 問 **name server** 把 www.cisco.com 轉成 **numeric address** → ③ 發 **HTTP GET** 要求 index.html → ④ server 回 **HTML code** → ⑤ browser **deciphers HTML 並 formats** 個頁面。
### 17.4 Email：SMTP／POP／IMAP

| 協定 | 角色 | 原件去向 | Port（TCP） |
|---|---|---|---|
| **SMTP** | 寄出／server 對 server 轉送 | —（負責推） | 25 |
| **POP3** | 收信 | download 後 **server 上刪除** | 110 |
| **IMAP** | 收信 | download 副本，**原件留在 server** | 143 |

- 架構鐵律：**email client 唔會直接同另一個 email client 通訊**；兩個 client 都靠 **mail server** transport messages，mail servers 之間互相 transport messages **from one domain to another**。
- SMTP message = **header ＋ body**；body 可以係任何數量嘅文字，但 header **必須有格式正確嘅 recipient address 同 sender address**。
- 揀邊個：server 儲存空間有限 → **POP**；要喺唔同地點睇返同一批郵件 → **IMAP**。
### 17.5 DNS：作用、訊息、階層

| 項目 | 內容 |
|---|---|
| 作用 | **dynamic translation of a domain name into the correct IP address** |
| Message sections | **Header、Question、Answer、Authority、Additional** |
| Record types | **A（IPv4）、AAAA（IPv6）、NS（authoritative name server）、MX（mail exchange server）、CNAME（alias）** |
| Hierarchy | 每個 server 只管一小部分 name-to-IP mappings，唔屬自己 zone 嘅查詢 **forward** 去其他 servers |
| TLD | 代表**組織類型或來源國家**：**.com** business、**.org** non-profit、**.au** Australia、**.co** Colombia |

- Resolve 流程：**先查自己 records** → 解唔到 → **聯絡其他 servers** → **暫時 cache** 個 IP。
- 指令：**`nslookup`** = 手動發 DNS query ＋ 排查 name resolution；**`ipconfig /displaydns`** = 顯示 Windows PC 上所有 cached DNS entries。
### 17.6 DHCP：DORA、Port、Lease

- Port：**server 67／client 68**（UDP）；自動派 **IP address、subnet mask、default gateway、DNS server**。
- **DORA**：**D**iscover（client 廣播搵 server）→ **O**ffer（suggested lease）→ **R**equest（client 指明想用邊個 offer）→ **A**cknowledge（lease **finalized**）。
- 失效：原本 offer 唔再有效 → server 回 **DHCPNAK**；地址有 **lease（租期）**，唔係永久擁有。
- **DHCPv6 四個訊息**：**SOLICIT、ADVERTISE、INFORMATION REQUEST、REPLY**。
- 用邊個：**end user devices 用 DHCP**；**gateways／switches／servers／printers 用 static addressing**（要固定地址先搵得到）。
### 17.7 FTP 同 SMB

- **FTP**：**reliable、connection-oriented、acknowledged**；**第一條連接 TCP 21 = control traffic**、**第二條連接 TCP 20 = actual data transfer**（先控制、後資料）；client 可 **pull（download）／push（upload）**。
- **TFTP**：**connectionless**、UDP **69**；**SMB**：**client/server file sharing protocol**，Microsoft networking 嘅 **mainstay**、**long-term connection**，資源如本機一樣。
- SMB messages **三個功能**：① **start／authenticate／terminate sessions**；② **control file and printer access**；③ **allow an application to send or receive messages to or from another device**。
### 17.8 英文記憶句

- "The upper three layers of the OSI model (application, presentation, and session) define functions of the single TCP/IP application layer."
- "The presentation layer formats, compresses and encrypts data at the source device."
- "The session layer creates and maintains dialogs and restarts disrupted or idle sessions."
- "No dedicated server is required in a peer-to-peer network; each device can act as both a server and a client on a per request basis."
- "With POP email is downloaded and then deleted on the server; with IMAP the original messages are stored on the server."
- "The DNS protocol allows for the dynamic translation of a domain name into the correct IP address."
- "DHCP is DORA: Discover finds the server, Offer suggests a lease, Request identifies it, and Acknowledge confirms it."
- "FTP uses TCP port 21 for control traffic and TCP port 20 for the actual data transfer."
- "SMB is a client/server file sharing protocol whose file-sharing and print services are the mainstay of Microsoft networking."


## Cisco IOS 指令速查（Packet Tracer 實作必備）

> 指令逐字取自 ITE3102 PT0–PT11 CodeGuide 及原始 PT 教材（`01_Raw_Materials/PacketTracer` 內 .docx／.txt），冇自行改寫語法。

### A. 設備基本設定（來源：PT6／PT11 CodeGuide、RouterConfig_supp.txt、PT6.1 Router configuration.txt）

| 目的 | 指令 |
|------|------|
| 入 privileged EXEC mode | `enable`（簡寫 `en`） |
| 入 global configuration mode | `configure terminal`（簡寫 `conf t`） |
| 改裝置名 | `hostname R1` |
| 離開當前 mode／返 privileged EXEC | `exit`；`end`（等同 `Ctrl-Z`） |
| 儲存設定到 NVRAM | `copy running-config startup-config`（簡寫 `copy run start`） |
| 喺 (config)# 內執行特權指令 | `do copy running-conf startup-conf` |

登入流程：`R1>` → `enable` → 輸入 privileged EXEC password `class` → 到 `R1#`（PT6.1 教材：console password = `cisco`）。

`line console 0`／`password`／`login`／`banner`／`service password-encryption` 設定指令：所有源頭筆記都冇提供（源頭筆記未提及）。

### B. Interface 與 IPv4／IPv6 定址（來源：PT0／PT6／PT11 CodeGuide、RouterConfig_supp.txt）

| 目的 | 指令 |
|------|------|
| 入 LAN／WAN interface | `interface gigabitethernet 0/0`（簡寫 `int g0/0`）；`interface serial 0/0/0` |
| 設 IPv4 + subnet mask | `ip address 192.168.10.1 255.255.255.0`（簡寫 `ip addr ...`） |
| 啟動／關閉 interface | `no shutdown`／`shutdown` |
| 加介面備註 | `description LAN connection to S1`（簡寫 `desc interface Gi0/0`） |
| DCE 端設 clocking | `clock rate 128000` |

完整 interface 設定流程：

```text
R1# configure terminal
R1(config)# interface gigabitethernet 0/0
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# description LAN connection to S1
R1(config-if)# no shutdown
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up
R1(config-if)# end
```

Serial WAN 流程（PT11）：`interface serial 0/0/0` → `ip address 192.168.100.129 255.255.255.224` → `clock rate 128000` → `no shutdown`。

IPv6 定址指令：所有 PT CodeGuide 及原始 .docx 教材都冇（源頭筆記未提及）。

### C. Switch／VLAN 設定（來源：PT11 CodeGuide 附錄、PT5 CodeGuide）

| 目的 | 指令 |
|------|------|
| 入 switch 管理介面 | `interface vlan 1` |
| 設 switch 管理 IP | `ip address 192.168.100.2 255.255.255.224` |
| 啟動 VLAN 1 介面 | `no shutdown` |
| 設 switch default gateway | `ip default-gateway 192.168.100.1` |
| 睇 switch 學到嘅 MAC | `show mac-address-table` |

### D. 靜態路由與預設閘道（來源：PT11 CodeGuide 附錄）

| 目的 | 做法 |
|------|------|
| PC 設 default gateway | Desktop → IP Configuration，Default Gateway 填該 LAN 嘅 router 介面 IP |
| Switch 設 default gateway | `ip default-gateway 192.168.100.1` |
| 動態路由（PT11 已預設） | `router rip` → `network 192.168.100.0` → `version 2`（可選） |

靜態路由指令（來源：`Lecture6_NetworkLayer.pptx` — Lecture 6 Network Layer 講義）：
- `ip route <network> <mask> {next-hop-ip | exit-intf}` — 為指定網絡設 static route。例：`R2(config)# ip route 192.168.10.0 255.255.255.0 s0/0/0`（用出口介面）；`R2(config)# ip route 192.168.11.0 255.255.255.0 209.165.200.225`（用 next-hop router IP）。
- `ip route 0.0.0.0 0.0.0.0 {exit-intf | next-hop-ip}` — default static route（所有未知目的地）。例：`R1(config)# ip route 0.0.0.0 0.0.0.0 Serial0/0/0`。
Routing table 代碼：`C` = Connected、`L` = Local、`O` = OSPF、`S` = Static、`R` = RIP、`D` = EIGRP。

> ⚠️ 註：本節舊版寫住「靜態路由指令所有源頭筆記都冇」——當時只有 Packet Tracer CodeGuide 作來源。Lecture 6 講義（`ITE3102_L6_NetworkLayer_StudyGuide.md` §3.x）已經明確示範上述指令，故已更正。

### E. 驗証／排錯指令（來源：PT4／PT5／PT6／PT9／PT10 CodeGuide）

| 目的 | 指令 |
|------|------|
| 介面快速總覽／完整統計 | `show ip interface brief`；`show interfaces`（IP／MAC／bandwidth／errors） |
| 只睇單一介面 | `show interfaces serial 0/0/0`；`show interfaces gigabitethernet 0/0`（PT4.2 寫法用 `show interface`） |
| 睇介面 description | `show interfaces description` |
| 睇 routing table | `show ip route` |
| 睇 running configuration | `show running-config`／`show running-configuration` |
| 睇 hostname 對應表／DHCP 派發記錄 | `show hosts`；`show ip dhcp binding` |
| 測連通／追蹤路徑／睇本機設定 | `ping 192.168.10.10`；`tracert 192.168.100.126`；`ipconfig`／`ipconfig /all`；`netstat -n` |

`ping` 輸出符號：`!` = 有回覆；`.` = timeout；`U` = destination unreachable；`?` = 其他錯誤。

`show ip interface brief` 讀表：`up/up` = 連通；`up/down` = 對端冇設備；`down/down` = shutdown 或未接線；`administratively down` = 未打 `no shutdown`。Bandwidth：GigabitEthernet = `1000000 Kbit`；Serial = `1544 Kbit`。

### F. ARP 相關（來源：PT5／PT0 CodeGuide）

```text
arp -d                          ! 清空 ARP table
arp -a                          ! 顯示 ARP table（IP ↔ MAC 對應）
show arp                        ! Router 嘅 ARP cache；Switch 要改用 show mac-address-table
show mac-address-table          ! Switch 學到嘅 MAC ↔ port 對應
ping -t 172.16.31.3             ! 不停 ping（Ctrl+C 停止）；ping 172.16.31.3 -n 1 = 只 ping 一次
```

ARP request = broadcast（destination MAC 係 `FFFF.FFFF.FFFF`）；ARP reply = unicast。remote 通訊時主機 ARP 嘅係 default gateway（唔係目的地 IP）。

### G. TCP／UDP 觀察（來源：PT9／PT10_WebEmail CodeGuide）

```text
ping -n 1 192.168.1.255       ! ping broadcast，令 LAN 所有設備回應、填滿 ARP tables
ftp 192.168.1.254             ! 建立 FTP 連線（TCP port 21）
nslookup multiserver.pt.ptu   ! DNS 查詢（UDP port 53）
netstat -n                    ! 睇本機 active TCP/UDP connections 同 port numbers
```

Simulation 步驟：Reset Simulation → Edit Filters → Show All/None → 淨揀要睇嘅 protocol（如 HTTP + TCP、DNS + UDP）→ Capture/Forward → 撳 PDU → Outbound／Inbound PDU Details；每個 Part 開始前都要 Reset。

Well-known ports 必背：HTTP = TCP 80、HTTPS = TCP 443、FTP = TCP 21、DNS = UDP 53、SMTP = TCP 25、POP3 = TCP 110。

TCP = connection-oriented／reliable（three-way handshake SYN → SYN-ACK → ACK）；UDP = connectionless／unreliable（冇序號同確認欄位）。6 個 TCP flags 順序：URG ACK PSH RST SYN FIN。Inbound PDU 嘅 SRC／DEST port 會對調。

### H. DNS／DHCP／HTTP／Email／FTP 服務設定（來源：PT10_DNS_DHCP／PT10_FTP／PT10_WebEmail CodeGuide）

Server 端全部喺 **Services** tab；PC 端全部喺 **Desktop** tab（DHCP client 喺 Desktop > IP Configuration 撳 `DHCP` 或揀 Static）。

| 服務 | 位置 | 要設定嘅值（教材值） |
|------|------|---------------------|
| HTTP／HTTPS | Services > HTTP | 撳 `On`（兩個都要開） |
| Email | Services > EMAIL | 開 SMTP + POP3；Domain = `centralserver.pt.pka`；用戶 `central-user`／`cisco` |
| DNS | Services > DNS | A Record：`centralserver.pt.pka` → 10.10.10.2；`branchserver.pt.pka` → 64.100.200.1 |
| FTP | Services > FTP | 撳 `On`；加 `anonymous`／`anonymous`（Read and List）、`administrator`／`cisco`（full permission）；Remove 預設 `cisco` 帳號 |
| DHCP（家用 router） | WRS 嘅 GUI tab | IP = 192.168.0.1、mask = 255.255.255.0、Enable DHCP Server、Static DNS 1 = 64.100.8.8，最後一定要 Save Settings |

Router 做 DHCP／DNS 嘅 IOS 對應指令：

```text
ip dhcp pool LAN
network 192.168.0.0 255.255.255.0
default-router 192.168.0.1
dns-server 64.100.8.8
ip dhcp excluded-address 192.168.0.1 192.168.0.10
show ip dhcp binding
ip domain-lookup
ip name-server 10.10.10.2
ip host centralserver.pt.pka 10.10.10.2
ip dns server
show hosts
```

FTP client（PC Command Prompt）：`ftp centralserver.pt.pka` → 登入 → `dir` → `put README.txt`（上傳）／`get README.txt`（下載）→ `quit`。

### I. Subnetting 練習步驟（來源：PT11 CodeGuide）

題目：將 `192.168.100.0/24` 分割，每個 LAN 最少 25 個地址，另加 1 條 R1↔R2 WAN link。

1. 數 subnet：4 LAN + 1 WAN = **5 個**
2. Borrow bits：`2^n ≥ 5` → `2^2 = 4` 唔夠、`2^3 = 8` 夠 → borrow **3 bits**
3. `2^3 = 8` 個 subnet；剩 5 個 host bits → `2^5 − 2 = 30` usable hosts（≥ 25 ✓）
4. 首五個 network：`.0` / `.32` / `.64` / `.96` / `.128`（subnet bits 000→001→010→011→100；increment = 32）
5. 新 subnet mask：`11111111.11111111.11111111.11100000` = **255.255.255.224（/27）**
6. Subnet Table：first usable = network + 1；last usable = broadcast − 1；broadcast = 下一個 network − 1（例：Subnet 0 = .1–.30，broadcast .31；Subnet 4 = .129–.158，broadcast .159）
7. 分配：Subnet 0 → R1 G0/0；Subnet 1 → R1 G0/1；Subnet 2 → R2 G0/0；Subnet 3 → R2 G0/1；Subnet 4 → WAN link
8. Addressing Table 規則：R1 攞每個 subnet 第一個 usable；R2 LAN 攞第一個、WAN 攞最後一個；switch 攞第二個；PC 攞最後一個；gateway = 該 subnet 嘅 router 介面 IP
9. CLI 設定：流程同 B 節（`enable` → `configure terminal` → `interface ...` → `ip address <IP> 255.255.255.224` → `no shutdown` → `end` → `copy running-config startup-config`）；R1 G0/0 = 192.168.100.1、G0/1 = 192.168.100.33、S0/0/0 = 192.168.100.129；R2 G0/0 = 192.168.100.65、G0/1 = 192.168.100.97、S0/0/0 = 192.168.100.158
10. 驗證：PC1／PC4 順序 ping gateway → 同 subnet host → 跨 subnet host → WAN 對端，全部要有 reply

（PT0／PT4 嘅 GUI 操作：揀裝置型號放置、[Connections] Auto Connection、[Check Results] ➔ [Assessment Items] 睇分、纜線類型自己揀、`Shift+P`／`Shift+L` 切換實體／邏輯工作區。）

### J. IPv6 定址設定（來源：ITE3102_L8_IPv6Addressing_StudyGuide.md）

IPv6 指令同 IPv4 幾乎一樣，**只需把 `ip` 換成 `ipv6`**：

```text
R1(config)# interface gigabitethernet 0/0/0
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64     ! 靜態 GUA（/64）
R1(config-if)# ipv6 address fe80::1:1 link-local      ! 靜態 LLA（同一條 link 內必須唯一）
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# ipv6 unicast-routing                       ! Router 轉發 IPv6 必需（L8 guide 標明：講義未列出，實務需要）
```

| 目的 | 做法 |
|---|---|
| 設靜態 GUA | `ipv6 address 2001:db8:acad:1::1/64`（介面模式） |
| 設靜態 LLA | `ipv6 address fe80::1:1 link-local`（介面模式） |
| 啟用 Router 轉發 | `ipv6 unicast-routing`（全域模式） |
| Windows 檢查 | `ipconfig` → 睇 IPv6 Address（GUA）、Link-local IPv6 Address、Default Gateway |

- Windows **best practice**：Default Gateway 填 Router 嘅 **LLA**（用 SLAAC／DHCPv6 時會自動設定，通常顯示 `fe80::1`）

## Packet Tracer 常見 Error 與 Fix

| Error Message／現象 | 原因 | Fix |
|---------------------|------|-----|
| `% Invalid input detected at '^' marker`／`% Incomplete command`／`% Ambiguous command` | 指令打錯或喺錯嘅 mode 打；欠參數；簡寫太短撞名 | 檢查 prompt（`>`／`#`／`(config)#`／`(config-if)#`）；打 `?` 睇可用指令；`ip address` 一定要跟 IP + mask；用完整指令 |
| Interface 顯示 `administratively down`／`down/down`／`up/down`；`Serial0/0/0 is down` | 未打 `no shutdown`；對端冇設備／冇接線；DCE 端冇 `clock rate` | 入 interface 打 `no shutdown`；DCE 端打 `clock rate 128000`；`up/down` 接啱纜線後會變 `up/up`（正常現象） |
| `Cannot add a module when the power is on`／插錯模組 | 該款 router 嘅接口唔係 hot-swappable；揀錯模組型號 | 㩒 power switch 熄機 → 拖模組入空 slot → 再開機；插錯就拖落右下角佢嘅圖片移除 |
| 纜線 link light 唔著／唔變綠；Router0 同 netacad.pka 之間用直通線唔通 | 揀錯纜線類型或揀錯接口；兩部都係 DTE，冇 autosensing NIC | Router↔Switch、Switch↔PC 用 Copper Straight-Through；Router↔PC、Switch↔Switch 用 Copper Cross-Over；WAN 用 Serial 線 |
| Console 線燈變黑色；燈 amber 變綠好慢；PT4.2 接啱都冇燈 | 黑燈 = 正常（Console 只做管理）；慢 = STP 收斂中；PT4.2 故意 disabled link lights | 唔使修；等幾秒；PT4.2 靠 score 判斷而唔係靠燈 |
| `ping` 全部 `.`（timeout）／`Request timed out`／`Destination host unreachable`（連 gateway 都唔通） | Interface 未啟動、IP／gateway 打錯、線路未通、冇 route 去目的地 | 入 interface 打 `no shutdown`；`ipconfig` 對照 Addressing Table 檢查 `ip address` 同 default gateway；remote 網段一定要有 default gateway，同網段 mask 要一致 |
| 第一粒 ping `.` 之後先通（first ping lost） | 正常 ARP 程序：首次要先用 ARP 解析 MAC address | 唔使 Fix，再 ping 一次就全 `!`；答題講得出「first ping lost」就加分 |
| `arp -a` 顯示 `No ARP entries found`／得 1–2 條；`show mac-address-table` 冇 entries；喺 switch 打 `show arp` 無反應 | ARP cache 空或未產生過 traffic；L2 switch 冇 ARP cache | 先 ping 目標設備產生 traffic；Switch 用 `show mac-address-table`，`show arp` 係 router 指令 |
| Simulation mode 見唔到 PDU／撳 Capture/Forward 冇新 PDU／ICMP PDU「消失咗」 | 未清 ARP cache；未開 Simulation mode；traffic 行完；ICMP 等緊 ARP reply | 打 `arp -d` 清 cache；確認右下角係 Simulation 模式；撳 Reset Simulation 重新產生 traffic；ICMP 消失係正常，繼續撳 Capture/Forward |
| 一個 switch port 出現兩個 MAC | 兩個無線設備經同一 AP／port 接入 | 唔使修；答題時解釋因為設備經同一 port 連入（正常現象） |
| 教材寫 `Router0 Gg0/0` | 教材 XML 轉換 typo，實際係 `G0/0` | 睇 MAC table 時用 G0/0 |
| HTTP PDU 好耐先出現 | 唔係 error！TCP 係 connection-oriented，要先完成 three-way handshake | 繼續撳 Capture/Forward，先見 TCP PDU，之後先到 HTTP PDU |
| Client 撳 DHCP 之後攞唔到 IP（保持 0.0.0.0／空白） | WRS 未 Enable DHCP server、IP／mask 設錯、設定冇 Save | 檢查 WRS：DHCP Server = Enable、IP = 192.168.0.1、mask = 255.255.255.0，確認撳咗 Save Settings |
| `nslookup` 出現 `can't find ... Non-existent domain`；用 hostname 開唔到網頁但用 IP 開到；`ping 64.100.8.8` timeout | DNS 解析失敗（記錄錯／hostname 打錯／client DNS 地址唔啱）；WRS 未 Save；Internet cloud／DNS server 問題 | 檢查 famous.dns.pka 兩條 A record；`ipconfig /all` 確認 DNS Servers = 64.100.8.8；試 `ping 10.10.10.2` 分辨 DNS 定路由問題 |
| `Receive Mail Success` 冇出現 | SMTP／POP3 未開、domain 唔啱、用戶名／密碼錯、Mail Server IP 填錯 | Services > EMAIL 兩個都 On；domain 要 match；Mail Server IP = 10.10.10.2（PC3）／172.16.0.3（Sales） |
| `%Error ftp://... (No such file or directory Or Permission denied)` + `550-Requested action not taken. permission denied` | anonymous 帳號冇寫入權限，只限 Read and List | 用 administrator 帳號（full permission）上傳；或喺 Services > FTP > User Setup 調整權限 |
| FTP 連接等好耐（最多 30 秒）／登入失敗／`dir` 見唔到 README.txt／改動 README.txt 之後冇分 | 首次建 FTP 連線較慢；帳號密碼錯或未建立；連錯伺服器；文件內容被修改 | 等 30 秒屬正常；檢查 User Setup 帳號；確認 `ftp` 主機名稱啱唔啱再重新 `put`；唔好改 README.txt |
| 兩個介面用咗同一個 subnet（overlapping）／用咗舊 mask `255.255.255.0`／用咗 `.31`、`.63`；`show ip route` 冇 `O` 路由／remote ping 唔到 | 冇跟 Subnet Table 分配；唔記得借位後 mask 要改 /27；攞錯 broadcast／network address；對方 router 介面未設定／RIP 未生效 | 跟返 Subnet 0–4 分配；全網絡統一用 `255.255.255.224`（/27）；只用 network+1 至 broadcast−1；確認所有介面 up/up，必要時重設 `router rip` + `network 192.168.100.0` |
| 設定冇咗（重開機後消失） | 冇儲存到 NVRAM | 打 `copy running-config startup-config` |
| Laptop／TabletPC 連唔到 Wi-Fi；兩個無線介面同時開；Ping PC 通但 ping switch 唔通 | Wireless0 嘅 Port Status 未剔 On；兩個無線介面同時 active；Switch 冇設定 IP（PT6 教材預期行為） | Config tab → Wireless0 → 剔 On；只開一個介面；ping switch 唔通係預期行為，唔使理 |
| Check Results／分數見到紅色項目唔升 | 有裝置未放置、型號錯、連接未齊，或對應 Part 未完成 | 睇 Assessment Items 每項描述，逐項修正後再撳 Check Results，直至全部過 |

---

## 英文極速記憶句（跨課高頻精選）

（每句都直接出自源頭 Study Guide／題解嘅英文標準句；考場可直接默寫。）

| 英文句（背誦用） | 繁中一句解說 |
|---|---|
| "IPv4 = 32 bits = 4 octets; IPv6 = 128 bits = 32 hex digits = 8 hextets." | 兩個地址長度同表示法——必背數字。 |
| "Every 4 bits is represented by a single hexadecimal digit." | hex ↔ binary 一步互換（nibble）。 |
| "The internet is not owned by any individual or group." | Internet 無單一擁有者。 |
| "Intermediary devices interconnect end devices and regenerate and retransmit data signals." | 中介裝置嘅角色。 |
| "Fault tolerance ensures the network is always available by allowing data to travel through more than one route." | FSSS 之 F 嘅標準定義。 |
| "QoS implements priority queues when demand for network bandwidth exceeds supply." | QoS 用優先佇列處理擠塞。 |
| "Confidentiality means only the intended and authorized recipients can access and read the data." | Confidentiality 嘅定義。 |
| "Integrity ensures information has not been altered in transmission, from origin to destination." | Integrity 嘅定義。 |
| "The OSI model is a conceptual framework that standardizes network communication into seven layers." | OSI 7 層嘅定位。 |
| "The TCP/IP model has four layers: Application, Transport, Internet, and Network Access." | TCP/IP 4 層嘅層名。 |
| "Path determination and logical addressing are performed by the Network layer." | 功能 → 層嘅必殺關鍵字。 |
| "During encapsulation, data becomes a segment, then a packet, then a frame, then bits." | 封裝向下、逐層加 header。 |
| "Unicast is one-to-one, multicast is one-to-many, and broadcast is one-to-all." | 三種投遞方式配對。 |
| "Bandwidth is the capacity of a medium to carry raw data in a given period of time." | Bandwidth 定義（理論上限）。 |
| "Use straight-through for unlike devices and crossover for like devices." | 電纜選用規則。 |
| "In half-duplex, a device can send or receive, but not both at the same time." | Half-duplex 嘅關鍵詞。 |
| "The LLC sublayer communicates with the network layer; the MAC sublayer provides addressing and media access." | 兩個子層分工。 |
| "ARP resolves an IPv4 address to a MAC address on a local network." | ARP 嘅一句定義。 |
| "A switch learns the source MAC address and its incoming port." | Switch 學習規則（睇 Source）。 |
| "MAC addresses change at every hop, but IP addresses remain the same end-to-end." | 全科最常考嘅黃金定律。 |
| "A MAC address is a 48-bit value expressed as 12 hexadecimal digits." | MAC 結構必背數字。 |
| "An ARP request uses the broadcast destination MAC FF-FF-FF-FF-FF-FF." | ARP Request 一定係廣播。 |
| "In an ARP spoofing attack, hosts map the target IP address to the MAC address of the malicious host." | ARP Spoofing 原理。 |
| "IP is connectionless, best effort and media independent." | Network Layer 三大特性。 |
| "A router uses the longest match — the most specific route — when forwarding." | Router 揀路由嘅規則。 |
| "The network address is obtained by ANDing the IP address with the subnet mask." | Network Address 計法。 |
| "The number of usable hosts per subnet is 2 to the power of the host bits minus 2." | 萬能 Host 公式。 |
| "The block size is 256 minus the last non-zero octet of the subnet mask." | 排 subnet 邊界嘅方法。 |
| "According to RFC 1918, 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 are private addresses." | 三個私網範圍。 |
| "Every IPv6-enabled interface must have a link-local address (FE80::/10)." | LLA 係強制嘅。 |
| "A double colon can only be used once within an address." | 壓縮規則重點。 |
| "EUI-64 inserts fffe into the middle of the MAC address and reverses the 7th bit." | EUI-64 兩步。 |
| "Tunneling encapsulates the IPv6 packet inside an IPv4 packet." | 過渡技術之一。 |
| "TCP is a connection-oriented, reliable protocol; UDP is connectionless and best-effort." | 傳輸層兩大協議定位。 |
| "A socket is the combination of an IP address and a port number." | Socket 嘅組成。 |
| "The acknowledgment number represents the sequence number of the next byte expected by the receiver." | ACK 嘅意思（+1 規則）。 |
| "The send window shrinks as data is sent and slides forward when an acknowledgement is received." | 滑動視窗機制。 |
| "FTP uses TCP port 21 for the control connection and port 20 for the data connection." | FTP 兩條連接。 |
| "The DHCP process is DORA: Discover, Offer, Request, Acknowledge." | DHCP 四步。 |
| "The advantage of HTTPS over HTTP is that HTTPS uses SSL/TLS and encryption to secure data." | HTTPS 相對 HTTP 嘅優勢。 |

---

## 最後 60 秒自測清單

- [ ] P1：能心算 192／168／200／215／240 嘅 binary 同 hex，並講出 1 hex digit = 4 bits
- [ ] P1：能講出 IPv4（32 bits／4 octets）同 IPv6（128 bits／8 hextets／32 hex digits）
- [ ] P1：能講出寫 IPv4 binary 時必須保留 leading zeros（5 = 00000101）
- [ ] P2：能列出三大網絡組件同各自嘅一句功能（interface／regenerate and retransmit／channel）
- [ ] P2：能講出 LAN vs WAN 嘅分別（small vs wide geographical area）
- [ ] P2：能背出四大架構要求 FSSS 同各自嘅招牌關鍵字（more than one route／standards／priority queues／protected）
- [ ] P2：能分辨 Internet／Intranet／Extranet，並講出 CIA 三要素
- [ ] P3：能由頂至底背出 OSI 7 層同 TCP/IP 4 層，並講出兩者嘅合併關係
- [ ] P3：能把 HTTP／DNS／SMTP／TCP／UDP／IP／ICMP／Ethernet 歸入正確層
- [ ] P3：能答「frames／path determination／encryption／end-to-end／dialogue／best path」各屬邊層
- [ ] P3：能背出五個 Protocol Requirements 同 Message Timing 三兄弟
- [ ] P3：能背出 PDU 五個名同封裝／解封兩個方向
- [ ] P3：能講出 Frame 追蹤口訣「MAC 每跳換、IP 永不變」同 local／remote 嘅 Destination MAC 填法
- [ ] P4：能比較 Bandwidth／Throughput／Goodput（理論 ≥ 實際 ≥ 可用）同影響 Throughput 嘅三因素
- [ ] P4：能背出三種媒介嘅訊號，同 Copper vs Fiber 五行對比
- [ ] P4：能講出 Straight-through／Crossover／Rollover 嘅使用時機
- [ ] P4：能列出 WLAN 四宗罪（coverage／interference／security／shared bandwidth）
- [ ] P4：能分辨 LLC 同 MAC 子層嘅功能，同埋 Frame 欄位屬 Header 定 Trailer
- [ ] P5：能講出 ARP 兩個基本功能，同「先查表、冇先問」嘅規則
- [ ] P5：能講出跨網段時 ARP 目標係 Default Gateway 嘅 IP（唔係目的地主機）
- [ ] P5：能講出 Switch「學 Source、查 Destination」三種情況（已知／未知／Broadcast）嘅轉發結果
- [ ] P5：能背出 MAC = 48-bit／12 hex digits／OUI 頭 3 Byte，同 Broadcast MAC = FF-FF-FF-FF-FF-FF
- [ ] P5：能背出 802.3 Frame 欄位順序（Preamble → Dest MAC → Src MAC → Type → Data → FCS）
- [ ] P5：能分辨 Store-and-Forward 同 Cut-Through（CRC 檢查／bandwidth 消耗）
- [ ] P5：能解釋 ARP 嘅效能問題同 ARP Spoofing 嘅攻擊原理
- [ ] P6：能數出一個拓撲有幾個 Broadcast Domain（LANs ＋ Serial Links）
- [ ] P6：能用「Default Gateway = 同 PC 同一網絡嘅 Router 介面」填配置表
- [ ] P6：能由路由表揀出正確 Exit Interface（直接連接 vs 經 Next Hop，Longest Match）
- [ ] P6：能分辨 Local／Remote Host（用 mask 做 AND），並講出 127.0.0.1 係 loopback
- [ ] P6：能講出 IP 三大特性 CL／BE／MI 嘅關鍵詞（connection／guarantee／medium）
- [ ] P6：能配對 IPv6 Header 五個欄位（Version 0110／Traffic Class／Payload Length／Next Header／Hop Limit）
- [ ] P6：能拆 IPv4 Hex（45 = IPv4 + 20 bytes、TTL 64₁₆ = 100、Protocol 11₁₆ = UDP、C0 A8 43 69 = 192.168.67.105）
- [ ] P6：能背出四種記憶體裝咩、開機四步 P-B-I-C、五種 CLI 模式
- [ ] P7：能背出萬能公式（Network = IP AND mask；Broadcast = Network + Block − 1；Host = 2^h − 2）
- [ ] P7：能背出 /24–/30 嘅 Mask／Block Size／可用 Host 對照表
- [ ] P7：能講出三個 RFC 1918 私網範圍（記住 172.32 起就係 Public）同 Multicast 224–239
- [ ] P7：能判斷一個地址係 N／H／B 或 Unicast／Broadcast／Multicast
- [ ] P7：能把 /24 用 /27 切 8 個 subnet，講出 Block Size（32）同可用 Host（30）
- [ ] P7：能判斷兩個地址係咪同一 subnet（AND mask 比較）
- [ ] P7：能計 wasted host addresses 並解釋「prefix 越貼近需求、浪費越少」（VLSM）
- [ ] P8：能把壓縮 IPv6 位址展開成 8 個 hextet 完整格式
- [ ] P8：能講出 `::` 代表幾多個零 hextet／hex 零／binary 零（段 × 16）
- [ ] P8：能背出 GUA／LLA／ULA／Loopback／Unspecified／Multicast 嘅前綴
- [ ] P8：能用三條規則判斷 IPv6 位址合法性（一個 `::`、八組、只限 hex）
- [ ] P8：能用 EUI-64 由 MAC 造出 Interface ID（插 FFFE ＋ 反第 7 bit）
- [ ] P8：能講出三種動態取得 GUA 方法嘅分別（邊個派位址、Gateway 用咩）
- [ ] P8：能講出 Dual Stack／Tunneling／NAT64 嘅分別
- [ ] P8：能算出 /48 ＋ 16-bit Subnet ID 嘅 subnet 數量（65,536）
- [ ] P9：能背出 TCP vs UDP 分別，同 TCP 20 bytes／UDP 8 bytes
- [ ] P9：能講出四個共同欄位（Source Port、Destination Port、Length、Checksum）
- [ ] P9：能背出 IANA 三個 Port 範圍（0–1023／1024–49151／49152–65535）同 Socket 組成
- [ ] P9：能背出三次交握（SYN／SYN+ACK／ACK）同四次揮手（FIN／ACK／FIN／ACK）
- [ ] P9：能用「Ack = 對方 seq + 1」推算 N3／N4／N5
- [ ] P9：能計滑動視窗（10000 − 2×1460 = 7080；再減 1460 = 5620）同講出 congestion control
- [ ] P10：能講出 TCP/IP Application Layer = OSI 5／6／7 層
- [ ] P10：能背出 Port 表（21／20／25／53／69／80／110／143／443）同對應 Transport
- [ ] P10：能分辨 HTTP／HTTPS、FTP／TFTP、POP3／IMAP4、SMTP 推 vs 收
- [ ] P10：能背出 DORA 四步同每步嘅動作（Find／Suggest／Identify／Confirm）
- [ ] P10：能講出 FTP 兩條連接（21 控制、20 資料）同 HTTP GET／POST／PUT 分別
- [ ] P10：能用三步判斷 DNS 情境（設定指對／記錄存在／IP 正確）
- [ ] P10：能分辨 Client-Server／P2P Network／P2P Application 同四個 P2P 特性

*詳細版：`02_Study_Guides/` 內 `ITE3102_L0_NumberSystems_StudyGuide.md`、`ITE3102_T0_Numbers_StudyGuide.md`、`ITE3102_L1_NetworkingToday_StudyGuide.md`、`ITE3102_T1_NetworkToday_StudyGuide.md`、`ITE3102_T3_Models_StudyGuide.md`、`ITE3102_T4_NetworkAccess_StudyGuide.md`、`ITE3102_T5_Ethernet_StudyGuide.md`、`ITE3102_T6_Network_StudyGuide.md`、`ITE3102_T7_IPv4Addressing_StudyGuide.md`、`ITE3102_L8_IPv6Addressing_StudyGuide.md`、`ITE3102_T8_IPv6Addressing_StudyGuide.md`、`ITE3102_T9_Transport_StudyGuide.md`、`ITE3102_T10_Application_StudyGuide.md`*
