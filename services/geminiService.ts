import { GoogleGenAI, Modality } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAi = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            // A simple alert for this example app. In a real app, handle this more gracefully.
            alert("API Key not found. Please set it up in your environment variables.");
            throw new Error("API Key not found.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};


export async function editImage(
    base64Image: string, 
    mimeType: string, 
    prompt: string,
    backgroundImage?: { base64: string, mimeType: string }
): Promise<string> {
    const aiInstance = getAi();

    const parts: any[] = [
        {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            },
        },
    ];

    if (backgroundImage) {
        parts.push({
            inlineData: {
                data: backgroundImage.base64,
                mimeType: backgroundImage.mimeType,
            },
        });
    }

    parts.push({ text: prompt });

    try {
        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        
        throw new Error('No image data found in the API response.');

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error('Failed to edit image with Gemini API.');
    }
}