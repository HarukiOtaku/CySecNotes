# ITE3006 Topic 1: Web Page and HTML Basics — 雙語應考學習指南（Bilingual & Exam-Ready Study Guide）

> 適用課程：ITE3006 Information Technology Essentials
> 主題：Topic 1 — Web Page and HTML Basics（網頁與 HTML 基礎）
> 學習方式：繁體中文拆解邏輯 + 英文標準定義句（Blockquote）+ 可背誦的考試英文句型

---

## 📝 課程概要與實務情境 (Summary & Real-world Context)

Topic 1 是整個 Web 開發世界的起點。這一課要回答三個根本問題：**甚麼是網頁（Web page）？甚麼是 HTML？HTML 文件如何組織？** 教材先定義「網頁」——一份設計來讓網頁瀏覽器（web browser）在螢幕或流動裝置上顯示的 web document；再引入三種標記語言的血緣關係：**HTML**（負責顯示）、**XML**（負責資料結構與交換）、**XHTML**（兩者的結合，XML 規則下的 HTML）。接著詳細拆解一份 HTML 文件的骨架——`<html>`、`<head>`、`<body>` 三大區塊——以及如何用 tags（標籤）、attributes（屬性）、text formatting tags（文字格式標籤）、hyperlinks（超連結）去砌出一頁可瀏覽、可搜尋、可導航的網頁。最後簡介 HTML5：W3C 與 WHATWG 合作的成果，以及 `<header>`、`<article>`、`<time>` 等語義化新標籤與極簡的 `<!DOCTYPE html>` 宣告。

實務上，你每天用瀏覽器打開的任何網站——從 Google 首頁、YouTube 到學校的 VTC 網頁——底層都是一份或多份 HTML 文件。例如當你負責為公司建立首頁時，第一步不是寫程式，而是建立正確的 HTML 骨架：`<html>` 包住整份文件、`<head>` 放頁面標題與 `<meta>` 關鍵字（讓 Google 能索引你的網站）、`<body>` 放真正顯示給訪客的內容。另一個常見場景是維修或更新舊網站：如果不懂 `href` 的絕對 URL（absolute URL）與相對路徑（relative path）之分，你貼上一個 `href="http://..."` 或 `href="test.html"` 時便無法預測點擊後會跳到哪裏；不懂字符實體（character entities），想在頁面顯示 `&` 或 `<` 符號時網頁會破版甚至被瀏覽器當成 tag。換言之，這一課的每一個小知識點，都是日後寫任何網頁、以及考 ITE3006 時的答題本錢。

---

## 🎯 考試學習目標 (Learning Objectives)

考官會透過以下能力指標測試你對本課的掌握（附英文對照）：

1. **定義網頁與瀏覽器的關係** — 能解釋網頁如何在瀏覽器上顯示。（*Define what a web page is and how a browser displays it.*）
2. **分辨 HTML、XML、XHTML** — 能說出三者的全名、用途與彼此關係。（*Distinguish HTML, XML and XHTML by their full names, purposes and relationships.*）
3. **解釋 HTML 的本質** — 能指出 HTML 是 markup language 而非 programming language，並說明檔案副檔名。（*Explain that HTML is a markup language, not a programming language, and state the .htm/.html file extensions.*）
4. **描述 HTML 文件的最小結構** — 能列出 `<html>`、`<head>`、`<body>` 三大標籤及其各自作用。（*Describe the minimum structure of an HTML document: <html>, <head>, <body>.*）
5. **運用 `<head>` 與 `<meta>`** — 能解釋 title 與 meta description/keywords 對搜尋引擎的作用。（*Use the <head> section and <meta> tags for page titles and search-engine indexing.*）
6. **掌握 tag 語法** — 能分辨 start tag / end tag、attributes（name/value pairs）、大小寫規則與註解。（*Master tag syntax: paired tags, attributes, case sensitivity and comments.*）
7. **套用文字格式標籤** — 能使用 `<h1>`–`<h6>`、`<p>`、`<br />`、`<pre>` 及 physical style tags（`<b>`、`<i>`、`<u>`、`<sub>`、`<sup>` 等）。（*Apply text formatting tags correctly.*）
8. **建立超連結** — 能分辨並撰寫四種連結方式：absolute、relative、`./path` 與 anchor。（*Create hyperlinks: absolute URL, relative filename, relative path and in-page anchors.*）
9. **使用 `<hr />` 及其屬性** — 能說明 align、size、width 三個屬性與預設值。（*Use the horizontal rule and its align, size, width attributes.*）
10. **運用字符實體** — 能透過 named entities 與 numeric character references 顯示特殊字符。（*Display special characters using named entities and numeric references.*）
11. **對齊文字** — 能比較 align 屬性與 `<div>`／`<span>` 的用法。（*Align text with the align attribute and compare <div> with <span>.*）
12. **說明 HTML5 背景與新標籤** — 能講述 W3C 與 WHATWG 的合作、HTML5 設計原則、`<!DOCTYPE html>` 及 `<header>` 等語義標籤。（*Explain the HTML5 background, design rules, the new doctype and semantic tags.*）

---

## 📖 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 甚麼是網頁（What is a Web Page?）

瀏覽器之所以能顯示網頁，是因為網頁本身是一份「為顯示而設」的文件：它由 HTML 這類 markup language 寫成，內含文字與圖片，亦可以嵌入其他類型內容（例如影片、音樂檔）。瀏覽器（web browser）是解讀並顯示它的工具。

> **A web page is a web document designed to be displayed in a web browser on the World Wide Web.**
> （網頁是一份設計用來在瀏覽器上顯示的 web 文件。）

> **A web browser displays a web page on a monitor or a mobile device.**
> （瀏覽器把網頁顯示在螢幕或流動裝置上。）

> **A web page usually contains text and images written in HTML or a comparable markup language.**
> （網頁通常包含以 HTML 或其他標記語言寫成的文字與圖片。）

**hypertext 與 hyperlinks（links）：** 網頁之所以叫「網」頁，正因為它提供超文字（hypertext）——透過導覽列（navigation bar）或側邊欄選單（sidebar menu），用超連結（hyperlinks，常簡稱 links）帶你跳到其他網頁，形成互相連結的「全球資訊網」。

> **Web pages provide hypertext that includes a navigation bar or a sidebar menu to other web pages via hyperlinks, often referred to as links.**
> （網頁提供超文字，透過超連結（links）以導覽列或側邊欄選單連到其他網頁。）

📌 **應考提示**：定義題「What is a web page?」的標準答法 = "A web page is a web document designed to be displayed in a web browser on the World Wide Web." 不要漏掉 "web document" 與 "web browser" 兩個關鍵詞。

### 3.2 HTML、XML 與 XHTML 的血緣關係

三個縮寫最容易混淆，考官極愛考三者的對比。記住一句口訣：**HTML 管顯示，XML 管資料，XHTML 是「用 XML 規則寫的 HTML」。**

**HTML（HyperText Markup Language，超文字標記語言）** —— 針對瀏覽器顯示而設計的標記元素（tags）集合。

> **HTML is the set of markup elements or tags placed in a file intended for display on a web browser.**
> （HTML 是放在檔案中、旨在讓瀏覽器顯示的一組標記元素或標籤。）

**XML（eXtensible Markup Language，可延伸標記語言）** —— 描述、傳送與交換結構化資料的文字語言。重點：XML 的目的**不是取代 HTML**，而是把「資料」與「呈現」分離，藉此延伸 HTML 的能力；在 XML 中我們可以**自訂自己的 tags**。

> **XML is a text-based language designed to describe, deliver, and exchange structured information.**
> （XML 是設計來描述、傳送和交換結構化資料的文字語言。）

> **XML is not intended to replace HTML — it is intended to extend the power of HTML by separating data from presentation. We can define our own tags in XML.**
> （XML 並非打算取代 HTML，而是透過把資料與呈現分離來延伸 HTML 的能力。我們可以在 XML 中定義自己的標籤。）

**XHTML（eXtensible Hypertext Markup Language，可延伸超文字標記語言）** —— XHTML 1.0 以 HTML 4.0 為基礎，作為 XML 的一種應用（application of XML），兼取兩者之長：HTML 4.0 的格式能力 + XML 的資料結構與延伸能力。

> **XHTML 1.0 was developed on HTML 4.0 as an application of XML. It combines the formatting strengths of HTML 4.0 with the data structure and extensibility strengths of XML.**
> （XHTML 1.0 以 HTML 4.0 發展而成，是 XML 的一種應用；它結合了 HTML 4.0 的格式優勢與 XML 的資料結構及延伸優勢。）

### 3.3 HTML 的本質（What is HTML?）

HTML 是「Web 的全球發佈格式」（global publishing format for the Web），但必須記住一個常考判斷題重點：**HTML 不是程式語言（not a programming language）**——它沒有變數、迴圈、條件判斷，只負責「描述內容與結構」。HTML 頁面可以只是簡單文字，也可以是複雜多媒體；一份 HTML 檔案其實就是一份內含 markup tags 的文字文件，瀏覽器按這些 tags 的指示把頁面顯示出來。HTML 檔案必須使用 `.htm` 或 `.html` 副檔名。

> **HTML is not a programming language.**
> （HTML 不是程式語言。）

> **An HTML file is a text document containing markup tags. These tags tell the web browser how to display the page.**
> （HTML 檔案是包含標記標籤的文字文件；這些標籤告訴瀏覽器如何顯示頁面。）

> **HTML files must have an .htm or .html file extension.**
> （HTML 檔案必須有 .htm 或 .html 副檔名。）

### 3.4 HTML 文件的基本結構（Basic Structure of an HTML Document）

一份 HTML 文件包含兩類東西：

- **Text（文字）**：瀏覽器螢幕上顯示的內容。
- **Instructions（指令）**：由瀏覽器解讀（interpreted by the browser），以 HTML elements（即 tags）撰寫；tags 由尖括號（angle brackets）包住關鍵字識別，例如 `<a> ... </a>`。

一份 HTML 文件**最少要有三個 tags** 來識別三部分：

| Tag | 中文作用 | 瀏覽器是否顯示 |
|-----|---------|--------------|
| `<html> ... </html>` | 識別整份文件為 HTML（document type as HTML） | — |
| `<head> ... </head>` | 存放關於文件的資料（標題、關鍵字等），**不顯示** | ❌ 不顯示 |
| `<body> ... </body>` | 存放文字、連結與圖形，顯示在頁面上 | ✅ 顯示 |

> **An HTML document contains text, which is displayed by the browser screen, and instructions, which are interpreted by the browser and written in HTML elements called tags, identified by angle brackets and a keyword, e.g. `<a> ... </a>`.**
> （HTML 文件包含由瀏覽器顯示的文字，以及由瀏覽器解讀、以 tags（elements）寫成的指令；tags 以尖括號加關鍵字識別。）

> **The `<head>` element contains information about the document (editor, keywords, etc.) and is not displayed by a browser. The `<body>` element contains the text, links and graphics and is displayed on the page.**
> （`<head>` 存放文件的資料，不會被瀏覽器顯示；`<body>` 存放文字、連結與圖形，顯示在頁面上。）

**基本骨架範例（basic skeleton）：**

```html
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    This will be the text, graphics,
    links, etc.
  </body>
</html>
```

### 3.5 `<head>` 區段與 `<meta>`（The `<head>` Section and Meta Tags）

`<head>` 區段不直接顯示給用戶，用來放頁面標題（Page Titles）、關鍵字（Keywords）等，瀏覽器會為各種目的使用這些資料。典型的 `<head>` 區段如下：

```html
<head>
  <title>My first Page</title>
  <meta name="description" content="VTC/CIM Homepage">
  <meta name="keywords" content="VTC, CIM">
</head>
```

利用 `<meta>` 的 "description" 與 "keywords" tags，你可以為頁面加入關鍵字，讓各種搜尋引擎（例如 Google）能夠**索引（index）**你的網站。當文件已正確放到網頁伺服器（web server）上之後，你亦應該向搜尋引擎**註冊（register）**你的文件。

> **Using the meta "description" and "keywords" tags, you can add keywords to your pages so that search engines (such as Google) can index your site.**
> （利用 meta 的 description 與 keywords 標籤，可為頁面加入關鍵字，讓搜尋引擎索引你的網站。）

📌 **應考提示**：常考短答「Which part of an HTML document is not displayed by the browser?」→ 答案：the `<head>` section（以及其中的 `<meta>` 資料）。

### 3.6 HTML Tags 的語法（Tag Syntax）

所有控制網頁版面（layout）的指令都以 **elements（最常稱為 tags）** 形式嵌入 HTML 文件中。

**成對標籤（paired tags）：** HTML tags 通常成對出現，例如 `<b>` 與 `</b>`。一對之中的第一個是**開始標籤（start tag）**，第二個是**結束標籤（end tag）**。

> **HTML tags normally come in pairs, e.g. `<b>` and `</b>`. The first tag in a pair is the start tag; the second tag is the end tag.**
> （HTML 標籤通常成對出現，如 `<b>` 與 `</b>`；前者是開始標籤，後者是結束標籤。）

**屬性（attributes）：** 開始標籤的尖括號內可以附加屬性，屬性是「名稱/數值配對」（name/value pairs），例如 `<font size="12">` 中的 `size="12"`。

> **Within the angle brackets of the start tag there may be extra attributes (or name/value pairs), for example `<font size="12">`.**
> （開始標籤的尖括號內可有額外屬性（name/value pairs），例如 `<font size="12">`。）

**大小寫規則（case sensitivity）：** HTML element 名稱**不分大小寫**——`<b>` 等同 `<B>`。但教材強調：日後應使用**小寫（lower case）**，因為 **XHTML 規定必須用小寫**。

> **HTML element names are not case sensitive; `<b>` means the same as `<B>`. We should use lower case because XHTML requires lower case.**
> （HTML 元素名稱不分大小寫；但應使用小寫，因為 XHTML 要求小寫。）

**註解（comments）：** 檔案中可以加入註解幫助人類閱讀，瀏覽器不會顯示註解：

```html
<!-- This is comment text -->
```

> **Comments may be included in a file, to aid human readability, e.g. `<!-- This is comment text -->`.**
> （檔案中可加入註解以幫助閱讀。）

**自由格式（free-format）：** HTML 大致上是自由格式的——start tags 與 end tags 可以散落在文字任何位置；縮排（indentation）只是幫助可讀性，不影響顯示。

> **HTML is largely free-format; start tags and end tags may be scattered anywhere within the text. Indentation also aids readability.**
> （HTML 大致屬自由格式；開始與結束標籤可散落於文字任何位置，縮排有助閱讀。）

📌 **應考提示**：「Name two things inside an HTML start tag」→ 答案：the tag name / keyword, and attributes (name/value pairs)。

### 3.7 文字格式（Text Formatting）

HTML 的主要目的之一是格式化文字，教材提供大量 tags。

**標題（Headings）：`<h1>` 至 `<h6>`** —— 數字愈小字體愈大，`<h1>` 是最大標題、`<h6>` 是最小標題。

```html
<html>
<head>
  <title>Untitled</title>
</head>
<body>
  <h1>This is heading 1</h1>
  <h2>This is heading 2</h2>
  <h3>This is heading 3</h3>
  <h4>This is heading 4</h4>
  <h5>This is heading 5</h5>
  <h6>This is heading 6</h6>
</body>
</html>
```

> **Headings are defined with the tags `<h1>` to `<h6>`, where `<h1>` defines the most important (largest) heading and `<h6>` the least important (smallest).**
> （標題以 `<h1>` 至 `<h6>` 定義，`<h1>` 最重要（最大），`<h6>` 最不重要（最小）。）

**文字格式（Physical Style Formatting）：** 教材列出的實體樣式標籤如下：

| Tag | 英文名稱 | 作用 |
|-----|---------|------|
| `<i> ... </i>` | Italic | 斜體 |
| `<b> ... </b>` | Bold | 粗體 |
| `<u> ... </u>` | Underline | 底線 |
| `<big> ... </big>` | Enlarged font | 放大字體 |
| `<sub> ... </sub>` | Subscript | 下標 |
| `<sup> ... </sup>` | Superscript | 上標 |
| `<tt> ... </tt>` | Teletype (fixed-width) font | 等寬字型（打字機字體） |

> **One of the main purposes of HTML is to format text. Physical style tags such as `<b>` (bold), `<i>` (italic) and `<u>` (underline) specify how text should be displayed.**
> （HTML 的主要目的之一是格式化文字；`<b>`、`<i>`、`<u>` 等實體樣式標籤指定文字如何顯示。）

**段落（Paragraphs）：`<p> ... </p>`** —— 每個 `<p>` 自成一段，段與段之間有垂直間距。

```html
<html>
<head>
  <title>Untitled</title>
</head>
<body>
  <p>This is paragraph 1.</p>
  <p>This is paragraph 2.</p>
  <p>This is paragraph 3.</p>
</body>
</html>
```

**換行（Line breaks）：`<br />`** —— 重點考點：`<br>` **沒有結束標籤（`</br>` 不存在）**。要把這個 tag 轉成 XHTML 並確保與 HTML 瀏覽器相容，就要在 tag 末尾加一個空格與一條斜線，寫成 `<br />`。

> **`<br>` has no closing tag (`</br>`) in HTML. To convert this tag to XHTML and ensure compatibility with HTML browsers, add a space and a forward slash to the end of the tag: `<br />`.**
> （`<br>` 在 HTML 中沒有結束標籤；要轉成 XHTML 並確保相容，須在標籤末尾加空格與斜線，寫成 `<br />`。）

**預格式文字（Preformatted text）：`<pre> ... </pre>`** —— 保留原來的空格與換行，適合顯示欄位對齊的文字（如通訊錄表格）：

```html
<pre>
  Name   Tel    Year
  John   123    1st
  Mary   345    2nd
</pre>
```

> **The `<pre>` tag defines preformatted text, in which spaces and line breaks are preserved exactly as typed.**
> （`<pre>` 定義預格式文字，空格與換行會原樣保留。）

📌 **應考提示**：XHTML 相容性短答題離不開「`<br />` 要加 space + forward slash」這個細節；同時記得 `<p>` 有結束標籤、`<br>` 沒有。

### 3.8 超連結（Hyperlinks）

連結可以嵌入 HTML 文件任何位置。一個連結可以引用四種目標（links may contain a reference to）：

1. **遠端網頁（remote Web page）**——以完整 URL 指定，必須加上 `http://`；
2. **本地網頁（local Web page）**——以檔名指定，該檔案位於**目前頁面所在的目錄**內；
3. **本地網頁（local Web page）**——以相對路徑指定，檔名相對於目前頁面的目錄（例如 `./var/test2.html`）；
4. **目前頁面內的某一行（a line within the current page）**——即 **anchor（錨點）**。

> **Links may be embedded anywhere in an HTML document. A link may reference a remote Web page by a full URL (with http://), a local Web page by its filename in the current directory or relative to the current directory, or a line within the current page (an anchor).**
> （連結可嵌入 HTML 文件任何位置，可引用：以完整 URL 指定的遠端網頁、以目前目錄或相對目錄檔名指定的本地網頁，或目前頁面內的某一行（anchor）。）

**完整範例（four ways of referencing other documents）：**

```html
<html>
<body>
<h1>This is another Web page.</h1><br />
<p>There are 4 ways of referencing other documents:</p>
<ol>
  <li>Absolute:
     <a href="http://www.vtc.edu.hk">This text</a> is a link to the VTC.</li>
  <li>Relative:
     <a href="test.html">This text</a> is a link to a local HTML page.</li>
  <li>Relative:
     <a href="./var/test2.html">This text</a> is also a link to a local HTML page.</li>
  <li>Anchor:
     <a href="#xyz">Go to anchor</a></li>
</ol>
<br />
This is the anchored location <a name="xyz"></a>
</body>
</html>
```

四種寫法逐點拆解：

- **Absolute（絕對）：** `href="http://www.vtc.edu.hk"` —— 完整 URL 含協定 `http://`，指向另一部伺服器上的網頁。
- **Relative（相對，同一目錄）：** `href="test.html"` —— 只寫檔名，瀏覽器在**目前頁面的目錄**內尋找 `test.html`。
- **Relative（相對，子目錄路徑）：** `href="./var/test2.html"` —— `./` 表示由目前目錄出發，進入 `var` 資料夾找 `test2.html`。
- **Anchor（錨點，頁內跳轉）：** 兩步配合——來源用 `href="#xyz"`，目標位置用 `<a name="xyz"></a>`（建立名為 `xyz` 的 anchor），點擊後跳到頁內該位置。

> **An absolute link uses a full URL such as `http://www.vtc.edu.hk`, while a relative link refers to a file by its filename, either in the directory of the current page or relative to it. An anchor link (`href="#xyz"`) jumps to a location within the current page marked by `<a name="xyz"></a>`.**
> （絕對連結使用完整 URL；相對連結以檔名引用目前目錄或其相對路徑的檔案；anchor 連結跳往目前頁面內以 `name` 標記的位置。）

### 3.9 水平線（Horizontal Lines / Rules）

`<hr />` element 在頁面上畫一條水平線。它的屬性包括：

- `align=`：線的對齊位置，**預設值 "center"**；
- `size=`：線的粗細，以**像素（pixels）**計，**預設值 2**；
- `width=`：線的水平闊度，**預設值 "100%"**；可以像素指定，亦可以螢幕闊度的**百分比**指定。

```html
<hr size="6" width="400" />
<hr size="6" width="50%" />
<hr align="left" size="6" width="100" />
```

> **The `<hr />` element creates a horizontal line on the page. Its attributes include align (default "center"), size in pixels (default 2) and width (default "100%"), which can be given in pixels or as a percentage of the screen width.**
> （`<hr />` 在頁面建立水平線；屬性包括 align（預設 center）、以像素計的 size（預設 2）與 width（預設 100%），width 可用像素或螢幕闊度百分比表示。）

📌 **應考提示**：考官喜歡考 `<hr />` 三屬性的**預設值**：align=center、size=2、width=100%。另外留意範例中 `width` 與 `size` 都是數字（像素），只有 `width` 可用百分比（如 `50%`）。

### 3.10 HTML 字符集與字符實體（Character Set and Entities）

HTML 檔案中，**尖括號（angle brackets）以外的所有文字**都會被瀏覽器當成文字顯示。但 HTML 檔案只容許使用**標準 ASCII 文字**，那麼我們要顯示特殊字符（如 `&`、`<`、`>`、`©`）時怎麼辦？答案是使用**字符實體（named entities）**或**數字字符引用（numeric character references）**。

> **All text in an HTML file, outside of element angle brackets, is displayed as text by a web browser. Only standard ASCII text may be used in an HTML file, so named entities are used to display special characters.**
> （HTML 檔案中尖括號以外的文字都會被瀏覽器當文字顯示；由於 HTML 檔案只容許標準 ASCII 文字，因此用 named entities 顯示特殊字符。）

**規則：** Named entity 以 **ampersand（`&`）** 開始、以 **semicolon（`;`）** 結束，而且**名稱分大小寫（case sensitive）**。

> **Named entities begin with an ampersand (`&`) and end with a semicolon (`;`). The names are case sensitive.**
> （Named entities 以 & 開始、以 ; 結束，名稱大小寫敏感。）

**教材實體對照表（named entities 與 numeric references）：**

| Entity（寫法） | 顯示字符 | 名稱/說明 |
|----------------|---------|----------|
| `&reg;` | ® | registered trademark（註冊商標） |
| `&copy;` | © | copyright（版權） |
| `&amp;` | & | ampersand（必須用實體，否則與 entity 起頭的 & 混淆） |
| `&quot;` | " | double quotation mark（雙引號） |
| `&lt;` | < | less than sign（小於號；直接寫 < 會被當成 tag 起頭） |
| `&gt;` | > | greater than sign（大於號） |
| `&nbsp;` | (空格) | non-breaking space（不斷行空格） |
| `&#x1F60D;` | 😍 | numeric reference（十六進制，`&#x...;`）→ emoji |
| `&#x26C4;` | ⛄ | numeric reference → emoji |
| `&#x1F385;` | 🎅 | numeric reference → emoji |
| `&#x1F3BC;` | 🎼 | numeric reference → emoji |
| `&#x1F47D;` | 👽 | numeric reference → emoji |

📌 **應考提示**：四個必背 named entities：`&lt;`（<）、`&gt;`（>）、`&amp;`（&）、`&nbsp;`（non-breaking space）。數字引用格式有兩種：十進制 `&#169;` 與十六進制 `&#xA9;`／`&#x1F60D;`（教材例子用 `&#x` 開頭，即 hexadecimal）。

### 3.11 文字對齊（Text Alignment）：align 屬性、`<div>` 與 `<span>`

要對齊**單一的**標題或段落，可在該元素加上 `align="left"`、`align="right"` 或 `align="center"` 屬性（教材原文誤串為 "alight"，實際是 **align**）。

> **To align an individual heading or paragraph, use the `align="left"`, `align="right"` or `align="center"` attributes.**
> （要對齊單一標題或段落，使用 align 屬性，值為 left、right 或 center。）

**更靈活的方法：division element `<div>`**。`<div>` 可以有數個屬性（例如 `align=`），所有屬性都會套用到 division 內包含的全部文字。`<div>` 相比 align 屬性有**兩大優點**：

1. `<div>` **只需寫一次**，毋須為很多元素逐一加 align 屬性；
2. `<div>` 可以對齊**任何 block element**，即使是那些 tag 結構內本來沒有 align 屬性的元素。

> **The `<div>` element may have several attributes (e.g. `align=`), all of which are applied to all of the text held within the division. `<div>` needs to be used only once, and it can align any block element, even ones that do not have the align attribute within their tag structure.**
> （`<div>` 元素可帶多個屬性，全部套用於其內所有文字；它只需寫一次，且能對齊任何 block element，包括本身沒有 align 屬性的元素。）

**行內容器 `<span>`：** `<span>` 用來包圍**個別單字或一組單字**（inline 層級），教材指會在之後的 CSS 課堂再詳細討論。

> **`<span>` may be used to surround individual words or groups of words.**
> （`<span>` 可用來包圍個別單字或一組單字。）

📌 **應考提示**：對比題常用句型——"`<div>` is a block-level element used to group blocks of content, while `<span>` is an inline element used to style part of a line." 記住 div 管「塊」，span 管「行內一小段」。

### 3.12 HTML5：背景、設計原則與新標籤

**背景（background）：** HTML5 是 **W3C（World Wide Web Consortium，全球資訊網協會）** 與 **WHATWG（Web Hypertext Application Technology Working Group）** 合作的成果。WHATWG 當時專注於 web forms 與 web applications，W3C 則在發展 XHTML 2.0；2006 年兩者決定合作，創建新版本的 HTML。

> **HTML5 is a cooperation between the World Wide Web Consortium (W3C) and the Web Hypertext Application Technology Working Group (WHATWG).**
> （HTML5 是 W3C 與 WHATWG 合作的成果。）

**HTML5 設計規則（rules established for HTML5）：**

- 新功能應以 **HTML、CSS、DOM 與 JavaScript** 為基礎；
- 減少對外部插件（external plugins，如 Flash）的需要；
- **更佳的錯誤處理（better error handling）**；
- 用**更多 markup** 取代 scripting；
- HTML5 應**與裝置無關（device independent）**；
- 開發過程應對**公眾**透明可見。

> **HTML5 design rules: new features should be based on HTML, CSS, DOM and JavaScript; reduce the need for external plugins (like Flash); provide better error handling; use more markup to replace scripting; be device independent; and keep the development process visible to the public.**
> （HTML5 設計規則：新功能以 HTML/CSS/DOM/JavaScript 為基礎；減少對外部插件（如 Flash）的需要；更好的錯誤處理；以更多 markup 取代 scripting；與裝置無關；開發過程對公眾可見。）

**HTML5 的 `<!DOCTYPE>`：** HTML5 只有**一種** doctype 宣告，而且非常簡單：

```html
<!DOCTYPE html>
```

> **In HTML5 there is only one `<!DOCTYPE>` declaration, and it is very simple: `<!DOCTYPE html>`.**
> （HTML5 只有一個 doctype 宣告，而且非常簡單：`<!DOCTYPE html>`。）

📌 **應考提示**：對比題熱點——舊版 HTML/XHTML 需要冗長 doctype（如 XHTML 1.0 Transitional 的整串 URL），HTML5 只需要 `<!DOCTYPE html>`。

**語義標籤 `<header>`：** `<header>` tag 為**文件或區段（document or section）**指定頁首；它應作為**引言內容（introductory content）或一組導覽連結（navigational links）的容器**。同一份文件可以有多個 `<header>` element（例如每篇文章一個 header）。

> **The `<header>` tag specifies a header for a document or section. The `<header>` element should be used as a container for introductory content or a set of navigational links. You can have several `<header>` elements in one document.**
> （`<header>` 為文件或區段指定頁首，應用作引言內容或導覽連結的容器；一份文件可以有多個 `<header>` 元素。）

**完整範例（`<header>`、`<article>` 與 `<time>` 的協作）：**

```html
<!DOCTYPE html>
<html>
<body>
<article>
  <header>
    <h1>Internet Explorer 9</h1>
    <p><time pubdate datetime="2011-03-15"></time></p>
  </header>
  <p>Windows Internet Explorer 9 (abbreviated as IE9) was released to
  the public on March 14, 2011 at 21:00 PDT.....</p>
</article>
</body>
</html>
```

範例拆解：

- `<article>` 定義一篇可獨立成篇的內容組合（self-contained composition）；
- `<header>` 放文章的標題區——`<h1>` 文章標題 + `<time>` 發佈日期；
- `<time>` 以機器可讀格式標示日期／時間，`datetime="2011-03-15"` 提供實際數值，`pubdate` 標示該時間為內容的發佈日期。

> **The `<article>` element represents a self-contained composition; the `<time>` element represents a date/time in a machine-readable format via its `datetime` attribute.**
> （`<article>` 代表一篇獨立完整的內容；`<time>` 以 `datetime` 屬性提供機器可讀的日期時間。）

---

## 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| Web page | 網頁：設計給瀏覽器顯示的 web document | "A web page is a web document designed to be displayed in a web browser on the World Wide Web." |
| Web browser | 網頁瀏覽器：解讀 HTML 並顯示頁面的軟件 | "A web browser interprets the markup tags in an HTML file and displays the page on a monitor or mobile device." |
| Hypertext | 超文字：經由 hyperlinks 連結其他內容的文字系統 | "Web pages provide hypertext, which links to other pages through hyperlinks." |
| Hyperlink / link | 超連結：跳到另一網頁或頁內位置的連結 | "A hyperlink (or link) is used to jump to another web page or to another part of the same page." |
| HTML (HyperText Markup Language) | 超文字標記語言：給瀏覽器顯示用的標記元素集合 | "HTML is the set of markup elements or tags placed in a file intended for display on a web browser." |
| XML (eXtensible Markup Language) | 可延伸標記語言：描述與交換結構化資料、可自訂標籤 | "XML is a text-based language used to describe, deliver and exchange structured information; it separates data from presentation." |
| XHTML (eXtensible Hypertext Markup Language) | XHTML 1.0：HTML 4.0 作為 XML 應用的版本 | "XHTML 1.0 is HTML 4.0 developed as an application of XML, combining HTML formatting with XML structure and extensibility." |
| Markup language | 標記語言：用 tags 標示內容結構與顯示方式的語言 | "HTML is a markup language, not a programming language." |
| Tag / Element | 標籤／元素：尖括號包住關鍵字的指令 | "Tags are identified by angle brackets and a keyword, e.g. `<a>...</a>`." |
| Start tag / End tag | 開始標籤／結束標籤：成對標籤的前後兩半 | "HTML tags normally come in pairs; the first tag is the start tag and the second is the end tag." |
| Attribute (name/value pair) | 屬性：開始標籤內以「名稱=值」附加的設定 | "Attributes are name/value pairs placed within the angle brackets of the start tag, e.g. `size=\"12\"`." |
| Case sensitive | 大小寫敏感 | "HTML element names are not case sensitive, but lower case should be used because XHTML requires it." |
| Comment | 註解：給人看的說明文字，瀏覽器忽略 | "Comments `<!-- ... -->` aid human readability and are ignored by the browser." |
| `<html>` | 包住整份 HTML 文件的根元素 | "The `<html>` tag identifies the document type as HTML." |
| `<head>` | 頁首區：存放文件資料，不顯示 | "The `<head>` section contains information about the document, such as the title and keywords, and is not displayed by the browser." |
| `<body>` | 主體區：存放顯示內容 | "The `<body>` element contains the text, links and graphics that are displayed on the page." |
| `<title>` | 頁面標題（顯示於瀏覽器分頁／標題列） | "The `<title>` element defines the title of the document." |
| `<meta>` tag | 提供頁面描述與關鍵字等中繼資料 | "The `<meta name=\"description\">` and `<meta name=\"keywords\">` tags help search engines index the site." |
| Index / register with a search engine | 讓搜尋引擎收錄網站 | "Meta keywords allow search engines such as Google to index your site; you should also register your documents with a search engine." |
| Heading `<h1>`–`<h6>` | 標題標籤（一至六級） | "The tags `<h1>` to `<h6>` define headings; `<h1>` is the largest and `<h6>` the smallest." |
| Physical style formatting | 實體樣式格式（b、i、u 等直接指定外觀） | "Physical style tags such as `<b>` (bold) and `<i>` (italic) specify the exact appearance of the text." |
| `<p>` (paragraph) | 段落標籤 | "The `<p>` tag defines a paragraph of text." |
| `<br />` (line break) | 換行標籤（空標籤，無結束標籤） | "`<br>` has no closing tag; in XHTML it is written as `<br />` with a space and a forward slash." |
| `<pre>` (preformatted text) | 預格式文字：保留空格與換行 | "The `<pre>` tag displays preformatted text, preserving spaces and line breaks." |
| Absolute URL | 絕對位址：含 http:// 的完整網址 | "An absolute link specifies a full URL, for example `http://www.vtc.edu.hk`." |
| Relative link | 相對連結：以檔名／相對路徑引用本地檔案 | "A relative link refers to a file by its filename relative to the directory of the current page, e.g. `test.html` or `./var/test2.html`." |
| Anchor | 錨點：跳到頁內指定位置 | "An anchor link uses `href=\"#xyz\"` to jump to the location marked by `<a name=\"xyz\"></a>`." |
| `<hr />` (horizontal rule) | 水平線元素 | "The `<hr />` element creates a horizontal line; its attributes are align (default center), size in pixels (default 2) and width (default 100%)." |
| Named entity | 字符實體：以 & 開始、; 結束的特殊字符寫法 | "A named entity begins with an ampersand (`&`) and ends with a semicolon (`;`); names are case sensitive." |
| `&amp;` / `&lt;` / `&gt;` / `&nbsp;` | 顯示 &、<、>、不斷行空格 | "Use `&amp;` for &, `&lt;` for <, `&gt;` for > and `&nbsp;` for a non-breaking space." |
| Numeric character reference | 數字字符引用（`&#x...;` 十六進制／`&#...;` 十進制） | "Special characters can also be written as numeric references such as `&#x1F60D;`, which displays an emoji." |
| `align` attribute | 對齊屬性（left / right / center） | "Use `align=\"left\"`, `align=\"right\"` or `align=\"center\"` to align an individual heading or paragraph." |
| `<div>` (division) | 區塊容器元素 | "`<div>` is a block-level container; its attributes apply to all of the text within the division, and it can align any block element." |
| `<span>` | 行內容器元素 | "`<span>` is used to surround individual words or groups of words within a line." |
| W3C (World Wide Web Consortium) | 全球資訊網協會 | "HTML5 is the result of cooperation between the W3C and WHATWG." |
| WHATWG (Web Hypertext Application Technology Working Group) | 網頁超文字應用技術工作小組 | "WHATWG worked on web forms and applications while the W3C worked on XHTML 2.0; in 2006 they agreed to cooperate." |
| `<!DOCTYPE html>` | HTML5 的 doctype 宣告 | "In HTML5 there is only one doctype declaration and it is very simple: `<!DOCTYPE html>`." |
| `<header>` | 文件／區段的頁首容器 | "The `<header>` element specifies a header for a document or section; several `<header>` elements may appear in one document." |
| `<article>` | 獨立成篇的內容區塊 | "The `<article>` element represents a self-contained composition such as a news article." |
| `<time>` | 機器可讀日期／時間元素 | "The `<time>` element marks a date or time in machine-readable form with its `datetime` attribute." |
| External plugin | 外部插件（如 Flash） | "HTML5 aims to reduce the need for external plugins such as Flash." |

---

## 🗺️ 循序漸進學習路線 (Learning Path)

### Stage 1 — 網頁與 HTML 本質
- **先理解**：瀏覽器負責把 HTML 文件「顯示」出來；網頁 = web document；HTML 只是 markup language，**不是程式語言**，檔案用 `.htm`／`.html`。
- **背誦**："A web page is a web document designed to be displayed in a web browser."、"HTML is a markup language, not a programming language."
- **掌握**：能口頭解釋 hypertext / hyperlink / navigation bar。
- **能解答**："What is a web page?" / "Why is HTML not a programming language?" / "What file extensions do HTML files use?"

### Stage 2 — HTML／XML／XHTML 對比
- **先理解**：HTML 管顯示、XML 管資料（可分離 data 與 presentation、可自訂 tags）、XHTML = HTML 4.0 以 XML 應用形式重寫。
- **背誦**：三個全名：HyperText Markup Language、eXtensible Markup Language、eXtensible Hypertext Markup Language，以及 "XML separates data from presentation."
- **掌握**：用表格比較三者用途與關係。
- **能解答**："Distinguish between HTML and XML." / "What is XHTML 1.0?"

### Stage 3 — HTML 文件結構與 `<head>`
- **先理解**：文件最少三個 tags——`<html>`（文件類型）、`<head>`（資料、不顯示）、`<body>`（顯示內容）；`<title>` 與 `<meta name="description/keywords">` 供搜尋引擎索引。
- **背誦**："The `<head>` section is not displayed by the browser; it contains the page title and meta information."、"Meta keywords help search engines index the site."
- **掌握**：默寫基本骨架（html → head → title → body）與典型 `<head>` 區段。
- **能解答**："Draw the basic structure of an HTML document." / "Which part of an HTML document is not displayed and why?"

### Stage 4 — Tag 語法與文字格式
- **先理解**：start tag／end tag 成對；attributes = name/value pairs（`<font size="12">`）；HTML 不分大小寫但 XHTML 要小寫；`<!-- 註解 -->`；自由格式＋縮排。
- **背誦**："Tags normally come in pairs; the first is the start tag and the second is the end tag."；每個物理格式標籤的英文名（bold、italic、underline、subscript、superscript、teletype）。
- **掌握**：實際寫一份含 `<h1>`–`<h6>`、`<p>`、`<br />`、`<pre>`、`<b>/<i>/<u>/<sub>/<sup>` 的網頁。
- **能解答**："Name five text formatting tags and their effects." / "Why must `<br />` be written with a space and a slash in XHTML?"

### Stage 5 — 超連結與水平線
- **先理解**：四種引用方式——absolute（`http://` 完整 URL）、relative（同目錄檔名）、relative（`./var/...` 相對路徑）、anchor（`#xyz` ↔ `name="xyz"`）。
- **背誦**："An absolute link uses a full URL with http://; a relative link refers to a file relative to the current directory; an anchor jumps within the same page."
- **掌握**：寫 `<a href="...">link text</a>` 的四種變體；用 `<hr align size width />` 畫線。
- **能解答**："What are the four ways to reference other documents in HTML? Give examples." / "State the default values of the `<hr>` attributes."

### Stage 6 — 字符實體與對齊
- **先理解**：`&` 開頭、`;` 結尾、大小寫敏感；`&lt; &gt; &amp; &nbsp; &copy; &reg;`；數字引用 `&#x...;`（十六進制）；align 屬性 vs `<div>`（兩大優點）vs `<span>`（行內）。
- **背誦**："Named entities begin with `&` and end with `;`."；"`&lt;` gives `<`, `&gt;` gives `>` and `&amp;` gives `&`."
- **掌握**：在段落中正確顯示 `<` 與 `&`；用 `<div align="center">` 一次過置中整塊內容。
- **能解答**："How do you display the `<` character in an HTML page?" / "Compare `<div>` with the align attribute; compare `<div>` with `<span>`."

### Stage 7 — HTML5 與語義標籤
- **先理解**：W3C + WHATWG 合作背景；六大設計規則；一個簡短 doctype；`<header>`（可多個）、`<article>`、`<time datetime pubdate>`。
- **背誦**："HTML5 is a cooperation between the W3C and WHATWG."、"In HTML5 the doctype is simply `<!DOCTYPE html>`."
- **掌握**：寫一個含 `<!DOCTYPE html>`、`<article>`、`<header>`、`<time>` 的完整頁面。
- **能解答**："Explain the background and design rules of HTML5." / "What does the `<header>` element do, and how many can a document have?"

### Stage 8 — 綜合應用（模擬考題練習）
把以上全部整合：自己寫一個「個人檔案」網頁——要有正確骨架、`<head>` 加 title 與 meta、`<h1>` 標題、`<p>` 段落、一個 absolute 連結去學校網站、一個 anchor 跳轉、一個 `<hr />`、一個顯示 `©` 與 `<` 符號的 footer、用 `<div>` 置中。完成後嘗試用英文向自己解釋每一行的作用——這就是考官最喜歡問的 "Explain the purpose of this tag" 題型。

---

## 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### A. 關鍵標籤快速對照表

| 分類 | Tag | 作用 | 英文定義一句背 |
|------|-----|------|--------------|
| 結構 | `<html> ... </html>` | 整份文件的根 | "Identifies the document type as HTML." |
| 結構 | `<head> ... </head>` | 文件資料（不顯示） | "Contains document information; not displayed." |
| 結構 | `<title> ... </title>` | 頁面標題 | "Defines the title of the page." |
| 結構 | `<body> ... </body>` | 顯示內容 | "Contains the text, links and graphics shown on the page." |
| 標題 | `<h1>` … `<h6>` | 六級標題 | "`<h1>` is the largest heading, `<h6>` the smallest." |
| 段落 | `<p> ... </p>` | 段落 | "Defines a paragraph." |
| 換行 | `<br />` | 換行（空標籤） | "Line break; written `<br />` in XHTML." |
| 預格式 | `<pre> ... </pre>` | 保留空格換行 | "Displays preformatted text." |
| 物理格式 | `<b>` `<i>` `<u>` | 粗體／斜體／底線 | "Physical style formatting: bold, italic, underline." |
| 物理格式 | `<sub>` `<sup>` | 下標／上標 | "Subscript and superscript text." |
| 物理格式 | `<big>` `<tt>` | 放大／等寬字 | "Enlarged font; teletype (fixed-width) font." |
| 連結 | `<a href="...">` | 超連結 | "Creates a hyperlink to another document." |
| 錨點 | `<a name="...">` | 頁內位置標記 | "Marks an anchor location within the page." |
| 水平線 | `<hr />` | 水平線 | "Creates a horizontal rule." |
| 註解 | `<!-- ... -->` | 註解 | "Comments aid readability; ignored by browsers." |
| HTML5 | `<!DOCTYPE html>` | 文件類型宣告 | "The only and very simple HTML5 doctype." |
| HTML5 | `<header>` `<article>` `<time>` | 語義標籤 | "Header for a document/section; self-contained article; machine-readable time." |

### B. `<hr />` 屬性速記（ASW：Align–Size–Width）

| 屬性 | 作用 | 預設值 (Default) |
|------|------|-----------------|
| `align` | 對齊位置 | `center` |
| `size` | 粗細（像素） | `2` |
| `width` | 闊度（像素或百分比） | `100%` |

### C. 必背字符實體（極速記憶）

| 想顯示 | 記法 | Entity |
|--------|------|--------|
| `<` | **L**ess-than → `&lt;`（t = than） | `&lt;` |
| `>` | **G**reater-than → `&gt;` | `&gt;` |
| `&` | **AMP**ersand → `&amp;` | `&amp;` |
| 空格（不換行） | **N**on-**B**reaking → `&nbsp;` | `&nbsp;` |
| © | Copy**right** → `&copy;` | `&copy;` |
| ® | **Reg**istered → `&reg;` | `&reg;` |
| emoji | 數字引用：`&#x` + 十六進制碼 + `;` | `&#x1F60D;` → 😍 |

### D. 英文極速記憶口訣（Mnemonics）

1. **"HTML has a Head and a Body"** —— 像一個人：Head「諗嘢唔露面」（資料、不顯示），Body「出嚟見人」（內容、顯示）。
2. **"h1 biggest, h6 smallest"** —— 標題數字愈大，字體愈細；`<h1>` = 最重要。
3. **"AMP starts with &; break has no buddy"** —— named entities 以 `&` 開始；`<br>` 沒有配對結束標籤，XHTML 要寫 `<br />`（space + slash）。
4. **"Left = Less than"** —— `&lt;` 的符號 `<` 開口向左，讀 "Less Than"；`&gt;` 開口向右 = "Greater Than"。
5. **"Two As for alignment"** —— 對齊個別元素用 `align=` 屬性；對齊一大塊用 `<div align=>`（寫一次、管晒全部 block elements）；行內小段用 `<span>`。
6. **"XHTML = HTML in XML's clothes"** —— XHTML 1.0 = HTML 4.0 內容 + XML 規則（所以要小寫、要關閉 `<br />`）。
7. **"One short doctype for HTML5"** —— HTML5 只有一個 doctype：`<!DOCTYPE html>`；舊版才需要長宣告。
8. **"HTML5 dislikes Flash"** —— HTML5 設計原則：少用 external plugins、更多 markup 取代 scripting、與裝置無關（device independent）。

### E. 一分鐘英文答題模板（Top 5 必考題）

1. **What is a web page?** → "A web page is a web document designed to be displayed in a web browser on the World Wide Web."
2. **What is HTML?** → "HTML (HyperText Markup Language) is the set of markup elements or tags placed in a file intended for display on a web browser. It is a markup language, not a programming language."
3. **Explain the structure of an HTML document.** → "An HTML document contains at least three tags: `<html>`, which identifies the document as HTML; `<head>`, which holds information about the document and is not displayed; and `<body>`, which contains the text, links and graphics that are displayed."
4. **What is the difference between an absolute link and a relative link?** → "An absolute link uses a full URL, such as http://www.vtc.edu.hk, while a relative link refers to a file by its filename relative to the directory of the current page, such as test.html."
5. **How do you display a special character like `<` in HTML?** → "Since only standard ASCII text may be used in an HTML file, I use a named entity such as `&lt;`, which begins with an ampersand and ends with a semicolon, to display the `<` character."
