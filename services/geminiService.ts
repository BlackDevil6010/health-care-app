import { GoogleGenAI, Chat } from "@google/genai";
import type { Message } from '../types';

let chat: Chat | null = null;

const getChatInstance = (): Chat => {
  if (!chat) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Convert previous messages to Gemini format, ignoring IDs
    const history = []; // Not passing history for this simple implementation
    
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: history,
      config: {
        systemInstruction: `You are a helpful and empathetic AI healthcare assistant named 'Aura'. 
Your primary function is to act as a symptom checker.

When a user describes their symptoms, your response MUST be structured as follows, using Markdown for formatting:
1.  **Acknowledge and Empathize:** Start with a caring message in a normal paragraph.
2.  **Potential Conditions:** Use a heading like '### Potential Conditions'. Below this, list potential conditions using bullet points ('*'). You can use bold ('**text**') for emphasis on condition names.
3.  **Recommended Next Steps:** Use a heading like '### Recommended Next Steps'. Below this, provide advice using bullet points ('*').
4.  **Disclaimer:** The disclaimer MUST be the very last part of your response. It must be separated from the content above by a horizontal rule ('---'). It must be a blockquote ('>') and contain the following text verbatim:
"Disclaimer: I am an AI assistant and not a substitute for professional medical advice. Please consult with a qualified healthcare provider for any medical concerns."`,
      },
    });
  }
  return chat;
};

export const runChat = async (prompt: string): Promise<string> => {
  try {
    const chatInstance = getChatInstance();
    const response = await chatInstance.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    // In case of an error, reset the chat instance.
    chat = null;
    return "I'm sorry, but I'm having trouble connecting right now. Please try again later.";
  }
};