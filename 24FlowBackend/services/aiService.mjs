import { generateContentWithFallback } from './geminiModel.mjs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getConflictResolution = async (tClass, event) => {
	const prompt = `
You are a scheduling assistant. Respond ONLY with valid JSON.
Class: ${tClass.name} (${tClass.startTime}–${tClass.endTime}) on ${tClass.day}
Event: ${event.title} (${event.startTime.toISOString()}–${event.endTime.toISOString()})
Priority: ${event.priority || 'NORMAL'}

Schema:
{
  "strategy": "MOVE_EVENT" | "MOVE_CLASS" | "CHOICE",
  "options": [
    {
      "target": "EVENT" | "CLASS",
      "newStartTime": "HH:mm",
      "newEndTime": "HH:mm",
      "reason": "string"
    }
  ]
}
`;

	try {
		const result = await generateContentWithFallback(ai, {
			contents: prompt
		});

		// The SDK structure based on your error:
		// Access the text from the response candidates
		const rawText = result.candidates[0].content.parts[0].text;

		// Clean up markdown and parse
		const cleanJson = rawText.replace(/```json|```/gi, '').trim();
		return JSON.parse(cleanJson);
	} catch (error) {
		console.error('Gemini Resolution Error:', error);
		// Return fallback so the app doesn't crash
		return {
			strategy: 'MOVE_EVENT',
			options: [
				{
					target: 'EVENT',
					newStartTime: '12:00',
					newEndTime: '13:00',
					reason: 'System fallback due to AI timeout.'
				}
			]
		};
	}
};

export const generateSheetsData = async (classes) => {
	const prompt = `Convert these classes to CSV (Day,Subject,Start,End,Room): ${JSON.stringify(classes)}. Return raw CSV only.`;

	try {
		const result = await generateContentWithFallback(ai, {
			contents: prompt
		});

		const text = result.candidates[0].content.parts[0].text;
		return text.replace(/```(?:csv)?/g, '').trim();
	} catch (error) {
		console.error('CSV Generation Error:', error);
		return 'Day,Subject,Start,End,Room';
	}
};
