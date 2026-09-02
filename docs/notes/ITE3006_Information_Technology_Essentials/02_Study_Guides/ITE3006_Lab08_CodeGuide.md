# ITE3006 Lab 8：Event-Driven JavaScript（事件驅動程式設計）— 雙語實務 CodeGuide（實務測驗主戰文件）

> 課程：ITE3006 Information Technology Essentials（Web 部分）｜本 Lab 係 **Practical Test / Lab Test 最熱門考法**：畀你一份半完成嘅 form，要你填返 JavaScript event handlers 同驗證函數。唔使記大量語法，最緊要識 **「事件 → handler → return false/true」** 同 **`document` 物件讀寫表單** 呢套流程。

---

## 🔗 理論 recap（開頭速覽，本 Lab 用到的理論）

- **Event-driven programming（事件驅動程式設計）**：程式唔係由上至下跑完就算，而係**等一個事件（event）發生**（例如撳掣、改選單、載入頁面），先至觸發相對應嘅 **event handler（事件處理函數）**。
- 事件 handler 用 **inline attribute** 寫喺 HTML tag 上面：`onSubmit`、`onload`、`onchange`、`onclick`，屬性值就係一段 JavaScript 呼叫。
- 喺 `onSubmit` 入面：**return `false` = 阻止表單提交；return `true` = 允許提交** —— 呢個係本 Lab 最重要嘅一個位。
- 讀取/寫入表單欄位值用 `document` 物件：`document.getElementById("id").value` 或 `document.formName.controlName.value`；`<select>` 用 `.selectedIndex` 同 `.options[index].value`。
- 金額計算要先用 `parseFloat()` 將字串轉數字，輸出再用 `.toFixed(2)` 保留兩位小數，否則會出現 `NaN` 或一堆小數位。
- `.disabled` 令控件唔畀用（灰咗）、`.focus()` 將游標移去某個控件，呢啲都係「令表單更 user-friendly」嘅常用技巧。

> **Core idea:** In *event-driven programming*, your code does not run all at once — it waits for an *event* (click, change, page load, form submit) and then runs the matching *event handler*; returning `false` from an `onSubmit` handler **cancels** the form submission, returning `true` allows it.

---

## 1. 🎯 Lab 目標與環境 (Objectives & Environment)

**Intended Learning Outcome（教材原文）：** Understand event-driven programming using Javascript。

**要掌握的實務技能（Practical Skills to Master）：**

1. 喺 HTML tag 上寫 **inline event handler**：`onSubmit`、`onload`、`onchange`、`onclick`，並正確處理 `return` 值。
2. 用 **`return false` / `return true`** 控制表單可唔可以提交（form submission）——實測必考。
3. 用 **`document` 物件**同 `id` / `name` 讀取同寫入表單控件嘅值（text box、`<select>`、radio button）。
4. 用 **`parseFloat()` + `.toFixed(2)`** 做購物單價格計算，避免 `NaN`。
5. 用 **`.disabled`、`.focus()`、`.selectedIndex`** 控制界面狀態（灰咗、聚焦、讀取選項）。
6. 用 **`alert()`** 向用戶顯示錯誤訊息（validation message）。

**所需工具（Resources Required）：**

| 工具 | 用途 | 英文說明 |
|------|------|---------|
| Notepad++（或 VS Code） | 純文字編輯器寫 HTML + JavaScript | A plain text editor to write HTML and JavaScript |
| Google Chrome / Mozilla Firefox | 開啟 `.html` 檔案測試表單 | A browser to open and test the HTML files |
| Chrome DevTools Console（F12） | 睇 JavaScript error 同 `alert` 行為 | Open the browser console (F12) to see JavaScript errors |
| 瀏覽器「重新整理」 | 每次改完 code 都要刷新先會生效 | Press `F5` after saving every change |

**執行方法：** 喺 Notepad++ 開 `lab08_1.html` / `lab08_2.html` → 填入 JavaScript → `File > Save` → 用 Chrome 開啟 → 測試：按 Submit 睇下有冇被阻止、改 `<select>` 睇下價錢有冇更新 → 有 error 就按 `F12` 睇 Console。

> **Environment tip:** JavaScript runs *client-side* in the browser — you do NOT need a web server; just open the `.html` file directly in Chrome. Any syntax error appears in the Console (press `F12`).

---

## 2. 🛠️ 解題步驟拆解 (Walkthrough)

### Exercise 1 — [lab08_1.html] User Registration Form（註冊表單驗證）

**題目原文（Question）：**

> [lab08_1.html] The following code brings the use of event handlers and provides a simple form that lets a new user register on a site by providing a username, password and password retype. If the username is blank, password and password retype are not the same, we do not want the form to be submitted. Note the use of return types within the event handler — if we don't wish the form to be submitted, we should return `false` to the `onSubmit` event handler. If we want the form to be submitted, we return `true`.

**HTML 結構速覽（先睇清楚先落手）：**

```html
<form onSubmit="return checkFields()">   <!-- 撳 Submit 前，先跑 checkFields() -->
  Username:        <input type="text"     id="tfUser"  />
  Password:        <input type="password" id="tfPwd"   />
  Password Retype: <input type="password" id="tfRPwd"  />
  <input type="submit" value="Submit" />
  <input type="reset"  value="Reset"  />
</form>
```

留意三點：表單用 **`id`（唔係 name）** 定位三個欄位；`<form>` 嘅 `onSubmit` 屬性有寫 **`return`** 字；`type="password"` 嘅 input 顯示做圓點。

**1 ➔ 2 ➔ 3 解法：**

1. **讀取三個欄位嘅值**：用 `document.getElementById("tfUser").value`、`document.getElementById("tfPwd").value`、`document.getElementById("tfRPwd").value`，存入三個 `var`。
   > `document.getElementById("tfUser").value` returns the text the user typed into the text box whose `id` is `"tfUser"`.
2. **逐項驗證，一有問題就 `return false`**：用 `if` 檢查三件事——username 係咪空白、password 係咪空白（可加）、password 同 retype 係咪唔同——每次都用 `alert()` 講畀用戶知錯咩，然後 `return false;` 阻止提交。
   > Use `alert("message")` to tell the user what went wrong, then `return false;` so the form is NOT submitted.
3. **全部通過先 `return true`**：三個檢查都過到，函數最尾 `return true;`，瀏覽器先會真正提交表單。
   > Only when every check passes should the function return `true`, which allows the form to be submitted.

**要點總結：** `onSubmit="return checkFields()"` 入面嗰個 `return` 好關鍵——`checkFields()` 嘅 `false` / `true` 會經 `return` 傳返畀 `onSubmit`，先至可以阻止/允許提交。漏咗寫 `return`，表單永遠照 submit（見 Section 4）。

---

### Exercise 2 — [lab08_2.html] Order Form（購物單動態計價）

**題目原文（Question）：**

> [lab08_2.html] This exercise performs form validation by adding suitable JavaScript statements to an existing form to make it more user-friendly. The form shows a product `<select>` list, a quantity box, two shipping radio buttons, and three result boxes (`sub1`, `sub2`, `total`). Tasks: i. Add an `onload` event handler `startform()` to the `<body>`; ii. Add the function `startform()` which disables the text boxes `sub1`, `sub2`, `total`, disables the radio buttons `shipping`, and puts the cursor focus on the `product` selection; iii. Add `total_price()` to total up the product price and the shipping price; iv. Add `order_price()` to show the price of the selected product in `sub1` — if "Select an item" is chosen, disable the shipping radios and reset the form; v. Add `shipping_price(field)` to show the price of the selected shipping method in `sub2`.

**HTML 結構速覽（form 名叫 `order`）：**

| 控件 | `name` | 要填嘅 event handler | 用途 |
|------|--------|----------------------|------|
| `<select>` | `product` | `onchange="order_price()"`（教材已有） | 揀產品，`option value` = 單價（`20.50` / `30.00`） |
| `<input type="text">` | `qty` | **(a)** `onchange="order_price()"` | 輸入數量 |
| `<input type="text">` | `sub1` | —（由 JS 填，預設 `0.00`） | 產品小計 = 單價 × 數量 |
| `<input type="radio">` × 2 | `shipping` | **(b)** `onclick="shipping_price(0);"` **(c)** `onclick="shipping_price(1);"` | 揀運送方式（`value` = `5.50` / `8.00`） |
| `<input type="text">` | `sub2` | — | 運費 |
| `<input type="text">` | `total` | — | 總數 = `sub1` + `sub2` |

#### 填空題答案（逐個解釋）

**(a) 數量欄 `qty` 要加邊個 event handler？**

> **Answer: `onchange="order_price()"`** — fires whenever the quantity value is changed (and the field loses focus), so the product price in `sub1` is recalculated.

解釋：用戶改完數量，我哋想即刻重計產品小計，所以喺 `<input type="text" name="qty">` 度加 `onchange="order_price()"`。想「打一個字即刻更新」可以改用 `onkeyup`，但 Lab 慣例同 marking 多用 `onchange`——測驗跟題目指定嚟寫。

**(b)、(c) 兩粒 radio 要加邊個 event handler？**

> **Answer:** Standard radio → `onclick="shipping_price(0);"`；Express radio → `onclick="shipping_price(1);"`

解釋：兩粒 radio 嘅 `name` 都係 `shipping`，組成一個 **radio group（選項組）**，瀏覽器用 index（由 0 起）區分佢哋：index 0 = Standard（`value="5.50"`）、index 1 = Express（`value="8.00"`）。`onclick` 將 0 或 1 傳入 `shipping_price(num)`，函數再用 `document.order.shipping[num].value` 攞返嗰粒 radio 嘅 `value`。

> **Radio group rule:** Radio buttons sharing the same `name` form a group; you read the checked one via its *index* in the group, e.g. `document.order.shipping[0].value`.

#### i ➔ v 五個任務逐步拆解

**任務 i — 喺 `<body>` 加 `onload` event handler：**

1. `onload` 事件喺**成個頁面載入完成**時觸發一次。
   > `onload` fires when the page has finished loading.
2. 改 `<body>` tag 成：`<body onload="startform()">`。要直接寫喺 `<body>` 開 tag 度（唔係 `<form>`），因為 `startform()` 要喺成個 form 都 ready 先執行。
   > The `onload` handler is placed on the `<body>` tag so the form exists before `startform()` runs.

**任務 ii — 寫 `startform()`：**

1. **Disable 三個結果 text box**：`document.order.sub1.disabled = true;`（`sub2`、`total` 同理）——唔想用戶自己改個價錢出嚟。
   > Setting `.disabled = true` on a control greys it out and stops the user editing it.
2. **Disable 兩粒 shipping radio**：用 `for` loop 行晒成組：`for (var i = 0; i < document.order.shipping.length; i++) { document.order.shipping[i].disabled = true; }` ——未揀產品之前唔應該揀得運送方式。
3. **Focus 落 `product` 下拉清單**：`document.order.product.focus();`——游標/焦點一開頁就喺產品度，方便用戶即刻揀。
   > `.focus()` moves the cursor / keyboard focus to a control.

**任務 iii — 寫 `total_price()`：**

1. 用 `parseFloat()` 將 `sub1`、`sub2` 嘅**字串值轉做數字**：`var s1 = parseFloat(document.order.sub1.value);`、`var s2 = parseFloat(document.order.sub2.value);`
   > `parseFloat(string)` converts a string such as `"20.50"` into the number `20.5` so it can be used in arithmetic.
2. 相加後寫返入 `total`，用 `.toFixed(2)` 保留兩位小數：`document.order.total.value = (s1 + s2).toFixed(2);`
   > `.toFixed(2)` keeps exactly 2 decimal places for money values (e.g. `30.50`).

**任務 iv — 寫 `order_price()`：**

1. **攞選中產品嘅 index 同 value**：`var index = document.order.product.selectedIndex;`、`var item_value = document.order.product.options[index].value;`
   > `select.selectedIndex` is the position (0, 1, 2…) of the chosen `<option>`; `select.options[index].value` is that option's `value` attribute.
2. **攞數量**：`var qty_ordered = document.order.qty.value;`
3. **如果揀咗「Select an item」（`index == 0`）**：用 loop disable 返 shipping radios、取消已揀嘅 radio（`.checked = false`）、將 `sub1`/`sub2`/`total` 清返做 `"0.00"`、`qty` 清空——即係「reset 表單數值」。
   > When `index == 0` the user has picked the placeholder "Select an item", so disable shipping and clear every result box (reset the form).
4. **否則（揀咗真產品）**：enable 返 shipping radios，計 `sub1 = parseFloat(item_value) * parseFloat(qty_ordered)`，用 `.toFixed(2)` 寫入。
5. **最後呼叫 `total_price();`** 更新總數。
   > Call `total_price()` at the end so the grand total always reflects the latest subtotal.

**任務 v — 寫 `shipping_price(field)`：**

1. 參數 `field`（0 或 1）就係被撳嗰粒 radio 嘅 index；將佢嘅 `value` 寫入 `sub2`：`document.order.sub2.value = document.order.shipping[field].value;`
2. 再呼叫 `total_price();` 更新總數。
   > `shipping_price(field)` reads the chosen radio's `value` (5.50 or 8.00) into `sub2`, then refreshes the total.

**⚠️ 教材 vs 實際檔案小註：** 教材文字寫住 `total_price()` 要合計「product price, tax and shipping price」，但實際 `lab08_2.html` **冇 tax 欄位**——`total = sub1（產品小計）+ sub2（運費）`，以實際 form 為準。如果測驗題目另外叫你加稅（例如 5%），做法係 `var tax = sub1 * 0.05;` 然後 `total = sub1 + tax + sub2`。

---

## 3. 💻 關鍵 HTML/CSS/JS 程式碼

> 以下係完整可交答案。參考原始碼（空白版）位於 `01_Raw_Materials/Code/Topic08/lab/lab08_1.html` 同 `lab08_2.html`。

### 3.1 [lab08_1.html] 完整解答 — checkFields()

```html
<!doctype html>
<html>
<head>
  <script type="text/javascript">
    function checkFields() {
      // 1. 用 getElementById + .value 讀取三個欄位嘅輸入（id 一定要同 HTML 完全一樣）
      var user = document.getElementById("tfUser").value;
      var pwd  = document.getElementById("tfPwd").value;
      var rpwd = document.getElementById("tfRPwd").value;

      // 2a. Username 空白 -> 報錯 + 阻止提交
      if (user == "") {
        alert("Username cannot be blank!");
        return false;   // 唔想表單 submit 就 return false
      }

      // 2b. Password 空白 -> 報錯 + 阻止提交
      if (pwd == "") {
        alert("Password cannot be blank!");
        return false;
      }

      // 2c. 兩次密碼唔一致 -> 報錯 + 阻止提交
      if (pwd != rpwd) {
        alert("Password and retyped password must be the same!");
        return false;
      }

      // 3. 全部檢查通過 -> return true，表單先會被提交
      return true;
    }
  </script>
</head>

<body>
  <!-- onSubmit 一定要寫 "return checkFields()"（連 return），false/true 先會生效 -->
  <form onSubmit="return checkFields()">
    <h2>User Registration Form</h2>
    <p>
      Username: <input type="text"     id="tfUser"  /><br />
      Password: <input type="password" id="tfPwd"   /><br />
      Password Retype: <input type="password" id="tfRPwd" /><br />
      <input type="submit" value="Submit" />
      <input type="reset"  value="Reset"  />
    </p>
  </form>
</body>
</html>
```

**記憶口訣：** 「**alert → return false**」一對出現；最後一條路先 `return true`。

### 3.2 [lab08_2.html] 完整解答 — 要改嘅 HTML 位

```html
<!-- ① 任務 i：body 加 onload，頁面載入即執行 startform() -->
<body onload="startform()">

<form name="order">
  ...
  <!-- ② 揀產品：onchange 觸發 order_price()（教材已有，空白版記得加返） -->
  <select name="product" onchange="order_price();">
    <option value="0">Select an item</option>
    <option value="20.50">GoMap 1.0 ($20.50)</option>
    <option value="30.00">Drive Planner 2.0 ($30.00)</option>
  </select>

  <!-- ③ 填空 (a)：數量改變 -> 重計產品小計 -->
  <input type="text" name="qty" size="3" onchange="order_price()">

  <!-- ④ 填空 (b)(c)：onclick 傳入 radio group 嘅 index（0=Standard, 1=Express） -->
  <input type="radio" name="shipping" value="5.50" onclick="shipping_price(0);"> Standard (3-5 days): $5.50<br>
  <input type="radio" name="shipping" value="8.00" onclick="shipping_price(1);"> Express (2 days): $8.00<br>
  ...
</form>
```

### 3.3 [lab08_2.html] 完整解答 — 四個 JavaScript 函數

```javascript
// 任務 ii：頁面載入後執行一次 —— 鎖死結果欄位，未揀產品唔畀揀運送方式
function startform() {
  // 1. disable 三個結果 text box（用戶唔可以自己改價錢）
  document.order.sub1.disabled = true;
  document.order.sub2.disabled = true;
  document.order.total.disabled = true;

  // 2. disable 成組 shipping radio（用 length + for loop 行晒佢）
  for (var i = 0; i < document.order.shipping.length; i++) {
    document.order.shipping[i].disabled = true;
  }

  // 3. 游標一開始放喺 product 下拉清單
  document.order.product.focus();
}

// 任務 iii：合計總數 = 產品小計(sub1) + 運費(sub2)
function total_price() {
  var s1 = parseFloat(document.order.sub1.value);   // 字串 "20.50" -> 數字 20.5
  var s2 = parseFloat(document.order.sub2.value);   // 字串 "5.50"  -> 數字 5.5
  document.order.total.value = (s1 + s2).toFixed(2); // 相加後保留 2 位小數
}

// 任務 iv：用戶改咗產品/數量就觸發 —— 計產品小計並控制 shipping 狀態
function order_price() {
  // 1. 攞選中 option 嘅 index 同 value
  var index      = document.order.product.selectedIndex;
  var item_value = document.order.product.options[index].value;

  // 2. 攞數量
  var qty_ordered = document.order.qty.value;

  // 3. 揀咗 placeholder "Select an item"（index 0）-> disable 加 reset
  if (index == 0) {
    for (var i = 0; i < document.order.shipping.length; i++) {
      document.order.shipping[i].disabled = true;   // 唔畀揀運送方式
      document.order.shipping[i].checked = false;   // 取消已揀嗰粒
    }
    document.order.sub1.value   = "0.00";           // 清返三個結果欄
    document.order.sub2.value   = "0.00";
    document.order.total.value  = "0.00";
    document.order.qty.value    = "";               // 清數量
    document.order.product.focus();                 // 焦點返去產品
    return;                                          // 做埋就收工，唔使計價
  }

  // 4. 揀咗真產品 -> enable shipping radios
  for (var i = 0; i < document.order.shipping.length; i++) {
    document.order.shipping[i].disabled = false;
  }

  // 5. 產品小計 = 單價 × 數量（兩個都要 parseFloat 先乘得）
  var price = parseFloat(item_value);   // "20.50" -> 20.5
  var qty   = parseFloat(qty_ordered);  // "3"     -> 3
  document.order.sub1.value = (price * qty).toFixed(2);  // 61.50

  // 6. 更新總數
  total_price();
}

// 任務 v：用戶撳 shipping radio 就觸發 —— 將揀中嘅運費寫入 sub2
function shipping_price(field) {
  // field = radio group 入面嘅 index（0 = Standard $5.50, 1 = Express $8.00）
  document.order.sub2.value = document.order.shipping[field].value;
  total_price();   // 更新總數
}
```

**執行流程圖（寫 code 前喺腦入面行一次）：**

```
頁面載入 ── onload ──> startform(): 鎖死 sub1/sub2/total + shipping，focus product
用戶揀產品 ── onchange ──> order_price(): 計 sub1，enable shipping
用戶輸入數量 ── onchange ──> order_price(): 重計 sub1
用戶揀 shipping ── onclick ──> shipping_price(0/1): 填 sub2
（每次最後都 total_price(): total = sub1 + sub2）
```

---

## 4. 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| 表單**照 submit**，username 空白都提交到 | `onSubmit` 寫漏咗 `return`，例如寫 `onSubmit="checkFields()"` | 改成 `onSubmit="return checkFields()"`——`false` 先會經 `return` 傳返去阻止提交 |
| `checkFields is not defined`（Console 報錯） | Function 名打錯大細階／拼錯；或者 `<script>` 寫咗喺 `</body>` 之後／漏咗 `</script>` | JavaScript 係 case-sensitive，核對 `function checkFields()` 同呼叫名稱；script 要放 `<head>` 或 `<body>` 內並正確閉合 |
| 攞唔到輸入值（`null`） | `getElementById("tfUser")` 嘅 id 同 HTML 唔一致（例如打錯 `tfuser`） | id 大小階同內容要 100% 相同：`id="tfUser"` ↔ `"tfUser"` |
| `total` 顯示 `NaN` | 直接用字串運算或 `parseFloat` 一個空白欄位：`parseFloat("")` = `NaN` | 每個數值都 `parseFloat()`；如 `qty` 可能空白，先檢查 `if (document.order.qty.value == "")` 再當 1 或 0 |
| 金額變 `20.5000000001`（一堆小數） | 冇用 `.toFixed(2)`，浮點數誤差 | 寫入前 `(s1 + s2).toFixed(2)`，保證兩位小數 |
| 撳 radio 冇反應／`sub2` 唔更新 | Radio 個 `onclick` 冇寫參數，或寫咗 `shipping_price()` 而唔係 `shipping_price(0)` | `onclick="shipping_price(0);"` / `"shipping_price(1);"`，參數對應 group index |
| `document.order.shipping.value` 攞唔到預期值 | Radio group 有兩粒，淨用 `.value` 會攞第一粒／undefined | 用 `document.order.shipping[field].value`（field = 被撳嗰粒嘅 index） |
| 揀咗「Select an item」但 shipping 仲揀得 | `order_price()` 入面 `index == 0` 分支漏咗 disable radio | 喺 `if (index == 0)` 內用 loop 將 `shipping[i].disabled = true`（同 `checked = false`） |
| `sub1` 係空白都計到數 | 未輸入數量就觸發 `onchange` | 喺 `order_price()` 檢查 `qty` 空白：報 `alert("Please enter a quantity")` 或當做 1 |
| 改完 code 刷新都係舊效果 | 冇儲存檔案，或瀏覽器 cache 舊版 | 先 `Ctrl+S` 儲存，再 `F5`；仍然舊就用 `Ctrl+F5` hard refresh |
| `startform()` 冇執行（結果欄冇灰） | `onload` 寫錯位（寫咗喺 `<form>` 度）或拼錯 | 一定要 `<body onload="startform()">`；check Console 有冇 `startform is not defined` |
| `<option>` 冇閉合 / tag 打錯 | 抄教材時斷咗行 | `<option value="30.00">Drive Planner 2.0 ($30.00)</option>` 要齊開閉 tag |
| `sub1`/`sub2`/`total` 用咗 `id` 但 JS 用 `document.order.xxx` | 呢個 form 靠 **`name`** 存取（`document.formName.controlName`） | 兩個 form 例子定位方法唔同：lab08_1 用 `getElementById`（id），lab08_2 用 `document.order.xxx`（name），唔好溝亂 |
| 打錯 operator：`=` 當咗 `==` | `if (user = "")` 係 assignment，唔係比較 | 比較用 `==`（或嚴格比較 `===`）：`if (user == "")` |

**Debug 三步曲：** ① 按 `F12` 開 Console，紅色字就係 JS error（會話你邊行）；② 喺函數第一行加 `alert("checkFields called");` 睇下個 handler 有冇被觸發；③ 逐個檢查「事件 attribute 有冇寫啱、`return` 有冇漏、name/id 有冇打錯」。

> **Golden rule:** No `return` → the form always submits. Wrong `name`/`id` → JavaScript finds `null`. Missing `parseFloat` → `NaN` on screen.

---

## 5. 📝 測驗常見題型 (Common Test Questions)

### 題型 1：寫 inline event handler（最常考）
**問法例子：** Add the `onload` handler `startform()` to the `<body>`；/ Add an event handler to the quantity text box so that `order_price()` runs when it changes。

**答題要點：**
- 位置一定要啱：`onload` → `<body>` tag；`onchange` → `<select>` / 數量 input；`onclick` → radio/button；`onSubmit` → `<form>` tag。
- `onSubmit` 要寫 `return` 字（`onSubmit="return checkFields()"`）；其他 handler 可以直接呼叫。
- Radio group 傳 index：`onclick="shipping_price(0);"`。

### 題型 2：填空完成驗證函數（如 lab08_1 嘅 checkFields）
**問法例子：** Fill in the blanks so that the form is NOT submitted when the username is blank or the two passwords do not match。

**答題要點：**
- 讀值：`document.getElementById("tfXxx").value`（有 id）或 `document.形式名.控件名.value`（有 name）。
- 格式：`if (條件) { alert("..."); return false; }`，最後 `return true;`。
- 空白測試用 `== ""`；唔等如用 `!=`。

### 題型 3：填空完成計價函數（lab08_2 類）
**問法例子：** Write `order_price()` / `shipping_price(field)` / `total_price()`。

**答題要點：**
- `<select>` 讀法口訣：`selectedIndex` → `options[index].value`。
- 金額三步曲：`parseFloat(...)` 轉數字 → 運算 → `.toFixed(2)` 先寫入 `.value`。
- 最後記得 call `total_price();`（除非 marking 淨係叫你計一樣）。
- Disable/enable radio group 用 `for` + `document.order.shipping.length`；淨係改一粒就 `shipping[0].disabled`。

### 題型 4：理論問答（Written Test 常出）
**問法例子：** What is event-driven programming? / Why do we write `return false` in the `onSubmit` handler?

**答題要點（背熟英文句）：**
> **Event-driven programming:** the program reacts to events (user actions or browser events); each event is handled by an event handler function attached to an HTML element.
> **`return false` in `onSubmit`:** it tells the browser NOT to submit the form (validation failed); `return true` allows submission. Without the `return` keyword, the returned value is ignored and the form always submits.
> **`onload`:** fires after the page (and its elements) has finished loading — used to initialise the form.
> **`onchange`:** fires when a control's value changes (and it loses focus) — used to recalculate the order.
> **`onclick`:** fires when the element is clicked — used for radio buttons and buttons.

### 題型 5：改錯題（Debug 題）
**問法例子：** The form is still submitted even though the username is empty — find and fix the error。

**答題要點：** 先諗三寶：① `return` 有冇漏；② handler 名同 function 名一唔一致；③ `id`/`name` 有冇打錯。逐個 `if` 檢查有冇 `return false;`。

### 題型 6：JS 基礎概念延伸
**問法例子：** 點解要 `parseFloat`？`toFixed(2)` 做咩？`disabled` 同 `focus()` 有咩用？

**答題要點：** `.value` 攞出嚟永遠係 **string**，`"20.50" + "3"` 會變 `"20.503"`（字串接埋）——所以要用 `parseFloat()` 轉數字先乘得；`toFixed(2)` 控制輸出小數位；`disabled = true` 令控件唯讀灰咗；`focus()` 將游標移去控件。

**✅ 交 Lab 前自我驗證清單：**
- [ ] lab08_1：Username 留空按 Submit → 彈 alert 且**頁面冇跳轉**；兩次密碼唔同 → 彈 alert 唔提交；全部啱 → 先會提交。
- [ ] lab08_2：開頁即 `sub1`/`sub2`/`total` 灰咗、shipping 灰咗、焦點喺 product。
- [ ] 揀 GoMap + 數量 3 → `sub1` = `61.50`，shipping 變返可用。
- [ ] 揀 Express → `sub2` = `8.00`，`total` = `69.50`。
- [ ] 揀返「Select an item」→ 全部清 `0.00`、shipping 再灰返。
- [ ] Console（F12）冇紅色 error。

---

*本 CodeGuide 依據教材 `ITE3006_Lab08.txt` 及原始碼 `01_Raw_Materials/Code/Topic08/lab/lab08_1.html`、`lab08_2.html` 整理，供 ITE3006 Web 實務測驗溫習用。*
