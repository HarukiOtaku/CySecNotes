# ITE3102 L4: Network Access — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Module 4: Physical Layer（含 Module 6: Data Link Layer）
> **原始檔**：`01_Raw_Materials/Lectures/Lecture4_NetworkAccess.pptx`
> **題解對應**：`ITE3102_T4_NetworkAccess_StudyGuide.md`（同一課嘅 Tutorial 練習題解）
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 對照題解自測 → 考前用懶人包速記

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課（Network Access）一次過打通 OSI 最底兩層：**Module 4: Physical Layer** 講「訊號點樣喺媒介上面行」，**Module 6: Data Link Layer** 講「Frame 點樣包、媒介點樣被爭用」。Physical Layer 部分由四個角度砌上去——先講 Physical Layer 嘅用途（transports bits、將 frame 編碼成 signals），再講三大 functional areas（**Physical Components / Encoding / Signaling**）同頻寬詞彙（**Bandwidth / Throughput / Goodput / Latency**），然後逐種媒介拆解：**Copper Cabling**（UTP、STP、Coaxial，加 straight-through / crossover / rollover 三種線序）、**Fiber-Optic Cabling**（SMF vs MMF、四個應用領域、接頭同 patch cord 顏色、fiber vs copper 對比），最後係 **Wireless Media**（限制、Wi-Fi / Bluetooth / WiMAX / Zigbee 四大標準、WLAN 組成）。Data Link Layer 部分就要記住：**LLC 同 MAC 兩個子層**嘅分工、Router 每跳做嘅四件事、**WAN topology（point-to-point / hub-and-spoke / mesh）**同 **LAN topology（star / extended star / bus / ring）**、**half-duplex 同 full-duplex**、兩種 **media access control（contention-based vs controlled）** 同 CSMA/CD、CSMA/CA 嘅流程，最後係 **Data Link Frame** 嘅 Header / Data / Trailer 三大件同六大欄位。

實務情境一（辦公室拉線）：公司新裝一批 PC，師傅要決定用邊種線——機房 backbone 用 **fiber-optic**（長距離、完全免疫 EMI/RFI，但成本同安裝技能要求最高）；PC 去 wall socket 用 **UTP straight-through**（最平最易裝，距離限 1–100 meters）；如果兩個 Router 背對背直連就要 **crossover**（屬 legacy，因為多數 NIC 已用 **Auto-MDIX**）。要記住 **TIA/EIA-568** 規定咗 cable types、lengths、connectors、termination 同 testing methods，唔可以亂駁。

實務情境二（Wi-Fi 投訴）＋排錯：同事投訴會議室 Wi-Fi 時快時慢——呢個就係 wireless 嘅 **Shared medium** 問題，**WLAN operate in half-duplex**，多個人同時用就每個用戶分到嘅頻寬減少。另一邊廂，技術員發現某條線成日錯 frame，於是用 switch 嘅 **full-duplex** 介面取代舊 hub 嘅 half-duplex，同時靠 Data Link Layer 嘅「**error detection and rejects corrupt frames**」功能捉錯。整個排錯思路係：先問「係訊號層問題（attenuation / EMI / 插得差）定係 framing 層問題（topology / duplex / access control）」，呢個判斷框架就係本課要建立嘅能力。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **解釋 Physical Layer 嘅用途** — Explain how physical layer protocols, services, and network media support communications across data networks.
2. **描述 Physical Layer 嘅特性** — Describe characteristics of the physical layer.
3. **指出 Copper Cabling 嘅基本特性** — Identify the basic characteristics of copper cabling.
4. **解釋 UTP 點樣用喺 Ethernet 網絡** — Explain how UTP cable is used in Ethernet networks.
5. **描述 Fiber-Optic Cabling 同佢相對其他媒介嘅主要優勢** — Describe fiber optic cabling and its main advantages over other media.
6. **用有線同無線媒介連接裝置** — Connect devices using wired and wireless media.
7. **解釋 Data Link Layer 嘅用途／功能** — Describe the purpose and function of the data link layer in preparing communication for transmission on specific media.
8. **比較 WAN 同 LAN topology 嘅 media access control 方法** — Compare the characteristics of media access control methods on WAN and LAN topologies.
9. **描述 Data Link Frame 嘅特性同功能** — Describe the characteristics and functions of the data link frame.
10. **分辨 Bandwidth / Throughput / Goodput** — Distinguish bandwidth, throughput, and goodput.
11. **分辨 LLC 同 MAC 子層嘅功能** — Distinguish the functions of the LLC and MAC sublayers.
12. **分辨 half-duplex 同 full-duplex** — Differentiate half-duplex and full-duplex communication.
13. **將 Frame 欄位歸入 Header / Trailer 並配對功能** — Classify frame fields as Header or Trailer and match each field to its function.

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

> 本節按 deck 章節次序編排：§3.1–§3.7 對應 **Module 4（4.1–4.6）**，§3.8–§3.11 對應 **Module 6（6.1–6.3）**。每個知識點都標明 slide 號，方便逐張核對。

### 3.1 課程定位同 Module 4 Objectives（Slides 1–3）

繁中解說：本堂 Deck 係兩份 ITN module 併埋——**Module 4: Physical Layer** 同 **Module 6: Data Link Layer**，由 **Cisco Networking Academy Program** 出品，教材版本係 **Introduction to Networks v7.0 (ITN)**。Module 4 嘅 module objective 係 "Explain how physical layer protocols, services, and network media support communications across data networks."，拆成六個 topic：**Purpose of the Physical Layer**（describe the purpose and functions of the physical layer in the network）、**Physical Layer Characteristics**（describe characteristics of the physical layer）、**Copper Cabling**（identify the basic characteristics of copper cabling）、**UTP Cabling**（explain how UTP cable is used in Ethernet networks）、**Fiber-Optic Cabling**（describe fiber optic cabling and its main advantages over other media）、**Wireless Media**（connect devices using wired and wireless media）。

> **English Standard Definition:** "Module Objective: Explain how physical layer protocols, services, and network media support communications across data networks."

### 3.2 Purpose of the Physical Layer（Slides 4–6）

#### 3.2.1 The Physical Connection（Slide 5）

繁中解說：**任何**網絡通訊發生之前，都必須先建立一條去 local network 嘅**實體連接（physical connection）**。呢條連接可以係 wired 亦可以係 wireless，睇網絡點 setup；無論係 corporate office 定係屋企都一樣。連接裝置嘅硬件係 **Network Interface Card (NIC)**；有啲裝置只有一個 NIC，有啲就有多個（可以有線同無線並存）。**唔係所有 physical connection 都提供相同嘅效能**——呢句係考 MC 嘅常客。

> **English Standard Definition:**
> - "Before any network communications can occur, a physical connection to a local network must be established. This connection could be wired or wireless, depending on the setup of the network."
> - "A Network Interface Card (NIC) connects a device to the network. Some devices may have just one NIC, while others may have multiple NICs (Wired and/or Wireless, for example)."
> - "Not all physical connections offer the same level of performance."

#### 3.2.2 The Physical Layer 做咩（Slide 6）

繁中解說：**Physical Layer** 嘅工作係「**transports bits across the network media**」。具體流程：佢由 **Data Link Layer** 接收一個**完整嘅 frame**，然後將個 frame **encode 成一系列訊號（signals）**，再送去 local media。呢一步係整個 **encapsulation process 嘅最後一步**。跟住路徑上嘅下一個裝置收到啲 **bits**，會**重新封裝（re-encapsulate）**成 frame，再決定點處理。

> **English Standard Definition:**
> - "Transports bits across the network media."
> - "Accepts a complete frame from the Data Link Layer and encodes it as a series of signals that are transmitted to the local media. This is the last step in the encapsulation process."
> - "The next device in the path to the destination receives the bits and re-encapsulates the frame, then decides what to do with it."

### 3.3 Physical Layer Characteristics（Slides 7–13）

#### 3.3.1 Physical Layer Standards 同三大 Functional Areas（Slides 8–9）

> **圖示描述**：Slide 8 只有標題「Physical Layer Standards」＋示意圖，圖中展示標準文件同各種接口／線材；無額外文字。

繁中解說：**Physical Layer Standards** 要處理三個 functional areas：**Physical Components**、**Encoding**、**Signaling**。**Physical Components** 指硬件裝置、media 同其他接頭（connectors），佢哋負責傳送代表 bits 嘅訊號。**NIC、interfaces and connectors、cable materials、cable designs** 等等，全部都係由 physical layer 相關標準所規定（specified in standards）。

> **English Standard Definition:**
> - "Physical Layer Standards address three functional areas: Physical Components, Encoding, and Signaling."
> - "The Physical Components are the hardware devices, media, and other connectors that transmit the signals that represent the bits."
> - "Hardware components like NICs, interfaces and connectors, cable materials, and cable designs are all specified in standards associated with the physical layer."

#### 3.3.2 Encoding（Slide 10）

繁中解說：**Encoding** 係將一串 bit **轉換成下一個裝置認得嘅格式**；呢種「coding」提供**可預測嘅樣式（predictable patterns）**，令路徑上下一個裝置可以辨認。Deck 舉嘅 encoding 方法例子有：**Manchester**（圖示）、**4B/5B**、**8B/10B**。

> **English Standard Definition:**
> - "Encoding converts the stream of bits into a format recognizable by the next device in the network path. This 'coding' provides predictable patterns that can be recognized by the next device."
> - "Examples of encoding methods include Manchester, 4B/5B, and 8B/10B."

#### 3.3.3 Signaling（Slide 11）

繁中解說：**Signaling method** 係「bit 值 **「1」同「0」**」喺實體媒介上**點樣被表示**。用邊種 signaling 方法取決於媒介類型：**Electrical Signals** 用喺 **Copper Cable**；**Light Pulses** 用喺 **Fiber-Optic Cable**；**Microwave Signals** 用喺 **Wireless**。

> **English Standard Definition:**
> - "The signaling method is how the bit values, '1' and '0' are represented on the physical medium. The method of signaling will vary based on the type of medium being used."
> - "Electrical Signals Over Copper Cable; Light Pulses Over Fiber-Optic Cable; Microwave Signals Over Wireless."

#### 3.3.4 Bandwidth 同單位階梯（Slide 12）

繁中解說：**Bandwidth** 係「媒介可以承載數據嘅容量（the capacity at which a medium can carry data）」。**Digital bandwidth** 量度**一段時間內可以由一個地方流去另一個地方嘅數據量**，即係「**一秒可以傳幾多 bits**」。可用頻寬受三樣野左右：**physical media properties、current technologies、laws of physics**。單位由細到大：**bps**（1 bps = fundamental unit of bandwidth）→ **Kbps**（1 Kbps = 1,000 bps = 10^3 bps）→ **Mbps**（1 Mbps = 1,000,000 bps = 10^6 bps）→ **Gbps**（1 Gbps = 1,000,000,000 bps = 10^9 bps）→ **Tbps**（1 Tbps = 1,000,000,000,000 bps = 10^12 bps）。

> **English Standard Definition:**
> - "Bandwidth is the capacity at which a medium can carry data."
> - "Digital bandwidth measures the amount of data that can flow from one place to another in a given amount of time; how many bits can be transmitted in a second."
> - "Physical media properties, current technologies, and the laws of physics play a role in determining available bandwidth."

#### 3.3.5 Bandwidth Terminology：Latency / Throughput / Goodput（Slide 13）

繁中解說：三個「速度」概念一定要分清楚——**Latency（延遲）**：數據由一點去另一點所需嘅**時間**，包含各種延誤（delays）。**Throughput（吞吐量）**：一段時間內**媒介上實際傳輸到嘅 bits 量度值**。**Goodput（有效吞吐量）**：一段時間內**可用數據（usable data）嘅量度值**；公式係 **Goodput = Throughput − traffic overhead**。口訣：「**Bandwidth ≥ Throughput ≥ Goodput**」——理論容量最高，實際傳輸次之，扣走 overhead 之後嘅可用數據最低。

> **English Standard Definition:**
> - "Latency: Amount of time, including delays, for data to travel from one given point to another."
> - "Throughput: The measure of the transfer of bits across the media over a given period of time."
> - "Goodput: The measure of usable data transferred over a given period of time. Goodput = Throughput - traffic overhead."

➜ 實作／題解對應：`ITE3102_T4_NetworkAccess_StudyGuide.md` Q1（throughput 影響因素同 traffic overhead 具體項目）。

### 3.4 Copper Cabling（Slides 14–19）

#### 3.4.1 Characteristics of Copper Cabling（Slide 15）

繁中解說：Copper cabling 係**今日網絡最常用**嘅線材，原因係 **inexpensive（平）、easy to install（易裝）、low resistance to electrical current flow（電阻低）**。**限制（Limitations）**：**Attenuation（衰減）**——電訊號行得越遠就越弱；另外電訊號會受**兩種來源**嘅干擾，會 distort 同 corrupt 數據訊號——**Electromagnetic Interference (EMI)** 同 **Radio Frequency Interference (RFI)**，再加 **Crosstalk（串音）**。**緩解方法（Mitigation）**：**嚴格遵守線長上限**（strict adherence to cable length limits）可減低 attenuation；某啲線用 **metallic shielding 同 grounding** 減 EMI / RFI；某啲線用 **將對向電路線對絞埋一齊（twisting opposing circuit pair wires together）** 減 crosstalk。

> **English Standard Definition:**
> - "Copper cabling is the most common type of cabling used in networks today. It is inexpensive, easy to install, and has low resistance to electrical current flow."
> - "Attenuation – the longer the electrical signals have to travel, the weaker they get."
> - "Some kinds of copper cable mitigate EMI and RFI by using metallic shielding and grounding; some kinds of copper cable mitigate crosstalk by twisting opposing circuit pair wires together."

#### 3.4.2 Types of Copper Cabling（Slide 16）

> **圖示描述**：Slide 16 圖示三種 copper cable 嘅橫切面／外觀並列比較——由外到內分別顯示 **Coaxial**（單芯導體＋編織屏蔽）、**STP**（絞線對＋金屬屏蔽）、**UTP**（四對絞線、無屏蔽）。辨認口訣：**有 Shield 就係 STP，冇 Shield 就係 UTP，見到「單芯粗導體＋圓形編織網」就係 Coaxial**。

#### 3.4.3 Unshielded Twisted Pair (UTP)（Slide 17）

繁中解說：**UTP 係最常用嘅 networking media**，兩端用 **RJ-45 connectors** 收頭，用途係將 **hosts 同 intermediary network devices 互連**。**三大關鍵特徵**：**Outer jacket（外皮）**保護銅線免受物理損傷；**Twisted pairs（絞線對）**保護訊號免受干擾；**Color-coded plastic insulation（彩色塑膠絕緣）**將各條線彼此電氣隔離，同時用嚟辨認每一對線。

> **English Standard Definition:**
> - "UTP is the most common networking media. Terminated with RJ-45 connectors. Interconnects hosts with intermediary network devices."
> - "The outer jacket protects the copper wires from physical damage. Twisted pairs protect the signal from interference. Color-coded plastic insulation electrically isolates the wires from each other and identifies each pair."

#### 3.4.4 Shielded Twisted Pair (STP)（Slide 18）

繁中解說：**STP** 相對 UTP：**noise protection 更好**、**更貴**、**更難安裝**；同樣用 **RJ-45 connectors** 收頭，同樣係互連 hosts 同 intermediary network devices。**四大關鍵特徵**：outer jacket 保護銅線免受物理損傷；**braided 或 foil shield** 提供 EMI / RFI 保護（整體屏蔽）；**每一對線外層嘅 foil shield** 亦提供 EMI / RFI 保護（逐對屏蔽）；color-coded plastic insulation 做電氣隔離同辨認每一對線。

> **English Standard Definition:**
> - "Better noise protection than UTP. More expensive than UTP. Harder to install than UTP."
> - "Braided or foil shield provides EMI/RFI protection. Foil shield for each pair of wires provides EMI/RFI protection."

#### 3.4.5 Coaxial Cable（Slide 19）

繁中解說：**Coaxial cable** 由四部分組成（由外到內）：**Outer cable jacket**（防止輕微物理損傷）→ **Woven copper braid 或 metallic foil**（同時做「電路嘅第二條導線」同「內層導體嘅屏蔽」）→ **一層 flexible plastic insulation** → **Copper conductor**（用嚟傳送電子訊號）。Coax 用**唔同種類嘅 connectors**。常見應用：**Wireless installations**（將天線接到無線裝置）同 **Cable internet installations**（customer premises wiring）。

> **English Standard Definition:**
> - "A woven copper braid, or metallic foil, acts as the second wire in the circuit and as a shield for the inner conductor."
> - "Commonly used in the following situations: Wireless installations - attach antennas to wireless devices; Cable internet installations - customer premises wiring."

### 3.5 UTP Cabling（Slides 20–24）

#### 3.5.1 Properties of UTP Cabling（Slide 21）

繁中解說：UTP 內有**四對彩色銅線絞埋一齊**，包喺一層 flexible plastic sheath 入面，**完全冇 shielding**。UTP 靠兩個特性限制 crosstalk：**Cancellation（互相抵消）**——每一對線嘅兩條線用**相反極性**（一條 negative、一條 positive），絞埋一齊之後磁場互相抵消，亦抵消外來 EMI / RFI；**每呎絞數唔同（Variation in twists per foot）**——每條線絞嘅數量唔同，有助防止線與線之間嘅 crosstalk。

> **English Standard Definition:**
> - "UTP has four pairs of color-coded copper wires twisted together and encased in a flexible plastic sheath. No shielding is used."
> - "Cancellation - Each wire in a pair of wires uses opposite polarity. One wire is negative, the other wire is positive. They are twisted together and the magnetic fields effectively cancel each other and outside EMI/RFI."
> - "Variation in twists per foot in each wire - Each wire is twisted a different amount, which helps prevent crosstalk amongst the wires in the cable."

#### 3.5.2 UTP Cabling Standards and Connectors（Slides 22–23）

繁中解說：UTP 標準由 **TIA/EIA** 制定。**TIA/EIA-568** 標準化五項元素：**Cable Types、Cable Lengths、Connectors、Cable Termination、Testing Methods**。銅線嘅**電氣標準**由 **IEEE** 制定，IEEE 按線材嘅**效能（performance）**評級，例子包括 **Category 3、Category 5 and 5e、Category 6**。

> **圖示描述**：Slide 23 用四張圖對比 **RJ-45 Connector**（插頭）同 **RJ-45 Socket**（插座），以及 **Poorly terminated UTP cable**（收頭差：外皮剝得太長、線對絞合鬆散）同 **Properly terminated UTP cable**（收頭好：外皮夾入插頭、線對保持絞合）嘅分別。

> **English Standard Definition:**
> - "Standards for UTP are established by the TIA/EIA. TIA/EIA-568 standardizes elements like: Cable Types, Cable Lengths, Connectors, Cable Termination, Testing Methods."
> - "Electrical standards for copper cabling are established by the IEEE, which rates cable according to its performance."

#### 3.5.3 Straight-through、Crossover 同 Rollover（Slide 24）

繁中解說：三種線序／線材嘅用途規則（**必背表**）。

| Cable Type | Standard | Application |
| :--- | :--- | :--- |
| Ethernet Straight-through | Both ends T568A or T568B | Host to Network Device |
| Ethernet Crossover * | One end T568A, other end T568B | Host-to-Host, Switch-to-Switch, Router-to-Router |
| Rollover | Cisco Proprietary | Host serial port to Router or Switch Console Port, using an adapter |

\* **Crossover 已被視為 Legacy**，因為大部分 NIC 用 **Auto-MDIX** 自動感應線材類型並完成連接。口訣：**Unlike devices → straight-through；Like devices → crossover；Console 管理 → rollover**。

> **English Standard Definition:**
> - "Ethernet Straight-through: Both ends T568A or T568B - Host to Network Device."
> - "Ethernet Crossover: One end T568A, other end T568B - Host-to-Host, Switch-to-Switch, Router-to-Router. Considered Legacy due to most NICs using Auto-MDIX to sense cable type and complete connection."
> - "Rollover: Cisco Proprietary - Host serial port to Router or Switch Console Port, using an adapter."

➜ 實作／題解對應：`ITE3102_T4_NetworkAccess_StudyGuide.md` Q3（Cable Pinouts 判斷題）。

### 3.6 Fiber-Optic Cabling（Slides 25–31）

#### 3.6.1 Properties of Fiber-Optic Cabling（Slide 26）

繁中解說：光纖因為**成本（expense）**關係，普及程度唔及 UTP，但對某啲網絡場景就係 ideal。特性：比其他任何 networking media **傳得更遠、頻寬更高**；**較少 attenuation**，而且**完全免疫 EMI / RFI**；由 **flexible、極細嘅高純度玻璃纖維**製成；用 **laser 或 LED** 將 bits **encode 成光脈衝（pulses of light）**；光纖電纜本身**扮演 wave guide**，令光喺兩端之間傳輸時**訊號損耗最少**。

> **English Standard Definition:**
> - "Transmits data over longer distances at higher bandwidth than any other networking media."
> - "Less susceptible to attenuation, and completely immune to EMI/RFI. Made of flexible, extremely thin strands of very pure glass."
> - "Uses a laser or LED to encode bits as pulses of light. The fiber-optic cable acts as a wave guide to transmit light between the two ends with minimal signal loss."

#### 3.6.2 Types of Fiber Media：SMF vs MMF（Slide 27）

| 類型 | Core | 光源 | 場合 | 距離 |
| :--- | :--- | :--- | :--- | :--- |
| **Single-Mode Fiber (SMF)** | Very small core | 用**貴嘅 lasers** | Long-distance applications | 最遠 |
| **Multimode Fiber (MMF)** | Larger core | 用**較平嘅 LEDs**（由唔同角度發射） | 短距離場合 | **Up to 10 Gbps over 550 meters** |

繁中解說：**Dispersion（色散／脈衝擴散）** 指一個光脈衝隨時間**擴散開**；dispersion 越大，訊號強度損耗越大。**MMF 嘅 dispersion 比 SMF 大**，所以 **MMF 嘅最大線長係 550 meters**。

> **English Standard Definition:**
> - "Single-Mode Fiber: Very small core, uses expensive lasers, long-distance applications."
> - "Multimode Fiber: Larger core, uses less expensive LEDs, LEDs transmit at different angles, up to 10 Gbps over 550 meters."
> - "Dispersion refers to the spreading out of a light pulse over time. Increased dispersion means increased loss of signal strength. MMF has greater dispersion than SMF, with the maximum cable distance for MMF being 550 meters."

#### 3.6.3 Fiber-Optic Cabling Usage（Slide 28）

繁中解說：光纖而家用喺**四個行業領域**：**Enterprise Networks**（用作 **backbone cabling** 應用同互連基建裝置）、**Fiber-to-the-Home (FTTH)**（為家庭同小型企業提供 **always-on broadband** 服務）、**Long-Haul Networks**（service provider 用嚟連接**國家同城市**）、**Submarine Cable Networks**（可靠、高速、高容量，可以喺嚴苛海底環境生存，最遠達 **transoceanic** 距離）。本課程嘅焦點係「**fiber 喺 enterprise 內部嘅使用**」。

> **English Standard Definition:**
> - "Enterprise Networks - Used for backbone cabling applications and interconnecting infrastructure devices."
> - "Fiber-to-the-Home (FTTH) - Used to provide always-on broadband services to homes and small businesses."
> - "Our focus in this course is the use of fiber within the enterprise."

#### 3.6.4 Fiber-Optic Connectors 同 Patch Cords（Slides 29–30）

繁中解說：光纖接頭四款——**Straight-Tip (ST) Connectors**、**Subscriber Connector (SC) Connectors**、**Lucent Connector (LC) Simplex Connectors**、**Duplex Multimode LC Connectors**。Patch cord 命名係「**接頭－接頭 模式**」：**SC-SC MM Patch Cord**、**LC-LC SM Patch Cord**、**ST-LC MM Patch Cord**、**ST-SC SM Patch Cord**（MM = multimode，SM = single-mode）。**顏色編碼（必考）**：**黃色 jacket = single-mode fiber cable**；**橙色（或 aqua）= multimode fiber cable**。

> **English Standard Definition:**
> - "Straight-Tip (ST) Connectors; Subscriber Connector (SC) Connectors; Lucent Connector (LC) Simplex Connectors; Duplex Multimode LC Connectors."
> - "A yellow jacket is for single-mode fiber cables and orange (or aqua) for multimode fiber cables."

#### 3.6.5 Fiber versus Copper（Slide 31）

繁中解說：光纖主要用作**高流量、point-to-point** 嘅 backbone cabling，例如數據分發設施之間，以及 **multi-building campus 內建築物之間**嘅互連。

| Implementation Issues | UTP Cabling | Fiber-Optic Cabling |
| :--- | :--- | :--- |
| Bandwidth supported | 10 Mb/s - 10 Gb/s | 10 Mb/s - 100 Gb/s |
| Distance | Relatively short (1 - 100 meters) | Relatively long (1 - 100,000 meters) |
| Immunity to EMI and RFI | Low | High (Completely immune) |
| Immunity to electrical hazards | Low | High (Completely immune) |
| Media and connector costs | Lowest | Highest |
| Installation skills required | Lowest | Highest |
| Safety precautions | Lowest | Highest |

> **English Standard Definition:** "Optical fiber is primarily used as backbone cabling for high-traffic, point-to-point connections between data distribution facilities and for the interconnection of buildings in multi-building campuses."

➜ 實作／題解對應：`ITE3102_T4_NetworkAccess_StudyGuide.md` Q5（Copper vs Fiber 五項對比）。

### 3.7 Wireless Media（Slides 32–35）

#### 3.7.1 Properties of Wireless Media（Slide 33）

繁中解說：無線媒介用 **radio 或 microwave 頻率**去攜帶代表 binary digits 嘅電磁訊號，提供**最大嘅 mobility option**，而且無線連接數目持續上升。**四大限制（Limitations）**：**Coverage area**——實際覆蓋範圍會受部署地點嘅**物理特性**嚴重影響；**Interference**——無線容易受干擾，好多日常裝置都可以擾亂佢；**Security**——無線通訊**唔需要接觸任何實體媒介**，所以任何喺範圍內嘅人都可以接觸到傳輸內容；**Shared medium**——**WLAN 行 half-duplex**，即係同一時間只有一個裝置可以 send 或 receive，多人同時使用就會令**每個用戶分到嘅頻寬減少**。

> **English Standard Definition:**
> - "It carries electromagnetic signals representing binary digits using radio or microwave frequencies. This provides the greatest mobility option."
> - "Coverage area - Effective coverage can be significantly impacted by the physical characteristics of the deployment location."
> - "Security - Wireless communication coverage requires no access to a physical strand of media, so anyone can gain access to the transmission."
> - "Shared medium - WLANs operate in half-duplex, which means only one device can send or receive at a time. Many users accessing the WLAN simultaneously results in reduced bandwidth for each user."

#### 3.7.2 Types of Wireless Media（Slide 34）

繁中解說：**IEEE 同電訊業標準**涵蓋無線數據通訊嘅 **data link 同 physical 兩層**。喺每個標準入面，physical layer 規格規定四樣野：**Data to radio signal encoding methods**、**Frequency and power of transmission**、**Signal reception and decoding requirements**、**Antenna design and construction**。**四大 wireless standards（必背編號）**：

| Wireless Standard | IEEE 編號 | 定位 |
| :--- | :--- | :--- |
| **Wi-Fi** | IEEE 802.11 | Wireless LAN (WLAN) technology |
| **Bluetooth** | IEEE 802.15 | Wireless Personal Area Network (WPAN) standard |
| **WiMAX** | IEEE 802.16 | 用 **point-to-multipoint topology** 提供 broadband wireless access |
| **Zigbee** | IEEE 802.15.4 | 低數據率、低功耗通訊，主要用喺 **Internet of Things (IoT)** 應用 |

> **English Standard Definition:**
> - "Wi-Fi (IEEE 802.11) - Wireless LAN (WLAN) technology."
> - "Bluetooth (IEEE 802.15) - Wireless Personal Area network (WPAN) standard."
> - "WiMAX (IEEE 802.16) - Uses a point-to-multipoint topology to provide broadband wireless access."
> - "Zigbee (IEEE 802.15.4) - Low data-rate, low power-consumption communications, primarily for Internet of Things (IoT) applications."

#### 3.7.3 Wireless LAN（Slide 35）

繁中解說：**Wireless LAN (WLAN)** 一般需要兩類裝置：**Wireless Access Point (AP)**——將用戶嘅無線訊號**集中（concentrate）**，然後接去現有嘅 **copper-based network infrastructure**（即係無線同有線之間嘅橋樑）；**Wireless NIC Adapters**——為 **network hosts** 提供無線通訊能力。市面上有**好多 WLAN 標準**，買設備時一定要確保 **compatibility（兼容）同 interoperability（互通）**。另外，**Network Administrators 必須制定同執行嚴格嘅安全政策與流程**，保護 WLAN 免受未授權存取同破壞。

> **English Standard Definition:**
> - "Wireless Access Point (AP) - Concentrate wireless signals from users and connect to the existing copper-based network infrastructure."
> - "Wireless NIC Adapters - Provide wireless communications capability to network hosts."
> - "When purchasing WLAN equipment, ensure compatibility, and interoperability."
> - "Network Administrators must develop and apply stringent security policies and processes to protect WLANs from unauthorized access and damage."

➜ 實作／題解對應：`ITE3102_T4_NetworkAccess_StudyGuide.md` Q6（Wireless AP / NIC 用途同四項 concern）。

### 3.8 Module 6 定位同 Objectives（Slides 36–37）

繁中解說：第二份 module 係 **Module 6: Data Link Layer**。Module objective："Explain how media access control in the data link layer supports communication across networks."，拆成三個 topic：**Purpose of the Data Link Layer**（describe the purpose and function of the data link layer in preparing communication for transmission on specific media）、**Topologies**（compare the characteristics of media access control methods on WAN and LAN topologies）、**Data Link Frame**（describe the characteristics and functions of the data link frame）。

> **English Standard Definition:** "Module Objective: Explain how media access control in the data link layer supports communication across networks."

### 3.9 Purpose of the Data Link Layer（Slides 38–42）

#### 3.9.1 The Data Link Layer 職責（Slide 39）

繁中解說：**Data Link layer** 負責 **end-device network interface cards 之間嘅通訊**。佢做三件事：讓 **upper layer protocols 可以存取 physical layer media**；將 **Layer 3 packets（IPv4 同 IPv6）** 封裝入 **Layer 2 Frames**；執行 **error detection**，並且 **rejects corrupt frames**（掉棄損壞嘅 frame）。

> **English Standard Definition:**
> - "The Data Link layer is responsible for communications between end-device network interface cards."
> - "It allows upper layer protocols to access the physical layer media and encapsulates Layer 3 packets (IPv4 and IPv6) into Layer 2 Frames."
> - "It also performs error detection and rejects corrupts frames."

#### 3.9.2 IEEE 802 LAN/MAN 兩個子層：LLC 同 MAC（Slide 40）

繁中解說：**IEEE 802 LAN/MAN standards** 係按網絡類型區分嘅（Ethernet、WLAN、WPAN 等等）。**Data Link Layer 由兩個 sublayers 組成**：**Logical Link Control (LLC)** 同 **Media Access Control (MAC)**。**LLC** "communicates between the networking software at the upper layers and the device hardware at the lower layers"；**MAC** "is responsible for data encapsulation and media access control"。記法：**LLC 對上（軟件層、同 upper layers 溝通）；MAC 對下（硬件層、封裝＋媒介存取）**。

> **English Standard Definition:**
> - "The Data Link Layer consists of two sublayers. Logical Link Control (LLC) and Media Access Control (MAC)."
> - "The LLC sublayer communicates between the networking software at the upper layers and the device hardware at the lower layers."
> - "The MAC sublayer is responsible for data encapsulation and media access control."

#### 3.9.3 Providing Access to Media（Slide 41）

繁中解說：節點之間交換嘅 packets，可能經歷**好多個 data link layer 同媒體轉換（media transitions）**。路徑上**每一跳（at each hop）**，router 會執行**四個基本 Layer 2 功能**：(1) **Accepts a frame** from the network medium（由媒介接收 frame）；(2) **De-encapsulates** the frame to expose the encapsulated packet（拆封裝，拿出 packet）；(3) **Re-encapsulates** the packet into a new frame（重新封裝成新 frame）；(4) **Forwards the new frame** on the medium of the next network segment（喺下一段媒介上轉發新 frame）。

> **English Standard Definition:** "At each hop along the path, a router performs four basic Layer 2 functions: accepts a frame from the network medium; de-encapsulates the frame to expose the encapsulated packet; re-encapsulates the packet into a new frame; forwards the new frame on the medium of the next network segment."

#### 3.9.4 Data Link Layer Standards（Slide 42）

繁中解說：**data link layer protocols** 由四個工程組織定義（注意英文全稱）：**Institute for Electrical and Electronic Engineers (IEEE)**、**International Telecommunications Union (ITU)**、**International Organizations for Standardization (ISO)**、**American National Standards Institute (ANSI)**。

> **English Standard Definition:** "Data link layer protocols are defined by engineering organizations: IEEE, ITU, ISO, and ANSI."

### 3.10 Topologies（Slides 43–51）

#### 3.10.1 Physical and Logical Topologies（Slide 44）

繁中解說：**Topology** 係「網絡裝置同佢哋之間互連嘅**排列方式同關係**」。描述網絡時會用兩種 topology：**Physical topology**——顯示**實體連接**同裝置點樣互連；**Logical topology**——用 **device interfaces 同 IP addressing schemes** 去識別裝置之間嘅**虛擬連接**。

> **English Standard Definition:**
> - "The topology of a network is the arrangement and relationship of the network devices and the interconnections between them."
> - "Physical topology – shows physical connections and how devices are interconnected."
> - "Logical topology – identifies the virtual connections between devices using device interfaces and IP addressing schemes."

#### 3.10.2 WAN Topologies（Slides 45–46）

繁中解說：三種常見嘅 physical WAN topology——**Point-to-point**：最簡單最常見，係兩個 endpoint 之間一條**永久連結（permanent link）**；**Hub and spoke**：似 star topology，一個**中央站點**透過 point-to-point links 連接各分支站點；**Mesh**：提供**高可用性（high availability）**，但要求**每個 end system 都要接去其他所有 end system**。**Point-to-point 深入（Slide 46）**：physical point-to-point topology **直接連接兩個節點**，呢兩個節點**唔會同其他 hosts 共用 media**；因為 media 上所有 frames 只可以喺呢兩個 nodes 之間往來，所以 **Point-to-Point WAN protocols 可以非常簡單（very simple）**。

> **English Standard Definition:**
> - "Point-to-point – the simplest and most common WAN topology. Consists of a permanent link between two endpoints."
> - "Hub and spoke – similar to a star topology where a central site interconnects branch sites through point-to-point links."
> - "Mesh – provides high availability but requires every end system to be connected to every other end system."
> - "Physical point-to-point topologies directly connect two nodes. The nodes may not share the media with other hosts. Because all frames on the media can only travel to or from the two nodes, Point-to-Point WAN protocols can be very simple."

#### 3.10.3 LAN Topologies（Slide 47）

繁中解說：LAN 上嘅 end devices 通常用 **star 或 extended star topology** 互連；star 同 extended star **容易安裝、非常 scalable、容易 troubleshoot**。早期 Ethernet 同 legacy **Token Ring** 技術另提供兩種 topology：**Bus**——所有 end systems **串連埋一齊，兩端 terminated**；**Ring**——每個 end system 同**相鄰嘅鄰居**連接，形成一個**環**。

> **English Standard Definition:**
> - "End devices on LANs are typically interconnected using a star or extended star topology. Star and extended star topologies are easy to install, very scalable and easy to troubleshoot."
> - "Bus – All end systems chained together and terminated on each end."
> - "Ring – Each end system is connected to its respective neighbors to form a ring."

#### 3.10.4 Half and Full Duplex Communication（Slide 48）

繁中解說：**Half-duplex**——喺共享媒介上，**同一時間只容許一個裝置 send 或 receive**；用喺 **WLANs** 同用 **Ethernet hubs** 嘅 legacy bus topologies。**Full-duplex**——兩個裝置**可以喺共享媒介上同時 transmit 同 receive**；**Ethernet switches operate in full-duplex mode**。記法：**Walkie-talkie = half；Telephone = full**。

> **English Standard Definition:**
> - "Half-duplex communication only allows one device to send or receive at a time on a shared medium."
> - "Full-duplex communication allows both devices to simultaneously transmit and receive on a shared medium. Ethernet switches operate in full-duplex mode."

#### 3.10.5 Access Control Methods：Contention-based vs Controlled（Slide 49）

繁中解說：**Media access control** 分兩大類。**Contention-based access（爭用式）**——**所有 nodes 都行 half-duplex，一齊爭用媒介**；例子：**Carrier sense multiple access with collision detection (CSMA/CD)**（用喺 **legacy bus-topology Ethernet**）同 **Carrier sense multiple access with collision avoidance (CSMA/CA)**（用喺 **Wireless LANs**）。**Controlled access（受控式）**——**deterministic access**，每個 node 有**自己嘅時間**使用媒介；用喺 legacy 網絡例如 **Token Ring** 同 **ARCNET**。

> **English Standard Definition:**
> - "Contention-based access: All nodes operating in half-duplex, competing for use of the medium."
> - "Controlled access: Deterministic access where each node has its own time on the medium. Used on legacy networks such as Token Ring and ARCNET."

#### 3.10.6 Contention-Based Access — CSMA/CD（Slide 50）

繁中解說：**CSMA/CD** 由 legacy Ethernet LANs 使用，行 **half-duplex**（同一時間只有一個裝置 send 或 receive），用 **collision detection process** 去決定「裝置幾時可以 send」同「多個裝置同時 send 會點」。**三步流程**：(1) 裝置同時傳輸 → 共享媒介上出現 **signal collision**；(2) 裝置**偵測到** collision；(3) 裝置**等一段隨機時間（random period of time）**，然後**重新傳輸**數據。

> **English Standard Definition:**
> - "CSMA/CD: Used by legacy Ethernet LANs. Operates in half-duplex mode where only one device sends or receives at a time."
> - "Devices transmitting simultaneously will result in a signal collision on the shared media. Devices detect the collision. Devices wait a random period of time and retransmit data."

#### 3.10.7 Contention-Based Access — CSMA/CA（Slide 51）

繁中解說：**CSMA/CA** 由 **IEEE 802.11 WLANs** 使用，同樣行 **half-duplex**，但用 **collision avoidance process**（**避免**而唔係偵測）。流程：(1) 裝置傳輸時，會**同時附上今次傳輸所需嘅時間長度（time duration）**；(2) 共享媒介上其他裝置**收到呢個時間資訊**，就知道**媒介會幾耐唔可用（how long the medium will be unavailable）**。一句記法：**CD 係撞完先處理（detect after collision）；CA 係事先預約時間（avoid beforehand）**。

> **English Standard Definition:**
> - "CSMA/CA: Used by IEEE 802.11 WLANs. Operates in half-duplex mode where only one device sends or receives at a time."
> - "When transmitting, devices also include the time duration needed for the transmission."
> - "Other devices on the shared medium receive the time duration information and know how long the medium will be unavailable."

➜ 實作／題解對應：`ITE3102_T4_NetworkAccess_StudyGuide.md` Q9（WAN topologies）、Q10（LAN topologies）、Q11（half / full duplex）。

### 3.11 Data Link Frame（Slides 52–57）

#### 3.11.1 The Frame（Slide 53）

繁中解說：**Data Link Layer** 會加一個 **header** 同一個 **trailer** 去封裝數據，形成 **frame**。一個 data link frame 有**三部分**：**Header、Data、Trailer**。**Header 同 Trailer 嘅欄位會隨 data link layer protocol 唔同而改變**；frame 內攜帶嘅**控制資訊量（amount of control information）**，會隨 **access control information 同 logical topology** 而變化。

```text
+------------------+-----------------------------------+-------------------+
|      Header      |        Data (Layer 3 Packet)      |      Trailer      |
+------------------+-----------------------------------+-------------------+
```

> **English Standard Definition:**
> - "Data is encapsulated by the data link layer with a header and a trailer to form a frame."
> - "A data link frame has three parts: Header, Data, Trailer."
> - "The fields of the header and trailer vary according to data link layer protocol."

#### 3.11.2 Frame Fields（Slide 54）

繁中解說：六大欄位同功能（**必背**，並記住 Header / Trailer 分類）：

| Field | Description（英文原文） | 繁中理解 | H / T |
| :--- | :--- | :--- | :--- |
| **Frame Start and Stop** | "Identifies beginning and end of frame" | 標示 frame 嘅開始同結束 | Start = H／Stop = T |
| **Addressing** | "Indicates source and destination nodes" | 指出來源同目的地節點 | H |
| **Type** | "Identifies encapsulated Layer 3 protocol" | 識別封裝住邊個 Layer 3 協議 | H |
| **Control** | "Identifies flow control services" | 識別 flow control 服務 | H |
| **Data** | "Contains the frame payload" | 載住 frame 嘅 payload | Payload |
| **Error Detection** | "Used for determine transmission errors" | 用嚟判斷傳輸錯誤 | T |

> **English Standard Definition:** "Frame Start and Stop identifies beginning and end of frame; Addressing indicates source and destination nodes; Type identifies encapsulated Layer 3 protocol; Control identifies flow control services; Data contains the frame payload; Error Detection is used to determine transmission errors."

#### 3.11.3 Layer 2 Addresses（Slide 55）

繁中解說：**Layer 2 address** 又叫 **physical address**，四個關鍵點：**Contained in the frame header**（喺 frame header 入面）；**Used only for local delivery of a frame on the link**（只用嚟做**本地鏈路**上嘅 frame 傳遞）；**Updated by each device that forwards the frame**（每個轉發 frame 嘅裝置都會**更新**佢）。

> **English Standard Definition:**
> - "Also referred to as a physical address. Contained in the frame header."
> - "Used only for local delivery of a frame on the link."
> - "Updated by each device that forwards the frame."

#### 3.11.4 LAN and WAN Frames（Slide 56）

繁中解說：**logical topology 同 physical media 決定用邊個 data link protocol**。Deck 列舉五個：**Ethernet、802.11 Wireless、Point-to-Point (PPP)、High-Level Data Link Control (HDLC)、Frame-Relay**。**每個 protocol 都為指定嘅 logical topologies 執行 media access control。** 注意（擁有權分界）：**Ethernet 深入內容（ARP、Switch 運作、802.3 frame 欄位細節）屬 L5 範圍**，本課只需知道 Ethernet 係其中一個 data link protocol，並記得「logical topology + physical media → data link protocol」呢個因果關係。

> **English Standard Definition:**
> - "The logical topology and physical media determine the data link protocol used: Ethernet, 802.11 Wireless, Point-to-Point (PPP), High-Level Data Link Control (HDLC), Frame-Relay."
> - "Each protocol performs media access control for specified logical topologies."

#### 3.11.5 綜合示意（Slide 57）

> **圖示描述**：Slide 57 係純圖片頁（無文字），屬 Module 6 收結嘅示意圖，用嚟綜合展示 Data Link Layer 由 header / data / trailer 組成 frame、再交由 Physical Layer 傳輸嘅流程。本頁無新增知識點，只需記住「**Frame 三部分 ＋ 兩子層 ＋ 媒介存取**」嘅整體結構。

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/縮寫 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| Physical Layer | OSI 第一層；將 frame 編碼成訊號喺媒介上傳 bit | "The physical layer transports bits across the network media and is the last step in the encapsulation process." |
| Network Interface Card (NIC) | 網絡介面卡；將裝置接上網絡 | "A Network Interface Card (NIC) connects a device to the network." |
| Physical Components | 硬件裝置、media、connectors；標準三大功能區之一 | "The Physical Components are the hardware devices, media, and other connectors that transmit the signals that represent the bits." |
| Encoding | 將 bits 轉成下一個裝置認得嘅格式（Manchester、4B/5B、8B/10B） | "Encoding converts the stream of bits into a format recognizable by the next device in the network path." |
| Signaling | 0 同 1 喺媒介上點表示（電／光／微波） | "The signaling method is how the bit values, '1' and '0' are represented on the physical medium." |
| Bandwidth | 媒介可承載數據嘅容量（理論上限） | "Bandwidth is the capacity at which a medium can carry data." |
| Latency | 延遲；數據由一點去另一點所需時間（含 delays） | "Latency is the amount of time, including delays, for data to travel from one given point to another." |
| Throughput | 一段時間內媒介上實際傳輸嘅 bits | "Throughput is the measure of the transfer of bits across the media over a given period of time." |
| Goodput | 可用數據量；= Throughput − traffic overhead | "Goodput is the measure of usable data transferred over a given period of time; Goodput = Throughput - traffic overhead." |
| Attenuation | 衰減；訊號行得越遠越弱 | "Attenuation means the longer the electrical signals have to travel, the weaker they get." |
| EMI / RFI / Crosstalk | 電磁干擾／射頻干擾／串音；銅線受影響，光纖免疫 | "Copper cable mitigates EMI and RFI by using metallic shielding and grounding, and mitigates crosstalk by twisting opposing circuit pair wires together." |
| UTP (Unshielded Twisted Pair) | 無屏蔽雙絞線；最常見 networking media，用 RJ-45 | "UTP is the most common networking media, terminated with RJ-45 connectors, and interconnects hosts with intermediary network devices." |
| STP (Shielded Twisted Pair) | 屏蔽雙絞線；有 braided 或 foil shield 抗 EMI/RFI | "STP provides better noise protection than UTP but is more expensive and harder to install." |
| Coaxial Cable | 同軸電纜；單芯導體＋編織屏蔽；用於無線天線同 cable internet | "Coaxial cable consists of a copper conductor, plastic insulation, a woven copper braid shield, and an outer jacket." |
| Cancellation | 用相反極性絞線令磁場互相抵消 | "Cancellation: each wire in a pair uses opposite polarity so the magnetic fields effectively cancel each other." |
| TIA/EIA-568 | UTP 標準；規定線類型、長度、接頭、收頭、測試方法 | "TIA/EIA-568 standardizes cable types, cable lengths, connectors, cable termination, and testing methods." |
| Straight-through Cable | 直通線；兩端同為 T568A 或 T568B；接唔同類裝置 | "An Ethernet straight-through cable has both ends T568A or T568B and connects a host to a network device." |
| Crossover Cable | 交叉線；一端 T568A 一端 T568B；接同類裝置；已屬 legacy | "An Ethernet crossover cable has one end T568A and the other T568B, and connects host-to-host, switch-to-switch, or router-to-router." |
| Auto-MDIX | 自動感應線材類型並完成連接（所以 crossover 算 legacy） | "Crossover is considered legacy due to most NICs using Auto-MDIX to sense cable type and complete connection." |
| Rollover Cable | 反轉線；Cisco 專有；接 console port 做管理 | "A rollover cable is Cisco proprietary and connects a host serial port to a router or switch console port, using an adapter." |
| Fiber-Optic Cabling | 光纖；長距離、高頻寬、完全免疫 EMI/RFI | "Fiber-optic cabling transmits data over longer distances at higher bandwidth than any other networking media and is completely immune to EMI/RFI." |
| Single-Mode Fiber (SMF) | 單模光纖；極細 core、貴 laser、長距離 | "Single-mode fiber has a very small core, uses expensive lasers, and is used for long-distance applications." |
| Multimode Fiber (MMF) | 多模光纖；較大 core、較平 LED、最多 10 Gbps / 550 meters | "Multimode fiber has a larger core, uses less expensive LEDs, and supports up to 10 Gbps over 550 meters." |
| Dispersion | 光脈衝隨時間擴散；越大損耗越大 | "Dispersion refers to the spreading out of a light pulse over time; increased dispersion means increased loss of signal strength." |
| FTTH | Fiber-to-the-Home；提供 always-on broadband | "Fiber-to-the-Home is used to provide always-on broadband services to homes and small businesses." |
| ST / SC / LC Connector 與 Patch Cord | 光纖接頭與跳線；黃色 = SMF，橙色／aqua = MMF | "Fiber-optic connectors include Straight-Tip (ST), Subscriber Connector (SC), and Lucent Connector (LC); a yellow jacket is for single-mode fiber and orange (or aqua) for multimode fiber." |
| Wireless Media | 用 radio / microwave 頻率攜帶電磁訊號；mobility 最高 | "Wireless media carries electromagnetic signals representing binary digits using radio or microwave frequencies." |
| WLAN Shared Medium | WLAN 行 half-duplex；多人同時使用會令每人頻寬下降 | "WLANs operate in half-duplex, so many users accessing the WLAN simultaneously results in reduced bandwidth for each user." |
| Wi-Fi (IEEE 802.11) / Bluetooth (IEEE 802.15) | 無線 LAN 標準／無線個人區域網絡 WPAN 標準 | "Wi-Fi (IEEE 802.11) is the WLAN technology; Bluetooth (IEEE 802.15) is the WPAN standard." |
| WiMAX (IEEE 802.16) / Zigbee (IEEE 802.15.4) | point-to-multipoint 寬頻無線接入／低功耗 IoT 通訊 | "WiMAX (IEEE 802.16) uses a point-to-multipoint topology; Zigbee (IEEE 802.15.4) provides low data-rate, low power-consumption communications for IoT." |
| Wireless Access Point (AP) / NIC Adapter | 集中無線訊號並接去有線基建／為主機提供無線能力 | "A wireless access point concentrates wireless signals and connects to the copper-based infrastructure; wireless NIC adapters provide wireless capability to hosts." |
| Data Link Layer | OSI 第二層；負責 NIC 之間通訊、封裝 Layer 3 packets 成 Layer 2 frames | "The data link layer is responsible for communications between end-device network interface cards." |
| LLC (Logical Link Control) | 邏輯鏈路控制子層；同上層軟件同下層硬件溝通 | "The LLC sublayer communicates between the networking software at the upper layers and the device hardware at the lower layers." |
| MAC (Media Access Control) | 媒介存取控制子層；負責 data encapsulation 同 media access control | "The MAC sublayer is responsible for data encapsulation and media access control." |
| Router Layer 2 Functions | 每跳四個動作：收 frame、拆封裝、重封裝、轉發 | "At each hop, a router accepts a frame, de-encapsulates it, re-encapsulates the packet into a new frame, and forwards it on the next segment." |
| Data Link Layer Standards Bodies | IEEE、ITU、ISO、ANSI 定義 data link protocols | "Data link layer protocols are defined by the IEEE, ITU, ISO, and ANSI." |
| Topology | 裝置嘅排列同互連關係；分 physical 同 logical | "The topology of a network is the arrangement and relationship of the network devices and the interconnections between them." |
| Point-to-Point / Hub and Spoke / Mesh | 三種 WAN topology；mesh 高可用性但全互連 | "Point-to-point is the simplest WAN topology with a permanent link between two endpoints; hub and spoke interconnects branch sites through a central site; mesh provides high availability but requires every end system to be connected to every other end system." |
| Star / Extended Star | LAN 常用拓撲；易裝、易擴、易排錯 | "Star and extended star topologies are easy to install, very scalable and easy to troubleshoot." |
| Bus / Ring Topology | 舊式 LAN 拓撲；Bus 串連並兩端 terminated，Ring 圍成環 | "Bus – all end systems chained together and terminated on each end. Ring – each end system is connected to its respective neighbors to form a ring." |
| Half-duplex / Full-duplex | 同一時間只能 send 或 receive／可同時 transmit 同 receive | "Half-duplex only allows one device to send or receive at a time; full-duplex allows both devices to simultaneously transmit and receive." |
| Contention-based / Controlled Access | 爭用式（CSMA/CD、CSMA/CA）／受控式 deterministic（Token Ring、ARCNET） | "Contention-based access means all nodes operate in half-duplex, competing for use of the medium; controlled access is deterministic where each node has its own time on the medium." |
| CSMA/CD | 用於 legacy bus-topology Ethernet；碰撞偵測後隨機等再重傳 | "CSMA/CD uses a collision detection process where devices detect a collision, wait a random period of time, and retransmit data." |
| CSMA/CA | 用於 IEEE 802.11 WLAN；事先傳送時間長度避免碰撞 | "CSMA/CA uses a collision avoidance process where devices include the time duration needed for the transmission." |
| Data Link Frame / Frame Fields | 由 Header、Data、Trailer 三部分組成；六大欄位 | "A frame consists of a header, data, and a trailer; Frame Start and Stop identifies the beginning and end, Addressing indicates source and destination nodes, Type identifies the encapsulated Layer 3 protocol, Control identifies flow control services, and Error Detection determines transmission errors." |
| Layer 2 Address | 又稱 physical address；喺 header；只用於本地鏈路；每跳被更新 | "A Layer 2 address is also referred to as a physical address; it is contained in the frame header, used only for local delivery of a frame on the link, and updated by each device that forwards the frame." |
| LAN and WAN Frames | logical topology + physical media 決定用邊個 protocol | "The logical topology and physical media determine the data link protocol used, such as Ethernet, 802.11 Wireless, PPP, HDLC, or Frame-Relay." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

1. **先理解觀念（Understand）**
   - 上下層分工：**Physical Layer 傳 bits（訊號）→ Data Link Layer 包 frame（LLC + MAC）→ Layer 3 packet 被載喺 frame 嘅 Data 部分**。
   - 生活聯想：銅線（電）／光纖（光）／無線（微波）＝三種 signaling；Walkie-talkie = half-duplex、Telephone = full-duplex；legacy bus Ethernet = CSMA/CD、Wi-Fi = CSMA/CA。
   - 因果鏈：attenuation 為何靠「守線長上限」解決；crosstalk 為何靠「絞線＋每呎絞數不同」解決；多人用 WLAN 為何慢（shared medium + half-duplex）。
2. **背誦英文短語（Memorize）**
   - 定義句五連：Bandwidth、Throughput、Goodput、Latency、Encoding／Signaling。
   - 表格四張：copper vs fiber、UTP vs STP vs Coaxial、WAN vs LAN topology、Frame fields（H/T 分類）。
   - 口訣：**Bandwidth ≥ Throughput ≥ Goodput**；**Unlike → straight、Like → cross、Console → rollover**；**LLC 對上、MAC 對下**；**CD = 撞完處理、CA = 事先預約**；**MMF 上限 550 meters**。
3. **掌握判斷同數字（Apply）**
   - 判斷題：畀一組裝置，選 straight-through / crossover / rollover；畀一張圖，認 point-to-point / hub and spoke / mesh（WAN）同 star / extended star / bus / ring（LAN）。
   - 數字題：1 Kbps = 1,000 bps、1 Mbps = 10^6 bps、1 Gbps = 10^9 bps、1 Tbps = 10^12 bps；UTP 距離 1–100 meters；fiber 1–100,000 meters；MMF 10 Gbps over 550 meters；UTP 頻寬 10 Mb/s–10 Gb/s、fiber 10 Mb/s–100 Gb/s。
   - 配對題：四個無線標準嘅 IEEE 編號（802.11 / 802.15 / 802.16 / 802.15.4）；光纖接頭 ST / SC / LC；patch cord 顏色 yellow = SMF。
4. **能解答英文考題（Exam-ready）**
   - "What are the three functional areas of physical layer standards?" → "Physical Components, Encoding, and Signaling."
   - "What is the difference between throughput and goodput?" → "Throughput measures the transfer of bits across the media; goodput measures usable data and equals throughput minus traffic overhead."
   - "Which cable connects like devices?" → "Use a crossover cable for like devices and a straight-through cable for unlike devices."
   - "Why is fiber immune to EMI/RFI?" → "Because it carries pulses of light rather than electrical signals, so electromagnetic interference does not affect it."
   - "What are the two sublayers of the data link layer?" → "Logical Link Control (LLC) and Media Access Control (MAC)."
   - "What Layer 2 functions does a router perform at each hop?" → 見 §3.9.3 四點。
   - "Which fields are in the trailer?" → "Error Detection and Frame Stop."
   - "Compare CSMA/CD and CSMA/CA." → "CSMA/CD is used on legacy bus-topology Ethernet and detects collisions then retransmits after a random delay; CSMA/CA is used on IEEE 802.11 WLANs and avoids collisions by including the transmission time duration."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**① 兩層速覽**
- Physical Layer：transports **bits**，將 frame encode 成 signals（encapsulation 最後一步）
- Data Link Layer：**LLC（對上）＋ MAC（對下）**，將 **Layer 3 packets** 封裝成 **Layer 2 frames**，做 error detection 同掉棄 corrupt frames
- 每跳 router 四動作：accept → de-encapsulate → re-encapsulate → forward

**② 三大 functional areas + 三種 signaling**

| Functional Area | 重點 |
| :--- | :--- |
| Physical Components | NIC、interfaces and connectors、cable materials、cable designs |
| Encoding | Manchester、4B/5B、8B/10B |
| Signaling | Copper = electrical signals；Fiber = light pulses；Wireless = microwave signals |

**③ 四個「速度」概念**

| 概念 | 一句定義 | 關係 |
| :--- | :--- | :--- |
| Bandwidth | capacity at which a medium can carry data | 最高（理論） |
| Throughput | measure of the transfer of bits across the media | ≤ Bandwidth |
| Goodput | measure of usable data；= Throughput − traffic overhead | ≤ Throughput |
| Latency | amount of time, including delays | 越細越好 |

**單位**：1 Kbps = 1,000 bps｜1 Mbps = 10^6 bps｜1 Gbps = 10^9 bps｜1 Tbps = 10^12 bps。

**④ 銅線三兄弟**：UTP｜冇屏蔽、最常見、最平、RJ-45 接頭。STP｜braided 或 foil shield（整體＋逐對）、抗噪最好、貴、難裝、RJ-45。Coaxial｜單芯導體＋編織銅網（同時做第二導線）、多種 coax connectors、用於無線天線同 cable internet。
**三個麻煩**：Attenuation（靠守線長上限）｜EMI／RFI（靠 shielding + grounding）｜Crosstalk（靠絞線 + 每呎絞數不同）。

**⑤ 線材選用（口訣：Unlike → straight、Like → cross、Console → rollover）**

| Cable Type | Standard | Application |
| :--- | :--- | :--- |
| Straight-through | Both ends T568A or T568B | Host to Network Device |
| Crossover（legacy，因 Auto-MDIX） | One end T568A, other T568B | Host-to-Host, Switch-to-Switch, Router-to-Router |
| Rollover（Cisco Proprietary） | — | Host serial port → Router / Switch Console Port（需 adapter） |

| Issue | UTP | Fiber |
| :--- | :--- | :--- |
| Bandwidth | 10 Mb/s - 10 Gb/s | 10 Mb/s - 100 Gb/s |
| Distance | 1 - 100 meters | 1 - 100,000 meters |
| EMI / RFI；electrical hazards | Low | High（Completely immune） |
| Cost／安裝技能／安全要求 | Lowest | Highest |

**⑥ 光纖速記**：SMF = very small core + expensive lasers + long distance；MMF = larger core + cheaper LEDs + **10 Gbps over 550 meters**（dispersion 較大）。**Patch cord 顏色：Yellow = SMF，Orange／Aqua = MMF。** 四個應用：Enterprise、FTTH、Long-Haul、Submarine。

**⑦ 無線**
- 限制：Coverage area｜Interference｜Security（唔需實體媒介，任何人都可接觸傳輸）｜Shared medium（half-duplex，多人用 → 每人頻寬減少）
- 標準：**Wi-Fi = IEEE 802.11**｜**Bluetooth = IEEE 802.15（WPAN）**｜**WiMAX = IEEE 802.16（point-to-multipoint）**｜**Zigbee = IEEE 802.15.4（IoT）**
- WLAN 兩件裝備：**Wireless AP**（集中無線訊號 → 接 copper-based infrastructure）＋ **Wireless NIC Adapters**（主機無線能力）

**⑧ 拓撲速記**：WAN = Point-to-point（兩點一永久連結，protocol 可非常簡單）／Hub and spoke（中央站點接分支）／Mesh（全部互連，高可用性）；LAN = Star／Extended star（易裝、scalable、易排錯，現今主流）／Bus（串連並兩端 terminated）／Ring（圍成環）。

**⑨ Duplex 同 Media Access**
- **Half-duplex**：one device send or receive at a time（WLAN、Ethernet hubs／legacy bus）；**Full-duplex**：simultaneously transmit and receive（Ethernet switches）
- **Contention-based**：CSMA/**CD**（legacy bus Ethernet；撞完 → 偵測 → 隨機等 → 重傳）；CSMA/**CA**（IEEE 802.11 WLAN；傳輸時附上 time duration，其他裝置得知媒介幾時可用）
- **Controlled access**：deterministic，每 node 有自己時間（Token Ring、ARCNET）

**⑩ Frame 結構（H / T 分類必考）**
- **Header**：Frame Start、Addressing（source／destination nodes）、Type（Layer 3 protocol）、Control（flow control services）
- **Trailer**：Error Detection（transmission errors）、Frame Stop
- **Layer 2 Address**：又叫 physical address；喺 header；只用於本地鏈路傳遞；**每跳被更新**
- **LAN/WAN frames**：Ethernet、802.11 Wireless、PPP、HDLC、Frame-Relay（logical topology + physical media 決定用邊個）

**⑪ 最後必背英文句（背完入場）**

> - "The physical layer transports bits across the network media."
> - "Bandwidth is the capacity at which a medium can carry data."
> - "Goodput = Throughput - traffic overhead."
> - "UTP is the most common networking media, terminated with RJ-45 connectors."
> - "Fiber-optic cabling is completely immune to EMI/RFI."
> - "The Data Link Layer consists of two sublayers: Logical Link Control (LLC) and Media Access Control (MAC)."
> - "Half-duplex only allows one device to send or receive at a time; full-duplex allows both devices to simultaneously transmit and receive."
> - "A data link frame has three parts: Header, Data, and Trailer."
