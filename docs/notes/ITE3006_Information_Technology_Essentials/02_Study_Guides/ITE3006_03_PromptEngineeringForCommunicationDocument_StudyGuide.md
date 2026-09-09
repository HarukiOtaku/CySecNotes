# ITE3006 Topic 03 — Prompt Engineering for Communication Document（AI 撰寫溝通文件）雙語並行・應考導向學習指南

> 課程：ITE3006 Information Technology Essentials ｜ 主題：How to Use AI for Emails & Practical Examples（ICIO Prompt Technique）
> 本指南採用「香港繁體中文解說 + 英文標準定義」雙語並行格式；所有 AI 工具名、框架名及提示詞範例均保留英文原文。
> ➜ 呢課係 02 課嘅延續：Prompt 基礎（4 大元素、RTF）見 `ITE3006_02_PromptEngineering_StudyGuide.md` §3.3–3.4。

---

## 1. 📝 課程概要與實務情境 (Summary & Real-world Context)

本課題示範點樣用**生成式文字 AI（generative text AI）**去寫**溝通文件（communication documents）**——教材主力係**電郵（emails）**，仲有**通告同求職信（cover letter）**。流程非常簡單，只有三步：**Input（俾 prompt／諗法）→ Output（AI 出草稿）→ Edit（你覆核同修改）**。教材強調 AI 只係**起點（starting point），唔係最終成品（not the final product）**——永遠要自己 proofread（校對）同加個人化內容。課堂重點係一個專為「文書電郵」而設嘅精簡框架 **ICIO（Input – Context – Instruction – Output）**，配合實際例子示範點樣由「一句模糊指示」變成「一封專業電郵」。

> **English Standard Definition:** "Generative text AI can be used to write communication documents such as emails: the workflow is Input (provide a prompt or idea), Output (the AI generates a draft), then Edit (review and tweak as needed); the AI should be treated as a starting point, not the final product."

實務情境一：你同組員做 project，聽日要交 deadline，你想提提佢哋。如果只係打「Write an email to a groupmate reminding them of a deadline.」，AI 已經出到一份可用草稿；再跟 **ICIO** 補埋 Context（例如「For your module lecturer」）同 Output 格式（「Short email, professional tone」），出嚟嘅嘢就更加啱 tone、啱長度——呢啲正正係**文書電郵（clerical email tasks）**每日會遇到嘅情況。

> **English Standard Definition:** "The ICIO prompt technique — Input, Context, Instruction, Output — is a simple framework for AI prompts that helps create clear, effective email drafts; it is perfect for clerical email tasks."

實務情境二：寫求職信（cover letter）。教材示範咗一份**反面教材**——AI 生成嘅求職信**太長、完全冇結構**（甚至連應徵咩職位都唔清楚）。跟住教材教你用**具體資料重寫 prompt**：講明公司（VTC）、職位（assistant lecturer）、工作經驗（5 年 teaching assistant at ABC Company），AI 即刻出到有焦點嘅求職信。呢個就係「**vague prompt 冇用、specific prompt 先有用**」嘅最佳示範。

> **English Standard Definition:** "A vague prompt such as 'write an email' or 'write a cover letter' produces unfocused results; adding specific details such as the company, the job title and your relevant experience makes the AI output targeted and useful."

---

## 2. 🎯 考試學習目標 (Learning Objectives)

考官會測試以下核心能力（附英文對照）：

- **解釋生成式文字嘅好處同挑戰** — State the benefits (creativity, productivity, personalized content) and challenges (coherence, relevance, ethics, originality) of generative text.
- **講述 AI 寫作嘅三步流程** — Describe the Input → Output → Edit workflow of AI writing.
- **列舉常見生成式 AI 工具** — Name example tools such as Grok, ChatGPT and Grammarly.
- **識得透過學院平台使用 AI** — Access institute AI platforms (e.g. https://genai.vtc.edu.hk/) responsibly.
- **應用 ICIO 框架寫電郵** — Apply the ICIO (Input, Context, Instruction, Output) framework to write clear, effective email prompts.
- **分辨 ICIO 四個部分** — Identify which part of a prompt is Input, Context, Instruction or Output.
- **背誦有效使用 AI 嘅貼士同常見錯誤** — Recall tips for effective AI use and common mistakes to avoid (vague prompts, over-reliance, ignoring policies, no personalization).
- **理解私隱同倫理責任** — State why sensitive data must not be shared in prompts and when AI assistance should be credited.

---

## 3. 📖 雙語深度理論知識點 (Comprehensive Notes)

### 3.1 生成式文字（Generative Text）嘅重要性：好處與挑戰

**機制解說：** 教材先講點解生成式文字咁重要——佢可以**提升創造力（creativity）同生產力（productivity）**，為作家同市場推廣人員（writers and marketers）提供工具，仲可以**個人化內容生成（personalized content generation）**。但同時有挑戰：要確保輸出**連貫（coherence）同相關（relevance）**，而且要面對**道德考量（ethical considerations）同原創性（originality）**嘅問題——即係 AI 寫嘅嘢係咪原創、用嘅時候有冇違反學術／機構規則。

| 方面 | 好處（繁中＋EN） | 挑戰（繁中＋EN） |
|------|------------------|------------------|
| 創造力 | Enhances creativity（提升創造力） | Ethical considerations（道德考量） |
| 生產力 | Enhances productivity（提升生產力） | Originality（原創性） |
| 對象 | Provides tools for writers and marketers（作家／市場推廣工具） | Ensuring coherence（確保連貫性） |
| 內容 | Enables personalized content generation（個人化內容生成） | Ensuring relevance（確保關聯性） |

> **English Standard Definition:** "Generative text enhances creativity and productivity, provides tools for writers and marketers, and enables personalized content generation; its challenges include ensuring coherence and relevance, and dealing with ethical considerations and originality."

---

### 3.2 AI 寫作點運作：三步流程（How Does It Work?）

**機制解說：** 教材將 AI 輔助寫作濃縮做**三個步驟**，係成課嘅骨幹：

| 步驟 | 英文 | 繁中解說 |
|------|------|----------|
| 1 | **Input**（輸入） | 提供一個 **prompt 或者 idea** 俾 AI |
| 2 | **Output**（輸出） | AI **生成一份草稿（draft）** |
| 3 | **Edit**（編輯） | 你**覆核同微調（review and tweak）**，唔啱就改 |

> **English Standard Definition:** "The AI writing workflow has three steps: 1. Input — provide a prompt or idea; 2. Output — the AI generates a draft; 3. Edit — review and tweak the draft as needed."

**常見工具（Example Tools）：** **Grok**、**ChatGPT**、**Grammarly**——教材將 Grammarly 都列入生成式文字工具（佢而家都有 AI 改寫功能）。

**考試重點：** 三步順序（Input → Output → Edit）好可能出 ordering 題；記住**「Edit 永遠喺最後、由人做」**——呼應 §3.7「AI 只係起點」。

---

### 3.3 開始使用 AI（Getting Started with AI）

**機制解說：** 教材俾咗一個入門路線圖：

1. **揀工具**（Choose a tool）— 例如 **ChatGPT by OpenAI**。
2. **註冊或者經學院平台使用**（Sign up or access via institute platform）— 例如 **https://genai.vtc.edu.hk/**（VTC 官方 GenAI 平台，學生用學院帳戶登入）。
3. **由簡單 prompt 開始**（Start with simple prompts）。
4. **用日常任務練習**（Practice with everyday tasks）。

> **English Standard Definition:** "To get started with AI, choose a tool such as ChatGPT, sign up or access the institute platform (e.g. genai.vtc.edu.hk), start with simple prompts, and practice with everyday tasks."

**考試重點：** VTC 學生用 AI 要**經學院認可平台**（genai.vtc.edu.hk）——呢個係「institute guidelines」嘅具體例子，會喺倫理題出現（見 §3.8）。

---

### 3.4 用 AI 寫電郵：Step 1–3 完整拆解（Writing Emails with AI）

**機制解說：** 教材用「提組員 deadline」做示範，行一次三步流程。

**Step 1 — Input（輸入 prompt）：**
> Prompt: "Write an email to a groupmate reminding them of a deadline."

**Step 2 — Output（AI 出草稿）：** AI 按照 prompt 自動生成一份電郵草稿（教材以截圖顯示範例輸出）——因為 prompt 簡單，輸出會係一份**通用**嘅提提你電郵。

**Step 3 — Review & Edit（覆核與修改）：**
- **Review（覆核）**：檢查 **tone（語氣）、accuracy（準確性）、details（細節）**。
- **Edit（修改）**：**加入個人化內容或者具體細節**（add personal touches or specifics）——例如 deadline 嘅實際日期、project 名、組員名。

> **English Standard Definition:** "When writing emails with AI, review the draft for tone, accuracy and details, then edit by adding personal touches or specific information such as dates, project names and names of recipients."

**考試重點：** 「點解 Step 3 唔可以慳？」— 因為 AI 唔知道你 groupmate 個名、deadline 實際幾時、語氣應該幾 casual——**人先有 context，所以要 edit**。

---

### 3.5 ICIO Prompt 框架（Recap）— 電郵場景版四大元素

**機制解說：** **ICIO** = **Input, Context, Instruction, Output**。教材標明係「Recap（重溫）」——因為呢四個概念同 02 課嘅 **4 Elements of a Prompt（Instructions / Context / Input Data / Output Indicator）** 本質一樣，只係**次序同包裝唔同**：ICIO 以 **Input 行先**（先講「想處理嘅核心諗法」），適合**文書電郵**呢類簡單任務。記住 ICIO 係「**simple framework**」，「**perfect for clerical email tasks**」。

> **English Standard Definition:** "The ICIO prompt technique stands for Input, Context, Instruction and Output; it is a simple framework for AI prompts that helps create clear, effective email drafts and is perfect for clerical email tasks."

**四部分逐個拆（連教材例子——「deadline reminder 電郵」）：**

| ICIO 部分 | 繁中概念 | 教材例子 | 作用 |
|-----------|----------|----------|------|
| **I — Input** | 起點：你想處理嘅**核心諗法／主題** | "A deadline reminder" | 話俾 AI 知**由咩開始**（keep it short and specific — 要短而具體） |
| **C — Context** | **背景資料**：邊個、邊度、點解 | "For your module lecturer" | 加 **who / where / why**，AI 先識**調整語氣同內容**（tailor tone and content） |
| **I — Instruction** | 叫 AI **做咩**：行動指令 | "Write a polite email" | 用清晰動詞 **"draft"、"suggest"、"summarize"** 指明**任務類型** |
| **O — Output** | **想要嘅結果**：格式／風格規格 | "Short email, professional tone" | 定義 **length（長度）、style（風格）、format（格式）**，確保符合期望 |

> **English Standard Definition:** "Input tells the AI the core idea to work with and should be kept short and specific; Context adds background details such as who, where or why, which helps the AI tailor tone and content; Instruction states what to do, using clear task verbs such as draft, suggest or summarize; Output defines the desired length, style or format so the AI meets your expectations."

**同 02 課對照（考試易出跨課概念題）：**

| ICIO（03 課） | 4 Elements（02 課） |
|---------------|----------------------|
| Input | ≈ Input Data |
| Context | = Context |
| Instruction | ≈ Instructions |
| Output | = Output Indicator |

**口訣：** 「**先講主題（Input）→ 再補背景（Context）→ 落指令（Instruction）→ 鎖格式（Output）**」。

---

### 3.6 有效使用 AI 嘅貼士（Tips for Effective AI Use）

**機制解說：** 教材列出四條實用貼士，全部係「寫 prompt」層面嘅要求：

1. **Prompt 要具體**（Be specific in prompts）— 例如直接講 "formal tone"，而唔係「寫好啲」。
2. **Prompt 要短而清晰**（Keep prompts short and clear）。
3. **永遠校對 AI 輸出**（Always proofread AI output）。
4. **將 AI 當起點，唔好當最終成品**（Use AI as a starting point, not the final product）。

> **English Standard Definition:** "For effective AI use: be specific in prompts (e.g. specify a 'formal tone'), keep prompts short and clear, always proofread the AI output, and use AI as a starting point rather than the final product."

**考試重點：** 第 4 點同 §3.4 Step 3 係同一訊息嘅兩面——**人要做最後把關**。

---

### 3.7 常見錯誤（Common Mistakes to Avoid）

**機制解說：** 教材列出四大常見錯誤——呢度幾乎必考（MCQ 最愛「以下邊個係 common mistake？」）：

1. **過度依賴 AI 而唔編輯**（Over-relying on AI without editing）— 直接交 AI 原文就算。
2. **用模糊 prompt**（Using vague prompts）— 例子："write an email"（冇講對象、語氣、長度）。反例：加 "formal tone"、加 Context。
3. **無視學院嘅 AI 使用政策**（Ignoring institute policies on AI use）。
4. **唔記得個人化訊息**（Forgetting to personalize messages）— 冇加個人資料／細節，封信好似罐頭。

> **English Standard Definition:** "Common mistakes when using AI include over-relying on AI without editing, using vague prompts such as 'write an email', ignoring institute policies on AI use, and forgetting to personalize messages."

**考試重點：** 「點解『write an email』係 vague prompt？」— 因為佢冇交代 **who（俾邊個）、why（做咩）、tone、length**——用 ICIO 補齊就唔會 vague。

---

### 3.8 私隱與倫理（Privacy & Ethics）

**機制解說：** 教材強調四條責任守則：

1. **唔好喺 prompt 分享敏感資料**（Don't share sensitive data in prompts）— 例如身份證號碼、銀行資料、他人個人資料。
2. **遵守學院指引**（Follow institute guidelines on AI tools）— 例如用 genai.vtc.edu.hk、跟老師對 AI 使用嘅要求。
3. **負責任同透明地使用 AI**（Use AI responsibly and transparently）。
4. **需要時註明 AI 協助**（Credit AI assistance if required）— 例如報告入面聲明用咗 AI 幫手。

> **English Standard Definition:** "When using AI, do not share sensitive data in prompts, follow institute guidelines on AI tools, use AI responsibly and transparently, and credit AI assistance if required."

**考試重點：** 「sensitive data 包括啲咩」＋「幾時要 credit AI」— 兩個都係 short question 常客。VTC 學生答題時可以引用 genai.vtc.edu.hk 做 institute platform 例子。

---

### 3.9 實例應用（Practical Examples）

**機制解說：** 教材示範三個「由一句 prompt 開始」嘅實際任務——全部係溝通文件寫作。

#### Example 1 — Scheduling（約會議）

> Prompt: "Draft an email to schedule a meeting."

**解說：** 用動詞 **Draft**（呼應 ICIO Instruction 用 draft/suggest/summarize）起 prompt，AI 出一封約會電郵草稿，你再補日期時間地點。

#### Example 2 — Announcement（發通告）

> Prompt: "Write an announcement email about a student council event."

**解說：** 寫學生會活動通告——如果加埋 ICIO 嘅 Context（event 名、日期、對象）同 Output（幾多字、正式定輕鬆），效果更好。

#### Example 3 — Cover Letter（求職信）——重點案例

**第一步 — 反面教材（Don't make this cover letter mistake 🤮）：** 教材先示範一份 **AI 求職信失敗作**，兩個致命問題：

- **封信太長**（The cover letter is just too long）
- **完全冇結構**（There is no structure in the letter）

份失敗作仲暴露咗一個 vague prompt 嘅特徵：內容東拉西扯（做過好多唔同 job、學過啲唔相關嘢、連應徵個職位係咩都「not totally sure」）——因為 prompt 只係講 "Write a cover letter"，AI 冇資料就靠估、亂吹。

> **English Standard Definition:** "A cover letter produced from the vague prompt 'Write a cover letter' can be too long and unstructured, because the AI has no specific information about the company, the position or the applicant's relevant experience."

**第二步 — 用具體資料重寫（Rewrite with the following information）：** 教材叫你用以下資料重寫 prompt：

| 資料 | 內容 |
|------|------|
| Apply Company | VTC |
| Job Title | Assistant Lecturer |
| Previous Company | ABC Company |
| Working Experience | 5-year working experience of Teaching Assistant |

**第三步 — 建議 prompt（Suggested Prompt）：**

> Suggested Prompt: "Write a cover letter to apply for an assistant lecturer position at VTC company. Highlight that I have 5 years of teaching assistant experience at ABC company."

**解說：** 留意呢條 prompt 點解有效——**指定咗公司（VTC）＋職位（assistant lecturer）＋要突出嘅賣點（5 年 TA 經驗）**，AI 就唔會再靠估亂寫。呢個正正示範咗：**寫 prompt 之前，你要知道自己有咩料可以擺入去（Input/Context 有內容先有得俾 AI）**。

> **English Standard Definition:** "A specific prompt states the target company and job title and highlights the applicant's relevant experience, for example: 'Write a cover letter to apply for an assistant lecturer position at VTC company. Highlight that I have 5 years of teaching assistant experience at ABC company.'"

**考試重點：** 「點解第一份 cover letter 咁差？」答案兩點：**太長＋冇結構**；「點解條新 prompt 有效？」答案：**有具體資料（公司、職位、經驗），AI 有據可依**。

---

## 4. 📖 必考英文術語與答題句型庫 (Core Vocabulary & Exam Key Phrases)

| 英文專有名詞 | 繁體中文概念解釋 | 考試標準英文句型 (Exam Answer Phrase) |
|-------------------|------------------|----------------------------------------|
| generative text | 生成式文字——AI 自動產生嘅文字內容 | "Generative text enhances creativity and productivity and enables personalized content generation." |
| creativity / productivity | 創造力 / 生產力 | "AI tools enhance creativity and productivity for writers and marketers." |
| coherence | 連貫性（內容前後一致） | "One challenge of generative text is ensuring coherence and relevance of the output." |
| relevance | 關聯性（內容切題） | "The generated content must remain relevant to the user's request." |
| originality | 原創性 | "Ethical considerations and originality are challenges when using AI-generated content." |
| prompt | 輸入俾 AI 嘅指示文字 | "A prompt is the input or instruction given to the AI model." |
| draft | AI 生成嘅初稿 | "The AI generates a draft which the user then reviews and edits." |
| ICIO framework | Input–Context–Instruction–Output 電郵 prompt 框架 | "ICIO stands for Input, Context, Instruction and Output; it helps create clear, effective email drafts." |
| input (ICIO) | 起點：要處理嘅核心諗法 | "The input is the starting point, such as 'a deadline reminder'; it should be short and specific." |
| context (ICIO) | 背景：who / where / why | "The context adds background details such as who, where or why, helping the AI tailor tone and content." |
| instruction (ICIO) | 任務：叫 AI 做咩 | "The instruction states what to do, using clear verbs such as draft, suggest or summarize." |
| output (ICIO) | 結果規格：長度／風格／格式 | "The output defines the desired length, style or format so the AI meets your expectations." |
| tone | 語氣（formal / polite / casual） | "Specify the tone, for example 'formal tone' or 'professional tone', to get suitable language." |
| proofread | 校對 AI 輸出 | "Always proofread the AI output before sending or submitting it." |
| starting point | 起點（唔係最終成品） | "Use AI as a starting point, not the final product." |
| vague prompt | 模糊嘅提示（例如 "write an email"） | "A vague prompt such as 'write an email' lacks details about the recipient, tone and length." |
| personalize | 個人化訊息 | "Forgetting to personalize messages is a common mistake; add personal touches or specific details." |
| sensitive data | 敏感資料（唔應該放入 prompt） | "Sensitive data such as personal or financial information must not be shared in prompts." |
| institute guidelines / policies | 學院對 AI 使用嘅指引／政策 | "Users should follow institute guidelines on AI tools and use AI responsibly and transparently." |
| credit AI assistance | 註明 AI 協助 | "Credit AI assistance if required by the institution or the task." |
| cover letter | 求職信 | "A cover letter should be focused and structured; a vague prompt produces a letter that is too long and unstructured." |

---

## 5. 🗺️ 循序漸進學習路線 (Learning Path)

### 階段 1：先理解觀念（Concepts First）
1. 記住 **三步流程：Input → Output → Edit**——Edit 永遠由人做。
2. 理解生成式文字嘅**好處（creativity／productivity／personalization）同挑戰（coherence／relevance／ethics／originality）**。
3. 明白 **ICIO 四部分各自做咩**，同 02 課 4 Elements 嘅對應關係。
4. 明白「**vague prompt = 冇 context = AI 靠估**」呢條核心因果鏈。

### 階段 2：背誦英文短語（Memorise Key Phrases）
- "ICIO stands for Input, Context, Instruction and Output."
- "Use AI as a starting point, not the final product."
- "Always proofread the AI output."
- "Do not share sensitive data in prompts."
- "A vague prompt such as 'write an email' should be replaced by a specific one."
- "Credit AI assistance if required."

### 階段 3：掌握實作（Hands-on Mastery）
- 用 **ICIO** 寫一個「提組員 deadline」prompt：Input（deadline reminder）→ Context（group project、module lecturer）→ Instruction（write a polite email）→ Output（short email, professional tone）。
- 攞一份「**Write a cover letter**」嘅失敗輸出，用資料（公司、職位、5 年經驗）重寫 prompt 再比較。
- 用 genai.vtc.edu.hk（或者 ChatGPT）實測：同一任務分別用 **vague prompt** 同 **ICIO prompt**，對比兩份輸出質素。
- 練習 Review & Edit：喺 AI 草稿上加個人化細節（名、日期、project 名），再檢查 tone／accuracy。

### 階段 4：能解答嘅英文考題（Exam-ready Questions）
- **Ordering:** "排列 AI 寫作流程嘅三步。" → Input → Output → Edit。
- **Framework:** "Name the four parts of the ICIO framework." → Input, Context, Instruction, Output。
- **Label:** 「'For your module lecturer' 喺 ICIO 入面屬於邊部分？」→ Context。
- **Distinguish:** 「ICIO 嘅 Input 同 Context 有咩分別？」→ Input 係核心主題（短而具體）；Context 補 who/where/why 等背景。
- **Mistake:** "點解 'write an email' 係一個 vague prompt？" → 冇對象、語氣、長度、細節。
- **Ethics:** "Why should sensitive data not be put into prompts?" → 私隱風險＋機構指引。
- **Improve:** 「用以下資料改寫 cover letter prompt：VTC、Assistant Lecturer、ABC Company、5 年 TA 經驗」→ 寫出對應 suggested prompt。

---

## 6. 🎒 考前 5 分鐘雙語懶人包 (Cheat Sheet)

### 6.1 ICIO 極速記憶表（必背）

| 字母 | 全寫 | 一句記住 | 教材例子 |
|------|------|----------|----------|
| I | **Input** | 「做咩主題」— 短而具體嘅起點 | "A deadline reminder" |
| C | **Context** | 「咩背景」— who/where/why | "For your module lecturer" |
| I | **Instruction** | 「叫佢點做」— draft/suggest/summarize | "Write a polite email" |
| O | **Output** | 「點樣交貨」— length/style/format | "Short email, professional tone" |

**口訣：**「**I 主題 → C 背景 → I 指令 → O 格式**」；等同 02 課 4 Elements 嘅 Input Data / Context / Instructions / Output Indicator。

### 6.2 電郵 + 求職信 prompt 對照

| 任務 | Vague（差） | Specific（好） |
|------|-------------|----------------|
| 提 deadline | "Write an email to a groupmate reminding them of a deadline." | 同上＋ICIO：Context（project 名、實際日期）＋Output（short, polite tone） |
| 求職信 | "Write a cover letter" | "Write a cover letter to apply for an assistant lecturer position at VTC company. Highlight that I have 5 years of teaching assistant experience at ABC company." |

### 6.3 快速 checklist（貼士 vs 錯誤 vs 倫理）

- ✅ **做**：prompt 具體（講 tone）；prompt 短而清晰；proofread；AI 當起點；加個人化內容；跟學院指引；需要時 credit AI。
- ❌ **唔好**：過度依賴唔編輯；用 vague prompt（"write an email"）；無視 institute policies；唔個人化；喺 prompt 放 sensitive data。
- 🌐 VTC 平台：**genai.vtc.edu.hk**（學院認可入口）。
- 🛠️ 工具例：**Grok、ChatGPT、Grammarly**。

### 6.4 最容易失分位（考官陷阱）

1. **ICIO 次序**：係 **Input 行先**，唔係 Instruction 行先（同 02 課 4 Elements 次序唔同！）——答 ICIO 一定要跟 I–C–I–O。
2. **Input vs Context**：「A deadline reminder」（主題）係 Input；「For your module lecturer」（邊個收）係 Context——最易撈亂嘅一對。
3. **Instruction 用行動動詞**：draft / suggest / summarize——唔係描述背景。
4. **Cover letter 失敗原因**：只答「太長」唔夠，要答齊 **too long + no structure**（兩點）。
5. **Vague prompt 例子**：教材原文用 "write an email" 做反面教材——答題照引用最穩陣。
6. **AI 唔係 final product**：任何情況都要人 review & edit；唔好寫「AI 出咩就用咩」。
7. **倫理題**：sensitive data（唔入 prompt）＋ institute guidelines（要跟）＋ credit AI（需要時）三點一齊答先滿分。

### 6.5 呢課總結（一圖流）

**AI 寫溝通文件 = ICIO 起 prompt → AI 出 draft → 人 proofread + 個人化 → 先用得。** 具體資料愈多，輸出愈準；敏感資料愈少，風險愈低。📧✍️
