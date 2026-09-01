# ITE3102 PT5.1 CodeGuide — Examine the ARP Table（ARP 表實務測驗主戰文件）

> **Lab Identity:** Packet Tracer 9.2.9 — Examine the ARP Table（對應 Cisco NetAcad ITN 標準活動）
> 本文件唯一目的：令學生只靠呢份文件就喺 Packet Tracer 完成實作，並答啱 Practical Test 所有問題。

---

## 🔗 理論 recap（先睇呢度，5 分鐘入腦）

1. ARP（Address Resolution Protocol）係 Layer 3 嘅協議，用嚟將 IP address「翻譯」做 MAC address，令主機可以砌出 Layer 2 frame 送出。
   > ARP resolves a known IP address to an unknown MAC address so the host can build an Ethernet frame.
2. ARP request 係 **broadcast**（destination MAC = `FFFF.FFFF.FFFF`，全網絡都收到）；ARP reply 係 **unicast**（淨係回覆俾請求嗰部機）。
   > ARP requests are broadcasts; ARP replies are unicasts sent back only to the requesting host.
3. Switch 唔睇 IP，只根據 **MAC address table** 學習同轉發 frame：未知 destination MAC 嘅 broadcast 會 flooding 去所有 port（除咗入嚟嗰個 port）；已知嘅就 unicast 淨係轉去對應 port。
   > A switch learns MAC addresses and floods unknown/broadcast frames out every port except the ingress port; it forwards known unicast frames only to the matching port.
4. 跨網絡通訊（remote communication）時，主機唔會直接 ARP 目的地，而係將 frame 送去 **default gateway（router）**，由 router 負責轉發。
   > When the destination is on a remote network, the host sends the frame to its default gateway, and the router forwards it toward the destination.
5. Router 嘅 MAC address table 只記錄自己 interface 嘅 MAC（serial interface 冇 MAC，表內顯示 N/A）；router 透過 ARP 學習同自己直連網絡主機嘅 MAC。
   > A router only knows the MAC addresses of its own interfaces; it learns the MAC addresses of directly connected hosts via ARP.
6. ARP cache 有老化時間（age out），所以主機唔會永遠記得別人嘅 MAC；cache 一過期就要再出 ARP request。
   > ARP cache entries age out, so a host must repeat the ARP request once the mapping expires.

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握的實務技能（Practical Skills）

| 技能 | 實務上做到啲咩 |
|---|---|
| Simulation mode 操作 | 用 Packet Tracer 嘅 Simulation mode + Capture/Forward 逐步睇 PDU 點樣傳播 |
| ARP 表操作 | 用 `arp -d` 清空 cache、`arp -a` 檢查 IP ↔ MAC 對應 |
| PDU 解剖（PDU Inspection） | 打開 PDU 睇 Layer 2（MAC）同 Layer 3（IP）欄位，解釋 source / destination 變化 |
| Switch MAC table 檢查 | 用 `show mac-address-table` 解讀 switch 學到咗啲咩 MAC、喺邊個 port |
| Router ARP 檢查 | 用 `show arp` / `show mac-address-table` 睇 router 嘅 ARP cache 同 MAC table |
| 網絡故障判斷 | 解釋 broadcast vs unicast、flooding vs forwarding、default gateway 角色 |

> **Core skills:** Operating Packet Tracer Simulation mode, clearing and reading the ARP cache (`arp -d` / `arp -a`), inspecting PDU Layer 2/3 fields, reading switch MAC address tables (`show mac-address-table`), and reading the router ARP table (`show arp`).

### 所需設備 / 軟體（Equipment & Software）

- **Cisco Packet Tracer**（本 Lab 用 9.2.9 版本活動檔 `.pka`）
- 網絡設備：2 部 Router（**Router0**, **Router1**）、2 部 Switch（**Switch0**, **Switch1**）、2 部無線設備（**10.10.10.2**, **10.10.10.3**）、3 部 PC / Server（**172.16.31.2**, **172.16.31.3**, **172.16.31.4**）
- 本 Lab 設備**已經全部預設好**（devices are already configured），你唔需要入 CLI 設定 IP，主力係「觀察」同「答問題」

> **Environment:** Cisco Packet Tracer; the topology uses two routers, two switches, wireless hosts and PCs; all devices are pre-configured, so this lab focuses on observation and analysis rather than configuration.

### 網絡拓撲 + Addressing Table（必背）

網絡分兩邊，中間用 serial link（S0/0/0）駁通：

- **左邊 LAN `172.16.31.0/24`**：172.16.31.2 / .3 / .4 經 **Switch1** 連去 **Router1**（gateway = 172.16.31.1，即 Router1 嘅 G0/0）
- **右邊 LAN `10.10.10.0/24`**：10.10.10.2 / .3（無線設備）經 **Switch0** 連去 **Router0**（gateway = 10.10.10.1，即 Router0 嘅 G0/0）
- **WAN link**：Router0 S0/0/0 ↔ Router1 S0/0/0（serial 冇 MAC address，表內顯示 N/A）

| Device | Interface | MAC Address | Switch Interface |
|---|---|---|---|
| Router0 | G0/0 | `0001.6458.2501` | G0/1 |
| Router0 | S0/0/0 | N/A | N/A |
| Router1 | G0/0 | `00E0.F7B1.8901` | G0/1 |
| Router1 | S0/0/0 | N/A | N/A |
| 10.10.10.2 | Wireless | `0060.2F84.4AB6` | F0/2 |
| 10.10.10.3 | Wireless | `0060.4706.572B` | F0/2 |
| 172.16.31.2 | F0 | `000C.85CC.1DA7` | F0/1 |
| 172.16.31.3 | F0 | `0060.7036.2849` | F0/2 |
| 172.16.31.4 | G0 | `0002.1640.8D75` | F0/3 |

> **Addressing Table:** memorize which MAC belongs to which device, because Part 1 and Part 2 questions ask you to compare the observed MAC addresses against this table.

⚠️ 教材原文有一處 typo：「Router0 Gg0/0」——實際係 **G0/0**，唔好俾佢誤導。

---

## 🛠️ 解題步驟拆解 (Walkthrough)

### Part 1 ➔ 檢查 ARP Request（Examine an ARP Request）

**Step 1 ➔** 用 172.16.31.2 ping 172.16.31.3 嚟產生 ARP requests（原文：Generate ARP requests by pinging 172.16.31.3 from 172.16.31.2）
**解說**：ping 需要知道目的地嘅 MAC address 先砌到 frame；如果 ARP cache 冇記錄，就會觸發 ARP 流程。呢個係成個 Lab 嘅起點。

**Step 2 ➔** 撳 172.16.31.2 → 開 Command Prompt → 打 `arp -d` 清空 ARP table（原文：Open a command prompt → Enter the arp -d command to clear the ARP table）
**解說**：`arp -d`（delete）係確保 cache 係空嘅，逼部機重新做一次完整嘅 ARP 流程，你至可以喺 Simulation mode 睇到成個過程。做完就關閉 Command Prompt。

> **Why clear the cache:** `arp -d` deletes all ARP cache entries so the host is forced to send a fresh ARP request that you can observe in Simulation mode.

**Step 3 ➔** 轉去 **Simulation mode**，再打 `ping 172.16.31.3`（原文：Enter Simulation mode and enter the command ping 172.16.31.3）
**解說**：今次會出現 **2 個 PDU**——一個係 ARP request（broadcast），另一個係 ICMP packet。個 ICMP PDU 會「消失咗」咁樣等喺度，因為部機未知道目的地 MAC，砌唔到 frame，所以 ICMP 要等 ARP reply 返嚟先可以送出。

> **Two PDUs appear:** the ARP request (broadcast) and the ICMP echo request. The ICMP PDU waits because the host cannot build the Ethernet frame without the destination MAC address.

**Step 4 ➔** 撳 **Capture/Forward** 一次（原文：Click Capture/Forward once. The ARP PDU moves to Switch1 while the ICMP PDU disappears, waiting for the ARP reply）
**解說**：ARP PDU 去到 Switch1；打開 PDU 睇 destination MAC address，會見到係 broadcast address `FFFF.FFFF.FFFF`。

**Q1：Is this address listed in the table above？（呢個 address 有冇喺上面張表？）**
**答：No。** 因為 ARP request 嘅 destination MAC 係 broadcast address `FFFF.FFFF.FFFF`，呢個係保留地址，唔會出現喺 Addressing Table。

> **Answer:** No. The destination MAC address of the ARP request is the broadcast address FFFF.FFFF.FFFF, which is not listed in the Addressing Table.

**Step 5 ➔** 再撳 **Capture/Forward**，等 PDU 移去下一個設備（原文：Click Capture/Forward to move the PDU to the next device）

**Q2：How many copies of the PDU did Switch1 make？（Switch1 複製咗幾多份 PDU？）**
**答：3 份。** ARP request 係 broadcast，Switch1 唔知邊個 port 先係目的地，所以除咗入嚟嗰個 port（F0/1）之外，會 flooding 去所有其他已連接嘅 port（F0/2、F0/3、G0/1），總共 3 份。

> **Answer:** Three. A broadcast frame is flooded out every port except the port it entered, so Switch1 sends one copy to each of the other three connected ports (F0/2, F0/3, G0/1).

**Q3：What is the IP address of the device that accepted the PDU？（邊部設備接受咗呢個 PDU？）**
**答：172.16.31.3。** ARP request 入面嘅 target IP 係 172.16.31.3，只有 IP 符合嘅設備先會「接受」個請求並回覆 ARP reply。

> **Answer:** 172.16.31.3. Only the device whose IP address matches the target IP address in the ARP request accepts it and replies.

**Step 6 ➔** 打開 PDU 睇 Layer 2（原文：Open the PDU and examine Layer 2）

**Q4：What happened to the source and destination MAC addresses？（source 同 destination MAC address 發生咗咩變化？）**
**答：佢哋對調咗（swapped / reversed）。** 依家係 ARP reply：source MAC = `0060.7036.2849`（172.16.31.3），destination MAC = `000C.85CC.1DA7`（172.16.31.2）。同 request 時完全相反。

> **Answer:** The source and destination MAC addresses are reversed. In the ARP reply, the source MAC is 172.16.31.3's MAC and the destination MAC is 172.16.31.2's MAC.

**Step 7 ➔** 一路撳 **Capture/Forward** 直至 PDU 返到 172.16.31.2（原文：Click Capture/Forward until the PDU returns to 172.16.31.2）

**Q5：How many copies of the PDU did the switch make during the ARP reply？（ARP reply 期間 switch 複製咗幾多份？）**
**答：1 份。** ARP reply 係 unicast frame，destination MAC 係 172.16.31.2 嘅 MAC；switch 喺之前 flooding ARP request 嗰陣已經學到呢個 MAC 喺 F0/1，所以淨係轉發去 F0/1 一個 port。

> **Answer:** One. The ARP reply is a unicast frame and the switch already learned the destination MAC address, so it forwards the frame out only one port (F0/1).

**Step 8 ➔** 檢查 ARP table（原文：Examine the ARP table. Note that the ICMP packet reappears. Open the PDU and examine the MAC addresses）
**解說**：部機收到 ARP reply 之後知到 172.16.31.3 嘅 MAC，之前「消失」咗嘅 ICMP packet 即刻重新出現，可以正常送出。

**Q6：Do the MAC addresses of the source and destination align with their IP addresses？（MAC 同 IP 係咪對得上？）**
**答：Yes。** ICMP 封包：source IP 172.16.31.2 ↔ source MAC `000C.85CC.1DA7`；destination IP 172.16.31.3 ↔ destination MAC `0060.7036.2849`，完全對應 Addressing Table。

> **Answer:** Yes. Each device's source/destination IP address aligns with its own MAC address as listed in the Addressing Table.

**Step 9 ➔** 轉返 **Realtime mode**，等 ping 完成；撳 172.16.31.2 → Command Prompt → 打 `arp -a`（原文：Switch back to Realtime and the ping completes. Enter the arp –a command）

**Q7：To what IP address does the MAC address entry correspond？（ARP table 個 MAC entry 對應邊個 IP？）**
**答：172.16.31.3。** `arp -a` 顯示 172.16.31.3 ↔ `0060.7036.2849` 呢條新學習到嘅記錄。

> **Answer:** 172.16.31.3. The new ARP cache entry maps 172.16.31.3 to its MAC address 0060.7036.2849.

**Q8：In general, when does an end device issue an ARP request？（一般嚟講，end device 幾時會出 ARP request？）**
**答：** 當主機要傳送封包俾同一個網絡（同一 broadcast domain）內嘅另一部主機，但 ARP cache 入面冇目的地 IP 對應嘅 MAC 記錄（未學過或者 cache 已過期）嘅時候，就會出 ARP request。傳去 remote network 嘅封包就改為 ARP 自己嘅 default gateway。

> **Answer:** An end device issues an ARP request when it needs to send a packet to another host on the same network but does not know (or no longer has a valid cache entry for) the destination MAC address. For remote destinations, it sends an ARP request for its default gateway instead.

### Part 2 ➔ 檢查 Switch MAC Address Table（Examine a Switch MAC Address Table）

**Step 1 ➔** 產生多啲 traffic 嚟填充 switch 嘅 MAC address table（原文：Generate additional traffic to populate the switch MAC address table）
**解說**：switch 係「透過觀察 frame 先學嘢」，冇 traffic 就冇得學，所以要主動製造 traffic。

**Step 2 ➔** 喺 172.16.31.2 嘅 Command Prompt 打 `ping 172.16.31.4`（原文：From 172.16.31.2, enter the ping 172.16.31.4 command）

**Step 3 ➔** 撳 10.10.10.2 → 開 Command Prompt → 打 `ping 10.10.10.3`（原文：Click 10.10.10.2 and open the Command Prompt. Enter the ping 10.10.10.3 command）

**Q9：How many replies were sent and received？（有幾多個 reply 送出同收到？）**
**答：4 個（4 out of 4，100% 成功）。** 預設 ping 會傳 4 個 ICMP echo request 並收到 4 個 echo reply。兩個 ping 都係咁。

> **Answer:** Four replies sent and four received (4 out of 4). By default, ping sends four ICMP echo requests and expects four echo replies.

**Step 4 ➔** 檢查 switch 嘅 MAC address table（原文：Examine the MAC address table on the switches）
**解說**：MAC address table 係 switch 嘅「記憶體」，記錄「邊個 MAC 喺邊個 port」。

**Step 5 ➔** 撳 **Switch1** → CLI tab → 打 `show mac-address-table`（原文：Click Switch1 and then the CLI tab. Enter the show mac-address-table command）

**Q10：Do the entries correspond to those in the table above？（entries 係咪對應上面張表？）**
**答：Yes。** Switch1 應該學到：`000C.85CC.1DA7` → F0/1（172.16.31.2）、`0060.7036.2849` → F0/2（172.16.31.3）、`0002.1640.8D75` → F0/3（172.16.31.4）、`00E0.F7B1.8901` → G0/1（Router1 G0/0）。

> **Answer:** Yes. Switch1 learned one MAC address per connected device on the correct ports, matching the Addressing Table.

**Step 6 ➔** 撳 **Switch0** → CLI tab → 打 `show mac-address-table`（原文：Click Switch0, then the CLI tab. Enter the show mac-address-table command）

**Q11：Do the entries correspond to those in the table above？**
**答：Yes。** Switch0 學到 `0060.2F84.4AB6` 同 `0060.4706.572B`（兩個無線設備）喺 F0/2，以及 Router0 嘅 `0001.6458.2501` 喺 G0/1。

**Q12：Why are two MAC addresses associated with one port？（點解一個 port 會對應兩個 MAC address？）**
**答：** 因為兩個無線設備（10.10.10.2 同 10.10.10.3）都係經同一個 wireless access point（無線 AP / router）連去 Switch0 嘅同一個 port（F0/2）。對 switch 嚟講，兩個 MAC 都係由同一個 port 入嚟，所以一 port 兩 MAC 係正常現象。

> **Answer:** Two wireless hosts (10.10.10.2 and 10.10.10.3) connect to Switch0 through the same physical port (F0/2) via a wireless access point, so the switch learns both MAC addresses on that single port.

### Part 3 ➔ 檢查 Remote Communications 嘅 ARP Process（Examine the ARP Process in Remote Communications）

**Step 1 ➔** 產生 traffic 嚟製造 ARP traffic（原文：Generate traffic to produce ARP traffic）

**Step 2 ➔** 撳 172.16.31.2 → Command Prompt → 打 `ping 10.10.10.1`（原文：Click 172.16.31.2 and open the Command Prompt. Enter the ping 10.10.10.1 command）

**Step 3 ➔** 打 `arp -a`（原文：Type arp –a）

**Q13：What is the IP address of the new ARP table entry？（新 ARP entry 嘅 IP 係咩？）**
**答：172.16.31.1（即 Router1 G0/0，default gateway）。** 目的地 10.10.10.1 喺 remote network，部機唔會直接 ARP 佢，而係 ARP 自己個 gateway 攞 MAC。

> **Answer:** 172.16.31.1, the default gateway (Router1's G0/0 interface). Because 10.10.10.1 is on a remote network, the host resolves the MAC address of its gateway instead.

**Step 4 ➔** 打 `arp -d` 清空 ARP table，轉去 **Simulation mode**，再 ping 多次 10.10.10.1（原文：Enter arp -d to clear the ARP table and switch to Simulation mode. Repeat the ping to 10.10.10.1）

**Q14：How many PDUs appear？（出現幾多個 PDU？）**
**答：2 個。** 一個係 ARP request（for gateway），另一個係 ICMP packet（等緊 MAC，同 Part 1 一樣會暫時「消失」）。

> **Answer:** Two PDUs appear: the ARP request and the ICMP echo request waiting for the ARP reply.

**Step 5 ➔** 撳 **Capture/Forward**，撳而家喺 Switch1 嗰個 PDU（原文：Click Capture/Forward. Click the PDU that is now at Switch1）

**Q15：What is the target destination IP address of the ARP request？（ARP request 嘅 target destination IP 係咩？）**
**答：172.16.31.1（唔係 10.10.10.1）。**

> **Answer:** The target destination IP address of the ARP request is 172.16.31.1, not 10.10.10.1.

**Q16：Why？（點解？）**
**答：** 因為 10.10.10.1 喺另一個網絡（remote network）。ARP request 係 broadcast，只會留喺本機網絡（broadcast domain）入面；要去 remote network，部機一定要將 frame 交俾 **default gateway**（172.16.31.1），所以先要 ARP 攞 gateway 嘅 MAC，再由 router 負責轉發去 10.10.10.0/24。

> **Answer:** ARP requests are broadcasts limited to the local network. The destination 10.10.10.1 is on a remote network, so the host must send the frame to its default gateway (172.16.31.1) and ARP resolves the gateway's MAC address instead.

**Step 6 ➔** 檢查 Router1 嘅 ARP table（原文：Examine the ARP table on Router1）
**解說**：轉返 **Realtime mode** → 撳 Router1 → CLI tab。

**Step 7 ➔** 入 privileged EXEC mode，然後打 `show mac-address-table`（原文：Enter privileged EXEC mode and then the show mac-address-table command）

**Q17：How many MAC addresses are in the table？Why？（Router1 個 MAC table 有幾多個 MAC？點解？）**
**答：1 個。** 得 Router1 自己 G0/0 嘅 MAC（`00E0.F7B1.8901`）。Router 唔似 switch 咁會由經過嘅 traffic 學習 MAC——router 只知道自己 interface 嘅 MAC；而 S0/0/0 係 serial interface，根本冇 MAC address。

> **Answer:** Only one. A router does not learn MAC addresses from forwarded traffic like a switch does; it only knows the MAC address of its own G0/0 interface, and the serial interface S0/0/0 has no MAC address.

**Step 8 ➔** 打 `show arp`（原文：Enter the show arp command）

**Q18：Is there an entry for 172.16.31.2？（有冇 172.16.31.2 嘅 entry？）**
**答：Yes。** Router1 頭先收到 172.16.31.2 出嘅 ARP request 並且回覆咗，所以 router 嘅 ARP cache 已經記低 172.16.31.2 ↔ `000C.85CC.1DA7`。

> **Answer:** Yes. Router1 learned the MAC address of 172.16.31.2 when it received and replied to the host's ARP request.

**Q19：What happens to the first ping in a situation where the router responds to the ARP request？（如果 router 有回應 ARP request，第一個 ping 會點？）**
**答：第一個 ping 會成功（唔會 timeout）。** 因為 router 一答咗 ARP request，部機即刻有 gateway 嘅 MAC，可以即刻送出 ICMP packet，唔使等 ARP 完成，所以第一個 ping 已經成功。

> **Answer:** The first ping succeeds immediately because the router answered the ARP request, so the host already has the gateway's MAC address and can send the ICMP packet without delay.

💡 **加分概念**：喺真實網絡，如果 router 自己都要先做 ARP（例如要再搵下一跳），第一個 ping 往往會 lost / timeout，第二個先成功——呢個就係出名嘅 **"first ping lost"** 現象。

---

## 💻 關鍵 CLI 指令庫

### 教材內出現嘅指令（本 Lab 必用）

```text
! ===== Windows / PC（Command Prompt）=====

arp -d                    ! 清空 ARP table（delete 所有 IP↔MAC cache 記錄）
arp -a                    ! 顯示 ARP table（列出所有 IP address 對應嘅 MAC address）
ping 172.16.31.3          ! 測試連通性：向 172.16.31.3 傳 4 個 ICMP echo request
ping 172.16.31.4          ! 測試連通性：向 172.16.31.4 傳 4 個 ICMP echo request
ping 10.10.10.3           ! 測試連通性：向 10.10.10.3 傳 4 個 ICMP echo request
ping 10.10.10.1           ! 測試連通性：向 gateway/remote 設備傳 4 個 ICMP echo request

! ===== Cisco IOS（Switch1 / Switch0 / Router1 嘅 CLI）=====

enable                    ! 由 user EXEC mode 進入 privileged EXEC mode（本 Lab 要求）
show mac-address-table    ! 顯示 switch 學到嘅 MAC address table（MAC ↔ port 對應）
show arp                  ! 顯示 router 嘅 ARP cache（IP ↔ MAC ↔ interface 對應）
```

### 延伸必備指令（Practical Test 隨時會考，全部背熟）

```text
! ===== Windows / PC（Command Prompt）=====

ipconfig                  ! 顯示本機 IP address / subnet mask / default gateway
ipconfig /all             ! 顯示完整設定，包括 MAC address（Physical Address）
ping -t 172.16.31.3       ! 不停 ping（直至 Ctrl+C 停止）
ping 172.16.31.3 -n 1     ! 只 ping 一次（-n 指定次數）

! ===== Cisco IOS（Router / Switch）=====

enable                    ! 入 privileged EXEC mode
configure terminal        ! 入 global configuration mode（簡稱 config t）
interface g0/0            ! 進入指定 interface 嘅 config mode
ip address 172.16.31.1 255.255.255.0   ! 設定 interface 嘅 IP address 同 subnet mask
no shutdown               ! 啟動（enable）interface
exit                      ! 返回上一層 mode
show ip interface brief   ! 顯示所有 interface 嘅 IP、狀態（up/down）、protocol
show arp                  ! 顯示 ARP cache（Router 用；Switch 用 show mac-address-table）
show mac-address-table    ! 顯示 MAC address table（Switch 用）
show running-config       ! 顯示目前生效嘅設定
```

> **CLI command rules:** Cisco IOS commands are case-insensitive but must be spelled correctly; `show` commands are read-only and safe to run at any time; configuration commands require `configure terminal`.

---

## 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| `ping` 出現 **Request timed out** | 目的地未回覆 ICMP；常見係 ARP 未解析到 MAC、IP/gateway 設錯、線路或設備未 up | 先用 `arp -d` 清 cache 再 ping；檢查 `ipconfig` 嘅 IP 同 default gateway；檢查線路同 interface 狀態 |
| `ping` 出現 **Destination host unreachable** | 主機自己冇 route 去目的地（通常係冇設 default gateway，或者 subnet 錯） | 檢查 `ipconfig`：同網段要一致，remote 網段一定要有 default gateway |
| `arp -a` 顯示 **No ARP entries found** / 得 1–2 條 | ARP cache 係空嘅，或者未產生過 traffic | 先 ping 目標設備產生 traffic，再打 `arp -a` 睇新 entry |
| Simulation mode 見唔到 PDU / 得一個 PDU | 未清 ARP cache（部機直接用舊記錄，冇出 ARP request）；或者未開 Simulation mode 就 ping 咗 | 打 `arp -d` 清 cache；確認右下角係 **Simulation** 模式；關閉 Command Prompt 再重新操作 |
| ICMP PDU「消失咗」／停咗喺 switch | 呢個唔係 error！ICMP 等緊 ARP reply，攞到 MAC 先會重新出現 | 繼續撳 **Capture/Forward**，唔好重開 ping |
| 打 `show mac-address-table` 但 switch 冇 entries | 未產生過 traffic，switch 冇機會學習 MAC | 由主機 ping 目標（如 `ping 172.16.31.4`）產生 traffic 再睇 |
| 喺 switch 打 `show arp` 無反應／error | L2 switch 冇 ARP cache，`show arp` 主要係 router 指令 | Switch 用 `show mac-address-table`；Router 先可以用 `show arp` |
| 教材寫 **Router0 Gg0/0** | 教材 XML 轉換 typo，實際係 **G0/0** | 睇 MAC table 時用 G0/0，唔好打 Gg0/0 |
| 一個 switch port 出現兩個 MAC | 正常：兩個無線設備經同一個 AP／port 接入（如 F0/2 有 10.10.10.2 同 .3） | 唔使修；答題時解釋因為設備經同一 port 連入 |
| 第一個 ping remote host 失敗，第二個成功（first ping lost） | Router 要時間做自己嘅 ARP resolution / 更新 FIB，第一個 packet 通常被 drop | 再 ping 一次即成功；答題時講得出「first ping lost」現象就加分 |
| Ping 同網段得，ping remote 唔得 | Default gateway 冇設／router 冇 route／serial link down | 檢查主機 gateway、router `show ip interface brief` 同 serial 兩邊 status |

---

## 📝 測驗常見題型（Practical Test 應試重點）

### 題型 1 ➔ 設定 / 檢查 IP（PC 同 Router 兩邊都要識）

- **PC 端**：`ipconfig` 睇 IP、subnet mask、default gateway；考題通常俾你一張 Addressing Table，叫你核對或者指出錯處。
  > Answer points: Compare the PC's IP, subnet mask and default gateway against the Addressing Table; on the same LAN all devices must use the same subnet mask.
- **Router 端**：`enable` → `configure terminal` → `interface g0/0` → `ip address 172.16.31.1 255.255.255.0` → `no shutdown` → `exit`。答題要講得出每個指令做咩。
  > Answer points: Router interfaces need an IP address, a subnet mask, and must be brought up with `no shutdown`.

### 題型 2 ➔ 檢查 ARP 表（最核心，必考）

- PC：`arp -a` 睇 IP ↔ MAC 對應；`arp -d` 清空後再 ping 可以逼部機重新 ARP。
- Router：`show arp` 睇 router 學到嘅 IP ↔ MAC。
- 常問：**新 entry 對應邊個 IP？** ——記住：ping remote host 時新 entry 係 **default gateway** 嘅 IP（如 172.16.31.1），唔係目的地嘅 IP。
  > Answer points: `arp -a` shows the IP-to-MAC cache; after pinging a remote host, the new entry is the default gateway's IP, because remote traffic is sent to the gateway first.

### 題型 3 ➔ ping 測試 + Simulation mode 數 PDU

- 常問：**ping 產生幾多個 PDU？**（答：2 個——ARP request + ICMP）；**Switch1 複製咗幾多份？**（broadcast 答 3 份——除入 port 之外全部 port；unicast reply 答 1 份）。
  > Answer points: A ping produces two PDUs (ARP + ICMP); a broadcast frame is flooded to every port except the ingress port; a unicast frame is forwarded out only the matching port.
- 判斷 broadcast vs unicast：睇 destination MAC 係 `FFFF.FFFF.FFFF`（broadcast）定係一部設備嘅 MAC（unicast）。

### 題型 4 ➔ Switch MAC Address Table

- `show mac-address-table` 輸出格式：MAC address | Type | Port。
- 常問：**entries 對唔對得上 Addressing Table？**——逐個 MAC 核對設備同 port。
- 常問：**點解一個 port 有兩個 MAC？**——因為兩個無線設備經同一個 AP / port 接入（如 F0/2）。
  > Answer points: The switch MAC table maps each learned MAC address to a port; multiple MACs on one port usually mean multiple devices share that port (e.g., via a wireless access point).

### 題型 5 ➔ Router 嘅 MAC / ARP 概念題

- **Router 個 MAC table 有幾多個 entry？點解？** ——只有自己 interface 嘅 MAC（G0/0），serial 冇 MAC；router 唔會好似 switch 咁由 traffic 學習 MAC。
  > Answer points: A router's MAC table contains only its own interface MACs; routers do not learn MAC addresses from forwarded frames — that is a switch behaviour.
- **有冇 172.16.31.2 嘅 entry？** ——有，因為 router 回覆過佢嘅 ARP request。
- **第一個 ping 會點？** ——router 有回應 ARP 就即刻成功；否則可能 first ping lost。

### 題型 6 ➔ 概念短答（背熟呢幾句）

- 幾時出 ARP request？——要傳封包俾同網絡主機，但冇佢嘅 MAC 記錄（cache 空／過期）。
- 點解 remote 通訊要經 gateway？——ARP broadcast 唔會跨網絡，跨網絡要由 router 轉發。
- ARP request vs reply：request = broadcast；reply = unicast。

> **Exam tips:** Always answer questions using the actual MAC addresses from the Addressing Table; mention broadcast/unicast and flooding/forwarding explicitly; when asked "why", relate the answer to the default gateway role or the switch learning process.

---

## ✅ 完成 Checklist（做完 Lab 前對一次）

- [ ] 成功喺 Simulation mode 睇到 ping 產生 2 個 PDU（ARP + ICMP）
- [ ] 答啱 ARP request 嘅 destination MAC 係 broadcast `FFFF.FFFF.FFFF`（唔喺表內）
- [ ] 答啱 Switch1 flooding 3 份、ARP reply 只轉發 1 份
- [ ] 答啱 ARP reply 嘅 source / destination MAC 會對調
- [ ] `arp -a` 睇到 172.16.31.3 嘅 entry
- [ ] `show mac-address-table` 喺 Switch1 / Switch0 睇到 entries 對得上 Addressing Table，並解釋到 F0/2 有兩個 MAC
- [ ] 答啱 remote ping 嘅新 ARP entry 係 gateway 172.16.31.1，唔係 10.10.10.1
- [ ] Router1 `show arp` 見到 172.16.31.2，並解釋到 router MAC table 只有自己 interface 嘅 MAC
- [ ] 答啱 router 回應 ARP 後第一個 ping 即刻成功

> **Lab complete criteria:** you can explain every ARP PDU you observed, justify every number of copies a switch made, and answer why the gateway appears in the host ARP table for remote pings.
