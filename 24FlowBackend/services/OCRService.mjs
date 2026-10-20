import { generateContentWithFallback } from './geminiModel.mjs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
});

export const performOCR = async ({ image, mimeType }) => {
	const prompt = `
        Extract tasks from this image.
        Return ONLY a JSON object:
        {
          "tasks": [
            {
              "text": "The main task title",
              "time": "ISO timestamp or null",
              "tag": "Category",
              "lowConfidence": boolean
            }
          ]
        }
    `; 

	const result = await generateContentWithFallback(ai, {
		contents: [{ inlineData: { mimeType, data: image } }, { text: prompt }]
	});

	// Robustly extract text from Gemini SDK response (supports multiple shapes)
	let aiText = null;

	if (!result) {
		throw new Error('Empty response from AI');
	}

	if (typeof result === 'string') {
		aiText = result;
	} else if (result.text && typeof result.text === 'string') {
		aiText = result.text;
	} else if (result.response && typeof result.response.text === 'function') {
		// response.text() may return a Promise or a string
		const maybe = result.response.text();
		aiText = maybe && typeof maybe.then === 'function' ? await maybe : maybe;
	} else if (Array.isArray(result.candidates)) {
		for (const cand of result.candidates) {
			if (cand?.content?.parts && Array.isArray(cand.content.parts)) {
				const combined = cand.content.parts.map((p) => p.text || '').join('\n');
				if (combined.trim()) {
					aiText = combined;
					break;
				}
			}
			if (!aiText && typeof cand?.content?.text === 'string' && cand.content.text.trim()) {
				aiText = cand.content.text;
				break;
			}
		}
	}

	if (!aiText || !aiText.trim()) {
		console.error('OCR: AI returned empty or unsupported response shape:', result);
		throw new Error('Invalid AI Response Format');
	}

	// Extract JSON object from the AI text
	const jsonMatch = aiText.match(/\{[\s\S]*\}/);
	if (!jsonMatch) {
		console.error('OCR: Could not find JSON in AI text:', aiText);
		throw new Error('Invalid AI Response Format');
	}

	return JSON.parse(jsonMatch[0]);
};
