# ITE3006 Topic 6: Page Layout with CSS — 雙語應考學習指南（Bilingual & Exam-Ready Study Guide）

> 本指南根據課堂教材重寫，適用對象為大專資訊科技（ITE3006）學生。全部機制解說以香港繁體中文撰寫；所有核心定義、HTML 標籤作用、CSS 屬性與考試答題重點均緊隨標準英文定義句（English Standard Definitions）。HTML、CSS 程式碼一律保留英文原文，專有名詞不作生硬翻譯。

---

## 📝 模組一：課程概要與實務情境（Summary & Real-world Context）

### 課程概要

Topic 6「Page Layout with CSS」係 Topic 4（CSS Fundamentals）嘅「升級版」——由「控制字型顏色」提升到「控制成個版面點樣排」。課程開宗明義指出：網頁版面（web page layout）之所以要分類，係因為同一頁面會喺**唔同瀏覽器寬度**下被觀看（手機 vs 桌面電腦），或者用戶會**自己縮放瀏覽器視窗**。教材先講四種版面策略——**Static（Fixed）Layout**（固定頁寬，唔隨視窗變）、**Liquid（Fluid）Layout**（用百分比等相對單位，隨視窗伸縮）、**Adaptive Layout**（用 media queries 偵測寬度、切換幾組固定寬度）、以及最終目標 **Responsive Layout**（相對單位 + media queries 雙管齊下，既流動又會喺臨界點大幅變陣）。之後逐個工具深入：`display`（block / inline / none）控制元素嘅「顯示本性」、`margin: auto` 水平置中、`float` 同 `clear` 操控「normal flow（正常文檔流）」，再進入 CSS3 時代三大版面技術——**Media Queries**（響應式設計嘅偵測器）、**Multi-column Layout**（報刊式多欄文字）、以及最重戲肉 **Flexible Box（flexbox）**（`flex-direction`、`flex-wrap`、`justify-content`、`flex-flow`、`flex-grow`、`flex-shrink`、`order` 七大屬性）。最後仲有一張 **Emmet 快捷鍵**速查表，幫你用 VS Code 一類編輯器高速打出以上全部 CSS。

### 實務情境一：餐廳網站要同時「睇得靚」喺手機同桌面

假想你開發一間餐廳嘅官網：客人喺 24 吋桌面螢幕睇，同喺 6 吋手機度睇，係兩個完全唔同嘅世界。若果你用 Static Layout 寫死 `width: 960px`，手機一開就會「cut off（被裁切）」兼彈出一條難睇嘅**水平滾動條（horizontal scrollbar）**。正路做法係 Responsive Layout：內容用百分比（relative unit）令佢「識縮」，再用 `@media only screen and (max-width: 500px) { ... }` 呢類 media query 喺細螢幕時「變陣」（例如背景轉色、邊距歸零、三欄變一欄）。呢個就係課堂一句「The layout will flex just like a liquid layout and layout change dramatically when beyond certain limit defined by a media query」嘅現實意義——亦係考官最鍾意考嘅「Responsive vs Adaptive vs Liquid」分辨題。

### 實務情境二：導覽列、新聞欄同「卡片」點樣自動排隊

想像你寫一個新聞網站首頁：想文章好似報紙咁三欄並排，就用到 **Multi-column layout**（`column-count: 3` + `column-gap`）；想整一排「導覽按鈕／產品卡片」，喺闊螢幕一字排開、喺窄螢幕自動換行，就係 **flexbox** 嘅主場——父元素加 `display: flex` 成為 **flex container**，每個子元素變成 **flex item**，再用 `flex-wrap: wrap` 控制換行、`justify-content: space-between` 控制空隙、`flex-grow` 控制「多出嚟嘅空間點樣分畀邊個」。如果設計師話「第三個產品要排第一」，你唔使郁 HTML，只係畀佢 `order: -1` 就得——呢啲「唔改 HTML 淨改 CSS 就重新排版面」嘅能力，正正係 CSS page layout 對現代 Web Development 嘅最大價值。

---

## 🎯 模組二：考試學習目標（Learning Objectives）

完成本課題後，你應該有能力做到以下各點（考官會直接或間接測試嘅核心能力）：

- **分辨並定義四種版面類型**：Classify and define the four page layout strategies — Static/Fixed, Liquid/Fluid, Adaptive and Responsive — and explain how each behaves when the browser width changes.
- **解釋 display 屬性同默認值**：Explain that every element has a default `display` value of either `block` or `inline`; give examples of block-level elements (`<div>`, `<h1>`, `<p>`, `<form>`) and inline elements (`<span>`, `<img>`, `<a>`).
- **寫出 display 三值嘅效果**：Apply `display: block;`, `display: inline;` and `display: none;` and describe their visual effects on the layout.
- **用 margin: auto 置中**：Explain the shorthand rules of `margin`（1–4 個值嘅分配次序）and use `margin: auto` to centre a block element horizontally.
- **解釋 float 同 normal flow**：Explain the CSS `float` property — how a floated element is taken out of the normal flow and how inline elements wrap around it; list the values `none`, `left`, `right`.
- **解釋 clear 嘅作用**：Explain the CSS `clear` property — whether an element may sit next to preceding floated elements or must be moved below them; list the values `none`, `left`, `right`, `both`, `inherit`.
- **掌握 media query 語法**：Write a media query in the form `@media not|only mediatype and (media feature) { CSS-Code; }`, and use `max-width` / `min-width` features with logical operators `not`, `and`, `only`.
- **解釋 responsive design**：Define responsive design and state how it combines relative units with media queries.
- **掌握 multi-column 屬性**：Apply multi-column layout properties（`column-count`, `column-gap`, `column-rule-*`, `column-span`, `column-width`）and explain the use of vendor prefixes `-webkit-`（Chrome）and `-moz-`（Firefox）.
- **解釋 flexbox 概念**：Define flex container, flex item, main axis and cross axis; state that a flex container must apply `display: flex` or `display: inline-flex`.
- **掌握 flexbox 容器屬性**：Apply and compare `flex-direction`（row / row-reverse / column / column-reverse）、`flex-wrap`（nowrap / wrap / wrap-reverse）、`justify-content`（flex-start / flex-end / center / space-between / space-around / space-evenly）and the shorthand `flex-flow`.
- **掌握 flexbox 項目屬性**：Apply `flex-grow`（default `0`）、`flex-shrink`（default `1`）and `order`（default `0`）; explain grow/shrink factor distribution and visual order.
- **用 Emmet 加快寫 CSS**：Recognise common Emmet abbreviations（`d:f` → `display:flex;`、`jc:sb` → `justify-content: space-between;` 等）and write out the expanded CSS.

---

## 📖 模組三：雙語深度理論知識點（Comprehensive Notes）

### 3.1 版面分類：四種 Page Layout 策略

網頁版面之所以要分類，出發點好簡單：我哋可以按「頁面喺**唔同瀏覽器寬度**（手機 vs 桌面）下、或者用戶**縮放瀏覽器**時嘅反應」，去將版面分成唔同種類。考官最常考你嘅，就係要你**讀出四種 layout 嘅英文名、定義，同埋各自嘅優點缺點**。

> "We classify web page layouts depends on how they behave when the page is viewed at different browser width (mobile devices vs desktops) or users may resize the browser."

#### 3.1.1 Static Page Layout（或 Fixed Layout）——固定版面

Static Layout 嘅特徵係「**寫死咗一個預設頁面尺寸**」，呢個尺寸**唔會**隨瀏覽器寬度改變。結果係：喺手機等窄螢幕度，頁面通常會被「裁切」（cut off），並且彈出一條**水平滾動條（horizontal scrollbar）**，用戶要左右捽先睇得晒成頁——所以佢係四種之中對流動裝置最唔友善嘅做法。

> "In a Static Page (or Fixed) Layout, the preset page size won't change based on the browser width. Usually the page will be cut off and display a horizontal scrollbar in mobile devices."

#### 3.1.2 Liquid Page Layout（或 Fluid Layout）——流動版面

Liquid Layout 改用**相對單位（relative unit）**——例如**百分比（percentages）**——而唔用像素（pixels）嚟度尺寸。咁樣版面會隨視窗大細「流動」伸縮。不過佢有明顯缺點：喺**非常大或非常細**嘅瀏覽器寬度下，效果會好差（例如超闊螢幕時文字會被拉得好長好難讀）。

> "A Liquid Page (or Fluid) Layout will use any relative unit of measurement (e.g. percentages) instead of pixels. However, it has drawbacks at very large or very small browser widths."

#### 3.1.3 Adaptive Page Layout——適應版面

Adaptive Layout 用 **CSS media queries** 去**偵測瀏覽器寬度**，再因應寬度**切換版面**。典型做法係：用幾條特定 media queries 定義**幾個固定寬度**（例如一個 960px 版本畀桌面、一個 480px 版本畀手機），瀏覽器落到邊個範圍就用邊個固定版面。注意：雖然會「變陣」，但每個變陣版本內部仍然係「固定寬度」。

> "An Adaptive Page Layout uses CSS media queries to detect the width of the browser and alter the layout. Usually it defines several fixed widths defined by specific media queries."

#### 3.1.4 Responsive Page Layout——響應式版面（終極答案）

Responsive Layout 係**將 Liquid 同 Adaptive 兩者結合**：同時用**相對單位**（令佢似 liquid 咁隨時伸縮）同**media queries**（令佢喺某啲臨界點大幅轉變版面）。即係話：一般情況下版面會好似水咁「flex（彈性伸縮）」，但當寬度越過某條 media query 設定嘅界線，版面就會**戲劇性地改變**（例如由三欄跳做一欄）。

> "A Responsive Page Layout combines Liquid and Adaptive layouts by using both relative units and media queries. The layout will flex just like a liquid layout and layout change dramatically when beyond certain limit defined by a media query."

| Layout 類型 | 用咩單位 | 會唔會偵測寬度 | 對唔同寬度嘅反應 | 手機體驗 |
|---|---|---|---|---|
| Static (Fixed) | 固定 px 頁寬 | 唔會 | 完全唔變 | 被裁切 + 水平滾動條 |
| Liquid (Fluid) | 相對單位（%） | 唔會 | 隨時伸縮 | 會縮細，但太大/太細時差 |
| Adaptive | media queries 內嘅固定寬度 | 會（幾組固定寬度） | 分段切換固定版面 | 落到對應版本就 OK |
| Responsive | 相對單位 + media queries | 會 | 平時流動伸縮，過界即變陣 | 最佳，最推薦 |

---

### 3.2 display 屬性：每個元素嘅「顯示本性」

#### 3.2.1 默認值：block 定 inline

CSS 世界入面，**每個 HTML 元素都有一個默認嘅 `display` 值**，而呢個值只有兩大類：`block`（區塊）或者 `inline`（行內）。呢個「本性」決定咗元素喺頁面上點樣「坐位」。

> "Every element has a default display value (either block or inline)."

**Block-level element（區塊級元素）** 嘅特徵係「**永遠由新一行開始**」兼且「**佔滿可用嘅全寬**」。教材例子：`<div>`、`<h1>`、`<p>`、`<form>`。一個 block 元素就算內容好短，都唔會畀第二個元素同佢並排喺同一行。

> "It is block for a block-level element which always starts on a new line and takes up the full width available, e.g. `<div>`, `<h1>`, `<p>`, `<form>`."

**Inline element（行內元素）** 嘅特徵係「**唔會開新行**」兼且「**只佔佢需要嘅闊度**」（content 有幾闊就佔幾闊，其餘空間留返畀後面嘅嘢）。教材例子：`<span>`、`<img>`、`<a>`。

> "It is inline for an inline element which does not start on a new line and only takes up as much width as necessary, e.g. `<span>`, `<img>`, `<a>`."

#### 3.2.2 `<div>` 同 `<span>` 嘅角色

教材特別強調呢兩個「萬用容器」嘅分工：

- `<div>` element 經常被用作**其他 HTML 元素嘅容器（container）**，可以用 CSS 一次過 style「一大嚿內容／成個區塊」。典型用途：將成段內容包起嚟做一個「box」。
- `<span>` element 經常被用作**一段文字嘅容器**，可以用 CSS style「文字入面某一截」。典型用途：喺一個段落中間將幾個字整紅／加底色。

> "The `<div>` element is often used as a container for other HTML elements and can be used to style blocks of content using CSS."
> "The `<span>` element is often used as a container for some text and can be used to style parts of text using CSS."

**考官陷阱**：同一段 HTML，如果入面係 `<div>` 就一個跟一個「打棟」排（每行一個）；如果係 `<span>` 就全部「打橫」黐埋一行——呢個就係 block 同 inline 嘅分別。

#### 3.2.3 display 嘅三個值：block / inline / none

教材用同一段 HTML（三個 `<span>`：`Integrity`、`Client-focused`、`Excellence`），分別放入三個唔同 id 嘅容器，再用 CSS 改變 span 嘅 `display`，示範三個值嘅分別：

```html
<style type="text/css">
  #block span { display: block; }
  #inline span { display: inline; }
  #none span { display: none; }
</style>

<div class="section">CSS display : none</div>
<div id="none">
  <span>Integrity</span><span>Client-focused</span><span>Excellence</span>
</div>

<div class="section">CSS display : block</div>
<div id="block">
  <span>Integrity</span><span>Client-focused</span><span>Excellence</span>
</div>

<div class="section">CSS display : inline</div>
<div id="inline">
  <span>Integrity</span><span>Client-focused</span><span>Excellence</span>
</div>
```

三個值嘅官方解釋（背熟，考 short answer 常用）：

> "`inline` : Displays an element as an inline element (like `<span>`)."
> "`block` : Displays an element as a block element (like `<div>`)."
> "`none` : The element will not be displayed at all (has no effect on layout)."

逐個睇效果：`display: none` 之下三個字**完全消失**，而且**連空間都唔霸**（對版面冇任何影響，好似從來冇存在過）；`display: block` 之下三個原本係 inline 嘅 `<span>` 被「升呢」做 block，結果**每個字各自開新行**；`display: inline`（原本默認）之下三個字**喺同一行黐住排**。

**⚠️ 重要考點**：`display: none` 同 `visibility: hidden` 唔同——前者連 layout 空間都冇埋，後者仲會留返個位。教材只考 `none`，記住佢「has no effect on layout」就夠。

---

### 3.3 margin: auto —— 水平置中 block 元素

#### 3.3.1 margin shorthand 嘅四種寫法

CSS 嘅 `margin` 可以一次過接受 1 至 4 個值，每個值代表邊幾條邊，規則係（必背順序）：

> "One single value applies to all four sides."
> "Two values apply first to top and bottom, the second one to left and right."
> "Three values apply first to top, second to left and right and third to bottom."
> "Four values apply to top, right, bottom and left in that order (clockwise)."

即係：

| 寫法 | top | right | bottom | left | 口訣 |
|---|---|---|---|---|---|
| `margin: 10px;` | 10px | 10px | 10px | 10px | 一個值＝四邊一樣 |
| `margin: 10px 20px;` | 10px | 20px | 10px | 20px | 第一個＝上下，第二個＝左右 |
| `margin: 10px 20px 30px;` | 10px | 20px | 30px | 20px | 上、左右、下 |
| `margin: 10px 20px 30px 40px;` | 10px | 20px | 30px | 40px | 順時針：上右下左 |

#### 3.3.2 margin: auto 點解可以置中？

`margin: auto` 嘅作用係將 block 元素**水平置中**（horizontally centre）。原理：瀏覽器會自動平均分配左右嘅剩餘空間畀 margin，元素自然企正中間。注意要置中嘅元素**一定要設咗 `width`**（如果冇 width 而霸滿全寬，就冇「左右剩餘空間」可言）。

> "margin: auto can be used to centre the block horizontally."

教材例子：兩個 `text_block` 都係 `width: 50%`，一個用 `margin: auto`（置中），一個用 `margin-left: 10%`（靠左少少，用嚟對比）：

```html
<style type="text/css">
  .text_block { width: 50%; }
  #auto { margin: auto; }
  #left { margin-left: 10%; }
</style>

<div class="box">
  <div class="text_block" id="auto">To provide a valued choice to school leavers and working adults to acquire values ....</div>
</div>

<div class="box">
  <div class="text_block" id="left">To provide a valued choice to school leavers and working adults to acquire values ....</div>
</div>
```

效果：`#auto` 嘅文字方塊企喺 box 正中間；`#left` 因為淨係加咗左邊 margin 10%，所以靠左邊偏右少少。

> "margin: auto : horizontally centre the text block."

---

### 3.4 float —— 將元素抽出 normal flow

#### 3.4.1 定義與機制

`float`（浮動）嘅機制係：將元素**從正常文檔流（normal flow）中抽出來**，再將佢放到**容器嘅左邊或右邊**（或者貼住另一個已浮動元素嘅側邊）；而後面嘅 **inline 元素（例如文字）會「wrap around（繞住）」佢嚟排**。呢個就係舊式 CSS 用嚟整「文字繞圖」、「兩欄佈局」嘅核心工具。

> "The float CSS property specifies that an element should be taken from the normal flow and placed along the left or right side of its container or another floated element, where inline elements will wrap around it."

#### 3.4.2 三個值

> "`none` : The element is not floated, and will be displayed just where it occurs in the text. This is default."
> "`left` : The element floats to the left."
> "`right` : The element floats to the right."

| 值 | 效果 | 備註 |
|---|---|---|
| `none` | 唔浮動，喺文字原位顯示 | **默認值** |
| `left` | 元素浮去容器左邊 | 後續 inline 內容喺右邊繞住佢 |
| `right` | 元素浮去容器右邊 | 後續 inline 內容喺左邊繞住佢 |

#### 3.4.3 教材示範

**例 1**：`#block1`（綠色、`width: 180px`）`float: left`，`#block2`（粉紅、`width: 300px`）`float: right`，之後仲有一段 `#block3` 文字。結果係 block1 貼左、block2 貼右，中間嘅普通文字會喺兩者之間嘅空間「繞住」排：

```html
<style type="text/css">
  .text-block { border: 1px solid black; margin: 10px; }
  #block1 { width: 180px; background: lightgreen; float: left; }
  #block2 { width: 300px; background: pink; float: right; padding: 5px; }
  #block3 span { display: block; }
</style>

<div class="text-block" id="block1">
  <ul>
    <li>Core Values</li>
    <li>.....</li>
    <li>Excellence</li>
  </ul>
</div>

<div class="text-block" id="block2">
  Our "think and do" approach .....
</div>

<span id="block3"><span>To be the leading ....</span></span>
```

**例 2（float 方向嘅變化）**：如果 `#block1` 同 `#block2` **兩個都 `float: right`**，兩個 box 會由右邊開始「黐住」向左排（第二個浮動元素會貼住第一個浮動元素嘅左邊）；如果 `#block1 float: left` 而 `#block2 float: none`，就係 block1 浮左、block2 企返喺普通流（唔會同 block1 並排，會被 block1 佔咗左邊空間而縮窄／移位）：

```html
<style type="text/css">
  #block1 { width: 180px; background: lightgreen; float: right; }
  #block2 { width: 300px; background: pink; float: right; padding: 5px; }
</style>

<style type="text/css">
  #block1 { width: 180px; background: lightgreen; float: left; }
  #block2 { width: 300px; background: pink; float: none; padding: 5px; }
</style>
```

**例 3（乜都唔浮）**：如果兩個 block 都係 `float: none`，一切回歸正常流——兩個 block 元素**打棟排**，一個喺上一個喺下，各佔全寬（呢個係「冇用 float 之前」嘅對照組）：

```html
<style type="text/css">
  #block1 { width: 180px; background: lightgreen; float: none; }
  #block2 { width: 300px; background: pink; float: none; padding: 5px; }
</style>
```

---

### 3.5 clear —— 阻止元素黐住浮動元素

#### 3.5.1 定義

`clear` 嘅作用係控制「一個元素可唔可以**企喺佢前面嘅浮動元素旁邊**，定係**必須被推落去（cleared）浮動元素下面**」。教材特別提醒：`clear` 對**浮動元素同非浮動元素都適用**（"applies to both floating and non-floating elements"）——即係話你甚至可以對一個本身 float 嘅元素用 clear。

> "The clear CSS property specifies whether an element can be next to floating elements that precede it or must be moved down (cleared) below them. The clear property applies to both floating and non-floating elements."

#### 3.5.2 五個值

> "`none` : Default. Allows floating elements on both sides."
> "`left` : No floating elements allowed on the left side."
> "`right` : No floating elements allowed on the right side."
> "`both` : No floating elements allowed on either the left or the right side."
> "`inherit` : Inherits this property from its parent element."

| 值 | 意思 | 效果 |
|---|---|---|
| `none` | 默認；左右兩邊都容許浮動元素 | 元素照樣黐住／繞住浮動元素 |
| `left` | 左邊唔容許有浮動元素 | 元素被推落去，避開左邊嘅 float |
| `right` | 右邊唔容許有浮動元素 | 元素被推落去，避開右邊嘅 float |
| `both` | 左右兩邊都唔容許浮動元素 | 元素被推落去所有 float 之下（最常用） |
| `inherit` | 由父元素繼承呢個屬性 | 跟老豆 |

**點記**：float 係「我要浮去邊」，clear 係「我唔畀邊邊有嘢浮」；`clear: both` ＝「兩邊都唔好有浮動嘢阻住我，我要落返去新一行」。

#### 3.5.3 教材示範

同一段 float 示範嘅 HTML（block1 浮左、block2 浮右），而 `#block3` 就係「喺後面嘅文字」，分別試唔同 clear 值：

**clear: none（默認）**——block3 會升上去，黐喺兩個浮動 box 之間嘅空隙：

```html
<style type="text/css">
  .text-block { border: 1px solid black; margin: 10px; }
  #block1 { width: 180px; background: lightgreen; float: left; }
  #block2 { width: 300px; background: pink; float: right; padding: 5px; }
  #block3 { clear: none; }
  #block3 span { display: block; clear: inherit; }
</style>

<div class="text-block" id="block1">
  <ul>
    <li>Core Values</li>
    <li>.....</li>
    <li>Excellence</li>
  </ul>
</div>

<div class="text-block" id="block2">
  Our "think and do" approach .....
</div>

<span id="block3"><span>To be the leading ....</span></span>
```

**clear: left**——block3 左邊唔可以有浮動元素，所以佢會被推落到「左邊浮動元素（block1）」嘅下面先開始：

```html
<style type="text/css">
  #block3 { clear: left; }
</style>
```

**clear: both**——左右兩邊都唔可以有浮動元素，所以 block3 被推到**所有浮動元素之下**，由新一行開始（要徹底避開 float 就用呢個）：

```html
<style type="text/css">
  #block3 { clear: both; }
</style>
```

---

### 3.6 CSS3 Media Queries —— 響應式設計嘅「偵測器」

#### 3.6.1 概念

**Responsive Design（響應式設計）** 嘅策略係：令網站可以「回應（responds to）」瀏覽器同裝置（monitor size、手機、平板）。技術核心係 **media query（媒體查詢）**。

> "Responsive Design is the strategy of making a site that 'responds' to the browser and device."

Media query 嘅結構係「**一個 media type（媒體類型）＋至少一條限制樣式表作用範圍嘅表達式（expression）**」，呢啲表達式用嘅係 media features（媒體特性），例如 `width`、`height`、`color`。而 `@media` rule 嘅作用係：**只有當某個條件係真（true）嘅時候，先至「包括」入面嗰一整套 CSS 屬性**。

> "A media query consists of a media type and at least one expression that limits the style sheets' scope by using media features, such as width, height, and color."
> "The @media rule includes a block of CSS properties only if a certain condition is true."

複雜嘅 media query 可以用**邏輯運算子（logical operators）**組合：`not`、`and`、`only`。

> "You can compose complex media queries using logical operators, including not, and, and only."

#### 3.6.2 教材示範：max-width 臨界點

以下例子：`.box` 平時黃底、`margin: 10px`；當瀏覽器寬度**細過 500px**（`max-width: 500px` 即「最大去到 500px」，超過就唔符合）時，背景變淺綠 `#92FE7E`、margin 變成 `0px`：

```html
<style type="text/css">
  .box { width: 30%; background: yellow; margin: 10px; }

  @media only screen and (max-width: 500px) {
    .box { width: 30%; background: #92FE7E; margin: 0px; }
  }
</style>

<div class="box"> To provide a valued choice ..... </div>
```

**關鍵字 `only` 嘅作用**（必背）：`only` keyword 可以防止**唔支援「帶 media features 嘅 media queries」嘅舊瀏覽器**誤將入面嘅樣式套用落去——即係話舊瀏覽器會直接忽略成個 query，唔會亂咁應用啲樣式。

> "only : The only keyword prevents older browsers that do not support media queries with media features from applying the given styles."

#### 3.6.3 語法總覽

```css
@media not|only mediatype and (media feature) {
    CSS-Code;
}
```

**Media types（媒體類型）**：

> "`all` : Used for all media type devices."
> "`screen` : Used for computer screens, tablets, smart-phones etc."

**Media features（媒體特性）**——注意全部都係指「顯示區域（display area，例如瀏覽器視窗）」嘅大細：

> "`max-width` / `max-height` : The maximum width (or height) of the display area, such as a browser window."
> "`min-width` / `min-height` : The minimum width (or height) of the display area, such as a browser window."

| 類別 | 值 | 用途 |
|---|---|---|
| media type | `all` | 適用於所有類型裝置 |
| media type | `screen` | 適用於電腦螢幕、平板、智能手機等 |
| media feature | `max-width` / `max-height` | 顯示區域（如瀏覽器視窗）嘅**最大**寬／高 |
| media feature | `min-width` / `min-height` | 顯示區域嘅**最小**寬／高 |

**⚠️ 易錯位**：`max-width: 500px` =「寬度 ≤ 500px 先符合」（適用於細螢幕、手機）；`min-width: 500px` =「寬度 ≥ 500px 先符合」（適用於大螢幕、桌面）。Responsive 寫法通常係「mobile-first：先寫手機版默認樣式，再用 `@media (min-width: ...)` 逐步加桌面樣式」，但教材示範係用 `max-width` 嚟覆蓋細螢幕，兩種方向都要識睇。

---

### 3.7 CSS3 Multi-column Layout —— 報刊式多欄文字

#### 3.7.1 概念同 vendor prefix

Multi-column layout 令你可以**好似報紙咁**，好容易噉將一段文字分成多欄顯示。教材提醒：呢啲 column 屬性喺 Chrome 要加 **`-webkit-`** prefix、喺 Firefox 要加 **`-moz-`** prefix（現代瀏覽器已支援無 prefix 嘅標準寫法，但考試跟教材，記住兩個 prefix 對應邊個瀏覽器）。

> "Multi-column layout allows easy definition of multiple columns of text - just like in newspapers."
> "Add prefix `-webkit-` for Chrome, add prefix `-moz-` for Firefox for the following properties."

#### 3.7.2 屬性一覽（全部要識寫英文定義）

| 屬性 | 作用（繁中） | 英文定義句 |
|---|---|---|
| `column-count` | 指定元素要被分成**幾多欄** | "Specifies the number of columns an element should be divided into." |
| `column-gap` | 指定**欄與欄之間嘅空隙** | "Specifies the gap between the columns." |
| `column-rule-style` | 指定欄之間**分隔線嘅樣式** | "Specifies the style of the rule between columns." |
| `column-rule-width` | 指定分隔線嘅**粗幼** | "Specifies the width of the rule between columns." |
| `column-rule-color` | 指定分隔線嘅**顏色** | "Specifies the color of the rule between columns." |
| `column-rule` | **shorthand**，一次過設晒所有 `column-rule-*` | "A shorthand property for setting all the column-rule-* properties (e.g. `column-rule: 1px solid red;`)." |
| `column-span` | 指定元素要**橫跨幾多欄（或 all）** | "Specifies how many (or all) columns an element should span across." |
| `column-width` | 指定欄嘅**建議理想寬度** | "Specifies a suggested, optimal width for the columns." |

**補充機制**（教材重點）：`column-width` 設定嘅係「建議／最佳」寬度，當個值**太大**嘅時候，佢會**影響實際顯示嘅欄數**——即係如果視窗唔夠闊放兩條咁闊嘅欄，瀏覽器就會自動減少欄數嚟遷就。

> "column-width affects the actual number of columns displayed when the width value is too large."

#### 3.7.3 教材示範

將 `.text_block` 分成 **3 欄**、欄距 `20px`，並令標題 `<h2>` **橫跨全部欄**（好似報紙標題咁通欄）：

```css
.text_block {
  -webkit-column-count: 3;
  -webkit-column-gap: 20px;
}
h2 { -webkit-column-span: all; }
```

```html
<div class="text_block">
  <h2>Multi-column Demonstration</h2>
  <div class="paragraph">Established in 1982, ...</div>
  <div class="paragraph">VTC draws ...</div>
  <div class="paragraph">Our "think and do" ...</div>
</div>
```

---

### 3.8 CSS3 Flexible Box（Flexbox）—— 彈性盒子版面模式

#### 3.8.1 點解要 flexbox？

Flexbox 係一個 CSS3 嘅**版面模式（layout mode）**，目標係令元素嘅排列**可以預測（predictably）**，即使頁面要遷就**唔同螢幕尺寸同唔同顯示裝置**（例如手機打棟 vs 桌面打橫）都唔會炒版面。呢個係現代網頁佈局（尤其導覽列、卡片、工具列）嘅主流工具。

> "The CSS3 Flexible Box, or flexbox, is a layout mode providing for the arrangement of elements such that the elements behave predictably when the page layout must accommodate different screen sizes and different display devices."

#### 3.8.2 三個基本概念（必背）

**Flex container（彈性容器）**：裝住 flex items 嘅**父元素**。佢**必須**套用 `display: flex` 或者 `display: inline-flex`，先至會啟動 flexbox 模式。

> "Flex container: The parent element in which flex items are contained. It must apply CSS display:flex or display:inline-flex."

**Flex item（彈性項目）**：flex container 嘅**每一個子元素**都會自動成為一個 flex item。

> "Flex item: Each child of a flex container becomes a flex item."

**兩條軸（Axes）**：每個 flexbox 版面都跟兩條互相垂直嘅軸。**main axis（主軸）**係「flex items 一個跟一個排列所沿住嗰條軸」；**cross axis（交叉軸）**係「同 main axis 垂直嘅軸」。

> "Axes: Every flexible box layout follows two axes. The main axis is the axis along which the flex items follow each other. The cross axis is the axis perpendicular to the main axis."

```
      main axis（預設 row：打橫）
   ───────────────────────────────▶
  │  ┌──────┐ ┌──────┐ ┌──────┐
  │  │ item1│ │ item2│ │ item3│     ← flex items 沿 main axis 排
  │  └──────┘ └──────┘ └──────┘
  ▼
cross axis（垂直於 main axis）
```

**口訣**：container 係「老豆」，item 係「仔」；所有 flexbox 屬性分兩類——「老豆用嘅」（`flex-direction`、`flex-wrap`、`justify-content`、`flex-flow`）同「仔用嘅」（`flex-grow`、`flex-shrink`、`order`）。

---

### 3.9 flex-direction —— 決定主軸方向

#### 3.9.1 定義

`flex-direction` 指定 **flex items 喺 flex container 入面點樣被放置**——即係揀 main axis 打橫定打棟，同埋順序定倒序。**呢個係 container 屬性，要配 `display: flex` 一齊用。**

> "The flex-direction property specifies how flex items are placed in the flex container."

#### 3.9.2 五個值

| 值 | 效果 | 備註 |
|---|---|---|
| `row` | items **打橫**顯示，排成一行 | **默認值**（Default） |
| `row-reverse` | 同 row 一樣打橫，但**次序反轉** | 由右邊開始排 |
| `column` | items **打棟**顯示，排成一列 | 由上到下 |
| `column-reverse` | 同 column 一樣打棟，但**次序反轉** | 由下到上 |
| `initial` | 將屬性設回默認值 | 即 `row` |

> "`row` : Default value. The flexible items are displayed horizontally, as a row."
> "`row-reverse` : Same as row, but in reverse order."
> "`column` : The flexible items are displayed vertically, as a column."
> "`column-reverse` : Same as column, but in reverse order."
> "`initial` : Sets this property to its default value."

#### 3.9.3 教材示範

三個 flex item（黃底、`width: 140px; height: 50px`），container 用 `flex-direction: column-reverse`——結果三個 item **打棟排但次序反轉**（3 喺最上、1 喺最下）：

```css
.paragraph { background: yellow; margin: 10px; border: 1px solid black; width: 140px; height: 50px; }
.flex-container { -webkit-flex-direction: column-reverse; display: flex; }
```

```html
<div class="flex-container">
  <div class="paragraph">1 flex-item</div>
  <div class="paragraph">2 flex-item</div>
  <div class="paragraph">3 flex-item</div>
</div>
```

---

### 3.10 flex-wrap —— 空間唔夠要唔要換行

#### 3.10.1 定義

`flex-wrap` 指定 flex items **應唔應該換行（wrap）**：當第一條 flex line 放唔晒嘅時候，items 會唔會跌落第二行。**container 屬性。**

> "The flex-wrap property specifies whether the flexible items should wrap or not."

#### 3.10.2 四個值

| 值 | 效果 | 備註 |
|---|---|---|
| `nowrap` | items **唔會換行**，全部排喺**單一行**上面 | **默認值**（Default） |
| `wrap` | 如果第一條 flex line **唔夠位**，items 會**換行** | 多行排列 |
| `wrap-reverse` | 需要時換行，但**次序反轉** | 由下而上排 |
| `initial` | 設回默認值 | 即 `nowrap` |

> "`nowrap` : Default value. Specifies that the flexible items will not wrap and all items are laid out on a single-line."
> "`wrap` : Specifies that the flexible items will wrap if there isn't enough room for them on the first flex line."
> "`wrap-reverse` : Specifies that the flexible items will wrap, if necessary, in reverse order."
> "`initial` : Sets this property to its default value."

#### 3.10.3 教材示範

三個 item 每個 `width: 300px`（好闊），container `flex-wrap: wrap`——當三個加埋闊過容器，排唔落嘅 item 會自動**跌落第二行**（唔會爆出去或者被壓扁）：

```css
.paragraph { background: yellow; margin: 10px; border: 1px solid black; width: 300px; height: 50px; }
.flex-container { -webkit-flex-wrap: wrap; display: flex; }
```

```html
<div class="flex-container">
  <div class="paragraph">1 Established in 1982, </div>
  <div class="paragraph">2 VTC draws strength from </div>
  <div class="paragraph">3 Our "think and do" approach </div>
</div>
```

---

### 3.11 justify-content —— 主軸上嘅「剩餘空間分配」

#### 3.11.1 定義

當 flex items **冇用盡 main axis（預設即水平方向）上所有可用空間**嘅時候，`justify-content` 負責話畀瀏覽器知：啲 items 要點樣沿主軸對齊（靠頭、靠尾、置中，定係用空間隔開）。**container 屬性。**

> "The justify-content property aligns the flexible container's items when the items do not use all available space on the main-axis (horizontally)."

#### 3.11.2 六個值（考試最愛考呢六個）

| 值 | 效果 | 備註 |
|---|---|---|
| `flex-start` | items 排喺容器**開頭** | **默認值**（Default） |
| `flex-end` | items 排喺容器**尾端** | 靠右 |
| `center` | items 排喺容器**中間** | 置中 |
| `space-between` | items 之間有**空隙**（頭尾冇） | 第一個貼左、最後一個貼右 |
| `space-around` | items **前、中、後**都有空間 | 每邊半份空間 |
| `space-evenly` | items 周圍空間**完全相等** | 每邊一份空間 |

> "`flex-start` : Default value. Items are positioned at the beginning of the container."
> "`flex-end` : Items are positioned at the end of the container."
> "`center` : Items are positioned at the center of the container."
> "`space-between` : Items are positioned with space between the lines."
> "`space-around` : Items are positioned with space before, between, and after the lines."
> "`space-evenly` : Items will have equal space around them."

#### 3.11.3 教材示範

三個 item（`margin: 0` 先至睇到空間效果），container `justify-content: space-between`——item1 貼最左、item3 貼最右、item2 企正中間，空隙平均分喺 item 之間：

```css
.paragraph { background: yellow; margin: 0px; border: 1px solid black; width: 300px; height: 50px; }
.flex-container { -webkit-justify-content: space-between; display: flex; }
```

```html
<div class="flex-container">
  <div class="paragraph">1 Established in 1982, </div>
  <div class="paragraph">2 VTC draws strength from </div>
  <div class="paragraph">3 Our "think and do" approach </div>
</div>
```

---

### 3.12 flex-flow —— flex-direction + flex-wrap 嘅 shorthand

`flex-flow` 係一個**簡寫（shorthand）屬性**，一次過設定 `flex-direction` 同 `flex-wrap` 兩個屬性。你可以**供應一個或者兩個值**（順序：先 direction 後 wrap）。**container 屬性。**

> "The flex-flow property is a shorthand for setting the flex-direction and flex-wrap properties. You can supply one or two of the values: flex-flow: <'flex-direction'> and <'flex-wrap'>."

```css
/* Example 1：打橫排 + 需要時換行 */
.flex-container { flex-flow: row wrap; }

/* Example 2：打橫倒序排 + 換行都倒序 */
.flex-container { flex-flow: row-reverse wrap-reverse; }
```

**對照表**（direction × wrap 點組合）：

| `flex-direction` ＼ `flex-wrap` | `nowrap` | `wrap` | `wrap-reverse` |
|---|---|---|---|
| `row` | — | **Example 1**: `row wrap` | — |
| `row-reverse` | — | — | **Example 2**: `row-reverse wrap-reverse` |
| `column` | — | — | — |
| `column-reverse` | — | — | — |

**口訣**：`flex-flow` ＝ 先講「點排」（direction），再講「唔夠位點算」（wrap）。

---

### 3.13 flex-grow —— 剩餘空間點樣「分」畀邊個

#### 3.13.1 定義

`flex-grow` 指定一個 flex item 嘅 **grow factor（增長因子）**：即係話，當容器有**剩餘空間**嘅時候，呢個 item 應該**攞走幾多份**。**呢個係 item 屬性（仔用嘅），默認值係 `0`**（即默認唔會搶多餘空間）。

> "The flex-grow CSS property specifies the flex grow factor of a flex item. It specifies what amount of space inside the flex container the item should take up."
> "A number specifying how much the item will grow relative to the rest of the flexible items. Default value is 0."

```css
.flex-item { flex-grow: number; }
```

#### 3.13.2 機制拆解（教材用中文詳細解釋，必睇）

`grow` 值可以理解成「**佔用剩餘部分嘅份數**」。教材例子：容器剩餘空間係 **230px**，item A 嘅 `flex-grow` 係 **7**、item B 嘅係 **3**。咁即係將剩餘空間分成 **10 份（7 + 3）**，每份闊度係 **23px（230 ÷ 10）**；item A（grow 7）攞走 **7 份 = 161px（7 × 23）**，item B（grow 3）攞走 **3 份 = 69px（3 × 23）**。

> "The grow value can be understood as the number of shares of the remaining space. For example, if the remaining space is 230px, and the grow values are 7 and 3, the space is divided into 10 shares (7 + 3); each share is 23px (230/10). The first item takes 7 shares = 161px (7 × 23), the other takes 69px (3 × 23)."

**計數三步曲**：① 加晒所有 grow 值做分母；② 剩餘空間 ÷ 分母 = 每份幾多；③ 每個 item 攞「自己 grow 值 × 每份」。

#### 3.13.3 教材示範

三個 item：item-1 `flex-grow: 1`、item-2 `flex-grow: 0`（默認，唔搶空間）、item-3 `flex-grow: 2`。剩餘空間會分成 1 + 0 + 2 = **3 份**，item-1 攞 1 份、item-3 攞 2 份、item-2 保持原闊度：

```css
.flex-container { display: flex; }
#item-1 { flex-grow: 1; }
#item-2 { flex-grow: 0; }
#item-3 { flex-grow: 2; }
```

```html
<div class="flex-container">
  <div class="paragraph" id="item-1">1 flex-item</div>
  <div class="paragraph" id="item-2">2 flex-item</div>
  <div class="paragraph" id="item-3">3 flex-item</div>
</div>
```

---

### 3.14 flex-shrink —— 空間唔夠時邊個「縮」多啲

#### 3.14.1 定義

`flex-shrink` 指定一個 flex item 嘅 **shrink factor（收縮因子）**：當容器**放唔晒**啲 items（例如冇得換行）時，每個 item 要**縮幾多**先至塞得落。**item 屬性，默認值係 `1`**（同 flex-grow 默認 0 唔同！）。

> "The flex-shrink CSS property specifies the flex shrink factor of a flex item."
> "A number specifying how much the item will shrink relative to the rest of the flexible items. Default value is 1."

```css
.flex-item { flex-shrink: number; }
```

#### 3.14.2 機制拆解（教材用中文詳細解釋，必睇）

`shrink` 係「損耗比例」，同 `flex-grow` 啱啱**相反**：如果容器放唔晒指定嘅部件，瀏覽器會**按比例平均縮細每個部件嘅寬度**，直至放得落為止。教材例子：容器寬度 **100px**，入面有 **2 個各 100px 闊**嘅部件，而你又**指定唔換行**（`nowrap`），瀏覽器就會自動將兩個部件**同比縮小**，即每個變成 **50px**，咁就放得落。另一種情況：部件 **A** 同 **B**，A「唔肯同 B 縮一樣多」，A 縮嘅空間永遠係 B 嘅**一半**——咁就將 A 設 `flex-shrink: 1`、B 設 `flex-shrink: 2`（B 嘅 shrink factor 大，蝕多啲）。

```css
.item-A { flex-shrink: 1; }
.item-B { flex-shrink: 2; }
```

> "flex-shrink is the opposite of flex-grow: if the container cannot hold all the specified items, the browser shrinks each item's width proportionally. For example, if the container is 100px wide and contains two items each 100px wide, and wrapping is disabled, the browser automatically shrinks both items proportionally, so each becomes 50px."

**⚠️ 考試重點**：`flex-grow` 默認 `0`（唔搶），`flex-shrink` 默認 `1`（要縮就縮）——兩個默認值唔好撈亂。

#### 3.14.3 教材示範

三個 item：item-1 `flex-shrink: 1`（正常縮）、item-2 `flex-shrink: 0`（**打死都唔縮**，保持原闊度）、item-3 `flex-shrink: 2`（縮兩倍份額）：

```css
.flex-container { display: flex; }
#item-1 { flex-shrink: 1; }
#item-2 { flex-shrink: 0; }
#item-3 { flex-shrink: 2; }
```

```html
<div class="flex-container">
  <div class="paragraph" id="item-1">1</div>
  <div class="paragraph" id="item-2">2</div>
  <div class="paragraph" id="item-3">3</div>
</div>
```

---

### 3.15 order —— 唔改 HTML 都可以改「視覺次序」

#### 3.15.1 定義

`order` 指定一個 flex item 喺**同一 container 入面**、相對其他 flex items 嘅**視覺次序（visual order）**。**item 屬性，默認值係 `0`**。特別規則：**如果兩個元素嘅 `order` 值一樣，佢哋就跟返喺 source code（HTML 原始碼）入面出現嘅次序排列**——即係話 order 只係改「視覺顯示次序」，並冇改動 HTML 結構。

> "The order property specifies the visual order of a flexible item relative to the rest of the flexible items inside the same container."
> "Elements with the same order value are laid out in the order in which they appear in the source code."

| 值 | 效果 | 備註 |
|---|---|---|
| `number` | 指定該 flex item 嘅次序 | **默認值 0**；數字細嘅排前面 |
| `initial` | 設回默認值 | 即 0 |

> "`number` : Default value 0. Specifies the order for the flexible item."
> "`initial` : Sets this property to its default value."

#### 3.15.2 教材示範（兩個例子都要識睇）

**例 1**：HTML 順序係 A（Input）、B（Execute）、C（Output），但 order 分別係 `2`、`0`、`1`——結果視覺次序變咗 **B（0）→ C（1）→ A（2）**，即「Execute → Output → Input」：

```css
.flex-container { display: flex; }
#item-1 { order: 2; }   /* A Input   —— 最後 */
#item-2 { order: 0; }   /* B Execute —— 第一 */
#item-3 { order: 1; }   /* C Output  —— 中間 */
```

```html
<div class="flex-container">
  <div class="paragraph" id="item-1">A Input</div>
  <div class="paragraph" id="item-2">B Execute</div>
  <div class="paragraph" id="item-3">C Output</div>
</div>
```

**例 2（order 相同就睇 source order）**：item-1（A）order `1`、item-2（B）order `0`、item-3（C）order `1`。B（0）排第一；A 同 C 都係 `1`，所以**跟返 HTML 出現次序**——A 先、C 後。最終視覺次序：**B → A → C**：

```css
.flex-container { display: flex; }
#item-1 { order: 1; }
#item-2 { order: 0; }
#item-3 { order: 1; }
```

**⚠️ 考官陷阱**：order 唔會郁 HTML，亦唔會影響 keyboard tab 次序等「真實文件次序」，只係視覺上重排。

---

### 3.16 Emmet 快捷鍵（Abbreviations）

Emmet 係現代程式編輯器（例如 VS Code）內置嘅「**CSS 快速輸入系統**」：你打一個**略寫（abbreviation）**再按 Tab／Enter，佢會自動**展開（expand）**做完整 CSS 宣告。教材提供以下對照表（原投影片以三欄排列，以下按原表重排，部分重複項為教材原貌）：

| 略寫 | 展開 | 略寫 | 展開 | 略寫 | 展開 |
|---|---|---|---|---|---|
| `d` | `display:block;` | `@m`, `@media` | `@media screen { }` | `fxd:cr` | `.......: column-reverse;` |
| `d:b` | `display:block;` | `maw` | `max-width:;` | `fxd:r` | `.......: row;` |
| `d:i` | `display:inline;` | `miw` | `min-width:;` | `fxd:rr` | `.......: row-reverse;` |
| `d:n` | `display:none;` | `colmc` | `column-count:;` | `fxw` | `flex-wrap: ;` |
| `m` | `margin:;` | `colm` | `columns:;` | `fxw:n` | `flex-wrap:nowrap;` |
| `m:a` | `margin:auto;` | `colmg` | `column-gap:;` | `fxw:w` | `flex-wrap:wrap;` |
| `mt` | `margin-top:;` | `colmr` | `column-rule:;` | `fxw:wr` | `flex-wrap:wrap-reverse;` |
| `ml` | `margin-left:;` | `colmrc` | `column-rule-color:;` | `jc` | `justify-content:;` |
| `fl` | `float:left;` | `colmrs` | `column-rule-style:;` | `jc:c` | `.......: center;` |
| `fl:l` | `float:left;` | `colmrw` | `column-rule-width:;` | `jc:fe` | `.......: flex-end;` |
| `fl:r` | `float:right;` | `colms` | `column-span:;` | `jc:fs` | `.......: flex-start;` |
| `fl:n` | `float:none;` | `colmw` | `column-width:;` | `jc:sa` | `.......: space-around;` |
| `cl` | `clear:both;` | `d:f` | `display:flex;` | `jc:sb` | `.......: space-between;` |
| `cl:b` | `clear:both;` | `d:if` | `display:inline-flex;` | `fxf` | `flex-flow:;` |
| `cl:n` | `clear:none;` | `d:ib` | `display:inline-block;` | `fxg` | `flex-grow:;` |
| `cl:l` | `clear:left;` | `fxd` | `flex-direction:;` | `fxsh` | `flex-shrink:;` |
| `cl:r` | `clear:right;` | `fxd:c` | `.......: column;` | `ord` | `order:;` |

> "Emmet is a set of abbreviations (shortcuts) for web developers; typing an abbreviation and expanding it quickly generates complete CSS declarations in the code editor."

**記憶法**：留意略寫通常係「屬性名嘅首字母／首幾個字母」＋「值嘅首字母」。例如 `jc:sb` = `justify-content: space-between;`、`fxd:c` = `flex-direction: column;`、`m:a` = `margin: auto;`。考試通常係「畀你略寫，叫你寫出展開後嘅 CSS」或者反向「畀你 CSS，揀啱略寫」。

---

## 📖 模組四：必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| Static (Fixed) Layout | 固定版面：預設頁寬唔隨瀏覽器寬度改變，手機上會被裁切並出現水平滾動條 | "In a static layout, the preset page size won't change based on the browser width, so the page may be cut off and show a horizontal scrollbar on mobile devices." |
| Liquid (Fluid) Layout | 流動版面：用百分比等相對單位代替像素，版面隨視窗伸縮，但極大／極細寬度時效果差 | "A liquid layout uses relative units such as percentages instead of pixels, so the page stretches with the window, but it has drawbacks at very large or very small browser widths." |
| Adaptive Layout | 適應版面：用 media queries 偵測寬度，切換幾組由特定 media queries 定義嘅固定寬度版面 | "An adaptive layout uses CSS media queries to detect the browser width and switches between several fixed widths defined by specific media queries." |
| Responsive Layout | 響應式版面：結合 liquid（相對單位）＋ adaptive（media queries），平時流動伸縮、過臨界點大幅變陣 | "A responsive layout combines liquid and adaptive layouts by using both relative units and media queries; the layout flexes and changes dramatically beyond limits defined by media queries." |
| horizontal scrollbar | 水平滾動條：Static 版面喺窄螢幕溢出時出現，用戶要左右捲動 | "When a fixed-width page is too wide for the screen, the page will be cut off and display a horizontal scrollbar." |
| relative unit | 相對單位：如百分比（%），相對父元素或視窗計尺寸，用於 liquid 版面 | "A liquid layout uses any relative unit of measurement, for example percentages, instead of pixels." |
| block-level element | 區塊級元素：永遠由新一行開始並佔滿可用全寬，例如 `<div>`、`<h1>`、`<p>`、`<form>` | "A block-level element always starts on a new line and takes up the full width available, for example `<div>`, `<h1>`, `<p>` and `<form>`." |
| inline element | 行內元素：唔會開新行，只佔所需寬度，例如 `<span>`、`<img>`、`<a>` | "An inline element does not start on a new line and only takes up as much width as necessary, for example `<span>`, `<img>` and `<a>`." |
| default display value | 每個元素默認嘅 display 值，只有 block 或 inline 兩類 | "Every element has a default display value, which is either block or inline." |
| `<div>` (container) | 用作其他 HTML 元素嘅容器，可一次過 style 成個區塊 | "The `<div>` element is often used as a container for other HTML elements to style blocks of content." |
| `<span>` (container) | 用作一段文字嘅容器，可 style 文字中嘅某部分 | "The `<span>` element is often used as a container for some text to style parts of text." |
| `display: none` | 元素完全唔顯示，而且對版面冇任何影響 | "With `display: none`, the element will not be displayed at all and has no effect on layout." |
| `margin: auto` | 將 block 元素水平置中（需配合 width） | "`margin: auto` horizontally centres a block element within its container." |
| margin shorthand（1–4 values） | 一值＝四邊；兩值＝上下／左右；三值＝上／左右／下；四值＝順時針上右下左 | "One margin value applies to all four sides; two values apply to top/bottom then left/right; four values apply to top, right, bottom and left in clockwise order." |
| normal flow | 正常文檔流：元素未浮動／未定位時嘅默認排列方式 | "Floating takes an element out of the normal flow and places it along the left or right side of its container." |
| `float` | 令元素脫離 normal flow 並靠容器左／右，inline 元素會繞住佢 | "The `float` property takes an element from the normal flow and places it on the left or right, and inline elements wrap around it." |
| `float: left` / `float: right` | 浮去左邊／右邊；`float: none` 為默認，即唔浮動 | "`float: none` (the default) displays the element where it occurs in the text; `left` and `right` float it to the corresponding side." |
| `clear` | 控制元素可否黐住前面嘅浮動元素，定係要推落到佢哋下面 | "The `clear` property specifies whether an element can be next to floating elements that precede it or must be moved down below them." |
| `clear: both` | 左右兩邊都唔容許浮動元素，元素落返去所有 float 之下 | "`clear: both` means no floating elements are allowed on either the left or the right side." |
| media query | 媒體查詢：media type ＋至少一條用 media feature 限制作用範圍嘅表達式 | "A media query consists of a media type and at least one expression that limits the style sheet's scope using media features such as width and height." |
| responsive design | 響應式設計：令網站「回應」瀏覽器同裝置嘅策略 | "Responsive design is the strategy of making a site that responds to the browser and device." |
| `@media` rule | 只有當條件為真時先包括入面嘅 CSS 區塊 | "The `@media` rule includes a block of CSS properties only if a certain condition is true." |
| `not` / `and` / `only` | media query 嘅三個邏輯運算子；`only` 防止舊瀏覽器誤套用 | "Media queries can be composed with the logical operators `not`, `and` and `only`; `only` prevents older browsers that do not support media features from applying the styles." |
| media type: `all` | 適用於所有類型裝置嘅媒體類型 | "The media type `all` is used for all media type devices." |
| media type: `screen` | 適用於電腦螢幕、平板、智能手機等 | "The media type `screen` is used for computer screens, tablets and smart-phones." |
| `max-width` / `max-height` | 顯示區域（如瀏覽器視窗）嘅最大寬／高，超過即唔符合 | "`max-width` specifies the maximum width of the display area, such as a browser window." |
| `min-width` / `min-height` | 顯示區域嘅最小寬／高，未達即唔符合 | "`min-width` specifies the minimum width of the display area, such as a browser window." |
| vendor prefix (`-webkit-` / `-moz-`) | 瀏覽器廠商前綴：Chrome 用 `-webkit-`、Firefox 用 `-moz-` | "Add the prefix `-webkit-` for Chrome and `-moz-` for Firefox for these CSS3 properties." |
| multi-column layout | 多欄版面：好似報紙咁將文字分成多欄 | "Multi-column layout allows easy definition of multiple columns of text, just like in newspapers." |
| `column-count` | 指定元素分成幾多欄 | "`column-count` specifies the number of columns an element should be divided into." |
| `column-gap` | 指定欄與欄之間嘅空隙 | "`column-gap` specifies the gap between the columns." |
| `column-rule` (+ `-style/-width/-color`) | 欄間分隔線嘅 shorthand 及樣式／粗幼／顏色 | "`column-rule` is a shorthand for `column-rule-style`, `column-rule-width` and `column-rule-color`, e.g. `column-rule: 1px solid red;`." |
| `column-span` | 指定元素橫跨幾多欄或全部欄 | "`column-span` specifies how many (or all) columns an element should span across." |
| `column-width` | 欄嘅建議最佳寬度；值太大會影響實際欄數 | "`column-width` specifies a suggested optimal width for the columns; a value that is too large affects the actual number of columns displayed." |
| flexbox / Flexible Box | 彈性盒子：CSS3 版面模式，令元素排列喺唔同螢幕尺寸下可預測 | "Flexbox is a CSS3 layout mode in which elements behave predictably across different screen sizes and display devices." |
| flex container | 彈性容器：裝住 flex items 嘅父元素，必須 `display: flex` 或 `inline-flex` | "A flex container is the parent element that contains flex items; it must apply `display: flex` or `display: inline-flex`." |
| flex item | 彈性項目：flex container 嘅每個子元素 | "Each child of a flex container becomes a flex item." |
| main axis | 主軸：flex items 一個跟一個排列所沿住嘅軸 | "The main axis is the axis along which the flex items follow each other." |
| cross axis | 交叉軸：與主軸垂直嘅軸 | "The cross axis is the axis perpendicular to the main axis." |
| `flex-direction` | 決定 items 喺容器內點放：row 打橫（默認）、column 打棟、可 reverse | "`flex-direction` specifies how flex items are placed in the container; `row` is the default horizontal direction, `column` is vertical." |
| `flex-wrap` | 決定空間唔夠時換唔換行：nowrap 默認單行、wrap 換行、wrap-reverse 反序換行 | "`flex-wrap` specifies whether the flexible items should wrap; `nowrap` keeps all items on a single line, `wrap` lets them wrap." |
| `justify-content` | 主軸上 items 未用盡空間時嘅對齊方式 | "`justify-content` aligns the flex items when they do not use all the available space on the main axis." |
| `space-between` / `space-around` / `space-evenly` | 三種「用空間隔開 items」嘅值：between 頭尾冇隙、around 每邊半份、evenly 每邊相等 | "`space-between` puts space between the items, `space-around` puts space before, between and after them, and `space-evenly` gives them equal space around each item." |
| `flex-flow` | shorthand：一次過設 flex-direction 同 flex-wrap | "`flex-flow` is a shorthand for setting `flex-direction` and `flex-wrap`, e.g. `flex-flow: row wrap;`." |
| `flex-grow` | item 嘅增長因子：剩餘空間按 grow 值比例分；默認 0 | "`flex-grow` specifies how much of the remaining space a flex item takes up relative to the others; its default value is 0." |
| `flex-shrink` | item 嘅收縮因子：空間唔夠時按比例縮；默認 1 | "`flex-shrink` specifies how much a flex item will shrink relative to the others when there is not enough room; its default value is 1." |
| grow / shrink factor | 增長／收縮因子：控制剩餘空間分配或不足空間分攤嘅比例 | "A flex-grow value of 7 and 3 divides the remaining space into 10 shares, giving 7/10 to the first item and 3/10 to the other." |
| `order` | 同一容器內 flex item 嘅視覺次序；默認 0；相同 order 跟 source code 次序 | "The `order` property sets the visual order of a flex item; elements with the same order value appear in source-code order." |
| Emmet abbreviation | 編輯器（如 VS Code）內 CSS 快速輸入略寫，如 `jc:sb` | "An Emmet abbreviation such as `jc:sb` expands to the full CSS declaration `justify-content: space-between;`." |

---

## 🗺️ 模組五：循序漸進學習路線（Learning Path）

> 每階段跟住「**先理解 ➔ 背誦 ➔ 實作 ➔ 解題**」四步走，完成先好去下一階段。

### 階段 1：版面四大分類（Static / Liquid / Adaptive / Responsive）

1. **先理解**：四種 layout 係按「瀏覽器寬度改變時版面點反應」嚟分類；Static 寫死唔變、Liquid 用相對單位伸縮、Adaptive 用 media queries 切固定寬度、Responsive 兩者結合。
2. **背誦英文短語**：`preset page size won't change`、`relative unit of measurement (e.g. percentages)`、`detect the width of the browser`、`flex just like a liquid layout`、`layout change dramatically when beyond certain limit`。
3. **掌握寫法/實作**：識用「相對單位（%）＋ `@media`」砌一個 Responsive 雛形；能指出 Static 頁喺手機點解會 cut off。
4. **能解答嘅英文考題**："List four types of page layout and explain how each behaves when the browser width changes." / "Which layout combines relative units with media queries?"

### 階段 2：display、margin、float、clear（操控 normal flow）

1. **先理解**：每個元素默認 block 或 inline；`display` 可改本性；`margin: auto` 靠「平均分左右空間」置中；`float` 抽出元素令文字繞住排；`clear` 阻止元素黐住浮動元素。
2. **背誦英文短語**：`always starts on a new line and takes up the full width available`、`only takes up as much width as necessary`、`taken from the normal flow`、`inline elements will wrap around it`、`must be moved down (cleared) below them`。
3. **掌握寫法/實作**：寫 `display: block/inline/none` 示範；`width: 50%` + `margin: auto` 置中；`float: left/right` + `clear: both` 排兩欄；背熟 margin 1–4 值順序。
4. **能解答嘅英文考題**："Explain the difference between block-level and inline elements with examples." / "What is the effect of `clear: both` after two floated elements?"

### 階段 3：CSS3 Media Queries（響應式核心）

1. **先理解**：`@media` 條件成立先套用 CSS；`max-width` 管「最闊幾多」、`min-width` 管「最窄幾多」；`only` 擋舊瀏覽器。
2. **背誦英文短語**：`includes a block of CSS properties only if a certain condition is true`、`prevents older browsers that do not support media queries with media features`、`the maximum width of the display area, such as a browser window`。
3. **掌握寫法/實作**：默寫語法 `@media not|only mediatype and (media feature) { CSS-Code; }`；寫出「500px 以下轉背景色同 margin」嘅完整例子。
4. **能解答嘅英文考題**："Write a media query that changes the background colour when the browser width is smaller than 500px." / "What does the `only` keyword do in a media query?"

### 階段 4：Multi-column Layout

1. **先理解**：報刊式多欄；`column-count` 定欄數、`column-gap` 定欄距、`column-rule` 定分隔線、`column-span` 通欄、`column-width` 建議欄闊；舊瀏覽器要 vendor prefix。
2. **背誦英文短語**：`divided into N columns`、`the gap between the columns`、`span across all columns`、`a suggested, optimal width`、`-webkit- for Chrome, -moz- for Firefox`。
3. **掌握寫法/實作**：寫出「3 欄、欄距 20px、`<h2>` 通欄」嘅完整 CSS（連 prefix）。
4. **能解答嘅英文考題**："Write CSS to display a paragraph of text in three newspaper-style columns with a 20px gap." / "Explain what `column-span: all` does."

### 階段 5：Flexbox 全套（概念＋七屬性）

1. **先理解**：container（父）要 `display: flex`；仔全部變 flex item；main axis vs cross axis；「老豆屬性」同「仔屬性」分清楚。
2. **背誦英文短語**：`behave predictably when the page layout must accommodate different screen sizes`、`row is the default horizontal direction`、`items will not wrap and are laid out on a single line`、`flex-start is the default value`、`flex-grow default value is 0`、`flex-shrink default value is 1`、`same order value are laid out in source-code order`。
3. **掌握寫法/實作**：寫齊 container 版（`flex-direction`、`flex-wrap`、`justify-content`、`flex-flow`）同 item 版（`flex-grow`、`flex-shrink`、`order`）示範；識計 grow 分空間（230px、7:3 → 161px/69px）；識講 shrink 默認 1 嘅「100px 容器兩個 100px item → 各 50px」例子。
4. **能解答嘅英文考題**："A flex container has three items with flex-grow 1, 0 and 2. Describe how the remaining space is distributed." / "What is the default value of `flex-wrap` and what does it do?" / "Three items have order 2, 0 and 1; state the visual order."

### 階段 6：Emmet 同全單元總複習

1. **先理解**：Emmet 略寫 = 屬性縮寫，打落編輯器會展開成完整 CSS。
2. **背誦英文短語**：`d:f` → `display:flex;`、`jc:sb` → `justify-content: space-between;`、`fxd:c` → `flex-direction: column;`、`m:a` → `margin: auto;`、`cl:b` → `clear: both;`。
3. **掌握寫法/實作**：將 3.16 張 Emmet 表遮住右欄，自己寫返展開後嘅 CSS，再反方向練。
4. **能解答嘅英文考題**："Expand the Emmet abbreviation `fxw:w` into a full CSS declaration." / 綜合題："Compare float-based layout with flexbox for arranging a navigation bar."

---

## 🎒 模組六：考前 5 分鐘雙語懶人包（Cheat Sheet）

### 6.1 四種 Page Layout 極速對照

| 類型 | 關鍵字眼 | 一句記住 |
|---|---|---|
| Static (Fixed) | fixed px、唔會變、cut off + horizontal scrollbar | 「寫死闊度，手機切邊」 |
| Liquid (Fluid) | relative units、percentages、伸縮 | 「百分比跟視窗縮」 |
| Adaptive | media queries + 幾組 **fixed widths** | 「偵測寬度，切固定版」 |
| Responsive | relative units **＋** media queries | 「又流動又識變陣＝終極」 |

### 6.2 元素本質與 display 速記

| 項目 | 內容 | 必背例 |
|---|---|---|
| block-level element | 開新行、佔全寬 | `<div>` `<h1>` `<p>` `<form>` |
| inline element | 唔開新行、只佔所需寬 | `<span>` `<img>` `<a>` |
| `display: block` | 變區塊（每行一個） | — |
| `display: inline` | 變行內（黐埋一行） | — |
| `display: none` | 完全消失，**對版面無影響** | — |

### 6.3 margin／float／clear 速記

| 語法 | 效果 | 備註 |
|---|---|---|
| `margin: auto` | **水平置中** block | 要配合 `width` |
| `margin: 10px 20px 30px 40px` | 上／右／下／左 | **順時針** TRouBLe（Top-Right-Bottom-Left） |
| `float: left` / `right` / `none` | 浮左／浮右／唔浮（默認） | 文字會繞住浮動元素 |
| `clear: none`（默認） | 兩邊容許浮動 | — |
| `clear: left` / `right` | 嗰邊唔准有浮動 | 推落去 |
| `clear: both` | 兩邊都唔准 | 最常用，避晒所有 float |
| `clear: inherit` | 繼承父元素 | — |

### 6.4 Media Query 速記

```css
@media not|only mediatype and (media feature) { CSS-Code; }
```

| 位 | 常用值 | 意思 |
|---|---|---|
| mediatype | `all` | 所有裝置 |
| mediatype | `screen` | 螢幕（電腦／平板／手機） |
| feature | `max-width: 500px` | 寬度 **≤** 500px（細螢幕） |
| feature | `min-width: 500px` | 寬度 **≥** 500px（大螢幕） |
| 邏輯運算子 | `not` `and` `only` | `only`＝防舊瀏覽器誤套用 |

### 6.5 Multi-column 速記

| 屬性 | 作用 | 例 |
|---|---|---|
| `column-count` | 欄數 | `-webkit-column-count: 3;` |
| `column-gap` | 欄距 | `-webkit-column-gap: 20px;` |
| `column-rule` | 分隔線（shorthand） | `column-rule: 1px solid red;` |
| `column-span` | 通欄 | `h2 { -webkit-column-span: all; }` |
| `column-width` | 建議欄闊（太大會減欄數） | — |
| prefix | Chrome：`-webkit-`；Firefox：`-moz-` | 舊瀏覽器至要 |

### 6.6 Flexbox 屬性總表（分「老豆／仔」＋默認值）

| 屬性 | 邊個用 | 默認值 | 常用值（口訣） |
|---|---|---|---|
| `display` | container | — | `flex` / `inline-flex`（必加先有 flexbox） |
| `flex-direction` | container | `row` | Row 打橫、Column 打棟、`-reverse` 反轉 |
| `flex-wrap` | container | `nowrap` | 唔換行默認；`wrap` 唔夠位就換行；`wrap-reverse` 反序 |
| `justify-content` | container | `flex-start` | Start / End / Center / Between / Around / Evenly（「頭尾中、間均等」） |
| `flex-flow` | container | — | shorthand：`flex-direction` + `flex-wrap`，如 `row wrap` |
| `flex-grow` | **item** | **0** | 剩餘空間按份數分：7:3 即 7/10 同 3/10 |
| `flex-shrink` | **item** | **1** | 唔夠位按份縮：shrink 2 蝕雙倍 |
| `order` | **item** | **0** | 數字細排前；相同 order 跟 HTML source order |

### 6.7 英文極速記憶口訣（Mnemonics）

1. **Layout 四兄弟**："**S**tatic Stiff（唔郁）、**L**iquid Loose（跟視窗縮）、**A**daptive Alt（切換固定版）、**R**esponsive Real Deal（兩者合體）"。
2. **Block vs Inline**："**Block Breaks the line**（開新行、霸全寬）；**Inline stays In line**（黐埋一行）"——記住 `<div>` 打棟、`<span>` 打橫。
3. **Display none**："**None = No space, No trace**（冇顯示、冇霸位、對版面冇影響）"。
4. **Margin 四值順序**："**TRouBLe** —— Top, Right, Bottom, Left（順時針，似時鐘行）"。
5. **Float vs Clear**："**Float = go Left/Right side**；**Clear = No floating beside me**"；要清晒就用 `clear: both`。
6. **Media query 公式**："**only screen and (max-width: 500px)**" 默寫一次即入腦；「max = 最闊係幾多，細螢幕適用；min = 最窄要幾多，大螢幕適用」。
7. **Multi-column**："**Count**（欄數）、**Gap**（欄距）、**Rule**（分隔線）、**Span**（通欄）"——四兄弟背齊。
8. **Flexbox 三默認值**："**Grow 0, Shrink 1, Order 0**（Grow 唔搶、Shrink 肯縮、Order 排隊跟原始碼）"。
9. **justify-content 六連**："**Start-End-Center, Between-Around-Evenly**（靠頭、靠尾、中間、之間、周圍、均等）"。
10. **Emmet 三寶**："`d:f` = display:flex、`jc:sb` = space-between、`m:a` = margin auto"，考試見到略寫就唸返個屬性全名。

### 6.8 最常考嘅三條英文作答骨架

1. 比較 Responsive 同 Adaptive："Responsive uses **both relative units and media queries**, while Adaptive switches between **several fixed widths** detected by media queries."
2. 解釋 float 機制："A floated element is **taken from the normal flow** and placed on the left or right of its container; **inline elements wrap around it**."
3. 講 grow 計法："The remaining space is divided into shares equal to the **sum of all flex-grow values**; each item receives space proportional to its own flex-grow value."
