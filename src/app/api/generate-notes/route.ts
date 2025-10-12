import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// IMPORTANT: Create a .env.local file in your project's root directory
// and add your Groq API key as GROQ_API_KEY=your_api_key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { subject, topic, subtopics } = await req.json();

    if (!subject || !topic || !subtopics || !Array.isArray(subtopics)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // --- MOCK IMPLEMENTATION ---
    // This is a placeholder. It simulates the AI's response.
    // Replace this with the actual Groq API call below.
    // const mockNotes = subtopics.map((subtopic: string) => ({
    //   subtopic,
    //   notes: `This is a placeholder note for the subtopic "${subtopic}" under the topic "${topic}" in the subject "${subject}".\n\nReplace this mock implementation with the real Groq API call to generate actual notes. You will need to provide your Groq API key in the .env.local file.`,
    // }));

    // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // return NextResponse.json({ notes: mockNotes });
    // --- END OF MOCK IMPLEMENTATION ---




    const generatedNotes = await Promise.all(
      subtopics.map(async (subtopic: string) => {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are an expert note-taking assistant. Your goal is to generate clear, concise, and accurate notes.
                        Generate notes for the subtopic: "${subtopic}"
                        The main topic is: "${topic}"
                        The subject is: "${subject}"
                        Provide the notes in a well-structured format.`,
            },
            {
              role: "user",
              content: `Generate notes for the subtopic: ${subtopic}`,
            },
          ],
          model: "llama-3.3-70b-versatile", // Or any other model you prefer
        });

        return {
          subtopic,
          notes: chatCompletion.choices[0]?.message?.content || "No content generated.",
        };
      })
    );

    return NextResponse.json({ notes: generatedNotes });
   

  } catch (error) {
    console.error("Error generating notes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
