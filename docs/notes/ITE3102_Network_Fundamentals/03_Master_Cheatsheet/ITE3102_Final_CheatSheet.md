# ITE3102 Network Fundamentals — Final Cheat Sheet（考前極速總複習）

> **覆蓋範圍**：Lecture 0 Number Systems（Module 5）／ Lecture 1 Networking Today（Module 1）／ T3 Network Models（OSI & TCP/IP）／ T4 Network Access（Physical & Data Link）／ T5 Ethernet（ARP、Switch、Frame）／ T6 Network Layer（Routing、IPv4/IPv6 Header）／ T7 IPv4 Addressing & Subnetting（VLSM）／ T8 & L8 IPv6 Addressing ／ T9 Transport Layer（TCP／UDP）／ T10 Application Layer（HTTP／DNS／DHCP／Email／FTP）
> **使用時機**：考試前 5–10 分鐘快速掃描；只保留「關鍵數字、對比表、英文口訣」。
> 詳細解說請回查：`02_Study_Guides/` 內對應各課的 Study Guide（⚠️ 正確資料夾名係 `02_Study_Guides`，唔好寫錯成任何加咗 AI 字樣嘅變體）
> ⚠️ 本檔只寫「理論」；Packet Tracer 情境、Cisco IOS 指令、Windows 指令速查由另一章負責（緊接本檔之後）。

**速覽目錄**：P1 Number Systems｜P2 Networking Today｜P3 Network Models（OSI／TCP-IP）｜P4 Network Access｜P5 Ethernet｜P6 Network Layer｜P7 IPv4 Addressing & Subnetting｜P8 IPv6 Addressing｜P9 Transport Layer｜P10 Application Layer｜英文極速記憶句｜最後 60 秒自測清單

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

靜態路由指令 `ip route <network> <mask> <next-hop>`：所有源頭筆記都冇（源頭筆記未提及）。Routing table 代碼：`C` = Connected、`O` = OSPF、`S` = Static、`R` = RIP。

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
