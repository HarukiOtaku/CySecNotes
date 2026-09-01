# ITP3915 Programming Fundamentals — Final Cheat Sheet（考前極速總複習）

> **覆蓋範圍**：Lecture 1: Introduction to Python（Chapter 1）
> **使用時機**：考試前 5–10 分鐘快速掃描；只保留「關鍵數字、對比表、英文口訣」。
> 詳細解說請回查：`02_AI_Study_Guides/ITP3915_L1_PythonBasics_StudyGuide.md`

---

## 1. 核心概念速記

| 概念 | 一句話 | 英文關鍵句 |
|---|---|---|
| Machine Code | 電腦的唯一語言 | "We must speak the computer's language, machine code." |
| Programming vs Scripting | 編譯後執行 vs 執行時直譯 | "Programming is compiled before execution; scripting runs at runtime." |
| Python 哲學 | 強調可讀性、語法精簡 | "Python emphasizes code readability and expresses concepts in fewer lines." |
| Python 範式 | 支援三種 | "Python supports procedural, functional, and object-oriented programming." |
| Function | 可重用程式碼：輸入→計算→輸出 | "A function is reusable code that takes arguments and may return data." |

## 2. 算術運算子（以 20 和 3 為例）

| Operator | 名稱 | 結果 | Operator | 名稱 | 結果 |
|---|---|---|---|---|---|
| `+` | Addition | 23 | `//` | Floor Division | 6 |
| `-` | Subtraction | 17 | `**` | Exponentiation | 8000 |
| `*` | Multiplication | 60 | `%` | Modulus | 2 |
| `/` | Division | 6.66666666 | | | |

## 3. Operator Precedence（必考）

1. **Parentheses** `()` → 2. **Exponentiation** `**` → 3. **`*` `/` `%`**（左至右）→ 4. **`+` `-`**（左至右）

- 必考算例：`print(7 + 6 - 5 * 4 / 3 ** 2)` → **10.7777778**
- `print(1 + 2 - 3)` → **0**；`print(1 - (2 - 3))` → **2**

## 4. Literals 五類型

| 類型 | 例子 | 關鍵 |
|---|---|---|
| Numeric | 123, -4, 3.14 | 不加引號 |
| String | "Hello", 'Hello' | 必須加引號 |
| Boolean | True, False | Reserved words |
| Special | None | Reserved word |
| Collection | List, tuple, dict, set | 後續章節 |

## 5. Variables 與命名規則

- Variable = 記憶體中有名稱的位置：**儲存（store）→ 之後取回（retrieve）**，內容可改
- 規則：字母／數字／底線；**不能數字開頭**；**Case Sensitive**；要有意義
- 好：`spam` `spam23` `_speed`｜壞：`23spam` `#sign` `var.12`
- 禁用 **Reserved Words**（and, del, for, is, raise, assert, elif, from, lambda, return, break, else, global, not, try, class, except, if, or, while, continue, exec, import, pass, yield, def, finally, in, print, as, with）
- 命名風格：變數 `stuName` / `student_name`；類別 `Student`；常數 `DEFAULT_WARNING`

## 6. 執行順序與賦值（必考追蹤題）

- Statements 由上至下依序執行：`x = 2; x = 4; print(x)` → **4**
- `=` 右邊先算、結果存左邊：`x = x * 100`（先讀 x=2 → 2×100 → 寫回）→ **200**
- 縮排分隔 code block：4 spaces / 2 spaces / 1 tab
- `#` 之後全部忽略（Comments）：描述程式碼、記錄作者、暫時停用某行；建議避免中文註釋

## 7. 英文極速記憶句（可直接寫入答案）

- "Python is case sensitive: student and Student are different names."
- "A literal is raw data given in a variable or value."
- "The expression on the right of the equal sign is evaluated first, then the result is stored in the variable on the left."
- "Anything after a # is ignored by the Python interpreter."
- "Code blocks are separated by indentation."
- "print() is a system-defined function to print output on the screen."
- "You cannot use reserved words as your own variable names."

## 8. 最後 60 秒自測清單

- [ ] 能心算 `7 + 6 - 5 * 4 / 3 ** 2` 的輸出
- [ ] 能分辨 `//`、`**`、`%` 三個運算子的結果
- [ ] 能判斷 `23spam` / `_speed` / `var.12` 哪個是合法變數名稱
- [ ] 能說出 5 種 Literal 類型各舉一例
- [ ] 能追蹤 `x = 2; x = x * 100; print(x)` 的輸出
- [ ] 能解釋 Programming 與 Scripting 的分別（英文作答）

*詳細版：`02_AI_Study_Guides/ITP3915_L1_PythonBasics_StudyGuide.md`*
