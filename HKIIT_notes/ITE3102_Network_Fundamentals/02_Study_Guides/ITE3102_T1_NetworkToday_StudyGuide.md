# ITE3102 Network Fundamentals — Tutorial 1: Networking Today 雙語練習題解 Guide

> 本 Guide 對應 Tutorial 1: Networking Today（CCNA v7 Module 1 內容），逐題拆解 + 提供考試標準英文答題句。

---

## 📝 1. 練習概要 (Summary)

本練習涵蓋 **Networking Today**（今日網絡）最基礎的六大課題：**Network Components**（網絡組件：End Devices、Intermediary Devices、Network Media）、**Types of Networks**（LAN 與 WAN）、**Internet 與 Intranet / Extranet 的區別**、**Internet Connectivity Types**（Cable、Cellular、Satellite、Dial-up 等上網方式）、**Network Architecture Requirements**（Fault Tolerance、Scalability、QoS、Security 四大架構要求），以及 **Security Requirements**（Confidentiality、Integrity、Availability 的 CIA 三要素）。

考核重點是「**配對（Matching）與填空（Fill-in-the-blank）**」：題目多數要求你把「定義 / 特徵」配對到正確的專有名詞。這類題型在考試中幾乎必定出現，關鍵不是死背名詞，而是掌握每個概念的**關鍵字眼（keywords）**——例如見到 "regenerate and retransmit" 就要即時聯想到 Intermediary Devices；見到 "more than one route" 就要聯想到 Fault Tolerance。學生只要完成本 Guide 內全部題目並熟記每題的 **Exam Answer Phrase**，即可應付同類考題。

---

## 🎯 2. 練習目標 (Objectives)

完成本練習後，你應能：

| # | 能力（繁體中文） | 英文對照 (Objectives) |
|---|----------------|----------------------|
| 1 | 分辨網絡三大組件及其功能 | Distinguish network components: end devices, intermediary devices, and network media |
| 2 | 解釋 LAN 與 WAN 的分別 | Explain the difference between LAN and WAN |
| 3 | 分辨 Internet、Intranet、Extranet | Differentiate between the Internet, an intranet, and an extranet |
| 4 | 配對常見互聯網連線方式與其特徵 | Match common internet connectivity types to their characteristics |
| 5 | 分辨四大網絡架構要求 | Identify the four network architecture requirements: fault tolerance, scalability, QoS, and security |
| 6 | 掌握 CIA 資訊安全三要素 | Explain the security requirements of confidentiality, integrity, and availability |

---

## ✏️ 3. 題目與答案 Walkthrough

### Q1. Network Components 網絡組件（表格填空）

**題目原文：**
> Complete the table below for Network Components.

| Category | Examples | Function |
|----------|----------|----------|
| End devices | | Interface between the human and the network |
| Intermediary devices | | Regenerate and retransmit data signals |
| Network media | 1. copper<br>2. fibre optic<br>3. wireless | |

**✅ Answer（完整答案）：**

| Category | Examples | Function |
|----------|----------|----------|
| **End devices** | Desktop computers, laptops, printers, smartphones, IP phones, servers | **Interface between the human and the network** |
| **Intermediary devices** | Switches, routers, wireless access points (WAP), firewalls | **Regenerate and retransmit data signals** |
| **Network media** | 1. copper<br>2. fibre optic<br>3. wireless | **Channel over which the message travels** |

**💡 答題邏輯（繁中解釋）：**

- **End devices（終端裝置）** 是網絡的起點與終點，使用者直接操作的裝置，例如電腦、手機、打印機、伺服器。功能是「人同網絡之間的介面」——資料由 end device 產生或接收。
- **Intermediary devices（中介裝置）** 位於 end devices 之間，負責連繫它們並**再生（regenerate）與重傳（retransmit）**訊號，令訊號可以傳得更遠更穩定。例子：Switch、Router、Wireless Access Point、Firewall。
- **Network media（網絡介質）** 是訊息傳遞的**通道（channel）**，不是裝置。三種介質對應三種訊號形式：copper（銅線，電脈衝 electrical impulses）、fibre optic（光纖，光脈衝 light pulses）、wireless（無線，電磁波 electromagnetic waves）。所以表格第三行要填的 Function 是 "Channel over which the message travels"。

> **Exam Answer Phrase:**
> "End devices form the interface between the human network and the communication network. Intermediary devices interconnect end devices and regenerate and retransmit data signals. Network media provide the channel over which the message travels from source to destination."

---

### Q2. Types of Networks — LAN 與 WAN

**題目原文：**
> Describe the following type of networks.
> LAN (Local Area Network) — ____________________________________________
> WAN (Wide Area Network) — ____________________________________________

**✅ Answer：**

- **LAN (Local Area Network)**：A network infrastructure that provides access to users and end devices in a **small geographical area** (e.g. a home, school, or office building).
- **WAN (Wide Area Network)**：A network infrastructure that provides access to other networks over a **wide geographical area** (e.g. a city, country, or across the world).

**💡 答題邏輯（繁中解釋）：**

- 兩者的核心分別只在一個字：**覆蓋範圍（geographical area）**。LAN 範圍細（一間屋、一間學校、一幢辦公室），WAN 範圍大（跨城市、跨國家）。
- 記法：**LAN = 近（Local）**，**WAN = 遠（Wide）**。WAN 本質上就是「連接多個 LAN」的網絡，例如公司總部（LAN A）與分公司（LAN B）之間用 WAN 連起來。
- 考試最常見問法是把兩者配對到「small / wide geographical area」字眼，見到 "small" 揀 LAN，見到 "wide" 揀 WAN。

> **Exam Answer Phrase:**
> "A LAN provides access to users and end devices in a small geographical area, while a WAN provides access to other networks over a wide geographical area."

---

### Q3. Internet / Intranet / Extranet 配對題

**題目原文：**
> Match the description on the right to the type of network on the left.

| 左欄 (Type of network) | 右欄 (Description) |
|------------------------|--------------------|
| Internet | A private connection of LANs and WANs that belongs to an organization |
| Intranet | A worldwide collection of interconnected networks |
| Extranet | Provide secure and safe access to individuals who work for a different organizations, but require company data |

**✅ Answer（配對結果）：**

| Type of network | 配對 Description |
|-----------------|------------------|
| **Internet** | A **worldwide collection of interconnected networks** |
| **Intranet** | A **private connection of LANs and WANs** that belongs to an organization |
| **Extranet** | Provide **secure and safe access** to individuals who work for a different organization, but require company data |

**💡 答題邏輯（繁中解釋）：**

- 三個名詞共享字根 "-net"（network），分別在於**開放程度**：
  - **Internet**：全世界所有網絡的集合，公開（public）。
  - **Intranet**：組織**內部**私有網絡（private），只有員工可以用。
  - **Extranet**：Intranet 的延伸，開放給**外部**人士（例如供應商、合作夥伴），但必須有安全認證（secure and safe access）。
- 關鍵字眼：「worldwide」→ Internet；「private … belongs to an organization」→ Intranet；「different organization / secure and safe」→ Extranet。
- 常見陷阱：題目把 Intranet 與 Extranet 的描述調轉，只要認住 **private（內部）= Intra**、**external parties（外部）= Extra** 就不會錯。

> **Exam Answer Phrase:**
> "The Internet is a worldwide collection of interconnected networks. An intranet is a private connection of LANs and WANs that belongs to an organization. An extranet provides secure and safe access to individuals who work for a different organization but require company data."

---

### Q4. Internet Connectivity Types 互聯網連線方式配對題

**題目原文：**
> Match the characteristics on the right to its corresponding internet connectivity type.
> （提取檔中左欄缺失了其中一項，已按教材還原為 Cable。）

| 左欄 (Connectivity type) | 右欄 (Characteristics) |
|--------------------------|------------------------|
| (Cable) | Requires a clear line of sight |
| Cellular | Uses coaxial cable as a medium |
| Satellite | Uses a cell phone network to connect |
| Dial-up telephone | Provides a high bandwidth, always on, connection |
|  | Provides a low bandwidth but inexpensive connection |

**✅ Answer（配對結果）：**

| Connectivity type | 配對 Characteristics |
|-------------------|----------------------|
| **Cable** | Uses **coaxial cable** as a medium；Provides a **high bandwidth, always on** connection |
| **Cellular** | Uses a **cell phone network** to connect |
| **Satellite** | **Requires a clear line of sight** |
| **Dial-up telephone** | Provides a **low bandwidth but inexpensive** connection |

**💡 答題邏輯（繁中解釋）：**

- 逐項用關鍵字配對：
  - **Cable（有線電視寬頻）**：介質就是 "coaxial cable"（同軸電纜）——見到 coaxial 即揀 Cable；同時 Cable 提供「高頻寬、長開（always on）」。
  - **Cellular（流動網絡）**："cell phone network" 直接對應 Cellular——見到 cell 即揀 Cellular。
  - **Satellite（衞星）**：衞星訊號要直射，所以「需要清晰視線（clear line of sight）」。
  - **Dial-up telephone（撥號上網）**：舊式技術，頻寬低但**便宜**（low bandwidth but inexpensive）。
- 注意 "high bandwidth, always on" 同時可指 DSL，但題目提供了 "uses coaxial cable" 這一條，所以兩條特徵都歸 Cable；如果題目出現 "uses telephone line"，那就要揀 DSL。
- 記憶口訣：**Cable 靠同軸、Cellular 靠手機網絡、Satellite 靠視線、Dial-up 平而慢**。

> **Exam Answer Phrase:**
> "Cable provides a high bandwidth, always-on connection using coaxial cable as the medium. Cellular uses a cell phone network to connect. Satellite requires a clear line of sight. Dial-up telephone provides a low bandwidth but inexpensive connection."

---

### Q5. Network Architecture Requirements 網絡架構要求

**題目原文：**
> Identify the network architecture requirements below as belonging to (a) Fault Tolerance, (b) Scalability, (c) Quality of Service, (d) Security:

**✅ Answer（分類結果）：**

| 描述 (Statement) | 分類 |
|------------------|------|
| Networks should always be available | **(a) Fault Tolerance** |
| Priority queues are implemented when demand for network bandwidth exceeds supply | **(c) Quality of Service (QoS)** |
| Business and personal network equipment must be protected | **(d) Security** |
| Developing a plan for priority queuing | **(c) Quality of Service (QoS)** |
| Business and personal data must be protected | **(d) Security** |
| Networks can expand quickly to support new users and applications with minimal impact on performance | **(b) Scalability** |
| Data can travel through more than one route for delivery | **(a) Fault Tolerance** |
| Follow accepted standards and protocols to allow focus on product improvements and services | **(b) Scalability** |

**💡 答題邏輯（繁中解釋）：**

四大架構要求各自有「招牌關鍵字」，見到就即時對號入座：

- **(a) Fault Tolerance（容錯）**：重點是「故障時仍然可用」。招牌字眼：**always available（永遠可用）**、**more than one route（多於一條路徑）**——資料有多條路線可走，其中一條斷了仍有其他路線送達。
- **(b) Scalability（可擴展性）**：重點是「可以快速擴張而不影響表現」。招牌字眼：**expand quickly**、**minimal impact on performance**。另外「遵循業界標準與協議（follow accepted standards and protocols）」之所以屬於 Scalability，是因為採用標準化設計令新設備/新用戶可以順暢加入，擴充時毋須重新設計。
- **(c) Quality of Service, QoS（服務品質）**：重點是「管理頻寬擠塞」。招牌字眼：**priority queues（優先佇列）**、**bandwidth exceeds supply（頻寬供不應求）**。QoS 就是把重要流量排優先，令其不受擠塞影響。第 4 題 "Developing a plan for priority queuing" 一樣是 QoS。
- **(d) Security（安全）**：重點是「保護」。招牌字眼：**equipment must be protected**、**data must be protected**——無論設備或資料，凡出現 "protected" 都屬 Security。

> **Exam Answer Phrase:**
> "Fault tolerance ensures the network is always available by allowing data to travel through more than one route. Scalability allows the network to expand quickly with minimal impact on performance, supported by following accepted standards and protocols. QoS implements priority queues when demand for bandwidth exceeds supply. Security protects both network equipment and data."

---

### Q6. Security Requirements — CIA 三要素配對題

**題目原文：**
> Match the description on the right to the correct security requirement on the left.

| 左欄 (Security requirement) | 右欄 (Description) |
|-----------------------------|--------------------|
| Confidentiality | Timely and reliable data services will be provided to authorized users |
| Integrity | Only the intended and authorized recipients can access and read the data |
| Availability | Make sure that information has not been altered in transmission, from origin to destination |

**✅ Answer（配對結果）：**

| Security requirement | 配對 Description |
|----------------------|------------------|
| **Confidentiality** | **Only the intended and authorized recipients** can access and read the data |
| **Integrity** | Make sure that information has **not been altered** in transmission, from origin to destination |
| **Availability** | **Timely and reliable data services** will be provided to authorized users |

**💡 答題邏輯（繁中解釋）：**

- 這是資訊安全的 **CIA Triad**（Confidentiality、Integrity、Availability），每個字母對應一個核心問題：
  - **C = Confidentiality（保密性）**：答「**誰可以看**」——只有預期及獲授權的接收者（intended and authorized recipients）可以存取及閱讀資料。
  - **I = Integrity（完整性）**：答「**資料有沒有被改**」——確保資料由來源（origin）到目的地（destination）傳輸期間**未被篡改（not altered）**。
  - **A = Availability（可用性）**：答「**何時可以用**」——向授權用戶提供**及時可靠（timely and reliable）**的資料服務。
- 記憶口訣：**C = 看得到（誰可讀）、I = 冇被改（未篡改）、A = 用得到（隨時可用）**。
- 常見陷阱：Confidentiality 與 Availability 的描述都有 "authorized users / recipients" 字眼，但前者強調「只能授權者讀取（access and read）」，後者強調「服務要及時可靠（timely and reliable services）」，靠動詞區分。

> **Exam Answer Phrase:**
> "Confidentiality means only the intended and authorized recipients can access and read the data. Integrity ensures information has not been altered in transmission, from origin to destination. Availability ensures that timely and reliable data services will be provided to authorized users."

---

## 📖 4. 必考英文術語與答題句型庫

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|--------------|------------------|----------------------------------------|
| End device | 終端裝置：網絡的起點/終點，使用者直接操作的裝置（電腦、手機、打印機、伺服器） | "End devices form the interface between the human network and the communication network." |
| Intermediary device | 中介裝置：連接終端裝置，負責再生與重傳訊號（Switch、Router、Wireless Access Point、Firewall） | "Intermediary devices interconnect end devices and regenerate and retransmit data signals." |
| Network media | 網絡介質：訊息傳遞的通道；分 copper、fibre optic、wireless 三種 | "Network media provide the channel over which the message travels from source to destination." |
| LAN (Local Area Network) | 區域網絡：覆蓋細範圍（屋企、學校、辦公樓） | "A LAN provides access to users and end devices in a small geographical area." |
| WAN (Wide Area Network) | 廣域網絡：覆蓋廣範圍（城市、國家、全球），連接多個 LAN | "A WAN provides access to other networks over a wide geographical area." |
| Internet | 互聯網：全世界互連網絡的集合（公開） | "The Internet is a worldwide collection of interconnected networks." |
| Intranet | 內聯網：屬於某組織的私有 LAN/WAN 連接 | "An intranet is a private connection of LANs and WANs that belongs to an organization." |
| Extranet | 外聯網：讓外部合作機構的人員安全存取公司資料 | "An extranet provides secure and safe access to individuals who work for a different organization but require company data." |
| Cable | 有線電視寬頻：用同軸電纜、高頻寬、常開 | "Cable provides a high bandwidth, always-on connection using coaxial cable as the medium." |
| Cellular | 流動網絡：用手提電話網絡上網 | "Cellular uses a cell phone network to connect to the Internet." |
| Satellite | 衞星上網：需要清晰視線 | "Satellite requires a clear line of sight to the satellite." |
| Dial-up telephone | 撥號上網：低頻寬但便宜 | "Dial-up telephone provides a low bandwidth but inexpensive connection." |
| Fault Tolerance | 容錯：網絡故障時仍可用，資料有多條路徑 | "A fault-tolerant network limits the impact of failure, and data can travel through more than one route for delivery." |
| Scalability | 可擴展性：快速擴張而少影響表現；遵循標準與協議 | "A scalable network can expand quickly to support new users and applications with minimal impact on performance." |
| Quality of Service (QoS) | 服務品質：用優先佇列管理頻寬擠塞 | "QoS implements priority queues when demand for network bandwidth exceeds supply." |
| Security | 安全：保護設備與資料 | "Network security protects business and personal equipment and data." |
| Confidentiality | 保密性：只有授權接收者可讀取資料 | "Confidentiality means only the intended and authorized recipients can access and read the data." |
| Integrity | 完整性：資料傳輸途中未被篡改 | "Integrity ensures information has not been altered in transmission, from origin to destination." |
| Availability | 可用性：授權用戶可獲及時可靠服務 | "Availability ensures timely and reliable data services are provided to authorized users." |

---

## 🗺️ 5. 學習路線 (Learning Path)

**第 1 步：理解概念（Understand）**
先讀本 Guide 的 Summary 與 Objectives，再用 Walkthrough 內每題的「💡 答題邏輯」理解每個名詞「係咩、點解」。重點：把 6 大課題畫成一張心智圖（Network Components → Networks → Connectivity → Architecture → Security）。

**第 2 步：背誦定義（Memorize）**
背熟「📖 必考英文術語表」右欄的英文定義句。不需要逐字背，但每個定義的**關鍵字眼**（bold 部分）必須記牢，例如：end device = "interface between the human and the network"；fault tolerance = "more than one route"。

**第 3 步：掌握判斷/計算（Apply）**
不看答案，重做 Q1–Q6 全部題目；然後做「反向練習」——由答案倒推關鍵字（例如見到 "private connection of LANs and WANs" 能即時講出 Intranet）。此步驟訓練配對題的即時反應。

**第 4 步：能解答考題（Exam Ready）**
用「🎒 考前 5 分鐘雙語懶人包」快速複習，並嘗試用英文把每個概念講一次（模擬考試要寫的英文句子）。能流暢寫出 Exam Answer Phrase，即代表已具備考試答題能力。

---

## 🎒 6. 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 關鍵數字 / 數量
- **Network Media 有 3 種**：copper（電脈衝）、fibre optic（光脈衝）、wireless（電磁波）
- **網絡架構要求有 4 大類**：Fault Tolerance、Scalability、QoS、Security
- **資訊安全有 3 要素（CIA）**：Confidentiality、Integrity、Availability
- **網絡類型有 2 個範圍**：LAN = small area；WAN = wide area

### 快速對比表

| 對比項 | 關鍵字眼 | 答案 |
|--------|----------|------|
| End devices | interface between the human and the network | 終端裝置（電腦、手機、打印機） |
| Intermediary devices | regenerate and retransmit | Switch、Router、WAP、Firewall |
| Internet | worldwide collection | 全世界公開網絡 |
| Intranet | private, belongs to an organization | 公司內部網絡 |
| Extranet | different organization, secure and safe access | 外部合作夥伴存取 |
| Cable | coaxial cable / high bandwidth, always on | 有線電視寬頻 |
| Cellular | cell phone network | 手機網絡 |
| Satellite | clear line of sight | 衞星（要視線直射） |
| Dial-up | low bandwidth, inexpensive | 撥號上網（平而慢） |
| Fault Tolerance | always available / more than one route | 容錯 |
| Scalability | expand quickly / minimal impact / standards | 可擴展 |
| QoS | priority queues / bandwidth exceeds supply | 服務品質 |
| Security | equipment and data protected | 安全 |
| Confidentiality | only intended and authorized recipients read | 保密性 |
| Integrity | not altered in transmission | 完整性 |
| Availability | timely and reliable services | 可用性 |

### 英文記憶口訣 (Memory Mnemonics)
- **CIA Triad**：**C**an read（誰可讀）→ Confidentiality；**I**s unchanged（冇被改）→ Integrity；**A**lways available（隨時可用）→ Availability。
- **Media 三兄弟**：Copper = 電（electricity）、Fibre = 光（light）、Wireless = 波（waves）。
- **四個架構要求**："**F**aulty **S**witches **Q**ueue **S**afely" → Fault Tolerance、Scalability、QoS、Security。
- **網域開放度**：Inter**net**（全世界公開）＞ **Extra**net（外部夥伴）＞ **Intra**net（內部私有）——由外到內排列。

### 答題 30 秒檢查清單
1. 配對題：先圈出題目描述中的**關鍵字眼**，再對應名詞。
2. 見到 "protected" → Security；見到 "route / available" → Fault Tolerance；見到 "expand / standards" → Scalability；見到 "priority queue" → QoS。
3. 見到 "read / access" → Confidentiality；見到 "altered" → Integrity；見到 "timely / reliable services" → Availability。
4. 寫英文答案時，直接用本 Guide 的 Exam Answer Phrase 句式，確保用字標準。
