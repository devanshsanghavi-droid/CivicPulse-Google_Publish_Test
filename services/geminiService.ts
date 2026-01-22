
import { GoogleGenAI, Type } from "@google/genai";
import { Issue } from "../types";

// Lazy initialization to avoid errors when API key is missing
let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI | null => {
  if (!ai && process.env.API_KEY) {
    try {
      ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } catch (error) {
      console.warn("Failed to initialize Google GenAI:", error);
      return null;
    }
  }
  return ai;
};

export const geminiService = {
  /**
   * Generates a weekly city summary using reported issues.
   */
  async generateWeeklySummary(issues: Issue[]): Promise<string> {
    if (!issues.length) return "No significant issues reported this week.";
    
    const aiInstance = getAI();
    if (!aiInstance) {
      return "AI summary unavailable. Please configure your API key.";
    }
    
    const issueContext = issues.map(i => `- ${i.title}: ${i.description} (${i.upvoteCount} upvotes)`).join('\n');

    try {
      const response = await aiInstance.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a City Manager. Summarize the following top issues reported by residents this week into a professional but empathetic update for the City Council. Highlight trends and priorities based on upvotes.\n\nIssues:\n${issueContext}`,
        config: {
          systemInstruction: "You are a professional city official communicating to the public and other council members.",
          maxOutputTokens: 500,
        }
      });
      // Fix: Direct property access for text
      return response.text || "Summary unavailable.";
    } catch (error) {
      console.error("Gemini summary failed:", error);
      return "Unable to generate summary at this time.";
    }
  },

  /**
   * Helps determine if an issue might be a duplicate based on text.
   */
  async checkDuplicate(newIssueTitle: string, existingIssues: Issue[]): Promise<boolean> {
    if (existingIssues.length === 0) return false;

    const aiInstance = getAI();
    if (!aiInstance) {
      return false; // Without API key, don't check for duplicates
    }

    const titles = existingIssues.map(i => i.title).join(', ');
    
    try {
      const response = await aiInstance.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `New issue title: "${newIssueTitle}"\nExisting issues: ${titles}\nIs the new issue likely a duplicate of any existing ones? Answer with a JSON boolean.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isDuplicate: { type: Type.BOOLEAN }
            },
            required: ['isDuplicate']
          }
        }
      });
      // Fix: Direct property access for text
      const result = JSON.parse(response.text || '{"isDuplicate": false}');
      return result.isDuplicate;
    } catch {
      return false;
    }
  }
};
