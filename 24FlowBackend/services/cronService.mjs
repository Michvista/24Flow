import schedule from 'node-schedule';
import prisma from '../db.mjs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const initCron = () => {
	// Run at 07:00 AM every day
	schedule.scheduleJob('0 7 * * *', async () => {
		console.log('--- Generating Morning Intelligence Reports ---');
		const users = await prisma.user.findMany();

		for (const user of users) {
			try {
				const userData = await prisma.user.findUnique({
					where: { id: user.id },
					include: { moods: { take: 10 }, events: { take: 10 } }
				});

				const prompt = `Suggest a task for today based on: Moods: ${JSON.stringify(userData.moods)}, Events: ${JSON.stringify(userData.events)}. Return ONLY JSON: {"eventName": "Title", "eventTime": "09:00 AM", "probability": "85%"}`;

				const response = await ai.models.generateContent({
					model: 'gemini-3-flash-preview',
					contents: [{ role: 'user', parts: [{ text: prompt }] }]
				});

				const cleanJson = response.response
					.text()
					.replace(/```json|```/g, '')
					.trim();
				const report = JSON.parse(cleanJson);

				// Store in the database so it's ready for the user
				await prisma.behaviorSummary.upsert({
					where: { userId: user.id },
					update: { summary: report, updatedAt: new Date() },
					create: { userId: user.id, summary: report }
				});
			} catch (err) {
				console.error(`Cron failed for user ${user.id}:`, err);
			}
		}
	});
};
