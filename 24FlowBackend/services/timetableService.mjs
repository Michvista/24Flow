import prisma from '../db.mjs';
import { getConflictResolution } from './aiService.mjs';
import { getNextDateForDay } from '../utils/dateUtils.mjs';

/* ---------- helpers ---------- */

const timeToMinutes = (time) => {
	const [h, m] = time.split(':').map(Number);
	return h * 60 + m;
};

const hasOverlap = (tClass, event) => {
	const tStart = timeToMinutes(tClass.startTime);
	const tEnd = timeToMinutes(tClass.endTime);

	const eStart = event.startTime.getHours() * 60 + event.startTime.getMinutes();
	const eEnd = event.endTime.getHours() * 60 + event.endTime.getMinutes();

	return tStart < eEnd && tEnd > eStart;
};

/* ---------- services ---------- */

export const checkTimetableConflicts = async (userId, classes) => {
	const events = await prisma.event.findMany({ where: { userId } });
	const conflicts = [];

	for (const tClass of classes) {
		for (const event of events) {
			const eventDay = event.startTime.toLocaleDateString('en-US', {
				weekday: 'long'
			});
			if (eventDay !== tClass.day) continue;

			if (hasOverlap(tClass, event)) {
				const suggestion = await getConflictResolution(tClass, event);

			conflicts.push({
				class: {
					id: tClass.id,
					name: tClass.name,
					day: tClass.day,
					startTime: tClass.startTime,
					endTime: tClass.endTime
				},
				event: {
					id: event.id,
					title: event.title,
					startTime: event.startTime,
					endTime: event.endTime
				},
				suggestion
			});

			}
		}
	}

	return conflicts;
};

export const syncTimetableToCalendar = async (userId, classes) => {
	const events = classes.map((c) => {
		const baseDate = getNextDateForDay(c.day);

		const [sh, sm] = c.startTime.split(':');
		const [eh, em] = c.endTime.split(':');

		const startTime = new Date(baseDate);
		startTime.setHours(sh, sm, 0, 0);

		const endTime = new Date(baseDate);
		endTime.setHours(eh, em, 0, 0);

		return {
			userId,
			title: `Class: ${c.name}`,
			startTime,
			endTime,
			color: '#1973f0',
			colorName: 'blue'
		};
	});

	await prisma.event.createMany({ data: events });
};
