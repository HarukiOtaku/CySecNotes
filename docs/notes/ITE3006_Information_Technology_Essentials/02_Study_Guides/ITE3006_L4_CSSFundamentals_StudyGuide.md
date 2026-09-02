# ITE3006 Topic 4: CSS Fundamentals — 雙語應考學習指南（Bilingual & Exam-Ready Study Guide）

> 本指南根據課堂教材重寫，適用對象為大專資訊科技（ITE3006）學生。全部機制解說以香港繁體中文撰寫；所有核心定義、HTML 標籤作用、CSS 屬性與考試答題重點均緊隨標準英文定義句（English Standard Definitions）。HTML、CSS 程式碼一律保留英文原文，專有名詞不作生硬翻譯。

---

## 📝 模組一：課程概要與實務情境（Summary & Real-world Context）

### 課程概要

Topic 4「CSS Fundamentals」係成個網頁開發（Web Development）知識鏈嘅第一塊「樣式基石」。HTML 嘅職責係描述**內容**（content）——即頁面有乜嘢文字、圖片、標題；而 CSS（Cascading Style Sheets，階層樣式表）嘅職責係描述**外觀**（appearance）——即內容應該點樣顯示、排版、呈現。兩者分工，令網頁作者可以「一次過」控制全站每一頁嘅字體、顏色、背景、對齊等視覺細節，而毋須喺每個 HTML 標籤度逐個落手腳。教材會帶你認識 CSS 點解會誕生（HTML 喺外觀控制上嘅限制）、一套 CSS 文件嘅基本語法（selector + property + value）、將樣式加入 HTML 嘅三種方法（Local / Global / External），以及操控顏色、字型、文字同各類選擇器（element、class、ID、pseudo-class）嘅完整工具庫。

### 實務情境一：整間公司網站要「一個地方改晒全站風格」

假想你係一間餐廳嘅網頁開發員，網站有 30 幾頁（首頁、菜單、分店、聯絡……）。若果冇 CSS，你要逐頁、逐個 `<font>` 或 `<b>` 標籤去改顏色同字型，改一次品牌色就要通宵改 30 個檔案。透過 **external style sheet**（例如 `mystyles.css`），你只需要喺每一頁嘅 `<head>` 用一條 `<link>` 標籤連結同一份 CSS；日後要轉品牌色，只需要改 CSS 一個位置，全站即時更新——呢個正正係教材所講「Separate content from presentation（內容與呈現分離）」同「Define the appearance and layout of all the pages in your web site in a single place（喺單一位置定義全站外觀）」嘅核心價值。

### 實務情境二：設計師交稿，你要精準還原排版

現實工作中你經常要照住設計圖（mockup）整網頁：標題要紅色、段落字要 12pt、背景要特定顏色、連結唔好有底線。如果靠 HTML 內建嘅少數樣式標籤（`<i>`、`<b>`、`<font>`），你控制唔到字距、行距、對齊方式，而且唔同瀏覽器顯示結果可以差好遠。用 CSS 你即可精準指定 `color`、`font-size`、`line-height`、`text-align`、`text-decoration` 等屬性，並且利用 **class selector** 同 **ID selector** 將「同一種風格」重複套用喺多個元素上——例如整頁所有「警告訊息」都用 `.newstyle` 呢個 class，一次過控制。呢個亦係考官最鍾意考嘅「點解要用 CSS / CSS 有咩好處」實務題。

---

## 🎯 模組二：考試學習目標（Learning Objectives）

完成本課題後，你應該有能力做到以下各點（考官會直接或間接測試嘅核心能力）：

- **區分 HTML 與 CSS 嘅職責**：Explain the difference between HTML and CSS — HTML describes the content of a page, while CSS describes the appearance, layout and presentation of that content.
- **解釋 CSS 嘅誕生背景**：Describe the limitations of HTML in controlling page appearance (e.g. appearance tags scattered inside content, inconsistent display across browsers).
- **背誦並解釋 CSS 定義**：State the definition of CSS — a style sheet document used by a web browser to redefine the properties of the various elements and tags in the HTML.
- **講解「Cascade」嘅意思**：Explain what "Cascading" means — a hierarchy of style information in which styles are inherited from parent elements and passed down from higher levels.
- **掌握 CSS 規則基本語法**：Write a CSS rule in the form `selector { property: value; }` and explain each part（selector 揀元素、property/value 描述外觀、值唔加引號、分號規則）。
- **分辨三種加入樣式嘅方法**：Distinguish between local (inline) style, global (embedded `<style>`) style and external style sheets（`<link>`），並說出各自優缺點。
- **寫 CSS 註解**：Write single-line and multi-line comments in CSS using `/* ... */`.
- **運用各類選擇器**：Use element selectors, multiple selectors, the universal selector `*`, contextual (descendant) selectors（如 `li em`）、class selectors（`.name`）同 ID selectors（`#name`）。
- **運用錨點 pseudo-classes**：Apply `a:link`, `a:visited`, `a:hover`, `a:active` to style links differently.
- **記熟顏色表示法**：Use color names and hex codes（`#RRGGBB`，由 `#000000` 到 `#FFFFFF`）for `color` and `background-color`.
- **操控字型與文字屬性**：Use `font-family`（含 generic font fallback）、`font-size`（px/pt/em 單位及 xx-small–xx-large 關鍵字）、`font-style`、`font-weight`、`text-align`（left/right/center/justify）、`text-decoration`、`line-height` 等屬性，並說明單位含義。
- **理解 override（覆寫）次序**：Explain the cascade override rules — when values disagree, the last one overrides earlier ones, and more specific selectors override more general ones.
- **識別 Emmet 捷徑**：Recognise common Emmet abbreviations（`fz` → `font-size`、`bgc` → `background-color` 等）並寫出展開後嘅 CSS。

---

## 📖 模組三：雙語深度理論知識點（Comprehensive Notes）

### 3.1 咩係 CSS？CSS 與 HTML 嘅分工

HTML 只係負責「講內容」——頁面有啲咩字、有咩結構（標題、段落、列表）；佢本身並唔擅長「講外觀」。CSS 就係補充呢個缺口嘅語言：CSS 描述**資訊要點樣被顯示**，而唔係**顯示啲咩**。技術上，CSS 係一種「文檔」，瀏覽器會用佢嚟**重新定義** HTML 入面各種元素同標籤嘅屬性（例如顏色、大小、字型）。呢份樣式表文檔有兩個存放位置：可以**內嵌**喺 HTML 文檔入面（internal），亦可以**獨立存放**喺伺服器上另一個檔案（external）。

> "CSS (Cascading Style Sheet) describes the appearance, layout and presentation of information on a web page, as opposed to HTML, which describes the content of the page."
> "CSS describes how information is to be displayed, not what is being displayed."
> "A style sheet is a type of document that is used by a web browser to redefine the properties of the various elements and tags in the HTML."
> "The style sheet document may be contained inside the HTML document (internal), or written in a separate file on the server (external)."

CSS 之所以重要，係因為佢有兩大優勢：

1. **內容與呈現分離**：HTML 只寫結構內容，視覺風格全部交由 CSS 負責。
2. **集中管理**：可以喺**單一位置**定義成個網站所有頁面嘅外觀同排版，改一處、全站生效。

> "CSS has the following advantages: (1) Separate content from presentation. (2) Define the appearance and layout of all the pages in your web site in a single place."

### 3.2 HTML 嘅限制（點解要發明 CSS？）

喺 CSS 出現之前，網頁作者要控制外觀相當痛苦。教材列出 HTML 嘅主要限制：

- HTML 本來嘅設計目的只係描述文檔內容，頁面作者根本冇被要求去描述排版（layout）。
- 為咗控制外觀，HTML 被迫加入愈嚟愈多嘅標籤，令到「內容」同「外觀」愈纏愈埋（content and appearance became more intertwined）。
- 唔同瀏覽器對同一份 HTML 顯示結果唔一致——當外觀重要嘅時候，呢個就係大問題。
- HTML 雖然都有少量標籤同屬性可以指定某啲樣式，例如斜體 `<i>`、粗體 `<b>`、以及指定字型同顏色嘅 `<font>` 標籤，但能力極之有限。

> "Limitation of HTML: HTML describes the content of a document. Page authors didn't have to describe the layout."
> "HTML requires more and more tags to control appearance; content and appearance became more intertwined."
> "Different browsers displayed things differently, which is a real problem when appearance is important."
> "HTML does include tags and attributes to specify some aspects of style, e.g. `<i>`, `<b>`, `<font face="courier" color="#001111">`."

```html
<!-- HTML 時代控制外觀嘅原始方法（能力有限、維護困難） -->
<i>斜體文字</i>
<b>粗體文字</b>
<font face="courier" color="#001111">指定字型與顏色</font>
```

### 3.3 Style Sheet（樣式表）概念與「Cascading」嘅由來

一份 style sheet 包含一連串**規則（rules）**，每一條規則講明「某啲元素喺螢幕上應該點樣顯示」。如果完全冇 style sheet，外觀就完全由瀏覽器自己話事（browser completely controls the look and feel of web pages）。Style sheet 嘅威力在於：你可以將一個「style」**關聯到某個標籤嘅所有出現位置**——即係話全頁所有 `<h1>` 一次過變成紅色，而唔使逐個改。

至於 CSS 個名入面嘅「Cascading（階層/瀑布式）」，指嘅係可以指定**一層一層嘅樣式資訊（hierarchy of style information）**：子元素嘅樣式會由包住佢嘅父元素**繼承（inherited）**落嚟；多份樣式表可以形成一個 cascade，樣式資訊由高一層一層傳落去。

> "A style sheet contains rules for how elements are displayed on the screen."
> "Without style sheets, the browser completely controls the look and feel of web pages."
> "You can associate a 'style' with all occurrences of a certain tag."
> "'Cascade' in 'Cascading Style Sheet (CSS)' refers to the fact that a hierarchy of style information may be specified."
> "The style of an element is 'inherited' from the parent of the enclosing element."
> "You can have a cascade of style sheets with style information passed down from higher levels."

### 3.4 CSS 語法基礎（Syntax）

一份 CSS 檔案由一條或以上嘅**規則（rules）**組成。每一條規則開頭係一個**選擇器（selector）**，用嚟指明要影響邊啲 HTML 元素，然後將樣式屬性套用落去。

> "A CSS file consists of one or more rules. Each rule starts with a selector that specifies an HTML element(s) and then applies style properties to them."

**Selector（選擇器）**：就係要被影響嘅標籤。注意：選擇器嘅大小寫敏感與否，取決於文檔語言本身——如果文檔語言係大小寫敏感（HTML 標籤喺實際使用上一般不分大小寫，但 CSS 語法仍以精準為準），選擇器先至係大小寫敏感。

> "Selector is the tag to be affected. The selector is case-sensitive if and only if the document language is case-sensitive."

**Property 與 Value**：兩者一齊描述嗰個標籤嘅外觀。注意 **值唔可以加引號**（no quotes on the values）；冒號（`:`）同分號（`;`）後面嘅空格係可有可無；**property: value 配對之間必須用分號分隔**，但**最後一對後面嘅分號係可以省略**嘅。

> "Property and value describe the appearance of that tag. Note that there are no quotes on the values."
> "Spaces after colons and semicolons are optional."
> "A semicolon must be used between property: value pairs, but a semicolon after the last pair is optional."

### 3.5 CSS 基本例子（Simple Example）

教材用兩條規則示範：`<h1>` 文字設為紅色；`<p>` 字體大小 12pt、字型優先揀 Verdana，冇就退而求其次用 sans-serif。

```css
h1 {
    color: red;
}

p {
    font-size: 12pt;
    font-family: Verdana, sans-serif;
}
```

### 3.6 將樣式加入 HTML 嘅三種方法（Adding Styles to HTML）

CSS 可以透過三個層次加入 HTML，由「最局部」到「最全局」：

| 方法 | 位置 | 影響範圍 |
|------|------|----------|
| **Local Style**（行內樣式） | `style` 屬性內嵌於單一 HTML 標籤 | 只影響嗰一個標籤 |
| **Global Style**（嵌入式樣式） | `<style>` 標籤放喺 HTML `<head>` 內 | 影響成個文檔 |
| **External Style Sheet**（外部樣式） | 獨立 `.css` 檔案，用 `<link>` 連結 | 影響所有連結咗嘅頁面 |

> "Local Styles: style information for individual HTML elements, embedded within a single attribute and applies only to that tag, e.g. `<h1 style="color: red">Red Head</h1>`."
> "Global Style: in the HTML `<head>`."
> "External style sheets: in a separate file."

```html
<!-- 三種方法嘅速覽 -->
<h1 style="color: red">Red Head</h1>            <!-- Local -->
<style type="text/css"> h1 { color: red; } </style> <!-- Global（放 <head>）-->
<link rel="stylesheet" type="text/css" href="mystyles.css"> <!-- External（放 <head>）-->
```

#### 3.6.1 Local Style（行內樣式 / STYLE 屬性）

`STYLE` 屬性可以加喺**任何** HTML 元素上面。語法係喺屬性值入面寫 `property: value`；有多個屬性就用分號分隔。

> "The STYLE attribute can be added to any HTML element."
> "Syntax: `<html-tag STYLE="property: value">` or `<html-tag STYLE="property: value; property2: value2; ... propertyn: valuen">`."

**優點（Advantage）**：如果你只係想整一少部分標記（a small amount of markup），佢好方便——唔使開另一個檔案或寫成段 `<style>`。
**缺點（Disadvantages）**：樣式屬性會散落喺成份文檔各處（scatters style attributes throughout the document），想統一改外觀時好難搵、好難維護。

**完整例子（Local Style Example）**：留意三個 `<p>`——冇樣式、20pt、40pt 兼洋紅色（`#FF00FF`）：

```html
<html>
<head>
    <title>Local Style</title>
</head>
<body>
    <p>CSS - Fundamentals - local style 1</p>
    <p style="font-size: 20pt">CSS - Fundamentals - local style 2</p>
    <p style="font-size: 40pt; color: #FF00FF">CSS - Fundamentals - local style 3</p>
</body>
</html>
```

#### 3.6.2 Global Style（嵌入式樣式 / `<style>` 喺 `<head>`）

做法係喺 HTML 嘅 `<head>` 部分放入 `<style type="text/css"> ... </style>`，入面直接寫 CSS 規則。

**優點（Advantages）**：

- 更有效率（More efficient）。
- 更容易維護網站、更容易改變樣式（Maintain the site easier to change style）。
- 喺 global style sheet 改一個標籤嘅樣式，**文檔內所有嗰種標籤都會自動更新**（Make a change to a tag style in the global style sheet, all those tags in the document will be updated）。
- HTML 本身會更乾淨（HTML will be cleaner）——內容唔再夾雜樣式標記。

> "Global style: by putting `<style type="text/css">` in the `<head>`."

**完整例子（Global Style Example）**：

```html
<html>
<head>
    <style type="text/css">
        h1 {
            font-size: 20pt;
        }
        h2 {
            font-size: 40pt;
            color: #0000FF;
        }
    </style>
    <title>Global Style</title>
</head>
<body>
    <p>CSS - Fundamentals - Global style 1</p>
    <h1>CSS - Fundamentals - Global style 2</h1>
    <h2>CSS - Fundamentals - Global style 3</h2>
</body>
</html>
```

#### 3.6.3 CSS 註解（Comments）

CSS 註解可以係單行或者跨多行，語法係 `/* ... */`。註解只係畀人睇嘅說明，瀏覽器會忽略。

> "CSS comments may be in single line or multiple lines, by using `/* ... */`."

```css
/* This is the comment */
h1 {
    font-size: 20pt;
}
h2 {
    font-size: 40pt;
    color: #0000FF;
}
```

#### 3.6.4 External Style Sheets（外部樣式表）

將**所有樣式資訊**放入一份**獨立文檔**（例如 `mystyle.css`）。呢份文檔**只可以包含樣式規則**（Document must only contain style sheet rules）——唔可以放 HTML 內容。HTML 文檔就透過喺 `<head>` 加入 `<link>` 標籤去連接到外部樣式表；一份 HTML 可以連結多過一份 style sheet。

> "Put all style information in a separate document (e.g. mystyle.css). The document must only contain style sheet rules."
> "The HTML document has links to external style sheet documents. It may be linked to more than one style sheet, by adding the `<link>` tag in the HTML `<head>`."

`<link>` 標籤嘅三個關鍵屬性：

- `rel="stylesheet"`：**rel（relationship）屬性定義連結文檔同當前文檔嘅關係**，佢話畀瀏覽器知你用緊邊種連結——例如 `stylesheet`。
- `type="text/css"`：指明連結內容嘅 MIME 類型。
- `href="path/mystyles.css"`：指明樣式表檔案嘅路徑。

> "The `rel` attribute defines the linked document's relationship with the current document. It tells the browser what type of link you are using, e.g. stylesheet."

```html
<head>
    <link rel="stylesheet" type="text/css" href="path/mystyles.css">
</head>
```

**External Style Sheets 嘅優點（Advantages）**：

- 將頁面嘅**格式**同**內容**完全分開（Separate formatting and content of pages）。
- 更容易建立包含**多過一頁**嘅網站：只要加入一份 style sheet，**所有頁面都係根據同一套規則**顯示（Easier to create a site which contains more than one page — by adding a single style sheet, all pages are based on the rule）。

**完整例子（External Style Sheet Example）**：

```html
<!-- lect04_3_external_style.html -->
<html>
<head>
    <link rel="stylesheet" type="text/css" href="lect04_3_mystyles.css">
    <title>External Style</title>
</head>
<body>
    <p>CSS-Fundamentals-External style 1</p>
    <h1>CSS-Fundamentals-External style 2</h1>
    <h2>CSS-Fundamentals-External style 3</h2>
</body>
</html>
```

```css
/* lect04_3_mystyles.css */
h1 {
    color: red;
    text-align: left;
    font-size: 15pt;
}
h2 {
    color: green;
    text-align: left;
    font-size: 20pt;
}
```

### 3.7 Cascade（疊加機制與優先次序）

「Cascade」喺實作上嘅意思：**同一時間可以有多過一份 style sheet 影響同一份文檔**，而佢哋之間有一個**既定嘅層級（hierarchy）**。當樣式衝突嗰陣，邊個贏？教材指出兩條關鍵原則（詳見 3.8.1）：

1. 相同規則內，**後面（last）嘅值會覆寫前面**嘅值。
2. **愈特定（more specific）嘅選擇器會覆寫愈一般（general）**嘅選擇器。

> "More than one style sheet can affect a single document at a time; a hierarchy is defined."
> "When values disagree, the last one overrides any earlier ones."
> "When values disagree, more specific selectors override general ones."

### 3.8 Selectors（選擇器）

一個 CSS selector 係由一個**pattern（模式）**組成，瀏覽器會將呢個 pattern 同**文檔樹（document tree）入面所有元素**逐一比對，命中嘅元素就會套用規則。最基本嘅係 **element selector**：直接寫標籤名。

> "A CSS selector is made up of a pattern that is matched against all elements in the document tree."
> "Element selector: simply specifies a tag name, e.g. `p { color: blue; }`."

教材話選擇器主要有**三種識別方式**：

- **Contextual selector（上下文/後代選擇器）**——根據元素喺文檔樹入面嘅位置（邊個包住邊個）嚟揀。
- **Class selector（類別選擇器）**——根據元素嘅 `class` 屬性嚟揀。
- **ID selector（ID 選擇器）**——根據元素嘅 `id` 屬性嚟揀。

> "There are three ways to identify element selectors: contextual selector, class selector, ID selector."

#### 3.8.1 Element Selector 進階例子

- 一個 HTML 標籤可以直接做 element selector：`body { background-color: #FFFFFF }`。
- **多個選擇器**可以用逗號分隔，共用同一組規則：`em, i { color: red }` 令 `<em>` 同 `<i>` 都變紅色。
- **重複指定選擇器**亦得：下面兩條規則都影響 `h1, h3`，當兩條規則對同一屬性（例如 `color`）俾出**唔同值**嗰陣，**最後一條會覆寫之前嘅**：

```css
h1, h2, h3 {
    font-family: Verdana;
    color: pink;
}
h1, h3 {
    font-weight: bold;   /* 唔同屬性，兩條都生效 */
    color: black;        /* 與上一條 color 衝突 → 以最後呢個 black 為準 */
}
```

- **通用選擇器（universal selector）`*`** 會套用喺**任何同所有**元素身上：`* { color: blue }`。不過當值衝突時，較特定嘅選擇器會贏過較一般嘅 `*`。

> "You can use multiple selectors: `em, i { color: red }`."
> "You can repeat selectors; when values disagree, the last one overrides any earlier ones."
> "The universal selector `*` applies to any and all elements: `* { color: blue }`; when values disagree, more specific selectors override general ones."

```css
body {
    background-color: #FFFFFF;
}
* {
    color: blue;      /* 所有元素預設藍字 */
}
```

#### 3.8.2 Contextual Selector（上下文 / 後代選擇器）

「Type selector」會命中某種元素類型嘅**每一個**實例（every instance）。例如要將文檔內所有強調文字（`<em>`）設做紅色，寫 `em { color: red }` 就得。但若果想**覆寫**呢條規則，只將「**喺 list item 入面**」嘅強調文字設做綠色，就要用 contextual selector：`li em { color: green }`——即係「喺 `<li>` 入面嘅 `<em>`」。**注意 `li` 同 `em` 之間唔可以有逗號**（no comma between `li` and `em`），有逗號就變咗「分別命中兩種元素」嘅 multiple selector。

> "A type selector matches every instance of a particular element type."
> "To override the rule and specify all emphasized text in a list item in green color: `li em { color: green }`. Note there should be no comma between `li` and `em`."

```css
em {
    color: red;      /* 全部 <em> 都係紅色 */
}
li em {
    color: green;    /* 只有喺 <li> 入面嘅 <em> 先係綠色（覆寫上面） */
}
```

#### 3.8.3 Class Selector（類別選擇器）

Class selector 用嚟喺**同一份文檔入面指定唔同嘅樣式變化**——例如大部分 `<h1>` 用預設綠色，但某啲 `<h1>` 要特別紅色。定義 class selector 時，要喺 selector 名稱**前面加一點（`.`）**。

> "Class selectors are used to specify different possible styles within a single document."
> "When defining a class selector, put `.` before the selector name."

**寫法一：`h1.newstyle`**——只命中「`<h1>` 而且 `class="newstyle"`」嘅元素；其他 `<h1>` 維持預設樣式：

```html
<html>
<head>
    <style type="text/css">
        h1 {
            color: green;
        }
        h1.newstyle {
            color: red;
        }
    </style>
    <title>Class selector</title>
</head>
<body>
    <h1>This is the default h1 style</h1>
    <h1 class="newstyle">The new style</h1>
</body>
</html>
```

**寫法二：`.newstyle`（唔帶元素名）**——如果文檔入面有**多過一個**元素都用咗 `class="newstyle"`（例如 `<h1>` 同 `<p>` 都用），咁就直接用 `.newstyle`，命中**任何**帶呢個 class 嘅元素：

```html
<html>
<head>
    <style type="text/css">
        h1 {
            color: green;
        }
        .newstyle {
            color: red;
        }
    </style>
    <title>Class selector</title>
</head>
<body>
    <h1>This is the default h1 style</h1>
    <h1 class="newstyle">The new style</h1>
    <p class="newstyle">The new style</p>
</body>
</html>
```

> "If there are more than one element classified as `newstyle`, we can style it as: `.newstyle { color: red; }`."

#### 3.8.4 `<a>` 嘅 Pseudo-classes（偽類別）

Pseudo-classes 可以加喺 `<a>`（anchor）元素上，令「未訪問連結、已訪問連結、正被啟動連結」顯示出唔同外觀。`<a>` 元素可以用嘅 pseudo-classes 有四個：`link`、`visited`、`active` 同 `hover`。

> "Pseudo-classes can be assigned to the `<a>` element to display links, visited links and active links differently."
> "The anchor element can use the pseudo-classes `link`, `visited`, `active` and `hover`."

```css
a:link    { color: red; }
a:active  { color: blue; font-size: 125%; }
a:visited { color: green; font-size: 85%; }
a:hover   { color: green; }
```

#### 3.8.5 ID Selector（ID 選擇器）

ID selector 係一種確保**某個樣式只套用喺成份文檔入面嘅單一個標籤**（only a single tag）嘅方法。定義 ID selector 時，要喺 selector 名稱**前面加井號（`#`）**。而且**每個 ID selector 喺 HTML 入面只可以出現一次**（each ID selector should appear only once within an HTML）——ID 係唯一嘅，同 class「可以畀好多元素共用」唔同。

> "ID selector is a way to make sure that a style applies to only a single tag in an entire document."
> "When defining an ID selector, put `#` before the selector name."
> "Each ID selector should appear only once within an HTML."

**完整例子（ID Selector Example）**——用 `<div>`、`<span>`、`<p>` 三個唔同標籤配三個唔同 ID：

```html
<html>
<head>
    <title>ID Selector</title>
    <style type="text/css">
        <!--
        #red_text  { color: #FF0000; }
        #blue_text { color: #0000FF; }
        #bold_text { font-weight: bold; }
        -->
    </style>
</head>
<body>
    <div id="red_text">This is red text using the &lt;div&gt; tag and the red_text id</div>
    <span id="blue_text">This is blue text using the &lt;span&gt; tag and the blue_text id</span>
    <p id="bold_text">This is bold text using the &lt;p&gt; tag and the bold_text id</p>
</body>
</html>
```

**Class vs ID 一分鐘對比（考官常考）**：

| 比較點 | Class Selector `.name` | ID Selector `#name` |
|--------|------------------------|---------------------|
| 符號 | 一點 `.` | 井號 `#` |
| 用途 | 指定**唔同可能嘅樣式**，可畀多個元素重複使用 | 令樣式**只套用喺單一標籤** |
| 唯一性 | 一個 class 可以出現喺好多元素 | 每個 ID 喺一份 HTML **只出現一次** |
| 典型例子 | `<h1 class="newstyle">`、`<p class="newstyle">` | `<div id="red_text">` |

### 3.9 Color Properties（色彩屬性）

CSS 用兩個屬性控制顏色：

- **`color`**：元素**文字**嘅顏色（the color of the element's text）。
- **`background-color`**：顯示喺元素**後面**嘅顏色（the color that will appear behind the element）。

顏色可以用兩種方式表示：

1. **Color names（顏色名稱）**：CSS 有 16 個基本色名——`aqua`、`black`、`blue`、`fuchsia`、`gray`、`green`、`lime`、`maroon`、`navy`、`olive`、`purple`、`red`、`silver`、`teal`、`white`、`yellow`。
2. **Hex codes（十六進制碼）**：RGB 三個通道用 base-16（十六進制）表示，範圍由 `#000000`（全黑）到 `#FFFFFF`（全白），格式係 `#RRGGBB`。

> "`color`: the color of the element's text. `background-color`: the color that will appear behind the element."
> "Color names: aqua, black, blue, fuchsia, gray, green, lime, maroon, navy, olive, purple, red, silver, teal, white and yellow."
> "Hex codes: RGB values in base-16 from `#000000` to `#FFFFFF`."

```css
p {
    color: red;               /* 顏色名稱 */
    background-color: yellow; /* 顏色名稱 */
}
```

### 3.10 background-color 與 background-image（背景屬性）

- **`background-color`** 設定元素嘅背景顏色。

> "The `background-color` property sets the background color of an element."

```css
body {
    background-color: white;
}
h1 {
    background-color: #000080;   /* 深藍色（hex code） */
}
```

- **`background-image`** 設定元素嘅背景圖片，值用 `url(...)` 包住圖片位置——可以係**相對路徑**（伺服器內檔案）或者**完整 URL**（網上圖片）。

> "The `background-image` property sets the background image of an element."

```css
body {
    background-image: url(/images/aa.gif);           /* 相對路徑 */
}
p {
    background-image: url(http://www.aa.com/bg.gif); /* 絕對 URL */
}
```

### 3.11 CSS Font Properties（字型屬性）

教材講四個字型相關屬性：

- **`font-family`**：用邊種字型（which font will be used）。
- **`font-size`**：字母會畫到幾大（how large the letters will be drawn）。
- **`font-style`**：用嚟開啟／關閉**斜體**（enable/disable italic style）。
- **`font-weight`**：用嚟開啟／關閉**粗體**（enable/disable bold style）。

> "CSS properties for fonts: `font-family` (which font will be used); `font-size` (how large the letters will be drawn); `font-style` (used to enable/disable italic style); `font-weight` (used to enable/disable bold style)."

#### 3.11.1 font-family（字型選擇與後備機制）

`font-family` 可以指定**多個字型**，由**最高到最低優先次序**排列（highest to lowest priority）。如果第一個字型喺用戶部電腦搵唔到，瀏覽器就試下一個（fallback），如此類推。最後通常放一個 **generic font name（通用字型類別）** 做兜底：`serif`、`sans-serif`、`cursive`、`fantasy`、`monospace`。

> "`font-family` can specify multiple fonts from highest to lowest priority."
> "Generic font names: serif, sans-serif, cursive, fantasy, monospace."
> "If the first font is not found on the user's computer, the next is tried."

```css
p {
    font-family: "Garamond", "Times New Roman", serif;
}
```

#### 3.11.2 font-size（字型大小與單位）

`font-size` 可以用**單位數值**或者**模糊關鍵字**：

- **單位**：`px`（pixels，螢幕像素）、`pt`（points，點數）、`em`（m-size，相對單位）。教材例子：`16px`、`16pt`、`1.16em`（換算可參考 http://pxtoem.com）。
- **模糊大小（vague font size）**：`xx-small`、`x-small`、`small`、`medium`、`large`、`x-large`、`xx-large`（由最細到最大）。

> "Units: pixels (`px`) vs. point (`pt`) vs. m-size (`em`); e.g. 16px, 16pt, 1.16em."
> "`pt` specifies a number of points, where a point is 1/72 of an inch onscreen."
> "`px` specifies a number of pixels on the screen."
> "`em` specifies a number of m-widths, where 1 em is equal to the font's current size."
> "Vague font sizes: xx-small, x-small, small, medium, large, x-large, xx-large."

```css
p {
    font-size: 0.8em;   /* 相對字型大小：係當前字型大小嘅 80% */
}
```

**三個單位嘅精確含義（必背）**：

| 單位 | 全名 | 定義 |
|------|------|------|
| `pt` | point | 1 pt = 1/72 吋（onscreen） |
| `px` | pixel | 螢幕上嘅像素數目 |
| `em` | m-width | 1 em = 字型當前嘅大小（相對單位） |

#### 3.11.3 font-weight 與 font-style（粗體與斜體開關）

兩者都可以設做 `normal` 嚟**關閉**效果（例如將預設粗體嘅標題還原做正常）。

> "Either `font-weight` or `font-style` can be set to `normal` to turn them off."

```css
p {
    font-weight: bold;   /* 開粗體 */
    font-style: italic;  /* 開斜體 */
}
```

### 3.12 CSS Text Properties（文字屬性）

處理文字排版嘅屬性包括：

- **`text-align`**：文字喺佢所屬元素入面嘅對齊方式。
- **`text-decoration`**：裝飾效果，例如**加底線**（underlining）。
- **`line-height`**、**`word-spacing`**、**`letter-spacing`**：控制行距、字間距、字母間距。
- **`text-indent`**：將**每個段落嘅第一行**縮排（indents the first line of each paragraph）。

> "CSS properties for text: `text-align` (alignment of text within its element); `text-decoration` (decorations such as underlining); `line-height`, `word-spacing`, `letter-spacing`; `text-indent` (indents the first line of each paragraph)."

#### 3.12.1 text-align（水平對齊）

`text-align` 可以有四個值：`left`（靠左）、`right`（靠右）、`center`（置中）、`justify`（左右對齊——會將元素所有「完整行」拉闊，令佢哋佔滿成個寬度）。

> "`text-align` can be `left`, `right`, `center` or `justify` (which widens all full lines of the element so that they occupy its entire width)."

```css
h2 {
    text-align: center;
}
```

#### 3.12.2 line-height（行高）

`line-height` 接受一個數值嚟控制**文字基線（baselines）之間嘅間距**：

- 當值係**數字**（number）嗰陣，行高 = 元素字型大小 × 嗰個數字。
- **百分比**值係相對元素字型大小（percentage values are relative to the element's font size）。
- **負數值係唔容許**（negative values are not permitted）。
- 例子：`line-height: 200%` 可以做出**雙倍行距**（double-spaced）文字。

> "The `line-height` property accepts a value to control the spacing between baselines of text."
> "When the value is a number, the line height is calculated by multiplying the element's font size by the number."
> "Percentage values are relative to the element's font size; negative values are not permitted."
> "The `line-height` property could be used to double-space text: `p { line-height: 200%; }`."

```css
p {
    line-height: 200%;   /* 雙倍行距 */
}
```

#### 3.12.3 text-decoration（文字裝飾）

`text-decoration` 可以加 `underline`（底線）、`overline`（頂線）等效果，而且**效果可以組合**（effects can be combined），例如 `overline underline`。一個經典應用係**移除連結嘅底線**：用 `a:link, a:visited, a:active { text-decoration: none; }` 令未訪問／已訪問／正啟動嘅連結都唔顯示底線。

> "`text-decoration` adds decorations such as underlining; effects can be combined: `text-decoration: overline underline;`."
> "For example, one can suggest that links not be underlined: `a:link, a:visited, a:active { text-decoration: none; }`."

```css
p {
    text-decoration: underline;   /* 呢段文字會有底線 */
}
a:link, a:visited, a:active {
    text-decoration: none;        /* 移除連結底線 */
}
```

### 3.13 Emmet Shortcuts（Emmet 捷徑）

Emmet 係編輯器（如 VS Code）入面嘅 HTML/CSS 快速輸入工具：打一個縮寫再按 Tab／Enter，就會自動展開成完整程式碼。教材列出以下 CSS 常用捷徑（考官或實習題可能考你認得佢哋）：

| Emmet Shortcut（縮寫） | Expanded Code（展開後） |
|------------------------|--------------------------|
| `link` | `<link rel="stylesheet" href="" />` |
| `c` | `color:#000;` |
| `fz` | `font-size:;` |
| `ff` | `font-family:;` |
| `bgc` | `background-color:#fff;` |
| `fw` | `font-weight:;` |
| `bgi` | `background-image:url();` |
| `fs` | `font-style:italic;` |
| `ta` | `text-align:left;` |
| `lh` | `line-height:;` |
| `td` | `text-decoration:none;` |

> "Emmet shortcuts expand abbreviations into full code, e.g. `fz` expands to `font-size:;`, `bgc` expands to `background-color:#fff;`, `link` expands to `<link rel="stylesheet" href="" />`."

**記憶竅門**：捷徑大部份就係屬性名嘅首字母——`c` = `color`、`fz` = `font-size`、`ff` = `font-family`、`fw` = `font-weight`、`fs` = `font-style`、`ta` = `text-align`、`lh` = `line-height`、`td` = `text-decoration`；兩個背景相關嘅 `bgc` = background-**c**olor、`bgi` = background-**i**mage。

---

## 📖 模組四：必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型（Exam Answer Phrase） |
|--------------------|------------------|----------------------------------------|
| `Cascading Style Sheet (CSS)` | 階層樣式表：由瀏覽器用嚟重新定義 HTML 元素外觀嘅文檔 | "CSS describes the appearance, layout and presentation of information on a web page, as opposed to HTML, which describes the content of the page." |
| `Cascade` | 樣式資訊一層層傳落去嘅階層機制，子元素由父元素繼承樣式 | "The 'Cascade' refers to the fact that a hierarchy of style information may be specified and passed down from higher levels." |
| `Style sheet` | 包含「元素點樣顯示」規則嘅文檔 | "A style sheet contains rules for how elements are displayed on the screen." |
| `Separate content from presentation` | 將「內容」同「呈現外觀」分開處理 | "CSS separates content from presentation, so the appearance of all pages can be defined in a single place." |
| `Rule` | CSS 入面一條完整嘅「選擇器 + 屬性 + 值」指示 | "A CSS file consists of one or more rules; each rule starts with a selector and then applies style properties to it." |
| `Selector` | 指明邊啲 HTML 元素會被套用樣式嘅部分 | "A selector is the tag to be affected; it specifies the HTML element(s) to which the style properties are applied." |
| `Property` / `Value` | 屬性同值：描述標籤外觀嘅配對 | "A property and its value describe the appearance of that tag; note that there are no quotes on the values." |
| `Local (inline) style` | 行內樣式：經由 `style` 屬性，只影響單一標籤 | "Local styles are embedded within a single attribute and apply only to that tag." |
| `Global style` | 嵌入式樣式：`<style type="text/css">` 放喺 `<head>`，影響成個文檔 | "A global style is placed in the HTML `<head>`; changing a tag style there updates all those tags in the document." |
| `External style sheet` | 外部樣式表：獨立 `.css` 檔案，經 `<link>` 連結 | "External style sheets put all style information in a separate document that only contains style sheet rules." |
| `<link>` tag | 喺 `<head>` 連結外部資源（如 CSS）嘅標籤 | "The `<link>` tag is placed in the HTML `<head>` with `rel="stylesheet"` and `href="..."` to link an external style sheet." |
| `rel` attribute | 定義連結文檔與當前文檔嘅關係 | "The `rel` attribute defines the linked document's relationship with the current document, e.g. `rel="stylesheet"`." |
| `/* ... */` | CSS 單行／多行註解語法 | "CSS comments, which may be single-line or multi-line, are written by using `/* ... */`." |
| `Element selector` | 直接用標籤名命中所有嗰種元素 | "An element selector simply specifies a tag name, e.g. `p { color: blue; }`, matching every instance of that element type." |
| `Universal selector (*)` | 命中任何同所有元素嘅選擇器 | "The universal selector `*` applies to any and all elements; more specific selectors override general ones." |
| `Contextual selector` | 後代選擇器：按元素喺文檔樹入面嘅位置命中 | "A contextual selector such as `li em` matches emphasized text inside a list item; there is no comma between `li` and `em`." |
| `Class selector (.)` | 喺名稱前加 `.`，可命中多個共用 class 嘅元素 | "A class selector is written with a dot before the name, e.g. `.newstyle`, to specify different possible styles within a single document." |
| `ID selector (#)` | 喺名稱前加 `#`，只命中文檔內單一元素 | "An ID selector is written with `#` before the name; each ID should appear only once within an HTML document." |
| `Pseudo-class` | 用嚟表示元素特殊狀態（如連結狀態）嘅選擇器 | "Pseudo-classes such as `:link`, `:visited`, `:active` and `:hover` display links in different states differently." |
| `color` | 設定元素文字顏色嘅屬性 | "The `color` property sets the color of the element's text." |
| `background-color` | 設定元素背景顏色嘅屬性 | "The `background-color` property sets the color that will appear behind the element." |
| `background-image` | 設定元素背景圖片嘅屬性，值用 `url(...)` | "The `background-image` property sets the background image of an element, e.g. `background-image: url(bg.gif)`." |
| `Hex codes (#RRGGBB)` | 十六進制 RGB 顏色碼，由 `#000000` 到 `#FFFFFF` | "Hex codes are RGB values in base-16, ranging from `#000000` to `#FFFFFF`." |
| `font-family` | 指定字型（可列多個做 fallback） | "The `font-family` property specifies which font will be used; if the first font is not found, the next one is tried." |
| `Generic font names` | 通用字型類別：serif / sans-serif / cursive / fantasy / monospace | "Generic font names include serif, sans-serif, cursive, fantasy and monospace, which act as fallback categories." |
| `font-size` | 設定字型大小，單位有 `px`、`pt`、`em` | "The `font-size` property controls how large the letters are drawn, using units such as px, pt or em." |
| `pt` (point) | 點數單位，1 pt = 1/72 吋 | "One point is 1/72 of an inch onscreen." |
| `px` (pixel) | 像素單位，直接對應螢幕像素 | "`px` specifies a number of pixels on the screen." |
| `em` | 相對單位，1 em = 字型當前大小 | "`em` specifies a number of m-widths; 1 em is equal to the font's current size." |
| `font-style` | 開／關斜體 | "The `font-style` property is used to enable or disable italic style; setting it to `normal` turns it off." |
| `font-weight` | 開／關粗體 | "The `font-weight` property is used to enable or disable bold style; setting it to `normal` turns it off." |
| `text-align` | 文字水平對齊：left / right / center / justify | "The `text-align` property can be `left`, `right`, `center` or `justify`." |
| `justify` | 左右對齊，將完整行拉闊至佔滿元素寬度 | "`justify` widens all full lines of the element so that they occupy its entire width." |
| `line-height` | 控制文字基線之間嘅行距 | "The `line-height` property controls the spacing between baselines; negative values are not permitted." |
| `text-decoration` | 文字裝飾（底線等），效果可組合 | "The `text-decoration` property adds decorations such as underlining; effects can be combined, e.g. `overline underline`." |
| `text-indent` | 每段第一行縮排 | "The `text-indent` property indents the first line of each paragraph." |
| `Override` | 覆寫：衝突時後者或較特定規則取勝 | "When values disagree, the last one overrides any earlier ones, and more specific selectors override general ones." |
| `Inherited` | 繼承：子元素由父元素取得樣式 | "The style of an element is inherited from the parent of the enclosing element." |
| `Emmet` | 編輯器嘅程式碼快速展開工具 | "Emmet shortcuts expand abbreviations into full code, e.g. `fz` expands to `font-size:;`." |
| `Document tree` | HTML 元素嘅父子階層結構 | "A selector pattern is matched against all elements in the document tree." |

---

## 🗺️ 模組五：循序漸進學習路線（Learning Path）

**第一步：先理解什麼觀念（Understand）**

1. 先搞清楚「HTML = 內容、CSS = 外觀」嘅分工，再記住 CSS 嘅完整定義同兩大優勢（內容與呈現分離、單一位置定義全站外觀）。
2. 理解 HTML 嘅限制（外觀標籤愈嚟愈多、內容與外觀纏埋、瀏覽器顯示不一），先明白 CSS 點解存在。
3. 理解「Cascading」嘅含義：樣式由父傳子、多份樣式表層層疊加，衝突時「後者／較特定者」勝出。
4. 理解三種加入樣式方法嘅層級：Local（單一標籤）→ Global（成個文檔）→ External（成個網站），以及各自優缺點。
5. 理解四類選擇器點運作：element（所有實例）、contextual（位置條件，無逗號）、class（`.` 可重用）、ID（`#` 唯一一次）。

**第二步：背誦什麼英文短語（Memorise）**

- 定義句：「CSS describes the appearance, layout and presentation of information on a web page, as opposed to HTML, which describes the content of the page.」
- 優點句：「CSS separates content from presentation and defines the appearance and layout of all pages in a single place.」
- Cascade 句：「A hierarchy of style information may be specified; the style of an element is inherited from its parent.」
- 覆寫句：「When values disagree, the last one overrides any earlier ones; more specific selectors override general ones.」
- 選擇器句：「Class selectors start with a dot `.`; ID selectors start with `#` and should appear only once in a document.」
- 模組四表格入面每一行嘅「考試標準英文句型」——逐條背熟。

**第三步：掌握什麼寫法／實作（Practice）**

- 用手寫／打字器寫一條完整 CSS rule：`selector { property: value; property2: value2; }`，記住值唔加引號、配對之間要分號。
- 實作三種加入樣式嘅 HTML：`style="..."` 屬性、`<head>` 入面 `<style type="text/css">`、`<head>` 入面 `<link rel="stylesheet" type="text/css" href="...">`，再加 `/* ... */` 註解。
- 用 CSS 重寫以下每個例子一次，直至唔使睇答案：element/multiple/universal selector、`li em` contextual selector、`.newstyle` class selector、`#red_text` ID selector、`a:link/visited/hover/active`。
- 試用 `color`（名稱同 hex 碼）、`background-color`、`background-image: url(...)`、`font-family`（多字型 fallback）、`font-size`（pt/px/em）、`font-weight`、`font-style`、`text-align`（含 justify）、`line-height: 200%`、`text-decoration`（含移除連結底線）各寫一行有效 CSS。
- 打開 VS Code 試打 Emmet 捷徑（`fz`、`bgc`、`ff`、`td`……），睇吓展開出嚟係咪同教材一致。

**第四步：能解答什麼英文考題（Answer）**

完成三步之後，你應該有能力用標準英文答到以下題型：

- 「What is CSS and what are its advantages?」→ 引用定義句 + 兩大優勢句。
- 「Why was CSS introduced? / What are the limitations of HTML?」→ 引用 HTML 限制句。
- 「Explain the meaning of 'Cascading' in CSS.」→ 引用 hierarchy + inherited 句。
- 「Write the CSS syntax and explain each part.」→ 寫 `selector { property: value; }` 並逐部分解說。
- 「What is the difference between local, global and external styles?」→ 用影響範圍＋優缺點對比答。
- 「Write a rule to make all *emphasized* text inside list items green.」→ 寫 `li em { color: green; }` 並強調無逗號。
- 「What is the difference between a class selector and an ID selector?」→ `.` vs `#`＋重用 vs 唯一一次。
- 「How do you remove the underline from hyperlinks?」→ `a:link, a:visited, a:active { text-decoration: none; }`。
- 「What does 'override' mean in the cascade?」→ last one overrides earlier ones; more specific overrides general ones。

---

## 🎒 模組六：考前 5 分鐘雙語懶人包（Cheat Sheet）

### 6.1 一句記住 CSS（One-line Memory）

> CSS = **C**ascading **S**tyle **S**heets → **describes HOW to display**, HTML → **describes WHAT is displayed**.（CSS 講「點樣顯示」，HTML 講「顯示咩」。）

### 6.2 三種加入樣式方法對照表（Ways to Add Styles）

| 方法 | 寫法 | 影響範圍 | 關鍵記憶點 |
|------|------|----------|-----------|
| Local（行內） | `<p style="font-size: 20pt">` | 單一標籤 | 散落文檔、難維護；少量標記時方便 |
| Global（嵌入） | `<head>` 內 `<style type="text/css"> h1 { ... } </style>` | 成個文檔 | 一改全頁嗰種標籤即更新；HTML 更乾淨 |
| External（外部） | `<head>` 內 `<link rel="stylesheet" type="text/css" href="mystyle.css">` | 全網站所有連結頁 | 內容與格式完全分離；多頁網站最易維護 |

### 6.3 CSS Rule 語法解剖（Rule Anatomy）

```
selector { property: value; property2: value2; }
   ↑          ↑        ↑
揀邊啲元素    改咩外觀   改成點（值唔加引號）
```
口訣：**S-P-V**（Selector → Property → Value）；配對之間分號 **不可省**，最後一對分號**可省**；colon/semicolon 後空格可有可無。

### 6.4 選擇器極速對照表（Selector Cheat Table）

| 選擇器 | 寫法 | 命中對象 | 口訣 |
|--------|------|----------|------|
| Element | `p { }` | 所有 `<p>` | 直接寫 tag |
| Multiple | `em, i { }` | `<em>` 同 `<i>` | 逗號分隔、同組規則 |
| Universal | `* { }` | 所有元素 | 星號＝全部 |
| Contextual | `li em { }` | 喺 `<li>` 內嘅 `<em>` | **無逗號**＝內層 |
| Class | `.newstyle { }` | 任何 `class="newstyle"` | 一點 `.`＝可重用 |
| Class + tag | `h1.newstyle { }` | `class="newstyle"` 嘅 `<h1>` | 無空格連寫 |
| ID | `#red_text { }` | `id="red_text"`（全頁唯一） | 井號 `#`＝獨一無二 |
| Pseudo-class | `a:hover { }` | 處於 hover 狀態嘅連結 | 冒號＝狀態 |

### 6.5 顏色口訣（Color Memory）

- 16 個基本色名：**A-B-F-G-L-M-N-O-P-R-S-T-W-Y** 亂序記法——「Aqua Black Fuchsia / Gray Green Lime / Maroon Navy Olive / Purple Red Silver / Teal White Yellow」。
- Hex 碼：`#RRGGBB`，base-16；`#000000` = 黑（zero = 冇光），`#FFFFFF` = 白（all FF = 全光）。兩組相同可簡寫，例如 `#FF00FF` = fuchsia 洋紅。

### 6.6 字型與文字屬性口訣（Font & Text Memory）

- **四字型屬性**：Family（用咩字）、Size（幾大）、Style（斜唔斜）、Weight（粗唔粗）——記 **F-S-S-W**。
- **Font-size 三單位**：`pt` = 1/72 吋（Point）；`px` = 像素（Pixel）；`em` = 相對當前字型（m-width）——**「Point 印、Pixel 幕、em 相對」**。
- **Vague sizes**：`xx-small → x-large` 中間一定有 `medium`：`xx-small, x-small, small, medium, large, x-large, xx-large`。
- **Text-align 四值**：Left / Right / Center / **Justify**（拉闊到佔滿全行）。
- **Text-decoration 三寶**：underline（底線）、overline（頂線）、line-through（刪除線），可組合；`none` 用嚟移除連結底線。
- **Line-height**：數字＝字型大小 × 數字；百分比相對字型大小；**負數唔准**；`200%` = 雙倍行距。

### 6.7 覆寫次序口訣（Cascade Order Memory）

> 「**後者勝前者，特定勝一般**（The last one overrides earlier ones; more specific selectors override general ones.）」
> Specificity 粗略記憶：**ID（`#`）＞ Class（`.`）＞ Element（tag）＞ Universal（`*`）**。

### 6.8 Emmet 極速記憶（Emmet Mini-Memory）

| 縮寫 | 展開 | 縮寫 | 展開 |
|------|------|------|------|
| `fz` | `font-size` | `bgc` | `background-color:#fff` |
| `ff` | `font-family` | `bgi` | `background-image:url()` |
| `fw` | `font-weight` | `ta` | `text-align:left` |
| `fs` | `font-style:italic` | `lh` | `line-height` |
| `c` | `color:#000` | `td` | `text-decoration:none` |

口訣：**屬性名嘅首字母縮寫**（fz/ff/fw/fs/ta/lh/td/c）；背景開頭用 `bg`（background）再加 `c`olor 或 `i`mage。

### 6.9 考前最後 30 秒（Last 30 Seconds）

1. CSS 定義 = 瀏覽器用嚟 redefines HTML 元素屬性嘅 style sheet document；describe **how**, not **what**。
2. 三種加入方法：Local（attribute）→ Global（`<style>` in head）→ External（`<link rel="stylesheet">`）。
3. Rule 結構：`selector { property: value; }`——值無引號、pair 之間要分號。
4. Cascade 兩條鐵律：last overrides earlier；specific overrides general。
5. Class = `.` 可重用；ID = `#` 全頁唯一一次；`li em` 無逗號；`a:link/visited/hover/active` 四狀態。
6. 常用屬性：`color`、`background-color/image`、`font-family/size/style/weight`、`text-align/decoration/indent`、`line-height`（負數不准）。
