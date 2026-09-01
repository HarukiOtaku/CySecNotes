# ITP4456 Chapter 7: NoSQL – Basic Data Manipulation — 雙語應考學習指南

> **來源**：ITP4456 Database Applications — Chapter 7: NoSQL – Basic Data Manipulation
> **原始檔**：`01_Raw_Materials/Lectures/Chp7 NoSQL Basic Data Manipulation(v2).pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 每個 MongoDB 指令自己喺 `mongosh` 默寫一次（先蓋住答案）→ 對照每個範例嘅 SQL 等價寫法 → 用最後嘅 Cheat Sheet 做考前衝刺

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本章是 NoSQL 課程嘅「動手核心」——**NoSQL Basic Data Manipulation**。承接 Chapter 6 學過嘅 NoSQL Data Model（Document／Collection 概念），本章正式教你用 **MongoDB** 嘅指令去**執行資料庫操作（perform database operations）**：由建立資料庫、建立集合（collection）、查詢文件（document）、到插入、更新、刪除資料。同 SQL（Chapter 4）嘅核心分別係：NoSQL 用 **BSON 文件（document）** 儲存資料、用 **JavaScript 風格嘅方法（method）** 操作（`db.<collection>.<method>(...)`）、支援**嵌入式文件（embedded documents）**同**陣列（arrays）**——所以本章新增咗 SQL 冇嘅概念：`$elemMatch`、`$all`、`$size`、dot notation、projection 等。每條 MongoDB 指令旁邊，教材都附上對應嘅 SQL 等價寫法，方便你對照記憶。

技術重點有三大塊：第一，**Query Document（讀取）**——由 `db.Employee.find()` 出發，學識條件查詢（等值、比較運算子 `$gt/$gte/$lt/$lte`、`$ne/$in/$nin`、`$and/$or`、正則表達式 regex、`$exists` 存在性檢查）、**Projection（投影，揀選輸出欄位）**、`.sort()` 排序、`distinct()` 去重；第二，**Query Array（陣列查詢）**——`["red","blank"]` 精確匹配、`$all`、單元素匹配、`$size`；第三，**Query Embedded Document（嵌入式文件查詢）**——dot notation（如 `"order_line.quantity"`）同 `$elemMatch`；最後係 **Insert / Update / Delete（寫入操作）**——`insertOne`／`insertMany`、`deleteMany`／`deleteOne`、`updateMany`／`updateOne`（配 `$set`、`$inc`、`$mul`、`$rename`、`$unset`）。

實務情境一：電商後台（好似教材嘅 Ordering 傢俬店）——一張訂單會**嵌入（embed）** `order_line` 陣列，入面每個元素用 `ObjectId` 引用（reference）產品，並記錄 `quantity`。日常維護要查「所有包含 quantity=2 嘅訂單」就用 dot notation `db.Orders.find({ "order_line.quantity": 2 })`；要為某間郵政編號嘅客戶一次過改地址，就用 `db.Customer.updateMany({ postal_code: 999077 }, { $set: { customer_address: "new address" } })`——呢啲就係典型嘅 NoSQL 文件資料庫讀寫流程。

實務情境二：HR 薪酬系統——MongoDB 入面用 `NumberDecimal("26000")` 精確儲存金額（避免浮點誤差），出糧時要幫全體員工加 $3000 人工，一條 `db.Employee.updateMany({}, { $inc: { salary: 3000 } })` 就搞掂（等價 SQL：`UPDATE Employee SET salary = salary + 3000`）；查「邊啲員工人工大過 10000」用 `db.Employee.find({ salary: { $gt: 10000 } })`。另外，做資料清理時可以用 `$rename` 改欄位名、`$unset` 刪走多餘欄位。掌握本章，你就能喺應用程式中真正「讀寫」一個 NoSQL 資料庫。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **建立與刪除資料庫／集合** — Create and use a database (`use`), create collections explicitly, drop a collection or a database
2. **執行基本讀取** — Use `find()` / `findOne()` with conditions in BSON format; know that the order of clauses cannot be changed and names are case sensitive
3. **應用比較運算子** — Apply comparison operators `$gt`, `$gte`, `$lt`, `$lte`, `$eq`, `$ne`, `$in`, `$nin`
4. **組合條件** — Combine conditions with implicit AND, explicit `$and` / `$or`, and `$in` for the same field
5. **使用正則表達式** — Match patterns with regular expressions (`/Drawer/`, `/^L/`, `/r$/`, `/\w{2}a/`, `/\d Tian/`)
6. **存在性檢查** — Check whether a field exists or is null with `{ field: null }` and `$exists`
7. **投影欄位** — Project fields with `{ field: 1 }` / `{ field: 0 }`, including how to exclude `_id`
8. **排序與去重** — Sort results with `.sort({ field: -1 | 1 })` and get distinct values with `.distinct(field)`
9. **查詢陣列** — Match arrays exactly (order matters), with `$all`, by a single element, and by `$size`
10. **查詢嵌入式文件** — Query embedded documents/arrays with quoted dot notation and `$elemMatch`
11. **插入文件** — Insert documents with `insertOne` / `insertMany` and explain `_id` auto-generation and the duplicate key error (E11000)
12. **刪除文件** — Delete documents with `deleteMany` / `deleteOne` and interpret `deletedCount`
13. **更新文件** — Update with `updateMany` / `updateOne` using `$set`, `$inc`, `$mul`, `$rename`, `$unset`, and interpret `matchedCount` / `modifiedCount` / `upsertedCount`
14. **SQL ↔ MongoDB 對照** — Translate between MongoDB operations and equivalent SQL statements

## 📖 3. 雙語深度理論知識點（Comprehensive Notes — 應考完全替代版）

### 3.1 模組學習成果與樣本資料（Sample Data）

#### 3.1.1 Module Intended Learning Outcome（MILO）

繁中解說：本模組嘅整體學習成果係「執行資料庫操作，去實現資料模型，並喺應用程式中操作資料」——即係將 Chapter 6 設計好嘅 NoSQL data model，用 MongoDB 指令實際建立（create）、讀取（read）、更新（update）、刪除（delete）資料。本章就係 NoSQL DML 嘅第一炮：Basic Data Manipulation（進階操作喺 Chapter 8）。

> English Standard Definitions:
> - "On completion of the module, students are expected to be able to: perform database operations to implement data models and manipulate data in the applications."

#### 3.1.2 Sample Data in MongoDB — Employee（員工）

繁中解說：教材用「Ordering（傢俬訂單）」資料庫做示範。`Employee` 集合嘅一份文件（document）長這樣——每個文件都有一個 `_id` 欄位，由系統自動生成，類型係 `ObjectId`（如 `ObjectId("5f34cba4d02f2223c0b952e1")`）；金額用 `NumberDecimal("26000")` 儲存（字串包住數字，確保十進制精確）。重點：**如果業務上本身有真實嘅主鍵（Primary Key），就應該保留**——呢度 `emp_id: 301` 就係業務主鍵，所以保留喺文件中；反之，如果業務上冇需要嘅 ID（例如 `product_id`），就唔好無中生有。

```javascript
{
  "_id": ObjectId("5f34cba4d02f2223c0b952e1"),
  "emp_id": 301,
  "lastname": "Ngai",
  "firstname": "Eric",
  "title": "Manager",
  "salary": NumberDecimal("26000")
}
```

> English Standard Definitions:
> - "Primary Key Retained if it is real information in the business."
> - "Each document has an `_id` field; if omitted, MongoDB generates an ObjectId automatically."

#### 3.1.3 Sample Data in MongoDB — Product（產品）

繁中解說：`Product` 集合嘅文件——留意呢度**假設 Product_id 喺現實世界並唔必要（Assume Product_id is not necessary in the real world）**，所以文件冇自訂 product id，直接用系統 `_id`。另外，**唔係每份文件都一定要有相同欄位**：第一份產品冇 `description` 欄位；第二份有 `"description": null`；第三份有 `"description": "Computer Desk 48\""`（字串入面有雙引號，要用反斜線 `\"` 跳脫）。呢種「文件之間欄位可以唔同」就係 NoSQL schema-less 嘅特性。

```javascript
// 產品一：冇 description 欄位
{ "_id": ObjectId("5f34cd0f92abc114f65f18ec"),
  "product_name": "End Table",
  "product_finish": "Cherry",
  "unit_price": NumberDecimal("175"),
  "on_hand": 8 }

// 產品二：有 description 但係 null
{ "_id": ObjectId("..."),
  "product_name": "...",
  "on_hand": 8,
  "description": null }

// 產品三：description 係字串，含跳脫雙引號
{ "_id": ObjectId("..."),
  "product_name": "...",
  "on_hand": 5,
  "description": "Computer Desk 48\"" }
```

> English Standard Definitions:
> - "Assume Product_id is not necessary in the real world."
> - "Documents in the same collection may have different fields (schema-less)."
> - "A double quote inside a string must be escaped with a backslash (`\"`)."

#### 3.1.4 Sample Data in MongoDB — Customer（客戶）

繁中解說：`Customer` 集合示範咗一個常見嘅香港客戶記錄，欄位包括 `customer_name`、`customer_address`、`city`、`state`、`postal_code`。留意 `postal_code` 用數字 999077 儲存（後尾 `distinct` 範例會用到）。

```javascript
{ "_id": ObjectId("5f34cff392abc114f65f18ed"),
  "customer_name": "Beauty Furniture",
  "customer_address": "330-332 King Road",
  "city": "Hong Kong",
  "state": "GD",
  "postal_code": 999077 }
```

#### 3.1.5 Sample Data in MongoDB — Order 與 Embedded Order_line（訂單與嵌入式訂單明細）

繁中解說：呢個係本章最重要嘅資料結構——**嵌入式文件（embedded document）**。一份 `Order` 文件包含 `order_id`、`order_date`（用 `ISODate("2012-10-20")` 儲存日期）、`customer` 同 `emp`（兩者都係 `ObjectId`，引用 `Customer` 同 `Employee` 集合——即 NoSQL 嘅 reference 方式），以及一個 **`order_line` 陣列**，每個元素係一個內嵌文件 `{ product: ObjectId, quantity: 2 }`。一張訂單嘅所有明細**嵌入同一份文件**，讀取時一次過拎晒，唔使 JOIN——呢個正正係 NoSQL 相對於 relational 嘅核心取捨（denormalization）。

```javascript
{ "_id": ObjectId("5f34d1cb92abc114f65f18ee"),
  "order_id": 1001,
  "order_date": ISODate("2012-10-20"),
  "customer": ObjectId("5f34cff392abc114f65f18ed"),
  "emp": ObjectId("5f34cba4d02f2223c0b952e1"),
  "order_line": [
    { "product": ObjectId("5f34cd0f92abc114f65f18ec"), "quantity": 2 },
    { "product": ObjectId("5f34ce84d02f2223c0b952e6"), "quantity": 2 },
    { "product": ObjectId("5f34ceebd02f2223c0b952e8"), "quantity": 1 }
  ] }
```

> English Standard Definitions:
> - "An order document embeds its order_line array; each element is an embedded document referencing a product by ObjectId."
> - "`ISODate` stores a date/time value; `ObjectId` references a document in another collection."

### 3.2 Database Operations — 資料庫與集合層面

#### 3.2.1 Create Database（建立資料庫）

繁中解說：NoSQL 冇 `CREATE DATABASE` 呢類 SQL 指令——用 **`use`** 指令切換到一個資料庫（不存在就會建立）。MongoDB 係**延遲建立（lazy creation）**：真正要寫入第一份文件時資料庫先至實體存在。控制台會回應 `switched to db Ordering`。注意 MongoDB shell 嘅習慣：`use Ordering` 唔使分號；如果用 `use("Ordering")` 嘅 JavaScript 函數形式就要加括號同分號。

```javascript
> use Ordering
switched to db Ordering
// 或者用函數形式：
> use("Ordering");
```

> English Standard Definitions:
> - "Use `use <databaseName>` to switch to (and create) a database; the console responds 'switched to db Ordering'."

#### 3.2.2 Create Collections Explicitly（明確建立集合，可選）

繁中解說：集合（collection）等同 SQL 嘅資料表（table）。集合通常喺第一次插入文件時自動建立；如果想**明確建立一個空集合**，可以用 `db.createCollection()`。成功會回應 `{ ok : 1 }`——**`1` 代表 True（成功）**。

```javascript
> db.createCollection('Customer');
{ ok : 1 }
```

> English Standard Definitions:
> - "`db.createCollection('name')` creates an empty collection explicitly; the response `{ ok: 1 }` means the operation succeeded (1 means 'True')."

#### 3.2.3 Drop Collection（刪除集合）

繁中解說：刪除一個集合用 `db.<CollectionName>.drop()`，成功會回應 `true`。刪除之後，集合入面所有文件都會消失，但**資料庫本身仍然存在**。

```javascript
> db.Customer.drop();
true
```

> English Standard Definitions:
> - "`db.<collection>.drop()` removes the collection; the command returns `true` on success."

#### 3.2.4 Drop Database（刪除資料庫）

繁中解說：刪除整個資料庫要**兩步**：先 `use` 切換到目標資料庫，再執行 `db.dropDatabase()`。回應 `{ ok: 1, dropped: 'Ordering' }`——`ok: 1` 表示成功，`dropped` 顯示被刪除嘅資料庫名稱。

```javascript
> use Ordering
switched to db Ordering
> db.dropDatabase();
{ ok: 1, dropped: 'Ordering' }
```

> English Standard Definitions:
> - "To drop a database, first `use` it, then run `db.dropDatabase()`; the response `{ ok: 1, dropped: 'Ordering' }` confirms the database was removed."

### 3.3 Query Document — 基本讀取操作

#### 3.3.1 Basic Read Operations（基本讀取語法）

繁中解說：讀取操作嘅骨架係 `db.TableName.find(...)`。`find()` 接受**兩個參數**：第一個係 **Conditions（條件）**，第二個係 **Projection（投影，即揀選結果要顯示邊啲欄位）**。三個重要考點：① **參數（子句）嘅次序唔可以調轉（Order of the clauses cannot be changed）**——條件一定喺前面、投影一定喺後面；② **MongoDB 係大小寫敏感（Case sensitive）**，連表名（collection name）同欄位名（field name）都分大小寫；③ **條件同投影都用 BSON 格式**（即 `{ 欄位: 值 }` 嘅物件寫法）。另外 `db.TableName.findOne(...)` 只回傳**第一份匹配嘅文件**。

```javascript
db.TableName.find(
  { field : condition [, ...] },      // Conditions
  { field1: [0|1] [, ...] }           // Projection (selection of fields shown in the result)
);

db.TableName.findOne(...);            // Return the first matched result
```

> English Standard Definitions:
> - "The order of the clauses cannot be changed: conditions come first, projection second."
> - "MongoDB is case sensitive, even for table names and field names."
> - "Conditions and Projection are in BSON format."
> - "`findOne(...)` returns the first matched result."

#### 3.3.2 Select All Documents（列出全部文件）

繁中解說：`db.Employee.find()` 或者 `db.Employee.find({})` 都係列出集合入面所有文件嘅完整內容（條件係空物件 = 冇篩選）。**如果冇任何匹配資料，MongoDB 唔會報錯，而係冇回應（No response if no match data）**。等價 SQL 係 `SELECT * FROM Employee;`。

```javascript
> db.Employee.find();
// 或
> db.Employee.find({});
```

```sql
-- SQL 等價寫法
SELECT * FROM Employee;
```

> English Standard Definitions:
> - "`find()` with no arguments, or `find({})`, returns all documents of the collection."
> - "There is no response if no data matches the condition."

#### 3.3.3 Specify Equality Condition（等值條件）

繁中解說：最簡單嘅條件就係 `{ field: value }`——揾「欄位等於某個值」嘅文件。三個例子：title 等於 "Sales"、salary 等於 26000、以及用 `ObjectId("...")` 揾特定 `_id` 嘅文件。注意 `ObjectId` 係 BSON 特殊型別，比對 `_id` 時要寫成 `ObjectId("5f34cc13d02f2223c0b952e3")`，**唔可以**淨係寫個字串。

```javascript
// 列出 title 等於 'Sales' 嘅員工
db.Employee.find({ title: "Sales" });

// 列出 salary 等於 26000 嘅員工
db.Employee.find({ salary: 26000 });

// 列出指定 object id 嘅員工
db.Employee.find({ _id: ObjectId("5f34cc13d02f2223c0b952e3") });
```

```sql
-- SQL 等價寫法
SELECT * FROM Employee WHERE title = "Sales";
```

> English Standard Definitions:
> - "Basic syntax: `{ field: value, ... }` — matches documents where the field equals the value."
> - "Match `_id` with `ObjectId("...")`, not with a plain string."

#### 3.3.4 Conditions Using Comparison Operators（比較運算子 $gt / $gte / $lt / $lte）

繁中解說：要表達「大過／大過或等於／細過／細過或等於」，用 **`$gt`、`$gte`、`$lt`、`$lte`** 四個運算子。語法係 `{ field: { operator: value } }`。**範圍查詢（between）喺 MongoDB 唔係一個運算子**，而係喺同一個物件入面同時放 `$gte` 同 `$lte`——呢個係好常見嘅考題。三個例子：

- salary **大過** 10000 → `{ salary: { $gt: 10000 } }`（SQL：`salary > 10000`）
- salary **細過或等於** 10000 → `{ salary: { $lte: 10000 } }`（SQL：`salary <= 10000`）
- salary **介乎 10000 至 15000（含兩端）** → `{ salary: { $gte: 10000, $lte: 15000 } }`（SQL：`salary BETWEEN 10000 AND 15000`）

```javascript
// salary 大過 10000
db.Employee.find({ salary: { $gt: 10000 } });

// salary 細過或等於 10000
db.Employee.find({ salary: { $lte: 10000 } });

// salary 介乎 10000 至 15000（包含兩端）
db.Employee.find({ salary: { $gte: 10000, $lte: 15000 } });
```

```sql
-- SQL 等價寫法
SELECT * FROM Employee WHERE salary > 10000;
SELECT * FROM Employee WHERE salary <= 10000;
SELECT * FROM Employee WHERE salary BETWEEN 10000 AND 15000;
```

> English Standard Definitions:
> - "Comparison operators: `$gt` (greater than), `$gte` (greater than or equal), `$lt` (less than), `$lte` (less than or equal)."
> - "Basic syntax: `{ field: { operator: value }, ... }`."
> - "An inclusive range is written as `{ salary: { $gte: 10000, $lte: 15000 } }`, equivalent to SQL `BETWEEN 10000 AND 15000`."

#### 3.3.5 Existence Check（存在性檢查：null 與 $exists）

繁中解說：呢度處理一個**極重要嘅陷阱**——NoSQL 入面「欄位唔存在」同「欄位存在但值係 null」係兩回事，但查法有分別：

1. `{ description: null }`：會匹配 **「冇 description 欄位」或「description 係 null」** 嘅文件（兩者都當作 null 處理）。
2. `{ description: { $exists: false } }`：**只**匹配「完全冇 description 欄位」嘅文件（`$exists: true` 就係「有呢個欄位」）。

教材例子：`db.Product.find({ description: null })` 列出「冇 description 欄位或 description 係 null」嘅產品；`db.Product.find({ description: { $exists: false } })` 列出「冇 description 欄位」嘅產品（後者唔會包括 description 係 null 嗰份）。

```javascript
// 列出「冇 description 欄位 或 description 係 null」嘅產品
db.Product.find({ description: null });

// 列出「冇 description 欄位」嘅產品（description 係 null 嗰份唔計）
db.Product.find({ description: { $exists: false } });
```

> English Standard Definitions:
> - "Basic syntax: `{ field: null, ... }` matches documents where the field is missing OR its value is null."
> - "Basic syntax: `{ field: { $exists: [true|false] } }` tests whether the field exists at all."
> - "`$exists: false` matches only documents that do NOT have the field."

#### 3.3.6 More Comparison Operators（$eq / $ne / $in / $nin）

繁中解說：另一組比較運算子——**`$eq`（等於）**、**`$ne`（不等於）**、**`$in`（屬於集合）**、**`$nin`（唔屬於集合）**。兩個例子：

- title **唔等於** 'Sales' → `{ title: { $ne: "Sales" } }`（SQL：`title <> "Sales"`）
- title **唔屬於** {'Manager', 'Sales'} 呢個集合 → `{ title: { $nin: ["Manager", "Sales"] } }`（SQL：`title NOT IN ("Manager", "Sales")`）

`$in`／`$nin` 後面跟一個**陣列**，值匹配陣列中任何一個成員就成立（$in）／唔成立（$nin）。

```javascript
// 列出 title 唔等於 'Sales' 嘅員工
db.Employee.find({ title: { $ne: "Sales" } });

// 列出 title 唔屬於 {'Manager', 'Sales'} 嘅員工
db.Employee.find({ title: { $nin: ["Manager", "Sales"] } });
```

```sql
-- SQL 等價寫法
SELECT * FROM Employee WHERE title <> "Sales";
SELECT * FROM Employee WHERE title NOT IN ("Manager", "Sales");
```

> English Standard Definitions:
> - "Comparison operators: `$eq` (equal), `$ne` (not equal), `$in` (in a set), `$nin` (not in a set)."
> - "`$in` / `$nin` take an array of values, e.g. `{ title: { $nin: ["Manager", "Sales"] } }`."

#### 3.3.7 Specify AND Conditions（AND 條件）

繁中解說：AND 即係「全部條件同時成立」。MongoDB 有**兩種寫法**：① **隱式 AND（implicit AND）**——喺同一個條件物件入面用逗號分隔多個欄位條件 `{ field1: value1, field2: { operator: value2 }, ... }`；② **顯式 `$and`**——`{ $and: [ { 條件1 }, { 條件2 }, ... ] }`。兩種寫法等價。例子：列出「title 係 Sales **而且** salary 大過 10000」嘅員工。

```javascript
// 隱式 AND（逗號分隔）
db.Employee.find({ salary: { $gt: 10000 }, title: "Sales" });
// 或
// 顯式 $and（陣列包住每個條件）
db.Employee.find({ $and: [
    { salary: { $gt: 10000 } },
    { title: "Sales" }
] });
```

```sql
-- SQL 等價寫法
SELECT * FROM Employee WHERE salary > 10000 AND title = "Sales";
```

> English Standard Definitions:
> - "Implicit AND: `{ field1: value1, field2: { operator: value2 }, ... }` — comma-separated fields in one document."
> - "Explicit AND: `{ $and: [ { condition1 }, { condition2 }, ... ] }`."
> - "Both forms require ALL conditions to be true, like SQL `AND`."

#### 3.3.8 Specify OR Conditions（OR 條件）

繁中解說：OR 即係「任何一個條件成立就得」。MongoDB 有**兩種寫法**：

1. **同一欄位嘅多值**：用 `{ field: { $in: [value1, value2, ...] } }`——例如「title 係 Manager **或** Sales」→ `{ title: { $in: ["Manager", "Sales"] } }`。
2. **唔同欄位嘅條件**：用 `{ $or: [ { 條件1 }, { 條件2 }, ... ] }`——例如「salary ≤ 10000 **或** title 係 Manager」→ `{ $or: [ { salary: { $lte: 10000 } }, { title: "Manager" } ] }`。

**記憶重點**：`$in` 專for 同一欄位嘅集合匹配；`$or` for 跨欄位嘅條件組合。

```javascript
// 同一欄位：title 係 Manager 或 Sales
db.Employee.find({ title: { $in: ["Manager", "Sales"] } });

// 唔同欄位：salary ≤ 10000 或 title 係 Manager
db.Employee.find({ $or: [
    { salary: { $lte: 10000 } },
    { title: "Manager" }
] });
```

```sql
-- SQL 等價寫法
SELECT * FROM Employee WHERE salary <= 10000 OR title = "Manager";
```

> English Standard Definitions:
> - "Same field, multiple values: `{ field: { $in: [value1, value2, ...] } }`."
> - "Different fields: `{ $or: [ { condition1 }, { condition2 }, ... ] }`."
> - "`$or` matches documents satisfying AT LEAST ONE condition, like SQL `OR`."

#### 3.3.9 Specific Regular Expression（正則表達式）

繁中解說：MongoDB 用 **JavaScript 正則表達式（regex）** 做模糊匹配（等價 SQL 嘅 `LIKE`）。語法係 `{ field: /regex/ }`——**斜線包住 pattern，唔使引號**。常用符號：`/Drawer/` 包含匹配（SQL：`LIKE "%Drawer%"`）；`/^L/` 開頭匹配，`^` 錨定字串開頭（SQL：`LIKE "L%"`）；`/r$/` 結尾匹配，`$` 錨定字串結尾（SQL：`LIKE "%r"`）。

```javascript
// 產品名包含 'Drawer'
db.Product.find({ product_name: /Drawer/ });

// 員工姓氏以 'L' 開頭
db.Employee.find({ lastname: /^L/ });

// 員工職稱以 'r' 結尾
db.Employee.find({ title: /r$/ });
```

```sql
-- SQL 等價寫法
SELECT * FROM Product WHERE product_name LIKE "%Drawer%";
SELECT * FROM Employee WHERE lastname LIKE "L%";
SELECT * FROM Employee WHERE title LIKE "%r";
```

> English Standard Definitions:
> - "Basic syntax: `{ field: /regex/, ... }` — a regular expression is written between two slashes, without quotes."
> - "`^` anchors the pattern to the start of the string; `$` anchors it to the end."

#### 3.3.10 Regular Expression with Quantifiers（正則表達式進階：\w 與 \d）

繁中解說：進階 pattern 用**量詞（quantifier）**——`{n}` 表示「剛好 n 個」；`\w` 代表「一個 word character（字母／數字／底線）」（即 SQL `_`）；`\d` 代表「一個 digit（數字）」。兩個例子：

- 姓氏「包含字母 a，而 a 之前有 **2 個 word characters**」→ `/\w{2}a/`（SQL 類似：`LIKE "__a%"`，`_` 一個字元）。
- 地址「包含 ' Tian'，而前面有一個 digit」→ `/\d Tian/`（SQL 類似：`LIKE "% Tian"`）。

```javascript
// 姓氏包含 'a'，前面有 2 個 word characters
db.Employee.find({ lastname: /\w{2}a/ });

// 地址包含 ' Tian'，前面有一個數字
db.Customer.find({ customer_address: /\d Tian/ });
```

```sql
-- SQL 等價寫法（類似）
SELECT * FROM Employee WHERE lastname LIKE "__a%";
SELECT * FROM Customer WHERE customer_address LIKE "% Tian";
```

> English Standard Definitions:
> - "`\w{2}a` means letter 'a' preceded by exactly 2 word characters; `\d` matches a single digit."
> - "`{n}` is a quantifier meaning exactly n occurrences of the preceding token."

#### 3.3.11 Project Fields（投影欄位）

繁中解說：**Projection（投影）** 控制「結果顯示邊啲欄位」——語法係 `{ field1: [0|1], field2: [0|1], ... }`，**1 = 顯示（include），0 = 隱藏（exclude）**，亦可以用 `true`／`false`。**`_id` 預設一定會顯示**。例子：列出所有員工嘅 `emp_id` 同 `firstname`（`_id` 預設保留）→ `db.Employee.find({}, { emp_id: 1, firstname: 1 })`。

```javascript
// 列出 _id（預設）、emp_id、firstname
db.Employee.find({}, { emp_id: 1, firstname: 1 });
// 結果：
[ { "_id": ObjectId("5f34cba4d02f2223c0b952e1"), "emp_id": 301, "firstname": "Eric" },
  { "_id": ObjectId("5f34cbf3d02f2223c0b952e2"), "emp_id": 302, "firstname": "Meize" },
  { "_id": ObjectId("5f34cc13d02f2223c0b952e3"), "emp_id": 303, "firstname": "Kevin" },
  { "_id": ObjectId("5f34cc2bd02f2223c0b952e4"), "emp_id": 304, "firstname": "Tony" },
  { "_id": ObjectId("5f34cc40d02f2223c0b952e5"), "emp_id": 305, "firstname": "Patrick" } ]
```

```sql
-- SQL 等價寫法
SELECT _id, emp_id, firstname FROM Employee;
```

> English Standard Definitions:
> - "Basic Syntax: `{ field1: [0|1], field2: [0|1], ... }` — 1 (or true) includes the field, 0 (or false) excludes it."
> - "`_id` is included by default."

#### 3.3.12 Project Fields — Excluding _id（排除 _id）

繁中解說：如果唔想顯示 `_id`，就喺 projection 加 `{ _id: 0 }`。**考點**：一般情況唔可以喺同一個 projection 混用 1 同 0（唔可以「顯示 A 同時隱藏 B」），**唯獨 `_id` 例外**——可以 `{ _id: 0, emp_id: 1, firstname: 1 }` 咁樣「隱藏 _id 之餘顯示其他欄位」。例子：淨係要 `emp_id` 同 `firstname`，唔要 `_id`。

```javascript
// 只列出 emp_id 同 firstname（排除 _id）
db.Employee.find({}, { _id: 0, emp_id: 1, firstname: 1 });
// 結果：
[ { "emp_id": 301, "firstname": "Eric" },
  { "emp_id": 302, "firstname": "Meize" },
  { "emp_id": 303, "firstname": "Kevin" },
  { "emp_id": 304, "firstname": "Tony" },
  { "emp_id": 305, "firstname": "Patrick" } ]
```

```sql
-- SQL 等價寫法
SELECT emp_id, firstname FROM Employee;
```

> English Standard Definitions:
> - "Exclude `_id` with `{ _id: 0 }`; `_id` is the only field that can be mixed with inclusion (`1`) in a projection."
> - "You cannot mix 1 and 0 for other fields in the same projection."

#### 3.3.13 Order of Return（排序）

繁中解說：排序用 `.sort()` 方法**鏈接（chain）**喺 `find()` 後面——`db.TableName.find(...).sort({ field1: [-1|1] })`。**`1` = 升序（Ascending），`-1` = 降序（Descending）**。例子：按 `firstname` 降序排列所有員工（結果由 Tony → Patrick → Meize → Kevin → Eric）。排序係 `find` 返回嘅 cursor 上執行，所以寫法一定係 `find(...).sort(...)` 呢個次序。

```javascript
db.Employee.find({}, { _id: 0, emp_id: 1, firstname: 1 }).sort({ firstname: -1 });
// 結果（firstname 降序）：
[ { "emp_id": 304, "firstname": "Tony" },
  { "emp_id": 305, "firstname": "Patrick" },
  { "emp_id": 302, "firstname": "Meize" },
  { "emp_id": 303, "firstname": "Kevin" },
  { "emp_id": 301, "firstname": "Eric" } ]
```

```sql
-- SQL 等價寫法
SELECT emp_id, firstname FROM Employee ORDER BY firstname DESC;
```

> English Standard Definitions:
> - "Basic syntax: `db.Tablename.find(...).sort({ field1: [-1|1] })`."
> - "Either Descending (-1) or Ascending (1) order — `-1` means descending, `1` means ascending."

#### 3.3.14 Distinct Value（去重）

繁中解說：想列出某個欄位嘅**所有唔同值（去重）**，用 `db.TableName.distinct(field)`——欄位名要**用引號包住**。例子：列出 `Customer` 集合所有唔同嘅 `postal_code`。結果係一個陣列：`[ 100000, 350000, 410000, 999077, 999078 ]`。等價 SQL 係 `SELECT DISTINCT postal_code FROM Customer`。

```javascript
> db.Customer.distinct("postal_code");
[ 100000, 350000, 410000, 999077, 999078 ]
```

```sql
-- SQL 等價寫法
SELECT DISTINCT postal_code FROM Customer;
```

> English Standard Definitions:
> - "Basic syntax: `db.Tablename.distinct(field);` — returns an array of distinct values of the given field."
> - "The field name must be quoted, e.g. `db.Customer.distinct("postal_code")`."

### 3.4 Query Array — 陣列查詢

繁中解說（總覽）：本章用一個 `inventory` 集合示範**四種陣列查詢**。先睇樣本資料（每份文件都有 `tags` 陣列同 `dim_cm` 陣列）：

```javascript
// inventory 集合樣本資料
[ { item: "journal",   qty: 25,  tags: ["blank", "red"],       dim_cm: [ 14, 21 ] },
  { item: "notebook",  qty: 50,  tags: ["red", "blank"],       dim_cm: [ 14, 21 ] },
  { item: "paper",     qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
  { item: "planner",   qty: 75,  tags: ["blank", "red"],       dim_cm: [ 22.85, 30 ] },
  { item: "postcard",  qty: 45,  tags: ["blue"],               dim_cm: [ 10, 15.25 ] } ]
```

#### 3.4.1 Match an Array（陣列精確匹配）

繁中解說：直接用成個陣列做條件 `{ tags: ["red", "blank"] }`——呢個係**精確匹配（Exact matching）**：陣列嘅**元素同次序都要完全一樣（including the field order）**。喺樣本入面，只有 `notebook`（`["red", "blank"]`）符合；`journal` 同 `planner` 都係 `["blank", "red"]`（次序唔同）所以唔符合，`paper` 多咗個 `"plain"` 都唔符合。

```javascript
db.inventory.find({ tags: ["red", "blank"] });
// 只匹配 notebook（元素與次序完全一致）
```

> English Standard Definitions:
> - "Matching an array with `{ tags: ["red", "blank"] }` requires exact matching, including the field order."
> - "A document matches only if its array equals the given array element-by-element in the same order."

#### 3.4.2 Match an All Items in Array（$all：包含全部元素）

繁中解說：如果想匹配「**陣列包含晒指定嘅所有元素**，但**唔理次序、唔理有冇額外元素**」，就用 **`$all`**：`{ tags: { $all: ["red", "blank"] } }`。呢個條件匹配 `journal`、`notebook`、`paper`、`planner`（四份都同時有 "red" 同 "blank"，次序不拘、paper 多咗 "plain" 都得）；`postcard` 得一個 "blue" 所以唔符合。**記憶**：`$all` = SQL 嘅「包含全部」，次序無關。

```javascript
db.inventory.find({ tags: { $all: ["red", "blank"] } });
// 匹配 journal, notebook, paper, planner（包含兩元素即可，次序不限）
```

> English Standard Definitions:
> - "`{ tags: { $all: ["red", "blank"] } }` matches documents whose array contains ALL of the specified elements, regardless of order or extra elements."

#### 3.4.3 Match an Item（單元素匹配）

繁中解說：如果條件淨係一個**普通值（scalar）**，例如 `{ tags: "red" }`，MongoDB 會匹配「陣列入面**包含**呢個元素」嘅文件。匹配 `journal`、`notebook`、`paper`、`planner`（都有 "red"）；`postcard` 冇 "red" 所以唔符合。**記憶**：對陣列用標量值做條件 = 「陣列包含該值」。

```javascript
db.inventory.find({ tags: "red" });
// 匹配所有 tags 陣列包含 "red" 嘅文件（journal, notebook, paper, planner）
```

> English Standard Definitions:
> - "`{ tags: "red" }` matches documents whose array contains the element "red"."

#### 3.4.4 Match Array Size（$size：陣列長度）

繁中解說：想按**陣列長度（元素數目）**匹配，用 **`$size`**：`{ "tags": { $size: 3 } }`——只匹配「tags 陣列剛好有 3 個元素」嘅文件。樣本入面只有 `paper`（`["red", "blank", "plain"]`）符合。注意：**`$size` 只接受一個整數，唔接受範圍**（唔可以 `$size: { $gt: 2 }`），而且欄位名可以加引號。

```javascript
db.inventory.find({ "tags": { $size: 3 } });
// 只匹配 paper（tags 剛好有 3 個元素）
```

> English Standard Definitions:
> - "`{ "tags": { $size: 3 } }` matches documents whose array has exactly 3 elements."

### 3.5 Query Embedded Document / Array — 嵌入式文件／陣列查詢

#### 3.5.1 Match an Embedded Document（dot notation 匹配內嵌欄位）

繁中解說：要匹配**內嵌文件／內嵌陣列元素**入面嘅欄位，用 **dot notation（點記法）**——`"order_line.quantity"`。**重點：內嵌欄位嘅名一定要用引號包住（The field name should be quoted for embedded document / field）**。例子：列出「包含至少一個 `order_line` 元素且該元素 `quantity` = 2」嘅訂單；投影 `{ _id: 0, emp: 0, customer: 0 }` 隱藏 `_id`、`emp`、`customer`，所以結果只顯示 `order_id`、`order_date`、`order_line`。**只要訂單入面有「至少一個」quantity=2 嘅明細就算匹配**（order_id 1001、1004、1006、1007、1009……都符合）。

```javascript
db.Orders.find(
  { "order_line.quantity": 2 },        // 條件：至少一個 order_line 元素嘅 quantity = 2
  { _id: 0, emp: 0, customer: 0 }      // 投影：隱藏 _id、emp、customer
);
// 結果（節錄）：
[ { "order_id": 1001, "order_date": ISODate("2012-10-20T00:00:00Z"),
    "order_line": [ { "product": ObjectId("5f34cd0f92abc114f65f18ec"), "quantity": 2 },
                    { "product": ObjectId("5f34ce84d02f2223c0b952e6"), "quantity": 2 },
                    { "product": ObjectId("5f34ceebd02f2223c0b952e8"), "quantity": 1 } ] },
  { "order_id": 1004, "order_date": ISODate("2012-10-21T00:00:00Z"),
    "order_line": [ { "product": ObjectId("5f34cf39d02f2223c0b952ea"), "quantity": 2 },
                    { "product": ObjectId("5f34cf8ad02f2223c0b952ec"), "quantity": 2 },
                    { "product": ObjectId("5f34cfa3d02f2223c0b952ed"), "quantity": 3 } ] },
  { "order_id": 1006, "order_date": ISODate("2012-10-26T00:00:00Z"),
    "order_line": [ { "product": ObjectId("5f34ceebd02f2223c0b952e8"), "quantity": 1 },
                    { "product": ObjectId("5f34cf1ad02f2223c0b952e9"), "quantity": 2 },
                    { "product": ObjectId("5f34cf55d02f2223c0b952eb"), "quantity": 2 } ] },
  { "order_id": 1007, "order_date": ISODate("2012-10-26T00:00:00Z"),
    "order_line": [ { "product": ObjectId("5f34cd0f92abc114f65f18ec"), "quantity": 3 },
                    { "product": ObjectId("5f34ce84d02f2223c0b952e6"), "quantity": 2 } ] },
  { "order_id": 1009, "order_date": ISODate("2012-10-16T00:00:00Z"), ... } ]
```

> English Standard Definitions:
> - "Use dot notation to match a field inside an embedded document or array element, e.g. `{ "order_line.quantity": 2 }`."
> - "The field name should be quoted for embedded document / field."
> - "Orders are matched if they contain at least one order_line object which has quantity of 2."

#### 3.5.2 Match Embedded Document with $elemMatch（對陣列元素同時施加多個條件）

繁中解說：dot notation 嘅限制係「唔可以要求**同一個陣列元素**同時滿足多個條件」。要用 **`$elemMatch`**：`{ results: { $elemMatch: { $gte: 80, $lt: 85 } } }`——匹配「`results` 陣列入面**至少有一個元素同時 >= 80 且 < 85**」嘅文件。樣本 `scores` 集合（`results` 係普通數字陣列）：`_id:1` 係 `[82,85,88]`——82 同時符合 >= 80 同 < 85，所以匹配；`_id:2` 係 `[75,88,89]`——冇任何單一元素同時符合兩個條件（75 < 80，88 唔 < 85）；其餘都唔匹配。**所以結果只有 `_id:1`**。

```javascript
// scores 集合樣本
[ { "_id": 1, "results": [82, 85, 88] },
  { "_id": 2, "results": [75, 88, 89] },
  { "_id": 3, "results": [50, 20, 70] },
  { "_id": 4, "results": [60, 60, 50] },
  { "_id": 5, "results": [40, 12, 55] } ]

// 結果陣列至少有一個元素同時 >= 80 且 < 85 → 只匹配 _id: 1
db.score.find({ results: { $elemMatch: { $gte: 80, $lt: 85 } } });
```

> English Standard Definitions:
> - "`$elemMatch` matches documents where the array contains AT LEAST ONE element satisfying ALL of the given conditions at the same time."
> - "`db.score.find({ results: { $elemMatch: { $gte: 80, $lt: 85 } } })` — the same element must be both >= 80 and < 85."

#### 3.5.3 Match Array of Embedded Documents（嵌入式文件陣列 + $elemMatch）

繁中解說：最進階嘅組合——`results` 陣列嘅每個元素係一個**內嵌文件** `{ product, score }`（見 `survey` 集合，用 `insertMany` 建立）。用 `$elemMatch` 對「同一內嵌文件」同時檢查多個欄位。兩個例子：

1. `{ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }`——「至少有一個內嵌文件，**product 等於 "xyz" 而且 score >= 8**」。逐份檢查：`_id:3` 有 `{ product: "xyz", score: 8 }` 符合；`_id:1` 的 xyz 得 score 5、`_id:2` 的 xyz 得 7、`_id:5` 的 xyz 得 6，全部唔夠 8；`_id:4`、`_id:6` 冇 xyz。**結果只有 `_id:3`**。

2. `{ results: { $elemMatch: { product: "def", score: { $gt: 6, $lt: 8 } } } }`——「至少有一個內嵌文件，**product 等於 "def" 而且 6 < score < 8**」。`_id:6` 有 `{ product: "def", score: 7 }` 符合；`_id:4` 的 def 係 score 8——唔符合 `$lt: 8`。**結果只有 `_id:6`**。

```javascript
// survey 集合（insertMany 建立）
use('surveyDB');
db.survey.insertMany([
  { "_id": 1, "results": [ { "product": "abc", "score": 10 }, { "product": "xyz", "score": 5 } ] },
  { "_id": 2, "results": [ { "product": "abc", "score": 8 },  { "product": "xyz", "score": 7 } ] },
  { "_id": 3, "results": [ { "product": "abc", "score": 7 },  { "product": "xyz", "score": 8 } ] },
  { "_id": 4, "results": [ { "product": "abc", "score": 7 },  { "product": "def", "score": 8 } ] },
  { "_id": 5, "results": [ { "product": "abc", "score": 9 },  { "product": "xyz", "score": 6 } ] },
  { "_id": 6, "results": [ { "product": "abc", "score": 5 },  { "product": "def", "score": 7 } ] }
]);

// 例 1：至少一個內嵌文件 product = "xyz" 且 score >= 8 → 只匹配 _id: 3
db.survey.find({ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } });

// 例 2：至少一個內嵌文件 product = "def" 且 6 < score < 8 → 只匹配 _id: 6
db.survey.find({ results: { $elemMatch: { product: "def", score: { $gt: 6, $lt: 8 } } } });
```

> English Standard Definitions:
> - "`$elemMatch` on an array of embedded documents requires ONE element to satisfy all conditions together, e.g. product equal to "xyz" AND score >= 8."
> - "Each condition applies to the SAME embedded element, not across different elements."

### 3.6 Insert, Update, Delete — 寫入操作

#### 3.6.1 Insert a Single Document（插入單份文件：insertOne）

繁中解說：插入**一份**文件用 `db.TableName.insertOne({ ... })`。**如果省略 `_id`，系統會自動生成（System will generate _id if it is omitted）**。成功後回傳 `{ acknowledged: 1, insertedId: ObjectId("...") }`——`insertedId` 顯示新文件嘅 `_id`。金額記得用 `NumberDecimal("175")` 保持精確。等價 SQL 係 `INSERT INTO Product (product_name, product_finish, unit_price, on_hand) VALUES ("End Table","Cherry",175,8)`。

```javascript
db.Product.insertOne({
  "product_name": "End Table",
  "product_finish": "Cherry",
  "unit_price": NumberDecimal("175"),
  "on_hand": 8
});
// 回應：
{ acknowledged: 1, insertedId: ObjectId("5fa52edd941e033c68e7c1d3") }
```

```sql
-- SQL 等價寫法
INSERT INTO Product (product_name, product_finish, unit_price, on_hand)
VALUES ("End Table","Cherry",175,8);
```

> English Standard Definitions:
> - "`db.TableName.insertOne({ ... })` inserts a single document; the system will generate `_id` if it is omitted."
> - "The response `{ acknowledged: 1, insertedId: ObjectId(...) }` confirms the insertion and returns the new document's `_id`."

#### 3.6.2 Insert a Single Document with Explicit _id（自訂 _id）

繁中解說：如果你**自己提供 `_id`**，系統就唔會再生成——直接跟從你俾嘅值。例子：插入一份 `_id` 指定為 `ObjectId("5f34cd0f92abc114f65f18ec")` 嘅產品。**注意**：`_id` 必須唯一，重複會報錯（見 3.6.4）。

```javascript
db.Product.insertOne({
  "_id": ObjectId("5f34cd0f92abc114f65f18ec"),
  "product_name": "End Table",
  "product_finish": "Cherry",
  "unit_price": NumberDecimal("175"),
  "on_hand": 8
});
```

> English Standard Definitions:
> - "If you provide `_id` explicitly, MongoDB uses your value instead of generating one."

#### 3.6.3 Insert Multiple Documents（插入多份文件：insertMany）

繁中解說：一次過插入**多份**文件用 `db.TableName.insertMany([ {...}, {...}, ... ])`——**參數係一個陣列**。成功後回傳 `{ acknowledged: 1, insertedIds: { '0': ObjectId(...), '1': ObjectId(...) } }`——`insertedIds` 以索引（'0'、'1'……）對應每份新文件嘅 `_id`。等價 SQL 係多值 INSERT。

```javascript
db.Product.insertMany([
  { "product_name": "End Table", "product_finish": "Cherry" },
  { "product_name": "Table", "product_finish": "Natural Ash" }
]);
// 回應：
{ acknowledged: 1, insertedIds: {
    '0': ObjectId("5fa52fb910238c3c68bda3be"),
    '1': ObjectId("5fa52fb910238c3c68bda3bf")
} }
```

```sql
-- SQL 等價寫法
INSERT INTO Product (product_name, product_finish)
VALUES ("End Table","Cherry"), ("Table","Natural Ash");
```

> English Standard Definitions:
> - "`db.TableName.insertMany([ { ... }, { ... }, ... ])` inserts multiple documents at once; the argument is an array."
> - "The response includes `insertedIds`, mapping each index ('0', '1', ...) to the generated `_id`."

#### 3.6.4 Error – Duplicated _id（重複 _id 錯誤）

繁中解說：`_id` 係**唯一索引（unique index）**——如果兩份文件用同一個 `_id`，插入會失敗，回傳 **E11000 duplicate key error**。錯誤訊息格式：`E11000 duplicate key error collection: Ordering.Product index: _id_ dup key: { _id: ObjectId('5f34cd0f92abc114f65f18fc') }`——入面顯示出錯嘅集合（`Ordering.Product`）、索引名（`_id_`）同重複嘅鍵值。呢個係好典型嘅考題（問你「點解插入失敗？」）。

```javascript
db.Product.insertMany([
  { "_id": ObjectId("5f34cd0f92abc114f65f18fc"), "product_name": "End Table",  "product_finish": "Cherry" },
  { "_id": ObjectId("5f34cd0f92abc114f65f18fc"), "product_name": "Table",      "product_finish": "Natural Ash" }
]);
// 回應（節錄）：... "errmsg": "E11000 duplicate key error collection: Ordering.Product index: _id_ dup key: { _id: ObjectId('5f34cd0f92abc114f65f18fc') }", "op": { "_id": ObjectId("5f34cd0f92abc114f65f18fc"), "product_name": "Table", "product_finish": "Natural Ash" } ...
```

> English Standard Definitions:
> - "`_id` must be unique; inserting documents with the same `_id` raises error E11000 duplicate key error."
> - "The error message shows the collection, the index (`_id_`), and the duplicate key value."

#### 3.6.5 Delete Documents（刪除文件）

繁中解說：刪除有兩個方法——**`deleteMany`（刪除所有匹配）**同 **`deleteOne`（只刪第一份匹配）**。

- **刪除全部**：`db.Product.deleteMany({ })`（空條件 = 全部）→ 回傳 `{ acknowledged: 1, deletedCount: 13 }`——`deletedCount` 顯示實際刪咗幾多份（呢度 13）。
- **按條件刪除**：`db.Orders.deleteMany({ emp: ObjectId("5f34cc13d02f2223c0b952e3") })`——刪除所有 emp 等於指定 ObjectId 嘅訂單。
- **刪除第一份匹配**：`db.Employee.deleteOne({ emp: ObjectId("5f34cc13d02f2223c0b952e3") })`——只刪第一份符合條件嘅文件。

等價 SQL：`DELETE FROM Product;`、`DELETE FROM Orders WHERE emp = "5f34cc13d02f2223c0b952e3"`。

```javascript
// 刪除所有文件（空條件 {}）
db.Product.deleteMany({ });
// { acknowledged: 1, deletedCount: 13 }

// 按條件刪除所有匹配文件
db.Orders.deleteMany({ emp: ObjectId("5f34cc13d02f2223c0b952e3") });

// 只刪除第一份匹配文件
db.Employee.deleteOne({ emp: ObjectId("5f34cc13d02f2223c0b952e3") });
```

```sql
-- SQL 等價寫法
DELETE FROM Product;
DELETE FROM Orders WHERE emp = "5f34cc13d02f2223c0b952e3";
```

> English Standard Definitions:
> - "`deleteMany({})` deletes all documents; `deleteMany({ condition })` deletes all matching documents."
> - "`deleteOne({ condition })` deletes only the first document matching the condition."
> - "`deletedCount` reports how many documents were actually deleted."

#### 3.6.6 Update Documents（更新總覽）

繁中解說：更新用 `updateMany`／`updateOne`，**兩個參數**：第一個係條件 `{ condition }`，第二個係**更新運算子物件**，可以同時用以下五個：**`$set`**（設定／覆寫欄位值）、**`$inc`**（加減數值）、**`$mul`**（乘數值）、**`$rename`**（改名）、**`$unset`**（刪除欄位）。完整語法：

```javascript
db.Tablename.updateMany(
  { condition },
  {
    $set:    { field1: newVal1, field2: newVal2, ... },
    $inc:    { field1: newVal1, field2: newVal2, ... },
    $mul:    { field1: newVal1, field2: newVal2, ... },
    $rename: { field1: newName1, field2: newName2, ... },
    $unset:  { field1: "", field2: "", ... }
  }
);
```

> English Standard Definitions:
> - "Update operators: `$set` (set field values), `$inc` (increment), `$mul` (multiply), `$rename` (rename fields), `$unset` (remove fields)."

#### 3.6.7 Update Documents — Update Field Values（$set 設定欄位值）

繁中解說：`$set` 用嚟**設定（覆寫）欄位值**。例子：將**所有**員工嘅 salary 設做 10000000 → `db.Employee.updateMany({}, { $set: { salary: 10000000 } })`（條件 `{}` = 全部文件）。回傳結果包含五個關鍵數字：**`acknowledged: 1`**（成功）、**`insertedId: null`**（更新唔會插入新文件）、**`matchedCount: 5`**（有 5 份文件符合條件）、**`modifiedCount: 5`**（有 5 份文件真係被修改）、**`upsertedCount: 0`**（冇做 upsert）。等價 SQL 概念係 `UPDATE Employee SET ...`。

```javascript
db.Employee.updateMany(
  { },
  { $set: { salary: 10000000 } }
);
// 回應：
{ acknowledged: 1, insertedId: null, matchedCount: 5, modifiedCount: 5, upsertedCount: 0 }
```

```sql
-- SQL 等價寫法（概念）
UPDATE Employee SET salary = 10000000;
```

> English Standard Definitions:
> - "`$set: { field: value }` sets (overwrites) the field value of matching documents."
> - "`matchedCount` = documents matching the condition; `modifiedCount` = documents actually modified; `upsertedCount` = documents inserted by upsert; `insertedId` is null for updates."

#### 3.6.8 Update Documents — Conditional Update（條件更新）

繁中解說：帶條件嘅 `$set` 更新——只改**符合條件**嘅文件。例子：將所有 `postal_code = 999077` 嘅客戶地址改做 "new address"。等價 SQL：`UPDATE Customer SET customer_address = "new address" WHERE postal_code = 999077`。

```javascript
db.Customer.updateMany(
  { postal_code: 999077 },
  { $set: { customer_address: "new address" } }
);
```

```sql
-- SQL 等價寫法
UPDATE Customer SET customer_address = "new address" WHERE postal_code = 999077;
```

> English Standard Definitions:
> - "With a condition, `updateMany` updates only the documents matching the condition, like SQL `UPDATE ... WHERE ...`."

#### 3.6.9 Update Documents — with Existing Data（$inc / $mul：基於現有值計算）

繁中解說：`$set` 係直接覆寫，但如果想**基於現有值做運算**，就用 **`$inc`**（加／減）同 **`$mul`**（乘）。**呢度唔使讀出舊值**——MongoDB 喺服務器端直接對現有值運算。例子：幫**所有**員工嘅 salary 加 $3000 → `db.Employee.updateMany({}, { $inc: { salary: 3000 } })`（等價 SQL：`UPDATE Employee SET salary = salary + 3000`）。`$mul` 就係乘，例如 `{ $mul: { salary: 1.05 } }` 即加 5%。

```javascript
// 幫所有員工 salary 加 3000（$inc = increment）
db.Employee.updateMany(
  { },
  { $inc: { salary: 3000 } }
);

// $mul = multiply：例如 salary 乘 1.05（+5%）
db.Employee.updateMany(
  { },
  { $mul: { salary: 1.05 } }
);
```

```sql
-- SQL 等價寫法
UPDATE Employee SET salary = salary + 3000;
```

> English Standard Definitions:
> - "`$inc: { field: amount }` adds (or subtracts) the amount to the field's existing value."
> - "`$mul: { field: factor }` multiplies the field's existing value by the factor."

#### 3.6.10 Update Document — Rename Fields（$rename 欄位改名）

繁中解說：**`$rename`** 用嚟將欄位改名——`{ $rename: { 舊名: 新名 } }`。例子：將 `customer_address` 改名做 `address` → `db.Customer.updateMany({}, { $rename: { "customer_address": "address" } })`。等價 SQL 概念：`ALTER TABLE Customer RENAME customer_address To address`。

```javascript
// 將 customer_address 改名做 address
db.Customer.updateMany(
  { },
  { $rename: { "customer_address": "address" } }
);
```

```sql
-- SQL 等價寫法（概念）
ALTER TABLE Customer RENAME customer_address To address;
```

> English Standard Definitions:
> - "`$rename: { oldName: newName }` renames a field in matching documents."

#### 3.6.11 Update Document — Remove Fields（$unset 刪除欄位）

繁中解說：**`$unset`** 用嚟**成個刪除欄位**（包括欄位嘅值）——值寫空字串 `""` 就得（實際值會被忽略）。例子：刪除 `address` 欄位 → `db.Customer.updateMany({}, { $unset: { "address": "" } })`。等價 SQL 概念：`ALTER TABLE Customer DROP address`。

```javascript
// 刪除 address 欄位
db.Customer.updateMany(
  { },
  { $unset: { "address": "" } }
);
```

```sql
-- SQL 等價寫法（概念）
ALTER TABLE Customer DROP address;
```

> English Standard Definitions:
> - "`$unset: { field: "" }` removes the field (and its value) from matching documents."

#### 3.6.12 Update Single Document（updateOne：只更新第一份）

繁中解說：**`updateOne`** 只更新**第一份**符合條件嘅文件（同 `deleteOne` 概念一樣）。語法同 `updateMany` 相同。例子：更新第一份 `postal_code = 999077` 嘅客戶，同時設定 `customer_name` 同 `state` 兩個欄位（`$set` 可以一次過改多個欄位）。

```javascript
db.Customer.updateOne(
  { postal_code: 999077 },
  { $set: { customer_name: "new name", state: "new state" } }
);
```

> English Standard Definitions:
> - "`updateOne` updates only the first document matching the condition, using the same syntax as `updateMany`."

## 📖 4. 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型（Exam Answer Phrase） |
|---|---|---|
| NoSQL | 非關聯式資料庫，用 document／collection 儲存資料 | "NoSQL databases store data in flexible, schema-less documents instead of relational tables." |
| document | MongoDB 嘅一條記錄，以 BSON 格式儲存 | "A document is a single record in MongoDB, stored in BSON format." |
| collection | MongoDB 嘅「資料表」，存放多份文件 | "A collection is a group of documents, equivalent to a table in a relational database." |
| BSON | MongoDB 嘅二進制 JSON 格式；條件同投影都用 BSON | "Conditions and Projection are in BSON format." |
| `_id` | 每份文件嘅主鍵；省略時系統自動生成 ObjectId | "`_id` is the primary key of a document; the system will generate it if it is omitted." |
| `ObjectId` | MongoDB 生成嘅 24 位十六進制唯一識別碼 | "`ObjectId` is the default unique identifier type generated by MongoDB." |
| `NumberDecimal` | 精確十進制數值型別（用於金額） | "`NumberDecimal("26000")` stores a decimal value exactly, avoiding floating-point errors." |
| `ISODate` | 日期／時間型別 | "`ISODate("2012-10-20")` stores a date value in ISO format." |
| embedded document | 嵌入喺父文件入面嘅子文件（如 order_line 元素） | "An embedded document is a document nested inside another document." |
| dot notation | 用點號訪問內嵌欄位，如 `"order_line.quantity"` | "Dot notation accesses embedded fields; the field name must be quoted, e.g. `"order_line.quantity"`." |
| `use` | 切換／建立資料庫 | "`use Ordering` switches to the database Ordering." |
| `db.createCollection('name')` | 明確建立空集合 | "`db.createCollection('Customer')` creates an empty collection explicitly; `{ ok: 1 }` means success." |
| `.drop()` | 刪除集合 | "`db.Customer.drop()` removes the collection and returns `true`." |
| `db.dropDatabase()` | 刪除目前資料庫 | "`db.dropDatabase()` drops the current database; `{ ok: 1, dropped: 'Ordering' }` confirms it." |
| `find()` | 讀取查詢；`find({})` 查全部 | "`db.Employee.find()` returns all documents; there is no response if no data matches." |
| `findOne()` | 只回傳第一份匹配文件 | "`findOne()` returns the first matched result." |
| equality condition | 等值條件 `{ field: value }` | "Basic syntax: `{ field: value, ... }` matches documents where the field equals the value." |
| `$gt` / `$gte` / `$lt` / `$lte` | 大過／大過或等於／細過／細過或等於 | "Comparison operators: `$gt`, `$gte`, `$lt`, `$lte`; e.g. `{ salary: { $gt: 10000 } }`." |
| `$eq` / `$ne` | 等於／不等於 | "`$ne` matches documents where the field is NOT equal to the value." |
| `$in` / `$nin` | 屬於／唔屬於一個值集合（陣列） | "`$in` / `$nin` take an array of values, e.g. `{ title: { $nin: ["Manager", "Sales"] } }`." |
| `$and` | 顯式 AND 條件（陣列包住各條件） | "`$and: [ { condition1 }, { condition2 } ]` requires all conditions to be true." |
| implicit AND | 逗號分隔多欄位條件 = 隱式 AND | "Comma-separated fields in one condition document form an implicit AND." |
| `$or` | OR 條件（任何一個成立即可） | "`$or: [ { condition1 }, { condition2 } ]` matches documents satisfying at least one condition." |
| regular expression | 正則表達式，斜線包住，如 `/^L/` | "A regex is written between slashes: `/Drawer/` contains, `/^L/` starts with, `/r$/` ends with." |
| `^` / `$` | 字串開頭／結尾錨點 | "`^` anchors the pattern to the start; `$` anchors it to the end." |
| `\w` / `\d` / `{n}` | word character／digit／剛好 n 個 | "`\w` matches a word character, `\d` a digit, `{n}` exactly n occurrences." |
| `$exists` | 檢查欄位存唔存在 | "`{ field: { $exists: false } }` matches documents that do NOT have the field." |
| `{ field: null }` | 匹配「欄位唔存在或值係 null」 | "`{ field: null }` matches documents where the field is missing OR its value is null." |
| projection | 投影：揀選輸出欄位 | "Projection selects which fields are shown: `{ field1: 1 }` includes, `{ field1: 0 }` excludes." |
| `_id: 0` | 排除 `_id`（唯一可與 1 混用嘅欄位） | "`_id` is included by default; use `{ _id: 0 }` to exclude it." |
| `.sort({ field: -1\|1 })` | 排序：-1 降序、1 升序 | "`.sort({ firstname: -1 })` sorts descending; `1` sorts ascending." |
| `.distinct(field)` | 列出欄位嘅所有唔同值 | "`db.Customer.distinct("postal_code")` returns an array of distinct postal codes." |
| exact array match | 陣列精確匹配（元素同次序都要一樣） | "Exact matching is required including the field order, e.g. `{ tags: ["red", "blank"] }`." |
| `$all` | 陣列包含晒指定元素（次序不拘） | "`$all` matches arrays containing all specified elements regardless of order." |
| `$size` | 陣列長度（元素數目）必須等於指定數 | "`$size: 3` matches arrays with exactly 3 elements." |
| `$elemMatch` | 要求**同一個陣列元素**同時滿足多個條件 | "`$elemMatch` requires at least one array element to satisfy all conditions at the same time." |
| `insertOne` | 插入單份文件 | "`insertOne({ ... })` inserts a single document; the response includes `insertedId`." |
| `insertMany` | 插入多份文件（陣列參數） | "`insertMany([ { ... }, { ... } ])` inserts multiple documents; `insertedIds` maps indices to ids." |
| E11000 duplicate key error | 重複 `_id` 引致嘅錯誤 | "Inserting documents with the same `_id` raises error E11000 duplicate key error." |
| `deleteMany` / `deleteOne` | 刪除所有匹配／第一份匹配文件 | "`deleteMany({})` deletes all documents; `deleteOne` deletes only the first match; `deletedCount` shows how many were removed." |
| `updateMany` / `updateOne` | 更新所有匹配／第一份匹配文件 | "`updateMany({ condition }, { $set: ... })` updates all matching documents; `updateOne` updates only the first." |
| `$set` | 設定（覆寫）欄位值 | "`$set: { field: value }` sets the field value of matching documents." |
| `$inc` / `$mul` | 對現有值加減／乘 | "`$inc: { salary: 3000 }` adds 3000 to the existing salary; `$mul` multiplies it." |
| `$rename` | 欄位改名 | "`$rename: { "customer_address": "address" }` renames the field." |
| `$unset` | 刪除欄位 | "`$unset: { field: "" }` removes the field from matching documents." |
| `matchedCount` / `modifiedCount` / `upsertedCount` | 匹配數／實際修改數／upsert 插入數 | "`matchedCount` counts matched documents, `modifiedCount` counts documents actually changed, `upsertedCount` counts upserted documents." |
| case sensitive | 大小寫敏感（表名、欄位名都計） | "MongoDB is case sensitive, even for table names and field names." |
| order of clauses | find() 兩個參數嘅次序（條件在前、投影在後） | "The order of the clauses cannot be changed." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**第一步：先理解甚麼概念**
1. 理解 NoSQL 嘅核心資料結構：**document（BSON）→ collection → database**，同 `_id`／`ObjectId`／`NumberDecimal`／`ISODate` 四種特殊型別點解要咁用。
2. 理解 `find()` 兩個參數分工：**第一個係條件、第二個係投影**，次序唔可以調轉；MongoDB 大小寫敏感。
3. 理解三種條件組合邏輯：**隱式 AND**（逗號）、**顯式 `$and`／`$or`**（陣列）、**`$in`／`$nin`**（同一欄位集合）。
4. 理解「欄位唔存在」vs「欄位係 null」：`{ field: null }` 兩種都匹配；`{ $exists: false }` 淨係匹配「冇欄位」。
5. 理解陣列查詢四種層次：**精確陣列（次序重要）→ `$all`（包含即可）→ 單元素 → `$size`（長度）**。
6. 理解 `$elemMatch` 嘅關鍵：所有條件必須由**同一個陣列元素**同時滿足（dot notation 做唔到呢樣嘢）。
7. 理解寫入操作嘅「範圍」：`insertOne` vs `insertMany`、`deleteOne` vs `deleteMany`、`updateOne` vs `updateMany`；`{}` 空條件 = 全部文件。
8. 理解五個 update 運算子：`$set`（覆寫）、`$inc`／`$mul`（基於現有值運算）、`$rename`（改名）、`$unset`（刪欄位）。

**第二步：背誦甚麼英文短語**
- "The order of the clauses cannot be changed."
- "MongoDB is case sensitive, even for table names and field names."
- "Conditions and Projection are in BSON format."
- "`_id` is included by default; the system will generate `_id` if it is omitted."
- "Exact matching is required including the field order."
- "`$elemMatch` requires at least one array element to satisfy all conditions at the same time."
- "There is no response if no data matches the condition."
- "`{ field: null }` matches missing field or null; `{ $exists: false }` matches only missing field."
- "`insertedId` / `insertedIds` / `deletedCount` / `matchedCount` / `modifiedCount` / `upsertedCount` / `acknowledged: 1`."
- "Inserting documents with the same `_id` raises error E11000 duplicate key error."

**第三步：掌握甚麼計算／寫法**
- 默寫 `db.TableName.find({ 條件 }, { 投影 })` 骨架，以及 `findOne`、`.sort()`、`.distinct()`。
- 手寫四種比較：`$gt`、`$gte`、`$lt`、`$lte`；範圍寫法 `{ salary: { $gte: 10000, $lte: 15000 } }`。
- 手寫集合運算：`$ne`、`$in: [...]`、`$nin: [...]`、`$and: [...]`、`$or: [...]`。
- 手寫 regex：`/Drawer/`、`/^L/`、`/r$/`、`/\w{2}a/`、`/\d Tian/`。
- 手寫 projection：`{ emp_id: 1, firstname: 1 }`、`{ _id: 0, emp_id: 1, firstname: 1 }`。
- 手寫陣列查詢：`{ tags: ["red","blank"] }`、`{ tags: { $all: [...] } }`、`{ tags: "red" }`、`{ tags: { $size: 3 } }`。
- 手寫嵌入式查詢：`{ "order_line.quantity": 2 }` 同 `$elemMatch` 三種變體（純比較、欄位＋比較、多條件）。
- 手寫寫入操作：`insertOne`／`insertMany`（含自訂 `_id`）、`deleteMany({})`／`deleteOne`、`updateMany`／`updateOne` 配 `$set`／`$inc`／`$mul`／`$rename`／`$unset`。
- 將每條 MongoDB 指令翻譯成等價 SQL（教材每頁都有對照）。

**第四步：能解答甚麼英文考題**
- "List all employees whose salary is greater than 10000." → `db.Employee.find({ salary: { $gt: 10000 } })`
- "Find products whose name contains 'Drawer'." → `db.Product.find({ product_name: /Drawer/ })`
- "Show only emp_id and firstname of all employees (without _id)." → `db.Employee.find({}, { _id: 0, emp_id: 1, firstname: 1 })`
- "List employees who are Managers or Sales only." → `db.Employee.find({ title: { $in: ["Manager", "Sales"] } })`
- "Find products that do not have the description field." → `db.Product.find({ description: { $exists: false } })`
- "Which documents match `{ tags: ["red", "blank"] }`?" → "Exact matching is required including the field order."
- "Find scores where at least one result is >= 80 and < 85." → `db.score.find({ results: { $elemMatch: { $gte: 80, $lt: 85 } } })`
- "Add $3000 to the salary of all employees." → `db.Employee.updateMany({}, { $inc: { salary: 3000 } })`
- "Why did the insertMany fail?" → "E11000 duplicate key error: the `_id` must be unique."
- "What do matchedCount and modifiedCount mean?" → "matchedCount counts matched documents; modifiedCount counts documents actually modified."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 6.1 關鍵數字（Key Numbers）

| 項目 | 數字／意義 |
|---|---|
| `{ ok: 1 }` | 1 = True（成功） |
| projection 值 | `1`（或 `true`）= 顯示；`0`（或 `false`）= 隱藏 |
| `_id` | 預設顯示；`{ _id: 0 }` 先可以同其他 `1` 混用 |
| sort 值 | `1` = 升序（Ascending）；`-1` = 降序（Descending） |
| `$size: 3` | 陣列剛好 3 個元素（只接受整數，唔接受範圍） |
| `\w{2}a` | a 之前剛好 2 個 word characters |
| duplicate key | 錯誤碼 E11000（`_id` 重複） |
| `insertOne` 回應 | `{ acknowledged: 1, insertedId: ObjectId(...) }` |
| `insertMany` 回應 | `{ acknowledged: 1, insertedIds: { '0': ..., '1': ... } }` |
| `deleteMany({})` 回應 | `{ acknowledged: 1, deletedCount: 13 }` |
| `updateMany` 回應 | `matchedCount: 5, modifiedCount: 5, upsertedCount: 0, insertedId: null` |

### 6.2 語法極速對照表（Syntax Quick Reference）

```javascript
// ==== 資料庫／集合層面 ====
use Ordering;                        // 切換／建立資料庫
db.createCollection('Customer');     // 明確建立空集合 → { ok: 1 }
db.Customer.drop();                  // 刪集合 → true
db.dropDatabase();                   // 刪資料庫 → { ok: 1, dropped: 'Ordering' }

// ==== 讀取（Query）====
db.Employee.find();                          // 全部文件（{} 一樣）
db.Employee.find({ title: "Sales" });        // 等值
db.Employee.find({ salary: { $gt: 10000 } });         // $gt $gte $lt $lte
db.Employee.find({ salary: { $gte: 10000, $lte: 15000 } }); // 範圍（含兩端）
db.Product.find({ description: null });                 // 冇欄位 或 null
db.Product.find({ description: { $exists: false } });   // 淨係冇欄位
db.Employee.find({ title: { $ne: "Sales" } });          // 不等於
db.Employee.find({ title: { $nin: ["Manager","Sales"] } }); // 唔屬於集合
db.Employee.find({ $and: [ { salary: { $gt: 10000 } }, { title: "Sales" } ] }); // AND
db.Employee.find({ $or: [ { salary: { $lte: 10000 } }, { title: "Manager" } ] }); // OR
db.Employee.find({ lastname: /^L/ });                   // regex：^ 開頭、$ 結尾
db.Employee.find({ lastname: /\w{2}a/ });               // regex：{n} \w \d
db.Employee.find({}, { emp_id: 1, firstname: 1 });      // 投影：1 顯示（_id 預設）
db.Employee.find({}, { _id: 0, emp_id: 1, firstname: 1 }); // _id: 0 排除
db.Employee.find({}).sort({ firstname: -1 });           // 排序：-1 降、1 升
db.Customer.distinct("postal_code");                    // 去重 → 陣列

// ==== 陣列／嵌入式文件 ====
db.inventory.find({ tags: ["red", "blank"] });          // 精確匹配（次序重要）
db.inventory.find({ tags: { $all: ["red", "blank"] } }); // 包含全部（次序不拘）
db.inventory.find({ tags: "red" });                     // 包含單元素
db.inventory.find({ "tags": { $size: 3 } });            // 陣列長度 = 3
db.Orders.find({ "order_line.quantity": 2 }, { _id: 0, emp: 0, customer: 0 }); // dot notation（欄位要引號）
db.score.find({ results: { $elemMatch: { $gte: 80, $lt: 85 } } }); // 同一元素同時滿足
db.survey.find({ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }); // 內嵌文件條件

// ==== 寫入（Insert / Update / Delete）====
db.Product.insertOne({ "product_name": "End Table", "unit_price": NumberDecimal("175"), "on_hand": 8 });
db.Product.insertMany([ { ... }, { ... } ]);
db.Product.deleteMany({ });                             // 刪全部；deleteOne 只刪第一份
db.Orders.deleteMany({ emp: ObjectId("...") });         // 按條件刪
db.Employee.updateMany({}, { $set: { salary: 10000000 } });   // 覆寫
db.Employee.updateMany({}, { $inc: { salary: 3000 } });       // 加減（salary + 3000）
db.Employee.updateMany({}, { $mul: { salary: 1.05 } });       // 乘（+5%）
db.Customer.updateMany({}, { $rename: { "customer_address": "address" } }); // 改名
db.Customer.updateMany({}, { $unset: { "address": "" } });    // 刪欄位
db.Customer.updateOne({ postal_code: 999077 }, { $set: { customer_name: "new name", state: "new state" } }); // 只改第一份
```

### 6.3 MongoDB ↔ SQL 等價對照表（Equivalent Forms）

| MongoDB | SQL 等價 |
|---|---|
| `db.Employee.find()` / `find({})` | `SELECT * FROM Employee;` |
| `db.Employee.find({ title: "Sales" })` | `SELECT * FROM Employee WHERE title = "Sales";` |
| `{ salary: { $gt: 10000 } }` | `WHERE salary > 10000` |
| `{ salary: { $lte: 10000 } }` | `WHERE salary <= 10000` |
| `{ salary: { $gte: 10000, $lte: 15000 } }` | `WHERE salary BETWEEN 10000 AND 15000` |
| `{ title: { $ne: "Sales" } }` | `WHERE title <> "Sales"` |
| `{ title: { $in: ["Manager","Sales"] } }` | `WHERE title IN ("Manager", "Sales")` |
| `{ title: { $nin: ["Manager","Sales"] } }` | `WHERE title NOT IN ("Manager", "Sales")` |
| `{ $and: [ {...}, {...} ] }`／隱式 AND | `WHERE ... AND ...` |
| `{ $or: [ {...}, {...} ] }` | `WHERE ... OR ...` |
| `{ product_name: /Drawer/ }` | `WHERE product_name LIKE "%Drawer%"` |
| `{ lastname: /^L/ }` | `WHERE lastname LIKE "L%"` |
| `{ title: /r$/ }` | `WHERE title LIKE "%r"` |
| `{ lastname: /\w{2}a/ }` | `WHERE lastname LIKE "__a%"` |
| `find({}, { _id: 0, emp_id: 1, firstname: 1 })` | `SELECT emp_id, firstname FROM Employee` |
| `.sort({ firstname: -1 })` | `ORDER BY firstname DESC` |
| `.distinct("postal_code")` | `SELECT DISTINCT postal_code FROM Customer` |
| `insertOne` / `insertMany` | `INSERT INTO ... VALUES (...)` |
| `deleteMany({})` | `DELETE FROM Product;` |
| `updateMany({ cond }, { $set: {...} })` | `UPDATE ... SET ... WHERE ...` |
| `updateMany({}, { $inc: { salary: 3000 } })` | `UPDATE Employee SET salary = salary + 3000` |
| `$rename` | `ALTER TABLE ... RENAME ... To ...` |
| `$unset` | `ALTER TABLE ... DROP ...` |

### 6.4 英文極速記憶口訣（Memory Phrases）

1. **「F 兩個袋，條件前、投影後」**："The order of the clauses cannot be changed."——`find(條件, 投影)`，次序調轉即錯。
2. **「大小寫敏感」**："MongoDB is case sensitive, even for table names and field names."
3. **「G 大 G 等 L 細 L 等」**：`$gt` 大過、`$gte` 大過或等於、`$lt` 細過、`$lte` 細過或等於（Greater Than / Greater Than or Equal / Less Than / Less Than or Equal）。
4. **「IN 一個袋、AND 一個盒、OR 一條路」**：`$in` 同一欄位多值；`$and`／`$or` 用陣列 `[ ... ]` 裝住唔同條件。
5. **「null 包兩樣、exists 查有冇」**："`{ field: null }` matches missing OR null; `{ $exists: false }` matches missing only."
6. **「陣列四招：一齊、齊晒、一個、幾多個」**：`["a","b"]` 精確（次序要啱）→ `$all`（齊晒即可）→ `"a"`（有一個）→ `$size`（數目啱）。
7. **「elemMatch = 同一粒波要過晒所有龍門」**："`$elemMatch` requires at least one array element to satisfy ALL conditions at the same time."
8. **「唔見 _id 就自動生」**："The system will generate `_id` if it is omitted."；重複就 **"E11000 duplicate key error"**。
9. **「一刪全部、一改第一」**：`deleteMany`／`updateMany` = 所有匹配；`deleteOne`／`updateOne` = 第一份匹配。
10. **「set 覆蓋、inc 加減、mul 乘、rename 改名、unset 收皮」**：`$set` 覆寫、`$inc` 加減、`$mul` 乘、`$rename` 改名、`$unset` 刪欄位。
11. **「計數四兄弟」**："matchedCount → modifiedCount → upsertedCount → insertedId (null)"——更新回應嘅四個數字。

### 6.5 常見考題陷阱（Exam Traps）

- ❌ 條件同投影次序掉轉（`find({emp_id:1}, {})`）→ ✅ 條件一定在前、投影在後（"the order of the clauses cannot be changed"）。
- ❌ 用 `db.Employee.FIND()`／`Find` 大細階亂寫 → ✅ MongoDB 大小寫敏感，連表名、欄位名都計。
- ❌ 用 `{ salary: { $gt: 10000, $lt: 20000 } }` 嘅另一欄位組合做錯 AND 寫法 → ✅ 同欄位範圍先可以咁寫；唔同欄位用隱式 AND 或 `$and`。
- ❌ 用 `{ tags: ["red","blank"] }` 以為「包含」就得 → ✅ 係**精確匹配**，次序都要一樣；想「包含」用 `$all`。
- ❌ 用 `{ "order_line.quantity": 2, "order_line.product": X }` 以為係同一元素 → ✅ 呢啲條件可以分別喺**唔同**元素成立；要「同一元素」用 `$elemMatch`。
- ❌ 唔記得內嵌欄位名要加引號（`{ order_line.quantity: 2 }`）→ ✅ 一定要 `{ "order_line.quantity": 2 }`。
- ❌ 以為 `{ description: null }` 只匹配「值係 null」→ ✅ 佢同時匹配「欄位唔存在」嘅文件；淨係想查「冇欄位」用 `{ $exists: false }`。
- ❌ 對 `_id` 用 `{ _id: "5f34..." }` 字串比對 → ✅ 要用 `ObjectId("5f34...")`。
- ❌ projection 混用 1 同 0（除 `_id` 外）→ ✅ 唔可以；`_id: 0` 係唯一例外。
- ❌ `$size` 寫 `{ $size: { $gt: 2 } }` → ✅ `$size` 只接受單一整數。
- ❌ `deleteMany({})` 以為「刪集合」→ ✅ 係刪晒集合入面所有文件（集合本身保留）。
- ❌ 用 `$set` 做「舊值 + 3000」→ ✅ 要基於現有值運算就用 `$inc`／`$mul`。
- ❌ 金額用普通數字（`175`）→ ✅ 用 `NumberDecimal("175")` 確保十進制精確。
- ❌ 以為 `updateMany` 回應有 `insertedId` → ✅ 更新嘅 `insertedId` 係 `null`（除非 upsert）。
