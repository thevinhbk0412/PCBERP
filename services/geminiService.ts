
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Correctly initialize with process.env.API_KEY as a required named parameter.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async editQualityImage(base64Image: string, prompt: string): Promise<string | null> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image.split(',')[1] || base64Image,
                mimeType: 'image/png',
              },
            },
            {
              text: `Please edit this quality inspection image: ${prompt}. Return only the edited image.`,
            },
          ],
        },
      });

      // Iterating through parts as required for nano banana series models.
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Gemini Image Edit Error:", error);
      return null;
    }
  }

  async getAiAnalytics(data: any): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this PCBA manufacturing data and provide 3 key insights for production optimization: ${JSON.stringify(data)}`,
      });
      // Accessing the .text property directly as it is not a method.
      return response.text || "Unable to generate insights at this time.";
    } catch (error) {
      console.error("Gemini Analytics Error:", error);
      return "Analytics engine offline.";
    }
  }
}

export const geminiService = new GeminiService();
