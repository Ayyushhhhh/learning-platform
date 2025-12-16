from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, courses, analytics, genai

app = FastAPI(title="IITM GURU API", version="0.1.0")

# CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to IITM GURU API"}


# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(courses.router, prefix="/api/courses", tags=["courses"])
app.include_router(genai.router, prefix="/api/ai", tags=["ai"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])

from app.api import pdf
app.include_router(pdf.router, prefix="/api/pdf", tags=["pdf"])
