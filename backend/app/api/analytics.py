from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter()

class DashboardStats(BaseModel):
    total_questions_solved: int
    average_accuracy: float
    study_hours: float
    projected_score: float

@router.get("/dashboard", response_model=DashboardStats)
def get_dashboard_stats():
    # Mock data aggregation
    return DashboardStats(
        total_questions_solved=150,
        average_accuracy=0.78,
        study_hours=45.5,
        projected_score=88.5
    )

@router.get("/predict-score")
def predict_score():
    return {
        "predicted_score": 88.5,
        "confidence": 0.9,
        "factors": ["High PYQ accuracy", "Consistent study pattern"]
    }
