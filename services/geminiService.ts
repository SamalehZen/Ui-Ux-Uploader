import { GoogleGenAI } from "@google/genai";

export const analyzeFileContent = async (text: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following "Project Brief" text. Provide a very short, bulleted summary (max 3 points) of what this project is about, suitable for a quick UI preview.
      
      Text Content:
      ${text.substring(0, 5000)}`, // Limit length for safety
    });

    return response.text || "Analysis complete.";
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "Could not analyze file content.";
  }
};