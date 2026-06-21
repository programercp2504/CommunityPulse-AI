# CommunityPulse AI

Hackathon-ready AI Decision Intelligence Platform for communities and city stakeholders.

## Features
- Next.js 15 frontend dashboard
- FastAPI backend
- Gemini API wrapper with fallback responses
- Community Health Score
- Complaint Analyzer
- Recommendation Engine
- What-if Simulator
- Mock JSON data first
- Dockerfiles for Cloud Run deployment

## Folder Structure
```
communitypulse-ai-complete/
  backend/
  frontend/
  README.md
```

## Local Run

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload --port 8080
```

Backend URL:
```
http://localhost:8080/api/v1/health
```

### Frontend
```bash
cd frontend
npm install
copy .env.local.example .env.local
npm run dev
```

Frontend URL:
```
http://localhost:3000
```

## Gemini Setup
In `backend/.env`:
```
GEMINI_API_KEY=your_api_key_here
CORS_ORIGINS=http://localhost:3000
```
If Gemini key is missing, the app still works using fallback AI responses.

## Cloud Run Deployment
Use these commands from project root after installing Google Cloud CLI.

### Backend
```bash
gcloud builds submit ./backend --tag gcr.io/YOUR_PROJECT_ID/communitypulse-backend

gcloud run deploy communitypulse-backend \
  --image gcr.io/YOUR_PROJECT_ID/communitypulse-backend \
  --region asia-south1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=YOUR_GEMINI_KEY,CORS_ORIGINS=YOUR_FRONTEND_URL
```

### Frontend
After backend deploy, copy backend URL and set:
```bash
gcloud builds submit ./frontend --tag gcr.io/YOUR_PROJECT_ID/communitypulse-frontend

gcloud run deploy communitypulse-frontend \
  --image gcr.io/YOUR_PROJECT_ID/communitypulse-frontend \
  --region asia-south1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_API_URL=YOUR_BACKEND_URL/api/v1
```

## Pages
- `/` Landing page
- `/dashboard` Ward dashboard
- `/assistant` AI assistant
- `/health-score` Health score explanation
- `/complaints` Complaint analyzer
- `/recommendations` AI recommendations + what-if simulator

## API Endpoints
- `GET /api/v1/health`
- `GET /api/v1/wards`
- `GET /api/v1/wards/{ward_id}/metrics`
- `GET /api/v1/wards/{ward_id}/health-score`
- `GET /api/v1/wards/{ward_id}/recommendations`
- `GET /api/v1/wards/{ward_id}/what-if`
- `GET /api/v1/complaints`
- `POST /api/v1/complaints/analyze`
- `POST /api/v1/complaints`
- `POST /api/v1/assistant/chat`
