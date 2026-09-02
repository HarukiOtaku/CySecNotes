# ITE3006 Lab 6 CodeGuide：Page Layout with CSS（響應式版面 — 實務測驗主戰文件）

> **Course:** ITE3006 Information Technology Essentials　**Lab:** Lab 6 – Page Layout with HTML and CSS
> **Files to work with:** `lab06_1.html` + `lab06_1.css` + `VTC.png`（三個檔案要放喺同一個資料夾）
> **This Lab uses HTML + CSS only — there is NO JavaScript in this lab.**（實務測驗都只會考 HTML/CSS，唔會有 JS 題）

---

## 🔗 理論 recap（開頭 5–8 行速讀：本 Lab 用咗咩理論）

1. **Flexbox 版面**：喺父容器（`#flex-container`）加 `display: flex;`，佢嘅直接子元素就會變做 **flex items**，可以控制排位、伸縮同次序。
2. **Flex 子項三大控制**：`flex-grow`（食剩餘空間伸縮）、`order`（視覺次序，預設值 `0`）、`width`/`flex-basis`（基礎寬度）。
3. **響應式設計（Responsive Web Design）**：用 `@media only screen and (max-width: 1000px)` 喺視窗闊度改變時切換 CSS 規則。
4. **CSS 層疊（Cascade）**：相同 specificity 之下，**愈後寫嘅規則愈優先**；基礎規則放最前，media query 放最後。
5. **圖文繞排**：`float: left;` 令圖片靠左，文字自動繞住圖片；`clear` 控制元素可否同 float 元素並排。
6. **顯示控制**：`display: none;` 完全移除元素（連位置都讓返出嚟）；`display: flex;` 將 list 變橫向一排。
7. **CSS 縮寫（Shorthand）**：`background`、`border`、`margin`、`padding`、`flex-flow` 等都係縮寫，考試要識拆返開逐個 longhand property。

> Key sentence: "Flexbox arranges items in a row/column; `@media` swaps the layout when the viewport width crosses breakpoints (1000px / 800px); `order` changes visual order without touching the HTML."

---

## 1. 🎯 Lab 目標與環境 (Objectives & Environment)

### 目標（官方 ILO）

> **Intended Learning Outcome:**
> 1. Understand the different layout designs and the related CSS properties.
> 2. Design a web page which shows different layout when the browser width changes.

### 你要掌握嘅實務技能（測驗會直接考）

- 用 **CSS Flexbox**（`display: flex;`、`flex-flow: row wrap;`）砌「Header + Nav + Main + Aside + Footer」嘅典型版面。
- 用 **`flex-grow`** 令中間區塊隨視窗闊度自動伸縮。
- 用 **`order`** 重新排列 flex items 嘅**視覺次序**（唔使改 HTML）。
- 用 **`@media` media query**（`max-width: 1000px` / `max-width: 800px`）做**響應式版面**：闊畫面三欄、中等畫面對調左右欄、細畫面隱藏側欄兼將導覽列變橫向。
- 用 **`float: left;`** 做到圖片靠左、文字繞圖。
- 用 **`-webkit-column-count` / `-webkit-column-span`** 將長文字分欄。
- 識 **CSS ID selector（`#id`）**、**group selector（逗號分隔）** 同 **shorthand properties**。

### 環境與工具（Resources Required）

> **Resource Required:**
> 1. A text editor such as Notepad++.
> 2. A browser such as Google Chrome or Mozilla Firefox.

| 工具 | 用途 | 實務貼士 |
|---|---|---|
| **Notepad++**（或 VS Code） | 寫/改 `lab06_1.html`、`lab06_1.css` | 記得 Save（Ctrl+S）先至會生效 |
| **Google Chrome / Firefox** | 開 `.html` 檔測試版面 | 直接 double-click 個檔用瀏覽器開就得，**唔使 server** |
| **DevTools（F12）** | 快速測唔同闊度 | Elements 檢查樣式、Responsive Mode 拉闊度測 breakpoint |

### 起始檔案結構（三個檔案必須喺同一資料夾）

```
lab/
├── VTC.png          # VTC 標誌圖片（任務 e 用）
├── lab06_1.html     # 頁面結構（HTML）
└── lab06_1.css      # 全部樣式（CSS）
```

> The CSS file is linked from the HTML with `<link rel="stylesheet" href="lab06_1.css" />`. If the file is missing or the name is mistyped, no styles will apply.

---

## 2. 🛠️ 解題步驟拆解 (Walkthrough)

**大方向**：呢個 Lab 由一份「5 個 `<div>` 區塊」嘅 HTML 起步，靠 12 步（a–l）逐層加 CSS，最後變成一頁**隨視窗闊度改變版面**嘅響應式網頁。

先睇起步檔 `lab06_1.html` 嘅骨架（**唔使改**，係 Lab 提供嘅）：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Responsive Layout</title>
  <link rel="stylesheet" href="lab06_1.css" />
</head>
<body>
  <div id="flex-container">       <!-- 外層容器：將來做 flex container -->
    <div id="header">Header</div>     <!-- 五個文字區塊，順序：header → nav → main → aside → footer -->
    <div id="nav">Navigation</div>
    <div id="main">Main Content</div>
    <div id="aside">Aside Content</div>
    <div id="footer">Footer</div>
  </div>
</body>
</html>
```

> Five text blocks are `<div>` elements identified by **`id` attributes**. In CSS you select an id with a `#` prefix, e.g. `#header` — an **ID selector** must be unique on the page.

`lab06_1.css` 起步只有一行：`body { margin: 0px; font-family: Georgia; }`

> The comment block at the top of each file (`Full Name / Student ID / Class`) must be filled in before submission — markers check it.

---

### (a) 為五個區塊統一加上背景、邊框同圓角

> **Original question (English):** Add the following CSS code to format the five text blocks (`#header, #nav, #main, #aside, #footer`):
> ```css
> #header, #nav, #main, #aside, #footer {
>   background: #DDF; border: 1px solid black;
>   border-radius: 8px; margin: 5px; padding: 15px;
> }
> ```

**解題步驟：**

1 ➔ 喺 `lab06_1.css` 嘅 `body` 規則下面新增一組 **group selector（群組選擇器）**：用逗號 `,` 將五個 ID 寫埋一齊，一次過套用相同樣式。

2 ➔ 逐個 property 理解（測驗會問 shorthand 拆解）：

> - `background: #DDF;` is the shorthand for `background-color: #DDF;` — the 3-digit hex `#DDF` expands to `#DDDDFF` (light blue).
> - `border: 1px solid black;` is the shorthand for `border-width: 1px; border-style: solid; border-color: black;`
> - `border-radius: 8px;` adds **rounded corners** to the border.
> - `margin: 5px;` sets the space **outside** the border on all four sides.
> - `padding: 15px;` sets the space **inside** the border, between the content and the border.

3 ➔ 儲存並刷新瀏覽器（Ctrl+F5 強制刷新），五個區塊應該全部變成淺藍底（`#DDF`）、黑邊、圓角嘅 box。

**答題要點**：`background` / `border` 都係 shorthand；`margin` 係外邊距、`padding` 係內邊距（Box Model 內外之分）。

---

### (b) 將外層容器變成 Flex Container

> **Original question (English):** Add the following CSS code to set the text block `#flex-container` to become a flex container:
> ```css
> #flex-container { display: flex; flex-flow: row wrap; }
> ```

**解題步驟：**

1 ➔ 新增規則令 **父容器** `#flex-container` 變成 flex container。**關鍵：`display: flex;` 一定要加喺「父容器」，唔係加喺子元素**——加錯咗就完全冇 flex 效果。

2 ➔ 加入 `flex-flow: row wrap;` 控制排列方向同換行。

> - `display: flex;` makes the element a **block-level flex container**; its direct children become **flex items** arranged in a row by default.
> - `flex-flow: row wrap;` is the shorthand for `flex-direction: row; flex-wrap: wrap;` — items lay out **left-to-right**, and **wrap onto a new line** when they do not fit.

3 ➔ 刷新睇效果：五個 box 開始可以橫向排／自動換行，呢個係成個版面嘅「骨架」。

**答題要點**：`flex-flow` = `flex-direction` + `flex-wrap`，係 shorthand（測驗好鍾意考拆解）；「邊個元素要加 `display: flex`」= **有幾個子元素想並排嗰個父容器**。

---

### (c) 設定五個區塊嘅正確尺寸

> **Original question (English):** Add the following CSS code to set the five text blocks (`#header, #nav, #main, #aside, #footer`) to correct sizes:
> ```css
> #header { height: auto; width: 100%; }
> #nav { width: 200px; }
> #main { height: auto; background: #FCC; width: 50px; }
> #aside { width: 200px; }
> #footer { height: 50px; width: 100%; }
> ```

**解題步驟：**

1 ➔ 為五個區塊各自設定尺寸，做成典型網頁版面：

> - `#header { width: 100%; }` — the header spans the **full width** on its own row; `height: auto;` lets the height grow with the content.
> - `#nav { width: 200px; }` — fixed **200 px** sidebar on the left.
> - `#aside { width: 200px; }` — fixed **200 px** sidebar on the right.
> - `#footer { width: 100%; height: 50px; }` — full-width bar at the bottom.
> - `#main { background: #FCC; width: 50px; }` — `#FCC` is light **pink**; `width: 50px` is only temporary — the middle block will grow later (task d) to fill the space between the two sidebars.

2 ➔ 儲存刷新後應該見到：頂 header 全寬、中間一行「nav 200px + main + aside 200px」、底 footer 全寬。

**答題要點**：`width: 100%` = 佔滿父容器成行（配合 `flex-wrap: wrap` 自然「換行」獨佔一行）；`width: 200px` 固定闊度做側欄。記得 `#main` 個 `#FCC` 淺粉紅係**暫時**色，之後任務 (h)(j) 會喺 media query 度改色。

---

### (d) 令 Main 區塊自動伸縮（flex-grow）

> **Original question (English):** Modify the CSS code for the `#main` text block by adding the `flex-grow` property so the width of `#main` grows and shrinks when the browser width changes:
> ```css
> #main { height: auto; background: #FCC; width: 50px; flex-grow: 1; }
> ```

**解題步驟：**

1 ➔ 喺原有 `#main` 規則加 `flex-grow: 1;`（其餘照舊）。

> `flex-grow: 1;` specifies the **growth factor** of this flex item **relative to the others**. `#main` absorbs all the free space left over inside the flex container, so it **grows when the browser widens and shrinks when it narrows**.

2 ➔ 刷新後拖闊／收窄瀏覽器視窗：應該見到只有 `#main` 中間嗰格跟住視窗闊度伸縮，而 `#nav`、`#aside` 保持 200px 唔郁。

3 ➔ 理解「點解係 50px 又會變闊」：喺 flex 世界入面，`width` 變成 item 嘅 **basis（基礎寬度）**，`flex-grow: 1` 再將剩餘空間填滿。

**答題要點**：`flex-grow` 只對 **flex items**（父容器係 flex container 嘅子元素）有效；數值愈大食嘅剩餘空間比例愈多。

---

### (e) 喺 Header 加入圖片同文字

> **Original question (English):** Add an image (`VTC.png`) and the following text inside the `#header` text block:
> > Header. To be the leading provider of vocational and professional education and training in the region. To provide a valued choice to school leavers and working adults to acquire values, knowledge and skills for lifelong learning and enhanced employability. To provide valued supports to industries for their manpower development.
>
> Your program code should look like this:
> ```html
> <div id="header"><img src="VTC.png" />
>   <div>Header. To be the . . .their manpower development.</div>
> </div>
> ```

**解題步驟（改 `lab06_1.html`）：**

1 ➔ 將 `#header` 原本淨係得文字 `Header`，改成「圖片 + 一個內層 `<div>` 包住兩句文字」。

2 ➔ 留意語法細節：

> - `<img src="VTC.png" />` is a **self-closing / empty element** — it has no closing tag; `src` names the image file, which must sit in the **same folder** as the HTML.
> - The text goes inside an inner `<div>` **sibling** of the image (not inside `<img>`, which cannot hold text).

3 ➔ 刷新：Header 內會出現 VTC 圖片同兩段文字（呢一刻文字仲喺圖片下面，任務 (f) 先會做到繞圖）。

**答題要點**：圖片同文字係 **siblings（兄弟元素）**，呢個結構係為任務 (f) 嘅 `float` 做準備；`<img>` 係 empty element，冇 `</img>`。

---

### (f) 圖片靠左、文字繞住圖片（float + clear）

> **Original question (English):** Add the following CSS code to push the image to the left edge while the text wraps around the image:
> ```css
> #header img { float: left; margin-right: 10px; }
> #header div { clear: none; }
> ```

**解題步驟：**

1 ➔ 喺 CSS 加兩條規則：`#header img`（**descendant selector**：`#header` 入面所有 `<img>`）同 `#header div`（`#header` 入面所有 `<div>`）。

> - `float: left;` **pushes the image to the left edge** of `#header`; following block content (the text) then **wraps around its right side**. `float` takes the element out of the normal flow and lets text flow beside it.
> - `margin-right: 10px;` keeps a **10 px gap** between the image and the wrapping text.
> - `clear: none;` means the `<div>` **is allowed to sit beside** the floated image (floating elements are allowed on both sides). If it were `clear: both;`, the text would be pushed **below** the image instead of wrapping around it.

2 ➔ 刷新：圖片貼左邊，Header 文字繞住圖片右邊顯示。

**答題要點**：`float: left` 令元素「浮」向某一邊、後面內容繞住佢；`clear` 控制元素嘅兩側**唔准**有 float 元素（`none` = 允許、`both` = 兩邊都唔准 → 落去下一行）。

---

### (g) 用 order 設定五個區塊嘅視覺次序

> **Original question (English):** Add the `order` property to set the visual order of the five text blocks (`#header, #nav, #main, #aside, #footer`):
> ```css
> #header { order: 1; height: auto; width: 100%; }
> #nav { order: 2; width: 200px; }
> #main { order: 3; height: auto; background: #FCC; width: 50px; flex-grow: 1; }
> #aside { order: 4; width: 200px; }
> #footer { order: 5; height: 50px; width: 100%; }
> ```

**解題步驟：**

1 ➔ 喺五條規則各自加 `order: 1;` 至 `order: 5;`（header=1, nav=2, main=3, aside=4, footer=5）。

> The `order` property specifies the **order of a flex item relative to the rest inside the same flex container**. Items are laid out from the **smallest `order` value to the largest** (the default `order` is `0`). It changes the **visual order only** — the HTML source order stays unchanged.

2 ➔ 刷新後你會發現**版面完全冇變**——因為 HTML 入面 header→nav→main→aside→footer 嘅順序同 order 1→5 一樣。

3 ➔ 記住呢個「冇變」係正常（Lab 原文都話 *there is no change in the page layout*）：`order` 嘅威力要喺之後 media query 改數值先顯現（任務 h/j 會令 aside 同 nav 對調、喺細畫面重排）。

**答題要點**：`order` 只對 flex items 生效；**唔改 HTML 都可以改顯示次序**——測驗會叫你「唔郁 HTML 之下將兩個區塊對調」，答案就係改 `order`。

---

### (h) Media Query ①：視窗 ≤1000px 時對調 nav 同 aside

> **Original question (English):** Create a media query so that when the browser width is *less than or equal to 1000px*, change the width of `#nav` and `#aside` to 100px and exchange (swap) their positions. Also change the background colour of `#main` to `#CFC` (light green):
> ```css
> @media only screen and (max-width: 1000px) {
>   #nav { order: 4; width: 100px; }
>   #main { height: auto; background: #CFC; }
>   #aside { order: 2; width: 100px; }
> }
> ```

**解題步驟：**

1 ➔ 喺 CSS **最尾**新增一個 `@media` 區塊（一定要喺基礎規則之後——層疊原則：後寫優先，先可以覆蓋）。

> The `@media` rule defines **different style rules when device properties change** (e.g. width).
> - `only screen` — the rules apply to **screen output only** (not print).
> - `and (max-width: 1000px)` — the rules apply when the viewport width is **less than or equal to 1000 px**.
> - Example syntax: `@media only screen and (max-width: 1000px) { ... }`

2 ➔ 睇 media query 入面做咗啲咩（「對調」其實係改 order，唔係郁 HTML）：

> - `#nav { order: 4; width: 100px; }` — nav 由 order 2 改做 **4**，闊度收窄到 **100px** → 排到最右。
> - `#aside { order: 2; width: 100px; }` — aside 由 order 4 改做 **2**，闊度 **100px** → 排到最左。
> - `#main { background: #CFC; }` — main 中間格變成 **light green（淺綠）**（`#CFC` = `#CCFFCC`）。
> - 結果中間一行次序由「nav | main | aside」變成「**aside | main | nav**」——兩欄**交換咗位置**。

3 ➔ 測試：將瀏覽器視窗拖到 **1000px 或以下**（或 DevTools Responsive Mode 直接揀闊度），版面會即時切換；拖返闊過 1000px 就會還原。

**答題要點**：`max-width: 1000px` 係「**等於或細過** 1000px 先生效」；想「闊過先生效」要用 `min-width`。**swap（對調）位置 = 交換兩者嘅 `order` 數值**，唔使改 HTML。

---

### (i) 喺 Nav 加入無序清單（導覽連結）

> **Original question (English):** Add an unordered list to the `#nav` text block:
> ```html
> <div id="nav">Navigation
>   <ul style="padding-left:16px;">
>     <li>Integrity</li>
>     <li>Client-focused</li>
>     <li>Excellence</li>
>   </ul>
> </div>
> ```

**解題步驟（改 `lab06_1.html`）：**

1 ➔ 將 `#nav` 入面加一個 `<ul>`（**unordered list**，預設會顯示圓點 bullet）加三個 `<li>`（list item）。

> - `<ul>` displays a **bulleted list** by default; each `<li>` is one item.
> - The inline `style="padding-left:16px;"` indents the list so the bullets are not clipped by the block's padding.

2 ➔ 刷新：Nav 欄應該見到「Navigation」標題下面有 3 點式清單：Integrity、Client-focused、Excellence。

3 ➔ 預告：呢個清單就係任務 (j) 要喺細畫面度變成**橫向一排**嗰個清單（記住個 selector 係 `#nav ul`）。

**答題要點**：`<ul>` ／`<li>` 結構；想喺細畫面刪走 bullet 同轉橫排，就要喺 CSS 度用 `#nav ul` 呢個 **descendant selector**。

---

### (j) Media Query ②：視窗 ≤800px 時導覽列變橫向、隱藏 aside

> **Original question (English):** Create a media query so that when the browser width is *less than or equal to 800px*, change the display of the unordered list — remove the bullets, arrange the list items horizontally in one line with equal space around them — change the background of `#main` to `#FFC` (light yellow) and hide `#aside`:
> ```css
> @media only screen and (max-width: 800px) {
>   #nav { order: 4; width: 100%; }
>   #nav ul { list-style: none; display: flex; flex-direction: row;
>      justify-content: space-around; }
>   #main { height: auto; background: #FFC; }
>   #aside { display: none; }
> }
> ```

**解題步驟：**

1 ➔ 喺第一個 media query（≤1000px）**之後**再加第二個 `@media only screen and (max-width: 800px)`。留意兩個 media query 會**疊加生效**：視窗 ≤800px 時，≤1000px 嗰組規則仍然有效，≤800px 呢組再覆蓋其中幾項。

2 ➔ 逐行拆解（全部係測驗重點）：

> - `#nav { order: 4; width: 100%; }` — nav 保持 order 4，闊度變 **100%（成行）**，變成一條橫向導覽列。
> - `#nav ul { list-style: none; ... }` — `list-style: none;` is the shorthand for `list-style-type: none;` — **no bullet marker is displayed**.
> - `display: flex; flex-direction: row;` — the `<ul>` becomes its own flex container; the `<li>` items sit **horizontally in one line**.
> - `justify-content: space-around;` — items get **equal space around each of them**, i.e. spread evenly across the row.
> - `#main { background: #FFC; }` — main becomes **light yellow（淺黃）**（`#FFC` = `#FFFFCC`）。
> - `#aside { display: none; }` — **hides the aside block completely**; it takes up no space and is removed from the layout.

3 ➔ 測試三種闊度：>1000px（三欄原版）→ 800–1000px（aside|main|nav 對調）→ ≤800px（aside 消失、nav 橫向一排均分、main 淺黃、長文字照樣分 3 欄）。

**答題要點（超級常見考題位）**：

> - `display: none;` removes the element from the page — space is freed; it is NOT the same as `visibility: hidden;` (space kept, invisible) or `opacity: 0` (visible but transparent).
> - 想刪 bullets → `list-style: none;`；想橫排 → 喺 `<ul>` 自己加 `display: flex;`。
> - `justify-content` 控制主軸（row = 水平）上嘅對齊：`space-around` 每個 item 兩邊空間均等、`space-between` 兩端貼邊、`center` 置中。

---

### (k) 加入 Footer 版權文字

> **Original question (English):** Add the following text inside the `#footer` text block:
> > 2015 Vocational Training Council. All rights reserved.
>
> Your program code should look like this:
> ```html
> <div id="footer">Footer. 2015 Vocational Training Council. All rights reserved.</div>
> ```

**解題步驟（改 `lab06_1.html`）：**

1 ➔ 將 `#footer` 內容由 `Footer` 改成 `Footer. 2015 Vocational Training Council. All rights reserved.`

2 ➔ 淨係文字修改，唔涉及新 CSS；刷新後頁底見到 footer 文字。

**答題要點**：呢類「加文字」任務只要睇清楚邊個 `id` 區塊、喺 HTML 啱位置加就得，注意標點同串法照足題目。

---

### (l) Main 內容加標題同三欄排版（column-count）

> **Original question (English):**
> 1. Add the following long paragraph into `#main` (about VTC): *Established in 1982, the Vocational Training Council (VTC) is the largest vocational and professional education and training provider in Hong Kong. ...our ultimate aim does not only centre on the acquisition of knowledge and skills, but equally on ACTION itself.*
> 2. Modify the HTML so the text "Main Content" becomes an `<h1>` element: `<div id="main"><h1>Main Content</h1>Established in 1982...</div>`
> 3. Modify the CSS for `#main` to format the long text into 3 columns, and add CSS so the `<h1>` spans across all columns:
> ```css
> #main { order: 3; height: auto; background: #FCC; width: 50px;
>   -webkit-column-count: 3; flex-grow: 1; }
> #main h1 { line-height: 0.2; -webkit-column-span: all; }
> ```

**解題步驟：**

1 ➔ **HTML**：將 `#main` 改成 `<div id="main"><h1>Main Content</h1>` 之後直接接上 VTC 長段落文字（照抄題目原文，約 250,000 students 嗰段）。

> `<h1>` is a **level-1 heading**; putting the text "Main Content" in `<h1>` makes it a section heading inside the block, and it can be styled separately with the descendant selector `#main h1`.

2 ➔ **CSS**：喺 `#main` 規則加 `-webkit-column-count: 3;`，令長文字喺 main 格內自動分成 **3 欄**（好似報紙排版咁，文字由左欄流到右欄）。

> `-webkit-column-count: 3;` divides the content into **3 CSS columns**; the `-webkit-` prefix targets **WebKit-based browsers** (Chrome / Safari / new Edge). The standard unprefixed property is `column-count: 3`.

3 ➔ **CSS**：加 `#main h1 { line-height: 0.2; -webkit-column-span: all; }`

> - `line-height: 0.2;` shrinks the heading's line spacing so the heading does not take a whole column's height.
> - `-webkit-column-span: all;` makes the `<h1>` **span across all columns** of text below it (standard: `column-span: all;`), like a headline above newspaper columns.

4 ➔ 最終測試：拉闊視窗 >1000px，會見到完整效果——header 有圖片繞文字、nav + 3 欄 main + aside 並排、footer 全寬；再一路收窄視窗檢查 1000px 同 800px 兩個轉捩點。**Responsive Layout 完成**。

**答題要點**：`column-count` 分欄、`column-span: all` 令標題橫跨全部欄；留意 `-webkit-` 前綴（舊瀏覽器／WebKit 先要）。三個區塊顏色快記：base `#FCC`（粉紅）→ ≤1000px `#CFC`（淺綠）→ ≤800px `#FFC`（淺黃）。

---

### 📊 三種視窗闊度最終版面速查表（考試前背熟）

| 視窗闊度 | 生效嘅規則 | 版面結構 | Main 顏色 |
|---|---|---|---|
| **> 1000px** | 只有基礎規則 | header 全寬 → nav(200px) \| main(彈性) \| aside(200px) → footer | `#FCC` 粉紅 |
| **801 – 1000px** | 基礎 + `≤1000px` query | aside(100px) \| main \| nav(100px)（**左右對調**） | `#CFC` 淺綠 |
| **≤ 800px** | 基礎 + 兩個 query 疊加 | nav 全寬橫向清單、aside **隱藏**、main 全寬 3 欄文字 | `#FFC` 淺黃 |

---

## 3. 💻 關鍵 HTML / CSS 程式碼（全份最終解答，連繁中註解）

> 呢個 Lab **完全冇 JavaScript**，唔需要寫任何 `.js` 檔案或 `<script>` 標籤。下面係完成 (a)–(l) 之後嘅最終版本，直接抄都得——但測驗時請自己一步步寫，註解只係幫你理解。

### 3.1 最終 `lab06_1.html`

```html
<!DOCTYPE html>
<!--
  Full Name  :            <- 記得填（marker 會 check）
  Student ID :
  Class      :
-->
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Responsive Layout</title>
  <link rel="stylesheet" href="lab06_1.css" />   <!-- 連結外部 CSS，檔名要同 CSS 檔一模一樣 -->
</head>
<body>
  <!-- 外層 flex 容器：display:flex 加喺呢度，五個子 div 先會變 flex items -->
  <div id="flex-container">

    <!-- (e) header：圖片 + 內層 div 文字；float:left 令圖片靠左、文字繞圖 -->
    <div id="header">
      <img src="VTC.png" />                        <!-- src 指向同資料夾嘅 VTC.png -->
      <div>Header. To be the leading provider of vocational and professional
      education and training in the region. To provide a valued choice to school
      leavers and working adults to acquire values, knowledge and skills for
      lifelong learning and enhanced employability. To provide valued supports to
      industries for their manpower development.</div>
    </div>

    <!-- (i) nav：加咗一個 3 項嘅無序清單（之後細畫面變橫向導覽列） -->
    <div id="nav">Navigation
      <ul style="padding-left:16px;">
        <li>Integrity</li>
        <li>Client-focused</li>
        <li>Excellence</li>
      </ul>
    </div>

    <!-- (l) main："Main Content" 變 h1；下面長文字會分 3 欄 -->
    <div id="main"><h1>Main Content</h1>Established in 1982, the Vocational
      Training Council (VTC) is the largest vocational and professional education
      and training provider in Hong Kong. VTC provides valuable credentials for
      some 250 000 students each year through a full range of pre-employment and
      in-service programmes with internationally recognised qualifications. VTC
      draws strength from the number of Member Institutions, breadth of programmes
      and variety of accredited qualifications to provide a new world of
      OPPORTUNITIES to learners of all ages and abilities. Championing a teaching
      and learning approach that is practical, hands-on and outcome-based, our
      ultimate aim does not only centre on the acquisition of knowledge and skills,
      but equally on ACTION itself.</div>

    <div id="aside">Aside Content</div>

    <!-- (k) footer：版權文字 -->
    <div id="footer">Footer. 2015 Vocational Training Council. All rights reserved.</div>

  </div>
</body>
</html>
```

### 3.2 最終 `lab06_1.css`（跟任務次序排好：基礎規則 → media query）

```css
/*
  Full Name  :
  Student ID :
  Class      :
*/
body { margin: 0px; font-family: Georgia; }   /* 去走預設 margin，字型用 Georgia */

/* (a) 五個區塊統一外觀：group selector + shorthand 樣式 */
#header, #nav, #main, #aside, #footer {
  background: #DDF;          /* shorthand：= background-color:#DDF；#DDF = #DDDDFF 淺藍 */
  border: 1px solid black;   /* shorthand：width 1px + style solid + color black */
  border-radius: 8px;        /* 圓角 8px */
  margin: 5px;               /* 外邊距：五個 box 之間留 5px 罅 */
  padding: 15px;             /* 內邊距：文字離邊框 15px */
}

/* (b) 外層做 flex container：display:flex 一定要加喺「父容器」 */
#flex-container {
  display: flex;             /* 變成 flex container，子元素變 flex items */
  flex-flow: row wrap;       /* shorthand：flex-direction:row + flex-wrap:wrap */
}

/* (c)(d)(g) 五個區塊尺寸 + order。width 係 flex-basis，flex-grow 食剩餘空間 */
#header { order: 1; height: auto; width: 100%; }      /* 全寬，order 1 排最先 */
#nav    { order: 2; width: 200px; }                    /* 左側欄固定 200px */
#main   { order: 3; height: auto; background: #FCC;    /* 中間格：base 粉紅 */
          width: 50px;                                 /* 基礎寬度（會被 grow 填滿） */
          -webkit-column-count: 3;                      /* (l) 文字分 3 欄（WebKit 前綴） */
          flex-grow: 1; }                               /* (d) 佔晒剩餘空間，跟視窗伸縮 */
#aside  { order: 4; width: 200px; }                    /* 右側欄固定 200px */
#footer { order: 5; height: 50px; width: 100%; }       /* 全寬頁底 */

/* (f) 圖片靠左 + 文字繞圖 */
#header img {
  float: left;               /* 圖片浮向 #header 左邊，文字繞住佢右邊排 */
  margin-right: 10px;        /* 圖片同文字之間留 10px */
}
#header div { clear: none; } /* none = 允許內容同 float 圖片並排（預設值） */

/* (l) h1 標題橫跨三欄、收窄行距 */
#main h1 {
  line-height: 0.2;          /* 壓細行距，避免標題佔成欄咁高 */
  -webkit-column-span: all;  /* 標題橫跨全部欄（standard: column-span:all） */
}

/* ===== (h) Media Query 1：視窗 ≤1000px =====
   基礎規則寫先、media query 寫後 → 後寫覆蓋先寫（cascade） */
@media only screen and (max-width: 1000px) {
  #nav   { order: 4; width: 100px; }   /* nav 調去右邊（order 4）兼收窄 100px */
  #main  { height: auto; background: #CFC; }  /* main 變淺綠 #CFC */
  #aside { order: 2; width: 100px; }   /* aside 調去左邊（order 2）→ 同 nav 對調 */
}

/* ===== (j) Media Query 2：視窗 ≤800px =====
   同 ≤1000px 疊加生效；呢組再覆蓋部分規則 */
@media only screen and (max-width: 800px) {
  #nav { order: 4; width: 100%; }      /* nav 變全寬橫向導覽列 */
  #nav ul {
    list-style: none;                  /* 刪走 bullet（= list-style-type:none） */
    display: flex;                     /* ul 自己做 flex container */
    flex-direction: row;               /* li 橫排一行 */
    justify-content: space-around;     /* 每個 li 左右空間均等 */
  }
  #main  { height: auto; background: #FFC; }   /* main 變淺黃 #FFC */
  #aside { display: none; }                    /* aside 完全隱藏（連位都讓埋） */
}
```

---

## 4. 🐞 常見 Error 與 Debug（實測前睇一次）

| Error / 問題 | 原因 | Fix |
|---|---|---|
| 全部樣式完全冇生效（得純文字） | `.css` 檔名喺 `<link>` 寫錯、檔案唔喺同一個資料夾、或 CSS 未 Save | 檢查 `<link rel="stylesheet" href="lab06_1.css" />`；確認檔案同 folder；Ctrl+S 之後 **Ctrl+F5** 強制刷新 |
| Flex 完全冇反應，區塊照樣直排 | `display: flex;` 加咗喺子元素（例如 `#nav`）而唔係父容器 `#flex-container` | `display: flex;` 一定要喺 **父容器** 度加 |
| `#main` 唔識自動伸縮／仍然得 50px 闊 | 漏咗 `flex-grow: 1;`；或者父容器唔係 flex container | 加 `flex-grow: 1;`，並確認 `#flex-container` 有 `display: flex;` |
| 改咗 CSS 但畫面冇變 | 瀏覽器 cache 咗舊 CSS | DevTools 開住 Network 剔 Disable cache，或者 Ctrl+F5 |
| 拖闊度冇切換版面（media query 唔生效） | media query 語法錯（例如寫成 `@media max-width: 800px`）、拼錯 `max-width`、或者 media query 寫咗喺基礎規則前面俾後面覆蓋返 | 語法：`@media only screen and (max-width: 800px) { ... }`；**media query 放 CSS 最尾** |
| 圖片顯示為爛圖（broken image icon） | `VTC.png` 唔喺同一個資料夾、檔名大小寫錯 | 確認三個檔案同一 folder；`src="VTC.png"` 大小寫要啱 |
| aside 喺細畫面仲見到 | 冇加 `#aside { display: none; }`，或者 media query 條件錯 | 喺 `max-width: 800px` query 入面加 `#aside { display: none; }` |
| 收窄到 ≤800px 時 nav 冇變橫向 | selector 打錯（例如 `#nav ul` 寫成 `#navul`）；`display:flex` 加喺 `li` 而唔係 `ul` | 用 descendant selector `#nav ul { display: flex; flex-direction: row; }` |
| 導覽列 bullet 點點仲喺度 | 漏咗 `list-style: none;`（淨係加咗 `display:flex`） | `#nav ul { list-style: none; ... }` |
| Header 文字冇繞住圖片，反而喺圖片下面 | `#header img` 冇 `float: left;`，或者 `#header div` 寫咗 `clear: both;` | 加 `#header img { float: left; }`；確認 `#header div { clear: none; }` |
| Main 文字冇分到 3 欄 | 漏咗 `-webkit-column-count: 3;`（淨用舊瀏覽器冇前綴版） | 照 Lab 用 `-webkit-column-count: 3;`（Chrome/Safari/Edge） |
| `<h1>` 標題冇橫跨三欄 | 漏咗 `-webkit-column-span: all;` | 加 `#main h1 { -webkit-column-span: all; }` |
| `width: 100%` 之後成行好似「爆出畫面」少少 | 預設 `box-sizing: content-box`，`width:100%` 再加 `padding`/`border`/`margin` 會超出父容器 | Lab 內屬正常現象；進階可加 `box-sizing: border-box;` |
| HTML 結構亂晒／區塊互相嵌套 | `<div>` 開咗但冇 `</div>` 閉合 | 喺 Notepad++ 對齊縮排，檢查每個 `<div>` 都有對應 `</div>`（五個區塊 + 內層 div） |
| 交功課前冇填名 | 每個檔案頂部有 `Full Name / Student ID / Class` comment | 記得填晒先交 |

> Debug tip: press **F12 → Console** to check for errors, and **F12 → Elements** to inspect which CSS rule is actually applied to a block (greyed-out rules are overridden by later ones — that is the cascade at work).

---

## 5. 📝 測驗常見題型 (Common Test Questions)

### 題型 A：概念／理論 MCQ（選擇題）

**Q1.** 邊一個 property 令元素變成 flex container？
> A. `display: block;`　B. `display: flex;`　C. `display: none;`　D. `float: left;`
**答案：B。** 答題要點：`display: flex` 將父容器變成 block-level flex container，子元素先可以受 `flex-grow`、`order` 等控制。

**Q2.** `flex-flow: row wrap;` 等於邊兩個 property 嘅 shorthand？
> **Answer: `flex-direction: row;` + `flex-wrap: wrap;`** —— 排法係「由左至右、放唔落就換行」。

**Q3.** `border: 1px solid black;` 拆開係邊三個 property？
> **Answer: `border-width: 1px;`、`border-style: solid;`、`border-color: black;`**（shorthand 順序：width → style → color）

**Q4.** `display: none;` 同 `visibility: hidden;` 有咩分別？
> `display: none;` removes the element completely — **no space is reserved**; `visibility: hidden;` hides it but **keeps its space** on the page.

**Q5.** `#main` 嘅 `width: 50px;` 配 `flex-grow: 1;`，視窗拉闊時邊個會變闊？
> **Answer: `#main` grows to fill the free space** (`flex-grow: 1` is the growth factor relative to other items); `#nav` / `#aside` keep their fixed `200px`.

### 題型 B：填空（Fill in the blanks）

**Q6.** 完成 media query，令視窗闊度 **≤ 800px** 時套用：
> `@media ___(1)___ screen and (___(2)___: 800px) { ... }`
**答案：** (1) `only`　(2) `max-width`。答題要點：`only screen` 限 screen 輸出；`max-width: 800px` = 闊度「等於或細過 800px」先生效；**細過就收窄**用 `max-width`，**闊過先生效**用 `min-width`（好多時兩者會考你揀邊個）。

**Q7.** 想隱藏 `#aside` 同時讓返晒啲位出嚟，要寫：`#aside { ___(1)___: ___(2)___; }`
**答案：** (1) `display`　(2) `none`。

**Q8.** 想刪走 `<ul>` 嘅圓點 bullet：`#nav ul { ___(1)___: none; }`
**答案：** `list-style`（shorthand；拆開係 `list-style-type: none`）。

### 題型 C：改錯／指出問題

**Q9.** 學生想做到「大畫面顯示 aside、視窗 ≤800px 先至隱藏」，但佢將 `#aside { display: none; }` 寫咗喺 media query **之前**（基礎規則位置），結果 aside 喺**任何闊度都唔見咗**，點解？
```css
#aside { display: none; }
@media only screen and (max-width: 800px) { ... }
```
**答案：** `#aside { display: none; }` 寫咗喺基礎規則（所有 media query 之外），呢條規則喺任何闊度都生效，而 media query 入面又冇再覆蓋 aside → aside **永遠隱藏**，連大畫面都唔見。正確做法：基礎規則**唔好**隱藏 aside，要將 `#aside { display: none; }` 放喺 `@media only screen and (max-width: 800px) { ... }` **入面**，先可以做到「大畫面顯示、細畫面隱藏」。

**Q10.** 想「唔郁 HTML 之下」令 `#aside` 同 `#nav` 喺中等畫面左右對調，應該改咩？
**答案：** 改兩者嘅 **`order`**：`#aside { order: 2; }`、`#nav { order: 4; }`（配合 `#main` order 3 喺中間）。答題要點：`order` 只改視覺次序，HTML source order 不變；預設 `order: 0`，數值細嘅排先。

### 題型 D：實作題（Practical，最似實測）

**Q11.** 提供以下 HTML，要你用 CSS 砌版面：header 全寬置頂；nav 200px 喺左；main 中間自動伸縮；aside 200px 喺右；footer 全寬置底。
```html
<div id="container">
  <div id="header">Header</div><div id="nav">Nav</div>
  <div id="main">Main</div><div id="aside">Aside</div><div id="footer">Footer</div>
</div>
```
**答案骨架：**
```css
#container { display: flex; flex-flow: row wrap; }   /* 先令父容器變 flex + 允許換行 */
#header, #footer { width: 100%; }                    /* 置頂/置底嘅全寬區塊 */
#nav, #aside { width: 200px; }                       /* 左右側欄固定闊度 */
#main { flex-grow: 1; }                              /* 中間格食晒剩餘空間 */
```
答題要點：三件事——父容器 `display:flex` + `wrap`、全寬區塊 `width:100%`、中間格 `flex-grow:1`。

**Q12.** 用 media query，令視窗 **≤ 600px** 時：aside 隱藏、nav 變全寬、main 變全寬（一欄手機版面）。
**答案：**
```css
@media only screen and (max-width: 600px) {
  #aside { display: none; }
  #nav, #main { width: 100%; }
}
```

**Q13.** 將一個 `<ul>` 三項清單變成橫向一排、每項之間空間均等、冇 bullet。
**答案：**
```css
ul { list-style: none; display: flex; flex-direction: row; justify-content: space-around; }
```
答題要點：`display:flex` 加喺 `<ul>`（因為想 `li` 並排）；`justify-content` 控制水平對齊。

**Q14.** 寫出令長文字分 3 欄、標題橫跨所有欄嘅 CSS（WebKit 語法）。
**答案：**
```css
#main { -webkit-column-count: 3; }
#main h1 { -webkit-column-span: all; }
```

> 實測貼士：改完一定要自己喺瀏覽器拉闊度（或 DevTools Responsive Mode）驗證 1000px / 800px 兩個斷點；考題常會問「喺 900px 會見到咩顏色、邊個欄喺左邊」——背熟第 2 節尾嘅速查表就穩陣。

---

## 6. 🔗 理論 recap（5–8 行總結）

1. **Flexbox（一維版面）**：父容器 `display: flex;` → 子元素橫排並受控；`flex-flow: row wrap` = `flex-direction` + `flex-wrap`。*"A flex container lays out its direct children (flex items) in rows or columns."*
2. **伸縮與次序**：`flex-grow: 1` 令 item 食剩餘空間（跟視窗伸縮）；`order` 以數值由細到大排顯示次序（預設 0），**唔郁 HTML**。*"`order` changes visual order only."*
3. **響應式（breakpoint）**：`@media only screen and (max-width: 1000px)` — 視窗 ≤1000px 生效；第二條 `max-width: 800px` 疊加覆蓋，令細畫面重排。*"Media queries switch layout at width breakpoints."*
4. **層疊（Cascade）**：相同 specificity 下「後寫覆蓋先寫」→ 基礎規則放前、media query 放後。*"Later rules win at equal specificity."*
5. **浮動與清除**：`float: left` 令圖片靠左、文字繞圖；`clear: none/both` 控制可否同 float 元素並排。*"Floats pull elements to one side so text wraps around them."*
6. **顯示與清單**：`display: none` 完全移除元素（讓位）；`list-style: none` 刪 bullet；`display: flex` + `justify-content: space-around` 令 list 橫向均分。*"`display: none` removes the element and frees its space."*
7. **文字分欄**：`-webkit-column-count: 3` 分三欄，`-webkit-column-span: all` 令 `h1` 橫跨全欄；`-webkit-` 係 WebKit 瀏覽器前綴。*"`column-count` splits text into columns; `column-span: all` lets a heading cross them."*
8. **色彩 hex 縮寫**：`#DDF` = `#DDDDFF`（淺藍）、`#FCC` 粉紅、`#CFC` 淺綠、`#FFC` 淺黃 —— 記住每個斷點 main 嘅顏色係測驗必考。*"3-digit hex expands one digit per channel: `#DDF` = `#DDDDFF`."*

---

*Guide 完成——依家你應該可以淨靠呢份文件由零砌起成個 Responsive Layout，並應付 Lab 6 嘅 Practical Test。最後提你：實測前重做一次 (a)→(l)，睇住三個斷點嘅版面變化，練到唔使睇筆記都寫得出 CSS。*
