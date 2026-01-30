import { GoogleGenAI, Type } from "@google/genai";
import { Question, Difficulty } from "../types";

const fallbackQuestions: Question[] = [
  {
    id: "fallback-1",
    questionText: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    correctIndex: 1,
    topic: "Data Structures"
  },
  {
    id: "fallback-2",
    questionText: "Which HTTP method is idempotent and used to update a resource?",
    options: ["POST", "PUT", "PATCH", "DELETE"],
    correctIndex: 1,
    topic: "Web Protocols"
  },
  {
    id: "fallback-3",
    questionText: "In React, what is the primary purpose of the useEffect hook?",
    options: ["To manage state", "To handle side effects", "To memorize values", "To create context"],
    correctIndex: 1,
    topic: "React"
  }
];

export const generateTestQuestions = async (difficulty: Difficulty): Promise<Question[]> => {
  if (!process.env.API_KEY) {
    console.warn("API Key missing, using fallback questions.");
    return fallbackQuestions;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Generate 5 challenging technical interview multiple-choice questions suitable for a ${difficulty} Developer role. 
    Mix topics including Algorithms, System Design, Database, and Modern Web Technologies.
    Ensure strict JSON output.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              questionText: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4
              },
              correctIndex: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
              topic: { type: Type.STRING }
            },
            required: ["questionText", "options", "correctIndex", "topic"]
          }
        }
      }
    });

    if (response.text) {
      const rawQuestions = JSON.parse(response.text);
      // Map to add unique IDs
      return rawQuestions.map((q: any, index: number) => ({
        ...q,
        id: `gen-${Date.now()}-${index}`
      }));
    }
    
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Failed to generate questions:", error);
    // Return fallback in case of API error or quota issues so the app remains functional
    return fallbackQuestions;
  }
};