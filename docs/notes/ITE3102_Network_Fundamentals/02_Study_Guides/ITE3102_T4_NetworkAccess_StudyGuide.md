# ITE3102 Network Fundamentals — Tutorial 4 雙語練習題解 Guide

**課題：Network Access（Physical Layer & Data Link Layer）**

> 本 Guide 對應 Tutorial 4 全部分練習（Q1–Q12）。核心定義一律以英文標準定義句（Standard Definition）呈現，解說用香港繁體中文，方便同學「睇得明、記得熟、考得答」。

---

## 📝 練習概要 (Summary)

Tutorial 4 係「Network Access」嘅核心課題，即 OSI 模型最底兩層——**Physical Layer（實體層）**同 **Data Link Layer（數據鏈路層）**。實體層部分集中喺三類傳輸媒介（Copper 銅線、Fiber-optic 光纖、Wireless 無線）嘅訊號特性、Bandwidth / Throughput / Goodput 三個「速度」概念嘅分別、銅線電纜種類（UTP / STP / Coaxial、Straight-through / Crossover / Rollover）嘅選用規則，以及無線網絡嘅覆蓋限制、干擾同安全問題。

Data Link Layer 部分則考核 Frame（訊框）嘅結構：**LLC 與 MAC 兩個子層**嘅分工、WAN / LAN Topology（網絡拓撲）辨認、Half-duplex 與 Full-duplex 通訊模式嘅分別，以及 Frame 各欄位（Frame Start、Type、Addressing、Error Detection、Frame Stop 等）屬於 Header 定 Trailer、各欄位嘅功能。呢課係之後學習 Ethernet、MAC Addressing 同 Switching 嘅根基，考核重點係「定義背誦 + 分類判斷 + 場景應用」三類題型。

## 🎯 練習目標 (Objectives)

完成本練習後，你應該能夠：

| 能力 (Ability) | 英文對照 (English) |
|---|---|
| 分辨 Bandwidth、Throughput、Goodput 三個概念及影響因素 | Distinguish bandwidth, throughput and goodput, and state the factors affecting them |
| 配對各媒介所用嘅訊號類型（Copper / Fiber / Wireless） | Match each medium with the type of signal it uses |
| 判斷何時使用 Straight-through、Crossover、Rollover 銅線 | Decide when to use straight-through, crossover and rollover cables |
| 辨認 Coaxial、STP、UTP 三種銅線電纜 | Identify coaxial, STP and UTP copper cables |
| 比較 Copper 與 Fiber-optic 電纜嘅特性（速度、距離、成本、安裝、EMI/RFI） | Compare copper and fiber-optic cables in speed, distance, cost, installation ease and EMI/RFI immunity |
| 解釋 Wireless AP 同 Wireless NIC 嘅用途及無線網絡嘅限制、干擾、安全問題 | Explain the use of wireless access points and NIC adapters, and wireless concerns (coverage, interference, security, throughput) |
| 分辨 LLC 與 MAC 兩個子層嘅功能 | Distinguish the functions of the LLC and MAC sublayers |
| 辨認 WAN 與 LAN 常見拓撲 | Identify common WAN and LAN topologies |
| 分辨 Half-duplex 與 Full-duplex 通訊 | Differentiate half-duplex and full-duplex communication |
| 將 Frame 欄位歸入 Header / Trailer 並配對其功能 | Classify frame fields as Header or Trailer and match each field to its function |

---

## ✏️ 題目與答案 Walkthrough

### Section 1 — Physical Layer（實體層）

---

#### Q1. 填充題：Bandwidth、Throughput、Goodput

**題目原文 (Question):**

> Q1. Bandwidth is the capacity of a medium to carry raw data in a given period of time.
> Throughput: the measure of the transfer of ________________ over a given period of time.
> Throughput rarely matches the specified bandwidth for a network medium as it can be influenced by factors such as _____________ , ________________ , ________________ .
> Goodput: the measure of the transfer of ________________ over given period of time.
> Goodput is throughput minus traffic overhead for ______________________, ______________________, and ________________.

**✅ 答案 (Answer):**

- Throughput = transfer of **bits（across the media）** over a given period of time。
- 影響 Throughput 嘅三個因素：**amount of traffic（流量多少）、type of traffic（流量類型）、latency created by the network devices（網絡裝置造成嘅延遲）**。
- Goodput = transfer of **usable data（可用數據）** over a given period of time。
- Goodput 減去嘅三項 overhead：**establishing sessions（建立連線階段）、acknowledgements（確認訊息）、encapsulation（封裝）**。

**🧠 答題邏輯 (Reasoning):**

呢條係定義背誦題，最緊要分清楚三個詞嘅「層次」：**Bandwidth（頻寬）**係媒介嘅理論容量上限（raw data 原始數據）；**Throughput（吞吐量）**係實際量度到嘅 bit 傳輸速率，一定細過或等於 Bandwidth；**Goodput（有效吞吐量）**再減走協議 overhead，係使用者真正見到嘅可用數據速率。考試常見陷阱係將三者次序調轉——記住「理論值 ≥ 實際值 ≥ 可用值」，即 Bandwidth ≥ Throughput ≥ Goodput。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> Bandwidth is the theoretical capacity of the medium, while throughput measures the actual transfer of bits, and goodput measures the usable data after subtracting protocol overhead such as establishing sessions, acknowledgements and encapsulation.

---

#### Q2. 配對題：媒介與訊號類型

**題目原文 (Question):**

> Q2. For each media on the left, select the type of signal used.
> Options: Light patterns / Microwave transmissions / Electrical pulses

| Media（媒介） | Signal（訊號） |
|---|---|
| Copper | ______ |
| Fiber-optic | ______ |
| Wireless | ______ |

**✅ 答案 (Answer):**

| Media | Signal |
|---|---|
| Copper | **Electrical pulses（電脈衝）** |
| Fiber-optic | **Light patterns（光模式）** |
| Wireless | **Microwave transmissions（微波傳輸）** |

**🧠 答題邏輯 (Reasoning):**

每種媒介用唔同形式嘅「載體」傳送 bit：銅線用**電脈衝**（電壓高低代表 0/1），光纖用**光模式**（光嘅明暗或相位代表 0/1），無線用**電磁波／微波**喺空氣中傳播。配對時可以靠「物料」聯想：金屬導電→電；玻璃纖維導光→光；空中傳播→微波。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> Copper cables transmit data using electrical pulses, fiber-optic cables use light patterns, and wireless media use microwave (electromagnetic wave) transmissions.

---

#### Q3. 判斷題：Straight-through、Crossover、Rollover 銅線

**題目原文 (Question):**

> Q3. Identify the types of copper cables (straight-through, crossover, rollover) that should be used in sections 1-4 in the diagram below.

（原題附有網絡圖；以下為必須掌握嘅判斷規則，任何圖都適用。）

**✅ 答案 (Answer) — 先記規則，再代入圖：**

| 裝置組合 (Device Pair) | 電纜類型 (Cable Type) |
|---|---|
| PC ↔ Switch / Hub（唔同類型裝置） | **Straight-through（直通線）** |
| Switch ↔ Router（唔同類型裝置） | **Straight-through（直通線）** |
| PC ↔ PC / Switch ↔ Switch / Router ↔ Router（同類裝置） | **Crossover（交叉線）** |
| PC ↔ Router 直接連接（同類：都係 DTE） | **Crossover（交叉線）** |
| PC 嘅 Serial/COM 埠 ↔ Router / Switch 嘅 Console 埠 | **Rollover（反轉線）** |

典型圖嘅答案（PC—Switch—Router—Router—Switch—PC 佈局）：Section 1（PC→Switch）= Straight-through；Section 2（Switch→Router）= Straight-through；Section 3（Router→Router）= **Crossover**；Section 4（Router→Switch）= Straight-through；連接 Console 嘅一段 = **Rollover**。

**🧠 答題邏輯 (Reasoning):**

核心口訣係：**「唔同類裝置用直通線，同類裝置用交叉線」**（Unlike devices → straight-through; Like devices → crossover）。原因係 Switches 同 Hubs 內部已經做咗「傳送/接收線對交叉」嘅處理，所以 PC（DTE）駁 Switch（DCE 類裝置）用 Straight-through；但兩個同類裝置直接相連時，傳送線對會撞埋一齊，所以要 Crossover 調轉。Rollover 係例外：只係用嚟駁 Router/Switch 嘅 **Console 埠**做管理設定，唔係用嚟傳數據。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> Use a straight-through cable to connect unlike devices, such as a PC to a switch; use a crossover cable to connect like devices, such as a PC to a PC or a router to a router; use a rollover cable to connect a PC to the console port of a router or switch.

---

#### Q4. 辨認題：Coaxial、STP、UTP

**題目原文 (Question):**

> Q4. (a) Identify the following copper cables as Coaxial, STP, or UTP:

（原題以圖片顯示三種電纜橫切面；以下為辨認特徵。）

**✅ 答案 (Answer):**

| 電纜 (Cable) | 外觀特徵 (Visual Feature) | 構造 (Construction) |
|---|---|---|
| **Coaxial（同軸電纜）** | 最粗、圓身、中間一條粗導體 | 單支中央銅芯，外圍絕緣體 + 金屬編織屏蔽層 |
| **STP（Shielded Twisted Pair，屏蔽雙絞線）** | 每對線或整束線包住金屬箔/網 | 絞合線對 + 屏蔽層（Shield），減低 EMI/RFI |
| **UTP（Unshielded Twisted Pair，無屏蔽雙絞線）** | 最幼、最常見、冇屏蔽層 | 四對絞合銅線，靠絞合抵消干擾，用 RJ-45 接頭 |

**🧠 答題邏輯 (Reasoning):**

睇圖辨認嘅三步：① 見到「單芯粗導體 + 圓形屏蔽層」→ Coaxial（好似電視天線線）；② 見到「多對絞線 + 銀色金屬箔或編織網」→ STP；③ 見到「四對彩色絞線、冇屏蔽、最柔軟」→ UTP。記住：**STP 有 Shield（屏蔽），UTP 冇**，呢個係兩者名稱同構造嘅唯一分別。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> Coaxial cable has a single central copper conductor with a braided shield; STP has twisted pairs wrapped with a metallic shield to reduce EMI/RFI, while UTP has unshielded twisted pairs and is the most common LAN cable.

---

#### Q5. 比較題：Copper vs Fiber-optic

**題目原文 (Question):**

> Q5. Compare the characteristics of copper cables and fiber-optic cables according to the table below.

| Characteristic | Copper cables | Fiber-optic cables |
|---|---|---|
| Speed (slower/faster) | ______ | ______ |
| Distance (shorter/longer) | ______ | ______ |
| Cost (more expensive/cheaper) | ______ | ______ |
| Ease of installation (easy/difficult) | ______ | ______ |
| Affect by EMI/RFI (yes/no) | ______ | ______ |

**✅ 答案 (Answer):**

| Characteristic | Copper cables | Fiber-optic cables |
|---|---|---|
| Speed (slower/faster) | **Slower（較慢）** | **Faster（較快）** |
| Distance (shorter/longer) | **Shorter（較短）** | **Longer（較長）** |
| Cost (more expensive/cheaper) | **Cheaper（較平）** | **More expensive（較貴）** |
| Ease of installation (easy/difficult) | **Easy（容易）** | **Difficult（困難）** |
| Affect by EMI/RFI (yes/no) | **Yes（會受影響）** | **No（不受影響）** |

**🧠 答題邏輯 (Reasoning):**

呢類比較題係「特性對比記憶」：Copper 係「平、易裝、但慢、短、怕干擾」；Fiber 係「貴、難裝、但快、長、免疫干擾」。邏輯上亦講得通：光纖用光傳輸，光唔受電磁干擾（EMI/RFI）影響，訊號損耗細所以行得遠又快；銅線用電傳輸，電會衰減同受干擾，所以距離短、速度慢，但物料平同容易屈曲安裝。若題目問「點解光纖唔受 EMI/RFI 影響」，答案就係「光訊號唔係電訊號，電磁場干擾唔到佢」。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> Fiber-optic cables are faster, can transmit over longer distances, and are immune to EMI/RFI, but they are more expensive and more difficult to install than copper cables.

---

#### Q6. 問答題：Wireless Media

**題目原文 (Question):**

> Q6. (a) Wireless media provides the greatest mobility options of all media.
> What is the use of wireless access point?
> What is the use of wireless NIC adapters?
> (b) Wireless communication does have some areas of concern.
> What may limit its effective coverage area?
> Identify 3 kinds of devices that may interfere wireless transmission:
> Why is security a major concern?
> What will result as more users are accessing the WLAN simultaneously?

**✅ 答案 (Answer):**

(a)
- **Wireless Access Point (AP，無線接入點)** 嘅用途：讓無線裝置接入有線網絡——將無線用戶嘅訊號轉換成有線訊號，作為 Wireless LAN 與 Wired LAN 之間嘅橋樑，並延伸無線覆蓋範圍。
- **Wireless NIC Adapter（無線網絡卡）** 嘅用途：為主機（手提電腦、桌面電腦等）提供無線通訊能力，令裝置可以收發無線訊號並連接到 AP / WLAN。

(b)
- 限制有效覆蓋範圍嘅因素：**實體障礙物（牆壁、門）、距離 AP 太遠、射頻干擾（RF interference）**，都會令訊號強度衰減，縮細覆蓋範圍。
- 三類會干擾無線傳輸嘅裝置：**微波爐（microwave ovens）、無線電話（cordless phones）、藍牙裝置（Bluetooth devices）**——亦可答其他無線網絡 / Baby Monitor / 無線鏡頭。
- 安全係重大關注嘅原因：**無線訊號經空氣傳播，範圍內任何人（唔需要實體接觸）都可以攔截／竊聽數據**，缺乏實體邊界保護。
- 更多用戶同時使用 WLAN 嘅結果：**每個用戶分到嘅頻寬減少，整體 Throughput 下降，網絡性能變慢**（因為無線係共享媒介）。

**🧠 答題邏輯 (Reasoning):**

無線題目嘅答題框架係「**好處 vs 代價**」：好處係 Mobility（移動性），代價係 Coverage（覆蓋受障礙物限制）、Interference（干擾）、Security（訊號喺空氣中可被截取）、Shared Bandwidth（共享頻寬）。AP 嘅角色要講清楚係「Wireless ↔ Wired 之間嘅橋樑」，NIC 就係「令主機有無線能力」。考長題目時，四個 concern 逐點作答最穩陣。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> A wireless access point allows wireless devices to connect to the wired network, while a wireless NIC adapter provides wireless capability to hosts. Wireless coverage is limited by obstacles and distance; signals can be interfered with by devices such as microwave ovens and cordless phones; security is a concern because signals travel through the air and can be intercepted; and as more users access the WLAN, throughput decreases because the medium is shared.

---

### Section 2 — Data Link Layer（數據鏈路層）

---

#### Q8. 分類題：LLC vs MAC 子層功能

**題目原文 (Question):**

> Q8. The Data Link layer is responsible for Logical Link Control (LLC) and Media Access Control (MAC). Identify each of the functions below as belonging to LLC or MAC:
> Communicates with the network layer: ________
> Marks frames to identify the network layer protocol being carried: ________
> Provides data link layer addressing and access required: ________
> Communicates with Ethernet to send and receive frames: ________

**✅ 答案 (Answer):**

| 功能 (Function) | 子層 (Sublayer) |
|---|---|
| Communicates with the network layer | **LLC** |
| Marks frames to identify the network layer protocol being carried | **LLC** |
| Provides data link layer addressing and access required | **MAC** |
| Communicates with Ethernet to send and receive frames | **MAC** |

**🧠 答題邏輯 (Reasoning):**

分辨口訣：**「LLC 對上（Layer 3），MAC 對下（實體媒介）」**。LLC（Logical Link Control，邏輯鏈路控制）係軟件層面嘅子層，負責同 Network Layer（例如 IPv4/IPv6）溝通，並用 **Type / EtherType 欄位**標記 Frame 內載住邊個 Layer 3 協議；MAC（Media Access Control，媒介存取控制）係硬件層面嘅子層，負責 MAC Addressing（MAC 地址）、控制存取媒介，並直接同 Ethernet 收發 Frame。簡而言之：**LLC = 邏輯 + 辨識協議；MAC = 硬件 + 地址 + 存取媒介**。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> The LLC sublayer communicates with the network layer and identifies the network layer protocol carried in the frame, while the MAC sublayer provides data link layer addressing, media access, and communicates with Ethernet to send and receive frames.

---

#### Q9. 辨認題：WAN Topologies

**題目原文 (Question):**

> Q9. Identify the kind of WAN topologies below:

（原題以圖片顯示三種 WAN 拓撲；以下為辨認特徵。）

**✅ 答案 (Answer):**

| 拓撲 (Topology) | 特徵 (Feature) | 用途 (Usage) |
|---|---|---|
| **Point-to-Point（點對點）** | 兩個站點之間一條專用連結，一對一 | 連接兩個分支辦公室 / 專線 |
| **Hub-and-Spoke / Star（星型／樞紐輻射）** | 中央一個 Hub 站點連接多個 Spoke 站點 | 總部（HQ）連接多個分支 |
| **Mesh（網狀）** | 每個站點同其他站點都有連結，高度冗餘 | 關鍵站點之間提供備援路徑 |

**🧠 答題邏輯 (Reasoning):**

WAN Topology 講緊**地理上分散嘅站點之間點樣互連**。睇圖三步：只有兩點一條線 → Point-to-Point；一個中央點射出好多條線去周邊 → Hub-and-Spoke；多點互相連成網格 → Mesh。Mesh 一定係為咗 **Redundancy（冗餘）**——一條線斷咗仲有另一條路，但成本最高。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> A point-to-point topology connects two sites with a single link; a hub-and-spoke topology connects multiple sites through a central hub; a mesh topology provides redundant paths between multiple sites.

---

#### Q10. 辨認題：LAN Topologies

**題目原文 (Question):**

> Q10. Identify the kind of LAN topologies below:

（原題以圖片顯示三種 LAN 拓撲；以下為辨認特徵。）

**✅ 答案 (Answer):**

| 拓撲 (Topology) | 特徵 (Feature) | 優缺點 (Pros/Cons) |
|---|---|---|
| **Star（星型）** | 所有裝置經 Central Device（Switch/Hub）連接 | 易管理、單點故障喺中央裝置；現今 LAN 最常用 |
| **Ring（環型）** | 裝置形成一個封閉環，訊號順序傳遞 | 需要 Token 機制避免碰撞；故障影響全環 |
| **Bus（匯流排）** | 所有裝置共享一條主幹線 | 最簡單最平；主幹斷裂成個網絡癱瘓，好少用 |

（亦可考 **Mesh**（全互連、高冗餘）同 **Hybrid**（混合拓撲）。）

**🧠 答題邏輯 (Reasoning):**

LAN Topology 講緊**單一建築／範圍內裝置嘅連接形態**，現代 Ethernet LAN 幾乎全部係 Star（以 Switch 為中心）。辨認方法：中央有交換器、所有線匯入佢 → Star；裝置首尾相連成圈 → Ring；一條直線串起所有裝置 → Bus。要注意 Physical（實體）與 Logical（邏輯）拓撲可以唔同——例如實體星型但邏輯環型。答題時講埋「現今最常用 Star，因為容易管理同排錯」更完整。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> In a star topology all devices connect to a central switch, which makes it easy to manage; in a ring topology devices form a closed loop; in a bus topology all devices share a single backbone cable.

---

#### Q11. 問答題：Half-duplex vs Full-duplex

**題目原文 (Question):**

> Q11. Identify the difference between half-duplex and full-duplex communications.
> In half-duplex communication, devices can ______________________________________ .
> In full-duplex communication devices can _______________________________________ .

**✅ 答案 (Answer):**

- **Half-duplex（半雙工）**：裝置**可以傳送或接收，但唔可以同一時間做兩樣**——任何時刻只可以單向傳輸（好似對講機 Walkie-talkie，講緊就聽唔到）。
- **Full-duplex（全雙工）**：裝置**可以同時傳送同接收**——雙向同時進行（好似電話通話，兩邊可以同時講）。

**🧠 答題邏輯 (Reasoning):**

分辨重點係「**同時（simultaneously）**」呢個關鍵詞。Half-duplex 用「either send or receive, but not at the same time」；Full-duplex 用「send and receive at the same time」。實際應用：舊式 Hub 網絡行 Half-duplex（要靠 CSMA/CD 防碰撞），現代 Switch 網絡行 Full-duplex（無碰撞，吞吐量加倍）。記住例子就好易答：Walkie-talkie = Half；Telephone = Full。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> In half-duplex communication, a device can send or receive, but not both at the same time; in full-duplex communication, a device can send and receive simultaneously.

---

#### Q12. 配對題：Frame 欄位（Header / Trailer）

**題目原文 (Question):**

> Q12. The generic frame contains Header, Packet, and Trailer.
> For each frame field below, identify whether it belongs to the Header (H) or Trailer (T), and select the appropriate description for the field on the right.

| 欄位 (Field) | H / T | 功能描述 (Description) |
|---|---|---|
| Frame Start | ____ | Detects transmission error |
| Control | ____ | Identifies the Layer 3 protocol used by the LLC |
| Type | ____ | Marks the beginning of the frame |
| Error Detection | ____ | Marks the end of the frame |
| Addressing | ____ | Identifies source and destination hosts by MAC address |
| Frame Stop | ____ | Specifies special flow control services |

**✅ 答案 (Answer):**

| 欄位 (Field) | H / T | 功能描述 (Description) |
|---|---|---|
| Frame Start | **H（Header）** | Marks the beginning of the frame |
| Control | **H（Header）** | Specifies special flow control services |
| Type | **H（Header）** | Identifies the Layer 3 protocol used by the LLC |
| Error Detection | **T（Trailer）** | Detects transmission error |
| Addressing | **H（Header）** | Identifies source and destination hosts by MAC address |
| Frame Stop | **T（Trailer）** | Marks the end of the frame |

**🧠 答題邏輯 (Reasoning):**

Frame 結構係「**Header + Packet（Data）+ Trailer**」：所有「開頭／控制／辨識」資料（Frame Start、Control、Type、Addressing）都喺 Header；所有「結尾／檢查」資料（Error Detection 即 FCS、Frame Stop）都喺 Trailer。配對邏輯：Frame Start 標記 Frame 開始；Frame Stop 標記結束；Type（EtherType）標明載住邊個 Layer 3 協議（即 Q8 講嘅 LLC 標記功能）；Addressing 存放 Source/Destination MAC Address；Error Detection（Frame Check Sequence）用嚟偵測傳輸錯誤。記住「**前面係 H，後面檢查係 T**」就唔會錯。

**💬 關鍵英文答題句 (Exam Answer Phrase):**

> The frame header contains the Frame Start, Control, Type and Addressing fields, while the trailer contains the Error Detection (FCS) field and Frame Stop. The Type field identifies the Layer 3 protocol carried, and the Error Detection field detects transmission errors.

---

## 📖 必考英文術語與答題句型庫

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| **Bandwidth** | 媒介理論上可承載原始數據嘅容量，係上限值 | Bandwidth is the capacity of a medium to carry raw data in a given period of time. |
| **Throughput** | 實際量度到嘅 bit 傳輸速率，受流量、流量類型同裝置延遲影響 | Throughput is the measure of the transfer of bits across the media over a given period of time. |
| **Goodput** | 減去協議 overhead 後嘅可用數據速率 | Goodput is the measure of the transfer of usable data over a given period of time. |
| **Physical Layer** | OSI 第一層，負責以 Electrical pulses / Light / Microwave 傳送 bit | The physical layer defines the physical characteristics of the medium and transmits bits as signals. |
| **Data Link Layer** | OSI 第二層，分 LLC 同 MAC 兩個子層，負責 Frame 封裝同媒介存取 | The data link layer is responsible for Logical Link Control (LLC) and Media Access Control (MAC). |
| **LLC（Logical Link Control）** | 與 Network Layer 溝通、以 Type 欄位標記所載 Layer 3 協議 | The LLC sublayer communicates with the network layer and marks frames to identify the network layer protocol being carried. |
| **MAC（Media Access Control）** | 提供 MAC 地址、媒介存取控制，並同 Ethernet 收發 Frame | The MAC sublayer provides data link layer addressing and media access, and communicates with Ethernet to send and receive frames. |
| **Straight-through Cable** | 直通線，兩端接線相同，連接唔同類型裝置（如 PC↔Switch） | Use a straight-through cable to connect unlike devices, such as a PC to a switch. |
| **Crossover Cable** | 交叉線，兩端傳送/接收線對調轉，連接同類型裝置（如 PC↔PC） | Use a crossover cable to connect like devices, such as a PC to a PC. |
| **Rollover Cable** | 反轉線，連接 PC 同 Router/Switch 嘅 Console 埠做管理 | A rollover cable connects a PC to the console port of a router or switch. |
| **UTP** | 無屏蔽雙絞線，最常見、最平、最易安裝嘅 LAN 電纜 | UTP is the most common LAN cable, with unshielded twisted pairs. |
| **STP** | 屏蔽雙絞線，有金屬屏蔽層減低 EMI/RFI | STP has twisted pairs wrapped with a shield to reduce EMI/RFI. |
| **Coaxial** | 同軸電纜，單芯導體加編織屏蔽層，抗干擾能力強 | Coaxial cable has a single central conductor surrounded by a braided shield. |
| **EMI / RFI** | 電磁干擾／射頻干擾，只影響銅線，唔影響光纖 | Copper cables are affected by EMI/RFI, while fiber-optic cables are not. |
| **Wireless Access Point (AP)** | 讓無線裝置接入有線網絡嘅橋樑裝置 | An access point allows wireless devices to connect to the wired network. |
| **Wireless NIC Adapter** | 為主機提供無線收發能力嘅網絡卡 | A wireless NIC adapter provides wireless communication capability to a host. |
| **Half-duplex** | 同一時間只可傳送或接收其一，好似對講機 | In half-duplex, a device can send or receive, but not both at the same time. |
| **Full-duplex** | 同一時間可同時傳送同接收，好似電話 | In full-duplex, a device can send and receive simultaneously. |
| **Header / Trailer** | Frame 前段控制資料／後段檢查資料（FCS、Frame Stop） | Frame Start, Type and Addressing are in the header; Error Detection and Frame Stop are in the trailer. |
| **Topology** | 網絡裝置嘅連接形態；WAN 常用 Point-to-Point、Hub-and-Spoke、Mesh，LAN 常用 Star、Ring、Bus | A star topology connects all devices to a central switch; a mesh topology provides redundant paths. |

---

## 🗺️ 學習路線 (Learning Path)

**第 1 步：理解（Understand）**
- 先搞清 OSI 最底兩層做咩：Physical Layer 傳訊號（電/光/微波），Data Link Layer 封 Frame（LLC + MAC）。
- 用日常例子理解抽象概念：Walkie-talkie = Half-duplex；Telephone = Full-duplex；電視天線線 = Coaxial；Wi-Fi = Wireless。

**第 2 步：背誦（Memorize）**
- 背熟五組定義：Bandwidth / Throughput / Goodput；LLC vs MAC；Header vs Trailer；Half vs Full-duplex；Copper vs Fiber 比較表。
- 背口訣：「理論 ≥ 實際 ≥ 可用」「LLC 對上、MAC 對下」「唔同類用直通、同類用交叉」。

**第 3 步：掌握判斷/計算（Apply）**
- 練習分辨三種銅線（Straight/Crossover/Rollover）同三種電纜（UTP/STP/Coaxial）嘅使用場景同外觀。
- 練習睇拓撲圖認 WAN（Point-to-Point / Hub-and-Spoke / Mesh）同 LAN（Star / Ring / Bus）拓撲。
- 嘗試解釋「點解光纖不受 EMI/RFI 影響」「點解多人用 WLAN 會慢」——用因果邏輯推導。

**第 4 步：能解答考題（Exam-ready）**
- 將每個概念用英文標準句寫一次（照抄 Exam Answer Phrase 再默寫）。
- 完成 Tutorial 4 全卷一次，錯嘅題目圈出，對返本 Guide 嘅答題邏輯重溫。
- 考前 30 分鐘只睇「考前 5 分鐘懶人包」做最後衝刺。

---

## 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 1. 三大速度概念（次序必考）

| 概念 | 量度咩 | 關係 |
|---|---|---|
| Bandwidth | 理論容量（raw data） | 最高 |
| Throughput | 實際 bit 傳輸 | Bandwidth ≥ Throughput |
| Goodput | 可用數據（減 overhead） | Throughput ≥ Goodput |

> **口訣**：Bandwidth ≥ Throughput ≥ Goodput（理論 ≥ 實際 ≥ 可用）。

### 2. 媒介訊號速記

| 媒介 | 訊號 |
|---|---|
| Copper | Electrical pulses（電脈衝） |
| Fiber-optic | Light patterns（光模式） |
| Wireless | Microwave transmissions（微波） |

### 3. Copper vs Fiber 對比表（必背）

| 特性 | Copper | Fiber |
|---|---|---|
| Speed | Slower | Faster |
| Distance | Shorter | Longer |
| Cost | Cheaper | More expensive |
| Installation | Easy | Difficult |
| EMI/RFI | Yes（受影響） | No（免疫） |

### 4. 電纜選用規則

- **Straight-through**：唔同類裝置（PC↔Switch、Switch↔Router）
- **Crossover**：同類裝置（PC↔PC、Switch↔Switch、Router↔Router、PC↔Router 直接連）
- **Rollover**：PC ↔ Console 埠（管理用）

> **口訣**：Unlike → straight；Like → cross；Console → rollover。

### 5. LLC vs MAC（子層分工）

- **LLC**：對上（Network Layer）、標記 Layer 3 協議（Type 欄位）→ 邏輯/軟件
- **MAC**：對下（Ethernet）、MAC 地址、媒介存取 → 硬件

> **口訣**：LLC 對上（Logic + Layer 3）；MAC 對下（Media + Addressing）。

### 6. Frame 結構（H / T 分類）

- **Header（H）**：Frame Start、Control、Type、Addressing
- **Trailer（T）**：Error Detection（FCS）、Frame Stop

### 7. Duplex 通訊

- **Half-duplex**：send or receive，but **not at the same time**（Walkie-talkie）
- **Full-duplex**：send and receive **simultaneously**（Telephone）

### 8. WLAN 四宗罪（無線網絡 concern）

1. Coverage 受障礙物/距離限制
2. Interference（微波爐、無線電話、Bluetooth）
3. Security（訊號喺空氣中可被攔截）
4. 多用戶 → Throughput 下降（共享媒介）

### 9. 拓撲速記

- **WAN**：Point-to-Point（兩點一線）、Hub-and-Spoke（一中心多分支）、Mesh（全互連、冗餘）
- **LAN**：Star（Switch 為中心，最常用）、Ring（環）、Bus（共享主幹）

### 10. 關鍵英文記憶句（背熟呢幾句就夠）

> - Bandwidth is the capacity of a medium to carry raw data in a given period of time.
> - Throughput is the measure of the transfer of bits across the media; goodput is the measure of usable data.
> - Use straight-through for unlike devices and crossover for like devices.
> - Fiber-optic cables are faster, longer distance, and immune to EMI/RFI, but more expensive and difficult to install.
> - In half-duplex, a device can send or receive, but not both at the same time; in full-duplex, a device can send and receive simultaneously.
> - The LLC sublayer communicates with the network layer; the MAC sublayer provides addressing and media access.
