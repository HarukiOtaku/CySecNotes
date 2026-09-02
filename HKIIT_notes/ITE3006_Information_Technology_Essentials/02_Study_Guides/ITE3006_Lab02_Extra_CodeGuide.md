# ITE3006 Lab 2 額外練習 1 — Table（HTML 表格合併）雙語實務 CodeGuide

> 本文件係 **Lab 2 "Additional Exercise 1 - Table"** 嘅實務測驗主戰文件（Bilingual Practical CodeGuide）：學生淨係靠呢份文件，就應該可以喺 Practical Test / Lab Test 由零砌出目標表格。每項核心定義都跟「> 英文 Blockquote」英文標準句，可直接照搬作答；所有 HTML tags、attributes 同值一律保留英文原文。步驟解說用香港繁體中文。

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 本 Lab 要掌握嘅實務技能

考官（Practical Test）會直接要你用純 HTML 砌一個「有合併儲存格嘅 table」，本 Lab 就係全套訓練。要掌握嘅技能：

| # | 要掌握嘅實務技能（繁中解說） | 英文對照 (Practical Skill) |
|---|------------------------------|----------------------------|
| 1 | 用 **Emmet** 縮寫一鍵生成 HTML 表格骨架（唔使自己逐格打字） | Generate an HTML table skeleton quickly from an Emmet abbreviation |
| 2 | 用 `border="2"` 令表格格線清楚顯示 | Add the `border` attribute to show the table border clearly |
| 3 | 對住「答案圖」數每行要寫幾多個 `<td>`，再刪走多餘儲存格 | Count the number of cells in each row and delete the unnecessary cells |
| 4 | 用 `colspan`（向右合併欄）同 `rowspan`（向下合併列）砌出目標形狀 | Join / combine cells with the `colspan` and `rowspan` attributes |
| 5 | 設定 `width` / `height`，並理解點解要刪走 `<!DOCTYPE html>`（HTML5 唔支援 table 嘅 width/height 屬性） | Set the `width` and `height` attributes; understand why `<!DOCTYPE html>` must be removed |
| 6 | 用 `align="center"` 令格內文字水平置中 | Center align the content inside cells with `align="center"` |
| 7 | （加分位）用 `bgcolor` 令每行有唔同背景色 | Add `bgcolor` attributes to show a different background colour for each row |

> **English Objective Statement:**
> "The goal of this exercise is to reproduce a given table layout in pure HTML: build a 3 × 3 table with Emmet, keep **1 cell in Row 1, 3 cells in Row 2 and 1 cell in Row 3**, then join the cells with `colspan` and `rowspan` so that the final grid matches the target figure exactly."

### 所需工具 (Required Tools)

- **Brackets**（本 Lab 教材指定編輯器）：內建 **Emmet**，打縮寫後撳 **Tab** 即展開；內建 **Live Preview** 可即時睇瀏覽器效果。
- **快捷鍵：`Ctrl+Shift+D`** = 刪除游標所在嘅成行（Brackets 內 Delete Line），本 Lab 刪格全靠佢。
- **Chrome**（或任何瀏覽器）：用嚟開 `.html` 檔案驗證效果；`F12` → Elements 可睇瀏覽器幫你「修正」嘅 DOM。
- Notepad++ 亦可以做（淨係冇 Emmet 同 Live Preview），考試時記得用 Lab 指定嘅 Brackets。

> **English Environment Note:**
> "Open Brackets, create a new HTML file, type the Emmet abbreviation inside the `<body>` and press **Tab** to expand it; preview the result in Chrome (Live Preview / F5). Use `Ctrl+Shift+D` to delete a whole line."

### 原題目（英文原文，Reference）

```text
Steps to complete Lab 2 "Additional Exercise 1":
1. Type Emmet code "table>tr*3>td{Hello}*3" to create a 3 x 3 table
2. Add border="2" to show the table border clearly.
3. In the given table layout, find the number of cells in each row.
   Row 1 : 1 cell    Row 2 : 3 cells    Row 3 : 1 cell
   Then delete unnecessary cells from each row.
   (Ctrl+Shift+D can delete a line in the Brackets editor.)
4. Add colspan and rowspan attributes to join/combine cells.
5. Set the width and height attributes of the table. Also remove the line
   <!DOCTYPE html> because HTML5 does not support the width and height attributes.
6. Add align="center" to center align the content in each cell.
7. Optional: Add bgcolor attributes to show different background colour for each row.
```

---

## 🛠️ 解題步驟拆解 (Walkthrough)

> 每一步都係「原題（英文）在前 → 解法 1 ➔ 2 ➔ 3 → 驗證」。跟住做，最後個 table 就會同答案圖一模一樣。

### 題目 1 — 用 Emmet 生成 3×3 表格

> **Original instruction:**
> "Type Emmet code `table>tr*3>td{Hello}*3` to create a 3 x 3 table."

**解法：**

1 ➔ 喺 Brackets 開新 HTML 檔，將游標放入 `<body>` 入面，直接打字（**唔好打 `<` 同 `>`**，嗰啲係 Emmet 縮寫語法一部分，淨係打）：

```text
table>tr*3>td{Hello}*3
```

2 ➔ 撳 **Tab** 展開（Brackets 內建 Emmet），會自動生成 3 行 × 3 欄、每格內容係 "Hello" 嘅完整表格：

```html
<table>
    <tr>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
    </tr>
    <tr>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
    </tr>
    <tr>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
    </tr>
</table>
```

3 ➔ **縮寫解讀（必考！）**：`table` = 表格；`>` = 巢入去；`tr*3` = 重複 3 次嘅 table row（3 行）；`td{Hello}*3` = 每行重複 3 次嘅 table data cell，內容係 `{Hello}`（3 欄）。合共 **9 個 `<td>`（3 行 × 3 欄）**。

> **English Emmet Syntax:**
> "`table>tr*3>td{Hello}*3` means: a `<table>` containing three `<tr>` rows, each row containing three `<td>` cells whose content is the text `Hello` — a 3 × 3 table of 9 cells."

**驗證：** 喺 Chrome 開個檔，應該見到一個 3×3 冇格線嘅格仔陣（未加 `border` 睇唔到線係正常）。

---

### 題目 2 — 加 border 令格線清楚

> **Original instruction:**
> "Add `border="2"` to show the table border clearly."

**解法：**

1 ➔ 喺 `<table>` 開始標籤加屬性：

```html
<table border="2">
```

2 ➔ `border="2"` 即格線粗 2 pixels；唔加嘅話表格格線通常唔會顯示，好難對位數格。

> **English Definition:**
> "The `border` attribute specifies the width, in pixels, of the lines surrounding the table elements; e.g. `border="2"` draws 2-pixel table borders."

**驗證：** 重新整理（`F5` 或 Live Preview），應該見到每格都有齊格線。

---

### 題目 3 — 數格（填空題 (a)(b)(c)）

> **Original instruction:**
> "In the given table layout, find the number of cells in each row."

**解法（答案已經喺 Lab 題目俾埋，但要明白點解）：**

1 ➔ 睇「答案圖」（目標 layout）：要砌嘅最終形狀係——**上面一行闊格、中間三個格、下面再一個闊格**。對住幅圖數「每行 HTML 要寫幾多個 `<td>`」：

| 填空 | Row | 答案 | 點解 |
|------|-----|------|------|
| (a) | **Row 1** | **1 cell** | 頂行係 1 個橫跨全闊嘅大格，最後要用 `colspan="3"` 拉闊 |
| (b) | **Row 2** | **3 cells** | 中間行係並排 3 個格，第 1、3 格最後要加 `rowspan="2"` |
| (c) | **Row 3** | **1 cell** | 最底行中間得 1 個新格——左右兩欄已經被 Row 2 嘅 `rowspan="2"` 格「借咗落嚟」，唔使再寫 |

2 ➔ 重點概念：**「數格」數嘅係 HTML code 入面每行要寫幾多個 `<td>`**，唔係單睇畫面格數。`rowspan` 嘅格會由上面一行伸落嚟，所以下面一行要自己寫嘅 `<td>` 就會少咗。

3 ➔ 由 3×3（每行 3 格）變成目標 (a)(b)(c) = 1 / 3 / 1：**Row 1 刪 2 格、Row 3 刪 2 格**，全表由 9 格變 **5 格**。

> **English Key Rule:**
> "Count the number of `<td>` elements you must type in each row. A cell extended by `rowspan` already occupies its grid position in the following rows, so those rows do not repeat it."

---

### 題目 4 — 刪走多餘儲存格

> **Original instruction:**
> "Then delete unnecessary cells from each row. `Ctrl+Shift+D` can delete a line in the Brackets editor."

**解法：**

1 ➔ 將游標放喺要刪嘅 `<td>Hello</td>` 嗰行，撳 **`Ctrl+Shift+D`** 成行刪走（逐行刪，唔好刪錯 `<tr>`）。

2 ➔ **Row 1**：刪 2 格，淨返 1 格；**Row 3**：刪 2 格，淨返 1 格；**Row 2 全部保留**。刪完嘅 code 係咁（每行 1 / 3 / 1 個 `<td>`，合共 5 個）：

```html
<table border="2">
    <tr>
        <td>Hello</td>          <!-- Row 1：得返 1 格 -->
    </tr>
    <tr>
        <td>Hello</td>          <!-- Row 2：3 格 -->
        <td>Hello</td>
        <td>Hello</td>
    </tr>
    <tr>
        <td>Hello</td>          <!-- Row 3：得返 1 格 -->
    </tr>
</table>
```

3 ➔ 呢個時候喺瀏覽器睇，個表係「歪歪斜斜」嘅：因為仲未用 `colspan` / `rowspan` 合併，格仔未對齊目標形狀——**呢個係正常過渡狀態，下一步就係合併**。

> **English Note:**
> "After deletion the code holds 5 cells in total — 1 in Row 1, 3 in Row 2, 1 in Row 3 — but the layout is not correct until the cells are joined in the next step."

⚠️ **小心：** `Ctrl+Shift+D` 刪嘅係「成行」。如果游標喺 `<tr>` 嗰行，會連成行 row 都刪埋，唔好撳錯。

---

### 題目 5 — 用 colspan 同 rowspan 合併儲存格

> **Original instruction:**
> "Add `colspan` and `rowspan` attributes to join/combine cells."

**解法：**

1 ➔ **Row 1 唯一嗰格**加 `colspan="3"`——令佢向右食埋 3 欄，變成橫跨全闊嘅頂格：

```html
<td colspan="3">Hello</td>
```

2 ➔ **Row 2 嘅第 1 格同第 3 格**各加 `rowspan="2"`——令佢哋向下伸多 1 行（佔 Row 2 + Row 3）：

```html
<tr>
    <td rowspan="2">Hello</td>   <!-- 第 1 格：向下合併 2 列 -->
    <td>Hello</td>               <!-- 中間格：普通 -->
    <td rowspan="2">Hello</td>   <!-- 第 3 格：向下合併 2 列 -->
</tr>
```

3 ➔ **Row 3 唯一嗰格乜都唔使加**——因為 Row 3 嘅第 1、3 欄已經被上面兩格 `rowspan="2"` 佔咗，瀏覽器會自動將呢個新 `<td>` 排入**中間欄**。全表欄數保持 3 欄一致。

> **English Definition — colspan:**
> "With `colspan="3"`, the `<td>` element covers three columns: the current one and the two to the right."
>
> **English Definition — rowspan:**
> "With `rowspan="2"`, the `<td>` element covers two rows: the current one and the one below it. In the next row there is no need to specify the cell again."

**驗證（重要）：** 睇返瀏覽器——而家個形狀應該係：頂行 1 個闊格、下面兩行形成 3 欄，而左右兩欄係連埋嘅高格（Row 2 → Row 3 中間嗰條橫線**只喺中間欄出現**）。呢個就係答案圖嘅形狀。

---

### 題目 6 — 設定 width / height，並刪走 `<!DOCTYPE html>`

> **Original instruction:**
> "Set the `width` and `height` attributes of the table. Also remove the line `<!DOCTYPE html>` because HTML5 does not support the `width` and `height` attributes."

**解法：**

1 ➔ 喺 `<table>` 標籤加 `width` 同 `height`（用百分比，等於畫面闊度／高度嘅比例）：

```html
<table border="2" width="100%" height="80%">
```

2 ➔ **刪走第一行 `<!DOCTYPE html>`**——呢個係成個 Lab 最易俾人忽略嘅關鍵位！

3 ➔ **點解要刪？（必考問答）**：

> **English Explanation (memorize this sentence):**
> "`width` and `height` are legacy HTML 4 attributes of the `<table>` element. **HTML5 no longer supports them**, so in standards mode the browser ignores them. Removing the `<!DOCTYPE html>` declaration switches the browser into **quirks mode**, in which these old attributes are honoured again. The modern solution is to use CSS instead."

**驗證：** 如果唔刪 `<!DOCTYPE html>`，個 table 唔會變闊變高（width/height 被忽略）；刪咗之後 table 先會佔畫面 100% 闊、80% 高。可以開/閂個 DOCTYPE 各試一次，親眼睇個分別。

---

### 題目 7 — align="center" 令格內內容水平置中

> **Original instruction:**
> "Add `align="center"` to center align the content in each cell."

**解法：**

1 ➔ `align` 控制**格內內容嘅水平對齊**（值：`left` / `center` / `right`）。可以放喺 `<td>` 或 `<th>` 上面，亦可以放喺 `<tr>` 上面一次過控制成行。

2 ➔ 本 Lab 答案做法：Row 1 個闊格同 Row 3 嗰格喺 `<td>` 加 `align="center"`；Row 2 喺 `<tr>` 加 `align="center"`（一次過令 3 格置中）：

```html
<tr>
    <td colspan="3" align="center">Hello</td>
</tr>
<tr align="center">
    <td rowspan="2">Hello</td>
    <td>Hello</td>
    <td rowspan="2">Hello</td>
</tr>
<tr>
    <td align="center">Hello</td>
</tr>
```

3 ➔ 留意 `align` 放喺 `tr` 定 `td` 都得，效果一樣；但**唔好**淨係放喺 `<table>`——table 上面嘅 `align` 係控制「成張表靠左/靠右/置中」，唔係格內文字。

> **English Definition:**
> "The `align` attribute of a table cell (`<td>` / `<th>`) or a table row (`<tr>`) defines whether the data inside is aligned with the left cell margin, the right, or centered (`left` / `center` / `right`)."

**驗證：** 所有 "Hello" 都應該喺各自嘅格入面水平置中。

---

### 題目 8（Optional 加分位）— 每行唔同背景色

> **Original instruction:**
> "Add `bgcolor` attributes to show different background colour for each row."

**解法：**

1 ➔ 喺每個 `<tr>` 上面加 `bgcolor`，顏色可用**顏色名稱**（如 `lightgreen`、`yellow`、`lightblue`）或 **RGB 十六進制**（如 `#ffffcc`）：

```html
<tr bgcolor="lightyellow">
    <td colspan="3" align="center">Hello</td>
</tr>
<tr align="center" bgcolor="lightgreen">
    <td rowspan="2">Hello</td>
    <td>Hello</td>
    <td rowspan="2">Hello</td>
</tr>
<tr bgcolor="lightblue">
    <td align="center">Hello</td>
</tr>
```

2 ➔ 每行揀唔同顏色，令三行清楚分開——加分位通常係「一眼睇到每行唔同色」就得。

> **English Definition:**
> "The `bgcolor` attribute specifies the background colour of a table item, by name or by RGB components in hexadecimal, e.g. `bgcolor="lightgreen"` or `bgcolor="#ccffcc"`."

---

### 最終答案總覽（合併晒所有步驟）

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <table border="2" width="100%" height="80%">
        <tr bgcolor="lightyellow">                 <!-- Row 1：1 格，橫跨全闊 -->
            <td colspan="3" align="center">Hello</td>
        </tr>
        <tr align="center" bgcolor="lightgreen">   <!-- Row 2：3 格，左右兩格向下伸 -->
            <td rowspan="2">Hello</td>
            <td>Hello</td>
            <td rowspan="2">Hello</td>
        </tr>
        <tr bgcolor="lightblue">                   <!-- Row 3：1 個新格，自動入中間欄 -->
            <td align="center">Hello</td>
        </tr>
    </table>
</body>
</html>
```

> ⚠️ 注意：上面 `<!DOCTYPE html>` 已經刪走（題目 6 要求），先至會見到 `width="100%"` / `height="80%"` 嘅效果。

---

## 💻 關鍵 HTML/CSS/JS 程式碼 (Key Code)

> 本 Lab 係**純 HTML**（教材沿用 HTML 4 語法），完全冇 JavaScript；CSS 只喺最尾作為「現代正確寫法」對照參考。

### 1. Emmet 縮寫 → 展開後嘅 3×3 骨架

```text
table>tr*3>td{Hello}*3      ← Brackets 入面打呢行，再撳 Tab
```

```html
<!-- Emmet 展開後：3 行 × 3 欄 = 9 個 td -->
<table border="2">          <!-- border="2"：格線粗 2px，睇清楚每格 -->
    <tr>                    <!-- tr = table row：每一行用一個 tr 包住 -->
        <td>Hello</td>      <!-- td = table data：每格內容用 td 包住 -->
        <td>Hello</td>
        <td>Hello</td>
    </tr>
    <tr>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
    </tr>
    <tr>
        <td>Hello</td>
        <td>Hello</td>
        <td>Hello</td>
    </tr>
</table>
```

### 2. 合併完成嘅最終版本（逐行註解）

```html
<!-- ===== 最終答案（刪走咗 <!DOCTYPE html>；行緊 quirks mode）===== -->
<html lang="en">                    <!-- 文件根元素；lang 標明語言 -->
<head>                              <!-- head：頁面設定區，唔會顯示喺畫面 -->
    <meta charset="UTF-8">          <!-- 宣告字符編碼 UTF-8（繁中先唔會亂碼） -->
    <title>Document</title>         <!-- 瀏覽器分頁標題 -->
</head>
<body>                              <!-- body：所有可見內容放呢度 -->
    <table border="2" width="100%" height="80%">
    <!-- ↑ table 開 tag：border 格線粗幼；width/height 用畫面百分比；
         冇咗 DOCTYPE 先至會生效（HTML5 唔支援 table 嘅 width/height） -->
        <tr bgcolor="lightyellow">  <!-- Row 1（tr = 一行）底色淺黃 -->
            <td colspan="3" align="center">Hello</td>
            <!-- ↑ colspan="3"：呢格向右覆蓋 3 欄 → 頂行得 1 格橫跨全闊；
                 align="center"：格內文字水平置中 -->
        </tr>
        <tr align="center" bgcolor="lightgreen">
        <!-- ↑ Row 2：tr 上嘅 align 令成行 3 格嘅內容都置中；底色淺綠 -->
            <td rowspan="2">Hello</td>
            <!-- ↑ rowspan="2"：第 1 格向下覆蓋 2 列（Row 2 + Row 3 嘅第 1 欄），
                 Row 3 唔使再寫呢格 -->
            <td>Hello</td>          <!-- 中間普通格，只佔 Row 2 中間欄 -->
            <td rowspan="2">Hello</td>
            <!-- ↑ rowspan="2"：第 3 格同樣向下覆蓋 Row 3 嘅第 3 欄 -->
        </tr>
        <tr bgcolor="lightblue">    <!-- Row 3 底色淺藍 -->
            <td align="center">Hello</td>
            <!-- ↑ Row 3 得 1 個新 td：第 1、3 欄已被上面 rowspan 佔用，
                 瀏覽器自動將呢格放入中間欄（第 2 欄） -->
        </tr>
    </table>
</body>
</html>
```

### 3. 最終渲染形狀（對答案圖）

```text
┌─────────────┬─────────────┬─────────────┐
│                 Hello                   │   ← Row 1：1 格（colspan="3"）
├─────────────┼─────────────┼─────────────┤
│   Hello     │   Hello     │   Hello     │   ← Row 2：3 格（左右格 rowspan="2"）
│             ├─────────────┤             │   ← Row 2/3 之間橫線只喺中間欄
│   Hello     │   Hello     │   Hello     │   ← Row 3：中間 1 個新格
└─────────────┴─────────────┴─────────────┘
```

### 4. 現代 HTML5 + CSS 對照（理解用，唔係本 Lab 答案）

Lab 用 HTML 4 舊式屬性，係因為課程教材如此；真實開發 HTML5 會用 CSS 取代呢啲屬性：

```css
/* 現代寫法：取代 border / width / height / align / bgcolor 等舊屬性 */
table {
    border-collapse: collapse;   /* 格線合併，先至似 border 效果 */
    width: 100%;                 /* 取代舊 width="100%" */
    height: 80%;                 /* 取代舊 height="80%" */
}
td {
    border: 1px solid black;     /* 取代舊 border="2" 嘅格線 */
    text-align: center;          /* 取代舊 align="center" */
}
tr:nth-child(1) { background-color: lightyellow; }  /* 取代 bgcolor（每行唔同色） */
tr:nth-child(2) { background-color: lightgreen; }
tr:nth-child(3) { background-color: lightblue; }
```

```html
<!-- 現代 HTML5 版本：唔使刪 DOCTYPE，外觀全部交畀 CSS -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">   <!-- 引入 CSS 檔 -->
</head>
<body>
    <table>
        <tr><td>Hello</td></tr>
        <tr><td>Hello</td><td>Hello</td><td>Hello</td></tr>
        <tr><td>Hello</td></tr>
    </table>
</body>
</html>
```

### 5. JavaScript？

> 本 Lab **完全冇用到 JavaScript**（JS 由 Lab 7 先開始教）。呢份 Lab 只需要 HTML 結構 + 屬性。實務測驗如果問「呢個 table 有冇 JS 效果？」，答案係冇——一切互動效果都未出現住。

---

## 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|--------------|------|-----|
| 表格冇格線，睇唔到每格 | 冇加 `border` 屬性（或打咗 `border="0"`） | 喺 `<table>` 加 `border="2"`：`<table border="2">` |
| 打咗 `width="100%"` / `height="80%"` 但完全冇效 | `<!DOCTYPE html>` 未刪走 → 瀏覽器行 HTML5 standards mode，**忽略 table 嘅 width/height 屬性** | 刪走第一行 `<!DOCTYPE html>`（行 quirks mode）；或改用 CSS |
| 想合併嘅格冇合併／形狀同答案圖唔同 | `colspan` / `rowspan` 數錯（例如 colspan 寫咗 2 但其實要 3） | `colspan="n"` 向右覆蓋 n 欄、`rowspan="n"` 向下覆蓋 n 列，**數值包含自身**；對答案圖逐格驗算 |
| 用咗 `rowspan` 之後，下面一行出現「多咗一格」／欄數亂晒 | 喺 rowspan 佔咗位嘅行**又再寫多一次嗰格** | rowspan 嘅格伸到嘅行**唔使再寫**；用「全表任何一行佔用嘅欄總數都係 3」嚟驗算 |
| 所有 `<td>` 全部堆埋同一行，點解都係得一列 | 漏咗 `<tr>`（或者刪格時連 `<tr>` 一齊刪咗） | 每行必須用 `<tr>...</tr>` 包住；`F12` → Elements 會見到瀏覽器自動補嘅 `<tr>` |
| 刪格時連 row 都唔見咗 | 游標喺 `<tr>` 嗰行撳咗 `Ctrl+Shift+D`（刪咗成行） | 游標要放喺 `<td>...</td>` 嗰行先刪；刪完睇返 `<tr>` 數目 |
| `align="center"` 加咗但文字冇置中 | 放錯位置——加咗喺 `<table>`（嗰個係控制成張表嘅對齊）或者打錯值（例如 `centre`） | 放喺 `<td>` / `<th>` / `<tr>` 上面，值要用英文 `center` |
| 想垂直置中但 `align` 冇用 | `align` 只控制**水平**對齊 | 垂直要用 `valign`（`top` / `middle` / `bottom`） |
| `bgcolor` 冇變色 | 顏色名打錯／中間有空格（例如 `light green`）、或者放咗喺 `<table>` 而唔係 row | 用正確名稱（`lightgreen` 冇空格）或十六進制 `#ccffcc`；放喺對應嘅 `<tr>` |
| Emmet 縮寫撳 Tab 冇反應 | 游標唔喺 HTML 檔內、縮寫有空格、或者打多咗 `<` `>` | 淨係打 `table>tr*3>td{Hello}*3`（冇空格冇尖括號），游標放 `<body>` 內再撳 Tab |
| 用中文輸入法打引號，屬性全部失效 | 打咗全形引號 `“ ”` 或全形括號 | 屬性值一定要用**半形** `"` 雙引號 |
| 改完 code 瀏覽器冇更新 | 瀏覽器 cache 舊版 | 用 Brackets Live Preview，或 Chrome 撳 `Ctrl+F5` 強制重新整理 |

**Debug 小貼士：**
- `F12` → **Elements** 面板會顯示瀏覽器「實際」解析出嚟嘅 DOM——佢會自動修正（例如幫你補 `<tr>`、`<tbody>`），睇呢度就知自己嘅 HTML 邊度結構錯咗。
- Brackets **Live Preview**（右上角閃電 icon）一儲存就即時更新，慳好多重新整理時間。
- 每一步改完都儲存 + 睇一次瀏覽器，**逐個步驟驗證**，唔好一次過改晒先睇——咁樣一錯就知錯喺邊步。

---

## 📝 測驗常見題型 (Common Test Questions)

### Q1. 寫碼題（Practical Test 最大機會）：照「答案圖」砌 table

考官會俾一幅 layout 圖，叫你用 HTML 砌返出嚟（同本 Lab 一樣）。**答題要點：**
1 ➔ 先數**行數**（幾個 `<tr>`）同**每行要寫幾多個 `<td>`**（記得：rowspan 佔咗位嗰啲行唔使再寫）。
2 ➔ 再決定邊啲格要 `colspan`（橫跨幾多欄）、邊啲要 `rowspan`（覆蓋幾多列，數值**含自身**）。
3 ➔ 最後驗算：**任何一行嘅「自身格 + 由上面伸落嚟嘅格 + colspan 佔位」加埋都係同一欄數**（本 Lab 係 3）。

### Q2. 讀碼數格題（俾 code 叫你數）

俾你一段含 `colspan` / `rowspan` 嘅 table code，問：總共幾多列幾多欄？某格覆蓋幾多格？某行點解少一格？**答題要點：**
- `colspan="n"` → 向右食 n 欄（本身 + 右邊 n−1）；`rowspan="n"` → 向下食 n 列（本身 + 下面 n−1）。
- rowspan 伸到嘅行，嗰行嘅 `<td>` 數目會少咗——**唔係 bug，係正常**。
- 用「網格佔位」方法：畫 3 欄嘅格仔，逐格填，睇下邊個位俾人佔咗。

> **English Model Answer:**
> "The table has 3 rows and 3 columns. The first cell of Row 1 uses `colspan="3"`, so it covers the whole first row. In Row 2 the first and third cells each use `rowspan="2"`, so they also cover Row 3; therefore Row 3 only needs one new `<td>`, which the browser places in the middle column."

### Q3. 填空／短答：colspan 與 rowspan 嘅定義

- (a) `colspan="3"` 嘅格覆蓋幾多欄？→ "It covers **three columns**: the current one and the two to the right."
- (b) `rowspan="2"` 嘅格覆蓋幾多列？→ "It covers **two rows**: the current one and the one below it."
- (c) 用咗 `rowspan="4"` 之後，下面幾多行唔使再寫嗰格？→ "In the next three rows there is no need to specify the cell again."（4 − 1 = 3 行）
- 陷阱：問「伸延幾多格」定「總共覆蓋幾多格」——**數值永遠包含自身一格**。

### Q4. Emmet 題

- 俾縮寫問展開結果：`table>tr*3>td{Hello}*3` → 3×3、每格 "Hello"。
- 俾目標問縮寫：例如「3 行、每行 2 格、內容為 Hi」→ `table>tr*3>td{Hi}*2`。
- 答題要點：`*n` 重複次數、`{text}` 係格內文字、`>` 表示巢入去、順序係 `table > tr > td`。

### Q5. 屬性 MCQ／短答

- `border` 單位：pixels；`width` / `height` 單位：pixels 或**屏幕寬度百分比**（screen width %）。
- `align` 值：`left` / `center` / `right`（水平）；`valign` 值：`top` / `middle` / `bottom`（垂直）——兩者唔好撈亂。
- `bgcolor` 兩種寫法：顏色名稱（`bgcolor="lightgreen"`）或 RGB 十六進制（`bgcolor="#ccffcc"`）。
- `cellspacing`（格與格之間距離）vs `cellpadding`（格邊與內容之間距離）。

### Q6. 問答題（最有深度）：點解要刪 `<!DOCTYPE html>`？

**答題要點（背呢句）：**
> "The `width` and `height` attributes of `<table>` are **not supported in HTML5**, so the browser ignores them in standards mode. By removing the `<!DOCTYPE html>` declaration, the page runs in **quirks mode** and the browser honours the old attributes. In modern web development we should use **CSS** (`width`, `height`) instead of these legacy attributes."

### Practical Test 最後 60 秒 Check List

- [ ] 每行 `<td>` 數目係 1 / 3 / 1？
- [ ] Row 1 嗰格有 `colspan="3"`？
- [ ] Row 2 第 1、3 格有 `rowspan="2"`？
- [ ] `<!DOCTYPE html>` 已刪走（先見到 width/height 效果）？
- [ ] 全部格內容 `align="center"` 置中？
- [ ] （加分）三行唔同 `bgcolor`？
- [ ] 儲存 + Chrome 開一次，同答案圖對樣？

---

## 🔗 理論 Recap

1. **表格 = 長方形儲存格網格**：`<table>` 包全表、`<tr>` 包每一行、`<td>`（資料格）/ `<th>`（標題格）包每一格——"A table should be considered as a **rectangular grid of cells**."
2. **巢狀次序不能錯**：`<table>` ➔ `<tr>` ➔ `<td>`；漏咗 `<tr>` 所有格會堆埋一行——"Each row is surrounded by `<tr>`, each cell by `<td>`."
3. **`colspan="n"` 向右合併 n 欄、`rowspan="n"` 向下合併 n 列，數值都含自身一格**——"With `rowspan="2"`, the cell covers two rows: the current one and the one below; the next row does not specify it again."
4. **合併後欄數要一致**：每行「自身格 + 佔位格」加埋必須等於全表欄數（本 Lab = 3）——"Every row must occupy the same number of column slots."
5. **`border` / `width` / `height` / `align` / `valign` / `bgcolor` 係 HTML 4 舊式屬性**：HTML5 唔再支援 table 嘅 `width` / `height`，刪走 `<!DOCTYPE html>` 令瀏覽器行 **quirks mode** 先會生效——"HTML5 does not support these attributes; without the DOCTYPE the page runs in quirks mode."
6. **現代開發用 CSS 取代舊屬性**：`border`、`width`、`text-align`、`background-color` 全部交畀 CSS；本 Lab 依教材用 HTML 4 語法作答——"In modern HTML5, presentational styling is done with CSS, not attributes."
7. **Emmet 縮寫** `table>tr*3>td{Hello}*3` = 一鍵生成 3×3 表格骨架，再撳 Tab 展開——"Emmet abbreviations expand into HTML with `>` (child), `*n` (repeat) and `{text}` (content)."
