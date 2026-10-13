# ITE3102 EA Skill Test 001: 系列總覽

> **系列定位**：考前把 IPv4／Subnet Mask／Subnetting／Addressing Table／Packet Tracer 收成一條可計時練習嘅路徑。
> **理論來源**：`ITE3102_L7_IPv4Addressing_StudyGuide.md`、`ITE3102_T7_IPv4Addressing_StudyGuide.md`、`ITE3102_L0_NumberSystems_StudyGuide.md`
> **實作來源**：`ITE3102_PT11_Subnetting_CodeGuide.md`、`ITE3102_PT10_DNS_DHCP_CodeGuide.md`、`ITE3102_PT4_LAN_Setup_CodeGuide.md`
> **本系列**：001 總覽 → 002 概念 → 003 四步計法 → 004 填表同 PT → 005 計時練習
> **閱讀方法**：002／003 唔識就停，唔好跳去 005 默答案。

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

Skill Test 通常分兩截：先紙筆計 **subnet mask／subnet 表／Addressing Table**，再用 Packet Tracer 把同一組數字砌入 router、server、WRS 同終端。紙筆錯一個 octet，後面成張 topology 都會紅。

本系列唔係再抄一次 L7 全文，而係用「考場會點問」去重講概念：mask 點樣切開 32-bit、點解要減 2、點解 `.0` 同 broadcast 唔可以派、gateway 點解成個 subnet 要相同、PT 邊幾步最常丟分。

實務情境：一間細公司攞到一個 `/24`，管理員用**同一個更長 prefix**（例如全部 `/28`）切出相等大小嘅 subnet，再指定「第 1 個 subnet 嘅 first usable 做 gateway、last usable 做 printer」。呢種 **fixed-length subnetting + addressing table** 就係紙筆部分嘅核心。

➜ 概念見 `ITE3102_EA_SkillTest_002_SubnetMaskConcepts_StudyGuide.md`；計法見 `ITE3102_EA_SkillTest_003_SubnettingFourSteps_StudyGuide.md`

## 🎯 2. 考試學習目標（Learning Objectives）

1. **解釋 IPv4、octet、subnet mask、prefix length** — Explain IPv4 as a 32-bit address and how the subnet mask marks network versus host bits
2. **用 AND 求 network address** — Determine the network address by ANDing an IPv4 address with its subnet mask
3. **計 subnet 數、可用 host、block size** — Calculate `2^n` subnets, `2^h − 2` usable hosts, and block size `256 − mask octet`
4. **填完整 subnet 表** — Fill network, usable range and broadcast for subnet 0, subnet 1 and the last subnet
5. **按文字規則填 Addressing Table** — Map first／second／last usable addresses onto devices and keep one gateway per subnet
6. **用課堂順序完成 Packet Tracer** — Cable unlike devices with straight-through, enable interfaces, set DNS／DHCP／wireless, then Check Results

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 建議用時

| 頁 | 用途 | 建議 |
|---|---|---|
| 002 | 概念（mask／AND／三種地址） | 考前一晚讀完，要識講「點解」 |
| 003 | 四步計法同對照表 | 用紙筆自己計三次先當識 |
| 004 | Addressing Table + PT 步驟 | 對住空白 topology 默一次 |
| 005 | 4 份計時卷 | 每份 Part 1 限 15 分鐘，做完先揭答案 |

### 3.2 紙筆部分常見結構

Skill Test 紙筆唔會要你背 RFC 全文，而係要你喺限時內由一個 **address block + 單一 mask** 寫出：

1. mask 最後 octet 嘅 **binary**
2. 同一 octet 嘅 **decimal**
3. **subnet 數目**
4. **每 subnet 可用 host**
5. **subnet 0／1／Last** 三行表
6. 按「Subnet A／Subnet B」文字規則填 **Addressing Table**

題目若寫 “maximum number of subnets created in a /28 network”，而上文已經講咗原本係 `/24` 再用 `/28` 切——跟課堂口徑答 **由 /24 借 4 bit → 16 個 subnet**，唔好答「一個 /28 得 1 個網絡」。

> **English Standard Definition:** Borrowing n bits from the host portion creates 2^n equal-sized subnets. Each subnet has 2^h minus 2 usable host addresses, where h is the number of remaining host bits.

### 3.3 Packet Tracer 部分常見結構

1. Unlike devices 用 **Copper Straight-Through**
2. Router 介面填 IP + mask 之後一定 **On**（`no shutdown`）
3. Server 開 **HTTP、HTTPS、DNS**，A record 指向 **Server 自己嘅 IP**
4. WRS Internet 側用紙筆計出嚟嘅 WAN IP；LAN 側用題目俾嘅 Router IP；DHCP 開完 **Save Settings**
5. PC 用指定第 N 個 usable（static）；Laptop 連指定 SSID 再用 DHCP
6. 最後 **Check Results**，再用瀏覽器開 hostname

➜ 逐步清單見 `ITE3102_EA_SkillTest_004_AddressingTableAndPT_StudyGuide.md`

### 3.4 入場 60 秒

1. 背：`128→/25、192→/26、224→/27、240→/28、248→/29、252→/30`
2. 先寫 **Block Size**，再跳邊界，再填 First／Last
3. 讀清 **first / last / second / third** 同 **subnet #1 定 last 定 #2**
4. PT：Straight-Through → 介面 On → Server 三個服務 → WRS Save → Check Results

> **English Standard Definition:** The block size is 256 minus the last non-zero octet of the subnet mask. Subnet boundaries start at 0 and increase by the block size.

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| EN | 繁中概念 | Exam Answer Phrase |
|---|---|---|
| Subnet mask | 32-bit 尺，1 = network、0 = host | "A subnet mask identifies the network and host portions of an IPv4 address." |
| Prefix length | mask 入面 1 嘅數目，寫成 /n | "The prefix length is the number of bits set to 1 in the subnet mask, written in slash notation." |
| Usable hosts | 2^h − 2 | "The number of usable hosts per subnet is 2 to the power of the host bits minus 2." |
| Default gateway | 離開本 subnet 嘅出口，通常係 router 介面 | "The default gateway is the router interface address on the same subnet as the host." |
| Straight-through | 接唔同類裝置 | "Use a straight-through cable between unlike devices." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**Step 1 — 先理解觀念（Understand）**  
讀 002：IPv4 32-bit、mask 係刀、AND 求 network、三種地址。

**Step 2 — 背誦英文短語（Memorize）**  
五句：32-bit hierarchical address；1 = network 0 = host；only 1 AND 1 produces 1；2^n subnets；2^h minus 2 hosts。

**Step 3 — 掌握計算／寫法（Calculate）**  
003 用紙筆由 `/24` 切 `/27`、`/28`、`/26` 各一次。

**Step 4 — 能解答英文考題（Solve Exam Questions）**  
005 計時；錯嘅格用 004 規則對返「題目原文點寫」。

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

- Mask 最後 octet：`128 192 224 240 248 252`
- Block = `256 − 嗰個 octet`
- First = Network + 1；Last = Broadcast − 1；Broadcast = 下一個 Network − 1
- Network 同 Broadcast **唔可以填入 Device IP**
- 同一 subnet 嘅 Default Gateway **一定相同**
- 詳細對照表：`ITE3102_EA_SkillTest_003_SubnettingFourSteps_StudyGuide.md` §3.2
- 計時卷：`ITE3102_EA_SkillTest_005_TimedPractice_StudyGuide.md`
