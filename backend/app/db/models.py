from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, Float, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(String, default="student") # student, admin
    created_at = Column(DateTime, default=datetime.utcnow)
    
    progress = relationship("StudentProgress", back_populates="user")

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    title = Column(String)
    description = Column(String)
    
    weeks = relationship("Week", back_populates="course")

class Week(Base):
    __tablename__ = "weeks"
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    week_number = Column(Integer)
    title = Column(String)
    
    course = relationship("Course", back_populates="weeks")
    topics = relationship("Topic", back_populates="week")

class Topic(Base):
    __tablename__ = "topics"
    id = Column(Integer, primary_key=True, index=True)
    week_id = Column(Integer, ForeignKey("weeks.id"))
    title = Column(String)
    difficulty_level = Column(String) # Easy, Medium, Hard
    
    week = relationship("Week", back_populates="topics")
    resources = relationship("Resource", back_populates="topic")

class Resource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey("topics.id"))
    type = Column(String) # note, pyq, video
    title = Column(String)
    content = Column(Text) # Markdown content or JSON
    url = Column(String, nullable=True)
    metadata_json = Column(Text, nullable=True) # JSON string for extra fields like marks, year
    
    topic = relationship("Topic", back_populates="resources")

class StudentProgress(Base):
    __tablename__ = "student_progress"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    topic_id = Column(Integer, ForeignKey("topics.id"))
    status = Column(String) # not_started, in_progress, completed
    score = Column(Float, default=0.0)
    last_accessed = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="progress")
