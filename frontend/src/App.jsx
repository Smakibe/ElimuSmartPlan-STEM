import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
    const [topic, setTopic] = useState("");
    const [grade, setGrade] = useState("");
    const [objectives, setObjectives] = useState("");
    const [lesson, setLesson] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic || !grade || !objectives) {
            alert("Please fill all fields");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/api/generate_lesson", {
                topic,
                grade,
                objectives,
            });
            setLesson(response.data.lesson_plan || "No lesson generated.");
        } catch (error) {
            console.error(error);
            setLesson("Error: Could not connect to AI backend.");
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setTopic("");
        setGrade("");
        setObjectives("");
        setLesson("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center px-4 py-10">
            <motion.div
                className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-3">
                    ElimuSmartPlan
                </h1>
                <p className="text-gray-600 text-center mb-6 text-lg">
                    PICRAT AI-powered lesson plan generator for teachers.
                </p>

                <div className="space-y-5">
                    <div>
                        <label className="block font-semibold text-gray-700">Topic</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. Photosynthesis"
                            className="w-full border-2 border-indigo-200 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Grade</label>
                        <input
                            type="text"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            placeholder="e.g. 8"
                            className="w-full border-2 border-indigo-200 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Objectives</label>
                        <textarea
                            value={objectives}
                            onChange={(e) => setObjectives(e.target.value)}
                            placeholder="e.g. Understand how plants make food using sunlight"
                            rows="3"
                            className="w-full border-2 border-indigo-200 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    <div className="flex justify-between mt-2">
                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className={`px-5 py-2 rounded-xl text-white font-semibold shadow-md transition-all duration-300 ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105"
                                }`}
                        >
                            {loading ? "Generating..." : "✨ Generate Lesson"}
                        </button>

                        <button
                            onClick={handleClear}
                            className="border-2 border-gray-300 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-100 transition"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-3 text-indigo-700">Lesson Plan</h2>
                    <div className="bg-gray-100 rounded-xl p-4 text-gray-800 whitespace-pre-wrap min-h-[150px]">
                        {lesson || "Your generated lesson will appear here."}
                    </div>
                </div>
                <footer className="text-center text-sm text-gray-500 mt-8">
                    ElimuSmartPlan4 STEM. <br />
                    Copyright Reserved © 2025 @ElimuSmartPlan4STEM Vendor Solosma
                </footer>
            </motion.div>
        </div>
    );
}

export default App;
