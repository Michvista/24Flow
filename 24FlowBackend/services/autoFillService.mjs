import prisma from '../db.mjs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const colors = [
	// Original Palette
	{ bg: '#f7ff5c', text: '#000000', name: 'secondary-yellow' },
	{ bg: '#00f57a', text: '#000000', name: 'secondary-green' },
	{ bg: '#af52de', text: '#ffffff', name: 'secondary-purple' },
	{ bg: '#3d7bff', text: '#ffffff', name: 'primary-accent' },

	// Extended High-Contrast Vivids
	{ bg: '#ff5c5c', text: '#000000', name: 'neo-red' },
	{ bg: '#ff90e8', text: '#000000', name: 'neo-pink' },
	{ bg: '#05d9e8', text: '#000000', name: 'neo-cyan' },
	{ bg: '#ffbd12', text: '#000000', name: 'neo-orange' },

	// Deep Neutrals (For Heavy Borders & Shadows)
	{ bg: '#000000', text: '#ffffff', name: 'ink-black' },
	{ bg: '#ffffff', text: '#000000', name: 'stark-white' },
	{ bg: '#bebebe', text: '#000000', name: 'concrete-gray' },

	// Muted Accents (For secondary UI elements)
	{ bg: '#d6ff00', text: '#000000', name: 'acid-lime' },
	{ bg: '#8a2be2', text: '#ffffff', name: 'royal-purple' },
	{ bg: '#171717', text: '#00f57a', name: 'dark-mode-bg' }
];

export const generateAutoFill = async (payload, userId) => {
	const { tasks, availability, date } = payload;

	// Fetch existing events to find "Busy" slots
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);
	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);

	const busySlots = await prisma.event.findMany({
		where: {
			userId,
			startTime: { gte: startOfDay },
			endTime: { lte: endOfDay }
		},
		orderBy: { startTime: 'asc' }
	});

	const prompt = `
        You are an expert schedule optimizer. 
        USER CONTEXT:
        - Work Window: ${availability.start} to ${availability.end}
        - Date: ${date}
        - Busy Slots: ${JSON.stringify(busySlots.map((s) => ({ start: s.startTime, end: s.endTime })))}
        - Tasks to fit: ${JSON.stringify(tasks)}

        GOALS:
        1. Schedule the tasks into free gaps within the Work Window.
        2. DO NOT overlap with Busy Slots. 
        3. Give at least 5-20 minutes breaks in between each task.
        4. Add the tasks in order of the priority you gauge (higher priority first).
        5. Return ONLY a JSON array: [{"title": string, "startTime": "ISO String", "endTime": "ISO String", "color": string}]
    `;

	const response = await ai.models.generateContent({
		model: 'gemini-3-flash-preview',
		contents: prompt
	});

	const rawText = response.text;
	const jsonMatch = rawText.match(/\[.*\]/s);
	const scheduledTasks = JSON.parse(jsonMatch[0]);

	// Prepare a shuffled palette so events get varied colors.
	const shuffle = (arr) => {
		const a = arr.slice();
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	};

	const palette = shuffle(colors);

	// Save to Database — assign a color per event by cycling the (shuffled) palette
	const createdEvents = await Promise.all(
		scheduledTasks.map((event, idx) => {
			const style = palette[idx % palette.length];
			return prisma.event.create({
				data: {
					title: event.title,
					startTime: new Date(event.startTime),
					endTime: new Date(event.endTime),
					color: style.bg,
					textColor: style.text,
					colorName: style.name,
					userId: userId,
					desc: 'AI Auto-filled'
				}
			});
		})
	);

	return createdEvents;
};
