# ART T3 PH6：主機淪陷（Host Compromise）— 攻擊鏈⑥ 雙語學習指南

> **原教材**：Advanced Red Team — Tutorial 3（PDF p.120–126）｜覆蓋 section：§11
> **階段定位**：攻擊鏈第 ⑥ 階段「主機淪陷（Host Compromise：web → host 權限提升）」
> **前置階段**：需先完成 ③ 權限提升（web 層取得檔案讀取／執行能力）同 ⑤ 橫向檔案存取（LFI 檔案讀取原語）
> **相關檔**：➜ 見 `ART_T3_05_PrivilegeEscalation_StudyGuide.md`（web 層權限提升，§3）
> ➜ 見 `ART_T3_07_LateralFileAccess_StudyGuide.md`（LFI 檔案讀取，§10）
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 跟 walkthrough 做一次 → 最後對照懶人包自測

---

## 📝 1. 主機淪陷 概要與實務情境

本階段係攻擊鏈嘅**最後一站**：你已經由 web 應用層「打成一片」（§3 IDOR／BAC／Upload RCE 取得 web 層立足點，§10 LFI 取得任意檔案讀取），但**web 層嘅權限唔等於主機權限**。攻擊鏈⑥要做嘅，係由 web user（例如 `www-data`）跨越到**主機（host）層**嘅特權帳號（`root` 或 administrator），達致「全機控制」。原文 §11 示範嘅路線唔係用 reverse shell，而係**用 LFI 讀取主機內部備忘錄（internal memos）→ 由文件洩露嘅密碼規律重建出 root 密碼 → SSH 登入成 root**。呢條線嘅關鍵洞察係：**開發者／維運人員會把內部文件放在 web 可以讀到嘅路徑，而文件內容會洩露密碼模式或憑證**。

原文將此技巧歸類到 **MITRE ATT&CK TA0004 — Privilege Escalation**，並指出經典嘅權限提升向量包括 **SUID abuse（濫用 SUID）、sudo misconfiguration（sudo 設定錯誤）、以及本靶場示範嘅 weak predictable credentials（可預測嘅弱憑證）**。靶場把內部備忘錄放在 `/home/tyz/host_hints/IT_Notice.txt` 同 `/opt/IT/password_policy.txt`，內容描述一個 **9 字元嘅 keyboard-walk 模式**：三個連續數字 + 三個頂排字母 + 三個 Shift 符號，最後得出唯一一個候選密碼 `123qwe!@#`，而該密碼被特權系統帳號重用。

實務情境一：一次內部滲透測試，你已經透過 LFI 睇到伺服器檔案。資深測試員會做嘅下一步係「**掃主機上會放秘密嘅位置**」（家目錄、`/tmp`、`/opt`、web 可讀路徑），搵名似秘密嘅檔（`password_policy.txt`、`IT_Notice.txt`、`.bash_history`），因為**這些檔成日洩露可重用憑證**，比慢慢爆 hash 快得多。

實務情境二：真實事故／勒索軟件攻擊報告中，最常見嘅 root cause 之一正係「**特權帳號用弱或可預測密碼＋冇 MFA**」——攻擊者由一個低權限 web 立足點，一路爬到 root，最後部署勒索軟件（ransomware）。OWASP 把這類問題列為 **A07:2021 — Identification and Authentication Failures**。原文明確指出：弱或可預測嘅特權密碼，配合缺失嘅 MFA，**至今仍然係主機淪陷（host compromise）與 ransomware 部署嘅主要根因**。

---

## 🎯 2. 學習目標

1. **解釋主機淪陷在攻擊鏈的位置** — Explain where host compromise sits in the kill chain: escalating from a low-privilege foothold to root/full host control
2. **對應 MITRE ATT&CK 分類** — Map host privilege escalation to MITRE ATT&CK TA0004 — Privilege Escalation
3. **辨識經典主機權限提升向量** — Identify classic vectors: SUID abuse, sudo misconfiguration, weak predictable credentials
4. **用 file-read primitive 掃主機敏感位置** — Use a file-read primitive (e.g. LFI) to sweep home directories, `/tmp`, `/opt`, and web-readable paths
5. **辨認「似秘密」的檔名與關鍵詞** — Recognise secret-bearing filenames (`password_policy.txt`, `IT_Notice.txt`, `notes.txt`, `.bash_history`) and keywords (`password`, `root`, `pattern`, `policy`)
6. **重建 keyboard-walk 密碼** — Reconstruct a 9-character keyboard-walk password from a documented pattern
7. **由 `/etc/passwd` 識別特權帳號** — Identify a privileged account (UID 0) from `/etc/passwd`
8. **評估 MFA 對風險的影響** — Assess how MFA changes the risk calculus on privileged accounts
9. **對應 OWASP 分類** — Map to OWASP A07:2021 — Identification and Authentication Failures
10. **寫出主機權限提升報告** — Write a privilege-escalation finding report that a client can act on

---

## 🧩 3. 零經驗先修（Prerequisites, in plain words）

**3.1 Foothold（立足點）**
一句定義：攻擊者已經「入到去」嘅最初落腳點，通常係一個低權限帳號（例如 web server 嘅 `www-data`）。
生活比喻：好似你偷到公司後門鎖匙，只夠入到雜物房，未上到管理層樓層。
English: A foothold is the initial low-privilege access an attacker obtains on a system.

**3.2 Privilege Escalation（權限提升，簡稱 privesc）**
一句定義：由低權限帳號升到高權限帳號（`root`／administrator）嘅過程。
生活比喻：由雜物房搵到一張萬能門卡，可以入埋伺服器機房。
English: Privilege escalation is moving from a low-privilege account to a higher-privilege one (root or administrator).

**3.3 www-data（web server 使用者）**
一句定義：Linux 上 web server（Apache/Nginx）用來跑網站嘅低權限系統帳號。
生活比喻：公司嘅「外判清潔工」——可以出入大堂做嘢，但入唔到夾萬房。
English: `www-data` is the low-privilege system account under which the web server process typically runs.

**3.4 LFI（Local File Inclusion，本地檔案包含）**
一句定義：web app 接受使用者控制嘅參數去讀取／包含伺服器本機檔案嘅漏洞；本階段把它當成「**file-read primitive（檔案讀取原語）**」用。
生活比喻：圖書館嘅「幫你影印任何書」服務——你講得出書名同書架位置，佢就幫你影印出嚟。
English: LFI lets an attacker make the application read local host files they should not be able to access.
> ➜ LFI 本身嘅原理詳解見 `ART_T3_07_LateralFileAccess_StudyGuide.md`（§10）；本檔只把它當工具用。

**3.5 Keyboard-walk password（鍵盤漫步密碼）**
一句定義：手指沿住鍵盤上一條相鄰路徑逐格打，例如 `1q2w3e`、`123qwe!@#`，表面符合複雜度規則但極易被猜。
生活比喻：喺鍵盤上「拖地」而唔係打有意義嘅字；好記但全世界都識嘅路徑。
English: A keyboard-walk password is a password formed by walking along adjacent keys, e.g. `123qwe!@#`.

**3.6 SUID（Set Owner User ID）**
一句定義：Linux 檔案權限位；一個設了 SUID 嘅執行檔，執行時會以**檔案擁有者**（可能係 root）嘅身份運行，而唔係執行者。
生活比喻：一張「以老闆名義簽名」嘅授權印章——你用嘅時候，簽出嚟嘅文件等於老闆簽。
English: A SUID binary runs with the privileges of its file owner (often root), not the user who launches it.

**3.7 sudo 與 sudoers 設定**
一句定義：`sudo` 讓指定使用者以 root 身份執行指定命令；設定檔 `/etc/sudoers` 若寫得太寬鬆（例如 `NOPASSWD`、萬用 `ALL`）就係經典權限提升弱點。
生活比喻：前台有一本「誰可以用管理員房」嘅白名單；白名單寫錯，清潔工都可以用管理員房。
English: sudo misconfiguration in `/etc/sudoers` (e.g. overly broad `ALL` or `NOPASSWD` rules) is a classic privilege-escalation vector.

**3.8 MFA（Multi-Factor Authentication，多因子認證）**
一句定義：登入時除密碼外，仲要第二種證明（一次性驗證碼、硬件鎖匙、生物特徵）。
生活比喻：夾萬除咗密碼，仲要你嘅指紋——偷到密碼都開唔到。
English: MFA requires a second proof of identity beyond the password, so a stolen password alone is not enough.

**3.9 `/etc/passwd`**
一句定義：Linux 記錄本機所有帳號清單嘅檔案；每行格式係 `用戶名:x:UID:GID:說明:家目錄:登入 shell`，**UID 0 即係 root**。
生活比喻：公司員工名冊；見到「職級 = 0」就係最高話事人。
English: `/etc/passwd` lists local accounts; a UID of 0 identifies the root account.

**3.10 ssh（Secure Shell）**
一句定義：由終端機遠端登入另一部 Linux 主機嘅加密協定／指令。
生活比喻：一條加密嘅專用隧道，你由自己嘅電腦「行過去」對面主機嘅終端機。
English: ssh is the standard encrypted remote-login protocol/command on Linux.

---

## 📖 4. 逐節深度知識點重寫

### 4.1 What is it and why does it work?（原文 p.120）

繁中拆解：攻到一個主機嘅 foothold 之後，攻擊者通常會嘗試**升級到 root 或 administrator 帳號**——原文講到「the bridge between an initial low-privilege foothold and full system control」（由初始低權限立足點通往全系統控制嘅橋樑）。MITRE ATT&CK 把這類技巧歸入 **TA0004 — Privilege Escalation**，並列舉經典向量：**SUID abuse、sudo misconfiguration，以及本靶場示範嘅 weak predictable credentials**。

> **English Standard Definition:** After gaining a foothold on a server, an attacker often tries to escalate privileges to root or an administrator account — the bridge between an initial low-privilege foothold and full system control.

> **English Standard Definition:** MITRE ATT&CK groups these techniques under TA0004 — Privilege Escalation; classic vectors include SUID abuse, sudo misconfiguration, and — as in this lab — weak predictable credentials.

> ⚠️ 教材外補充：原文列出嘅三個向量，新手要分清楚「**本靶場用邊個**」同「**其他係咩**」：
> - **SUID abuse**：搵到一個設了 SUID（以 root 身份運行）嘅程式，而佢可以被低權限用戶操控去讀／寫任意檔（例如誤用 `system()` 呼叫）。
> - **sudo misconfiguration**：`sudo -l` 睇到可以免密碼或可以用萬用字元執行特權命令。
> - **weak predictable credentials（本靶場用呢個）**：由內部文件得知特權帳號密碼規律，直接 SSH 登入。
> 三者都係「唔使爆 kernel exploit」嘅低技術門檻路線，所以最常出現喺實際測試中。

### 4.2 靶場洩露的內部備忘錄與 keyboard-walk 模式（原文 p.120）

繁中拆解：靶場把內部備忘錄放喺兩個位置——`/home/tyz/host_hints/IT_Notice.txt` 同 `/opt/IT/password_policy.txt`。兩個檔描述同一個 **9 字元 keyboard-walk 模式**：**三個連續數字、三個頂排字母、三個 Shift 符號**。原文逐步拆解呢條「鍵盤漫步」：

1. 由數字排開始 → `1` `2` `3`
2. 落一行去字母排 → `q` `w` `e`
3. 按住 Shift，再撳同一批數字鍵 → `Shift+1`、`Shift+2`、`Shift+3` → 得出符號 `!` `@` `#`
4. 三段串埋 → **`123qwe!@#`**

原文指出呢個密碼被**一個特權系統帳號重用**。所以「知道模式」＝「知道答案」。

> **English Standard Definition:** This lab stores internal memos at /home/tyz/host_hints/IT_Notice.txt and /opt/IT/password_policy.txt.

> **English Standard Definition:** ...start on the digit row with 1 2 3, step down one row to the letters q w e, then hold Shift and press the same digit keys again — Shift+1, Shift+2, Shift+3 — which yields the shifted symbols ! @ #.

> ⚠️ 教材外補充：留意 `! @ #` 呢三個 Shift 符號本身**唔係隨機**——佢哋只係「同一批數字鍵按住 Shift」，所以「三個數字 + Shift 同三鍵」呢句描述**只有唯一一個解**（`123qwe!@#`）。呢個就係「**key-space（密鑰空間）縮到 1**」嘅核心：文件把一個理論上 95⁹ 嘅密碼空間，直接揭露成 1 個候選。

> ⚠️ 教材外補充：密碼包含 `!@#` 等符號**滿足咗「複雜度規則」**（有大細寫、數字、符號），所以一般密碼政策檢查會放行——但佢依然係極弱密碼。呢點正好係原文明言「despite satisfying complexity rules」嘅荒謬所在。

### 4.3 OWASP 與結論（原文 p.120）

繁中拆解：原文把此問題對應到 **OWASP A07:2021 — Identification and Authentication Failures**，並下結論：內部備忘錄記錄咗 root 密碼嘅**確切 key-space**，而 `123qwe!@#` 呢類 keyboard-walk 早已經收入常見嘅**爆密字典（cracking dictionaries）**；加上特權帳號**冇第二因子**，所以「**一個估中嘅憑證就足夠拿到全主機控制**」。

> **English Standard Definition:** OWASP mapping: A07:2021 — Identification and Authentication Failures.

> **English Standard Definition:** Conclusion: the memos document the exact key-space of the root password, and keyboard-walk patterns such as 123qwe!@# already appear in common cracking dictionaries.

> ⚠️ 教材外補充：呢個結論有兩層風險疊加——(1) **資訊洩露**（文件放喺 web 可讀路徑）；(2) **弱認證**（可預測密碼 + 冇 MFA）。任何一層修好都足以斷鏈；兩者同時出現就等於門匙插喺門鎖度。

### 4.4 How to fix（for defenders）（原文 p.121）

繁中拆解：原文給防守方嘅修法有四點：

1. **為特權帳號強制使用強且唯一嘅密碼**，並**拒絕 keyboard-walk 或字典模式**（唔止檢查「有冇符號」，要擋「鍵盤路徑」）。
2. **管理員存取必須要求 MFA**。
3. **把內部政策文件移出任何 web 可讀路徑**（outside any web-readable path）。

> **English Standard Definition:** How to fix (for defenders): enforce strong, unique passwords for privileged accounts and reject keyboard-walk or dictionary patterns, require MFA for administrative access, and keep internal policy documents outside any web-readable path.

> ⚠️ 教材外補充：留意原文寫「How to find it」嗰句用詞係「Use any file-read primitive (for example, LFI) to request common host locations such as user home directories, /tmp, /opt, and web-readable paths.」——即係修法要覆蓋嘅位置就係攻擊者會掃嘅位置：**家目錄、`/tmp`、`/opt`、web 可讀路徑**。

### 4.5 How to find it（原文 p.121–122）

繁中拆解：原文列出搵呢類漏洞嘅方法，逐步如下（每步都保留原文 bullet 對應）：

1. **用任何 file-read primitive（例如 LFI）** 去請求主機常見位置：**user home directories、`/tmp`、`/opt`、web 可讀路徑**。
2. **留意名似秘密嘅檔名**，例如 `password_policy.txt`、`IT_Notice.txt`、`notes.txt`，或 shell 歷史檔如 `.bash_history`。
3. **睇 response source（回應原始碼）**，搜關鍵詞如 `password`、`root`、`pattern`、`policy`。
4. **把多個洩露拼埋**：將搵到嘅密碼模式／憑證，配對由 `/etc/passwd` 或 process listings（程序清單）識別到嘅特權帳號。
5. **檢查特權帳號有冇 MFA 保護**：冇 MFA 嘅話，一個估中嘅憑證就可能拿到全主機控制。

> **English Standard Definition:** Use any file-read primitive (for example, LFI) to request common host locations such as user home directories, /tmp, /opt, and web-readable paths.

> **English Standard Definition:** Filenames like password_policy.txt, IT_Notice.txt, notes.txt, and .bash_history signal secrets.

> **English Standard Definition:** Combine the leaks: match a discovered password pattern or credential to a privileged account identified from /etc/passwd or process listings.

> **English Standard Definition:** Without MFA on the privileged account, one guessed credential may grant full host control.

> ⚠️ 教材外補充：點解要「**拼埋（combine）**」兩份文件？因為單一文件可能只講「有 9 字元模式」，另一份才講「呢個模式用喺特權帳號」。攻擊者係把**碎片化嘅資訊逐塊拼成一條完整攻擊假設**——呢個就係 §11 標題「via Internal Hints（靠內部線索）」嘅意思：唔係一招打爆，而係收集線索推導。

> ⚠️ 教材外補充（關於 app 內部 hints）：原文 §11 只示範「主機檔案系統」側嘅線索。實務上，**web app 自己嘅內部線索**同樣可以通往主機層，例如：應用程式設定檔（如 `config.php` 之類）內嘅資料庫密碼、SMTP／API 憑證；連去**內部 API（internal API）** 嘅端點同 token；以及原始碼／備份檔（如 `.git`、`*.bak`、`*.old`）內嘅硬編碼憑證。呢類憑證往往**重複使用於系統帳號**（password reuse），於是 web 層嘅資訊洩露就變成主機層嘅立足點。此段屬教材外補充，因為唯一原文來源（§11）只列舉主機路徑，未提及 app 內部設定檔。

---

## 🛠️ 5. 逐節實戰步驟（Try it yourself — Walkthrough）

> 原文嘅步驟係 **1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6**。以下逐字保留 URL 同指令，一字不改。環境中立講法：所有 URL 用 `http://localhost:8080/`，即係喺**跑住靶場嘅 VM／lab 環境**度開 Firefox 做。

### 步驟 1 — 由主機家目錄讀取內部備忘錄（原文 p.123）

- **做乜**：用 LFI 參數 `lang` 直接請求主機家目錄底下嘅備忘錄。
- **喺邊度睇**：喺 Firefox 開以下網址：
```
http://localhost:8080/index.php?lang=../../../../../../home/tyz/host_hints/IT_Notice.txt
```
- **睇咩**：喺回應度**右鍵 → View page source（檢視頁面原始碼）**。備忘錄文字會出現喺正常頁面 HTML 之前。
- **預期結果**：備忘錄描述一個 **9 字元模式**：三個連續數字、三個頂排字母、三個 Shift 符號。

> **圖示描述**：畫面顯示瀏覽器「檢視頁面原始碼」視窗，內容係網頁回應嘅 HTML；最頂位置（正常頁面 HTML 之前）夾雜住一段純文字備忘錄，描述一個 9 字元密碼模式（三個連續數字、三個頂排字母、三個 Shift 符號）。此為 Firefox「View page source」畫面（原教材截圖 Screenshot 65，本筆記不轉載圖片）。

### 步驟 2 — 讀取官方密碼政策檔（原文 p.124）

- **做乜**：用同一 LFI 參數讀官方密碼政策檔。
- **喺邊度睇**：Firefox 開：
```
http://localhost:8080/index.php?lang=../../../../../../opt/IT/password_policy.txt
```
- **睇咩**：同樣**睇頁面原始碼**，政策檔內容會出現喺頁面原始碼頂部。
- **預期結果**：政策檔**確認同一個 keyboard-walk 模式**，並講明呢個模式**用於特權帳號**（privileged accounts）。

> **圖示描述**：畫面顯示頁面原始碼，最頂一段係 `password_policy.txt` 嘅內容，文字確認所描述嘅 keyboard-walk 模式係套用於特權帳號。此為 Firefox 檢視原始碼畫面（原教材截圖 Screenshot 66，本筆記不轉載圖片）。

> ⚠️ 教材原文如此：原文 Screenshot 編號由 65、66、67 忽然跳到 **99**（步驟 5 用）。原文已註明內嵌截圖引用 **Screenshot 01–110、號碼有跳**；本筆記一律照原教材編號標示，唔會補號或改號。

### 步驟 3 — 由模式重建密碼（原文 p.124）

- **做乜**：把兩份備忘錄拼埋，得出**唯一一個** 9 字元候選密碼。
- **推理**：三個連續數字（`1 2 3`）+ 三個頂排字母（`q w e`）+ 三個 Shift 符號（`! @ #`）→ **`123qwe!@#`**。
- **做咩記錄**：原文叫你把重建出嘅密碼**寫低**，留待下一步用。你手上現在**正好一個** 9 字元候選密碼。
- **成功點**：你寫低嘅係 `123qwe!@#`（唯一解）。
- **失敗點**：如果你得出多過一個候選（例如誤以為 `!@#` 可換成其他符號），即係未理解「Shift + 同一批數字鍵」嘅唯一性。

### 步驟 4 — 識別主機上嘅特權帳號（原文 p.124）

- **做乜**：提示講「模式適用於所有特權帳號」，下一步就係確定要試邊個帳號。用 LFI 讀主機帳號資料庫：
```
http://localhost:8080/index.php?lang=../../../../../../etc/passwd
```
- **睇咩**：**睇頁面原始碼**，入面會列出主機帳號。
- **預期結果**：搵到 **UID 0** 嘅特權帳號，原文例子係 `root:x:0:0:root:/root:/bin/bash`。

> **圖示描述**：畫面顯示頁面原始碼列出 `/etc/passwd` 內容，每行格式為 `用戶名:x:UID:GID:說明:家目錄:登入shell`；其中一行係 `root:x:0:0:root:/root:/bin/bash`（UID 0）。此為 Firefox 檢視原始碼畫面（原教材截圖 Screenshot 67，本筆記不轉載圖片）。

> ⚠️ 教材外補充：`/etc/passwd` 現代 Linux 一般已唔存密碼 hash（密碼 hash 已搬去 `/etc/shadow`，只有 root 讀到），但**佢仍然係識別特權帳號嘅最佳名單**——攻擊者要嘅係「有邊個 UID 0 帳號可以用」，而唔係即刻拿到 hash。

### 步驟 5 — 登入特權帳號（原文 p.125）

- **做乜**：呢一步**唯一一個喺瀏覽器以外做**嘅步驟。喺**跑住靶場嘅機器**上開終端機（terminal）。
- **落指令**：
```
ssh root@localhost
```
- **睇咩**：系統提示輸入密碼時，輸入步驟 3 重建出嘅密碼。
- **預期結果**：你被掉入一個 **root shell**，提示符係 `root@…:~#`（結尾 `#` 代表 root）。
- **成功點**：見到 `root@…:~#`，你就由「web 檔案讀取」升級到**全主機控制**。
- **失敗點**：如果提示 `Permission denied`，多數係密碼打錯（留意 `!` `@` `#` 喺 shell 可能有歷史展開問題）或 account 名唔啱。

> **圖示描述**：畫面顯示終端機執行 `ssh root@localhost` 後，成功登入並出現 root 提示符 `root@…:~#`，代表已取得 root shell。此為終端機登入畫面（原教材截圖 Screenshot 99，本筆記不轉載圖片）。

> ⚠️ 教材外補充：喺 shell 打含 `!` 嘅密碼時，Bash 嘅 **history expansion（歷史展開）** 可能干擾輸入（`!` 後面嘅字元會被當成歷史查詢）。安全做法係喺提示符輸入時避免特殊字元被誤解，或使用引號／先 `set +H` 關閉 history expansion。原文冇提呢個卡點，但零經驗學生極易撞。

### 步驟 6 — 收尾（Recap）（原文 p.125）

- **做乜**：對照 theory block 理解整條鏈。
- **重點**：同一個 LFI 檔案讀取，**洩露咗記錄 root 密碼 key-space 嘅內部備忘錄**；而因為**冇 MFA**，**一個估中嘅憑證就足夠**拿到全主機控制。
- **一句總結**：`LFI file-read → internal memos → reconstruct password → SSH as root → full host control`。

---

## 🧩 6. 新手補充：零經驗專用講解

### 6.1 Web shell 同 host shell 分別（超重要！）

> ⚠️ 教材外補充：
> - **Web shell（網頁 shell）**：你嘅「立足點」係跑喺 **web server 進程權限** 之下（通常 `www-data`）。就算你透過 RCE 攞到「一個 shell」，你嘅身份依然係 `www-data`——你能讀／寫嘅檔案，受 `www-data` 嘅權限限制。你嘅指令由一個 **web 請求觸發**（例如把命令藏喺 HTTP 參數），輸出經 HTTP 回應返俾你。
> - **Host shell（主機 shell）**：你係**直接登录到主機本身**（例如 SSH 到 `root@localhost`），以 `root` 身份喺主機嘅作業系統上落指令。你唔再受 web server 權限限制，可以讀 `/etc/shadow`、改 `/etc/sudoers`、安裝後門、加帳號。
> - **本階段的關鍵**：原文示範嘅**唔係**由 web shell 直接 spawn 一個 host shell，而係用 **web 層嘅檔案讀取能力偷到 root 密碼，再用 SSH 真正登入主機**。呢個分別好重要：攻擊鏈⑥嘅本質係「**由 web 層漏洞跳到主機層憑證**」，而唔一定係「web 進程本身提權」。
> - 一句記法：**Web shell ＝ 你企喺網頁後面；Host shell ＝ 你坐喺主機前面。**

### 6.2 「本檔範圍 vs 其他階段」唔好混淆

> ⚠️ 教材外補充：
> - **§3（web 層權限提升）**＝把 web app 內嘅權限玩大（IDOR、Broken Access Control、Upload RCE），令你可以喺 web app 度做高權限操作。➜ 見 `ART_T3_05_PrivilegeEscalation_StudyGuide.md`。
> - **§10（LFI）**＝令 web app 幫你讀本機檔案。➜ 見 `ART_T3_07_LateralFileAccess_StudyGuide.md`。
> - **§11（本檔）**＝用上面攞到嘅「讀檔能力」，去搵主機層憑證，然後**真正登入主機**。三者係一條鏈，唔好當同一件事。

### 6.3 為何呢個漏洞會存在？用日常比喻

> ⚠️ 教材外補充：想像一間公司把「伺服器密碼政策備忘錄」放喺**大門接待處嘅免費傳單架**（web 可讀路徑），而備忘錄上面寫住「所有管理員密碼＝123 開頭跟 qwe 跟 !@#」。呢個就係問題根源：**開發者覺得「內部文件唔算機密」，但把佢放喺 web 可以讀到嘅位置，就等於公開**。加上密碼模式可預測、又冇 MFA，等於「門匙插咗喺門鎖，鎖又係最平嘅一款」。

### 6.4 主機側常見弱點（新手要識嘅概念）

> ⚠️ 教材外補充——原文 §11 只「點名」呢三個為經典向量，冇逐步示範。以下是概念性補充：
> - **sudo 設定錯誤（sudo misconfiguration）**：`sudo -l` 睇到某些命令可以**免密碼**或以 root 執行。若當中包含可以順帶執行其他命令嘅工具（例如編輯器、`find`、`tar`、解譯器），就可能由「執行呢個命令」變成「執行任意命令」。修法：`/etc/sudoers` 用**最小權限、逐條白名單**，避免萬用 `ALL` 同不必要嘅 `NOPASSWD`。
> - **可寫檔（writable files）**：若低權限用戶可以寫入 root 會執行嘅檔案（例如開機腳本、cron 腳本、服務設定），下次系統執行嗰個檔就等於幫你以 root 執行你嘅內容。修法：嚴格檔案權限（`chmod`／`chown`），唔好俾 web／服務帳號寫入系統路徑。
> - **cron（定時任務）**：若 `cron` 以 root 執行一個**你寫得到**嘅腳本，你改咗嗰腳本＝以 root 執行。修法：cron 用絕對路徑、腳本唔可被非特權用戶寫入。
> - **SUID（概念）**：`find / -perm -4000 -type f 2>/dev/null` 可以列出所有 SUID 執行檔；若某個 SUID 程式有可被濫用嘅行為（例如呼叫外部命令），就可能借佢以 root 身份運行。修法：移除不必要嘅 SUID 位（`chmod u-s`），定期審視。
> - **憑證重用（password reuse）**：本靶場正正係呢個——web 層攞到嘅密碼模式，重複使用喺主機特權帳號。修法：特權帳號用**獨立、唯一、強**嘅密碼 + MFA。

### 6.5 為何要寫權限提升報告？

> ⚠️ 教材外補充：搵到 root 唔係終點，**寫得出一份客戶睇得明、修得到嘅報告**才是專業測試員嘅交付物。權限提升報告通常要包含：
> 1. **Finding 標題**：例如「Web-readable internal memo leaks privileged password pattern」。
> 2. **嚴重性（Severity）**：例如 Critical——因為可達全主機控制。
> 3. **影響（Impact）**：寫到「由 web 層低權限 → root → 可部署勒索軟件／竊取全部資料」。
> 4. **重現步驟（Steps to Reproduce）**：逐條 URL／指令，令客戶技術人員可以自己複現。
> 5. **證據（Evidence）**：request／response、頁面原始碼截圖（你自己執行嘅記錄，唔係抄教材）。
> 6. **修正建議（Remediation）**：對應 §9 清單。
> 7. **CWE／OWASP 對應**：本階段對應 **OWASP A07:2021**（原文有寫）；CWE 屬補充，需自行查證後填寫，唔好亂填。
> 一句：**冇報告＝冇交付**；而且報告要寫到「連唔識攻擊嘅人」都跟得到。

### 6.6 新手最常撞嘅 3–5 個卡點

> ⚠️ 教材外補充：
> 1. **「我喺頁面睇唔到備忘錄文字！」** → 內容夾喺 HTML 之前，**一定要「檢視頁面原始碼」**（View page source），唔係睇渲染後嘅頁面。原文兩次強調要睇 page source（步驟 1 同 2）。
> 2. **LFI 路徑 `../` 數目唔啱** → 目標路徑深度要對應 `../` 層數；原文示範用 `../../../../../../`（六組）。層數錯＝讀唔到檔。
> 3. **`ssh root@localhost` permission denied** → 最大機會係密碼打錯；含 `!` 時留意 shell 歷史展開（見步驟 5 補充）。亦要確認你係喺**跑住靶場嘅機器**上開終端機，唔係喺攻擊者瀏覽器度。
> 4. **以為要爆破密碼** → 本靶場唔使爆破：文件已揭露 **key-space 縮到 1 個候選**。理解「模式」比跑字典快。
> 5. **混淆 web 層同 host 層** → 見 6.1；如果你嘅「shell」出唔到 `/root` 內容，你好可能仍然係 `www-data`，未真正 host 提權。

### 6.7 點樣判別自己成功定失敗

> ⚠️ 教材外補充：
> - **成功**：SSH 登入後提示符係 `root@…:~#`（`#`＝root）；或者以 root 身份可以讀到只有 root 讀到嘅檔。
> - **失敗**：仍然見到一般用戶提示符（`$`）、或 `Permission denied`、或只係見到 web 頁面回應。
> - **半成功（陷阱）**：你攞到 web shell 但係 `www-data` 身份——呢個**未算**主機淪陷，仍屬 web 層階段。

---

## 💬 7. Student questions 詳解

> 原文 §11 共有 **4 條** Student questions（原文 p.125–126）。原文 PDF 只有題目、答案冇 render，以下每條答案均為本筆記自撰，屬教材外補充。

**Q1（原題號 1）** What is a keyboard-walk password, why do users create them, and why do they appear so often in cracked-password statistics despite satisfying complexity rules?

> ⚠️ 教材外補充（答案）：
> **英文要點**：
> - A keyboard-walk password is formed by moving across adjacent physical keys on the keyboard (e.g. `1q2w3e`, `123qwe!@#`) rather than typing a meaningful string.
> - Users create them because they are easy to remember and easy to type quickly on a standard QWERTY layout; they also *look* random.
> - They satisfy complexity rules because the character classes are technically satisfied (lowercase letters, digits, and shifted symbols in `123qwe!@#`), so policy checkers accept them.
> - They appear frequently in cracked-password statistics because the number of plausible walks is small, the walking patterns are highly predictable, and they are already pre-loaded in common cracking dictionaries and rule sets. Their real entropy is far lower than the nominal length and character-class mix suggests.
> **繁中拆解**：重點係「**滿足複雜度 ≠ 高熵**」。政策只睇「有冇大細寫／數字／符號」，但 keyboard-walk 把「可選路徑」壓縮到極少數，於是一統計就成群出現。考官要聽嘅 point 有三：定義（相鄰鍵行走）、動機（好記好打、睇落隨機）、為何仍易爆（路徑可預測＋字典已收錄＋實際 entropy 極低）。
> **常見錯答**：答「因為用戶懶／密碼太短」而冇講「**簡單睇落隨機但實際可預測**」呢個核心矛盾。

**Q2（原題號 2）** Suppose internal documentation reveals the password pattern in use (for example, a keyboard-walk of three digits, three letters, three shifted symbols). Explain how an attacker turns knowledge of the pattern alone into an efficient offline-cracking or online-guessing strategy.

> ⚠️ 教材外補充（答案）：
> **英文要點**：
> - Knowledge of the pattern collapses the key-space from the full password space to a tiny, enumerable set — in this lab, effectively a single candidate (`123qwe!@#`).
> - Offline strategy: generate only candidates that match the constrained pattern (3 digits → 3 adjacent letters → 3 shifted symbols) and check them against captured hashes with a tool like Hashcat/John, dramatically reducing keys tested.
> - Online strategy: try the small candidate set directly against the login service (e.g. SSH) at a low rate to avoid lockout/rate-limiting, since only a handful of guesses are needed.
> - The pattern converts a brute-force problem into a targeted guess.
> **繁中拆解**：核心係「**constrained keyspace**」。知道模式＝知道要用邊種結構生成候選，於是唔使掃全空間，只掃符合模式嘅極少數（甚至 1 個）。offline＝對 hash 用符合模式嘅字典；online＝直接對登入服務試極少數候選，仲要低速率避開鎖定。考官要聽：key-space 收窄、offline vs online 各自做法、最後「1 個候選」。
> **常見錯答**：只講「佢會爆密碼」，冇講**模式令候選數目由天文數字跌到近乎 1** 呢個關鍵。

**Q3（原題號 3）** Why does MFA on privileged accounts change the risk calculus even when password policies are weak or passwords leak? Cover which attack paths it blocks, and note at least one it does not.

> ⚠️ 教材外補充（答案）：
> **英文要點**：
> - MFA adds a second, independent factor (something you have / are) so a leaked or guessed password alone is insufficient.
> - It blocks: online guessing / credential stuffing / direct SSH-to-root with a stolen password; password-reuse attacks; and password-spraying against the privileged account.
> - It does not block: offline cracking of a captured password hash (MFA is irrelevant to a hash dump), session-token theft / live authenticated-session hijacking, or an attacker who can reproduce the second factor (SIM-swap, MFA-fatigue push spam, or a compromised authenticator device).
> **繁中拆解**：MFA 嘅作用係「令**單一因素外洩唔足以登入**」。佢擋到嘅係「**用偷到／估到嘅密碼直接登入**」類路線（本靶場正是此類）。擋唔到嘅係「唔需要過登入」嘅路線：離線爆 hash、偷 session／cookie、或攻破第二因子本身。考官要聽：MFA 改變風險計算（單因素失效≠失守）、擋在線憑證攻擊、至少一個擋唔到（如離線爆 hash 或 session theft）。
> **常見錯答**：答「MFA 令密碼外洩無所謂」而完全冇提「**離線爆 hash／session 劫持**照樣中招」。

**Q4（原題號 4）** Trace the full kill chain from a web file-read primitive (LFI) to a root shell via internal documents stored outside the web root. Why do internal memos and policy files so often contain reusable credential material?

> ⚠️ 教材外補充（答案）：
> **英文要點（kill chain）**：
> 1. Attacker has a web foothold and an LFI file-read primitive.
> 2. Read internal memos at `/home/tyz/host_hints/IT_Notice.txt` and `/opt/IT/password_policy.txt`, which document a 9-character keyboard-walk pattern.
> 3. Reconstruct the only candidate password (`123qwe!@#`).
> 4. Read `/etc/passwd` to identify a privileged account (UID 0 root).
> 5. SSH to the host with the reconstructed credential; no MFA → root shell → full host control.
> **Why memos leak credentials**：internal documents are written for administrators and describe policy/operations, so they naturally reference password rules or examples; they are often placed in "internal-looking" paths (web-readable directories, `/opt`, home directories) under the false assumption that internal = safe; and documentation tends to record the pattern/rules that privileged accounts actually use.
> **繁中拆解**：這題要求「**逐步 trace**」——一定要按次序由 LFI 講到 root shell，一步都唔可以跳（LFI → 讀兩份備忘錄 → 重建密碼 → 讀 `/etc/passwd` 搵 UID 0 → SSH 登入 root）。第二問要答「為何文件成日有憑證料」：文件為管理員而寫、天然會提規則／例子；放喺「覺得內部就安全」嘅路徑；文件記錄嘅正正係特權帳號實際使用嘅模式。
> **常見錯答**：只答「LFI 讀到密碼就 root」，**漏咗 `/etc/passwd` 確認特權帳號**同「冇 MFA」呢兩個成敗關鍵。

---

## 🎒 8. 考前 5 分鐘懶人包 ＋ 自測

### 8.1 必背關鍵數字／值

| 項目 | 值 |
|---|---|
| 攻擊鏈階段 | ⑥ 主機淪陷（Host Compromise） |
| 覆蓋原文 section | §11 Host Privilege Escalation via Internal Hints |
| MITRE ATT&CK | TA0004 — Privilege Escalation |
| OWASP 對應 | A07:2021 — Identification and Authentication Failures |
| 密碼長度 | 9 字元（3 數字 + 3 字母 + 3 Shift 符號） |
| 重建出嘅密碼 | `123qwe!@#` |
| 特權帳號判別 | `/etc/passwd` UID 0，例 `root:x:0:0:root:/root:/bin/bash` |
| 提權捷徑條件 | 無 MFA → 一個估中憑證＝全主機控制 |

### 8.2 Payload／URL 對照表（原文逐字）

| 用途 | 值（原文如此） |
|---|---|
| 讀內部備忘錄 | `http://localhost:8080/index.php?lang=../../../../../../home/tyz/host_hints/IT_Notice.txt` |
| 讀密碼政策 | `http://localhost:8080/index.php?lang=../../../../../../opt/IT/password_policy.txt` |
| 讀帳號清單 | `http://localhost:8080/index.php?lang=../../../../../../etc/passwd` |
| 登入 root（terminal） | `ssh root@localhost` |
| 重建密碼 | `123qwe!@#` |

### 8.3 英文必背句

> **English Standard Definition:** MITRE ATT&CK groups these techniques under TA0004 — Privilege Escalation; classic vectors include SUID abuse, sudo misconfiguration, and — as in this lab — weak predictable credentials.

> **English Standard Definition:** Use any file-read primitive (for example, LFI) to request common host locations such as user home directories, /tmp, /opt, and web-readable paths.

> **English Standard Definition:** Without MFA on the privileged account, one guessed credential may grant full host control.

> **English Standard Definition:** enforce strong, unique passwords for privileged accounts and reject keyboard-walk or dictionary patterns, require MFA for administrative access, and keep internal policy documents outside any web-readable path.

### 8.4 自測 5 題

1. Keyboard-walk 密碼為何「滿足複雜度規則」但依然極弱？
2. `123qwe!@#` 三段分別對應鍵盤上嘅咩操作？
3. 攻擊者點解要用 `/etc/passwd`？佢喺呢條鏈嘅作用係咩？
4. MFA 擋得到同擋唔到邊類攻擊？（各舉一例）
5. 原文 §11 提過嘅三個經典主機提權向量係咩？

**答案（最後一行）**：1. 佢嘅可選路徑極少、高度可預測、實際 entropy 極低，且已收入爆密字典；2. 數字排 `1 2 3` → 落一行字母排 `q w e` → 按住 Shift 撳同一批數字鍵得 `! @ #`，串成 `123qwe!@#`；3. 用嚟識別 **UID 0** 特權帳號（例 `root:x:0:0:root:/root:/bin/bash`），確定要試邊個帳號；4. 擋到：在線憑證猜測／憑證填充／直接用偷到密碼 SSH 登入；擋唔到：離線爆 hash、session 劫持、或攻破第二因子本身；5. **SUID abuse、sudo misconfiguration、weak predictable credentials**。

---

## 🛡️ 9. 防守方修正清單（Defender Fix Checklist）

### 9.1 逐項漏洞 → 修法

| 漏洞／風險 | 修法（原文有嘅照收） | 教材外補充修法 |
|---|---|---|
| 內部文件洩露密碼模式 | 把內部政策文件**移出任何 web 可讀路徑** | 敏感文件唔好放喺 `/opt`、家目錄、`/tmp`、web root 之下；檔案權限收緊；定期掃主機上「似秘密」嘅檔名 |
| 可預測／keyboard-walk 密碼 | 為特權帳號**強制強、唯一密碼**，並**拒絕 keyboard-walk 或字典模式** | 用密碼管理器生成高熵密碼；密碼政策要檢查熵而唔止「有冇符號」；定期查洩露（breach）清單 |
| 特權帳號缺 MFA | **管理員存取必須要求 MFA** | SSH 用公鑰認證／`pam_google_authenticator`；限制 root 直接登入（`PermitRootLogin no`），改用 sudo 提權 |
| 憑證重用 | （原文結論隱含） | 特權帳號密碼獨立唯一，唔重用、唔與應用層共用 |
| sudo 設定錯誤 | — | `/etc/sudoers` 最小權限、逐條白名單，避免 `ALL`／`NOPASSWD`；定期審視 |
| 可寫檔／cron | — | 系統路徑唔可被 web／服務帳號寫入；cron 腳本用絕對路徑且唔可寫 |
| SUID 濫用 | — | 移除不必要 SUID（`chmod u-s`），定期用 `find / -perm -4000` 檢視 |
| web 層隔離不足 | — | **最小權限原則（Principle of Least Privilege）**：web server 只擁有業務所需嘅最小權限 |

### 9.2 防禦三支柱（新手記法）

> ⚠️ 教材外補充：
> 1. **最小權限原則（Principle of Least Privilege）**：每個帳號／服務只俾佢做嘢最少需要嘅權限；web 進程唔應該讀得到系統檔案或 root 家目錄。
> 2. **PHP-FPM 獨立用戶**：把 PHP-FPM pool 用**專屬低權限用戶**（唔好同 web server 或其他 app 共用同一 user）；每個網站分開 pool／user；用 `open_basedir` 限制 PHP 可存取嘅路徑，令 LFI 讀唔到 web root 以外嘅檔（例如 `/etc/passwd`、`/opt`）。
> 3. **容器隔離（Container Isolation）**：把 app 放喺容器，mount namespace 只見到自己需要嘅檔案系統；run as non-root、read-only filesystem（`--read-only`）、drop capabilities；即使 app 被讀檔，都摸唔到主機嘅 `/etc/passwd`、`/home`、`/opt`。主機側嘅 root 憑證就更難洩露。

### 9.3 對應速記

➜ 對應速記：`ART_Final_CheatSheet.md`
➜ 本階段前置：`ART_T3_07_LateralFileAccess_StudyGuide.md`（LFI，§10）
➜ web 層權限提升：`ART_T3_05_PrivilegeEscalation_StudyGuide.md`（§3）
