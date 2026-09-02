# ITE3006 Information Technology Essentials — Topic 2: Organizing Content with Lists and Tables 雙語應考學習指南（Bilingual & Exam-Ready Study Guide）

> 本指南對應 **Lect02: Organizing Content with Lists and Tables**，完整覆蓋講義全部 16 頁投影片：**HTML Lists（`<ol>` / `<ul>` / `<li>`）**、**HTML Tables（`<table>` 及其屬性、`<tr>`/`<th>`/`<td>`、`rowspan`/`colspan` 合併儲存格）**，以及同課延伸的 **HTML Images（`<img />`）**、**Image Links** 與 **Floating Frame（`<iframe>`）**。本課內容全部屬 **HTML**（教材沿用 HTML 4 語法），不含 CSS/JavaScript——CSS 與 JS 屬後續課題。
>
> 每項核心定義都附「> 英文標準定義句（English Standard Definition）」，可直接照搬作考試答題句。所有 HTML 標籤、屬性與值一律保留英文原文。

---

## 📝 1. 課程概要與實務情境 (Summary & Real-world Context)

本課的主題是「**如何用 HTML 有系統地組織網頁內容**」。瀏覽器只會把 HTML 內容由上而下、一個接一個地排版；若想呈現「有先後次序的步驟清單」、「帶圓點的項目清單」，或者「多欄多列的資料表」，就必須動用 HTML 的結構化標籤。講義先講兩種列表——**ordered list（有序列表 `<ol>`，顯示數字編號）**與**unordered list（無序列表 `<ul>`，顯示圓點標記）**，兩者內部的每一項都用 **list item（列表項目 `<li>`）** 包住。接著引入最強大的排版工具——**table（表格 `<table>`）**：表格在本質上是一張「**長方形儲存格網格（rectangular grid of cells）**」，由 row（列）與 column（欄）組成，儲存格可以橫向或縱向合併，因此能做到列表無法做到的多欄排列。

在實際開發場景中，這些技巧無處不在：例如在購物網站寫「付款步驟 1-2-3」（`<ol>`）、在導覽列或產品特色區寫重點項目（`<ul>`）、把價目表／成績表／統計數據排成整齊的多欄表格（`<table>`），甚至用表格把整頁分成「左欄選單 + 右欄內容」的佈局——在 CSS 成熟以前，**table for layout（用表格做版面）**是網頁設計的主流做法，本課亦會介紹。講義後半部分順帶講述如何在頁面中放圖（`<img />`）、把圖變成超連結（image link），以及在頁面內嵌另一個獨立小視窗（`<iframe>` floating frame），例如在網頁上即時切換顯示不同「請假原因」的內容框。學完本課，你應該能夠不看任何樣版，直接用純 HTML 寫出「列表 + 表格 + 圖片 + 內嵌框」的完整網頁。

---

## 🎯 2. 考試學習目標 (Learning Objectives)

考官會測試以下核心能力（應考時請對照自評）：

| # | 考官會測試的核心能力（繁體中文） | 英文對照 (Learning Objectives) |
|---|--------------------------------|-------------------------------|
| 1 | 分辨並正確使用有序／無序列表標籤，解釋兩者顯示上的分別 | Distinguish between the ordered list `<ol>` and the unordered list `<ul>`, and use `<li>` for each list item |
| 2 | 解釋為何多欄表格不能單靠列表達成，並描述 `<table>` 的「網格」本質 | Explain why multi-column tabular formats cannot be created using lists, and describe a table as a rectangular grid of cells |
| 3 | 背出 `<table>` 六大屬性的作用與單位（`border`、`width`、`align`、`cellspacing`、`cellpadding`、`bgcolor`） | State the purpose of the `border`, `width`, `align`, `cellspacing`, `cellpadding` and `bgcolor` attributes of the `<table>` tag |
| 4 | 正確排列表格內部標籤的巢狀次序：`<table>` ➔ `<caption>` / `<tr>` ➔ `<th>` / `<td>` | Use `<caption>` for the table caption, `<tr>` for each row, `<th>` for heading cells and `<td>` for data cells in the correct nesting order |
| 5 | 分辨 `align` 與 `valign`（水平／垂直對齊）於儲存格內的用法 | Distinguish `align` (horizontal: left / right / center) from `valign` (vertical: top / bottom / middle) inside a cell |
| 6 | 運用 `rowspan` / `colspan` 合併儲存格，並數出合併後網格正確的列欄數 | Merge cells with the `rowspan` and `colspan` attributes of `<th>` / `<td>` and predict the resulting grid correctly |
| 7 | 分辨表格兩大用途：table for information 與 table for layout | Differentiate between using a table for information and using a table for layout |
| 8 | 背出 `<img />` 的屬性（`src`、`width`、`height`、`border`、`alt`）與圖檔格式，並解釋空元素 | State the attributes of the `<img />` element, the common image formats (GIF / JPEG / PNG), and explain that `<img />` is an empty element |
| 9 | 用 `<a>` 包住 `<img />` 製作圖片超連結，並知道其顯示特性 | Create an image link by placing an `<img />` element inside an `<a>` element |
| 10 | 寫出 `<iframe>` 語法並解釋 `src`、`frameborder`、`marginwidth`、`marginheight`、`name` 屬性與 `target` 的配合 | Write the `<iframe>` syntax and explain its attributes, including how a link's `target` name loads pages inside the named frame |

---

## 📖 3. 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 HTML Lists — 有序與無序列表（`<ol>`、`<ul>`、`<li>`）

列表（lists）是最簡單的內容組織工具。講義指出：在一個完整的 **`<ol>...</ol>`** 或 **`<ul>...</ul>`** 標籤對內，可以放入一串項目，每個項目都要用 **`<li>...</li>`** 包住。兩者的分別只在顯示標記（marker）：

> **English Standard Definition — Ordered List:**
> "An ordered list is enclosed in the `<ol>...</ol>` tag pair; its items, each surrounded by `<li>...</li>`, are listed with **numbered markers** (1, 2, 3, …)."

> **English Standard Definition — Unordered List:**
> "An unordered list is enclosed in the `<ul>...</ul>` tag pair; its items, each surrounded by `<li>...</li>`, are listed with **bulleted markers** (•)."

- `<ol>` 的 "o" = ordered（有序／有先後次序），所以顯示**數字編號**，適合「步驟、排名、次序」。
- `<ul>` 的 "u" = unordered（無序／不分先後），所以顯示**圓點（bullet）**，適合「項目清單、重點列舉」。
- 每一項內容無論在哪種列表中，都必須用 `<li>`（list item）包住，這是講義反覆強調的結構：**list container（`<ol>` 或 `<ul>`）➔ list items（`<li>`）**。

> **Exam Answer Phrase:**
> "Within an overall `<ol>...</ol>` or `<ul>...</ul>` tag pair, lists of items, surrounded by `<li>...</li>`, may be supplied. These are listed with numbered or bulleted markers, respectively."

**完整例子（講義 Slide 2 原例）：**

```html
<h1> This is another attempt to create a Web page.</h1>
<br />
<h2> An ordered list </h2>
<ol>
  <li> Coffee </li>
  <li> Tea </li>
</ol>
<br />
<h2>An unordered list</h2>
<ul>
  <li> Milk </li>
  <li> Orange Juice </li>
</ul>
```

💡 **拆解：** 上述程式碼在瀏覽器會顯示——標題「An ordered list」下面出現「1. Coffee　2. Tea」；標題「An unordered list」下面出現「• Milk　• Orange Juice」。留意 `<br />` 用來在區塊之間強制換行；`<h1>` / `<h2>` 是標題標籤（屬 Topic 1 內容），此處僅作版面分區。

⚠️ **考試常見考法：**
- 問「`<ol>` 與 `<ul>` 的分別」→ 答 "numbered markers" vs "bulleted markers"。
- 問「列表每一項用哪個標籤」→ `<li>`。
- 陷阱題：把 `<li>` 直接放在 `<body>` 而不用 `<ol>`/`<ul>` 包住——HTML 4 語法上列表項目必須在容器內。

---

### 3.2 Table in HTML — 表格的本質：為何列表不夠用

列表只能做到「單欄、由上而下的項目」。若要呈現多欄多列的資料（例如人名 + 高度 + 備註），就必須引入通用表格機制：

> **English Standard Definition — HTML Table:**
> "Multi-column tabular formats cannot be created using lists. Instead, the `<table>` element surrounds the whole of the table, which should be considered as a **rectangular grid of cells**."

**Table 的四個核心特性（講義原文要點）：**

1. **`<table>` 元素包住整張表格** — "The `<table>` element surrounds the whole of our table."
2. **表格是長方形儲存格網格** — "The table itself should be considered as a rectangular grid of cells." 即「列 × 欄」的座標結構。
3. **任何一格都可以放資料或欄標題** — "Data or column header items may be entered in any cell."
4. **儲存格可以合併、外觀可以自訂** — "Cells may be joined horizontally or vertically to build larger cells amongst the smaller ones. The borders around cells, the distances from borders to cell contents and the foreground & background colors of cells may be specified."

> **Exam Answer Phrase:**
> "A table is a rectangular grid of cells: data or column header items may be entered in any cell, cells may be joined horizontally or vertically to build larger cells, and the borders, spacing and colours of cells may be specified."

💡 **深度補充：** 記住「grid of cells」這個詞組——幾乎所有表格題的解釋都要由它出發。每個 cell 由「所在列 row」與「所在欄 column」決定位置；`<th>` 放欄標題（heading），`<td>` 放普通資料（data）。

---

### 3.3 Uses of Table — 表格的兩大用途

講義明確把表格用途分成兩種（考選擇題／簡答題的熱門素材）：

> **English Standard Definition — Uses of a Table:**
> "A table may be used **for information**, to present data in an organised row-and-column format, or **for layout**, to position page elements such as menus and content side by side."

| 用途 | 英文名稱 | 中文解說 |
|------|---------|---------|
| 顯示資料 | **Table for information** | 用行列把數據排整齊，例如統計表（Statistics）、價目表、時間表 |
| 排版版面 | **Table for layout** | 用隱藏邊框的表格把網頁分成左欄／右欄、上欄／下欄，擺放選單、圖片與文字區塊（CSS 流行前的做法） |

💡 **拆解：** 兩者的 HTML 語法完全相同，分別只在**目的**——前者要「展示資料」，後者要「分割版面」。考官若問「兩大用途」，答案就是 "for information" 與 "for layout"。補充：今日標準做法是用 CSS（float/flex/grid）做版面，但本課按教材以 HTML 4 語法理解即可。

---

### 3.4 `<table>` 的六大屬性 (Attributes in the `<table>` Tag)

`<table>` 標籤可以帶多個屬性，例如 `<table border="...">`。講義列出的屬性如下（**每個都要背作用＋單位**）：

| 屬性 | 作用（中文拆解） | 值／單位 | 英文標準定義 |
|------|----------------|---------|-------------|
| `border=` | 圍住表格元素的**線條粗幼**（外框線） | 像素數值，如 `border="20"` | "`border=` specifies the width of the lines surrounding the table elements (in pixels)." |
| `width=` | 整張表格**或表格內欄位**（`<th>` / `<td>`）的寬度 | 像素數值或**屏幕寬度百分比**，如 `width=500` 或 `width="50%"` | "`width=` specifies the width of a table or of a field within a table (`<th>` or `<td>`) (in pixels or percentage of the screen width)." |
| `align=` | 把**整張表格**靠左／靠右／置中對齊 | `left` / `right` / `center` | "`align=` allows the whole table to be aligned to the left, right or center." |
| `cellspacing=` | 分隔**表格項目之間的線條寬度**（即儲存格之間的間距） | 像素數值，如 `cellspacing="10"` | "`cellspacing=` specifies the width of the lines that divide table entries (in pixels)." |
| `cellpadding=` | 儲存格**邊緣與內容之間的空間**（內距）；瀏覽器預設多為 1 像素 | 像素數值，如 `cellpadding="5"` | "`cellpadding=` specifies the amount of space between the edges of the cells and the content of a cell. By default, many browsers draw tables with a cell padding of 1 pixel." |
| `bgcolor=` | 表格**或表格項目的背景顏色** | 顏色名稱或 RGB 十六進制，如 `bgcolor="white"` 或 `bgcolor="#ffffff"` | "`bgcolor=` specifies the background color of a table or a table item. The color may be specified by name, or by RGB components in hexadecimal, e.g. `bgcolor="white"` or `bgcolor="#ffffff"`." |

**記憶口訣（三距一寬一對齊一底色）：** **border（外框線）→ cellspacing（格與格之間的線／間距）→ cellpadding（格內空間）** 是三個「距離」屬性；**width（寬度）**、**align（整表對齊）**、**bgcolor（背景色）**。

💡 **易混淆重點（必考）：**
- `cellspacing` vs `cellpadding`：**spacing = 儲存格與儲存格之間**（外距）；**padding = 儲存格邊框與內容之間**（內距）。記法：padding 包住 content，所以是最「內」的空間。
- `align` 在 `<table>` 上控制「整張表格」在頁面的位置；在 `<td>` / `<th>` 上則控制「該格內容」在格內的水平位置（見 3.5）。
- 顏色值兩種寫法：**by name**（`"white"`）或 **by RGB hexadecimal**（`"#ffffff"`）。常見例子：白色 `#ffffff`、銀灰 `#c0c0c0`、淺橙 `#FFCC99`。十六進制 RGB 格式是 `#RRGGBB`，每對兩位十六進制代表紅／綠／藍分量。

**語法示範（講義原文格式）：**

```html
<table border="20" width="500" cellspacing="10" cellpadding="5" bgcolor="#ffffff">
  <!-- 表格內容 -->
</table>
```

---

### 3.5 `<table>` 內部的標籤結構 (Tags inside the `<table>` Tag)

在 `<table>` 之內，用以下標籤由外到內組裝表格：

| 標籤 | 全名 | 中文解說 | 英文標準定義 |
|------|------|---------|-------------|
| `<caption>` | caption | 包住表格的**標題／說明文字**（顯示在表格上方） | "The `<caption>` element surrounds any captions." |
| `<tr>` | table row | 包住表格的**每一列** | "The `<tr>` element (table row) surrounds each row of the table." |
| `<th>` | table heading | 在列內包住**每個欄標題**（heading cell，預設粗體置中） | "Within a row, a `<th>` element (table heading) surrounds each heading element." |
| `<td>` | table data | 在列內包住**每個資料**（data cell） | "Within a row, a `<td>` element (table data) surrounds each data element." |
| `<br>` | line break | 在儲存格內**強制換行**，令內容排得更好看，毋須 word-wrap（自動換行） | "The `<br>` element may be used within a cell of a table to make the entry look nicer without word-wrap." |

**巢狀次序（重要，背熟）：** `<table>` ➔ `<caption>`（可選）➔ `<tr>` ➔ `<th>` / `<td>`。即：caption 與 tr 是 table 的**直接子元素**；th 與 td 是 tr 的**直接子元素**，不可跳級。

**儲存格內容對齊的兩個屬性：**

> "The `align=` attribute defines whether the data in a table element is aligned with the **left** cell margin, the **right**, or **centered** within the cell. The `valign=` attribute defines whether the data is **flush with the top, bottom or middle**."

| 屬性 | 控制方向 | 可取值 | 記憶點 |
|------|---------|--------|--------|
| `align=` | **水平**對齊（左右） | `left` / `right` / `center` | "a" = across（橫向） |
| `valign=` | **垂直**對齊（上下） | `top` / `bottom` / `middle` | "v" = vertical（垂直） |

**例子（講義原例）：**

```html
<td align="left" valign="top">
```

💡 **拆解：** 這句把某資料格的內容放到「靠左（left）+ 貼頂（top）」位置。考試常見問法：`align` 控制甚麼方向、`valign` 有哪些值——記住 **align 水平（left/right/center）、valign 垂直（top/bottom/middle）**，兩者都作用在「格內內容」的位置。

---

### 3.6 合併儲存格：`rowspan` 與 `colspan` (Joining Table Rows and Columns)

文字（或內容）可以橫跨多列或多欄，即儲存格可以被合併，靠的是 **`<th>` 或 `<td>` 元素上的 `rowspan` 或 `colspan` 屬性**。

> **English Standard Definition — Colspan:**
> "Text may be spanned across rows or columns (i.e. cells may be joined) with the `rowspan` or `colspan` attribute of the `<th>` or `<td>` elements."

> "e.g. `<th colspan="2"> Gender </th>` — This `<th>` element is made to cover **two cells**: the current one and the next one to the right."

> "e.g. `<th rowspan="4"> Row <br /> Span </th>` — This `<th>` element is made to cover **four rows**: the current one and the three below it. In the next three table rows, there is no need to specify the cell again."

**中文拆解：**

| 屬性 | 合併方向 | 數值意義 | 重要規則 |
|------|---------|---------|---------|
| `colspan="n"` | **橫向**合併欄位（往右） | 該格佔用 n 欄 | 覆蓋「本身一格 + 右邊 n−1 格」 |
| `rowspan="n"` | **縱向**合併列位（往下） | 該格佔用 n 列 | 覆蓋「本身一格 + 下面 n−1 格」；**之後 n−1 列毋須再寫這個儲存格** |

**必考規則（講義重點）：**
1. `colspan="2"` 的格子向右吃掉一格，連自己共佔 **2 欄**。
2. `rowspan="4"` 的格子向下吃掉三格，連自己共佔 **4 列**；**在其後的 3 列中，毋須再次指明該格**（"In the next three table rows, there is no need to specify the cell again"）——因為它已從第一列延伸下來。

**語法示範：**

```html
<table border="1">
  <tr>
    <th colspan="2"> Gender </th>   <!-- 此格向右覆蓋兩欄 -->
  </tr>
  <tr>
    <th rowspan="4"> Row <br /> Span </th>  <!-- 此格向下覆蓋四列 -->
    <td> ... </td>
  </tr>
  <!-- 之後三列都不用再為 rowspan 的格子寫 <td> -->
</table>
```

⚠️ **考試陷阱：** 問 rowspan 的格子佔「幾多行」時，講義的數字指的是**總列數（含自身）**：`rowspan="4"` = 佔 4 列，其中自身 1 列 + 向下延伸 3 列；後續 3 列內省略該格。

---

### 3.7 完整表格範例 Walkthrough（講義 Slide 8「Statistics」）

**完整程式碼（講義原例，加入縮排整理）：**

```html
<body bgcolor="#c0c0c0">
  <table border="20" width="500" cellspacing="10" cellpadding="5">
    <caption> Statistics </caption>
    <tr>
      <th> Name </th>
      <th> Height </th>
      <th rowspan="3">column 3a</th>
    </tr>
    <tr>
      <td> Nick </td>
      <td> 171cm </td>
    </tr>
    <tr>
      <td> Helen </td>
      <td> 165cm </td>
    </tr>
    <tr>
      <td> Donald <br /> Duck </td>
      <td> 30cm </td>
      <td> column 3b </td>
    </tr>
    <tr>
      <td colspan="2"> Mickey Mouse </td>
      <td> column 3c </td>
    </tr>
  </table>
</body>
```

**逐項拆解（考試常要你解釋每行的效果）：**

| 程式碼片段 | 效果（中文） |
|-----------|------------|
| `<body bgcolor="#c0c0c0">` | 整個頁面背景設為銀灰色（RGB 十六進制 `#c0c0c0`） |
| `<table border="20" width="500" cellspacing="10" cellpadding="5">` | 表格外框線粗 20 像素、寬 500 像素、格間距 10 像素、格內距 5 像素 |
| `<caption> Statistics </caption>` | 表格標題顯示 "Statistics" |
| `<th rowspan="3">column 3a</th>` | 第一列第三欄的標題格**向下合併 3 列**（覆蓋第 1–3 列），所以第 2、3 列只有 Name／Height 兩格，毋須再寫第三格 |
| `Donald <br /> Duck` | 在儲存格內用 `<br />` 強制換行，令 "Donald" 與 "Duck" 分成兩行顯示 |
| `<td colspan="2"> Mickey Mouse </td>` | 最後一列第一格**向右合併 2 欄**，所以 "Mickey Mouse" 橫跨該列第一、二欄 |

**合併後網格結構（3 欄 × 5 列）示意：**

```
Row 1: | Name (th)          | Height (th)       | column 3a (th, rowspan=3 ↓↓↓) |
Row 2: | Nick (td)          | 171cm (td)        |（column 3a 已由上面延伸至此，不重寫）|
Row 3: | Helen (td)         | 165cm (td)        |（column 3a 延伸至此結束）        |
Row 4: | Donald Duck (td)   | 30cm (td)         | column 3b (td)                  |
Row 5: | Mickey Mouse (td colspan=2 ←合併) | column 3c (td) |
```

💡 **數格驗算法：** 因為第 1 列第三格 `rowspan="3"`，第 1–3 列都只有 2 個獨立格子，但網格寬度仍然是 **3 欄**；到第 4 列 rowspan 已用盡，所以該列恢復 3 格（Donald Duck、30cm、column 3b）；第 5 列第一格 `colspan="2"` 吃掉兩欄，剩第三欄放 column 3c，該列仍是 3 欄。**任何時候，整張表的欄數必須一致**——這是檢查自己有沒有寫錯合併的黃金法則。

---

### 3.8 Using Tables For Layout — 用表格做版面

講義以投影片展示「用表格排版」的做法：將整個網頁放進一張大表格，利用隱形邊框的格子把版面分割成不同區域（例如頂部標題列、左側導覽欄、中間內容區），再在格子內放入文字、列表或圖片。

> **English Standard Definition — Table Layout:**
> "In addition to presenting information, a table may be used for layout: page content is placed inside the cells of a borderless table so that sections such as a menu bar and the main content can be arranged side by side."

- 做法要點：把 `<table>` 的 `border="0"`（或不寫 border），再配合 `width`、`align`、`valign` 控制各欄的寬度與內容位置。
- 本課只需知道「**table for layout 是歷史上的主流排版手法**」以及背後原因——HTML 4 沒有 CSS 佈局工具時，表格是唯一可靠的多欄分割方法。
- （現代補充：今日應以 CSS 佈局取代，此點不會在本科考題中要求你寫 CSS，但理解背景有助答 MC。）

---

### 3.9 HTML Images — 在網頁中插入圖片（`<img />`）

講義由 Slide 10 起延伸講「網頁內容的多媒體組織」。把圖片加入 HTML 文件，跟加入其他元素一樣簡單。圖片通常以 **GIF、JPEG 或 PNG** 格式存放。

> **English Standard Definition — The `<img />` Element:**
> "Including pictures into your HTML document is as easy as incorporating any other element. Images are usually held in either GIF, JPEG or PNG formats. The `<img />` element allows one to insert an image on the web page."

**`<img />` 是「空元素」（empty element）**——它是講義第一個明確點名的 empty element：

> "`<img />` is a kind of empty elements."

💡 **拆解：** 空元素（empty element / void element）沒有內容、沒有成對的結束標籤（沒有 `</img>`），所有資訊都以屬性形式寫在開始標籤內；XHTML 風格寫法在標籤結尾加 `/`，即 `<img />`。

**`<img />` 的屬性（逐一背熟）：**

| 屬性 | 作用（中文） | 英文標準定義 |
|------|------------|-------------|
| `src=` | 圖片的**檔名或 URL**（相對路徑 relative path 或絕對位址），指定載入哪張圖 | "`src=` — Filename or URL of the image (GIF or JPG)." |
| `width=` | 圖片顯示**寬度（像素）**，可重新縮放圖片 | "`width=` — Width of the image in pixels (allows rescaling)." |
| `height=` | 圖片顯示**高度（像素）**，可重新縮放圖片 | "`height=` — Height of the image in pixels (allows rescaling)." |
| `border=` | 圖片**邊框粗幼（像素）** | "`border=` — Width of the image border in pixels." |
| `alt=` | **替代文字**：當使用者無法看到圖片時顯示的說明文字 | "`alt=` — A text describing the image when it cannot be displayed." |

**講義原例 1（Slide 10）：**

```html
<html>
  <head>
    <title>Untitled</title>
  </head>
  <body>
    <img src="brandhk.gif" width="270" height="80" alt="HONG KONG BRAND"/>
  </body>
</html>
```

- `src="brandhk.gif"` 用**相對路徑（relative path）**指向與 HTML 檔同目錄的圖片；`width` / `height` 定義圖片的**尺寸（dimension）**；`alt` 在使用者無法檢視圖片時提供**替代資訊**（例如圖片載入失敗、螢幕閱讀器輔助）。

**講義原例 2（Slide 11，屬性速查格式）：**

```html
<img src="xx" alt="yy" width="10" height="10" border="0" />
```

⚠️ **考試重點：**
- 五個屬性名 `src` / `width` / `height` / `border` / `alt` 要能默寫，並知道 `alt` 是「圖片不能顯示時的文字」。
- `src` 可以是檔名或完整 URL；圖檔格式答 **GIF、JPEG、PNG**。
- `width` / `height` 以**像素（pixels）**為單位，且可以重新縮放（rescaling）圖片。

---

### 3.10 Image Links — 圖片超連結

圖片也可以變成超連結（graphical link），它與文字連結相似，但顯示特性不同：

> **English Standard Definition — Image Link:**
> "A graphical link is similar to a text link. Graphical links are not underlined or displayed in a different color, but may be displayed with a border. Displaying a clickable image as a link is done by placing an `<img />` element in the `<a>` element where the 'click me' text would otherwise go."

**中文拆解：**
- 文字連結的特徵是「有底線（underlined）+ 不同顏色」；**圖片連結不會有底線、不會變色**，但瀏覽器可能為它加上邊框（所以常見到 `border="0"` 把框去掉）。
- 寫法：把 `<img />` 放進 `<a>` 元素內、原本應該放 "click me" 文字的位置，即「**以圖代字**」。

**講義原例：**

```html
<a href="xx.html">
  <img src="pic.jpg" border="0" />
</a>
```

💡 **拆解：** 使用者點擊圖片（`pic.jpg`）就會跳到 `xx.html`；`border="0"` 移除預設的連結邊框，令圖片看起來不像有框。結構口訣：**`<a href="...">` 包住 `<img />`**——外層 `<a>` 決定跳去哪，內層 `<img />` 決定顯示甚麼。

---

### 3.11 Floating Frame — 浮動／內嵌框架 `<iframe>`

**Floating frame（浮動框架）**又名 **internal frame（內部框架）**，它在網頁內顯示為一個**獨立的方框或小視窗**，框內載入另一個 HTML 檔案。

> **English Standard Definition — Floating Frame:**
> "A floating frame, or internal frame, is displayed as a separate box or window within a Web page. The frame can be placed within a Web page in much the same way as an inline image."

**基本語法：**

```html
<iframe src="URL" frameborder="..">
</iframe>
```

| 組成／屬性 | 作用（中文） | 英文標準定義 |
|-----------|------------|-------------|
| `src="URL"` | 要顯示在浮動框架內**檔案的名稱與位置** | "`URL` is the name and location of the file you want to display in the floating frame." |
| `frameborder` | 決定瀏覽器是否在框架周圍顯示邊框：`"yes"` 顯示、`"no"` 不顯示 | "The `frameborder` attribute determines whether the browser displays a border ('yes') or not ('no') around the frame." |
| `marginwidth` | 框架內的左右邊界（沿用固定框架 fixed frame 的屬性） | "…you can use some of the other attributes you used with fixed frames, such as the `marginwidth`, `marginheight`, and `name` attributes." |
| `marginheight` | 框架內的上下邊界 | 同上 |
| `name` | 給框架一個名字，供連結的 `target` 屬性指定載入目標 | 同上 |
| `width` / `height` | 框架在頁面上的寬高（像素） | 講義範例中使用（如 `width="450" height="250"`） |

💡 **關鍵機制（必考）：** `<iframe name="reason" ...>` 給框架命名後，任何 `<a href="..." target="reason">` 連結的內容就會**載入到這個框架內**，而不是整個瀏覽器視窗跳走。`target` 的值要與 `iframe` 的 `name` 值相同。

**講義原例（Slide 14 — iframe.html 主頁）：**

```html
<body bgcolor="#FFCC99">
  <h2>I'm away from my desk because ...</h2>
  <p align="right">
    <a href="reason1.html" target="reason">Reason 1</a>
    <a href="reason2.html" target="reason">Reason 2</a>
  </p>
  <div align="left">
    <iframe name="reason" src="reason1.html"
            width="450" height="250">
    </iframe>
  </div>
</body>
```

**被載入的兩個子頁面（Slide 15）：**

`reason1.html`：

```html
<body>
  <h2 align="center">I forgot my lunch at home.</h2>
</body>
```

`reason2.html`：

```html
<body>
  <h2>
    <img src="scared.jpg" width="275" height="275" align="left">
    The boss called me in his office.
  </h2>
</body>
```

**互動流程拆解：**
1. 開啟 `iframe.html` 時，`<iframe src="reason1.html">` 令框架內**預設顯示 reason1 的內容**（「I forgot my lunch at home.」）。
2. 頁面右上角（`<p align="right">`）有兩個連結 Reason 1 / Reason 2，兩者的 `target="reason"` 與框架 `name="reason"` 對應。
3. 點擊 "Reason 1" → reason1.html 載入框架；點擊 "Reason 2" → reason2.html 載入框架（框架內圖片 `scared.jpg` 靠左 `align="left"`，文字在旁）。
4. 整個過程中，**主頁面本身不會跳轉**——內容只在 450 × 250 的框架內更新。

⚠️ **考試重點：** 記住「**name + target 配對**」是 iframe 互動的靈魂：`<iframe name="X">` + `<a target="X">`。另外 `frameborder` 的值是 **"yes" / "no"** 字串（不是 1/0）。

---

### 3.12 本課程式碼總覽（可直接開瀏覽器驗證的完整範例）

結合列表、表格、圖片與框架的綜合頁（含註解，方便溫習時對照每行作用）：

```html
<html>
<head>
  <title>Topic 2 Revision Demo</title>
</head>
<body bgcolor="#c0c0c0">

  <!-- 1. LISTS -->
  <h2>An ordered list</h2>
  <ol>
    <li> Coffee </li>
    <li> Tea </li>
  </ol>

  <h2>An unordered list</h2>
  <ul>
    <li> Milk </li>
    <li> Orange Juice </li>
  </ul>

  <!-- 2. TABLE -->
  <table border="2" width="100%" cellspacing="5" cellpadding="5">
    <caption> Statistics </caption>
    <tr>
      <th> Name </th>
      <th> Height </th>
      <th rowspan="3"> column 3a </th>
    </tr>
    <tr><td> Nick </td><td> 171cm </td></tr>
    <tr><td> Helen </td><td> 165cm </td></tr>
    <tr>
      <td> Donald <br /> Duck </td>
      <td> 30cm </td>
      <td> column 3b </td>
    </tr>
    <tr>
      <td colspan="2"> Mickey Mouse </td>
      <td> column 3c </td>
    </tr>
  </table>

  <!-- 3. IMAGE + IMAGE LINK -->
  <img src="brandhk.gif" width="270" height="80" alt="HONG KONG BRAND" />
  <a href="reason1.html">
    <img src="pic.jpg" border="0" alt="go to reason 1" />
  </a>

  <!-- 4. FLOATING FRAME -->
  <iframe name="reason" src="reason1.html" width="450" height="250">
  </iframe>

</body>
</html>
```

---

## 📖 4. 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|-------------------|----------------|-------------------------------------|
| `<ol>` (ordered list) | 有序列表，項目以數字編號顯示 | "An ordered list `<ol>` displays its `<li>` items with numbered markers." |
| `<ul>` (unordered list) | 無序列表，項目以圓點標記顯示 | "An unordered list `<ul>` displays its `<li>` items with bulleted markers." |
| `<li>` (list item) | 列表項目，必須放在 `<ol>` 或 `<ul>` 之內 | "Each item of a list is surrounded by the `<li>...</li>` tag pair inside the `<ol>` or `<ul>` container." |
| `<table>` | 表格容器，被視為長方形儲存格網格 | "The `<table>` element surrounds the whole table, which is a rectangular grid of cells." |
| rectangular grid of cells | 長方形儲存格網格——表格的結構本質 | "A table should be considered as a rectangular grid of cells in which data or column headers may be entered in any cell." |
| `<caption>` | 表格標題，包住表格的說明文字 | "The `<caption>` element surrounds any captions of the table." |
| `<tr>` (table row) | 表格列，包住每一行 | "The `<tr>` element surrounds each row of the table." |
| `<th>` (table heading) | 欄標題儲存格（heading cell） | "Within a row, a `<th>` element surrounds each heading element." |
| `<td>` (table data) | 資料儲存格（data cell） | "Within a row, a `<td>` element surrounds each data element." |
| `<table border="n">` | 表格外框線粗幼，單位像素 | "The `border` attribute specifies the width, in pixels, of the lines surrounding the table elements." |
| `width=` | 表格或欄位的寬度，像素或屏幕寬度百分比 | "The `width` attribute specifies the width of a table or of a field within a table (`<th>` or `<td>`), in pixels or as a percentage of the screen width." |
| `align=` (on table) | 整張表格靠左／靠右／置中 | "The `align` attribute allows the whole table to be aligned to the left, right or center." |
| `cellspacing=` | 儲存格與儲存格之間的間距，像素 | "The `cellspacing` attribute specifies the width, in pixels, of the lines that divide table entries." |
| `cellpadding=` | 儲存格邊緣與內容之間的內距，像素 | "The `cellpadding` attribute specifies the space between the edges of the cells and the content of a cell; by default many browsers use a cell padding of 1 pixel." |
| `bgcolor=` | 表格／項目的背景顏色，名稱或 RGB 十六進制 | "The `bgcolor` attribute specifies the background color of a table or a table item, by name or by RGB components in hexadecimal, e.g. `bgcolor="white"` or `bgcolor="#ffffff"`." |
| `align=` (on cell) | 格內內容的水平對齊（left / right / center） | "The `align` attribute defines whether the data in a table element is aligned with the left cell margin, the right, or centered within the cell." |
| `valign=` | 格內內容的垂直對齊（top / bottom / middle） | "The `valign` attribute defines whether the data is flush with the top, bottom or middle of the cell." |
| `colspan="n"` | 儲存格向右合併 n 欄 | "With `colspan="2"`, the `<th>` or `<td>` element covers two cells: the current one and the next one to the right." |
| `rowspan="n"` | 儲存格向下合併 n 列 | "With `rowspan="4"`, the element covers four rows — the current one and the three below it; in the next three rows there is no need to specify the cell again." |
| table for information | 用表格展示資料 | "A table may be used for information, to organise data into rows and columns." |
| table for layout | 用表格分割版面 | "A table may be used for layout, to position page elements such as menus and content in different columns." |
| `<img />` | 圖片元素；屬於空元素，沒有結束標籤 | "The `<img />` element inserts an image on the web page; it is an empty element with no closing tag." |
| `src=` (on `<img />`) | 圖片檔名或 URL（相對路徑） | "The `src` attribute defines the filename or URL — the relative path — of the image." |
| `width=` / `height=` (on `<img />`) | 圖片的顯示寬度／高度（像素，可縮放） | "The `width` and `height` attributes define the dimensions of the image in pixels and allow rescaling." |
| `alt=` | 圖片無法顯示時的替代文字 | "The `alt` attribute provides alternative information in case the user cannot view the image." |
| image link (graphical link) | 以圖片充當的超連結 | "A graphical link is made by placing an `<img />` element inside the `<a>` element; it is not underlined or shown in a different color, but may be displayed with a border." |
| GIF / JPEG / PNG | 網頁常用三種圖檔格式 | "Images on the web are usually held in either GIF, JPEG or PNG formats." |
| floating frame / internal frame `<iframe>` | 網頁內的獨立小視窗，載入另一檔案 | "A floating frame, or internal frame, is displayed as a separate box or window within a Web page." |
| `frameborder=` (on `<iframe>`) | 是否在框架四周顯示邊框（"yes" / "no"） | "The `frameborder` attribute determines whether the browser displays a border ('yes') or not ('no') around the frame." |
| `name=` (on `<iframe>`) + `target=` (on `<a>`) | 連結的 target 指向框架名字，令內容在框架內載入 | "When the `name` attribute of an `<iframe>` matches the `target` attribute of a link, the linked file is displayed inside that frame." |
| empty element | 空元素：無內容、無結束標籤 | "An empty element, such as `<img />`, has no content and no closing tag; all its information is given by attributes." |

---

## 🗺️ 5. 循序漸進學習路線 (Learning Path)

**第一階段：先理解「結構容器」觀念**
- 理解 HTML 是「巢狀容器」結構：`<ol>` / `<ul>` 是列表容器，`<li>` 是項目；`<table>` 是網格容器，`<tr>` 是列，`<th>` / `<td>` 是格。
- 理解為何列表不能做多欄（單欄由上而下），而表格可以（row × column 網格）。
- 背誦關鍵短語："a rectangular grid of cells"、"numbered markers"、"bulleted markers"、"table for information"、"table for layout"。

**第二階段：背誦 `<table>` 屬性與對齊**
- 背熟六屬性（border / width / align / cellspacing / cellpadding / bgcolor）的中文作用與英文定義句；區分 cellspacing（格間）與 cellpadding（格內）。
- 背熟內部標籤巢狀次序 `<table>` ➔ `<caption>` / `<tr>` ➔ `<th>` / `<td>`；背熟 `align`（水平）與 `valign`（垂直）的值。
- 背誦英文短語："specifies the width of the lines surrounding the table elements"、"the space between the edges of the cells and the content of a cell"。

**第三階段：掌握合併與動手寫法**
- 掌握 `rowspan` / `colspan` 的計數規則（含自身），並用「全表欄數一致」法則驗證。
- 親手在瀏覽器寫一遍 Slide 8 的 Statistics 表格，對照渲染結果數格；再寫一次含 `<ol>` + `<ul>` 的頁面。
- 掌握寫法："`<th colspan="2">`"、"`<th rowspan="4">`"、"`<td align="left" valign="top">`"、"`<caption>`"、格內 `<br />`。

**第四階段：延伸媒體（圖片、圖片連結、iframe）**
- 理解 `<img />` 是 empty element（無結束標籤），背熟 src / width / height / border / alt 五屬性與 GIF/JPEG/PNG。
- 掌握「`<a>` 包 `<img />`」的圖片連結寫法及顯示特性（無底線、可能帶邊框，故常用 border="0"）。
- 掌握 `<iframe>` 語法與 name + target 配對機制，能解釋講義「Reason 1 / Reason 2」例子為何在主頁不跳轉的情況下更新框架內容。

**第五階段：應考驗證（能解答甚麼英文考題）**
- 簡答題：「What is the difference between an ordered list and an unordered list?」「Why cannot multi-column tabular formats be created using lists?」「Explain `cellspacing` and `cellpadding`.」「What do `rowspan` and `colspan` do?」「Why is `<img />` called an empty element?」「How does a link display a page inside an `<iframe>`?」
- MC 陷阱題：`<li>` 可否獨立存在；`valign` 的值；`frameborder` 的值（yes/no）；rowspan 數值代表總列數；`bgcolor` 的十六進制寫法。
- 讀碼題：給你一段含 rowspan/colspan 的表格，數出「幾列幾欄、某格覆蓋範圍、某列為何少一格」。

---

## 🎒 6. 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 6.1 關鍵標籤／屬性對照速查

| 你想做甚麼 | 用甚麼（HTML） | 一句英文口訣 |
|-----------|--------------|-------------|
| 數字編號列表 | `<ol>` + `<li>` | "ol = numbered markers" |
| 圓點項目列表 | `<ul>` + `<li>` | "ul = bulleted markers" |
| 表格外框線粗幼 | `<table border="n">` | "border = width of lines around table (pixels)" |
| 表格／欄位闊度 | `<table width="500">` / `width="50%"` | "width = pixels or % of screen width" |
| 整表靠左中右 | `<table align="...">` | "table align = left / right / center" |
| 格與格之間距 | `cellspacing="n"` | "cellspacing = space between cells" |
| 格內邊緣到內容 | `cellpadding="n"` | "cellpadding = space inside cell (default 1px)" |
| 背景顏色 | `bgcolor="white"` 或 `bgcolor="#ffffff"` | "bgcolor = name or #RRGGBB hex" |
| 表格標題 | `<caption>`（緊貼 `<table>` 之後） | "caption surrounds the caption" |
| 一列 | `<tr>` | "tr = table row" |
| 欄標題格 | `<th>` | "th = table heading" |
| 資料格 | `<td>` | "td = table data" |
| 格內水平對齊 | `align="left|right|center"` | "align = horizontal" |
| 格內垂直對齊 | `valign="top|bottom|middle"` | "valign = vertical, flush with top/bottom/middle" |
| 向右合併欄 | `colspan="n"` | "colspan = current + n−1 cells to the right" |
| 向下合併列 | `rowspan="n"` | "rowspan = current + n−1 rows below; skip it in later rows" |
| 插入圖片 | `<img src="..." alt="..." width=".." height=".." border="0" />` | "img = empty element; src = file/URL; alt = text when image cannot display" |
| 圖片做連結 | `<a href="..."><img src="..." border="0" /></a>` | "put img inside a; no underline, maybe a border" |
| 網頁內嵌小視窗 | `<iframe src="URL" frameborder="yes|no">...</iframe>` | "iframe = floating / internal frame" |
| 連結在框架內開 | `<iframe name="X">` + `<a target="X">` | "target = name → page loads inside the frame" |

### 6.2 英文極速記憶口訣 (Rapid Memory Mnemonics)

1. **Lists:** "**O**rdered → **O**ne-two-three；**U**nordered → **U**nmarked dots"（`<ol>` 數字、`<ul>` 圓點、項目一律 `<li>`）。
2. **Table skeleton:** "**T**able holds **R**ows, **R**ows hold **H**eadings & **D**ata"（`<table>` ➔ `<tr>` ➔ `<th>`/`<td>`；caption 在 table 之下第一行）。
3. **Two paddings:** "**SP**acing = **SP**ace **between** cells；**P**adding = **P**adding **inside** the cell"（spacing 是格與格之間；padding 是格內空間，預設 1px）。
4. **align vs valign:** "**a**cross = a**lign**（左右）；**v**ertical = **v**align（上下）"。
5. **Span counting:** "**col**span goes **col**umn-wise to the **right**；**row**span goes **row**-wise **down** — and never forget: the number **includes itself**"（colspan 向右、rowspan 向下，數值都含自身一格）。
6. **Image elements:** "**I**mages have **S**ource, **S**ize, **S**tyle-border and **A**lt-text"（src / width / height / border / alt；`<img />` 是 empty element，無 `</img>`）。
7. **iframe magic:** "**N**ame the frame, **T**arget the name — the page appears **i**nside, not **o**utside"（`name` 與 `target` 相同值 → 內容載入框架內）。
8. **Two uses of table:** "**I**nformation **o**r **L**ayout — one shows data, the other builds the page"。

### 6.3 60 秒自測清單

- [ ] 我能背出 `<ol>`/`<ul>`/`<li>` 的分別與英文定義？
- [ ] 我能默寫 `<table>` 六屬性及各自單位？
- [ ] 我能說出 `cellspacing` 與 `cellpadding` 的分別（含預設 1px）？
- [ ] 我能分辨 `align`（left/right/center）與 `valign`（top/bottom/middle）？
- [ ] 我能解釋 `colspan="2"` 與 `rowspan="4"` 覆蓋的範圍？
- [ ] 我能說出 `<caption>`、`<tr>`、`<th>`、`<td>` 的正確巢狀次序？
- [ ] 我能默寫 `<img />` 五屬性並解釋「empty element」？
- [ ] 我能解釋「`<a>` 包 `<img />`」與 `border="0"` 的用意？
- [ ] 我能寫出 `<iframe>` 語法並解釋 `frameborder`、`name` + `target` 的配合？
- [ ] 我能分辨 table for information 與 table for layout？

> 最後提醒：本課全屬 HTML 4 語法教材——考試請以教材定義作答（如 `frameborder` 用 "yes"/"no"、`cellspacing` 描述為分隔項目的線寬），切勿混入 CSS 佈局答案。祝考試順利！
