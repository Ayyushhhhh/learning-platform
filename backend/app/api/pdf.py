
from fastapi import APIRouter, HTTPException, Response
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
import json
import os
import io

router = APIRouter()

def load_questions(subject_week: str):
    file_path = os.path.join(os.path.dirname(__file__), f"../data/questions/{subject_week}.json")
    if not os.path.exists(file_path):
        return []
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/generate/{subject_week}")
async def generate_pdf(subject_week: str):
    questions = load_questions(subject_week)
    if not questions:
        raise HTTPException(status_code=404, detail="Question bank not found")

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter,
                            rightMargin=72, leftMargin=72,
                            topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='QuestionTitle', fontSize=12, leading=14, spaceAfter=6, textColor=colors.HexColor("#0f172a"), fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='QuestionBody', fontSize=10, leading=14, spaceAfter=12, textColor=colors.HexColor("#334155")))
    styles.add(ParagraphStyle(name='AnswerKey', fontSize=10, leading=14, spaceAfter=12, textColor=colors.HexColor("#059669"), fontName='Helvetica-Oblique'))
    
    Story = []
    
    # Header
    title = f"IITM Guru Practice Set: {subject_week.replace('_', ' ').title()}"
    Story.append(Paragraph(title, styles["Heading1"]))
    Story.append(Spacer(1, 12))
    Story.append(Paragraph(f"Total Questions: {len(questions)}", styles["Normal"]))
    Story.append(Spacer(1, 24))

    for i, q in enumerate(questions, 1):
        # Question Number
        Story.append(Paragraph(f"Q{i}. {q['question_text']}", styles["QuestionBody"]))
        
        # Options would be parsed here if we had them explicitly, 
        # but since we have raw blocks, the text often contains the options.
        
        # Answer Key (initially hidden or at end? user asked for practice PDF. usually answers are at the end. 
        # But for this MVP let's put them below for immediate feedback/study mode or check user intent. 
        # User said 'practice pdf' - usually implies answers separate. 
        # For now, let's keep it simple and put answer below).
        
        Story.append(Paragraph(f"<b>Answer:</b> {q['correct_answer']}", styles["AnswerKey"]))
        Story.append(Spacer(1, 12))
        Story.append(Paragraph("_" * 60, styles["Normal"]))
        Story.append(Spacer(1, 12))

    doc.build(Story)
    buffer.seek(0)
    
    return Response(content=buffer.getvalue(), media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename={subject_week}.pdf"})
