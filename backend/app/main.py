from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import lesson_routes, user_routes, media_routes

app = FastAPI(title="Elimu STEM Lesson Master API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lesson_routes.router, prefix="/api/lessons", tags=["Lessons"])
app.include_router(user_routes.router, prefix="/api/users", tags=["Users"])
app.include_router(media_routes.router, prefix="/api/media", tags=["Media"])

@app.get("/")
def home():
    return {"message": "Welcome to Elimu STEM Lesson Master API 🚀"}
