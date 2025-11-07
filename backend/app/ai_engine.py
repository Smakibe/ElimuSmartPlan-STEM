cat > app/ai_engine.py << 'EOF'
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("Missing GOOGLE_API_KEY in .env")

genai.configure(api_key=GOOGLE_API_KEY)

def generate_lesson(topic: str, grade: str, objectives: str) -> str:
    prompt = f"""
You are an expert Kenyan STEM curriculum designer working under the Competency-Based Education (CBE) framework.
Create a complete, classroom-ready lesson plan.

Topic: {topic}
Grade: {grade}
Learning objectives:
{objectives}

Include these sections:
1. Lesson Overview
2. Learning Outcomes (aligned to CBE)
3. Duration
4. Materials Required (low-cost, offline options)
5. Teaching and Learning Activities (step-by-step)
6. Assessment (formative + sample items)
7. PICRAT Integration
8. Extension/Reflection Questions

Return the content clearly formatted as text.
"""

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return getattr(response, "text", str(response))
    except Exception as e:
        return f"AI generation failed: {e}"
EOF
