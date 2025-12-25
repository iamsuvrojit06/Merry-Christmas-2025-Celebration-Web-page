
import { GoogleGenAI, Type } from "@google/genai";
import { GiftSuggestion } from "../types";

// Note: process.env.API_KEY is handled by the environment
// Using the recommended initialization pattern as per @google/genai guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGiftIdeas = async (recipient: string, interests: string): Promise<GiftSuggestion[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest 3 creative and thoughtful Christmas gift ideas for ${recipient} who is interested in ${interests}. Focus on unique items specifically for the 2025 holiday season. Return JSON only.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["name", "description", "reason"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Failed to parse gift ideas", e);
    return [];
  }
};

// Fixed the history type from a single-element tuple [{ text: string }] to an array { text: string }[] 
// to resolve the TypeScript error in SantaChat.tsx.
export const chatWithSanta = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAI();
  // Using generateContent with history as it's more robust for this stateless implementation
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: "You are Santa Claus. You are warm, jolly, and kind. You respond with 'Ho Ho Ho!' occasionally. You love cookies, milk, and your reindeer. The current year is 2025. Keep your responses festive and magical. Always acknowledge the child's message with warmth.",
    }
  });

  return response.text || "Ho ho ho! Something went wrong in the workshop, try again, little one!";
};

export const getHolidayWisdom = async (): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Tell me a short, magical Christmas blessing or a fascinating Christmas trivia fact for 2025. Keep it under 2 sentences.",
  });
  return response.text || "Merry Christmas to all, and to all a good night!";
};
