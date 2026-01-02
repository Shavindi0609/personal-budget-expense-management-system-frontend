import { useState } from "react";

const AIPage = () => {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
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
        "http://localhost:5001/api/v1/ai/chat",
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        🤖 AI Finance Assistant
      </h1>

      {/* Question */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          Your Question
        </label>
        <textarea
          rows={3}
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="e.g. How can I save more money this month?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      {/* Context */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          Financial Context (optional)
        </label>
        <textarea
          rows={4}
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Monthly income, expenses, goals, etc."
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        onClick={handleAskAI}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Reply */}
      {reply && (
        <div className="mt-6 bg-white shadow rounded-xl p-5">
          <h2 className="font-semibold text-lg mb-3 text-gray-700">
            AI Advice
          </h2>
          <p className="whitespace-pre-line text-gray-800">
            {reply}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIPage;
