# ITE3102 Network Fundamentals — Tutorial 5 雙語練習題解 Guide

**課題：Ethernet（乙太網絡）**

> 本 Guide 對應 Tutorial 5 全部分練習（主練習 Q1–Q5，含 Activity 5216；另附 CCNA1 題組 Q1–Q5）。核心定義一律以英文標準定義句（Standard Definition）呈現，解說用香港繁體中文，方便同學「睇得明、記得熟、考得答」。

---

## 📝 練習概要 (Summary)

Tutorial 5 係「Ethernet」嘅核心課題，集中喺 **Data Link Layer（數據鏈路層）** 嘅實作。練習分兩大範疇：第一，**定址與解析**——ARP（Address Resolution Protocol）點樣將 IP Address 解析成 MAC Address、ARP Table 同 ARP Request / Reply 嘅運作，以及「同一網絡」同「跨網絡」通訊時究竟要 ARP 邊個地址；第二，**交換與封裝**——Switch 嘅 MAC Address Table 點樣學習同轉發（已知 Unicast、未知 Unicast、Broadcast 三種情況）、Ethernet Frame 各欄位（Preamble、Destination MAC、Source MAC、Type、Data、FCS）嘅功能，同埋 Frame 內 MAC 與 IP 地址喺本地／跨網絡通訊中嘅填寫規則。

後半部分（CCNA1 題組）考核三組必背知識：**LLC 與 MAC 兩個子層**嘅分工、**802.3 Ethernet Frame** 欄位配對、**Store-and-Forward 與 Cut-Through** 兩種 Switch 轉發模式嘅分別，以及 MAC Address 結構（48-bit / 12 個 Hexadecimal 數字 / OUI）、ARP 嘅潛在問題同 **ARP Spoofing** 攻擊原理。呢課係理解「封包點樣由一部機去到另一部機」嘅關鍵，考試常見題型係「判斷＋填空＋場景填 Frame 地址」，全部有固定規則可循。

## 🎯 練習目標 (Objectives)

完成本練習後，你應該能夠：

| 能力 (Ability) | 英文對照 (English) |
|---|---|
| 判斷何時需要發送 ARP Request，並解讀 ARP Table | Decide when an ARP request is needed and interpret an ARP table |
| 推演 Switch 學習與轉發邏輯（已知／未知／廣播三種情況） | Trace switch learning and forwarding for known unicast, unknown unicast and broadcast frames |
| 填寫本地通訊與跨網絡通訊嘅 Ethernet Frame 地址（MAC 逐跳改、IP 不變） | Fill in the MAC and IP addresses of an Ethernet frame for local and remote communication |
| 更新 ARP Table 與 Switch MAC Address Table | Update the ARP table and the switch MAC address table after communication |
| 分辨 LLC 與 MAC 子層嘅功能 | Distinguish the functions of the LLC and MAC sublayers |
| 配對 802.3 Ethernet Frame 各欄位嘅功能 | Match each 802.3 Ethernet frame field to its description |
| 分辨 Store-and-Forward 與 Cut-Through 轉發模式 | Differentiate Store-and-Forward and Cut-Through frame forwarding |
| 背誦 MAC Address 結構（48-bit、12 個 Hexadecimal 數字、OUI） | State the MAC address structure: 48-bit value, 12 hexadecimal digits, OUI |
| 指出 ARP 嘅保安問題及解釋 ARP Spoofing | Identify ARP problems and explain ARP spoofing |

---

## ✏️ 題目與答案 Walkthrough

### Part A — 主練習題

---

#### Q1. ARP 與 ARP Table（Host A 嘅 ARP Table）

**題目原文 (Question):**

> Q1. Consider the network below.
> ARP Table Host A:
> Internet Address    Physical Address
> 192.168.0.2            BB:BB:BB:BB:BB:BB
> (a) When host A wants to send an IP packet to host B, will host A need to send an ARP request containing IP address 192.168.0.2?  __________
> (b) When host A wants to send an IP packet to host C, will host A need to send an ARP request containing IP address 192.168.0.3?  __________
> (c) When host A wants to send an IP packet to host D, host A need to send an ARP request containing IP address  ____________________
> (d) Two basic functions of ARP:
> 1.  ___________________ that contains the mapping of IP addresses to physical addresses
> 2. ________________________________________________ via ARP request and ARP reply

**網絡設定（重建）**：Host A、Host B（IP 192.168.0.2）、Host C（IP 192.168.0.3）位於同一 LAN；Host D 位於另一個網絡，Host A 需經 Default Gateway（Router）轉發先到達 D。

**✅ 答案 (Answer):**

- **(a) No（唔需要）**——192.168.0.2 已經喺 Host A 嘅 ARP Table 內，對應 MAC 係 BB:BB:BB:BB:BB:BB。
- **(b) Yes（需要）**——192.168.0.3 唔喺 ARP Table 入面，Host A 要廣播 ARP Request 查「誰係 192.168.0.3？」。
- **(c) 要查 Default Gateway（Router）嘅 IP Address（例：192.168.0.1）**——因為 Host D 喺另一個網絡，Host A 要將 Frame 先送畀 Gateway。
- **(d)** 1. **An ARP table (ARP cache)**（IP 對 Physical Address 嘅對照表）；2. **Dynamic resolution of IP addresses to physical addresses**（透過 ARP Request 同 ARP Reply 動態解析）。

**🧠 答題邏輯 (Reasoning):**

呢條考 ARP 嘅核心規則：**先查表，表冇先發 Request**。ARP Request 係 Broadcast（問「邊個擁有呢個 IP？」），ARP Reply 係 Unicast（由擁有者直接回覆），回覆後 Host A 會將新嘅 IP→MAC 對應寫入 ARP Table 快取。(a) 因為表入面已經有 192.168.0.2 嘅記錄，直接用快取 MAC 封裝 Frame，唔使再廣播；(b) 因為表冇 192.168.0.3，必須發 ARP Request。最易錯係 (c)：**ARP 只可以喺同一 Broadcast Domain 入面運作**，Host D 喺第二個網絡，Host A 根本聽唔到 D 嘅 ARP Reply，所以唔會直接 ARP 去 D 嘅 IP，而係將 Frame 交畀 Default Gateway——因此要解析嘅係 Gateway 嘅 IP。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> ARP resolves an IPv4 address to a MAC address; a host first checks its ARP table and sends an ARP request only when no entry exists. For a destination on a different network, the host sends an ARP request for the default gateway's IP address, because the frame must be delivered to the gateway first.

---

#### Q2. Switch MAC Address Table 學習與轉發（Port 1–4）

**題目原文 (Question):**

> Q2. Consider the LAN with the MAC address table in the switch shown.
> Switch MAC address table
> Port 1: ---        Port 2: 12-34-56-78-9A-BD
> Port 3: ---        Port 4: 12-34-56-78-9A-BF
> Answer each of the following cases independently.
> If PC1 sends a frame addressed to PC3,
>   Switch *will/will not update its MAC address table.
>   Switch will forward the frame out port(s): ____________________
> If PC2 sends a frame addressed to PC4,
>   Switch *will/will not update its MAC address table.
>   Switch will forward the frame out port(s): ____________________
> If PC1 sends a broadcast frame to the switch,
>   Switch *will/will not update its MAC address table.
>   Switch will forward the frame out port(s): ____________________

**網絡設定（重建）**：PC1–PC4 分別接駁 Switch 嘅 Port 1–4。由表中可知 **PC2 嘅 MAC = 12-34-56-78-9A-BD（Port 2）**、**PC4 嘅 MAC = 12-34-56-78-9A-BF（Port 4）**；PC1、PC3 嘅 MAC 尚未被學習。

**✅ 答案 (Answer):**

| 情況 (Case) | 更新 MAC Table？ | 轉發端口 (Forward out) |
|---|---|---|
| PC1 → PC3（未知 Unicast） | **Will update**（學習 PC1 嘅 Source MAC 入 Port 1） | **Ports 2, 3, 4**（PC3 未知 → Flooding） |
| PC2 → PC4（已知 Unicast） | **Will not update**（PC2 已喺 Port 2） | **Port 4 only**（PC4 已知 → 精準轉發） |
| PC1 → Broadcast | **Will update**（學習 PC1 嘅 Source MAC 入 Port 1） | **Ports 2, 3, 4**（Broadcast → 除來源埠外全部） |

**🧠 答題邏輯 (Reasoning):**

記住 Switch 嘅「兩步曲」：**（1）學習（Learn）**——任何 Frame 入嚟，Switch 都會睇 **Source MAC**，將「Source MAC → 入嚟個 Port」寫入 MAC Address Table（如果已經有記錄就唔會再加新 entry）；**（2）轉發（Forward）**——再睇 **Destination MAC**：表入面有 → 只由嗰個 Port 出（Unicast）；表入面冇 → **Flooding**，由除來源 Port 以外嘅所有 Port 出；Destination 係 Broadcast（FF-FF-FF-FF-FF-FF）→ 都係 Flooding。所以 Case 1 因為 PC3 未知而要 flooding；Case 2 因為 PC4 已知只出 Port 4；Case 3 廣播必然 flooding。留意「更新」係指加新 entry，PC2 嘅 MAC 已存在所以 Case 2 唔使更新。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> A switch learns the source MAC address and its incoming port, then forwards the frame based on the destination MAC address: if the destination is known, forward out that port only; if it is unknown or is a broadcast, flood the frame out all ports except the incoming port.

---

#### Q3. Activity 5216 — 六部 Host（經 Hub 接 E、F）嘅 Switch 動作

**題目原文 (Question):**

> Q3. Activity 5216 — Consider 6 hosts with their MAC addresses below:
> PC A: AAAA.0000.1111    PC D: DDDD.0000.7777
> PC B: BBBB.0000.3333    PC E: EEEE.0000.9999
> PC C: CCCC.0000.5555    PC F: FFFF.0000.9999
> The hosts are connected to a switch (with hosts E and F via a hub).
> Switch MAC address table
> Fa1: ___    Fa5: CCCC.0000.5555    Fa9: EEEE.0000.9999
> Fa2: ---    Fa6: ---               Fa10: ---
> Fa3: ___    Fa7: DDDD.0000.7777    Fa11: ---
> Fa4: ---    Fa8: ---               Fa12: ---
> Answer each of the following cases independently.
> What action will the switch take if the following frame received?

**Frame 1（Host B → Host D）：Destination DDDD:0000:7777，Source BBBB:0000:3333**

- **Will update**——Source BBBB.0000.3333 未喺表中，Switch 學習 B 嘅 MAC 入接收 Port。
- **Forward out：Fa7 only**——Destination DDDD.0000.7777 已喺 Fa7，精準轉發。

**Frame 2（Host C → Host A）：Destination AAAA:0000:1111，Source CCCC:0000:5555**

- **Will not update**——Source CCCC.0000.5555 已喺 Fa5，無新 entry 可加。
- **Forward out：Flood（Fa5 以外所有 Port）**——Destination AAAA.0000.1111 未知，要 flooding。

**Frame 3（Host F → Broadcast）：Destination FFFF:FFFF:FFFF，Source FFFF:0000:9999**

- **Will update**——Source FFFF.0000.9999 未喺表中，Switch 學習 F 嘅 MAC 入接收 Port（經 Hub 嗰個 Port，即 Fa9 一段）。
- **Forward out：除接收 Port 外全部（Flood）**——Destination 係 Broadcast（FFFF:FFFF:FFFF），必定 flooding。

**🧠 答題邏輯 (Reasoning):**

呢條係 Q2 嘅升級版，加咗兩個陷阱：**（1）Hub 嘅存在**——E、F 經 Hub 共享同一個 Switch Port（Fa9），Switch 只會喺 Fa9 學到兩者嘅 MAC；Hub 本身係 Layer 1 裝置，會將 Frame 重複畀同一段嘅所有裝置，但呢個唔影響 Switch 嘅學習規則。（2）**Broadcast 判斷**——Destination 全 F（FFFF:FFFF:FFFF）就係 Broadcast Address，Switch 唔理表入面有冇，一律 flooding（除來源 Port 外）。Frame 2 最易錯：好多同學見「表入面無 A」就以為會「更新」，但更新睇嘅係 **Source MAC** 而唔係 Destination MAC——Source C 已經喺表，所以唔更新。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> The switch updates its MAC address table only with the source MAC address of an incoming frame. When the destination MAC address is not in the table, or when the frame is a broadcast, the switch floods the frame out all ports except the port on which it was received.

---

#### Q4\* — 填寫 Ethernet Frame 地址（Local + Remote）

**題目原文 (Question):**

> Q4*. The host settings and router interface settings are:
> | Host | IP Address | MAC Address | Interface | IP Address | MAC Address |
> | PC1 | 192.168.10.8 | 1111.EEEE.1111 | E1 | 192.168.10.1 | EEEE.0000.1111 |
> | PC2 | 192.168.30.8 | 2222.AAAA.2222 | E2 | 192.168.20.1 | EEEE.0000.2222 |
> | PC3 | 192.168.30.9 | 3333.AAAA.3333 | E3 | 192.168.30.1 | EEEE.0000.3333 |
> | PC4 | 192.168.40.8 | 4444.BBBB.4444 | F1 | 192.168.40.1 | FFFF.0000.1111 |
> | PC5 | 192.168.40.9 | 5555.BBBB.5555 | F2 | 192.168.20.2 | FFFF.0000.2222 |
> | PC6 | 192.168.50.8 | 6666.FFFF.6666 | F3 | 192.168.50.1 | FFFF.0000.3333 |
> Local communication: [PC2 is sending a request to PC3] / [PC3 is sending a request to PC2]
> Fill in the addresses for the Ethernet frame that the PC sends out.
> Remote communication: [PC2/PC3] is sending a request to [PC4/PC5] through the switches and routers below.

**網絡拓撲（重建）**：RouterE（E1 = 192.168.10.0/24 段、E2 = 192.168.20.0/24 段、E3 = 192.168.30.0/24 段）與 RouterF（F1 = 192.168.40.0/24 段、F2 = 192.168.20.0/24 段、F3 = 192.168.50.0/24 段）透過 **E2–F2（192.168.20.0/24）** 互連。PC1 屬 E1 段；PC2、PC3 屬 E3 段（Default Gateway = E3）；PC4、PC5 屬 F1 段（Default Gateway = F1）；PC6 屬 F3 段。

**✅ 答案 (Answer):**

**Local（本機通訊）——PC2 傳送畀 PC3：**

| 欄位 (Field) | 答案 (Answer) | 意思 |
|---|---|---|
| A1 Destination MAC | **3333.AAAA.3333** | PC3 嘅 MAC（同段，直接用對方 MAC） |
| A2 Source MAC | **2222.AAAA.2222** | PC2 自己嘅 MAC |
| A3 Source IP | **192.168.30.8** | PC2 自己嘅 IP |
| A4 Destination IP | **192.168.30.9** | PC3 嘅 IP |

**Remote（跨網絡通訊）——以 PC2 傳送畀 PC4 為例：**

**(i) 第一程：PC2 → RouterE（經 SwitchA）**

| 欄位 (Field) | 答案 (Answer) | 意思 |
|---|---|---|
| M1 Destination MAC | **EEEE.0000.3333** | Default Gateway E3 嘅 MAC（Frame 先送去 Router） |
| M2 Source MAC | **2222.AAAA.2222** | PC2 自己嘅 MAC |
| P1 Source IP | **192.168.30.8** | 不變（端到端） |
| P2 Destination IP | **192.168.40.8** | PC4 嘅 IP（不變，端到端） |

**(ii) 第二程：RouterE → RouterF**

| 欄位 (Field) | 答案 (Answer) | 意思 |
|---|---|---|
| M3 Destination MAC | **FFFF.0000.2222** | RouterF 嘅 F2（192.168.20.0/24 段另一端） |
| M4 Source MAC | **EEEE.0000.2222** | RouterE 自己嘅 E2（改用出接口嘅 MAC） |
| P3 Source IP | **192.168.30.8** | 不變 |
| P4 Destination IP | **192.168.40.8** | 不變 |

**(iii) 第三程：RouterF → PC4（經 SwitchB）**

| 欄位 (Field) | 答案 (Answer) | 意思 |
|---|---|---|
| M5 Destination MAC | **4444.BBBB.4444** | PC4 嘅 MAC（到達目的 LAN，直接用對方 MAC） |
| M6 Source MAC | **FFFF.0000.1111** | RouterF 自己嘅 F1（出接口 MAC） |
| P5 Source IP | **192.168.30.8** | 不變 |
| P6 Destination IP | **192.168.40.8** | 不變 |

**🧠 答題邏輯 (Reasoning):**

呢條係全課最重要嘅題型，記住一條黃金定律：**「MAC 逐跳變，IP 全程不變」（MAC addresses change at every hop, but IP addresses stay the same end-to-end）**。本地通訊（同一 IP Subnet）——Destination MAC 直接係對方 Host 嘅 MAC。跨網絡通訊——Host 知道自己同 Destination 唔同網絡，就會將 Frame 嘅 Destination MAC 設為 **Default Gateway** 嘅 MAC（M1），Source MAC 係自己；IP 層面 Source IP / Destination IP 由頭到尾唔變（P1–P6）。到咗 Router 之間嘅一段（192.168.20.0/24），Source MAC 變成 RouterE 出接口 E2、Destination MAC 變成 RouterF 接口 F2（M3、M4）；最後一段由 RouterF 出接口 F1 出發，Destination MAC 係 PC4、Source MAC 係 F1（M5、M6）。答題時只要按「而家 Frame 由邊個出、下一個 hop 係邊個」填 MAC，IP 就照抄最初 PC 嗰兩個值。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> In an Ethernet frame, the source and destination MAC addresses are rewritten at every hop (each router replaces them with the outgoing interface's MAC and the next-hop device's MAC), while the source and destination IP addresses remain unchanged end-to-end. For remote delivery, the host uses the default gateway's MAC address as the frame's destination MAC.

---

#### Q5 — 通訊後更新 ARP Table 與 Switch MAC Address Table

**題目原文 (Question):**

> Q5. Consider the situations in Q4.
> Local communication with PC2 sending to PC3
> Suppose that the ARP table of the PC is empty. Write down its contents after the communication.
> Internet Address    Physical Address
> Remote communication with PC3 sending to PC4
> (i) For the first journey to RouterE
> Suppose that the ARP table of the PC is empty. Write down its contents after the communication.
> Suppose that the MAC address table of Switch A is shown below, update (if needed) its contents after processing the frame.
> Fa1: ---  Fa5: ---   Fa8: EEEE.0000.3333 ...
> Switch A will forward the frame out port(s): ____________________
> (ii) For the third journey from RouterF to Destination
> Suppose that the MAC address table of Switch B is shown below, update (if needed) its contents after processing the frame.
> Fa1: ---  Fa8: FFFF.0000.1111 ...
> Switch B will forward the frame out port(s): ____________________

**✅ 答案 (Answer):**

**Local——PC2 → PC3 通訊後，PC2 嘅 ARP Table（原先空白）：**

| Internet Address | Physical Address |
|---|---|
| **192.168.30.9** | **3333.AAAA.3333** |

（PC2 為咗搵 PC3 嘅 MAC，發 ARP Request 後收到 PC3 嘅 ARP Reply，將對應寫入快取。）

**Remote (i)——PC3 → PC4 第一程後，PC3 嘅 ARP Table（原先空白）：**

| Internet Address | Physical Address |
|---|---|
| **192.168.30.1** | **EEEE.0000.3333** |

（跨網絡通訊，PC3 只會 ARP 自己嘅 Default Gateway E3，而唔會 ARP PC4。）

**Switch A**（Frame 由 PC3 入，Source = 3333.AAAA.3333，Destination = EEEE.0000.3333）：

- **更新：會**——喺接收 Port 學到 **3333.AAAA.3333**（表中原先只有 Fa8: EEEE.0000.3333）。
- **Forward out：Fa8 only**——Destination EEEE.0000.3333 已喺 Fa8，精準轉發去 RouterE。

**Remote (ii)——RouterF → PC4（第三程）後，Switch B：**

- **更新：唔會**——Source = FFFF.0000.1111（RouterF 嘅 F1）已喺 Fa8，無新 entry。
- **Forward out：Flood（Fa8 以外所有 Port）**——Destination = PC4 嘅 MAC 4444.BBBB.4444 未喺 Switch B 表中，未知 Unicast 要 flooding，PC4 收到後先會令 Switch B 學到佢嘅 MAC。

**🧠 答題邏輯 (Reasoning):**

呢條將 Q1 同 Q2 嘅規則串埋一齊考。ARP Table 記嘅係 **IP ↔ MAC**，而且只會記「自己同段要直接傳送嘅裝置」：本地通訊記對方 PC（192.168.30.9 → PC3 嘅 MAC）；跨網絡通訊淨係記 Default Gateway（192.168.30.1 → E3 嘅 MAC），因為 Frame 第一程只會送去 Gateway。Switch MAC Table 記嘅係 **MAC ↔ Port**：Switch A 喺第一程學到 PC3 嘅 MAC 並將 Frame 送去已知嘅 Fa8（RouterE 方向）；Switch B 喺第三程收到 RouterF 嘅 Frame，Source 已存在所以唔更新，而 PC4 嘅 MAC 未知所以要 flooding——PC4 回覆（或再傳）之後，Switch B 先會學到 4444.BBBB.4444 喺邊個 Port。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> After communication, a host's ARP table contains the IP-to-MAC mapping of the devices it directly frames to: the peer host for local communication, or only the default gateway for remote communication. A switch records the source MAC and incoming port, and forwards a frame out the known port for the destination, or floods it when the destination is unknown.

---

### Part B — CCNA1 題組

---

#### CCNA1 Q1. 配對題：Ethernet Sublayer（LLC / MAC）

**題目原文 (Question):**

> Q1. Select the Ethernet sublayer that match the characteristics on the left:
> | Characteristic | LLC | MAC |
> | Implemented in software | ___ | ___ |
> | Adds a header and a trailer to the network layer protocol data unit | ___ | ___ |
> | Places and retrieves frames on and off the media | ___ | ___ |
> | Enables the data link layer to communicate with the upper layers | ___ | ___ |

**✅ 答案 (Answer):**

| Characteristic（特徵） | Sublayer（子層） |
|---|---|
| Implemented in software（以軟件實現） | **LLC** |
| Adds a header and a trailer to the network layer protocol data unit（為網絡層 PDU 加 Header 同 Trailer） | **MAC** |
| Places and retrieves frames on and off the media（將 Frame 放上／取下傳輸媒介） | **MAC** |
| Enables the data link layer to communicate with the upper layers（令 Data Link Layer 可以同上層溝通） | **LLC** |

**🧠 答題邏輯 (Reasoning):**

Data Link Layer 分兩個子層：**LLC（Logical Link Control，邏輯鏈路控制）** 係「軟件層」，負責同上層（Network Layer）溝通，例如提供服務畀 IP、識別 Frame 入面封裝嘅係邊種上層協議；**MAC（Media Access Control，媒介存取控制）** 係「硬件／韌件層」，負責真正嘅封裝（加 Header + Trailer）同埋將 Frame 放上實體媒介傳輸。記口訣：**「LLC 管溝通、MAC 管封裝同放上線」**——所以「加 Header + Trailer」同「放 Frame 上媒體」都係 MAC；「軟件實現」同「同上層溝通」都係 LLC。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> The LLC sublayer is implemented in software and enables the data link layer to communicate with the upper layers, while the MAC sublayer performs data encapsulation — adding a header and a trailer — and places and retrieves frames on and off the media.

---

#### CCNA1 Q2. 配對題：802.3 Ethernet Frame 欄位

**題目原文 (Question):**

> Q2. For each 802.3 Ethernet frame field on the left, select the appropriate description on the right.
> | Field | Description |
> | Preamble | Detect errors with cyclic redundancy check |
> | Type | Synchronizes the sending and receiving devices |
> | Data | Encapsulated data from a higher layer |
> | Frame Check Sequence | Identifies the upper layer protocol encapsulated |

**✅ 答案 (Answer):**

| Field（欄位） | Description（描述） |
|---|---|
| **Preamble** | **Synchronizes the sending and receiving devices**（同步收發裝置） |
| **Type** | **Identifies the upper layer protocol encapsulated**（識別封裝嘅上層協議，例如 0x0800 = IPv4） |
| **Data** | **Encapsulated data from a higher layer**（來自上層嘅封裝數據） |
| **Frame Check Sequence (FCS)** | **Detect errors with cyclic redundancy check**（用 CRC 偵測錯誤） |

**🧠 答題邏輯 (Reasoning):**

802.3 Ethernet Frame 由左至右：**Preamble → Destination MAC → Source MAC → Type → Data → FCS（Trailer）**。逐個欄位記功能：Preamble（前導碼）係一連串 bit，用嚟令收發雙方時鐘同步；Type（類型）欄位講明 Data 入面封裝咗邊種上層協議（IPv4 / IPv6 / ARP）；Data 就係上層交落嚟嘅封裝數據（即 Network Layer PDU）；FCS（Frame Check Sequence）放喺 Trailer，係用 **CRC（Cyclic Redundancy Check）** 計出嚟嘅檢查碼，接收端重算一次，唔一致就代表 Frame 喺傳輸途中損壞，直接丟棄。記住「Preamble 係頭、FCS 係尾」，兩者都唔會計入「Frame」本身嘅長度定義。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> The preamble synchronizes the sending and receiving devices, the Type field identifies the upper layer protocol encapsulated in the frame, the Data field carries the encapsulated higher-layer data, and the Frame Check Sequence detects errors using a cyclic redundancy check.

---

#### CCNA1 Q3. 判斷題：Store-and-Forward 與 Cut-Through

**題目原文 (Question):**

> Q3. Identify each description below for the correct type of switch frame forwarding methods: (a) Store-and-Forward, (b) Cut-Through:
> 1. Buffers frames until the full frame has been received by the switch.
> 2. The cyclic redundancy check (CRC) is used to determine if the frame has been modified during transit.
> 3. Forwards the frame once the destination Layer 2 address is read.
> 4. More bandwidth may be consumed as more data integrity errors may be produced.

**✅ 答案 (Answer):**

| 描述 (Description) | 方法 (Method) |
|---|---|
| 1. Buffers frames until the full frame has been received by the switch（緩存直到收到完整 Frame） | **(a) Store-and-Forward** |
| 2. CRC is used to determine if the frame has been modified during transit（用 CRC 檢查 Frame 有冇喺傳輸中被修改） | **(a) Store-and-Forward** |
| 3. Forwards the frame once the destination Layer 2 address is read（一讀到目的 Layer 2 地址就轉發） | **(b) Cut-Through** |
| 4. More bandwidth may be consumed as more data integrity errors may be produced（可能消耗更多 Bandwidth，因為可能產生更多數據完整性錯誤） | **(b) Cut-Through** |

**🧠 答題邏輯 (Reasoning):**

兩種轉發模式嘅分別喺「等幾耐先轉」：**Store-and-Forward** 要收晒成個 Frame 先轉發，仲會用 CRC 驗證 Frame 完整性，壞 Frame 會被丟棄——所以可靠但延遲高；**Cut-Through** 一讀到 Destination MAC（Layer 2 地址）就即刻轉發，唔等收完、唔做錯誤檢查——所以快但延遲低。第 4 句最易錯：正因為 Cut-Through 唔檢查錯誤，壞 Frame 都會照轉發落去，浪費網絡頻寬，所以「消耗更多 Bandwidth」屬於 Cut-Through 嘅缺點。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> Store-and-Forward buffers the entire frame and verifies it with CRC before forwarding, while Cut-Through forwards the frame as soon as the destination Layer 2 address is read, without error checking, which may forward damaged frames and consume more bandwidth.

---

#### CCNA1 Q4. 填充題：MAC Address 結構

**題目原文 (Question):**

> Q4. A network interface card (NIC) needs a MAC address to communicate over the LAN.
> (a) The MAC address is a _____-bit value expressed as ____ hexadecimal digits.
> (b) The first 3 bytes are used by the vendor assigned __________________________ (OUI). The last 3 bytes must be unique within the same OUI.
> (c) The destination MAC used in a ARP request frame is: _____________________ .
> (d) The mapping information in a MAC address table (switch table) are ______________ and _______________ .
> (e) The mapping information in an ARP table are ______________ and _______________ .

**✅ 答案 (Answer):**

- **(a)** **48**-bit value expressed as **12** hexadecimal digits（48-bit，寫成 12 個 Hexadecimal 數字，即 6 個 Byte）。
- **(b)** vendor assigned **organizationally unique identifier（OUI）**——頭 3 個 Byte 由 IEEE 分配畀廠商；尾 3 個 Byte 喺同一 OUI 內必須唯一。
- **(c)** **FF-FF-FF-FF-FF-FF（Broadcast Address，廣播地址）**——ARP Request 要廣播先搵到目標。
- **(d)** MAC address table 記嘅係 **MAC address（MAC 地址）** 同 **port number（端口／接口）** 嘅對應。
- **(e)** ARP table 記嘅係 **IP address（IP 地址）** 同 **MAC address（MAC 地址）** 嘅對應。

**🧠 答題邏輯 (Reasoning):**

呢條係純背誦題，數字同名稱要記死：MAC Address = 48-bit = 6 Byte = 12 個 Hexadecimal 數字（例如 12-34-56-78-9A-BD 就係 6 組、每組 2 個 Hexadecimal）。頭 3 Byte（如 12-34-56）係 OUI（組織唯一識別碼），由 IEEE 分配畀廠商；尾 3 Byte 係廠商自行分配嘅序號，喺同一 OUI 內不可重複。另外要分清兩張「表」：**Switch 嘅 MAC Address Table 記 MAC → Port**（Layer 2 轉發用）；**Host 嘅 ARP Table 記 IP → MAC**（Layer 3 轉 Layer 2 用）。ARP Request 嘅 Destination MAC 一定係 Broadcast（FF-FF-FF-FF-FF-FF），因為發送者未知目標嘅 MAC，要向全個 Broadcast Domain 問。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> A MAC address is a 48-bit value expressed as 12 hexadecimal digits; the first three bytes are the organizationally unique identifier (OUI) assigned to the vendor. A switch MAC address table maps MAC addresses to ports, an ARP table maps IP addresses to MAC addresses, and an ARP request uses the broadcast destination MAC FF-FF-FF-FF-FF-FF.

---

#### CCNA1 Q5. 填充題：ARP 嘅網絡問題

**題目原文 (Question):**

> Q5. Potential network problems can result from ARP operation.
> (a) On large networks with low bandwidth, multiple ARP broadcasts could cause _____________ .
> (b) Network attackers could manipulate _______________ and _______________ mappings in ARP messages with the intent of intercepting network traffic.
> (c) In ARP spoofing attack, a malicious host intercepts ARP requests and replies to them so that network hosts will map an _______________ to the _______________ of the malicious host.

**✅ 答案 (Answer):**

- **(a)** **bandwidth consumption（頻寬消耗）／ network congestion（網絡擠塞）**——大量 ARP Broadcast 會消耗頻寬、拖慢網絡。
- **(b)** 攻擊者可以操控 **IP（IP address）** 同 **MAC（MAC address）** 嘅 mapping（對應關係）喺 ARP 訊息入面，目的係攔截網絡流量（traffic interception）。
- **(c)** ARP Spoofing 中，惡意主機截取 ARP Request 並回覆，令網絡上嘅主機將一個 **IP address（目標 IP 地址）** 對應到 **MAC address（MAC 地址）** 嘅係惡意主機——即「冒認」目標裝置接收流量。

**🧠 答題邏輯 (Reasoning):**

ARP 有兩大問題要識寫：**（1）效能問題**——ARP Request 係 Broadcast，喺大型低頻寬網絡上大量廣播會造成 Bandwidth 消耗／Congestion，所以要用 ARP Table 快取減少重複廣播；**（2）保安問題**——因為 ARP 冇驗證機制，任何裝置都可以亂答「我係某某 IP」，呢個就係 **ARP Spoofing（ARP 欺騙／毒化）**：惡意主機（如 Hacker 部機）冒認另一部主機（例如 Gateway 或目標 PC），令受害者將目標 IP 對應到惡意主機嘅 MAC，流量就會經攻擊者轉手，攻擊者就可以攔截、竊聽甚至篡改流量（Man-in-the-Middle）。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> Many ARP broadcasts on a large, low-bandwidth network cause bandwidth consumption. In an ARP spoofing attack, a malicious host replies to ARP requests so that network hosts map the target IP address to the MAC address of the malicious host, allowing the attacker to intercept network traffic.

---

## 📖 必考英文術語與答題句型庫

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| **ARP (Address Resolution Protocol)** | 地址解析協議：將 IPv4 地址解析成 MAC 地址嘅協議 | ARP resolves an IPv4 address to a MAC address on a local network. |
| **ARP Table / ARP Cache** | 主機入面記錄 IP ↔ MAC 對應嘅快取表 | The ARP table stores the mapping of IP addresses to MAC (physical) addresses. |
| **ARP Request / ARP Reply** | 請求（廣播「邊個擁有此 IP？」）與回覆（目標直接 Unicast 回答） | An ARP request is broadcast to find the MAC address for an IP, and the owner replies with a unicast ARP reply. |
| **Default Gateway** | 預設閘道：跨網絡流量必經嘅 Router 接口 | For remote destinations, a host sends frames to the MAC address of its default gateway. |
| **MAC Address** | 實體地址：NIC 出廠燒錄、Layer 2 用嚟識別裝置 | A MAC address is a 48-bit address expressed as 12 hexadecimal digits. |
| **OUI (Organizationally Unique Identifier)** | 組織唯一識別碼：MAC 頭 3 Byte，由 IEEE 分配畀廠商 | The first three bytes of a MAC address are the OUI assigned to the vendor. |
| **Broadcast Address (FF-FF-FF-FF-FF-FF)** | 廣播地址：全 F 嘅 MAC，表示傳畀網段內所有裝置 | A frame with destination FF-FF-FF-FF-FF-FF is flooded to all devices in the broadcast domain. |
| **MAC Address Table (Switch Table)** | Switch 入面 MAC → Port 嘅學習表，用嚟做精準轉發 | A switch builds a MAC address table that maps MAC addresses to ports by learning the source address of incoming frames. |
| **Flooding** | 洪泛：Switch 將 Frame 由除來源埠外所有埠轉出 | When the destination MAC is unknown, the switch floods the frame out all ports except the incoming port. |
| **Unicast** | 單播：Frame 只傳畀一個指定目的地 | Known unicast frames are forwarded out the single port associated with the destination MAC. |
| **Ethernet Frame** | 乙太網絡訊框：Data Link Layer 嘅封裝單位 | An Ethernet frame consists of destination MAC, source MAC, type, data and FCS fields. |
| **Preamble** | 前導碼：用嚟同步收發雙方時鐘嘅 bit 序列 | The preamble synchronizes the sending and receiving devices. |
| **Type Field** | 類型欄位：指出 Data 封裝嘅上層協議 | The Type field identifies the upper layer protocol encapsulated in the frame. |
| **FCS (Frame Check Sequence)** | 訊框檢查序列：用 CRC 計算嘅錯誤偵測碼 | The FCS detects errors in the frame using a cyclic redundancy check (CRC). |
| **CRC (Cyclic Redundancy Check)** | 循環冗餘檢查：一種錯誤偵測演算法 | CRC is used to determine whether a frame has been modified during transit. |
| **LLC (Logical Link Control)** | 邏輯鏈路控制子層：軟件實現，負責同上層溝通 | The LLC sublayer is implemented in software and enables communication with the upper layers. |
| **MAC Sublayer (Media Access Control)** | 媒介存取控制子層：負責封裝（加 Header/Trailer）同放 Frame 上線 | The MAC sublayer adds the header and trailer and places frames on and off the media. |
| **Store-and-Forward** | 儲存後轉發：收完整個 Frame 並驗證 CRC 先轉發 | Store-and-Forward buffers the entire frame and checks it with CRC before forwarding. |
| **Cut-Through** | 直通轉發：讀到目的 MAC 即刻轉發，唔做錯誤檢查 | Cut-Through forwards the frame as soon as the destination Layer 2 address is read. |
| **Hub** | 集線器：Layer 1 裝置，將訊號重複畀所有連接裝置 | A hub repeats incoming signals to all connected devices on the same segment. |
| **ARP Spoofing** | ARP 欺騙：惡意主機冒認他人 IP，令流量改經自己 | In ARP spoofing, hosts map the target IP address to the MAC address of the malicious host, enabling traffic interception. |
| **Encapsulation** | 封裝：上層數據加上 Header/Trailer 組成 Frame | The MAC sublayer encapsulates the network layer PDU by adding a header and a trailer. |

---

## 🗺️ 學習路線 (Learning Path)

**第 1 步：理解（Understand）——先明「點解」，唔好死背**

- 用「送信」比喻理解定址流程：IP 係「地址」，MAC 係「屋企門牌」，ARP 就係「查地址簿」；同區（同 Subnet）直接送，跨區要先送去「閘口」（Default Gateway）。
- 理解 Switch 點解要「學 Source、查 Destination」：學習係為咗以後唔使再 Flooding。
- 理解 MAC 同 IP 點解要分開：MAC 只喺一段網絡內有效，Router 每過一段就要換 MAC（逐跳變），但 IP 由頭到尾唔變（端到端）。

**第 2 步：背誦（Memorize）——記死定義、數字同句型**

- 背熟 MAC Address 結構：**48-bit / 12 Hexadecimal / OUI 頭 3 Byte**；Broadcast MAC = **FF-FF-FF-FF-FF-FF**。
- 背熟 Frame 欄位順序：**Preamble → Dest MAC → Src MAC → Type → Data → FCS**。
- 背熟兩張表：Switch Table = **MAC ↔ Port**；ARP Table = **IP ↔ MAC**。
- 背熟四條 Exam Answer Phrase（ARP 流程、Switch 兩步曲、MAC/IP 逐跳規則、LLC/MAC 分工）。

**第 3 步：掌握判斷（Apply）——練熟三類「規則題」**

- **Switch 題**：見到 Frame 先問兩句——「Source 喺表未？」（決定有冇更新）→「Destination 喺表未／係咪 Broadcast？」（決定精準轉發定 Flooding）。
- **ARP 題**：見到 Host 傳送——先問「同唔同 Subnet？」同段 → ARP 目標 PC 嘅 IP；跨段 → ARP Default Gateway 嘅 IP。
- **填 Frame 題**：睇「而家邊個出 Frame、下一個 Hop 係邊個」填 MAC（M 系列）；IP（P 系列）由頭到尾照抄最初 Source / Destination。

**第 4 步：能解答考題（Exam-ready）——用本 Guide 自測**

- 遮住答案，逐題重做 Q1–Q5 及 CCNA1 Q1–Q5，再對答案。
- 自己畫一個「PC → Switch → Router → Router → Switch → PC」嘅圖，隨手揀兩部機，練習填齊三段 Frame 嘅 M/P 地址。
- 考前最後一晚只用「🎒 考前 5 分鐘雙語懶人包」做快速回顧，確保數字同規則全部記得。

---

## 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 🔢 關鍵數字 (Key Numbers)

| 項目 | 數字／值 |
|---|---|
| MAC Address 長度 | **48-bit = 6 Byte = 12 Hexadecimal 數字** |
| OUI | 頭 **3 Byte**（廠商），尾 3 Byte 唯一 |
| Broadcast MAC | **FF-FF-FF-FF-FF-FF** |
| ARP Request 嘅 Destination MAC | Broadcast（FF-FF-FF-FF-FF-FF） |
| Frame 欄位順序 | Preamble → Dest MAC → Src MAC → Type → Data → FCS |

### ⚖️ 對比表 (Comparison Tables)

**LLC vs MAC Sublayer：**

| | LLC | MAC |
|---|---|---|
| 實現方式 | Software（軟件） | Hardware / Firmware（硬件／韌件） |
| 主要功能 | 同上層（Network Layer）溝通 | 封裝（加 Header + Trailer）、放 Frame 上媒體 |
| 口訣 | 「管溝通」 | 「管封裝、管上線」 |

**Switch 三種情況（學 Source、查 Destination）：**

| Frame 情況 | 更新 Table？ | 轉發 |
|---|---|---|
| Destination 已知（Unicast） | 睇 Source（通常已學） | 只出目標 Port |
| Destination 未知（Unknown Unicast） | 學 Source MAC | **Flooding**（除來源埠外全部） |
| Broadcast（FF-FF-FF-FF-FF-FF） | 學 Source MAC | **Flooding**（除來源埠外全部） |

**Store-and-Forward vs Cut-Through：**

| | Store-and-Forward | Cut-Through |
|---|---|---|
| 等幾耐 | 收晒成個 Frame | 讀到 Dest MAC 即刻轉 |
| 錯誤檢查 | CRC 驗證，壞 Frame 丟棄 | 冇檢查 |
| 特性 | 可靠、延遲高 | 快、可能浪費 Bandwidth |

**MAC vs IP 喺 Frame 入面嘅命運：**

| | 本地通訊 | 跨網絡通訊 |
|---|---|---|
| Destination MAC | 目標 PC 嘅 MAC | **Default Gateway 嘅 MAC**（第一程）／下一 Hop Router 接口（中段）／目標 PC（最後一程） |
| Source MAC | 自己嘅 MAC | 每個 Hop 換成「出接口」嘅 MAC |
| Source / Destination IP | 唔變 | **全程唔變** |

### 🎤 英文記憶口訣 (English Mnemonics)

- **「MAC 48，12 個 Hex」** — MAC address: 48 bits, 12 hexadecimal digits.
- **「ARP: 先查表，冇先問」** — Check the ARP table first; send an ARP request only when there is no entry.
- **「學 Source，查 Destination」** — Learn the source; look up the destination.
- **「MAC 逐跳變，IP 全程不變」** — MAC addresses change at every hop; IP addresses stay the same end-to-end.
- **「同段 ARP 對方，跨段 ARP Gateway」** — ARP the peer on the same subnet; ARP the default gateway for remote destinations.
- **「LLC 管溝通，MAC 管封裝」** — LLC talks to upper layers; MAC encapsulates and touches the media.
- **「FF-FF-FF-FF-FF-FF = 廣播，見 F 就 Flood」** — All-ones destination means broadcast, so the switch floods.
