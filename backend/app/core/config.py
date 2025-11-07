from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    port: int = 8000
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-1.5-flash"
    byllm_provider: str = "gemini"
    redis_host: str = "redis"
    redis_port: int = 6379
    secret_key: str = "dev-secret-change-me"
    cache_ttl: int = 3600

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
