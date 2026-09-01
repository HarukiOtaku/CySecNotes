# ITE3102 PT10.2 CodeGuide — DHCP and DNS Servers（DNS 與 DHCP 實務測驗主戰文件）

> **Lab Identity:** Packet Tracer — DHCP and DNS Servers（對應 Cisco NetAcad ITN 10.2.2.7 標準活動）
> 本文件唯一目的：令學生只靠呢份文件就喺 Packet Tracer 完成實作，並答啱 Practical Test 所有問題。

---

## 🔗 理論 recap（先睇呢度，5 分鐘入腦）

1. **靜態 IP（Static Addressing）** 係人手設定、地址固定唔變；**DHCP** 就由 server 自動派發地址俾 client，地址有租期（lease），到期可續租或轉派。
   > Static addressing is configured manually and never changes; DHCP automatically assigns addresses to clients for a limited lease time.
2. DHCP 用四步 **DORA** 流程：**D**iscover（client 搵 server）→ **O**ffer（server 出 offer）→ **R**equest（client 確認要）→ **A**cknowledge（server 確認派發）。
   > DHCP uses the four-step DORA process: Discover, Offer, Request, Acknowledge.
3. 打印機呢類「要俾人固定搵到」嘅設備用 static IP；laptop / tablet 呢類 end host 用 DHCP 自動攞設定最方便。
   > Devices that must always be reachable at a fixed address, such as printers, use static IPs; end hosts typically use DHCP.
4. **Default gateway**（本 Lab = WRS 192.168.0.1）係離開本機網絡嘅出口；去 remote network（10.10.10.2、64.100.200.1）一定要經 gateway 轉發。
   > The default gateway is the exit point to remote networks; traffic to 10.10.10.2 or 64.100.200.1 must be routed through the gateway.
5. **DNS（Domain Name System）** 將人睇得明嘅 hostname（如 `centralserver.pt.pka`）解析做 IP address，用戶就唔使背 IP。
   > DNS resolves human-readable hostnames into IP addresses so users do not need to memorize IPs.
6. WRS 上設定嘅 **Static DNS 1（64.100.8.8）** 會經 DHCP 一併派俾 client，令 client 知道要搵邊部 DNS server 做解析。
   > The DNS server address configured on the DHCP server is handed to clients with the lease, telling them which DNS server to query.
7. 三個驗證工具：`ipconfig /all` 睇完整 IP 設定（DHCP Enabled、lease、DNS）；`ping` 測連通性；`nslookup` 測 DNS 解析。
   > `ipconfig /all` shows the full addressing including DHCP status and DNS servers; `ping` tests connectivity; `nslookup` tests name resolution.

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握的實務技能（Practical Skills）

| 技能 | 實務上做到啲咩 |
|---|---|
| 靜態 IP 設定（Static IP Configuration） | 喺 Packet Tracer GUI 為 printer 設定 IP / subnet mask / gateway / DNS，令設備地址固定 |
| DHCP server 設定 | 喺 WRS 嘅網頁式 GUI 開啟 DHCP server、設定 LAN IP 同 DNS，令 client 可以自動攞設定 |
| DHCP client 操作 | 喺 laptop / tablet 切換做 DHCP mode，等 DORA 流程完成並攞到完整 IP configuration |
| DNS 記錄設定（DNS Records） | 喺 DNS server 新增 A record（hostname ↔ IP），建立名稱解析資料庫 |
| 驗證工具操作 | 用 `ipconfig /all`、`ping`、`nslookup` 驗證 IP 設定、連通性同 DNS 解析 |
| 故障排查（Troubleshooting） | 用教材提供嘅「返 Step 2 檢查 WRS」邏輯，排除 DHCP 派唔到 IP / DNS 解析失敗問題 |

> **Core skills:** configuring static IPv4 on a printer, enabling DHCP on a wireless router (WRS), requesting DHCP leases on clients, adding DNS A records on the DNS server, and verifying with `ipconfig /all`, `ping`, and `nslookup`.

### 所需設備 / 軟體（Equipment & Software）

- **Cisco Packet Tracer**（本 Lab 用標準活動檔 `.pka`，全程主要用 GUI，唔使寫 IOS CLI）
- **Inkjet** —— 打印機（要設靜態 IP 嘅設備）
- **WRS** —— Wireless Router（家用無線路由器，內置 DHCP server）
- **Home Laptop**、**Tablet** —— 無線 client（用 DHCP 攞 IP）
- **Internet cloud** —— 模擬互聯網，入面有 DNS server 同兩部 Web server
- **famous.dns.pka** —— DNS server（IP = 64.100.8.8）
- **CentralServer**（10.10.10.2）、**BranchServer**（64.100.200.1）—— 兩部 Web server

> **Environment:** Cisco Packet Tracer; the topology includes a printer, a wireless router (WRS), two wireless clients, and an Internet cloud containing a DNS server (famous.dns.pka) and two web servers. Configuration is done through the Packet Tracer GUI tabs, not the IOS CLI.

### 網絡拓撲 + Addressing Table（必背）

- 家用網絡（home office LAN）係 **192.168.0.0/24**：WRS 係呢個網絡嘅 default gateway 兼 DHCP server
- CentralServer（10.10.10.2）同 BranchServer（64.100.200.1）喺 remote network，要經 WRS 同 Internet cloud 先到

| Device | Interface / 角色 | IP Address | Subnet Mask | Default Gateway | DNS Server |
|---|---|---|---|---|---|
| Inkjet（打印機） | FastEthernet0（static） | 192.168.0.2 | 255.255.255.0 | 192.168.0.1 | 64.100.8.8 |
| WRS（LAN 側） | 內置 LAN interface | 192.168.0.1 | 255.255.255.0 | — | Static DNS 1 = 64.100.8.8 |
| Home Laptop | DHCP（自動派發） | 192.168.0.100 起 | 255.255.255.0 | 192.168.0.1 | 64.100.8.8 |
| Tablet | DHCP（自動派發） | 192.168.0.100 起 | 255.255.255.0 | 192.168.0.1 | 64.100.8.8 |
| famous.dns.pka | DNS server | 64.100.8.8 | — | — | — |
| CentralServer | Web server | 10.10.10.2 | — | — | — |
| BranchServer | Web server | 64.100.200.1 | — | — | — |

**DNS 記錄（必背）：**

| Resource Record Name | Address |
|---|---|
| `centralserver.pt.pka` | 10.10.10.2 |
| `branchserver.pt.pka` | 64.100.200.1 |

> **Addressing Table:** memorize the four key addresses — 192.168.0.1 (gateway + DHCP server), 192.168.0.2 (printer), 64.100.8.8 (DNS server), and the two DNS records mapping hostnames to 10.10.10.2 and 64.100.200.1.

---

## 🛠️ 解題步驟拆解 (Walkthrough)

> 教材每個 Part 都有累積分數（20 → 60 → 68 → 76 → 100），做完一步睇住分數跳，就知該 Part 已通過。

### Part 1 ➔ 設定 Inkjet Printer 靜態 IP（Configure Static IPv4 Addressing）

**Step 1 ➔** 撳 Inkjet，再撳 **Config** tab（會顯示 Global Settings）（原文：Click Inkjet and click the Config tab, which displays the Global Settings）
**解說**：Config tab 係圖像化設定頁（等於 CLI 嘅 configuration mode）；**Global Settings** 係全機通用設定，唔屬於任何 interface。

**Step 2 ➔** Gateway 填 `192.168.0.1`，DNS Server 填 `64.100.8.8`（原文：Statically assign the Gateway address as 192.168.0.1 and the DNS Server address as 64.100.8.8）
**解說**：Gateway = default gateway（即 WRS 個 LAN IP）；DNS Server = famous.dns.pka。Printer 要同 remote network 通訊就要靠 gateway 轉發。

> **Why the printer is static:** the home office computers need to know the printer's IPv4 address to send information to it, so the printer must use a static (unchanging) address.

**Step 3 ➔** 撳 **FastEthernet0**，IP 填 `192.168.0.2`、Subnet Mask 填 `255.255.255.0`（原文：Click FastEthernet0 and statically assign the IP address as 192.168.0.2 and the Subnet Mask address as 255.255.255.0）
**解說**：真正「掛」個 IP 嘅地方係 interface 層面。192.168.0.2 同 gateway 192.168.0.1 同一網段（/24），先至可以直接溝通。

**Step 4 ➔** 關閉 Inkjet 視窗（原文：Close the Inkjet window）

> **Answer points:** static configuration has two layers — Global Settings (gateway + DNS) and Interface (IP + subnet mask). The printer's address must never change so clients can always find it.

### Part 2 ➔ 設定 WRS 提供 DHCP 服務（Configure WRS to provide DHCP services）

**Step 1 ➔** 撳 WRS，撳 **GUI** tab，並放大視窗（原文：Click WRS and click the GUI tab, and maximize the window）
**解說**：WRS 係家用無線路由器，用模擬 Linksys 嘅網頁式 GUI 設定，唔係 Cisco IOS CLI。放大視窗係為咗睇清楚所有欄位。

**Step 2 ➔** 喺 **Network Setup** 段：IP Address 改做 `192.168.0.1`，Subnet Mask 改做 `255.255.255.0`（原文：Change the IP Address to 192.168.0.1. Set the Subnet Mask to 255.255.255.0）
**解說**：呢個係 WRS LAN 側嘅 IP，亦即成個 192.168.0.0/24 網絡嘅 **default gateway**——所以 Part 1 嘅 printer gateway 要填返呢個數。

**Step 3 ➔** Enable 個 **DHCP Server**（原文：Enable the DHCP Server）
**解說**：開咗 DHCP server，WRS 先會自動派 IP 俾 client。派發範圍（address pool）一般由 .100 開始，唔使手動改。

**Step 4 ➔** **Static DNS 1** 填 `64.100.8.8`（原文：Set the Static DNS 1 address to 64.100.8.8）
**解說**：Static DNS 1 係 WRS 派俾 client 嘅 DNS server 地址（即 famous.dns.pka）。呢個值會跟住 DHCP offer 一齊交俾 laptop / tablet。

**Step 5 ➔** 捲到最底，撳 **Save Settings**（原文：Scroll to the bottom and click Save Settings）
**解說**：家用 router GUI 一定要 Save 先會套用設定；唔 save 等於白做，DHCP 唔會生效。

**Step 6 ➔** 關閉 WRS 視窗（原文：Close the WRS window）

> **Answer points:** the WRS provides DHCP services for the 192.168.0.0/24 network — its own LAN IP is 192.168.0.1, the DHCP server must be enabled, and the DNS server (64.100.8.8) is advertised to clients via Static DNS 1. Always click Save Settings.

### Part 3 ➔ Home Laptop 用 DHCP 攞 IP（Request DHCP addressing for the Home Laptop）

**Step 1 ➔** 撳 Home Laptop，撳 **Desktop** tab > **IP Configuration**（原文：Click Home Laptop and click the Desktop tab > IP Configuration）
**解說**：Desktop tab 係模擬 PC 桌面，入面有 IP Configuration、Command Prompt、Web Browser 等工具。

**Step 2 ➔** 撳 **DHCP**，等 DHCP request 成功（原文：Click DHCP and wait until the DHCP request is successful）
**解說**：撳 DHCP 之後部機即刻行 DORA（Discover → Offer → Request → Acknowledge），幾秒內介面會自動填滿 IP / Subnet Mask / Gateway / DNS。

**Step 3 ➔** 確認攞到完整 IP configuration；攞唔到就返 **Part 2** 檢查 WRS 設定（原文：Home Laptop should now have a full IP configuration. If not, return to Step 2 and verify your configurations on WRS）
**解說**：教材明確教你嘅排錯順序——client 攞唔到 IP，問題九成喺 DHCP server（WRS）嗰邊。

**Step 4 ➔** 關閉 IP Configuration 視窗，再關閉 Home Laptop 視窗（原文：Close the IP Configuration window and then close the Home Laptop window）

> **Answer points:** requesting DHCP means switching the client from static to DHCP mode; a successful request fills in the whole IP configuration automatically via the DORA process.

### Part 4 ➔ Tablet 用 DHCP 攞 IP（Request DHCP addressing for the tablet）

**Step 1 ➔** 撳 Tablet，撳 **Desktop** tab > **IP Configuration**（原文：Click Tablet and click the Desktop tab > IP Configuration）

**Step 2 ➔** 撳 **DHCP**，等 DHCP request 成功（原文：Click DHCP and wait until the DHCP request is successful）

**Step 3 ➔** 確認攞到完整 IP configuration；攞唔到就返 **Part 2** 檢查 WRS（原文：Tablet should now have a full IP configuration. If not, return to Step 2 and verify your configurations on WRS）

> **Answer points:** repeat the same DHCP client procedure for the Tablet; if a second client also fails, the problem is on the WRS DHCP server side, not the client.

### Part 5 ➔ 測試存取網站（Test access to websites）

**Step 1 ➔** 關閉 IP Configuration 視窗，再撳 **Web Browser**（原文：Close the IP Configuration window, and then click Web Browser）

**Step 2 ➔** 喺 URL 欄打 `10.10.10.2`（CentralServer 網站）或者 `64.100.200.1`（BranchServer 網站），撳 **Go**（原文：In the URL box, type 10.10.10.2 (for the CentralServer website) or 64.100.200.1 (for the BranchServer website) and click Go）
**解說**：呢步用 **IP 直連**測路由連通，仲未用到 DNS——所以就算 DNS 未 set 都應該開到網頁。

**Step 3 ➔** 兩個網站都應該顯示出嚟（原文：Both websites should appear）

> **Answer points:** testing by IP first isolates routing/connectivity from DNS resolution — if the IP works but the hostname does not, the problem is DNS, not the network path.

### Part 6 ➔ 設定 DNS Server 記錄（Configure Records on the DNS Server）

**Step 1 ➔** 撳 **Internet cloud**（原文：Click the Internet cloud. A new network displays）
**解說**：Internet cloud 係一個容器，撳入去先睇到入面嘅設備（DNS server、兩部 Web server）。

**Step 2 ➔** 撳 **famous.dns.pka**，撳 **Services** tab > **DNS**（原文：Click famous.dns.pka and click the Services tab > DNS）
**解說**：Services tab 係 Packet Tracer 畀 server / router 開服務（DNS、DHCP、HTTP 等）嘅地方。

**Step 3 ➔** 填資料並加入以下兩條 resource records（原文：Fill in and add the following resource records）：

| Resource Record Name | Address |
|---|---|
| `centralserver.pt.pka` | 10.10.10.2 |
| `branchserver.pt.pka` | 64.100.200.1 |

**解說**：Name 填完整 FQDN，Type 揀 **A Record**（預設），Address 填對應 IP，然後撳 **Add**。呢兩條記錄就係 DNS 嘅「電話簿」——hostname ↔ IP 對應。

**Step 4 ➔** 關閉 famous.dns.pka 視窗，撳 **Back** 離開 Internet cloud（原文：Close the famous.dns.pka window. Click Back to exit the Internet cloud）

> **Answer points:** an A record maps a hostname (FQDN) to an IPv4 address. `centralserver.pt.pka` → 10.10.10.2 and `branchserver.pt.pka` → 64.100.200.1 must both be added to famous.dns.pka.

### Part 7 ➔ 驗證 DNS（Verify the ability of client computers to use DNS）

**Step 1 ➔** 撳 Home Laptop 或 Tablet，揀 **Command Prompt**（原文：Click Home Laptop or Tablet. Select Command Prompt）

**Step 2 ➔** 打 `ipconfig /all` 驗證 IPv4 addressing（原文：Verify the IPv4 addressing by entering the command ipconfig /all）
**解說**：檢查 DHCP Enabled = Yes、IPv4 Address、Subnet Mask = 255.255.255.0、Default Gateway = 192.168.0.1、DNS Servers = 64.100.8.8。

**Step 3 ➔** `ping 64.100.8.8` 驗證到 DNS server 嘅連通性（原文：Ping the DNS server at 64.100.8.8 to verify connectivity）

**Step 4 ➔** 打 `nslookup centralserver.pt.pka` 同 `nslookup branchserver.pt.pka` 測試 DNS server 功能（原文：Test the functionality of the DNS server by entering the commands nslookup centralserver.pt.pka and nslookup branchserver.pt.pka）
**解說**：nslookup 輸出見到 **Name** 同 **Address** 就代表解析成功；出現 "can't find" 就代表 DNS 記錄或 DNS server 有問題。

**Step 5 ➔** 關閉 Command Prompt，撳 **Web Browser**，驗證可以開到 `centralserver.pt.pka` 同 `branchserver.pt.pka` 兩個網頁（原文：Close the Command Prompt window and click Web Browser. Verify that Home Laptop or Tablet can now access the web pages for centralserver.pt.pka and branchserver.pt.pka）
**解說**：今次用 **hostname** 而唔係 IP 開網頁——成功即證明「DNS 解析 → 路由轉發」成條鏈全部通晒，呢個先係本 Lab 最終目標。

> **Answer points:** verification chain — `ipconfig /all` proves the client got a valid lease with the right DNS server; `ping 64.100.8.8` proves the DNS server is reachable; `nslookup` proves the DNS records resolve; browsing by hostname proves the full DNS + routing path works.

---

## 💻 關鍵 CLI 指令庫

> 本 Lab 全程用 Packet Tracer GUI 完成，**冇 ROUTER CONFIG 段落**；以下分「教材真係用到嘅指令」同「對應 / 延伸 IOS 指令」（Practical Test 隨時會考，全部背熟）。

### 教材內出現嘅指令（本 Lab 必用）

```text
! ===== Windows / PC（Command Prompt）=====

ipconfig /all                  ! 顯示完整 IP 設定：IP、subnet mask、default gateway、DHCP 狀態、DNS server
ping 64.100.8.8                ! 測試到 DNS server（64.100.8.8）嘅連通性（4 個 echo request / reply）
nslookup centralserver.pt.pka  ! 查 DNS：將 hostname 解析做 IP（應得 10.10.10.2）
nslookup branchserver.pt.pka   ! 查 DNS：將 hostname 解析做 IP（應得 64.100.200.1）
```

### 延伸必備指令（Cisco IOS 對應，Practical Test 隨時會考）

```text
! ===== Cisco IOS（Router / Switch 設定 IP 嘅標準流程）=====

enable                        ! 由 user EXEC mode 進入 privileged EXEC mode
configure terminal            ! 進入 global configuration mode（簡稱 config t）
interface g0/0                ! 進入指定 interface 嘅 config mode
ip address 192.168.0.1 255.255.255.0   ! 設定 interface 嘅 IP address 同 subnet mask
no shutdown                   ! 啟動（enable）interface
exit                          ! 返回上一層 mode
show running-config           ! 顯示目前生效嘅設定
show ip interface brief       ! 顯示所有 interface 嘅 IP、狀態（up/down）、protocol

! ===== Cisco IOS 延伸：Router 做 DHCP server（對應 WRS 嘅 DHCP 功能）=====

ip dhcp pool LAN               ! 建立一個 DHCP address pool（名做 LAN）
network 192.168.0.0 255.255.255.0   ! 定義 pool 派發嘅網絡範圍
default-router 192.168.0.1     ! 派俾 client 嘅 default gateway
dns-server 64.100.8.8          ! 派俾 client 嘅 DNS server
ip dhcp excluded-address 192.168.0.1 192.168.0.10  ! 排除唔派俾 client 嘅地址範圍（server/printer 用）
show ip dhcp binding           ! 顯示 DHCP 已派發嘅地址（client MAC ↔ IP）
```

> **CLI command rules:** Cisco IOS commands are case-insensitive but must be spelled correctly; `show` commands are read-only and safe at any time; configuration commands require `configure terminal`. On the PC side, `nslookup` queries the DNS server listed in the client's own IP configuration.

---

## 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| Client 撳 DHCP 之後攞唔到 IP（保持 0.0.0.0 / 空白） | WRS 未 Enable DHCP server、WRS 個 IP / mask 設錯、設定冇 Save | 返 Part 2 檢查 WRS：DHCP Server = Enable、IP = 192.168.0.1、mask = 255.255.255.0，確認撳咗 **Save Settings**；喺 client 重新撳 DHCP 等幾秒 |
| Printer 靜態 IP 設完但 ping 唔到 | 地址填錯位置（例如喺 Global Settings 填咗 IP，而唔係喺 FastEthernet0）；或者 gateway 唔係 192.168.0.1 | 確認 FastEthernet0 嘅 IP = 192.168.0.2、mask = 255.255.255.0；Global Settings 嘅 Gateway = 192.168.0.1、DNS = 64.100.8.8 |
| `nslookup` 出現 "can't find ... Non-existent domain" | DNS server 冇加記錄、hostname 打錯、client 個 DNS server 地址唔啱 | 返 Part 6 檢查 famous.dns.pka 兩條 A record 個名同 IP；用 `ipconfig /all` 確認 client 嘅 DNS Servers = 64.100.8.8 |
| `ping 64.100.8.8` timeout | WRS 設定未 Save、Internet cloud 線路／設備問題、DNS server down | 檢查 WRS 有冇 Save Settings；確認 famous.dns.pka 存在；試 `ping 10.10.10.2` 分辨係 DNS server 定成條路由問題 |
| 用 hostname 開唔到網頁，但用 IP 開到 | DNS 解析失敗（記錄錯／client DNS 設定錯），路由本身冇問題 | 用 `nslookup` 查 hostname；檢查 WRS Static DNS 1 = 64.100.8.8；檢查 DNS server 記錄有冇 Add 成功 |
| `ipconfig /all` 顯示 DHCP Enabled = No／仲係舊 static IP | Client 未切換去 DHCP mode | 喺 Desktop > IP Configuration 撳 **DHCP**，等 DORA 完成再睇 |
| `nslookup` 顯示 "Default Server: Unknown" | Client 冇 DNS server 資料，或者 DNS server 唔 reachable | 先 `ping 64.100.8.8`；確認 DHCP 有派 DNS 64.100.8.8（檢查 WRS Static DNS 1） |
| 改完 WRS 設定但冇反應／唔生效 | 改完冇撳 Save Settings | 每次改完都捲到最底撳 **Save Settings**；IP / mask 要喺 Network Setup 段改 |
| 分數停咗喺 20 / 60 / 68 / 76 唔升 | 對應 Part 未完成或做錯（如 printer IP 錯、WRS 未 save、client 未攞到 DHCP） | 睇住分數逐個 Part 對返：Part 1 = 20、Part 2 = 60、Part 3 = 68、Part 4 = 76、Part 6 完成 = 100 |

---

## 📝 測驗常見題型（Practical Test 應試重點）

### 題型 1 ➔ 靜態 IP 設定（printer / server）

- 必問：**點解 printer 要用 static IP 而唔用 DHCP？**
  答：Home office 嘅電腦要用 printer 嘅 IP 先送到嘢俾佢；static 地址永遠唔變，DHCP 派嘅地址會變（有 lease），一變啲電腦就搵唔到部 printer。
  > Answer points: the printer must use a static (unchanging) IPv4 address because the home office computers need a stable address to send information to it; a DHCP lease could change.
- 設定順序：Global Settings（Gateway = 192.168.0.1、DNS = 64.100.8.8）→ FastEthernet0（IP = 192.168.0.2、mask = 255.255.255.0）。
  > Answer points: static configuration = Global Settings (gateway + DNS) plus Interface settings (IP + subnet mask).

### 題型 2 ➔ DHCP 概念 + 設定

- 必問：**DHCP 流程有邊四步？**
  答：**DORA**——Discover（client broadcast 搵 server）→ Offer（server 提供 IP）→ Request（client 揀定要）→ Acknowledge（server 確認）。Client 出 Discover 同 Request；Server 出 Offer 同 Acknowledge。
  > Answer points: DHCP uses DORA — Discover, Offer, Request, Acknowledge. The client sends Discover and Request; the server replies with Offer and Acknowledge.
- WRS 設定四樣嘢：IP = 192.168.0.1、mask = 255.255.255.0、Enable DHCP Server、Static DNS 1 = 64.100.8.8，最後一定要 **Save Settings**。
  > Answer points: the WRS DHCP configuration needs the LAN IP, subnet mask, an enabled DHCP server, and a static DNS address, then Save Settings.

### 題型 3 ➔ DNS 設定 + 驗證

- A record 格式：**hostname（FQDN）→ IPv4 address**。背熟兩條：`centralserver.pt.pka` → 10.10.10.2；`branchserver.pt.pka` → 64.100.200.1。
  > Answer points: an A record maps a fully qualified hostname to an IPv4 address; both records are configured on famous.dns.pka (64.100.8.8).
- 驗證三步：`ping 64.100.8.8`（連通）→ `nslookup <hostname>`（解析）→ 用 hostname 開網頁（端到端）。
  > Answer points: verify connectivity with ping, then name resolution with nslookup, then end-to-end access by browsing the hostname.

### 題型 4 ➔ 驗證指令輸出解讀

- `ipconfig /all` 要識讀：**DHCP Enabled**（Yes = 用緊 DHCP）、**IPv4 Address**、**Subnet Mask**、**Default Gateway**（192.168.0.1）、**DNS Servers**（64.100.8.8）。
  > Answer points: `ipconfig /all` shows DHCP status, IP, mask, gateway, and DNS servers; all values must match the lab's addressing plan.
- `nslookup` 成功輸出會見到 **Name** + **Address** 兩行；出 "can't find" 就係失敗。
  > Answer points: a successful nslookup prints the Name and its resolved Address; "can't find" means resolution failed.

### 題型 5 ➔ 故障排除場景題（Scenario Questions）

- **Client 攞唔到 IP** → 檢查 WRS：DHCP 有冇 Enable、IP / mask 啱唔啱、有冇 Save Settings。
- **IP 開到網頁但 hostname 開唔到** → DNS 問題：檢查 DNS server 記錄、client 嘅 DNS server 地址。
- **連 IP 都 ping 唔到** → 路由／線路問題：default gateway、Internet cloud、server 本身。
- 關鍵記憶法（必背四條地址）：
  - `192.168.0.1` = default gateway 兼 DHCP server（WRS）
  - `192.168.0.2` = printer（static）
  - `64.100.8.8` = DNS server（famous.dns.pka）
  - `10.10.10.2` = CentralServer；`64.100.200.1` = BranchServer

> **Exam tips:** when answering scenario questions, first classify the failure — addressing (client config), DHCP (server side), DNS (records or server address), or routing (gateway/connectivity). Always quote the exact IPs from the Addressing Table.

---

## ✅ 完成 Checklist（做完 Lab 前對一次）

- [ ] Part 1：Inkjet 設好 static——Gateway 192.168.0.1、DNS 64.100.8.8、FastEthernet0 IP 192.168.0.2 / mask 255.255.255.0（分數 → 20）
- [ ] Part 2：WRS 開咗 DHCP——IP 192.168.0.1、mask 255.255.255.0、DHCP Server Enable、Static DNS 1 = 64.100.8.8、**已 Save Settings**（分數 → 60）
- [ ] Part 3：Home Laptop 撳 DHCP 攞到完整 IP configuration（分數 → 68）
- [ ] Part 4：Tablet 撳 DHCP 攞到完整 IP configuration（分數 → 76）
- [ ] Part 5：用 `10.10.10.2` 同 `64.100.200.1` 開到兩個網站
- [ ] Part 6：famous.dns.pka 加咗 `centralserver.pt.pka` → 10.10.10.2 同 `branchserver.pt.pka` → 64.100.200.1 兩條 A record（分數 → 100）
- [ ] Part 7：`ipconfig /all` 確認 DHCP 派咗 DNS 64.100.8.8；`ping 64.100.8.8` 成功；`nslookup` 兩條 hostname 都解析成功
- [ ] 用 hostname `centralserver.pt.pka` / `branchserver.pt.pka` 開到網頁（最終驗證）

> **Lab complete criteria:** every client obtained a full IP configuration from the WRS, both DNS records resolve correctly with nslookup, and the websites are reachable by hostname — proving DHCP, DNS, and routing all work end to end.
