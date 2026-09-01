# ITE3102 Network Fundamentals — PT10.3: FTP 雙語實務 CodeGuide

> 實務測驗主戰文件：學生只靠呢份文件就應該可以喺 Packet Tracer 完成 FTP 實作並應付 Practical Test。

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握嘅實務技能 (Practical Skills)

- 喺 Packet Tracer 嘅伺服器（CentralServer、BranchServer）上設定 FTP 服務。
- 建立 FTP 用戶帳號並設定權限（Read and List vs full permission）。
- 用 FTP client 上傳（`put`）同下載（`get`）檔案。
- 驗證檔案傳輸結果同權限限制（permission denied 錯誤）。
> Configure the FTP service on servers, create user accounts with permissions, upload and download files via the FTP client, and verify the transfer results.

### 所需設備/軟體 (Equipment & Software)

| 設備/資源 | 用途 |
|---|---|
| Packet Tracer | 網絡模擬軟件 (Network simulator) |
| CentralServer、BranchServer | FTP 伺服器 (FTP servers) |
| Home Laptop | 上傳來源：持有 README.txt (Upload source) |
| PC2、Smart Phone | 下載端 (Download clients) |
| README.txt | 需要上傳嘅 notice 文件，**唔好修改內容**（會影響評分）|
| sampleFile.txt | 測試 anonymous 帳號寫入權限用 |

### 分數分佈 (Score Breakdown)

| 階段 | 內容 | 累積分數 |
|---|---|---|
| Step 1 | 設定 CentralServer FTP 服務 | 40 |
| Step 2 | 設定 BranchServer FTP 服務 | 80 |
| Step 3 | 上傳 README.txt 到 CentralServer | 85 |
| Step 4 | 上傳 README.txt 到 BranchServer | 90 |
| Step 5 | 由 CentralServer 下載到 PC2 | 95 |
| Step 6 | 由 BranchServer 下載到 Smart Phone | 100 |

---

## 🛠️ 解題步驟拆解 (Walkthrough)

### Part 1 — 設定 FTP 服務 (Configure FTP Services on Servers)

**Step 1: 設定 CentralServer 嘅 FTP 服務（40 分）**

1 ➔ 撳 CentralServer，開 `Services` tab > `FTP`。
2 ➔ 撳 `On` 啟用 FTP 服務。
3 ➔ 喺 `User Setup` 建立用戶帳號，撳 `Add` 加入（逐個帳號做）：

| Username | Password | Permissions |
|---|---|---|
| anonymous | anonymous | limited to Read and List |
| administrator | cisco | full permission |

4 ➔ 撳預設嘅 `cisco` 用戶帳號，撳 `Remove` 刪除佢。
5 ➔ 關閉 CentralServer 設定視窗。
> Step 1: Click CentralServer > Services tab > FTP. Click On to enable FTP service. In User Setup, create the user accounts (anonymous/anonymous with Read and List; administrator/cisco with full permission) and click Add. Remove the default cisco user account.

**Step 2: 設定 BranchServer 嘅 FTP 服務（80 分）**

1 ➔ 喺 BranchServer 重複 Step 1 嘅所有步驟（開 FTP、建帳號、刪預設帳號）。
> Step 2: Repeat Step 1 on BranchServer.

### Part 2 — 上傳檔案到 FTP 伺服器 (Upload a File to the FTP Server)

**Step 3: 由 Home Laptop 上傳 README.txt 到 CentralServer（85 分）**

1 ➔ 撳 Home Laptop > `Desktop` tab > `Text Editor`，打開 README.txt 檢查內容，之後關閉。
   - ⚠️ 注意：**唔好改動檔案內容**，因為會影響評分（"Do not change the file because this affects scoring"）。
2 ➔ 喺 `Desktop` tab 開 `Command Prompt`。
3 ➔ 輸入 `ftp centralserver.pt.pka`，等 client 連接。
   - ⏱️ Packet Tracer 係模擬環境，FTP 第一次連接可能要等 **最多 30 秒**，屬正常現象。
4 ➔ Server 會 prompt 輸入 username 同 password：用 administrator 帳號（administrator / cisco）。
5 ➔ 提示會變做 `ftp>`，輸入 `dir` 列出目錄內容，確認連到正確嘅 server。
6 ➔ 喺 `ftp>` prompt 輸入 `put README.txt`，檔案會由 Home Laptop 上傳到 CentralServer。
7 ➔ 再輸入 `dir` 驗證：README.txt 應該已經列喺目錄入面。
8 ➔ 輸入 `quit` 關閉 FTP client，prompt 會返回 `PC>`。
> Step 3: Open README.txt in Text Editor without changing it, then use the Command Prompt to connect with `ftp centralserver.pt.pka`, log in as administrator, list the directory with `dir`, upload with `put README.txt`, verify with `dir`, and close with `quit`.

**Step 4: 由 Home Laptop 上傳 README.txt 到 BranchServer（90 分）**

1 ➔ 重複 Step 3 嘅步驟，但連接 `branchserver.pt.pka`。
2 ➔ 完成後關閉 Command Prompt 同 Home Laptop 視窗。
> Step 4: Repeat Step 3 to transfer README.txt to branchserver.pt.pka, then close the windows.

### Part 3 — 從 FTP 伺服器下載檔案 (Download a File from the FTP Server)

**Step 5: 由 CentralServer 下載 README.txt 到 PC2（95 分）**

1 ➔ 撳 PC2 > `Desktop` tab > `Command Prompt`。
2 ➔ 輸入 `ftp centralserver.pt.pka`。
3 ➔ Server prompt 輸入 username 同 password：用 **anonymous 帳號**（anonymous / anonymous）。
4 ➔ 提示變做 `ftp>`，輸入 `dir` — README.txt 應該列喺目錄列表頂部。
5 ➔ 輸入 `get README.txt`，檔案會傳輸到 PC2。
6 ➔ 權限測試：輸入 `put sampleFile.txt`，應該見到以下錯誤（驗證 anonymous 冇寫入權限）：

```text
Writing file sampleFile.txt to centralserver.pt.pka:
File transfer in progress...
%Error ftp://centralserver.pt.pka/sampleFile.txt (No such file or directory Or Permission denied)
550-Requested action not taken. permission denied).
```

7 ➔ 輸入 `quit` 關閉 FTP client，prompt 返回 `PC>`。
8 ➔ 輸入 `dir` 驗證：README.txt 已經喺 PC2 目錄入面。
9 ➔ 關閉 command line window；喺 `Desktop` tab 開 `Text Editor` 打開 README.txt，驗證檔案完整性（integrity），之後關閉。
> Step 5: Connect as anonymous, list with `dir`, download with `get README.txt`, and prove the anonymous account cannot write by typing `put sampleFile.txt` — a permission-denied error is expected. Verify the file on PC2 with `dir` and check its integrity in Text Editor.

**Step 6: 由 BranchServer 下載 README.txt 到 Smart Phone（100 分）**

1 ➔ 重複 Step 5 嘅步驟，但喺 Smart Phone 連接 `branchserver.pt.pka` 下載 README.txt。
> Step 6: Repeat Step 1 for Smart Phone, except download README.txt from branchserver.pt.pka.

---

## 💻 關鍵 CLI 指令庫

> 本 Lab 嘅 FTP 服務設定係用 Packet Tracer GUI（`Services` tab > `FTP`）完成，唔係用 Cisco IOS。實際輸入嘅 CLI 係 FTP client 指令（喺 Command Prompt 執行）。以下指令全部出自教材，每行加繁中註解：

```text
ftp centralserver.pt.pka    # 連接 FTP 伺服器 (Connect to the FTP server; 首次連接可達 30 秒)
ftp branchserver.pt.pka     # 連接另一台 FTP 伺服器 (Connect to BranchServer)
dir                         # 列出伺服器目錄內容 (List the contents of the directory)
put README.txt              # 上傳檔案到伺服器 (Upload/transfer a file to the FTP server)
get README.txt              # 由伺服器下載檔案 (Download/transfer a file from the FTP server)
put sampleFile.txt          # 測試寫入權限：anonymous 會失敗 (Test write permission; expected to fail)
quit                        # 結束 FTP 連線，prompt 返回 PC> (Close the FTP client session)
```

> FTP client 提示：成功登入後 prompt 會由 `PC>` 變做 `ftp>`；輸入 `quit` 後返回 `PC>`。
> 其他 Packet Tracer 測驗常見嘅驗證指令（供參考，本 Lab 未必用到）：`ping <ip>`（測試連通性）、`ipconfig`（檢視本機 IP 設定）。

---

## 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| `%Error ftp://... (No such file or directory Or Permission denied)` + `550-Requested action not taken. permission denied` | anonymous 帳號冇寫入權限，權限只限 Read and List | 用 administrator 帳號（full permission）上傳；或喺 `Services > FTP > User Setup` 調整權限 |
| FTP 連接等好耐（最多 30 秒） | Packet Tracer 模擬環境首次建立 FTP 連線較慢 | 正常現象，耐心等待即可，唔使重開 |
| 登入失敗 / 唔接受 username、password | 帳號密碼打錯，或者用戶帳號未建立／被刪除 | 檢查 `Services > FTP > User Setup` 有冇正確帳號（administrator/cisco、anonymous/anonymous） |
| 傳完之後 `dir` 見唔到 README.txt | 連錯伺服器（centralserver vs branchserver），或上傳失敗 | 確認 `ftp` 連接嘅主機名稱啱唔啱，再重新 `put` |
| 改動 README.txt 內容之後冇分 | 文件內容被修改，影響評分 (affects scoring) | 唔好改 README.txt，只係 review 就夠 |
| 唔記得刪除預設 cisco 帳號 | 預設帳號未移除，可能同測驗要求不符 | 喺 User Setup 揀 cisco 帳號，撳 `Remove` |

---

## 📝 測驗常見題型 (Practical Test Questions)

1. **設定 FTP 服務**：要喺 CentralServer 同 BranchServer 兩部都設定（唔好漏）；包括 On、建立帳號、刪除預設 cisco 帳號。
   - 帳號權限表必記：`anonymous/anonymous` → Read and List；`administrator/cisco` → full permission。
2. **FTP 連線題**：`ftp centralserver.pt.pka` / `ftp branchserver.pt.pka` — 主機名稱要打啱（`centralserver` vs `branchserver`）。
3. **上傳 vs 下載題**：`put` = 上傳（upload，由自己部機送去 server）；`get` = 下載（download，由 server 攞返嚟）。
4. **權限驗證題**：用 anonymous 帳號試 `put` 一定要失敗（%Error / 550 permission denied）；用 administrator 先可以寫入。
5. **驗證步驟唔好慳**：每次傳完都要 `dir` 確認；下載完用 Text Editor 開 README.txt 驗證完整性。
6. **答題要點**：全部步驟做完先好關視窗；README.txt 內容唔可以改；登入 prompt 要答啱 username/password 先會出 `ftp>` prompt。

> Exam tips: Remember the two account pairs (administrator/cisco = full permission, anonymous/anonymous = read and list only); use `put` to upload and `get` to download; verify every transfer with `dir`; never modify README.txt.

---

## 🔗 理論 Recap (Theory Summary)

- FTP（File Transfer Protocol）係應用層協定，用嚟喺 client 同 server 之間傳輸檔案；Packet Tracer 用 TCP 傳輸。
- FTP 透過用戶帳號做認證（authentication）同權限控制（authorization）：唔同帳號可以限制做 Read、List、Write 等操作。
- `put` 上傳、`get` 下載、`dir` 列出目錄、`quit` 結束連線 — 呢啲係 FTP client 基本指令。
- anonymous 帳號通常只畀讀取權限，防止未授權用戶寫入伺服器（permission denied 就係呢個機制嘅證明）。
- 伺服器設定係 server 端（Services tab），client 操作係 client 端（Command Prompt），兩邊要分清楚。
> FTP (File Transfer Protocol) is an application-layer protocol for transferring files between a client and a server. User accounts control permissions such as read, list and write. `put` uploads a file, `get` downloads a file, `dir` lists the directory, and `quit` closes the session. Anonymous accounts are usually limited to read-only access to prevent unauthorized writes.

---

> Reference: 10.2.3.3 Packet Tracer – FTP Servers (PT10233)
