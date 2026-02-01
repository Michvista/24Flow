import schedule from 'node-schedule';
import prisma from '../db.mjs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateAndStoreReport = async (userId) => {
	try {
		const userData = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				moods: { take: 15, orderBy: { createdAt: 'desc' } },
				events: { take: 20, orderBy: { startTime: 'desc' } }
			}
		});

		if (!userData) return null;

		const currentDay = [
			'Sundays',
			'Mondays',
			'Tuesdays',
			'Wednesdays',
			'Thursdays',
			'Fridays',
			'Saturdays'
		][new Date().getDay()];

		const prompt = `
            Act as a Behavioral Intelligence Agent. Analyze the user's data:
            Current Day: ${currentDay}
            Recent Moods: ${JSON.stringify(userData.moods)}
            Recent History: ${JSON.stringify(userData.events)}

            TASK:
            1. Look for patterns: Does the user usually do something specific on ${currentDay}?
            2. If no clear pattern for ${currentDay} exists, suggest a task that balances their recent moods (e.g., if TIRED, suggest something light; if PRODUCTIVE, suggest a challenge).
            3. The "probability" should reflect how certain you are this fits their routine or current state.

            Return ONLY valid JSON:
            {
              "eventName": "Title of task",
              "eventTime": "HH:MM AM/PM",
              "probability": "XX%"
            }
        `;

		const response = await ai.models.generateContent({
			model: 'gemini-3-flash-preview',
			contents: prompt
		});

		let text;
		if (typeof response?.response?.text === 'function') {
			text = (await response.response.text()).trim();
		} else if (typeof response?.text === 'string') {
			text = response.text.trim();
		} else if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
			text = response.candidates[0].content.parts[0].text.trim();
		} else {
			throw new Error('No text returned from Gemini');
		}

		// Strip markdown code blocks if present
		const cleanJson = text.replace(/```json|```/g, '').trim();

		let parsed;
		try {
			parsed = JSON.parse(cleanJson);
		} catch {
			console.error('Failed to parse JSON. Raw text:', text);
			throw new Error('Gemini returned invalid JSON');
		}

		return await prisma.behaviorSummary.upsert({
			where: { userId },
			update: { summary: parsed, updatedAt: new Date() },
			create: { userId, summary: parsed }
		});
	} catch (err) {
		console.error(`Generation failed for user ${userId}:`, err);
		return null;
	}
};

export const initCron = () => {
	// Runs every hour (change if needed)
	schedule.scheduleJob('0 * * * *', async () => {
		console.log('--- Running Scheduled Reports ---');
		const users = await prisma.user.findMany({ select: { id: true } });
		for (const user of users) {
			await generateAndStoreReport(user.id);
		}
	});
};
