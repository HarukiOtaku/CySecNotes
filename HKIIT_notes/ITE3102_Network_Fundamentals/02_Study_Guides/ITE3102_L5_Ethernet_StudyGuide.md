# ITE3102 L5: Ethernet — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Module 7: Ethernet Switching
> **原始檔**：`01_Raw_Materials/Lectures/Lecture5_Ethernet.pptx`
> **題解對應**：`ITE3102_T5_Ethernet_StudyGuide.md`（同一課嘅 Tutorial 練習題解）
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 對照題解自測 → 考前用懶人包速記

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

Lecture 5 係全課「網絡基礎」入面最實用嘅一課，因為佢解答咗一條核心問題：**一部機啲資料究竟點樣由 NIC 走到另一部機嘅 NIC？** 答案分三層：第一層係 **Ethernet Protocol** 本身——今日最廣泛使用嘅 LAN 技術，佢同時橫跨 **data link layer** 同 **physical layer**，由 **IEEE 802.2** 同 **802.3** 標準定義，並且靠 **Logical Link Control (LLC)** 同 **Media Access Control (MAC)** 兩個 sublayer 分工運作。你要記死 frame 每個欄位（Preamble、Destination MAC、Source MAC、Type、Data、FCS）同埋 frame 大細上下限（**最小 64 bytes、最大 1518 bytes**）。

第二層係 **LAN Switches**——Switch 係一個「只睇 Layer 2 MAC 地址」嘅裝置，佢靠 **MAC address table**（又叫 CAM table）做兩件事：**學（Learn）Source MAC**、**查（Forward）Destination MAC**。查得到就精準出一個 port（unicast），查唔到或者係 broadcast／multicast 就 flooding 出晒所有 port（除咗入嚟嗰個）。第三層係 **Address Resolution Protocol (ARP)**——當主機知道對方 IP 但唔知對方 MAC，就要用 ARP Request（broadcast）同 ARP Reply（unicast）去查，結果存入 **ARP table**。

實務情境一：公司網絡突然好慢，IT 同事擷取網絡流量之後見到大量 `FF-FF-FF-FF-FF-FF` 嘅 broadcast 塞住條線——呢個正正係本課 slide 36 講嘅「大量 ARP broadcast flood 晒 local media，短時間內效能下降」嘅效能問題，可以對應題解 CCNA1 Q5(a) 問你嘅 **bandwidth consumption / network congestion**。

實務情境二：有同事投訴「上網成日斷吓斷吓，密碼明明冇事」——如果查實有人將受害者 ARP table 入面 Default Gateway 嘅 IP 指向攻擊者自己部機嘅 MAC，就係 **ARP Spoofing**（題解叫 ARP 欺騙／毒化）。企業級 switch 要用 **dynamic ARP inspection** 同 **IP Source Guard** 去核對 MAC address 對 IP address 嘅綁定，呢兩個詞要背得熟。

實務情境三：拉線入 switch 時唔知用 straight-through 定 crossover 線，結果有啲機通、有啲唔通——現代 switch 開咗 **Auto-MDIX**（默認啟用）之後會自己偵測纜線類型，任何 copper 10/100/1000 port 都可以插 crossover 或 straight-through。呢個亦係 **PT4.1 / PT4.2** 實作課要動手做嘅部分。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **講出 Ethernet 嘅定位** — Explain that Ethernet is the most widely used LAN technology, operating in the data link layer and the physical layer
2. **分辨 LLC 與 MAC 兩個 sublayer 嘅分工** — Distinguish the functions of the Logical Link Control (LLC) and Media Access Control (MAC) sublayers
3. **背出 Ethernet frame 欄位同功能** — Identify each Ethernet frame field (Preamble, Destination MAC, Source MAC, Type, Data, FCS) and its purpose
4. **計 frame 大細並解釋上下限** — State the minimum frame size (64 bytes) and maximum frame size (1518 bytes), and explain padding, runt frame and jumbo frame
5. **解釋 MAC address 結構** — Describe a MAC address as a 48-bit value expressed as 12 hexadecimal digits, split into an OUI and a unique vendor value
6. **分辨 unicast / broadcast / multicast MAC address** — Distinguish unicast, broadcast (FF-FF-FF-FF-FF-FF) and multicast (01-00-5E) MAC addresses
7. **推演 Switch 學習同轉發邏輯** — Trace how a switch learns the source MAC address and forwards or floods based on the destination MAC address
8. **分辨 switch 轉發模式** — Compare fast-forward switching and fragment-free switching (and the equivalent store-and-forward / cut-through descriptions)
9. **解釋 memory buffering、duplex mismatch 同 Auto-MDIX** — Explain memory buffering, full-duplex vs half-duplex, duplex mismatch and Auto-MDIX
10. **解釋 ARP 嘅兩大功能** — State the two basic functions of ARP: maintaining an ARP table, and resolving local IP addresses to MAC addresses via ARP request and ARP reply
11. **填寫 local 與 remote 通訊嘅 frame 地址** — Fill in the MAC and IP addresses in an Ethernet frame for local and remote communication (MAC changes every hop, IP stays the same)
12. **判斷何時要 ARP Request、ARP table 會查到乜** — Decide when an ARP request is needed and interpret the contents of an ARP table
13. **指出 ARP 嘅效能與保安風險** — Explain ARP broadcast overhead and ARP spoofing, and name the mitigation techniques (dynamic ARP inspection, IP Source Guard)

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

先睇清本課 coverage：**slide 1–3** 係標題、議程（Ethernet Protocol / LAN Switches / Address Resolution Protocol）同 Module 7 章節分隔頁；**slide 4–23** 講 Ethernet Protocol 同 LAN Switches；**slide 24–37** 講 Address Resolution Protocol（ARP）。以下每一節都對應 deck 嘅原文次序。

| Slide | 主題 | 對應章節 |
| :--- | :--- | :--- |
| 1–3 | 標題 / 議程 / Module 7 分隔頁 | §3.1 |
| 4 | Ethernet Protocol | §3.1 |
| 5–6 | Data Link Sublayers（LLC / MAC） | §3.2 |
| 7 | Ethernet Frame Fields | §3.3 |
| 8 | Ethernet Frame Size | §3.4 |
| 9–10 | MAC Address: Ethernet Identity / Representations | §3.5 |
| 11 | Frame Processing | §3.6 |
| 12–14 | Unicast / Broadcast / Multicast MAC Address | §3.7 |
| 15–16 | LAN Switches / The MAC Address Table | §3.8 |
| 17 | Examine the Source MAC Address (Learn) 圖 | §3.9 |
| 18–19 | Find the Destination MAC Address (Forward) | §3.10 |
| 20 | Frame Forwarding Methods | §3.11 |
| 21 | Memory Buffering on Switches | §3.12 |
| 22 | Duplex and Speed Settings | §3.13 |
| 23 | Auto-MDIX | §3.14 |
| 24–25 | Module 9 分隔頁 / ARP Overview | §3.15 |
| 26 | ARP Tables | §3.16 |
| 27 | MAC and IP | §3.17 |
| 28 | Address Resolution Protocol (ARP) 兩大功能 | §3.18 |
| 29 | End-to-End Communication | §3.19 |
| 30 | Frame for Communicating Locally | §3.20 |
| 31 | Frames for Communicating Remotely | §3.21 |
| 32 | ARP Functions | §3.22 |
| 33 | ARP for Communicating Locally | §3.23 |
| 34 | ARP for Communicating Remotely | §3.24 |
| 35 | Removing Entries from an ARP Table | §3.25 |
| 36 | ARP Broadcasts | §3.26 |
| 37 | ARP Spoofing | §3.27 |

### 3.1 Ethernet Protocol 概覽（Ethernet Protocol）

繁中解說：Ethernet 係**今日最廣泛使用嘅 LAN 技術**（the most widely used LAN technology today）。佢特別嘅地方係**同時運作喺 data link layer 同 physical layer 兩層**，係一「族」由 **IEEE 802.2** 同 **IEEE 802.3** 標準定義嘅網絡技術。Ethernet 唔係靠單一層運作，而係靠 data link layer 入面兩個獨立 sublayer：**Logical Link Control (LLC)** 同 **Media Access Control (MAC)**。呢課嘅三大主軸就係 Ethernet Protocol、LAN Switches 同 Address Resolution Protocol；而呢三樣嘢全部係 ITN v7.0 **Module 7: Ethernet Switching** 嘅內容。

> **English Standard Definition:** "Ethernet is the most widely used LAN technology today." "It operates in the data link layer and the physical layer." "It is a family of networking technologies that are defined in the IEEE 802.2 and 802.3 standards." "It relies on the 2 separate sublayers of the data link layer to operate - Logical Link Control (LLC) & Media Access Control (MAC)."

### 3.2 Data Link Sublayers（LLC 與 MAC 子層）

繁中解說：Data Link Layer 分兩半。**LLC sublayer** 負責「上層同下層之間嘅溝通」——佢會喺 frame 入面放資訊，**指明呢個 frame 用緊邊種 network layer protocol**，咁樣多種 Layer 3 protocol（例如 IPv4 同 IPv6）就可以共用同一個 network interface 同同一條 media。**MAC sublayer** 就用**硬件（implemented in hardware）**實現，負責兩大類工作：

- **Data Encapsulation（資料封裝）**：包含三件事——**Ethernet frame**（Ethernet frame 嘅內部結構）、**Ethernet Addressing**（frame 同時有 source 同 destination MAC address，用嚟將 frame 由**同一 LAN** 上嘅一部 Ethernet NIC 送到另一部 Ethernet NIC）、**Ethernet Error detection**（frame 尾有 **frame check sequence (FCS)** trailer 做錯誤偵測）。
- **Accessing the media（存取媒介）**：MAC sublayer 包含唔同 Ethernet 通訊標準喺各種 media（**copper 銅線** 同 **fiber 光纖**）上面嘅規格。

口訣：**「LLC 管溝通、MAC 管封裝同放上線」**。

> **English Standard Definition:** "The LLC sublayer handles the communication between the upper layers and the lower layers. It places information in the frame that identifies which network layer protocol is being used for the frame. This information allows multiple Layer 3 protocols, such as IPv4 and IPv6, to use the same network interface and media." "The MAC sublayer is implemented in hardware and is responsible for data encapsulation and media access control." "The Ethernet frame includes both a source and destination MAC address to deliver the Ethernet frame from Ethernet NIC to Ethernet NIC on the same LAN." "The Ethernet frame includes a frame check sequence (FCS) trailer used for error detection." "The MAC sublayer includes the specifications for different Ethernet communications standards over various types of media including copper and fiber."

> **圖示描述（slide 6）**：一幅 data link layer 分層示意圖，展示 data link layer 內部點樣分成 **LLC** 同 **MAC** 兩個 sublayer，並標示兩者同上層（network layer，例如 IPv4／IPv6）同下層（physical layer／media）嘅關係。

**⚠️ 教材外補充（常見考點，但 deck 冇出現過）**：deck 只講「MAC sublayer 包含唔同 Ethernet 通訊標準喺 copper 同 fiber 上面嘅規格」，**並冇列出任何具體標準名稱**。考試若問 Ethernet 速度標準演進，標準答案係 **10BASE-T / 100BASE-TX / 1000BASE-T / 10GBASE-T**（銅線雙絞線系列，速度由 10 Mbps 逐級升到 10 Gbps）；但呢幾個名稱**唔係出自本 deck**，係通用背景知識，請自行對照老師補充資料。

### 3.3 Ethernet Frame Fields（Ethernet 訊框欄位）

繁中解說：Ethernet frame 由左至右共六個欄位，逐個記功能：

- **Preamble（前導碼）**：用嚟令發送同接收裝置之間**同步（synchronization）**。
- **Destination MAC Address（目的 MAC）**：Layer 2 用嚟幫裝置判斷「呢個 frame 係唔係畀我」。
- **Source MAC Address（來源 MAC）**：發出呢個 frame 嘅 NIC 或 interface。
- **Type（類型）**：指出 frame 入面**封裝咗邊種上層協議**——`0x800` 係 IPv4、`0x86DD` 係 IPv6、`0x806` 係 ARP。
- **Data（資料）**：載住由更高層（network layer）封裝落嚟嘅數據（即 packet）。
- **Frame Check Sequence (FCS)**：用 **cyclic redundancy check（CRC，循環冗餘檢查）** 偵測 frame 有冇錯誤。

> **English Standard Definition:** "Preamble - Used for synchronization between the sending and receiving devices." "Destination MAC Address - Layer 2 to assist devices in determining if a frame is addressed to them." "Source MAC Address - Originating NIC or interface of the frame." "Type - Identifies the upper layer protocol encapsulated (0x800 for IPv4 / 0x86DD for IPv6 / 0x806 for ARP)." "Data - Contain the encapsulated data from a higher layer (packet)." "Frame Check Sequence (FCS) - Used to detect errors in a frame with cyclic redundancy check."

### 3.4 Ethernet Frame Size（Ethernet 訊框大小）

繁中解說：計 frame 大細時，係由 **Destination MAC Address 欄位一路數到 Frame Check Sequence** 為止——**Preamble 唔計入去**。**最小 64 bytes，最大 1518 bytes**。如果封裝入去嘅 packet 太細，就要喺 Data 欄位加額外 bit（叫 **pad**），令整個 frame 加大到 64 bytes。三個要背嘅名詞：

- **"runt frame" / "collision fragment"**：frame 大細**細過 64 bytes**。
- **"jumbo frame" / "baby giant frame"**：frame 大細**大過 1500 bytes**。
- 如果傳送嘅 frame 大細**細過最小值或者大過最大值**，接收裝置會**直接丟棄（drops）**個 frame。

> **English Standard Definition:** "Frame Size – count all bytes from the Destination MAC Address field through the Frame Check Sequence (the Preamble field is not included)." "Minimum size is 64 bytes, maximum size is 1518 bytes." "If a small packet is encapsulated, additional bits (called a pad) are put to the Data field to increase the size of the frame to 64 bytes." "'runt frame' or 'collision fragment' – frame size less than 64 bytes." "'jumbo frame' or 'baby giant frame' – frame size more than 1500 bytes." "If the size of a transmitted frame is less than the minimum or greater than the maximum, the receiving device drops the frame."

### 3.5 MAC Address: Ethernet Identity（MAC 地址結構與表示法）

繁中解說：一部 **NIC 要喺 LAN 上面通訊就一定要有 MAC address**，而 MAC address 係**用硬件實現（implemented in hardware）**嘅。佢係一個 **48-bit 二進位值，寫成 12 個 hexadecimal 數字**。結構上分兩半：

- **頭 6 個 hexadecimal 數字（頭 3 bytes）**：係廠商獲指派嘅 **OUI（組織唯一識別碼）**。
- **尾 6 個 hexadecimal 數字（尾 3 bytes）**：由廠商自行指派一個**獨一無二**嘅值。

例：IEEE 指派咗 Cisco 一個 **OUI 00-60-2F**；Cisco 之後為裝置配置一個獨特嘅 vendor code，例如 **3A-07-BC**；因此該裝置嘅 Ethernet MAC address 就係 **00-60-2F-3A-07-BC**。

> **English Standard Definition:** "A NIC needs a MAC address to communicate over the LAN. (implemented in hardware)." "A 48-bit binary value expressed as 12 hexadecimal digits." "Use its assigned vendor assigned OUI as the first 6 hexadecimal digits." "Assign a unique value in the last 6 hexadecimal digits." "The IEEE has assigned Cisco a OUI of 00-60-2F. Cisco would then configure the device with a unique vendor code such as 3A-07-BC. Therefore, the Ethernet MAC address of that device would be 00-60-2F-3A-07-BC."

> **圖示描述（slide 10, MAC Address Representations）**：一幅示意圖展示**同一個 MAC address 嘅幾種寫法／表示格式**（以 hyphen 分隔嘅 6 組、以 dot 分隔嘅 3 組、以及連續 12 個 hexadecimal 數字），並標明 48 bits 由頭 24 bits（OUI，廠商）＋尾 24 bits（唯一值）組成；範例數值可以對回 slide 9 嘅 `00-60-2F-3A-07-BC`。

### 3.6 Frame Processing（訊框處理）

繁中解說：MAC address 經常被叫做 **burned-in address (BIA)**，意思係個地址**永久燒錄喺 ROM 晶片**入面。電腦開機嘅時候，**NIC 第一件做嘅事就係將 MAC address 由 ROM 複製入 RAM**。當裝置要將訊息轉發上 Ethernet network，佢會喺 frame 前面加 header 資訊——而呢個 header 就**包含 source 同 destination MAC address**。

> **English Standard Definition:** "The MAC address is often referred to as a burned-in address (BIA) meaning the address is encoded into the ROM chip permanently." "When the computer starts up, the first thing the NIC does is copy the MAC address from ROM into RAM." "When a device is forwarding a message to an Ethernet network, it attaches header information to the frame. The header information contains the source and destination MAC address."

### 3.7 MAC Address 三大類型：Unicast / Broadcast / Multicast

繁中解說：三種 destination MAC 要分得清：

1. **Unicast MAC Address**：**獨一無二**嘅地址，用喺「**單一**發送裝置送畀**單一**目的裝置」嘅情況。
2. **Broadcast MAC Address**：frame 嘅 destination MAC 係 **48 個 1**，即 **FF-FF-FF-FF-FF-FF**；對應嘅 packet 層面，destination IP address 就係**宿主部分（host portion）全部係 1** 嘅地址。
3. **Multicast MAC Address**：一個特殊值，**以 01-00-5E 開頭**（hexadecimal）；對應嘅 **IPv4 multicast address 範圍係 224.0.0.0 到 239.255.255.255**。例：IP **224.0.0.200** = `1110 0000. 0000 0000. 0000 0000. 1100 1000`，取低 23 bits 之後對應嘅 multicast MAC 就係 **01-00-5E-00-00-C8**。

> **English Standard Definition:** "A unicast MAC address is the unique address used when a frame is sent from a single transmitting device to a single destination device." "The frame contains a destination MAC address with 48 ones (FF-FF-FF-FF-FF-FF)." "The packet contains a destination IP address that has all 1s in the host portion." "Multicast MAC address is a special value that begins with 01-00-5E in hexadecimal." "Range of IPv4 multicast addresses is 224.0.0.0 to 239.255.255.255."

**⚠️ 教材外補充（常見考點，但 deck 冇出現過）**：**Broadcast domain** 概念——一個 broadcast domain 就係「一個 broadcast frame 可以到達嘅範圍」。Switch 唔會分割 broadcast domain（broadcast 照 flooding），**只有 Router 先會將 broadcast domain 分開**（router 唔會轉發 broadcast）。所以你喺套用 §3.23–§3.24 嘅 ARP 規則時要記住：**ARP 只可以喺同一個 broadcast domain 內運作**，跨網絡就要靠 Default Gateway。

### 3.8 LAN Switches 與 MAC Address Table

繁中解說：一部 **Layer 2 Ethernet switch 只根據 Layer 2 Ethernet MAC address 做轉發決定**。一部**剛開機嘅 switch 佢嘅 MAC address table 係空**嘅，因為佢仲未學到連接住嘅幾部 PC 嘅 MAC address。要留意一個別名：**MAC address table 有時又叫 content addressable memory (CAM) table**。

Switch 學習規則（**Examine the Source MAC Address — Learn**）：**每一個入到 switch 嘅 frame 都會被檢查 source MAC address 同埋入嚟嘅 port number**：

- 如果 source MAC **唔存在**表內 → 會**加入表**，並記低入嚟嘅 port number。
- 如果 source MAC **已經存在** → switch 只係**更新該筆記錄嘅 refresh timer**。大部分 switch 默認**將一筆記錄保留 5 分鐘**。
- 如果 source MAC 存在但**出現喺唔同 port** → switch 當呢個係**新記錄**處理，用同一個 MAC address 但換上**更新嘅 port number** 取代原本嗰筆。
- **同一個 port 可以記錄多個 MAC address**（例如嗰個 port 係連去另一部 switch 或者 hub）。

> **English Standard Definition:** "A Layer 2 Ethernet switch makes its forwarding decisions based only on the Layer 2 Ethernet MAC addresses." "A switch that is powered on, will have an empty MAC address table as it has not yet learned the MAC addresses for the four attached PCs." "The MAC address table is sometimes referred to as a content addressable memory (CAM) table." "Every frame that enters a switch is examined for source MAC address and port number. If the source MAC address does not exist, it is added to the table along with the incoming port number." "If the source MAC address does exists, the switch updates the refresh timer for that entry. By default, most switches keep an entry in the table for 5 minutes." "If the source MAC address does exist in the table but on a different port, the switch treats this as a new entry. The entry is replaced using the same MAC address but with the more current port number." "Multiple MAC addresses may be recorded for a port (e.g. a port connected to another switch or hub)."

`➜ 實作見 ITE3102_PT5_ARP_CodeGuide.md`（用 `show mac-address-table` 解讀 switch 學到咩 MAC、喺邊個 port）

**⚠️ 教材外補充（常見考點，但 deck 冇出現過）**：**Port security 概念**——因為一個 switch port 理論上可以學到無限多個 MAC address，管理員會用 **port security** 限制每個 port 可以學到嘅 MAC address 數量，或者綁定固定 MAC address，防止有人插未知裝置或做 MAC flooding 攻擊。企業級 switch 亦會用 deck slide 37 提到嘅 **dynamic ARP inspection** 同 **IP Source Guard** 去核對 MAC ↔ IP 綁定。呢啲名詞屬背景知識，考卷若問「switch port 保安」可以引用。

### 3.9 學習動作（Learn）——逐格睇 Source MAC

繁中解說：每次收到 frame，switch 嘅第一步永遠係**「學」**：攞個 frame 嘅 **Source MAC + 入嚟嘅 port** 寫入 MAC address table。搞清楚一個最易錯嘅位：**更新表係睇 Source MAC，唔係睇 Destination MAC**——所以即使目的地找唔到，switch 一樣會（如果 source 未學過）更新張表。

> **English Standard Definition:** "Every frame that enters a switch is examined for source MAC address and port number. If the source MAC address does not exist, it is added to the table along with the incoming port number."

> **圖示描述（slide 17, Examine the Source MAC Address (Learn)）**：一幅 switch 連接四部 PC 嘅示意圖，展示 switch 由**接收 frame 嗰個 port** 讀取 source MAC address，並將「MAC address → port number」寫入 MAC address table（圖中會標出 frame 逐部機傳送時，表格由空逐步填滿嘅過程）。

### 3.10 轉發動作（Forward）——查 Destination MAC

繁中解說：Switch 靠**比對 frame 嘅 Destination MAC address 同 MAC address table（switch table）入面嘅記錄**嚟轉發。三種情況一定要背：

- **表內搵到** → 由指定嘅 port 轉發出去（**unicast**，精準轉發）。
- **表內搵唔到** → 由**除入嚟嗰個 port 以外嘅所有 port** 轉發出去（**unknown unicast**，即 flooding）。
- **Destination 係 broadcast 或者 multicast** → 一樣由**除入嚟嗰個 port 以外嘅所有 port** flooding 出去。

> **English Standard Definition:** "A switch forwards frames by searching for a match between the destination MAC address in the frame and an entry in the MAC address table (switch table)." "If the destination MAC address is in the table, it will forward the frame out the specified port (unicast)." "If the destination MAC address is not in the table, the switch will forward the frame out all ports except the incoming port (unknown unicast)." "If the destination MAC address is a broadcast or a multicast, the frame is also flooded out all ports except the incoming port."

> **圖示描述（slide 19, Find the Destination MAC Address (Forward)）**：一幅 switch 加四部 PC 嘅示意圖，展示 switch 讀取 frame 嘅 **destination MAC address**，然後查表：命中就只出目標 port，唔命中（或係 broadcast／multicast）就 flooding 至其餘所有 port。

### 3.11 Frame Forwarding Methods（訊框轉發模式）

繁中解說：Deck 列出兩種 **Frame Forwarding Methods**：

- **Fast-forward switching（快速轉發）**：**一讀完 destination address 就即刻轉發**個 packet，唔等收完整個 frame。
- **Fragment-free switching（無碎片轉發）**：**先儲存 frame 頭 64 bytes 先至轉發**——原因係**大部分網絡錯誤同 collision 都發生喺頭 64 bytes 之內**，儲存咗頭 64 bytes 就等於過濾走大部分壞 frame。

> **English Standard Definition:** "Fast-forward switching: immediately forwards a packet after reading the destination address." "Fragment-free switching: stores the first 64 bytes of the frame before forwarding (most network errors and collisions occur during the first 64 bytes)."

**⚠️ 教材外補充（常見考點，但 deck 冇出現過）**：對應題解 **CCNA1 Q3** 嘅講法——**Fast-forward switching 即係 Cut-Through**（一讀到 Layer 2 地址就轉，唔做錯誤檢查，所以快但可能連壞 frame 都照轉、浪費 bandwidth）；而 **Store-and-Forward** 係「**緩存整個 frame 直到收晒，再用 CRC 檢查有冇喺傳輸途中被改過**」先轉發，壞 frame 直接丟棄，所以可靠但延遲較高。另外 **collision domain（碰撞域）概念**：同一個碰撞域內多部裝置爭用同一條 media 就會碰撞；hub 係一個共用碰撞域，**switch 每個 port 各自係獨立碰撞域**，所以換 switch 之後碰撞大幅減少。呢啲名詞係通用背景知識。

`➜ 實作見 ITE3102_PT5_ARP_CodeGuide.md`（用 Simulation mode 逐步睇 flooding 同 forwarding 嘅分別）

### 3.12 Memory Buffering on Switches（Switch 記憶體緩衝）

繁中解說：Ethernet switch 可以用 **memory buffering** 技術先儲存 frame 再轉發。當**目的 port 因為擠塞（congestion）而忙碌**嘅時候，switch 亦會用 buffering——將 frame 儲住，等到可以傳送嘅時候先送出去。

> **English Standard Definition:** "An Ethernet switch may use a memory buffering technique to store frames before forwarding them." "Buffering may also be used when the destination port is busy due to congestion and the switch stores the frame until it can be transmitted." "There are two types of memory buffering techniques."

**⚠️ 教材外補充（common exam point, deck 標題承諾講兩種但內文抽唔到名稱）**：兩種 memory buffering 嘅標準名稱係 **Port-based memory buffering**（每個入 port 有自己嘅 queue，frame 只可以經對應出 port 嘅 queue 傳送，一個 port 擠塞會拖住其他 frame）同 **Shared memory buffering**（所有 frame 存入一個所有 port 共用嘅共同記憶體 buffer，port 動態分配空間，彈性較高）。

### 3.13 Duplex and Speed Settings（雙工與速度設定）

繁中解說：Duplex 係「同一時間邊個可以講」：

- **Full-duplex（全雙工）**：連接**兩端可以同時收發**。
- **Half-duplex（半雙工）**：**同一時間只有一端可以發送**。
- **Duplex Mismatch（雙工不匹配）**：連線嘅**一邊 port 行 half-duplex，另一邊行 full-duplex** 就會出事（典型症狀係速度極慢、出現大量 collision）。

> **English Standard Definition:** "Full-duplex – Both ends of the connection can send and receive simultaneously." "Half-duplex – Only one end of the connection can send at a time." "Duplex Mismatch – Occurs when one port on the link operates at half-duplex while the other port operates at full-duplex."

**⚠️ 教材外補充（常見考點，但 deck 冇出現過）**：**Auto-negotiation（自動協商）**——現代 switch port 會同對端自動協商 **speed 同 duplex**；如果協商失敗（例如對端係固定寫死 half-duplex 嘅舊裝置），就會出現上面講嘅 **duplex mismatch**。考試常見考法係「某條 link 好慢、`show interfaces` 見到大量 collisions，最可能原因？」→ 答案通常係 duplex mismatch。

`➜ 實作見 ITE3102_PT4_LAN_Setup_CodeGuide.md`（纜線類型與接線、驗證連通性）

### 3.14 Auto-MDIX（自動偵測纜線類型）

繁中解說：以前連接裝置去 switch **需要用指定類型嘅纜線**（例如 PC 去 switch 用 straight-through、switch 去 switch 用 crossover），插錯就唔通。**現在 Auto-MDIX（Media Dependent Interface Crossover）默認啟用**之後，switch 會**自己偵測插喺 port 上面嘅纜線類型，並相應配置 interface**。所以對 switch 上面嘅 **copper 10/100/1000 port**，你可以**用 crossover 或者 straight-through 纜線都得**，唔需要理另一端係咩類型嘅裝置。

> **English Standard Definition:** "Now, with auto-MDIX (Media Dependent Interface Crossover) enabled by default, the switch detects the type of cable attached to the port, and configures the interfaces accordingly." "Therefore, you can use either a crossover or a straight-through cable for connections to a copper 10/100/1000 port on the switch, regardless of the type of device on the other end of the connection."

> **圖示描述（slide 23）**：該 slide 上半部有一個**「Device connections to switches once required the use of specific cable types」嘅對照表**，列出以往 PC→switch、switch→switch 各自要用邊種纜線；但**表格內容喺教材抽取過程中抽唔到文字**，只可以確定個表係「裝置類型 → 指定纜線類型」嘅對應（一般為 straight-through vs crossover），下半部就係 Auto-MDIX 嘅說明。

`➜ 實作見 ITE3102_PT4_LAN_Setup_CodeGuide.md`（銅直通線／銅交叉線／console ／fiber 等纜線類型選擇）

### 3.15 ARP Overview（ARP 總覽）

繁中解說：Ethernet network 上**每一部 IP 裝置都有獨一無二嘅 Ethernet MAC address**。當一部裝置送出 Ethernet Layer 2 frame，個 frame 入面有兩個地址：

- **Destination MAC address**：**同一個 local network segment** 上面目的裝置嘅 Ethernet MAC address。**如果目的主機喺另一個網絡，frame 入面嘅 destination address 就會係 default gateway（即 router）嘅地址**。
- **Source MAC address**：source host 上面 Ethernet NIC 嘅 MAC address。

裝置用 **Address Resolution Protocol (ARP)** 去查「當我**知道對方 IPv4 address 但唔知佢 MAC address**」嘅時候，一個 local 裝置嘅 destination MAC address 係乜。

> **English Standard Definition:** "Every IP device on an Ethernet network has a unique Ethernet MAC address." "Destination MAC address - The Ethernet MAC address of the destination device on the same local network segment. If the destination host is on another network, then the destination address in the frame would be that of the default gateway (i.e., router)." "Source MAC address - The MAC address of the Ethernet NIC on the source host." "A device uses Address Resolution Protocol (ARP) to determine the destination MAC address of a local device when it knows its IPv4 address."

`➜ 實作見 ITE3102_PT5_ARP_CodeGuide.md`（PT5.1 Examine the ARP Table：本課 ARP 部分嘅實務主戰文件）

### 3.16 ARP Tables（ARP 表）

繁中解說：**ARP table 記錄 IP address 對 physical address（MAC address）嘅對應關係**。要記住有兩種角色嘅 ARP table：**Host ARP table**（主機自己嘅 ARP 快取）同埋 **Router ARP table**（router 自己嘅 ARP 快取）。

> **English Standard Definition:** "An ARP table contains the mapping of IP addresses to physical addresses." "Host ARP table." "Router ARP table."

### 3.17 MAC and IP（實體地址與邏輯地址）

繁中解說：Ethernet LAN 上面一部裝置會有**兩個主要地址**：

- **Physical address（MAC address）**：用嚟做**同一網絡內 Ethernet NIC 對 Ethernet NIC** 嘅通訊。
- **Logical address（IP address）**：用嚟將 packet 由**原本嘅 source 送到最終嘅 destination**。

**Logical address 用嚟識別原始來源同最終目的地嘅「位置」**，而 source 同 destination 可以喺同一個網絡，亦可以喺唔同網絡。**Physical address 就用嚟將「封裝住 IP packet 嘅 data link frame」由一部 NIC 送到同一網絡上面另一部 NIC**。所以規則係：

- 如果 **destination IP 喺同一個網絡** → destination MAC address 就係**目的裝置自己嘅 MAC**。
- 如果 **destination IP 喺唔同網絡** → destination MAC address 就係**同一 LAN 上面 default gateway 嘅 MAC**。

> **English Standard Definition:** "There are two primary addresses assigned to a device on an Ethernet LAN: Physical address (the MAC address) – Used for Ethernet NIC to Ethernet NIC communications on the same network. Logical address (the IP address) – Used to send the packet from the original source to the final destination." "Physical addresses are used to deliver the data link frame with the encapsulated IP packet from one Network Interface Card (NIC) to another NIC on the same network." "If the destination IP address is on the same network, the destination MAC address will be that of the destination device." "If the destination IP address is on a different network, the destination MAC address will be that of the default gateway on the same LAN."

### 3.18 Address Resolution Protocol (ARP) 嘅兩大功能

繁中解說：ARP 提供**兩項基本功能**：

1. **維護一個 ARP table（或 cache）**，入面係 **IP address 對 physical address 嘅對應**；呢個表**儲存喺裝置嘅 RAM 入面**。
2. **透過 ARP Request 同 ARP Reply 將 local IP address 解析成對應嘅 MAC address**。

喺發送裝置度，當一個 packet 被交落 data link layer 準備封裝成 Ethernet frame，裝置會**喺自己嘅 ARP table 入面搜尋「同目標 IP 對應嘅 MAC address」**：

- 如果 **destination IP 喺同一個網絡** → 就用**該 destination IP** 去查。
- 如果 **destination IP 喺唔同網絡** → 就用 **default gateway 嘅 IP** 去查。

> **English Standard Definition:** "ARP provides 2 basic functions: Maintains an ARP table (or cache) that contains the mapping of IP addresses to physical addresses. This table is stored in the RAM of the device. Resolve local IP addresses to the mapping MAC addresses via ARP Request and ARP Reply." "In the sending device, when a packet is passed to the data link layer to be encapsulated into an Ethernet frame, the device will search its ARP table for the MAC address that is mapped to the appropriate IP address: if the destination IP address is on the same network, the destination IP address will be used; if the destination IP address is on a different network, the IP address of the default gateway will be used."

### 3.19 End-to-End Communication（端到端通訊）

繁中解說：用 deck 嘅 `192.168.10.0/24` 同 `192.168.11.0/24` 兩個網絡（中間係 router **R1**，`G0/1` 同 `G0/0` 兩個 interface，各自係 `.1`）做例：

- **要喺 local network 內送 packet** → 直接經本地 switch 送畀目的主機就得（例如 `192.168.10.10` 送到 `192.168.10.11`）。
- **要將 packet 送出 local network** → 要經本地 switch **送去 default gateway**（例如 `192.168.10.10` 送到 `192.168.11.10`——因為兩者唔同網段，目的地唔喺 local network）。

> **English Standard Definition:** "To send a packet within the local network, just send to the host via the local switch directly (e.g. 192.168.10.10 to 192.168.10.11)." "To send a packet out of the local network, send to the default gateway via the local switch (e.g. 192.168.10.10 to 192.168.11.10)."

### 3.20 Frame for Communicating Locally（本地通訊嘅訊框）

繁中解說：當通訊係**本地**（同一網段），一個 frame 就夠，四個地址填法係：**Destination MAC = File Server 嘅 MAC；Source MAC = A 嘅 MAC；Source IP = A 嘅 IP；Destination IP = File Server 嘅 IP**。即係話：**同段通訊時，destination MAC 直接填對方裝置嘅 MAC**。

> **English Standard Definition:** "Destination MAC = MAC of File Server." "Source MAC = MAC of A." "Source IP = IP of A." "Destination IP = IP of File Server."

### 3.21 Frames for Communicating Remotely（跨網絡通訊嘅訊框）

繁中解說：跨網絡通訊**需要多過一個 frame**，因為要逐個 hop（router）接力。鐵律係：

- **Destination MAC 同 Source MAC 會喺唔同 frame 入面改變**（逐跳換）。
- **Source IP 同 Destination IP 喺所有 frame 入面都相同**（端到端不變）。

> **English Standard Definition:** "More than one frame is needed." "Destination MAC and Source MAC changes in different frames." "Source IP and Destination IP are the same in all the frames."

### 3.22 ARP Functions（ARP 運作流程）

繁中解說：如果發送裝置**喺自己 ARP table 搵得到**目標 IP，就用對應嘅 MAC address 做 frame 嘅 destination MAC address。**但如果搵唔到任何記錄**，裝置就要**發 ARP request 去攞需要嘅 MAC address**。ARP request 係一個 **Layer 2 broadcast（FFFF.FFFF.FFFF）**，發畀 **Ethernet LAN 上面所有裝置**。**喺個 broadcast 入面 IP 對得上嘅嗰個節點，就會用 ARP Reply 回覆，reply 入面載住佢自己嘅 MAC address**。

> **English Standard Definition:** "If a sending device is able to locate the IP address in its ARP table, the corresponding MAC address will be used as the destination MAC address in the frame." "However, if there is no entry found, the device needs to send an ARP request to retrieve the MAC address required." "This is a Layer 2 broadcast (FFFF.FFFF.FFFF) to all devices on the Ethernet LAN." "The node that matches the IP address in the broadcast will respond with an ARP Reply containing its own MAC address."

### 3.23 ARP for Communicating Locally（本地通訊嘅 ARP）

繁中解說：**A 想送資料畀 C（10.10.0.3）**，四步曲：

1. **A 廣播 ARP request**（問「邊個係 10.10.0.3？」）。
2. **C 用 ARP reply 回覆，附上自己嘅 MAC**。
3. **A 將該 MAC 加入自己嘅 ARP Cache**。
4. **A 之後就可以直接轉發畀 C**。

> **English Standard Definition:** "A wants to send to C (10.10.0.3)." "A broadcasts an ARP request." "C sends ARP reply with MAC." "A add MAC to ARP Cache." "A can now forward directly to C."

記憶比喻（deck 原文）：好似同區嘅 **John 問 Rose 喺邊** ——「Rose: 我喺 Tivoli Garden, Block 4, Room 18c」，John 記低咗就可以直接去（對應「Tsing Yi Station Exit C」係出咗區之後嘅事）。

### 3.24 ARP for Communicating Remotely（跨網絡通訊嘅 ARP）

繁中解說：**A 想送資料畀 176.10.10.50**（唔同網段），四步曲：

1. **A 廣播 ARP request 去查 gateway（10.10.0.254）**——留意 A 查嘅**唔係**最終目的地，而係**自己嘅 default gateway**。
2. **Gateway 用 ARP reply 回覆，附上自己嘅 MAC**。
3. **A 將 gateway 嘅 MAC 加入自己嘅 ARP Cache**。
4. **A 之後就可以直接轉發畀 gateway，由 gateway 做進一步處理（forwarding）**。

> **English Standard Definition:** "A wants to send to 176.10.10.50." "A broadcasts an ARP request for gateway (10.10.0.254)." "Gateway sends ARP reply with MAC." "A adds MAC to ARP Cache." "A can now forward directly to gateway for further processing."

記憶比喻（deck 原文）：John 想搵**另一個區嘅 Mary**，但佢只可以問同區嘅 **Gary（gateway）**——「Gary: 我喺 Tierra Verde, Block 3A, Room 15a」，John 將 frame 交畀 Gary 之後，Gary 再經自己嗰邊（「Tsing Yi Station Exit A」）轉出去。

### 3.25 Removing Entries from an ARP Table（清除 ARP 表記錄）

繁中解說：ARP table 嘅記錄唔會永久保留：**ARP cache timer 會移除「喺指定時間內冇用過」嘅 ARP 記錄**。另外**亦可以用指令手動移除 ARP table 入面全部或者部分記錄**（實作上例如 `arp -d` 清 cache、`arp -a` 檢查）。

> **English Standard Definition:** "ARP cache timer removes ARP entries that have not been used for a specified period of time." "Commands may also be used to manually remove all or some of the entries in the ARP table."

`➜ 實作見 ITE3102_PT5_ARP_CodeGuide.md`（`arp -d` / `arp -a` 實操，觀察 cache 老化）

### 3.26 ARP Broadcasts（ARP 廣播嘅效能問題）

繁中解說：如果**大量裝置同時開機、又同時開始存取網絡服務**，ARP broadcast 就會**將 local media 塞滿（flood the local media）**，結果係**短時間內整體效能下降**。所以 ARP 有快取機制去減少重複廣播，但呢個廣播特性本身係 ARP 嘅先天弱點。

> **English Standard Definition:** "If a large number of devices were to be powered up and all start accessing network services at the same time, ARP broadcasts can flood the local media and there could be some reduction in performance for a short period of time."

### 3.27 ARP Spoofing（ARP 欺騙／毒化）

繁中解說：ARP **冇任何驗證機制**，所以任何人都可以亂答。攻擊流程：**攻擊者（Host C）發出一個 ARP reply，但用自己嘅 MAC address 冒充 default gateway 嘅 MAC**。**收到呢個 ARP reply 嘅受害主機（Host A）會將錯誤嘅 MAC address 寫入自己嘅 ARP table，之後所有 packet 就會送咗去攻擊者度**（攻擊者就可以做攔截甚至中間人）。企業級 switch 內置嘅緩解技術叫 **dynamic ARP inspection** 同 **IP Source Guard**，用途係**核對 MAC address 對 IP address 嘅綁定關係**。

> **English Standard Definition:** "The attacker (Host C) sends an ARP reply with its own MAC address (instead of the default gateway's)." "The receiver (Host A) of the ARP reply will add the wrong MAC address to its ARP table and send packets to the attacker." "Enterprise level switches include mitigation techniques known as dynamic ARP inspection and IP Source Guard to check MAC address to IP address bindings."

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| Ethernet | 乙太網絡；最廣泛使用嘅 LAN 技術，跨 data link 同 physical layer | "Ethernet is the most widely used LAN technology today and operates in the data link layer and the physical layer." |
| IEEE 802.2 / IEEE 802.3 | 定義 Ethernet 家族嘅標準 | "Ethernet is a family of networking technologies defined in the IEEE 802.2 and 802.3 standards." |
| LLC (Logical Link Control) | 邏輯鏈路控制子層；同上層溝通、標明上層協議 | "The LLC sublayer handles the communication between the upper layers and the lower layers." |
| MAC Sublayer (Media Access Control) | 媒介存取控制子層；硬件實現，負責封裝同存取媒介 | "The MAC sublayer is implemented in hardware and is responsible for data encapsulation and media access control." |
| Ethernet Frame | 乙太網絡訊框；data link layer 嘅封裝單位 | "The Ethernet frame includes a source and destination MAC address and an FCS trailer." |
| Preamble | 前導碼；同步收發雙方 | "The preamble is used for synchronization between the sending and receiving devices." |
| Destination MAC Address | 目的 MAC；判斷 frame 係唔係畀自己 | "The destination MAC address helps devices determine if a frame is addressed to them." |
| Source MAC Address | 來源 MAC；發出 frame 嘅 NIC | "The source MAC address is the originating NIC or interface of the frame." |
| Type Field | 類型欄位；指明封裝嘅上層協議 | "The Type field identifies the upper layer protocol encapsulated: 0x800 for IPv4, 0x86DD for IPv6, 0x806 for ARP." |
| Data Field | 資料欄位；載住上層封裝嘅 packet | "The Data field contains the encapsulated data from a higher layer (packet)." |
| FCS (Frame Check Sequence) | 訊框檢查序列；用 CRC 偵錯 | "The FCS is used to detect errors in a frame with a cyclic redundancy check." |
| Pad | 填充位；令過細嘅 frame 加到 64 bytes | "If a small packet is encapsulated, additional bits called a pad are put into the Data field to increase the frame to 64 bytes." |
| Runt Frame / Collision Fragment | 過短訊框；細過 64 bytes | "A runt frame or collision fragment is a frame less than 64 bytes." |
| Jumbo Frame / Baby Giant Frame | 過大訊框；大過 1500 bytes | "A jumbo frame or baby giant frame is a frame larger than 1500 bytes." |
| MAC Address | 實體地址；48-bit、12 個 hexadecimal 數字、硬件實現 | "A MAC address is a 48-bit binary value expressed as 12 hexadecimal digits." |
| OUI (Organizationally Unique Identifier) | 組織唯一識別碼；頭 6 個 hexadecimal 數字由 IEEE 指派廠商 | "The first 6 hexadecimal digits of a MAC address are the vendor-assigned OUI, and the last 6 digits must be unique." |
| BIA (Burned-In Address) | 燒錄地址；MAC 永久編碼於 ROM | "The MAC address is referred to as a burned-in address because it is encoded into the ROM chip permanently." |
| Unicast MAC Address | 單播；一對一通訊 | "A unicast MAC address is used when a frame is sent from a single transmitting device to a single destination device." |
| Broadcast MAC Address | 廣播；48 個 1 即 FF-FF-FF-FF-FF-FF | "The broadcast frame contains a destination MAC address with 48 ones (FF-FF-FF-FF-FF-FF)." |
| Multicast MAC Address | 群播；以 01-00-5E 開頭 | "A multicast MAC address is a special value that begins with 01-00-5E in hexadecimal." |
| IPv4 Multicast Range | IPv4 群播地址範圍 | "The range of IPv4 multicast addresses is 224.0.0.0 to 239.255.255.255." |
| CAM Table / MAC Address Table | Switch 嘅 MAC → Port 對應表 | "A switch builds a MAC address table, sometimes called a content addressable memory (CAM) table, mapping MAC addresses to ports." |
| Learn (Source MAC) | 學習動作；記 source MAC 同入 port | "Every frame that enters a switch is examined for source MAC address and port number, and a new entry is added if it does not exist." |
| Refresh Timer | 更新計時器；默認保留記錄 5 分鐘 | "Most switches keep an entry in the MAC address table for 5 minutes by default." |
| Forward (Destination MAC) | 轉發動作；比對 destination MAC 查表 | "A switch forwards frames by searching for a match between the destination MAC address and an entry in the MAC address table." |
| Unknown Unicast | 未知單播；查唔到就 flooding | "If the destination MAC address is not in the table, the switch forwards the frame out all ports except the incoming port." |
| Flooding | 洪泛；除來源 port 外全部轉出 | "Broadcast and multicast frames are flooded out all ports except the incoming port." |
| Fast-forward Switching | 快速轉發；讀完目的地就轉 | "Fast-forward switching immediately forwards a packet after reading the destination address." |
| Fragment-free Switching | 無碎片轉發；先存頭 64 bytes | "Fragment-free switching stores the first 64 bytes of the frame before forwarding." |
| Store-and-Forward | 儲存後轉發；收晒驗 CRC 先轉（對應題解用語） | "Store-and-Forward buffers the entire frame and verifies it with CRC before forwarding." |
| Cut-Through | 直通轉發；等同 fast-forward（對應題解用語） | "Cut-Through forwards the frame as soon as the destination Layer 2 address is read." |
| Memory Buffering | 記憶體緩衝；儲 frame 等 port 空閒 | "An Ethernet switch may use memory buffering to store frames when the destination port is busy due to congestion." |
| Full-duplex | 全雙工；兩端可同時收發 | "Full-duplex means both ends of the connection can send and receive simultaneously." |
| Half-duplex | 半雙工；同一時間只有一端可發 | "Half-duplex means only one end of the connection can send at a time." |
| Duplex Mismatch | 雙工不匹配；一邊半雙工一邊全雙工 | "A duplex mismatch occurs when one port on the link operates at half-duplex while the other operates at full-duplex." |
| Auto-MDIX | 自動偵測纜線類型；默認啟用 | "With auto-MDIX enabled by default, the switch detects the type of cable attached to the port and configures the interfaces accordingly." |
| Default Gateway | 預設閘道；跨網絡時 frame 先送嘅 router | "If the destination host is on another network, the destination address in the frame would be that of the default gateway." |
| ARP (Address Resolution Protocol) | 地址解析協議；將 IPv4 解析成 MAC | "A device uses ARP to determine the destination MAC address of a local device when it knows its IPv4 address." |
| ARP Table / ARP Cache | IP ↔ physical address 對應表，存喺 RAM | "An ARP table contains the mapping of IP addresses to physical addresses and is stored in the RAM of the device." |
| ARP Request | ARP 請求；Layer 2 broadcast 查 MAC | "An ARP request is a Layer 2 broadcast (FFFF.FFFF.FFFF) to all devices on the Ethernet LAN." |
| ARP Reply | ARP 回覆；目標以 unicast 答自己 MAC | "The node that matches the IP address in the broadcast responds with an ARP Reply containing its own MAC address." |
| Physical Address (MAC) | 實體地址；同一網絡 NIC 對 NIC 用 | "Physical addresses are used to deliver the data link frame from one NIC to another NIC on the same network." |
| Logical Address (IP) | 邏輯地址；端到端識別來源同目的地 | "Logical addresses are used to identify the location of the original source and the final destination." |
| ARP Spoofing | ARP 欺騙／毒化；冒認 gateway 攔截流量 | "In an ARP spoofing attack, the attacker sends an ARP reply with its own MAC address instead of the default gateway's, so the victim sends packets to the attacker." |
| Dynamic ARP Inspection | 動態 ARP 檢查；核對 MAC↔IP 綁定 | "Enterprise level switches use dynamic ARP inspection to check MAC address to IP address bindings." |
| IP Source Guard | IP 來源防護；核對 MAC↔IP 綁定 | "IP Source Guard checks MAC address to IP address bindings." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

1. **先理解觀念（Understand）**
   - 理解 frame 係「信封」：**Preamble 係頭、FCS 係尾**，中間係 Destination MAC → Source MAC → Type → Data。
   - 理解 Switch 嘅「兩步曲」：**學 Source MAC（入 port）→ 查 Destination MAC**。學習係為咗將來唔使再 flooding。
   - 理解 MAC 同 IP 為何要分開：**MAC 只喺一段網絡內有效（逐跳變），IP 由頭到尾不變（端到端）**；同段直接送對方 MAC，跨段先送 Default Gateway 嘅 MAC。
2. **背誦英文短語（Memorize）**
   - 背死數字：**最小 64 bytes、最大 1518 bytes、jumbo > 1500 bytes、MAC 48 bits = 12 個 hexadecimal digits、OUI 頭 6 位（頭 3 bytes）、switch 默認保留 entry 5 分鐘、multicast MAC 以 01-00-5E 開頭、Broadcast = FF-FF-FF-FF-FF-FF**。
   - 背死 Type 值：**0x800 = IPv4、0x86DD = IPv6、0x806 = ARP**。
   - 背熟四條 Exam Answer Phrase：LLC 同 MAC 分工、frame 欄位功能、switch 學／查規則、ARP 流程同 MAC/IP 逐跳規則。
3. **掌握判斷（Apply）——三類規則題**
   - **Switch 題**：見到 frame 先問兩句——「Source MAC 喺表未？」（決定有冇更新）→「Destination 喺表未／係咪 broadcast 或 multicast？」（決定精準轉發定 flooding）。
   - **ARP 題**：先問「同唔同 subnet？」同段 → ARP 目的 PC 嘅 IP；跨段 → ARP **Default Gateway** 嘅 IP（永遠唔會直接 ARP 遠端主機）。
   - **填 Frame 題**：睇「邊個出呢個 frame、下一個 hop 係邊個」填 MAC；Source IP 同 Destination IP 由頭到尾照抄最初嗰兩個值。
4. **能解答英文考題（Exam-ready）**
   - "What are the two sublayers of the data link layer that Ethernet relies on?" → "Logical Link Control (LLC) and Media Access Control (MAC)."
   - "What is the minimum and maximum size of an Ethernet frame?" → "The minimum is 64 bytes and the maximum is 1518 bytes, counted from the destination MAC address through the FCS."
   - "What is a MAC address?" → "A 48-bit binary value expressed as 12 hexadecimal digits, with the first 6 hexadecimal digits being the vendor-assigned OUI."
   - "How does a switch handle a frame with an unknown destination MAC address?" → "It forwards the frame out all ports except the incoming port (unknown unicast flooding)."
   - "What are the two basic functions of ARP?" → "Maintaining an ARP table that maps IP addresses to physical addresses, and resolving local IP addresses to MAC addresses via ARP request and ARP reply."
   - "Which MAC address is used as the destination when the destination IP is on a different network?" → "The MAC address of the default gateway on the same LAN."
   - "Why is ARP vulnerable?" → "ARP has no authentication, so an attacker can send a spoofed ARP reply to make hosts map a target IP to the attacker's MAC address; dynamic ARP inspection and IP Source Guard are used to check MAC-to-IP bindings."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**🔢 關鍵數字（Key Numbers）**

| 項目 | 數值 |
| :--- | :--- |
| Ethernet frame 最小 | **64 bytes**（由 Destination MAC 數到 FCS，Preamble 唔計） |
| Ethernet frame 最大 | **1518 bytes** |
| Jumbo / baby giant 門檻 | 大過 **1500 bytes** |
| Runt / collision fragment | 細過 **64 bytes** |
| MAC address | **48 bits = 12 個 hexadecimal digits = 6 bytes** |
| OUI | 頭 **6 個 hexadecimal digits**（頭 3 bytes）；尾 6 位唯一 |
| Switch MAC entry 預設保留 | **5 分鐘** |
| Multicast MAC 開頭 | **01-00-5E**（IPv4 multicast：224.0.0.0 – 239.255.255.255） |
| Broadcast MAC | **FF-FF-FF-FF-FF-FF**（48 個 1）／Layer 2 broadcast 寫法 FFFF.FFFF.FFFF |
| Type 值 | **0x800 = IPv4／0x86DD = IPv6／0x806 = ARP** |

**⚖️ 對比表（Comparison Tables）**

| | LLC sublayer | MAC sublayer |
| :--- | :--- | :--- |
| 實現 | Software（軟件） | Hardware（硬件） |
| 工作 | 同上層溝通、標明上層協議 | 加 header／trailer 封裝、放 frame 上 media、錯誤偵測 |

| Frame 情況 | 有冇更新表 | 轉發 |
| :--- | :--- | :--- |
| Destination 已知（unicast） | Source 未學過先會更新 | 只出目標 port |
| Destination 未知（unknown unicast） | 學 Source MAC | **Flooding**（除入 port 外全部） |
| Broadcast / Multicast | 學 Source MAC | **Flooding**（除入 port 外全部） |

| | Fast-forward（Cut-Through） | Fragment-free | Store-and-Forward |
| :--- | :--- | :--- | :--- |
| 幾時轉 | 一讀到 destination address 即轉 | 存夠 **64 bytes** 先轉 | 收晒全個 frame 先轉 |
| 檢查 | 冇 | 過濾頭 64 bytes 內嘅錯誤／collision | CRC 驗證，壞 frame 丟棄 |
| 特性 | 最快、可能轉壞 frame | 折衷 | 最可靠、延遲高 |

| | 本地通訊 | 跨網絡通訊 |
| :--- | :--- | :--- |
| Destination MAC | 目的裝置自己嘅 MAC | **Default Gateway 嘅 MAC**（之後逐個 hop 換） |
| Source MAC | 自己嘅 MAC | 每個 hop 換成出接口嘅 MAC |
| Source / Destination IP | 唔變 | **全程唔變**（多過一個 frame 都一樣） |
| ARP 查邊個 IP | 目的裝置嘅 IP | **只有 Default Gateway 嘅 IP** |

| | Full-duplex | Half-duplex |
| :--- | :--- | :--- |
| 收發 | 兩端**同時**收發 | 同一時間只有一端可發 |
| 出事情況 | — | **Duplex Mismatch**（一邊 half、一邊 full） |

**🎤 英文記憶口訣（Mnemonics）**

- **「Ethernet 係最廣泛用嘅 LAN 技術，跨 Layer 1 同 Layer 2」** — "Ethernet is the most widely used LAN technology today; it operates in the data link layer and the physical layer."
- **「LLC 管溝通，MAC 管封裝」** — "LLC handles communication with the upper layers; MAC performs data encapsulation and media access control."
- **「64 到 1518，Preamble 唔計」** — "Minimum 64 bytes, maximum 1518 bytes, counted from the destination MAC through the FCS; the preamble is not included."
- **「48 bits、12 個 Hex、頭 6 位係 OUI」** — "A MAC address is a 48-bit value expressed as 12 hexadecimal digits; the first 6 digits are the OUI."
- **「FF-FF-FF-FF-FF-FF 就係 Broadcast，見廣播就 Flood」** — "A destination of all 48 ones means broadcast, so the switch floods it."
- **「學 Source，查 Destination」** — "The switch learns the source MAC address and forwards based on the destination MAC address."
- **「搵唔到 Destination 就 flooding」** — "If the destination MAC is not in the table, the switch forwards the frame out all ports except the incoming port."
- **「MAC 逐跳變，IP 全程不變」** — "MAC addresses change in different frames, but the source and destination IP addresses stay the same in all frames."
- **「同段 ARP 對方，跨段 ARP Gateway」** — "ARP the peer on the same network; ARP the default gateway for a destination on a different network."
- **「ARP 冇認證，所以有人冒認 Gateway」** — "ARP has no authentication, so an attacker can spoof the default gateway's MAC address; dynamic ARP inspection and IP Source Guard check MAC-to-IP bindings."

**✅ 60 秒自測清單**

1. Ethernet 靠 data link layer 邊兩個 sublayer 運作？→ LLC 同 MAC。
2. Frame 由邊個欄位數到邊個欄位？→ Destination MAC 數到 FCS（Preamble 唔計）。
3. 最小同最大 frame 大細？→ 64 bytes ／ 1518 bytes。
4. 邊個欄位話你知入面封裝嘅係 IPv4？→ Type = 0x800。
5. Broadcast MAC 係咩？→ FF-FF-FF-FF-FF-FF。
6. Multicast MAC 以咩開頭？→ 01-00-5E。
7. Switch 更新表係睇 source 定 destination MAC？→ Source。
8. Query 唔到 destination MAC 會點？→ Flooding（除入 port 外全部）。
9. Fragment-free 點解要存 64 bytes？→ 因為大部分錯誤同 collision 都發生喺頭 64 bytes。
10. Auto-MDIX 解決咩問題？→ 唔需要分 straight-through / crossover，switch 自己偵測纜線類型。
11. ARP 嘅兩大功能？→ 維護 ARP table（IP → physical address）＋用 ARP request／reply 解析 MAC。
12. 跨網絡時 ARP 邊個 IP？→ Default Gateway 嘅 IP。
13. 跨網絡時 MAC 同 IP 有咩分別？→ MAC 逐跳變，IP 全程不變。
14. ARP Spoofing 點做？→ 攻擊者用自己 MAC 冒充 gateway 發 ARP reply，令受害者送錯流量。
15. 企業 switch 用咩技術擋？→ Dynamic ARP inspection 同 IP Source Guard。
