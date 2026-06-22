# JobPilot Engine 🚀

AI-powered job search operating system that automates the entire job hunting process — from discovery to application tracking.

Built with **Next.js 14**, **TypeScript**, **Prisma ORM**, **SQLite**, **Groq AI**, and **Tailwind CSS**.

---

## ✨ Features

### Phase 1 — Foundation & Infrastructure
- Next.js 14 App Router with TypeScript
- Prisma ORM with SQLite database
- JWT-based authentication (register, login, protected routes)
- RESTful API routes under `/api/v1/`
- Health check endpoint
- Dark mode support with `next-themes`

### Phase 2 — Candidate Profile Engine
- Candidate profile creation and management
- Skills, experience, and education tracking
- Resume upload and parsing
- Profile completion percentage tracking

### Phase 3 — Job Discovery & Parsing
- Job listing management with search and filtering
- Job detail pages with parsed data
- Job URL deduplication (fingerprinting)
- Remote/location/salary metadata

### Phase 4 — Job Ranking Engine
- AI-powered job ranking via Groq API
- 6-factor scoring: skills, experience, location, salary, industry, seniority
- Explainable AI with confidence scores
- Batch ranking and export (CSV/JSON)
- Interactive ranking dashboard with visualizations

### Phase 5 — Resume Tailoring Engine
- AI-powered resume tailoring for specific job descriptions
- ATS score tracking with before/after comparison
- Change log with accept/reject per suggestion
- Tailoring history and analytics

### Phase 6 — Document Generation Engine
- AI-generated cover letters and recruiter outreach messages
- Interview preparation with AI-generated questions
- Document management dashboard
- Tone adjustment and personalization

### Phase 7 — Application Tracking Engine
- Application status pipeline (applied → interview → offer/rejected/withdrawn)
- Application notes and reminders
- Application listing and filtering

### Phase 8 — Analytics & Proof-of-Work Engine
- Application funnel visualization
- Timeline metrics and trends
- Recharts-powered interactive charts
- Performance reports and data export

### Phase 9 — Integration, Testing & Optimization
- End-to-end system integration
- Performance optimization and caching
- Comprehensive test coverage
- Bug fixes and accessibility improvements

### Phase 10 — Deployment & Launch
- Production deployment configuration
- User guide and deployment documentation
- Monitoring, alerting, and incident response
- Final smoke testing and launch

---

## 📋 Prerequisites

- **Node.js 18+**
- **npm 9+**
- A **Groq API key** (free at [console.groq.com](https://console.groq.com)) for AI features

---

## 🛠️ Quick Start

```bash
# Clone the repository
git clone https://github.com/prasmitachoudhury05-maker/AI_Job_Pilot-.git
cd AI_Job_Pilot-

# Install dependencies
npm install

# Copy environment file and add your keys
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Generate Prisma client
npx prisma generate

# Create/sync the database
npx prisma db push

# Seed the database (optional)
# npx prisma db seed

# Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**.

---

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Prisma database connection string | `file:./jobpilot.db` |
| `GROQ_API_KEY` | Groq API key for AI features | — (required) |
| `NEXT_PUBLIC_API_URL` | Base URL for API calls | `http://localhost:3000` |

See [`.env.example`](.env.example) for the template.

---

## 📁 Project Structure

```
jobpilot-engine/
├── prisma/
│   └── schema.prisma          # Database schema (SQLite)
├── src/
│   ├── app/
│   │   ├── api/v1/            # API route handlers
│   │   │   ├── auth/          # Login, register, me
│   │   │   ├── jobs/          # CRUD + discovery
│   │   │   ├── profiles/      # Candidate profiles
│   │   │   ├── resumes/       # Upload + parsing
│   │   │   ├── ranking/       # AI job ranking
│   │   │   ├── tailoring/     # Resume tailoring
│   │   │   ├── documents/     # Document generation
│   │   │   ├── interview-prep/# Interview questions
│   │   │   ├── applications/  # Application tracking
│   │   │   ├── analytics/     # Dashboard metrics
│   │   │   └── health/        # Health check
│   │   ├── jobs/              # Job listing pages
│   │   ├── profile/           # Profile pages
│   │   ├── ranking/           # Ranking dashboard
│   │   ├── tailoring/         # Tailoring pages
│   │   ├── applications/      # Application tracker
│   │   ├── documents/         # Document manager
│   │   ├── interview-prep/    # Interview prep
│   │   ├── analytics/         # Analytics dashboard
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── layout/            # Sidebar, navigation
│   │   ├── profile/           # Profile form components
│   │   ├── jobs/              # Job card, filters
│   │   └── ui/                # Shared UI components
│   ├── lib/                   # Core libraries
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── auth.ts            # JWT auth helpers
│   │   ├── api.ts             # API client
│   │   ├── ranking/           # Ranking algorithms
│   │   ├── tailoring/         # Tailoring engine
│   │   └── generation/        # Document & interview engines
│   ├── services/              # API service clients
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
├── e2e/                       # Playwright E2E tests
├── tests/                     # Unit tests
├── .github/workflows/ci.yml   # GitHub Actions CI
├── Dockerfile                 # Production Docker image
├── tailwind.config.ts         # Tailwind CSS config
├── next.config.js             # Next.js config
└── package.json
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests (requires Playwright)
npm run test:e2e
```

---

## 🔐 Authentication

The API uses JWT tokens:

1. **Register** — `POST /api/v1/auth/register`
2. **Login** — `POST /api/v1/auth/login` (returns JWT)
3. **Protected routes** — include `Authorization: Bearer <token>` header
4. **Current user** — `GET /api/v1/auth/me`

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/health` | Health check |
| `POST` | `/api/v1/auth/register` | Register new user |
| `POST` | `/api/v1/auth/login` | Login |
| `GET` | `/api/v1/auth/me` | Current user info |
| `GET/POST` | `/api/v1/profiles` | List / create profiles |
| `GET/PUT` | `/api/v1/profiles/[id]` | Get / update profile |
| `GET` | `/api/v1/profiles/me` | Current user profile |
| `GET/POST` | `/api/v1/jobs` | List / create jobs |
| `GET/PUT/DELETE` | `/api/v1/jobs/[id]` | Job CRUD |
| `POST` | `/api/v1/jobs/discover` | Discover jobs |
| `GET/POST` | `/api/v1/resumes` | List / create resumes |
| `POST` | `/api/v1/resumes/upload` | Upload resume |
| `POST` | `/api/v1/resumes/[id]/parse` | Parse resume |
| `POST` | `/api/v1/ranking/rank` | Rank a single job |
| `POST` | `/api/v1/ranking/rank-batch` | Batch rank jobs |
| `GET` | `/api/v1/ranking/export` | Export rankings |
| `GET/POST` | `/api/v1/tailoring` | Tailoring sessions |
| `GET` | `/api/v1/tailoring/[id]` | Tailoring detail |
| `GET/POST` | `/api/v1/documents` | Generated documents |
| `POST` | `/api/v1/interview-prep` | Interview questions |
| `GET/POST` | `/api/v1/applications` | Applications |
| `GET/PUT/DELETE` | `/api/v1/applications/[id]` | Application CRUD |
| `GET` | `/api/v1/analytics/metrics` | Dashboard metrics |
| `GET` | `/api/v1/analytics/timeline` | Timeline data |
| `GET` | `/api/v1/analytics/funnel` | Funnel data |

---

## 🐳 Docker

```bash
# Build the image
docker build -t jobpilot-engine .

# Run the container
docker run -p 3000:3000 --env-file .env jobpilot-engine
```

---

## 🚢 Deployment

A PowerShell deployment script is included:

```powershell
# Windows
.\deploy.ps1
```

This will install production dependencies, generate Prisma client, sync the database, and build the Next.js production bundle.

---

## 📝 Code Quality

- **ESLint** — JavaScript/TypeScript linting
- **Prettier** — Code formatting
- **TypeScript** — Static type checking
- **Jest** — Unit testing
- **Playwright** — E2E testing

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm test && npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For issues and questions, please [open an issue](https://github.com/prasmitachoudhury05-maker/AI_Job_Pilot-/issues) on GitHub.
