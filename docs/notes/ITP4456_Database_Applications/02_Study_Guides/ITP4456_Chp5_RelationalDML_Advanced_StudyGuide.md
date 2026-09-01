# ITP4456 Chp5: Relational DML – Advanced Data Manipulation — 雙語應考學習指南

> **來源**：ITP4456 Database Applications — Chapter 5: Relational DML – Advanced Data Manipulation
> **原始檔**：`01_Raw_Materials/Lectures/Chp5 Relational DML Advanced Data Manipulation.pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 每個 SQL 範例親手抄寫一次並默寫出「合法／非法」判斷 → 用學習路線自測
> **本課對應 Module ILO**：*Perform database operations to implement data models and manipulate data in the applications.*

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課是 **DML（Data Manipulation Language，資料操縱語言）的進階篇**，建基於基本 `SELECT ... FROM ... WHERE` 之上，加入兩大塊核心能力：(1) **Aggregate Functions（聚合函數）與 Grouping（分組）**——用 `COUNT`、`SUM`、`MIN`、`MAX`、`AVG` 對整張表或每個群組做統計，配合 `GROUP BY` 產生小計（sub-totals）、配合 `HAVING` 過濾群組（注意：`WHERE` 過濾的是**列**，`HAVING` 過濾的是**群組**）；(2) **Multi-table Query（多表查詢）**——當結果欄位來自多於一張表時必須使用 **Join（連接）**，包括以逗號分隔表名＋`WHERE` 指定連接條件的傳統寫法、`INNER JOIN ... ON` 的標準寫法、**Table Alias（資料表別名）**，以及把多個 `SELECT` 結果上下合併的 **UNION** 運算。全課的判斷主軸是：**「甚麼時候該用哪個子句、為甚麼」**——例如為何 `HAVING` 不能用 `WHERE` 取代、為何聚合函數與非聚合欄位不能隨便混用、為何 join 是「Cartesian Product（笛卡兒積）＋選擇」而「有意義的結果」才能留下。

技術關聯性：本課把之前學過的資料模型落實成真正的資料檢索能力。`COUNT`、`GROUP BY`、`HAVING`、`JOIN`、`UNION` 是所有關聯式資料庫（MySQL、Oracle、SQL Server、PostgreSQL）共通的 SQL 核心語法；面試與實務中最常被問的 SQL 考題（「找出每個部門的人數與平均薪金」、「列出 2012 年 10 月被訂購、總數量超過 1 的產品」）全部出自本課。另外要特別警惕本課的「地雷題」：`SELECT title, SUM(salary) FROM employee;` 是**非法**的——當 SELECT 清單含聚合函數而沒有 `GROUP BY` 時，不能同時引用其他欄位。

實務情境一（銷售報表開發）：商場 IT 部門要開發每月報表「每個職位有多少員工、薪金總額是多少」，開發者寫 `SELECT title, COUNT(emp_id) AS count, SUM(salary) AS sum FROM employee GROUP BY title;`——`GROUP BY` 把員工按職位分組，`COUNT` 與 `SUM` 對每組計算。若老闆只要「超過 1 名員工的職位」，就必須再加 `HAVING COUNT(emp_id) > 1`，因為「超過 1 名」是對**群組**的條件，不能用 `WHERE`（`WHERE` 在分組前就已過濾每一列）。這是日常報表系統最典型的需求。

實務情境二（跨表報表與資料歸檔）：電商後台要顯示「每張訂單的訂單編號、日期、客戶名稱與接單員工姓名」——這些欄位分散在 `orders`、`customer`、`employee` 三張表，必須用 join 把三張表以主鍵－外鍵（`orders.customer_id = customer.customer_id` 與 `orders.emp_id = employee.emp_id`）連接起來。而當公司把 2022 年前的訂單歸檔到 `Archived_Order` 表、現有訂單留在 `Current_Order` 表時，要把兩邊合併成一份報表就用到 `UNION`——它把兩個 `SELECT` 的結果上下拼接，並自動移除重複列。理解 join 與 UNION 的分別（join 是**橫向**合併欄位、UNION 是**縱向**合併列）是本課最常考的比較題。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **正確使用五個聚合函數** — Use the aggregate functions `COUNT`, `SUM`, `MIN`, `MAX`, `AVG` correctly, including `COUNT(*)` vs `COUNT(DISTINCT col)`
2. **解釋聚合函數的使用限制** — Explain the restrictions on aggregate functions (SELECT list vs HAVING clause; illegal mixing with non-aggregated columns)
3. **以 GROUP BY 產生分組小計** — Use the `GROUP BY` clause to produce sub-totals for each group
4. **區分 WHERE 與 HAVING** — Distinguish `WHERE` (filters individual rows) from `HAVING` (filters groups)
5. **撰寫 GROUP BY ... HAVING ... ORDER BY 完整查詢** — Write complete queries combining `GROUP BY`, `HAVING` and `ORDER BY`
6. **解釋為何多表查詢必須使用 join** — Explain why a query whose result columns come from more than one table must use a join
7. **以傳統逗號寫法與 INNER JOIN ... ON 寫法執行 inner join** — Perform inner joins using both the comma-separated FROM style and the `INNER JOIN ... ON` style
8. **使用表格別名** — Use table aliases to qualify column names and resolve ambiguity
9. **解釋 inner join 與 Cartesian Product 的關係** — Explain that an inner join is a Cartesian Product followed by a selection
10. **以 UNION 合併兩個或多個 SELECT 結果** — Combine the result sets of two or more `SELECT` statements with `UNION`, and state its requirements (same number of columns, compatible data types, position matching)

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 聚合函數（Aggregate Functions）

#### 3.1.1 五個聚合函數總覽

繁中解說：聚合函數（aggregate function）把**多列資料**濃縮成**一個統計值**。五個基本函數為：`COUNT()`（計數）、`SUM()`（總和）、`MIN()`（最小值）、`MAX()`（最大值）、`AVG()`（平均值）。其中 `SUM` 與 `AVG` 只適用於數值欄位，`MIN`／`MAX`／`COUNT` 亦可應用於非數值（例如文字、日期）欄位。聚合函數**只准**出現在兩處：`SELECT` 清單（SELECT list）與 `HAVING` 子句——這句是考題熱點。

> English Standard Definitions:
> - "An aggregate function returns a single value computed from a set of rows."
> - "The five basic aggregate functions are COUNT, SUM, MIN, MAX and AVG."
> - "Aggregate functions are used only in the SELECT list and in the HAVING clause."

#### 3.1.2 COUNT( )：計數

繁中解說：`COUNT(*)` 數的是**整張表（或符合 WHERE 條件的）全部列數**——無論該列有無 NULL、無論是否有重複值，都照數。若只要數「不重複的某欄位值」，就要用 `COUNT(DISTINCT 欄位名)`，例如「2012 年 10 月有多少**不同**的員工下過單」，若同一個員工下了三張單，`COUNT(emp_id)` 會數到 3，`COUNT(DISTINCT emp_id)` 才數到 1。`AS` 用作欄位別名（alias），把輸出的欄名改為易讀名稱。

**範例 1：有多少產品的單價高於 500？**

```sql
SELECT COUNT(*) AS count
FROM product
WHERE unit_price > 500;
```

> 解說：`WHERE unit_price > 500` 先篩出單價高於 500 的列，`COUNT(*)` 再數這些列的總數。結果是一欄 `count`、一列數值。

**範例 2：2012 年 10 月有多少不同的員工下過單？**

```sql
SELECT COUNT(DISTINCT emp_id) AS count
FROM orders
WHERE order_date BETWEEN '01-OCT-12' AND '31-OCT-12';
```

> 解說：`DISTINCT` 令同一個 `emp_id` 只被數一次，所以即使同一員工多次下單也只計 1。日期範圍以 `BETWEEN ... AND ...` 表達（含首尾兩日）。

> English Standard Definitions:
> - "COUNT(*) counts all rows of a table, regardless of whether nulls or duplicate values occur."
> - "Use DISTINCT in the SELECT list to eliminate duplicates."

#### 3.1.3 SUM、MIN、MAX、AVG 的用法

繁中解說：`SUM(欄位)` 求總和、`MIN(欄位)` 求最小值、`MAX(欄位)` 求最大值、`AVG(欄位)` 求平均值。多個聚合函數可以同時放在同一個 `SELECT` 清單中，各配自己的 `AS` 別名。

**範例 3：Sales 職位的員工人數與薪金總和。**

```sql
SELECT COUNT(emp_id) AS count, SUM(salary) AS sum
FROM employee
WHERE title = 'Sales';
```

> 解說：`WHERE title = 'Sales'` 先只保留 Sales 員工，再對這批列計數與加總。

**範例 4：所有員工薪金的最小值、最大值與平均值。**

```sql
SELECT MIN(salary) AS min, MAX(salary) AS max, AVG(salary) AS avg
FROM employee;
```

> 解說：三個聚合函數在同一 `SELECT` 清單並存，輸出三個欄位 `min`、`max`、`avg`，只有一列結果。

> English Standard Definitions:
> - "SUM returns the total of a numeric column; AVG returns the average; MIN and MAX return the minimum and maximum values."

#### 3.1.4 聚合函數的重要規則與「非法查詢」地雷

繁中解說：本課最常考的**規則清單**（背熟）：
1. `COUNT(*)` 數所有列，不理會 NULL 或重複值。
2. 要在 SELECT 清單消除重複，用 `DISTINCT`（例如 `COUNT(DISTINCT emp_id)`）。
3. `DISTINCT` 對 `MIN`／`MAX` **沒有影響**（最大還是最大、最小還是最小），但對 `SUM`／`AVG` **可能有影響**（因為剔除重複值會改變總和與平均）。
4. 聚合函數**只准**用在 `SELECT` 清單與 `HAVING` 子句。
5. **地雷**：如果 `SELECT` 清單包含聚合函數而又沒有 `GROUP BY` 子句，則 SELECT 清單**不能引用其他（非聚合的）欄位**。所以 `SELECT SUM(salary) FROM employee;` 合法（✓），而 `SELECT title, SUM(salary) FROM employee;` 非法（✗）——因為沒有 `GROUP BY` 時，一個 `title` 會對應多列、系統無法決定取哪一個，邏輯上自相矛盾。

> English Standard Definitions:
> - "COUNT(*) counts all rows of a table, regardless of whether nulls or duplicate values occur."
> - "Use DISTINCT in the SELECT list to eliminate duplicates."
> - "DISTINCT has no effect with MIN/MAX, but may have an effect with SUM/AVG."
> - "Aggregate functions are used only in the SELECT list and in the HAVING clause."
> - "If the SELECT list includes an aggregate function and there is no GROUP BY clause, the SELECT list cannot reference columns."

### 3.2 GROUP BY：分組與小計（Grouping & Sub-totals）

繁中解說：**`GROUP BY` 子句**把列依某欄位的值分成多個群組，每個群組一列輸出，聚合函數對**每個群組各自**計算——這正是「小計」（sub-totals）的來源。`GROUP BY` 之後，SELECT 清單中可出現的欄位只有兩種：(1) `GROUP BY` 中的分組欄位；(2) 包在聚合函數內的欄位。

**範例 5：每個職位有多少員工、薪金總額是多少。**

```sql
SELECT title, COUNT(emp_id) AS count, SUM(salary) AS sum
FROM employee
GROUP BY title;
```

> 解說：員工先按 `title` 分組（例如 Manager、Sales、Clerk 各一組），每組輸出：`title`、組內員工人數 `count`、組內薪金總和 `sum`。輸出列數 = 不同職位的數目。

> English Standard Definitions:
> - "Use the GROUP BY clause to get sub-totals."
> - "The GROUP BY clause groups rows that have the same value in the specified column(s), and the aggregate functions are computed for each group."

### 3.3 HAVING：過濾群組

繁中解說：**`HAVING` 子句**是專為配合 `GROUP BY` 設計的，用來**限制最終結果表出現哪些群組**——即「分組之後再篩選群組」。它跟 `WHERE` 表面相似但本質不同：**`WHERE` 在分組之前過濾個別列（filters individual rows），`HAVING` 在分組之後過濾群組（filters groups）**。因此凡是對聚合結果（如 `COUNT(...) > 1`）的條件，**必須**放在 `HAVING`，放在 `WHERE` 會出錯。另外，`HAVING` 子句中出現的欄位名必須**同時出現在 `GROUP BY` 清單中**，或者**包在聚合函數內**。

> English Standard Definitions:
> - "The HAVING clause is designed for use with GROUP BY to restrict the groups that appear in the final result table."
> - "Similar to WHERE, but WHERE filters individual rows whereas HAVING filters groups."
> - "Column names in the HAVING clause must also appear in the GROUP BY list or be contained within an aggregate function."

#### 3.3.1 GROUP BY ... HAVING ... ORDER BY 完整範例

繁中解說：常見考題會一次過要求**分組 + 過濾群組 + 排序**。子句順序必須是 `FROM → WHERE → GROUP BY → HAVING → ORDER BY`。

**範例 6：對每個員工數多於 1 的職位，找出該職位的員工人數與薪金總和，並按職位名稱字母順序排序。**

```sql
SELECT title, COUNT(emp_id) AS count, SUM(salary) AS sum
FROM employee
GROUP BY title
HAVING COUNT(emp_id) > 1
ORDER BY title;
```

> 解說：
> 1. `GROUP BY title` 把員工按職位分組；
> 2. `HAVING COUNT(emp_id) > 1` 只保留員工人數大於 1 的職位組（人數 ≤ 1 的職位被剔除）；
> 3. `ORDER BY title` 按職位名稱升序（alphabetical order）排序輸出。
>
> 對比：若把條件寫成 `WHERE COUNT(emp_id) > 1` 是錯的——`WHERE` 在分組前執行，那時還沒有 `COUNT` 可用。

> English Standard Definitions:
> - "To restrict groups in the final result, use HAVING with GROUP BY, e.g. HAVING COUNT(emp_id) > 1."
> - "ORDER BY sorts the final result, e.g. ORDER BY title sorts alphabetically."

### 3.4 多表查詢（Multi-table Query）

#### 3.4.1 為何需要 join

繁中解說：當查詢的**結果欄位來自多於一張表**時，就**必須使用 join（連接）**，這種查詢稱為 multi-tables query。做法：在 `FROM` 子句放入多於一張表（以**逗號**分隔），通常再用 `WHERE` 子句指定（inner）join 的連接欄位——例如 `orders.customer_id = customer.customer_id`。`FROM` 中的表可以起**別名（alias）**：別名與表名之間以**空格**分隔（例如 `orders O`），當欄位名有歧義（ambiguity，例如兩張表都有 `order_id`）時，用「別名．欄位名」（如 `O.order_id`）來限定。

> English Standard Definitions:
> - "When the result columns come from more than one table, a join must be used and the query is a multi-tables query."
> - "A multi-tables query includes more than one table in the FROM clause, using a comma as separator, and typically includes a WHERE clause to specify the (inner) join column(s)."
> - "An alias can be used for a table named in the FROM clause; the alias is separated from the table name with a space, and can be used to qualify column names when there is ambiguity."

#### 3.4.2 Inner Join 的本質：Cartesian Product + Selection

繁中解說：**Inner Join（內連接）本質上是「笛卡兒積（Cartesian Product）＋帶條件的選擇」**。Cartesian Product 是兩表每一列互相配對（orders 有 N 列、order_line 有 M 列，乘出 N×M 列），其中大部分配對是「無意義」的（例如把訂單 A 的資料配上訂單 B 的明細）；inner join 透過連接條件（join condition，即外鍵＝主鍵）**刪除那些無意義的結果**，只留下連接欄位值相等的配對。連接條件用 `WHERE 表1.欄位 = 表2.欄位`（傳統寫法）或 `ON 表1.欄位 = 表2.欄位`（INNER JOIN 寫法）指定。

> English Standard Definitions:
> - "An inner join is a Cartesian Product operation followed by a selection with criteria; it removes those 'meaningless' results."
> - "The join condition specifies the column(s) on which the tables are matched, typically the foreign key equals the primary key."

#### 3.4.3 兩種 Inner Join 寫法

繁中解說：同一查詢有兩種等價寫法，考官可能兩種都考：
- **傳統寫法（comma style）**：`FROM orders, order_line WHERE orders.order_id = order_line.order_id`
- **ANSI 寫法（INNER JOIN ... ON）**：`FROM orders INNER JOIN order_line ON orders.order_id = order_line.order_id`

**範例 7：列出每張訂單與其明細（orders 與 order_line 連接）。**

```sql
-- 傳統寫法
SELECT *
FROM orders, order_line
WHERE orders.order_id = order_line.order_id;
```

```sql
-- ANSI 寫法（等價）
SELECT *
FROM orders INNER JOIN order_line
ON orders.order_id = order_line.order_id;
```

> 解說：`orders.order_id` 是主鍵（PK），`order_line.order_id` 是外鍵（FK）；只有 `order_id` 相等的配對（即訂單與自己的明細）才會保留，Cartesian Product 中其他「無意義」的組合全部被剔除。

> English Standard Definitions:
> - "Traditional style: FROM orders, order_line WHERE orders.order_id = order_line.order_id."
> - "ANSI style: FROM orders INNER JOIN order_line ON orders.order_id = order_line.order_id."

#### 3.4.4 三表連接範例（Two Joins）

繁中解說：當結果欄位分佈在三張表，就要做**兩個 join 條件**。範例：`orders` 有 `customer_id` 與 `emp_id` 兩個外鍵，分別連去 `customer` 與 `employee`，因此 `WHERE` 中要有兩個相等條件，用 `AND` 連接。

**範例 8：顯示訂單編號、訂單日期、客戶名稱與處理該訂單的員工名字。**

```sql
SELECT order_id, order_date, customer_name, firstname
FROM orders, customer, employee
WHERE orders.customer_id = customer.customer_id
  AND orders.emp_id = employee.emp_id;
```

> 解說：三張表在 `FROM` 以逗號分隔；`orders.customer_id = customer.customer_id` 把訂單接到客戶，`orders.emp_id = employee.emp_id` 把訂單接到員工；`AND` 保證兩個條件同時成立。`customer_name` 與 `firstname` 分別來自 `customer` 與 `employee` 表。

> English Standard Definitions:
> - "A three-table join requires two join conditions combined with AND, e.g. orders.customer_id = customer.customer_id AND orders.emp_id = employee.emp_id."

### 3.5 別名與進階內連接範例（More Inner Join Examples）

繁中解說：使用別名後查詢更簡短：`FROM orders O, order_line OL, product P` 之後就可以寫 `O.order_id`、`OL.product_id`、`P.product_id`。以下三題是綜合應用題（join + WHERE + GROUP BY + HAVING + ORDER BY 全齊），必須逐題默寫。

**範例 9：顯示在 2012 年 10 月被客戶訂購的產品編號與數量。**

```sql
SELECT product_id, quantity
FROM orders O, order_line OL
WHERE O.order_id = OL.order_id
  AND order_date LIKE '%-OCT-12';
```

> 解說：`LIKE '%-OCT-12'` 是字串樣式比對——`%` 代表任意字元序列，所以「2012 年 10 月內任何一日」的日期（例如 `01-OCT-12`、`15-OCT-12`）都符合；這是以字串方式表達「October 2012」的技巧，等價於 `BETWEEN '01-OCT-12' AND '31-OCT-12'`。注意：`order_date` 沒有歧義（只存在於 `orders`），所以可以不帶別名前綴；而 `product_id`、`quantity` 只有 `order_line` 有，同樣不需前綴。

**範例 10：顯示在 2012 年 10 月被客戶訂購產品的編號、數量與產品名稱（三表連接）。**

```sql
SELECT OL.product_id, quantity, product_name
FROM orders O, order_line OL, product P
WHERE O.order_id = OL.order_id
  AND OL.product_id = P.product_id
  AND order_date LIKE '%-OCT-12';
```

> 解說：`order_line` 是 `orders` 與 `product` 之間的橋樑表（junction table）：先以 `O.order_id = OL.order_id` 把訂單接到明細，再以 `OL.product_id = P.product_id` 把明細接到產品，`product_name` 由此取得。用 `OL.product_id` 明確限定欄位來源，避免歧義。

**範例 11：顯示 2012 年 10 月被訂購產品的編號、名稱與總數量；只顯示總數量多於 1 的產品；先按總數量降序、再按產品編號升序排序。**

```sql
SELECT P.product_id, SUM(quantity), product_name
FROM orders O, order_line OL, product P
WHERE O.order_id = OL.order_id
  AND OL.product_id = P.product_id
  AND order_date LIKE '%-OCT-12'
GROUP BY P.product_id, product_name
HAVING SUM(quantity) > 1
ORDER BY SUM(quantity) DESC, P.product_id;
```

> 解說：這是全課最完整的一題，子句順序逐一拆解：
> 1. `FROM orders O, order_line OL, product P` —— 三表連接，取別名；
> 2. `WHERE` —— 兩個 join 條件 + 十月日期條件（分組前先過濾列）；
> 3. `GROUP BY P.product_id, product_name` —— 每個產品一組（注意：SELECT 中的非聚合欄位 `product_name` 必須出現在 GROUP BY 中）；
> 4. `HAVING SUM(quantity) > 1` —— 只保留總數量多於 1 的產品群組；
> 5. `ORDER BY SUM(quantity) DESC, P.product_id` —— 先按總數量**降序**（DESC），總數量相同時再按產品編號**升序**（預設 ASC）。

> English Standard Definitions:
> - "Columns in the SELECT list that are not inside aggregate functions must appear in the GROUP BY clause, e.g. GROUP BY P.product_id, product_name."
> - "ORDER BY SUM(quantity) DESC sorts by total quantity in descending order; the second sort key P.product_id is in ascending order by default."

### 3.6 UNION：縱向合併結果集（UNION Join）

繁中解說：**`UNION` 運算子**把**兩個或以上 `SELECT` 語句的結果集合併成一個**——它是**縱向**的：第二個 SELECT 的列接在第一個 SELECT 的列下面。與 join 最大的分別：join 把兩張表的**欄位**橫向拼起來（多一欄），UNION 把多個結果的**列**縱向疊起來（多一列）。`UNION` 會**自動移除結果集中的重複列**（若想保留重複列則用 `UNION ALL`，教材未提但值得知道）。使用 UNION 有三大要求：
1. **欄位數目必須相同**（The number of columns must be the same）——兩個 SELECT 選的欄位數要一致；
2. **對應欄位的資料型別必須相容**（Corresponding columns must have compatible data types）；
3. **UNION 按位置（position）配對欄位，不看欄位名**（UNION matches columns according to their positions, not their names）——第一個 SELECT 的第 1 欄對應第二個 SELECT 的第 1 欄，即使兩者欄位名不同也可以。`ORDER BY` 放在整個 UNION 語句的**最尾**，對合併後的完整結果排序。

> English Standard Definitions:
> - "The UNION operator is used to combine the result-set of two or more SELECT statements."
> - "The UNION operator automatically removes duplicate rows from the result set."
> - "Requirements to use UNION: the number of columns must be the same; corresponding columns must have compatible data types; UNION matches columns according to their positions, not their names."

#### 3.6.1 UNION 實例：現行訂單與歸檔訂單合併

繁中解說：假設電商系統把舊訂單放入 `Archived_Order` 表、現行訂單留在 `Current_Order` 表，兩表結構相同（`order_id`、`order_date`、`customer_id`、`total_amount`），現在要把兩邊全部訂單合併成一份結果，並按訂單日期降序排列。

**範例 12：檢索所有現行與歸檔訂單並以 UNION 合併成單一結果集，按訂單日期降序排序。**

```sql
SELECT order_id, order_date, customer_id, total_amount
FROM Current_Order
UNION
SELECT order_id, order_date, customer_id, total_amount
FROM Archived_Order
ORDER BY order_date DESC;
```

> 解說：
> 1. 兩個 `SELECT` 各自選 4 個欄位（數目相同），對應欄位資料型別相容；
> 2. `UNION` 把兩份結果上下合併，若同一張訂單同時存在於兩表（理論上不會，但語法上）會自動去重；
> 3. 最後的 `ORDER BY order_date DESC` 只寫一次、放在整個語句最尾，對合併後的完整結果按訂單日期降序排序。

> English Standard Definitions:
> - "Retrieve all current and archived orders and combine them into a single result set using the UNION operator, then sort the combined results by order date in descending order: ORDER BY order_date DESC."

### 3.7 全課子句執行順序速記（Clause Execution Order）

繁中解說：SQL 查詢的**邏輯執行順序**（與書寫順序不同）是考試常考觀念，綜合本課全部範例：

| 次序 | 子句 | 作用 | 本課例子 |
|---|---|---|---|
| 1 | `FROM` | 取表（可多表、可別名） | `FROM orders O, order_line OL, product P` |
| 2 | `WHERE` | 過濾**個別列**（分組前） | `WHERE unit_price > 500` |
| 3 | `GROUP BY` | 分組 | `GROUP BY title` |
| 4 | `HAVING` | 過濾**群組**（分組後） | `HAVING COUNT(emp_id) > 1` |
| 5 | `SELECT` | 選欄位／聚合 | `SELECT title, SUM(salary) AS sum` |
| 6 | `ORDER BY` | 排序最終結果 | `ORDER BY SUM(quantity) DESC` |

> English Standard Definitions:
> - "The logical order of clause execution is FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY."
> - "WHERE filters individual rows before grouping; HAVING filters groups after grouping."

## 📖 4. 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| DML | 資料操縱語言（查詢與更新資料） | "DML (Data Manipulation Language) is used to query and manipulate data." |
| Aggregate Function | 聚合函數；把多列濃縮成單一統計值 | "An aggregate function returns a single value computed from a set of rows." |
| COUNT( ) | 計數函數 | "COUNT(*) counts all rows of a table, regardless of whether nulls or duplicate values occur." |
| COUNT(DISTINCT col) | 數不重複的欄位值 | "Use DISTINCT in the SELECT list to eliminate duplicates." |
| SUM( ) | 總和函數（數值欄位） | "SUM(salary) returns the total of the salary column." |
| MIN( ) / MAX( ) | 最小值／最大值函數 | "MIN(salary) and MAX(salary) return the minimum and maximum salaries." |
| AVG( ) | 平均值函數（數值欄位） | "AVG(salary) returns the average salary." |
| AS (alias) | 欄位別名；重新命名輸出的欄 | "AS renames the output column, e.g. SUM(salary) AS sum." |
| DISTINCT | 消除重複值 | "DISTINCT has no effect with MIN/MAX, but may have an effect with SUM/AVG." |
| GROUP BY | 分組子句；產生小計 | "Use the GROUP BY clause to get sub-totals." |
| Sub-total | 小計；每個群組的統計值 | "GROUP BY produces sub-totals for each group." |
| HAVING | 過濾群組的子句 | "HAVING is designed for use with GROUP BY to restrict the groups that appear in the final result table." |
| WHERE vs HAVING | WHERE 過濾列、HAVING 過濾群組 | "WHERE filters individual rows whereas HAVING filters groups." |
| Multi-table Query | 多表查詢；結果欄位來自多張表 | "When the result columns come from more than one table, a join must be used." |
| Join | 連接；把多張表按條件合併 | "A join combines tables on join column(s), typically foreign key equals primary key." |
| Inner Join | 內連接；笛卡兒積＋選擇 | "An inner join is a Cartesian Product operation followed by a selection with criteria; it removes those 'meaningless' results." |
| Cartesian Product | 笛卡兒積；兩表所有列互相配對 | "The Cartesian Product pairs every row of one table with every row of the other." |
| INNER JOIN ... ON | ANSI 標準內連接寫法 | "FROM orders INNER JOIN order_line ON orders.order_id = order_line.order_id." |
| Table Alias | 資料表別名；以空格與表名分隔 | "An alias is separated from the table name with a space, e.g. FROM orders O." |
| Ambiguity | 歧義；欄位名存在於多張表 | "The alias can be used to qualify column names when there is ambiguity, e.g. O.order_id." |
| Qualify | 限定；以「表名．欄位名」指明來源 | "Use O.order_id to qualify the column when it is ambiguous." |
| Join Condition | 連接條件；決定哪些列配對 | "The join condition specifies orders.customer_id = customer.customer_id." |
| Foreign Key (FK) | 外鍵；指向另一表主鍵的欄位 | "The foreign key in order_line, order_id, references the primary key in orders." |
| Primary Key (PK) | 主鍵；唯一識別一列的欄位 | "The primary key uniquely identifies each row of a table." |
| LIKE | 字串樣式比對運算子 | "LIKE '%-OCT-12' matches dates ending with -OCT-12; % matches any sequence of characters." |
| % (wildcard) | 萬用字元；代表任意字元序列 | "The % wildcard matches any sequence of characters in a LIKE pattern." |
| BETWEEN ... AND | 範圍條件（含首尾） | "BETWEEN '01-OCT-12' AND '31-OCT-12' includes both end values." |
| ORDER BY | 排序子句 | "ORDER BY title sorts alphabetically; DESC sorts in descending order." |
| ASC / DESC | 升序／降序 | "ORDER BY SUM(quantity) DESC sorts by total quantity in descending order, then P.product_id in ascending order." |
| UNION | 合併兩個或以上 SELECT 的結果集 | "The UNION operator is used to combine the result-set of two or more SELECT statements." |
| UNION 移除重複 | 自動刪除結果集中的重複列 | "The UNION operator automatically removes duplicate rows from the result set." |
| UNION 三要求 | 欄位數相同、資料型別相容、按位置配對 | "The number of columns must be the same; corresponding columns must have compatible data types; UNION matches columns according to their positions, not their names." |
| Clause Execution Order | 子句邏輯執行順序 | "The logical order is FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

1. **先理解觀念**：
   - 聚合函數 = 多列 → 一個統計值；`COUNT(*)` 數所有列、`COUNT(DISTINCT col)` 數不重複值
   - `GROUP BY` = 分組產生小計；`HAVING` 過濾群組 vs `WHERE` 過濾列（時間點不同：分組前 vs 分組後）
   - 為何 `SELECT title, SUM(salary) FROM employee;` 非法（SELECT 有聚合函數而無 GROUP BY 時不能引用其他欄位）
   - 多表查詢為何必須 join；inner join = Cartesian Product + selection（剔除無意義配對）
   - join（橫向拼欄位）vs UNION（縱向疊列）的根本分別
2. **背誦英文短語**：
   - 聚合函數四條規則（COUNT(*) 定義、DISTINCT 對 MIN/MAX 無效、只用於 SELECT list 與 HAVING、無 GROUP BY 不可引用其他欄位）
   - WHERE vs HAVING 定義句："WHERE filters individual rows whereas HAVING filters groups."
   - Inner join 定義句："An inner join is a Cartesian Product operation followed by a selection with criteria."
   - UNION 定義句與三要求："combine the result-set of two or more SELECT statements… automatically removes duplicate rows…"
   - 別名定義句："An alias is separated from the table name with a space."
3. **掌握寫法（默寫所有 SQL 範例）**：
   - 五個聚合函數單獨用、混合用（`COUNT`＋`SUM`、`MIN`＋`MAX`＋`AVG`）
   - `GROUP BY` + `HAVING` + `ORDER BY` 完整查詢（範例 6）
   - 兩表 join（逗號寫法與 `INNER JOIN ... ON` 寫法各默一次，範例 7）
   - 三表 join（範例 8、10）；別名寫法（`FROM orders O`）
   - 綜合題（範例 11：join + WHERE + GROUP BY + HAVING + ORDER BY DESC）
   - UNION 合併兩個 SELECT + 尾置 `ORDER BY`（範例 12）
4. **能解答英文考題**（自行口頭作答）：
   - "How many products have unit price more than 500?" → `SELECT COUNT(*) AS count FROM product WHERE unit_price > 500;`
   - "How many different employees made orders in October 2012?" → `SELECT COUNT(DISTINCT emp_id) AS count FROM orders WHERE order_date BETWEEN '01-OCT-12' AND '31-OCT-12';`
   - "For each job title with more than 1 employee, find the number of employees and the total salary, sorted alphabetically." → 範例 6 的 SQL
   - "Why can't we use WHERE to filter groups?" → "WHERE filters individual rows before grouping; HAVING filters groups after grouping, and aggregate conditions must be in HAVING."
   - "Why is `SELECT title, SUM(salary) FROM employee;` illegal?" → "The SELECT list includes an aggregate function without a GROUP BY clause, so it cannot reference other columns."
   - "What is an inner join?" → "An inner join is a Cartesian Product operation followed by a selection with criteria; it removes the meaningless results."
   - "State the requirements for using UNION." → "The number of columns must be the same; corresponding columns must have compatible data types; UNION matches columns by position, not by name."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**五個聚合函數**
- `COUNT(*)` — 數所有列（不理 NULL／重複）
- `COUNT(DISTINCT col)` — 數不重複值
- `SUM(col)`／`AVG(col)` — 總和／平均（數值）；`MIN(col)`／`MAX(col)` — 最小／最大

**聚合函數四大規則（必背）**
1. `COUNT(*)` counts all rows regardless of nulls or duplicates.
2. `DISTINCT` has no effect with MIN/MAX, but may have with SUM/AVG.
3. Aggregates are used only in the SELECT list and the HAVING clause.
4. No GROUP BY + aggregate in SELECT ⇒ other columns are illegal（`SELECT title, SUM(salary)` ✗；`SELECT SUM(salary)` ✓）

**子句邏輯執行順序**：`FROM` → `WHERE`（過濾列）→ `GROUP BY`（分組）→ `HAVING`（過濾群組）→ `SELECT` → `ORDER BY`

**WHERE vs HAVING 口訣**：WHERE 篩**列**（分組前）、HAVING 篩**組**（分組後）→ "WHERE filters individual rows; HAVING filters groups."

**GROUP BY 限制口訣**：SELECT 中非聚合欄位必須在 GROUP BY 內（`GROUP BY P.product_id, product_name`）

**Join 速記**
- 結果欄來自多張表 ⇒ 必須 join
- Inner join = Cartesian Product + selection（刪走無意義配對）
- 傳統寫法：`FROM orders, order_line WHERE orders.order_id = order_line.order_id`
- ANSI 寫法：`FROM orders INNER JOIN order_line ON orders.order_id = order_line.order_id`
- 別名：`FROM orders O`（空格分隔）；歧義時用 `O.order_id` 限定
- 三表 join = 兩個 join 條件用 `AND` 連接（`O.order_id = OL.order_id AND OL.product_id = P.product_id`）

**十月日期兩種寫法**：`BETWEEN '01-OCT-12' AND '31-OCT-12'` ≡ `LIKE '%-OCT-12'`（`%` = 任意字元序列）

**UNION 速記**
- 縱向合併兩個或以上 SELECT 的結果；自動移除重複列
- 三要求：欄位數相同、資料型別相容、按位置配對（不看欄位名）
- `ORDER BY` 只寫一次、放最尾："ORDER BY order_date DESC"

**英文極速記憶句**
- "WHERE filters individual rows whereas HAVING filters groups."
- "An inner join is a Cartesian Product operation followed by a selection with criteria."
- "The UNION operator combines the result-set of two or more SELECT statements and automatically removes duplicate rows."
- "UNION matches columns according to their positions, not their names."
- "An alias is separated from the table name with a space."
