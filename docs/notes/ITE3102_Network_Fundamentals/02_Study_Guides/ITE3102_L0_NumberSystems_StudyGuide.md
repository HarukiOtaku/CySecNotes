# ITE3102 L0: Number Systems — 雙語應考學習指南

> **來源**：Cisco Introduction to Networks v7.0 (ITN) — Module 5: Number Systems
> **原始檔**：`01_Raw_Materials/Lectures/Lecture0_NumberSystems.pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 算例自己動手做一次

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課是整個網絡課程的「算術基礎」，主題只有一個：在 **Decimal**（十進制）、**Binary**（二進制）與 **Hexadecimal**（十六進制）三種數字系統之間自由換算。背後的原因是：電腦與路由器只認得 binary（0 與 1），但人類習慣 decimal；而 **IPv4 Address** 以 32-bit binary 儲存、**IPv6 Address** 與 **MAC Address** 則以 hexadecimal 表示。因此「進制換算」不是數學遊戲，而是理解 IP 位址、Subnet、MAC 位址的必備工具。

實務情境一：網絡工程師收到一張表格，上面寫著 `11000000.10101000.00001011.00001010`，要立刻認出這是 `192.168.11.10`——常見的 private IP 網段（192.168.x.x）。若不懂 binary→decimal 換算，連最基本的 IP 分類與 subnet 規劃都無法進行。

實務情境二：設定路由器或防火牆時，看到 MAC 位址 `A8:5E:45:...` 或 IPv6 位址 `2001:DB8:...`，需要判斷位址格式是否正確、總共有多少個 hexadecimal digit。懂得「1 個 hex digit = 4 bits」就能即時心算位址長度（IPv6 = 128 bits = 32 個 hex digit），這是網絡排錯（troubleshooting）的基本功。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **理解三種進制結構** — Explain the structure of decimal, binary, and hexadecimal numbering systems
2. **理解位置記數法** — Explain positional notation and why a digit's value depends on its position
3. **二進制轉十進制** — Convert binary numbers to decimal values
4. **十進制轉二進制** — Convert decimal numbers to binary values
5. **十進制轉十六進制** — Convert decimal numbers to hexadecimal values
6. **十六進制轉十進制** — Convert hexadecimal numbers to decimal values
7. **說明 IPv4 / IPv6 位址結構** — Describe the structure of IPv4 (32-bit, 4 octets) and IPv6 (128-bit, 32 hex digits) addresses
8. **解釋 Hexadecimal 的用途** — Explain why hexadecimal is used for IPv6 and MAC addresses; define a hextet

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 Binary 與 IPv4 位址（Binary and IPv4 Addresses）

繁中解說：**Binary** 只使用 0 與 1，每一個數字叫一個 **Bit**；**Decimal** 則使用 0 至 9。網絡上的主機（Hosts）、伺服器（Servers）與網絡設備都用 binary 位址互相識別。一個 IPv4 位址是 32 個 bit 組成的字串，被分成 4 個 **Octet**（每 octet = 8 bits = 1 Byte），octet 之間以點分隔。為了方便人類閱讀，這種表示法會被轉換成 **Dotted Decimal Notation**（點分十進制）。

> English Standard Definitions:
> - "The binary numbering system consists of 1s and 0s, called bits."
> - "The decimal numbering system consists of digits 0 through 9."
> - "Hosts, servers, and network equipment use binary addressing to identify each other."
> - "Each address is made up of a string of 32 bits, divided into four sections called octets. Each octet contains 8 bits (or 1 byte) separated by a dot."
> - "For ease of use by people, this dotted notation is converted to dotted decimal."

### 3.2 位置記數法（Positional Notation）

繁中解說：**Positional Notation** 的意思是：同一個數字，因為所處「位置」不同而代表不同數值。以十進制（radix = 10）為例，1234 中由右至左的位置 0、1、2、3 分別對應位置值 1、10、100、1000，所以 1234 = 1×1000 + 2×100 + 3×10 + 4×1。這個機制完全適用於二進制（radix = 2）：8 個 bit 的位置由右至左為 0–7，位置值分別是 2⁰=1、2¹=2、2²=4、2³=8、2⁴=16、2⁵=32、2⁶=64、2⁷=128。**這張位置值表（128 64 32 16 8 4 2 1）是整課所有換算的基礎，必須背熟。**

> English Standard Definitions:
> - "Positional notation means that a digit represents different values depending on the 'position' the digit occupies in the sequence of numbers."
> - "In the binary positional notation system, the position values are 128, 64, 32, 16, 8, 4, 2, 1 (from 2⁷ to 2⁰)."

**算例 1（Binary → Decimal）**：`11000000`
- 位置值：128 64 32 16 8 4 2 1；位元：1 1 0 0 0 0 0 0
- 計算：1×128 + 1×64 = 128 + 64 = **192**

**算例 2（完整 IPv4 位址）**：`11000000.10101000.00001011.00001010`
| Octet | Binary | 計算 | Decimal |
|---|---|---|---|
| 1 | 11000000 | 128+64 | 192 |
| 2 | 10101000 | 128+32+8 | 168 |
| 3 | 00001011 | 8+2+1 | 11 |
| 4 | 00001010 | 8+2 | 10 |

結果：**192.168.11.10**

### 3.3 十進制轉二進制（Decimal to Binary Conversion）

繁中解說：由最左邊、權重最大的位置（**Most Significant Bit, MSB**，即 128 位）開始，逐位比較：若十進制數字 n ≥ 該位置值，記下 binary 1 並把 n 減去該位置值；否則記下 binary 0，移到下一個位置值。重複此步驟直到 1 的位置為止，其餘空位補 0。

> English Standard Definitions:
> - "Start in the 128 position (the most significant bit). Is the decimal number of the octet (n) equal to or greater than 128?"
> - "If no, record a binary 0 in the 128 positional value and move to the 64 positional value."
> - "If yes, record a binary 1 in the 128 positional value, subtract 128 from the decimal number, and move to the 64 positional value."
> - "Repeat these steps through the 1 positional value."

**算例：把 168 轉成 binary**
| 步驟 | 比較 | 結果 |
|---|---|---|
| 1 | 168 ≥ 128? 是 → 記 1，168−128 = 40 | 1 |
| 2 | 40 ≥ 64? 否 → 記 0 | 0 |
| 3 | 40 ≥ 32? 是 → 記 1，40−32 = 8 | 1 |
| 4 | 8 ≥ 16? 否 → 記 0 | 0 |
| 5 | 8 ≥ 8? 相等 → 記 1，8−8 = 0 | 1 |
| 6–8 | 無剩餘 → 補 0 | 000 |

結果：Decimal 168 = **10101000** in binary。

### 3.4 Hexadecimal 與 IPv6 / MAC 位址

繁中解說：**Hexadecimal** 是 base-16 進制，使用數字 0–9 與字母 A–F（A=10, B=11, C=12, D=13, E=14, F=15）。用一個 hex digit 表達數值，比用四個 binary bit 簡潔得多，因此 hexadecimal 被用來表示 **IPv6 Address** 與 **MAC Address**。要理解 IPv6，必須能在 hex 與 decimal 之間互換。

> English Standard Definitions:
> - "Hexadecimal is a base sixteen numbering system, using the digits 0 through 9 and letters A to F."
> - "It is easier to express a value as a single hexadecimal digit than as four binary bits."
> - "Hexadecimal is used to represent IPv6 addresses and MAC addresses."

**IPv6 位址結構**：IPv6 位址長 128 bits，每 4 個 bit 用 1 個 hex digit 表示，因此總共 32 個 hexadecimal values。每 4 個 hex digit 為一組，稱為 **Hextet**（一個 IPv6 位址共有 8 個 hextet）。

> English Standard Definitions:
> - "IPv6 addresses are 128 bits in length. Every 4 bits is represented by a single hexadecimal digit, making a total of 32 hexadecimal values."
> - "Each four hexadecimal character group is referred to as a hextet."

### 3.5 十進制轉十六進制（Decimal to Hexadecimal）

繁中解說：三步法，以 binary 為橋樑——(1) 先把十進制數字轉成 8-bit binary；(2) 由最右邊開始，把 binary 每 4 個 bit 分成一組；(3) 每組轉成對應的 1 個 hex digit。

> English Standard Definitions:
> - "Convert the decimal number to 8-bit binary strings."
> - "Divide the binary strings in groups of four starting from the rightmost position."
> - "Convert each four binary numbers into their equivalent hexadecimal digit."

**算例：168 → hex**
1. 168 in binary = `10101000`
2. 分成兩組：`1010` 和 `1000`
3. `1010` = A，`1000` = 8 → 168 = **A8** in hexadecimal

### 3.6 十六進制轉十進制（Hexadecimal to Decimal）

繁中解說：逆向三步法——(1) 把每個 hex digit 轉成 4-bit binary；(2) 由最右邊開始組合成 8-bit 分組；(3) 每個 8-bit 分組轉成對應的十進制數字。

> English Standard Definitions:
> - "Convert the hexadecimal number to 4-bit binary strings."
> - "Create 8-bit binary grouping starting from the rightmost position."
> - "Convert each 8-bit binary grouping into their equivalent decimal digit."

**算例：D2 → decimal**
1. D2 的 4-bit binary：D = `1101`，2 = `0010`
2. 組合成 8-bit：`11010010`
3. `11010010` = 128+64+16+2 = **210** → D2 = 210 in decimal

### 3.7 總結觀念

繁中解說：路由器與電腦只理解 binary，人類則習慣 decimal——因此熟悉兩種進制及其在網絡中的應用，是網絡專業人員的必備能力。

> English Standard Definitions:
> - "Routers and computers only understand binary, while humans work in decimal."

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/縮寫 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| Number System | 數字系統；以固定規則表達數值的方法 | "A number system defines how values are expressed using digits and positions." |
| Bit | 位元；binary 的最小單位（0 或 1） | "A bit is the smallest unit in the binary numbering system, and it can only be a 1 or a 0." |
| Binary | 二進制（base-2），只用 0 和 1 | "The binary numbering system consists of 1s and 0s, called bits." |
| Decimal | 十進制（base-10），用 0–9 | "The decimal numbering system consists of digits 0 through 9." |
| Hexadecimal | 十六進制（base-16），用 0–9 與 A–F | "Hexadecimal is a base sixteen numbering system, using the digits 0 through 9 and letters A to F." |
| Radix | 基數／底數，進制的基底 | "The radix is the base of a number system: 10 for decimal, 2 for binary, and 16 for hexadecimal." |
| Positional Notation | 位置記數法；數值取決於數字的位置 | "Positional notation means that a digit represents different values depending on the position it occupies in the sequence of numbers." |
| Positional Value | 位置值；某位置的權重 | "In binary, the positional values are 128, 64, 32, 16, 8, 4, 2, and 1." |
| Octet | 八位元組；8 個 bit 一組 = 1 Byte | "Each octet contains 8 bits (or 1 byte) separated by a dot." |
| Byte | 位元組；等於 8 bits | "A byte is a group of 8 bits, which is the same as one octet." |
| Dotted Decimal Notation | 點分十進制；IPv4 的人類可讀寫法 | "For ease of use by people, this dotted notation is converted to dotted decimal." |
| IPv4 Address | IPv4 位址；32-bit，分 4 個 octet | "Each IPv4 address is made up of a string of 32 bits, divided into four sections called octets." |
| IPv6 Address | IPv6 位址；128-bit，以 32 個 hex digit 表示 | "IPv6 addresses are 128 bits in length; every 4 bits is represented by a single hexadecimal digit." |
| Hextet | 十六進制組；4 個 hex digit 一組 | "Each four hexadecimal character group is referred to as a hextet." |
| Most Significant Bit (MSB) | 最高有效位；最左邊權重最大的 bit（128 位） | "Start in the 128 position, which is the most significant bit." |
| MAC Address | MAC 位址；網絡卡的實體位址，用 hex 表示 | "Hexadecimal is used to represent IPv6 addresses and MAC addresses." |
| Convert / Conversion | 換算；同一數值在不同進制間的轉換 | "To convert binary to decimal, add the positional values of every bit that is a 1." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

1. **先理解觀念**：Radix 與 Positional Notation——為什麼 1234 的「1」代表 1000；推導出二進制位置值 2⁰…2⁷
2. **背誦英文短語**：上述 Blockquote 中的定義句，尤其是「32 bits / 4 octets」、「base sixteen / 0–9 and A–F」、「every 4 bits is one hexadecimal digit」
3. **掌握計算／操作**：四種換算全部親手算一次——binary↔decimal（192、168、11、10 等常見 octet）、decimal↔hex（168↔A8、210↔D2）
4. **能解答英文考題**：例如
   - "Convert the binary value 10101000 to decimal." → 168
   - "How many bits are in an IPv4 address?" → "An IPv4 address is 32 bits long, divided into four octets."
   - "What is a hextet?" → "A hextet is a group of four hexadecimal digits; an IPv6 address has eight hextets."
   - "Why is hexadecimal used for IPv6 addresses?" → "Because every 4 bits can be represented by a single hexadecimal digit, which makes addresses much shorter."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**三進制速記**

| 進制 | Radix | 數字 | 網絡用途 | 英文口訣 |
|---|---|---|---|---|
| Decimal | 10 | 0–9 | IPv4 的 dotted decimal | "Humans work in decimal." |
| Binary | 2 | 0, 1 | 電腦／路由器的內部語言 | "Computers only understand binary." |
| Hexadecimal | 16 | 0–9, A–F | IPv6、MAC 位址 | "1 hex digit = 4 bits." |

**必背位置值表**：128 64 32 16 8 4 2 1（2⁷ → 2⁰）

**換算口訣（繁中）**
- Binary → Decimal：bit=1 的位置值全相加（11000000 = 128+64 = 192）
- Decimal → Binary：由 128 開始「夠就減、記 1；唔夠記 0」
- Decimal → Hex：先轉 8-bit binary → 由右每 4 bit 一組 → 轉 hex（168 → 10101000 → A8）
- Hex → Decimal：每 digit 轉 4-bit binary → 組 8-bit → 轉 decimal（D2 → 11010010 → 210）

**英文極速記憶口訣**
- "IPv4 = 32 bits = 4 octets."
- "IPv6 = 128 bits = 32 hex digits = 8 hextets."
- "Every 4 bits = one hexadecimal digit."
- "2 hex digits = 1 octet = 1 byte."
- Hex 對應：A=10, B=11, C=12, D=13, E=14, F=15

**Hex ↔ Binary 快速對照**（0–9 照常，記 A–F 即可）
A=1010 ｜ B=1011 ｜ C=1100 ｜ D=1101 ｜ E=1110 ｜ F=1111
