import React, { useRef, useState, useEffect } from "react";

export default function Whiteboard() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("#000000");
    const [lineWidth, setLineWidth] = useState(3);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Set canvas size
        canvas.width = window.innerWidth * 0.8;
        canvas.height = 500;

        // Default drawing settings
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [color, lineWidth]);

    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        ctxRef.current.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        ctxRef.current.stroke();
    };

    const stopDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const downloadCanvas = () => {
        const link = document.createElement("a");
        link.download = "whiteboard.png";
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">🧠 Interactive Whiteboard</h2>

            <div className="mb-4 flex gap-4 items-center">
                <label className="font-medium">Pen Color:</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

                <label className="font-medium">Pen Size:</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(e.target.value)}
                />

                <button onClick={clearCanvas} className="bg-red-500 text-white px-3 py-1 rounded-md">
                    Clear
                </button>
                <button onClick={downloadCanvas} className="bg-green-600 text-white px-3 py-1 rounded-md">
                    Save as Image
                </button>
            </div>

            <canvas
                ref={canvasRef}
                className="border border-gray-400 bg-white rounded-lg shadow-lg cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>
    );
}
