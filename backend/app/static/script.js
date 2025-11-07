cat > app / static / script.js << 'EOF'
const form = document.getElementById("lessonForm");
const loading = document.getElementById("loading");
const output = document.getElementById("output");
const lessonText = document.getElementById("lessonText");
const downloadBtn = document.getElementById("downloadBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const topic = document.getElementById("topic").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const objectives = document.getElementById("objectives").value.trim();

    if (!topic || !grade || !objectives) {
        alert("Please fill all fields.");
        return;
    }

    loading.classList.remove("hidden");
    output.classList.add("hidden");
    lessonText.textContent = "";

    try {
        const response = await fetch("/api/generate_lesson", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, grade, objectives }),
        });

        const data = await response.json();
        loading.classList.add("hidden");

        if (!response.ok) {
            lessonText.textContent = "Error: " + (data.detail || "Unknown error");
            output.classList.remove("hidden");
            return;
        }

        lessonText.textContent = data.lesson_plan;
        output.classList.remove("hidden");

    } catch (err) {
        loading.classList.add("hidden");
        alert("Network error: " + err.message);
    }
});

downloadBtn.addEventListener("click", () => {
    const text = lessonText.textContent;
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "lesson_plan.txt";
    link.click();
});
EOF
