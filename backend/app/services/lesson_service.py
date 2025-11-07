# backend/app/services/lesson_service.py
import os
import json
import uuid
from datetime import datetime
from typing import Dict, Any
from ..utils.jac_wrapper import get_jac_import

BASE = os.path.join(os.getcwd(), "storage")
os.makedirs(BASE, exist_ok=True)

class LessonService:
    def __init__(self):
        self.jac = get_jac_import()

    def _ai_generate(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        If jac_import available, call it to run Jac generation. Otherwise fallback.
        """
        if self.jac:
            # Example of calling jac_import — adapt to your jac scripts
            try:
                # jac_import can accept text/strings or filenames depending on jaclang usage
                result = self.jac(payload)  # if jac_import expects specific signature, adapt here
                # assume it returns a dict or json string
                if isinstance(result, str):
                    try:
                        return json.loads(result)
                    except Exception:
                        return {"content": result}
                return result
            except Exception as e:
                # fallback to template
                return {"title": payload.get("topic"), "level": payload.get("level"), "body": f"Jac run failed: {e}"}
        else:
            # Fallback simple template
            content = {
                "id": str(uuid.uuid4()),
                "title": payload.get("topic"),
                "level": payload.get("level"),
                "objectives": payload.get("objectives") or "Define learning objectives here.",
                "body": f"Lesson on {payload.get('topic')} for {payload.get('level')}. Use PICRAT: {payload.get('picrat')}",
                "created_at": datetime.utcnow().isoformat()
            }
            return content

    def generate_lesson(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self._ai_generate(payload)

    def save_lesson(self, lesson: Dict[str, Any]) -> str:
        lesson_id = lesson.get("id") or str(uuid.uuid4())
        path = os.path.join(BASE, f"{lesson_id}.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(lesson, f, ensure_ascii=False, indent=2)
        return path

    def export_lesson_zip(self, lesson_id: str) -> str | None:
        # create a downloadable zip with JSON + HTML presentation + assets
        import zipfile
        src = os.path.join(BASE, f"{lesson_id}.json")
        if not os.path.exists(src):
            return None
        dest = os.path.join(BASE, f"{lesson_id}_export.zip")
        with zipfile.ZipFile(dest, "w") as z:
            z.write(src, arcname=f"{lesson_id}.json")
            # add a simple HTML slide
            with open("/tmp/slide.html", "w", encoding="utf-8") as s:
                s.write(f"<html><body><h1>Lesson {lesson_id}</h1><pre>{open(src).read()}</pre></body></html>")
            z.write("/tmp/slide.html", arcname="presentation.html")
        return dest
