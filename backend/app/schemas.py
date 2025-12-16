from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str
    full_name: str

class User(UserBase):
    id: int
    full_name: str
    role: str
    created_at: datetime
    class Config:
        from_attributes = True

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

# Course Schemas
class TopicBase(BaseModel):
    title: str
    difficulty_level: str

class ResourceBase(BaseModel):
    title: str
    type: str
    content: str

class Topic(TopicBase):
    id: int
    resources: List[ResourceBase] = []
    class Config:
        from_attributes = True

class WeekBase(BaseModel):
    week_number: int
    title: str

class Week(WeekBase):
    id: int
    topics: List[Topic] = []
    class Config:
        from_attributes = True

class CourseBase(BaseModel):
    code: str
    title: str
    description: str

class Course(CourseBase):
    id: int
    weeks: List[Week] = []
    class Config:
        orm_mode = True

# GenAI Schemas
class QuestionRequest(BaseModel):
    topic_id: int
    difficulty: str # Easy, Medium, Hard
    count: int = 1

class GeneratedQuestion(BaseModel):
    question_text: str
    options: List[str]
    correct_option: int
    explanation: str

class AnswerEvaluationRequest(BaseModel):
    question_text: str
    student_answer: str

class EvaluationResult(BaseModel):
    score: float
    feedback: str
    improvement_areas: List[str]
