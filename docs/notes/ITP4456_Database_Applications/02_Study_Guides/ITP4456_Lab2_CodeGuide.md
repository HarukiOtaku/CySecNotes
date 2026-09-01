# ITP4456 Database Applications — Lab 2 CodeGuide（實務測驗主戰文件 v3.0）

> **Lab 2: Structured Query Language (SQL) – Data Definition Language (DDL)**
> **Core Skill: Apply SQL to create and modify relation structures.**

本 Lab 係 SQL 世界嘅「起樓工程」：由零開始建立資料庫、建立有主鍵（Primary Key）同外鍵（Foreign Key）嘅關聯表，再用 `ALTER TABLE` 改動表格結構，最後學識點樣安全刪表。以下係完整實戰攻略，跟住做一次就足以應付 Practical Test / Lab Test。

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握的實務技能（Practical Skills）

1. **建立及切換資料庫**：用 `CREATE DATABASE` 同 `USE` 開新資料庫並進入佢。
2. **建立關聯表結構**：用 `CREATE TABLE` 定義欄位、資料型別（Data Type）、`NOT NULL`、`ENUM`、`AUTO_INCREMENT`、`PRIMARY KEY` 同 `FOREIGN KEY`。
3. **檢查表格結構**：用 `DESC <table>`（Describe）確認表格建立正確。
4. **修改表格結構**：用 `ALTER TABLE` 完成「加欄位（ADD）、改型別（MODIFY）、刪欄位（DROP COLUMN）、改名（RENAME COLUMN）」。
5. **加／刪鍵**：用 `ALTER TABLE ... ADD PRIMARY KEY / ADD CONSTRAINT ... FOREIGN KEY` 加鍵；用 `DROP FOREIGN KEY` 加 `DROP INDEX` 刪外鍵及其索引。
6. **刪除表格**：用 `DROP TABLE`，並理解外鍵約束（Foreign Key Constraint）對刪表順序嘅影響。
7. **逆向工程出 ERD**：用 MySQL Workbench 嘅 Reverse Engineer 功能生成 Entity-Relationship Diagram 並匯出 PNG。

> **On completion of this lab, students are expected to be able to apply SQL to create and modify relation structures (DDL).**

### 所需軟體／工具（Software & Tools）

| 工具（Tool） | 用途（Purpose） |
|---|---|
| **MySQL Server** | 實際執行 SQL 嘅資料庫引擎 |
| **MySQL Workbench** | 圖形介面執行 SQL、`DESC`／`SHOW KEYS` 檢查、Reverse Engineer 出 ERD |
| **SQL Editor（Workbench 內建）** | 撰寫及執行 `CREATE` / `ALTER` / `DROP` 等 DDL 指令 |

> **DDL (Data Definition Language) is the subset of SQL that defines and modifies database structures: CREATE, ALTER, DROP.**

---

## 🛠️ 解題步驟拆解 (Walkthrough)

### 環境準備：建立 PRODUCT 資料庫

**題目原文（Question）**：Create and use a new database PRODUCT.

**解題步驟**：

1 ➔ 建立資料庫 `PRODUCT` — 用 `CREATE DATABASE` 指令，一次過建立一個全新嘅資料庫。

2 ➔ 切換到 `PRODUCT` — 用 `USE` 指令，令之後所有操作都喺 `PRODUCT` 入面執行。

3 ➔ （可選）驗證 — 用 `SHOW DATABASES;` 睇下資料庫有冇成功建立。

**答案（Answer）**：

```sql
CREATE DATABASE PRODUCT;   -- 建立名為 PRODUCT 嘅新資料庫
USE PRODUCT;                -- 切換到 PRODUCT 資料庫，之後嘅 SQL 都會喺呢度執行
```

> **CREATE DATABASE creates a new database; USE selects it as the current database for subsequent statements.**

---

### Q2：建立 ITEM、COLOR、INVENTORY 三張表

**題目原文（Question）**：Create the following three tables ITEM, COLOR and INVENTORY according to the following definitions (where PRI stands for primary key and MUL stands for foreign key). Use `DESC` commands to check if your tables are created correctly. Use `DROP TABLE` statement to remove the table if it is incorrect.

**表格定義（Table Definitions）**：

**ITEM**

| Field | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| itemID | MEDIUMINT | NO | PRI | NULL | |
| itemDesc | VARCHAR(50) | NO | | NULL | |
| category | ENUM('M','W','C') | NO | | NULL | |

> category 只可以係 'M'、'W'、'C'，分別代表男人（man）、女人（woman）同兒童（children）。

**COLOR**

| Field | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| colorID | TINYINT | NO | PRI | NULL | |
| color | VARCHAR(25) | NO | | NULL | |

**INVENTORY**

| Field | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| invID | INT | NO | PRI | NULL | AUTO_INCREMENT |
| itemID | MEDIUMINT | NO | MUL | NULL | |
| itemSize | VARCHAR(10) | YES | | NULL | |
| colorID | TINYINT | NO | MUL | NULL | |
| currPrice | DECIMAL(6,2) | NO | | NULL | |
| qoh | MEDIUMINT | NO | | NULL | |
| des | VARCHAR(20) | YES | | NULL | |

**解題步驟**：

1 ➔ 建立 **ITEM** 表 — 先建「被參考」嘅主表（Parent Table）。`itemID` 係主鍵（PRI），用 `PRIMARY KEY (itemID)` 宣告；`category` 用 `ENUM('M','W','C')` 限制只可輸入 M／W／C。

2 ➔ 建立 **COLOR** 表 — 同樣係主表，`colorID` 做 `PRIMARY KEY`。**必須喺 INVENTORY 之前建立**，因為 INVENTORY 嘅外鍵會參考佢。

3 ➔ 建立 **INVENTORY** 表 — 呢張係子表（Child Table）。`invID` 做 `PRIMARY KEY` 之餘加 `AUTO_INCREMENT`（自動遞增）；`itemID` 參考 ITEM 表、`colorID` 參考 COLOR 表，兩個都用 `FOREIGN KEY ... REFERENCES ...` 宣告（Key 欄位會顯示 MUL）。

4 ➔ 檢查結構 — 用 `DESC ITEM;`（或 `DESC COLOR;`、`DESC INVENTORY;`）確認每個欄位嘅型別、Null 同 Key 都同定義一致。

5 ➔ 錯咗就刪 — 如果 `DESC` 顯示嘅結構唔啱，用 `DROP TABLE ITEM;` 刪除之後重新建立，直至完全正確。

**答案（Answer）**：

```sql
-- 1. ITEM 表（主表，先建）
CREATE TABLE ITEM (
    itemID   MEDIUMINT NOT NULL,
    itemDesc VARCHAR(50) NOT NULL,
    category ENUM('M','W','C') NOT NULL,
    PRIMARY KEY (itemID)
);

-- 2. COLOR 表（主表，先建）
CREATE TABLE COLOR (
    colorID TINYINT NOT NULL,
    color   VARCHAR(25) NOT NULL,
    PRIMARY KEY (colorID)
);

-- 3. INVENTORY 表（子表，後建，因為有外鍵）
CREATE TABLE INVENTORY (
    invID     INT NOT NULL AUTO_INCREMENT,
    itemID    MEDIUMINT NOT NULL,
    itemSize  VARCHAR(10),
    colorID   TINYINT NOT NULL,
    currPrice DECIMAL(6,2) NOT NULL,
    qoh       MEDIUMINT NOT NULL,
    des       VARCHAR(20),
    PRIMARY KEY (invID),
    FOREIGN KEY (itemID)  REFERENCES ITEM(itemID),
    FOREIGN KEY (colorID) REFERENCES COLOR(colorID)
);

-- 4. 檢查結構
DESC ITEM;
DESC COLOR;
DESC INVENTORY;

-- 5. 有錯就刪除重來
DROP TABLE ITEM;
```

> **PRI marks the primary key column; MUL marks a column that is part of a non-unique index, typically a foreign key column.**
> **CREATE TABLE defines columns, data types, constraints (NOT NULL, PRIMARY KEY, FOREIGN KEY, AUTO_INCREMENT) and ENUM value lists.**

---

### Q3：加欄位 unitPrice（DECIMAL(5,2)）

**題目原文（Question）**：Write a SQL statement to add the attribute unitPrice in the ITEM table. The datatype of the attribute unitPrice is DECIMAL(5,2).

**解題步驟**：

1 ➔ 認清目標 — 要喺 **ITEM** 表**新增**一個欄位 `unitPrice`，型別係 `DECIMAL(5,2)`（共 5 位數字，其中 2 位係小數，即最大 999.99）。

2 ➔ 用 `ALTER TABLE ... ADD` — `ADD` 係加欄位嘅 keyword，格式係「表名 + ADD + 欄位名 + 型別」。

3 ➔ 執行後用 `DESC ITEM;` 檢查新欄位有冇出現。

**答案（Answer）**：

```sql
ALTER TABLE ITEM ADD unitPrice DECIMAL(5,2);
```

> **ALTER TABLE ... ADD column_name data_type adds a new column to an existing table.**

---

### Q4：加欄位 inStockDate（DATE）

**題目原文（Question）**：Write a SQL statement to add the column inStockDate with the data type DATE to the INVENTORY table.

**解題步驟**：

1 ➔ 目標係 **INVENTORY** 表，加一個叫 `inStockDate` 嘅欄位。

2 ➔ 型別係 `DATE`（只儲日期，格式 YYYY-MM-DD）。

3 ➔ 同 Q3 一樣用 `ALTER TABLE ... ADD`，再 `DESC INVENTORY;` 驗證。

**答案（Answer）**：

```sql
ALTER TABLE INVENTORY ADD inStockDate DATE;
```

> **ALTER TABLE ... ADD column_name DATE appends a date column (format YYYY-MM-DD) to the table.**

---

### Q5：修改欄位型別 DECIMAL(5,2) → DECIMAL(6,2)

**題目原文（Question）**：Write a SQL statement to modify the attribute unitPrice of the table ITEM, the data type from DECIMAL(5,2) to DECIMAL(6,2).

**解題步驟**：

1 ➔ 今次唔係加欄位，而係**改型別**：`unitPrice` 由 `DECIMAL(5,2)` 變成 `DECIMAL(6,2)`（最大去到 9999.99）。

2 ➔ 用 `ALTER TABLE ... MODIFY` — `MODIFY` 可以改欄位嘅型別（同埋其他屬性），**必須連型別一齊寫**。

3 ➔ 用 `DESC ITEM;` 確認 Type 欄已變成 `decimal(6,2)`。

**答案（Answer）**：

```sql
ALTER TABLE ITEM MODIFY unitPrice DECIMAL(6,2);
```

> **ALTER TABLE ... MODIFY column_name new_data_type changes the data type (and other attributes) of an existing column.**

---

### Q6：刪除欄位 des

**題目原文（Question）**：Write a SQL statement to remove the attribute des from the table INVENTORY.

**解題步驟**：

1 ➔ 要由 **INVENTORY** 表**移除**欄位 `des`。

2 ➔ 用 `ALTER TABLE ... DROP COLUMN` — `DROP COLUMN` 係刪欄位嘅 keyword（`COLUMN` 可以省略，寫 `DROP des` 都得）。

3 ➔ `DESC INVENTORY;` 確認 `des` 已經唔喺度。

**答案（Answer）**：

```sql
ALTER TABLE INVENTORY DROP COLUMN des;
```

> **ALTER TABLE ... DROP COLUMN column_name permanently removes a column and all of its data from the table.**

---

### Q7：欄位改名 qoh → qty

**題目原文（Question）**：Write a SQL statement to rename the column qoh in the table INVENTORY, the column name from qoh to qty.

**解題步驟**：

1 ➔ 要將 **INVENTORY** 表嘅 `qoh` 改名做 `qty`（Quantity on Hand，庫存量）。

2 ➔ **MySQL 8.0 起**可以用 `RENAME COLUMN`，只改名字，型別自動保留。

3 ➔ **舊版 MySQL（5.x）**就要用 `CHANGE`，而且**要重新寫一次型別**（`MEDIUMINT`）。

4 ➔ `DESC INVENTORY;` 確認欄位名已改。

**答案（Answer）**：

```sql
-- MySQL 8.0 或以上（推薦寫法）
ALTER TABLE INVENTORY RENAME COLUMN qoh TO qty;

-- 舊版 MySQL 5.x 寫法：CHANGE 必須連型別一齊寫
ALTER TABLE INVENTORY CHANGE qoh qty MEDIUMINT NOT NULL;
```

> **ALTER TABLE ... RENAME COLUMN old_name TO new_name renames a column without changing its data type (MySQL 8.0+); ALTER TABLE ... CHANGE old_name new_name type does the same on older versions but requires the type.**

---

### Q8：刪除外鍵同對應索引（colorID）

**題目原文（Question）**：Write a SQL statement to remove the foreign key and the corresponding key of colorID in INVENTORY table. You can use the following query to list all keys in the table: `SHOW KEYS FROM INVENTORY;`

**解題步驟**：

1 ➔ **先查名** — 外鍵嘅約束名（Constraint Name）係系統自動生成（例如 `inventory_ibfk_2`），要先執行 `SHOW KEYS FROM INVENTORY;` 睇清楚 `colorID` 對應嘅 `Key_name` 係乜。

2 ➔ **刪外鍵** — 用 `ALTER TABLE ... DROP FOREIGN KEY <約束名>` 刪除外鍵約束。

3 ➔ **刪索引** — 外鍵刪完之後，佢個底層索引（Index）仲喺度，要用 `ALTER TABLE ... DROP INDEX colorID;` 一併刪走（題目話「remove the foreign key and the corresponding key」，即兩樣都要做）。

4 ➔ 再執行 `SHOW KEYS FROM INVENTORY;` 確認 `colorID` 已經冇任何 Key 記錄。

**答案（Answer）**：

```sql
-- 1. 列出 INVENTORY 所有鍵，搵出 colorID 嘅約束名（例如 inventory_ibfk_2）
SHOW KEYS FROM INVENTORY;

-- 2. 刪除外鍵約束（約束名以 SHOW KEYS 顯示為準）
ALTER TABLE INVENTORY DROP FOREIGN KEY inventory_ibfk_2;

-- 3. 刪除對應嘅索引
ALTER TABLE INVENTORY DROP INDEX colorID;
```

> **SHOW KEYS FROM table_name lists every key (primary, foreign, index) of a table.**
> **Removing a foreign key is a two-step process: ALTER TABLE ... DROP FOREIGN KEY constraint_name first, then ALTER TABLE ... DROP INDEX index_name to remove the underlying index.**

---

### Q9：刪除 COLOR 表

**題目原文（Question）**：Write a SQL statement to remove the table COLOR. If you forget to drop the foreign key of colorID in Q8, you will receive the following error message.

**解題步驟**：

1 ➔ 直接執行 `DROP TABLE COLOR;` — **但前提係 Q8 已經刪咗 `colorID` 嘅外鍵**。

2 ➔ 如果冇刪外鍵就執行，MySQL 會拒絕並回傳 **ERROR 3730**：「Cannot drop table 'COLOR' referenced by a foreign key constraint ... on table 'INVENTORY'.」

3 ➔ 遇到錯誤就返轉頭做 Q8 嘅兩步（`DROP FOREIGN KEY` + `DROP INDEX`），再重新 `DROP TABLE COLOR;`。

4 ➔ 用 `SHOW TABLES;` 確認 `COLOR` 已經刪除。

**答案（Answer）**：

```sql
DROP TABLE COLOR;
```

> **DROP TABLE table_name removes the table and its data permanently; a parent table cannot be dropped while a foreign key in another table still references it.**

---

### ⭐ Challenge Exercise：StudentProgram 資料庫（加分題，測驗極大機會出）

**題目原文（Question）**：Create and use a new database StudentProgram. Create the following TWO tables STUDENT, PROGRAM according to the following definitions (where PRI stands for primary key and MUL stands for foreign key).

**表格定義（Table Definitions）**：

**STUDENT**

| Field | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| stdID | INT | NO | PRI | NULL | AUTO_INCREMENT |
| engName | VARCHAR(40) | NO | | NULL | |
| chiName | VARCHAR(40) | YES | | NULL | |
| DOB | DATE | NO | | NULL | |
| program | CHAR(8) | NO | | NULL | |

**PROGRAM**

| Field | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| programCode | CHAR(8) | NO | | NULL | |
| proName | VARCHAR(40) | NO | | NULL | |
| duration | TINYINT | YES | | NULL | |
| studyMode | VARCHAR(1) | NO | | NULL | |

**解題步驟**：

1 ➔ 建立並切換到資料庫：`CREATE DATABASE StudentProgram;` + `USE StudentProgram;`

2 ➔ 先建 **PROGRAM** 表（主表）— 注意 `programCode` 暫時**未設主鍵**，係留返畀後面 C4 用 `ALTER TABLE` 加（考你 ALTER TABLE 加 PK 嘅能力）。

3 ➔ 再建 **STUDENT** 表（子表）— `stdID` 有 `AUTO_INCREMENT`；`program` 欄位**暫時唔加外鍵**，留返畀後面 C5 用 `ALTER TABLE` 加。

4 ➔ 跟住逐條做 C1–C5 嘅 `ALTER TABLE` 指令（見下面各小題）。

5 ➔ 用 `DESC STUDENT;` / `DESC PROGRAM;` 同 `SHOW KEYS FROM STUDENT;` 驗證結構。

**基礎答案（Answer）**：

```sql
CREATE DATABASE StudentProgram;
USE StudentProgram;

CREATE TABLE PROGRAM (
    programCode CHAR(8) NOT NULL,
    proName     VARCHAR(40) NOT NULL,
    duration    TINYINT,
    studyMode   VARCHAR(1) NOT NULL
);

CREATE TABLE STUDENT (
    stdID   INT NOT NULL AUTO_INCREMENT,
    engName VARCHAR(40) NOT NULL,
    chiName VARCHAR(40),
    DOB     DATE NOT NULL,
    program CHAR(8) NOT NULL,
    PRIMARY KEY (stdID)
);
```

> **A primary key can be added after table creation with ALTER TABLE ... ADD PRIMARY KEY; a foreign key can be added afterwards with ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY ... REFERENCES.**

---

#### C1：STUDENT 加欄位 address（100 字、不可為空）

**題目原文（Question）**：Write a SQL statement to add a new attribute address to the STUDENT table. Which the attribute only accept input of 100 characters and not accept null value.

**解題步驟**：

1 ➔ 要加嘅欄位叫 `address`。

2 ➔ 「只接受 100 個字元」→ 型別 `VARCHAR(100)`；「不接受 null 值」→ 加 `NOT NULL`。

3 ➔ 用 `ALTER TABLE ... ADD` 一次過寫埋型別同約束。

**答案（Answer）**：

```sql
ALTER TABLE STUDENT ADD address VARCHAR(100) NOT NULL;
```

> **VARCHAR(100) stores up to 100 characters; NOT NULL rejects NULL values, so the column is mandatory.**

---

#### C2：PROGRAM 修改 studyMode 型別

**題目原文（Question）**：Write a SQL statement to modify the attribute studyMode in the PROGRAM table. The datatype of the attribute from VARCHAR(1) change to VARCHAR(20).

**解題步驟**：

1 ➔ 目標：`studyMode` 由 `VARCHAR(1)` 改做 `VARCHAR(20)`。

2 ➔ 用 `ALTER TABLE ... MODIFY`，連型別一齊寫。

**答案（Answer）**：

```sql
ALTER TABLE PROGRAM MODIFY studyMode VARCHAR(20);
```

> **ALTER TABLE ... MODIFY changes an existing column's data type, e.g., VARCHAR(1) to VARCHAR(20).**

---

#### C3：PROGRAM 修改 duration 為不可為空

**題目原文（Question）**：In the PROGRAM table, write a SQL statement to modify the attribute duration to not accept NULL value.

**解題步驟**：

1 ➔ `duration` 原本係 `TINYINT`（可空），而家要改成 `NOT NULL`。

2 ➔ 用 `MODIFY` 重新宣告，型別 `TINYINT` 一定要保留，再加 `NOT NULL`。

**答案（Answer）**：

```sql
ALTER TABLE PROGRAM MODIFY duration TINYINT NOT NULL;
```

> **Re-declaring a column with MODIFY and adding NOT NULL makes the column mandatory; forgetting the data type in MODIFY causes a syntax error.**

---

#### C4：PROGRAM 加主鍵

**題目原文（Question）**：Write a SQL statement to add the primary key to the column programCode of the PROGRAM table.

**解題步驟**：

1 ➔ 建立 PROGRAM 表嗰陣冇設主鍵，而家用 `ALTER TABLE ... ADD PRIMARY KEY` 補返。

2 ➔ 括號入面寫主鍵欄位 `(programCode)`。

3 ➔ 呢步做完，之後 C5 加外鍵先可以參考 `programCode`。

**答案（Answer）**：

```sql
ALTER TABLE PROGRAM ADD PRIMARY KEY (programCode);
```

> **ALTER TABLE ... ADD PRIMARY KEY (column) defines the primary key on a column after the table already exists.**

---

#### C5：STUDENT 加外鍵（約束名 programCode_fk）

**題目原文（Question）**：Write a SQL statement to add the Foreign Key to the column program of the STUDENT table, the constraint name should be programCode_fk.

**解題步驟**：

1 ➔ 用 `ADD CONSTRAINT programCode_fk` 指定**自訂約束名**（題目指定，一定要跟）。

2 ➔ `FOREIGN KEY (program)` — STUDENT 表入面做外鍵嘅欄位係 `program`。

3 ➔ `REFERENCES PROGRAM(programCode)` — 參考 PROGRAM 表嘅主鍵 `programCode`。

4 ➔ `SHOW KEYS FROM STUDENT;` 驗證 `program` 嘅 Key_name 係 `programCode_fk`。

**答案（Answer）**：

```sql
ALTER TABLE STUDENT
ADD CONSTRAINT programCode_fk
FOREIGN KEY (program) REFERENCES PROGRAM(programCode);
```

> **ALTER TABLE ... ADD CONSTRAINT constraint_name FOREIGN KEY (child_col) REFERENCES parent_table(parent_col) adds a named foreign key that enforces referential integrity between the two tables.**

---

### 🖼️ Additional：Reverse Engineer 出 ERD 並匯出 PNG

**題目原文（Question）**：MySQL Workbench provides a tool for reverse engineering that generates an Entity-Relationship Diagram (ERD) for a specific database.

**解題步驟**：

1 ➔ 喺 MySQL Workbench 主選單揀 **Database** ➔ **Reverse Engineer**。

2 ➔ 確認 Connection 設定正確，撳 **Next**；等佢 Fetch 完資料庫資訊再撳 **Next**。

3 ➔ 揀今次 Lab 嘅資料庫（即 **PRODUCT**），撳 **Next**；等 Schema Objects 收集完，撳 **Next**。

4 ➔ 確認所有表格會放上 Diagram，撳 **Execute**；最後撳 **Next** + **Finish** 完成精靈。

5 ➔ 喺 **File** 選單 ➔ **Export** ➔ **Export as PNG**，命名為 **product.png**。

6 ➔ 將 Word 教材檔同 `product.png` 一齊交上 **Moodle**。

> **Reverse engineering reads an existing database schema and generates an ERD showing tables, primary keys and foreign key relationships; export it as PNG for submission.**

---

## 💻 關鍵 SQL/指令庫（Command Library）

以下係本 Lab 所有關鍵指令，逐行加繁中註解，實測前背熟佢。

### 資料庫層級（Database Level）

```sql
CREATE DATABASE PRODUCT;                        -- 建立新資料庫 PRODUCT
USE PRODUCT;                                     -- 切換到 PRODUCT 資料庫
SHOW DATABASES;                                  -- 列出所有資料庫
SHOW TABLES;                                     -- 列出目前資料庫所有表格
DROP DATABASE PRODUCT;                           -- 刪除整個資料庫（連同入面所有表）
```

### 建立表格（CREATE TABLE）

```sql
CREATE TABLE ITEM (                              -- 建立 ITEM 表
    itemID   MEDIUMINT NOT NULL,                 -- 整數欄位，不可為空（主鍵欄）
    itemDesc VARCHAR(50) NOT NULL,               -- 可變長度字串（最多 50 字），不可為空
    category ENUM('M','W','C') NOT NULL,         -- 只能揀 M/W/C 其中一個值
    PRIMARY KEY (itemID)                         -- 將 itemID 設為主鍵
);

CREATE TABLE INVENTORY (                         -- 建立 INVENTORY 表（含外鍵同自動遞增）
    invID     INT NOT NULL AUTO_INCREMENT,       -- 整數 + 自動遞增（每次 +1）
    itemID    MEDIUMINT NOT NULL,                -- 外鍵欄：參考 ITEM
    itemSize  VARCHAR(10),                       -- 可空字串欄位（冇寫 NOT NULL）
    colorID   TINYINT NOT NULL,                  -- 外鍵欄：參考 COLOR
    currPrice DECIMAL(6,2) NOT NULL,             -- 定點小數：共 6 位、小數 2 位
    qoh       MEDIUMINT NOT NULL,                -- 庫存量
    des       VARCHAR(20),                       -- 描述，可空
    PRIMARY KEY (invID),                         -- 主鍵
    FOREIGN KEY (itemID) REFERENCES ITEM(itemID),    -- 外鍵：itemID 參考 ITEM 表
    FOREIGN KEY (colorID) REFERENCES COLOR(colorID)  -- 外鍵：colorID 參考 COLOR 表
);
```

### 檢查結構（Inspection）

```sql
DESC ITEM;                                       -- 顯示 ITEM 表結構（欄位/型別/Null/Key/Default/Extra）
SHOW KEYS FROM INVENTORY;                        -- 列出 INVENTORY 所有鍵（含外鍵約束名）
SHOW CREATE TABLE ITEM;                          -- 顯示建立 ITEM 表嘅完整 SQL（除錯好用）
```

### 修改表格（ALTER TABLE）

```sql
ALTER TABLE ITEM ADD unitPrice DECIMAL(5,2);               -- 加欄位 unitPrice
ALTER TABLE INVENTORY ADD inStockDate DATE;                -- 加 DATE 欄位
ALTER TABLE ITEM MODIFY unitPrice DECIMAL(6,2);            -- 改型別 DECIMAL(5,2)→(6,2)
ALTER TABLE INVENTORY DROP COLUMN des;                     -- 刪欄位 des
ALTER TABLE INVENTORY RENAME COLUMN qoh TO qty;            -- 欄位改名（MySQL 8.0+）
ALTER TABLE INVENTORY CHANGE qoh qty MEDIUMINT NOT NULL;   -- 欄位改名（舊版，須連型別）
ALTER TABLE PROGRAM ADD PRIMARY KEY (programCode);         -- 後加主鍵
ALTER TABLE STUDENT ADD address VARCHAR(100) NOT NULL;     -- 加欄位連 NOT NULL
ALTER TABLE PROGRAM MODIFY duration TINYINT NOT NULL;      -- 改為不可空
ALTER TABLE PROGRAM MODIFY studyMode VARCHAR(20);          -- 改型別 VARCHAR(1)→(20)
ALTER TABLE STUDENT ADD CONSTRAINT programCode_fk          -- 加自訂名外鍵
    FOREIGN KEY (program) REFERENCES PROGRAM(programCode);
```

### 刪除外鍵／索引／表格（Drop Operations）

```sql
ALTER TABLE INVENTORY DROP FOREIGN KEY inventory_ibfk_2;   -- 刪外鍵約束（名要由 SHOW KEYS 查）
ALTER TABLE INVENTORY DROP INDEX colorID;                  -- 刪外鍵底層索引
DROP TABLE COLOR;                                          -- 刪表（先刪外鍵先得）
DROP TABLE ITEM;                                           -- 刪錯咗就重嚟
```

> **Reminder: SHOW KEYS FROM ... reveals the auto-generated foreign key constraint name (e.g., inventory_ibfk_2) that you must use in DROP FOREIGN KEY.**

---

## 🐞 常見 Error 與 Debug

| Error Message | 原因（Cause） | Fix（修正方法） |
|---|---|---|
| `ERROR 3730 (HY000): Cannot drop table 'COLOR' referenced by a foreign key constraint 'xxx' on table 'INVENTORY'` | 仲有其他表嘅外鍵參考緊 COLOR，Q8 冇刪外鍵 | 先 `ALTER TABLE INVENTORY DROP FOREIGN KEY <名>;` 再 `DROP TABLE COLOR;` |
| `ERROR 1215 (HY000): Cannot add foreign key constraint` | 被參考欄位型別／定義唔一致，或者主表未建立、主表冇主鍵 | 檢查 `REFERENCES` 欄位型別相同、主表已建且有 PK、外鍵欄 `NOT NULL` 一致 |
| `ERROR 1064 (42000): You have an error in your SQL syntax` | 打錯 keyword、漏逗號／括號、`MODIFY` 冇寫型別 | 逐行檢查拼字同標點；`MODIFY` 一定要連型別寫 |
| `ERROR 1005 (HY000): Can't create table 'xxx' (errno: 150)` | 建立含外鍵嘅表失敗（多數係被參考表／欄位問題） | 確認主表已建、欄位型別匹配；用 `SHOW ENGINE INNODB STATUS` 睇詳細原因 |
| `ERROR 1091 (42000): Can't DROP 'xxx'; check that column/key exists` | 想刪嘅 column／index 根本唔存在（名串錯或已刪） | 用 `DESC` ／`SHOW KEYS FROM` 確認實際名稱 |
| `ERROR 1062 (23000): Duplicate entry 'xxx' for key 'PRIMARY'` | 插入重複嘅主鍵值（或 `AUTO_INCREMENT` 撞號） | 檢查輸入資料；主鍵欄唔好手動重複填值 |
| `ERROR 1366 (HY000): Incorrect value for ENUM` | `category` 收到唔係 M／W／C 嘅值 | 確保輸入值只係 `'M'`、`'W'` 或 `'C'` |
| `ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails` | 想刪除／修改被子表外鍵參考緊嘅主表資料 | 先處理子表資料，或刪除該外鍵約束 |
| `ERROR 1264 (22003): Out of range value for column` | 數值超出型別範圍（例如 `TINYINT` 放 300） | 改用更大型別（`SMALLINT`／`INT`／加大 `DECIMAL` 精度） |
| `ERROR 1406 (22001): Data too long for column` | 字串超過 `VARCHAR(n)`／`CHAR(n)` 長度 | 加大長度，或改用 `TEXT` |
| `Unknown column 'xxx' in 'field list'` | 欄位名串錯／唔存在 | `DESC <table>;` 睇清楚實際欄位名 |

> **Debug principle: run DESC / SHOW KEYS FROM / SHOW CREATE TABLE first to confirm the real names and structure before altering or dropping.**

---

## 📝 測驗常見題型 (Common Test Questions)

實務測驗（Practical Test / Lab Test）通常會畀一張「表格定義表」（Field / Type / Null / Key / Default / Extra），然後考你以下嘢：

| 常見題型 | 考你咩 | 答題要點（Answer Points） |
|---|---|---|
| 建立資料庫並建立 2–3 張關聯表 | `CREATE DATABASE`、`USE`、`CREATE TABLE` | 主表先建、子表後建；每欄型別／`NOT NULL`／`ENUM`／`AUTO_INCREMENT` 照抄定義；`PRIMARY KEY` 同 `FOREIGN KEY ... REFERENCES` 寫法要熟 |
| 加一個欄位 | `ALTER TABLE ... ADD` | 格式：`ALTER TABLE <表> ADD <欄位> <型別> [NOT NULL];` |
| 改欄位型別／改為 NOT NULL | `ALTER TABLE ... MODIFY` | `MODIFY` 一定要連型別一齊寫：`MODIFY <欄位> <新型別> [NOT NULL]` |
| 刪欄位 | `ALTER TABLE ... DROP COLUMN` | `COLUMN` 可省略；格式：`ALTER TABLE <表> DROP [COLUMN] <欄位>;` |
| 欄位改名 | `ALTER TABLE ... RENAME COLUMN`（8.0）／`CHANGE`（舊版） | `RENAME COLUMN 舊 TO 新`；`CHANGE 舊 新 型別`（要連型別） |
| 後加主鍵 | `ALTER TABLE ... ADD PRIMARY KEY` | 括號包欄位：`ADD PRIMARY KEY (programCode);` |
| 後加外鍵（指定約束名） | `ALTER TABLE ... ADD CONSTRAINT` | 格式：`ADD CONSTRAINT <名> FOREIGN KEY (<子欄>) REFERENCES <主表>(<主欄>);` 約束名要跟足題目 |
| 刪外鍵＋刪索引（兩步曲） | `DROP FOREIGN KEY` + `DROP INDEX` | 先 `SHOW KEYS FROM <表>` 搵約束名，再分兩句刪；次序錯會出 ERROR 3730／1091 |
| 刪除被參考嘅主表 | `DROP TABLE` 同外鍵約束 | 一定要先刪子表外鍵先可以刪主表；記得答「先 DROP FOREIGN KEY 再 DROP TABLE」 |
| 檢查結構 | `DESC`、`SHOW KEYS FROM` | 識得用嚟驗證同搵約束名 |
| 逆向工程 ERD | MySQL Workbench Reverse Engineer | Database → Reverse Engineer → 揀資料庫 → Execute → File → Export as PNG → 交 product.png |

**答題重點（Core Answer Points）**：

> **1. Child tables with foreign keys must be created AFTER their parent tables.**
> **2. MODIFY always restates the full column definition, including the data type.**
> **3. Dropping a foreign key requires the exact constraint name, found via SHOW KEYS FROM.**
> **4. A parent table cannot be dropped while it is still referenced by a foreign key.**
> **5. Always verify every change with DESC or SHOW KEYS FROM before moving on.**

**實測貼士（Exam Tips）**：

- 每個 `ALTER TABLE` 做完都即刻 `DESC` 一次，唔好一次過打晒先驗證，錯咗好難追。
- 試題成日「特登」喺建立表嗰陣唔設主鍵／外鍵，逼你用 `ALTER TABLE` 後加 — 證明你識 `ADD PRIMARY KEY` 同 `ADD CONSTRAINT ... FOREIGN KEY`。
- 交功課／交卷前，記得 `SHOW TABLES;` 數下有冇齊晒表，以及提交 `product.png`。

---

## 🔗 理論 recap（Theory Recap）

1. **SQL 分四大類**：DDL（定義結構）、DML（操作資料）、DCL（控制權限）、TCL（交易控制）；本 Lab 全部係 **DDL（Data Definition Language）**：`CREATE`／`ALTER`／`DROP`。

> **DDL defines and modifies database structures: CREATE, ALTER, DROP.**

2. **常見資料型別**：`INT`／`MEDIUMINT`／`TINYINT`（整數，範圍由大到細）、`DECIMAL(p,s)`（精確小數，p=總位數、s=小數位）、`VARCHAR(n)`（可變長度字串）、`CHAR(n)`（固定長度字串）、`DATE`（日期）、`ENUM('a','b')`（限死幾個值）。

> **DECIMAL(p,s) stores exact decimals with p total digits and s after the point; VARCHAR stores variable-length text; ENUM restricts a column to a fixed set of values.**

3. **約束（Constraints）**：`NOT NULL`（不可為空）、`PRIMARY KEY`（主鍵，唯一識別每行）、`FOREIGN KEY`（外鍵，參考另一張表嘅主鍵）、`AUTO_INCREMENT`（自動遞增）。

> **NOT NULL forbids missing values; PRIMARY KEY uniquely identifies each row; FOREIGN KEY references the primary key of another table to enforce referential integrity; AUTO_INCREMENT generates sequential numbers automatically.**

4. **主鍵 vs 外鍵**：主鍵（PRI）喺本表內唯一；外鍵（MUL）用嚟串連兩張表，保證「子表嘅值一定喺主表存在」。

> **A primary key is unique inside its own table; a foreign key links a child row to an existing parent row, guaranteeing referential integrity.**

5. **建表順序**：有外鍵嘅子表一定要喺主表之後建立；刪表就相反，先刪子表（或先刪外鍵）再刪主表。

> **Create parent tables before child tables that reference them; when dropping, remove foreign keys (or child tables) first.**

6. **ALTER TABLE 四大操作**：`ADD`（加欄位）、`MODIFY`（改型別／屬性）、`DROP COLUMN`（刪欄位）、`RENAME COLUMN`（改名，8.0+）。

> **ALTER TABLE supports ADD, MODIFY, DROP COLUMN and RENAME COLUMN to change a table's structure after creation.**

7. **外鍵刪除係兩步曲**：`DROP FOREIGN KEY`（刪約束）＋ `DROP INDEX`（刪底層索引），約束名要用 `SHOW KEYS FROM` 查。

> **Dropping a foreign key requires both DROP FOREIGN KEY and DROP INDEX; find the constraint name with SHOW KEYS FROM.**

8. **ERD（Entity-Relationship Diagram）** 可以由現有資料庫逆向工程生成，展示表同表之間嘅主／外鍵關係，用 MySQL Workbench 嘅 Reverse Engineer 功能。

> **Reverse engineering generates an ERD from an existing schema, visualising tables and their primary/foreign key relationships.**

---

*本 CodeGuide 對應 ITP4456 Database Applications — Laboratory 2: SQL Data Definition Language (DDL)，配合 MySQL + MySQL Workbench 實作。實測時：先 CREATE 後 ALTER、每步 DESC 驗證、刪外鍵記住兩步曲。*
