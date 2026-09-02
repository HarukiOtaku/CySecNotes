# ITE3006 IT Essentials — Final Cheat Sheet（考前極速總複習）

> **課程一句話**：本課程為 Web 前端開發入門——用 **HTML** 描述網頁的**內容與結構**、**CSS** 描述**外觀與版面**、**JavaScript** 提供**行為與互動**，最後以**表單驗證**在提交前把關資料。

### 🗺️ 概念圖：Web 開發四大支柱

```text
HTML(結構 content) ──▶ CSS(樣式 presentation) ──▶ JavaScript(行為 behavior) ──▶ 表單驗證(submission gate)
```

| 支柱 | 技術 | 角色 | 應試一句 |
|---|---|---|---|
| ① 結構 | HTML | markup language，描述網頁內容 | "HTML is a markup language, not a programming language." |
| ② 樣式 | CSS | Cascading Style Sheet，描述 appearance / layout / presentation | "CSS = HOW to display; HTML = WHAT is displayed." |
| ③ 行為 | JavaScript | client-side scripting language，event-driven | "React to user's actions — event-driven." |
| ④ 把關 | 表單驗證（HTML5 + JS） | 提交前驗證表單資料 | "Validate form data prior to submission." |

**背誦策略**：定義講英文（Definition in English）、解釋用中文、例子默 HTML / CSS / JS。各節附易錯點與英文必背句。

**速覽目錄**：① HTML 基礎精華（L1–L3）｜② CSS 精華（L4–L6）｜③ JavaScript 精華（L7–L9）｜④ Lab 實務精華（Lab02–Lab09）｜⑤ 最後 60 秒自測清單

---

## ① HTML 基礎精華（L1–L3）

### 1. 文件結構與 Tag 語法

```html
<html>
  <head>
    <title>頁面標題</title>
    <meta name="description" content="..." />
    <meta name="keywords" content="..." />
  </head>
  <body> 顯示內容 text / links / graphics </body>
</html>
```

| Tag / 概念 | 要點 | 英文一句背 |
|---|---|---|
| `<html>` | 根元素，識別文件為 HTML | "Identifies the document type as HTML." |
| `<head>` | 文件資料（title / meta），**不顯示** | "Contains document information; not displayed." |
| `<body>` | 文字、連結、圖形，**顯示** | "Contains the text, links and graphics shown on the page." |
| start / end tag | 成對出現：先 start 後 end | "Tags come in pairs: start tag then end tag." |
| attribute | start tag 內的 name/value pair，如 `<font size="12">` | "Attributes are name/value pairs in the start tag." |
| 大小寫 | HTML 不分大小寫；**應用小寫**（XHTML 規定） | "Not case sensitive, but use lower case for XHTML." |
| 註解 | `<!-- comment -->`，瀏覽器忽略 | "Comments aid readability; ignored by browsers." |
| HTML 本質 | markup language，**不是** programming language；副檔名 `.htm` / `.html` | "HTML is a markup language, not a programming language." |
| XML / XHTML | XML 管資料（可自訂 tag、分離 data 與 presentation）；XHTML 1.0 = HTML 4.0 以 XML 應用形式重寫 | "XML separates data from presentation." |

### 2. 文字格式、對齊與 `<hr />`

| Tag | 作用 | 口訣 |
|---|---|---|
| `<h1>`–`<h6>` | 標題：h1 最大、h6 最小 | "h1 biggest, h6 smallest" |
| `<p>` | 段落（**有**結束標籤） | paragraph |
| `<br />` | 換行（**無**結束標籤，`</br>` 不存在） | "break has no buddy" |
| `<pre>` | 預格式文字：保留空格與換行 | preformatted |
| `<b>` `<i>` `<u>` | 粗體 / 斜體 / 底線（physical styles） | |
| `<sub>` `<sup>` | 下標 / 上標 | |
| `<big>` `<tt>` | 放大 / 等寬字 | |

- XHTML 相容：`<br>` 要寫成 `<br />`（space + forward slash）。
- 對齊：單一元素用 `align="left"` / `"right"` / `"center"`；整塊用 `<div align="center">`（**寫一次、可對齊任何 block element**）；行內細段用 `<span>`（包圍個別字詞）。

**`<hr />` 三屬性（ASW，背預設值）**

| 屬性 | 作用 | 預設值 |
|---|---|---|
| `align` | 對齊位置 | `center` |
| `size` | 粗幼（pixels） | `2` |
| `width` | 闊度（pixels 或 %） | `100%` |

### 3. 字符實體

規則：以 `&` 開始、`;` 結束、**名稱 case sensitive**。

| 想顯示 | Entity | 記憶 |
|---|---|---|
| `<` | `&lt;` | Less Than（開口向左） |
| `>` | `&gt;` | Greater Than |
| `&` | `&amp;` | AMPersand |
| 不換行空格 | `&nbsp;` | Non-Breaking |
| © / ® | `&copy;` / `&reg;` | Copyright / Registered |
| `"` | `&quot;` | double quote |
| emoji 等 | `&#x1F60D;` | numeric reference（`&#x...;` = hex；十進制 `&#169;`） |

### 4. 超連結（四種引用）

| 種類 | 寫法 | 說明 |
|---|---|---|
| Absolute | `href="http://www.vtc.edu.hk"` | 完整 URL 含 `http://`，指向另一伺服器 |
| Relative（同目錄） | `href="test.html"` | 在目前頁面目錄找檔名 |
| Relative（路徑） | `href="./var/test2.html"` | `./` 由目前目錄出發 |
| Anchor 錨點 | `href="#xyz"` ↔ `<a name="xyz"></a>` | 頁內跳轉，兩者配合 |

### 5. HTML5 快覽

- 背景：**W3C + WHATWG** 合作（2006 年同意合作）。
- 設計規則：新功能基於 HTML / CSS / DOM / JavaScript；減少 external plugins（如 Flash）；better error handling；更多 markup 取代 scripting；device independent。
- Doctype 只有一個且極簡：`<!DOCTYPE html>`（舊版 XHTML 才要長宣告）。
- 語義標籤：`<header>`（文件或區段頁首，**一份文件可多個**）、`<article>`（self-contained 獨立內容）、`<time datetime="2011-03-15">`（機器可讀日期時間）。

### 6. 列表 Lists

```html
<ol><li>Coffee</li><li>Tea</li></ol>   <!-- numbered markers 1. 2. -->
<ul><li>Milk</li><li>Juice</li></ul>   <!-- bulleted markers • -->
```

- "**O**rdered → **o**ne-two-three；**U**nordered → **u**nmarked dots"。
- `<li>` 必須放在 `<ol>` / `<ul>` 容器內（不可直放 `<body>`）。

### 7. 表格 Tables

本質：**"a rectangular grid of cells"**（列表只能單欄，做唔到多欄）。兩大用途：**table for information**（行列展示資料）／**table for layout**（`border="0"` 隱框分割版面，CSS 前主流做法）。

**`<table>` 六大屬性**

| 屬性 | 作用 | 值 / 單位 |
|---|---|---|
| `border` | 外框線粗幼 | pixels |
| `width` | 表格或 `th` / `td` 寬度 | pixels 或 % of screen width |
| `align` | **整張表格**靠左 / 右 / 中 | `left` / `right` / `center` |
| `cellspacing` | **格與格之間**距離 | pixels |
| `cellpadding` | **格邊緣到內容**內距 | pixels（瀏覽器預設 1px） |
| `bgcolor` | 背景色 | color name（`"white"`）或 `#RRGGBB` hex |

口訣：**S**pacing = space **between** cells；**P**adding = padding **inside** cell。

**內部標籤巢狀次序（不可跳級）**：`<table>` ➔ `<caption>` / `<tr>` ➔ `<th>` / `<td>`

- `<caption>` 表格標題；`<tr>` = table row 每列；`<th>` = table heading 欄標題格（預設粗體置中）；`<td>` = table data 資料格；格內可用 `<br />` 換行。
- 格內對齊：`align` = **水平** left / right / center（"a" = across）；`valign` = **垂直** top / bottom / middle（"v" = vertical）。

**rowspan / colspan（數值含自身一格）**

| 屬性 | 合併方向 | 規則 |
|---|---|---|
| `colspan="2"` | 向右 | 覆蓋本身 + 右邊 1 格 |
| `rowspan="4"` | 向下 | 覆蓋本身 1 列 + 下面 3 列；之後 3 列**毋須再寫該格** |

驗證黃金法則：**任何時候整張表每列欄數必須一致**。

### 8. 圖片與 iframe

**`<img />` — empty element（無內容、無 `</img>` 結束標籤）**

| 屬性 | 作用 |
|---|---|
| `src` | 圖檔名或 URL（相對路徑 / 絕對） |
| `width` / `height` | 顯示尺寸（pixels，可 rescale） |
| `border` | 邊框粗幼（pixels） |
| `alt` | 圖片無法顯示時的替代文字 |

- 格式：GIF / JPEG / PNG。口訣："Images have **S**ource, **S**ize, **S**tyle-border and **A**lt-text"。

**Image Link（圖片超連結）**

```html
<a href="xx.html"><img src="pic.jpg" border="0" /></a>
```

- `<a>` 包住 `<img />`；圖片連結**無底線、不變色**，但可能有邊框 → 用 `border="0"` 移除。

**`<iframe>`（floating / internal frame）**

| 屬性 | 作用 |
|---|---|
| `src="URL"` | 框內載入的檔案 |
| `frameborder` | `"yes"` 顯示框 / `"no"` 不顯示（**字串 yes/no，不是 1/0**） |
| `marginwidth` / `marginheight` | 框內左右／上下邊界 |
| `name` | 給框架命名 |

- 關鍵機制：`<iframe name="reason">` + `<a href="..." target="reason">` —— **target 值 = iframe 的 name 值**，連結內容在框內載入，主頁不跳轉。

### 9. Form 基礎與 `<form>` 屬性

`<form>` 收集 user input；form elements 四類標籤：`<input>`、`<select>` + `<option>`、`<textarea>`、`<button>`。

| `<form>` 屬性 | 作用 | 預設值 | 關鍵字 |
|---|---|---|---|
| `action` | 提交目的地 URL | 當前頁面 | destination |
| `method` | HTTP 方法 | `get` | get = `?` 附加 URL；post = body |
| `enctype` | 資料編碼 | `application/x-www-form-urlencoded` | file upload → `multipart/form-data` |
| `name` | 表單識別名 | 無 | 給 JavaScript 取回 form |

**GET vs POST**："**G**ET goes **?** into the **U**RL; **P**OST puts data in the **B**ody."

- GET：資料以 `?` 附加在 URL（query string，可書籤、有長度限制、不適合敏感資料）。
- POST：資料放入 request body（URL 不可見、無長度限制、較安全）。
- File upload 三件套（缺一不可）：`type="file"` + `method="post"` + `enctype="multipart/form-data"`。

### 10. `<input>` 十種基本 type

| type | 用途 | 應試關鍵 |
|---|---|---|
| `text` | 單行文字 single-line text field | 最常用 |
| `password` | 密碼，字元 masked（傳送仍明文） | characters are masked |
| `radio` | 單選 | 同一 `name` = 一組只揀一個；**不能 uncheck**；必須給 `value` |
| `checkbox` | 複選 | 可揀多個；`name="lang[]"` 令伺服器收到 array |
| `file` | 上載檔案（Browse 按鈕） | 要 POST + multipart/form-data |
| `hidden` | 隱藏欄位，用戶看不見但**會提交** | value 可被 JavaScript 改動 |
| `submit` | 送出表單資料 | `<input>` 或 `<button type="submit">` |
| `reset` | 還原所有欄位到**預設值**（不是清空） | 不送出資料 |
| `button` | 普通按鈕，觸發 JS | 通常配 `onclick` |
| `image` | 圖片版 submit | 提交連同 click 座標 (x, y) → server-side image map |

口訣："**R**adio = **o**ne **o**f the group；**C**heckbox = **c**hoose many."

### 11. 下拉清單與表單分組

- `<select>` + `<option>`：option 的 `value` 是送出值，標籤間文字是顯示文字。
- `multiple="multiple"`：多選（Ctrl+Click / Cmd+Click）；`size="n"`：同時顯示 n 個 option（變可捲動清單）。
- `<optgroup label="Fruit">`：把相關 option 分組，label 為灰色不可選組標題。
- `<fieldset>` 在相關欄位外畫框；`<legend>` 是框的標題（左上角）。
- `<label for="lname">` 綁定 `<input id="lname">`：**for 綁 id（不是 name）**；或直接把 input 包進 `<label>`。好處：點 label = 點 input；screen reader 讀出文字 → accessibility。

```html
<label for="lname">Last Name</label>
<input type="text" name="lastname" id="lname" />
```

### 12. 預設值與通用屬性

**設預設值四兄弟（背熟，易撈亂）**

| 元素 | 用哪個 | 例子 |
|---|---|---|
| radio / checkbox | `checked="checked"` | `<input type="radio" checked="checked" />` |
| option | `selected="selected"` | `<option selected="selected">HD</option>` |
| text 等 input | `value="..."` | `<input type="text" value="Chan Tai Man" />` |
| textarea | **標籤之間內容**（textarea 沒有 value 屬性） | `<textarea rows="4" cols="40">...default...</textarea>` |

**通用屬性**

| 屬性 | 作用 | 關鍵 |
|---|---|---|
| `name` | 欄位識別名 | JS / server 靠 name reference；無 name（除 submit 外）不會被送出 |
| `value` | 初始值 initial value | 用戶可改 |
| `readonly` | 只讀，用戶改不到 | **仍會被提交** |
| `disabled` | un-usable + un-clickable（變灰） | **不會被提交** ← 最常考 |
| `size` | 顯示闊度（**字元數**） | ⚠️ 與 select 的 size（顯示 option 數）不同 |
| `maxlength` | 最多可輸入字元數 | 超出入不到 |

口訣："**R**eadonly = read but still **R**eported；**D**isabled = **D**ead and **D**ropped."

### 13. HTML5 新 input types

共通答題句：效果 **"depending on browser support"**（不支援的瀏覽器當普通 text field，頁面不壞）。

| 系列 | types | 重點 |
|---|---|---|
| 顏色 | `color` | 值必須 hex：`#` + 三組兩位數（`#RRGGBB`，如 `#FF8040`）；彈 color picker |
| 日期時間 | `date` `time` `datetime` `datetime-local` `month` `week` | 彈 date/time picker |
| 數字 | `number` | 只收數字；可用 `min` / `max` / `step` 限制 |
| 範圍 | `range` | slider 拉桿；**預設範圍 0–100**（可設 min / max） |
| 電話 | `tel` | 格式差異大 → 當普通 text、**不自動驗證**；用 `pattern="[0-9]{8}"` 驗證；優化手機鍵盤 |
| 電郵 / 網址 | `email` / `url` | 瀏覽器自動做格式驗證 |
| 搜尋 | `search` | 行為似 text；Chrome 有「交叉」清除；`results="2"`（Safari 近期搜尋數） |

口訣：「Color 色、Calendar 期、Count 數、Contact 聯絡、Search 搵」。

### 14. datalist 與 output

```html
<!-- datalist 自動完成：input 的 list = datalist 的 id -->
<input list="campus" />
<datalist id="campus"><option value="Tsing Yi" /></datalist>

<!-- output 即時計算 -->
<form oninput="total.value = parseInt(a.value) + parseInt(b.value)">
  <input type="range" id="a" /> + <input type="number" id="b" value="50" />
  = <output name="total" for="a b"></output>
</form>
```

- `<datalist>`：提供預定義選項 + autocomplete；**用戶仍可自由輸入**（select 只能揀）——"input **list** = datalist **id**"。
- `<output>`：代表計算結果；預設值放標籤之間（`<output>0</output>`）；`for` = 空格分隔的參與計算元素 id 清單。
- JS 語法速查：`oninput` = 用戶改變 input 值時執行；`parseInt(x.value)` 字串 → 整數（防 "1"+"2"="12"）；`a.value` / `total.value` 以 id / name 取回元素值並寫入；`document.forms["name"]` 用 form 的 name 取回 form。

### 15. HTML 易錯點精選（Top 15）

1. `<br>` 無結束標籤；XHTML 寫 `<br />`（space + slash）；`<p>` 有結束標籤。
2. HTML tag 不分大小寫，但要小寫（XHTML 要求）。
3. `<head>` 不顯示、`<body>` 顯示；meta description / keywords 供搜尋引擎 index。
4. 顯示 `<` 要用 `&lt;`、顯示 `&` 要用 `&amp;`（直接寫會被當 tag / entity 起頭）。
5. `<hr>` 預設：align = center、size = 2、width = 100%（ASW）。
6. `<li>` 不能獨立於 `<ol>` / `<ul>` 存在。
7. `cellspacing` = 格與格之間；`cellpadding` = 格內（預設 1px）。
8. 格內：`align` 水平（left / right / center）、`valign` 垂直（top / bottom / middle）；`<table align>` 才是整表位置。
9. `colspan="2"` / `rowspan="4"` 數字**含自身**；rowspan 之後幾列要省寫該格；每列欄數必須一致。
10. `<img />` 是 empty element（無 `</img>`）；`alt` = 圖片顯示不到時的文字。
11. Image link 無底線不變色，預設可能有邊框 → `border="0"`。
12. iframe 的 `frameborder` 值是字串 `"yes"` / `"no"`；`name` 與連結 `target` 必須相同。
13. Radio 同 `name` 一組、不能 uncheck；checkbox 可多選；`name="x[]"` 收 array。
14. file upload：POST + `multipart/form-data` 缺一不可；`method` 預設 `get`、`enctype` 預設 `application/x-www-form-urlencoded`。
15. 設預設值：radio / checkbox 用 `checked`、option 用 `selected`、text 用 `value`、textarea 用內容；`size` 雙重意思（input = 字元數、select = option 數）；`<label for>` 綁 `id`、提交才用 `name`；reset 是還原預設值不是清空；`parseInt()` 防止字串拼接。

### 16. HTML 英文必背句

1. "A web page is a web document designed to be displayed in a web browser on the World Wide Web."
2. "HTML is a markup language, not a programming language." / "HTML is the set of markup elements or tags placed in a file intended for display on a web browser."
3. "XML is a text-based language designed to describe, deliver and exchange structured information; it separates data from presentation."
4. "XHTML 1.0 is HTML 4.0 developed as an application of XML, combining HTML formatting with XML structure and extensibility."
5. "An HTML document contains at least three tags: `<html>`, `<head>` (not displayed) and `<body>` (displayed)."
6. "`<br>` has no closing tag; in XHTML it is written as `<br />` with a space and a forward slash."
7. "A table should be considered as a rectangular grid of cells; cells may be joined with rowspan or colspan."
8. "Radio buttons with the same name allow only one choice and cannot be unchecked; checkboxes allow one or more options."
9. "With GET the form data are appended to the action URI after a '?'; with POST the data are included in the body of the request."
10. "Data in a disabled field will not be submitted, but a readonly field is still submitted."
11. "The behaviour of new HTML5 input types (color, date, range, tel, email, url, search, ...) depends on browser support."
12. "HTML5 is a cooperation between the W3C and WHATWG; its doctype is simply `<!DOCTYPE html>`."

---

## ② CSS 精華（L4–L6）

### L4 CSS Fundamentals

**定義（必背）**：**CSS** (Cascading Style Sheet) describes the **appearance, layout and presentation** of information on a web page；HTML describes the **content**。→ CSS = **HOW to display**；HTML = **WHAT** is displayed。

- 兩大優點：(1) **Separate content from presentation**；(2) Define the appearance and layout of all pages in a **single place**（改一處、全站生效）。
- **Cascade** = a **hierarchy of style information**；樣式由父元素 **inherited**、由高層傳落低層。
- HTML 限制：外觀標籤（`<i>` `<b>` `<font face="courier" color="#001111">`）能力有限；content & appearance 愈纏愈埋；不同瀏覽器顯示不一。

**Rule 語法（S-P-V）**

```css
selector { property: value; property2: value2; }
```

- 值 **no quotes**；property:value 配對之間要有 `;`（最後一對可省）；`:` / `;` 後空格可有可無。
- 註解：`/* ... */`（單行或跨行都得）。

**三種加入樣式（常考比較）**

| 方法 | 寫法 | 影響範圍 | 記憶 |
|---|---|---|---|
| Local (inline) | `<p style="font-size:20pt">` | 只該標籤 | 少量 markup 方便；樣式散落難維護 |
| Global (embedded) | `<head>` 內 `<style type="text/css">` | 成個 document | 改一次全頁嗰種 tag 自動更新；HTML 更乾淨 |
| External | `<head>` 內 `<link rel="stylesheet" type="text/css" href="mystyle.css">` | 所有連結頁面 | `.css` 檔 **only style rules**；content 與 format 完全分離；多頁網站最好 |

**選擇器速查（selector = pattern matched against document tree）**

| 選擇器 | 寫法 | 命中 |
|---|---|---|
| Element | `p { }` | 所有 `<p>`（every instance） |
| Multiple | `em, i { }` | `<em>` 同 `<i>`（逗號 = 並列共用規則） |
| Universal | `* { }` | any and all elements |
| Contextual (descendant) | `li em { }` | 喺 `<li>` 內嘅 `<em>`——**無逗號**（有逗號變 multiple） |
| Class | `.newstyle { }` | 任何 `class="newstyle"`（`.` = 可重用） |
| Tag + Class | `h1.newstyle { }` | 係 `<h1>` 且有該 class（無空格連寫） |
| ID | `#red_text { }` | `id="red_text"`——全頁 **only once**（`#` = 唯一） |
| Pseudo-class | `a:link` `a:visited` `a:hover` `a:active` | 連結四狀態（未訪 / 已訪 / 啟用 / 指住） |

- Specificity：**ID `#` ＞ Class `.` ＞ Element ＞ Universal `*`**；衝突時 **last one overrides earlier ones**。

**顏色 / 背景**

- `color` = 文字色；`background-color` = 元素背後色；`background-image: url(相對路徑或完整URL)`。
- 色名（16 個）+ Hex **`#RRGGBB`**（base-16；`#000000` = 黑 → `#FFFFFF` = 白）。
- `color` / `background-color` 均可用 color names 或 hex codes。

**字型屬性（F-S-S-W: Family Size Style Weight）**

- `font-family: "Garamond", "Times New Roman", serif;` = 多字型 **highest → lowest priority** fallback；generic 兜底：serif / sans-serif / cursive / fantasy / monospace。
- `font-size` 單位：**`pt`** = point，1 pt = 1/72 吋；**`px`** = pixel；**`em`** = m-width，1 em = 字型當前 size（相對）；vague：xx-small → xx-large（中間必經 medium）。
- `font-style: italic | normal`（斜體開關）；`font-weight: bold | normal`（粗體開關）；設 `normal` 即關閉。

**文字屬性**

- `text-align: left | right | center | justify`（justify 拉闊所有完整行至佔滿全寬）。
- `text-decoration: underline | overline | line-through | none`；效果可組合（`overline underline`）；去連結底線：`a:link, a:visited, a:active { text-decoration: none; }`。
- `line-height`：數字 = 字型大小 × 數字；百分比相對字型大小；**負數唔准**；`200%` = 雙倍行距。
- `text-indent`：每段第一行縮排。

### L5 CSS Effects

**CSS3 基礎**

- CSS3 = **new version** of CSS，支援 more appealing visual effects；**backward-compatible**（browsers will always continue to support CSS2 in addition to CSS3）。
- 拆成 **modules**：Backgrounds and Borders、2D/3D Transformations、Animations。
- Browser prefixes（口訣 M-S-O-M）：**`-moz-`** = Mozilla Firefox；**`-webkit-`** = Safari + Google Chrome（WebKit）；**`-o-`** = Opera；**`-ms-`** = Microsoft IE。

**`<div>` vs `<span>` 與 block / inline**

| | `<div>` | `<span>` |
|---|---|---|
| 用途 | 控制 blocks of text（成塊格式 / 行為） | inline format changes（行內局部修改） |
| 類型 | **block** element | **inline** element |

- **Block**：occupies the **entire width** of the browser + next element **starts on a new line**；例 `<div> <p> <form> <h1> <ul>`（D-P-F-H-U）。
- **Inline**：fit into the **regular flow of text**、行尾 automatically wrap；例 `<span> <a> <input> <img>`（S-A-I-I）。

**Box Model（由內到外）**

**Content → Padding → Border → Margin**（C-P-B-M：「Coffee Please Before Me」）

- `padding` 包住 content（content 與 border 之間）；`border` 包住 content + padding；`margin` 喺 border 以外、與其他元素隔開。

**Border 與圓角**

- Border 必須指定三樣：**width、style、color**（缺 style 就唔顯示）。
- 長寫法：`border-width: 5px; border-style: dotted; border-color: blue;`
- 短寫法：`border: 5px dotted blue;`（順序永遠 **width style color**）；style：`solid`（實線）`dotted`（點線）`dashed`（虛線）。
- `border-radius: 25px;` = 四角同值；`border-radius: 15px 60px 30px 0px;` = 由**左上順時針 TL → TR → BR → BL**（0px = 直角）。

**padding / margin 縮寫（順序永遠 TRouBLe = Top Right Bottom Left，由頂順時針；兩者寫法一樣）**

| 值數 | 意思 |
|---|---|
| 1 值 | 四邊相同 |
| 2 值 | top/bottom、left/right |
| 3 值 | top、left/right、bottom |
| 4 值 | top、right、bottom、left |

**display / overflow**

- `display: block` = like `<div>`（佔全寬開新行）；`inline` = default（黐埋一行）；`inline-block` = **"A block sitting on a line"**（可設尺寸又同行並排）；`none` = **Hide**（唔顯示、唔佔空間）。
- `overflow`（內容放唔落設死 size 嘅 box）：`visible`（**default**，溢出照顯示喺盒外）、`hidden`（剪走）、`scroll`（一定有 scrollbar）、`auto`（有需要先加）。

**陰影 / 透明度**

- `text-shadow`（文字）同 `box-shadow`（盒仔）結構一樣：**x-offset y-offset blur-radius color**，例 `text-shadow: 2px 2px 5px gray;`。
- `opacity: 0.0–1.0`；**the lower the value, the more transparent**（0.0 全透明、1.0 全實色）。

**2D Transform（`transform` 屬性）**

| 方法 | 功能 | 例 |
|---|---|---|
| translate(x, y) | 由現時位置移動（相對位移） | `translate(30px, 45px)` |
| rotate(deg) | 旋轉；**正數 = clockwise、負數 = counter-clockwise** | `rotate(5deg)` / `rotate(-20deg)` |
| scale(n) | 倍數縮放；1 = 原大、>1 放大、<1 縮小 | `scale(1.25)` / `scale(0.75)` |
| skew(deg) | 沿軸斜切（變平行四邊形） | `skew(15deg, 15deg)` |

- 單軸版：`translateX/Y`、`scaleX/Y`、`skewX/Y`；**第一參數永遠 = X、第二參數永遠 = Y**。
- `transform-origin`：教材口徑——default 繞元素**左上角 (upper-left corner)**；`transform-origin: 50% 50%;` = 繞**中心**。
- `:hover` = mouse over（滑鼠移過元素上方時套用）。

**Transition（過渡）**

- 要件兩樣：**(1) the CSS property you want to add an effect to + (2) the duration of the effect**。
- 例：`transition: width 2s;` 配 `div:hover { width: 300px; }` → hover 時 2 秒平滑變闊；冇狀態改變就冇過渡。

### L6 Page Layout

**四種 Layout（按瀏覽器寬度改變時嘅反應分類）**

| 類型 | 單位 | 反應 | 記憶 |
|---|---|---|---|
| Static (Fixed) | 固定 px | 唔變 | 手機 cut off + **horizontal scrollbar**（最唔友善） |
| Liquid (Fluid) | 相對單位（%） | 隨視窗伸縮 | 太大 / 太細視窗效果差 |
| Adaptive | media queries 內幾組 **fixed widths** | 分段切換固定版面 | 偵測寬度 → 切版本 |
| Responsive | 相對單位 **+** media queries | 平時似 liquid flex；過 media query 界線大幅變陣 | 終極推薦 |

**display / margin:auto / float / clear**

- 每個元素有 default display 值：block 或 inline。**Block-level**（`<div> <h1> <p> <form>`）：always **starts on a new line** + takes up the **full width available**；**inline**（`<span> <img> <a>`）：唔開新行、only takes up **as much width as necessary**。
- `display: block` = 變 block（每個開新行）；`inline` = 黐埋一行；`none` = not displayed at all（**has no effect on layout**）。
- `margin: auto` = **horizontally centre** block 元素（**要配合 `width`**，否則冇剩餘空間可分）。
- `float` = 將元素 **taken from the normal flow**，放去容器 / 另一浮動元素左或右，後面 **inline elements will wrap around it**；值：`none`（**default**）`left` `right`。
- `clear` = 元素可唔可以企喺前面 floating elements 旁邊，定 **must be moved down (cleared) below them**；**對 floating 同 non-floating 元素都適用**；值：`none`（default，兩邊容許）`left` `right` `both`（兩邊都唔准，最常用）`inherit`。

**Media Queries（Responsive 核心）**

```css
@media not|only mediatype and (media feature) { CSS-Code; }
```

- mediatype：`all`（所有裝置）、`screen`（電腦螢幕 / 平板 / 智能手機）。
- feature：**`max-width: 500px` = 寬度 ≤500px**（細螢幕）；**`min-width: 500px` = 寬度 ≥500px**（大螢幕）；另有 max-height / min-height。
- 邏輯運算子：`not` `and` `only`；**`only` 防止唔支援 media features 嘅舊瀏覽器誤套用樣式**。
- `@media` rule：條件為 true 先 include 入面 CSS 區塊。
- Responsive Design = "the strategy of making a site that **responds to the browser and device**"。

**Multi-column（報刊式多欄）**

| 屬性 | 作用 |
|---|---|
| `column-count` | 欄數（`column-count: 3`） |
| `column-gap` | 欄與欄之間空隙 |
| `column-rule` | 欄間分隔線 shorthand（`column-rule: 1px solid red;` = style/width/color） |
| `column-span` | 橫跨幾多欄（`column-span: all` = 通欄標題） |
| `column-width` | suggested optimal width（**值太大會減少實際欄數**） |

- Vendor prefix：Chrome **`-webkit-`**、Firefox **`-moz-`**。

**Flexbox（CSS3 layout mode，不同 screen sizes 下 behave predictably）**

- **Flex container** = 父元素，**must apply `display: flex` 或 `display: inline-flex`**；**Flex item** = container 嘅每個 child；**main axis** = flex items 一個跟一個排列所沿嘅軸；**cross axis** = 垂直於 main axis 嘅軸。

Container 屬性（「老豆」用）：

| 屬性 | Default | 常用值 |
|---|---|---|
| flex-direction | `row` | row（打橫）/ row-reverse / column（打棟）/ column-reverse |
| flex-wrap | `nowrap` | nowrap（單行）/ wrap（唔夠位換行）/ wrap-reverse（反序換行） |
| justify-content | `flex-start` | flex-start / flex-end / center / space-between（頭尾無隙）/ space-around（每邊半份）/ space-evenly（完全均等） |
| flex-flow | — | shorthand = flex-direction + flex-wrap，如 `flex-flow: row wrap;` |

Item 屬性（「仔」用）：

| 屬性 | Default | 機制 |
|---|---|---|
| flex-grow | **0** | 剩餘空間按份分：分母 = 所有 grow 值總和（grow 7:3、剩 230px → 每份 23px → 161px / 69px） |
| flex-shrink | **1** | 唔夠位按比例縮（100px 容器兩個 100px item、nowrap → 各 50px；shrink 2 蝕雙倍） |
| order | **0** | 數字細排前；**相同 order 跟 HTML source code 次序**（只改視覺，唔郁 HTML / tab 次序） |

### CSS 易錯點精選（Top 10）

1. CSS value **唔加引號**（quotes only for font names like "Times New Roman"）；`li em` **無逗號**（有逗號 = 分別命中兩種元素）。
2. ID 一份 HTML **只出現一次**；class 可畀多元素重用。
3. Override 兩條鐵律：last overrides earlier；more specific overrides general。
4. Border 寫咗 width/color 但 **冇 style → 唔顯示**。
5. `border-radius` 4 值由**左上**順時針；padding/margin 4 值由**頂**順時針——起點唔同。
6. `opacity` **越低越透明**；`display:none` 連空間都冇（vs `visibility:hidden` 仍佔位）。
7. `scale()` 值係**倍數**唔係像素；`rotate()` 正數順時針、負數逆時針；transform / skew 兩參數 X 先、Y 後。
8. `transform-origin` default = 左上角（教材口徑），唔係中心。
9. **max-width = ≤（細螢幕）、min-width = ≥（大螢幕）**——唔好倒轉；`margin:auto` 冇 `width` 就唔會水平置中。
10. 三個 default 口訣：**Grow 0（唔搶）、Shrink 1（肯縮）、Order 0（跟 source）**；order 只改視覺次序、唔影響真實文件 / tab 次序；float default = `none`、`clear: both` 先避晒兩邊。

### CSS 英文必背句

1. "CSS describes the appearance, layout and presentation of information on a web page, as opposed to HTML, which describes the content of the page."
2. "CSS separates content from presentation and defines the appearance and layout of all pages in a single place."
3. "When values disagree, the last one overrides any earlier ones, and more specific selectors override general ones."
4. "Class selectors start with a dot `.`; ID selectors start with `#` and should appear only once within an HTML."
5. "CSS3 is backward-compatible, i.e. web browsers will always continue to support CSS2 in addition to CSS3."
6. "Block elements occupy the entire width of the browser; inline elements fit into the regular flow of text."
7. "The box model describes the way that an HTML element has border, padding, and margin. With borders you need to specify a width, a style, and a color."
8. "The opacity property can take a value from 0.0–1.0; the lower the value, the more transparent."
9. "A transformation lets an element change shape, size and position; to create a transition you must specify the property and the duration."
10. "A responsive layout combines liquid and adaptive layouts by using both relative units and media queries; the layout changes dramatically beyond a limit defined by a media query."
11. "A floated element is taken from the normal flow and placed on the left or right of its container, where inline elements wrap around it."
12. "A flex container must apply `display: flex` or `display: inline-flex`; each child of a flex container becomes a flex item."
13. "The remaining space is divided into shares equal to the sum of all flex-grow values; each item receives space proportional to its own flex-grow value."

---

## ③ JavaScript 精華（L7–L9）

### 1. JS 本質（L7）

- **JavaScript** = a **client-side scripting language** used on the web browser（用戶端腳本語言，瀏覽器執行，語法似 C#）。HTML 俾結構，JS 俾 behavior。
- 兩大用途：**validate form data prior to submission**（提交前驗證表單）+ **react to user's actions — event-driven**（事件驅動）。
- Typical events：clicking a button、dragging a mouse、loading a page、submitting a form。

### 2. 4 種載入 Script 方法（必背）

| 方法 | 寫法 | 英文記法 |
|---|---|---|
| 1. `<script>` 內嵌 | `<script type="text/javascript"> ... </script>` | Inside the `<script>` element |
| 2. 外連 `.js` | `<script type="text/javascript" src="danger.js"></script>` | Linked file via the `src` attribute |
| 3. 事件屬性 | `<input type="button" onclick="alert('Hi');" />` | Within an HTML event handler attribute |
| 4. Pseudo-URL | `<a href="javascript:alert('hi')">Click me</a>` | Via the pseudo-URL `javascript:` |

- **`.js` 檔只含 JavaScript，no HTML**。`<head>` 定義函數 → `<body>` 可呼叫；執行 top to bottom，`<head>` 先於 `<body>`。
- ⚠️ pseudo-URL 寫 `javascript:alert('hi')`，唔好寫成 `http://javascript:` 或漏冒號。

### 3. 語言基礎速查（L7）

- **大小寫敏感（case-sensitive）**：`alert` ≠ `Alert`。Statement 以換行或 **`;`** 結束（考試建議寫 `;`）。
- 註解：`//` 單行、`/* ... */` 多行。
- 變數：`var x;` / `var x = 5;` / `var x, y = 5, z;`。命名：**字母開頭** + 字母 / 數字；無特殊字符 / 空白；有意義（`sum` 好過 `x`）。
- **Scope**：局部變數必用 `var`；函數內唔寫 `var` = 改緊 **global**，會改到其他程式依賴嘅值。
- 陣列：`[1,5,1968,3]`、`new Array()`、`new Array(10)`（length 10）、`new Array("Tom","Roy","Al")`。
  - **loosely-typed**：元素可混型別。**0-based**：`new Array(4)` 索引 **0–3**，`length` = 4。`arrayName.length` 係 property 冇括號。
- 運算子：算術 `+ - * / %`；遞增 `++` / `--`；比較 `> < >= <= != ==`；邏輯 `&&`(and) `||`(or) `!`(not)；字串 **`+` = concatenation**（一身兩職）。
- Precedence：`4 + 5 * 8` = **44**；`(4 + 5) * 8` = **72** → 多用括號。
- 選擇：`if (x > 10) ... else ...`；`switch (condition) { case v: ...; break; default: ...; }` — ⚠️ case 漏 `break` = fall-through。
- 迴圈：`while`（開頭檢查，最少 0 次）；`do {...} while(cond)`（**末尾檢查，至少 1 次**）；`for (init; cond; update)`（三者合一）。小心 **infinite loop**（記得更新計數變數）。
- 函數：`function add(x, y) { var sum = x + y; return sum; }`；呼叫 `add(2, 3)`（→5）、`add(a, b)`。
  - **pass by value**（收到副本）→ 要帶結果出嚟必須 `return`；可有任意多條 `return`；`return` 後嘅陳述唔執行。
- **JS vs Java**：JS loosely-typed、`function add(x, y)` 唔寫型別；Java 強型別、`int add(int x, int y)` 要為 return value / parameters / locals 逐一寫型別。

### 4. 對話框（L7）

| 函數 | 用途 | 回傳 |
|---|---|---|
| `alert()` | 通知／**除錯 debugging** | 無 |
| `confirm()` | 確認 Yes/No | `true` / `false` |
| `prompt()` | 索取輸入 | 字串 |

可寫 `window.alert()` / `window.confirm()` / `window.prompt()`。

### 5. 事件（L8）

- **Event** = a user action inside the browser that triggers JS；**event handler** = associated JS code。事件屬性全部以 **on** 開頭；HTML 屬性**唔分大小寫**：`onClick` = `onclick` = `ONCLICK`（但 JS 本身 case-sensitive）。

| 事件屬性 | 觸發時機 | 常配元素 |
|---|---|---|
| `onClick` | 點擊 | `<a>`、button、checkbox |
| `onDblClick` | 雙擊 | 一般元素 |
| `onMouseOver` / `onMouseOut` | 指標移入 / 移出 | `<a>`、`<img>` |
| `onMouseDown` | 滑鼠鍵按下瞬間 | 一般元素 |
| `onKeyDown` | 鍵盤鍵按下瞬間 | text box |
| `onLoad` | 頁面完成載入後 | `<body>` |
| `onFocus` | 取得焦點 | text box、`<body>` |
| `onBlur` | 焦點被移走（focus 相反） | form element、`<body>` |
| `onChange` | 表單元素**內容被改** | textbox、radio、checkbox、select |
| `onSubmit` | 提交表單 | 只限 `<form>`（Form object） |
| `onReset` | 重設表單 | 只限 `<form>` |
| `onUnload` | 頁面卸載（關窗） | `<body>` |

- **核心原則**：event handler **先執行**，default action **後執行**（handler first, then default action）。
- **阻止預設動作**：handler 內加 **`return false;`**（= don't take the default action）。
  - `<form onSubmit="checkSomething(); return false;">`（驗證失敗阻止送出）
  - `onMouseDown="return false;"`（禁文字選取）｜`onKeyDown="return false;"`（禁鍵盤輸入）
- **例外**：`onUnload` **唔理會 return false** — an unload event can never be prevented。
- `onSubmit` 只用於 **Form object**，最常用於送出前 validate。
- **按鈕跳頁**：`window.location = "http://someplace.com";`；`<input type="button" onClick="go_to('http://www.yahoo.com');">`；重用函數 `function go_to(place){ window.location = place; }`（放 `<head>`）。
- 停用文字框：`document.f1.t1.disabled = true;`（document → form name → element name → property）。
- focus vs blur vs change：focus = 入焦點；**blur 只在聚焦到另一區域先觸發**；change = 內容真係被改（移走焦點但冇改內容 → 只 blur 冇 change）。
- 引號配對：屬性用雙引號 → JS 內字串用單引號 `onClick="window.location='http://...';"`；字串內要單引號時 escape：`\'`。

### 6. 表單驗證與讀控件（L9）

- **client-side**：basic checks（required / email / url / number / pattern）喺 browser 即時做，慳 server 資源；**server-side**：business-specific 規則（database／商業邏輯）**只能** server 做。
- HTML5 三屬性：`required`（必填）、`type`（格式）、`pattern`（regex 格式）。

| 屬性 | 檢查內容 |
|---|---|
| `required` | 必填；**radio group 揀中一個即滿足**；同意條款 checkbox 必須剔選 |
| `type="email"` | 有 `@` + period `.` + **唔准空格** |
| `type="url"` | 有 **protocol（`http://`）** + period |
| `type="number"` | 配 `min` / `max` 限制範圍：`<input type="number" min="1" max="10">` |
| `pattern="^[A-Za-z]{10}$"` | 啱啱好 **10 個英文字母**（`^` 開頭 `$` 結尾鎖死） |
| `title="..."` | hover 或 **validation fails** 時顯示 tooltip = 自訂驗證訊息 |

**Regex 速記**

```text
^ 開頭      $ 結尾      . 任意 1 字元
* 0–無限（{0,}）   + 1–無限（{1,}）   ? 0–1（{0,1}）
{m,n} m–n 次    {n,} 至少 n    {n} 啱好 n
| 或    [xyz] 任揀一    [a-z] 範圍    [^xyz] 唔含
\d = [0-9]    \D = [^0-9]    \. / \* / \+ 字面字符（escape）

換算：x{0,1}→x?；x{0,}→x*；x{1,}→x+；(1|2|3|4)→[1-4]
```

- **`<form>` 三屬性**：`name`（方便 JS 引用）、`method`（GET / POST 二選一）、`action`（server-side script，如 PHP）。**純 client-side 表單（如互動遊戲）唔需要 method 同 action**。

**DOM 階層**：`document` → form name → element name → property。

- text box / textarea：`.value` 讀寫：`document.f1.tb1.value = "peter";`
- radio group（同名 = 同組，**只可揀一個**）：`document.f1.gender[0]`、`gender[1].checked = true;`（value 係送俾 server 嘅值）
- checkbox（可多選）：`if (document.f1.music[2].checked) alert("Pop!");`
- select 兩步曲：`var i = document.f1.myselect.selectedIndex;` → `options[i].value`（值）/ `options[i].text`（顯示文字）；`options.length` 總數；`multiple` 允許多選 → loop 數 `options[i].selected`。
  - 例：`index = 1`（第二個）→ `value = "choice2"`、`text = "Second choice"`。
- **`document.getElementById("id")`**：直接取元素，**id 全頁唯一**；可改 `.src`、讀寫 `.value`、讀寫 `innerHTML`、改 CSS。
  - `document.getElementById("pic1").src = "apple.jpg";`
  - `myElement.innerHTML`（元素內 HTML 內容，可讀可寫）
  - CSS → JS **camelCase**：刪 `-`、後字大寫：`background-color` → `style.backgroundColor`、`font-size` → `fontSize`、`margin-left` → `marginLeft`。
- 工具：Chrome DevTools（**F12**）Console 直接跑 JS；regexper.com（畫 diagram）、debuggex.com（測匹配）。

### 7. JS 易錯點精選（Examiner Traps）

1. `.js` 外連檔**唔可以有 HTML**；`javascript:` pseudo-URL 唔好寫 `http://javascript:`。
2. `new Array(4)` 索引 **0–3**（唔係 0–4）；`length` = 4 且冇括號。
3. 函數內冇 `var` = 改緊 global；局部變數必用 `var`。
4. switch case 漏 `break` → fall-through；`default` 放最後兜底。
5. `do...while` 至少執行 1 次；`while` / `for` 可 0 次。
6. HTML 事件屬性唔分大小寫，但 **JS 本身 case-sensitive**（`Document.write` 錯、`document.write` 啱）。
7. Handler **先**、default action **後**；`return false;` 先阻止到；`onUnload` 例外。
8. blur 要聚焦去另一區域先觸發；內容被改係 `onChange`（有改先會 change，blur 唔等於 change）。
9. email 檢查（`@` + `.` + **no spaces**）同 url 檢查（**protocol** + `.`）唔好混淆。
10. `{3}` = 啱好 3 次；`{3,}` = 至少 3 次；`\d` = 數字、`\D` = `[^0-9]` 非數字。
11. `getElementById` 嘅 id 全頁唯一；CSS → JS 要 camelCase，唔好照抄連字號。
12. `selectedIndex` 0-based：`index = 1` = 第二個 option；radio group 加 `required`：**一個揀中即通過**，唔係每個都要填。
13. 純 client-side 表單唔需要 `method` / `action`。
14. 引號配對：屬性值用雙引號 → 內層 JS 字串用單引號；JS 字串內要單引號寫 `\'`。

### 8. JS 英文必背句

1. "JavaScript is a client-side scripting language used on the web browser."
2. "Validate form data prior to submission to the web server." / "React to user's actions — event-driven."
3. "There are four standard ways to include script in an HTML document." / "A .js file contains only JavaScript code, no HTML."
4. "JavaScript is case-sensitive." / "Statements are terminated by ENTERs or semi-colons (;)."
5. "Local variables must always be declared with var." / "Arrays are 0-based; use arrayName.length for the length."
6. "A do...while loop always executes at least once, since the check happens at the end."
7. "Variables are passed to functions by value, so you must use return to send values back."
8. "The + operator serves both as addition and string concatenation."
9. "An event is a user action occurring inside the browser that triggers the execution of JavaScript."
10. "The event handler is executed first, then the default action takes place afterwards. Return false means don't take the default action — the default action of the associated tag is disabled."
11. "onUnload does not interpret return false, because an unload event can never be prevented."
12. "Focus in, Blur out, Change modified."（blur 只喺聚焦去另一處時觸發）
13. "The submit event only occurs when the viewer submits a form; onSubmit works only with the Form object."
14. "With type='email' the browser checks for an @ and a period and does not allow spaces; with type='url' it checks for the protocol (http://) and periods."
15. "The pattern attribute specifies a format, in the form of a regular expression."
16. "There can be ONLY ONE element with a certain id — the id should be unique."
17. "To change a CSS property in JavaScript, remove the hyphen and capitalize each word, e.g. background-color → style.backgroundColor."

---

## ④ Lab 實務精華（Lab02–Lab09）

> **Lab 地圖**：Lab02 HTML Table・Lab03 HTML Form・Lab04 CSS Fundamentals・Lab05 CSS Effects・Lab06 CSS Layout —— Lab02–Lab06 **完全冇 JavaScript**（JS 由 Lab 7 先教）；Lab07 JS Basics・Lab08 Event-driven JS・Lab09 HTML5 Validation + 讀控件。
> 以下只收 Lab **特有實務**（Emmet、快捷鍵、答題骨架、Lab 專屬陷阱）；純理論細節見上方對應章節。

### Lab 通用工具：Emmet 與快捷鍵

**HTML Emmet（Brackets 打 + Tab 展開）**

| Emmet | 產生 |
|---|---|
| `table>tr*3>td{Hello}*3` | 3×3 = 9 個 `<td>` |
| `form:post` | `<form action="" method="post">` |
| `input:r[name="booking"]*2` | 兩個同名 radio |
| `input:c[name="F$"]*3` | 三個 checkbox：name = F1 F2 F3（`$` 自動編號） |
| `select>option*3` | select 內 3 個 option |
| `tarea` | `<textarea name="" id="" cols="30" rows="10">` |
| `input:s` / `input:reset` / `input:hidden` | submit / reset / hidden input |
| `link:css` | `<link rel="stylesheet" href="">` |

- Emmet 符號：`>` child・`*n` 重複 n 次・`{text}` 內容・`$` 自動編號・`[attr]` 屬性・`()` 分組。
- CSS Emmet（口訣：屬性名首字母；背景用 `bg` + `c`olor / `i`mage）：`fz`→font-size、`ff`→font-family、`fw`→font-weight、`fs`→font-style、`c`→color、`bgc`→background-color、`bgi`→background-image、`ta`→text-align、`lh`→line-height、`td`→text-decoration、`link`→`<link>`；`d:f`→display:flex、`m:a`→margin:auto、`fl:l`→float:left、`cl:b`→clear:both、`colmc`→column-count、`colmr`→column-rule、`fxg`→flex-grow、`ord`→order、`jc:sb`→justify-content:space-between。
- 快捷鍵：**Ctrl+Shift+D** 刪游標所在成行（游標要喺 `<td>` 行，唔好喺 `<tr>` 行）；改完檔 **Ctrl+F5** hard refresh（清 cache）。

### Lab02 — HTML Table（表格合併）

- 巢狀次序：`<table>` ➔ `<tr>`（row）➔ `<td>`（data cell）/ `<th>`（header cell）——漏咗 `<tr>` 全部格會堆埋一行。
- **📌 數格規則（考場最易錯）**：數嘅係「每行 HTML 要寫幾多個 `<td>`」。`rowspan` 格已佔用下面嘅位置 → 嗰啲行**唔使再寫**。驗算：任何一行「自身格 + rowspan 伸落嚟 + colspan 佔位」總欄數一致（Lab 例子全表 3 欄、5 個 td：1 / 3 / 1）。
- `colspan="3"` 向右覆蓋 3 欄（本身 + 右邊 2）；`rowspan="2"` 向下覆蓋 2 列，嗰行唔使再寫。

**必考問答：點解要刪 `<!DOCTYPE html>`？**

> **記憶句**："The `width` and `height` attributes of `<table>` are **not supported in HTML5**, so the browser ignores them in standards mode. Removing `<!DOCTYPE html>` switches the page into **quirks mode**, where the old attributes are honoured again. The modern solution is to use **CSS**."

```css
/* 現代 HTML5 + CSS 對照（理解用，非 Lab 答案） */
table { border-collapse: collapse; width: 100%; }
td { border: 1px solid black; text-align: center; }
tr:nth-child(1) { background-color: lightyellow; }
```

- Lab 陷阱：⚠️ 全形引號 `“ ”`、全形括號會令屬性失效——一定要半形 `"`；⚠️ `align` 值係英文 `center` 唔係 `centre`；只做水平、垂直用 `valign`；⚠️ 刪格誤刪咗 `<tr>` 成行 → F12 → Elements 睇瀏覽器修正後嘅 DOM。

### Lab03 — HTML Form（表單元素）

- 提交格式：每個 control 以 **`name=value`** pair 提交；**冇 `name` 就唔會提交**。
- 檔案上傳：必須 `method="post"` + `enctype="multipart/form-data"`（普通 text-only encoding 傳唔到二進位檔案）。

**Radio vs Checkbox（Lab 最重要概念對比）**

| | Radio | Checkbox |
|---|---|---|
| 揀法 | 同 `name` 一組、**互斥**（揀一個自動取消另一個） | **獨立**，可同時揀多個 |
| `name` | 同組必須**相同**（如 `booking`） | 每個選項必須**唔同**（`F1` `F2` `F3`；共用同名後者會覆蓋前者） |
| 預設 | `checked` | `checked` |

```html
<input type="radio" name="booking" value="I" checked /> Internet
<input type="radio" name="booking" value="A" /> Agency
<input type="checkbox" name="F1" value="G" checked /> Gym
```

- `<select>`：`<option>` 顯示文字 ≠ `value`（用戶見 "Double"，伺服器收 "D"）；`selected` 設預設；`multiple` 先可揀多個。
- `<textarea>`：**唔係 self-closing**（`<textarea />` 錯）；初始文字放開始 / 結束標籤之間；`cols` = 闊（字符數）、`rows` = 高（行數）。
- `<fieldset>` + `<legend>`：相關欄位邏輯分組 + 外框標題。
- 想「提示但唔係真內容」→ 用 `placeholder`（本 Lab 要 initial value，所以唔用）。
- `maxlength` 只對 text 類有效；`type="number"` 會忽略 → number 用 `min` / `max`。
- Lab 陷阱：⚠️ reset **還原 HTML 預設值**（有 `checked` / `selected` / `value` 嘅變返預設，唔係全部變空白）；⚠️ 淨寫顯示文字冇 `value` → 伺服器收到空值；⚠️ `border-radius` 係 CSS property，寫入 HTML attribute 唔會生效；⚠️ 檔案上傳冇 `enctype` → 揀咗都傳唔到；⚠️ 中文亂碼 → Save As 揀 **UTF-8**，保留 `<meta charset="utf-8" />`。

### Lab04 — CSS Fundamentals（About Me 練習）

- 選擇器口訣：**點(class) 井(id) 空格(後代) 冒號(偽)**；Pseudo-class 用**單冒號** `:`（`a:hover`），唔好用 `::`；Pseudo-element 如 `p:first-letter`（每段第一個字，drop caps）。
- CSS 檔淨係寫 CSS：**唔可以有 `<style>` tag、唔可以有 HTML**；註解用 `/* ... */`（HTML 先係 `<!-- -->`）；`font-size` **一定要有單位**（`pt` / `px` / `%`）。
- 優先次序（誰贏？）：**Inline style > ID `#` > Class `.` / pseudo-class > Element**（唔計 `!important`）；同等 specificity **後寫贏**——`h1 { color: red; }` 必須寫喺 `h1, h2 { color: blue; }` **之後**先覆蓋到。

**連結狀態次序（順序超重要）**

```css
a:link    { text-decoration: none; }      /* 未探訪：預設冇底線 */
a:visited { text-decoration: none; }      /* 已探訪：都冇底線 */
a:hover   { text-decoration: underline; } /* hover 先出底線 —— 一定要最後寫 */
p:first-letter { font-size: 300%; }       /* drop caps：3 倍大（300% = 3×） */
```

**Lab04 Exercise 7 About Me 標記 Checklist**

- [ ] **一個** `<h1>`（最重要標題）+ 其餘全部 `<h2>`（唔可以有兩個 h1）
- [ ] `<hr />` 水平線喺指定位置
- [ ] 冇次序 → `<ul>` + `<li>`；有次序 → `<ol>` + `<li>`
- [ ] `<img src="happy.PNG" alt="Happy" />`（`alt` 一定要有；路徑 `images/happy.PNG` 視乎位置；大細階要啱）
- [ ] `<a href="http://www.imdb.com/title/tt0109830/">IMDB</a>`（完整 URL）
- [ ] `<strong>` 包住要強調字（jolly、clumsy、four-eyed）
- [ ] `<!DOCTYPE html>`、`<head>`、`<title>`、`<body>` 完整

- Lab 陷阱：⚠️ CSS 寫 `.first` ↔ HTML 用 `class="first"`；ID 版係 `#first` ↔ `id="first"`——符號同名都要一字不差（大細階算唔同）；⚠️ `color` = 文字色、`background-color` = 底色，調轉就錯色；⚠️ `<link>` 一定要放 `<head>`、`rel` / `href` 缺一不可；⚠️ 存檔副檔名變 `.html.txt` → Save As Type 揀 **All types**；⚠️ `<h1>` 唔可以嵌喺 `<p>` 入面（瀏覽器會自動閂咗 `<p>`）——block 內要包就用 `<div>`。

### Lab05 — CSS Effects（下拉選單 + transform）

**純 CSS 下拉選單答題骨架（Ex1）**

```css
/* 收起：子選單每項高度 0 + overflow hidden */
.menu .sub li { height: 0; overflow: hidden; transition: height 500ms; }
/* 展開：hover 頂層 li → 內層 .sub 每個 li 長高 */
.menu ul li:hover .sub li { height: 40px; }
/* hover 色：主選單淺綠底黑字；子選單淺藍（specificity 更高） */
.menu a:hover { ... }
.menu .sub a:hover { ... }
```

- Selector 對照：under the **menu class** → `.menu ul`（後代選擇器，`.menu` 內**所有層級** `<ul>`）；the links → `.menu a`；submenu under `.menu` → `.menu .sub`（`position: absolute; top: 38px;`）。
- ⚠️ height **只可喺兩個實數值之間動畫，唔可以去 `auto`**（0px → 40px 先得）。
- `list-style: none` 刪 bullet——要寫喺 **`<ul>`**（寫喺 `li` / `a` 冇用）；`<ul>` 係 block 會上下疊 → 改 `display: inline-block` 先**並排**；`<a>` 用 `display: block` 令成條橫行都可點擊。

**Transform 定位公式（Ex2 必考）**

> `transform: translate(dx, dy);`　dx = 目標 X − 正常流 X（正 = 右 / 下，負 = 左 / 上）
> 正常流位置靠「前面每個 block 元素疊加高度」推斷：每張 60px 圖 → 每格 60px（A = (0,0), B = (0,60), C = (0,120)... iframe div = (0,360)）。
> 例：`#letterB { transform: translate(540px, 180px); }`（目標 540,240 − 正常 0,60）；`#textDiv { transform: translate(150px, -120px); }`

**Hover 圖合併變形（陷阱題）**

```css
img:hover { transform: scale(1.5) skewY(20deg); }  /* 一個屬性寫晒，由左到右套用 */
/* ✗ 錯：分開兩行 transform → 後行覆蓋前行，只做到一個效果 */
```

- Lab 陷阱：⚠️ `text-shadow` / `box-shadow` 次序 = 水平、垂直、模糊、顏色，調轉「走樣」；⚠️ 漏單位：`translate(50, 150)` ✗ → `translate(50px, 150px)`；角度用 `deg`；⚠️ `padding: 10px 20px` = 上下 10、左右 20（垂直 水平），唔係四邊都 20；⚠️ `position: absolute` 冇 positioned 祖先 → 以頁面做基準（會飛去頁頂）；⚠️ `target`（`<a>`）同 `name`（`<iframe>`）唔同名 → click 開新 tab；`<img>` 係 empty element，冇 `</img>`。

### Lab06 — Page Layout（Flexbox 響應式版面）

**版面骨架（Q11 答題骨架，背熟）**

```css
#flex-container { display: flex; flex-flow: row wrap; }  /* flex 加喺「父容器」 */
#header, #footer { width: 100%; }        /* 全寬 → 自己一行 */
#nav, #aside { width: 200px; }           /* 左右側欄固定 */
#main { flex-grow: 1; }                  /* 食晒剩餘空間，跟視窗伸縮 */
```

**三種視窗闊度速查表（必背：顏色 + 左右欄）**

| 視窗闊度 | 生效規則 | 版面 | Main 顏色 |
|---|---|---|---|
| > 1000px | 基礎規則 | header → nav(200px) + main(彈性) + aside(200px) → footer | `#FCC` 粉紅 |
| 801–1000px | 基礎 + `≤1000px` query | **aside + main + nav（左右對調）**，側欄收窄 100px | `#CFC` 淺綠 |
| ≤ 800px | 基礎 + 兩個 query 疊加 | nav 全寬橫向清單、**aside 隱藏**、main 全寬 | `#FFC` 淺黃 |

```css
@media only screen and (max-width: 1000px) {   /* 對調：改 order，唔郁 HTML */
  #nav { order: 4; width: 100px; }
  #main { background: #CFC; }
  #aside { order: 2; width: 100px; }
}
@media only screen and (max-width: 800px) {
  #nav { order: 4; width: 100%; }
  #nav ul { list-style: none; display: flex;
            flex-direction: row; justify-content: space-around; }
  #main { background: #FFC; }
  #aside { display: none; }      /* 完全移除，連位都讓返出嚟 */
}
```

- 常用屬性速查：`background: #DDF` = shorthand for background-color；3 位 hex = 每 channel 重複一次（`#DDF` = `#DDDDFF`、`#FCC` = `#FFCCCC`、`#CFC` = `#CCFFCC`、`#FFC` = `#FFFFCC`）；`border: 1px solid black`（width → style → color）；margin = border 外、padding = border 內（Box Model）。
- `display: none` 完全移除、**唔留位** ≠ `visibility: hidden`（留位但睇唔到）≠ `opacity: 0`（透明但佔位）。
- `float: left` 圖片靠左、文字繞住右邊排（`margin-right: 10px` 留罅）；`clear: both` 兩邊唔准 → 推落下一行。
- 分欄：`-webkit-column-count: 3`（`-webkit-` = Chrome / Safari / Edge 前綴）；`#main h1 { -webkit-column-span: all; }` 通欄標題，配 `line-height: 0.2` 壓細行距。
- 配套：外部 CSS `<link rel="stylesheet" href="lab06_1.css" />` 檔名要一致、同資料夾；每個檔案頂部 comment `Full Name / Student ID / Class` 要填。
- Lab 陷阱：⚠️ `display: flex` 加錯喺子元素 → 完全冇效果，要加喺**父容器**；⚠️ media query 寫喺基礎規則前面 → 俾後面覆蓋，要放 **CSS 最尾**；⚠️ `#aside { display: none; }` 寫咗喺 media query **外** → 任何闊度都隱藏；⚠️ **max-width = ≤ 先生效**（「闊過先生效」要用 min-width）；⚠️ 「對調欄位」= 交換 **`order`** 值（nav 2→4、aside 4→2），唔係改 HTML；⚠️ 想 li 橫排 = `display: flex` 加喺 `ul`，唔係 `li`。

### Lab07 — JS Basics（client-side 入門）

- 嵌入與觸發 3 式：`<script>` 直接執行（HTML5 可省 type；有 syntax error 成段唔行）、event handler attribute（attribute 用雙引號 → JS 字串用**單引號**）、pseudo-URL `href="javascript:alert('...');"`（執行 JS，唔跳頁）。
- Window 互動：`window.alert(msg)` 彈訊息（**唔解析 HTML**，換行用 `\n`，`<br />` 冇用）；`confirm()` → true / false；`window.prompt("問題","預設")` → 輸入框，**永遠回傳 string**。
- `document.write("<h1><b><i>...<br />...</i></b></h1>")`：字串當 HTML 寫入；`<br />` 斷行（void element）；開閉 tag 次序要反轉（開 h1→b→i，閉 i→b→h1）。

**JS 語法 Lab 版速查**

| 語法 | 意思 / 結果 |
|---|---|
| `function f(param){...}` / `f(arg)` | 定義（parameter）／呼叫（argument） |
| `parseInt("12abc")` → 12；`parseInt("abc")` → NaN | 讀到非數字字符即停 |
| `parseFloat(y)` | 轉浮點數 |
| `Math.PI`、`Math.pow(x, 3)`、`(4.0/3.0)` | π、x³、浮點除法 |
| `(5.5).toFixed(2)` → `"5.50"`（**string**） | 四捨五入 2 位小數 |
| `isNaN("abc")` → true；`isNaN("12")` → false | Not a Number |
| `do{...}while(true);` + `return n` | 至少問一次，重複到啱先跳出 |
| `return;` | **只可喺 function 內用** |

- Lab 陷阱：⚠️ `prompt()` 回傳 string → `"2"+"3.5"` = `"23.5"`，計數前必 `parseInt` / `parseFloat`；⚠️ `toFixed()` 回傳 string → `z.toFixed(2)+1` = `"5.501"`——**先加完先格式化**；⚠️ alert 換行用 `\n`（`<br />` 冇用）；⚠️ `return;` 喺 top-level script → `Illegal return statement`；⚠️ `isNaN("")` = false（空字串轉 0），捉空輸入要 check `parseInt` 結果；⚠️ JS case-sensitive：`NumPicker` ≠ `numpicker`；function 定義放 `<head>`；⚠️ 圖檔 `src="one.gif"` = 同資料夾；起點檔寫 `images/` 會裂圖。
- 球體體積（Ex 記憶）：`V = (4.0/3.0) * Math.PI * Math.pow(parseInt(radius), 3)`，alert 用 `volume.toFixed(2)`。

### Lab08 — Event-Driven JavaScript（表單驗證 + 動態計價）

**Event handler 放喺邊（位置佔一半分數）**

| handler | 放喺邊 | 幾時觸發 |
|---|---|---|
| `onSubmit="return checkFields()"` | `<form>` | 撳 submit；false = 阻止、true = 放行；**漏 `return` 永遠照 submit** |
| `onload="startform()"` | `<body>` | 頁面載入完成 |
| `onchange="order_price()"` | `<select>` / qty text | 值改變（失焦時） |
| `onclick="shipping_price(0);"` | radio / button | 撳一下；傳 radio group **index**（0 / 1） |

**讀寫表單（兩套，唔好溝亂）**

- 有 `id`：`document.getElementById("tfUser").value`
- 有 `name`：`document.formName.controlName.value`（lab08_2 form 名 `order` → `document.order.sub1.value`）
- radio group：`document.order.shipping.length`（粒數）、`shipping[i].disabled`、**`shipping[field].value`**（field = index）
- `<select>`：`product.selectedIndex` → `product.options[index].value`
- `.disabled = true` 灰咗唔畀改；`.focus()` 移游標；`.checked = false` 取消揀選

**計價三步曲（背）**

```js
var s1 = parseFloat(document.order.sub1.value);      // 1. string → number
document.order.total.value = (s1 + s2).toFixed(2);  // 2. 計完先 toFixed 先寫入
// 3. 每個函數最尾 call total_price(); 總數先至最新
```

- checkFields 口訣：**「alert → return false」一對出現；最後一條路先 `return true`**。
- Lab 陷阱：⚠️ `onSubmit="checkFields()"` 漏 `return` → false 冇傳返去、表單照 submit；⚠️ `getElementById` 個 id 要同 HTML 100% 一致（大小階），錯 → null；⚠️ radio 兩粒要用 `shipping[field].value`，淨 `.value` 只攞到第一粒／undefined；⚠️ `parseFloat("")` = NaN，qty 可能空白要先 check；⚠️ 金額必 `.toFixed(2)`，否則浮點誤差 `20.5000000001`；⚠️ 比較用 `==`：`if (user = "")` 係 assignment 唔係比較；⚠️ `onload` 一定要喺 `<body>` tag，寫錯位 `startform()` 唔行；⚠️ lab08_1 用 id + getElementById、lab08_2 用 name + `document.order.xxx`，**兩套唔好撈亂**；⚠️ radio 掣 `onclick` 要帶參數 `shipping_price(0)`，寫 `shipping_price()` 冇用。

### Lab09 — Client-side Form Validation（HTML5 驗證 + 讀控件）

- `required`：必填；**radio group 一粒 required = 成組必揀一粒**。
- `type="number"` + `min` / `max` / `step`：淨數字 + 下限；**number 唔食 pattern**。
- `type="url"`：內建 URL 檢查（要有 `http://` protocol）；`type="email"`：檢查 `@` 同 period。
- `pattern="^...$"`：regex **全字比對**（隱含 `^` `$`）；只支援文字類：text / url / email / tel / password / search。
- `title="..."`：hover／驗證失敗時嘅提示文字（自訂驗證訊息）。

**填空答案 (a)–(e)（背）**

```html
(a) <input type="text" name="name" pattern="^[A-Z][a-z]*$" title="Capital first character" required="required" />
(b) <input type="number" name="age" min="18" required="required" />
(c) <input type="url" name="url" title="http://domainName" required="required" />
(d) <input type="text" name="time" pattern="^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$" required="required" />
(e) <input type="text" name="color" pattern="^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$" required="required" />
```

**Regex 庫（全用 `^...$` 形式）**

```text
8 位電話      ^[0-9]{8}$                    (= ^\d{8}$)  {8} 啱好 8 個
大楷開頭姓名   ^[A-Z][a-z]*$                  開頭 [A-Z]，之後 [a-z]*
時間 HH:MM:SS ^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$   時 00–23 拆兩段 OR；分秒 [0-5][0-9]
Hex 顏色 3/6 位 ^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$          # + 3 或 6 個 hex digit
日期 DD/MM/YYYY ^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$   日 01–31、月 01–12、年 4 位
淨字母數字     ^[A-Za-z0-9]+$                 + 至少一個
```

砌 regex 口訣：**集合 `[]` → 數量 `{n}` / `*` / `+` / `?` → 合併 `|`（拆範圍要 `(a|b)` 括住）→ 鎖頭尾 `^$`**。

**讀控件四類口訣（背）：單值 `.value`，radio 搵 checked，checkbox 收集晒，dropdown 都係 `.value`**

```js
var txt = document.f1.name.value;          // text/number/url：直接 .value（回傳 string）
for (var i = 0; i < document.f1.gender.length; i++) {
  if (document.f1.gender[i].checked) { gender = document.f1.gender[i].value; break; }  // radio：loop 搵 checked
}
for (var j = 0; j < document.f1.dse.length; j++) {
  if (document.f1.dse[j].checked) { dse += document.f1.dse[j].value + " "; }  // checkbox：全部 checked 都要
}
var sport = document.f1.sport.value;       // select：被選中 option 嘅 value
// 兩步曲（同結果）：document.f1.sport.options[document.f1.sport.selectedIndex].value
```

- **撞名**：控件 `name="name"` 會 shadow form 屬性 → 穩陣寫 `document.f1.elements["name"].value`。
- **CSS 加分**（pseudo-class 反映驗證狀態，唔使 JS）：`input:invalid { }`、`input:valid { }`、`input:required { }`；`table { border-collapse: collapse; }`。
- **執行流程**：格式錯 → 紅色 tooltip（引用 `title`）擋提交；全部合格 → 先觸發 `onSubmit` → `print_result()` → `alert(msg)`（用 `\n` 換行）。
- Lab 陷阱：⚠️ `pattern` **全字比對**：淨寫 `[A-Z]` = 只准一個大楷字母 → 要寫晒 `^[A-Z][a-z]*$`；⚠️ `type="number"` 唔食 `pattern` → 用 `min` / `max`；⚠️ `type="url"` 冇 `http://` 會 invalid（`www.hkiit.edu.hk` 唔算）；⚠️ HH 寫 `[0-2][0-9]` 會容許 24–29 → 用 `([01][0-9]|2[0-3])`；MM/SS 用 `[0-5][0-9]`（容許到 59 為止）；⚠️ Hex 漏咗 `#`、`A-F`、`{3}` / `{6}` 都會錯（`#12`、`1a2b3c`、`#gggggg` 全部 ❌）；⚠️ **原生驗證唔合格 → onSubmit（JS）根本唔會觸發**——JS 錯嘅話先睇 HTML 驗證；⚠️ radio / checkbox group 唔可以直接 `.value` → 必 loop `[i]` + `.checked`；⚠️ `document.f1.xxx` 個 `name` 打錯 → `Cannot read properties of undefined`。

---

## ⑤ 最後 60 秒自測清單（考前打勾）

### HTML（能默寫）

- [ ] 文件最小骨架：`<!DOCTYPE html>` → `<html>` → `<head>`（title / meta）→ `<body>`
- [ ] 字符實體：`&lt;` `&gt;` `&amp;` `&nbsp;` `&copy;` `&reg;` `&quot;`（`&` 開頭、`;` 結尾、case sensitive）
- [ ] `<hr />` 三屬性預設值：align = center、size = 2、width = 100%
- [ ] 表格巢狀次序 `<table> → <tr> → <td>` / `<th>`；colspan / rowspan 數值**含自身**
- [ ] `cellspacing` = 格之間、`cellpadding` = 格內（預設 1px）；格內 `align` 水平、`valign` 垂直
- [ ] 超連結四種：absolute / relative（同目錄、`./` 路徑）/ anchor `#xyz`
- [ ] `<img />` 係 empty element；image link 用 `border="0"`
- [ ] iframe：`frameborder` 係字串 `"yes"` / `"no"`；`target` = iframe `name` 先框內載入
- [ ] file upload 三件套：`type="file"` + `method="post"` + `enctype="multipart/form-data"`
- [ ] 預設值四兄弟：radio / checkbox → `checked`、option → `selected`、text → `value`、textarea → 標籤間內容
- [ ] `disabled` 唔提交、`readonly` 照提交；`<label for>` 綁 `id`（提交靠 `name`）
- [ ] HTML5 新 type：color 要 `#RRGGBB`、range 預設 0–100、tel 唔自動驗證、email / url 自動驗證

### CSS（能默寫）

- [ ] Rule 語法：`selector { property: value; }`（值唔加引號；註解 `/* */`）
- [ ] 三種加入：inline（`style=""`）/ embedded（`<style>` 喺 `<head>`）/ external（`<link>` 喺 `<head>`）
- [ ] Specificity：ID `#` > Class `.` > Element > Universal；同等 **後寫贏**
- [ ] Box Model 由內到外：Content → Padding → Border → Margin
- [ ] Border 三要件 width / style / color（**缺 style 唔顯示**）；shorthand 順序 width → style → color
- [ ] padding / margin 4 值順序：**上右下左**（TRouBLe）；border-radius 4 值由**左上**順時針
- [ ] 連結狀態次序：`a:link → a:visited → a:hover`（hover 最後寫）
- [ ] flex 三 default：**grow 0、shrink 1、order 0**；`flex-flow: row wrap` = direction + wrap
- [ ] `margin: auto` 要配 `width` 先水平置中；float default = `none`、`clear: both` 避晒兩邊
- [ ] `max-width` = ≤（細螢幕）、`min-width` = ≥（大螢幕）；media query 放 CSS 最尾

### JavaScript（能默寫）

- [ ] 4 種載入 script：`<script>` 內嵌 / `src` 外連 / 事件屬性 / `javascript:` pseudo-URL
- [ ] 對話框回傳：alert 無、confirm true / false、prompt **永遠 string**
- [ ] Handler **先**執行、default action **後**；`return false` 阻止；`onUnload` 例外
- [ ] `do...while` 至少 1 次；`while` / `for` 可 0 次；switch 漏 `break` = fall-through
- [ ] 函數 pass by value，帶結果出嚟必 `return`；局部變數必 `var`
- [ ] 表單驗證三屬性：`required`（radio 一粒掂）/ `type`（email / url / number）/ `pattern`（regex 全字比對）
- [ ] select 兩步曲：`selectedIndex` → `options[i].value`（0-based！）
- [ ] CSS → JS camelCase：`background-color` → `style.backgroundColor`

### Lab 實戰（能重做）

- [ ] Emmet：`table>tr*3>td{Hello}*3`、`form:post`、`input:r` / `input:c[name="F$"]*3`、`link:css`
- [ ] Lab02 數格驗算：每列「自身 + rowspan + colspan」總欄數一致
- [ ] Lab02 問答：刪 `<!DOCTYPE html>` → quirks mode 令 HTML5 唔支援嘅 table width / height 生效
- [ ] Lab03：radio 同名互斥 vs checkbox **唔同名**；reset 還原預設值；textarea 唔係 self-closing
- [ ] Lab04：CSS 檔冇 `<style>` / HTML；`a:link → visited → hover` 次序
- [ ] Lab05 下拉選單：height 0 → 40px + transition（唔可以去 `auto`）；`list-style: none` 寫喺 `ul`
- [ ] Lab05 transform：`translate = 目標座標 − 正常流座標`；多個 transform 合併一行
- [ ] Lab06 骨架：父容器 `display: flex; flex-flow: row wrap`；`#main { flex-grow: 1; }`
- [ ] Lab06 三斷點色：`#FCC`（>1000px）→ `#CFC`（≤1000px）→ `#FFC`（≤800px）；對調欄位 = 改 `order`
- [ ] Lab07：prompt / toFixed 都回傳 string（先加完先格式化）；alert 換行用 `\n`
- [ ] Lab08：`onSubmit="return checkFields()"` 漏 return 照 submit；radio 用 `shipping[field].value`
- [ ] Lab09：`pattern` 隱含 `^$`；number 唔食 pattern；原生驗證失敗 → onSubmit 唔觸發
- [ ] 記憶句複習：每節「英文必背句」能默讀一次

---

*本 Cheat Sheet 由 6 份「ITE3006 精華區塊」合併去重而成（HTML 理論 L1–L3＋CSS 理論 L4–L6＋JS 理論 L7–L9＋Lab 實務 Lab02–Lab09）。考前 60 秒：先打勾最後自測清單，唔熟嘅翻返對應章節。*
