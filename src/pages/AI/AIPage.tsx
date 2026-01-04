import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const API_BASE = "http://localhost:5001"; // move to env later

const AIPage = () => {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState(
`Monthly Income: 120000
Total Expenses: 90000
Food: 30000
Transport: 10000
Savings Goal: Buy Laptop`
  );
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAskAI = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setReply("");
    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/api/v1/ai/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            context,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setReply(data.reply);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7ff]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <div className="bg-purple-700 text-white rounded-xl p-6 shadow-md mb-8">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              🤖 AI Finance Assistant
            </h1>
            <p className="text-purple-100 text-sm mt-1">
              Ask smart questions and get personalized financial advice
            </p>
          </div>

          {/* QUESTION */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">
              Your Question
            </label>
            <textarea
              rows={3}
              className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g. How can I save more money this month?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* CONTEXT */}
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">
              Financial Context
            </label>
            <textarea
              rows={6}
              className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAskAI}
            disabled={loading}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition disabled:opacity-50 shadow"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

          {/* ERROR */}
          {error && (
            <div className="mt-4 text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* REPLY */}
          {reply && (
            <div className="mt-8 bg-white shadow rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-3 text-gray-700">
                💡 AI Advice
              </h2>
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {reply}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AIPage;
