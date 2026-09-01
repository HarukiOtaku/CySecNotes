# ITP4456 Chapter 9: Database Design — 雙語並行・應考導向學習指南

> 課程：ITP4456 Database Applications ｜ 主題：Logical Database Design in Relational Database（關聯式資料庫的邏輯資料庫設計）

---

## 1. 📝 課程概要與實務情境（Summary & Real-world Context）

本章是「從現實世界 → 資料庫 Schema」的橋樑。核心講兩大資料庫設計技術（Database Design Techniques）：**E-R Modeling（Entity-Relationship 實體關係建模）** 與 **Normalization（正規化）**。E-R Modeling 採用「由上而下（top-down）」的方式，先從企業需求中抽出 Entity、Attribute、Relationship 與 Constraint，畫成 ER Diagram，再轉換成 RDBMS 可執行的關聯式 Schema；Normalization 則採用「由下而上」的分析手法，以 Functional Dependency（函數相依）為基礎，把有冗餘（Redundancy）與異常（Anomaly）的關聯逐步拆解成 Well-structured Relation。兩者相輔相成，確保資料、資料關係與資料約束能準確呈現企業實際運作。

在真實世界中，這套設計流程直接決定資料庫的「健康程度」。例如：開發一個網上商店系統時，如果設計者把顧客資料、訂單資料與產品資料全部塞進同一張表，日後員工更改某產品單價，就要逐張訂單修改，遺漏任何一行就會造成報表與庫存金額不一致——這就是教材所講的 Modification Anomaly；又如刪除一名學生記錄時，連帶把「課程資料」也一併刪除，就是 Deletion Anomaly。又或者，一個學員可以選修多個課程、一個課程有多名學員報讀，這種 **M:N（many-to-many）關係**在關聯式資料庫中無法直接實現，設計者必須把它拆成兩條 1:M 關係並建立中間表（如 Order_line）。懂得先畫 ERD、再正規化，才能在資料庫「落地」前就消除這些隱患，這是每位 Database Developer / DBA 必備的核心功課。

---

## 2. 🎯 考試學習目標（Learning Objectives）

考官會測試以下核心能力（附英文對照）：

1. **辨識與判斷 Entity** — 能分辨甚麼對象適合做 Entity、甚麼不適合（Identify suitable entities in an ER model）。
2. **辨識 Attribute 與排除衍生資料** — 能分辨屬性與「由實例推算出來的衍生資訊（derived information）」（Identify attributes and exclude derived attributes）。
3. **判別 Relationship 及其對應的 PK–FK** — 能從動詞/動詞短語找出實體間的聯繫，並對應 Primary Key–Foreign Key（Identify relationships and map them to primary key–foreign key pairs）。
4. **運用 Cardinality 與 Participation 描述 Multiplicity** — 能以「最大（maximum）＝ cardinality」與「最小（minimum）＝ participation」準確描述關係的結構約束（Describe structural constraints using cardinality and participation）。
5. **雙向解讀關係句子** — 能從左到右、從右到左讀出「A has … to … relationship with B」的完整意思（Read relationship statements in both directions）。
6. **轉換 M:N 關係** — 能說明為何 M:N 不能在關聯式資料庫直接實現，並把它轉成兩條 1:M 關係（Transform a many-to-many relationship into two one-to-many relationships）。
7. **ERD → DB Schema 落地** — 能運用 Foreign Key 把 ERD 轉成關聯式表格（Implement relationships with foreign keys when converting an ERD into a relational schema）。
8. **解釋三種 Update Anomalies** — 能分別舉例說明 Insertion、Deletion、Modification Anomaly（Explain the three types of update anomalies with examples）。
9. **執行 Normalization 流程** — 能由 UNF 依次走到 1NF → 2NF → 3NF，並指出每步移除的相依問題（Normalize a relation from UNF up to 3NF, removing repeating groups, partial dependencies and transitive dependencies）。
10. **運用 Functional Dependency 術語作答** — 能以 full / partial / transitive functional dependency 正確解說分解理由（Justify decomposition using full, partial and transitive functional dependencies）。

---

## 3. 📖 雙語深度理論知識點（Comprehensive Notes）

### 3.1 Database Design Techniques（資料庫設計技術）

資料庫設計技術的首要目標，是確保能「準確呈現」企業相關的資料、資料關係與資料約束。

> **English Standard Definition:** "Database design techniques ensure an accurate presentation of the data, data relationships and data constraints that is pertinent to the enterprise."

兩大設計技術：

| 技術 | 方向 | 用途 |
|------|------|------|
| **E-R Modeling** | Top-down（由上而下） | 先定義 Entity / Attribute / Relationship / Constraint，畫出 ERD，再轉成 RDB schema |
| **Normalization** | 分析式（by analysis） | 以 Primary Key 與 Functional Dependency 分析關聯，消除冗餘與異常 |

---

### 3.2 E-R Modeling（實體關係建模）

E-R Model 提供一種「共同、非正式、方便」的方式來為資料結構建模，是設計師與用戶溝通的通用語言。

> **English Standard Definition:** "The Entity-Relationship model provides a common, informal and convenient way for modelling the data structure. It is a top-down approach that identifies the entities, attributes, relationships and constraints, depicts all the data identified in the ER Diagram, and the diagram is then subsequently converted into the RDB schema for the RDBMS."

**E-R Modeling 的五個關鍵步驟：**

1. 以 **top-down（由上而下）** 方式思考，先看整體再看細節。
2. **Identify the entities**（辨識實體）。
3. **Identify the attributes**（辨識屬性）。
4. **Identify the relationships and constraints**（辨識關係與約束）。
5. 將所有資料畫進 **ER Diagram**，最後把圖轉換成 **RDB schema** 交給 RDBMS 執行。

---

### 3.3 ER Diagram 三元素：Entity、Attribute、Relationship

#### 3.3.1 Entity（實體）

**甚麼應該做 Entity？**

> **English Standard Definition:** "An entity is an object that will have many instances in the database, an object that will be composed of multiple attributes, and an object that we are trying to model."

- 在資料庫中會有「多個實例（many instances）」的對象；
- 由「多個屬性（multiple attributes）」組成；
- 是我們「正在嘗試建模（trying to model）」的對象。

**甚麼不應該做 Entity？**

> **English Standard Definition:** "A user of the DB system or an output of the DB system (e.g., a report) should NOT be an entity."

- ❌ 資料庫系統的「使用者（a user of the DB system）」；
- ❌ 資料庫系統的「輸出（an output of the DB system）」，例如一份報表（a report）。

**找 Entity 的秘訣：**
- **Look for nouns（找名詞）**；
- 注意：**a proper noun is not a good candidate（專有名詞通常不是好的候選）**——因為專有名詞往往是單一實例，例如「HKIIT」這種特定機構名，應以「School / Student」等通用類別作 Entity。

**Entity ⇄ Table 對應：** Entity（實體）最終成為資料庫中的 **Table（表）**。

#### 3.3.2 Attribute（屬性）

**甚麼應該做 Attribute？**

> **English Standard Definition:** "An attribute is a property or characteristic of an entity."

- 屬性是實體的「性質或特徵（property or characteristic）」。

**甚麼不應該做 Attribute？**

> **English Standard Definition:** "Derived information from the entity instance should NOT be an attribute."

- ❌ 由實體實例「推算/衍生」出來的資訊（derived information），例如：
  - number of failed students（不合格學生人數）；
  - age of the person（年齡——可由出生日期算出）；
  - total of the invoice（發票總額——可由明細加總）。

**找 Attribute 的秘訣：**
- **Look for descriptive words（找形容/描述性字眼）**；
- 對應關係：**Entity（Table）⇄ Attribute（Field）**——Entity 變成 Table，Attribute 變成 Field（欄位）。

#### 3.3.3 Relationship（關係）

**甚麼應該做 Relationship？**

> **English Standard Definition:** "A relationship is a linkage between two entities. It corresponds to a primary key – foreign key (PK–FK) pair."

- 關係是「兩個實體之間的聯繫（linkage between two entities）」；
- 關係最終以 **Primary Key – Foreign Key（主鍵–外鍵）** 對應實現。

**甚麼不是好的 Relationship？**
- ❌ 參與的實體之間「沒有直接關係（NOT related directly）」——不要硬把無關的實體連起來。

**找 Relationship 的秘訣：**
- **Look for verb or verb phrases between entities（找實體之間的動詞或動詞短語）**；
- 例如 Orders（訂單）與 Order_line（訂單明細）之間存在關係，是因為訂單包含多行明細，透過 FK（外鍵）聯繫。

---

### 3.4 ERD 記號：Crow's Foot Notation（烏鴉腳記號）

教材以 **Crow's Foot Notation** 繪製 ERD（投影片僅展示圖例，沒有文字解說符號；以下為標準記號輔助參考，考試畫圖或讀圖都用得著）：

| 符號（左→右讀） | 意思 | 英文說法 |
|------|------|------|
| `\|`（一條直線） | 恰好一個 | one and only one |
| `O`（圓圈） | 零個（可選） | zero |
| `O─`（圓圈＋直線） | 零或一個 | zero or one |
| `╪`（雙直線） | 至少一個（強制） | one or more（mandatory） |
| `O<`（圓圈＋烏鴉腳） | 零或多個（可選多） | zero or many |
| `\|<`（直線＋烏鴉腳） | 一個或多個（強制多） | one or many |

> **Exam Tip:** 記住三塊積木——**直線 = one（一），圓圈 = zero（零），烏鴉腳 = many（多）**。把三者組合就能拼出全部六種 multiplicities。

---

### 3.5 Multiplicity — Structural Constraints（結構約束）

**Multiplicity（多重性）** 描述「透過某一特定關係，一個實體類型的一個實例，可與另一個實體類型的多少個實例相關聯」，它代表企業/公司訂下的業務規則（business rules）。

> **English Standard Definition:** "Multiplicity is the range of possible occurrences of an entity type that may relate to a single occurrence of an associated entity type through a particular relationship. It represents policies (business rules) established by the user or company, and is made up of two types of restrictions: cardinality and participation."

Multiplicity 由兩部分組成：

#### 3.5.1 Cardinality（基數）—— 描述「最大（maximum）」

> **English Standard Definition:** "Cardinality describes the maximum number of possible relationship occurrences for an entity participating in a given relationship type."

- 只有兩個可能值：**one（一）** 或 **many（多於一，more than one）**。
- 例句（Customer ⇄ Orders）：
  - **左到右：** a customer places **many** (at most more than one) orders；
  - **右到左：** an order is placed by **one** (at most one) customer。

#### 3.5.2 Participation（參與度）—— 描述「最小（minimum）」

> **English Standard Definition:** "Participation describes the minimum number of possible relationship occurrences for an entity participating in a given relationship type. All or only some entity occurrences may participate in a relationship."

- 只有兩個可能值：**zero（零）** 或 **one（一）**。
- **Mandatory relationship（強制關係）：** 所有實例都參與（all occurrences participate in a relationship）；
- **Optional relationship（可選關係）：** 只有部分實例參與（some occurrences participate in a relationship）。
- 例句（Customer ⇄ Orders）：
  - **左到右：** a customer may not (at least zero) place orders —— 即顧客可以不下單（optional）；
  - **右到左：** an order is placed by **one** (at least one) customer —— 每張訂單至少屬於一名顧客（mandatory）。

> **Exam Tip:** Cardinality 看「最多幾多」（one/many），Participation 看「最少幾多」（zero/one）。**Cardinality = Max，Participation = Min** 是必考口訣。

#### 3.5.3 Relationship 實例（Employee 管理 Orders）

> 左到右：an employee can manage **zero or more** orders；
> 右到左：an order **must** be managed by **one and only one** employee。

即：員工可管理零張或多張訂單（optional, many）；但每張訂單必須由一名且僅一名員工管理（mandatory, one）。

---

### 3.6 關係雙向讀法（Relationship 全組合矩陣）

考試最愛考「左右兩邊分別點讀」。把所有 A、B 組合整理如下（**mandatory = 強制**，**optional = 可選**）：

| 左邊（A 對 B） | 右邊（B 對 A） |
|------|------|
| A has **one to one (mandatory)** relationship with B | B has **one to one (mandatory)** relationship with A |
| A has **one to many (mandatory)** relationship with B | B has **many to one (mandatory)** relationship with A |
| A has **many to many (mandatory)** relationship with B | B has **many to many (mandatory)** relationship with A |
| A has **one to zero or one (optional)** relationship with B | B has **zero or one to one (mandatory)** relationship with A |
| A has **one to zero or many (optional)** relationship with B | B has **zero or many to one (mandatory)** relationship with A |
| A has **zero or one to many** relationship with B | B has **many to zero or one** relationship with A |
| A has **zero or one to zero or one** relationship with B | B has **zero or one to zero or one** relationship with A |
| A has **zero or one to zero or many** relationship with B | B has **zero or many to zero or one** relationship with A |
| A has **zero or many to zero or many** relationship with B | B has **zero or many to zero or many** relationship with A |

> **Exam Tip:** 讀關係時固定順序「**A has [cardinality of B] to [cardinality of A] relationship with B**」——即「A 擁有多少個 B」先講，「B 那邊對 A 的限制」後講。每次只講一邊，另一邊反轉即可。

---

### 3.7 Transform Many-to-many Relationship（轉換 M:N 關係）

**為何要轉換？**

> **English Standard Definition:** "A many-to-many (M:N) relationship cannot be implemented in a relational database; it should be transformed into two one-to-many (1:M) relationships."

- 關聯式資料庫的表格只能以「一行記錄指向另一行」表達關係，無法直接表達 M:N；
- 做法：拆成**兩條 1:M 關係**，中間用一張關聯表（associative / junction table）承接。

**主鍵點定？** 兩種方案：

1. **Composite Primary Key（複合主鍵）：** 用兩邊的外鍵組成，例如 `(order_id, product_id)`；
2. **Create a new key（建立新鍵）：** 另建一個新欄位做主鍵，例如 `order_line_id`。

範例（Orders ⇄ Product 的 M:N 變成 Order_line）：

```
Orders ──1:M──> Order_line <──M:1── Product
Order_line( order_id, product_id, quantity )
```

---

### 3.8 ERD → DB Schema（ERD 轉成關聯式資料庫結構）

**實現關係的方法：**

> **English Standard Definition:** "To implement a relationship, add a foreign key into the child table."

- 把外鍵（Foreign Key）加進「子表（child table）」；
- 「一方（parent）」的主鍵，成為「多方（child）」的外鍵。

**教材範例（投影片 19）——五張表：**

```
Customer ( customer_id, customer_name, customer_address, city, state, postal_code )
Employee ( emp_id, lastname, firstname, title, salary )
Orders   ( order_id, order_date, customer_id, emp_id )        ← FK: customer_id, emp_id
Product  ( product_id, product_name, product_finish, unit_price, on_hand, description )
Order_line ( order_id, product_id, quantity )                 ← 複合 PK: (order_id, product_id)；兩欄皆為 FK
```

**輔助示範（Supplementary DDL）**——以上 Schema 落地的 SQL 寫法（考試常考 DDL 對應）：

```sql
-- Parent tables (一方)
CREATE TABLE Customer (
  customer_id     INT PRIMARY KEY,
  customer_name   VARCHAR(50),
  customer_address VARCHAR(100),
  city            VARCHAR(30),
  state           VARCHAR(30),
  postal_code     VARCHAR(10)
);

CREATE TABLE Employee (
  emp_id    INT PRIMARY KEY,
  lastname  VARCHAR(30),
  firstname VARCHAR(30),
  title     VARCHAR(30),
  salary    DECIMAL(10,2)
);

CREATE TABLE Product (
  product_id    INT PRIMARY KEY,
  product_name  VARCHAR(50),
  product_finish VARCHAR(30),
  unit_price    DECIMAL(10,2),
  on_hand       INT,
  description   VARCHAR(200)
);

-- Child table Orders：用 FK 實現 Customer、Employee 的關係
CREATE TABLE Orders (
  order_id    INT PRIMARY KEY,
  order_date  DATE,
  customer_id INT NOT NULL,      -- FK → Customer
  emp_id      INT NOT NULL,      -- FK → Employee
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
  FOREIGN KEY (emp_id)      REFERENCES Employee(emp_id)
);

-- 中間表 Order_line：複合主鍵承接 M:N（Orders ⇄ Product）
CREATE TABLE Order_line (
  order_id   INT,
  product_id INT,
  quantity   INT,
  PRIMARY KEY (order_id, product_id),     -- Composite Primary Key
  FOREIGN KEY (order_id)   REFERENCES Orders(order_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
```

> **Exam Tip:** 記熟「**Child table 加 FK**」這一句。判定誰是 child：在 1:M 中，「多」的一方是 child；在 M:N 中，中間表是 child。

---

### 3.9 Well-structured Relation（結構良好的關聯）與 Update Anomalies

#### 3.9.1 定義

> **English Standard Definition:** "A well-structured relation is a relation that contains a minimum amount of redundancy and allows users to insert, delete, and modify rows of the table without errors or inconsistencies (called anomalies)."

**點解要分析 Redundancy（冗餘）？**

> "Redundant (duplicated) data produces errors or inconsistencies while updating the relation."

- 冗餘 = 重複儲存的資料；更新（update）時，重複資料很容易產生錯誤或不一致。

**Update Anomalies（更新異常）** 共有三類：

```
Update Anomalies
├── Insertion Anomalies   （插入異常）
├── Deletion Anomalies    （刪除異常）
└── Modification Anomalies（修改異常）
```

#### 3.9.2 Insertion Anomaly（插入異常）

> **English Standard Definition:** "An insertion anomaly occurs when inserting a new tuple requires duplicated data to be included; if the duplicated data are not identical, the data will become inconsistent."

- 新增一筆資料時，被迫連帶輸入大量重複資料；
- 若重複資料不一致，資料就會互相矛盾。

**教材例子：** 要插入一名修讀 IT114104 的學生，所輸入的 programme name（課程名稱）必須與其他 IT114104 的 tuple 完全一致，否則資料不一致（inconsistent）。

#### 3.9.3 Deletion Anomaly（刪除異常）

> **English Standard Definition:** "A deletion anomaly occurs when deleting a tuple may cause a loss of other data that is essential."

- 刪除一筆資料時，可能連帶把其他「必需資料」一併刪除（資料流失）。

**教材例子：** 刪除學生 170147471 的 tuple，會同時遺失「HD in Cloud and Data Centre Administration（雲端及數據中心管理高級文憑）」的課程詳細資料——因為這些資料只依附在該學生的記錄裡。

#### 3.9.4 Modification Anomaly（修改異常）

> **English Standard Definition:** "A modification anomaly occurs when changing duplicated data requires the change to be carried out on ALL related tuples in the relation."

- 修改重複資料時，必須在同一關聯的所有相關 tuple 中一齊改；
- 漏改任何一行，資料就會不一致。

**教材例子：** 要把 IT114105 的 programme name 由「Software Engineering」改為「Big Data System Engineering」，必須在 **ALL related tuples（所有相關 tuple）** 上執行修改。

#### 3.9.5 解決方案（Better Alternative）

> **English Standard Definition:** "A better alternative model is a model with minimal redundancy, in which programme details are kept separately in a Programme relation."

- 把重複出現的資料（例如 programme details）抽出來，獨立存放在另一張表（如 Programme relation）；
- 原本的表只保留 FK 指向該表 → 冗餘減至最少。

---

### 3.10 Normalization（正規化）概論與 Normal Forms

#### 3.10.1 定義

> **English Standard Definition:** "Normalization is a formal technique for analysing a relation based on its primary key and functional dependencies between its attributes. It is a series of tests performed on a relation to determine whether it satisfies or violates the requirement of a given Normal Form, and a process to produce a set of well-structured relations."

**Normalization 的三個目標：**

1. 對關聯進行一系列「測試」，判斷它是否符合某一 **Normal Form（正規形式）** 的要求；
2. 產出一組 **well-structured relations（結構良好的關聯）**；
3. 具有密切邏輯關係的屬性（attributes with a close logical relationship）放在同一關聯中；資料冗餘最少（minimal data redundancy）。

#### 3.10.2 Normal Forms 總覽

> "The normal forms are UNF, 1NF, 2NF, 3NF, BCNF, 4NF, 5NF and 6NF."

| 縮寫 | 全名 | 備註 |
|------|------|------|
| UNF | **Un**normalized **F**orm | 未正規化形式，可能含 repeating group |
| 1NF | First Normal Form | 每個 cell 只有單一原子值 |
| 2NF | Second Normal Form | 消除 partial dependency |
| 3NF | Third Normal Form | 消除 transitive dependency |
| BCNF | **B**oyce-**C**odd **N**ormal **F**orm | 3NF 的更強定義（stronger definition of 3NF） |
| 4NF / 5NF / 6NF | Fourth / Fifth / Sixth Normal Form | 進階正規形式 |

**三個必背結論：**

> "From a structural point of view, 5NF is better than 4NF, … 3NF is better than 2NF, …"

> "Proceeding up to 3NF is adequate in most cases."

- 結構上，正規形式等級愈高愈好：5NF > 4NF > BCNF > 3NF > 2NF > 1NF；
- **但實務上做到 3NF 已足夠應付大多數情況（up to 3NF is adequate in most cases）**——這是必考選擇題/短答題重點。

---

### 3.11 UNF（Unnormalized Form，未正規化形式）

> **English Standard Definition:** "UNF (Unnormalized Form) is a table that may contain one or more repeating groups."

**UNF 的四個建立步驟：**

1. **Transfer the data from the sources into table format** with rows and columns（把來源資料轉成「行 × 列」的表格格式）；
2. **Determine which attributes need to be managed**（決定要管理哪些屬性）；
3. **Remove all derived attributes**（移除所有衍生屬性）；
4. **Identify an attribute (or group of attributes) to act as the key**（找出一個或一組屬性作為鍵）。

**教材例子（UNF）：**

```
Invoice ( invNo, invDate, custID, custName, custContact, itemNo, description, unitPrice, qty )
```

- 問題所在：itemNo、description、unitPrice、qty 是 **repeating group（重複群組）**——一張發票可有多行貨品。

---

### 3.12 UNF → 1NF（First Normal Form，第一正規形式）

> **English Standard Definition:** "First Normal Form (1NF) is a relation in which each cell contains one and only one value. There is no repeating group of values, no multi-valued attributes, and every attribute value is atomic."

**1NF 三大條件：**
1. 每個 cell 只有一個且僅一個值（one and only one value）；
2. 沒有重複群組（NO repeating group of values）；
3. 沒有多值屬性（no multi-valued attributes）——所有屬性值都是原子的（atomic）。

**轉換步驟（Remove repeating group）：**

1. **Identify repeating group(s)** which repeat for the key attribute(s)（找出隨鍵屬性重複的群組）；
2. **Place repeating data along with a copy of the key into a new/separate table**（把重複資料連同鍵的副本放進新表）；
3. 新表與原表形成 **one-to-many（一對多）** 關係。

**教材例子：**

```
Invoice     ( invNo, invDate, custID, custName, custContact )
InvoiceItem ( invNo, itemNo, description, unitPrice, qty )     ← invNo 同時是 Foreign Key
```

---

### 3.13 1NF → 2NF（Second Normal Form，第二正規形式）

> **English Standard Definition:** "Second Normal Form (2NF) is a relation in 1NF and every non-primary key attribute is fully functionally dependent on the entire primary key."

- 只有「複合主鍵（composite primary key）」的關聯才可能出現 **partial dependency（部分相依）** 問題——單一主鍵不會有部分相依。

**Full Functional Dependency（完全函數相依）：**

> "Each of the non-key attributes is functionally dependent on the entire key."

- 非鍵屬性依賴於**整個鍵**（the entire key），缺任何一部分都不成立。

**Partial Dependency（部分函數相依）：**

> "A partial dependency exists when non-key attributes are functionally dependent on part of the key."

- 非鍵屬性只依賴**鍵的一部分**（part of the key）。

**教材例子（InvoiceItem 分析）：**

```
Invoice ( invNo, invDate, custID, custName, custContact )
         invNo → invDate, custID, custName, custContact     * full functional dependency（完全相依）

InvoiceItem ( invNo, itemNo, description, unitPrice, qty )
         itemNo → description, unitPrice                     * partial functional dependency（部分相依）
         invNo, itemNo → qty                                 * full functional dependency（完全相依）
```

**轉換步驟（Remove partial dependency）：**

1. **Identify the relation(s) with partial dependency**（找出有部分相依的關聯）；
2. **Decompose the relation** and place the partial depending attributes with a copy of their determinant in a new relation（分解關聯，把「部分相依的屬性」連同其決定因子（determinant）的副本放進新關聯）；
3. 與新關聯建立 **one-to-one / one-to-many** 關係。

**教材例子（分解結果）：**

```
Invoice     ( invNo, invDate, custID, custName, custContact )
Item        ( itemNo, description, unitPrice )      ← 由 itemNo → description, unitPrice 建立
InvoiceItem ( invNo, itemNo, qty )                  ← description、unitPrice 被移走；itemNo 同時是 Foreign Key
```

---

### 3.14 2NF → 3NF（Third Normal Form，第三正規形式）

> **English Standard Definition:** "Third Normal Form (3NF) is a relation in 2NF and NO non-primary key attribute is transitively dependent on the primary key."

**Transitive Dependency（遞移相依）：**

> "A transitive dependency exists when no non-key attribute is dependent on another non-key attribute — i.e., a functional dependency between two non-key attributes, with which an intermediate dependency is involved."

一般式：**R ( X, Y, Z )**，其中：
- `X → Y → Z`：Z 依賴 Y，Y 依賴 X；
- Y 和 Z 都是非鍵屬性（non-key attributes）；
- 那麼 **`Y → Z` 就是 transitive dependency（遞移相依）**。

**教材例子（Invoice 分析）：**

```
Invoice ( invNo, invDate, custID, custName, custContact )
         invNo → custID → custName, custContact

因為 customer always has the same details whatever invoice is issued to
（無論開出哪張發票，顧客資料都一樣）
```

- custName、custContact 本應只由 custID 決定，卻透過 custID「遞移」依賴到主鍵 invNo——必須拆走。

**轉換步驟（Remove transitive dependency）：**

1. **Decompose the relation** and place the transitive depending attributes with a copy of their determinant in a new relation（分解關聯，把遞移相依的屬性連同決定因子副本放進新關聯）；
2. 與新關聯建立 **one-to-one / one-to-many** 關係；
3. **The parent attribute in the original relation becomes the foreign key**（原關聯中的父屬性變成外鍵）。

**教材例子（分解結果）：**

```
Invoice    ( invNo, invDate, custID )        ← custID 變成 Foreign Key；custName、custContact 被移走
Customer   ( custID, custName, custContact ) ← 由 custID → custName, custContact 建立
Item       ( itemNo, description, unitPrice )
InvoiceItem( invNo, itemNo, qty )
```

**正規化口訣總結：**

```
UNF → 1NF：Remove repeating group（拆重複群組）
1NF → 2NF：Remove partial dependency（拆部分相依）
2NF → 3NF：Remove transitive dependency（拆遞移相依）
```

---

## 4. 📖 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型（Exam Answer Phrase） |
|------|------|------|
| **Database design techniques** | 確保準確呈現企業資料、資料關係與資料約束的設計方法 | "Database design techniques ensure an accurate presentation of the data, data relationships and data constraints that is pertinent to the enterprise." |
| **E-R Modeling** | 用 ER 圖自上而下建模，最後轉成 RDB schema | "The Entity-Relationship model provides a common, informal and convenient way for modelling the data structure, and is a top-down approach." |
| **Entity** | 資料庫中會有多個實例、由多個屬性組成的建模對象（最終成 Table） | "An entity is an object that will have many instances in the database and will be composed of multiple attributes." |
| **Attribute** | 實體的性質或特徵（最終成 Field）；衍生資訊不算屬性 | "An attribute is a property or characteristic of an entity. Derived information from the entity instance should not be an attribute." |
| **Relationship** | 兩個實體之間的聯繫，以 PK–FK 實現 | "A relationship is a linkage between two entities, and it corresponds to a primary key – foreign key pair." |
| **Multiplicity** | 透過某關係，一個實例可關聯的實例數範圍；由 cardinality + participation 組成 | "Multiplicity is the range of possible occurrences of an entity type that may relate to a single occurrence of an associated entity type." |
| **Cardinality** | 關係發生的「最大」數目，值為 one 或 many | "Cardinality describes the maximum number of possible relationship occurrences for an entity participating in a given relationship type." |
| **Participation** | 關係發生的「最小」數目，值為 zero 或 one | "Participation describes the minimum number of possible relationship occurrences for an entity participating in a given relationship type." |
| **Mandatory relationship** | 所有實例都參與的關係（最少一個） | "In a mandatory relationship, all occurrences of an entity participate in the relationship." |
| **Optional relationship** | 只有部分實例參與的關係（可以是零個） | "In an optional relationship, some occurrences of an entity participate in the relationship." |
| **Composite Primary Key** | 由多個欄位組成的主鍵；M:N 中間表常用 | "A composite primary key is a primary key formed by more than one attribute, e.g., (order_id, product_id)." |
| **M:N transformation** | M:N 不能直接實現，要拆成兩條 1:M | "A many-to-many relationship cannot be implemented in a relational database; it should be transformed into two one-to-many relationships." |
| **Foreign Key** | 子表中指向父表主鍵的欄位，用來實現關係 | "To implement a relationship, add a foreign key into the child table." |
| **Well-structured Relation** | 冗餘最少、可無誤插入/刪除/修改的關聯 | "A well-structured relation contains a minimum amount of redundancy and allows users to insert, delete, and modify rows without errors or inconsistencies." |
| **Redundancy** | 重複儲存的資料，更新時會產生錯誤或不一致 | "Redundant (duplicated) data produces errors or inconsistencies while updating the relation." |
| **Insertion Anomaly** | 插入需連帶輸入重複資料，不一致會產生矛盾 | "An insertion anomaly occurs when inserting a new tuple requires duplicated data to be included; if not identical, the data will become inconsistent." |
| **Deletion Anomaly** | 刪除一筆資料連帶遺失其他必需資料 | "A deletion anomaly occurs when deleting a tuple may cause a loss of other data that is essential." |
| **Modification Anomaly** | 改重複資料必須改所有相關 tuple | "A modification anomaly occurs when changing duplicated data requires the change to be carried out on all related tuples." |
| **Normalization** | 以主鍵與函數相依分析關聯、產生良好結構的正式技術 | "Normalization is a formal technique for analysing a relation based on its primary key and functional dependencies between its attributes." |
| **Normal Form** | 關聯需通過的結構測試等級（UNF 至 6NF） | "Normalization is a series of tests to determine whether a relation satisfies or violates the requirement of a given normal form." |
| **UNF** | 未正規化形式，含一個或多個重複群組 | "UNF is a table that may contain one or more repeating groups." |
| **1NF** | 每格單一原子值，無重複群組 | "A relation is in 1NF if each cell contains one and only one value — no repeating groups, no multi-valued attributes." |
| **Full functional dependency** | 非鍵屬性完全依賴整個鍵 | "Each non-key attribute is functionally dependent on the entire key." |
| **Partial dependency** | 非鍵屬性只依賴複合鍵的一部分 | "A partial dependency exists when non-key attributes are functionally dependent on part of the key." |
| **2NF** | 1NF ＋ 消除部分相依 | "A relation is in 2NF if it is in 1NF and every non-primary key attribute is fully functionally dependent on the entire primary key." |
| **Transitive dependency** | 非鍵屬性依賴另一非鍵屬性（X → Y → Z） | "A transitive dependency exists when a non-key attribute is dependent on another non-key attribute, e.g., R(X, Y, Z) with X → Y → Z." |
| **3NF** | 2NF ＋ 消除遞移相依 | "A relation is in 3NF if it is in 2NF and no non-primary key attribute is transitively dependent on the primary key." |
| **BCNF** | Boyce-Codd 正規形式，3NF 的更強定義 | "BCNF stands for Boyce-Codd Normal Form, a stronger definition of 3NF." |
| **Atomic** | 每個屬性值不可再分割 | "Every attribute value is atomic; each cell contains one and only one value." |

---

## 5. 🗺️ 循序漸進學習路線（Learning Path）

**第一站：建立整體概念**
- 先理解：Database Design 有兩大技術——E-R Modeling（top-down）與 Normalization（分析式）；兩者都為「消除冗餘、準確呈現資料」服務。
- 背誦：*"Database design techniques ensure an accurate presentation of the data, data relationships and data constraints that is pertinent to the enterprise."*
- 能答：What are the two principal database design techniques?

**第二站：ERD 三元素（Entity / Attribute / Relationship）**
- 先理解：Entity = 有名詞特徵的建模對象；Attribute = 形容詞特徵；Relationship = 動詞連結；衍生資訊與系統輸入輸出不是 Entity/Attribute。
- 背誦：*"Look for nouns for entities, descriptive words for attributes, and verbs or verb phrases for relationships."*
- 能答：Given a scenario, identify entities, attributes and relationships; explain why "age" or "a report" is NOT an attribute/entity.

**第三站：Multiplicity 與關係讀法**
- 先理解：Cardinality = maximum（one/many）；Participation = minimum（zero/one）；mandatory = all participate，optional = some participate。
- 背誦：*"Cardinality describes the maximum number; participation describes the minimum number of possible relationship occurrences."*
- 能寫：將 Crow's Foot 記號或中文描述翻譯成 "A has one to many (mandatory) relationship with B" 的雙向英文句子。

**第四站：M:N 轉換與 Schema 落地**
- 先理解：M:N 不能在關聯式資料庫直接實現 → 拆成兩條 1:M → 中間表用 composite PK 或新鍵；Child table 加 FK。
- 背誦：*"A many-to-many relationship should be transformed into two one-to-many relationships; add a foreign key into the child table."*
- 能寫：把 ERD 轉成 Customer / Employee / Orders / Product / Order_line 五張表的欄位清單，並用 SQL `CREATE TABLE` 寫出 FK（Supplementary DDL 練習）。

**第五站：Anomalies 三兄弟**
- 先理解：冗餘是異常之源；Insertion（插入要帶重複資料）、Deletion（刪除連帶流失資料）、Modification（修改要改全部相關 tuple）。
- 背誦：*"Redundant data produces errors or inconsistencies while updating the relation."* + 三個 anomaly 的定義句。
- 能答：給一個「學生＋課程名稱」例子，指出它違反哪種 anomaly 並解釋。

**第六站：Normalization 由 UNF 行到 3NF（重頭戲）**
- 先理解：UNF（重複群組）→ 1NF（原子值）→ 2NF（消除部分相依，只影響複合主鍵）→ 3NF（消除遞移相依）。
- 背誦：*"1NF: each cell contains one and only one value. 2NF: every non-key attribute is fully functionally dependent on the entire primary key. 3NF: no non-key attribute is transitively dependent on the primary key."*
- 能寫：把 `Invoice (invNo, invDate, custID, custName, custContact, itemNo, description, unitPrice, qty)` 完整分解到 3NF，並標明每一步的 functional dependency（`invNo → …`、`itemNo → …`、`invNo, itemNo → qty`、`invNo → custID → …`）。
- 能答："Why is BCNF stronger than 3NF?" / "Why is proceeding up to 3NF adequate in most cases?"

**第七站（總複習）：**
- 把本指南 Module 6 懶人包過一遍 → 用 Module 4 句型庫逐句默寫 → 計時 5 分鐘完成一張 UNF→3NF 分解練習。

---

## 6. 🎒 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 6.1 極速口訣（Memory Aids）

| 口訣 | 內容 |
|------|------|
| **「卡參」口訣** | **Cardinality = Max（最多），Participation = Min（最少）**；卡（max: one/many）參（min: zero/one） |
| **正規化三步** | 1NF 拆重複群組（repeating group）→ 2NF 拆部分相依（partial）→ 3NF 拆遞移相依（transitive） |
| **關鍵數字** | Normal Forms 共 8 級：UNF, 1NF, 2NF, 3NF, BCNF, 4NF, 5NF, 6NF；**做到 3NF 已足夠（up to 3NF adequate）** |
| **Anomalies 三兄弟** | Insert（插要帶重複資料）／Delete（刪會流失資料）／Modify（改要改晒所有 tuple） |
| **Crow's Foot 積木** | 直線 = one（一）｜圓圈 = zero（零）｜烏鴉腳 = many（多） |

### 6.2 語法對照速查表

| 項目 | 英文語法 | 中文意思 |
|------|------|------|
| 基數 | one / many | 一／多（最大數） |
| 參與度 | zero / one | 零／一（最小數） |
| 強制關係 | mandatory | 所有實例都參與 |
| 可選關係 | optional | 部分實例參與 |
| 完全相依 | full functional dependency | 依賴整個鍵 |
| 部分相依 | partial dependency | 只依賴鍵的一部分 |
| 遞移相依 | transitive dependency | 非鍵依賴非鍵（X → Y → Z） |
| 複合主鍵 | composite primary key | 多欄位組成的主鍵 |
| 未正規化 | UNF（Unnormalized Form） | 有重複群組 |

### 6.3 必背英文答題模板（直接默寫）

**Normalization 萬用句：**
> "Normalization is a formal technique for analysing a relation based on its primary key and functional dependencies between its attributes."

**1NF：** "A relation is in 1NF if each cell contains one and only one value; every attribute value is atomic."
**2NF：** "A relation is in 2NF if it is in 1NF and every non-primary key attribute is fully functionally dependent on the entire primary key."
**3NF：** "A relation is in 3NF if it is in 2NF and no non-primary key attribute is transitively dependent on the primary key."

**M:N：** "A many-to-many relationship cannot be implemented in a relational database; it should be transformed into two one-to-many relationships."

**FK 實現：** "To implement a relationship, add a foreign key into the child table."

**Well-structured：** "A well-structured relation contains a minimum amount of redundancy and allows users to insert, delete, and modify rows without errors or inconsistencies."

### 6.4 一頁 Normalization 實戰（Invoice 範例全流程）

```
UNF:   Invoice ( invNo, invDate, custID, custName, custContact, itemNo, description, unitPrice, qty )
        │ 拆 repeating group（itemNo…qty 隨發票重複）
        ▼
1NF:   Invoice ( invNo, invDate, custID, custName, custContact )
       InvoiceItem ( invNo, itemNo, description, unitPrice, qty )        invNo = FK
        │ 拆 partial dependency（itemNo → description, unitPrice）
        ▼
2NF:   Invoice ( invNo, invDate, custID, custName, custContact )
       Item ( itemNo, description, unitPrice )                           itemNo → description, unitPrice
       InvoiceItem ( invNo, itemNo, qty )                                invNo, itemNo → qty；itemNo = FK
        │ 拆 transitive dependency（invNo → custID → custName, custContact）
        ▼
3NF:   Invoice ( invNo, invDate, custID )                                custID = FK
       Customer ( custID, custName, custContact )                        custID → custName, custContact
       Item ( itemNo, description, unitPrice )
       InvoiceItem ( invNo, itemNo, qty )
```

### 6.5 最後檢查清單（開考前 60 秒）

- [ ] 記得 Cardinality = Max，Participation = Min？
- [ ] 記得三種 Anomalies 各舉一例？
- [ ] 記得 3NF 定義句 + "up to 3NF is adequate in most cases"？
- [ ] 記得 M:N → 兩條 1:M + 中間表？
- [ ] 記得 Child table 加 FK？
