# ITE3006 Lab 3 CodeGuide：Form Input Elements（雙語實務測驗主戰文件）

> 課程：ITE3006 Information Technology Essentials ｜ 本 Lab 主題：HTML Forms and Various Input Elements（含 Emmet 快捷鍵）｜ 實作檔案：`lab03_1.html`
> 用途：學生淨係靠呢份文件就做到 Lab、答得掂 Practical Test / Lab Test 嘅填空題、改錯題同「由零寫表單」題。

---

## 🎯 Lab 目標與環境 (Objectives & Environment)

### 要掌握嘅實務技能（Learning Outcomes）

> **Intended Learning Outcomes:**
> 1. Understand the usage and characteristics of different form elements.
> 2. Create data collection forms using various HTML form elements.

繁中對應：

1. **認得並講得出每種 form element 嘅用途同特性**——即係話你見到一個表單需求，要識揀啱嘅 `<input type="...">`、`<select>`、`<textarea>`、`<button>` 等。
2. **用各種 HTML form elements 砌一個收集資料嘅表單**——實務測驗通常會畀你一個半製成品，叫你填空（好似今次 Lab 嘅 (a)–(n)），甚至由零開始寫成個 `<form>`。

### 所需工具（Resource Required）

> **Resource Required:**
> 1. A text editor such as Notepad++
> 2. A browser such as Google Chrome or Mozilla Firefox

| 工具 | 用途 | 實務小貼士 |
|---|---|---|
| Notepad++（文字編輯器） | 寫 HTML 原始碼 | 存檔時用 **Save As**，檔名一定要 `lab03_1.html`（副檔名 `.html`），編碼揀 **UTF-8**，先至唔會亂碼 |
| Google Chrome / Firefox（瀏覽器） | 開啟 `.html` 檔睇效果、做 Debug | 直接 double-click 個檔；按 **F12** 開 DevTools 檢查 Elements / Console |
| Emmet 快捷鍵 | 加快打 HTML | VS Code 內置支援；Notepad++ 要另外裝 Emmet 外掛 |

**實測環境速記（30 秒溫習）**：開 Notepad++ ➔ 貼上/寫好 HTML ➔ Save As `lab03_1.html`（編碼 UTF-8）➔ 喺 Chrome 開個檔 ➔ 逐個 input 試輸入、試 Submit / Reset ➔ 有問題開 F12 睇 Console。

---

## 🛠️ 解題步驟拆解 (Walkthrough)

### 熱身：Emmet 快捷鍵速查（本 Lab 前頁內容）

Emmet 係喺編輯器度打「縮寫」再按 Tab 自動展開成 HTML 嘅工具。測驗有機會叫你「寫出能產生指定 HTML 嘅 Emmet 縮寫」，所以呢張表要背熟：

| Emmet Shortcut | Produced Code（展開結果） | 本 Lab 對應 |
|---|---|---|
| `form:post` | `<form action="" method="post"></form>` | 填空 (a) |
| `input:hidden` | `<input type="hidden" name="">` | 填空 (b) |
| `fieldset>legend` | `<fieldset><legend></legend></fieldset>` | 填空 (c) |
| `input` | `<input type="text">` | Hotel Name |
| `input:text` | `<input type="text" name="" id="">` | Hotel Name |
| `input:number` | `<input type="number" name="" id="">` | 填空 (k) |
| `input:date` | `<input type="date" name="" id="">` | 填空 (g) |
| `input:color` | `<input type="color" name="" id="">` | 填空 (l) |
| `input:file` | `<input type="file" name="" id="">` | 填空 (j) |
| `input:radio` 或 `input:r` | `<input type="radio" name="" id="">` | 填空 (e) |
| `input:r[name="booking"]*2` | 兩個 `name="booking"` 嘅 radio | 填空 (e) |
| `input:checkbox` 或 `input:c` | `<input type="checkbox" name="" id="">` | 填空 (h) |
| `input:c[name="F$"]*3` | 三個 name 係 `F1`、`F2`、`F3` 嘅 checkbox | 填空 (h) |
| `select>option*3` | `<select>` 內含 3 個空 `<option>` | 填空 (f) |
| `textarea` 或 `tarea` | `<textarea name="" id="" cols="30" rows="10"></textarea>` | 填空 (i) |
| `input:submit` 或 `input:s` | `<input type="submit" value="">` | 填空 (m) |
| `input:reset` | `<input type="reset" value="">` | 填空 (n) |

**Emmet 符號意思（Symbols）：**

> - `>` : Child（子元素，包喺入面）
> - `*` : Multiplication（重複幾多次）
> - `$` : Item numbering（自動編號 1、2、3…）
> - `{}` : Text（元素內容文字）
> - `[]` : Attributes（屬性）
> - `()` : Grouping（分組）

**例子**：`input:c[name="F$"]*3` ➔ `$` 自動由 1 數起，所以展開後 name 係 `F1`、`F2`、`F3`；今次 Lab 嘅 Facilities 就係咁嚟。

### 練習 1：`[lab03_1.html]` Hotel Rating Form（填空 (a)–(n)）

#### 題目原文（英文）

> **Lab Exercises**
> 1. `[lab03_1.html]` Consider the following web form which is used to collect feedback and rating from tourists after they have stayed in any Hong Kong hotel. Study carefully and complete the following code according to the instructions given in the tasks (a) to (n).

繁中解說：呢個表單係畀遊客入住香港酒店之後，填 **feedback（意見）**同 **rating（評分）**用。Lab 已經畀咗個「半製成品」骨架，你要按 (a)–(n) 共 14 條指示，喺對應位置填入正確嘅 HTML。骨架如下：

```html
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Hotel Rating Form</title>
    <style type="text/css">fieldset { border-radius: 10px; }</style>
  </head>
  <body>
    <h2>Hotel Rating Form</h2>
    <form    (a)   >
      <input name="region"   (b)   />
        (c)
           Hotel Name :
           <input type="text" name="hotelname" /><br />
           Phone No :
           <input name="phoneno"   (d)   /><br />
           Booking By :
           <input type="radio"   (e)   /> Internet
           <input type="radio"   (e)   /> Agency <br />
           Room Selected :
           <select name="room">
             (f)
           </select>
           <br />
           Stay Period :  from
           <input   (g)   />&nbsp;&nbsp;&nbsp; to
           <input   (g)   /><br />
           Facilities :
           <input name="F1"   (h)   />Gym
           <input name="F2"   (h)   />Swimming Pool
           <input name="F3"   (h)   />Business Centre
        (c)
        <fieldset>
          <legend>Your experience in the hotel:</legend>
          <  (i)   name="comment">In less 200 words...  (i)  <br />
          Send us any photo : <input   (j)   name="photo" /><br />
          Rating :
          <input   (k)   /> stars (Min 1, Max 5)
        </fieldset>
        Choose a colour
          (l)
          for the tee as your gift after you send this form.<br />
        (m)
        (n)
    </form>
  </body>
</html>
```

#### 逐步解題（1 ➔ 2 ➔ 3…）

**Step 1 ➔ 填空 (a)：`<form>` 嘅屬性**

> (a) For the `<form>` element, set the correct attribute values for "method" and "enctype" so that the form can submit data securely and allow uploading file.

**答案**：`method="post" enctype="multipart/form-data"`

```html
<form method="post" enctype="multipart/form-data">
```

繁中解釋：

- **點解用 `method="post"`？** 表單提交有兩種方式：`GET` 會將資料黐喺網址（URL）後面，其他人一眼睇晒；`POST` 就將資料放喺 HTTP request body 入面傳送，唔會暴露喺 URL，所以較安全。
> `method="post"` sends the form data inside the HTTP request body, which is more secure than `method="get"`, where data appears in the URL.
- **點解要 `enctype="multipart/form-data"`？** 因為 (j) 會有檔案上傳（photo）。普通表單嘅編碼 `application/x-www-form-urlencoded` 只傳文字，傳唔到二進位檔案；`multipart/form-data` 先可以將檔案內容打包提交。
> `enctype="multipart/form-data"` is required when the form contains a file upload control (`<input type="file">`).

**Step 2 ➔ 填空 (b)：hidden 隱藏欄位**

> (b) Create a hidden element which has a default value set to "Asia" and is named "region".

**答案**：`type="hidden" value="Asia"`（個 `name="region"` 骨架已經有）

```html
<input type="hidden" name="region" value="Asia" />
```

繁中解釋：hidden input 喺頁面完全睇唔到，但提交表單時會連埋 `region=Asia` 一齊傳去伺服器，用嚟帶啲「唔使用戶輸入但伺服器要知道」嘅固定資料。
> `<input type="hidden">` stores a fixed value that is invisible to the user but is submitted with the form.

**Step 3 ➔ 填空 (c)：`<fieldset>` + `<legend>`（出現兩次）**

> (c) For the input fields from Hotel Name to Facilities, create a fieldset to group them logically and set the legend to "Hotel Details". The CSS declaration "border-radius: 10px;" is provided to help you create rounded corners.

**答案**：第一個 (c)（Hotel Name 之前）填 `</fieldset>` 以外嘅開頭，即：

```html
<fieldset>
  <legend>Hotel Details</legend>
```

第二個 (c)（Facilities 之後、下一個 `<fieldset>` 之前）填收尾：

```html
</fieldset>
```

繁中解釋：

- `fieldset`（欄位集）將相關嘅輸入欄位用一個外框「邏輯分組」，令表單易讀。
> `<fieldset>` groups related form controls inside one bordered box.
- `legend` 係 fieldset 嘅標題文字，會顯示喺外框左上角，今次標題係 "Hotel Details"。
> `<legend>` provides a caption for the `<fieldset>` group.
- 骨架 `<head>` 入面已有 CSS：`fieldset { border-radius: 10px; }`，即係令外框四角變圓（rounded corners）。
> `border-radius: 10px;` gives the fieldset box rounded corners.

**Step 4 ➔ 填空 (d)：電話號碼長度限制**

> (d) For the Phone No field, restrict the input to a maximum of 8 digits only.

**答案**：`type="text" maxlength="8"`（`type="text"` 其實係預設，可寫可不寫；關鍵係 `maxlength`）

```html
<input type="text" name="phoneno" maxlength="8" /><br />
```

繁中解釋：

- `maxlength="8"` 限制用戶最多只可以輸入 **8 個字元**，打多咗都唔入。
> `maxlength="8"` limits the maximum number of characters the user can type.
- ⚠️ 注意：`maxlength` 只對文字類 input（text / tel / search 等）生效；如果轉咗做 `type="number"`，`maxlength` 會被忽略——數字長度要用 `min` / `max` 控制。

**Step 5 ➔ 填空 (e)：Booking By 嘅 radio 選項（出現兩次）**

> (e) For the Booking By field, set the values to "I" and "A" for the "Internet" and "Agency" options respectively. The option "Internet" should be selected by default.

**答案**：

```html
<input type="radio" name="booking" value="I" checked /> Internet
<input type="radio" name="booking" value="A" /> Agency <br />
```

（第一個 (e) 填 `name="booking" value="I" checked`；第二個 (e) 填 `name="booking" value="A"`。課程講義亦接受 `checked="checked"` 寫法。）

繁中解釋：

- **兩個 radio 一定要共用同一個 `name`**（例如 `booking`），瀏覽器先會當佢哋係同一組，揀咗 Internet 就自動取消 Agency，即「互斥（mutually exclusive）」。
> Radio buttons that share the same `name` attribute belong to one group; only one radio button in a group can be selected at a time.
- `value="I"` / `value="A"` 係提交去伺服器嘅值；而 "Internet" / "Agency" 呢啲顯示文字係寫喺 input 後面嘅純文字。
> The `value` attribute is the data submitted to the server; the visible label is plain text placed after the input.
- `checked`（或 `checked="checked"`）令 Internet 一開頭就預設被揀中。
> The `checked` attribute preselects a radio button or checkbox by default.

**Step 6 ➔ 填空 (f)：Room Selected 下拉清單（`<select>` + `<option>`）**

> (f) For the Room Selected field, create a dropdown list and set three options: Double (set the value to "D"), Twin (set the value to "T"), Single (set the value to "S") and this option should be selected by default. Which attribute you should add if the user is allowed to select more than one option?

**答案**：

```html
<select name="room">
  <option value="D">Double</option>
  <option value="T">Twin</option>
  <option value="S" selected>Single</option>
</select>
```

（課程講義亦接受 `selected="selected"`。）

繁中解釋：

- `<select>` 建立下拉清單，每個選擇用一個 `<option>`；`<option>` 嘅顯示文字同提交值可以唔同——用戶見到 "Single"，伺服器收到 `S`。
> A `<select>` element creates a dropdown list; each choice is an `<option>`, whose display text and `value` can differ.
- `selected`（或 `selected="selected"`）放喺邊個 `<option>`，嗰個就係預設選項——今次 "Single" 預設揀中。
> The `selected` attribute makes an `<option>` the default choice in the dropdown.
- **題目尾段附加問題答案：`multiple`**——加咗 `multiple` 之後用戶可以按住 Ctrl 揀多過一個 option。
> Adding the `multiple` attribute to `<select>` allows the user to select more than one option.

**Step 7 ➔ 填空 (g)：Stay Period 兩個日期**

> (g) For the Stay Period field, restrict the input to a valid date for the "from" value and "to" value. You DON'T need to check if the "to" value is less than "from" value.

**答案**：`type="date"`（兩個 input 都係）

```html
Stay Period :  from
<input type="date" name="from" />&nbsp;&nbsp;&nbsp; to
<input type="date" name="to" /><br />
```

繁中解釋：

- `type="date"` 會令瀏覽器顯示日期選擇器，並強制輸入格式係有效日期 `YYYY-MM-DD`，用戶根本打唔到「12 月 40 日」呢類無效值。
> `type="date"` displays a date picker and only accepts a valid calendar date in the format YYYY-MM-DD.
- 題目話明唔使驗證 to 係咪細過 from（嗰啲要 JavaScript 先做到，本 Lab 唔考）。

**Step 8 ➔ 填空 (h)：Facilities 三個 checkbox**

> (h) For the Facilities field, create checkboxes to show three independent options: Gym (set the value to "G") and this option should be selected by default, Swimming Pool (set the value to "S"), Business Centre (set the value to "B").

**答案**：

```html
<input type="checkbox" name="F1" value="G" checked />Gym
<input type="checkbox" name="F2" value="S" />Swimming Pool
<input type="checkbox" name="F3" value="B" />Business Centre
```

繁中解釋：

- Checkbox 係「可以同時揀幾個」嘅選項，所以三個選項用**唔同嘅 name**（`F1`、`F2`、`F3`，啱啱好對應 Emmet 嘅 `input:c[name="F$"]*3`）。如果三個共用同一個 name，提交時只會傳最後一個值，前兩個會「被覆蓋」。
> Each checkbox must have a unique `name` so that several independent options can be submitted at the same time.
- `checked` 令 Gym 預設被揀中。
> The `checked` attribute preselects the Gym option by default.
- 對比：radio 係「一組揀一個」，checkbox 係「獨立逐個揀」，係本 Lab 最重要嘅概念對比。

**Step 9 ➔ 填空 (i)：textarea 意見輸入框（出現兩次）**

> (i) For the "Your experience in the hotel" fieldset, create a text area to show an input area which is 50 characters wide and 4 rows tall. Show the text "In less 200 words..." as the initial value.

**答案**：第一個 (i) 填 `textarea cols="50" rows="4"`，第二個 (i) 填 `</textarea>`

```html
<textarea name="comment" cols="50" rows="4">In less 200 words...</textarea>
```

繁中解釋：

- `cols="50"` 定義輸入區可視闊度係 **50 個字元**；`rows="4"` 定義高度係 **4 行**。
> `cols` sets the visible width of the text area in characters; `rows` sets the visible height in lines.
- **textarea 唔係 self-closing**——初始文字要寫喺開始標籤同結束標籤之間，所以 "In less 200 words..." 就係預設內容。
> The initial text of a `<textarea>` is placed between its opening and closing tags — it cannot be written as `<textarea />`.
- （想「提示但唔係真內容」就要用 `placeholder` 屬性，但今次題目講明係 initial value，所以唔用 placeholder。）

**Step 10 ➔ 填空 (j)：上傳相片按鈕**

> (j) For the "Send us any photo" field, create file browsing button.

**答案**：`type="file"`

```html
Send us any photo : <input type="file" name="photo" /><br />
```

繁中解釋：

- `type="file"` 會顯示「Choose File / 瀏覽」按鈕，用戶撳完可以喺電腦揀檔案。
> `type="file"` creates a file browsing button that lets the user pick a file from their computer.
- 記得：要有檔案上傳，表單本身一定要 (a) 嗰個 `method="post"` + `enctype="multipart/form-data"`，否則揀咗檔都傳唔到。

**Step 11 ➔ 填空 (k)：Rating 數字範圍**

> (k) For the Rating field, restrict the input to integer in the range 1 to 5 only. (Hint : use the "min" and "max" attributes)

**答案**：`type="number" min="1" max="5"`

```html
<input type="number" name="rating" min="1" max="5" /> stars (Min 1, Max 5)
```

繁中解釋：

- `type="number"` 令 input 只接受數字（旁邊有上下箭嘴）；配合 `min="1"`、`max="5"` 限制範圍係 1 至 5。
> `type="number"` restricts the input to numeric values; the `min` and `max` attributes define the allowed range (1–5).
- 進階：題目話要「整數」，可以再加 `step="1"` 令每次加減都係 1、避開小數（Hint 只提 min/max，所以最基本答案係 `type="number" min="1" max="5"`）。

**Step 12 ➔ 填空 (l)：顏色選擇器**

> (l) For the "Choose a colour" field, show a colour picker to let the users choose a colour value.

**答案**：`<input type="color" name="tee" />`（name 自己改乜都得）

```html
Choose a colour
<input type="color" name="tee" />
for the tee as your gift after you send this form.<br />
```

繁中解釋：

- `type="color"` 顯示顏色選擇器，用戶撳入去揀顏色；提交時值係 hex 格式 `#rrggbb`（例如 `#ff0000`）。
> `type="color"` shows a colour picker; the submitted value is a hex colour code such as `#rrggbb`.

**Step 13 ➔ 填空 (m)：提交按鈕**

> (m) Create a button which can send out the form data. The text "Send Data" should be displayed on this button.

**答案**：`<input type="submit" value="Send Data" />`（亦可用 `<button type="submit">Send Data</button>`）

```html
<input type="submit" value="Send Data" />
```

繁中解釋：

- `type="submit"` 撳落去會將表單所有資料傳去 `action` 指定嘅地方；`value="Send Data"` 就係顯示喺按鈕上面嘅文字。
> `type="submit"` sends the form data to the URL in the `action` attribute; for an `<input>` button, `value` is the text shown on the button.

**Step 14 ➔ 填空 (n)：重設按鈕**

> (n) Create a button which can clear all input data and show the default value for each input field. The text "Clear Data" should be displayed on this button.

**答案**：`<input type="reset" value="Clear Data" />`（亦可用 `<button type="reset">Clear Data</button>`）

```html
<input type="reset" value="Clear Data" />
```

繁中解釋：

- `type="reset"` 會將表單內每個欄位**還原成 HTML 入面設定嘅預設值**——例如 radio 還原到 Internet、select 還原到 Single、checkbox 還原到 Gym（因為佢哋有 `checked` / `selected`），textarea 還原到 "In less 200 words..."。
> `type="reset"` restores every control to its default value defined in the HTML — it does not simply empty the form.
- ⚠️ 考試伏位：reset 唔係「清空晒所有嘢」！有預設值嘅欄位會變返預設值，唔係變空白。

#### 📋 填空答案速查表（考前一頁背熟）

| 填空 | 要填嘅嘢 | 答案（完整 attribute / tag） |
|---|---|---|
| (a) | form 屬性 | `method="post" enctype="multipart/form-data"` |
| (b) | hidden 欄位屬性 | `type="hidden" value="Asia"` |
| (c) ① | fieldset 開頭 + legend | `<fieldset><legend>Hotel Details</legend>` |
| (c) ② | fieldset 收尾 | `</fieldset>` |
| (d) | 電話長度限制 | `maxlength="8"`（可加 `type="text"`） |
| (e) ① | Internet radio | `name="booking" value="I" checked` |
| (e) ② | Agency radio | `name="booking" value="A"` |
| (f) | 三個 option | `<option value="D">Double</option><option value="T">Twin</option><option value="S" selected>Single</option>` |
| (f) 附加 | 揀多個選項嘅屬性 | `multiple` |
| (g) | 日期限制（×2） | `type="date"` |
| (h) | 三個 checkbox | 各自 `type="checkbox"`，value 分別 `G`/`S`/`B`，Gym 加 `checked` |
| (i) ① | textarea 開頭 | `<textarea name="comment" cols="50" rows="4">`（注意：name 骨架已有） |
| (i) ② | textarea 收尾 | `</textarea>` |
| (j) | 檔案瀏覽 | `type="file"` |
| (k) | 評分 1–5 | `type="number" min="1" max="5"` |
| (l) | 顏色選擇 | `<input type="color" name="tee" />` |
| (m) | 提交按鈕 | `<input type="submit" value="Send Data" />` |
| (n) | 重設按鈕 | `<input type="reset" value="Clear Data" />` |

---

## 💻 關鍵 HTML/CSS/JS 程式碼

### 完整解答：`lab03_1.html`（每行加繁中註解）

```html
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!-- ↑ 宣告 UTF-8 編碼，中文先至唔會變亂碼 -->
    <title>Hotel Rating Form</title>
    <style type="text/css">
      fieldset { border-radius: 10px; }   /* 令每個 fieldset 外框四角變圓 */
    </style>
  </head>

  <body>
    <h2>Hotel Rating Form</h2>

    <!-- (a) POST：資料喺 request body 傳送較安全；
         enctype="multipart/form-data"：支援檔案上傳 -->
    <form method="post" enctype="multipart/form-data">

      <!-- (b) hidden：用戶睇唔到，但會連埋 region=Asia 提交 -->
      <input type="hidden" name="region" value="Asia" />

      <!-- (c) ① fieldset 開頭：Hotel Name 至 Facilities 邏輯分組 -->
      <fieldset>
        <legend>Hotel Details</legend>

        <!-- 普通單行文字輸入（type="text" 係預設值） -->
        Hotel Name :
        <input type="text" name="hotelname" /><br />

        <!-- (d) maxlength="8"：電話最多 8 個字元 -->
        Phone No :
        <input type="text" name="phoneno" maxlength="8" /><br />

        <!-- (e) 兩個 radio 共用 name="booking" 先互斥；
             Internet 加 checked 預設揀中；value I / A 係提交值 -->
        Booking By :
        <input type="radio" name="booking" value="I" checked /> Internet
        <input type="radio" name="booking" value="A" /> Agency <br />

        <!-- (f) select 下拉清單；option 顯示文字同 value 可以唔同；
             Single 加 selected 做預設選項 -->
        Room Selected :
        <select name="room">
          <option value="D">Double</option>
          <option value="T">Twin</option>
          <option value="S" selected>Single</option>
        </select>
        <br />

        <!-- (g) type="date"：兩個 input 都彈日期選擇器，
             只接受有效日期 YYYY-MM-DD -->
        Stay Period :  from
        <input type="date" name="from" />&nbsp;&nbsp;&nbsp; to
        <input type="date" name="to" /><br />

        <!-- (h) 三個 checkbox 各自唔同名 F1/F2/F3 → 可同時揀多個；
             Gym 加 checked 預設揀中 -->
        Facilities :
        <input type="checkbox" name="F1" value="G" checked />Gym
        <input type="checkbox" name="F2" value="S" />Swimming Pool
        <input type="checkbox" name="F3" value="B" />Business Centre
      </fieldset>
      <!-- (c) ② fieldset 收尾 -->

      <!-- 第二組 fieldset：旅客入住體驗 -->
      <fieldset>
        <legend>Your experience in the hotel:</legend>

        <!-- (i) textarea：cols=50 闊 x rows=4 高；
             初始文字寫喺開始/結束標籤之間 -->
        <textarea name="comment" cols="50" rows="4">In less 200 words...</textarea>
        <br />

        <!-- (j) type="file"：檔案瀏覽按鈕（要靠 (a) 嘅 enctype 先傳到檔） -->
        Send us any photo :
        <input type="file" name="photo" /><br />

        <!-- (k) type="number" + min/max：評分限制 1 至 5 -->
        Rating :
        <input type="number" name="rating" min="1" max="5" /> stars (Min 1, Max 5)
      </fieldset>

      <!-- (l) type="color"：顏色選擇器，提交值係 #rrggbb -->
      Choose a colour
      <input type="color" name="tee" />
      for the tee as your gift after you send this form.<br />

      <!-- (m) submit：傳送表單資料；value 係按鈕上顯示嘅文字 -->
      <input type="submit" value="Send Data" />

      <!-- (n) reset：還原所有欄位嘅預設值（唔係清空！） -->
      <input type="reset" value="Clear Data" />
    </form>
  </body>
</html>
```

### 本 Lab 用到嘅 CSS

只有一句，喺 `<head>` 內：

```css
fieldset { border-radius: 10px; }
```

> `border-radius` rounds the corners of the `<fieldset>` border box; a larger value makes the corners more rounded.

測驗要點：`border-radius` 屬 CSS property，唔係 HTML attribute；寫錯位置（例如寫咗入 `<fieldset border-radius="10px">`）係唔會生效嘅。

### 本 Lab 用到嘅 JavaScript

**本 Lab 冇 JavaScript**——所有功能（日期揀選、數字範圍、檔案瀏覽、提交/重設）都係純 HTML5 input type 同 form attribute 提供。若果測驗問「呢啲點解唔使 JS 都做到？」，答案係：

> HTML5 built-in input types (`date`, `number`, `color`, `file`) and form attributes (`required`, `min`, `max`, `maxlength`) provide client-side validation without JavaScript.

（如果測驗另外要你「防止表單真係提交、改用 JS 處理」，先會用到 `onsubmit` / `addEventListener("submit", ...)` + `preventDefault()`——呢啲係 Lab 4 之後嘅範圍。）

### Emmet 實戰對照（由縮寫 → 本 Lab 代碼）

| 打呢行 Emmet 再按 Tab | 得到 | 本 Lab 邊度用 |
|---|---|---|
| `input:r[name="booking"][value="I"]` | `<input type="radio" name="booking" value="I" id="">` | Internet 選項 |
| `input:c[name="F$"]*3` | 3 個 `<input type="checkbox" name="F1/2/3">` | Facilities |
| `select>option[value="D"]{Double}+option[value="T"]{Twin}+option[value="S"]{Single}` | 完整下拉清單 | Room Selected |
| `tarea[name="comment"][cols="50"][rows="4"]` | `<textarea name="comment" cols="50" rows="4"></textarea>` | 意見輸入 |
| `input:s[value="Send Data"]` | `<input type="submit" value="Send Data">` | Send Data |
| `input:reset[value="Clear Data"]` | `<input type="reset" value="Clear Data">` | Clear Data |

---

## 🐞 常見 Error 與 Debug

| Error / 問題（現象） | 原因 | Fix（點樣改） |
|---|---|---|
| 成個表單佈局亂晒，fieldset 冇圍住啲欄位 | `<fieldset>` 開咗但冇 `</fieldset>`（標籤未閉合），瀏覽器自己「估」邊度收尾 | 數清楚每個 `<fieldset>` 都要有對應 `</fieldset>`；喺 Notepad++ 撳標籤會 highlight 配對 |
| textarea 入面打咗字，但瀏覽器當咗做 input / 內容走位 | textarea 冇 `</textarea>` 收尾，或者寫咗 self-closing `<textarea />` | 一定要成對 `<textarea>...</textarea>`；初始文字放中間 |
| 兩個 radio 一齊揀得晒，冇互斥 | 兩個 radio 嘅 `name` 唔同，瀏覽器當佢哋係兩組 | 同一組 radio 全部用**同一個** `name="booking"` |
| Radio / checkbox 提交咗但伺服器收到空值 | 淨係寫咗顯示文字，冇 `value` 屬性 | 每個都要加 `value`，例如 `value="I"`、`value="G"` |
| 三個 checkbox 揀晒兩個，提交得一個值 | 三個 checkbox 共用同一個 `name`，後者覆蓋前者 | 獨立選項用唔同名 `F1` / `F2` / `F3` |
| 揀咗檔案但 Submit 之後冇上傳 / 傳唔到 | `<form>` 冇 `enctype="multipart/form-data"`，或 method 用咗 GET | 改做 `method="post" enctype="multipart/form-data"` |
| `maxlength="8"` 打咗落 `type="number"` input 完全冇效，打到無限位 | `maxlength` 唔支援 number input | number 用 `min` / `max`（加 `step` 控制步進）；要限字數就用 `type="text"` |
| 下拉清單冇預設選項，一開頭係空白 | 冇任何 `<option>` 加 `selected` | 喺想預設嗰個加 `selected`（單選 select） |
| Radio 預設冇揀中 | 冇 `checked` | 喺想預設嗰個加 `checked` |
| 撳 Reset 之後 input 冇變返空白，覺得「壞咗」 | Reset 係還原**預設值**，唔係清空；有 `value` / `checked` / `selected` 嘅會變返預設 | 理解 reset 行為；想真清空要用 JS `form.reset()` 以外嘅手動清空 |
| 揀咗日期/顏色但個 input 顯示唔到 picker | 用咗太舊嘅瀏覽器，或打錯 type（例如 `type="date "` 有空格） | 用 Chrome / Firefox 最新版；檢查 `type="date"` 冇打錯 |
| CSS `border-radius` 冇生效，fieldset 四角唔圓 | CSS 寫咗喺 HTML attribute（`<fieldset border-radius="10px">`）或 selector 打錯字 | 寫入 `<style>`：`fieldset { border-radius: 10px; }`；開 F12 睇 Elements 確認有冇套用 |
| 中文變亂碼（出現「??」或方格） | 檔案冇存做 UTF-8 | Notepad++ Save As 時編碼揀 UTF-8；保留 `<meta charset="utf-8" />` |
| 某 input 提交時根本冇呢個欄位出現 | 冇 `name` 屬性——form 以 `name=value` 傳資料，冇 name 就唔提交 | 每個要提交嘅 input / select / textarea 都要有 `name` |
| 加咗 JS 後成頁冇反應 / 按鈕唔 work（延伸） | JS 有 syntax error，成段 script 冇執行 | 開 F12 → Console 睇紅色錯誤；睇 JS 有冇放喺 `<body>` 尾或加 `defer`；確認冇拼錯 function 名 |

**Debug 三寶（實測必用）**：

1. 按 **F12** 開 Chrome DevTools → **Elements** 睇 DOM 結構（fieldset 有冇正確包住欄位）；
2. **Console** 睇 JS 錯誤同 network 提交；
3. 修改 HTML 後記得 **Ctrl+S 儲存 → F5 重新整理**，先會見到新效果。

---

## 📝 測驗常見題型 (Common Test Questions)

### 題型 1：填空題（最似今次 Lab，佔分最重）

畀半製成品 + (a)–(n) 指示，叫你填 attribute。**答題要點**：

- 每題先認「**要邊種控制項**」：隱藏 → `hidden`；日期 → `date`；數字範圍 → `number` + `min`/`max`；檔案 → `file`；顏色 → `color`；多行文字 → `textarea`。
- 見到「**selected by default / checked by default**」→ 加 `selected`（select 內）或 `checked`（radio/checkbox 上）。
- 見到「**restrict / limit / maximum**」→ 諗 `maxlength`（字數）定 `min`/`max`（數值範圍）。
- 見到「**secure + file upload**」→ 一見即寫 `method="post" enctype="multipart/form-data"`。
- Radio 答案永遠要檢查 `name` 係咪同組一致；Checkbox 答案永遠要檢查 `name` 係咪各自獨立。
- 所有屬性值用雙引號包住：`value="I"`，唔好寫 `value=I`。

### 題型 2：選擇題（MC）

**例 1**：Which attribute must be set on `<form>` to allow file upload?
**答案**：`enctype="multipart/form-data"`（另外最好配 `method="post"`）。

**例 2**：To let two radio buttons behave as one exclusive group, they must share the same ____.
**答案**：`name` attribute（相同嘅 name）。

**例 3**：Which input type shows a date picker without any JavaScript?
**答案**：`type="date"`。

**例 4**：What does `maxlength="8"` do on `<input type="text">`?
**答案**：Limits the number of characters the user can type to 8。留意對 `type="number"` 無效。

**例 5**：After clicking a `type="reset"` button, what happens to a text input whose HTML has no `value`?
**答案**：佢會變返空白；而有 `value="Asia"` 嘅 hidden 或 `checked` 嘅 radio 就會還原返嗰啲預設值。**Reset restores default values, not empties the form.**

**例 6（Emmet）**：Which Emmet abbreviation produces three checkboxes named `F1`, `F2`, `F3`?
**答案**：`input:c[name="F$"]*3`（`$` 自動編號）。

### 題型 3：由零寫表單（短答 / 程式題）

**範例題**：Write the HTML for a field that lets a user rate a hotel from 1 to 5 stars using a numeric spinner only.

**標準答案**：

```html
<label>Rating :
  <input type="number" name="rating" min="1" max="5" step="1" />
</label>
```

**常見變奏**：寫「3 個 radio、第二個預設揀中」／「下拉清單 4 個選項、第三個預設」／「textarea 有 60 字元闊 5 行高同初始文字」。做法一律係：先寫控制項（select / input / textarea）➔ 加 `name` ➔ 加限制屬性（maxlength / min / max / cols / rows）➔ 喺預設嗰個加 `selected` / `checked` ➔ 喺 textarea 兩個標籤之間放初始文字。

### 題型 4：概念短答（口試 / 筆試常見）

| 問題 | 答題要點（英文關鍵句） |
|---|---|
| Difference between GET and POST? | `GET` appends data to the URL and is visible in the address bar; `POST` sends data in the request body and is more secure. |
| Difference between radio and checkbox? | Radio buttons with the same `name` are mutually exclusive — only one can be chosen; checkboxes are independent — several can be chosen at once. |
| Why do we need `enctype="multipart/form-data"`? | Plain form encoding (`application/x-www-form-urlencoded`) handles text only; `multipart/form-data` is required to upload binary files. |
| Difference between `checked` and `selected`? | `checked` preselects radio buttons / checkboxes; `selected` preselects an `<option>` inside a `<select>`. |
| Difference between `value` and display text of an option? | For `<option value="D">Double</option>`, the user sees "Double" but the server receives "D". |
| What does a reset button do? | `type="reset"` restores every control to its default value defined in the HTML — it does not clear the form to empty. |
| How is form data structured when submitted? | Each control is submitted as a `name=value` pair; a control without a `name` attribute is not submitted. |

### 題型 5：改錯題（畀段錯 code 叫你剔錯）

**答題要點**：由外到內掃——(1) `<form>` 屬性啱唔啱（上傳檔案有冇 enctype）；(2) 每個標籤有冇閉合（尤其 `fieldset`、`textarea`、`option`）；(3) 每個 input 有冇 `name`；(4) radio 同組 `name` 一唔一致；(5) checkbox `name` 有冇撞名；(6) `maxlength` 有冇誤用喺 number；(7) 預設選項有冇 `checked`/`selected`；(8) reset/submit type 有冇調亂。

---

## 🔗 理論 recap（本 Lab 重點，5–8 行）

1. HTML form 用嚟收集用戶輸入，提交格式係「`name=value` 配對」——冇 `name` 嘅控制項唔會提交。Form data is submitted as `name=value` pairs; a control without a `name` is not submitted.
2. `method="get"` 會將資料黐喺 URL（唔安全）；`method="post"` 將資料放喺 request body（較安全）。GET exposes data in the URL; POST sends it in the request body.
3. 表單要上傳檔案必須 `enctype="multipart/form-data"` 配 `type="file"`。File upload requires `enctype="multipart/form-data"`.
4. 同一組 radio 共用一個 `name` 先互斥（揀一個）；checkbox 用唔同名先可以獨立揀多個。Radio = one of a group; checkbox = each option independent.
5. `checked` 預設揀中 radio/checkbox；`selected` 預設揀中 `<select>` 內嘅 `<option>`。`checked` preselects radios/checkboxes; `selected` preselects an option.
6. HTML5 input types 幫你唔使寫 JavaScript 就做到輸入驗證：`date`、`number`（配 `min`/`max`）、`color`、`file`、`hidden`。HTML5 input types provide built-in input restrictions without JavaScript.
7. `maxlength` 限制字數（限 text 類）；`min`/`max` 限制數值範圍（限 number 類）。`maxlength` caps characters; `min`/`max` cap numeric range.
8. `<fieldset>` + `<legend>` 將相關欄位邏輯分組並加標題；`submit` 傳送表單，`reset` 還原預設值。Fieldset groups controls; submit sends data, reset restores defaults.
