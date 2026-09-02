# ITE3006 Topic 8：Event-Driven JavaScript 雙語應考學習指南（Bilingual & Exam-Ready Study Guide）

> 課程：ITE3006 Information Technology Essentials ｜ Topic 8: Event-Driven JavaScript
> 教材來源：SLIDE 1–16（已忽略 XML 殘留與作者資訊等雜訊）

---

## 1. 📝 課程概要與實務情境（Summary & Real-world Context）

本主題講解「事件驅動程式設計（Event-Driven Programming）」——即網頁如何感應用戶動作，並自動執行相應的 JavaScript 程式碼。核心概念包括：甚麼是 Event（事件）、以 `onXXX` 命名的事件屬性、各種常見事件（如點擊、聚焦、輸入、提交表單等）的觸發時機，以及事件處理器與 HTML 標籤「預設動作（default action）」之間的執行次序與取捨。考試最常問的重點是「事件處理器先執行、預設動作後執行」這個原則，以及如何用 `return false;` 阻止預設動作。

實務上，幾乎每個互動網頁都離不開事件處理：例如電商網站「加入購物車」按鈕靠 `onClick` 彈出確認視窗；註冊表單在用戶按「Submit」時，先用 `onSubmit` 驗證資料，若有錯誤便用 `return false;` 阻止表單送往伺服器，避免無效請求。另一個常見場景是「用按鈕代替超連結」——傳統 `<a href>` 只限文字連結，而透過 `onClick` 配合 `window.location`，可以讓任何按鈕都能跳轉到指定 URL，大大提升 UI 設計的靈活性。理解事件驅動機制，是日後學習 DOM 操作、前端框架（如 React 的 onClick props）與瀏覽器互動的根本基礎。

---

## 2. 🎯 考試學習目標（Learning Objectives）

考官會測試的核心能力如下（附英文對照）：

- **定義事件與事件處理器**（Define an event and an event handler）— 能解釋 Event 是瀏覽器內的用戶動作，並能觸發 JavaScript 執行。
- **識別 HTML 中的事件屬性**（Identify event attributes in HTML）— 能指出事件屬性以 `on` 前綴命名，並列舉 `onClick`、`onDblClick`、`onMouseOver`、`onMouseOut`、`onMouseDown`、`onKeyDown`、`onLoad`、`onFocus`、`onBlur`、`onChange`、`onSubmit`、`onReset` 等。
- **判斷事件處理器的放置位置**（Determine where event handlers are placed）— 能說明事件常用於 `<a>`、`<img>`、表單輸入欄位等元素，以及 `<body>` 標籤。
- **掌握預設動作與事件處理器的執行次序**（Explain the order of the event handler and the default action）— 能背出並應用「事件處理器先執行、預設動作後執行」原則。
- **運用 `return false;` 阻止預設動作**（Prevent the default action using `return false;`）— 能解釋 `false` 的含義，並知道 `onUnload` 屬例外。
- **配對各事件與其觸發時機**（Match each event with when it is triggered）— 能分辨 focus / blur / change / load / submit 等事件。
- **以按鈕連結其他 URL**（Link to another URL using a button）— 能使用 `window.location` 配合 `onClick`。

---

## 3. 📖 雙語深度理論知識點（Comprehensive Notes）

### 3.1 甚麼是事件（Event）？甚麼是事件處理器（Event Handler）？

Event-Driven JavaScript 的運作模式是：**網頁先「等待」用戶動作，動作一發生便「觸發」相應 JavaScript 程式碼執行**。這個用戶動作就是 Event，而負責回應事件的 JavaScript 程式碼稱為 Event Handler。

> **English Standard Definition:** An event is a user action occurring inside the browser that triggers the execution of JavaScript. Events can be clicking a button or moving the mouse.

> **English Standard Definition:** An event handler on a web page is usually written in JavaScript, and the code is associated with a particular event such as a button click.

**解說重點（繁中拆解）：**
- Event 例子包括：按按鈕（clicking a button）、移動滑鼠（moving the mouse）。
- Event handler 通常用 JavaScript 撰寫，並與特定事件「掛勾」，例如「按鈕被點擊」時才執行。
- 整個流程 = 用戶動作（Event）→ 瀏覽器通知網頁 → 執行對應 JavaScript（Event Handler）。這種「等事件才動」的程式設計模式，就是 Event-Driven Programming（事件驅動程式設計）。

---

### 3.2 HTML 事件屬性命名慣例：`onXXX`

事件可以在 HTML 中以各種**以 "on" 為前綴的屬性**（attributes prefixed with the word "on"）形式出現，例如 `onClick`、`onDblClick`、`onMouseOver` 等等。事件屬性必須寫在 HTML 開始標籤（opening tag）內，其值就是當事件發生時要執行的 JavaScript。

**例子 — 滑鼠移過連結時彈出訊息：**

```html
<a href="http://www.vtc.edu.hk"
   onMouseOver="alert('Thanks for coming!')">
   VTC Home Page
</a>
```

**⚠️ 考試常考注意事項（Note）：**

> **English Standard Definition:** Event names are attributes to HTML tags and HTML is not case sensitive. Therefore `onClick="..."`, `onclick="..."` or `ONCLICK="..."` are the same.

- 事件名稱其實就是 HTML 標籤的**屬性（attribute）**，不是獨立標籤。
- HTML 對屬性名稱**不區分大小寫**（not case sensitive）：`onClick`、`onclick`、`ONCLICK` 完全一樣。
- 但慣例上建議統一用小寫或駝峰式（CamelCase）書寫，保持程式碼可讀性。

---

### 3.3 事件處理器通常放在哪裡？（Where to Place Event Handlers）

事件通常配合 `<a>`、`<img>` 或 `<form>` 中的輸入欄位（input fields）使用，不同元素有不同的事件屬性。

| 元素（Element） | 常用事件 | 觸發時機 |
|---|---|---|
| Hyperlink `<a>` | `onClick` | 滑鼠點擊連結 |
| Hyperlink `<a>` | `onMouseOver` / `onMouseOut` | 滑鼠指標移入 / 移出連結 |
| Form fields（按鈕、核取方塊、下拉清單、文字區域等） | `onClick`、`onChange` | 點擊 / 內容被更改 |
| Data entry fields（text box 文字輸入框） | `onFocus` | 輸入框取得焦點 |
| Form（整個表單） | `onSubmit`、`onReset` | 提交表單 / 重設表單 |

> **English Standard Definition:** Events are typically used with `<a>`, `<img>` or the input fields in `<form>`.

> **English Standard Definition:** Hyperlinks have `onClick` to react to mouse clicks on the link, and `onMouseOver` and `onMouseOut` to react to the mouse pointer moving through the link.

> **English Standard Definition:** Form fields have the `onClick`, `onChange` events; data entry fields (text box) have the `onFocus` event; the form has `onSubmit` and `onReset` events.

**解說重點：**
- 不要記錯配對：text box 的焦點事件是 `onFocus`，而「內容被改」是 `onChange`；整張表單才有 `onSubmit` / `onReset`。
- 「還有其他很多事件在不同 HTML 元素上」（And many other events in different HTML elements...）——教材明言事件種類繁多，考試常見題型是「某元素＋某動作應配哪個事件」。

---

### 3.4 HTML 標籤的預設動作（Default Action of an HTML Tag）

每個 HTML 標籤對某些事件有「內建行為」，稱為**預設動作（default action）**。例如用戶點擊 `<a>` 連結時，瀏覽器會載入其 `href` 屬性所指的頁面——這就是「點擊連結事件」的預設動作。

**問題來了：**如果我們同時定義了 `onClick` 事件處理器，預設動作還做不做？甚麼時候做？

```html
<a href="somewhere.html" onClick="doSomething()">
```

**關鍵原則（考試必背）：**

> **English Standard Definition:** If an event causes both a default action and execution of an event handler, the event handler is executed first, then the default action takes place afterwards.

- 點擊此連結時，**事件處理器必須先執行（the event handler must be executed first）**；
- 事件處理器執行完畢後，**預設動作才發生**（the default action takes place after），即才跳去新頁面。
- 這成為事件處理的核心原則：**先執行 handler，後執行 default action**。

---

### 3.5 如何阻止預設動作（How to Prevent Default Action）—— `return false;`

有時我們不想預設動作發生（例如表單資料有錯時不應送出）。做法是讓事件處理器**回傳布林值（boolean）`false`**：

```html
<a href="somewhere.html"
   onClick="doSomething(); return false;">
```

> **English Standard Definition:** The event handler `onClick` can return a boolean (`true` or `false`), and `false` means "don't take the default action", i.e. the link "somewhere.html" will never be opened.

> **English Standard Definition:** Basically when an event handler receives a "false" value, the default action of the associated tag will be disabled.

**解說重點：**
- 事件處理器可以 `return true` 或 `return false`。
- `return false;` 的意思 = 「不要執行預設動作」——上述例子中 `somewhere.html` 永遠不會被打開。
- 瀏覽器收到 `false` 值，就會**停用（disable）該標籤的預設動作**。
- `return true` 或不 return 任何值 → 預設動作照常執行。

**⚠️ 例外（Exception）—— `onUnload`：**

> **English Standard Definition:** There are exceptions: `onUnload` does not interpret "return false" because when an unload event is on-going (e.g. closing a browser window and therefore unloading something in the window), it can never be prevented.

- `onUnload`（頁面卸載事件，例如關閉瀏覽器視窗）**不會理會 `return false;`**。
- 原因：卸載過程一旦開始（例如正在關閉視窗），就**永遠無法被阻止**（it can never be prevented）。

---

### 3.6 阻止預設動作的實例（Preventing Default Actions Examples）

#### 實例 1：阻止表單提交（防止把資料送往伺服器）

用途：檢查到表單有問題（something is wrong）時，阻止「把表單資料提交到 Web Server」這個預設動作。

```html
<form onSubmit="checkSomething(); return false;">
  . . . . .
  <input type="submit" />
  <input type="reset" />
</form>
```

- 按下 `submit` 按鈕時，`onSubmit` 事件處理器會被執行（onSubmit event handler will be executed when the "submit" button is pressed）。
- 先執行 `checkSomething();` 驗證，若驗證失敗便 `return false;` 阻止送出。

#### 實例 2：阻止文字被選取（text selection）

```html
<div onMouseDown="return false;">
  Hello World!
</div>
```

- `onMouseDown` 是滑鼠按下的瞬間。回傳 `false` 停用「文字選取」這個預設動作。
- 效果：這段文字永遠無法用滑鼠選取（this text can never be selected using the mouse!）。

#### 實例 3：阻止用鍵盤輸入文字到文字框

```html
<form name="f1">
  Name: <input type="text" name="t1" value="Peter"
         onKeyDown="return false;" />
</form>
```

- `onKeyDown` 是按下鍵盤按鍵的瞬間；回傳 `false` 令文字框無法接收任何鍵盤輸入。

**替代方法：直接用 JavaScript 停用（disable）文字框**

```javascript
document.f1.t1.disabled = true;
```

- 效果與實例 3 類似：徹底停用文字框。
- 注意語法：`document`（文件物件）→ `f1`（表單的 name）→ `t1`（輸入框的 name）→ `.disabled = true;`，這是「依表單 name 鏈」存取表單元素的標準寫法。

---

### 3.7 `onLoad` 事件處理器（The onLoad Event Handler）

`load` 事件的觸發時機：**網頁在瀏覽器中完成載入程序之後**（just after the page finishes the loading process into the browser）。凡是要等整頁載入完才執行的工作，都放在這個事件內。

- 用法：把 `onLoad` 放在網頁的 `<body>` 開始標籤中。

```html
<html>
<body onLoad="window.alert('Loading completed');">
  Text for the body of the page
</body>
</html>
```

> **English Standard Definition:** With the load event, all tasks will be executed just after the page finishes the loading process into the browser.

> **English Standard Definition:** To handle this event, we use the `onLoad` event handler in the `<body>` tag on a web page.

---

### 3.8 `onFocus` 事件處理器（The onFocus Event Handler）

`focus` 事件發生於：用戶把焦點（focus）給予**視窗（window）或表單元素（form element）**時。

- 例子：用戶點擊文字輸入框（未輸入任何內容前），該文字框便取得焦點；
- 又例如點擊一個非作用中視窗，令它變成作用中視窗，該視窗亦取得焦點。

> **English Standard Definition:** The focus event occurs when the viewer gives focus to a window or a form element on a web page.

> **English Standard Definition:** The event handler used with this event is `onFocus`, and it can be used in a form element or in the opening `<body>` tag on a web page.

**放置位置：**表單元素內，或網頁開頭的 `<body>` 標籤內。

**例子 1 — 用在表單元素（文字框取得焦點時彈出提示）：**

```html
<body>
<form>
  Enter your name:
  <input type="text" onFocus="window.alert('Don\'t forget to use small letters!');">
</form>
</body>
```

**例子 2 — 用在視窗（`<body>` 標籤）：**

```html
<body onFocus="window.alert('Thanks for choosing me!');">
  <h1>Hello 1</h1>
</body>
```

**注意**：例子 1 中字串內有單引號，要用 `\'` 跳脫（escape），否則 JavaScript 字串會被提早結束。

---

### 3.9 `onBlur` 事件處理器（The onBlur Event Handler）

`blur` 事件是 `focus` 事件的**相反**：發生於用戶把焦點**從某表單元素或視窗移走**（takes the focus away）時。

> **English Standard Definition:** The blur event is the opposite of the `onFocus` event, and it occurs when the viewer takes the focus away from a form element or a window.

**重要細節（考試常考）：**

> **English Standard Definition:** The blur event is triggered only when you give focus to another area.

- blur 事件**只有在把焦點給予另一區域時**才會觸發——純粹把焦點移走而不聚焦去其他地方，不會觸發 blur。

**放置位置：**表單元素的標籤內，或開頭 `<body>` 標籤內（用於視窗）。

**完整例子 — 離開第一個文字框時彈出提示：**

```html
<html>
<body>
<form>
  Give this box focus:<br />
  <input type="text"
         onBlur="window.alert('Please come back!');" />
  <br /><br />
  Leave for this box:
  <input type="text">
</form>
</body>
</html>
```

**行為推演**：用戶先點第一個文字框（它取得 focus）→ 再點第二個文字框（把 focus 移去第二個框）→ 第一個框觸發 `onBlur` → 彈出 "Please come back!"。

---

### 3.10 `onChange` 事件處理器（The onChange Event Handler）

`change` 事件發生於：用戶**更改了表單元素內的內容**時——包括文字框（textbox）、單選按鈕（radio button）、核取方塊（checkbox）、下拉清單（selection）等等。

> **English Standard Definition:** The change event occurs when a viewer changes something within a form element (textbox, radio button, checkbox, selection etc).

**例子 — 在下拉清單選擇選項時彈出提示：**

```html
<form>
  Are you IVE student?
  <select onChange="window.alert('Choice selected!');">
    <option>Yes</option>
    <option>No</option>
    <option>Undecided</option>
  </select>
</form>
```

**對比記憶**：`onChange` 與 `onBlur` 不同——`onChange` 看重點是「內容真的被改動」，而 `onBlur` 只看「焦點移走」；若文字框內容沒變就只是移走焦點，只會觸發 blur 而不會觸發 change。

---

### 3.11 `onSubmit` 事件處理器（The onSubmit Event Handler）

`submit` 事件**只在用戶提交表單時**發生（例如按下 submit 按鈕）。

> **English Standard Definition:** The submit event only occurs when the viewer submits a form on a web page.

**重要特點（考試常考）：**

> **English Standard Definition:** The `onSubmit` event handler works only with the Form object, and it is commonly used to validate the form before it's sent to the web server.

- `onSubmit` **只適用於 Form 物件**（works only with the Form object）——即必須寫在 `<form>` 標籤內。
- 最常見用途：**在表單送往 Web Server 之前進行驗證（validate the form）**，配合 `return false;` 阻止錯誤資料送出。

**例子：**

```html
<body>
<form onSubmit="window.alert('Thank you!');">
  What is your name?<br />
  <input type="text" name="tfName"><br />
  <input type="submit">
</form>
</body>
```

- 用戶按下 submit 按鈕 → 先執行 `onSubmit` 事件處理器（此處彈出 "Thank you!"）→ 之後才進行提交動作。

---

### 3.12 用按鈕連結到其他 URL（An Example on Button Link）

一般跳轉頁面靠超連結，但用 JavaScript 可以**用按鈕（button）連結到不同 URL**，令按鈕變成「可點擊的連結」。

**一般語法（The general syntax）：**

```javascript
window.location = "http://someplace.com";
```

> **English Standard Definition:** The general syntax is: `window.location = "http://someplace.com";`

- `window.location` 是視窗物件的屬性，代表「目前頁面的位置」；把它設定成新 URL，瀏覽器便會載入該網址。

**直接寫在 button input 的 `onClick` 內：**

```html
<form>
  <input type="button" value="Go Searching!"
         onClick="window.location='http://www.yahoo.com';">
</form>
```

**解說重點：**
- `type="button"` 是按鈕（不會觸發表單提交，與 `type="submit"` 不同）。
- 留意例子中 URL 用**單引號**包住（`window.location='http://www.yahoo.com';`），因為外層屬性值用雙引號；內外引號必須不同以免衝突。

---

### 3.13 完整綜合例子（Example Code）

定義一個函數 `go_to(place)`，把「地點」傳入並設定 `window.location`；三個按鈕各自呼叫此函數並傳入不同 URL。這樣只需寫一次跳轉邏輯，即可重用於多個按鈕。

```html
<html>
<head>
<script type="text/javascript">
  function go_to(place) {
    window.location = place;
  }
</script>
</head>
<body>
<form>
  <input type="button" value="Go Searching!"
         onClick="go_to('http://www.yahoo.com');" />
  <br />
  <input type="button" value="HTML Help!"
         onClick="go_to('http://www.pageresource.com/html5tutorials.html');" />
  <br />
  <input type="button" value="Some JavaScripts!"
         onClick="go_to('http://www.pageresource.com/jscript/');" />
</form>
</body>
</html>
```

**解說重點：**
- 函數放 `<head>` 內的 `<script type="text/javascript">` 中，先定義後使用。
- 事件處理器內呼叫函數：`go_to('http://www.yahoo.com')` — 單引號字串作為參數傳入 `place`。
- 函數體內一行核心語句：`window.location = place;` ——把參數值賦予 `window.location` 即完成跳轉。
- 此設計示範 Event-Driven 的精髓：同一函數被多個不同事件（按鈕點擊）重用，減少重複程式碼。

---

## 4. 📖 必考英文術語與答題句型庫（Core Vocabulary & Exam Key Phrases）

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型（Exam Answer Phrase） |
|---|---|---|
| `event` | 瀏覽器內的用戶動作，會觸發 JavaScript 執行 | An event is a user action occurring inside the browser that triggers the execution of JavaScript. |
| `event handler` | 回應特定事件而執行的 JavaScript 程式碼 | An event handler is code written in JavaScript that is associated with a particular event such as a button click. |
| `onClick` | 滑鼠點擊元素時觸發的事件屬性 | The `onClick` event handler reacts to a mouse click on an element such as a link or a button. |
| `onDblClick` | 滑鼠雙擊時觸發 | `onDblClick` is triggered when the user double-clicks an element. |
| `onMouseOver` | 滑鼠指標移入元素範圍時觸發 | `onMouseOver` reacts to the mouse pointer moving over the element. |
| `onMouseOut` | 滑鼠指標移出元素範圍時觸發 | `onMouseOut` reacts to the mouse pointer leaving the element. |
| `onMouseDown` | 滑鼠按鍵被按下的瞬間觸發 | `onMouseDown` fires when a mouse button is pressed down. |
| `onKeyDown` | 鍵盤按鍵被按下的瞬間觸發 | `onKeyDown` fires when a key on the keyboard is pressed down. |
| `onLoad` | 網頁完成載入後執行，寫在 `<body>` 標籤 | With the load event, tasks are executed just after the page finishes the loading process; it is handled by `onLoad` in the `<body>` tag. |
| `onFocus` | 元素或視窗取得焦點時觸發 | The focus event occurs when the viewer gives focus to a window or a form element. |
| `onBlur` | 焦點從元素或視窗移走時觸發（focus 的相反） | The blur event is the opposite of the focus event; it occurs when the viewer takes the focus away from a form element or a window. |
| `onChange` | 表單元素內容被更改時觸發（textbox、radio、checkbox、selection 等） | The change event occurs when a viewer changes something within a form element such as a textbox or a selection list. |
| `onSubmit` | 用戶提交表單時觸發，只用於 Form 物件，常用於送出前驗證 | The submit event only occurs when the viewer submits a form; `onSubmit` works only with the Form object and is used to validate the form before it is sent to the server. |
| `onReset` | 表單被重設時觸發 | `onReset` fires when the user resets the form. |
| `onUnload` | 頁面/視窗卸載（如關閉視窗）時觸發，無法被阻止 | `onUnload` does not interpret `return false`, because an unload event can never be prevented. |
| `default action` | HTML 標籤對某事件的內建行為，如點連結載入 `href` 頁面 | When a user clicks a link, the browser loads the page specified in its `href` attribute; this is the default action caused by the click event. |
| event handler first, then default action | 事件處理次序的核心原則 | If an event causes both a default action and the execution of an event handler, the event handler is executed first, then the default action takes place afterwards. |
| `return false;` | 令事件處理器回傳 false，停用該標籤的預設動作 | An event handler can return a boolean; `false` means "don't take the default action", so the default action of the associated tag is disabled. |
| `window.location` | 代表瀏覽器目前位置（URL）的屬性，賦新值即跳轉 | The general syntax to link to another page is `window.location = "http://someplace.com";` |
| `document.f1.t1.disabled = true;` | 用 JS 依表單 name 鏈停用文字框的語句 | We can disable a text box by the JavaScript statement `document.f1.t1.disabled = true;` |
| HTML attributes are not case sensitive | HTML 屬性不區分大小寫 | Event names are attributes of HTML tags and HTML is not case sensitive, so `onClick`, `onclick` and `ONCLICK` are the same. |

---

## 5. 🗺️ 循序漸進學習路線（Learning Path）

**第一階段：先理解甚麼觀念（Understand）**
- 甚麼是 Event（用戶動作）與 Event Handler（回應的 JS 程式碼）。
- Event-Driven 流程：動作 → 觸發 → 執行 handler。
- 「事件處理器先執行，預設動作後執行」原則；`return false;` 如何停用預設動作。
- 逐個事件的觸發時機與差別：load / focus / blur / change / submit，尤其 focus 與 blur 相反、blur 要「聚焦到另一處」才觸發。

**第二階段：背誦甚麼英文短語（Memorise）**
- 標準定義句：*An event is a user action occurring inside the browser that triggers the execution of JavaScript.*
- 執行次序句：*The event handler is executed first, then the default action takes place afterwards.*
- 阻止動作句：*`false` means "don't take the default action"; the default action of the associated tag will be disabled.*
- 例外句：*`onUnload` does not interpret `return false` because an unload event can never be prevented.*
- 跳轉語法句：*`window.location = "http://someplace.com";`*

**第三階段：掌握甚麼寫法/實作（Apply）**
- 寫出「滑鼠移過連結彈 alert」：`<a href="..." onMouseOver="alert('...')">`。
- 寫出「阻止表單提交」：`<form onSubmit="checkSomething(); return false;">`。
- 寫出「阻止文字選取 / 阻止鍵盤輸入」：`onMouseDown="return false;"`、`onKeyDown="return false;"`。
- 寫出「文字框 disable」：`document.f1.t1.disabled = true;`。
- 寫出「按鈕跳轉」：`<input type="button" onClick="window.location='http://...';">`，以及重用函數版本 `function go_to(place) { window.location = place; }`。

**第四階段：能解答甚麼英文考題（Answer Exam Questions）**
- 定義題：*Define an event. Give two examples.*
- 原理題：*When both a default action and an event handler exist, which one is executed first? Explain.*
- 應用題：*How can you stop a form from being submitted after validation fails?*（答：`return false;` in the `onSubmit` handler）
- 辨別題：*What is the difference between `onFocus` and `onBlur`?* / *Which event fires when the content of a text box is changed?*（答：`onChange`）
- 記憶題：*Are HTML event attribute names case sensitive?*（答：No，HTML is not case sensitive）
- 例外題：*Which event handler does not interpret `return false`? Why?*（答：`onUnload`）
- 實作題：*Write JavaScript in a button so that clicking it goes to `http://www.yahoo.com`.*

---

## 6. 🎒 考前 5 分鐘雙語懶人包（Cheat Sheet）

### 6.1 事件總覽對照表（事件 → 觸發時機 → 常配元素）

| 事件屬性 | 觸發時機（When it fires） | 常配元素 |
|---|---|---|
| `onClick` | 滑鼠點擊（mouse click） | `<a>`、button、checkbox 等 |
| `onDblClick` | 滑鼠雙擊（double click） | 一般元素 |
| `onMouseOver` / `onMouseOut` | 指標移入 / 移出（pointer over / out） | `<a>`、`<img>` |
| `onMouseDown` | 滑鼠鍵按下（mouse button pressed down） | 一般元素 |
| `onKeyDown` | 鍵盤鍵按下（key pressed down） | text box 等 |
| `onLoad` | 頁面完成載入後（after page finishes loading） | `<body>` |
| `onFocus` | 取得焦點（gives focus to element / window） | text box、`<body>` |
| `onBlur` | 焦點被移走（takes focus away） | form element、`<body>` |
| `onChange` | 表單元素內容被改（something changed） | textbox、radio、checkbox、select |
| `onSubmit` | 提交表單（form submitted） | 只限 `<form>`（Form object） |
| `onReset` | 重設表單（form reset） | 只限 `<form>` |
| `onUnload` | 頁面卸載（e.g. 關閉視窗） | `<body>` |

### 6.2 關鍵速記表（重點屬性命中表）

| 速記重點 | 內容 |
|---|---|
| 事件屬性前綴 | 全部以 **`on`** 開頭：`onXXX` |
| HTML 屬性大小寫 | **不區分大小寫**：`onClick` = `onclick` = `ONCLICK` |
| 執行次序 | **Handler 先 → Default action 後**（handler first, then default action） |
| 阻止預設動作 | 事件處理器內加 **`return false;`** |
| 唯一例外 | **`onUnload`** 不理會 `return false`（卸載無法阻止） |
| onSubmit 用途 | 只在 Form object 用，**送表單前驗證** |
| focus vs blur | focus = 取得焦點；blur = 移走焦點（相反）；blur 只在聚焦到另一處時觸發 |
| 改變內容 | 用 **`onChange`**（不是 onBlur） |
| 按鈕跳轉 | `window.location = "網址";` 配合 `onClick` |
| 停用文字框 | `document.表單name.欄位name.disabled = true;` |

### 6.3 英文極速記憶口訣（Mnemonic）

- **「Event = 用戶動作」**：*Event is a user action inside the browser.*（用戶在瀏覽器內的動作就是事件）
- **「on 前綴記事件」**：*Every event attribute starts with "on".*（所有事件屬性都以 on 開頭）
- **「Handler 行先，Action 殿後」**：*Handler first, then default action.*（事件處理器先行，預設動作殿後）
- **「False = 唔准做」**：*Return false — don't take the default action.*（false = 禁止預設動作）
- **「Unload 冇得救」**：*Unload can never be prevented.*（unload 永遠阻止唔到）
- **「Focus 入、Blur 出、Change 改」**：*Focus in, Blur out, Change modified.*（focus 係入焦點、blur 係走焦點、change 係內容被改）
- **「Load 完先做嘢」**：*onLoad runs after the page is fully loaded.*（頁面載入完成先執行）
- **「Button 跳頁靠 location」**：*window.location = URL.*（按鈕跳頁靠 window.location）
- **「Size 冇所謂」**：*HTML is not case sensitive.*（HTML 唔分大細階，寫法一樣）

### 6.4 一分鐘自我測驗（Quick Self-test）

1. *When a link with both `href` and `onClick` is clicked, which runs first — the event handler or the default action?* → Event handler（handler first）。
2. *How to stop the default action of a form submit after validation?* → `<form onSubmit="check(); return false;">`。
3. *Which event fires when the user leaves a text box after editing it?* → `onBlur`（若內容有改則亦會先觸發 `onChange`）。
4. *Which handler does NOT respect `return false`?* → `onUnload`。
5. *Write one line of JavaScript to make a button open `http://www.yahoo.com`.* → `window.location='http://www.yahoo.com';`（寫在 `onClick` 內或函數內）。

---

> 💡 **溫馨提示**：本指南依 ITE3006 Topic 8 投影片內容整理，涵蓋全部 SLIDE 1–16 知識點，無遺漏；考試前記得動手寫一次 `onSubmit` + `return false;` 與 `window.location` 的完整範例，確保語法位置（屬性放開始標籤、分號與引號配對）正確。
