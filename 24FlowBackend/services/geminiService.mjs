import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const generateWithGemini = async (preferences) => {
	try {
		const prompt = `
You are an academic planning AI.

Create a study timetable in STRICT JSON.
No markdown. No explanation.

User Preferences:
${JSON.stringify(preferences)}

Return EXACT format:

{
  "schedule": {
    "days": [],
    "weeks": [],
    "list": []
  },
  "tips": []
}
`;

		const result = await ai.models.generateContent({
		model: 'gemini-3-flash-preview',
		contents: prompt
	});
		const response = result.response.text();

		// Safety clean
		const cleaned = response
			.replace(/```json/g, '')
			.replace(/```/g, '')
			.trim();

		return JSON.parse(cleaned);
	} catch (err) {
		console.error('Gemini error:', err);

		return {
			schedule: { days: [], weeks: [], list: [] },
			tips: ['AI generation failed. Try again.']
		};
	}
};
