from fastapi import APIRouter, Depends, HTTPException
from app import schemas
from app.services import ai_service # Need to create this

router = APIRouter()

@router.post("/generate-question", response_model=schemas.GeneratedQuestion)
async def generate_question(request: schemas.QuestionRequest):
    try:
        question = await ai_service.generate_practice_question(request.topic_id, request.difficulty)
        return question
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/evaluate-answer", response_model=schemas.EvaluationResult)
async def evaluate_answer(request: schemas.AnswerEvaluationRequest):
    try:
        result = await ai_service.evaluate_student_answer(request.question_text, request.student_answer)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
