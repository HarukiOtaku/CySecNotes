# ITE3006 Topic 9 — Form Validation 雙語並行・應考導向學習指南

> 課程：ITE3006 Information Technology Essentials ｜ 主題：Client-side Form Validation and Processing
> 本指南採用「香港繁體中文解說 + 英文標準定義」雙語並行格式；所有 HTML tags、CSS properties、JavaScript 語法及專有名詞均保留英文原文。

---

## 1. 📝 課程概要與實務情境 (Summary & Real-world Context)

本課題核心是「**表單驗證（Form Validation）**」：當使用者喺網頁表單輸入資料，瀏覽器（browser）應該喺資料送往伺服器之前，先做一輪基本檢查，確保格式正確。教材指出驗證工作分成兩層——部分 **business-specific（業務特定）的規則只能喺伺服器端（server side）做**，但**基本驗證（basic validation）可以喺瀏覽器端（client side）用 HTML5 內建功能或者 JavaScript 完成**。HTML5 提供一套完整嘅表單驗證機制，主要靠 `<input>` 標籤嘅三個屬性推動：`required`（必填）、`type`（格式類型）、`pattern`（正規表示法格式）。除此之外，課題亦涵蓋點樣用 JavaScript 經 DOM（Document Object Model）讀取表單內各控制項（text box、radio button、checkbox、`<select>` drop-down list）嘅值，再進行程式邏輯驗證。

> **English Standard Definition:** "Client-side form validation is the checking of user input performed in the web browser before the data is sent to the server; basic checks such as required fields, email/URL/number formats and pattern matching can be done with HTML5 attributes or JavaScript, while business-specific rules that require database or server logic can only be applied on the server side."

實務情境一：你幫一間公司寫「會員註冊頁」。若果冇 client-side validation，使用者打錯 email 格式或者漏填必填欄，資料一 submit 就去到伺服器先至彈錯誤，浪費網絡流量同伺服器資源，而且回應慢、體驗差。加入 `required`、`type="email"`、`pattern` 之後，瀏覽器會即時（real-time）提示「This field is required」或格式錯誤，使用者未離開頁面已經知道錯喺邊。

> **English Standard Definition:** "With client-side validation, the browser checks the input instantly and shows error messages before submission, which improves user experience and reduces unnecessary server requests."

實務情境二：開發「會員資料修改頁」時，你要用 JavaScript 喺 submit 前檢查密碼長度、確認兩次密碼一致，或者統計使用者揀咗幾多項興趣（checkbox）。呢啲都要靠 DOM 存取——例如 `document.f1.password.value`、`document.f1.music[0].checked`——先攞到控制項嘅實際值再做判斷。學識呢課嘅 DOM 存取技巧，就係寫「互動式表單」嘅基本功。

---

## 2. 🎯 考試學習目標 (Learning Objectives)

考官會測試以下核心能力（附英文對照）：

- **分辨 client-side 同 server-side validation 嘅分工與界線** — Explain the difference between client-side and server-side validation and state which validation rules can only be done on the server.
- **解釋 HTML5 `<input>` 驗證屬性嘅作用** — Describe how the `required`, `type` and `pattern` attributes of the `<input>` tag enable built-in browser validation.
- **理解 `type` 屬性嘅格式檢查規則** — State what the browser checks for a valid e-mail address (`type="email"`) and a valid web address (`type="url"`).
- **讀寫正規表示法（Regular Expression）** — Read and construct regular expressions using anchors (`^`, `$`), metacharacters (`.`, `*`, `+`, `?`), quantifiers (`{m,n}`), alternation (`|`) and character classes (`[a-z]`, `[^...]`, `\d`, `\D`).
- **解釋 `title` 屬性點樣提供自訂驗證訊息** — Explain how the `title` attribute displays a tooltip message when validation fails.
- **講解 `<form>` 嘅三大屬性** — Explain the purpose of the `name`, `method` (GET/POST) and `action` attributes of the `<form>` tag.
- **用 DOM 存取表單及其元素** — Access a form (`document.f1`) and its elements (`document.f1.name1`, `document.getElementById(...)`) with JavaScript.
- **讀取各類控制項嘅值** — Retrieve the value/checked state of text boxes, text areas, radio button groups, checkbox groups and `<select>` options (including `selectedIndex`, `options[index].value/.text`).
- **用 JavaScript 動態改變 HTML 元素** — Change an element's `src`, `value`, `innerHTML` and CSS styles (`style.backgroundColor`) through `document.getElementById()`.

---

## 3. 📖 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 點解需要表單驗證：Client-side 與 Server-side 嘅分工

HTML form 嘅用途係收集資料，等 web server 處理。教材開宗明義指出：**部分 validation rules 屬於 business specific，只能喺 server side 應用**（例如檢查信用卡號碼係咪真實、戶口有冇重複註冊——呢啲需要資料庫或商業邏輯）；**但同時，部分基本驗證任務好容易喺 browser 上用 HTML5 features 或者 JavaScript 完成**（例如必填、email 格式、數字範圍）。

> **English Standard Definition:** "An HTML input form is expected to collect data that the web server will process. Some validation rules are business specific and can only be applied on the server side, but at the same time certain basic validation tasks can be easily done on the browser using HTML5 features or JavaScript."

HTML5 包含一套穩固嘅表單驗證機制（a solid form validation mechanism），由 `<input>` 嘅三個屬性驅動：

| 屬性 | 作用 |
|------|------|
| `required` | 欄位必填，唔填就唔准 submit |
| `type` | 指定輸入格式（email / url / number），browser 自動檢查 |
| `pattern` | 用 regular expression 規定欄位可接受嘅格式 |

> **English Standard Definition:** "HTML5 includes a solid form validation mechanism powered by the `<input>` attributes: `required`, `type` and `pattern`."

**考試重點：** 答題時要識分「邊啲驗證放 client side（快速回應、慳 server 資源）」同「邊啲必須放 server side（business-specific、需要伺服器資料）」。

---

### 3.2 `required` 屬性 — 強制必填

**機制解說：** 只要喺表單欄位加上 `required` 屬性，browser 就會要求使用者必須喺該欄位輸入資料，先至可以提交（submit）表單；否則瀏覽器會阻擋提交並顯示錯誤提示。

> **English Standard Definition:** "By adding the `required` attribute to a form field, the browser requires the user to enter data into that field before submitting the form."

**教材例子（HTML）：**

```html
<label>First Name *</label><br />
<input type="text" required="required" /><br /><br />
<fieldset>
  <legend>Gender *</legend>
  <input type="radio" name="gender" value="M" required="required" /> Male
  <input type="radio" name="gender" value="F" /> Female
</fieldset>
<br />
<input type="checkbox" required="required" />
<label>* I agree to terms of service.</label><br />
```

**拆解要點：**
- Text box：`<input type="text" required="required" />` — 冇輸入文字就唔准 submit。
- Radio buttons：成組（group）只要**其中一個被選中**，就當成已滿足 `required`（因為佢哋共用同一個 `name="gender"`）。
- Checkbox：「同意條款」類嘅 checkbox 加 `required`，代表**必須剔選**先可以提交。
- 書寫上 `required` 或 `required="required"` 都有效，教材使用後者。

> **English Standard Definition:** "The `required` attribute can be applied to text boxes, radio button groups and checkboxes; for a radio group it is satisfied when any one button of the group is checked."

---

### 3.3 `type` 屬性 — HTML5 內建格式驗證

**機制解說：** 透過設定 `type` 屬性，HTML5 表單輸入可以自動驗證 **email 地址、網站 URL 同數字**。使用者輸入後若格式不符，browser 會阻止提交並提示錯誤。

> **English Standard Definition:** "By using the `type` attribute, HTML5 form input can be used to validate an email address, a website URL and a number."

```html
<input type="email" />
<input type="url" />
<input type="number" min="1" max="10" />
```

**Browser 實際檢查規則（必背）：**
- **Email 地址有效**：browser 會檢查有冇 `@` 字元、有冇句點（period `.`），**而且 email 唔允許有空格**（not allowing spaces）。
- **Web 地址有效**：browser 會檢查有冇**協定（protocol，即 `http://`）**以及 URL 中嘅**句點（`.`）**。
- **Number**：配合 `min` 同 `max` 屬性限制數字範圍（例如 `min="1" max="10"` 即只接受 1 至 10）。

> **English Standard Definition:** "To ensure a valid e-mail address, the browser checks for an `@` character or a period (`.`) and does not allow spaces in the e-mail. To ensure a valid web address, the browser checks for the protocol (e.g. `http://`) and periods (`.`) in the URL."

**考試重點：** 「email 有冇空格」「URL 要唔要有 protocol」呢啲細節好常出 MCQ（multiple choice），記實兩個檢查清單。

---

### 3.4 `pattern` 屬性 — 以 Regular Expression 規定格式

**機制解說：** `pattern` 屬性嘅值係一段「正規表示法」（regular expression），即一種**格式（format）**描述。Browser 會將欄位輸入值同呢個 pattern 比對，符合先准提交；唔符合就顯示錯誤並通知使用者。

> **English Standard Definition:** "The `pattern` attribute specifies a format, in the form of a regular expression, that the field value is checked against. By passing a regular expression as the value for the pattern attribute, we can decide what value is acceptable by the form field and also inform the user of errors."

**語法（Syntax）：**

```html
<input type="text" pattern="[regular expression]" />
```

**教材核心例子：**

```
^[A-Za-z]{10}$
```

呢個 pattern 嘅意思：字串**必須由 10 個英文字母組成**（大小寫均可，`A-Za-z`），而且由頭到尾冇其他字元（`^` 同 `$` 前後鎖定）。例如 `abcdefghij` 合格，`abc123` 唔合格。

> **English Standard Definition:** "The regular expression `^[A-Za-z]{10}$` matches a string that starts with exactly ten English letters (A-Z or a-z) and contains nothing else."

---

### 3.5 正規表示法（Regular Expression）全面拆解

教材指正規表示法（「正規表示法」= Regular Expression）由 **3 大部分**組成——**anchors 定位字元（`^` `$`）、quantifiers 數量字元（`*` `+` `?` `{m,n}`）同 character classes / metacharacters 字元類別與特殊字元（`.` `[ ]` `|` `\` 等）**，以下逐個拆解。

> **English Standard Definition:** "A regular expression (「正規表示法」) is a pattern that describes a set of strings; it is composed of anchors, quantifiers and character classes."

#### (a) 定位字元 Anchors — `^` 與 `$`

| 字元 | 繁中解說 | 英文定義 |
|------|----------|----------|
| `^` | 寫喺 `pattern` **第一個位置**時，表示其後嘅符號**必須出現喺字串開頭**（start of the string）。 | "`^` matches the position at the start of the string." |
| `$` | 寫喺 `pattern` **最後一個位置**時，表示其前嘅符號**必須出現喺字串尾端**（end of the string）。 | "`$` matches the position at the end of the string." |

#### (b) 單一字元與數量字元 Metacharacters — `.` `*` `+` `?`

| 字元 | 繁中解說 | 英文定義 | 等同寫法 |
|------|----------|----------|----------|
| `.` | 表示**一個任意字元**（任何單一字元都得）。 | "`.` matches any single character." | — |
| `*` | 表示字串中有 **0 至無數個**其前一符號。 | "`*` matches zero or more occurrences of the preceding character." | Same as `{0,}` |
| `+` | 表示字串中有 **1 至無數個**其前一符號。 | "`+` matches one or more occurrences of the preceding character." | Same as `{1,}` |
| `?` | 表示字串中有 **0 至 1 個**其前一符號（可有可無）。 | "`?` matches zero or one occurrence of the preceding character." | Same as `{0,1}` |

**教材簡化題（Simplify the regular expressions）——必考換算：**

| 完整寫法 | 簡化寫法 |
|----------|----------|
| `x{0,1}` | `x?` |
| `x{0,}` | `x*` |
| `x{1,}` | `x+` |
| `A(1\|2\|3\|4)B` | `A[1-4]B` |

> **English Standard Definition:** "The quantifiers `?`, `*` and `+` are simplified forms of `{0,1}`, `{0,}` and `{1,}` respectively, and an alternation such as `(1|2|3|4)` can be simplified to the character class `[1-4]`."

#### (c) 花括號數量 {m,n}

| 寫法 | 繁中解說 | 英文定義 |
|------|----------|----------|
| `{m,n}` | 表示前一符號喺字串中有 **m 至 n 個**嘅數量。 | "`{m,n}` matches between m and n occurrences of the preceding character." |
| `{n,}` | 表示前一符號喺字串中有 **n 個至無數多個**嘅重覆次數。 | "`{n,}` matches n or more occurrences of the preceding character." |
| `{n}` | 表示前一符號喺字串中**啱啱好重覆 n 次**。 | "`{n}` matches exactly n occurrences of the preceding character." |

例：`a{3,4}` 接受 `aaa`、`aaaa`；`a{3,}` 接受三個或以上 `a`；`a{3}` 只接受啱啱好 `aaa`。

#### (d) 或（Alternation）與字元類別（Character Classes）

| 寫法 | 繁中解說 | 英文定義 |
|------|----------|----------|
| `|` | 表示「或」——字串含有 `|` 之前字串**或**之後字串嘅內容都得。 | "`|` means alternation (OR): the string matches the content before or after the `|`." |
| `[xyz]` | 表示字串含有括號中**任一個字元**即可。 | "`[xyz]` matches a single character that is any one of the characters inside the brackets." |
| `-` | 喺方括號內用嚟表示**一組連續字元**，例如 `[a-z]`、`[0-9]`。 | "A hyphen `-` inside brackets defines a range of consecutive characters, e.g. `[a-z]` or `[0-9]`." |
| `[^xyz]` | 表示字串**唔含有**括號中任何一個字元。 | "`[^xyz]` matches a single character that is NOT any of the characters inside the brackets." |

例：`[0-9]{2}` 表示兩個數字（例如 `42`）；`[^0-9]{2}` 表示兩個**都唔係數字**嘅字元。

#### (e) 轉義（Escaping）與縮寫字元類別

**機制解說：** 因為 `.` `*` `+` 等符號喺 regex 中有特殊意義，若果你想比對**字面上**嘅 `.` 或 `*`，就要用反斜線 `\` 做**轉義（escaping）**，將佢後面嘅字元當做一般字元處理。

> **English Standard Definition:** "The backslash `\` indicates escaping: it treats the character that follows it as a literal (ordinary) character; for example, to match a `*` character literally, we must write `\*`."

| 寫法 | 繁中解說 | 英文定義 |
|------|----------|----------|
| `\.` | 比對字面上嘅句點 `.`（唔係「任意字元」）。 | "`\.` matches a literal dot character." |
| `\*` | 比對字面上嘅星號 `*`。 | "`\*` matches a literal asterisk character." |
| `\+` | 比對字面上嘅加號 `+`。 | "`\+` matches a literal plus character." |
| `\d` | 代表任何一個 **0 至 9 嘅數字**，可寫成 `[0-9]`。 | "`\d` matches any digit from 0 to 9; it is equivalent to `[0-9]`." |
| `\D` | 代表任何一個**非數字**字元，等同 `[^0-9]`。 | "`\D` matches any non-digit character; it is equivalent to `[^0-9]`." |

**教材特別註記：** 部分教材/工具（如 Java、POSIX regex）中 `&&` 表示**兩個字元類別嘅交集（intersection of two classes）**——例如 `[a-z&&[^aeiou]]` 即係「a 至 z 但排除五個元音」。呢點喺教材 Examples 部分出現，屬於延伸知識。

> **English Standard Definition:** "In some regular expression dialects, `&&` means the intersection of two character classes."

#### (f) 綜合例子（教材 Examples 精神）

- `^[A-Za-z]{10}$` — 啱啱好 10 個英文字母。
- `[0-9]{2}`（= `\d{2}`）— 連續兩個數字。
- `[^0-9]{2}`（= `\D{2}`）— 連續兩個非數字字元。
- `A[1-4]B` — 形式係「A + 1 至 4 其中一個數字 + B」，例如 `A3B`。
- 想比對「3.14」呢類含小數點字串，pattern 中嘅句點要寫成 `\.`。

**實用工具（Tools To Study Regular Expressions）——教材推薦：**
- **regexper.com**：將 regular expression 顯示為**圖表（diagram）**，方便視覺化理解。
- **debuggex.com**：顯示**測試字串有幾多部分符合**條 regular expression。

> **English Standard Definition:** "regexper.com shows a regular expression as a diagram, and debuggex.com shows how much of your test string matches the regular expression."

---

### 3.6 `title` 屬性 — 自訂驗證訊息（Tooltip）

**機制解說：** `title` 屬性用嚟指明元素嘅「額外資訊」。呢啲資訊最常見嘅顯示方式係 **tooltip text（浮動提示）**——當滑鼠移過元素時出現；喺表單驗證情境中，**當驗證失敗（validation fails）時**，`title` 嘅文字亦會作為**自訂驗證訊息（customized validation message）**顯示俾使用者睇。

> **English Standard Definition:** "The `title` attribute specifies extra information about an element. The information is most often shown as a tooltip text when the mouse moves over the element, or when the validation fails."

```html
<!-- title 文字喺 hover 或驗證失敗時以 tooltip 顯示 -->
<input type="text" pattern="[0-9]{8}"
       title="Please enter a valid 8-digit phone number." />
```

**考試重點：** 想「自訂瀏覽器彈出嘅驗證錯誤訊息」，就係靠 `title` 屬性提供嘅文字，而唔係 browser 預設嘅英文訊息。

---

### 3.7 `<form>` 標籤嘅三大屬性：`name`、`method`、`action`

**機制解說：** Form（`<form>`）係 HTML 語言中最有用嘅功能之一，用嚟做**資料輸入**。`<form>` 標籤包含三個屬性，各司其職：

| 屬性 | 作用（繁中） | 英文定義 |
|------|--------------|----------|
| `name` | 只係表單嘅**名稱**。唔改名都可以用表單，但若要**方便同 JavaScript 配合使用**，就要為表單命名。 | "`name` is simply a name for the form. You can use forms without giving them names, but you'll need to assign a name to a form in order to easily use it with JavaScript." |
| `method` | 係 **GET 或者 POST** 其中一種——即資料**送去伺服器嘅兩種方法**。 | "`method` is either GET or POST; these are the two ways the data can be sent to the server." |
| `action` | 係提交表單時**資料會被送去嘅伺服器端程式**（例如 PHP）。 | "`action` is the server-side script (e.g. PHP) that the form data will be sent to when submitted." |

**教材例子：**

```html
<form name="f1" method="post" action="order.php">
```

**重要補充（必背）：** 如果表單**只喺 client side 用 JavaScript 處理**（例如一個互動遊戲，唔需要交資料俾伺服器），就**唔需要 `method` 同 `action` 屬性**。

> **English Standard Definition:** "For a form that will be processed on the client-side by JavaScript only (such as an interactive game), the `method` and `action` attributes are not needed."

---

### 3.8 用 DOM 存取表單與元素（Accessing Form Elements）

#### (a) 喺 Chrome Console 執行 JavaScript

**機制解說：** 開發時可以撳 **`F12`** 開啟 **Developer Tools（開發者工具）**，喺入面嘅 **Console** 直接輸入並執行 JavaScript 語句，方便即時測試。

> **English Standard Definition:** "Press `F12` to open Developer Tools, where JavaScript can be typed and run directly in the browser's Console."

#### (b) Form Object — `document.f1`

**機制解說：** HTML 入面每個 form 喺 **DOM（Document Object Model）** 中都表示為一個 **form object**，而呢個 object 嘅名稱**同 `<form>` 標籤嘅 `name` 屬性一致**。存取表單最簡單嘅方法就係 `document.f1`；表單內每個元素可以靠佢自己嘅 `name` 去引用，即 `document.f1.name1`。

> **English Standard Definition:** "Each form in HTML is represented in the DOM by a form object, which has the same name as the `name` attribute in the `<form>` tag; the simplest way to access the form is `document.f1`, and each element inside it is referred to by its own name, e.g. `document.f1.name1`."

```html
<form name="f1">
  <input type="text" name="name1" />
  <input type="submit" value="Submit" />
</form>
```

```javascript
document.f1;           // 存取整個 form
document.f1.name1;     // 存取表單內 name="name1" 嘅元素
```

**考試重點：** DOM 存取語法係「階層式」：`document` → form name → element name → 屬性（property，如 `.value`、`.checked`）。

---

### 3.9 各類控制項逐一拆解（Text Box、Text Area、Radio、Checkbox、Select）

#### (a) Text Box 與 Text Area — 讀寫 `.value`

**機制解說：** 假設 form `f1` 有一個 text box `tb1` 同一個 text area `ta1`。要讀取或者**設定**佢哋嘅內容，就用 `.value` property。

> **English Standard Definition:** "The `.value` property of a text box or text area holds its current content, and it can be read or assigned in JavaScript."

```html
<form name="f1">
  <input type="text" name="tb1" value="hello" />
  <textarea name="ta1" rows="3" cols="10">Hello</textarea>
</form>
```

```javascript
document.f1.tb1.value = "peter";            // 將 text box 內容改為 "peter"
document.f1.ta1.value = "Goodbye my friend!";  // 將 text area 內容改為新文字
```

**拆解：** `<textarea>` 嘅初始內容寫喺開始/結束標籤之間（`<textarea ...>Hello</textarea>`），而 text box 嘅初始內容用 `value="hello"` 屬性；喺 JavaScript 兩者統一用 `.value` 存取。

#### (b) Radio Buttons — 群組（Group）與 `.checked`

**機制解說：** Radio buttons 以**群組**形式存在，**每組只可以揀一個**（only one button can be checked in each group），用嚟做單選題（multiple-choice）輸入。群組內所有 radio button 嘅 `name` 屬性**必須相同**；`value` 屬性就係**提交俾伺服器端程式（如 PHP）嘅值**，用嚟標明揀咗邊一個。

> **English Standard Definition:** "Radio buttons exist in groups and only one button can be checked in each group; they are used for multiple-choice input. The `name` attribute is the same for the group, and the `value` attribute is the value passed to a server-side program (e.g. PHP) indicating which radio button is selected."

```html
<form name="f1">
  <input type="radio" name="gender" value="M" checked /> Male
  <input type="radio" name="gender" value="F" /> Female
</form>
```

```javascript
document.write(document.f1.gender[0].value);   // 輸出 "M"
document.f1.gender[1].checked = true;          // 程式上選中第二個 (Female)
```

**拆解：** 每個 radio button 會被當作**陣列 `gender` 嘅一個元素**：`gender[0]` 係 Male、`gender[1]` 係 Female。`gender[1].checked = true` 就係用 JavaScript 將 Female 設定為被選中。教材例子中用 `checked` 屬性令 Male 預設被選中。

#### (c) Checkboxes — 切換選取狀態

**機制解說：** Checkbox 睇落似一個細框框；**click 一下就喺 checked 同 unchecked 狀態之間切換**，適合表示 Yes/No 選擇。同 radio 一樣，同組 checkbox 共用相同 `name`；`value` 係提交俾伺服器端程式嘅值，表示**邊啲 checkbox 被選取**（可以同時揀多個）。

> **English Standard Definition:** "A check box looks like a small box; clicking on it switches between the checked and unchecked states, which is useful for indicating Yes or No choices. Each checkbox is treated as an element in the array named by the group, e.g. `document.f1.music[0]`."

```html
<form name="f1">
  <input type="checkbox" name="music" value="rock" /> Rock
  <input type="checkbox" name="music" value="jazz" /> Jazz
  <input type="checkbox" name="music" value="pop" checked /> Pop
</form>
```

```javascript
document.write(document.f1.music[0].value);   // 輸出 "rock"
if (document.f1.music[2].checked) alert("Pop!");  // 若 Pop 被剔選就彈出 "Pop!"
```

**拆解：** `music[0]`、`music[1]`、`music[2]` 分別對應 Rock、Jazz、Pop。`music[2].checked` 回傳 `true`（因為 HTML 有 `checked` 預設剔選）或 `false`，用 `if` 判斷即可。

**Radio vs Checkbox 對比（常考）：**

| 比較點 | Radio Button | Checkbox |
|--------|--------------|----------|
| 選取規則 | 每組**只可揀一個** | 每個**獨立切換**，可揀多個 |
| 用途 | Multiple-choice（單選） | Yes/No、多選 |
| 程式判斷 | `.checked`（group 中只有一個係 true） | 逐個 `.checked` 檢查 |

#### (d) Selection Lists（`<select>` / `<option>`）

**機制解說：** `<select>` HTML 標籤用嚟定義**selection list（選擇清單）**，亦即 **drop-down list（下拉式清單）**；入面每個選項用 `<option>` 定義，可用 `selected` 指定預設選項。若果喺 `<select>` 加 `multiple` 屬性，就**容許揀選多個項目**。

> **English Standard Definition:** "The `<select>` HTML tag is used to define a selection list, or a drop-down list; the `multiple` attribute of the `<select>` tag allows multiple items to be selected."

```html
<select name="myselect">
  <option value="choice1" selected>First choice</option>
  <option value="choice2">Second choice</option>
  <option value="choice3">Third choice</option>
</select>

<!-- 容許多選 -->
<select name="select1" multiple>
  <option value="choice1" selected>First choice</option>
  <option value="choice2">Second choice</option>
  <option value="choice3">Third choice</option>
</select>
```

**讀取被選中選項（Example 1）——兩步曲（two-step process）：** 先以 `selectedIndex` property 攞到被選中項目嘅**索引（index）**，再用 `options[index]` 配合 `.value`（被選選項嘅值）同 `.text`（被選選項顯示嘅文字）攞資料。

> **English Standard Definition:** "To read the selected item, first use the `selectedIndex` property to get its index, then use the `value` property to find the value of the selected choice and the `text` property to find its displayed text."

```javascript
var index = document.f1.myselect.selectedIndex;   // 步驟 1：被選項目嘅索引
var value = document.f1.myselect.options[index].value;  // 步驟 2a：值
var content = document.f1.myselect.options[index].text; // 步驟 2b：顯示文字
```

**教材驗算（必懂）：** 若果 `index = 1`（即揀咗第二個 option），結果係：

```
value = choice2
text  = Second choice
```

**統計多選清單揀咗幾多項（Example 2）：** 用 `options.length` 攞選項總數，然後用 loop 逐個檢查每個 option 嘅 `.selected` property，係 `true` 就計數加一。

> **English Standard Definition:** "The `length` property of the `options` array gives the total number of options, and each option's `selected` property is `true` if that option has been chosen."

```javascript
var numberSelected = 0;
var len = document.f1.select1.options.length;
for (var i = 0; i < len; i++) {
    if (document.f1.select1.options[i].selected)
        numberSelected++;
}
// 執行後 numberSelected 就係被選中嘅項目數目
```

**`<select>` 相關 properties 總結：**

| Property | 意思 |
|----------|------|
| `selectedIndex` | 被選中 option 嘅索引（0-based，由 0 開始數） |
| `options[index].value` | 第 index 個 option 嘅 `value` 屬性值 |
| `options[index].text` | 第 index 個 option 顯示喺頁面嘅文字 |
| `options[index].selected` | 第 index 個 option 有冇被選中（true/false） |
| `options.length` | 選項總數 |

---

### 3.10 直接存取 HTML 元素：`document.getElementById()`

**機制解說：** 要讀取或者設定某個 HTML 元素（tag）嘅 properties，首先要用 JavaScript **攞到個元素**。有多個 JavaScript methods 可以直接存取 HTML 元素，但**最流行嘅方法係 `document.getElementById()`**。注意：**成個 HTML 文件入面，同一個 id 值只可以有一個元素**——即係 **id 必須唯一（unique）**。

> **English Standard Definition:** "There are several JavaScript methods that can be used to access an HTML element directly, but the most popular method is `document.getElementById()`. There can be ONLY ONE element with a certain id value, i.e. the element with that id should be unique in the HTML document."

#### getElementById() 例子 1 — 改圖片同讀文字框

```html
<img src="home1.gif" id="pic1" name="pic1" />
<form>
  Name: <input type="text" id="name" />
</form>
```

```javascript
// 將圖片 pic1 嘅來源檔改為 "apple.jpg"
document.getElementById("pic1").src = "apple.jpg";

// 顯示文字框 "name" 嘅值
alert(document.getElementById("name").value);
```

**拆解：** `document.getElementById("pic1").src` 對應 HTML 中 `<img>` 嘅 `src` 屬性；`getElementById("name").value` 讀取 text box 內容。id 用引號包住傳入，回傳嗰個獨一無二嘅元素 object，然後就可以點住佢啲 properties。

#### getElementById() 例子 2 — `innerHTML` 與 CSS 樣式

```html
<body>
  <div id="info" style="background-color: red;">Info</div>
  <script type="text/javascript">
    var myElement = document.getElementById('info');
    alert(myElement.innerHTML);          // 讀取 div 內嘅 HTML 內容 → 彈出 "Info"
    myElement.style.backgroundColor = "yellow";  // 將背景色改為黃色
  </script>
</body>
```

**兩個必背規則：**
1. **`innerHTML`**：攞到元素內包含嘅 HTML 內容（例如 div 內嘅文字或子標籤），可讀可寫。
2. **CSS property 喺 JavaScript 嘅命名規則（camelCase）：** 將原本 CSS 屬性名嘅**連字號 `-` 刪走，並將後面每個單詞嘅第一個字母大寫**。

> **English Standard Definition:** "To change or read any CSS property in JavaScript, remove the hyphen `-` from the original CSS property name (e.g. `background-color`) and capitalize each word that follows, giving the camelCase form `backgroundColor`."

| CSS 屬性（HTML/CSS 寫法） | JavaScript 寫法 |
|---------------------------|-----------------|
| `background-color` | `style.backgroundColor` |
| `font-size` | `style.fontSize` |
| `margin-left` | `style.marginLeft` |

**對照總結（存取方式比較，常考）：**

| 存取方法 | 語法 | 特色 |
|----------|------|------|
| Form object | `document.f1` | 要 form 有 `name`；最簡單 |
| Form 內元素 | `document.f1.name1` | 元素靠 `name` 引用 |
| Direct access | `document.getElementById("id")` | 唔使理 form；id 必須全頁唯一 |

---

### 3.11 本課題實用開發工具一覽

| 工具 | 用途 |
|------|------|
| Chrome Developer Tools（`F12`） | 喺 Console 直接執行 JavaScript 測試 |
| regexper.com | 將 regular expression 畫成 diagram，方便理解結構 |
| debuggex.com | 顯示測試字串有幾多部分符合條 regular expression |

---

## 4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|-------------------|------------------|----------------------------------------|
| client-side validation | 喺瀏覽器（browser）內、資料送出前做嘅驗證 | "Client-side validation is performed in the browser before the form data is sent to the server, giving instant feedback to the user." |
| server-side validation | 喺網頁伺服器收到資料後做嘅驗證 | "Server-side validation is performed by the web server after submission; business-specific rules can only be applied on the server side." |
| required attribute | 令欄位必填嘅 HTML5 屬性 | "The `required` attribute makes a form field mandatory; the browser refuses to submit the form until data is entered." |
| type attribute (`type="email"`) | 令 browser 自動檢查 email 格式 | "With `type="email"`, the browser checks for an `@` character and a period, and does not allow spaces in the e-mail address." |
| type attribute (`type="url"`) | 令 browser 自動檢查網址格式 | "With `type="url"`, the browser checks for the protocol, such as `http://`, and periods in the URL." |
| type attribute (`type="number"`) | 限制數字輸入，可配合 `min` / `max` | "The `number` type validates numeric input, and the `min` and `max` attributes set the allowed range." |
| pattern attribute | 以 regular expression 規定欄位格式 | "The `pattern` attribute specifies a format, in the form of a regular expression, that the field value is checked against." |
| regular expression（正規表示法） | 描述字串格式嘅規則，由 anchors、quantifiers 同 character classes 組成 | "A regular expression is a pattern that defines the acceptable format of a string." |
| anchor `^` | 鎖定「字串開頭」位置 | "`^` written at the first position of a pattern means the following symbol must appear at the start of the string." |
| anchor `$` | 鎖定「字串結尾」位置 | "`$` written at the last position of a pattern means the preceding symbol must appear at the end of the string." |
| metacharacter `.` | 代表任何一個字元 | "`.` matches any single character." |
| quantifier `*` | 前一符號出現 0 次至無限次 | "`*` matches zero or more occurrences of the preceding character; it is the same as `{0,}`." |
| quantifier `+` | 前一符號出現 1 次至無限次 | "`+` matches one or more occurrences of the preceding character; it is the same as `{1,}`." |
| quantifier `?` | 前一符號出現 0 或 1 次 | "`?` matches zero or one occurrence of the preceding character; it is the same as `{0,1}`." |
| quantifier `{m,n}` | 前一符號出現 m 至 n 次 | "`{m,n}` means the preceding symbol appears between m and n times in the string." |
| alternation `|` | 「或」：符合前後任何一邊都得 | "The `|` character means OR: the string contains the content before the `|` or the content after it." |
| character class `[xyz]` | 括號內任何一個字元都算符合 | "`[xyz]` matches a string containing any one of the characters inside the brackets." |
| range `[a-z]`, `[0-9]` | 用 `-` 表示連續字元範圍 | "A hyphen is used inside brackets to denote a range of consecutive characters, such as `[a-z]` or `[0-9]`." |
| negation `[^xyz]` | 唔含有括號內任何字元先符合 | "`[^xyz]` matches a string that does NOT contain any character inside the brackets." |
| escaping `\` | 將特殊符號當做一般字元 | "The backslash `\` escapes a metacharacter so it is treated as a literal character, e.g. `\.` matches a dot." |
| `\d` / `\D` | 數字 / 非數字縮寫 | "`\d` matches a digit and is equivalent to `[0-9]`; `\D` matches any non-digit and is equivalent to `[^0-9]`." |
| title attribute | 元素額外資訊，hover 或驗證失敗時顯示 tooltip | "The `title` attribute specifies extra information shown as a tooltip when the mouse moves over the element or when validation fails." |
| `<form>` `name` attribute | 俾表單一個名，方便 JavaScript 引用 | "The `name` attribute names the form so it can be easily accessed from JavaScript, e.g. `document.f1`." |
| `<form>` `method` attribute | GET/POST：資料送去伺服器嘅方法 | "The `method` attribute is either GET or POST; these are the two ways the data can be sent to the server." |
| `<form>` `action` attribute | 表單提交後送去嘅伺服器程式 | "The `action` attribute specifies the server-side script, such as a PHP file, that the form data is sent to when submitted." |
| form object / `document.f1` | DOM 中代表表單嘅物件 | "Each form is represented in the DOM by a form object with the same name as the form's `name` attribute; it is accessed with `document.f1`." |
| `.value` property | 文字欄/文字區域嘅內容 | "The `.value` property is used to read or set the content of a text box or a text area." |
| radio button group | 同名 radio 嘅群組，只能揀一個 | "Radio buttons with the same `name` form a group, and only one button in each group can be checked at a time." |
| `.checked` property | 控制項有冇被選中（true/false） | "The `.checked` property indicates whether a radio button or checkbox is selected; setting it to `true` selects the control." |
| checkbox | 可獨立切換選取狀態嘅方框 | "A checkbox switches between the checked and unchecked states when clicked, and each checkbox of a group is accessed as an element of an array." |
| `<select>` / `<option>` | 下拉式選擇清單同佢嘅選項 | "The `<select>` tag defines a drop-down list and each `<option>` inside it defines one choice." |
| `multiple` attribute | 容許喺清單中揀多項 | "The `multiple` attribute of the `<select>` tag allows more than one option to be selected." |
| `selectedIndex` | 被選中選項嘅索引（由 0 數起） | "The `selectedIndex` property returns the index of the currently selected option, starting from zero." |
| `options[index].value` / `.text` | 選項嘅值 / 顯示文字 | "`options[index].value` gives the value of the selected choice and `options[index].text` gives its displayed text." |
| `options.length` / `.selected` | 選項總數 / 個別選項有冇被揀 | "The loop checks `options[i].selected` for every option up to `options.length` to count how many are selected." |
| `document.getElementById()` | 直接以唯一 id 攞元素 | "`document.getElementById()` returns the element whose `id` attribute matches; the id must be unique in the document." |
| `innerHTML` | 元素內部嘅 HTML 內容 | "The `innerHTML` property reads or replaces the HTML content inside an element." |
| camelCase CSS style | JS 中 CSS 屬性嘅命名方式 | "To change a CSS property with JavaScript, remove the hyphen and capitalize the next word, e.g. `background-color` becomes `style.backgroundColor`." |

---

## 5. 🗺️ 循序漸進學習路線 (Learning Path)

### 階段 1：先理解觀念（Concepts First）
1. 明白 **client-side vs server-side validation** 嘅分工——邊啲規則只可以喺 server 做（business-specific），邊啲基本檢查可以喺 browser 做。
2. 理解 HTML5 內建驗證係靠 `<input>` 嘅 **`required` / `type` / `pattern`** 三個屬性驅動。
3. 明白 `<form>` 嘅 **`name` / `method` / `action`** 三個屬性各自做咩，以及「純 client-side 表單唔需要 method 同 action」。
4. 理解 DOM 階層：`document` → form → element → property。

### 階段 2：背誦英文短語（Memorise Key Phrases）
- "The browser requires the user to enter data into that field before submitting the form."（`required`）
- "The browser checks for an `@` character or a period and does not allow spaces."（email）
- "The pattern attribute specifies a format, in the form of a regular expression."（`pattern`）
- "Only one button can be checked in each group."（radio group）
- "The id should be unique in the HTML document."（`getElementById`）
- "Remove the hyphen `-` and capitalize each word."（CSS → JS camelCase）

### 階段 3：掌握寫法/實作（Hands-on Mastery）
- 寫一個含 `required` 嘅 text box、radio group、checkbox 表單。
- 寫 `type="email"`、`type="url"`、`type="number" min="1" max="10"` 並解釋 browser 檢查咩。
- 用 `pattern` 配 `title` 自訂驗證訊息（例如 `^[A-Za-z]{10}$`）。
- 喺 Chrome Console（`F12`）練習：`document.f1.tb1.value`、`document.f1.gender[1].checked = true`、`document.f1.music[2].checked`。
- 練習 `<select>` 兩步曲：`selectedIndex` → `options[index].value` / `.text`；再寫 `multiple` 版本用 loop 數 `numberSelected`。
- 用 `document.getElementById()` 改 `src`、讀 `.value`、寫 `innerHTML`、改 `style.backgroundColor`。
- 用 regexper.com / debuggex.com 驗證自己寫嘅 regular expression。

### 階段 4：能解答嘅英文考題（Exam-ready Questions）
- **Short answer:** "State TWO differences between client-side and server-side validation."
- **Explanation:** "Explain how the `required` attribute works when applied to a group of radio buttons."
- **MCQ:** 「`type="email"` 嘅 browser 會檢查啲咩？」→ 答案含 `@`、period、no spaces。
- **Regex:** 「`^[0-9]{3}$` 接受以下邊個輸入？」／「`a{0,1}` 簡化後係咩？」→ `a?`
- **Trace/Output:** 俾 `index = 1`，問 `value` 同 `text` 嘅結果 → `choice2` / `Second choice`。
- **Code reading:** `document.getElementById("pic1").src = "apple.jpg";` 做咩？→ 改圖片來源。
- **Naming rule:** 「CSS 嘅 `background-color` 喺 JavaScript 度要點寫？」→ `style.backgroundColor`。

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 6.1 HTML5 驗證屬性速記表

| 屬性 | 作用 | 關鍵英文短語 |
|------|------|--------------|
| `required` | 必填 | "The field must be filled in before submitting." |
| `type="email"` | 檢查 `@`、period、唔准空格 | "Checks for `@`, a period, and no spaces." |
| `type="url"` | 檢查 protocol（`http://`）同 period | "Checks for the protocol and periods." |
| `type="number"` + `min`/`max` | 數字範圍 | "Limits the numeric range." |
| `pattern="[regex]"` | 規定格式 | "Specifies the acceptable format as a regular expression." |
| `title` | hover / 驗證失敗時顯示 tooltip（自訂訊息） | "Shown as a tooltip on hover or when validation fails." |

### 6.2 Regular Expression 極速記憶表（必背）

| 符號 | 意思 | 口訣（繁中） |
|------|------|--------------|
| `^` | 開頭 | 「^ 打頭陣，跟住嗰個字要喺最前」 |
| `$` | 結尾 | 「$ 押尾，前面嗰個字要喺最後」 |
| `.` | 任意 1 字元 | 「一點即一個，乜都得」 |
| `*` | 0 至無限（`{0,}`） | 「星號有冇都得，多多益善」 |
| `+` | 1 至無限（`{1,}`） | 「加號至少一個」 |
| `?` | 0 或 1（`{0,1}`） | 「問號可有可無，最多一個」 |
| `{m,n}` / `{n,}` / `{n}` | m 至 n 次 / 至少 n 次 / 啱啱好 n 次 | 「花括號數次數」 |
| `|` | 或（OR） | 「一條直線兩邊揀」 |
| `[a-z]` | 範圍內任何一個 | 「方括號內任揀一」 |
| `[^xyz]` | **唔**含括號內任何一個 | 「^ 入方括號 = 反面教材」 |
| `\d` = `[0-9]`；`\D` = `[^0-9]` | 數字 / 非數字 | 「細 d 係 digit（數字）」 |
| `\.` `\*` `\+` | 字面上嘅點、星、加 | 「反斜線 = 解除魔法（escape）」 |

**三句口訣總括：**
- 數量口訣：「**? 一個可冇、* 任意多、+ 最少一個**」。
- 換算口訣：「**{0,1}→?、{0,}→*、{1,}→+**」；「**`(1|2|3|4)` → `[1-4]`**」。
- 格式例：`^[A-Za-z]{10}$` = 「**開頭結尾夾住 10 個英文字母**」。

### 6.3 DOM / JavaScript 存取速記表

| 想攞/做啲咩 | 語法 |
|-------------|------|
| 存取成個 form | `document.f1` |
| 存取 form 內元素 | `document.f1.name1` |
| 文字框 / 文字區內容（讀寫） | `document.f1.tb1.value` |
| Radio 揀第二個 | `document.f1.gender[1].checked = true;` |
| 檢查 Checkbox 有冇揀 | `if (document.f1.music[2].checked) { ... }` |
| 讀取 select 被選選項 | `document.f1.myselect.options[document.f1.myselect.selectedIndex].value`（兩步曲） |
| 數 select 揀咗幾多項 | loop `options[i].selected`，範圍 `options.length` |
| 直接攞元素（id 要唯一） | `document.getElementById("pic1")` |
| 改圖片來源 | `document.getElementById("pic1").src = "apple.jpg";` |
| 讀元素內容 | `myElement.innerHTML` |
| 改 CSS（刪 `-`、後字大寫） | `myElement.style.backgroundColor = "yellow";` |

### 6.4 最容易失分位（考官陷阱）

1. **`required` 喺 radio group**：只要 group 內有一個被揀就通過——唔係每個 radio 都要填。
2. **`email` 檢查**：重點係 `@`、period、**唔准空格**；`url` 檢查係 protocol（`http://`）同 period——兩者檢查清單唔好混淆。
3. **`{n}` vs `{n,}`**：`{3}` 係啱啱好 3 次；`{3,}` 係至少 3 次。
4. **`[^0-9]` vs `\D`**：兩者相同（非數字）；`\d` 先至係數字。
5. **純 client-side 表單**（例如遊戲）**唔需要 `method` 同 `action`**。
6. **`getElementById` 嘅 id 必須全頁唯一**；CSS 屬性名轉 JavaScript 要 **camelCase**（`background-color` → `backgroundColor`），唔好照抄連字號。
7. **`selectedIndex` 由 0 開始數**——`index = 1` 代表第二個 option（`value = "choice2"`、`text = "Second choice"`）。
