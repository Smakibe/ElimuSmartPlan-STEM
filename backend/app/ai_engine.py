# app/ai_engine.py
from byllm import LLM
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize the LLM model
ai = LLM(provider="google", model="gemini-1.5-flash")

def generate_lesson(topic: str, level: str, objectives: str):
    """
    Uses the ByLLM model to generate a structured lesson plan.
    """
    prompt = f"""
    You are an AI lesson planner for teachers.
    Create a detailed lesson plan for:
    - Topic: {topic}
    - Level: {level}
    - Learning Objectives: {objectives}
    
    Format the response clearly with sections for:
    - Introduction
    - Teaching Activities
    - Assessment
    - Materials Needed
    """
    
    response = ai.prompt(prompt)
    return response.get("message", "No response generated.")
