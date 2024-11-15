import { useEffect } from "react";

export default function CustomAlert({ message, type = "success", onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-hide after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);
    
    const backgroundColor = type === "success" ? "bg-green-500" : "bg-red-500";

    return (
        <div className={`${backgroundColor} text-white px-4 py-3 rounded-md shadow-md fixed top-4 right-4 z-50`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-lg font-bold">×</button>
        </div>
    );
}
