import { generateContentWithFallback } from './geminiModel.mjs';
import prisma from '../db.mjs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY
});

const colors = [
	{ bg: '#f7ff5c', text: '#000000', name: 'secondary-yellow' },
	{ bg: '#00f57a', text: '#000000', name: 'secondary-green' },
	{ bg: '#af52de', text: '#ffffff', name: 'secondary-purple' },
	{ bg: '#3d7bff', text: '#ffffff', name: 'primary-accent' },
	{ bg: '#ff5c5c', text: '#000000', name: 'neo-red' },
	{ bg: '#ff90e8', text: '#000000', name: 'neo-pink' },
	{ bg: '#05d9e8', text: '#000000', name: 'neo-cyan' },
	{ bg: '#ffbd12', text: '#000000', name: 'neo-orange' },
	{ bg: '#000000', text: '#ffffff', name: 'ink-black' },
	{ bg: '#ffffff', text: '#000000', name: 'stark-white' },
	{ bg: '#bebebe', text: '#000000', name: 'concrete-gray' },
	{ bg: '#d6ff00', text: '#000000', name: 'acid-lime' },
	{ bg: '#8a2be2', text: '#ffffff', name: 'royal-purple' },
	{ bg: '#171717', text: '#00f57a', name: 'dark-mode-bg' }
];

export const processAndSaveNLPEvent = async (payload, userId) => {
	const { userInput } = payload;

	const now = new Date();
	const dateContext = `Today is ${now.toDateString()}. Current time is ${now.toLocaleTimeString()}.`;

	const prompt = `
        You are a scheduling assistant. ${dateContext}
        TASK: Extract events from the user's text and convert relative times to ISO 8601 timestamps.
        CATEGORIES: Study, Social, Health, Work, Other
        RETURN FORMAT (STRICT JSON):
        {
          "events": [
            {
              "title": string,
              "startTime": "ISO_8601_DATETIME_STRING",
              "endTime": "ISO_8601_DATETIME_STRING",
              "category": string,
              "priority": string
            }
          ]
        }
        USER INPUT: "${userInput}"
    `;

	const response = await generateContentWithFallback(ai, {
		contents: prompt
	});

	const jsonMatch = response.text.match(/\{[\s\S]*\}/);
	if (!jsonMatch) throw new Error('AI did not return valid JSON');
	const { events } = JSON.parse(jsonMatch[0]);

	const shuffle = (arr) => {
		const a = arr.slice();
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	};
	const palette = shuffle(colors);

	const createdEvents = await Promise.all(
		events.map((event, idx) => {
			const style = palette[idx % palette.length];

			// PREVENT PRISMA ERROR:
			// We map only the fields that exist in your schema.
			// We put 'category' and 'priority' into the 'desc' field instead.
			return prisma.event.create({
				data: {
					title: event.title,
					startTime: new Date(event.startTime),
					endTime: new Date(event.endTime),
					color: style.bg,
					textColor: style.text,
					colorName: style.name,
					userId: userId,
					// Note: Your schema maps 'desc' to the DB column 'description'
					desc: `Category: ${event.category} | Priority: ${event.priority}`
				}
			});
		})
	);

	return createdEvents;
};