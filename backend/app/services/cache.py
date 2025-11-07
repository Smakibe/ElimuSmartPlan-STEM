import os
import redis
from app.core.config import settings

class LessonCache:
    def __init__(self):
        self._r = redis.Redis(
            host=os.getenv("REDIS_HOST", settings.redis_host),
            port=int(os.getenv("REDIS_PORT", settings.redis_port)),
            decode_responses=True,
            socket_connect_timeout=2,
            socket_timeout=2,
        )

    def _key(self, k: str) -> str:
        return f"lesson:{k}"

    def get(self, key: str) -> str | None:
        val = self._r.get(self._key(key))
        return None if val is None else str(val)

    def set(self, key: str, value: str, ttl: int | None = None) -> None:
        ttl = ttl or settings.cache_ttl
        self._r.setex(self._key(key), ttl, value)
