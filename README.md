# CV Insight

A **rule-based** Resume Parser and Job Description Matcher — built with **Next.js 16 + TypeScript**. No LLMs, no AI APIs. Every extraction is done using regex patterns, a curated skills dictionary, and section-header heuristics.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)
![No LLMs](https://img.shields.io/badge/No%20LLMs-Rule--based%20only-green)

---

## Features

- **Resume Parsing** — Upload a PDF/TXT or paste text. Extracts name, email, phone, salary, years of experience, and skills.
- **JD Parsing** — Upload one or more JD files or paste text. Extracts role, company, salary, required skills, optional skills, and a role summary.
- **Skill Matching** — Every JD skill is mapped against the resume: `{ skill, presentInResume }`.
- **Match Score** — Calculated as `(Matched Skills / Total JD Skills) × 100`.
- **Multiple JDs** — Match a single resume against multiple job descriptions at once, ranked by score.
- **REST API** — `POST /api/match` accepts multipart form data and returns structured JSON.
- **Interactive UI** — Drag-and-drop uploads, skill gap breakdown, collapsible raw JSON output.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| PDF Parsing | `pdf-parse` v2 (no LLM) |
| Extraction | Custom regex + rule-based logic |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/resume-matching-system.git
cd resume-matching-system

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [https://cv-insight-jobfit.vercel.app](https://cv-insight-jobfit.vercel.app) in your browser.

---

## Usage

### Using the Web UI

1. **Upload or paste your resume** (PDF or plain text)
2. **Upload or paste one or more job descriptions**
3. Click **"Match Resume to Jobs"**
4. View results — match scores, skill gap analysis, and raw JSON output

### Using the API directly

```bash
curl -X POST http://localhost:3000/api/match \
  -F "resume=@/path/to/resume.pdf" \
  -F "jdText=Software Engineer role. Java Spring Boot required. Docker Kubernetes preferred."
```

---

## API Reference

### `POST /api/match`

**Content-Type:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `resume` | `File` | Resume as PDF or TXT |
| `resumeText` | `string` | Resume pasted as plain text |
| `jd[]` | `File[]` | One or more JD files (PDF or TXT) |
| `jdText` | `string` | JD pasted as plain text (repeatable) |

**Response:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9999999999",
  "salary": null,
  "yearOfExperience": 4.5,
  "resumeSkills": ["Java", "Spring Boot", "Docker", "React"],
  "matchingJobs": [
    {
      "jobId": "JD001",
      "role": "Backend Developer",
      "company": "Capgemini",
      "aboutRole": "Responsible for backend development using Java and microservices.",
      "requiredSkills": ["Java", "Spring Boot", "Kafka", "Microservices"],
      "optionalSkills": ["Python", "Azure", "CI/CD"],
      "skillsAnalysis": [
        { "skill": "Java", "presentInResume": true },
        { "skill": "Kafka", "presentInResume": false }
      ],
      "matchingScore": 75,
      "salary": "12 LPA",
      "yearsOfExperience": 7
    }
  ]
}
```

---

## Project Structure

```
├── app/
│   ├── api/match/route.ts     # POST /api/match — main API handler
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── MatcherPage.tsx        # Main UI (client component)
│   ├── FileDropzone.tsx       # Drag-and-drop file input
│   ├── JobCard.tsx            # Per-JD result card with skill breakdown
│   ├── ResumeProfile.tsx      # Candidate summary card
│   └── ScoreBadge.tsx        # Colour-coded score badge and bar
├── lib/
│   ├── extractors/
│   │   ├── salaryExtractor.ts     # Regex: LPA, CTC ₹, USD ranges
│   │   ├── experienceExtractor.ts # Section-aware date-range calculator
│   │   ├── skillsExtractor.ts     # Dictionary-based skill matching
│   │   └── textUtils.ts           # Name, email, phone, role, aboutRole
│   ├── parsers/
│   │   ├── pdfParser.ts           # pdf-parse v2 wrapper
│   │   ├── resumeParser.ts        # Orchestrates resume extraction
│   │   └── jdParser.ts            # Orchestrates JD extraction
│   ├── matcher.ts                 # Scoring engine
│   └── skillsDb.ts                # 100+ skills with aliases
├── types/
│   └── index.ts                   # Shared TypeScript interfaces
├── sample-output.json             # Example API response
├── vercel.json                    # Vercel deployment config
└── next.config.ts
```

---

## Extraction Logic

### Salary
Handles multiple formats:
- Indian: `12 LPA`, `CTC: ₹10,00,000 per annum`
- USD range: `$139,000 -- $257,550 annually`, `$180,000 - $220,000`
- Bare range: `61087 - 104364`

### Experience
- Explicit: `"5+ years of experience"`, `"7 years handson experience"`
- From date ranges: Sums up work history dates from the **Experience section only** (ignores Education and Projects sections)
- Fresher detection: `0` if `"fresher"` or `"entry-level"` is found

### Skills
- Matches against a dictionary of 100+ skills with canonical names and aliases
- Example: `"reactjs"`, `"react.js"`, `"react js"` → all resolve to `"React"`
- Categorised: programming, framework, database, cloud, devops, AI/ML, concepts

### Required vs Optional Split
Splits JD text on section headers like `"Preferred Qualifications"`, `"Good to have"`, `"Desired Skills"`, `"Nice to have"`.

---

## Deployment

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Select the repo — Vercel auto-detects Next.js
4. Click **Deploy**

No environment variables are required.

### Via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## Constraint Compliance

> ✅ **No LLMs used.** This project strictly follows the assignment constraint. All extraction uses regex patterns, a manually curated skill dictionary, and section-header heuristics. No calls are made to OpenAI, Gemini, Claude, or any AI-based API.

---

## Sample Output

See [`sample-output.json`](./sample-output.json) for a full example response.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
