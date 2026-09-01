# ITP4456 L1: Introduction to Database Systems — 雙語應考學習指南

> **來源**：ITP4456 Database Applications — Chapter 1: Introduction to Database Systems
> **原始檔**：`01_Raw_Materials/Lectures/Lecture1_IntroductionToDatabaseSystems.pptx`
> **閱讀方法**：繁中解說理解邏輯 → 英文 Blockquote 直接背誦 → 對比表（File-based vs DBMS、NoSQL vs Relational）自行默寫一次

---

## 📝 1. 課程概要與實務情境（Summary & Real-world Context）

本課是整個資料庫課程的「概念總覽」，為日後的 SQL、資料建模與應用開發鋪路。內容分六大塊：**Database Concepts**（Data／Information／Database 的定義、Metadata、Schema、Data Dictionary、CRUD）、**File-based Systems** 的問題、**DBMS**（Database Management System）的優缺點、**Three-Level Architecture**（ANSI-SPARC 三層架構）、**Relational Database**（關聯模型術語與 ACID），以及 **NoSQL Database**（動態 Schema、JSON、與關聯式資料庫的選擇考量）。整課的判斷主軸是：**「甚麼時候用甚麼儲存格式」**——這正是 Module Intended Learning Outcome（評估並選擇最合適的儲存格式以滿足安全與成本要求）的核心。

技術關聯性：本課建立了三個反覆出現的對比框架——(1) File-based vs DBMS（為何要引入資料庫）；(2) Relational vs NoSQL（現今兩大資料庫陣營的取捨）；(3) Three-Level Architecture（為何用戶不需知道物理儲存細節）。其中 **Data Redundancy → Data Inconsistency** 的因果鏈、**Program-Data Independence** 的定義，以及 **ACID** 與 **CRUD** 這兩個縮寫，是往後每課都會用到的術語基礎。

實務情境一：學校 IT 部門發現：Department 與 Campus Secretariat 各自維護一份學生資料（programme & module vs programme & payment），同一學生在兩邊的資料不一致——這就是講義所說的 **File-based Systems** 的 **Data Redundancy** 與 **Data Inconsistency** 問題。引入 DBMS 把資料集中管理後，每項基本事實（primary fact）只記錄一次。

實務情境二：初創公司要為社交應用選資料庫：若需要 **ACID guarantees**、資料高度結構化、以關聯表達，選 **Relational**；若資料動態多變、可巢狀存放於少數 collection、需要極快寫入與水平擴展（horizontal scaling），則選 **NoSQL**（例如 MongoDB 以 JSON 文件儲存）。本課末段的對比表就是這類決策的答題框架。

## 🎯 2. 考試學習目標（Learning Objectives）

考官會測試以下能力（附英文對照）：

1. **定義核心詞彙** — Define data, information, database, metadata, schema, and data dictionary
2. **解釋 Data in Context** — Explain why raw data needs context to become meaningful
3. **列出 CRUD 四種操作** — Describe the four basic CRUD operations (Create, Read, Update, Delete)
4. **指出 File-based Systems 的缺點** — Explain the problems of program-data dependence in file-based systems
5. **定義並列舉 DBMS 優缺點** — Define DBMS and list its advantages and disadvantages
6. **比較 File-based 與 DBMS** — Compare file-based systems with DBMS (redundancy, consistency, sharing, security, independence)
7. **解釋 Three-Level Architecture** — Explain the objectives and the three levels of the ANSI-SPARC architecture
8. **應用關聯模型術語** — Apply relational model terminology: relation, attribute, domain, tuple, degree, cardinality, relationship
9. **解釋 ACID 屬性** — Explain the ACID properties of reliable transactions
10. **說明 Relational 的局限** — Describe the disadvantages of relational databases (scalability, schema change)
11. **比較 NoSQL 與 Relational** — Decide when to use NoSQL vs relational databases

## 📖 3. 雙語深度知識點重寫（Comprehensive Notes — 應考完全替代版）

### 3.1 資料庫概念（Database Concepts）

#### 3.1.1 Data、Information 與 Database 的定義

繁中解說：三個詞彙層層遞進。**Data**（資料）是電腦可以處理的有意義事實——文字、圖形、影像、聲音、影片片段等。**Information**（資訊）是經過處理、對決策有用的資料；資訊是「被詮釋的資料」（interpreted data）、是由資料衍生出來的知識（knowledge derived from data）。**Database**（資料庫）是邏輯上相關的資料加上對這些資料的描述（description）所組成的有組織集合，設計目的是滿足某機構的資訊需求——注意定義中「加上描述」就是指 metadata。

> English Standard Definitions:
> - "Data are meaningful facts, text, graphics, images, sound, video segments etc., which can be processed by a computer."
> - "Information is data processed to be useful in decision making. Information is interpreted data. Information is knowledge derived from data."
> - "A database is an organized collection of logically related data, and a description of this data, designed to meet the information needs of an organization."

#### 3.1.2 Data in Context（資料需要情境）

繁中解說：原始資料（raw data）本身幾乎沒有意義；把資料放在一起形成情境（context）之後，資料之間產生關聯，才創造出意義。例如單獨一個「1990」沒意義，但放在「出生年份」欄位中就有意義。

> English Standard Definitions:
> - "Data are useless in their present form; raw data carries little or no meaning."
> - "By placing data together to form a context, data are now related to create meaning."

#### 3.1.3 Metadata、Schema 與 Data Dictionary

繁中解說：**Metadata** 是「關於資料的資料」（data about data），描述資料的屬性／特性，例如 purpose（用途）、time and date（時間日期）、creator（建立者）、location（位置）。**Schema** 是資料庫的結構——例如 tables、views、routines 等結構性 metadata。**Data Dictionary**（資料字典）為資料集合提供情境，例如一個存放描述性 metadata 的儲存庫（repository）。

> English Standard Definitions:
> - "Metadata is data about data - it describes the properties/characteristics, e.g. purpose, time and date, creator, location."
> - "A schema is the structure of a database, e.g. tables, views, routines, structural metadata."
> - "A data dictionary gives context to a collection of data, e.g. a repository of descriptive metadata."

#### 3.1.4 CRUD 操作（四大基本儲存功能）

繁中解說：資料庫有四大基本功能，縮寫為 **CRUD**：**Create**（建立）——把新記錄／文件插入資料庫；**Read**（讀取）——從資料庫檢索記錄／文件；**Update**（更新）——更新資料庫中的記錄／文件；**Delete**（刪除）——刪除資料庫中的記錄／文件。

> English Standard Definitions:
> - "CRUD operations: Create - insert new records/documents into the database; Read - retrieve records/documents from the database; Update - update records/documents in the database; Delete - delete records/documents in the database."

### 3.2 File-based Systems（檔案系統）

#### 3.2.1 甚麼是 File-based System

繁中解說：**File-based System** 是一組為最終用戶提供服務（例如報告）的應用程式集合，但**每個程式各自定義與管理自己的資料**。例子：Department 寫自己的程式處理學生資訊（programme & module）；Campus Secretariat 有自己的程式處理學生資訊（programme & payment）——同一批學生資料被不同部門重複維護。

> English Standard Definitions:
> - "A file-based system is a collection of application programs that perform services for the end users (e.g. reports)."
> - "Each program defines and manages its own data."

#### 3.2.2 Program-Data Dependence 的問題

繁中解說：檔案系統最大的問題是 **Program-Data Dependence（程式與資料相依）**：(1) 每個應用程式必須維護自己的資料；(2) 每個程式都要為每個檔案的 metadata 編寫程式碼；(3) 每個程式都要有自己的處理程序（reading、inserting、updating、deleting）；(4) 缺乏協調與中央控制；(5) 檔案格式不標準（non-standard file formats）；(6) 若檔案的實體儲存改變，存取該檔案的應用程式碼必須跟著改；(7) 若檔案結構改變，所有存取該資料的應用程式碼都要修改以適應新結構。

> English Standard Definitions:
> - "Each application program must maintain its own data; each application program needs to include code for the metadata of each file; each application program must have its own processing routines for reading, inserting, updating and deleting data."
> - "There is a lack of coordination and central control, and non-standard file formats."
> - "If the file's physical storage changes, the application code for accessing that file is required to change or update. If the file structure is changed, all application code that accesses this data needs to be changed to adapt to the new structure."

### 3.3 DBMS（資料庫管理系統）

#### 3.3.1 DBMS 的定義

繁中解說：**Database Management System (DBMS)** 是一套軟體的集合，讓用戶能夠**定義（define）、建立（create）、維護（maintain）**資料庫，並對資料庫提供**受控制的存取（controlled access）**。

> English Standard Definitions:
> - "A Database Management System (DBMS) is a collection of software that enables users to define, create, maintain and provide controlled access to the database."

#### 3.3.2 DBMS 的優點（Advantages）

繁中解說：DBMS 的八個優點：
1. **Minimal Data Redundancy（最小資料冗餘）**——資料庫方法把以往分離的資料檔（例如 client data）整合成單一邏輯結構；每項基本事實（primary fact）只在資料庫中記錄一次
2. **Improved Data Consistency（改善資料一致性）**——消除冗餘後，不一致（inconsistency）的機會大幅降低
3. **Enforcement of Standards（執行標準）**——資料庫管理職能可擁有單一權力點（single-point authority）來建立與執行資料標準
4. **Increased Concurrency / Data Sharing（提升並行性與資料共享）**——資料庫是共享的企業資源，允許多個用戶與應用同時存取與操作資料；授權用戶獲發一個或多個 user views
5. **Program-Data Independence（程式與資料獨立）**——把資料描述（metadata）與使用資料的應用程式分離，就是 data independence；機構的資料可（在一定限度內）演進而無需更改處理資料的應用程式
6. **Increased Productivity of Application Development（提升應用開發生產力）**——降低開發新商業應用的成本與時間
7. **Reduced Program Maintenance（減少程式維護）**——資料與應用程式更獨立，改動一方不會導致另一方要改動
8. **Improved Backup and Recovery（改善備份與復原）**——DBMS 提供資料備份方法與復原方法

> English Standard Definitions:
> - "The design goal with the database approach is that previously separate data files are integrated into a single, logical structure. Each primary fact is recorded in only one place in the database."
> - "By eliminating data redundancy, the chance of inconsistency is significantly reduced."
> - "The database administration function could be granted single-point authority for establishing and enforcing data standards."
> - "A database is designed as a shared corporate resource; it allows multiple users and applications to access and manipulate the data concurrently."
> - "The separation of data descriptions (metadata) from the application programs that use the data is called data independence."
> - "This property allows an organization's data to change and evolve (within limits) without changing the application programs that process the data."

#### 3.3.3 DBMS 的缺點（Disadvantages）

繁中解說：DBMS 也有代價：**Complexity**（極度複雜的軟體）、**Size**（體積龐大）、**Cost**（成本——DBMS 軟體費用、額外硬體費用、轉換成本：從 legacy system 轉換資料及員工培訓、資料遷移 data migration 成本）、**Performance**（檔案系統針對特定應用編寫，而 DBMS 為一般用途編寫，效能未必最優）、**Higher Impact of a Failure**（故障影響更大）。

> English Standard Definitions:
> - "A DBMS is an extremely complex software."
> - "Costs include the DBMS software, additional hardware, conversion (data conversion from legacy systems and staff training), and data migration costs."
> - "File-based systems are written for a specific application, while a DBMS is written for more general use."

#### 3.3.4 File-based vs DBMS 對比

| 比較項目 | File-Based Systems | DBMS |
|---|---|---|
| Data Redundancy | 不同系統／程式各自保存同一資料的副本 → 冗餘程度高 | 集中管理與控制儲存 → 每項 primary fact 只記錄一次 |
| Data Consistency | 高冗餘常導致資料不一致 | 消除冗餘 → 不一致機會大幅降低 |
| Data Sharing | 資料分散在不同檔案，每個應用有自己的檔案，難共享 | 資料集中並標準化管理 → 不同應用可輕鬆共享 |
| Data Security | 安全性較低；存取控制機制有限；加密要逐檔手動實施 | 提供複雜安全功能：Access Control、Encryption、Auditing、Backup and Recovery |
| Data Independence | 缺乏資料獨立性 | 提供資料獨立性 |

> English Standard Definitions:
> - "The file-based systems often involve different systems/programs that have separate copies of the same data, leading to a high level of data redundancy."
> - "DBMS reduce data redundancy by managing data centrally and controlling its storage."
> - "DBMS provides different and complex security features, including access control, encryption, auditing, and data backup and recovery."

### 3.4 Three-Level Architecture（三層架構）

#### 3.4.1 目標（Objectives）

繁中解說：三層架構的目標有六點：(1) 所有用戶都應能存取同一份資料；(2) 用戶的 view 不受其他 view 的變更影響；(3) 用戶無需知道資料庫實體儲存的細節；(4) 概念結構（conceptual structure）的變更不應影響用戶；(5) 資料庫儲存結構的變更不應影響用戶的 views；(6) 內部結構不應受儲存實體層面的變更影響。總括而言：**分層隔離，各層變更互不波及**。

> English Standard Definitions:
> - "All users should be able to access the same data. A user's view is immune to changes made in other views."
> - "Users should not need to know physical database storage details."
> - "Change of the conceptual structure of the database should not affect users. Change of database storage structures should not affect users' views."

#### 3.4.2 ANSI-SPARC 三層

繁中解說：**ANSI-SPARC Three-level Architecture** 把資料庫分為三層：**External Level**（外部層）——個別用戶的 views（每用戶可有多個 view）；**Conceptual Level**（概念層）——整個機構的「社群觀點」（community view），描述整體邏輯結構；**Internal Level**（內部層）——資料的實體儲存（physical storage）細節。三層之間由 mapping 連接，令上層變更不會影響下層。

> English Standard Definitions:
> - "The ANSI-SPARC three-level architecture separates the database into the external level (individual user views), the conceptual level (the community view of the whole database), and the internal level (physical storage)."

### 3.5 Relational Database（關聯式資料庫）

#### 3.5.1 關聯模型術語（Relational Model Terminology）

繁中解說：關聯模型的七個核心術語：
- **Relation（關聯）** = **Table**（有欄有列的表）；是資料庫的邏輯結構——注意資料在關聯中不一定以行列的實體形式存放
- **Attribute / Field（屬性／欄位）** = 具名的 **Column（欄）**
- **Domain（值域）** = 一個或多個 attribute 的允許值集合——例如 age 的 domain 可以是 0 至 120 之間的任何整數
- **Tuple / Record（元組／記錄）** = **Row（列）**
- **Degree（度）** = 一個 relation 中 attribute 的數目
- **Cardinality（基數）** = 一個 relation 中 tuple 的數目
- **Relationship（關係）** = 表與表之間基於互動而建立的邏輯連接

> English Standard Definitions:
> - "A relation is a table with columns and rows; it is the logical structure of the database. Data in a relation may not be physically structured in rows and columns."
> - "An attribute/field is a named column of a relation."
> - "A domain is the set of allowable values for one or more attributes, e.g. the domain of an age attribute might be any integer between 0 and 120."
> - "A tuple/record is a row of a relation."
> - "Degree is the number of attributes in a relation; cardinality is the number of tuples in a relation."
> - "A relationship is a logical connection between tables established based on interaction among these tables."

#### 3.5.2 實例：Programme 與 Student 兩個 Relations

繁中解說：以講義的例子為準——Programme relation 有 4 個 attributes（pgmCode、name、level、semesters），**Degree = 4**，有 3 列資料（IT114105、IT114122、IT114124），**Cardinality = 3**。Student relation 有 8 個 attributes（stdNo、name、address、gender、DOB、phone、email、programme），每列是一個 **Tuple**；兩個 relations 透過 programme（如 IT114122）建立 **Relationship**。答題時必須能指出圖中哪個是 Relation、Attribute、Tuple、Degree、Cardinality、Relationship。

> English Standard Definitions:
> - "In the Programme relation, degree = 4 (four attributes) and cardinality = 3 (three tuples)."

#### 3.5.3 ACID 屬性

繁中解說：**ACID** 是一組屬性，保證關聯式資料庫管理系統（RDBMS）中的交易（transactions）被可靠地處理。四個字母分別是：**Atomicity（原子性）**——交易要麼全部完成、要麼全部不發生；**Consistency（一致性）**——交易前後資料庫都處於一致狀態；**Isolation（隔離性）**——並行交易互不干擾；**Durability（持久性）**——交易完成後其效果永久保存（即使系統故障）。

> English Standard Definitions:
> - "ACID is a set of properties that guarantee that database transactions are processed reliably in a relational database management system."
> - "ACID stands for Atomicity, Consistency, Isolation, and Durability."

#### 3.5.4 Relational Database 的缺點

繁中解說：關聯式資料庫在資料結構較簡單、較**靜態（static）**時表現良好；但隨着科技與 big data 應用進步，傳統關聯式資料庫難以應付**快速膨脹的資料量**與**越來越複雜的資料結構**：(1) **水平擴展（Horizontal scaling）**——加入更多伺服器到資料庫——困難且有限（可能需要額外層，例如 MySQL Cluster、Citrus）；(2) 改變 schema 結構極度昂貴、耗時，而且經常涉及停機或服務中斷。

> English Standard Definitions:
> - "Relational databases work well when data structures were much simpler and more static."
> - "Horizontal scaling (adding more servers) is difficult and limited; additional layers may be required, e.g. MySQL Cluster."
> - "Changing the schema structure can be extremely expensive, time-consuming, and often involve downtime or service interruptions."

### 3.6 NoSQL Database

#### 3.6.1 NoSQL 的特點

繁中解說：**NoSQL**（非關聯式）資料庫因為提供**更靈活（flexible）、可擴展（scalable）且成本效益更高（cost-efficient）**的資料庫而日益流行。NoSQL 資料庫具有**動態 Schema（dynamic schema）**，允許以 **JSON** 格式存放「非結構化資料（unstructured data）」，**無需事先定義 schema**。例子（MongoDB 風格的文件）：`{ _id: <ObjectId1>, username: "123xyz", contact: { phone: "123-456-7890", email: "xyz@example.com" } }`；存取可用 `db.users.find({ "contact.email": "xyz@example.com" })`。NoSQL 亦支援**可選的 Schema Validator**（以 `$jsonSchema` 定義 bsonType 與 required 欄位，例如 username 必須是 string、contact 必須包含 email），即「彈性為主，需要時仍可強制結構」。

> English Standard Definitions:
> - "NoSQL databases are non-relational and became more popular for offering more flexible, scalable and cost-efficient databases."
> - "NoSQL databases feature dynamic schema and allow 'unstructured data' in JSON format without having to first define the schema."
> - "An optional schema validator (e.g. $jsonSchema) can enforce structure, such as required fields and bsonType."

#### 3.6.2 NoSQL vs Relational：選擇考量

繁中解說：甚麼時候用 NoSQL、甚麼時候用 Relational？

| 考慮因素 | 考慮 NoSQL 的情況 | 考慮 Relational 的情況 |
|---|---|---|
| ACID | 工作負載不需要 ACID 保證 | 必須有 ACID 保證 |
| 資料特性 | 資料動態、經常改變 | 資料可預測、高度結構化 |
| 關係 | 資料可在無關係下表達 | 資料最適合以關聯方式表達 |
| 結構 | 資料通常巢狀（nested）合併於少數 collections | 資料分佈於多張 tables |
| 寫入 | 需要快速寫入、寫入安全非關鍵 | 寫入安全是要求 |
| 擴展 | 水平與垂直擴展皆可行 | 垂直擴展可行，但水平擴展困難 |
| 效能 | 大量簡單讀寫請求下效能極佳 | 每秒大量讀寫查詢時有限制 |

> English Standard Definitions:
> - "Consider a NoSQL datastore when your workloads don't require ACID guarantees, your data is dynamic and frequently changes, data can be expressed without relationships, data is typically nested in a few collections, and you need fast writes."
> - "Consider a relational database when ACID guarantees are required, your data is predictable and highly structured, data is best expressed relationally, write safety is a requirement, and vertical scaling is preferred."

### 3.7 Top Databases（熱門資料庫）

繁中解說：講義末段以圖表比較熱門的 NoSQL 與 Relational 資料庫：NoSQL 陣營常見代表如 MongoDB（本課 JSON 例子即用它）；Relational 陣營常見代表如 MySQL、Oracle、SQL Server、PostgreSQL 等。記住 MongoDB 屬 NoSQL、MySQL／Oracle／SQL Server／PostgreSQL 屬 Relational 即可應付常見選擇題。

> English Standard Definitions:
> - "Popular relational databases include MySQL, Oracle, SQL Server, and PostgreSQL; popular NoSQL databases include MongoDB."

## 📖 4. 必考英文單字與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/縮寫 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| :--- | :--- | :--- |
| Data | 資料；可被電腦處理的事實 | "Data are meaningful facts, text, graphics, images, sound, video segments etc., which can be processed by a computer." |
| Information | 資訊；經處理、對決策有用的資料 | "Information is data processed to be useful in decision making; it is interpreted data." |
| Database | 資料庫；有組織的相關資料集合 | "A database is an organized collection of logically related data, and a description of this data, designed to meet the information needs of an organization." |
| Metadata | 中繼資料；關於資料的資料 | "Metadata is data about data - it describes the properties/characteristics, e.g. purpose, time and date, creator, location." |
| Schema | 綱要；資料庫的結構 | "A schema is the structure of a database, e.g. tables, views, routines, structural metadata." |
| Data Dictionary | 資料字典；存放描述性 metadata | "A data dictionary gives context to a collection of data; it is a repository of descriptive metadata." |
| CRUD | 資料庫四大基本操作 | "CRUD stands for Create, Read, Update, and Delete." |
| File-based System | 檔案系統；每個程式管理自己的資料 | "A file-based system is a collection of application programs where each program defines and manages its own data." |
| Program-Data Dependence | 程式與資料相依 | "Each application program must maintain its own data and its own code for file metadata and processing routines." |
| Data Redundancy | 資料冗餘；同一資料重複存放 | "File-based systems often have separate copies of the same data, leading to high data redundancy." |
| Data Consistency | 資料一致性 | "By eliminating data redundancy, the chance of inconsistency is significantly reduced." |
| DBMS | 資料庫管理系統 | "A DBMS is a collection of software that enables users to define, create, maintain and provide controlled access to the database." |
| Data Independence | 資料獨立性；metadata 與程式分離 | "The separation of data descriptions (metadata) from the application programs is called data independence." |
| Concurrency | 並行性；多用戶同時存取 | "A database allows multiple users and applications to access and manipulate the data concurrently." |
| Backup and Recovery | 備份與復原 | "A DBMS provides data backup methods and recovery methods." |
| Legacy System | 舊有系統 | "Data conversion from legacy systems is part of the conversion cost." |
| Data Migration | 資料遷移 | "Data migration costs are one of the disadvantages of a DBMS." |
| Three-Level Architecture | 三層架構（ANSI-SPARC） | "The three levels are external (user views), conceptual (community view), and internal (physical storage)." |
| External Level | 外部層；用戶的 view | "A user's view is immune to changes made in other views." |
| Conceptual Level | 概念層；整體邏輯結構 | "Change of the conceptual structure of the database should not affect users." |
| Internal Level | 內部層；實體儲存 | "Users should not need to know physical database storage details." |
| View | 視圖；用戶看到的部分資料 | "Each authorized user is provided one or more user views." |
| Relational Database | 關聯式資料庫 | "A relational database organizes data into tables (relations) with rows and columns." |
| Relation | 關聯；即 Table | "A relation is a table with columns and rows; it is the logical structure of the database." |
| Attribute / Field | 屬性／欄位；即 Column | "An attribute/field is a named column of a relation." |
| Domain | 值域；允許值集合 | "A domain is the set of allowable values for one or more attributes, e.g. age 0–120." |
| Tuple / Record | 元組／記錄；即 Row | "A tuple/record is a row of a relation." |
| Degree | 度；attribute 的數目 | "Degree is the number of attributes in a relation." |
| Cardinality | 基數；tuple 的數目 | "Cardinality is the number of tuples in a relation." |
| Relationship | 關係；表之間的邏輯連接 | "A relationship is a logical connection between tables based on interaction among these tables." |
| ACID | 交易可靠性四屬性 | "ACID guarantees that database transactions are processed reliably: Atomicity, Consistency, Isolation, Durability." |
| Transaction | 交易；資料庫操作單位 | "ACID properties guarantee that transactions are processed reliably." |
| Horizontal Scaling | 水平擴展；加入更多伺服器 | "Horizontal scaling (adding more servers) is difficult and limited in relational databases." |
| Vertical Scaling | 垂直擴展；升級現有伺服器硬體 | "Vertical scaling improves hardware in the existing server." |
| NoSQL | 非關聯式資料庫 | "NoSQL databases feature dynamic schema and allow unstructured data in JSON format without defining the schema first." |
| Dynamic Schema | 動態綱要；結構可隨時改變 | "NoSQL allows data to be stored without having to first define the schema." |
| JSON | 資料交換格式 | "NoSQL databases allow 'unstructured data' in JSON format." |
| Collection / Document | 集合／文件（MongoDB 概念） | "Data is typically nested (merged) in a few collections in NoSQL." |
| Schema Validator | 綱要驗證器（可選） | "An optional schema validator ($jsonSchema) can enforce required fields and bsonType." |
| MongoDB | 流行 NoSQL 資料庫 | "MongoDB stores data as JSON-like documents and is an example of a NoSQL database." |

## 🗺️ 5. 循序漸進學習路線（Learning Path）

1. **先理解觀念**：Data → Information → Database 的層遞；raw data 需要 context；CRUD 是資料庫最基本操作；File-based 為何導致 redundancy 與 inconsistency
2. **背誦英文短語**：DBMS 定義句、data independence 定義句、三大定義（Data／Information／Database）、ACID 四個字、關聯模型七術語（Relation／Attribute／Domain／Tuple／Degree／Cardinality／Relationship）
3. **掌握比較框架**：默寫 File-based vs DBMS 對比表（redundancy／consistency／sharing／security／independence）；默寫 NoSQL vs Relational 選擇表（ACID／資料特性／擴展／寫入）；說出 ANSI-SPARC 三層名稱與六項目標
4. **能解答英文考題**：例如
   - "Define metadata, schema, and data dictionary." → 見 3.1.3
   - "List four advantages of a DBMS." → Minimal data redundancy, improved consistency, data sharing, program-data independence（任選四項）
   - "What is program-data dependence?" → "Each application program must maintain its own data and code for file metadata, so changes to file structure require changes to application code."
   - "In a relation with 5 attributes and 20 rows, what are the degree and cardinality?" → "Degree = 5, cardinality = 20."
   - "When would you choose NoSQL over a relational database?" → "When ACID guarantees are not required, data is dynamic, and horizontal scaling and fast writes are needed."

## 🎒 6. 考前 5 分鐘雙語懶人包（Cheat Sheet）

**三大定義**
- Data：電腦可處理的事實 → "Meaningful facts processed by a computer."
- Information：經處理、對決策有用的資料 → "Data processed to be useful in decision making."
- Database：有組織的相關資料＋描述 → "An organized collection of logically related data, and a description of this data."

**Metadata 三兄弟**
- Metadata = 關於資料的資料（purpose、time/date、creator、location）
- Schema = 資料庫結構（tables、views、routines）
- Data Dictionary = 描述性 metadata 的儲存庫

**CRUD**：Create（插入）／ Read（檢索）／ Update（更新）／ Delete（刪除）

**File-based vs DBMS 五項對比**

| 項目 | File-based | DBMS |
|---|---|---|
| Redundancy | 高（各自副本） | 低（primary fact 只記一次） |
| Consistency | 差（冗餘→不一致） | 好（消除冗餘） |
| Sharing | 難（各自檔案） | 易（集中共享） |
| Security | 弱（逐檔加密） | 強（Access Control、Encryption、Auditing、Backup） |
| Independence | 無 | 有（metadata 與程式分離） |

**DBMS 優點口訣**：Redundancy 低、Consistency 好、Standards 執行、Concurrency 共享、Independence、開發快、維護少、備份復原強
**DBMS 缺點**：Complexity、Size、Cost（軟體／硬體／轉換／遷移）、Performance、故障影響大

**ANSI-SPARC 三層**：External（用戶 views）→ Conceptual（社群觀點）→ Internal（實體儲存）；目標 = 上層變更不影響下層

**關聯模型七術語**：Relation=Table｜Attribute=Column｜Domain=允許值｜Tuple=Row｜Degree=attribute 數｜Cardinality=tuple 數｜Relationship=表間邏輯連接
→ 例：Programme relation：Degree=4、Cardinality=3

**ACID**：Atomicity（原子）／ Consistency（一致）／ Isolation（隔離）／ Durability（持久）——保證交易可靠處理

**NoSQL vs Relational 速記**

| 考量 | NoSQL | Relational |
|---|---|---|
| ACID | 不需要 | 必須 |
| 資料 | 動態、巢狀於少數 collections | 可預測、分佈多 tables |
| 擴展 | 水平＋垂直皆可 | 垂直可、水平難 |
| 寫入 | 快、寫入安全非關鍵 | 寫入安全是要求 |

**英文極速記憶句**
- "Each primary fact is recorded in only one place in the database."
- "Metadata is data about data."
- "ACID guarantees that database transactions are processed reliably."
- "NoSQL allows unstructured data in JSON format without defining the schema first."
- "A user's view is immune to changes made in other views."
