# ITE3102 L7: IPv4 Addressing — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Module 11: IPv4 Addressing
> **原始檔**：`01_Raw_Materials/Lectures/Lecture7_IPv4Addressing.pptx`
> **題解對應**：`ITE3102_T7_IPv4Addressing_StudyGuide.md`（同一課嘅 Tutorial 練習題解）
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 自己動手做一次 subnetting → 考前用懶人包速記

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

呢一課（ITN Module 11）係整個 Network Fundamentals 嘅「計數心臟」。前面幾課講嘅係「設備點連線、封包點走」，但一直未解答一個根本問題：**每個 interface 上面嗰串數字（IPv4 address）到底代表咩？** L7 就係一次性拆解 IPv4 定址嘅全部機械原理：IPv4 address 係一個 **32-bit hierarchical address**，由 **network portion** 同 **host portion** 兩截組成；**subnet mask**（或寫成 **prefix length**，例如 `/24`）就係嗰把「刀」，用嚟喺 32 個 bit 之間劃出邊界。跟住落嚟係邏輯 **AND** 運算——只要識得計 AND，就即刻求出 **network address**；再將 host bits 全部變 1，就得到 **broadcast address**；兩者之間嘅就係 **host range**。呢三條地址係所有 subnetting 題目嘅核心，考試必出。

第二截講「地址嘅種類同用途」。地址唔係亂派：有 **unicast**（1 對 1）、**broadcast**（1 對全部）、**multicast**（1 對一群，reserved range `224.0.0.0` – `239.255.255.255`）；有 **public**（全球路由）同 **private**（RFC 1918 三個 block，唔可以喺互聯網路由，要靠 **NAT** 轉換）；仲有 **special use** 地址——**loopback** `127.0.0.0/8` 用嚟測 TCP/IP 有冇壞，**link-local** `169.254.0.0/16`（即 **APIPA**）係 Windows client 搵唔到 DHCP server 時自己頂上嘅地址。歷史上仲有 **legacy classful addressing**（Class A/B/C/D/E），但因為浪費太多地址，已經被 **classless addressing** 取代。最後一截係本課嘅實戰價值：**network segmentation** 同 **subnetting**。大型 broadcast domain 會令網絡被無謂廣播壓死（switch 會將 broadcast 由所有介面推出去，唯一會擋住 broadcast 嘅設備係 router），所以要用 subnetting 切細個網絡。之後就係一連串計算示範：喺 octet 邊界（/8、/16、/24）點切、喺 octet 內部點切（/25 至 /30）、`/16` 網絡點切 100 個 subnet、`/8` 網絡點切 1000 個 subnet、最後用 **VLSM（Variable Length Subnet Masking）**「subnet 一個 subnet」去避免浪費地址。

實務情境一（企業網絡規劃）：一間公司向 ISP 攞到 `172.16.0.0/22`，總部同四間分公司各自要一條互聯網連線，即係總共 10 個 subnet，而最大嗰個 subnet 要 40 個地址。網絡管理員唔可以「亂切」，要用 `2^n ≥ 需求數` 反推要 borrow 幾多 bit、新 mask 係咩、每個 subnet 有幾多可用 host、頭尾地址係咩。呢個流程（教材 11.7 嘅 Efficient IPv4 Subnetting）就係本課最重要嘅應用題。

實務情境二（ISP 或大型企業）：一間細 ISP 手上係 `10.0.0.0/8`，要為客戶開 **1000 個 subnet**。由 `/8` 開始有 24 個 host bit 可以借，但**最尾兩個 bit 唔可以借**（要留返做 network 同 broadcast 語意），所以最多可以借 22 bit。同樣道理，如果全部 subnet 都用同一個大小（fixed length），三條 WAN link（每條只需要 2 個地址）就每條浪費 28 個地址——呢個正正係 **VLSM** 出場嘅理由：**subnet a subnet**，按實際需求派唔同長度嘅 mask。另外，「邊啲設備用 private address、邊啲用 public address」亦要靠 **intranet / DMZ** 嘅架構概念去決定，而地址派法（client 用 **DHCP**、server 用 **static**、intermediary device 用嚟做管理）就係 **structured design** 嘅內容。

➜ 實作見 `ITE3102_PT11_Subnetting_CodeGuide.md`（Packet Tracer Subnetting Scenario，將呢課嘅計數搬落真機 CLI）

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **解釋 IPv4 地址嘅階層結構** — Explain that an IPv4 address is a 32-bit hierarchical address made up of a network portion and a host portion
2. **用 subnet mask 分辨 network 與 host 部分** — Explain how a subnet mask is compared with the IPv4 address bit by bit to identify the network and host portions
3. **執行 logical AND 運算求 network address** — Perform a logical AND operation between an IPv4 address and its subnet mask to determine the network address
4. **換算 prefix length 與 subnet mask** — Convert between subnet masks and prefix lengths using slash notation
5. **分辨 network / host / broadcast 三種地址** — Identify the network address, host addresses and broadcast address within a network
6. **分辨 unicast / broadcast / multicast** — Compare unicast, broadcast and multicast transmissions and state the reserved multicast range
7. **分辨 public 與 private IPv4 地址** — Distinguish public from private IPv4 addresses and state the RFC 1918 ranges
8. **解釋 NAT 嘅作用** — Explain how Network Address Translation translates private IPv4 addresses to public IPv4 addresses
9. **辨認 special use 地址** — Recognise loopback (127.0.0.0/8) and link-local / APIPA (169.254.0.0/16) addresses and their purposes
10. **描述 legacy classful addressing 及其問題** — Describe legacy Class A/B/C/D/E addressing and why classful addressing wasted IPv4 addresses
11. **解釋 IANA 與 RIR 嘅角色** — Explain how IANA allocates address blocks to the five Regional Internet Registries (RIRs)
12. **解釋為何要 subnet 及 segmentation 嘅好處** — Explain broadcast domains, why large broadcast domains are a problem, and the reasons for segmenting networks
13. **喺 octet 邊界同 octet 內部 subnet** — Subnet a network on an octet boundary (/8, /16, /24) and within an octet boundary (/25 to /30)
14. **計出 subnet 數目同每 subnet 可用 host 數** — Calculate the number of subnets and the number of usable hosts per subnet (`2^n` 同 `2^h − 2`)
15. **由需求反推 borrow 幾多 bit** — Determine how many bits must be borrowed to satisfy a required number of subnets
16. **計出每個 subnet 嘅 network address / first-last host / broadcast** — Determine the network address, first and last host address, and broadcast address of each subnet
17. **解釋 VLSM 點樣慳地址** — Explain how Variable Length Subnet Masking avoids wasting addresses by subnetting a subnet
18. **為設備設計地址分配方案** — Describe device address assignment rules (DHCP for clients, static for servers, public addresses in the DMZ) and IPv4 network address planning

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 IPv4 Address Structure（IPv4 地址結構）

#### 3.1.1 Network and Host Portions（網絡與主機部分）

繁中解說：**IPv4 address** 係一個 **32-bit hierarchical address**——「階層式」嘅意思係佢唔係一舊過嘅號碼，而係分成兩截：**network portion**（網絡部分，話你知呢部機屬邊個網絡）同 **host portion**（主機部分，話你知佢係該網絡內邊一部機）。要用咩嚟分辨兩截？靠 **subnet mask**。呢個「階層」概念係整個 routing 世界嘅基礎：router 只需要睇 network portion 就可以決定封包應該轉去邊，唔使記住全球每一部主機嘅地址。

> **English Standard Definition:** An IPv4 address is a 32-bit hierarchical address that is made up of a network portion and a host portion. A subnet mask is used to determine the network and host portions.

#### 3.1.2 The Subnet Mask（子網遮罩）

繁中解說：**Subnet mask** 係一條 32-bit 嘅「尺」。用法係：**由左至右，逐個 bit 同 IPv4 address 比較**。mask 之中係 `1` 嘅位，對應嘅就係 **network portion**；係 `0` 嘅位，對應嘅就係 **host portion**。換句話講，mask 嘅 1 一定係由左邊連續排過來（所以先可以簡寫成 `/n`），唔會中間斷開。

> **English Standard Definition:** To identify the network and host portions of an IPv4 address, the subnet mask is compared to the IPv4 address bit for bit, from left to right.

> **圖示描述**：slide 4 展示一部 Windows 電腦嘅「IPv4 Configuration」畫面，顯示 IP address（例如 `192.168.10.10`）、subnet mask（`255.255.255.0`）同 default gateway 三個欄位並列，用嚟說明實機上 subnet mask 係同 IP address 一齊設定嘅參數。

#### 3.1.3 Determining the Network: Logical AND（用邏輯 AND 求網絡地址）

繁中解說：要由一部主機嘅 IPv4 address 求出佢所屬嘅 **network address**，工具就係 **logical AND Boolean operation**。規則極簡單：**只有 `1 AND 1` 先會出 `1`，其餘任何組合都出 `0`**。即係：

| 運算 | 結果 |
|---|---|
| 1 AND 1 | 1 |
| 0 AND 1 | 0 |
| 1 AND 0 | 0 |
| 0 AND 0 | 0 |

另外要記住 `1 = True`、`0 = False`。做法係：將 **host IPv4 address** 同 **subnet mask** 逐個 bit 做 AND。因為 mask 嘅 network 位係 `1`（`x AND 1 = x`，即原封不動保留），host 位係 `0`（`x AND 0 = 0`，即全部歸零），所以 AND 完之後嘅結果，就係 host bits 全 0 嘅 **network address**。呢個就係所有 subnetting 計算題嘅起手式。

> **English Standard Definition:** A logical AND Boolean operation is used in determining the network address. Logical AND is the comparison of two bits where only a 1 AND 1 produces a 1 and any other combination results in a 0. To identify the network address, the host IPv4 address is logically ANDed, bit by bit, with the subnet mask.

#### 3.1.4 The Prefix Length（前綴長度）

繁中解說：每次都寫 `255.255.255.192` 太累贅，所以有 **prefix length** 呢個簡寫法。**Prefix length = subnet mask 之中 `1` 嘅數目**。寫法叫 **slash notation**——數一數 mask 有幾多個 1，前面加一個斜線就係。所以 `255.255.255.0` 有 24 個 1，寫成 `/24`。考試時一定要識得「mask ↔ prefix」即時互換，尤其係 `/25` 至 `/30` 呢幾行（subnetting 題目最愛）。

**教材表格（slide 6）：Subnet Mask | 32-bit Address | Prefix Length**

| Subnet Mask | 32-bit Address | Prefix Length |
|---|---|---|
| 255.0.0.0 | 11111111.00000000.00000000.00000000 | /8 |
| 255.255.0.0 | 11111111.11111111.00000000.00000000 | /16 |
| 255.255.255.0 | 11111111.11111111.11111111.00000000 | /24 |
| 255.255.255.128 | 11111111.11111111.11111111.10000000 | /25 |
| 255.255.255.192 | 11111111.11111111.11111111.11000000 | /26 |
| 255.255.255.224 | 11111111.11111111.11111111.11100000 | /27 |
| 255.255.255.240 | 11111111.11111111.11111111.11110000 | /28 |
| 255.255.255.248 | 11111111.11111111.11111111.11111000 | /29 |
| 255.255.255.252 | 11111111.11111111.11111111.11111100 | /30 |

> **English Standard Definition:** A prefix length is a less cumbersome method used to identify a subnet mask address. The prefix length is the number of bits set to 1 in the subnet mask. It is written in "slash notation" — count the number of bits in the subnet mask and prepend it with a slash.

#### 3.1.5 Network, Host, and Broadcast Addresses（網絡、主機與廣播地址）

繁中解說：任何一個網絡入面都有三種 IP 地址：

1. **Network address**（網絡地址）——host bits **全部係 0**，用嚟代表成個網絡，**唔可以派俾任何主機**。
2. **Host addresses**（主機地址）——host bits 之間有 0 有 1 嘅所有地址，可以派俾 end device。第一個 host address 係「全 0 加一個 1」（Network + 1），最後一個 host address 係「全 1 減一個 0」（Broadcast − 1）。
3. **Broadcast address**（廣播地址）——host bits **全部係 1**，用嚟向該網絡內所有主機一次過發送，**唔可以派俾任何主機**。

**教材表格（slide 7）：以 192.168.10.0/24 為例**

| | Network Portion | Host Portion | Host Bits |
|---|---|---|---|
| Subnet mask 255.255.255.0 或 /24 | 255 255 255 — 11111111 11111111 11111111 | 0 — 00000000 | （32 個 bit 嘅分界） |
| Network address 192.168.10.0 或 /24 | 192 168 10 — 11000000 10101000 00001010 | 0 — 00000000 | All 0s |
| First address 192.168.10.1 或 /24 | 192 168 10 — 11000000 10101000 00001010 | 1 — 00000001 | All 0s and a 1 |
| Last address 192.168.10.254 或 /24 | 192 168 10 — 11000000 10101000 00001010 | 254 — 11111110 | All 1s and a 0 |
| Broadcast address 192.168.10.255 或 /24 | 192 168 10 — 11000000 10101000 00001010 | 255 — 11111111 | All 1s |

> ⚠️ 原教材（Lecture 7 講義）此列印住 10100000，屬筆誤；**168 = 10101000**（128 + 32 + 8）。

所以 `/24` 網絡嘅地址數量係 `2^8 = 256` 個，扣掉 network address 同 broadcast address，**可用 host = 256 − 2 = 254**。（教材 11.1 亦設有 "Activity – ANDing to Determine the Network Address" 同 "Check Your Understanding" 練習。）

> **English Standard Definition:** Within each network there are three types of IP addresses: the network address (all host bits 0), host addresses, and the broadcast address (all host bits 1).

### 3.2 IPv4 Unicast, Broadcast, and Multicast（單播、廣播與組播）

繁中解說：同一個 IPv4 地址空間，按「送到幾多部機」可以分成三種傳送方式：

| 類型 | 對象 | 目的地址特徵 | 教材原文重點 |
|---|---|---|---|
| **Unicast** | One to one | 目的地址 = 目的地設備嘅地址 | 一對一，最常見 |
| **Broadcast** | One to all | host portion 全部係 1 | 分 **direct broadcast**（指向某個特定網絡）同 **limited broadcast**（指向本機所在嘅 local network） |
| **Multicast** | One to selected group | 保留範圍 `224.0.0.0` 至 `239.255.255.255` | router 用嚟交換 routing information |

重點記憶：**multicast 範圍係 `224.0.0.0` – `239.255.255.255`**，即第一個 octet 落喺 224 至 239 之間。`224.0.0.1` 就係呢個範圍嘅第一個可用 multicast 地址（all-hosts group，本課範圍嘅定址慣例），考試見到 `225.x.x.x`、`237.x.x.x` 一律係 multicast。Broadcast 唔會跨 router 傳送（router 係唯一會擋住 broadcast 嘅設備），所以 broadcast 嘅影響範圍就係一個 **broadcast domain**。

> **English Standard Definition:** Unicast is one to one — the destination address is the address of the destination device. Broadcast is one to all — the destination address has all 1's in the host portion; a direct broadcast is to a specific network and a limited broadcast is to the local network. Multicast is one to a selected group — it is used by routers to exchange routing information, and the reserved destination address range is 224.0.0.0 to 239.255.255.255.

### 3.3 Types of IPv4 Addresses（IPv4 地址種類）

#### 3.3.1 Public and Private IPv4 Addresses（公有與私有地址）

繁中解說：**Public IPv4 addresses** 係喺互聯網上、由一家家 **ISP router** 之間全球路由嘅地址（全球唯一）。**Private addresses** 係大部分機構用嚟派俾內部主機嘅常用地址區塊，佢哋嘅特徵係：**唔唯一**（唔同公司可以撞）、可以喺任何網絡內部使用、**唔可以全球路由（NOT globally routable）**。咁內網主機點上網？靠 **Network Address Translation (NAT)**——NAT 負責將 private IPv4 address 轉譯成 public IPv4 address，出去互聯網用 public，返入內網再轉返 private。

**教材表格（slide 9）：RFC 1918 Private Address Range**

| Network Address and Prefix | RFC 1918 Private Address Range |
|---|---|
| 10.0.0.0/8 | 10.0.0.0 - 10.255.255.255 |
| 172.16.0.0/12 | 172.16.0.0 - 172.31.255.255 |
| 192.168.0.0/16 | 192.168.0.0 - 192.168.255.255 |

背誦陷阱：`172` 開頭只有 **172.16 至 172.31** 先係 private（`/12`），`172.32` 起已經係 public。

> **English Standard Definition:** Public IPv4 addresses are globally routed between internet service provider (ISP) routers. Private addresses are common blocks of addresses used by most organizations to assign IPv4 addresses to internal hosts; they are not unique, can be used internally within any network, and are NOT globally routable. Network Address Translation (NAT) translates private IPv4 addresses to public IPv4 addresses.

#### 3.3.2 Special Use IPv4 Addresses（特殊用途地址）

繁中解說：除咗 public / private，仲有兩類「唔用嚟正常通訊」嘅地址，考試成日考：

- **Loopback addresses（回送地址）**：`127.0.0.0/8`（實際可範圍 `127.0.0.1` 至 `127.255.255.254`），日常通常只寫 `127.0.0.1`。用途：**喺本機測試 TCP/IP 有冇正常運作**（ping 自己）。留意 `127.0.0.0` 同 `127.255.255.255` 唔會派俾主機。
- **Link-Local addresses（連結本地位址）**：`169.254.0.0/16`（`169.254.0.1` 至 `169.254.255.254`），俗稱 **APIPA（Automatic Private IP Addressing）** 或「self-assigned addresses」。用途：**Windows DHCP client 喺完全搵唔到 DHCP server 嘅時候，自己配置一個地址頂住**。實務上見到電腦攞到 `169.254.x.x`，即係 DHCP 出事（DHCP server 死咗、線路／VLAN 有問題）。

> **English Standard Definition:** Loopback addresses are 127.0.0.0/8 (127.0.0.1 to 127.255.255.254), commonly identified as only 127.0.0.1, and are used on a host to test if TCP/IP is operational. Link-Local addresses are 169.254.0.0/16 (169.254.0.1 to 169.254.255.254), commonly known as the Automatic Private IP Addressing (APIPA) addresses or self-assigned addresses, and are used by Windows DHCP clients to self-configure when no DHCP servers are available.

#### 3.3.3 Legacy Classful Addressing（舊式分級定址）

繁中解說：歷史上，**RFC 790（1981）** 將 IPv4 地址按「class（級）」分配。每個 class 有固定嘅 prefix 長度，所以唔需要寫 mask 都知道 network 部分有幾長：

| Class | 範圍 |
|---|---|
| Class A | 0.0.0.0/8 至 127.0.0.0/8 |
| Class B | 128.0.0.0/16 – 191.255.0.0/16 |
| Class C | 192.0.0.0/24 – 223.255.255.0/24 |
| Class D | 224.0.0.0 至 239.0.0.0（multicast） |
| Class E | 240.0.0.0 – 255.0.0.0（experimental／保留） |

問題在於：一個機構分到 Class B，就硬食 65,534 個 host 地址，但佢可能只有幾十部機——**classful addressing wasted many IPv4 addresses**。所以 **classful address allocation 已經被 classless addressing 取代**，classless 係**忽略 Class A、B、C 嘅規則**，可以用任何 prefix length（例如 /26、/27），呢個就係 CIDR/prefix length 靈活切網嘅基礎。

> **English Standard Definition:** RFC 790 (1981) allocated IPv4 addresses in classes: Class A (0.0.0.0/8 to 127.0.0.0/8), Class B (128.0.0.0/16 – 191.255.0.0/16), Class C (192.0.0.0/24 – 223.255.255.0/24), Class D (224.0.0.0 to 239.0.0.0) and Class E (240.0.0.0 – 255.0.0.0). Classful addressing wasted many IPv4 addresses. Classful address allocation was replaced with classless addressing, which ignores the rules of classes (A, B, C).

#### 3.3.4 Assignment of IP Addresses（地址嘅分配機制）

繁中解說：全球嘅 IPv4/IPv6 地址唔係隨便派：**IANA（Internet Assigned Numbers Authority）** 負責管理，並將地址區塊分配到 **五個 RIR（Regional Internet Registries，區域互聯網註冊管理機構）**；**RIR 再將地址分配俾 ISP**，ISP 就將 IPv4 address block 提供畀更細嘅 ISP 同各間機構。所以一間公司攞到嘅 public block，係由 ISP 手上嘅 block 切出嚟嘅。

> **English Standard Definition:** The Internet Assigned Numbers Authority (IANA) manages and allocates blocks of IPv4 and IPv6 addresses to five Regional Internet Registries (RIRs). RIRs are responsible for allocating IP addresses to ISPs, who provide IPv4 address blocks to smaller ISPs and organizations.

### 3.4 Network Segmentation（網絡分段）

#### 3.4.1 Broadcast Domains and Segmentation（廣播域與分段）

繁中解說：好多 protocol 都靠 broadcast 或 multicast 運作——例如 **ARP 用 broadcast 去搵其他設備**，host 送出 **DHCP discover broadcast** 去搵 DHCP server。問題係 **switch 會將 broadcast 由所有介面推出去（除咗收到嗰個介面之外）**，而**唯一會停止 broadcast 嘅設備係 router**。所以一個大 broadcast domain（例如一間公司所有機都喺同一網段）嘅壞處係：主機可以產生**過量 broadcast**，直接拖慢網絡。解決方法就係將網絡切細——**subnetting**，即係造出多個細啲嘅 broadcast domain。

> **English Standard Definition:** Many protocols use broadcasts or multicasts (e.g. ARP uses broadcasts to locate other devices; hosts send DHCP discover broadcasts to locate a DHCP server). Switches propagate broadcasts out all interfaces except the interface on which it was received. The only device that stops broadcasts is a router. A problem with a large broadcast domain is that these hosts can generate excessive broadcasts and negatively affect the network. The solution is to reduce the size of the network to create smaller broadcast domains in a process called subnetting.

#### 3.4.2 Reasons for Segmenting Networks（分段嘅理由）

繁中解說：Subnetting 唔止係「計數遊戲」，佢帶來三項實際好處：

1. **減少整體網絡流量、提升效能**（reduces overall network traffic and improves network performance）——因為 broadcast 被困喺細域入面。
2. **可以喺 subnet 之間實施安全政策**（implement security policies between subnets）——因為跨 subnet 一定要經 router，router 就可以用 ACL 等工具過濾。
3. **減少受異常廣播流量影響嘅設備數量**（reduces the number of devices affected by abnormal broadcast traffic）。

實際按咩原則切？教材列咗三種常見劃分依據：**Location（地點，例如每個樓層／每棟大樓一個 subnet）、Group or Function（群組或功能，例如會計部、研發部）、Device Type（設備類型，例如 printer、server）**。

> **English Standard Definition:** Subnetting reduces overall network traffic and improves network performance. It can be used to implement security policies between subnets. Subnetting reduces the number of devices affected by abnormal broadcast traffic. Subnets are used for a variety of reasons including by location, group or function, and device type.

### 3.5 Subnet an IPv4 Network（為 IPv4 網絡切子網）

#### 3.5.1 Subnet on an Octet Boundary（喺 octet 邊界切）

繁中解說：最簡單嘅 subnetting 就係喺 **octet boundary** 落刀，即 `/8`、`/16`、`/24`——因為呢啲 mask 啱啱好切成整整齊齊嘅 8-bit 一組，唔使做複雜嘅二進制分割。關鍵觀察：**prefix length 越長，每個 subnet 嘅 host 數量越少**。

**教材表格（slide 15）**

| Prefix Length | Subnet Mask | Subnet Mask in Binary (n = network, h = host) | # of hosts |
|---|---|---|---|
| /8 | 255.0.0.0 | nnnnnnnn.hhhhhhhh.hhhhhhhh.hhhhhhhh — 11111111.00000000.00000000.00000000 | 16,777,214 |
| /16 | 255.255.0.0 | nnnnnnnn.nnnnnnnn.hhhhhhhh.hhhhhhhh — 11111111.11111111.00000000.00000000 | 65,534 |
| /24 | 255.255.255.0 | nnnnnnnn.nnnnnnnn.nnnnnnnn.hhhhhhhh — 11111111.11111111.11111111.00000000 | 254 |

數字核對：`/8` 有 24 個 host bit → `2^24 − 2 = 16,777,214`；`/16` 有 16 個 host bit → `2^16 − 2 = 65,534`；`/24` 有 8 個 host bit → `2^8 − 2 = 254`。**可用 host 數永遠係 `2^h − 2`**，減 2 係減 network address 同 broadcast address。

> **English Standard Definition:** Networks are most easily subnetted at the octet boundary of /8, /16, and /24. Using longer prefix lengths decreases the number of hosts per subnet.

#### 3.5.2 Subnet on an Octet Boundary (Cont.)（邊界切割示範）

繁中解說：教材用 `10.0.0.0/8` 做示範。第一張表用 `/16` mask 嚟切（即借第二個 octet 做 subnet），第二張表用 `/24` mask（借第二、三個 octet）。

**教材表格 A（slide 16）：以 /16 切 10.0.0.0/8 —— Subnet Address（256 Possible Subnets）| Host Range（65,534 possible hosts per subnet）| Broadcast**

| Subnet Address | Host Range | Broadcast |
|---|---|---|
| 10.0.0.0/16 | 10.0.0.1 - 10.0.255.254 | 10.0.255.255 |
| 10.1.0.0/16 | 10.1.0.1 - 10.1.255.254 | 10.1.255.255 |
| 10.2.0.0/16 | 10.2.0.1 - 10.2.255.254 | 10.2.255.255 |
| 10.3.0.0/16 | 10.3.0.1 - 10.3.255.254 | 10.3.255.255 |
| 10.4.0.0/16 | 10.4.0.1 - 10.4.255.254 | 10.4.255.255 |
| 10.5.0.0/16 | 10.5.0.1 - 10.5.255.254 | 10.5.255.255 |
| 10.6.0.0/16 | 10.6.0.1 - 10.6.255.254 | 10.6.255.255 |
| 10.7.0.0/16 | 10.7.0.1 - 10.7.255.254 | 10.7.255.255 |
| ... | ... | ... |
| 10.255.0.0/16 | 10.255.0.1 - 10.255.255.254 | 10.255.255.255 |

**教材表格 B（slide 16）：以 /24 切 10.0.0.0/8 —— Subnet Address（65,536 Possible Subnets）| Host Range（254 possible hosts per subnet）| Broadcast**

| Subnet Address | Host Range | Broadcast |
|---|---|---|
| 10.0.0.0/24 | 10.0.0.1 - 10.0.0.254 | 10.0.0.255 |
| 10.0.1.0/24 | 10.0.1.1 - 10.0.1.254 | 10.0.1.255 |
| 10.0.2.0/24 | 10.0.2.1 - 10.0.2.254 | 10.0.2.255 |
| … | … | … |
| 10.0.255.0/24 | 10.0.255.1 - 10.0.255.254 | 10.0.255.255 |
| 10.1.0.0/24 | 10.1.0.1 - 10.1.0.254 | 10.1.0.255 |
| 10.1.1.0/24 | 10.1.1.1 - 10.1.1.254 | 10.1.1.255 |
| 10.1.2.0/24 | 10.1.2.1 - 10.1.2.254 | 10.1.2.255 |
| … | … | … |
| 10.100.0.0/24 | 10.100.0.1 - 10.100.0.254 | 10.100.0.255 |
| ... | ... | ... |
| 10.255.255.0/24 | 10.255.255.1 - 10.255.255.254 | 10.255.255.255 |

核對：`/8` 切 `/16` = 借 8 bit → `2^8 = 256` 個 subnet，每個剩 16 個 host bit → `2^16 − 2 = 65,534` 個可用 host。`/8` 切 `/24` = 借 16 bit → `2^16 = 65,536` 個 subnet，每個剩 8 個 host bit → `2^8 − 2 = 254` 個可用 host。教材最後一行印成 `10.2255.255.254`，屬原檔打字錯誤，正確應為 `10.255.255.254`。

> **English Standard Definition:** In the first table 10.0.0.0/8 is subnetted using /16, and in the second table a /24 mask. Each subnet's host range starts at the subnet address plus one and ends at the broadcast address minus one.

#### 3.5.3 Subnet within an Octet Boundary（喺 octet 內部切）

繁中解說：現實世界唔會永遠咁「齊整」。當你需要多過 256 個 subnet，或者每個 subnet 唔想派到 65,534 個地址，就要**喺一個 octet 內部落刀**——即係 mask 嘅最後一個 octet 唔再係 0 或 255，而係 `128`、`192`、`224`、`240`、`248`、`252`。呢六個值就係 `/25` 至 `/30`，係本課最核心嘅計算範圍。

**教材表格（slide 17）：六種切 /24 網絡嘅方法**

| Prefix Length | Subnet Mask | Subnet Mask in Binary (n = network, h = host) | # of subnets | # of hosts |
|---|---|---|---|---|
| /25 | 255.255.255.128 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nhhhhhhh — 11111111.11111111.11111111.10000000 | 2 | 126 |
| /26 | 255.255.255.192 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnhhhhhh — 11111111.11111111.11111111.11000000 | 4 | 62 |
| /27 | 255.255.255.224 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnnhhhhh — 11111111.11111111.11111111.11100000 | 8 | 30 |
| /28 | 255.255.255.240 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnnnhhhh — 11111111.11111111.11111111.11110000 | 16 | 14 |
| /29 | 255.255.255.248 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnnnnhhh — 11111111.11111111.11111111.11111000 | 32 | 6 |
| /30 | 255.255.255.252 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnnnnnhh — 11111111.11111111.11111111.11111100 | 64 | 2 |

三條必背公式：

- **Subnet 數目 = `2^n`**（n = 向 host 部分借嘅 bit 數，即由 /24 加到 /27 就係借 3 bit → `2^3 = 8`）
- **每 subnet 可用 host = `2^h − 2`**（h = 剩下嘅 host bit 數，即 /27 剩 5 bit → `2^5 − 2 = 30`）
- **Block size（每個 subnet 嘅地址總數）= `256 − mask 最後一個非 0 octet`**（例如 /27 的 224 → `256 − 224 = 32`）

> **English Standard Definition:** Referring to the table, there are six ways to subnet a /24 network: /25 (255.255.255.128) gives 2 subnets of 126 hosts, /26 (255.255.255.192) gives 4 subnets of 62 hosts, /27 (255.255.255.224) gives 8 subnets of 30 hosts, /28 (255.255.255.240) gives 16 subnets of 14 hosts, /29 (255.255.255.248) gives 32 subnets of 6 hosts, and /30 (255.255.255.252) gives 64 subnets of 2 hosts.

> **圖示描述**：slide 18 標題為 "Subnet an IPv4 Network"（教材 11.5.2），只有圖形而無文字內容，屬同一節嘅視覺示意（subnet 階梯圖）。此處嘅計算內容已在 3.5.3 表格及 3.5.4 逐步示範中完整覆蓋。

#### 3.5.4 逐步示範：由 /24 切出 2、4、8、16、32、64 個 Subnet（slides 19–24）

以下六個示範係教材最核心嘅「操作步驟」。全部以 `192.168.1.0/24` 為基礎網絡，逐步加長 prefix。**規律：每多借 1 個 bit，subnet 數目 ×2，每個 subnet 嘅 host 數量 ÷2。**

**（1）Creating 2 Subnets（slide 19）**

繁中解說：由 /24 借 1 個 bit → `2^1 = 2` 個 subnet。教材原文：「21 = 2 subnets: Subnet 0 (192.168.1.0) and Subnet 1 (192.168.1.128)；Each subnet contains 27-2 = 126 hosts」（即 `2^1 = 2` 個 subnet，每個 `2^7 − 2 = 126` 個 host）。

| Subnet | 二進制（subnet bit） | Network Address | Host Range | Broadcast |
|---|---|---|---|---|
| Subnet 0 | 0 | 192.168.1.0/25 | 192.168.1.1 – 192.168.1.126 | 192.168.1.127 |
| Subnet 1 | 1 | 192.168.1.128/25 | 192.168.1.129 – 192.168.1.254 | 192.168.1.255 |

新 mask = `255.255.255.128`（/25），block size = 128。

**（2）Creating 4 Subnets（slide 20）**

繁中解說：借 2 個 bit → `2^2 = 4` 個 subnet：「22 = 4 subnets: Subnets 00, 01, 10, 11；Each subnet contains 26-2 = 62 hosts」（即每個 `2^6 − 2 = 62` 個 host）。新 mask = `255.255.255.192`（/26），block size = 64。

| Subnet | subnet bits | Network Address | Host Range | Broadcast |
|---|---|---|---|---|
| 0 | 00 | 192.168.1.0/26 | 192.168.1.1 – 192.168.1.62 | 192.168.1.63 |
| 1 | 01 | 192.168.1.64/26 | 192.168.1.65 – 192.168.1.126 | 192.168.1.127 |
| 2 | 10 | 192.168.1.128/26 | 192.168.1.129 – 192.168.1.190 | 192.168.1.191 |
| 3 | 11 | 192.168.1.192/26 | 192.168.1.193 – 192.168.1.254 | 192.168.1.255 |

**（3）Creating 8 Subnets（slide 21）**

繁中解說：借 3 個 bit → `2^3 = 8` 個 subnet：「23 = 8 subnets: Subnets 000, 001, 010, 011, 100, 101, 110, 111；Each subnet contains 25-2 = 30 hosts」。新 mask = `255.255.255.224`（/27），block size = 32。

| Subnet | subnet bits | Network Address | Host Range | Broadcast |
|---|---|---|---|---|
| 0 | 000 | 192.168.1.0/27 | .1 – .30 | 192.168.1.31 |
| 1 | 001 | 192.168.1.32/27 | .33 – .62 | 192.168.1.63 |
| 2 | 010 | 192.168.1.64/27 | .65 – .94 | 192.168.1.95 |
| 3 | 011 | 192.168.1.96/27 | .97 – .126 | 192.168.1.127 |
| 4 | 100 | 192.168.1.128/27 | .129 – .158 | 192.168.1.159 |
| 5 | 101 | 192.168.1.160/27 | .161 – .190 | 192.168.1.191 |
| 6 | 110 | 192.168.1.192/27 | .193 – .222 | 192.168.1.223 |
| 7 | 111 | 192.168.1.224/27 | .225 – .254 | 192.168.1.255 |

**（4）Creating 16 Subnets（slide 22）**

繁中解說：教材原文「`/28` subnets；Subnet mask: 255.255.255.240；24 = 16 subnets；Each subnet with 24 – 2 = 14 hosts」。即借 4 個 bit → `2^4 = 16` 個 subnet，每個 `2^4 − 2 = 14` 個 host，block size = 16。Subnet 邊界（每個加 16）：`.0, .16, .32, .48, .64, .80, .96, .112, .128, .144, .160, .176, .192, .208, .224, .240`。例如 subnet 0：network `192.168.1.0`、host `.1`–`.14`、broadcast `.15`；最後一個 subnet：network `192.168.1.240`、host `.241`–`.254`、broadcast `.255`。

**（5）Creating 32 Subnets（slide 23）**

繁中解說：教材原文「`/29` subnets；Subnet mask: 255.255.255.248；25 = 32 subnets；Each subnet with 23 – 2 = 6 hosts」。即借 5 個 bit → `2^5 = 32` 個 subnet，每個 `2^3 − 2 = 6` 個 host，block size = 8。邊界：`0, 8, 16, 24 ... 248`；例如 subnet 0：host `.1`–`.6`、broadcast `.7`；subnet 1：network `.8`、host `.9`–`.14`、broadcast `.15`。

**（6）Creating 64 Subnets（slide 24）**

繁中解說：教材原文「`/30` subnets；Subnet mask: 255.255.255.252；26 = 64 subnets；Each subnet with 22 – 2 = 2 hosts」。即借 6 個 bit → `2^6 = 64` 個 subnet，每個 `2^2 − 2 = 2` 個 host，block size = 4。邊界：`0, 4, 8, 12 ... 252`；例如 subnet 0：network `.0`、host `.1` 同 `.2`、broadcast `.3`。**/30 係 WAN point-to-point link 嘅標準選擇**，因為一條 router-to-router 連線剛好只需要 2 個地址。

> **English Standard Definition:** With one borrowed bit there are 2^1 = 2 subnets (192.168.1.0 and 192.168.1.128) each containing 2^7 − 2 = 126 hosts. With four borrowed bits, 2^4 = 16 subnets are created with a subnet mask of 255.255.255.240, each containing 2^4 − 2 = 14 hosts. With a /29 mask (255.255.255.248) there are 32 subnets of 6 hosts; with a /30 mask (255.255.255.252) there are 64 subnets of 2 hosts.

### 3.6 Subnet a Slash 16 and a Slash 8 Prefix（切 /16 同 /8 前綴）

#### 3.6.1 Create Subnets with a Slash 16 Prefix（用 /16 前綴切 subnet）

繁中解說：如果手上係 `/16`（例如 172.16.0.0/16），可以借嘅 bit 由第三個 octet 開始。教材表格列出所有可能情境，你會見到**每加長 1 bit，subnet 數目 ×2、host 數目約 ÷2**。

**教材表格（slide 25）**

| Prefix Length | Subnet Mask | Network Address (n = network, h = host) | # of subnets | # of hosts |
|---|---|---|---|---|
| /17 | 255.255.128.0 | nnnnnnnn.nnnnnnnn.nhhhhhhh.hhhhhhhh — 11111111.11111111.10000000.00000000 | 2 | 32766 |
| /18 | 255.255.192.0 | nnnnnnnn.nnnnnnnn.nnhhhhhh.hhhhhhhh — 11111111.11111111.11000000.00000000 | 4 | 16382 |
| /19 | 255.255.224.0 | nnnnnnnn.nnnnnnnn.nnnhhhhh.hhhhhhhh — 11111111.11111111.11100000.00000000 | 8 | 8190 |
| /20 | 255.255.240.0 | nnnnnnnn.nnnnnnnn.nnnnhhhh.hhhhhhhh — 11111111.11111111.11110000.00000000 | 16 | 4094 |
| /21 | 255.255.248.0 | nnnnnnnn.nnnnnnnn.nnnnnhhh.hhhhhhhh — 11111111.11111111.11111000.00000000 | 32 | 2046 |
| /22 | 255.255.252.0 | nnnnnnnn.nnnnnnnn.nnnnnnhh.hhhhhhhh — 11111111.11111111.11111100.00000000 | 64 | 1022 |
| /23 | 255.255.254.0 | nnnnnnnn.nnnnnnnn.nnnnnnnh.hhhhhhhh — 11111111.11111111.11111110.00000000 | 128 | 510 |
| /24 | 255.255.255.0 | nnnnnnnn.nnnnnnnn.nnnnnnnn.hhhhhhhh — 11111111.11111111.11111111.00000000 | 256 | 254 |
| /25 | 255.255.255.128 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nhhhhhhh — 11111111.11111111.11111111.10000000 | 512 | 126 |
| /26 | 255.255.255.192 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnhhhhhh — 11111111.11111111.11111111.11000000 | 1024 | 62 |
| /27 | 255.255.255.224 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnnhhhhh — 11111111.11111111.11111111.11100000 | 2048 | 30 |
| /28 | 255.255.255.240 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnnnhhhh — 11111111.11111111.11111111.11110000 | 4096 | 14 |
| /29 | 255.255.255.248 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnnnnhhh — 11111111.11111111.11111111.11111000 | 8192 | 6 |
| /30 | 255.255.255.252 | nnnnnnnn.nnnnnnnn.nnnnnnnn.nnnnnnhh — 11111111.11111111.11111111.11111100 | 16384 | 2 |

核對：`/17` 剩 15 個 host bit → `2^15 − 2 = 32,766`；`/22` 剩 10 個 host bit → `2^10 − 2 = 1,022`；`/30` 剩 2 個 host bit → `2^2 − 2 = 2`。全部與表格吻合。

> **English Standard Definition:** The table highlights all the possible scenarios for subnetting a /16 prefix, from /17 (2 subnets of 32,766 hosts) through /24 (256 subnets of 254 hosts) to /30 (16,384 subnets of 2 hosts).

#### 3.6.2 Create 100 Subnets with a Slash 16 Prefix（用 /16 切 100 個 subnet）

繁中解說：情境係一間大型企業，需要**至少 100 個 subnet**，內部網絡地址選咗 private address `172.16.0.0/16`。教材提出兩個關鍵限制同一個結論：

1. 由第三、第四個 octet 加起來，**最多有 14 個 host bit 可以借**——「the last two bits cannot be borrowed」，即係最尾兩個 bit 唔可以借（要留返做 network／broadcast 語意，即最少只可以切到 `/30`）。
2. 要滿足 100 個 subnet：`2^6 = 64` 唔夠，所以需要借 **7 個 bit**（`2^7 = 128` 個 subnet）。

**由教材數據推算嘅完整答案（自己核對過）**：借 7 bit → **新 prefix = `/16 + 7 = /23`**，**新 subnet mask = `255.255.254.0`**，**subnet 總數 = 128**，**每個 subnet 剩 9 個 host bit → `2^9 − 2 = 510` 個可用 host**。例如第一個 subnet 係 `172.16.0.0/23`（host `172.16.0.1`–`172.16.1.254`，broadcast `172.16.1.255`），第二個係 `172.16.2.0/23`，如此類推。

> **English Standard Definition:** Consider a large enterprise that requires at least 100 subnets and has chosen the private address 172.16.0.0/16 as its internal network address. There are now up to 14 host bits, from the third octet and the fourth octet, that can be borrowed (i.e. the last two bits cannot be borrowed). To satisfy the requirement of 100 subnets, 7 bits (i.e. 2^7 = 128 subnets) would need to be borrowed.

#### 3.6.3 Create 1000 Subnets with a Slash 8 Prefix（用 /8 切 1000 個 subnet）

繁中解說：情境係一間細 ISP，要為客戶開 **1000 個 subnet**，手上係 `10.0.0.0/8`——即 8 個 network bit、**24 個 host bit 可以借**。同樣，「**the last two bits cannot be borrowed**」，所以第二、三、四個 octet 之中最多可以借 **22 個 bit**。要滿足 1000 個 subnet：`2^9 = 512` 唔夠，所以要借 **10 個 bit**（`2^10 = 1024` 個 subnet）。

**由教材數據推算嘅完整答案（自己核對過）**：借 10 bit → **新 prefix = `/8 + 10 = /18`**，**新 subnet mask = `255.255.192.0`**，**subnet 總數 = 1024**，**每個 subnet 剩 14 個 host bit → `2^14 − 2 = 16,382` 個可用 host**。

⚠️ 教材原文最後一句寫「(for a total of 128 subnets)」，但同一句前面已寫明 `2^10 = 1024`，所以 `128` 係原檔打字錯誤（`128` 係上一張 slide `/16` 借 7 bit 嘅結果），正確應為 **1024 個 subnet**。

> **English Standard Definition:** Consider a small ISP that requires 1000 subnets for its clients using network address 10.0.0.0/8, which means there are 8 bits in the network portion and 24 host bits available to borrow toward subnetting. There are now up to 22 host bits that can be borrowed from the 2nd, 3rd and 4th octets (i.e. the last two bits cannot be borrowed). To satisfy the requirement of 1000 subnets, 10 bits (i.e. 2^10 = 1024 subnets) would need to be borrowed.

### 3.7 Subnet to Meet Requirements（按要求設計子網）

#### 3.7.1 Subnet Private versus Public IPv4 Address Space（私網 vs 公網地址空間）

繁中解說：企業網絡通常分成兩塊：

- **Intranet（內聯網）**——公司內部網絡，一般**使用 private IPv4 addresses**。公司可以攞 `10.0.0.0/8` 然後喺 `/16` 或 `/24` 嘅網絡邊界切落去。
- **DMZ（Demilitarized Zone）**——公司**面向互聯網嘅伺服器**（例如 web、mail server）所在區域。**DMZ 內嘅設備必須用 public IPv4 addresses**，因為外面嘅人要直接連到佢哋。

所以一個企業網絡係「私網為主、公網為例外」：絕大部分主機用 private + NAT 出去，只有 DMZ 嗰幾部要真 public IP。

> **English Standard Definition:** Enterprise networks will have an intranet — a company's internal network typically using private IPv4 addresses — and a DMZ, a company's internet facing servers, where devices use public IPv4 addresses. A company could use the 10.0.0.0/8 and subnet on the /16 or /24 network boundary. The DMZ devices would have to be configured with public IP addresses.

#### 3.7.2 Example: Efficient IPv4 Subnetting（慳地址嘅切法示範）

繁中解說：教材嘅旗艦例子：企業總部由 ISP 獲派一個 **public network address `172.16.0.0/22`**——注意 `/22` 有 **10 個 host bit**，即提供 **1,022 個 host address**（`2^10 − 2 = 1,022`，同教材相符）。企業有**五個 site**，即五條互聯網連線，所以需要 **10 個 subnet**，而**最大嘅 subnet 需要 40 個地址**。最後企業用 **`/26`（即 `255.255.255.192`）** 切出 10 個 subnet。

解題邏輯（逐步）：

1. **數需求**：5 個 site × 2 條連線 = **10 個 subnet**。
2. **揀 prefix**：由 `/22` 要切出 ≥ 10 個 subnet，需要借 4 個 bit（`2^4 = 16 ≥ 10`）→ 新 prefix = `/22 + 4 = /26`。
3. **驗證 host 數**：`/26` 每個 subnet 有 `2^6 − 2 = 62` 個可用 host，**62 ≥ 40**，滿足最大 subnet 嘅需求。
4. **列出 subnet**（由教材數據推算，block size = 64）：

| # | Subnet Address | Host Range | Broadcast |
|---|---|---|---|
| 0 | 172.16.0.0/26 | 172.16.0.1 – 172.16.0.62 | 172.16.0.63 |
| 1 | 172.16.0.64/26 | 172.16.0.65 – 172.16.0.126 | 172.16.0.127 |
| 2 | 172.16.0.128/26 | 172.16.0.129 – 172.16.0.190 | 172.16.0.191 |
| 3 | 172.16.0.192/26 | 172.16.0.193 – 172.16.0.254 | 172.16.0.255 |
| 4 | 172.16.1.0/26 | 172.16.1.1 – 172.16.1.62 | 172.16.1.63 |
| … | … | … | … |
| 9 | 172.16.2.64/26 | 172.16.2.65 – 172.16.2.126 | 172.16.2.127 |

（`172.16.0.0/22` 內總共可以切出 **16** 個 `/26` subnet，即 `172.16.0.0`、`.64`、`.128`、`.192`，`172.16.1.0`…，`172.16.2.0`…，一直排到 `172.16.3.192`；用其中 10 個就夠。）教材亦附有 "Activity – Determine the Number of Bits to Borrow" 練習，即係操「由需求反推要借幾多 bit」呢一步。

> **English Standard Definition:** Corporate headquarters has been allocated a public network address of 172.16.0.0/22 (10 host bits) by its ISP, providing 1,022 host addresses. There are five sites and therefore five internet connections, which means the organization requires 10 subnets, with the largest subnet requiring 40 addresses. It allocated 10 subnets with a /26 (i.e. 255.255.255.192) subnet mask.

### 3.8 VLSM（可變長度子網遮罩）

#### 3.8.1 IPv4 Address Conservation（地址保育／避免浪費）

繁中解說：教材用一個拓撲示範「固定長度 subnetting 幾咁浪費」。情境：需要 **7 個 subnet**（**four LANs and three WAN links**），而**最大嘅 host 數量喺 Building D，有 28 部主機**。如果用 `2^n ≥ 7` 去計，需要借 3 個 bit → `2^3 = 8` 個 subnet。但要注意：**要滿足 28 部主機，剩 5 個 host bit 只係得 `30` 個可用地址，僅僅夠用**；所以如果只用一個固定 mask，就必須揀 **`/27`**（`2^3 = 8` 個 subnet、每個 30 個 host IP address），先可以支撐整個拓撲。

問題出喺 **WAN link**：三條 **point-to-point WAN link 每條只需要 2 個地址**，但 `/27` 會派 30 個，所以**每條浪費 28 個地址，三條合共浪費 84 個（3 × 28 = 84）**。呢個就係 fixed length subnetting（同一 mask 用到底）嘅致命傷。

解決方案：**Variable Length Subnet Masking (VLSM)**——**藉由「subnet 一個 subnet」（subnet a subnet）嚟避免浪費地址**。做法係先按最大需求切，再將剩餘未用嘅大 subnet 再切細，分派唔同長度嘅 mask：LAN 用 `/27`，WAN link 就用剛好夠嘅 `/30`（2 個可用地址），一蚊都唔浪費。

> **English Standard Definition:** Given the topology, 7 subnets are required (i.e. four LANs and three WAN links) and the largest number of hosts is in Building D with 28 hosts. A /27 mask would provide 8 subnets of 30 host IP addresses and therefore support this topology. However, the point-to-point WAN links only require two addresses and therefore waste 28 addresses each, for a total of 84 unused addresses. Variable Length Subnet Masking (VLSM) was developed to avoid wasting addresses by enabling us to subnet a subnet.

#### 3.8.2 VLSM Topology Address Assignment（VLSM 拓撲嘅地址分配）

繁中解說：當用 VLSM subnet 之後，**LAN 同 router 之間嘅網絡都可以「無不必要浪費」地被定址**（addressed without unnecessary waste），教材用一個 logical topology diagram 展示分配結果：大 LAN（例如 Building D 嘅 28 部機）用較長 host 部分嘅 mask，細 LAN 用較短，WAN link 則用 `/30`。考試答題重點就係講清楚：**固定前綴切割會浪費地址，VLSM 透過「再切一個 subnet」按實際需求分配，先至可以避免浪費。**

> **English Standard Definition:** Using VLSM subnets, the LAN and inter-router networks can be addressed without unnecessary waste, as shown in the logical topology diagram.

> **圖示描述**：slide 31 為 VLSM logical topology 圖（四個 Building LAN 加三條 router 之間嘅 WAN link），圖上標示每個網段嘅 subnet 地址與 prefix；文字檔未抽取到圖中數字，概念重點為「LAN 用 /27、WAN link 用 /30，全部無浪費」。教材同時附有 "Activity – VLSM Practice" 練習。

### 3.9 Structured Design（結構化設計）

#### 3.9.1 IPv4 Network Address Planning（網絡地址規劃）

繁中解說：**IP network planning 係設計可擴展企業網絡嘅關鍵**。要做一個「全網絡通用」嘅 IPv4 addressing scheme，你必須先問清楚以下問題：**需要幾多個 subnet、某個 subnet 需要幾多部主機、邊啲設備屬於呢個 subnet、邊部分網絡用 private address、邊部分用 public address**，以及好多其他決定因素。換句話講：subnetting 唔係「見網就切」，而係由需求（host 數、site 數、安全邊界）反推設計。

> **English Standard Definition:** IP network planning is crucial to develop a scalable solution to an enterprise network. To develop an IPv4 network wide addressing scheme, you need to know how many subnets are needed, how many hosts a particular subnet requires, what devices are part of the subnet, which parts of your network use private addresses, and which use public, and many other determining factors.

#### 3.9.2 Device Address Assignment（設備地址分配方法）

繁中解說：一個網絡入面唔同設備有唔同嘅定址要求，教材分五類：

| 設備類型 | 定址方法 | 原因 |
|---|---|---|
| **End user clients**（終端用戶） | 大部分用 **DHCP** | 減少錯誤同減少 network support staff 嘅負擔；教材補充：IPv6 client 可以用 **DHCPv6** 或 **SLAAC** 取得地址資訊 |
| **Servers and peripherals**（伺服器與周邊） | 應該用**可預測嘅 static IP address** | 客戶端同管理工具唔會因為地址變咗而失聯 |
| **Servers accessible from the internet**（對外伺服器） | **必須有 public IPv4 address** | 最常經 **NAT** 被存取 |
| **Intermediary devices**（中介設備） | 指派地址**供 network management、monitoring 同 security 之用** | 方便遠端管理、監控、套安全政策 |
| **Gateway**（閘道） | **Router 同 firewall 設備**係該網絡主機嘅 gateway | 跨 subnet 通訊一定要經佢 |

呢個分類同時就係 **static vs DHCP** 嘅考試判斷題標準答案：**client 用 DHCP（dynamic），server 用 static**。

> **English Standard Definition:** Within a network there are different types of devices that require addresses: end user clients, most of which use DHCP to reduce errors and burden on network support staff; servers and peripherals, which should have a predictable static IP address; servers that are accessible from the internet, which must have a public IPv4 address, most often accessed using NAT; intermediary devices, which are assigned addresses for network management, monitoring and security; and the gateway — routers and firewall devices are the gateway for the hosts in that network.

> **圖示描述**：slide 33 為本課最後一頁（image-only，無文字內容），屬章節結束之視覺版面。

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/縮寫 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| IPv4 Address | 32-bit 階層式地址，由 network portion 同 host portion 組成 | "An IPv4 address is a 32-bit hierarchical address that is made up of a network portion and a host portion." |
| Octet | 8 個 bit 一組，即點分十進制中每個 0–255 嘅數字 | "An IPv4 address is written as four octets, and each octet ranges from 0 to 255." |
| Subnet Mask | 用 1 標示 network 部分、0 標示 host 部分嘅 32-bit 遮罩 | "A subnet mask is used to determine the network and host portions; it is compared to the IPv4 address bit for bit, from left to right." |
| Prefix Length / Slash Notation | mask 中 1 嘅數目，寫成 /n，例如 /24 | "The prefix length is the number of bits set to 1 in the subnet mask, written in slash notation." |
| Logical AND | 只有 1 AND 1 = 1，其餘皆 0；用嚟求 network address | "A logical AND operation is used in determining the network address; only a 1 AND 1 produces a 1." |
| Network Address | host bits 全 0 嘅地址，代表整個網絡，不可派俾主機 | "The network address is obtained by ANDing the host IPv4 address with the subnet mask." |
| Host Address | host bits 有 0 有 1 嘅普通可用地址 | "Host addresses are the addresses between the network address and the broadcast address that can be assigned to devices." |
| First / Last Host Address | 第一個 = Network + 1；最後一個 = Broadcast − 1 | "The first address has all 0s and a 1 in the host portion; the last address has all 1s and a 0." |
| Broadcast Address | host bits 全 1 嘅地址，唔可以派俾主機 | "The broadcast address has all 1's in the host portion and is used to send to all hosts in the network." |
| Usable Hosts = 2^h − 2 | 可用主機公式，減 2 係扣 network 同 broadcast | "The number of usable hosts is 2 to the power of the host bits minus 2." |
| Unicast | 1 對 1，目的地址 = 目的地設備地址 | "Unicast is one to one — the destination address is the address of the destination device." |
| Broadcast (Direct / Limited) | 1 對全部；direct 指向特定網絡，limited 指向本機網絡 | "Broadcast is one to all — a direct broadcast is to a specific network and a limited broadcast is to the local network." |
| Multicast | 1 對選定群組；保留範圍 224.0.0.0 – 239.255.255.255 | "Multicast is one to a selected group; the reserved destination address range is 224.0.0.0 to 239.255.255.255, used by routers to exchange routing information." |
| Public IPv4 Address | 全球唯一、由 ISP router 之間全球路由 | "Public IPv4 addresses are globally routed between internet service provider (ISP) routers." |
| Private IPv4 Address | 不唯一、可內部使用但唔可以全球路由 | "Private addresses are not unique, can be used internally within any network, and are NOT globally routable." |
| RFC 1918 | 私網地址三個 block 嘅標準 | "According to RFC 1918, the private ranges are 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 – 172.31.255.255) and 192.168.0.0/16." |
| NAT (Network Address Translation) | 將 private address 轉譯成 public address | "Network Address Translation (NAT) translates private IPv4 addresses to public IPv4 addresses." |
| Loopback Address | 127.0.0.0/8，測試本機 TCP/IP | "Loopback addresses are 127.0.0.0/8 (commonly 127.0.0.1) and are used on a host to test if TCP/IP is operational." |
| Link-Local / APIPA | 169.254.0.0/16，冇 DHCP 時自我配置 | "Link-local addresses are 169.254.0.0/16, known as APIPA or self-assigned addresses, used by Windows DHCP clients when no DHCP servers are available." |
| Legacy Classful Addressing | RFC 790 嘅 A/B/C/D/E 分級制 | "RFC 790 (1981) allocated IPv4 addresses in classes A, B, C, D and E; classful addressing wasted many IPv4 addresses." |
| Classless Addressing | 忽略 class 規則，可用任何 prefix | "Classful address allocation was replaced with classless addressing, which ignores the rules of classes (A, B, C)." |
| IANA / RIR | 全球地址管理機構／五個區域註冊機構 | "The Internet Assigned Numbers Authority (IANA) manages and allocates blocks of IPv4 and IPv6 addresses to five Regional Internet Registries (RIRs)." |
| Broadcast Domain | broadcast 可以到達嘅範圍；只有 router 擋得住 | "The only device that stops broadcasts is a router; a large broadcast domain can generate excessive broadcasts and negatively affect the network." |
| Network Segmentation / Subnetting | 切細網絡造細 broadcast domain | "The solution is to reduce the size of the network to create smaller broadcast domains in a process called subnetting." |
| Subnetting Benefits | 減流量、可實施安全政策、減少受影響設備 | "Subnetting reduces overall network traffic, can implement security policies between subnets, and reduces the number of devices affected by abnormal broadcast traffic." |
| Octet Boundary Subnetting | 喺 /8、/16、/24 落刀 | "Networks are most easily subnetted at the octet boundary of /8, /16 and /24; longer prefix lengths decrease the number of hosts per subnet." |
| Number of Subnets = 2^n | n = 向 host 部分借嘅 bit 數 | "Borrowing n bits creates 2^n subnets." |
| Number of Hosts per Subnet | 借位後剩餘 host bit 決定容量 | "A /27 mask provides 8 subnets of 30 host IP addresses." |
| Intranet | 公司內部網絡，一般用 private address | "An intranet is a company's internal network, typically using private IPv4 addresses." |
| DMZ | 面向互聯網嘅伺服器區，用 public address | "Devices in the DMZ use public IPv4 addresses and must be configured with public IP addresses." |
| VLSM | 可變長度子網遮罩，subnet a subnet 避免浪費 | "Variable Length Subnet Masking (VLSM) avoids wasting addresses by enabling us to subnet a subnet." |
| DHCP / Static / SLAAC | client 用 DHCP、server 用 static | "End user clients most use DHCP to reduce errors, servers should have a predictable static IP address, and IPv6 clients can obtain address information using DHCPv6 or SLAAC." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**Step 1 — 先理解觀念（Understand）**

- 明白 **IPv4 address 係 32-bit hierarchical address**：network portion + host portion，而 **subnet mask 就係嗰把刀**（1 = network、0 = host）。
- 親手做一次 **logical AND**：`192.168.10.10` AND `255.255.255.0` → `192.168.10.0`。明白「1 對應位原封不動、0 對應位歸零」呢個 shortcut，你以後唔使真係逐 bit 乘。
- 記清三種地址嘅關係：**Network（host 全 0）→ Host Range（Network+1 至 Broadcast−1）→ Broadcast（host 全 1）**。
- 理解「為何要 subnet」：大 broadcast domain → 過量 broadcast → 效能下降；router 係唯一擋 broadcast 嘅設備；subnetting = 造細 broadcast domain。

**Step 2 — 背誦英文短語（Memorize）**

- 五句核心定義：32-bit hierarchical address／subnet mask compared bit for bit／logical AND only 1 AND 1 produces a 1／prefix length = number of bits set to 1／broadcast has all 1's in the host portion。
- 三組範圍：**RFC 1918（10.0.0.0/8、172.16.0.0/12、192.168.0.0/16）**、**Multicast（224.0.0.0 – 239.255.255.255）**、**Loopback（127.0.0.0/8）＋ Link-Local/APIPA（169.254.0.0/16）**。
- 兩條限制句：**"the last two bits cannot be borrowed"**（最尾兩個 bit 唔可以借）；**"the only device that stops broadcasts is a router"**。
- 一句 VLSM 定義：**"VLSM was developed to avoid wasting addresses by enabling us to subnet a subnet."**

**Step 3 — 掌握計算／寫法（Calculate）**

- 熟背 **mask ↔ prefix** 對照：128/25、192/26、224/27、240/28、248/29、252/30；同時背 **`256 − mask octet = block size`**。
- 熟練三個公式：**Subnet 數 = `2^n`**、**每 subnet 可用 host = `2^h − 2`**、**Broadcast = Network + Block − 1**。
- 練「反推 borrow bit」：由需求（100 個 subnet、1000 個 subnet、40 個 host、28 個 host）反推最少要借幾多 bit，再寫出新 prefix 同新 mask。**注意 host 數要同時滿足**（例如 /22 例：借 4 bit → /26，62 ≥ 40 ✓）。
- 練「列 subnet 表」：由 network address 開始，每次加 block size，順序排出 Network / First Host / Last Host / Broadcast（用 192.168.1.0/24 練 /25 至 /30）。
- 練 VLSM 浪費計算：固定 /27 → 三條 WAN link 每條浪費 28、共 84；改用 /30 就零浪費。

**Step 4 — 能解答英文考題（Solve Exam Questions）**

- "What is the prefix length of the subnet mask 255.255.255.224?" → "The subnet mask has 27 bits set to 1, so the prefix length is /27."
- "Given 172.16.0.0/16, how many bits must be borrowed to create 100 subnets?" → "7 bits, because 2^7 = 128 subnets, giving a /23 mask of 255.255.254.0."
- "Given 10.0.0.0/8, how many bits must be borrowed to create 1000 subnets?" → "10 bits, because 2^10 = 1024 subnets, giving a /18 mask of 255.255.192.0."
- "A /27 mask provides how many subnets and how many hosts each?" → "8 subnets of 30 host IP addresses each."
- "Why is VLSM used?" → "Because fixed length subnetting wastes addresses — the point-to-point WAN links only require two addresses but waste 28 each; VLSM avoids this by enabling us to subnet a subnet."
- "Which addresses are private?" → "10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 – 172.31.255.255) and 192.168.0.0/16, per RFC 1918."
- "Why do large broadcast domains cause problems?" → "Hosts can generate excessive broadcasts and negatively affect the network; the solution is subnetting to create smaller broadcast domains."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**① 三個必背公式**

| 公式 | 內容 |
|---|---|
| Subnet 數目 | `2^n`（n = 借嘅 bit 數） |
| 每 subnet 可用 host | `2^h − 2`（h = 剩下嘅 host bit 數） |
| Block size | `256 − mask 最後非 0 octet`（例：/27 → 256−224 = 32） |

**② Prefix ↔ Mask ↔ Subnets ↔ Hosts 對照表（/24 網絡）**

| Prefix | Subnet Mask | Block Size | # of subnets | # of hosts |
|---|---|---|---|---|
| /25 | 255.255.255.128 | 128 | 2 | 126 |
| /26 | 255.255.255.192 | 64 | 4 | 62 |
| /27 | 255.255.255.224 | 32 | 8 | 30 |
| /28 | 255.255.255.240 | 16 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 32 | 6 |
| /30 | 255.255.255.252 | 4 | 64 | 2 |

（教材數字：/8 → 16,777,214；/16 → 65,534；/24 → 254；/17 → 32,766；/18 → 16,382；/20 → 4,094；/22 → 1,022；/23 → 510。）

**③ 特殊地址速記**

| 類型 | 範圍 | 用途 |
|---|---|---|
| Private（RFC 1918） | 10.0.0.0/8｜172.16.0.0/12（172.16–172.31）｜192.168.0.0/16 | 內網用，不可全球路由，靠 NAT 出去 |
| Multicast | 224.0.0.0 – 239.255.255.255 | 1 對選定群組；router 交換 routing info |
| Loopback | 127.0.0.0/8（常用 127.0.0.1） | 測試本機 TCP/IP |
| Link-Local / APIPA | 169.254.0.0/16 | 冇 DHCP 時 Windows client 自配 |
| Legacy Classes | A: 0/8–127/8｜B: 128/16–191.255/16｜C: 192/24–223.255.255/24｜D: 224–239｜E: 240–255 | 已被 classless addressing 取代 |

**④ 計數四步心法（任何 subnetting 題目通用）**

1. **睇 prefix** → 得出 mask、block size、subnet 數、host 數。
2. **搵 Network** → 用 block size 由 0 開始數（0、block、2×block…），或者 IP AND mask。
3. **填範圍** → First Host = Network + 1；Last Host = Broadcast − 1；Broadcast = Network + Block − 1（亦即下一個 Network − 1）。
4. **核對** → host 數夠唔夠需求？Network 同 Broadcast 唔可以派俾裝置！

**⑤ 兩句考官最愛嘅限制句**

- **"The last two bits cannot be borrowed."** → 所以最細只可以切到 `/30`（2 個可用 host，即 WAN link）。
- **"The only device that stops broadcasts is a router."** → 所以跨 subnet 一定要經 router，subnetting 先可以落實安全政策。

**⑥ 一頁記住本課三個招牌例子**

| 例子 | 輸入 | 計法 | 答案 |
|---|---|---|---|
| 100 個 subnet（slide 26） | 172.16.0.0/16，需 ≥ 100 subnet | `2^6 = 64` 唔夠 → 借 7 bit | /23，255.255.254.0，128 個 subnet，每個 510 host |
| 1000 個 subnet（slide 27） | 10.0.0.0/8，需 1000 subnet | `2^9 = 512` 唔夠 → 借 10 bit | /18，255.255.192.0，1024 個 subnet，每個 16,382 host |
| 企業 10 個 subnet（slide 29） | 172.16.0.0/22（1,022 hosts），需 10 subnet、最大 40 hosts | `2^4 = 16 ≥ 10` → 借 4 bit；62 ≥ 40 ✓ | /26，255.255.255.192 |

**⑦ 英速記憶口訣**

- **"1 = network, 0 = host"** — subnet mask 嘅本質。
- **"Only 1 AND 1 gives 1"** — logical AND 求 network address。
- **"All zeros = network, all ones = broadcast"** — 頭尾兩種唔可以派。
- **"2 to the n subnets, 2 to the h minus 2 hosts"** — 兩條公式。
- **"256 minus the mask octet gives the block"** — 排 subnet 邊界最快。
- **"224 to 239 = multicast"** — 頭一個 octet 一睇即知。
- **"RFC 1918: 10 / 172.16–31 / 192.168"** — 三個私網範圍。
- **"Subnet a subnet"** — VLSM 一句講完。
