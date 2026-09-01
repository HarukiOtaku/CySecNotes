# ITP3915 Lecture 4: For Loop — 雙語並行・應考導向完整學習指南

> 本指南對應教材：ITP3915 Programming Fundamentals — Lecture 04 (for-loop)，涵蓋「反覆工作（Iterative Tasks）」、「`range()` 產生數字序列」、「`for-loop` 迴圈實作」、「`enumerate()` 取得位置」、「`break` / `else` / `continue` 流程控制」全部考點。所有核心定義均以「> 英文標準定義句」附上，可直接背誦並於考試作答時使用。

---

## 📝 1. 課程概要與實務情境 (Summary & Real-world Context)

本課（Lecture 4）的核心主題是**反覆工作（Iterative Tasks）**與 **`for` 迴圈（`for` loop）**。程式設計最基本的需求之一，就是讓機器**重複執行同一批指令**——例如你想送出 👍 一千次，絕對不可能手寫一千行 `print("👍")`；正確做法是寫一個迴圈，讓機器自動重複執行。課程首先教你**識別「哪些工作本質上屬於反覆工作」**（認識迭代任務的必要性），然後教你用 Python 內建函數 **`range()`** 產生一系列數字（作為迴圈的「次數」或「數據來源」），最後教你用 **`for` 迴圈**把重複任務一次過完成，並加上 `break`、`continue`、`else` 等流程控制，令迴圈更靈活、更有效率。

實務上，`for` 迴圈無處不在：例如寫一個「課程註冊系統」，需要**逐個讀取資料庫表格中的每一筆學生記錄**並檢查資格；寫一個「電商程式」，需要**把購物車清單中的每個商品逐一計算總價**（累加器 accumulator 模式）；寫一個「檔案處理工具」，需要**一行一行讀取文字檔直至檔案結束**。這三個場景正是教材提到的三大迴圈用途：按特定次數、按項目數量、按條件持續處理。即使將來學到更高階的資料結構（list、tuple、dictionary）與函數式編程，`for` 迴圈依然是 Python 最常用、最基礎的迭代工具——所以「寫得出正確的 for-loop 並預測輸出」是本課最重要的能力，亦是考試必定出現的題型。

---

## 🎯 2. 考試學習目標 (Learning Objectives)

考官會測試以下三項核心能力（對應教材 SLIDE 2 的 Lesson Intended Learning Outcomes）：

| # | 核心能力（繁體中文） | 英文對照 (Exam Objective) | 考法預測 |
|---|----------------------|----------------------------|----------|
| 1 | 識別反覆工作的必要性，判斷哪些任務需要迭代處理 | **Recognise the necessity of iterative tasks** | 問你「給定情境，為何需要迴圈？」或「下列哪些任務屬於迭代任務？」 |
| 2 | 使用 `range()` 函數產生數字序列（列表） | **Use a function to generate lists of numbers** | 直接考 `range(a, b, c)` 的輸出，包括負 step、空列表、start 省略等變體 |
| 3 | 實作 `for` 迴圈執行迭代任務，並預測執行流程與輸出 | **Implement for-loops to perform iterative tasks** | 手寫程式追蹤（trace）輸出；判斷 print 在迴圈內/外的分別；`break`/`continue`/`else` 的影響 |

> **English Standard Definition (Learning Outcomes)**
> "Upon completing this lesson, you will be able to: (1) recognise the necessity of iterative tasks; (2) use a function (`range()`) to generate lists of numbers; (3) implement `for`-loops to perform iterative tasks."

**考官愛考的三個「陷阱位」：**
1. `range()` 的 **stop 值永不包含**在結果內（`range(5)` 是 0–4，不是 1–5）。
2. `print()` 放在**迴圈內 vs 迴圈外**，輸出完全不同（見 SLIDE 17 的 Example 1 / Example 2）。
3. `break` 會令 `else` 子句**不執行**；只有迴圈完整跑完所有項目，`else` 先會執行。

---

## 📖 3. 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 反覆工作的必要性 (The Necessity of Iterative Tasks)

機器天生擅長高速重複執行任務，但作為開發者，你要**先識別出哪些工作屬於反覆工作**，再寫出精確的指令俾機器執行。教材用「👍 x 1000」做例子：人手寫 1000 次 `print("👍")` 是不可能的，必須用迴圈。

> **English Standard Definition**
> "A machine should be capable of effectively conducting repeated tasks. As developers, we need to recognise the necessity of iterative tasks and create detailed instructions for the machine to execute these tasks."

**迭代任務的常見使用情境（Use Cases）：**
- **重複某些任務直至特定條件達成**：例如反覆溫習某個科目，直至合格為止（"Repeat certain tasks until a specific condition is met"）。
- **持續執行一個提示式（prompt-based）程式**：例如選單程式不斷問用戶輸入。
- **逐個讀取數據**：從資料集合（data collection）、資料庫表格（database table）或檔案（file）中逐項讀取，再作進一步處理——例如計算一串數字的總和（"Read each item from a data collection, database table, or file for further processing"）。
- **建立圖案（patterns）**：例如三角形、乘法表等輸出。

> **English Standard Definition (Use Cases)**
> "Iterative tasks are used to: repeat certain tasks until a specific condition is met; continue running a prompt-based program; read each item from a data collection, database table, or file for further processing; and create patterns."

### 3.2 迭代任務的類型 (Types of Iterative Tasks)

教材將迭代任務分成三大類型（SLIDE 6），考試常以「判斷這是哪一類迭代任務」出題：

| 類型 | 繁體中文解說 | 英文定義 / 例子 |
|------|--------------|------------------|
| **同一數據重複做** | 用相同的數據重複做同一件事，次數固定 | "Do something repeatedly using the same data." 例：👍 👍 👍 👍 👍 |
| **不同數據、跟隨規律** | 每次用不同的數據，但數據本身跟隨特定規律（pattern），例如每次加 1 | "Do something repeatedly using different data that follows a specific pattern." 例：1, 2, 3, 4（increment 加 +1） |
| **相似任務 + 附加條件** | 執行一系列相似任務，但每次迭代內可能需要額外的條件判斷（conditional statement）來決定走哪個分支 | "Perform a similar set of tasks; an additional conditional statement may be required to enable alternatives within the iteration." 例：1, 2, 1, 2（+1, −1, +1 …） |

> **English Standard Definition (Types)**
> "There are three types of iterative tasks: (1) doing something repeatedly with the same data; (2) doing something repeatedly with different data that follows a specific pattern; and (3) performing a similar set of tasks where an additional conditional statement may be required to enable alternatives within the iteration (one iteration = 一次迴圈)."

### 3.3 一維圖案 (1-Dimensional Patterns)

教材歸納出**四種常見的一維（1-Dimension）數字/字元規律**，考題常要你「睇規律 → 諗出點樣用迴圈產生」：

| 規律類型 | 英文名稱 | 例子 |
|----------|----------|------|
| 重複值（值不變） | **Repeated value** | `oooooooooooooooooooooo` |
| 等差（值與值之間有固定差） | **Common difference between values** | 100, 95, 90, 85, 80（每次 −5） |
| 依位置決定（值由位置/次序推導） | **Based on position** | 1, 4, 9, 16, 25（位置²）；A2, B4, C6, D8；Y, N, Y, N, Y, N（配合條件判斷） |
| 依前值決定（後項由前一/幾項推導） | **Based on previous values** | 0, 1, 1, 2, 3, 5, 8, 13, 21（Fibonacci 斐波那契數列） |

> **English Standard Definition (1-D Patterns)**
> "1-dimensional patterns can be categorised as: repeated value (e.g., ooooo…); common difference between values (e.g., 100, 95, 90, 85, 80); based on position (e.g., 1, 4, 9, 16, 25); or based on previous values (e.g., 0, 1, 1, 2, 3, 5, 8, 13, 21 — the Fibonacci sequence)."

**溫馨提示**：`range(start, stop, step)` 直接對應「等差規律」；「依位置決定」通常配合 `enumerate()` 或「位置即 item」的迭代；「依前值決定」需要額外變數保存上一項（如累加器/暫存變數技巧）。

### 3.4 二維圖案 (2D Patterns)

教材展示了多種二維圖案（2D Patterns），這類題目要求**雙層迴圈（nested loops）**——外層控制「行」（row），內層控制「列」（column）。考試未必要求你寫完整程式，但你要能看懂以下輸出是由什麼迴圈結構產生：

```
1				1  2  3  4  5
12				2  4  6  8 10
123				3  6  9 12 15
1234				4  8 12 16 20
4321					*******
 321					 *****
  21					  ***
   1					   *
```

- 左邊第一組：每一行比上一行多一個數字（`1` → `12` → `123` → `1234`）。
- 左邊第二組：`4321` → `321` → `21` → `1`，數字逐行遞減。
- 中間組：乘法表（times table）——第 i 行是 `i × 1, i × 2, …, i × 5`。
- 右邊組：由星號組成的三角形，行數遞減（`*******` → `*****` → `***` → `*`）。

> **English Standard Definition (2D Patterns)**
> "2D patterns are usually produced by nested loops: the outer loop controls the rows and the inner loop controls the columns, e.g., a times-table grid or a triangle made of asterisks."

### 3.5 `range()` 函數 — 產生數字列表 (Generate Lists of Numbers)

`range()` 係 Python 內建函數，用嚟按「遞增（incremental）或遞減（decremental）規律」產生一列數字。**語法：`range(start, stop, step)`**。

| 參數 | 是否必填 | 預設值 | 說明 |
|------|----------|--------|------|
| `start` | 可選 | `0` | 起始值（包含） |
| `stop` | **必填** | 無 | 結束值（**不包含**在結果內） |
| `step` | 可選 | `1` | 每次跳動的間距，即 increment 為 1 |

> **English Standard Definition (range syntax)**
> "`range(start, stop, step)` is a function that generates a list of numbers based on an incremental or decremental pattern: `start` is optional and defaults to 0; `stop` is required and is NOT included in the result; `step` is optional and defaults to 1."

**關鍵陷阱**：`range()` 的回傳值是 **range object**，**不能直接 print**。必須用 `list()` 將佢轉換成 Python list 先睇到內容。

```python
numbers = range(5)
print(numbers)          # 唔可以直接睇到內容（會印出 range(0, 5)）
print(list(numbers))    # 轉做 list 先睇到 [0, 1, 2, 3, 4]
```
```
預期輸出:
range(0, 5)
[0, 1, 2, 3, 4]
```

> **English Standard Definition (range object)**
> "A range object (the return value of `range()`) cannot be printed directly; to view its content, convert the range object to a Python list using `list()`."

**等價寫法**：`range(10)` 相等於 `range(0, 10)`，亦相等於 `range(0, 10, 1)`。

```python
print(list(range(0, 10, 1)))    # [0,1,2,3,4,5,6,7,8,9] — 10 not included
print(list(range(0, 1, 1)))     # [0] — 1 not included
print(list(range(0, 0, 1)))     # [] (empty)
print(list(range(1, 10, 2)))    # [1,3,5,7,9] — step +2
print(list(range(20, 14, -2)))  # [20,18,16] — step -2, 14 not included
```
```
預期輸出:
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0]
[]
[1, 3, 5, 7, 9]
[20, 18, 16]
```

**重點歸納（必背）**：
- `stop` 永遠唔包（exclusive）——`range(5)` 係 `[0,1,2,3,4]` 共 5 個數字，由 0 數到 4。
- `start` 省略即由 0 開始；`step` 省略即每次 +1。
- `step` 可以係負數（遞減），但 `start` 要相應大過 `stop`，否則結果係空列表（如 `range(0, 0, 1)` → `[]`）。

### 3.6 `for` 迴圈基礎 (The `for` Loop)

**迴圈（loop）**係一種程式控制區塊（control block），令你可以**無需重複寫同一段代碼**，就重複執行任務。迭代次數（number of iterations）可以由三種方式控制：

| 控制方式 | 明確性 | 英文定義 | 例子 |
|----------|--------|----------|------|
| 特定數字（固定次數或由變數決定） | definite 明確 | "By a specific number: fixed number, e.g., 5 times; or variable, based on a numeric variable." | `range(5)` = `[0,1,2,3,4]` |
| 項目數量（逐個項目） | definite 明確 | "By number of items: iterate through each item in a list, or read each record from a database table." | `for x in ['a','b','c']` |
| 條件（持續處理直至條件達成） | infinite / 不明確 | "By condition: continue processing (e.g., reading a file line by line) until reaching a specific condition, such as the end of the file." | 讀檔案直到 EOF |

> **English Standard Definition (loop)**
> "A loop is a programming control block that enables iterative execution of tasks without repeated code. The number of iterations can be controlled by a specific number (definite), by the number of items (definite), or by a condition (indefinite/infinite)."

**`for` 迴圈語法**：`for` 迴圈係一種 **definite loop**——對 sequence 中嘅每個項目**恰好迭代一次**。用**縮排（indentation）**建立「重複任務套件（suite）」。

```python
for item in sequence:
    repeatedTasks
```

> **English Standard Definition (for-loop)**
> "A `for` loop is a definite loop that iterates once over each item in a sequence. Use indentation to create a suite for the repeated tasks."

**按特定數字執行（By a Specific Number）**——配合 `range()` 控制次數：

```python
times = 3
for item in range(times):
    print("👍")
print("Done")
```
```
預期輸出:
👍
👍
👍
Done
```
（注意 `print("Done")` 冇縮排，所以只執行一次——喺迴圈外。）

**印出變數值——順序決定輸出（SLIDE 16–17 重點）**：以下兩個例子「看似相同」，但因為 `print()` 同 `num = num * 3` 嘅先後次序不同，輸出完全不同。**考試必考**：

```python
# Example 1: 先 print 後乘
num = 10
for item in range(3):
    print(num)        # 印出當下值
    num = num * 3     # 先印再乘
```
```
預期輸出:
10
30
90
```

```python
# Example 2: 先乘後 print
num = 10
for item in range(3):
    num = num * 3     # 先乘
    print(num)        # 再印
```
```
預期輸出:
30
90
270
```

> **English Standard Definition (order matters)**
> "In a loop, the order of statements inside the suite matters: printing before updating the variable shows the old value, while updating before printing shows the new value. Example 1 outputs 10, 30, 90; Example 2 outputs 30, 90, 270."

### 3.7 迭代變數 (The Iteration Variable)

語法中嘅 `item` 稱為**迭代變數（iteration variable）**。概念上，佢喺每一次迭代期間，充當「儲存當前項目」嘅**迭代儲存器（iterative storage）**——每次迴圈開始，Python 自動將 sequence 中嘅下一個項目放入 `item`。

> **English Standard Definition (iteration variable)**
> "`item` is an iteration variable; conceptually, it serves as an iterative storage for each item during every iteration of the sequence."

**按項目數量執行（By the Number of Items）——迭代變數逐個接收 list 中嘅項目**：

```python
for item in [12, 33, 45]:
    print(item)
print("Done")
```
```
預期輸出:
12
33
45
Done
```
**執行追蹤（Execution）**：`item = 12` → print(12)；`item = 33` → print(33)；`item = 45` → print(45)；離開迴圈 → print("Done")。

```python
for num in range(3):
    print(num)
```
```
預期輸出:
0
1
2
```
（`range(3)` 產生 `[0,1,2]`，所以迭代變數依次係 0、1、2。）

```python
for product in ['17', 'Air', '17Pro']:
    print(product)
```
```
預期輸出:
17
Air
17Pro
```
（迭代變數唔一定要係數字，可以係任何數據類型，例如字串。）

### 3.8 `enumerate()` — 同時取得位置與項目 (Getting Positions)

如果喺迴圈入面**需要知道項目嘅位置（positions/索引）**，可以將 sequence 轉換成 **`enumerate` object（列舉對象）**，佢會將項目「重新組織」成 (位置, 項目) 嘅 tuple 對。**預設起始位置係 0**，亦可以用第二個參數自訂起始值。

```python
seq = ['x', 'y', 'z']
print(seq)                        # ['x', 'y', 'z']
print(list(enumerate(seq)))       # 預設由 0 開始
print(list(enumerate(seq, 5)))    # 由 5 開始
```
```
預期輸出:
['x', 'y', 'z']
[(0, 'x'), (1, 'y'), (2, 'z')]
[(5, 'x'), (6, 'y'), (7, 'z')]
```

> **English Standard Definition (enumerate)**
> "If you need the positions of items, convert the sequence into an `enumerate` object to reorganise the items. The default starting position is 0; you can configure it with a second argument, e.g., `enumerate(seq, 5)`."

**配合 `for` 迴圈解構（unpack）**：使用 `for` 迴圈時，可以將 `enumerate` 產生嘅 tuple **拆解（unpack）**成兩個迭代變數——`pos`（位置）同 `item`（實際項目）：

```python
seq = ['x', 'y', 'z']
for pos, item in enumerate(seq):
    print(f"{pos} is {item}")
```
```
預期輸出:
0 is x
1 is y
2 is z
```

> **English Standard Definition (unpacking enumerate)**
> "When using a `for` loop, we can unpack the `enumerate` items (Python tuples) into two iteration variables — the position and the actual item: `for pos, item in enumerate(seq):`."

### 3.9 累加器模式 (Accumulator Pattern — With Additional Variable)

好多迭代任務需要喺迴圈外準備一個**累加變數（accumulator）**，每次迭代將當前項目「加」入去，迴圈結束後得出總和。教材用「計算 1+2+3 嘅總和」示範：

```python
sum = 0
for newNum in range(1, 4):
    sum = sum + newNum
print(sum)
```
```
預期輸出:
6
```
**執行追蹤（Execution）**：
- 初始：`sum = 0`
- `newNum = 1` → `sum = 0 + 1 = 1`
- `newNum = 2` → `sum = 1 + 2 = 3`
- `newNum = 3` → `sum = 3 + 3 = 6`
- 迴圈結束 → `print(sum)` → **6**

> **English Standard Definition (accumulator)**
> "An accumulator is an additional variable declared before the loop; inside each iteration, the current value is added to it (e.g., `sum = sum + newNum`), and after the loop finishes, the accumulator holds the total."

**注意**：`range(1, 4)` 產生 `[1, 2, 3]`——因為 `stop` 值 4 唔包含，所以恰好加三個數。呢個係「按特定數字」同「按項目數量」混合使用嘅典型例子。

### 3.10 迴圈內加條件判斷 (With Additional Conditions)

迴圈內部可以加入 `if` 條件，令每次迭代可以按情況執行唔同指令——對應教材「相似任務 + 附加條件」嘅迭代類型：

```python
for item in ['x', 'y', 'z']:
    print(item)
    if item == 'y':
        print("Bingo")
print("Done")
```
```
預期輸出:
x
y
Bingo
z
Done
```
**執行追蹤**：`item='x'` → print x，`if` 唔成立（F）；`item='y'` → print y，`if` 成立（T）→ print Bingo；`item='z'` → print z，`if` 唔成立（F）；離開迴圈 → print Done。

> **English Standard Definition (condition inside loop)**
> "An additional conditional statement (e.g., `if item == 'y':`) can be placed inside the loop to enable alternatives within the iteration — different items can trigger different actions."

### 3.11 迴圈流程控制：`break` / `else` / `continue` (Flow Control of Loops)

有時迴圈需要**未行完所有項目就提早結束**，或者**跳過某次迭代**。Python 提供三個控制工具（SLIDE 26 為總綱）：

| 語法 | 作用 | 英文定義 |
|------|------|----------|
| `break` | 當特定附加條件達成時，**即時離開（退出）成個迴圈**，避免不必要的處理 | "A `break` statement allows us to exit the loop when a certain additional condition is met, preventing unnecessary processing." |
| `else` | 可以偵測迴圈**有冇完整完成所有迭代**：只有迴圈「自然跑完」先會執行 `else`；被 `break` 提早離開就唔會執行 | "An `else` clause can detect if the loop completed all its iterations." |
| `continue` | **跳過當前迭代嘅其餘部分**，直接進入下一個項目 | "A `continue` statement skips the rest of the current iteration and moves to the next item." |

> **English Standard Definition (flow control)**
> "Sometimes a loop can be exited before iterating over all items: `break` exits the loop when a certain additional condition is met; an `else` clause detects whether the loop completed all its iterations; `continue` skips the rest of the current iteration and moves to the next item."

#### 3.11.1 `break` 實例（SLIDE 27）——`z` 被跳過

```python
for item in ['x', 'y', 'z']:
    print(item)
    if item == 'y':
        print("Bingo")
        break
print("Done")
```
```
預期輸出:
x
y
Bingo
Done
```
**執行追蹤**：`item='x'` → print x，`if` F；`item='y'` → print y，`if` T → print Bingo → **`break` 即時退出迴圈**，`z` 完全冇處理到（**z is skipped**）→ print Done。

#### 3.11.2 `for` + `else` + `break` 實例（SLIDE 28）——`else` 被跳過

```python
for item in ['x', 'y', 'z']:
    print(item)
    if item == 'y':
        print("Bingo")
        break
else:
    print("All Done")
print("Done")
```
```
預期輸出:
x
y
Bingo
Done
```
**執行追蹤**：因為 `break` 喺 `item='y'` 時觸發，迴圈係「被提早終止」而唔係「完整完成」，所以 **`else` 子句唔會執行**（**z and else clause are skipped**）→ 直接 print Done。

#### 3.11.3 `for` + `else`（冇 `break`）實例（SLIDE 29）——所有項目處理完，`else` 執行

```python
for item in ['x', 'y', 'z']:
    print(item)
    if item == 'A':      # 'A' 從未出現，條件永遠不成立
        print("Bingo")
        break
else:
    print("All Done")
print("Done")
```
```
預期輸出:
x
y
z
All Done
Done
```
**執行追蹤**：`item` 依次為 `'x'`、`'y'`、`'z'`，`if item == 'A'` 每次都係 F，冇觸發 `break`；迴圈**完整跑完所有項目**（**x, y and z are all handled**），所以 `else` 執行 → print All Done → print Done。

> **English Standard Definition (for-else behaviour)**
> "The `else` clause of a `for` loop runs only when the loop finishes all its iterations naturally; if the loop is terminated by a `break` statement, the `else` clause is skipped."

#### 3.11.4 `continue` 實例（SLIDE 30）——跳過當前迭代嘅 print

```python
for item in [1, 2, 3]:
    if item == 2:
        continue
    print(item + 10)
print("Done")
```
```
預期輸出:
11
13
Done
```
**執行追蹤**：`item=1` → `if item == 2` F → print 1+10 = 11；`item=2` → `if` T → **`continue` 跳過 `print(item + 10)`**（`print()` 喺 suite 入面被 skip 咗）→ 直接去下一個 item；`item=3` → `if` F → print 3+10 = 13；離開迴圈 → print Done。

> **English Standard Definition (continue)**
> "When `continue` is executed, the rest of the statements in the current iteration's suite (e.g., `print(item + 10)`) are skipped, and the loop moves directly to the next item."

**三個控制語法嘅記憶對照**：
- `break` = 整段跳出（跳出整個迴圈，連 `else` 都唔行）。
- `continue` = 跳過今次（只跳過當前迭代其餘部分，繼續下一次）。
- `else` = 「冇 break 先至行」——用來偵測迴圈有冇完整完成。

---

## 📖 4. 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞 / 語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---------------------|------------------|----------------------------------------|
| `iterative tasks` | 反覆工作——需要重複執行嘅任務 | "Iterative tasks are tasks that need to be executed repeatedly, e.g., doing something 👍 1000 times." |
| `loop` | 迴圈——一個容許重複執行任務而無需重複代碼嘅控制區塊 | "A loop is a programming control block that enables iterative execution of tasks without repeated code." |
| `iteration` | 一次迴圈（一次迭代） | "One iteration refers to one single pass through the body of the loop." |
| `definite loop` | 明確迴圈——對 sequence 每個項目恰好迭代一次 | "A `for` loop is a definite loop that iterates once over each item in a sequence." |
| `range(start, stop, step)` | 產生數字列表嘅函數；`start` 預設 0、`stop` 必填且不包含、`step` 預設 1 | "`range(start, stop, step)` generates a list of numbers; `stop` is required and is NOT included in the result." |
| `range object` | `range()` 嘅回傳值，唔可以直接 print，要用 `list()` 轉換 | "A range object cannot be printed directly; convert it to a Python list with `list()`." |
| `iteration variable` | 迭代變數——每次迭代儲存當前項目 | "The iteration variable serves as an iterative storage for each item during every iteration of the sequence." |
| `suite` | 縮排形成嘅重複任務區塊 | "Use indentation to create a suite for the repeated tasks." |
| `enumerate(seq)` | 將序列轉成 (位置, 項目) 對，預設由 0 開始 | "`enumerate(seq)` reorganises the items into (position, item) pairs, starting from 0 by default." |
| `unpack` | 解構——將 tuple 拆成多個變數 | "We can unpack the enumerate items (Python tuples) into two iteration variables: position and item." |
| `accumulator` | 累加器——迴圈外嘅累加變數 | "An accumulator variable is updated inside each iteration, e.g., `sum = sum + newNum`, to hold the running total." |
| `break` | 提早退出整個迴圈 | "A `break` statement exits the loop when a certain additional condition is met, preventing unnecessary processing." |
| `else` (loop) | 偵測迴圈有冇完整完成；被 break 打斷就唔執行 | "An `else` clause runs only if the loop completed all its iterations; it is skipped when the loop is terminated by `break`." |
| `continue` | 跳過當前迭代其餘部分，直接去下一個項目 | "A `continue` statement skips the rest of the current iteration and moves to the next item." |
| `incremental / decremental` | 遞增 / 遞減規律 | "`range()` generates numbers based on an incremental or decremental pattern." |
| `common difference` | 等差——值與值之間有固定差 | "A pattern with a common difference changes by the same amount each time, e.g., 100, 95, 90, 85, 80." |
| `based on position` | 依位置決定嘅規律 | "In a position-based pattern, each value is derived from its position, e.g., 1, 4, 9, 16, 25." |
| `based on previous values` | 依前值決定嘅規律（如 Fibonacci） | "In a previous-value-based pattern, each value is derived from earlier values, e.g., the Fibonacci sequence." |
| `nested loops` | 雙層迴圈——外層管行、內層管列 | "2D patterns are usually produced by nested loops: the outer loop controls rows and the inner loop controls columns." |
| `end of file (EOF)` | 檔案結束——條件式迴圈嘅典型終止條件 | "The loop continues processing, e.g., reading a file line by line, until reaching a specific condition such as the end of the file." |
| `prompt-based program` | 提示式程式——持續等候用戶輸入 | "A prompt-based program keeps running and waiting for user input repeatedly." |

---

## 🗺️ 5. 循序漸進學習路線 (Learning Path)

**階段 1：先理解什麼觀念（Concepts First）**
1. 理解「迭代任務（iterative tasks）」——點解要重複執行？👍 × 1000 點解唔可以手寫？
2. 分清三種迭代任務類型：同數據重複、不同數據跟隨規律、相似任務加條件。
3. 理解三種控制迭代次數嘅方式：特定數字（definite）、項目數量（definite）、條件（infinite/不明確）。
4. 認識一維/二維圖案規律：等差、依位置、依前值、雙層迴圈產生圖案。
5. **核心理解**：`stop` 唔包含；縮排決定邊啲語句屬於迴圈；`print` 喺迴圈內/外嘅分別。

**階段 2：背誦什麼英文短語（Memorise Key Phrases）**
- "`range(start, stop, step)` — `start` is optional, default 0; `stop` is required and NOT included; `step` is optional, default 1."
- "A range object cannot be printed directly — convert it to a Python list with `list()`."
- "A `for` loop is a definite loop that iterates once over each item in a sequence; use indentation to create a suite."
- "`break` exits the loop; `continue` skips the rest of the current iteration; the `else` clause runs only if the loop completed all iterations (no `break`)."
- "`enumerate(seq)` returns (position, item) pairs, starting from 0 by default; unpack them with `for pos, item in enumerate(seq):`."

**階段 3：掌握什麼計算 / 寫法（Master the Skills）**
1. 熟練寫出 `range()` 各種變體嘅輸出：`range(5)`、`range(0,1,1)`、`range(0,0,1)`、`range(1,10,2)`、`range(20,14,-2)`。
2. 能手寫「追蹤執行（trace）」：畫出每次迭代 `item` / 變數嘅值，例如累加器 `sum = 0 → 1 → 3 → 6`。
3. 分辨「先 print 後更新」vs「先更新後 print」嘅輸出差異（10,30,90 vs 30,90,270）。
4. 掌握三種流程控制寫法：`break` 提早退出、`for-else` 偵測完整完成、`continue` 跳過當前項。
5. 識別 `print()` 喺縮排內（每次迭代執行）同縮排外（只執行一次）嘅分別。

**階段 4：能解答什麼英文考題（Answer the Exam Questions）**
- 短答題："What does `range(1, 10, 2)` return? Why?" → "It returns `[1, 3, 5, 7, 9]` because `stop` (10) is not included and the step is +2."
- 追蹤題："Trace the following loop and state the output" → 逐步寫出每次迭代輸出。
- 概念題："Explain the difference between `break` and `continue`." → "`break` exits the entire loop, while `continue` skips only the rest of the current iteration and moves to the next item."
- 陷阱題："When does the `else` clause of a `for` loop execute?" → "It executes only when the loop completes all its iterations without hitting a `break`."
- 改錯題："Why can't we `print(range(5))` directly?" → "Because `range()` returns a range object, not a list; we must convert it with `list()`."

---

## 🎒 6. 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 6.1 關鍵數字速記

| 項目 | 內容 |
|------|------|
| `range(5)` | `[0, 1, 2, 3, 4]`（共 5 個，由 0 開始，`stop` 唔包） |
| `range(10) = range(0,10) = range(0,10,1)` | 三者完全等價 |
| `range(0,0,1)` | `[]`（空列表） |
| `range(20,14,-2)` | `[20, 18, 16]`（遞減，14 唔包） |
| 預設值 | `start = 0`，`step = 1`；`stop` 必填、永不包含 |
| 累加器範例 | `sum = sum + newNum`（1+2+3 = 6） |
| `enumerate(seq)` 預設 | 由 0 開始；`enumerate(seq, 5)` 由 5 開始 |
| 三種輸出結果 | Example 1: 10,30,90；Example 2: 30,90,270；`continue` 版: 11,13 |

### 6.2 語法對照表

| 想做到嘅嘢 | 寫法 |
|------------|------|
| 重複 N 次 | `for item in range(N):` |
| 逐個處理 list 項目 | `for item in ['a','b','c']:` |
| 同時要位置同項目 | `for pos, item in enumerate(seq):` |
| 提早退出迴圈 | `if 條件: break` |
| 迴圈完整完成先做嘢 | `for ... : ... else: ...` |
| 跳過今次迭代 | `if 條件: continue` |
| 睇 range 內容 | `print(list(range(...)))` |
| 累加總和 | `sum = 0`（迴圈外）→ `sum = sum + x`（迴圈內） |

### 6.3 英文極速記憶口訣 (Memory Mnemonics)

- **range 三寶**："**start** at start, **stop** before stop, **step** by step" —— start 開始數、stop 前停止（唔包）、step 決定行幾遠。
- **break vs continue**："**break** breaks out of the whole loop; **continue** continues to the next item"（break 成個跳出；continue 跳去下一個）。
- **for-else 鐵律**："**else runs when no break**" —— 冇 break 先至行 else。
- **縮排 = 歸屬**："**Indented = repeated; unindented = once**" —— 縮排內每次迭代都行，縮排外只行一次。
- **print 位置口訣**："**Print first, old value; update first, new value**" —— 先印後改係舊值（10,30,90），先改後印係新值（30,90,270）。
- **list() 轉換**："**Range object? `list()` it!**" —— range 對象唔可以直接 print，用 `list()` 包住先睇到。

### 6.4 一頁睇晒：每個程式範例嘅輸出

| 程式片段 | 輸出 |
|----------|------|
| `print(list(range(5)))` | `[0, 1, 2, 3, 4]` |
| `for num in range(3): print(num)` | `0` `1` `2` |
| `for item in [12,33,45]: print(item)` → `print("Done")` | `12` `33` `45` `Done` |
| `for pos, item in enumerate(['x','y','z']): print(f"{pos} is {item}")` | `0 is x` `1 is y` `2 is z` |
| 累加器 `sum=0; for n in range(1,4): sum+=n; print(sum)` | `6` |
| 迴圈內 `if item=='y': print("Bingo")` | `x` `y` `Bingo` `z` `Done` |
| `break` 喺 `item=='y'` 觸發 | `x` `y` `Bingo` `Done`（z 被跳過） |
| 同上加 `else: print("All Done")` | `x` `y` `Bingo` `Done`（else 被跳過） |
| `if item=='A'`（永不成立）+ `else` | `x` `y` `z` `All Done` `Done` |
| `continue` 跳過 `item==2` | `11` `13` `Done` |

**考前最後檢查**：✅ `stop` 唔包 ✅ print 位置 ✅ break 跳過 else ✅ continue 只跳當前項 ✅ 縮排決定執行次數 ✅ 記得用 `list()` 睇 range 內容。
