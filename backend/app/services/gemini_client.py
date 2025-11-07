import google.generativeai as genai
from app.core.config import settings
from dotenv import load_dotenv
load_dotenv()

if settings.gemini_api_key:
    genai.configure(api_key=settings.gemini_api_key)

_model = None
def get_model():
    global _model
    if _model is None:
        _model = genai.GenerativeModel(settings.gemini_model)
    return _model

def generate_with_gemini(prompt: str, max_tokens: int = 1024) -> str:
    try:
        model = get_model()
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=max_tokens,
                temperature=0.25,
            ),
        )
        return response.text.strip()
    except Exception as e:
        raise RuntimeError(f"Gemini error: {e}") from e
