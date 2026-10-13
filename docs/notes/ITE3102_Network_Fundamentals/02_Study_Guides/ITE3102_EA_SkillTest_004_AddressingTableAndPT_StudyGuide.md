# ITE3102 EA Skill Test 004: Addressing Table 同 Packet Tracer 步驟

> **系列**：EA Skill Test 準備
> **理論來源**：`ITE3102_L7_IPv4Addressing_StudyGuide.md` §3.9、`ITE3102_PT11_Subnetting_CodeGuide.md`
> **PT 來源**：`ITE3102_PT4_LAN_Setup_CodeGuide.md`、`ITE3102_PT10_DNS_DHCP_CodeGuide.md`、`ITE3102_PT6_RouterToLAN_CodeGuide.md`
> **下一頁**：`ITE3102_EA_SkillTest_005_TimedPractice_StudyGuide.md`

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

紙筆最後一格 **Addressing Table** 同 Packet Tracer 係同一組數字。Table 填錯，PT 入面 ping 會全 timeout，Check Results 亦會紅。

本頁專攻兩件事：點樣把「first usable／last usable／second usable」譯成 IP；以及 PT 最常丟分嘅順序（纜線、介面 On、Server 服務、WRS Save、無線 DHCP）。

實務情境：Subnet A 係辦公室有線網（printer + server），Subnet B 係 WRS 嘅 Internet 側；Office LAN 另外用一條 `/24` 做 DHCP。三個網嘅 gateway **唔可以抄錯行**。

## 🎯 2. 考試學習目標（Learning Objectives）

1. **按英文規則揀 first／second／third／last usable** — Map ordinal words onto host addresses in order
2. **保持同一 subnet 嘅 gateway 一致** — Give every device on a subnet the same default gateway
3. **揀對銅線類型** — Use straight-through between unlike devices
4. **啟動 router 介面** — Set the interface On after addressing it
5. **設定 Server 嘅 HTTP／HTTPS／DNS** — Map a hostname to the server IPv4 address
6. **設定 WRS DHCP 並 Save** — Enable the pool, set LAN router IP, save, then let wireless clients obtain leases

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 Usable 清單點數

對一個已計好嘅 subnet，把 usable host **由細到大排**：

- **first usable** = Network + 1（第 1 個）
- **second usable** = Network + 2
- **third usable** = Network + 3
- **last usable** = Broadcast − 1

例：subnet `192.168.80.32/27` → first `.33`、second `.34`、third `.35`、last `.62`。

題目分開兩段：

- **Subnet A（use subnet #1）** → 用表上 **#1** 嗰行，唔係 #0，亦唔係 last（除非題目改寫）
- **Subnet B（use the last subnet）** → 用最後一行

如果寫 **use subnet #2**，就係 block×2 嗰行。唔好背死「A 永遠係 #1」。

> **English Standard Definition:** The first usable host address is the network address plus 1. The last usable host address is the broadcast address minus 1. Ordinal words such as second and third count along that usable list.

### 3.2 Addressing Table 鐵律

| 欄 | 填咩 |
|---|---|
| Device | Laser／Server／WRS Internet… 跟卷 |
| Interface | 終端多數 `NIC`；router 先係 G0/0 等 |
| IP Address | 題目指定嗰個 usable |
| Default Gateway | **該裝置所屬 subnet 嘅 gateway**，唔係另一條網嘅 gateway |

鐵律：

1. Network address 同 Broadcast **永遠唔入 IP Address 欄**
2. 同一 subnet 嘅裝置，Default Gateway **相同**
3. WRS **Internet** 側用 Subnet B 嘅 IP／mask／gateway；WRS **LAN** 側用題目另外俾嘅 Router IP（多數另一條 `/24`）
4. Server 做 DNS 時，A record 指向 **Server 自己嗰個 IP**，唔係 gateway

課堂 PT11 另有一套「R1 攞 first、PC 攞 last、switch 攞 second」——**以當日卷面文字為準**，卷面同 PT11 示範衝突就跟卷面。

> **English Standard Definition:** Hosts on the same subnet share the same subnet mask and the same default gateway. The default gateway is the router interface address of that subnet.

### 3.3 紙筆 → PT 對照（同一組數）

假設 Subnet A = `/27` 嘅 #1，規則係 first = gateway、last = laser、second = server：

- Laser IP = last usable；GW = first usable；mask = 該 prefix
- Server IP = second usable；GW = 同一個 first usable
- WRS Internet IP = Subnet B 指定嗰個 usable；GW = Subnet B 嘅 gateway；mask 仍然係紙筆嗰個 prefix（唔好誤用 `/24`）

Office LAN 若係 `172.16.90.0/24`、Router IP `172.16.90.1`：

- `/24` first usable = `.1`（好多時就係 WRS LAN IP）
- **第 10 個 usable** = `.10`（由 `.1` 數 10 個，唔係 `.9`）
- PC mask = `255.255.255.0`；GW = `172.16.90.1`；DNS = Server 嗰個 IP

DHCP「由 `.40` 開始、80 個 user」→ pool **`.40` 至 `.119`**（頭尾都計）。
「由 `.50` 開始、100 個 user」→ **`.50` 至 `.149`**。

> **English Standard Definition:** End user clients most use DHCP to reduce addressing errors, while servers and printers should have a predictable static IPv4 address.

### 3.4 纜線

課堂口訣：**Unlike devices → straight-through；Like devices → crossover；Console → rollover**。

Skill Test 圖上常見：

- Router ↔ Switch、Switch ↔ PC／Server／Printer → **Copper Straight-Through**
- Laptop 連 WRS 用 **無線**（SSID），唔使銅線
- 現代 switch 有 Auto-MDIX，但 **Check Results 仍然可能指定 Straight-Through**，跟卷面／Assessment Items

> **English Standard Definition:** Use a straight-through cable between unlike devices and a crossover cable between like devices.

### 3.5 Router 介面

PT 入面 Config 把 port **On**，等如 IOS 嘅 `no shutdown`。只填 IP 唔 On，介面維持 `administratively down`，ping 全死。

IOS 形狀（有 CLI 先用）：

```text
enable
configure terminal
interface gigabitethernet 0/0
ip address 192.168.80.33 255.255.255.224
no shutdown
end
copy running-config startup-config
```

GUI 卷就喺 Config 填 IPv4 Address、Subnet Mask，剔 On。

> **English Standard Definition:** After assigning an IPv4 address and subnet mask, the router interface must be enabled; otherwise it remains administratively down.

### 3.6 Server 服務同 DNS

位置：Server → **Services** tab。

- HTTP = On、HTTPS = On（兩個都要）
- DNS = On；加 **A record**：hostname（例如 `www.nf.com`）→ **Server 自己嘅 IPv4**
- 用 hostname 開到網、用 IP 開到但 hostname 開唔到 = DNS 記錯或 client DNS 欄填錯

> **English Standard Definition:** DNS maps a domain name to an IPv4 address using an A record. HTTP uses TCP port 80 and HTTPS uses TCP port 443.

### 3.7 WRS（家用無線路由器）

WRS 用 **GUI tab**，唔係 Cisco IOS。

Internet 側（WAN／Internet NIC）：

- IP Configuration = **Static**
- IP／mask／default gateway／DNS 用紙筆 Subnet B + Server IP

LAN 側：

- Router IP = 題目指定（例如 `172.16.90.1`）
- mask 跟該 LAN（多數 `/24` → `255.255.255.0`）
- **Enable DHCP Server**
- Start IP 同 Maximum users 跟卷
- Static DNS 1 = Server IP（client 先識得解 `www.nf.com`）
- 最後一定 **Save Settings**

Laptop：

- Config → Wireless0 → Port Status **On**（兩個無線介面唔好同時開）
- Desktop → PC Wireless 連指定 **SSID**
- IP Configuration 揀 **DHCP**
- 攞唔到 IP：返 WRS 查 Enable／Save，唔好先怪 laptop

> **English Standard Definition:** A wireless router can assign IP address, subnet mask, default gateway and DNS dynamically using DHCP. Settings must be saved before clients can obtain a lease.

### 3.8 驗證順序

1. Check Results → Assessment Items（紅項逐條對）
2. 有線 PC：`ipconfig` 對 Table
3. `ping` gateway → 同網 server → 跨網
4. Laptop 瀏覽器開 hostname
5. 第一粒 ping 丟失係 ARP，屬正常（課堂：first ping lost）

常見紅項：mask 仍用 `255.255.255.0` 但紙筆已經係 `/27`；用咗 `.31`／`.63` 呢啲 broadcast；WRS 冇 Save；Wireless0 未 On；DNS A record 指向 gateway 而唔係 server。

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| EN | 繁中概念 | Exam Answer Phrase |
|---|---|---|
| Addressing table | 裝置 ↔ IP ↔ gateway | "Each device is given a usable host address and the default gateway of its own subnet." |
| Straight-through | 唔同類裝置 | "Use a straight-through cable between unlike devices." |
| no shutdown | 啟動介面 | "The interface is enabled with no shutdown so that it is no longer administratively down." |
| A record | hostname → IPv4 | "The DNS A record maps the hostname to the server IPv4 address." |
| DHCP | 動態派 IP／mask／GW／DNS | "DHCP dynamically assigns IP, subnet mask, default gateway and DNS at start-up." |
| SSID | 無線網絡名 | "The laptop enables its wireless interface and connects to the configured SSID to obtain DHCP." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**Step 1 — 先理解觀念（Understand）**  
拿 003 一張表，用螢光筆標 first／second／last。

**Step 2 — 背誦英文短語（Memorize）**  
Unlike → straight-through；Save Settings；A record maps hostname to server IP。

**Step 3 — 掌握計算／寫法（Calculate）**  
白紙默一張 Addressing Table，三部裝置。

**Step 4 — 能解答英文考題（Solve Exam Questions）**  
005 紙筆版 Part 2；有 PT 就跟同一清單做。

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

- first = N+1；second = N+2；last = B−1
- 同網 gateway 相同；唔好填 network／broadcast
- 纜線：Straight-Through；介面 On
- Server：HTTP + HTTPS + DNS；A record → **自己 IP**
- WRS：WAN static、LAN Router IP、DHCP、**Save**
- Laptop：Wireless On + SSID + DHCP
- PC 第 N 個 usable：由 `.1` 起數 N 個（/24 第 10 個 = `.10`）
- 計時卷：`ITE3102_EA_SkillTest_005_TimedPractice_StudyGuide.md`
