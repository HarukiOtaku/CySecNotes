# ITE3006 Lab 9：Client-side Form Validation and Processing（客戶端表單驗證與處理）— 雙語實務 CodeGuide（實務測驗主戰文件）

> 課程：ITE3006 Information Technology Essentials（Web 部分）｜本 Lab 係 **Practical Test / Lab Test 熱門考法**：畀你一份「有一堆空位」嘅 form，要你填返 `type`、`required`、`pattern` 等 HTML5 驗證屬性，再寫 JavaScript 讀返晒所有欄位值。最緊要識 **HTML5 內建驗證（constraint validation）** ＋ **用 `document.f1.xxx` 讀取唔同種類控件（text / radio / checkbox / dropdown）** 呢兩套嘢。

---

## 🔗 理論 recap（開頭速覽，本 Lab 用到的理論）

- **Client-side validation（客戶端驗證）**：由瀏覽器（browser）喺提交前自動檢查輸入格式，唔符合就**唔准提交**，唔使經 server。
- HTML5 提供三類驗證工具：**`required`**（必填）、**語義 `type`**（如 `number`＋`min`、`url`、`email`）、**`pattern`**（用 regular expression 規定格式）；`title` 提供自訂提示訊息。
- `pattern` 係**全字比對**：regex 要 match 成個輸入值（等同前後自動加咗 `^` `$`），例如淨寫 `[A-Z]` 只准「一個大楷字母」。
- 驗證屬性只對**文字類** input 生效：`type="text"`、`url`、`email`、`tel`、`password`、`search` 先支援 `pattern`；`number`／`color`／`date` 等**唔支援** `pattern`（要用 `min`/`max` 等）。
- 驗證合格先至觸發 `onSubmit`；JS 可以用 `document.formName.controlName` 直接攞控件值——text/number/url 用 `.value`，**radio 要 loop 搵 `checked`**、**checkbox 要 loop 收集所有 `checked`**、**dropdown 用 `.value`（或 `selectedIndex`＋`options[]`）**。
- 同 form 自身屬性撞名嘅控件（如 `name="name"`、`name="action"`）會 **shadow（覆蓋）** form 嘅原生屬性；穩陣寫法係用 `document.f1.elements["name"]`。

> **Core idea:** *Client-side validation* lets the *browser* check the input *before submission* — using `required`, semantic `type`s (e.g. `number` + `min`, `url`, `email`) and the `pattern` attribute (a regular expression matched against the **whole** value); a JavaScript function then reads every field, using **loops over `checked`** for radio/checkbox groups and `.value` for the selected `<option>` of a dropdown.

---

## 1. 🎯 Lab 目標與環境 (Objectives & Environment)

**Intended Learning Outcome（教材原文）：**

1. Understand HTML form validation
2. Use javascript to process form elements

**要掌握的實務技能（Practical Skills to Master）：**

1. 用 **`required`** 令欄位必填——留空按 Submit 會被瀏覽器擋住。
2. 用 **語義 `type`** 做格式驗證：`type="number"` + `min`（年齡下限）、`type="url"`（要 `http://` 先算 valid URL）。
3. 寫 **`pattern`（regular expression）** 規定格式：大楷開頭姓名、`HH:MM:SS` 時間、`#RRGGBB`／`#RGB` 十六進制顏色碼。
4. 用 **`title`** 提供 hover／驗證失敗時嘅提示文字。
5. 用 JavaScript 讀取並顯示表單內**每一類控件**嘅值：text box（`.value`）、radio group（loop ＋ `checked`）、checkbox group（loop 收集多個）、dropdown list（`.value`）。
6. 理解瀏覽器內建驗證嘅流程：**格式唔啱 → submit 事件根本唔會觸發**；全部合格 → 先執行 `onSubmit` handler。

**所需工具（Resources Required）：**

| 工具 | 用途 | 英文說明 |
|------|------|---------|
| Notepad++（或 VS Code） | 純文字編輯器寫 HTML + JavaScript | A plain text editor to write HTML and JavaScript |
| Google Chrome / Mozilla Firefox | 開啟 `.html` 測試驗證與表單 | A browser to open and test the HTML files |
| Chrome DevTools（F12） | 睇 Console error、檢查元素 | Open DevTools (F12) to check the Console and inspect elements |
| 瀏覽器「重新整理」 | 改完 code 要刷新先生效 | Press `F5` after saving every change |

**執行方法：** 喺 Notepad++ 開 `lab09_1.html` → 填 (a)–(e) 嘅 HTML 屬性同 (f) 嘅 JavaScript → `File > Save` → 用 Chrome 開啟 → 輸入唔同測試資料按 Submit，睇下：
① 格式錯（如 `alice`、年齡 `17`、時間 `24:00:00`）係咪被擋、有冇紅色提示；② 全部啱嘅時候係咪彈出 `alert()` 顯示所有欄位值。

**本 Lab 檔案一覽（路徑相對於 `01_Raw_Materials/Code/Topic09/`；`Topic 9 Summary.html` 例外，位於 `01_Raw_Materials/Summaries/`）：**

| 檔案 | 作用 |
|------|------|
| `lab/lab09_1.html` | **要完成嘅練習檔**（(a)–(f) 全部空位喺度） |
| `Summaries/Topic 9 Summary.html` | 類型示範檔：`email` / `url` / `number(min,max)` / `pattern` / `textarea` / radio / checkbox / select 每樣一個 |
| `lecture/09_1_type.html` | `type="email"`、`type="url"`、`type="number" min max` 示範 |
| `lecture/09_2_required.html` | `required` 示範（radio group 內一粒 `required` 即成組必揀） |
| `lecture/09_3_access_form.html` | 用 `document.f1.xxx` 讀控件示範（留意佢將文字框改名做 `name1`，就係為咗避開 `name` 撞名） |
| `lecture/09_4_getElementById.html` | 用 `document.getElementById("id")` 直接攞元素示範 |

> **Environment tip:** HTML5 validation runs *client-side* in the browser — open the `.html` file directly; no web server is needed. Invalid input blocks submission with a red tooltip **before** your JavaScript runs.

---

## 2. 🛠️ 解題步驟拆解 (Walkthrough)

### Exercise 1 — [lab09_1.html] User Profile Form（個人資料表單，填空 (a)–(f)）

**題目原文（Question）：**

> [lab09_1.html] The following HTML codes implement a simple form consisting of various user interface components. Study the HTML code and fill in the missing code to answer the questions below:
> (a) Write suitable `pattern` to ensure that the "name" field starts with capital letter and make the field a required one.
> (b) Write suitable `attributes` to ensure that the "age" field is a number with a minimum value of 18 and make the field a required one.
> (c) Write suitable attributes to ensure that the "url" field is a valid url and make the field a required one.
> (d) Write suitable `pattern` to ensure that the "time" field has a pattern of `HH:MM:SS` and make the field a required one. Hints: Possible values for HH is from 00 to 23, for MM is from 00 to 59, for SS is from 00 to 59.
> (e) Write suitable `pattern` to ensure that the "color" field has a pattern of hex color code and make the field a required one. Hints: Color code starts with a `#` symbol followed by 6 or 3 hex digits. Possible value for a single hex digit is from 0 to F (i.e. 0-9, A-F or a-f).
> (f) Write javascript code in the `print_result()` function to display the value of the fields "name", "age", "url", "time", "color", "gender", "dse" and "sport". Hints: Use the form name and field name to reference the field (e.g. `document.f1.age`). For checkboxes ("dse"), radio buttons ("gender") and dropdownlist ("sport"), you need special methods to find out the values of selected options.

**HTML 結構速覽（未填之前，個表有 8 行控件）：**

| 控件 | `name` | 你要填嘅嘢 | 驗證方式 |
|------|--------|-----------|---------|
| `<input type="text">` | `name` | **(a)** `pattern` ＋ `required` | 大楷開頭 |
| `<input type="__">` | `age` | **(b)** `type`／`min`／`required` | 數字 ≥ 18 |
| `<input type="__">` | `url` | **(c)** `type`／`required` | valid URL |
| `<input type="text">` | `time` | **(d)** `pattern` ＋ `required` | `HH:MM:SS` |
| `<input type="text">` | `color` | **(e)** `pattern` ＋ `required` | hex color code |
| `<input type="radio">` × 2 | `gender` | —（已有 `required` 喺 M 嗰粒） | radio group |
| `<input type="checkbox">` × 5 | `dse` | — | checkbox group |
| `<select>` | `sport` | —（第一個 option 係空 `value=""`） | dropdown list |

**諗題前必知嘅兩條「機制」規則（答錯位好易死喺呢度）：**

1. **`pattern` 係全字比對**：HTML 嘅 `pattern` 會自動要求 regex match **成個**輸入值（等同自動幫你加 `^` `$`）。所以想表達「開頭大楷、之後任你」一定要寫埋後面部分，淨寫 `[A-Z]` 會變成「只准一個大楷字母」。
2. **`pattern` 只支援文字類 input**：`type="number"`／`color` 唔食 `pattern`。所以 Age 要用 `type="number"` + `min`，URL 要用 `type="url"`，而 Name / Time / Color 呢啲 `type="text"` 嘅先至用 `pattern`。

> **Rule 1:** In HTML, the `pattern` value must match the **whole** input value — it is implicitly anchored (as if wrapped with `^` and `$`).
> **Rule 2:** The `pattern` attribute works on **text-based** input types only (`text`, `url`, `email`, `tel`, `password`, `search`); it is ignored by `number`, `color`, `date` and other non-string types.

---

#### (a) Name 欄 — 大楷開頭 ＋ 必填

> **Answer:**
> ```html
> <input type="text" name="name" pattern="^[A-Z][a-z]*$"
>        title="Capital first character" required="required" />
> ```
> "The pattern `^[A-Z][a-z]*$` ensures the name starts with an uppercase letter (`[A-Z]`) followed by zero or more lowercase letters (`[a-z]*`), and `required` makes the field mandatory."

**1 ➔ 2 ➔ 3 解法：**

1. **填 `pattern`**：`^` 鎖開頭，`[A-Z]` = 第一個字元一定要係大楷 A-Z；`[a-z]*` = 之後 0 至無限個細楷字母（`*` = zero or more）；`$` 鎖結尾。`Alice` ✅、`alice` ❌。
   > `[A-Z]` matches one uppercase letter A-Z; `[a-z]*` matches zero or more lowercase letters; `^` and `$` anchor the match to the whole string.
2. **加 `required="required"`**（寫 `required` 都得，兩個都係常見寫法）——留空唔畀提交。
3. **留意全字比對陷阱**：如果個名字係「Peter Chan」（有空格）或「Mary-Jane」（有連字號），`[a-z]*` 會 reject。若題目准空格，可改用 `^[A-Z][a-zA-Z ]*$`；完全唔限制其餘字符就用 `^[A-Z].*$`。**答題重點係開頭 `[A-Z]` 一定走唔甩。**

> **Trap:** Because the pattern matches the whole value, a bare `pattern="[A-Z]"` would only accept a *single* capital letter — write the rest of the rule, e.g. `^[A-Z][a-z]*$`.

---

#### (b) Age 欄 — 數字且最少 18 ＋ 必填

> **Answer:**
> ```html
> <input type="number" name="age" min="18" required="required" />
> ```
> "Use `type="number"` so the field accepts numbers only, `min="18"` sets the minimum acceptable value to 18, and `required` makes the field mandatory."

**1 ➔ 2 ➔ 3 解法：**

1. **空位 `type=""` 填 `number`**：呢個係 HTML5 語義型別，瀏覽器會自動限制淨係入到數字，並阻止提交非數字內容。
   > `type="number"` turns the field into a numeric input — letters cannot be typed and non-numeric values are rejected on submit.
2. **加 `min="18"`**：低過 18（如 `17`）會被瀏覽器擋住並提示。可選加 `max`／`step`。
   > `min="18"` sets the minimum value; `type="number"` fields do NOT support `pattern` — use `min`/`max` instead.
3. **加 `required="required"`**：空白都唔畀提交。

> **Trap:** Do not try `type="number"` + `pattern` — browsers **ignore** `pattern` on `number` inputs. The correct tool here is the `min` attribute.

---

#### (c) URL 欄 — 有效 URL ＋ 必填

> **Answer:**
> ```html
> <input type="url" name="url" title="http://domainName" required="required" />
> ```
> "Use `type="url"` so the browser checks that the value is a valid URL (with a protocol such as `http://`), and `required` makes the field mandatory."

**1 ➔ 2 ➔ 3 解法：**

1. **空位 `type=""` 填 `url`**：瀏覽器內建 URL 格式檢查——冇 protocol（例如淨係打 `www.hkiit.edu.hk` 而冇 `http://`）會當 invalid 並拒絕提交。
   > `type="url"` applies built-in URL validation — the value must look like `http://domainName` (protocol + domain + period).
2. **加 `required="required"`**：必填。
3. **`title="http://domainName"` 本身已有**（教材畀咗），佢會喺 hover 或驗證失敗時顯示做提示，唔使改。

---

#### (d) Time 欄 — `HH:MM:SS` 格式 ＋ 必填（最易考嘅 regex）

> **Answer:**
> ```html
> <input type="text" name="time" title="HH:MM:SS"
>        pattern="^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
>        required="required" />
> ```
> "The pattern `^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$` checks that the time is in `HH:MM:SS` form: hours 00–23, minutes 00–59 and seconds 00–59."

**1 ➔ 2 ➔ 3 解法（跟題目 hint 分段砌）：**

1. **砌小時 HH（00–23）**：00–23 唔可以一句 `[0-2][0-9]` 搞掂（嗰個會容許 24–29！）。要拆三段再 `|`（OR）埋一齊：
   - `00–09` → `[01][0-9]` 嘅前半（0 + 0-9）……
   - 正確砌法：`00–19` = `[01][0-9]`（第一位 0 或 1，第二位 0–9）；`20–23` = `2[0-3]`（第一位 2，第二位 0–3）。兩段用 `|` 合併：**`([01][0-9]|2[0-3])`**。
   > Hours 00–23 = `([01][0-9]|2[0-3])` — note `[0-2][0-9]` would wrongly allow 24–29.
2. **砌分鐘／秒 MM、SS（00–59）**：`[0-5][0-9]`——第一位 0–5，第二位 0–9，即係 00–59。用冒號 `:` 隔開三段：**`([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]`**。
   > Minutes and seconds 00–59 = `[0-5][0-9]` — first digit 0–5, second digit 0–9.
3. **加 `^` `$` 同 `required`**：`^`…`$` 鎖死成段（例如唔俾 `9:00:00` 或 `23:59:599` 呢類長短唔啱嘅嘢），再加 `required="required"`。驗證：`23:59:59` ✅、`00:00:00` ✅、`24:00:00` ❌、`12:60:00` ❌。

---

#### (e) Color 欄 — Hex 顏色碼（`#` ＋ 3/6 個 hex digit）＋ 必填

> **Answer:**
> ```html
> <input type="text" name="color" title="#hhh or #hhhhhh"
>        pattern="^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"
>        required="required" />
> ```
> "The pattern `^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$` requires a `#` followed by either 3 or 6 hexadecimal digits (0–9, A–F or a–f)."

**1 ➔ 2 ➔ 3 解法：**

1. **`#` 係字面符號**，直接寫 `#`；hex digit 集合寫 `[0-9a-fA-F]`（細楷同大楷都收）。
   > A hex digit is `[0-9a-fA-F]` — digits 0-9 and letters a-f/A-F.
2. **數量用 `{n}`**：3 個 = `[0-9a-fA-F]{3}`、6 個 = `[0-9a-fA-F]{6}`；「3 或 6」用 `|`：**`#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})`**（次序掉轉都得，因為全字比對會試晒兩邊）。
   > `{3}` means exactly 3 repeats, `{6}` exactly 6; the `|` alternation accepts either 3 or 6 hex digits after the `#`.
3. **加 `^` `$` 同 `required`**。驗證：`#1a2b3c` ✅、`#ABC` ✅、`#12` ❌、`#gggggg` ❌、冇 `#` 嘅 `1a2b3c` ❌。

---

#### (f) JavaScript — `print_result()` 顯示晒所有欄位值

> **Answer:** 見 Section 3 完整程式碼。核心做法——
> ```javascript
> function print_result() {
>   // 1. 文字類欄位：直接 .value
>   var msg = "Name: "  + document.f1.name.value  + "\n" +
>             "Age: "   + document.f1.age.value   + "\n" +
>             "URL: "   + document.f1.url.value   + "\n" +
>             "Time: "  + document.f1.time.value  + "\n" +
>             "Color: " + document.f1.color.value + "\n";
>
>   // 2. radio group（gender）：loop 搵 checked 嗰粒先攞 .value
>   for (var i = 0; i < document.f1.gender.length; i++) {
>     if (document.f1.gender[i].checked) {
>       msg += "Gender: " + document.f1.gender[i].value + "\n";
>       break;
>     }
>   }
>
>   // 3. checkbox group（dse）：可以揀多粒，所有 checked 都要收集
>   var dse = "";
>   for (var j = 0; j < document.f1.dse.length; j++) {
>     if (document.f1.dse[j].checked) {
>       dse += document.f1.dse[j].value + " ";
>     }
>   }
>   msg += "DSE Subjects: " + dse + "\n";
>
>   // 4. dropdown list（sport）：.value 直接等於被選中 option 嘅 value
>   msg += "Sport: " + document.f1.sport.value;
>
>   alert(msg);   // 顯示結果
> }
> ```

**1 ➔ 2 ➔ 3 解法：**

1. **文字類欄位（text / number / url）直接讀 `.value`**：`document.f1.age.value`、`document.f1.url.value`…（題目 hint 就係 `document.f1.age` 呢個形式）。呢 5 個欄位（name/age/url/time/color）全部係「單一值」，`控件.value` 就係用戶輸入嘅字串。
   > For a text/number/url field, `document.f1.age.value` returns the string the user typed.
2. **Radio group（gender）要「搵被揀中嗰粒」**：成組 radio 係一個集合 `document.f1.gender`（RadioNodeList），`.length` 係粒數（2），`gender[0]` = M、`gender[1]` = F。讀「邊粒被揀中」要用 special method——**一定要 loop 逐粒 check `.checked`**，搵到 `true` 嗰粒先記低佢嘅 `.value`，然後 `break` 走人；呢個先係教材期望、唔受瀏覽器差異影響嘅做法（group 直接讀 `.value` 喺唔同瀏覽器行為唔一致，冇揀中時仲會係空值）。
   > Radio buttons sharing a `name` form a group; loop through `gender[i]` and test `.checked` to find which one is selected, then read its `.value`.
3. **Checkbox group（dse）要「收集所有被揀中嘅」**：checkbox 可以揀多粒（0–5 粒都得），所以 loop 晒 5 粒，將所有 `.checked == true` 嘅 `.value`（eng/chi/math/geo/csci）接埋做一條字串（中間用空格隔開）。
   > Checkboxes allow multiple selection — loop through every `dse[i]`, collect the `.value` of each one whose `.checked` is `true`, and concatenate them.
4. **Dropdown list（sport）**：`document.f1.sport.value` 直接回傳**被選中** `<option>` 嘅 `value`（fb/sw/jg/cy）；冇揀就係第一個 option 嘅值 `""`（因為佢 `value=""`）。進階寫法係兩步曲 `options[document.f1.sport.selectedIndex].value`——兩個都得，Lab 慣用簡單嘅 `.value`。
   > For a `<select>`, `.value` returns the value of the selected `<option>` (an empty string if the placeholder option is chosen).
5. **顯示方式用 `alert()`**：將所有欄位拼成一條 message（用 `\n` 換行）再 `alert(msg)`。教材 skeleton 冇提供輸出區域，`alert()` 就係最直接嘅「display」。
   > `alert(msg)` pops up a dialog showing every field value — the simplest way to "display" the values with the given skeleton.

**撞名貼士（Name 欄位叫 `name` 嘅經典位）：** 個 `<input>` 嘅 `name` 係 `"name"`，同 `<form>` 自己嘅 `name` 屬性撞名。標準瀏覽器行為係**控件勝出（shadow）**——所以 `document.f1.name` 攞到嘅係嗰個 `<input>`，`.value` 正常讀到輸入值（參考：[StackOverflow — form-property 撞名會被 shadow](https://stackoverflow.com/questions/22942689)、[MDN — HTMLFormElement.name](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/name)）。如果想**永遠唔撞名**嘅穩陣寫法，可以寫 `document.f1.elements["name"].value`（經 `HTMLFormControlsCollection` 攞）；lecture 檔 `09_3_access_form.html` 將文字框改名做 `name1`，正正就係避開呢個雷。

**完成後預期行為（自我測試）：**

```
輸入：Name=Alice | Age=20 | URL=http://hkiit.edu.hk | Time=07:30:00 | Color=#1a2b3c
     Gender=M | DSE=tick English + Mathematics | Sport=Swimming
按 Submit（全部格式啱）→ 彈 alert：
Name: Alice
Age: 20
URL: http://hkiit.edu.hk
Time: 07:30:00
Color: #1a2b3c
Gender: M
DSE Subjects: eng math
Sport: sw
```

---

## 3. 💻 關鍵 HTML/CSS/JS 程式碼

### 3.1 完整版 `lab09_1.html`（(a)–(e) 已填好答案，逐行繁中註解）

```html
<!DOCTYPE html>
<html>
<head>
<script>
  /* (f) 答案：顯示所有欄位值 */
  function print_result() {
    // 文字類欄位（text/number/url）：.value 直接攞輸入字串
    var msg = "Name: "  + document.f1.name.value  + "\n" +   // (a) 姓名
              "Age: "   + document.f1.age.value   + "\n" +   // (b) 年齡（數字）
              "URL: "   + document.f1.url.value   + "\n" +   // (c) 網址
              "Time: "  + document.f1.time.value  + "\n" +   // (d) 起床時間
              "Color: " + document.f1.color.value + "\n";    // (e) 顏色碼

    // radio group（gender）：成組係集合，loop 搵 checked 嗰粒
    for (var i = 0; i < document.f1.gender.length; i++) {
      if (document.f1.gender[i].checked) {          // 呢粒被揀中
        msg += "Gender: " + document.f1.gender[i].value + "\n"; // value = "M"/"F"
        break;                                       // 搵到就唔使再 loop
      }
    }

    // checkbox group（dse）：可以揀多粒，所有 checked 都要收集
    var dse = "";                                    // 用空字串開始接
    for (var j = 0; j < document.f1.dse.length; j++) {
      if (document.f1.dse[j].checked) {              // 呢粒被剔咗
        dse += document.f1.dse[j].value + " ";       // 接埋 value（eng/chi/...）
      }
    }
    msg += "DSE Subjects: " + dse + "\n";            // 冇揀就顯示空

    // dropdown list（sport）：.value = 被選中 option 嘅 value
    msg += "Sport: " + document.f1.sport.value;      // fb/sw/jg/cy；冇揀 = ""

    alert(msg);                                      // 彈出視窗顯示全部
  }
</script>
</head>

<body>
  <!-- name="f1"：JS 用 document.f1.xxx 存取；onSubmit 喺驗證全部合格後先觸發 -->
  <form name="f1" onSubmit="print_result()">
    <table border="1" style="border-collapse: collapse;">  <!-- border 純粹方便睇表格 -->
      <tr>
        <td>Name</td>
        <td>
          <!-- (a) 大楷開頭 + 必填。^ 鎖開頭，[A-Z] 大楷，[a-z]* 其後細楷，
               $ 鎖結尾（pattern 本身已全字比對，^ $ 寫埋更清楚） -->
          <input type="text" name="name" pattern="^[A-Z][a-z]*$"
                 title="Capital first character" required="required" />
        </td>
      </tr>

      <tr>
        <td>Age</td>
        <td>
          <!-- (b) type="number" 先食 min；number 唔食 pattern -->
          <input type="number" name="age" min="18" required="required" />
        </td>
      </tr>

      <tr>
        <td>Website Address</td>
        <td>
          <!-- (c) type="url" 內建檢查要有 http:// 等 protocol -->
          <input type="url" name="url" title="http://domainName"
                 required="required" />
        </td>
      </tr>

      <tr>
        <td>Wake up Time</td>
        <td>
          <!-- (d) HH:MM:SS：([01][0-9]|2[0-3]) = 00-23，[0-5][0-9] = 00-59 -->
          <input type="text" name="time" title="HH:MM:SS"
                 pattern="^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                 required="required" />
        </td>
      </tr>

      <tr>
        <td>Favorite color in color code</td>
        <td>
          <!-- (e) # + 3 或 6 個 hex digit（0-9 a-f A-F） -->
          <input type="text" name="color" title="#hhh or #hhhhhh"
                 pattern="^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"
                 required="required" />
        </td>
      </tr>

      <tr>
        <td>Gender</td>
        <td>
          <!-- radio group：同一 name；M 嗰粒有 required = 成組必揀一粒 -->
          <input type="radio" name="gender" value="M" required="required" />Male
          <input type="radio" name="gender" value="F" />Female
        </td>
      </tr>

      <tr>
        <td>DSE Subjects</td>
        <td>
          <!-- checkbox group：同一 name，可多選；JS 用 loop 收集 checked -->
          <input type="checkbox" name="dse" value="eng" />English Language
          <input type="checkbox" name="dse" value="chi" />Chinese Language
          <input type="checkbox" name="dse" value="math" />Mathematics
          <br />
          <input type="checkbox" name="dse" value="geo" />Geography
          <input type="checkbox" name="dse" value="csci" />Combined Science
        </td>
      </tr>

      <tr>
        <td>Favorite Sports</td>
        <td>
          <!-- dropdown list：第一個 option value="" 做「未揀」佔位 -->
          <select name="sport">
            <option value="">Please select one sport</option>
            <option value="fb">Football</option>
            <option value="sw">Swimming</option>
            <option value="jg">Jogging</option>
            <option value="cy">Cycling</option>
          </select>
        </td>
      </tr>
    </table>
    <br />

    <input type="submit" value="Submit" />   <!-- 撳呢粒先會觸發驗證 + onSubmit -->
  </form>

</body>
</html>
```

### 3.2 (f) 嘅 JavaScript 重點——四類控件讀法口訣

```javascript
// 口訣：「單值 .value，radio 搵 checked，checkbox 收集晒，dropdown 都係 .value」
var txt   = document.f1.name.value;              // text box        -> 單一值
var num   = document.f1.age.value;               // number box      -> 都係 .value（字串）
var url   = document.f1.url.value;               // url box         -> .value

var gender = "";                                 // radio group
for (var i = 0; i < document.f1.gender.length; i++) {
  if (document.f1.gender[i].checked) {           // .checked = true 先至係用戶揀嗰粒
    gender = document.f1.gender[i].value;        // 攞佢個 value（"M"/"F"）
    break;                                       // 每組只會有一粒 checked
  }
}

var dse = "";                                    // checkbox group（可多選）
for (var j = 0; j < document.f1.dse.length; j++) {
  if (document.f1.dse[j].checked) {
    dse += document.f1.dse[j].value + " ";       // 全部 checked 嘅都接埋
  }
}

var sport = document.f1.sport.value;             // dropdown -> 被選中 option 嘅 value
// 進階兩步曲（同結果）：document.f1.sport.options[document.f1.sport.selectedIndex].value
```

> **Reading rules:** text/number/url → `.value`；radio → loop for the one with `.checked == true` then take its `.value`; checkbox → loop and concatenate every `.checked` value; `<select>` → `.value` (or `options[selectedIndex].value`).

### 3.3 呢個 Lab 幾乎冇 CSS——但有兩個值得識嘅小位

Lab 本身得一個 `table` 樣式（實際 code 檔入面有，教材文字版抽起咗）：

```css
table { border-collapse: collapse; }   /* 表格邊線合併做單線，好睇啲 */
```

**加分位（實測想展示「驗證唔合格嘅欄位變紅」先會用）：** CSS 有 pseudo-class 可以直接反映驗證狀態，唔使寫 JS：

```css
input:required { border: 1px solid #888; }          /* 必填欄加邊框提示 */
input:invalid  { border: 2px solid red; }           /* 格式錯 -> 紅框 */
input:valid    { border: 2px solid green; }         /* 格式啱 -> 綠框 */
```

> **CSS bonus:** the pseudo-classes `:invalid` and `:valid` reflect the browser's validation state, so you can colour invalid fields **without writing any JavaScript**.

### 3.4 對照用：`Topic 9 Summary.html` / `09_1_type.html` 嘅關鍵行（示範檔）

```html
Email  <input type="email" />                                  <!-- 檢查 @ 同 period -->
URL    <input type="url" />                                    <!-- 檢查 protocol -->
Number <input type="number" min="1" max="10" />                <!-- 數字範圍 1-10 -->
Pattern <input type="text" pattern="[0-9]" title="Enter a digit" /> <!-- 淨係一個數字 -->
Textbox <input type="text" name="tel" required="required" />    <!-- 必填 -->
Radio  <input type="radio" name="gender" value="M" checked />Male   <!-- checked = 預設揀 -->
Checkbox <input type="checkbox" name="music" value="rock" />Rock    <!-- 可多選 -->
Select <select name="myselect">
         <option value="choice1" selected>First choice</option>     <!-- selected = 預設 -->
       </select>
```

---

## 4. 🐞 常見 Error 與 Debug

| Error / 問題 | 原因 | Fix |
|---|---|---|
| 姓名打 `Alice` 都話唔啱格式 | `pattern` 只寫咗 `[A-Z]`：全字比對下等於「只准一個大楷字母」 | 寫晒全規則，如 `^[A-Z][a-z]*$`；`[A-Z]` 只負責「開頭大楷」 |
| 年齡入 `17` 照樣提交／入到英文字母 | `type` 空白冇填，或 `min` 漏咗 | `type="number"` + `min="18"`（`number` 唔食 `pattern`，唔好諗住用 regex） |
| URL 明明打咗 `www.hkiit.edu.hk` 都話 invalid | `type="url"` 要求有 protocol（`http://` 或 `https://`） | 輸入或要求用戶打 `http://www.hkiit.edu.hk` |
| 時間 `24:00:00`／`12:60:00` 過到 | HH 寫咗 `[0-2][0-9]`（容許 24–29）或 MM 用 `[0-9]{2}`（容許 60–99） | HH 用 `([01][0-9]\|2[0-3])`、MM/SS 用 `[0-5][0-9]` |
| 顏色 `#12` 或 `1a2b3c`（冇 `#`）過到 | `{n}` 數量錯／漏咗 `#`／hex 集合漏咗 `A-F` | `^#([0-9a-fA-F]{3}\|[0-9a-fA-F]{6})$` |
| 留空都提交到 | 漏咗 `required` | 每個要必填嘅欄加 `required="required"` |
| 改完 HTML 刷新都係舊版 | 冇儲存檔案／瀏覽器 cache | `Ctrl+S` 儲存後 `F5`；仲舊就 `Ctrl+F5` hard refresh |
| Console 報 `Uncaught TypeError: Cannot read properties of undefined (reading 'value')` | `document.f1.xxx` 個 `name` 打錯／`radio`、`checkbox` 直接 `.value` 冇 loop | 核對控件 `name`；radio/checkbox 一定要 loop `[i]` ＋ `.checked` |
| 揀咗 Female 但 Gender 顯示唔到／錯 | Radio group 係集合（RadioNodeList），直接讀 `gender.checked` 會係 `undefined`，或者冇 loop 逐粒 check `.checked` | loop：`for(...){ if(document.f1.gender[i].checked){ ... } }`，攞返 `[i]` 嗰粒嘅 `.value` |
| 揀咗多科 DSE 但淨係顯示一科 | Checkbox 只讀咗 `[0]` | loop 晒 `.length` 粒，逐粒 check `.checked` 再 `+=` 收集 |
| `document.f1.name` 攞到奇怪嘢（唔似 input） | 控件 `name="name"` 同 form 屬性撞名；有啲環境/寫法會混淆 | 穩陣寫法 `document.f1.elements["name"].value`（HTMLFormControlsCollection 永遠唔會撞名） |
| 撳 Submit 冇任何反應（連紅色提示都冇） | 個 submit 掣唔喺 form 入面／`<form>` 冇閉合／tag 打錯 | submit 掣一定要喺 `<form>...</form>` 內；檢查 tag 開閉 |
| 全部啱但 `alert()` 唔彈 | `print_result` 打錯大細階／`<script>` 冇閉合／function 有 syntax error | JavaScript 係 case-sensitive；開 F12 Console 睇紅色 error 喺邊行 |
| `alert()` 彈完之後頁面跳走／重新載入 | `onSubmit="print_result()"` 冇 `return false`，alert 後照 submit（冇 action 就 reload 自己） | 想留住頁面就改 `onSubmit="return print_result()"`，喺函數尾 `return false;`（本 Lab 淨係 display，可唔使理） |
| Gender 兩粒都唔揀得 submit | Radio group 要求起碼揀一粒先叫 valid | 呢個係**正常**內建驗證——M 嗰粒有 `required` 即成組必揀 |

**Debug 三步曲：** ① 按 `F12` 開 Console，紅色字就係 JS error（會話你邊行）；② 想睇 HTML 驗證發生咩事，喺頁面直接按 Submit，睇紅色 tooltip 講咩（會引用 `title` 文字）；③ 逐個欄位試「啱／錯」兩種 input，確認係 `pattern` 錯定 JS 錯——**HTML 驗證錯嘅話 JS 根本唔會行**。

> **Golden rules:** `pattern` matches the **whole** value; `pattern` is ignored on `number`; radio/checkbox need a **loop + `.checked`**; if the browser's native validation fails, `onSubmit` never fires.

---

## 5. 📝 測驗常見題型 (Common Test Questions)

### 題型 1：填空 HTML 驗證屬性（本 Lab 直接考法）
**問法例子：** Write suitable `type` / `pattern` / attributes so that the `xxx` field is required and matches `<格式>`。

**答題要點：**
- 必填 = `required="required"`（或淨寫 `required`）——**每題都記得加**。
- 先判斷用邊種工具：數字範圍 → `type="number"` + `min`/`max`；URL/Email → `type="url"`/`type="email"`；自訂格式（時間、顏色碼、電話…）→ `type="text"` + `pattern`。
- `pattern` 一定寫**成條規則**（^…$ 形式最穩陣），唔好淨寫開頭部分。

### 題型 2：寫 `pattern`（regular expression）——必背格式庫
**問法例子：** Write a pattern so that the field accepts only …（常見：8 位數字電話、`YYYY-MM-DD` 日期、香港身份證、`#rrggbb` 顏色、時間）。

| 想驗證 | Pattern（^…$ 形式） | 口訣 |
|--------|---------------------|------|
| 8 位數字（電話） | `^[0-9]{8}$`（= `^\d{8}$`） | 「{8} 啱啱好 8 個數字」 |
| 大楷開頭姓名 | `^[A-Z][a-z]*$` | 「開頭 [A-Z]，之後 [a-z]*」 |
| 時間 `HH:MM:SS` | `^([01][0-9]\|2[0-3]):[0-5][0-9]:[0-5][0-9]$` | 「時 00-23 拆兩段 OR；分秒 [0-5][0-9]」 |
| Hex 顏色（3/6 位） | `^#([0-9a-fA-F]{3}\|[0-9a-fA-F]{6})$` | 「# + 3 或 6 個 hex」 |
| 日期 `DD/MM/YYYY` | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/[0-9]{4}$` | 「日 01-31、月 01-12、年 4 位」 |
| 淨係字母數字 | `^[A-Za-z0-9]+$` | 「+ 至少一個，全字母數字」 |

**答題要點：** 拆解步驟永遠係「**集合**（`[ ]`）→ **數量**（`{n}`/`*`/`+`/`?`）→ **合併**（`|`，要拆範圍就 `(a|b)` 括住）→ **鎖頭尾**（`^` `$`）」。

### 題型 3：完成 JavaScript 讀取「特殊控件」（radio／checkbox／select）
**問法例子：** Complete the JavaScript to read the selected radio button / all checked checkboxes / the selected item of the dropdown。

**答題要點（背熟三句模板）：**
```javascript
// radio：搵 checked
for (var i = 0; i < document.f1.gender.length; i++) {
  if (document.f1.gender[i].checked) { gender = document.f1.gender[i].value; break; }
}
// checkbox：收集晒
for (var j = 0; j < document.f1.dse.length; j++) {
  if (document.f1.dse[j].checked) { dse += document.f1.dse[j].value + " "; }
}
// select：被選 option
var sport = document.f1.sport.value;                    // 簡單版
// var sport = document.f1.sport.options[document.f1.sport.selectedIndex].value;  // 兩步曲
```
- 記住 `.length` 係 group 入面有幾多粒、`[i]` 係第幾粒、`.checked` 係咪被揀、`.value` 係嗰粒嘅值。
- 唔好直接 `document.f1.dse.value`——多選控件咁讀會唔 work。

### 題型 4：理論問答（Written Test 常出）
**問法例子：** What is client-side validation? / Why is client-side validation NOT enough by itself? / What does the `pattern` attribute do? / Why should the browser do validation *before* the server?

**答題要點（背熟英文句）：**
> **Client-side validation:** the browser checks the input *before* it is submitted; invalid input is rejected immediately with a tooltip, giving faster feedback and reducing server load.
> **Why client-side alone is not enough:** a user can disable JavaScript, tamper with the page, or send requests directly — so validation must also be done **server-side** for security.
> **`pattern`:** it specifies a regular expression that the **whole** field value must match; when it fails, the browser blocks submission and shows the `title` text.
> **`required`:** the field must not be empty before the form can be submitted.
> **`type="number"` + `min`:** restricts input to numbers and enforces a minimum value; `pattern` is ignored on number fields.
> **Radio group `required`:** putting `required` on **one** radio button makes the whole group mandatory (at least one must be chosen).
> **`title`:** shown as a tooltip and as the validation message when the pattern fails.

### 題型 5：改錯題（Debug 題）
**問法例子：** The time field accepts `24:00:00` — find and fix the error。／The form submits even when Name is empty。

**答題要點：** 先諗三寶：① 有冇 `required`；② `pattern` 係咪全字比對、範圍有冇拆錯（`[0-2][0-9]` → 24-29 漏洞）；③ `number` 係咪誤用咗 `pattern`。再 check JS：radio/checkbox 有冇 loop、`name` 有冇打錯、`onSubmit` 個 function 名一唔一致。

**✅ 交 Lab 前自我驗證清單：**
- [ ] Name 入 `alice`（細楷開頭）→ 唔准 submit，紅色提示；入 `Alice` → 過。
- [ ] Age 入 `17` → 唔准；入 `18`／`20` → 過；打字入數字欄 → 根本入唔到。
- [ ] URL 唔加 `http://` → 唔准；加咗 `http://hkiit.edu.hk` → 過。
- [ ] Time 試 `23:59:59` ✅、`24:00:00` ❌、`12:60:00` ❌、`9:00:00` ❌（要兩位數）。
- [ ] Color 試 `#1a2b3c` ✅、`#ABC` ✅、`#12` ❌、`1a2b3c` ❌（冇 `#`）。
- [ ] Gender 兩粒都唔揀 → 唔准 submit；揀一粒 → 過。
- [ ] DSE 剔 0 粒／1 粒／多粒都應該過到（冇 required）。
- [ ] 全部啱 → 彈 `alert()`，內容包含 name/age/url/time/color/gender/dse/sport 嘅值，radio 顯示 M/F、checkbox 顯示晒所有被剔科、sport 顯示 fb/sw/jg/cy。
- [ ] Console（F12）冇紅色 error。

---

*本 CodeGuide 依據教材 `ITE3006_Lab09.txt`、原始碼 `01_Raw_Materials/Code/Topic09/lab/lab09_1.html`、`01_Raw_Materials/Summaries/Topic 9 Summary.html` 及 `01_Raw_Materials/Code/Topic09/lecture/` 示範檔整理，供 ITE3006 Web 實務測驗溫習用。*
