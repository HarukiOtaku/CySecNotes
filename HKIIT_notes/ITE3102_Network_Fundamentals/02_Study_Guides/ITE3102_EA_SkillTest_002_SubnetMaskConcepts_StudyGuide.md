# ITE3102 EA Skill Test 002: IPv4 同 Subnet Mask 概念

> **系列**：EA Skill Test 準備（本頁 = 概念；計法見 003）
> **理論來源**：`ITE3102_L7_IPv4Addressing_StudyGuide.md`、`ITE3102_L0_NumberSystems_StudyGuide.md`
> **下一頁**：`ITE3102_EA_SkillTest_003_SubnettingFourSteps_StudyGuide.md`

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

Skill Test 紙筆第一句通常已經丟出 `192.168.x.0/24` 同另一個更長嘅 prefix（`/27`、`/28`…）。如果唔清楚 **IPv4 係 32 粒 bit**、**subnet mask 係把刀**、**AND 求出 network**，後面成張表都會靠估。

本頁只講「數字代表咩」，唔急住切 subnet。目標係你可以向自己解釋：點解 `/28` 嘅最後 octet 係 `11110000`、點解 decimal 係 `240`、點解 host 位全 0 唔可以派、點解 host 位全 1 亦唔可以派。

實務情境：Windows「IPv4 設定」三欄——IP address、subnet mask、default gateway——其實就係「我係邊個、我屬邊個網、離開呢個網要問邊個」。Skill Test 要你由 mask 倒推呢三樣。

## 🎯 2. 考試學習目標（Learning Objectives）

1. **寫出 IPv4 嘅長度同寫法** — State that an IPv4 address is 32 bits written as four decimal octets
2. **解釋 subnet mask 嘅 1 同 0** — Explain that 1s mark the network portion and 0s mark the host portion
3. **互換 mask 同 prefix** — Convert between dotted-decimal masks and slash prefix lengths
4. **用 AND 求 network address** — AND an address with its mask to obtain the network address
5. **分辨 Network／Host／Broadcast** — Identify all-zeros host bits, usable hosts, and all-ones host bits
6. **解釋點解要減 2** — Explain why the network and broadcast addresses cannot be assigned to hosts

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 IPv4 係一條 32-bit 階層地址

IPv4 address 唔係「一舊電話號碼」，而係 **32 粒 binary bit**，分成 4 組，每組 **8 bit = 1 octet**。每組 8 bit 可以表示 0 至 255，所以寫成 **dotted-decimal**：四個十進制數字，中間用點隔開，例如 `192.168.80.33`。

「階層」嘅意思：前半截話你知 **屬邊個網絡**（network portion），後半截話你知 **係該網裏面邊一部機**（host portion）。Router 轉發時主要睇 network portion，唔使記住全球每一部主機。

> **English Standard Definition:** An IPv4 address is a 32-bit hierarchical address that is made up of a network portion and a host portion. It is written in dotted-decimal notation as four octets.

8-bit 位置值（由左至右，課堂 L0 必背）：

`128  64  32  16  8  4  2  1`

所以 `11110000` = 128+64+32+16 = **240**；`11100000` = 128+64+32 = **224**。Skill Test 問 binary 最後 octet，就係考你呢條。

### 3.2 Subnet mask 係把刀，唔係第二個 IP

Subnet mask 外形好似 IP（都係四個 0–255），但用途完全唔同：**由左至右逐 bit 同 IP 比較**。

- mask bit = **1** → 對應 IP 嗰粒屬於 **network portion**（保留）
- mask bit = **0** → 對應 IP 嗰粒屬於 **host portion**（呢啲位先用來分別每一部機）

1 一定由左邊連續排過來，唔會中間斷開，所以先可以簡寫成 **prefix length**／**slash notation**：數一數有幾多粒 1，寫成 `/n`。

| Prefix | Subnet Mask | 最後 octet binary | 1 嘅數目 |
|---|---|---|---|
| /24 | 255.255.255.0 | 00000000 | 24 |
| /25 | 255.255.255.128 | 10000000 | 25 |
| /26 | 255.255.255.192 | 11000000 | 26 |
| /27 | 255.255.255.224 | 11100000 | 27 |
| /28 | 255.255.255.240 | 11110000 | 28 |
| /29 | 255.255.255.248 | 11111000 | 29 |
| /30 | 255.255.255.252 | 11111100 | 30 |

速記最後 octet：**128／192／224／240／248／252**。Skill Test 最常出 `/27` 同 `/28`。

> **English Standard Definition:** To identify the network and host portions of an IPv4 address, the subnet mask is compared to the IPv4 address bit for bit, from left to right. The prefix length is the number of bits set to 1 in the subnet mask, written in slash notation.

### 3.3 Logical AND：點樣由一部機倒推「我屬邊個網」

規則只有一句：**只有 1 AND 1 先出 1，其餘都出 0**。

做法：把主機 IP 同 subnet mask **逐 bit AND**。

- mask 係 1 嘅位：`x AND 1 = x` → IP 嗰粒 **原封不動**
- mask 係 0 嘅位：`x AND 0 = 0` → **全部歸零**

AND 完，host bits 全 0，結果就係 **network address**（又叫 subnet address／network ID）。

例：`192.168.10.10` AND `255.255.255.0` = **`192.168.10.0`**。最後 octet 被 mask 嘅 0 清走。

Shortcut（考場用）：唔使 32 粒逐粒乘。睇 mask 最後非 0 octet，用 **block size** 跳——詳見 003。AND 係「點解得呢個答案」；block size 係「點樣快計」。

> **English Standard Definition:** A logical AND Boolean operation is used in determining the network address. Only a 1 AND 1 produces a 1; any other combination results in a 0. The host IPv4 address is ANDed bit by bit with the subnet mask.

### 3.4 三種地址：Network、Host、Broadcast

喺**同一個 subnet** 裏面，host bits 有三種填法：

| 名稱 | Host bits | 可唔可以派畀裝置 | 點認 |
|---|---|---|---|
| Network address | **全 0** | 唔可以 | 該 subnet 嘅「門牌」；表上 Subnet address 嗰格 |
| Host address（usable） | 非全 0、非全 1 | 可以 | First = Network+1；Last = Broadcast−1 |
| Broadcast address | **全 1** | 唔可以 | 打去呢個地址 = 同一 subnet 全部主機都會收到 |

`/24` 經典四個位：Network `.0`、First `.1`、Last `.254`、Broadcast `.255`。

課堂口訣：First = **all 0s and a 1**；Last = **all 1s and a 0**。

> **English Standard Definition:** The network address has all 0s in the host portion. The broadcast address has all 1s in the host portion. Usable host addresses sit between them: the first host has all 0s and a 1; the last host has all 1s and a 0.

### 3.5 點解可用 host 要減 2

公式 **`2^h − 2`** 入面嘅 `h` = 剩低幾多粒 host bit（即 mask 有幾多粒 0）。

`2^h` 係 host bits 全部組合數。要減 2，因為：

1. host 全 0 = **network address**（用來代表成個網，唔代表一部機）
2. host 全 1 = **broadcast address**（用來一次過通知成個網）

所以 `/28` 剩 4 粒 host bit → `2^4 = 16` 個地址，減 2 → **14 部機**。16 唔係「16 部電腦」，16 係「呢格有 16 個號碼」，頭尾兩個有特殊用途。

> **English Standard Definition:** The number of usable hosts per subnet is 2 to the power of the host bits minus 2, because the network address and the broadcast address cannot be assigned to hosts.

### 3.6 Default gateway 係「離開呢個網嘅出口」

Default gateway 唔係第三種 mask，而係 **同一 subnet 裏面一部 router 介面嘅 usable IP**。PC 要去第二個網（例如 Internet 或者另一條 LAN），封包先交給 gateway，再由 router 轉發。

Skill Test 規則：

- 題目寫「first usable as default gateway」→ 填該 subnet 嘅 **Network + 1**
- 題目寫「last usable as default gateway」→ 填 **Broadcast − 1**
- Laser、Server 只要同 gateway **同一個 subnet**，佢哋嘅 Default Gateway 欄 **一定填同一個數**

> **English Standard Definition:** The default gateway is the address of the router interface on the local subnet. Hosts on the same subnet use the same default gateway.

### 3.7 私網（識認就得，Skill Test 通常已經用私網）

RFC 1918 三個 private block **唔可以喺 Internet 上路由**：

- `10.0.0.0/8` — 任何 10.x.x.x
- `172.16.0.0/12` — **只 172.16 至 172.31**（172.32 起唔算）
- `192.168.0.0/16` — 任何 192.168.x.x

練習卷用 `192.168.x.0` 或 `172.16.x.0` 就係呢類。

> **English Standard Definition:** According to RFC 1918, 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 are private addresses and are not routable on the public Internet.

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| EN | 繁中概念 | Exam Answer Phrase |
|---|---|---|
| Octet | 8-bit 一組，0–255 | "An IPv4 address has four octets; each octet is 8 bits." |
| Subnet mask | 1 = network、0 = host | "In the subnet mask, bits set to 1 identify the network portion and bits set to 0 identify the host portion." |
| Prefix length / slash notation | /n = 有 n 粒 1 | "A prefix length of /28 means 28 bits are set to 1, so the mask is 255.255.255.240." |
| Logical AND | 求 network address | "The network address is obtained by ANDing the IP address with the subnet mask." |
| Network address | host 全 0 | "The network address has all host bits set to 0." |
| Broadcast address | host 全 1 | "The broadcast address has all host bits set to 1 and is the last address of the subnet." |
| Usable host | 中間嗰啲 | "Usable hosts range from the network address plus 1 to the broadcast address minus 1." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**Step 1 — 先理解觀念（Understand）**  
用紙寫 `192.168.80.33` 嘅 4 個 octet；圈出 `/27` mask 邊啲係 1。

**Step 2 — 背誦英文短語（Memorize）**  
「32-bit hierarchical」「1 = network, 0 = host」「only 1 AND 1 produces a 1」「all zeros = network, all ones = broadcast」。

**Step 3 — 掌握計算／寫法（Calculate）**  
默寫 `/25`–`/30` 最後 octet 嘅 binary 同 decimal，錯一格就返 L0 位置值表。

**Step 4 — 能解答英文考題（Solve Exam Questions）**  
"What is the last octet of a /28 mask in binary?" → "11110000, because four host bits remain, and 11110000 equals 240."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

- IPv4 = **32 bit = 4 octet**；每 octet **128 64 32 16 8 4 2 1**
- Mask：**1 = network，0 = host**；prefix = 1 嘅數目
- `/28` → `11110000` → **240**；`/27` → `11100000` → **224**
- AND 完 host 位全 0 = Network；全 1 = Broadcast；中間先可以派
- 減 2 = 減走 Network 同 Broadcast
- 下一頁四步計法：`ITE3102_EA_SkillTest_003_SubnettingFourSteps_StudyGuide.md`
