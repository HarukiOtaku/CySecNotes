# ITE3006 Lab 7：JavaScript Basics — 雙語實務 CodeGuide（實務測驗主戰文件）

> 課程：ITE3006 Information Technology Essentials（Web 部分）｜本 Lab 係 JavaScript 入門第一課：**冇 CSS、冇 DOM 操作**，重點係「點樣將 JavaScript 放入 HTML、點樣用 `window` 物件嘅 `alert()` / `prompt()` 同用家互動、點樣寫同呼叫 function、點樣處理輸入（string → number）」。呢啲全部係 Practical Test 最鍾意考嘅基本功。

---

## 🔗 理論 recap（開頭總結，本 Lab 用到的理論）

- JavaScript 係 **client-side scripting language**（用戶端腳本語言）：由瀏覽器執行，用 `<script>...</script>` 嵌入 HTML。
- 三個 **window 物件**互動方法：`window.alert()` 彈出提示框（output）、`window.prompt()` 彈出輸入框（input，**永遠回傳 string**）、`document.write()` 直接將內容寫入網頁。
- JavaScript 可以喺三個位置觸發：`<script>` 內直接執行、HTML **event handler** attribute（`onClick="..."`）、**pseudo-URL**（`href="javascript:..."`）。
- **Function**：`function 名稱(參數) { ... }` 定義，呼叫時傳入 argument；`return` 回傳值並結束函數。
- `+` 對 string 係 **concatenation（字串連接）**、對 number 先係加法 —— 所以 `prompt()` 輸入一定要用 `parseInt()` / `parseFloat()` 轉數字。
- 數學與格式化：`Math.PI`（π）、`Math.pow(x, 3)`（x³）、`number.toFixed(2)`（保留 2 位小數並四捨五入，**回傳 string**）。
- 輸入驗證：`isNaN(x)` 偵測「唔係數字（Not a Number）」；`do...while` 可以重複問到輸入正確為止。

> **Core idea:** JavaScript runs *client-side* in the browser. `alert()` outputs a message box, `prompt()` inputs a value that is *always a string*, so numbers must be converted with `parseInt()`/`parseFloat()` before arithmetic — otherwise `"2" + "3"` gives `"23"`, not `5`. `toFixed(2)` rounds a number to 2 decimal places but returns a *string*.

---

## 1. 🎯 Lab 目標與環境 (Objectives & Environment)

**Intended Learning Outcome（要掌握的實務技能）：**

1. 明白 JavaScript 喺 **client-side programming（用戶端程式設計）** 嘅用途：程式碼喺瀏覽器執行，唔使伺服器。
2. 用 `<script>` 標籤將 JavaScript 嵌入 HTML，並用 `document.write()` 輸出內容到網頁。
3. 用 `window.alert()` 顯示訊息、`window.prompt()` 接收用家輸入（仲要識佢回傳 string 呢個陷阱）。
4. 用 HTML **event handler**（`onClick` attribute）同 **javascript: pseudo-URL** 兩種方式觸發 JavaScript。
5. 定義同呼叫 **function**（例如 `NumPicker(num)`、`sphereVolume(radius)`），識傳 **parameter / argument**。
6. 用 `parseInt()` / `parseFloat()` 轉換數字、`Math.PI` / `Math.pow()` 做數學運算、`toFixed(2)` 控制小數位。
7. 用 `isNaN()` + `if..else` / `do...while` 做 **input validation（輸入驗證）**，重複問到輸入正確為止。

**所需工具（Resources Required）：**

| 工具 | 用途 | 英文說明 |
|------|------|---------|
| Notepad++（或 VS Code） | 純文字編輯器寫 HTML + JavaScript | A plain text editor to write HTML and JavaScript |
| Google Chrome / Mozilla Firefox | 開啟 `.html` 檔案，執行 JavaScript、睇 alert/prompt 效果 | A browser to open and run the HTML files |
| Chrome DevTools Console（F12） | 睇 JavaScript error（紅色訊息）、測試代碼 | Open DevTools (F12) → Console tab to see JS errors |
| 圖片檔 one.gif / two.gif / three.gif | Exercise 2 嘅「按鈕圖片」素材 | The three button images used in Exercise 2 |

**執行方法：** 喺 Notepad++ 打好 Code → `File > Save As` 存做 `lab07_x.html`（**一定要 `.html` 副檔名**）→ 雙擊檔案用 Chrome 開啟 → 每次改完儲存後按 `F5` 刷新。JavaScript 一有 **syntax error（語法錯誤）**，成個 `<script>` 都會唔執行，所以見到「咩都冇顯示」第一時間開 F12 Console 睇紅字。

> **Environment tip:** JavaScript runs when the page is loaded in the browser — no server is needed. If nothing appears on the page, open DevTools (F12) → Console: a red error message usually means a syntax error in your `<script>`.

---

## 2. 🛠️ 解題步驟拆解 (Walkthrough)

### Exercise 1 — [lab07_1.html] 用 `document.write()` 顯示文字（基礎示範）

**題目原文（Question）：**

> The exercise shows you JavaScript in action by loading an HTML document in your browser. The script writes a line of text in the browser using JavaScript.

教材提供嘅基礎檔 `lab07_1.html` 內容如下（**記住：`document.write()` 接受嘅係 HTML 字串，所以可以連 HTML tags 一齊寫**）：

```html
<!doctype html>
<html>
<head>
</head>
<body>
  <script type="text/javascript">
    document.write("This text was written with JavaScript!");
  </script>
</body>
</html>
```

> **Answer points:** `<script type="text/javascript">` embeds JavaScript in HTML; the browser runs it while parsing the page. `document.write("...")` writes the given string — including any HTML tags inside it — into the document at that position. In HTML5 the `type` attribute is optional (JavaScript is the default), but the lab keeps it for compatibility.

#### (a) [lab07_1a.html] 令文字顯示為標題、粗體、斜體並斷行

**題目原文：** Make the line of text displaying in `<h1>`, bold and italic on the web browser, and split the line (use `<br />` which stands for 'break') of text as shown below:

**1 ➔ 2 ➔ 3 解法：**

1. 將檔案另存做 `lab07_1a.html`，改嘅只係 `document.write()` 嗰一句：想輸出變成「一級標題、粗體、斜體、兩行」，直接喺字串入面寫 HTML tags。
2. 答案（將文字分成兩行：`This text was written with` / `JavaScript!`）：
   ```javascript
   document.write("<h1><b><i>This text was written with<br />JavaScript!</i></b></h1>");
   ```
   - `<h1>` = 一級標題（heading level 1，字體最大、本身係 block）。
   - `<b>` = **bold（粗體）**；`<i>` = **italic（斜體）**。
   - `<br />` = **break（斷行）**：將文字分成兩行顯示（唔係新 paragraph，只係換行）。
   - **Tag 巢狀次序**：開 tag 次序係 `h1 → b → i`，閉 tag 次序要**反轉**：`</i> → </b> → </h1>`（HTML 要求正確 nesting）。
3. 儲存 → 用 Chrome 開啟 → 應該見到兩行大字，粗體斜體；若果見到字面上嘅 `<h1>` 文字，就代表括號／引號寫錯令 tag 變成咗純文字。

> **Answer points:** `document.write()` treats its string as HTML, so tags such as `<h1>`, `<b>`, `<i>` and `<br />` take effect inside it. `<br />` is a *void (empty) element* that breaks the line. Nested tags must close in reverse order: `<h1><b><i>...</i></b></h1>`.

**✅ 完成檢查清單：** 瀏覽器顯示兩行文字，格式 = 標題（大）+ 粗體 + 斜體，中間喺 `<br />` 位置斷行。

#### (b) [lab07_1b.html] 用 event handler 同 pseudo-URL 顯示 alert

**題目原文：** Make a web page with a button and an anchor link by using the event handler and pseudo-URL to display the separated lines of text in an alert window as shown below:

> Hints: `<form>` `<input type="button" value="Show Alert" onClick="alert('...\n...!');" />` `</form>` `<br />` `<a href="javascript:alert('...');">Show Alert</a>`

**1 ➔ 2 ➔ 3 解法：**

1. 起點檔 `lab07_1b.html` 已經有 `<form>` + `<input type="button">` + `<br />` + `<a>`，**淨係要填**兩樣嘢：button 嘅 `onClick`、anchor 嘅 `href`。
2. **Button 用 event handler attribute**（`onClick` = 「撳一下觸發」）：
   ```html
   <input type="button" value="Show Alert"
          onClick="alert('This text was written with\nJavaScript!');" />
   ```
   - `onClick="..."` 係 HTML **event handler（事件處理器）**：attribute 值就係要執行嘅 JavaScript 語句。
   - `alert('...')` 用單引號括住 JS 字串，因為成個 attribute 已經用緊雙引號（雙引號入面唔可以再直接放雙引號）。
   - `\n` 係 **escape sequence（跳脫字元）**，代表 newline（換行）→ alert 內會顯示兩行。**注意：alert 唔會解析 HTML，喺 alert 入面寫 `<br />` 係冇用嘅，一定要用 `\n`。**
3. **Anchor 用 pseudo-URL**（`href` 唔係普通網址，而係 `javascript:` 開頭 → 瀏覽器會執行後面嘅 JavaScript，唔會跳頁）：
   ```html
   <a href="javascript:alert('This text was written with\nJavaScript!');">Show Alert</a>
   ```
4. 測試：撳「Show Alert」button → 彈出兩行 alert；撳文字連結 → 彈出同一個 alert。兩種方式顯示內容要一致。

> **Answer points:** An **event handler attribute** (`onClick="alert(...);"`) runs JavaScript when the user clicks the element. A **pseudo-URL** (`href="javascript:alert(...);"`) executes JavaScript when the link is clicked instead of navigating. Inside `alert()`, a new line is written with the escape sequence `\n` — HTML tags like `<br />` do NOT work in an alert box.

**✅ 完成檢查清單：** 頁面有一個「Show Alert」button 同一個「Show Alert」連結；兩個撳完都彈出**兩行**文字嘅 alert。

---

### Exercise 2 — [lab07_2.html] 圖片按鈕 + `NumPicker()` function（教材原文寫 `lab02_2.html`，係 typo，實際檔名係 `lab07_2.html`）

**題目原文（Question）：**

> Make a web page and insert these three images (1, 2, 3 三張按鈕圖片). With each click of a button image, it asks you for your name and shows something with an alert like "Hi Peter, you clicked on 1".

> Hints: `<script type="text/javascript">` `function NumPicker(num) {` `... = prompt("What is your name?", "");` `alert("Hi " + ... + ", you clicked on " + num);` `}` `</script>` `<a href="javascript:NumPicker(...)"><img ... /></a>`

**HTML 結構速覽（起點檔骨架）：**

```html
<head>
  <script type="text/javascript">
    function NumPicker(num) {          <!-- 空格 1：prompt 問名 -->
                                       <!-- 空格 2：alert 顯示 -->
    }
  </script>
</head>
<body style="text-align:center">
  <a href=""><img src="images/one.gif" border="0" /></a>
  <a href=""><img src="images/two.gif" border="0" /></a>
  <a href=""><img src="images/three.gif" border="0" /></a>
</body>
```

**1 ➔ 2 ➔ 3 解法：**

1. **填 function body（兩個空格）：** `prompt()` 問用家姓名（第二個參數 `""` 係輸入框預設文字，可以留空），跟住 `alert()` 顯示「Hi + 姓名 + 撳咗第幾張圖」：
   ```javascript
   function NumPicker(num) {
     var name = prompt("What is your name?", "");
     alert("Hi " + name + ", you clicked on " + num);
   }
   ```
   - **空格 1 答案：** `var name = prompt("What is your name?", "");`
   - **空格 2 答案：** `alert("Hi " + name + ", you clicked on " + num);`
   - `num` 係 **parameter（參數）**：function 內部用佢嚟知道「撳咗邊張圖」。`+` 喺度係 **string concatenation**，將三段文字駁埋。
2. **填三條 link 嘅 `href`（pseudo-URL 帶 argument）：**
   ```html
   <a href="javascript:NumPicker(1)"><img src="one.gif" border="0" /></a>
   <a href="javascript:NumPicker(2)"><img src="two.gif" border="0" /></a>
   <a href="javascript:NumPicker(3)"><img src="three.gif" border="0" /></a>
   ```
   - `javascript:NumPicker(1)` = 撳第一張圖 → 呼叫 `NumPicker`，傳入 **argument（實參）** `1`；第 2、3 張圖傳 `2`、`3`。
   - **實戰注意（路徑陷阱）**：起點檔寫 `src="images/one.gif"`，但三個 gif 其實同 `lab07_2.html` 放喺**同一資料夾**——照抄會出裂圖。最簡單：改成 `src="one.gif"`（相對路徑：同資料夾）；或者自己開一個 `images` 子資料夾放啲 gif。
3. 測試：撳圖片 1 → 彈出 prompt 問名（例如輸入 Peter）→ alert 顯示 `Hi Peter, you clicked on 1`；撳圖片 2、3 顯示 `2`、`3`。

> **Answer points:** A function is *declared* with `function NumPicker(num) {...}` and *called* with `NumPicker(1)` — `num` is the parameter, `1` is the argument passed in. `prompt("What is your name?", "")` returns the typed text (the second argument is the default text shown in the box). The function is defined inside `<head>` so it is ready before the user clicks. Image src is a *relative path*: `one.gif` means "in the same folder as this HTML file".

**✅ 完成檢查清單：** 三張圖並排（置中）；撳圖 1/2/3 分別 prompt 問名，再 alert「Hi {名}, you clicked on {1/2/3}」；圖片唔係裂圖。

---

### Exercise 3 — [lab07_3.html] `sphereVolume(radius)` 計球體體積

**題目原文（Question）：**

> Write a complete JavaScript script to prompt the user for the radius of a sphere and call function `sphereVolume(radius)` to calculate and display the volume of that sphere. Display the result in an alert box with limit the result of volume to 2 decimal places. (You may use `volume.toFixed(2)` to accomplish this result). `toFixed()` method converts a number into a string, keeping a specified number of decimal places.

> 公式（圖內）：**Volume of sphere V = 4/3 × π × r³**

> Hints: `function sphereVolume(radius) {` `var volume = (4.0 / 3.0) * Math.PI * Math.pow(parseInt(radius), 3);` `alert("Volume of the sphere with radius " + ... + " is : " + ... );` `}`

**1 ➔ 2 ➔ 3 解法：**

1. **填 `<head>` 入面個 function（兩個空格）：** 用公式計 volume，再喺 alert 顯示，體積要 `toFixed(2)` 保留 2 位小數：
   ```javascript
   function sphereVolume(radius) {
     var volume = (4.0 / 3.0) * Math.PI * Math.pow(parseInt(radius), 3);
     alert("Volume of the sphere with radius " + radius + " is : " + volume.toFixed(2));
   }
   ```
   - **空格 1 答案：** `radius`（顯示返用家輸入嘅半徑值）
   - **空格 2 答案：** `volume.toFixed(2)`（體積限制 2 位小數）
   - `(4.0 / 3.0)`：寫 `4.0/3.0` 確保係**浮點數除法**（若寫 `4/3` 喺某啲語言會變整數 1；JavaScript 本身無問題，但教材照慣例用 `4.0/3.0`）。
   - `Math.PI` = 圓周率 π（≈ 3.14159）；`Math.pow(radius, 3)` = `radius` 嘅三次方（`Math.pow(底數, 指數)`）。
   - `parseInt(radius)`：`prompt()` 輸入係 string，先轉做**整數**先計到數（教材提示用 `parseInt`；如果半徑想支援小數，可用 `parseFloat`）。
   - `volume.toFixed(2)`：將 volume 四捨五入到 2 位小數並轉做 string。
2. **填 `<body>` 入面嘅主程式（起點檔有三行註解提你）：** 宣告變數 `r` → `prompt()` 問半徑 → 呼叫 function 並將 `r` 做 argument 傳入：
   ```javascript
   var r = prompt("Enter the radius of a sphere: ");
   sphereVolume(r);
   ```
3. **驗證（自己心算對答案）：** 輸入 `r = 3` → `V = 4/3 × π × 27 ≈ 113.0973` → alert 顯示 `Volume of the sphere with radius 3 is : 113.10`。

> **Answer points:** `var r = prompt(...)` declares a variable and stores the string typed by the user; `sphereVolume(r)` passes `r` as the *argument* matching the parameter `radius`. `Math.pow(radius, 3)` = r³ and `Math.PI` = π. `toFixed(2)` rounds the number to 2 decimal places and *returns a string*, e.g. `113.10`.

**✅ 完成檢查清單：** 開啟頁面即彈 prompt；輸入半徑（例如 3）→ alert 顯示「Volume of the sphere with radius 3 is : 113.10」（**一定要兩位小數**）。

---

### Optional Exercise 4 — 輸入驗證三部曲（4a → 4b → 4c，越嚟越嚴謹，實測最愛考）

#### (a) [lab07_4a.html] 點解 `x + y` 錯？— string 連接陷阱

**題目原文：** Try the following JavaScript code and save it into `lab07_4a.html`:

```html
<!doctype html>
<html>
<body>
  <script type="text/javascript">
    var x = window.prompt("Enter an integer for x");
    var y = window.prompt("Enter a floating point for y");
    var z = x + y;
    window.alert("The result of x + y is: " + z);
  </script>
</body>
</html>
```

> Do you get the result as you expect? Modify the code to make the sum calculates correctly. (You may use the built-in function in the window object called `window.parseInt()` and `window.parseFloat()`). If the first character cannot be converted to a number, `parseInt()` or `parseFloat()` returns NaN (means 'Not a Number'). You should also limit the number of decimal places in the result of z to 2.

**1 ➔ 2 ➔ 3 解法：**

1. **先講答案：唔會得到預期結果！** `window.prompt()` **永遠回傳 string**。如果輸入 `x = 2`、`y = 3.5`，`z = x + y` 其實係**字串連接**：`"2" + "3.5"` = `"23.5"`（駁埋一齊），而唔係 `5.5`。
2. **修正：** 用 `window.parseInt()` 將 x 轉整數、`window.parseFloat()` 將 y 轉浮點數，先至做加法；`z` 再用 `toFixed(2)` 限 2 位小數：
   ```javascript
   var x = window.prompt("Enter an integer for x");
   var y = window.prompt("Enter a floating point for y");
   var z = window.parseInt(x) + window.parseFloat(y);
   window.alert("The result of x + y is: " + z.toFixed(2));
   ```
3. **驗證：** 輸入 `2` 同 `3.5` → `z = 2 + 3.5 = 5.5` → alert 顯示 `The result of x + y is: 5.50`（兩位小數）。

> **Answer points:** `prompt()` always returns a *string*, so `+` performs string concatenation (`"2" + "3.5"` → `"23.5"`). `window.parseInt(x)` parses a leading integer and `window.parseFloat(y)` parses a leading floating-point number; both are methods of the `window` object. If the first character cannot be converted, they return `NaN` (Not a Number). `z.toFixed(2)` formats the result to 2 decimal places.

#### (b) [lab07_4b.html] 加 `isNaN()` 檢查輸入係咪數字

**題目原文：** Based on (a), rewrite the program using `if..else` and the function `isNaN()` to check if the two inputs are numbers, then add the first integer number to the second floating point number and prints the results in 2 decimal places.

> Hints: `var x = prompt("Enter an integer for x");` `if (isNaN(x)) { alert("x is not a number!"); return; }` `var y = prompt("Enter a float point for y");` `if (isNaN(y)) { alert("y is not a number!"); return; }` `var z = x + y;` `window.alert("The result of x + y is: " + ... );`

**1 ➔ 2 ➔ 3 解法：**

1. **核心概念：** `isNaN(x)` 回傳 `true` 表示 x「**唔係數字（Not a Number）**」——佢會先嘗試將 x 轉做 number，轉唔到（例如 `"abc"`）就係 `true`；轉到（例如 `"12"`）就係 `false`。題目要求用 **`if..else`** 結構包住驗證邏輯。
2. **答案（完整版）：**
   ```javascript
   var x = prompt("Enter an integer for x");
   var y, z;
   if (isNaN(x)) {
     alert("x is not a number!");
   } else {
     y = prompt("Enter a float point for y");
     if (isNaN(y)) {
       alert("y is not a number!");
     } else {
       z = parseInt(x) + parseFloat(y);          // 記住：仍然要轉數字先加得
       window.alert("The result of x + y is: " + z.toFixed(2));
     }
   }
   ```
   - **alert 內空格答案：** `z.toFixed(2)`。
   - 兩個 input 都驗證咗先至計數：任何一個唔係數字 → 淨係彈 alert 話你知，唔會輸出結果。
   - **考場貼士（好多人中招）：** 提示入面嘅 `return;` 寫法**只可以喺 function 入面用**——照貼喺 top-level script 會出 `Uncaught SyntaxError: Illegal return statement`，成段程式都唔行。所以 (b) 用 `if..else` 巢狀結構，唔使 `return`（到 (c) 寫咗 function `getNum()`，`return` 就合法喇）。
3. **驗證：** 輸入 `x = abc` → 彈「x is not a number!」；輸入 `x = 2`、`y = 3.5` → `5.50`；輸入 `y = hello` → 彈「y is not a number!」。

> **Answer points:** `isNaN(value)` returns `true` when the value *is not a number* — e.g. `isNaN("abc")` is `true`, `isNaN("12")` is `false`. Checking both inputs before adding prevents wrong output. Even after validation, the two prompt strings must still be converted (`parseInt(x) + parseFloat(y)`), otherwise `+` concatenates them again. A bare `return;` at top level of a script is an *Illegal return statement* syntax error; it is only valid inside a function.

#### (c) [lab07_4c.html] 用 function `getNum()` 重複問到啱為止

**題目原文：** Rewrite (b). This time write a Javascript function `getNum()` so that if not a number is entered, the function will ask the user again until a number is entered. Then call the `getNum()` twice to input two numbers and then sum them up and display the result.

> Hints: `do {` `var n = parseInt(prompt("Enter a number"));` `if (isNaN(n)) alert("Not a number!")` `else return n;` `} while (true);`

**1 ➔ 2 ➔ 3 解法：**

1. **寫 `getNum()` function：** 用 **`do...while` 迴圈**——body 至少執行一次（問一次），若輸入唔係數字就彈「Not a number!」並**再問多次**，直到輸入正確為止，`return n` 先會結束：
   ```javascript
   function getNum() {
     do {
       var n = parseInt(prompt("Enter a number"));
       if (isNaN(n)) {
         alert("Not a number!");
       } else {
         return n;                 // 輸入正確：return 同時結束 function 同迴圈
       }
     } while (true);               // true = 永遠重複，靠 return 先跳出
   }
   ```
   - 今次 `parseInt()` 喺 prompt 之後**即刻做**，所以 `isNaN(n)` 檢查嘅已經係數字轉換結果（空輸入／亂打字 → `parseInt` 回傳 `NaN` → 再問；呢個做法比 (b) 檢查 raw string 更穩陣）。
   - `do...while` 保證**最少問一次**；`while (true)` 配上 function 內嘅 `return` 係常見嘅「重複驗證」寫法。
2. **主程式：** 呼叫 `getNum()` 兩次攞兩個數字，加埋顯示：
   ```javascript
   var a = getNum();
   var b = getNum();
   var sum = a + b;
   alert("The sum of " + a + " and " + b + " is: " + sum);
   ```
3. **驗證：** 第一次輸入 `abc` → 彈「Not a number!」再問；直到輸入 `5` 為止 → 第二次輸入 `3` → alert 顯示 `The sum of 5 and 3 is: 8`。

> **Answer points:** `do { ... } while (true);` runs the body at least once and loops forever; the only way out is `return n` once a valid number is entered. Calling `getNum()` twice returns two numbers, which are added with `+`. This is the standard pattern for *validated input loops*: parse immediately with `parseInt()`, test with `isNaN()`, alert on failure and re-ask.

**✅ 完成檢查清單（Exercise 4）：** (a) 輸入 2 同 3.5 出 `5.50`（唔係 `23.5`）；(b) 輸入非數字會彈 warning；(c) 一直輸入錯嘢會一直再問，輸入啱先計數。

---

## 3. 💻 關鍵 HTML/CSS/JS 程式碼

> 本 Lab 冇 CSS（起點檔只有 inline `style` attribute），核心全部係 HTML + JavaScript。以下係各題**完成後嘅最終答案**（Lab 程式碼資料夾入面嘅 `lab07_1a/1b/2/3/4.html` 只係留空 skeleton），逐行有繁中註解。

### 3.1 lab07_1a.html 完整最終版（Exercise 1a）

```html
<!doctype html>
<html>
<head>
</head>

<body>
  <script type="text/javascript">
    /* document.write 將字串當做 HTML 輸出：
       <h1> 一級標題 | <b> 粗體 | <i> 斜體 | <br /> 斷行（void element） */
    document.write("<h1><b><i>This text was written with<br />JavaScript!</i></b></h1>");
    /*          開 tag 次序：h1 → b → i ；閉 tag 次序反轉：/i → /b → /h1   */
  </script>
</body>
</html>
```

### 3.2 lab07_1b.html 完整最終版（Exercise 1b）

```html
<!doctype html>
<html>
<head>
</head>

<body>
  <form>
    <!-- event handler attribute：onClick 值 = 要執行嘅 JS 語句
         attribute 用雙引號 → JS 字串要用單引號
         \n = newline escape sequence → alert 內換行 -->
    <input type="button" value="Show Alert"
           onClick="alert('This text was written with\nJavaScript!');" />
  </form>

  <br />

  <!-- pseudo-URL：href 以 javascript: 開頭 → 撳連結執行 JS，唔會跳頁 -->
  <a href="javascript:alert('This text was written with\nJavaScript!');">Show Alert</a>
</body>
</html>
```

### 3.3 lab07_2.html 完整最終版（Exercise 2）

```html
<!doctype html>
<html>
<head>
  <script type="text/javascript">
    /* function 定義放 <head>：撳圖嗰陣一定已經準備好 */
    function NumPicker(num) {
      /* prompt 問姓名；第二個參數 "" = 輸入框預設文字 */
      var name = prompt("What is your name?", "");
      /* + 連接三段文字：Hi + 姓名 + 撳咗第幾張圖（num = 傳入嘅 argument） */
      alert("Hi " + name + ", you clicked on " + num);
    }
  </script>
</head>

<body style="text-align:center">
  <!-- pseudo-URL 呼叫 function 並傳入 1 / 2 / 3
       注意：gif 同 html 同一資料夾 → src="one.gif"（起點檔寫 images/ 會裂圖） -->
  <a href="javascript:NumPicker(1)"><img src="one.gif" border="0" /></a>
  <a href="javascript:NumPicker(2)"><img src="two.gif" border="0" /></a>
  <a href="javascript:NumPicker(3)"><img src="three.gif" border="0" /></a>
</body>
</html>
```

### 3.4 lab07_3.html 完整最終版（Exercise 3）

```html
<!doctype html>
<html>
<head>
  <script type="text/javascript">
    /* 球體體積 V = 4/3 × π × r³ */
    function sphereVolume(radius) {
      /* 4.0/3.0 浮點除法 | Math.PI = π | Math.pow(radius, 3) = r³
         parseInt：將 prompt 嘅 string 轉整數（想支援小數半徑可改 parseFloat） */
      var volume = (4.0 / 3.0) * Math.PI * Math.pow(parseInt(radius), 3);
      /* toFixed(2)：四捨五入到 2 位小數（回傳 string） */
      alert("Volume of the sphere with radius " + radius + " is : " + volume.toFixed(2));
    }
  </script>
</head>

<body>
  <script type="text/javascript">
    /* 1. 宣告變數 r */
    var r = prompt("Enter the radius of a sphere: ");
    /* 2. prompt 已經喺上一行完成（輸入半徑） */
    /* 3. 呼叫 function，將 r 做 argument 傳入（對應 parameter radius） */
    sphereVolume(r);
  </script>
</body>
</html>
```

### 3.5 Exercise 4 三版對比（4a 修正 → 4b 驗證 → 4c function 化）

**4a 修正版：**（只用 `window.parseInt` / `window.parseFloat` / `toFixed`）

```javascript
var x = window.prompt("Enter an integer for x");
var y = window.prompt("Enter a floating point for y");

/* 轉做數字先加：parseInt 攞整數部分，parseFloat 攞浮點數 */
var z = window.parseInt(x) + window.parseFloat(y);
/* 限制 2 位小數（toFixed 回傳 string） */
window.alert("The result of x + y is: " + z.toFixed(2));
```

**4b 版本（if..else + isNaN 驗證）：**

```javascript
var x = prompt("Enter an integer for x");
var y, z;                                // 預先宣告，else 內先賦值

if (isNaN(x)) {                          // x 唔係數字？
  alert("x is not a number!");           // 係 → 彈警告，唔繼續
} else {                                 // 唔係 → x 合格
  y = prompt("Enter a float point for y");
  if (isNaN(y)) {                        // 第二個輸入再驗證一次
    alert("y is not a number!");
  } else {                               // 兩個都合格先計數
    z = parseInt(x) + parseFloat(y);     // 仍然要轉數字先加（string 會駁埋）
    window.alert("The result of x + y is: " + z.toFixed(2));
  }
}
```

**4c 版本（function getNum() + do...while 重複驗證）：**

```javascript
function getNum() {
  do {
    var n = parseInt(prompt("Enter a number"));   // 即刻轉數字
    if (isNaN(n)) {                               // 轉唔到（NaN）？
      alert("Not a number!");                     // 彈警告 → 迴圈再問一次
    } else {
      return n;                                   // 合格 → return 結束 function
    }
  } while (true);                                 // 無限迴圈，靠 return 跳出
}

var a = getNum();                                 // 第一次輸入（唔啱會一直問）
var b = getNum();                                 // 第二次輸入
var sum = a + b;                                  // 兩個數字相加
alert("The sum of " + a + " and " + b + " is: " + sum);
```

### 3.6 每題必背嘅「一句核心」

| 題目 | 必背核心 |
|------|---------|
| Ex1 document.write | `document.write()` 接受 HTML 字串；`<br />` 斷行；開閉 tag 次序要對稱 |
| Ex1 alert 兩行 | alert 內換行用 **`\n`**，唔可以用 `<br />`（alert 唔解析 HTML） |
| Ex1 觸發方式 | button 用 event handler `onClick="..."`；連結用 pseudo-URL `href="javascript:..."` |
| Ex2 function | `function NumPicker(num)` 定義；`javascript:NumPicker(1)` 呼叫並傳 argument |
| Ex3 數學 | `Math.PI`、`Math.pow(r, 3)`、`(4.0/3.0)`、`volume.toFixed(2)` |
| Ex4a 陷阱 | `prompt()` 回傳 string → `"2" + "3.5"` = `"23.5"`；要 `parseInt`/`parseFloat` 轉數字 |
| Ex4b 驗證 | `isNaN(x)` 回傳 true = 唔係數字；alert 結果用 `z.toFixed(2)` |
| Ex4c 重複輸入 | `do { ... } while (true);` + `return n;` 先跳出；`getNum()` call 兩次再相加 |

---

## 4. 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| 開頁咩都冇顯示（連 document.write 都冇行） | `<script>` 內有 **syntax error**（括號／引號／分號打錯），成段 script 被跳過 | 開 F12 → Console 睇紅色 error；檢查每一行括號 `()` 有冇成對、字串引號有冇閉合 |
| `Uncaught SyntaxError: Illegal return statement` | 喺 **top-level script**（唔喺 function 入面）用 `return;`（Exercise 4b 提示陷阱） | 改用 `if..else` 巢狀結構，或者將邏輯放入 function 先用 `return`（如 4c） |
| alert 顯示 `23.5` 而唔係 `5.5` | `prompt()` 回傳 string，`+` 變咗**字串連接** | 先轉數字：`window.parseInt(x) + window.parseFloat(y)` |
| alert 顯示 `NaN` | `parseInt()`/`parseFloat()` 轉唔到（輸入唔係數字／空值／撳咗 Cancel） | 加 `isNaN()` 檢查輸入；`parseInt("abc")` → `NaN`、`parseInt("12abc")` → `12` |
| `ReferenceError: NumPicker is not defined` | function 名打錯（JavaScript **大小階敏感**：`numpicker` ≠ `NumPicker`），或 function 寫咗喺呼叫之後／冇載入 | 檢查 function 名完全一樣；function 定義放 `<head>`（喺 body 執行之前） |
| 撳圖片冇反應（或者跳去空白頁） | `href` 漏咗 `javascript:` 前綴，或者括號唔齊（例如 `javascript:NumPicker(1`） | `href="javascript:NumPicker(1)"`；javascript: 之後要完整 function call |
| 圖片裂圖（broken image） | 起點檔寫 `src="images/one.gif"`，但 gif 其實同 html 同一資料夾 | 改成 `src="one.gif"`，或開 `images` 子資料夾放入三個 gif |
| alert 冇分成兩行，見到 `\n` 字樣或者一行過 | 用咗 `<br />`（alert 唔解析 HTML）／`\n` 寫咗喺單引號字串外／escape 錯 | alert 字串內用 `\n`：`alert('Line1\nLine2');` |
| 網頁顯示咗 `<h1><b>` 呢啲 tag 文字而唔係格式 | `document.write` 嘅字串引號寫錯，令 tag 變咗純文字（例如用咗單引號包 HTML 又冇閉合） | 檢查字串有冇正確閉合：`document.write("<h1>...</h1>");` |
| 體積顯示好多位小數（例如 113.09733552923255） | 漏咗 `toFixed(2)`，或者 toFixed 寫咗喺 alert 外面冇 assign 返 | `volume.toFixed(2)` 先放喺 alert 字串內：`alert("..." + volume.toFixed(2));` |
| `(2).toFixed(2) + (3.5).toFixed(2)` 結果係 `"2.003.50"` 而唔係 `5.50` | toFixed 後再做加法：`toFixed()` **回傳 string**，再 `+` 會駁字（`"2.00" + "3.50"`） | 先加完數字（`z = x + y`）先 toFixed 做顯示格式 |
| 用咗 `isNaN("")` 檢查空輸入但冇捉到 | `isNaN()` 會先將值轉 number：空字串 `""` → `0`，所以 `isNaN("")` 係 `false` | 想捉空輸入，檢查 `parseInt()` 結果（如 4c）：`parseInt("")` → `NaN` |
| 改完 code 但瀏覽器冇更新 | 瀏覽器 cache 舊版檔案 | 儲存後按 `Ctrl+F5`（hard refresh） |

**快速 debug 流程：** 開頁冇反應 → Chrome 按 `F12` → **Console** tab 睇紅色 error（syntax error、ReferenceError 都會喺度）→ 對住行數返去 Notepad++ 改 → 儲存 → `F5`／`Ctrl+F5` 再試。`alert()` 都得嘅話可以喺 code 入面臨時加 `alert("checkpoint")` 睇程式行到邊。

---

## 5. 📝 測驗常見題型 (Common Test Questions)

**題型 1：定義／分別題（short answer，必背英文句）**
- JavaScript 係咩？→ *JavaScript is a client-side scripting language that runs inside the browser to make web pages interactive.*
- `alert()` vs `prompt()` vs `confirm()`？→ *`alert()` displays a message; `prompt()` asks for input and **returns a string**; `confirm()` asks OK/Cancel and returns true/false.*
- `document.write()` 做咩？→ *It writes the given string (parsed as HTML) into the document.*
- 咩係 event handler？→ *An HTML attribute such as `onClick="..."` that runs JavaScript when an event (e.g. a click) happens.*
- 咩係 pseudo-URL？→ *A URL starting with `javascript:` that executes JavaScript when the link is clicked instead of navigating.*

**題型 2：畀 skeleton 叫你填 function（同 Lab 差唔多，最常見）**
例如畀你 `function circleArea(r) { ... }` 計圓面積 `π r²`，或者 `cylinderVolume()`。答題框架：① 公式寫成 JS：`Math.PI * Math.pow(r, 2)`；② `prompt()` 攞輸入（記住轉 `parseInt`/`parseFloat`）；③ `alert("..." + 答案.toFixed(2))`；④ 呼叫時將變數做 argument 傳入。**原理一樣，換個公式就係新題。**

**題型 3：解釋「點解結果唔啱」陷阱題（Exercise 4a 變奏，超鍾意考）**
畀你 `var z = prompt("a") + prompt("b");`，輸入 2 同 3，問結果係咩、點修正。答：結果係 `"23"`（string concatenation）；因為 `prompt()` returns a string；用 `parseInt()`/`parseFloat()` 轉數字後先加。

**題型 4：NaN / isNaN 定義與結果題**
- `parseInt("abc")`？→ `NaN`；`parseInt("12abc")`？→ `12`（讀到第一個唔係數字嘅字符就停）。
- `isNaN("abc")`？→ `true`；`isNaN("12")`？→ `false`。
- *NaN stands for "Not a Number"* — 當字串第一個字符轉唔到數字時 `parseInt`/`parseFloat` 回傳嘅值。

**題型 5：function 概念題**
- parameter vs argument：*The parameter is the variable named in the function definition (`radius`); the argument is the actual value passed when calling (`r`).*
- `return` 嘅作用：*It returns a value to the caller and immediately exits the function.*
- 點解 function 定義放 `<head>`？→ 確保頁面載入時 function 已存在，撳掣嗰陣先 call 得到。

**題型 6：`toFixed()` 細節題（好易陰人）**
- `(5.5).toFixed(2)` 結果？→ `"5.50"`（**string**，唔係 number）。
- 所以 `z.toFixed(2) + 1` 會係？→ `"5.501"`（string 連接）——要格式化就最後一步先做。

**題型 7：escape sequence / 引號題**
- alert 想顯示兩行，寫 `alert('Line 1\nLine 2');`——`\n` 係 newline；attribute 用雙引號時 JS 字串要用**單引號**，例如 `onClick="alert('Hi');"`。

**題型 8：輸入驗證程式題（Exercise 4c 變奏）**
叫你寫一個 function 保證用家一定要輸入數字先繼續 → `do { var n = parseInt(prompt(...)); if (isNaN(n)) alert("Not a number!"); else return n; } while (true);`，再 call 兩次相加。答題重點：`do...while` 最少執行一次、靠 `return` 跳出、`isNaN` 檢查 `parseInt` 結果。

**題型 9：寫出執行結果題（trace the code）**
畀一段 code 叫你寫 alert 會顯示咩（例如 `alert("Hi " + name + ", you clicked on " + num)` 配 `name="Peter"`、`num=1` → `Hi Peter, you clicked on 1`）。**慢慢由左到右串字，留意 `+` 連接次序。**

**題型 10：HTML + JS 混合填空**
畀起點檔，叫你填：`href="javascript:NumPicker(1)"`、`onClick="alert('...\n...!');"`、`src="one.gif"` 等。檢查位：`javascript:` 有冇漏、括號引號有冇齊、function 名大小階、路徑啱唔啱。

---

## 6. 🔗 理論 recap（詳解）

**五秒總結（5–8 行）：**
1. JavaScript 係 client-side scripting：喺瀏覽器執行，嵌入 HTML 用 `<script>`。
2. `document.write()` 輸出內容；`window.alert()` 彈訊息；`window.prompt()` 攞輸入。
3. 觸發 JavaScript 三種方式：`<script>` 內直接執行、event handler `onClick`、pseudo-URL `javascript:`。
4. `prompt()` 回傳 string → 計數前要用 `parseInt()`/`parseFloat()` 轉數字，否則 `+` 變連接。
5. Function：定義 `function f(p){...}`、呼叫 `f(arg)`；`return` 回傳並結束。
6. 數學：`Math.PI`、`Math.pow(x,3)`；格式化：`toFixed(2)`（回傳 string）。
7. 驗證輸入：`isNaN()` 偵測非數字；`do...while(true)` + `return` 重複問到啱。

| 概念 | 關鍵句（English Key Sentence） | 本 Lab 例子 |
|------|-------------------------------|-------------|
| Script tag | JavaScript is embedded in HTML inside the `<script>` element and executed by the browser. | `<script type="text/javascript"> ... </script>` |
| document.write | `document.write(string)` writes the string, parsed as HTML, into the page. | `document.write("<h1><b><i>...</i></b></h1>");` |
| Dialog boxes | `alert()` shows a message; `prompt()` asks for input and always returns a string. | `prompt("What is your name?", "")` |
| Event handler | An attribute such as `onClick` runs JavaScript when the event fires. | `<input type="button" onClick="alert('...');" />` |
| Pseudo-URL | A link `href="javascript:..."` executes JavaScript instead of navigating. | `<a href="javascript:NumPicker(1)">` |
| Escape sequence | `\n` inside a string creates a new line (HTML tags do not work in alert boxes). | `alert('Line1\nLine2!');` |
| Function | `function f(param){...}` declares; `f(arg)` calls; `return` sends a value back. | `function sphereVolume(radius){...}` / `sphereVolume(r);` |
| Type conversion | `prompt()` returns a string; use `parseInt()`/`parseFloat()` before arithmetic. | `window.parseInt(x) + window.parseFloat(y)` |
| Math object | `Math.PI` is π; `Math.pow(base, exp)` computes base to the power of exp. | `Math.pow(parseInt(radius), 3)` |
| toFixed | `number.toFixed(2)` rounds to 2 decimal places and returns a string. | `volume.toFixed(2)` → `113.10` |
| isNaN | `isNaN(x)` returns true if x is "Not a Number" (cannot be converted). | `if (isNaN(x)) alert("x is not a number!");` |
| do...while | `do {...} while (true);` repeats until a `return`/`break` exits it. | `getNum()` re-asks until a valid number is entered |

**🎯 最後溫提（測驗前睇一次）：** 實測通常係「畀起點檔 + 指定要求」，要你自己補完 function、改 `href`、填 event handler——**大忌**係唔記得 `prompt()` 回傳 string、`toFixed()` 回傳 string、`return` 唔可以喺 top-level 用呢三個陷阱。Section 3 每段完整答案逐行睇熟，再將 Section 2 嘅空格答案（`var name = prompt(...)`、`"Hi " + name + ...`、`volume.toFixed(2)`、`href="javascript:NumPicker(1)"` 等）背到反射咁，實測就穩陣。
