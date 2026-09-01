# ITP4456 Chapter 3: Relational DDL — 雙語並行・應考導向學習指南

> 課程：ITP4456 Database Applications ｜ 主題：Relational DDL（關聯式資料定義語言）
> 本指南涵蓋 SQL 簡介、MySQL 資料型別、`CREATE TABLE` / `ALTER TABLE` / `DROP` 完整語法與 Ordering 個案研究。

---

## 1. 📝 課程概要與實務情境 (Summary & Real-world Context)

本單元是關聯式資料庫的「起點」——你學的並不是查資料（那屬於 DML 與 `SELECT` 的範疇），而是**定義資料庫的結構（Schema）**：建立資料庫、建立資料表、設定主鍵與外鍵、指定每個欄位的資料型別，以及在建立之後修改或刪除結構。這一部分語言統稱為 **DDL（Data Definition Language）**，是 DDL、DML、DCL 三大 SQL 子語言之一。教材以 MySQL 為實作平台，並以一個「訂單管理系統（Ordering）」個案串起所有語法，從 `Customer`、`Employee`、`Product` 三張主表，到 `Orders` 與 `Order_line` 兩張關聯表，示範一對多關係與多對多關係如何在 DDL 層面落實。所有核心定義句（如 SQL 是甚麼、reserved words 是甚麼）都是考試可直接照抄的標準英文答案。

實務上，任何資料庫系統開發的第一步都是 DDL：例如你為一間零售公司設計訂單系統，你必須先決定 `Customer` 表的 `customer_id` 用 `SMALLINT` 定 `INT`、`customer_name` 用 `VARCHAR(50)`、哪些欄位不可留空（`NOT NULL`）、哪個欄位是主鍵（Primary Key）、`Orders` 表如何用外鍵（Foreign Key）指向 `Customer` 與 `Employee`——這些決策全部寫成 `CREATE TABLE` 語句。另一個常見場景是**結構演進（Schema Evolution）**：系統上線後發現要加電話欄位（`ALTER TABLE ... ADD`）、要改欄位長度（`ALTER TABLE ... MODIFY`），甚至要刪除不再需要的表（`DROP TABLE`）。掌握 DDL，等於掌握了「為應用程式建立資料存放空間」的能力，亦是本課程模組學習成果（Module Intended Learning Outcome）——「perform database operations to implement data models and manipulate data in the applications」——的第一塊基石。

---

## 2. 🎯 考試學習目標 (Learning Objectives)

考官會測試以下核心能力（附英文對照）：

- **識別 SQL 的起源與標準**：能說出 SQL 於 1970 年代初由 IBM 開發、原名 SEQUEL、最新標準為 SQL:2019，並指出不同廠商實作未必完全相容。
  - *Identify the origin and standards of SQL (IBM, early 1970s, SEQUEL, SQL:2019, vendor incompatibility).*
- **區分 reserved words 與 user-defined words**：能分辨 SQL 保留字與使用者自訂名稱，並知道大小寫規則及字面值（literals）的引號規則。
  - *Distinguish reserved words from user-defined words and apply literal quoting rules.*
- **背誦 MySQL 主要資料型別及其儲存大小與範圍**：整數（BIT/TINYINT/SMALLINT/MEDIUMINT/INT/BIGINT）、小數（DECIMAL/FLOAT）、日期時間（DATE/DATETIME/TIMESTAMP/TIME/YEAR）、字串（CHAR/VARCHAR/TEXT/BLOB）與 ENUM。
  - *Memorise MySQL data types, their storage sizes and value ranges.*
- **撰寫 `CREATE DATABASE` 與 `USE`**：建立並選用資料庫。
  - *Write CREATE DATABASE / CREATE SCHEMA and USE statements.*
- **撰寫完整 `CREATE TABLE` 語句**：包括欄位定義、`NOT NULL`/`NULL`、`PRIMARY KEY`、`FOREIGN KEY ... REFERENCES`、`CONSTRAINT` 命名與複合主鍵（composite key）。
  - *Write a complete CREATE TABLE statement with constraints, foreign keys and composite keys.*
- **運用 `AUTO_INCREMENT` 與 `DEFAULT`**：令主鍵自動產生、欄位有預設值（如 `CURRENT_TIMESTAMP`）。
  - *Apply AUTO_INCREMENT and DEFAULT clauses.*
- **用 `ALTER TABLE` 修改結構**：`ADD`、`MODIFY`、`DROP`、`RENAME COLUMN`、`ADD/DROP PRIMARY KEY`、`ADD/DROP FOREIGN KEY`。
  - *Use ALTER TABLE to add, modify, drop and rename columns, keys and constraints.*
- **用 `RENAME TABLE` / `DROP TABLE` / `DROP DATABASE` 刪除或改名物件**，並理解其資料損失後果。
  - *Rename or drop tables and databases and explain the data-loss consequences.*

---

## 3. 📖 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 Structured Query Language（SQL）簡介

SQL 是關係型資料庫執行資料庫操作的**標準語言**。教材重點：

- SQL 於 **1970 年代初**由 **IBM** 開發，原名 **Structured English Query Language（SEQUEL）**。
- 最新 SQL 標準為 **SQL:2019**。
- 不同廠商的 SQL 實作**互不相容**，而且未必完全跟從標準（vendor implementations are incompatible and do not necessarily completely follow standards）。

> **Standard Definition:**
> Structured Query Language (SQL) is the standard language for performing database operations in relational databases. It was initially developed at IBM in the early 1970s as Structured English Query Language (SEQUEL). The latest SQL standard is SQL:2019. SQL implementations are incompatible between vendors and do not necessarily completely follow standards.

**Objectives of SQL（SQL 的目標）：** SQL 由標準英文單字組成，易讀易寫，例如：

```sql
CREATE TABLE Staff(
  staffNo  VARCHAR(5) NULL,
  lName    VARCHAR(15) NULL,
  salary   DECIMAL(10,2) NULL
);

INSERT INTO Staff VALUES ('SG16', 'Brown', 8300);

SELECT staffNo, lName, salary FROM Staff WHERE salary > 8000;
```

> **Standard Definition:**
> One of the objectives of SQL is that it consists of standard English words, which makes SQL statements easy to read and write.

---

### 3.2 SQL 陳述句的組成：Reserved Words 與 User-defined Words

SQL statement 由兩類詞組成：

| 類別 | 特性 | 例子 |
|------|------|------|
| **Reserved words（保留字）** | SQL 的固定部分；必須**串法完全正確**；**不可跨行拆開** | `CREATE`、`TABLE`、`SELECT`、`FROM`、`WHERE` |
| **User-defined words（自訂詞）** | 由使用者自行命名；代表資料庫物件的名稱：relations（關聯/表）、columns（欄）、views（檢視表） | `Staff`、`staffNo`、`salary` |

大小寫規則：SQL statement 大部分元件**不分大小寫（case insensitive）**，**唯獨字面字元資料（literal character data）除外**——即引號內的字串值是區分大小寫的。

> **Standard Definition:**
> An SQL statement consists of reserved words and user-defined words. Reserved words are a fixed part of SQL: they must be spelt exactly and cannot be split across lines. User-defined words are made up by the user and represent the names of database objects such as relations, columns and views. Most components of an SQL statement are case insensitive, except for literal character data.

---

### 3.3 SQL 指令排版格式（Formatting SQL Commands）

為了可讀性，SQL 指令應使用縮排（indentation）與換行（lineation）：

1. **每個 clause（子句）應由新一行開始**（Each clause should begin on a new line）。
2. **各 clause 的開頭應對齊**（Start of a clause should line up with start of other clauses）。
3. **若 clause 有多個部分，每個部分應獨立一行，並縮排在 clause 開頭之下**（If a clause has several parts, each should appear on a separate line and be indented under the start of the clause）。

排版示範：

```sql
CREATE TABLE Staff(
  staffNo   VARCHAR(5)   NULL,
  lName     VARCHAR(15)  NULL,
  salary    DECIMAL(10,2) NULL
);

INSERT INTO Staff
  VALUES ('SG16', 'Brown', 8300);

SELECT staffNo, lName, salary
FROM Staff
WHERE salary > 8000;
```

> **Standard Definition:**
> SQL commands are more readable with indentation and lineation: each clause should begin on a new line; the start of a clause should line up with the start of other clauses; if a clause has several parts, each should appear on a separate line and be indented under the start of the clause.

---

### 3.4 SQL 語法慣例（SQL Syntax Convention）

閱讀 MySQL 官方文件語法時使用的慣例（Convention in MySQL documentation）：

| 符號 | 意思 |
|------|------|
| **大寫字母** | 代表保留字（reserved words） |
| **小寫字母** | 代表使用者自訂詞（user-defined words） |
| `|`（vertical bar） | 表示在幾個選項中擇一（choice among alternatives） |
| `[ ]`（square brackets） | 表示**可選**元素（optional elements） |
| `{ }`（curly braces） | 表示**必須**元素（required element） |
| `…`（ellipsis） | 表示可選重複 0 次或多次（optional repetition, 0 or more） |

> **Standard Definition:**
> In the SQL syntax convention, upper-case letters represent reserved words, lower-case letters represent user-defined words, a vertical bar indicates a choice among alternatives, square brackets indicate optional elements, curly braces indicate required elements, and an ellipsis indicates optional repetition (0 or more).

---

### 3.5 Literals（字面值）

**Literal 是 SQL 陳述句中使用的常數（constants）**。規則如下：

| 類別 | 規則 | 正確例子 | 錯誤例子 |
|------|------|----------|----------|
| 非數值 literal | 必須用單引號或雙引號包住 | `'London'` ✓、`"London"` ✓ | `London` ✗、`‘London’`（彎引號）✗、`` `London` ``（反引號）✗ |
| 數值 literal | **不可**用引號包住 | `650.00` ✓ | `'650.00'` ✗ |
| 日期常數 | 屬於非數值 literal，必須用引號包住；MySQL 預設日期格式為**年-月-日（year-month-day）** | `"2020-06-17"` ✓ | — |

> **Standard Definition:**
> Literals are constants used in SQL statements. All non-numeric literals must be enclosed in single or double quotes. All numeric literals should not be enclosed in quotes. Date constants are non-numeric literals, so they should be enclosed in quotes; MySQL has a default date format of year-month-day, e.g. "2020-06-17".

⚠️ 考題陷阱：彎引號（`‘ ’`、`“ ”`）與反引號（`` ` ``）**都不算**合法的字串引號；日期格式一定是 `YYYY-MM-DD`，不要寫成 `DD/MM/YYYY`。

---

### 3.6 MySQL 資料型別（Data Types）總覽

#### 3.6.1 數值型別 — 整數（Numeric Data Types – Integer）

| Data Type | Description | Storage Size | Range (Signed) | Range (Unsigned) |
|-----------|-------------|--------------|----------------|------------------|
| `BIT` | A bit-value type | 1 bit | 1 to 64 | — |
| `TINYINT` | A very small integer | 8 bits (1 byte) | -128 to 127 | 0 to 255 |
| `SMALLINT` | A small integer | 16 bits (2 bytes) | -32768 to 32767 | 0 to 65535 |
| `MEDIUMINT` | A medium-sized integer | 24 bits (3 bytes) | -8388608 to 8388607 | 0 to 16777215 |
| `INT` / `INTEGER` | A normal-size integer | 32 bits (4 bytes) | -2147483648 to 2147483647 | 0 to 4294967295 |
| `BIGINT` | A large integer | 64 bits (8 bytes) | -9223372036854775808 to 9223372036854775807 | 0 to 18446744073709551615 |

> **Standard Definition:**
> MySQL provides integer data types including BIT (a bit-value type), TINYINT (a very small integer), SMALLINT (a small integer), MEDIUMINT (a medium-sized integer), INT or INTEGER (a normal-size integer) and BIGINT (a large integer), each with a specific storage size and range of value.

#### 3.6.2 數值型別 — 小數（Numeric Data Types – DECIMAL / FLOAT）

| Data Type | Description | 關鍵參數 |
|-----------|-------------|----------|
| `DECIMAL(M,D)` | A packed "exact" fixed-point number（精確定點數） | **M** = 總位數（1 至 65）；**D** = 小數點後位數（1 至 30） |
| `FLOAT(p)` | A floating-point number（浮點數） | **p** = precision（以 bits 計） |

`FLOAT(p)` 的分流規則（考試重點）：

- 若 `p` 介乎 **0 至 23** → 變成 **4-byte single-precision FLOAT**，範圍約 `-3.402823466E+38` 至 `-1.175494351E-38`。
- 若 `p` 介乎 **24 至 53** → 變成 **8-byte double-precision DOUBLE**，範圍約 `-1.7976931348623157E+308` 至 `-2.2250738585072014E-308`。

> **Standard Definition:**
> DECIMAL(M,D) is a packed "exact" fixed-point number where M is the total number of digits (1 to 65) and D is the number of digits after the decimal point (1 to 30). FLOAT(p) is a floating-point number where p represents the precision in bits: if p is from 0 to 23 the type becomes a 4-byte single-precision FLOAT, and if p is from 24 to 53 it becomes an 8-byte double-precision DOUBLE.

#### 3.6.3 日期與時間型別（Date and Time Data Types）

| Data Type | Description | Range of Value |
|-----------|-------------|----------------|
| `DATE` | A date | `'1000-01-01'` to `'9999-12-31'`, or `'0000-00-00'` |
| `DATETIME` | A date and time combination | `'1000-01-01 00:00:00.000000'` to `'9999-12-31 23:59:59.999999'`, or `'00:00:00'` |
| `TIMESTAMP` | A timestamp | `'1970-01-01 00:00:01.000000'` UTC to `'2038-01-19 03:14:07.999999'` UTC, or `'0000-00-00 00:00:00'` |
| `TIME` | A time | `'-838:59:59.000000'` to `'838:59:59.000000'`, or `'00:00:00'` |
| `YEAR` | A year in 4-digit format | 1901 to 2155, or 0000 |

> **Standard Definition:**
> MySQL provides date and time data types: DATE for a date, DATETIME for a date and time combination, TIMESTAMP for a timestamp (stored in UTC), TIME for a time, and YEAR for a year in 4-digit format, each with a defined range of value.

⚠️ 考試重點：`TIMESTAMP` 是 UTC 儲存且上限為 **2038-01-19**（32-bit 上限，即著名的 Year 2038 problem）；`DATETIME` 則不受時區影響。

#### 3.6.4 字串型別（String Data Types）

| Data Type | Description |
|-----------|-------------|
| `CHAR(M)` | A **fixed-length** string（固定長度字串）；M = 欄位字元長度（**0 至 255**） |
| `VARCHAR(M)` | A **variable-length** string（可變長度字串）；M = 最大字元長度（**0 至 65,535**） |
| `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT` | 字元字串；儲存於**與 row buffer 不同的內部記憶體區域**（stored internally in a different area of memory than the row buffer） |
| `TINYBLOB`, `BLOB`, `MEDIUMBLOB`, `LONGBLOB` | **二進位位元組字串（binary byte strings）**，例如檔案（e.g. files） |

> **Standard Definition:**
> CHAR(M) is a fixed-length string where M represents the column length in characters (0 to 255). VARCHAR(M) is a variable-length string where M represents the maximum column length in characters (0 to 65,535). TEXT types are character strings stored internally in a different area of memory than the row buffer; BLOB types are binary byte strings, e.g. for storing files.

💡 記憶法：**CHAR 固定、VARCHAR 可變**；CHAR 最多 255 字元、VARCHAR 最多 65,535 字元；`TEXT` 放文字、`BLOB` 放檔案。

#### 3.6.5 ENUM 資料型別

**ENUM 是一種字串物件（string object）**，其值必須從**在建立表格時於欄位規格中明確列舉的允許值清單**中選擇。列舉值必須是**加引號的字串字面值（a quoted string literal）**。

```sql
ENUM('x-small', 'small', 'medium', 'large', 'x-large')
ENUM('0','1','2')
```

> **Standard Definition:**
> An ENUM is a string object with a value chosen from a list of permitted values that are enumerated explicitly in the column specification at table creation time. An enumeration value must be a quoted string literal.

---

### 3.7 Case Study：Ordering 資料庫綱要（Database Schema）

教材以訂單系統為個案，資料庫共有 **5 張表**：

```
Customer ( customer_id, customer_name, customer_address, city, state, postal_code )
Employee ( emp_id, lastname, firstname, title, salary )
Orders   ( order_id, order_date, customer_id, emp_id )
Product  ( product_id, product_name, product_finish, unit_price, on_hand, description )
Order_line ( order_id, product_id, quantity )
```

關係重點（ERD）：
- `Orders.customer_id` 是外鍵（FK）→ 指向 `Customer.customer_id`（一位客戶可有多張訂單：1:M）。
- `Orders.emp_id` 是外鍵（FK）→ 指向 `Employee.emp_id`（一位員工可處理多張訂單：1:M）。
- `Order_line.order_id` 是外鍵（FK）→ 指向 `Orders.order_id`；`Order_line.product_id` 是外鍵（FK）→ 指向 `Product.product_id`（訂單與產品之間的多對多 M:N 關係，由 Order_line 作為橋接表）。

---

### 3.8 建立與選用資料庫：CREATE DATABASE / USE

為存放所有設計好的表，先建立一個專屬資料庫：

```sql
CREATE DATABASE ordering;
-- 或
CREATE SCHEMA ordering;
```

然後將該資料庫設為預設（使用中）資料庫：

```sql
USE ordering;
```

> **Standard Definition:**
> CREATE DATABASE (or CREATE SCHEMA) is used to create a new database for storing all the designed tables. The USE statement sets the database as the default database for subsequent operations.

---

### 3.9 CREATE TABLE 通用語法

`CREATE TABLE` 用於在資料庫中建立新表。語法骨架：

```sql
CREATE TABLE Table_Name (
  column_name  data_type  [NOT NULL | NULL],
  column_name  data_type  [NOT NULL | NULL],
  column_name  data_type  [NOT NULL | NULL],
  …
  PRIMARY KEY (column_name)
);
```

- `[NOT NULL | NULL]` 為**可選**部分（可選其一）。
- `PRIMARY KEY (column_name)` 放在所有欄位定義之後。

> **Standard Definition:**
> The CREATE TABLE statement is used to create a new table in a database. Each column is defined by a column name, a data type and an optional NOT NULL or NULL specification; the primary key is declared at the end of the column definitions.

---

### 3.10 建立各表的完整示範

#### 3.10.1 Customer 表（主鍵：customer_id）

判斷步驟：先檢查 sample data 以決定每個屬性的值域（attribute domain）→ 決定主鍵 → 決定哪些欄位必填。

```sql
CREATE TABLE Customer (
  customer_id      SMALLINT    NOT NULL,
  customer_name    VARCHAR(50) NOT NULL,
  customer_address VARCHAR(150) NOT NULL,
  city             VARCHAR(50),
  state            CHAR(2),
  postal_code      MEDIUMINT,
  PRIMARY KEY (customer_id)
);
```

要點：
- `customer_id`、`customer_name`、`customer_address` **必須為每筆記錄輸入**（NOT NULL）。
- `city`、`state`、`postal_code` 為**可選**；**預設為 NULL**（NULL by default）。
- 括號 `( )` 內最後一項**之後不加逗號**（No comma at the end of the content enclosed with parentheses）。
- **CREATE 只建立結構（structure），表中暫時沒有任何記錄**。

> **Standard Definition:**
> The CREATE statement creates only the structure of the table; there are no records in the table yet. Columns declared NOT NULL must be entered for every record, while columns without NOT NULL are optional and are NULL by default.

#### 3.10.2 Employee 表（主鍵：emp_id）

```sql
CREATE TABLE Employee (
  emp_id    SMALLINT    NOT NULL,
  lastname  VARCHAR(25) NOT NULL,
  firstname VARCHAR(25) NOT NULL,
  title     VARCHAR(50),
  salary    DECIMAL(9,2),
  PRIMARY KEY (emp_id)
);
```

#### 3.10.3 Product 表（主鍵：product_id；含 ENUM）

`product_finish` 只允許 `Cherry`、`Natural Ash`、`White Ash`、`Natural Maple` 與 `Walnut` 五種值 → 用 **ENUM** 最合適。另要注意**為未來擴充預留足夠空間**（Enough space should be reserved for future expansion）——例如 `product_name` 用 `VARCHAR(100)`。

```sql
CREATE TABLE Product (
  product_id     SMALLINT NOT NULL,
  product_name   VARCHAR(100) NOT NULL,
  product_finish ENUM('Cherry', 'Natural Ash', 'White Ash', 'Natural Maple', 'Walnut'),
  unit_price     DECIMAL(6,2),
  on_hand        TINYINT,
  description    VARCHAR(250),
  PRIMARY KEY (product_id)
);
```

> **Standard Definition:**
> An ENUM column restricts the values of a column to a list of permitted values enumerated in the column specification, e.g. product_finish ENUM('Cherry','Natural Ash','White Ash','Natural Maple','Walnut').

#### 3.10.4 Orders 表（主鍵：order_id；外鍵：customer_id、emp_id）

Orders 是連接 Customer 與 Employee 的關聯表，包含兩個外鍵。

```sql
CREATE TABLE Orders (
  order_id   SMALLINT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_id SMALLINT,
  emp_id     SMALLINT,
  PRIMARY KEY (order_id),
  CONSTRAINT order_fk1
    FOREIGN KEY (customer_id)
    REFERENCES Customer (customer_id)
);
```

加上第二個外鍵後的完整版：

```sql
CREATE TABLE Orders (
  order_id   SMALLINT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_id SMALLINT,
  emp_id     SMALLINT,
  PRIMARY KEY (order_id),
  CONSTRAINT orders_fk1 FOREIGN KEY (customer_id)
    REFERENCES Customer (customer_id),
  CONSTRAINT orders_fk2 FOREIGN KEY (emp_id)
    REFERENCES Employee (emp_id)
);
```

外鍵重點（必考）：
- `Customer.customer_id` 與 `Orders.customer_id` 的**資料型別必須相容（compatible）**——教材兩者都用 `SMALLINT`。
- `order_date` 使用 `TIMESTAMP DEFAULT CURRENT_TIMESTAMP`：**不輸入時自動填入目前時間戳**。
- `CONSTRAINT 名稱 FOREIGN KEY (本表欄位) REFERENCES 被參考表 (被參考欄位)`——**被參考欄位通常是對方的主鍵**。

> **Standard Definition:**
> A foreign key is a column (or columns) in a table that references the primary key of another table. The data types of the referencing column and the referenced column must be compatible. The syntax is: CONSTRAINT constraint_name FOREIGN KEY (column_name) REFERENCES referenced_table (referenced_column).

#### 3.10.5 Order_line 表（複合主鍵 + 兩個外鍵）

`Order_line` 的主鍵由 `order_id` 與 `product_id` 兩欄共同組成 → **複合主鍵（Composite Primary Key）**；同時這兩欄各自也是外鍵。

```sql
CREATE TABLE Order_line (
  order_id   SMALLINT NOT NULL,
  product_id SMALLINT NOT NULL,
  quantity   SMALLINT,
  PRIMARY KEY (order_id, product_id),
  CONSTRAINT order_line_fk1
    FOREIGN KEY (order_id)
    REFERENCES Orders (order_id),
  CONSTRAINT order_line_fk2
    FOREIGN KEY (product_id)
    REFERENCES Product (product_id)
);
```

> **Standard Definition:**
> A composite primary key is a primary key that consists of more than one column, e.g. PRIMARY KEY (order_id, product_id). The same columns can also act as foreign keys referencing other tables.

---

### 3.11 AUTO_INCREMENT（自動遞增）

系統會**自動產生主鍵的值**（例如 `order_id`），每次插入新記錄時自動 +1，開發者毋須手動輸入。

```sql
CREATE TABLE Orders (
  order_id SMALLINT NOT NULL AUTO_INCREMENT,
  ...
);
```

> **Standard Definition:**
> AUTO_INCREMENT makes the system automatically generate values of the primary key (e.g. order_id) for new rows, so that the user does not have to supply the value manually.

---

### 3.12 NULL 與 NOT NULL

- `NOT NULL`：該欄位**必須**有值。
- `NULL`：該欄位**可以**沒有值（未指定時即為 NULL）。
- 重要預設規則：**若既沒有寫 NULL 亦沒有寫 NOT NULL，該欄位會被當作指定了 NULL 處理**（If neither NULL nor NOT NULL is specified, the column is treated as though NULL had been specified）。

> **Standard Definition:**
> If neither NULL nor NOT NULL is specified for a column, the column is treated as though NULL had been specified, meaning that the column may contain no value.

---

### 3.13 修改表結構：ALTER TABLE

表建立之後，可修改的定義包括：

| 可修改項目 | 語法 |
|-----------|------|
| 欄位 — 新增 / 修改 / 刪除 / 改名 | `ALTER TABLE … {ADD | MODIFY | DROP} … ;` 與 `ALTER TABLE … RENAME … TO … ;` |
| 主鍵 — 新增 / 刪除 | `ALTER TABLE … ADD PRIMARY KEY (…) ;` 與 `ALTER TABLE … DROP PRIMARY KEY ;` |
| 外鍵 — 新增 / 刪除 | `ALTER TABLE … ADD CONSTRAINT … FOREIGN KEY (…) REFERENCES …(…) ;` 與 `ALTER TABLE … DROP FOREIGN KEY … ;`、`ALTER TABLE … DROP KEY … ;` |

> **Standard Definition:**
> After table creation, the table definition that can be changed includes columns (add, modify, drop and rename), the primary key (add and drop) and foreign keys (add and drop), using the ALTER TABLE statement.

⚠️ 思考題（考官常問）：**改變表結構後，既有的欄位資料會怎樣？**（What happens to existing column data after changes in table structure?）——例如把 `VARCHAR(25)` 改成 `VARCHAR(50)` 一般可保留資料；把欄位收窄或改型別則可能導致資料截斷或轉換失敗，修改結構前應評估對現有資料的影響。

#### 3.13.1 欄位操作示範

**ADD（新增欄位）**——為 Customer 表加電話欄位：

```sql
ALTER TABLE Customer
  ADD customer_phone VARCHAR(15);
```

**MODIFY（修改資料型別與欄位定義）**——把 Employee 表的 firstname 由 `varchar(25)` 改為 `varchar(50)`：

```sql
ALTER TABLE Employee
  MODIFY firstname VARCHAR(50);
```

**DROP（刪除欄位）**——刪除不再需要的 customer_phone：

```sql
ALTER TABLE Customer
  DROP customer_phone;
```

**RENAME COLUMN（欄位改名）**——把 quantity 改名為 qty：

```sql
ALTER TABLE Order_line
  RENAME COLUMN quantity TO qty;
```

> **Standard Definition:**
> ALTER TABLE ... ADD is used to add new columns to a table; ALTER TABLE ... MODIFY is used to modify the data type and column definition; ALTER TABLE ... DROP is used to remove existing columns; ALTER TABLE ... RENAME COLUMN ... TO ... is used to change a column name.

#### 3.13.2 主鍵操作示範

假設錯誤地在 `product_name` 上建立了主鍵：

```sql
CREATE TABLE test (
  test_id    SMALLINT NOT NULL,
  test_name  VARCHAR(10) NOT NULL,
  PRIMARY KEY (test_name)
);
```

刪除錯誤的主鍵：

```sql
ALTER TABLE test
  DROP PRIMARY KEY;
```

再新增正確的主鍵：

```sql
ALTER TABLE test
  ADD PRIMARY KEY (test_id);
```

#### 3.13.3 外鍵操作示範

假設錯誤的外鍵約束 `orders_fk2` 已建立，先刪除：

```sql
ALTER TABLE Orders
  DROP FOREIGN KEY orders_fk2;
```

再新增正確的外鍵——`emp_id` 參考 `Employee` 的主鍵：

```sql
ALTER TABLE Orders
  ADD CONSTRAINT orders_fk2
    FOREIGN KEY (emp_id)
    REFERENCES Employee (emp_id);
```

> **Standard Definition:**
> ALTER TABLE ... ADD PRIMARY KEY (column) adds a primary key, ALTER TABLE ... DROP PRIMARY KEY removes it, ALTER TABLE ... ADD CONSTRAINT name FOREIGN KEY (column) REFERENCES table (column) adds a foreign key, and ALTER TABLE ... DROP FOREIGN KEY name removes a named foreign key constraint.

---

### 3.14 改名與刪除表及資料庫（Rename & Drop Table and Database）

把 `test` 表改名為 `emp`（兩種寫法）：

```sql
RENAME TABLE test TO temp;
-- 或
ALTER TABLE test RENAME temp;
```

刪除 `emp` 表（**表中所有資料都會被移除**）：

```sql
DROP TABLE emp;
```

刪除 ordering 資料庫（**資料庫中所有資料都會被移除**）：

```sql
DROP DATABASE ordering;
```

> **Standard Definition:**
> RENAME TABLE old_name TO new_name (or ALTER TABLE old_name RENAME new_name) renames a table. DROP TABLE table_name removes the table and all its data. DROP DATABASE database_name removes the whole database and all its data.

⚠️ 後果必答句：`DROP TABLE` 與 `DROP DATABASE` 都是**不可回復的破壞性操作**——所有資料會被永久移除（All data in the table / database will be removed）。

---

## 4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| Structured Query Language (SQL) | 結構化查詢語言，關係型資料庫的標準操作語言 | "Structured Query Language (SQL) is the standard for performing database operations in relational databases." |
| SEQUEL | SQL 的前身，即 Structured English Query Language，1970 年代初由 IBM 開發 | "SQL was initially developed at IBM in the early 1970s as Structured English Query Language (SEQUEL)." |
| SQL:2019 | 最新 SQL 標準版本 | "The latest SQL standard is SQL:2019." |
| Reserved words | SQL 保留字：固定部分，必須串法正確且不可跨行拆開 | "Reserved words are a fixed part of SQL; they must be spelt exactly and cannot be split across lines." |
| User-defined words | 使用者自訂名稱，代表表、欄位、檢視表等資料庫物件 | "User-defined words are made up by the user and represent names of database objects such as relations, columns and views." |
| Case insensitive | 大小寫不敏感（除字面字元資料外） | "Most components of an SQL statement are case insensitive, except for literal character data." |
| Literal | 字面值／常數 | "Literals are constants used in SQL statements. All non-numeric literals must be enclosed in quotes; numeric literals should not." |
| Data Definition Language (DDL) | 資料定義語言：定義/修改/刪除資料庫結構（CREATE、ALTER、DROP） | "DDL is used to define and manage the database structure, including CREATE, ALTER and DROP statements." |
| Data type | 資料型別：定義欄位可存放的資料種類與範圍 | "A data type defines the kind and range of values that a column can store." |
| `DECIMAL(M,D)` | 精確定點數：M 為總位數，D 為小數位數 | "DECIMAL(M,D) is a packed exact fixed-point number; M is the total number of digits and D is the digits after the decimal point." |
| `FLOAT(p)` | 浮點數：p 為精度（bits） | "If p is from 0 to 23 the type becomes a 4-byte single-precision FLOAT; if p is from 24 to 53 it becomes an 8-byte double-precision DOUBLE." |
| `CHAR(M)` | 固定長度字串（0–255 字元） | "CHAR(M) is a fixed-length string; M represents the column length in characters (0 to 255)." |
| `VARCHAR(M)` | 可變長度字串（最多 65,535 字元） | "VARCHAR(M) is a variable-length string; M represents the maximum column length in characters (0 to 65,535)." |
| `TEXT` / `BLOB` | 大文字 / 二進位資料（如檔案） | "TEXT types are stored internally in a different area of memory than the row buffer; BLOB types are binary byte strings, e.g. files." |
| `ENUM` | 列舉型別：值必須取自明確列舉的清單 | "An ENUM is a string object with a value chosen from a list of permitted values enumerated at table creation time." |
| `CREATE DATABASE` / `CREATE SCHEMA` | 建立資料庫（兩者等價） | "CREATE DATABASE (or CREATE SCHEMA) creates a new database for storing all designed tables." |
| `USE database_name` | 把某資料庫設為預設 | "The USE statement sets the database as the default database." |
| `CREATE TABLE` | 建立新資料表；只建立結構，無記錄 | "CREATE TABLE is used to create a new table in a database; the CREATE statement creates only the structure, with no records." |
| `NOT NULL` | 欄位必須有值 | "A column declared NOT NULL must be entered for every record." |
| `NULL` | 欄位可無值；未指定時預設為 NULL | "If neither NULL nor NOT NULL is specified, the column is treated as though NULL had been specified." |
| Primary Key | 主鍵：唯一識別每筆記錄；不可為 NULL | "The primary key uniquely identifies each record in a table; it must be entered for every record." |
| Composite Primary Key | 複合主鍵：由多於一個欄位組成的主鍵 | "A composite primary key consists of more than one column, e.g. PRIMARY KEY (order_id, product_id)." |
| Foreign Key (FK) | 外鍵：參考另一表主鍵的欄位，建立表間關聯 | "A foreign key is a column that references the primary key of another table; the data types of the two columns must be compatible." |
| `CONSTRAINT` | 約束：為約束命名，方便日後管理（如 DROP FOREIGN KEY） | "CONSTRAINT constraint_name names a constraint so that it can be referenced and dropped later." |
| `REFERENCES` | 指定外鍵參考的目標表與欄位 | "REFERENCES table (column) specifies the referenced table and column of a foreign key." |
| `AUTO_INCREMENT` | 主鍵自動遞增生成 | "AUTO_INCREMENT makes the system automatically generate values of the primary key." |
| `DEFAULT CURRENT_TIMESTAMP` | 欄位預設值為目前時間戳 | "DEFAULT CURRENT_TIMESTAMP sets the column's default value to the current timestamp." |
| `ALTER TABLE ... ADD` | 新增欄位 | "ALTER TABLE ... ADD is used to add new columns to a table." |
| `ALTER TABLE ... MODIFY` | 修改欄位資料型別／定義 | "ALTER TABLE ... MODIFY is used to modify the data type and column definition." |
| `ALTER TABLE ... DROP` | 刪除欄位 | "ALTER TABLE ... DROP is used to remove existing columns." |
| `RENAME COLUMN ... TO ...` | 欄位改名 | "ALTER TABLE ... RENAME COLUMN old_name TO new_name changes a column name." |
| `ALTER TABLE ... ADD/DROP PRIMARY KEY` | 新增/刪除主鍵 | "ALTER TABLE ... ADD PRIMARY KEY (column) adds a primary key; ALTER TABLE ... DROP PRIMARY KEY removes it." |
| `ALTER TABLE ... ADD/DROP FOREIGN KEY` | 新增/刪除外鍵約束 | "ALTER TABLE ... ADD CONSTRAINT name FOREIGN KEY (col) REFERENCES t (col) adds a foreign key; DROP FOREIGN KEY name removes it." |
| `RENAME TABLE` / `ALTER TABLE ... RENAME` | 資料表改名 | "RENAME TABLE old_name TO new_name (or ALTER TABLE old_name RENAME new_name) renames a table." |
| `DROP TABLE` / `DROP DATABASE` | 刪除表/資料庫（連同所有資料） | "DROP TABLE removes the table and all its data; DROP DATABASE removes the database and all its data." |

---

## 5. 🗺️ 循序漸進學習路線 (Learning Path)

**階段 1：先理解什麼觀念**
- SQL 是甚麼、為何用標準英文單字（Objectives of SQL）。
- Reserved words vs user-defined words 的分別；大小寫規則。
- 每種 MySQL 資料型別的用途：整數、DECIMAL/FLOAT、日期時間、CHAR/VARCHAR、TEXT/BLOB、ENUM。
- 主鍵（含複合主鍵）與外鍵的概念，以及 1:M、M:N 關係如何在表結構中呈現。
- `NULL` vs `NOT NULL` 的預設行為。

➔ **階段 2：背誦什麼英文短語**
- 「SQL is the standard for performing database operations in relational databases.」
- 「Reserved words are a fixed part of SQL... user-defined words represent names of database objects.」
- 「All non-numeric literals must be enclosed in single or double quotes; numeric literals should not be enclosed in quotes.」
- 「If neither NULL nor NOT NULL is specified, the column is treated as though NULL had been specified.」
- 「A foreign key references the primary key of another table; the data types must be compatible.」
- 每一種資料型別的定義句（見模組 3 的 Blockquote）。

➔ **階段 3：掌握什麼計算/寫法**
- 背熟整數型別儲存大小（1/2/3/4/8 bytes）與 signed/unsigned 範圍。
- 記住 `DECIMAL(M,D)` 的 M/D 意義、`FLOAT(p)` 的 0–23 / 24–53 分流。
- 手寫 5 張表的完整 `CREATE TABLE`（含 ENUM、複合主鍵、外鍵、AUTO_INCREMENT、DEFAULT CURRENT_TIMESTAMP）。
- 手寫 `ALTER TABLE` 六種操作（ADD / MODIFY / DROP / RENAME COLUMN / ADD·DROP PRIMARY KEY / ADD·DROP FOREIGN KEY）。
- 分辨 `RENAME TABLE ... TO ...` 與 `ALTER TABLE ... RENAME ...`、`DROP TABLE` 與 `DROP DATABASE`。

➔ **階段 4：能解答什麼英文考題**
- "Write a CREATE TABLE statement for the Product table with an ENUM column."（照抄語法即可得分）
- "Explain the difference between CHAR and VARCHAR."（用定義句：fixed-length vs variable-length）
- "What happens if neither NULL nor NOT NULL is specified?"（背誦句直接作答）
- "State the rules for writing literals in SQL."（三條規則逐點列出）
- "How do you change the data type of a column?"（答 `ALTER TABLE ... MODIFY`）
- "Explain why a foreign key must have a compatible data type with the referenced primary key."（因必須能比對兩表的值以維持 referential integrity）

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 6.1 關鍵數字速記

| 項目 | 數字 |
|---|---|
| SQL 起源 | IBM，1970 年代初，原名 SEQUEL |
| 最新標準 | SQL:2019 |
| 整數儲存大小 | TINYINT=1B、SMALLINT=2B、MEDIUMINT=3B、INT=4B、BIGINT=8B |
| DECIMAL | M=總位數(1–65)、D=小數位(1–30) |
| FLOAT(p) | p 0–23 → FLOAT(4B)；p 24–53 → DOUBLE(8B) |
| CHAR(M) | 0–255（固定長度） |
| VARCHAR(M) | 0–65,535（可變長度） |
| TIMESTAMP 上限 | 2038-01-19 03:14:07 UTC |
| YEAR 範圍 | 1901–2155 |
| 日期格式 | YYYY-MM-DD，如 "2020-06-17" |

### 6.2 語法對照速查表

| 目的 | 語法 |
|---|---|
| 建資料庫 | `CREATE DATABASE ordering;` / `CREATE SCHEMA ordering;` |
| 選資料庫 | `USE ordering;` |
| 建表 | `CREATE TABLE Name (col type [NOT NULL], ... , PRIMARY KEY (col));` |
| 外鍵 | `CONSTRAINT fk_name FOREIGN KEY (col) REFERENCES T (col);` |
| 複合主鍵 | `PRIMARY KEY (col1, col2);` |
| 自動主鍵 | `order_id SMALLINT NOT NULL AUTO_INCREMENT,` |
| 預設時間 | `order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,` |
| 加欄 | `ALTER TABLE T ADD col VARCHAR(15);` |
| 改欄 | `ALTER TABLE T MODIFY col VARCHAR(50);` |
| 刪欄 | `ALTER TABLE T DROP col;` |
| 欄改名 | `ALTER TABLE T RENAME COLUMN a TO b;` |
| 加主鍵 | `ALTER TABLE T ADD PRIMARY KEY (col);` |
| 刪主鍵 | `ALTER TABLE T DROP PRIMARY KEY;` |
| 加外鍵 | `ALTER TABLE T ADD CONSTRAINT f FOREIGN KEY (c) REFERENCES S (c);` |
| 刪外鍵 | `ALTER TABLE T DROP FOREIGN KEY f;` |
| 表改名 | `RENAME TABLE a TO b;` 或 `ALTER TABLE a RENAME b;` |
| 刪表 | `DROP TABLE T;`（所有資料移除） |
| 刪庫 | `DROP DATABASE db;`（所有資料移除） |

### 6.3 英文極速記憶口訣

- **SQL 口訣：IBM 70s → SEQUEL → SQL:2019 → vendors incompatible**
  "SQL was developed by IBM in the early 1970s as SEQUEL; the latest standard is SQL:2019, and vendor implementations may not fully follow the standard."
- **引號口訣：非數值必加引號，數值禁加引號，日期必加引號且 YYYY-MM-DD**
  "Non-numeric literals must be quoted; numeric literals must not be quoted; date constants are quoted with format year-month-day."
- **NOT NULL 口訣：唔寫 = NULL**
  "If neither NULL nor NOT NULL is specified, treat it as NULL."
- **整數大小口訣：1-2-3-4-8（Tiny-Small-Medium-Int-Big，單位 bytes）**
  "TINYINT 1 byte, SMALLINT 2 bytes, MEDIUMINT 3 bytes, INT 4 bytes, BIGINT 8 bytes."
- **CHAR vs VARCHAR 口訣：CHAR 固定唔浪費對齊快、VARCHAR 慳位可變長**
  "CHAR is fixed-length; VARCHAR is variable-length."
- **ALTER 口訣：ADD 加、MODIFY 改、DROP 刪、RENAME 改名**
  "ADD adds a column, MODIFY changes its definition, DROP removes it, RENAME COLUMN renames it."
- **外鍵口訣：FOREIGN KEY 指向 REFERENCES 另一表主鍵，資料型別要 compatible**
  "A foreign key references the primary key of another table and its data type must be compatible."

### 6.4 一分鐘自我測驗

1. SQL 由哪間公司、於何時開發？原名是甚麼？→ IBM, early 1970s, SEQUEL
2. `FLOAT(20)` 會變成甚麼型別？→ 4-byte single-precision FLOAT（p=20 ∈ 0–23）
3. 寫出 Order_line 的複合主鍵語法。→ `PRIMARY KEY (order_id, product_id);`
4. 把 Employee 表 `title` 欄刪除的語法。→ `ALTER TABLE Employee DROP title;`
5. 未指定 NULL/NOT NULL 時欄位預設如何？→ Treated as though NULL had been specified.
