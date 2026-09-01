# ITE3102 Network Fundamentals — Tutorial 6 雙語練習題解 Guide

**課題：Network Layer（網絡層）**

> 本 Guide 對應 Tutorial 6 全部分練習（主練習 Q1–Q3，含拓撲圖重建；另附 CCNA1 題組 Q1–Q8）。核心定義一律以英文標準定義句（Standard Definition）呈現，解說用香港繁體中文，方便同學「睇得明、記得熟、考得答」。

---

## 📝 練習概要 (Summary)

Tutorial 6 係成個 Network Fundamentals 課程嘅「心臟」——**Network Layer（網絡層）**。練習嘅主軸係「**IP 地址 + 路由（Routing）**」：要識得睇拓撲圖分辨 **Broadcast Domain**（一個網絡 = 一個廣播域），要識得為 PC 填寫完整嘅 **IPv4 Configuration**（IP Address、Subnet Mask、Default Gateway），亦要識得睇 **Routing Table** 判斷路由器應該由邊個 **Exit Interface（出口介面）** 將 Packet 轉發出去。主練習 Q1 用兩個 Router（RouterE / RouterF）加五個 Classful Network 考基本配置；Q2\* 用三個 Router（R2 / R3 / R4）考 Broadcast Domain 數量、Default Gateway 同多跳路由；Q3 用兩個 Router（RouterA / RouterB）考 **跨網絡通訊時 Frame 內 MAC 地址嘅變化規則**——即「MAC 逐跳改、IP 全程不變」呢條黃金定律。

後半部分（CCNA1 題組）考核四組必背知識：**（1）IP 嘅三大傳遞特性**——Connectionless（無連接）、Best Effort（盡力而為）、Media Independent（媒體無關）；**（2）IPv6 Header 各欄位**（Version、Traffic Class、Payload Length、Next Header、Hop Limit）同 IPv4 Header 對照；**（3）Router 硬件與啟動流程**——RAM / ROM / Flash / NVRAM 四種記憶體、POST → Bootstrap → IOS → Startup Configuration 開機順序、五種 CLI 模式與對應指令；**（4）Frame / Packet 十六進制解碼**——俾一段 Wireshark 式 Hex Dump，要識得逐欄位拆出 TTL、Source IP、Destination IP。呢課係考試「佔分最重、題型最穩定」嘅一課，全部有固定規則可循。

## 🎯 練習目標 (Objectives)

完成本練習後，你應該能夠：

| 能力 (Ability) | 英文對照 (English) |
|---|---|
| 分辨 Broadcast Domain（網絡）並數出數量 | Identify broadcast domains (networks) and count them |
| 為 PC 填寫完整 IPv4 配置（IP / Subnet Mask / Default Gateway） | Fill in the IPv4 configuration (IP address, subnet mask, default gateway) for a PC |
| 判斷 Packet 係本地（Local）定遠端（Remote）傳送 | Determine whether a packet is destined to a local host or a remote host |
| 解釋跨網絡通訊時 Frame 點解要填 Default Gateway 嘅 MAC 地址 | Explain why a frame to a remote host contains the MAC address of the default gateway |
| 根據 Routing Table 揀出正確嘅 Exit Interface（直接連接 vs 經 Next Hop） | Select the correct exit interface from a routing table (directly connected vs via a next hop) |
| 講出 IP 嘅 Connectionless / Best Effort / Media Independent 特性 | State the IP characteristics: connectionless, best effort, media independent |
| 配對 IPv6 Header 各欄位嘅功能 | Match IPv6 header fields to their descriptions |
| 分辨 Router 五種 CLI 模式並配對正確指令 | Match router CLI modes to the correct commands |
| 排列 Router 開機步驟並配對記憶體類型 | Order the router boot steps and match memory types |
| 由 Hex Dump 解碼 IPv4 Packet（Version、TTL、Source/Destination IP 等） | Decode an IPv4 packet from a hex dump (version, TTL, source/destination IP, etc.) |
| 喺 PC Route Table 同 Router 嘅 `show ip route` 輸出中搵出指定 Entry | Identify specific entries (default gateway, loopback, connected routes) in a PC route table and a router routing table |

---

## ✏️ 題目與答案 Walkthrough

### Part A — 主練習題（Tutorial 6）

---

#### Q1. Classful Network 拓撲：Broadcast Domain、PC 配置與 Exit Interface（RouterE / RouterF）

**題目原文 (Question):**

> Q1. The Ethernet network below uses networks in their classful boundaries.
> (Diagram: PC1 (192.168.10.8), PC2 (192.168.30.8), PC3 (192.168.30.9), PC4 (192.168.40.8), PC5 (192.168.40.9), PC6 (192.168.50.8); RouterE (E1, E2, E3) ↔ RouterF (F1, F2, F3) linked via 192.168.20.0; SwitchA / SwitchB)
> (a) Identify the broadcast domain (networks) with circles on the diagram.
> (b) Fill in the IP configuration for the PCs: (IP address / Subnet mask / Default gateway for PC1–PC6)
> (c) For properly configured routers, fill in the exit interfaces for RouterE and RouterF: (destination networks 192.168.10.0, 192.168.20.0, 192.168.30.0, 192.168.40.0, 192.168.50.0)

**拓撲重建（從圖中讀出）**：全圖用 Classful 邊界，即每個網絡都用 `/24`（Subnet Mask 255.255.255.0）。五個網絡：

- **192.168.10.0/24**：PC1（192.168.10.8），接 RouterE 嘅 **E1 = 192.168.10.1**
- **192.168.20.0/24**：RouterE（**E2 = 192.168.20.1**）與 RouterF（**F2 = 192.168.20.2**）之間嘅 Router-to-Router 鏈路
- **192.168.30.0/24**：PC2（192.168.30.8）、PC3（192.168.30.9），接 RouterE 嘅 **E3 = 192.168.30.1**
- **192.168.40.0/24**：PC4（192.168.40.8）、PC5（192.168.40.9），接 RouterF 嘅 **F1 = 192.168.40.2**
- **192.168.50.0/24**：PC6（192.168.50.8），接 RouterF 嘅 **F3 = 192.168.50.1**

> A broadcast domain is a group of devices that receives a broadcast frame sent by any one of them; each network (subnet) separated by a router is a separate broadcast domain.

**✅ 答案 (Answer):**

**(a) Broadcast Domain 數量：5 個**——192.168.10.0、192.168.20.0、192.168.30.0、192.168.40.0、192.168.50.0 各一個。喺圖上每個網絡畫一個圓圈包住佢。

**(b) PC 配置表**（Subnet Mask 全部為 255.255.255.0，因為 Classful /24）：

| PC | IP Address | Subnet Mask | Default Gateway |
|---|---|---|---|
| PC1 | 192.168.10.8 | 255.255.255.0 | **192.168.10.1**（RouterE E1） |
| PC2 | 192.168.30.8 | 255.255.255.0 | **192.168.30.1**（RouterE E3） |
| PC3 | 192.168.30.9 | 255.255.255.0 | **192.168.30.1**（RouterE E3） |
| PC4 | 192.168.40.8 | 255.255.255.0 | **192.168.40.2**（RouterF F1） |
| PC5 | 192.168.40.9 | 255.255.255.0 | **192.168.40.2**（RouterF F1） |
| PC6 | 192.168.50.8 | 255.255.255.0 | **192.168.50.1**（RouterF F3） |

**(c) Exit Interface 表**：

| Destination network | RouterE exit interface | RouterF exit interface |
|---|---|---|
| 192.168.10.0 | **E1**（直接連接） | **F2**（經 RouterE） |
| 192.168.20.0 | **E2**（直接連接） | **F2**（直接連接） |
| 192.168.30.0 | **E3**（直接連接） | **F2**（經 RouterE） |
| 192.168.40.0 | **E2**（經 RouterF） | **F1**（直接連接） |
| 192.168.50.0 | **E2**（經 RouterF） | **F3**（直接連接） |

**🧠 答題邏輯 (Reasoning):**

記住兩條金規則：**（1）Default Gateway = 同 PC 喺同一網絡嗰個 Router 介面嘅 IP**。PC 嘅 Gateway 一定要同自己同一個 Subnet，所以睇「邊個 Router 介面嘅 IP 同 PC 同一個 192.168.x.0/24 網絡」就係答案——PC1 同 E1（192.168.10.1）同一網絡，Gateway 就係 192.168.10.1；PC4/PC5 同 F1（192.168.40.2）同一網絡，Gateway 就係 192.168.40.2（留意呢度 Gateway 係 .2 而唔係 .1，因為圖中 RouterF 嘅 F1 用咗 .2，答案要跟圖）。**（2）Exit Interface = 出嗰個目標網絡要經邊個介面**。兩步判斷：先問「目標網絡係咪直接接喺我身上？」係 → 用直接連接嗰個介面（Directly Connected Route）；唔係 → 搵去「擁有嗰個網絡嘅 Router」方向嘅介面。RouterE 要去 192.168.40.0 同 192.168.50.0，兩者都由 RouterF 擁有，而 RouterF 喺 RouterE 嘅 E2 方向，所以兩個都出 E2。反之 RouterF 去 192.168.10.0 / 192.168.30.0 就出 F2（RouterE 方向）。192.168.20.0 係兩 Router 之間嘅鏈路，兩邊都係直接連接。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> The default gateway of a host is the IP address of the router interface on the same network as the host. When forwarding, a router uses a directly connected interface if the destination network is local; otherwise it uses the interface that leads toward the router which owns the destination network.

---

#### Q2\*. 多路由器拓撲：Broadcast Domain 數量、Default Gateway 與 R3 轉發（R2 / R3 / R4）

**題目原文 (Question):**

> Q2*. Consider the network topology below:
> (Diagram: PC1 = 172.16.10.1/16, PC2 = 172.16.20.1/16; R2 LAN interface = 172.16.255.254/16; PC3 = 172.31.10.1/16, PC4 = 172.31.20.1/16; R4 LAN interface = 172.31.255.254/16; Server1 (192.168.30.254) on 192.168.30.0/24, gateway 192.168.30.1; Server2 (192.168.40.254) on 192.168.40.0/24, gateway 192.168.40.1; R2–R3 and R3–R4 connected by serial links; R3 is the middle router.)
> (a) How many broadcast domains (networks) are there?  _______________
> (b) Write down the default gateway for [PC2]: __________________________
>     Write down the default gateway for [Server2]: _____________________________
> (d) Suppose now a packet (inside a frame) arrives at S1 of R3. Identify the interface that R3 will forward out the packet (in another frame) for each case below:
>     The packet is destined to 172.16.10.1: ___________
>     The packet is destined to 172.16.20.1: ___________
>     The packet is destined to 172.31.10.1: ___________
>     The packet is destined to 192.168.30.1: ___________
> (e) For properly configured routers. Write down the exit interfaces for [R2] and for [R4]: (destination networks 172.16.0.0/16, 172.31.0.0/16, 192.168.30.0/24, 192.168.40.0/24)

**拓撲重建（從圖中讀出）**：三個 Router 一字排開——**R2（左）— R3（中）— R4（右）**，中間用兩條 Serial Link 連接。注意 PC 全部用 `/16` Mask：172.16.10.1/16 同 172.16.20.1/16 其實**屬於同一個網絡 172.16.0.0/16**，佢哋嘅 Gateway 都係 R2 嘅 LAN 介面 **172.16.255.254**；同樣 172.31.10.1/16 同 172.31.20.1/16 屬於 **172.31.0.0/16**，Gateway 係 R4 嘅 **172.31.255.254**。右邊兩個獨立 `/24` 網絡：192.168.30.0/24（Server1，Gateway 192.168.30.1）同 192.168.40.0/24（Server2，Gateway 192.168.40.1），都係 R4 直接連接。

**✅ 答案 (Answer):**

**(a) Broadcast Domain 數量：6 個**——4 個 LAN（172.16.0.0/16、172.31.0.0/16、192.168.30.0/24、192.168.40.0/24）加 2 條 Router-to-Router Serial Link（R2–R3、R3–R4）。

**(b) Default Gateway：**
- PC2 → **172.16.255.254**（R2 嘅 LAN 介面，同一 172.16.0.0/16 網絡）
- Server2 → **192.168.40.1**（R4 喺 192.168.40.0/24 網絡嘅介面）

**(d) R3 嘅轉發**（假設 R3 面向 R2 嘅 Serial 介面係 S0、面向 R4 嘅係 S1；以圖中實際標籤為準）：

| 目的地 (Destination) | R3 轉發出邊個介面 |
|---|---|
| 172.16.10.1（PC1，R2 後面） | **S0（面向 R2）** |
| 172.16.20.1（PC2，R2 後面） | **S0（面向 R2）** |
| 172.31.10.1（PC3，R4 後面） | **S1（面向 R4）** |
| 192.168.30.1（Server1 LAN，R4 後面） | **S1（面向 R4）** |

**(e) Exit Interface 表**：

| Destination Network | [R2] Exit Interface | [R4] Exit Interface |
|---|---|---|
| 172.16.0.0/16 | **LAN 介面（直接連接，即 172.16.255.254 嗰個介面）** | **Serial（面向 R3）** |
| 172.31.0.0/16 | **Serial（面向 R3）** | **LAN 介面（直接連接，即 172.31.255.254 嗰個介面）** |
| 192.168.30.0/24 | **Serial（面向 R3）** | **LAN 介面（直接連接，192.168.30.1）** |
| 192.168.40.0/24 | **Serial（面向 R3）** | **LAN 介面（直接連接，192.168.40.1）** |

**🧠 答題邏輯 (Reasoning):**

（a）**Broadcast Domain 數法**：每個「被 Router 分隔開嘅網絡」就係一個 Broadcast Domain。數清楚 = 所有 LAN + 所有 Router 之間嘅鏈路。LAN 有 4 個（172.16.0.0/16、172.31.0.0/16、192.168.30.0/24、192.168.40.0/24），Serial Link 有 2 條（R2–R3、R3–R4），總共 **6**。最易錯位係：以為 172.16.10.0 同 172.16.20.0 係兩個網絡——但因為 Mask 係 /16，佢哋其實同屬 172.16.0.0/16，只係**一個** Broadcast Domain。（b）Default Gateway 規則同 Q1 一樣：搵同 PC 同一網絡嘅 Router 介面。PC2 喺 172.16.0.0/16，R2 嘅 LAN 介面 172.16.255.254 就係答案；Server2 喺 192.168.40.0/24，R4 嘅 192.168.40.1 就係答案。（d）R3 收到 Packet 後，喺自己嘅 Routing Table 做 **Longest Match（最長匹配）**：172.16.x.x 目的地命中 172.16.0.0/16 條路由，Next Hop 喺 R2 方向 → 出 S0；172.31.x.x 同 192.168.30.0/24 命中 R4 方向嘅路由 → 出 S1。留意 R3 唔會理 Packet「由邊度嚟」，只會跟路由表決定「去邊度出」。（e）原理同 Q1(c)：直接連接 → 用 LAN 介面；唔係直接連接 → 用去擁有嗰個網絡嘅 Router 方向嘅 Serial 介面。R2 只有 172.16.0.0/16 係自己嘅，其餘三個網絡全部要經 R3 方向出；R4 就三個 LAN 全部直接連接。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> A broadcast domain is a network; routers separate broadcast domains, so the total count is the number of LANs plus the number of router-to-router links. A router forwards a packet out the interface indicated by the longest match in its routing table — a directly connected interface for its own networks, or the interface toward the next hop router for remote networks.

---

#### Q3. 跨網絡通訊：Routing Table、Local / Remote Host 與 Frame 內 MAC 地址（RouterA / RouterB）

**題目原文 (Question):**

> Q3. Consider the address settings for the devices in the topology below.
> (Topology: HostA 192.168.1.110/24 — SwitchA — RouterA-G0 192.168.1.1/24; RouterA-S0 200.1.2.17/30 — WAN link — RouterB-S1 200.1.2.18/30; RouterB-G1 172.16.1.1/16 — SwitchB — HostB 172.16.2.99/16 and ServerB 172.16.1.99/16.)
> To save addressing space, a network with subnet mask /30 is used to connect the routers (network id: 200.1.2.16/30, broadcast address: 200.1.2.19/30, see Chapter 8).
> (a) For the properly configured network, fill in the exit interfaces in the routing table below: (destination networks 172.16.0.0/16, 192.168.1.0/24, 200.1.2.16/30; columns RouterA, RouterB)
> (b) For ServerB, it may send to itself, to a local host, or to a remote host.
>     (i) To which kind of host is it sending when the destination address is 127.0.0.1?  _________
>     (ii) To which kind of host is it sending when it sends to HostB?  _________
>     (iii) To which kind of host is it sending when it sends to HostA?  _________
> (c) Consider ServerB sending a packet to HostB. ServerB will encapsulate the packet inside a frame. Will the frame contain the physical address of HostB or that of RouterB-G1? _________
> (d) Consider ServerB sending a packet to HostA.
>     (i) ServerB will encapsulate the packet inside a frame. Will the frame contain the physical address of HostA or that of RouterB-G1? _________
>     (ii) When RouterB receives the frame, RouterB will de-capsulate the packet out and see that it is destined for 192.168.1.110. According to the routing table of RouterB, where will RouterB send out the packet? _________
>     (iii) When RouterA receives the packet (inside a frame), RouterA will de-capsulate the packet out and then encapsulate it inside another frame. Will the frame contain the physical address of HostA? _________

**✅ 答案 (Answer):**

**(a) Routing Table（Exit Interface）**：

| Destination Network | RouterA | RouterB |
|---|---|---|
| 172.16.0.0/16 | **S0**（經 RouterB，Next Hop 200.1.2.18） | **G1**（直接連接） |
| 192.168.1.0/24 | **G0**（直接連接） | **S1**（經 RouterA） |
| 200.1.2.16/30 | **S0**（直接連接） | **S1**（直接連接） |

**(b) ServerB（172.16.1.99/16）發送對象**：
- (i) 目的地 127.0.0.1 → **Itself（自己 / loopback）**——127.0.0.0/8 係 Loopback Address，代表「自己部機」。
- (ii) 發去 HostB（172.16.2.99/16）→ **Local host（本地主機）**——同 ServerB 一樣屬於 172.16.0.0/16。
- (iii) 發去 HostA（192.168.1.110/24）→ **Remote host（遠端主機）**——喺另一個網絡 192.168.1.0/24。

**(c) ServerB → HostB：Frame 內含 HostB 嘅物理地址（MAC）**——同一網絡，直接交付，唔經 Router。

**(d) ServerB → HostA**：
- (i) Frame 內含 **RouterB-G1 嘅物理地址（MAC）**——HostA 喺另一個網絡，ServerB 要將 Frame 先交畀 Default Gateway（RouterB-G1）。
- (ii) RouterB 睇到目的地 192.168.1.110 → 查路由表命中 192.168.1.0/24 → **由 S1 介面送出**（經 200.1.2.16/30 鏈路去 RouterA）。
- (iii) 係（Yes）——RouterA 重新封裝時會填 **HostA 嘅物理地址**，因為 HostA 喺 RouterA 直接連接嘅 192.168.1.0/24 網絡，RouterA 可以經 ARP 攞到 HostA 嘅 MAC。

**🧠 答題邏輯 (Reasoning):**

呢條係全課最重要嘅概念題，核心係「**逐跳（Hop-by-Hop）封裝**」：**IP Address 由源頭到目的地全程不變，但 Frame 嘅 MAC Address 每過一個 Router 就會換一次**。（b）判斷 Local / Remote：將目的地 IP 同自己嘅 Subnet Mask 做 **AND** 運算，結果等於自己網絡 ID → Local；唔等於 → Remote。127.0.0.1 係 Loopback（`127.0.0.0/8` 保留畀本機自己），所以 (i) 答案係「自己」。（c）同 (d)(i) 係對比題：同網絡 → Frame 直接填目的地 Host 嘅 MAC（ARP 查 HostB）；跨網絡 → 先將 Frame 交畀 Default Gateway，所以填 **RouterB-G1 嘅 MAC**，IP 欄位照樣填 HostA 嘅 IP。（d)(ii) 考 Router 嘅運作：Router 收到 Frame 會 **De-capsulate（拆 Frame 攞 Packet）**，用 Packet 嘅 Destination IP 查路由表，然後 **Re-encapsulate（包新 Frame）** 由正確 Exit Interface 送出——呢度命中 192.168.1.0/24 經 S1。留意「Frame 嘅 Destination MAC」喺每段鏈路都會變成「下一跳設備」嘅 MAC：(d)(iii) RouterA 收到後，因為 HostA 喺自己直接連接嘅網絡，新 Frame 嘅 Destination MAC 就係 HostA 嘅 MAC（RouterA 會用 ARP 解析）。

**💬 英文答題句 (Exam Answer Phrase):**

> In a frame, the source and destination IP addresses remain unchanged end to end, but the MAC addresses change at every hop. For a remote destination, a host encapsulates the packet in a frame addressed to the default gateway's MAC address; each router then de-capsulates, looks up the destination in its routing table, and re-encapsulates with the MAC address of the next hop.

---

### Part B — CCNA1 題組

---

#### Q1. IP 傳遞特性：Connectionless (CL) / Best Effort (BE) / Media Independent (MI)

**題目原文 (Question):**

> Q1. For each IP characteristic below, indicate its delivery method as Connectionless (CL), Best Effort (BE), or Media Independent (MI):

> The network layer (IP) has three fundamental delivery characteristics:
> - **Connectionless** — no connection is established before sending data;
> - **Best Effort** — IP makes no guarantee that packets are delivered;
> - **Media Independent** — IP operates independently of the medium carrying the data.

**✅ 答案 (Answer):**

| Characteristic | CL / BE / MI |
|---|---|
| No overhead is used to guarantee packet delivery.（冇任何額外開支去保證送達） | **BE** |
| No connection is established before sending data packets.（傳送前唔會先建立連線） | **CL** |
| Operates independently of the medium carrying the data.（獨立於傳輸媒體運作） | **MI** |
| The sender doesn't know if the receiver gets the packets.（送方唔知收方有冇收到） | **CL** |
| The receiver doesn't know when the packets are arriving.（收方唔知 Packet 幾時到） | **CL** |
| The actual data is encapsulated in the network layer PDU.（數據被封裝入 Network Layer PDU） | **CL** |
| Will adjust the size of the packet sent according to the type of network access.（會按網絡存取類型調整 Packet 大小——即 Fragmentation / MTU） | **MI** |
| Upper-layer connection-oriented protocols manage the process of tracking packets and ensuring their delivery.（由上層面向連接嘅協議負責追蹤同保證送達） | **BE** |

**🧠 答題邏輯 (Reasoning):**

記住三個字嘅「關鍵詞」：**CL 關鍵詞 = connection / connectionless / 建立連線**；**BE 關鍵詞 = guarantee / overhead / ensure（保證、確認）**；**MI 關鍵詞 = medium / media / 媒體**。逐句對號入座：「No overhead to guarantee」→ BE；「No connection established」同兩個「doesn't know」（sender 唔知收方有冇收到、receiver 唔知 Packet 幾時到）都係「冇連線、冇預告」→ CL；「Operates independently of the medium」→ MI。兩句易錯：(1)「Actual data is encapsulated in the network layer PDU」——每個 Packet 都係自包含嘅 PDU、獨立處理、冇連線狀態，所以係 **CL**；(2)「Will adjust the size of the packet」——呢句講緊 IP 會按每種媒體嘅 MTU 做 **Fragmentation（分割）**，正正係 IP 可以喺任何媒體上運作嘅原因，所以係 **MI**；最後「Upper-layer connection-oriented protocols（如 TCP）負責追蹤保證」——即 IP 自己唔保證，靠上層補救，所以係 **BE**。

**💬 英文答題句 (Exam Answer Phrase):**

> IP is connectionless because it sends each packet independently without establishing a session; it is best effort because it makes no guarantee of delivery and relies on upper-layer protocols such as TCP for reliability; and it is media independent because it operates over any medium, adapting packet size through fragmentation.

---

#### Q2. IPv6 Header 欄位配對

**題目原文 (Question):**

> Q2. Identify the IPv6 header descriptions on the right to the correct field names on the left:
> Fields: Version / Hop Limit / Next Header / Traffic Class / Payload Length

**✅ 答案 (Answer):**

| IPv6 Header Field | Description（配對） |
|---|---|
| **Version** | Is always set to **0110 (binary)**（永遠係 0110₂，即 6，代表 IPv6） |
| **Traffic Class** | **Classifies packets for congestion control**（將 Packet 分類做 QoS / 優先次序） |
| **Payload Length** | **Identifies the size of the data portion of the packet**（Payload 部分嘅長度） |
| **Next Header** | **Identifies the application type to the upper-layer protocol**（指出跟住係邊個上層協議，如 TCP / UDP） |
| **Hop Limit** | **When this value reaches 0, the sender is notified that the packet was not delivered**（每經一個 Router 減 1，減到 0 就丟棄並通知送方） |

**🧠 答題邏輯 (Reasoning):**

IPv6 Header 係固定 40 bytes，冇咗 IPv4 嘅 IHL、Identification、Flags、Fragment Offset、Header Checksum 等欄位（所以 IPv6 Router 唔使重新計 Checksum，轉發更快）。逐欄位記：**Version** 一定係 6（二進制 0110）；**Traffic Class** 對應 IPv4 嘅 ToS / DS 欄位，用嚟做 QoS 優先級（等於「分類」）；**Payload Length** 係「固定 Header 之後嘅長度」，即 Data 部分；**Next Header** 等於 IPv4 嘅 Protocol 欄位，話畀你知下一層係咩（TCP=6、UDP=17 等）；**Hop Limit** 等於 IPv4 嘅 TTL，每跳減 1，減到 0 就丟棄。考法係「英文描述 ↔ 欄位名」配對，所以四個欄位嘅功能描述要背熟。

**💬 英文答題句 (Exam Answer Phrase):**

> The IPv6 Version field is always 0110 (6). Traffic Class classifies packets for QoS, Payload Length gives the length of the data portion, Next Header identifies the upper-layer protocol, and Hop Limit is decremented by each router and discards the packet when it reaches 0.

---

#### Q3. Router CLI 模式與指令配對

**題目原文 (Question):**

> Q3. Match the commands on the right to the device modes on the left:
> Modes: R1> / R1# / R1(config)# / R1(config-if)# / R1(config-line)#
> Commands: login / enable / service password-encryption / copy running-config startup-config / ip address 192.168.1.2 255.255.255.0

**✅ 答案 (Answer):**

| 模式 (Mode) | 名稱 | 指令 (Command) |
|---|---|---|
| **R1>** | User EXEC Mode（用戶模式） | **enable**（進入特權模式） |
| **R1#** | Privileged EXEC Mode（特權模式） | **copy running-config startup-config**（儲存配置） |
| **R1(config)#** | Global Configuration Mode（全局配置模式） | **service password-encryption**（加密密碼） |
| **R1(config-if)#** | Interface Configuration Mode（介面配置模式） | **ip address 192.168.1.2 255.255.255.0**（設定介面 IP） |
| **R1(config-line)#** | Line Configuration Mode（線路配置模式） | **login**（要求登入） |

**🧠 答題邏輯 (Reasoning):**

Router CLI 係「逐層進入」嘅：`R1>`（User EXEC，只可以睇基本嘢）→ 打 `enable` → `R1#`（Privileged EXEC，可以睇晒所有設定）→ 打 `configure terminal` → `R1(config)#`（Global Config）→ 再打 `interface <name>` → `R1(config-if)#`；或者打 `line console 0` / `line vty 0 4` → `R1(config-line)#`。記指令歸邊層：**enable** 係 User EXEC 嘅入口指令；**copy running-config startup-config** 係「保存設定」，喺 Privileged EXEC 做；**service password-encryption** 係全 Router 層面嘅設定 → Global；**ip address x.x.x.x mask** 一定要喺某個介面入面做 → Interface；**login** 係設定「呢條線要登入先用到」→ Line。考法最常出「呢條指令喺邊個模式執行？」。

**💬 英文答題句 (Exam Answer Phrase):**

> `enable` is used in user EXEC mode to enter privileged EXEC mode; `copy running-config startup-config` saves the configuration from privileged EXEC mode; global commands such as `service password-encryption` run in global configuration mode, interface commands such as `ip address` run in interface configuration mode, and `login` is a line configuration command.

---

#### Q4. Router 開機步驟排序

**題目原文 (Question):**

> Q4. Arrange the following router boot steps into the correct sequence:
> ____  Get the startup configuration file
> ____  Load bootstrap program
> ____  ROM performs POST
> ____  Load the Cisco IOS into RAM

**✅ 答案 (Answer):**

正確次序：

| 步驟 | 內容 |
|---|---|
| **1** | **ROM performs POST**（Power-On Self Test，開機自檢） |
| **2** | **Load bootstrap program**（載入 Bootstrap 引導程式） |
| **3** | **Load the Cisco IOS into RAM**（將 Cisco IOS 載入 RAM） |
| **4** | **Get the startup configuration file**（由 NVRAM 攞 Startup Configuration） |

即填寫為：`__4__ Get the startup configuration file`、`__2__ Load bootstrap program`、`__1__ ROM performs POST`、`__3__ Load the Cisco IOS into RAM`。

**🧠 答題邏輯 (Reasoning):**

Router 開機好似電腦開機一樣有固定次序，記口訣「**POST → Bootstrap → IOS → Config**」：第一步 ROM 入面嘅微碼做 POST 檢查硬件（CPU、記憶體、介面）；第二步 Bootstrap 由 ROM 讀入，負責「去 Flash 搵 IOS」；第三步將 IOS 載入 RAM（IOS 平時存喺 Flash）；第四步去 NVRAM 攞 Startup Configuration 載入 RAM 變成 Running Configuration。留意每個步驟嘅「來源」：POST 同 Bootstrap 喺 **ROM**、IOS 喺 **Flash**、Startup Config 喺 **NVRAM**——呢個同 Q5 嘅記憶體配對直接相關。

**💬 英文答題句 (Exam Answer Phrase):**

> The router boot sequence is: (1) ROM performs POST, (2) the bootstrap program is loaded, (3) the Cisco IOS is loaded into RAM from Flash, and (4) the startup configuration file is loaded from NVRAM.

---

#### Q5. Router 記憶體類型配對

**題目原文 (Question):**

> Q5. Identify the appropriate memory type on the left that holds the memory function on the right:
> Memory types: RAM / ROM / Flash / NVRAM
> Functions: IOS and system files / Startup configuration / Running configuration / Diagnostics and boot instructions

**✅ 答案 (Answer):**

| 記憶體 (Memory) | 存放內容 (Function) |
|---|---|
| **RAM** | **Running configuration**（運行中配置；斷電即失） |
| **ROM** | **Diagnostics and boot instructions**（POST 診斷同開機指令） |
| **Flash** | **IOS and system files**（IOS 同系統檔案；斷電唔失） |
| **NVRAM** | **Startup configuration**（啟動配置；斷電唔失） |

**🧠 答題邏輯 (Reasoning):**

用「**斷電會唔會冇咗（Volatile vs Non-volatile）**」嚟分：**RAM** 係 Volatile（斷電清空），裝住而家行緊嘅 Running Configuration 同 Packet Buffer；**ROM** 係 Non-volatile 但只讀，裝 POST 同 Bootstrap（即 Q4 開機頭兩步）；**Flash** 係 Non-volatile 可寫，裝 IOS——所以 IOS 升級就係寫入 Flash；**NVRAM**（Non-Volatile RAM）係 Non-volatile 可寫，裝 Startup Configuration——即開機時由呢度讀嘅配置。最容易混淆 RAM 同 NVRAM：**Running = RAM（斷電冇）、Startup = NVRAM（斷電有）**。

**💬 英文答題句 (Exam Answer Phrase):**

> RAM is volatile and holds the running configuration; NVRAM is non-volatile and holds the startup configuration; Flash stores the Cisco IOS and system files; ROM contains the POST diagnostics and boot instructions.

---

#### Q6. Router 元件功能配對

**題目原文 (Question):**

> Q6. Identify the router functions on the right to the correct component names on the left:
> Components: AUX port / Console port / LAN interface / WAN interface
> Functions: Connects routers to external networks / Connects devices for internal networking / For remote management access / For initial configuration and CLI management access

**✅ 答案 (Answer):**

| 元件 (Component) | 功能 (Function) |
|---|---|
| **AUX port** | **For remote management access**（遠端管理，通常經 Dial-up Modem） |
| **Console port** | **For initial configuration and CLI management access**（初始配置同 CLI 管理） |
| **LAN interface** | **Connects devices for internal networking**（連接內部網絡裝置，如 Ethernet / GigabitEthernet） |
| **WAN interface** | **Connects routers to external networks**（連接外部網絡，如 Serial） |

**🧠 答題邏輯 (Reasoning):**

記「管理 vs 數據」兩大類：**Console 同 AUX 都係管理用**，但 Console 係「初次設定必用」（用 Rollover Cable 直接駁電腦嘅 COM/USB），AUX 係「遠端撥號管理」（傳統用 Modem 電話線，唔使喺現場）；**LAN 同 WAN 介面先係傳數據**：LAN 介面（GigabitEthernet 等）連內部交換機／主機，WAN 介面（Serial 等）連出外部網絡（ISP、另一間公司）。關鍵詞配對：internal → LAN、external → WAN、remote → AUX、initial → Console。

**💬 英文答題句 (Exam Answer Phrase):**

> The console port is used for initial configuration and local CLI management, the AUX port provides remote management access, LAN interfaces connect internal devices, and WAN interfaces connect the router to external networks.

---

#### Q7. Ethernet Frame / IPv4 Packet Hex 解碼（Protocol Analyzer）

**題目原文 (Question):**

> Q7. The following hex codes represent the contents of an Ethernet frame captured with a protocol analyzer.
> 0000: 23 98 45 76 66 88 21 AB 33 D4 34 56 08 00 45 FF
> 0010: 12 34 23 76 40 00 64 11 CD FF C0 A8 43 69 AC 1A
> 0020: 6F 5A 23 87 52 63 25 41 40 43 00 00 00 00 FF 75
> 0030: 20 00 35 75 00 00 82 04 05 91 70 90
> (Ethernet frame format: Preamble 8 bytes | Destination Address 6 bytes | Source Address 6 bytes | Type 2 bytes | Data variable | FCS 4 bytes)
> so that Destination MAC Address = 23 98 45 76 66 88 (hex), Source MAC Address = 21 AB 33 D4 34 56 (hex), Ethernet Type = 08 00 (hex).
> Data is a packet with the following format: The first byte value is 45 (hex).
> (a) Is this an IPv4 or IPv6 packet?
> (b) The decimal value of Time To Live (TTL): ___________________ (hex = 64)
> (c) The Source IP Address in dotted decimal: ____________________ (hex = C0 A8 43 69)
> (d) The Destination IP Address in dotted decimal: ________________ (hex = AC 1A 6F 5A)
> (e) Type of Service identifies the ________________ of the packet.
> (f) Total Length identifies the size of the  ________________ of the packet.
> (g) Protocol identifies the ______________________ to be used next.

**✅ 答案 (Answer):**

- **(a) IPv4**——第一個 Byte `45`：高 4-bit 係 Version = **4**，低 4-bit 係 IHL = 5（即 Header 5 × 4 = 20 bytes）；而且 Ethernet Type `08 00` 本身就代表 IPv4。
- **(b) TTL = 100**——`64`（Hex）= 6×16 + 4 = **100**（Decimal）。
- **(c) Source IP = 192.168.67.105**——`C0 A8 43 69` → C0=192、A8=168、43=67、69=105。
- **(d) Destination IP = 172.26.111.90**——`AC 1A 6F 5A` → AC=172、1A=26、6F=111、5A=90。
- **(e) Type of Service 辨識 Packet 嘅 priority（優先次序 / QoS）**。
- **(f) Total Length 指成個 packet（IP header + data）嘅大小**。
- **(g) Protocol 指出 upper-layer protocol（上層協議，例如 TCP / UDP）**——呢個 Frame 入面係 `11`（Hex）= 17 = **UDP**。

**🧠 答題邏輯 (Reasoning):**

呢條係「拆 Frame」實戰題，步驟固定：**第一步：定位各欄位**。題目已經幫你拆好 Frame 頭——Destination MAC（6 bytes）＝ `23 98 45 76 66 88`、Source MAC（6 bytes）＝ `21 AB 33 D4 34 56`、EtherType（2 bytes）＝ `08 00`（IPv4）。由 offset 14 開始就係 IPv4 Packet。**第二步：拆 IPv4 Header**（IHL=5 即 20 bytes 固定長度）：

| IPv4 Header 欄位 | 長度 | 呢個 Frame 嘅值 | 解讀 |
|---|---|---|---|
| Version / IHL | 1 byte | `45` | Version 4，IHL 5（×4 = 20 bytes） |
| Type of Service | 1 byte | `FF` | 優先級 / QoS |
| Total Length | 2 bytes | `12 34` | = 0x1234 = **4660 bytes**（Header + Data 總長） |
| Identification | 2 bytes | `23 76` | 封包識別碼 |
| Flags / Fragment Offset | 2 bytes | `40 00` | 分割控制 |
| Time To Live (TTL) | 1 byte | `64` | = **100**（減到 0 丟棄） |
| Protocol | 1 byte | `11` | = **17（UDP）** |
| Header Checksum | 2 bytes | `CD FF` | 頭部檢查和 |
| Source IP | 4 bytes | `C0 A8 43 69` | **192.168.67.105** |
| Destination IP | 4 bytes | `AC 1A 6F 5A` | **172.26.111.90** |

（e）（f）（g）係「欄位功能」填空：ToS 用嚟定 **priority**；Total Length 係 **成個 Packet（Header + Data）** 嘅長度（留意唔係淨係 Data）；Protocol 用嚟話畀網絡層知「跟住將 Data 交畀邊個上層協議」——值 6 係 TCP、17 係 UDP。Hex → Decimal 換算（如 64₁₆ = 100₁₀、11₁₆ = 17₁₀）一定要熟。

**💬 英文答題句 (Exam Answer Phrase):**

> The first byte 45 indicates IPv4 (version 4) with a 20-byte header. TTL 64 hex equals 100 decimal, the source IP C0 A8 43 69 is 192.168.67.105, and the destination IP AC 1A 6F 5A is 172.26.111.90. Total Length gives the size of the whole packet, Type of Service indicates priority, and Protocol identifies the upper-layer protocol (here 11 hex = 17 = UDP).

---

#### Q8. PC1 Route Table 與 R1 Routing Table 嘅 Entry 辨識

**題目原文 (Question):**

> Q8. Consider the network below.
> (Topology: PC1 (192.168.10.10) — R1 G0/0 — R1 S0/0/0 (209.165.200.225/30) — R2 S0/0/0 (209.165.200.226/30) — 10.1.1.0/24, 10.1.2.0/24; R1 G0/1 → 192.168.11.0/24)
> (a) Consider the PC1 route table below. Identify the entries for the following information:
>   - default gateway;
>   - loopback interface;
>   - PC1 address interface;
>   - route used to reach another host on the broadcast domain.
> (b) Consider the R1 routing table below. Identify the entries for the following information:
>   - directly connected routes;
>   - exit interface going to the next hop address for network 10.1.1.0.

**PC1 嘅 IPv4 Route Table（`route print` 輸出，重建）：**

| Network | Netmask | Gateway | Interface | Metric |
|---|---|---|---|---|
| 0.0.0.0 | 0.0.0.0 | 192.168.10.1 | 192.168.10.10 | 281 |
| 127.0.0.1 | 255.0.0.0 | On-link | 127.0.0.1 | 306 |
| 127.255.255.255 | 255.255.255.255 | On-link | 127.0.0.1 | 306 |
| 192.168.10.0 | 255.255.255.0 | On-link | 192.168.10.10 | 306 |
| 192.168.10.10 | 255.255.255.255 | On-link | 192.168.10.10 | 306 |
| 192.168.10.255 | 255.255.255.255 | On-link | 192.168.10.10 | 306 |
| 224.0.0.0 | 240.0.0.0 | On-link | 127.0.0.1 | 306 |
| 224.0.0.0 | 240.0.0.0 | On-link | 192.168.10.10 | 306 |
| 255.255.255.255 | 255.255.255.255 | On-link | 192.168.10.10 | 306 |

**R1 嘅 `show ip route` 輸出（重建）：**

> Gateway of last resort is 209.165.200.226 to network 0.0.0.0
> S*   0.0.0.0/0 [1/0] via 209.165.200.226, serial0/0/0
>      10.0.0.0/24 is subnetted, 2 subnets
> D    10.1.1.0 [90/2172416] via 209.165.200.226, 00:07:29, serial0/0/0
> D    10.1.2.0 [90/2172416] via 209.165.200.226, 00:07:29, serial0/0/0
> C    192.168.10.0/24 is directly connected, GigabitEthernet0/0
> L    192.168.10.1/32 is directly connected, GigabitEthernet0/0
> C    192.168.11.0/24 is directly connected, GigabitEthernet0/1
> L    192.168.11.1/32 is directly connected, GigabitEthernet0/1
> C    209.165.200.224/30 is directly connected, serial0/0/0
> L    209.165.200.225/32 is directly connected, serial0/0/0

**✅ 答案 (Answer):**

**(a) PC1 Route Table 嘅 Entry：**
- **default gateway** → 第一行 `0.0.0.0 / 0.0.0.0`（Network 0.0.0.0、Mask 0.0.0.0、Gateway **192.168.10.1**）——呢行就係 Default Route。
- **loopback interface** → `127.0.0.1 / 255.0.0.0`（同埋 127.255.255.255 嗰行）——127.0.0.0/8 係 Loopback 範圍，Interface 顯示 127.0.0.1。
- **PC1 address interface** → `192.168.10.10 / 255.255.255.255`——呢行係 PC1 自己個地址（Interface = 192.168.10.10）。
- **route used to reach another host on the broadcast domain** → `192.168.10.0 / 255.255.255.0`（Gateway = On-link）——呢條 Directly Connected Route 用嚟去同一 LAN 嘅其他 Host。

**(b) R1 Routing Table：**
- **directly connected routes** → 三條 `C` 開頭嘅 Route：**192.168.10.0/24（GigabitEthernet0/0）、192.168.11.0/24（GigabitEthernet0/1）、209.165.200.224/30（serial0/0/0）**。
- **exit interface going to the next hop address for network 10.1.1.0** → **serial0/0/0**（10.1.1.0 條 Route 顯示 `via 209.165.200.226, serial0/0/0`——Next Hop 係 209.165.200.226，出口介面係 serial0/0/0）。

**🧠 答題邏輯 (Reasoning):**

**PC 嘅 Route Table（`route print`）**：Windows 主機自己都有路由表，考你認得四類 Entry：(1) **Default Route**＝Network 0.0.0.0 / Mask 0.0.0.0——去任何未命中其他 Route 嘅目的地都用佢，Gateway 就係 Default Gateway；(2) **Loopback**＝127.0.0.0/8——代表自己部機；(3) **Host Route**＝自己 IP 配 /32（255.255.255.255）——畀本機確認「我自己個地址」；(4) **Network Route**＝192.168.10.0/24，Gateway 係 On-link——同一個 Broadcast Domain 內嘅其他 Host 就係經呢條直連 Route 到達。**Router 嘅 `show ip route`**：睇左邊嘅 code 字母——`C` = Connected（直接連接）、`L` = Local（介面自己個地址）、`S` = Static（靜態）、`D` = EIGRP、`O` = OSPF 等。Directly Connected 就係所有 `C` 行。搵「去 10.1.1.0 嘅出口介面」：喺 10.1.1.0 嗰行睇 `via <next hop>, <interface>`——`serial0/0/0` 就係答案；Next Hop（209.165.200.226）係 R2 喺鏈路上嘅地址，Router 會先喺 serial0/0/0 呢條鏈路用 ARP 解析 209.165.200.226 嘅 MAC，再包新 Frame 送出。

**💬 英文答題句 (Exam Answer Phrase):**

> In a PC route table, the 0.0.0.0/0.0.0.0 entry is the default gateway, 127.0.0.1 is the loopback interface, the /32 entry is the host's own address, and the network route with an On-link gateway reaches hosts on the same broadcast domain. In `show ip route`, routes marked C are directly connected; for 10.1.1.0, the exit interface is the one shown after the next hop, serial0/0/0.

---

## 📖 必考英文術語與答題句型庫

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| Network Layer | OSI 第 3 層，負責邏輯定址（IP）同路由選擇 | The network layer provides logical addressing and routing, forwarding packets between networks. |
| Packet / Network Layer PDU | 網絡層嘅數據單位，內含 IPv4 / IPv6 Header 同 Data | The network layer PDU is called a packet. |
| Broadcast Domain | 一個網絡（Subnet）＝一個廣播域；Router 分隔廣播域 | A broadcast domain is a network; routers separate broadcast domains. |
| Default Gateway | Host 出唔到自己網絡時交畀嘅 Router 介面 IP | The default gateway is the IP address of the router interface on the host's network. |
| IPv4 Address | 32-bit 邏輯地址，以 Dotted Decimal 表示（4 × 8-bit） | An IPv4 address is a 32-bit logical address written in dotted decimal. |
| Subnet Mask | 用嚟分出 Network ID 同 Host ID | The subnet mask identifies the network and host portions of an IP address. |
| /24, /16, /30 (Prefix Length) | 表示 Subnet Mask 有幾多個 1-bit | A /30 network has 4 addresses (2 usable) and is commonly used for point-to-point links. |
| Classful Addressing | 按 A/B/C Class 固定邊界劃分網絡 | The network uses classful boundaries, so each network uses a /24 mask. |
| Routing Table | Router 用嚟決定轉發方向嘅表（Destination / Next Hop / Interface） | A router looks up the destination in its routing table to select the exit interface. |
| Directly Connected Route | 直接接喺 Router 自己介面嘅網絡 | A directly connected route uses the interface that the network is attached to. |
| Next Hop | 下一跳 Router 嘅 IP 地址 | The next hop is the IP address of the next router toward the destination. |
| Exit Interface | Router 轉發 Packet 時用嚟送出嘅介面 | The exit interface is the interface out of which the router forwards the packet. |
| Longest Match | Router 揀最長 Prefix 嘅路由規則 | A router uses the longest match, i.e., the most specific route, when forwarding. |
| Local Host / Remote Host | 同自己同一網絡／另一網絡嘅主機 | A local host is on the same network; a remote host is on a different network. |
| Loopback Address | 127.0.0.0/8，代表自己部機 | The loopback address 127.0.0.1 refers to the host itself. |
| Hop-by-Hop Encapsulation | Frame 嘅 MAC 每跳更換、IP 全程不變 | MAC addresses change at every hop while IP addresses remain unchanged. |
| Connectionless | 傳送前唔建立連線 | IP is connectionless: no connection is established before sending data packets. |
| Best Effort | 唔保證送達，靠上層協議補救 | IP is best effort: no overhead is used to guarantee packet delivery. |
| Media Independent | 獨立於媒體運作，可經 Fragmentation 適應 MTU | IP is media independent: it operates independently of the medium carrying the data. |
| IPv6 Header | 固定 40 bytes，欄位包括 Version / Traffic Class / Payload Length / Next Header / Hop Limit | The IPv6 header has a fixed 40-byte size with a simplified field set. |
| Hop Limit | IPv6 版 TTL，每跳減 1，歸零丟棄 | Hop Limit is decremented at each hop; when it reaches 0 the packet is discarded. |
| Time To Live (TTL) | IPv4 Header 欄位，限制 Packet 存活跳數 | TTL is decremented by each router to prevent packets from looping forever. |
| Total Length | IPv4 Header 欄位，成個 Packet（Header + Data）長度 | Total Length identifies the size of the entire packet, header plus data. |
| Type of Service (ToS) | 用嚟標示 Packet 優先次序（QoS） | Type of Service identifies the priority of the packet. |
| Protocol Field | 指出上層協議（TCP=6、UDP=17） | The Protocol field identifies the upper-layer protocol to be used next. |
| User / Privileged EXEC Mode | `R1>` 同 `R1#` 兩種基本 CLI 模式 | `enable` is entered in user EXEC mode to reach privileged EXEC mode. |
| Global / Interface / Line Config Mode | 三種配置模式：全機、介面、線路 | Global commands run in `(config)#`, interface commands in `(config-if)#`, and line commands such as `login` in `(config-line)#`. |
| POST / Bootstrap / IOS | 開機三步：自檢、引導、載入系統 | ROM performs POST, then the bootstrap loads the Cisco IOS into RAM. |
| RAM / ROM / Flash / NVRAM | 四種記憶體：運行配置／開機指令／IOS／啟動配置 | RAM holds the running configuration, NVRAM the startup configuration, Flash the IOS, and ROM the boot instructions. |
| Console / AUX Port | 本機初始管理／遠端管理 | The console port is for initial configuration; the AUX port is for remote management. |
| LAN / WAN Interface | 內聯網／外聯網介面 | LAN interfaces connect internal devices, while WAN interfaces connect to external networks. |
| Hex Dump 解碼 | 由十六進制拆出 Frame / Packet 各欄位 | Decode the frame field by field: MAC addresses, EtherType, then the IP header fields. |

---

## 🗺️ 學習路線 (Learning Path)

**第 1 步：先理解（Understand）**
- 搞清楚 Network Layer 喺成個通訊流程嘅角色：由 Host 出發 → Switch（Layer 2，睇 MAC）→ Router（Layer 3，睇 IP）→ 再出另一個網絡。
- 理解「Broadcast Domain = 一個網絡」同「Router 分隔 Broadcast Domain」嘅概念；理解 `route print` 同 `show ip route` 兩張表各自代表咩。

**第 2 步：背誦（Memorise）**
- 背熟四大記憶體（RAM / ROM / Flash / NVRAM）、開機四步（POST → Bootstrap → IOS → Config）、五種 CLI 模式同對應指令。
- 背熟 IP 三大特性（CL / BE / MI）嘅關鍵詞，以及 IPv4 ↔ IPv6 Header 欄位對照。
- 背熟關鍵數字：IPv4 = 32-bit、IPv6 = 128-bit、IPv6 Header 固定 40 bytes、TTL / Hop Limit 每跳減 1、/30 = 4 個地址（2 個可用）、Protocol 6 = TCP / 17 = UDP。

**第 3 步：掌握計算與判斷（Calculate & Judge）**
- 練熟 Hex ↔ Decimal 換算（64₁₆ = 100₁₀、11₁₆ = 17₁₀），以及「Hex → Dotted Decimal」（C0 A8 43 69 → 192.168.67.105）。
- 練熟三類判斷題：(1) Local vs Remote（用 Subnet Mask 做 AND 判斷）；(2) 揀 Default Gateway（同 PC 同一網絡嘅 Router 介面）；(3) 揀 Exit Interface（直接連接 vs 經 Next Hop）。
- 練熟「拆 Frame」流程：MAC（6+6）→ EtherType（2）→ IPv4 Header（20 bytes）→ 逐欄位讀出 TTL / Protocol / Source IP / Destination IP。

**第 4 步：能解答考題（Apply in Exams）**
- 用本 Guide 嘅 Walkthrough 做「模擬試」：遮住答案，逐題寫低答案，再對答案。
- 特別重做 Q3（Frame 內 MAC 填邊個）同 Q7（Hex 解碼）——呢兩類係期中考／期末考最高頻嘅大題。
- 最後用「考前 5 分鐘懶人包」快速覆蓋全部關鍵數字同對比表。

---

## 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 關鍵數字 (Key Numbers)

| 項目 | 數字 |
|---|---|
| IPv4 Address | 32-bit（4 × 8-bit，Dotted Decimal） |
| IPv6 Address / Header | 128-bit；Header 固定 **40 bytes** |
| IPv6 Version 值 | 6 = `0110`（Binary） |
| IPv4 IHL = 5 | Header = 5 × 4 = **20 bytes** |
| TTL 64（Hex） | = **100**（Decimal） |
| Protocol 11（Hex） | = **17 = UDP**（6 = TCP） |
| /30 Network | 4 個地址，2 個可用（Point-to-Point Link 用） |
| Classful /24 | Mask 255.255.255.0，256 個地址 |
| Loopback | 127.0.0.0/8（127.0.0.1 = 自己） |

### 對比表 (Comparison Tables)

**IPv4 vs IPv6 Header**

| IPv4 欄位 | IPv6 對應欄位 | 備註 |
|---|---|---|
| Version | Version | IPv6 永遠 = 0110 |
| Type of Service (ToS) | Traffic Class | QoS / 優先級 |
| Total Length | Payload Length | IPv6 只計 Data 部分 |
| Protocol | Next Header | 上層協議（TCP / UDP） |
| Time To Live (TTL) | Hop Limit | 每跳減 1，歸零丟棄 |
| IHL / Identification / Flags / Fragment Offset / Header Checksum | （刪除） | IPv6 簡化咗 Header |

**Router 四種記憶體**

| 記憶體 | 裝咩 | 斷電 |
|---|---|---|
| RAM | Running Configuration | 冇（Volatile） |
| ROM | POST + Bootstrap | 有（只讀） |
| Flash | Cisco IOS | 有 |
| NVRAM | Startup Configuration | 有 |

**Router 開機四步**：POST（ROM）→ Bootstrap（ROM）→ Load IOS（Flash → RAM）→ Get Startup Config（NVRAM → RAM）

**五種 CLI 模式**：`R1>`（User EXEC）→ `enable` → `R1#`（Privileged EXEC）→ `configure terminal` → `R1(config)#`（Global）→ `interface` / `line` → `R1(config-if)#` / `R1(config-line)#`

**Frame 逐跳變化（黃金定律）**：IP 全程不變；MAC 每跳換成「下一跳設備」嘅 MAC。

### 英文記憶口訣 (Memory Aids)

- **開機**：**P**OST → **B**ootstrap → **I**OS → **C**onfig（「**P-B-I-C**」）
- **CL / BE / MI**：CL = **C**onnection（連線）、BE = **G**uarantee（保證）、MI = **M**edium（媒體）——「有 Connection 冇 Guarantee 冇 Media 就係 CL；有 Guarantee 字眼係 BE；有 Medium 字眼係 MI」
- **Broadcast Domain 數法**：**LANs + Serial Links**（Router 之間每條鏈路都係一個網絡）
- **揀 Exit Interface**：「**自己嘅用直接連接（Directly Connected），人哋嘅經 Next Hop**」
- **Frame 地址**：「**同網絡填 Host MAC，跨網絡填 Gateway MAC**」
- **Hex 拆 Frame**：「**MAC 6 + 6，Type 2，Header 20，跟住逐欄讀**」

---

> **最後提醒**：Tutorial 6 係 Network Layer 嘅總考核，題型離唔開「數 Broadcast Domain、填 Default Gateway、揀 Exit Interface、拆 Frame / Packet」。將上面三個 Walkthrough 同 CCNA1 八條全部做熟，考試見到任何拓撲圖都唔會慌。
