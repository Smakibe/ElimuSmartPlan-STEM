import:jac from utils, py_call;

walker ai_generate {
    has topic: str;
    has grade: str;
    has picrat: str = "transformative";

    can run with `root entry;

    body {
        cached = py_call("app.services.cache.LessonCache().get", [topic + "::" + grade]);
        if cached {
            return cached;
        }

        prompt = py_call("app.services.utils.build_prompt", [topic, grade, picrat, ""]);
        lesson = py_call("app.services.llm_adapter.LLMAdapter().generate", [prompt]);
        py_call("app.services.cache.LessonCache().set", [topic + "::" + grade, lesson]);

        return lesson;
    }
}
