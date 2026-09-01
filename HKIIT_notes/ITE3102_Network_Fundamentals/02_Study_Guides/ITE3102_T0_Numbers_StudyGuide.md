# ITE3102 Network Fundamentals — Tutorial 0 雙語題解 Guide：Number Systems（進制換算練習）

> **課程 (Course)**：ITE3102 Network Fundamentals
> **練習 (Tutorial)**：Tutorial 0 — Numbers（進制換算練習）
> **主題 (Topic)**：Decimal / Binary / Hexadecimal 進制互換、IPv4 與 IPv6 地址結構
> **建議時長 (Suggested Time)**：45–60 分鐘
> **考核難度 (Difficulty)**：基礎必考題 — 進制換算幾乎每年必出，屬「送分題」，必須 100% 掌握

> **閱讀方法**：先看繁中解說理解邏輯 → 直接背誦英文 Blockquote 定義句 → 每條題目自己動手做一次 → 最後用「考前 5 分鐘懶人包」快速複習。

---

## 📝 練習概要 (Summary)

本練習係 Network Fundamentals 課程嘅第一個 Tutorial，核心目標係打好「進制換算」呢個基本功。網絡世界入面，所有資料最終都以 **Binary**（二進制，0 與 1）儲存同傳送；但為咗方便人類閱讀，網絡地址又以 **Decimal**（十進制）或 **Hexadecimal**（十六進制）表示。因此，喺三種進制之間自由互換，係理解 **IPv4 Address**、**IPv6 Address**、**Subnet Mask**、**MAC Address** 等一切後續課題嘅必要前提。本練習由淺入深，先做數字等值表（Different Bases Equivalence），再做十六進制轉二進制與十進制，最後將進制知識應用到 **IPv4**（點分十進制轉 32-bit 二進制）與 **IPv6**（數 hex digit、數 binary bit）地址之上。

考核重點非常明確：一係「換算速度與準確度」（每個 octet 換算應喺 30 秒內完成），二係「地址結構的數字規律」（IPv4 = 32 bits = 4 octets；IPv6 = 128 bits = 32 hex digits = 8 groups × 4）。呢類題目喺考試中通常以填空（Fill in the blanks）、補表（Complete the table）同轉換題（Convert the address）形式出現，只要熟練本指南嘅方法與英文答題句，即可穩取全部分數。

---

## 🎯 練習目標 (Objectives)

完成本練習後，你應該掌握以下能力（附英文對照）：

1. **理解三種進制結構** — Explain the structure of decimal (base 10), binary (base 2), and hexadecimal (base 16) numbering systems
2. **背熟 0–15 等值表** — Memorize the decimal, binary, and hexadecimal equivalence for values 0 to 15
3. **十進制 ↔ 二進制互換** — Convert decimal numbers to binary and binary numbers back to decimal
4. **十六進制 ↔ 二進制互換** — Convert hexadecimal numbers to binary and binary to hexadecimal using the 4-bit nibble shortcut
5. **十六進制 ↔ 十進制互換** — Convert hexadecimal numbers to decimal and vice versa
6. **IPv4 地址轉二進制** — Convert an IPv4 dotted-decimal address (e.g. `172.19.24.5`) into its 32-bit binary form, keeping 8 bits per octet
7. **分析 IPv6 地址位數** — Count the hexadecimal digits (32) and binary bits (128) in an IPv6 address, and extract the first/last bits
8. **用英文完整作答** — Write short, correct English exam answers using the standard answer phrases in this guide

---

## ✏️ 題目與答案 Walkthrough

> ⚠️ **提取說明**：原 Word 教材（`T0-Numbers.doc`）中的部分表格在文字提取時遺失（表格以物件形式嵌入）。以下按教程原意重建標準題目，方法與考核點與原教材一致；同學可直接用本指南的答案完成同類填空題。

---

### Q1. Fill in the equivalence of numbers represented in different bases below

（以不同進制表示的數字等值表，請填入空格）

**題目原文 (Question)**：

> Fill in the equivalence of numbers represented in different bases below:

（即：在 Decimal / Binary / Hexadecimal 三欄表格中補齊缺漏的數值。以下為本練習的標準等值表，0–15 必須背熟。）

**答案 (Answer)**：

| Decimal（十進制） | Binary（二進制） | Hexadecimal（十六進制） |
|---|---|---|
| 0 | 0000 | 0 |
| 1 | 0001 | 1 |
| 2 | 0010 | 2 |
| 3 | 0011 | 3 |
| 4 | 0100 | 4 |
| 5 | 0101 | 5 |
| 6 | 0110 | 6 |
| 7 | 0111 | 7 |
| 8 | 1000 | 8 |
| 9 | 1001 | 9 |
| 10 | 1010 | A |
| 11 | 1011 | B |
| 12 | 1100 | C |
| 13 | 1101 | D |
| 14 | 1110 | E |
| 15 | 1111 | F |
| 16 | 0001 0000 | 10 |
| 32 | 0010 0000 | 20 |
| 64 | 0100 0000 | 40 |
| 128 | 1000 0000 | 80 |
| 255 | 1111 1111 | FF |

**解題邏輯 (繁中解釋)**：

呢種等值表題目考嘅係「位置記數法」（Positional Notation）嘅概念：一個數字嘅值取決於佢所處嘅位置。喺二進制入面，8 個 bit 由右至左嘅位置值（Positional Values）分別係 2⁷ 至 2⁰，即 **128、64、32、16、8、4、2、1**——呢串數字係所有換算嘅基礎，必須背熟。

兩個實用方法：
- **十進制 → 二進制（比較法）**：由最大位置值 128 開始逐位比較，夠大就記 1 並減去該值，否則記 0。例：13 ≥ 8 記 1（餘 5）→ 5 ≥ 4 記 1（餘 1）→ 1 ≥ 2 記 0 → 1 ≥ 1 記 1 → 得 `1101`。
- **二進制 → 十六進制（Nibble 法）**：由最右邊開始，每 4 個 bit 分一組（一組叫一個 **Nibble**），每組直接對應 1 個 hex digit。例：`1101` = D（查上表 13 = D）。

> English Standard Definitions:
> - "The binary numbering system consists of 1s and 0s, called bits."
> - "In binary positional notation, the position values are 128, 64, 32, 16, 8, 4, 2, 1 (from 2⁷ to 2⁰)."
> - "Hexadecimal uses the digits 0–9 and the letters A–F, where A = 10, B = 11, C = 12, D = 13, E = 14, and F = 15."
> - "Each hexadecimal digit represents exactly 4 binary bits, called a nibble."

---

### Q2. Find the binary and decimal representations for the following hex numbers

（找出以下十六進制數字的二進制與十進制表示）

**題目原文 (Question)**：

> Find the binary and decimal representations for the following hex numbers:

（原教材的 hex 數值表於提取時遺失，以下為與教程考核點一致的代表性題目：`7F`、`F0`、`FC`、`2A`、`AB`。）

**答案 (Answer)**：

| Hexadecimal | Binary（每 digit 對應 4 bits） | Decimal（計算） |
|---|---|---|
| 7F | 0111 1111 | 7×16 + 15 = 127 |
| F0 | 1111 0000 | 15×16 + 0 = 240 |
| FC | 1111 1100 | 15×16 + 12 = 252 |
| 2A | 0010 1010 | 2×16 + 10 = 42 |
| AB | 1010 1011 | 10×16 + 11 = 171 |

**解題邏輯 (繁中解釋)**：

Hex → Binary 係最快嘅一步：一個 hex digit 一定等於 4 個 binary bit，逐個 digit 查表即可。例如 `7F`：7 = `0111`，F = `1111`，合併就係 `0111 1111`，唔使諗。

Hex → Decimal 有兩種方法：
1. **公式法**：對兩個 digit 嘅 hex 數 `XY`，Decimal = X×16 + Y。例：`7F` = 7×16 + 15 = 112 + 15 = **127**；`F0` = 15×16 + 0 = **240**。
2. **橋樑法**：先轉 binary 再用位置值求和。例：`FC` = `1111 1100` = 128+64+32+16+8+4 = **252**。

提一提：呢幾個數值其實係網絡上常見嘅 **Subnet Mask** octet（例如 `/28` 遮罩 `255.255.255.240` 入面就有 240；`252` 係 `/30` 遮罩用嘅值），熟習佢哋對之後 Subnetting 好有用。

> English Standard Definitions:
> - "Convert each hexadecimal digit into its 4-bit binary equivalent, then join the nibbles together."
> - "To convert a two-digit hexadecimal number to decimal, multiply the first digit by 16 and add the second digit (XY = X×16 + Y)."

---

### Q3. Fill in the missing numbers in the table below

（請在以下表格填上缺少的數字）

**題目原文 (Question)**：

> Fill in the missing numbers in the table below:

| Binary（已給） | Hexadecimal（要填） | Decimal（要填） |
|---|---|---|
| 0111 1111 | __________ | __________ |
| 1111 0000 | __________ | __________ |
| 1111 1100 | __________ | __________ |

**答案 (Answer)**：

| Binary | Hexadecimal | Decimal |
|---|---|---|
| 0111 1111 | 7F | 127 |
| 1111 0000 | F0 | 240 |
| 1111 1100 | FC | 252 |

**解題邏輯 (繁中解釋)**：

Binary → Hex 用 Nibble 分組法：由最右邊開始，每 4 個 bit 一組，逐組查表。
- `0111 1111` → 前組 `0111` = 7，後組 `1111` = F → **7F**
- `1111 0000` → `1111` = F，`0000` = 0 → **F0**
- `1111 1100` → `1111` = F，`1100` = C → **FC**

Binary → Decimal 用位置值求和（128 64 32 16 8 4 2 1）：
- `0111 1111` = 64+32+16+8+4+2+1 = **127**
- `1111 0000` = 128+64+32+16 = **240**
- `1111 1100` = 128+64+32+16+8+4 = **252**

**考試小貼士**：`0111 1111` = 127（同 Loopback 地址 `127.0.0.1` 有關）、`1111 1111` = 255 = `FF`（即 Subnet Mask 嘅全 1 octet）。記住「4 個 1 = F」呢個對應，可以幫你一眼睇出答案。

> English Standard Definitions:
> - "Group the binary digits into nibbles of four, starting from the rightmost bit, and convert each nibble to its hexadecimal digit."
> - "To convert binary to decimal, add together the positional values (128, 64, 32, 16, 8, 4, 2, 1) where the bit is 1."

---

### Q4. Write out the IPv4 address in its binary form

（將 IPv4 地址寫成二進制形式）

**題目原文 (Question)**：

> (a) Write out the IPv4 address 172.19.24.5 in its binary form below:
>
> (b) Write out the IPv4 address 192.168.11.101 in its binary form below:

**答案 (Answer)**：

> (a) 172.19.24.5 = `10101100.00010011.00011000.00000101`
>
> (b) 192.168.11.101 = `11000000.10101000.00001011.01100101`

**逐步計算（繁中解釋）**：

每個 octet 一定要寫足 8 個 bit，唔夠就喺左邊補 0（Leading Zeros），四個 octet 加埋 = 32 bits。

**(a) 172.19.24.5**

| Octet | Decimal | 拆解（128 64 32 16 8 4 2 1） | Binary |
|---|---|---|---|
| 1 | 172 | 128+32+8+4 | 10101100 |
| 2 | 19 | 16+2+1 | 00010011 |
| 3 | 24 | 16+8 | 00011000 |
| 4 | 5 | 4+1 | 00000101 |

**(b) 192.168.11.101**

| Octet | Decimal | 拆解（128 64 32 16 8 4 2 1） | Binary |
|---|---|---|---|
| 1 | 192 | 128+64 | 11000000 |
| 2 | 168 | 128+32+8 | 10101000 |
| 3 | 11 | 8+2+1 | 00001011 |
| 4 | 101 | 64+32+4+1 | 01100101 |

**檢查技巧**：轉完之後由 binary 反推返 decimal，睇下係咪一致；特別留意有冇漏咗 leading zeros（例如 5 一定要寫成 `00000101`，唔可以寫 `101`）。

> English Standard Definitions:
> - "An IPv4 address is 32 bits long and is divided into four 8-bit sections called octets."
> - "Convert each decimal octet into 8 binary bits, keeping any leading zeros, and join the octets with dots."
> - "Each octet is written with exactly 8 bits, so the complete address is always 32 bits."

---

### Q5. Consider an IPv6 address in hexadecimal ABCD:1234:3FB0:12EF:0000:000A:9876:1010

（考慮以下十六進制 IPv6 地址）

**題目原文 (Question)**：

> Consider an IPv6 address in hexadecimal `ABCD:1234:3FB0:12EF:0000:000A:9876:1010`.
>
> - How many hexadecimal digits are there?  __________
> - How many binary bits are there?  __________
> - The first 4 binary bits in the address: ________
> - The last 16 binary bits in the address: ________

**答案 (Answer)**：

| 題目 | 答案 |
|---|---|
| How many hexadecimal digits are there? | **32** |
| How many binary bits are there? | **128** |
| The first 4 binary bits in the address | **1010** |
| The last 16 binary bits in the address | **0001 0000 0001 0000** |

**解題邏輯 (繁中解釋)**：

**Q5.1 — Hex digits 數量**：IPv6 地址有 8 個 group，每個 group 用「:」分隔，每組 4 個 hex digit：8 × 4 = **32 個 hex digit**。（數法：`ABCD`、`1234`、`3FB0`、`12EF`、`0000`、`000A`、`9876`、`1010` — 8 組。）

**Q5.2 — Binary bits 數量**：因為 1 個 hex digit = 4 個 bit，所以 32 × 4 = **128 bits**。呢個係 IPv6 嘅標準長度，必須背熟。

**Q5.3 — First 4 binary bits**：成個地址第一個 hex digit 係 `A`，而 `A` 喺二進制係 `1010`，所以頭 4 個 bit = **1010**。

**Q5.4 — Last 16 binary bits**：地址最後一組係 `1010`（hex），即 4 個 hex digit：`1`、`0`、`1`、`0`，逐個轉成 4-bit binary：`0001`、`0000`、`0001`、`0000`，合併 = **0001 0000 0001 0000**。

**常見陷阱**：最後一組 `1010` 係「十六進制」嘅寫法（等於十進制 4112），唔係二進制 `1010`（等於十進制 10）！做呢類題目時要分清楚「邊個位數係 hex、邊個係 binary」，呢個正正係考你對進制嘅敏感度。

> English Standard Definitions:
> - "An IPv6 address is 128 bits in length, written in hexadecimal as eight groups of four digits separated by colons."
> - "Every 4 bits is represented by a single hexadecimal digit, so 32 hexadecimal digits represent 128 bits."
> - "The first hexadecimal digit of the address is A, which equals the 4 binary bits 1010."

---

## 📖 必考英文術語與答題句型庫

以下為本練習（以及往後 IP 課題）必用的英文專有名詞與標準英文答題句，建議逐句背熟。

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| Numbering System / Base (Radix) | 進制系統，以「基數」(Base) 區分：二進制 base 2、十進制 base 10、十六進制 base 16 | "A number system is defined by its base: binary uses base 2, decimal uses base 10, and hexadecimal uses base 16." |
| Binary (Base 2) | 二進制，只用 0 與 1，每個數字叫一個 bit | "The binary numbering system consists of 1s and 0s, called bits." |
| Bit | 位元，電腦最小嘅資料單位，只可係 0 或 1 | "A bit is the smallest unit of data, which can be either 0 or 1." |
| Byte | 位元組，8 個 bit 組成 1 個 byte | "A byte is a group of 8 bits." |
| Nibble | 半位元組，4 個 bit 一組，剛好等於 1 個 hex digit | "A nibble is a group of 4 bits, which maps exactly to one hexadecimal digit." |
| Decimal (Base 10) | 十進制，用數字 0–9，人類日常使用嘅進制 | "The decimal numbering system consists of the digits 0 through 9." |
| Hexadecimal (Base 16) | 十六進制，用 0–9 同 A–F（A=10…F=15）表示數值 | "Hexadecimal is a base-16 system using digits 0–9 and letters A–F, where A = 10 and F = 15." |
| Positional Notation | 位置記數法：同一個數字因位置不同而代表唔同數值 | "In positional notation, the value of a digit depends on the position it occupies in the number." |
| Positional Value | 位置值：二進制 8-bit 的位置值由左至右係 128, 64, 32, 16, 8, 4, 2, 1 | "The binary positional values from left to right are 128, 64, 32, 16, 8, 4, 2, 1." |
| Most Significant Bit (MSB) / Least Significant Bit (LSB) | 最高有效位（最左邊、權重最大 128 嘅 bit）/ 最低有效位（最右邊、權重 1 嘅 bit） | "The leftmost bit is the Most Significant Bit (MSB) with the highest value of 128, and the rightmost bit is the Least Significant Bit (LSB)." |
| IPv4 Address | IPv4 地址，32-bit，分 4 個 8-bit octet，以點分隔 | "An IPv4 address is a 32-bit address divided into four 8-bit octets separated by dots." |
| Octet | 八位元組，8 個 bit 一組，即 IPv4 地址嘅一個部分 | "An octet is a group of 8 bits; each of the four parts of an IPv4 address is one octet." |
| Dotted-Decimal Notation | 點分十進制表示法：將 IPv4 每個 octet 以十進制 0–255 表示並用點分隔 | "Dotted-decimal notation writes each of the four 8-bit octets of an IPv4 address as a decimal number between 0 and 255." |
| Leading Zeros | 前導零：轉換時 octet 唔夠 8 bit 就要喺左邊補 0 | "Leading zeros must be kept so that every IPv4 octet is written with exactly 8 binary bits." |
| IPv6 Address | IPv6 地址，128-bit，以十六進制寫成 8 組 × 4 個 hex digit，用冒號分隔 | "An IPv6 address is 128 bits long, written in hexadecimal as eight groups of four digits separated by colons." |
| Hextet | 十六進制組：IPv6 地址中每 4 個 hex digit 為一組（= 16 bits） | "Each group of four hexadecimal digits in an IPv6 address is called a hextet." |
| Subnet Mask | 子網絡遮罩：32-bit 值，用嚟區分 IPv4 地址嘅網絡部分同主機部分（全部為 1 嘅 octet = 255 = FF） | "A subnet mask is a 32-bit value that separates the network portion from the host portion of an IPv4 address." |
| Loopback Address | 迴環地址 127.0.0.1，用嚟測試本機網絡功能 | "The loopback address 127.0.0.1 is used to test network functions on the local host." |

---

## 🗺️ 學習路線 (Learning Path)

跟住以下四步，由「睇得明」去到「考到分」：

**第 1 步：先理解（Understand）— 20 分鐘**
- 明白點解網絡要用 binary：電腦同路由器只認得 0 與 1。
- 明白 Positional Notation：位值 128, 64, 32, 16, 8, 4, 2, 1 係點嚟（2 嘅冪次）。
- 明白點解 IPv6 / MAC 用 hexadecimal：1 個 hex digit 代替 4 個 bit，寫出嚟短好多。

**第 2 步：背誦（Memorize）— 15 分鐘**
- 背熟 0–15 嘅 Decimal / Binary / Hex 等值表（見 Q1 答案表）。
- 背熟 A–F 對應 10–15；背熟常用值：`1111 1111` = 255 = FF、`0111 1111` = 127 = 7F。
- 背熟關鍵數字：IPv4 = 32 bits / 4 octets；IPv6 = 128 bits / 32 hex digits / 8 hextets。

**第 3 步：掌握計算與判斷（Practice）— 30 分鐘**
- 用「比較法」練十進制 ↔ 二進制；用「Nibble 分組法」練二進制 ↔ 十六進制；用「×16 +」公式練十六進制 → 十進制。
- 練 IPv4 轉換：每個 octet 獨立處理，寫足 8 bits。
- 練 IPv6 數位題：數 group、乘 4、抽取頭尾 bits。

**第 4 步：能解答考題（Exam Ready）— 20 分鐘（自測）**
- 限時 15 分鐘完成以下 4 條自測題，再用答案對核：

| 自測題 | 答案 |
|---|---|
| 1. Convert 200 (decimal) to binary and hexadecimal | Binary = `11001000`；Hex = `C8`（200 = 128+64+8；`1100`=C、`1000`=8） |
| 2. Convert `0x3F` to binary and decimal | Binary = `0011 1111`；Decimal = 3×16 + 15 = 63 |
| 3. Convert the subnet mask 255.255.240.0 to binary | `11111111.11111111.11110000.00000000` |
| 4. An IPv6 address has 8 groups of 4 hex digits. How many hex digits and how many bits in total? | 32 hex digits；128 bits（32 × 4） |

---

## 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 1. 必背數字（Key Numbers）

| 十進制 | 二進制 | 十六進制 |
|---|---|---|
| 10 | 1010 | A |
| 11 | 1011 | B |
| 12 | 1100 | C |
| 13 | 1101 | D |
| 14 | 1110 | E |
| 15 | 1111 | F |
| 16 | 0001 0000 | 10 |
| 127 | 0111 1111 | 7F |
| 128 | 1000 0000 | 80 |
| 240 | 1111 0000 | F0 |
| 252 | 1111 1100 | FC |
| 255 | 1111 1111 | FF |

### 2. 位權對照表（Binary Positional Values）

`128  64  32  16  8  4  2  1` — 由左至右對應 2⁷ 至 2⁰，所有換算都靠佢。

### 3. 三大地址結構數字（Address Structure Numbers）

| 地址類型 | 總長度 | 分組 | 每組 | 表示法 |
|---|---|---|---|---|
| IPv4 | 32 bits | 4 octets | 8 bits | Decimal，點分（dotted-decimal） |
| IPv6 | 128 bits | 8 hextets | 16 bits（4 hex digits） | Hexadecimal，冒號分隔 |
| MAC Address | 48 bits | 6 octets | 8 bits（2 hex digits） | Hexadecimal，冒號/連字號分隔 |

### 4. 四步換算速記（Quick Conversion Steps）

- **十進制 → 二進制**：128 64 32 16 8 4 2 1 逐位比較，夠就 1 唔夠就 0。
- **二進制 → 十六進制**：由右至左每 4 bit 一組（nibble），逐組查表。
- **十六進制 → 十進制**：兩個 digit 嘅 `XY` = X×16 + Y。
- **十六進制 → 二進制**：每個 digit 直接寫成 4 個 bit。

### 5. 英文記憶口訣（English Mnemonics）

> - "**A**=10, **B**=11, **C**=12, **D**=13, **E**=14, **F**=15" — hex 字母順住數，10 至 15。
> - "**1 hex digit = 4 bits**" — 所以 IPv6：32 hex digits = 128 bits。
> - "**4 ones = F, 8 ones = FF = 255**" — 全 1 嘅 octet 永遠係 255。
> - "**IPv4: 4 × 8 = 32; IPv6: 8 × 16 = 128**" — 兩個地址長度唔使背，乘出嚟就係。
> - "**Octet always 8 bits — keep the leading zeros!**" — 寫 IPv4 binary 時永遠補足 8 位。

### 6. 考試陷阱提醒（Exam Traps）

1. ⚠️ 寫 IPv4 binary 時漏咗 leading zeros（例如 5 寫成 `101` 而唔係 `00000101`）— 扣分位。
2. ⚠️ 混淆 hex `1010`（= 4112）同 binary `1010`（= 10）— 先分清楚題目問緊邊個進制。
3. ⚠️ 數錯 IPv6 group：一定係 8 組 × 4 個 hex digit = 32 個 digit，唔好數漏。
4. ⚠️ 十六進制字母記得用大階（A–F）作答，保持一致。
5. ⚠️ 唔好將 IPv4 當成 4 個獨立數字亂咁計 — 每個 octet 範圍一定係 0–255，超過 255 即代表計錯。

---

*本指南由 Tutorial 0: Numbers 練習教材改編而成，配合 Lecture 0 (Number Systems) 使用效果更佳。*
