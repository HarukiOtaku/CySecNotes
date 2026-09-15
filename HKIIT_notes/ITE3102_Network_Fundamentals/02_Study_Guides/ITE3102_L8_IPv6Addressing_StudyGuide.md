# ITE3102 L8: IPv6 Addressing — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Module 12: IPv6 Addressing（Lecture 8: IPv6 Addressing，共 29 頁）
> **原始檔**：`01_Raw_Materials/Lectures/Lecture8_IPv6Addressing.pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 最後對照懶人包自測
> **相關練習**：➜ 題解練習見 `ITE3102_T8_IPv6Addressing_StudyGuide.md`（IPv6 位址換算、類型配對、EUI-64 計算題）

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課講 **IPv6 Addressing（IPv6 定址）**，係 IPv4 定址之後一定要掌握的下一代定址系統。IPv6 用 **128-bit** 位址空間，解決咗 IPv4「位址唔夠派」嘅根本問題，同時修正咗 IPv4 嘅若干限制（例如 NAT 帶來的複雜性、廣播造成的浪費）。今課內容由「為什麼要換」開始，順住四條線走：**表示法（Representation）** → **位址類型（Address Types）** → **靜態設定（Static Configuration）** → **動態取得（Dynamic Addressing）**，最後補上 **Multicast** 同 **Subnetting**。

實務情境一：你係一間公司嘅網絡管理員，ISP 派咗一組 `2001:db8:acad::/48` 嘅 IPv6 位址畀你。你要喺 10 個部門之間分 subnet —— 靠嘅唔再係 IPv4 嘅 subnet mask，而係 GUA 中間嘅 **Subnet ID** 欄位（本課最後一節就係計呢條數：`/48` + 16-bit Subnet ID = **65,536 個 `/64` subnet**）。

實務情境二：同事插線後電腦「自己就有」一個 IPv6 位址，冇人設定過。原因係 **SLAAC** —— Router 用 **RA（Router Advertisement）** 訊息把 prefix 話畀電腦知，電腦自己用 **EUI-64** 或**隨機**方法生成 Interface ID。而同時每部機都一定有一個 **Link-Local Address（fe80::/10）**，用來同同一條 link 上面嘅設備通訊；亦因為咁，**Default Gateway 通常直接填 Router 嘅 LLA**。

> IPv6 is a 128-bit addressing system that provides a much larger address space than IPv4, and it includes fixes for IPv4 limitations and other enhancements.

---

## 🎯 2. 考試學習目標（Learning Objectives）

1. **解釋為何需要 IPv6** — Explain why IPv6 is needed and how the 128-bit address space solves IPv4 exhaustion
2. **列出 IPv4 與 IPv6 共存的三種方法** — Describe dual stack, tunneling, and translation (NAT64)
3. **寫出正確的 IPv6 preferred format** — Write an IPv6 address in preferred format (eight hextets)
4. **套用兩條縮寫規則** — Apply Rule 1 (omit leading zeros) and Rule 2 (double colon) correctly
5. **判斷 `::` 是否合法使用** — Determine where a double colon may be used (only once per address)
6. **分辨 Unicast、Multicast、Anycast** — Distinguish the three IPv6 address categories; explain why there is no broadcast
7. **背出各類位址的前綴範圍** — State the prefixes: GUA `2000::/3`, LLA `FE80::/10`, ULA `FC00::/7`, loopback `::1/128`, unspecified `::/128`, multicast `FF00::/8`
8. **拆解 GUA 的三個部分** — Break a GUA into Global Routing Prefix, Subnet ID, and Interface ID
9. **設定靜態 GUA 與 LLA（Cisco IOS）** — Configure static GUA and static link-local addresses
10. **分辨三種動態取得 GUA 的方法** — Distinguish SLAAC, SLAAC with stateless DHCPv6, and stateful DHCPv6
11. **用 EUI-64 由 MAC 產生 Interface ID** — Create an Interface ID using the EUI-64 process
12. **分辨 RS 與 RA 訊息的功能** — Explain the role of Router Solicitation and Router Advertisement (ICMPv6)
13. **說明 Solicited-node multicast 的用途** — Explain solicited-node multicast and NIC filtering
14. **計算 IPv6 subnet 數量** — Calculate how many `/64` subnets a given Subnet ID length provides

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 為何需要 IPv6（Need for IPv6）

繁中解說：**IPv4 位址正在耗盡（running out of addresses）** —— 互聯網人口不斷增加、IPv4 只有 32-bit 位址空間唔夠派，加上 **NAT** 令端對端通訊變複雜、**IoT**（物聯網）令需要位址的裝置爆炸性增長。IPv6 用 **128-bit** 位址空間，容量係 IPv4 嘅 2⁹⁶ 倍，同時加入咗對 IPv4 限制嘅修正同其他改良。所以 IPv6 唔止係「多啲位址」，而係**重新設計過**嘅定址系統。

> "IPv4 is running out of addresses. IPv6 has a much larger 128-bit address space."
> "The development of IPv6 also included fixes for IPv4 limitations and other enhancements."
> "IPv6 solves the problems caused by increasing internet population, limited IPv4 address space, issues with NAT and the IoT."

### 3.2 IPv4 與 IPv6 共存（IPv4 and IPv6 Coexistence）

繁中解說：IPv4 唔會一夜之間消失，所以要有三條共存路線 ——

| 方法 | 做法（繁中） | English |
|---|---|---|
| **Dual Stack** | 同一部設備同時行兩套協定堆疊（IPv4 + IPv6） | run both IPv4 and IPv6 protocol stacks simultaneously |
| **Tunneling** | 把 IPv6 封包**封裝（encapsulated）**喺 IPv4 封包入面，借 IPv4 網絡運送 | The IPv6 packet is encapsulated inside an IPv4 packet |
| **Translation（NAT64）** | 用 NAT64 令 IPv6 裝置同 IPv4 裝置互相通訊（做位址轉換） | NAT64 allows IPv6-enabled devices to communicate with IPv4-enabled devices |

> "Dual stack — run both IPv4 and IPv6 protocol stacks simultaneously."
> "Tunneling — The IPv6 packet is encapsulated inside an IPv4 packet."
> "Translation — NAT64 allows IPv6-enabled devices to communicate with IPv4-enabled devices."

### 3.3 IPv6 位址表示法：Preferred Format（表示法基礎）

繁中解說：IPv6 位址長 **128 bits**，用**十六進位**書寫（大寫小寫都可以）。每 16 bits 為一組、寫成 4 個十六進位數字，叫做一個 **hextet**；**8 個 hextet** 用冒號分隔，就係 **preferred format**（首選格式）。

- 例子（preferred format）：
  - `2001:0db8:0000:1111:0000:0000:0000:0200`
  - `2001:0db8:0000:00a3:abcd:0000:0000:1234`

> "IPv6 address is 128 bits in length and written in hexadecimal."
> "A segment of 16 bits, or four hexadecimal values is called a hextet."
> "IPv6 addresses can be written in either lowercase or uppercase."

**心法**：`8 hextet × 16 bits = 128 bits`。看到位址即數有幾個 hextet（縮寫後唔可以超過 8 組嘅概念）。

### 3.4 縮寫規則一：省略前導零（Rule 1 — Omit Leading Zero）

繁中解說：**只可以省略每個 hextet 前面（leading）嘅 0**，唔可以省略尾隨或者中間嘅 0。

| 原本 | 省略前導零後 |
|---|---|
| `01ab` | `1ab` |
| `09f0` | `9f0` |
| `0a00` | `a00` |
| `00ab` | `ab` |

⚠️ 常見錯誤：`0a00` 唔可以寫成 `0a`（尾隨零唔可以省）；`0000` 亦唔可以寫成空（佢係一個完整 hextet `0`）。

> "The first rule to reduce the notation of IPv6 addresses is to omit any leading 0s (zeros)."

### 3.5 縮寫規則二：雙冒號（Rule 2 — Double Colon）

繁中解說：**雙冒號 `::`** 可以代替**一段連續、一個或以上、全為 0 嘅 hextet**。例子：`2001:db8:cafe:1:0:0:0:1`（已省略前導零）可寫成 `2001:db8:cafe:1::1`。

⚠️ **`::` 在一個位址內只可以用一次** —— 因為用兩次就會出現多過一個可能嘅展開結果（ambiguous）。

**反向展開步驟（考題常考）**：
1. 數清楚非零 hextet 有幾組（例如 `2001:db8:cafe:1::1` → 5 組）
2. `8 − 5 = 3` → 即係 `::` 代表 **3 個全零 hextet** = 3 × 16 = **48 個 binary 0** = 12 個十六進位 0
3. 展開：`2001:0db8:cafe:0001:0000:0000:0000:0001`

> "A double colon (::) can replace any single, contiguous string of one or more 16-bit hextets consisting of all zeros."
> "Note: The double colon (::) can only be used once within an address, otherwise there would be more than one possible resulting address."

### 3.6 三大類別：Unicast、Multicast、Anycast（Address Types）

繁中解說：IPv6 位址分三大類 ——

| 類別 | 意思（繁中） | English |
|---|---|---|
| **Unicast** | 唯一標識一部 IPv6 設備上嘅一個介面（一對一） | uniquely identifies an interface on an IPv6-enabled device |
| **Multicast** | 把單一封包送到多個目的地（一對多） | used to send a single IPv6 packet to multiple destinations |
| **Anycast** | 同一個 unicast 位址可以配給多部設備；封包會送到**最近**嗰部 | a packet sent to an anycast address is routed to the nearest device having that address |

⚠️ **IPv6 冇 broadcast 位址** —— IPv4 嘅 broadcast 功能由 multicast 取代。

> "Note: Unlike IPv4, IPv6 does not have a broadcast address."

### 3.7 Prefix Length 與 /64（IPv6 Prefix Length）

繁中解說：**Prefix length** 用嚟指出位址嘅網絡部分，寫法係 `IPv6 address/prefix length`。長度可以由 **0 到 128**；**典型值係 `/64`**（因為 /64 就等於 64-bit Interface ID，正好做 SLAAC／EUI-64）。IPv6 **冇 subnet mask** 呢個概念，一律用 prefix length（CIDR 式）表達。

> "Prefix length is used to indicate the network portion of an IPv6 address. Prefix length can range from 0 to 128; typical prefix length is /64."

### 3.8 Unicast 位址兩大主力：GUA 與 LLA（Types of IPv6 Unicast Addresses）

繁中解說：IPv4 設備通常得一個位址，但 **IPv6 設備通常有兩個 unicast 位址**：

| 位址 | Prefix | 特性 | English key points |
|---|---|---|---|
| **Global Unicast Address (GUA)** | `2000::/3` | 類似 IPv4 嘅 public address、全球唯一、可以在 Internet 上路由 | similar to public IPv4 address; globally unique; Internet routable |
| **Link-local Address (LLA)** | `FE80::/10` | 每部 IPv6 設備**必須**有；只可以同同一條 link 上嘅設備通訊；**不可路由** | required for every IPv6-enabled device; not routable; confined to a single link |

> "Unlike IPv4 devices that have only a single address, IPv6 addresses typically have two unicast addresses."

### 3.9 GUA 的三個部分（IPv6 GUA Structure）

繁中解說：一個 GUA 由三部分組成 ——

1. **Global Routing Prefix**：由 ISP（服務提供者）派畀客戶／site 嘅網絡部分，會因應 ISP 政策而不同
2. **Subnet ID**：由機構自己用嚟喺 site 內分辨唔同 subnet
3. **Interface ID**：等同 IPv4 嘅 host portion；強烈建議用 **/64** subnet，即 64-bit Interface ID

重點細節（考題常出）：
- IPv6 **允許全 0 同全 1 嘅 host 位址配畀設備**；其中**全 0 位址保留為 Subnet-Router anycast address，只應該配喺 Router**
- 現時只派發**頭 3 bits 為 `001`** 嘅 GUA，即 **`2000::/3`**
- 可派嘅 GUA 十六進位開頭係 **2 或 3** —— 即係只佔總 IPv6 位址空間嘅 **1/8**

> "Global Routing Prefix — network portion of the address that is assigned by the provider, such as an ISP, to a customer or site."
> "Subnet ID — used by an organization to identify subnets within its site."
> "Interface ID — equivalent to the host portion of an IPv4 address."
> "The all-0s address is reserved as a Subnet-Router anycast address and should be assigned only to routers."
> "Currently, only GUAs with the first 3 bits of 001 (2000::/3) are being assigned."

### 3.10 Link-Local Address 深入（IPv6 LLA）

繁中解說：LLA（`FE80::/10`）令設備可以同**同一條 link（同一個 subnet）**上嘅其他 IPv6 設備通訊，**只限條 link 內**。帶住 LLA 做 source 或 destination 嘅封包**唔可以路由**（router 會丟棄）。**每個 IPv6 介面都必須有 LLA**；如果冇手動設定，設備會**自動生成**一個（EUI-64 或隨機）。

> "An IPv6 link-local address (LLA) (range FE80::/10) enables a device to communicate with other IPv6-enabled devices on the same link and only on that link (subnet)."
> "Packets with a source or destination LLA cannot be routed."
> "Every IPv6-enabled network interface must have an LLA."

### 3.11 Unique Local Address（ULA）

繁中解說：**ULA** 類似 IPv4 嘅 RFC 1918 private address（例如 10.x.x.x），但有幾個重要分別：

- 標準前綴係 **`FC00::/7`**（實際使用上係 `FD00::/8`，L bit = 1 嘅 locally assigned 範圍）；講義列出嘅範圍係 `fc00::/7` 至 `fdff::/7`
- 用於 site 內部（或有限數量 site 之間）嘅本地定址
- 適合**永遠唔需要連去其他網絡**嘅設備
- **唔會**在 Internet 上被路由，**亦唔會**被轉換（translate）成 global IPv6 位址

> "The IPv6 unique local addresses (range fc00::/7 to fdff::/7) are similar to RFC 1918 private addresses for IPv4."
> "Unique local addresses are not globally routed or translated to a global IPv6 address."

### 3.12 特殊位址：Loopback、Unspecified、IPv4-embedded

| 位址 | 用途 | English |
|---|---|---|
| **Loopback `::1/128`** | 送封包畀自己；**唔可以**配喺實體介面；用 `ping` 測試本機 TCP/IP 設定 | Used to send a packet to itself and cannot be assigned to a physical interface |
| **Unspecified `::/128`** | **唔可以**配畀介面；只可以作為**來源位址**（例如開機時 DHCPv6 / DAD 之前） | Cannot be assigned to an interface and is only used as a source address |
| **IPv4-embedded**（例如 `::192.168.10.10`） | 幫助由 IPv4 過渡到 IPv6 | Used to help transition from IPv4 to IPv6 |

> "Loopback (::1/128) — Used to send a packet to itself and cannot be assigned to a physical interface."
> "Unspecified address (::/128) — Cannot be assigned to an interface and is only used as a source address."

### 3.13 靜態設定 GUA 與 LLA（Static Configuration）

#### 3.13.1 Windows Host

繁中解說：Windows 上面可以用 Router 介面嘅 **GUA 或 LLA** 做 **default gateway**；**最佳做法（best practice）係用 LLA**。如果係用 DHCPv6 或 SLAAC，Router 嘅 LLA 會**自動**被指定做 default gateway。

> "The GUA or LLA of the router interface can be used as the default gateway. Best practice is to use the LLA."
> "When DHCPv6 or SLAAC is used, the LLA of the router will automatically be specified as the default gateway address."

#### 3.13.2 Cisco IOS — 靜態 GUA

繁中解說：Cisco IOS 大部分 IPv6 指令同 IPv4 對應，**通常只需把 `ip` 改成 `ipv6`**。設定介面 GUA 嘅指令係 `ipv6 address ipv6-address/prefix-length`：

```
R1(config)# interface gigabitethernet 0/0/0
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64
R1(config-if)# no shutdown
R1(config-if)# exit
```

> "Most IPv6 configuration and verification commands in the Cisco IOS are similar to their IPv4 counterparts. In many cases, the only difference is the use of ipv6 in place of ip within the commands."
> "The command to configure an IPv6 GUA on an interface is: ipv6 address ipv6-address/prefix-length."

#### 3.13.3 Cisco IOS — 靜態 LLA

繁中解說：手動設定 LLA 可以令位址**易認、易記**。指令係 `ipv6 address ipv6-link-local-address link-local`：

```
R1(config)# interface gigabitethernet 0/0/0
R1(config-if)# ipv6 address fe80::1:1 link-local
R1(config-if)# no shutdown
R1(config-if)# exit
```

⚠️ 注意：**同一條 link 上面嘅 LLA 必須唯一**，但**唔同 link 可以用同一組 LLA**（因為 LLA 只在一條 link 內有意義）。常見做法係 Router 每個介面用唔同 LLA，方便識別「係邊部 Router 嘅邊個介面」。

> "LLAs can be configured manually using the ipv6 address ipv6-link-local-address link-local command."
> "The same LLA can be configured on each link as long as it is unique on that link."

> **補充（講義未列出，實務必需）**：Router 要轉發 IPv6 封包，一般要先在全域啟用 **`ipv6 unicast-routing`**，否則介面有 `2001:.../64` 都唔會做 routing。

### 3.14 動態取得 GUA：RS 與 RA（RS and RA Messages）

繁中解說：設備透過 **ICMPv6** 訊息動態取得 GUA ——

- **Router Solicitation（RS）**：由 **host 發出**，用嚟**搵 Router**（「有冇 Router 喺度？」）
- **Router Advertisement（RA）**：由 **Router 發出**，話畀 host 知點取得 GUA，並提供：**network prefix 同 prefix length**、**default gateway 位址**、**DNS 位址同 domain name**

RA 可以提供**三種**設定 GUA 嘅方法：**SLAAC**、**SLAAC + stateless DHCPv6**、**stateful DHCPv6（唔用 SLAAC）**。

> "Devices obtain GUA addresses dynamically through Internet Control Message Protocol version 6 (ICMPv6) messages."
> "Router Solicitation (RS) messages are sent by host devices to discover IPv6 routers."
> "Router Advertisement (RA) messages are sent by routers to inform hosts on how to obtain an IPv6 GUA."

#### 3.14.1 方法一：SLAAC

繁中解說：**SLAAC（Stateless Address Autoconfiguration）**令設備**唔需要 DHCPv6** 就配到 GUA：設備由本機 Router 嘅 **ICMPv6 RA** 訊息取得所需資料，**prefix 由 RA 提供**，設備再用 **EUI-64 或隨機生成**方法造出 Interface ID。

> "SLAAC allows a device to configure a GUA without the services of DHCPv6."
> "The prefix is provided by the RA and the device uses either the EUI-64 or random generation method to create an interface ID."

#### 3.14.2 方法二：SLAAC + Stateless DHCPv6

繁中解說：RA 可以叫設備**同時用 SLAAC 同 stateless DHCPv6**：

- 用 **SLAAC** 自己造 IPv6 GUA
- 用 **Router 嘅 LLA**（即 RA 嘅來源位址）做 default gateway
- 用 **stateless DHCPv6 server** 取得**其他資料**（例如 DNS server 位址同 domain name）

> "An RA can instruct a device to use both SLAAC and stateless DHCPv6."
> "A stateless DHCPv6 server to obtain other information such as a DNS server address and a domain name."

#### 3.14.3 方法三：Stateful DHCPv6

繁中解說：RA 亦可以叫設備**只用 stateful DHCPv6**（類似 IPv4 嘅 DHCP）：設備由 **stateful DHCPv6 server** 自動取得 **GUA、prefix length、DNS server 位址**；而 **default gateway 仍然用 Router 嘅 LLA**（RA 來源位址）。

> "Stateful DHCPv6 is similar to DHCP for IPv4. A device can automatically receive a GUA, prefix length, and the addresses of DNS servers from a stateful DHCPv6 server."

> **補充（機制細節，講義用文字描述）**：RA 係靠 **A flag**（Autonomous，=1 表示可以用 SLAAC）同 **O flag**（Other，=1 表示要去 stateless DHCPv6 攞其他資料）去指示用邊一種方法。

### 3.15 EUI-64：由 MAC 產生 Interface ID（EUI-64 Process）

繁中解說：IEEE 定義嘅 **EUI-64（modified EUI-64）**流程有兩個步驟：

1. 喺客戶端 **48-bit Ethernet MAC address 中間插入 16-bit 值 `fffe`（十六進位）**
2. 把 MAC address 嘅**第 7 個 bit 反轉**（binary 0 → 1）

**示範計算（跟足上述兩步）**：

```
MAC address            : 00:1A:2B:3C:4D:5E
① 中間插入 fffe        : 001A:2BFF:FE3C:4D5E
② 反轉第 7 個 bit      : 第一個 byte 00 = 0000 0000 → 0000 0010 = 02
   結果                : 021A:2BFF:FE3C:4D5E
③ 加上 LLA prefix      : fe80::21a:2bff:fe3c:4d5e
```

⚠️ 考題重點：**fffe 係插喺中間**（第 3、4 個 byte 位置），**唔係接尾巴**；第 7 個 bit 反轉後常見結果係 `00 → 02`、`02 → 00`、`1A → 18`（同類推）。

> "The IEEE defined the Extended Unique Identifier (EUI) or modified EUI-64 process which performs the following:"
> "A 16 bit value of fffe (in hexadecimal) is inserted into the middle of the 48-bit Ethernet MAC address of the client."
> "The 7th bit of the client MAC address is reversed from binary 0 to 1."

### 3.16 隨機生成的 Interface ID（Randomly Generated Interface IDs）

繁中解說：視乎作業系統，設備可能用**隨機生成嘅 Interface ID**而唔用 EUI-64（Windows 現在就傾向隨機生成）。以下係 `ipconfig` 實例：

```
C:\> ipconfig
Windows IP Configuration
Ethernet adapter Local Area Connection:
   IPv6 Address. . . . . . . . . . . : 2001:db8:acad:1:50a5:8a35:a5bb:66e1
   Link-local IPv6 Address . . . . . : fe80::50a5:8a35:a5bb:66e1
   Default Gateway . . . . . . . . . : fe80::1
```

**觀察重點**：GUA 同 LLA 嘅 **Interface ID 部分相同**（`50a5:8a35:a5bb:66e1`）；**Default Gateway 係 Router 嘅 LLA（`fe80::1`）**，唔係 GUA。

> "Depending upon the operating system, a randomly generated interface ID instead of one created with EUI-64."

### 3.17 動態 LLA（Dynamic LLAs）

繁中解說：**所有 IPv6 介面都必須有 LLA**。同 GUA 一樣，LLA 可以動態建立：用 **`fe80::/10` prefix** ＋ **EUI-64 產生嘅 Interface ID**，或者**隨機生成嘅 64-bit 數字**。Windows 等作業系統通常**GUA 同 LLA 用同一種方法**（一齊用 EUI-64，或者一齊用隨機）。

EUI-64 產生嘅例子（Windows `ipconfig`）：

```
   IPv6 Address. . . . . . . . . . . : 2001:db8:acad:1:fc99:47ff:fe75:cee0
   Link-local IPv6 Address . . . . . : fe80::fc99:47ff:fe75:cee0
   Default Gateway . . . . . . . . . : fe80::1
```

**點分辨？** 見到 Interface ID 中間有 `ff:fe`（例如 `47ff:fe75`）→ 幾乎可以肯定是 **EUI-64**；見到完全隨機嘅 `50a5:8a35:a5bb:66e1`（冇 `ff:fe` 樣式）→ **隨機生成**。

> "All IPv6 interfaces must have an IPv6 LLA."
> "Like IPv6 GUAs, LLAs can be configured dynamically by using the fe80::/10 prefix and the interface ID using the EUI-64 process, or a randomly generated 64-bit number."

### 3.18 Multicast 位址（IPv6 Multicast Addresses）

繁中解說：IPv6 multicast 位址前綴係 **`FF00::/8`**，有兩大類：

1. **Well-Known multicast addresses（知名群組）**
   - **`ff02::1`** = All-nodes multicast group（所有 IPv6 節點；作用類似 IPv4 嘅 broadcast）
   - **`ff02::2`** = All-routers multicast group（所有 Router）
2. **Solicited-node multicast address**（由單播位址推導，用於 **ND／DAD**）
   - **好處**：Ethernet NIC 可以**只靠檢查目的 MAC 位址就過濾掉唔關自己事嘅 frame**，唔需要交上去 IPv6 程序逐個檢查 —— 減少每部機嘅處理負擔

⚠️ **Multicast 位址只可以係目的位址（destination），唔可以係來源位址（source）**。

> "IPv6 multicast addresses have the prefix ff00::/8."
> "ff02::1 All-nodes multicast group; ff02::2 All-routers multicast group."
> "The Ethernet NIC can filter the frame by examining the destination MAC address without sending it to the IPv6 process."
> "Note: Multicast addresses can only be destination addresses and not source addresses."

### 3.19 Subnetting IPv6 網絡（Subnet an IPv6 Network）

繁中解說：IPv6 設計時已經考慮咗 subnetting —— 唔需要「借 host bits」，而係 GUA 本身有一個獨立嘅 **Subnet ID 欄位**。Subnet ID 就係**Global Routing Prefix 同 Interface ID 之間**嗰段。

**例題（講義原例）**：Global Routing Prefix `2001:db8:acad::/48`，Subnet ID 用 **16 bits**：

```
2001:db8:acad : XXXX : 0000:0000:0000:0000 /64
└─ 48 bits ─┘  └16b┘  └────── 64 bits ──────┘
   Global       Subnet       Interface ID
   Routing      ID
   Prefix
```

- 可產生 **2¹⁶ = 65,536 個 `/64` subnet**
- **所有 subnet 共用同一個 Global Routing Prefix**（唔同嘅只有 Subnet ID）

> "IPv6 was designed with subnetting in mind. A separate subnet ID field in the IPv6 GUA is used to create subnets."
> "Given the 2001:db8:acad::/48 global routing prefix with a 16 bit subnet ID — allows 65,536 /64 subnets."
> "The global routing prefix is the same for all subnets."

### 3.20 必背換算與判斷速查

| 問題 | 解法 |
|---|---|
| 「`::` 代表幾個 hextet 嘅零？」 | `8 − 非零 hextet 數 = 零段數` |
| 「`::` 代表幾多個 binary 0？」 | 零段數 × 16 |
| 「`::` 代表幾多個十六進位 0？」 | 零段數 × 4 |
| 「一個 hextet 有幾多 bits？」 | 16 bits（= 4 個十六進位數字） |
| 「IPv6 位址總長？」 | 128 bits = 8 hextets |
| 「`/48` + 16-bit Subnet ID 有幾多個 `/64`？」 | 2¹⁶ = 65,536 |
| 「邊個類別冇得做 source？」 | **Multicast**（只可以做 destination） |
| 「邊個位址唔可以配喺介面？」 | **Loopback `::1/128`**、**Unspecified `::/128`** |

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞 / 語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| IPv6 | 新一代互聯網協定，128-bit 位址 | IPv6 is a 128-bit addressing system with a much larger address space than IPv4. |
| Address exhaustion | IPv4 位址耗盡 | IPv4 is running out of addresses, which is the main reason IPv6 was developed. |
| Hextet | 16-bit 一組（4 個十六進位數字） | A segment of 16 bits, or four hexadecimal values, is called a hextet. |
| Preferred format | 完整 8 段寫法 | An IPv6 address in preferred format has eight hextets separated by colons. |
| Omit leading zeros | 省略前導零（規則一） | The first rule to reduce notation is to omit any leading zeros in each hextet. |
| Double colon (`::`) | 雙冒號壓縮（規則二） | A double colon can replace one contiguous string of all-zero hextets, and it can only be used once in an address. |
| Unicast | 一對一（唯一介面） | A unicast address uniquely identifies an interface on an IPv6-enabled device. |
| Multicast | 一對多 | Multicast is used to send a single IPv6 packet to multiple destinations. |
| Anycast | 一對最近 | A packet sent to an anycast address is routed to the nearest device that has that address. |
| Broadcast | IPv4 概念，IPv6 已取消 | Unlike IPv4, IPv6 does not have a broadcast address. |
| Prefix length | 表示網絡部分的長度（0–128） | Prefix length indicates the network portion of an IPv6 address; the typical value is /64. |
| GUA (Global Unicast Address) | 全球唯一、可在 Internet 路由（`2000::/3`） | A GUA is globally unique, Internet routable, and starts with 2000::/3. |
| LLA (Link-Local Address) | `FE80::/10`，每介面必須有，不可路由 | An LLA is required on every IPv6 interface and cannot be routed beyond the local link. |
| ULA (Unique Local Address) | `FC00::/7`，類似 IPv4 private address | Unique local addresses are similar to RFC 1918 private addresses and are not globally routed. |
| Loopback `::1/128` | 測試本機 TCP/IP | The loopback address ::1/128 is used to test the TCP/IP configuration on the local host. |
| Unspecified `::/128` | 只可作來源位址 | The unspecified address ::/128 can only be used as a source address. |
| IPv4-embedded | 協助過渡（例如 `::192.168.10.10`） | IPv4-embedded IPv6 addresses are used to help transition from IPv4 to IPv6. |
| Global Routing Prefix | 由 ISP 派發嘅網絡前綴 | The global routing prefix is assigned by the provider, such as an ISP, to a customer or site. |
| Subnet ID | 機構內部分 subnet 嘅欄位 | The subnet ID is used by an organization to identify subnets within its site. |
| Interface ID | 等同 IPv4 host portion | The interface ID is equivalent to the host portion of an IPv4 address. |
| Subnet-Router anycast | 全 0 主機位址，只配 Router | The all-0s address is reserved as a subnet-router anycast address and should be assigned only to routers. |
| Dual stack | 同時行 IPv4 與 IPv6 | Dual stack means running both IPv4 and IPv6 protocol stacks simultaneously. |
| Tunneling | IPv6 封包封裝入 IPv4 | Tunneling encapsulates the IPv6 packet inside an IPv4 packet. |
| NAT64 / Translation | IPv6 與 IPv4 互相通訊 | NAT64 allows IPv6-enabled devices to communicate with IPv4-enabled devices. |
| RS (Router Solicitation) | Host 發，搵 Router | Router Solicitation messages are sent by host devices to discover IPv6 routers. |
| RA (Router Advertisement) | Router 發，講點取得 GUA | Router Advertisement messages are sent by routers to inform hosts how to obtain an IPv6 GUA. |
| SLAAC | 唔靠 DHCPv6 自己配 GUA | SLAAC allows a device to configure a GUA without the services of DHCPv6. |
| Stateless DHCPv6 | 用 SLAAC 配位址，DHCPv6 補其他資料 | With stateless DHCPv6, the device uses SLAAC for the address and DHCPv6 for other information such as DNS. |
| Stateful DHCPv6 | 由 DHCPv6 派 GUA | With stateful DHCPv6, the device obtains its GUA, prefix length, and DNS addresses from the DHCPv6 server. |
| EUI-64 | 由 MAC 造 Interface ID | EUI-64 inserts fffe into the middle of the MAC address and reverses the 7th bit. |
| Randomly generated Interface ID | OS 隨機生成 64-bit | Depending on the operating system, a randomly generated interface ID may be used instead of EUI-64. |
| `ff02::1` / `ff02::2` | All-nodes / All-routers multicast | ff02::1 is the all-nodes multicast group and ff02::2 is the all-routers multicast group. |
| Solicited-node multicast | 用於 ND／DAD，NIC 可過濾 | Solicited-node multicast lets the NIC filter frames by examining the destination MAC address. |
| `ipv6 address .../prefix` | 設定 GUA 指令 | Use the command ipv6 address ipv6-address/prefix-length to configure a static GUA. |
| `ipv6 address fe80::1:1 link-local` | 設定靜態 LLA 指令 | Use the link-local keyword with the ipv6 address command to configure a static LLA. |
| `ipconfig` | Windows 檢視位址 | Use ipconfig on a Windows host to verify the IPv6 GUA, LLA, and default gateway. |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

1. **先理解概念**：IPv4 為何耗盡 → IPv6 嘅 128-bit 空間、三種共存方法（Dual Stack／Tunneling／NAT64）
2. **再練表示法（必考基本功）**：preferred format（8 hextets）→ 規則一（省略前導零）→ 規則二（`::`，只可一次）→ **由壓縮展開返完整格式**（計零段數 ×16 bits）
3. **背位址類型與前綴**（要背到反射式）：`2000::/3`（GUA）、`FE80::/10`（LLA）、`FC00::/7`（ULA）、`::1/128`（Loopback）、`::/128`（Unspecified）、`FF00::/8`（Multicast）、`ff02::1`／`ff02::2`
4. **掌握 GUA 結構**：Global Routing Prefix ＋ Subnet ID ＋ Interface ID（`/64` 嘅理由）；全 0 位址只配 Router；GUA 開頭係 2 或 3
5. **練 CLI 與設定**：`ipv6 address 2001:db8:acad:1::1/64`、`ipv6 address fe80::1:1 link-local`、`no shutdown`、`ipv6 unicast-routing`；Windows 用 `ipconfig` 睇 GUA／LLA／Default Gateway
6. **掌握動態取得三種方法**：SLAAC（prefix 由 RA 嚟、Interface ID 自己造）／SLAAC + stateless DHCPv6（位址自己造、其他資料問 DHCPv6）／Stateful DHCPv6（位址都由 DHCPv6 派，Gateway 仍用 Router LLA）
7. **練 EUI-64 計算**：插入 `fffe` 喺中間 → 反轉第 7 個 bit → 加上 `fe80::` 造 LLA（例：`00:1A:2B:3C:4D:5E` → `021A:2BFF:FE3C:4D5E` → `fe80::21a:2bff:fe3c:4d5e`）
8. **最後練 subnet 計算**：Subnet ID 位置（Global Routing Prefix 與 Interface ID 之間）；`/48` + 16-bit Subnet ID = **65,536 個 `/64`**
9. **驗收**：➜ 去做 `ITE3102_T8_IPv6Addressing_StudyGuide.md` 嘅練習題（換算、類型配對、EUI-64、合法性判斷），全部能夠唔睇答案完成，就代表本課過關

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**關鍵數字（背到反射式）**

- IPv6 = **128 bits** = **8 個 hextet**；每個 hextet = **16 bits** = 4 個十六進位數字
- `::` **只可以用一次**；零段數 = 8 − 非零 hextet 數
- Prefix length 範圍 **0–128**，典型 **/64**
- GUA = **2000::/3**（開頭係 2 或 3，佔總空間 1/8）｜LLA = **FE80::/10**｜ULA = **FC00::/7**
- Loopback = **::1/128**｜Unspecified = **::/128**｜Multicast = **FF00::/8**
- **ff02::1** = All-nodes｜**ff02::2** = All-routers
- EUI-64：中間插 **fffe** ＋ 反轉**第 7 個 bit**
- `/48` GPR + **16-bit** Subnet ID = **65,536** 個 `/64` subnet

**對比表**

| 比較 | IPv4 | IPv6 |
|---|---|---|
| 位址長度 | 32 bits | **128 bits** |
| 寫法 | 十進位 + 點（dotted decimal） | 十六進位 + 冒號（hextet） |
| 遮罩 | Subnet mask（如 255.255.255.0） | **Prefix length**（如 /64），冇 mask |
| 廣播 | 有 Broadcast | **冇 broadcast**，用 multicast 取代 |
| 自動定址 | DHCP | **SLAAC**／DHCPv6（stateless / stateful） |
| 私用位址 | RFC 1918（10.x、172.16–31.x、192.168.x） | **ULA（FC00::/7）** |
| 每介面位址數 | 通常 1 個 | 通常 **2 個或以上**（GUA + LLA） |

**極速口訣**

- 「**八四十六一二八**」：8 組 × 4 個十六進位 × 16 bits = 128 bits
- 「**零前唔省尾**」：只可以省**前導**零（Rule 1）
- 「**雙冒號一次**」：`::` 一個位址只可用一次
- 「**F E 8 0 一定有**」：每個 IPv6 介面都必須有 LLA
- 「**F F F E 插中間、第七個 bit 反一反**」：EUI-64 兩步
- 「**GUA 靠 ISP、Subnet ID 靠自己、Interface ID 靠電腦**」：GUA 三部分與責任分工

**60 秒自測清單**

1. `2001:0db8:0000:00a3:abcd:0000:0000:1234` 嘅壓縮格式係？（答：`2001:db8:0:a3:abcd::1234`）
2. `2001:db8:cafe:1::1` 展開後有幾多個全零 hextet？（答：3 個 = 48 個 binary 0）
3. 點解 IPv6 冇 broadcast？（答：broadcast 功能已由 multicast 取代）
4. 帶住 LLA 做目的位址嘅封包可以過 Router 嗎？（答：唔可以，LLA 不可路由）
5. MAC `00:1A:2B:3C:4D:5E` 用 EUI-64 生出嘅 Interface ID？（答：`021a:2bff:fe3c:4d5e`）
6. Router 用 RA 講咗咩畀 host？（答：prefix 與 prefix length、default gateway、DNS 同 domain name）
7. `2001:db8:acad::/48` 配 16-bit Subnet ID 有幾多個 `/64`？（答：65,536）
8. 邊個位址只可以做 source 而唔可以配喺介面？（答：`::/128`，Unspecified）
