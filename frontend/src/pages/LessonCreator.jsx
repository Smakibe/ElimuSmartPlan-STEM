import React, { useState } from "react";
import axios from "axios";

export default function LessonCreator() {
    const [form, setForm] = useState({ topic: "", grade: "", objectives: "" });
    const [lesson, setLesson] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const generateLesson = async () => {
        const res = await axios.post("http://localhost:8000/api/lessons/generate", form);
        setLesson(res.data);
    };

    return (
        <div className="p-6 bg-gray-100 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Generate AI Lesson Plan</h2>
            <input name="topic" placeholder="Topic" onChange={handleChange} className="input" />
            <input name="grade" placeholder="Grade" onChange={handleChange} className="input" />
            <textarea name="objectives" placeholder="Objectives" onChange={handleChange} className="input" />
            <button onClick={generateLesson} className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">Generate</button>
            {lesson && (
                <div className="mt-6 bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">{lesson.topic}</h3>
                    <p>{lesson.lesson_plan}</p>
                </div>
            )}
        </div>
    );
}
