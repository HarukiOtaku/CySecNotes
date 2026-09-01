# ITE3102 PT6.1 實務 CodeGuide — Connect a Router to a LAN (Cisco CLI)

> 課程：ITE3102 Network Fundamentals ｜ 教材：PT6.1: Connect a Router to a LAN (Cisco CLI)
> 用途：本文件為「實務測驗主戰文件」。跟住做，就可以喺 Packet Tracer 完成實作並應付 Practical Test。

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握的實務技能（Objectives）

> **Part 1: Display Router Information** — 用 `show` 指令檢視 router 嘅狀態與介面資料。
> **Part 2: Configure Router Interfaces** — 根據 Addressing Table 設定 router 嘅 Ethernet interface（IP address、啟動介面、description、儲存設定）。
> **Part 3: Verify the Configuration** — 用驗證指令檢查設定，並做 end-to-end ping 測試。

實務上你要識得：

- 喺 Packet Tracer 用 **CLI**（Command Line Interface）登入 router（console password: `cisco`；privileged EXEC password: `class`）
- 用 `show` 系列指令讀出介面統計、IP、MAC address、bandwidth、routing table
- 進入不同 IOS mode（user EXEC → privileged EXEC → global configuration → interface configuration）
- 設定 `ip address`、`no shutdown`、`description`，最後 `copy running-config startup-config` 儲存
- 用 `ping` 驗證 LAN 內外連通性（connectivity）

### 所需設備／軟體（Equipment & Software）

| 設備 | 數量 | 用途 |
|------|------|------|
| **Cisco Router**（如 4321，R1、R2） | 2 | 負責 routing 同 LAN gateway |
| **Cisco Switch**（S1–S4） | 4 | 將 PC 接入 LAN（本 lab 唔使設定） |
| **PC**（PC1–PC4） | 4 | 測試主機 |
| **Packet Tracer** | 1 | 模擬軟體（Cisco Packet Tracer） |
| **Serial cable (DCE)** | 1 | 連接 R1–R2 之間嘅 WAN link |

> **Addressing Table**（本 lab 嘅「標準答案」來源，背熟佢）：

| Device | Interface | IP Address | Subnet Mask | Default Gateway |
|--------|-----------|------------|-------------|-----------------|
| R1 | G0/0 | 192.168.10.1 | 255.255.255.0 | N/A |
| R1 | G0/1 | 192.168.11.1 | 255.255.255.0 | N/A |
| R1 | S0/0/0 (DCE) | 209.165.200.225 | 255.255.255.252 | N/A |
| R2 | G0/0 | 10.1.1.1 | 255.255.255.0 | N/A |
| R2 | G0/1 | 10.1.2.1 | 255.255.255.0 | N/A |
| R2 | S0/0/0 | 209.165.200.226 | 255.255.255.252 | N/A |
| PC1 | NIC | 192.168.10.10 | 255.255.255.0 | 192.168.10.1 |
| PC2 | NIC | 192.168.11.10 | 255.255.255.0 | 192.168.11.1 |
| PC3 | NIC | 10.1.1.10 | 255.255.255.0 | 10.1.1.1 |
| PC4 | NIC | 10.1.2.10 | 255.255.255.0 | 10.1.2.1 |

> **記憶口訣**：router 介面 IP = 該 LAN 嘅 default gateway；PC 嘅 gateway 一定係連住佢嗰個 router interface 嘅 IP。

---

## 🛠️ 解題步驟拆解 (Walkthrough)

> 登入提示：Click a device and then click the CLI tab to access the command line directly. The console password is `cisco`. The privileged EXEC password is `class`.

**進入 router 流程**：click R1 → CLI tab → 見到 `User Access Verification` → 輸入 `cisco`（console password）→ 輸入 `enable` → 輸入 `class`（privileged EXEC password）→ 而家你喺 `R1#` prompt。

---

### Part 1: Display Router Information（顯示 Router 資料）

**Step 1 ➔ 2 ➔ 3：顯示所有介面統計資料**

1. **Original step: Display interface information on R1.**
2. 喺 R1 輸入 `show interfaces` — 呢個指令顯示 **所有** interface 嘅詳細統計資料（包括 IP address、MAC address、bandwidth、error counters 等）。
3. 留意輸出格式：每個 interface 一段，開頭係 `GigabitEthernet0/0 is up, line protocol is up` 呢類狀態行。

> **Question Q1: Which command displays the statistics for all interfaces configured on a router?**
> ✅ 答：`show interfaces`

**Step 2 ➔ 2 ➔ 3：顯示單一 Serial 介面資料**

1. **Original step: Enter the command to display the statistics for the Serial 0/0/0 interface on R1.**
2. 輸入 `show interfaces serial 0/0/0` — 指定 interface 名就只會顯示嗰一個介面。
3. 從輸出回答：

> **Q2: Which command displays the information about the Serial 0/0/0 interface only?**
> ✅ 答：`show interfaces serial 0/0/0`
>
> **Q3: What is the IP address configured on R1 (Serial 0/0/0)?**
> ✅ 答：`209.165.200.225`（喺 `Internet address is 209.165.200.225/30` 一行）
>
> **Q4: What is the bandwidth on the Serial 0/0/0 interface?**
> ✅ 答：`1544 Kbit/sec`（serial 介面預設 bandwidth，即 T1 線路速度；喺 `MTU 1500 bytes, BW 1544 Kbit/sec` 一行）

**Step 3 ➔ 2 ➔ 3：顯示 GigabitEthernet 0/0 介面資料**

1. **Original step: Enter the command to display the statistics for the GigabitEthernet 0/0 interface.**
2. 輸入 `show interfaces gigabitethernet 0/0`。
3. 從輸出回答：

> **Q5: What is the IP address on R1 (GigabitEthernet 0/0)?**
> ✅ 答：`192.168.10.1`（Addressing Table 中 G0/0 嘅 IP；router 已 partial configured）
>
> **Q6: What is the MAC address of the GigabitEthernet 0/0 interface?**
> ✅ 答：睇 `Hardware is ... , address is xxxx.xxxx.xxxx` 一行（模擬環境每部機唔同，照抄輸出即可；例如 `0090.2b5a.2a01`）
>
> **Q7: What is the bandwidth (BW) of the GigabitEthernet 0/0 interface?**
> ✅ 答：`1000000 Kbit/sec`（= 1 Gbps，GigabitEthernet 介面嘅標準 bandwidth）

> 💡 **答題技巧**：MAC address 同 bandwidth 都要由 `show interfaces` 輸出度搵，唔好靠背；考場唔記得就即刻打指令睇。

**Step 4 ➔ 2 ➔ 3：顯示介面摘要**

1. **Original step: Display a summary list of the interfaces on R1.**
2. 輸入 `show ip interface brief` — 一行一個 interface，顯示 `Interface / IP-Address / OK? / Method / Status / Protocol`。
3. 喺 R1 同 R2 各打一次，再答問題：

> **Q8: Which command displays a brief summary of the current interfaces, interface status, and the IP addresses assigned to them?**
> ✅ 答：`show ip interface brief`
>
> **Q9: How many serial interfaces are there on R1 and R2?**
> ✅ 答：每部各 1 個（R1: S0/0/0，R2: S0/0/0），共 2 個 serial interface
>
> **Q10: How many Ethernet interfaces are there on R1 and R2?**
> ✅ 答：每部各 2 個（G0/0 同 G0/1），共 4 個 Ethernet interface
>
> **Q11: Are all the Ethernet interfaces on R1 the same? If no, explain the difference(s).**
> ✅ 答：兩者都係 GigabitEthernet（相同 type、相同 bandwidth 1000000 Kbit/sec）；唯一唔同係各自嘅 IP address（G0/0 = 192.168.10.1，G0/1 = 192.168.11.1），代表連接唔同 subnet

**Step 5 ➔ 2 ➔ 3：顯示 routing table**

1. **Original step: Display the routing table on R1.**
2. 輸入 `show ip route` — 顯示 router 知道嘅所有路由（connected、static、dynamic）。
3. 留意路由代碼（route code）：`C` = Connected（直連），`O` = OSPF（動態學到），`S` = Static。

> **Q12: What command displays the contents of the routing table?**
> ✅ 答：`show ip route`
>
> **Q13: How many connected routes are there (uses the C code)?**
> ✅ 答：睇 `C` 開頭嘅條目數目（R1 一般有 3 條：192.168.10.0、192.168.11.0、209.165.200.0）
>
> **Q14: Which route is listed?**
> ✅ 答：列出該 router 直連嘅 network，例如 `192.168.10.0/24 is directly connected, GigabitEthernet0/0`
>
> **Q15: How does a router handle a packet destined for a network that is not listed in the routing table?**
> ✅ 答：**The router drops the packet**（如果 routing table 冇對應 route 又冇 default route，router 會將封包丟棄，唔會轉送）

---

### Part 2: Configure Router Interfaces（設定 Router 介面）

**Step 1 ➔ 2 ➔ 3：設定 R1 嘅 GigabitEthernet 0/0**

1. **Original step: Configure the GigabitEthernet 0/0 interface on R1.**
2. 由 `R1#` 進入 global configuration mode，再入 interface configuration mode，打以下指令：

```text
R1> enable                     ! 進入 privileged EXEC mode（要密碼 class）
R1# configure terminal         ! 進入 global configuration mode
R1(config)# interface gigabitethernet 0/0   ! 進入 G0/0 介面設定模式
R1(config-if)# ip address 192.168.10.1 255.255.255.0   ! 設定 IP address + subnet mask
R1(config-if)# no shutdown     ! 啟動介面（預設 interface 係 shutdown 狀態）
```

3. 見到以下訊息代表介面成功啟動：

```text
%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up
```

**Step 2 ➔ 2 ➔ 3：加 description（文件化設定）**

1. **Original step: It is good practice to configure a description for each interface to help document the network.**
2. description 係俾人睇嘅備註，記錄呢個介面駁住邊部設備：

```text
R1(config-if)# description LAN connection to S1
```

**Step 3 ➔ 2 ➔ 3：返回並測試 ping**

1. **Original step: R1 should now be able to ping PC1.**
2. 打完 `end`（等同 Ctrl-Z）返回 privileged EXEC mode，然後 ping PC1（192.168.10.10）：

```text
R1(config-if)# end
R1# ping 192.168.10.10
```

3. 成功輸出：`Success rate is 80 percent (4/5)` — 第一粒 `!` 之前係 `.`（timeout）好正常，因為 ARP 未建立，之後 4 粒 `!` 全通。

> ✅ **píng 輸出解讀**：`!` = 有回覆（success）；`.` = timeout（失敗）；`U` = destination unreachable；`?` = 其他錯誤。

**Step 4 ➔ 2 ➔ 3：完成其餘介面設定並儲存**

1. **Original step: Use the information in the Addressing Table to finish the interface configurations for R1 and R2.**
2. 每部 router 嘅每個 interface 都要做齊四件事：**設定 IP address + 啟動介面（no shutdown）+ 加 description + 驗證**。
3. 參照 Addressing Table 完成（R1 同 R2 都做）：

```text
R1# configure terminal
R1(config)# interface gigabitethernet 0/1
R1(config-if)# ip address 192.168.11.1 255.255.255.0
R1(config-if)# description LAN connection to S2
R1(config-if)# no shutdown
R1(config-if)# end
R1# copy running-config startup-config      ! 儲存設定到 NVRAM
```

```text
R2# configure terminal
R2(config)# interface gigabitethernet 0/0
R2(config-if)# ip address 10.1.1.1 255.255.255.0
R2(config-if)# description LAN connection to S3
R2(config-if)# no shutdown
R2(config-if)# exit
R2(config)# interface gigabitethernet 0/1
R2(config-if)# ip address 10.1.2.1 255.255.255.0
R2(config-if)# description LAN connection to S4
R2(config-if)# no shutdown
R2(config-if)# end
R2# copy running-config startup-config
```

> ⚠️ **注意**：serial（S0/0/0）介面本 lab 已設定好（partial configured），**唔使**再改；只要用 `show` 驗證即可。

> **Q16: Save the configuration files on both routers to NVRAM. What command did you use?**
> ✅ 答：`copy running-config startup-config`
> （可簡寫為 `copy run start`；ROUTER CONFIG 教材用 `do copy running-conf startup-conf` 喺 config mode 內執行，效果一樣）

---

### Part 3: Verify the Configuration（驗證設定）

**Step 1 ➔ 2 ➔ 3：用 show ip interface brief 快速驗證**

1. **Original step: Use the `show ip interface brief` command on both R1 and R2 to quickly verify that the interfaces are configured with the correct IP address and are active.**
2. 預期結果：每個已設定介面嘅 `Status` 同 `Protocol` 都係 `up`。

> **Q17: How many interfaces on R1 and R2 are configured with IP addresses and in the "up" and "up" state?**
> ✅ 答：每部 router 有 **3 個** interface up/up（G0/0、G0/1、S0/0/0）
>
> **Q18: What part of the interface configuration is NOT displayed in the command output?**
> ✅ 答：**Interface description（介面備註）** 唔會喺 `show ip interface brief` 輸出度顯示（MAC address 都唔會）
>
> **Q19: What commands can you use to verify this part of the configuration?**
> ✅ 答：`show running-config`、`show interfaces`、`show interfaces description`

**Step 2 ➔ 2 ➔ 3：用 show ip route 檢查路由**

1. **Original step: Use the `show ip route` command on both R1 and R2 to view the current routing tables.**
2. 數 `C`（connected）同 `O`（OSPF）開頭嘅條目。

> **Q20: How many connected routes (uses the C code) do you see on each router?**
> ✅ 答：每部 **3 條**（兩個 LAN + 一個 WAN）
>
> **Q21: How many OSPF routes (uses the O code) do you see on each router?**
> ✅ 答：每部 **2 條**（由 OSPF 動態學到嘅對方 LAN）
>
> **Q22: How many LANs and WANs are in the topology?**
> ✅ 答：**4 個 LAN + 1 個 WAN = 5 個 network**（192.168.10.0、192.168.11.0、10.1.1.0、10.1.2.0 + 209.165.200.0/30）
>
> **Q23: Does this number match the number of C and O routes shown in the routing table?**
> ✅ 答：**Yes，符合**（3 C + 2 O = 5）；如果唔符合，即係漏咗 Part 2 嘅設定，要返去檢查
>
> 💡 **驗算口訣**：`C 數量 + O 數量 = LAN 數量 + WAN 數量` → 設定先算完整。

**Step 3 ➔ 2 ➔ 3：end-to-end 連通測試**

1. **Original step: You should now be able to ping from any PC to any other PC on the network. In addition, you should be able to ping the active interfaces on the routers.**
2. 喺 PC1 開 Command Prompt，打 `ping 10.1.2.10`（PC4）— 應該成功（跨 router 通訊，靠 routing table + OSPF 轉送）。
3. 喺 R2 打 `ping 192.168.11.10`（PC2）— 應該成功。

> ⚠️ **Note**: For simplicity in this activity, the switches are not configured. You will not be able to ping them.
> （switch 冇 IP 冇設定，ping switch 會失敗係正常，唔使理。）

---

## 💻 關鍵 CLI 指令庫

> 教材出現過嘅所有 Cisco IOS 指令，每行附繁中註解。`!` 之後係註解（router config file 格式）。

### Router 基本操作

```text
enable                         ! 由 user EXEC mode (>) 進入 privileged EXEC mode (#)
en                             ! enable 嘅簡寫
configure terminal             ! 由 # 進入 global configuration mode (config)#
conf t                         ! configure terminal 嘅簡寫
exit                           ! 離開當前 mode，返回上一層
end                            ! 直接返回 privileged EXEC mode (等於 Ctrl-Z)
Ctrl-Z                         ! 同上，直接返回 privileged EXEC mode
copy running-config startup-config   ! 將 running-config 儲存到 NVRAM（即「儲存設定」）
do copy running-conf startup-conf     ! 喺 (config)# mode 內用 do 執行特權指令（教材 ROUTER CONFIG 版本）
show running-configuration     ! 顯示 running configuration（簡寫 show running-config）
```

### Interface 設定（Part 2 核心）

```text
interface gigabitethernet 0/0  ! 進入 G0/0 介面設定模式 (config-if)#
int g0/0                       ! interface gigabitethernet 0/0 嘅簡寫
ip address 192.168.10.1 255.255.255.0   ! 設定 IPv4 address + subnet mask
ip addr 192.168.10.1 255.255.255.0       ! ip address 嘅簡寫
no shutdown                    ! 啟動介面（預設 interface 係 shutdown）
shutdown                       ! 關閉介面（除錯時用）
description LAN connection to S1   ! 加介面備註（description 簡寫 desc）
desc interface Gi0/0           ! description 嘅簡寫（教材 ROUTER CONFIG 版本）
```

### 驗證指令（Part 1 & 3 核心）

```text
show interfaces                ! 顯示所有 interface 嘅完整統計資料（IP/MAC/bandwidth/errors）
show interfaces serial 0/0/0   ! 只顯示 Serial 0/0/0 一個介面嘅資料
show interfaces gigabitethernet 0/0   ! 只顯示 G0/0 介面嘅資料
show ip interface brief        ! 一行一介面：IP / status / protocol 快速總覽
show ip route                  ! 顯示 routing table（C=connected, O=OSPF, S=static）
```

### PC 端指令（Packet Tracer 內 PC Command Prompt）

```text
ipconfig                       ! 檢視 PC 嘅 IP / subnet mask / default gateway
ping 10.1.2.10                 ! 測試到 PC4 嘅連通性（! = 通，. = timeout）
```

> 🔑 **登入資料**：console password = `cisco`；privileged EXEC password = `class`。

---

## 🐞 常見 Error 與 Debug

| Error／問題 | 原因 | Fix |
|------------|------|-----|
| `ping` 全部 `.`（timeout） | Interface 未啟動（仲係 shutdown） | 入 interface 打 `no shutdown` |
| `ping` 全部 `.`（timeout） | IP address 打錯／gateway 唔啱 | 對照 Addressing Table 檢查 `ip address` 同 PC 嘅 default gateway |
| `% Invalid input detected at '^' marker` | 指令打錯／喺錯嘅 mode 打 | 檢查 prompt：`>` `#` `(config)#` `(config-if)#` 邊個 mode；打 `?` 睇可用指令 |
| `% Incomplete command` | 指令欠參數 | 補返參數，例如 `ip address` 一定要跟 IP + mask |
| `% Ambiguous command` | 簡寫太短，多個指令撞名 | 用完整指令或更多字母（例如用 `interface` 而唔係 `int` 單一字） |
| Ping PC 通但 ping switch 唔通 | Switch 冇設定 IP（本 lab 預期行為） | 唔使理，教材明確話 switch 唔會通 |
| Ping 第一粒 `.` 之後先通 | 正常 ARP 程序（首次要解析 MAC address） | 唔使 Fix，再 ping 一次就全 `!` |
| `show ip route` 冇 `O` 路由 | 對方 router 介面未設定／OSPF 未學到 | 確認兩部 router 所有介面都 up/up，檢查 Part 2 步驟 |
| 設定冇咗（重開機後消失） | 冇儲存到 NVRAM | 打 `copy running-config startup-config` |
| 打 `enable` 問 password 但唔知 | 教材登入資料：`cisco`（console）/ `class`（privileged EXEC） | 用返教材密碼 |

---

## 📝 測驗常見題型

### 題型 1：寫出指定用途嘅指令（最常見）

| 題目問法 | 答案指令 |
|---------|---------|
| 顯示所有 interface 統計 | `show interfaces` |
| 顯示單一 interface 資料（如 Serial 0/0/0） | `show interfaces serial 0/0/0` |
| 顯示介面摘要（IP + status） | `show ip interface brief` |
| 顯示 routing table | `show ip route` |
| 顯示 running configuration | `show running-config` |
| 儲存設定到 NVRAM | `copy running-config startup-config` |
| 設定 interface IP | `ip address <IP> <mask>` |
| 啟動 interface | `no shutdown` |

> ✅ **答題要點**：考場答指令要用**完整指令**（例如 `show interfaces serial 0/0/0`，唔好淨係寫 `show int s0/0/0`）；`serial 0/0/0` 係 slot/port 格式，唔好寫錯。

### 題型 2：睇輸出答問題（show output 分析）

- 叫你數 `show ip interface brief` 入面有幾多個 interface up/up → **逐行睇 Status 同 Protocol 兩欄**，兩欄都係 `up` 先計。
- 叫你搵 MAC address → 搵 `address is` 開頭嗰段（`show interfaces` 輸出）。
- 叫你搵 bandwidth → 搵 `BW xxxx Kbit/sec`（serial = 1544，GigabitEthernet = 1000000）。

### 題型 3：設定題（要你喺 router 度打指令）

> 實務測驗通常會叫你由零設定一個 interface，標準流程背熟：
> `enable` → `configure terminal` → `interface gigabitethernet 0/0` → `ip address <IP> <mask>` → `description <text>` → `no shutdown` → `end` → `copy running-config startup-config`

- **必做**：`no shutdown`（唔打，介面 down，ping 一定唔通）＋ 最後儲存（`copy running-config startup-config`）。

### 題型 4：概念問答

- Router 收到 routing table 冇嘅 destination network 會點？→ **Drops the packet**（除非有 default route）。
- `show ip interface brief` 睇唔到咩？→ **Description**（同 MAC address）。
- 用咩指令睇返 description？→ `show running-config` ／ `show interfaces` ／ `show interfaces description`。
- PC 要通到外面 network，default gateway 要設做咩？→ **連接嗰個 LAN 嘅 router interface IP**（例如 PC1 → 192.168.10.1）。

---

## 🔗 理論 recap

> 5 分鐘快速重溫本 lab 用到嘅理論：

1. **Router 係 Layer 3 設備**：用 IP address 決定封包去邊，介面 IP 同時係該 LAN 嘅 default gateway。*A router forwards packets based on the destination IP address in the routing table.*
2. **Default gateway**：PC 出 LAN 嘅封包一定要交俾 default gateway（= router interface IP）先可以跨 network。*Packets destined outside the local subnet are sent to the default gateway.*
3. **Interface 預設 shutdown**：新 interface 要 `no shutdown` 先會 up。*Cisco router interfaces are administratively down by default.*
4. **Routing table 路由來源**：`C`（connected，直連自動出現）、`O`（OSPF 動態學習）、`S`（static）。*Connected routes are learned automatically; dynamic routes are learned via routing protocols such as OSPF.*
5. **ARP**：首次 ping 要先用 ARP 解析對方 MAC address，所以第一粒 packet 可能 timeout。*ARP resolves IP addresses to MAC addresses on the same subnet.*
6. **驗證三寶**：`show ip interface brief`（快速）、`show ip route`（路由）、`ping`（連通性）。*Verify with show commands, then test with ping.*
7. **儲存設定**：`copy running-config startup-config` 將設定寫入 NVRAM，重開機唔會消失。*The running-config is volatile; save it to NVRAM as the startup-config.*
8. **Subnet mask 決定 network 邊界**：/24（255.255.255.0）= 254 個可用 host；/30（255.255.255.252）= 只夠 2 個 host（WAN point-to-point link 常用）。*The subnet mask defines which IP addresses belong to the same network.*
