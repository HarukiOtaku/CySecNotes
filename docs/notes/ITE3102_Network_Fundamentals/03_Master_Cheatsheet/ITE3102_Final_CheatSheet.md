# ITE3102 Network Fundamentals — Final Cheat Sheet（考前極速總複習）

> **覆蓋範圍**：Lecture 0 Number Systems（Module 5）＋ Lecture 1 Networking Today（Module 1）
> **使用時機**：考試前 5–10 分鐘快速掃描；只保留「關鍵數字、對比表、英文口訣」。
> 詳細解說請回查：`02_AI_Study_Guides/` 內兩份 Study Guide。

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

## 最後 60 秒自測清單

- [ ] 能心算 192 / 168 / 11 / 10 的 binary 與 hex
- [ ] 能說出 IPv4 與 IPv6 的 bit 數與表示法
- [ ] 能列出 LAN vs WAN 三項分別
- [ ] 能背出四大特性（FSSS）與 CIA
- [ ] 能分辨 Intranet / Extranet / Internet
- [ ] 能列舉外部與內部威脅各兩項，及相應防禦

*詳細版：`02_AI_Study_Guides/ITE3102_L0_NumberSystems_StudyGuide.md` 與 `ITE3102_L1_NetworkingToday_StudyGuide.md`*
