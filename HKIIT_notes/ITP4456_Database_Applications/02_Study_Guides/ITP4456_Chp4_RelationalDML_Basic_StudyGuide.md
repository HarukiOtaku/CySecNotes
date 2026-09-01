# ITP4456 Chapter 4: Relational DML – Basic Data Manipulation — 雙語應考學習指南

> **來源**：ITP4456 Database Applications — Chapter 4: Relational DML – Basic Data Manipulation
> **原始檔**：`01_Raw_Materials/Lectures/Chp4 Relational DML Basic Data Manipulation.pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 每個 SQL 範例自己默寫一次（先蓋住答案）→ 用最後嘅 Cheat Sheet 做考前衝刺

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本章是全課程的「動手核心」——**Relational DML（Relational Data Manipulation Language，關聯式資料操作語言）** 是 SQL 中用來**操作資料（manipulate data）**而非定義結構嘅語言。課程目標（Module Intended Learning Outcome）係「perform database operations to implement data models and manipulate data in the applications」——即係話你唔單止要識設計資料庫（Chapter 2-3 嘅 Data Model 與 DDL），仲要識用 SQL 喺應用程式中**增、刪、改、查**真實資料。本章只講 **CRUD 操作**（Create、Read、Update、Delete）入面嘅 **Read（查詢）** 部分（Single Table Query）同埋 **Insert / Update / Delete** 三大寫入操作，全部針對**單一資料表（single table）**；多表關聯查詢會留到 Chapter 5（Advanced Data Manipulation）先講。

技術重點有兩大塊：第一，**SELECT 查詢**——由最基本的 `SELECT * FROM table;` 出發，逐步加入 `WHERE` 篩選條件（比較、範圍、集合、模糊比對、NULL 判斷）、`ORDER BY` 排序、`DISTINCT` 去重、算術運算與 `AS` 別名、以及 `DATE()`／`YEAR()`／`MONTH()`／`DAY()` 日期函數；第二，**INSERT / UPDATE / DELETE 三大寫入指令**——重點係理解 `WHERE` 子句「可省略」嘅危險性（省略 = 影響全部資料列）、`INSERT` 嘅 column list 對應規則、以及 `DEFAULT`／`NULL` 嘅運用。

實務情境一：公司 HR 系統要為全體員工出糧——管理員用 `SELECT emp_id, firstname, lastname, salary/12 AS monthly_salary FROM employee;` 即時計出每月薪金，而**唔會**更改 `employee` 表入面原本嘅 `salary` 資料（計算結果只係顯示用，唔會寫返入去）；發薪後再用 `UPDATE employee SET salary = salary * 1.05 WHERE title = 'Manager';` 一次過幫所有經理加 5% 人工。呢啲就係典型嘅「讀取報表 + 批次更新」日常維護流程。

實務情境二：網上傢俬店後台維護產品目錄——新產品入庫用 `INSERT INTO product ... VALUES (...)`；產品下架用 `DELETE FROM product WHERE product_id = 8;`（必須帶 `WHERE`，否則成個表會被清空）；客戶查詢「搵所有名稱含 'Drawer' 嘅產品」用 `WHERE product_name LIKE '%Drawer%'`。一個冇受過訓練嘅同事如果漏咗 `WHERE` 執行 `DELETE FROM product;`，成個產品目錄即刻冇晒——所以本章嘅考題好鍾意問「呢條 SQL 會影響幾多行？」。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **默寫 SELECT 完整語法** — Write the complete SELECT statement syntax and identify which clauses are mandatory (only `SELECT` and `FROM`)
2. **執行基本查詢** — Retrieve all rows/all columns, specific columns, and computed expressions with `AS` aliases
3. **消除重複** — Use `DISTINCT` to eliminate duplicate values in query results
4. **應用搜尋條件** — Apply search conditions: comparison operators, `BETWEEN ... AND ...`, `IN (...)`, `LIKE` pattern matching, `IS NULL`
5. **排序結果** — Order query results with `ORDER BY` using `ASC`/`DESC` and multiple columns
6. **使用日期函數** — Use `DATE()`, `YEAR()`, `MONTH()`, `DAY()` functions to extract date parts
7. **執行 INSERT** — Insert rows with/without a column list and explain the matching rules (position, count, data type)
8. **執行 UPDATE** — Update one or more columns with `SET` and explain the effect of omitting `WHERE`
9. **執行 DELETE** — Delete specific rows vs all rows, and explain the effect of omitting `WHERE`
10. **分辨 NULL 陷阱** — Distinguish `IS NULL` from `= NULL` and `= ""`
11. **CRUD 分類** — Classify SQL statements into CRUD operations (Create/Read/Update/Delete)

## 📖 3. 雙語深度理論知識點（Comprehensive Notes — 應考完全替代版）

### 3.1 模組學習成果與 CRUD 總覽

#### 3.1.1 Module Intended Learning Outcome（MILO）

繁中解說：本模組的整體學習成果係「執行資料庫操作，去實現資料模型，並喺應用程式中操作資料」——即係將 Chapter 2-3 設計好嘅 relational data model 用 DDL 實現之後，再用 DML 喺應用程式層面實際讀寫資料。本章就是 DML 嘅第一炮：Basic Data Manipulation。

> English Standard Definitions:
> - "On completion of the module, students are expected to be able to: perform database operations to implement data models and manipulate data in the applications."

#### 3.1.2 CRUD Operations（四大基本操作）

繁中解說：本章所有 SQL 指令都可以歸入 **CRUD** 四大類。**Create**（建立）= `INSERT`；**Read**（讀取）= `SELECT`；**Update**（更新）= `UPDATE`；**Delete**（刪除）= `DELETE`。本章結構正正就係「Single Table Query（讀）」+「Insert, Update, Delete（寫）」。記住：`SELECT` 唔會改動資料庫任何資料，而 `INSERT`／`UPDATE`／`DELETE` 先至會實際修改（commit 後）資料。

> English Standard Definitions:
> - "CRUD operations: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE) — the four basic operations to store and manipulate data in a database."

### 3.2 Single Table Query — SELECT 查詢

#### 3.2.1 SELECT 完整語法（Statement Syntax）

繁中解說：SELECT 語句由多個子句（clause）組成，**排列次序唔可以更改**（order of the clauses cannot be changed），而且**只有 `SELECT` 同 `FROM` 係必須**，其餘全部可選。語法骨架如下：

```sql
SELECT [DISTINCT | ALL] { * | [columnExpression [AS newName]] [,...] }
FROM   TableName [alias] [, ...]
[WHERE      condition]
[GROUP BY   columnList [HAVING condition] ]
[ORDER BY   columnList [ASC | DESC] [,...] ];
```

繁中解說：逐個元素拆解——`SELECT` 後面可以揀 `DISTINCT`（去重）或 `ALL`（預設，保留全部）；輸出項目可以係 `*`（所有欄位）或者一連串 `columnExpression`（欄位、常數、算術表達式），每個都可以用 `AS newName` 改名。`FROM` 指定來源表（可加 alias 別名）。之後按固定順序：`WHERE` 篩選列 → `GROUP BY` 分組（可加 `HAVING` 篩選組）→ `ORDER BY` 排序。**GROUP BY / HAVING 本章只出現喺語法度，深入應用喺 Chapter 5**。

> English Standard Definitions:
> - "The order of the clauses cannot be changed."
> - "Only SELECT and FROM are mandatory; all other clauses (WHERE, GROUP BY, HAVING, ORDER BY) are optional."

#### 3.2.2 全部列 × 全部欄（All Rows, All Columns）

繁中解說：最簡單嘅查詢——列出某張表嘅所有資料。可以逐欄寫出欄名，或者用 `*` 作為「所有欄位」嘅縮寫。以下兩條 SQL 效果相同。

```sql
SELECT emp_id, lastname, firstname, title, salary
FROM employee;

-- 用 * 代表所有欄位（abbreviation for 'all columns'）
SELECT * FROM employee;
```

> English Standard Definitions:
> - "Can use * as an abbreviation for 'all columns'."

#### 3.2.3 指定欄 × 全部列（Specific Columns, All Rows）

繁中解說：如果只需要某幾欄，就喺 `SELECT` 後列出所需欄名，用逗號分隔；欄位顯示順序跟隨你寫嘅次序。例子：為全體員工出薪酬清單，只需要員工 ID、薪金、姓氏同名字。

```sql
SELECT emp_id, salary, lastname, firstname
FROM employee;
```

#### 3.2.4 DISTINCT 消除重複（Eliminate Duplicates）

繁中解說：預設 `SELECT` 會顯示所有匹配列（包括重複值）。加 `DISTINCT` 關鍵字就可以**消除結果入面完全重複嘅值**。例子：列出所有產品的表面處理（finish）——好多產品共用同一種 finish，唔加 `DISTINCT` 會重複出現。

```sql
-- 未去重：同一 finish 會出現多次
SELECT product_finish FROM product;

-- 用 DISTINCT 消除重複
SELECT DISTINCT product_finish FROM product;
```

> English Standard Definitions:
> - "Use DISTINCT to eliminate duplicates."

#### 3.2.5 計算（Computation）與 AS 別名

繁中解說：`SELECT` 後面可以放**算術表達式**（例如 `salary/12`）去做計算。重點：計算**只喺顯示時進行，唔會真正更新表中嘅記錄**（show computation result only, not really update the records in the table）。想幫計算結果改名，就用 `AS` 子句建立別名（alias）。

```sql
-- 直接輸出計算結果（欄名會顯示為表達式本身）
SELECT emp_id, firstname, lastname, salary/12
FROM employee;

-- 用 AS 命名計算欄位
SELECT emp_id, firstname, lastname, salary/12 AS monthly_salary
FROM employee;
```

> English Standard Definitions:
> - "Show computation result only, not really update the records in the table."
> - "To name column, use AS clause to create alias name."

#### 3.2.6 比較搜尋條件（Comparison Search Condition）

繁中解說：`WHERE` 子句用比較運算子（comparison operators）篩選列。六個比較運算子：`>`（大於）、`>=`（大於或等於）、`<`（小於）、`<=`（小於或等於）、`=`（等於）、`<>` 或 `!=`（不等於）。字串字面值要用**單引號**包住，例如 `'Beijing'`。多個條件可以用 `AND`／`OR` 組合。

```sql
-- 列出薪金大於 15,000 嘅所有員工
SELECT * FROM employee
WHERE salary > 15000;

-- 列出地址喺北京或澳門嘅所有客戶（OR 連接）
SELECT * FROM customer
WHERE city = 'Beijing' OR city = 'Macau';
```

> English Standard Definitions:
> - "Comparison operators: >, >=, <, <=, =, <>, !=."

#### 3.2.7 範圍搜尋條件（Range Search Condition）

繁中解說：要篩選「介乎兩個值之間」嘅範圍，可以用 `>= ... AND <= ...` 組合，或者用更簡潔嘅 `BETWEEN ... AND ...`。**`BETWEEN` 包含兩個端點（inclusive）**——即係 `BETWEEN 10000 AND 20000` 等於 `salary >= 10000 AND salary <= 20000`。仲有否定版本 `NOT BETWEEN ... AND ...`（即範圍之外）。

```sql
-- 方法一：AND 組合（inclusive）
SELECT * FROM employee
WHERE salary >= 10000 AND salary <= 20000;

-- 方法二：BETWEEN ... AND ...（同樣包含 10000 同 20000）
SELECT * FROM employee
WHERE salary BETWEEN 10000 AND 20000;
```

> English Standard Definitions:
> - "BETWEEN ... AND ... tests for a range of values, inclusive of the two boundary values."
> - "Also a negated version: NOT BETWEEN ... AND ..."

#### 3.2.8 集合成員（Set Membership）— IN / NOT IN

繁中解說：當要篩選「等於若干個值之一」時，用一串 `OR` 好冗長；`IN ( ... )` 運算子可以一句搞掂——只要欄位值屬於括號內集合嘅其中一個就符合。亦都有否定版本 `NOT IN ( ... )`。

```sql
-- 方法一：一串 OR
SELECT * FROM employee
WHERE title = 'Manager' OR title = 'Secretary';

-- 方法二：IN 運算子（等價）
SELECT * FROM employee
WHERE title IN ('Manager', 'Secretary');
```

> English Standard Definitions:
> - "IN ( ... ) tests whether a value matches any member of a given set."
> - "Also a negated version: NOT IN ( ... )"

#### 3.2.9 模式比對（Pattern Matching）— LIKE / % / _

繁中解說：`LIKE` 用兩個特殊符號做模糊比對：**`%`** 代表「零個或以上任意字元」嘅序列（sequence of zero or more characters）；**`_`**（底線）代表「剛好一個任意字元」（any single character）。例子 `LIKE '%Drawer%'` 表示「任何長度嘅字元序列，只要中間包含 'Drawer'」就符合——即係名稱開頭、中間或結尾有 Drawer 都得。否定版本係 `NOT LIKE`。

```sql
-- 搵所有名稱包含 'Drawer' 嘅產品
SELECT * FROM product
WHERE product_name LIKE '%Drawer%';
```

繁中解說：記住 `%` 同 `_` 嘅分別——`%` 可以配對零個字元（所以 `'%Drawer%'` 連名稱就係 "Drawer" 都配對到），而 `_` 一定要佔一個位置。例如 `LIKE '_a%'` 配對第二個字元係 'a' 嘅字串。

> English Standard Definitions:
> - "SQL has two special pattern matching symbols: % : sequence of zero or more characters; _ : (underscore) any single character."
> - "LIKE '%Drawer%' means a sequence of characters of any length containing 'Drawer'."
> - "Also a negated version: NOT LIKE"

#### 3.2.10 NULL 搜尋條件（Null Search Condition）

繁中解說：`NULL` 代表「無值／未提供」，**必須用關鍵字 `IS NULL` 明確測試**——唔可以用 `= NULL`，亦唔等於空字串 `""`。`description = NULL` 同 `description = ""` 都**唔係** `IS NULL` 嘅等價寫法（`= NULL` 永遠唔成立，因為 NULL 唔係一個值；`""` 係一個「空字串」值，同「無值」係兩回事）。非 NULL 值就用否定版本 `IS NOT NULL` 測試。

```sql
-- 列出 finish 係 Natural Ash 而且 description 未提供（NULL）嘅產品
SELECT * FROM product
WHERE product_finish = 'Natural Ash' AND description IS NULL;
```

```sql
-- 以下兩種寫法都唔等於 IS NULL：
description = NULL    -- 錯誤：NULL 唔可以同 = 比較
description = ""      -- 唔同："" 係空字串值，唔係無值
```

> English Standard Definitions:
> - "Have to test for null explicitly using keyword IS NULL."
> - "Both description = NULL and description = "" are NOT the same as IS NULL."
> - "Negated version (IS NOT NULL) can test for non-null values."

#### 3.2.11 回傳次序（Order of Return）— ORDER BY

繁中解說：SQL 查詢結果預設**冇保證次序**；要指定次序就用 `ORDER BY` 子句。預設（冇寫）係**升序 `ASC`（ascending）**，要降序就用 `DESC`（descending）。`ORDER BY` 永遠放喺成條 SQL 嘅最尾（緊接 `WHERE` 之後）。

```sql
-- 按 title 升序排列（ASC 可省略，因為係預設）
SELECT emp_id, firstname, lastname, title, salary
FROM employee
ORDER BY title;

-- 按 salary 降序排列
SELECT emp_id, firstname, lastname, salary
FROM employee
ORDER BY salary DESC;
```

> English Standard Definitions:
> - "ORDER BY sorts the result; ASC (ascending) is the default order, DESC sorts in descending order."

#### 3.2.12 多欄排序（Multiple Column Ordering）

繁中解說：`ORDER BY` 可以跟多個欄位，**排位優先次序由左至右**——第一個欄位做主排序鍵，第二個做次排序鍵。每個欄位可以獨立指定 `ASC`／`DESC`。例子：先按 `title` 升序，同一職位內再按 `salary` 降序。

```sql
SELECT emp_id, firstname, lastname, title, salary
FROM employee
ORDER BY title ASC, salary DESC;
```

> English Standard Definitions:
> - "ORDER BY title ASC, salary DESC: arrange in order of title first; then in descending order of salary."

#### 3.2.13 日期函數 DATE() / YEAR() / MONTH() / DAY()

繁中解說：SQL 提供日期處理函數，全部用嚟「提取」日期嘅某一部分。**`DATE()`** 由一個 date 或 datetime 表達式**抽出日期部分**；**`YEAR()`** 回傳年份，範圍 **1000 至 9999**；**`MONTH()`** 回傳月份，範圍 **1 至 12**（1 = 一月，12 = 十二月）；**`DAY()`** 回傳「當月第幾日」，範圍 **1 至 31**。考試常問三個範圍數字：YEAR 1000–9999、MONTH 1–12、DAY 1–31。

> English Standard Definitions:
> - "DATE() function extracts the date part of the date or datetime expression."
> - "YEAR() function returns the year for date, in the range 1000 to 9999."
> - "MONTH() function returns the month for date, in the range 1 to 12 for January to December."
> - "DAY() function returns the day of the month for date, in the range 1 to 31."

### 3.3 Insert, Update, Delete — 寫入操作

#### 3.3.1 INSERT 語法與匹配規則（Insert … Values）

繁中解說：`INSERT` 用嚟加入新資料列（row）。語法：`INSERT INTO tableName [(columnList)] VALUES (dataValueList);`。有三條關鍵規則（講義明文列出，必考）：

1. **columnList 可省略**——如果省略，SQL 會假設你按**建立表（CREATE TABLE）時嘅原本欄位次序**提供晒所有欄位嘅值；
2. **省略嘅欄位必須**喺建表時宣告為 `NULL`（可空）或者**設咗 `DEFAULT`** 值——否則插入會失敗；
3. **dataValueList 必須同 columnList 匹配**：兩個 list 嘅**項目數量必須相同**；項目之間係**位置直接對應**（direct correspondence in position）；每個 data value 的**資料型別必須同對應欄位相容**（compatible）。

```sql
INSERT INTO tableName [ ( columnList ) ]
VALUES ( dataValueList );
```

> English Standard Definitions:
> - "If columnList is omitted, SQL assumes a list of all columns in their original CREATE TABLE order."
> - "Any columns omitted must have been declared as NULL when table was created, unless DEFAULT was specified when creating column."
> - "dataValueList must match columnList: (1) number of items in each list must be same; (2) direct correspondence in position of items in two lists; (3) data type of each item in dataValueList must be compatible with data type of corresponding column."

#### 3.3.2 INSERT 完整資料列（全部欄位）

繁中解說：為 `customer` 表插入新客戶，提供晒所有欄位。兩種寫法：唔寫 columnList（依 CREATE TABLE 原始次序逐個值對應），或者寫明 columnList（次序可以自由排，但 VALUES 必須跟返 columnList 嘅次序）。

```sql
-- 寫法一：省略 columnList（依建表次序）
INSERT INTO customer
VALUES (21, 'Awesome Furniture', '110 Queens Road',
        'Hong Kong', 'GD', 999077);

-- 寫法二：明確 columnList（次序任排，但要位置對應）
INSERT INTO customer
    (customer_id, customer_name, customer_address,
     city, state, postal_code)
VALUES (21, 'Awesome Furniture', '110 Queens Road',
        'Hong Kong', 'GD', 999077);
```

繁中解說：兩條 SQL 插入嘅資料完全相同——關鍵係**位置對應**（direct correspondence in position）：`VALUES` 入面第一個值對應 columnList 第一個欄位，第二個對應第二個，如此類推。省略 columnList 時就要記住建表次序。

#### 3.3.3 INSERT 使用預設值（Insert Using Defaults）

繁中解說：如果只提供「必須欄位」（mandatory columns），其他欄位用 `NULL`／`DEFAULT` 自動填——兩條路：(1) 寫出 subset 嘅 columnList，只提供呢啲欄位嘅值；(2) 省略 columnList，但必須喺對應位置**明確填 `NULL`** 俾可空欄位。

```sql
-- 方法一：只提供必須欄位（customized order 都得）
INSERT INTO customer (customer_id, customer_address, customer_name)
VALUES (21, '110 Queens Road', 'Awesome Furniture');

-- 方法二：省略 columnList，空欄位位置填 NULL
INSERT INTO customer
VALUES (21, 'Awesome Furniture', '110 Queens Road', NULL, NULL, NULL);
```

> English Standard Definitions:
> - "Omitted columns must be nullable (declared NULL) or have a DEFAULT value defined at CREATE TABLE time."

#### 3.3.4 UPDATE 語法與 SET / WHERE 角色

繁中解說：`UPDATE` 用嚟修改現有資料列。語法：`UPDATE tableName SET columnName1 = dataValue1 [, columnName2 = dataValue2 ...] [WHERE searchCondition];`。兩個子句嘅角色好重要：

- **`SET` 子句**：指明要更新嘅**一個或多個欄位**及新值；
- **`WHERE` 子句可省略**：省略時，被指名嘅欄位會**喺表內所有資料列（all rows）全部更新**；有 `WHERE` 時，只有符合 searchCondition 嘅列先至被更新；
- 新值（dataValue）必須同對應欄位嘅**資料型別相容**。

```sql
UPDATE tableName
SET    columnName1 = dataValue1 [, columnName2 = dataValue2 ...]
[WHERE searchCondition];
```

> English Standard Definitions:
> - "SET clause specifies names of one or more columns to be updated."
> - "WHERE clause is optional: if omitted, named columns are updated for all rows in table; if specified, only those rows that satisfy searchCondition are updated."
> - "New dataValue(s) must be compatible with data type for corresponding column."

#### 3.3.5 UPDATE 實例一：指定單一資料列

繁中解說：將員工編號 303 嘅 Kevin Lau 升職做 Manager 並加薪至 18,000。一次 SET 兩個欄位，用 `WHERE emp_id = 303` 精準鎖定一條列——因為 `emp_id` 係主鍵（unique），所以只影響呢一列。

```sql
UPDATE employee
SET    title = 'Manager',
       salary = 18000
WHERE  emp_id = 303;
```

#### 3.3.6 UPDATE 實例二：批次更新（計算表達式做新值）

繁中解說：`SET` 嘅新值可以係**基於原值嘅算術表達式**——例如 `salary = salary * 1.05` 即係「新薪金 = 原薪金 × 1.05」（加 5%）。呢度用 `WHERE title = 'Manager'` 確保只加薪俾所有 Manager，其他職位不受影響。

```sql
-- 俾所有 Manager 加 5% 人工
UPDATE employee
SET    salary = salary * 1.05
WHERE  title = 'Manager';
```

#### 3.3.7 DELETE 語法與 WHERE 角色

繁中解說：`DELETE` 用嚟刪除資料列。語法：`DELETE FROM tableName [WHERE searchCondition];`。兩點要記：

- **tableName** 可以係 base table（基本表）或者 **updatable view（可更新嘅視圖）**；
- **`WHERE` 可省略**——省略時會刪除表中**所有資料列**；有 `WHERE` 時只刪符合條件嘅列。

⚠️ 考試陷阱：`DELETE FROM product;`（冇 WHERE）會清空成個表——呢個操作唔會刪除表結構本身，只係刪晒所有資料（類似 TRUNCATE 嘅效果，但語法上係 DML）。

```sql
DELETE FROM tableName
[WHERE searchCondition];
```

> English Standard Definitions:
> - "tableName can be name of a base table or an updatable view."
> - "WHERE clause is optional: if omitted, all rows are deleted from table; if specified, only those rows that satisfy searchCondition are deleted."

#### 3.3.8 DELETE 實例

繁中解說：兩個例子——精準刪除一條產品（`WHERE product_id = 8`），以及清空成個 `product` 表（冇 `WHERE`，刪晒所有記錄）。

```sql
-- 刪除 product_id 係 8 嘅產品
DELETE FROM product
WHERE product_id = 8;

-- 刪除 product 表所有記錄（無 WHERE）
DELETE FROM product;
```

## 📖 4. 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型（Exam Answer Phrase） |
|---|---|---|
| `SELECT` | 讀取／查詢資料嘅 SQL 語句，屬於 CRUD 嘅 Read | "SELECT retrieves data from one or more tables; it does not modify the data." |
| `FROM` | 指定查詢來源資料表；同 `SELECT` 一樣係唯一兩個必須子句 | "Only SELECT and FROM are mandatory clauses in a SELECT statement." |
| `DISTINCT` | 消除結果中完全重複嘅值 | "Use DISTINCT to eliminate duplicates from the query result." |
| `AS newName` | 為輸出欄位／計算結果建立別名 | "The AS clause creates an alias name for a column or computed expression." |
| columnExpression | 欄位、常數或算術表達式（如 `salary/12`） | "A column expression may be a column name, a constant, or an arithmetic expression." |
| comparison operators | 比較運算子 `> >= < <= = <> !=` | "Comparison operators include >, >=, <, <=, =, <>, !=." |
| `BETWEEN ... AND ...` | 範圍測試，包含兩個端點 | "BETWEEN ... AND ... tests an inclusive range; it is equivalent to >= AND <=." |
| `NOT BETWEEN ... AND ...` | 範圍外測試 | "NOT BETWEEN ... AND ... is the negated version, testing values outside the range." |
| `IN ( ... )` | 集合成員測試，值等於集合中任一成員即符合 | "IN ( ... ) tests whether a value matches any member of the given set; NOT IN ( ... ) is its negation." |
| `LIKE` | 模糊字串比對運算子 | "LIKE is used for pattern matching on character strings." |
| `%` | 配對零個或以上任意字元 | "% matches a sequence of zero or more characters." |
| `_` | 配對剛好一個任意字元 | "_ (underscore) matches any single character." |
| `NOT LIKE` | 模糊比對嘅否定版本 | "NOT LIKE is the negated form of LIKE." |
| `IS NULL` | 明確測試欄位值係咪 NULL（無值） | "NULL must be tested explicitly using IS NULL, never with = NULL." |
| `IS NOT NULL` | 測試欄位值唔係 NULL | "IS NOT NULL tests for non-null values." |
| `ORDER BY` | 排序結果，預設升序 | "ORDER BY sorts the result; ASC is the default, DESC gives descending order." |
| `ASC` / `DESC` | 升序／降序 | "ASC (ascending) is the default sort order; DESC sorts in descending order." |
| `DATE()` | 由 date/datetime 表達式抽出日期部分 | "DATE() extracts the date part of a date or datetime expression." |
| `YEAR()` | 回傳年份（1000–9999） | "YEAR() returns the year for a date, in the range 1000 to 9999." |
| `MONTH()` | 回傳月份（1–12） | "MONTH() returns the month for a date, in the range 1 to 12." |
| `DAY()` | 回傳當月第幾日（1–31） | "DAY() returns the day of the month for a date, in the range 1 to 31." |
| `INSERT INTO ... VALUES` | 新增資料列（CRUD 嘅 Create） | "INSERT INTO tableName [(columnList)] VALUES (dataValueList) adds a new row to a table." |
| columnList | INSERT 時列出要提供值嘅欄位 | "If columnList is omitted, SQL assumes all columns in their original CREATE TABLE order." |
| dataValueList | 對應 columnList 嘅值清單 | "dataValueList must match columnList in number of items, position, and compatible data types." |
| `DEFAULT` | 建表時為欄位設嘅預設值 | "Omitted columns must be nullable or have a DEFAULT value defined at CREATE TABLE." |
| `UPDATE ... SET` | 修改現有資料（CRUD 嘅 Update） | "UPDATE tableName SET column = value [WHERE condition] modifies existing rows." |
| `DELETE FROM` | 刪除資料列（CRUD 嘅 Delete） | "DELETE FROM tableName [WHERE condition] removes rows; omitting WHERE deletes all rows." |
| updatable view | 可更新嘅視圖，可作為 DELETE 嘅目標 | "The table name in DELETE can be a base table or an updatable view." |
| CRUD | Create / Read / Update / Delete 四大操作 | "CRUD stands for Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE)." |
| DML | Data Manipulation Language 資料操作語言 | "DML (Data Manipulation Language) manipulates data in the database: INSERT, UPDATE, DELETE, SELECT." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**第一步：先理解甚麼概念**
1. 理解 CRUD 四大操作點樣對應 SQL 四大指令（`INSERT`=Create、`SELECT`=Read、`UPDATE`=Update、`DELETE`=Delete）。
2. 理解 SELECT 子句固定次序（SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY）——「次序唔可以改、只有 SELECT 同 FROM 必須」。
3. 理解 `NULL` 嘅本質：NULL 唔係一個值，所以要用 `IS NULL` 測試，`= NULL` 永遠唔成立。
4. 理解 `WHERE` 省略嘅後果：UPDATE／DELETE 冇 WHERE = 影響所有列。
5. 理解 `%` vs `_` 嘅分別：`%` 任意長度（包括零個），`_` 剛好一個字元。

**第二步：背誦甚麼英文短語**
- "Only SELECT and FROM are mandatory; the order of clauses cannot be changed."
- "Use DISTINCT to eliminate duplicates."
- "BETWEEN ... AND ... is inclusive; NOT BETWEEN is its negation."
- "NULL must be tested explicitly using IS NULL, not = NULL or = ''."
- "If WHERE is omitted, all rows are updated/deleted."
- "If columnList is omitted, SQL assumes all columns in their original CREATE TABLE order."
- "dataValueList must match columnList in number, position, and data type."
- "YEAR(): 1000–9999; MONTH(): 1–12; DAY(): 1–31."

**第三步：掌握甚麼計算／寫法**
- 默寫完整 SELECT 語法骨架（含 `[DISTINCT | ALL]`、`[AS newName]`、`[alias]`、`[ASC | DESC]`）。
- 手寫三種 WHERE 篩選：範圍（`>= AND <=` vs `BETWEEN`）、集合（一串 `OR` vs `IN`）、模糊（`LIKE '%Drawer%'` vs `LIKE '_a%'`）。
- 手寫計算欄位加別名：`salary/12 AS monthly_salary`。
- 手寫多欄排序：`ORDER BY title ASC, salary DESC`（左至右優先）。
- 手寫 INSERT 三種形態：全欄位（省略 columnList）／明確 columnList（任意次序）／部分欄位（其餘 NULL 或 DEFAULT）。
- 手寫 UPDATE 計算式：`SET salary = salary * 1.05 WHERE title = 'Manager'`。
- 手寫 DELETE 兩種：帶 `WHERE` 刪指定列 vs 唔帶 `WHERE` 清空表。

**第四步：能解答甚麼英文考題**
- "Write the SQL to list all staff with salary between 10,000 and 20,000." → `WHERE salary BETWEEN 10000 AND 20000`
- "List the product finishes without duplicates." → `SELECT DISTINCT product_finish FROM product;`
- "Find all products whose name contains 'Drawer'." → `WHERE product_name LIKE '%Drawer%'`
- "Explain why `description = NULL` is wrong." → "NULL must be tested with IS NULL; = NULL never evaluates to true."
- "What happens if WHERE is omitted in UPDATE/DELETE?" → "All rows in the table are affected."
- "Insert a new customer with only mandatory columns." → 部分 columnList 版 INSERT。
- "Give all Managers a 5% pay rise." → `UPDATE employee SET salary = salary * 1.05 WHERE title = 'Manager';`

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 6.1 關鍵數字（Key Numbers）

| 項目 | 數字／範圍 |
|---|---|
| SELECT 必須子句 | 只有 `SELECT` 同 `FROM` |
| `YEAR()` 回傳範圍 | 1000 – 9999 |
| `MONTH()` 回傳範圍 | 1 – 12（Jan = 1） |
| `DAY()` 回傳範圍 | 1 – 31 |
| `%` 配對 | 零個或以上字元 |
| `_` 配對 | 剛好 1 個字元 |
| `BETWEEN 10000 AND 20000` | 包含兩端（inclusive） |
| UPDATE/DELETE 無 WHERE | 影響／刪除**所有列** |

### 6.2 語法極速對照表（Syntax Quick Reference）

```sql
-- READ
SELECT [DISTINCT] col1, salary/12 AS monthly_salary
FROM   employee
WHERE  salary BETWEEN 10000 AND 20000      -- 範圍（inclusive）
  AND  title IN ('Manager', 'Secretary')   -- 集合
  AND  product_name LIKE '%Drawer%'        -- 模糊（% 任意長度、_ 單字元）
  AND  description IS NULL                 -- NULL 測試（唔用 = NULL）
ORDER BY title ASC, salary DESC;           -- 多欄排序，左至右優先

-- CREATE
INSERT INTO customer (customer_id, customer_name) VALUES (21, 'Awesome Furniture');
-- 省略 columnList = 依 CREATE TABLE 次序俾晒所有欄位；省略欄位須 NULL/DEFAULT

-- UPDATE
UPDATE employee SET salary = salary * 1.05 WHERE title = 'Manager';   -- 無 WHERE = 全表更新

-- DELETE
DELETE FROM product WHERE product_id = 8;    -- 精準刪除
DELETE FROM product;                          -- 無 WHERE = 清空全表
```

### 6.3 等價寫法記憶（Equivalent Forms）

| 長寫法 | 短寫法 |
|---|---|
| `salary >= 10000 AND salary <= 20000` | `salary BETWEEN 10000 AND 20000` |
| `title = 'Manager' OR title = 'Secretary'` | `title IN ('Manager', 'Secretary')` |
| 全部欄位逐一列出 | `SELECT * FROM table;` |
| 計算欄位冇名 | `salary/12 AS monthly_salary` |

### 6.4 英文極速記憶口訣（Memory Phrases）

1. **「S-F-W-G-H-O」**：子句次序 = **S**ELECT → **F**ROM → **W**HERE → **G**ROUP BY → **H**AVING → **O**RDER BY；Only **S**elect & **F**rom are **m**andatory（口訣：**SFWGHO = "Only SF are must"**）。
2. **「% 係海綿，_ 係一粒豆」**：`%` 吸幾多字都得（零都得）；`_` 淨係食一粒字。
3. **「NULL 用 IS，唔用 =」**："NULL must be tested with IS NULL, never with = NULL or = ''."
4. **「無 WHERE = 全表遭殃」**："No WHERE means ALL rows are affected."（UPDATE 同 DELETE 都適用）
5. **「BETWEEN 包兩邊」**："BETWEEN ... AND ... is inclusive."
6. **「DISTINCT 去重複」**："DISTINCT eliminates duplicates."
7. **「AS 改名唔改資料」**："AS names a computed column; computation never updates the table."
8. **數字口訣「千九三一」**：YEAR **1000**–9999、MONTH **1**–12、DAY **1**–31 → 「年千、月十二、日卅一」。

### 6.5 常見考題陷阱（Exam Traps）

- ❌ `description = NULL` → ✅ `description IS NULL`
- ❌ 以為 `""`（空字串）等於 NULL → ✅ 空字串係一個值，NULL 係無值
- ❌ `DELETE FROM product;` 以為刪表 → ✅ 係刪晒所有記錄（table 結構保留）
- ❌ 省略 INSERT columnList 但漏咗欄位 → ✅ 必須提供全部欄位（依建表次序）
- ❌ 以為 SELECT 計算會寫入資料庫 → ✅ 只係顯示結果，唔會更新表
- ❌ `ORDER BY` 放喺 `WHERE` 前面 → ✅ 次序固定：WHERE 先，ORDER BY 最尾
- ❌ 唔記得字串值要加單引號（`'Manager'`）→ ✅ 字串字面值必須用單引號包住
