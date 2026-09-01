# ITP3915 Programming Fundamentals — Lecture 6-7: Tuple and List 雙語應考學習指南

> 課程：ITP3915 Programming Fundamentals
> 講次：Lecture 6-7 — Tuples and Lists（複合資料型別：Tuple 與 List）
> 格式：雙語並行（Bilingual & Exam-Ready）、應考導向
> 來源教材：`01_Raw_Materials/Lectures/lec06-07-tuple-list.pptx`

---

## 1. 📝 課程概要與實務情境 (Summary & Real-world Context)

本講（Lecture 6-7）正式引入 Python 的**複合資料型別（compound data types）**，重點係 `tuple` 與 `list`。之前你學寫程式，每儲一個值就要開一個變數；但當程式喺執行期間（run-time）需要儲存**大量數值**時，變數開得太多會令程式變得累贅（bulky）而且存取低效。複合資料型別嘅核心價值，就係將多個值（items）組織入**單一個集合（single collection）**入面，再用**索引（indexing）**直接存取某一項、用**迴圈（loop）**逐項讀取或寫入，仲有大量**內建方法（built-in methods）**幫你快速處理資料。呢一堂教嘅 tuple / list 處理技巧，同你喺資料庫課程學過嘅「建立與索引、讀取與搜尋、增刪改（manipulation）」概念一脈相承。

實務上寫 Code 嘅場景隨處可見：例如你寫一個「學生名單管理程式」，用 `list` 儲存 `["Peter", "Susan", "Mary"]`，之後用 `append()` 加入新同學、用 `remove()` 刪走退學嘅人、用 `sort()` 按字母排位 —— 全部一行搞掂，唔使開幾十個變數；又例如你寫「成績系統」，要確保學生成績資料**建立後唔可以改**，就會用 `tuple` 儲存原始成績，因為 tuple 係 immutable（不可變），改動會即時報錯，保障資料完整性。再例如你要將「姓名＋科目代號」組合成 dictionary 嘅 key（例如 `("Kelvin", "ITP3915"): "B"`），就一定要用 tuple 而唔可以用 list —— 呢啲就係本講最實用、亦最常考嘅知識點。

---

## 2. 🎯 考試學習目標 (Learning Objectives)

考官會直接按教材的 Lesson Intended Learning Outcomes 出題，並延伸測試你對索引、切片、可變性與各方法行為的理解：

- 理解複合資料型別嘅用途 — **Understand the use of compound data type.**
- 應用資料處理技巧處理 Python 的 tuple 與 list — **Apply data processing techniques for Python tuples and list.**
- 建立 list / tuple（空集合、帶值、帶預設值）並進行型別轉換 — **Create tuples and lists using literals, constructors, repetition (`*`) and type conversion (`list()`, `tuple()`).**
- 用索引與切片讀取項目（正數索引、負數索引、開放端切片）— **Read single items and ranges of items by index, including negative and open-ended indices.**
- 用 `len()`、`index()`、`count()`、`in` / `not in` 搜尋同統計項目 — **Locate, count and check the existence of items in tuples and lists.**
- 用 `append()`、`insert()`、`remove()`、`pop()`、`clear()` 及索引賦值修改 list — **Manipulate (insert, delete and update) list items using built-in methods and index assignment.**
- 解釋 tuple 嘅 immutable（不可變）本質及與 list / string 嘅對比 — **Explain why tuples are immutable and compare mutability among lists, tuples and strings.**
- 運用 `sum()`、`sort()`、`+`、`*`、`join()`、`split()` 處理 tuple / list — **Apply other operations: summation, sorting, concatenation, joining and splitting.**
- 判斷 tuple 與 list 嘅取捨及 tuple 可作 dictionary key 的原因 — **Justify when to use a tuple vs a list, and explain why tuples are hashable and usable as dictionary keys while lists are not.**

---

## 3. 📖 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 點解需要複合資料型別 (Why Compound Data Types)

當程式喺執行期間要儲存好多數值時，如果每個值都用一個獨立變數，變數數量太多會令程式**累贅且低效**（bulky and inefficient），尤其喺存取（accessing）數值嘅時候。與其將每個值分別存入唔同變數，不如用**複合資料型別（compound data types）**將多個值（items）組織喺**單一個集合（a single collection）**入面 —— 呢個就係本講嘅出發點。

> **English Standard Definition:**
> When a program needs to store many values during run-time, having too many variables can make your program **bulky and inefficient** when accessing values. Instead of saving each value in a separate variable, **compound data types** help organise multiple values (items) within a **single collection**.

### 3.2 使用複合資料型別的四大優點 (Advantages of Using Compound Data Types)

教材列出使用 compound data types 嘅四大好處，全部都可能成為「點解要用 list / tuple」答題重點：

1. **資料組織**：將相關項目歸組，改善資料組織 — **Group related items to improve data organisation.**
2. **彈性**：巢狀結構（nested structures，即集合入面再放集合）提供靈活性 — **Nested structures offer flexibility.**
3. **可達度**：提升數值嘅可達程度 — **Enhance accessibility of values.**
4. **索引**：索引允許直接存取元素 — **Indexing allows direct access to elements.**

另外仲有兩個配套能力：**用迴圈（loops）**逐項讀取或設定每個項目，以及**內建方法（built-in methods）**簡化資料處理 — **Use loops to get or set each item; built-in methods simplify data processing.**

> **English Standard Definition:**
> Compound data types group related items to improve data organisation, offer flexibility through nested structures, enhance accessibility of values, and allow direct access to elements via indexing. Loops get or set each item, and built-in methods simplify data processing.

### 3.3 Python 常見的內建複合資料型別 (Common Built-in Compound Data Types)

教材將 Python 內建複合型別分類如下：

| 類別 | 型別 |
|---|---|
| 文字 Text | `str` (string) |
| 序列 Sequence | `list`、`tuple`、`range` |
| 對映 Mapping | `dict` |
| 集合 Set | `set` |

本講集中討論 **Tuples** 與 **Lists**，處理技巧同你喺資料庫課程學過嘅類似，涵蓋四大範疇：**建立與索引（creation and indexing）**、**讀取與搜尋項目（reading and searching items）**、**操作（manipulation：insert、delete、update）**——注意 tuple items 唔可以修改 — 以及**其他操作（other operations）**。

> **English Standard Definition:**
> Common built-in compound data types include `str` (text), `list`, `tuple`, `range` (sequence), `dict` (mapping) and `set` (set). This topic discusses **tuples** and **lists**, covering creation and indexing, reading and searching items, manipulation of list items (tuple items cannot be modified), and other operations.

### 3.4 Sequence（序列）與建立 list / tuple 的語法 (Sequence Types & Creation Syntax)

**序列（Sequence）**係一種有序嘅集合：**插入次序會被保留（insertion order is maintained）**，即你放入去嘅先後次序就係佢哋嘅排列次序。由於 tuple、list 甚至 string 都係 sequence，所以**部分操作方法係共通嘅**（例如索引、切片、`len()`、`in`）。

建立 list / tuple 嘅語法：

- **List**：`[item1, item2, …, itemN]`
- **Tuple**：`(item1, item2, …, itemN)` **或者**直接 `item1, item2, …, itemN`（可以省略括號）

其中每個 `itemX` 可以係一個 literal（字面值），亦可以係**另一個複合型別嘅值**（即巢狀結構）。

```python
# List 用方括號 []
listA = [1, 2, 3]

# Tuple 用圓括號 ()，或者直接唔用括號
tupleA = (1, 2, 3)
tupleB = 1, 2, 3        # 省略括號都係 tuple

# item 可以係另一種複合型別值（巢狀結構）
nested = [("Peter", 80), ("Susan", 90)]   # list 入面放 tuple
```

> **English Standard Definition:**
> A **sequence** is ordered, i.e. **insertion order is maintained**. Some operation methods are common for tuples, lists and even for strings. A list is created with `[item1, item2, …, itemN]`; a tuple is created with `(item1, item2, …, itemN)` or simply `item1, item2, …, itemN`, where each `itemX` can be a literal or another compound type value.

⚠️ 應考重點：**括號唔係 tuple 嘅本質**——逗號先係關鍵。`(1)` 只係數字 1，`(1,)` 先係一個元素嘅 tuple。省略括號嘅寫法 `tupleB = 1, 2, 3` 好常見，考試要識。

### 3.5 Tuple vs List 核心比較表 (Tuples and Lists)

教材用一張四欄比較表總結 tuple 同 list 嘅本質分別，呢張表係本講**最高頻考點**：

| 特性 | Tuple | List |
|---|---|---|
| Ordering 順序 | Ordered（有序）| Ordered（有序）|
| Uniqueness 不重複 | Allow Duplicates（容許重複）| Allow Duplicates（容許重複）|
| Indexing 索引 | By Numeric index（用數字索引）| By Numeric index（用數字索引）|
| Mutability 可變 | **Immutable 不可變**（items cannot be updated）| **Mutable 可變**（items can be updated）|

> **English Standard Definition:**
> Both tuples and lists are **ordered**, allow **duplicates**, and can be indexed by **numeric index**. Tuples are **immutable** (items cannot be updated), whereas lists are **mutable** (items can be updated).

⚠️ 應考重點：兩者唯一本質分別就係 **mutability（可變性）**。其餘三項（有序、容許重複、數字索引）完全一樣。

### 3.6 建立空 tuple / list (Create Empty Tuples/Lists)

可以呼叫建構子（constructor）`list()` / `tuple()`，亦可以用空字面值 `[]` / `()`：

```python
listFriends = list()      # 或者 listFriends = []
tupleFriends = tuple()    # 或者 tupleFriends = ()
```

> **English Standard Definition:**
> An empty list is created with `list()` or `[]`; an empty tuple is created with `tuple()` or `()`.

### 3.7 建立帶值嘅 tuple / list 與型別轉換 (Create Tuples/Lists with Values & Conversion)

```python
listFriends = ["Peter", "Susan", "Mary"]
tupleFriends = ("Peter", "Susan", "Mary")
```

仲可以**基於現有 sequence 建立新嘅 list / tuple**（型別轉換 conversion）：

```python
listFriends2 = list(tupleFriends)     # tuple → list
tupleFriends2 = tuple(listFriends)    # list → tuple
```

> **English Standard Definition:**
> A list or tuple can be created with values using square or round brackets, and a new list/tuple can be created based on an existing sequence using `list()` and `tuple()` conversion.

### 3.8 索引 (Indexing) — 由 0 開始

tuple / list 嘅項目按**佢哋喺 sequence 入面嘅位置號碼（position number）**索引，**由 0 開始**。每次操作項目之後，索引會**重新對齊（indexes are reset after each item manipulation）**——即係話刪除或插入項目後，後面所有項目嘅索引會自動更新。

```python
listFriends = ["Peter", "Susan", "Mary"]
# 索引 (index):    0        1        2
# 值 (value):   "Peter"  "Susan"  "Mary"

print(listFriends[0])    # Output: Peter
print(listFriends[2])    # Output: Mary
```

> **English Standard Definition:**
> Tuple/list items are indexed by their **position number** in the sequence, **starting from 0**. Indexes are reset (re-aligned) after each item manipulation.

### 3.9 計算項目總數：`len()`

`len()` 函數傳回 tuple / list 嘅項目總數：

```python
listFriends = ["Peter", "Susan", "Mary"]
print(len(listFriends))    # Output: 3
```

> **English Standard Definition:**
> `len()` counts the **total number of items** in a tuple or list.

⚠️ 應考重點：`len()` 傳回**項目數量**，而最後一個項目嘅索引係 `len - 1`（因為索引由 0 開始）。最尾一個索引 = `len(listFriends) - 1`。

### 3.10 建立帶預設值嘅 list：`[0] * 3` 與 `[None] * 3`

可以用 `*` 重複運算子建立「全部係同一個預設值」嘅 list：

```python
listMarks = [0] * 3
print(listMarks)        # Output: [0, 0, 0]

listFriends = [None] * 3
print(listFriends)      # Output: [None, None, None]
```

> **English Standard Definition:**
> `[0] * 3` creates a list of three zeros `[0, 0, 0]`; `[None] * 3` creates a list of three `None` values `[None, None, None]`. The `*` operator repeats the list items.

⚠️ 應考重點：`[0] * 3` 係「重複 3 次」**唔係**「乘 3」。`None` 代表「未有值」，常用嚟預先開定一個固定長度嘅 list 再逐格填入（見 3.16）。

---

### 3.11 讀取單一項目與切片 (Read Items by Index — Single Item & Slicing)

讀取**單一項目**：直接用索引 `listFriends[1]`。
讀取**一段範圍（range）**：用切片語法 `[start : stop]`，注意 **`stop` 唔包含（stop is not included）**。

```python
listFriends = ["Peter", "Susan", "Mary"]

print(listFriends[1])       # Output: Susan          （讀單一項目）
print(listFriends[0:2])     # Output: ['Peter', 'Susan']   （讀 index 0 至 1，2 唔包含）
```

> **English Standard Definition:**
> A single item is read with an index like `listFriends[1]`. A range of items is read with slicing `listFriends[start:stop]`, where **`stop` is not included**.

### 3.12 開放端切片 (Slicing with Open-Ended Indexes)

切片嘅 start 或 stop 可以省略，表示「由頭」或「去到最尾」：

```python
listFriends = ["Peter", "Susan", "Mary"]

print(listFriends[1:])     # Output: ['Susan', 'Mary']   # start from 1 to the end
print(listFriends[:1])     # Output: ['Peter']           # start from 0, stop at 1 (1 not included)
print(listFriends[:])      # Output: ['Peter', 'Susan', 'Mary']   # all items
```

> **English Standard Definition:**
> `listFriends[1:]` starts from index 1 to the end; `listFriends[:1]` starts from 0 and stops at 1 (1 is not included); `listFriends[:]` copies all items.

⚠️ 應考重點：`listFriends[:]` 會**複製成一個新 list**（所有項目），常用嚟做淺拷貝（shallow copy）；唔好同「讀取全部」混淆。

### 3.13 負數索引 (Negative Indexes)

Python 支援**負數索引**：`-1` 代表最後一個項目、`-2` 代表倒數第二個……負數索引 `-N` 等價於 `len - N`。

```python
friends = ["Peter", "Susan", "Mary"]
# 負數索引:   -3       -2       -1
# 正數索引:    0        1        2
# 值:       "Peter"  "Susan"  "Mary"

print(friends[-1])          # Output: Mary     # 即係 3 - 1 = index 2
print(friends[-3:-1])       # Output: ['Peter', 'Susan']   # 即係 3-3 : 3-1 = 0:2
```

喺 `friends[-3:-1]` 入面，`-3` 換算做 `3 - 3 = 0`，`-1` 換算做 `3 - 1 = 2`，所以等價於 `friends[0:2]`（`len(friends) = 3`）。

> **English Standard Definition:**
> Items can be read with **negative indexes**: `friends[-1]` means `3 - 1` (i.e. index 2, the last item) and `friends[-3:-1]` means `3 - 3 : 3 - 1` (i.e. `friends[0:2]`), where `len(friends) = 3`.

⚠️ 應考重點：負數索引 = `len - N`。`-1` 永遠係最後一個項目，呢個係超常見考法。

### 3.14 索引超出範圍：`IndexError` (Index Out of Range)

當你用到一個**無效（invalid）索引**（例如超出 0 至 `len-1` 嘅範圍），Python 會提出 **`IndexError`**：

```python
friends = ["Peter", "Susan", "Mary"]
print(friends[3])    # 只有 index 0, 1, 2 → 會出錯！
```

```
Output / Error:
IndexError: list index out of range
```

> **English Standard Definition:**
> An **`IndexError`** is raised when an **invalid index** is used, e.g. `friends[3]` when the list only has indexes 0, 1 and 2.

⚠️ 應考重點：**Index out of range** 就係 `IndexError`；呢個係錯誤訊息題（error message identification）嘅經典陷阱——「有 3 個項目，用 index 3 就爆」。

### 3.15 Recap：用 `for` 迴圈遍歷 tuple / list (Iterate Using Loops)

之前講過嘅 `for` 迴圈可以用嚟逐項讀取 tuple / list 嘅每個項目。教材用執行追蹤示範迭代變數 `item` 嘅變化：

```python
for item in [12, 33, 45]:
    print(item)
print("Done")
```

執行追蹤（execution trace）：

| 迭代次序 | `item` 值 | 輸出 |
|---|---|---|
| 1 | 12 | `12` |
| 2 | 33 | `33` |
| 3 | 45 | `45` |
| 迴圈結束 | — | `Done` |

```
Output:
12
33
45
Done
```

> **English Standard Definition:**
> A `for` loop iterates through every item of a tuple or list; the iterative variable takes each item in sequence, and statements after the loop run once the iteration is complete.

### 3.16 `enumerate()`：同時取得位置與項目 (Enumerate — Position & Item)

用 `for` 迴圈時，可以將 `enumerate()` 產生嘅 **Python tuple（拆解 unpack）** 成**兩個迭代變數**——`pos`（位置）同 `item`（實際項目）：

```python
seq = ['x', 'y', 'z']

print(list(enumerate(seq)))
# Output: [(0, 'x'), (1, 'y'), (2, 'z')]

for pos, item in enumerate(seq):
    print(f"{pos} is {item}")
```

```
Output:
0 is x
1 is y
2 is z
```

> **English Standard Definition:**
> `enumerate()` returns a sequence of Python tuples; each tuple holds a **position** and the **actual item**. When using a for-loop, we can **unpack** these enumerate items into two iterative variables — `pos` and `item`.

⚠️ 應考重點：`enumerate(seq)` 每個元素係 `(position, item)` 呢種**雙元素 tuple**；`list(enumerate(seq))` 嘅輸出格式 `[(0, 'x'), (1, 'y'), (2, 'z')]` 要識寫。`f"{pos} is {item}"` 係 f-string 格式化輸出。

### 3.17 定位特定項目：`index()` 方法 (Locate a Specific Item)

類似 string 嘅 `find()` 方法，`index()` 方法可以搵出**第一個成功匹配（first matched）項目**喺 tuple / list 入面嘅索引；注意 **大小寫敏感（case sensitive）**：

```python
listFriends = ["Peter", "Susan", "Mary", "Peter"]
print(listFriends.index("Peter"))    # Output: 0    （返回第一個匹配嘅索引）
```

如果指定嘅項目**搵唔到**，會提出 **`ValueError`**：

```python
listFriends = ["Peter", "Susan", "Mary", "Peter"]
listFriends.index("Tim")
```

```
Output / Error:
ValueError: 'Tim' is not in list
```

> **English Standard Definition:**
> Similar to the `find()` method for strings, the **`index()`** method finds the index of the **first matched** item in tuples and lists (case sensitive). A **`ValueError`** is raised when the specified item cannot be found.

⚠️ 應考重點：「搵唔到」→ `ValueError`；「索引超出範圍」→ `IndexError`；兩個錯誤要分清楚。`index("Peter")` 喺 `["Peter", "Susan", "Mary", "Peter"]` 返回 **0**（第一個匹配），唔係 3。

### 3.18 檢查存在與否：`in` / `not in` (Check Existence)

`in` 係**成員運算子（membership operator）**，檢查某個項目**存在**喺 tuple / list 入面；`not in` 檢查某個項目**唔存在**。

```python
listFriends = ["Peter", "Susan", "Mary"]

if "Tim" in listFriends:
    print(listFriends.index("Tim"))
# 因為 "Tim" 唔喺 list 入面，if 條件為 False，乜都唔會印
```

> **English Standard Definition:**
> `in` is a membership operator used to check if a specific item **exists** within a tuple or list; `not in` checks if a particular item does **NOT** exist.

⚠️ 應考重點：實務上會先用 `in` 確認項目存在，先至呼叫 `index()` 或 `remove()`，避免 `ValueError`（見 3.17、3.20）。

### 3.19 統計特定項目數量：`count()` (Count Number of a Specific Item)

類似 string 嘅 `count()` 方法，tuple / list 嘅 `count()` 可以計算**特定項目出現嘅次數**（大小寫敏感）：

```python
listFriends = ["Peter", "Susan", "Mary", "Peter"]
print(listFriends.count("Peter"))    # Output: 2
```

> **English Standard Definition:**
> Similar to the `count()` method for strings, the `count()` method counts the number of a specific item in tuples and lists (case sensitive).

---

### 3.20 List 操作總覽 (Manipulation of List Items)

⚠️ **重大前提**：以下所有「增刪改」操作**只適用於 list** —— **tuple item 係唔可以修改嘅（Tuple item CANNOT be modified）**。

> **English Standard Definition:**
> Manipulation (insert, delete and update) of items applies to **lists only**; tuple items **cannot** be modified.

### 3.21 更新 list 項目：索引賦值與切片賦值 (Update a List Item)

用**索引（indexes）**更新 list 項目；仲可以用**切片賦值（slice assignment）**一次過替換一段範圍：

```python
listFriends = ["Peter", "Susan", "Mary"]

listFriends[0] = "Joe"          # 更新 index 0
print(listFriends)              # Output: ['Joe', 'Susan', 'Mary']

listFriends[1:3] = ["Bob"]      # 用 ["Bob"] 取代 "Susan" 同 "Mary"（位置 1 開始）
print(listFriends)              # Output: ['Joe', 'Bob']
```

第一個例子：`listFriends[0] = "Joe"` 將 `"Peter"` 換成 `"Joe"`。第二個例子：`listFriends[1:3] = ["Bob"]` 意思係**將 index 1 至 2（即 `"Susan"` 同 `"Mary"`）替換成 `"Bob"`**，list 縮短為 `["Joe", "Bob"]`。

> **English Standard Definition:**
> Use index(es) to update a list item, e.g. `listFriends[0] = "Joe"`. Slice assignment `listFriends[1:3] = ["Bob"]` replaces `"Susan"` and `"Mary"` with `"Bob"` at position 1.

⚠️ 應考重點：切片賦值唔需要「數量對數量」——用一個元素 `["Bob"]` 換走兩個位置係合法嘅，list 會自動縮短。

### 3.22 用無效索引更新會出錯 (Update with an Invalid Index)

你**唔可以**用無效索引更新項目（會出 `IndexError`）。可以先用 `in` 運算子或者 `count()` 確保項目存在；或者，**事先建立一個預期大小嘅 list**（用 `[None] * n` 開定位置）再填入：

```python
friends = ["Peter", "Susan", "Mary"]
friends[3] = "Tim"    # 出錯！冇 index 3 → IndexError
```

```python
friends = [None] * 4          # 先開定 4 個位 → [None, None, None, None]
friends[3] = "Tim"            # 而家先可以填 → [None, None, None, "Tim"]
print(friends)                # Output: [None, None, None, 'Tim']
```

> **English Standard Definition:**
> You **CANNOT** update an item with an invalid index. The `in` operator or `count()` can help ensure its existence. Alternatively, create a list with an expected size beforehand, e.g. `friends = [None] * 4`, then assign `friends[3] = "Tim"`.

### 3.23 新增項目：`append()` 與 `insert()` (Add a List Item)

list 嘅**動態大小（dynamic size）**容許隨時加項目：

- **`append(item)`**：將新項目加到 **list 末端（end）**。
- **`insert(index, item)`**：將項目插入**指定位置（specific position）**，`index` 就係新插入項目嘅索引。

```python
listFriends = ["Peter", "Susan", "Mary"]

listFriends.append("Sam")       # 加到末端
print(listFriends)              # Output: ['Peter', 'Susan', 'Mary', 'Sam']

listFriends = ["Peter", "Susan", "Mary"]
listFriends.insert(1, "Chris")  # 插入到 index 1（即 "Susan" 之前）
print(listFriends)              # Output: ['Peter', 'Chris', 'Susan', 'Mary']
```

> **English Standard Definition:**
> The dynamic size of a list allows `append()` to add a new item to the **end of the list**, and `insert(index, item)` to insert an item at a **specific position**, where the first argument is the index of the inserted item.

⚠️ 應考重點：`insert(1, "Chris")` 後 `"Chris"` 佔據 index 1，原本 `"Susan"` 同之後嘅項目全部**向後移一位**（索引重新對齊，呼應 3.8 嘅「indexes are reset」）。

### 3.24 刪除項目：`remove()` (Remove a List Item — First Match)

`remove(item)` 移除**第一個匹配**嘅項目（first matched item）；如果項目搵唔到，會提出 **`ValueError`**：

```python
listFriends = ["Peter", "Susan", "Mary", "Peter"]
listFriends.remove("Peter")     # 移除第一個 "Peter"（index 0）
print(listFriends)              # Output: ['Susan', 'Mary', 'Peter']
```

```python
listFriends = ["Peter", "Susan", "Mary", "Peter"]
listFriends.remove("Tim")       # 搵唔到 → ValueError
```

```
Output / Error:
ValueError: list.remove(x): x not in list
```

> **English Standard Definition:**
> `remove()` removes the **first matched** item from the list. A **`ValueError`** is raised when the specified item cannot be found.

⚠️ 應考重點：`["Peter", "Susan", "Mary", "Peter"]` 用 `remove("Peter")` 只刪**第一個** `"Peter"`，後面嗰個 `"Peter"` 保留 —— 呢個係超經典考法。

### 3.25 刪除並取得項目：`pop()` (Remove and Get a List Item)

`pop(index)` **移除指定位置嘅項目**，並**將嗰個項目當作回傳值（return value）**俾你：

```python
listFriends = ["Peter", "Susan", "Mary", "Peter"]
foundItem = listFriends.pop(1)   # 移除 index 1 ("Susan") 並回傳
print(foundItem)                 # Output: Susan
print(listFriends)               # Output: ['Peter', 'Mary', 'Peter']
```

> **English Standard Definition:**
> `pop(index)` **removes and gets** the item at a specific position; the removed item is returned as the result, and the list shrinks accordingly.

⚠️ 應考重點：`pop()` 同 `remove()` 最大分別——`pop()` 按**索引（position）**刪兼**有回傳值**；`remove()` 按**值（first match）**刪、冇回傳值。考試會問「邊個方法刪完仲可以攞到嗰個值」→ 答 `pop()`。

### 3.26 清空所有項目：`clear()` (Remove All List Items)

`clear()` 移除 list **全部項目**，list 變成空 `[]`：

```python
listFriends = ["Peter", "Susan", "Mary", "Peter"]
listFriends.clear()              # → [ ]
print(listFriends)               # Output: []
```

> **English Standard Definition:**
> `clear()` removes **all items** from the list, leaving an empty list `[]`.

---

### 3.27 數字總和：`sum()` (Total of Numeric Values)

`sum()` 計算 tuple / list 內**所有數值項目**嘅總和：

```python
listPrices = [111, 222, 333]
print(sum(listPrices))    # Output: 666
```

> **English Standard Definition:**
> `sum()` returns the **total of numeric values** in a tuple or list, e.g. `sum([111, 222, 333])` returns `666`.

### 3.28 排序：`sort()`（唔適用於 tuple）(Sorting List Items — Not for Tuple)

`sort()` 將 list 項目**原位排序（in-place）**；預設係**遞升（ascending）**，加 `reverse=True` 就係**遞降（descending）**。**注意：tuple 冇 `sort()`**（因為排序會改動集合，tuple 唔可以改）：

```python
listFriends = ["Peter", "Susan", "Mary", "Peter"]

listFriends.sort()                      # ascending 遞升
print(listFriends)                      # Output: ['Mary', 'Peter', 'Peter', 'Susan']

listFriends.sort(reverse=True)          # descending 遞降
print(listFriends)                      # Output: ['Susan', 'Peter', 'Peter', 'Mary']
```

> **English Standard Definition:**
> `list.sort()` sorts the list items in place — **ascending** by default, and **descending** with `reverse=True`. Sorting is **not available for tuples** because it would modify the collection.

⚠️ 應考重點：字串排序跟**字母順序（ASCII/lexicographic）**：`"Mary"` < `"Peter"` < `"Susan"`。`reverse=True` 係 keyword argument（關鍵字參數）。

### 3.29 連接與重複：`+` 與 `*` 運算子 (Concatenate Tuples and Lists)

同 string 嘅 `+` 同 `*` 運算子相似，`+` 可以**連接（concatenate）**兩個 tuple 或兩個 list 形成一個新集合；`*` 可以重複集合：

```python
tupleA = 1, 2, 3
tupleB = 7, 8, 9
mergedTuple = tupleA + tupleB          # → (1, 2, 3, 7, 8, 9)
print(mergedTuple)                     # Output: (1, 2, 3, 7, 8, 9)

listMarks = [0] * 4                    # → [0, 0, 0, 0]
print(listMarks)                       # Output: [0, 0, 0, 0]
```

> **English Standard Definition:**
> Similar to how the `+` and `*` operators work with strings, these operators can also **concatenate** tuples or lists and form a **new** tuple/list: `tupleA + tupleB` gives `(1, 2, 3, 7, 8, 9)` and `[0] * 4` gives `[0, 0, 0, 0]`.

⚠️ 應考重點：`+` 連接會**產生新集合**，唔會改動原本嗰兩個（tuple 本來就唔可以改，list 嘅 `+` 都係新建一個）。另外注意 `tupleA = 1, 2, 3` 冇括號都係 tuple（呼應 3.4）。

### 3.30 將項目串成字串：`join()` (Join Items into a String)

如果目的只係**印出** tuple / list 嘅內容，**唔一定要用迴圈**。`join()` 方法可以用**共同分隔符（common separator）**將 tuple / list 嘅項目**連接成一個字串**：

```python
listFriends = ["Peter", "Susan", "Mary", "Peter"]
strFriends = " and ".join(listFriends)   # " and " 就係分隔符 separator
print(strFriends)
```

```
Output:
Peter and Susan and Mary and Peter
```

> **English Standard Definition:**
> If the purpose is just printing the content of a tuple/list, using a loop is not a must. The **`join()`** method concatenates tuple/list items with a common separator, e.g. `" and ".join(listFriends)` gives `"Peter and Susan and Mary and Peter"`.

⚠️ 應考重點：`join()` 嘅語法係**「分隔符」喺前面**——`" and ".join(listFriends)`，唔好寫反做 `listFriends.join(" and ")`（list 冇 `join()` 方法，會出 `AttributeError`）。分隔符會插入喺**每兩個項目之間**。

### 3.31 將字串拆成 list：`split()` (Split a String into a List)

`split()` 將一個字串**拆成多個部分**並**形成一個 string 嘅 list**。可以指定分隔符；**預設用任何空白（whitespace）做分隔符**：

```python
line1 = "A lot               of spaces"
print(line1.split())               # Output: ['A', 'lot', 'of', 'spaces']

line2 = "first; second; third"
print(line2.split("; "))           # Output: ['first', 'second', 'third']
```

> **English Standard Definition:**
> The `split()` method **breaks a string into parts** and **forms a list of strings**. A separator can be specified; **by default, any whitespace is used as the separator**, e.g. `line2.split("; ")` gives `["first", "second", "third"]`.

⚠️ 應考重點：`split()` 同 `join()` 係**相反操作**：`join()` 將 list → string（加分隔符），`split()` 將 string → list（拆開）。預設 `split()` 會將**連續多個空格**當成一個分隔符（所以 `"A lot               of spaces"` 拆出嚟冇空字串）。

---

### 3.32 Mutable vs Immutable 實證對比 (Mutable vs Immutable)

教材用三個例子實證三種型別嘅可變性，呢個對比表係**必背考點**：

| 型別 | 可變性 | 範例程式 | 輸出／錯誤訊息 |
|---|---|---|---|
| List | **Mutable** 可變 | `x = [9, 8, 7]`<br>`x[2] = 6`<br>`print(x)` | `[9, 8, 6]`（成功修改）|
| Tuple | **Immutable** 不可變 | `y = (5, 4, 3)`<br>`y[2] = 0`<br>`print(y)` | `Traceback: 'tuple' object does not support item assignment` |
| String | **Immutable** 不可變 | `z = "ABC"`<br>`z[2] = "D"`<br>`print(z)` | `Traceback: 'str' object does not support item assignment` |

```python
# List：Mutable —— 可以改
x = [9, 8, 7]
x[2] = 6
print(x)    # Output: [9, 8, 6]        # 會成功！

# Tuple：Immutable —— 唔可以改
y = (5, 4, 3)
y[2] = 0    # Error: 'tuple' object does not support item assignment

# String：Immutable —— 唔可以改
z = "ABC"
z[2] = "D"  # Error: 'str' object does not support item assignment
```

> **English Standard Definition:**
> A **list is mutable**: `x = [9, 8, 7]; x[2] = 6` successfully changes the list to `[9, 8, 6]`. A **tuple is immutable**: `y = (5, 4, 3); y[2] = 0` raises `'tuple' object does not support item assignment`. A **string is immutable**: `z = "ABC"; z[2] = "D"` raises `'str' object does not support item assignment`.

⚠️ 應考重點：**三個錯誤訊息**——`'tuple' object does not support item assignment` 同 `'str' object does not support item assignment`——要識照抄。list 先至可以 `x[2] = 6`。

### 3.33 Immutable 嘅迷思：重新賦值 ≠ 修改 (Reassignment vs In-place Modification)

教材問咗一個經典問題：tuple 唔可以改，咁以下程式會唔會成功？

```python
tupleFriends = ("Peter", "Susan", "Mary")
tupleFriends = ("Peter", "Susan", "Mary", "Peter")   # 會成功嗎？
```

**答案：會成功。** 因為呢句**唔係修改**原本嗰個 tuple，而係將變數名 `tupleFriends` **重新綁定（rebind）**到一個**全新嘅 tuple**。原本嗰個 `("Peter", "Susan", "Mary")` 依然存在、冇被改動，只係個變數名而家指向新嘅 tuple。Immutable 嘅意思係「**tuple 入面嘅項目唔可以原地改動**」，而唔係「變數名唔可以指向新 tuple」。

> **English Standard Definition:**
> "Immutable" means the tuple's items **cannot be updated in place**. Reassigning a variable to a new tuple, e.g. `tupleFriends = ("Peter", "Susan", "Mary", "Peter")`, **succeeds** because it creates a new tuple and rebinds the name; the original tuple is unchanged.

⚠️ 應考重點：呢條係「概念理解題」——考官問 `tupleFriends = ("Peter", "Susan", "Mary", "Peter")` 會唔會報錯，答案係**成功**，理由係**重新賦值（rebinding）**而唔係修改原 tuple。對比 3.32 嘅 `y[2] = 0`（**索引賦值 = 原地修改**）先會報錯。

### 3.34 Tuple vs List 取捨 (Tuples vs List — Trade-offs)

教材總結兩者取捨，係「寫 essay 題／解釋題」嘅答題素材：

- **兩者共通**：有序（ordered）、容許重複（allow duplicates）、可以用數字索引（indexed using numeric indices）。
- **Tuple 優勢**：一般更**節省記憶體（memory-efficient）**、因為結構較簡單所以**效能更好（perform better）**。
- **List 優勢**：提供**更多內建函數（more built-in functions）**，例如 `insert`、`remove`、`sort` 等增刪排序能力。

> **English Standard Definition:**
> Tuples are generally more **memory-efficient** and perform better than lists due to their simpler structure. In contrast, lists offer **more built-in functions** than tuples, such as the ability to insert, remove and sort elements.

### 3.35 Tuple 用作 dictionary key（hashable）(Tuple as Dictionary Key)

使用準則：當資料**建立後唔應該被改變**時，用 tuple 而唔用 list。Tuple 嘅典型用途係做**「冇 key 嘅 dictionary」**（the equivalent of a dictionary without keys）嚟儲存資料。

更重要嘅考點：**tuple 可以用嚟做 dictionary 嘅 key**，因為 tuple 係 **hashable（可雜湊）** 同 immutable；**list 唔可以做 key**，因為 list 係 mutable 而且**冇辦法處理 `__hash__()`**：

```python
studentModuleGrade = {("Kelvin", "ITP3915"): "B"}    # Valid 有效
# studentModuleGrade = {["Kelvin", "ITP3915"]: "B"}  # Invalid 無效！
```

> **English Standard Definition:**
> Use a tuple instead of a list when the data should **not be changed** once created. A tuple can be used as a key in a dictionary because of its **hashable** and immutable nature, whereas a list **cannot** be used as a key because a list is mutable and cannot handle `__hash__()`.

⚠️ 應考重點：`{("Kelvin", "ITP3915"): "B"}` 有效（tuple key）；`{["Kelvin", "ITP3915"]: "B"}` 會出 `TypeError: unhashable type: 'list'`。關鍵字：**hashable**、**immutable**、**`__hash__()`**。

---

## 4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| `compound data type` | 複合資料型別；將多個值組織入單一集合 | "Compound data types help organise multiple values (items) within a single collection." |
| `sequence` | 序列；有序、插入次序被保留嘅集合 | "A sequence is ordered, i.e. insertion order is maintained." |
| `list` | 用方括號 `[]` 建立嘅可變序列 | "A list is created with `[item1, item2, …]`; lists are **mutable** (items can be updated)." |
| `tuple` | 用圓括號 `()` 或省略括號建立嘅不可變序列 | "A tuple is created with `(item1, item2, …)` or `item1, item2, …`; tuples are **immutable** (items cannot be updated)." |
| `ordered` | 有序；插入次序被保留 | "Tuples and lists are **ordered**, i.e. insertion order is maintained." |
| `allow duplicates` | 容許重複項目 | "Both tuples and lists allow duplicates." |
| `indexing` | 索引；按位置號碼存取，由 0 開始 | "Items are indexed by their position number in the sequence, starting from 0." |
| `mutable` | 可變；項目可以被更新 | "A list is mutable — its items can be updated, e.g. `x[2] = 6`." |
| `immutable` | 不可變；項目唔可以原地更新 | "A tuple is immutable — items cannot be updated; `y[2] = 0` raises 'tuple' object does not support item assignment." |
| `len()` | 計算項目總數 | "`len()` counts the total number of items in a tuple or list." |
| `slicing` | 切片；讀取一段範圍 `[start:stop]`，stop 唔包含 | "A range of items is read with `listFriends[start:stop]`, where stop is not included." |
| `negative index` | 負數索引；`-1` 係最後一個項目 | "`friends[-1]` means `3 - 1`, i.e. the last item; `friends[-3:-1]` means `friends[0:2]`." |
| `IndexError` | 索引超出範圍時提出嘅錯誤 | "An **`IndexError`** is raised when an invalid index is used, e.g. `friends[3]` on a 3-item list." |
| `enumerate()` | 同時取得位置與項目嘅內建函數 | "`enumerate()` unpacks into two iterative variables — position and the actual item; `list(enumerate(seq))` gives `[(0, 'x'), (1, 'y'), (2, 'z')]`." |
| `index()` | 搵第一個匹配項目嘅索引 | "`index()` finds the index of the **first matched** item (case sensitive); a `ValueError` is raised if it cannot be found." |
| `ValueError` | 指定項目搵唔到時提出嘅錯誤 | "A **`ValueError`** is raised when the specified item cannot be found, e.g. `listFriends.index("Tim")`." |
| `in` / `not in` | 成員運算子；檢查項目存在與否 | "`in` checks if a specific item exists within a tuple or list; `not in` checks if it does **NOT** exist." |
| `count()` | 計算特定項目出現次數（大小寫敏感）| "`count()` counts the number of a specific item in tuples and lists (case sensitive)." |
| `append()` | 將新項目加到 list 末端 | "`append()` adds a new item to the **end** of the list, e.g. `listFriends.append("Sam")`." |
| `insert()` | 將項目插入指定位置 | "`insert(index, item)` inserts an item at a specific position, e.g. `listFriends.insert(1, "Chris")`." |
| `remove()` | 移除第一個匹配嘅項目 | "`remove()` removes the **first matched** item; a `ValueError` is raised when the item cannot be found." |
| `pop()` | 移除並取得指定位置嘅項目 | "`pop(index)` removes and gets the item at a specific position; the removed item is returned." |
| `clear()` | 清空 list 所有項目 | "`clear()` removes all items from the list, leaving `[]`." |
| `sum()` | 計算所有數值項目嘅總和 | "`sum()` returns the total of numeric values, e.g. `sum([111, 222, 333])` is `666`." |
| `sort()` | 原位排序（唔適用於 tuple）| "`sort()` sorts list items in place — ascending by default, descending with `reverse=True`; sorting is not available for tuples." |
| `+` / `*` operators | 連接／重複 tuple 或 list，產生新集合 | "The `+` and `*` operators concatenate or repeat tuples/lists and form a **new** tuple/list, e.g. `tupleA + tupleB` → `(1, 2, 3, 7, 8, 9)`." |
| `join()` | 用分隔符將項目串成字串 | "`join()` concatenates tuple/list items with a common separator, e.g. `" and ".join(listFriends)`." |
| `split()` | 將字串拆成 string 嘅 list | "`split()` breaks a string into parts and forms a list of strings; by default any whitespace is the separator." |
| `hashable` | 可雜湊；tuple 可以做 dictionary key 嘅原因 | "A tuple can be used as a dictionary key because it is **hashable** and immutable; a list cannot because it is mutable and cannot handle `__hash__()`." |
| `memory-efficient` | 節省記憶體；tuple 相對 list 嘅優勢 | "Tuples are generally more **memory-efficient** and perform better than lists due to their simpler structure." |
| `rebinding` | 重新賦值；將變數名指向新物件 | "Reassigning `tupleFriends = ("Peter", "Susan", "Mary", "Peter")` succeeds because it creates a new tuple and rebinds the name — the original tuple is unchanged." |

---

## 5. 🗺️ 循序漸進學習路線 (Learning Path)

**第一步：先理解觀念 (Understand)**
- 理解 compound data type 點解存在：大量變數會 bulky + inefficient，要將多個值放入 single collection。
- 理解 sequence 本質：ordered（插入次序保留）、容許 duplicates、數字索引；tuple 同 list 唯一本質分別係 mutability。
- 理解索引機制：由 0 開始；`len()-1` 係最後一個正數索引；負數索引 `-N` = `len - N`；`[start:stop]` 中 stop 唔包含。
- 理解 immutable 嘅真正意思：**項目唔可以原地改**，但變數可以重新綁定（rebinding）到新 tuple。
- 理解「改」與「唔改得」嘅界線：list 有 `append/insert/remove/pop/clear/sort`，tuple 全部冇；tuple 淨係可以讀（索引、切片、`index/count/in/len/sum`）。

➔ **第二步：背誦英文短語 (Memorise)**
- "Items are indexed by their position number in the sequence, starting from 0."
- "Tuples are immutable (items cannot be updated); lists are mutable (items can be updated)."
- "An `IndexError` is raised when an invalid index is used."
- "`index()` finds the index of the first matched item; a `ValueError` is raised when the specified item cannot be found."
- "`pop()` removes and gets the item at a specific position."
- "A tuple can be used as a dictionary key because it is hashable and immutable; a list cannot because it cannot handle `__hash__()`."

➔ **第三步：掌握計算／寫法 (Master the Code)**
- 識寫建立三式：空集合 `[]` / `()`、帶值 `["Peter", "Susan", "Mary"]`、預設值 `[0] * 3`、`[None] * 4`；型別轉換 `list(tuple)` / `tuple(list)`。
- 識計索引：`friends[-1]` = index 2；`friends[-3:-1]` = `friends[0:2]`；`len(["Peter","Susan","Mary"])` = 3。
- 識寫讀取：單項 `friends[1]`、切片 `friends[0:2]`、開放端 `friends[1:]` / `[:1]` / `[:]`。
- 識寫搜尋組合：`if "Tim" in listFriends:` 先檢查，再 `index()`；`count("Peter")` 統計。
- 識寫 list 七大操作：`append("Sam")`、`insert(1, "Chris")`、`remove("Peter")`、`foundItem = pop(1)`、`clear()`、`sort(reverse=True)`、切片賦值 `friends[1:3] = ["Bob"]`。
- 識寫其他操作：`sum(listPrices)`、`tupleA + tupleB`、`[0] * 4`、`" and ".join(listFriends)`、`line2.split("; ")`。
- 識寫 `enumerate()` 拆解：`for pos, item in enumerate(seq): print(f"{pos} is {item}")`。
- 識做 execution trace：`for item in [12, 33, 45]` 逐輪寫低 `item` 值 → 12, 33, 45, Done。

➔ **第四步：能解答英文考題 (Answer Exam Questions)**
- "What is the output of `print(listFriends[0:2])`?"（答 `['Peter', 'Susan']`，解釋 stop not included）
- "What error is raised by `friends[3]` / `friends[2] = 0` / `listFriends.remove("Tim")`?"（分別答 `IndexError` / `'tuple' object does not support item assignment` / `ValueError`）
- "Why is a tuple immutable but a list mutable?"（答 item assignment 對比、`x[2] = 6` 成功 vs `y[2] = 0` 報錯）
- "Will `tupleFriends = ("Peter", "Susan", "Mary", "Peter")` succeed?"（答 Yes——rebinding 建立新 tuple，唔係原地修改）
- "Can a list be used as a dictionary key? Why?"（答 No——mutable、cannot handle `__hash__()`；tuple 得，hashable）
- "Which method removes an item and returns it?"（答 `pop()`）
- "Compare tuples and lists."（答 ordered/duplicates/indexing 相同；immutable vs mutable；tuple 慳 memory、list 多 built-in functions）
- "How do you convert a string into a list of words?"（答 `line1.split()`）

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 關鍵數字與結果 (Key Numbers & Results)

| 例子 | 結果／意義 |
|---|---|
| `len(["Peter", "Susan", "Mary"])` | `3`（項目數量；最後索引 = 2）|
| `["Peter", "Susan", "Mary"][1]` | `"Susan"`（索引由 0 開始）|
| `[0] * 3` ／ `[None] * 3` | `[0, 0, 0]` ／ `[None, None, None]` |
| `friends[-1]`（len=3）| `"Mary"`（`-1` = `3-1` = index 2）|
| `friends[-3:-1]` | `['Peter', 'Susan']`（= `friends[0:2]`）|
| `friends[3]` | **`IndexError`**（out of range）|
| `list(enumerate(['x','y','z']))` | `[(0, 'x'), (1, 'y'), (2, 'z')]` |
| `["Peter","Susan","Mary","Peter"].index("Peter")` | `0`（第一個匹配）|
| `count("Peter")` | `2`（大小寫敏感）|
| `sum([111, 222, 333])` | `666` |
| `sort()` 後 `["Peter","Susan","Mary","Peter"]` | `['Mary', 'Peter', 'Peter', 'Susan']` |
| `sort(reverse=True)` | `['Susan', 'Peter', 'Peter', 'Mary']` |
| `(1, 2, 3) + (7, 8, 9)` | `(1, 2, 3, 7, 8, 9)` |
| `" and ".join(listFriends)` | `"Peter and Susan and Mary and Peter"` |
| `"A lot    of spaces".split()` | `['A', 'lot', 'of', 'spaces']`（任何空白）|
| `"first; second; third".split("; ")` | `['first', 'second', 'third']` |
| `{("Kelvin","ITP3915"): "B"}` | Valid（tuple 可做 key）|
| `{["Kelvin","ITP3915"]: "B"}` | Invalid（list 唔可以做 key）|

### 方法功能速查表 (Method Quick Reference)

| 方法 | 作用 | 適用 | 回傳值 | 錯誤 |
|---|---|---|---|---|
| `len()` | 項目總數 | tuple / list | 數量 | — |
| `index(item)` | 第一個匹配位置 | tuple / list | 索引 | 搵唔到 → `ValueError` |
| `count(item)` | 匹配次數 | tuple / list | 次數 | — |
| `in` / `not in` | 存在檢查 | tuple / list | 布林 | — |
| `sum()` | 數值總和 | tuple / list | 總和 | — |
| `append(item)` | 加去末端 | **list only** | 無 | — |
| `insert(i, item)` | 插入指定位置 | **list only** | 無 | — |
| `remove(item)` | 刪第一個匹配 | **list only** | 無 | 搵唔到 → `ValueError` |
| `pop(i)` | 刪指定位置並回傳 | **list only** | 被刪項目 | — |
| `clear()` | 清空 | **list only** | 無 | — |
| `sort()` / `sort(reverse=True)` | 原位排序 | **list only**（tuple 冇）| 無 | — |
| `x[i] = v` / 切片賦值 | 更新項目 | **list only** | — | 無效索引 → `IndexError` |
| `join()` | list → string | 用喺 string（分隔符）| 字串 | — |
| `split()` | string → list | 用喺 string | list | — |

### 英文極速記憶口訣 (Mnemonics)

- **「0 起 1 止」索引口訣**：索引由 0 開始；切片 `[start:stop]` 嘅 stop 唔包含 → "Index starts at 0; stop is not included."
- **「負 N = len − N」口訣**：`-1` 永遠係最後一個 → "Negative index `-N` equals `len - N`; `-1` is always the last item."
- **I-V-M 錯誤口訣**：`IndexError`（索引超範圍）／`ValueError`（值搵唔到）／assignment error（`'tuple'/'str' object does not support item assignment`）→ "Index out of range → `IndexError`; item not found → `ValueError`; modifying immutable → item assignment error."
- **L-I-S-T 操作口訣**：`L`en 計數、`I`ndex 定位、`S`ort 排序、`T`otal（sum）——全部 tuple / list 通用；增刪改（append/insert/remove/pop/clear）**List Only** → "Reading is for both; adding, removing and sorting are List Only."
- **「先 in 後動」安全口訣**：用 `index()` 或 `remove()` 之前，先用 `in` 檢查存在 → "Check with `in` before you call `index()` or `remove()`."
- **Tuple 三大特權口訣**：immutable（不可變）、hashable（可做 dict key）、慳 memory（memory-efficient）；list 嘅特權係多 built-in functions → "Tuple: immutable, hashable, memory-efficient; List: more built-in functions."
- **`join` vs `split` 方向口訣**：`join` 係「分隔符.join(list)」將 list 合成字串；`split` 係「string.split(sep)」將字串拆成 list —— 方向相反 → "`join` glues a list into a string; `split` breaks a string into a list."
