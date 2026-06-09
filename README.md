# JobPilot Engine

AI-powered job search operating system that automates the entire job hunting process from discovery to application tracking.

## 🚀 Phase 1: Foundation & Infrastructure

This phase establishes the core infrastructure for the JobPilot Engine, including:

- **Backend API**: FastAPI with Python 3.11+
- **Frontend UI**: Next.js 14+ with TypeScript
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based authentication system
- **Caching**: Redis for caching and background tasks
- **CI/CD**: GitHub Actions for automated testing and linting
- **Development**: Docker Compose for local development

## 📋 Prerequisites

- Docker and Docker Compose
- Python 3.11+ (for local development without Docker)
- Node.js 18+ (for local development without Docker)
- PostgreSQL 15+ (for local development without Docker)
- Redis 7+ (for local development without Docker)

## 🛠️ Quick Start with Docker

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone <repository-url>
cd jobpilot-engine

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## 🏗️ Local Development Setup

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements-dev.txt

# Copy environment file
cp .env.example .env

# Run database migrations
alembic upgrade head

# Start the development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start the development server
npm run dev
```

## 📊 Database Schema

### Core Models

- **User**: User accounts and authentication
- **Candidate**: Candidate profiles with skills, experience, education
- **Resume**: Resume uploads and parsed content
- **Job**: Job listings with parsed data and deduplication
- **JobRanking**: AI-powered job rankings with scores
- **Application**: Application tracking with status workflow
- **ApplicationNote**: Notes and reminders for applications

### Database Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register**: POST `/api/v1/auth/register`
2. **Login**: POST `/api/v1/auth/login` (returns JWT token)
3. **Protected Routes**: Include `Authorization: Bearer <token>` header

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Code Quality

```bash
# Backend
cd backend
black app/
flake8 app/
isort app/
mypy app/

# Frontend
cd frontend
npm run lint
npm run type-check
```

## 📝 Code Quality Tools

### Backend
- **Black**: Code formatting
- **Flake8**: Linting
- **isort**: Import sorting
- **mypy**: Type checking
- **pre-commit**: Git hooks

### Frontend
- **ESLint**: Linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

## 🚢 CI/CD Pipeline

The GitHub Actions workflow automatically:

- Runs backend linting (Black, Flake8, isort)
- Runs backend tests with PostgreSQL and Redis
- Runs frontend linting (ESLint)
- Runs frontend type checking
- Builds Docker images

## 📁 Project Structure

```
jobpilot-engine/
├── backend/
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── auth.py        # Authentication logic
│   │   ├── config.py      # Configuration
│   │   ├── database.py    # Database connection
│   │   ├── logging_config.py  # Logging setup
│   │   └── main.py        # FastAPI application
│   ├── alembic/           # Database migrations
│   ├── tests/             # Backend tests
│   ├── requirements.txt   # Production dependencies
│   ├── requirements-dev.txt  # Development dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   └── lib/           # Utility functions
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml     # Docker Compose configuration
├── .github/
│   └── workflows/
│       └── ci.yml        # CI/CD pipeline
└── README.md
```

## 🔧 Configuration

### Backend Environment Variables

See `backend/.env.example` for all available configuration options:

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET_KEY`: Secret key for JWT tokens
- `JWT_ALGORITHM`: JWT algorithm (default: HS256)
- `GROQ_API_KEY`: API key for Groq (for AI features)
- `SENTRY_DSN`: Sentry DSN for error tracking

### Frontend Environment Variables

See `frontend/.env.example`:

- `NEXT_PUBLIC_API_URL`: Backend API URL

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Redis Connection Issues

```bash
# Check if Redis is running
docker-compose ps redis

# View Redis logs
docker-compose logs redis

# Restart Redis
docker-compose restart redis
```

### Port Already in Use

```bash
# Check what's using the port
# On Linux/Mac
lsof -i :3000
lsof -i :8000

# On Windows
netstat -ano | findstr :3000
netstat -ano | findstr :8000
```

## 📈 Next Steps

Phase 1 is complete! The foundation is now set up for:

- **Phase 2**: Candidate Profile Engine
- **Phase 3**: Job Discovery & Parsing Engine
- **Phase 4**: Job Ranking Engine
- And more...

See the [Implementation Plan](../Docs/implementation_plan.md) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

[Your License Here]

## 📞 Support

For issues and questions, please open an issue on GitHub.
