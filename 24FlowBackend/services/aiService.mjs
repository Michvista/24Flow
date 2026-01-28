import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getConflictResolution = async (tClass, clash) => {
	const prompt = `
You are an academic scheduling assistant.

A timetable class conflicts with a calendar event.

CLASS:
- Name: ${tClass.name}
- Day: ${tClass.day}
- Time: ${tClass.startTime} to ${tClass.endTime}

EVENT:
- Title: ${clash.title}
- Time: ${clash.startTime.toTimeString().slice(0, 5)} to ${clash.endTime.toTimeString().slice(0, 5)}

Rules:
- Respond with VALID JSON ONLY.
- No markdown.
- No explanation.
- Use 24-hour HH:mm format.

JSON schema:
{
  "action": "MOVE_CLASS" | "MOVE_EVENT" | "KEEP_BOTH",
  "newStartTime": "HH:mm" | null,
  "newEndTime": "HH:mm" | null,
  "reason": "string"
}
`;

	try {
		const result = await ai.models.generateContent({
			model: 'gemini-3-flash-preview',
			contents: [{ role: 'user', parts: [{ text: prompt }] }]
		});

		// 🔐 SAFE EXTRACTION
		const candidates = result?.candidates;
		const text = candidates?.[0]?.content?.parts?.[0]?.text;

		if (!text) {
			throw new Error('Empty AI response');
		}

		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (!jsonMatch) {
			throw new Error('No JSON found in AI response');
		}

		return JSON.parse(jsonMatch[0]);
	} catch (error) {
		console.error('AI Resolution Error:', error.message);

		return {
			action: 'KEEP_BOTH',
			newStartTime: null,
			newEndTime: null,
			reason: 'Automatic resolution unavailable. Please adjust manually.'
		};
	}
};

export const generateSheetsData = async (classes) => {
	const prompt = `Convert these classes to a CSV (Day,Subject,Start,End,Room): ${JSON.stringify(classes)}. Return raw CSV only.`;

	try {
		const result = await ai.models.generateContent({
			model: 'gemini-3-flash-preview',
			contents: [{ role: 'user', parts: [{ text: prompt }] }]
		});

		// 🔐 SAFE EXTRACTION
		const candidates = result?.candidates;
		const text = candidates?.[0]?.content?.parts?.[0]?.text;

		if (!text) {
			throw new Error('Empty AI response');
		}

		// Clean any markdown formatting (e.g., ```csv ... ```) to get raw CSV
		const csvContent = text.replace(/```(?:csv)?/g, '').trim();

		if (!csvContent) {
			throw new Error('No CSV content found in AI response');
		}

		return csvContent;
	} catch (error) {
		console.error('CSV Generation Error:', error.message);

		// Fallback: Return headers only so the download doesn't crash
		return 'Day,Subject,Start,End,Room';
	}
};