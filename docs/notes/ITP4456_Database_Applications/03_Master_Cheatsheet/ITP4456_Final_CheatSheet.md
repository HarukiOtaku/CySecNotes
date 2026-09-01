# ITP4456 Database Applications — Final Cheat Sheet（考前極速總複習）

> **覆蓋範圍**：Chapter 1: Introduction to Database Systems
> **使用時機**：考試前 5–10 分鐘快速掃描；只保留「關鍵定義、對比表、英文口訣」。
> 詳細解說請回查：`02_AI_Study_Guides/ITP4456_L1_IntroductionToDatabaseSystems_StudyGuide.md`

---

## 1. 三大定義

| 詞彙 | 一句話 | 英文關鍵句 |
|---|---|---|
| Data | 電腦可處理的事實 | "Meaningful facts, text, graphics, images, sound, video segments etc., processed by a computer." |
| Information | 經處理、對決策有用的資料 | "Data processed to be useful in decision making; information is interpreted data." |
| Database | 有組織的相關資料＋描述 | "An organized collection of logically related data, and a description of this data, designed to meet the information needs of an organization." |

## 2. Metadata 三兄弟

- **Metadata** = 關於資料的資料（purpose、time/date、creator、location）
- **Schema** = 資料庫結構（tables、views、routines）
- **Data Dictionary** = 描述性 metadata 的儲存庫
- **CRUD**：Create（插入）／ Read（檢索）／ Update（更新）／ Delete（刪除）

## 3. File-based vs DBMS（必考對比）

| 項目 | File-based | DBMS |
|---|---|---|
| Redundancy | 高（各自副本） | 低（primary fact 只記一次） |
| Consistency | 差（冗餘→不一致） | 好（消除冗餘） |
| Sharing | 難（各自檔案） | 易（集中共享） |
| Security | 弱（逐檔手動加密） | 強（Access Control、Encryption、Auditing、Backup/Recovery） |
| Independence | 無 | 有（metadata 與程式分離） |

**DBMS 優點 8 項**：Minimal Data Redundancy、Improved Consistency、Enforcement of Standards、Increased Concurrency/Data Sharing、Program-Data Independence、Increased Productivity、Reduced Program Maintenance、Improved Backup and Recovery
**DBMS 缺點 5 項**：Complexity、Size、Cost（軟體／硬體／轉換／遷移）、Performance、Higher Impact of a Failure

**Program-Data Dependence 重點**：每個程式各自管資料、各自寫 metadata 碼、各自寫 CRUD 程序；檔案結構一改 → 所有存取程式都要改

## 4. ANSI-SPARC 三層架構

- **External Level**（用戶 views）→ **Conceptual Level**（社群觀點）→ **Internal Level**（實體儲存）
- 六目標總括：所有用戶存取同一資料；view 互不影響；用戶不需知物理儲存；概念／儲存結構變更不影響用戶 views

## 5. 關聯模型七術語（必考定義）

| 術語 | 中文 | 意思 |
|---|---|---|
| Relation | 關聯 | = Table（邏輯結構） |
| Attribute / Field | 屬性 | = 具名 Column |
| Domain | 值域 | 允許值集合（例：age 0–120） |
| Tuple / Record | 元組 | = Row |
| Degree | 度 | attribute 數目 |
| Cardinality | 基數 | tuple 數目 |
| Relationship | 關係 | 表之間的邏輯連接 |

→ 例：Programme relation：**Degree = 4、Cardinality = 3**

## 6. ACID（交易可靠性）

**Atomicity**（原子：全做或全不做）／ **Consistency**（一致）／ **Isolation**（隔離：並行不干擾）／ **Durability**（持久：完成即保存）

## 7. NoSQL vs Relational（選擇考量）

| 考量 | NoSQL | Relational |
|---|---|---|
| ACID | 不需要 | 必須 |
| 資料 | 動態、巢狀於少數 collections | 可預測、分佈多 tables |
| 表達 | 可不需關係 | 最適合關聯表達 |
| 寫入 | 快、寫入安全非關鍵 | 寫入安全是要求 |
| 擴展 | 水平＋垂直皆可 | 垂直可、水平難 |
| 效能 | 大量簡單讀寫極佳 | 每秒大量讀寫受限 |

- NoSQL 特點：非關聯、dynamic schema、JSON 非結構化資料、可選 $jsonSchema Validator
- 例子：MongoDB（NoSQL）vs MySQL、Oracle、SQL Server、PostgreSQL（Relational）
- Relational 缺點：horizontal scaling 難、改 schema 昂貴且常停機

## 8. 英文極速記憶句

- "Each primary fact is recorded in only one place in the database."
- "Metadata is data about data."
- "The separation of data descriptions (metadata) from the application programs is called data independence."
- "ACID guarantees that database transactions are processed reliably."
- "NoSQL databases feature dynamic schema and allow unstructured data in JSON format without having to first define the schema."
- "A user's view is immune to changes made in other views."

## 9. 最後 60 秒自測清單

- [ ] 能背出 Data／Information／Database 三個定義（英文）
- [ ] 能分辨 Metadata、Schema、Data Dictionary
- [ ] 能默寫 File-based vs DBMS 五項對比
- [ ] 能說出 ANSI-SPARC 三層名稱
- [ ] 能計算 Degree 與 Cardinality（例：4 attributes × 3 rows）
- [ ] 能背出 ACID 四個字並各附一句解釋
- [ ] 能舉出 3 個「選 NoSQL」與 3 個「選 Relational」的理由

*詳細版：`02_AI_Study_Guides/ITP4456_L1_IntroductionToDatabaseSystems_StudyGuide.md`*
