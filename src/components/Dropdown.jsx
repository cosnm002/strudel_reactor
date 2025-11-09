import { useState } from "react";

export default function Dropdown({onChange}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Key: G");

    const options = ["D", "E", "F", "G", "A", "B", "C"];

    return (
        <div className="dropdown">
            <button
                className="btn btn-primary dropdown-toggle"
                onClick={() => setOpen(!open)}>
                {selected}
            </button>
            <div className={`dropdown-menu ${open ? "show" : ""}`}>
                {options.map((opt) => (
                    <a key={opt} className="dropdown-item" onClick={(e) => {
                        e.preventDefault();
                        setSelected(`Key: ${opt}`);
                        setOpen(false);
                        if (onChange) onChange(opt);
                    }}>
                        {opt}
                    </a>
                ))}
            </div>
        </div>
    );
}
