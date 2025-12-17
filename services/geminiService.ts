import { GoogleGenAI } from "@google/genai";
import { EnhancementMode } from '../types';
import { PROMPTS } from '../constants';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing. Please set it in your environment.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

export const enhanceText = async (text: string, mode: EnhancementMode): Promise<string> => {
  if (!text.trim()) return "";
  
  const promptConfig = PROMPTS[mode];
  
  // Construct the full prompt based on the user's template
  const fullPrompt = `${promptConfig.role} ${promptConfig.instruction}\n\nText to fix:\n${text}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullPrompt,
      config: {
        temperature: promptConfig.settings.temperature,
        topK: promptConfig.settings.topK,
        topP: promptConfig.settings.topP,
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to enhance text. Please try again.");
  }
};