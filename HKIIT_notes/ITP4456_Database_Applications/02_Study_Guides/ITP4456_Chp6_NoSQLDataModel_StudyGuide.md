# ITP4456 Chapter 6: Data Model of NoSQL Database — 雙語應考學習指南（Bilingual & Exam-Ready Study Guide）

> 課程：ITP4456 Database Applications ｜ 章節：Chapter 6 – Data Model of NoSQL Database
> 核心主題：NoSQL 資料庫的分類、Document Database 的資料模型、JSON / BSON 格式、鍵與關係（Keys and Relationship）、MongoDB 資料類型。

---

## 1. 📝 課程概要與實務情境（Summary & Real-world Context）

呢一章由「關聯式資料庫（RDBMS）」嘅思維過渡去「NoSQL」嘅世界，核心係要你明白：**NoSQL 唔係一個單一技術，而係四大類資料庫嘅總稱**——Key-value databases（鍵值型）、Document databases（文件型）、Wide-column stores（寬行型）同 Graph databases（圖型）。其中本課程重點深入 Document databases（文件型資料庫，代表係 MongoDB）：資料以「文件（Document）」為單位儲存，文件同文件之間**唔需要相同嘅 schema（schema-less）**，資料用 JSON / BSON 標準格式編碼，並且用「內嵌（Embedding）」或「引用（Referencing）」嘅方式去表達文件之間嘅關係，取代關聯式模型嘅 JOIN 概念。

喺實務上，呢啲概念日日都用得到。場景一：你係一家電商平台嘅資料庫管理員，用戶嘅購物車可以即時用一個 JSON 文件儲起（例如 `{"cartId": "...", "items": [...]}`），因為 Document database 支援巢狀陣列，唔使好似關聯式咁拆成十幾張表再 JOIN。場景二：你維護一個學校嘅學生資訊系統，舊系統用關聯式表（Programme 表 + Student 表），要遷移去 MongoDB 時，你就要決定每個學生嘅 programme 資料應該**內嵌喺學生文件入面**，定係**用 `_id` 引用另一份文件**——呢個決定直接影響查詢速度同寫入效能，亦正正係本章「Keys and Relationship」三種方法嘅考試重點。

> **Module Intended Learning Outcome (MILO):** Students are expected to be able to **apply database design techniques to design data models used in business application systems**.
> （本章直接服務呢個課程學習成果：識得用資料庫設計技巧，為商業應用系統設計資料模型。）

---

## 2. 🎯 考試學習目標（Learning Objectives）

考官會測試以下核心能力（附英文對照）：

1. **分辨 NoSQL 四大類型** — 能夠描述每種 NoSQL database 嘅儲存結構並舉例。
   - *Describe the four types of NoSQL databases: key-value, document, wide-column, and graph databases.*
2. **掌握 Document Database 專用術語** — 能準確對應 Database / Collection / Document / Field 同 RDBMS 嘅概念。
   - *Explain the terminology in document databases and map each term to its relational counterpart.*
3. **識別並書寫 JSON 結構** — 能分辨 Object（`{}`）與 Array（`[]`），正確寫出 name-value pairs、巢狀（nesting）JSON。
   - *Construct and interpret JSON documents, including objects, arrays, and nested structures.*
4. **解釋 JSON 與 BSON 嘅分別** — 說明 BSON 嘅特性（binary、編碼 type 同 length）同 MongoDB 點解用 BSON。
   - *Distinguish JSON from BSON and explain why MongoDB stores data in BSON format.*
5. **理解 Primary Key / `_id` 機制** — 知道 MongoDB 用 ObjectId 做全域唯一 ID，系統會自動生成 `_id`。
   - *Explain how MongoDB assigns a global unique ObjectId as the primary key (_id).*
6. **分析文件關係建模嘅三種方法** — 內嵌（Embedding）、父存子 ID、子存父 ID，能講出各自優缺點。
   - *Compare the three approaches to modeling relationships: embedding child documents, storing child IDs in the parent, and storing the parent ID in children.*
7. **背誦 BSON 類型編號與別名** — 熟記 Double=1、String=2、ObjectId=7、Boolean=8、Int=16、Long=18、Decimal128=19 等關鍵編號。
   - *Recognize BSON types by their type number and alias.*
8. **應用 Mongo Shell 包裝方法** — 知道 `Date()`、`new Date(...)`、`ISODate(...)`、`ObjectId()`、`NumberLong()`、`NumberInt()`、`NumberDecimal()` 各自回傳咩類型。
   - *Use the Mongo Shell wrapper methods to construct values of specific BSON types.*

---

## 3. 📖 雙語深度理論知識點（Comprehensive Notes）

### 3.1 NoSQL 資料庫四大類型（Types of NoSQL Database）

NoSQL（Not Only SQL）唔係單一產品，而係一類唔跟傳統關聯式表格模型嘅資料庫總稱。教材列出四大類型：

#### 3.1.1 Key-value Databases（鍵值型資料庫）

**機制解說：** 最簡單嘅 NoSQL 類型。每項資料（item）由一個 key 同一個 value 組成，就好似一個巨大嘅字典（dictionary）。要注意嘅重點係：**value 通常只能靠 key 去攞返出嚟（retrieve by key）**，冇辦法好似 SQL 咁「SELECT ... WHERE 某個欄位」去搜尋 value 入面嘅內容。而且 key **唔係**關聯式資料庫入面嘅「欄位（field）」概念——唔好混淆。

> **Key-value database:** The simplest type of NoSQL database in which each item contains keys and values; a value can typically only be retrieved by its key.

> **Key is not a field in relational database** — the key in a key-value store is a lookup identifier, not a column attribute.

#### 3.1.2 Document Databases（文件型資料庫）

**機制解說：** 每份文件（document）包含多對「欄位（field）與值（value）」。值嘅類型非常多樣化，可以係字串、數字、布林值，甚至係陣列（array）或物件（object）——即係支援巢狀結構。MongoDB 就係最著名嘅 Document database。

> **Document database:** A NoSQL database in which each document contains pairs of fields and values; the values can typically be a variety of types including strings, numbers, booleans, arrays, or objects.

#### 3.1.3 Wide-column Stores（寬行型資料庫）

**機制解說：** 資料以表（table）、行（row）同**動態欄位（dynamic columns）**儲存。同關聯式表最大分別係欄位可以逐行唔同（動態），唔使預先定義死 schema。代表例子有 Cassandra、HBase。

> **Wide-column store:** A NoSQL database in which data are stored in tables, rows, and dynamic columns.

#### 3.1.4 Graph Databases（圖型資料庫）

**機制解說：** 資料以**節點（nodes）同邊（edges）**儲存。節點代表實體（例如人、公司），邊代表實體之間嘅關係，最適合做社交網絡、推薦系統呢類「關係密集」嘅查詢。

> **Graph database:** A NoSQL database in which data are stored in nodes and edges.

📌 **對比記憶（四大類型速記）：** Key-value = 字典查找；Document = JSON 文件；Wide-column = 動態欄位嘅表；Graph = 節點 + 邊。

---

### 3.2 Document Database 專用術語（Terminology in Document Databases）

呢部分係高頻名詞題，一定要識得逐個定義同埋同 RDBMS 對照：

| 術語 | 中文解釋 | 與 RDBMS 對照 |
|------|----------|---------------|
| **Database** | 資料儲存嘅邏輯結構（logical structure of the data storage） | Database |
| **Collection** | 一組相關嘅資料，近似 RDBMS 嘅 Table | Table |
| **Document** | Collection 嘅實例（instance），**可以冇相同 schema** | Row / Tuple |
| **Field** | 文件嘅一個屬性 | Column / Attribute |
| **Relationship** | 文件之間基於互動建立嘅邏輯連繫 | Relationship / Foreign Key |

**機制解說：** 同關聯式最大嘅分別喺「Documents 係 Collection 嘅 instances，而且 may not have the same schema」——即係同一 collection 入面，每份文件可以有唔同嘅欄位組合，唔似 RDBMS 強制每行同一欄位結構。相關文件（related document）可以放喺**獨立 collection**，或者以**嵌入式文件（Embedded Document）**放喺同一個 collection 入面（詳見 3.5.2）。

> **Database:** A logical structure of the data storage.

> **Collection:** A set of related data which is similar to a Table in RDBMS.

> **Document:** An instance of a Collection that may not have the same schema.

> **Field:** An attribute of a document.

> **Relationship:** A logical connection between documents established based on interaction among these documents. Related documents can be stored in a separate collection or in the same collection as an Embedded Document.

---

### 3.3 關聯式模型對照範例（DB Example in Relational Model）

教材用學校資料庫做例子，等你睇清楚 RDBMS 嘅結構先，之後先對比 Document model：

**Programme 表（Relation）**

| pgmCode | name | level | semesters |
|---------|------|-------|-----------|
| IT114105 | HD in Software Engineering | 4 | 5 |
| IT114122 | HD in Cybersecurity | 4 | 5 |
| IT114124 | HD in AI and Smart Technology | 4 | 5 |

**Student 表（Relation）**

| stdNo | name | address | gender | DOB | phone | email | programme |
|-------|------|---------|--------|-----|-------|-------|-----------|
| 200123456 | AU Tse Lok | 7F, Che Kung Miu Rd | M | 3/10/01 | 65346979 | autselok@mail.hk | IT114122 |
| 200123789 | Li Haotian | 3B, 5 Pei Ho Street | M | 31/5/02 | 39397506 | liht@me.com | IT114124 |
| 200456789 | Mak Yuen Man | 23A Chung Mei Road | F | 26/7/01 | 92806403 | mym@i.am.me.com | IT114124 |
| 190321654 | YEU Shum | 11, Ting Kok Road | F | 12/8/00 | 82766629 | i@yeushum.com | IT114122 |

**機制解說：**
- **Relation（關係）**：即一張表，例如 Programme 表、Student 表。
- **Tuple（元組）**：表入面嘅一行，代表一個實體（一位學生）。
- **Attribute（屬性）**：表嘅一個欄位（例如 `stdNo`、`name`）。
- **Relationship（關係連繫）**：Student 表嘅 `programme` 欄位（外鍵）指向 Programme 表嘅 `pgmCode`，表達「一個學生屬於一個課程」。

> **Relational model terms:** A relation is a table, a tuple is a row, an attribute is a column, and a relationship is the logical connection between tables established via foreign keys.

呢個例子嘅作用係：下一節你會見到同一批資料點樣喺 Document database 入面用 JSON 文件表達，以及點樣透過內嵌／引用去代替外鍵 JOIN。

---

### 3.4 Document 資料編碼格式：JSON 與 BSON

#### 3.4.1 JSON（JavaScript Object Notation）簡介

**機制解說：** Document database 嘅文件會用標準格式編碼，最常見就係 JSON 同 BSON。JSON 係一種輕量（lightweight）、完全語言無關（language independent）嘅資料交換格式，支援基本資料類型：數字（numbers）、字串（strings）、布林值（Boolean values）。JSON 建基於兩個結構：**Object（物件）**同 **Array（陣列）**。

> **JSON:** JavaScript Object Notation is a common lightweight data-interchange format that is completely language independent and supports basic data types such as numbers, strings, and Boolean values.

> **Object:** An unordered set of name/value pairs.

> **Array:** An ordered list of values.

#### 3.4.2 JSON – Name-value Pairs（名值對）

**機制解說（語法規則）：**
1. 每個欄位名（field name）後面跟一個**冒號 `:`**。
2. Value 可以係：雙引號括住嘅字串、數字、`true`、`false`、`null`、一個物件（object）或一個陣列（array）。

**教材例子：**

```javascript
"pgmCode": "IT114124"     // 字串值，用雙引號
"level": 4                // 數字值
"pass": true              // 布林值 true
"isVIP": false            // 布林值 false
"interest": null          // 空值 null
```

> **Name-value pair:** Each field name is followed by a colon (:); the value can be a string in double quotes, a number, true, false, null, an object, or an array.

#### 3.4.3 JSON – Object（物件）

**機制解說（語法規則）：**
1. Object 用**大括號 `{ }`** 包住（喺 NoSQL 入面，Object 就等於一份 Document）。
2. 多個 name-value pairs 之間用**逗號 `,`** 分隔。

**教材例子：**

```javascript
// 單一 name-value pair
{ "pgmCode": "IT114124" }

// 多個 name-value pairs
{
  "pgmCode": "IT114124",
  "pgmName": "HD in AI and Smart Technology",
  "level": 4,
  "semesters": 5
}
```

> **Object (Document in NoSQL):** An object is enclosed with curly brackets { }; name-value pairs inside an object are separated by commas (,).

#### 3.4.4 JSON – Array（陣列）

**機制解說（語法規則）：**
1. Array 用**方括號 `[ ]`** 包住。
2. Array 內嘅項目用逗號 `,` 分隔。
3. **重點：項目唔一定要同一種資料類型／同一 schema**（可以混合字串、數字、物件）。

**教材例子：**

```javascript
// 混合類型陣列（indices 0, 1, 2）
["A", 1, "C"]

// 陣列內含 3 個物件
[
  { "pgmCode": "IT114124" },
  {
    "pgmCode": "IT114124",
    "pgmName": "HD in AI and Smart Technology"
  },
  {
    "pgmCode": "IT114122",
    "level": 4
  }
]
```

> **Array:** An array is enclosed with square brackets [ ]; array items are separated by commas (,) and are not necessarily of the same data type or schema.

#### 3.4.5 JSON – Nesting（巢狀結構）

**機制解說：** JSON 支援無限層級嘅巢狀：object 入面可以有 object，object 入面可以有 array，array 入面又可以有 object…… 教材例子係一個被線上 JSON parser（如 http://json.parser.online.fr/）解析嘅結構，層次為 object → object → object → array。呢個特性令 Document database 可以直接用一份文件表達「一對多」關係，而唔使拆表。

> **Nesting:** JSON structures can be nested — an object can contain objects and arrays, and arrays can contain objects — allowing a single document to represent complex hierarchical data.

**巢狀實作範例（把 programme 內嵌喺 student 入面）：**

```javascript
{
  "stdNo": "200123456",
  "name": "AU Tse Lok",
  "programme": {
    "pgmCode": "IT114122",
    "pgmName": "HD in Cybersecurity",
    "level": 4
  }
}
```

#### 3.4.6 BSON（Binary JSON）

**機制解說：** BSON 係 MongoDB 發明嘅二進制 JSON。佢嘅 binary structure 會**編碼 type（類型）同 length（長度）資訊**。MongoDB 無論喺**內部（internal：indexing 索引同 querying 查詢）**定係**透過網絡傳輸（over the network）**都係用 BSON 格式儲存資料。

> **BSON (Binary JSON):** Binary JSON was invented by MongoDB; its binary structure encodes type and length information. MongoDB stores data in BSON format both internally (for indexing and querying) and over the network.

📌 **JSON vs BSON 必考對比：**

| 比較點 | JSON | BSON |
|--------|------|------|
| 格式 | 純文字（text） | 二進制（binary） |
| 發明者 | 通用標準 | MongoDB |
| 額外資訊 | 只有資料本身 | 編碼 type 同 length 資訊 |
| MongoDB 用途 | 文件交換格式 | 內部儲存、索引、查詢、網絡傳輸 |

---

### 3.5 Keys 與 Relationship（鍵與關係）

#### 3.5.1 Primary Key / ID（主鍵 / `_id`）

**機制解說：** 喺 MongoDB，每份文件（object）都有一個**全域唯一 ID（global unique ID）**，資料類型係 **ObjectId**。如果你建立文件時**冇提供 ID，系統會自動生成一個新 ID 並命名為 `_id`**。教材例子：建立一份只含 `pgmCode` 同 `pgmName` 嘅文件，MongoDB 會自動加上 `_id`（喺 List View 同 JSON View with MongoDB Extended JSON 都會見到）。

```javascript
// 你輸入嘅文件
{ "pgmCode": "IT114124", "pgmName": "HD in AI and Smart Technology" }

// MongoDB 儲存時自動加入 _id（ObjectId）
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "pgmCode": "IT114124",
  "pgmName": "HD in AI and Smart Technology"
}
```

> **Primary Key / ID:** In MongoDB, each object has a global unique ID in the ObjectId data type; the system can generate a new ID (_id) automatically if it is omitted.

#### 3.5.2 Relationship：文件關係建模三種方法（考試必出比較題）

教材以「一個 Programme 有好多 Student，一個 Student 屬於一個 Programme」做例子，介紹三種方法：

**方法一：Embedded Documents（內嵌文件）— Relationship (1)**
- 子文件（child documents，例如 Student）可以直接**內嵌（embedded）喺父文件（parent document，例如 Programme）入面**。
- 子文件**未必需要 ID（Id may not be required for child document）**。
- 缺點：內嵌文件可能令 collection 變得**好大（create a big collection）**，而且會產生**額外嘅寫入操作（additional write operations）**（因為父文件每次更新都要連埋成個大文件一齊寫）。

```javascript
// Programme collection：學生內嵌喺課程文件入面
{
  "_id": ObjectId("..."),
  "pgmCode": "IT114122",
  "pgmName": "HD in Cybersecurity",
  "students": [
    { "stdNo": "200123456", "name": "AU Tse Lok" },
    { "stdNo": "190321654", "name": "YEU Shum" }
  ]
}
```

> **Relationship (1) – Embedding:** Child documents can be embedded in the parent documents; an ID may not be required for a child document. However, an embedded document may create a big collection and additional write operations.

**方法二：Child IDs stored in Parent（父文件存子文件 ID）— Relationship (2)**
- 子文件（Student）儲存喺**獨立 collection（separate collection）**。
- 父文件（Programme）入面儲存子文件嘅 **ID（ids of child documents）**，例如 `studentIds: [...]`。
- **考官必問：「What is the main disadvantage?」**——因為 MongoDB **冇 JOIN**，要取得某課程嘅所有學生，你必須**先查 Programme collection 攞到學生 ID 陣列，再向 Students collection 發出另一次（甚至多次）查詢**，即係需要額外嘅查詢往返（additional queries / more round trips），效能比一次過攞齊資料差。

```javascript
// Programme collection（父文件存子 ID）
{
  "_id": ObjectId("..."),
  "pgmCode": "IT114122",
  "studentIds": [ObjectId("s1"), ObjectId("s2")]
}

// Students collection（獨立 collection）
{ "_id": ObjectId("s1"), "stdNo": "200123456", "name": "AU Tse Lok" }
{ "_id": ObjectId("s2"), "stdNo": "190321654", "name": "YEU Shum" }
```

> **Relationship (2) – Child IDs in parent:** Child documents can be stored in a separate collection, and the IDs of the child documents are stored in the parent document. The main disadvantage is that retrieving the related child documents requires additional queries, because MongoDB does not support JOIN operations.

**方法三：Parent ID stored in Child（子文件存父文件 ID）— Relationship (3)**
- 反方向做法：每份**子文件（Student）儲存父文件（Programme）嘅 ID**，例如 `programmeId` 欄位。
- 好處：寫入時只需更新子文件，唔使改動大嘅父文件；但攞「一個課程嘅全部學生」一樣要透過額外查詢（先搵 programme，再查所有 `programmeId` 等於佢嘅學生）。

```javascript
// Students collection（子文件存父 ID）
{
  "_id": ObjectId("s1"),
  "stdNo": "200123456",
  "name": "AU Tse Lok",
  "programmeId": ObjectId("...")   // 指向 Programme 文件
}
```

> **Relationship (3) – Parent ID in child:** Alternatively, child documents can store the ID of the parent document (e.g., a `programmeId` field) to express the relationship.

📌 **三方法對照表（必背）：**

| 方法 | 做法 | 子文件要 ID 嗎？ | 優點 | 缺點 |
|------|------|------------------|------|------|
| 1. Embedding | 子文件內嵌喺父文件 | 唔使 | 一次查詢攞晒所有資料，讀取快 | Collection 變大、額外寫入操作 |
| 2. Child IDs in parent | 父文件存子文件 ID 陣列 | 要 | 文件細、冇重複資料 | 攞關聯資料要額外多次查詢（冇 JOIN） |
| 3. Parent ID in child | 子文件存父文件 ID | 要 | 容易由子向父查找、寫入細 | 由父查所有子仍要額外查詢 |

---

### 3.6 MongoDB BSON 資料類型總表（BSON Type）

**機制解說：** MongoDB 嘅每種 BSON 類型都有一個 **Type Number（類型編號）**同一個 **Alias（別名，字串）**。考試常考編號同別名嘅配對，尤其係粗體嗰啲常用類型。

| Type（類型） | Type Number（編號） | Alias（別名） |
|--------------|---------------------|---------------|
| Double | 1 | `"double"` |
| **String** | **2** | `"string"` |
| **Object** | **3** | `"object"` |
| **Array** | **4** | `"array"` |
| Binary data | 5 | `"bindata"` |
| **ObjectId** | **7** | `"objectId"` |
| **Boolean** | **8** | `"bool"` |
| **Date** | **9** | `"date"` |
| **Null** | **10** | `"null"` |
| Regular Expression | 11 | `"regex"` |
| JavaScript | 13 | `"javascript"` |
| **32-bit integer** | **16** | `"int"` |
| Timestamp | 17 | `"timestamp"` |
| **64-bit integer** | **18** | `"long"` |
| **Decimal128** | **19** | `"decimal"` |
| Min key | -1 | `"minKey"` |
| Max key | 127 | `"maxKey"` |

> **BSON types:** Each BSON data type in MongoDB has a type number and an alias, for example Double (1, "double"), String (2, "string"), ObjectId (7, "objectId"), Boolean (8, "bool"), Date (9, "date"), 32-bit integer (16, "int"), 64-bit integer (18, "long"), and Decimal128 (19, "decimal").

📌 **易混淆提醒：** 類型編號**唔係連續**嘅——6（無）、12（無）、14、15（無）、20–126 都係空嘅，得 Min key（-1）同 Max key（127）係特別編號。記住口訣：「1 2 3 4 5，7 8 9 10 11，13，16 17 18 19，-1 同 127」。

---

### 3.7 Mongo Shell 包裝方法（Wrapper Methods for Types）

**機制解說：** 喺 Mongo Shell 入面，你可以用特定嘅 wrapper methods（包裝方法）去建立指定 BSON 類型嘅值。要記住**每個方法回傳咩類型（Return）**：

| Supporting Method（方法） | Return（回傳類型） |
|---------------------------|--------------------|
| `Date()` | 當前日期以**字串**形式（Current date as a string） |
| `new Date(...)` | **Date object** |
| `ISODate(...)` | **Date object** |
| `ObjectId()` | **ObjectId** |
| `NumberLong(...)` | **Long**（64-bit integer） |
| `NumberInt(...)` | **Int**（32-bit integer） |
| `NumberDecimal(...)` | **Decimal**（Decimal128） |

**使用範例：**

```javascript
// 喺 Mongo Shell 建立各類型值
Date()                     // 回傳字串："Wed Mar 01 2026 ..."
new Date("2026-03-01")     // 回傳 Date object
ISODate("2026-03-01T00:00:00Z")  // 回傳 Date object
ObjectId()                 // 回傳一個自動生成嘅 ObjectId
NumberLong(9999999999)     // 回傳 Long（64-bit integer）
NumberInt(42)              // 回傳 Int（32-bit integer）
NumberDecimal("19.99")     // 回傳 Decimal（Decimal128）
```

> **Mongo Shell wrapper methods:** `Date()` returns the current date as a string, `new Date(...)` and `ISODate(...)` return Date objects, `ObjectId()` returns an ObjectId, `NumberLong(...)` returns a Long, `NumberInt(...)` returns an Int, and `NumberDecimal(...)` returns a Decimal.

📌 **必考陷阱：** `Date()` 同 `new Date()` 回傳嘅嘢**唔一樣**——前者係字串，後者係 Date object。考試問「Which method returns a Date object?」答案係 `new Date(...)` 同 `ISODate(...)`。

---

## 4. 📖 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| **Key-value database** | 最簡單嘅 NoSQL，每項由 key 同 value 組成，value 只能靠 key 攞返出嚟 | "A key-value database is the simplest type of NoSQL database in which each item contains keys and values; a value can typically only be retrieved by key." |
| **Document database** | 以文件為單位，每份文件包含 field-value pairs，值可以係多種類型 | "A document database stores data in documents, each containing pairs of fields and values; the values can be strings, numbers, booleans, arrays, or objects." |
| **Wide-column store** | 資料儲喺表、行同動態欄位入面 | "A wide-column store stores data in tables, rows, and dynamic columns." |
| **Graph database** | 資料用節點同邊儲存，適合表達實體關係 | "A graph database stores data in nodes and edges." |
| **Database** | 資料儲存嘅邏輯結構 | "A database is a logical structure of the data storage." |
| **Collection** | 一組相關嘅資料，等於 RDBMS 嘅 Table | "A collection is a set of related data which is similar to a Table in RDBMS." |
| **Document** | Collection 嘅實例，可以冇相同 schema | "A document is an instance of a Collection that may not have the same schema." |
| **Field** | 文件嘅一個屬性，等於欄位 | "A field is an attribute of a document." |
| **Relationship** | 文件之間嘅邏輯連繫 | "A relationship is a logical connection between documents established based on interaction among them." |
| **Embedded Document** | 內嵌喺父文件入面嘅子文件，可以冇 ID | "An embedded document is a child document stored inside the parent document; an ID may not be required for it." |
| **JSON** | 輕量、語言無關嘅資料交換格式 | "JSON is a common lightweight data-interchange format that is completely language independent." |
| **Object** | 一組無序嘅 name/value pairs，用 `{}` | "A JSON object is an unordered set of name/value pairs enclosed with curly brackets." |
| **Array** | 一組有序嘅值，用 `[]`，項目可以唔同類型 | "A JSON array is an ordered list of values enclosed with square brackets; the items are not necessarily of the same data type or schema." |
| **Name-value pair** | 欄位名加冒號加值 | "Each field name is followed by a colon, and the value can be a string, a number, true, false, null, an object, or an array." |
| **Nesting** | JSON 物件/陣列互相嵌入嘅層級結構 | "JSON supports nesting: an object can contain objects and arrays, allowing hierarchical data in one document." |
| **BSON (Binary JSON)** | MongoDB 發明嘅二進制格式，編碼 type 同 length 資訊 | "BSON is a binary structure invented by MongoDB that encodes type and length information." |
| **ObjectId** | MongoDB 嘅全域唯一 ID 資料類型 | "In MongoDB, each object has a global unique ID in the ObjectId data type." |
| **_id** | 系統自動生成嘅主鍵 | "The system can generate a new ID (_id) automatically if it is omitted." |
| **Embedding** | 方法一：子文件內嵌喺父文件 | "Child documents can be embedded in the parent documents, but this may create a big collection and additional write operations." |
| **Referencing (child IDs in parent)** | 方法二：父文件存子文件 ID | "Child documents can be stored in a separate collection and their IDs are stored in the parent document; the main disadvantage is that extra queries are needed because MongoDB has no JOIN." |
| **Referencing (parent ID in child)** | 方法三：子文件存父文件 ID | "Alternatively, child documents can store the ID of the parent document to express the relationship." |
| **BSON type number / alias** | 每種 BSON 類型嘅編號同別名 | "Each BSON type has a type number and an alias, e.g. ObjectId is type 7 with alias 'objectId'." |
| **`Date()` vs `new Date()`** | 前者回傳字串，後者回傳 Date object | "Date() returns the current date as a string, while new Date(...) and ISODate(...) return Date objects." |
| **`NumberLong()` / `NumberInt()` / `NumberDecimal()`** | Shell 包裝方法，分別回傳 Long / Int / Decimal | "NumberLong(...) returns a Long, NumberInt(...) returns an Int, and NumberDecimal(...) returns a Decimal." |
| **MILO** | 模組預期學習成果 | "Students are expected to apply database design techniques to design data models used in business application systems." |

---

## 5. 🗺️ 循序漸進學習路線（Learning Path）

**主題一：NoSQL 四大類型**
1. **先理解：** 四大類型各自用咩結構儲資料（key-value / document / wide-column / graph）。
2. **再背誦：** "the simplest type of NoSQL database"、"data are stored in tables, rows, and dynamic columns"、"data are stored in nodes and edges"。
3. **再掌握：** 見到描述（如「每項有 key 同 value」）可以即時對應返係邊類型。
4. **能解答：** "What are the four types of NoSQL databases and how do they store data?"（逐類型寫定義句）。

**主題二：Document Database 術語**
1. **先理解：** Collection 唔似 Table 咁強制 schema，Document 可以唔同 schema。
2. **再背誦：** "A collection is a set of related data which is similar to a Table in RDBMS."、"A document is an instance of a Collection that may not have the same schema."。
3. **再掌握：** 用 3.3 嘅學校例子做對照，將 Programme/Student 表轉做 Collection/Document/Field。
4. **能解答：** "Explain the terms database, collection, document and field in a document database."（連 RDBMS 對照一齊答）。

**主題三：JSON 寫法**
1. **先理解：** Object 用 `{}`、Array 用 `[]`、pairs 用逗號分隔、值嘅六種可能。
2. **再背誦：** "an unordered set of name/value pairs"（Object）、"an ordered list of values"（Array）。
3. **再掌握：** 識手寫 name-value pairs、巢狀 object、陣列內含多個 object；識分辨教材 3.4.2–3.4.5 嘅例子。
4. **能解答：** "Write a JSON document to represent ..."（按題目欄位砌 JSON）、"Distinguish an object and an array in JSON."。

**主題四：JSON vs BSON**
1. **先理解：** BSON 係二進制、編碼 type 同 length、MongoDB 內部同網絡傳輸都用佢。
2. **再背誦：** "BSON provides a binary structure that encodes type and length information."。
3. **再掌握：** 記熟 BSON 類型編號（2=String, 3=Object, 4=Array, 7=ObjectId, 8=Boolean, 9=Date, 16=int, 18=long, 19=decimal）。
4. **能解答：** "Why does MongoDB store data in BSON instead of JSON?"（答 binary、type/length 資訊、效能）。

**主題五：Keys and Relationship**
1. **先理解：** MongoDB 自動生成 `_id`（ObjectId）；冇 JOIN，所以關係要靠內嵌或引用。
2. **再背誦：** "The system can generate a new ID (_id) if omitted."、三方法各自一句定義（見第 4 部分表格）。
3. **再掌握：** 識畫出三種方法嘅 JSON 範例（嵌入式、父存子 ID、子存父 ID）並講缺點。
4. **能解答：** "What is the main disadvantage of storing child IDs in the parent document?"（答：需要額外查詢，因冇 JOIN）。

**主題六：Mongo Shell 包裝方法**
1. **先理解：** 每種 wrapper method 對應一種 BSON 類型。
2. **再背誦：** "Date() returns a string; new Date(...) and ISODate(...) return Date objects; ObjectId() returns an ObjectId."。
3. **再掌握：** 默寫 `NumberLong`/`NumberInt`/`NumberDecimal` 回傳 Long/Int/Decimal。
4. **能解答：** "Which Mongo Shell method returns a Date object?"（`new Date(...)` / `ISODate(...)`）。

---

## 6. 🎒 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 🔢 關鍵數字（BSON Type Numbers — 必背）

| 1 Double | 2 String | 3 Object | 4 Array | 5 Binary | 7 ObjectId | 8 Boolean | 9 Date | 10 Null | 11 Regex | 13 JavaScript | 16 Int | 17 Timestamp | 18 Long | 19 Decimal128 | -1 MinKey | 127 MaxKey |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `"double"` | `"string"` | `"object"` | `"array"` | `"bindata"` | `"objectId"` | `"bool"` | `"date"` | `"null"` | `"regex"` | `"javascript"` | `"int"` | `"timestamp"` | `"long"` | `"decimal"` | `"minKey"` | `"maxKey"` |

**口訣：** 「1 2 3 4 5，7 8 9 10 11，13，16 17 18 19；負一同百廿七。」（6、12、14、15 冇編號）

### 📊 語法對照表

**RDBMS ↔ Document Database：**

| RDBMS | Document Database (MongoDB) |
|-------|------------------------------|
| Table | Collection |
| Row / Tuple | Document |
| Column / Attribute | Field |
| Foreign Key + JOIN | Embedded Document 或 ID Referencing |
| 強制統一 schema | Documents may not have the same schema |

**JSON 語法速記：**

| 結構 | 符號 | 規則 |
|------|------|------|
| Object | `{ }` | 無序 name/value pairs，逗號分隔 |
| Array | `[ ]` | 有序值，逗號分隔，可混合類型 |
| Name-value pair | `"name": value` | 名後跟冒號；值可為 string/number/`true`/`false`/`null`/object/array |

**Relationship 三方法速記：**

| 方法 | 一句英文 | 最大缺點 |
|------|----------|----------|
| Embedding | Child docs embedded in parent | Big collection + additional write operations |
| Child IDs in parent | IDs of children stored in parent | Extra queries required (no JOIN) |
| Parent ID in child | Children store the parent ID | Reverse lookup still needs a query |

### 🇬🇧 英文極速記憶口訣（Memory Mnemonics）

1. **四大類型：** "**K**eys, **D**ocuments, **W**ide columns, **G**raphs" → 記 **KDWG**（「快啲唔該」）。
2. **JSON 兩結構：** "**O**bject = **{ }** 無序；**A**rray = **[ ]** 有序" → 記 **OA**。
3. **BSON 係咩：** "**B**inary + **type** + **length**" → 一句背晒 BSON 三大賣點。
4. **Shell 方法回傳：** "`Date()` → **S**tring；`new Date()` / `ISODate()` → **D**ate object；`ObjectId()` → **O**bjectId；`NumberLong` → **L**ong、`NumberInt` → **I**nt、`NumberDecimal` → **D**ecimal" → 記 **S-D-O / L-I-D**。
5. **冇 JOIN：** "MongoDB has **no JOIN** → relationships need **embedding or referencing**" → 見到「關係」題一定寫呢句開頭。

### ⏱️ 最後 60 秒檢查清單
- [ ] 識默寫四類型定義句（key-value / document / wide-column / graph）
- [ ] 識對照 Collection = Table、Document = Row、Field = Column
- [ ] 識寫一個巢狀 JSON（object 內嵌 array）
- [ ] 識講 BSON 編碼 type + length、MongoDB 內部同網絡都用
- [ ] 識講 `_id` 自動生成、ObjectId 全域唯一
- [ ] 識答「child IDs in parent 嘅 main disadvantage = extra queries（冇 JOIN）」
- [ ] 識默寫 ObjectId=7、Boolean=8、Date=9、Int=16、Long=18、Decimal=19
