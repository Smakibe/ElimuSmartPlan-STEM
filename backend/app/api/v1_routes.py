# v1_routes.py — optional separate router (not required, we keep endpoints in main.py)
# This file can be wired into main.py as a FastAPI APIRouter if you want modular routes.

from fastapi import APIRouter

router = APIRouter(prefix="/v1")

@router.get("/health")
def health():
    return {"status": "ok"}
