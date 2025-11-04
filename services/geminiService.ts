
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
Your goal is to provide general health information and guidance in a clear and friendly manner.
You are not a real doctor.
IMPORTANT: At the end of every response, you MUST include this disclaimer:
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
