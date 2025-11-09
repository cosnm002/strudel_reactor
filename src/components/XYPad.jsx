import { useState } from "react";
import "./XYPad.css";
export default function XYPad({ onChange }) {
    const [pos, setPos] = useState({ x: 50, y: 50 });

    const handleMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 0), 100);
        const y = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 0), 100);
        setPos({ x, y });
        onChange({ x, y });
    };

    return (
        <div
            className="xy-pad"
            onMouseDown={handleMove}
            onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
        >
            <div
                className="xy-dot"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            />
        </div>
    );
}