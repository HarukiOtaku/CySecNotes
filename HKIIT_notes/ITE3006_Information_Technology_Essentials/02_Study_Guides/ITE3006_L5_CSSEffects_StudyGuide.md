# ITE3006 Topic 5: CSS Effects — 雙語應考學習指南（Bilingual & Exam-Ready Study Guide）

> 本指南根據課堂教材 Topic 5「CSS Effects」重寫，適用對象為大專資訊科技（ITE3006）學生。全部機制解說以香港繁體中文撰寫；所有核心定義、HTML 標籤作用、CSS 屬性與考試答題重點均緊隨標準英文定義句（English Standard Definitions）。HTML、CSS 程式碼一律保留英文原文，專有名詞（tags、properties、browser 等）不作生硬翻譯。

---

## 📝 模組一：課程概要與實務情境（Summary & Real-world Context）

### 課程概要

Topic 4 教你「用 CSS 設定元素外觀」嘅基本語法，而 Topic 5「CSS Effects」就係將呢啲技巧推向**視覺效果（visual effects）**嘅層次：點樣幫元素畫邊框（border）、加圓角（border-radius）、控制內部與外部的空間（padding、margin）、決定每個元素喺頁面上以咩「身份」出現（display: block / inline / inline-block / none）、當內容超出容器時點處理（overflow），以至 CSS3 帶嚟嘅陰影（text-shadow、box-shadow）、透明度（opacity）、2D 變形（transform：translate、rotate、scale、skew）同平滑過渡動畫（transition）。教材開頭亦交代 CSS3 嘅本質：佢係 CSS 嘅**新版本**，與舊版**向後相容（backward-compatible）**，而且被拆分成**模組（modules）**管理；唔同瀏覽器仲有自己嘅**前綴（browser prefixes）**（`-moz-`、`-webkit-`、`-o-`、`-ms-`）去支援新屬性。

呢一課嘅學習主線，係先掌握「樣式應該掛喺邊類 HTML 元素」——即區分區塊用嘅 `<div>` 同內嵌用嘅 `<span>`、以及 block element 與 inline element 嘅行為差異；然後進入**Box Model（盒模型）**——理解瀏覽器眼中每一個元素都係一個長方形盒仔，由 content（內容）向內外擴展 padding（內距）、border（邊框）同 margin（外距）；最後先至輪到各種「特效」。考生只要跟住「盒模型 → display/overflow → 特效」呢條脈絡溫習，就會發現全部內容其實係一條有邏輯嘅鏈。

### 實務情境一：寫一個「圓角 + 陰影」嘅卡片式登入頁

假想你幫公司整一個現代風格嘅登入頁：白色卡片、圓角（`border-radius: 25px;`）、柔和陰影（`box-shadow`）、按鈕 hover 時顏色平滑變化（`transition`）。冇 CSS3 之前，圓角要用背景圖片「扮」出嚟，陰影要另外做圖層，hover 效果更加要寫 JavaScript 定時器慢慢改顏色。用 CSS3，你只需要幾行 CSS 就完成：`border-radius` 直接將四隻角變圓、`box-shadow` 一行加陰影、`transition: background 0.5s;` 令 hover 變化自動平滑過渡。呢個正正示範教材所講 CSS3「supports more appealing visual effects on a web page（令網頁支援更吸引嘅視覺效果）」，而且因為 CSS3 係 backward-compatible，舊瀏覽器即使唔支援新效果都唔會令頁面壞掉。

### 實務情境二：用「透明浮水印」保護公司圖片

網頁上展示產品圖片前，開發員經常要加半透明「版權浮水印」或將背景圖片淡化，等文字更容易閱讀。若果你用圖片編輯軟件逐張相改透明度，又慢又難維護；但用 CSS 一行 `img { opacity: 0.4; }`，就可以即時將**所有**圖片設為 40% 不透明度（透明度值介乎 0.0–1.0），仲可以配合 `div:hover` 令圖片喺滑鼠移過時變返清晰。呢個情境帶出成課嘅核心思維：CSS 嘅威力在於「喺單一位置定義視覺規則，一次過套用到所有相關元素」，而你只需要識得揀啱 HTML 元素（`<div>`／`<span>`）同寫啱 CSS 屬性。

---

## 🎯 模組二：考試學習目標（Learning Objectives）

完成本課題後，你應該有能力做到以下各點（考官會直接或間接測試嘅核心能力）：

- **講解 CSS3 嘅本質同相容性**：Explain what CSS3 is — CSS3 is the new version of CSS that supports more appealing visual effects on a web page, and it is backward-compatible, meaning browsers will always continue to support CSS2 in addition to CSS3.
- **舉出 CSS3 嘅視覺效果模組**：State that CSS3 has been split into "modules", e.g. Backgrounds and Borders, 2D/3D Transformations, and Animations.
- **背熟瀏覽器前綴（browser prefixes）**：Name the browser prefix for each vendor — `-moz-` for Mozilla Firefox, `-webkit-` for Safari and Google Chrome, `-o-` for Opera, and `-ms-` for Microsoft Internet Explorer.
- **區分 `<div>` 同 `<span>` 嘅用途**：Explain that `<div>` is used for controlling the format or behavior of blocks of text, while `<span>` is used for inline format changes; `<div>` is a block element and `<span>` is an inline element.
- **分辨 block element 與 inline element**：Distinguish block elements（occupy the entire width of the browser and start on a new line）from inline elements（fit into the regular flow of text and wrap automatically at the end of a line），並列舉例子（`<div>`、`<p>`、`<form>`、`<h1>`、`<ul>` vs `<span>`、`<a>`、`<input>`、`<img>`）。
- **解釋 Box Model 嘅組成**：Describe the box model — it describes the way an HTML element has border, padding, and margin around its content.
- **寫出 border 嘅長寫法與短寫法**：Write `border-width`、`border-style`、`border-color` 長寫法，並用 shorthand `border: 5px dotted blue;` 濃縮，同時講解「必須指定 width、style、color 三樣」。
- **運用 border-radius 造圓角**：Apply `border-radius`（單值與四值寫法）去將盒仔四角變圓。
- **寫出 padding 與 margin 嘅長、短寫法**：Write the long form（`padding-top`／`padding-right`／`padding-bottom`／`padding-left`、`margin-top` 等）and the shorthand `padding: 10px 15px 10px 20px;`／`margin: 40px 30px 20px 5px;`，並講解四值順序（top、right、bottom、left）。
- **掌握 1／2／3／4 值縮寫規則**：Interpret shorthand values — one value sets all four sides, two values set top/bottom and right/left, three values set top, left/right and bottom, four values set top, right, bottom and left.
- **運用 display 屬性控制盒仔行為**：Use `display` with the values `block`、`inline`、`inline-block` and `none`，並解釋每個值嘅行為。
- **運用 overflow 處理溢出內容**：Use `overflow` with the values `visible`（default）、`hidden`、`scroll` and `auto` when content cannot fit inside a fixed-size box.
- **寫出 text-shadow 同 box-shadow**：Construct `text-shadow` and `box-shadow` with x-offset, y-offset, blur radius and color.
- **運用 opacity 控制透明度**：Apply `opacity` with a value from 0.0 to 1.0 — the lower the value, the more transparent the element.
- **運用 2D transforms**：Apply `transform` methods — `translate()`／`translateX()`、`rotate()`、`scale()`／`scaleX()`／`scaleY()`、`skew()`／`skewX()`／`skewY()` — 並解釋每個方法對元素做咗咩。
- **寫出 transition 效果**：Create a CSS3 transition by specifying the CSS property to be changed and the duration of the effect（如 `transition: width 2s;` 配合 `:hover`）。
- **識別 `:hover` pseudo-class 嘅作用**：Explain that `:hover` applies styles when the mouse is over an element（mouse over）。

---

## 📖 模組三：雙語深度理論知識點（Comprehensive Notes）

### 3.1 CSS3 概覽：新版本、向後相容、模組化

CSS3 係 CSS 嘅**新版本（the new version of CSS）**。佢喺原有 CSS2 嘅基礎上加入更多功能，令網頁可以呈現更吸引嘅視覺效果（more appealing visual effects）。最重要嘅一點係：CSS3 係**向後相容（backward-compatible）**嘅——即係話瀏覽器會**永遠**繼續支援 CSS2，CSS3 只係喺上面「加嘢」，而唔係推翻舊嘢；所以就算瀏覽器未完全支援某啲 CSS3 新功能，你之前寫落嘅 CSS2 樣式依然有效。

> "CSS3 is the new version of CSS, and it supports more appealing visual effects on a web page."
> "CSS3 is backward-compatible, i.e. web browsers will always continue to support CSS2 in addition to CSS3."

CSS3 另一個設計特點係**模組化（split into "modules"）**：CSS3 唔係一份巨無霸規格，而係拆分成多個獨立模組，每個模組負責一類功能，瀏覽器可以逐步實作。同本課視覺效果相關嘅模組包括：

> "CSS3 has been split into 'modules'. Some of the CSS modules related to visual effects include: Backgrounds and Borders, 2D/3D Transformations, Animations."

#### 3.1.1 CSS3 瀏覽器前綴（Browser Prefixes）

唔同瀏覽器對 CSS3 新屬性可能用**自己內建嘅寫法（built-in notation）**——即係喺屬性名前面加一段前綴（prefix），等瀏覽器認得呢個係「畀我嘅實驗性版本」。教材列出四大前綴及對應瀏覽器：

| 前綴（Prefix） | 對應瀏覽器（Browser） |
|----------------|------------------------|
| `-moz-` | Mozilla Firefox（Mozilla 系） |
| `-webkit-` | Safari（Apple Mac）同 Google Chrome |
| `-o-` | Opera |
| `-ms-` | Microsoft Internet Explorer |

> "Different browsers may have built-in notation for CSS3 properties. `-moz-` for Mozilla-based Firefox browser; `-webkit-` for Safari (Apple Mac) and Google Chrome browsers; `-o-` for Opera browser; `-ms-` for Microsoft Explorer."

**📌 考試重點**：考官好鍾意出「邊個前綴屬於邊個瀏覽器」嘅配對題，亦會考「CSS3 點解要前綴」——因為唔同瀏覽器對 CSS3 新屬性各有唔同嘅實驗性實作記號。記法：**Mozilla 諗 M（-moz-）、Safari/Chrome 諗 WebKit（-webkit-）、Opera 諗 O、IE 諗 Microsoft（-ms-）**。

---

### 3.2 用嚟套用樣式嘅 HTML 元素：`<div>` 同 `<span>`

喺開始講 CSS 特效之前，首先要認識兩個「載體」元素：`<div>` 同 `<span>`。呢兩個 HTML 元素嘅**本職用途就係盛載 CSS 資訊（to hold CSS information）**——佢哋本身唔帶任何語義或預設外觀，純粹係畀你「掛」樣式嘅容器。

> "<div> and <span> are HTML elements whose usual purpose is to hold CSS information."

分工方法如下：

- `<div>`（division，區塊）：用嚟控制**成塊文字（blocks of text）**嘅格式或行為——例如將成段內容設為藍色、加背景、控制排版。
- `<span>`（跨距/內嵌）：用嚟做**內嵌式（inline）**嘅格式修改——例如喺一個段落入面只將某幾個字變紅色。

> "<div> is used for controlling the format or behavior of blocks of text. <span> is used for inline format changes."

兩者嘅本質區別：`<div>` 係 **block element**，`<span>` 係 **inline element**（詳見 3.3）。

> "<div> is a 'block' element while <span> is an 'inline' element."

#### 3.2.1 實際例子（教材 SLIDE 5）

```html
<!-- div：控制「一整塊」內容嘅樣式 -->
<div style="color: blue">
  <h1>My Heading</h1>
  Just some blue text. Just some blue text.
  Just some blue text. Just some blue text.
  Just some blue text. Just some blue text.
  Just some blue text. Just some blue text.
</div>

<!-- span：只喺段落中間局部改樣式，唔會打斷文字流 -->
<p>Just some <span style="color: red">red text.</span> to make highlights.</p>
```

上例示範咗兩件事：用 `<div>` 將標題連同幾行文字一次過變成藍色（影響成塊內容）；用 `<span>` 喺 `<p>` 入面只將 `red text.` 呢幾個字變成紅色做 highlight——文字依然喺同一行流動，冇被截斷。呢個正正係 block 與 inline 行為差異嘅直觀示範。

---

### 3.3 Block Elements vs Inline Elements

瀏覽器將頁面上每個元素分成兩大類「性格」：block（區塊）與 inline（內嵌）。呢個分類決定咗元素喺頁面上點樣佔位同排列。

**Block Element（區塊元素）**：佔據瀏覽器視窗嘅**成條寬度（entire width）**，而且會令下一個元素**由新一行開始（start on a new line）**——即係 block 元素之間係「上下排」嘅。

> "Block elements occupy the entire width of the browser and cause the next element to start on a new line."

常見 block 元素例子：`<div>`、`<p>`、`<form>`、`<h1>`、`<ul>` 等。

**Inline Element（內嵌元素）**：嵌喺頁面文字嘅**正常流動（regular flow of text）**入面——即係跟住前後文字喺同一行出現；當去到行尾，佢會**自動換行（automatically wrap）**，而唔會強迫下一元素開新行。

> "Inline elements fit into the regular flow of text on the web page and will automatically wrap when they reach the end of a line."

常見 inline 元素例子：`<span>`、`<a>`、`<input>`、`<img>` 等。

| 比較 | Block Element | Inline Element |
|------|---------------|----------------|
| 寬度 | 佔據瀏覽器成條寬度 | 只佔內容所需寬度 |
| 換行 | 令下一個元素開新行 | 跟文字流同一行，行尾自動 wrap |
| 例子 | `<div>`、`<p>`、`<form>`、`<h1>`、`<ul>` | `<span>`、`<a>`、`<input>`、`<img>` |

**📌 考試重點**：問「邊啲係 block element / inline element」會用**列舉題**考你，一定要背熟上面兩組例子；解釋題則要講出「佔全寬、開新行」vs「跟文字流、自動 wrap」呢兩句定義。

---

### 3.4 Box Model（盒模型）

Box Model 係成個 CSS 佈局嘅基石。佢嘅作用係**設定 HTML 元素嘅外觀同網頁嘅排版（set the appearance of HTML elements and the layout of a web page）**。概念好簡單：瀏覽器眼中嘅**每一個元素都係一個長方形盒仔**，而盒模型就係描述呢個盒仔點樣由內至外包含四層嘢——**content（內容）**、**padding（內距）**、**border（邊框）**、**margin（外距）**。

> "The box model can be used to set the appearance of HTML elements and the layout of a web page."
> "The box model describes the way that an HTML element has border, padding, and margin."

結構由內到外：

1. **Content（內容）**：盒仔最入面，文字、圖片真正佔據嘅區域。
2. **Padding（內距）**：包住 content 嘅空間——content 同 border 之間嘅距離。
3. **Border（邊框）**：包住 padding 同 content 嘅框線——盒仔嘅「外殼」。
4. **Margin（外距）**：最外層——border 以外、同其他元素隔開嘅透明空間。

> "Borders of a box model enclose an HTML element."（邊框包圍元素）

以下 3.5–3.8 會逐層講解點樣用 CSS 控制呢四部分。

---

### 3.5 Border（邊框）

**Border** 包圍住元素（同時包住 content 同 padding）。設定 border 時，你**必須（need to）**同時指定三樣嘢：**寬度（width）**、**樣式（style）**同**顏色（color）**——少咗 style 嘅話，即使有 width 同 color，瀏覽器預設都唔會畫出嚟。

> "With borders, you need to specify a width, a style, and a color."

**長寫法（Long Form）**：逐個屬性分開寫。

```css
div {
  border-width: 5px;
  border-style: dotted;
  border-color: blue;
}
```

**短寫法（Short Form）**：用一個 `border` 屬性，將三樣濃縮喺一行，順序係 **width style color**。

```css
div {
  border: 5px dotted blue;
}
```

**📌 考試重點**：短寫法 `border: <width> <style> <color>;` 嘅三件套順序要背熟；style 常用值包括 `dotted`（點線）、`solid`（實線）、`dashed`（虛線）等，教材例子用過 `dotted`、`solid`、`dashed`。

---

### 3.6 Border Radius（圓角）

CSS3 嘅 `border-radius` 屬性用嚟將盒仔嘅角由直角變成**圓角（rounded corners）**。教材例子（SLIDE 8）有三個 id：`#b1`（紅色實線圓角盒）、`#b2`（綠色實線圓角盒，並有背景圖片重複鋪滿）、`#b3`（藍色虛線盒，四個角各自唔同嘅圓角半徑）。

```css
#b1 {
  border-radius: 25px;
  border: 2px solid red;
  padding: 20px;
  width: 200px;
  height: 150px;
}

#b2 {
  border-radius: 25px;
  border: 2px solid green;
  padding: 20px;
  width: 200px;
  height: 150px;
  background: url(paper.gif);   /* 背景圖片 */
  background-repeat: repeat;    /* 圖片重複鋪滿成個盒 */
}

#b3 {
  border-radius: 15px 60px 30px 0px;  /* 四角各自唔同 */
  border: 2px dashed blue;
  padding: 20px;
  width: 200px;
  height: 150px;
}
```

解讀：

- 單一值 `border-radius: 25px;`：**四隻角都係** 25px 圓角半徑。
- 四值寫法 `border-radius: 15px 60px 30px 0px;`：順序由**左上角開始順時針**——top-left = 15px、top-right = 60px、bottom-right = 30px、bottom-left = 0px（0px 即直角）。所以 `#b3` 嘅四角由圓到直角依次係：右上（60px）最圓、右下（30px）較圓、左上（15px）微圓、左下（0px）直角，形成不對稱圓角盒。

> "The `border-radius` property allows you to round the corners of an element's border; a single value applies to all four corners, while four values set top-left, top-right, bottom-right and bottom-left respectively (clockwise from the top-left)."

（上句為標準定義嘅整理：教材以例子示範單值與四值寫法，並展示 `border-radius` 可配合 `border`、`padding`、`background` 一齊用。）

**📌 考試重點**：四值順序考法——記「**由左上順時針**」（top-left → top-right → bottom-right → bottom-left），同 padding/margin 嘅「由頂開始順時針」（top → right → bottom → left）唔好混淆。

---

### 3.7 Padding（內距）

**Padding** 係包住 **content 區域（wraps around the content area）** 嘅空間——即係 content 同 border 之間嘅「透氣位」。你可以用 CSS 分別指定 content 上方、下方、左方、右方各要幾多 padding。

> "Padding wraps around the content area. You can specify with CSS how much padding you want around the top, bottom, left and right sides of the content."

**長寫法（Long Form）**：

```css
div {
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 10px;
  padding-left: 20px;
}
```

**短寫法（Short Form）**：順序係 **top → right → bottom → left（由頂開始順時針）**：

```css
div {
  padding: 10px 15px 10px 20px;
}
```

即 top = 10px、right = 15px、bottom = 10px、left = 20px（上例上下對稱 10px，左右分別 15px／20px）。

---

### 3.8 Margin（外距）

**Margin** 嘅設定方法**同 padding 一模一樣（exactly like padding）**，只係佢控制嘅係 border 以外、盒仔與盒仔之間嘅空間。

> "The way to set margin is exactly like padding."

**長寫法（Long Form）**：

```css
div {
  margin-top: 40px;
  margin-right: 30px;
  margin-bottom: 20px;
  margin-left: 5px;
}
```

**短寫法（Short Form）**：同樣係 **top → right → bottom → left**：

```css
div {
  margin: 40px 30px 20px 5px;
}
```

即 top = 40px、right = 30px、bottom = 20px、left = 5px。

---

### 3.9 Box Model 四邊縮寫規則（1／2／3／4 個值）

`padding` 同 `margin` 嘅短寫法可以寫 1、2、3 或 4 個值，每個數量代表嘅意思唔同（教材 SLIDE 11 用 margin 示範，並明確話「**呢套方法同樣適用於 padding（The same method of setting applies to 'padding'）**」）：

```css
/* 1 個值：四邊全部都係 1px */
div { margin: 1px; }

/* 2 個值：top & bottom = 1px，right & left = 2px */
div { margin: 1px 2px; }

/* 3 個值：top = 1px，left & right = 2px，bottom = 3px */
div { margin: 1px 2px 3px; }

/* 4 個值：top = 1px，right = 2px，bottom = 3px，left = 4px */
div { margin: 1px 2px 3px 4px; }
```

規則總結（四個位置永遠係 **top、right、bottom、left**，由頂開始順時針）：

| 值數量 | 寫法 | 意思 |
|--------|------|------|
| 1 個值 | `margin: 1px;` | 四邊全部 = 1px |
| 2 個值 | `margin: 1px 2px;` | top & bottom = 1px；right & left = 2px |
| 3 個值 | `margin: 1px 2px 3px;` | top = 1px；right & left = 2px；bottom = 3px |
| 4 個值 | `margin: 1px 2px 3px 4px;` | top = 1px；right = 2px；bottom = 3px；left = 4px |

**📌 考試重點**：考官最愛考「`margin: 10px 20px;` 即係點？」——記口訣：**「一值四邊、二值上下+左右、三值上+左右+下、四值由頂順時針」**。凡見 shorthand 縮寫題，第一時間喺草稿寫低 top / right / bottom / left 四個位再對號入座。

---

### 3.10 display Property（顯示屬性）

根據 Box Model，**每一個元素都係一個長方形盒仔（rectangular box）**。咁點解 `<div>` 同 `<span>` 喺頁面上行為差咁遠？就係因為 CSS 嘅 **`display` 屬性**——佢決定咗**個盒仔點樣表現（how that box behaves）**。透過 `display`，你可以將任何元素「變身」做唔同性格。

> "Every element is a rectangular box according to the box model. The 'display' property in CSS determines how that box behaves."

教材列出四個常用值（SLIDE 12 用一個 div 規則示範四個可能性）：

```css
div {
  display: block;          /* Make elements like <div> block（令元素好似 <div> 咁做 block）*/
  display: inline;         /* Default of all elements（教材註解：所有元素嘅預設）*/
  display: inline-block;   /* A block sitting on a line（坐喺一行上面嘅 block）*/
  display: none;           /* Hide（隱藏）*/
}
```

> "`display` values: `block` — make elements like `<div>` block; `inline` — default of all elements (per the lecture notes); `inline-block` — a block sitting on a line; `none` — hide."

逐個值解讀：

- **`display: block;`**：強制元素變 block——佔全寬、開新行。例如令 `<span>` 或 `<a>` 表現得似 `<div>`。
- **`display: inline;`**：元素變 inline——跟文字流排喺同一行。（教材註解標示為所有元素嘅 default；實際瀏覽器上，`<div>`、`<p>`、`<h1>` 等之所以開新行，係因為瀏覽器內建樣式將佢哋設定為 block，而 `display` 嘅 initial value 係 inline。）
- **`display: inline-block;`**：**「坐喺一行上面嘅 block」**——同時擁有兩邊好處：可以設定 width／height／padding／margin（block 嘅能力），但又好似 inline 咁同其他內容並排喺同一行。
- **`display: none;`**：**隱藏（Hide）**——元素完全唔顯示，亦唔佔任何版面空間（同 `visibility: hidden` 只係睇唔到但仲佔位有分別，教材此處只講 `none`）。

**📌 考試重點**：解釋題最鍾意問「inline-block 同 block／inline 有咩分別」——標準答案就係教材嗰句 **"A block sitting on a line"**；另外 `display: none` = 完全隱藏兼唔佔空間，要識得講 "Hide"。

---

### 3.11 overflow Property（溢出處理）

當你為一個盒仔設定咗**固定嘅高度或寬度（a specific height or width）**，但盒入面嘅內容**根本放唔落（cannot fit）**嗰陣，內容就會溢出（overflow）盒仔邊界。CSS 嘅 `overflow` 屬性就係用嚟指定**你希望內容點樣被處理（how you would like the content to be handled）**。

> "When you set a specific height or width on a box, and the content inside cannot fit, that is where the CSS overflow property comes in, allowing you to specify how you would like the content to be handled."

`overflow` 有四個值：

| 值 | 行為 |
|----|------|
| `visible`（**預設 default**） | 內容溢出部分照樣顯示喺盒外，唔會被剪走 |
| `hidden` | 溢出嘅內容被剪走（隱藏），睇唔到 |
| `scroll` | 加滾動條（scroll bar），內容可以碌嚟睇 |
| `auto` | 由瀏覽器決定——有需要先至加滾動條 |

> "There are four values for the overflow property: `overflow: visible` (default), `overflow: hidden`, `overflow: scroll`, `overflow: auto`."

**📌 考試重點**：最易考「邊個係 default？」——答案係 **`visible`**。另外要識得配情境：想截走多餘內容用 `hidden`；想保證一定有得碌用 `scroll`；想「有需要先碌」用 `auto`。

---

### 3.12 CSS3 Shadow Effects（陰影效果）

CSS3 帶嚟兩款陰影效果：加喺**文字**上面嘅 **`text-shadow`**，同加喺**元素/盒仔**上面嘅 **`box-shadow`**。

> "With CSS3 we can add shadow to text and to elements: `text-shadow` and `box-shadow`."

兩個屬性嘅寫法結構一樣，都包含四個組成部分：

1. **x-offset（水平偏移）**：陰影向右（正值）或向左（負值）偏移幾多。
2. **y-offset（垂直偏移）**：陰影向下（正值）或向上（負值）偏移幾多。
3. **blur radius（模糊半徑）**：陰影邊緣擴散/模糊幾多；越大越朦。
4. **color（顏色）**：陰影嘅顏色。

> "The `text-shadow` and `box-shadow` example showing x-offset, y-offset, blur radius and color."（教材 SLIDE 15：例子示範 x-offset、y-offset、blur radius 同 color 四個參數。）

通用寫法示範（兩個屬性結構一致，只係前者套用於文字、後者套用於成個盒）：

```css
h1 {
  /* x-offset 2px, y-offset 2px, blur 5px, 顏色 gray */
  text-shadow: 2px 2px 5px gray;
}

div {
  box-shadow: 2px 2px 5px gray;
}
```

**📌 考試重點**：考概念題時要識得講「陰影由 x-offset、y-offset、blur radius 同 color 四個參數組成」；考區分題時記住 **text-shadow 用喺文字、box-shadow 用喺元素盒仔**。

---

### 3.13 Opacity Property（透明度）

CSS3 控制透明度嘅屬性係 **`opacity`**。佢接受 **0.0 至 1.0** 之間嘅數值；數值**越低越透明（the lower the value, the more transparent）**——0.0 完全透明（睇唔到）、1.0 完全不透明（正常實色）。

> "The CSS3 property for transparency is `opacity`. The opacity property can take a value from 0.0 - 1.0. The lower value, the more transparent."

教材例子：將所有 `img` 圖片設為 0.4 透明度（即 40% 不透明、60% 透明）：

```css
img {
  opacity: 0.4;
}
```

**📌 考試重點**：記住 **0.0–1.0** 呢個數值範圍同「lower value = more transparent」呢句因果句——考官會反轉問你「想元素更透明應該加大定減細 opacity 值？」（答案：減細，例如由 0.8 改做 0.4）。

---

### 3.14 2D Transform（變形）概覽 + `translate`

**Transformation（變形）** 係一種效果，令元素可以**改變形狀、大小同位置（change shape, size and position）**。CSS3 提供多個 2D transform 方法，全部透過 **`transform`** 屬性套用。

> "A transformation is an effect that lets an element change shape, size and position."

#### translate()：移動位置

**`translate()`** 方法根據你畀嘅 **X 軸（水平）同 Y 軸（垂直）參數**，將元素由**佢現時嘅位置（its current position）**移動——注意係「相對現位移動」，而唔係重新定位。

> "The translate() method moves an element from its current position (according to the parameters given for the X-axis and the Y-axis)."

```css
/* 向右移 30px、向下移 45px */
div { transform: translate(30px, 45px); }

div:hover {
  /* 滑鼠移過時，只喺 X 方向（水平）移動 30px */
  transform: translateX(30px);
}
```

上例仲示範咗 **`:hover`** pseudo-class（「滑鼠指住嗰陣」，即 mouse over）嘅用法：平時元素原位，一 hover 就水平平移 30px。若果只想單一方向移動，可以用 `translateX()`（只移 X 軸）或 `translateY()`（只移 Y 軸）。

> "`div:hover` — mouse over（滑鼠移過元素上方時套用嘅樣式）."

```css
/* 只喺 Y 方向（垂直）移動 */
div { transform: translateY(45px); }
```

---

### 3.15 2D Transform：`rotate()`（旋轉）

**`rotate()`** 方法根據你畀嘅**度數（degree）**將元素順時針（clockwise）或逆時針（counter-clockwise）旋轉。**正數 = 順時針，負數 = 逆時針**。

> "The rotate method rotates an element clockwise or counter-clockwise according to a given degree."

教材完整例子（SLIDE 18）——一個黃色底、黑色實線邊嘅 div，加兩個變體 `#r1`（淺綠，轉 5 度）同 `#r2`（淺藍，轉 -20 度）：

```css
div {
  width: 300px;
  height: 100px;
  background-color: yellow;
  border: 1px solid black;
}

#r1 {
  background-color: lightgreen;
  transform: rotate(5deg);          /* 順時針轉 5 度，繞元素左上角（預設）*/
}

#r2 {
  background-color: lightblue;
  transform-origin: 50% 50%;        /* 將旋轉中心設為元素中心 */
  transform: rotate(-20deg);        /* 逆時針轉 20 度，繞元素中心 */
}
```

```html
<div>This a normal div block.</div>
<div id="r1">
  This is a rotated block with 5 deg rotation about the upper-left corner (default) of the div
</div>
<div id="r2">
  This is a rotated block with -20 deg rotation about the center of the div
</div>
```

重點概念：

- **旋轉中心（transform-origin）**：教材指出，`rotate()` 預設繞住元素嘅**左上角（upper-left corner）**旋轉；而 `#r2` 透過 `transform-origin: 50% 50%;` 將旋轉中心改為元素嘅**中心（the center of the div）**。
- **角度單位**：`deg`（degrees，度）。
- 正角度（`5deg`）順時針轉；負角度（`-20deg`）逆時針轉。

> "`transform-origin` specifies the point about which a transformation (e.g. `rotate()`) is applied; in the lecture example, rotation by default is about the upper-left corner of the element, and `transform-origin: 50% 50%` rotates the element about its center."

**📌 考試重點**：考 `transform-origin` 就係考「繞邊一點轉」——教材口徑係「預設繞左上角；`50% 50%` 繞中心」。角度符號題要識得講 positive = clockwise、negative = counter-clockwise。

---

### 3.16 2D Transform：`scale()`（縮放）

**`scale()`** 方法根據你畀嘅**寬度同高度參數**將元素**放大或縮小（increases or decreases the size of an element）**。數值係倍數：**1 = 原大小**；**大過 1 = 放大**（如 1.25 = 125%）；**細過 1 = 縮小**（如 0.75 = 75%）。

> "The scale method increases or decreases the size of an element (according to the parameters given for the width and height)."

教材例子：

```css
/* 整體放大 1.25 倍（125%）*/
transform: scale(1.25);

/* 整體縮細到 0.75 倍（75%）*/
transform: scale(0.75);

/* 只喺水平（X）方向放大 1.25 倍——元素變闊 */
transform: scaleX(1.25);

/* 只喺垂直（Y）方向放大 1.25 倍——元素變高 */
transform: scaleY(1.25);
```

> "To scale in only one direction: `transform: scaleX();` scales horizontally and `transform: scaleY();` scales vertically."

**📌 考試重點**：記住 scale 嘅值係「倍數」而唔係像素——`scale(1)` 係原大、`scale(2)` 係兩倍大、`scale(0.5)` 係一半大；`scaleX`／`scaleY` 分別只影響闊度／高度。

---

### 3.17 2D Transform：`skew()`（斜切/傾斜）

**`skew()`** 方法根據你畀嘅**角度**，將元素沿 **X 軸同 Y 軸**斜切（skews），令元素由長方形變成平行四邊形嘅感覺——即係元素嘅邊會「歪斜」。

> "The skew method skews an element along the X and Y-axis by the given angles."

教材例子：

```css
/* 沿 X 軸斜切 15 度（一個參數時只影響 X 軸）*/
transform: skew(15deg);

/* 沿 X 軸斜切 15 度、沿 Y 軸斜切 15 度 */
transform: skew(15deg, 15deg);
```

如果想**只喺單一軸**斜切，可以用 `skewX()` 或 `skewY()`：

```css
/* 只沿 X 軸斜切 */
transform: skewX(15deg);

/* 只沿 Y 軸斜切 */
transform: skewY(15deg);
```

> "To skew alone only on x- or y-axis, we can use `transform: skewX();` and `transform: skewY();`."

**📌 考試重點**：`skew()` 一個參數 = 只斜 X 軸；兩個參數 = X、Y 軸各自嘅角度（順序係 X 先、Y 後）。呢個「參數對應邊條軸」嘅規律同 `translate(x, y)` 一致——**第一參數永遠係 X，第二參數永遠係 Y**。

---

### 3.18 Transition（過渡效果）

**Transition** 係 CSS3 用嚟製造「平滑變化」嘅效果：容許元素嘅某個 property 值，喺**指定嘅時長（duration）**內由一個值**平滑噉過渡（smoothly）**到另一個值——例如 hover 時寬度由 100px 慢慢變做 300px，而唔係「啪」一聲即跳。

> "CSS3 transitions allow us to change property values smoothly (from one value to another), over a given duration."

要建立 transition 效果，你**必須指定兩樣嘢（you must specify two things）**：

1. **你想加效果嘅 CSS property（the CSS property you want to add an effect to）**——例如 `width`；
2. **效果嘅持續時間（the duration of the effect）**——例如 `2s`（2 秒）。

> "To create a transition effect, you must specify two things: (1) the CSS property you want to add an effect to, and (2) the duration of the effect."

教材完整例子（SLIDE 21）——一個 100px 闊嘅淺綠色方塊，hover 時闊度喺 2 秒內平滑擴闊到 300px：

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background: lightgreen;
    transition: width 2s;   /* 對 width 屬性做 2 秒過渡 */
  }

  div:hover {
    width: 300px;           /* 觸發點：hover 時目標寬度 */
  }
</style>

<body>
  <div>Transition Demo</div>
  <p>Hover the div to see transition.</p>
</body>
```

機制拆解：

- 基本狀態：div 寬 100px、高 100px、淺綠色底。
- `transition: width 2s;` 話畀瀏覽器知：**當 `width` 嘅值改變時，用 2 秒慢慢過渡**，而唔係即時跳變。
- 觸發：滑鼠移過 div（`:hover`，即 mouse over），`width` 由 100px 變 300px——瀏覽器就自動將呢個變化「攤開」喺 2 秒內完成，形成順滑動畫。

**📌 考試重點**：最常考「建立 transition 需要邊兩樣嘢？」——答案係 **"the CSS property you want to add an effect to" + "the duration of the effect"**。語法題則要識得寫 `transition: <property> <duration>;`（例如 `transition: width 2s;`），並配合狀態改變（通常係 `:hover`）先至見到效果——冇狀態改變就冇過渡發生。

---

## 📖 模組四：必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型（Exam Answer Phrase） |
|-------------------|------------------|----------------------------------------|
| `CSS3` | CSS 嘅新版本，支援更吸引嘅視覺效果 | "CSS3 is the new version of CSS, and it supports more appealing visual effects on a web page." |
| backward-compatible | 向後相容：舊版功能繼續受支援 | "CSS3 is backward-compatible, i.e. web browsers will always continue to support CSS2 in addition to CSS3." |
| CSS modules | CSS3 被拆分出嚟嘅功能模組 | "CSS3 has been split into 'modules', such as Backgrounds and Borders, 2D/3D Transformations and Animations." |
| browser prefix | 瀏覽器專屬嘅 CSS3 屬性前綴 | "Different browsers may have built-in notation for CSS3 properties, e.g. `-moz-`, `-webkit-`, `-o-` and `-ms-`." |
| `-moz-` | Mozilla Firefox 嘅前綴 | "`-moz-` is the prefix for Mozilla-based Firefox browsers." |
| `-webkit-` | Safari 與 Google Chrome 嘅前綴 | "`-webkit-` is the prefix for Safari (Apple Mac) and Google Chrome browsers." |
| `-o-` | Opera 瀏覽器嘅前綴 | "`-o-` is the prefix for the Opera browser." |
| `-ms-` | Microsoft Internet Explorer 嘅前綴 | "`-ms-` is the prefix for Microsoft Explorer." |
| `<div>` | 控制成塊文字格式/行為嘅區塊容器 | "<div> is used for controlling the format or behavior of blocks of text." |
| `<span>` | 做內嵌（inline）格式修改嘅容器 | "<span> is used for inline format changes." |
| block element | 佔全寬並強迫下一元素開新行嘅元素 | "Block elements occupy the entire width of the browser and cause the next element to start on a new line." |
| inline element | 嵌喺文字流、行尾自動 wrap 嘅元素 | "Inline elements fit into the regular flow of text on the web page and will automatically wrap when they reach the end of a line." |
| box model | 描述元素有 content、padding、border、margin 嘅模型 | "The box model describes the way that an HTML element has border, padding, and margin." |
| content | 盒模型最內層，真正內容所佔區域 | "Content is the innermost part of the box that holds the text or images." |
| `padding` | content 同 border 之間嘅內距 | "Padding wraps around the content area; it is the space between the content and the border." |
| `margin` | border 以外、與其他元素之間嘅外距 | "Margin is the space outside the border that separates an element from other elements." |
| `border` | 包住元素嘅邊框，需指定 width、style、color | "Borders of a box model enclose an HTML element. With borders, you need to specify a width, a style, and a color." |
| `border-width` / `border-style` / `border-color` | 邊框三件套長寫法 | "Long form: `border-width: 5px; border-style: dotted; border-color: blue;`" |
| `border: 5px dotted blue;` | 邊框短寫法（width style color） | "Short form: `border: 5px dotted blue;`" |
| `border-radius` | 將元素四角變圓嘅屬性 | "`border-radius: 25px;` rounds all four corners of the element." |
| `padding-top/right/bottom/left` | padding 單邊長寫法 | "Long form: `padding-top: 10px; padding-right: 15px; padding-bottom: 10px; padding-left: 20px;`" |
| `padding: 10px 15px 10px 20px;` | padding 短寫法，順序 top right bottom left | "Short form: `padding: 10px 15px 10px 20px;` — values go top, right, bottom, left." |
| `margin: 40px 30px 20px 5px;` | margin 短寫法，順序同 padding | "The way to set margin is exactly like padding: `margin: 40px 30px 20px 5px;` (top, right, bottom, left)." |
| shorthand 1/2/3/4 values | 一至四個值嘅縮寫規則 | "One value sets all four sides; two values set top/bottom and right/left; three values set top, left/right and bottom; four values set top, right, bottom and left." |
| `display` | 決定盒仔行為模式嘅屬性 | "The display property in CSS determines how that box behaves." |
| `display: block;` | 令元素變 block | "`display: block;` makes elements like `<div>` block." |
| `display: inline;` | 令元素變 inline | "`display: inline;` makes an element inline (the default of all elements per the lecture notes)." |
| `display: inline-block;` | 可設尺寸但同行並排嘅「行上 block」 | "`display: inline-block;` — a block sitting on a line." |
| `display: none;` | 完全隱藏元素 | "`display: none;` hides the element." |
| `overflow` | 內容放唔落固定盒時嘅處理屬性 | "When content cannot fit inside a box with a specific height or width, the overflow property specifies how the content should be handled." |
| `overflow: visible;` | 預設值：溢出內容照顯示 | "`overflow: visible` is the default — overflowing content is displayed outside the box." |
| `overflow: hidden;` / `scroll` / `auto` | 剪走／加滾動條／有需要先加 | "`overflow: hidden` clips the content; `scroll` always adds a scroll bar; `auto` adds one only when needed." |
| `text-shadow` | 加喺文字嘅陰影 | "`text-shadow` adds a shadow to text." |
| `box-shadow` | 加喺元素盒仔嘅陰影 | "`box-shadow` adds a shadow to elements." |
| x-offset / y-offset / blur radius / color | 陰影四個組成參數 | "A shadow is defined by its x-offset, y-offset, blur radius and color." |
| `opacity` | 透明度屬性，值 0.0–1.0 | "The opacity property can take a value from 0.0 - 1.0. The lower the value, the more transparent." |
| `transform` | 套用 2D 變形嘅屬性 | "A transformation is an effect that lets an element change shape, size and position." |
| `translate(x, y)` | 沿 X、Y 軸由現位移動元素 | "The translate() method moves an element from its current position according to the X-axis and Y-axis parameters." |
| `translateX()` / `translateY()` | 只沿單一軸移動 | "`translateX()` moves an element only in the x-direction; `translateY()` only in the y-direction." |
| `:hover` | 滑鼠指住元素時嘅 pseudo-class | "`div:hover` applies styles when the mouse is over the div." |
| `rotate(deg)` | 按度數順/逆時針旋轉 | "The rotate method rotates an element clockwise or counter-clockwise according to a given degree, e.g. `rotate(5deg)`." |
| `transform-origin` | 指定旋轉/變形中心點 | "`transform-origin: 50% 50%;` rotates the element about its center instead of the default origin." |
| `scale(n)` | 按倍數放大/縮小元素 | "The scale method increases or decreases the size of an element, e.g. `scale(1.25)` enlarges it to 125%." |
| `scaleX()` / `scaleY()` | 只縮放闊度／高度 | "`transform: scaleX(1.25);` scales only in the x-direction; `scaleY(1.25);` only in the y-direction." |
| `skew(deg)` | 沿 X、Y 軸按角度斜切 | "The skew method skews an element along the X and Y-axis by the given angles." |
| `skewX()` / `skewY()` | 只斜切單一軸 | "To skew only on the x- or y-axis, use `transform: skewX();` or `transform: skewY();`." |
| `transition` | 屬性值平滑過渡嘅效果 | "CSS3 transitions allow us to change property values smoothly from one value to another, over a given duration." |
| duration | 過渡效果持續時間 | "To create a transition, you must specify the CSS property to add an effect to and the duration of the effect, e.g. `transition: width 2s;`." |

---

## 🗺️ 模組五：循序漸進學習路線（Learning Path）

**Step 1 —— 認識載體與元素性格**
先理解什麼觀念：CSS 樣式掛喺邊——`<div>` 管成塊內容、`<span>` 管行內局部修改；block element 同 inline element 喺頁面上點樣佔位。
➔ 背誦什麼英文短語："`<div>` is used for controlling the format or behavior of blocks of text."、"`<span>` is used for inline format changes."、"Block elements occupy the entire width of the browser and cause the next element to start on a new line."、"Inline elements fit into the regular flow of text."
➔ 掌握什麼寫法/實作：用 `<div style="...">` 包住成段、用 `<span style="...">` 喺段落中間局部改色；隨口數出 block（`<div>`、`<p>`、`<form>`、`<h1>`、`<ul>`）與 inline（`<span>`、`<a>`、`<input>`、`<img>`）例子。
➔ 能解答什麼英文考題："Identify which of the following are block elements / inline elements."、"Explain the difference between a `<div>` and a `<span>`."

**Step 2 —— 掌握 Box Model 四層**
先理解什麼觀念：每個元素係一個盒——content 由內至外有 padding、border、margin；`border` 要 width、style、color 三件套。
➔ 背誦什麼英文短語："The box model describes the way that an HTML element has border, padding, and margin."、"Padding wraps around the content area."、"With borders, you need to specify a width, a style, and a color."
➔ 掌握什麼寫法/實作：寫出 `border-width/style/color` 長寫法並濃縮做 `border: 5px dotted blue;`；用 `border-radius`（單值/四值）造圓角。
➔ 能解答什麼英文考題："Write the long form and the short form of the border property."、"What is the effect of `border-radius: 25px;`?"

**Step 3 —— 背熟 padding／margin 縮寫**
先理解什麼觀念：padding 管「入面透氣位」、margin 管「出面隔離位」，設定方法完全一樣；短寫法 1/2/3/4 個值各有含義，順序永遠係 top、right、bottom、left。
➔ 背誦什麼英文短語："The way to set margin is exactly like padding."、"The same method of setting applies to padding."（教材原句）；"Values go top, right, bottom and left."
➔ 掌握什麼寫法/實作：將 `padding-top/right/bottom/left` 濃縮為 `padding: 10px 15px 10px 20px;`；即時拆解 `margin: 1px 2px 3px;` 等縮寫題。
➔ 能解答什麼英文考題："What does `margin: 10px 20px;` mean?"、"Convert `margin-top: 40px; margin-right: 30px; ...` into the shorthand form."

**Step 4 —— 操控盒仔行為：display 與 overflow**
先理解什麼觀念：`display` 決定盒仔係 block、inline、inline-block 定隱藏（`none`）；盒設死咗大小而內容放唔落時，`overflow` 話畀瀏覽器點處理。
➔ 背誦什麼英文短語："`display: inline-block;` — a block sitting on a line."、"`display: none;` — Hide."、"`overflow: visible` (default), `hidden`, `scroll`, `auto`."
➔ 掌握什麼寫法/實作：寫 `display: block / inline / inline-block / none;`；因應情境揀 `overflow` 值（截走用 hidden、保證有得碌用 scroll、有需要先用 auto）。
➔ 能解答什麼英文考題："List the four common values of the `display` property and explain each."、"What is the default value of the `overflow` property?"

**Step 5 —— 加 CSS3 視覺特效：陰影與透明度**
先理解什麼觀念：文字陰影用 `text-shadow`、盒仔陰影用 `box-shadow`，兩者都由 x-offset、y-offset、blur radius、color 組成；透明度用 `opacity`，值域 0.0–1.0，越低越透明。
➔ 背誦什麼英文短語："The opacity property can take a value from 0.0 - 1.0. The lower value, the more transparent."、"With CSS3 we can add shadow to text and to elements: text-shadow and box-shadow."
➔ 掌握什麼寫法/實作：寫 `text-shadow: 2px 2px 5px gray;`／`box-shadow: ...`；寫 `img { opacity: 0.4; }` 並解釋效果。
➔ 能解答什麼英文考題："Name the four components of a shadow effect."、"If you want an image to be more transparent, should you increase or decrease its opacity value?"

**Step 6 —— 活用 2D Transform 四式**
先理解什麼觀念：`transform` 令元素改變形狀/大小/位置；`translate` 移動、`rotate` 旋轉（正順時針、負逆時針；`transform-origin` 揀旋轉中心）、`scale` 按倍數縮放、`skew` 按角度斜切。
➔ 背誦什麼英文短語："The translate() method moves an element from its current position (according to the parameters given for the X-axis and the Y-axis)."、"The rotate method rotates an element clockwise or counter-clockwise according to a given degree."、"The scale method increases or decreases the size of an element."、"The skew method skews an element along the X and Y-axis by the given angles."
➔ 掌握什麼寫法/實作：寫 `translate(30px, 45px)`、`translateX(30px)`、`rotate(5deg)`／`rotate(-20deg)`＋`transform-origin: 50% 50%;`、`scale(1.25)`／`scaleX(1.25)`、`skew(15deg)`／`skewX(15deg)`；配合 `:hover` 觸發。
➔ 能解答什麼英文考題："Which transform method would you use to (a) move / (b) rotate / (c) enlarge / (d) skew an element?"、"What is the effect of `transform: scale(0.75);`?"

**Step 7 —— 用 Transition 整平滑動畫**
先理解什麼觀念：Transition 令 property 值喺一段時長內由一個值平滑過渡去另一個值；必須有「被過渡嘅 property」＋「duration」兩樣，通常靠 `:hover` 觸發狀態改變。
➔ 背誦什麼英文短語："CSS3 transitions allow us to change property values smoothly, from one value to another, over a given duration."、"To create a transition effect, you must specify two things: the CSS property you want to add an effect to, and the duration of the effect."
➔ 掌握什麼寫法/實作：寫 `transition: width 2s;` 並配合 `div:hover { width: 300px; }` 完成「hover 兩秒變闊」嘅完整 demo。
➔ 能解答什麼英文考題："What two things must you specify to create a CSS3 transition?"、"Explain what happens when the user hovers over a div with `transition: width 2s;`."

---

## 🎒 模組六：考前 5 分鐘雙語懶人包（Cheat Sheet）

### A. `<div>` vs `<span>` 速記

| | `<div>` | `<span>` |
|---|---------|----------|
| 用途 | Blocks of text（成塊內容） | Inline format changes（行內局部修改） |
| 元素類型 | Block element | Inline element |
| 行為 | 佔全寬、開新行 | 跟文字流、行尾自動 wrap |

### B. Block vs Inline 例子記憶卡

- **Block（5 個）：D P F H U** → `<div>`、`<p>`、`<form>`、`<h1>`、`<ul>` — "Block elements occupy the entire width of the browser."
- **Inline（4 個）：S A I I** → `<span>`、`<a>`、`<input>`、`<img>` — "Inline elements fit into the regular flow of text."

### C. Box Model 四層（由內到外）

```
┌────────── margin（外距）──────────┐
│ ┌──────── border（邊框）────────┐ │
│ │ ┌────── padding（內距）──────┐ │ │
│ │ │ ┌── content（內容）──┐   │ │ │
│ │ │ └────────────────────┘   │ │ │
│ │ └──────────────────────────┘ │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

**記憶口訣：Content → Padding → Border → Margin（C-P-B-M：「**C**offee **P**lease **B**efore **M**e」由內到外）**

### D. Border 三件套（長 vs 短）

| 長寫法 | 短寫法 |
|--------|--------|
| `border-width: 5px;` | `border: 5px dotted blue;` |
| `border-style: dotted;` | （順序永遠：**width style color**） |
| `border-color: blue;` | |

- Style 例子：`solid`（實線）、`dotted`（點線）、`dashed`（虛線）。
- 圓角：`border-radius: 25px;`（四角一樣）；`border-radius: 15px 60px 30px 0px;`（**由左上順時針**：TL、TR、BR、BL）。

### E. Padding / Margin 縮寫對照（順序永遠：top → right → bottom → left）

| 寫法 | 意思 |
|------|------|
| `margin: 1px;` | 四邊 = 1px |
| `margin: 1px 2px;` | 上下 = 1px；左右 = 2px |
| `margin: 1px 2px 3px;` | 上 = 1px；左右 = 2px；下 = 3px |
| `margin: 1px 2px 3px 4px;` | 上 1 / 右 2 / 下 3 / 左 4 |

**口訣：TRouBLe（T-R-B-L = Top、Right、Bottom、Left），由頂順時針。** 同一規則適用於 `padding`（"The same method of setting applies to padding."）。

### F. display 四值極速記憶

| 值 | 一句英文 | 中文 |
|----|----------|------|
| `block` | Make elements like `<div>` block | 佔全寬、開新行 |
| `inline` | Default of all elements | 跟文字流 |
| `inline-block` | A block sitting on a line | 行上 block：可設尺寸、又同行並排 |
| `none` | Hide | 完全隱藏、唔佔空間 |

### G. overflow 四值（記「V-H-S-A」）

| 值 | 行為 |
|----|------|
| `visible`（**default**） | 溢出照顯示 |
| `hidden` | 剪走溢出內容 |
| `scroll` | 一定有滾動條 |
| `auto` | 有需要先加滾動條 |

### H. 陰影與透明度速記

- 陰影四參數：**x-offset、y-offset、blur radius、color**
- 文字 → `text-shadow: 2px 2px 5px gray;`；盒仔 → `box-shadow: 2px 2px 5px gray;`
- 透明度：`opacity: 0.4;`（值域 **0.0–1.0**；**越低越透明**）

### I. 2D Transform 四式對照表

| 方法 | 功能 | 例子 | 英文關鍵句 |
|------|------|------|------------|
| `translate(x, y)` | 由現位沿 X、Y 軸移動 | `transform: translate(30px, 45px);` | "moves an element from its current position" |
| `rotate(deg)` | 按度數旋轉（正=順時針、負=逆時針） | `transform: rotate(-20deg);` | "rotates an element clockwise or counter-clockwise" |
| `scale(n)` | 按倍數放大/縮小（1=原大） | `transform: scale(1.25);` | "increases or decreases the size of an element" |
| `skew(deg)` | 沿 X、Y 軸按角度斜切 | `transform: skew(15deg, 15deg);` | "skews an element along the X and Y-axis" |

- **單軸版**：`translateX/Y`、`scaleX/Y`、`skewX/Y`（第一參數永遠係 X，第二參數永遠係 Y）。
- **旋轉中心**：教材口徑——預設繞元素**左上角（upper-left corner）**；`transform-origin: 50% 50%;` 改為繞**中心（center）**。
- **hover 觸發**：`div:hover { ... }` = "mouse over"。

### J. Transition 兩大必備要件 + 完整示範

> "To create a transition effect, you must specify two things: (1) the CSS property you want to add an effect to, and (2) the duration of the effect."

```css
div {
  width: 100px;
  height: 100px;
  background: lightgreen;
  transition: width 2s;   /* property + duration */
}
div:hover {
  width: 300px;           /* 觸發狀態改變 → 2 秒平滑變闊 */
}
```

### K. 瀏覽器前綴極速記憶（「M-S-O-M」）

| 前綴 | 瀏覽器 |
|------|--------|
| `-moz-` | **M**ozilla Firefox |
| `-webkit-` | Safari（Apple **M**ac）＋ Google Chrome |
| `-o-` | **O**pera |
| `-ms-` | **M**icrosoft Internet Explorer |

**口訣：Firefox 記 Firefox 嘅開發商係 Mozilla（-moz-）；Safari/Chrome 記佢哋用 WebKit 引擎（-webkit-）；Opera 記個 O 字；IE 記 Microsoft（-ms-）。**

### L. 終極英文答題金句（背熟呢幾句幾乎 cover 所有解釋題）

1. "CSS3 is backward-compatible, i.e. web browsers will always continue to support CSS2 in addition to CSS3."
2. "Block elements occupy the entire width of the browser; inline elements fit into the regular flow of text."
3. "The box model describes the way that an HTML element has border, padding, and margin."
4. "The opacity property takes a value from 0.0 - 1.0; the lower the value, the more transparent."
5. "A transformation lets an element change shape, size and position."
6. "CSS3 transitions change property values smoothly from one value to another over a given duration — you must specify the property and the duration."

---

> ✅ 溫習完成指標：你能夠唔睇筆記講出「block vs inline 定義＋例子」、「box model 四層由內到外」、「padding/margin 四值順序」、「display／overflow 四個值」、「陰影四參數」、「opacity 值域」、「四個 transform 方法各做咩」、「transition 兩大要件」——即代表你已經準備好應付 Topic 5 嘅任何選擇題、填充題同短答題。
