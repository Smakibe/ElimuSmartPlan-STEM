# backend/app/api/lessons.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.lesson_service import LessonService

router = APIRouter(prefix="/lessons", tags=["lessons"])
svc = LessonService()

class LessonRequest(BaseModel):
    topic: str
    level: str
    objectives: str | None = None
    picrat: dict | None = None   # optional PICRAT metadata hints
    use_ai: bool = True

@router.post("/generate")
def generate_lesson(req: LessonRequest):
    try:
        lesson = svc.generate_lesson(req.dict())
        return {"ok": True, "lesson": lesson}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save")
def save_lesson(payload: dict):
    saved = svc.save_lesson(payload)
    return {"ok": True, "path": saved}

@router.get("/export/{lesson_id}")
def export_lesson(lesson_id: str):
    path = svc.export_lesson_zip(lesson_id)
    if path is None:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True, "export_path": path}
