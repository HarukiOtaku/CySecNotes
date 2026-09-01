# ITP3915 Lecture 2: Interaction (Input/Output) 雙語應考學習指南

> 本指南對應 ITP3915 Programming Fundamentals — Lecture 2: Interaction (Input/Output)。目標是令你掌握 Python 文字程式（text-based programs）的**輸入（input）與輸出（output）**、**字串操作（string operations）**，以及用 **Qt Designer** 建立簡單 GUI。所有核心定義附英文標準句，考試可直接照抄。

---

## 1. 📝 課程概要與實務情境 (Summary & Real-world Context)

本講核心主題是「**程式與使用者之間的互動（interaction）**」：程式如何接收使用者輸入（capture user input）、如何按指定格式顯示輸出（display output following specific requirements），以及如何處理文字字串（concatenate and process text strings）。在 Python 中，最基礎的輸入輸出工具就是 `input()` 與 `print()` 兩個函數（functions），再加上一整組字串操作方法（string operations），例如 `strip()`、`lower()`、`len()`、`find()`、`replace()` 等。課程後半段引入 **Qt Designer**，示範如何以圖形化方式設計 GUI（Graphical User Interface），再以 `pyuic6` 工具把介面檔轉成可執行的 Python 程式。

實際寫 Code 場景：例如你在 Lab 1 寫過的文字版程式——螢幕顯示問題（text-based prompt），使用者打字輸入答案（typing for user input），程式再把結果以文字顯示（text-based output）。又例如一個登入系統要從表單抽取使用者名稱，若使用者誤打頭尾空格，就要用 `strip()` 清除；要檢查電郵地址是否以 `"@gmail.com"` 結尾，就要用 `endswith()`。這些全部都是日常程式開發中天天會用到的字串處理技巧，亦是考試必考的「輸出結果判斷題」（What is the output?）的題源。

另一個常見場景是圖形介面：網上銀行、桌面應用（windows applications）都用 GUI，支援滑鼠與觸控螢幕輸入。課程用 **Qt Designer** 拖放元件（drag and drop widgets）——`Label`（文字標籤）、`Line Edit`（文字輸入框）、`Push Button`（按鈕）——再產生 Python 程式碼。記住本模組**只准使用 PyQt6**，任何用 PyQt5 的提交都會被當作 AI 生成、以作弊處理。

---

## 2. 🎯 考試學習目標 (Learning Objectives)

完成本課後，你應該能夠（考官會由以下能力出題）：

| 學習目標（繁中） | 英文對照（考官原句） |
|---|---|
| 在 Python 文字程式中擷取使用者輸入 | Capture user input in Python text-based programs |
| 按特定要求顯示輸出 | Display output following specific requirements |
| 串聯及處理文字字串以作輸出 | Concatenate and process text strings for output |
| 用 Qt Designer 建立簡單 Python GUI | Create a simple Python GUI with Qt Designer |

**考官評核重點（答題前先問自己）：**
- 見到 `input()` / `print()` 題目，能否準確預測**輸出結果**（包括空格、換行、分隔符）？
- 能否解釋 `print()` 的 `end` 與 `sep` 參數（arguments）的預設值與作用？
- 能否用 `+`、`*`、`str()` 正確處理字串串聯（string concatenation）？
- 能否背出每個 string method 的**回傳值（return value）**與**是否區分大小寫（case sensitive）**？
- 能否說明 Qt Designer 的元件類別與 `pyuic6` 指令的用途？

---

## 3. 📖 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 使用者介面的兩大類型 (Types of User Interface)

「互動」指使用者（clients）與機器之間的接觸點（the point of interaction）。常見的使用者介面（User Interface，介面）有兩類：

1. **文字式提示程式（Text-based prompt program）**——即 Lab 1 所做：
   - 以打字方式輸入（Typing for user input）
   - 以文字輸出（Text-based output）
2. **圖形使用者介面（Graphical User Interface, GUI）**：
   - 支援滑鼠指標或觸控螢幕輸入（mouse pointer or touchscreen for user input）
   - 以各種圖形元素輸出（output with various graphical elements）
   - 例子：視窗應用程式、網頁應用（windows applications, web-based）

> **English Standard Definition:** A user interface is the point of interaction between users (clients) and the machine; common types include text-based prompt programs and graphical user interfaces (GUI).

**考試重點：** 選擇哪種介面要考慮使用者的特徵（selection of types should consider the characteristics of users）——例如不熟悉電腦的用家較適合 GUI，需要自動化批次處理則適合文字介面。

---

### 3.2 使用者輸入 — `input()` 函數 (User Input)

`input()` 是用來取得使用者輸入的函數。重點機制（mechanism）如下：

1. 可以傳入一個 **prompt（提示／問題）** 作為 `input()` 的參數（argument）。
2. 提示出現後，**Python 暫停執行**（pauses execution），等待使用者打字。
3. 使用者輸入內容並按下 **ENTER** 後，`input()` 函數把輸入**以字串（String）形式回傳**。

> **English Standard Definition:** `input()` is a function used to get input from the user. A prompt (question) can be provided as an argument to `input()`. Once the prompt appears, Python pauses execution and waits for the user to type something. After the user enters their input and presses ENTER, the `input()` function returns the user input as a String.

**考試重點（必背）：** `input()` **永遠回傳 String**（字串）！即使使用者輸入數字，`input()` 回傳的仍然是字串 `"10"` 而非整數 `10`——這正是後面要學 `int()` / `float()` 轉換的原因。

```python
# 基本用法：prompt 作為參數
answer = input("What is your name? ")
# 使用者輸入 "Peter" 並按 ENTER
# 執行結果：變數 answer 的值為字串 "Peter"
```

**預期輸出（程式行為）：**
```
What is your name? Peter
```
（程式停在 prompt 之後等待輸入；輸入後程式才繼續執行。）

---

### 3.3 輸出與 `print()` 的 `end`、`sep` 參數 (Output and the end/sep Arguments)

#### 3.3.1 預設的結尾字元 `end`（End Character of print()）

`print()` 的 `end` 參數預設為 `\n`（newline，換行字元）。即每次 `print()` 執行完畢，游標自動移到下一行。我們經常需要跟隨使用者指定的輸出格式（follow the user's specified output format），所以要知道如何改動 `end`。

```python
# Example 1：預設 end="\n"，兩個 print 各佔一行
print("Peter")
print("Chan")
```

**預期輸出：**
```
Peter
Chan
```
（執行第一個 statement 後，游標停在下一行開頭。）

```python
# Example 2：把 end 設為一個空格
print("Peter", end=" ")
print("Chan")
```

**預期輸出：**
```
Peter Chan
```
（第一個 `print` 結束後沒有換行，只輸出一個空格；執行第一個 statement 後游標仍停留在同一行。）

> **English Standard Definition:** The default end character of `print()` is `\n` (new line). By setting the `end` argument to another value, such as a space `" "`, the output will not move to a new line after printing.

#### 3.3.2 預設的分隔符 `sep`（Separator of print()）

單一次 `print()` 呼叫可以接受**多個以逗號分隔的值參數（multiple value arguments separated with commas）**。這些值之間預設以**一個空格（a space by default）**分隔，可用 `sep` 參數改動。

```python
# Example 1：預設 sep=" "（空格）
print("Peter", "Chan")
```

**預期輸出：**
```
Peter Chan
```

```python
# Example 2：sep="_"（底線）
print("Peter", "Chan", sep="_")
```

**預期輸出：**
```
Peter_Chan
```

```python
# Example 3：sep=""（空字串——完全不留分隔）
print("Peter", "Chan", sep="")
```

**預期輸出：**
```
PeterChan
```

> **English Standard Definition:** A single `print()` function call allows multiple value arguments separated with commas. The default separator is a space; it can be changed by setting the `sep` argument, e.g. `sep="_"` or `sep=""`.

**考試重點（極易混淆）：**
- `sep` 控制**同一行內多個值之間**的分隔符；`end` 控制**這一行之後**的結尾字元。
- 預設值口訣：「**sep 空格、end 換行**」（space by default, newline by default）。
- 提示：在 VS Code 把游標放在函數名上，可查看其定義（put the cursor over the code to view its definition）。

#### 3.3.3 判斷輸出題（What is the Output?）

教材例題：以下程式輸出甚麼？（選擇題，正確答案是 C）

```python
print("Peter")
print("Chan")
```

**預期輸出：**
```
Peter
Chan
```
（因為 `end` 預設為 `\n`，所以 Peter 與 Chan 各佔一行，答案並非同一行的 "Peter Chan"。）

---

### 3.4 字串串聯 — `+` 運算子 (String Concatenation)

處理大量字串十分常見（handling many strings is common）。`+` 運算子除了數學加法外，亦可用於**把兩個文字字串串聯（concatenate）**。

```python
# Example 1：直接串聯，無空格
stuName = "Peter" + "Chan"
print(stuName)
```

**預期輸出：**
```
PeterChan
```

```python
# Example 2：第一個字串本身已含一個空格
stuName = "Peter " + "Chan"
print(stuName)
```

**預期輸出：**
```
Peter Chan
```
（注意：第二例有一個空格，因為 "Peter " 字串本身就帶一個空格。）

**評估順序（order of evaluation）：** 串聯由左至右依次結合，與數學運算相同。

```python
stuName = "Chan " + "Siu " + "Ming"
# ↓ 先結合前兩個
stuName = "Chan Siu " + "Ming"
# ↓ 再結合最後一個
stuName = "Chan Siu Ming"
```

**預期輸出：**
```
Chan Siu Ming
```

**串聯時讀取變數中的字串值（retrieve string value during concatenation）：**

```python
firstName = "Peter"
stuName = firstName + " Chan"
# ↓
stuName = "Peter" + " Chan"
# ↓
stuName = "Peter Chan"
```

**預期輸出：**
```
Peter Chan
```

> **English Standard Definition:** Instead of using the `+` operator for mathematical addition, it can be used to concatenate two text strings. Concatenation follows the same order of evaluation (left to right), and string values stored in variables can be retrieved during concatenation.

---

### 3.5 把數字串聯到字串 — `str()` 轉換 (Concatenate a Number to a String)

**Python 不允許直接把數字與字串串聯**（does not allow direct concatenation of a number with a string）。若執行 `"Boeing" + 777` 會出錯（bug）；修正方法是用 `str()` 把數字**轉換成字串**。

```python
model = "Boeing" + str(777)
print(model)
```

**預期輸出：**
```
Boeing777
```

> **English Standard Definition:** Python does not allow direct concatenation of a number with a string. To fix the bug, use `str()` to convert the number to a string first.

**考試重點：** `str(777)` 把整數 `777` 變成字串 `"777"`，之後才可與 `"Boeing"` 串聯。見到 `str()` 就要聯想到「數字轉字串以便串聯」。

---

### 3.6 重複串聯 — `*` 運算子 (Repeated Concatenations)

`*` 運算子除了數學乘法外，可用於**對字串進行重複串聯（repeated concatenations）**——即把字串重複 N 次。

```python
highlight = "^" * 10
print(highlight)
```

**預期輸出：**
```
^^^^^^^^^^
```
（`"^"` 重複 10 次，共 10 個 ^ 符號。）

> **English Standard Definition:** Instead of using the `*` operator for mathematical multiplication, it can be used to perform repeated concatenations of a string.

**考試重點：** `"ab" * 3` 的結果是 `"ababab"`（重複 3 次，不是 a³b³）。

---

### 3.7 引號與跳脫字元 (Quotes & Escape Characters in String)

#### 3.7.1 三種引號 (Single, Double and Triple Quotes)

Python 可用單引號、雙引號及三引號定義字串：

```python
'Hello'      # 單引號
"Hello"      # 雙引號
'''It is a multi-line string'''   # 三引號：多行字串
```

**問題所在（What is the problem?）：** 若字串內容本身包含引號（例如 Peter's），會發生「另一個字串的開始卻沒有結束引號」（start of another string without an end quote）的錯誤——Python 會誤以為字串在錯誤位置結束。

```python
# 錯誤示範：'Peter's birthday'
# 解讀：'Peter' 是一個字串，之後的 s birthday 是殘餘程式碼 → 語法錯誤
```

**解決方法一：用不同種類的引號（Use different quotes）**

```python
event = "Peter's birthday"
```

**解決方法二：加入跳脫字元 `\`（Add an escape character）**

```python
event = 'Peter\'s birthday'
```

> **English Standard Definition:** Strings can be defined with single quotes, double quotes, or triple quotes (for multi-line strings). If a string contains a quote character, either use different quotes or add an escape character `\` to fix the problem.

#### 3.7.2 跳脫字元表 (Escape / Special Characters)

| 跳脫字元 | 意義 |
|---|---|
| `\'` | Single quote（單引號） |
| `\"` | Double quote（雙引號） |
| `\\` | Backslash（反斜線） |
| `\n` | New line（換行） |
| `\t` | Tab space（Tab 空格） |

```python
# Example 1：\n 換行
print("Chan\nPeter")
```

**預期輸出：**
```
Chan
Peter
```

```python
# Example 2：\t 等距 Tab 空格
print("A\tB\tC")
print("Chan\tSiu\tMing")
```

**預期輸出：**
```
A       B       C
Chan    Siu     Ming
```
（`\t` 令各欄位相隔一個 Tab 的等距空格（even distance of one tab space）。）

**綜合例題（Slide 18 判斷輸出題）：**

```python
print('It\'s a "special" string with a backslash \\ character.\nHere is a new line.\tAnd here is a tab space.')
```

**預期輸出：**
```
It's a "special" string with a backslash \ character.
Here is a new line.	And here is a tab space.
```

**逐步拆解（如何推導輸出）：**
- `\'` → 輸出單引號 `'`（所以 It's 正常顯示）
- `"` 無跳脫 → 直接輸出雙引號
- `\\` → 輸出單一反斜線 `\`
- `\n` → 換行
- `\t` → Tab 空格

> **English Standard Definition:** Escape characters such as `\'`, `\"`, `\\`, `\n` and `\t` are used inside strings to represent special characters: single quote, double quote, backslash, new line and tab space respectively.

---

### 3.8 字串操作大全 (String Operations)

> 參考：https://www.w3schools.com/python/python_ref_string.asp
> **考試重點：** 查閱字串方法時要分辨兩件事——此函數**有無回傳值（return value / output）**、**是否接受參數（arguments / input）**。

#### 3.8.1 去除空白 — `strip()`, `lstrip()`, `rstrip()`

這三個函數用於移除空格，**包括 Tab 空格與換行**（remove spaces, including tab spaces and newlines）。實務用例：從表單輸入中抽取使用者名稱（extract username from form input）——使用者常誤打頭尾空白。

```python
originalStr = "  Hello Chan siu MING  \n        "
```

| Code | Description（英文描述） | Result（結果） |
|---|---|---|
| `originalStr.strip()` | Remove the heading (left) and tailing (right) spaces（移除頭尾空格） | `"Hello Chan siu MING"` |
| `originalStr.lstrip()` | Remove the heading (left) spaces（只移除左邊／開頭空格） | `"Hello Chan siu MING  \n        "` |
| `originalStr.rstrip()` | Remove the tailing (right) spaces（只移除右邊／結尾空格） | `"  Hello Chan siu MING"` |

> **English Standard Definition:** `strip()`, `lstrip()` and `rstrip()` are used to remove spaces, including tab spaces and newlines, from both sides, the left side, and the right side of a string respectively.

#### 3.8.2 大小寫轉換 — `lower()`, `upper()`, `title()`

```python
originalStr = "Chan siu MING"
```

| Code | Description（英文描述） | Result（結果） |
|---|---|---|
| `originalStr.lower()` | Convert to lower case（轉全小寫） | `"chan siu ming"` |
| `originalStr.upper()` | Convert to upper case（轉全大寫） | `"CHAN SIU MING"` |
| `originalStr.title()` | Convert the first character of each word to upper case（每個字首字母轉大寫） | `"Chan Siu Ming"` |

> **English Standard Definition:** `lower()`, `upper()` and `title()` convert the letter case of a string: all lowercase, all uppercase, and the first character of each word to uppercase respectively.

#### 3.8.3 計數與搜尋 — `len()`, `count()`, `find()`, `rfind()`

```python
originalStr = "An iPhone and an iPad and a MacBook"
```

| Code | Description（英文描述） | Result（結果） |
|---|---|---|
| `len(originalStr)` | Count number of characters（計算字元數） | `35` |
| `originalStr.count("an")` | Count the number of the given substring（計算子字串出現次數；**區分大小寫**） | `3` |
| `originalStr.find("an")` | Find the index of the given substring from the left（由左找子字串索引；**第一個索引是 0**；找不到回傳 **-1**；區分大小寫） | `10` |
| `originalStr.rfind("an")` | Find the index of the given substring from the right（由右找子字串索引；第一個索引是 0；找不到回傳 -1；區分大小寫） | `22` |

**驗算（考試要識自己數 index）：**
- `len()` 把空格也算進去，共 35 個字元。
- `count("an")` 區分大小寫：`"An"` 的 A 是大寫不算，只數小寫 `"an"` → 出現在 `and`(位置 10)、`an`(位置 14)、`and`(位置 22) 共 **3** 次。
- `find("an")` 由左第一個小寫 `"an"` 在 index **10**（記住 index 由 0 開始！）。
- `rfind("an")` 由右第一個（即最後一個）小寫 `"an"` 在 index **22**。

> **English Standard Definition:** `len()` counts the number of characters in a string. `count()` counts the occurrences of a given substring (case sensitive). `find()` and `rfind()` return the index of a given substring from the left and from the right respectively (the first index is 0; return -1 if not found; case sensitive).

#### 3.8.4 取代與前後綴檢查 — `replace()`, `startswith()`, `endswith()`

```python
originalStr = "An iPhone and an iPad"
```

**取代：**

| Code | Description（英文描述） | Result（結果） |
|---|---|---|
| `originalStr.replace("i", "Apple ")` | Replace matched substring with a new value（把匹配的子字串換成新值；**區分大小寫**，只換小寫 i） | `"An Apple Phone and an Apple Pad"` |

（拆解：`"iPhone"` 中的小寫 `i` 被換成 `"Apple "` → `"Apple Phone"`；`"iPad"` 中的小寫 `i` → `"Apple Pad"`。大寫 `A`、`P` 不受影響。）

**前後綴檢查（回傳布林值 True / False）：**

| Code | Description（英文描述） | Result（結果） |
|---|---|---|
| `originalStr.startswith("An iPhone")` | Check if the string starts with the substring（檢查字串是否以子字串開頭；**區分大小寫**） | `True` |
| `originalStr.endswith("ipad")` | Check if the string ends with the substring（檢查字串是否以子字串結尾；**區分大小寫**） | `False` |

**考試重點：** `endswith("ipad")` 回傳 `False` 是因為字串結尾是 `"iPad"`（大寫 I、大寫 P），而檢查的參數是 `"ipad"`（全小寫）——**區分大小寫（case sensitive）**！

> **English Standard Definition:** `replace()` replaces every matched substring with a new value (case sensitive). `startswith()` and `endswith()` check whether a string starts or ends with a given substring respectively, and return a boolean value `True` or `False` (case sensitive).

#### 3.8.5 字元特性檢查 — `isalpha()`, `isdecimal()`, `isalnum()`

這類方法檢查字串的特性（check string characteristics），回傳布林值：

| Code | Description（英文描述） | Result（結果） |
|---|---|---|
| `"10".isalpha()` | Check if all characters are in the alphabet (a-Z)（是否全為英文字母） | `False` |
| `"10".isdecimal()` | Check if all characters are decimal（是否全為十進制數字） | `True` |
| `"10.1".isdecimal()` | 同上（含小數點 → 不是全數字） | `False` |
| `"10".isalnum()` | Check if all characters are alphanumeric（是否全為字母或數字） | `True` |
| `"10.1".isalnum()` | 同上（含小數點 → 不是字母數字） | `False` |

> **English Standard Definition:** `isalpha()`, `isdecimal()` and `isalnum()` check string characteristics and return a boolean: whether all characters are alphabetic, decimal digits, or alphanumeric respectively.

**考試重點（口訣）：** 「`is` 開頭即檢查，回傳 `True`/`False`」。`.`（小數點）既不是字母也不是數字，所以含 `.` 的字串三個檢查都回傳 `False`。

#### 3.8.6 字串轉數字 — `int()`, `float()`

`int()` 與 `float()` 用於把**字串轉換成數字**（convert string into number）。

| Code | Description（英文描述） | Result（結果） |
|---|---|---|
| `int("10")` | Convert string argument to an integer（字串轉整數） | `10` |
| `float("10.1")` | Convert string argument to a floating-point number（字串轉浮點數） | `10.1` |

**考試重點：** 與 `input()` 配合——`int(input("Age: "))` 才能把使用者輸入的字串變成整數做數學運算。`int("10.1")` 會出錯（不是合法整數字串），要轉小數必須用 `float()`。

> **English Standard Definition:** `int()` and `float()` are used to convert a string argument into an integer and a floating-point number respectively.

---

### 3.9 Qt Designer — Python 圖形使用者介面 (Qt – Python Graphical User Interface)

#### 3.9.1 Qt 與 Qt Designer 簡介

Qt 是一個**跨平台框架**，用於開發 GUI 與非 GUI 應用程式（cross-platform framework for GUI and non-GUI applications）。作為初學者，本模組用 **Qt Designer** 以視覺化方式設計 GUI。

**安裝步驟：**
1. 到 https://build-system.fman.io/qt-designer-download 下載並安裝 Qt Designer。
2. 開啟 Command Prompt（命令提示字元），輸入：

```bash
pip install pyqt6
```

> **English Standard Definition:** Qt is a cross-platform framework for GUI and non-GUI applications. As a beginner, we use Qt Designer to design GUI in this module.

> ⚠️ **嚴重警告（必背）：** 本模組**只會使用 PyQt6**。任何使用 **PyQt5** 的提交都會被視為 AI 生成作品，並以**作弊（cheating）**處理。考試可能以選擇題考核此規則！

#### 3.9.2 Qt Designer 基本元件 (Basic Widgets 小工具)

建立新介面：**New Form > Main Window**（應用程式的基本視窗）。

| 元件（Widget） | 所在類別（Widget Box） | 用途 |
|---|---|---|
| **Form Layout**（表格佈局） | Layouts | Form layout for widgets——以表格形式排列元件 |
| **Label**（文字標籤） | Display Widgets | Text label——顯示文字 |
| **Line Edit**（文字輸入框） | Input Widgets | Text box for capturing user input——接收使用者輸入 |
| **Push Button**（按鈕） | Buttons | Action button——動作按鈕（按鈕動作稍後學習） |

**操作流程：**
1. 把 Form Layout 拖放到視窗中（drag and drop a form layout into the window）。
2. 把 Label 拖放進 Form Layout——你應該會看到關於元件**放置（placement）**的**引線（guidelines）**。
3. 把 Line Edit 沿著引線拖放進 Form Layout。
4. 把 Push Button 沿著引線拖放進 grid layout。

> **English Standard Definition:** In Qt Designer, widgets are dragged and dropped from the Widget Box into the form; guidelines indicate the placement of widgets. Key widgets include Form Layout (Layouts), Label (Display Widgets), Line Edit (Input Widgets) and Push Button (Buttons).

#### 3.9.3 儲存與建立 Qt for Python 程式 (Save and Create Qt for Python)

1. 把 UI 檔（`.ui`）儲存到工作目錄（working directory）。
2. 在 VS Code 確認 UI 檔存在於工作目錄。
3. 開啟 **Terminal > New Terminal**，在工作目錄開啟終端機。
4. 輸入指令：

```bash
pyuic6 -x -o myapp.py myapp.ui
```

| 參數 | 意義 |
|---|---|
| `-x` | Generate code for display——生成可顯示（可獨立執行）的程式碼 |
| `-o file` | Specify output file for Python——指定 Python 輸出檔案 |

5. 執行 `myapp.py` 啟動 GUI。
6. 使用 **Close** 按鈕關閉應用程式。

> **English Standard Definition:** `pyuic6 -x -o myapp.py myapp.ui` converts the UI file into Python code: `-x` generates code for display, and `-o file` specifies the output file for Python. Run `myapp.py` to launch the GUI, and use the Close button to close the application.

**考試重點：** 記熟 `pyuic6` 指令的格式與 `-x`、`-o` 的意思——這是典型的指令填空題。

---

## 4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| `input()` | 取得使用者輸入的函數；可傳 prompt 參數；暫停執行等待輸入；回傳 String | "`input()` is a function used to get input from the user; it returns the user input as a String." |
| prompt | 顯示給使用者的提示／問題文字，作為 `input()` 的參數 | "A prompt (question) can be provided as an argument to `input()`." |
| pause execution | 程式暫停執行，等待使用者輸入 | "Once the prompt appears, Python pauses execution and waits for the user to type something." |
| `print()` | 輸出函數；支援多個以逗號分隔的值參數 | "A single `print()` function call allows multiple value arguments separated with commas." |
| `end` | `print()` 的結尾字元參數，預設為 `\n`（換行） | "The default end character of `print()` is `\n` (new line)." |
| `sep` | `print()` 的分隔符參數，預設為一個空格 | "The default separator of `print()` is a space." |
| newline / `\n` | 換行字元 | "`\n` is the new line escape character." |
| separator 分隔 | 多個輸出值之間的間隔符號 | "Values printed by `print()` are separated by a space by default." |
| string concatenation 串聯 | 用 `+` 把兩個字串接合 | "The `+` operator can be used to concatenate two text strings." |
| `str()` | 把數字轉成字串，以便與字串串聯 | "Use `str()` to convert a number to a string before concatenation; Python does not allow direct concatenation of a number with a string." |
| repeated concatenation | 用 `*` 重複字串 N 次 | "The `*` operator can be used to perform repeated concatenations of a string." |
| escape character 跳脫字元 | 以 `\` 開頭表示特殊字元（`\'`、`\"`、`\\`、`\n`、`\t`） | "Escape characters such as `\n` (new line) and `\t` (tab space) are used to represent special characters in strings." |
| single/double/triple quotes | 單／雙／三引號定義字串；三引號可定義多行字串 | "Strings can be defined with single quotes, double quotes, or triple quotes for a multi-line string." |
| `strip()` / `lstrip()` / `rstrip()` | 移除頭尾／左／右空白（含 Tab 與換行） | "`strip()`, `lstrip()` and `rstrip()` remove spaces, including tab spaces and newlines, from both sides, the left, and the right respectively." |
| `lower()` / `upper()` / `title()` | 轉全小寫／全大寫／每個字首大寫 | "`lower()`, `upper()` and `title()` convert the letter case of a string." |
| `len()` | 計算字串字元數（含空格） | "`len()` counts the number of characters in a string." |
| `count()` | 計算子字串出現次數（區分大小寫） | "`count()` counts the number of the given substring (case sensitive)." |
| `find()` / `rfind()` | 由左／右找子字串索引；首個索引為 0；找不到回傳 -1 | "`find()` returns the index of the substring from the left; the first index is 0; it returns -1 if not found." |
| `replace()` | 把匹配的子字串替換為新值（區分大小寫） | "`replace()` replaces matched substrings with a new value." |
| `startswith()` / `endswith()` | 檢查字串是否以某子字串開頭／結尾（區分大小寫），回傳布林值 | "`startswith()` and `endswith()` check if the string starts/ends with the substring (case sensitive) and return `True` or `False`." |
| case sensitive 區分大小寫 | 大寫與小寫視為不同字元 | "The comparison is case sensitive, so `"ipad"` does not match `"iPad"`." |
| `isalpha()` | 檢查是否全為英文字母，回傳布林值 | "`isalpha()` checks if all characters are in the alphabet (a-Z)." |
| `isdecimal()` | 檢查是否全為十進制數字 | "`isdecimal()` checks if all characters are decimal." |
| `isalnum()` | 檢查是否全為字母或數字 | "`isalnum()` checks if all characters are alphanumeric." |
| `int()` / `float()` | 把字串轉成整數／浮點數 | "`int()` and `float()` convert a string into an integer and a floating-point number." |
| GUI (Graphical User Interface) | 圖形使用者介面，支援滑鼠／觸控輸入與圖形輸出 | "A GUI further supports the use of the mouse pointer or touchscreen for user input." |
| Qt Designer | 圖形化 GUI 設計工具 | "We use Qt Designer to design the GUI in this module." |
| widget 小工具 | 介面元件，如 Label、Line Edit、Push Button | "Drag and drop a widget into the form layout following the guidelines." |
| Form Layout 表格佈局 | 以表格排列元件的佈局 | "Form Layout is a form layout for widgets." |
| Label | 文字標籤（Display Widgets 類別） | "A Label is a text label used for displaying text." |
| Line Edit | 文字輸入框（Input Widgets 類別） | "A Line Edit is a text box for capturing user input." |
| Push Button | 動作按鈕（Buttons 類別） | "A Push Button is an action button." |
| guidelines 引線 | 設計介面時顯示的元件放置輔助線 | "You should see some guidelines regarding the placement of widgets." |
| `pyuic6` | 把 `.ui` 檔轉換成 Python 程式的工具 | "`pyuic6 -x -o myapp.py myapp.ui` generates Python code for display (`-x`) and specifies the output file (`-o`)." |
| PyQt6 | 本模組唯一准許使用的 Qt Python 套件 | "Only PyQt6 will be used in this module; submissions using PyQt5 are treated as cheating." |
| cross-platform 跨平台 | 可於多個平台執行的框架特性 | "Qt is a cross-platform framework for GUI and non-GUI applications." |

---

## 5. 🗺️ 循序漸進學習路線 (Learning Path)

**Step 1 — 先理解什麼觀念（Understand）：**
1. 先搞懂「互動」：文字介面（打字輸入、文字輸出）vs GUI（滑鼠／觸控輸入、圖形輸出）。
2. 理解 `input()` 的執行流程：顯示 prompt → **暫停** → 等 ENTER → **回傳 String**。
3. 理解 `print()` 的 `sep`（值與值之間）與 `end`（一行之後）的分工。
4. 理解 `+` 串聯（由左至右）、`*` 重複、`str()` 轉換——**數字不可直接串聯字串**。
5. 理解引號問題：字串內含引號 → 換引號種類或加 `\` 跳脫。
6. 理解每個 string method 的「輸入（arguments）→ 處理 → 輸出（return value）」。
7. 理解 Qt Designer：拖放元件 → 儲存 `.ui` → `pyuic6` 轉碼 → 執行。

**Step 2 — 背誦什麼英文短語（Memorize）：**
1. "`input()` returns the user input as a **String**."（永遠回傳字串）
2. "The default **end** character is `\n` (new line); the default **separator** is a space."
3. "`str()` converts a number to a string before concatenation."
4. "`strip()` removes spaces **including tab spaces and newlines**."
5. "**case sensitive** — the first index is **0**; return **-1** if not found."
6. "Only **PyQt6** will be used; PyQt5 submissions are treated as **cheating**."
7. "`pyuic6 -x -o` output_file input_file"（-x 顯示、-o 輸出檔）。

**Step 3 — 掌握什麼計算／寫法（Practice）：**
1. 能默寫：`answer = input("Prompt: ")`；`print("A", "B", sep="_", end="!")`。
2. 能手算 index：寫出 `"An iPhone and an iPad and a MacBook"` 每個字元的 index（0–34），驗證 `find("an")=10`、`rfind("an")=22`、`count("an")=3`、`len()=35`。
3. 能手推輸出：含 `\'`、`\\`、`\n`、`\t` 的 `print()` 語句逐字元解碼。
4. 能分辨：`"10".isalpha()` vs `"10".isdecimal()` vs `"10.1".isalnum()` 的 True/False。
5. 能寫出 PyQt6 安裝指令與 `pyuic6` 轉換指令。

**Step 4 — 能解答什麼英文考題（Exam-ready）：**
1. "What is the output of `print("Peter", end=" "); print("Chan")`?" → `Peter Chan`
2. "What is the output of `print("Peter", "Chan", sep="")`?" → `PeterChan`
3. "What is the output of `print("Chan\\nPeter")`?" → 兩行（Chan 換行 Peter）
4. "What is the result of `"An iPhone and an iPad and a MacBook".count("an")`?" → `3`
5. "Why does `"Boeing" + 777` cause an error?" → 因為 Python 不允許數字與字串直接串聯，需 `str(777)`。
6. "What does `-x` mean in `pyuic6 -x -o myapp.py myapp.ui`?" → Generate code for display.
7. "Is `endswith("ipad")` True or False for `"An iPhone and an iPad"`? Why?" → False，因為 case sensitive。

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 🔢 關鍵數字速記
| 項目 | 數字 |
|---|---|
| `print()` 預設 `sep` | 1 個空格（space） |
| `print()` 預設 `end` | `\n`（換行） |
| 字串第一個字元 index | `0` |
| 找不到子字串時 `find()`/`rfind()` 回傳 | `-1` |
| `len("An iPhone and an iPad and a MacBook")` | `35` |
| `"An iPhone and an iPad and a MacBook".count("an")` | `3` |
| `find("an")` / `rfind("an")` | `10` / `22` |
| `"^" * 10` | `"^^^^^^^^^^"`（10 個 ^） |

### 🧮 語法對照表（Syntax Quick Reference）
```python
answer = input("Prompt: ")          # 回傳 String
print("A", "B")                     # A B（sep 預設空格）
print("A", "B", sep="_")            # A_B
print("A", end=" ")                 # 結尾不換行，改為空格
s = "Peter" + "Chan"                # "PeterChan"（+ 串聯）
s = "Chan " + "Siu " + "Ming"       # "Chan Siu Ming"（由左至右）
m = "Boeing" + str(777)             # "Boeing777"（數字要 str()）
h = "^" * 10                        # "^^^^^^^^^^"（* 重複）
e = 'Peter\'s birthday'             # 跳脫字元解決引號問題
x = int("10"); y = float("10.1")    # 10, 10.1（字串轉數字）
```

### 📖 字串方法速記表
| 方法 | 作用 | 大小寫敏感？ | 回傳 |
|---|---|---|---|
| `strip()` / `lstrip()` / `rstrip()` | 移除頭尾／左／右空白 | — | 新字串 |
| `lower()` / `upper()` / `title()` | 全小寫／全大寫／字首大寫 | — | 新字串 |
| `len(s)` | 字元數 | — | int |
| `s.count(x)` | 子字串出現次數 | ✅ | int |
| `s.find(x)` / `s.rfind(x)` | 左／右找索引（無則 -1） | ✅ | int |
| `s.replace(a, b)` | 替換子字串 | ✅ | 新字串 |
| `s.startswith(x)` / `s.endswith(x)` | 前／後綴檢查 | ✅ | bool |
| `s.isalpha()` / `isdecimal()` / `isalnum()` | 字母／數字／字母數字檢查 | — | bool |
| `int(s)` / `float(s)` | 字串轉整數／浮點數 | — | number |

### 🧠 英文極速記憶口訣
1. **「input 永遠 String」** — "`input()` returns the user input as a **String**."
2. **「sep 空格、end 換行」** — "Default **separator** is a space; default **end** is `\n`."
3. **「數字串字串，先過 str() 橋」** — "Convert the number with `str()` before concatenation."
4. **「is 開頭 check、回傳 True/False」** — "Methods starting with `is` check characteristics and return a boolean."
5. **「find 由 0 數起，搵唔到就 -1」** — "The first index is 0; return **-1** if not found."
6. **「大小寫敏感三兄弟：count、find、startswith/endswith」** — case sensitive: `count`, `find`/`rfind`, `replace`, `startswith`/`endswith`.
7. **「PyQt6 先得，PyQt5 當作弊」** — "Only **PyQt6** will be used; PyQt5 = cheating."
8. **「pyuic6 -x -o：x 顯示、o 輸出」** — "`-x` generate code for display; `-o` specify output file."

### ⚠️ 最高危失分位（Exam Traps）
- `input()` 回傳的**永遠是字串**——計數前要 `int()`／`float()` 轉換。
- `print("Peter", "Chan")` 是 **Peter Chan**（同一行、一個空格）；`print("Peter"); print("Chan")` 是兩行。
- `endswith("ipad")` vs 字串結尾 `"iPad"` → **False**（大小寫敏感）。
- `"10.1".isdecimal()` 與 `"10.1".isalnum()` 都是 **False**（小數點不合格）。
- 引號內再有引號要換引號種類或加 `\`，否則 Syntax Error。
- 提交作業**絕不可用 PyQt5**，會被當作弊處理。
