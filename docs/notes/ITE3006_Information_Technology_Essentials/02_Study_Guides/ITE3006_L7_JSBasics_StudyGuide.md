# ITE3006 Topic 7: JavaScript Basics — 雙語應考學習指南（Bilingual & Exam-Ready Study Guide）

> 適用課程：ITE3006 Information Technology Essentials
> 主題：Topic 7 — JavaScript Basics（JavaScript 基礎）
> 學習方式：繁體中文拆解邏輯 + 英文標準定義句（Blockquote）+ 可背誦的考試英文句型
> 前設知識：建議先完成 Topic 1–3（HTML 結構、表單與輸入元件），因為本課大量 JavaScript 例子都嵌在 HTML 文件內

---

## 📝 課程概要與實務情境 (Summary & Real-world Context)

Topic 7 帶你進入網頁開發的「互動」世界。前幾課的 HTML 負責**靜態內容**（顯示文字、圖片、表單），但純 HTML 只能「睇」，不能「反應」；本課引入 **JavaScript**——一種在**網頁瀏覽器（web browser）上執行**的 **client-side scripting language**（用戶端腳本語言），語法與 C# 相近。它的兩大典型用途是：一、在表單資料**提交（submit）到伺服器之前**先做用戶端驗證（validate form data），省去來回伺服器的網絡時間；二、**回應使用者的動作**，即所謂 **event-driven**（事件驅動）——例如點擊按鈕（clicking a button）、拖曳滑鼠（dragging a mouse）、載入頁面（loading a page）、提交表單（submitting a form）都會觸發對應的程式碼。教材循序講解如何把 script 放進 HTML（四種載入方法）、對話框、事件處理、變數、陣列、運算子、`if`／`switch` 流程控制、三種迴圈與函數。

實務情境一：你負責公司網站一個「聯絡我們」表單。如果不寫 JavaScript，使用者按「提交」後資料會直接送去伺服器；若電郵格式打錯或必填欄位空白，伺服器才回傳錯誤，既慢又浪費頻寬。用 JavaScript 寫一個 `onsubmit` 事件或按鈕的 `onclick` 驗證函數，就可以在提交前即時攔截錯誤、彈出 `alert()` 提示。實務情境二：你想在首頁做「滑鼠移過產品圖片時彈出說明」的效果，或按「加入購物車」時彈出確認視窗——這些都靠 event handler（如 `onmouseover`、`onclick`）呼叫 JavaScript 函數。換句話說，本課是「靜態 HTML 頁」進化到「互動式網頁應用程式（interactive web application）」的關鍵一步，亦是 ITE3006 考試中程式邏輯題（trace 程式輸出、找語法錯誤）的主要出題範圍。

---

## 🎯 考試學習目標 (Learning Objectives)

考官會透過以下能力指標測試你對本課的掌握（附英文對照）：

1. **定義 JavaScript 的本質** — 能說明它是 client-side scripting language、在瀏覽器執行、語法近似 C#。（*Define JavaScript as a client-side scripting language executed in the web browser with C#-like syntax.*）
2. **說出 JavaScript 的典型用途** — 能舉出表單提交前驗證與回應使用者動作（event-driven）兩個例子。（*State typical JavaScript usage: validating form data before submission and reacting to user actions in an event-driven manner.*）
3. **列舉四種把 script 放入 HTML 的方法** — `<script>` 元素內、`src` 外連 `.js` 檔案、HTML event handler attribute（如 `onclick`）、`javascript:` pseudo-URL。（*List the four standard script inclusion methods.*）
4. **撰寫並解釋第一個程式** — 能寫出用 `document.write()` 輸出字串的完整 HTML 頁，並知道 `<script>` 放 `<head>` 與 `<body>` 的分別。（*Write a JavaScript Hello World example and explain where scripts may be placed.*）
5. **使用三種對話框** — `alert()`、`confirm()`、`prompt()` 的用途與分別，並知道 `alert()` 可用於除錯。（*Use the alert, confirm and prompt dialog boxes and their window. prefixes.*）
6. **解釋事件處理機制** — 能說出 event handler attributes（`onclick`、`onmouseover`、`onload`、`onsubmit` 等）如何綁定 JavaScript 陳述。（*Explain event-driven programming using HTML event handler attributes.*）
7. **描述 JavaScript 基本語言特性** — 執行順序（top to bottom、`<head>` 先於 `<body>`）、大小寫敏感（case-sensitive）、statement 以換行或分號結束、兩種註解。（*Describe basic JavaScript features: execution order, case sensitivity, statement terminators and comments.*）
8. **宣告變數與分辨 scope** — 識別變數命名規則、`var` 用法、global variable 與 local variable 的分別及不寫 `var` 的風險。（*Declare variables with var and distinguish global from local scope.*）
9. **使用陣列** — 以 literal 或 `new Array()` 建立、以 0-based index 存取、讀取 `length`。（*Create and access arrays using 0-based indices and the length property.*）
10. **運用運算子** — 算術、遞增遞減、比較、邏輯、字串連接（`+`），並理解 operator precedence（用括號控制求值順序）。（*Apply arithmetic, comparison, logical and string operators with correct precedence.*）
11. **控制流程** — 用 `if … else`、`switch … case` 及三種迴圈 `while`、`do … while`、`for` 完成分支與重複執行。（*Use selection statements and all three loop types, and avoid infinite loops.*）
12. **定義與呼叫函數** — 寫出 `function name(parameter list)`，以名稱呼叫、傳值（pass by value）並用 `return` 回傳結果。（*Define and invoke functions, pass arguments by value and return values.*）
13. **對比 Java** — 能指出 JavaScript（loosely-typed、免寫資料型別）與 Java（強型別、必須宣告型別）在陣列與函數上的語法差異。（*Compare JavaScript syntax with Java for arrays and functions.*）

---

## 📖 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 JavaScript 是甚麼（What is JavaScript?）

JavaScript 是**用戶端（client-side）**的 scripting language——即程式碼不是在你的伺服器上跑，而是被下載到訪客的**網頁瀏覽器**裏執行。它是 scripting language（腳本語言），語法風格與 C#（及 Java）相似：有變數、運算子、函數、條件與迴圈。它與 HTML 的關係是：HTML 提供結構，JavaScript 注入行為（behavior）。

> **JavaScript is a client-side scripting language used on the web browser.**
> （JavaScript 是一種在網頁瀏覽器上使用的用戶端腳本語言。）

> **A scripting language with syntax like C#.**
> （一種語法與 C# 相似的腳本語言。）

**典型用途（Typical JavaScript Usage）：**

> **Validate form data prior to submission to web server.**
> （在把資料提交到網頁伺服器之前先驗證表單資料。）

> **React to user's actions — event-driven.**
> （回應使用者的動作——事件驅動。）

**Event-driven**（事件驅動）的意思是：程式不會由頭到尾盲目執行一次就完，而是「等待事件發生 → 觸發對應程式碼」。教材列出的典型事件（typical events）：

- clicking a button（點擊按鈕）
- dragging a mouse（拖曳滑鼠）
- loading a page（載入頁面）
- submitting a form（提交表單）

> **Typical events are clicking a button, dragging a mouse, loading a page or submitting a form.**
> （典型事件包括點擊按鈕、拖曳滑鼠、載入頁面或提交表單。）

📌 **應考提示**：定義題「What is JavaScript?」的標準答句 = "JavaScript is a client-side scripting language used on the web browser." 第二句補用途："It is used to validate form data before submission and to react to user actions in an event-driven way."

---

### 3.2 第一個例子：用 `document.write()` 輸出文字

教材第一個完整例子是一頁 HTML，在頁面載入時用 `document.write()` 把字串寫入瀏覽器。注意 `<!doctype html>`、`<html>`、`<head>`、`<body>` 的骨架，`<h1 align="center">` 與 `<hr />` 是之前課堂學過的 HTML，真正的 JavaScript 在 `<script>` 元素內。

```html
<!doctype html>
<html>
<head>
<title>JavaScript Hello World</title>
</head>
<body>
<h1 align="center">First JavaScript</h1>
<hr />
<script type="text/javascript">
	document.write("Hello World from JavaScript!");
</script>
</body>
</html>
```

`document.write()` 的作用是**把一個字串寫到瀏覽器**（write a string to the browser），瀏覽器會把該字串當成頁面內容的一部分顯示出來。

> **document.write() writes a string to the browser.**
> （`document.write()` 把字串寫到瀏覽器。）

---

### 3.3 四種把 Script 放入 HTML 的方法（Script Inclusion Methods）

教材強調：**有四個標準方法**可以將 script 包含（include）到 HTML 文件之中。這是極高頻考點——「List the four ways to include JavaScript in an HTML document.」

> **There are four standard ways to include script in an HTML document.**
> （把 script 包含到 HTML 文件中有四種標準方法。）

1. **Within the `<script>` element** — 直接寫在 `<script> … </script>` 之內；
2. **As a linked file via the `src` attribute of the `<script>` element** — 用 `<script>` 的 `src` 屬性外連一個 `.js` 檔案；
3. **Within an HTML event handler attribute** — 例如 `onclick`，直接在 HTML 屬性內寫 JavaScript；
4. **Via the pseudo-URL `javascript:` syntax referenced by a link** — 透過連結的 `javascript:` pseudo-URL。

---

#### 3.3.1 方法一：寫在 `<script>` 元素內（Inside the `<script>` Element）

**預設情況下**，瀏覽器傾向把 `<script>` 元素的內容當成 JavaScript 解讀。你亦可以加上 `type` 屬性明確指明內容是 JavaScript，亦可（如舊教材所示）同時包含 `language` 屬性：

```javascript
<script type="text/javascript">
	// javascript statements . . .
</script>
```

```html
<script language="javascript" type="text/javascript">
	// javascript statements . . .
</script>
```

> **By default, the <script> element tends to interpret its contents as JavaScript; you can also include the type attribute to explicitly specify JavaScript.**
> （預設情況下 `<script>` 元素傾向把內容解讀為 JavaScript；你亦可以用 `type` 屬性明確指定語言。）

#### 3.3.2 Script 放在 `<head>` 內（JavaScript in the `<head>`）

Script 可以放在 `<head>` 或 `<body>`。放在 `<head>` 的好處是：函數（function）在頁面其餘部分載入前已定義好，之後任何位置（例如 `<body>` 內的事件）都可以呼叫它。教材例子在 `<head>` 內**定義**函數 `alertTest()`，再於 `<body>` 內的 `<script>` 中**呼叫**它：

```html
<!doctype html>
<html>
<head>
	<script type="text/javascript">
		function alertTest() {
			alert("Danger! Danger! JavaScript in the <head>");
		}
	</script>
</head>
<body>
	<h2 align="center">Script in the Head</h2>
	<hr />
	<script language="javascript" type="text/javascript">
		alertTest();   // call this function
	</script>
</body>
</html>
```

留意：`alert("Danger! Danger! JavaScript in the <head>")` 字串裏包含 `<head>` 三個字符，但因為它在 JavaScript 字串內，瀏覽器不會把它當成 HTML 標籤處理。

> **A function defined in the <head> is available to be called later, for example from a <script> block or an event handler in the <body>.**
> （在 `<head>` 定義的函數可供之後呼叫，例如從 `<body>` 的 script 區塊或事件處理器呼叫。）

#### 3.3.3 方法二：外連 Script 檔案（Linked Script）

與外連樣式表（linked style sheets）的道理一樣，你可以把 JavaScript 程式碼存放在**獨立檔案**，再於 HTML 中引用它。規矩是：該 `.js` 檔案**只包含 JavaScript 程式碼，不能有任何 HTML**。

> **A linked .js file contains only JavaScript code, no HTML.**
> （外連的 `.js` 檔案只包含 JavaScript 程式碼，沒有 HTML。）

以教材的 `danger.js` 為例——在 HTML 中用 `<script>` 的 `src` 屬性載入：

```html
<script type="text/javascript" src="danger.js">
</script>
```

`danger.js` 檔案的內容（只有 JavaScript）：

```javascript
function alertTest( ) {
	alert("Danger! Danger!");
}
```

之後該函數就可以作為事件被呼叫，例如按鈕的 `onclick`：

```html
<input type="button" onclick="alertTest()" />
```

> **Use a .js file (e.g. danger.js) containing only JavaScript code, and include it with the src attribute of the <script> tag.**
> （使用只含 JavaScript 程式碼的 `.js` 檔案，並以 `<script>` 標籤的 `src` 屬性把它包含進來。）

📌 **應考提示**：分辨題常問「外連檔案裏可否寫 HTML？」答案一定是 "No — a .js file contains only JavaScript code, no HTML."；載入方式關鍵字是 `src="filename.js"`。

#### 3.3.4 方法三：HTML 事件處理屬性（Event Handler Attributes）— 預告

除了 `<script>` 區塊，HTML 亦定義了一套**事件處理屬性（event handler attributes）**——例如 `onclick`、`onmouseover`——你可以把 JavaScript 陳述直接綁定在屬性值中。詳細例子見 3.5 節。

```html
<input type="button" value="press me" onclick="alert('Hello from JavaScript!');" />
```

> **HTML event handler attributes such as onclick allow you to bind JavaScript statements directly to elements.**
> （像 `onclick` 這類 HTML 事件處理屬性讓你可以直接把 JavaScript 陳述綁定到元素上。）

#### 3.3.5 方法四：JavaScript Pseudo-URL（`javascript:`）

第四種方法是用 **JavaScript pseudo-URL** 觸發 script 陳述：把 `javascript:` 當成一個「假的 URL」放在 `href` 中，當使用者點擊連結，瀏覽器便執行其後的 JavaScript。你甚至可以在瀏覽器網址列（location box）直接輸入這種 URL 來執行 JavaScript。

```html
<a href="javascript:alert('hi')">Click me</a>
```

在瀏覽器網址列直接輸入（例如計算 5 + 9）：

```
javascript:alert(5+9)
```

> **You can use the JavaScript pseudo-URL to trigger script statements, for example <a href="javascript:alert('hi')">Click me</a>, or type such a URL directly in the browser's location box.**
> （你可以用 JavaScript pseudo-URL 觸發 script 陳述；亦可在瀏覽器網址列直接輸入這類 URL。）

⚠️ **陷阱提醒**：pseudo-URL 以 `javascript:` 開頭並緊接 JavaScript 陳述，例如 `javascript:alert('hi')` ——不要把 `javascript:` 寫成 `http://javascript:` 或漏掉冒號。

---

### 3.4 對話框（Dialog Boxes）

對話框（dialog box）是與使用者**溝通的最簡便途徑**：程式暫停，彈出一個小視窗與使用者互動，收到結果後繼續。三個核心對話框（都可省略 `window.` 前綴直接呼叫）：

| 方法 | 用途 | 回傳值 |
|---|---|---|
| `alert()` ／ `window.alert()` | 通知使用者某個狀況 | 無（只顯示確定鈕） |
| `confirm()` ／ `window.confirm()` | 請使用者確認某句陳述 | `true` / `false` |
| `prompt()` ／ `window.prompt()` | 向使用者索取資料 | 使用者輸入的字串 |

> **alert() (or just alert()) informs the user of a condition.**
> （`alert()` 通知使用者某個狀況。）

> **window.confirm() (or just confirm()) asks the user to verify a statement.**
> （`confirm()` 請使用者確認一句陳述。）

> **window.prompt() (or just prompt()) requests data from a user.**
> （`prompt()` 向使用者索取資料。）

**除錯用途**：`alert()` 除了面向使用者，亦是程式員**除錯（debugging）**的好幫手——在可疑位置插入 `alert()` 輸出變數目前的值，即可觀察程式走到哪一步、數值是甚麼。

> **Alert dialog messages are also useful in debugging programs.**
> （`alert()` 對話訊息在除錯程式時亦很有用。）

📌 **應考提示**：三選一分辨題——「想問使用者 OK / Cancel 用邊個？」答 `confirm()`（回傳 boolean）；「想收集一段文字輸入？」答 `prompt()`；「純粹通知／除錯？」答 `alert()`。記住三者都可以寫成 `window.xxx()` 或直接 `xxx()`。

---

### 3.5 事件處理器（Event Handlers）

JavaScript 的 event-driven 本質，在 HTML 層面體現為**事件處理屬性**：HTML 定義了一套與 JavaScript 事件相關的屬性（如 `onclick`、`onmouseover`），你可以把 JavaScript 陳述綁定到這些屬性上。事件分兩大類：

- **core events**（HTML 定義的核心事件）；
- **form and page events**（常見的表單與頁面事件），例如 `onsubmit`（表單提交時）、`onload`（頁面載入完成時）。

> **HTML defines a set of event handler attributes related to JavaScript events such as onclick, onmouseover, etc., to which you can bind JavaScript statements.**
> （HTML 定義了一套與 JavaScript 事件相關的事件處理屬性，如 `onclick`、`onmouseover`，你可把 JavaScript 陳述綁定其上。）

教材完整例子——`<body>` 的 `onload` 在頁面載入時彈出訊息；表單按鈕的 `onclick` 在按下時彈出訊息；超連結的 `onmouseover` 在滑鼠移過時彈出訊息：

```html
<body onload="alert('page loaded');">

<form>
  <input type="button" value="press me"
          onclick="alert('Hello from JavaScript!');" />
</form>

<a href="http://www.yahoo.com"
    onmouseover="alert('hi');">
  Yahoo
</a>

</body>
```

> **There are both the core events defined by HTML as well as common form and page events like onsubmit, onload, etc.**
> （事件既有 HTML 定義的核心事件，亦有如 `onsubmit`、`onload` 等常見的表單與頁面事件。）

📌 **應考提示**：事件屬性名稱的規律是 **on + 事件名**：click → `onclick`、mouseover → `onmouseover`、load → `onload`、submit → `onsubmit`。答「點樣令按鈕被按時執行 JavaScript？」就寫 `<input type="button" onclick="...">`。

---

### 3.6 JavaScript 的基本語言特性（Basic Features）

#### 3.6.1 執行順序（Execution Order）

**由上至下（top to bottom）**順序執行；同一份文件內，`<head>` 內的 script **先於** `<body>` 內的 script 執行。

> **JavaScript executes in order, from top to bottom; code in the <head> runs before code in the <body>.**
> （JavaScript 由上至下依序執行；`<head>` 的程式碼先於 `<body>` 執行。）

#### 3.6.2 大小寫敏感（Case-Sensitive）

JavaScript 是**大小寫敏感**的語言：`Alert`、`alert`、`ALERT` 是三個不同的名字。寫錯大小寫（例如寫 `Document.write` 而不寫 `document.write`）會令程式出錯。

> **JavaScript is case-sensitive.**
> （JavaScript 是大小寫敏感的語言。）

#### 3.6.3 陳述與結束符（Statements & Terminators）

一個 script 由**多條獨立陳述（statements）**組成；陳述之間可用**換行（ENTER）**或**分號（semicolons `;`）**分隔。因此下面兩段寫法等價：

```javascript
x = x + 1;
alert(x);
```

```javascript
x = x + 1
alert(x)
```

> **JavaScript statements are terminated by ENTERs or semi-colons (;).**
> （JavaScript 陳述以換行或分號（`;`）結束。）

⚠️ **陷阱提醒**：雖然換行可以當作結束符，考試與實務都建議**每條陳述結尾寫分號**，避免「自動分號插入（ASI）」造成難以追蹤的錯誤。

#### 3.6.4 註解（Comments）

兩種註解寫法：

- `/* ... */` — **多行（multiple line）**註解；
- `// ...` — **單行（single line）**註解。

```javascript
/*
   This is a
   multiple line
   style comment
*/

// This is a single line comment
```

> **/* ... */ is a multiple line comment; // is a single line comment.**
> （`/* ... */` 是多行註解；`//` 是單行註解。）

---

### 3.7 變數（Variables）

變數（variable）可以理解為一種**記憶體**：它在程式內**儲存資料**，並以一個名字供之後讀取或修改。

> **A variable is a kind of memory. It stores data in a program.**
> （變數是一種記憶體，在程式內儲存資料。）

#### 3.7.1 命名規則（Naming Rules）

變數名稱必須是**格式良好的唯一識別字（well-formed identifier）**，規則如下：

- 以**字母（letter）開頭**，其後可跟字母或數字；
- **不可包含特殊字符或空白**（例如空格、`-`、`!`）；
- 名稱應**有意義（have meaning）**——例如 `sum` 比 `x` 好。

> **The name of a variable should be a uniquely well-formed identifier, starting with a letter and followed by letters or digits; it must not contain special characters or whitespace, and it should have meaning, e.g. "sum" is better than "x".**
> （變數名稱必須是格式良好的唯一識別字：以字母開頭、其後跟字母或數字；不可含特殊字符或空白；並且應有意義，例如 `sum` 比 `x` 好。）

#### 3.7.2 用 `var` 宣告變數（Declaring Variables）

用 **`var` 陳述（var statement）**定義變數：

```javascript
var x;         // 宣告但未賦值
var x = 5;     // 宣告時同時賦值
```

亦可用**逗號（comma）一次過定義多個變數**，每個可獨立賦值或留空：

```javascript
var x, y = 5, z;
```

> **Define a variable using the var statement; variables can be assigned at declaration time; commas can be used to define many variables at once.**
> （用 `var` 陳述定義變數；可在宣告時賦值；可用逗號一次定義多個變數。）

#### 3.7.3 用不用 `var` 的分別（Declare with `var` or Not?）

**global scope（全域範疇）**之下，即使不寫 `var` 程式通常仍可執行——但這樣會建立 **global variable**。然而，**局部變數（local variables）必須永遠用 `var` 宣告**。若不寫 `var`，賦值會直接**修改全域變數**，風險在於：一個函數若誤用了全域變數而非自己的局部變數，就可能**更改了程式其他部分依賴的值**。

> **Although you can get away with not using the var statement in the global scope, you must always use var to declare local variables.**
> （雖然在 global scope 不寫 `var` 通常仍可行，但你必須永遠用 `var` 宣告局部變數。）

教材示範——函數內不寫 `var`，結果改動了全域變數：

```javascript
myvar = "xxx";   // global variable, without using "var"

function checkscope() {
	myvar = "yyy";    // changing the global variable.
	document.write("Line 1: " + myvar + "<br />");  // new value "yyy" is printed
}

checkscope();
document.write("Line 2: " + myvar);   // This prints "yyy", too.
```

輸出結果：Line 1 與 Line 2 都印出 `yyy`——因為 `checkscope()` 內部的 `myvar = "yyy"` 改寫的是同一個全域變數。

> **If a function uses a global variable instead of a local one, it runs the risk of changing a value that some other part of the program may rely on.**
> （若函數使用了全域變數而非局部變數，便有機會更改程式其他部分依賴的值。）

> **Avoiding this problem is simple: declare all variables with var.**
> （避免此問題很簡單：所有變數都用 `var` 宣告。）

⚠️ **陷阱提醒**：考 trace 題時，先判斷每句賦值針對的是 global 定 local：函數內有 `var` → local（函數結束即消失）；函數內冇 `var` → 操作緊 global。這個例子是教科書級考點。

---

### 3.8 複合資料型別：陣列（Composite Data Types — Arrays）

除了基本型別，JavaScript 支援由**基本型別集合而成**的進階型別。**陣列（array）**是其中一種：把**一組有序的值**以**單一識別字**（一個變數名）包在一起。

> **An array is an ordered set of values grouped together with a single identifier.**
> （陣列是以單一識別字把一組有序的值歸組起來。）

因為 JavaScript 是 **loosely-typed**（寬鬆型別／弱型別）語言，**陣列元素可以屬於不同資料型別**——同一陣列內可以有字串、數字、布林值。

> **Since JavaScript is loosely-typed, array elements can be of different data types.**
> （由於 JavaScript 是寬鬆型別語言，陣列元素可以屬於不同資料型別。）

#### 3.8.1 建立陣列（Defining Arrays）

四種常見寫法：

```javascript
var myArray  = [1, 5, 1968, 3];            // literal 寫法
var myArray2 = ["Thomas", true, 3, -47];   // 元素型別可以混雜
var myArray3 = new Array();                // 空陣列
var myArray4 = new Array(10);              // 預設長度 10 的陣列
var myArray5 = new Array("Tom", "Roy", "Al");  // 以元素列表建立
```

> **Arrays can be defined with literal syntax [ ... ] or with new Array(); new Array(10) creates an array of length 10; new Array("Tom","Roy","Al") creates an array pre-filled with those elements.**
> （陣列可用 `[ ... ]` literal 或 `new Array()` 建立；`new Array(10)` 建立長度 10 的陣列；`new Array("Tom","Roy","Al")` 建立已含該批元素的陣列。）

**與 Java 對比**——Java 必須指定元素型別（`int[]`）及使用 `new` 配合長度；JavaScript 不需要型別宣告：

```java
int[] myArray  = {1, 5, 1968, 3};
int[] myArray4 = new int[10];
```

```javascript
var myArray  = [1, 5, 1968, 3];
var myArray4 = new Array(10);
```

#### 3.8.2 以索引存取（Accessing Arrays by Index）

陣列以**索引值（index value）**存取元素，而 JavaScript 陣列是 **0-based（由 0 開始）**：

```javascript
var myArray = new Array(4);
myArray[3] = "Hello";       // 把第 4 個位置（index 3）設為 "Hello"
```

```javascript
var myArray1 = ["Thomas", true, 3, -47];
// myArray1[0] 是 "Thomas"，myArray1[1] 是 true，如此類推
```

> **Arrays in JavaScript are 0-based: myArray1[0] is "Thomas", myArray1[1] is true, and so on.**
> （JavaScript 陣列以 0 為起點：`myArray1[0]` 是 "Thomas"，`myArray1[1]` 是 true，如此類推。）

> **Given new Array(4) you have an array with an index running from 0 to 3.**
> （`new Array(4)` 產生一個索引由 0 到 3 的陣列。）

#### 3.8.3 陣列長度（Array Length）

用 **`arrayName.length`** 讀取陣列元素數目（注意 `length` 是 property，不是函數，所以沒有括號）：

```javascript
alert(myArray2.length);
```

> **To access an array's length, use arrayName.length, e.g. alert(myArray2.length).**
> （要取得陣列長度，使用 `arrayName.length`，例如 `alert(myArray2.length)`。）

⚠️ **陷阱提醒**：長度與最大索引相差 1——`new Array(4)` 的 `length` 是 4，但有效索引只到 3（0-based）。考填充題「new Array(4) 的索引範圍」答案是 **0 to 3**。

---

### 3.9 表達式與運算子（Expressions and Operators）

用**運算子（operators）**把值組合成**表達式（expressions）**。教材按類別列出：

#### 3.9.1 基本算術（Basic Arithmetic）

| 運算子 | 意義 |
|---|---|
| `+` | 加法（addition） |
| `-` | 減法／一元負號（subtraction / unary negation） |
| `/` | 除法（division） |
| `*` | 乘法（multiplication） |
| `%` | 取餘數（modulus） |

#### 3.9.2 遞增遞減（Increment / Decrement）

- `++` — 加一（add one），例如 `x++` 或 `y++`；
- `--` — 減一（subtract one）。

#### 3.9.3 比較（Comparison）

`>`（大於）、`<`（小於）、`>=`（大於或等於）、`<=`（小於或等於）、`!=`（不等於，inequality）、`==`（等於，equality）。

#### 3.9.4 邏輯（Logical）

- `&&` — 邏輯 AND（and）
- `||` — 邏輯 OR（or）
- `!` — 邏輯 NOT（not）

> **Expressions are made using operators: arithmetic (+ - / * %), increment/decrement (++ --), comparison (> < >= <= != ==) and logical (&& || !).**
> （用運算子組成表達式：算術、遞增遞減、比較與邏輯運算子。）

#### 3.9.5 字串運算子：`+` 一身兼兩職（String Operator）

`+` 一方面做**加法**，另一方面做**字串連接（string concatenation）**：

```javascript
document.write("JavaScript" + " is " + " great!");
// 結果（Result）："JavaScript is great!"
```

> **The "+" operator serves both as addition and string concatenation.**
> （`+` 運算子同時兼任加法與字串連接。）

#### 3.9.6 運算子優先次序（Operator Precedence）

與數學一樣，JavaScript 有 **operator precedence**（先乘除後加減等）。若次序不如你所願，**盡量用括號（parenthesis）強制求值次序**：

```javascript
var x = 4 + 5 * 8;   // x = 44（先乘後加：5 * 8 = 40，再加 4）

var x = (4 + 5) * 8; // x = 72（括號優先：(4 + 5) = 9，再乘 8）
```

> **Be aware of operator precedence; use parentheses liberally to force the evaluation order you want.**
> （留意運算子優先次序；多用括號強制求值次序。）

📌 **應考提示**：考題常見「求 x 的值」——第一句 `x = 4 + 5 * 8` 因為 `*` 優先，答案是 **44**；第二句 `(4 + 5) * 8` 因為括號優先，答案是 **72**。

---

### 3.10 選擇結構：`if … else` 與 `switch`

#### 3.10.1 `if … else` 陳述（The if…else Statement）

程式最基本的執行控制由 **`if` 陳述**負責：條件（expression）為真（true）就執行其後陳述，否則（可選）執行 `else` 分支。

語法：

```javascript
if (expression)
	. . .

// 或
if (expression)
	. . .
else
	. . .
```

教材例子：

```javascript
if (x > 10)
	alert("x bigger than 10");
else
	alert("x smaller than 10");
```

> **Basic program execution control is handled in JavaScript using the if statement: if the expression is true the following statements run; an optional else branch runs otherwise.**
> （JavaScript 用 `if` 陳述處理基本程式執行控制：表達式為真則執行其後陳述；可選的 `else` 分支處理其餘情況。）

#### 3.10.2 `switch` 陳述（The switch Statement）

當 `if` 鏈變得太亂（messy，即多重 if…else if 難以閱讀），可以改用 **`switch` 陳述**——按 `condition` 的值跳去對應的 `case` 分支執行，每個分支通常以 **`break`** 結束以跳出 switch；若沒有任何 case 相符，則執行 **`default`** 分支。

語法：

```javascript
switch (condition) {
	case (value1):
		statement(s);
		break;
	case (value2):
		statement(s);
		break;
	. . .
	default:
		statement(s);
		break;
}
```

> **If statements can get messy, so you might consider using a switch statement instead: the condition is matched against each case value, each branch usually ends with break, and default handles no-match cases.**
> （`if` 太多時會變得混亂，可考慮改用 `switch` 陳述：把 condition 與各 `case` 值比對，每個分支通常以 `break` 結束，`default` 處理無匹配的情況。）

⚠️ **陷阱提醒**：`case` 結尾**漏寫 `break`** 是經典錯誤——程式會「跌落」繼續執行下一個 case（fall-through）。`default` 分支放在最後，處理所有不相符的值。

---

### 3.11 迴圈（Loops）

JavaScript 支援**三種迴圈**：`while`、`do/while` 與 `for`。

> **JavaScript supports three types of loops: while, do/while, and for.**
> （JavaScript 支援三種迴圈：`while`、`do/while` 與 `for`。）

#### 3.11.1 `while` 迴圈

先檢查條件，條件為真才執行；條件一開始就是假，則**一次都不執行**。

語法：

```javascript
while (condition)
	statement(s)
```

教材例子——印出 0 到 9，每行之間插 `<br />`，最後印 "Done"：

```javascript
var x = 0;
while (x < 10) {
	document.write(x);
	document.write("<br />");
	x = x + 1;
}
document.write("Done");
```

> **while (condition) repeats statement(s) as long as the condition is true; the condition is checked before each iteration.**
> （`while (condition)` 在條件為真期間重複執行陳述；條件在每次迭代前檢查。）

#### 3.11.2 `do … while` 迴圈

三種迴圈的分別常在於**條件檢查的時機**。`do … while` 在**執行完一次之後**才檢查條件，所以**迴圈體至少執行一次（executes at least once）**。

```javascript
var x = 0;
do {
	document.write(x);
	x = x + 1;
} while (x < 10);
```

> **In the case of do loops, the loop always executes at least once, since the check happens at the end of the loop.**
> （`do` 迴圈因為條件在迴圈末尾才檢查，所以至少會執行一次。）

#### 3.11.3 `for` 迴圈

`for` 是最**緊湊（compact）**的迴圈格式：把**初始化（initializes）**、**條件檢查（checks）**與**遞增／遞減（increments or decrements）**全部寫在**單一陳述（a single statement）**之中，三部分以分號分隔：

```javascript
for (x = 0; x < 10; x++) {
	document.write(x);
}
```

結構拆解：`x = 0`（初始化，進入迴圈前執行一次）→ `x < 10`（每次迭代前檢查）→ `x++`（每次迭代結束後執行）。

> **The most compact loop format is the for loop, which initializes, checks, and increments or decrements all in a single statement.**
> （最緊湊的迴圈格式是 `for` 迴圈：初始化、檢查與遞增／遞減全部寫在單一陳述內。）

#### 3.11.4 無限迴圈（Infinite Loops）

使用任何迴圈都要小心，避免**無限迴圈（infinite loops）**——即條件永遠為真、程式永遠停不下來的情況（常見原因：忘記在迴圈內更新計數變數，例如漏寫 `x = x + 1`）。

> **With all loops we need to exercise some care to avoid infinite loops.**
> （使用所有迴圈時都要小心，避免無限迴圈。）

📌 **應考提示**：三種迴圈對比答句——"In a while loop the condition is checked at the beginning; in a do…while loop it is checked at the end, so the body always executes at least once; a for loop combines initialization, condition checking and updating in one statement."

---

### 3.12 函數（Functions）

#### 3.12.1 為甚麼要用函數

函數的價值在於**把程式碼分段（segment code）**，並建立一組**可重複使用（used over and over again）**的陳述——寫一次，隨時呼叫。

> **Functions are useful to segment code and create a set of statements that will be used over and over again.**
> （函數有助把程式碼分段，並建立一組會一再重複使用的陳述。）

#### 3.12.2 基本語法（Basic Syntax）

```javascript
function name(parameter list) {
	statements;
	return;
}
```

教材例子——定義 `add(x, y)`，計算總和並以 `return` 回傳：

```javascript
function add(x, y) {
	var sum = x + y;
	return sum;
}

var result = add(2, 3);
```

> **The basic function syntax is: function name(parameter list) { statements; return; }**
> （函數的基本語法是：`function name(parameter list) { statements; return; }`。）

#### 3.12.3 與 Java 對比：型別宣告

Java 版同一函數必須為**回傳值、參數與局部變數**逐一指定資料型別（`int`）；JavaScript 完全不用：

```java
int add(int x, int y) {
	int sum = x + y;
	return sum;
}
```

```javascript
function add(x, y) {
	var sum = x + y;
	return sum;
}
```

> **In Java you must specify the data type for the return value, parameters and local variables; in JavaScript you do not.**
> （Java 必須為回傳值、參數與局部變數指定資料型別；JavaScript 則不需要。）

#### 3.12.4 呼叫函數（Invoking a Function）

用**函數名稱加括號 `( )`** 呼叫；括號內可放**字面值（literals）**或**變數**：

```javascript
var result = add(2, 3);      // 傳入 literals 2 和 3
```

```javascript
var a = 3, b = 5;
var result;
result = add(a, b);           // 傳入變數 a 和 b
```

> **We can invoke a function using the function name with parentheses, passing either literals or variables.**
> （我們可以用函數名稱加括號呼叫函數，傳入字面值或變數。）

#### 3.12.5 傳值機制與 `return`

變數以**傳值（pass by value）**方式傳入函數——函數收到的是**數值的副本**，函數內對參數的改動不會影響外面的變數。因此，若要「把結果帶出函數」，**必須用 `return` 把值送回**呼叫處。

> **Variables are passed to functions by value, so you must use return to send things back.**
> （變數以傳值方式傳入函數，所以你必須用 `return` 把結果送回。）

`return` 的彈性：函數可以**回傳值，亦可以唔回傳**；而且函數內**可以有任意多條 `return` 陳述**（例如在不同條件分支分別回傳）。

> **You can return a value or not from a function, and you can have as many return statements as you like.**
> （函數可以選擇回傳值與否，而且可以有任意多條 `return` 陳述。）

⚠️ **陷阱提醒**：`return` 之後的陳述不會執行；多條 `return` 通常配合條件使用，每次執行只會命中一條。trace 題常見問法：「`add(2, 3)` 之後 `result` 等於幾多？」——答案是 5。

---

## 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞／語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|---|---|---|
| `JavaScript` | 在瀏覽器執行的用戶端腳本語言，語法近似 C#，用於網頁互動 | "JavaScript is a client-side scripting language used on the web browser." |
| `client-side scripting language` | 用戶端（瀏覽器）執行的腳本語言，不需伺服器即可回應操作 | "JavaScript runs on the client side, inside the web browser." |
| `event-driven` | 事件驅動：程式等待並回應使用者動作 | "JavaScript is event-driven; it reacts to user actions such as clicking a button or submitting a form." |
| `validate form data` | 在提交到伺服器前先檢查表單資料 | "JavaScript validates form data prior to submission to the web server." |
| `<script>` element | 在 HTML 內嵌 JavaScript 的元素；預設把內容當 JavaScript 解讀 | "By default, the <script> element interprets its contents as JavaScript." |
| `type="text/javascript"` | 明確指出 script 內容屬性的寫法 | "The type attribute is used to explicitly specify that the content is JavaScript." |
| `src` attribute | `<script>` 用來外連 `.js` 檔案的屬性 | "A linked script is included via the src attribute of the <script> element." |
| `.js` file | 只可含 JavaScript 程式碼、不可含 HTML 的獨立檔案 | "A .js file contains only JavaScript code, no HTML." |
| event handler attribute | 綁定 JavaScript 陳述到元素事件的 HTML 屬性（如 `onclick`） | "HTML event handler attributes such as onclick bind JavaScript statements to events." |
| `onclick` / `onmouseover` / `onload` / `onsubmit` | 點擊／滑鼠移過／頁面載入／表單提交時觸發的事件屬性 | "The onclick event fires when a button is clicked; onmouseover fires when the mouse moves over an element." |
| pseudo-URL `javascript:` | 以 `javascript:` 開頭、可由連結或網址列觸發的假 URL | "The JavaScript pseudo-URL triggers script statements, e.g. javascript:alert('hi')." |
| `document.write()` | 把字串寫入瀏覽器頁面 | "document.write() writes a string to the browser." |
| `alert()` | 通知使用者某狀況、亦用於除錯的對話框 | "alert() informs the user of a condition and is also useful in debugging." |
| `confirm()` | 請使用者確認、回傳 true/false 的對話框 | "confirm() asks the user to verify a statement and returns true or false." |
| `prompt()` | 向使用者索取文字輸入的對話框 | "prompt() requests data from a user." |
| execution order | 由上至下、`<head>` 先於 `<body>` 的執行次序 | "JavaScript statements execute from top to bottom; the <head> runs before the <body>." |
| case-sensitive | 大小寫敏感：`Alert` 與 `alert` 不同 | "JavaScript is case-sensitive." |
| statement terminator | 以換行或分號結束一條陳述 | "JavaScript statements are terminated by ENTERs or semi-colons (;)." |
| comment `//` 與 `/* */` | 單行與多行註解 | "// starts a single line comment; /* ... */ is a multiple line comment." |
| `variable` | 程式內儲存資料的記憶體 | "A variable is a kind of memory that stores data in a program." |
| identifier | 識別字：字母開頭、後跟字母或數字、無特殊字符空白 | "A variable name is a well-formed identifier starting with a letter, with no special characters or whitespace." |
| `var` statement | 宣告變數的陳述，局部變數必須使用 | "Local variables must always be declared with var." |
| global variable / local variable | 全域變數／局部變數（函數內以 var 宣告） | "A function that uses a global variable risks changing a value other parts of the program rely on." |
| `array` | 以單一識別字歸組的一組有序值 | "An array is an ordered set of values grouped together with a single identifier." |
| loosely-typed | 寬鬆型別：陣列元素可屬不同資料型別 | "JavaScript is loosely-typed, so array elements can be of different data types." |
| `new Array(n)` | 建立長度 n 的陣列；索引由 0 至 n−1 | "new Array(4) gives an array with indices running from 0 to 3." |
| 0-based index | 索引由 0 開始計 | "JavaScript arrays are 0-based: myArray1[0] is the first element." |
| `.length` | 陣列元素數目屬性 | "Use arrayName.length to access the length of an array." |
| operator precedence | 運算子優先次序：先乘除後加減 | "Operator precedence decides the order of evaluation; use parentheses to force it." |
| string concatenation | 用 `+` 連接字串 | "The + operator serves both as addition and string concatenation." |
| `++` / `--` | 遞增／遞減一 | "++ adds one to a variable and -- subtracts one." |
| `if … else` | 條件分支：真則執行，否則走 else | "The if statement controls execution: if the expression is true, the statements run; otherwise the else branch runs." |
| `switch … case` | 多分支選擇，配 `break` 與 `default` | "Use a switch statement with case values, break, and a default branch when if statements get messy." |
| `while` loop | 先檢查條件的迴圈 | "In a while loop, the condition is checked before the statements are executed." |
| `do … while` loop | 後檢查條件的迴圈，至少執行一次 | "A do…while loop always executes at least once because the check happens at the end." |
| `for` loop | 初始化、檢查、遞增合一的緊湊迴圈 | "A for loop initializes, checks, and increments or decrements in a single statement." |
| infinite loop | 條件永不為假的死迴圈 | "Care must be taken with all loops to avoid infinite loops." |
| `function` | 可重複使用的程式碼分段 | "Functions segment code into a set of statements used over and over again." |
| parameter list | 函數參數列表 | "The basic function syntax is: function name(parameter list) { statements; return; }." |
| pass by value | 傳值：函數收到副本，須用 return 送回結果 | "Variables are passed to functions by value, so you must use return to send values back." |
| `return` statement | 回傳值並結束函數的陳述 | "You can return a value or not from a function, with as many return statements as you like." |

---

## 🗺️ 循序漸進學習路線 (Learning Path)

### 階段一：先理解甚麼觀念（Understand First）

- [ ] JavaScript 是 **client-side scripting language**——程式在瀏覽器執行，不是伺服器；
- [ ] **event-driven**：click、mouseover、load、submit 等事件會觸發程式碼；
- [ ] script 的執行次序：**top to bottom**、`<head>` 先於 `<body>`、**case-sensitive**；
- [ ] **global vs local scope**：函數內不寫 `var` 會改動全域變數；
- [ ] **0-based array**：`new Array(4)` 的有效索引是 0–3；
- [ ] 三種迴圈的分別在**條件檢查時機**（while 開頭檢查、do…while 末尾檢查、for 三者合一）；
- [ ] **pass by value**：函數收到副本，要帶結果出嚟就要 `return`。

### 階段二：背誦甚麼英文短語（Memorize）

- "JavaScript is a **client-side scripting language** used on the **web browser**."
- "Validate form data **prior to submission** to web server."
- "React to user's actions — **event-driven**."
- "A **.js file** contains only JavaScript code, **no HTML**."
- "**Four standard ways** to include script in an HTML document."
- "JavaScript statements are terminated by **ENTERs or semi-colons (;)**."
- "Arrays are **0-based**; use **arrayName.length** for the length."
- "A **do…while loop always executes at least once**, since the check happens at the end."
- "Variables are passed **by value**, so you must use **return** to send things back."
- "A **for loop** initializes, checks, and increments in **a single statement**."

### 階段三：掌握甚麼寫法／實作（Master the Syntax）

- [ ] 寫一個含 `<script type="text/javascript">` + `document.write()` 的完整 HTML 頁；
- [ ] 用 `<script src="danger.js">` 外連檔案，並以 `onclick="alertTest()"` 呼叫其中函數；
- [ ] 在 `<a href="javascript:alert('hi')">` 與瀏覽器網址列試 pseudo-URL；
- [ ] 分辨 `alert()`／`confirm()`／`prompt()` 三個對話框的呼叫；
- [ ] 用 `onload`、`onclick`、`onmouseover` 綁定事件；
- [ ] `var x;`、`var x = 5;`、`var x, y = 5, z;` 三種宣告寫法；
- [ ] 陣列：`[1, 5, 1968, 3]`、`new Array(10)`、`myArray[3] = "Hello"`、`myArray2.length`；
- [ ] 運算子：`+ - * / %`、`++ --`、`> < >= <= != ==`、`&& || !`、字串 `+` 連接；
- [ ] 用括號控制 precedence：`4 + 5 * 8`（=44）對比 `(4 + 5) * 8`（=72）；
- [ ] `if (x > 10) … else …` 與 `switch (condition) { case … break; default: }`；
- [ ] 三種迴圈各寫一次印 0–9 的版本，並測試唔更新計數變數會點（無限迴圈）；
- [ ] `function add(x, y) { var sum = x + y; return sum; }`，再以 `add(2, 3)` 與 `add(a, b)` 呼叫。

### 階段四：能解答甚麼英文考題（Can Answer）

- "What is JavaScript?" → client-side scripting language, runs in the browser;
- "List the four ways to include a script in an HTML document." → `<script>` element、`src` linked file、event handler attribute、`javascript:` pseudo-URL；
- "What is the output of the checkscope example?" → both lines print "yyy" because the function changes the global variable;
- "What is the index range of an array created by new Array(4)?" → 0 to 3; its `.length` is 4;
- "Evaluate: var x = 4 + 5 * 8; and var x = (4 + 5) * 8;" → 44 and 72;
- "Which loop always executes at least once?" → the do…while loop;
- "What is the value of result after result = add(2, 3)?" → 5;
- "Why must local variables be declared with var?" → to avoid accidentally changing a global variable other code relies on;
- "Trace this while/for/do…while loop — what does it print?" → step by step 0,1,…,9 then "Done"（視乎程式）;
- "Compare JavaScript and Java for arrays/functions." → JavaScript is loosely-typed with no data type declarations; Java requires types for return values, parameters and local variables.

---

## 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### A. 四種載入 Script 方法（4 Ways to Include Script）——必背

| 方法 | 寫法關鍵 | 英文記法 |
|---|---|---|
| 1. `<script>` 元素內 | `<script type="text/javascript"> … </script>` | Inside the `<script>` element |
| 2. 外連 `.js` 檔案 | `<script type="text/javascript" src="danger.js"></script>` | Linked file via the `src` attribute |
| 3. 事件屬性 | `<input type="button" onclick="alert('Hi');" />` | Within an HTML event handler attribute |
| 4. Pseudo-URL | `<a href="javascript:alert('hi')">Click me</a>` | Via the pseudo-URL `javascript:` syntax |

### B. 三個對話框（Dialog Boxes）

| 函數 | 用途 | 回傳 | 記法 |
|---|---|---|---|
| `alert()` | 通知／除錯 | 無 | **A**lert = 通知 |
| `confirm()` | 確認 Yes/No | `true` / `false` | **C**onfirm = 確認 |
| `prompt()` | 索取輸入 | 字串 | **P**rompt = 提示輸入 |

三者皆可寫成 `window.alert()`、`window.confirm()`、`window.prompt()`。

### C. 常見事件屬性（Event Handlers）— on + 事件

| 屬性 | 觸發時機 | 類型 |
|---|---|---|
| `onclick` | 點擊元素 | core event |
| `onmouseover` | 滑鼠移過元素 | core event |
| `onload` | 頁面載入完成 | page event |
| `onsubmit` | 表單提交 | form event |

### D. 變數與陣列快記（Variables & Arrays）

- 命名：**字母開頭 + 字母/數字**；無特殊字符、無空白；要有意義（`sum` 好過 `x`）；
- 宣告：`var x;` / `var x = 5;` / `var x, y = 5, z;`；
- **局部變數必用 `var`**；唔用 `var` 就係操作緊 global；
- 陣列 0-based：`new Array(4)` → 索引 **0–3**，`length` = 4；
- `arrayName.length` 冇括號（property 唔係 method）。

### E. 運算子總表（Operators）

| 類別 | 運算子 |
|---|---|
| 算術 | `+ - * / %`（`-` 亦係 unary negation） |
| 遞增遞減 | `++`、`--` |
| 比較 | `> < >= <= != ==` |
| 邏輯 | `&&`（and）、`\|\|`（or）、`!`（not） |
| 字串 | `+` = concatenation（`"JavaScript" + " is " + " great!"`） |

- Precedence：`4 + 5 * 8` = **44**；`(4 + 5) * 8` = **72** —— 多用括號！

### F. 三種迴圈一分鐘對比（Loops in 60 Seconds）

| 迴圈 | 檢查時機 | 最少執行次數 |
|---|---|---|
| `while (cond)` | 開頭（before） | 0 |
| `do { … } while (cond)` | 末尾（end） | **1（至少一次）** |
| `for (init; cond; inc)` | 開頭，三者合一 | 0 |

- 三種迴圈都要小心 **infinite loop**——記得喺迴圈內更新計數變數（如 `x = x + 1;` / `x++;`）。

### G. 函數骨架與 Java 對比（Functions vs Java）

```javascript
function add(x, y) {
	var sum = x + y;
	return sum;
}
var result = add(2, 3);   // result = 5
```

| JavaScript | Java |
|---|---|
| `function add(x, y)` | `int add(int x, int y)` |
| 唔使寫型別（loosely-typed） | 必須為 return value、parameters、local variables 指定型別 |
| 用 `var` 宣告局部變數 | 用 `int` 等型別宣告 |

### H. 英文極速記憶口訣（Memory Mnemonics）

1. **「JS 四招入 HTML」**：Element 內、File 外連（`src`）、Event 屬性、`javascript:` URL —— *Element, src-File, Event, URL*；
2. **「A-C-P 三兄弟」**：Alert 通知、Confirm 問 Yes/No、Prompt 問資料；
3. **「Do 一定做一次」**："The do…while loop always executes at least once."（條件喺末尾檢查）；
4. **「+ 一身兩職」**："The + operator is both addition and string concatenation."；
5. **「冇 var = 玩緊 global」**："Always use var for local variables — otherwise you may change a global value other code relies on."；
6. **「傳值必 return」**："Variables are passed by value, so use return to send values back."；
7. **「Case 唔好漏 break」**：switch 每個 case 結尾記得 `break;`，最後 `default:` 兜底。

### I. 填空題極速答案（Fill-in-the-blank Quick Answers）

- 副檔名：**`.js`**；外連屬性：**`src`**；型別屬性：**`type="text/javascript"`**；
- 對話框除錯用途：**`alert()`**；
- 陣列長度：**`arrayName.length`**；索引起點：**0**；
- 取餘數運算子：**`%`**；不等於：**`!=`**；AND／OR／NOT：**`&&`／`||`／`!`**；
- `do…while` 最少執行：**一次**；`for` 三部分：**init; condition; update**；
- 函數關鍵字：**`function`**；回傳關鍵字：**`return`**；傳值機制：**by value**。
