
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getHealthTip(query: string): Promise<string> {
  if (!process.env.API_KEY) return "Remember to take medicines only as prescribed by your doctor.";
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a very short, helpful medical disclaimer and general health tip related to searching for ${query}. Keep it reassuring and brief. No bold markdown.`,
      config: {
        maxOutputTokens: 100,
        temperature: 0.7,
      }
    });
    return response.text || "Consult your physician before taking any new medication.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Your health is priority. Always verify stock with the store via phone.";
  }
}

export async function getMedicineAlternatives(medicineName: string): Promise<string[]> {
  if (!process.env.API_KEY) return [];
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `List 3 common pharmaceutical alternatives or generic names for ${medicineName}. Format as a simple comma-separated list. No other text.`,
    });
    return (response.text || "").split(',').map(s => s.trim()).filter(s => s.length > 0);
  } catch (error) {
    return [];
  }
}
