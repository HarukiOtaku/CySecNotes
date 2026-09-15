# ITE3102 Network Fundamentals — Final Cheat Sheet（考前極速總複習）

> **覆蓋範圍**：Lecture 0 Number Systems（Module 5）＋ Lecture 1 Networking Today（Module 1）＋ Lecture 8 IPv6 Addressing（Module 12）
> **使用時機**：考試前 5–10 分鐘快速掃描；只保留「關鍵數字、對比表、英文口訣」。
> 詳細解說請回查：`02_Study_Guides/` 內對應各課的 Study Guide。

---

## Part 1 — Lecture 0: Number Systems（數字系統）

### 1.1 三進制速記

| 進制 | Radix | 數字 | 網絡用途 |
|---|---|---|---|
| Decimal | 10 | 0–9 | IPv4 的 dotted decimal |
| Binary | 2 | 0、1 | 電腦／路由器內部語言 |
| Hexadecimal | 16 | 0–9, A–F | IPv6、MAC 位址 |

### 1.2 必背數字

- Binary 位置值表：**128 64 32 16 8 4 2 1**（2⁷ → 2⁰）
- Hex ↔ Binary：A=1010, B=1011, C=1100, D=1101, E=1110, F=1111
- 換算關係：**1 hex digit = 4 bits**；**2 hex digits = 1 octet = 1 Byte**
- IPv4 = 32 bits = 4 octets；IPv6 = 128 bits = 32 hex digits = 8 hextets

### 1.3 換算口訣（繁中）

| 轉換 | 方法 | 例子 |
|---|---|---|
| Binary → Decimal | bit=1 的位置值全相加 | 11000000 = 128+64 = 192 |
| Decimal → Binary | 由 128 開始「夠就減、記 1；唔夠記 0」 | 168 → 10101000 |
| Decimal → Hex | 先轉 8-bit binary → 由右每 4 bit 一組 → 轉 hex | 168 → 10101000 → A8 |
| Hex → Decimal | 每 digit 轉 4-bit binary → 組 8-bit → 轉 decimal | D2 → 11010010 → 210 |

### 1.4 英文極速記憶句

- "IPv4 = 32 bits = 4 octets."
- "IPv6 = 128 bits = 32 hex digits = 8 hextets."
- "Every 4 bits is represented by a single hexadecimal digit."
- "Hexadecimal is used to represent IPv6 addresses and MAC addresses."
- "Routers and computers only understand binary, while humans work in decimal."

---

## Part 2 — Lecture 1: Networking Today（今日網絡）

### 2.1 網絡三要素

| 元件 | 例子 | 一句話角色 |
|---|---|---|
| End Device | PC、Server、Printer | 訊息起點／終點 |
| Intermediary Device | Switch、Router、Firewall、AP | 連接＋管理：轉發訊號、記錄路徑、通報錯誤 |
| Network Media | 銅線／光纖／無線 | 傳輸：電脈衝／光脈衝／電磁波 |

### 2.2 LAN vs WAN

| 特性 | LAN | WAN |
|---|---|---|
| 範圍 | 小（一棟樓） | 大（跨城市／國家） |
| 管理 | 單一組織或個人 | 一個或多個 Service Provider |
| 頻寬 | 高 | 通常較慢 |
| 角色 | 連接 end devices | 連接 LAN 與 LAN |

### 2.3 可靠網絡四大特性（英文口訣：FSSS）

| 特性 | 核心要點 | 英文關鍵句 |
|---|---|---|
| **F**ault Tolerance | 多路徑＋Packet Switching 冗餘 | "Each packet could take a different path." |
| **S**calability | 跟隨標準與 protocol 擴充 | "Expand without impacting existing services." |
| **S**ervice Quality (QoS) | 優先保證 voice / live video | "Primary mechanism for reliable delivery." |
| **S**ecurity | 基建＋資訊；目標 CIA | "Security must be implemented in multiple layers." |

**CIA 三元組**：Confidentiality（保密，只有指定收件者可讀）／ Integrity（完整，不被竄改）／ Availability（可用，隨時可靠存取）

### 2.4 網絡類型速記

- 規模：Small Home → SOHO → Medium/Large → World Wide（Internet）
- Internet = 全球 LAN + WAN 集合，**無單一擁有者**（IETF、ICANN、IAB 維持結構）
- Intranet = 組織內部專用；Extranet = 供外部合作機構安全存取

### 2.5 連接技術速記

- 家用：**Cable、DSL、Cellular、Satellite、Dial-up**
- 企業：**Dedicated Leased Line、Ethernet WAN、Business DSL (SDSL)、Satellite**
- Converged Network：同一基建、同一標準，同時傳 **data + voice + video**

### 2.6 威脅 vs 防禦

| 外部威脅 External | 內部威脅 Internal | 防禦（多層） |
|---|---|---|
| Virus / Worm / Trojan | 遺失或被竊設備 | Home：Antivirus + Antispyware + Firewall |
| Spyware / Adware | 員工意外誤用 | 企業再加：Dedicated Firewall、ACL、IPS、VPN |
| Zero-day、DoS、資料攔截、身份盜竊 | 惡意員工 | 口訣：**多層防禦 Defense in Depth** |

### 2.7 趨勢與雲端

- 四大趨勢：**BYOD、Online Collaboration、Video、Cloud Computing**
- 四種 Cloud：**Public**（公眾付費／免費）／ **Private**（組織專用）／ **Hybrid**（兩種以上組合）／ **Custom**（行業專用，可私有可公有）
- 其他：Smart Home、Powerline Networking（電源插座傳資料）、WISP（鄉郊無線寬頻）

### 2.8 必背英文短句

- "The internet is not owned by any individual or group."
- "Every computer on a network is called a host or end device."
- "A device in a Peer-to-Peer network can be both a client and a server."
- "Converged networks deliver data, voice, and video over the same infrastructure."

---

## Part 3 — Lecture 8: IPv6 Addressing（IPv6 定址）

### 3.1 必背數字

- IPv6 = **128 bits** = **8 hextets**；**1 hextet = 16 bits = 4 個十六進位數字**
- Prefix length 範圍 **0–128**，典型 **/64**（= 64-bit Interface ID）
- **`::` 在一個位址內只可用一次**；**零段數 = 8 − 非零 hextet 數**（零段 × 16 = binary 0 個數）
- `/48` Global Routing Prefix ＋ **16-bit** Subnet ID = **2¹⁶ = 65,536 個 `/64` subnet**
- EUI-64：中間插 **`fffe`**＋反轉**第 7 個 bit**（`00 → 02`）

### 3.2 位址類型與前綴速記表

| 類型 | Prefix | 一句話必記 |
|---|---|---|
| GUA（Global Unicast） | **2000::/3** | 全球唯一、Internet 可路由；開頭係 **2 或 3**（佔總空間 **1/8**） |
| LLA（Link-Local） | **FE80::/10** | **每個 IPv6 介面必須有**；只在同一條 link；**不可路由** |
| ULA（Unique Local） | **FC00::/7** | 類似 IPv4 private address；不被全域路由、不被轉換 |
| Loopback | **::1/128** | 測試本機 TCP/IP；**唔可以**配喺實體介面 |
| Unspecified | **::/128** | **只可作來源位址**，唔可以配喺介面 |
| IPv4-embedded | 例 `::192.168.10.10` | 協助 IPv4 → IPv6 過渡 |
| Multicast | **FF00::/8** | **只可作目的位址**；`ff02::1`=All-nodes、`ff02::2`=All-routers |

⚠️ IPv6 **冇 broadcast**（IPv4 嘅廣播功能由 multicast 取代）。

### 3.3 兩條縮寫規則

| 規則 | 做法 | 例子 | 陷阱 |
|---|---|---|---|
| Rule 1 | 省略每個 hextet 嘅**前導零** | `01ab`→`1ab`、`0a00`→`a00`、`00ab`→`ab` | **尾隨零唔可以省**（`0a00` ≠ `0a`） |
| Rule 2 | **`::`** 代替連續全零 hextet | `2001:db8:cafe:1:0:0:0:1` → `2001:db8:cafe:1::1` | **只可用一次**（否則展開唔唯一） |

### 3.4 GUA 三部分與責任分工

`2001:db8:acad : XXXX : 0000:0000:0000:0000 /64` → **Global Routing Prefix（48b，ISP 派）｜Subnet ID（16b，機構自己分）｜Interface ID（64b，設備生成）**

- ⚠️ **全 0 主機位址 = Subnet-Router anycast，只配 Router**；IPv6 **全 1 主機位址可以用**（因為冇 broadcast）

### 3.5 動態取得 GUA：RS／RA 與三種方法

- **RS（Router Solicitation）**：**host 發**，用嚟搵 Router
- **RA（Router Advertisement）**：**Router 發**，帶 **prefix 同 prefix length、default gateway、DNS 位址同 domain name**

| 方法 | 位址（GUA）由邊個提供 | DNS 等資料 | Default Gateway |
|---|---|---|---|
| **SLAAC** | RA 提供 prefix，設備用 **EUI-64 或隨機**造 Interface ID | 冇 | Router 的 **LLA**（RA 來源位址） |
| **SLAAC + Stateless DHCPv6** | 同上（SLAAC 自己造） | **stateless DHCPv6 server** | Router 的 **LLA** |
| **Stateful DHCPv6** | **DHCPv6 server** 派 GUA＋prefix length | 同上 server | Router 的 **LLA** |

### 3.6 CLI／指令速查（Cisco IOS 與 Windows）

```
R1(config)# interface gigabitethernet 0/0/0
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64     # 靜態 GUA（/64）
R1(config-if)# ipv6 address fe80::1:1 link-local      # 靜態 LLA（同一 link 內必須唯一）
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# ipv6 unicast-routing                       # Router 轉發 IPv6 必需（講義未列出，實務需要）

C:\> ipconfig        # 睇 IPv6 Address（GUA）、Link-local IPv6 Address、Default Gateway（通常係 fe80::1）
```

- 口訣：IPv6 指令同 IPv4 幾乎一樣，**只需把 `ip` 換成 `ipv6`**
- Windows **best practice**：Default Gateway 填 Router 嘅 **LLA**（用 SLAAC／DHCPv6 時會自動設定）

### 3.7 IPv4 vs IPv6 一覽

| 比較 | IPv4 | IPv6 |
|---|---|---|
| 長度／寫法 | 32 bits、dotted decimal | **128 bits**、hexadecimal、8 hextets |
| 網絡部分 | Subnet mask（255.255.255.0） | **Prefix length（/64）**，冇 mask |
| 廣播 | 有 Broadcast | **冇**，用 multicast 取代 |
| 自動定址 | DHCP | **SLAAC**／DHCPv6（stateless／stateful） |
| 私用 | RFC 1918（10.x、172.16–31.x、192.168.x） | **ULA（FC00::/7）** |
| 每介面位址 | 通常 1 個 | 通常 **2 個或以上**（GUA ＋ LLA） |
| IPv4／IPv6 共存 | — | **Dual Stack**／**Tunneling**（IPv6 封裝入 IPv4）／**NAT64**（Translation） |

### 3.8 英文極速記憶句

- "IPv6 is 128 bits long and written in hexadecimal; each hextet is 16 bits."
- "A double colon can only be used once within an address."
- "Every IPv6-enabled interface must have a link-local address (FE80::/10)."
- "Unlike IPv4, IPv6 does not have a broadcast address."
- "Packets with a source or destination LLA cannot be routed."
- "EUI-64 inserts fffe into the middle of the MAC address and reverses the 7th bit."
- "With SLAAC, the prefix comes from the RA and the device creates its own interface ID."
- "A GUA consists of the global routing prefix, the subnet ID, and the interface ID."
- "2001:db8:acad::/48 with a 16-bit subnet ID allows 65,536 /64 subnets."

### 3.9 交叉引用

- 理論全文：`02_Study_Guides/ITE3102_L8_IPv6Addressing_StudyGuide.md`
- 題解練習：`02_Study_Guides/ITE3102_T8_IPv6Addressing_StudyGuide.md`（換算、類型配對、EUI-64、合法性判斷）

---

## 最後 60 秒自測清單

- [ ] 能心算 192 / 168 / 11 / 10 的 binary 與 hex
- [ ] 能說出 IPv4 與 IPv6 的 bit 數與表示法
- [ ] 能列出 LAN vs WAN 三項分別
- [ ] 能背出四大特性（FSSS）與 CIA
- [ ] 能分辨 Intranet / Extranet / Internet
- [ ] 能列舉外部與內部威脅各兩項，及相應防禦
- [ ] 能把壓縮 IPv6 位址展開，並說出 `::` 代表幾個零 hextet
- [ ] 能背出 GUA／LLA／ULA／Loopback／Unspecified／Multicast 的前綴
- [ ] 能用 EUI-64 由 MAC 位址造出 Interface ID
- [ ] 能說出三種動態取得 GUA 方法的分別（邊個派位址、Gateway 用咩）
- [ ] 能算出 `/48` ＋ 16-bit Subnet ID 的 subnet 數量（65,536）

*詳細版：`02_Study_Guides/ITE3102_L0_NumberSystems_StudyGuide.md`、`ITE3102_L1_NetworkingToday_StudyGuide.md` 與 `ITE3102_L8_IPv6Addressing_StudyGuide.md`；題解：`ITE3102_T8_IPv6Addressing_StudyGuide.md`*
