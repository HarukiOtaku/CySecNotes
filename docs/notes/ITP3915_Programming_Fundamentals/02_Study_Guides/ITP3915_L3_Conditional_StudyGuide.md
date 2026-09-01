# ITP3915 Programming Fundamentals — Lecture 3: Conditional Statements（條件陳述句）雙語應考學習指南

> 課程：ITP3915 Programming Fundamentals | Lecture 3: Conditional Statements
> 指南類型：雙語並行（Bilingual & Exam-Ready）｜繁體中文解說 + 英文標準定義句（可直接照抄作答）

---

## 1. 📝 課程概要與實務情境（Summary & Real-world Context）

本講次係 Python 程式設計嘅第一個「決策」關口：程式唔再係由上到下死板執行，而係可以根據**條件（condition）**嘅真偽（`True` / `False`）決定行邊一條路。核心內容分三大部分：第一，用**比較運算子（comparison operators）**（`==`、`!=`、`>`、`>=`、`<`、`<=`）去比較兩個數值或字串；第二，用**邏輯運算子（logical operators）**（`and`、`or`、`not`）將多個條件組合成更複雜嘅條件，並掌握佢哋嘅**運算次序（order of evaluation / precedence）**；第三，用 **`if` / `elif` / `else`** 建立條件陳述句，以至**嵌套條件陳述句（nested conditional statements）**去處理多層決定。呢啲全部係「邏輯思維（logical thinking）」嘅基本功，亦係後續迴圈（loops）、函數（functions）同資料處理課程嘅基石。

實際寫 Code 場景好常見：例如你寫一個**網上商店收銀程式**，要判斷顧客有冇輸入折扣碼 `"Save10"`——有就先減 $2.5 再顯示折扣金額，冇就直接顯示總數，呢個就係一個 `if` 條件陳述句；又例如寫**售票系統**，要按顧客類型（長者、學生、小童、成人）決定票價 $85 / $60 / $60 / $100，就要用 `if` / `elif` / `else` 做多分支判斷；再進階啲，串流平台要按「國家 × 月費計劃」組合定價（HK 收 $73–$108、Angola 收 $3.99–$9.99），就要用嵌套條件或 `and` 組合同時判斷兩個條件。考試最鍾意叫你「trace（追蹤）」一段程式嘅輸出，或者叫你用條件陳述句寫出指定邏輯，所以本指南每個例子都附上**預期輸出（expected output）**同逐步推導。

---

## 2. 🎯 考試學習目標（Learning Objectives）

本講次嘅官方學習成果（Lesson Intended Learning Outcomes）共有三項，考官會直接對應出題：

| # | 學習目標（英文原文） | 繁中解說 | 考官會點樣測你 |
|---|----------------------|----------|----------------|
| 1 | **Create conditions and combinations of conditions** | 建立單一條件，並用邏輯運算子組合多個條件 | MCQ 問 `and` / `or` / `not` 嘅真值結果；問運算子優先次序；要你寫出「介乎某範圍」嘅條件（如 `mark >= 0 and mark < 4`） |
| 2 | **Create conditional statements in Python for decision-making** | 用 `if` / `elif` / `else` 建立決策流程 | 叫你寫完整 `if` 區塊；考冒號（`:`）同縮排（indentation）；考 `elif` / `else` 嘅可選性；考「只會執行一個 suite」 |
| 3 | **Create nested conditional statements to establish levels of determination** | 用嵌套條件建立多層決定（第一層決定 + 第二層決定） | 叫你將嵌套寫法改寫成 `and` 平坦寫法（或相反）；trace 嵌套程式嘅輸出 |

> **English Standard Definition (Learning Outcomes):**
> "Upon completing this lesson, you will be able to: create conditions and combinations of conditions; create conditional statements in Python for decision-making; and create nested conditional statements to establish levels of determination."

---

## 3. 📖 雙語深度理論知識點（Comprehensive Notes）

### 3.1 條件（Conditions）嘅基本概念

條件係程式決策嘅原料。一個條件就係一個會得出 `True` 或 `False` 嘅判斷。佢係邏輯思維嘅基礎概念，會喺好多場合出現：用唔同程式語言寫程式、由資料庫篩選資料（filtering data from databases）、以至滲透測試時構造注入 payload（creating injection payloads for penetration testing）。

> **English Standard Definition:**
> "A condition is a logical expression that evaluates to either `True` or `False`; it is a fundamental concept of logical thinking used in decision-making."

教材將條件分為三種類型：

| 類型（英文） | 繁中解釋 |
|--------------|----------|
| **Comparison（比較）** | 比較兩個項目（items）之間嘅大小或相等關係，例如 `100 == 100` |
| **Specific criteria（特定條件／準則）** | 要符合某啲指定條件先至成立，例如 `originalStr.startswith("An iPhone")`（檢查字串係咪以 `"An iPhone"` 開頭） |
| **Combination（組合）** | 用邏輯運算子將多個條件組合起嚟，例如 `40 > 0 and 40 < 100` |

> **English Standard Definition:**
> "Conditions can be classified into three types: comparison between two items, specific criteria required to be fulfilled, and combination of conditions."

### 3.2 比較運算子（Comparison Operators）

用比較運算子去比較兩個項目嘅數值。以下全部例子用 `100` 同 `100` 比較，留意每個運算子嘅含義同輸出：

```python
print(100 == 100)   # equality（相等）            -> True
print(100 != 100)   # inequality（不相等）        -> False
print(100 > 100)    # greater than（大於）        -> False
print(100 >= 100)   # greater than or equal to   -> True
print(100 < 100)    # less than（小於）           -> False
print(100 <= 100)   # less than or equal to      -> True
```

**預期輸出（Expected Output）：**

```text
True
False
False
True
False
True
```

**速記要點（必背）：**
- `==` 係「相等」比較，兩個 `=`；`=` 單一個先係賦值（assignment），考試成日混埋嚟考你。
- `!=` 係「不相等」。
- `>` 大於、`<` 小於、`>=` 大於或等於、`<=` 小於或等於。
- 所有比較運算子嘅結果都係布爾值（Boolean）：`True` 或 `False`。

> **English Standard Definition:**
> "Comparison operators compare the values of given items and return a Boolean result: `==` (equality), `!=` (inequality), `>` (greater than), `>=` (greater than or equal to), `<` (less than), `<=` (less than or equal to)."

### 3.3 字串比較：Unicode 編碼點（Unicode Code Points）

字串都可以用比較運算子比較，但規則係**按 Unicode 編碼點（numeric code points）**去比，即係逐個字元嘅數字碼大細，而唔係按「字典序」或者「筆畫」。Unicode 係一種常見嘅字元編碼標準（character encoding standard）。

```python
print("a" < "b")   # a – 0x61; b – 0x62（0x61 < 0x62）-> True
print("Z" < "b")   # Z – 0x5A; b – 0x62（0x5A < 0x62）-> True
```

**預期輸出（Expected Output）：**

```text
True
True
```

**推導：** `"a"` 嘅 Unicode 編碼點係 `0x61`，`"b"` 係 `0x62`，因為 `0x61 < 0x62`，所以 `"a" < "b"` 係 `True`；`"Z"` 係 `0x5A`，細過 `"b"` 嘅 `0x62`，所以 `"Z" < "b"` 都係 `True`。注意大寫字母嘅編碼點細過小寫字母（`0x41–0x5A` 係大寫，`0x61–0x7A` 係小寫）。

**課堂問題（必懂）：** `print("四" < "二")` 嘅結果係咩？

**答案：`False`。** 因為中文字比較都係睇 Unicode 編碼點：「四」係 `U+56DB`（`0x56DB`），「二」係 `U+4E8C`（`0x4E8C`）。`0x56DB > 0x4E8C`，即係 `"四" > "二"`，所以 `"四" < "二"` 係 `False`。呢個結果同中文字典排序（部首／筆畫）完全無關，純粹係編碼點比較——呢個係考試最鍾意出嘅陷阱位！

> **English Standard Definition:**
> "Strings are compared by their numeric code points in Unicode, which is a common character encoding standard; for example, `'a'` is `0x61` and `'b'` is `0x62`, so `'a' < 'b'` evaluates to `True`."

### 3.4 比較嘅實際使用情景（Use Cases of Comparison）

比較兩個**字面值（literals）**（例如 `100 == 100`）冇乜實際意義，因為結果永遠一樣。條件喺需要比較**可能唔同嘅數值**時先至有用。教材列出以下使用情景：

| 使用情景（英文） | 繁中解釋 | 例子 |
|------------------|----------|------|
| **Field value of each data record** | 每筆資料記錄嘅欄位值 | `age < 18`（年齡係咪未成年） |
| **User input** | 使用者輸入 | 檢查輸入嘅折扣碼係咪 `"Save10"` |
| **Data provided by third parties** | 第三方提供嘅資料 | 外部 API 回傳嘅狀態值 |
| **Internal counter for repeated processes** | 重複處理用嘅內部計數器 | 迴圈入面數到第幾次 |
| **Time** | 時間 | 判斷而家係咪營業時間 |

> **English Standard Definition:**
> "It is not meaningful to compare two literals, as it always returns the same result; conditions are useful when you need to compare values that might not be the same, such as field values, user input, third-party data, internal counters, and time."

### 3.5 邏輯運算子（Logical Operators）

有時你需要同時符合**多個條件（multiple conditions）**，就要用邏輯運算子將條件組合成更複雜嘅條件。三個運算子：`and`、`or`、`not`。

#### 3.5.1 `and` — 結合／連接詞（Conjunction，與）

`and` 嘅結果只有當 **ALL（所有）** 條件都係 `True` 先至係 `True`，任何一個係 `False` 成個就係 `False`。

```python
# Example 1：兩個條件都 True
print(40 > 0 and 40 < 100)   # True and True   -> True
print(True and True)         #                   -> True

# Example 2：其中一個條件 False
print(40 > 0 and 40 < 20)    # True and False  -> False
print(True and False)        #                   -> False
```

**預期輸出（Expected Output）：**

```text
True
True
False
False
```

> **English Standard Definition:**
> "The `and` operator is a conjunction: the result is `True` only when **ALL** combined conditions are `True`; if any condition is `False`, the whole result is `False`."

#### 3.5.2 `or` — 析取（Disjunction，或）

`or` 嘅結果只要 **at least one（至少一個）** 條件係 `True` 就係 `True`；全部條件都 `False` 先至係 `False`。

```python
# Example 1：至少一個條件 True
print(40 > 0 or 40 < 20)     # True or False   -> True
print(True or False)         #                   -> True

# Example 2：兩個條件都 False
print(40 > 100 or 40 < 20)   # False or False  -> False
print(False or False)        #                   -> False
```

**預期輸出（Expected Output）：**

```text
True
True
False
False
```

> **English Standard Definition:**
> "The `or` operator is a disjunction: the result is `True` when **at least one** of the combined conditions is `True`; it is `False` only when all conditions are `False`."

#### 3.5.3 `not` — 邏輯非（Logical Not，反轉）

`not` 將條件嘅結果反轉：`not True` 變成 `False`，`not False` 變成 `True`。

```python
print(not 40 > 0)   # not True  -> False
print(not True)     #             -> False
```

**預期輸出（Expected Output）：**

```text
False
False
```

> **English Standard Definition:**
> "The `not` operator reverses the Boolean result of a condition: `not True` evaluates to `False`, and `not False` evaluates to `True`."

### 3.6 運算次序（Order of Evaluation / Precedence）

當一個條件入面同時出現 `not`、`and`、`or`，就要跟**優先權（precedence）**規則由高到低評估：

> **English Standard Definition (Precedence Rule):**
> "The order of evaluation, from the highest precedence rule to the lowest, is: **Parentheses ( )**, then **`not`**, then **`and`**, then **`or`**; operators with the same precedence are evaluated **left to right**."

即係：`( )` 最高 → `not` → `and` → `or` 最低。另外要留意：比較運算子（`>`、`<`、`==` 等）嘅優先權**高過**所有邏輯運算子，所以 `40 > 0 and 40 < 100` 會先計 `40 > 0` 同 `40 < 100`，再計 `and`。

**課堂例題：** 求 `not True or not False and False` 嘅結果。

```python
# 逐步推導（step-by-step evaluation）：
# 1. 先處理兩個 not（優先權高過 and / or）：
#    not True  -> False
#    not False -> True
# 2. 代入原式：False or True and False
# 3. and 優先權高過 or，先計：True and False -> False
# 4. 最後計 or：False or False -> False
print(not True or not False and False)   # -> False
```

**預期輸出（Expected Output）：**

```text
False
```

**推導口訣：** 見到 `not` 先計晒；之後 `and` 先、`or` 後；同級就由左到右。考試叫你求呢類算式，一定要喺草稿寫低每一步，唔好心算。

### 3.7 條件陳述句語法（Syntax of Conditional Statements）

條件陳述句係一種**控制流程區塊（control flow block）**，容許程式根據條件嘅結果做**決定（decisions）**同提供**替代方案（alternatives）**。通用語法如下：

```python
if condition1:
    do something only if condition1 is true
elif condition2:
    do something only if all previous conditions (condition1) are false
    and condition2 is true
elif condition3:
    do something only if all previous conditions (condition1 and 2) are false
    and condition3 is true
else:
    do something only if all previous conditions are false
```

**語法關鍵點（必背）：**

1. **冒號（Colons, `:`）係必須**：`if`（如果）、`elif`（否則如果）、`else`（否則）行尾一定要有 `:`，用嚟標示一個**縮入套件（indented suite）**（即一個 code block／區塊）嘅開始。
2. **只會執行一個縮入套件**：由上面到下面逐個條件評估，邊個條件最先成立就執行佢嗰個 suite，之後嘅條件全部唔睇。
3. **`elif` 同 `else` 係可選（optional）**：可以淨係得 `if`；可以有任意多個 `elif`；`else` 最多一個，放最後。
4. **縮排（indentation）決定區塊範圍**：Python 用縮排（通常 4 個空格）去界定邊啲 statement 屬於邊個 suite。

> **English Standard Definition:**
> "Colons are required at the end of `if`, `elif`, and `else` to indicate the start of an indented suite. Only one indented suite will be executed based on the conditions' result, evaluated from top to bottom. `elif` and `else` clauses are optional, and multiple `elif` clauses are acceptable."

### 3.8 `if` Clause：單一分支

淨係用 `if`，可以令程式**淨係喺條件係 `True` 嘅時候先執行某啲動作**；條件係 `False` 就直接跳過成個縮入區塊。教材用網上商店折扣碼做例子：

**Use Case（使用情景）：** subtotal 係 `24.99`；如果折扣碼係 `"Save10"`，就將新 subtotal 減 `2.5` 並顯示折扣金額；無論有冇折扣，最後都顯示 subtotal。

```python
subtotal = 24.99
if coupon == "Save10":
    subtotal = subtotal - 2.5
    print(discount)      # 顯示折扣金額（實際程式需先定義 discount 變數）
print(subtotal)
```

**執行邏輯：**
- 條件 `coupon == "Save10"` 係 **`True`** → 執行 if 嘅縮入區塊（減價、顯示折扣）。
- 條件係 **`False`** → **skip（跳過）** if 嘅縮入區塊，直接去 `print(subtotal)`。

> **English Standard Definition:**
> "The `if` clause allows the program to perform actions only if the condition is true; when the condition is `True`, the indented suite of the `if` clause is executed, and when it is `False`, the suite is skipped."

**其他使用情景：** 顯示警告訊息（display warning），例如表單驗證（form validation）時輸入格式錯誤就彈警告。

### 3.9 `if` 與 `else` Clauses：雙分支

當有**兩個分支（two branches）**嘅處理程序——一個對應 `True`、一個對應 `False`——就應該用 `else` clause 建立**替代方案（an alternative）**。

**Use Case：** 如果年齡細過 18，票價係 $50；否則票價係 $130；最後顯示票價。

```python
if age < 18:
    ticketPrice = 50
else:
    ticketPrice = 130
print(ticketPrice)
```

**執行邏輯：**
- `age < 18` 係 `True` → 執行 `if` 嘅 suite，`ticketPrice = 50`；`else` 嘅 suite **唔會執行**。
- `age < 18` 係 `False` → **skip（跳過）** `if` 嘅 suite，**jump（跳到）** `else`，`ticketPrice = 130`。

**課堂延伸問題：** `ticketPrice = age < 18 ? 50 : 130` 呢句（其他語言嘅 ternary 三元運算子寫法）意思係咩？——就係：如果 `age < 18` 成立就係 `50`，否則係 `130`，同上面 `if` / `else` 嘅邏輯完全一樣。Python 自己嘅寫法係 `ticketPrice = 50 if age < 18 else 130`（三元表達式），但呢度教材只係用嚟解釋 `if` / `else` 嘅意思。

> **English Standard Definition:**
> "If there are two branches of processes, one for true and one for false, an `else` clause should be used to create an alternative. When the condition is `True`, the suite of the `if` clause is executed and the `else` clause is not; when it is `False`, the suite of the `if` clause is skipped and the program jumps to the `else` clause."

### 3.10 `if`、`elif`、`else` Clauses：多分支

每個條件淨係得兩個結果（`True` / `False`），所以當**多過兩個選項（more than two options）**嘅時候，就要用 `elif`（即 else if）clauses 去指定額外條件。教材用售票系統按顧客類型定價：

**Example 1（逐個類型分開寫）：**

```python
if type == "senior":
    ticketPrice = 85
elif type == "student":
    ticketPrice = 60
elif type == "children":
    ticketPrice = 60
else:
    ticketPrice = 100  # adult
subtotal = ticketPrice + 10
```

**執行邏輯（由頂到底）：**
- `type == "senior"` → 票價 $85
- 否則 `type == "student"` → 票價 $60
- 否則 `type == "children"` → 票價 $60
- 以上全部唔成立（即 adult）→ `else` → 票價 $100
- 最後一律 `subtotal = ticketPrice + 10`

**Example 2（合併兩個有相同 suite 嘅 elif clauses）：** 留意 `"student"` 同 `"children"` 都係 $60，可以用 `or` 將兩個條件合併，令程式更精簡：

```python
if type == "senior":
    ticketPrice = 85
elif type == "student" or type == "children":
    ticketPrice = 60
else:
    ticketPrice = 100  # adult
subtotal = ticketPrice + 10
```

**兩個版本嘅輸出完全一樣**，但 Example 2 用咗 `or` 組合條件，減少重複程式碼。考試好鍾意問：「有兩個 `elif` 嘅 suite 一模一樣，可以點合併？」——答案就係用邏輯運算子 `or` 寫成一個條件。

> **English Standard Definition:**
> "Each condition can only produce two outcomes — true and false. If there are more than two options, use `elif` (else if) clauses to specify additional conditions; when the suites of two `elif` clauses are identical, the conditions can be combined with the `or` operator."

### 3.11 數值範圍判斷（Conditional Statements for Numeric Ranges）

用條件陳述句可以將數值分類到唔同範圍。教材用 `mark`（0–10 分）對應三個等級做例子：`Bad`（0–3）、`Good`（4–7）、`Very Good`（8–10）。

**Example 1（逐個範圍用 `and` 包住上界下界）：**

```python
mark = 5
grade = "undefined"
if mark >= 0 and mark < 4:
    grade = "Bad"
elif mark >= 4 and mark < 8:
    grade = "Good"
elif mark >= 8 and mark <= 10:
    grade = "Very Good"
else:
    print("Incorrect mark")
print(grade)
```

**預期輸出（Expected Output）：**

```text
Good
```

**推導：** `mark = 5`。第一個條件 `5 >= 0 and 5 < 4` → `True and False` → `False`，唔執行；第二個 `5 >= 4 and 5 < 8` → `True and True` → `True`，執行 `grade = "Good"`；之後嘅條件全部唔再睇。輸出 `Good`。

**Example 2（先排除非法範圍，之後每步只寫上界）：**

```python
mark = 5
grade = "undefined"
if mark < 0 or mark > 10:
    print("Incorrect mark")
elif mark < 4:
    grade = "Bad"
elif mark < 8:
    grade = "Good"
elif mark <= 10:
    grade = "Very Good"
print(grade)
```

**預期輸出（Expected Output）：**

```text
Good
```

**推導：** `mark = 5`。第一個條件 `5 < 0 or 5 > 10` → `False or False` → `False`；`5 < 4` → `False`；`5 < 8` → `True`，執行 `grade = "Good"`。輸出 `Good`。

**邊個版本更易讀（Which one is more readable）？** 教材問咗呢條問題。**答案：Example 2 更易讀（more readable）**，因為佢先用一個 `or` 條件排除非法輸入（`mark < 0 or mark > 10`），之後每個 `elif` 只寫上界（`< 4`、`< 8`、`<= 10`），靠「由上到下、只執行第一個成立條件」嘅特性，自然形成連續範圍，唔使每個條件都重複寫晒上界下界。呢種「先處理異常／邊界，再處理正常範圍」嘅寫法喺真實程式好常見。

> **English Standard Definition:**
> "To classify a value into numeric ranges, either express each range with `and` (e.g., `mark >= 0 and mark < 4`), or first reject invalid values with `or` and then check only the upper bound in each `elif`; the second style is more readable because each range is implied by the top-to-bottom evaluation."

### 3.12 嵌套條件陳述句（Nested Conditional Statements）

當你需要喺一個 suite **入面**再作**額外決定（additional decisions）**，就可以用嵌套條件陳述句——即係一個條件陳述句放喺另一個條件陳述句嘅 suite 入面。教材用「唔同國家（country）之下有唔同月費計劃（plan）」做例子：**第一層決定（first determination）**係國家，**第二層決定（second determination）**係計劃。

**Example 1（嵌套寫法）：**

```python
country = "hk"
plan = "basic"
price = None
if country == "hk":
    if plan == "basic":
        price = 73
    elif plan == "standard":
        price = 88
    elif plan == "premium":
        price = 108
elif country == "angola":
    if plan == "basic":
        price = 3.99
    elif plan == "standard":
        price = 7.99
    elif plan == "premium":
        price = 9.99
print(price)
```

**預期輸出（Expected Output）：**

```text
73
```

**推導：** `country == "hk"` → `True`，進入第一層 `if` 嘅 suite；入面 `plan == "basic"` → `True`，`price = 73`。`country == "angola"` 嗰段完全唔會執行。

**Example 2（用 `and` 平坦化寫法——邏輯等價）：** 將「國家 × 計劃」六個組合逐個用 `and` 寫成獨立 `elif`，效果同嵌套完全一樣：

```python
country = "hk"
plan = "basic"
price = None
if country == "hk" and plan == "basic":
    price = 73
elif country == "hk" and plan == "standard":
    price = 88
elif country == "hk" and plan == "premium":
    price = 108
elif country == "angola" and plan == "basic":
    price = 3.99
elif country == "angola" and plan == "standard":
    price = 7.99
elif country == "angola" and plan == "premium":
    price = 9.99
print(price)
```

**預期輸出（Expected Output）：**

```text
73
```

**兩個寫法點揀？** 嵌套寫法嘅好處係結構清晰、分層表達（先國家後計劃），適合層次多嘅邏輯；平坦寫法將所有組合攤開，適合組合數量少嘅情況。考試常問「將嵌套改寫成 `and` 版本」或者相反，你要識得兩者互相轉換，並確保六個組合嘅輸出一致。

> **English Standard Definition:**
> "When making additional decisions within a suite, nested conditional statements can be used; a nested conditional statement is a conditional statement placed inside the suite of another conditional statement. Alternatively, the combined conditions can be flattened using the `and` operator, producing a logically equivalent result."

### 3.13 真值測試（Truthiness）與動態型別（Dynamic Typing）

一個好特別嘅條件例子：`if` 後面可以唔係比較式，而係一個**變數本身**。Python 係一種**動態型別語言（dynamically typed language）**，任何值都可以直接當條件用，靠「真值（truthiness）」判斷：

```python
answer = "no"
if answer:
    print("Yes")
```

**預期輸出（Expected Output）：**

```text
Yes
```

**推導：** `answer` 係非空字串 `"no"`。喺 Python，**任何非空字串（non-empty string）都被視為 `True`**，所以 `if answer` 成立，執行 `print("Yes")`。相反，**空字串 `""` 被視為 `False`**。

**課堂問題（必懂）：** 如果 `answer = 0` 呢？`answer = 0.1` 呢？

**答案：** `answer = 0` → 條件係 **`False`**（零值被視為假，falsy），`print("Yes")` 唔會執行；`answer = 0.1` → 條件係 **`True`**（非零數值被視為真，truthy），`print("Yes")` 會執行。教材提示：之後收集資料（data collection）嘅狀態檢查就會用到類似寫法——即係「如果變數有嘢（非空／非零）先做下一步」。

> **English Standard Definition:**
> "Python is a dynamically typed language: any non-empty string (e.g., `'no'`) is considered `True`, while an empty string (`''`) is considered `False`; similarly, zero (`0`) is considered `False` and any non-zero number (e.g., `0.1`) is considered `True`."

---

## 4. 📖 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型（Exam Answer Phrase） |
|--------------------|------------------|------------------------------------------|
| **condition** | 條件；一個會得出 `True` 或 `False` 嘅邏輯表達式 | "A condition is an expression that evaluates to either `True` or `False`, and it is used for decision-making." |
| **comparison** | 比較；用比較運算子比較兩個項目 | "Comparison operators compare the values of given items and return a Boolean result." |
| **equality / inequality** | 相等（`==`）／不相等（`!=`） | "`==` tests equality and `!=` tests inequality between two values." |
| **greater than / less than** | 大於（`>`）／小於（`<`） | "`>` means greater than and `<` means less than." |
| **greater than or equal to / less than or equal to** | 大於或等於（`>=`）／小於或等於（`<=`） | "`>=` means greater than or equal to, and `<=` means less than or equal to." |
| **Unicode code point** | Unicode 編碼點；字元嘅數字碼，字串比較按呢個碼 | "Strings are compared by their numeric code points in Unicode, a common character encoding standard." |
| **logical operator** | 邏輯運算子：`and`、`or`、`not`，用嚟組合條件 | "Logical operators combine conditions into a more complex condition." |
| **conjunction（`and`）** | 與；所有條件都 `True` 先至係 `True` | "The `and` operator is a conjunction: the result is `True` when ALL conditions are `True`." |
| **disjunction（`or`）** | 或；至少一個條件 `True` 就係 `True` | "The `or` operator is a disjunction: the result is `True` when at least one condition is `True`." |
| **logical not（`not`）** | 邏輯非；反轉條件結果 | "The `not` operator reverses the Boolean result of a condition: `not True` is `False`." |
| **precedence / order of evaluation** | 運算優先次序／評估次序 | "The order of evaluation from highest to lowest precedence is: Parentheses, `not`, `and`, then `or`; same-precedence operators are evaluated left to right." |
| **conditional statement** | 條件陳述句；按條件結果決定執行邊段程式 | "A conditional statement allows the program to make decisions and provide alternatives based on the condition's result." |
| **control flow block** | 控制流程區塊；改變程式執行順序嘅結構 | "A control flow block allows your program to make decisions and provide alternatives." |
| **`if` clause** | 如果子句；條件成立先執行 | "The `if` clause executes its indented suite only if the condition is true." |
| **`elif` clause** | 否則如果子句；前面條件全假且自己成立先執行 | "An `elif` clause is executed only if all previous conditions are false and its own condition is true." |
| **`else` clause** | 否則子句；前面全部條件都假先執行 | "The `else` clause is executed only if all previous conditions are false." |
| **suite** | 套件；一個縮排嘅 code block | "A suite is an indented block of code that belongs to an `if`, `elif`, or `else` clause." |
| **colon（`:`）** | 冒號；`if`／`elif`／`else` 行尾必須有 | "Colons are required at the end of `if`, `elif`, and `else` to indicate the start of an indented suite." |
| **indentation** | 縮排；Python 用縮排界定區塊範圍 | "Indentation defines which statements belong to a suite in Python." |
| **nested conditional statement** | 嵌套條件陳述句；條件入面再放條件 | "A nested conditional statement is a conditional statement placed inside the suite of another conditional statement." |
| **dynamically typed language** | 動態型別語言；變數型別執行時先決定 | "Python is a dynamically typed language; any value can be used directly as a condition." |
| **truthy / falsy** | 真值／假值；非空非零當真，空或零當假 | "Any non-empty string is considered `True`, while an empty string is considered `False`; zero is `False` and any non-zero number is `True`." |

---

## 5. 🗺️ 循序漸進學習路線（Learning Path）

**第一階段：先理解什麼觀念（Understand the Concepts）**
- 理解「條件 = 會得出 `True` / `False` 嘅表達式」，同埋比較、特定準則、組合三種類型。
- 理解六個比較運算子各自嘅含義，特別係 `==`（比較）同 `=`（賦值）嘅分別。
- 理解 `and`（全部真先真）、`or`（至少一個真就真）、`not`（反轉）嘅真值規則。
- 理解優先次序：`( )` > `not` > `and` > `or`，同級由左到右；比較運算子高過邏輯運算子。
- 理解 `if` / `elif` / `else` 嘅「由頂到底、只執行第一個成立嘅 suite」特性，以及嵌套＝「決定入面再作決定」。

**第二階段：背誦什麼英文短語（Memorize the Key Phrases）**
- 背熟第 4 模組嘅標準定義句，尤其三條最高頻：「`and` … `True` when ALL conditions are `True`」、「`or` … `True` when at least one condition is `True`」、「Colons are required at the end of `if`, `elif`, and `else` to indicate the start of an indented suite」。
- 背熟優先次序一句：「Parentheses, then `not`, then `and`, then `or`」。
- 背熟字串比較一句：「Strings are compared by their numeric code points in Unicode」。

**第三階段：掌握什麼計算／寫法（Master the Calculations & Code Patterns）**
- 掌握四類程式寫法：單一 `if`（折扣碼例）、`if` / `else` 雙分支（票價例）、`if` / `elif` / `else` 多分支（顧客類型例）、嵌套或 `and` 平坦化（國家 × 計劃例）。
- 掌握 trace 輸出：見到一段 `if` / `elif` / `else` 程式，識得代入變數值逐步推導出 `print` 嘅輸出。
- 掌握混合邏輯式求值：如 `not True or not False and False` → `False`，每一步寫低。
- 掌握數值範圍寫法：`mark >= 0 and mark < 4` 式，或「先 `or` 排除非法，後淨寫上界」式。
- 掌握中文字串比較：用編碼點（`四` = `0x56DB`、`二` = `0x4E8C`）計出 `"四" < "二"` 係 `False`。

**第四階段：能解答什麼英文考題（Ace the Exam Questions）**
- **MCQ**：「What is the output of `print(40 > 0 and 40 < 20)`?」→ `False`。
- **MCQ**：「Which operator has the highest precedence among `not`, `and`, `or`?」→ `not`（但 `( )` 最高）。
- **Trace 題**：「Given `mark = 5`, what does the program print?」→ `Good`。
- **改寫題**：「Rewrite the nested conditional statements using the `and` operator」→ 將嵌套轉為六個 `elif` 組合。
- **程式寫作題**：「Write a conditional statement that sets `ticketPrice` to 50 if `age < 18`, otherwise 130」→ 完整 `if` / `else` 區塊。
- **概念短答題**：「Why are colons required after `if`, `elif`, and `else`?」→「To indicate the start of an indented suite。」

---

## 6. 🎒 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 6.1 比較運算子速查（Comparison Operators）

| 運算子 | 英文名稱 | 意思 | `100` vs `100` 結果 |
|--------|----------|------|---------------------|
| `==` | equality | 相等 | `True` |
| `!=` | inequality | 不相等 | `False` |
| `>` | greater than | 大於 | `False` |
| `>=` | greater than or equal to | 大於或等於 | `True` |
| `<` | less than | 小於 | `False` |
| `<=` | less than or equal to | 小於或等於 | `True` |

### 6.2 邏輯運算子真值速記（Truth Table）

| 表達式 | 結果 |
|--------|------|
| `True and True` | `True` |
| `True and False` / `False and True` / `False and False` | `False` |
| `False or False` | `False` |
| 其餘 `or` 組合（至少一個 `True`） | `True` |
| `not True` | `False` |
| `not False` | `True` |

**口訣：** `and` 揀「全部真」；`or` 揀「有真就得」；`not` 係「反轉」。

### 6.3 優先次序口訣（Precedence Mnemonic）

**`( )` → `not` → `and` → `or`**（同級由左到右）

英文口訣：**"Please **N**ot **A**nd **O**r"**（括號 Please → not → and → or）／粵語口訣：**「括號唔係咁 or」**（括號 → 唔係 → 咁 → or）。比較運算子永遠先過邏輯運算子計。

**混合例題最終答案：** `not True or not False and False` = **`False`**（先 `not` → `False or True and False` → 先 `and` → `False or False` → **`False`**）。

### 6.4 條件陳述句語法骨架（Syntax Skeleton）

```python
if condition1:          # 冒號（:）必須；開始縮入 suite
    ...                 # condition1 係 True 先執行
elif condition2:        # 可選；前面全假且 condition2 真先執行
    ...
else:                   # 可選；前面全部假先執行
    ...
```

**三大鐵律：** ① 行尾要有 `:`；② 區塊要縮排（indentation）；③ 只會執行**一個** suite，由頂到底。

### 6.5 關鍵數字與編碼點（Key Numbers & Code Points）

| 項目 | 數值 | 用途 |
|------|------|------|
| `"a"` | `0x61` | 字串比較：`"a" < "b"` → `True` |
| `"b"` | `0x62` | 字串比較基準 |
| `"Z"` | `0x5A` | `"Z" < "b"` → `True`（大寫細過小寫） |
| `"四"` | `0x56DB` | `"四" < "二"` → `False`（編碼點比較，唔關字典序） |
| `"二"` | `0x4E8C` | 同上 |
| 非空字串（如 `"no"`） | truthy | `if answer:` 成立 → 輸出 `Yes` |
| 空字串 `""`、`0` | falsy | 當 `False` |
| `0.1`（非零數值） | truthy | 當 `True` |

### 6.6 英文極速記憶口訣（Rapid English Memory）

- **Comparison:** "**E**qu**a**l double-equals, **N**ot-equal bangs; **G**reater, **GE**, **L**esser, **LE** — all give True/False."
- **and / or:** "**and** wants **ALL**; **or** wants **at least one**; **not** flips it."
- **Precedence:** "**P**lease **N**ot **A**nd **O**r" → `( )` > `not` > `and` > `or`.
- **if / elif / else:** "**C**olon ends the header, **I**ndent starts the suite, **O**nly **O**ne suite runs, **T**op to **B**ottom."
- **Nested:** "A decision **inside** a decision = nested conditional; flatten it with **and**."
- **Truthiness:** "Non-empty, non-zero → **True**; empty or zero → **False**."

### 6.7 考場最後檢查清單（Final Exam Checklist）

- [ ] `==` 係比較、`=` 係賦值，冇搞混
- [ ] `and`／`or`／`not` 真值表背得熟
- [ ] 優先次序記得 `( )` > `not` > `and` > `or`
- [ ] `if` / `elif` / `else` 行尾有 `:`、區塊有縮排
- [ ] Trace 時由頂到底，只執行第一個成立嘅 suite
- [ ] 字串比較用 Unicode 編碼點，唔係字典序
- [ ] 嵌套 ↔ `and` 平坦化識得互換
- [ ] 非空字串／非零數值當 `True`，空字串／零當 `False`
