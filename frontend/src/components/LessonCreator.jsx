import React, { useState } from "react";
import axios from "../lib/axios";

export default function LessonCreator() {
    const [topic, setTopic] = useState("Photosynthesis");
    const [grade, setGrade] = useState("8");
    const [objectives, setObjectives] = useState("Understand how plants make food using sunlight and chlorophyll");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    async function onGenerate(e) {
        e.preventDefault();
        setLoading(true);
        setResult("");
        try {
            const { data } = await axios.post("/v1/generate", {
                topic, grade, objectives
            });
            setResult(data.lesson_plan || data.lesson || JSON.stringify(data));
        } catch (err) {
            setResult("Error: " + (err.response?.data?.detail || err.message));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={onGenerate} className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Topic</label>
                    <input value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 block w-full rounded-md border p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Grade</label>
                    <input value={grade} onChange={(e) => setGrade(e.target.value)} className="mt-1 block w-full rounded-md border p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Objectives</label>
                    <textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border p-2" />
                </div>

                <div className="flex items-center gap-3">
                    <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded shadow">
                        {loading ? "Generating…" : "Generate Lesson"}
                    </button>
                    <button type="button" onClick={() => { setResult(""); }} className="px-4 py-2 border rounded">Clear</button>
                </div>
            </form>

            <div className="mt-6">
                <h3 className="text-lg mb-2">Lesson Plan</h3>
                <div className="bg-gray-50 p-4 rounded min-h-[120px] whitespace-pre-wrap">{result || "No plan yet"}</div>
            </div>
        </div>
    );
}
