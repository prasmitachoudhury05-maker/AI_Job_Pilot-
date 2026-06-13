# Phase 6: Document Generation Engine - Implementation Summary

> **Note**: This is a Next.js 14 monolith with Prisma ORM and SQLite. See the project README for the current structure.

## Overview

Phase 6 has been successfully implemented, providing AI-powered document generation for cover letters, recruiter outreach messages, and interview preparation cheat sheets. All generation is powered by Groq AI with tone customization and document history management.

## Completed Deliverables

### 1. Cover Letter Generator ✅

- **Document Engine** (`src/lib/generation/documentEngine.ts`):
  - `generateCoverLetter()` — Generates role-specific cover letters using Groq AI
  - Tone adjustment support (Professional, Enthusiastic, Confident, Direct)
  - Keeps output under 400 words, engaging and concise
  - Truth validation — does NOT invent experience the candidate doesn't have
  - Connects candidate's actual resume experience to specific job requirements

### 2. Outreach Message Generator ✅

- **Document Engine** (`src/lib/generation/documentEngine.ts`):
  - `generateOutreachMessage()` — Generates networking outreach messages
  - LinkedIn Recruiter Notes (under 300 characters)
  - Hiring Manager cold emails (under 150 words)
  - References matching skills from resume to job description
  - Professional but enthusiastic tone

### 3. Interview Prep Engine ✅

- **Interview Engine** (`src/lib/generation/interviewEngine.ts`):
  - `generateInterviewPrep()` — Generates comprehensive interview cheat sheets
  - Markdown-formatted output with 4 sections:
    1. Top 3 Behavioral Questions with answering tips
    2. Technical / Skill Gap Analysis with defense strategies
    3. STAR Response stories pulled directly from resume (no hallucination)
    4. Top 3 Questions to Ask the interviewer

### 4. API Endpoints ✅

- **Documents API** (`src/app/api/v1/documents/route.ts`):
  - `POST /api/v1/documents` — Generate a new document
    - Accepts: `resumeId`, `jobId`, `documentType`, `tone`
    - Document types: `COVER_LETTER`, `OUTREACH_LINKEDIN`, `OUTREACH_EMAIL`
    - Saves generated document to database with job association
  - `GET /api/v1/documents` — List all generated documents for the user

- **Interview Prep API** (`src/app/api/v1/interview-prep/route.ts`):
  - `POST /api/v1/interview-prep` — Generate interview cheat sheet
    - Accepts: `resumeId`, `jobId`
    - Saves as `INTERVIEW_PREP` document type
  - `GET /api/v1/interview-prep` — List all saved prep sheets

### 5. Database Model ✅

- **GeneratedDocument**: Stores document type, content, tone, user/candidate/job associations

### 6. Frontend — Document Generation Dashboard ✅

- **Document Generator** (`src/app/documents/page.tsx`):
  - 3-column layout: form + history list + document preview/editor
  - Document type selector (Cover Letter, LinkedIn Note, Cold Email)
  - Tone selector (Professional, Enthusiastic, Confident, Direct)
  - Past documents list with click-to-view
  - Full-height editable textarea for generated content
  - Copy to Clipboard button
  - Loading state ("AI is writing...")

- **Interview Prep Dashboard** (`src/app/interview-prep/page.tsx`):
  - 3-column layout: form + history + cheat sheet preview
  - Generate cheat sheet form (resume ID + job ID)
  - Saved prep sheets list with click-to-view
  - Simple Markdown rendering (headings, lists, paragraphs)
  - Dark mode support throughout
  - Loading state ("AI Coach is analyzing...")

## Project Structure

```
src/
├── app/
│   ├── api/v1/
│   │   ├── documents/route.ts        # Cover letter & outreach generation
│   │   └── interview-prep/route.ts   # Interview prep generation
│   ├── documents/page.tsx            # Document generation dashboard
│   └── interview-prep/page.tsx       # Interview prep coaching dashboard
└── lib/
    └── generation/
        ├── documentEngine.ts         # Cover letter + outreach AI
        └── interviewEngine.ts        # Interview cheat sheet AI
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/documents` | Generate cover letter or outreach message |
| `GET` | `/api/v1/documents` | List generated documents |
| `POST` | `/api/v1/interview-prep` | Generate interview cheat sheet |
| `GET` | `/api/v1/interview-prep` | List saved prep sheets |

## Acceptance Criteria Status

- ✅ System generates role-specific cover letters with tone adjustment
- ✅ Outreach messages are personalized (LinkedIn and email formats)
- ✅ Interview cheat sheets include behavioral questions, skill gaps, STAR stories
- ✅ User can view, edit, and copy generated documents
- ✅ Document history is saved and accessible
- ✅ Dark mode support on interview prep page
- ✅ Truth validation prevents hallucinated experience

## Dependencies

- Phase 1 (Foundation & Infrastructure) ✅
- Phase 2 (Candidate Profile Engine) ✅
- Phase 3 (Job Discovery & Parsing Engine) ✅
- Groq API key required for AI generation features

## Status

**Phase 6: COMPLETE ✅**
