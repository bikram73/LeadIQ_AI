# 🎯 LeadIQ AI – AI-Powered Lead Qualification Agent

<div align="center">

![LeadIQ AI Banner](https://img.shields.io/badge/LeadIQ_AI-B2B_Sales_Qualification-006b2c?style=for-the-badge&logo=google&logoColor=white)
<br/>

[![React](https://img.shields.io/badge/React-19.0.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini 3.8 Flash](https://img.shields.io/badge/AI_Engine-Gemini_3.8_Flash-4285F4?style=flat-square&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

<p align="center">
  <b>Qualify, score, and prioritize B2B inbound sales leads in real time with enterprise AI reasoning.</b><br/>
  Transform raw contact submissions, unformatted email inquiries, and bulk CSV uploads into scored, ranked, and action-ready prospect pipelines.
</p>

</div>

---

# 📑 Table of Contents

<div align="center">

| **<div align="center">📖 Description</div>** | **<div align="center">🚀 Section</div>** |
|--------------------------------------------------------------|------------------------------------------------|
| <div align="center">**View the project features and capabilities.** 👉</div> | <div align="center"><a href="#features"><img src="https://img.shields.io/badge/✨%20Features-4F46E5?style=for-the-badge" /></a></div> |
| <div align="center">**View the technologies, frameworks, and programming languages used.** 👉</div> | <div align="center"><a href="#tech-stack"><img src="https://img.shields.io/badge/🛠️%20Tech%20Stack-0891B2?style=for-the-badge" /></a></div> |
| <div align="center">**Explore the project's folder and file organization.** 👉</div> | <div align="center"><a href="#file-structure"><img src="https://img.shields.io/badge/📂%20File%20Structure-10B981?style=for-the-badge" /></a></div> |
| <div align="center">**Follow the installation steps and local development setup.** 👉</div> | <div align="center"><a href="#installation"><img src="https://img.shields.io/badge/🚀%20Installation-F97316?style=for-the-badge" /></a></div> |
| <div align="center">**View the available REST API endpoints and usage examples.** 👉</div> | <div align="center"><a href="#api"><img src="https://img.shields.io/badge/🌐%20API%20Documentation-0EA5E9?style=for-the-badge" /></a></div> |
| <div align="center">**Understand the 7-factor scoring logic and weights.** 👉</div> | <div align="center"><a href="#scoring-logic"><img src="https://img.shields.io/badge/🧠%20Scoring%20Logic-8B5CF6?style=for-the-badge" /></a></div> |
| <div align="center">**Review the standard benchmark dataset and test suite.** 👉</div> | <div align="center"><a href="#benchmark-dataset"><img src="https://img.shields.io/badge/📊%20Benchmarks-14B8A6?style=for-the-badge" /></a></div> |
| <div align="center">**Understand the current limitations and known failure cases of the AI extractor.** 👉</div> | <div align="center"><a href="#limitations"><img src="https://img.shields.io/badge/⚠️%20Known%20Limitations-EF4444?style=for-the-badge" /></a></div> |
| <div align="center">**Inspect environment configuration and CLI build scripts.** 👉</div> | <div align="center"><a href="#environment--scripts"><img src="https://img.shields.io/badge/⚙️%20Config%20&%20Scripts-64748B?style=for-the-badge" /></a></div> |

</div>

---

<a name="features"></a>
## ✨ Project Features & Capabilities

LeadIQ AI replaces manual sales research, subjective qualification guesses, and rigid IF/THEN rules with a high-accuracy AI qualification engine.

### 📥 1. Multi-Modal Lead Ingestion
- **Manual Qualification Form**: Input full prospect details including company name, role/title, company size, budget, location, specific technical requirements, and sales notes.
- **Unstructured Email Extractor**: Paste raw, unformatted email threads or contact inquiries directly. The AI extractor extracts contact identity, organization details, explicit project requirements, timelines, and budget indicators automatically.
- **Bulk CSV Upload & Processing**: Ingest batch lead sheets (.csv) via drag-and-drop or file picker. Automatically maps columns (`Name`, `Company`, `Role`, `Budget`, `Requirements`, etc.) and batch-qualifies them.
- **One-Click Benchmark Presets**: Rapidly load pre-calibrated B2B benchmark lead datasets into the pipeline for testing, demos, and verification.

### 🧠 2. 7-Factor Weighted AI Scoring Engine
- Deep contextual reasoning evaluates prospects on a **0–100 numerical scale** backed by strict B2B qualification criteria.
- Provides a detailed **Factor Breakdown** for every lead:
  - **Buying Intent (25%)**
  - **Budget Availability (20%)**
  - **Decision Maker Involvement / Role Authority (15%)**
  - **Timeline & Urgency (15%)**
  - **Company Size (10%)**
  - **Industry Fit (10%)**
  - **Requirement Clarity (5%)**

### 🏷️ 3. Intelligent Tier & Fit Classification
- **Tiers**: `Hot` (90–100), `Warm` (70–89), `Cold` (40–69), and `Very Low` (0–39).
- **Fit Scores**: `Excellent`, `Good`, `Average`, `Poor`.
- **Intent Indicators**: `High`, `Medium`, `Low`.
- **Prescriptive Next Actions**: Dynamically generates targeted sales recommendations (e.g., *"Schedule Executive Demo"*, *"Call Immediately"*, *"Send Proposal"*, *"Share Product Information"*, *"Add to Nurture Campaign"*).
- **AI Rationale & Summary**: Generates concise 2-sentence executive summaries and bulleted reasoning points detailing why the lead received their score.

### 📊 4. Real-Time CRM Pipeline Dashboard
- **KPI Metrics Bar**: Live counters for Total Leads, Hot Leads, Warm Leads, Cold/Unqualified Leads, and Average Overall Pipeline Score.
- **Dynamic Re-Ranking**: Leads automatically order by rank (#1, #2, ...) whenever new leads are analyzed or existing ones updated.
- **Interactive Multi-Tier Filter & Search**: Instantly filter by Tier (`ALL`, `HOT`, `WARM`, `COLD`, `VERY LOW`) and search in real time across prospect names, companies, roles, industries, and technical requirements.
- **Lead Detail Drawer / Inspection View**: Click any lead to inspect their complete profile, visual factor breakdown bars, reasoning points, and next steps.

### 💾 5. Data Export & Interoperability
- **Export to CSV**: Download the qualified pipeline as a clean, standardized spreadsheet file ready for import into Salesforce, HubSpot, or Google Sheets.
- **Export to JSON**: Download complete structured JSON with raw factor breakdowns, timestamp metadata, and AI rationale.

### 🛡️ 6. Zero-Downtime Smart Fallback System
- Features a resilient server architecture: If the `GEMINI_API_KEY` is temporarily unconfigured or rate-limited, the application seamlessly activates an internal semantic heuristic fallback engine, ensuring the user experience never crashes or fails.

---

<a name="tech-stack"></a>
## 🛠️ Tech Stack & Programming Languages

<div align="center">

| Layer | Technology | Version | Purpose |
|:------|:-----------|:--------|:--------|
| **Frontend Framework** | `React` | `^19.0.1` | Declarative component UI and reactive state management |
| **Language** | `TypeScript` | `~5.8.2` | End-to-end type safety across client and server |
| **Build Tool & Bundler** | `Vite` | `^6.2.3` | High-speed HMR, client bundling, and middleware integration |
| **Styling** | `Tailwind CSS` | `^4.1.14` | Modern utility-first responsive styling |
| **Animations** | `Motion` (Framer Motion) | `^12.23.24` | Smooth transitions and state animations |
| **Icons** | `Lucide React` & `Material Symbols` | `^0.546.0` | Enterprise iconography and visual cues |
| **Backend Server** | `Express` | `^4.21.2` | RESTful API server running on port 3000 |
| **Runtime Execution** | `tsx` | `^4.21.0` | Native TypeScript execution for the Node.js server |
| **AI SDK** | `@google/genai` | `^2.4.0` | Official Google GenAI SDK powering Gemini 3.8 Flash |
| **Bundling (Server)** | `esbuild` | `^0.25.0` | Production Node.js CJS server compilation |
| **Environment** | `dotenv` | `^17.2.3` | Local environment variables management |

</div>

### 💻 Languages Breakdown
- **TypeScript (`.ts`, `.tsx`)**: Primary application code for both client components and server endpoints (~92%)
- **HTML5 (`.html`)**: Application entrypoint and OpenGraph/SEO metadata (~4%)
- **CSS3 (`.css`)**: Tailwind CSS entrypoint with custom styling tokens (~2%)
- **JSON (`.json`)**: Configuration, metadata, and dependencies (~2%)

---

<a name="file-structure"></a>
## 📂 File Structure

```text
├── index.html                   # HTML entrypoint with metadata, fonts & favicon
├── metadata.json                # Project capabilities & permissions manifest
├── package.json                 # Project dependencies, scripts & metadata
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite bundler plugins (React & Tailwind CSS v4)
├── server.ts                    # Express backend, Gemini AI integration & fallback engine
├── .env.example                 # Example environment variables template
├── README.md                    # Comprehensive documentation and API guide
├── public/                      # Static assets & public resources
└── src/
    ├── main.tsx                 # React DOM client bootstrap
    ├── App.tsx                  # Root component, routing tabs & state management
    ├── index.css                # Global CSS with Tailwind v4 theme directives
    ├── types.ts                 # TypeScript types (Lead, FactorBreakdown, API models)
    ├── components/              # Modular UI components
    │   ├── Navbar.tsx           # Global navigation bar with brand logo & tab triggers
    │   ├── HomeScreen.tsx       # Landing page with hero, value props & workflow cards
    │   ├── LeadAnalyzerScreen.tsx # Lead qualification engine (Manual, Email & CSV)
    │   ├── DashboardScreen.tsx  # CRM pipeline table, search, filters & export tools
    │   ├── ScoringLogicScreen.tsx # Transparent 7-factor weights, code preview & FAQ
    │   └── Footer.tsx           # Application footer & status indicator
    ├── services/
    │   └── apiService.ts        # Client-side API client & local heuristic fallback
    └── data/
        └── sampleLeads.ts       # PRD benchmark test suite (David Brown, John Carter, etc.)
```

---

<a name="installation"></a>
## 🚀 Installation & Local Development Setup

Follow these steps to set up and run LeadIQ AI locally on your system:

### 📋 Prerequisites
- **Node.js**: `v18.0.0` or higher (`v20+` recommended)
- **Package Manager**: `npm` (comes with Node), `bun`, or `pnpm`
- **Gemini API Key**: (Optional but recommended for full AI evaluation) Obtain a key from [Google AI Studio](https://aistudio.google.com/).

### 📦 Step-by-Step Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/leadiq-ai.git
cd leadiq-ai
```

#### 2. Install Project Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```

Open `.env` in your text editor and add your Gemini API Key:
```env
# Gemini API Key for server-side AI evaluation (Gemini 3.8 Flash)
GEMINI_API_KEY="AIzaSyYourActualGeminiApiKeyGoesHere"

# Port (default is 3000)
PORT=3000

# Base URL for the app
APP_URL="http://localhost:3000"
```
> **Note**: If `GEMINI_API_KEY` is not provided, the application will automatically operate using its built-in heuristic fallback engine.

#### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

#### 5. Build for Production
To generate an optimized production bundle and compile the server:
```bash
npm run build
npm start
```

---

<a name="api"></a>
## 🌐 REST API Documentation

LeadIQ AI exposes RESTful endpoints for automated integrations with webhooks, forms, or CRM workflows.

### 1. Health Check
Checks server availability and active AI model identifier.

- **Endpoint**: `GET /api/health`
- **Response**:
```json
{
  "status": "ok",
  "model": "gemini-3.8-flash",
  "app": "LeadIQ AI"
}
```

---

### 2. Analyze Single Lead
Qualifies and scores a single prospect using Gemini 3.8 Flash with structured JSON output.

- **Endpoint**: `POST /api/analyze`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "lead": {
    "fullName": "David Brown",
    "company": "BuildPro",
    "industry": "Construction",
    "jobTitle": "CEO",
    "companySize": "500-1000",
    "budget": "$120,000",
    "location": "Dallas, TX",
    "requirements": "Enterprise AI Assistant for field & executive team",
    "notes": "CEO requested demo directly. High budget commitment.",
    "email": "david.brown@buildpro.com"
  }
}
```

- **Example cURL**:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "lead": {
      "fullName": "David Brown",
      "company": "BuildPro",
      "industry": "Construction",
      "jobTitle": "CEO",
      "budget": "$120,000",
      "requirements": "Enterprise AI Assistant"
    }
  }'
```

- **Response Body**:
```json
{
  "success": true,
  "source": "gemini-3.8-flash",
  "result": {
    "lead_score": 97,
    "fit_score": "Excellent",
    "intent": "High",
    "tier": "Hot",
    "summary": "BuildPro CEO requested an enterprise AI assistant with a $120k budget and immediate executive sponsorship.",
    "reasoning": [
      "High budget ($120,000) well above average enterprise tier",
      "Direct C-level decision maker (CEO) leading the evaluation",
      "Urgent timeline with clear project requirements",
      "Strong organizational fit with high seat expansion potential"
    ],
    "next_action": "Schedule Executive Demo",
    "factor_breakdown": {
      "budgetAvailability": 20,
      "buyingIntent": 25,
      "companySize": 9,
      "decisionMaker": 15,
      "timelineUrgency": 14,
      "industryFit": 9,
      "requirementClarity": 5
    }
  }
}
```

---

### 3. Bulk CSV / Batch Lead Qualification
Batch-evaluates an array of multiple leads in a single request.

- **Endpoint**: `POST /api/analyze-csv`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "leads": [
    {
      "fullName": "David Brown",
      "company": "BuildPro",
      "jobTitle": "CEO",
      "budget": "$120,000",
      "requirements": "Enterprise AI Assistant"
    },
    {
      "fullName": "John Carter",
      "company": "TechNova",
      "jobTitle": "VP of Customer Success",
      "budget": "$80,000",
      "requirements": "AI Customer Support Automation"
    }
  ]
}
```

- **Response Body**:
```json
{
  "success": true,
  "results": [
    {
      "lead_score": 97,
      "fit_score": "Excellent",
      "intent": "High",
      "tier": "Hot",
      "next_action": "Schedule Executive Demo"
    },
    {
      "lead_score": 92,
      "fit_score": "Excellent",
      "intent": "High",
      "tier": "Hot",
      "next_action": "Call Immediately"
    }
  ]
}
```

---

<a name="scoring-logic"></a>
## 🧠 Scoring Methodology & 7 Weighted Factors

LeadIQ AI calculates an objective **0–100 overall score** using seven mathematically weighted factors:

<div align="center">

```
  ┌─────────────────────────────────────────────────────────────┐
  │              Overall Lead Score (0 - 100)                   │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
   ┌──────────────┬──────────────┼──────────────┬──────────────┬──────────────┬──────────────┐
   ▼              ▼              ▼              ▼              ▼              ▼              ▼
Buying Intent  Budget     Decision Maker    Timeline      Company Size  Industry Fit    Clarity
   [25%]        [20%]         [15%]          [15%]           [10%]         [10%]          [5%]
```

</div>

| Factor | Weight | Max Points | Evaluation Criteria |
|:-------|:------:|:----------:|:--------------------|
| **1. Buying Intent** | **25%** | `25` | Detects explicit purchase signals, demo requests, and urgency phrased in communications. |
| **2. Budget Availability** | **20%** | `20` | Evaluates stated or implied budget ranges against enterprise solution tier pricing ($100k+, $50k-$100k, <$15k, unknown). |
| **3. Decision Maker Role** | **15%** | `15` | Evaluates C-Level (CEO, CTO, CIO), VP, or Director purchasing authority and organizational signing power. |
| **4. Timeline & Urgency** | **15%** | `15` | Evaluates implementation horizon (e.g., *"within 2 weeks"* vs *"exploring for next year"*). |
| **5. Company Size** | **10%** | `10` | Scales based on employee headcount (500+, 100-500, 10-50) and deployment capacity. |
| **6. Industry Fit** | **10%** | `10` | Compares prospect industry vertical (Software, Retail, Healthcare, Construction) with Ideal Customer Profile (ICP). |
| **7. Requirement Clarity**| **5%** | `5` | Rewards specific architectural or workflow requirements over vague exploratory inquiries. |

### 🎯 Score Tiers & Automated Actions

| Score Range | Tier | Fit Score | Intent | Recommended Sales Action |
|:-----------:|:----:|:---------:|:------:|:--------------------------|
| **90 – 100** | 🟢 **Hot** | Excellent | High | **Schedule Executive Demo** or **Call Immediately** (within 1 hour) |
| **70 – 89** | 🔵 **Warm** | Good | High | **Send Proposal** or **Schedule Discovery Demo** |
| **40 – 69** | 🟡 **Cold** | Average | Medium | **Share Product Information** or **Send Educational Whitepaper** |
| **0 – 39** | ⚪ **Very Low** | Poor | Low | **Add to Nurture Campaign** or **Archive / Monitor** |

---

<a name="benchmark-dataset"></a>
## 📊 Benchmark Dataset

The system includes a validated reference test suite of real-world B2B prospect profiles:

| Rank | Lead | Company & Industry | Stated Budget | AI Score | Tier | Next Recommended Action |
|:----:|:-----|:-------------------|:-------------:|:--------:|:----:|:------------------------|
| **#1** | **David Brown**<br/><sub>CEO</sub> | **BuildPro**<br/><sub>Construction</sub> | **$120,000** | **97/100** | 🟢 Hot | **Schedule Executive Demo** |
| **#2** | **John Carter**<br/><sub>VP Customer Success</sub> | **TechNova**<br/><sub>Software / SaaS</sub> | **$80,000** | **92/100** | 🟢 Hot | **Call Immediately** |
| **#3** | **Michael Ross**<br/><sub>Head of E-Commerce</sub> | **RetailMax**<br/><sub>Retail</sub> | **$15,000** | **81/100** | 🔵 Warm | **Send Proposal** |
| **#4** | **Sarah Lee**<br/><sub>Innovation Specialist</sub> | **HealthPlus**<br/><sub>Healthcare</sub> | **Unknown** | **58/100** | 🟡 Cold | **Share Product Information** |
| **#5** | **Emma Wilson**<br/><sub>Marketing Assistant</sub> | **CreativeAds**<br/><sub>Marketing</sub> | **Not Decided** | **42/100** | ⚪ Cold | **Add to Nurture Campaign** |

---

<a name="limitations"></a>
## ⚠️ Known Limitations & AI Edge Cases

While LeadIQ AI utilizes state-of-the-art LLM reasoning, users should be aware of known edge cases:

1. **Vague or Multi-Threaded Email Inquiries**:
   - *Failure Case*: Emails containing forward history from multiple people may cause the extractor to confuse intermediate commenters with the actual decision-maker.
   - *Mitigation*: The email analyzer extracts the primary sender from the latest header block; reviewing raw email inputs before confirmation is recommended.

2. **Conditional or Split Budget Statements**:
   - *Failure Case*: Statements such as *"We have no budget this quarter, but $200k approved starting January next year"* may be penalized on immediate budget availability.
   - *Mitigation*: The AI accounts for timeline urgency, placing the lead in the `Warm` tier for subsequent follow-up.

3. **Currency Discrepancies & Colloquialisms**:
   - *Failure Case*: Non-standard currency notation (e.g., *"50L INR"* or *"80k EUR"*) may occasionally be interpreted as raw text rather than normalized USD equivalents.
   - *Mitigation*: Standardize inputs to currency symbols (`$`, `€`, `£`) or explicit digits where possible.

4. **API Rate Limits & Network Outages**:
   - *Failure Case*: Free-tier Gemini quotas or temporary network interruptions.
   - *Mitigation*: LeadIQ AI includes an automated, server-side rule and regex fallback engine that computes scores and factor breakdowns even when external APIs are unreachable.

5. **Hallucination Safeguards**:
   - The model is strictly instructed via system prompt instructions and `responseMimeType: "application/json"` to output only valid JSON matching the exact schema without conversational filler.

---

<a name="environment--scripts"></a>
## ⚙️ Environment Configuration & Scripts

### 🔑 Environment Variables Reference
| Variable | Description | Default | Required |
|:---------|:------------|:--------|:--------:|
| `GEMINI_API_KEY` | Google Gemini API key for `@google/genai` calls | `""` | Optional *(Activates fallback if empty)* |
| `PORT` | Local HTTP port for the Express application | `3000` | Optional |
| `APP_URL` | Public or development URL hosting the applet | `http://localhost:3000` | Optional |
| `NODE_ENV` | Runtime environment (`development` / `production`) | `development` | Optional |

### 📜 Available npm Scripts
- `npm run dev`: Boots the development server with live TypeScript compilation and Vite middleware.
- `npm run build`: Bundles the React client using Vite and packages `server.ts` into a standalone CommonJS bundle via `esbuild`.
- `npm run start`: Runs the compiled production server (`dist/server.cjs`).
- `npm run lint`: Executes TypeScript type checking (`tsc --noEmit`).
- `npm run clean`: Cleans built artifacts (`dist/` directory).

---

## 🤝 Contributing

Contributions, feedback, and pull requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Built with ❤️ by the LeadIQ AI Team using Google Gemini 3.8 Flash, React 19 & Tailwind CSS.</sub>
</div>
