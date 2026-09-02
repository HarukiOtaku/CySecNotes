# ITE3006 Lab 4: CSS Fundamentals — 雙語實務 CodeGuide（實務測驗主戰文件）

> 本文件根據 ITE3006 Web Lab 4「Cascading Style Sheet (CSS) Fundamentals」教材重寫，目標只有一個：**淨係靠呢份文件，你都可以喺 Practical Test / Lab Test 入面完整做出 Lab 4 嘅 HTML + CSS，並答得中填空題與改錯題**。步驟解說用香港繁體中文；所有核心定義、HTML 標籤、CSS 屬性、選擇器與答題重點，一律緊隨英文標準句（> Blockquote）。HTML、CSS 關鍵字與屬性值 100% 保留英文原文，唔會譯錯。

> 本 Lab 完全冇 JavaScript —— 全部係 HTML + CSS。JS 會喺 Lab 7 之後先出現；喺實測入面見到 CSS 題目就唔好亂寫 `<script>`。

---

## 1. 🎯 Lab 目標與環境 (Objectives & Environment)

### 本 Lab 要掌握嘅實務技能（Intended Learning Outcomes）

完成本 Lab 之後，你應該可以做到：

- **講解 CSS 嘅用途**：Understand the use of CSS — CSS (Cascading Style Sheets) is used to control the **presentation / formatting** (顏色、字體、大小、背景、排版) of a web page, separate from the content structure defined by HTML.
- **用三種方式將 CSS 套落 HTML 元素**：apply CSS via (1) **Local / Inline Style Sheet**（`style` attribute）、(2) **Global / Embedded Style Sheet**（`<style>` in `<head>`）、(3) **External Style Sheet**（獨立 `.css` 檔 + `<link>`）。
- **寫出五大類 CSS 選擇器**：element selector（如 `p`、`h1`）、contextual / descendant selector（如 `p strong`）、class selector（`.name`）、ID selector（`#name`）、pseudo-class / pseudo-element（`:link`、`:hover`、`:visited`、`p:first-letter`）。
- **用 CSS 屬性整靚網頁**：`color`、`background-color`、`font-size`、`font-family`、`font-weight`、`text-decoration`、`text-align` 等。
- **完整「標記 + 樣式」一頁 About Me 網頁**：用 `<h1>/<h2>`、`<hr>`、`<ul>/<ol>/<li>`、`<img>`、`<a>`、`<strong>` 起結構，再用 external CSS 控制外觀。

> "CSS is used to format the presentation of a web page. HTML defines the structure and content, while CSS defines how the content looks."

> "CSS can be applied in three ways: (1) Inline / Local Style Sheet — using the style attribute of an HTML tag; (2) Embedded / Global Style Sheet — using the <style> element inside <head>; (3) External Style Sheet — a separate .css file linked by the <link> element."

### 所需工具（Resource Required）

| 工具 | 用途 | 實測貼士 |
|------|------|----------|
| 文字編輯器（Text editor），例如 Notepad++ / Brackets | 寫 `.html` 同 `.css` 原始碼 | 存檔時一定要揀 **Save As Type: All types**，副檔名打返 `.html` / `.css`；唔好畀佢自動存成 `.txt` |
| 瀏覽器（Browser），例如 Google Chrome / Mozilla Firefox | 開啟 `.html` 檔案睇結果 | 直接 **double-click** 個 `.html` 檔，或喺瀏覽器地址列打入 `C:\...\lab04_1a.html` 嘅 file path；改完 code 要 **Ctrl+F5（hard refresh）** 先會見到最新效果 |
| 開發者工具（F12 Developer Tools） | Debug | 喺 Chrome 按 **F12 → Elements** 可以即時睇每個元素最終套用咗邊啲 CSS，係實測救星 |

### 本 Lab 要交嘅檔案清單（Deliverables 總覽）

| 練習 | 步驟 | 你要儲出嚟嘅檔案 |
|------|------|------------------|
| 1. Local Style Sheet | (a) | `lab04_1a.html` |
| 1. Local Style Sheet | (b) | `lab04_1b.html` |
| 2. Global (Embedded) Style Sheet | (a) | `lab04_2a.html` |
| 2. Global (Embedded) Style Sheet | (b) | `lab04_2b.html` |
| 3. External Style Sheet | (a) | `lab04_3a.css` + `lab04_3a.html` |
| 3. External Style Sheet | (b) | `lab04_3b.css` + `lab04_3b.html` |
| 4. Contextual Selector | (a) | `lab04_4a.css` + `lab04_4a.html` |
| 5. Class Selector | (a)+(b) | `lab04_5a.css` + `lab04_5b.html` |
| 6. ID Selector | (a)+(b) | `lab04_6a.css` + `lab04_6b.html` |
| 7. About Me 大整合 | (a) | `lab04_7a.html` |
| 7. About Me 大整合 | (b) | `lab04_7b.css` |
| 7. About Me 大整合 | (c) | `lab04_7c.css` |

**記住**：實測交功課通常係睇「你個 `.html` 喺瀏覽器開出嚟嘅樣」＋「你有冇交齊指定檔名嘅檔案」。檔名錯一個字母（大細階、`lab04_1b` 寫成 `lab04_1B`）都會扣分，一定要跟足題目。

---

## 2. 🛠️ 解題步驟拆解 (Walkthrough)

> 每個練習先列「題目原文（英文）」，再用「1 ➔ 2 ➔ 3」步驟教你點做；所有 (i)(ii)(iii)… 填空要求都畀埋正確答案同解說。

---

### 練習 1（Exercise 1）：CSS Local Style Sheet（內聯樣式）

#### 題目原文 (Original Question)

> "Open lab04_1.html and edit the code according to the given guidelines: (a) CSS Local Style Sheet. Edit the code as follow and save the file as lab04_1a.html."
>
> "(b) Study the code in (a) carefully and add CSS code to complete the tasks below. Save the result to lab04_1b.html: For the first paragraph: i. set background color for the first paragraph to red; ii. set the font color for the first paragraph to pink; iii. set font size for header 1 in the first paragraph to 15pt. For the second paragraph: iv. set background color for the second paragraph to green; v. set the font color for the second paragraph to yellow; vi. set font size for header 1 in the second paragraph to 20pt."

#### (a) 步驟：照抄內聯樣式範例

1 ➔ 開 `lab04_1.html`（內容只有文字，冇任何樣式），喺每個 tag 加 `style="..."` attribute，存做 `lab04_1a.html`。

2 ➔ `style` attribute 嘅語法係一連串 **`屬性:值;`** pair，用分號（`;`）隔開、最後一個可以唔使分號：

> "The inline style is written inside the tag: `<tag style="property1: value1; property2: value2;">`. Each declaration consists of a CSS property name, a colon, and a value."

3 ➔ 對照題目畀嘅 code 逐行打字（唔好淨係 Copy-Paste 錯位）。留意兩個重點：
- 第一段 `<p style="background-color:blue; color:yellow">`——即段落底色藍、字黃；
- 第二段 `<p style="background-color:grey; color:pink; font-size:30pt">`——即底色灰、字粉紅、字體 30pt。
- **警告**：題目 code 將 `<h1>`、`<h2>` 寫咗入 `<p>` 入面（HTML 語法上唔合法——瀏覽器見到 block-level 嘅 `<h1>` 會自動「閂咗」個 `<p>`，實際渲染時 `<h1>` 唔會留喺段入面）。照抄冇問題，但你要知呢個係壞示範，Lab 7 之後用 `<div>` 先啱。

#### (b) 填空／修改要求 → 正確答案

(b) 唔係由零寫過，而係「喺 (a) 嘅 code 上面改/加 CSS」。逐個要求對應如下：

| 要求（英文原文） | 要加喺邊個 tag 嘅 `style` | 正確 CSS 答案 | 解說 |
|---|---|---|---|
| i. set background color for the first paragraph to **red** | 第一個 `<p>` | `background-color: red;`（由 `blue` 改做 `red`） | 改段落底色 |
| ii. set the font color for the first paragraph to **pink** | 第一個 `<p>` | `color: pink;`（由 `yellow` 改做 `pink`） | 改前景（字）顏色 |
| iii. set font size for header 1 in the first paragraph to **15pt** | 第一段入面嗰個 `<h1>` | `font-size: 15pt;`（新增） | `pt` 係字體單位，`15pt` 即 15 point；只影響該 `<h1>` |
| iv. set background color for the second paragraph to **green** | 第二個 `<p>` | `background-color: green;`（由 `grey` 改做 `green`） | 改段落底色 |
| v. set the font color for the second paragraph to **yellow** | 第二個 `<p>` | `color: yellow;`（由 `pink` 改做 `yellow`） | 改前景顏色 |
| vi. set font size for header 1 in the second paragraph to **20pt** | 第二段入面嗰個 `<h1>` | `font-size: 20pt;`（新增） | 該 `<h1>` 本身已有 `color: green`，照保留，加字體大細 |

**✅ 正確答案（lab04_1b.html 嘅 `<body>` 部分）**：

```html
<p style="background-color:red; color:pink">
  Paragraph 1 with local style.<br />
  <h1 style="background-color:yellow; color:orange; font-size:15pt">This is text within header 1 style.</h1>
  <h2 style="color:blue">This is text within header 2 style.</h2>
</p>

<p style="background-color:green; color:yellow; font-size:30pt">
  Paragraph 2 with local style.<br />
  <h1 style="color:green; font-size:20pt">This is text within the paragraph 2 header 1 style<br /></h1>
</p>
```

**📌 答題重點**：
- 題目淨係要求「改邊樣就改邊樣」，冇提嘅屬性（例如第二段原本 `font-size:30pt`、`<h1>` 底色黃）保留即可，唔使刪。
- `background-color`（背景色）同 `color`（前景/文字色）係兩個唔同屬性，實測成日考你邊個係背景、邊個係文字色。

---

### 練習 2（Exercise 2）：CSS Global Style Sheet（內嵌樣式）

#### 題目原文 (Original Question)

> "CSS Global Style Sheet. Given the file lab04_2.html. (a) Edit the code as follow and save the file as lab04_2a.html." —— 用 `<style>` 放喺 `<head>` 入面，一次過定義 `body`、`p`、`h1`、`h2` 嘅樣式。
>
> "(b) Study the code in (a) carefully and add CSS code to complete the tasks below: Change the code of global CSS for the html above and save the file as lab04_2b.html. i. set background color for the body to pink. For the paragraph: ii. set the font color for paragraph to blue; iv. set background color for the paragraph to green. For the header 1: iii. set font size for header 1 to 25px. For the header 2: v. set the font color header 2 to yellow; vi. set font size for header 2 to 20px."

#### (a) 步驟

1 ➔ 開 `lab04_2.html`。喺 `<head>` 入面加一個 `<style type="text/css">` 區塊，然後將 CSS 規則寫入去。呢個叫做 **Global（全局）/ Embedded（內嵌）Style Sheet**。

2 ➔ CSS 規則嘅格式係：**選擇器（selector）＋ `{` 屬性聲明 `}`**，每條聲明用 `屬性: 值;`：

> "A CSS rule consists of a selector and a declaration block: `selector { property: value; }`. The selector tells the browser which element(s) the styles apply to."

3 ➔ (a) 題目畀嘅範例 CSS（照抄）係：

```css
body {
  font-size: 10px;
  background-color: yellow;
}
p {
  color: red;
  font-size: 20px;
}
h1 {
  color: blue;
  font-weight: bold;
}
h2 {
  color: green;
  background-color: pink;
}
```

呢度示範咗 CSS 嘅威力：**一個規則，套用晒所有同類元素**——`p { ... }` 一寫，成頁所有 `<p>` 一齊變紅色 20px，唔使逐個 tag 加 `style`。存做 `lab04_2a.html`。

#### (b) 填空／修改要求 → 正確答案

| 要求（英文原文） | 喺邊個 selector 改 | 正確 CSS 答案 | 解說 |
|---|---|---|---|
| i. set background color for the **body** to pink | `body` | `background-color: pink;`（由 `yellow` 改） | 成頁底色變粉紅 |
| ii. set the **font color for paragraph** to blue | `p` | `color: blue;`（由 `red` 改） | 所有段落文字變藍 |
| iv. set **background color for the paragraph** to green | `p` | `background-color: green;`（新增） | 所有段落底色變綠 |
| iii. set **font size for header 1** to 25px | `h1` | `font-size: 25px;`（新增） | `px` = pixel（像素），同 `pt` 唔同單位 |
| v. set the **font color header 2** to yellow | `h2` | `color: yellow;`（由 `green` 改） | h2 文字變黃 |
| vi. set **font size for header 2** to 20px | `h2` | `font-size: 20px;`（新增） | h2 字體 20px |

**✅ 正確答案（lab04_2b.html 入面 `<style>` 嘅內容）**：

```css
body {
  font-size: 10px;          /* (a) 原有，冇要求改就保留 */
  background-color: pink;   /* i. body 底色粉紅 */
}
p {
  color: blue;              /* ii. 段落字色藍 */
  font-size: 20px;          /* (a) 原有 */
  background-color: green;  /* iv. 段落底色綠 */
}
h1 {
  color: blue;              /* (a) 原有 */
  font-weight: bold;        /* (a) 原有 */
  font-size: 25px;          /* iii. h1 字體 25px */
}
h2 {
  color: yellow;            /* v. h2 字色黃 */
  background-color: pink;   /* (a) 原有 —— 注意而家同 body 底色一樣，睇唔出底條；冇要求刪走，保留冇問題 */
  font-size: 20px;          /* vi. h2 字體 20px */
}
```

**📌 答題重點**：
- 內嵌樣式同內聯樣式嘅分別：**內聯 = 逐個 tag 寫 `style`；內嵌 = 喺 `<head>` 寫一次，套用全頁**。
- `body { ... }` 入面嘅樣式會被 `p`、`h1` 嘅規則**覆蓋（override）**——因為 `p`、`h1` 嘅選擇器更「貼身」；呢個係 CSS 嘅 **cascade（層疊）** 概念（詳見第 6 節）。

---

### 練習 3（Exercise 3）：CSS External Style Sheet（外部樣式表）

#### 題目原文 (Original Question)

> "CSS External Style Sheet. Given lab04_3.html. (a) Create a new file as follows and named it as lab04_3a.css. ... Edit the lab04_3.html file by adding the following link element and rename it as lab04_3a.html. (Tips: In Brackets editor, type link:css, then press [Tab] key)."
>
> "(b) Study the code carefully and do the CSS tasks below: Change the codes for the css above and save the files to lab04_3b.css and lab04_3b.html respectively. For the body: i. set background color for the body to yellow; ii. set the body font size to 10px. For the paragraph: iii. set the font size for the paragraph to 20px. For the header 1: iv. set the font size for the header 1 to 30px; v. set the font weight for the header 1 to bold; vi. set font color for the header 1 to red."

#### (a) 步驟

1 ➔ 開一個新檔案，將題目畀嘅 CSS 寫入去，存做 **`lab04_3a.css`**（`.css` 檔入面**淨係可以寫 CSS**，唔可以有 `<style>` 標籤、唔可以有 HTML）：

```css
body {
  font-size: 15px;
  color: blue;
}
p {
  color: yellow;
  background-color: pink;
}
h1, h2 {
  color: blue;
}
h2 {
  font-weight: bold;
}
```

> 留意 `h1, h2 { ... }` —— 用**逗號分隔**可以一次過將同一條規則套落多個選擇器。

2 ➔ 開 `lab04_3.html`，喺 `<head>` 入面加 **`<link>` 元素**，將 CSS 檔「連」入去，存做 `lab04_3a.html`：

```html
<head>
  <link rel="stylesheet" href="lab04_3a.css" type="text/css" />
  <title>Lab 4 Question 3</title>
</head>
```

> "The <link> element is placed inside the <head> to link an external style sheet to the HTML document: `<link rel="stylesheet" href="style.css" type="text/css" />`. `rel="stylesheet"` tells the browser it is a style sheet and `href` gives the file path."

**📌 答題重點**：`<link>` 嘅三個關鍵 attribute——`rel="stylesheet"`、`href="檔名.css"`、`type="text/css"`。實測成日叫你「補返個 link 落去」，漏咗 `rel` 或 `href` 錯路徑就全部樣式失效。

3 ➔ **Brackets 貼士**：喺 HTML 打 `link:css` 再按 `Tab`，編輯器會自動幫你生成 `<link rel="stylesheet" href="style.css">`。

#### (b) 填空／修改要求 → 正確答案

| 要求（英文原文） | Selector | 正確 CSS 答案 | 解說 |
|---|---|---|---|
| i. set background color for the **body** to yellow | `body` | `background-color: yellow;`（新增） | |
| ii. set the **body font size** to 10px | `body` | `font-size: 10px;`（由 `15px` 改） | |
| iii. set the **font size for the paragraph** to 20px | `p` | `font-size: 20px;`（新增） | |
| iv. set the **font size for the header 1** to 30px | `h1` | `font-size: 30px;`（新增） | |
| v. set the **font weight for the header 1** to bold | `h1` | `font-weight: bold;`（新增） | 字體粗幼；`bold` 粗體 |
| vi. set **font color for the header 1** to red | `h1` | `color: red;`（要覆蓋 `h1, h2` 嘅 `blue`） | 因為 (a) 用 `h1, h2 { color: blue; }` 將兩者都設做藍，所以 (b) 要另外寫 `h1 { color: red; ... }` 或者將群組規則改寫 |

**✅ 正確答案（lab04_3b.css）**——注意 `h1` 規則要寫喺 `h1, h2` 群組規則**之後**（或直接改寫群組），先可以覆蓋藍色：

```css
body {
  font-size: 10px;            /* ii. */
  color: blue;                /* (a) 原有 */
  background-color: yellow;   /* i. */
}
p {
  color: yellow;              /* (a) 原有 */
  background-color: pink;     /* (a) 原有 */
  font-size: 20px;            /* iii. */
}
h1 {
  color: red;                 /* vi. —— 覆蓋群組規則嘅 blue */
  font-size: 30px;            /* iv. */
  font-weight: bold;          /* v. */
}
h2 {
  color: blue;                /* (a) 原有 */
  font-weight: bold;          /* (a) 原有 */
}
```

**📌 答題重點**：相同 specificity 之下，「**後寫嘅規則贏（the later rule wins）**」。所以 `h1` 嘅紅色必須出現喺 `h1, h2 { color: blue; }` 之後，或者直接唔用群組選擇器。

---

### 練習 4（Exercise 4）：CSS Contextual Selector（上下文／後代選擇器）

#### 題目原文 (Original Question)

> "CSS Contextual Selector. Given lab04_4.html. (a) Create a new file and named it as lab04_4a.css. Set the CSS properties in the file as follows: For the body element: i. set background color for the body to yellow; ii. set the body font size to 15px. For the strong element: iii. set the font size for the strong context to 20px; iv. set the font color for the strong context to red; v. set the font weight for the strong to bold. Edit lab04_4.html to add the CSS file to the html and save the HTML as lab04_4a.html."

#### 步驟

1 ➔ 睇 `lab04_4.html` 嘅內容：佢有三個 `<p>`，每個入面都有 `<strong>`：

```html
<p>Paragraph 1. It should be <strong>like this</strong>.</p>
<p>Paragraph 2. It should be <strong>blue foreground color, and red background color</strong>.</p>
<p>Paragraph 3. It should be <strong>yellow foreground color and transparent background color</strong>.</p>
```

2 ➔ 開新檔 `lab04_4a.css`，寫入 body 嘅樣式（i、ii）。**Contextual selector（上下文選擇器）** 嘅寫法係「用空格將祖先同後代串埋」：`p strong` 意思係「**所有喺 `<p>` 入面嘅 `<strong>`**」，並唔係淨係 `p` 或者淨係 `strong`：

> "A contextual (descendant) selector matches an element only when it is inside (a descendant of) another element, e.g. `p strong { ... }` styles the <strong> elements that appear inside a <p>."

```css
body {
  background-color: yellow;   /* i. body 底色黃 */
  font-size: 15px;            /* ii. body 字體 15px（會被 p 內元素繼承） */
}
p strong {                    /* 上下文選擇器：只係 <p> 入面嘅 <strong> 先受影響 */
  font-size: 20px;            /* iii. strong 字體 20px */
  color: red;                 /* iv. strong 字色紅 */
  font-weight: bold;          /* v. strong 粗體 */
}
```

3 ➔ 喺 `lab04_4.html` 個 `<head>` 加 `<link rel="stylesheet" href="lab04_4a.css" type="text/css" />`，存做 `lab04_4a.html`。

**📌 答題重點**：實測會考你分辨「`strong`」同「`p strong`」——前者套用**全頁所有** `<strong>`（就算喺 `<h1>`、`<li>` 入面都中）；後者**只**套用喺 `<p>` 入面嘅 `<strong>`。呢個練習嘅原意就係要你用上下文選擇器，所以寫 `p strong` 先係正解。

---

### 練習 5（Exercise 5）：CSS Class Selector（類別選擇器）

#### 題目原文 (Original Question)

> "CSS Class Selector. Given lab04_5.html. (a) Create a new file and named it as lab04_5a.css. Set the CSS properties as follows: i. set the background color for the first paragraph to green. For the second paragraph: ii. set the background color for the second paragraph to red; iii. set the font color for the second paragraph to blue. For the third paragraph: iv. set the background color for the third paragraph to pink; v. set the font color for the third paragraph to yellow. (b) Add the css external file defined in (a) above, and then add appropriate class selectors to lab04_5.html. Save the file as lab04_5b.html."

#### 步驟

1 ➔ 開新檔 `lab04_5a.css`，用 **class selector** 寫三個段落各自嘅樣式。Class selector 嘅寫法係**英文句點 `.` 加 class 名**，喺 CSS 入面要「點樣叫名」完全由你決定，但**一定要同 HTML 嘅 `class` attribute 對得啱**：

> "A class selector is written as a dot followed by the class name: `.className { ... }`. It matches every element whose class attribute contains that name, e.g. `class="first"`."

```css
p.first {                       /* 揀 class="first" 嘅 <p>（寫 .first 都得，p.first 更精準） */
  background-color: green;      /* i. 第一段底色綠 */
}
p.second {
  background-color: red;        /* ii. 第二段底色紅 */
  color: blue;                  /* iii. 第二段字色藍 */
}
p.third {
  background-color: pink;       /* iv. 第三段底色粉紅 */
  color: yellow;                /* v. 第三段字色黃 */
}
```

2 ➔ 開 `lab04_5.html`，喺 `<head>` 加 `<link rel="stylesheet" href="lab04_5a.css" type="text/css" />`。

3 ➔ 喺三個 `<p>` 加 **`class` attribute**（class 名可以自由改，只要同 CSS 對得上）：第一段 `class="first"`、第二段 `class="second"`、第三段 `class="third"`，存做 `lab04_5b.html`：

```html
<body>
  <p class="first">Paragraph 1. It should be <strong>like this</strong>.</p>
  <p class="second">Paragraph 2. It should be <strong>blue foreground color, and red background color</strong>.</p>
  <p class="third">Paragraph 3. It should be <strong>yellow foreground color and transparent background color</strong>.</p>
</body>
```

**📌 答題重點**：
- Class 嘅特性係**可以重用**：同一個 class 名可以畀好多元素用（例如 10 個 `<p class="first">` 都會一齊變綠）。
- Class 選擇器語法記法：**CSS 用 `.`，HTML 用 `class="..."`**——實測最常見錯誤就係 CSS 寫 `#first` 但 HTML 用 `class="first"`（應該係 `.first`），或者兩邊個名唔同。

---

### 練習 6（Exercise 6）：CSS ID Selector（ID 選擇器）

#### 題目原文 (Original Question)

> "CSS ID Selector. Given lab04_6.html. (a) Create a new file and named it as lab04_6a.css. Set the CSS properties as follows: i. set the background color for the first paragraph to green. For the second paragraph: ii. set the background color for the second paragraph to red; iii. set the font color for the second paragraph to blue. For the third paragraph: iv. set the background color for the third paragraph to pink; v. set the font color for the third paragraph to yellow. (b) Add the css external file defined in (a) above, and then add appropriate ID selectors to lab04_6.html. Save the file as lab04_6b.html."

#### 步驟

1 ➔ 練習 6 同練習 5 嘅視覺要求**一模一樣**，分別只係改用 **ID selector**。開新檔 `lab04_6a.css`：

> "An ID selector is written as a hash (number sign) followed by the id value: `#idName { ... }`. It matches the single element whose id attribute equals that name. An id must be unique within the page."

```css
#first {
  background-color: green;   /* i. */
}
#second {
  background-color: red;     /* ii. */
  color: blue;               /* iii. */
}
#third {
  background-color: pink;    /* iv. */
  color: yellow;             /* v. */
}
```

2 ➔ 開 `lab04_6.html`，加 `<link rel="stylesheet" href="lab04_6a.css" type="text/css" />`。

3 ➔ 喺三個 `<p>` 加 **`id` attribute**（ID 名同 CSS 對應），存做 `lab04_6b.html`：

```html
<p id="first">Paragraph 1. It should be <strong>like this</strong>.</p>
<p id="second">Paragraph 2. It should be <strong>blue foreground color, and red background color</strong>.</p>
<p id="third">Paragraph 3. It should be <strong>yellow foreground color and transparent background color</strong>.</p>
```

**📌 Class vs ID 對比（實測必問）**：

| | Class Selector | ID Selector |
|---|---|---|
| CSS 寫法 | `.name`（英文句點） | `#name`（井號） |
| HTML 寫法 | `class="name"` | `id="name"` |
| 可以用幾多次 | **可重用**：一個 class 可畀多個元素用 | **每頁唯一**：一個 id 只可以出現一次 |
| Specificity | 較低 | 較高（相同條件下 `#first` 會贏 `.first`） |
| 用途 | 一班元素共用同一種樣式 | 頁面入面獨一無二嘅元素（例如 header、footer、navbar） |

> "An id must be unique within a page, while a class can be reused by many elements. ID selectors have higher specificity than class selectors."

---

### 練習 7（Exercise 7）：整合 —— About Me 網頁（HTML 標記 + External CSS）

#### 題目原文 (Original Question)

> "Open lab04_7.html with a browser, the web page looks like the following: (a) Change the codes for the html above and save the file as lab04_7a.html. i. Mark up 'About Victorial Kirst' with <h1> heading tag and all other headings with <h2> headings. ii. Add a <hr> above 'My Classes This Quarter'. iii. Add img tag to insert the two photos. iv. Add bullet and number items at appropriate place. v. The 3 url links used on the page are: http://www.imdb.com/title/tt0109830/, http://www.imdb.com/title/tt0080684/, http://www.imdb.com/title/tt0137523/. vi. Use <strong> to emphasis the word jolly, clumsy and four-eyed."
>
> "(b) Create a file lab04_7b.css such that the web page has a look similar to: i. Set the font-family of the body to 'Arial', 'Arial Black', 'Verdana'; ii. background text color: white; iii. heading text: blue; iv. heading 1 font size: 40pt; v. background color: grey; vi. text color: white; vii. strong text color: yellow."
>
> "(c) Edit your stylesheet (lab04_7c.css) to do the following: i. The hyperlinks should not have an underline by default; ii. When a user hovers over the link, the underline should appear; iii. Every paragraph should start with a drop-caps that is 3 times the size of the normal paragraph font size. (Hint: use pseudo-element) p:first-letter { font-size: 300%; }."

#### (a) 步驟：HTML 標記（lab04_7a.html）

原檔案 `lab04_7.html` 係一版「乜嘢標記都冇」嘅純文字。你要逐項砌返結構：

1 ➔ **開頭修正**：原檔第一行係 `<!DOCTYPE html">`（多咗個引號，語法錯誤），改正做 `<!DOCTYPE html>`。

2 ➔ **標題結構（i）**：「About Victorial Kirst」用 `<h1>`；「My Classes This Quarter」「My Favorite Movies」「My Moods」「Fun Facts About My Neighbors」四個全部用 `<h2>`。成頁只有一個 `<h1>`（係最高層級、最重要嘅標題）。

> "Use exactly one <h1> for the most important heading of the page; use <h2> for section headings. Headings create a logical outline, not just bigger text."

3 ➔ **加分隔線（ii）**：喺「My Classes This Quarter」之前加 `<hr />`（horizontal rule，一條水平線）。

4 ➔ **課程清單（iv）**：「My Classes This Quarter」下面嘅 4 科用**無序清單（bullet list）** `<ul>` + `<li>`。

5 ➔ **電影清單（iv）＋連結（v）**：「My Favorite Movies」下面嗰句「(I actually don't watch too many movies, so...here goes!)」係普通文字，之後 3 套戲用**有序清單（numbered list）** `<ol>` + `<li>`；每套戲名後嘅 `(IMDB)` 包喺 `<a>` 入面做連結，href 填返題目畀嘅 3 條 URL（見下面完整 code）。

6 ➔ **相片（iii）**：喺「My Moods」下面「Happy:」同「Sad:」之後各加一個 `<img>`，插入 `happy.PNG` 同 `sad.PNG`。**路徑要視乎圖片擺邊**：圖片同 HTML 同一個資料夾就寫 `src="happy.PNG"`；如果放咗喺 `images` 子資料夾（參考 `lab04_7_part_a_completed.html` 嘅做法）就寫 `src="images/happy.PNG"`。記得加 `alt` 屬性。

7 ➔ **強調字（vi）**：喺自我介紹句入面，用 `<strong>` 包住 **jolly、clumsy、four-eyed** 三個字。

**✅ 完整正確答案（lab04_7a.html）**：

```html
<!DOCTYPE html>
<html>
<head>
  <title>About Me</title>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
  <!-- (a) 淨係做 HTML 標記；連 CSS 係 (b)/(c) 嘅事 -->
</head>

<body>
  <h1>About Victorial Kirst</h1>                                <!-- i. 唯一一個 h1 -->

  <p>My name is Victorial and I am <strong>jolly</strong>,      <!-- vi. strong 強調 -->
     <strong>clumsy</strong>, and <strong>four-eyed</strong>.</p>

  <hr />                                                       <!-- ii. 水平線 -->
  <h2>My Classes This Quarter</h2>                             <!-- i. h2 -->
  <ul>                                                         <!-- iv. bullet list -->
    <li>CSE 451 - Operating Systems</li>
    <li>CSE 471 - Computer Design and Organization</li>
    <li>PHYS 121 - Physics: Mechanics</li>
    <li>CSE 498 - Research w/ Prof. Luis Ceze</li>
  </ul>

  <h2>My Favorite Movies</h2>
  <p>(I actually don't watch too many movies, so...here goes!)</p>
  <ol>                                                         <!-- iv. number list -->
    <li>The last 30 minutes of Forrest Gump
        (<a href="http://www.imdb.com/title/tt0109830/">IMDB</a>)</li>      <!-- v. URL 1 -->
    <li>Star Trek Episode V with Zazu
        (<a href="http://www.imdb.com/title/tt0080684/">IMDB</a>)</li>      <!-- v. URL 2 -->
    <li>Fight Club (not really, but I've seen like 3 movies total so this is
        my 3rd fave by technicality)
        (<a href="http://www.imdb.com/title/tt0137523/">IMDB</a>)</li>      <!-- v. URL 3 -->
  </ol>

  <h2>My Moods</h2>
  Happy: <img src="happy.PNG" alt="Happy" />                   <!-- iii. 相片 1 -->
  Sad:   <img src="sad.PNG" alt="Sad" />                       <!-- iii. 相片 2 -->

  <h2>Fun Facts About My Neighbors</h2>
  <p>Sue Smith: Effervesent is a word that describes her.</p>
  <p>Bill Thompson: Loves playing Yu-Gi-Oh.</p>

</body>
</html>
```

**📌 答題重點**：`<ul>` 出圓點 bullet、`<ol>` 出 1、2、3 數字——「bullet and number items」就係叫你兩個都用，一個幫課程（冇次序）、一個幫電影（有排名次序，啱晒用 `ol`）。

#### (b) 步驟：lab04_7b.css（填空題）

1 ➔ 開新檔 `lab04_7b.css`。題目畀咗 CSS 骨架，全部係**填空**（fill in the blanks）。逐個空對返 (b) 嘅要求 i–vii：

| 骨架空位 | 對應要求 | 正確答案 | 解說 |
|---|---|---|---|
| `body { background-color: ___; }` | v. background color: grey | `grey` | 成頁底色灰 |
| `body { color: ___; }` | vi. text color: white | `white` | 全頁文字白色 |
| `body { font-family: ___; }` | i. font-family of the body「Arial」「Arial Black」「Verdana」 | `"Arial", "Arial Black", "Verdana"` | 字體要加雙引號；瀏覽器由上到下揀第一個有嘅字體 |
| `h1 { color: ___; }` | iii. heading text: blue | `blue` | |
| `h1 { font-size: ___; }` | iv. heading 1 font size: 40pt | `40pt` | |
| `h2 { color: ___; }` | iii. heading text: blue | `blue` | 所有 heading 都藍 |
| `a { color: ___; }` | ii.（教材原句「background text color: white」為 OCR 亂碼，實際指連結文字用白色） | `white` | 灰底上面，連結用白色先睇得清 |
| `strong { color: ___; }` | vii. strong text color: yellow | `yellow` | `<strong>` 字變黃 |

> "font-family accepts a comma-separated list of fonts: the browser uses the first one installed on the user's machine, e.g. `font-family: "Arial", "Arial Black", "Verdana";`. Font names with spaces must be quoted."

2 ➔ **✅ 完整正確答案（lab04_7b.css）**：

```css
body {
  background-color: grey;                       /* v. */
  color: white;                                 /* vi. */
  font-family: "Arial", "Arial Black", "Verdana"; /* i. */
}
h1 {
  color: blue;                                  /* iii. */
  font-size: 40pt;                              /* iv. */
}
h2 {
  color: blue;                                  /* iii. */
}
a {
  color: white;                                 /* ii. 連結白色（灰底上先清楚） */
}
strong {
  color: yellow;                                /* vii. */
}
```

3 ➔ 想睇效果，就喺 (a) 個 HTML 個 `<head>` 加 `<link rel="stylesheet" href="lab04_7b.css" type="text/css" />`，重新整理頁面。

#### (c) 步驟：lab04_7c.css（Pseudo-class + Pseudo-element）

(c) 係喺 (b) 嘅基礎上「加料」：處理**超連結三態**同**首字下沉**。開新檔 `lab04_7c.css`（內容 = 7b 全部 + 下面新規則）：

1 ➔ **連結預設冇底線（i）**：要分別處理 `a:link`（未探訪）同 `a:visited`（已探訪）兩者都設 `text-decoration: none;`：

> "`:link` matches links that have not been visited yet; `:visited` matches links the user has already visited. Pseudo-classes are written with a single colon after the selector, e.g. `a:link`, `a:hover`, `a:visited`."

2 ➔ **滑鼠移過出現底線（ii）**：`a:hover` 設 `text-decoration: underline;`。

3 ➔ **首字下沉 drop caps（iii）**：用 pseudo-element `p:first-letter`，字體設做 `300%`（即正常段落字體嘅 3 倍）：

> "`p:first-letter` is a pseudo-element that selects the first letter of every paragraph; setting `font-size: 300%` makes it 3 times the size of the normal paragraph font."

4 ➔ **✅ 完整正確答案（lab04_7c.css）**：

```css
/* ===== 由 (b) 繼承落嚟嘅基本樣式 ===== */
body {
  background-color: grey;
  color: white;
  font-family: "Arial", "Arial Black", "Verdana";
}
h1 {
  color: blue;
  font-size: 40pt;
}
h2 {
  color: blue;
}
a {
  color: white;
}
strong {
  color: yellow;
}

/* ===== (c) 新加：連結三態（順序好緊要！） ===== */
a:link {                    /* 未探訪嘅連結：預設冇底線 */
  color: white;
  text-decoration: none;    /* i. 預設唔好有底線 */
}
a:visited {                 /* 已探訪嘅連結：都係冇底線 */
  color: white;
  text-decoration: none;    /* i. visited 都算「預設」，同樣冇底線 */
}
a:hover {                   /* 滑鼠移過：先至出底線 */
  text-decoration: underline;   /* ii. hover 先有底線 */
}

/* ===== (c) 新加：段落首字下沉 ===== */
p:first-letter {            /* 每段第一個字（pseudo-element） */
  font-size: 300%;          /* iii. 3 倍大 —— drop caps */
}
```

**📌 答題重點（超重要）**：
- **Pseudo-class 用單冒號 `:`**（`a:link`、`a:hover`），唔好寫雙冒號（`::` 係 pseudo-element 嘅新寫法，考試跟教材用單冒號穩陣）。
- **`a:hover` 一定要寫喺 `a:link` 同 `a:visited` 之後**——因為三者 specificity 一樣，後寫嘅規則先贏；次序錯咗 hover 底線會出唔到。
- **`text-decoration: none` 係「冇底線」；`text-decoration: underline` 係「有底線」**——兩者成日倒轉寫。

---

## 3. 💻 關鍵 HTML/CSS/JS 程式碼

> 以下係成個 Lab 最關鍵嘅完整程式碼，每段都加咗繁體中文註解。實測前背熟呢幾段，你已經贏咗大半。**本 Lab 冇 JavaScript**——Lab 4 只係「CSS 外觀」，行為（behavior）留返 Lab 7–9 先用 JS 做。

### 3.1 練習 1 完整答案（lab04_1b.html）—— Inline Style

```html
<html>
<head>
  <title>Lab 4 question 1</title>
</head>
<body>
  <!-- 第一個 <p>：底色 red、文字 pink（i、ii） -->
  <p style="background-color:red; color:pink">
    Paragraph 1 with local style.<br />
    <!-- 段內 h1：保留原底色黃/字橙，新增字體 15pt（iii） -->
    <h1 style="background-color:yellow; color:orange; font-size:15pt">This is text within header 1 style.</h1>
    <!-- 段內 h2：字藍（原本就有） -->
    <h2 style="color:blue">This is text within header 2 style.</h2>
  </p>

  <!-- 第二個 <p>：底色 green、字 yellow（iv、v）；font-size:30pt 係 (a) 原有，冇要求改就保留 -->
  <p style="background-color:green; color:yellow; font-size:30pt">
    Paragraph 2 with local style.<br />
    <!-- 段內 h1：保留字綠，新增字體 20pt（vi） -->
    <h1 style="color:green; font-size:20pt">This is text within the paragraph 2 header 1 style<br /></h1>
  </p>
</body>
</html>
```

### 3.2 練習 2 完整答案（lab04_2b.html）—— Embedded (Global) Style

```html
<html>
<head>
  <!-- Global Style Sheet：一個 <style> 控制全頁 -->
  <style type="text/css">
    body {
      font-size: 10px;          /* (a) 原有 */
      background-color: pink;   /* i. 成頁底色粉紅 */
    }
    p {
      color: blue;              /* ii. 段落文字藍 */
      font-size: 20px;          /* (a) 原有 */
      background-color: green;  /* iv. 段落底色綠 */
    }
    h1 {
      color: blue;              /* (a) 原有 */
      font-weight: bold;        /* (a) 原有 */
      font-size: 25px;          /* iii. h1 字體 25px */
    }
    h2 {
      color: yellow;            /* v. h2 字色黃 */
      background-color: pink;   /* (a) 原有（同 body 底色一樣，睇唔出，但冇要求改） */
      font-size: 20px;          /* vi. h2 字體 20px */
    }
  </style>
  <title>Lab 4 Question 2</title>
</head>
<body>
  <p>Paragraph 1 with local style.<br />
    <h1>This is text within header 1 style.</h1>
    <h2>This is text within header 2 style.</h2>
  </p>
  <p>Paragraph 2 with local style.<br />
    <h1>This is text within the paragraph 2 header 1 style<br /></h1>
  </p>
</body>
</html>
```

### 3.3 練習 3 完整答案（lab04_3a.css / lab04_3b.css + link 寫法）

**lab04_3a.css**（External CSS 檔——檔入面**唔可以有 `<style>` tag**）：

```css
body {
  font-size: 15px;      /* body 字體 15px */
  color: blue;          /* body 文字藍 */
}
p {
  color: yellow;        /* 段落文字黃 */
  background-color: pink;  /* 段落底色粉紅 */
}
h1, h2 {                /* 群組選擇器：逗號分隔，兩個一齊套用 */
  color: blue;          /* h1 同 h2 都藍色 */
}
h2 {
  font-weight: bold;    /* h2 粗體（覆蓋群組規則唔影響嘅屬性） */
}
```

**lab04_3a.html 個 `<head>`**（External 引入嘅關鍵——實測必考）：

```html
<head>
  <!-- 將外部 CSS 連入 HTML；rel 同 href 缺一不可 -->
  <link rel="stylesheet" href="lab04_3a.css" type="text/css" />
  <title>Lab 4 Question 3</title>
</head>
```

**lab04_3b.css**（(b) 修改後——注意 `h1` 規則寫喺群組規則之後覆蓋顏色）：

```css
body {
  font-size: 10px;            /* ii. body 字體改細到 10px */
  color: blue;                /* (a) 原有：文字藍 */
  background-color: yellow;   /* i. body 底色黃 */
}
p {
  color: yellow;              /* (a) 原有 */
  background-color: pink;     /* (a) 原有 */
  font-size: 20px;            /* iii. 段落字體 20px */
}
h1 {
  color: red;                 /* vi. h1 文字紅（覆蓋 h1,h2 群組嘅藍） */
  font-size: 30px;            /* iv. h1 字體 30px */
  font-weight: bold;          /* v. h1 粗體 */
}
h2 {
  color: blue;                /* (a) 原有 */
  font-weight: bold;          /* (a) 原有 */
}
```

### 3.4 練習 4 完整答案（lab04_4a.css）—— Contextual Selector

```css
/* External CSS：lab04_4a.css */
body {
  background-color: yellow;   /* i. body 底色黃 */
  font-size: 15px;            /* ii. body 字體 15px */
}
p strong {                    /* 上下文選擇器：只揀「喺 <p> 入面」嘅 <strong> */
  font-size: 20px;            /* iii. 字體 20px */
  color: red;                 /* iv. 字色紅 */
  font-weight: bold;          /* v. 粗體 */
}
```

```html
<!-- lab04_4a.html 個 <head>：加入 link -->
<head>
  <title>Selector</title>
  <link rel="stylesheet" href="lab04_4a.css" type="text/css" />
</head>
```

### 3.5 練習 5 完整答案（lab04_5a.css + lab04_5b.html）—— Class Selector

```css
/* External CSS：lab04_5a.css */
p.first {                     /* class="first" 嘅 <p>（.first 亦得） */
  background-color: green;    /* i. 第一段底色綠 */
}
p.second {
  background-color: red;      /* ii. 第二段底色紅 */
  color: blue;                /* iii. 第二段文字藍 */
}
p.third {
  background-color: pink;     /* iv. 第三段底色粉紅 */
  color: yellow;              /* v. 第三段文字黃 */
}
```

```html
<!-- lab04_5b.html：HTML 加 class attribute，同 CSS 嘅 class 名對應 -->
<html>
<head>
  <title>ex3_4.html</title>
  <link rel="stylesheet" href="lab04_5a.css" type="text/css" />
</head>
<body>
  <p class="first">Paragraph 1. It should be <strong>like this</strong>.</p>
  <p class="second">Paragraph 2. It should be <strong>blue foreground color, and red background color</strong>.</p>
  <p class="third">Paragraph 3. It should be <strong>yellow foreground color and transparent background color</strong>.</p>
</body>
</html>
```

### 3.6 練習 6 完整答案（lab04_6a.css + lab04_6b.html）—— ID Selector

```css
/* External CSS：lab04_6a.css —— 用 # 取代 . */
#first {
  background-color: green;    /* i. */
}
#second {
  background-color: red;      /* ii. */
  color: blue;                /* iii. */
}
#third {
  background-color: pink;     /* iv. */
  color: yellow;              /* v. */
}
```

```html
<!-- lab04_6b.html：HTML 加 id attribute（每頁唯一！） -->
<html>
<head>
  <title>ex3_4.html</title>
  <link rel="stylesheet" href="lab04_6a.css" type="text/css" />
</head>
<body>
  <p id="first">Paragraph 1. It should be <strong>like this</strong>.</p>
  <p id="second">Paragraph 2. It should be <strong>blue foreground color, and red background color</strong>.</p>
  <p id="third">Paragraph 3. It should be <strong>yellow foreground color and transparent background color</strong>.</p>
</body>
</html>
```

### 3.7 練習 7 完整答案（lab04_7a.html + lab04_7b.css + lab04_7c.css）

**lab04_7a.html** —— 完整 HTML（見第 2 節 (a) 嘅完整 code；記住：h1 一個、h2 四個、`<hr>` 一條、`<ul>` 一個、`<ol>` 一個、`<img>` 兩個、`<a>` 三個、`<strong>` 三個）。

**lab04_7b.css** —— 完整 CSS：

```css
/* External CSS：lab04_7b.css —— 頁面基本外觀 */
body {
  background-color: grey;                        /* v. 底色灰 */
  color: white;                                  /* vi. 文字白 */
  font-family: "Arial", "Arial Black", "Verdana";/* i. 字體清單 */
}
h1 {
  color: blue;                                   /* iii. heading 藍 */
  font-size: 40pt;                               /* iv. h1 特別大：40pt */
}
h2 {
  color: blue;                                   /* iii. h2 都藍 */
}
a {
  color: white;                                  /* 連結白色（灰底上先清楚） */
}
strong {
  color: yellow;                                 /* vii. strong 字黃 */
}
```

**lab04_7c.css** —— (b) + 連結三態 + 首字下沉：

```css
/* External CSS：lab04_7c.css —— (b) 全部 + (c) 新規則 */
body {
  background-color: grey;
  color: white;
  font-family: "Arial", "Arial Black", "Verdana";
}
h1 { color: blue; font-size: 40pt; }
h2 { color: blue; }
a   { color: white; }
strong { color: yellow; }

/* --- (c) 開始：順序 = link → visited → hover --- */
a:link {                    /* 未探訪：預設冇底線 */
  color: white;
  text-decoration: none;
}
a:visited {                 /* 已探訪：都冇底線 */
  color: white;
  text-decoration: none;
}
a:hover {                   /* hover：先出底線（一定要喺 link/visited 之後） */
  text-decoration: underline;
}

/* 每段第一個字 3 倍大：drop caps 效果 */
p:first-letter {
  font-size: 300%;
}
```

> **JS 提示**：如果實測問「CSS 同 JavaScript 點分工」——答 "CSS controls the **presentation** (how the page looks); JavaScript controls the **behavior** (what the page does)." Lab 4 唔需要寫任何 JavaScript。

---

## 4. 🐞 常見 Error 與 Debug

| Error / 問題（你見到嘅現象） | 原因 | Fix（點樣救） |
|---|---|---|
| 開 `.html` 檔變成「下載檔案」或 Notepad 內容 | 副檔名存咗做 `.txt`（例如 `lab04_1a.html.txt`） | Notepad++ 存檔揀 **Save as type: All types**，檔名打足 `.html` / `.css`；喺檔案總管開 **File name extensions** 確認 |
| 樣式完全冇效果（得返純文字） | ① `<link>` 漏咗或寫錯位置（要喺 `<head>`）② `href` 路徑錯 ③ `rel="stylesheet"` 漏咗 ④ CSS 檔同 HTML 唔喺同一資料夾 | 檢查 `<head>` 入面有冇 `<link rel="stylesheet" href="檔名.css" type="text/css" />`；確認 CSS 檔名大細階同路徑啱 |
| External CSS 冇生效，但喺 HTML 寫 inline style 就得 | `<link>` 放咗喺 `<body>` 或者 `href` 指咗去另一個資料夾 | `<link>` 一定要放 `<head>`；`href` 用相對路徑（同資料夾就淨寫檔名） |
| 改完 CSS 但瀏覽器睇唔到新效果 | 瀏覽器 cache（快取）咗舊版 | 按 **Ctrl+F5**（hard refresh）；或者開 Developer Tools（F12）→ Network 睇 CSS 檔有冇 404 |
| Class 樣式唔著 | ① CSS 寫咗 `#first` 但 HTML 用 `class="first"`（符號錯）② class 名兩邊唔一致（大細階都算唔同）③ CSS 檔冇 link | CSS 用 `.first`、HTML 用 `class="first"`，兩邊一字不差 |
| ID 樣式唔著 | ① CSS 用咗 `.first` 但 HTML 用 `id="first"` ② 頁面入面 id 重複咗 | CSS 用 `#first`、HTML 用 `id="first"`；id 每頁只可以出現一次 |
| 段落點解會「分開行」/ 樣式亂晒（Lab 1 特別常見） | `<h1>`/`<h2>` 放咗喺 `<p>` 入面——HTML 語法唔合法，瀏覽器會**自動閂咗個 `<p>`** 先處理 block 元素 | 唔好將 heading 嵌喺 `<p>` 入面；要用就用 `<div>` 包住，或用 `<span>` 做 inline |
| 字體大細冇變／變咗預設 | ① 屬性串錯：寫咗 `font` 或者 `font-size:` 後面冇單位 ② `pt`/`px`/`%` 漏咗 | 正確寫法 `font-size: 15pt;` / `20px;` / `300%;`，單位一定要有 |
| 顏色錯晒（例如想粉紅出咗紅） | ① 將 `color`（文字色）同 `background-color`（背景色）調轉 ② 拼錯顏色名 | `color` = 前景文字；`background-color` = 背景。顏色名用全小階：`red`、`pink`、`yellow`、`grey` |
| 超連結 hover 冇底線 | ① `a:hover` 寫咗喺 `a:link` 之前（次序錯）② 寫漏咗 `a:hover` 本身 ③ 用咗 `::` 雙冒號 | 次序：`a:link` → `a:visited` → `a:hover`；pseudo-class 用單冒號 `:` |
| 段落首字冇下沉效果 | ① 寫咗 `p:first-letter` 但段入面第一個字係圖片/空白 ② CSS 檔冇 link 到 | 確認段落以文字開頭；`p:first-letter { font-size: 300%; }` 放喺已 link 嘅 CSS 檔 |
| 圖片顯示唔到（得個 icon 或 alt 字） | `src` 路徑錯：圖片唔喺 HTML 同一個資料夾，或者檔名大細階錯（`happy.PNG` ≠ `happy.png`） | 圖片同 HTML 同位就 `src="happy.PNG"`；喺子資料夾就 `src="images/happy.PNG"`；用 F12 → Network 睇圖片 request 有冇 404 |
| 瀏覽器成版都係藍色底線字 | 冇設定 `a` 嘅樣式（瀏覽器預設連結藍色＋底線） | 用 `a { color: white; text-decoration: none; }`（或 7c 嘅 `a:link`/`a:visited` 規則） |
| 打 CSS 成日話 syntax error | ① 屬性同值之間用咗 `=`（應該係 `:`）② 漏咗分號 `;` 或大括號 `{}` ③ 打咗全形符號（`：`、`；`） | 格式：`selector { property: value; }`；全程用英文半形符號 |
| 註解寫到樣式失效 | 用咗 HTML 註解 `<!-- -->` 喺 CSS 檔入面 | CSS 檔要用 CSS 註解 `/* ... */`；HTML 檔先用 `<!-- ... -->` |
| 開啟頁面見到「About Victorial Kirst」喺最底/冇格式 | 漏咗用 `<h1>` 包住，或者成頁根本冇結構標記 | 跟 Exercise 7(a) checklist：h1/h2、hr、ul/ol、img、strong 逐項砌 |

**Debug 三招（實測遇事唔使慌）**：
1. **F12 → Elements（檢查器）**：㩒頁面上任何文字，右邊會顯示佢最終套用咗邊啲 CSS 同邊個檔案嚟——見唔到你預期嘅規則，就係「冇 link 到 / 選擇器打錯 / 被其他規則覆蓋」。
2. **F12 → Console（主控台）**：CSS 檔 404、HTML 語法錯誤會喺度出紅色訊息，逐個睇。
3. **逐步收窄**：懷疑邊行 CSS 出事，就喺嗰行前面加 `/* */` 註解佢再 refresh，睇下邊行令效果消失。

---

## 5. 📝 測驗常見題型 (Common Test Questions)

以下係 Practical Test / Lab Test 最常出現嘅題型同答題要點。實測通常係「開一個半完成嘅檔案，跟指示填 CSS + 存檔」，同 Lab 幾乎一樣——所以**做熟 Lab 就係最好嘅操練**。

### 題型 A：CSS 骨架填空（Fill in the blanks）—— 最常見

考官畀一個「半完成」嘅 CSS 檔，叫你填顏色／大細。例子（練習 7b 式）：

```css
body {
  background-color: ____;   /* 填 grey */
  color: ____;              /* 填 white */
  font-family: ____;        /* 填 "Arial", "Arial Black", "Verdana" */
}
```

**答題要點**：
- 顏色名（`red`、`green`、`pink`、`yellow`、`blue`、`grey`）要串啱，全小階。
- 字體大細一定要有單位（`pt`、`px`、`%`）；`font-size` 冇單位 = 錯。
- 唔識就睇返題目啲英文提示字眼：`background color` → `background-color`；`font color` → `color`；`text color` → `color`。

### 題型 B：加 `<link>` 引入外部 CSS

考官畀一個有 `<body>` 冇樣式嘅 HTML，叫你「引入 `style.css`」。

**標準答案**（放 `<head>` 內）：

```html
<head>
  <link rel="stylesheet" href="style.css" type="text/css" />
</head>
```

**答題要點**：寫得齊 `rel="stylesheet"`、`href="檔名.css"`、`type="text/css"`，位置一定係 `<head>`；`<link>` 係**空元素**（self-closing，XHTML 寫法加 `/`）。

### 題型 C：揀啱選擇器（Selector）—— 配對題／短答

考官問「想樣式只套用喺某個 id/class/element 應該用咩選擇器」。

| 想套用喺… | 選擇器寫法 | 例 |
|---|---|---|
| 所有 `<p>` | element selector | `p { ... }` |
| 所有 `<h1>` 同 `<h2>` | 群組 element | `h1, h2 { ... }` |
| `<p>` 入面嘅 `<strong>` | contextual / descendant | `p strong { ... }` |
| 一個可重用嘅 group | class selector | `.myClass { ... }` → `<p class="myClass">` |
| 頁面唯一元素 | ID selector | `#myId { ... }` → `<p id="myId">` |
| 滑鼠移過時 | pseudo-class | `a:hover { ... }` |
| 每段第一個字 | pseudo-element | `p:first-letter { ... }` |

**答題要點**：`.` = class（可重用）、`#` = id（唯一）、空格 = 後代關係、`:` = pseudo。口訣：**「點（class）井（id）空格（後代）冒號（偽）」**。

### 題型 D：邊個 CSS 會贏？（Priority / Cascade）

考官問「元素同時中咗 inline、embedded、external 三個樣式，邊個話事？」

**標準答案框架（記住呢幾句英文答題句）**：

> "Inline styles (the style attribute) have the highest priority. Among selectors, an ID selector (#) is more specific than a class selector (.), which is more specific than an element selector. When two rules have equal specificity, the one declared later (source order) wins."

- 優先次序（唔計 `!important`）：**Inline style > ID (#) > Class (.) / pseudo-class > Element (tag)**；同等 specificity 就**後寫先贏**。
- 例：`<p id="x" class="y">` 同時有 `#x { color: red }` 同 `.y { color: blue }` → 紅色贏（ID 更 specific）。
- 練習 3 嘅 `h1 { color: red }` 要寫喺 `h1, h2 { color: blue }` 之後，正正就係「同等 specificity 後寫贏」。

### 題型 E：睇描述寫 Inline Style（練習 1 式）

考官畀 HTML，叫你「將呢段底色設做紅色、文字粉紅」。答案：喺 tag 加

```html
<p style="background-color:red; color:pink">
```

**答題要點**：`style` attribute 入面係 CSS declaration，用 `:` 唔係 `=`，多過一個屬性用 `;` 分隔。

### 題型 F：Pseudo-class 三態 + 首字下沉（練習 7c 式）

考官問「點樣令連結預設冇底線、hover 有底線」或「點樣整 drop caps」。

**標準答案**：

```css
a:link { text-decoration: none; }     /* 未探訪：冇底線（預設） */
a:visited { text-decoration: none; }  /* 已探訪：都冇底線 */
a:hover { text-decoration: underline; }  /* hover：有底線 */
p:first-letter { font-size: 300%; }   /* 首字下沉：3 倍大 */
```

**答題要點**：hover 規則最後寫；`300%` 係相對正常段落字體（3 倍 = 300%）；呢個 lab 用單冒號 `:`。

### 題型 G：Class vs ID 概念題（短答／MC）

常見問法：
- "Can the same id be used twice in one page?" → **No, an id must be unique.**
- "Can the same class be applied to many elements?" → **Yes, a class can be reused.**
- "Which has higher priority, `#intro` or `.intro`?" → **`#intro` (ID selector is more specific).**

### 題型 H：HTML 標記題（練習 7 式）—— 砌結構

考官畀純文字版面，叫你標記。**檢查清單（每樣都可能有分）**：
- [ ] 一個 `<h1>` + 其餘 `<h2>`（唔可以兩個 h1）
- [ ] `<hr />` 喺指定位置（水平線）
- [ ] 冇次序內容用 `<ul>` + `<li>`；有次序用 `<ol>` + `<li>`
- [ ] `<img src="..." alt="..." />`（`alt` 一定要有）
- [ ] `<a href="完整 URL">連結文字</a>`
- [ ] `<strong>` 包住要強調嘅字（jolly、clumsy、four-eyed）
- [ ] `<title>`、`<head>`、`<body>`、`<!DOCTYPE html>` 完整

### 實測時間分配建議（60–90 分鐘）

| 階段 | 時間 | 做咩 |
|---|---|---|
| 1. 睇題 | 5 分鐘 | 圈低每個 Exercise 要交嘅**檔名**同**顏色/大小要求** |
| 2. 做 1–3（三種 CSS 引入方式） | 15–20 分鐘 | 呢啲係基本功，快而準 |
| 3. 做 4–6（三種選擇器） | 15–20 分鐘 | 揀啱 `.` / `#` / 空格 |
| 4. 做 7（整合大題） | 20–30 分鐘 | 最多分，慢慢砌 |
| 5. 檢查 | 10 分鐘 | 每個檔案喺 Chrome 開一次，對住「Deliverables 清單」逐個交 |

---

## 6. 🔗 理論 Recap（本 Lab 理論速覽）

一句講晒：HTML 負責「內容結構」，CSS 負責「外觀呈現」，兩者分開（separation of content and presentation）；CSS 可以喺三個層次套用（inline `style` attribute、embedded `<style>`、external `<link>`），而「邊條規則最後話事」由 **cascade（層疊次序）＋ specificity（選擇器精準度）** 決定。選擇器由簡到專：element（`p`）→ contextual（`p strong`）→ class（`.name`）→ ID（`#name`）→ pseudo（`:link`/`:hover`/`:visited`、`p:first-letter`）；`#` 比 `.` 精準、同等精準就後寫贏、inline 最優先。`color` 管文字色、`background-color` 管底色、`font-size` 要帶單位（`pt`/`px`/`%`）、`font-family` 要畀字體清單、`font-weight: bold` 粗體、`text-decoration: none/underline` 控制有冇底線。實測就係將呢套嘢喺瀏覽器度「砌」出嚟，所以做熟 Lab 1–7 嘅每個檔案，等於拎晒分。

> "HTML defines the structure and content of a web page; CSS defines its presentation."
> "CSS can be applied inline (style attribute), embedded (<style> in <head>), or externally (<link> to a .css file)."
> "Inline styles have the highest priority; then ID selectors, then class selectors, then element selectors; with equal specificity, the later rule wins."
> "A contextual selector like `p strong` matches an element only inside another; a class (`.name`) can be reused; an ID (`#name`) must be unique."
> "Pseudo-classes (`:link`, `:visited`, `:hover`) style link states; the pseudo-element `p:first-letter` styles the first letter of each paragraph."

### 本 Lab 關鍵詞速查表

| 概念 | 英文關鍵句／寫法 | 中文提示 |
|---|---|---|
| Local / Inline | `<p style="color:pink">` | 逐個 tag 寫 |
| Global / Embedded | `<style> ... </style>` 喺 `<head>` | 一頁一套 |
| External | `<link rel="stylesheet" href="x.css" type="text/css" />` | 全站共用 |
| Element selector | `p { }`、`h1 { }` | 揀所有同類 tag |
| Contextual selector | `p strong { }` | 祖先 空格 後代 |
| Class selector | `.name { }` ↔ `class="name"` | 可重用、CSS 用點 |
| ID selector | `#name { }` ↔ `id="name"` | 唯一、CSS 用井 |
| Pseudo-class | `a:link`、`a:visited`、`a:hover` | 狀態（單冒號） |
| Pseudo-element | `p:first-letter { font-size: 300% }` | 首字下沉 drop caps |
| 前景色 | `color` | 文字顏色 |
| 背景色 | `background-color` | 底色 |
| 字體大小 | `font-size: 15pt / 20px / 300%` | 一定要有單位 |
| 字體 | `font-family: "Arial", "Verdana"` | 有空格要加引號 |
| 粗體 | `font-weight: bold` | |
| 底線 | `text-decoration: none / underline` | none = 冇底線 |
| 群組選擇器 | `h1, h2 { }` | 逗號分隔 |

---

> **臨場貼士**：實測開考前，用 5 分鐘默寫一次「`<link>` 四件套」（`rel`、`href`、`type`、放 `<head>`）、「`.name` vs `#name`」同「`a:link → a:visited → a:hover` 次序」。呢三樣寫啱，Lab 4 八成題目已經穩陣。祝實測順利！🚀
