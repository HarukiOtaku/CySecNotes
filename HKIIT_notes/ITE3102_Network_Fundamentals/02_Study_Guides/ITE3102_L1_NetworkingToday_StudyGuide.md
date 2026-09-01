# ITE3102 L1: Networking Today — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Module 1: Networking Today
> **原始檔**：`01_Raw_Materials/Lectures/Lecture1_NetworkingToday.pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 最後對照懶人包自測

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課是整門網絡課程的「總地圖」，一口氣建立所有基礎詞彙與架構框架：網絡三要素（**End Device**、**Intermediary Device**、**Network Media**）、網絡類型（**LAN**、**WAN**、**Internet**、**Intranet**、**Extranet**）、家用與企業的互聯網連接技術、**Reliable Network** 的四大特性（**Fault Tolerance**、**Scalability**、**QoS**、**Security**）、當代趨勢（**BYOD**、**Cloud Computing** 等）以及 **Network Security** 的基礎概念。之後所有 Switching、Routing、Security 課題都在這個框架內展開，所以本課的詞彙必須「零失誤」。

實務情境一：公司要擴充辦公室網絡，主管問「新網絡夠不夠穩、會不會一壞就全公司斷線？」——這正對應 **Fault Tolerance**（多路徑＋Packet Switching 冗餘）與 **Scalability**（跟隨標準擴充）。而同事投訴視像會議斷續，就是頻寬不足而沒有設定 **QoS** 的典型症狀。

實務情境二：小型辦公室收到釣魚電郵與惡意軟體攻擊，管理員需要部署 **Antivirus** 加 **Firewall**；大型企業則需要 **ACL**、**IPS**、**VPN** 等多層防禦。判斷「用幾多層防禦、用咩設備」，全靠本課的威脅分類（外部 vs 內部）與 CIA 三元組概念。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **說明現代科技對生活的影響** — Explain how networks affect our daily lives
2. **分辨 Host / Server / Client 角色** — Explain how host and network devices are used
3. **比較 Peer-to-Peer 與 Server-based 架構** — Compare the advantages and disadvantages of Peer-to-Peer networks
4. **分辨三種 Network Media** — Distinguish metal wires, fiber-optic cable, and wireless transmission
5. **分辨 Physical 與 Logical Topology** — Explain network representations and how they are used in network topologies
6. **比較 LAN 與 WAN** — Compare the characteristics of common types of networks
7. **解釋 Internet / Intranet / Extranet** — Explain how LANs and WANs interconnect to the internet
8. **列出 Reliable Network 四大特性** — Describe the four basic requirements of a reliable network
9. **解釋 Packet Switching 與 QoS 的作用** — Explain fault tolerance via packet switching and the purpose of QoS
10. **背誦 CIA 三元組** — Describe Confidentiality, Integrity, and Availability
11. **列出四大趨勢與四種 Cloud** — Explain BYOD, online collaboration, video, and cloud computing trends
12. **分辨外部與內部威脅並提出防禦** — Identify basic security threats and solutions for all networks

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 網絡如何影響我們的生活（Networks Affect Our Lives）

繁中解說：溝通對人類的重要性幾乎與空氣、水、食物和居所同等。透過網絡，我們以前所未有的方式互相連結：世界再無邊界，形成全球社群（Global Communities）與「人類網絡」（Human Network）。

> English Standard Definitions:
> - "Communication is almost as important to us as our reliance on air, water, food, and shelter."
> - "In today's world, through the use of networks, we are connected like never before."

### 3.2 網絡元件（Network Components）

#### 3.2.1 Host 的角色（Host Roles）

繁中解說：網絡上的每一部電腦都叫 **Host** 或 **End Device**。**Servers**（伺服器）是向 end device 提供資訊的電腦，例如 **email server**（電郵伺服器）、**web server**（網頁伺服器）、**file server**（檔案伺服器）；**Clients**（客戶端）則向伺服器發送請求以取回資訊（例如向 web server 取網頁、向 email server 取電郵）。Client 用 client software（如瀏覽器）存取，Server 則執行 server software。

> English Standard Definitions:
> - "Every computer on a network is called a host or end device."
> - "Servers are computers that provide information to end devices: email servers, web servers, and file servers."
> - "Clients are computers that send requests to the servers to retrieve information."

#### 3.2.2 Peer-to-Peer（對等網絡）

繁中解說：**Peer-to-Peer (P2P)** 網絡中，同一部裝置可以同時是 client 又是 server。這種設計只建議用於非常小的網絡。優點：容易設定（Easy to set up）、較簡單（Less complex）、成本較低（Lower cost）；缺點：沒有集中管理（No centralized administration）、不安全（Not as secure）、不可擴展（Not scalable）、效能較慢（Slower performance）。適合用途：傳送檔案與共享打印機。

> English Standard Definitions:
> - "It is possible to have a device be a client and a server in a Peer-to-Peer Network. This type of network design is only recommended for very small networks."
> - "Advantages: easy to set up, less complex, lower cost. Disadvantages: no centralized administration, not as secure, not scalable, slower performance."

#### 3.2.3 End Devices（終端設備）

繁中解說：**End Device** 是訊息產生的地方（來源）或接收的地方（目的地）。資料由 end device 產生，流經網絡，最終到達另一個 end device。

> English Standard Definitions:
> - "An end device is where a message originates from or where it is received."
> - "Data originates with an end device, flows through the network, and arrives at an end device."

#### 3.2.4 Intermediary Devices（中介設備）

繁中解說：**Intermediary Device** 負責把 end devices 互相連接，例子包括 **Switch**（交換器）、**Wireless Access Point**（無線接入點）、**Router**（路由器）與 **Firewall**（防火牆）。它們管理資料在網絡中流動，職責包括三項：重新產生並轉發資料訊號；維護網絡中存在哪些路徑的資訊；通知其他設備發生錯誤與通訊失敗。

> English Standard Definitions:
> - "An intermediary device interconnects end devices. Examples include switches, wireless access points, routers, and firewalls."
> - "Management of data as it flows through a network includes: regenerate and retransmit data signals; maintain information about what pathways exist in the network; notify other devices of errors and communication failures."

#### 3.2.5 Network Media（網絡媒體）

繁中解說：資料透過 **Media**（媒介）由來源傳到目的地，共三種：(1) 電纜內的金屬線——使用電脈衝（electrical impulses）；(2) 光纖電纜內的玻璃或塑膠纖維——使用光脈衝（pulses of light）；(3) 無線傳輸——使用特定頻率電磁波的調制（modulation of electromagnetic waves）。

> English Standard Definitions:
> - "Communication across a network is carried through a medium which allows a message to travel from source to destination."
> - "Metal wires within cables use electrical impulses. Glass or plastic fibers within cables use pulses of light. Wireless transmission uses modulation of specific frequencies of electromagnetic waves."

### 3.3 網絡表示與拓撲（Network Representations and Topologies）

繁中解說：網絡圖（常稱 **Topology Diagram**）用符號代表設備。必須認識的詞彙：**Network Interface Card (NIC)**（網絡介面卡）、**Physical Port**（實體連接埠）、**Interface**（介面）——注意：Port 與 Interface 兩個詞經常被交替使用。**Physical Topology Diagram** 顯示中介設備的實體位置與佈線安裝；**Logical Topology Diagram** 顯示設備、連接埠與網絡的位址配置（addressing scheme）。

> English Standard Definitions:
> - "Network diagrams, often called topology diagrams, use symbols to represent devices within the network."
> - "Often, the terms port and interface are used interchangeably."
> - "Physical topology diagrams illustrate the physical location of intermediary devices and cable installation."
> - "Logical topology diagrams illustrate devices, ports, and the addressing scheme of the network."

### 3.4 常見網絡類型（Common Types of Networks）

#### 3.4.1 網絡的規模（Networks of Many Sizes）

繁中解說：按規模由小到大分四級——**Small Home Networks**（幾部電腦互相連接並連上互聯網）、**SOHO（Small Office/Home Office）**（讓家居或遙距辦公室內的電腦連接公司網絡）、**Medium to Large Networks**（多個地點、數百至數千部電腦）、**World Wide Networks**（連接全球數以億計電腦，例如 Internet）。

> English Standard Definitions:
> - "Small Home Networks connect a few computers to each other and the Internet."
> - "SOHO enables computers within a home or remote office to connect to a corporate network."

#### 3.4.2 LAN 與 WAN

繁中解說：網絡基建在四個方面差異很大：覆蓋面積、用戶數量、可用服務的數量與類型、管理責任範圍。最常見的兩種網絡是 **Local Area Network (LAN)** 與 **Wide Area Network (WAN)**。**LAN** 覆蓋小範圍地理區域；**WAN** 覆蓋廣闊地理區域。

> English Standard Definitions:
> - "A LAN is a network infrastructure that spans a small geographical area."
> - "A WAN is a network infrastructure that spans a wide geographical area."

**LAN vs WAN 對比**：
- LAN：在有限範圍內互連 end devices；由單一組織或個人管理；為內部設備提供高頻寬。
- WAN：在廣闊地理區域內互連 LAN；通常由一個或多個 service provider 管理；通常提供較慢的連結。

> - "LANs interconnect end devices in a limited area, are administered by a single organization or individual, and provide high-speed bandwidth to internal devices."
> - "WANs interconnect LANs over wide geographical areas, are typically administered by one or more service providers, and typically provide slower speed links between LANs."

#### 3.4.3 Internet（互聯網）

繁中解說：**Internet** 是全球 LAN 與 WAN 的集合體：LAN 之間用 WAN 連接；WAN 可使用銅線、光纖與無線傳輸。Internet 不屬於任何個人或團體擁有。以下組織協助維持互聯網的結構：**IETF**（互聯網工程任務小組）、**ICANN**（互聯網名稱與數碼地址分配機構）、**IAB**（互聯網架構委員會）。

> English Standard Definitions:
> - "The internet is a worldwide collection of interconnected LANs and WANs. LANs are connected to each other using WANs."
> - "The internet is not owned by any individual or group."

#### 3.4.4 Intranet 與 Extranet

繁中解說：**Intranet** 是組織內部專用的私有 LAN/WAN 集合，只有組織成員或獲授權者才能存取。**Extranet** 則讓屬於另一間機構、但需要存取本組織資料的人員，獲得安全的網絡存取。

> English Standard Definitions:
> - "An intranet is a private collection of LANs and WANs internal to an organization that is meant to be accessible only to the organization's members or others with authorization."
> - "An organization might use an extranet to provide secure access to their network for individuals who work for a different organization that need access to their data."

### 3.5 互聯網連接（Internet Connections）

#### 3.5.1 家用與小型辦公室連接

繁中解說：連接互聯網的方式很多。家庭與小型辦公室常用：**Cable**（有線電視服務商提供，高頻寬、常開）、**DSL（Digital Subscriber Line）**（經電話線的高頻寬常開連接）、**Cellular**（用手機網絡連接）、**Satellite**（對沒有 ISP 的鄉郊地區是重大好處）、**Dial-up telephone**（用 modem 的廉價低頻寬選擇）。

> English Standard Definitions:
> - "Cable offers high bandwidth, always-on internet offered by cable television service providers."
> - "DSL is a high bandwidth, always-on internet connection that runs over a telephone line."
> - "Satellite is a major benefit to rural areas without Internet Service Providers."

#### 3.5.2 企業連接

繁中解說：企業需要更快的連接以支援 **IP phones**、**video conferencing** 與 **data center storage**。企業級連接通常由 Service Provider (SP) 提供，包括：**Dedicated Leased Line**（SP 網絡內保留的專用電路，以私有語音／數據網絡連接遠端辦公室）、**Ethernet WAN**（把 LAN 存取技術延伸到 WAN）、**Business DSL**（包括 **SDSL — Symmetric Digital Subscriber Line** 等多種格式）、**Satellite**（沒有有線方案時使用）。

> English Standard Definitions:
> - "Dedicated leased lines are reserved circuits within the service provider's network that connect distant offices with private voice and/or data networking."
> - "Ethernet WAN extends LAN access technology into the WAN."

#### 3.5.3 Converging Network（融合網絡）

繁中解說：在融合網絡出現之前，機構要為電話、視訊、數據分別獨立佈線，每種技術用不同規則與標準。**Converged Network** 在同一條鏈路上同時承載多種服務——data、voice、video——使用同一套規則與標準。

> English Standard Definitions:
> - "Converged data networks carry multiple services on one link, including data, voice, and video."
> - "Converged networks can deliver data, voice, and video over the same network infrastructure, using the same set of rules and standards."

### 3.6 可靠網絡（Reliable Networks）

#### 3.6.1 Network Architecture 與四大特性

繁中解說：**Network Architecture** 指支援網絡傳輸基建的技術組合。要滿足用戶期望，底層架構必須處理四大基本特性：**Fault Tolerance**（容錯）、**Scalability**（可擴展性）、**Quality of Service (QoS)**（服務品質）、**Security**（安全）。

> English Standard Definitions:
> - "Network Architecture refers to the technologies that support the infrastructure that moves data across the network."
> - "There are four basic characteristics that the underlying architectures need to address: Fault Tolerance, Scalability, Quality of Service (QoS), and Security."

#### 3.6.2 Fault Tolerance（容錯）

繁中解說：容錯網絡透過限制受影響設備的數量，來限制故障的影響；要容錯就必須有多條路徑（**Multiple paths**）。可靠網絡透過**封包交換**實現冗餘：**Packet Switching** 把流量分成封包（packets），每個封包理論上可走不同路徑到達目的地；**Circuit Switching**（電路交換）因為建立專用固定電路，做不到這一點。

> English Standard Definitions:
> - "A fault tolerant network limits the impact of a failure by limiting the number of affected devices. Multiple paths are required for fault tolerance."
> - "Reliable networks provide redundancy by implementing a packet switched network: packet switching splits traffic into packets that are routed over a network. Each packet could theoretically take a different path to the destination."
> - "This is not possible with circuit-switched networks which establish dedicated circuits."

#### 3.6.3 Scalability（可擴展性）

繁中解說：可擴展網絡能快速、容易地擴充以支援新用戶與新應用，而不影響現有用戶的服務效能。網絡設計者遵循公認的標準與 protocol，使網絡具有可擴展性。

> English Standard Definitions:
> - "A scalable network can expand quickly and easily to support new users and applications without impacting the performance of services to existing users."
> - "Network designers follow accepted standards and protocols in order to make the networks scalable."

#### 3.6.4 Quality of Service (QoS)

繁中解說：語音與直播視訊對服務傳輸品質有更高要求。看直播影片時不斷中斷（breaks and pauses），正是因為頻寬需求高於可用頻寬，且沒有設定 QoS。**QoS** 是確保所有用戶內容可靠傳輸的主要機制：設定了 QoS 政策後，路由器就能更有效地管理數據與語音流量的流向。

> English Standard Definitions:
> - "Quality of Service (QoS) is the primary mechanism used to ensure reliable delivery of content for all users."
> - "With a QoS policy in place, the router can more easily manage the flow of data and voice traffic."

#### 3.6.5 Network Security 與 CIA

繁中解說：網絡安全分兩大類：**Network Infrastructure Security**（網絡基建安全——設備的實體安全、防止未授權存取設備）與 **Information Security**（資訊安全——保護網絡傳輸中的資料）。網絡安全有三大目標（CIA Triad）：**Confidentiality**（保密性——只有指定收件者能讀取資料）、**Integrity**（完整性——確保資料在傳輸途中未被竄改）、**Availability**（可用性——授權用戶能即時、可靠地存取資料）。

> English Standard Definitions:
> - "Network infrastructure security covers the physical security of network devices and preventing unauthorized access to the devices."
> - "Information security is the protection of the information or data transmitted over the network."
> - "Confidentiality: only intended recipients can read the data. Integrity: assurance that the data has not been altered during transmission. Availability: assurance of timely and reliable access to data for authorized users."

### 3.7 網絡趨勢（Network Trends）

#### 3.7.1 四大趨勢

繁中解說：網絡角色必須持續調整以追上新科技與新裝置。影響機構與消費者的趨勢包括：**BYOD**、**Online Collaboration**（線上協作）、**Video Communications**（視訊通訊）、**Cloud Computing**（雲端運算）。

> English Standard Definitions:
> - "Bring Your Own Device (BYOD) allows users to use their own devices, giving them more opportunities and greater flexibility."
> - "BYOD means any device, with any ownership, used anywhere."

繁中解說：協作工具（例如 Cisco Webex / Webex Teams）讓用戶即時連接互動——傳即時訊息、貼圖片、影片與連結；**Video conferencing** 讓身處任何地方的人都能進行視像通話，例如 Cisco TelePresence。

#### 3.7.2 Cloud Computing 與四種 Cloud

繁中解說：**Cloud Computing** 讓我們把個人檔案或備份儲存在互聯網上的伺服器，也可經雲端存取應用程式；企業可向世界任何地方的任何裝置交付服務。雲端由 **Data Center**（數據中心）支撐；小型公司負擔不起自己的數據中心，會向大型數據中心機構租用伺服器與儲存服務。雲端分四種：**Public Clouds**（公眾可用，按用量付費或免費）、**Private Clouds**（特定組織或機構專用，如政府）、**Hybrid Clouds**（由兩種或以上雲端組成，各部分保持獨立但以同一架構連接）、**Custom Clouds**（按特定行業需求建造，如醫療或媒體，可私有可公有）。

> English Standard Definitions:
> - "Public Clouds are available to the general public through a pay-per-use model or for free."
> - "Private Clouds are intended for a specific organization or entity such as the government."
> - "Hybrid Clouds are made up of two or more cloud types; each part remains a distinctive object but both are connected using the same architecture."
> - "Custom Clouds are built to meet the needs of a specific industry, such as healthcare or media, and can be private or public."

#### 3.7.3 家居科技趨勢

繁中解說：其他趨勢包括 **Smart Home Technology**（智能家居——日常電器互相連接，例如焗爐與你的行事曆溝通）、**Powerline Networking**（電力線網絡——在有電源插座的地方透過特定頻率傳送資料，尤其適合無線訊號覆蓋不到的設備）、**Wireless Broadband / WISP**（無線寬頻——**Wireless Internet Service Provider (WISP)** 把用戶連到指定 access points 或 hotspots，常用於鄉郊；使用智能手機相同的 cellular 技術，天線安裝在屋外）。

> English Standard Definitions:
> - "Powerline networking can allow devices to connect to a LAN where data network cables or wireless communications are not a viable option."
> - "A Wireless Internet Service Provider (WISP) is an ISP that connects subscribers to designated access points or hotspots."

### 3.8 網絡安全（Network Security）

#### 3.8.1 安全威脅（Security Threats）

繁中解說：網絡安全無論網絡大小都是不可或缺的一部分，實施時要同時兼顧資料保護與用戶期望的 QoS。安全需要很多 protocol、技術、設備、工具與技巧。**Threat vectors**（威脅載體）可能是外部的或內部的。

**External Threats（外部威脅）**：
- Viruses（病毒）、worms（蠕蟲）、Trojan horses（木馬）
- Spyware（間諜軟體）與 adware（廣告軟體）
- Zero-day attacks（零時差攻擊）
- Threat actor attacks（威脅行為者攻擊）
- Denial of service attacks（阻斷服務攻擊）
- Data interception and theft（資料攔截與竊取）
- Identity theft（身份盜竊）

**Internal Threats（內部威脅）**：
- Lost or stolen devices（遺失或被竊的設備）
- Accidental misuse by employees（員工意外誤用）
- Malicious employees（惡意員工）

> English Standard Definitions:
> - "Threat vectors might be external or internal."
> - "External threats include viruses, worms, and Trojan horses; spyware and adware; zero-day attacks; threat actor attacks; denial of service attacks; data interception and theft; and identity theft."
> - "Internal threats include lost or stolen devices, accidental misuse by employees, and malicious employees."

#### 3.8.2 安全方案（Security Solutions）

繁中解說：安全必須**多層實施**（multiple layers），不能只靠單一方案。家用或小型辦公室網絡：end devices 安裝 **Antivirus and antispyware software**（防毒與反間諜軟體）；用 **Firewall filtering**（防火牆過濾）阻擋未授權存取。大型網絡另需：**Dedicated firewall system**（專用防火牆系統）、**Access Control Lists (ACL)**（存取控制清單）、**Intrusion Prevention Systems (IPS)**（入侵防禦系統）、**Virtual Private Networks (VPN)**（虛擬私人網絡）。學習網絡安全必須先清楚理解底層的 switching 與 routing 基建。

> English Standard Definitions:
> - "Security must be implemented in multiple layers using more than one security solution."
> - "Network security components for a home or small office network: antivirus and antispyware software on end devices, and firewall filtering to block unauthorized access."
> - "Larger networks have additional security requirements: dedicated firewall systems, access control lists (ACL), intrusion prevention systems (IPS), and virtual private networks (VPN)."

### 3.9 IT Professional（IT 專業人員）

繁中解說：網絡領域提供大量就業機會；Cisco 認證路徑（例如 CCNA）就是由這類基礎課程開始的。

> English Standard Definitions:
> - "There are employment opportunities in the networking field for IT professionals."

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/縮寫 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| Host / End Device | 主機／終端設備；網絡上的任何電腦 | "Every computer on a network is called a host or end device." |
| Server | 伺服器；向 end device 提供資訊 | "Servers are computers that provide information to end devices, such as email, web, and file servers." |
| Client | 客戶端；向伺服器請求資訊 | "Clients are computers that send requests to the servers to retrieve information." |
| Peer-to-Peer (P2P) | 對等網絡；裝置同時是 client 與 server | "In a Peer-to-Peer network, a device can be both a client and a server; it is only recommended for very small networks." |
| Intermediary Device | 中介設備；連接並管理資料流動 | "An intermediary device interconnects end devices; examples include switches, wireless access points, routers, and firewalls." |
| Network Media | 網絡媒體；傳輸訊號的媒介 | "Communication is carried through a medium that allows a message to travel from source to destination." |
| NIC (Network Interface Card) | 網絡介面卡 | "A NIC is the hardware interface that connects a device to the network." |
| Physical Port / Interface | 實體連接埠／介面（常交替使用） | "Often, the terms port and interface are used interchangeably." |
| Physical Topology | 實體拓撲（佈線與位置） | "Physical topology diagrams illustrate the physical location of intermediary devices and cable installation." |
| Logical Topology | 邏輯拓撲（位址與連接配置） | "Logical topology diagrams illustrate devices, ports, and the addressing scheme of the network." |
| Local Area Network (LAN) | 區域網絡；小範圍、單一組織管理 | "A LAN is a network infrastructure that spans a small geographical area and is administered by a single organization." |
| Wide Area Network (WAN) | 廣域網絡；跨地域、SP 管理 | "A WAN is a network infrastructure that spans a wide geographical area, typically administered by service providers." |
| Internet | 互聯網；全球 LAN/WAN 集合 | "The internet is a worldwide collection of interconnected LANs and WANs, and it is not owned by any individual or group." |
| Intranet | 內聯網；組織內部專用 | "An intranet is a private network accessible only to an organization's members or others with authorization." |
| Extranet | 外聯網；供外部合作組織安全存取 | "An extranet provides secure access to a network for individuals from a different organization." |
| ISP (Internet Service Provider) | 互聯網服務供應商 | "An ISP provides internet access to homes and businesses." |
| SOHO | 小型辦公室／家居辦公室 | "SOHO stands for Small Office/Home Office." |
| Converged Network | 融合網絡；同一基建傳多種服務 | "Converged networks deliver data, voice, and video over the same network infrastructure using the same rules and standards." |
| Network Architecture | 網絡架構；支撐傳輸的技術組合 | "Network architecture refers to the technologies that support the infrastructure that moves data across the network." |
| Fault Tolerance | 容錯；多路徑限制故障影響 | "A fault tolerant network limits the impact of a failure by limiting the number of affected devices; multiple paths are required." |
| Redundancy | 冗餘；備援路徑／設備 | "Reliable networks provide redundancy by implementing a packet switched network." |
| Packet Switching | 封包交換；封包各自選路 | "Packet switching splits traffic into packets, and each packet could theoretically take a different path to the destination." |
| Circuit Switching | 電路交換；固定專用電路 | "Circuit-switched networks establish dedicated circuits, so packets cannot take different paths." |
| Scalability | 可擴展性；擴充不影響現有服務 | "A scalable network can expand to support new users without impacting the performance of existing services." |
| Quality of Service (QoS) | 服務品質；優先保證重要流量 | "QoS is the primary mechanism used to ensure reliable delivery of content for all users." |
| Bandwidth | 頻寬；每秒可傳輸的資料量 | "Voice and live video require higher bandwidth and QoS to avoid breaks and pauses." |
| Confidentiality | 保密性（CIA 之一） | "Confidentiality means that only intended recipients can read the data." |
| Integrity | 完整性（CIA 之一） | "Integrity assures that the data has not been altered during transmission." |
| Availability | 可用性（CIA 之一） | "Availability assures timely and reliable access to data for authorized users." |
| BYOD | 自攜裝置 | "BYOD (Bring Your Own Device) means any device, with any ownership, used anywhere." |
| Cloud Computing | 雲端運算 | "Cloud computing allows us to store files and access applications over the internet; it is made possible by data centers." |
| Public / Private / Hybrid / Custom Cloud | 公有／私有／混合／行業雲 | "Hybrid clouds are made up of two or more cloud types connected using the same architecture." |
| Zero-day Attack | 零時差攻擊；未修補即被利用 | "A zero-day attack exploits a vulnerability before a patch is available." |
| Denial of Service (DoS) | 阻斷服務攻擊 | "A denial of service attack prevents users from accessing a service." |
| ACL (Access Control List) | 存取控制清單 | "Access control lists (ACL) control which traffic is allowed into or out of a network." |
| IPS (Intrusion Prevention System) | 入侵防禦系統 | "An intrusion prevention system (IPS) detects and blocks attacks in real time." |
| VPN (Virtual Private Network) | 虛擬私人網絡 | "A VPN creates a secure connection over a public network." |
| Threat Vector | 威脅載體／攻擊途徑 | "Threat vectors might be external or internal." |
| WISP | 無線互聯網服務供應商 | "A Wireless Internet Service Provider (WISP) connects subscribers to designated access points or hotspots." |
| Powerline Networking | 電力線網絡；經電源插座傳資料 | "Powerline networking connects devices to a LAN wherever there is an electrical outlet." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

1. **先理解觀念**：資料流動模型（end device 產生 → intermediary device 轉發管理 → media 傳輸 → 目的地 end device）；再理解 Converged Network 為何用一套標準傳多種服務；理解 Packet Switching 如何實現 Fault Tolerance
2. **背誦英文短語**：四大特性定義句、CIA 三句、LAN/WAN 定義句、Intermediary device 三個職責、P2P 優缺點清單
3. **掌握比較／操作**：LAN vs WAN 對比表、四種 Cloud 對比、外部 vs 內部威脅分類、家用 vs 企業防禦層次、家用 vs 企業連接技術清單
4. **能解答英文考題**：例如
   - "What are the four characteristics of a reliable network?" → "Fault Tolerance, Scalability, Quality of Service, and Security."
   - "How does packet switching provide fault tolerance?" → "Each packet can take a different path, so a failure on one path does not stop delivery."
   - "Define the CIA triad." → "Confidentiality, Integrity, and Availability."
   - "What is the difference between a LAN and a WAN?" → "A LAN spans a small area and is administered by one organization; a WAN spans a wide area and is administered by service providers."
   - "List two external and two internal security threats." → 見 3.8.1

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**網絡三要素**
- End Device：訊息起點／終點（Server 提供、Client 請求）→ "Data originates at an end device and arrives at an end device."
- Intermediary Device：Switch、Router、Firewall、AP → 轉發訊號、記錄路徑、通報錯誤
- Media：銅線（電脈衝）｜光纖（光脈衝）｜無線（電磁波調制）

**LAN vs WAN**

| 特性 | LAN | WAN |
|---|---|---|
| 範圍 | 小（一棟樓） | 大（跨城市／國家） |
| 管理 | 單一組織或個人 | 一個或多個 Service Provider |
| 頻寬 | 高 | 通常較慢 |
| 角色 | 連接 end devices | 連接 LAN 與 LAN |

**可靠網絡四大特性（英文口訣：FSQS → Fault Tolerance, Scalability, QoS, Security）**
- Fault Tolerance：多路徑 + Packet Switching（"Each packet could take a different path."）
- Scalability：跟標準擴充（"Follow accepted standards and protocols."）
- QoS：優先 voice / live video（"Primary mechanism for reliable delivery."）
- Security：基建 + 資訊；目標 CIA

**CIA 三元組**：Confidentiality（保密）／ Integrity（完整）／ Availability（可用）

**連接技術速記**
- 家用：Cable、DSL、Cellular、Satellite、Dial-up
- 企業：Dedicated Leased Line、Ethernet WAN、Business DSL (SDSL)、Satellite

**威脅對比**

| 外部威脅 External | 內部威脅 Internal |
|---|---|
| Virus / Worm / Trojan | 遺失或被竊設備 |
| Spyware / Adware | 員工意外誤用 |
| Zero-day attack | 惡意員工 |
| DoS、資料攔截、身份盜竊 | — |

**防禦層次（Defense in Depth）**
- Home / SOHO：Antivirus + Antispyware + Firewall filtering
- 企業再加：Dedicated Firewall、ACL、IPS、VPN

**趨勢與雲端**：BYOD、Online Collaboration、Video、Cloud Computing｜Cloud 四種：Public / Private / Hybrid / Custom

**必背英文短句**
- "The internet is not owned by any individual or group."
- "Security must be implemented in multiple layers."
- "Converged networks deliver data, voice, and video over the same infrastructure."
