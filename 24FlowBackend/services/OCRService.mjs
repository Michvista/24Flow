import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const performOCR = async ({ image, mimeType }) => {
    const model = ai.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const prompt = `
        Extract tasks from this image. 
        Return ONLY a JSON object with this structure:
        { "tasks": [{ "text": "task name", "time": "ISO timestamp or null", "tag": "short category", "lowConfidence": boolean }] }
    `;

    const result = await model.generateContent([
        prompt,
        { inlineData: { data: image, mimeType } }
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch[0]);
};