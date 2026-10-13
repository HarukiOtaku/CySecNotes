# ITE3102 EA Skill Test 005: 計時練習

> **系列**：EA Skill Test 準備（做呢頁之前先完成 002–004）
> **計時**：每份練習 A／B／C 嘅紙筆部分限 **15 分鐘**；練習 D 限 **5 分鐘**
> **規則**：先自己做，做完先揭 §6。唔好用計算機，只用 `256 − mask octet`。
> **數字**：以下全部係本系列自擬練習，用來練同一套技能，唔係任何一份課堂派發卷嘅原文。

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

限時先暴露兩種錯：binary／decimal 對唔上，同埋「Subnet A 用邊一格」睇漏眼。本頁四份練習刻意換 mask、換網絡、換 first／last 規則，避免背死同一組 `.16／.17／.30`。

紙筆做完，用 §3 末嘅 Part 2 清單默 PT 步驟。有 Packet Tracer 就照清單做；冇 `.pkt` 就寫低 IP／pool／纜線當默寫。

## 🎯 2. 考試學習目標（Learning Objectives）

1. **限時寫出 mask binary 同 decimal** — Write the last mask octet in binary and dotted decimal under time pressure
2. **限時填 0／1／Last 三行表** — Complete subnet 0, subnet 1 and the last subnet
3. **跟非默認規則填表** — Handle last-as-gateway and subnet-#2 traps
4. **推 DHCP pool 同第 N 個 usable** — Compute a DHCP range and the Nth usable host on a /24
5. **默 PT 步驟** — Recite cable, interface, DNS, WRS Save and wireless DHCP in order

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

答題時用 003 四步；本節係空白卷。**答案只喺 §6。**

> **English Standard Definition:** Under test conditions, calculate block size first, list subnet boundaries, then assign usable addresses exactly as the wording states.

### 3.1 練習 A（最似常見卷面，mask 改 /27）— 15 分鐘

A small company uses the address block of **192.168.80.0/24**. It is decided to use a single subnet mask of **/27** to create equal size subnets.

1. The subnet mask for /27 in binary is: 11111111.11111111.11111111. ________
2. The subnet mask for /27 in decimal is: 255.255.255. ________
3. The maximum number of subnets created is: ________
4. The maximum number of usable host addresses for each subnet: ________
5. Fill in the subnet design:

| Subnet number | Subnet address | Usable IP address range | Broadcast address |
|---|---|---|---|
| 0 | 192.168.80.0 | 192.168.80.___ ~ 192.168.80.___ | 192.168.80.___ |
| 1 | 192.168.80.___ | 192.168.80.___ ~ 192.168.80.___ | 192.168.80.___ |
| Last | 192.168.80.___ | 192.168.80.___ ~ 192.168.80.___ | 192.168.80.255 |

Subnet A (use **subnet #1**)

- Assign the **first** usable IP as the default gateway.
- Set the laser printer to use the **last** usable IP.
- Set the server to use the **second** usable IP.

Subnet B (use the **last** subnet)

- Assign the **last** usable IP as the default gateway.
- Assign the **first** usable IP as the WRS Internet IP address.

Addressing Table

| Device | Interface | IP Address | Default Gateway |
|---|---|---|---|
| Laser | NIC |  |  |
| Server | NIC |  |  |
| WRS Internet | NIC |  |  |

紙筆版 Part 2：Office LAN = **172.16.90.0/24**。WRS LAN Router IP = **172.16.90.1/24**。DNS = Server IP。DHCP 由 **.40** 開始，最多 **80** 個 user。PC 用 Office 網第 **10** 個 usable（static）。Laptop 連 SSID **WRS-A**，DHCP。寫低：PC 四欄、DHCP pool 頭尾、三種連接用咩媒介、Server 開邊三個服務、A record 填咩。

### 3.2 練習 B（規則對調）— 15 分鐘

Address block **172.16.40.0/24**，單一 mask **/26**。

1. /26 binary last octet: ________
2. /26 decimal last octet: ________
3. Number of subnets: ________
4. Usable hosts per subnet: ________
5. Subnet table：填 0、1、Last（Last 嘅 broadcast 係 172.16.40.255）

Subnet A = **subnet #1**

- Gateway = **last** usable
- Laser = **first** usable
- Server = **third** usable

Subnet B = **last subnet**

- Gateway = **first** usable
- WRS Internet = **last** usable

Addressing Table：Laser／Server／WRS Internet

紙筆 Part 2：Office = **192.168.9.0/24**，WRS LAN Router IP = **192.168.9.1**。DHCP 由 **.60** 起，**50** 個 user。PC 用第 **8** 個 usable。SSID **OFFICE9**。Hostname **www.shop.local** 指向 Server。

### 3.3 練習 C（mask 常見、網絡唔同、A 用 #2）— 15 分鐘

Address block **10.10.20.0/24**，mask **/28**。問法同練習 A 第 1–4 題。第 5 題填 subnet 0、1、Last。

**Subnet A 用 subnet #2**（唔係 #1）

- Gateway = first usable
- Laser = last usable
- Server = second usable

Subnet B = last subnet

- Gateway = last usable
- WRS Internet = first usable

Addressing Table：Laser／Server／WRS Internet

### 3.4 練習 D 快測 — 5 分鐘

每題只寫 Network／First／Last／Broadcast，或者 Yes／No／一個 IP：

1. `192.168.10.70/27`
2. `150.150.150.32/28`
3. `201.3.4.200/29` 同 `201.3.4.215/29` 係咪同一 subnet？
4. `172.16.30.0/24` 第 10 個 usable host 係邊個？
5. DHCP start `.50`、100 users，網係 `172.16.30.0/24`，pool 由邊至邊？

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| EN | 繁中概念 | Exam Answer Phrase |
|---|---|---|
| Equal size subnets | 單一 mask 切出來一樣大 | "A single /27 mask creates equal-size subnets of 30 usable hosts." |
| First usable / last usable | Network+1／Broadcast−1 | "The first usable address is the default gateway; the last usable address is assigned to the printer." |
| Last subnet | 2^n−1 號 | "The last subnet of this /24 is the block that ends at broadcast .255." |
| Tenth usable | 由 first 起數 10 個 | "On a /24 LAN the tenth usable host is x.x.x.10." |
| DHCP pool | start + 連續 N 個 | "The pool starts at .50 and includes 100 addresses, so it ends at .149." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**Step 1 — 先理解觀念（Understand）**  
錯 binary 返 002；錯邊界返 003；錯 gateway 返 004。

**Step 2 — 背誦英文短語（Memorize）**  
first／last／second／third；subnet #1 versus last versus #2。

**Step 3 — 掌握計算／寫法（Calculate）**  
每份 15 分鐘；超時就停筆對 §6，標記邊一步慢。

**Step 4 — 能解答英文考題（Solve Exam Questions）**  
三份紙筆全對先當過關；有 PT 就用練習 A 嘅 Part 2 清單做一次 Check Results。

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）＋ 答案

入場仍只記：`128 192 224 240 248 252`、Block = 256−octet、First = N+1、Last = B−1。下面係練習答案。

### 練習 A 答案

- Binary: **11100000**
- Decimal: **224**
- Subnets: **8**
- Usable: **30**
- Block = 32

| # | Network | Usable | Broadcast |
|---|---|---|---|
| 0 | 192.168.80.0 | .1 ~ .30 | .31 |
| 1 | 192.168.80.32 | .33 ~ .62 | .63 |
| Last | 192.168.80.224 | .225 ~ .254 | .255 |

Laser **192.168.80.62** GW **192.168.80.33**  
Server **192.168.80.34** GW **192.168.80.33**  
WRS Internet **192.168.80.225** GW **192.168.80.254**

Part 2 紙筆：

- PC：`172.16.90.10`／`255.255.255.0`／GW `172.16.90.1`／DNS `192.168.80.34`
- DHCP pool：`172.16.90.40` ~ `172.16.90.119`（80 個）
- R1↔Switch、Switch↔Server：Straight-Through；Laptop↔WRS：無線
- Server：HTTP + HTTPS + DNS；hostname → `192.168.80.34`

### 練習 B 答案

- Binary: **11000000**
- Decimal: **192**
- Subnets: **4**
- Usable: **62**
- Block = 64

| # | Network | Usable | Broadcast |
|---|---|---|---|
| 0 | 172.16.40.0 | .1 ~ .62 | .63 |
| 1 | 172.16.40.64 | .65 ~ .126 | .127 |
| Last | 172.16.40.192 | .193 ~ .254 | .255 |

Laser **172.16.40.65** GW **172.16.40.126**  
Server **172.16.40.67** GW **172.16.40.126**  
WRS Internet **172.16.40.254** GW **172.16.40.193**

Part 2：PC **192.168.9.8**／255.255.255.0／GW **192.168.9.1**／DNS **172.16.40.67**；DHCP **192.168.9.60 ~ 192.168.9.109**；A record `www.shop.local` → `172.16.40.67`。

### 練習 C 答案

- Binary: **11110000**
- Decimal: **240**
- Subnets: **16**
- Usable: **14**

| # | Network | Usable | Broadcast |
|---|---|---|---|
| 0 | 10.10.20.0 | .1 ~ .14 | .15 |
| 1 | 10.10.20.16 | .17 ~ .30 | .31 |
| 2（A 用呢行） | 10.10.20.32 | .33 ~ .46 | .47 |
| Last | 10.10.20.240 | .241 ~ .254 | .255 |

Laser **10.10.20.46** GW **10.10.20.33**  
Server **10.10.20.34** GW **10.10.20.33**  
WRS Internet **10.10.20.241** GW **10.10.20.254**

### 練習 D 答案

1. Network **192.168.10.64**，First **.65**，Last **.94**，Broadcast **.95**
2. Network **150.150.150.32**，First **.33**，Last **.46**，Broadcast **.47**
3. **唔同 subnet**（.200 對 .200；.215 對 .208）
4. **172.16.30.10**
5. **172.16.30.50 ~ 172.16.30.149**

系列返去：`ITE3102_EA_SkillTest_001_Overview.md`
