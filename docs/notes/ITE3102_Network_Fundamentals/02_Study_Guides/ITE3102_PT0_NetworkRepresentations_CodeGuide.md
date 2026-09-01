# ITE3102 PT0: Network Representations — 雙語實務 CodeGuide

> 本文件為「實務測驗主戰文件」：學生只靠呢份文件就應該可以喺 Packet Tracer 完成 PT0 實作並應付 Practical Test。所有步驟解說用香港繁體中文；核心定義、Cisco CLI 指令同答題重點用英文 Blockquote 標準句。英文專有名詞（Cisco IOS、CLI、router、switch、ARP、DHCP、subnet 等）全部保留原文。

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握的實務技能 (Practical Skills)

| 技能 | 繁中解說 | 英文標準句 |
|------|----------|------------|
| 認識 Packet Tracer 用途 | Packet Tracer 係一個網絡模擬器，可以起模擬網絡、設定裝置、測試網絡同觀察網絡流量 | > "Packet Tracer is a network simulator that allows you to create a simulated network, configure the devices in the network, test the network, and examine the traffic in the network." |
| 認識 Logical Workplace 與 Realtime mode | 開啟 Packet Tracer 後預設顯示 Logical Workplace（邏輯工作區），運行喺 Realtime mode（即時模式） | > "When Packet Tracer starts, it presents a Logical Workplace in Realtime mode." |
| 從 Device Group 揀選裝置 | 左下角裝置分類：Network Devices（Routers / Switches / Hubs）與 End Devices（Server / IP Phone / PC 等） | > "The bottom left portion shows [Network Devices]-[Routers] group selected by default." |
| 放置裝置到工作區 | 喺右邊揀型號，再喺 Logical Workplace 中間位置 click 放置 | > "Select an 1841 Router on the right. Point to the middle of the logical workplace and click to place a router there." |
| 用 Auto Connect 自動連接 | 用 Connections 嘅 Auto Connection 符號，系統自動按裝置可用接口揀 connection type（連接類型） | > "The first specific type will automatically choose connection type based on the interfaces available on the devices." |
| 用 Check Results 檢查分數 | 撳 [Check Results] 再睇 [Assessment Items] 分頁檢查評分項目 | > "Click [Check Results] button and then [Assessment Items] tab." |

### 所需設備/軟體 (Equipment & Software)

| 項目 | 說明 |
|------|------|
| Cisco Packet Tracer | Cisco 官方網絡模擬軟件（本 Lab 唯一所需軟件） |
| 1841 Router | Cisco 1841 系列 router，放喺 Logical Workplace 中間 |
| 2960-24TT Switch | Cisco Catalyst 2960-24TT switch，放喺 router 左邊 |
| Hub-PT | Generic Hub（Generic 泛用型 hub），放喺 router 右邊 |
| Server-PT | Generic Server，放喺 Logical Workplace |
| 7960 IP Phone | Cisco 7960 IP Phone，放喺 Logical Workplace |
| PC-PT | Generic PC，放喺 Logical Workplace |

> "Reference: Cisco Networking Academy, CCNA"

---

## 🛠️ 解題步驟拆解 (Walkthrough)

> 原文步驟：Step 1. Explore the PT interface ➔ Step 2. Selecting and Placing Devices ➔ Step 3. Connect the devices using auto connect ➔ Step 4. Packet Tracer Scoring
> （教材含少量 XML 殘留雜訊，例如 `(28, 57, 64, 71, 100)`，係評分項目嘅零碎資料，可忽略，唔影響實作。）

### Step 1 ➔ 探索 Packet Tracer 介面 (Explore the PT interface)

1 ➔ 啟動 Cisco Packet Tracer，程式會自動開一個新 Logical Workplace（邏輯工作區）。
2 ➔ 確認右下角狀態顯示 Realtime mode（即時模式）——即係網絡會即時運作，唔係 Simulation mode（模擬模式）。
3 ➔ 留意左下角預設揀咗 [Network Devices] ➔ [Routers] 分類，代表而家可以喺右邊揀 router 型號。

> "When Packet Tracer starts, it presents a Logical Workplace in Realtime mode. The bottom left portion shows [Network Devices]-[Routers] group selected by default."

**記憶要點：** Logical Workplace = 畫裝置圖嘅平面；Realtime mode = 網絡即時執行。裝置分類分組喺左下角，型號清單喺右邊。

### Step 2 ➔ 揀選與放置裝置 (Selecting and Placing Devices)

1 ➔ 保持 [Network Devices] ➔ [Routers] 揀選狀態，喺右邊裝置清單揀 **1841 Router**。
2 ➔ 將滑鼠指去 Logical Workplace 中間位置，click 一下放置 router。
3 ➔ 喺左下角轉去揀 [Switches] 分類，喺右邊揀 **2960-24TT** switch，click 放喺 router 嘅**左邊**。
4 ➔ 喺左下角轉去揀 [Hubs] 分類，揀 Generic **Hub-PT**，click 放喺 router 嘅**右邊**。
5 ➔ 喺左下角轉去揀 [End Devices] 分類，依次放置 **Server-PT**、**7960 IP Phone** 同 **PC-PT** 到 Logical Workplace 任何位置。

> "Select [End Devices] group on the bottom left. Put a Generic [Server-PT], a [7960 IP Phone] and a Generic [PC-PT] to the logical workplace."

**位置口訣：** Switch 左、Router 中、Hub 右（記得 hub 喺 router 右邊，唔好放錯邊）。裝置型號要揀啱（1841 / 2960-24TT / Hub-PT / Server-PT / 7960 / PC-PT），揀 Generic 或錯型號會令 Assessment Items 扣分。

### Step 3 ➔ 用 Auto Connect 連接裝置 (Connect the devices using auto connect)

1 ➔ 喺左下角 click [Connections] 分類。
2 ➔ 第一個連接類型會係 **Auto Connection**（自動連接）：系統會根據兩部裝置嘅可用接口，自動幫你揀啱嘅 connection type（例如 copper straight-through、copper cross-over 或 fiber）。
3 ➔ 按呢個次序連接「每部裝置連去佢右邊嗰部」：由 **Server** 開始，Server ➔ 下一部（右邊）裝置，一直連落去。
4 ➔ 每次連接步驟：click Auto Connection 符號 ➔ click 第一部裝置 ➔ click 第二部裝置，綠色連接線出現即代表成功。

> "Click on the [Connections] group on the bottom left. The first specific type will automatically choose connection type based on the interfaces available on the devices. To connect two devices click the auto connection symbol, click the first device, and then click the second device. Starting with the server, connect each device to the device to its right using the auto connection symbol."

**記憶要點：** Auto Connect = 由系統代揀線材類型，唔使自己諗用直線定交叉線。連接時一定要「先 click 裝置一，再 click 裝置二」，次序反轉一樣連到，但方向會影響之後嘅 traffic 流向理解。

### Step 4 ➔ 用 Packet Tracer Scoring 檢查分數 (Packet Tracer Scoring)

1 ➔ 完成放置同連接後，喺 Packet Tracer 視窗撳 [Check Results] 按鈕。
2 ➔ 喺彈出視窗撳 [Assessment Items] 分頁。
3 ➔ 逐項睇評分項目（例如：裝置型號啱唔啱、數量夠唔夠、連接有冇齊），未過嘅項目會有紅色/未完成標記，過咗嘅會顯示綠色/分數。
4 ➔ 如有項目未完成，返去 Step 2 / Step 3 修正（例如補放裝置、補連接），再返嚟重新 Check Results，直到全部分數齊。

> "To check your configuration, click [Check Results] button and then [Assessment Items] tab."

**實戰貼士：** 評分項目（Assessment Items）係 Practical Test 嘅「題目清單」——考試時一開 Check Results 就知自己要補啲咩，唔好估。見紅色項目就逐個修正，攞滿分先收手。

---

## 💻 關鍵 CLI 指令庫

> 本 Lab（PT0 Network Representations）主要係 GUI 操作，教材本身冇 ROUTER CONFIG 段落，所以**唔需要打任何 CLI 指令**。但 Practical Test 好可能喺 PT0 嘅延伸題叫你幫裝置設 IP 或者做連通性測試，下面指令庫照背照用。

### A. 本 Lab 常用（Windows 主機 / Packet Tracer 內 PC）

```text
ipconfig                      # 顯示 PC 嘅 IP 設定（IPv4 Address、Subnet Mask、Default Gateway、DNS）
ipconfig /all                 # 顯示更詳細設定（含 MAC Address / Physical Address）
ping 192.168.1.1              # 測試本機去目標 IP 嘅連通性（通就見到 Reply from ...）
ping -t 192.168.1.1           # 持續 ping（按 Ctrl+C 停止），適合測試網絡穩定
```

### B. Cisco IOS 基本指令（router / switch 用，後續 Lab 必用）

```text
enable                        # 由 user EXEC mode 進入 privileged EXEC mode（特權模式，提示符變 #）
configure terminal            # 進入 global configuration mode（全域設定模式，提示符變 (config)#）
hostname R1                   # 設定裝置名稱（例如將 router 改名做 R1）
interface gigabitEthernet0/0  # 進入指定接口嘅設定模式（例如 GigabitEthernet0/0）
ip address 192.168.1.1 255.255.255.0   # 為接口設定 IPv4 address 同 subnet mask
no shutdown                   # 啟動接口（預設接口係 shutdown 狀態，唔打呢句唔通）
exit                          # 返回上一層模式（例如由 interface 模式返去 global config 模式）
show ip interface brief       # 顯示所有接口嘅 IP 同 up/down 狀態（答題檢查用）
show running-config           # 顯示目前 running configuration（running-config 即裝置現行設定）
show arp                      # 顯示 ARP table（ARP 表：IP 與 MAC address 對應關係）
copy running-config startup-config   # 儲存設定（save 落 startup-config，重啟唔會冇咗）
```

### C. 答題必背指令組合（router 設 IP 完整流程）

```text
enable
configure terminal
interface gigabitEthernet0/0
ip address 192.168.1.1 255.255.255.0
no shutdown
exit
show ip interface brief
```

> "To configure an IP address on an interface: enter global configuration mode, select the interface, assign the IP address with a subnet mask, bring the interface up with no shutdown, then verify with show ip interface brief."

**記憶要點：** 設定順序口訣「**en ➔ conf t ➔ int ➔ ip addr ➔ no shut ➔ show**」。`no shutdown` 最容易漏，漏咗接口會一直 down，ping 唔通。`show ip interface brief` 係考場「檢查答案」嘅第一武器。

---

## 🐞 常見 Error 與 Debug

| Error/問題 | 原因 | Fix |
|------------|------|-----|
| 喺右邊揾唔到 1841 Router | 揀錯咗 device group（例如仲喺 [End Devices]） | 左下角轉返去 [Network Devices] ➔ [Routers] 先再睇右邊清單 |
| 裝置放咗落嚟但 Assessment Items 扣分 | 型號揀錯（用咗 Generic 而非 1841 / 2960-24TT），或者位置/數量唔啱 | 刪走錯裝置，重新按指定型號放置；對返 Step 2 清單逐項核對 |
| Auto Connection click 完冇綠色線 | 裝置已經有連接，或者 click 咗嘅位置唔係裝置本體 | 用 Selection 工具移開其他線/裝置，重新「click 裝置一 ➔ click 裝置二」；或者刪走舊線重連 |
| 連接線顏色/類型怪異，或者連唔到 | 裝置接口類型唔啱（例如 router 得 serial 接口，而另一端只有 Ethernet） | Auto Connect 會自動揀；如手動揀線，揀啱 connection type（copper straight-through 一般用喺唔同層級裝置之間） |
| Check Results 見到紅色項目 | 有裝置未放置、型號錯、或者連接未齊 | 睇返 Assessment Items 每項描述，逐項修正後再撳 Check Results，直至全部過 |
| 延伸題：PC ping 唔通 router | PC 未設 IP / gateway，或者 router 接口未 `no shutdown` | PC 開 Desktop ➔ IP Configuration 設 IP 同 Default Gateway；router 接口確認 `no shutdown` |
| 延伸題：`ping` 出 `Request timed out` | 目標 IP 錯、線未連好、或者裝置未啟動（燈唔閃） | 用 `ipconfig` 睇自己 IP，用 `show ip interface brief` 睇對方接口狀態，再 ping 一次 |
| 唔記得點開 Check Results | 教材步驟唔熟 | 記住：完成實作後一律撳 [Check Results] ➔ [Assessment Items] 做最後檢查 |

> "Always finish a lab by verifying the score: click Check Results, review Assessment Items, fix every red item, and re-check until the score is complete."

---

## 📝 測驗常見題型 (Exam Question Patterns)

| 題型 | 可能點考 | 答題要點 |
|------|----------|----------|
| 概念題：Packet Tracer 係咩 | 一句講出 Packet Tracer 嘅功能 | 答「網絡模擬器，可以 create、configure、test 同 examine traffic」——照教材英文句背 |
| 概念題：Realtime mode 同 Logical Workplace | 問開啟 PT 後預設係咩模式/工作區 | 答「Logical Workplace，Realtime mode」 |
| 操作題：放置裝置 | 指定放某型號裝置到某位置 | 記住分類對應：1841 = Routers、2960-24TT = Switches、Hub-PT = Hubs、Server-PT / 7960 IP Phone / PC-PT = End Devices；位置：Switch 左、Router 中、Hub 右 |
| 操作題：Auto Connect | 叫你用自動連接將裝置連成 chain | 步驟口訣「Connections ➔ Auto Connection ➔ click 裝置一 ➔ click 裝置二」，由 Server 開始連去右邊 |
| 操作題：檢查分數 | 叫你 Check Results 睇 Assessment Items | 撳 [Check Results] ➔ [Assessment Items]，逐項修正到滿分 |
| 延伸題：設 IP 同測連通 | 可能叫你幫 PC 設 IP 再 ping router | PC 用 GUI（IP Configuration）或 `ipconfig`；測試用 `ping`；router 檢查用 `show ip interface brief` |
| 延伸題：睇 ARP table | 可能問 IP 與 MAC 對應點睇 | router/switch 用 `show arp`；PC 用 `arp -a` |

> "Exam key points: know the device groups, place the exact device models, connect with auto connect from the server to its right, and verify with Check Results / Assessment Items."

---

## 🔗 理論 Recap (Theory Recap)

1. Packet Tracer 係 Cisco 網絡模擬器：起網、設網、測網、睇流量，全部喺一個軟件做晒。> "Packet Tracer is a network simulator..."
2. Logical Workplace 係邏輯視圖，裝置以圖示表示；Realtime mode 表示網絡即時運作，另有 Simulation mode 用嚟逐步睇封包流動。
3. 網絡裝置分層放置：router 係第三層（Layer 3）裝置負責 routing，switch 係第二層（Layer 2）負責 switching，hub 係第一層（Layer 1）純轉發訊號，end devices（PC / Server / IP Phone）係主機。> "Routers interconnect networks, switches connect devices within a LAN, hubs repeat signals at the physical layer, and end devices are the source and destination of traffic."
4. Auto Connect 按裝置可用接口自動揀 connection type，令初學者唔使自己判斷線材類型。> "Auto Connect automatically chooses the connection type based on the available interfaces."
5. Connection type 常見有 copper straight-through、copper cross-over 與 fiber optic；不同層級裝置之間多用 straight-through。
6. 裝置要設 IP 先可以通訊：主機要 IPv4 address、subnet mask、default gateway；router 接口要 `ip address` + `no shutdown`。> "A host needs an IPv4 address, a subnet mask, and a default gateway; a router interface needs an IP address and must be administratively up."
7. ARP（Address Resolution Protocol）負責將 IP address 對應到 MAC address，用 `show arp` / `arp -a` 可以檢查呢個對應表。> "ARP maps an IP address to a MAC address; the ARP table can be examined with show arp or arp -a."
8. Assessment Items 就係考試評分清單：完成實作後必須用 Check Results 核對，逐項修正先攞到滿分。> "Assessment Items are the scoring checklist; always verify with Check Results before finishing."
