# ITP3915 L1: Introduction to Python — 雙語應考學習指南

> **來源**：ITP3915 Programming Fundamentals — Lecture 01（Chapter 1）
> **原始檔**：`01_Raw_Materials/Lectures/Lecture1_PythonBasics.pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 每個算例自己先心算再看答案

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課是 ITP3915 的第一課，目標是讓零基礎學生踏出 Python 程式設計的第一步。內容包括四大塊：基本程式概念（**Machine Code**、Users vs Programmers、AI 在程式開發中的角色）、Python 基礎（**Scripting vs Compiled**、**IDLE**、Python Shell、.py Script、`print()` 函數結構）、**Literals** 與 **Variables**（含 Reserved Words、命名規則），以及 **Statements & Expressions**（Arithmetic Operators、**Operator Precedence**、Assignment Statements、Comments）。這些是之後所有課題（流程控制、函數、資料結構）的共同基石。

技術關聯性：本課反覆強調兩件事——**「電腦只懂 machine code，程式語言是溝通的橋樑」** 與 **「Python 以可讀性（readability）為設計哲學」**。因此考官特別喜歡考：`print("Hello, World!")` 的結構拆解（function + argument）、operator precedence 的算式心算、variable 的 read/write 追蹤、以及命名規則與 reserved words。而編譯（compiled）與直譯（scripting/interpreted）的對比，是理解 Python「逐行執行」行為的關鍵。

實務情境一：網絡／系統管理員經常要寫 Python 小工具自動化重複工作（例如批次檢查伺服器日誌、自動整理檔案）。本課的 variable、expression、assignment 就是這些「helper script」的最小零件——例如 `count = count + 1` 這種 read-write 模式。

實務情境二：初學者常用 AI 生成程式碼（如 ChatGPT），但講義特別警告：AI 答案未必正確、未必符合需求、甚至可能含有漏洞（vulnerabilities）。要判斷 AI 答案，必須先有「知識（KNOWLEDGE）」——這正是本課打好基礎的原因，亦是未來編寫安全程式碼（secure coding）的起點。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **理解基本程式概念** — Demonstrate the understanding of basic programming concepts
2. **理解 Python 基礎** — Demonstrate the understanding of Python basics（scripting、IDLE、shell、script、`print()`）
3. **分辨 Literals 類型** — Demonstrate the understanding of various literals types（numeric、string、boolean、special、collection）
4. **理解 Expressions 與 Statements** — Demonstrate the understanding of expressions and statements
5. **掌握 Variables 與命名規則** — Explain how variables store data and apply Python naming rules
6. **背誦 Reserved Words** — Identify reserved words that cannot be used as identifiers
7. **計算 Operator Precedence** — Evaluate arithmetic expressions using Python's order of evaluation
8. **追蹤程式執行順序** — Trace the sequential execution and read/write of variables
9. **解釋 Comments 的作用** — Explain the purpose and syntax of comments in Python

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 基本程式概念（Basic Programming Concepts）

#### 3.1.1 Machine Code 與 Instructions

繁中解說：電腦只有一個目的——為人類做事。但我們必須用它的語言（**Machine Code，機器語言**）來描述要做什麼（在 NLP 與 LLM 出現之前）。一般用戶（Users）很輕鬆：已經有人把很多程式（**Instructions，指令**）放進電腦，用戶只要選擇使用哪一個即可。

> English Standard Definitions:
> - "Computers are built for one purpose - to do things for us."
> - "But we should speak their language (machine code) to describe what we want done."
> - "Users have it easy - someone already put many different programs (instructions) into the computer, and users pick the ones they want to use."

#### 3.1.2 Users vs Programmers

繁中解說：用戶把電腦視為一組工具（文書處理器、試算表、地圖、待辦清單、電郵等）；程式員（Programmers）則學習電腦的「思維方式」與電腦語言，並擁有「建造新工具」的工具。程式員有時為大量用戶寫工具，有時為自己寫小「helper」來自動化任務。

> English Standard Definitions:
> - "Users see computers as a set of tools - word processor, spreadsheet, maps, to-do list, email, etc."
> - "Programmers learn the computer 'ways' and the computer language."
> - "Programmers have some tools that allow them to build new tools."

#### 3.1.3 AI 在程式開發中的角色（Use of AI in Program Development）

繁中解說：AI 可以縮短寫程式的知識差距：由 Prompt／自然語言生成程式碼、程式碼自動補全與建議、錯誤偵測與除錯。但初學者用 AI 生成「建議答案」時有潛在問題：(1) 建議答案是否正確？(2) 是否符合所有需求？(3) 是否含有漏洞（Vulnerabilities）？判斷這些都需要「知識（KNOWLEDGE）」——所以 IT 職位仍然不可或缺。

> English Standard Definitions:
> - "How AI helps minimize the knowledge gap to write programs: prompt/natural language to code; code autocompletion and suggestions; error detection and debugging."
> - "Potential problems: Is the suggested answer correct? Does the suggested answer fulfil all requirements? Does the suggested answer consist of vulnerabilities?"
> - "Judgment requires KNOWLEDGE — IT posts are still essential."

#### 3.1.4 AI 作為學習助手（AI as a Learning Assistant）

繁中解說：正確使用 AI 學習的方法包括：要求解釋錯誤訊息與可能原因、生成測試案例（test cases）檢查程式正確性、要求解釋而非直接給答案、要求針對建議答案的特定部分深入說明、要求提供可信參考來源、要求提供多個解決方案並比較。

> English Standard Definitions:
> - "Ask for an explanation of the error message and provide possible reasons."
> - "Generate test cases for checking the correctness of your programs."
> - "Ask for explanations instead of just providing an answer."
> - "Ask for multiple solutions and provide a comparison."

### 3.2 Python 基礎（Python Basics）

#### 3.2.1 為何選 Python（Why Python?）

繁中解說：Python 是流行的 **Scripting Language**（腳本語言），非常適合編程練習。分別兩個概念：**Programming**（程式設計）——通用語言，通常在執行（run）前被**編譯（Compiled）**成 machine code；**Scripting**（腳本）——通常用於自動化任務，執行時（runtime）直接執行而無需事先編譯。Python 的設計哲學強調**程式碼可讀性（Readability）**，其**語法（Syntax）**讓程式員用比 C++ 或 Java 更少的程式行表達概念。Python 支援多種**程式設計範式（Programming Paradigms）**：程序式（Procedural Programming）、函數式（Functional Programming）與物件導向（Object-Oriented Programming, OOP）。

> English Standard Definitions:
> - "Python is a popular scripting language and perfectly well-suited for our programming practices."
> - "Programming: general-purpose languages, usually compiled into machine code before execution."
> - "Scripting: typically used to automate tasks, usually run at runtime without prior compilation."
> - "The design philosophy of Python emphasizes code readability, and its syntax allows programmers to express concepts in fewer lines of code than possible in languages such as C++ or Java."
> - "Python supports multiple programming paradigms, including procedural programming, functional programming, and object-oriented programming."

#### 3.2.2 安裝與執行環境（Installation & Running Python）

繁中解說：Python 可從官方網站 `https://www.python.org/downloads/` 下載。執行 Python 有三種常見方式：(1) 開啟 **IDLE**（Python 官方整合式開發與學習環境，Integrated Development and Learning Environment），輸入程式碼按 Enter 即執行；(2) 開啟 Command Prompt，輸入 `python` 進入 Python Shell，輸入 `exit` 離開；(3) 用文字編輯器或 **IDE**（Integrated Development Environment，整合開發環境）寫成 Python 腳本檔（**.py file**），再用 `python` 指令執行該檔案。

> English Standard Definitions:
> - "Open IDLE (Official Integrated Development and Learning Environment for Python). Type the following code and press 'Enter' key."
> - "Open Command Prompt. Enter 'python' to enter Python shell. Enter 'exit' to quit the shell."
> - "Use a text editor or an IDE to write a Python program. Save it as a Python script file (.py file). Locate and execute the script file by 'python'."

#### 3.2.3 第一個程式：`print("Hello, World!")`

繁中解說：第一個程式由以下部分組成：`print` 這個字、左括號（opening parenthesis）、引號（quotation mark）、一行文字 `Hello, World!`、另一個引號、右括號（closing parenthesis）。`print` 是一個**函數（Function）**，`"Hello, World!"` 是它的**參數（Argument）**。

> English Standard Definitions:
> - "The first program consists of: the word print; an opening parenthesis; a quotation mark; a line of text: Hello, World!; another quotation mark; a closing parenthesis."
> - "Each of the above plays a very important role in the code."

#### 3.2.4 函數（Function）

繁中解說：**Function** 是一段**可重用（Reusable）**的程式碼：接收可能的參數（Argument(s)）作為輸入值，進行一些計算（computation），並可能**傳回資料（Return data）**／輸出作為結果。`print()` 是**系統定義（System-defined）**函數，用於在螢幕上印出輸出；之後課程會學習自訂函數（User-defined functions）。

> English Standard Definitions:
> - "A function is a reusable code that takes possible argument(s) as input values, does some computation, and may return data/output as a result."
> - "print() is a system-defined function to print output on the screen."
> - "We will learn how to create user-defined functions later."

#### 3.2.5 重要注意事項（Important Notes）

繁中解說：Python 有三個必須記住的重點：(1) **拼字要正確**（Correct spelling）——`student` ≠ `students`；(2) **區分大小寫（Case Sensitive）**——`student` ≠ `Student`；(3) **縮排（Indentation）分隔程式碼區塊**——同一層級縮排（4 空格／2 空格／1 個 Tab）的程式碼屬於同一 block，縮排不同代表不同層級。例如 `def func1()` 內 `print("A")` 與 `print("In the block")` 要同樣縮排，否則 Python 會視為 block 外的程式碼。

> English Standard Definitions:
> - "Python is case sensitive: student ≠ Student."
> - "Code blocks are separated by indentation: 4 spaces / 2 spaces / 1 tab space for one level of indentation."

### 3.3 基本 Literals（Basic Literals）

#### 3.3.1 甚麼是 Literal

繁中解說：**Literal（字面量）** 是給予變數或數值的原始資料（raw data）。Python 中的 literal 類型包括：

| Literal 類型 | 例子 | 特點 |
|---|---|---|
| **Numeric**（數值） | Integer：`123`, `-4`；Floating-point：`3.14` | 不加引號 |
| **String**（文字） | `"Hello"`, `'Hello'`, `'''It is a multi-line string'''` | 必須加引號（單／雙／三引號） |
| **Boolean** | `True`, `False` | Reserved words（保留字） |
| **Special** | `None` | Reserved word（保留字） |
| **Collection** | List, tuple, dictionary, set | 之後章節再教 |

> English Standard Definitions:
> - "A literal is raw data given in a variable or value."
> - "Numeric literals are written without quotes; string literals are written with quotes."
> - "Boolean literals are True and False (reserved words); a special literal example is None (a reserved word)."

繁中解說：Literal 是**固定值（Fixed values）**——值不能改變，例如 `print("Hello, World!")` 中的 `"Hello, World!"` 就是一個 literal。

> - "Literals are fixed values - the value cannot be changed."

### 3.4 變數（Variables）

#### 3.4.1 甚麼是 Variable

繁中解說：**Variable（變數）** 是記憶體中一個**有名稱的位置（Named place）**：程式員可以把資料儲存（store）進去，之後用變數名稱**取回（Retrieve）**資料。程式員可以自選變數名稱；在之後的語句（statement）中可以改變變數的內容。例如：
```python
x = 12.2
y = 14
x = 100
```
執行順序（Execution Order）由上至下：x 先存 12.2，y 存 14，最後 x 被改成 100。

> English Standard Definitions:
> - "A variable is a named place in the memory where a programmer can store data and later retrieve the data using the variable name."
> - "Programmers get to choose the names of the variables."
> - "You can change the contents of a variable in a later statement."

#### 3.4.2 Reserved Words（保留字）

繁中解說：**不能用保留字作為自己的變數名稱／識別字（identifiers）**。Python 的保留字包括：`and  del  for  is  raise  assert  elif  from  lambda  return  break  else  global  not  try  class  except  if  or  while  continue  exec  import  pass  yield  def  finally  in  print  as  with`。

> English Standard Definitions:
> - "You can NOT use reserved words as your own variable names / identifiers."

#### 3.4.3 命名規則（Naming Rules）

繁中解說：變數名稱可以包含字母（letters）、數字（numbers）或底線（underscores），但**不能以數字開頭**；名稱**區分大小寫**。好的名稱：`spam`、`eggs`、`spam23`、`_speed`；壞的名稱：`23spam`（數字開頭）、`#sign`（含 #）、`var.12`（含點號）。`spam`、`Spam`、`SPAM` 是三個不同的名稱。名稱應該**有意義（meaningful）**。

> English Standard Definitions:
> - "Names can consist of letters, numbers, or underscores, but cannot start with a number."
> - "Python is case sensitive: spam, Spam, and SPAM are different names."
> - "Variable names should be meaningful."

#### 3.4.4 助憶變數名稱（Mnemonic Variable Names）

繁中解說：因為程式員可自選變數名稱，所以有「最佳實踐」：**用能幫助記憶的名稱**（"mnemonic" = "memory aid"，記憶輔助），例如用 `stuName` 記住它存放學生姓名。命名風格（Naming Styles）：**mixedCase**（如 `stuName`）與 **lower_case_with_underscores**（如 `student_name`）用於變數；**CapitalizedWords** 用於類別名稱（class name，如 `Student`）；**UPPERCASE** 用於固定值變數（作常數 constant 用，如 `DEFAULT_WARNING`）。`var1` 不是好名字，因為它沒有記憶提示作用。

> English Standard Definitions:
> - "We name variables to help us remember what we intend to store in them ('mnemonic' means 'memory aid')."
> - "Naming styles: mixedCase or lower_case_with_underscores for variables; CapitalizedWords for class names; UPPERCASE for variables with fixed value (used as a constant)."

### 3.5 Statements 與 Expressions

#### 3.5.1 Statements（語句）

繁中解說：**Statement** 是一行程式碼（line of code）。常見類型：**Expression statements**（表達式語句）、**Assignment statements**（賦值語句）、**Conditional statements**（條件語句，多種流程）、**Looping statements**（迴圈語句，重複）、**Function definition / class definition**（函數／類別定義）及其他。

> English Standard Definitions:
> - "Common types of statements: expression statements, assignment statements, conditional statements (multiple workflow), looping statements (repetition), function definition, class definition, and others."

#### 3.5.2 Expression Statements（表達式語句）

繁中解說：**Expression statements** 通常由左至右閱讀，**除非**有算術運算子（arithmetic operator）或括號（parentheses `()`）改變評估順序。例如：`print(1 + 2 - 3)` 由左至右計算 = **0**；`print(1 - (2 - 3))` 因括號先算 (2−3) = −1，所以 1 − (−1) = **2**。

> English Standard Definitions:
> - "Expression statements are usually read from left to right, unless an arithmetic operator or parentheses alter the order of evaluation."

#### 3.5.3 Arithmetic Operations（算術運算）

繁中解說：Python 的七個算術運算子（以 20 和 3 為例）：

| Operator | 英文名稱 | 中文 | 例子 | 結果 |
|---|---|---|---|---|
| `+` | Addition | 加法 | 20 + 3 | 23 |
| `-` | Subtraction | 減法 | 20 - 3 | 17 |
| `*` | Multiplication | 乘法 | 20 * 3 | 60 |
| `/` | Division | 除法 | 20 / 3 | 6.66666666 |
| `//` | Floor Division | 整除（取商） | 20 // 3 | 6 |
| `**` | Exponentiation / Power | 指數（次方） | 20 ** 3 | 8000 |
| `%` | Modulus / Remainder | 模數（取餘數） | 20 % 3 | 2 |

> English Standard Definitions:
> - "Arithmetic operators include + (addition), - (subtraction), * (multiplication), / (division), // (floor division), ** (exponentiation), and % (modulus/remainder)."

#### 3.5.4 Order of Evaluation（評估順序 / Operator Precedence）

繁中解說：多個運算子同時出現時，Python 必須決定先算哪一個，這叫 **Operator Precedence（運算子優先順序）**。由最高優先到最低：**括號（Parentheses）永遠最優先** → **指數（Exponentiation）** → **乘法、除法、餘數（Multiplication, Division, Remainder）** → **加法與減法（Addition and Subtraction）** → 同級時**由左至右（Left to right）**。

**算例**：`print(7 + 6 - 5 * 4 / 3 ** 2)`
1. `3 ** 2` = 9
2. `5 * 4 / 9` = 20 / 9 ≈ 2.2222222（乘除同級，由左至右）
3. `7 + 6 - 2.2222222` = 13 − 2.2222222 ≈ **10.7777778**

> English Standard Definitions:
> - "When we use many operators together, Python must know which one to do first. This is called 'operator precedence'."
> - "Parentheses are always respected; then exponentiation; then multiplication, division, and remainder; then addition and subtraction; and evaluation proceeds left to right."

#### 3.5.5 Assignment Statements（賦值語句）

繁中解說：**Assignment statement** 把一個值賦予（assign）變數——即把資料寫入（write data into）變數。**等號（=）右邊的 expression 會先被評估（evaluated first）**，其**結果才賦予／儲存到左邊的變數**。例：`x = 7 + 6 - 5 * 4 / 3 ** 2` 先計算右邊 = **10.7777778**，再把 10.7777778 存入 x。

> English Standard Definitions:
> - "We use assignment statements to assign a value to a variable — write data into the variable."
> - "The expression on the right of the equal sign (=) is evaluated first, and its result is assigned to/stored in the variable on the left."

#### 3.5.6 Procedural Statements（程序式語句的執行順序）

繁中解說：在一個程式碼區塊（code block）內，語句一般**由上至下依序執行（sequentially from top to bottom）**：
```python
x = 2
x = 4
print(x)
```
輸出：**4**（x 最後被賦值為 4，print 讀取目前的值）。

> English Standard Definitions:
> - "In a single code block, statements are generally executed (run) sequentially from top to bottom."

#### 3.5.7 變數的讀取與寫入（Variable's Read and Write）

繁中解說：以 `x = x * 100` 為例：
```python
x = 2
x = x * 100
print(x)
```
執行步驟：先**讀取（Read）**變數 x 目前的值（2）→ 做算術 `2 * 100` = 200 → 把結果**寫入（Write）**回 x。輸出：**200**。

> English Standard Definitions:
> - "In an assignment like x = x * 100, Python first reads the current value of x, performs the arithmetic, then writes the result back to x."

### 3.6 Comments（註釋）

繁中解說：Python 中，**`#` 之後的所有內容都會被直譯器忽略（ignored）**。為甚麼要寫註釋？(1) 描述一段程式碼即將做甚麼；(2) 記錄誰寫了這段程式碼或其他附加資訊；(3) 暫時關閉某行程式碼（例如除錯時）。注意：雖然 Python 3 預設使用 UTF-8 編碼，但**建議註釋中避免包含中文字元**。

> English Standard Definitions:
> - "Anything after a # is ignored by the Python interpreter."
> - "Why comment? Describe what is going to happen in a sequence of code; document who wrote the code or other ancillary information; turn off a line of code - perhaps temporarily."
> - "Although Python 3 uses UTF-8 encoding by default, it is recommended to avoid including Chinese characters in comments."

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/縮寫 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| Machine Code | 機器語言；電腦直接理解的語言 | "We should speak the computer's language, machine code, to describe what we want done." |
| Instruction | 指令；放入電腦讓用戶使用的程式 | "Someone already put many different programs (instructions) into the computer." |
| Programmer | 程式員；學習電腦語言並建造工具的人 | "Programmers learn the computer 'ways' and the computer language." |
| Scripting Language | 腳本語言；執行時無需事先編譯 | "Python is a popular scripting language; scripts usually run at runtime without prior compilation." |
| Compiled | 編譯；執行前轉成 machine code | "Programming languages are usually compiled into machine code before execution." |
| Readability | 可讀性；Python 的核心設計哲學 | "The design philosophy of Python emphasizes code readability." |
| Syntax | 語法；語言的書寫規則 | "Python's syntax allows programmers to express concepts in fewer lines of code." |
| Programming Paradigm | 程式設計範式 | "Python supports multiple paradigms: procedural, functional, and object-oriented programming." |
| IDLE | Python 官方整合式開發與學習環境 | "IDLE is the official Integrated Development and Learning Environment for Python." |
| IDE | 整合開發環境 | "An IDE (Integrated Development Environment) is used to write and run Python programs." |
| Python Shell | Python 互動式命令列 | "Enter 'python' in the Command Prompt to enter the Python shell; enter 'exit' to quit." |
| Script (.py file) | 腳本檔；以 .py 結尾的 Python 檔案 | "Save the program as a Python script file (.py file) and execute it by 'python'." |
| Function | 函數；可重用的程式碼 | "A function is reusable code that takes argument(s) as input, does computation, and may return data." |
| Argument | 參數；傳給函數的輸入值 | "In print(\"Hello, World!\"), the string is the argument of the function." |
| System-defined Function | 系統定義函數 | "print() is a system-defined function to print output on the screen." |
| User-defined Function | 自訂函數 | "We will learn how to create user-defined functions later." |
| Case Sensitive | 區分大小寫 | "Python is case sensitive: student and Student are different names." |
| Indentation | 縮排；分隔程式碼區塊 | "Code blocks are separated by indentation: 4 spaces, 2 spaces, or 1 tab." |
| Literal | 字面量；原始資料值 | "A literal is raw data given in a variable or value." |
| Numeric Literal | 數值字面量（整數／浮點數） | "Numeric literals are written without quotes, e.g. 123 or 3.14." |
| String Literal | 字串字面量 | "String literals are written with quotes, e.g. \"Hello\" or 'Hello'." |
| Boolean | 布林值 | "Boolean literals are True and False, which are reserved words." |
| Reserved Word | 保留字；不可用作識別字 | "You cannot use reserved words as your own variable names or identifiers." |
| Variable | 變數；記憶體中有名稱的位置 | "A variable is a named place in memory where a programmer can store data and later retrieve it." |
| Identifier | 識別字；變數／函數等名稱 | "Identifiers can consist of letters, numbers, or underscores, but cannot start with a number." |
| Mnemonic | 助憶；幫助記憶的名稱 | "We name variables to help us remember what we store in them; 'mnemonic' means 'memory aid'." |
| Constant | 常數；固定值變數 | "UPPERCASE is used for variables with fixed value, used as a constant." |
| Statement | 語句；一行程式碼 | "Statements include expression, assignment, conditional, looping, and function/class definition." |
| Expression Statement | 表達式語句 | "Expression statements are usually read from left to right, unless operators or parentheses alter the order." |
| Assignment Statement | 賦值語句 | "The expression on the right of = is evaluated first, then the result is stored in the variable on the left." |
| Operator Precedence | 運算子優先順序 | "Parentheses are always respected, then exponentiation, then multiplication/division/remainder, then addition/subtraction, left to right." |
| Floor Division (`//`) | 整除；取商的整數部分 | "20 // 3 gives 6 because floor division returns the integer part of the division." |
| Modulus (`%`) | 模數；取餘數 | "20 % 3 gives 2 because modulus returns the remainder of the division." |
| Exponentiation (`**`) | 指數運算 | "20 ** 3 equals 8000 because ** is the exponentiation operator." |
| Comment | 註釋；被直譯器忽略的文字 | "Anything after a # is ignored by the Python interpreter." |
| Execution Order | 執行順序 | "Statements in a code block are executed sequentially from top to bottom." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

1. **先理解觀念**：電腦只懂 machine code → 高階語言（Python）是橋樑 → Programming（編譯）vs Scripting（直譯）的分別；Users vs Programmers 的角色差異
2. **背誦英文短語**：function / variable / literal / reserved word 的定義句；operator precedence 的完整順序句；"case sensitive"、"indentation separates code blocks" 等注意事項
3. **掌握操作與計算**：安裝 Python → 在 IDLE / Python Shell / .py script 三種環境執行 `print("Hello, World!")`；心算 precedence 算例（`7 + 6 - 5 * 4 / 3 ** 2` → 10.7777778）；追蹤 variable read/write（`x = x * 100` → 200）
4. **能解答英文考題**：例如
   - "What is the output of print(7 + 6 - 5 * 4 / 3 ** 2)?" → 10.7777778
   - "Which of the following is a valid variable name: 23spam, _speed, var.12, spam23?" → spam23 and _speed
   - "What is a literal? Give three types with examples." → 見 3.3.1
   - "Explain the difference between programming and scripting." → "Programming languages are usually compiled before execution, while scripts run at runtime without prior compilation."
   - "Why do we use comments?" → "To describe code, document authorship, and temporarily turn off lines."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**算術運算子（以 20 和 3 為例）**

| Operator | 名稱 | 結果 |
|---|---|---|
| `+` | Addition 加法 | 23 |
| `-` | Subtraction 減法 | 17 |
| `*` | Multiplication 乘法 | 60 |
| `/` | Division 除法 | 6.66666666 |
| `//` | Floor Division 整除 | 6 |
| `**` | Exponentiation 次方 | 8000 |
| `%` | Modulus 餘數 | 2 |

**Operator Precedence（由高至低）**
1. Parentheses `()`
2. Exponentiation `**`
3. Multiplication `*`, Division `/`, Remainder `%`（同級由左至右）
4. Addition `+`, Subtraction `-`（同級由左至右）

→ `7 + 6 - 5 * 4 / 3 ** 2` = **10.7777778**（必考算例）

**Literal 五類型**

| 類型 | 例子 | 關鍵 |
|---|---|---|
| Numeric | 123, -4, 3.14 | 不加引號 |
| String | "Hello", 'Hello' | 必須加引號 |
| Boolean | True, False | Reserved words |
| Special | None | Reserved word |
| Collection | List, tuple, dict, set | 後續章節 |

**變數命名規則**
- 字母／數字／底線，**不能以數字開頭**；**Case Sensitive**；要有意義
- 好：`spam`, `spam23`, `_speed`｜壞：`23spam`, `#sign`, `var.12`
- 不能用 Reserved Words（and, for, if, def, class, import…）
- 命名風格：變數 `stuName`／`student_name`；類別 `Student`；常數 `DEFAULT_WARNING`

**執行與賦值重點**
- Statements 由上至下依序執行：`x=2; x=4; print(x)` → **4**
- `=` 右邊先算、左邊後存：`x = x * 100` → 讀 x(2) → 2×100 → 寫回 → **200**
- 縮排分隔 code block：4 spaces / 2 spaces / 1 tab
- `#` 之後全部忽略（Comments）；建議註釋不用中文

**英文極速記憶句**
- "Python is case sensitive."
- "A literal is raw data given in a variable or value."
- "The expression on the right of = is evaluated first."
- "Anything after a # is ignored by the Python interpreter."
- "print() is a system-defined function; we will create user-defined functions later."
