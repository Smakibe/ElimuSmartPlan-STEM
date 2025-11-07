def build_prompt(topic: str, grade: str, picrat: str = "transformative", teacher_notes: str | None = None) -> str:
    prompt = (
        f"Create a Competency-Based Education (CBE) aligned STEM lesson plan for Grade {grade} on: {topic}.\n\n"
        "Requirements:\n"
        "- Align with Kenya CBE outcomes (focus on competencies & practical skills).\n"
        "- Include learning objectives, success criteria, step-by-step activities (hands-on), materials, time allocation, assessment tasks, differentiation for mixed-ability classes.\n"
        "- Provide offline-friendly options and a simple teacher script.\n\n"
    )
    if teacher_notes:
        prompt += f"Teacher extra notes:\n{teacher_notes}\n\n"
    prompt += "Return the plan as clear sections with markdown-style headings.\n"
    return prompt
