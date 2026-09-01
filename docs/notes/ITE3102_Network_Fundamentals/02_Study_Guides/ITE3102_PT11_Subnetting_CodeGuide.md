# ITE3102 PT11.7.5 CodeGuide — Subnetting Scenario（子網路分割實務測驗主戰文件）

> **Lab Identity:** Packet Tracer — Subnetting Scenario (Version 2)（對應 Cisco NetAcad ITN 標準活動 11.7.5）
> 本文件唯一目的：令學生只靠呢份文件就喺 Packet Tracer 完成實作，並答啱 Practical Test 所有問題。

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握的實務技能（Practical Skills）

| 技能 | 實務上做到啲咩 |
|---|---|
| Subnetting 計算 | 由 `192.168.100.0/24` 計出需要幾多 subnet、borrow 幾多 bits、每 subnet 幾多 usable hosts |
| Binary 轉換 | 寫出 subnet 嘅 binary 值、計出新 subnet mask（binary + decimal） |
| 填表能力 | 填 Subnet Table（network / first & last usable / broadcast）同 Addressing Table |
| Cisco IOS 設定 | 用 CLI 設定 R1、R2 嘅 LAN（GigabitEthernet）同 WAN（Serial）介面 IP |
| 終端機設定 | 設定 PC1–PC4 嘅 IPv4 地址 + default gateway |
| 連通性驗證 | 用 `ping` 由 PC1、PC4 測試全部 Addressing Table 內嘅地址 |

> **Core skills:** Subnetting a `/24` network, converting binary/decimal, completing the Subnet and Addressing tables, configuring router and PC interfaces, and verifying end-to-end connectivity with `ping`.

### 所需設備 / 軟體（Equipment & Software）

- **Cisco Packet Tracer**（本 Lab 用活動檔 `.pka`，Version 2）
- 網絡設備：
  - 2 部 Router（**R1**、**R2**）— 例如 Cisco 1941；每個有 **G0/0**、**G0/1** 同 **S0/0/0**（Serial 要加裝 WIC module 先有）
  - 4 部 Switch（**S1**–**S4**）— 例如 Cisco 2960，用 **VLAN 1** 介面設定管理 IP
  - 4 部 PC（**PC1**–**PC4**）— 用 NIC 介面
- **已知預設**：所有 switch 嘅 IP 已經設定好；R1 ↔ R2 之間 **RIP dynamic routing 已經設定**；你唔需要（亦唔應該）改動 routing

> **Environment:** Cisco Packet Tracer; the topology uses two routers (R1, R2), four switches (S1–S4), and four PCs (PC1–PC4). Switch IP addressing and RIP routing are pre-configured — you only configure the router interfaces and the PCs.

### 網絡拓撲 + 場景（必背）

網絡由 `192.168.100.0/24` 一個大 network 分割出嚟：

- **4 個 LAN**：每個 LAN 最少要有 **25 個地址**（畀 end devices + switch + router 用）
- **1 條 WAN link**：R1 同 R2 之間嘅 Serial 連線，兩端各要一個 IP 地址
- 分配規則：**Subnet 0 → R1 G0/0**、**Subnet 1 → R1 G0/1**、**Subnet 2 → R2 G0/0**、**Subnet 3 → R2 G0/1**、**Subnet 4 → WAN link（R1 ↔ R2）**

> **Scenario:** Subnet the network address 192.168.100.0/24. Each LAN requires at least 25 addresses for end devices, the switch and the router; the R1-to-R2 link requires one address for each end.

---

## 🛠️ 解題步驟拆解 (Walkthrough)

### Part 1: Design an IP Addressing Scheme（設計 IP 編址方案）

> **Original instruction:** "Subnet the 192.168.100.0/24 network into the appropriate number of subnets."

#### 步驟 1 ➔ 決定需要幾多個 subnet

睇 topology 數一數有幾多個「要獨立成網」嘅 segment：

1 ➔ 數 LAN：R1 有兩個 LAN（G0/0、G0/1），R2 有兩個 LAN（G0/0、G0/1），共 **4 個**
2 ➔ 數 WAN：R1 同 R2 之間嘅 Serial link 要一條獨立 subnet，共 **1 個**
3 ➔ 總數：4 + 1 = **5 個 subnet**

> **Answer:** 5 subnets are needed — four LANs plus one WAN link between R1 and R2.

#### 步驟 2 ➔ 決定要 borrow 幾多 bits

要用最少嘅 bits 滿足「至少 5 個 subnet」：

1 ➔ 公式：`2^n ≥ 5`（n = 由 host 部分借出嘅 bits 數目）
2 ➔ 試算：`2^2 = 4` 唔夠；`2^3 = 8` 夠
3 ➔ 所以 borrow **3 bits**

> **Answer:** Borrow 3 host bits, because 2^2 = 4 < 5 but 2^3 = 8 ≥ 5.

#### 步驟 3 ➔ 計出 subnet 數目同每 subnet 嘅 usable hosts

1 ➔ 借 3 bits → 產生 `2^3 = 8` 個 subnet
2 ➔ 剩餘 host bits：8 − 3 = **5 bits**
3 ➔ Usable hosts：`2^5 − 2 = 30` ≥ 25 ✓（如果答案少過 25，就代表 borrow 咗太多 bits，要減少）

> **Answer:** This creates 8 subnets, each with 30 usable host addresses (2^5 − 2 = 30). If your answer is less than 25 hosts, you borrowed too many bits.

#### 步驟 4 ➔ 寫出首五個 subnet 嘅 binary 值

最後一個 octet（Last Octet）入面，**Bit 7、Bit 6、Bit 5** 係 subnet bits（由 000 開始遞增），**Bit 4–Bit 0** 係 host bits（network address 時全部係 0）：

| Subnet | Network Address | Last Octet Binary（Bit 7 6 5 4 3 2 1 0） |
|---|---|---|
| 0 | 192.168.100.**0** | 0 0 0 0 0 0 0 0 |
| 1 | 192.168.100.**32** | 0 0 1 0 0 0 0 0 |
| 2 | 192.168.100.**64** | 0 1 0 0 0 0 0 0 |
| 3 | 192.168.100.**96** | 0 1 1 0 0 0 0 0 |
| 4 | 192.168.100.**128** | 1 0 0 0 0 0 0 0 |

1 ➔ Subnet bits 順序：`000` → `001` → `010` → `011` → `100`（每格加 1）
2 ➔ Host bits 全部寫 0（呢啲係 network address，唔可以分畀裝置）
3 ➔ 每個 subnet 嘅「間距」（increment）= `2^5 = 32`（0 → 32 → 64 → 96 → 128…）

> **Answer:** The first five subnet network addresses are 192.168.100.0 / .32 / .64 / .96 / .128. The subnet bits count up from 000, and the subnet increment is 32.

#### 步驟 5 ➔ 計出新 subnet mask（binary + decimal）

1 ➔ 原本 `/24` mask：`11111111.11111111.11111111.00000000`
2 ➔ 借 3 bits 之後：`11111111.11111111.11111111.11100000`
3 ➔ 轉十進制：`255.255.255.224`，即 **/27**（前三個 octet 都係 255，第四個 = 128+64+32 = 224）

> **Answer:** The new subnet mask is 255.255.255.224 (/27) — binary 11111111.11111111.11111111.11100000.

#### 步驟 6 ➔ 填 Subnet Table（列出全部可用 subnet）

| Subnet | Subnet Address | First Usable Host | Last Usable Host | Broadcast Address |
|---|---|---|---|---|
| 0 | 192.168.100.0 | 192.168.100.1 | 192.168.100.30 | 192.168.100.31 |
| 1 | 192.168.100.32 | 192.168.100.33 | 192.168.100.62 | 192.168.100.63 |
| 2 | 192.168.100.64 | 192.168.100.65 | 192.168.100.94 | 192.168.100.95 |
| 3 | 192.168.100.96 | 192.168.100.97 | 192.168.100.126 | 192.168.100.127 |
| 4 | 192.168.100.128 | 192.168.100.129 | 192.168.100.158 | 192.168.100.159 |
| 5 | 192.168.100.160 | 192.168.100.161 | 192.168.100.190 | 192.168.100.191 |
| 6 | 192.168.100.192 | 192.168.100.193 | 192.168.100.222 | 192.168.100.223 |
| 7 | 192.168.100.224 | 192.168.100.225 | 192.168.100.254 | 192.168.100.255 |

1 ➔ **First usable** = network address + 1；**Last usable** = broadcast − 1
2 ➔ **Broadcast** = 下一個 subnet 嘅 network address − 1（例如 Subnet 0 嘅 broadcast = 32 − 1 = .31）
3 ➔ 總共得 **8 個 subnet（0–7）**；教材表格有多餘 row（8、9、10），「You may not need to use all rows」就係指呢啲唔使填

> **Answer:** Fill the table for all 8 subnets. The broadcast address is always the next subnet's network address minus one; only 8 rows are used.

#### 步驟 7 ➔ 分配 subnet 畀 topology（Assign the subnets）

1 ➔ **Subnet 0** → R1 嘅 **G0/0** LAN（連住 S1 / PC1）
2 ➔ **Subnet 1** → R1 嘅 **G0/1** LAN（連住 S2 / PC2）
3 ➔ **Subnet 2** → R2 嘅 **G0/0** LAN（連住 S3 / PC3）
4 ➔ **Subnet 3** → R2 嘅 **G0/1** LAN（連住 S4 / PC4）
5 ➔ **Subnet 4** → **WAN link**（R1 S0/0/0 ↔ R2 S0/0/0）

#### 步驟 8 ➔ 填 Addressing Table（Document the addressing scheme）

教材規則（必背）：
- **R1**：每個 subnet（兩個 LAN + WAN）都攞 **第一個 usable IP**
- **R2**：LAN 攞 **第一個 usable IP**；**WAN 攞最後一個 usable IP**
- **Switch**：所屬 subnet 嘅 **第二個 usable IP**
- **PC**：所屬 subnet 嘅 **最後一個 usable IP**

| Device | Interface | IP Address | Subnet Mask | Default Gateway |
|---|---|---|---|---|
| R1 | G0/0 | 192.168.100.1 | 255.255.255.224 | N/A |
| R1 | G0/1 | 192.168.100.33 | 255.255.255.224 | N/A |
| R1 | S0/0/0 | 192.168.100.129 | 255.255.255.224 | N/A |
| R2 | G0/0 | 192.168.100.65 | 255.255.255.224 | N/A |
| R2 | G0/1 | 192.168.100.97 | 255.255.255.224 | N/A |
| R2 | S0/0/0 | 192.168.100.158 | 255.255.255.224 | N/A |
| S1 | VLAN 1 | 192.168.100.2 | 255.255.255.224 | 192.168.100.1 |
| S2 | VLAN 1 | 192.168.100.34 | 255.255.255.224 | 192.168.100.33 |
| S3 | VLAN 1 | 192.168.100.66 | 255.255.255.224 | 192.168.100.65 |
| S4 | VLAN 1 | 192.168.100.98 | 255.255.255.224 | 192.168.100.97 |
| PC1 | NIC | 192.168.100.30 | 255.255.255.224 | 192.168.100.1 |
| PC2 | NIC | 192.168.100.62 | 255.255.255.224 | 192.168.100.33 |
| PC3 | NIC | 192.168.100.94 | 255.255.255.224 | 192.168.100.65 |
| PC4 | NIC | 192.168.100.126 | 255.255.255.224 | 192.168.100.97 |

> **Answer:** Assign the first usable address in each subnet to R1; R2 takes the last usable address on the WAN link. Switches take the second usable address; PCs take the last usable address in their subnet. The default gateway is always the router interface IP of that subnet.

### Part 2: Assign IP Addresses to Network Devices and Verify Connectivity（分配 IP 並驗證連通性）

> **Original instruction:** "IP addressing is already configured for all switches on this network… RIP dynamic routing is already configured between R1 and R2."

#### 步驟 1 ➔ 設定 R1 嘅介面（Configure interfaces of R1）

1 ➔ 開 R1 CLI，打 `enable` → `configure terminal`
2 ➔ 設定 **G0/0**（Subnet 0）：`interface gigabitethernet 0/0` → `ip address 192.168.100.1 255.255.255.224` → `no shutdown`
3 ➔ 設定 **G0/1**（Subnet 1）：`interface gigabitethernet 0/1` → `ip address 192.168.100.33 255.255.255.224` → `no shutdown`
4 ➔ 設定 **S0/0/0**（WAN，Subnet 4）：`interface serial 0/0/0` → `ip address 192.168.100.129 255.255.255.224` → `no shutdown`（如果係 DCE 端要加 `clock rate`）
5 ➔ 打 `end` → `copy running-config startup-config` 儲存

#### 步驟 2 ➔ 設定 R2 嘅介面（Configure interfaces of R2）

1 ➔ **G0/0**（Subnet 2）：`ip address 192.168.100.65 255.255.255.224` → `no shutdown`
2 ➔ **G0/1**（Subnet 3）：`ip address 192.168.100.97 255.255.255.224` → `no shutdown`
3 ➔ **S0/0/0**（WAN）：`ip address 192.168.100.158 255.255.255.224` → `no shutdown`（**記住 WAN 用最後一個 usable IP**）
4 ➔ `end` → 儲存設定

> **Key point:** Every interface must be brought up with `no shutdown` — Cisco IOS interfaces are administratively down by default.

#### 步驟 3 ➔ 設定 PC1 至 PC4（Configure PC1 to PC4）

每個 PC：click PC → **Desktop** → **IP Configuration** → 揀 **Static**，填入下表：

1 ➔ **PC1**：IP `192.168.100.30`，Subnet Mask `255.255.255.224`，Default Gateway `192.168.100.1`
2 ➔ **PC2**：IP `192.168.100.62`，Default Gateway `192.168.100.33`
3 ➔ **PC3**：IP `192.168.100.94`，Default Gateway `192.168.100.65`
4 ➔ **PC4**：IP `192.168.100.126`，Default Gateway `192.168.100.97`

> **Key point:** The PC must use the last usable IP of its subnet, and its default gateway must match the router interface IP of that subnet.

#### 步驟 4 ➔ 驗證連通性（Verify connectivity）

開 PC1 同 PC4 嘅 **Command Prompt**，`ping` 晒 Addressing Table 內每一個 IP：

1 ➔ **第一層**：ping 自己嘅 default gateway（PC1 → `ping 192.168.100.1`），驗證同 subnet 內通唔通
2 ➔ **第二層**：ping 其他 subnet 嘅 host（例如 PC1 → `ping 192.168.100.126` 即 PC4），驗證跨 subnet 經 router 通唔通
3 ➔ **第三層**：ping 埋 WAN 對端（例如 `ping 192.168.100.158`）、其他 switch 同 router 介面；**全部都要有 reply**

> **Key point:** From PC1 and PC4 you should be able to ping every IP address listed in the Addressing Table. A successful reply (e.g. `Reply from ...: bytes=32 time<1ms TTL=...`) confirms the configuration.

> **✅ 答案速查（考試前 30 秒背一次）**：5 subnets → borrow 3 bits → 8 subnets × 30 hosts → mask 255.255.255.224 (/27) → increment 32 → broadcast = next network − 1 → R1 攞第一個、WAN 對端 R2 攞最後一個、switch 第二個、PC 最後一個。

---

## 💻 關鍵 CLI 指令庫

### Router（Cisco IOS）— 設定 R1 / R2

```text
enable                                              ! 進入 privileged EXEC mode（特權模式）
configure terminal                                  ! 進入 global configuration mode（全域設定模式）
hostname R1                                         ! （可選）設定 router 主機名稱
interface gigabitethernet 0/0                       ! 進入 G0/0 介面設定模式（LAN 1，Subnet 0）
ip address 192.168.100.1 255.255.255.224            ! 設定介面 IPv4 地址同 subnet mask（/27）
no shutdown                                         ! 啟動介面（Cisco IOS 預設係 shutdown，唔打會 down）
interface gigabitethernet 0/1                       ! 進入 G0/1 介面設定模式（LAN 2，Subnet 1）
ip address 192.168.100.33 255.255.255.224           ! 設定 LAN 2 介面地址
interface serial 0/0/0                              ! 進入 serial 介面設定模式（WAN link，Subnet 4）
ip address 192.168.100.129 255.255.255.224          ! 設定 WAN 介面地址（R1 攞第一個 usable IP）
clock rate 128000                                   ! DCE 端要設定 clock rate，否則 serial link 起唔到
interface serial 0/0/0                              ! （R2 度）入 WAN 介面
ip address 192.168.100.158 255.255.255.224          ! WAN 對端用最後一個 usable IP（R2）
end                                                 ! 退出到 privileged EXEC mode
copy running-config startup-config                  ! 儲存設定去 NVRAM（考試常問「點樣保存」）
show ip interface brief                             ! 顯示所有介面嘅 IP 同 up/down 狀態（最快驗證方法）
show ip route                                       ! 顯示 routing table（檢查 RIP 路由有冇學到 remote 網絡）
show running-config                                 ! 顯示目前 running configuration（檢查有冇打錯）
ping 192.168.100.65                                 ! 由 router 測試連通性（成功會出 !!!!!）
```

### PC（Packet Tracer Command Prompt）

```text
ipconfig                        ! 顯示 PC 嘅 IPv4 地址、subnet mask、default gateway（驗證設定啱唔啱）
ipconfig /all                   ! 顯示詳細設定（包括 MAC address 等）
ping 192.168.100.1              ! 測試連通性（先 ping 自己嘅 default gateway，即 router 介面）
ping 192.168.100.126            ! ping 其他 subnet 嘅 host（封包會經 router 轉發）
arp -a                          ! 顯示 ARP cache（IP ↔ MAC 對應表，睇同 subnet 有冇學到 MAC）
tracert 192.168.100.126         ! 追蹤封包路徑（會見到封包經 R1 → R2）
```

### Switch（參考用 — 本 Lab switch 已設定好）

```text
interface vlan 1                 ! 進入 switch 嘅管理介面（VLAN 1）
ip address 192.168.100.2 255.255.255.224   ! 設定 switch 管理 IP（本 Lab 第二個 usable IP）
no shutdown                      ! 啟動 VLAN 1 介面
ip default-gateway 192.168.100.1 ! 設定 switch 嘅 default gateway（管理用）
```

### 附錄：RIP 設定（教材已預設，但實測可能要檢查 / 重設）

```text
router rip                       ! 進入 RIP routing 設定模式
network 192.168.100.0            ! 通告 192.168.100.0 網絡（RIP 用 classful 網絡地址）
version 2                        ! （可選）用 RIPv2
```

> **Command notes:** `no shutdown` is mandatory to bring an interface up; `clock rate` is required on the DCE end of a serial link; `copy running-config startup-config` saves the configuration.

---

## 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| `ping` 出 `Request timed out`（連 gateway 都唔通） | PC 嘅 IP 或 default gateway 填錯 | 喺 PC 打 `ipconfig` 檢查；gateway 一定要等於該 subnet 嘅 router 介面 IP |
| Interface 顯示 `administratively down` | 冇打 `no shutdown` | 入返 interface 打 `no shutdown` |
| `Serial0/0/0 is down` / `line protocol is down` | DCE 端冇 `clock rate`，或兩邊冇 `no shutdown` | DCE 端打 `clock rate 128000`；兩邊都確認 `no shutdown` |
| `% Invalid input detected at '^' marker` | 喺錯誤 mode 打指令（例如未入 `configure terminal` 就打 `interface`） | 確認身處正確 mode：`enable` → `configure terminal` → `interface ...` |
| 兩個介面用咗同一個 subnet（`overlapping` 或 ping 到奇怪裝置） | 冇跟 Subnet Table 分配，IP 重複或跨 subnet 重用 | 跟返 Subnet 0–4 分配，每個 subnet 嘅地址只喺自己嗰度用 |
| 用咗舊 mask `255.255.255.0`（/24） | 唔記得借位後 mask 要改做 /27 | 全網絡統一用 `255.255.255.224`（/27） |
| 跨 subnet 通但同 subnet 都通，remote ping 唔到 | Router 冇路由（RIP 未生效／未設定） | Router 打 `show ip route`，確認有經 RIP 學到 remote 網絡；必要時重設 `router rip` + `network 192.168.100.0` |
| `Destination host unreachable` | ARP 搵唔到對方，或地址唔喺同一 subnet（mask 錯） | 檢查雙方 mask 一致；確認 ping 嘅目標係 usable host 地址 |
| 用咗 `.31`、`.63` 等地址嚟設定裝置 | 攞錯咗 broadcast address（或 network address） | Usable 範圍只係 network+1 至 broadcast−1；裝置只能用 usable 地址 |
| `ping` 自己嘅 gateway 通，但 PC 之間唔通 | 其中一邊 PC 未設定 default gateway | 每部 PC 都要填返對應 subnet 嘅 default gateway（router 介面 IP） |

> **Debugging order:** 先 check PC（`ipconfig`）→ 再 check router 介面（`show ip interface brief`）→ 最後 check 路由（`show ip route`）。

---

## 📝 測驗常見題型（Practical Test 應試重點）

| # | 題型 | 答題要點 |
|---|---|---|
| 1 | 數 subnet 數量（Based on the topology, how many subnets are needed?） | 數「LAN 數 + WAN 數」：4 LAN + 1 WAN = **5** |
| 2 | Borrow 幾多 bits？ | `2^n ≥ 5` → n = **3**（2^2 = 4 唔夠） |
| 3 | 產生幾多 subnet？每 subnet 幾多 usable hosts？ | 2^3 = **8**；2^5 − 2 = **30**（必須 ≥ 25，否則 borrow 太多） |
| 4 | 寫首五個 subnet 嘅 binary 值 | subnet bits 000 → 001 → 010 → 011 → 100；host bits 全 0；network = .0/.32/.64/.96/.128 |
| 5 | 計新 subnet mask（binary + decimal） | 11111111.11111111.11111111.**11100000** = **255.255.255.224（/27）** |
| 6 | 填 Subnet Table（network / first & last usable / broadcast） | increment = 32；first = network+1；last = broadcast−1；broadcast = 下一個 network − 1 |
| 7 | 填 Addressing Table（Document the addressing scheme） | R1 攞第一個 usable；WAN 對端 R2 攞最後一個；switch 第二個；PC 最後一個；gateway = router 介面 IP |
| 8 | CLI 設定 router 介面 | `enable` → `configure terminal` → `interface g0/0` → `ip address` → `no shutdown` → `end` → 儲存 |
| 9 | 設定 PC + default gateway | PC 用最後一個 usable IP；gateway 必須係該 subnet 嘅 router 介面 IP |
| 10 | ping 驗證 | 由 PC1、PC4 可以 ping 通 Addressing Table 內**全部** IP；先 ping gateway，再 ping remote |
| 11 | 檢查題（show commands output 解讀） | 識讀 `show ip interface brief`（up/up 先係正常）、`show ip route`（有 R 開頭 = RIP 路由）、`arp -a`（IP ↔ MAC 對應） |

**通殺口訣（答題前背一次）：**
1 ➔ 先計 subnet 數（LAN + WAN）→ 再計 borrow bits → 再計 hosts
2 ➔ 新 mask 一定要寫 `255.255.255.224`（/27），唔好用返舊嘅 /24
3 ➔ 每個地址都要「對號入座」：network 唔用得、broadcast 唔用得、usable 範圍先分配得
4 ➔ Default gateway 永遠等於 router 喺該 subnet 嘅介面 IP
5 ➔ 驗證嗰陣由近到遠：gateway → 同 subnet host → 跨 subnet host → WAN 對端

> **Exam tips:** Always double-check that the usable host count meets the minimum (25); write the subnet mask as 255.255.255.224 (/27); never assign the network or broadcast address; the default gateway must be the router interface IP of that subnet.

---

## 🔗 理論 recap（5 分鐘入腦）

1. Subnetting（子網路分割）係將一個大 IPv4 network 切成幾個細 subnet，縮細 broadcast domain 並更有效運用地址空間。
   > Subnetting divides one IPv4 network into smaller subnetworks, reducing broadcast domain size and using address space more efficiently.
2. 喺 /24（8 個 host bits）借 n 個 bits，產生 `2^n` 個 subnet；每個 subnet 有 `2^(8−n)` 個地址，其中 network address（host bits 全 0）同 broadcast address（host bits 全 1）唔用得，所以 usable hosts = `2^(8−n) − 2`。
   > Borrowing n host bits creates 2^n subnets; each subnet yields 2^(remaining host bits) − 2 usable host addresses.
3. Subnet mask = 網絡位部分全 1 + host 位部分全 0；借 3 bits 後即 `/27 = 255.255.255.224 = 11111111.11111111.11111111.11100000`。
   > The subnet mask has all network bits set to 1 and all host bits set to 0; /27 equals 255.255.255.224.
4. 每個 subnet 嘅第一個地址係 network address、最後一個係 broadcast address；usable 範圍介乎兩者之間。
   > The first address of a subnet is the network address, the last is the broadcast address, and the usable range lies between them.
5. 同 subnet 內嘅裝置靠 switch + ARP 直接通訊；跨 subnet 一定要經 router（default gateway），router 靠 routing table（本 Lab 用 RIP）轉發。
   > Hosts on the same subnet communicate directly via ARP and the switch; hosts on different subnets must go through the router, which forwards packets using its routing table (RIP in this lab).

---

*本 CodeGuide 由 ITE3102 Network Fundamentals 教材「Packet Tracer — Subnetting Scenario (Version 2)」整理，供實務測驗溫習之用。*
