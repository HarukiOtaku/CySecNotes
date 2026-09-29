# ITE3102 L6: Network Layer — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Network Layer（含 Router 初始設定）
> **原始檔**：`01_Raw_Materials/Lectures/Lecture6_NetworkLayer.pptx`
> **題解對應**：`ITE3102_T6_Network_StudyGuide.md`（同一課嘅 Tutorial 練習題解）
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 對照題解自測 → 考前用懶人包速記

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課係整個 Network Fundamentals 嘅「Layer 3 心臟」：講清楚 **Network Layer** 到底點樣由一部 host 嘅資料，經多個網絡、多個 router，送到另一端嘅 host。內容分四大支柱（見 deck 首頁目錄）：**Network Layer Protocols**（IPv4／IPv6 封包格式同特性）、**Router Routing**（路由表、static 同 dynamic routing、Administrative Distance）、**Host Routing**（host 自己嘅路由表、default gateway、local vs remote host），以及 **Routers**（router 硬件解剖、開機流程、以及用 Cisco IOS 做初始設定）。學完呢課，你要能夠「睇住一張拓撲圖，講得出封包點行」，同時「坐低喺 CLI 前面，由零設定好一部 router」。

核心邏輯係一組「三層對照」：Network Layer 負責 **path determination and logical addressing**（選路同邏輯定址）；每個 **router interface** 連住一個獨立網絡（一個 **broadcast domain**）；而 host 要出自己個網絡，就一定要交畀 **default gateway**。封包一路上 **IP address 全程不變**，但外層 frame 嘅 **MAC address 每跳換一次**——呢條「黃金定律」係本課所有題目嘅根。

實務情境一：公司新開分支辦公室，兩部 router 用 serial link 相連，你要按 Addressing Table 為每個 interface 打 `ip address`、`no shutdown`，令直連網絡自動入路由表，再決定邊啲網絡要加 static route、邊啲交畀 OSPF／EIGRP 動態學。做完要識得用 `show ip route` 驗數（C 幾條、L 幾條、S 幾條）。

實務情境二：你接到電話「PC 上唔到網」，你喺 router 打 `show interfaces` 見到某個 interface 係 down，或者係 `ip address` 打錯網段——本課嘅「介面啟動 + 直連路由 + 驗證指令」流程就係排查 SOP。考試同實務測驗都一樣：唔係考你死背，而係考你「睇輸出、揀介面、講理由」。

➜ 實作見 `ITE3102_PT6_RouterToLAN_CodeGuide.md`（Connect a Router to a LAN 完整 CLI walkthrough）
➜ 題解見 `ITE3102_T6_Network_StudyGuide.md`（Broadcast Domain、Default Gateway、Exit Interface、Hex 拆 Packet）

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **講出 Network Layer 兩大職責** — Explain the function of the network layer: path determination and logical addressing
2. **描述端到端傳輸流程** — Describe encapsulation, addressing, routing, and de-capsulation
3. **解釋封包轉發時 Frame 點樣逐跳更換** — Explain packet forwarding and how routers re-encapsulate packets in different Layer 2 frames
4. **定義 Broadcast Domain 並推算網絡數量** — Define a broadcast domain and determine how many networks exist in a topology
5. **背誦 IP 三大特性** — Describe the characteristics of IP: connectionless, best effort, media independent
6. **拆解 IPv4 Packet Header 欄位** — Identify the IPv4 header fields: Version, IHL, DS, Total Length, Identification, Flags, Fragment Offset, TTL, Protocol, Header Checksum, Source/Destination Address
7. **列出 IPv4 三大限制** — Describe the limitations of IPv4: IP address depletion, internet routing table expansion, lack of end-to-end connectivity
8. **對比 IPv6 Header 同功能** — Identify IPv6 header fields and features: 128-bit addressing, simplified header, no NAT, integrated security
9. **分辨 Host 三種轉發目標** — Distinguish itself (loopback), local host, and remote host
10. **解釋 Default Gateway 嘅作用** — Explain the role of the default gateway
11. **分辨動態與靜態指派 IP** — Distinguish DHCP-assigned and statically assigned IP addresses
12. **讀懂 Host Routing Table** — Identify default gateway, loopback, host route, and on-link network entries
13. **講出 Router 四大功能** — Describe router functions and the routing table lookup process
14. **分辨 Directly Connected 與 Remote Network** — Distinguish directly connected networks from remote networks
15. **解讀 Routing Table 代碼** — Interpret route source codes: C, L, S, D, O
16. **設定 direct route 與 static route** — Configure direct routes, static routes, and default static routes
17. **解釋 Administrative Distance** — Explain how the lowest Administrative Distance wins
18. **解釋 Dynamic Routing 與 Convergence** — Explain dynamic routing protocols and router convergence
19. **列出 Router 硬件組件** — List router components: CPU, IOS, RAM, ROM, NVRAM, Flash
20. **排列 Router 開機四步** — Order the router boot-up process: POST, bootstrap, IOS, startup configuration
21. **分辨 Console／AUX／LAN／WAN 介面** — Identify console port, AUX port, LAN and WAN interfaces
22. **執行 Router 初始設定** — Perform initial settings, configure interfaces, verify with show commands, save the configuration

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 Network Layer 嘅功能（The Network Layer）

繁中解說：Network Layer 係 OSI 第 3 層，佢嘅工作只有兩件核心事：**path determination**（選路——決定由來源去目的地嘅最佳路徑）同 **logical addressing**（邏輯定址——用 IP address 識別每個裝置同每個網絡）。佢唔管底層係銅線、光纖定無線，亦唔負責保證送到——呢兩點喺 §3.6 會展開。
> **English Standard Definition:** The function of the network layer is to determine the best path through the network (path determination and logical addressing).

### 3.2 端到端傳輸流程（End to End Transport Processes）

繁中解說：一個 packet 由上升下降，一共四個階段，次序要背死：**(1) Encapsulation（封裝）**——Network Layer 由上一層（Transport Layer）收到一個 **segment**，加上一個 **Network header**，就變成一個 **packet**；呢個 header 入面有 **source address**、**destination address** 同其他 **control information**（例如 TTL、Protocol），之後個 packet 會落去 **Data Link Layer** 再被包成一個 **frame**。**(2) Addressing（定址）**——網上每一部裝置都必須有一個獨一無二嘅地址（IP address）。**(3) Routing（路由）**——中介設備即係 **routers**，負責將 packet（裝喺 frame 入面）逐步轉發向目的地。**(4) De-capsulation（解封裝）**——目的地主機先檢查 destination address，核實「呢個 packet 係唔係寄畀我」；確認後 Network Layer 拆走 Network header，將內含嘅 Transport layer segment 交上去畀 Transport Layer 上對應嘅服務。
> **English Standard Definition:** The network layer receives the Transport layer segment and adds a network header, so the segment becomes a packet; the network header contains a source address, a destination address, and other control information.
> **English Standard Definition:** Addressing means each device must have a unique address; routing means intermediary devices, called routers, are used to route packets (inside frames) toward the destinations.
> **English Standard Definition:** In de-capsulation, the destination host examines the destination address to verify that the packet was addressed to this device, the packet is de-capsulated by the network layer, and the Transport layer segment is passed up to the appropriate service at the Transport layer.

### 3.3 Packet Forwarding：Frame 逐跳更換（Packet Forwarding）

繁中解說：呢頁係本課最實用嘅例子——PC1 → R1 → R2 → R3 → PC2，重點係「**同一個 packet，每段鏈路換一次外層 frame**」：**PC1** 將 packet 包入一個 **Ethernet frame** 送去 **R1**；**R1** 收到 frame，**取出 packet**，再包入**另一個 Ethernet frame** 送去 **R2**；**R2** 收到 frame，取出 packet，今次包入一個 **PPP frame**（另一種 Layer 2 frame，**唔需要 MAC address**）送去 **R3**；**R3** 收到 frame，取出 packet，又包返做 **Ethernet frame** 送去 **PC2**；**PC2** 收到 frame，取出 packet。沿途 PC1 造嘅 packet 係 **source IP = 192.168.1.10**、**destination IP = 192.168.4.10**——呢兩個 IP **由 PC1 去到 PC2 全程都不變**；變嘅只有外層 frame 嘅格式同 MAC 地址（Ethernet → PPP → Ethernet）。
> **English Standard Definition:** R1 receives the frame, takes out the packet, and encapsulates the packet in another Ethernet frame sending to R2; R2 encapsulates the packet in a PPP frame (a different type of Layer 2 frame, no MAC address required) sending to R3.
> **English Standard Definition:** PC1 prepared a packet with source IP 192.168.1.10 and destination IP 192.168.4.10 — these will not change when the packet travels from PC1 to PC2.

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` Q3（MAC 每跳改、IP 全程不變）

### 3.4 Broadcast Domain 同網絡數量（Broadcast Domains）

繁中解說：**Broadcast domain** 係一個邏輯網絡，由所有「可以經 Data Link Layer broadcast address 一個 frame 送到」嘅電腦同網絡設備組成。鐵律：**每一個 router interface 就係一個獨一無二網絡嘅 gateway**——換句話講，**router 分隔 broadcast domain**；同一部 switch 上面嘅裝置屬於**同一個**網絡。點解要分？因為網絡愈大問題愈多（broadcast 泛濫、管理困難、故障影響面大），將一個大網絡切成多個互通嘅細網絡，就可以「至少局部」緩解呢啲問題。Deck 嘅例子係一句「How Many Networks?」配一幅多 router 拓撲圖，答案係 **12 networks**，即圖中有 12 個 broadcast domain（每個 LAN 加每條 router-to-router 鏈路各算一個）。
> **English Standard Definition:** A broadcast domain is a logical network composed of all the computers and networking devices that can be reached by sending a frame to the data link layer broadcast address.
> **English Standard Definition:** Each router interface defines a gateway for a unique network. Devices connected to a switch belong to the same network; each router interface connects to a network (broadcast domain).
> **圖示描述**：deck 第 6 頁嘅拓撲圖係多部 router 同 switch 互相連接，題目問「有幾多個網絡？」，答案標示 **12 networks**；圖本身抽唔到更多文字，數法就係「每個 LAN + 每條 router-to-router link 各一個 broadcast domain」。

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` Q1(a)、Q2\*(a)（Broadcast Domain = LANs + Serial Links）

### 3.5 常用 Network Layer Protocols（Common Network Layer Protocols）

繁中解說：呢頁只有標題同一幅圖，係用嚟帶出「網上最常用嘅 Network Layer protocol 就係 IPv4 同 IPv6」，跟住落去兩節就逐個 protocol 拆欄位（IPv4 見 §3.7、IPv6 見 §3.9）。
> **圖示描述**：deck 第 7 頁原文只有標題「Common Network Layer Protocols」，正文全部喺圖內，文字抽唔到；本課嘅實質內容由 §3.6（IP 特性）開始逐頁展開。

### 3.6 IP 嘅三大特性（Characteristics of IP）

繁中解說：IP 有三個必背特性，考試最愛將一句英文描述掉亂叫你配對 **CL（Connectionless）／ BE（Best Effort）／ MI（Media Independent）**。**Connectionless（無連接）**：傳數據封包之前唔會先建立連線；送方唔知收方有冇收到（The sender doesn't know if the receiver gets the packets）；收方唔知封包幾時到（The receiver doesn't know when the packets are arriving）。**Best Effort Delivery（盡力而為）**：完全冇 overhead 用嚟保證封包送到（No overhead is used to guarantee packet delivery）；可靠度由**上層嘅 connection-oriented protocol**（例如 TCP）負責——追蹤封包、確保送達。**Media Independent（媒體無關）**：獨立於承載資料嘅媒介運作——光纖、衛星、無線都可以路由同一個封包；實際資料被封裝喺 network layer PDU 入面；IP 會**按網絡存取類型調整封包大小**（即 MTU 差異時做 fragmentation）。
> **English Standard Definition:** IP is connectionless: no connection is established before sending data packets, the sender doesn't know if the receiver gets the packets, and the receiver doesn't know when the packets are arriving.
> **English Standard Definition:** IP uses best effort delivery: no overhead is used to guarantee packet delivery; upper-layer connection-oriented protocols manage the process of tracking packets and ensuring their delivery.
> **English Standard Definition:** IP is media independent: it operates independently of the medium carrying the data (fiber optics cabling, satellites, and wireless can all be used to route the same packet), and it will adjust the size of the packet according to the type of network access.

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` CCNA1 Q1（CL／BE／MI 配對）

### 3.7 IPv4 Packet Header 同欄位（IPv4 Packet Header / IPv4 Header Fields）

繁中解說：IPv4 packet header 係一格格嘅 4-byte（32-bit）欄位，由第 1 個 byte 順住讀落去：

| 欄位 (Field) | 中文解釋 | 考試要點 |
| :--- | :--- | :--- |
| **Version** | IP 版本號 | IPv4 就係 **4** |
| **IHL（IP Header Length）** | Header 長度，單位係 **4-byte word** | 最小值係 **5**，即 5 × 4 = **20 bytes** |
| **Differentiated Services（DS）** | 由 **DSCP** 同 **ECN** 兩部分組成 | 用嚟畀每個 packet 一個優先次序（priority／QoS） |
| **Total Length** | 封包嘅資料部分大小 | 考填空：「identifies the size of the data portion of the packet」 |
| **Identification** | 封包識別碼 | 做 fragmentation 重組時用 |
| **Flag / Fragment Offset** | 旗標／分片偏移 | `MF`（more fragment）旗標配合 Fragment Offset，喺目的地重組封包 |
| **Time To Live（TTL）** | 生存時間 | **每經過一個 hop 就減 1**，防止封包喺 routing loop 度不停兜圈 |
| **Protocol** | 指出下一個要用嘅上層協議 | 十進位例子：**1 = ICMP、6 = TCP、17 = UDP** |
| **Header Checksum** | Header 檢查和 | 驗證 header 有冇損壞 |
| **Source / Destination Address** | 封包來源／目的地嘅 Network layer host address | 兩個全程不變 |
| **Options（optional）／ Padding** | 選項／填充位 | 非必需 |

> ⚠️ 技術上（RFC 791）IPv4 **Total Length** 欄位係 IP header + data 嘅總長；ITN 講義（Lecture 6）用語係 “size of the data portion of the packet”。考卷若問 "size of the ____ of the packet" 請跟講義答 **data portion**。

> **English Standard Definition:** Version contains the IP version number (4). Header Length (IHL) specifies the size of the packet header in 4 byte words (the minimum size is 5, meaning 5 × 4 = 20 bytes).
> **English Standard Definition:** Type of Service is used to assign a priority to each packet; Total Length is the size of the data portion of the packet.
> **English Standard Definition:** Time to Live (TTL) is decremented at each hop to prevent packets being passed around the network in routing loops.
> **English Standard Definition:** Protocol indicates the upper-layer protocol to be used next; example values (decimal) are 1 - ICMP, 6 - TCP, 17 - UDP.
> **English Standard Definition:** Fragment offset: when fragmentation occurs, the packet uses this field with the MF (more fragment) flag to reconstruct the packet at the destination.
> **圖示描述**：deck 第 9 頁係 IPv4 Packet Header 欄位圖，橫向分 byte 1 至 byte 4：第一行 Version / IP Header Length / Differentiated Services（DSCP + ECN）/ Total Length，第二行 Identification / Flag / Fragment Offset，第三行 Time To Live / Protocol / Header Checksum，之後兩行係 Source IP Address 同 Destination IP Address，最底一行係 Options（optional）同 Padding。

### 3.8 IPv4 嘅三大限制（Limitation IPv4）

繁中解說：IPv4 只有 32-bit 地址空間，所以有三個致命限制，亦係 IPv6 出現嘅原因。**(1) IP address depletion（地址枯竭）**：IPv4 大約有 **4 billion（40 億）**個地址，但支援 IP 嘅新裝置數量指數式增長，需求遠超供應。**(2) Internet routing table expansion（互聯網路由表膨脹）**：routing table 裝住去唔同網絡嘅 route 用嚟做最佳選路，愈多裝置同伺服器上網就愈多 route 要記錄；route 數量太大會**拖慢 router**。**(3) Lack of end-to-end connectivity（缺乏端到端連通性）**：**NAT（Network Address Translation）**被造出嚟令多部裝置共用一個 IPv4 地址，但因為地址係共用嘅，對啲要求真正端到端連通嘅技術就會造成問題。
> **English Standard Definition:** Although there are about 4 billion IPv4 addresses, the exponential growth of new IP-enabled devices has increased the need.
> **English Standard Definition:** A large number of routes can slow down a router.
> **English Standard Definition:** Network Address Translation (NAT) was created for devices to share a single IPv4 address; however, because they are shared, this can cause problems for technologies that require end-to-end connectivity.

### 3.9 IPv6 Packet Header 同欄位（IPv6 Packet Header / IPv6 Header Fields）

繁中解說：IPv6 header 簡化好多，只有固定幾個欄位：

| 欄位 (Field) | 中文解釋 | 考試要點 |
| :--- | :--- | :--- |
| **Version** | 版本 | 永遠等於 **0110**（二進制）＝ 6 |
| **Traffic Class** | 流量類別 | 為 **congestion control**（壅塞控制）分類／定優先次序 |
| **Flow Label** | 流程標籤 | **同一個 flow 會得到相同嘅處理** |
| **Payload Length** | 載荷長度 | 等於 IPv4 嘅 **Total Length** |
| **Next Header** | 下一個 header | 即係 **Layer 4 Protocol**（等於 IPv4 嘅 Protocol 欄位） |
| **Hop Limit** | 跳數上限 | **取代 IPv4 嘅 TTL** |
| **Source / Destination Address** | 來源／目的地 Network layer host address | 全程不變 |

> **English Standard Definition:** Version = 0110; Traffic Class = priority for congestion control; Flow Label = the same flow will receive the same handling; Payload Length = same as total length; Next Header = Layer 4 protocol; Hop Limit = replaces the TTL field.
> **圖示描述**：deck 第 12 頁係 IPv6 Packet Header 欄位圖，第一行 Version / Traffic Class / Flow Label，第二行 Payload Length / Next Header / Hop Limit，之後係 Source IP Address 同 Destination IP Address，同樣以 byte 1 至 byte 4 標示。

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` CCNA1 Q2（IPv6 Header 欄位配對）

### 3.10 IPv6 嘅四大特性（IPv6 Features）

繁中解說：IPv6 針對 IPv4 三個限制落藥，四大賣點：**(1) Increased address space**——用 **128-bit** 階層式定址。**(2) Improved packet handling**——header 簡化、欄位更少，轉發更有效率。**(3) Eliminates the need for NAT**——因為有大量公開 IPv6 地址可用，唔使再靠共用地址。**(4) Integrated security**——支援 **authentication（認證）** 同 **privacy（私隱）**。
> **English Standard Definition:** IPv6 provides an increased address space using 128-bit hierarchical addressing, improved packet handling with a simplified header with fewer fields, the elimination of the need for NAT because a large number of public IPv6 addresses are available, and integrated security with authentication and privacy supported.

### 3.11 Host 轉發決策（Host Forwarding Decision）

繁中解說：一部 host 要發 packet 之前，第一件事係判斷收件人係邊一類，分三種。**Itself（自己）**：host 可以 ping 自己——將 packet 送去特殊 IPv4 地址 **127.0.0.1**，呢個叫 **loopback interface**；ping loopback 係用嚟**測試本機嘅 TCP/IP protocol stack** 正唔正常。**Local host（本地主機）**：同發送方**同一個本地網絡**嘅 host，兩者**共用同一個 network address**。**Remote host（遠端主機）**：喺**另一個網絡**嘅 host，兩者唔共用 network address；packet 入面雖然寫住遠端 host 嘅 IP address，但**外層 frame 會被送去 default gateway**，由 gateway 經最佳路徑路由去目的地。
> **English Standard Definition:** A host can ping itself by sending a packet to a special IPv4 address of 127.0.0.1, which is referred to as the loopback interface; pinging the loopback interface tests the TCP/IP protocol stack on the host.
> **English Standard Definition:** A local host is a host on the same local network as the sending host; the hosts share the same network address.
> **English Standard Definition:** A remote host is a host on a remote network; the hosts do not share the same network address. The packet contains the IP address of the remote host, but it will be encapsulated into a frame sending to the default gateway which will route the packet via the best path to the destination.

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` Q3(b)（127.0.0.1 → itself、同網段 → local、跨網段 → remote）

### 3.12 Default Gateway（預設閘道）

繁中解說：**Default gateway** 就係「出自己網絡嘅大門」：佢負責**將流量路由去其他網絡**（Routes traffic to other networks）；佢自己嘅 IP address **必定喺同一個地址範圍內**（同網絡上其他 host 同一網段）；佢可以**收資料入、轉資料出**（Can take data in and forward data out）。考場記法：default gateway 嘅 IP ＝ 同該 host **同一網絡**嗰個 **router interface** 嘅 IP。
> **English Standard Definition:** The default gateway routes traffic to other networks; it has a local IP address in the same address range as other hosts on the network; and it can take data in and forward data out.

### 3.13 為 Host 啟用 IP（Enable IP on a Host）

繁中解說：host 攞 IP 有兩條路。**Dynamically Assigned IP Address（動態指派）**：由伺服器用 **DHCP（Dynamic Host Configuration Protocol）**自動派 IP 資料。**Statically Assigned IP address（靜態指派）**：人手為 host 設定 **IP address、subnet mask、default gateway**，仲可以額外指定 **DNS server IP address**。
> **English Standard Definition:** Dynamically assigned IP address information is assigned by a server using Dynamic Host Configuration Protocol (DHCP).
> **English Standard Definition:** With a statically assigned IP address, the host is manually assigned an IP address, subnet mask, and default gateway; a DNS server IP address can also be assigned.

### 3.14 Host Routing Table（主機路由表）

繁中解說：連 host 自己都有 routing table（Tutorial 6 題解 CCNA1 Q8 嘅 PC route table 就係 Windows `route print` 嘅輸出），每一行係「Network / Mask」配一個 interface 或 gateway。必背四類 entry（deck 用 PC1 = 192.168.10.10 做例）：

| Network / Mask | 意思 |
| :--- | :--- |
| **0.0.0.0 – 0.0.0.0** | **Default route**：access the default gateway via interface 192.168.10.10（去任何未命中其他 route 嘅目的地） |
| **127.0.0.1 – 255.255.255.255** | **Loopback interface**（代表本機自己） |
| **192.168.10.0 – 255.255.255.0** | 直連網絡 route：用嚟去**同一個 broadcast domain** 上面另一部 host |
| **192.168.10.10 – 255.255.255.255** | **PC1 自己嘅地址**（host route，/32） |

> **English Standard Definition:** The 0.0.0.0 – 0.0.0.0 entry accesses the default gateway via the interface; the 127.0.0.1 entry is the loopback interface; the 192.168.10.0 – 255.255.255.0 entry is the route used to reach another host on the broadcast domain; and the 192.168.10.10 – 255.255.255.255 entry is the PC1 address interface.

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` CCNA1 Q8(a)（認出 default gateway、loopback、host route、on-link route）

### 3.15 Router 嘅功能（Router Functions）

繁中解說：Router 唔止「駁線」，佢有四大職責：**(1)** 將一個網絡接到另一個網絡（Connects one network to another network）；**(2)** 喺**轉發流量去路徑上下一個 router 之前**，先決定去目的地嘅最佳路徑（Determines the best route to the destination）；**(3)** 負責網絡之間嘅流量路由（Responsible for routing traffic between networks）；**(4)** 用 **routing table** 揀去目的地最有效率嘅路徑（Uses routing table to determine the most efficient path）。
> **English Standard Definition:** A router connects one network to another network, determines the best route to the destination before forwarding traffic to the next router along the path, is responsible for routing traffic between networks, and uses a routing table to determine the most efficient path to reach the destination.

### 3.16 目的地網絡：Directly Connected vs Remote（Destination Networks）

繁中解說：對一部 router 嚟講，網絡分兩類：**Directly-connected network（直連網絡）**係直接接喺 router 某個 interface 上嘅網絡；**Remote network（遠端網絡）**係要**經另一部 router**才到嘅網絡。Deck 嘅例子圖中共有 **5 個 network**，兩部 router 各自嘅分類如下：

| Router | Directly connected networks | Remote networks |
| :--- | :--- | :--- |
| **R1** | 192.168.10.0/24、192.168.11.0/24、209.165.200.224/30 | 10.1.1.0/24、10.1.2.0/24 |
| **R2** | 10.1.1.0/24、10.1.2.0/24、209.165.200.224/30 | 192.168.10.0/24、192.168.11.0/24 |

即係：**自己個 LAN 同兩部 router 之間嘅 link（209.165.200.224/30）係直連；對方 router 嘅 LAN 就係 remote**。
> **English Standard Definition:** A directly-connected network is connected to a router interface; a remote network is connected to another router.
> **English Standard Definition:** For R1, directly connected networks are 192.168.10.0/24, 192.168.11.0/24 and 209.165.200.224/30, and remote networks are 10.1.1.0/24 and 10.1.2.0/24.

### 3.17 Router Routing Table 入面嘅資訊（Router Routing Tables）

繁中解說：router 嘅 routing table 每一行都包含幾類資訊，考試最愛考「呢個 code 代表咩」：

| Code | 代表 | 中文解釋 |
| :--- | :--- | :--- |
| **C** | directly connected | 直連網絡，**當一個 interface 設定好 IP address 並啟動之後自動產生** |
| **L** | local interface | 該 router interface 自己嘅地址（/32） |
| **S** | static route | 人手設定嘅靜態路由 |
| **D** | Enhanced Interior Gateway Routing Protocol（EIGRP） | 由 EIGRP 學到 |
| **O** | Open Shortest Path First（OSPF） | 由 OSPF 學到 |
| **（其他）** | Other dynamic routing protocols | deck 呢頁只寫住「Other dynamic routing protocols」，其餘動態協議見 §3.23 |

其他關鍵欄位：**Exit interface（出口介面）**——packet 由呢個 interface 轉發出去；**Next-hop（下一跳）**——packet 會被轉發去 next-hop router，而**直連網絡冇 next-hop address**；**Hop count（跳數）**——一個 packet 要穿過幾多部 router。
> **English Standard Definition:** C — a directly connected network, automatically created when an interface is configured with an IP address and activated; L — a local interface (the interface on the router); S — static route; D — Enhanced Interior Gateway Routing Protocol; O — Open Shortest Path First.
> **English Standard Definition:** The exit interface is the interface the packet is forwarded out of; the next-hop is the next-hop router the packet is forwarded to (directly connected networks have no next-hop address); the hop count is the number of routers a packet must traverse.
> **圖示描述**：deck 第 24 頁「Directly Connected Network Entry Identifiers」同第 35 頁「Remote Network Routing Entries」都係 routing table 輸出嘅截圖，用嚟標示直連（C／L）同遠端（有 next-hop／exit interface）entry 嘅樣；文字版可以睇 §3.21 同 §3.22 嘅 `show ip route` 輸出。

### 3.18 Router 嘅路由決策（Router Routing Decisions）

繁中解說：當 router 收到一個去**遠端網絡**嘅 packet，佢做四步，次序唔可以亂：**(1)** 查自己嘅 routing table，決定由邊度送出；**(2)** **睇 destination IP**，推算出**目的地網絡**——記住：**source 同 destination IP address 全程都唔會變**；**(3)** 查 routing table，搵一條去該目的地網絡嘅 route；**(4)** 將 packet **重新封裝（re-encapsulate）入另一個 frame**（**所以 physical address 會變**），再由適當嘅 **exit interface** 送出。
> **English Standard Definition:** When a router receives a packet destined for a remote network, the router has to look at its routing table to determine where to forward the packet.
> **English Standard Definition:** The destination IP is examined to determine the destination network (the source and destination IP addresses never change); the routing table is consulted to look for a route to the destination network; the router re-encapsulates the packet into another frame (the physical addresses change), which is then sent via the appropriate exit interface.

### 3.19 Direct Routes：設定介面就自動產生（Direct Routes）

繁中解說：**Direct route** 係「當一個 interface 設定好 IP address 並啟動之後自動建立」嘅路由——你唔需要打任何 route 指令，只要設定好 interface，`C` 同 `L` 兩條 entry 就會自己出現喺 routing table。Deck 嘅指令示範（R1 同 R2 各設兩個 LAN interface 加一個 serial interface）：

```text
R1# int g0/0                                   ! 由 privileged EXEC 進入 G0/0 介面設定模式
R1(config-if)# ip address 192.168.10.1 255.255.255.0   ! 設定介面 IP + subnet mask（/24）
R1(config-if)# no shutdown                     ! 啟動介面（唔打就唔會 up）
R1(config-if)# exit                            ! 離開介面設定模式
. . . . .                                      ! 略過中間步驟
R1(config-if)# ip address 192.168.11.1 255.255.255.0   ! ...for g0/1（第二個 LAN 介面）
R1(config-if)# ip address 209.165.200.225 255.255.255.252  ! ...for s0/0/0（去 R2 嘅 WAN link，/30）
```

```text
R2# int g0/0                                   ! 進入 R2 嘅 G0/0 介面設定模式
R2(config-if)# ip address 10.1.1.1 255.255.255.0   ! 設定介面 IP + subnet mask（/24）
R2(config-if)# no shutdown                     ! 啟動介面
R2(config-if)# exit                            ! 離開介面設定模式
. . . . .                                      ! 略過中間步驟
R2(config-if)# ip address 10.1.0.1 255.255.255.0   ! ...for g0/1（deck 原文寫 10.1.0.1）
R2(config-if)# ip address 209.165.200.226 255.255.255.252  ! ...for s0/0/0（去 R1 嘅 WAN link，/30）
```

> ⚠️ **要留意嘅課本不一致**：deck 第 23 頁寫 R2 嘅 G0/1 係 **10.1.0.1 255.255.255.0**，但同一個 deck 第 20 頁（remote／directly connected 清單）同第 30 頁（`show ip route` 輸出）都寫 **10.1.2.0/24、10.1.2.1**。考試唔會同時考兩個版本；答題時以「拓撲圖／題目俾嘅 Addressing Table」為準，並識得講「呢兩版唔一致」——呢種「睇得出矛盾」嘅能力本身係得分位。
> **English Standard Definition:** Direct routes are created when an interface is configured with an IP address and is activated.
> **圖示描述**：deck 第 25 頁「Directly Connected Example」係一幅 router 介面設定完之後嘅示意圖，配搭本節嘅指令同 §3.21 嘅 routing table 輸出。

➜ 實作見 `ITE3102_PT6_RouterToLAN_CodeGuide.md`（Part 2 設定介面、`no shutdown`、`show ip route` 驗數）

### 3.20 Static Routes 同 Default Static Route（Static Routes）

繁中解說：當直連介面已經入到 routing table，就可以加 **static route**。Static route 嘅特性要背熟：**人手設定**（manually configured），唔會自動學；佢定義**兩個網絡設備之間一條明確（explicit）嘅路徑**；如果**拓撲改變，必須人手更新**——呢個係最大缺點；好處係 **improved security and control of resources**（安全性提升、資源控制更好）。兩條指令格式（deck 原文）：

```text
ip route network mask {next-hop-ip | exit-intf}      ! 為一個特定網絡設 static route（可揀 next-hop IP 或出口介面）
ip route 0.0.0.0 0.0.0.0 {exit-intf | next-hop-ip}   ! 設 default static route（去任何未知目的地）
```

**Default static route 幾時用？** 當 routing table 入面**冇**去該目的地網絡嘅路徑時，就用 default static route 頂上——即係「其他全部唔知點去嘅，就交畀你」。R1 嘅示範：

```text
R1(config)# ip route 0.0.0.0 0.0.0.0 Serial0/0/0   ! 所有未知目的地都由 S0/0/0 出去（經 R2）
```

> **English Standard Definition:** Static routes are manually configured; they define an explicit path between two networking devices; static routes must be manually updated if the topology changes; their benefits include improved security and control of resources.
> **English Standard Definition:** Configure a static route to a specific network using the `ip route network mask {next-hop-ip | exit-intf}` command, and configure a default static route using the `ip route 0.0.0.0 0.0.0.0 {exit-intf | next-hop-ip}` command.
> **English Standard Definition:** A default static route is used when the routing table does not contain a path for a destination network.

### 3.21 R1 嘅 Routing Table 輸出（R1 Routing Table Entries）

繁中解說：呢個係 R1 做完 §3.19 + §3.20 之後嘅實況輸出，要識得逐行讀。留意 `C` 同 `L` 通常成對出現（`C` = 整個直連網絡，`L` = 介面自己嗰個 /32 地址）：

```text
R1# show ip route                              ! 顯示 IPv4 routing table（存喺 RAM）
< . . . . . >                                  ! 略去輸出中間部分
S*   0.0.0.0/0 is directly connected, Serial0/0/0   ! S* = default static route，由 S0/0/0 出
C    192.168.10.0/24 is directly connected, GigabitEthernet0/0   ! C = 直連網絡
L    192.168.10.1/32 is directly connected, GigabitEthernet0/0   ! L = 介面自己嘅地址（/32 host route）
C    192.168.11.0/24 is directly connected, GigabitEthernet0/1   ! 第二個直連 LAN
L    192.168.11.1/32 is directly connected, GigabitEthernet0/1   ! 第二個介面自己嘅地址
C    209.165.200.224/30 is directly connected, Serial0/0/0       ! 去 R2 嘅 WAN link（/30）
L    209.165.200.225/32 is directly connected, Serial0/0/0       ! serial 介面自己嘅地址
```

對應嘅「目的地網絡 → 出口介面」：192.168.10.0/24 → **G0/0**、192.168.11.0/24 → **G0/1**、209.165.200.224/30 → **S0/0/0**（三者都係直連）；10.1.1.0/24 同 10.1.2.0/24 → **S0/0/0**（remote，經 default static route 出去）。
> **English Standard Definition:** The output of `show ip route` lists the destination networks with their route source code and exit interface; routes marked C are directly connected networks and routes marked L are the router's own local interfaces.

### 3.22 R2 嘅 Static Routes 同 Routing Table（Static Routes on R2 / R2 Routing Table Entries）

繁中解說：R2 唔用 default route，而係**逐個網絡設 static route**，兩種寫法都示範咗——一個用**出口介面**（`s0/0/0`），一個用 **next-hop IP**（`209.165.200.225`，即 R1 嘅 serial 地址）：

```text
R2(config)# ip route 192.168.10.0 255.255.255.0 s0/0/0          ! static route 用出口介面（exit interface）
R2(config)# ip route 192.168.11.0 255.255.255.0 209.165.200.225  ! static route 用 next-hop router 嘅 IP
```

R2 設完之後嘅 output：

```text
R2# show ip route                              ! 顯示 R2 嘅 IPv4 routing table
< . . . . . >                                  ! 略去輸出中間部分
S    192.168.10.0/24 is directly connected, Serial0/0/0          ! S = static route
S    192.168.11.0/24 [1/0] via 209.165.200.225                   ! [1/0] = AD 1、metric 0，經 next-hop 209.165.200.225
C    10.1.1.0/24 is directly connected, GigabitEthernet0/0       ! 直連 LAN
L    10.1.1.1/32 is directly connected, GigabitEthernet0/0       ! 介面自己嘅地址
C    10.1.2.0/24 is directly connected, GigabitEthernet0/1       ! 第二個直連 LAN
L    10.1.2.1/32 is directly connected, GigabitEthernet0/1       ! 介面自己嘅地址
C    209.165.200.224/30 is directly connected, Serial0/0/0       ! 去 R1 嘅 WAN link
L    209.165.200.226/32 is directly connected, Serial0/0/0       ! serial 介面自己嘅地址
```

> **English Standard Definition:** A static route can be configured with an exit interface or with the next-hop IP address of the next router toward the destination.
> **English Standard Definition:** In `[1/0] via 209.165.200.225`, the first number is the Administrative Distance of the static route (1) and the second is the metric.

### 3.23 Dynamic Routing Protocols（動態路由協議）

繁中解說：唔想逐個網絡人手加 route，就用 **routing protocol**：routers **用 routing protocols 動態分享自己嘅 routing information**，令網絡可以**自動適應拓撲改變**（topology changes）——例如某條 link 斷咗，router 會自動改行第二條路。本課點名嘅動態協議有 **EIGRP**（代碼 D）同 **OSPF**（代碼 O），routing table 仲會見到其他動態協議嘅代碼。
> **English Standard Definition:** Routers use routing protocols to dynamically share their routing information; this allows the network to adjust to changes in the topology automatically.

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` Q8(b)（睇 `D`／`O` code 認動態學到嘅路由）

### 3.24 Administrative Distance（管理距離）

繁中解說：如果同一個目的地**同時有幾條路徑**（例如一條 static 加一條 OSPF），router 會揀 **Administrative Distance（AD）最低**嗰條，AD 越低代表越可信。Deck 明示嘅三個數一定要背：**directly connected route = 0**（最可信）、**static route = 1**、**EIGRP-discovered route = 90**（最不可信）。即係 **directly connected（0）＞ static（1）＞ EIGRP（90）**。
> **English Standard Definition:** If multiple paths to a destination are configured on a router, the path installed in the routing table is the one with the lowest Administrative Distance (AD).
> **English Standard Definition:** A static route with an AD of 1 is more reliable than an EIGRP-discovered route with an AD of 90; a directly connected route with an AD of 0 is more reliable than a static route with an AD of 1.

### 3.25 Dynamic Routing 同收斂（Dynamic Routing / Convergence）

繁中解說：**Dynamic routing** 係 routers 之間交換「**遠端網絡嘅 reachability（可達性）同 status（狀態）**」嘅資訊。當所有 router **完成交換同更新自己嘅 routing table**，我哋就話呢個網絡已經 **converged（收斂）**——收斂完成之前，部分 router 嘅路由表係未齊嘅，可能會有短暫不通。動態路由輸出示例（deck 第 34 頁）：假設 R1 同 R2 都設定咗 **EIGRP**，**`D*EX`** 代表 **default external route forwarded by EIGRP**（EIGRP 轉發出去嘅外部預設路由），而 **`D`** 代表**根據 R2 嘅 update 而安裝落 routing table 嘅 route**——即 R2 將自己嘅 LAN advertise 出嚟，R1 學到。
> **English Standard Definition:** Dynamic routing is used by routers to share information about the reachability and status of remote networks.
> **English Standard Definition:** Routers have converged after they have finished exchanging and updating their routing tables.
> **English Standard Definition:** `D*EX` identifies a default external route forwarded by EIGRP, and `D` identifies a route installed based on the update from R2 advertising its LANs.

### 3.26 Remote Network Routing Entries（遠端網絡路由 Entry）

繁中解說：當 router 學到／設定好去遠端網絡嘅 route，routing table 就會出現唔係 `C` 或 `L` 開頭嘅 entry。呢類 entry 嘅特徵係**一定有 next-hop 或 exit interface 指去「向目的地嘅下一個 router」**（例如 `[90/2172416] via 209.165.200.226, serial0/0/0`）。考試常考「指出某個遠端網絡嘅 exit interface」。
> **English Standard Definition:** Remote network entries in the routing table identify the next hop or exit interface that leads toward the destination network.
> **圖示描述**：deck 第 35 頁係 routing table 截圖，示範遠端網絡 entry（非 C／L）點樣標明 next-hop 同 exit interface；文字版見 §3.21 嘅 default static route `S*` 同 §3.22 嘅 `S` entry。

### 3.27 Router 都係一部電腦（A Router is a Computer）

繁中解說：Cisco router 係為唔同規模嘅業務同網絡設計——**Branch（分支）、WAN、Service Provider**。佢本質係一部**專門化嘅電腦**，要運作就必備以下組件：**Central processing unit（CPU）**、**Cisco Internetwork Operating System（IOS）**、**Memory and storage（RAM、ROM、NVRAM、Flash、hard drive）**。
> **English Standard Definition:** Cisco routers are designed to address the needs of many different types of businesses and networks: branch, WAN, service provider.
> **English Standard Definition:** Routers are specialized computers containing the following required components to operate: central processing unit (CPU), Cisco Internetwork Operating System (IOS), and memory and storage (RAM, ROM, NVRAM, Flash, hard drive).

### 3.28 Router 內部有咩（Inside a Router）

繁中解說：打開機箱會見到嘅硬件（睇得明英文名就夠）：**Power supply**（電源供應器）、**Cooling fan**（散熱風扇）、**SDRAM（Synchronous Dynamic RAM）**、**Non-volatile RAM（NVRAM）**、**CPU**、**Heat shields**（隔熱／散熱板）、**Advanced Integration Module（AIM）**（進階整合模組）。
> **English Standard Definition:** Inside a router you will find the power supply, cooling fan, SDRAM (Synchronous Dynamic RAM), non-volatile RAM (NVRAM), CPU, heat shields, and the Advanced Integration Module (AIM).

### 3.29 Router 記憶體（Router Memory）

繁中解說：Router 四個記憶體係考試常客，分野只有一個關鍵：**斷電會唔會冇咗（volatile vs non-volatile）**同**裝咩**。

| 記憶體 | 裝咩 | 特性 |
| :--- | :--- | :--- |
| **RAM** | **running configuration**（運行中配置）、routing table、packet buffer | Volatile，斷電清空 |
| **ROM** | **POST 診斷同 boot instructions**（含 bootstrap） | 非揮發，唯讀（read-only） |
| **NVRAM** | **startup configuration**（啟動配置） | 非揮發，可寫 |
| **Flash** | **Cisco IOS 同系統檔案** | 非揮發，可寫（IOS 升級就係寫入 Flash） |

> **English Standard Definition:** RAM holds the running configuration, NVRAM holds the startup configuration, Flash stores the Cisco IOS and system files, and ROM contains the diagnostics and boot instructions.
> **圖示描述**：deck 第 38 頁「Router Memory」係一幅記憶體分佈圖，配合 §3.31 開機流程閱讀：ROM → POST 同 bootstrap、Flash → IOS、NVRAM → startup configuration、RAM → 開機後裝住 IOS 同 running configuration。

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` CCNA1 Q5（記憶體配對）

### 3.30 連接 Router 嘅介面（Connect to a Router）

繁中解說：Router 上嘅介面分「數據用」同「管理用」兩大類。**數據介面**：**LAN interfaces** 接駁終結於 LAN 裝置（電腦、switch）嘅線纜；**WAN interfaces** 將 router 接去**外部網絡**，通常跨越較大地理距離；**Gigabit Ethernet** 提供 LAN access；**Enhanced High-speed WAN Interface Card** 為 serial、DSL（digital subscriber line）、switch port 同 wireless 提供模組化同彈性。**儲存與管理介面**：**Compact Flash** 係 compact flash 卡嘅**預設開機位置**；**USB** 提供同 flash 類似嘅額外儲存空間；**New USB Type-B（mini-B USB）** 係新型 USB 連接埠；**Auxiliary（AUX）** 係 **RJ-45 port**，用嚟做**遠端管理存取**；**Console Ports** 係 **Regular RJ-45 port**，用嚟做**初始設定同 CLI（command-line interface）管理存取**。
> **English Standard Definition:** LAN interfaces connect cables that terminate with LAN devices such as computers and switches; WAN interfaces connect routers to external networks, usually over a larger geographical distance.
> **English Standard Definition:** The compact flash provides the default boot location; USB provides additional storage space similar to flash; the auxiliary (AUX) port is an RJ-45 port for remote management access; the console port is for the initial configuration and command-line interface (CLI) management access.

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` CCNA1 Q6（AUX／Console／LAN／WAN 配對）

### 3.31 Router 開機流程（Router Boot-up Process）

繁中解說：開機四步，**做咩同由邊度攞**要一齊記（呢個就係成個流程嘅考點）：

| 步驟 | 做咩 | 由邊度做／攞 |
| :--- | :--- | :--- |
| **1** | **ROM performs POST（Power On Self-Test）** | ROM |
| **2** | **Copy bootstrap from ROM** | ROM |
| **3** | **Load the Cisco IOS from Flash** | Flash（載入 RAM） |
| **4** | **Load the startup configuration file from NVRAM**（或者**進入 setup mode 去建立一個**） | NVRAM |

口訣：**POST → Bootstrap → IOS → Configuration**；來源口訣：**ROM、ROM、Flash、NVRAM**。
> **English Standard Definition:** ROM performs POST (Power On Self-Test); copy the bootstrap from ROM; load the Cisco IOS from Flash; load the startup configuration file from NVRAM or enter setup mode to create it.

➜ 題解實戰見 `ITE3102_T6_Network_StudyGuide.md` CCNA1 Q4（開機步驟排序）

### 3.32 Router 初始設定同 CLI 模式（Initial Settings）

繁中解說：新 router 開箱，**初始設定（initial settings）** 有八件事要做（deck 原文清單）：**(1) Configure device name**（設定裝置名稱）；**(2) Secure EXEC mode**（保護 EXEC 模式）；**(3) Secure VTY lines**（保護 VTY 線路，即遙距 Telnet／SSH 登入線路）；**(4) Secure privilege EXEC mode**（保護特權 EXEC 模式）；**(5) Secure all passwords**（保護所有密碼）；**(6) Provide legal notification**（提供法律警告標語）；**(7) Configure the management switch virtual interface（SVI）**（設定管理用 SVI）；**(8) Save the configuration**（儲存設定）。Router CLI 有五個 mode，**prompt 唔同就係唔同 mode**：

```text
R1>                     ! User EXEC mode（用戶模式）：只可以睇基本資料，提示符係 >
R1#                     ! Privileged EXEC mode（特權模式）：睇晒所有設定、儲存設定，提示符係 #
R1(config)#             ! Global configuration mode（全局配置模式）：改全機層面設定
R1(config-if)#          ! Interface configuration mode（介面設定模式）：改某個介面（見 §3.19、§3.33）
R1(config-line)#        ! Line configuration mode（線路設定模式）：改 console／VTY 線路（對應上面第 2、3 項）
```

> ⚠️ **來源說明**：deck 本身只寫到「EXEC mode」「privilege EXEC mode」「VTY lines」「interface sub-configuration mode」呢幾個詞，同示範用嘅 prompt（`R1#`、`R2(config)#`、`R1(config-if)#`）；上面五個 mode 嘅完整名稱同 prompt 對應，係**取自本課 Tutorial 6 題解（`ITE3102_T6_Network_StudyGuide.md` CCNA1 Q3）**，唔係自創——所以呢條模式階梯係課程範圍內嘅標準答法。
> **English Standard Definition:** Initial settings on a router include configuring the device name, securing EXEC mode, securing VTY lines, securing privilege EXEC mode, securing all passwords, providing a legal notification, configuring the management switch virtual interface (SVI), and saving the configuration.

➜ 實作見 `ITE3102_PT6_RouterToLAN_CodeGuide.md`（`enable` → `configure terminal` → `interface ...` 完整登入同設定流程）

### 3.33 設定 Router 介面同驗證（Configure Interfaces / Verify Interface Configuration）

繁中解說：**設定一個 router interface** 嘅標準四步（次序要背）：**(1) Enter the interface sub-configuration mode**（進入介面設定模式）；**(2) Add a description to the interface（optional）**——加描述方便日後文件化；**(3) Configure an IPv4 or IPv6 address**；**(4) Activate the interface with a `no shutdown` command**（用 `no shutdown` 啟動介面）。

```text
R1# int g0/0                                           ! 第 1 步：進入 G0/0 介面設定模式（interface sub-configuration mode）
R1(config-if)# description <文字備註>                   ! 第 2 步：加介面描述（optional，但建議做）
R1(config-if)# ip address 192.168.10.1 255.255.255.0   ! 第 3 步：設定 IPv4 address + subnet mask
R1(config-if)# no shutdown                             ! 第 4 步：啟動介面（唔打介面唔會 up）
```

**驗證介面設定（三個 show 指令，各自睇咩要分清）**：

```text
show ip route       ! 顯示存喺 RAM 嘅 IPv4 routing table 內容
show interfaces     ! 顯示裝置上所有介面嘅統計資料（IP／MAC／bandwidth／errors）
show ip interface   ! 顯示 router 上所有介面嘅 IPv4 統計資料
```

> **English Standard Definition:** To configure router interfaces, enter the interface sub-configuration mode, add a description to the interface (optional), configure an IPv4 or IPv6 address, and activate the interface with a `no shutdown` command.
> **English Standard Definition:** `show ip route` displays the contents of the IPv4 routing table stored in RAM; `show interfaces` displays statistics for all interfaces on the device; `show ip interface` displays the IPv4 statistics for all interfaces on a router.

➜ 實作見 `ITE3102_PT6_RouterToLAN_CodeGuide.md`（Part 2 設定、Part 3 驗證，含 `show ip interface brief` 同錯誤排查）

### 3.34 設定 IPv4 Loopback Interface（Configure an IPv4 Loopback Interface）

繁中解說：**Loopback interface** 係一個**邏輯介面**，特點四個：**(1)** 佢係 **internal to the router**——**唔會指派去任何實體 port**；**(2)** 佢算係一個 **software interface**，**自動處於 UP 狀態**（唔會因為線纜問題 down）；**(3)** **用嚟做測試（testing）**好有用；**(4)** 喺 **OSPF routing process** 入面好重要。
> **English Standard Definition:** A loopback interface is a logical interface that is internal to the router: it is not assigned to a physical port, it is considered a software interface that is automatically in an UP state, it is useful for testing, and it is important in the OSPF routing process.

➜ 題解對照：host 層面嘅 loopback（127.0.0.1）見 §3.11，router 層面嘅 loopback interface 見本節，兩者係唔同層次嘅「自己」。

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/縮寫 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| Network Layer | OSI 第 3 層；負責選路同邏輯定址 | "The function of the network layer is to determine the best path through the network (path determination and logical addressing)." |
| Encapsulation / De-capsulation | 封裝成 packet／收方拆走 Network header 交上 Transport layer | "The network layer receives the Transport layer segment and adds a network header, so it becomes a packet; at the destination the packet is de-capsulated and the segment is passed up." |
| Packet（Network Layer PDU） | 網絡層嘅數據單位 | "The network layer PDU is called a packet." |
| Packet Forwarding | 封包轉發；每段鏈路換一次 Layer 2 frame | "R1 receives the frame, takes out the packet, and encapsulates the packet in another frame." |
| PPP Frame | 一種唔需要 MAC address 嘅 Layer 2 frame | "R2 encapsulates the packet in a PPP frame — a different type of Layer 2 frame, no MAC address required." |
| Broadcast Domain | 一個網絡＝一個廣播域；router 介面分隔廣播域 | "A broadcast domain is a logical network composed of all devices reachable by a frame sent to the data link layer broadcast address." |
| Connectionless | IP 特性一：傳送前唔建立連線 | "IP is connectionless: no connection is established before sending data packets." |
| Best Effort Delivery | IP 特性二：冇 overhead 保證送達 | "IP uses best effort delivery: no overhead is used to guarantee packet delivery." |
| Media Independent（含 Fragmentation / MTU） | IP 特性三：獨立於媒體運作，按媒體調整封包大小 | "IP is media independent: it operates independently of the medium carrying the data, and it will adjust the size of the packet according to the type of network access." |
| IPv4 Packet Header | IPv4 封包頭 | "The IPv4 header has a minimum size of 20 bytes when the IHL value is 5." |
| IHL / Header Length | Header 長度，單位 4-byte word | "Header Length (IHL) specifies the size of the packet header in 4 byte words; the minimum size is 5, meaning 5 × 4 = 20 bytes." |
| Total Length | 封包資料部分大小 | "Total Length is the size of the data portion of the packet." |
| Time To Live (TTL) | 每跳減 1，防 routing loop | "TTL is decremented at each hop to prevent packets being passed around the network in routing loops." |
| Protocol Field | 下一個上層協議 | "Protocol indicates the upper-layer protocol to be used next: 1 - ICMP, 6 - TCP, 17 - UDP." |
| IP Address Depletion | IPv4 地址枯竭（約 40 億個唔夠用） | "Although there are about 4 billion IPv4 addresses, the exponential growth of new IP-enabled devices has increased the need." |
| Internet Routing Table Expansion | 路由表膨脹拖慢 router | "A large number of routes can slow down a router." |
| NAT | 網絡地址轉換；多部機共用一個 IPv4 | "NAT was created for devices to share a single IPv4 address, which can cause problems for technologies that require end-to-end connectivity." |
| IPv6 Packet Header | IPv6 封包頭，欄位更簡化 | "IPv6 has a simplified header with fewer fields for efficient packet handling." |
| Traffic Class | 為壅塞控制定優先級 | "Traffic Class is the priority for congestion control." |
| Flow Label | 同一 flow 相同處理 | "The same flow will receive the same handling." |
| Payload Length | 等於 IPv4 Total Length | "Payload Length is the same as total length." |
| Next Header | 即 Layer 4 protocol | "Next Header is the Layer 4 protocol." |
| Hop Limit | 取代 TTL | "Hop Limit replaces the TTL field." |
| 128-bit Hierarchical Addressing | IPv6 地址空間 | "IPv6 uses 128-bit hierarchical addressing and eliminates the need for NAT." |
| Loopback Interface (127.0.0.1) | 本機自己；測試 TCP/IP stack | "A host can ping itself by sending a packet to 127.0.0.1, the loopback interface, which tests the TCP/IP protocol stack." |
| Local Host / Remote Host | 同網絡／另一網絡嘅主機 | "A local host shares the same network address as the sending host; a remote host does not, so the frame is sent to the default gateway." |
| Default Gateway | 出自己網絡嘅大門；同網段嘅 router 介面 IP | "The default gateway routes traffic to other networks and has a local IP address in the same address range as other hosts." |
| DHCP / Static Assignment | 動態派 IP／人手設定 IP、mask、gateway | "IP address information is dynamically assigned by a server using DHCP; a static address is manually assigned with a subnet mask and default gateway." |
| Host Routing Table | 主機自己嘅路由表 | "The 0.0.0.0 – 0.0.0.0 entry accesses the default gateway; 127.0.0.1 is the loopback interface." |
| Directly Connected / Remote Network | 接喺自己介面上／要經另一部 router | "A directly connected network is connected to a router interface; a remote network is connected to another router." |
| C / L / S / D / O | 路由來源代碼 | "C is a directly connected network, L is a local interface, S is a static route, D is EIGRP, and O is OSPF." |
| Exit Interface / Next-hop | 出口介面／下一跳 router | "The packet is forwarded out of the exit interface; directly connected networks have no next-hop address." |
| Router Routing Decision | 查表 → 睇 destination → 重封裝 | "The destination IP is examined to determine the destination network, the routing table is consulted, and the router re-encapsulates the packet into another frame." |
| Direct Route | 設定介面就自動產生 | "Direct routes are created when an interface is configured with an IP address and is activated." |
| Static Route | 人手設定嘅固定路徑 | "Static routes are manually configured, define an explicit path between two networking devices, and must be manually updated if the topology changes." |
| Default Static Route | 0.0.0.0 0.0.0.0；表內無路徑時使用 | "A default static route is used when the routing table does not contain a path for a destination network." |
| Dynamic Routing Protocol | 自動分享路由資訊 | "Routers use routing protocols to dynamically share their routing information." |
| Convergence | 收斂；路由表交換完成 | "Routers have converged after they have finished exchanging and updating their routing tables." |
| D / D\*EX | EIGRP 學到嘅路由／EIGRP 轉發嘅外部預設路由 | "D\*EX identifies a default external route forwarded by EIGRP, and D identifies a route installed from R2's update." |
| Administrative Distance (AD) | 管理距離；數字越低越可信 | "If multiple paths to a destination exist, the path with the lowest Administrative Distance is installed in the routing table." |
| CPU / IOS | Router 必備組件 | "Routers are specialized computers containing a CPU, the Cisco IOS, and memory and storage." |
| RAM / ROM / NVRAM / Flash | 四種記憶體 | "RAM holds the running configuration, ROM holds diagnostics and boot instructions, Flash stores the IOS and system files, and NVRAM holds the startup configuration." |
| Console Port / AUX Port | 初始設定同 CLI 管理／遠端管理（都係 RJ-45） | "The console port is for the initial configuration and CLI management access, and the auxiliary (AUX) port is an RJ-45 port for remote management access." |
| LAN / WAN Interface | LAN 接內部；WAN 接外部 | "LAN interfaces connect LAN devices, while WAN interfaces connect routers to external networks." |
| POST / Bootstrap | 開機自檢／ROM 入面嘅引導程式 | "ROM performs POST, then the bootstrap program is copied from ROM." |
| Startup Configuration / Setup Mode | 存喺 NVRAM 嘅配置／冇 config 時嘅對話式設定 | "The startup configuration file is loaded from NVRAM or setup mode is entered to create it." |
| Initial Settings / VTY Lines | Router 初始八件事／遙距登入線路 | "Initial settings include the device name, securing EXEC mode, VTY lines and passwords, a legal notification, the management SVI, and saving the configuration." |
| User / Privileged EXEC Mode | `R1>` 同 `R1#` | "User EXEC mode shows limited information; privileged EXEC mode allows all show and configuration commands." |
| Global / Interface / Line Configuration Mode | `R1(config)#`／`R1(config-if)#`／`R1(config-line)#` | "Global commands run in `(config)#`, interface commands in `(config-if)#`, and line commands in `(config-line)#`." |
| no shutdown | 啟動介面 | "Activate the interface with a `no shutdown` command." |
| show ip route | 睇 IPv4 routing table（存 RAM） | "`show ip route` displays the contents of the IPv4 routing table stored in RAM." |
| show interfaces / show ip interface | 睇所有介面統計／所有介面 IPv4 統計 | "`show interfaces` displays statistics for all interfaces, and `show ip interface` displays the IPv4 statistics for all interfaces." |
| Loopback Interface（router）/ OSPF | 邏輯介面，內部用、自動 UP、OSPF 重要 | "A loopback interface is a logical interface internal to the router; it is not assigned to a physical port and is automatically in an UP state." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**第 1 步：先理解觀念（Understand）**——由「一個 packet 由 host 出到 host 入」呢條線諗：Encapsulation → Addressing → Routing → De-capsulation（§3.2），再理解每段鏈路點解要換 frame（§3.3）；理解「一個 router interface ＝ 一個網絡 ＝ 一個 broadcast domain」（§3.4）；理解 host 三種轉發目標（itself／local／remote，§3.11）同 default gateway 嘅角色（§3.12）；最後理解 router 嘅思維：**唔理封包邊度嚟，只按 destination IP 查表決定點出**（§3.18）。

**第 2 步：背誦英文短語（Memorise）**——IP 三大特性嘅英文定義句（connectionless／best effort／media independent，§3.6，配對題必考）；IPv4 header 欄位功能嘅英文句（TTL 每跳減 1、Protocol 1／6／17、IHL 最小 5 ＝ 20 bytes，§3.7）；IPv6 欄位對照（Hop Limit 取代 TTL、Next Header ＝ Layer 4，§3.9）；route source code（C／L／S／D／O，§3.17）；AD 三個數（0／1／90，§3.24）；開機四步同四種記憶體（§3.29、§3.31）。

**第 3 步：掌握寫法同操作（Configure）**——介面設定四步：進入 `interface` 模式 → `description`（optional）→ `ip address` → `no shutdown`（§3.33）；static route 兩種格式（用 exit interface 或用 next-hop IP）＋ default static route（§3.20、§3.22）；三個驗證指令各自睇咩：`show ip route`／`show interfaces`／`show ip interface`（§3.33），再加解讀 `show ip route` 輸出（§3.21、§3.22）。

**第 4 步：能解答英文考題（Apply in Exams）**：
- "What is the function of the network layer?" → "To determine the best path through the network — path determination and logical addressing."
- "What are the three characteristics of IP?" → "Connectionless, best effort, and media independent."
- "What is the minimum size of an IPv4 header and why?" → "20 bytes, because the minimum IHL value is 5, and 5 × 4 = 20."
- "Why is TTL needed?" → "It is decremented at each hop to prevent packets being passed around the network in routing loops."
- "Which path is installed when multiple routes to the same destination exist?" → "The one with the lowest Administrative Distance: directly connected (0), then static (1), then EIGRP (90)."
- "Order the router boot process." → "ROM performs POST, the bootstrap is copied from ROM, the Cisco IOS is loaded from Flash, and the startup configuration is loaded from NVRAM."
- "Which command displays the contents of the IPv4 routing table stored in RAM?" → "`show ip route`."
- 最後用 Tutorial 6 題解（`ITE3102_T6_Network_StudyGuide.md`）做模擬試：遮住答案答 Q1–Q3 同 CCNA1 Q1–Q8。

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**必背數字（Key Numbers）**

| 項目 | 數字 |
| :--- | :--- |
| IPv4 header 最小長度 | IHL = 5 → 5 × 4 = **20 bytes** |
| IPv4 地址總數 | 約 **4 billion**（40 億） |
| IPv6 地址長度 | **128-bit**（hierarchical addressing） |
| IPv6 Version 值 | **0110**（二進制） |
| Protocol 值 | **1 = ICMP、6 = TCP、17 = UDP** |
| Loopback 地址 | **127.0.0.1** |
| Administrative Distance | directly connected = **0**、static = **1**、EIGRP = **90** |
| Deck 例子網絡數 | 拓撲圖 = **12 networks**；R1／R2 例子 = **5 networks** |
| WAN link 網段 | **209.165.200.224/30**（R1 = .225、R2 = .226） |

**四大記憶體同開機四步**

| 記憶體 | 裝咩 | 斷電 |
| :--- | :--- | :--- |
| **RAM** | running configuration、routing table | 冇（volatile） |
| **ROM** | POST 診斷、boot instructions、bootstrap | 有（唯讀） |
| **NVRAM** | startup configuration | 有 |
| **Flash** | Cisco IOS、system files | 有 |

開機次序：**POST（ROM）→ Bootstrap（ROM）→ Load IOS（Flash → RAM）→ Startup Config（NVRAM → RAM／或入 setup mode）**
英文口訣：**"ROM performs POST, copy bootstrap, load IOS from Flash, load startup config from NVRAM."**

**IPv4 vs IPv6 Header 對照**

| IPv4 欄位 | IPv6 對應 | 備註 |
| :--- | :--- | :--- |
| Version（4） | Version（0110） | IPv6 版面簡化 |
| Differentiated Services（DSCP / ECN） | Traffic Class | 優先次序／壅塞控制 |
| Total Length | Payload Length | Payload Length ＝ 舊 Total Length |
| Protocol | Next Header | 即 Layer 4 protocol |
| Time To Live（TTL） | Hop Limit | 每跳減 1 |
| IHL、Identification、Flag、Fragment Offset、Header Checksum | （取消） | IPv6 欄位更少，處理更有效率 |

**設定指令極速卡（全部加繁中註解）**

```text
int g0/0                                       ! 進入介面設定模式
ip address 192.168.10.1 255.255.255.0           ! 設定介面 IP + subnet mask
no shutdown                                    ! 啟動介面（最重要，唔打就 down）
exit                                           ! 離開介面設定模式
ip route 0.0.0.0 0.0.0.0 Serial0/0/0            ! default static route
ip route 192.168.10.0 255.255.255.0 s0/0/0      ! static route（用 exit interface）
ip route 192.168.11.0 255.255.255.0 209.165.200.225   ! static route（用 next-hop IP）
show ip route                                  ! 睇 IPv4 routing table（存 RAM）
show interfaces                                ! 睇所有介面統計（IP／MAC／BW／errors）
show ip interface                              ! 睇所有介面 IPv4 統計
```

**開機紅旗（最易錯位）**：**IHL ≠ Total Length**（IHL 係 header 長度 ×4 bytes；Total Length 係封包資料部分大小）；**C vs L**（`C` 係整個直連網絡，`L` 係介面自己嗰個 /32 地址，兩行通常成對出現）；**AD 唔係 metric**（AD 用嚟鬥「唔同來源」嘅可信度，metric 用嚟喺「同一個協議內」比路徑好壞）；**Static route 全靠人手**（拓撲一變就要人手改，想自動適應一定要動態協議並等 **convergence** 完成）；**Console vs AUX**（Console ＝ initial configuration + CLI；AUX ＝ remote management，兩者都係 RJ-45）；**Loopback 兩個層次**（host 層面 127.0.0.1 測 TCP/IP stack；router 層面 loopback interface 係 software interface、自動 UP、OSPF 重要）；**Default static route 幾時用**（routing table 冇去該目的地嘅路徑時，就用 `0.0.0.0 0.0.0.0` 嗰條）。
