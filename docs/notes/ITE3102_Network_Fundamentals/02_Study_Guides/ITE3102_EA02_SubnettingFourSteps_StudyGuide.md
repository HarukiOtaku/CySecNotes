# ITE3102 EA02: Subnetting 四步計法

> **系列**：EA Skill Test 準備（上一頁概念 EA01；本頁專攻限時計數）
> **理論來源**：`ITE3102_L7_IPv4Addressing_StudyGuide.md` §3.5、`ITE3102_T7_IPv4Addressing_StudyGuide.md`
> **下一頁**：`ITE3102_EA03_AddressingTableAndPT_StudyGuide.md`

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

Skill Test 紙筆幾乎一定係：**一個 /24 地址塊 + 單一更長 mask**，要你切出相等大小嘅 subnet（fixed-length，呢一題通常唔使 VLSM）。

四步做完，subnet 0、subnet 1、last subnet 三行就出得嚟。考場 15 分鐘，唔好由 binary 逐粒乘——用 **Block Size** 跳。

實務情境：公司有 `192.168.80.0/24`（256 個地址），決定全部用 `/27`。你要即刻講得出：有幾多條網、每條幾多部機、第 1 條同最後一條嘅頭尾。

## 🎯 2. 考試學習目標（Learning Objectives）

1. **由 /24 計借咗幾多 bit** — State n = new prefix minus 24
2. **寫出 2^n 同 2^h−2** — Calculate number of subnets and usable hosts
3. **用 256−octet 求 block size** — Compute the increment between subnet IDs
4. **列出 subnet 0、1、Last** — Fill network, usable range and broadcast
5. **由一個 IP 倒推佢屬邊個 subnet** — Floor the last octet to the nearest block boundary
6. **拒絕把 network／broadcast 填入裝置** — Never assign all-zeros or all-ones host bits to a device

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 借 bit 係咩意思

原本 `/24` 即前 24 粒係 network、後 8 粒係 host。而家改用 `/28`，即再向 host 借 **4 粒** 去做「subnet 編號」。

- 借咗嘅 n 粒 → 用來分開唔同 subnet → 數目 = **`2^n`**
- 剩低嘅 h 粒 → 每個 subnet 入面嘅主機位 → 可用 = **`2^h − 2`**

`/24 → /28`：n = 4，h = 4 → 16 個 subnet，每個 14 部機。
`/24 → /27`：n = 3，h = 5 → 8 個 subnet，每個 30 部機。
`/24 → /26`：n = 2，h = 6 → 4 個 subnet，每個 62 部機。

> **English Standard Definition:** Borrowing n bits creates 2^n subnets, and each subnet has 2^h minus 2 usable hosts, where h is the number of host bits that remain.

### 3.2 萬能四步（任何紙筆題）

1. **睇 prefix → 寫 mask、binary、block、subnet 數、host 數**
   - Block Size = **`256 − mask 最後非 0 octet`**
   - `/28` → 240 → block **16**
   - `/27` → 224 → block **32**
   - `/26` → 192 → block **64**
2. **由 .0 開始，每次 + Block，列出邊界**
   - `/28`：`.0 .16 .32 .48 … .240`
   - `/27`：`.0 .32 .64 .96 … .224`
3. **每一格填四個數**
   - Network = 該格開頭
   - Broadcast = 下一格開頭 − 1（亦即 Network + Block − 1）
   - First usable = Network + 1
   - Last usable = Broadcast − 1
4. **核對**
   - 可用個數係咪 2^h−2
   - Last subnet 嘅 broadcast 喺 /24 底下應該係 **.255**
   - Device IP 唔可以係 Network 或 Broadcast

> **English Standard Definition:** The block size is 256 minus the last non-zero octet of the subnet mask. The broadcast address is the network address plus the block size minus 1. Hosts range from network plus 1 to broadcast minus 1.

### 3.3 /24 切出去嘅對照表（默呢張）

| Prefix | Mask | 最後 octet binary | Block | Subnet 數 | 可用 Host |
|---|---|---|---|---|---|
| /25 | 255.255.255.128 | 10000000 | 128 | 2 | 126 |
| /26 | 255.255.255.192 | 11000000 | 64 | 4 | 62 |
| /27 | 255.255.255.224 | 11100000 | 32 | 8 | 30 |
| /28 | 255.255.255.240 | 11110000 | 16 | 16 | 14 |
| /29 | 255.255.255.248 | 11111000 | 8 | 32 | 6 |
| /30 | 255.255.255.252 | 11111100 | 4 | 64 | 2 |

`/30` 得 2 個 usable，課堂話專用 **point-to-point WAN link**。Skill Test 紙筆較常 `/26` `/27` `/28`。

### 3.4 完整示範：192.168.80.0/24 切 /27

- n = 3 → 8 個 subnet；h = 5 → 30 部機
- binary 最後 octet = `11100000`；decimal = 224；block = 32

| # | Network | Usable | Broadcast |
|---|---|---|---|
| 0 | 192.168.80.0 | .1 ~ .30 | .31 |
| 1 | 192.168.80.32 | .33 ~ .62 | .63 |
| 2 | 192.168.80.64 | .65 ~ .94 | .95 |
| Last | 192.168.80.224 | .225 ~ .254 | .255 |

題目通常只要求填 **0、1、Last**。Last 嘅編號 = `2^n − 1`（由 0 起數），network = `(2^n − 1) × block`。`/27`：7 × 32 = 224。

> **English Standard Definition:** Subnet 0 starts at the original network address. Each next subnet ID increases by the block size. The last subnet of a /24 ends at broadcast 255.

### 3.5 另一個示範：10.10.20.0/24 切 /28（mask 同常見練習一樣，網絡唔同）

- n = 4 → 16 個 subnet；h = 4 → 14 部機
- binary `11110000`；decimal 240；block 16

| # | Network | Usable | Broadcast |
|---|---|---|---|
| 0 | 10.10.20.0 | .1 ~ .14 | .15 |
| 1 | 10.10.20.16 | .17 ~ .30 | .31 |
| 2 | 10.10.20.32 | .33 ~ .46 | .47 |
| Last | 10.10.20.240 | .241 ~ .254 | .255 |

題目若話 **Subnet A 用 subnet #2**，就係 `.32` 嗰行，**唔係** 惯性填 #1。

### 3.6 畀一個 IP，點知佢屬邊格

方法：最後 octet **向下取整到 block 倍數**。

例：`192.168.10.70/27`，block 32。70 入面最大嘅 32 倍數係 64 → Network **`.64`**，Broadcast `.95`，usable `.65–.94`。

課堂原題風格：`150.150.150.32/28` → 32 本身已經係邊界 → Network `.32`，Broadcast `.47`，usable `.33–.46`。

兩個 IP 係咪同一 subnet：各自求 Network，相同先係。`201.3.4.200/29` 同 `201.3.4.215/29`：block 8 → `.200` 對 `.200`、`.215` 對 `.208` → **唔同 subnet**。

> **English Standard Definition:** Two hosts are on the same subnet if ANDing each address with the subnet mask produces the same network address.

### 3.7 題目用語對應邊個數

| 題目寫 | 你填 |
|---|---|
| subnet mask in binary（最後 octet） | 例如 /28 → `11110000` |
| subnet mask in decimal | 例如 /28 → `240`（前面三個 255 已經印喺卷上） |
| maximum number of subnets | `2^n`（n = 新 prefix − 原 prefix） |
| maximum number of usable host addresses | `2^h − 2` |
| Subnet address | Network ID |
| Usable IP address range | First ~ Last |
| Broadcast address | Network + Block − 1 |

「maximum number of subnets created in a /28 network」若上文係 `/24` 再用 `/28` 切，答 **16**，唔好答 1。

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| EN | 繁中概念 | Exam Answer Phrase |
|---|---|---|
| Borrow bits | 向 host 借 n 粒做 subnet ID | "Borrowing 4 bits from a /24 creates 16 subnets of 14 hosts with a /28 mask." |
| Block size | 256 − mask octet | "The block size is 256 minus 240, which is 16." |
| Subnet ID / network address | 該格開頭 | "The subnet address is the first address of the block; it has all host bits set to 0." |
| Increment | 每條網跳幾多 | "Subnet IDs increment by the block size: 0, 16, 32, …, 240 for /28." |
| Last subnet | 2^n−1 號 | "The last /28 subnet of a /24 is x.x.x.240/28 with broadcast x.x.x.255." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**Step 1 — 先理解觀念（Understand）**  
返 EA01 確認「減 2」同 AND。

**Step 2 — 背誦英文短語（Memorize）**  
Block size 句；2^n；2^h minus 2。

**Step 3 — 掌握計算／寫法（Calculate）**  
白紙默 `/24→/26`、`/27`、`/28` 各一張 0／1／Last 表。

**Step 4 — 能解答英文考題（Solve Exam Questions）**  
EA04 計時；錯格只准改嗰一格，重做一次成張表。

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

1. n = 新 prefix − 24；h = 32 − 新 prefix
2. Subnet 數 `2^n`；Host `2^h − 2`；Block `256 − octet`
3. 由 .0 跳 Block；Broadcast = 下一格 − 1
4. First = +1；Last = Broadcast − 1
5. Last 嘅 broadcast 喺 /24 底下 = `.255`
6. 填表見 `ITE3102_EA03_AddressingTableAndPT_StudyGuide.md`
