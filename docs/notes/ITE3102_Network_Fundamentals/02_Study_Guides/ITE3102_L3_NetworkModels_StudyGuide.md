# ITE3102 L3: Network Models — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Module 3: Protocols and Models
> **原始檔**：`01_Raw_Materials/Lectures/Lecture3_NetworkModels.pptx`
> **題解對應**：`ITE3102_T3_Models_StudyGuide.md`（同一課嘅 Tutorial 練習題解）
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 對照題解自測 → 考前用懶人包速記

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課係 ITE3102 由「網絡係乜」轉去「網絡點樣運作」嘅樞紐課。ITN Module 3 嘅題目叫 **Protocols and Models**，即係「協議同模型」——上面一層講規則（protocol），下面一層講框架（model）。Deck 嘅 agenda（Slide 3）已經把全課斬成四大塊：**The Rules, Protocols**（規則與協議）、**Protocol Suites, Standards Organizations**（協議套件與標準組織）、**Reference Models**（參考模型）、**Data Encapsulation, Data Access**（資料封裝與資料存取）。一句總結：**Protocol 係通訊嘅規則，Layered Model 係人類理解呢堆規則嘅地圖。**

全課有兩條主線。第一條係「規則線」：通訊三大要素（**source／destination／channel**）→ 網絡協議五大要求（**message encoding、message formatting and encapsulation、message size、message timing、message delivery options**）→ 協議類型同功能 → 協議套件（**TCP/IP** vs 歷史上的 **OSI protocols、AppleTalk、Novell NetWare**）→ 標準組織（**ISOC、IAB、IETF、IRTF、ICANN、IANA、IEEE、EIA、TIA、ITU-T**）。第二條係「模型線」：分層模型嘅四大好處 → **OSI 7 層**同 **TCP/IP 4 層** → **segmenting／sequencing** → **PDU**（**Data → Segment → Packet → Frame → Bits**）→ **encapsulation／de-encapsulation** → 每一跳嘅 frame 位址變化。

兩條線最後合流成一條「資料流」：一份 Data 由 Application 層一路向下封裝成 Bits 出媒介，去到目的地又逐層解封返做 Data。考試就係考你講唔講得出——每一層加咗啲乜、PDU 叫乜名、位址邊個變邊個唔變。

**實務情境一（故障定位）**：你係公司嘅 junior network admin，同事話「個網頁 load 唔到，但 ping 得通個 IP」。你即刻要想起本課嘅 **Protocol Interaction Example**（Slide 13）——ping 屬 **IP**（Network／Internet 層，負責 deliver messages globally），網頁屬 **HTTP**（Application 層）＋ **TCP**（Transport 層，負責 guaranteed delivery 同 flow control）。所以問題唔係「冇路」，而係「上層協議有問題」。由下而上（Physical → Application）逐層排查，就係用 **OSI 分層模型**做「故障定位地圖」——呢個正正係「layered model provides a common language to describe networking functions」嘅實務價值。

**實務情境二（換 vendor 同擴容）**：公司要換新廠商嘅 switch 同 router，管理層問「會唔會唔相容？」你要答得出：因為 **TCP/IP** 係 **open standard protocol suite**，係 **standards-based** 又由 standards organization 背書（**Ethernet** 同 **WLAN** 由 **IEEE** 出標準），所以唔同 vendor 嘅產品可以 **interoperability**——呢個就係 **open standards encourage interoperability, competition, and innovation** 嘅意思。同時你亦要記住：**MAC address** 係 physically embedded 入 Ethernet **NIC**、屬 local addressing；而 **IP address** 係 hierarchical（network portion + host portion），換 vendor 唔會改到你嘅 addressing 邏輯。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **列出任何通訊嘅三大要素** — List the three elements of any communication: source, destination, and channel
2. **解釋協議是「規則」，並指出要照顧嘅四大要求** — Explain why protocols are the rules of communication and what requirements they must account for
3. **列舉網絡協議定義嘅五大細節** — Describe the five details network protocols define: encoding, formatting and encapsulation, size, timing, and delivery options
4. **分辨 encoding 與 encapsulation** — Differentiate message encoding from message encapsulation
5. **解釋 segmentation 與 frame 嘅關係** — Explain why long messages are segmented and why each piece is sent in a separate frame
6. **解釋 message timing 三個機制** — Explain flow control, response timeout, and access method
7. **分辨 Unicast / Multicast / Broadcast** — Distinguish one-to-one, one-to-many, and one-to-all delivery
8. **分類四種網絡協議類型** — Classify protocol types: network communications, network security, routing, service discovery
9. **列舉六項協議功能** — List the six network protocol functions
10. **講出 HTTP / TCP / IP / Ethernet 嘅分工** — Describe the protocol interaction example when a device requests a web page
11. **定義 protocol suite 並舉出例子** — Define a protocol suite and identify TCP/IP, OSI protocols, AppleTalk, and Novell NetWare
12. **解釋 TCP/IP 為何是 open standard** — Explain the meaning of an open standard and a standards-based protocol suite
13. **認出各標準組織嘅職責** — Identify the role of ISOC, IAB, IETF, IRTF, ICANN, IANA, IEEE, EIA, TIA, and ITU-T
14. **列舉分層模型四大好處** — Describe the benefits of using a layered model
15. **背出 OSI 7 層與 TCP/IP 4 層並對應功能** — Name the layers of the OSI and TCP/IP reference models and match functions to layers
16. **解釋 segmenting 與 multiplexing 嘅好處** — Explain the benefits of segmenting messages and the purpose of multiplexing
17. **背出各層 PDU 名稱與封裝／解封順序** — State the PDU name at each layer and the encapsulation / de-encapsulation sequence
18. **解釋靜態與動態 IP 位址分配** — Explain dynamically assigned versus statically assigned IP addresses
19. **分辨 layer 2 與 layer 3 位址** — Differentiate data link layer addresses from network layer addresses
20. **判斷同網段與跨網段傳送時每一跳嘅位址變化** — Determine the source and destination MAC addresses for same-network and remote-network delivery

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 The Rules — 通訊基礎與協議要求（Slides 3–10）

Deck 嘅 Slide 3 係全課 agenda，明確列出四大板塊：**The Rules, Protocols**；**Protocol Suites, Standards Organizations**；**Reference Models**；**Data Encapsulation, Data Access**。由呢四個字眼已經可以推出全課結構——唔好死背，要用地圖方式記。

#### 3.1.1 通訊三大要素（Slides 3–4）

繁中解說：任何通訊都有三樣嘢（**3 elements**）：一個 **source（sender）**，一個 **destination（receiver）**，以及一條 **channel（media）**——即提供通訊路徑嘅媒介。而 **protocols** 就係「通訊會跟隨嘅規則」。呢啲規則必須照顧四件事：(1) 一個已被識別嘅 sender 同 receiver；(2) **common language and grammar**（共同語言同文法）；(3) **speed and timing of delivery**（傳送嘅速度同時序）；(4) **confirmation or acknowledgment requirements**（確認或 acknowledging 嘅要求）。

> **English Standard Definition:** "There are 3 elements to any communication: there will be a source (sender), there will be a destination (receiver), and there will be a channel (media) that provides for the path of communications to occur."  
> **English Standard Definition:** "Protocols are the rules that communications will follow."  
> **English Standard Definition:** "Protocols must account for the following requirements: an identified sender and receiver; common language and grammar; speed and timing of delivery; confirmation or acknowledgment requirements."

現實對照：打電話要有人接（identified sender and receiver）、要講雙方都識嘅語言（common language and grammar）、講得太快對方聽唔清（speed and timing）、講完要對方應一聲確認（acknowledgment）。電腦網絡完全係同一回事。

> **圖示描述**：Slide 4 以「來源 — 媒介 — 目的地」示意圖表示通訊三要素：圖中 sender 坐喺一端、receiver 坐喺另一端，中間嘅 channel 就代表 media（通訊路徑）。

#### 3.1.2 網絡協議五大要求（Slide 5）

繁中解說：除咗識別 source 同 destination，computer and network protocols 仲要定義「訊息實際上點樣跨網絡傳輸」嘅細節，一共五項：(1) **message encoding and decoding**；(2) **message formatting and encapsulation**；(3) **message size**；(4) **message timing**；(5) **message delivery options**。

呢五項就係 3.1.3 至 3.1.7 五個小節嘅骨架。考試出「list the five requirements protocols define」，照呢個次序寫就啱。

> **English Standard Definition:** "In addition to identifying the source and destination, computer and network protocols define the details of how a message is transmitted across a network: message encoding and decoding, message formatting and encapsulation, message size, message timing, and message delivery options."

#### 3.1.3 Message Encoding and Decoding（Slide 6）

繁中解說：**Encoding** 係「把資訊轉換成另一種可接受嘅形式嚟傳輸」嘅過程；**Decoding** 就係反轉呢個過程去解讀返資訊。整條鏈係：人腦嘅意念 → 轉成文字 → 轉成 **0／1 bit** → 轉成媒介上嘅訊號；接收方就逐步解返轉頭。

> **English Standard Definition:** "Encoding is the process of converting information into another acceptable form for transmission."  
> **English Standard Definition:** "Decoding reverses this process to interpret the information."

易錯位：**encoding 係「轉換形式」**（converts information into another acceptable form）；**encapsulation 係「套入另一格式」**（places one format inside another）。見到 "converts ... into another form" 就係 encoding；見到 "inside another" 就係 encapsulation。

> **圖示描述**：Slide 6 圖示表示「一句人話」被轉成 0／1 位元串送出（encoding），接收端再把位元串還原成人睇得明嘅訊息（decoding）。

#### 3.1.4 Message Formatting and Encapsulation（Slide 7）

繁中解說：訊息一旦送出，就必須用一個指定嘅 **format／structure**。**Encapsulation** 係「把一個訊息格式放入另一個訊息格式之內」嘅過程，順序係 **data > segment > packet > frame > bit**；**De-encapsulation** 就係收件方把過程反轉，將訊息取返出嚟。

拆解：寫信要有信封同固定格式（收件人、寄件人位置寫死），先至寄得到、送得到。電腦世界就係「信封套信封」——data 套入 segment，segment 套入 packet，packet 套入 frame，frame 最後變成 bit 出媒介。留意呢個順序（data > segment > packet > frame > bit）係由頂至底，即 3.6 節講嘅 **encapsulation** 方向。

> **English Standard Definition:** "When a message is sent, it must use a specific format or structure."  
> **English Standard Definition:** "Encapsulation is the process of placing one message format inside another message format (data > segment > packet > frame > bit)."  
> **English Standard Definition:** "De-encapsulation occurs when the process is reversed by the recipient and the message is retrieved."

> **圖示描述**：Slide 7 圖示一層套一層嘅「信封套疊」結構，由 data 逐層包入 segment、packet、frame，最後以 bit 形式放上媒介。

#### 3.1.5 Message Size（Slide 8）

繁中解說：長訊息必須被拆成細件（**segmentation**）先能夠穿越網絡。三條規則要記：(1) 每一件用一個獨立嘅 **frame** 送出；(2) 每個 frame 有自己嘅 **addressing information**；(3) 接收嘅 host 會把多個 frames **重組**（reconstruct）返原本嘅訊息。

點解一定要拆？因為一個超長 frame 會長時間佔住條 link（tie up a communications link），其他人就冇得用；而且出錯時要重傳嘅會係成段訊息。拆細之後，只需重傳失敗嘅嗰一件。呢個「快啲、慳啲」嘅好處，3.6.1 會正式命名為 **increases speed** 同 **increases efficiency**。

> **English Standard Definition:** "Long messages must also be broken into smaller pieces (segmentation) to travel across a network."  
> **English Standard Definition:** "Each piece is sent in a separate frame. Each frame has its own addressing information."  
> **English Standard Definition:** "A receiving host will reconstruct multiple frames into the original message."

> **圖示描述**：Slide 8 圖示一封長訊息被切成多個 frames，每個 frame 各自帶住自己嘅 addressing information 上路，去到目的地再由接收 host 重組返一封完整訊息。

#### 3.1.6 Message Timing（Slide 9）

繁中解說：**Message timing** 包括三樣機制：

| Message Timing 項目 | 職責（繁中） | 關鍵字速記 |
| :--- | :--- | :--- |
| **Flow Control** | 管理資料傳輸嘅速率，定義幾多資訊可以送、以及可以幾快送到 | how much / how fast |
| **Response Timeout** | 管理一部設備喺聽唔到目的地回覆時要等幾久 | how long to wait |
| **Access method** | 決定「幾時可以送訊息」 | when to send |

**Access method** 亦要處理 **collision**（碰撞）——當多過一部設備同時送 traffic，訊息就會 **corrupt**。有啲協議係 **proactive**：會主動嘗試預防 collision；有啲係 **reactive**：喺 collision 已經發生之後才建立回復方法。

> **English Standard Definition:** "Flow Control — Manages the rate of data transmission and defines how much information can be sent and the speed at which it can be delivered."  
> **English Standard Definition:** "Response Timeout — Manages how long a device waits when it does not hear a reply from the destination."  
> **English Standard Definition:** "Access method — Determines when someone can send a message."  
> **English Standard Definition:** "There may be various rules governing issues like 'collisions'. This is when more than one device sends traffic at the same time and the messages become corrupt."  
> **English Standard Definition:** "Some protocols are proactive and attempt to prevent collisions; other protocols are reactive and establish a recovery method after the collision occurs."

> **圖示描述**：Slide 9 用示意圖表示 message timing 三個機制——flow control 係「控制送幾多、送幾快」；response timeout 係一個等待計時器；access method 係多部設備爭用同一媒介時嘅「出牌次序」規則（collision 就係同時出牌）。

#### 3.1.7 Message Delivery Options（Slide 10）

繁中解說：投遞方式分三級，正好對應 three delivery options：

| 通訊類型 | 投遞方式 | 繁中說明 |
| :--- | :--- | :--- |
| **one-to-one** | **Unicast** | 只送給單一目的地（日常上網絕大多數流量） |
| **one-to-many** | **Multicast** | 送給一組接收者 |
| **one-to-all** | **Broadcast** | 送給同一網絡內全部主機 |

Slide 10 特別加咗個 Note，係考試熱點：**Broadcasts 用於 IPv4 網絡，IPv6 唔提供呢個選項**；而送去 **IPv6 anycast address** 嘅 packet，會被路由到最接近擁有該 **unicast address** 嘅設備。

> **English Standard Definition:** "Broadcasts are used in IPv4 networks (not an option for IPv6)."  
> **English Standard Definition:** "A packet sent to an IPv6 anycast address is routed to the nearest device having that unicast address."

> **圖示描述**：Slide 10 用三個圖分別表示 unicast（一支箭嘴指向單一電腦，one-to-one）、multicast（箭嘴指向一群已加入群組嘅電腦，one-to-many）、broadcast（箭嘴指向網段內所有電腦，one-to-all）。

### 3.2 Protocols — 協議類型與功能（Slides 11–13）

繁中解說：**Network protocols** 定義一套共同格式同規則，用嚟設備之間交換訊息。呢個小節把協議分三種角度睇：**類型**（types）、**功能**（functions）、**實際互動**（interaction example）。

#### 3.2.1 Network Protocol Types（Slide 11）

| Protocol Type | Description（英文原文） | 繁中解說 |
| :--- | :--- | :--- |
| **Network Communications** | enable two or more devices to communicate over one or more networks | 令兩部或以上設備可以跨一個或多個網絡通訊 |
| **Network Security** | secure data to provide authentication, data integrity, and data encryption | 保護資料，提供 authentication、data integrity 同 data encryption |
| **Routing** | enable routers to exchange route information, compare path information, and select best path | 令 router 之間交換路由資訊、比較路徑、揀出最佳路徑 |
| **Service Discovery** | used for the automatic detection of devices or services | 用嚟自動偵測設備或服務（例如 **DHCP**、**DNS**） |

> **English Standard Definition:** "Network protocols define a common format and set of rules for exchanging messages between devices."  
> **English Standard Definition:** "The table below lists the various types of protocols that are needed to enable communications across one or more networks."

背誦提示：四型記法按「做大範圍 → 做保護 → 做選路 → 做發現」：Communications、Security、Routing、Service Discovery。

#### 3.2.2 Network Protocol Functions（Slide 12）

繁中解說：設備係靠「大家同意嘅協議」去通訊。呢一版列出協議嘅六大功能：

| Function | Description（英文原文） | 繁中解說 |
| :--- | :--- | :--- |
| **Addressing** | Identifies sender and receiver | 識別發送方同接收方 |
| **Reliability** | Provides guaranteed delivery | 提供有保證嘅交付 |
| **Flow Control** | Ensures data flows at an efficient rate | 確保資料以有效率嘅速率流動 |
| **Sequencing** | Uniquely labels each transmitted segment of data | 為每個傳輸嘅 segment 加上唯一標籤 |
| **Error Detection** | Determines if data became corrupted during transmission | 判斷資料喺傳輸中有冇 corrupt |
| **Application Interface** | Process-to-process communications between network applications | 網絡應用程式之間嘅 process-to-process 通訊 |

> **English Standard Definition:** "Devices use agreed-upon protocols to communicate."

易錯位：**Flow Control 出現兩次**，但層次唔同——3.1.6 嘅 flow control 係 message timing 嘅一部分（管理送出速率同行為），3.2.2 嘅 flow control 係協議嘅一項功能（ensures data flows at an efficient rate）。考試問「function」就用後者嘅字眼。

#### 3.2.3 Protocol Interaction Example（Slide 13）

繁中解說：一個最經典嘅情境——當一部設備向 **web server** 要求一個網頁，同時會有幾個協議一齊合作：

| Protocol | Function（英文原文） | 繁中解說 |
| :--- | :--- | :--- |
| **Hypertext Transfer Protocol (HTTP)** | Governs the way a web server and a web client interact; defines content and format | 管住 web server 同 web client 之間點互動，並定義內容同格式 |
| **Transmission Control Protocol (TCP)** | Manages the individual conversations; provides guaranteed delivery; manages flow control | 管理個別對話、提供 guaranteed delivery、管理 flow control |
| **Internet Protocol (IP)** | Delivers messages globally from the sender to the receiver | 把訊息由 sender 送到 receiver，做到 global delivery |
| **Ethernet** | Delivers messages from one NIC to another NIC on the same Ethernet Local Area Network (LAN) | 喺同一個 Ethernet LAN 內，把訊息由一個 NIC 送到另一個 NIC |

> **English Standard Definition:** "Hypertext Transfer Protocol (HTTP) governs the way a web server and a web client interact and defines content and format."  
> **English Standard Definition:** "Transmission Control Protocol (TCP) manages the individual conversations, provides guaranteed delivery, and manages flow control."  
> **English Standard Definition:** "Internet Protocol (IP) delivers messages globally from the sender to the receiver."  
> **English Standard Definition:** "Ethernet delivers messages from one NIC to another NIC on the same Ethernet Local Area Network (LAN)."

拆解四大分工（考試最愛考「邊個做乜」）：
- **HTTP** 只係「傾乜嘢、乜格式」——Application 層；
- **TCP** 係「點傾得可靠」——Transport 層；
- **IP** 係「送去邊、點送到全世界」——Network 層（logical addressing）；
- **Ethernet** 係「同一個 LAN 內、一部 NIC 去另一部 NIC」——Data Link／Network Access 層（physical addressing）。

> **圖示描述**：Slide 13 圖示一部 client 向 web server 發 request 時，四個協議由上而下分工合作——HTTP 處理 request 內容，TCP 建立可靠對話，IP 負責全球化交付，Ethernet 負責在同一個 LAN 內把 frame 由一個 NIC 送到另一個 NIC。

### 3.3 Protocol Suites — 協議套件（Slides 14–16）

繁中解說：**Protocol suite** 係「一組協議」——佢哋一齊合作，提供一個完整嘅網絡通訊服務（comprehensive network communication services）。單一協議做唔到成件事，所以一定要成套出現。

#### 3.3.1 Evolution of Protocol Suites（Slide 14）

| Protocol Suite | 出處／維護者 | 繁中說明 |
| :--- | :--- | :--- |
| **Internet Protocol Suite / TCP/IP** | 由 **IETF (Internet Engineering Task Force)** 維護 | 最常用嘅 protocol suite，互聯網實際使用嘅一套 |
| **Open Systems Interconnection (OSI) protocols** | 由 **ISO (International Organization for Standardization)** 同 **ITU (International Telecommunications Union)** 開發 | 官方標準派系嘅協議組合 |
| **AppleTalk** | Apple Inc. 推出嘅 **proprietary suite** | 專有（廠商自制），歷史產物 |
| **Novell NetWare** | Novell Inc. 開發嘅 **proprietary suite** | 專有（廠商自制），歷史產物 |

> **English Standard Definition:** "A protocol suite is a set of protocols that work together to provide comprehensive network communication services."  
> **English Standard Definition:** "Internet Protocol Suite or TCP/IP — The most common protocol suite and maintained by the Internet Engineering Task Force (IETF)."  
> **English Standard Definition:** "Open Systems Interconnection (OSI) protocols — Developed by the International Organization for Standardization (ISO) and the International Telecommunications Union (ITU)."

考試重點：**proprietary**（專有）vs **open standard**（開放標準）係分界線——AppleTalk 同 Novell NetWare 係 proprietary（單一廠商），所以連唔通、亦冇人再維護；TCP/IP 係 open standard，所以生存到今日。

#### 3.3.2 TCP/IP Protocol Example（Slide 15）

繁中解說：TCP/IP 入面嘅協議，其實分散喺幾層：**TCP/IP protocols 運作喺 application、transport、internet 三層**；而最常見嘅 **network access layer LAN protocols** 就係 **Ethernet** 同 **WLAN（wireless LAN）**。

> **English Standard Definition:** "TCP/IP protocols operate at the application, transport, and internet layers."  
> **English Standard Definition:** "The most common network access layer LAN protocols are Ethernet and WLAN (wireless LAN)."

> **圖示描述**：Slide 15 圖示把常見 TCP/IP 協議按層排列——application 層一排協議、transport 層、internet 層各一批，最底 network access 層列出 Ethernet 同 WLAN 兩個 LAN 技術。

#### 3.3.3 TCP/IP Protocol Suite（Slide 16）

繁中解說：**TCP/IP 係互聯網所用嘅 protocol suite**，入面包好多協議。佢有兩個身份標籤：

1. **Open standard protocol suite**——free 提供給公眾，任何 **vendor** 都可以用；
2. **Standards-based protocol suite**——由網絡業界認可、並由 **standards organization** 批准，用嚟確保 **interoperability**（互操作性）。

> **English Standard Definition:** "TCP/IP is the protocol suite used by the internet and includes many protocols."  
> **English Standard Definition:** "TCP/IP is an open standard protocol suite that is freely available to the public and can be used by any vendor."  
> **English Standard Definition:** "TCP/IP is a standards-based protocol suite that is endorsed by the networking industry and approved by a standards organization to ensure interoperability."

### 3.4 Standards Organizations — 標準組織（Slides 17–20）

#### 3.4.1 Open Standards（Slide 17）

繁中解說：**Standards organizations**（標準組織）有三個身份特徵：(1) **vendor-neutral**（中立於任何廠商）；(2) **non-profit**（非牟利）；(3) 成立嘅目的係開發同推廣 **open standards** 嘅概念。而 open standards 會鼓勵三件事：**interoperability**（互操作）、**competition**（競爭）、**innovation**（創新）。

> **English Standard Definition:** "Standards organizations are vendor-neutral, non-profit organizations established to develop and promote the concept of open standards."  
> **English Standard Definition:** "Open standards encourage interoperability, competition, and innovation."

#### 3.4.2 Internet Standards（Slide 18）

| Organization | 職責（英文原文） | 繁中解說 |
| :--- | :--- | :--- |
| **Internet Society (ISOC)** | Promotes the open development and evolution of internet | 推廣互聯網嘅開放開發同演進 |
| **Internet Architecture Board (IAB)** | Responsible for management and development of internet standards | 負責互聯網標準嘅管理同開發 |
| **Internet Engineering Task Force (IETF)** | Develops, updates, and maintains internet and TCP/IP technologies | 開發、更新同維護互聯網及 TCP/IP 技術 |
| **Internet Research Task Force (IRTF)** | Focused on long-term research related to internet and TCP/IP protocols | 專注互聯網與 TCP/IP 協議嘅長期研究 |

> **English Standard Definition:** "Internet Society (ISOC) promotes the open development and evolution of internet."  
> **English Standard Definition:** "Internet Architecture Board (IAB) is responsible for management and development of internet standards."  
> **English Standard Definition:** "Internet Engineering Task Force (IETF) develops, updates, and maintains internet and TCP/IP technologies."  
> **English Standard Definition:** "Internet Research Task Force (IRTF) is focused on long-term research related to internet and TCP/IP protocols."

背誦法：**ISOC 推廣 → IAB 管標準 → IETF 做技術 → IRTF 做研究**（由「對外」到「對內」，由「短期實作」到「長期研究」）。

#### 3.4.3 Internet Standards (Cont.) — 名稱與號碼管理（Slide 19）

| Organization | 職責（英文原文） | 繁中解說 |
| :--- | :--- | :--- |
| **Internet Corporation for Assigned Names and Numbers (ICANN)** | Coordinates IP address allocation, the management of domain names, and assignment of other information | 統籌 IP 位址分配、domain name 管理，以及其他資訊嘅指派 |
| **Internet Assigned Numbers Authority (IANA)** | Oversees and manages IP address allocation, domain name management, and protocol identifiers for ICANN | 為 ICANN 監管同管理 IP 位址分配、domain name 管理同 protocol identifiers |

呢兩個組織都「參與 TCP/IP 嘅開發同支援」。關係要記清楚：**ICANN 係統籌層（coordinates），IANA 係執行層（oversees and manages ... for ICANN）**——IANA 係為 ICANN 做嘢嘅。

> **English Standard Definition:** "Internet Corporation for Assigned Names and Numbers (ICANN) coordinates IP address allocation, the management of domain names, and assignment of other information."  
> **English Standard Definition:** "Internet Assigned Numbers Authority (IANA) oversees and manages IP address allocation, domain name management, and protocol identifiers for ICANN."

#### 3.4.4 Electronic and Communications Standards（Slide 20）

| Organization | 職責（英文原文重點） | 繁中解說 |
| :--- | :--- | :--- |
| **Institute of Electrical and Electronics Engineers (IEEE)** | Organization of electrical engineering and electronics dedicated to advancing technological innovation and creating standards in a wide area of industries including power and energy, healthcare, telecommunications, and networking | 電機電子工程專業組織，跨產業制訂標準，涵蓋電力能源、醫療、電訊同網絡（**Ethernet**、**WLAN** 都係 IEEE 標準） |
| **Electronic Industries Alliance (EIA)** | Best known for its standards related to electrical wiring, connectors, and the 19-inch racks used to mount networking equipment | 以**電線、接頭**同用嚟安裝網絡設備嘅 **19-inch racks** 標準最出名 |
| **Telecommunications Industry Association (TIA)** | Responsible for developing communication standards in a variety of areas including radio equipment, cellular towers, Voice over IP (VoIP) devices, satellite communications, and more | 開發多個範疇嘅通訊標準，包括 radio equipment、cellular towers、**VoIP** 設備、satellite communications 等 |
| **International Telecommunications Union-Telecommunication Standardization Sector (ITU-T)** | One of the largest and oldest communication standard organizations; defines standards for video compression, Internet Protocol Television (IPTV), and broadband communications, such as a digital subscriber line (DSL) | 最大同最老嘅通訊標準組織之一；制訂 **video compression**、**IPTV** 同 **broadband communications**（例如 **DSL**）嘅標準 |

> **English Standard Definition:** "The Institute of Electrical and Electronics Engineers (IEEE) is an organization of electrical engineering and electronics dedicated to advancing technological innovation and creating standards in a wide area of industries including power and energy, healthcare, telecommunications, and networking."  
> **English Standard Definition:** "The Electronic Industries Alliance (EIA) is best known for its standards related to electrical wiring, connectors, and the 19-inch racks used to mount networking equipment."  
> **English Standard Definition:** "The Telecommunications Industry Association (TIA) is responsible for developing communication standards in a variety of areas including radio equipment, cellular towers, Voice over IP (VoIP) devices, satellite communications, and more."  
> **English Standard Definition:** "The ITU-T is one of the largest and oldest communication standard organizations; it defines standards for video compression, Internet Protocol Television (IPTV), and broadband communications, such as a digital subscriber line (DSL)."

必記數字：**19-inch racks**（EIA 標準）——呢個係全節唯一嘅具體數字，考試一問「邊個組織負責 rack 標準」就係 **EIA**。

### 3.5 Reference Models — 分層參考模型（Slides 21–22）

#### 3.5.1 The Benefits of Using a Layered Model（Slide 21）

繁中解說：為咩要用分層模型？四個好處（必須背到可以逐條寫出）：

1. **協助協議設計**——因為喺某一層運作嘅協議，所處理嘅資訊同對上／對下層嘅介面都已經定義好；
2. **防止改動擴散**——某一層嘅技術或能力改動，唔會影響其他層；
3. **促進競爭**——唔同 vendor 嘅產品可以一齊工作；
4. **提供共同語言**——用嚟描述網絡功能同能力。

而描述網絡運作嘅**分層模型有兩個**：**Open System Interconnection (OSI) Reference Model** 同 **TCP/IP Reference Model**。

> **English Standard Definition:** "Assist in protocol design because protocols that operate at a specific layer have defined information that they act upon and a defined interface to the layers above and below."  
> **English Standard Definition:** "Prevent technology or capability changes in one layer from affecting other layers above and below."  
> **English Standard Definition:** "Foster competition because products from different vendors can work together."  
> **English Standard Definition:** "Provide a common language to describe networking functions and capabilities."  
> **English Standard Definition:** "Two layered models describe network operations: Open System Interconnection (OSI) Reference Model and TCP/IP Reference Model."

#### 3.5.2 The OSI and the TCP/IP Models（Slide 22）

繁中解說：呢版係全課最核心嘅圖表，左邊係 **OSI 7 層**（由下至上 1–7），右邊係 **TCP/IP 4 層**。逐層功能如下（Slide 22 原文編號）：

| Layer | 原文描述 | 繁中解說 |
| :--- | :--- | :--- |
| **7. Application** | Contains protocols used for process-to-process communications | 包含用作 process-to-process 通訊嘅協議 |
| **6. Presentation** | Provides for common representation of the data transferred between application layer services | 為 application 層服務之間傳輸嘅資料提供共同表示法 |
| **5. Session** | Provides services to the presentation layer and to manage data exchange | 向上提供服務，並管理資料交換（對話） |
| **4. Transport** | Defines services to segment, transfer, and reassemble the data for individual communications | 定義為個別通訊而設嘅 segment、transfer、reassemble 服務 |
| **3. Network** | Provides services to exchange the individual pieces of data over the network | 提供喺網絡上交換個別資料件嘅服務（即 routing 同 logical addressing） |
| **2. Data Link** | Describes methods for exchanging data frames over a common media | 描述喺共同媒介上交換 **data frames** 嘅方法 |
| **1. Physical** | Describes the means to activate, maintain, and de-activate physical connections | 描述啟動、維持同關閉 physical connections 嘅方法 |

而 TCP/IP 四層嘅對應描述（Slide 22 另一欄）：

| TCP/IP Layer | 原文描述 | 繁中解說 |
| :--- | :--- | :--- |
| **Application** | Represents data to the user, plus encoding and dialog control | 向用戶呈現資料，並做 encoding 同 dialog control（＝OSI 頂三層） |
| **Transport** | Supports communication between various devices across diverse networks | 支援各種設備之間跨不同網絡嘅通訊（＝OSI Transport） |
| **Internet** | Determines the best path through the network | 決定穿越網絡嘅最佳路徑（＝OSI Network 層） |
| **Network Access** | Controls the hardware devices and media that make up the network | 控制組成網絡嘅硬件設備同媒介（＝OSI 底兩層） |

> **English Standard Definition:** "The Application layer contains protocols used for process-to-process communications."  
> **English Standard Definition:** "The Presentation layer provides for common representation of the data transferred between application layer services."  
> **English Standard Definition:** "The Session layer provides services to the presentation layer and manages data exchange."  
> **English Standard Definition:** "The Transport layer defines services to segment, transfer, and reassemble the data for individual communications."  
> **English Standard Definition:** "The Network layer provides services to exchange the individual pieces of data over the network."  
> **English Standard Definition:** "The Data Link layer describes methods for exchanging data frames over a common media."  
> **English Standard Definition:** "The Physical layer describes the means to activate, maintain, and de-activate physical connections."  
> **English Standard Definition:** "In the TCP/IP model, the Application layer represents data to the user plus encoding and dialog control; the Transport layer supports communication between various devices across diverse networks; the Internet layer determines the best path through the network; and the Network Access layer controls the hardware devices and media that make up the network."

對照規律（必記）：**TCP/IP 把 OSI 頂三層（Application／Presentation／Session）合併成一層 Application**，把 **OSI 底兩層（Data Link／Physical）合併成一層 Network Access**；中間嘅 **Transport** 同 **Network（TCP/IP 叫 Internet）** 一對一對應。所以 OSI 7 ↔ TCP/IP 4 嘅「合併公式」係 **3 + 1 + 1 + 2 = 7**。

> **圖示描述**：Slide 22 圖示左右並排兩個模型——左邊 OSI 7 層由 Physical 到 Application，右邊 TCP/IP 4 層由 Network Access 到 Application；圖中用水平線同跨欄連接，顯示 TCP/IP 頂層吸收 OSI 三層、底層吸收 OSI 兩層，中間兩層一一對應。

### 3.6 Data Encapsulation — 資料封裝（Slides 23–27）

#### 3.6.1 Segmenting Messages（Slide 23）

繁中解說：**Segmenting messages** 係把訊息拆成較細單位嘅過程，好處有兩個：

- **Increases speed**——大量資料可以喺網絡上傳送，而唔會長時間佔死一條 communications link；
- **Increases efficiency**——只有送唔到目的地嘅 segment 需要重傳，而唔係成條 data stream 重傳。

另外一個要識嘅詞：**Multiplexing**——把多條 segmented data 嘅資料流互相交織（interleaving）埋一齊嘅過程。

> **English Standard Definition:** "Segmenting messages is the process of breaking up messages into smaller units."  
> **English Standard Definition:** "Increases speed — Large amounts of data can be sent over the network without tying up a communications link."  
> **English Standard Definition:** "Increases efficiency — Only segments which fail to reach the destination need to be retransmitted, not the entire data stream."  
> **English Standard Definition:** "Multiplexing is the process of taking multiple streams of segmented data and interleaving them together."

解題提示：題目把 speed／efficiency 兩個好處對調做選項係常見陷阱——「唔會 tie up 條 link」＝ **speed**；「只重傳失敗嘅 segment」＝ **efficiency**。

#### 3.6.2 Sequencing Messages（Slide 24）

繁中解說：**Sequencing messages** 係為 segments **編號**嘅過程，好處係令訊息可以喺目的地 **reassembled**（重組）返。而負責做 sequencing 嘅係 **TCP**——TCP 負責為個別 segment 排次序。呢個亦解釋咗點解 TCP 叫「reliable」：有編號、有確認、可重傳、可重組。

> **English Standard Definition:** "Sequencing messages is the process of numbering the segments so that the message may be reassembled at the destination."  
> **English Standard Definition:** "TCP is responsible for sequencing the individual segments."

#### 3.6.3 Protocol Data Units（Slide 25）

繁中解說：當 application data 沿住 protocol stack 向下走、準備經網絡媒介傳送，每一層都會加入唔同嘅協議資訊（呢個就係 **encapsulation process**）。而 **一件資料喺任何一層嘅形態，就叫 protocol data unit (PDU)**。每一層嘅 PDU 有唔同名字，以反映佢嘅新功能：

| 層 | PDU 名稱（Slide 25 原文） | 繁中對照 |
| :--- | :--- | :--- |
| Application | **Data (Data Stream)** | 資料（資料流） |
| Transport | **TCP Segment / UDP Datagram** | TCP 段／UDP 資料報 |
| Network | **Packet** | 封包 |
| Data Link | **Frame** | 幀 |
| Physical | **Bits (Bit Stream)** | 位元（位元流） |

> **English Standard Definition:** "As application data is passed down the protocol stack on its way to be transmitted across the network media, various protocol information is added at each level (encapsulation process)."  
> **English Standard Definition:** "The form that a piece of data takes at any layer is called a protocol data unit (PDU)."  
> **English Standard Definition:** "At each layer, a PDU has a different name to reflect its new functions: Data (Data Stream), TCP Segment/UDP Datagram, Packet, Frame, Bits (Bit Stream)."

背誦口訣：**「資料 → 段 → 包 → 幀 → 位元」**（Data → Segment → Packet → Frame → Bits）。注意 Transport 層嘅 PDU 係 **TCP Segment** 或 **UDP Datagram**——兩個名都要寫得出，因為 TCP 同 UDP 唔同。

> **圖示描述**：Slide 25 圖示一疊由上而下嘅層級方塊，每一層右手邊標明該層 PDU 嘅名稱，由最頂 Data 一路落到最底 Bits，顯示資料形態隨層改變。

#### 3.6.4 Encapsulation Example（Slide 26）

繁中解說：訊息喺網絡上傳送時，encapsulation 係**由上至下（top to bottom）**進行。每一層都會把**上一層嘅資訊視為自己嘅 data**（upper layer information is considered data within the encapsulated protocol）。

以「web server 送一個 web page 給 web client」為例，encapsulation 過程係：

**User Data → TCP Segment → IP Packet → Ethernet Frame**

> **English Standard Definition:** "When messages are being sent on a network, the encapsulation process works from top to bottom."  
> **English Standard Definition:** "At each layer, the upper layer information is considered data within the encapsulated protocol."  
> **English Standard Definition:** "As a web server sends a web page to a web client, the encapsulation process is: User Data, TCP Segment, IP Packet, Ethernet Frame."

拆解關鍵詞：**User Data**（應用層資料）→ **TCP Segment**（Transport 層加 TCP header）→ **IP Packet**（Network 層加 IP header）→ **Ethernet Frame**（Data Link 層加 Ethernet header 同 trailer）。注意呢條線講到 frame 為止（冇寫 Bits），因為例子只列到 Data Link 層。

> **圖示描述**：Slide 26 圖示一份 User Data 由 web server 出發，逐層被包入 TCP header、IP header、Ethernet header／trailer，最後成為一個 Ethernet Frame 上媒介。

#### 3.6.5 De-encapsulation Example（Slide 27）

繁中解說：去到接收嘅 host，過程會反轉，叫做 **de-encapsulation**。當一層完成佢嘅處理，就會**剝走自己嘅 header**，然後交上一層處理；每一層都重複同樣動作，直到變返一個應用程式處理得到嘅 data stream。

接收順序係：**Received as Bits (Bit Stream) → Frame → Packet → Segment → Data (Data Stream)**

> **English Standard Definition:** "The process is reversed at the receiving host and is known as de-encapsulation."  
> **English Standard Definition:** "When a layer completes its process, that layer strips off its header and passes it up to the next level to be processed. This is repeated at each layer until it is a data stream that the application can process."  
> **English Standard Definition:** "Received as Bits (Bit Stream), Frame, Packet, Segment, Data (Data Stream)."

必背兩條序列（一出一入，方向相反）：
- **Encapsulation（向下）**：Data → Segment → Packet → Frame → Bits
- **De-encapsulation（向上）**：Bits → Frame → Packet → Segment → Data

> **圖示描述**：Slide 27 圖示接收 host 由媒介收到 Bits，逐層剝走 Ethernet、IP、TCP header，最後把 Data Stream 交上應用程式，與 Slide 26 嘅封裝方向完全相反。

### 3.7 Data Access — 資料存取（Slides 28–37）

#### 3.7.1 Enable IP on a Host（Slide 28）

繁中解說：一部 host 要用 IP，位址可以用兩種方式取得：

- **Dynamically Assigned IP Address**——IP 位址資訊由 server 用 **Dynamic Host Configuration Protocol (DHCP)** 動態指派；
- **Statically Assigned IP address**——host 由人手指定 **IP address、subnet mask、default gateway**；亦可以同時指定 **DNS server** 嘅 IP 位址。

> **English Standard Definition:** "Dynamically Assigned IP Address — IP Address information is dynamically assigned by a server using Dynamic Host Configuration Protocol (DHCP)."  
> **English Standard Definition:** "Statically Assigned IP address — The host is manually assigned an IP address, subnet mask and default gateway. A DNS server IP address can also be assigned."

考試提示：呢度係 L3 唯一講到 IP 位址設定嘅地方；更深入嘅位址結構、mask 計算同 subnetting 屬 L7 範圍，本課只需記住「dynamic = DHCP／static = 人手四個欄位」。

#### 3.7.2 Layer 2 and Layer 3 Addresses（Slide 29）

繁中解說：跨網絡傳送時，一個 packet 實際上有**兩組位址同時存在**：

| 層級 | 職責 | 別名（全部要識） |
| :--- | :--- | :--- |
| **Data link layer source and destination addresses** | 負責把 **data link frame** 由一個 **NIC** 送到同一個網絡上嘅另一個 NIC | **layer 2 address / MAC address / physical address / data link address** |
| **Network layer source and destination addresses** | 負責把 **IP packet** 由原本來源送到最終目的地 | **layer 3 address / IP address / logical address / hierarchical address / network address** |

另外仲有一類位址：**well-known port numbers** 用嚟識別現時使用中嘅應用程式。

> **English Standard Definition:** "Data link layer source and destination addresses are responsible for delivering the data link frame from one network interface card (NIC) to another NIC on the same network (layer 2 address / MAC address / physical address / data link address)."  
> **English Standard Definition:** "Network layer source and destination addresses are responsible for delivering the IP packet from original source to the final destination (layer 3 address / IP address / logical address / hierarchical address / network address)."  
> **English Standard Definition:** "Well-known port numbers identify the applications being used."

必背：**MAC** 嘅五個名同 **IP** 嘅五個名要一眼配對到——見到 "physical address" 或 "data link address" 就係 **layer 2**；見到 "logical address"、"hierarchical address" 或 "network address" 就係 **layer 3**。

> **圖示描述**：Slide 29 圖示一個封裝好嘅 frame，同時標明 layer 2 位址（frame 上嘅 source／destination MAC）同 layer 3 位址（內裏 packet 嘅 source／destination IP），顯示兩者係兩個獨立層級嘅定址。

#### 3.7.3 IP Address Structure（Slide 30）

繁中解說：一個 IP address 包含**兩部分**：

- **Network portion (IPv4) 或 Prefix (IPv6)**——位址**最左邊**嘅部分，指出呢個 IP address 屬於邊個 network group；**每個 LAN 或 WAN 會擁有同一個 network portion**；
- **Host portion (IPv4) 或 Interface ID (IPv6)**——餘下嘅部分，識別 group 內嘅某一部特定設備；**呢部分對網絡上每部設備都係獨一無二**。

> **English Standard Definition:** "An IP address contains two parts: Network portion (IPv4) or Prefix (IPv6), and Host portion (IPv4) or Interface ID (IPv6)."  
> **English Standard Definition:** "The left-most part of the address indicates the network group which the IP address is a member. Each LAN or WAN will have the same network portion."  
> **English Standard Definition:** "The remaining part of the address identifies a specific device within the group. This portion is unique for each device on the network."

> **圖示描述**：Slide 30 圖示一個 IP address 被切開兩截——左邊 Color 標示 network portion（IPv6 叫 Prefix），右邊標示 host portion（IPv6 叫 Interface ID），並註明同一 LAN／WAN 內左邊部分相同、右邊部分各設備不同。

#### 3.7.4 IP Packet Addresses（Slide 31）

繁中解說：**IP packet** 內含兩個 IP 位址：

- **Source IP address**——發送設備嘅 IP 位址，即 packet 嘅**原本來源**；
- **Destination IP address**——接收設備嘅 IP 位址，即 packet 嘅**最終目的地**。

呢兩個位址可能喺同一條 link 上（same link），亦可能係 remote。呢個「原本來源／最終目的地」嘅概念，係 3.7.5 同 3.7.6 全部題目嘅基礎。

> **English Standard Definition:** "The IP packet contains two IP addresses: Source IP address — the IP address of the sending device, original source of the packet; and Destination IP address — the IP address of the receiving device, final destination of the packet."  
> **English Standard Definition:** "These addresses may be on the same link or remote."

#### 3.7.5 Sending to a Device on the Same Network（Slides 32–33）

繁中解說（Slide 32 位址例子）：當兩部設備喺**同一個網絡**，佢哋位址嘅 network portion 會係**同一個數字**：

- **PC1 — 192.168.1.110**
- **FTP Server — 192.168.1.9**

兩者左邊部分都係 **192.168.1**，所以屬同一個網絡 → 資料可以直接送到目的地，唔需要經過 router。

繁中解說（Slide 33）：**MAC addresses 係 physically embedded 入 Ethernet NIC**，而且屬 **local addressing**。當設備喺同一個 Ethernet 網絡時，data link frame 會用**目的地 NIC 嘅 MAC address** 做 **Destination MAC address**；而 **Source MAC address** 就係**喺該 link 上嘅發起者**嘅 MAC。

> **English Standard Definition:** "When devices are on the same network the source and destination will have the same number in network portion of the address."  
> **English Standard Definition:** "MAC addresses are physically embedded into the Ethernet NIC and are local addressing."  
> **English Standard Definition:** "When devices are on the same Ethernet network the data link frame will use the MAC address of the destination NIC as the Destination MAC address."  
> **English Standard Definition:** "The Source MAC address will be that of the originator on the link."

> **圖示描述**：Slide 32／33 圖示 PC1（192.168.1.110）同 FTP Server（192.168.1.9）接喺同一個 switch／LAN 內；圖中顯示 frame 嘅 Destination MAC 直接填目的地 NIC 嘅 MAC，Source MAC 填 PC1 嘅 MAC，而兩個 IP 嘅 network portion 相同。

#### 3.7.6 Sending to a Device on a Remote Network（Slides 34–37）

繁中解說（Slide 34）：如果 source 同 destination 嘅 **network portion 唔同**，就代表佢哋喺**唔同嘅網絡**：

- **PC1 — 192.168.1.110**
- **Web Server — 172.16.1.99**

左邊部分（192.168.1 vs 172.16.1）唔同 → 屬 remote communication → 一定要經 router 轉發。

繁中解說（Slides 35–37）= 一次跨網段傳送，MAC 位址分三段變化，而 **IP packet 全程唔會被修改**（"The packet is not modified."）：

| 段落 | Source（發送方） | Destination（接收方） | Packet 狀態 |
| :--- | :--- | :--- | :--- |
| **第一段（first segment）** | **PC1 NIC** 送出 frame | **First Router — default gateway interface** 收到 frame | 未改 |
| **第二段（second hop）** | **First Router — exit interface** 送出 frame | **Second Router — entrance interface** 收到 frame | **The packet is not modified.** |
| **最後一段（last segment）** | **Second Router — exit interface** 送出 frame | **Web Server NIC** 收到 frame | **The packet is not modified.** |

一句總結規律：**MAC address 每一跳（hop）都會換；IP address（source 同 destination）由頭到尾唔變。** 原因好簡單——MAC 係 local addressing，只負責「由呢一部設備送去下一個裝置」；IP 係 hierarchical addressing，負責「由最初來源送到最終目的地」。

> **English Standard Definition:** "When the source and destination have a different network portion, this means they are on different networks."  
> **English Standard Definition:** "The MAC addressing for the first segment is: Source — PC1 NIC sends the frame; Destination — the first router's default gateway interface receives the frame."  
> **English Standard Definition:** "The MAC addressing for the second hop is: Source — the first router's exit interface sends the frame; Destination — the second router's entrance interface receives the frame. The packet is not modified."  
> **English Standard Definition:** "The MAC addressing for the last segment is: Source — the second router's exit interface sends the frame; Destination — the Web Server NIC receives the frame. The packet is not modified."

> **圖示描述**：Slides 34–37 圖示 PC1 經兩個 router 去 Web Server 嘅網絡；圖中用逐段高亮嘅方式表示 frame 每經過一個 hop 就重新封裝一次、換上新的 Source／Destination MAC，但圖中 packet 內部嘅 Source IP 同 Destination IP 全程保持不變。

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/縮寫 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| Protocol | 協議；通訊會跟隨嘅規則 | "Protocols are the rules that communications will follow." |
| Source (Sender) | 來源／發送方 | "There will be a source (sender) in any communication." |
| Destination (Receiver) | 目的地／接收方 | "There will be a destination (receiver) in any communication." |
| Channel (Media) | 媒介；提供通訊路徑 | "There will be a channel (media) that provides for the path of communications to occur." |
| Message Encoding | 訊息編碼；把資訊轉成可傳輸嘅形式 | "Encoding is the process of converting information into another acceptable form for transmission." |
| Message Decoding | 訊息解碼；反轉 encoding | "Decoding reverses this process to interpret the information." |
| Message Formatting and Encapsulation | 訊息格式化同封裝 | "Encapsulation is the process of placing one message format inside another message format." |
| De-encapsulation | 解封；收件方反轉封裝過程 | "De-encapsulation occurs when the process is reversed by the recipient and the message is retrieved." |
| Segmentation | 分段；把長訊息拆成細件 | "Long messages must be broken into smaller pieces (segmentation) to travel across a network." |
| Message Size | 訊息大小；每件用獨立 frame 送 | "Each piece is sent in a separate frame, and each frame has its own addressing information." |
| Message Timing | 訊息時序；flow control／response timeout／access method | "Message timing includes flow control, response timeout, and access method." |
| Flow Control | 流量控制；管理傳輸速率 | "Flow control manages the rate of data transmission and defines how much information can be sent and the speed at which it can be delivered." |
| Response Timeout | 回應逾時；等幾久無回覆 | "Response timeout manages how long a device waits when it does not hear a reply from the destination." |
| Access Method | 存取方法；決定幾時可以送訊息 | "Access method determines when someone can send a message." |
| Collision | 碰撞；多部設備同時送導致 corrupt | "A collision is when more than one device sends traffic at the same time and the messages become corrupt." |
| Proactive / Reactive Protocol | 主動預防／事後回復嘅協議 | "Some protocols are proactive and attempt to prevent collisions; other protocols are reactive and establish a recovery method after the collision occurs." |
| Unicast | 單點傳播；one-to-one | "Unicast is a one-to-one delivery option." |
| Multicast | 多點傳播；one-to-many | "Multicast is a one-to-many delivery option." |
| Broadcast | 廣播；one-to-all | "Broadcast is a one-to-all delivery option, used in IPv4 networks (not an option for IPv6)." |
| Anycast (IPv6) | 任播；路由到最近擁有該 unicast address 嘅設備 | "A packet sent to an IPv6 anycast address is routed to the nearest device having that unicast address." |
| Network Communications Protocol | 網絡通訊協議；令兩部以上設備通訊 | "Network communications protocols enable two or more devices to communicate over one or more networks." |
| Network Security Protocol | 網絡安全協議；做 authentication、integrity、encryption | "Network security protocols secure data to provide authentication, data integrity, and data encryption." |
| Routing Protocol | 路由協議；令 router 交換路由資訊並選路 | "Routing protocols enable routers to exchange route information, compare path information, and select best path." |
| Service Discovery Protocol | 服務發現協議；自動偵測設備或服務 | "Service discovery protocols are used for the automatic detection of devices or services." |
| Addressing | 定址；識別發送方同接收方 | "Addressing identifies sender and receiver." |
| Reliability | 可靠性；提供有保證嘅交付 | "Reliability provides guaranteed delivery." |
| Sequencing | 排序；為每個 segment 加唯一標籤 | "Sequencing uniquely labels each transmitted segment of data." |
| Error Detection | 錯誤偵測；判斷資料有冇 corrupt | "Error detection determines if data became corrupted during transmission." |
| Application Interface | 應用程式介面；process-to-process 通訊 | "Application interface provides process-to-process communications between network applications." |
| HTTP | 超文本傳輸協定；管 web client 同 server 互動 | "HTTP governs the way a web server and a web client interact and defines content and format." |
| TCP | 傳輸控制協定；可靠交付、flow control、sequencing | "TCP manages the individual conversations, provides guaranteed delivery, and manages flow control." |
| IP | 互聯網協定；全球化交付 | "IP delivers messages globally from the sender to the receiver." |
| Ethernet | 乙太網絡；同一 LAN 內 NIC 到 NIC | "Ethernet delivers messages from one NIC to another NIC on the same Ethernet LAN." |
| Protocol Suite | 協議套件；一組互相合作嘅協議 | "A protocol suite is a set of protocols that work together to provide comprehensive network communication services." |
| TCP/IP (Internet Protocol Suite) | 互聯網協議套件；由 IETF 維護 | "TCP/IP is the most common protocol suite and is maintained by the Internet Engineering Task Force (IETF)." |
| OSI Protocols | OSI 協議；ISO 同 ITU 開發 | "OSI protocols were developed by the International Organization for Standardization (ISO) and the International Telecommunications Union (ITU)." |
| AppleTalk / Novell NetWare | proprietary protocol suite（廠商專有） | "AppleTalk and Novell NetWare are proprietary protocol suites." |
| Open Standard | 開放標準；公眾免費可用、任何 vendor 可用 | "TCP/IP is an open standard protocol suite that is freely available to the public and can be used by any vendor." |
| Standards-based Protocol Suite | 標準化協議套件；業界認可、標準組織批准 | "TCP/IP is a standards-based protocol suite endorsed by the networking industry and approved by a standards organization to ensure interoperability." |
| ISOC | 互聯網協會；推廣互聯網開放發展 | "The Internet Society (ISOC) promotes the open development and evolution of internet." |
| IAB | 互聯網架構委員會；管理同開發互聯網標準 | "The Internet Architecture Board (IAB) is responsible for management and development of internet standards." |
| IETF | 互聯網工程任務小組；開發維護 TCP/IP 技術 | "The Internet Engineering Task Force (IETF) develops, updates, and maintains internet and TCP/IP technologies." |
| IRTF | 互聯網研究任務小組；長期研究 | "The Internet Research Task Force (IRTF) is focused on long-term research related to internet and TCP/IP protocols." |
| ICANN | 統籌 IP 位址分配、domain name 管理 | "ICANN coordinates IP address allocation, the management of domain names, and assignment of other information." |
| IANA | 為 ICANN 監管位址分配同 protocol identifiers | "IANA oversees and manages IP address allocation, domain name management, and protocol identifiers for ICANN." |
| IEEE | 電機電子工程師學會；Ethernet／WLAN 標準 | "The IEEE creates standards in a wide area of industries including power and energy, healthcare, telecommunications, and networking." |
| EIA | 電子工業聯盟；wiring、connectors、19-inch racks 標準 | "The EIA is best known for its standards related to electrical wiring, connectors, and the 19-inch racks used to mount networking equipment." |
| TIA | 電訊工業協會；radio equipment、cellular towers、VoIP | "The TIA is responsible for developing communication standards including radio equipment, cellular towers, VoIP devices, and satellite communications." |
| ITU-T | 國際電信聯盟電信標準化部門；video compression、IPTV、DSL | "The ITU-T defines standards for video compression, Internet Protocol Television (IPTV), and broadband communications, such as a digital subscriber line (DSL)." |
| Layered Model | 分層模型；四大好處 | "Layered models assist in protocol design, prevent changes in one layer from affecting other layers, foster competition, and provide a common language." |
| OSI Reference Model | OSI 參考模型；7 層 | "The OSI reference model has seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application." |
| TCP/IP Reference Model | TCP/IP 參考模型；4 層 | "The TCP/IP reference model has four layers: Network Access, Internet, Transport, and Application." |
| Multiplexing | 多工；把多條 segmented data 交織 | "Multiplexing is the process of taking multiple streams of segmented data and interleaving them together." |
| PDU (Protocol Data Unit) | 協定資料單元；資料喺某一層嘅形態 | "A protocol data unit (PDU) is the form that a piece of data takes at any layer." |
| Data (Data Stream) | Application 層 PDU | "The PDU at the application layer is called Data (Data Stream)." |
| TCP Segment / UDP Datagram | Transport 層 PDU | "The PDU at the transport layer is called a TCP Segment or UDP Datagram." |
| Packet | Network 層 PDU | "The PDU at the network layer is called a Packet." |
| Frame | Data Link 層 PDU | "The PDU at the data link layer is called a Frame." |
| Bits (Bit Stream) | Physical 層 PDU | "The PDU at the physical layer is called Bits (Bit Stream)." |
| Encapsulation Sequence | 封裝順序（向下） | "The encapsulation sequence is User Data, TCP Segment, IP Packet, Ethernet Frame." |
| De-encapsulation Sequence | 解封順序（向上） | "The de-encapsulation sequence is Bits, Frame, Packet, Segment, Data." |
| DHCP | 動態主機設定協議；動態派 IP | "Dynamically assigned IP address information is assigned by a server using Dynamic Host Configuration Protocol (DHCP)." |
| Statically Assigned IP Address | 靜態 IP；人手指定 IP、mask、gateway、DNS | "With a statically assigned IP address, the host is manually assigned an IP address, subnet mask and default gateway." |
| NIC | 網絡介面卡；MAC 實體嵌入其中 | "MAC addresses are physically embedded into the Ethernet NIC and are local addressing." |
| MAC Address | 實體／data link 位址；layer 2 | "The data link layer address is also called the layer 2 address, MAC address, physical address, or data link address." |
| IP Address | 邏輯／hierarchical 位址；layer 3 | "The network layer address is also called the layer 3 address, IP address, logical address, hierarchical address, or network address." |
| Network Portion / Prefix | 位址左邊部分；識別 network group | "The left-most part of the address indicates the network group which the IP address is a member." |
| Host Portion / Interface ID | 位址餘下部分；識別個別設備 | "The remaining part of the address identifies a specific device within the group." |
| Source / Destination IP Address | packet 內嘅原本來源同最終目的地 | "The IP packet contains a source IP address (original source) and a destination IP address (final destination)." |
| Well-known Port Number | 著名埠號；識別應用程式 | "Well-known port numbers identify the applications being used." |
| Default Gateway | 默認閘道；跨網段時嘅第一個 router 介面 | "The MAC addressing for the first segment: the source is the PC1 NIC and the destination is the first router's default gateway interface." |
| WLAN | 無線區域網絡；network access 層 LAN 協議 | "The most common network access layer LAN protocols are Ethernet and WLAN (wireless LAN)." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

1. **先理解觀念（Understand）**：由最底層嘅邏輯入手——先接受「通訊 = source + destination + channel」同「protocol = 規則」；再理解五大要求（encoding、encapsulation、size、timing、delivery options）其實係「點樣把一句話變成一個送得出嘅 frame」；然後理解分層模型只係「人類為咗分工同定位故障而畫嘅地圖」，OSI 7 層同 TCP/IP 4 層係同一件事嘅兩種切法；最後理解 encapsulation 係「每層加一個 header」、de-encapsulation 係「每層剝走自己嘅 header」。
2. **背誦英文短語（Memorise）**：四大通訊要求、五大協議要求、message timing 三項定義句、Unicast／Multicast／Broadcast 三句、六項協議功能表、四種標準組織嘅職責一句（ISOC、IAB、IETF、IRTF、ICANN、IANA、IEEE、EIA、TIA、ITU-T）、分層模型四大好處四句、OSI 每層一句功能描述、PDU 五個名稱、encapsulation／de-encapsulation 兩條序列。
3. **掌握比較／判斷（Compare & Apply）**：做三組對比表——(a) encoding vs encapsulation；(b) OSI 7 層 vs TCP/IP 4 層（含 3+1+1+2 合併公式）；(c) layer 2 address（MAC）vs layer 3 address（IP），記住各自嘅五個別名。再練三組「關鍵字 → 答案」速配：`collision` → access method；`tie up a communications link` → increases speed；`only failed segments retransmitted` → increases efficiency。
4. **能解答英文考題（Answer）**：例如
   - "What are the three elements of any communication?" → "A source (sender), a destination (receiver), and a channel (media)."
   - "What five details do network protocols define?" → "Message encoding and decoding, message formatting and encapsulation, message size, message timing, and message delivery options."
   - "What is the difference between encoding and encapsulation?" → "Encoding converts information into another acceptable form for transmission; encapsulation places one message format inside another message format."
   - "Why does a receiving host need sequencing?" → "Because sequencing numbers the segments so that the message may be reassembled at the destination."
   - "Name the PDU at each layer." → "Data at the application layer, TCP Segment or UDP Datagram at the transport layer, Packet at the network layer, Frame at the data link layer, and Bits at the physical layer."
   - "What determines whether a destination is on the same network?" → "Devices on the same network have the same number in the network portion of the address."
   - "Which addresses change as a packet crosses a router, and which do not?" → "The MAC addresses (data link layer addresses) change at every hop; the IP addresses (network layer addresses) remain the same from original source to final destination."
5. **考前自測（Self-check）**：合上筆記，用一張白紙畫出 OSI 7 層／TCP/IP 4 層對照圖、寫出 PDU 五個名同兩條序列、寫出「PC1 → Router A → Router B → Web Server」三段 MAC 變化表。三樣都寫得出，就代表本課達標。

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**關鍵數字／清單速記**

| 項目 | 數字／內容 |
| :--- | :--- |
| 通訊三大要素（3 elements） | source (sender)、destination (receiver)、channel (media) |
| 通訊要照顧嘅四大要求 | identified sender and receiver；common language and grammar；speed and timing of delivery；confirmation or acknowledgment |
| 網絡協議要定義嘅五大細節 | encoding and decoding；formatting and encapsulation；size；timing；delivery options |
| Message timing 三機制 | flow control、response timeout、access method |
| Protocol types 四型 | network communications、network security、routing、service discovery |
| Protocol functions 六項 | addressing、reliability、flow control、sequencing、error detection、application interface |
| 分層模型四大好處 | assist in protocol design；prevent changes affecting other layers；foster competition；provide a common language |
| OSI vs TCP/IP | 7 層 vs 4 層（合併公式 3 + 1 + 1 + 2） |
| Segmenting 兩大好處 | increases speed、increases efficiency |
| EIA 標準中最出名嘅數字 | **19-inch racks** |
| Slide 32／34 位址例子 | 同網段：PC1 **192.168.1.110** ↔ FTP Server **192.168.1.9**；跨網段：PC1 **192.168.1.110** ↔ Web Server **172.16.1.99** |

**OSI 7 層 vs TCP/IP 4 層對照表（必背）**

| OSI 7 層（下→上） | 招牌功能 | PDU | TCP/IP 4 層 |
| :--- | :--- | :--- | :--- |
| 1 Physical | activate／maintain／de-activate physical connections | Bits | Network Access（併底兩層） |
| 2 Data Link | exchange data frames over a common media | Frame | Network Access |
| 3 Network | exchange individual pieces of data（path determination、logical addressing） | Packet | Internet |
| 4 Transport | segment、transfer、reassemble data for individual communications | Segment / Datagram | Transport |
| 5 Session | manage data exchange（dialog） | Data | Application（併頂三層） |
| 6 Presentation | common representation of data | Data | Application |
| 7 Application | process-to-process communications | Data | Application |

**PDU 階梯（必背）**

```
Application  →  Data (Data Stream)
Transport    →  TCP Segment / UDP Datagram
Network      →  Packet
Data Link    →  Frame
Physical     →  Bits (Bit Stream)
```

**封裝／解封兩條序列（方向相反）**
- Encapsulation（向下）：**Data → Segment → Packet → Frame → Bits**
- De-encapsulation（向上）：**Bits → Frame → Packet → Segment → Data**
- 例子（web server 送 web page）：**User Data → TCP Segment → IP Packet → Ethernet Frame**

**標準組織一句記**
- **ISOC** 推廣 → **IAB** 管標準 → **IETF** 維護 TCP/IP → **IRTF** 做長期研究
- **ICANN** 統籌（coordinates）→ **IANA** 為 ICANN 執行（oversees and manages ... for ICANN）
- **IEEE** 做 networking／WLAN 標準 ｜ **EIA** 做 wiring、connectors、**19-inch racks** ｜ **TIA** 做 radio equipment、cellular towers、VoIP ｜ **ITU-T** 做 video compression、IPTV、**DSL**

**位址速記：「MAC 每跳換、IP 永不變」**

| 情境 | Source | Destination |
| :--- | :--- | :--- |
| 同網段（same network portion） | 發起者嘅 NIC MAC | 目的地 NIC 嘅 MAC |
| 跨網段第一段 | PC1 NIC | First Router（default gateway interface） |
| 跨網段第二跳 | First Router（exit interface） | Second Router（entrance interface） |
| 跨網段最後一段 | Second Router（exit interface） | Web Server NIC |
| IP 欄位（全程） | 原本 source IP | 最終 destination IP，**The packet is not modified.** |

**Layer 2 vs Layer 3 別名速記**
- **Layer 2**：MAC address / physical address / data link address（physically embedded in the NIC，local addressing）
- **Layer 3**：IP address / logical address / hierarchical address / network address（network portion + host portion）

**易混對比（陷阱題）**
- Encoding（converts information into another form）vs Encapsulation（places one format **inside** another）
- Flow control（時序：管理速率）vs Flow control（功能：ensures data flows at an efficient rate）
- Speed（唔會 tie up a communications link）vs Efficiency（只重傳失敗嘅 segment）
- Unicast = one-to-one ｜ Multicast = one-to-many ｜ Broadcast = one-to-all（IPv4 用，IPv6 冇）

**必背英文金句**
- "Protocols are the rules that communications will follow."
- "Encapsulation is the process of placing one message format inside another message format."
- "TCP/IP is an open standard protocol suite that is freely available to the public and can be used by any vendor."
- "Open standards encourage interoperability, competition, and innovation."
- "MAC addresses change at every hop, but the IP packet is not modified end-to-end."
