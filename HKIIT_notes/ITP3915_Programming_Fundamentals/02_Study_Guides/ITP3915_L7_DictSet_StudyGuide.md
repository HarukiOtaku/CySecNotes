# ITP3915 Programming Fundamentals — Lecture 8：Dictionary and Set 雙語應考完整學習指南

> 課程：ITP3915 Programming Fundamentals｜課題：Dictionaries and Sets
> 適用：大專編程考試、Python 基礎測驗
> 本指南以「香港繁體中文解說機制」+「英文標準定義句（可直接背誦／考試照抄）」雙軌並行，所有 Python 語法、函數名、參數一律保留英文原文。

---

## 1. 📝 課程概要與實務情境（Summary & Real-world Context）

本講的核心是 Python 兩種「以資料本身含義作索引」的複合資料型態（compound data types）：**Dictionary（字典）** 與 **Set（集合）**。早前的 List 與 Tuple 只能用數字下標（numeric index，例如 `subject[0]`）存取項目，程式碼可讀性差——看見 `subject[0]` 根本不知道取的是科目編號還是科目名稱。Dictionary 引入 **key-value pair（鍵值對）**，容許你用文字鍵（text-based keys）例如 `"code"`、`"name"` 直接取資料，就好像資料庫中「欄位（field）對應數值」的組織方式；而 Set 則是用來存放「不重複的鍵」，等同資料庫的 `DISTINCT` 功能。

在真實編程場景中，這兩個型態無處不在：例如一個成績管理系統用 Dictionary 記錄每個學生編號對應的分數（`{"ITE3006": 60, "ITP3915": 70}`），需要查分時直接 `dictMarks["ITP3915"]` 一行取回 70 分，不需逐一搜尋；又例如統計「今日到訪網站的訪客清單」時，同一訪客重複到訪不應重複記錄，用 Set 就能自動去重（deduplication），`visitors.add("Peter")` 即使呼叫兩次，集合內仍然只有一個 `"Peter"`。掌握 Dictionary 與 Set 是通往資料庫概念、JSON 資料處理與演算法去重的必經階梯。

---

## 2. 🎯 考試學習目標（Learning Objectives）

考官會測試以下核心能力（附英文對照）：

| # | 核心能力（繁中） | English Learning Objective（考官英文原句） |
|---|------------------|---------------------------------------------|
| 1 | 使用文字鍵（text-based keys）儲存資料 | **Use text-based keys for data storage.** |
| 2 | 儲存資料而不重複（去重） | **Store data without duplication.** |
| 3 | 建立與索引 Dictionary（`{}`、`dict()`、`dict.fromkeys()`） | **Create dictionaries with `{}` or `dict()`, and access items by key.** |
| 4 | 讀取 Dictionary 項目（`[]`、`get()`、`keys()`、`values()`、`items()`） | **Read dictionary items by key and collect keys, values, or both.** |
| 5 | 檢查鍵是否存在並避免 `KeyError` | **Check key existence with `in` and handle missing keys safely with `get()`.** |
| 6 | 用迴圈走訪 Dictionary（tuple unpacking） | **Iterate through dictionaries using loops with tuple unpacking.** |
| 7 | 新增、更新、刪除 Dictionary 項目（`pop()`、`popitem()`、`clear()`） | **Add, update, and remove dictionary items.** |
| 8 | 排序 Dictionary（`sorted()`） | **Sort dictionary items with the built-in `sorted()` function.** |
| 9 | 建立與操作 Set（`add()`、`remove()`、`discard()`、`pop()`） | **Create sets and add/remove unique keys without duplication.** |
| 10 | 比較 Tuple／List／Dictionary／Set 四者的特性 | **Compare ordering, uniqueness, indexing, and mutability across the four container types.** |

---

## 3. 📖 雙語深度理論知識點（Comprehensive Notes）

### 3.1 為何需要 Key-Value 配對（從 List 到 Dictionary）

早期做法：用 List 儲存資料，再用「常數變數」代表每個 index 的意義。

```python
subject = ["ITP3915", "Programming"]
subjCode = 0      # index of ITP3915
subjName = 1      # index of Programming
print(f"Module code is {subject[subjName]}")   # 注意：這是教材示範「用錯 index」的後果
```

> **English Standard Definition — Key-Value Pairs for Data Storage:** Sequence types organise items using numeric indexes. We can use variables to represent the meaning of each index (key), so that data is organised as field and value pairs, similar to how data is organised in a database.

**拆解邏輯：**
- 使用變數（`subjCode`、`subjName`）當作 index 的「名字」，比硬寫 `0`、`1` 可讀性高。
- 但教材明確示範一個常見陷阱：`subject[subjName]` 會誤取 `"Programming"`——因為 `subjName = 1`。這正說明「數字 index 沒有語意」的問題，為引入 Dictionary 鋪路。

**改善做法：以 UPPERCASE 常數命名 index**（Python 沒有內建常數型態，慣例用全大寫加底線表示「不應更新」的常數）：

```python
subject = ["ITP3915", "Programming"]
SUBJ_CODE = 0
SUBJ_NAME = 1
print(f"Module code is {subject[SUBJ_CODE]}")
```

> **English Standard Definition — Constants Convention:** Python does not have built-in constant types like other languages. To represent constants, use UPPERCASE LETTERS with underscores separating words.

**拆解邏輯：** 這些變數本質是「固定值（constants）」，不應該被更新。Python 靠命名慣例（`SUBJ_CODE` 全大寫）提醒程式員「這是常數」，屬於 style convention 而非語法強制。

---

### 3.2 Dictionary 的建立與索引（Creation and Indexing of Dictionaries）

#### 3.2.1 三種容器語法對照

```python
# List:      [item1, item2, ..., itemN]
# Tuple:     (item1, item2, ..., itemN)
# Dictionary: {key1: item1, key2: item2, ..., keyN: itemN}
```

> **English Standard Definition — Dictionary:** A dictionary is a compound data type in Python for mapping; it allows the use of text-based keys to store and access values.

**拆解邏輯：** List／Tuple 用方括號、圓括號；Dictionary 用花括號 `{}`，而且每個元素是「鍵: 值（key: value）」的配對，鍵與值之間用冒號 `:` 分隔，配對之間用逗號 `,` 分隔。

#### 3.2.2 建立空 Dictionary 與有資料的 Dictionary

```python
dictSubj = dict()        # or dictSubj = {}
dictSubj = {"code": "ITP3915", "name": "Programming"}
```

> **English Standard Definition — Creating Dictionaries:** Use `dict()` or `{}` to create an empty dictionary; use `{key1: value1, key2: value2}` to create a dictionary with key-value pairs.

#### 3.2.3 鍵的型態

> **English Standard Definition — Indexing by Keys:** Dictionaries are indexed by keys which can be numbers, texts, or even tuples.

**拆解邏輯：** 鍵可以是數字、字串，甚至 tuple（不可變型態才能做鍵）。每次用 `dictSubj["code"]` 取回 `"ITP3915"`，就是用文字鍵做索引。

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
# 內部結構：key "code" -> value "ITP3915"；key "name" -> value "Programming"
```

#### 3.2.4 用 `fromkeys()` 建立帶預設值的 Dictionary

```python
listKeys = ["code", "name"]
dictSubj = dict.fromkeys(listKeys, None)
print(dictSubj)
# 預期輸出：{'code': None, 'name': None}
```

> **English Standard Definition — `dict.fromkeys()`:** `dict.fromkeys(iterable, value)` creates a new dictionary whose keys come from the iterable and whose values are all set to the given default value.

#### 3.2.5 用 `len()` 計算項目總數

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
print(len(dictSubj))
# 預期輸出：2
```

> **English Standard Definition — `len()`:** `len(dictionary)` returns the total number of key-value pairs (items) in the dictionary.

#### 3.2.6 鍵本身也可以是「資料」（Use Case of Keys）

```python
dictMarks = {
    "ITE3006": 60,
    "ITP3915": 70,
    "ITP4456": 80,
}
```

> **English Standard Definition — Keys as Data:** Sometimes keys are not just fields; they are also "data" providing meanings, e.g. using subject codes as keys and marks as values to answer "Which subjects have been completed?"

**拆解邏輯：** 這裡每個 subject code 既是索引又是資料本身，一句 `"ITE3006" in dictMarks` 就能答「這科完成了沒有」。

---

### 3.3 四種容器類型特性比較（Tuple／List／Dictionary／Set）

#### 3.3.1 三種容器比較（Lecture 投影片版）

| 特性 | Tuple | List | Dictionary |
|------|-------|------|------------|
| Ordering（順序） | Ordered | Ordered | Ordered from Python 3.7 |
| Uniqueness（不重複） | Allow duplicate items | Allow duplicate items | No duplicate keys |
| Indexing（索引） | By numeric index | By numeric index | By any key |
| Mutability（可變） | Immutable（items cannot be updated） | Mutable（items can be updated） | Mutable（items can be updated） |

#### 3.3.2 加入 Set 後的完整比較（四種容器）

| 特性 | Tuple | List | Dictionary | Set |
|------|-------|------|------------|-----|
| Ordering | Ordered | Ordered | Ordered from Python 3.7 | **Unordered（沒順序）** |
| Uniqueness | Allow duplicate items | Allow duplicate items | No duplicate keys | **No duplicate keys** |
| Indexing | By numeric index | By numeric index | By any key | **No（不可索引）** |
| Mutability | Immutable（items cannot be updated） | Mutable（items can be updated） | Mutable（items can be updated） | **Mutable（allow add and remove keys, but cannot be updated）** |

> **English Standard Definition — Container Comparison:** A tuple is ordered and immutable; a list is ordered and mutable; a dictionary is ordered from Python 3.7, has no duplicate keys, is indexed by any key, and is mutable; a set is an unordered, mutable collection of unique keys that cannot be indexed.

**拆解邏輯（考點記憶）：**
- **Tuple 唯一不可變**（內容建立後不可改）；List／Dict／Set 都可變。
- **Dict／Set 不允許重複鍵**；List／Tuple 允許重複項目。
- **Dict 用任意鍵索引、Set 完全不能索引**——Set 只能「檢查存在」或「走訪」，不能用 `visitors[0]`。
- **Dict 由 Python 3.7 起保有插入順序（ordered）**；Set 永遠無序（unordered）。
- **Set 可加可刪鍵，但不能「更新」鍵**——因為鍵本身就是資料，改了等於刪舊加新。

---

### 3.4 讀取 Dictionary 項目（Reading Dictionary Items）

#### 3.4.1 用鍵直接讀取單一項目

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
print(dictSubj["code"])
# 預期輸出：ITP3915
```

> **English Standard Definition — Reading by Key:** Use `dictionary[key]` to read a single item; the value associated with that key is returned.

#### 3.4.2 無效鍵會觸發 `KeyError`

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
print(dictSubj["credit"])   # "credit" 不存在
# 預期結果：KeyError: 'credit'
```

> **English Standard Definition — KeyError:** A `KeyError` is raised when an invalid (non-existent) key is used to access a dictionary item.

#### 3.4.3 用 `get()` 安全取值（不報錯，回傳預設值）

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
print(dictSubj.get("hours"))            # 鍵不存在，回傳 None
print(dictSubj.get("credit", "No credit"))  # 鍵不存在，回傳預設值 "No credit"
# 預期輸出：
# None
# No credit
```

> **English Standard Definition — `get()`:** Instead of checking the existence of a specific key, you can use the `get()` function to try to find its value. If the key does not exist, the default value will be returned without raising an error. Syntax: `dictionary.get(key, default)`.

**拆解邏輯：** `get()` 是防 `KeyError` 的首選工具：`get(key)` 找不到就回傳 `None`；`get(key, default)` 找不到就回傳你指定的 `default`。考試常問「哪個方法不會 raise error？」——答案就是 `get()`。

#### 3.4.4 收集所有鍵／值／鍵值對：`keys()`、`values()`、`items()`

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
print(dictSubj.keys())
print(dictSubj.values())
print(dictSubj.items())
# 預期輸出：
# dict_keys(['code', 'name'])
# dict_values(['ITP3915', 'Programming'])
# dict_items([('code', 'ITP3915'), ('name', 'Programming')])
```

> **English Standard Definition — keys / values / items:** Functions are available to collect keys, values, or both as a list of tuples: `dict.keys()` returns all keys, `dict.values()` returns all values, and `dict.items()` returns all key-value pairs as a list of tuples.

**拆解邏輯：** 三者回傳的其實是 view objects（`dict_keys`、`dict_values`、`dict_items`），外觀像 list，`items()` 的每個元素是一個 `(key, value)` tuple——這正是 3.5 迴圈解包（unpacking）的基礎。

#### 3.4.5 用 `in` 檢查鍵／值是否存在

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
if "code" in dictSubj:
    print("dictSubj has the key 'code'")
if "Programming" in dictSubj.values():
    print("dictSubj has the value 'Programming'")
# 預期輸出：
# dictSubj has the key 'code'
# dictSubj has the value 'Programming'
```

> **English Standard Definition — Checking Existence:** Use `key in dictionary` to check whether a key exists (checks keys by default); use `value in dictionary.values()` to check whether a value exists.

**拆解邏輯（高頻考點）：** `in` 對 Dictionary 預設檢查的是**鍵**，不是值！要檢查值必須明確寫 `dictSubj.values()`。這是考試最愛設陷阱的地方。

---

### 3.5 用迴圈走訪 Dictionary（Iterate Through Dictionaries Using Loops）

#### 3.5.1 標準走訪：`for (key, value) in dict.items()`

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
for (key, value) in dictSubj.items():
    print(f"{key} is {value}")
print("Done")
# 預期輸出：
# code is ITP3915
# name is Programming
# Done
```

> **English Standard Definition — Iterating with Tuple Unpacking:** Use `for (key, value) in dictionary.items():` to iterate through a dictionary; each iteration unpacks one `(key, value)` tuple into the variables `key` and `value`.

**執行過程拆解（考官喜歡看步驟）：**
1. 第一次迴圈：`(key, value) = ('code', 'ITP3915')` → 解包（unpacking）後 `key = "code"`、`value = "ITP3915"` → 執行 `print(f"{key} is {value}")`。
2. 第二次迴圈：`(key, value) = ('name', 'Programming')` → `key = "name"`、`value = "Programming"` → 再執行 print。
3. 迴圈結束後執行 `print("Done")`（在迴圈外，只執行一次）。

#### 3.5.2 走訪時加入過濾條件（Additional Operations with Loops）

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
filtered = ["code"]
for (key, value) in dictSubj.items():
    if key in filtered:
        print(f"{key} is {value}")
print("Done")
# 預期輸出：
# code is ITP3915
# Done
```

**執行過程拆解：**
1. `filtered = ["code"]`
2. 第一次迴圈：`key = "code"`、`value = "ITP3915"` → `"code" in filtered` 為 `True` → print `code is ITP3915`。
3. 第二次迴圈：`key = "name"`、`value = "Programming"` → `"name" in filtered` 為 `False` → 不 print。
4. 迴圈外執行 `print("Done")`。

> **English Standard Definition — Filtering During Iteration:** Inside the loop, use an `if` condition (e.g. `if key in filtered:`) to selectively print or process only the items that match the filter.

---

### 3.6 修改 Dictionary 項目（Manipulation of Dictionary Items）

#### 3.6.1 新增／更新項目：`dict[key] = value`

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
dictSubj["code"] = "ITP9999"   # update item：鍵已存在 -> 覆寫
dictSubj["credit"] = 10        # add item：鍵不存在 -> 新增
print(dictSubj)
# 預期輸出：{'code': 'ITP9999', 'name': 'Programming', 'credit': 10}
```

> **English Standard Definition — Add / Update an Item:** Use the key to add or update a dictionary item: `dictionary[key] = value`. If the key already exists, the item is updated; otherwise, a new item is added.

**拆解邏輯（必背口訣）：** 「鍵在→更新（update），鍵不在→新增（add）」。同一句語法 `dictSubj["code"] = ...` 同時兼任兩種用途。

#### 3.6.2 `pop(key)`：移除並取回指定鍵的值

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
code = dictSubj.pop("code")
print(code)
# 預期輸出：ITP3915
# dictSubj 現在只剩 {'name': 'Programming'}
```

> **English Standard Definition — `pop()`:** `dictionary.pop(key)` removes the item with the given key and returns its value.

#### 3.6.3 `popitem()`：移除並取回最後一個項目

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
lastItem = dictSubj.popitem()
print(lastItem)
# 預期輸出（本課程投影片示範）：Programming
# 註：Python 實際上回傳 (key, value) tuple，即 ('name', 'Programming')；
# 投影片為方便示範而簡化輸出，作答時若題目要求「程式實際輸出」，請寫 tuple 形式。
# dictSubj 現在只剩 {'code': 'ITP3915'}
```

> **English Standard Definition — `popitem()`:** `dictionary.popitem()` removes and returns the last item in the dictionary (as a `(key, value)` tuple, since dictionaries are ordered from Python 3.7).

#### 3.6.4 `clear()`：移除所有項目

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
dictSubj.clear()   # 結果：{}（空 dictionary）
print(dictSubj)
# 預期輸出：{}
```

> **English Standard Definition — `clear()`:** `dictionary.clear()` removes all items in the dictionary, leaving an empty dictionary `{}`.

**方法速記表（Dictionary 操作）：**

| 方法 | 作用 | 回傳值 | 找不到鍵時 |
|------|------|--------|------------|
| `dict[key]` | 讀取 | 值 | `KeyError` |
| `dict.get(key, default)` | 安全讀取 | 值或 default | 回傳 `None`／default，不報錯 |
| `dict[key] = value` | 新增／更新 | 無 | — |
| `dict.pop(key)` | 移除 | 被移除的值 | `KeyError` |
| `dict.popitem()` | 移除最後一項 | `(key, value)` tuple | `KeyError`（空字典時） |
| `dict.clear()` | 清空 | 無 | — |
| `len(dict)` | 計數 | 項目總數 | — |

---

### 3.7 排序 Dictionary（Sort and Create New Dictionaries）

```python
dictSubj = {"code": "ITP3915", "name": "Programming"}
sortedSubj1 = sorted(dictSubj.items())
print(sortedSubj1)
sortedSubj2 = sorted(dictSubj.items(), reverse=True)
print(sortedSubj2)
# 預期輸出：
# [('code', 'ITP3915'), ('name', 'Programming')]
# [('name', 'Programming'), ('code', 'ITP3915')]
```

> **English Standard Definition — Sorting:** There is NO built-in function for sorting dictionaries using `dict()`. Instead, the `sorted()` method can be used to sort any iterable data type by keys: `sorted(dictionary.items())` sorts the items, and `sorted(dictionary.items(), reverse=True)` sorts them in descending order. The result is a new sorted list, not the dictionary itself.

**拆解邏輯（考點）：**
- Python **沒有** `dict.sort()` 或直接排序 Dictionary 的內建函數。
- 正確做法：用內建 `sorted()` 配合 `.items()`，排序依據是每個 `(key, value)` tuple 的**第一個元素（鍵）**。
- `sorted()` 回傳**新的 list**，不會修改原 dictionary。
- 加 `reverse=True` 參數即為降序（descending order）。

---

### 3.8 Set（集合）基礎概念與建立

> **English Standard Definition — Set:** A set is an unordered collection of unique keys (treated as items). In this module, we use Python sets to store these keys without duplication, similar to the DISTINCT feature in databases.

**拆解邏輯：**
- Set 三大特徵：**unordered（無序）**、**unique（不重複）**、**元素視為鍵（keys）**。
- 用途：去重（without duplication），等同資料庫 `DISTINCT`。
- 語法：花括號內直接列鍵，**沒有冒號**——`{key1, key2, ..., keyN}`（對比 Dictionary 的 `{key1: value1, ...}`）。

#### 3.8.1 建立 Set

```python
visitors = set()                    # 空 set（注意：{} 是空 dictionary，不是空 set！）
visitors = {"Peter", "Susan", "Mary"}   # 有資料的 set
```

> **English Standard Definition — Creating Sets:** Use `set()` to create an empty set, and `{key1, key2, key3}` to create a set with values.

**拆解邏輯（易錯點）：** `{}` 建立的是**空 Dictionary**；建立空 Set 必須用 `set()`。這是經典考試陷阱。

---

### 3.9 Set 的操作（Add / Read / Remove）

#### 3.9.1 新增鍵：`add()`

```python
visitors = {"Peter", "Susan", "Mary"}
visitors.add("Billy")
visitors.add("Peter")   # 已存在 -> 不會建立新鍵（set 不允許重複）
print(visitors)
# 預期輸出（無序，順序僅供參考）：{'Peter', 'Susan', 'Mary', 'Billy'}
```

> **English Standard Definition — `add()`:** `set.add(key)` allows adding a new key to a set. Adding a key that already exists does not create a new key, because a set stores unique keys only.

**拆解邏輯：** 第二次 `add("Peter")` 是 no-op（無效果），集合大小不變——這正是「去重」的體現。

#### 3.9.2 讀取／檢查存在：`in`

```python
visitors = {"Peter", "Susan", "Mary"}
if "Susan" in visitors:
    print("Susan has attended")
# 預期輸出：Susan has attended
```

> **English Standard Definition — Checking Set Membership:** We commonly check for the existence of a key rather than accessing it directly: use `key in set` to test membership.

**拆解邏輯：** Set **不能索引**（無序、無下標），所以唯一「讀取」方式是檢查存在（`in`）或走訪（iteration）。「We commonly check for the existence of a key rather than accessing it directly」是教材原句，可直接背誦作答。

#### 3.9.3 移除鍵：`remove()`（找不到會報錯）

```python
visitors = {"Peter", "Susan", "Mary"}
visitors.remove("Peter")
# OK：成功移除 "Peter"

visitors = {"Peter", "Susan", "Mary"}
visitors.remove("Billy")   # "Billy" 不存在
# 預期結果：KeyError: 'Billy'
```

> **English Standard Definition — `remove()`:** `set.remove(key)` removes a matched key from the set. A `KeyError` is raised when the specified key cannot be found.

#### 3.9.4 安全移除：`discard()`（找不到不報錯）

```python
visitors = {"Peter", "Susan", "Mary"}
visitors.discard("Billy")   # "Billy" 不存在，但不報錯、無效果
```

> **English Standard Definition — `discard()`:** To prevent `KeyError`, use `discard()` instead: `set.discard(key)` removes the key if it exists, but does nothing and raises no error if the key cannot be found.

**對比口訣：** `remove()` 嚴格（找不到→`KeyError`）；`discard()` 寬容（找不到→靜默忽略）。正如 Dictionary 中 `dict[key]` vs `get()` 的關係。

#### 3.9.5 隨機移除並取回：`pop()`（配合 `while` 迴圈）

```python
visitors = {"Peter", "Susan", "Mary"}
while visitors:          # False when it is empty（空 set 即 False）
    lucky = visitors.pop()
    print(lucky)
print("Done")
# 預期輸出（順序隨機，因為 set 無序，以下僅為其中一種可能）：
# Mary
# Peter
# Susan
# Done
```

> **English Standard Definition — `pop()` on a Set:** `set.pop()` removes and returns a key at random (because a set is unordered). The `while visitors:` condition becomes `False` when the set is empty, so the loop pops every key and then ends.

**執行過程拆解：**
1. `visitors` 非空 → 條件為 `True` → `pop()` 隨機取走一個鍵並 print。
2. 重複直到 set 變空 → `while visitors:` 為 `False` → 跳出迴圈。
3. 執行迴圈外的 `print("Done")`。

#### 3.9.6 清空 Set：`clear()`

```python
visitors = {"Peter", "Susan", "Mary"}
visitors.clear()
print(visitors)
# 預期輸出：set()
```

> **English Standard Definition — `clear()` on a Set:** `set.clear()` removes all keys in the set.

**Set 方法速記表：**

| 方法 | 作用 | 找不到鍵時 |
|------|------|------------|
| `set.add(key)` | 新增鍵（重複則無效果） | —（重複不報錯） |
| `key in set` | 檢查鍵是否存在 | 回傳 `False` |
| `set.remove(key)` | 移除鍵 | `KeyError` |
| `set.discard(key)` | 安全移除鍵 | 不報錯 |
| `set.pop()` | 隨機移除並取回一個鍵 | 空 set 時 `KeyError` |
| `set.clear()` | 清空所有鍵 | — |

---

## 4. 📖 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型（Exam Answer Phrase） |
|-------------------|------------------|-----------------------------------------|
| **key-value pair** | 鍵值對；Dictionary 的基本儲存單位，鍵與值以冒號配對 | "A dictionary stores data as key-value pairs, e.g. `{'code': 'ITP3915'}`." |
| **text-based keys** | 文字鍵；用有意義的字串取代數字下標作索引 | "Text-based keys better represent the meaning of the stored data." |
| **Dictionary / `dict`** | 可變、有序（Python 3.7+）、以任意鍵索引的對應型態 | "A dictionary is a compound data type in Python for mapping, indexed by keys which can be numbers, texts, or even tuples." |
| **`dict.fromkeys(iterable, value)`** | 用一串鍵建立 Dictionary，全部配同一預設值 | "`dict.fromkeys(listKeys, None)` creates a dictionary where every key has the default value `None`." |
| **`len(dict)`** | 計算 Dictionary 內鍵值對的總數 | "`len(dictSubj)` returns the total number of items in the dictionary." |
| **`KeyError`** | 使用不存在的鍵存取時觸發的異常 | "A `KeyError` is raised when an invalid key is used." |
| **`get(key, default)`** | 安全取值；鍵不存在時回傳預設值而不報錯 | "`get()` tries to find the value of a key; if the key does not exist, the default value is returned without raising an error." |
| **`keys()` / `values()` / `items()`** | 分別收集所有鍵、所有值、所有鍵值對（tuple list） | "`items()` returns both keys and values as a list of tuples: `dict_items([('code', 'ITP3915'), ...])`." |
| **`key in dict`** | 檢查鍵是否存在（預設只查鍵，不查值） | "Use `in` to check the existence of a key; check values with `value in dict.values()`." |
| **tuple unpacking** | 將 `(key, value)` tuple 逐一解包到兩個變數 | "`for (key, value) in dict.items():` unpacks each tuple into `key` and `value`." |
| **`dict[key] = value`** | 同一語法兼任新增（鍵不存在）與更新（鍵存在） | "Use the key to add or update an item: existing keys are updated, new keys are added." |
| **`pop(key)`** | 移除指定鍵並回傳其值 | "`dict.pop(key)` removes the item by key and returns its value." |
| **`popitem()`** | 移除並回傳最後一個項目（tuple） | "`dict.popitem()` removes and returns the last item in the dictionary." |
| **`clear()`** | 移除容器內所有項目 | "`dict.clear()` removes all items, leaving `{}`." |
| **`sorted(iterable, reverse=True)`** | 對任何可迭代型態排序；排序 Dictionary 用 `sorted(dict.items())` | "There is no built-in function for sorting dictionaries; use `sorted()` on `dict.items()`, optionally with `reverse=True`." |
| **Set（集合）** | 無序、不重複鍵的集合，等同資料庫 DISTINCT | "A set is an unordered collection of unique keys, similar to the DISTINCT feature in databases." |
| **`set()` / `{key1, key2}`** | 建立空 Set／有資料的 Set（`{}` 是空字典） | "Use `set()` for an empty set; `{}` creates an empty dictionary, not a set." |
| **`add(key)`** | 新增鍵；重複鍵不會新增 | "`add()` adds a new key; adding an existing key does not create a new key." |
| **`remove(key)` / `discard(key)`** | 兩者皆移除鍵；remove 找不到鍵會 raise `KeyError`，discard 不會 | "To prevent `KeyError`, use `discard()` instead of `remove()`." |
| **`set.pop()`** | 隨機移除並回傳一個鍵（set 無序） | "`set.pop()` removes and returns a key at random; `while visitors:` is `False` when the set is empty." |
| **ordered / unordered** | 有序（保留插入順序）／無序（不保證順序） | "Dictionary is ordered from Python 3.7, while a set is unordered." |
| **mutable / immutable** | 可變（可增刪改）／不可變（內容不可更新） | "A tuple is immutable, whereas list, dictionary and set are mutable." |
| **unique keys** | 唯一鍵；同一個鍵在容器內只出現一次 | "Dictionaries and sets allow no duplicate keys, while lists and tuples allow duplicate items." |
| **DISTINCT** | 資料庫中去重的關鍵字，與 Set 的去重概念類比 | "Sets store keys without duplication, similar to the DISTINCT feature in databases." |

---

## 5. 🗺️ 循序漸進學習路線（Learning Path）

**階段 1：先理解什麼觀念（Understand）**
- List 用數字 index 的局限 → 為何需要 key-value pair。
- Dictionary：`{key: value}` 的結構、鍵的型態（數字／文字／tuple）、Python 3.7 起有序。
- Set：無序、唯一、不可索引，等同資料庫 `DISTINCT`。
- 四容器比較表：Ordering / Uniqueness / Indexing / Mutability 四軸。
- 為什麼 `{}` 是空字典、`set()` 才是空集合。

**階段 2：背誦什麼英文短語（Memorise）**
- "A dictionary is indexed by keys which can be numbers, texts, or even tuples."
- "`get()` returns the default value without raising an error."
- "A `KeyError` is raised when an invalid key is used."
- "A set is an unordered collection of unique keys, similar to the DISTINCT feature in databases."
- "To prevent `KeyError`, use `discard()` instead."
- "There is NO built-in function for sorting dictionaries; use `sorted(dict.items())`."
- "Use the key to add or update an item."

**階段 3：掌握什麼計算/寫法（Practise）**
- 建立：`dict()`、`{}`、`{"code": "ITP3915"}`、`dict.fromkeys(listKeys, None)`、`set()`、`{"Peter", "Susan"}`。
- 讀取：`dict[key]`、`dict.get(key, default)`、`dict.keys()/values()/items()`、`key in dict`、`value in dict.values()`。
- 修改：`dict[key] = value`（新增/更新）、`pop()`、`popitem()`、`clear()`。
- 排序：`sorted(dict.items())`、`sorted(dict.items(), reverse=True)`。
- Set 操作：`add()`、`remove()`、`discard()`、`pop()`（配 `while visitors:`）、`clear()`。
- 走訪：`for (key, value) in dict.items():` 的 tuple unpacking 執行步驟逐行推演。
- 手寫追蹤（trace）：每個程式範例自己寫出預期輸出，再對照第 3 節答案。

**階段 4：能解答什麼英文考題（Answer）**
- "What is the output of the following code?"（讀程式寫輸出——必考題型）
- "Which method avoids raising a `KeyError` when reading a dictionary?" → `get()`
- "Which container type is unordered and stores unique keys?" → Set
- "How do you sort a dictionary?" → `sorted(dict.items())`
- "What happens when you `add()` an existing key to a set?" → Nothing, no new key is created
- "Explain the difference between `remove()` and `discard()` on a set." → `remove()` raises `KeyError` if the key is not found; `discard()` does not
- "Compare tuple, list, dictionary and set in terms of ordering, uniqueness, indexing and mutability." → 背熟第 3.3 節比較表

---

## 6. 🎒 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 6.1 關鍵數字與版本事實

| 數字/事實 | 含義 |
|-----------|------|
| Python 3.7 | Dictionary 自此版本起 **Ordered（有序）**；Set 永遠 Unordered |
| `len(dictSubj)` 對 2 個鍵值對的字典 | 回傳 **2**（鍵值對總數，不是鍵＋值的總和） |
| `fromkeys(["code","name"], None)` | 產生 `{'code': None, 'name': None}`（N 個鍵 = N 個項目） |
| 同一鍵重複 `add()`／`dict[key]=` | 不會增加項目數（unique keys） |

### 6.2 語法對照速查表

| 用途 | List | Tuple | Dictionary | Set |
|------|------|-------|------------|-----|
| 建立 | `[a, b]` | `(a, b)` | `{"k": v}` | `{a, b}` |
| 空容器 | `[]` | `()` | `{}`（或 `dict()`） | `set()` ← 不是 `{}` |
| 索引 | `lst[0]` | `tup[0]` | `d["k"]` | ❌ 不可索引 |
| 檢查存在 | `x in lst` | `x in tup` | `"k" in d` | `x in s` |
| 新增 | `lst.append(x)` | ❌ 不可變 | `d["k"] = v` | `s.add(x)` |
| 移除 | `lst.remove(x)` | ❌ 不可變 | `d.pop("k")` | `s.remove(x)`／`s.discard(x)` |
| 清空 | `lst.clear()` | ❌ 不可變 | `d.clear()` | `s.clear()` |
| 數量 | `len(lst)` | `len(tup)` | `len(d)` | `len(s)` |

### 6.3 極速記憶口訣（English Mnemonics）

- **「Key-in → Update，Key-out → Add」**：`d[k] = v` 鍵在更新、鍵不在新增。
- **「Square brackets strict，`get()` safe」**：`d[key]` 找不到會 `KeyError`；`get(key, default)` 永不報錯。
- **「`in` 查鍵、`.values()` 查值」**：`"x" in d` 查鍵；`"x" in d.values()` 查值。
- **「`remove()` 嚴格，`discard()` 寬容」**：`remove` raises `KeyError`；`discard` silently ignores。
- **「`{}` 是字典、`set()` 才是空集合」**：`{}` = empty dictionary, `set()` = empty set.
- **「Set 三無：無序（unordered）、無重複（unique）、無索引（no indexing）」**。
- **「Sort 靠 `sorted()`，不是 `dict()`」**：No built-in sort for dictionaries → `sorted(d.items())`。
- **「Tuple 唯一 Immutable」**：Only tuple cannot be updated.

### 6.4 考官最愛陷阱清單（Exam Traps）

1. `subject[subjName]` 取錯值——數字 index 無語意，用錯變數就取錯資料。
2. `{}` 建立的是空 **Dictionary**，不是空 **Set**。
3. `in` 對 Dictionary 只查**鍵**；查值必須 `dict.values()`。
4. `sorted()` 回傳**新 list**，不修改原 dictionary。
5. `popitem()` 實際回傳 `(key, value)` tuple；`pop(key)` 回傳 value。
6. `remove("不存在")` 會 `KeyError`；`discard("不存在")` 不會。
7. Set 不能 `s[0]` 索引——只能 `in` 檢查或迴圈走訪。
8. `while visitors:` 空 set 為 `False`，迴圈自然結束。

---

*本指南根據 ITP3915 Lecture 8（Dictionaries and Sets）教材完整重寫，已忽略教材內 XML 殘留、作者名與外部連結等雜訊。祝考試順利！*
