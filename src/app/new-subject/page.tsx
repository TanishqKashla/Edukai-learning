"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopics, setSubtopics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          topic,
          subtopics: subtopics.split("\n").filter((s) => s.trim() !== ""),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate notes. Please try again.");
      }

      const data = await response.json();
      sessionStorage.setItem("generatedNotes", JSON.stringify(data.notes));
      router.push("/notes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-50">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          AI-Powered Notes Generator
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mb-12">
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., History"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="topic" className="block text-gray-700 font-medium mb-2">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., The Renaissance"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subtopics" className="block text-gray-700 font-medium mb-2">
              Subtopics (one per line)
            </label>
            <textarea
              id="subtopics"
              value={subtopics}
              onChange={(e) => setSubtopics(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              placeholder="e.g., Art\nScience\nLiterature"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Notes"}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-8">
            <p>{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}