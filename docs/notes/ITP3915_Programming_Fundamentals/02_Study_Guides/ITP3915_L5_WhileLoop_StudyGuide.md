# ITP3915 Programming Fundamentals — Lecture 5: While Loop 雙語應考學習指南

> 課程：ITP3915 Programming Fundamentals
> 講次：Lecture 5 — While Loop
> 格式：雙語並行（Bilingual & Exam-Ready）、應考導向
> 來源教材：`01_Raw_Materials/Lectures/lec05-while-loop.pptx`

---

## 1. 📝 課程概要與實務情境 (Summary & Real-world Context)

本講重點在於 Python 的 `while` 迴圈（while-loop）。`for` 迴圈適合「已知要跑幾多次」或「已知要逐項處理某個 list/sequence」的情境；但現實中很多任務根本唔知道要重複幾多次，例如「繼續溫 ITP3915 直到合格為止」。呢類「次數不確定（indefinite）」的重複工作，就要用 `while` 迴圈：只要 condition（條件）係 `True`，迴圈內的 suite（程式碼區塊）就會不斷執行；一旦條件變為 `False`，迴圈即時結束。教材亦會教你三個典型 use case：倒數計時（counting down）、滿足要求（fulfilling a requirement）、輸入驗證（input validation）同用 sentinel 值（例如 `"exit"`）退出迴圈，以及 infinite loop（無盡迴圈）的成因與防範。

實務上寫 Code 嘅場景好常見：例如你寫一個「AI token 計費器」，每次呼叫 AI 都扣 1000 tokens，直到 token 用盡先停止 —— 呢個就係 `while token > 0:` 的典型應用；又例如你寫一個「登入程式」，要不停要求使用者輸入密碼，直到佢輸入正確先放行，仲要防止佢輸入非數字時 crash —— 呢啲都係 `while` 迴圈配上 input validation（例如 `.isdecimal()`）嘅真實寫法。另外，本講仲會教你用 VS Code 的 debugger（除錯工具）逐行暫停執行、睇住變數值，快速搵出迴圈邏輯錯誤，呢啲都係考試同實習都會用到嘅硬技能。

---

## 2. 🎯 考試學習目標 (Learning Objectives)

考官會直接按以下三項 Lesson Intended Learning Outcomes 出題，並延伸測試你對迴圈邊界條件、無盡迴圈同除錯操作的理解：

- 用條件實作 `while` 迴圈 — **Implement while-loops with conditions.**
- 在 `for` 迴圈與 `while` 迴圈之間互換 — **Convert between for-loops and while-loops.**
- 運用 debugger 應用基本除錯技巧 — **Apply basic debugging techniques using a debugger.**
- 追蹤執行流程（execution trace）：俾你一段 `while` 程式碼，寫出每一步變數值同最終輸出 — **Trace the loop execution and predict variable values/output.**
- 辨識並修正無盡迴圈 — **Identify and fix infinite loops.**
- 正確使用 `break`、`continue` 同 sentinel 值（如 `"exit"`）控制迴圈 — **Use `break`/`continue` and a sentinel value to control loop termination.**
- 應用 PEP 8 規範：用 `is None` 而唔係 `== None` — **Follow PEP 8: compare to `None` with `is`/`is not`, never equality operators.**
- 解釋 debugger 工具（breakpoint、Step Over/Into/Out、Continue、Restart、Watch window）的功能 — **Explain the purpose of each debugger feature.**

---

## 3. 📖 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 點解需要 `while` 迴圈：`for` 與 `while` 的分工

`for` 迴圈可以幫我哋做「基於指定次數或一串項目」的重複工作（iterative tasks based on a specified number or a list of items）。但係，有時重複嘅次數係「唔確定」嘅（the number of iterations is uncertain）—— 例如「繼續溫 ITP3915 直到你合格為止」，你根本唔知要溫幾多次先合格。呢種情況，用 indefinite（不確定／無明確上限）嘅 `while` 迴圈就最合適，因為佢係「根據條件」去決定繼續定停止。

> **English Standard Definition:**
> A **`for` loop** performs iterative tasks based on a specified number of iterations or a list of items, whereas an **indefinite `while` loop** continues to run based on a condition, and is appropriate when the number of iterations is uncertain.

### 3.2 `while` 迴圈語法與執行流程 (Syntax & Flow)

`while` 迴圈嘅語法結構如下：

```python
while condition:
    repeatedTasks
```

執行流程（flow）係：

1. 先檢查 `condition`（條件）。
2. 若條件為 `True` → 執行縮排（indented）嘅 suite（`repeatedTasks`）。
3. 執行完再返去檢查條件。
4. 若條件為 `False` → 跳過整個 suite，繼續執行迴圈之後嘅程式碼。

> **English Standard Definition:**
> A **`while` loop** executes its suite repeatedly as long as the condition evaluates to `True`; the loop's suite is executed **only when the condition returns `True`**, and the loop terminates when the condition becomes `False`.

⚠️ 應考重點：condition 一定要有機會由 `True` 變成 `False`，否則就係 infinite loop（見 3.7）。

### 3.3 實例一：倒數計時 (Use Case — Counting Down)

當一個特定條件達成時先准許繼續執行重複任務。例如「你夠 tokens 先可以用 XXX AI」。呢個過程通常涉及一個「喺迴圈之前定義」嘅變數，佢就係 iterative variable（迭代變數）。教材例子：

```python
token = 500000                      # iterative variable 喺迴圈前定義
while token > 0:                    # token > 0 → True
    # tokens are available
    token = token - 1000            # 每次扣 1000
    # use AI to ...
print("No more tokens")
```

執行追蹤（execution trace）：

| 檢查次序 | `token > 0`？ | 執行 suite 後 `token` 值 |
|---|---|---|
| 1 | True | 499000 |
| 2 | True | 498000 |
| … | True | …（每次減 1000）|
| 500 | True | 0 |
| 501 | **False → 退出迴圈** | 0（唔會再執行 suite）|

預期輸出：

```
No more tokens
```

> **English Standard Definition:**
> The **iterative variable** is a variable defined **before the loop begins**; inside the loop it is updated on each iteration so that the loop condition can eventually become `False` and the loop can terminate.

⚠️ 應考重點：`token` 必須喺迴圈之前定義（`token = 500000`）；如果唔更新 `token`（例如刪走 `token = token - 1000`），條件永遠係 `True`，迴圈永遠唔會停。

### 3.4 實例二：滿足要求 (Use Case — Fulfilling a Requirement)

有時程式要使用者不停完成任務，直到某個特定條件達成，例如「繼續溫 ITP3915 直到你合格」。教材提供兩種寫法：

寫法一（用初始值 `-1` 保證進入迴圈）：

```python
result = -1
while result < 40:
    result = study()
print("You pass!")
```

寫法二（用 `None` 表示「未有結果」）：

```python
result = None                # None 係一種代表 null（無值）嘅 type
while result is None or result < 40:
    result = study()
print("You pass!")
```

🔍 `None` 與 `is` 嘅重要知識點（教材明言）：

- `None` 係一種 type，用來定義 null value（無值）。
- `is` 係一個 operator，用嚟比較 object identity（物件身份，即「係咪同一個物件」），而唔係比較值。
- 用 `result == None` 其實都 work，但根據 **PEP 8** 指引：同 singleton（單例物件，如 `None`）比較時，應該永遠用 `is` 或 `is not`，**絕對唔好用** equality operators（`==` / `!=`）。

> **English Standard Definition:**
> `None` is a type used to define **null values**. `is` is an operator for comparing **object identities**. According to **PEP 8**, comparisons to singletons like `None` should always be done with `is` or `is not`, **never** the equality operators (`==`/`!=`).

### 3.5 實例三：輸入驗證 (Use Case — Input Validation)

程式要確保使用者輸入嘅係有效資料。例如一定要輸入一個數字，否則一直問落去：

```python
inputVal = input("Enter a number: ")          # 第一次輸入：abc
while not inputVal.isdecimal():
    # invalid input
    inputVal = input("A number is required: ")  # 再輸入：def，之後：100
print(f"Number is {inputVal}. Bye!")
```

執行追蹤（execution trace）：

| 步驟 | 使用者輸入 | `not inputVal.isdecimal()` | 動作 |
|---|---|---|---|
| 1 | `abc` | True | 要求重新輸入 |
| 2 | `def` | True | 要求重新輸入 |
| 3 | `100` | **False** | 退出迴圈，印出訊息 |

預期輸出（最後一次輸入 `100` 後）：

```
Number is 100. Bye!
```

> **English Standard Definition:**
> `str.isdecimal()` returns `True` if every character in the string is a decimal digit (0–9); otherwise it returns `False`. The loop `while not inputVal.isdecimal():` keeps requesting input until the user enters a valid decimal number.

### 3.6 實例四：退出迴圈 (Use Case — Exiting a Loop)

你可以指定一個 condition 嚟「退出」迴圈，例如迴圈一路跑到使用者輸入 `EXIT` 為止：

```python
inputVal = input("Enter a number: ").strip().lower()
while inputVal != "exit":
    print("Do something with", inputVal)
    inputVal = input("Enter a number: ").strip().lower()
print("Bye!")
```

🔍 細節拆解：

- `.strip()`：去除字串頭尾嘅空白字元（whitespace）。
- `.lower()`：將字串轉成全小寫，所以使用者輸入 `EXIT`、`Exit`、` exit ` 都會被當成 `"exit"` 處理。
- 呢度 `"exit"` 就係所謂嘅 **sentinel value**（哨兵值）：一個特殊值，用嚟表示「應該停止」。

❓ 教材問題：Can we swap the lines in the suite？（可以對調 suite 入面兩行嗎？）

答案係：**唔建議／唔可以直接對調**。假如對調成：

```python
while inputVal != "exit":
    inputVal = input("Enter a number: ").strip().lower()   # 先讀輸入
    print("Do something with", inputVal)                    # 後做嘢
```

當使用者輸入 `"exit"` 時，程式會先讀到 `"exit"`、再印出 `Do something with exit`，之後先至退出迴圈 —— 即係 sentinel 值會被當成普通資料處理咗先。原版寫法嘅重點係：**讀入新輸入必須喺迴圈內執行**，令 condition 有機會變成 `False`；而 sentinel 值應該「讀入後立即檢查」，唔應該被當成正常資料輸出。

> **English Standard Definition:**
> A **sentinel value** is a special value that signals the loop to stop. The loop must update its condition variable inside the suite (e.g., by reading new input) so that the condition can eventually become `False`; otherwise the loop never terminates.

### 3.7 無盡迴圈 (Infinite Loop)

一個「無法被退出」嘅迴圈，因為佢嘅 condition 永遠 evaluate 為 `True`。呢種情況會導致 **resource exhaustion（資源耗盡）**，例如 CPU 或 memory 被無限佔用，程式 hang 死。

教材例子 1（迭代變數愈變愈大，永遠唔會 ≤ 0）：

```python
token = 300
while token > 0:
    token = token + 10      # 300, 310, 320, … 永遠 > 0
print("No more token")
```

教材例子 2（條件寫死係 `True`，完全冇退出機會）：

```python
while True:
    token = token - 10      # 條件永遠係 True
print("No more token")
```

> **English Standard Definition:**
> An **infinite loop** is a loop that cannot be exited because its condition always evaluates to `True`; this can result in **resource exhaustion**, e.g., CPU or memory usage, and the program never terminates.

### 3.8 無盡迴圈 + `break`：畀迴圈一個「機會」等待同退出

有時用 `while True:` 係刻意嘅（例如一直等使用者輸入），但必須留機會俾程式去 **wait（等待，例如等使用者輸入）** 同 **quit（退出，例如輸入 EXIT）**。教材例子：

```python
while True:
    inputVal = input("Enter a number: ").strip().lower()
    if inputVal == "exit":
        break               # continue 同 break 都適用於 while-loop
    # else is not necessary here
    print("Do something with", inputVal)
print("Bye!")
```

🔍 知識點：

- `break`：立即離開成個迴圈（跳到迴圈後嘅程式碼）。
- `continue`：跳過今次 iteration 剩餘嘅語句，返去條件檢查（教材明言 `continue` 同 `break` 都 work for while-loop）。
- 教材特別註明 `else is not necessary here`：Python 嘅 `while` 迴圈本身可以配 `else`（迴圈正常結束先執行），但呢度唔需要，考題若問到記得「while-else 只喺迴圈冇被 break 結束時先會執行」。

> **English Standard Definition:**
> `break` immediately exits the loop, while `continue` skips the rest of the current iteration and jumps back to the condition check; both statements also work for `while` loops. An optional `else` clause after a `while` loop runs only when the loop ends normally (not via `break`).

### 3.9 `for` 迴圈與 `while` 迴圈互換 (Conversion)

教材用 `range(1, 6, 2)` 示範三種等價寫法，輸出完全一樣。

**寫法 A：`for` 迴圈**（iterative variable 直接喺 `for` statement 內定義）：

```python
for num in range(1, 6, 2):
    print(num)
```

**寫法 B：`while` 迴圈 1**（保留同一個 iterative variable `num`）：

```python
num = 1
while num < 6:
    print(num)
    num = num + 2
```

**寫法 C：`while` 迴圈 2**（用 index 逐個抽出 list/range 嘅元素）：

```python
list_num = range(1, 6, 2)
index = 0
while index < len(list_num):
    print(list_num[index])
    index = index + 1   # next num
```

三種寫法嘅預期輸出都係：

```
1
3
5
```

寫法 C 嘅 index 追蹤表：

| `index` | `list_num[index]` |
|---|---|
| 0 | 1 |
| 1 | 3 |
| 2 | 5 |

`len(list_num)` 嘅值係 **3**，所以 `index < 3` 時先執行 suite；當 `index = 3` 時條件變 `False`，迴圈結束。

> **English Standard Definition:**
> In a **`for` loop**, the iterative variable can be defined directly within the `for` statement. In a **`while` loop**, the iterative variable must be defined **before the loop begins**, and it must be updated manually inside the suite. The two forms are interchangeable for the same sequence.

⚠️ 應考重點（最易考嘅對比）：`for` 迴圈「喺 statement 內定義變數、自動更新」；`while` 迴圈「一定要喺迴圈前定義變數、自己手動更新（`num = num + 2` 或 `index = index + 1`）」。

### 3.10 除錯工具 (Debugger) — Breakpoint 設定

迴圈涉及複雜嘅處理過程，debugger 可以幫我哋 **pause（暫停）** 執行，逐個檢查變數值：

- 喺 VS Code 中，**click 行號左邊嘅區域**就可以加入 **breakpoint（停頓點）**，會顯示一個 **紅點（red dot）**，表示程式執行到呢行時會暫停。
- 啟動方法：Menu bar → **Run** → **Start Debugging**。

> **English Standard Definition:**
> A **breakpoint** is a marker added by clicking the area to the left of the line number in VS Code; a red dot indicates where the program will pause execution so you can review variable values.

### 3.11 除錯控制按鈕 (Debugger Controls)

| 按鈕 | 英文 | 功能 |
|---|---|---|
| 逐步執行 | **Step Over / Step Into / Step Out** | 喺呢一刻逐行執行程式（前提係冇涉及 functions 時）|
| 繼續 | **Continue** | 繼續執行，直到到達下一個 breakpoint |
| 重新開始 | **Restart** | 由頭重新執行成個程式 |

> **English Standard Definition:**
> **Step Over / Step Into / Step Out** run the program line by line at this moment (provided no functions are involved). **Continue** continues execution until reaching the next breakpoint. **Restart** restarts the whole execution from the beginning.

### 3.12 Watch 視窗 (Watch Window)

- **Watch window**：除錯期間監察 variables 同 expressions 嘅視窗。
- **Add Expression**：click **`+`** sign，然後輸入你想監察嘅 expression，例如教材例子 `list(range(1, 6, 2))` 同 `list_num[index]`（例中值為 3）。
- 加入後，expression 嘅值會 **直接顯示（displayed directly）** 喺 watch window，方便監察特定變數或表達式。
- 當值有更新（updates）時，會被 **自動 highlight（自動高亮）**，一眼睇到邊個變數變咗。

> **English Standard Definition:**
> The **Watch window** monitors variables and expressions while debugging. Use **Add Expression** (click the `+` sign and type the expression, e.g., `list(range(1,6,2))`) to watch values that are displayed directly; values with updates are **highlighted automatically**.

---

## 4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| `while loop` | 條件式重複執行嘅迴圈；條件為 `True` 先執行 suite | "A `while` loop executes its suite repeatedly as long as the condition evaluates to `True`." |
| `condition` | 迴圈繼續與否嘅判斷條件（布林值）| "The suite is executed only when the condition returns `True`." |
| `suite` | 迴圈內縮排嘅程式碼區塊 | "The loop's suite runs when the condition is `True`." |
| `iterative variable` | 控制迴圈進度嘅迭代變數，必須喺迴圈前定義 | "The iterative variable must be defined before the loop begins and updated inside the loop." |
| `indefinite while-loop` | 迭代次數唔確定時適用嘅迴圈 | "An indefinite `while` loop is appropriate when the number of iterations is uncertain." |
| `infinite loop` | 條件永遠為 `True`、無法退出嘅迴圈 | "An infinite loop cannot be exited because its condition always evaluates to `True`, causing resource exhaustion (e.g., CPU or memory)." |
| `resource exhaustion` | 資源耗盡（CPU／memory 被無限佔用）| "An infinite loop can result in resource exhaustion, e.g., CPU or memory usage." |
| `sentinel value` | 標示「應該停止」嘅特殊值（如 `"exit"`）| "A sentinel value signals the loop to stop; e.g., the loop runs until the user enters EXIT." |
| `break` | 立即跳出成個迴圈 | "`break` immediately exits the loop." |
| `continue` | 跳過今次 iteration，返去條件檢查 | "`continue` skips the rest of the current iteration and jumps back to the condition check." |
| `None` | 代表 null value（無值）嘅 type | "`None` is a type used to define null values." |
| `is` / `is not` | 比較 object identity 嘅運算子 | "`is` is an operator for comparing object identities." |
| PEP 8 | Python 編碼風格指引 | "According to PEP 8, comparisons to singletons like `None` should always be done with `is` or `is not`, never the equality operators." |
| `.isdecimal()` | 檢查字串是否全為十進制數字 | "`str.isdecimal()` returns `True` if all characters are decimal digits (0–9)." |
| `.strip()` | 去除字串頭尾空白 | "`.strip()` removes leading and trailing whitespace from the string." |
| `.lower()` | 將字串轉成全小寫 | "`.lower()` converts the string to lowercase, so EXIT, Exit and exit are all matched." |
| `range(1, 6, 2)` | 產生 1 到 5、步長 2 嘅數字序列（1, 3, 5）| "`range(1, 6, 2)` generates 1, 3, 5; the length of `list_num` is 3." |
| `len(list_num)` | 傳回序列長度 | "`len(list_num)` returns the length of the sequence; the loop runs while `index < len(list_num)`." |
| `for` → `while` 互換 | 兩種迴圈嘅等價轉換 | "In a `for` loop the iterative variable is defined within the statement; in a `while` loop it must be defined before the loop and updated manually." |
| `breakpoint` | 停頓點；紅點表示暫停位置 | "Add breakpoints by clicking the area to the left of the line number; a red dot shows where the program will pause." |
| `Step Over / Step Into / Step Out` | 逐行執行（冇涉及 functions 時）| "Step Over, Step Into or Step Out run the program line by line at this moment, provided no functions are involved." |
| `Continue` | 繼續執行到下一個 breakpoint | "Continue continues execution until reaching the next breakpoint." |
| `Restart` | 由頭重新執行 | "Restart restarts the whole execution from the beginning." |
| `Watch window` | 監察變數同 expression 嘅視窗 | "The Watch window monitors variables and expressions while debugging your code." |
| `Add Expression` | 加 `+` 輸入 expression 嚟監察 | "Add Expression: click the `+` sign and type the expression, e.g., `list(range(1,6,2))`, to watch." |
| `highlighted automatically` | 值更新時自動高亮 | "Values with updates will be highlighted automatically in the watch window." |

---

## 5. 🗺️ 循序漸進學習路線 (Learning Path)

**第一步：先理解觀念 (Understand)**
- 理解 `for` 迴圈係「已知次數／已知 list」；`while` 迴圈係「條件驅動、次數不確定」。
- 理解執行流程：condition 檢查 → `True` 就執行 suite → 再檢查 → `False` 就退出。
- 理解 infinite loop 成因：條件永遠 `True`（例如更新方向錯 `token = token + 10`，或條件寫死 `while True:` 但冇 `break`）。

➔ **第二步：背誦英文短語 (Memorise)**
- "The suite is executed only when the condition returns `True`."
- "The iterative variable must be defined before the loop begins."
- "According to PEP 8, comparisons to singletons like `None` should always be done with `is` or `is not`, never the equality operators."
- "`break` immediately exits the loop; `continue` skips the rest of the current iteration."

➔ **第三步：掌握計算／寫法 (Master the Code)**
- 熟寫四類 use case：counting down（`token = token - 1000`）、fulfilling requirement（`result is None or result < 40`）、input validation（`while not inputVal.isdecimal():`）、sentinel exit（`while inputVal != "exit":`）。
- 掌握 `for` ↔ `while` 互換三連：`for num in range(1,6,2)` ➔ `num = 1; while num < 6: num = num + 2`；用 index 版 `while index < len(list_num): index = index + 1`。
- 識得做 execution trace：寫低每個 iteration 嘅 condition 值同變數值（如 token 500000 → 499000 → … → 0）。
- 識用 debugger：set breakpoint（click 行號左邊）、Run → Start Debugging、Step Over/Into/Out、Continue、Restart、Watch window 加 expression。

➔ **第四步：能解答英文考題 (Answer Exam Questions)**
- "Trace the following `while` loop and write the output."（逐行寫輸出）
- "Convert this `for` loop into a `while` loop."（寫 while 版）
- "Why is the following loop an infinite loop?"（答 condition always True / resource exhaustion）
- "How do you validate numeric input using a `while` loop?"（答 `.isdecimal()` + loop）
- "What is the difference between `== None` and `is None`?"（答 PEP 8、object identity）

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 關鍵數字 (Key Numbers)

| 數字／例子 | 意義 |
|---|---|
| `token = 500000`，每次 `-1000` | 第 500 次 iteration 後 `token = 0`，條件 `token > 0` 變 `False`，印出 `No more tokens` |
| `result < 40` | 合格分數 40；未達標就繼續 `study()` |
| `range(1, 6, 2)` | 產生 1, 3, 5；`len(list_num)` = 3，index 0→1→2 |
| `token = 300; token = token + 10` | 300, 310, 320… 永遠 > 0 → **infinite loop** |
| `"exit"`（配合 `.strip().lower()`）| sentinel 值；`EXIT`/`Exit`/` exit ` 都當 `"exit"` |

### 語法對照表 (Syntax Comparison)

| 情境 | `for` 迴圈 | `while` 迴圈 |
|---|---|---|
| 迭代變數定義 | 喺 statement 內（`for num in range(1,6,2):`）| 必須喺迴圈前定義（`num = 1`）|
| 變數更新 | 自動 | 手動（`num = num + 2`）|
| 適合場景 | 已知次數／已知 list | 次數不確定（indefinite）|
| 退出方式 | 序列行完 | 條件變 `False`／`break` |

### 英文極速記憶口訣 (Mnemonics)

- **D-C-U 口訣（寫 while 三步）**：**D**efine before loop（先定義迭代變數）→ **C**heck condition（再檢查條件）→ **U**pdate inside（迴圈內更新）。→ "Define–Check–Update".
- **W-T-B 口訣（無盡迴圈出口）**：`while True:` + `break` = 出路。→ "While True needs a Break."
- **None 口訣**：None 係 singleton，用 **is** 唔用 ==。→ "PEP 8: compare `None` with `is`, never `==`."
- **Sentinel 口訣**：輸入要 `strip().lower()` 先比較 `"exit"`。→ "Strip, lower, then compare the sentinel."
- **Debugger 口訣**：紅點 = breakpoint；Step 逐行、Continue 到下個 breakpoint、Restart 由頭嚟、Watch 睇值自動 highlight。→ "Red dot pauses; Step lines; Continue to next; Restart from start; Watch highlights updates."
- **`while` 五大要點速記**：條件驅動（condition-driven）、suite 只喺 `True` 時執行、迭代變數迴圈前定義、迴圈內要更新、防 infinite loop。
