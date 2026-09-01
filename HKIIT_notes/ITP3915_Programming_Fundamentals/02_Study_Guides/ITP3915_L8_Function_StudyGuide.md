# ITP3915 Lecture 9: Functions — 雙語應考學習指南（Bilingual Exam-Ready Study Guide）

> 課程：ITP3915 Programming Fundamentals
> 主題：Functions（函數）
> 適用：大專網絡安全／程式開發學位課程筆試與實作考核

---

## 1. 📝 課程概要與實務情境（Summary & Real-world Context）

今堂 Lecture 9 係 Python 程式設計入門嘅核心分水嶺：由「順序執行」過渡到「模組化設計」。課堂首先指出一個現實痛點——程式入面好多時要重複做同一類工作（例如喺唔同位置輸出資料到螢幕），而呢啲重複並唔一定跟隨任何規律，for / while 迴圈根本幫唔到手。解決方法就係函數（function）：將一段要做嘅任務封裝成一個有名嘅「計劃」，喺需要時先至呼叫（call）執行。投影片清楚劃分「函數定義（definition）＝淨係寫低計劃、未執行」同「函數呼叫（call）＝真正跑去執行」兩個階段，呢個概念幾乎係每年必考。

函數嘅價值體現喺四大優點：模組化（Modularity，將大問題拆細）、易於測試（Easy testing，可以獨立測試每個函數）、程式碼重用（Code reusability，寫一次用多次）同程式碼管理（Code management，改動一致、慳時間）。之後課程用一個完整案例研習（case study）示範點樣由「目的（Objectives）」出發，經過 I-P-O 規劃（Input → Process → Output），寫出 `def calcSum(...)` 並追蹤執行流程（execution trace）。最後講變數作用域（scope of variables）：本地變數（local）只喺函數內有效，全域變數（global）成個程式可用——呢部分係理解「點解 `print(total)` 會出錯」嘅關鍵，亦係筆試常出嘅陷阱題。

**實務情境 1（寫 Code 場景）：** 喺網絡安全腳本入面，你可能要喺唔同階段輸出格式一致嘅日誌（log），例如「時間戳 + 嚴重程度 + 訊息」。與其喺十幾個位置重複寫 `print()` 格式，不如寫一個 `formatLog(timestamp, level, message)` 函數，之後每次呼叫就得到一致輸出；日後要改格式，只需要改函數一個地方，就係「Code management」嘅實際威力。

**實務情境 2（寫 Code 場景）：** 做滲透測試工具時，常要重複計算「某個 IP 喺唔喺某個 subnet 內」呢類判斷。將呢個邏輯寫成 `isInSubnet(ip, subnet)` 函數並回傳布林值（return value），主程式就唔使重複貼同一段邏輯；而且可以為呢個函數獨立建立 test cases（例如 IPv4 邊界值），正正體現「Easy testing」同「Code reusability」兩大優點。

---

## 2. 🎯 考試學習目標（Learning Objectives）

考官會測試以下三項核心能力（課堂列出嘅 Intended Learning Outcomes，英文原句可直接背）：

- **建立正確語法嘅 Python 函數** — Create Python functions using the correct syntax.
  - 即係識寫 `def` 陳述式：關鍵字 `def` + 函數名 + 括號 + 參數 + 冒號 + 縮排嘅函數主體（body）+ 可選嘅 `return`。
- **處理函數嘅輸入與輸出** — Handle function input and output.
  - 即係識分辨參數（parameters）同引數（arguments）、必填參數同有預設值（default value）嘅可選參數、回傳值（return value）同「唔回傳任何嘢（None）」嘅分別，例如 `print()` 回傳 `None`、`round(123.456, 2)` 回傳 `123.46`。
- **喺正確情境使用本地與全域變數** — Use local and global variables in the right situations.
  - 即係識解釋 scope（範疇）概念：函數內建立嘅本地變數出咗函數就失效；全域變數成個程式可用。要識判斷點解 `print(total)` 喺函數外會報錯，以及幾時先應該用全域變數（常數、複合資料型別共享）。

---

## 3. 📖 雙語深度理論知識點（Comprehensive Notes）

### 3.1 為何需要函數：無規律嘅重複任務（Repeated Tasks Without Pattern）

有時一個程式入面要重複做同一類任務好多次。如果任務跟隨規律（pattern），可以用迴圈（loop）處理；但好多時任務並無規律——例如「喺幾行 code 之後，我要顯示某樣嘢上螢幕」；「喺一行之後，又要顯示另一樣嘢」；「喺某啲 code 之後，`if XXX:` 又要顯示嘢」。呢啲情況迴圈幫唔到手。

> **English Standard Definition:** "Sometimes we need to do the same tasks many times in one program. Loops can help when the tasks follow a pattern, but when there is no pattern, we need another way to run tasks by request."

解決方法其實你一早已經用緊——就係 `print()` 呢個函數（函數，function）。你需要輸出時就呼叫一次，例如 `print(xxx)`、`print(yyy)`、`if XXX: print(zzz)`，呢個叫做「按請求執行任務」（Run Tasks By Request）。

> **English Standard Definition:** "A function is a named block of code that performs a specific task; you can call (run) it whenever you need the task to be done."

```python
# 無規律重複任務：喺唔同位置各自呼叫 print()
# after several lines of code
print(xxx)
# after one line
print(yyy)
# after some lines of code
if XXX:
    print(zzz)
```

### 3.2 使用函數嘅四大優點（Advantages of Using Functions）

| 優點 | 繁中解說 | 考試要點 |
|------|---------|---------|
| Modularity（模組化／細化） | 將一個大問題拆細成細部分，每個函數負責解決一個細問題 | 一句記住：Break a big problem into smaller parts. |
| Easy testing（易於測試） | 可以獨立（independently）測試每個部分，為函數建立 test cases | 獨立測試 = 更容易搵 bug |
| Code reusability（重用） | 程式碼寫一次，用很多次 | Write the code once, use it many times. |
| Code management（管理） | 要更新任務時慳時間，而且提供一致性（consistency） | 改一個地方，全部一致更新 |

> **English Standard Definition:** "Using functions provides modularity by breaking a big problem into smaller parts, makes testing easier because individual parts can be tested independently, improves code reusability because code is written once and used many times, and improves code management because updates are consistent and save time."

### 3.3 函數定義 vs 函數執行（Function Definition vs Function Call / Execution）

用函數分兩個階段，呢個分別係必考概念：

- **函數定義（Function definition）＝ 淨係一個計劃（just a plan）**：定義咗，但函數仲未執行。
- **函數呼叫／執行（Function call / execution）＝ 真正執行任務**：程式帶住俾定嘅輸入（inputs）去返定義嗰度，跟住定義執行任務；完成之後，程式會返回（goes back）到函數呼叫嗰一行繼續行。

函數來源分兩種：

- **A) 內建函數（Built-in functions）**：一啲已經整好咗嘅函數，例如 `print()`、`round()`、`exit()`。
- **B) 自訂函數（User-defined functions）**：我哋自己建立嘅函數，去配合自己嘅需求。

> **English Standard Definition:** "A function definition is just a plan; the function has not been run yet. A function call is actually running the tasks: the program goes to the definition with the given inputs, follows the definition and runs the function, and when it is completed, the program goes back to the function call."

### 3.4 函數元素：I-P-O（Function Elements）

設計任何函數前都要諗清楚四個元素：

1. **Name / Objectives（名稱／目的）**：決定呢個函數做啲乜（decide what the function does）。
2. **Input（輸入）**：函數需要啲乜資訊？有幾多個輸入？輸入係必填（required）定可選（optional）？
3. **Output（輸出）**：結果／答案。結果淨係顯示喺螢幕，定係要回傳（return）結果做後續處理（further processing）？定係兩者都要？
4. **Process（過程）**：確切嘅執行步驟（the exact steps）。

流程可以圖示為：**I ➔ P ➔ O**（Input → Process → Output）。答「設計函數」類題目時，跟住 I-P-O 逐步寫答案就唔會漏嘢。

> **English Standard Definition:** "A function has four elements: Name/Objectives (what the function does), Input (what information the function needs), Output (the result or answer, either shown on the screen or returned for further processing), and Process (the exact steps to compute the output)."

### 3.5 參數（Parameters）與回傳值（Return Value）

#### 3.5.1 參數（Parameters，參數）

- 參數係寫喺括號 `()` 入面嘅輸入（input written inside parentheses）。
- 可以係任何型別（Any types）：例如 object、string、int、list、dict。
- 參數可以係**必填（required）**。
- 有**預設值（default values，內定值）**嘅參數係**可選（optional）**——即係呼叫時可以唔俾呢個參數。
- 例子：`sep: str | None = " "` 表示 `sep` 參數預設係空格，可以省略。
- 有啲函數完全唔需要輸入，例如 `exit()`。

> **English Standard Definition:** "Parameters are the inputs written inside parentheses; they can be of any type such as object, string, int, list, or dict. Parameters can be required, while parameters with default values are optional."

#### 3.5.2 回傳值（Return Value，回傳值）

- 回傳值係函數嘅輸出／結果（output/result），但**唔係**螢幕輸出（not the screen output）——螢幕顯示靠 `print()`，回傳值係俾返主程式用嘅資料。
- 可以係任何型別：object、string、int、list、dict。
- 有啲函數唔回傳任何值，即係回傳 `None`，例如 `print()`。

> **English Standard Definition:** "A return value is the output or result of a function (but not the screen output); it can be of any type. Some functions do not return a value — they return None, for example print()."

```python
# print() 唔回傳值：佢只係顯示嘢上螢幕
print("Ming")          # 螢幕輸出: Ming
result = print("Ming") # result 會係 None
print(result)          # 螢幕輸出: None
```

### 3.6 函數呼叫（Function Call）與引數（Arguments，引數）

#### 3.6.1 點樣俾引數（How to give arguments）

- **用函數名稱去執行函數**：例如 `print()`。
- 引數通常**按順序（in sequence）**俾：例如 `print("Ming", "_", "\t")`——三個引數依次對應參數。
- 亦可以**用參數名稱（by parameter names）**俾（即 keyword arguments）：例如 `print("Ming", end="\t", sep="_")`，咁就唔使記順序。
- 引數係俾畀參數（Arguments are given to parameters）嘅：如果函數需要必填參數，你就必須提供對應引數；否則，可選（optional）參數可以跳過。例如 `print("Ming")` 就跳過咗 `sep`、`end` 等可選參數。

> **English Standard Definition:** "Arguments are given to parameters. Arguments are usually given in sequence, but you can also give arguments by parameter names. If a function requires parameters, you must provide arguments; otherwise, optional parameters can be skipped."

```python
# 引數按順序俾（positional）
print("Ming", "_", "\t")        # 輸出: Ming_	（後面跟一個 tab）
# 引數用參數名稱俾（keyword arguments）
print("Ming", end="\t", sep="_")  # 輸出: Ming	（以 tab 結尾）
# 跳過可選參數
print("Ming")                   # 輸出: Ming
```

#### 3.6.2 使用回傳值（Using the return value）

有回傳值嘅函數可以兩種用法：

1. **存入變數**：用一個變數儲存回傳值，之後再用。
2. **直接使用**：喺其他表達式入面直接用函數呼叫嘅結果。

> **English Standard Definition:** "A function with a return value can be used in two ways: store the return value in a variable for later use, or use the return value directly in an expression."

```python
# 方式 1：用變數儲存回傳值
num = round(123.456, 2)
print(num)      # 預期輸出: 123.46

# 方式 2：直接使用回傳值
print(round(123.456, 2))   # 預期輸出: 123.46
```

> ⚠️ **考試溫馨提示（校正投影片輸出）**：投影片列出 `print(round(123.456))` 輸出 `123.46`，呢個係投影片筆誤。Python 中 `round(123.456)`（只俾一個引數）會回傳整數 `123`（banker's rounding，四捨五入至整數）；只有 `round(123.456, 2)` 先會回傳 `123.46`。考試寫輸出時請以 Python 真實行為為準。

### 3.7 內建函數（Built-in Functions）

Python 提供大量已經整好嘅內建函數（built-in functions），例如 `print()`、`round()`、`exit()`、`len()`、`int()`、`str()` 等。完整清單喺官方文件：

> **English Standard Definition:** "Built-in functions are functions that are already created in Python and available for immediate use; see https://docs.python.org/3/library/functions.html for the complete list."

### 3.8 自訂函數語法（User-defined Functions: The `def` Statement）

用 `def` 陳述式（statement）定義函數，結構如下：

- 關鍵字 **`def`**
- **函數名稱**同**括號**
- **參數**（可選）
- **冒號 `:`**
- **函數主體（function body）**——必須**縮排（indented）**，入面寫確切步驟
- **`return` 陳述式**——將結果交返出去（可選）

> **English Standard Definition:** "A def statement consists of the keyword def, a function name and parentheses, optional parameters, a colon, a function body which must be indented, and an optional return statement which gives back the result."

```python
def myFunction1(parameter1, parameter2, parameter3):
    print("do something")
    return "done"
```

### 3.9 函數命名規範（Function Naming）

函數命名同變數命名類似，但有自己嘅慣例：

- 通常**以小寫字母開頭**（start with a small letter）。
- 通常**以動詞（verb，動作詞）開頭**，令人一眼睇得出佢做咩動作：
  - `getXXX`、`findXXX`、`loadXXX`（攞嘢類）
  - `setXXX`、`updateXXX`（改嘢類）
  - `calcXXX`、`convertXXX`、`formatXXX`、`printXXX`（計算／轉換／格式／輸出類）
- 名稱要**具體配合目的**（specific to the objectives），唔好亂改名。

> **English Standard Definition:** "Function names usually start with a small letter and begin with a verb (an action word) such as get, find, load, set, update, calc, convert, format, or print; the name should be specific to the objectives of the function."

### 3.10 案例研習：`calcSum`——只加負數（Case Study: Add Negative Numbers Only）

#### 3.10.1 目的與測試個案（Objectives & test cases）

**Objectives（目的）**：將三個負數加埋，並將總數交返出去（Add three negative numbers and give back the total）➔ 命名為 `calcSum`。

| Case（測試個案） | Expected Result（預期結果） |
|-----------------|---------------------------|
| -1 + -3 + -5 | -9 |
| -1 + -3 + 30 | -4 |
| -1 + 20 + 30 | -1 |
| 10 + 20 + 30 | 0 |

留意：只加**負數**，正數直接忽略，所以第三行 `-1 + 20 + 30` 結果係 `-1`，第四行全部正數結果係 `0`。

#### 3.10.2 I-P-O 規劃（Planning）

- **Input（輸入）**：三個數（因為每次數字都可以唔同），例如 `calcSum(num1, num2, num3)`。
- **Output（輸出）**：啲數嘅總和，但只加負數（only add the numbers which are negative），例如 `return total`。
- **Process（過程）**：逐個檢查每個數係咪負數；如果係，就將佢加入 `total`。

> **English Standard Definition:** "The function input is three numbers; the output is the total of the numbers, but only the numbers which are negative are added; the process is to check whether each number is negative and, if yes, add it to the total."

#### 3.10.3 函數定義（Function Definition）

```python
def calcSum(num1, num2, num3):
    total = 0
    if num1 < 0:
        total = total + num1
    if num2 < 0:
        total = total + num2
    if num3 < 0:
        total = total + num3
    return total
```

#### 3.10.4 函數呼叫與執行追蹤（Function Call & Execution Trace）

完整程式：

```python
def calcSum(num1, num2, num3):
    total = 0
    if num1 < 0:
        total = total + num1
    if num2 < 0:
        total = total + num2
    if num3 < 0:
        total = total + num3
    return total

print("Start")
result = calcSum(-100, 0, 4)
print("The result is", result)
```

執行追蹤（手模擬步驟，考試必識）：

1. `print("Start")` ➔ 螢幕輸出 `Start`
2. 呼叫 `calcSum(-100, 0, 4)`，引數對應參數：`num1 = -100`、`num2 = 0`、`num3 = 4`
3. `total = 0`
4. `if num1 < 0:` ➔ `-100 < 0` 係 **True** ➔ `total = total + num1` ➔ `total = 0 + (-100) = -100`
5. `if num2 < 0:` ➔ `0 < 0` 係 **False** ➔ 跳過
6. `if num3 < 0:` ➔ `4 < 0` 係 **False** ➔ 跳過
7. `return total` ➔ 回傳 `-100`，程式返回呼叫位置
8. `result = -100`
9. `print("The result is", result)` ➔ 螢幕輸出 `The result is -100`

**預期輸出：**

```text
Start
The result is -100
```

> **English Standard Definition:** "When a function is called, the program goes to the function definition with the given inputs, executes the body step by step, and when the return statement is reached, the program goes back to the function call with the returned value."

### 3.11 函數必須先定義後呼叫（Define Before Call — `NameError`）

函數**一定要先定義，先至可以呼叫**（A function must be defined before it can be called）。如果你嘗試呼叫一個未定義嘅函數，Python 會拋出 **`NameError`**。

> **English Standard Definition:** "A function must be defined before it can be called. NameError is raised if you try to call a function which is not defined."

```python
# 錯誤示範：呼叫喺定義之前 ➔ 拋出 NameError
print("Start")
result = calcSum(-100, 0, 4)   # ❌ calcSum 仲未定義！
print("The result is", result)

def calcSum(num1, num2, num3):
    total = 0
    if num1 < 0:
        total = total + num1
    if num2 < 0:
        total = total + num2
    if num3 < 0:
        total = total + num3
    return total
```

**預期輸出（錯誤訊息）：**

```text
Start
NameError: name 'calcSum' is not defined
```

### 3.12 變數作用域（Scope of Variables）

#### 3.12.1 點解下面個程式唔 work？

```python
def calcSum(num1, num2, num3):
    total = 0
    # ...
    return total

calcSum(-100, 0, 4)
print(total)   # ❌ NameError: name 'total' is not defined
```

點解會錯？因為 `total` 係喺函數**入面**建立嘅變數，佢嘅作用域（scope，範圍）只限於函數內部；函數執行完，`total` 就失效，主程式根本睇唔到佢。

#### 3.12.2 兩個主要作用域（Two main scopes）

> **English Standard Definition:** "A scope defines where you can use a name (like a variable) in a program. There are two main scopes: Local scope — names created inside a function work only inside that function while it runs; Global scope — names created outside any function can be used anywhere in the program."

- **本地作用域（Local scope，本地）**：喺函數**內部**建立嘅名稱（names created inside a function）。佢哋只喺個函數執行期間、函數入面有效。
- **全域作用域（Global scope，全域）**：喺任何函數**外面**建立嘅名稱（names created outside any function）。佢哋可以喺程式任何地方使用。

#### 3.12.3 使用全域變數嘅建議（Suggestions on Using Global Variables）

- **本地同全域變數用唔同名**（Use different names for local and global variables）——避免混淆。
- **用全域變數儲存常數**（constants），例如程式設定（program settings），例如 `PASS_SCORE = 40`。
- **用全域變數喺函數之間分享複合資料型別**（compound data types），例如 list 同 dict。

```python
# 全域變數：任何函數內外都可用
PASS_SCORE = 40                  # 常數：合格分數
listScores = [34, 81, 50]        # 複合資料型別（list）喺函數之間共享

def printPassScores():
    for score in listScores:     # 函數內讀取全域 list
        if score > PASS_SCORE:   # 函數內讀取全域常數
            print("Score:", score)

printPassScores()
```

**預期輸出：**

```text
Score: 81
Score: 50
```

> **English Standard Definition:** "Use different names for local and global variables; use global variables for constants like program settings; use global variables to share data among functions with compound data types such as lists and dictionaries."

---

## 4. 📖 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型（Exam Answer Phrase） |
|------------------|----------------|--------------------------------------|
| `function` | 函數：一個有名嘅程式碼區塊，執行特定任務 | A function is a named block of code that performs a specific task. |
| `function definition` | 函數定義：只係寫低計劃，未執行 | A function definition is just a plan; the function has not been run yet. |
| `function call / execution` | 函數呼叫／執行：真正跑去執行函數任務 | A function call runs the function: the program goes to the definition with the given inputs and goes back to the call when completed. |
| `built-in function` | 內建函數：Python 已經整好嘅函數 | Built-in functions are functions that are already created in Python, such as print() and round(). |
| `user-defined function` | 自訂函數：自己用 `def` 建立嘅函數 | User-defined functions are functions we create ourselves to fit our needs. |
| `parameter`（參數） | 定義時寫喺括號入面嘅輸入，可必填或可選 | Parameters are the inputs written inside parentheses; parameters with default values are optional. |
| `argument`（引數） | 呼叫函數時實際俾出嘅值，俾畀參數 | Arguments are given to parameters, usually in sequence or by parameter names. |
| `default value`（內定值） | 參數嘅預設值，有預設值嘅參數可省略 | Parameters with default values are optional and can be skipped when calling the function. |
| `required parameter` | 必填參數：呼叫時一定要俾 | If a function requires parameters, you must provide arguments. |
| `return value`（回傳值） | 函數交返出去嘅結果（非螢幕輸出） | A return value is the output or result of a function, but not the screen output. |
| `None` | 表示「無值」；唔回傳值嘅函數回傳 `None` | Some functions do not return a value — they return None, e.g., print(). |
| `def` statement | 定義函數嘅陳述式：`def` + 名稱 + 括號 + 冒號 + 縮排主體 | A def statement consists of the keyword def, a function name, parentheses, optional parameters, a colon, and an indented function body. |
| `function body` | 函數主體：必須縮排嘅執行步驟 | The function body must be indented to give the exact steps. |
| `indentation`（縮排） | Python 用縮排界定程式碼區塊 | The function body must be indented; indentation defines the block of code. |
| `local variable`（本地變數） | 函數內建立嘅變數，只喺函數內有效 | Local variables are names created inside a function; they work only inside that function while it runs. |
| `global variable`（全域變數） | 任何函數外建立嘅變數，成個程式可用 | Global variables are names created outside any function; they can be used anywhere in the program. |
| `scope`（範疇） | 名稱（變數）喺程式入面邊度可以用 | A scope defines where you can use a name (like a variable) in a program. |
| `Modularity`（模組化） | 將大問題拆成細部分，每個函數解決一個細問題 | Functions provide modularity by breaking a big problem into smaller parts. |
| `Code reusability`（重用） | 程式碼寫一次，用好多次 | Write the code once, use it many times. |
| `Code management`（管理） | 更新任務時慳時間並保持一致 | Functions improve code management by saving time and providing consistency when updating tasks. |
| `NameError` | 呼叫未定義名稱／函數時拋出嘅錯誤 | NameError is raised if you try to call a function which is not defined. |
| `keyword argument`（關鍵字引數） | 用參數名稱俾引數，例如 `end="\t"` | You can give arguments by parameter names, e.g., print("Ming", end="\t", sep="_"). |
| `I-P-O`（Input-Process-Output） | 函數設計三步曲：輸入 → 過程 → 輸出 | Plan a function by deciding its Input, Process, and Output. |
| `test case`（測試個案） | 用特定輸入驗證函數輸出係咪正確 | Create test cases for testing the functions independently. |

---

## 5. 🗺️ 循序漸進學習路線（Learning Path）

**第一站：理解「定義 vs 呼叫」** ➔ 背誦 `Function definition is just a plan; a function call actually runs the tasks.` ➔ 識分辨課堂例子（`print()` 係呼叫；`def myFunction1(...)` 係定義）➔ 能答：`Explain the difference between a function definition and a function call.`

**第二站：理解 I-P-O 函數元素** ➔ 背誦 `A function has Name/Objectives, Input, Output, and Process.` ➔ 識為題目寫 I-P-O 規劃表（例如 `calcSum`：三個數輸入、只加負數、`return total`）➔ 能答：`Describe the input, process and output of the function calcSum.`

**第三站：理解參數與回傳值** ➔ 背誦 `Parameters with default values are optional; some functions return None, e.g., print().` ➔ 識寫 `def` 語法、識用變數儲存回傳值（`num = round(123.456, 2)`）➔ 能答：`What is the return value of print()?`（答 `None`）及 `What does round(123.456, 2) return?`（答 `123.46`）。

**第四站：理解引數嘅兩種俾法** ➔ 背誦 `Arguments are given to parameters, in sequence or by parameter names.` ➔ 識寫 `print("Ming", "_", "\t")` 同 `print("Ming", end="\t", sep="_")`，識講「required 參數一定要俾、optional 可跳過」➔ 能答：`How can arguments be passed to a function? Give an example.`

**第五站：掌握 `def` 語法與命名** ➔ 背誦 `A def statement needs the keyword def, a name, parentheses, a colon, and an indented body.` ➔ 識由零寫 `calcSum`、識用動詞前綴命名（`calcXXX`、`getXXX`、`setXXX`）➔ 能答：`Write a function that adds three negative numbers and returns the total.`

**第六站：掌握執行追蹤（execution trace）** ➔ 背誦 `When a function is called, the program goes to the definition with the given inputs and returns to the call when completed.` ➔ 能手模模擬 `calcSum(-100, 0, 4)` 每一步嘅 `total` 值（0 → -100 → return -100）➔ 能答：`Trace the execution of the program and state the output.`（答案：`Start`／`The result is -100`）

**第七站：理解作用域** ➔ 背誦 `Local variables work only inside the function; global variables can be used anywhere in the program.` ➔ 識解釋點解函數外 `print(total)` 會 `NameError`；識用全域常數同 list 共享（`PASS_SCORE`、`listScores` 例子）➔ 能答：`Why does print(total) cause an error outside the function?`（答：`total` 係 local variable，超出函數就唔存在）以及 `When should we use global variables?`（答：constants 同喺函數之間共享 compound data types）。

**第八站：考前綜合** ➔ 背誦四大優點一句（Modularity / Easy testing / Code reusability / Code management）➔ 識寫完整程式（定義 + 呼叫 + 輸出）➔ 能答：`State the advantages of using functions.`（四點全寫，附例子）

---

## 6. 🎒 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 關鍵數字與事實

| 項目 | 內容 |
|------|------|
| 函數兩階段 | definition（計劃）→ call（執行） |
| 函數來源 | built-in（內建）／ user-defined（自訂） |
| 函數四元素 | Name/Objectives、Input、Output、Process（I-P-O） |
| 參數位置 | 括號 `()` 內，任何型別（object/string/int/list/dict） |
| 有預設值嘅參數 | optional，可省略（例：`sep: str | None = " "`） |
| 唔使輸入嘅函數 | 例：`exit()` |
| `print()` 回傳 | `None`（唔回傳值） |
| `round(123.456, 2)` | 回傳 `123.46` |
| `calcSum(-100, 0, 4)` | 回傳 `-100`，輸出 `Start`／`The result is -100` |
| 未定義就呼叫 | `NameError: name 'xxx' is not defined` |
| 函數外讀本地變數 | `NameError`（`total` 例子） |
| 作用域兩種 | local（函數內）／ global（函數外、全程式） |
| 全域變數建議用法 | 常數（settings）+ 複合型別（list/dict）共享 |
| `printPassScores()` 輸出 | `Score: 81`／`Score: 50` |

### 語法速查對照表

```python
# 1. 定義（唔會執行）
def 函數名(參數1, 參數2, 參數3):   # def + 名稱 + 括號 + 冒號
    步驟1                          # 主體必須縮排
    步驟2
    return 結果                    # 可選

# 2. 呼叫（先定義後呼叫！）
result = 函數名(引數1, 引數2, 引數3)

# 3. 引數兩種俾法
print("Ming", "_", "\t")            # 按順序（positional）
print("Ming", end="\t", sep="_")    # 用參數名（keyword）

# 4. 回傳值兩種用法
num = round(123.456, 2)             # 存入變數
print(round(123.456, 2))            # 直接使用

# 5. 標準考試程式模板：def + 條件 + return
def calcSum(num1, num2, num3):
    total = 0
    if num1 < 0:
        total = total + num1
    if num2 < 0:
        total = total + num2
    if num3 < 0:
        total = total + num3
    return total
```

### 英文極速記憶口訣

- **定義 vs 呼叫**：`Define = plan, Call = run.`
- **函數四元素**：`Name, Input, Output, Process`（記 I-P-O 三步）。
- **四大優點**：`M-E-R-C` → **M**odularity、**E**asy testing、**R**eusability、**C**ode management。
- **參數 vs 回傳值**：`Parameter in, Return out, print() shows, returns None.`
- **有預設值**：`Default = optional, skip it if you like.`
- **作用域**：`Local inside only; Global anywhere.`
- **先定義後呼叫**：`Define before call, or NameError falls.`
- **命名**：`Small letter + verb: get/set/calc/print.`
- **回傳值用法**：`Store it or use it directly.`
