import { useNavigate } from "react-router-dom";

export default function PlaceholderPage({ title }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-20 text-white bg-slate-900/80 backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl text-gray-300 mb-8">This page is under construction.</p>
            <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
            >
                Back to Home
            </button>
        </div>
    );
}
