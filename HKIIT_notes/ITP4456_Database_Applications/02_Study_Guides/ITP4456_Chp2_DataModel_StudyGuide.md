# ITP4456 Chp2: Data Model of Relational Database — 雙語應考學習指南

> **來源**：ITP4456 Database Applications — Chapter 2: Data Model of Relational Database
> **原始檔**：`01_Raw_Materials/Lectures/Chp2 Data Model of Relational Database.pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 用 Programme／Student 兩個實例表自行默寫每條術語 → 對照 Cheat Sheet 完成最後 5 分鐘複習
> **本課對應 MLO**：Apply database design techniques to design data models used in business application systems（把資料庫設計技巧應用到商業應用系統的資料模型設計上）

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課是關聯式資料庫（Relational Database）的「資料模型」入門，全部內容圍繞一個核心問題：**如何用一套精確的詞彙與規則去描述「資料應該怎樣存放」**。課程分三大塊：(1) **Relational Model Terminology**——Relation、Tuple、Attribute、Domain、Degree、Cardinality、Relationship 七大術語，以及 Relation 的六大性質（Properties of Relation）；(2) **Relational Keys**——Superkey、Candidate Key、Primary Key、Alternate Key、Composite Key、Foreign Key 的分級與判別邏輯；(3) **Relational Integrity**——Null、Entity Integrity、Referential Integrity、General Constraint 四類完整性規則。整課的判斷主軸是：**「甚麼能放進表、甚麼不能放進表、鍵與鍵之間如何互相約束」**——這是之後 Chapter 3（Relational DDL）用 CREATE TABLE 寫出這些約束、以及 Chapter 9（Database Design）做正規化設計的理論基礎。

技術關聯性：本課的 **Superkey → Candidate Key → Primary Key** 是一條「由大收窄到最小」的層級鏈，與 Chapter 1 的 Relational Model 概念直接銜接；**Foreign Key + Referential Integrity** 就是日後 SQL 中 `FOREIGN KEY`／`REFERENCES` 約束的理論來源，而 **General Constraint** 則對應 `CHECK` 約束。考官最愛考：給一個關係（relation）叫你數 Degree／Cardinality、判斷某組合是否 Superkey／Candidate Key、以及判斷某條資料能否插入（Entity Integrity／Referential Integrity 的應用題）。

實務情境一：學校註冊處維護 `Programme` 表（課程資料）與 `Student` 表（學生資料），兩者靠 `programme`（外鍵）串連。若註冊系統允許插入一個 `programme` 值為 "IT010101" 的學生，但 `Programme` 表中根本沒有這個課程——這就違反了 **Referential Integrity**；DBMS 會直接拒絕這筆資料。這就是本課「外鍵值必須在父表中存在」規則的實際應用。

實務情境二：資料庫管理員（DBA）想把課程代號 `IT114122` 改名為 `IT114130`，或者想刪除 `IT114124` 這個課程。在沒有規則的情況下，`Student` 表中的相關學生記錄會變成「指向不存在課程」的孤兒資料（orphan data）。本課的 **Cascade Update / Cascade Delete / Restrict** 三種處理策略，正是現代 DBMS 中 `ON UPDATE CASCADE`、`ON DELETE SET NULL`、`ON DELETE RESTRICT` 等行為的設計藍本。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **定義關聯模型七大術語** — Define relation, tuple, attribute, domain, degree, cardinality and relationship in the relational model
2. **在實例表上指認術語** — Identify the relation, tuple, attribute, degree and cardinality from given table instances (e.g. Programme & Student)
3. **列舉 Relation 的性質** — List the properties of a relation and judge whether a table is a valid relation
4. **定義 Superkey 並列舉實例** — Define a superkey and identify all valid superkeys of a relation
5. **判別 Candidate Key（不可再約簡性）** — Identify candidate keys using the minimality (irreducibility) rule
6. **區分 Primary Key、Alternate Key 與 Composite Key** — Distinguish primary key, alternate key and composite key with examples
7. **定義 Foreign Key 並建立表間關係** — Define a foreign key and explain how it matches the candidate key (usually the primary key) of the parent relation
8. **解釋 Null 的含義** — Explain what NULL represents and why it differs from zero or spaces
9. **解釋並應用 Entity Integrity** — Explain and apply entity integrity (primary key must be unique and not null)
10. **解釋並應用 Referential Integrity** — Explain and apply referential integrity (foreign key must match a candidate key or be wholly null)
11. **比較 Cascade Update／Delete 與 Restrict 策略** — Compare cascade update/delete with restrict options when enforcing referential integrity
12. **舉例說明 General Constraint** — Give examples of general constraints specified by users or database administrators

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 關聯模型術語（Relational Model Terminology）

#### 3.1.1 Database 與 Relation

繁中解說：**Database（資料庫）** 在此被定義為「資料儲存的邏輯結構」——注意強調的是「邏輯結構」（logical structure），即用戶所見的表的安排，而非磁碟上的物理檔案。**Relation（關聯／關係）** 是整個關聯模型的基石：一張**有欄（columns）有列（rows）的 Table**。在關係模型中，relation 與 table 可以視為同義詞；因此說「一個資料庫由若干 relations 組成」就等於說「一個資料庫由若干 tables 組成」。

> English Standard Definitions:
> - "A database is a logical structure of the data storage."
> - "A relation is a table with columns and rows."

#### 3.1.2 Tuple/Record 與 Attribute/Field

繁中解說：**Tuple（元組）／Record（記錄）** 就是 relation 中的**一行（Row）**——代表一個具體的實例（例如一個學生的完整資料）。**Attribute（屬性）／Field（欄位）** 就是 relation 中一個**有名字的欄（named Column）**——代表某一類資料（例如學號、姓名）。記法上，關係通常寫成 `RelationName (attr1, attr2, …)`，例如 `Student (stdNo, name, address, gender, DOB, phone, email, programme)`。

> English Standard Definitions:
> - "A tuple/record is a row of a relation."
> - "An attribute/field is a named column of a relation."

#### 3.1.3 Domain、Degree 與 Cardinality

繁中解說：三個術語分別回答「欄位能放甚麼值、有幾欄、有幾列」。**Domain（值域）** 是一個或多個屬性的**允許值集合（set of allowable values）**——例如 `gender` 的 domain 是 {M, F}，`level` 的 domain 是 {4} 或「4 或以上」；同一個 domain 可以被多個屬性共用（例如 `phone` 與某個備用電話號碼欄位可用同一個 domain）。**Degree（度）** 是 relation 中**屬性的數目**——即欄數（columns count）。**Cardinality（基數）** 是 relation 中**元組的數目**——即列數（rows count）。記法上：`Degree = 4` 表示 4 個屬性；`Cardinality = 3` 表示 3 行資料。

> English Standard Definitions:
> - "A domain is the set of allowable values for one or more attributes."
> - "Degree is the number of attributes in a relation."
> - "Cardinality is the number of tuples in a relation."

#### 3.1.4 Relationship（表間關係）

繁中解說：**Relationship（關係／關聯）** 指**表與表之間的邏輯連接（logical connection）**，它是基於表之間的**互動（interaction）**而建立的——例如 `Student` 表的 `programme` 欄位指向 `Programme` 表的 `pgmCode`，兩表因此產生一對多（1:M）的邏輯關係。注意：術語 "Relation" 指「一張表」，而 "Relationship" 指「表與表的連結」，兩者勿混淆——這是常見考點。

> English Standard Definitions:
> - "A relationship is a logical connection between tables established based on interaction among these tables."

#### 3.1.5 實例表：Programme 與 Student Relations

繁中解說：以教材的兩個實例表為例。**Programme relation**（課程表）有 4 個屬性：`pgmCode, name, level, semesters`，所以 **Degree = 4**；表內有 3 行課程資料，所以 **Cardinality = 3**。**Student relation**（學生表）有 8 個屬性：`stdNo, name, address, gender, DOB, phone, email, programme`，所以 **Degree = 8**；表內有 4 行學生資料，所以 **Cardinality = 4**。注意教材投影片標示的「Cardinality = 3、Degree = 4」是針對 Programme relation 而言。考試若問「某表 degree/cardinality」，方法是：**數欄位 = degree，數資料列 = cardinality**。

**Programme（Degree = 4, Cardinality = 3）：**

| pgmCode | name | level | semesters |
|---|---|---|---|
| IT114105 | HD in Software Engineering | 4 | 5 |
| IT114122 | HD in Cybersecurity | 4 | 5 |
| IT114124 | HD in AI and Smart Technology | 4 | 5 |

**Student（Degree = 8, Cardinality = 4）：**

| stdNo | name | address | gender | DOB | phone | email | programme |
|---|---|---|---|---|---|---|---|
| 200123456 | AU Tse Lok | 7F, Che Kung Miu Rd | M | 3/10/01 | 65346979 | autselok@mail.hk | IT114122 |
| 200123789 | Li Haotian | 3B, 5 Pei Ho Street | M | 31/5/02 | 39397506 | liht@me.com | IT114124 |
| 200456789 | Mak Yuen Man | 23A Chung Mei Road | F | 26/7/01 | 92806403 | mym@i.am.me.com | IT114124 |
| 190321654 | YEU Shum | 11, Ting Kok Road | F | 12/8/00 | 82766629 | i@yeushum.com | IT114122 |

#### 3.1.6 Attribute Domain（屬性值域）

繁中解說：**Attribute Domain** 與 3.1.3 的 Domain 同義——它**指定與某屬性相關聯的允許值集合**。它的作用是把「不合理的值」擋在表外：例如 `gender` 只允許 M／F，`level` 只允許合理的級別數字。Domain 是資料正確性（accuracy）的第一道防線。

> English Standard Definitions:
> - "Attribute domain specifies the set of allowable values associated with an attribute."

### 3.2 Relation 的性質（Properties of Relation）

繁中解說：一張「合法的表」必須滿足六條性質。這六條是判斷「某張表是不是 valid relation」的標準答案，也是 Chapter 9 正規化（normalization）的思想起點：

1. **Relation 名稱唯一**——relation 名稱在整個 relational schema（關聯綱要）中必須與其他所有 relation 名稱不同，不能撞名。
2. **每個屬性有獨立名稱**——同一 relation 內每個 attribute 名稱必須不同。
3. **同一屬性的值全部來自同一個 domain**——一欄內不能混雜不同類型的值。
4. **每個儲存格（cell）只含一個原子（單一）值**——即 atomic value，不允許一格內放 "football, basketball" 這種複合值；若有複合值必須拆成多列。
5. **每個 tuple 必須可被唯一識別**——即存在唯一識別鍵（為 Superkey 概念鋪路）。
6. **不允許重複的 tuple**——表中不能有兩列完全相同的資料。

教材用 `Member` 表的三個反例說明：(a) `Interest` 欄一格內寫 "football, basketball"（非原子值）→ **不合規（✗）**，正解是拆成兩列：`000123 Chan Siu Ming football` 與 `000123 Chan Siu Ming basketball`；(b) 兩列完全相同的 `Chan Siu Ming football` → **不合規（✗）**，重複 tuple 必須刪除；(c) 兩列名字、興趣相同但 `memberId` 不同（000123 與 888888）→ **合規（✓）**，因為 tuple 仍可憑 memberId 唯一識別。

> English Standard Definitions (Properties of Relation):
> - "A relation name is distinct from all other relation names in the relational schema."
> - "Each attribute has a distinct name."
> - "Values of an attribute are all from the same domain."
> - "Each cell of a relation contains exactly one atomic (single) value."
> - "Each tuple must be uniquely identifiable."
> - "There are no duplicate tuples."

### 3.3 關聯鍵（Relational Keys）

#### 3.3.1 Superkey（超鍵）

繁中解說：**Superkey** 是「能**唯一識別** relation 內一個 tuple 的**一個屬性或一組屬性**」。關鍵在「唯一識別」：只要某屬性（或屬性組合）不會讓兩列資料相同，它就是 superkey。以 `Student (stdNo, name, address, gender, DOB, phone, email)` 為例，以下全部是 valid superkeys：`stdNo`；`phone, email`（兩欄合起來）；`stdNo+name`；`name+phone`；`stdNo+email`；`stdNo+name+address`；`DOB+name+stdNo`；`phone+email+name+address`……可見 superkey 可以**有多餘屬性**（例如 `stdNo+name` 中 name 根本是冗餘的），所以 superkey 的數量很多、集合很大。

> English Standard Definitions:
> - "A superkey is an attribute, or set of attributes, that uniquely identifies a tuple within a relation."

#### 3.3.2 Candidate Key（候選鍵）— 不可再約簡性（Irreducibility）

繁中解說：**Candidate Key** 是「**任何真子集（proper subset）都不是 superkey** 的 superkey」——即**不可再約簡（irreducibility）**。換句話說，它是一個屬性或**最小的（minimal）**屬性集合，能唯一識別 tuple；拿掉其中任何一個屬性，就失去唯一識別能力。以 Student 表為例：`stdNo` ✓（單一屬性，本身唯一）；`phone` ✓（假設每個學生都有手機，且手機號不重複）；`email` ✓（假設每人有自己獨立的電郵地址）。但 `stdNo+name` ✗——因為 `stdNo` 單獨已是 superkey，加 `name` 是冗餘，並非 minimal；`name+phone` ✗——因為 `phone` 單獨已是 candidate key，`name+phone` 雖是 superkey 但可再約簡；`stdNo+name+address` ✗——同理。判別技巧：**先把所有 superkey 列出，再逐一檢查「去掉任一屬性後是否仍能唯一識別」；若去掉後仍能唯一識別，則不是 candidate key。**

> English Standard Definitions:
> - "A candidate key is a superkey such that no proper subset is a superkey within the relation — irreducibility."
> - "A candidate key is an attribute or a minimal set of attributes that uniquely identifies a tuple within a relation."

#### 3.3.3 Primary Key、Alternate Key 與 Composite Key

繁中解說：**Primary Key（主鍵）** 是「從候選鍵中**選出來**用來唯一識別 relation 內 tuple 的那個候選鍵」——每個 relation 只能選一個主鍵。習慣上在主鍵屬性下畫**單底線（underline with a single line）**，例如 `Student (stdNo, name, address, gender, DOB, phone, email)` 中 `stdNo` 畫單底線。**Alternate Key（替選鍵）** 是「**沒有被選為主鍵**的其餘候選鍵」——例如 Student 的 `phone` 與 `email` 都是 candidate keys，但主鍵選了 `stdNo`，所以 `phone`、`email` 就是 alternate keys。**Composite Key（複合鍵）** 是「由**多於一個屬性**組成的鍵」——例如 `stdNo+name`、`name+phone` 都是 composite superkeys；若某個 composite key 同時是 minimal，它就是 composite candidate key。注意：Primary Key 可以是單一屬性，也可以是 composite（由多個屬性組成）。

> English Standard Definitions:
> - "A primary key is the candidate key selected to identify tuples uniquely within the relation. It is a common practice to underline the primary key with a single line."
> - "Alternate keys are candidate keys that are not selected to be the primary key."
> - "A composite key is a key that consists of more than one attribute."

#### 3.3.4 Foreign Key（外鍵）

繁中解說：**Foreign Key** 是「某 relation 內的一個屬性或屬性集合，它**匹配（matches）**另一個（可能是同一個）relation 的 **candidate key（通常是 primary key）**」。外鍵的作用是建立表與表之間的 Relationship：例如 `Student` 表的 `programme` 屬性匹配 `Programme` 表的 `pgmCode`（主鍵），所以 `Student.programme` 是 foreign key。習慣上外鍵以**虛線底線（underline with a dashed line）**標示。兩個重要細節：(1) **candidate key 與 foreign key 可以有不同屬性名稱**——本例子兩者不同名（Student 的欄名是 programme，Programme 的欄名是 pgmCode），教材特別提醒兩者名稱可以不同；(2) 外鍵可以指向**同一個 relation**（self-referencing，例如員工表的 `managerNo` 指向同一表的 `empNo`）。

> English Standard Definitions:
> - "A foreign key is an attribute, or set of attributes, within one relation that matches the candidate key (usually the primary key) of some (possibly the same) relation."
> - "The candidate key and the foreign key may have distinct attribute names."

**範例（Foreign Key 如何串起兩表）：**

```
Programme (pgmCode, name, level, semesters)      ← 被參照的表（Parent Relation）
Student  (stdNo, name, address, gender, DOB, phone, email, programme)   ← programme 是 Foreign Key
```

| Programme.pgmCode | （主鍵） | | Student.programme | （外鍵） |
|---|---|---|---|---|
| IT114105 | HD in Software Engineering | | 200123456 | IT114122 |
| IT114122 | HD in Cybersecurity | | 200123789 | IT114124 |
| IT114124 | HD in AI and Smart Technology | | 200456789 | IT114124 |
| | | | 190321654 | IT114122 |

### 3.4 關聯完整性（Relational Integrity）

#### 3.4.1 Relational Integrity Constraint 總論

繁中解說：**Relational Integrity Constraint（關聯完整性約束）** 是「用來確保關聯式資料庫中資料的**準確性與一致性（accuracy and consistency）**的規則」。重點：**DBMS 負責執行（enforce）這些約束規則**，並且**拒絕所有不符合完整性要求的資料（rejects all data that do not meet the integrity requirements）**——所以「壞資料進不來」不是靠程式員自律，而是 DBMS 的強制行為。教材把完整性約束分為四類：**Null、Entity Integrity、Referential Integrity、General Constraint**。

> English Standard Definitions:
> - "A relational integrity constraint is a rule used to ensure accuracy and consistency of data in a relational database."
> - "The DBMS is responsible for enforcing the constraint rules and rejects all data that do not meet the integrity requirements."

#### 3.4.2 Null（空值）

繁中解說：**Null** 代表「屬性值**目前未知（unknown）或不適用（not applicable）**」——用來處理**不完整或例外的資料（incomplete or exceptional data）**。它是「**沒有值**」的表示，**不是零（zero）也不是空格（spaces）**——因為零和空格本身都是「值」，而 Null 是「值缺席」。例如學生未提供電郵地址時，`email` 欄可放 NULL，表示「暫時不知道／沒有」。考點：NULL ≠ 0 ≠ ' '（空格），三者概念不同。

> English Standard Definitions:
> - "Null represents a value for an attribute that is currently unknown or not applicable."
> - "Null deals with incomplete or exceptional data."
> - "Null represents the absence of a value and is not the same as zero or spaces, which are values."

#### 3.4.3 Entity Integrity（實體完整性）

繁中解說：**Entity Integrity** 規定：**主鍵屬性必須唯一（unique）且不可為空（not null）**。應用在 Programme 表：既然 `pgmCode` 是主鍵，則 (1) 不能插入一個 `pgmCode` 為 NULL 的 tuple——例如「NULL | HD in AI and Smart Technology | 4 | 5」會被拒絕（✗）；(2) `pgmCode` 的值不能重複——例如再插入一條 `IT114122`（已存在）也會被拒絕（✗）。口訣：「**主鍵 = 唯一 + 非空**」。

> English Standard Definitions:
> - "Entity integrity: primary key attribute(s) must be unique and not null."
> - "As pgmCode is the primary key of the Programme relation, a tuple with NULL for the pgmCode attribute should not be inserted into the relation. Moreover, values of pgmCode should not be repeated."

#### 3.4.4 Referential Integrity（參照完整性）

繁中解說：**Referential Integrity** 規定：**若某 relation 存在外鍵，則外鍵值「要麼匹配其父 relation（parent relation）中某個 tuple 的 candidate key 值，要麼外鍵值必須完全為 NULL（wholly null）」**。其中 **Parent Relation** 是指「在關係中與 candidate key 相關的那個 relation」——即被參照的表（本例為 Programme）。應用在 Student 表：`Student.programme` 是參照 `Programme.pgmCode` 的外鍵，所以 `Student.programme` 要麼必須等於 `Programme` 表中已存在的某個 `pgmCode` 值，要麼必須完全為 NULL。反例：除非 `Programme` 表已有 `pgmCode = IT010101` 的記錄，否則**不可能**建立 `programme = "IT010101"` 的 Student tuple——插入會被 DBMS 拒絕（✗）。本例子中 Programme 是 **Parent Relation（父表）**，Student 是 **Child Relation（子表）**。

> English Standard Definitions:
> - "Referential integrity: if a foreign key exists in a relation, either the foreign key value must match a candidate key value of some tuple in its parent relation, or the foreign key value must be wholly null."
> - "A parent relation is the relation that the candidate key is related to in a relationship."
> - "It is not possible to create a Student tuple with programme 'IT010101' unless there is already a record for pgmCode 'IT010101' in the Programme relation."

#### 3.4.5 Referential Integrity 的執行策略：Cascade 與 Restrict

繁中解說：當父表的主鍵被**更新（update）**或**刪除（delete）**時，子表的外鍵如何反應？教材給出三種策略，前兩種是 **Cascade**（連鎖反應），第三種是 **Restrict**（禁止操作）：

**A. 更新主鍵時（Cascade Update vs Restrict）：**
- **Cascade Update**：`Programme.pgmCode` 更新時，**觸發（trigger）**`Student.programme` 一併更新——把所有相關的 `Student.programme` 同步改成新值；或
- **Restrict（更新）**：**禁止**更新 `pgmCode = IT114122`，因為有相關的學生（related students）存在。
- 例子：`IT114122` 改為 `IT114130` 後，四位學生中所有 `programme = IT114122` 的都改成 `IT114130`（AU Tse Lok 與 YEU Shum）。

**B. 刪除主鍵時（Cascade Delete vs Restrict）：**
- **Cascade Delete** 的第一種做法：刪除 `Programme.pgmCode` 時，把所有相關的 `Student.programme` **更新為 NULL**（因為學生的課程被刪了，但學生記錄本身保留）；或
- **Cascade Delete** 的第二種做法：**刪除所有相關的學生**（例如刪除 `IT114124` 時，連帶刪除 Li Haotian 與 Mak Yuen Man 兩條學生記錄）；或
- **Restrict（刪除）**：**禁止**刪除 `pgmCode = IT114124`，因為有相關的學生存在。
- 例子：刪除 `IT114124` 後，Li Haotian 與 Mak Yuen Man 的 `programme` 變成 NULL。

**速記框架：** Cascade = 「連動處理」；Restrict = 「有相關記錄就禁止」。選哪一種取決於商業規則——若學生沒課程仍要保留學生資料，選「設為 NULL」；若學生資料依賴課程而存在，選「連帶刪除」；若要防止誤刪重要父記錄，選「Restrict」。

> English Standard Definitions:
> - "Cascade update: an update of Programme.pgmCode should trigger an update of Student.programme — update all related Student.programme accordingly; or restrict the update of the programme IT114122 because there are related student(s)."
> - "Cascade delete: a delete of Programme.pgmCode should trigger an update of all related Student.programme to NULL; or delete all the related students; or restrict the delete of the programme IT114124 because there are related student(s)."

**Cascade Update 範例（IT114122 → IT114130）：**

| Programme.pgmCode | name | | Student.programme（更新後） |
|---|---|---|---|
| IT114130（原 IT114122） | HD in Cybersecurity | | 200123456 → IT114130 |
| IT114124 | HD in AI and Smart Technology | | 200123789 → NULL（若刪除 IT114124） |
| | | | 200456789 → NULL（若刪除 IT114124） |
| | | | 190321654 → IT114130 |

#### 3.4.6 General Constraint（一般約束）

繁中解說：**General Constraint** 是「由**用戶或資料庫管理員（database administrators）**額外指定的、資料必須滿足的規則」——它是前三類完整性之外的「自訂規則」。例子：(1) `Programme (pgmCode, name, level, credit, year)`——「HD 課程的 credit 值必須介乎 250 至 400 之間」(`The credit value for a HD programme is between 250 and 400`)；(2) `Student (...)`——「學生的年齡必須為 18 歲或以上」(`The age of student must be 18 or above`)。General Constraint 對應日後 SQL 的 `CHECK` 約束。

> English Standard Definitions:
> - "A general constraint is an additional rule, specified by users or database administrators, that the data must satisfy."
> - "E.g., The credit value for a HD programme is between 250 and 400; the age of a student must be 18 or above."

#### 3.4.7 延伸預告：這些約束在 SQL 中如何落地（Chapter 3 預告）

繁中解說：本章只講「模型層」的規則；Chapter 3（Relational DDL）會用 `CREATE TABLE` 把這些規則寫成 SQL 約束。下面是對應關係的預告（只作理解，考試細節在 Chapter 3）：

```sql
CREATE TABLE Programme (
    pgmCode   CHAR(8)     PRIMARY KEY,          -- Entity Integrity
    name      VARCHAR(50) NOT NULL,
    level     INT         NOT NULL,
    semesters INT         NOT NULL
);

CREATE TABLE Student (
    stdNo     CHAR(9)     PRIMARY KEY,          -- Entity Integrity
    name      VARCHAR(50) NOT NULL,
    gender    CHAR(1)     CHECK (gender IN ('M','F')),   -- General Constraint
    programme CHAR(8),
    FOREIGN KEY (programme) REFERENCES Programme(pgmCode) -- Referential Integrity
        ON UPDATE CASCADE   -- Cascade Update
        ON DELETE SET NULL  -- Cascade Delete（把外鍵設為 NULL）
);
```

## 📖 4. 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| Database | 資料儲存的邏輯結構 | "A database is a logical structure of the data storage." |
| Relation | 有關有列的 Table，關聯模型的基石 | "A relation is a table with columns and rows." |
| Tuple / Record | relation 中的一行，一個具體實例 | "A tuple/record is a row of a relation." |
| Attribute / Field | relation 中有名字的一欄 | "An attribute/field is a named column of a relation." |
| Domain | 一個或多個屬性的允許值集合 | "A domain is the set of allowable values for one or more attributes." |
| Attribute Domain | 與特定屬性相關聯的允許值集合 | "Attribute domain specifies the set of allowable values associated with an attribute." |
| Degree | 屬性的數目（欄數） | "Degree is the number of attributes in a relation." |
| Cardinality | 元組的數目（列數） | "Cardinality is the number of tuples in a relation." |
| Relationship | 表與表之間的邏輯連接 | "A relationship is a logical connection between tables established based on interaction among these tables." |
| Properties of Relation | 合法表的六項性質（唯一名、同域、原子值、唯一識別、無重複） | "Each cell of a relation contains exactly one atomic (single) value. Each tuple must be uniquely identifiable. There are no duplicate tuples." |
| Superkey | 能唯一識別 tuple 的屬性或屬性組合（可含冗餘） | "A superkey is an attribute, or set of attributes, that uniquely identifies a tuple within a relation." |
| Candidate Key | 任何真子集都不是 superkey 的 superkey（minimal） | "A candidate key is a superkey such that no proper subset is a superkey within the relation — irreducibility." |
| Primary Key | 被選中作唯一識別用的候選鍵（單底線標示） | "A primary key is the candidate key selected to identify tuples uniquely within the relation." |
| Alternate Key | 未被選為主鍵的其餘候選鍵 | "Alternate keys are candidate keys that are not selected to be the primary key." |
| Composite Key | 由多於一個屬性組成的鍵 | "A composite key is a key that consists of more than one attribute." |
| Foreign Key | 匹配他表 candidate key（通常主鍵）的屬性（組） | "A foreign key is an attribute, or set of attributes, within one relation that matches the candidate key (usually the primary key) of some (possibly the same) relation." |
| Relational Integrity Constraint | 確保資料準確性與一致性的規則，由 DBMS 執行 | "A relational integrity constraint is a rule used to ensure accuracy and consistency of data in a relational database. The DBMS is responsible for enforcing the constraint rules and rejects all data that do not meet the integrity requirements." |
| Null | 表示值「未知或不適用」，不是零或空格 | "Null represents the absence of a value and is not the same as zero or spaces, which are values." |
| Entity Integrity | 主鍵必須唯一且非空 | "Entity integrity: primary key attribute(s) must be unique and not null." |
| Referential Integrity | 外鍵值須匹配父表 candidate key，或完全為 NULL | "If a foreign key exists in a relation, either the foreign key value must match a candidate key value of some tuple in its parent relation, or the foreign key value must be wholly null." |
| Parent Relation / Child Relation | 被參照的表／含外鍵的表 | "A parent relation is the relation that the candidate key is related to in a relationship. The child relation holds the foreign key." |
| Cascade Update | 父鍵更新時連動更新子表外鍵 | "An update of Programme.pgmCode should trigger an update of Student.programme — update all related Student.programme accordingly." |
| Cascade Delete | 父鍵刪除時把子表外鍵設 NULL 或刪除相關子記錄 | "A delete of Programme.pgmCode should trigger an update of all related Student.programme to NULL; or delete all the related students." |
| Restrict | 有相關子記錄時禁止更新／刪除父鍵 | "Restrict the update/delete of the programme because there are related student(s)." |
| General Constraint | 用戶或 DBA 自訂的資料規則 | "A general constraint is an additional rule, specified by users or database administrators, that the data must satisfy." |
| Irreducibility | 候選鍵的不可再約簡性質 | "No proper subset of a candidate key is a superkey — irreducibility." |
| Atomic value | 每個儲存格只有單一值 | "Each cell of a relation contains exactly one atomic (single) value." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

**第一步：先理解甚麼觀念（Understand）**
1. 先分清「Relation = 表」與「Relationship = 表間連結」——這是全課的詞彙基礎。
2. 用 Programme／Student 實例表，逐格指認：哪一列是 tuple？哪一欄是 attribute？數一數 Degree（欄數）與 Cardinality（列數）——**見到表就先數欄數、列數**。
3. 理解 Domain 是「允許值集合」，理解 Null 是「沒有值」，不是 0 也不是空格。
4. 理解鍵的層級：Superkey（可冗餘）→ Candidate Key（最小）→ Primary Key（被選中）→ Alternate Key（落選）→ Foreign Key（去匹配別人的主鍵）。
5. 理解兩條完整性規則的「禁止行為」：Entity Integrity 禁止主鍵為 NULL／重複；Referential Integrity 禁止外鍵指向不存在的父鍵值。

**第二步：再背誦甚麼英文短語（Memorize）**
1. 背熟 Module 4 表格中的定義句——優先背：Relation、Tuple、Attribute、Domain、Degree、Cardinality、Superkey、Candidate Key（含 irreducibility）、Primary Key、Foreign Key、Entity Integrity、Referential Integrity、Null。
2. 背熟「判斷框架句」：candidate key 用 "no proper subset is a superkey"；referential integrity 用 "must match a candidate key value ... or must be wholly null"。
3. 背熟三種執行策略的動詞對：trigger／update／delete／restrict／set to NULL。

**第三步：掌握甚麼計算/寫法（Practice）**
1. 練「數 Degree／Cardinality」：給任何表，數欄得 degree、數列得 cardinality。
2. 練「列舉 superkeys」：把含主鍵屬性的所有組合列出來（如 stdNo、stdNo+name、name+phone+…）。
3. 練「判別 candidate key」：對每個 superkey 檢查「去掉一個屬性還能不能唯一識別」——能，就劃掉；不能，就是 candidate key。
4. 練「完整性判斷題」：給出待插入資料（例如 pgmCode=NULL、重複 IT114122、programme=IT010101），判斷會被 DBMS 接受還是拒絕，並用英文規則句解釋。
5. 練「Cascade vs Restrict」：父鍵更新／刪除時，寫出子表資料會變成甚麼（全部同步？變 NULL？被刪？還是操作被禁止？）。

**第四步：能解答甚麼英文考題（Exam Ready）**
1. "Define the following terms: relation, tuple, attribute, domain, degree, cardinality." ——直接默寫定義句。
2. "List the properties of a relation." ——默寫六條性質。
3. "Identify the primary key, candidate keys, alternate keys and foreign keys in the given relations." ——在實例表上標示。
4. "Explain why stdNo+name is NOT a candidate key of Student." ——答：because stdNo alone is already a superkey, so stdNo+name is reducible (not minimal).
5. "Can a Student tuple with programme 'IT010101' be inserted? Explain." ——答：No, because of referential integrity — the foreign key value must match a candidate key value in the parent relation, and no such pgmCode exists.
6. "What are the options when updating/deleting a parent key with related child tuples?" ——答：Cascade update/delete or restrict.

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 6.1 關鍵數字速記
- **Degree** = 屬性數 = **欄數**（Programme 的 Degree = 4；Student 的 Degree = 8）
- **Cardinality** = 元組數 = **列數**（Programme 的 Cardinality = 3；Student 的 Cardinality = 4）
- **Relation 六大性質**：唯一關係名、屬性名不同、同域、原子值、tuple 唯一可識別、無重複 tuple
- **鍵的層級**：Superkey（可冗餘）⊃ Candidate Key（minimal）⊃ Primary Key（被選中）＋ Alternate Key（落選者）＋ Foreign Key（指向別人）
- **Entity Integrity**：主鍵 = 唯一 + 非空（2 條禁令）
- **Referential Integrity**：外鍵 = 匹配父表 candidate key 或 wholly null（2 個出路）
- **General Constraint 例子**：HD credit 250–400；學生年齡 ≥ 18

### 6.2 語法／符號對照表
| 符號／寫法 | 意思 |
|---|---|
| `Student (stdNo, name, …)` | 關係記法：括號內為屬性列表 |
| `stdNo`（單底線） | Primary Key 標示 |
| `programme`（虛線底線） | Foreign Key 標示 |
| NULL | 未知／不適用；≠ 0、≠ 空格 |
| `stdNo+name` | Composite Key（複合鍵）寫法 |
| Cascade Update | 父鍵改 → 子外鍵全部同步改 |
| Cascade Delete | 父鍵刪 → 子外鍵設 NULL **或** 連帶刪子記錄 |
| Restrict | 有相關子記錄 → 禁止更新／刪除 |

### 6.3 英文極速記憶口訣（Mnemonics）
- **「T-A-D-D-C-R」**：Table = **T**uple（行）**A**ttribute（欄）**D**omain（值域）**D**egree（欄數）**C**ardinality（列數）**R**elationship（表間連結）。
- **Super → Candidate：記「minimal / irreducibility」**——candidate key 是「再拆就拆不動」的 superkey："no proper subset is a superkey"。
- **Primary vs Alternate：記「被選中的 vs 落選的」**——"selected" vs "not selected"。
- **Entity Integrity：記「PK = Unique + NOT NULL」**。
- **Referential Integrity：記「Match or NULL」**——外鍵要麼匹配父鍵，要麼 wholly null。
- **Cascade vs Restrict：記「連動 vs 禁止」**——"trigger the update/delete" vs "restrict because there are related students"。
- **Null：記「absent ≠ zero ≠ space」**。

### 6.4 一條龍答題模板（適用「給表判斷完整性」題）
> "According to **entity integrity**, the primary key `pgmCode` must be **unique and not null**; therefore the tuple with NULL/repeated pgmCode is **rejected by the DBMS**. According to **referential integrity**, the foreign key `Student.programme` must either **match a candidate key value** in the parent relation `Programme`, or be **wholly null**; therefore a Student tuple with programme 'IT010101' **cannot be inserted** because no such pgmCode exists in `Programme`."
