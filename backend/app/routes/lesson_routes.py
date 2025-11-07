cat > app/routes/lesson_routes.py << 'EOF'
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.ai_engine import generate_lesson

router = APIRouter()

class LessonRequest(BaseModel):
    topic: str
    grade: str
    objectives: str

@router.post("/generate_lesson")
def generate_lesson_plan(req: LessonRequest):
    result = generate_lesson(req.topic, req.grade, req.objectives)
    if "failed" in result.lower():
        raise HTTPException(status_code=500, detail=result)
    return {"lesson_plan": result}
EOF
