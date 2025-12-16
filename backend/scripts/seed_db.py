import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from sqlalchemy.orm import Session
from app.db import models
from app.db.database import SessionLocal, engine
from app.core.security import get_password_hash

# Create tables
models.Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # Check if data exists
    if db.query(models.User).first():
        print("Data already seeded.")
        return

    # Create Admin User
    admin = models.User(
        email="admin@iitmguru.com",
        hashed_password=get_password_hash("admin123"),
        full_name="IITM Guru Admin",
        role="admin"
    )
    student = models.User(
        email="student@ds.study.iitm.ac.in",
        hashed_password=get_password_hash("student123"),
        full_name="Demo Student",
        role="student"
    )
    db.add(admin)
    db.add(student)
    
    # Create Courses
    math_course = models.Course(
        code="BS101",
        title="Mathematics for Data Science I",
        description="Foundational mathematics for data science."
    )
    stats_course = models.Course(
        code="BS102",
        title="Statistics for Data Science I",
        description="Introduction to statistical concepts."
    )
    db.add(math_course)
    db.add(stats_course)
    db.commit()
    
    # Create Weeks & Topics for Math
    for w in range(1, 5):
        week = models.Week(course_id=math_course.id, week_number=w, title=f"Math Week {w}")
        db.add(week)
        db.commit()
        
        topic1 = models.Topic(week_id=week.id, title=f"Topic {w}.1: Logic & Sets", difficulty_level="Easy")
        topic2 = models.Topic(week_id=week.id, title=f"Topic {w}.2: Functions", difficulty_level="Medium")
        db.add(topic1)
        db.add(topic2)
        
        # Add seed PyQs
        p1 = models.Resource(topic_id=topic1.id, type="pyq", title="PYQ 2023 Q1", content="What is a set?", metadata_json='{"year": 2023, "marks": 2}')
        db.add(p1)

    print("Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_data()
