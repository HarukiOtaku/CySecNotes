# ITE3006 Information Technology Essentials — Topic 3: Form Input Elements 雙語應考學習指南（Bilingual & Exam-Ready Study Guide）

> **課程（Course）**：ITE3006 Information Technology Essentials
> **主題（Topic）**：Topic 3 — Form Input Elements（HTML 表單與各種輸入元素）
> **教材來源（Source）**：`_ite3006_extract/ITE3006_L3_FormInput.txt`（SLIDE 1–20，共 20 頁投影片）
> **語言策略（Language Policy）**：機制與邏輯用香港繁體中文解說；每個核心定義均附「> 英文標準定義句」（English Standard Definition）；所有 HTML 標籤、屬性、JavaScript 語法一律保留英文原文，方便你直接以英文作答。

---

## 📝 1. 課程概要與實務情境 (Summary & Real-world Context)

呢一堂係成個網頁開發課程嘅核心之一：教你點樣用 HTML 嘅 `<form>` 元素去「收集用戶輸入」（collect user input）。無論係註冊帳戶、登入、上載相片、填問卷定係落單購物，背後嘅原理都係一樣——用 `<form>` 包住一堆「form elements」（表單元素），例如 `<input>`、`<select>`、`<textarea>` 同 `<button>`，再按唔同嘅 `type` attribute 去決定每個欄位收咩類型嘅資料：文字、密碼、單選、複選、檔案、隱藏資料，以至 HTML5 新增嘅顏色、日期、數字、電郵等專用輸入類型。最後靠 `action`、`method`、`enctype` 呢啲 `<form>` 屬性決定啲資料送去邊、點樣送。

實務上，呢啲知識日日都用得到。舉例：你去開發一個「會員註冊頁」，需要性別欄位（radio button，同一個 `name` 嘅 group 只可以揀一個）、語言偏好（checkbox，可以揀多個，用 `name="lang[]"` 令伺服器收到一個陣列）、以及「上載大頭相」（`<input type="file">`，必須配 `method="post"` 同 `enctype="multipart/form-data"` 先會成功上傳）。另一個常見場景係「搜尋框 + 自動完成」：用 `<datalist>` 提供預設選項，或者用 `<output>` 加 `oninput` 事件做即時計算（例如購物車數量乘單價自動計總數），呢啲都係本堂會覆蓋嘅機制。明白每個 type 嘅行為差異（例如 `radio` 同 `checkbox` 點解唔可以調轉用、`disabled` 欄位嘅資料點解唔會被提交），就係考官最鍾意測試嘅判斷力。

---

## 🎯 2. 考試學習目標 (Learning Objectives)

完成本主題後，你應該有能力（考官會測試嘅核心能力，附英文對照）：

1. **解釋 `<form>` 嘅用途**，並列舉 HTML form 可以包含嘅 form elements 類別。
   - *Explain the purpose of the `<form>` element and list the form elements that an HTML form can contain.*
2. **分辨並正確選用 `<input>` 嘅 `type` attribute 值**（text、password、radio、checkbox、file、submit、reset、button、image、hidden），並講出每個類型嘅特性。
   - *Distinguish the input types and choose the correct `type` attribute value for each data-collection need, describing the behaviour of each type.*
3. **解釋 `<form>` 屬性 `action`、`method`、`enctype`、`name`**，特別係 GET 同 POST 嘅分別，以及 file upload 點解一定要 POST + `multipart/form-data`。
   - *Explain the form attributes action, method, enctype and name, especially the difference between GET and POST and why file upload requires POST with multipart/form-data.*
4. **運用 `<select>` + `<option>` 建立下拉清單**，包括 `multiple`、`size` 同 `<optgroup>` 分組。
   - *Build dropdown lists with `<select>` and `<option>`, including multiple selection, the size attribute and grouping with `<optgroup>`.*
5. **用 `<fieldset>`、`<legend>`、`<label>` 提升表單結構同無障礙性（accessibility）**，解釋 `for` 屬性嘅綁定原理。
   - *Use fieldset, legend and label to structure forms and improve accessibility, explaining how the for attribute binds a label to an input.*
6. **設定各類表單元素嘅預設值**（`checked`、`selected`、`value`、`<textarea>` 內容），並解釋 `name`、`value`、`readonly`、`disabled`、`size`、`maxlength` 等通用屬性，特別係 disabled 欄位唔會被提交。
   - *Set default values for form elements and explain the common input attributes, especially that data in a disabled field is not submitted.*
7. **認識 HTML5 新增 input types**（color、date/time 系列、number、range、tel、email、url、search），並知道佢哋各自嘅用途、格式要求同瀏覽器行為。
   - *Recognise the HTML5 new input types and know their purposes, format requirements and browser-dependent behaviour.*
8. **使用 `<datalist>` 提供自動完成（autocomplete）選項**，以及用 `<output>` 配合 `oninput` 顯示計算結果。
   - *Use the datalist element to provide autocomplete options and the output element with the oninput event to display calculation results.*

---

## 📖 3. 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 HTML Form 概覽：`<form>` 元素與 form elements（SLIDE 1）

一個 HTML form 嘅存在目的只有一個：**收集用戶輸入**，再交畀伺服器或者 JavaScript 處理。`<form>` 就係包住成個表單嘅容器元素；入面嘅所有輸入組件統稱 form elements，教材將佢哋分成四類標籤：

- `<input>` — 最常用嘅輸入元素，靠 `type` attribute 決定形態（text、password、radio、checkbox、file、submit、reset、button、image、hidden）
- `<select>` 同 `<option>` — 下拉清單（dropdown list）
- `<textarea>` — 多行文字輸入區
- `<button>` — 可㩒嘅按鈕（通常配合 JavaScript）

> **English Standard Definition — form**："HTML forms are used to collect user input. The `<form>` element defines an HTML form."

> **English Standard Definition — form elements**："An HTML form contains form elements, which can be grouped into the following tags: `<input>`, `<select>` and `<option>`, `<textarea>`, and `<button>`."

> **Exam Answer Phrase**："A form is the part of a web page that collects user input. The `<form>` element wraps form elements such as `<input>`, `<select>`, `<textarea>` and `<button>`."

*（教材對應：SLIDE 1）*

---

### 3.2 基本 `<input>` 類型（一）：text、password、radio（SLIDE 3）

#### 3.2.1 `type="text"` — 單行文字輸入框

最常見嘅輸入欄位，用戶可以輸入一行文字，例如用戶名稱。屬性 `name` 係欄位嘅識別名稱，提交後伺服器靠佢認得呢個欄位。

```html
Name: <input type="text" name="username" />
```

> **English Standard Definition — text**："The `type="text"` attribute defines a single-line text field that a user can enter text into."

#### 3.2.2 `type="password"` — 密碼欄位（字元被遮蔽）

同 text 幾乎一樣，但用戶輸入嘅字元會以圓點或星號顯示（masked），防止旁人睇到密碼。注意：呢個只係顯示層面嘅遮蔽，傳去伺服器時仍然係明文，加密要靠 HTTPS。

```html
Password: <input type="password" name="password" />
```

> **English Standard Definition — password**："The `type="password"` attribute defines a password field, in which the characters are masked."

#### 3.2.3 `type="radio"` — 單選按鈕（同一 group 只可以揀一個）

Radio button 用喺「多選一」嘅情況。關鍵機制係：**擁有同一個 `name` 嘅 radio buttons 屬於同一個 group**，瀏覽器保證 group 入面任何時刻只可以有一個被選中。教材特別提醒兩點：

1. 選中咗之後，**再㩒多次都唔會取消（cannot "uncheck"）**——即係一旦揀咗，就冇辦法靠再㩒去取消選擇；
2. 必須畀 `value`，因為提交嘅就係被選中嗰個 radio 嘅 `value`（例如 `M` 或 `F`）。

```html
Gender:
<input type="radio" name="gender" value="M" checked="checked" /> Male
<input type="radio" name="gender" value="F" /> Female
```

> **English Standard Definition — radio**："Radio buttons let a user select only one of the choices; you cannot 'uncheck' a radio button from a group of radio buttons with the same name."

> **Exam Answer Phrase**："To make radio buttons mutually exclusive, they must share the same `name` attribute; only one option in the group can be selected at a time, and a selected radio button cannot be unchecked by clicking it again."

*（教材對應：SLIDE 3）*

---

### 3.3 基本 `<input>` 類型（二）：checkbox、file、hidden（SLIDE 4）

#### 3.3.1 `type="checkbox"` — 複選框（可以揀多個）

Checkbox 用喺「多選多」嘅情況（例如語言能力）。同 radio 唔同，用戶可以同時剔選多個 checkbox。提交時，每個被剔選嘅 checkbox 都會帶住自己嘅 `value` 送出。

一個重要技巧：如果要令伺服器端（例如 PHP）收到一個**陣列**而唔係多個同名獨立變數，可以將所有 checkbox 嘅 `name` 設成「陣列式」名稱 `name="lang[]"`——個 `[]` 就係陣列記號。

```html
<input type="checkbox" name="L1" value="Cantonese" checked="checked" /> Cantonese
<input type="checkbox" name="L2" value="English" /> English

<!-- 陣列式命名寫法 -->
<input type="checkbox" name="lang[]" value="Cantonese" checked="checked" /> Cantonese
<input type="checkbox" name="lang[]" value="English" /> English
```

> **English Standard Definition — checkbox**："Checkboxes let a user select one or more options. Also, you can set an 'array-like' name (for example `name="lang[]"`) for all checkboxes so that the server receives the selected values as an array."

#### 3.3.2 `type="file"` — 檔案選擇欄位（上載檔案用）

會顯示成一個檔案選擇欄位或者「Browse...」按鈕，等用戶喺自己電腦揀檔案上載。教材強調：**淨係用 `type="file"` 唔夠**，個 `<form>` 仲要同時設定 `method="post"` 同 `enctype="multipart/form-data"`，檔案先會正確傳送上伺服器（原因喺 3.4 詳細講）。

```html
Submit a recent photo: <input type="file" name="photo" />
```

> **English Standard Definition — file**："The `type="file"` attribute defines a file-select field or a 'Browse...' button for file upload. To upload a file, you also need to set `method="post"` and `enctype="multipart/form-data"` in the `<form>` element."

#### 3.3.3 `type="hidden"` — 隱藏欄位（用戶睇唔到）

定義一個用戶睇唔到嘅欄位，但佢仍然會隨表單提交，常用嚟攜帶唔想畀用戶改、但又需要送去伺服器嘅資料（例如頁面來源、session token）。呢啲值並唔係真係秘密，因為可以喺瀏覽器 Developer Tools 度睇到；教材亦指出個值**可以畀 JavaScript code 改動**（例如提交前動態寫入某個狀態）。

```html
<input type="hidden" name="city" value="Hong Kong" />
```

> **English Standard Definition — hidden**："The `type="hidden"` attribute defines a hidden field which is not visible to a user, and its value can be changed by JavaScript code if necessary."

> **Exam Answer Phrase**："A hidden field stores data that is submitted with the form but is not shown to the user; its value can be updated by JavaScript before submission."

*（教材對應：SLIDE 4）*

---

### 3.4 動作類 `<input>` 類型：submit、reset、button、image（SLIDE 5）

呢四個 type 都係「按鈕類」，但各有完全唔同嘅職責——呢個係高頻考點。

#### 3.4.1 `type="submit"` — 提交按鈕（送出表單資料）

㩒落去就會**將成個 form 嘅資料送出**（按 `action` 指向嘅地址同 `method` 指定嘅方法）。可以用 `<input type="submit">` 或者語意上更清晰嘅 `<button type="submit">` 寫法。

```html
<input type="submit" value="Send Form" />
<button type="submit">Send Form</button>
```

> **English Standard Definition — submit**："The submit button is used to send out the form data."

#### 3.4.2 `type="reset"` — 重設按鈕（還原所有欄位）

㩒落去會將表單內**所有欄位回復到佢哋嘅預設值**（default values，即 HTML 入面寫死嘅 `value` / `checked` / `selected` 等），而唔係清空晒。注意：reset 唔會送出資料。

```html
<input type="reset" value="Clear Form" />
<button type="reset">Clear Form</button>
```

> **English Standard Definition — reset**："The reset button can reset all form values to their default values."

#### 3.4.3 `type="button"` — 普通按鈕（觸發 JavaScript）

冇內建行為，主要用途係**㩒落去執行 JavaScript code**，通常透過 `onclick` 事件處理器（event handler）綁定。

```html
<input type="button" value="I Need Help" onclick="alert('Call hotline 22338899 for help');" />
<button type="button" onclick="alert('Call hotline 22338899 for help');">I Need Help</button>
```

> **English Standard Definition — button**："The button type defines a clickable button used to trigger the execution of JavaScript code, usually through the `onclick` event handler."

#### 3.4.4 `type="image"` — 圖片提交按鈕

用一張圖片（`src` 指定圖檔位置）代替 submit 按鈕——㩒落去同樣會**提交表單**。教材指出佢對 **server-side image map**（伺服器端圖像地圖）特別有用：瀏覽器會連埋你㩒落圖片嘅坐標（x、y）一齊提交，伺服器可以根據坐標判斷用戶㩒咗邊個區域。

```html
<input type="image" name="save" src="images/icon.gif" />
```

> **English Standard Definition — image**："The `type="image"` attribute defines an image as the submit button; it is useful for a server-side image map."

> **Exam Answer Phrase**："`type="image"` creates a graphical submit button; when clicked, the form is submitted together with the coordinates of the click, which is useful for server-side image maps."

*（教材對應：SLIDE 5）*

---

### 3.5 `<form>` 元素嘅屬性：action、method、enctype、name（SLIDE 6）

一個完整嘅 form 通常係咁寫：

```html
<form method="post" enctype="multipart/form-data" action="read_data.php" name="register_form">
  <!-- form elements 放喺度 -->
  <input type="submit" value="Send Form" />
</form>
```

#### 3.5.1 `action` — 提交目的地

指定表單資料送去邊個網址（URL）。如果唔寫，瀏覽器預設提交返去當前頁面。

```html
<form action="read_data.php">
```

> **English Standard Definition — action**："The `action` attribute specifies an address (URL) where to submit the form."

#### 3.5.2 `method` — 提交方式：GET vs POST

`method` 指定提交時用邊種 HTTP method，只有兩個值：

- **`get`**（如果冇寫 `method`，呢個就係**預設值**）：表單資料會以 `?` 做分隔符號**附加喺 action 嘅 URI 後面**（即變成 URL query string），再將成條 URI 送去伺服器。例子：`read_data.php?username=Peter&city=HK`。特性：資料會出現喺網址列、可以被書籤收藏、適合唔敏感嘅查詢資料，但長度有限制。
- **`post`**：表單資料會放入**請求嘅 body（訊息主體）**入面送去伺服器。特性：網址列唔會見到資料、冇長度限制、適合提交敏感或大量資料。

```html
<!-- GET：資料以 ? 附加到 URL -->
<form action="search.php" method="get">
<!-- POST：資料放入 request body -->
<form action="read_data.php" method="post">
```

> **English Standard Definition — method**："The `method` attribute specifies the HTTP method used when submitting the form. Possible values are `get` and `post`. `get` is the default value if the attribute is not specified."

> **English Standard Definition — get vs post**："With GET, the form data are appended to the action URI with a '?' as separator, and the resulting URI is sent to the server. With POST, the form data are included in the body of the request and sent to the server."

> **Exam Answer Phrase**："The main difference is that GET appends the form data to the URL after a '?', while POST sends the data in the body of the HTTP request, which is more secure for sensitive data and has no length limit."

#### 3.5.3 `enctype` — 提交資料嘅編碼方式

`enctype`（encoding type）指定提交資料用邊種編碼。兩個可能值：

- **`application/x-www-form-urlencoded`**：如果冇寫 `enctype`，呢個就係**預設值**——表單資料會做 URL encoding（空格變 `+`、特殊字元變成 `%XX` 等）。
- **`multipart/form-data`**：**一定要用喺 `<input type="file">` 嘅表單**，因為二進制檔案冇辦法用普通 URL encoding 傳送。

> **English Standard Definition — enctype**："The `enctype` attribute specifies the encoding of the submitted data. The default value, used when the attribute is not specified, is `application/x-www-form-urlencoded`; `multipart/form-data` is required for forms containing `<input type="file">` elements."

> **Exam Answer Phrase**："A form that uploads a file must use `method="post"` together with `enctype="multipart/form-data"`, because binary file data cannot be transmitted with the default URL-encoded format."

#### 3.5.4 `name` — 表單名稱（畀 JavaScript 認得個 form）

用嚟識別成個 form，主要目的係**畀 JavaScript 攞返個 form 元素**（例如 `document.forms["register_form"]` 或者 `form name 直接做參考`），方便做前端驗證或動態處理。

> **English Standard Definition — form name**："The `name` attribute specifies a name used to identify the form, mainly for retrieving the form elements by JavaScript."

**快速記法（對照表）：**

| 屬性 | 作用 | 預設值 | 考試關鍵字 |
| --- | --- | --- | --- |
| `action` | 提交去邊個 URL | 當前頁面 | destination / address |
| `method` | HTTP 方法 | `get` | `get` = `?` 附加 URL；`post` = body |
| `enctype` | 資料編碼 | `application/x-www-form-urlencoded` | file upload 要 `multipart/form-data` |
| `name` | 表單識別名 | 冇 | 畀 JavaScript 攞返 form |

*（教材對應：SLIDE 6）*

---

### 3.6 `<select>` 下拉清單：option、multiple、size、optgroup（SLIDE 7–8）

#### 3.6.1 基本單選下拉清單

`<select>` 定義一個下拉清單（dropdown list），每個選項由 `<option>` 定義；`<option>` 嘅 `value` 係提交時送出嘅值，而標籤之間嘅文字係顯示畀用戶睇嘅文字。

```html
<select name="campus">
  <option value="TY">Tsing Yi</option>
  <option value="CW">Chai Wan</option>
  <option value="ST">Shatin</option>
</select>
```

> **English Standard Definition — select**："The `<select>` element defines a dropdown list, and each `<option>` element defines one selectable item in the list."

#### 3.6.2 多選模式：`multiple` + `size`

加上 `multiple="multiple"` 之後，用戶可以同時選擇多個選項；但因為佢唔再係單行下拉，通常要配合 `size` 指定**同時顯示幾多個選項**，變成一個可捲動嘅清單框。喺 Windows 用 **Ctrl+Click** 就可以揀多個（Mac 就係 Cmd+Click）。

```html
<select name="speak" size="2" multiple="multiple">
  <option value="ENG">English</option>
  <option value="CTN">Cantonese</option>
  <option value="PTH">Putunghua</option>
</select>
```

> **English Standard Definition — multiple**："`multiple="multiple"` specifies that multiple options can be selected in the list; use Ctrl+Click to select multiple options."

> **English Standard Definition — size**："The `size` attribute defines the number of visible options in a dropdown list."

#### 3.6.3 用 `<optgroup>` 分組長選單

如果選項好多，可以靠 `<optgroup>`（option group）將相關選項分組，`label` 屬性係組嘅標題（顯示為灰色不可選嘅組名）。用戶就好容易喺大選單入面搵到自己要嘅組。

```html
<select>
  <optgroup label="Fruit">
    <option>Apple</option>
    <option>Orange</option>
  </optgroup>
  <optgroup label="Vegetable">
    <option>Onion</option>
    <option>Tomato</option>
  </optgroup>
</select>
```

> **English Standard Definition — optgroup**："The `<optgroup>` tag is used to group related options; if you have a long list of options, a user can easily handle groups of related options."

> **Exam Answer Phrase**："`<optgroup>` groups related `<option>` elements under a non-selectable group label, which makes a long dropdown list easier for users to browse."

*（教材對應：SLIDE 7–8）*

---

### 3.7 `<fieldset>` 同 `<legend>`：將表單資料分組（SLIDE 9）

`<fieldset>` 會喺一組相關嘅欄位外面**畫一個框**，將佢哋視覺上歸為一組；`<legend>` 就係呢個框嘅**標題文字（caption）**，顯示喺框嘅左上角邊緣。

```html
<fieldset>
  <legend>Personal Details</legend>
  Name: <input type="text" /><br />
  Date of birth: <input type="text" />
</fieldset>
```

> **English Standard Definition — fieldset**："The `<fieldset>` element draws a box around the related elements to group the form data."

> **English Standard Definition — legend**："The `<legend>` element defines a caption for the `<fieldset>` element."

> **Exam Answer Phrase**："A `<fieldset>` groups related form controls inside a visible box, and its `<legend>` provides a caption that describes the purpose of the group."

*（教材對應：SLIDE 9）*

---

### 3.8 `<label>` 元素：綁定文字同輸入框、提升無障礙性（SLIDE 10）

`<label>` 為一個 `<input>` 提供說明文字，有兩種綁定寫法：

1. **用 `for` 屬性綁定**：`for` 嘅值要等於目標 input 嘅 `id`，兩者一對一綁定；
2. **包圍式寫法**：將 `<input>` 直接放入 `<label>` 內容中間，就唔使寫 `for`。

```html
<label for="lname">Last Name</label>
<input type="text" name="lastname" id="lname" value="Wong" /><br />

First Name
<input type="text" name="fname" id="fname" value="Peter" /><br />

<label>City <input type="text" name="city" /></label>
```

綁定帶嚟三大好處（考點）：

1. **可㩒性**：用戶㩒落 label 文字，就等同㩒咗個 input（例如 radio 嘅文字範圍變大，唔使精準㩒個圓圈）；
2. **無障礙（accessibility）**：一啲 screen reader（螢幕閱讀器）會讀出 `<label>` 嘅文字，幫助視障用戶知道每個欄位係做咩；
3. 留意 `for` 綁定用 `id`，而提交用 `name`——兩者可以唔同名，好似上面 Last Name 例子咁（`id="lname"`、`name="lastname"`）。

> **English Standard Definition — label**："The `<label>` element defines a label for an `<input>` element and improves web accessibility. Users can click on the label to select the associated `<input>` element."

> **English Standard Definition — for**："The `for` attribute of a label specifies which form element the label is bound to; it must match the `id` of the target input. Alternatively, the `<label>` element can wrap the `<input>` element without the `for` attribute."

> **Exam Answer Phrase**："A `<label>` improves accessibility because screen readers can read the label text to help visually impaired users, and clicking the label focuses or selects the associated input."

*（教材對應：SLIDE 10）*

---

### 3.9 設定預設值：checked、selected、value、textarea 內容（SLIDE 11）

每個表單元素都有自己嘅「設預設值」方法，一字咁淺但好易撈亂，係經典選擇題材料：

| 元素 | 設預設值方法 | 例子 |
| --- | --- | --- |
| radio button | `checked="checked"` | `<input type="radio" name="gender" value="M" checked="checked" />` |
| checkbox | `checked="checked"` | `<input type="checkbox" name="L1" value="Cantonese" checked="checked" />` |
| `<option>`（喺 `<select>` 內） | `selected="selected"` | `<option selected="selected">Higher Diploma</option>` |
| `<textarea>` | 開合標籤之間嘅內容 | `<textarea rows="4" cols="40">In less 150 words...</textarea>` |
| text 等 input | `value` 屬性 | `<input name="username" type="text" value="Chan Tai Man" />` |

注意 `<textarea>` 冇 `value` 屬性——佢嘅預設內容就係放喺 `<textarea>...</textarea>` 之間嘅文字（好似上面「In less 150 words...」咁，同時作為字數提示）；而 `rows`、`cols` 控制可見行數同欄數。

> **English Standard Definition — checked**："The `checked="checked"` attribute pre-selects a radio button or checkbox when the page loads."

> **English Standard Definition — selected**："The `selected="selected"` attribute makes an `<option>` the initially selected item in a `<select>` list."

> **English Standard Definition — textarea**："The `<textarea>` element defines a multi-line text input control; its default text is the content placed between the opening and closing tags, and `rows` and `cols` define its visible size."

> **Exam Answer Phrase**："To set a default value, use `checked="checked"` for radio buttons and checkboxes, `selected="selected"` for an option in a select list, the text between the tags for a textarea, and the `value` attribute for text inputs."

*（教材對應：SLIDE 11）*

---

### 3.10 `<input>` 通用屬性：name、value、readonly、disabled、size、maxlength（SLIDE 12）

除咗 `type`，`<input>` 仲有幾個對所有欄位適用嘅通用屬性。教材例子一次過示範晒：

```html
<input name="lastname" type="text" size="8" maxlength="15" value="Wong" />
<input name="firstname" type="text" readonly="readonly" value="read-only" />
<input name="department" type="text" disabled="disabled" value="disabled" />
```

逐個拆解：

- **`name`**：欄位名稱。**JavaScript 或者 server-side script 都要靠呢個 `name` 去參考（reference）嗰個 input field**——所以 `name` 幾乎一定要有。`type="submit"` 以外嘅欄位如果冇 `name`，提交時唔會被送出。
- **`value`**：欄位嘅**初始值（initial value）**，即頁面一載入就顯示嘅內容；用戶可以改佢。
- **`readonly`**：欄位**只可以睇、唔可以改**（read only）。用戶㩒入去都改唔到內容。留意：readonly 欄位嘅值**仍然會被提交**。
- **`disabled`**：欄位**用唔到（un-usable）兼唔可以㩒（un-clickable）**，通常會變灰。教材強調：**disabled 欄位入面嘅資料唔會被提交**——呢點同 readonly 係最大分別，最常考。
- **`size`**：input 欄位嘅**顯示闊度，以「字元數」計**（例如 `size="8"` 即約顯示 8 個字元闊）。⚠️ 同 `<select>` 嘅 `size`（顯示幾多個 option）意思唔同，唔好撈亂。
- **`maxlength`**：用戶**最多可以輸入幾多個字元**（例如 15 個），超出就入唔到。

```html
<!-- disabled 同 readonly 嘅對比 -->
<input type="text" readonly="readonly" value="read-only" />  <!-- 可以提交 -->
<input type="text" disabled="disabled" value="disabled" />  <!-- 唔會提交 -->
```

> **English Standard Definition — name**："The `name` attribute specifies the name of an input field; JavaScript or a server-side script uses this name to reference the input field."

> **English Standard Definition — value**："The `value` attribute specifies the initial value for an input field."

> **English Standard Definition — readonly**："The `readonly` attribute specifies that the input field is read only, so the user cannot change its value."

> **English Standard Definition — disabled**："The `disabled` attribute specifies that the input field is un-usable and un-clickable. Data in a disabled field will not be submitted."

> **English Standard Definition — size / maxlength**："The `size` attribute specifies the size of the input field in number of characters, and the `maxlength` attribute specifies the maximum allowed length (maximum number of characters) for the input field."

> **Exam Answer Phrase**："The key difference is that a readonly field is still submitted with the form, while data in a disabled field will not be submitted, because the field is un-usable and un-clickable."

*（教材對應：SLIDE 12）*

---

### 3.11 HTML5 新增 Input Types 總覽（SLIDE 13）

HTML5 大幅擴充咗 `type` 嘅取值，教材列出 13 種：`color`、`date`、`time`、`datetime`、`datetime-local`、`month`、`week`、`number`、`range`、`tel`、`email`、`url`、`search`。

共通考試概念：**呢啲新類型有冇實際效果（例如彈出 picker、自動驗證）係「視乎瀏覽器支援」（depending on browser support）**——唔支援嘅瀏覽器通常會當佢做普通 text field，頁面唔會壞。

> **English Standard Definition — HTML5 input types**："HTML5 provides new input types such as color, date, time, datetime, datetime-local, month, week, number, range, tel, email, url and search, each designed for a specific kind of data."

*（教材對應：SLIDE 13）*

#### 3.11.1 `color` — 顏色選擇（SLIDE 14）

用嚟輸入顏色。**格式要求：一定要係十六進位（hexadecimal）色值——一個 `#` 加三組兩位數字**（即 #RRGGBB，好似 `#FF8040`）。支援嘅瀏覽器會喺欄位彈出 color picker（顏色揀色器）。

```html
<input type="color" name="color" />
```

> **English Standard Definition — color**："The `type="color"` input must contain a hexadecimal (hex) colour value: three double-digit numbers starting with a `#` sign, for example `#FF8040`. Depending on browser support, a color picker can show up in the input field."

#### 3.11.2 日期時間系列：date、time、datetime、datetime-local、month、week（SLIDE 15）

用嚟輸入日期／時間。支援嘅瀏覽器會彈出 **date/time picker**（日期／時間選擇器），用戶唔使自己手打格式，減少格式錯誤。系列成員：`date`（日期）、`time`（時間）、`datetime`（日期＋時間，含時區）、`datetime-local`（本地日期＋時間）、`month`（年月）、`week`（年＋週數）。

```html
<input type="date" />
<input type="time" />
<input type="datetime" />
<input type="datetime-local" />
<input type="month" />
<input type="week" />
```

> **English Standard Definition — date/time types**："The date and time input types — date, time, datetime, datetime-local, month and week — accept date or time values; depending on browser support, a date/time picker can show up in the input field."

#### 3.11.3 數字系列：number、range（SLIDE 16）

- **`number`**：只可以輸入數字，而且可以透過 `min`、`max`、`step` 等屬性**限制數字範圍**。
- **`range`**：輸入一個「喺範圍內」嘅值，用 `min`／`max` 設定上下限；**如果唔寫，預設範圍係 0 至 100**。支援嘅瀏覽器會將佢顯示成 **slider control（拉桿）**，好適合音量、亮度呢類連續調整。

```html
<input type="number" />                    <!-- 數字輸入 -->
<input type="range" min="0" max="10" />    <!-- 拉桿：0–10 -->
```

> **English Standard Definition — number**："The `number` type is used for numeric input fields, and you can set restrictions on the numbers, for example with the `min` and `max` attributes."

> **English Standard Definition — range**："The `range` type is for input fields that should contain a value within a range; the default range is 0 to 100, and depending on browser support the field can be displayed as a slider control."

> **Exam Answer Phrase**："`type="range"` renders a slider control with a default range of 0 to 100 unless the `min` and `max` attributes are specified."

#### 3.11.4 格式類：tel、email、url（SLIDE 17）

呢三個類型係「語意化」輸入框——佢哋主要係話畀瀏覽器（同埋手機）知呢個欄位收咩格式嘅資料：

- **`tel`**：電話號碼。教材特別提醒：**因為各國電話號碼格式差異好大（inherent variances），瀏覽器只會當佢做普通單行 text field**，唔會自動驗證；你可以用 **`pattern` 屬性**自行做資料驗證（例如指定正則表達式 `pattern="[0-9]{8}"`）。佢真正嘅作用係**優化流動裝置上彈出嘅鍵盤**（電話鍵盤）。
- **`email`**：電郵地址。支援嘅瀏覽器會喺提交時自動檢查格式（有冇 `@` 等），唔啱會阻止提交。
- **`url`**：網址（URL address）。同上，瀏覽器會做基本格式驗證。

```html
<input type="tel" />          <!-- 電話：當普通文字處理，可用 pattern 驗證 -->
<input type="email" />        <!-- 電郵：瀏覽器自動做格式驗證 -->
<input type="url" />          <!-- 網址：瀏覽器自動做格式驗證 -->
```

> **English Standard Definition — tel**："The `tel` type is for input fields that should contain a telephone number. Due to inherent variances in phone number formats, browsers treat it as a regular, single-line text input field; you can use the `pattern` attribute to perform data validation, and its main purpose is to optimise the keyboard on mobile devices."

> **English Standard Definition — email / url**："The `email` type is for input fields that should contain an e-mail address, and the `url` type is for input fields that should contain a URL address; browsers can automatically validate these formats."

> **Exam Answer Phrase**："The purpose of `type="tel"` is to optimise the keyboard shown on mobile devices; because phone formats vary, browsers treat it as normal text and validation can be done with the `pattern` attribute."

#### 3.11.5 `search` — 搜尋欄位（SLIDE 18）

`search` 用嚟做搜尋框，**行為同普通 text field 一樣**，但瀏覽器會加一啲搜尋專用 UI。例如喺 **Chrome**，欄位右邊會出現一個「交叉（cross）」按鈕，㩒一下就**清空**輸入內容；而 `results` 屬性（主要喺 **Safari** 有效）指定喺下拉度**顯示幾多個近期搜尋記錄**。

```html
<input type="search" results="2" />
```

> **English Standard Definition — search**："The `search` type is for search fields and behaves like a regular text field. In Chrome, clicking the 'cross' clears the input string; the `results` attribute specifies how many recent searches will appear in the dropdown, which is supported by Safari."

*（教材對應：SLIDE 14–18）*

---

### 3.12 `<datalist>` 元素：預設選項 + 自動完成（SLIDE 19）

`<datalist>` 提供一組**預定義選項**，為一個 `<input>` 提供 **autocomplete（自動完成）**功能。運作方式係靠 `id` 配對：input 嘅 `list` 屬性值要等於某個 `<datalist>` 嘅 `id`，兩者就綁定。用戶輸入嗰陣，瀏覽器會喺下拉度建議匹配嘅選項；用戶仍然可以自由輸入任何文字（呢點同 `<select>` 唔同——select 只能揀，datalist 可以揀可以打字）。

```html
<input list="campus" />
<datalist id="campus">
  <option value="Tsing Yi" />
  <option value="Chai Wan" />
  <option value="Tuen Mun" />
</datalist>
```

> **English Standard Definition — datalist**："The `<datalist>` element specifies a list of pre-defined options and provides an autocomplete feature for an `<input>` element."

> **English Standard Definition — list**："The `list` attribute of an input binds the input to a `<datalist>` element by matching the datalist's `id`."

> **Exam Answer Phrase**："The `list` attribute connects an input to a `<datalist>` with the same `id`, so the browser suggests pre-defined options while the user types."

*（教材對應：SLIDE 19）*

---

### 3.13 `<output>` 元素：顯示計算結果（SLIDE 20）

`<output>` 用嚟**顯示一個計算嘅結果**，通常配合 JavaScript 即時更新。教材示範一個「拉桿值 + 數字」即時相加嘅例子：

```html
<form oninput="total.value = parseInt(a.value) + parseInt(b.value)">
  0<input type="range" id="a" />100
  +<input type="number" id="b" value="50" />
  =<output name="total" for="a b"></output>
</form>
```

拆解個機制：

- `oninput` 係一個 **event handler（事件處理器）**：喺 form 上面監聽，**每當用戶改變任何 input 嘅值**，就執行佢後面嘅 JavaScript；
- `parseInt()` 係 JavaScript 內建函數，將字串（例如 `"50"`）**解析做整數**，防止「1 + 2 = 12」呢類字串拼接錯誤；
- `a.value`、`b.value` 直接以 `id` 攞返兩個 input 嘅值；而 `<output name="total">` 因為有 `name`，喺 form 範圍內可以直接用 `total.value` 寫入結果（呼應 3.5.4：form 內嘅元素靠 name 畀 JavaScript 參考）；
- `for` 屬性嘅值係一個**以空格分隔嘅 ID 清單**，列出「邊啲元素嘅值參與咗今次計算」；
- 未有任何輸入／計算之前想顯示一個初始值，可以喺標籤之間放內容做**預設值**，例如 `<output>0</output>`。

> **English Standard Definition — output**："The `<output>` element represents the result of a calculation. A default value can be set by placing text between the tags, for example `<output>0</output>`."

> **English Standard Definition — for (output)**："The `for` attribute of an output element contains a space-separated list of the IDs of the elements whose values went into the calculation."

> **English Standard Definition — oninput**："The `oninput` event executes JavaScript when a user changes the value of an input; in the example, `parseInt(a.value) + parseInt(b.value)` is written into the output element."

> **Exam Answer Phrase**："`parseInt()` is used to convert the string values of the inputs into integers before addition; without it, the `+` operator would concatenate the strings instead of adding the numbers."

*（教材對應：SLIDE 20）*

---

### 3.14 應試常犯錯誤與重點提醒（Exam Pitfalls）

1. **Radio vs Checkbox**：同一個 `name` 嘅 radio 只可以揀一個且不能取消；checkbox 可以揀多個，唔同名都用 `name="lang[]"` 令伺服器收到陣列。
2. **File upload 三件套**：`type="file"` 嘅 form 一定要 `method="post"` + `enctype="multipart/form-data"`，缺一不可。
3. **`disabled` vs `readonly`**：兩者用戶都改唔到，但 **disabled 嘅資料唔會被提交**，readonly 嘅會。另一個分別：disabled 連 focus 都唔得（un-clickable），readonly 可以。
4. **`method` 同 `enctype` 嘅預設值**：method 預設 `get`；enctype 預設 `application/x-www-form-urlencoded`——冇寫唔代表冇，係用緊預設。
5. **設預設值唔好撈亂**：radio/checkbox 用 `checked`；option 用 `selected`；text 用 `value`；textarea 用標籤之間嘅內容。
6. **`size` 嘅雙重意思**：input 嘅 `size` = 顯示幾多個字元闊；select 嘅 `size` = 顯示幾多個 option。
7. **HTML5 新類型靠瀏覽器支援**：答題時加返「depending on browser support」先夠完整；唔支援時當普通 text field。
8. **`<label>` 綁定用 `id`**，唔係 `name`；提交先至用 `name`。

> **English Standard Answer Checklist**："(1) Radio buttons with the same name allow only one choice and cannot be unchecked, while checkboxes allow one or more. (2) File upload requires POST and multipart/form-data. (3) A disabled field is not submitted, but a readonly field is. (4) The default method is GET and the default enctype is application/x-www-form-urlencoded. (5) Use checked, selected, value and textarea content for defaults respectively. (6) The behaviour of new HTML5 input types depends on browser support."

---

## 📖 4. 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

### 4.1 Form 結構與 `<form>` 屬性

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| --- | --- | --- |
| `HTML form` | 用嚟收集用戶輸入嘅表單 | "An HTML form is used to collect user input." |
| `form elements` | 表單入面嘅輸入組件 | "An HTML form contains form elements such as `<input>`, `<select>` and `<option>`, `<textarea>` and `<button>`." |
| `action` attribute | 表單資料提交去邊個 URL | "The action attribute specifies the address (URL) where to submit the form." |
| `method` attribute | 提交用嘅 HTTP 方法 | "The method attribute specifies the HTTP method used when submitting the form." |
| `get` (default) | 資料以 `?` 附加喺 URL 後面 | "With GET, the form data are appended to the action URI with a '?' as separator, and the resulting URI is sent to the server." |
| `post` | 資料放入 request body | "With POST, the form data are included in the body of the request and sent to the server." |
| `enctype` attribute | 提交資料嘅編碼方式 | "The enctype attribute specifies the encoding of the submitted data." |
| `application/x-www-form-urlencoded` | 預設 URL 編碼（冇寫 enctype 就用呢個） | "This is the default enctype value, used when the attribute is not specified." |
| `multipart/form-data` | file upload 必須嘅編碼 | "multipart/form-data is required for forms with `<input type="file">` elements." |
| `name` (form) | 表單識別名，畀 JavaScript 攞返 form | "The name attribute identifies the form for retrieving form elements by JavaScript." |

### 4.2 `<input>` 類型

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| --- | --- | --- |
| `type="text"` | 單行文字輸入框 | "It defines a single-line text field that a user can enter text into." |
| `type="password"` | 密碼輸入框，字元被遮蔽 | "It defines a password field; the characters are masked." |
| `type="radio"` | 單選按鈕（同一 name 只揀一個） | "Radio buttons let a user select only one of the choices; they must share the same name, and a selected radio button cannot be unchecked." |
| `type="checkbox"` | 複選框（可以揀多個） | "Checkboxes let a user select one or more options." |
| `name="lang[]"` | 陣列式命名，令伺服器收到陣列 | "An array-like name such as `lang[]` lets the server receive the checked values as an array." |
| `type="file"` | 檔案選擇欄位（Browse 按鈕） | "It defines a file-select field or a 'Browse...' button for file upload." |
| `type="hidden"` | 用戶睇唔到嘅隱藏欄位 | "It defines a hidden field that is not visible to a user; its value can be changed by JavaScript." |
| `type="submit"` | 送出表單資料嘅按鈕 | "A submit button is used to send out the form data." |
| `type="reset"` | 還原所有欄位到預設值 | "A reset button resets all form values to their default values." |
| `type="button"` | 普通按鈕，觸發 JavaScript | "It defines a clickable button to trigger the execution of JavaScript code." |
| `onclick` event | 㩒按鈕時執行嘅 JavaScript 事件 | "The onclick event handler executes JavaScript code when the button is clicked." |
| `type="image"` | 圖片做 submit 按鈕 | "It defines an image as the submit button, useful for a server-side image map." |
| `server-side image map` | 伺服器端圖像地圖，靠坐標判斷㩒咗邊度 | "The image input submits the click coordinates so the server can determine which region was clicked." |

### 4.3 下拉清單、分組與無障礙元素

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| --- | --- | --- |
| `<select>` / `<option>` | 下拉清單及選項 | "The `<select>` element defines a dropdown list; each `<option>` defines an item in the list." |
| `multiple="multiple"` | 允許揀多個選項 | "It specifies that multiple options can be selected; use Ctrl+Click to select more than one." |
| `size` (select) | 同時顯示幾多個選項 | "The size attribute defines the number of visible options in a dropdown list." |
| `<optgroup>` | 將相關 options 分組 | "The optgroup tag groups related options, so a long list of options is easier to handle." |
| `<fieldset>` | 喺相關欄位外圍畫框分組 | "The fieldset element draws a box around the related elements." |
| `<legend>` | fieldset 嘅標題 | "The legend element defines a caption for the fieldset element." |
| `<label>` | 輸入框嘅說明文字 | "The label element defines a label for an input element and improves web accessibility." |
| `for` attribute (label) | 用 id 綁定 label 同 input | "The for attribute specifies which form element a label is bound to." |
| `web accessibility` | 網頁無障礙（視障用戶可用） | "Labels improve accessibility; screen readers read the label text to help visually impaired users." |
| `screen reader` | 螢幕閱讀器 | "A screen reader reads the text of the label element aloud for visually impaired users." |

### 4.4 預設值與通用屬性

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| --- | --- | --- |
| `checked="checked"` | radio/checkbox 預設選中 | "It pre-selects a radio button or checkbox as the default choice." |
| `selected="selected"` | option 預設揀中 | "It makes an option the initially selected item in a select list." |
| `value` attribute | 欄位初始值 | "The value attribute specifies the initial value for an input field." |
| `readonly` | 只讀、用戶改唔到（仍會提交） | "It specifies that the input field is read only; the value cannot be changed but is still submitted." |
| `disabled` | 用唔到、㩒唔到（唔會提交） | "It makes the field un-usable and un-clickable; data in a disabled field will not be submitted." |
| `size` (input) | 輸入框闊度（以字元計） | "The size attribute specifies the size of the input field in number of characters." |
| `maxlength` | 最多可輸入字元數 | "The maxlength attribute specifies the maximum allowed length for the input field." |
| `reference` (a field) | 用 name 攞返／指涉某欄位 | "JavaScript or server-side scripts use the name attribute to reference the input field." |
| `default value` | 預設值（reset 會還原到呢度） | "A reset button restores all fields to their default values." |

### 4.5 HTML5 新類型、datalist 與 output

| 英文專有名詞/語法 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
| --- | --- | --- |
| HTML5 new input types | 專用資料類型輸入框 | "HTML5 provides new input types: color, date, time, datetime, datetime-local, month, week, number, range, tel, email, url and search." |
| `type="color"` | 顏色輸入，必須係 hex 值 | "The value must be a hexadecimal value: three double-digit numbers starting with a '#' sign, e.g. #FF8040." |
| `color picker` | 顏色揀色器 | "Depending on browser support, a color picker can show up in the input field." |
| `date/time picker` | 日期時間選擇器 | "Depending on browser support, a date/time picker can show up in the input field." |
| `type="number"` | 數字輸入，可設限制 | "The number type is for numeric values, and restrictions can be set on the numbers." |
| `type="range"` | 範圍拉桿 | "The range type is for values within a range; the default range is 0 to 100, and it can appear as a slider control." |
| `type="tel"` | 電話號碼輸入 | "It is for telephone numbers; browsers treat it as regular text, and the pattern attribute can be used for validation." |
| `pattern` attribute | 用正則表達式驗證格式 | "The pattern attribute performs data validation on the input value." |
| `type="email"` / `type="url"` | 電郵／網址輸入 | "They are for fields that should contain an e-mail address / a URL address." |
| `type="search"` | 搜尋框（似普通文字框） | "A search field behaves like a regular text field; in Chrome a cross clears the input string." |
| `results` attribute | 顯示幾多個近期搜尋（Safari） | "The results attribute specifies how many recent searches appear in the dropdown." |
| `<datalist>` | 預設選項清單（自動完成） | "It specifies a list of pre-defined options and provides an autocomplete feature for an input element." |
| `list` attribute | 將 input 綁定到 datalist | "The list attribute binds the input to the datalist element with the matching id." |
| `<output>` | 顯示計算結果嘅元素 | "The output element represents the result of a calculation." |
| `oninput` event | 用戶改變輸入值時執行 JS | "The oninput event executes JavaScript when a user changes the input value." |
| `parseInt()` | 將字串轉做整數 | "parseInt() converts a string into an integer so that numeric values can be added correctly." |
| `autocomplete` | 自動完成建議 | "The datalist provides autocomplete suggestions while the user types." |
| `multiline` / single-line | 多行／單行文字 | "A textarea is a multi-line input; a text input is a single-line field." |

---

## 🗺️ 5. 循序漸進學習路線 (Learning Path)

跟住以下 7 個階段由零到識答題，每一格都係「先理解 ➔ 背英文 ➔ 動手寫 ➔ 會答題」：

**階段 1：Form 係咩？**
先理解：form 嘅目的係收集用戶輸入，`<form>` 包住四類 form elements（`<input>`、`<select>`+`<option>`、`<textarea>`、`<button>`）➔ 背誦："HTML forms are used to collect user input" 同 "The `<form>` element defines an HTML form" ➔ 掌握寫法：寫一個最簡單嘅 `<form>` 骨架（有 `action`、`method`、`name`）➔ 能解答：「Name the form elements that can be grouped inside an HTML form.」

**階段 2：text / password / radio / checkbox**
先理解：text 係單行文字、password 字元被遮蔽、radio 同一 `name` 一組只揀一個而且㩒多次都唔會取消、checkbox 可以揀多個（可用 `name="lang[]"` 收陣列）➔ 背誦："single-line text field"、"characters are masked"、"select only one of the choices"、"select one or more options" ➔ 掌握寫法：寫一個「Gender（radio）+ Languages（checkbox）」表單，確保 radio 用同一個 `name` ➔ 能解答：「How can you make radio buttons mutually exclusive?」「Which input type is suitable for choosing several options at once?」

**階段 3：file / hidden / submit / reset / button / image**
先理解：file 要配 POST + `multipart/form-data` 先上載到；hidden 用戶睇唔到但會提交、值可畀 JS 改；submit 送出資料；reset 還原預設值；button 㩒咗行 JavaScript；image 係圖片版 submit 按鈕（server-side image map 用）➔ 背誦："Browse... button for file upload"、"method="post" enctype="multipart/form-data""、"reset all form values to default values"、"trigger the execution of JavaScript code" ➔ 掌握寫法：寫一個「上載大頭相 + 隱藏欄位 + 求救 button」嘅 form ➔ 能解答：「Why is `multipart/form-data` needed for file upload?」「Which input type runs JavaScript when clicked?」

**階段 4：form 屬性 method / enctype / action / name**
先理解：GET 將資料用 `?` 附加喺 URL（預設）；POST 將資料放 body；URL encoding 係預設 enctype；`name` 畀 JavaScript 攞返個 form ➔ 背誦："appended to the action URI with a '?' as separator"、"included in the body of the form" ➔ 掌握寫法：分別寫 GET（搜尋）同 POST（登入）兩個 form，講得出幾時用邊個 ➔ 能解答：「Compare GET and POST in form submission.」「What is the default method and default enctype of a form?」

**階段 5：select / optgroup / fieldset / legend / label**
先理解：`<select>`+`<option>` 做下拉；`multiple` + `size` 做多選（Ctrl+Click）；`optgroup` 分組長選單；`fieldset`+`legend` 畫框分組加標題；`<label for="id">` 綁定 input 提升無障礙，㩒 label 等於㩒 input ➔ 背誦："multiple options can be selected"、"groups related options"、"draws a box around the related elements"、"improves web accessibility" ➔ 掌握寫法：寫一個用 `optgroup` 分「Fruit／Vegetable」嘅 select，同一個用 `for`/`id` 綁定嘅 label ➔ 能解答：「How does the `for` attribute of a label work?」「What is the purpose of `<fieldset>` and `<legend>`?」

**階段 6：預設值 + 通用屬性**
先理解：radio/checkbox 用 `checked`、option 用 `selected`、text 用 `value`、textarea 用標籤內容；`name` 畀 JS/server 參考、`value` 係初始值、`readonly` 只讀仍提交、`disabled` 唔提交、`size`=顯示字元數、`maxlength`=最多字元數 ➔ 背誦："read only"、"un-usable and un-clickable"、"Data in a disabled field will not be submitted" ➔ 掌握寫法：寫一個含 `size`、`maxlength`、`readonly`、`disabled` 四個屬性嘅示範 input ➔ 能解答：「What is the difference between readonly and disabled?」「Which attribute limits the number of characters a user can type?」

**階段 7：HTML5 新類型 + datalist + output**
先理解：color 要 `#RRGGBB` hex；date/time 系列會彈 picker；number/range（預設 0–100、slider）；tel 唔自動驗證要用 `pattern`（優化手機鍵盤）、email/url 自動驗證；search 似 text（Chrome 交叉清除、`results` 係 Safari）；datalist 用 `list`+`id` 綁定提供 autocomplete；output 配 `oninput` + `parseInt()` 做即時計算，`for` 列參與計算元素嘅 id ➔ 背誦："depending on browser support"、"a hexadecimal value starting with a '#' sign"、"provides an autocomplete feature"、"represents the result of a calculation" ➔ 掌握寫法：重做 SLIDE 20 嘅 `<output>` 計算例子，並寫一個 campus 自動完成 datalist ➔ 能解答：「Why is `parseInt()` used in the oninput example?」「Which attribute connects an input to a datalist?」

**最後自測（Exam Simulation）**：合埋筆記，用英文口頭解釋一次「GET vs POST」「radio vs checkbox」「readonly vs disabled」「file upload 三件套」，再喺白紙上默寫 SLIDE 20 個 `<output>` 例子——默到出嚟就代表你 ready 上考場。

---

## 🎒 6. 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 6.1 十種基本 input type 極速對照

| `type` | 用途（繁中） | Purpose（English） | 應試關鍵 |
| --- | --- | --- | --- |
| `text` | 單行文字 | single-line text field | 最常用 |
| `password` | 密碼 | characters are masked | 遮蔽顯示 |
| `radio` | 單選 | select only one of the choices | 同 `name` 一組；不可 uncheck |
| `checkbox` | 複選 | select one or more options | 可用 `name="x[]"` |
| `file` | 上載檔案 | file-select / Browse button | 要 POST + `multipart/form-data` |
| `hidden` | 隱藏資料 | not visible to the user | 值可畀 JavaScript 改 |
| `submit` | 送出表單 | send out the form data | 有 form 先有用 |
| `reset` | 還原預設值 | reset all values to default | 唔係清空 |
| `button` | 㩒掣行 JS | trigger JavaScript code | 通常配 `onclick` |
| `image` | 圖片提交 | image as submit button | server-side image map |

### 6.2 `<form>` 屬性三分鐘記憶表

| 屬性 | 記住呢句就夠 |
| --- | --- |
| `action` | = destination URL（送去邊） |
| `method` | `get`（預設，`?` 加落 URL）vs `post`（body 入面） |
| `enctype` | 預設 url-encoded；有 file 就轉 `multipart/form-data` |
| `name` | 畀 JavaScript 認得個 form |

### 6.3 預設值四兄弟

| 元素 | 用邊個 | 例句 |
| --- | --- | --- |
| radio / checkbox | `checked="checked"` | `<input type="radio" checked="checked" />` |
| option | `selected="selected"` | `<option selected="selected">Higher Diploma</option>` |
| text 等 input | `value="..."` | `<input type="text" value="Chan Tai Man" />` |
| textarea | 標籤之間內容 | `<textarea>In less 150 words...</textarea>` |

### 6.4 HTML5 新類型速記

- 顏色：`color`（要 `#RRGGBB` hex 值）
- 日期時間：`date`、`time`、`datetime`、`datetime-local`、`month`、`week`（會彈 date/time picker）
- 數字：`number`（可設 min/max）、`range`（slider，預設 0–100）
- 格式：`tel`（當 text、用 `pattern` 驗證、優化手機鍵盤）、`email`、`url`（自動驗證）
- 其他：`search`（Chrome 有交叉清除；`results` 係 Safari 近期搜尋）

口訣：**「Color 色、Calendar 期、Count 數、Contact 聯絡、Search 搵」** —— C 字頭家族記 HTML5 新 input types。

### 6.5 英文極速記憶口訣（Quick Mnemonics）

1. **GET vs POST**："**G**ET goes **?** into the **U**RL; **P**OST puts data in the **B**ody."（G 行 URL、P 行 Body）
2. **radio vs checkbox**："**R**adio = **o**ne **o**f the group (same name); **C**heckbox = **c**hoose many."（R 獨一、C 任揀）
3. **File upload**："File upload needs **P**OST + **multiPART**."（上載檔案要 POST 加 multipart）
4. **readonly vs disabled**："**R**eadonly = read but not edited, still **R**eported; **D**isabled = **D**ead and **D**ropped (not submitted)."（R 照交、D 唔交）
5. **Defaults**："radio/checkbox **checked**, option **selected**, text **value**, textarea **content**."（預設值四兄弟）
6. **Datalist 配對**："input **list** = datalist **id**"（list 撞 id 先綁得埋）

### 6.6 最後 60 秒自問自答

| 繁中問題 | 英文答案要點 |
| --- | --- |
| file upload 要點寫 form？ | `<form method="post" enctype="multipart/form-data">` + `<input type="file">` |
| 點令 radio 一組只揀一個？ | 用同一個 `name`（same name = one group） |
| disabled 欄位會唔會提交？ | No — "Data in a disabled field will not be submitted." |
| GET 同 POST 最大分別？ | GET appends data to the URL after '?'; POST sends data in the body. |
| label 點樣綁 input？ | `for` 等於 input 嘅 `id`，或者直接包住個 input。 |
| range 預設範圍？ | 0 to 100。 |
| tel 點解唔自動驗證？ | Phone formats vary; browsers treat it as normal text; use `pattern` for validation. |
| output 點樣即時計數？ | `oninput` + `parseInt(a.value) + parseInt(b.value)` 寫入 `output`。 |

---

> **祝你考試順利！記住：定義講英文（Definition in English），解釋用中文（Explanation in Chinese），例子默 HTML（Examples in HTML）——三合一就係滿分答案。**
