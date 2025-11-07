from app.core.config import settings
from app.services.gemini_client import generate_with_gemini

try:
    import byllm
    BYLLM_AVAILABLE = True
except Exception:
    BYLLM_AVAILABLE = False

class LLMAdapter:
    def __init__(self):
        self.provider = settings.byllm_provider

    def generate(self, prompt: str) -> str:
        # prefer direct Gemini if configured
        if settings.gemini_api_key and self.provider == "gemini":
            return generate_with_gemini(prompt)
        if BYLLM_AVAILABLE:
            client = byllm.Client(provider=self.provider)
            return client.generate(prompt)
        raise RuntimeError("No valid LLM provider available.")
