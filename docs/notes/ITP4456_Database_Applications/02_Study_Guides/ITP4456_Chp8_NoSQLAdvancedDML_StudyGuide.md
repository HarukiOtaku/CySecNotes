# ITP4456 Chp8: NoSQL – Advanced Data Manipulation — 雙語應考學習指南

> **來源**：ITP4456 Database Applications — Chapter 8: NoSQL – Advanced Data Manipulation
> **原始檔**：`01_Raw_Materials/Lectures/Chp8 NoSQL Advanced Data Manipulation.pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 每個 `aggregate()` 範例親手在 MongoDB Shell 抄寫一次 → 特別留意「$match 前後位置」與「內嵌文件（embedded documents）」兩大地雷 → 用學習路線自測
> **本課對應 Module ILO**：*Perform database operations to implement data models and manipulate data in the applications.*
> **官方參考**：MongoDB Aggregation 官方手冊（Official Manual）

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課是 **NoSQL（MongoDB）的進階資料操縱篇**，核心主角是 **Aggregation Pipeline（聚合管道）**——一條把「過濾、排序、分組、重塑、分析」串連起來的資料處理流水線，其最大特色是：**整條管道只產生新結果，絕不修改集合（collection）內的任何資料**。管道由多個 **Stage（階段）** 依序組成，每個 stage 都是一個內建方法（如 `$match`、`$group`、`$project`、`$lookup`），資料由第一個 stage 流入、逐個 stage 處理、最後輸出結果文件。與上一章基本的 `find()` 相比，本章的 `aggregate()` 能一次完成 SQL 中 `WHERE`、`GROUP BY`、`HAVING`、`SELECT 投影` 甚至 **JOIN** 的對應工作——所以全課的判斷主軸是：**「哪個 stage 負責哪個 SQL 子句、stage 的排列次序為何重要」**。

技術關聯性：本課是 Chp6（NoSQL 資料模型）與 Chp7（NoSQL 基本 DML）的延伸。`$match` 是 `find()` 條件查詢的另一種寫法，`$group` 對應 SQL 的 `GROUP BY`＋聚合函數（`$sum`、`$avg`、`$max`、`$min`），`$lookup` 對應 SQL 的 join（尤其 left outer join）——考官最愛用「SQL 對照題」考你：給你一條 SQL，要你用 MongoDB aggregation 寫出等價管道，反之亦然。另外兩個必須警惕的地雷：(1) **`$group` 不能直接以內嵌文件（embedded document，例如 `order_line`）作為第一個 stage 的分組來源**，要先 `$project` 把內嵌陣列「攤平／計算」成一般欄位才能 `$group`；(2) **`$match` 在 `$group` 之前只能引用原始欄位，在 `$group` 之後才能引用聚合產生的新欄位（如 `Total`）**——這正是 SQL 中 `WHERE` 與 `HAVING` 的分別。

實務情境一（銷售統計報表）：傢俬公司後台要即時顯示「每一種木料飾面（product_finish）的銷售總額」——開發者寫 `db.Product.aggregate([{ $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } } }])`，一條管道就產出各飾面的小計；若老闆只要「總額超過 1000 的飾面」，就必須在 `$group` **之後**再加一個 `$match: { Total: { $gt: 1000 } }` 階段（等於 SQL 的 `HAVING`），若誤放在 `$group` 之前則永遠沒有結果——這是實務上最常見的 aggregation 錯誤。

實務情境二（跨集合查詢與報表合併）：電商訂單系統要把「訂單 1001」顯示為「落單員工的姓名（來自 Employee 集合）＋訂單內產品的名稱（來自 Product 集合）」——因為 `Orders` 集合內只存了員工的 `_id`（欄位 `emp`）與產品 `_id`（內嵌於 `order_line.product`），必須用 **`$lookup`** 分別從 `Employee` 與 `Product` 兩個集合「查表」，再以 `$project` 只抽出 `empDetail.firstname` 與 `productDetail.product_name` 輸出。這正是 MongoDB 以「引用＋查表」取代關聯式外鍵 join 的典型做法，亦說明為何 `$lookup` 的 `as` 結果一定是**陣列**（一個訂單可以對應多個產品）。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **解釋 Aggregation Pipeline 的定義與特性** — Define the aggregation pipeline and explain why it does not change any data in the collection
2. **區分 Aggregation、Stage 與 Pipeline 三個概念** — Distinguish `aggregation` (collection and summary of data), `stage` (a built-in method that does not permanently alter the data) and `aggregation pipeline` (a series of stages completed in order)
3. **以 `$match` 取代條件查詢** — Use `$match` as an alternative to a conditional `find()` query, and state its SQL equivalent (`WHERE`)
4. **計算符合條件的文件數量** — Count documents matching a condition with `.find(condition).count()` or `.count(condition)`
5. **以 `$group` 配合 `_id: null` 做全集合聚合** — Use `$group` with `_id: null` to aggregate the whole collection into one group (`$sum`, `$avg`, `$max`, `$min`, and the `$sum: 1` counting trick)
6. **以 `$group` 按欄位值分組** — Group documents by a field value (`_id: "$field"`) and state its SQL equivalent (`GROUP BY`)
7. **組合 `$match` 與 `$group` 過濾後再分組** — Combine `$match` then `$group` to filter before grouping, with regex pattern matching
8. **解釋為何 `$match` 不能引用聚合產生的欄位（$group 之前）** — Explain why a `$match` placed before `$group` cannot reference a field computed by the aggregation (e.g. `Total`), and place the second `$match` after `$group` to filter groups (SQL `HAVING`)
9. **以 `$project` 處理內嵌文件並重組文件形狀** — Reshape documents with `$project`, including summing fields inside an embedded array (`"$order_line.quantity"`), and explain why `$group` cannot be used directly on an embedded document at the first stage
10. **以 `$lookup` 執行跨集合（multi-collection）查詢** — Perform a multi-collection query with `$lookup` using `from`, `localField`, `foreignField` and `as`, and combine multiple `$lookup` stages
11. **以 `$project: { _id: 0 }` 移除 `_id` 欄位** — Hide the `_id` field from the output with `{ $project: { _id: 0 } }`
12. **解釋 stage 依序執行（Stages are executed in order）** — Explain that aggregation stages are executed in order and the output of one stage is the input of the next

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 Aggregation Pipeline 總論（核心定義）

繁中解說：MongoDB 的 **aggregation（聚合）** 意思是「把資料收集起來並做摘要統計」。實現聚合的引擎是 **aggregation pipeline（聚合管道）**：它是一條**依序執行**的處理流水線，可以對資料做**過濾（filter）、排序（sort）、分組（group）、重塑（reshape）與分析（analyze）**，而最關鍵的特性是——**管道任何時刻都不會修改集合內既有的資料**，所有轉變都發生在「流經管道的結果」上。管道由一個或多個 **stage（階段）** 組成，每個 stage 都是一個內建方法（built-in method），例如 `$match`、`$group`、`$project`、`$lookup`；上一個 stage 的輸出會原封不動成為下一個 stage 的輸入。語法上，`db.<collection>.aggregate(...)` 的參數可以是一個 stage 物件，亦可以是由多個 stage 組成的陣列。

> English Standard Definitions:
> - "Aggregation: Collection and summary of data."
> - "Aggregation Pipeline: A way to filter, sort, group, reshape, and analyze data without changing any data in your collection."
> - "Stage: One of the built-in methods that can be completed on the data, but does not permanently alter it."
> - "Aggregation pipeline: A series of stages completed on the data in order."
> - "Stages are executed in order — the output of one stage becomes the input of the next stage."

### 3.2 範例資料（Sample Data）

繁中解說：本課所有範例沿用以下三個集合（collection）：

- `Product`（產品）：欄位包括 `unit_price`（單價，以 `NumberDecimal` 儲存）、`product_finish`（飾面，值有 `"Cherry"`、`"Natural Maple"`、`"Natural Ash"`、`"White Ash"`、`"Walnut"` 等）、`product_name`；全集合共 9 份文件，單價介乎 175 至 800。
- `Employee`（員工）：欄位包括 `title`（職位，例如 `"Sales"`）、`salary`（薪金）、`firstname`（名字，例如 `"Eric"`）、`_id`。
- `Orders`（訂單）：欄位包括 `order_id`（例如 1001）、`emp`（落單員工的 `_id`，屬外鍵引用）、`order_line`（**內嵌陣列**，每項含 `product`（產品 `_id`）與 `quantity`（數量））。

> 記憶點：`NumberDecimal("4075")` 表示 MongoDB 以十進制精確數值儲存金額——考試見到 `NumberDecimal("...")` 要識讀為一個數值。

### 3.3 `$match`：條件查詢的另一種寫法（Alternatives of Conditional Query）

繁中解說：`$match` stage 的用途是**過濾文件**——只讓符合條件的文件繼續流向下一 stage，其效果等同 `find()` 的條件參數，亦等於 SQL 的 `WHERE` 子句。基本語法有兩種：只傳一個物件 `{ $match: { condition } }`，或包在陣列 `[ { $match: { condition } } ]` 內（陣列寫法是管道標準寫法，日後要加 stage 時直接往陣列裡加即可）。以下三種寫法輸出**完全相同**的結果——這是考試常考的「等價寫法」題。

```javascript
// 寫法一：find() 條件查詢
db.Employee.find({ title: "Sales" });

// 寫法二：aggregate + $match（單一物件）
db.Employee.aggregate({ $match: { title: "Sales" } });

// 寫法三：aggregate + $match（陣列）
db.Employee.aggregate([{ $match: { title: "Sales" } }]);
```

```sql
-- SQL 等價寫法
SELECT * FROM Employee WHERE title = "Sales";
```

> English Standard Definitions:
> - "`$match` filters the documents, passing only those that match the specified condition to the next stage."
> - "`$match` is the MongoDB equivalent of the SQL `WHERE` clause."
> - "The `aggregate()` method accepts either a single stage object or an array of stage objects."

> 地雷提醒：`$match` 的條件寫法與 `find()` 完全一致——包括比較運算子（如 `{ salary: { $gt: 10000 } }`）與正則表達式（如 `{ product_finish: /Ash/ }`），均可直接使用。

### 3.4 統計文件數量（Number of Collections）

繁中解說：要數「符合條件的文件有多少份」，有兩種等價寫法：`db.<TableName>.find({ condition }).count()` 或 `db.<TableName>.count({ condition })`。兩種寫法都只回傳一個數字。

**範例：有多少員工的薪金大於 10000？**

```javascript
db.Employee.find({ salary: { $gt: 10000 } }).count();
// 結果：4
```

```javascript
db.Employee.count({ salary: { $gt: 10000 } });
// 結果：4
```

> English Standard Definitions:
> - "Use `.find(condition).count()` or `.count(condition)` to return the number of documents that match the condition."
> - "`$gt` is the MongoDB comparison operator for greater than."

> 記憶點：`$gt`（greater than，大於）是本章反覆使用的比較運算子；配合 `$lt`（小於）、`$gte`、`$lte` 等一併背誦。

### 3.5 `$group`：聚合函數 — 全集合一組（One Group）

繁中解說：`$group` stage 把文件分組並對每組執行聚合函數。**`_id` 欄位是分組鍵（group key）**：當 `_id: null` 時，代表「全部文件當作一個群組」——即對整個集合做一次統計。輸出欄位以 `新欄位名: { 聚合運算子: "$來源欄位" }` 的形式定義，其中 `"$field"` 表示「該文件的 field 欄位之值」；`$sum` 是求和運算子。基本語法如下：

```javascript
db.Product.aggregate({
  $group: {
    _id: null,                       // 全集合當作一組
    newField: { $sum: "$field" }     // 對 field 求和，輸出到 newField
  }
});
```

**範例：所有產品的單價總額。**

```javascript
db.Product.aggregate({
  $group: { _id: null, Total: { $sum: "$unit_price" } }
});
// 結果：[ { _id: null, Total: NumberDecimal("4075") } ]
```

```sql
-- SQL 等價寫法
SELECT null AS _id, SUM(unit_price) AS Total FROM Product;
```

> English Standard Definitions:
> - "`$group` groups documents by the value of the `_id` field and computes aggregate values for each group."
> - "`_id: null` treats the whole collection as a single group."
> - "`"$field"` refers to the value of the field of the document."
> - "`$sum` returns the total of the specified field values."

> 記憶點：`$group` 中 `_id` 是**保留欄位**——它是分組鍵，不是一般輸出欄位；想輸出「全集合一組」就寫 `_id: null`。

### 3.6 `$group`：多個聚合函數並存（One Group 進階）

繁中解說：同一個 `$group` 可以同時輸出多個統計欄位，每個欄位各配一個聚合運算子：`$sum: 1` 對每份文件加 1（等效於 SQL `COUNT(*)`）、`$sum: "$unit_price"` 求和、`$avg` 求平均、`$max` 求最大、`$min` 求最小。

**範例：同時統計產品總數、單價總額、平均、最大與最小單價。**

```javascript
db.Product.aggregate({
  $group: {
    _id: null,
    Count: { $sum: 1 },
    Sum: { $sum: "$unit_price" },
    Average: { $avg: "$unit_price" },
    Max: { $max: "$unit_price" },
    Min: { $min: "$unit_price" }
  }
});
// 結果：[ { _id: null, Count: 9, Sum: NumberDecimal("4075"),
//   Average: NumberDecimal("452.7777777777777777777777777777778"),
//   Max: NumberDecimal("800"), Min: NumberDecimal("175") } ]
```

> English Standard Definitions:
> - "`$sum: 1` adds 1 for each document and is used to count the documents in a group."
> - "`$avg`, `$max` and `$min` return the average, maximum and minimum values of the specified field in each group."
> - "A single `$group` stage can compute several aggregate fields at the same time."

> 記憶點：`Average = 4075 ÷ 9 ≈ 452.777...`——可用此驗算結果。金額欄位用 `NumberDecimal` 儲存，故平均值也以 `NumberDecimal` 呈現（多位小數是正常現象，不是錯誤）。

### 3.7 `$group`：按欄位分組（Grouping）

繁中解說：當 `_id` 改為 `"$某欄位"`（注意：這次是**字串**，前面有 `$`），`$group` 就會把文件按該欄位的**每個不同值**分成一組——這正是 SQL `GROUP BY` 的分組小計。輸出中每組一列，`_id` 的值就是該組的分組鍵值。

**範例：按飾面（product_finish）分組，統計每種飾面的單價總額。**

```javascript
db.Product.aggregate({
  $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } }
});
// 結果：[
//   { _id: "Cherry", Total: NumberDecimal("500") },
//   { _id: "Natural Maple", Total: NumberDecimal("650") },
//   { _id: "Natural Ash", Total: NumberDecimal("1925") },
//   { _id: "White Ash", Total: NumberDecimal("750") },
//   { _id: "Walnut", Total: NumberDecimal("250") }
// ]
```

```sql
-- SQL 等價寫法
SELECT product_finish AS _id, SUM(unit_price) AS Total
FROM Product
GROUP BY product_finish;
```

> English Standard Definitions:
> - "To group by a field, set `_id` to `"$fieldName"` — each distinct value of that field becomes one group."
> - "`$group` with `_id: "$product_finish"` is the MongoDB equivalent of `GROUP BY product_finish` in SQL."

> 記憶點：`_id: null`（全集合一組）vs `_id: "$field"`（按欄位分組）——前者 `null` 是**值**、後者是**字串**，兩者不要混淆。

### 3.8 `$match` + `$group`：先過濾再分組（Aggregate Functions with Condition）

繁中解說：管道可以組合多個 stage——先用 `$match` 過濾掉不需要的文件（等同 SQL `WHERE`），再對留下來的文件 `$group` 分組統計。stage 依序放入陣列，先寫 `$match`、後寫 `$group`。條件可用正則表達式：`/Ash/` 是「包含 Ash」的樣式，等同 SQL 的 `LIKE "%Ash%"`。

**範例：只統計飾面名稱包含 "Ash" 的產品，按飾面分組求總額。**

```javascript
db.Product.aggregate([
  { $match: { product_finish: /Ash/ } },
  { $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } } }
]);
// 結果：[
//   { _id: "White Ash", Total: NumberDecimal("750") },
//   { _id: "Natural Ash", Total: NumberDecimal("1925") }
// ]
```

```sql
-- SQL 等價寫法
SELECT product_finish AS _id, SUM(unit_price) AS Total
FROM Product
WHERE product_finish LIKE "%Ash%"
GROUP BY product_finish;
```

> English Standard Definitions:
> - "`$match` placed before `$group` filters the documents before grouping — it is the equivalent of the SQL `WHERE` clause."
> - "A regex pattern such as `/Ash/` matches field values that contain 'Ash', equivalent to `LIKE "%Ash%"` in SQL."

> 記憶點：結果只有兩種飾面（White Ash、Natural Ash）——因為 `$match` 先把其他飾面的文件全部擋走，`$group` 只對剩餘文件分組。

### 3.9 分組條件的兩大地雷：`$match` 的位置（Grouping Condition）

繁中解說：若想「只保留總額超過 1000 的飾面組」，條件是**對聚合產生的新欄位 `Total`** 下手。此時 `$match` 的位置**決定成敗**：

**錯誤寫法（沒有結果！）**——把 `Total: { $gt: 1000 }` 寫進 `$group` **之前**的那個 `$match`：

```javascript
db.Product.aggregate([
  { $match: { product_finish: /Ash/, Total: { $gt: 1000 } } },
  { $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } } }
]);
// 結果：（沒有輸出！）
```

原因：在 `$group` 執行之前，文件根本還沒有 `Total` 這個欄位——`Total` 是 `$group` 才計算出來的新欄位。`$match` 只能引用**目前文件上真實存在**的欄位（即原始欄位，如 `product_finish`、`unit_price`），所以 `Total: { $gt: 1000 }` 永遠不成立，整批文件被擋走、輸出為空。這正是 SQL 中「`WHERE` 不能引用聚合別名 `Total`」的同款錯誤。

**正確寫法**——把第二個 `$match` 放在 `$group` **之後**，過濾的對象變成「分組後的結果」：

```javascript
db.Product.aggregate([
  { $match: { product_finish: /Ash/ } },                       // 先過濾原始文件（WHERE）
  { $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } } },  // 再分組（GROUP BY）
  { $match: { Total: { $gt: 1000 } } }                         // 後過濾群組（HAVING）
]);
// 結果：[ { _id: 'Natural Ash', Total: NumberDecimal("1925") } ]
```

```sql
-- SQL 等價寫法（HAVING 正是「分組後過濾群組」）
SELECT product_finish AS _id, SUM(unit_price) AS Total
FROM Product
WHERE product_finish LIKE "%Ash%"
GROUP BY product_finish
HAVING Total > 1000;
```

> English Standard Definitions:
> - "Stages are executed in order: the output of one stage is the input of the next stage."
> - "A `$match` before `$group` cannot reference a field computed by the aggregation, because that field does not exist yet in the documents."
> - "To filter groups by an aggregated value such as `Total`, place a second `$match` after the `$group` stage."
> - "`$match` after `$group` is the MongoDB equivalent of the SQL `HAVING` clause."

> 考試答題套路：凡題目出現「篩選聚合結果／只保留總額大於 X 的群組」，必答「第二個 `$match` 必須放在 `$group` 之後，因為 stage 依序執行，`$group` 之前沒有 `Total` 欄位」。White Ash（750）因不超過 1000 而被剔除，只有 Natural Ash（1925）留下——以此驗算理解正確。

### 3.10 `$project`：重塑文件與內嵌文件（Embedded Documents）

繁中解說：**`$project`** stage 的作用是「投影／重塑」——決定輸出文件包含哪些欄位、以及如何從現有資料**計算**出新欄位（等同 SQL SELECT 清單的欄位選擇與運算式）。本課的重點用法是：內嵌陣列 `order_line` 內每個元素都有 `quantity` 欄位，用 `$sum: "$order_line.quantity"` 可把**每份訂單文件內**所有明細數量加總成一個新欄位 `total`。

**重要規則（地雷）**：**第一個 stage 不能用 `$group` 直接處理內嵌文件**——即不能直接在 `order_line` 這類內嵌陣列上執行 `$group`；必須先用 `$project` 把內嵌欄位「攤平／計算」成普通欄位，之後才能對該新欄位做 `$group`。

**範例 1：只投影每份訂單的明細數量總和（不修改集合，每份文件輸出一個 `total`）。**

```javascript
db.Orders.aggregate([
  { $project: { total: { $sum: "$order_line.quantity" } } }
]);
// 結果（每份訂單一列，total 為該訂單全部明細數量之和）：
// [
//   { _id: ObjectId("5f34d1cb92abc114f65f18ee"), total: 5 },
//   { _id: ObjectId("5f34d382d02f2223c0b952f6"), total: 5 },
//   { _id: ObjectId("5f34d3fbd02f2223c0b952f7"), total: 3 },
//   { _id: ObjectId("5f34d47dd02f2223c0b952f8"), total: 7 },
//   { _id: ObjectId("5f34d568d02f2223c0b952f9"), total: 4 },
//   { _id: ObjectId("5f34d5f2d02f2223c0b952fa"), total: 5 },
//   { _id: ObjectId("5f34d6bed02f2223c0b952fb"), total: 5 },
//   { _id: ObjectId("5f34d735d02f2223c0b952fc"), total: 6 },
//   { _id: ObjectId("5f34d7bad02f2223c0b952fd"), total: 5 },
//   { _id: ObjectId("5f34d86ed02f2223c0b952fe"), total: 0 }
// ]
```

> English Standard Definitions:
> - "`$project` reshapes each document: it selects which fields to pass to the next stage and can compute new fields from existing ones."
> - "The embedded array `order_line` is not a single value — use `$sum: "$order_line.quantity"` to add up the `quantity` values of all elements inside it."
> - "You cannot use `$group` on an embedded document at the first stage; use `$project` first to flatten or compute the embedded fields."

**範例 2：先 `$project` 算出每份訂單的 `total`，再 `$group` 對全部訂單求總和（45）。**

```javascript
db.Orders.aggregate([
  { $project: { total: { $sum: "$order_line.quantity" } } },
  { $group: { _id: null, total: { $sum: "$total" } } }
]);
// 結果：[ { _id: null, total: 45 } ]
```

**範例 3：同上，但最後再加 `$project: { _id: 0 }` 把 `_id` 欄位隱藏。**

```javascript
db.Orders.aggregate([
  { $project: { total: { $sum: "$order_line.quantity" } } },
  { $group: { _id: null, total: { $sum: "$total" } } },
  { $project: { _id: 0 } }
]);
// 結果：[ { total: 45 } ]
```

> English Standard Definitions:
> - "`{ $project: { _id: 0 } }` removes the `_id` field from the output documents."
> - "A pipeline can chain `$project` → `$group` → `$project` to compute, summarize and then tidy up the output shape."

> 記憶點：範例 2 與 3 都先 `$project`（把內嵌陣列轉成單一 `total` 欄位）再 `$group`——這正是「內嵌文件不能直接 `$group`」規則的標準解法；`_id: 0` 只是把預設輸出的 `_id` 隱藏，令輸出更乾淨。

### 3.11 `$lookup`：跨集合查詢（Multi-collections Query，選修）

繁中解說：MongoDB 不像關聯式資料庫有外鍵 join，但可以用 **`$lookup`** stage 把**另一個集合**的文件「查表」加入目前文件——等效於 SQL 的 **LEFT OUTER JOIN**。基本語法四要素：

- `from`：要查的目標集合名稱（字串）。
- `localField`：目前集合中用作「外鍵」的欄位。
- `foreignField`：目標集合中用作「主鍵」的欄位（通常是 `_id`）。
- `as`：輸出陣列欄位的名稱——**注意：`$lookup` 的結果一定是一個陣列**，即使只對應到一份文件，也會包成 `[ { ... } ]`。

```javascript
db.<Tablename>.aggregate({
  $lookup: {
    from: "table",
    localField: "foreignkey",
    foreignField: "primarykey",
    as: "outputArrayField"
  }
});
```

**範例 1：查訂單 1001 的落單員工資料（Employee → empDetail）。**

```javascript
db.Orders.aggregate([
  { $match: { order_id: 1001 } },
  {
    $lookup: {
      from: "Employee",
      localField: "emp",        // Orders.emp 是員工的 _id（外鍵）
      foreignField: "_id",      // 對應 Employee._id（主鍵）
      as: "empDetail"
    }
  },
  { $project: { _id: 0, order_id: 1, "empDetail.firstname": 1 } }
]);
// 結果：[ { order_id: 1001, empDetail: [ { firstname: "Eric" } ] } ]
```

繁中解說：管道先 `$match` 只留下訂單 1001，再 `$lookup` 用 `emp` 對上 `Employee._id` 找出該員工，最後 `$project` 只輸出 `order_id` 與 `empDetail.firstname`（用點號 `"empDetail.firstname"` 深入陣列元素取欄位）。輸出中 `empDetail` 是陣列，內含一份文件 `{ firstname: "Eric" }`。

**範例 2：同一管道做兩次 `$lookup`——同時查員工與產品（雙 join）。**

```javascript
db.Orders.aggregate([
  { $match: { order_id: 1001 } },
  {
    $lookup: {
      from: "Employee",
      localField: "emp",
      foreignField: "_id",
      as: "empDetail"
    }
  },
  {
    $lookup: {
      from: "Product",
      localField: "order_line.product",   // 內嵌陣列內的產品 _id（外鍵）
      foreignField: "_id",                // 對應 Product._id（主鍵）
      as: "productDetail"
    }
  },
  { $project: { _id: 0, order_id: 1, "empDetail.firstname": 1, "productDetail.product_name": 1 } }
]);
// 結果：[ {
//   order_id: 1001,
//   empDetail: [ { firstname: "Eric" } ],
//   productDetail: [
//     { product_name: "End Table" },
//     { product_name: "Coffee Table" },
//     { product_name: "Entertainment Center" }
//   ]
// } ]
```

> English Standard Definitions:
> - "`$lookup` performs a left outer join with another collection and adds the matched documents as an array field."
> - "`from` names the collection to join; `localField` is the foreign key in the current collection; `foreignField` is the primary key in the target collection; `as` is the name of the output array field."
> - "The result of `$lookup` is always an array, even when only one document matches."
> - "Multiple `$lookup` stages can be chained in one pipeline to join several collections at once."
> - "`localField` can point into an embedded array, e.g. `order_line.product`."

> 記憶點：`$lookup` 三問口訣——「從哪張表（from）、用哪個鍵（localField ↔ foreignField）、存到哪個欄位（as）」。一個訂單對應三個產品，所以 `productDetail` 陣列有三個元素——驗證了「`as` 結果必然是陣列」的規則。

## 📖 4. 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| **Aggregation** | 聚合：把資料收集起來並做摘要統計 | "Aggregation is the collection and summary of data." |
| **Aggregation Pipeline** | 聚合管道：一條依序執行的資料處理流水線，用於過濾、排序、分組、重塑與分析資料 | "An aggregation pipeline is a way to filter, sort, group, reshape and analyze data without changing any data in your collection." |
| **Stage** | 階段：管道中的一個內建方法，處理資料但不會永久修改它 | "A stage is one of the built-in methods that can be completed on the data, but does not permanently alter it." |
| **Stages are executed in order** | 各階段依序執行：上一個 stage 的輸出是下一個 stage 的輸入 | "The stages are executed in order — the output of one stage becomes the input of the next stage." |
| **`$match`** | 過濾階段：只讓符合條件的文件流向下一階段，等同 SQL `WHERE` | "`$match` filters the documents, equivalent to the `WHERE` clause in SQL." |
| **`$group`** | 分組階段：按 `_id` 分組鍵分組並計算聚合值，等同 SQL `GROUP BY` | "`$group` groups documents by the `_id` field and computes aggregate values for each group." |
| **`_id: null`** | 把整個集合當作一個群組來統計 | "`_id: null` treats the whole collection as a single group." |
| **`_id: "$field"`** | 按某欄位的每個不同值分組 | "Set `_id` to `"$fieldName"` to group documents by that field, like `GROUP BY` in SQL." |
| **`"$field"`** | 引用文件內某欄位的值（欄位路徑） | "`"$field"` refers to the value of the field of the document." |
| **`$sum`** | 求和聚合運算子；`$sum: 1` 每份文件加 1 用作計數 | "`$sum` returns the total of the field values; `$sum: 1` counts the documents in a group." |
| **`$avg` / `$max` / `$min`** | 平均／最大／最小聚合運算子 | "`$avg`, `$max` and `$min` return the average, maximum and minimum values of the field." |
| **`$gt`** | 大於比較運算子（greater than） | "`$gt` is the comparison operator for greater than, e.g. `{ salary: { $gt: 10000 } }`." |
| **Regex pattern `/Ash/`** | 正則表達式樣式，匹配包含 "Ash" 的值，等同 SQL `LIKE "%Ash%"` | "The regex pattern `/Ash/` matches values containing 'Ash', equivalent to `LIKE "%Ash%"` in SQL." |
| **`HAVING`（對照）** | SQL 中過濾「群組」的子句；對應 MongoDB「`$group` 之後的 `$match`」 | "`$match` placed after `$group` filters groups, equivalent to the `HAVING` clause in SQL." |
| **`$project`** | 投影／重塑階段：選擇輸出欄位或計算新欄位，等同 SQL SELECT 清單 | "`$project` reshapes each document by selecting fields and computing new fields." |
| **`{ $project: { _id: 0 } }`** | 從輸出中隱藏 `_id` 欄位 | "`{ $project: { _id: 0 } }` removes the `_id` field from the output." |
| **Embedded document / array** | 內嵌文件／內嵌陣列：儲存在文件內部的子文件結構（如 `order_line`） | "You cannot use `$group` on an embedded document at the first stage; use `$project` first." |
| **`$lookup`** | 跨集合查表階段，等效 SQL LEFT OUTER JOIN | "`$lookup` performs a left outer join with another collection and adds the matched documents as an array field." |
| **`from`** | `$lookup` 中要查的目標集合名稱 | "`from` names the collection to join." |
| **`localField` / `foreignField`** | 目前集合的外鍵欄位／目標集合的主鍵欄位 | "`localField` is the foreign key in the current collection and `foreignField` is the primary key in the target collection." |
| **`as`** | `$lookup` 輸出陣列欄位的名稱 | "`as` is the name of the output array field; the result of `$lookup` is always an array." |
| **`NumberDecimal("...")`** | MongoDB 的十進制精確數值型態，用於金額等需要精確計算的欄位 | "Amounts are stored as `NumberDecimal`, e.g. `NumberDecimal("4075")`." |
| **ObjectId** | MongoDB 文件預設的主鍵 `_id` 值型態 | "Each document has an `_id` field whose default value is an `ObjectId`." |
| **`.count()`** | 計算符合條件文件數量的方法 | "Use `.find(condition).count()` or `.count(condition)` to return the number of matching documents." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**第一步：先理解甚麼觀念（Understand）**
1. Aggregation = 收集＋摘要；Pipeline = 依序執行的 stage 串；Stage 不永久修改資料。
2. `$match` = SQL `WHERE`；`$group` = SQL `GROUP BY`；`$group` 後的 `$match` = SQL `HAVING`；`$project` = SQL SELECT 清單；`$lookup` = SQL LEFT OUTER JOIN。
3. 為何 `$group` 前不能引用聚合新欄位（`Total` 還不存在）——stage 依序執行。
4. 為何第一個 stage 不能用 `$group` 直接處理內嵌文件（`order_line` 是陣列，不是單一值）。

**第二步：背誦甚麼英文短語（Memorize）**
- "without changing any data in your collection"（pipeline 特性）
- "a series of stages completed on the data in order"（pipeline 定義）
- "does not permanently alter it"（stage 特性）
- "`$match` after `$group` is equivalent to the SQL `HAVING` clause."
- "The result of `$lookup` is always an array."

**第三步：掌握甚麼計算／寫法（Practice）**
1. `$match` 單一物件與陣列兩種寫法、`find()` 等價寫法。
2. `_id: null` 全集合統計（`$sum: 1` 計數、`$sum`／`$avg`／`$max`／`$min` 並存）。
3. `_id: "$product_finish"` 按欄位分組；驗算：Cherry 500 + Natural Maple 650 + Natural Ash 1925 + White Ash 750 + Walnut 250 = 4075 ✓。
4. `$match`（`/Ash/`）→ `$group` → 第二個 `$match`（`Total: { $gt: 1000 }`）三段管道；解釋為何 White Ash 被剔除、Natural Ash 留下（1925 > 1000，750 ≤ 1000）。
5. `$project` 把 `order_line.quantity` 加總 → `$group` 總和 45 → `$project: { _id: 0 }`。
6. `$lookup` 四參數（`from`、`localField`、`foreignField`、`as`），再以點號 `"empDetail.firstname"` 投影；雙 `$lookup` 串接。

**第四步：能解答甚麼英文考題（Answer）**
- "Define the aggregation pipeline and explain why it does not change the data in the collection."
- "Write a MongoDB aggregation equivalent of `SELECT product_finish, SUM(unit_price) FROM Product WHERE product_finish LIKE '%Ash%' GROUP BY product_finish HAVING SUM(unit_price) > 1000`."
- "Why does the query `[ { $match: { product_finish: /Ash/, Total: { $gt: 1000 } } }, { $group: ... } ]` return no result?"
- "Why must you use `$project` before `$group` when the data is stored in an embedded document?"
- "Explain the four parameters of `$lookup` and state why the `as` field is always an array."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 關鍵數字與事實速記
| 項目 | 數值／事實 |
|---|---|
| Product 全集合單價總額 | `NumberDecimal("4075")` |
| Product 文件總數 | 9（`$sum: 1`） |
| 平均單價 | `452.777...`（4075 ÷ 9） |
| 最高／最低單價 | `Max: 800`／`Min: 175` |
| 各飾面總額 | Cherry 500、Natural Maple 650、Natural Ash 1925、White Ash 750、Walnut 250 |
| 薪金 > 10000 的員工數 | 4 |
| 全部訂單明細數量總和 | 45 |
| 訂單 1001 的員工 | Eric（`empDetail.firstname`） |
| 訂單 1001 的產品 | End Table、Coffee Table、Entertainment Center（3 件） |

### SQL ↔ MongoDB 對照表（必背）
| SQL | MongoDB Aggregation |
|---|---|
| `WHERE condition` | `{ $match: { condition } }` |
| `GROUP BY field` | `{ $group: { _id: "$field", ... } }` |
| `HAVING`（過濾群組） | `$group` **之後**的 `{ $match: { ... } }` |
| `SUM(col)` | `{ $sum: "$col" }` |
| `COUNT(*)` | `{ $sum: 1 }` |
| `AVG(col)` / `MAX(col)` / `MIN(col)` | `{ $avg: "$col" }` / `{ $max: "$col" }` / `{ $min: "$col" }` |
| `SELECT col1, col2`（投影） | `{ $project: { col1: 1, col2: 1 } }` |
| `LIKE "%Ash%"` | 正則表達式 `/Ash/` |
| `LEFT OUTER JOIN` | `{ $lookup: { from, localField, foreignField, as } }` |
| `SELECT null AS _id, ...`（全表一組） | `{ $group: { _id: null, ... } }` |

### 語法骨架（默寫用）
```javascript
// 條件查詢等價
db.Employee.find({ title: "Sales" });
db.Employee.aggregate({ $match: { title: "Sales" } });

// 計數
db.Employee.find({ salary: { $gt: 10000 } }).count();   // 4
db.Employee.count({ salary: { $gt: 10000 } });          // 4

// 全集合統計
db.Product.aggregate({ $group: { _id: null, Count: { $sum: 1 }, Total: { $sum: "$unit_price" } } });

// 按欄位分組
db.Product.aggregate({ $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } } });

// 過濾 → 分組 → 過濾群組（WHERE → GROUP BY → HAVING）
db.Product.aggregate([
  { $match: { product_finish: /Ash/ } },
  { $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } } },
  { $match: { Total: { $gt: 1000 } } }
]);

// 內嵌文件：先 $project 再 $group
db.Orders.aggregate([
  { $project: { total: { $sum: "$order_line.quantity" } } },
  { $group: { _id: null, total: { $sum: "$total" } } },
  { $project: { _id: 0 } }
]);

// 跨集合查詢
db.Orders.aggregate([
  { $match: { order_id: 1001 } },
  { $lookup: { from: "Employee", localField: "emp", foreignField: "_id", as: "empDetail" } },
  { $project: { _id: 0, order_id: 1, "empDetail.firstname": 1 } }
]);
```

### 英文極速記憶口訣
- **Pipeline 三特性**：*Filter, Sort, Group, Reshape, Analyze — but NEVER change the data.*
- **Stage 口訣**：*A stage processes but does not permanently alter.*
- **`$group` 的 `_id` 口訣**：*`_id: null` = one group for all; `_id: "$field"` = one group per value.*
- **`$match` 位置口訣**：*Before `$group` = WHERE (raw fields only); After `$group` = HAVING (aggregated fields OK).*
- **內嵌文件口訣**：*Embedded array? `$project` first, `$group` second.*
- **`$lookup` 四參數口訣**：*FROM which collection, LOCAL key here, FOREIGN key there, AS an array output.*
- **`$lookup` 陣列口訣**：*Lookup result is ALWAYS an array — even one match is `[ { ... } ]`.*

### 最後檢查（考前自問）
1. 我能否默寫「Aggregation / Stage / Aggregation pipeline」三條英文定義？✓／✗
2. 我能否講出 `$match` 在 `$group` 前後的分別，並指出哪個對應 `WHERE`、哪個對應 `HAVING`？✓／✗
3. 我能否由頭默寫 `$lookup` 四參數及「結果必然是陣列」？✓／✗
4. 我能否解釋「為何第一個 stage 不能用 `$group` 直接處理內嵌文件」？✓／✗
5. 我能否把任一範例的 MongoDB 管道翻譯成等價 SQL（反之亦然）？✓／✗
