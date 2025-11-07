# backend/app/api/health.py
from fastapi import APIRouter
from ..utils.jac_wrapper import get_jac_import

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/")
def health():
    return {"status": "ok"}

@router.get("/jac")
def jac_status():
    ji = get_jac_import()
    if ji is None:
        return {"jac_installed": False, "message": "jaclang not available. Run `pip install jaclang` inside backend container."}
    return {"jac_installed": True, "message": "jaclang available"}
