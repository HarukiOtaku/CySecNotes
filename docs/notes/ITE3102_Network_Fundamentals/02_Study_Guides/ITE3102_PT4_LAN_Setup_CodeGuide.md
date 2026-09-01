# ITE3102 PT4.1 & PT4.2 CodeGuide：Connect a Wired and Wireless LAN / Physical Layer

> 課程：ITE3102 Network Fundamentals ｜ 平台：Cisco Packet Tracer ｜ 用途：實務測驗主戰文件（跟住做就完成實作，記住重點就考到 Practical Test）

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握的實務技能 (Practical Skills)

- 揀啱纜線類型並正確連接設備
  > Select the appropriate cable type and properly connect devices.
- 辨認 Cisco router／switch 嘅管理埠、LAN／WAN 接口同擴充槽
  > Identify the management ports, LAN/WAN interfaces, and expansion slots of internetworking devices.
- 喺熄機狀態下插入／移除擴充模組
  > Interfaces for this router model are not hot-swappable. The device must be turned off before adding or removing modules.
- 用 CLI、ping、網頁瀏覽器驗證連通性
  > Verify connectivity with CLI, ping, and a web browser.

### 所需設備／軟體 (Required Equipment & Software)

- **Software**：Cisco Packet Tracer
- **PT4.1 設備**：Cloud、Cable Modem、Router0、Router1、Wireless Router（無線路由器）、Switch、netacad.pka（伺服器）、Configuration Terminal、Family PC、Home PC
- **PT4.2 設備**：East／West router、Switch1–4、PC1–9、Laptop、TabletPC、AccessPoint
- **纜線類型 (Cable Types)**：Copper Straight-Through（直通線）、Copper Cross-Over（交叉線）、Serial（DCE／DTE）、Coaxial（同軸線）、Console（主控線）、Fiber（光纖線）

### PT4.1 Addressing Table（定址表）

| Device | Interface | IP Address | Connects To |
|---|---|---|---|
| Cloud | Eth6 | N/A | Router0 F0/0 |
| Cloud | Coax7 | N/A | Cable Modem Port0 |
| Cable Modem | Port0 | N/A | Cloud Coax7 |
| Cable Modem | Port1 | N/A | Wireless Router Internet |
| Router0 | Console | N/A | Configuration Terminal RS232 |
| Router0 | F0/0 | 192.168.2.1/24 | Cloud Eth6 |
| Router0 | F0/1 | 10.0.0.1/24 | netacad.pka F0 |
| Router0 | Ser0/0/0 | 172.31.0.1/24 | Router1 Ser0/0 |
| Router1 | Ser0/0 | 172.31.0.2/24 | Router0 Ser0/0/0 |
| Router1 | F1/0 | 172.16.0.1/24 | Switch F0/1 |
| Wireless Router | Internet | 192.168.2.2/24 | Cable Modem Port1 |
| Wireless Router | Eth1 | 192.168.1.1 | Family PC F0 |
| Family PC | F0 | 192.168.1.102 | Wireless Router Eth1 |
| Switch | F0/1 | 172.16.0.2 | Router1 F1/0 |
| netacad.pka | F0 | 10.0.0.254 | Router0 F0/1 |
| Configuration Terminal | RS232 | N/A | Router0 Console |

---

## 🛠️ 解題步驟拆解 (Walkthrough)

### PT4.1 — Part 1: Connect to the Cloud（連接去 Cloud）

**Step 1: 連接 Cloud 到 Router0**
> Connect the cloud to Router0. Choose the correct cable to connect Router0 F0/0 to Cloud Eth6.

1 ➔ 喺畫面左下角按橙色閃電 icon（Connections）打開纜線選擇面板。
2 ➔ 揀 **Copper Straight-Through（直通線）**，先㩒 Router0 嘅 **F0/0**，再㩒 Cloud 嘅 **Eth6**。
3 ➔ 接啱嘅話，纜線兩端 link light 會變 **綠色**；冇變綠就代表揀錯線或接口錯。
> Cloud is a type of switch, so use a Copper Straight-Through connection.

**Step 2: 連接 Cloud 到 Cable Modem**
> Choose the correct cable to connect Cloud Coax7 to Modem Port0.

1 ➔ 揀 **Coaxial（同軸）纜線**，接 Cloud 嘅 **Coax7** → Cable Modem 嘅 **Port0**。
2 ➔ 燈變綠即成功。

### PT4.1 — Part 2: Connect Router0（連接 Router0）

**Step 1: Router0 到 Router1（Serial 線）**
> Choose the correct cable to connect Router0 Ser0/0/0 to Router1 Ser0/0. Use one of the available Serial cables.

1 ➔ 揀 **Serial** 纜線，接 Router0 嘅 **Ser0/0/0** → Router1 嘅 **Ser0/0**。
2 ➔ Serial 線有 DCE／DTE 之分，接駁次序有影響（見 Error 表）；燈變綠即成功。

**Step 2: Router0 到 netacad.pka（Cross-Over 交叉線）**
> Choose the correct cable to connect Router0 F0/1 to netacad.pka F0.

1 ➔ 揀 **Copper Cross-Over（交叉線）**，接 Router0 嘅 **F0/1** → netacad.pka 嘅 **F0**。
2 ➔ 點解用交叉線：Router 同 PC 都係 DTE（Data Terminal Equipment），大家都用 1、2 傳輸（transmit）、3、6 接收（receive），交叉線先至令兩邊嘅 TX 對 RX。
> Routers and computers traditionally use the same wires to transmit (1 and 2) and receive (3 and 6). The correct cable to choose consists of these crossed wires.
3 ➔ 重點：呢兩部機嘅 NIC 冇 autosensing，唔可以靠自動偵測，一定要用交叉線。
> Although many NICs can now autosense which pair is used to transmit and receive, Router0 and netacad.pka do not have autosensing NICs.

**Step 3: Router0 到 Configuration Terminal（Console 線）**
> Choose the correct cable to connect Router0 Console to Configuration Terminal RS232.

1 ➔ 揀 **Console** 纜線，接 Router0 嘅 **Console** port → Configuration Terminal 嘅 **RS232**。
2 ➔ 呢條線嘅 link light 會變 **黑色**，係正常現象！
> This cable does not provide network access to Configuration Terminal, but allows you to configure Router0 through its terminal.

### PT4.1 — Part 3: Connect Remaining Devices（連接其餘設備）

**Step 1: Router1 到 Switch**
> Choose the correct cable to connect Router1 F1/0 to Switch F0/1.

1 ➔ 揀 Copper Straight-Through，接 Router1 嘅 **F1/0** → Switch 嘅 **F0/1**。
2 ➔ 燈會先 amber 後變綠，要等幾秒（STP 收斂中）。
> Allow a few seconds for the light to transition from amber to green.

**Step 2: Cable Modem 到 Wireless Router**
> Choose the correct cable to connect Cable Modem Port1 to Wireless Router Internet port.

1 ➔ 揀 Copper Straight-Through，接 Cable Modem 嘅 **Port1** → Wireless Router 嘅 **Internet** port。
2 ➔ 燈變綠即成功。

**Step 3: Wireless Router 到 Family PC**
> Choose the correct cable to connect Wireless Router Ethernet 1 to Family PC.

1 ➔ 揀 Copper Straight-Through，接 Wireless Router 嘅 **Ethernet 1** → Family PC。
2 ➔ 燈變綠即成功。

### PT4.1 — Part 4: Verify Connections（驗證連通）

**Step 1: Family PC → netacad.pka**
> Test the connection from Family PC to netacad.pka.

1 ➔ 㩒 Family PC → Desktop → Command Prompt。
2 ➔ 打 `ping netacad.pka`，見到回覆即通。
3 ➔ 開 Web Browser，入網址 `http://netacad.pka`，應該見到網頁。

**Step 2: Home PC → Switch**
> Ping the Switch IP address to verify the connection.

1 ➔ 開 Home PC 嘅 Command Prompt，打 `ping 172.16.0.2`（即 Switch 嘅管理 IP）。

**Step 3: 用 Configuration Terminal 睇 Router0**
> Open Router0 from Configuration Terminal.

1 ➔ 㩒 Configuration Terminal → Terminal，直接按 Enter 用預設設定。
2 ➔ 再按 Enter 會見到 Router0 嘅 command prompt。
3 ➔ 打 `show ip interface brief` 檢查接口狀態。
> Type show ip interface brief to view interface statuses.

### PT4.1 — Part 5: Examine the Physical Topology（檢查實體拓撲）

> Click the Physical Workspace tab or press Shift+P and Shift+L to toggle between the logical and physical workspaces.

1 ➔ 按 **Physical Workspace** tab，或者直接按 **Shift+P**（切去實體）／**Shift+L**（切返邏輯）。
2 ➔ 㩒 **Home City** icon → 㩒 **Cloud** icon，回答問題：
   - **「藍色機櫃（blue rack）內 switch 有幾多條線？」** 答題要點：逐個 port 數清楚；參考答案（視 .pka 版本）約 6 條，以你實際數到嘅為準。
3 ➔ 㩒 **Primary Network** icon，將滑鼠指喺啲纜線上，回答：
   - **「藍色機櫃右邊張枱有咩設備？」** 答題要點：睇清楚設備外形（router／server），以你實際畫面為準。
4 ➔ 㩒 **Secondary Network** icon，回答：
   - **「點解每部設備都有兩條橙色線？」** 參考答案：**冗餘／備援（redundancy）**，用嚟防止單點故障（single point of failure）。
5 ➔ 㩒 **Home Network** icon，回答：
   - **「點解呢度冇機櫃（rack）？」** 參考答案：**家庭網絡**規模細、設備少，直接放喺枱面／櫃上，唔需要機櫃。
6 ➔ 㩒 **Logical Workspace** tab 返回邏輯拓撲。

### PT4.2 — Part 1: Identify Physical Characteristics（辨認設備實體特徵）

**Step 1: 認出 router 嘅管理埠**
> Identify the management ports of a Cisco router.

1 ➔ 㩒 East router，Physical tab 要 active；放大並拉大視窗睇成部機。
2 ➔ 問題：「有咩 management ports 可用？」參考答案：**Console** 同 **AUX** port。

**Step 2: 認出 LAN／WAN 接口**
> Which LAN and WAN interfaces are available on the East router and how many are there?

1 ➔ 問題：「East router 有咩 LAN／WAN interfaces，各有幾多個？」參考答案：LAN＝GigabitEthernet0/0、GigabitEthernet0/1（2 個）；WAN＝Serial0/0/0、Serial0/0/1（2 個）。
2 ➔ 㩒 CLI tab → 按 Enter 入 user mode → 打 `show ip interface brief`。
> The output verifies the correct number of interfaces and their designation. The vlan1 interface is a virtual interface that only exists in software.
3 ➔ 問題：「list 出嚟有幾多個 physical interfaces？」答：**4 個**（Vlan1 唔算，佢係 virtual interface，只存在喺 software）。

**Step 3: 查 interface bandwidth**
> East> show interface gigabitethernet 0/0

1 ➔ 打 `show interface gigabitethernet 0/0` → 問題：「呢個 interface 嘅 default bandwidth 係幾多？」答：**1000000 Kbit**。
2 ➔ 打 `show interface serial 0/0/0` → 問題：「default bandwidth 係幾多？」答：**1544 Kbit**。
> Bandwidth on serial interfaces is used by routing processes to determine the best path to a destination. It does not indicate the actual bandwidth of the interface. Actual bandwidth is negotiated with a service provider.

**Step 4: 數擴充槽（expansion slots）**
1 ➔ 問題：「East router 有幾多個 expansion slots 加模組？」參考答案：**4 個**（視乎型號，以你部機為準）。
2 ➔ 㩒 Switch2 → 問題：「有幾多個 expansion slots？」（同上，數清楚先答）。

### PT4.2 — Part 2: Select Correct Modules（揀啱擴充模組）

**Step 1: 揀 router 模組（唔使買 switch 就接 3 部 PC）**
> Which module can you use to connect the three PCs to the East router?

1 ➔ 㩒 East → Physical tab → 左邊 Modules 下面逐個㩒，睇圖片同描述。
2 ➔ 問題：「要用咩模組先可以將 PC1、2、3 接入 East router？」參考答案：**HWIC-4ESW（4-port Ethernet switch module，4 埠交換模組）**。
3 ➔ 問題：「呢個模組可以接幾多部 host？」答：**4 部**。
> How many hosts can you connect to the router using this module?

**Step 2: 揀 switch 模組（Gigabit 光纖連接）**
> Which module can you insert to provide a Gigabit optical connection to Switch3?

1 ➔ 問題：「Switch2 要插咩模組先可以同 Switch3 做 Gigabit optical（光纖）連接？」參考答案：**Gigabit Ethernet SFP 光纖模組（HWIC-1GE-SFP）**，接線用 **Fiber** 纜線。

**Step 3: 插入模組（一定要熄機！）**
> The Cannot add a module when the power is on message should display. Interfaces for this router model are not hot-swappable.

1 ➔ 㩒 East，嘗試插入模組 → 會彈出錯誤：**Cannot add a module when the power is on**（證明唔可以熱插拔）。
2 ➔ 㩒 Cisco logo 右邊嘅 **power switch** 熄機 → 拖模組入空 slot → 再㩒 power switch 開機。
3 ➔ 插錯模組想移除：將模組**拖落右下角佢嘅圖片**再放開滑鼠。
> If you insert the wrong module and need to remove it, drag the module down to its picture in the bottom right corner, and release the mouse button.
4 ➔ 用同一方法，將 Step 2 揀嘅光纖模組插入 **Switch2 最右邊嘅空 slot**。
5 ➔ 喺 Switch2 打 `show ip interface brief` 確認新 interface（如 GigabitEthernet5/1），由 interface 編號判斷模組插咗入邊個 slot。
> Use the show ip interface brief command on Switch2 to identify the slot in which the module was placed.

### PT4.2 — Part 3: Connect Devices（接線）

接線三原則（跟足就會加分）：
> 1. Select the appropriate cable type.
> 2. Click the first device and select the specified interface.
> 3. Click the second device and select the specified interface.
> If you have correctly connected two devices, you will see your score increase.

**例：** East **GigabitEthernet0/0** → Switch1 **GigabitEthernet0/1** 用 Copper Straight-Through；接啱分數會升到 4/55。

PT4.2 完整接線表（跟表做，一次過攞分）：

| Device | Interface | Cable Type | Device | Interface |
|---|---|---|---|---|
| East | GigabitEthernet0/0 | Copper Straight-Through | Switch1 | GigabitEthernet0/1 |
| East | GigabitEthernet0/1 | Copper Straight-Through | Switch4 | GigabitEthernet0/1 |
| East | FastEthernet0/1/0 | Copper Straight-Through | PC1 | FastEthernet0 |
| East | FastEthernet0/1/1 | Copper Straight-Through | PC2 | FastEthernet0 |
| East | FastEthernet0/1/2 | Copper Straight-Through | PC3 | FastEthernet0 |
| Switch1 | FastEthernet0/1 | Copper Straight-Through | PC4 | FastEthernet0 |
| Switch1 | FastEthernet0/2 | Copper Straight-Through | PC5 | FastEthernet0 |
| Switch1 | FastEthernet0/3 | Copper Straight-Through | PC6 | FastEthernet0 |
| Switch4 | GigabitEthernet0/2 | Copper Cross-Over | Switch3 | GigabitEthernet3/1 |
| Switch3 | GigabitEthernet5/1 | Fiber | Switch2 | GigabitEthernet5/1 |
| Switch2 | GigabitEthernet3/1 | Copper Straight-Through | AccessPoint | Port 0 |
| East | Serial0/0/0 | Serial DCE（先接 East） | West | Serial0/0/0 |
| Switch2 | FastEthernet0/1 | Copper Straight-Through | PC7 | FastEthernet0 |
| Switch2 | FastEthernet1/1 | Copper Straight-Through | PC8 | FastEthernet0 |
| Switch2 | FastEthernet2/1 | Copper Straight-Through | PC9 | FastEthernet0 |

注意：呢個 activity 嘅 link lights 係 **disabled**，接啱唔會見到燈，靠 score 判斷。
> Note: For the purposes of this activity, link lights are disabled.

### PT4.2 — Part 4: Check Connectivity（檢查連通）

**Step 1: 檢查 East 接口狀態**
> Check the interface status on East.

1 ➔ 㩒 East → CLI tab → 打 `show ip interface brief`。
2 ➔ 同教材輸出比對，全部一致即接線正確：

```text
Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0     172.30.1.1      YES manual up                    up
GigabitEthernet0/1     172.31.1.1      YES manual up                    up
Serial0/0/0            10.10.10.1      YES manual up                    up
Serial0/0/1            unassigned      YES unset  down                  down
FastEthernet0/1/0      unassigned      YES unset  up                    up
FastEthernet0/1/1      unassigned      YES unset  up                    up
FastEthernet0/1/2      unassigned      YES unset  up                    up
FastEthernet0/1/3      unassigned      YES unset  up                    down
Vlan1                  172.29.1.1      YES manual up                    up
```

3 ➔ 讀表重點：`Status up / Protocol up`＝連通；`up / down`＝接口啟動咗但對端冇設備（例如 FastEthernet0/1/3 冇接線）；`down / down`＝未啟動或未接線。

**Step 2: 連接無線設備（Laptop／TabletPC）**
> Click the Laptop and select the Config Tab. Select the Wireless0 interface. Put a check in the box labeled On next to Port Status.

1 ➔ 㩒 Laptop → **Config** tab → 揀 **Wireless0** interface → 喺 **Port Status** 旁邊剔 **On**，幾秒內會出現無線連接。
2 ➔ **Desktop** tab → Web Browser → 入 `www.cisco.pka` → 應該顯示 Cisco Packet Tracer 頁面。
3 ➔ TabletPC 重複以上步驟驗證網頁。

**Step 3: TabletPC 轉用 3G/4G**
> Change the access method of the TabletPC.

1 ➔ TabletPC → Config tab → Wireless0 → **取消**剔 On（無線連接會斷）。
2 ➔ 㩒 **3G/4G Cell1** interface → 剔 On，幾秒內出現 cellular（流動網絡）連接。
3 ➔ 再開瀏覽器驗證網頁。
> You should not have both the wireless0 interface and 3G/4G Cell1 interfaces active at the same time. This may cause confusion to the device when attempting to connect to some resources.

**Step 4: 其他 PC**
> All of the PCs should have connectivity to the web site and each other.

1 ➔ 所有 PC 都應該連到網站同互相連通；之後嘅 lab 會教你更多 connectivity testing。

---

## 💻 關鍵 CLI 指令庫

> 每行指令都加咗繁中註解；PT4.1 主要用 PC 嘅命令，PT4.2 主要用 Cisco IOS CLI。

### Router／Switch（Cisco IOS CLI）— PT4.1 & PT4.2

```text
show ip interface brief            ; 檢查所有接口狀態（Status/Protocol 都係 up 先至算連通）
show interface gigabitethernet 0/0 ; 睇 GigabitEthernet0/0 詳細資料（包括 default bandwidth = 1000000 Kbit）
show interface serial 0/0/0        ; 睇 Serial0/0/0 詳細資料（包括 default bandwidth = 1544 Kbit）
```

### PC／伺服器（Windows Command Prompt）— PT4.1

```text
ping netacad.pka                   ; 測試到 netacad.pka 伺服器嘅連通性（ping 通 = IP 層 OK）
ping 172.16.0.2                    ; 測試到 Switch 管理 IP 嘅連通性
```

### 無線設備（Packet Tracer GUI 操作）— PT4.2

```text
Config tab > Wireless0 > Port Status > On      ; 開啟無線介面（幾秒內出現無線連接）
Config tab > 3G/4G Cell1 > Port Status > On    ; 開啟流動網絡介面（同 Wireless0 只可以開一個）
```

### 延伸：Practical Test 常見加分指令（教材以外，但好大機會用到）

```text
enable                             ; 由 user mode 進入 privileged exec mode
configure terminal                 ; 進入 global configuration mode
interface gigabitethernet 0/0      ; 進入接口設定模式
ip address 192.168.1.1 255.255.255.0 ; 設定接口 IP 地址同 subnet mask
no shutdown                        ; 啟動接口（Cisco 接口預設 shutdown）
ipconfig                           ; 喺 PC 度睇 IP／subnet mask／default gateway
arp -a                             ; 喺 PC 度睇 ARP table（IP 同 MAC 嘅對應）
```

---

## 🐞 常見 Error 與 Debug

| Error／問題 | 原因 | Fix |
|---|---|---|
| 纜線 link light 唔著／唔變綠 | 揀錯纜線類型或揀錯接口 | Router↔PC、PC↔PC 用 Cross-Over；Router↔Switch、Switch↔PC 用 Straight-Through；Serial 接線要用 Serial 線 |
| Console 線燈變黑 | 正常！Console 線唔傳網絡數據，只做設備管理 | 唔使修；黑燈代表接啱咗 |
| 燈由 amber 變綠好慢 | STP（Spanning Tree Protocol）收斂緊 | 等幾秒再睇，唔使重接 |
| Cannot add a module when the power is on | 呢款 router 嘅接口唔係 hot-swappable | 㩒 power switch 熄機 → 插入模組 → 開機 |
| 插錯模組 | 揀錯模組型號 | 將模組拖落右下角佢嘅圖片再放開即可移除 |
| `show ip interface brief` 顯示 down/down | 接口 shutdown 或者根本冇接線 | 有線就接啱線；冇線就入 interface 打 `no shutdown` |
| 顯示 up/down | 接口啟動咗但對端冇設備／冇接線（例如 FastEthernet0/1/3） | 接正確纜線後會變 up/up，係正常現象 |
| ping 唔通 | 纜線、接口、IP 三樣任何一樣錯 | 順序檢查：link light → `show ip interface brief` → IP／subnet 有冇打錯 |
| Serial 接線後冇連結 | DCE／DTE 次序或 clocking 問題 | 本實作 DCE 端（East）要第一個接 |
| Laptop／TabletPC 連唔到 Wi-Fi | Wireless0 嘅 Port Status 未剔 On | Config tab → Wireless0 → 剔 On |
| 兩個無線介面同時開 | Wireless0 同 3G/4G Cell1 同時 active | 只開一個，避免設備 routing 混亂 |
| PT4.2 接啱但冇燈 | 呢個 activity 故意 disabled 咗 link lights | 用 score 判斷，唔好用燈 |
| Router0 同 netacad.pka 之間用直通線唔通 | 兩部都係 DTE，冇 autosensing NIC | 一定要用 Copper Cross-Over 交叉線 |

---

## 📝 測驗常見題型 (Practical Test 重點)

**題型 1：揀纜線（最常考！）**
- 必記規則：**唔同類型設備**（Router↔Switch、Switch↔PC）→ Straight-Through；**同類設備**（Router↔Router、Switch↔Switch、Router↔PC）→ Cross-Over。
- Serial 線用嚟接 WAN；Console 線用嚟管理；Coaxial 接 Cable Modem；Fiber 接光纖模組。
- 答題金句：
  > Use a straight-through cable between unlike devices and a crossover cable between like devices.

**題型 2：`show ip interface brief` 讀表**
- 答題要點：數 physical interfaces 時要**剔除 Vlan1**（virtual interface，只存在喺 software）。
- Status／Protocol 四種組合：`up/up`（正常連通）、`up/down`（冇對端設備）、`down/down`（shutdown 或未接線）。

**題型 3：bandwidth 數值**
- GigabitEthernet = **1000000 Kbit**；Serial = **1544 Kbit**。
- 必背概念：
  > Serial bandwidth is used by routing processes to determine the best path; it does not indicate the actual bandwidth of the interface. Actual bandwidth is negotiated with a service provider.

**題型 4：擴充模組**
- Router 加 **HWIC-4ESW**（4-port switch module）可以唔買 switch 就接最多 **4 部** PC。
- 光纖連接要 **Gigabit SFP 模組**；插模組前一定要**熄機**（not hot-swappable）。
- 用 `show ip interface brief` 由 interface 編號（如 GigabitEthernet5/1）判斷模組插咗入邊個 slot。

**題型 5：ping 驗證**
- ping 成功＝雙方 IP 層連通；用主機名（netacad.pka）ping 到即 DNS 都正常。
- 答題金句：
  > A successful ping confirms IP-layer connectivity between the source and destination.

**題型 6：Physical Topology 問答（錄入答案，字眼要啱）**
- 兩條橙色線 → **redundancy（冗餘／備援）**。
- 家庭網絡冇機櫃 → **規模細、設備放枱面，唔需要機櫃**。
- 藍色機櫃 switch 嘅線數、枱面設備 → 喺 Physical view 實際數／睇清楚先答，以你嘅 .pka 版本為準。

**作答注意**：PT4.2 嘅分數係「Packet Tracer 自動評分＋你錄入嘅文字答案」混合計算，記得逐條問題答，唔好漏。
> Scoring for this activity is a combination of Packet Tracer-automated scoring and your recorded answers to the questions posed in the instructions.

---

## 🔗 理論 recap

1. 佈線係 Physical Layer（Layer 1）嘅工作：揀啱纜線類型先至有連結。
   > The physical layer defines the media type, connectors, and how bits are transmitted between devices.
2. 直通線（Straight-Through）用喺唔同類型設備之間；交叉線（Cross-Over）用喺同類設備之間。
3. Router 同 PC 都係 DTE，用同一對線傳輸／接收，所以 Router↔PC 一定要用交叉線；冇 autosensing 嘅 NIC 尤其要記住。
4. Console 線只做設備管理，唔會傳網絡數據（link light 黑色係正常）。
5. `show ip interface brief` 係檢查接口狀態嘅最重要指令：`up/up` 先至代表連通。
6. Serial 線有 DCE／DTE 之分，DCE 提供 clocking；Serial 嘅 bandwidth 只係 routing 計算用嘅值，唔代表實際速度。
7. Router／Switch 嘅擴充模組唔係 hot-swappable，一定要熄機先插得。
8. 無線設備要喺 Config tab 開 Port Status（Wireless0 或 3G/4G Cell1）先會連到網絡，兩個介面唔可以同時開。
