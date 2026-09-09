# ITE3006 Topic 10 — Prompt Engineering（生成式 AI 提示工程）雙語並行・應考導向學習指南

> 課程：ITE3006 Information Technology Essentials ｜ 主題：Prompt Engineering for Generative AI
> 本指南採用「香港繁體中文解說 + 英文標準定義」雙語並行格式；所有 AI 術語、框架名、提示詞範例均保留英文原文。

---

## 1. 📝 課程概要與實務情境 (Summary & Real-world Context)

本課題核心係「**提示工程（Prompt Engineering）**」——即係**設計輸入提示（input prompts）去有效引導生成式 AI（generative AI）模型嘅輸出**。教材開宗明義：Prompt engineering 唔係「求其打字問問題」，而係一套**有方法嘅設計過程**——揀啱格式、措辭、詞語同符號，令 AI 產生高質素、相關嘅內容，同時**減少偏見（bias）或者唔理想嘅結果**。要做到呢點，需要**詳細嘅指令（detailed instructions）**同**創意加實驗（creativity and experimentation）**：同一條問題，改幾個字、加啲背景、指定輸出格式，效果可以差好遠。

> **English Standard Definition:** "Prompt engineering is the process of designing input prompts to guide an AI model's outputs effectively; it focuses on optimizing the phrasing, structure and content of prompts to improve the quality and relevance of the generated responses, with the goal of leveraging the model's capabilities while minimizing biases or undesirable results."

實務情境一：你幫朋友間新咖啡店「Brew Haven」寫社交媒體宣傳帖。如果淨係問「幫我寫 post」，AI 會俾嚟一啲千篇一律嘅嘢；但如果你跟住 **4 大元素（Instructions + Context + Input Data + Output Indicator）** 結構化咁落 prompt——講明「寫一段精簡吸引嘅 post」、「宣傳對象係 Brew Haven，賣點係 cozy atmosphere 同 free Wi-Fi」、再指定「用一句完整句子輸出」——出嚟嘅內容即刻啱用。呢個就係 prompt engineering 嘅日常威力。

> **English Standard Definition:** "A well-structured prompt separates what the model should do (instructions), what background it should know (context), what data to work on (input data) and how to present the result (output indicator)."

實務情境二：返學做功課想用 AI 幫手諗點解題，如果直接問答案，個 bot 會「扮識」（pretend they know even when they have no idea）。高手會用 **Chain of Thought（思維鏈）** 叫模型**逐步解釋推理**，或者用 **Few-Shot** 畀一兩個例子「教」佢你想要嘅格式。學識呢課嘅框架同技巧，你就由「亂問 AI」升級做「指揮 AI 嘅人」——呢個正正係現代 IT 人必備技能。

---

## 2. 🎯 考試學習目標 (Learning Objectives)

考官會測試以下核心能力（附英文對照）：

- **定義提示工程** — Define prompt engineering and state what it optimizes (phrasing, structure, content of prompts).
- **分辨八大提問／提示類型** — Distinguish direct, exploratory, instructional, comparative, hypothetical, clarification, creative and feedback-request prompts with examples.
- **講解一條 prompt 嘅四大元素** — Explain the four elements of a prompt: Instructions, Context, Input Data and Output Indicator.
- **應用 RTF 框架** — Apply the RTF (Role–Task–Format) framework and explain what each component covers.
- **列舉其他 prompt 框架** — Name other common prompt frameworks (RODES, RISEN, RACE, APE, etc.).
- **背誦 prompt 寫作最佳實踐** — Recall best practices: use the latest model, start with instructions, be clear and specific, give examples, avoid vague descriptions.
- **分辨 prompt 工程技巧** — Distinguish Chain of Thought vs Divide and Conquer, and Zero-Shot vs One-Shot vs Few-Shot vs Referencing vs Negative Prompting.
- **理解提示詞點樣影響 AI 輸出** — Explain why explicit instructions reduce bias and undesirable or incorrect AI outputs.

---

## 3. 📖 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 咩係 Prompt Engineering（定義與目標）

**機制解說：** 「提示工程」呢個詞包含兩部分——「**prompt（提示）**」即你輸入俾 AI 嘅文字；「**engineering（工程）**」即係你**刻意設計**呢段文字。教材指出成個過程涉及**引導（guiding）**生成式 AI 去產生特定輸出，而生成高質素、相關內容需要**詳細指令**；過程包括**揀啱格式、短語、詞語同符號**，令 AI 同使用者之間嘅互動更有效。因為 AI 唔會讀心，你講得愈清楚，佢先做得愈啱。

> **English Standard Definition:** "Prompt engineering involves guiding generative AI to produce specific outputs; it requires detailed instructions for the AI to generate high-quality, relevant content. This process includes selecting the right formats, phrases, words and symbols for effective AI–user interaction."

**「創意 + 實驗」點解咁重要？** 同一條任務可以有無限種問法，冇一條「完美 prompt」— 要**試**先知道邊種問法有效（iterative refinement）。教材強調：**Creativity and experimentation are key** in developing a set of prompts that ensure the AI performs as intended。

> **English Standard Definition:** "Creativity and experimentation are key in developing a set of prompts that ensure the AI performs as intended."

---

### 3.2 八大提問／提示類型（Types of Questions）

教材將常見嘅提問分成八類。考試常出「俾個例子叫你分類」，或者反過來「俾類型叫你舉例」——**八類名稱 + 例子都要背**：

| 類型（英文） | 繁中概念 | 教材例子（原文中文版） |
|------|----------|------------------------|
| **Direct**（直接問題） | 簡單直接、目標明確嘅查詢 | 「法國的首都是哪裡？」 |
| **Exploratory**（探索性問題） | 開放式，想攞到更詳細嘅資訊 | 「告訴我羅馬的歷史。」 |
| **Instructional Prompts**（指示性提示） | 要求具體行動或者指定格式 | 「列出烤蛋糕的步驟。」 |
| **Comparative**（比較性問題） | 要求比較兩件或以上事物 | 「比較 Python 和 Java。」 |
| **Hypothetical**（假設性問題） | 探索假設情景或可能性 | 「如果人類可以在水下呼吸會怎樣？」 |
| **Clarification**（澄清問題） | 想更清晰咁理解複雜主題 | 「用簡單的話解釋量子物理。」 |
| **Creative Prompts**（創意提示） | 激發創意寫作或者新諗法 | 「寫一個關於龍的短篇故事。」 |
| **Feedback Requests**（反饋請求） | 問意見或者評價 | 「你怎麼看待可再生能源？」 |

> **English Standard Definition:** "Questions can be classified into eight types: direct (simple and straightforward queries), exploratory (open-ended, to gather more detailed information), instructional (requesting specific actions or formats), comparative (asking for comparisons between two or more items), hypothetical (exploring scenarios or possibilities), clarification (seeking clearer understanding of complex topics), creative (inspiring creative writing or ideas) and feedback requests (asking for opinions or evaluations)."

**考試重點：** 「比較 Python 和 Java」係 *comparative* 唔係 *direct*——因為有「兩者比較」；「列出步驟」係 *instructional*（指定行動+格式），唔好同 direct 混淆。

---

### 3.3 一條 Prompt 嘅四大元素（4 Elements of a Prompt）

**機制解說：** 一條結構完整嘅 prompt 由**四個部分**組成。教材用一個「幫咖啡店寫社交媒體帖」嘅例子貫穿講解。四元素缺一，AI 就愈大機會靠估。

| 元素（英文） | 繁中概念 | 喺 Brew Haven 例子中嘅內容 |
|------|----------|----------------------------|
| **Instructions** | 交代任務——話俾模型佢要做咩、點樣執行 | "Write a short and engaging social media post." |
| **Context** | 額外背景資料——引導模型答得更好 | "The post is for promoting a new coffee shop called 'Brew Haven'. Highlight the cozy atmosphere and free Wi-Fi." |
| **Input data** | 你想 AI 處理嘅實際輸入／問題／資料 | Coffee shop name: Brew Haven；Key features: Cozy atmosphere, free Wi-Fi |
| **Output indicator** | 指明輸出嘅類型或者格式 | "Provide the response as a single, engaging sentence." |

> **English Standard Definition:** "A prompt has four elements: Instructions — this is a task for the large language model to do, providing a task description or instruction for how the model should perform; Context — external information or additional context that can steer the model to better responses / guide the model; Input data — the input or question that we are interested to find a response for; and Output indicator — the type or format of the output."

**完整 prompt 示範（教材原文）：**

```
Prompt: "Write a short and engaging social media post.
The post is for promoting a new coffee shop called 'Brew Haven'.
Highlight the cozy atmosphere and free Wi-Fi."
```

加埋 Output indicator 嘅完整版就係喺上面四格拆開嗰段——**Instructions 行先，Context 提供背景，Input Data 俾具體資料，最後 Output Indicator 鎖定格式**。

**考試重點：** 俾你睇一段 prompt，叫你**指出邊句係 Instructions、邊句係 Context、邊句係 Output Indicator**——係 MCQ／配對題大熱。記住口訣：**「做咩（Instruction）＋背景（Context）＋資料（Input Data）＋點出（Output Indicator）」**。

---

### 3.4 RTF 框架（RTF Framework）— 寫 Prompt 嘅起手式

**機制解說：** RTF 框架包含 **3 大組成部分（3 Key Components）**，教材**高度推薦**用佢嚟開始寫 prompt（kick-start your journey of writing prompts），話佢**適合好多使用場景（fit for many use cases）**。

| 組成部分 | 繁中概念 | 涵蓋啲咩 |
|----------|----------|----------|
| **Role**（角色） | 為模型**指派寫作角色**（assign the model's writing role） | **Target Audience**（目標對象）、**Scenario**（情境） |
| **Task**（任務） | **清楚定義想要嘅內容**（clearly define desired content） | **Purpose**（目的）、**Scope**（範圍）、**Examples**（例子） |
| **Format**（格式） | **設定寫作規則同條件**（set writing rules & conditions） | **Word Length**（字數）、**Paragraph**（段落）、**Bullet Points**（點列）、**Table**（表格） |

> **English Standard Definition:** "The RTF framework has three key components for an effective prompt: Role assigns the model's writing role (including target audience and scenario), Task clearly defines the desired content (purpose, scope and examples), and Format sets the writing rules and conditions (word length, paragraph, bullet points, table)."

**運用例子（自製，跟框架精神）：** 想 AI 幫你寫學校報告摘要——
- **Role:** "You are a professional tutor who explains IT concepts to a beginner student."（＋ Target audience: first-year HD student；Scenario: revision before exam）
- **Task:** "Summarize the key points of this lecture in your own words."（＋ Purpose: revision；Scope: only Topic 10 content）
- **Format:** "Use bullet points, keep it under 200 words."（＋ 可以要求 Table 對比）

> **English Standard Definition:** "The RTF framework is highly recommended to kick-start your journey of writing prompts, and it fits many use cases."

**其他 Prompt 框架（Other Prompt Frameworks）：** 教材只點名、冇喺本課展開——**RODES、RISEN、RACE、APE** 等（…etc.）。考試重心喺 RTF；其餘框架識列名即可，有興趣可睇教材「Suggested Reading」（見 §6.4）。

---

### 3.5 Prompt 寫作最佳實踐（Best Practices）

教材引用 **OpenAI API 官方文檔「Best practices for prompt engineering with the OpenAI API」**，列出五大原則：

| 原則 | 英文要點 | 繁中解說 |
|------|----------|----------|
| 用最新嘅模型 | **Use the latest model** | 新模型更容易合作（newer models are easier to work with）——能力同聽指令能力都更強 |
| 由指令開始 | **Start with instructions** | 用符號（例如 `###` 或者 `"""`）將 **instructions 同 context 分開**，模型先唔會撈亂 |
| 清晰而具體 | **Be clear and specific** | 準確描述你想要嘅嘢：**context、outcome、length、format、style** 全部講明 |
| 畀例子 | **Give examples of the desired format** | 用清晰例子展示你期望嘅輸出格式 |
| 避免模糊描述 | **Avoid vague descriptions** | 對**長度同格式**要精確——「寫長啲」係模糊，「用 5 點 bullet、每點 ≤20 字」先係具體 |

> **English Standard Definition:** "Best practices for prompt engineering include: use the latest model; start with instructions and separate instructions from context using symbols like `###` or `"""`; be clear and specific about context, outcome, length, format and style; give examples of the desired format; and avoid vague descriptions by being precise about length and format."

**教材補充——Poe 平台嘅建議（Suggestion from Poe）：**

1. **用第二人稱同 bot 講嘢**（Address the bot in second person）— 直接叫「你」做嘢。
2. **盡量清晰**（Be as clear as possible）。
3. **用方括號**（Use square brackets）— 例如 `[咖啡店名]` 做變數位。
4. **用 Markdown 整理結構**（Use Markdown for structure）。

**教材警告（重要）：** Bot 會**扮識**——就算佢完全冇 idea 都會作個答案出嚟（*The bot will pretend they know even when they have no idea*）。所以 prompt 要**容許／鼓勵 bot 講「我唔知」（let the bot know it can say "I don't know"）**，減少 hallucination（幻覺／老作）。教材亦引用 OpenAI 一篇關於 **tokens** 嘅文章（咩係 token、點數 token），即模型收費同上下文長度嘅基本單位。

> **English Standard Definition:** "Language models may pretend to know things they do not; a good prompt lets the model admit uncertainty, for example by explicitly allowing it to say 'I don't know', which reduces hallucinated answers."

---

### 3.6 技巧一：Chain of Thought（思維鏈）vs Divide and Conquer（分而治之）

**機制解說：** 兩者都係將「複雜問題」變「易處理」，但做法相反：

| | Chain of Thought（CoT） | Divide and Conquer（分而治之） |
|---|--------------------------|-------------------------------|
| 概念 | **一條 prompt 之內**引導模型**一步一步咁諗**（step-by-step thinking） | 將成個任務**拆做多條較細嘅 prompt**，逐部分獨立處理 |
| 做法 | 唔好淨係要直接答案——叫模型**解釋每一步推理（explain each step of its reasoning）** | 每個小任務自己一條 prompt，最後組合結果 |
| 適用 | 數學題、邏輯推理、需要「諗過程」嘅問題 | 大型報告／專案，例如「先寫大綱 → 再逐章寫」 |

> **English Standard Definition:** "Chain of Thought focuses on guiding the AI to think step-by-step within a single prompt; instead of asking for a direct answer, prompt the model to explain each step of its reasoning. Divide and Conquer splits the task into multiple smaller prompts to handle different parts individually."

**CoT 示範（自製）：** 唔好問「`x + 5 = 12`，x 係幾多？」，而係問「請逐步解釋：先將兩邊減 5，得出 `x = 7`」。模型跟步驟做，出錯率大幅下降。

---

### 3.7 技巧二：Zero-Shot vs One-Shot vs Few-Shot Learning（零／一／少樣本學習）

**機制解說：** 呢組技巧睇嘅係「你喺 prompt 入面**提供咗幾多個例子**」：

| 技巧 | 例子數量 | 繁中解說 |
|------|----------|----------|
| **Zero-Shot Learning**（零樣本） | 0 個 | 淨係用指令描述任務，唔畀任何例子——靠模型本身嘅能力直接做 |
| **One-Shot Learning**（一樣本） | 1 個 | 提供**一個**例子示範想要嘅做法／格式 |
| **Few-Shot Learning**（少樣本） | 幾個 | 喺 prompt 內提供**幾個例子**，話俾 AI 知點執行任務 |

**Few-Shot 點解有效？** 例子幫模型理解你想要嘅**風格（style）、格式（format）或做法（approach）**——模型睇完例子就可以**推廣（generalize）同複製（replicate）**嗰種做法。

> **English Standard Definition:** "Few-shot learning provides the AI with a few examples of how to perform a task within the prompt; these examples help the model understand the desired style, format or approach for the task, so it can generalize and replicate the approach. Zero-shot gives no example and one-shot gives exactly one."

---

### 3.8 技巧三：Referencing（引用／錨定）vs Negative Prompting（負面提示）

**機制解說：** 教材將 **Few-Shot** 同 **Referencing** 並列比較——Few-Shot 係「**用例子教**」，而 Referencing 係「**用特定輸入資料或 context 錨定（grounding）**模型嘅回答」，即係叫模型**淨係根據你俾嘅資料答**，唔好靠佢記憶老作。

> **English Standard Definition:** "Few-shot learning is about teaching the AI through examples so it can generalize and replicate the approach; referencing is about grounding the AI's response in specific input data or context provided within the prompt."

**Negative Prompting（負面提示）：** 即係**明確講明 AI 唔應該生成啲咩**（explicitly specifying what the AI should avoid generating in its response）——例如「唔好提價格」「唔好用 jargon」。

- **可以同時用喺文字同圖像輸出**（can be applied to both text and visual outputs）。
- **喺視覺生成（visual generation）更加常用同有效**——因為圖像模型**難以預測同複雜**，冇明確指令嘅話，唔想要嘅元素好難控制。

> **English Standard Definition:** "Negative prompting explicitly specifies what the AI should avoid generating in its response; it can be applied to both text and visual outputs, and it is more frequently used and effective in visual generation because of the unpredictability and complexity of image models, where unwanted elements are harder to control without explicit instructions."

---

### 3.9 點解唔好淨係信 AI 輸出？（AI 輸出會錯）

教材喺多張投影片標註 **"AI-generated content may be incorrect"（AI 生成內容可能出錯）**。即係話：無論 prompt 寫得幾好，AI 都可能出錯——因為模型本質係「根據統計估下一個字」，唔係「查事實」。

> **English Standard Definition:** "AI-generated content may be incorrect; the user is responsible for verifying factual, legal or safety-critical outputs before relying on them."

**考試重點：** 呢句警示連同 §3.5 嘅「bot 會扮識」係教材重複強調嘅訊息——答題時可講：*AI outputs should be verified by the user*。

---

### 3.10 課堂 Workshop 摘要：First Attempt at Using Poe（第一次用 Poe 起 chatbot）

**機制解說：** 教材尾段係一個實作環節——用 **Poe**（AI chatbot 平台）建立你第一個 chatbot。核心概念係：**初始化一個 chatbot，就好似歡迎一個新同事返工（welcoming a new colleague on board）**——你要**教（TEACH）**佢、引導佢（guide your new chatbot, aka. your "subordinate"），先至用得順手。

**步驟精神（跟教材）：**

1. 開 Poe，建立一個新 chatbot（揀底層模型，例如 GPT 系列）。
2. 喺 bot 嘅 system prompt／描述度寫低佢嘅**角色同任務**（呼應 RTF 嘅 Role + Task）。
3. 用教材 §3.5 嘅最佳實踐寫佢嘅「員工手冊」：清晰指令、畀例子、用 Markdown 結構。
4. 實測：問佢問題，睇輸出係咪符合預期；唔啱就**改 prompt 再試**（creativity + experimentation）。
5. 記住：佢會「扮識」——遇到冇把握嘅嘢要容許佢答 "I don't know"。

> **English Standard Definition:** "The procedure for initializing a chatbot is just like welcoming a new colleague on board: you are required to TEACH your chatbot so that it can serve you well."

**考試重點：** Workshop 通常唔會出筆試題，但「初始化 chatbot = 教新同事」呢個比喻同「你要 TEACH 佢」可能以 short question 形式出現——記住個概念係**角色設定 + 清晰指引 + 持續教導**。

---

## 4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|-------------------|------------------|----------------------------------------|
| prompt engineering | 設計輸入提示去有效引導 AI 輸出嘅過程 | "Prompt engineering is the process of designing input prompts to guide an AI model's outputs effectively." |
| generative AI | 生成式 AI——能夠產生新內容（文字／圖像）嘅模型 | "Generative AI produces new content such as text or images based on the input it receives." |
| instruction | Prompt 入面「叫模型做咩任務」嘅元素 | "The instruction is the task description telling the model how it should perform." |
| context | 幫助模型答得更好嘅外部背景資料 | "Context is external information that can steer the model to better responses." |
| input data | 你想模型處理嘅輸入／問題 | "Input data is the input or question that we are interested to find a response for." |
| output indicator | 指明輸出類型或格式嘅元素 | "The output indicator specifies the type or format of the output." |
| RTF framework | Role–Task–Format 三部分寫 prompt 框架 | "The RTF framework assigns the model a role, clearly defines the desired content as a task, and sets writing rules and conditions for the format." |
| direct question | 直接簡單嘅查詢 | "A direct question is a simple and straightforward query with a clear answer." |
| exploratory question | 開放式、攞詳細資訊嘅問題 | "An exploratory question is open-ended and is used to gather more detailed information." |
| instructional prompt | 要求具體行動或格式嘅提示 | "An instructional prompt requests a specific action or format, such as 'list the steps to bake a cake'." |
| comparative question | 比較兩件或以上事物 | "A comparative question asks for a comparison between two or more items, for example comparing Python and Java." |
| hypothetical question | 假設性情景問題 | "A hypothetical question explores a scenario or possibility, such as 'what if humans could breathe underwater?'" |
| clarification question | 想更清晰理解複雜主題 | "A clarification question seeks a clearer understanding of a complex topic, e.g. 'explain quantum physics in simple words'." |
| creative prompt | 激發創意寫作或諗法 | "A creative prompt inspires creative writing or new ideas, such as writing a short story about a dragon." |
| feedback request | 問意見或評價 | "A feedback request asks for an opinion or an evaluation of something." |
| chain of thought | 喺一條 prompt 內逐步推理嘅技巧 | "Chain of Thought encourages step-by-step thinking by structuring prompts that guide the model through a problem-solving process." |
| divide and conquer | 將任務拆做多條細 prompt 處理 | "Divide and Conquer splits a large task into multiple smaller prompts and handles each part individually." |
| zero-shot / one-shot / few-shot learning | 喺 prompt 提供 0／1／幾個例子嚟示範任務 | "Few-shot learning provides the AI with a few examples so it can generalize and replicate the desired style or approach." |
| referencing | 用 prompt 內指定資料錨定模型答案 | "Referencing grounds the AI's response in specific input data or context provided within the prompt." |
| negative prompting | 明確講明 AI 唔應該生成咩 | "Negative prompting explicitly specifies what the AI should avoid generating in its response." |
| hallucination | AI 老作／作出一啲唔真實嘅內容 | "A model may hallucinate, producing confident but incorrect content; prompting it to admit uncertainty helps reduce this." |
| token | 模型處理文字嘅基本單位（計費用／長度） | "Tokens are the basic units of text that a language model reads and generates; they are used to measure context length and cost." |

---

## 5. 🗺️ 循序漸進學習路線 (Learning Path)

### 階段 1：先理解觀念（Concepts First）
1. 記實定義：**prompt engineering = 設計 prompt 引導 AI 輸出**，目標係高質素 + 相關 + 減少 bias／唔理想結果。
2. 分得開 **8 類提問**——特別係 instructional（要行動／格式）同 comparative（要比較）呢兩個易錯位。
3. 理解 prompt **4 大元素**各自主責咩（Instructions 做咩、Context 點引導、Input Data 係咩料、Output Indicator 鎖格式）。
4. 理解 RTF 點同 4 元素「夾」：RTF 係**組織框架**，4 元素係**內容成分**——兩者都係「結構化 prompt」嘅工具。

### 階段 2：背誦英文短語（Memorise Key Phrases）
- "Prompt engineering is the process of designing input prompts to guide an AI model's outputs effectively."
- "Instructions tell the model what to do; context steers it; input data is what we ask about; the output indicator sets the format."
- "The RTF framework stands for Role, Task and Format."
- "Chain of Thought: think step-by-step within one prompt. Divide and Conquer: split the task into smaller prompts."
- "Few-shot learning teaches the model through examples."
- "Negative prompting specifies what the AI should avoid generating."
- "The bot may pretend to know; let it know it can say 'I don't know'."

### 階段 3：掌握實作（Hands-on Mastery）
- 用 **RTF** 幫 Brew Haven 呢類情境寫一條完整 prompt（Role 做 marketing copywriter、Task 寫帖、Format 限一句）。
- 將一條 prompt 拆開，**標示邊句係 Instruction／Context／Input Data／Output Indicator**。
- 用 Poe（或者任何 chatbot）實測：同一任務分別用 **direct**、**instructional**、**few-shot** 問法，比較輸出質素。
- 練習 **negative prompting**：「寫一段咖啡店介紹，**唔好**提價格、**唔好**用 emoji」——睇輸出有咩分別。
- 試 **Chain of Thought**：問一條數學／邏輯題，要求「explain each step of your reasoning」，對比直接問答案嘅結果。

### 階段 4：能解答嘅英文考題（Exam-ready Questions）
- **Definition:** "What is prompt engineering?" → *It is the process of designing input prompts to guide an AI model's outputs effectively.*
- **Classify:** "『比較 Python 和 Java』屬於邊種問題？" → *Comparative question.*
- **Label:** 「指出以下 prompt 入面邊部分係 Context／Output Indicator」→ 逐句對應。
- **Framework:** "Name the three components of the RTF framework." → *Role, Task, Format.*
- **Technique:** "Explain the difference between Chain of Thought and Divide and Conquer." → *CoT 一條 prompt 內逐步諗；D&C 拆多條 prompt 逐部分做。*
- **Best practice:** "Why should prompts avoid vague descriptions?" → *因為 AI 需要具體嘅 length／format 指示先出到預期輸出。*
- **Caution:** "Why can AI-generated content be incorrect?" → *模型會 hallucinate，輸出需要使用者驗證。*

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 6.1 四大元素速記

| 元素 | 一句記住 | 關鍵英文 |
|------|----------|----------|
| Instructions | 「做咩」— 任務描述 | "This is a task for the LLM to do." |
| Context | 「背景」— 額外資料引導 | "External information that guides the model." |
| Input data | 「料」— 要處理嘅輸入 | "The input or question to find a response for." |
| Output indicator | 「點出」— 指定格式 | "The type or format of the output." |

### 6.2 RTF 速記

| 字母 | 全寫 | 涵蓋 |
|------|------|------|
| R | Role | Target audience + Scenario |
| T | Task | Purpose + Scope + Examples |
| F | Format | Word length + Paragraph + Bullet points + Table |

**口訣：**「**R 佢係邊個、T 要佢做咩、F 點樣交貨**」— RTF 適合大部分 use cases，寫 prompt 起手第一式。

### 6.3 八類提問 + 技巧極速對照

- 提問八類：**D**irect、**E**xploratory、**I**nstructional、**C**omparative、**H**ypothetical、**C**larification、**C**reative、**F**eedback — 口訣「**DI-IC-HCC-F**」諗唔掂就記**例子**：首都是哪（direct）、羅馬歷史（exploratory）、烤蛋糕步驟（instructional）、Python vs Java（comparative）、水底呼吸（hypothetical）、量子物理（clarification）、龍故事（creative）、可再生能源意見（feedback）。
- 技巧對比：**CoT**（一條 prompt 逐步諗）vs **D&C**（拆多條）；**Zero/One/Few-Shot**（0／1／幾個例子）；**Referencing**（錨定指定資料）；**Negative prompting**（講明唔好生成咩 → 視覺生成特別有效）。
- 最佳實踐五式：**最新模型 → 由指令開始（`###` 分隔）→ 清晰具體 → 畀例子 → 唔好模糊**。

### 6.4 最容易失分位（考官陷阱）

1. **Comparative vs Direct**：「比較 A 和 B」係 comparative，唔係 direct。
2. **Instructional** 嘅重點係「指定行動或格式」（例如「列出步驟」），唔好當普通 direct 問題。
3. **RTF 三格內容撈亂**：Role 管「邊個身份＋對邊個講」（audience/scenario）；Task 管「要咩內容」（purpose/scope/examples）；Format 管「點樣排版」（length/paragraph/bullet/table）。最常錯係將「字數限制」當成 Task——佢係 **Format**！
4. **CoT vs Few-Shot**：CoT 係叫模型「諗過程」；Few-Shot 係「畀例子睇」。兩者唔同軸。
5. **Negative prompting**：記住「**avoid** generating」— 係反面限制，唔係正面指示；同 visual generation 關係最密切。
6. **警示句**：AI-generated content **may be incorrect**；bot 會 pretend to know — 呢兩句係教材原文，short question 照寫就得。
7. **符號分隔**：用 `###` 或 `"""` 分開 instructions 同 context，係 OpenAI 最佳實踐明講嘅做法。

### 6.5 參考資料（教材 Suggested Reading）

- S. Manghani, "Prompt engineering, explained", Medium — https://medium.com/electronic-life/prompt-engineering-explained-3b83ba347722
- E. Young, "Harnessing AI for marketing success: A guide to Prompt Engineering and the RACE framework", LinkedIn — https://www.linkedin.com/pulse/harnessing-ai-marketing-success-guide-prompt-race-framework-young-quf7e
- OpenAI — "Best practices for prompt engineering with the OpenAI API" — https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
- Poe — "Best practices for text generation prompts" — https://creator.poe.com/docs/best-practice-text-generation
- OpenAI — "What are tokens and how to count them" — https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
