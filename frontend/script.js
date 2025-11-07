document.getElementById("generate").addEventListener("click", async () => {
    const topic = document.getElementById("topic").value;
    const grade = document.getElementById("grade").value;
    const objectives = document.getElementById("objectives").value;

    const output = document.getElementById("lessonOutput");
    output.innerHTML = "<p>Generating lesson... please wait ⏳</p>";

    try {
        const response = await fetch("http://127.0.0.1:8000/api/generate_lesson", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, grade, objectives }),
        });

        const data = await response.json();
        output.innerHTML = data.lesson
            ? `<div class="lesson">${data.lesson}</div>`
            : `<p class="error">${data.error}</p>`;
    } catch (err) {
        output.innerHTML = `<p class="error">Could not connect to AI backend.</p>`;
    }
});
