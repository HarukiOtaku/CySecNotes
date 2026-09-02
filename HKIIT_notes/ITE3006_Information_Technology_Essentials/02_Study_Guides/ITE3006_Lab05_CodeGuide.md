# ITE3006 Lab 5：CSS Effects and Transforms — 雙語實務 CodeGuide（實務測驗主戰文件）

> 課程：ITE3006 Information Technology Essentials（Web 部分）｜本 Lab 完全唔使 JavaScript — 所有互動（hover、下拉、動畫）都係靠 CSS 做到，呢點本身就好可能係測驗問答題重點。

---

## 🔗 理論 recap（開頭總結，本 Lab 用到的理論）

- CSS 靠「選擇器（selector）」揀元素：`class` 用 `.menu`、`id` 用 `#letterA`、**contextual selector（後代選擇器）** 如 `.menu ul` 代表「喺 `.menu` 入面嘅所有 `<ul>`」。
- `:hover` 係 **pseudo-class（偽類）**，唔使 JavaScript 都可以做到滑鼠移入效果；CSS3 `transition` 令屬性值嘅變化有過渡動畫。
- `text-shadow`、`box-shadow` 共用同一個參數次序：`水平偏移 垂直偏移 模糊半徑 顏色`。
- `transform` 有 `rotate()`（旋轉）、`scale()`（縮放）、`skewY()`（斜切）、`translate()`（位移）；**多個 transform 要寫喺同一個 `transform` 屬性入面**，否則後寫嘅會覆蓋先寫嘅。
- `display: inline-block` 令 block 元素並排；`position: absolute` 令元素脫離 normal flow，以「最近的 positioned 祖先」做定位基準。
- 一個「下拉式選單」可以完全用 CSS 砌：子項目平時 `height: 0` + `overflow: hidden` 收起，hover 父項目時改成 `height: 40px` 展開。

> **Core idea:** CSS is used not only for colours and fonts, but also for *effects* (`text-shadow`, `box-shadow`), *motion* (`transition`, `transform`) and *interaction* (`:hover`) — no JavaScript required.

---

## 1. 🎯 Lab 目標與環境 (Objectives & Environment)

**要掌握的實務技能（Practical Skills to Master）：**

1. 用 CSS 建立 **文字/方塊視覺效果**：`text-shadow`、`box-shadow`、`border-radius`、`list-style`。
2. 用 **contextual selector（後代選擇器）** 精準定位巢狀 HTML 結構入面嘅元素（例如 `.menu ul`、`.menu .sub a:hover`）。
3. 用 `:hover` + `transition` 做出**純 CSS 下拉式選單（dropdown menu）**同 hover 動畫。
4. 用 **CSS transform**（`translate`、`rotate`、`scale`、`skewY`）移動、旋轉、縮放網頁元素。
5. 用 `<a target="...">` + `<iframe name="...">` 令連結喺頁內 iframe 載入內容。
6. 用瀏覽器 DevTools 檢查元素、找出 CSS 冇生效嘅原因。

**所需工具（Resources Required）：**

| 工具 | 用途 | 英文說明 |
|------|------|---------|
| Notepad++（或 VS Code） | 純文字編輯器寫 HTML/CSS | A plain text editor to write HTML and CSS |
| Google Chrome / Mozilla Firefox | 開啟 `.html` 檔案預覽結果 | A browser to open and preview the HTML files |
| Chrome DevTools（F12） | 檢查 CSS 有冇套用、搵 error | Inspect elements and debug CSS in the browser |
| 瀏覽器「重新整理」| 每次改完 CSS 都要刷新 | Press `F5` (or `Ctrl+F5` to bypass cache) after every change |

**執行方法：** 喺 Notepad++ 打好 Code → `File > Save As` 存做 `lab05_x.html`（**一定要 `.html` 副檔名**，編碼用 UTF-8）→ 雙擊檔案用 Chrome 開 → 每次改完儲存後按 `F5` 刷新。

> **Environment tip:** Save your file with the `.html` extension and open it directly in Chrome. Use `Ctrl+F5` (hard refresh) when the page does not seem to update.

---

## 2. 🛠️ 解題步驟拆解 (Walkthrough)

### Exercise 1 — [lab05_1.html] 純 CSS 下拉式選單（dropdown menu）

**題目原文（Question）：**

> Consider the following HTML code showing 2 lists of items. Study the code carefully and do the CSS tasks below: (given `lab05_1.html`, whose `<body>` contains `<div class="menu">` with two `<ul>`; each `<li>` holds a menu link `<a href="#">Menu Item A/B</a>` plus a nested `<ul class="sub">` of sub items)

**HTML 結構速覽（先睇清楚先落手）：**

```html
<div class="menu">
  <ul>
    <li>
      <a href="#">Menu Item A</a>
      <ul class="sub">          <!-- 子選單：class = sub -->
        <li><a href="#">Sub Item 1</a></li>
        <li><a href="#">Sub Item 2</a></li>
        <li><a href="#">Sub Item 3</a></li>
      </ul>
    </li>
  </ul>
  <ul> ... Menu Item B + sub ... </ul>
</div>
```

記住重點：`.sub` 係「入面嗰層 `<ul>`」，佢同時都係 `.menu` 嘅後代，所以 **`.menu ul` 呢條 rule 都會命中佢**（之後再靠更 specific 嘅 rule 覆蓋顏色）。呢個就係 contextual selector 嘅威力。

#### (a) `.menu ul` — 主選單外觀

**題目原文：** Create the contextual selector `.menu ul` … i. list style to none; ii. margin 0; iii. padding 0; iv. width 150px; v. background color darkgreen; vi. text shadow with horizontal offset, vertical offset and blur radius equaling to 2px and color red; vii. border radius 10px; viii. display mode inline-block.

**1 ➔ 2 ➔ 3 解法：**

1. 喺 `<style>` 內新增一個**後代選擇器（contextual selector）** `.menu ul`——佢會命中 `.menu` 內**所有層級**嘅 `<ul>`（包括頂層兩個 menu 同內層嘅 `.sub`）。
2. 逐條 property 填入：
   - `list-style: none;` → 移除 `<ul>` 預設嘅 bullet 圓點。
   - `margin: 0px;` + `padding: 0px;` → 移除瀏覽器對 `<ul>` 預設嘅外/內邊距（唔清走會令選單貼唔齊）。
   - `width: 150px;` → 每個選單闊 150px。
   - `background-color: darkgreen;` → 深綠底色。
   - `text-shadow: 2px 2px 2px red;` → 文字陰影：水平 2px、垂直 2px、模糊 2px、紅色。
   - `border-radius: 10px;` → 四角整圓（10px 半徑）。
   - `display: inline-block;` → **呢行好關鍵**：`<ul>` 本身係 block，會上下疊；改做 `inline-block` 之後兩個 Menu A / Menu B 先會**並排**。
3. 睇結果對照題目截圖；Lab 提供的參考檔內有 `border: 1px solid red;` 係**除錯用紅框**（用嚟睇 box 邊界），完成後要刪走。

> **Answer points:** `.menu ul` is a *contextual (descendant) selector* — it matches every `<ul>` that is a descendant of any element with `class="menu"`. `display: inline-block` lets the two block-level `<ul>` menus sit side by side. `text-shadow` order: `horizontal-offset vertical-offset blur-radius color`.

#### (b) `.menu a` — 連結外觀

**題目原文：** Create the contextual selector `.menu a` … i. text decoration none; ii. top and bottom paddings 10px, left and right paddings 20px; iii. line height 1.2em; iv. color white; v. display mode block.

**1 ➔ 2 ➔ 3 解法：**

1. 新增 `.menu a`：命中 `.menu` 內所有 `<a>`（主選單連結**同**子選單連結都命中）。
2. 填入：
   - `text-decoration: none;` → 移除 `<a>` 預設嘅藍色底線。
   - `padding: 10px 20px;` → **兩值簡寫（shorthand）**：第一個值 = 上下（top/bottom）10px，第二個值 = 左右（left/right）20px。
   - `line-height: 1.2em;` → 行高係字高嘅 1.2 倍（`em` 係相對單位）。
   - `color: white;` → 文字白色（唔寫嘅話 link 會保持瀏覽器預設藍色）。
   - `display: block;` → 令成條橫行都變做可點擊區域（唔似 inline 淨係文字嗰忽）。
3. 對照題目截圖——此時 Menu Item A / B 應該係深綠底白字、冇底線、冇 bullet。

> **Answer points:** `padding: 10px 20px` is the two-value shorthand: first value = vertical (top/bottom), second value = horizontal (left/right). `display: block` makes the whole area clickable instead of only the text.

#### (c) 主選單 hover 效果

**題目原文：** Create contextual selector to define `<a>`'s hover for the menu item … i. background color lightgreen; ii. color black.

**1 ➔ 2 ➔ 3 解法：**

1. 寫 `.menu a:hover`——`:hover` 係 **pseudo-class**，代表「滑鼠移入嗰一刻」。
2. 填入 `background-color: lightgreen;` 同 `color: black;`。
3. 測試：滑鼠移過 Menu Item A / B 時，嗰行應該變淺綠底黑字。注意呢條 rule 其實**都會命中子選單嘅 `<a>`**（佢哋都係 `.menu` 後代），之後 (e) 會用更 specific 嘅 rule 覆蓋佢——呢個係 CSS **specificity（優先度）** 嘅示範。

> **Answer points:** `:hover` is a CSS pseudo-class; it applies when the mouse pointer is over the element — no JavaScript is needed. A later, more specific rule (e.g. `.menu .sub a:hover`) overrides the earlier one.

#### (d) `.menu .sub` — 子選單定位、陰影、旋轉

**題目原文：** For the submenu defined in the class `.sub` under `.menu` … i. top position 38px; ii. background darkblue; iii. box shadow with horizontal offset, vertical offset equaling 10px, blur radius 5px, color grey; iv. rotate the submenu by -10 degrees.

**1 ➔ 2 ➔ 3 解法：**

1. 新增 `.menu .sub`（兩個 class 連住，代表「`.menu` 之內帶 `.sub` class 嘅元素」——比 `.menu ul` 更 specific，所以背景色會由 darkgreen 變 darkblue 覆蓋）。
2. 填入：
   - `position: absolute;` + `top: 38px;` → 令子選單**脫離 normal flow** 並喺頂部 38px 位置顯示（即係貼喺 Menu Item 下面少少）。
   - `background-color: darkblue;`
   - `box-shadow: 10px 10px 5px grey;` → 次序同 text-shadow：水平 10px、垂直 10px、模糊 5px、灰色。
   - `transform: rotate(-10deg);` → **CSS transform**：`-10deg` 負數 = 逆時針轉 10°。
3. **深層理解（答題點）**：`position: absolute` 嘅定位基準係「最近的 **positioned** 祖先」（`position` 唔係 `static` 嗰個）；呢個 HTML 冇任何祖先 set 過 position，所以 `top: 38px` 係由**頁面頂部**計起——因為 `body { margin: 0 }`、選單貼住頁頂，睇落啱啱好喺 Menu Item 下面。呢點測驗好鍾意問（見「常見題型」）。

> **Answer points:** `box-shadow` uses the same parameter order as `text-shadow`: `horizontal-offset vertical-offset blur-radius color`. `transform: rotate(-10deg)` rotates the element 10° counter-clockwise. An absolutely positioned element is placed relative to its nearest *positioned* ancestor; if none exists, it is placed relative to the page/viewport.

#### (e) 子選單 hover 效果

**題目原文：** Create contextual selector to define `<a>`'s hover for the submenu item … background color lightblue.

**1 ➔ 2 ➔ 3 解法：**

1. 寫 `.menu .sub a:hover { background-color: lightblue; }`——「`.menu` → `.sub` → `a` 移入」嘅完整路徑。
2. 呢條比 (c) 嘅 `.menu a:hover` **更 specific**——兩個 selector 都有 `:hover`（pseudo-class，權重同 class）同元素 `a`，但 (e) 多咗 `.sub` 一個 class，所以子選單 link hover 時會係淺藍底，而唔係被 (c) 嘅淺綠覆蓋。

> **Answer points:** Specificity decides which rule wins: `.menu .sub a:hover` beats `.menu a:hover` for submenu links, so the submenu hover shows `lightblue`.

#### (f) 收起子選單（預設隱藏）

**題目原文：** For each list item under submenu under the menu … i. overflow hidden; ii. height 0; iii. transition to the height with a duration of 500ms.

**1 ➔ 2 ➔ 3 解法：**

1. 寫 `.menu .sub li`（`li` = 每個子選單項目）。
2. 填入：
   - `overflow: hidden;` → 內容超出 box 就剪走（唔顯示）。
   - `height: 0px;` → 高度歸零 → **成個項目收起咗**。
   - `transition: height 500ms;` → 當 `height` 改變時用 500ms 過渡。語法 = `transition: 屬性 持續時間`（可加 timing function 同 delay）。
3. 結果：而家子選單項目全部隱形，淨低 Menu Item A/B 兩行。

> **Answer points:** Setting `height: 0` with `overflow: hidden` collapses the items. `transition: height 500ms` animates any future change of `height` over 500 milliseconds (`transition: property duration`).

#### (g) 滑鼠移入時展開子選單

**題目原文：** Think for a CSS selector to display the submenu items each with a height of 40px when the mouse is placed over the menu.

**1 ➔ 2 ➔ 3 解法：**

1. 要諗嘅係「**hover 邊個 → 邊啲元素變高**」：滑鼠移入「裝住個 submenu 嘅頂層 `<li>`」時，個 `li` 入面 `.sub` 嘅所有 `li` 要由 `0px` 變 `40px`。
2. 答案（官方）：
   ```css
   .menu ul li:hover .sub li {
     height: 40px;
   }
   ```
3. 拆解 selector：`.menu ul` 揀頂層 `<ul>` → `li:hover` = 「被 hover 嗰個頂層 list item」→ `.sub li` = 「佢入面子選單嘅每個 item」。配合 (f) 嘅 `transition: height 500ms`，子選單會**順滑滑落嚟**。

> **Answer points:** The show/hide trick is purely CSS: sub items are `height: 0` normally, and `.menu ul li:hover .sub li { height: 40px; }` expands them to 40px each on hover; `transition` makes the expansion smooth. Height can only be animated between two explicit values (e.g. `0px` → `40px`), never to `auto`.

**✅ 完成檢查清單（Exercise 1）：** Menu A / B 並排、深綠圓角白字、hover 變淺綠黑字、移入 Menu Item 時深藍子選單逆時針斜斜哋滑落嚟、子項目 hover 淺藍。記得刪走紅色／黃色 debug border。

---

### Exercise 2 — [lab05_2.html] CSS transform 定位圖片與 iframe

**題目原文（Question）：**

> Create the following web page using CSS transform techniques. The final x-y coordinates of the six images "A" to "F" and the iframe are: A (50, 150), B (540, 240), C (210, 40), D (240, 70), E (500, 180), F (420, 90), iframe (150, 240). The images "A"–"F" are hyperlinks linking to `A.html`–`F.html`; these html files should be targeted inside the `<iframe>` on clicking respective hyperlinks.

#### (a) 寫 HTML（未加 CSS rule）

**1 ➔ 2 ➔ 3 解法：**

1. 每個圖片用一個 `<div id="letterX">` 包住，入面係 `<a href="X.html" target="content">` + `<img src="images/X.gif" />`。
   - `target="content"` 係關鍵：佢話俾瀏覽器聽「連結結果開喺**名叫 content 嘅 frame** 入面」。
2. `<div id="textDiv">` 入面放 `<iframe name="content" src="A.html" frameborder="1"></iframe>`——**iframe 嘅 `name` 一定要同 `target` 一樣**，先會對得上。
3. 圖片全部 60px × 60px（body 內已有 CSS）。正常流（normal flow）之下，六個 div 會**由上到下疊埋**：A 喺 (0,0)、B 喺 (0,60)、C 喺 (0,120)……（每個 div 高 60px），iframe div 喺 (0,360)。呢啲「正常位置」係下一步計 translate 嘅起點。

> **Answer points:** `<a target="content">` and `<iframe name="content">` must use the *same* name — the link then loads inside that iframe instead of opening a new page. Each block-level `<div>` stacks vertically in normal flow; a 60px-tall image makes each box 60px high.

#### (b) 用 CSS transform 搬位

**1 ➔ 2 ➔ 3 解法：**

1. 因為要求用 **transform**（而唔係 `position`），方法係喺每個 `#letterX` div 加 `transform: translate(dx, dy)`，其中 `dx = 目標X − 正常X`、`dy = 目標Y − 正常Y`。**transform 唔會改變版面 flow**，只係將元素由原本位置「搬走」。
2. 用下表計出每個元素要 translate 幾多：

| 元素 | 正常位置 (normal) | 目標座標 (target) | 需要嘅 translate = target − normal |
|------|------------------|-------------------|-----------------------------------|
| `#letterA` | (0, 0) | (50, 150) | `translate(50px, 150px)` |
| `#letterB` | (0, 60) | (540, 240) | `translate(540px, 180px)` |
| `#letterC` | (0, 120) | (210, 40) | `translate(210px, -80px)` |
| `#letterD` | (0, 180) | (240, 70) | `translate(240px, -110px)` |
| `#letterE` | (0, 240) | (500, 180) | `translate(500px, -60px)` |
| `#letterF` | (0, 300) | (420, 90) | `translate(420px, -210px)` |
| `#textDiv` | (0, 360) | (150, 240) | `translate(150px, -120px)` |

3. 逐個填入空 rule，例如 `#letterA { transform: translate(50px, 150px); }`、`#textDiv { transform: translate(150px, -120px); }`（`#textDiv` 本身已有 `width: 350px; height: 300px; overflow: auto;`，淨係補 transform）。

> **Answer points:** `translate(dx, dy)` moves an element by `dx` along the x-axis and `dy` along the y-axis without affecting layout. Required shift = target coordinate − normal-flow coordinate (positive = right/down, negative = left/up). Values need units (`px`).

#### (c) hover 圖片效果

**題目原文：** After the positioning, set more properties for the images when the mouse pointer is placed over them: i. enlarge the image 1.5 times; ii. skew the image by 20 degrees in the Y-direction.

**1 ➔ 2 ➔ 3 解法：**

1. 喺空咗嘅 `img:hover { }` 入面寫 **一個** `transform` 屬性，兩個效果都要寫入去（**唔可以開兩行 `transform`**，後行會覆蓋前行）：
   ```css
   img:hover {
     transform: scale(1.5) skewY(20deg);
   }
   ```
2. `scale(1.5)` = 放大 1.5 倍；`skewY(20deg)` = 沿 Y 方向斜切 20°（字母會「斜斜哋」）。多個 transform 由左到右依次套用。
3. 測試：滑鼠移過任何一張圖，佢會放大並斜切；移走就回復原狀（因為 hover 狀態結束）。

> **Answer points:** Combine multiple transforms in ONE declaration: `transform: scale(1.5) skewY(20deg);`. Two separate `transform` lines do not combine — the later one overwrites the earlier one (the cascade).

**✅ 完成檢查清單（Exercise 2）：** 六張圖 + iframe 嘅左上角分別落喺題目畀嘅座標；click 圖片時對應頁面喺 iframe 內載入（唔會開新 tab）；hover 圖會放大 1.5 倍兼斜切 20°。**實戰注意**：HTML 寫 `src="images/A.gif"`，所以要喺 `lab05_2.html` 旁邊開一個 `images` 資料夾放 A.gif–F.gif（原始 Code 資料夾入面啲 gif 係放喺 lab 根目錄，直接開會見到裂圖）。

---

## 3. 💻 關鍵 HTML/CSS/JS 程式碼

> 本 Lab **完全冇 JavaScript**：下拉選單靠 `:hover` + `transition`，圖片效果靠 `transform`，全部係 CSS。以下係兩條題目嘅完整最終答案（已刪走 debug border），逐段有繁中註解。

### 3.1 lab05_1.html 完整最終版（Exercise 1 答案 a–g 合併）

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;              /* 清除頁面外邊距：令選單貼住頁頂 */
  }

  /* ===== (a) 主選單 <ul>：兩層 ul（頂層 + .sub）都會命中 ===== */
  .menu ul {
    list-style: none;              /* i.   移除 bullet 圓點 */
    margin: 0px;                   /* ii.  移除瀏覽器預設外邊距 */
    padding: 0px;                  /* iii. 移除瀏覽器預設內邊距 */
    width: 150px;                  /* iv.  每個選單固定闊 150px */
    background-color: darkgreen;   /* v.   深綠底色 */
    text-shadow: 2px 2px 2px red;  /* vi.  文字陰影：水平2px 垂直2px 模糊2px 紅色 */
    border-radius: 10px;           /* vii. 圓角 10px */
    display: inline-block;         /* viii. inline-block：Menu A/B 並排 */
  }

  /* ===== (b) 主選單連結 <a> ===== */
  .menu a {
    text-decoration: none;   /* i.   移除 <a> 預設底線 */
    padding: 10px 20px;      /* ii.  上下 10px、左右 20px（兩值簡寫：垂直 水平） */
    line-height: 1.2em;      /* iii. 行高 = 1.2 倍字高（em 相對單位） */
    color: white;            /* iv.  白字（唔寫會係預設藍色 link） */
    display: block;          /* v.   成條橫行都可點擊 */
  }

  /* ===== (c) 主選單 hover：滑鼠移入變淺綠黑字 ===== */
  .menu a:hover {
    background-color: lightgreen;  /* i.  淺綠背景 */
    color: black;                  /* ii. 黑字 */
  }

  /* ===== (d) 子選單 .sub：脫離 flow、深藍、陰影、逆時針轉 -10° ===== */
  .menu .sub {
    position: absolute;            /* 移出 normal flow，配合 top 定位 */
    top: 38px;                     /* i.   頂部位置 38px（貼喺 Menu Item 下面） */
    background-color: darkblue;    /* ii.  深藍底（覆蓋 (a) 嘅 darkgreen） */
    box-shadow: 10px 10px 5px grey;/* iii. 水平10px 垂直10px 模糊5px 灰色 */
    transform: rotate(-10deg);     /* iv.  逆時針旋轉 10°（負數 = 逆時針） */
  }

  /* ===== (e) 子選單 link hover：淺藍底（specificity 高過 (c)） ===== */
  .menu .sub a:hover {
    background-color: lightblue;   /* i. 淺藍背景 */
  }

  /* ===== (f) 收起子選單：每項高度 0 + overflow hidden = 隱形 ===== */
  .menu .sub li {
    overflow: hidden;              /* i.   內容溢出即剪走 */
    height: 0px;                   /* ii.  高度 0 → 收起 */
    transition: height 500ms;      /* iii. height 改變時 500ms 過渡動畫 */
  }

  /* ===== (g) hover 主選單項時展開子選單（每項 40px） ===== */
  .menu ul li:hover .sub li {
    height: 40px;                  /* hover 頂層 li → 內層 .sub 嘅 li 長返高 */
  }
</style>
</head>

<body>
<div class="menu">
  <ul>
    <li>
      <a href="#">Menu Item A</a>
      <ul class="sub">
        <li><a href="#">Sub Item 1</a></li>
        <li><a href="#">Sub Item 2</a></li>
        <li><a href="#">Sub Item 3</a></li>
      </ul>
    </li>
  </ul>

  <ul>
    <li>
      <a href="#">Menu Item B</a>
      <ul class="sub">
        <li><a href="#">Sub Item 4</a></li>
        <li><a href="#">Sub Item 5</a></li>
      </ul>
    </li>
  </ul>
</div>
</body>
</html>
```

### 3.2 lab05_2.html 完整最終版（Exercise 2 答案 a–c 合併）

```html
<!DOCTYPE html>
<html>
<head>
<style type="text/css">
  body {
    margin: 0;                  /* 清除外邊距：先由 (0,0) 起計 */
    background-color: lightgrey;
  }

  img {
    margin: 0;
    width: 60px;                /* 每張圖 60 x 60 px */
    height: 60px;
  }

  /* (c) hover：放大 1.5 倍 + Y 方向斜切 20°（必須同一個 transform） */
  img:hover {
    transform: scale(1.5) skewY(20deg);
  }

  /* (b) 用 translate 由「正常流位置」移到目標座標（見上面座標表） */
  #letterA { transform: translate(50px, 150px); }    /* A -> (50, 150)   */
  #letterB { transform: translate(540px, 180px); }   /* B -> (540, 240)  */
  #letterC { transform: translate(210px, -80px); }   /* C -> (210, 40)   */
  #letterD { transform: translate(240px, -110px); }  /* D -> (240, 70)   */
  #letterE { transform: translate(500px, -60px); }   /* E -> (500, 180)  */
  #letterF { transform: translate(420px, -210px); }  /* F -> (420, 90)   */

  #textDiv {
    width: 350px;               /* iframe 容器：固定大細 + 可捲動 */
    height: 300px;
    overflow: auto;
    transform: translate(150px, -120px);  /* iframe -> (150, 240) */
  }
</style>
</head>

<body>

<!-- 每張圖都係一個 link，target="content" 指向下面 iframe 個 name -->
<div id="letterA">
  <a href="A.html" target="content">
    <img src="images/A.gif" />
  </a>
</div>

<div id="letterB">
  <a href="B.html" target="content">
    <img src="images/B.gif" />
  </a>
</div>

<div id="letterC">
  <a href="C.html" target="content">
    <img src="images/C.gif" />
  </a>
</div>

<div id="letterD">
  <a href="D.html" target="content">
    <img src="images/D.gif" />
  </a>
</div>

<div id="letterE">
  <a href="E.html" target="content">
    <img src="images/E.gif" />
  </a>
</div>

<div id="letterF">
  <a href="F.html" target="content">
    <img src="images/F.gif" />
  </a>
</div>

<!-- iframe 個 name 一定要同 <a> 嘅 target 相同，click 先會喺度載入 -->
<div id="textDiv">
  <iframe name="content" src="A.html" frameborder="1"></iframe>
</div>

</body>
</html>
```

### 3.3 每題必背嘅「一句核心」

| 題目 | 必背核心 |
|------|---------|
| Ex1 dropdown | `.menu ul li:hover .sub li { height: 40px; }` 配合 `.menu .sub li { height: 0; transition: height 500ms; }` |
| Ex1 hover | 主選單 `.menu a:hover`；子選單 `.menu .sub a:hover`（specificity 更高） |
| Ex2 定位 | `transform: translate(dx, dy)`，`dx = 目標X − 正常X` |
| Ex2 hover | `transform: scale(1.5) skewY(20deg)`（一個屬性寫晒） |
| iframe | `<a target="content">` ⇄ `<iframe name="content">` 名稱要一致 |

---

## 4. 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| Menu A / B 垂直疊起，冇並排 | `<ul>` 係 block，預設上下排；漏咗 `display: inline-block` | `.menu ul { display: inline-block; }` |
| 選單前面有 bullet 圓點 | 冇清走 `<ul>` 預設 list style | `.menu ul { list-style: none; }`（寫喺 `li` 或 `a` 都冇用） |
| Link 有底線／藍色 | `<a>` 預設 `text-decoration: underline` + 藍字 | `.menu a { text-decoration: none; color: white; }` |
| hover Menu Item 但子選單冇展開 | 漏咗 (g) 條 rule，或 selector 寫錯（例如寫咗 `.sub:hover`） | `.menu ul li:hover .sub li { height: 40px; }` |
| 子選單出現但**冇滑動動畫** | `transition` 漏寫／寫錯元素／冇 duration | `.menu .sub li { transition: height 500ms; }` |
| 子選單位置唔啱（飛咗去頁頂） | `position: absolute` 冇 positioned 祖先，會以頁面做基準 | 考試照官方答案（menu 貼頁頂 + `top: 38px`）；真實世界做法：父 `<li>` 加 `position: relative` |
| hover 圖只放大冇斜切／只斜切冇放大 | 開咗兩行 `transform`，後行覆蓋前行 | 合併做一行：`transform: scale(1.5) skewY(20deg);` |
| 圖片變裂圖（broken image） | `src="images/A.gif"` 路徑錯；`images` 資料夾唔存在（原始 Code 檔 gif 喺 lab 根目錄） | 建立 `images` 子資料夾並放入 A.gif–F.gif，或者改 src 指返正確路徑 |
| Click 圖片開咗新 tab，冇喺 iframe 載入 | `<a>` 嘅 `target` 同 `<iframe>` 嘅 `name` 唔一致／漏寫 | 兩邊用同一個名（如 `content`） |
| `transform: translate(50, 150)` 冇反應 | 數值漏咗單位（`px` / `deg`） | `translate(50px, 150px)`、`rotate(-10deg)` |
| `text-shadow` / `box-shadow` 效果怪 | 參數次序錯；blur 打錯做 `5ps`（教材筆誤） | 次序固定：`水平 垂直 模糊 顏色`；blur 單位係 `px` |
| 改完 CSS 但瀏覽器畫面冇變 | 瀏覽器 cache 舊版 | 儲存檔案後按 `Ctrl+F5`（hard refresh） |
| 成個網頁空白／CSS 完全冇效 | `<style>` 標籤打錯、大細階錯、CSS 寫咗喺 `<body>` 之後 | CSS 放 `<head>` 內 `<style>`；檢查 DevTools Console 有冇 syntax error |
| 子選單 hover 變淺綠而唔係淺藍 | (c) 同 (e) 撞 rule，(e) 唔夠 specific 或次序喺前 | 用 `.menu .sub a:hover`（specificity 高） |

**快速 debug 流程：** Chrome 按 `F12` → Elements 揀中目標元素 → 右邊 Styles 睇邊條 rule 被刪線（表示被覆蓋）／邊條冇出現（表示 selector 打錯）→ Console 睇有冇 syntax error → 改完 `Ctrl+F5`。

---

## 5. 📝 測驗常見題型 (Common Test Questions)

**題型 1：畀一段 HTML，叫你寫 CSS（同 Lab 幾乎一樣，最常見）**
答題框架：① 每條問你嘅 rule 用咩 selector（注意「under the menu class」→ `.menu ul`、「for the submenu under .menu」→ `.menu .sub`）；② 逐個 property 照英文 spec 填，**字唔可以錯**（`list-style`、`text-shadow`、`border-radius`、`display`）；③ hover 一律寫 `:hover`；④ 展開邏輯 = 平時 `height: 0` + `overflow: hidden`，hover 時 `height: 40px`，加 `transition: height 500ms`。

**題型 2：畀座標表，問 transform 寫法（即 Ex2 (b)）**
記住公式：`translate = 目標座標 − 正常流座標`。正常流位置靠「前面每個 block 元素疊加高度」推斷（每張 60px 圖 → 每格 60px）。負數照寫（向左／上移）。答案格式：`#letterX { transform: translate(dxpx, dypx); }`。

**題型 3：short answer 定義題**
- *Contextual selector（後代選擇器）* 係咩？→ `A B` 命中 A 嘅所有後代 B（唔限直屬）。
- `:hover` 係咩？→ pseudo-class，滑鼠移入時生效，純 CSS 做到互動。
- `text-shadow` vs `box-shadow`？→ 前者文字、後者方塊，參數次序一樣（水平、垂直、模糊、顏色）。
- `inline-block` vs `block`？→ block 佔全行；inline-block 保留 box 特性（寬高、padding）但可並排。
- `transform` 會唔會影響版面 flow？→ 唔會，只係視覺上搬位，原位置仍然「留空」。

**題型 4：fill-in-the-blank / 揀錯處**
常見陷阱：`list-style: none` 寫咗去 `li`（冇用）；`padding: 10px 20px` 意思（上下 10、左右 20）；`box-shadow` 次序調轉；兩個 `transform` 分開寫會互相覆蓋；`deg`／`px` 漏單位；`target`／`name` 唔對名。

**題型 5：解釋行為題**
- 「點解 hover 子選單時底色係 lightblue 而唔係 lightgreen？」→ specificity：`.menu .sub a:hover` 高過 `.menu a:hover`。
- 「點解子選單頂部會以頁面頂做基準？」→ absolute 以最近 positioned 祖先做基準；冇就係頁面。
- 「點解圖片 hover 只做到其中一個效果？」→ 兩個 transform 分開寫，cascade 後者贏。

**題型 6：iframe 題**
「點先令 click link 之後頁面喺頁內 iframe 載入？」→ `<a target="content">` + `<iframe name="content">`，名要一樣。

---

## 6. 🔗 理論 recap（詳解）

**五秒總結（5–8 行）：**
1. 本 Lab 全部效果用 CSS 完成：`text-shadow`／`box-shadow`／`border-radius` 整視覺效果。
2. Contextual selector `.menu ul` 命中後代；hover 用 pseudo-class `:hover`。
3. `transition` 令屬性變化有動畫；`transform`（`rotate`／`scale`／`skewY`／`translate`）做變形。
4. 下拉選單秘訣：`height: 0` + `overflow: hidden` 收起，hover rule 展開到 `40px`。
5. `transform: translate(dx, dy)` 由正常流位置搬去目標座標（唔影響 layout）。
6. iframe 顯示要靠 `target` 同 `name` 名稱一致。

| 概念 | 關鍵句（English Key Sentence） | 本 Lab 例子 |
|------|-------------------------------|-------------|
| Contextual selector | A descendant selector `A B` matches every element B that is a descendant of A. | `.menu ul`、`.menu .sub a:hover` |
| Pseudo-class | `:hover` applies styles while the mouse pointer is over the element. | `.menu a:hover` |
| Text/box shadow | `text-shadow: h-offset v-offset blur color;` — same order for `box-shadow`. | `text-shadow: 2px 2px 2px red;`、`box-shadow: 10px 10px 5px grey;` |
| Transition | `transition: property duration;` animates changes of that property. | `transition: height 500ms;` |
| Transform | `transform` accepts functions such as `rotate()`, `scale()`, `skewY()`, `translate()`; combine them in one declaration. | `rotate(-10deg)`、`scale(1.5) skewY(20deg)`、`translate(50px, 150px)` |
| Absolute positioning | An absolutely positioned element is placed relative to its nearest positioned ancestor. | `.menu .sub { position: absolute; top: 38px; }` |
| Iframe targeting | The link's `target` must equal the iframe's `name` to load pages inside it. | `<a target="content">` + `<iframe name="content">` |
| Pure-CSS interaction | Menus can open/close with `:hover` and `transition` — no JavaScript needed. | Exercise 1 dropdown menu |

**🎯 最後溫提（測驗前睇一次）：** 呢個 Lab 考嘅唔係背 code，而係「畀 spec → 寫啱 selector → 填啱 property 值」嘅能力。實測時通常會畀 HTML skeleton 你，淨係叫你填 CSS——記熟 Section 3 兩段完整答案，逐 part 對應返 (a)–(g) 嘅字眼，就穩陣。
