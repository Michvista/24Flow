import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
});

export const performOCR = async ({
	image, // base64 string (NO data:image/... prefix)
	mimeType // e.g. "image/png", "image/jpeg"
}) => {
	const prompt = `
Extract tasks from this image.

Return ONLY a JSON object with this structure:
{
  "tasks": [
    {
      "text": "task name",
      "time": "ISO timestamp or null",
      "tag": "short category",
      "lowConfidence": boolean
    }
  ]
}
`;

	const result = await ai.models.generateContent({
		model: 'gemini-3-flash-preview',
		contents: [
			{
				inlineData: {
					mimeType,
					data: image
				}
			},
			{
				text: prompt
			}
		]
	});

	// NEW SDK: text is directly exposed
	const text = result.text;

	// Safety: extract JSON only (LLMs can still wrap text)
	const jsonMatch = text.match(/\{[\s\S]*\}/);

	if (!jsonMatch) {
		throw new Error('Failed to extract JSON from Gemini response');
	}

	return JSON.parse(jsonMatch[0]);
};
