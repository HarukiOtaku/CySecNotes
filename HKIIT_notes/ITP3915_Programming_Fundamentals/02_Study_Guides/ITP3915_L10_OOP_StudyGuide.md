# ITP3915 Programming Fundamentals — Lecture 11: Object-Oriented Programming 雙語應考學習指南

> 課程：ITP3915 Programming Fundamentals｜課題：Lecture 11 — Object-Oriented Programming（物件導向程式設計）｜適用：測驗／考試溫習

---

## 1. 📝 課程概要與實務情境 (Summary & Real-world Context)

本課堂正式引入「物件導向程式設計」（Object-Oriented Programming，簡稱 OOP）呢個 Python 入面最重要嘅程式設計典範（paradigm）之一。之前學過嘅 `dict`、`list` 雖然好擅長儲存同整理資料，但佢哋有一個根本限制：**資料（data）同函數（function）係分開存放嘅**——你可以將用戶嘅資料放入 dict，但冇辦法將「處理呢啲資料嘅函數」同資料本身綁埋一齊，亦冇內建機制去驗證資料（例如半徑一定要正數）。OOP 嘅答案就係：用 **class（類別）** 做藍圖（blueprint），將 **attributes（屬性，即資料）** 同 **methods（方法，即函數／行動）** 組織成 **object（物件）**，令「資料 + 處理資料嘅邏輯」成為一個完整嘅單位。本課重點係四件事：定義 class、用 `__init__` 初始化器建立物件、用 `self` 操作物件自身嘅屬性、用 `@property`／`@radius.setter` 做 getter／setter 去控制非公開屬性（`__radius`）嘅讀寫，呢個就係 OOP 四大特徵入面「封裝」（Encapsulation）嘅具體實踐。

點解呢啲內容喺真實開發咁重要？諗一個實際寫 Code 場景：你寫一個銀行 ATM 程式，每個用戶戶口要記住自己嘅結餘（balance），仲要有「存款」（deposit）同「提款」（withdraw）功能，而且提款唔可以超過結餘（data validation）。如果用 dict 做，結餘同驗證邏輯分開寫，好容易手誤更新錯用戶嘅數、或者唔記得做驗證而容許負數結餘；用 class 之後，每個 account object 自己帶住自己嘅 `__balance`，而 `withdraw()` 方法入面就可以內建「`if amount <= self.__balance`」呢種驗證，資料同規則永遠一齊走。另一個場景：你寫一個繪圖或遊戲程式，程式入面有好多圓形，每個圓形有自己嘅半徑；只要定義一次 `Circle` class，就可以用 `Circle(4)`、`Circle(5)` 無限建立各自獨立嘅圓形物件，每個物件自己識計周界（`findPerimeter()`）同面積——呢個就係「重用」（reuse）嘅威力。仲有一個網絡安全／程式穩定性角度：用雙下底線 `__` 前綴嘅屬性係**非公開（non-public）**，喺 class 外面直接讀寫會拋 `AttributeError`，可以防止資料被意外修改（prevent data from being updated by accident），保護資料完整性。

---

## 2. 🎯 考試學習目標 (Learning Objectives)

教材列明本課嘅 **Lesson Intended Learning Outcomes**，考官會測試以下核心能力（附英文原文）：

| # | 核心能力（繁體中文） | English Learning Objective |
|---|----------------------|----------------------------|
| 1 | 展示對 OOP、class 同 object 概念嘅理解 | Demonstrate the understanding of OOP, classes and objects. |
| 2 | 用 instance methods 同 non-public instance attributes 定義 class | Define classes with instance methods and non-public instance attributes. |
| 3 | 呼叫初始化器（`__init__`）去建立物件 | Invoke the initializer to create objects. |
| 4 | 執行 instance methods、getter 同 setter | Run instance methods, getter and setter. |
| 5 | 解釋 `self` 參數嘅作用（指向當前物件） | Explain that `self` refers to the current object and is the first parameter of every instance method. |
| 6 | 解釋封裝：雙下底線屬性喺 class 外不可直接存取，會拋 `AttributeError` | Explain that names prefixed with double underscores are non-public and accessing them from outside raises an `AttributeError`. |
| 7 | 解釋 getter／setter 點樣提供額外存取控制（如驗證半徑必須大於 0） | Explain how getter and setter properties provide additional access control. |
| 8 | 列出 OOP 四大特徵（封裝、繼承、多型態、抽象） | List the four characteristics of OOP: Encapsulation, Inheritance, Polymorphism and Abstraction. |

---

## 3. 📖 雙語深度理論知識點 (Comprehensive Notes)

### Part A：點解要 OOP —— 資料結構嘅限制 (Why OOP — Beyond Data Storage)

#### A1. dict 同 list 嘅三大限制

教材開頭提出一個關鍵問題：`dict` 同 `list` 好擅長儲存同整理資料（excellent for holding and organising data），但佢哋有三個根本限制：

| 問題 | 答案（繁體中文） | English Answer |
|------|------------------|----------------|
| 可唔可以連埋用戶定義嘅函數一齊存放資料？ | 唔可以，函數同資料係分開存放嘅 | No, functions and data are kept separate. |
| 可唔可以做資料驗證？ | 唔可以，檢查資料同存放資料冇直接關連 | No, checking data and storing data are not directly linked. |
| 可唔可以重用資料結構？ | 某程度上可以——你可以複製一個現有集合，但對一個嘅修改唔會影響另一個 | Somehow, yes, you can copy an existing collection, but changes to one do not affect the other. |

> **English Standard Definitions:**
> Dictionaries and lists are excellent for holding and organising data. However:
> 1. Can they hold user-defined functions with data? **No, functions and data are kept separate.**
> 2. Can they have data validation? **No, checking data and storing data are not directly linked.**
> 3. Can you reuse the data structure? **Somehow, yes, you can copy an existing collection, but changes to one do not affect the other.**

> 💡 **考試提示**：呢三句係經典論述題材料——考官問「點解唔夠淨用 dict／list？」，就照抄上面三點：functions and data kept separate、no data validation、reuse 有限制。

#### A2. OOP 定義

OOP 嘅核心思想：將 **attributes（屬性，即資料 data）** 同 **methods（方法，即函數／行動 action）** 組織埋一齊成為 **objects（物件）**。喺 Python 入面用 OOP 係**選擇性（optional）**嘅——同某啲強制要求 OOP 嘅語言（例如 Java）唔同。仲有一個好重要嘅事實：Python 好多內建類型，例如 `int` 同 `list`，本身就係用 OOP 設計嚟起嘅。

> **English Standard Definition:**
> **Object-oriented programming (OOP)** is a way to **organise attributes and methods (functions) into objects**. In Python, using OOP is **optional**, unlike some languages where it is mandatory. In fact, many common types in Python, such as `int` and `list`, are built using OOP design.

**教材範例（OOP in Python）：**

```python
n = 10
print(type(n))
```

**預期輸出（Expected Output）：**

```
<class 'int'>
```

**邏輯拆解：** `n = 10` 睇落只係一個普通數字，但 `type(n)` 顯示佢嘅類型係 `class 'int'`——即係話 `10` 其實係 `int` 呢個 class 嘅一個**物件（instance）**，證明連最基本嘅整數都係用 OOP 建構嘅。考試答題時可以用呢個例子證明「Python 類型背後就係 class」。

#### A3. Class（類別）與 Object（物件）

**Class（類別）** 係一個**藍圖（blueprint）**，用嚟規劃一個物件嘅 **attributes（屬性，即 data 資料）** 同 **methods（方法，即 action 行動）**。**Object（物件）** 就係 class 嘅**實體（instance）**——由藍圖實際造出嚟嘅具體嘢。

教材用 `Circle` class 做例子：一個圓形 class 應該有：

- **Attribute（屬性）：** Radius（半徑）
- **Methods（方法）：** Get radius（攞半徑）、Set radius（設半徑）、Find perimeter（計周界）、Find area（計面積）

> **English Standard Definitions:**
> **Classes** are **blueprints** to plan **attributes** (data) and **methods** (action) of an object. For example, a class for a `Circle` should have an attribute **Radius** and methods such as **Get radius**, **Set radius**, **Find perimeter** and **Find area**.
> An **object** is an **instance** of a class. For example, use the `Circle` class to create some circle instances, e.g. circles with radius 4, 5 and 6.

**遊戲比喻（必背，方便記憶）：**

> **Classes** are like the **weapons designed and provided by the game**, but they have not yet been picked up.
> **Objects** are the **actual weapons your hero picks and uses**.

即係話：class 係「設計圖／未拎起嘅武器」，object 係「英雄實際拎起嚟用嘅武器」。一個 class 可以造出無限多個 object，每個 object 有自己獨立嘅資料。

---

### Part B：語法與用法 (Syntax and Usage)

#### B1. Class 定義與實體化模板（必背語法骨架）

**Class Definition 定義（建立藍圖）：** 自訂 class 嘅名稱**必須以大寫英文字母開頭**（Names of user-defined class should start with an uppercase letter）。

```python
class ClassName:
    def __init__(self, input1):
        self.__attribute1 = input1   # non-public instance attribute

    def method1(self):               # instance method
        # ...
```

**Instantiation 實體化（建立物件）：**

```python
object1 = ClassName(input1)
```

**結構拆解：**

1. `class ClassName:` —— 用 `class` 關鍵字定義一個新 class，名稱用大駝峰式（PascalCase），例如 `Circle`、`BankAccount`；
2. `def __init__(self, input1):` —— **initializer（初始化器）**，佢係一個 instance method，喺建立新物件嗰陣**自動執行（runs automatically）**；入面用 `self.__attribute1 = input1` 將傳入嘅值存入**非公開屬性（non-public instance attribute）**；
3. `def method1(self):` —— 普通嘅 **instance method**（實例方法），第一個參數永遠係 `self`；
4. `object1 = ClassName(input1)` —— 用**好似呼叫函數嘅寫法（function-like notation）**，即「class 名加括號」，就會建立一個新物件。

> **English Standard Definitions:**
> To create a class, use the `class` keyword followed by the class name, which **should start with an uppercase letter**. Inside the class, the **initializer method** `__init__()` is an instance method which **runs automatically** whenever a new object is created. To create an object from a class, use **function-like notation** with the class name, e.g. `Circle()`. The first argument will go to the **second parameter** of the initialiser, and so on.

> ⚠️ **考試陷阱**：`__init__` 嘅第一個參數係 `self`（指向新物件），所以 `Circle(4)` 入面嘅 `4` 會傳俾 `__init__` 嘅**第二個參數** `newRadius`，而唔係第一個！教材原句：“The first argument will go to the **second parameter** of the initialiser, and so on.”

#### B2. 完整 Circle Class 範例（教材核心範例，必須熟到默寫）

```python
class Circle:
    def __init__(self, newRadius):
        self.__radius = newRadius

    @property
    def radius(self):
        return self.__radius

    @radius.setter
    def radius(self, newRadius):
        self.__radius = newRadius

    def findPerimeter(self):
        return self.__radius * 2 * 3.14
    # def ...
```

**逐行拆解：**

1. `def __init__(self, newRadius):` → `self.__radius = newRadius` —— 建立物件時自動執行，將傳入嘅 `newRadius` 存入 `self.__radius`。喺呢個例子，你可以**建立 circle object 嗰陣就設定半徑值**（you can set a radius value when you create a circle object）；
2. `@property` 之下嘅 `def radius(self):` —— **getter（讀取器）**，用嚟讀取 `self.__radius` 嘅值；加咗 `@property` 之後，可以好似存取屬性咁寫 `circle1.radius`（唔使括號）；
3. `@radius.setter` 之下嘅 `def radius(self, newRadius):` —— **setter（設定器）**，用嚟更新 `self.__radius`；寫 `circle1.radius = 3` 就會自動行呢段；
4. `def findPerimeter(self):` —— 一個普通 instance method，計周界：`半徑 × 2 × 3.14`（用 3.14 做圓周率近似值）。

**重點概念（必背）：**

- **Initializer（初始化器）**：`__init__()` 係一個 instance method，喺**每次建立新 `Circle` 物件嗰陣自動執行**；
- **Getter 同 Setter（讀取器／設定器）**：用嚟**控制屬性點樣被設定或讀取**（control how attributes are set or retrieved，呢度就係 radius 值）；
- **Method（方法）**：喺 class 入面定義嘅函數（actions）叫做 **methods**，佢哋同 class 及其物件一齊運作（working with the class and its objects），例如 `getRadius()`、`setRadius()`、`findPerimeter()`。

> **English Standard Definitions:**
> The **initializer method** `__init__()` is an instance method which **runs automatically** whenever a new `Circle` object is created. In our example, you can **set a radius value when you create a circle object**.
> **Getter and setter properties** are used to **control how attributes are set or retrieved** (the radius value in this case).
> Functions (actions) defined inside a class are called **methods**, working with the class and its objects, e.g. `getRadius()`, `setRadius()`, `findPerimeter()`.

#### B3. `self` 嘅作用（必考概念）

`self` 係一個關鍵字，**指向當前嘅物件（refers to the current object）**。喺呢個模組入面，我哋只用 **instance methods（實例方法）**，所以每一個 instance method 都以 `self` 做**第一個參數（first parameter）**。`self` 嘅實際用途係：等每個方法知道「我係邊個物件」，先至可以存取嗰個物件自己嘅屬性。

**每個 `Circle` 物件都有自己獨立嘅 `__radius` 屬性**——`circle1` 嘅 `__radius` 同 `circle2` 嘅 `__radius` 完全分開，互不相干。

> **English Standard Definition:**
> `self` is a keyword which **refers to the current object**. In this module, we only use **instance methods**; that's why every instance method starts with `self` as the **first parameter**. Every `Circle` object has **its own attribute** `__radius`, separate from that of other `Circle` objects.

#### B4. 實體化與執行流程 (Instantiation and Execution Trace)

用 class 建立物件嘅寫法同呼叫函數一樣（function-like notation），例如 `Circle()`。以下程式建立兩個半徑分別為 4 同 5 嘅 `Circle` 物件：

```python
circle1 = Circle(4)
circle2 = Circle(5)
```

**執行流程（Execution trace，必考 trace 題）：**

```
Circle(4):
    newRadius = 4
    self.__radius = newRadius  ← 4
    circle1 = Circle(4)        ← a new circle (半徑 = 4)

Circle(5):
    newRadius = 5
    self.__radius = newRadius  ← 5
    circle2 = Circle(5)        ← a new circle (半徑 = 5)
```

**拆解：** 每次執行 `Circle(4)`，Python 會：
1. 建立一個新物件，`self` 指向佢；
2. 將第一個參數 `4` 傳俾 `__init__` 嘅第二個參數 `newRadius`；
3. 執行 `self.__radius = newRadius`，將 `4` 存入呢個新物件嘅 `__radius`；
4. 成個新物件指派俾 `circle1`。

所以最終我哋有**兩個半徑分別係 4 同 5 嘅 `Circle` 物件**（two Circle objects with radius 4 and 5）。

> **English Standard Definition:**
> To create an object from a class, use **function-like notation** with the class name, e.g. `Circle()`. The **first argument** will go to the **second parameter** of the initialiser, and so on. So, we create **two `Circle` objects with radius 4 and 5**.

#### B5. 封裝 (Encapsulation) 與非公開屬性

**Encapsulation（封裝）** 係 OOP 其中一個核心特徵。喺 Python 入面，**以雙下底線（double underscores `__`）做前綴嘅名稱**會被視為**非公開（non-public）屬性**。呢啲屬性**除咗喺 class 內部之外，唔可以直接存取**——喺 class 外面試圖讀取或修改 `__radius` 會拋出 **`AttributeError`**。

封裝嘅好處：**防止資料被意外更新（prevent data from being updated by accident）**，保障物件資料嘅完整性。

```python
class Circle:
    def __init__(self, newRadius):
        self.__radius = newRadius
    # def ...

circle1 = Circle(4)
print(circle1.__radius)
```

**預期輸出（Expected Output）：**

```
AttributeError: 'Circle' object has no attribute '__radius'
```

> **English Standard Definitions:**
> In Python, names **prefixed with double underscores** (`__`) are treated as **non-public attributes**. These attributes **cannot be accessed directly except from inside the class**. It can **prevent data from being updated by accident**. Trying to access non-public attributes **from outside the class will raise an `AttributeError`**.

> 💡 **考試提示**：如果你喺卷上面見到 `print(circle1.__radius)` 呢類寫法，答案一定係 `AttributeError`（因為 `__radius` 係 non-public，class 外唔可以直接存取）。想正常讀取半徑，就要經 getter：`circle1.radius`。

#### B6. Getter 同 Setter 屬性（含驗證 — 教材最終範例）

既然 `__radius` 唔可以喺 class 外直接存取，點樣先至可以讀同寫？答案係：**為呢啲 non-public attributes 建立特定嘅 getter 同 setter properties**，用嚟讀取（reading）或更新（updating）呢啲屬性。呢啲方法仲提供機會加**額外嘅存取控制（additional access control）**——例如驗證新值係咪合法。

```python
class Circle:
    def __init__(self, newRadius):
        self.__radius = newRadius

    @property
    # Getter for the radius property
    def radius(self):
        return self.__radius

    @radius.setter
    # Setter for the radius property
    def radius(self, newRadius):
        if newRadius > 0:
            self.__radius = newRadius
    # def ...

circle1 = Circle(4)
circle1.radius = 3
print(circle1.radius)
```

**執行流程：**
1. `circle1 = Circle(4)` → `self.__radius = 4`；
2. `circle1.radius = 3` → 觸發 `@radius.setter` 嘅 `radius(self, 3)` → `if 3 > 0:` 成立 → `self.__radius = 3`（`__radius` 由 4 變成 3）；
3. `print(circle1.radius)` → 觸發 `@property` getter → 回傳 `self.__radius` 即 3。

**預期輸出（Expected Output）：**

```
3
```

（`__radius` 嘅值由 `4` 變成 `3`：`__radius = 4 → 3`）

> **English Standard Definitions:**
> To allow accessing **non-public attributes**, create specific **getter and setter properties** for **reading or updating** these attributes. These methods also provide a chance to add **additional access control**. In the example, the setter only updates `__radius` when the new value is greater than 0 (`if newRadius > 0`), so invalid values are rejected.

> 💡 **延伸思考（考試加分位）**：如果寫 `circle1.radius = -1`，因為 `-1 > 0` 唔成立，`self.__radius` **唔會被更新**，仍然係 4——呢個就係「additional access control」嘅實際例子：setter 入面嘅 `if` 條件就係資料驗證（data validation）嘅落實，正好解決咗 Part A 講「dict 冇 data validation」嘅問題。

---

### Part C：OOP 四大特徵 (OOP Characteristics)

教材最後列出 OOP 嘅四大特徵（**OOP Characteristics**），並指出佢哋會喺**下一個學期**再深入討論——今個學期只需記名同識解釋基本意思：

| 特徵（繁體中文） | English Term | 基本意思 |
|------------------|--------------|----------|
| 封裝 | **Encapsulation** | 將資料同操作資料嘅方法包埋一齊，並隱藏內部細節（今課嘅 `__radius` + getter/setter 就係封裝） |
| 繼承 | **Inheritance** | 新 class 可以繼承現有 class 嘅屬性同方法 |
| 多型態 | **Polymorphism** | 同一介面可以有多種唔同實現／行為 |
| 抽象 | **Abstraction** | 隱藏複雜細節，只暴露必要嘅介面 |

> **English Standard Definition:**
> The four characteristics of OOP are **Encapsulation**, **Inheritance**, **Polymorphism** and **Abstraction**. They will be further discussed in the next semester.

---

## 4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|--------------------|------------------|----------------------------------------|
| Object-Oriented Programming (OOP) | 物件導向程式設計：將屬性同方法組織成物件嘅程式設計方式 | OOP is a way to organise attributes and methods (functions) into objects. |
| class | 類別：物件嘅藍圖，規劃屬性同方法 | A class is a blueprint to plan the attributes and methods of an object. |
| object | 物件：class 嘅具體實體 | An object is an instance of a class. |
| instance | 實體／實例：由 class 建立嘅具體物件 | An object is an instance of a class; use the class to create instances. |
| blueprint | 藍圖：class 嘅比喻說法 | Classes are blueprints that plan the data and actions of an object. |
| attribute | 屬性：物件儲存嘅資料（data） | An attribute is the data (e.g. radius) stored inside an object. |
| method | 方法：定義喺 class 入面嘅函數（行動） | Functions defined inside a class are called methods, working with the class and its objects. |
| instance method | 實例方法：以 `self` 做第一個參數、作用於具體物件嘅方法 | Every instance method starts with `self` as the first parameter. |
| initializer / `__init__()` | 初始化器：建立物件時自動執行嘅方法 | The initializer method `__init__()` runs automatically whenever a new object is created. |
| instantiation | 實體化：由 class 建立物件嘅動作 | Instantiation creates an object from a class using function-like notation, e.g. `Circle()`. |
| function-like notation | 好似函數嘅呼叫寫法：class 名加括號 | To create an object, use function-like notation with the class name, e.g. `Circle()`. |
| `self` | 指向當前物件嘅關鍵字，instance method 嘅第一個參數 | `self` is a keyword which refers to the current object. |
| non-public attribute | 非公開屬性：雙下底線前綴，class 外不可直接存取 | Names prefixed with double underscores (`__`) are treated as non-public attributes. |
| double underscores (`__`) | 雙下底線前綴：令屬性變成非公開 | Names prefixed with double underscores are treated as non-public attributes. |
| encapsulation | 封裝：隱藏資料、經方法控制存取 | Encapsulation prevents data from being updated by accident. |
| getter | 讀取器：用嚟讀取非公開屬性嘅方法（`@property`） | A getter property returns the value of a non-public attribute. |
| setter | 設定器：用嚟更新非公開屬性嘅方法（`@radius.setter`） | A setter property updates a non-public attribute, and may add validation. |
| property | 屬性（裝飾器語法）：令方法可以好似屬性咁讀寫 | Getter and setter properties control how attributes are set or retrieved. |
| `@property` | 將方法變成 getter 嘅裝飾器 | `@property` marks a method as the getter for an attribute. |
| `@radius.setter` | 為指定屬性設定 setter 嘅裝飾器 | `@radius.setter` marks a method as the setter for the `radius` attribute. |
| `AttributeError` | 屬性錯誤：喺 class 外存取非公開屬性時拋出 | Accessing a non-public attribute from outside the class raises an `AttributeError`. |
| access control | 存取控制：getter／setter 提供嘅額外檢查（如驗證半徑 > 0） | Getter and setter properties provide a chance to add additional access control. |
| data validation | 資料驗證：檢查資料是否合法先至接受 | The setter can validate data, e.g. only update the radius if `newRadius > 0`. |
| inheritance | 繼承：OOP 特徵之一 | Inheritance, polymorphism, abstraction and encapsulation are the OOP characteristics. |
| polymorphism | 多型態：OOP 特徵之一 | The four OOP characteristics are Encapsulation, Inheritance, Polymorphism and Abstraction. |

---

## 5. 🗺️ 循序漸進學習路線 (Learning Path)

**Step 1 — 先理解咩觀念（Understand the Concepts）**
- dict／list 嘅三大限制：functions and data kept separate、no data validation、reuse 有限制（copy 咗就各自獨立）。
- class = 藍圖（blueprint，未拎起嘅武器）；object = 實體（instance，英雄實際用緊嘅武器）。
- `__init__()` 喺建立物件時**自動執行**；`self` 指向**當前物件**，係每個 instance method 嘅第一個參數。
- 雙下底線 `__` ＝ non-public：class 外唔可以直接存取，會拋 `AttributeError`；所以要用 getter／setter。
- OOP 四大特徵：Encapsulation（封裝）、Inheritance（繼承）、Polymorphism（多型態）、Abstraction（抽象）——下學期先深入，今課只需識名同基本意思。

**Step 2 — 背誦咩英文短語（Memorise the Key Phrases）**
- “Object-oriented programming (OOP) is a way to organise attributes and methods into objects.”
- “Classes are blueprints to plan attributes and methods of an object.”
- “An object is an instance of a class.”
- “The initializer method `__init__()` runs automatically whenever a new Circle object is created.”
- “`self` is a keyword which refers to the current object.”
- “Names prefixed with double underscores are treated as non-public attributes; accessing them from outside the class raises an `AttributeError`.”
- “Getter and setter properties control how attributes are set or retrieved, and provide a chance to add additional access control.”

**Step 3 — 掌握咩計算／寫法（Master the Coding & Calculation）**
- 默寫 class 定義骨架：`class ClassName:` → `def __init__(self, input1):` → `self.__attribute1 = input1` → `def method1(self):`；class 名要大寫開頭。
- 默寫完整 `Circle` class（`__init__` + `@property` getter + `@radius.setter` setter + `findPerimeter()`）。
- 識 trace 實體化：`Circle(4)` → `newRadius = 4` → `self.__radius = 4` → `circle1` 係一個半徑 4 嘅新圓形；`Circle(5)` 同理。
- 識 trace getter／setter：`circle1 = Circle(4)` → `circle1.radius = 3`（setter 驗證 `3 > 0` 通過，`__radius` 4→3）→ `print(circle1.radius)` 出 `3`。
- 識計周界：`findPerimeter()` 回傳 `self.__radius * 2 * 3.14`（例如半徑 4 → `4 * 2 * 3.14 = 25.12`）。

**Step 4 — 能解答咩英文考題（Answer Exam Questions）**
- 「Define a class `Circle` with a non-public instance attribute `__radius` and getter/setter properties.」（默寫 class）
- 「What is the output of `print(type(10))`?」（`<class 'int'>`，證明 `int` 都係 class）
- 「What is the output of the following code?」（`circle1 = Circle(4); circle1.radius = 3; print(circle1.radius)` → `3`）
- 「What happens if we run `print(circle1.__radius)` from outside the class?」（`AttributeError`，因為 `__radius` 係 non-public）
- 「Why do we need getter and setter properties?」（to control how attributes are set or retrieved + additional access control）
- 「What is `self` in an instance method?」（`self` refers to the current object; it is the first parameter of every instance method）
- 「List the four characteristics of OOP.」（Encapsulation, Inheritance, Polymorphism, Abstraction）

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 必背關鍵事實（數字與規則速記）
- **class 名稱**：以大寫字母開頭（start with an uppercase letter），例如 `Circle`。
- **`__init__()`**：建立物件時自動執行（runs automatically）；`Circle(4)` 嘅 `4` 傳俾 `__init__` 嘅**第二個**參數（第一個係 `self`）。
- **`self`**：指向當前物件，每個 instance method 嘅第一個參數。
- **雙下底線 `__`** ＝ non-public：class 外直接存取 → **`AttributeError`**；目的係 prevent data from being updated by accident。
- **Getter** ＝ `@property`；**Setter** ＝ `@radius.setter`；setter 可以加 validation（`if newRadius > 0`）。
- **範例輸出**：`circle1 = Circle(4)` → `circle1.radius = 3` → `print(circle1.radius)` 輸出 **`3`**（`__radius`: 4 → 3）。
- **OOP 四大特徵**：**E**ncapsulation（封裝）、**I**nheritance（繼承）、**P**olymorphism（多型態）、**A**bstraction（抽象）→ 記憶法 **“EIPA”**。

### 考試照抄即滿分嘅 Class 模板
```python
class Circle:
    def __init__(self, newRadius):
        self.__radius = newRadius

    @property
    # Getter for the radius property
    def radius(self):
        return self.__radius

    @radius.setter
    # Setter for the radius property (with validation)
    def radius(self, newRadius):
        if newRadius > 0:
            self.__radius = newRadius

    def findPerimeter(self):
        return self.__radius * 2 * 3.14
```

### 實體化速記
```python
circle1 = Circle(4)   # newRadius = 4 → self.__radius = 4
circle2 = Circle(5)   # newRadius = 5 → self.__radius = 5
```

### 英文極速記憶口訣
> **“Blueprint → Instance.”** —— class 係 blueprint（藍圖），object 係 instance（實體）。
> **“Self first, always.”** —— 每個 instance method 第一個參數都係 `self`，指向 current object。
> **“Double underscore = do not touch.”** —— `__` 前綴嘅屬性係 non-public，class 外碰佢就 `AttributeError`。
> **“Getter to read, setter to write, validation inside.”** —— `@property` 讀、`@radius.setter` 寫、驗證寫喺 setter 入面。
> **“EIPA — four OOP traits.”** —— Encapsulation, Inheritance, Polymorphism, Abstraction（下學期先深入）。

---

*本指南由 ITP3915 Lecture 11（Object-Oriented Programming）教材重寫，已過濾原教材雜訊（XML 殘留／投影片頁腳舊編號等），所有 Python 語法、函數名及參數保留英文原文。祝你考試順利！*
