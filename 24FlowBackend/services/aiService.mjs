import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getConflictResolution = async (tClass, event) => {
	const prompt = `
You are a scheduling assistant.

Rules:
- Classes are FIXED by default.
- Events should be moved unless priority is HIGH.
- If event priority is HIGH, provide TWO options:
  1. Move the event
  2. Move the class

Class:
- Name: ${tClass.name}
- Time: ${tClass.startTime}–${tClass.endTime}
- Day: ${tClass.day}

Event:
- Title: ${event.title}
- Time: ${event.startTime.toISOString()}–${event.endTime.toISOString()}
- Priority: ${event.priority || 'NORMAL'}

Respond ONLY with valid JSON using this schema:

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

	// --- mock AI (replace with real LLM call) ---
	if ((event.priority || 'NORMAL') === 'HIGH') {
		return {
			strategy: 'CHOICE',
			options: [
				{
					target: 'EVENT',
					newStartTime: '11:30',
					newEndTime: '12:30',
					reason: 'Preserves class schedule'
				},
				{
					target: 'CLASS',
					newStartTime: '12:30',
					newEndTime: '14:30',
					reason: 'Respects high-priority event'
				}
			]
		};
	}

	return {
		strategy: 'MOVE_EVENT',
		options: [
			{
				target: 'EVENT',
				newStartTime: '12:00',
				newEndTime: '13:00',
				reason: 'Class has fixed academic priority'
			}
		]
	};
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