# ITE3102 Network Fundamentals — Tutorial 8: IPv6 Addressing 雙語練習題解 Guide

> 課程：ITE3102 Network Fundamentals
> 範圍：Tutorial 8 – IPv6 Addressing
> 用途：學生只讀本文件即可完成練習，並掌握 IPv6 考題的答題能力。

---

## 📝 練習概要 (Summary)

本練習集中於 **IPv6 Addressing（IPv6 定址）**，是 Network Fundamentals 中接續 IPv4 的重要課題。練習覆蓋三大部分：第一，IPv6 位址的表示法——包括把完整位址轉成 **Short Form（省略前導零）** 與 **Compressed Form（用 `::` 壓縮連續零段）**，以及把壓縮位址反向展開成全格式；第二，IPv6 位址分類——辨認 **Global Unicast、Link-Local、Loopback、Unique Local、Unspecified、IPv4 Embedded** 等 Unicast 位址類型，判斷一個字串是否為合法 IPv6 位址，並掌握 **SLAAC / Stateful DHCPv6** 兩種自動取得位址的方式；第三，過渡與計算題——理解 **Dual Stack、Tunneling、NAT64** 三種 IPv4 到 IPv6 的遷移技術，以及用 **EUI-64** 方法由 MAC Address 產生 Interface ID。

考核重點在於位址格式規則的「零」處理（Leading Zero 省略、`::` 只能出現一次）、128-bit 總長度概念（8 個 Hextet）、各地址類型的 **Prefix（前綴）** 記法（如 `2000::/3`、`FE80::/10`、`FC00::/7`、`::1/128`），以及二進位 / 十六進位轉換的準確性。這些都是考試常見的填空、判斷與配對題型。

> An IPv6 address is 128 bits long and is represented as eight groups of four hexadecimal digits (hextets), separated by colons.

---

## 🎯 練習目標 (Objectives)

完成本練習後，你應該能夠：

| # | 能力（繁體中文） | 英文對照 (English) |
|---|---|---|
| 1 | 把 IPv6 位址轉為省略前導零的短格式與 `::` 壓縮格式 | Convert IPv6 addresses into short (omit leading zeros) and compressed forms |
| 2 | 把壓縮位址展開為完整 32 個十六進位數字 | Expand a compressed address into its full 32-hex-digit form |
| 3 | 計算 `::` 所代表的零段數、十六進位零數與二進位零數 | Calculate how many segments/hexadecimal/binary zeros `::` represents |
| 4 | 把十六進位欄位轉為 16-bit 二進位 | Convert a hexadecimal field into 16 binary bits |
| 5 | 配對 IPv6 Unicast 位址類型與其格式、描述 | Match address formats and descriptions to IPv6 unicast address types |
| 6 | 判斷 IPv6 位址是否合法，並解釋無效原因 | Determine whether an IPv6 address is valid; explain why it is invalid |
| 7 | 分辨 Dual Stack、Tunneling 與 NAT64 遷移技術 | Distinguish Dual Stack, Tunneling and NAT64 migration techniques |
| 8 | 分辨 SLAAC、Stateless DHCPv6 與 Stateful DHCPv6 | Distinguish SLAAC, Stateless DHCPv6 and Stateful DHCPv6 |
| 9 | 用 EUI-64 方法由 MAC Address 產生 Interface ID | Create an Interface ID from a MAC address using the EUI-64 method |

---

## ✏️ 題目與答案 Walkthrough

### Q1. Convert the IPv6 addresses into short (omit the leading zeroes) and compressed forms.

> Convert the IPv6 addresses into short (omit the leading zeroes) and compressed forms.

**Answer（答案）：**

| # | 原地址 (Original) | Short Form（省略前導零） | Compressed Form（`::` 壓縮） |
|---|---|---|---|
| 1 | `AB1E:2B00:1234:5678:0000:9101:1112:1113` | `AB1E:2B00:1234:5678:0:9101:1112:1113` | `AB1E:2B00:1234:5678::9101:1112:1113` |
| 2 | `AB1E:2B00:0000:0000:1234:5678:9101:1113` | `AB1E:2B00:0:0:1234:5678:9101:1113` | `AB1E:2B00::1234:5678:9101:1113` |
| 3 | `FE80:0000:0000:0000:DD63:0395:7A9A:9773` | `FE80:0:0:0:DD63:395:7A9A:9773` | `FE80::DD63:395:7A9A:9773` |
| 4 | `2001:0000:0000:0000:0DB8:1111:0000:0200` | `2001:0:0:0:DB8:1111:0:200` | `2001::DB8:1111:0:200` |
| 5 | `0000:0000:0000:0000:0000:0000:0000:0001` | `0:0:0:0:0:0:0:1` | `::1` |

**解題邏輯（繁體中文）：**

1. **第一步（Short Form）**：對每個 Hextet（4 個十六進位數字為一組），刪去**開頭（前導）的零**，但每組至少要保留一個數字。例如 `0000` 變成 `0`、`0395` 變成 `395`、`0DB8` 變成 `DB8`、`0200` 變成 `200`。注意 `2B00` 的零在**尾部**，不能刪（只刪前導零）。
2. **第二步（Compressed Form）**：在 Short Form 的基礎上，把**最長的一段連續全零 Hextet** 用雙冒號 `::` 取代，而且 `::` **只能使用一次**。第 1 題只有一個 `0000`，壓縮成 `::`；第 2 題有連續兩個 `0000:0000`，壓縮成 `::`；第 3、4 題有連續三個零段，也壓縮成一個 `::`；第 5 題有七個零段，壓縮成 `::`，所以 `::1` 就是 Loopback 位址。
3. **小心陷阱**：第 4 題 `2001:0:0:0:DB8:1111:0:200` 中，後面的 `0` 與前面的三個 `0` 不相連，所以壓縮時只取最長的一段（三個零段）變成 `2001::DB8:1111:0:200`，最後那個 `0:200` 要原樣保留。

> Short form: leading zeros in each hextet are omitted, but at least one digit must remain in every group.
> Compressed form: the longest run of consecutive all-zero hextets may be replaced by `::`, which can be used only once in an address.

**Exam Answer Phrase：**
- "Leading zeros are omitted in each group, e.g. `0000` becomes `0` and `0DB8` becomes `DB8`."
- "The longest run of consecutive zero groups is replaced by a single `::`, which may appear only once."

---

### Q2. Consider an IPv6 address in hexadecimal `20AB:1234::11:12`.

> (i) Write out the address in full hexadecimal (32 hexadecimal numbers).
> (ii) How many segments of zeros are represented by the double colon (::) in this address? Thus, how many hexadecimal zeros are represented, how many binary zeros are represented?
> (iii) Write down the 16 binary bits represented by the first field value 20AB.
> (iv) Write down the 16 binary bits represented by the last field value 12.

**Answer（答案）：**

- (i) Full form：`20AB:1234:0000:0000:0000:0000:0011:0012`
- (ii) `::` 代表 **4 段零**（4 segments of zeros）；即 **16 個十六進位零**（16 hexadecimal zeros）；即 **64 個二進位零**（64 binary zeros）
- (iii) `20AB` 的 16-bit 二進位：`0010 0000 1010 1011`
- (iv) `12` 的 16-bit 二進位（以 4 個十六進位數字 `0012` 表示）：`0000 0000 0001 0010`

**解題邏輯（繁體中文）：**

1. **(i) 展開全格式**：IPv6 一定有 8 個 Hextet。原式寫了 4 個 Hextet（`20AB`、`1234`、`11`、`12`），所以 `::` 要補足 8 − 4 = 4 個全零 Hextet，插在 `1234` 與 `11` 之間。另外每個 Hextet 要補足 4 個十六進位數字：`11` → `0011`、`12` → `0012`。
2. **(ii) 數零**：4 段零 × 每段 4 個十六進位數字 = 16 個十六進位零；每個十六進位數字 = 4 bits，16 × 4 = 64 個二進位零。這題考的其實是 **128-bit = 8 × 16-bit** 的結構概念。
3. **(iii)(iv) 十六進位轉二進位**：每個十六進位數字對應 4 個二進位位元：`2=0010, 0=0000, A=1010, B=1011`，拼起來就是 `0010 0000 1010 1011`。而 `12` 先當成 4 位數字 `0012`：`0=0000, 0=0000, 1=0001, 2=0010`，得 `0000 0000 0001 0010`。

> An IPv6 address consists of eight 16-bit groups, so the double colon must stand for exactly enough zero groups to make eight groups in total.
> Each hexadecimal digit represents exactly four binary bits.

**Exam Answer Phrase：**
- "The `::` represents four zero segments, i.e. 16 hexadecimal zeros and 64 binary zeros."
- "Each hexadecimal digit maps to four binary bits: `20AB` = `0010 0000 1010 1011`."

---

### Q3. Match the address format on the left and the description on the right to the correct IPv6 unicast address type at the middle.

> Match the address format on the left and the description on the right to the correct IPv6 unicast address type at the middle.

**Answer（答案）：**

| Address Format | Address Type | Description |
|---|---|---|
| `2000::/3` | **Global unicast** | Globally unique |
| `FE80::/10` | **Link-Local** | Communicates with other devices on the same local link |
| `::1/128` | **Loopback** | Sends a packet to itself |
| `FC00::/7 – FDFF::/7` | **Unique Local** | For local addressing within a site or between a limited number of sites |
| `::/128` | **Unspecified** | Only used as a source |
| `::192.168.10.10` | **IPv4 embedded** | Used to help transition from IPv4 to IPv6 |

**解題邏輯（繁體中文）：**

這題是標準的「格式 → 類型 → 描述」三段配對，關鍵是背熟各類型的 **Prefix（前綴）** 與用途：

1. **Global unicast**：前綴 `2000::/3`，即 2000:: 至 3FFF::，全球唯一、可經 Internet 路由。
2. **Link-Local**：前綴 `FE80::/10`（即 `FE80::` 至 `FEBF::`），只在本機同一條 Local Link 內通訊，路由器不會轉發，常用於 Neighbor Discovery 與自動設定。
3. **Loopback**：`::1/128`，等同 IPv4 的 127.0.0.1，把封包送回自己。
4. **Unique Local（ULA）**：前綴 `FC00::/7` 至 `FDFF::/7`，等同 IPv4 的 Private Address（如 192.168.x.x），在站點內或有限站點間使用，不會在 Internet 上路由。
5. **Unspecified**：`::/128`，全零位址，只在設備尚未取得位址時作為**來源位址**使用（例如 SLAAC 初期的 Duplicate Address Detection），永遠不能作為目的位址。
6. **IPv4 embedded**：如 `::192.168.10.10`，把 IPv4 位址嵌入 IPv6 尾部，用於 IPv4→IPv6 過渡（如 NAT64、IPv4-mapped address）。

> Global unicast addresses use the prefix `2000::/3` and are globally unique.
> Link-local addresses use the prefix `FE80::/10` and are only used to communicate with other devices on the same local link.
> The loopback address `::1/128` sends a packet to itself, and the unspecified address `::/128` is only used as a source address.

**Exam Answer Phrase：**
- "`FE80::/10` is the link-local prefix, used only for communication on the same local link."
- "`FC00::/7` to `FDFF::/7` identifies unique local addresses, which are not routable on the Internet."
- "`::/128` is the unspecified address and can only be used as a source address."

---

### Q4. Determine whether each of the following is a valid IPv6 address or not. If it is invalid, explain briefly.

> (a) `::11:ab`  Valid / Invalid, reason: ______
> (b) `2009::db8:1::57ab:7344`  Valid / Invalid, reason: ______
> (c) `a:b:c:d:e:f:12:34:56`  Valid / Invalid, reason: ______
> (d) `fe80:0:0:0:0:0:0:1`  Valid / Invalid, reason: ______

**Answer（答案）：**

- (a) **Valid** — `::11:ab` 即 `0000:0000:0000:0000:0000:0000:0011:00ab`，合法。
- (b) **Invalid** — 出現超過一個 `::`（more than one `::`）。
- (c) **Invalid** — 有 9 個 Hextet，不是 128 bits（not 128 bits；9 hextets）。
- (d) **Valid** — 完整的 8 個 Hextet，即 `fe80::1` 的全格式，合法。

**解題邏輯（繁體中文）：**

判斷 IPv6 位址合法性，用「三條規則」逐項檢查：

1. **`::` 只能出現一次**：`(b)` 有 `2009::...` 和 `...::57ab:7344` 兩個 `::`，無法唯一決定補零位置，所以無效。
2. **總共必須剛好 8 個 Hextet（128 bits）**：`(c)` 有 `a,b,c,d,e,f,12,34,56` 共 9 組，超過 8 組，不是 128 bits，無效。
3. **每個 Hextet 是 1–4 個十六進位數字，只可用 0–9、A–F**：`(a)` 的 `11` 與 `ab` 都合法，`::` 出現一次且補足後為 8 組，所以 Valid；`(d)` 雖然沒壓縮，但 8 組齊全、字元合法，所以 Valid（`fe80:0:0:0:0:0:0:1` 是 link-local 位址 `fe80::1` 的完整寫法）。

> An IPv6 address is valid only if it contains exactly eight hextets (128 bits), uses only hexadecimal digits, and uses the `::` notation at most once.

**Exam Answer Phrase：**
- "The address is invalid because it contains more than one `::`."
- "The address is invalid because it has 9 hextets, which is not 128 bits."

---

### Q5. Match the migration technique on the left to the appropriate description on the right.

> Match the migration technique on the left to the appropriate description on the right.

| Migration Technique | Description |
|---|---|
| **Dual Stack** | IPv4 and IPv6 on the same network |
| **Tunneling** | The IPv6 packet is encapsulated inside an IPv4 packet |
| **NAT64** | Allows IPv6-enabled devices to communicate with IPv4 devices |

**解題邏輯（繁體中文）：**

這是 IPv4 → IPv6 過渡（Transition / Migration）三大技術的配對：

1. **Dual Stack（雙棧）**：同一網絡／同一設備同時運行 IPv4 與 IPv6 兩套 Protocol Stack，最簡單直接，「同一網絡上同時有 IPv4 和 IPv6」。
2. **Tunneling（隧道）**：當 IPv6 封包要穿越只支援 IPv4 的網絡時，把 **IPv6 封包封裝（encapsulate）進 IPv4 封包**內傳送，例如 6to4、Teredo。
3. **NAT64（Network Address Translation）**：把 IPv6 與 IPv4 位址互相翻譯，讓 **IPv6 設備能與 IPv4 設備通訊**（配合 DNS64 使用，對應 Q3 的 IPv4 embedded 位址）。

> Dual stack runs IPv4 and IPv6 on the same network; tunneling encapsulates IPv6 packets inside IPv4 packets; NAT64 allows IPv6-enabled devices to communicate with IPv4 devices.

**Exam Answer Phrase：**
- "Tunneling encapsulates the IPv6 packet inside an IPv4 packet."
- "Dual stack runs IPv4 and IPv6 protocols on the same network at the same time."
- "NAT64 translates addresses so that IPv6-enabled devices can communicate with IPv4 devices."

---

### Q6. A device can obtain an IPv6 global unicast address automatically using Stateless Address Autoconfiguration (SLAAC) or Stateful DHCPv6.

> (a) Match the Router Advertisement Option to its appropriate description on the right.

| Router Advertisement Option | Description |
|---|---|
| **SLAAC only** | Uses the local router's ICMPv6 RA message to assign IPv6 global unicast address |
| **SLAAC and Stateless DHCPv6** | SLAAC to obtain IPv6 global unicast address, and allows a client to contact a DHCPv6 server to obtain additional information |
| **Stateful DHCPv6** | A client can automatically receive addressing information from a DHCPv6 server |

> (b) Which protocol supports SLAAC for dynamic assignment of IPv6 address to a host? ______

**Answer（答案）：**

- (a) 見上表配對。
- (b) **ICMPv6**（Internet Control Message Protocol version 6）

**解題邏輯（繁體中文）：**

IPv6 自動取得 Global Unicast Address 有兩種方式，考試常考它們的分工：

1. **SLAAC only（無狀態自動設定）**：路由器定期或回應要求廣播 **Router Advertisement（RA，ICMPv6 訊息）**，主機從 RA 取得 Prefix，再自行以 EUI-64 或隨機方式產生 Interface ID 組合出位址——「靠本地路由器的 ICMPv6 RA 訊息指派位址」，所以 (b) 支援 SLAAC 的協議就是 **ICMPv6**。
2. **SLAAC and Stateless DHCPv6**：位址仍由 SLAAC 產生，但主機另外向 DHCPv6 Server 查詢 **額外資訊**（如 DNS Server、Domain Name），DHCPv6 不派發位址，所以叫 Stateless（無狀態）。
3. **Stateful DHCPv6**：DHCPv6 Server **完整管理位址租賃**，主機的所有定址資訊（包括位址本身）都由 DHCPv6 Server 自動派發，等同 IPv4 的 DHCP。

> SLAAC uses ICMPv6 Router Advertisement messages to assign IPv6 global unicast addresses; stateful DHCPv6 provides all addressing information from a DHCPv6 server.

**Exam Answer Phrase：**
- "SLAAC uses the local router's ICMPv6 Router Advertisement message to assign the IPv6 global unicast address."
- "In stateful DHCPv6, a client automatically receives its addressing information from a DHCPv6 server."
- "ICMPv6 is the protocol that supports SLAAC."

---

### Q7. Consider an Ethernet address `E4-11-5B-3D-BE-0F`, create an interface ID by EUI-64 method.

> (a) Convert the address into 48-bit binary.
> (b) Insert the binary equivalent of hex value FFFE into the middle.
> (c) Change the 7th bit of the MAC address from 0 to 1.
> (d) Obtain the EUI-64 ID in hexadecimal notation.

**Answer（答案）：**

- (a) 48-bit binary：`1110 0100 – 0001 0001 – 0101 1011 – 0011 1101 – 1011 1110 – 0000 1111`
- (b) 插入 FFFE：`1110 0100 – 0001 0001 – 0101 1011 – 1111 1111 – 1111 1110 – 0011 1101 – 1011 1110 – 0000 1111`
- (c) 改第 7 bit：`1110 0110 – 0001 0001 – 0101 1011 – 1111 1111 – 1111 1110 – 0011 1101 – 1011 1110 – 0000 1111`
- (d) EUI-64 ID（hex）：`E6-11-5B-FF-FE-3D-BE-0F`

**解題邏輯（繁體中文）：**

EUI-64 是從 48-bit MAC Address 產生 64-bit Interface ID 的標準三步驟，考試必考計算：

1. **(a) MAC → 48-bit binary**：每個十六進位數字轉 4 bits：`E=1110, 4=0100, 1=0001, 1=0001, 5=0101, B=1011, 3=0011, D=1101, B=1011, E=1110, 0=0000, F=1111`。
2. **(b) 中間插入 FFFE**：把 48 bits 切成前 24 bits（OUI，前 3 個 octet）與後 24 bits，在中間插入 `FFFE`（`1111 1111 1111 1110`），變成 64 bits。
3. **(c) 改第 7 bit（U/L bit）**：把 **MAC 第一個 octet 的第 7 個 bit（由左數起，即 U/L bit，Universal/Local bit）由 0 改為 1**。`E4 = 1110 0100`，第 7 bit 是 `0`，改為 1 後變成 `1110 0110 = E6`。這是表示該 Interface ID 是「locally administered（本地產生）」而非全球唯一（universal）。
4. **(d) 轉回 hex**：`1110 0110 = E6`，其餘照抄，最後得 `E6-11-5B-FF-FE-3D-BE-0F`。

> The EUI-64 method inserts `FFFE` in the middle of the 48-bit MAC address and flips the 7th bit (the U/L bit) of the first octet to form a 64-bit interface ID.

**Exam Answer Phrase：**
- "Insert `FFFE` into the middle of the 48-bit MAC address, then flip the 7th bit of the first octet from 0 to 1."
- "The resulting EUI-64 interface ID is `E6-11-5B-FF-FE-3D-BE-0F`."

---

## 📖 必考英文術語與答題句型庫

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| IPv6 Address | 128-bit 位址，以 8 組 4 個十六進位數字（Hextet）以冒號分隔表示 | "An IPv6 address is 128 bits long, represented as eight groups of four hexadecimal digits separated by colons." |
| Hextet | 一組 4 個十六進位數字，共 16 bits；一個 IPv6 位址有 8 個 Hextet | "Each hextet is 16 bits and an IPv6 address has eight hextets." |
| Short Form | 省略每個 Hextet 的前導零（Leading Zeros），但每組至少保留一個數字 | "Leading zeros in each hextet are omitted, but at least one digit must remain." |
| Compressed Form / `::` | 用雙冒號 `::` 取代最長連續全零段，且只能使用一次 | "The longest run of consecutive zero hextets is replaced by `::`, which can only be used once." |
| Prefix Length (`/N`) | 位址前綴長度，表示 Network Portion 佔多少 bits | "The prefix length `/64` indicates the first 64 bits identify the network." |
| Global Unicast Address | `2000::/3`，全球唯一、可於 Internet 路由 | "Global unicast addresses use the prefix `2000::/3` and are globally unique." |
| Link-Local Address | `FE80::/10`，只在同一 Local Link 內通訊，路由器不轉發 | "Link-local addresses use `FE80::/10` and communicate only on the same local link." |
| Loopback Address | `::1/128`，把封包送回自己 | "The loopback address `::1/128` sends a packet to itself." |
| Unspecified Address | `::/128`，全零，只可作為來源位址 | "The unspecified address `::/128` is only used as a source address." |
| Unique Local Address (ULA) | `FC00::/7 – FDFF::/7`，站點內私有定址，等同 IPv4 Private Address | "Unique local addresses use `FC00::/7` and are for local addressing within a site." |
| IPv4 Embedded Address | 把 IPv4 位址嵌入 IPv6（如 `::192.168.10.10`），用於過渡 | "An IPv4 embedded address embeds the IPv4 address in the IPv6 address for transition." |
| EUI-64 | 由 48-bit MAC 產生 64-bit Interface ID 的方法：插 FFFE + 反轉第 7 bit | "EUI-64 inserts `FFFE` in the middle of the MAC address and flips the 7th bit." |
| SLAAC (Stateless Address Autoconfiguration) | 利用 ICMPv6 Router Advertisement 自動設定 Global Unicast Address | "SLAAC uses the router's ICMPv6 RA message to assign the IPv6 global unicast address." |
| ICMPv6 | 支援 SLAAC 與鄰居探索的協議 | "ICMPv6 is the protocol that supports SLAAC." |
| Stateful DHCPv6 | DHCPv6 Server 管理並派發所有定址資訊 | "In stateful DHCPv6, a client receives all addressing information from a DHCPv6 server." |
| Stateless DHCPv6 | DHCPv6 只提供額外資訊（如 DNS），位址由 SLAAC 產生 | "In stateless DHCPv6, SLAAC provides the address and DHCPv6 provides additional information." |
| Dual Stack | 同一網絡同時執行 IPv4 與 IPv6 | "Dual stack runs IPv4 and IPv6 on the same network." |
| Tunneling | 把 IPv6 封包封裝進 IPv4 封包穿越 IPv4 網絡 | "Tunneling encapsulates the IPv6 packet inside an IPv4 packet." |
| NAT64 | 翻譯位址，令 IPv6 設備可與 IPv4 設備通訊 | "NAT64 allows IPv6-enabled devices to communicate with IPv4 devices." |
| U/L Bit (7th bit) | MAC 第一個 octet 的第 7 bit；1 = locally administered，0 = universally unique | "The 7th bit (U/L bit) of the first octet is flipped to 1 to indicate a locally administered identifier." |

---

## 🗺️ 學習路線 (Learning Path)

建議按以下四階段學習，由理解到應考：

1. **先理解（Understand）**
   - 明白 IPv6 位址 = 128 bits = 8 個 Hextet = 32 個十六進位數字。
   - 理解 `::` 壓縮的意義與「只能一次」的原因（避免歧義）。
   - 理解 SLAAC 靠 ICMPv6 RA、DHCPv6 有 Stateful / Stateless 的分別。

2. **背誦（Memorize）**
   - 背熟位址類型 Prefix：`2000::/3`、`FE80::/10`、`FC00::/7`、`::1/128`、`::/128`。
   - 背熟三大遷移技術與三大 RA Options 的一句描述。
   - 背熟 EUI-64 三步驟口訣：**插 FFFE、反第 7 bit**。

3. **掌握計算 / 判斷（Calculate & Judge）**
   - 反覆練習：完整位址 ↔ Short ↔ Compressed 雙向轉換。
   - 練習 Hex → Binary 逐字轉換（每個 hex 字 = 4 bits）。
   - 用三條規則快速判斷位址合法性：`::` 最多一次、總共 8 組、字元只限 0–9 A–F。

4. **能解答考題（Solve Exam Questions）**
   - 重做本 Tutorial 全部題目，計時並寫出完整英文答句。
   - 嘗試自擬位址做轉換與合法性判斷，然後與答案核對。
   - 考試答題時：先寫結論（Valid / Invalid），再寫規則理由，最後引用標準句型。

---

## 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 關鍵數字（Key Numbers）

| 項目 | 數值 |
|---|---|
| IPv6 總長度 | 128 bits |
| Hextet 數目 | 8 組 × 16 bits |
| 十六進位數字總數 | 32 個 |
| 每個 hex 字 | 4 bits |
| MAC Address | 48 bits（6 octets） |
| EUI-64 Interface ID | 64 bits |

### 位址類型速查表（Address Types at a Glance）

| 類型 | Prefix | 一句用途（英文） |
|---|---|---|
| Global Unicast | `2000::/3` | Globally unique, routable on the Internet |
| Link-Local | `FE80::/10` | Same local link only |
| Loopback | `::1/128` | Sends packet to itself |
| Unspecified | `::/128` | Source only |
| Unique Local | `FC00::/7` – `FDFF::/7` | Private, within a site |
| IPv4 Embedded | e.g. `::192.168.10.10` | IPv4→IPv6 transition |

### 遷移技術 vs RA Options 速查

| 遷移技術 | 關鍵句 |
|---|---|
| Dual Stack | IPv4 and IPv6 on the same network |
| Tunneling | IPv6 packet encapsulated inside an IPv4 packet |
| NAT64 | IPv6 devices communicate with IPv4 devices |

| RA Option | 關鍵句 |
|---|---|
| SLAAC only | Router's ICMPv6 RA assigns the address |
| SLAAC + Stateless DHCPv6 | SLAAC gives address; DHCPv6 gives extra info |
| Stateful DHCPv6 | DHCPv6 server provides all addressing info |

### 英文記憶口訣（Memory Mnemonics）

- **壓縮規則**：*"Zeros lead, zeros drop; longest zero run gets the `::` — once!"*（前導零刪去；最長零段換 `::`，只能用一次。）
- **EUI-64**：*"Split, FFFE in the middle, flip bit 7."*（切半 → 中間插 FFFE → 反轉第 7 bit。）
- **合法性三查**：*"One `::`, eight groups, hex only."*（一個 `::`、八組、只限十六進位。）
- **Link-Local 記法**：*"FE80 = local, never leaves the link."*
- **SLAAC 靠誰**：*"SLAAC listens to the router's ICMPv6 RA."*

### 最後檢查（Final Checklist）

- [ ] 每個 Hextet 的 Short Form 保留至少一個數字？
- [ ] `::` 只用了一次、且代表最長零段？
- [ ] 展開後剛好 8 組（128 bits）？
- [ ] Hex → Binary 每個字對 4 bits 無漏無錯？
- [ ] 答案附上英文標準句型？
