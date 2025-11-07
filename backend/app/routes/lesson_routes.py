from fastapi import APIRouter, HTTPException
from app.ai_engine import generate_lesson

router = APIRouter()

lessons_db = []

@router.post("/generate")
async def create_lesson(data: dict):
    topic = data.get("topic")
    grade = data.get("grade")
    objectives = data.get("objectives")

    if not topic or not grade or not objectives:
        raise HTTPException(status_code=400, detail="Missing fields")

    lesson = await generate_lesson(topic, grade, objectives)
    lessons_db.append(lesson)
    return lesson

@router.get("/all")
async def get_all_lessons():
    return lessons_db
