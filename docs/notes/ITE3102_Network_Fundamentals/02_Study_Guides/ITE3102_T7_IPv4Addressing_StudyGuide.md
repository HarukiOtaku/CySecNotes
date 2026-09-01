# ITE3102 Network Fundamentals — Tutorial 7: IPv4 Addressing 雙語練習題解 Guide

> 課程：ITE3102 Network Fundamentals ｜ 課題：IPv4 Addressing ｜ 程度：大專（HD / CCNA 基礎）

---

## 📝 練習概要 (Summary)

Tutorial 7 係 IPv4 定址（IPv4 Addressing）嘅核心實戰練習，涵蓋由「IP 地址 ↔ 二進制轉換」、「Subnet Mask 與 CIDR Prefix」到「Network Address / Broadcast Address / Host Range 計算」嘅完整技能鏈。題目由淺入深：Q1 與 Q8 以具體 IP + Subnet Mask 示範「一拆四步」——二進制表示 → Network ID → Host Range → Broadcast Address；Q2、Q3、Q9 用填表形式考核三種常見問法（俾 Network 求 Host/Broadcast、俾 Host 求 Network/Broadcast、俾 Subnet 求完整資料）；Q4–Q6 考核概念辨別（Public/Private、Network/Host/Broadcast、Unicast/Broadcast/Multicast）；Q7、Q10–Q12 則係 Subnetting（子網劃分）與 Address Design 嘅進階應用，包括 Fixed-Length Subnetting（/27、/28）同多種 Scheme 嘅比較。

考核重點非常清晰：學生必須掌握「把 Subnet Mask 當作 1/0 邊界去切 IP 地址」呢個核心心法，以及「Host 數量 = 2^h − 2」呢條萬能公式。考試常見陷阱包括：混淆 Network Address 與 Broadcast Address、漏減 2（Network + Broadcast 不可派俾主機）、唔記得 172.16.0.0/12 私網範圍止於 172.31.255.255、以及計錯 Block Size（256 − mask octet）。本 Guide 會逐題拆解答題邏輯，並附考試標準英文答題句，確保學生睇完一份文件就能完成練習兼應付筆試。

---

## 🎯 練習目標 (Objectives)

完成本練習後，你應該有能力（附英文對照）：

| 能力 (Ability) | 英文對照 (English) |
|---|---|
| 將 IPv4 地址及 Subnet Mask 轉換為二進制 | Convert IPv4 addresses and subnet masks into binary form |
| 由 IP + Mask 找出 Network Address、Host Range、Broadcast Address | Determine the network address, host range and broadcast address from an IP address and subnet mask |
| 分辨 Public 與 Private IPv4 地址 | Distinguish public from private IPv4 addresses (RFC 1918) |
| 分辨 Network / Host / Broadcast 地址 | Classify an address as a network, host or broadcast address |
| 分辨 Unicast / Broadcast / Multicast 地址並判斷邊啲主機會收到封包 | Identify Unicast, Broadcast and Multicast addresses and which hosts receive the packet |
| 計算子網數量、每個子網可用 Host 數量及每個子網嘅 ID / Broadcast | Calculate the number of subnets, the valid hosts per subnet, and each subnet's network ID and broadcast address |
| 判斷兩個地址是否屬於同一子網 | Determine whether two addresses are in the same subnet |
| 按需求設計 Subnet 方案並計算浪費嘅地址 | Design a subnetting scheme and compute wasted (unused) host addresses |

---

## ✏️ 題目與答案 Walkthrough

---

### Q1. 從 IP 與 Subnet Mask 求出網絡資訊

**題目原文（English）：**

> Suppose that in the college, your computer IP address is `172.30.18.15` with subnet mask `255.255.0.0`.
> (a) Represent the IP address in binary form.
> (b) Represent the subnet mask in binary form.
> (c) Identify the network address (network ID, network number) of the college network.
> (d) Find out the range of IP addresses of college network. (Starting IP address / Ending IP address)
> (e) Identify the broadcast address of college network.
> (f) Which of the following are valid host IP addresses in college network? (`172.29.255.254`, `172.30.31.255`, `172.30.0.0`, `172.30.255.0`, `172.30.0.1`, `172.30.255.254`, `172.30.0.255`, `172.30.255.255`, `172.30.31.0`, `172.31.0.0`)

**Answer（答案）：**

- (a) IP 二進制：`172.30.18.15` → **`10101100.00011110.00010010.00001111`**
- (b) Mask 二進制：`255.255.0.0` → **`11111111.11111111.00000000.00000000`**（即 /16）
- (c) Network Address：**`172.30.0.0`**
- (d) Host Range：**Starting = `172.30.0.1`，Ending = `172.30.255.254`**
- (e) Broadcast Address：**`172.30.255.255`**
- (f) 有效 Host：**`172.30.31.255`、`172.30.255.0`、`172.30.0.1`、`172.30.255.254`、`172.30.0.255`、`172.30.31.0`**（詳見下表）

**繁中解說（答題邏輯）：**

Subnet Mask `255.255.0.0` 前 16 bit 全部係 1（Network 部分），後 16 bit 全部係 0（Host 部分）。答題三步曲：

1. **轉二進制**：每個十進制 octet 用「128 64 32 16 8 4 2 1」拆位。例：`172 = 128+32+8+4 = 10101100`；`30 = 16+8+4+2 = 00011110`；`18 = 16+2 = 00010010`；`15 = 8+4+2+1 = 00001111`。
2. **求 Network Address**：將 IP 與 Mask 做 **AND**（逐 bit 相乘），或者更簡單——保留 Mask 中 1 對應嘅 bit，Host 部分（mask 為 0 嘅位）全部變 0。所以 `172.30.18.15` 的第三、四 octet 歸零 → `172.30.0.0`。
3. **求 Host Range 與 Broadcast**：Network Address 加 1 就係第一個可用 Host（`172.30.0.1`）；將 Host 部分全部變 1 就係 Broadcast（`172.30.255.255`）；Broadcast 減 1 就係最後一個 Host（`172.30.255.254`）。

判斷 (f) 嘅有效 Host 時，記住三條鐵律：① 同 Network Address 唔同網絡嘅地址（`172.29.x.x`、`172.31.0.0`）一定唔啱；② 等於 Network Address（`172.30.0.0`）唔可以派俾主機；③ 等於 Broadcast（`172.30.255.255`）唔可以派俾主機。其餘喺 `172.30.0.1` 至 `172.30.255.254` 範圍內嘅全部有效——包括 `172.30.31.255`、`172.30.255.0`、`172.30.0.255` 呢啲「看似奇怪」嘅地址（因為 /16 網絡好大，第三 octet 唔受限制）。

| 候選地址 | 判定 | 原因 |
|---|---|---|
| `172.29.255.254` | ❌ 無效 | 屬另一個網絡 172.29.0.0/16 |
| `172.30.31.255` | ✅ 有效 Host | 喺 172.30.0.1–172.30.255.254 範圍內 |
| `172.30.0.0` | ❌ Network Address | 網絡地址，不可派發 |
| `172.30.255.0` | ✅ 有效 Host | 非全 0 亦非全 1（host 部分 = 0.255） |
| `172.30.0.1` | ✅ 有效 Host | 第一個可用地址 |
| `172.30.255.254` | ✅ 有效 Host | 最後一個可用地址 |
| `172.30.0.255` | ✅ 有效 Host | host 部分唔係全 1（broadcast 係 255.255） |
| `172.30.255.255` | ❌ Broadcast | 廣播地址，不可派發 |
| `172.30.31.0` | ✅ 有效 Host | 範圍內地址 |
| `172.31.0.0` | ❌ 無效 | 屬另一個網絡 172.31.0.0/16 |

> **English Standard Definition**
> An **IPv4 address** is a 32-bit logical address, normally written in dotted-decimal notation as four octets (e.g. 172.30.18.15).
> A **subnet mask** separates the IP address into the network portion (bits set to 1) and the host portion (bits set to 0).
> The **network address** is obtained by ANDing the IP address with the subnet mask; all host bits become 0.
> The **broadcast address** has all host bits set to 1 and is the last address of the network.

> **Exam Answer Phrase**
> "The network address is 172.30.0.0 because we keep the first 16 bits of the subnet mask and set all host bits to 0. The valid host range is from 172.30.0.1 to 172.30.255.254, and the broadcast address is 172.30.255.255."

---

### Q2. 由 Network Address + Prefix 填 Host Range 與 Broadcast

**題目原文（English）：**

> Fill in the table for each of the network with prefix below.

| Network address | Prefix | Host Range | Broadcast Address |
|---|---|---|---|
| `220.0.0.0` | /8 | `220.0.0.1` ~ `220.255.255.254` | `220.255.255.255` |
| `10.20.0.0` | /16 | `10.20.0.1` ~ `10.20.255.254` | `10.20.255.255` |
| `150.150.10.0` | /24 | `150.150.10.1` ~ `150.150.10.254` | `150.150.10.255` |

**Answer（答案）：**

- `220.0.0.0/8`：Host Range = `220.0.0.1 ~ 220.255.255.254`；Broadcast = `220.255.255.255`（原表已示範）
- `10.20.0.0/16`：Host Range = **`10.20.0.1 ~ 10.20.255.254`**；Broadcast = **`10.20.255.255`**
- `150.150.10.0/24`：Host Range = **`150.150.10.1 ~ 150.150.10.254`**；Broadcast = **`150.150.10.255`**

**繁中解說（答題邏輯）：**

Prefix 直接告訴你邊啲位係 Network 部分：`/n` 即前 n 個 bit 係 Network，其餘 `32 − n` 個 bit 係 Host。Host 數量 = `2^(32−n) − 2`。

- `/8` → Host 部分有 24 bit，地址數 `2^24 = 16,777,216`，可用 Host 減 2。
- `/16` → Host 部分 16 bit，範圍由 `10.20.0.1` 到 `10.20.255.254`，Broadcast 係最後一個 `10.20.255.255`。
- `/24` → 最經典：第三 octet 固定，只有最後一個 octet 可變，`150.150.10.1` 至 `150.150.10.254`，Broadcast `150.150.10.255`。

重點：**Network + 1 = 第一個 Host；Broadcast − 1 = 最後一個 Host**。題目俾你 Network Address，就唔使再做 AND，直接喺 Host 部分加 1 / 全填 1 即可。

> **Exam Answer Phrase**
> "For 10.20.0.0/16, the host portion has 16 bits, so the host range is 10.20.0.1 to 10.20.255.254 and the broadcast address is 10.20.255.255."

---

### Q3. 由 Host IP + Prefix 求 Network 與 Broadcast

**題目原文（English）：**

> Fill in the table for each of the host IP address with prefix below.

| Host IP address | Prefix | Network address | Broadcast Address |
|---|---|---|---|
| `10.0.250.128` | /24 | `10.0.250.0` | `10.0.250.255` |
| `172.24.16.31` | /8 | **`172.0.0.0`** | **`172.255.255.255`** |
| `192.168.0.254` | /16 | **`192.168.0.0`** | **`192.168.255.255`** |

**Answer（答案）：**

- `10.0.250.128/24`：Network = `10.0.250.0`；Broadcast = `10.0.250.255`（原表已示範）
- `172.24.16.31/8`：Network = **`172.0.0.0`**；Broadcast = **`172.255.255.255`**
- `192.168.0.254/16`：Network = **`192.168.0.0`**；Broadcast = **`192.168.255.255`**

**繁中解說（答題邏輯）：**

呢題係 Q2 嘅反向操作：今次俾你「一部主機嘅 IP」，要你反推佢所屬網絡。方法：**Network 部分照抄，Host 部分歸零 = Network Address；Host 部分全填 1 = Broadcast Address**。

- `/8`：只保留第一個 octet（172），其餘三個 octet 歸零 → Network `172.0.0.0`；全填 1 → Broadcast `172.255.255.255`。`172.24.16.31` 只係呢個大網絡入面一部機。
- `/16`：保留前兩個 octet（192.168），後兩個歸零 → `192.168.0.0`；全填 1 → `192.168.255.255`。
- 記住：Broadcast 一定係「Network 範圍內最後一個地址」，即 host 部分全 1。

> **Exam Answer Phrase**
> "With a /8 prefix, only the first octet belongs to the network, so 172.24.16.31 belongs to network 172.0.0.0 with broadcast address 172.255.255.255."

---

### Q4. 分辨 Public 與 Private IPv4 地址

**題目原文（English）：**

> Identify each of the following as public or private IPv4 addresses:
> `10.16.123.44`、`10.168.123.44`、`64.192.123.44`、`172.16.17.18`、`172.31.30.29`、`172.32.31.30`、`192.100.3.55`、`192.168.3.55`、`192.200.3.55`

**Answer（答案）：**

| 地址 | 判定 |
|---|---|
| `10.16.123.44` | **Private** |
| `10.168.123.44` | **Private** |
| `64.192.123.44` | **Public** |
| `172.16.17.18` | **Private** |
| `172.31.30.29` | **Private** |
| `172.32.31.30` | **Public** |
| `192.100.3.55` | **Public** |
| `192.168.3.55` | **Private** |
| `192.200.3.55` | **Public** |

**繁中解說（答題邏輯）：**

RFC 1918 定義三個 Private（私網）範圍，考試一定要背熟：

- **`10.0.0.0/8`** → 由 `10.0.0.0` 到 `10.255.255.255`，所以任何「10.x.x.x」都係 Private。
- **`172.16.0.0/12`** → 由 `172.16.0.0` 到 **`172.31.255.255`**。重點陷阱：`172.16`–`172.31` 先至係 Private，**`172.32` 起就係 Public**！
- **`192.168.0.0/16`** → 由 `192.168.0.0` 到 `192.168.255.255`，所以任何「192.168.x.x」都係 Private；而 `192.100`、`192.200` 唔喺範圍內，係 Public。

判斷步驟：先睇第一個 octet 屬唔屬於 10；唔係就睇第二個 octet 喺 16–31 之間（僅限 172 開頭）；最後睇係咪 192.168 開頭。全部都唔啱就係 Public。

> **English Standard Definition**
> According to **RFC 1918**, the private IPv4 address ranges are **10.0.0.0/8**, **172.16.0.0/12** (172.16.0.0 – 172.31.255.255) and **192.168.0.0/16**. These addresses are not routable on the public Internet.

> **Exam Answer Phrase**
> "172.16.17.18 is a private address because it falls inside the RFC 1918 range 172.16.0.0/12; 172.32.31.30 is public because it is outside 172.16.0.0–172.31.255.255."

---

### Q5. 分辨 Network (N) / Host (H) / Broadcast (B) 地址

**題目原文（English）：**

> Identify each of the following IPv4 addresses as N (Network Address), H (Host Address), or B (Broadcast Address):
> `123.0.255.255/16`、`123.255.0.0/24`、`132.4.0.0/8`、`132.4.255.255/8`、`213.4.0.0/16`、`213.4.0.255/24`

**Answer（答案）：**

| 地址 | Prefix | 判定 | 原因 |
|---|---|---|---|
| `123.0.255.255/16` | /16 | **B** | /16 網絡係 123.0.0.0，Broadcast 係 123.0.255.255（host 部分全 1） |
| `123.255.0.0/24` | /24 | **N** | /24 網絡 ID 就係 123.255.0.0（host 部分全 0） |
| `132.4.0.0/8` | /8 | **H** | /8 網絡係 132.0.0.0，132.4.0.0 只係普通主機地址 |
| `132.4.255.255/8` | /8 | **H** | /8 Broadcast 係 132.255.255.255，所以 132.4.255.255 係主機 |
| `213.4.0.0/16` | /16 | **N** | 網絡 ID 就係 213.4.0.0（host 部分全 0） |
| `213.4.0.255/24` | /24 | **B** | /24 Broadcast 係 213.4.0.255（host 部分全 1） |

**繁中解說（答題邏輯）：**

三步判斷法：① 由 Prefix 定出 Network 範圍（Network 部分保留、Host 部分歸零）；② 睇 Host 部分係咪「全 0」→ N，係咪「全 1」→ B；③ 其他一律係 H。

最容易錯嘅兩題：

- `123.0.255.255/16`：/16 嘅 host 部分係**後兩個 octet（即 255.255）**，全 1 → Broadcast，**唔好睇成 `123.0.x.x` 就當 host**。
- `132.4.255.255/8`：/8 嘅 host 部分係後三個 octet（4.255.255），**唔係全 1**（全 1 先係 255.255.255）→ Host。對比 `132.255.255.255` 先至係 Broadcast。

> **Exam Answer Phrase**
> "For 132.4.0.0/8, the network portion is only 132, so the network address is 132.0.0.0 and 132.4.0.0 is a normal host address."

---

### Q6. Unicast / Broadcast / Multicast 與收件主機

**題目原文（English）：**

> The source host in a network sends out a packet. Circle the host(s) that will receive the packet (address type may be Unicast, Broadcast or Multicast).
> Destination = `192.168.100.255` ｜ Destination = `192.168.100.4` ｜ Destination = `225.5.77.126` ｜ Destination = `237.192.126.17`

**Answer（答案）：**

| Destination | 地址類型 | 邊啲主機收到 |
|---|---|---|
| `192.168.100.255` | **Broadcast** | 同一個 subnet 內**所有**主機都會收到 |
| `192.168.100.4` | **Unicast** | **只有** IP 為 192.168.100.4 嗰一部主機收到 |
| `225.5.77.126` | **Multicast** | 只有**加入咗 Multicast Group 225.5.77.126** 嘅主機收到 |
| `237.192.126.17` | **Multicast** | 只有**加入咗 Multicast Group 237.192.126.17** 嘅主機收到 |

**繁中解說（答題邏輯）：**

記住三個關鍵範圍：**Unicast** = 一個特定目標（1 對 1）；**Broadcast** = 目標係 subnet 最後一個地址（host 部分全 1，通常 .255），同一 subnet 所有機都收到（1 對全部）；**Multicast** = `224.0.0.0/4`（即第一 octet 喺 **224–239** 之間），只有訂閱咗嗰個 group 嘅主機收到（1 對一群）。

`192.168.100.255` 係典型 Broadcast（/24 網絡嘅最後地址）；`225.5.77.126` 同 `237.192.126.17` 第一 octet 分別係 225 同 237，都喺 224–239 範圍 → Multicast。

> **English Standard Definition**
> **Unicast** delivers a packet to a single destination host. **Broadcast** delivers a packet to all hosts in the same subnet (destination host bits all 1). **Multicast** (224.0.0.0/4) delivers a packet only to hosts that have joined the corresponding multicast group.

> **Exam Answer Phrase**
> "192.168.100.255 is a broadcast address, so every host in the subnet receives the packet; 225.5.77.126 is a multicast address (224–239), so only group members receive it."

---

### Q7. 將 /24 網絡劃分為 8 個 Subnet（/27）

**題目原文（English）：**

> Network `192.168.1.0/24` can host 254 valid host addresses. This is now divided into 8 subnets using subnet mask `255.255.255.224`.
> 1. How many valid hosts are there in each subnet? ______
> 2. Identify the network id and the broadcast addresses of the subnets below.
>    - Subnet 0: ID-192.168.1.0/27, Broadcast-192.168.1.31/27（示例）
>    - Subnet 5: ID-______/27, Broadcast-______/27
>    - Subnet 7: ID-______/27, Broadcast-______/27
> 3. Identify the first and the last host of the subnet below.
>    - Subnet 1: First-192.168.1.33/27, Last-192.168.1.62/27（示例）
>    - Subnet 3: First-______/27, Last-______/27
>    - Subnet 6: First-______/27, Last-______/27
> 4. Identify the subnet that each of the following addresses belongs to:
>    `192.168.1.32/27`、`192.168.1.193/27`、`192.168.1.96/27`、`192.168.1.222/27`、`192.168.1.158/27`、`192.168.1.226/27`

**Answer（答案）：**

1. 每個 Subnet 可用 Host 數：**30**（`2^5 − 2 = 30`）
2. Subnet 5：ID = **`192.168.1.160/27`**，Broadcast = **`192.168.1.191/27`**；Subnet 7：ID = **`192.168.1.224/27`**，Broadcast = **`192.168.1.255/27`**
3. Subnet 3：First = **`192.168.1.97/27`**，Last = **`192.168.1.126/27`**；Subnet 6：First = **`192.168.1.193/27`**，Last = **`192.168.1.222/27`**
4. 見下表

**繁中解說（答題邏輯）：**

呢題係 Fixed-Length Subnetting 嘅基本功。解題四步：

1. **求 Block Size**：/27 → Host 部分有 `32 − 27 = 5` bit → 每 subnet 有 `2^5 = 32` 個地址。Block Size 亦可以直接計：`256 − 224 = 32`（224 係 mask 最後一個非 0 octet）。
2. **求 Subnet 數**：`2^3 = 8`（由 /24 加到 /27 借咗 3 bit）。
3. **排 Subnet 邊界**：由 0 開始，每個加 32：
   - Subnet 0：.0–.31｜Subnet 1：.32–.63｜Subnet 2：.64–.95｜Subnet 3：.96–.127｜Subnet 4：.128–.159｜Subnet 5：.160–.191｜Subnet 6：.192–.223｜Subnet 7：.224–.255
4. **填答案**：每個 subnet 嘅 ID 係開頭地址（host 全 0），Broadcast 係結尾地址（host 全 1），First Host = ID + 1，Last Host = Broadcast − 1。
   - Subnet 5：ID `.160`，Broadcast `.191`；Subnet 7：ID `.224`，Broadcast `.255`
   - Subnet 3：First `.97`，Last `.126`；Subnet 6：First `.193`，Last `.222`

判斷地址屬於邊個 subnet：睇個地址落入邊個 32 嘅區間。

| 地址 | 落入區間 | 所屬 Subnet |
|---|---|---|
| `192.168.1.32/27` | .32–.63 | **Subnet 1**（正好係 Subnet 1 嘅 Network ID） |
| `192.168.1.193/27` | .192–.223 | **Subnet 6**（host） |
| `192.168.1.96/27` | .96–.127 | **Subnet 3**（正好係 Network ID） |
| `192.168.1.222/27` | .192–.223 | **Subnet 6**（最後一個 host） |
| `192.168.1.158/27` | .128–.159 | **Subnet 4**（最後一個 host） |
| `192.168.1.226/27` | .224–.255 | **Subnet 7**（host） |

> **Exam Answer Phrase**
> "255.255.255.224 gives a block size of 32 (256 − 224), so the subnets are 192.168.1.0, .32, .64, .96, .128, .160, .192 and .224; each subnet provides 2^5 − 2 = 30 valid host addresses."

---

### Q8. 從 IP 與 Subnet Mask 求出 Subnet 資訊（/26）

**題目原文（English）：**

> Suppose that in the IT Network, your computer IP address is `192.172.10.178` with subnet mask `255.255.255.192`.
> (a) Represent the IP address in binary form.
> (b) Represent the subnet mask in binary form.
> (c) Identify the network address (network ID, network number) of the IT network.
> (d) Find out the range of IP addresses of IT network. (Starting IP address / Ending IP address)
> (e) Identify the broadcast address of IT network.
> (f) Which of the following are valid host IP addresses (under subnet mask 255.255.255.192) in the IT network?
>    `192.172.10.120`、`192.172.10.180`、`192.172.10.128`、`192.172.10.190`、`192.172.10.129`、`192.172.10.191`

**Answer（答案）：**

- (a) IP 二進制：`192.172.10.178` → **`11000000.10101100.00001010.10110010`**
- (b) Mask 二進制：`255.255.255.192` → **`11111111.11111111.11111111.11000000`**（/26）
- (c) Network Address：**`192.172.10.128`**
- (d) Host Range：**Starting = `192.172.10.129`，Ending = `192.172.10.190`**
- (e) Broadcast Address：**`192.172.10.191`**
- (f) 有效 Host：**`192.172.10.180`、`192.172.10.190`、`192.172.10.129`**

**繁中解說（答題邏輯）：**

呢題同 Q1 一樣嘅四步，但 mask 唔再係「整整齊齊」嘅 /8、/16、/24，而係 /26——最後一個 octet 唔係 0 或 255，所以要識得喺 octet 中間切。

- (a)(b) 二進制轉換同上題方法：`178 = 128+32+16+2 = 10110010`；`192 = 128+64 = 11000000`。
- (c) 求 Network：`178 AND 192`：`10110010 AND 11000000 = 10000000 = 128`。前三個 octet 唔變（192.172.10），最後一個變 128 → `192.172.10.128`。
- (d)(e) 因為 Host 部分只有 6 bit（`32 − 26 = 6`），Block Size = `2^6 = 64`（或 `256 − 192 = 64`）。由 Network `.128` 開始，Broadcast = `.128 + 64 − 1 = .191`，所以 Host Range = `.129` 至 `.190`。
- (f) 有效 Host 判斷：喺 `.129`–`.190` 之內先至有效。`192.172.10.128` 係 Network Address，`192.172.10.191` 係 Broadcast，`192.172.10.120` 屬於另一個 subnet（.64–.127）——全部唔得。

| 候選地址 | 判定 | 原因 |
|---|---|---|
| `192.172.10.120` | ❌ 無效 | 屬於 subnet 192.172.10.64/26（.64–.127） |
| `192.172.10.180` | ✅ 有效 Host | 喺 .129–.190 範圍內 |
| `192.172.10.128` | ❌ Network Address | 網絡地址，不可派發 |
| `192.172.10.190` | ✅ 有效 Host | 最後一個可用地址 |
| `192.172.10.129` | ✅ 有效 Host | 第一個可用地址 |
| `192.172.10.191` | ❌ Broadcast | 廣播地址，不可派發 |

> **Exam Answer Phrase**
> "ANDing 178 with the mask 192 gives 128, so the network address is 192.172.10.128; with a block size of 64 the broadcast is 192.172.10.191 and the valid hosts are 192.172.10.129 to 192.172.10.190."

---

### Q9. 填 Subnet 資訊表（/26、/28、/30）

**題目原文（English）：**

> Fill-in the subnet information table below.

| Network address | Host addresses | Broadcast Address |
|---|---|---|
| `15.15.0.128/26` | `15.15.0.129` ~ `15.15.0.190` | `15.15.0.191` |
| `150.150.150.32/28` | `150.150.150.33` ~ `150.150.150.46` | `150.150.150.47` |
| `200.200.200.8/30` | `200.200.200.9` ~ `200.200.200.10` | `200.200.200.11` |

**Answer（答案）：**

- `15.15.0.128/26`：Host = **`15.15.0.129 ~ 15.15.0.190`**；Broadcast = **`15.15.0.191`**
- `150.150.150.32/28`：Host = **`150.150.150.33 ~ 150.150.150.46`**；Broadcast = **`150.150.150.47`**
- `200.200.200.8/30`：Host = **`200.200.200.9 ~ 200.200.200.10`**；Broadcast = **`200.200.200.11`**

**繁中解說（答題邏輯）：**

呢題考你 Block Size 同 Host 數量公式嘅熟練度。逐個 subnet 計：

- **/26**：Block = 64（`256 − 192`），Host 數 = `2^6 − 2 = 62`。由 `.128` 到 `.191`，Host `.129`–`.190`。
- **/28**：Block = 16（`256 − 240`），Host 數 = `2^4 − 2 = 14`。由 `.32` 到 `.47`，Host `.33`–`.46`。
- **/30**：Block = 4（`256 − 252`），Host 數 = `2^2 − 2 = 2`。由 `.8` 到 `.11`，Host 得 `.9`、`.10`——**/30 係 Point-to-Point（路由器之間）專用**，因為每條 WAN Link 只需要 2 個地址。

重點：Host Range 永遠係「Network + 1」到「Broadcast − 1」，Broadcast 永遠係「Network + Block − 1」。

> **Exam Answer Phrase**
> "For 150.150.150.32/28, the block size is 16, so the broadcast is 150.150.150.47 and the usable hosts are 150.150.150.33 to 150.150.150.46 (2^4 − 2 = 14 hosts)."

---

### Q10. 十進制轉二進制 + 判斷同一 Subnet

**題目原文（English）：**

> Express the following decimal numbers in 8-bit binary:
> 200 in 8-bit binary: ____________
> 215 in 8-bit binary: ____________
> (a) Are addresses `201.3.4.200/29` and `201.3.4.215/29` in the same subnet? ______ (yes/no)
> (b) Are addresses `201.3.4.200/27` and `201.3.4.215/27` in the same subnet? ______ (yes/no)
> (c) Identify the following as network ID / host address / broadcast address in their subnets:
>    `201.3.4.200/28`、`201.3.4.215/28`、`201.3.4.200/29`、`201.3.4.215/29`

**Answer（答案）：**

- 200 二進制：**`11001000`**
- 215 二進制：**`11010111`**
- (a) **No**（/29：200 屬 network .200，215 屬 network .208，唔同 subnet）
- (b) **Yes**（/27：兩個都屬 network .192）
- (c) `201.3.4.200/28` = **Host Address**；`201.3.4.215/28` = **Host Address**；`201.3.4.200/29` = **Network ID**；`201.3.4.215/29` = **Broadcast Address**

**繁中解說（答題邏輯）：**

先做二進制轉換（呢個係成題嘅根基，方便你睇 AND 運算）：`200 = 128+64+8 = 11001000`；`215 = 128+64+16+4+2+1 = 11010111`。

判斷「是否同一 subnet」嘅標準方法：**將兩個地址分別 AND 上 mask，得出嘅 Network Address 相同就係同一 subnet**。

- (a) /29：mask 最後一個 octet 係 248（`11111000`）。`200 AND 248 = 200`（`11001000 AND 11111000 = 11001000`）；`215 AND 248 = 208`（`11010111 AND 11111000 = 11010000`）。`200 ≠ 208` → **唔同 subnet**。
- (b) /27：mask 最後一個 octet 係 224（`11100000`）。`200 AND 224 = 192`；`215 AND 224 = 192`。一樣 → **同一 subnet**。

(c) 用 Block Size 法：/28 → Block 16；/29 → Block 8。

- `.200/28`：`200 ÷ 16` 嘅邊界 → network .192，範圍 .192–.207，.200 唔係頭唔係尾 → **Host**。
- `.215/28`：範圍 .208–.223（network .208，broadcast .223），.215 → **Host**。
- `.200/29`：範圍 .200–.207，.200 正正係開頭 → **Network ID**。
- `.215/29`：範圍 .208–.215，.215 正正係結尾 → **Broadcast**。

> **Exam Answer Phrase**
> "201.3.4.200/29 gives network 201.3.4.200 while 201.3.4.215/29 gives network 201.3.4.208, so they are NOT in the same subnet; with /27 both AND to 201.3.4.192, so they ARE in the same subnet."

---

### Q11. 地址設計：Design 1（/27）vs Design 2（/28）

**題目原文（English）：**

> Network `192.168.100.0/24` is used to provide all the subnets required in the network below.
> (a) Design 1: Based on the number of networks needed, prefix /27 is used. Fill in the addresses below (LAN1–LAN4, WAN Link: First Address / Last Address).
> Total wasted host addresses in the assigned subnets = (30−__) + (30−__) + (30−__) + (30−__) + (30−__) = ______
> (b) Design 2: Based on the maximum number of hosts needed in a subnet, prefix /28 is used. Fill in the addresses below.
> Total wasted host addresses in the assigned subnets = (14−__) + (14−__) + (14−__) + (14−__) + (14−__) = ______

**Answer（答案）：**

**Design 1（prefix /27，每個 subnet 30 個可用 Host）：**

| Usage | First Address | Last Address |
|---|---|---|
| LAN1 | `192.168.100.1` | `192.168.100.30` |
| LAN2 | `192.168.100.33` | `192.168.100.62` |
| LAN3 | `192.168.100.65` | `192.168.100.94` |
| LAN4 | `192.168.100.97` | `192.168.100.126` |
| WAN Link | `192.168.100.129` | `192.168.100.158` |

**Design 2（prefix /28，每個 subnet 14 個可用 Host）：**

| Usage | First Address | Last Address |
|---|---|---|
| LAN1 | `192.168.100.1` | `192.168.100.14` |
| LAN2 | `192.168.100.17` | `192.168.100.30` |
| LAN3 | `192.168.100.33` | `192.168.100.46` |
| LAN4 | `192.168.100.49` | `192.168.100.62` |
| WAN Link | `192.168.100.65` | `192.168.100.78` |

**繁中解說（答題邏輯）：**

設計 subnetting 方案時，要按「網絡數量」或「每網絡最大主機數」嚟揀 Prefix：

- **Design 1（/27）**：需要 5 個網絡（LAN1–LAN4 + WAN），/27 提供 `2^3 = 8` 個 subnet，每個 30 個 Host。分配：Subnet 0 → LAN1（.0–.31）、Subnet 1 → LAN2（.32–.63）、Subnet 2 → LAN3（.64–.95）、Subnet 3 → LAN4（.96–.127）、Subnet 4 → WAN（.128–.159）。First Address = Network ID + 1，Last Address = Broadcast − 1。
- **Design 2（/28）**：/28 提供 `2^4 = 16` 個 subnet，每個 14 個 Host。分配：LAN1（.0–.15）、LAN2（.16–.31）、LAN3（.32–.47）、LAN4（.48–.63）、WAN（.64–.79）。

**浪費地址（Wasted Host Addresses）** 嘅計法：`(每個 subnet 容量 − 實際需要嘅 host 數)` 加總。公式入面嘅空位就係**網絡圖上每個 LAN 實際需要嘅主機數**（原教材嘅圖表冇喺文字檔顯示，請參閱 PowerPoint 圖中嘅 PC 數目）。例如假設 LAN1–LAN4 各需 10 部、WAN Link 需 2 部：

- Design 1：`(30−10) + (30−10) + (30−10) + (30−10) + (30−2) = 20×4 + 28 = 108` 個浪費
- Design 2：`(14−10) + (14−10) + (14−10) + (14−10) + (14−2) = 4×4 + 12 = 28` 個浪費

結論：**揀 Prefix 愈貼近實際需求，浪費愈少**。呢個正正係 VLSM（可變長子網遮罩）嘅概念雛形——考試答題時記得寫「By choosing a prefix that matches the actual host requirement, fewer addresses are wasted.」

> **Exam Answer Phrase**
> "Using /27, each subnet provides 30 hosts; subnet 0 (192.168.100.0–.31) is assigned to LAN1, so its first address is 192.168.100.1 and its last address is 192.168.100.30. Wasted addresses equal the subnet capacity minus the number of hosts actually required."

---

### Q12. 三個 Subnetting Scheme 比較（CCNA1）

**題目原文（English）：**

> A network administrator is subnetting network `192.168.1.0/24` for LAN1, LAN2, and LAN3.
> Scheme A: LAN1 `192.168.1.0/26`, LAN2 `192.168.1.64/26`, LAN3 `192.168.1.128/26`
> Scheme B: LAN1 `192.168.1.0/26`, LAN2 `192.168.1.64/27`, LAN3 `192.168.1.96/27`
> Scheme C: LAN1 `192.168.1.0/26`, LAN2 `192.168.1.64/27`, LAN3 `192.168.1.96/28`
> In Scheme A, total number of host addresses not used in the assigned subnets = (62−__) + (62−__) + (62−__) = ______
> In Scheme B, total number of host addresses not used = (62−__) + (30−__) + (30−__) = ______
> In Scheme C, total number of host addresses not used = (62−__) + (30−__) + (14−__) = ______

**Answer（答案）：**

**各 Scheme 嘅 subnet 範圍（由 Network ID 計出）：**

| Scheme | LAN1 | LAN2 | LAN3 |
|---|---|---|---|
| A | `192.168.1.0/26`（.1–.62） | `192.168.1.64/26`（.65–.126） | `192.168.1.128/26`（.129–.190） |
| B | `192.168.1.0/26`（.1–.62） | `192.168.1.64/27`（.65–.94） | `192.168.1.96/27`（.97–.126） |
| C | `192.168.1.0/26`（.1–.62） | `192.168.1.64/27`（.65–.94） | `192.168.1.96/28`（.97–.110） |

**繁中解說（答題邏輯）：**

呢題示範三種「配 size」策略，考你對容量同浪費嘅理解：

- **Scheme A（全 /26）**：三個 subnet 都係 62 Host。LAN1 用 .0–.63，LAN2 用 .64–.127，LAN3 用 .128–.191，剩低 .192–.255 未用。
- **Scheme B（1×/26 + 2×/27）**：LAN2、LAN3 改用細啲嘅 /27（30 Host），節省地址：LAN2 = .64–.95，LAN3 = .96–.127。
- **Scheme C（/26 + /27 + /28）**：LAN3 再縮細做 /28（14 Host），.96–.111，更加慳。

**未用（浪費）地址 = 容量 − 實際需求**。公式空位係圖中每個 LAN 實際需要嘅主機數；以 LAN1 = 50、LAN2 = 20、LAN3 = 10 為例：

- Scheme A：`(62−50) + (62−20) + (62−10) = 12 + 42 + 52 = 106`
- Scheme B：`(62−50) + (30−20) + (30−10) = 12 + 10 + 20 = 42`
- Scheme C：`(62−50) + (30−20) + (14−10) = 12 + 10 + 4 = 26`

結論：**Scheme C 浪費最少**，因為每個 LAN 嘅 subnet size 最貼近實際需求。答題要點：先確認每個 scheme 每條 subnet 嘅容量（62 / 30 / 14），再乘減實際需求。

> **Exam Answer Phrase**
> "In Scheme C, LAN1 uses a /26 (62 hosts), LAN2 uses a /27 (30 hosts) and LAN3 uses a /28 (14 hosts), so the unused addresses are (62−50)+(30−20)+(14−10) = 26, the smallest waste among the three schemes."

---

## 📖 必考英文術語與答題句型庫

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| **IPv4 Address** | 32-bit 邏輯地址，以點分十進制寫成 4 個 octet，例如 172.30.18.15 | "An IPv4 address is a 32-bit address written in dotted-decimal notation as four octets." |
| **Octet** | 8 個 bit 一組，即地址中每個數字（0–255） | "Each octet contains 8 bits and ranges from 0 to 255." |
| **Subnet Mask** | 用 1 標示 Network 部分、0 標示 Host 部分嘅 32-bit 遮罩，例如 255.255.255.0 | "The subnet mask separates the network portion (1s) from the host portion (0s) of an IP address." |
| **Prefix Length (CIDR)** | 以 /n 表示 mask 中連續 1 嘅數目，例如 /24 = 255.255.255.0 | "A prefix length of /24 means the first 24 bits are the network portion." |
| **Dotted-Decimal Notation** | IPv4 嘅十進制寫法，如 192.168.1.0 | "The address is expressed in dotted-decimal notation, e.g. 192.168.1.0." |
| **Network Address (Network ID)** | Host 部分全 0 嘅地址，代表成個網絡，不可派俾主機 | "The network address is obtained by ANDing the IP address with the subnet mask." |
| **Broadcast Address** | Host 部分全 1 嘅地址，用嚟向網絡內所有主機廣播，不可派俾主機 | "The broadcast address has all host bits set to 1 and is the last address of the subnet." |
| **Host Range** | 由 Network Address + 1 到 Broadcast − 1 之間全部可用地址 | "Valid hosts range from the network address plus one to the broadcast address minus one." |
| **Block Size** | 每個 subnet 嘅地址總數，等於 256 − mask 最後非 0 octet | "The block size is 256 minus the last non-zero octet of the subnet mask." |
| **Subnetting** | 將一個網絡再劃分做多個較細子網，向 Host 部分借位 | "Subnetting borrows bits from the host portion to create additional networks." |
| **Valid Hosts = 2^h − 2** | 可用主機數公式，h = host 位數，減 2 係減 Network 同 Broadcast | "The number of usable hosts per subnet is 2 to the power of the host bits minus 2." |
| **Private IP Address** | RFC 1918 定義，喺內部網絡使用、不可喺互聯網路由嘅地址 | "According to RFC 1918, 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 are private addresses." |
| **Public IP Address** | 可喺互聯網上路由、全球唯一嘅地址 | "Public addresses are globally unique and routable on the Internet." |
| **Unicast** | 1 對 1 傳送，只發去單一目的地主機 | "A unicast packet is delivered to a single destination host." |
| **Broadcast** | 1 對全部，傳俾同一 subnet 內所有主機（目的地址 host 位全 1） | "A broadcast packet is delivered to every host in the subnet." |
| **Multicast** | 1 對一群，只傳俾加入咗 group（224.0.0.0/4）嘅主機 | "Multicast addresses range from 224.0.0.0 to 239.255.255.255 and are delivered only to group members." |
| **Network / Host / Broadcast Classification** | 分辨地址係網絡地址、普通主機地址定廣播地址 | "If all host bits are 0 it is the network address; if all host bits are 1 it is the broadcast address; otherwise it is a host address." |
| **Same Subnet Check** | 將兩個 IP 分別 AND mask，Network Address 相同即屬同一 subnet | "Two addresses are in the same subnet if ANDing each with the mask gives the same network address." |
| **Wasted (Unused) Addresses** | 每個 subnet 容量減去實際需要主機數嘅總和 | "Wasted addresses equal the total subnet capacity minus the number of hosts actually required." |

---

## 🗺️ 學習路線 (Learning Path)

**Step 1 — 先理解（Understand）**
- 明白 IPv4 地址點解係 32-bit、點解用 Dotted-Decimal 寫（4 個 octet，每 octet 0–255）。
- 明白 Subnet Mask 嘅本質：1 = Network 部分，0 = Host 部分；Prefix /n 只係 mask 嘅縮寫（/24 = 255.255.255.0）。
- 睇明 Network Address（host 全 0）、Broadcast（host 全 1）、Host Range（中間全部）三者嘅關係。用 Q1、Q8 做理解測試。

**Step 2 — 背誦（Memorize）**
- 背熟 8-bit 位值表：**128 64 32 16 8 4 2 1**。
- 背熟常用 Prefix ↔ Mask ↔ 可用 Host 對照（/24→254、/25→126、/26→62、/27→30、/28→14、/29→6、/30→2）。
- 背熟 RFC 1918 私網範圍：10/8、172.16–172.31（/12）、192.168/16；Multicast 範圍 224–239。

**Step 3 — 掌握計算 / 判斷（Calculate & Judge）**
- 熟練三種核心計算：① 十進制 ↔ 二進制互換（Q10）；② Block Size = 256 − mask octet，用嚟排 subnet 邊界（Q7、Q9）；③ 可用 Host = 2^h − 2。
- 掌握判斷技巧：Public/Private（Q4）、N/H/B（Q5）、Unicast/Broadcast/Multicast（Q6）、同一 subnet 判斷（Q10）。
- 練習題 Q2、Q3、Q9 嘅三種填表方向，確保「俾 Network 求 Range」「俾 Host 求 Network」都熟。

**Step 4 — 能解答考題（Solve Exam Questions）**
- 合上筆記，限時完成全份 Tutorial 7；每一題都要寫得出英文答題句（Exam Answer Phrase）。
- 特別操練 Q11、Q12 嘅設計題：識得由需求揀 Prefix、填 First/Last Address、計 Wasted Addresses，並用一句英文總結設計取捨。

---

## 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 關鍵數字 (Key Numbers)

| 位值 | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|---|
| Binary bit | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 對應 mask | 128 | 192 | 224 | 240 | 248 | 252 | 254 | 255 |

### Prefix ↔ Subnet Mask ↔ 可用 Host 對照表

| Prefix | Subnet Mask | Block Size | 可用 Host (2^h − 2) |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2（Point-to-Point） |

### 私網 / 特殊地址範圍 (Private & Special Ranges)

| 範圍 | 記憶 |
|---|---|
| Private：`10.0.0.0/8` | 任何 10.x.x.x 都係 Private |
| Private：`172.16.0.0/12` | 只有 172.16 至 **172.31**（172.32 起 = Public！） |
| Private：`192.168.0.0/16` | 任何 192.168.x.x 都係 Private |
| Multicast：`224.0.0.0/4` | 第一 octet 224–239 |
| Broadcast 特徵 | Host 部分全 1（例：x.x.x.255） |

### 萬能公式 (Master Formulas)

> **Network Address** = IP AND Subnet Mask（Host 位全 0）
> **Broadcast Address** = Network + Block Size − 1（Host 位全 1）
> **Host Range** = Network + 1 至 Broadcast − 1
> **可用 Host** = 2^h − 2 ｜ **Subnet 數** = 2^n（n = 向 Host 借嘅 bit 數）
> **Block Size** = 256 − mask 最後非 0 octet
> **Same Subnet?** 兩個 IP AND mask 嘅結果相同即係同一個 subnet

### 英文記憶口訣 (English Mnemonics)

- **"N + 1 to B − 1"** — Host 範圍由 Network + 1 到 Broadcast − 1。
- **"All zeros = Network, all ones = Broadcast"** — Host 位全 0 係網絡地址，全 1 係廣播地址。
- **"2 to the h minus 2"** — 可用主機公式 2^h − 2。
- **"RFC 1918: 10 / 172.16–31 / 192.168"** — 三個私網範圍。
- **"224–239 = Multicast"** — 第一 octet 224 至 239 係 Multicast。
- **"256 minus mask gives the block"** — Block Size = 256 − mask octet。
