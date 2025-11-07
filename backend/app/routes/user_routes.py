from fastapi import APIRouter

router = APIRouter()

users = [{"id": 1, "name": "Admin", "role": "teacher"}]

@router.get("/")
def get_users():
    return users
