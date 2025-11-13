"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Note = {
  subtopic: string;
  notes: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedNotes = sessionStorage.getItem("generatedNotes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-50">
        <p className="text-gray-600">Loading notes...</p>
      </main>
    );
  }

  if (notes.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No notes found.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Generate New Notes
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-50">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Generated Notes</h1>
            <button
                onClick={() => router.push("/")}
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Generate New Notes
            </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          {notes.map((note, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{note.subtopic}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{note.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
