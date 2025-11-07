import React from "react";

/*
 Simple placeholder component for an interactive whiteboard.
 You can replace with Excalidraw, Fabric.js, or any canvas-based lib.
 This component acts as a scaffold.
*/

export default function Whiteboard() {
    return (
        <div style={{ border: '1px solid #ccc', padding: 10, borderRadius: 6 }}>
            <h3>Interactive Whiteboard (placeholder)</h3>
            <p>Replace this with an actual whiteboard library (Excalidraw, Fabric.js, etc.).</p>
            <textarea style={{ width: '100%', height: 200 }} placeholder="Draw/write notes here..." />
        </div>
    );
}
