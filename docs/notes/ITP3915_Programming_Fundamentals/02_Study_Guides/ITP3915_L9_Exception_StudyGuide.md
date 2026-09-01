# ITP3915 Programming Fundamentals — Lecture 10: Exceptions 雙語應考學習指南

> 課程：ITP3915 Programming Fundamentals｜課題：Lecture 10 — Exceptions（例外處理）及 Basic Testing（基礎測試）｜適用：測驗／考試溫習

---

## 1. 📝 課程概要與實務情境 (Summary & Real-world Context)

本課堂其實由兩大主題組成。第一半是「由流程圖建立測試計劃」（From Flowchart to Test Plan）：先用流程圖把程式嘅執行步驟視覺化，再從流程圖入面嘅決策點（decision points）找出所有替代路徑（alternate paths），從而設計出一張正式嘅測試計劃表（test plan），逐個測試案例（test case）驗證「輸入 → 處理 → 預期輸出」。第二半係重頭戲「例外處理」（Exception Handling）：當程式執行期間出錯（例如用戶輸入咗唔係數字嘅嘢、將一個數除 0），Python 會拋出例外（exception），如果唔處理，用戶就會見到一大堆技術錯誤訊息，甚至成個程式 crash。

點解呢啲內容喺真實開發咁重要？諗一個實際寫 Code 場景：你寫一個銀行 ATM 程式，要求用戶輸入提款金額，然後做 `amount = 1000 / withdrawal`。如果用戶貪快打入 "abc" 或者打 0，程式會直接彈出 `ValueError`／`ZeroDivisionError` 嘅英文 Traceback。一般用戶根本睇唔明，仲會覺得系統好「脆弱」；更嚴重嘅係，喺網絡安全（cybersecurity）角度，呢啲預設錯誤訊息會向攻擊者洩露系統內部資訊（例如 Python 版本、檔案路徑、函數名稱），俾人用嚟策劃攻擊。正確做法係用 `try/except` 捕捉錯誤，顯示友善嘅提示訊息，等程式可以「優雅地繼續行」（fail gracefully）而唔係死機。另一個場景：你開發一個讀取檔案／連接資料庫／呼叫 API 嘅程式，檔案唔存在或者網絡斷線都係常見錯誤，你同樣要靠 `try/except` 先至寫到穩定、可上線嘅產品級程式碼。

---

## 2. 🎯 考試學習目標 (Learning Objectives)

考官會測試以下核心能力（附英文原文）：

| # | 核心能力（繁體中文） | English Learning Objective |
|---|----------------------|----------------------------|
| 1 | 用流程圖建立簡單嘅測試計劃 | Create a simple test plan using flowcharts. |
| 2 | 用 `try/except` 結構處理例外（異常） | Handle exceptions using `try/except` structure. |
| 3 | 能從流程圖識別測試案例、替代路徑及驗證邏輯 | Identify test cases, alternate paths and validation logic of a simple program from a flowchart. |
| 4 | 能解釋預設錯誤訊息對用戶及網絡安全嘅危害 | Explain why default error messages should not be shown to end users (usability + cybersecurity). |
| 5 | 能分辨常見例外類型（`ValueError`、`ZeroDivisionError` 等）並寫出對應處理 | Distinguish common exception types and write matching `except` handlers. |
| 6 | 能使用多個 `except` 區塊及通用處理器 `except Exception as err` | Use multiple `except` blocks and a generic handler `except Exception as err`. |
| 7 | 能寫出「重複輸入直到有效為止」嘅輸入驗證迴圈 | Write a validation loop using `while True` + `try/except` + `break`. |

---

## 3. 📖 雙語深度理論知識點 (Comprehensive Notes)

### Part A：從流程圖到測試計劃 (From Flowchart to Test Plan)

#### A1. 流程圖 (Flowchart) 定義

流程圖係一種用圖形視覺化嚟表示程序／流程步驟嘅圖表。佢嘅作用係將複雜嘅工作流程拆解成簡單、清晰嘅步驟。喺本課程入面，我哋用流程圖嚟**識別測試案例、替代路徑同驗證邏輯**。

> **English Standard Definition:**
> A **flowchart** is a diagram which visually represents the steps in a process. It helps break down complex workflows into simple steps. In this module, we use flowcharts to identify **test cases**, **alternate paths** and **validation logic** of a simple program.

#### A2. 流程圖基本符號 (Basic Symbols)

考試常問「每個形狀代表咩意思」，必背：

| Shape（形狀） | Meaning（含義） |
|---------------|-----------------|
| Rectangle（長方形） | A **task or action step**（一個任務或動作步驟） |
| Rounded Rectangle（圓角長方形） | The **start** or the **end**（開始或結束） |
| Rhombus / Diamond（菱形） | A **branching decision point**（分支決策點，例如 `if` 條件） |
| Parallelogram（平行四邊形） | A **data input or output**（資料輸入或輸出） |
| Arrow（箭頭） | **Direction of flow**（流程方向） |

> **English Standard Definitions:**
> - Rectangle: A task or action step.
> - Rounded rectangle: The start or the end of the flowchart.
> - Rhombus / Diamond: A branching decision point.
> - Parallelogram: A data input or output.
> - Arrow: Direction of flow.

#### A3. 範例程式：解二次方程 (Example – Solving Quadratic Equations)

教材用一條解二次方程嘅程式示範「點樣由程式碼構思流程圖，再轉成測試計劃」。程式碼如下：

```python
a = int(input("Enter a: "))
if a != 0:
    b = int(input("Enter b: "))
    c = int(input("Enter c: "))
    print(f"a={a}, b={b}, c={c}")
    d = b**2 - 4 * a * c
    x1 = (-b + d**0.5) / (2*a)
    if d == 0:
        print(f"x={x1}")
    else:
        x2 = (-b - d**0.5) / (2*a)
        print(f"x1={x1}, x2={x2}")
print("bye")
```

**邏輯拆解：**
1. 用戶輸入 `a`；如果 `a == 0`，程式跳過成個計算區塊，直接印 `bye`（因為除數 `2*a` 會係 0，唔可以計）。
2. `a != 0` 時先輸入 `b`、`c`，計判別式 `d = b**2 - 4*a*c`。
3. `d == 0` 代表得一個實根，印 `x={x1}`；`d != 0` 代表兩個實根，印 `x1` 同 `x2`。
4. 無論點行，最後都印 `bye`。

**預期輸出（Expected Output）：**

輸入 `a=1, b=4, c=4`（即 `d = 16 - 16 = 0`，單一根）：

```
Enter a: 1
Enter b: 4
Enter c: 4
a=1, b=4, c=4
x=-2.0
bye
```

輸入 `a=3, b=-4, c=1`（即 `d = 16 - 12 = 4`，兩個根）：

```
Enter a: 3
Enter b: -4
Enter c: 1
a=3, b=-4, c=1
x1=1.0, x2=0.3333333333333333
bye
```

> ⚠️ **教材勘誤 (Errata)**: 原投影片嘅測試數據表印咗 `d = -20`、`x1 = -1.0`。經重新計算，`a=3, b=-4, c=1` 時 `d = (-4)**2 - 4*3*1 = 16 - 12 = 4`，所以 `x1 = 1.0`、`x2 ≈ 0.333`。考試計數請以正確數學為準。另外注意：若 `d < 0`，`d**0.5` 喺 Python 3 唔會拋錯，而係返回**複數**（complex，例如 `(1.22e-16+2j)`），所以程式唔會 crash 而會印出複數根；只有改用 `math.sqrt(d)` 先會拋 `ValueError: math domain error`（原教材冇處理 `d < 0` 嘅情況，延伸思考點）。

#### A4. 條件與替代路徑 (Conditions and Alternate Paths)

測試計劃嘅核心思想：**每個決策點都要「兩邊都測」**。本程式有兩個決策點：

1. `if a != 0:` —— `a` 係**用戶輸入**（user input）。所以要用 `a = 0` 同 `a ≠ 0` 兩類數值去測。
2. `if d == 0:` —— `d` 係**計算得出嘅欄位**（calculated field, `d = b**2 - 4*a*c`）。要揀一組令 `d = 0` 嘅數（例如 `a=1, b=4, c=4`）同一組令 `d ≠ 0` 嘅數（例如 `a=3, b=-4, c=1`）去測。

> **English Standard Definition:**
> A test plan must cover every **branch** of the flowchart. Test data is chosen so that each decision condition (e.g. `a != 0`, `d == 0`) is tested with **both true and false** values, covering all alternate paths.

#### A5. 完整測試計劃表 (Full Test Plan with 3 Test Cases)

教材將「輸入、處理、預期輸出」（Input, Process and Expected Output）整理成一張正式測試計劃，包含 **3 個測試案例**：

| ID | Description（描述） | Procedure（步驟） | Expected Result（預期結果） |
|----|---------------------|-------------------|-----------------------------|
| 1 | Verify that **no calculation occurs** when `a = 0`. | Enter `0` for `a`. | Screen shows `bye` only. |
| 2 | Check whether a **single root** can be found. | Enter `1` for `a`, `4` for `b`, `4` for `c`. | Screen shows `a=1, b=4, c=4`, `x=-2.0`, `bye`. |
| 3 | Check whether **two roots** can be found. | Enter `3` for `a`, `-4` for `b`, `1` for `c`. | Screen shows `a=3, b=-4, c=1`, `x1=1.0, x2=0.3333333333333333`, `bye`. |

> 完整測試計劃表一般仲有 **Actual Result（實際結果）** 同 **Tested by（測試員）** 兩欄，需要實際執行後填寫提交（教材註明 “You need to submit them after completing the test cases.”）。

---

### Part B：例外處理 (Exception Handling)

#### B1. 咩嘢係例外 (What is an Exception)

到目前為止，大家應該已經遇過好多種錯誤：`SyntaxError`、`NameError`、`TypeError`、`ValueError`、`IndexError`、`KeyError`。呢啲喺**程式執行期間**（run-time）先至被偵測到嘅錯誤，就叫做**例外（exceptions）**。例外發生時會產生錯誤訊息，話俾你知「邊度出咗咩事」。

> **English Standard Definition:**
> Errors detected **during execution** are called **exceptions**, which result in error messages about **what went wrong**.

常見例外類型速記（必背）：

| 例外類型 | 幾時發生（繁體中文） | English Trigger |
|----------|----------------------|-----------------|
| `SyntaxError` | 語法寫錯，程式根本冇得執行 | Invalid Python syntax |
| `NameError` | 用咗未定義嘅變數／函數名 | Using an undefined name |
| `TypeError` | 對唔相容嘅型別做操作 | Operation on incompatible types |
| `ValueError` | 值本身唔啱（例如將 `"abc"` 轉做 `float`） | Function receives an argument of the right type but an inappropriate value |
| `IndexError` | 用咗超出範圍嘅 list 索引 | Index out of range |
| `KeyError` | 用咗唔存在嘅 dict key | Key not found in dictionary |
| `ZeroDivisionError` | 將數字除 0 | Division by zero |

#### B2. 點解唔應該向終端用戶顯示預設錯誤訊息

考試必考一條論述題：「點解唔好直接將 Python 預設錯誤訊息顯示俾用戶睇？」教材俾咗兩個理由：

1. **用戶角度**：終端用戶通常冇足夠技術知識去理解例外訊息嘅確切含義（End users usually do not have the required technical knowledge to understand the exact meaning of the exception）。
2. **網絡安全角度**：喺網絡安全領域，呢啲預設錯誤訊息可能**洩露太多關於系統嘅資訊**（give away too much information about the system），例如程式語言、版本、路徑、內部結構，俾攻擊者有機可乘。

> **English Standard Definitions:**
> It is **not a good idea** to display these default error messages to end users, because:
> 1. End users usually do **not have the required technical knowledge** to understand the exact meaning of the exception.
> 2. In **cybersecurity**, these default error messages can **give away too much information** about the system.

#### B3. 幾時應該用 try/except (When to Use try/except)

教材列明三大類情況，記低佢哋（答題時用嚟舉例）：

1. **用戶輸入／輸入驗證**（User input, input validation）—— 例如用戶應該打數字但打咗字母；
2. **輸入／輸出操作**（Input/output operations）—— 例如讀寫檔案、資料庫或 API，檔案唔存在、網絡斷線都會出錯；
3. **等待或長時間執行嘅程序**（Waiting or long-running processes）。

> **English Standard Definition:**
> Use the **`try/except`** block to handle errors for: (1) **user input** and **input validation**; (2) **input/output operations**, e.g. reading or writing files, databases, or APIs; (3) **waiting or long-running processes**.

#### B4. 基本 try/except 結構（核心語法，必背）

```python
try:
    x = float( input("Enter a number: ") )
except ValueError:
    print("Not a correct number.")
print("yes, can be continued")
```

**執行機制（兩個情況）：**

- **情況一：`try` 區塊冇錯誤**（例如用戶輸入 `5`）→ `except` 區塊**被跳過**（skipped），程式繼續執行 `try/except` 之後嘅下一行。
- **情況二：`try` 區塊有錯誤**（例如用戶輸入 `abc`）→ 錯誤類型**匹配** `ValueError` → `except` 區塊處理呢個錯誤，之後程式照樣繼續執行 `try/except` 之後嘅下一行。

> **English Standard Definitions:**
> The **`try` clause** tries to run a block of code. If **no error** occurs in the `try` clause, the `except` clause is **skipped** and the program **continues with the next line** after the `try`/`except` blocks. If an **error occurs** and matches the specific error type (e.g. `ValueError`), the **`except` clause** handles this error; after the error is handled, the program continues with the next line after the `try`/`except` blocks.

**預期輸出（Expected Output）：**

用戶輸入 `5`（正確數字）：

```
Enter a number: 5
yes, can be continued
```

用戶輸入 `abc`（錯誤輸入，被 `except ValueError` 捕捉）：

```
Enter a number: abc
Not a correct number.
yes, can be continued
```

> 💡 **重點**：錯誤被處理之後，程式**唔會 crash**，而且會**繼續行落去**——呢個就係 exception handling 嘅核心價值。

#### B5. 錯誤唔匹配嘅情況 (When the Error does not Match)

```python
try:
    x = float( input("Enter a number: ") )
    ans = 25 / x
except ValueError:
    print("Not a correct number.")
print("yes, can be continued")
```

**問題**：如果用戶輸入 `0` 會點？`float("0")` 係合法嘅（唔會拋 `ValueError`），所以 `try` 入面繼續行到 `ans = 25 / x`，即 `25 / 0` —— 呢個係 **`ZeroDivisionError`**，**唔匹配** `except ValueError`，所以冇任何 handler 接住佢 → 程式拋出未處理例外並 crash（顯示 Traceback），最後一行 `print("yes, can be continued")` **唔會執行**。

**預期輸出（Expected Output）：**

```
Enter a number: 0
Traceback (most recent call last):
  File "<stdin>", line 3, in <module>
ZeroDivisionError: division by zero
```

> **English Standard Definition:**
> If the error type **does not match** any `except` clause, the exception is **unhandled**: the program crashes with an error traceback and the code after the `try`/`except` blocks is **not executed**.

> 💡 **考試提示**：`float()` 嘅轉換只會拋 `ValueError`，但「除 0」係另一種錯誤（`ZeroDivisionError`）。一個 `except` 只處理一種（或一組）錯誤，所以需要**多個 `except` 區塊**——呢個正正係下一節。

#### B6. 多個 except 區塊 (Multiple except Blocks)

```python
try:
    x = float( input("Enter a number: ") )
    ans = 25 / x
except ValueError:
    print("Not a correct number.")
except ZeroDivisionError:    # another specific handler
    print("Cannot be 0.")
except Exception as err:     # a generic handler for all other errors
    print(f"Unexpected error: {err=}.")
print("yes, can be continued")
```

**機制拆解：**

1. **`except ValueError:`** —— 處理轉換失敗（輸入唔係數字）。
2. **`except ZeroDivisionError:`** —— 第二個「特定處理器」（another specific handler），處理除 0 情況，印 `Cannot be 0.`。
3. **`except Exception as err:`** —— 「通用處理器」（a generic handler），捕捉**所有其他**未特定列出嘅錯誤；用 `as err` 將例外物件存入變數 `err`，再用 f-string 嘅 `{err=}` 語法印出嚟。

> **English Standard Definitions:**
> You can write **multiple `except` blocks**, each handling a **specific error type**; Python checks them in order and runs the first one that matches. A final **generic handler** `except Exception as err:` catches **all other errors** not covered by the specific handlers. The `as err` clause binds the exception object to a variable so you can inspect or display it.

**預期輸出（Expected Output）：**

- 輸入 `abc`（→ `ValueError`）：`Not a correct number.` → `yes, can be continued`
- 輸入 `0`（→ `ZeroDivisionError`）：`Cannot be 0.` → `yes, can be continued`
- 輸入 `5`（成功）：直接 `yes, can be continued`（冇錯誤訊息）

```
Enter a number: 0
Cannot be 0.
yes, can be continued
```

> 💡 **考試提示**：特定錯誤（specific handler）一定要寫喺通用處理器（generic handler）**之前**，因為 `except Exception` 會接住所有錯誤，寫錯次序會令特定處理器永遠冇機會執行。

#### B7. 重複輸入直到有效為止 (Repeat Until a Valid Number is Entered)

用 `while True` + `try/except` + `break` 做輸入驗證迴圈——教材最實用嘅 pattern：

```python
while True:
    try:
        x = float( input("Enter a number: ") )
        break
    except ValueError:
        print("Not a correct number.")
print("yes, can be continued")
```

**機制拆解：**
- `while True` 係無限迴圈；只要 `try` 入面成功執行（輸入有效數字），`break` 就會即刻跳出迴圈；
- 如果輸入無效，`except ValueError` 印提示訊息，迴圈**繼續行**，再問一次；
- 只有輸入有效數字先會去到 `break`，所以程式永遠唔會帶住無效輸入繼續行。

**預期輸出（Expected Output）：**

```
Enter a number: abc
Not a correct number.
Enter a number: 5
yes, can be continued
```

> **English Standard Definition:**
> The `while True` loop repeats the input request until a valid value is entered: the `try` block attempts the conversion, `break` exits the loop on success, and the `except` clause prints an error message and lets the loop ask again.

#### B8. 例外處理答題框架（How to Answer an Exam Question）

當考官問「trace 呢段程式／解釋執行流程」，按以下框架作答（中英皆可）：

1. 指出 `try` clause 嘗試執行咩操作；The `try` clause attempts to run `...`.
2. 分情況討論：如果輸入有效 → except 被跳過；if no error occurs, the `except` clause is skipped.
3. 如果輸入無效 → 拋出 `ValueError` 並由對應 `except` 處理；if a `ValueError` occurs, the matching `except` clause handles it.
4. 總結：錯誤處理後程式會繼續執行下一行；after handling, the program continues with the next line after the `try`/`except` blocks.
5. 如有 `break`／`while True`，補充迴圈會重複直至輸入有效；the loop repeats until a valid number is entered.

---

## 4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|--------------------|------------------|----------------------------------------|
| flowchart | 流程圖：視覺化表示程序步驟嘅圖表 | A flowchart is a diagram which visually represents the steps in a process. |
| test plan | 測試計劃：列出測試案例、步驟同預期結果嘅文件 | A test plan defines the test cases, procedures, expected results and actual results of a program. |
| test case | 測試案例：一組輸入、執行步驟同預期輸出 | A test case consists of test data, the procedure, and the expected output. |
| expected output | 預期輸出：執行後應顯示嘅結果 | The expected output is the screen result we predict before running the test. |
| actual result | 實際結果：真正執行後得到嘅輸出 | The actual result is what the program really prints after execution. |
| alternate path | 替代路徑：決策點另一分支嘅執行路線 | Alternate paths are the different branches a program can take at a decision point. |
| decision point | 決策點：流程圖中菱形表示嘅分支位置 | A diamond (rhombus) represents a branching decision point in a flowchart. |
| validation logic | 驗證邏輯：檢查輸入是否合法嘅邏輯 | Validation logic checks whether user input is acceptable before processing. |
| exception | 例外／異常：執行期間偵測到嘅錯誤 | Errors detected during execution are called exceptions. |
| exception handling | 例外處理：用 try/except 捕捉並處理錯誤 | Exception handling uses the `try`/`except` structure to deal with run-time errors. |
| try clause | try 區塊：嘗試執行嘅程式碼 | The `try` clause tries to run a block of code. |
| except clause | except 區塊：處理特定錯誤嘅程式碼 | The `except` clause handles the error when it matches the specified error type. |
| generic handler | 通用處理器：捕捉所有其他錯誤嘅兜底 handler | `except Exception as err:` is a generic handler for all other errors. |
| SyntaxError | 語法錯誤：程式碼唔符合 Python 語法 | A SyntaxError means the code does not follow valid Python syntax. |
| NameError | 名稱錯誤：使用未定義嘅變數或函數 | A NameError is raised when an undefined name is used. |
| TypeError | 型別錯誤：對不相容型別做操作 | A TypeError occurs when an operation is applied to incompatible types. |
| ValueError | 值錯誤：型別正確但值唔啱（如 `float("abc")`） | A ValueError is raised when a function gets an argument of the right type but an inappropriate value. |
| IndexError | 索引錯誤：list 索引超出範圍 | An IndexError occurs when an index is out of range. |
| KeyError | 鍵錯誤：dict 中冇呢個 key | A KeyError is raised when a key is not found in a dictionary. |
| ZeroDivisionError | 除零錯誤：將數字除以 0 | A ZeroDivisionError is raised when a number is divided by zero. |
| crash / traceback | 程式崩潰／錯誤追蹤訊息 | If an error does not match any except clause, the program crashes with a traceback. |
| user-friendly message | 用戶友善訊息：易明、唔洩露系統資訊嘅提示 | We replace default error messages with user-friendly messages. |
| input validation | 輸入驗證：確保用戶輸入有效先繼續 | Input validation prevents invalid user input from breaking the program. |
| break | 跳出迴圈嘅語句 | `break` exits the loop immediately. |
| while True | 無限迴圈（配合 break 使用） | The `while True` loop repeats until a valid input is entered and `break` is executed. |
| continue with the next line | 繼續執行 try/except 之後嘅下一行 | After the error is handled, the program continues with the next line after the `try`/`except` blocks. |

---

## 5. 🗺️ 循序漸進學習路線 (Learning Path)

**Step 1 — 先理解咩觀念（Understand the Concepts）**
- 流程圖五種符號各自代表咩（矩形＝動作、圓角矩形＝開始／結束、菱形＝決策、平行四邊形＝輸入輸出、箭頭＝流向）。
- 測試計劃點解要「每個決策點兩邊都測」（`a != 0` 測 0 同非 0；`d == 0` 揀數值令 `d` 等於 0 同非 0）。
- 例外係「執行期間」嘅錯誤；`try` 冇錯 → `except` 跳過；有錯匹配 → `except` 處理；唔匹配 → crash。
- 點解唔俾用戶睇預設錯誤訊息（用戶唔識睇 + 網絡安全洩露系統資訊）。

**Step 2 — 背誦咩英文短語（Memorise the Key Phrases）**
- “Errors detected during execution are called exceptions.”
- “If no error occurs, the except clause is skipped and the program continues with the next line.”
- “Default error messages can give away too much information about the system.”
- “Use the try/except block to handle errors for user input, I/O operations, and long-running processes.”

**Step 3 — 掌握咩計算／寫法（Master the Coding & Calculation）**
- 識計 `d = b**2 - 4*a*c`（`a=1,b=4,c=4` → `d=0` 單根；`a=3,b=-4,c=1` → `d=4` 雙根），並對應預期輸出。
- 默寫基本 `try/except ValueError` 結構；`try` → `except` → 之後繼續行。
- 默寫多個 `except`（`ValueError`、`ZeroDivisionError`、`except Exception as err`）及次序（特定喺前、通用喺後）。
- 默寫 `while True` + `try` + `break` + `except` 嘅輸入驗證迴圈。

**Step 4 — 能解答咩英文考題（Answer Exam Questions）**
- 「Given the following code, what is the output when the user enters `abc`?」（trace 輸出：`Not a correct number.` + `yes, can be continued`）
- 「What happens if the user enters `0`?」（`ZeroDivisionError` 唔匹配 `ValueError` → crash，最後一行唔會印）
- 「Why should we not display default error messages to end users?」（兩點：technical knowledge + cybersecurity）
- 「Rewrite the program so it keeps asking until a valid number is entered.」（寫 `while True` + `break` pattern）
- 「Draw a flowchart symbol table / complete the test plan table.」（符號含義 + 3 個 test cases 表）

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 流程圖符號速記（5 秒版）
| 符號 | 意思 | English |
|------|------|---------|
| ▭ 長方形 | 動作步驟 | action step |
| ▭▭ 圓角長方形 | 開始／結束 | start / end |
| ◇ 菱形 | 決策點 | decision point |
| ▱ 平行四邊形 | 輸入／輸出 | input / output |
| → 箭頭 | 流向 | direction of flow |

### 測試計劃「揀數據」口訣
> 每個決策點：**兩邊都測** —— user input（`a`）測 0 同非 0；calculated field（`d`）揀數令 `d=0`（`1,4,4`）同 `d≠0`（`3,-4,1`）。預期輸出由「輸入 → 處理 → 輸出」推導。

### 例外處理語法模板（照抄即滿分）
```python
try:
    x = float(input("Enter a number: "))
    ans = 25 / x
except ValueError:
    print("Not a correct number.")
except ZeroDivisionError:
    print("Cannot be 0.")
except Exception as err:
    print(f"Unexpected error: {err=}.")
print("yes, can be continued")
```

### 輸入驗證迴圈模板
```python
while True:
    try:
        x = float(input("Enter a number: "))
        break
    except ValueError:
        print("Not a correct number.")
```

### 必背關鍵數字與事實
- 例外類型 7 款：`SyntaxError`、`NameError`、`TypeError`、`ValueError`、`IndexError`、`KeyError`、`ZeroDivisionError`（教材列出 6 款 + 除零喺範例出現，全部要識分）。
- `try/except` 三大應用場合：user input（1）、I/O operations（2）、long-running processes（3）。
- 唔顯示預設錯誤訊息嘅兩大原因：**usability**（用戶冇技術知識）+ **cybersecurity**（洩露系統資訊）。
- 錯誤唔匹配 → **crash**，`try/except` 之後嘅行**唔會執行**。
- `except Exception` 一定要擺喺所有 specific handler **之後**。
- `{err=}` 係 f-string 除錯語法（Python 3.8+），會印 `err=錯誤物件`。

### 英文極速記憶口訣
> **“Try it, catch it, move on.”** —— try 嘗試執行；except 接住錯誤；處理完繼續下一行（continues with the next line）。
> **“No error → skip except; error → run except; no match → crash.”**
> **“Too much info = security risk.”** —— 預設錯誤訊息會 give away too much information about the system。
> **“Valid in → break out.”** —— `while True` 入面輸入有效就 `break` 跳出迴圈。

---

*本指南由 ITP3915 Lecture 10（Exceptions & Basic Testing）教材重寫，已過濾原教材雜訊（XML 殘留／作者名），並標註投影片數據勘誤（`d=-20` → `d=4`）。祝你考試順利！*
