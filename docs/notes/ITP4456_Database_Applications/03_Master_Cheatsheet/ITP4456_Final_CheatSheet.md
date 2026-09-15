# ITP4456 Database Applications — Final Cheat Sheet（考前極速總複習）

> **覆蓋範圍**：Chapter 1–9（Database Systems 導論、Relational Data Model、Relational DDL、Relational DML Basic／Advanced、NoSQL Data Model、NoSQL Basic／Advanced DML、Database Design）＋ Lab 1–2（SQL 與 DDL 實作）
> **使用時機**：考試前 5–10 分鐘快速掃描；只保留「關鍵定義、對比表、SQL／MongoDB 語法、英文必背句」。
> 詳細解說請回查：`02_Study_Guides/` 內對應各章（Ch1–Ch9＋Lab 1–2）的 Study Guide。
## 速覽目錄

Part 1 Ch1 導論｜Part 2 Ch2 Relational Data Model｜Part 3 Ch3 Relational DDL｜Part 4 Ch4 Basic DML｜Part 5 Ch5 Advanced DML｜Part 6 Ch6 NoSQL Data Model｜Part 7 Ch7 NoSQL Basic DML｜Part 8 Ch8 NoSQL Advanced DML（Aggregation）｜Part 9 Ch9 Database Design｜Part 10 Lab 1–2｜SQL 指令速查（Lab／實作必備）｜英文極速記憶句｜最後 60 秒自測清單

---
## Part 1 — Ch1：Introduction to Database Systems（導論）

**1.1 三大定義（必背英文句）**

| 詞彙 | 一句話 | 英文關鍵句 |
|---|---|---|
| Data | 電腦可處理的事實 | "Meaningful facts, text, graphics, images, sound, video segments etc., processed by a computer." |
| Information | 經處理、對決策有用的資料 | "Data processed to be useful in decision making; information is interpreted data." |
| Database | 有組織的相關資料＋描述 | "An organized collection of logically related data, and a description of this data, designed to meet the information needs of an organization." |

**1.2 Metadata 三兄弟**：Metadata = 關於資料的資料（purpose、time/date、creator、location）；Schema = 資料庫結構（tables、views、routines）；Data Dictionary = 描述性 metadata 的儲存庫；CRUD = Create／Read／Update／Delete。

**1.3 File-based vs DBMS（必考對比）**

| 項目 | File-based | DBMS |
|---|---|---|
| Redundancy | 高（各自副本） | 低（primary fact 只記一次） |
| Consistency | 差（冗餘→不一致） | 好（消除冗餘） |
| Sharing | 難（各自檔案） | 易（集中共享） |
| Security | 弱（逐檔手動加密） | 強（Access Control、Encryption、Auditing、Backup/Recovery） |
| Independence | 無 | 有（metadata 與程式分離） |

- **DBMS 優點 8 項**：Minimal Data Redundancy、Improved Consistency、Enforcement of Standards、Increased Concurrency/Data Sharing、Program-Data Independence、Increased Productivity、Reduced Program Maintenance、Improved Backup and Recovery　**DBMS 缺點 5 項**：Complexity、Size、Cost（軟體／硬體／轉換／遷移）、Performance、Higher Impact of a Failure　**Program-Data Dependence**：每個程式各自管資料、各自寫 metadata 碼、各自寫 CRUD 程序；檔案結構一改 → 所有存取程式都要改。

**1.4 ANSI-SPARC 三層架構**：**External Level**（用戶 views）→ **Conceptual Level**（社群觀點）→ **Internal Level**（實體儲存）。目標：所有用戶存取同一資料；view 互不影響；用戶不需知物理儲存；概念／儲存結構變更不影響用戶 views。

**1.5 關聯模型七術語（Ch1 速記版；完整定義見 Part 2）**：Relation = Table；Attribute／Field = 具名 Column；Domain = 允許值集合；Tuple／Record = Row；Degree = attribute 數目；Cardinality = tuple 數目；Relationship = 表之間的邏輯連接。

**1.6 ACID（交易可靠性）**：**Atomicity**（原子：全做或全不做）／ **Consistency**（一致）／ **Isolation**（隔離：並行不干擾）／ **Durability**（持久：完成即保存）。

**1.7 NoSQL vs Relational（選擇考量）**

| 考量 | NoSQL | Relational |
|---|---|---|
| ACID | 不需要 | 必須 |
| 資料 | 動態、巢狀於少數 collections | 可預測、分佈多 tables |
| 寫入 | 快、寫入安全非關鍵 | 寫入安全是要求 |
| 擴展 | 水平＋垂直皆可 | 垂直可、水平難 |
| 效能 | 大量簡單讀寫極佳 | 每秒大量讀寫受限 |

- NoSQL 特點：非關聯、dynamic schema、JSON 非結構化資料、可選 `$jsonSchema` Validator；例子：MongoDB（NoSQL）vs MySQL、Oracle、SQL Server、PostgreSQL（Relational）。　Relational 缺點：horizontal scaling 難；改 schema 昂貴且常停機。
## Part 2 — Ch2：Data Model of Relational Database（關聯式資料模型）

**2.1 術語必背**

| 術語 | 定義（英文） | 中文 |
|---|---|---|
| Database | "A database is a logical structure of the data storage." | 資料儲存的邏輯結構 |
| Relation | "A relation is a table with columns and rows." | 一張表 |
| Tuple / Record | "A tuple/record is a row of a relation." | 一列 |
| Attribute / Field | "An attribute/field is a named column of a relation." | 具名一欄 |
| Domain | "A domain is the set of allowable values for one or more attributes." | 允許值集合 |
| Degree | "Degree is the number of attributes in a relation." | 欄數 |
| Cardinality | "Cardinality is the number of tuples in a relation." | 列數 |
| Relationship | "A relationship is a logical connection between tables established based on interaction among these tables." | 表間邏輯連接 |

- 實例：**Programme（Degree = 4, Cardinality = 3）**；**Student（Degree = 8, Cardinality = 4）**。口訣：見到表就先數欄（degree）、數列（cardinality）。　陷阱：**Relation = 一張表；Relationship = 表與表之間的連結**——兩者勿混淆。

**2.2 Relation 六大性質**：(1) relation 名稱在 relational schema 中唯一；(2) 每個 attribute 有獨立名稱；(3) 同一屬性的值全部來自同一 domain；(4) 每個 cell 只含一個 atomic（單一）值；(5) 每個 tuple 必須可被唯一識別；(6) 不允許重複的 tuple。反例：`Interest` 一格寫 "football, basketball" ✗（非原子，要拆兩列）；兩列完全相同 ✗；兩列同名同興趣但 `memberId` 不同 ✓（仍可唯一識別）。

**2.3 鍵的層級（由大收窄到最小）**

| 鍵 | 定義 | 例子／標示 |
|---|---|---|
| Superkey | "an attribute, or set of attributes, that uniquely identifies a tuple within a relation." | `stdNo`、`phone,email`、`stdNo+name`（可含冗餘） |
| Candidate Key | "a superkey such that no proper subset is a superkey — irreducibility." | `stdNo` ✓；`stdNo+name` ✗（可再約簡） |
| Primary Key | "the candidate key selected to identify tuples uniquely." | 畫**單底線** |
| Alternate Key | "candidate keys that are not selected to be the primary key." | `phone`、`email` |
| Composite Key | "a key that consists of more than one attribute." | `stdNo+name` |
| Foreign Key | "an attribute … that matches the candidate key (usually the primary key) of some (possibly the same) relation." | **虛線底線**；`Student.programme` → `Programme.pgmCode` |

- 重點：candidate key 與 foreign key **可以有不同屬性名稱**；外鍵可指向**同一 relation**（self-referencing）。　判別技巧：逐一檢查「去掉任一屬性後是否仍能唯一識別」——能，就不是 candidate key。

**2.4 Relational Integrity（完整性約束）**：總論 "A relational integrity constraint is a rule used to ensure accuracy and consistency of data in a relational database. The DBMS is responsible for enforcing the constraint rules and rejects all data that do not meet the integrity requirements."

| 類別 | 規則 | 陷阱／例子 |
|---|---|---|
| **Null** | "represents the absence of a value and is not the same as zero or spaces." | NULL ≠ 0 ≠ 空格 |
| **Entity Integrity** | primary key 必須 **unique + not null** | NULL 主鍵 ✗、重複 `IT114122` ✗ |
| **Referential Integrity** | 外鍵值要麼 match 父表（parent relation）candidate key，要麼 **wholly null** | `programme = 'IT010101'` 而父表無此值 → DBMS 拒絕 ✗ |
| **General Constraint** | 用戶／DBA 自訂規則（對應 SQL `CHECK`） | HD credit 250–400；學生年齡 ≥ 18 |

- **Parent Relation** = 被參照的表（Programme）；**Child Relation** = 含外鍵的表（Student）。

**2.5 Cascade vs Restrict（父鍵更新／刪除策略）**

| 情況 | 策略 | 效果 |
|---|---|---|
| Update 父鍵 | **Cascade Update** | 觸發所有相關子表外鍵一併更新（IT114122 → IT114130） |
| Update 父鍵 | **Restrict** | 有相關子記錄 → 禁止更新 |
| Delete 父鍵 | **Cascade Delete** | 相關外鍵**設為 NULL**，或**連帶刪除**相關子記錄 |
| Delete 父鍵 | **Restrict** | 有相關子記錄 → 禁止刪除 |

口訣：**Cascade = 連動處理；Restrict = 有相關記錄就禁止**。
## Part 3 — Ch3：Relational DDL（資料定義語言）

**3.1 SQL 基本事實**：1970 年代初由 **IBM** 開發，原名 **SEQUEL（Structured English Query Language）**；最新標準 **SQL:2019**；各廠商實作**互不相容**、未必完全跟標準。
- **Reserved words**（`CREATE`、`SELECT`、`WHERE`）：SQL 固定部分、串法必須正確、不可跨行拆開；**User-defined words**（`Staff`、`staffNo`）：表／欄／view 的名稱。　**大小寫**：大部分元件 case insensitive，**唯獨 literal character data（引號內字串）例外**。排版慣例：每個 clause 由新一行開始、各 clause 開頭對齊、clause 的多個部分縮排。

**3.2 Literals（字面值）三條規則**

| 類別 | 規則 | 正確 | 錯誤 |
|---|---|---|---|
| 非數值 | 必須用單／雙引號包住 | `'London'` | 彎引號、反引號 ✗ |
| 數值 | **不可**用引號 | `650.00` | `'650.00'` ✗ |
| 日期 | 屬非數值，必須加引號；格式 **year-month-day** | `"2020-06-17"` | `DD/MM/YYYY` ✗ |

**3.3 SQL 語法慣例符號（MySQL 文件）**：大寫字母 = reserved words；小寫字母 = user-defined words；`|` = 擇一；`[ ]` = 可選；curly braces（`{` 同 `}`）= 必須；`…` = 可選重複 0 次或多次。

**3.4 MySQL 資料型別速記**

| 類別 | 型別 | 必記關鍵 |
|---|---|---|
| 整數 | BIT、TINYINT、SMALLINT、MEDIUMINT、INT、BIGINT | 儲存 **1／2／3／4／8 bytes**；TINYINT signed −128~127、unsigned 0~255 |
| 小數 | `DECIMAL(M,D)`、`FLOAT(p)` | M = 總位數 **1–65**、D = 小數位 **1–30**；FLOAT(p)：**p 0–23 → 4-byte FLOAT；p 24–53 → 8-byte DOUBLE** |
| 日期時間 | DATE、DATETIME、TIMESTAMP、TIME、YEAR | **TIMESTAMP 上限 2038-01-19 03:14:07 UTC**（Year 2038 problem）；YEAR 範圍 **1901–2155** |
| 字串 | `CHAR(M)`、`VARCHAR(M)`、TEXT 系列、BLOB 系列 | **CHAR 固定長 0–255；VARCHAR 可變長 0–65,535**；TEXT 存文字、BLOB 存二進位（如檔案） |
| 列舉 | `ENUM('x-small','small',…)` | 值必須取自建表時明確列舉的清單，且必須是 quoted string literal |

**3.5 Ordering 個案研究：5 張表**：`Customer (customer_id, customer_name, customer_address, city, state, postal_code)`；`Employee (emp_id, lastname, firstname, title, salary)`；`Orders (order_id, order_date, customer_id, emp_id)` ← FK：customer_id、emp_id；`Product (product_id, product_name, product_finish, unit_price, on_hand, description)`；`Order_line (order_id, product_id, quantity)` ← 複合 PK (order_id, product_id)，兩欄皆 FK。關係：Customer 1:M Orders、Employee 1:M Orders；Orders 與 Product 之間 **M:N**，由 `Order_line` 作橋接表。

**3.6 DDL 要點**：`CREATE TABLE` **只建立結構，表中暫時沒有任何記錄**；括號內最後一項之後**不加逗號**；未寫 NULL 亦未寫 NOT NULL → **當作指定了 NULL 處理**（欄位可無值）；外鍵的資料型別必須與被參考欄位**相容（compatible）**，被參考欄位通常是對方的主鍵；`AUTO_INCREMENT` 自動產生主鍵值；`DEFAULT CURRENT_TIMESTAMP` 不輸入時自動填入目前時間戳；`DROP TABLE` / `DROP DATABASE` 是**不可回復**的破壞性操作（所有資料永久移除）。

**3.7 ALTER TABLE 六項**

| 可修改項目 | 語法 |
|---|---|
| 新增欄位 | `ALTER TABLE T ADD col VARCHAR(15);` |
| 修改型別／定義 | `ALTER TABLE T MODIFY col VARCHAR(50);` |
| 刪除欄位 | `ALTER TABLE T DROP col;` |
| 欄位改名 | `ALTER TABLE T RENAME COLUMN a TO b;` |
| 主鍵 | `ALTER TABLE T ADD PRIMARY KEY (col);` ／ `DROP PRIMARY KEY;` |
| 外鍵 | `ALTER TABLE T ADD CONSTRAINT f FOREIGN KEY (c) REFERENCES S (c);` ／ `DROP FOREIGN KEY f;` |

- 思考題：改結構後既有資料如何？加長 `VARCHAR(25)→VARCHAR(50)` 一般可保留；**收窄或改型別可能截斷或轉換失敗**。
## Part 4 — Ch4：Relational DML — Basic Data Manipulation

**4.1 CRUD 對應**：**Create** = `INSERT`；**Read** = `SELECT`；**Update** = `UPDATE`；**Delete** = `DELETE`。`SELECT` **唔會**改動資料庫任何資料。

**4.2 SELECT 語法骨架（子句次序唔可以更改）**
```sql
SELECT [DISTINCT | ALL] { * | [columnExpression [AS newName]] [,...] }
FROM   TableName [alias] [, ...]
[WHERE condition] [GROUP BY columnList [HAVING condition]] [ORDER BY columnList [ASC | DESC]];
```

- **只有 `SELECT` 與 `FROM` 是必須**，其餘全部可選；`*` = "all columns" 的縮寫；`DISTINCT` 消除結果中完全重複的值。

**4.3 WHERE 篩選條件速查**

| 條件類型 | 寫法 | 重點 |
|---|---|---|
| 比較 | `>` `>=` `<` `<=` `=` `<>`／`!=` | 字串值要加單引號 `'Beijing'` |
| 範圍 | `BETWEEN 10000 AND 20000` | **含兩端（inclusive）**；等價 `>= 10000 AND <= 20000`；否定版 `NOT BETWEEN` |
| 集合 | `IN ('Manager','Secretary')` | 等價一串 `OR`；否定版 `NOT IN` |
| 模糊 | `LIKE '%Drawer%'` | **`%` = 零個或以上任意字元；`_` = 剛好一個任意字元**；否定版 `NOT LIKE` |
| NULL | `description IS NULL` | `= NULL` 永遠唔成立；空字串亦 ≠ NULL；否定版 `IS NOT NULL` |

**4.4 運算、別名與排序**：計算只係顯示結果，**唔會真正更新表中記錄**；用 `AS` 建別名（`salary/12 AS monthly_salary`）。`ORDER BY` 放最尾；預設 **ASC（升序）**，`DESC` 降序；多欄排序**由左至右**優先：`ORDER BY title ASC, salary DESC`。

**4.5 日期函數（必背範圍）**：`DATE()` 抽出 date／datetime 的日期部分；`YEAR()` → **1000–9999**；`MONTH()` → **1–12**（Jan = 1）；`DAY()` → **1–31**。

**4.6 INSERT 三條規則（必考）**：(1) **columnList 可省略**——省略時 SQL 假設你按 **CREATE TABLE 時的原本欄位次序**提供所有欄位的值；(2) 省略的欄位必須在建表時宣告為 `NULL`，或設了 `DEFAULT`，否則插入失敗；(3) **dataValueList 必須 match columnList**——項目數量相同、**位置直接對應**、每個值的資料型別相容。

**4.7 UPDATE 與 DELETE**：`UPDATE T SET col1 = v1 [, col2 = v2] [WHERE cond];`——`SET` 指定要更新的欄位；**WHERE 可省略，省略時所有列都更新**。`DELETE FROM T [WHERE cond];`——**WHERE 可省略，省略時刪除所有列**（表結構仍保留）。考試陷阱：「**無 WHERE = 全表遭殃**」，題目常問「這條 SQL 影響幾多行？」
## Part 5 — Ch5：Relational DML — Advanced Data Manipulation

**5.1 五個聚合函數**：`COUNT(*)` 數所有列（不理會 NULL 或重複值）；`COUNT(DISTINCT col)` 數不重複的欄位值（同一 emp_id 三張單只數 1）；`SUM(col)` 總和、`AVG(col)` 平均（只適用數值欄位）；`MIN(col)` / `MAX(col)` 最小／最大（亦可應用於非數值欄位）。

**5.2 聚合函數四大規則（必背）**：(1) "COUNT(*) counts all rows of a table, regardless of whether nulls or duplicate values occur."；(2) **`DISTINCT` 對 `MIN`／`MAX` 沒有影響，對 `SUM`／`AVG` 可能有影響**；(3) **聚合函數只准出現在 `SELECT` 清單與 `HAVING` 子句**；(4) **地雷**：SELECT 清單含聚合函數而**沒有 `GROUP BY`**時，**不能引用其他（非聚合）欄位**——`SELECT SUM(salary) FROM employee;` ✓；`SELECT title, SUM(salary) FROM employee;` ✗。

**5.3 GROUP BY 與 HAVING**：`GROUP BY` 產生每個群組的**小計（sub-totals）**；SELECT 清單中的非聚合欄位**必須出現在 GROUP BY 中**。**`WHERE` 過濾個別列（分組前）；`HAVING` 過濾群組（分組後）**——聚合條件（如 `COUNT(emp_id) > 1`）**必須**放 `HAVING`；`HAVING` 中的欄位名必須同時出現在 `GROUP BY` 清單中，或包在聚合函數內。範例：`GROUP BY title HAVING COUNT(emp_id) > 1 ORDER BY title;`

**5.4 子句邏輯執行順序**：`FROM` → `WHERE`（過濾列）→ `GROUP BY`（分組）→ `HAVING`（過濾群組）→ `SELECT` → `ORDER BY`。書寫次序仍係 SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY。

**5.5 Join（連接）**：當**結果欄位來自多於一張表**時，**必須使用 join**（multi-tables query）。**Inner Join = Cartesian Product（笛卡兒積）＋帶條件的選擇**——把所有行互相配對，再刪除「無意義」的結果（只留連接欄位相等的配對）；連接條件通常是**外鍵 = 主鍵**。

- 兩種等價寫法——傳統逗號：`FROM orders, order_line WHERE orders.order_id = order_line.order_id`；ANSI：`FROM orders INNER JOIN order_line ON orders.order_id = order_line.order_id`。　**Table Alias**：`FROM orders O, order_line OL, product P`——別名與表名以**空格**分隔；欄位名有**歧義（ambiguity）**時用 `O.order_id` 限定。　三表 join = **兩個連接條件用 `AND`**：`WHERE orders.customer_id = customer.customer_id AND orders.emp_id = employee.emp_id`。　十月日期兩種等價寫法：`BETWEEN '01-OCT-12' AND '31-OCT-12'` ≡ `LIKE '%-OCT-12'`。

**5.6 UNION（縱向合併）**：**join 橫向拼欄位；UNION 縱向疊列**——把兩個或以上 `SELECT` 的結果集合併，並**自動移除重複列**。三大要求：**欄位數目相同**、**對應欄位資料型別相容**、**按位置（position）配對欄位，不看欄位名**。`ORDER BY` 只寫一次、放整個語句**最尾**。
## Part 6 — Ch6：Data Model of NoSQL Database

**6.1 NoSQL 四大類型（口訣 KDWG）**

| 類型 | 儲存結構 | 英文句 |
|---|---|---|
| Key-value database | 每項由 key 同 value 組成，**value 通常只能靠 key 攞返** | "the simplest type of NoSQL database in which each item contains keys and values" |
| Document database | 每份文件含多對 **field-value pairs**，值可為 string／number／boolean／array／object | "each document contains pairs of fields and values" |
| Wide-column store | tables、rows 同 **dynamic columns** | "data are stored in tables, rows, and dynamic columns" |
| Graph database | **nodes 同 edges** | "data are stored in nodes and edges" |

- 陷阱：key-value store 的 **key 唔係 relational 的 field**。

**6.2 Document Database 術語 vs RDBMS**

| RDBMS | Document Database (MongoDB) |
|---|---|
| Table | **Collection**—"a set of related data which is similar to a Table in RDBMS" |
| Row / Tuple | **Document**—"an instance of a Collection that **may not have the same schema**" |
| Column / Attribute | **Field**—"an attribute of a document" |
| Foreign Key + JOIN | **Embedded Document** 或 ID Referencing |
| 強制統一 schema | Documents may not have the same schema |

- **Relationship**："A logical connection between documents established based on interaction among these documents." 相關文件可放獨立 collection，或以 Embedded Document 同 collection 存放。

**6.3 JSON 與 BSON**：**JSON** = "a common lightweight data-interchange format that is completely language independent"，支援 numbers、strings、Boolean values。**Object** = "an unordered set of name/value pairs"（curly brackets）；**Array** = "an ordered list of values"（square brackets）。Name-value pair：欄位名後跟**冒號**；值可為雙引號字串、數字、`true`、`false`、`null`、object 或 array。**Array 項目唔一定要同一資料類型／schema**；JSON 支援無限層級 **nesting**。
- **BSON (Binary JSON)**：MongoDB 發明；binary structure **編碼 type 同 length 資訊**；MongoDB 內部（indexing、querying）同網絡傳輸都用 BSON。對比：JSON = 純文字／通用標準／只有資料本身；BSON = 二進制／MongoDB／額外 type + length。

**6.4 Primary Key / `_id`**：每份文件有一個 **global unique ID**，資料類型係 **ObjectId**；**冇提供 ID，系統會自動生成 `_id`**。

**6.5 文件關係建模三種方法（必考比較題）**

| 方法 | 做法 | 子文件要 ID 嗎 | 缺點 |
|---|---|---|---|
| 1. **Embedding** | 子文件內嵌喺父文件 | 唔使 | **collection 變大好大 + 額外寫入操作** |
| 2. **Child IDs in parent** | 子文件放獨立 collection，父文件儲存子文件 ID | 要 | **要額外查詢（MongoDB 冇 JOIN）** |
| 3. **Parent ID in child** | 子文件儲存父文件 ID（如 `programmeId`） | 要 | 由父查所有子仍要額外查詢 |

**6.6 BSON 類型編號必背**：「1 2 3 4 5，7 8 9 10 11，13，16 17 18 19；負一同百廿七」（6、12、14、15 冇編號）。

| Type | No. | Alias | Type | No. | Alias |
|---|---|---|---|---|---|
| Double | 1 | `"double"` | Date | 9 | `"date"` |
| String | **2** | `"string"` | Null | 10 | `"null"` |
| Object | **3** | `"object"` | 32-bit integer | **16** | `"int"` |
| Array | **4** | `"array"` | 64-bit integer | **18** | `"long"` |
| Binary data | 5 | `"bindata"` | Decimal128 | **19** | `"decimal"` |
| ObjectId | **7** | `"objectId"` | Min key | −1 | `"minKey"` |
| Boolean | **8** | `"bool"` | Max key | 127 | `"maxKey"` |

**6.7 Mongo Shell 包裝方法（回傳類型）**：`Date()` → 當前日期以**字串**形式；`new Date(...)` / `ISODate(...)` → **Date object**；`ObjectId()` → ObjectId；`NumberLong(...)` → Long（64-bit）；`NumberInt(...)` → Int（32-bit）；`NumberDecimal(...)` → Decimal（Decimal128）。陷阱：**`Date()` 回傳字串，`new Date()` 回傳 Date object**。
## Part 7 — Ch7：NoSQL — Basic Data Manipulation

**7.1 資料庫／集合層面**

| 操作 | 指令 | 回應 |
|---|---|---|
| 切換／建立資料庫 | `use Ordering`（或 `use("Ordering");`） | `switched to db Ordering`（**lazy creation**） |
| 明確建立空集合 | `db.createCollection('Customer');` | `{ ok : 1 }`（1 = True） |
| 刪除集合 | `db.Customer.drop();` | `true` |
| 刪除資料庫 | `use Ordering` 再 `db.dropDatabase();` | `{ ok: 1, dropped: 'Ordering' }` |

**7.2 `find()` 三個鐵律**：(1) **參數次序唔可以調轉**——第一個係 **Conditions**，第二個係 **Projection**；(2) **MongoDB 大小寫敏感**，連 collection name 同 field name 都分大小寫；(3) 條件同投影都用 **BSON 格式**；`findOne(...)` 只回傳第一份匹配文件；**冇匹配資料就冇回應（唔會報錯）**。

**7.3 條件運算子速查**

| 運算子 | 意思 | 例子（SQL 等價） |
|---|---|---|
| `{ field: value }` | 等值 | `WHERE title = "Sales"` |
| `$gt` / `$gte` / `$lt` / `$lte` | 大於／大於或等於／小於／小於或等於 | `{ salary: { $gt: 10000 } }` |
| 範圍 | 同欄位同時放 `$gte` + `$lte` | `{ $gte: 10000, $lte: 15000 }` ≡ `BETWEEN 10000 AND 15000` |
| `$eq` / `$ne` | 等於／不等於 | `{ title: { $ne: "Sales" } }` ≡ `title <> "Sales"` |
| `$in` / `$nin` | 屬於／唔屬於陣列集合 | `{ title: { $nin: ["Manager","Sales"] } }` ≡ `NOT IN` |
| 隱式 AND | 同一條件物件逗號分隔多欄 | `{ salary: { $gt: 10000 }, title: "Sales" }` |
| `$and` / `$or` | 陣列包住每個條件 | `{ $or: [ { ... }, { ... } ] }` |
| regex | 斜線包住，唔使引號 | `/Drawer/`≡`LIKE "%Drawer%"`、`/^L/`（開頭）、`/r$/`（結尾）、`/\w{2}a/`、`/\d Tian/` |
| `$exists` | 檢查欄位存唔存在 | `{ description: { $exists: false } }` |

- **陷阱**：`{ description: null }` 匹配「**冇欄位** 或 值係 null」；`{ $exists: false }` **只**匹配「完全冇該欄位」。　記憶：`$in` 專 for **同一欄位**多值；`$or` for **跨欄位**條件。`_id` 比對一定要寫 `ObjectId("5f34...")`，唔可以普通字串。

**7.4 Projection、Sort、Distinct**：`{ field: 1 }` 顯示、`{ field: 0 }` 隱藏；**`_id` 預設一定顯示**；**唯獨 `_id` 可以同 `1` 混用**（`{ _id: 0, emp_id: 1, firstname: 1 }`），其他欄位唔可以 1／0 混用。`.sort({ field: 1 })` 升序、`{ field: -1 }` 降序（鏈接在 `find()` 之後）。`db.Customer.distinct("postal_code")`——欄位名要用引號，回傳陣列。

**7.5 陣列查詢四招**

| 寫法 | 意思 |
|---|---|
| `{ tags: ["red","blank"] }` | **精確匹配**：元素同**次序**都要完全一樣 |
| `{ tags: { $all: ["red","blank"] } }` | 包含**晒**指定元素，次序不拘、可有額外元素 |
| `{ tags: "red" }` | 陣列**包含**該單一元素 |
| `{ "tags": { $size: 3 } }` | 陣列**剛好** 3 個元素（**只接受整數，唔接受範圍**） |

**7.6 嵌入式文件／陣列查詢**：**dot notation** `{ "order_line.quantity": 2 }`——**內嵌欄位名一定要用引號包住**；只要訂單有「至少一個」quantity=2 的明細就算匹配。**`$elemMatch`** 要求**同一個陣列元素**同時滿足所有條件：`{ results: { $elemMatch: { $gte: 80, $lt: 85 } } }`；內嵌文件版本 `{ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }`。dot notation 做唔到「同一元素」呢樣嘢。

**7.7 寫入操作**

| 操作 | 指令 | 回應重點 |
|---|---|---|
| 插入一份 | `db.Product.insertOne({ ... });` | `{ acknowledged: 1, insertedId: ObjectId(...) }`；省略 `_id` 會自動生成 |
| 插入多份 | `db.Product.insertMany([ ... ]);` | `insertedIds: { '0': ..., '1': ... }` |
| 重複 `_id` | 插入失敗 | **E11000 duplicate key error**（`_id` 必須唯一） |
| 刪除 | `db.Product.deleteMany({ });` / `db.Employee.deleteOne({ ... });` | `deletedCount`；空條件 `{}` = 全部 |
| 更新 | `db.Employee.updateMany({ cond }, { $ops... });` / `updateOne` | `matchedCount` / `modifiedCount` / `upsertedCount`；**更新時 `insertedId` 係 null** |

- 五個 update 運算子：`$set` 設定（覆寫）欄位值（`{ $set: { salary: 10000000 } }`）；`$inc` 基於現有值加減（`{ $inc: { salary: 3000 } }` ≡ `SET salary = salary + 3000`）；`$mul` 基於現有值乘（`{ $mul: { salary: 1.05 } }`，即 +5%）；`$rename` 欄位改名（≡ `RENAME COLUMN`）；`$unset` 刪除欄位（`{ $unset: { "address": "" } }` ≡ `DROP COLUMN`）。
## Part 8 — Ch8：NoSQL — Advanced Data Manipulation（Aggregation Pipeline）

**8.1 三條必背定義**：**Aggregation** = "Collection and summary of data."；**Aggregation Pipeline** = "A way to filter, sort, group, reshape, and analyze data **without changing any data in your collection**."；**Stage** = "One of the built-in methods that can be completed on the data, **but does not permanently alter it**."——**stages are executed in order，上一個 stage 的輸出係下一個 stage 的輸入**。

**8.2 SQL ↔ MongoDB Aggregation 對照（必背）**

| SQL | MongoDB Aggregation |
|---|---|
| `WHERE condition` | `{ $match: { condition } }` |
| `GROUP BY field` | `{ $group: { _id: "$field", ... } }` |
| `HAVING`（過濾群組） | **`$group` 之後**的 `{ $match: { ... } }` |
| `SUM(col)` / `COUNT(*)` | `{ $sum: "$col" }` / `{ $sum: 1 }` |
| `AVG` / `MAX` / `MIN` | `{ $avg: "$col" }` / `{ $max: ... }` / `{ $min: ... }` |
| `SELECT col1, col2` | `{ $project: { col1: 1, col2: 1 } }` |
| `LIKE "%Ash%"` | 正則表達式 `/Ash/` |
| `LEFT OUTER JOIN` | `{ $lookup: { from, localField, foreignField, as } }` |
| 全表一組 | `{ $group: { _id: null, ... } }` |

**8.3 `$match` 與計數**：`$match` = SQL `WHERE`；三種等價寫法：`db.Employee.find({ title: "Sales" })` ≡ `db.Employee.aggregate({ $match: { title: "Sales" } })` ≡ `db.Employee.aggregate([ { $match: { title: "Sales" } } ])`。計數：`db.Employee.find({ salary: { $gt: 10000 } }).count();` ≡ `db.Employee.count({ salary: { $gt: 10000 } });`（結果 4）。

**8.4 `$group` 兩種 `_id` 寫法**：`_id: null` 把整個集合當作**一個群組**（`{ $group: { _id: null, Total: { $sum: "$unit_price" } } }` → `Total: NumberDecimal("4075")`）；`_id: "$field"` 按該欄位的**每個不同值**分組（`{ $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } } }`）。同一個 `$group` 可同時輸出多個統計欄位（Count／Sum／Average／Max／Min）——Product 共 9 份、總額 4075、平均 ≈452.777…、Max 800、Min 175。記憶：`_id: null` 的 `null` 是**值**；`_id: "$field"` 的 `"$field"` 是**字串**（引用欄位值）。

**8.5 兩大地雷**：(1) **`$match` 的位置**——`$group` **之前**的 `$match` **只可以引用原始欄位**（等於 `WHERE`）；要篩選聚合出來的新欄位（如 `Total`），**第二個 `$match` 必須放在 `$group` 之後**（等於 `HAVING`），放錯位置 → **沒有輸出**；(2) **內嵌文件唔可以直接 `$group`**——`order_line` 是陣列、唔係單一值，**必須先用 `$project` 攤平／計算**（`{ $project: { total: { $sum: "$order_line.quantity" } } }`）才可以 `$group`。

**8.6 `$project` 與 `$lookup`**：`$project` 重塑文件（選輸出欄位、計算新欄位）；`{ $project: { _id: 0 } }` 移除 `_id`。完整範例：`{ $project: { total: { $sum: "$order_line.quantity" } } }` → `{ $group: { _id: null, total: { $sum: "$total" } } }` → `{ $project: { _id: 0 } }`，結果 `[ { total: 45 } ]`。**`$lookup` 四要素**：`from`（目標集合）、`localField`（目前集合的外鍵欄位）、`foreignField`（目標集合的主鍵，通常 `_id`）、`as`（輸出陣列欄位名）。**`$lookup` 的結果一定係陣列**（即使只對應一份文件都會包成 `[ { ... } ]`）；一個管道可以做多個 `$lookup`（雙 join）；`localField` 可以指向內嵌陣列（`order_line.product`）。
## Part 9 — Ch9：Database Design（資料庫設計）

**9.1 兩大設計技術**

| 技術 | 方向 | 用途 |
|---|---|---|
| **E-R Modeling** | **Top-down（由上而下）** | 定義 Entity / Attribute / Relationship / Constraint，畫 ERD，再轉成 RDB schema |
| **Normalization** | 分析式（by analysis） | 以 Primary Key 與 Functional Dependency 分析關聯，消除冗餘與異常 |

**9.2 ERD 三元素判別法**

| 元素 | 定義 | 找法 | 唔應該做 |
|---|---|---|---|
| **Entity** | "an object that will have many instances in the database, an object that will be composed of multiple attributes, and an object that we are trying to model." | **Look for nouns** | ❌ DB 系統的使用者、❌ DB 的輸出（如 report）；專有名詞通常唔係好候選 |
| **Attribute** | "a property or characteristic of an entity." | **Look for descriptive words** | ❌ 衍生資訊（derived information，如 age、total of the invoice、number of failed students） |
| **Relationship** | "a linkage between two entities. It corresponds to a primary key – foreign key (PK–FK) pair." | **Look for verb or verb phrases** | ❌ 冇直接關係的實體唔好硬連 |

- 對應：**Entity → Table；Attribute → Field；Relationship → PK–FK pair**。

**9.3 Multiplicity——必考口訣**：**Cardinality = 最大（Max）**，只有 **one** 或 **many** 兩個可能值；**Participation = 最小（Min）**，只有 **zero** 或 **one** 兩個可能值。**Mandatory relationship** = 所有實例都參與（最少一個）；**Optional relationship** = 只有部分實例參與（可以係零）。Crow's Foot 積木：**直線 = one（一）｜圓圈 = zero（零）｜烏鴉腳 = many（多）**。
- 例句（Customer ⇄ Orders）：左到右 "a customer places many orders"；右到左 "an order is placed by one customer"。　例句（Employee ⇄ Orders）：左到右 "an employee can manage zero or more orders"；右到左 "an order must be managed by one and only one employee"。

**9.4 M:N 轉換與 ERD → Schema**：**"A many-to-many (M:N) relationship cannot be implemented in a relational database; it should be transformed into two one-to-many (1:M) relationships."** 中間表主鍵兩種方案：(1) **Composite Primary Key**（兩個外鍵組成，如 `(order_id, product_id)`）；(2) **Create a new key**（如 `order_line_id`）。**"To implement a relationship, add a foreign key into the child table."**——1:M 中「多」的一方係 child；M:N 中中間表係 child。

**9.5 Well-structured Relation 與三種 Update Anomalies**："A well-structured relation is a relation that contains a minimum amount of redundancy and allows users to insert, delete, and modify rows of the table without errors or inconsistencies."

| Anomaly | 定義 | 教材例子 |
|---|---|---|
| **Insertion Anomaly** | "inserting a new tuple requires duplicated data to be included; if the duplicated data are not identical, the data will become inconsistent." | 插入修讀 IT114104 的學生，programme name 必須與其他 tuple 完全一致 |
| **Deletion Anomaly** | "deleting a tuple may cause a loss of other data that is essential." | 刪學生 170147471 → 連課程詳細資料都一齊遺失 |
| **Modification Anomaly** | "changing duplicated data requires the change to be carried out on ALL related tuples." | IT114105 改名 → **所有相關 tuple** 都要改 |

- 解決：把重複資料抽出獨立存放（如 Programme relation），原表只保留 FK。

**9.6 Normalization：UNF → 1NF → 2NF → 3NF（重頭戲）**：**Normal Forms 共 8 級**——UNF, 1NF, 2NF, 3NF, BCNF, 4NF, 5NF, 6NF；BCNF = "a stronger definition of 3NF"。**"Proceeding up to 3NF is adequate in most cases."**（必考短答）

| 階段 | 定義 | 移除什麼 |
|---|---|---|
| **UNF** | "a table that may contain one or more repeating groups." | — |
| **1NF** | "each cell contains one and only one value — no repeating group, no multi-valued attributes, every attribute value is atomic." | **Remove repeating group** |
| **2NF** | "in 1NF and every non-primary key attribute is **fully functionally dependent on the entire primary key**."（只有複合主鍵的關聯才會有 partial dependency） | **Remove partial dependency** |
| **3NF** | "in 2NF and **no non-primary key attribute is transitively dependent on the primary key**." | **Remove transitive dependency** |

- **Full functional dependency** = 非鍵屬性依賴**整個鍵**；**Partial dependency** = 非鍵屬性只依賴**鍵的一部分**（`itemNo → description, unitPrice`）。　**Transitive dependency**：R(X, Y, Z) 中 `X → Y → Z`，Y、Z 都係非鍵屬性 → `Y → Z` 就係遞移相依。3NF 分解後**原關聯中的父屬性變成外鍵**。

Invoice 全流程（一頁默寫）：
```text
UNF:  Invoice ( invNo, invDate, custID, custName, custContact, itemNo, description, unitPrice, qty )
      │ 拆 repeating group（itemNo…qty 隨發票重複）
1NF:  Invoice ( invNo, invDate, custID, custName, custContact ) ＋ InvoiceItem ( invNo, itemNo, description, unitPrice, qty )   ← invNo = FK
      │ 拆 partial dependency（itemNo → description, unitPrice）
2NF:  ＋ Item ( itemNo, description, unitPrice )；InvoiceItem 剩 ( invNo, itemNo, qty )   ← invNo, itemNo → qty
      │ 拆 transitive dependency（invNo → custID → custName, custContact）
3NF:  Invoice 剩 ( invNo, invDate, custID )（custID = FK）＋ Customer ( custID, custName, custContact )
```
## Part 10 — Lab 1–2（實作精華）

**10.1 Lab 1：SQL 基礎（MySQL Workbench）**：工具 = **MySQL**（DBMS 服務，先確認正在執行）、**MySQL Workbench**（GUI client）、**SCHEMAS panel**（Refresh All 更新）、**Output panel**（**綠色剔號 = 執行成功**）。**Ctrl + Enter**（或 Execute 按鈕）= 執行「目前選取／游標所在」的查詢；每句以 `;` 結尾；執行前要確認選中正確嗰句。
- 六大階段：A 連接設定 → B `CREATE DATABASE HR;` / `SHOW DATABASES;` / `USE HR;` → C `CREATE TABLE EMPLOYEE` → D `INSERT` 五筆記錄 → E `SELECT` 查詢 → F 建立／`DROP TABLE STUDENT;`。　**EMPLOYEE 結構**：`empid SMALLINT NOT NULL`（PK）、`lname VARCHAR(30) NOT NULL`、`fname VARCHAR(30) NOT NULL`、`dob DATETIME`、`salary DECIMAL`。插入時 VALUES 順序必須對應欄位順序；**字串同日期用單引號，數字直接寫**；日期格式 `YYYY-MM-DD`。　檢查用指令：`SHOW DATABASES;`、`SHOW TABLES;`、`DESCRIBE EMPLOYEE;`（簡寫 `DESC`）——全部係 read-only metadata 檢查。　常見題型：寫 SQL 建資料庫／選資料庫、俾欄位表寫 `CREATE TABLE`（Null = NO → `NOT NULL`；Key = PRI → `PRIMARY KEY (欄位)`）、`INSERT`、`SELECT ... WHERE`、`DROP TABLE`。**Exam Trap**：題目文字寫「primary key of stdID」，但欄位表實際係 `std_id`——**以表格欄位名為準**。

**10.2 Lab 2：SQL DDL（建立與修改結構）**：`CREATE DATABASE PRODUCT;` + `USE PRODUCT;`，再建 **ITEM、COLOR、INVENTORY** 三張表。**建表順序鐵律**：有外鍵的**子表必須在父表之後**建立（先 ITEM、COLOR，後 INVENTORY）；**刪表相反**，要**先刪子表外鍵**再刪父表。PRI = primary key；**MUL = non-unique index，通常是 foreign key 欄位**。
- Challenge Exercise：`StudentProgram` 資料庫（STUDENT、PROGRAM）——**PROGRAM 建表時故意唔設主鍵、STUDENT 故意唔設外鍵**，逼你用 `ALTER TABLE ... ADD PRIMARY KEY` 同 `ADD CONSTRAINT ... FOREIGN KEY` 後加。　**Reverse Engineer 出 ERD**：MySQL Workbench → Database → Reverse Engineer → 揀資料庫 → Execute → Finish → File → Export → **Export as PNG** → `product.png` → 交上 Moodle。

**10.3 Lab 常見 Error 速查**

| Error | 原因 | Fix |
|---|---|---|
| `Error 1046: No database selected` | 漏咗 `USE HR;` | 先 `USE` 再打其他 SQL |
| `Error 1007: database exists` | 重複 `CREATE DATABASE` | 用 `SHOW DATABASES;` 確認 |
| `Error 1050: Table already exists` | 重複 `CREATE TABLE` | 先 `DROP TABLE` 再 `CREATE` |
| `Error 1062: Duplicate entry for key 'PRIMARY'` | 主鍵值重複 | 換一個未用過的值 |
| `Error 1048: Column cannot be null` | `NOT NULL` 欄位冇畀值 | VALUES 要有值 |
| `Error 1292: Incorrect date value` | 日期格式唔啱 | 用 `'YYYY-MM-DD'` 加單引號 |
| `Error 1054: Unknown column` | 欄位名串錯 | 用 `DESC` 核對欄位名 |
| `ERROR 3730: Cannot drop table referenced by a foreign key` | 仲有外鍵參考緊佢 | 先 `DROP FOREIGN KEY` + `DROP INDEX` 再 `DROP TABLE` |
| `ERROR 1215: Cannot add foreign key constraint` | 型別／定義唔一致，或父表未建／冇 PK | 確認型別相容、父表已建且有 PK |
| `ERROR 1406: Data too long for column` | 超過 `VARCHAR(n)` 長度 | 加大長度或改用 `TEXT` |
| `ERROR 1366: Incorrect value for ENUM` | 值唔係 `'M'`／`'W'`／`'C'` | 只輸入列舉清單內的值 |
| 執行咗但結果唔啱 | Query Tab 有多句 SQL，執行咗舊查詢 | 執行前檢查選取範圍 |

- **Lab 答題五重點**：(1) 子表一定要在父表之後建立；(2) `MODIFY` 一定要連型別一齊寫；(3) 刪外鍵需要**準確的約束名**（用 `SHOW KEYS FROM` 查）；(4) 父表仍被外鍵參考時唔可以 `DROP`；(5) 每個改動都用 `DESC` / `SHOW KEYS FROM` 驗證。

---
## SQL 指令速查（Lab／實作必備）

**A. 資料庫與檢查指令**

| 目的 | 語法 |
|---|---|
| 建立資料庫 | `CREATE DATABASE ordering;`（或 `CREATE SCHEMA ordering;`） |
| 選用預設資料庫 | `USE ordering;` |
| 列出所有資料庫 | `SHOW DATABASES;` |
| 列出目前資料庫所有表 | `SHOW TABLES;` |
| 檢視表格結構 | `DESCRIBE EMPLOYEE;` 或 `DESC EMPLOYEE;` |
| 顯示完整建表 SQL | `SHOW CREATE TABLE ITEM;` |
| 列出表的所有鍵 | `SHOW KEYS FROM INVENTORY;` |
| 刪除資料庫 | `DROP DATABASE ordering;`（所有資料永久移除） |

**B. CREATE TABLE 與約束**

| 元素 | 寫法 |
|---|---|
| 欄位基本格式 | `column_name data_type [NOT NULL | NULL]`（未寫 = 當作 NULL） |
| 主鍵／複合主鍵 | `PRIMARY KEY (order_id);` ／ `PRIMARY KEY (order_id, product_id);` |
| 具名外鍵 | `CONSTRAINT fk_name FOREIGN KEY (col) REFERENCES T (col)` |
| 自動遞增主鍵 | `order_id SMALLINT NOT NULL AUTO_INCREMENT,` |
| 預設時間戳 | `order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,` |
| 列舉限制 | `category ENUM('M','W','C') NOT NULL,` |
```sql
-- 完整示範（Lab 2：子表必須在父表之後建立）
CREATE TABLE INVENTORY (
    invID     INT NOT NULL AUTO_INCREMENT,
    itemID    MEDIUMINT NOT NULL,
    colorID   TINYINT NOT NULL,
    currPrice DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (invID),
    FOREIGN KEY (itemID)  REFERENCES ITEM(itemID),
    FOREIGN KEY (colorID) REFERENCES COLOR(colorID)
);
```

**C. ALTER TABLE 與 DROP**

| 目的 | 語法 |
|---|---|
| 加欄位／連 NOT NULL | `ALTER TABLE ITEM ADD unitPrice DECIMAL(5,2);` ／ `ALTER TABLE STUDENT ADD address VARCHAR(100) NOT NULL;` |
| 改型別／改為 NOT NULL | `ALTER TABLE ITEM MODIFY unitPrice DECIMAL(6,2);` ／ `MODIFY duration TINYINT NOT NULL;` |
| 刪欄位 | `ALTER TABLE INVENTORY DROP COLUMN des;`（`COLUMN` 可省略） |
| 欄位改名 | `ALTER TABLE INVENTORY RENAME COLUMN qoh TO qty;`（8.0+）／ `ALTER TABLE INVENTORY CHANGE qoh qty MEDIUMINT NOT NULL;`（舊版，必須連型別） |
| 後加／刪主鍵 | `ALTER TABLE PROGRAM ADD PRIMARY KEY (programCode);` ／ `DROP PRIMARY KEY;` |
| 後加具名外鍵 | `ALTER TABLE STUDENT ADD CONSTRAINT programCode_fk FOREIGN KEY (program) REFERENCES PROGRAM(programCode);` |
| 刪外鍵（兩步曲） | `ALTER TABLE INVENTORY DROP FOREIGN KEY inventory_ibfk_2;` 然後 `ALTER TABLE INVENTORY DROP INDEX colorID;` |
| 表改名／刪表 | `RENAME TABLE test TO temp;` ／ `ALTER TABLE test RENAME temp;` ／ `DROP TABLE emp;`（結構＋資料永久移除） |

**D. DML：INSERT / UPDATE / DELETE / SELECT**
```sql
-- INSERT：省略 columnList = 依 CREATE TABLE 次序俾晒所有欄位；省略欄位須 NULL 或有 DEFAULT
INSERT INTO customer VALUES (21, 'Awesome Furniture', '110 Queens Road', 'Hong Kong', 'GD', 999077);
INSERT INTO customer (customer_id, customer_name) VALUES (21, 'Awesome Furniture');

-- UPDATE：無 WHERE = 全表更新；DELETE：無 WHERE = 刪除全表所有列（結構保留）
UPDATE employee SET salary = salary * 1.05 WHERE title = 'Manager';
DELETE FROM product WHERE product_id = 8;

-- SELECT + WHERE + ORDER BY
SELECT [DISTINCT] col1, salary/12 AS monthly_salary
FROM   employee
WHERE  salary BETWEEN 10000 AND 20000        -- 範圍（含兩端）
  AND  title IN ('Manager', 'Secretary')     -- 集合
  AND  product_name LIKE '%Drawer%'          -- 模糊（% 任意長度、_ 單字元）
  AND  description IS NULL                   -- NULL 測試（唔用 = NULL）
ORDER BY title ASC, salary DESC;             -- 多欄排序，左至右優先
```
- 日期函數：`DATE()` 抽日期部分；`YEAR()` 1000–9999；`MONTH()` 1–12；`DAY()` 1–31。

**E. 聚合、分組與多表查詢**
```sql
-- 聚合 + GROUP BY + HAVING + ORDER BY（WHERE 過濾列、HAVING 過濾群組）
SELECT title, COUNT(emp_id) AS count, SUM(salary) AS sum
FROM   employee
GROUP BY title
HAVING COUNT(emp_id) > 1
ORDER BY title;

-- INNER JOIN（ANSI 寫法）／傳統逗號寫法（等價）
SELECT * FROM orders INNER JOIN order_line ON orders.order_id = order_line.order_id;

-- 三表 join（兩個條件用 AND）+ 別名
SELECT OL.product_id, quantity, product_name
FROM   orders O, order_line OL, product P
WHERE  O.order_id = OL.order_id AND OL.product_id = P.product_id
  AND  order_date LIKE '%-OCT-12';

-- UNION：縱向合併、自動去重；ORDER BY 只寫一次放最尾
SELECT order_id, order_date, customer_id, total_amount FROM Current_Order
UNION
SELECT order_id, order_date, customer_id, total_amount FROM Archived_Order
ORDER BY order_date DESC;
```
- 聚合函數：`COUNT(*)`／`COUNT(DISTINCT col)`／`SUM`／`MIN`／`MAX`／`AVG`；只准出現於 `SELECT` 清單與 `HAVING`。　（subquery 子查詢：**源頭筆記未提及**，不在本課程筆記範圍之內。）

**F. MongoDB／NoSQL 基本操作**
```javascript
use Ordering;                                               // 切換／建立資料庫（lazy creation）
db.createCollection('Customer');                            // 建立空集合 → { ok: 1 }
db.Customer.drop();                                         // 刪集合 → true
db.dropDatabase();                                          // 刪資料庫
db.Employee.find();                                         // 全部文件（等同 find({})）
db.Employee.find({ salary: { $gt: 10000 } });               // $gt $gte $lt $lte
db.Employee.find({ salary: { $gte: 10000, $lte: 15000 } }); // 範圍（同欄位）
db.Employee.find({ title: { $nin: ["Manager","Sales"] } }); // $eq $ne $in $nin
db.Employee.find({ $or: [ { salary: { $lte: 10000 } }, { title: "Manager" } ] });
db.Employee.find({ lastname: /^L/ });                       // regex（/Drawer/、/r$/）
db.Employee.find({}, { _id: 0, emp_id: 1, firstname: 1 });  // projection：1 顯示、0 隱藏
db.Employee.find({}).sort({ firstname: -1 });               // 排序：-1 降、1 升
db.Customer.distinct("postal_code");                        // 去重 → 陣列
db.inventory.find({ tags: { $all: ["red", "blank"] } });    // 陣列：$all／$size／單元素
db.Orders.find({ "order_line.quantity": 2 });               // dot notation（欄位要引號）
db.score.find({ results: { $elemMatch: { $gte: 80, $lt: 85 } } });   // 同一元素滿足全部條件
db.Product.insertOne({ "product_name": "End Table", "unit_price": NumberDecimal("175") });
db.Product.insertMany([ { ... }, { ... } ]);
db.Product.deleteMany({ });                                 // 刪全部（deleteOne 只刪第一份）
db.Employee.updateMany({}, { $inc: { salary: 3000 } });     // $set $inc $mul $rename $unset
db.Customer.updateOne({ postal_code: 999077 }, { $set: { state: "new state" } });
```

**G. MongoDB 聚合管道（aggregate）**
```javascript
db.Employee.aggregate({ $match: { title: "Sales" } });       // = SQL WHERE
db.Employee.find({ salary: { $gt: 10000 } }).count();        // 計數（= count(...) 寫法）
db.Product.aggregate({ $group: { _id: null, Count: { $sum: 1 }, Total: { $sum: "$unit_price" } } });
db.Product.aggregate({ $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } } });

// WHERE → GROUP BY → HAVING 三段管道（$match 位置係地雷：之後 = HAVING）
db.Product.aggregate([
  { $match: { product_finish: /Ash/ } },
  { $group: { _id: "$product_finish", Total: { $sum: "$unit_price" } } },
  { $match: { Total: { $gt: 1000 } } }
]);

// 內嵌文件：先 $project 攤平，再 $group；最後隱藏 _id
db.Orders.aggregate([
  { $project: { total: { $sum: "$order_line.quantity" } } },
  { $group: { _id: null, total: { $sum: "$total" } } },
  { $project: { _id: 0 } }
]);

// 跨集合查詢：$lookup（LEFT OUTER JOIN；結果一定係陣列）
db.Orders.aggregate([
  { $match: { order_id: 1001 } },
  { $lookup: { from: "Employee", localField: "emp", foreignField: "_id", as: "empDetail" } },
  { $project: { _id: 0, order_id: 1, "empDetail.firstname": 1 } }
]);
```

---
## 英文極速記憶句

| 章 | 必背句 |
|---|---|
| Ch1 | "Each primary fact is recorded in only one place in the database." ／ "Metadata is data about data." ／ "The separation of data descriptions (metadata) from the application programs is called data independence." ／ "ACID guarantees that database transactions are processed reliably." ／ "A user's view is immune to changes made in other views." |
| Ch2 | "A relation is a table with columns and rows." ／ "Degree is the number of attributes in a relation; cardinality is the number of tuples in a relation." ／ "A candidate key is a superkey such that no proper subset is a superkey within the relation — irreducibility." ／ "Entity integrity: primary key attribute(s) must be unique and not null." ／ "Null represents the absence of a value and is not the same as zero or spaces, which are values." ／ "If a foreign key exists in a relation, either the foreign key value must match a candidate key value of some tuple in its parent relation, or the foreign key value must be wholly null." |
| Ch3 | "Reserved words are a fixed part of SQL; they must be spelt exactly and cannot be split across lines." ／ "All non-numeric literals must be enclosed in single or double quotes; numeric literals should not be enclosed in quotes." ／ "If neither NULL nor NOT NULL is specified, the column is treated as though NULL had been specified." ／ "TINYINT 1 byte, SMALLINT 2 bytes, MEDIUMINT 3 bytes, INT 4 bytes, BIGINT 8 bytes." ／ "CHAR is fixed-length; VARCHAR is variable-length." ／ "A foreign key references the primary key of another table; the data types must be compatible." |
| Ch4 | "Only SELECT and FROM are mandatory; the order of the clauses cannot be changed." ／ "Use DISTINCT to eliminate duplicates." ／ "BETWEEN ... AND ... is inclusive; NOT BETWEEN is its negation." ／ "NULL must be tested explicitly using IS NULL, never with = NULL." ／ "If WHERE is omitted, all rows are updated/deleted." ／ "If columnList is omitted, SQL assumes a list of all columns in their original CREATE TABLE order." |
| Ch5 | "Aggregate functions are used only in the SELECT list and in the HAVING clause." ／ "If the SELECT list includes an aggregate function and there is no GROUP BY clause, the SELECT list cannot reference columns." ／ "WHERE filters individual rows whereas HAVING filters groups." ／ "An inner join is a Cartesian Product operation followed by a selection with criteria; it removes those 'meaningless' results." ／ "UNION matches columns according to their positions, not their names." ／ "The logical order of clause execution is FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY." |
| Ch6 | "A collection is a set of related data which is similar to a Table in RDBMS." ／ "A document is an instance of a Collection that may not have the same schema." ／ "BSON is a binary structure invented by MongoDB that encodes type and length information." ／ "The system can generate a new ID (_id) automatically if it is omitted." ／ "Retrieving the related child documents requires additional queries, because MongoDB does not support JOIN operations." |
| Ch7 | "The order of the clauses cannot be changed." ／ "MongoDB is case sensitive, even for table names and field names." ／ "Conditions and Projection are in BSON format." ／ "Exact matching is required including the field order." ／ "$elemMatch requires at least one array element to satisfy all conditions at the same time." ／ "Inserting documents with the same _id raises error E11000 duplicate key error." |
| Ch8 | "An aggregation pipeline is a way to filter, sort, group, reshape, and analyze data without changing any data in your collection." ／ "A stage is one of the built-in methods that can be completed on the data, but does not permanently alter it." ／ "The stages are executed in order — the output of one stage becomes the input of the next stage." ／ "$match after $group is the MongoDB equivalent of the SQL HAVING clause." ／ "The result of $lookup is always an array, even when only one document matches." |
| Ch9 | "Cardinality describes the maximum number of possible relationship occurrences; participation describes the minimum number." ／ "A many-to-many relationship cannot be implemented in a relational database; it should be transformed into two one-to-many relationships." ／ "To implement a relationship, add a foreign key into the child table." ／ "A relation is in 2NF if it is in 1NF and every non-primary key attribute is fully functionally dependent on the entire primary key." ／ "A relation is in 3NF if it is in 2NF and no non-primary key attribute is transitively dependent on the primary key." ／ "Proceeding up to 3NF is adequate in most cases." |
| Lab 1–2 | "SQL statements are commands that request the DBMS to perform some operations." ／ "A green tick on the Output panel indicates the query has been executed successfully." ／ "Child tables with foreign keys must be created AFTER their parent tables." ／ "MODIFY always restates the full column definition, including the data type." ／ "Dropping a foreign key requires both DROP FOREIGN KEY and DROP INDEX; find the constraint name with SHOW KEYS FROM." |

---
## 最後 60 秒自測清單

- [ ] 能背出 Data／Information／Database 三個定義、Metadata／Schema／Data Dictionary 的分別、File-based vs DBMS 五項對比　能說出 ANSI-SPARC 三層名稱與 ACID 四個字（各附一句解釋）
- [ ] 能計算 Degree 與 Cardinality（Programme = 4／3；Student = 8／4）並列出 Relation 六大性質　能解釋 Superkey → Candidate Key（irreducibility）→ Primary Key → Alternate Key → Foreign Key
- [ ] 能默寫 Entity Integrity 與 Referential Integrity 的英文規則句，並說出 Cascade Update／Cascade Delete／Restrict 的分別
- [ ] 能背出 SQL 起源（IBM、1970s、SEQUEL）、SQL:2019、vendor incompatible　能說出 literals 三條引號規則、日期格式 YYYY-MM-DD、整數儲存大小（1/2/3/4/8 bytes）、CHAR vs VARCHAR 上限（255／65,535）、TIMESTAMP 2038-01-19、YEAR 1901–2155
- [ ] 能手寫完整 `CREATE TABLE`（含 `NOT NULL`、複合主鍵、`FOREIGN KEY ... REFERENCES`、`AUTO_INCREMENT`、`DEFAULT CURRENT_TIMESTAMP`、`ENUM`）
- [ ] 能手寫四種 `ALTER TABLE` 欄位操作 + `ADD PRIMARY KEY` + `ADD CONSTRAINT ... FOREIGN KEY`，並講出 `DROP TABLE`／`DROP DATABASE` 的資料損失後果
- [ ] 能默寫 SELECT 子句次序，並講出只有 `SELECT` 同 `FROM` 必須
- [ ] 能分辨 `BETWEEN` / `IN` / `LIKE` / `IS NULL` 四種 WHERE 條件寫法，並講出 UPDATE／DELETE 省略 WHERE 的後果（所有列）
- [ ] 能背出 YEAR 1000–9999、MONTH 1–12、DAY 1–31　能背出聚合函數四大規則，並判斷 `SELECT title, SUM(salary)` 為何非法
- [ ] 能講出 WHERE（過濾列）vs HAVING（過濾群組）以及子句邏輯執行順序
- [ ] 能寫出 INNER JOIN 兩種等價寫法 + 三表 join + 別名用法，並講出 UNION 三大要求與「join 橫向、UNION 縱向」的分別
- [ ] 能默寫 NoSQL 四類型定義句（口訣 KDWG）與 Collection = Table、Document = Row、Field = Column 對照
- [ ] 能講出 BSON 編碼 type + length、`_id` 自動生成 ObjectId，並默寫 BSON 類型編號（2／3／4／7／8／9／16／18／19）
- [ ] 能分辨 `Date()`（字串）vs `new Date(...)`／`ISODate(...)`（Date object）
- [ ] 能講出文件關係三方法，並答出 child IDs in parent 的最大缺點（額外查詢、冇 JOIN）
- [ ] 能講出 find() 條件在前、投影在後、MongoDB 大小寫敏感，以及 `{ field: null }` vs `{ $exists: false }`、`$in` vs `$or`
- [ ] 能手寫陣列四招（精確匹配／`$all`／單元素／`$size`）與 `$elemMatch` 的用途，並講出 E11000 duplicate key error 的成因
- [ ] 能默寫五個 update 運算子（`$set`／`$inc`／`$mul`／`$rename`／`$unset`）及更新回應四個數字
- [ ] 能默寫 Aggregation、Pipeline、Stage 三條英文定義　能講出 `$match` 在 `$group` 前後的分別（WHERE vs HAVING）與放錯位置的後果
- [ ] 能講出為何內嵌文件要先 `$project` 才可以 `$group`，並默寫 `$lookup` 四參數與「結果必然是陣列」
- [ ] 能講出資料庫設計兩大技術、Entity／Attribute／Relationship 判別法，並說出 derived information 唔算 attribute　能背出 Cardinality = Max、Participation = Min、mandatory／optional，以及 M:N 為何要拆兩條 1:M + 中間表
- [ ] 能舉出 Insertion／Deletion／Modification Anomaly 各一例，並默寫 1NF／2NF／3NF 定義句與「up to 3NF is adequate in most cases」
- [ ] 能講出 Lab 2 建表／刪表順序（先建父表，先刪子表外鍵）與刪外鍵兩步曲（`DROP FOREIGN KEY` + `DROP INDEX`，名由 `SHOW KEYS FROM` 查）

*詳細版：`02_Study_Guides/ITP4456_L1_IntroductionToDatabaseSystems_StudyGuide.md`、`ITP4456_Chp2_DataModel_StudyGuide.md`、`ITP4456_Chp3_RelationalDDL_StudyGuide.md`、`ITP4456_Chp4_RelationalDML_Basic_StudyGuide.md`、`ITP4456_Chp5_RelationalDML_Advanced_StudyGuide.md`、`ITP4456_Chp6_NoSQLDataModel_StudyGuide.md`、`ITP4456_Chp7_NoSQLBasicDML_StudyGuide.md`、`ITP4456_Chp8_NoSQLAdvancedDML_StudyGuide.md`、`ITP4456_Chp9_DatabaseDesign_StudyGuide.md`、`ITP4456_Lab1_CodeGuide.md`、`ITP4456_Lab2_CodeGuide.md`*
