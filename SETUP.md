# CVInsights

A **rule-based** (no LLMs) Resume Parser and Job Description Matcher built with **Next.js 16 + TypeScript**.

---

## Features

| Feature | Implementation |
|---|---|
| Resume parsing (PDF / TXT / paste) | `pdf-parse` + custom extractors |
| JD parsing (multi-file PDF / TXT / paste) | Rule-based NLP |
| Salary extraction | Regex — LPA, CTC ₹, USD ranges |
| Experience extraction | Regex + date-range calculator |
| Skills extraction | 100+ skill dictionary with aliases |
| Required vs Optional skill split | Section-header heuristics |
| Matching score | `(matched / total) × 100` |
| Skill presence mapping | `{ skill, presentInResume }` array |
| REST API | `POST /api/match` |
| Interactive UI | Next.js App Router + Tailwind CSS |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **PDF parsing**: `pdf-parse` (no LLM)
- **Extraction**: Custom regex + rule-based logic

---

## Setup & Run

```bash
# 1. Clone the repo and enter the directory
cd main

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Open http://localhost:3000

# 4. Production build
npm run build && npm start
```

---

## API Reference

### `POST /api/match`

Accepts `multipart/form-data`:

| Field | Type | Description |
|---|---|---|
| `resume` | `File` | Resume PDF or TXT file |
| `resumeText` | `string` | Resume pasted as plain text |
| `jd[]` | `File[]` | One or more JD PDF/TXT files |
| `jdText` | `string` | Single JD pasted as plain text |

**Response** (JSON):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "salary": null,
  "yearOfExperience": 5,
  "resumeSkills": ["Java", "Spring Boot", "Docker"],
  "matchingJobs": [
    {
      "jobId": "JD001",
      "role": "Backend Developer",
      "company": "Capgemini",
      "aboutRole": "Responsible for backend development…",
      "requiredSkills": ["Java", "Spring Boot", "Kafka"],
      "optionalSkills": ["Python", "Azure"],
      "skillsAnalysis": [
        { "skill": "Java", "presentInResume": true },
        { "skill": "Kafka", "presentInResume": false }
      ],
      "matchingScore": 67,
      "salary": "61087 - 104364",
      "yearsOfExperience": 7
    }
  ]
}
```

---

## Project Structure

```
app/
  api/match/route.ts     → POST /api/match handler
  layout.tsx
  page.tsx
components/
  MatcherPage.tsx        → Main UI (client component)
  FileDropzone.tsx       → Drag-and-drop file input
  JobCard.tsx            → JD match card with skill breakdown
  ResumeProfile.tsx      → Candidate profile summary
  ScoreBadge.tsx         → Colour-coded score badge + bar
lib/
  extractors/
    salaryExtractor.ts   → Regex salary extraction
    experienceExtractor.ts → Regex + date-range experience
    skillsExtractor.ts   → Dictionary-based skills extraction
    textUtils.ts         → Name / email / phone / role utilities
  parsers/
    pdfParser.ts         → pdf-parse wrapper
    resumeParser.ts      → Full resume parser
    jdParser.ts          → Full JD parser
  matcher.ts             → Scoring + MatchResult assembly
  skillsDb.ts            → 100+ skills with aliases
types/
  index.ts               → Shared TypeScript interfaces
```

---

## Constraint Compliance

> ✅ **No LLMs used.** All extraction is done via regex patterns, a curated skill dictionary, and section-header heuristics — fully rule-based.
