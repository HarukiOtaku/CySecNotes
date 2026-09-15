# ITP3915 Programming Fundamentals — Final Cheat Sheet（考前極速總複習）

> **覆蓋範圍**：Lecture 1 Introduction to Python｜Lecture 2 Interaction (Input/Output)｜Lecture 3 Conditional Statements｜Lecture 4 For Loop｜Lecture 5 While Loop｜Lecture 6-7 Tuple and List｜Lecture 8 Dictionary and Set｜Lecture 9 Functions｜Lecture 10 Exceptions & Basic Testing｜Lecture 11 Object-Oriented Programming（10 份源頭 Study Guide 全覆蓋）
> **使用時機**：考試前 5–10 分鐘快速掃描；只保留「關鍵數字、對比表、英文口訣、考官易錯點」。
> 詳細解說請回查：`02_Study_Guides/` 內對應各課的 Study Guide（逐份檔名見文末）。

**速覽目錄**：P1 Python 基礎｜P2 輸入輸出與字串方法｜P3 條件與邏輯運算子｜P4 for 迴圈與 `range()`｜P5 while 迴圈與 debugger｜P6 tuple 與 list｜P7 dict 與 set｜P8 函數與作用域｜P9 例外處理與測試計劃｜P10 OOP｜Python 語法速查｜英文極速記憶句｜最後 60 秒自測清單

---

## Part 1 — Lecture 1: Introduction to Python
（來源：`ITP3915_L1_PythonBasics_StudyGuide.md`）

| 概念 | 一句話 | 英文關鍵句 |
|---|---|---|
| Machine Code | 電腦唯一語言 | "We should speak the computer's language (machine code) to describe what we want done." |
| Programming vs Scripting | 執行前編譯 vs 執行時直譯 | "Programming languages are usually compiled into machine code before execution; scripts run at runtime without prior compilation." |
| Python 哲學 | 強調可讀性、語法精簡 | "The design philosophy of Python emphasizes code readability, and its syntax allows programmers to express concepts in fewer lines of code than possible in languages such as C++ or Java." |
| Python 範式 | 支援三種 | "Python supports procedural programming, functional programming, and object-oriented programming." |
| Function | 可重用程式碼：輸入→計算→可回傳 | "A function is reusable code that takes possible argument(s) as input values, does some computation, and may return data/output as a result." |
| `print()` | 系統定義函數 | "print() is a system-defined function to print output on the screen." |

**執行環境**：IDLE（官方 Integrated Development and Learning Environment，按 Enter 即執行）／Command Prompt 輸入 `python` 入 Python shell、`exit` 離開／文字編輯器或 IDE 寫 `.py` script file 再執行

**三大必須記住**：拼字要正確（`student` ≠ `students`）｜**Case Sensitive**（`student` ≠ `Student`）｜**縮排分隔 code block**（一層 = 4 spaces／2 spaces／1 tab）

**Arithmetic Operators（20 和 3）**：`+`→23｜`-`→17｜`*`→60｜`/`→6.66666666｜`//`→6｜`**`→8000｜`%`→2

**Operator Precedence**：`( )` → `**` → `*` `/` `%`（左至右）→ `+` `-`（左至右）
- 必考：`print(7 + 6 - 5 * 4 / 3 ** 2)` → **10.7777778**（`3**2`=9 → `20/9`≈2.2222222 → 13−2.2222222）｜`print(1 + 2 - 3)` → **0**｜`print(1 - (2 - 3))` → **2**

**Literals 五類型**：Numeric（`123`、`-4`、`3.14`，不加引號）｜String（`"Hello"`、三引號多行，必須加引號）｜Boolean（`True`／`False`，reserved words）｜Special（`None`，reserved word）｜Collection（list／tuple／dict／set）；Literal = 固定值（"Literals are fixed values - the value cannot be changed."）

**Variables**：記憶體中有名稱的位置，**store → retrieve**，內容可改；規則＝字母／數字／底線、**不能數字開頭**、Case Sensitive、要有意義
- 好：`spam` `eggs` `spam23` `_speed`｜壞：`23spam` `#sign` `var.12`
- 禁用 **Reserved Words**：and, del, for, is, raise, assert, elif, from, lambda, return, break, else, global, not, try, class, except, if, or, while, continue, exec, import, pass, yield, def, finally, in, print, as, with
- 命名風格：變數 mixedCase `stuName`／lower_case_with_underscores `student_name`；類別 `Student`；常數 UPPERCASE `DEFAULT_WARNING`

**執行順序與賦值（必考追蹤）**：Statements 由上至下 → `x = 2; x = 4; print(x)` = **4**｜`=` 右邊先算、左邊後存 → `x = x * 100`（讀 2 → 2×100 → 寫回）= **200**｜Comments：`#` 之後全部被忽略（描述程式碼／記錄作者／暫時停用某行；建議避免中文註釋）

**英文極速記憶句**
- "Python is case sensitive: student and Student are different names."｜"A literal is raw data given in a variable or value."
- "The expression on the right of the equal sign is evaluated first, and its result is stored in the variable on the left."
- "Anything after a # is ignored by the Python interpreter."｜"Code blocks are separated by indentation."

---

## Part 2 — Lecture 2: Interaction (Input/Output)
（來源：`ITP3915_L2_Interaction_StudyGuide.md`）

**兩種介面**：Text-based prompt program（打字輸入、文字輸出）｜GUI（滑鼠指標／觸控螢幕輸入、圖形元素輸出）；選擇介面要考慮使用者的特徵（characteristics of users）

**`input()` 三大機制**：① 可傳 prompt 作參數 → ② 提示出現後 **Python 暫停執行（pauses execution）** → ③ 按 ENTER 後 **一定以 String 回傳**；⚠️ 陷阱：即使用戶打 `10`，回傳都係字串 `"10"` → 要 `int()`／`float()` 先做數學

**`print()` 的 `end` 與 `sep`**：`end` 預設 `\n`（newline），控制這一行**之後**的結尾字元；`sep` 預設一個空格，控制**同一行內多個值之間**的分隔符
- 口訣：**sep 空格、end 換行**｜`print("Peter"); print("Chan")` → 兩行｜`print("Peter", "Chan")` → `Peter Chan`（同一行）｜`sep=""` → `PeterChan`

**字串串聯與重複**：`+` 串聯（由左至右、可讀取變數中的字串值）→ `"Peter " + "Chan"` = `Peter Chan`；**數字不可直接串聯字串**（`"Boeing" + 777` 出錯）→ `"Boeing" + str(777)` = `Boeing777`；`*` 重複 → `"^" * 10` = `^^^^^^^^^^`

**引號與跳脫字元**：`\'` 單引號｜`\"` 雙引號｜`\\` 反斜線｜`\n` 換行｜`\t` Tab 空格；三種引號 `'Hello'`／`"Hello"`／`'''多行字串'''`；字串內含引號 → 換引號種類（`"Peter's birthday"`）或加跳脫字元（`'Peter\'s birthday'`）

| 字串方法 | 作用 | 大小寫敏感 | 回傳 |
|---|---|---|---|
| `strip()` / `lstrip()` / `rstrip()` | 移除頭尾／左／右空白（含 tab 與換行） | — | 新字串 |
| `lower()` / `upper()` / `title()` | 全小寫／全大寫／每個字首大寫 | — | 新字串 |
| `len(s)` | 字元數（空格都計） | — | int |
| `s.count(x)` / `s.find(x)` / `s.rfind(x)` | 出現次數／左找索引／右找索引（首索引 0；搵唔到 -1） | ✅ | int |
| `s.replace(a, b)` / `s.startswith(x)` / `s.endswith(x)` | 替換子字串／前綴／後綴檢查 | ✅ | 新字串 / bool |
| `s.isalpha()` / `isdecimal()` / `isalnum()` / `int(s)` / `float(s)` | 字元特性檢查／字串轉數字 | — | bool / number |

**必背關鍵數字**：`len("An iPhone and an iPad and a MacBook")` = **35**｜`.count("an")` = **3**（`"An"` 大寫唔算）｜`.find("an")` = **10**｜`.rfind("an")` = **22**｜`"10".isalpha()` False｜`"10".isdecimal()` True｜`"10.1".isdecimal()` **False**｜`"10.1".isalnum()` **False**（小數點不合格）
- `"An iPhone and an iPad".endswith("ipad")` = **False**（結尾係 `"iPad"`，大小寫敏感）｜`int("10.1")` 出錯，要 `float()`

**Qt Designer 與 PyQt6**：用 Qt Designer 拖放 widget — Form Layout（Layouts）／Label（Display Widgets）／Line Edit（Input Widgets）／Push Button（Buttons）
- 安裝 `pip install pyqt6`；轉檔 `pyuic6 -x -o myapp.py myapp.ui`（`-x` = generate code for display；`-o file` = specify output file）
- ⚠️ 本模組**只准用 PyQt6**；用 PyQt5 的提交會被當作 AI 生成、以**作弊**處理

**英文極速記憶句**
- "input() returns the user input as a String."｜"The default end character of print() is \n (new line); the default separator is a space."
- "Python does not allow direct concatenation of a number with a string; use str() to convert the number first."｜"strip() removes spaces, including tab spaces and newlines."
- "The first index is 0; find() returns -1 if not found."｜"Only PyQt6 will be used in this module; submissions using PyQt5 are treated as cheating."

---

## Part 3 — Lecture 3: Conditional Statements
（來源：`ITP3915_L3_Conditional_StudyGuide.md`）

**條件三類型**：Comparison（比較兩個項目，`100 == 100`）｜Specific criteria（符合指定準則，`originalStr.startswith("An iPhone")`）｜Combination（用邏輯運算子組合，`40 > 0 and 40 < 100`）

**比較運算子（`100` vs `100`）**：`==` **True**｜`!=` False｜`>` False｜`>=` **True**｜`<` False｜`<=` **True**；⚠️ `==` 係比較、`=` 係賦值（最常混），所有比較結果都係 Boolean

**字串比較用 Unicode code points（唔係字典序／筆畫）**：`"a"`=`0x61`、`"b"`=`0x62` → `"a" < "b"` **True**｜`"Z"`=`0x5A` → `"Z" < "b"` **True**（大寫 `0x41–0x5A` 細過小寫 `0x61–0x7A`）｜必考陷阱：`"四" < "二"` → **False**（四 = `0x56DB`、二 = `0x4E8C`）

**邏輯運算子**：`and` = conjunction（**ALL** true 先 True）｜`or` = disjunction（**at least one** true 就 True）｜`not` = 反轉
- `True and True` = True；其餘 `and` 組合 = False；`False or False` = False；其餘 `or` = True；`not True` = False、`not False` = True

**優先次序**：**`( )` → `not` → `and` → `or`**（同級由左至右）；**比較運算子高過所有邏輯運算子**；口訣 "**P**lease **N**ot **A**nd **O**r"／粵語「括號唔係咁 or」
- 考題：`not True or not False and False` → **False**（先 not → `False or True and False` → 先 and → `False or False`）

**`if` / `elif` / `else` 三大鐵律**：① 行尾**一定要有 `:`**（標示 indented suite 開始）｜② **只會執行一個 suite**（由頂到底，第一個成立就執行，之後唔睇）｜③ `elif`／`else` 可選、`elif` 可多個、`else` 最多一個放最後
- 嵌套（nested）＝條件入面再放條件（第一層決定 + 第二層決定）↔ 可用 `and` **平坦化**成多個 `elif`，輸出一致；兩個 `elif` 的 suite 一樣 → 可用 `or` 合併條件（`type == "student" or type == "children"`）
- 數值範圍兩種寫法：① 逐個寫上下界（`mark >= 0 and mark < 4` → `mark >= 4 and mark < 8` → `mark >= 8 and mark <= 10`）｜② 先 `or` 排除非法再只寫上界（`if mark < 0 or mark > 10:` → `elif mark < 4:` → `elif mark < 8:` → `elif mark <= 10:`）——**②更易讀**；`mark = 5` 兩版都輸出 **`Good`**

**Truthiness（動態型別）**：非空字串 `"no"` → True｜空字串 `""` → False｜`0` → False｜`0.1`（非零數值）→ True

**英文極速記憶句**
- "A condition is a logical expression that evaluates to either True or False."｜"Strings are compared by their numeric code points in Unicode."
- "The and operator is a conjunction: the result is True only when ALL combined conditions are True."｜"The or operator is a disjunction: the result is True when at least one condition is True."
- "The order of evaluation is: Parentheses, not, and, then or."｜"Colons are required at the end of if, elif, and else to indicate the start of an indented suite."
- "Any non-empty string is considered True, while an empty string is considered False."

---

## Part 4 — Lecture 4: For Loop
（來源：`ITP3915_L4_ForLoop_StudyGuide.md`）

**`range(start, stop, step)`**：`start` 可選預設 `0`｜`stop` **必填、永不包含**｜`step` 可選預設 `1`
- `list(range(5))` → `[0, 1, 2, 3, 4]`｜`range(10)` = `range(0,10)` = `range(0,10,1)`｜`list(range(0,0,1))` → `[]`｜`list(range(1,10,2))` → `[1, 3, 5, 7, 9]`｜`list(range(20,14,-2))` → `[20, 18, 16]`
- ⚠️ `range()` 回傳 **range object**，唔可以直接 print，要 `list()` 轉換

**三種迭代次數控制**：特定數字（definite，`range(5)`）｜項目數量（definite，`for x in ['a','b','c']`）｜條件（indefinite，逐行讀檔案到 EOF）
- `for` = **definite loop**：對 sequence 每個項目恰好迭代一次；用縮排建立 suite｜**縮排內 = repeated（每次迭代）；縮排外 = once（只一次）**｜迭代變數（`item`）＝ iterative storage

| 追蹤題 | 輸出 |
|---|---|
| `num = 10` → 迴圈內 `print(num)` 再 `num = num * 3` | `10` `30` `90` |
| `num = 10` → 迴圈內 `num = num * 3` 再 `print(num)` | `30` `90` `270` |

**`enumerate()` 與累加器**：`list(enumerate(['x','y','z']))` → `[(0, 'x'), (1, 'y'), (2, 'z')]`（預設由 0 開始）｜`enumerate(seq, 5)` → `[(5, 'x'), (6, 'y'), (7, 'z')]`｜解構：`for pos, item in enumerate(seq): print(f"{pos} is {item}")` → `0 is x` / `1 is y` / `2 is z`
- 累加器：`sum = 0`（迴圈外）→ 迴圈內 `sum = sum + newNum`；`range(1, 4)` 令 `sum` = **6**（0→1→3→6）

**流程控制**：`break` 提早退出**整個**迴圈（連 `else` 都唔行）｜`else` 只有迴圈**完整跑完所有迭代**（冇 break）先執行｜`continue` 跳過**當前迭代**其餘部分，直接去下一項
- 加 `if item=='y': print("Bingo")` → `x` `y` `Bingo` `z` `Done`｜同段加 `break` → `x` `y` `Bingo` `Done`（**z 被跳過**）；再加 `else: print("All Done")` → **else 被跳過**
- `if item == 'A'`（永不成立）+ `else` → `x` `y` `z` `All Done` `Done`｜`for item in [1,2,3]` + `if item==2: continue` → `print(item + 10)` → `11` `13` `Done`

**一維圖案四類型**：Repeated value（`oooooo…`）｜Common difference（100, 95, 90, 85, 80）｜Based on position（1, 4, 9, 16, 25；A2, B4, C6, D8）｜Based on previous values（0, 1, 1, 2, 3, 5, 8, 13, 21 = Fibonacci）；二維圖案（乘法表、星號三角形）由 **nested loops** 產生：外層管行（row）、內層管列（column）

**英文極速記憶句**
- "range(start, stop, step) generates a list of numbers; start defaults to 0, stop is required and is NOT included, and step defaults to 1."
- "A range object cannot be printed directly; convert it to a Python list with list()."｜"A for loop is a definite loop that iterates once over each item in a sequence."
- "An else clause runs only if the loop completed all its iterations; it is skipped when the loop is terminated by break."
- "continue skips the rest of the current iteration and moves to the next item."

---

## Part 5 — Lecture 5: While Loop
（來源：`ITP3915_L5_WhileLoop_StudyGuide.md`）

**語法與流程**：`while condition:` → 縮排 suite；① 檢查 condition → ② `True` 就執行 suite → ③ 返去再檢查 → ④ `False` 跳過 suite 繼續之後程式碼；⚠️ condition 一定要有機會變成 `False`，否則就係 **infinite loop**

| 對比 | `for` | `while` |
|---|---|---|
| 迭代變數定義 | 喺 statement 內 | **必須喺迴圈前定義** |
| 變數更新 | **自動** | **手動**（`num = num + 2`） |
| 適合場景 | 已知次數／已知 list | 次數不確定（indefinite） |
| 退出方式 | 序列行完 | 條件變 `False`／`break` |

- 三種等價寫法輸出都係 `1` `3` `5`：`for num in range(1,6,2)`｜`num = 1; while num < 6: num = num + 2`｜index 版 `while index < len(list_num): print(list_num[index]); index = index + 1`；`range(1,6,2)` 的 `len()` = **3**，index 0→1→2

| Use Case | 寫法 | 結果 |
|---|---|---|
| Counting down | `token = 500000; while token > 0: token = token - 1000` | 第 500 次後 `token = 0` → 印 `No more tokens` |
| Fulfilling requirement | `result = -1; while result < 40:` 或 `result = None; while result is None or result < 40:` | 未達標繼續 `study()` |
| Input validation | `while not inputVal.isdecimal():` | 一直問到輸入 `100` 才印 `Number is 100. Bye!` |
| Sentinel exit | `inputVal = input("…").strip().lower()`；`while inputVal != "exit":` | `EXIT`／`Exit`／` exit ` 都當 `"exit"` |

- ⚠️ 迴圈內必須更新 condition 變數（例如讀新輸入），否則永不終止；sentinel 值應「讀入後立即檢查」

**`None` 與 PEP 8**：`None` 係 type，定義 **null value（無值）**；`is` 比較 **object identity**（係咪同一個物件）；**PEP 8**：同 singleton（如 `None`）比較**永遠用 `is`／`is not`**，絕對唔好用 `==`／`!=`

**Infinite loop**：成因＝條件永遠 `True`（`token = token + 10` 愈變愈大；或 `while True:` 冇 break）｜後果＝**resource exhaustion**（CPU／memory 被無限佔用，程式 hang 死）｜出路＝`while True:` + `if inputVal == "exit": break`（`break`／`continue` 都適用於 while-loop）

**Debugger（VS Code）**：Breakpoint（click 行號左邊 → **紅點**；Menu bar → **Run** → **Start Debugging**）｜Step Over / Step Into / Step Out（逐行執行，前提冇涉及 functions）｜Continue（到下一個 breakpoint）｜Restart（由頭重新執行）｜**Watch window**（Add Expression click **`+`** 輸入 expression，例 `list(range(1,6,2))`；有更新會**自動 highlight**）

**英文極速記憶句**
- "A while loop executes its suite repeatedly as long as the condition evaluates to True."｜"The iterative variable must be defined before the loop begins and updated inside the loop."
- "An infinite loop cannot be exited because its condition always evaluates to True, causing resource exhaustion."｜"A sentinel value is a special value that signals the loop to stop."
- "According to PEP 8, comparisons to singletons like None should always be done with is or is not, never the equality operators."

---

## Part 6 — Lecture 6-7: Tuple and List
（來源：`ITP3915_L6_TupleList_StudyGuide.md`）

| 特性 | Tuple | List |
|---|---|---|
| Ordering | Ordered | Ordered |
| Uniqueness | Allow Duplicates | Allow Duplicates |
| Indexing | By Numeric index | By Numeric index |
| Mutability | **Immutable**（items cannot be updated） | **Mutable**（items can be updated） |

- 唯一本質分別 = **mutability**；Sequence = 有序，**insertion order is maintained**

**建立與型別轉換**：List `[item1, item2, …]`｜Tuple `(item1, item2, …)` **或** `item1, item2, …`（可省略括號）｜空：`list()` / `[]`；`tuple()` / `()`｜轉換：`list(tupleFriends)`／`tuple(listFriends)`
- `[0] * 3` → `[0, 0, 0]`（重複 3 次，唔係乘 3）；`[None] * 3` → `[None, None, None]`；⚠️ `(1)` 只係數字 1，`(1,)` 先係單元素 tuple

**索引、切片、負索引**：索引由 **0** 開始，最後一個 = `len - 1`；操作項目後索引會**重新對齊**
- 切片 `[start : stop]`，**`stop` 唔包含**：`listFriends[0:2]` → `['Peter', 'Susan']`｜開放端 `[1:]`、`[:1]`、`[:]`（複製全部 = shallow copy）
- 負索引 `-N` = `len - N`：`friends[-1]` = 最後一項（= index 2）｜`friends[-3:-1]` = `friends[0:2]` → `['Peter', 'Susan']`｜`friends[3]`（3 項 list）→ **`IndexError: list index out of range`**

**搜尋與統計**：`index("Peter")` = 第一個匹配索引（大小寫敏感），搵唔到 → **`ValueError`**｜`count("Peter")` = 出現次數（大小寫敏感）｜`in`／`not in` 成員檢查｜`len()` 項目總數｜`sum([111,222,333])` = **666**
- 安全做法：先用 `in` 確認存在，先至 `index()`／`remove()`，避免 `ValueError`

**List 專有操作（⚠️ tuple 全部冇，tuple 亦冇 `sort()`）**

| 方法 | 作用 | 例子 → 結果 |
|---|---|---|
| `append(item)` | 加到**末端** | → `['Peter','Susan','Mary','Sam']` |
| `insert(index, item)` | 插入指定位置 | `insert(1,"Chris")` → `['Peter','Chris','Susan','Mary']` |
| `remove(item)` | 刪**第一個**匹配（搵唔到 → `ValueError`） | → `['Susan','Mary','Peter']` |
| `pop(index)` | 刪指定位置**並回傳**該項目；`clear()` 清空 | `pop(1)` → 回傳 `Susan`，list 變 `['Peter','Mary','Peter']` |
| `sort()` / `sort(reverse=True)` | 原位排序（遞升／遞降） | → `['Mary','Peter','Peter','Susan']`／`['Susan','Peter','Peter','Mary']` |
| `x[i] = v` / 切片賦值 | 更新項目（無效索引 → `IndexError`） | `listFriends[1:3] = ["Bob"]` → `['Joe','Bob']` |

- 想用無效索引更新 → 先開定大小：`friends = [None] * 4`，再 `friends[3] = "Tim"`

**`join()` 與 `split()`（方向相反）**：`" and ".join(listFriends)` → `"Peter and Susan and Mary and Peter"`（**分隔符寫喺前面**；`listFriends.join(…)` 會出 `AttributeError`）
- `"A lot               of spaces".split()` → `['A', 'lot', 'of', 'spaces']`（預設用**任何空白**，連續多個當一個）｜`"first; second; third".split("; ")` → `['first','second','third']`

**Mutable vs Immutable（錯誤訊息必背）**：List `x = [9,8,7]; x[2] = 6` → `[9, 8, 6]`（成功）｜Tuple `y = (5,4,3); y[2] = 0` → `'tuple' object does not support item assignment`｜String `z = "ABC"; z[2] = "D"` → `'str' object does not support item assignment`
- 迷思：`tupleFriends = ("Peter","Susan","Mary","Peter")`（重新賦值）**會成功**——係 **rebinding** 到新 tuple，原本嗰個冇改；「Immutable」＝項目唔可以**原地**改動
- 取捨：Tuple 較 **memory-efficient**、**perform better**；List **更多 built-in functions**（insert／remove／sort）；Tuple 可做 dict key（**hashable** + immutable），List **唔可以**（mutable、冇辦法處理 `__hash__()`）→ `{("Kelvin","ITP3915"): "B"}` 有效；`{["Kelvin","ITP3915"]: "B"}` 無效（`TypeError: unhashable type: 'list'`）

**英文極速記憶句**
- "Items are indexed by their position number in the sequence, starting from 0."｜"Tuples are immutable (items cannot be updated), whereas lists are mutable."
- "An IndexError is raised when an invalid index is used."｜"index() finds the index of the first matched item; a ValueError is raised when the specified item cannot be found."
- "pop(index) removes and gets the item at a specific position."｜"join() concatenates items with a common separator; split() breaks a string into a list of strings."
- "A tuple can be used as a key in a dictionary because it is hashable and immutable, whereas a list cannot because it cannot handle __hash__()."

---

## Part 7 — Lecture 8: Dictionary and Set
（來源：`ITP3915_L7_DictSet_StudyGuide.md`）

**建立與索引**：`{key1: item1, key2: item2, …, keyN: itemN}`；空：`dict()` 或 `{}`｜鍵可以是 numbers、texts，甚至 **tuples**（不可變型態才能做鍵）｜`len(dictSubj)` = 鍵值對總數（2 個鍵值對 → **2**）
- `dict.fromkeys(["code", "name"], None)` → `{'code': None, 'name': None}`；常數慣例：Python 冇內建 constant type，用 **UPPERCASE + 底線**表示（`SUBJ_CODE = 0`）

| 特性 | Tuple | List | Dictionary | Set |
|---|---|---|---|---|
| Ordering | Ordered | Ordered | Ordered from Python 3.7 | **Unordered** |
| Uniqueness | Allow duplicate items | Allow duplicate items | No duplicate keys | **No duplicate keys** |
| Indexing | By numeric index | By numeric index | **By any key** | **No（不可索引）** |
| Mutability | **Immutable** | Mutable | Mutable | Mutable（可加／可刪鍵，不可更新鍵） |

**讀取項目**：`dictSubj["code"]` 直接讀（鍵唔存在 → **`KeyError`**）｜`dictSubj.get("hours")` → `None`（**唔報錯**）｜`dictSubj.get("credit", "No credit")` → `"No credit"`
- `.keys()` / `.values()` / `.items()` → view objects（`dict_keys` / `dict_values` / `dict_items`）；`items()` 每個元素係 `(key, value)` tuple：`dict_items([('code', 'ITP3915'), ('name', 'Programming')])`
- ⚠️ 高頻陷阱：`"code" in dictSubj` **只查鍵**；查值必須 `"Programming" in dictSubj.values()`

**走訪（tuple unpacking）**：`for (key, value) in dictSubj.items(): print(f"{key} is {value}")` → `code is ITP3915` / `name is Programming` / `Done`；可加過濾 `if key in filtered:`（`filtered = ["code"]` → 只印 `code is ITP3915`）

**修改項目**：`dictSubj["credit"] = 10` → **鍵在＝更新（update）、鍵不在＝新增（add）**（同一句語法）｜`pop("code")` 移除指定鍵並**回傳其值**（搵唔到 → `KeyError`）｜`popitem()` 移除並回傳**最後一項**（實際係 `(key, value)` tuple）｜`clear()` → `{}`

**排序 Dictionary**：Python **冇** dict 內建 sort（冇 `dict.sort()`）；用 **`sorted()`** → `sorted(dictSubj.items())` = `[('code', 'ITP3915'), ('name', 'Programming')]`；`reverse=True` 降序
- `sorted()` 回傳**新 list**，唔修改原 dictionary；排序依據係 tuple 第一個元素（鍵）

**Set（集合）**：三特徵＝**unordered**、**unique keys**（元素視為 keys）、**不可索引**；等同資料庫 **`DISTINCT`**；`set()` ← 空 set，**`{}` 係空 dictionary**（經典陷阱）；`{"Peter", "Susan", "Mary"}`（**冇冒號**）

| 方法 | 作用 | 搵唔到鍵時 |
|---|---|---|
| `s.add(key)` | 新增鍵（重複 add 無效果 → 去重） | —（重複不報錯） |
| `key in s` | 檢查存在（set 唯一「讀取」方式） | `False` |
| `s.remove(key)` | 移除鍵 | **`KeyError`** |
| `s.discard(key)` | 安全移除鍵 | **唔報錯** |
| `s.pop()` | 隨機移除並回傳一個鍵；`clear()` 清空 | 空 set → `KeyError` |

- `while visitors:`：空 set 為 `False` → 迴圈自然結束（每輪 `pop()` 一個鍵，最後印 `Done`）

**英文極速記憶句**
- "A dictionary is indexed by keys which can be numbers, texts, or even tuples."
- "get() tries to find the value of a key; if the key does not exist, the default value is returned without raising an error."｜"A KeyError is raised when an invalid key is used."
- "Use in to check the existence of a key; check values with value in dict.values()."｜"There is NO built-in function for sorting dictionaries; use sorted(dictionary.items())."
- "A set is an unordered collection of unique keys, similar to the DISTINCT feature in databases."｜"To prevent KeyError, use discard() instead of remove()."

---

## Part 8 — Lecture 9: Functions
（來源：`ITP3915_L8_Function_StudyGuide.md`）

**為何需要函數**：任務**冇規律**時迴圈幫唔到手 → 用函數「Run Tasks By Request」；四大優點 **M-E-R-C**＝**M**odularity（將大問題拆細）／**E**asy testing（可獨立測試）／**C**ode reusability（寫一次用多次）／**C**ode management（改一處、全部一致、慳時間）

**Definition vs Call（必考）**：Function definition = **just a plan**（定義咗但未執行）｜Function call / execution = **真正執行任務**（帶住輸入去返定義、跟住執行，完成後返回呼叫位置）；來源兩種＝**built-in**（`print()`、`round()`、`exit()`）／**user-defined**

**I-P-O 四元素**：Name / Objectives（做啲乜）→ Input（需要啲乜資訊、必填定可選）→ Process（確切步驟）→ Output（印螢幕定回傳做後續處理）

- **Parameter（參數）**＝定義時寫喺括號內的輸入，任何型別；**有 default value 嘅＝optional**，可跳過
- **Argument（引數）**＝呼叫時實際俾嘅值；**按順序**（`print("Ming", "_", "\t")`）或用**參數名**（`print("Ming", end="\t", sep="_")`）
- **Return value（回傳值）**＝函數的 output／result，**唔係螢幕輸出**；`print()` 回傳 **`None`**
- 用回傳值兩法：`num = round(123.456, 2)`（存入變數）／`print(round(123.456, 2))`（直接用）→ 都係 **`123.46`**；⚠️ 投影片筆誤：`round(123.456)` 實際回傳 **`123`**

**`def` 語法與命名**：`def` + 函數名 + 括號 + 參數（可選）+ **冒號** + **縮排主體** + `return`（可選）；命名＝**小寫字母開頭 + 動詞**（`getXXX`／`findXXX`／`loadXXX`／`setXXX`／`updateXXX`／`calcXXX`／`convertXXX`／`formatXXX`／`printXXX`），要 specific to the objectives

```python
def calcSum(num1, num2, num3):     # 案例：只加負數（正數直接忽略）
    total = 0
    if num1 < 0:
        total = total + num1
    if num2 < 0:
        total = total + num2
    if num3 < 0:
        total = total + num3
    return total
```

- 追蹤：`calcSum(-100, 0, 4)` → `num1=-100, num2=0, num3=4` → `total = -100` → `return -100`；輸出 `Start` / `The result is -100`
- 測試個案：`-1+-3+-5 = -9`｜`-1+-3+30 = -4`｜`-1+20+30 = -1`｜`10+20+30 = 0`

**先定義後呼叫 + 作用域（Scope）**：未定義就呼叫 → **`NameError: name 'calcSum' is not defined`**；**Local scope**＝函數**內部**建立的名稱，只喺該函數執行期間有效｜**Global scope**＝任何函數**外面**建立的名稱，成個程式可用
- 陷阱：函數外 `print(total)` → `NameError`（`total` 係 local，出咗函數就唔存在）
- 全域變數建議：本地／全域用**唔同名字**；存**常數**（`PASS_SCORE = 40`）；喺函數之間**共享 compound data types**（list／dict）→ `printPassScores()` 輸出 `Score: 81` / `Score: 50`

**英文極速記憶句**
- "A function definition is just a plan; a function call is actually running the tasks."｜"Parameters are the inputs written inside parentheses; parameters with default values are optional."
- "A return value is the output or result of a function, but not the screen output."｜"Some functions do not return a value — they return None, for example print()."
- "NameError is raised if you try to call a function which is not defined."｜"Local variables work only inside a function while it runs; global variables can be used anywhere in the program."

---

## Part 9 — Lecture 10: Exceptions & Basic Testing
（來源：`ITP3915_L9_Exception_StudyGuide.md`）

**流程圖五符號**：Rectangle（長方形）＝ a task or action step｜Rounded Rectangle＝ the start or the end｜Rhombus / Diamond（菱形）＝ a branching decision point｜Parallelogram（平行四邊形）＝ a data input or output｜Arrow（箭頭）＝ direction of flow

**測試計劃**：核心＝**每個決策點「兩邊都測」**，覆蓋所有 alternate paths
- 範例（二次方程）：`a != 0` 係 user input → 測 `a = 0` 同 `a ≠ 0`；`d == 0` 係 calculated field → 揀數令 `d = 0`（`1, 4, 4`）同 `d ≠ 0`（`3, -4, 1`）；`d = b**2 - 4*a*c`；⚠️ 教材勘誤：原投影片寫 `d = -20`、`x1 = -1.0`，正確係 `d = 16-12 = 4`

| ID | Description | Procedure | Expected Result |
|---|---|---|---|
| 1 | Verify no calculation occurs when `a = 0` | Enter `0` for `a` | Screen shows `bye` only |
| 2 | Check whether a single root can be found | `a=1`, `b=4`, `c=4` | `a=1, b=4, c=4` / `x=-2.0` / `bye` |
| 3 | Check whether two roots can be found | `a=3`, `b=-4`, `c=1` | `a=3, b=-4, c=1` / `x1=1.0, x2=0.3333333333333333` / `bye` |

- 完整測試計劃表另需 **Actual Result** 同 **Tested by**（實際執行後填寫提交）

**常見例外類型（七大）**：`SyntaxError`（語法寫錯）｜`NameError`（用未定義名稱）｜`TypeError`（型別不相容操作）｜`ValueError`（型別對但值唔啱，`float("abc")`）｜`IndexError`（index out of range）｜`KeyError`（dict 冇呢個 key）｜`ZeroDivisionError`（除 0）；執行期間（run-time）偵測到嘅錯誤叫做 **exceptions**

**為何唔應顯示預設錯誤訊息（論述題）**：① 終端用戶通常冇足夠技術知識理解例外訊息嘅確切含義（usability）② 網絡安全角度：會 **give away too much information about the system**（語言／版本／路徑／內部結構）

**`try/except` 機制**：try 冇錯 → `except` 被跳過，繼續之後下一行｜try 有錯且類型匹配 → `except` 處理，之後照樣繼續下一行｜錯誤**唔匹配任何 `except`** → **unhandled → crash（Traceback）**，之後嘅行**唔會執行**；三大應用場合＝① user input／input validation｜② input/output operations（檔案／資料庫／API）｜③ waiting or long-running processes

```python
try:
    x = float( input("Enter a number: ") )
    ans = 25 / x
except ValueError:              # another specific handler
    print("Not a correct number.")
except ZeroDivisionError:
    print("Cannot be 0.")
except Exception as err:        # a generic handler for all other errors
    print(f"Unexpected error: {err=}.")
print("yes, can be continued")
```

- 輸出：輸入 `abc` → `Not a correct number.`｜輸入 `0` → `Cannot be 0.`｜輸入 `5` → 直接 `yes, can be continued`；⚠️ **特定 handler 一定要寫喺 `except Exception as err` 之前**，否則永遠冇機會執行
- 單一 `except ValueError` 接唔到 `25 / 0`（`ZeroDivisionError`）→ 未處理 → crash，最後一行唔印；**輸入驗證迴圈**＝`while True:` 內 `try: x = float(input(…)); break` + `except ValueError: print("Not a correct number.")`

**英文極速記憶句**
- "Errors detected during execution are called exceptions."｜"Default error messages can give away too much information about the system."
- "If no error occurs, the except clause is skipped and the program continues with the next line after the try/except blocks."
- "If the error type does not match any except clause, the exception is unhandled: the program crashes with an error traceback."
- "Use the try/except block to handle errors for user input, input/output operations, and waiting or long-running processes."

---

## Part 10 — Lecture 11: Object-Oriented Programming
（來源：`ITP3915_L10_OOP_StudyGuide.md`）

**為何要 OOP：`dict` / `list` 三大限制**：① 可否連埋 user-defined functions 一齊存放資料？→ No, **functions and data are kept separate**｜② 可否做 data validation？→ No, **checking data and storing data are not directly linked**｜③ 可否重用資料結構？→ Somehow, yes（可以複製現有集合，但改一個唔會影響另一個）

**OOP 定義**：**OOP** = 將 **attributes（屬性＝data）** 同 **methods（方法＝functions／action）** 組織成 **objects（物件）**；Python 用 OOP 係 **optional**（唔似 Java 強制），`int`、`list` 本身就係 OOP 設計 → `n = 10; print(type(n))` 輸出 `` `<class 'int'>` ``
- **Class = blueprint**（規劃 attributes + methods）；**Object = instance**（由藍圖造出嚟嘅實體）；比喻：class = 遊戲設計好但**未拎起**嘅武器；object = 英雄**實際拎起用**嘅武器
- `Circle` 例：attribute = Radius；methods = Get radius / Set radius / Find perimeter / Find area

**Class 骨架與實體化**：`class ClassName:`（**名字必須大寫字母開頭**）→ `def __init__(self, input1):`（initializer，建立物件時**自動執行**）→ `self.__attribute1 = input1`（non-public instance attribute）→ `def method1(self):`（instance method）
- 實體化：`object1 = ClassName(input1)`（**function-like notation**＝class 名加括號）；⚠️ 陷阱：`__init__` 第一個參數係 `self`，所以 `Circle(4)` 嘅 `4` 傳俾 `__init__` 嘅**第二個**參數

```python
class Circle:
    def __init__(self, newRadius):
        self.__radius = newRadius

    @property                        # getter for the radius property
    def radius(self):
        return self.__radius

    @radius.setter                   # setter（含 validation）
    def radius(self, newRadius):
        if newRadius > 0:
            self.__radius = newRadius

    def findPerimeter(self):
        return self.__radius * 2 * 3.14
```

- **Getter ＝ `@property`** → 可以好似屬性咁寫 `circle1.radius`（唔使括號）；**Setter ＝ `@radius.setter`** → `circle1.radius = 3` 自動觸發
- 用途：**control how attributes are set or retrieved** + **additional access control**（setter 內嘅 `if newRadius > 0` 就係 data validation）
- **`self`**＝關鍵字，**指向當前物件（refers to the current object）**，每個 instance method 都以 `self` 做第一個參數；每個 `Circle` 物件有**自己獨立**嘅 `__radius`
- **雙下底線 `__` 前綴 ＝ non-public attribute**：class 外**唔可以直接存取** → **`AttributeError: 'Circle' object has no attribute '__radius'`**；目的＝**prevent data from being updated by accident**

**必考追蹤題**：`circle1 = Circle(4)` → `newRadius = 4` → `self.__radius = 4`｜`circle2 = Circle(5)` → `self.__radius = 5`（兩個獨立物件）
- `circle1.radius = 3` → 觸發 setter → `3 > 0` 成立 → `__radius` 由 4 變成 **3**；`print(circle1.radius)` → getter → 輸出 **`3`**
- 延伸：`circle1.radius = -1` → `-1 > 0` 唔成立 → `self.__radius` **唔會被更新**（保持原值）｜`findPerimeter()`：半徑 4 → `4 * 2 * 3.14` = **25.12**

**OOP 四大特徵（EIPA）**：**E**ncapsulation（封裝：資料同操作方法包埋一齊，隱藏內部細節）｜**I**nheritance（繼承：新 class 繼承現有 class 嘅屬性同方法）｜**P**olymorphism（多型態：同一介面多種實現）｜**A**bstraction（抽象：隱藏複雜細節，只暴露必要介面）——教材註明四大特徵會喺**下一個學期**再深入討論

**英文極速記憶句**
- "Object-oriented programming (OOP) is a way to organise attributes and methods (functions) into objects."
- "Classes are blueprints to plan the attributes and methods of an object; an object is an instance of a class."
- "The initializer method __init__() runs automatically whenever a new object is created."｜"self is a keyword which refers to the current object and is the first parameter of every instance method."
- "Names prefixed with double underscores are treated as non-public attributes; accessing them from outside the class raises an AttributeError."
- "Getter and setter properties control how attributes are set or retrieved, and provide a chance to add additional access control."
- "The four characteristics of OOP are Encapsulation, Inheritance, Polymorphism and Abstraction."

---

## Python 語法速查（Lab／實作必備）

```python
# 1. 輸出與輸入
print("Peter")                          # 換行（end 預設 "\n"）
print("Peter", "Chan")                  # Peter Chan（sep 預設 " "）
print("A", "B", sep="_")                # A_B
print("A", end=" ")                     # 結尾唔換行，改為空格
answer = input("What is your name? ")   # 一定回傳 String
age = int(input("Age: "))               # 要數字就自己轉
model = "Boeing" + str(777)             # Boeing777；"^" * 10 → ^^^^^^^^^^

# 2. range() 與 enumerate()
list(range(5))                        # [0, 1, 2, 3, 4]（stop 唔包）；range(0,0,1) → []
list(range(1, 10, 2))                 # [1, 3, 5, 7, 9]；range(20,14,-2) → [20, 18, 16]
list(enumerate(['x','y','z']))        # [(0, 'x'), (1, 'y'), (2, 'z')]
list(enumerate(['x','y','z'], 5))     # [(5, 'x'), (6, 'y'), (7, 'z')]
for pos, item in enumerate(seq):
    print(f"{pos} is {item}")

# 3. 條件、for、while
if mark >= 0 and mark < 4:
    grade = "Bad"
elif mark < 8:
    grade = "Good"
else:
    grade = "Very Good"

for item in range(3):            # for：迭代變數喺 statement 內定義
    print(item)                  # 縮排內：每次迭代都行
print("Done")                    # 縮排外：只行一次

num = 1                          # while：迭代變數必須喺迴圈前定義
while num < 6:
    print(num)
    num = num + 2                # 迴圈內手動更新

# break 退出整個迴圈（for 嘅 else 都唔會行）；continue 跳過當前迭代其餘部分
for item in ['x', 'y', 'z']:     # for-else：冇 break 先執行 else
    print(item)
else:
    print("All Done")

# 4. list / tuple 操作
listA = [1, 2, 3]                 # List：方括號，mutable
tupleA = (1, 2, 3)                # Tuple：圓括號，immutable；tupleB = 1, 2, 3 都係 tuple
listFriends = []                  # 空 list；tuple() 或 () 係空 tuple；[0] * 3 → [0, 0, 0]
list(listA); tuple(tupleA)        # 型別轉換
listFriends[0]                    # 單項（索引由 0 開始）；[-1] = 最後一項（= len - 1）
listFriends[0:2]                  # 切片（stop 唔包含）；[1:] 到尾；[:] 複製全部
len(listFriends); sum(listPrices) # 項目總數／數值總和
listFriends.index("Peter")        # 第一個匹配；搵唔到 → ValueError
listFriends.count("Peter")        # 出現次數；"Tim" in listFriends → 成員檢查
listFriends.append("Sam")         # 加末端；insert(1, "Chris") 插入指定位置
listFriends.remove("Peter")       # 刪第一個匹配（搵唔到 → ValueError）
foundItem = listFriends.pop(1)    # 刪指定位置並回傳；clear() 清空
listFriends.sort()                # 原位遞升（tuple 冇 sort）；sort(reverse=True) 遞降
listFriends[0] = "Joe"            # 索引賦值；listFriends[1:3] = ["Bob"] 切片賦值
" and ".join(listFriends)               # list → string（分隔符寫喺前面）
"first; second; third".split("; ")      # string → list

# 5. dict / set 操作
d = {}                                  # 空 dictionary（注意！）；set() 才係空 set
d = {"code": "ITP3915", "name": "Programming"}
dict.fromkeys(["code", "name"], None)   # {'code': None, 'name': None}
d["code"]                               # 無效鍵 → KeyError
d.get("hours")                          # 唔存在 → None（唔報錯）
d.get("credit", "No credit")            # 唔存在 → 回傳預設值
d.keys(); d.values(); d.items()         # dict_keys / dict_values / dict_items
"code" in d                             # 查鍵；"Programming" in d.values() 查值
for (key, value) in d.items():
    print(f"{key} is {value}")
d["credit"] = 10                        # 鍵在→更新；鍵不在→新增
d.pop("code")                           # 移除並回傳該值；popitem() 最後一項；clear() → {}
sorted(d.items())                       # 排序 dict（冇 dict.sort）；reverse=True 降序

s = {"Peter", "Susan", "Mary"}          # 冇冒號；add() 重複無效果；"Susan" in s 唯一讀法
s.remove("Peter")                       # 搵唔到 → KeyError；s.discard("Billy") 唔報錯
s.pop()                                 # 隨機移除並回傳一個鍵；clear() 清空
while visitors:                         # 空 set 為 False，迴圈自然結束
    lucky = visitors.pop()

# 6. 函數
def calcSum(num1, num2, num3):    # def + 名 + 括號 + 冒號；主體必須縮排
    total = 0
    if num1 < 0:
        total = total + num1      # num2、num3 重複同樣的 if 區塊
    return total                  # 可選；冇 return 即回傳 None
result = calcSum(-100, 0, 4)      # 呼叫（一定要先定義後呼叫）
num = round(123.456, 2)           # 123.46（存入變數，亦可直接 print）
print("Ming", "_", "\t")          # positional arguments
print("Ming", end="\t", sep="_")  # keyword arguments
PASS_SCORE = 40                   # 全域常數；listScores = [34, 81, 50] 全域複合型別

# 7. try / except
try:
    x = float( input("Enter a number: ") )
    ans = 25 / x
except ValueError:              # 特定 handler 一定寫喺最前
    print("Not a correct number.")
except ZeroDivisionError:
    print("Cannot be 0.")
except Exception as err:        # 通用 handler 放最後
    print(f"Unexpected error: {err=}.")
print("yes, can be continued")  # 處理完繼續下一行
while True:                     # 輸入驗證迴圈模板
    try:
        x = float( input("Enter a number: ") )
        break                   # 成功即跳出迴圈
    except ValueError:
        print("Not a correct number.")

# 8. class / OOP
class Circle:                       # class 名必須大寫字母開頭
    def __init__(self, newRadius):  # initializer：建立物件時自動執行
        self.__radius = newRadius   # non-public attribute（雙下底線）
    @property                       # getter
    def radius(self):
        return self.__radius
    @radius.setter                  # setter（可加 validation）
    def radius(self, newRadius):
        if newRadius > 0:
            self.__radius = newRadius
    def findPerimeter(self):        # instance method
        return self.__radius * 2 * 3.14
circle1 = Circle(4)          # 實體化；4 傳俾 __init__ 第二個參數
circle1.radius = 3           # 觸發 setter（__radius: 4 → 3）
print(circle1.radius)        # 3
# print(circle1.__radius)    # AttributeError（class 外不可直接存取）
```

| 內建函數／方法 | 用途 | 必記備註 |
|---|---|---|
| `print(x, sep=, end=)` / `input(prompt)` | 輸出／讀取輸入 | `sep` 預設空格、`end` 預設 `\n`；`input()` **永遠回傳 String** |
| `int(s)` / `float(s)` / `str(n)` | 型別轉換 | `int("10.1")` 出錯；數字串聯前要 `str()` |
| `len(x)` / `sum(x)` / `sorted(x, reverse=True)` / `round(n, d)` | 數量／總和／排序／四捨五入 | `sorted()` 回傳新 list；dict 排序唯一做法 |
| `range(start, stop, step)` / `enumerate(seq, start)` / `type(x)` / `exit()` | 序列產生／型別／離開 | `stop` 唔包含；要 `list()` 先睇到 |
| list 專有 `append` `insert` `remove` `pop` `clear` `sort`｜dict 專有 `get` `keys` `values` `items` `pop` `popitem` `fromkeys`｜set 專有 `add` `remove` `discard` `pop` | 增刪改查 | `get()`／`discard()` 唔會 raise error；tuple **全部冇** |

---

## 英文極速記憶句（跨課最高頻精選）

- **L1** "Python is case sensitive: student and Student are different names."｜"Anything after a # is ignored by the Python interpreter."｜**L2** "input() returns the user input as a String."｜"The default end character of print() is \n (new line); the default separator is a space."
- **L3** "The and operator is True only when ALL conditions are True; the or operator is True when at least one condition is True."｜"The order of evaluation is: Parentheses, not, and, then or."｜**L4** "stop is required and is NOT included in the result; a range object cannot be printed directly — use list()."｜"The else clause of a for loop runs only if the loop completed all its iterations (no break)."
- **L5** "The iterative variable must be defined before the loop begins and updated inside the loop."｜"PEP 8: comparisons to singletons like None should always be done with is or is not."｜**L6** "Tuples are immutable (items cannot be updated), whereas lists are mutable."｜"Index out of range → IndexError; item not found → ValueError; modifying immutable → item assignment error."
- **L7** "get() returns the default value without raising an error; use discard() instead of remove() to prevent KeyError."｜"A set is an unordered collection of unique keys, similar to the DISTINCT feature in databases."｜**L8** "A function definition is just a plan; a function call actually runs the tasks."｜"Local variables work only inside the function; global variables can be used anywhere in the program."
- **L9** "Errors detected during execution are called exceptions."｜"No error → skip except; error → run except; no match → crash."｜**L10** "Classes are blueprints; an object is an instance of a class."｜"Names prefixed with double underscores are non-public; accessing them from outside raises an AttributeError."

---

## 最後 60 秒自測清單

- [ ] 能心算 `7 + 6 - 5 * 4 / 3 ** 2`（10.7777778）並追蹤 `x = x * 100`（200，先讀後寫）
- [ ] 能說出 5 種 Literal 類型各舉一例；能判斷 `23spam` / `_speed` / `var.12` 哪個合法
- [ ] 能解釋 Programming 與 Scripting 的分別（英文作答）
- [ ] 能背出 `input()` **永遠回傳 String**；能分辨 `print("A","B")` vs 兩個 `print()` vs `sep=""`
- [ ] 能默寫 `\n`、`\t`、`\\`、`\'` 效果；能算 `len()` = 35、`count("an")` = 3、`find` = 10、`rfind` = 22
- [ ] 能判斷 `"10.1".isdecimal()` 與 `"10.1".isalnum()` 都係 `False`，並解釋 `endswith("ipad")` 為何 False
- [ ] 能背出 `pyuic6 -x -o myapp.py myapp.ui` 各參數意思，並講出「只准用 PyQt6，PyQt5＝作弊」
- [ ] 能分辨 `==`（比較）與 `=`（賦值）；能解釋 `"四" < "二"` 為何係 `False`（Unicode code points）
- [ ] 能背真值表並算出 `not True or not False and False` = `False`；口訣 `( )` > `not` > `and` > `or`
- [ ] 能寫出 `if` / `elif` / `else` 骨架（行尾 `:`、只用一個 suite、嵌套 ↔ `and` 平坦化互換）
- [ ] 能分辨非空字串／非零數值當 `True`，空字串／`0` 當 `False`
- [ ] 能寫出 `range(5)`、`range(0,0,1)`、`range(1,10,2)`、`range(20,14,-2)` 輸出，並追蹤 10/30/90 vs 30/90/270
- [ ] 能說出 `break` / `continue` / `for-else` 分別，並講出 `else` 唔行嘅條件
- [ ] 能寫出 `for` ↔ `while` 互換；能講出無限迴圈成因與後果，用 `while True` + `break` 解決
- [ ] 能背 sentinel value 用法（`strip().lower()` 再比 `"exit"`）、PEP 8 的 `is None`、debugger 五項
- [ ] 能講出 tuple 與 list 唯一本質分別（mutability）＋三項相同特性；能算 `friends[-1]`、`friends[-3:-1]`、`listFriends[0:2]`
- [ ] 能分辨 `IndexError`（索引超範圍）／`ValueError`（值搵唔到）／`'tuple' object does not support item assignment`
- [ ] 能講出 `pop()` 同 `remove()` 分別；能解釋 tuple 可做 dict key（hashable + immutable）而 list 唔可以
- [ ] 能講出 `{}` 係空 dict、`set()` 才係空 set；`in` 對 dict 只查鍵；能默寫 `d[k] = v` 與 `sorted(d.items())`
- [ ] 能分辨 set 的 `remove()`（`KeyError`）與 `discard()`（唔報錯）
- [ ] 能默寫 `def` 骨架 + `calcSum` 並追蹤輸出；能講出四大優點 M-E-R-C 與 definition vs call
- [ ] 能解釋 `print(total)` 在函數外出 `NameError`（local scope）
- [ ] 能背出七大例外類型、唔顯示預設錯誤訊息嘅兩大原因，並默寫多個 `except` 與 `while True` + `break` 驗證迴圈
- [ ] 能畫流程圖五符號，並講出測試計劃「每個決策點兩邊都測」
- [ ] 能默寫 `Circle` class（`__init__` + `@property` + `@radius.setter` + `findPerimeter`）
- [ ] 能講出 `self` 作用、為何 `print(circle1.__radius)` 出 `AttributeError`、OOP 四大特徵 **EIPA**

---

*詳細版：`02_Study_Guides/ITP3915_L1_PythonBasics_StudyGuide.md`（Lecture 1）、`ITP3915_L2_Interaction_StudyGuide.md`（Lecture 2）、`ITP3915_L3_Conditional_StudyGuide.md`（Lecture 3）、`ITP3915_L4_ForLoop_StudyGuide.md`（Lecture 4）、`ITP3915_L5_WhileLoop_StudyGuide.md`（Lecture 5）、`ITP3915_L6_TupleList_StudyGuide.md`（Lecture 6-7）、`ITP3915_L7_DictSet_StudyGuide.md`（Lecture 8）、`ITP3915_L8_Function_StudyGuide.md`（Lecture 9）、`ITP3915_L9_Exception_StudyGuide.md`（Lecture 10）、`ITP3915_L10_OOP_StudyGuide.md`（Lecture 11）*

*本 Cheat Sheet 由上述 10 份源頭 Study Guide 累積合併、壓縮去重而成；所有內容 100% 可追溯回源頭筆記，英文關鍵句為源頭原文。*
