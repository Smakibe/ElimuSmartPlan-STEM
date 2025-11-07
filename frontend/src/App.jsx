import React from "react";
import LessonCreator from "./components/LessonCreator";

export default function App() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-indigo-600">ElimuSmartPlan</h1>
                <p className="text-sm text-gray-600">AI lesson plan generator for teachers</p>
            </header>

            <main>
                <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-700 mb-4">Generate a classroom-ready lesson plan in seconds.</p>
                    <LessonCreator />
                </div>
            </main>

            <footer className="mt-8 text-center text-gray-500 text-sm">
                Built with ♡ — Sol. Instructions for hackathon use in README.
            </footer>
        </div>
    );
}
