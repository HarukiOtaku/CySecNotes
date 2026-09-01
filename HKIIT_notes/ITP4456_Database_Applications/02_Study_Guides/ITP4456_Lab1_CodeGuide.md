# ITP4456 Lab 1 (v3.0) CodeGuide — Structured Query Language (SQL)

> 實務測驗主戰文件：只靠呢份文件，你就能由零開始完成成個 Lab，並應付 Practical Test / Lab Test 嘅 SQL 實作題。

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 本 Lab 要掌握嘅實務技能

1. 用資料庫客戶端（Database Client）連接 DBMS，並送出查詢（Send Queries）。
2. 用 SQL 指令處理資料庫操作，例如建立資料庫（`CREATE`）同插入資料（`INSERT`）。
3. 建立表格、插入記錄、查詢資料、過濾資料、刪除表格嘅完整流程。

> **Module ILO:** Perform database operations to implement data models and manipulate data in the applications.
>
> **Lesson ILO:** Use a database client to interface with the DBMS and send queries. Handle database operations using SQL commands (like CREATE and INSERT).

### 所需軟體／工具

| 工具 (Tool) | 用途 (Purpose) |
|---|---|
| **MySQL**（伺服器服務） | DBMS，實際儲存同管理資料庫；做任何嘢之前要先確認 MySQL service 正在執行 |
| **MySQL Workbench**（GUI 客戶端） | 圖形化資料庫客戶端，用嚟連接 MySQL、開 Query Tab、執行 SQL 指令 |
| **SCHEMAS panel**（左邊欄） | 顯示已建立嘅資料庫同表格，可用 `Refresh All` 更新 |
| **Output panel**（下方輸出面板） | 顯示執行結果；見到綠色剔號（green tick）即代表 SQL 執行成功 |

### 關鍵操作（必記）

- **Ctrl + Enter**（或按 Execute 按鈕）＝執行「目前選取／目前游標所在」嘅查詢。
- SQL 每句以分號 `;` 結尾。
- 喺 Query Tab 執行 SQL 之前，要確認自己「選取咗正確嗰句」，或者刪走已經執行過嘅舊查詢，避免執行錯句子。

---

## 🛠️ 解題步驟拆解 (Walkthrough)

> 分六大階段：A 連接設定 → B 建立資料庫 → C 建立表格 → D 插入資料 → E 查詢資料 → F 建立／刪除 STUDENT 表格。

### 階段 A：連接 MySQL 並開啟 Query Tab（Lab Task 1–2）

**題目原文 (Original Task):**
> 1. Following the instructions specific to your campus, create and connect to MySQL database with the given username and password. Make sure that MySQL service is running.
> 2. After login into the MySQL workbench, Click the Create a new SQL tab for executing queries button to create new Query tab. SQL statements are commands that request the DBMS to perform some operations.

**解法步驟：**

1 ➔ 啟動 MySQL 服務：確認 MySQL service 正在運行（例如喺 Windows Services 或者 MySQL 安裝程式入面啟用），如果服務未啟動，Workbench 會連唔到。
2 ➔ 打開 MySQL Workbench，用學校畀你嘅 username 同 password 建立連接並登入（Login）。
3 ➔ 登入之後，撳工具列嘅「Create a new SQL tab for executing queries」按鈕，開一個新嘅 Query Tab，之後所有 SQL 都喺呢度輸入同執行。

> **Key Point:** SQL statements are commands that request the DBMS to perform some operations. (SQL 語句就係命令 DBMS 做嘢嘅指令。)

---

### 階段 B：建立資料庫 HR（Lab Task 3–6）

#### Task 3 — 建立 HR 資料庫

**題目原文 (Original Task):**
> 3. Use the following SQL statement to create a new database. Use Ctrl + Enter or click the execute button to execute the current query.

**解法步驟：**

1 ➔ 喺 Query Tab 輸入下面指令。
2 ➔ 撳 **Ctrl + Enter** 或按 Execute 按鈕執行。
3 ➔ 睇 Output panel：出現**綠色剔號 (green tick)** 就代表執行成功。

```sql
CREATE DATABASE HR;
```

> **Key Point:** A green tick on the Output panel indicates the query has been executed successfully.

#### Task 4 — 檢查資料庫已建立

**題目原文 (Original Task):**
> 4. Right click the left panel and click Refresh All button. You should find the hr database which is just created.

**解法步驟：**

1 ➔ 喺左邊 SCHEMAS panel 撳右鍵。
2 ➔ 揀 **Refresh All** 更新面板。
3 ➔ 應該會見到啱啱建立嘅 `hr` 資料庫出現喺列表。

> **Key Point:** After executing CREATE DATABASE, refresh the SCHEMAS panel to see the new database.

#### Task 5 — 用 SQL 列出所有資料庫

**題目原文 (Original Task):**
> 5. Instead of checking the SCHEMAS panel, use the following query to list out all databases in the DBMS. Make sure you have selected the correct query you want to execute before clicking Ctrl + Enter. Or you may simply remove any executed query.

**解法步驟：**

1 ➔ 喺 Query Tab 輸入下面指令（唔使靠 SCHEMAS panel 都睇到全部資料庫）。
2 ➔ **先確認游標／選取範圍係喺呢句 SQL 上**，再撳 Ctrl + Enter（或者先刪走舊查詢，淨係留低要執行嗰句）。
3 ➔ 結果會列出 DBMS 入面所有 database，包括啱啱建立嘅 `hr`。

```sql
SHOW DATABASES;
```

> **Key Point:** SHOW DATABASES lists all databases in the DBMS — an alternative to checking the SCHEMAS panel.

#### Task 6 — 選用 HR 做預設資料庫

**題目原文 (Original Task):**
> 6. Use the USE command to select HR database as our default database.

**解法步驟：**

1 ➔ 輸入 `USE HR;`。
2 ➔ 執行後，之後所有 SQL 都會預設喺 `HR` 呢個 database 入面執行。
3 ➔ 如果漏咗呢步就直接 `CREATE TABLE`，MySQL 會出「No database selected」錯誤（見 Debug 表）。

```sql
USE HR;
```

> **Key Point:** The USE command selects a database as the default for subsequent queries.

---

### 階段 C：建立 EMPLOYEE 表格（Lab Task 7–9）

#### Task 7 — 建立 EMPLOYEE 表格

**題目原文 (Original Task):**
> 7. The following SQL statement is for creating the table EMPLOYEE. Enter the statement and before going on to the next line, make sure you have the line typed exactly.

**解法步驟：**

1 ➔ 逐行輸入下面 SQL，**每一行都要打啱**（欄位名、型別、逗號、括號都唔可以錯）。
2 ➔ 成段選取／確保游標喺成句 CREATE TABLE 上，先好執行。
3 ➔ 執行成功 → Output panel 出現綠色剔號。

```sql
CREATE TABLE EMPLOYEE (
  empid SMALLINT NOT NULL,
  lname VARCHAR(30)  NOT NULL,
  fname VARCHAR(30) NOT NULL,
  dob  DATETIME,
  salary DECIMAL,
  PRIMARY KEY (empid)
);
```

**結構拆解（考試必睇）：**

| 欄位 (Column) | 資料型別 (Type) | 約束 (Constraint) | 意思 |
|---|---|---|---|
| `empid` | `SMALLINT` | `NOT NULL` + `PRIMARY KEY` | 員工編號，細整數，唔可以空白，係主鍵 |
| `lname` | `VARCHAR(30)` | `NOT NULL` | 姓氏，最多 30 個字元，唔可以空白 |
| `fname` | `VARCHAR(30)` | `NOT NULL` | 名字，最多 30 個字元，唔可以空白 |
| `dob` | `DATETIME` | （冇約束） | 出生日期時間 |
| `salary` | `DECIMAL` | （冇約束） | 薪金，十進制數 |

> **Key Point:** PRIMARY KEY (empid) uniquely identifies each row; NOT NULL means the column cannot store NULL (missing) values.

#### Task 8 — 檢查表格建立成功

**題目原文 (Original Task):**
> 8. Use the following SQL statement to check if the table is created successfully.

**解法步驟：**

1 ➔ 輸入 `SHOW TABLES;`。
2 ➔ 執行後會列出目前 database（HR）入面所有表格。
3 ➔ 見到 `employee` 就代表表格建立成功。

```sql
SHOW TABLES;
```

> **Key Point:** SHOW TABLES lists all tables in the currently selected database.

#### Task 9 — 檢視表格結構

**題目原文 (Original Task):**
> 9. Use the following command to review the table structure.

**解法步驟：**

1 ➔ 輸入 `DESCRIBE EMPLOYEE;`（或簡寫 `DESC EMPLOYEE;`）。
2 ➔ 執行後會顯示表格結構：Field（欄位）、Type（型別）、Null（可否為空）、Key（鍵）、Default（預設值）、Extra（額外）。
3 ➔ 用嚟核對你建立嘅表格係咪同題目要求一致。

```sql
DESCRIBE EMPLOYEE;
-- 或
DESC EMPLOYEE;
```

> **Key Point:** DESCRIBE (or DESC) reviews the table structure — columns, data types, NULL rules and keys.

---

### 階段 D：插入資料（Lab Task 10–13）

#### Task 10 — 查詢空表格

**題目原文 (Original Task):**
> 10. The table has been created but no data record yet. The following SELECT statement will display all records in the table.

**解法步驟：**

1 ➔ 輸入 `SELECT * FROM EMPLOYEE;`。
2 ➔ 執行後會顯示表格所有記錄；而家未有資料，所以係空表（0 rows returned）。

```sql
SELECT * FROM EMPLOYEE;
```

> **Key Point:** SELECT * FROM table displays all records (all columns) in the table.

#### Task 11 — 插入五筆記錄

**題目原文 (Original Task):**
> 11. Use the following INSERT INTO statement to insert five records into the EMPLOYEE table.

**解法步驟：**

1 ➔ 逐句輸入下面五句 `INSERT`（每句插入一筆記錄）。
2 ➔ 注意 `VALUES` 入面嘅順序必須同表格欄位順序一致：`(empid, lname, fname, dob, salary)`。
3 ➔ 字串同日期要用**單引號 `' '`**包住；數字直接寫。

```sql
INSERT INTO EMPLOYEE VALUES (105, 'Lau', 'Andy', '1979-07-14', 32000);
INSERT INTO EMPLOYEE VALUES (247, 'Lai', 'Leon', '1978-02-02', 41000);
INSERT INTO EMPLOYEE VALUES (318, 'Cheung', 'Jacky', '1977-05-09', 38000);
INSERT INTO EMPLOYEE VALUES (404, 'Kwok', 'Aaron', '1979-03-01', 43000);
INSERT INTO EMPLOYEE VALUES (525, 'Mui', 'Anita', '1978-08-05', 36500);
```

> **Key Point:** INSERT INTO table VALUES (...) inserts a new record; the value order must match the column order, strings and dates are wrapped in single quotes.

#### Task 12 — 自寫 SQL 插入指定記錄（有答案）

**題目原文 (Original Task):**
> 12. Write a SQL statement to insert a record into EMPLOYEE table with values (empid = 111, lname = Chan, fname = Jacky, dob = '1954-08-03' and salary = 85000) .

**解法步驟：**

1 ➔ 按欄位順序 `empid, lname, fname, dob, salary` 填值。
2 ➔ 數字（`111`、`85000`）直接寫；字串（`Chan`、`Jacky`）同日期（`'1954-08-03'`）加單引號。
3 ➔ 執行後用 `SELECT * FROM EMPLOYEE;` 核對。

```sql
INSERT INTO Employee VALUES (111, 'Chan', 'Jacky', '1954-08-03', 85000);
```

> **Key Point (Model Answer):** `INSERT INTO Employee VALUES (111, 'Chan','Jacky','1954-08-03',85000);`

#### Task 13 — 插入你自己嘅記錄（測驗必考）

**題目原文 (Original Task):**
> 13. Write a SQL statement to insert a record into EMPLOYEE table with values employee ID = 999, replace_by_your_firstname, replace_by_your_lastname, replace_by_your_birthday, and salary = 3000).
>
> Hint: If you name is Chan Tai Man, and birthday is 2001-10-12, the SQL statement should be: `INSERT INTO Employee VALUES (999, 'Chan', 'Tai Man', '2001-10-12', 3000);`

**解法步驟：**

1 ➔ 填 `999` 做 employee ID。
2 ➔ 第二格填你嘅**姓氏（lname）**、第三格填你嘅**名字（fname）**——對照 Hint：`'Chan'`（姓氏）行先、`'Tai Man'`（名字）行後。
3 ➔ 第四格填你嘅生日 `'YYYY-MM-DD'`（要加單引號），最後 salary 填 `3000`。

```sql
INSERT INTO Employee VALUES (999, '你的姓氏', '你的名字', '你的出生日期', 3000);
-- 範例（假設叫 Chan Tai Man，生日 2001-10-12）：
INSERT INTO Employee VALUES (999, 'Chan', 'Tai Man', '2001-10-12', 3000);
```

> **Key Point:** Follow the column order (empid, lname, fname, dob, salary); put your surname in lname and given name in fname; wrap strings and dates in single quotes.

---

### 階段 E：查詢資料（Lab Task 14–17）

#### Task 14 — 顯示全部記錄

**題目原文 (Original Task):**
> 14. Use the following SQL statement to display all the records in the table.

**解法步驟：**

1 ➔ 輸入 `SELECT * FROM EMPLOYEE;`。
2 ➔ 執行後應該見到 Task 11–13 插入嘅全部記錄（而家有 7 筆：5 筆 + 111 + 999）。

```sql
SELECT * FROM EMPLOYEE;
```

#### Task 15 — 只顯示指定欄位

**題目原文 (Original Task):**
> 15. Use the following SQL statement to display all the employee's last name, first name and their salaries only.

**解法步驟：**

1 ➔ 喺 `SELECT` 後面列出想睇嘅欄位，用逗號分隔：`lname, fname, salary`。
2 ➔ 唔好寫 `*`，因為 `*` 會顯示全部欄位。
3 ➔ 執行後結果只會有三欄。

```sql
SELECT lname, fname, salary FROM EMPLOYEE;
```

> **Key Point:** Listing column names after SELECT displays only those columns, instead of all columns (*).

#### Task 16 — 用 WHERE 過濾記錄

**題目原文 (Original Task):**
> 16. Use the following SQL statement to display all the employees information with last name 'Lai'.

**解法步驟：**

1 ➔ 喺 `SELECT` 之後加 `WHERE lname = 'Lai'` 做條件。
2 ➔ 字串條件值要加單引號：`'Lai'`。
3 ➔ 執行後只會顯示 lname 等於 Lai 嘅記錄。

```sql
SELECT * FROM employee WHERE lname = 'Lai';
```

> **Key Point:** WHERE filters rows; string values in the condition must be enclosed in single quotes.

#### Task 17 — 自寫 SQL：條件 + 指定欄位（有答案）

**題目原文 (Original Task):**
> 17. Write a SQL statement to list the first name and birthday of employee with last name 'Cheung' .

**解法步驟：**

1 ➔ 要顯示嘅欄位：`fname`（first name）同 `dob`（birthday）→ 寫喺 `SELECT` 後面。
2 ➔ 過濾條件：`lname = 'Cheung'` → 寫喺 `WHERE` 後面。
3 ➔ 組合埋：`SELECT fname, dob FROM EMPLOYEE WHERE lname = 'Cheung';`

```sql
SELECT fname, dob FROM EMPLOYEE WHERE lname = 'Cheung';
```

> **Key Point (Model Answer):** `SELECT fname, dob FROM EMPLOYEE WHERE lname = 'Cheung';` — combine column selection with a WHERE filter.

---

### 階段 F：建立並刪除 STUDENT 表格（Lab Task 18–19）

#### Task 18 — 自寫 SQL 建立 STUDENT 表格（測驗必考）

**題目原文 (Original Task):**
> 18. Write a SQL statement to create a STUDENT table with the following 4 columns and primary key of stdID.

| Field | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| `std_id` | `INT` | NO | PRI | NULL | |
| `last_name` | `VARCHAR(20)` | NO | | NULL | |
| `first_name` | `VARCHAR(20)` | NO | | NULL | |
| `course` | `INT` | NO | | NULL | |

**解法步驟：**

1 ➔ 四個欄位照表輸入：`std_id INT`、`last_name VARCHAR(20)`、`first_name VARCHAR(20)`、`course INT`。
2 ➔ 四個欄位全部 `NOT NULL`（表入面 Null = NO）。
3 ➔ 最後加 `PRIMARY KEY (std_id)` 定義主鍵。

```sql
CREATE TABLE STUDENT (
  std_id INT NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  first_name VARCHAR(20) NOT NULL,
  course INT NOT NULL,
  PRIMARY KEY (std_id)
);
```

> **注意（Exam Trap）：** 題目文字寫「primary key of stdID」，但實際表格欄位名係 `std_id`（底線分隔）。做測驗時**以表格欄位名為準**，主鍵要寫 `PRIMARY KEY (std_id)`。
>
> **Key Point:** Translate a table specification into CREATE TABLE: each column = name + data type + constraints (NOT NULL), and end with PRIMARY KEY (column).

#### Task 19 — 刪除 STUDENT 表格

**題目原文 (Original Task):**
> 19. Use the following SQL statement to remove the STUDENT table.

**解法步驟：**

1 ➔ 輸入 `DROP TABLE STUDENT;`。
2 ➔ 執行後成個表格（連結構帶資料）會被刪除。
3 ➔ 用 `SHOW TABLES;` 確認 STUDENT 已經唔喺列表。

```sql
DROP TABLE STUDENT;
```

> **Key Point:** DROP TABLE removes the entire table (structure and data) permanently — it cannot be undone.

---

## 💻 關鍵 SQL/指令庫

> 全部語法直接抄得，中文註解幫你理解每部分做咩。

```sql
-- 建立資料庫：create a new database
CREATE DATABASE HR;

-- 列出 DBMS 內所有資料庫：list all databases
SHOW DATABASES;

-- 選用預設資料庫：select the default database
USE HR;

-- 建立表格：create a table with columns, types and constraints
CREATE TABLE EMPLOYEE (
  empid SMALLINT NOT NULL,          -- 員工編號，細整數，不可空白
  lname VARCHAR(30) NOT NULL,       -- 姓氏，可變長字串（最多 30 字），不可空白
  fname VARCHAR(30) NOT NULL,       -- 名字，可變長字串（最多 30 字），不可空白
  dob DATETIME,                     -- 出生日期時間
  salary DECIMAL,                   -- 薪金，十進制數
  PRIMARY KEY (empid)               -- 主鍵：唯一識別每一筆記錄
);

-- 列出目前資料庫所有表格：list all tables
SHOW TABLES;

-- 檢視表格結構：review the table structure
DESCRIBE EMPLOYEE;
DESC EMPLOYEE;                      -- 簡寫版，功能相同

-- 插入記錄：insert a record (值嘅順序要對應欄位順序)
INSERT INTO EMPLOYEE VALUES (105, 'Lau', 'Andy', '1979-07-14', 32000);

-- 顯示全部欄位、全部記錄：display all records
SELECT * FROM EMPLOYEE;

-- 只顯示指定欄位：display selected columns only
SELECT lname, fname, salary FROM EMPLOYEE;

-- 條件過濾：filter records with WHERE (字串值要加單引號)
SELECT * FROM employee WHERE lname = 'Lai';

-- 指定欄位 + 條件：select columns with a filter
SELECT fname, dob FROM EMPLOYEE WHERE lname = 'Cheung';

-- 刪除表格：remove a table permanently
DROP TABLE STUDENT;
```

```sql
-- 快速記憶表：SQL 關鍵字同用途
-- CREATE DATABASE / CREATE TABLE → 建立（DDL）
-- SHOW DATABASES / SHOW TABLES / DESCRIBE → 檢查（Metadata）
-- USE → 選資料庫
-- INSERT INTO ... VALUES → 加資料（DML）
-- SELECT ... FROM ... WHERE → 查資料（DML）
-- DROP TABLE → 刪除表格（DDL）
```

---

## 🐞 常見 Error 與 Debug

| Error Message（常見字眼） | 原因 (Cause) | Fix（解決方法） |
|---|---|---|
| `Can't connect to MySQL server` / `Error 2003` | MySQL service 未啟動／未運行 | 先啟動 MySQL service，再重新連接 |
| `Access denied for user '...'` / `Error 1045` | 用戶名或密碼錯誤 | 用學校提供嘅正確 username / password 重新登入 |
| `Error 1046: No database selected` | 漏咗執行 `USE HR;` | 先執行 `USE HR;` 再打其他 SQL |
| `Error 1064: You have an error in your SQL syntax` | 打錯字／漏咗分號 `;`／括號或逗號唔啱／冇選中正確嗰句 SQL | 逐行對照教材抄一次；確認成句以 `;` 結尾；執行前確保游標／選取範圍喺目標 SQL 上 |
| `Error 1007: Can't create database 'HR'; database exists` | 重複執行 `CREATE DATABASE HR;`，資料庫已經存在 | 用 `SHOW DATABASES;` 確認；建立前可以考慮 `DROP DATABASE`（要小心） |
| `Error 1050: Table 'EMPLOYEE' already exists` | 重複執行 `CREATE TABLE EMPLOYEE;`，表格已經存在 | 確認係咪真係想重建；可以先 `DROP TABLE EMPLOYEE;` 再 `CREATE` |
| `Error 1062: Duplicate entry '111' for key 'PRIMARY'` | 插入記錄時 empid 重複（主鍵唔可以重複） | 換一個未用過嘅 empid；主鍵必須唯一 |
| `Error 1048: Column 'lname' cannot be null` | `NOT NULL` 欄位冇畀值／畀咗 NULL | 確保 `NOT NULL` 欄位（empid、lname、fname）喺 VALUES 入面有值 |
| `Error 1292: Incorrect date value: '...'` | 日期格式唔啱 | 日期用 `'YYYY-MM-DD'` 格式並加單引號，例如 `'1979-07-14'` |
| `Error 1054: Unknown column '...'` | 欄位名打錯（串錯字／大小寫／用咗唔存在嘅欄位） | 用 `DESCRIBE EMPLOYEE;` 核對真實欄位名再改 |
| `Error 1146: Table 'HR.student' doesn't exist` | 表格未建立／名字打錯 | 用 `SHOW TABLES;` 確認表格存在同正確名稱 |
| 執行咗但冇效果／結果唔啱 | 執行咗舊嘅或冇選中嘅查詢（Query Tab 入面有多句 SQL） | 執行前檢查選取範圍；或者刪走已執行嘅舊查詢，淨係留低要執行嗰句（原 Lab Task 5 提示） |
| `SELECT * FROM EMPLOYEE;` 冇資料 | 未插入資料／插入咗去第二個 database | 確認執行咗 `USE HR;` 同 INSERT 語句；用 `SHOW TABLES;` 檢查 |

---

## 📝 測驗常見題型 (Common Test Questions)

### 題型 1：寫 SQL 建立資料庫同選用資料庫

- 必考：`CREATE DATABASE 名稱;` 同 `USE 名稱;`。
- 答題要點：
  - 每句結尾有分號 `;`。
  - `CREATE DATABASE` 只做一次；重複執行會出 Error 1007。

> **Key Point:** CREATE DATABASE makes a new database; USE switches the default database.

### 題型 2：寫 SQL 建立表格（俾你一張欄位表）

- 必考：`CREATE TABLE` + 資料型別 + `NOT NULL` + `PRIMARY KEY`（參考 Task 18）。
- 答題要點（一步步砌）：
  1. 每個欄位一行：`欄位名 型別 約束`，欄位之間用逗號。
  2. 表入面 Null = NO → 加 `NOT NULL`；Null = YES → 唔使加。
  3. Key = PRI 嗰個欄位 → 最後寫 `PRIMARY KEY (欄位名)`。
  4. 型別跟足題目：`INT`、`SMALLINT`、`VARCHAR(n)`、`DATETIME`、`DECIMAL`。
  5. 留意題目字面同欄位表嘅差異（例如「stdID」vs 實際 `std_id`）——以欄位表為準。

> **Key Point:** Each column = name + data type + constraints; the PK column must appear as PRIMARY KEY (column).

### 題型 3：寫 SQL 插入記錄

- 必考：`INSERT INTO 表格 VALUES (...);`。
- 答題要點：
  - VALUES 嘅數量同順序必須同表格欄位順序一致：`(empid, lname, fname, dob, salary)`。
  - 數字直接寫（`32000`）；字串同日期加單引號（`'Lau'`、`'1979-07-14'`）。
  - 日期格式 `YYYY-MM-DD`。
  - 主鍵值唔可以同現有記錄重複（Error 1062）。

> **Key Point:** Value order must match column order; numbers bare, strings and dates in single quotes.

### 題型 4：寫 SQL 查詢（指定欄位／過濾）

- 必考：`SELECT 欄位 FROM 表格 WHERE 條件;`。
- 答題要點：
  - 全部記錄全部欄位 → `SELECT * FROM ...;`
  - 淨係某啲欄位 → 喺 SELECT 後列出欄位名，逗號分隔。
  - 過濾 → `WHERE 欄位 = '值'`，字串值一定要單引號。
  - 題目講「list the first name and birthday of ... with last name 'Cheung'」→ 欄位行先，條件行後。

> **Key Point:** SELECT columns FROM table WHERE condition — columns first, filter second.

### 題型 5：刪除表格／檢查結構

- 必考：`DROP TABLE STUDENT;`、`SHOW TABLES;`、`DESCRIBE EMPLOYEE;`（或 `DESC`）。
- 答題要點：
  - `DROP TABLE` 會永久刪除結構＋資料，冇得還原。
  - `SHOW` / `DESCRIBE` 係檢查用（metadata），唔會改動資料。

> **Key Point:** DROP TABLE is permanent; SHOW TABLES and DESCRIBE are read-only checks.

### 測驗答題通用 checklist（交卷前對一次）

- [ ] 每句 SQL 以 `;` 結尾
- [ ] 字串／日期有單引號，數字冇
- [ ] VALUES 順序對應欄位順序
- [ ] 主鍵欄位冇漏 `PRIMARY KEY`；`NOT NULL` 冇漏
- [ ] 執行前喺 Query Tab 選中正確嗰句 SQL
- [ ] 完成後用 `SELECT * FROM 表格;` 驗證結果

---

## 🔗 理論 recap

- DBMS（Database Management System）係管理資料儲存嘅軟體；MySQL 就係一個 DBMS。
- SQL（Structured Query Language）係同關聯式資料庫溝通嘅標準語言，用指令叫 DBMS 做事。
- Database Client（例如 MySQL Workbench）係你同 DBMS 之間嘅介面：你喺度打 SQL，佢送去 DBMS 執行並顯示結果。
- SQL 分兩大類：DDL（Data Definition Language，定義結構：`CREATE`、`DROP`）同 DML（Data Manipulation Language，處理資料：`INSERT`、`SELECT`）。
- Primary Key（主鍵）唯一識別每一筆記錄，唔可以重複、唔可以 NULL。
- `NOT NULL` 約束表示該欄位一定要有值，唔可以留空。
- 常用資料型別：`SMALLINT`／`INT`（整數）、`VARCHAR(n)`（可變長字串，上限 n 字元）、`DATETIME`（日期時間）、`DECIMAL`（十進制數）。
- 查詢三步曲：`SELECT`（揀欄位）＋ `FROM`（邊張表）＋ `WHERE`（過濾條件）。

> **Core Definition:** SQL (Structured Query Language) is the standard language used to request operations from a relational DBMS; a database client such as MySQL Workbench is the interface that sends these queries to the DBMS.
