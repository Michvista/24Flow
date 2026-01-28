import prisma from '../db.mjs';
import { getConflictResolution } from './aiService.mjs';
import { getNextDateForDay } from '../utils/dateUtils.mjs';
import { buildClassDateRange, hasOverlap } from '../utils/timetableUtils.mjs';

/* ---------- helpers ---------- */

/* ---------- services ---------- */

// Inside services/timetableService.mjs
export const checkTimetableConflicts = async (userId, classes) => {
    const events = await prisma.event.findMany({ where: { userId } });
    const conflicts = [];

    for (const tClass of classes) {
        // Use your utility to get a Date object range
        const classRange = buildClassDateRange(tClass);

        for (const event of events) {
            // Check if they are on the same weekday
            const eventDay = event.startTime.toLocaleDateString('en-US', { weekday: 'long' });
            if (eventDay !== tClass.day) continue;

            // Use your overlap utility
            if (hasOverlap(classRange, event)) {
                const suggestion = await getConflictResolution(tClass, event);
                conflicts.push({
                    class: tClass,
                    event: event,
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

export const detectLargeGaps = (classes) => {
	if (!classes || classes.length === 0) return [];

	const byDay = {};
	for (const c of classes) {
		if (!byDay[c.day]) byDay[c.day] = [];
		byDay[c.day].push(c);
	}

	const tips = [];
	for (const day in byDay) {
		// Sort by start time string
		const sorted = byDay[day].sort((a, b) => a.startTime.localeCompare(b.startTime));

		for (let i = 0; i < sorted.length - 1; i++) {
			const currentEnd = sorted[i].endTime.split(':');
			const nextStart = sorted[i + 1].startTime.split(':');

			// Convert to total minutes for accuracy
			const endMin = parseInt(currentEnd[0]) * 60 + parseInt(currentEnd[1]);
			const startMin = parseInt(nextStart[0]) * 60 + parseInt(nextStart[1]);

			const gapInMinutes = startMin - endMin;

			if (gapInMinutes >= 120) {
				// 2 hours
				tips.push({
					day,
					from: sorted[i].endTime,
					to: sorted[i + 1].startTime
				});
			}
		}
	}
	return tips;
};

export const syncCalendar = async (userId, classes) => {
	try {
		console.log(`Starting sync for user ${userId} with ${classes.length} classes.`);

		// 1. DELETE PROTECTION
		// We use a simplified filter. If your DB is SQLite, deep JSON paths can fail.
		// This targets events created by the timetable source.
		await prisma.event.deleteMany({
			where: {
				userId: userId,
				meta: {
					path: ['source'],
					equals: 'timetable'
				}
			}
		});

		const events = [];

		const getNextDateForDay = (dayName) => {
			const daysMap = {
				Sunday: 0,
				Monday: 1,
				Tuesday: 2,
				Wednesday: 3,
				Thursday: 4,
				Friday: 5,
				Saturday: 6
			};
			const targetDay = daysMap[dayName];
			const now = new Date();
			const resultDate = new Date(now);
			resultDate.setDate(now.getDate() + ((targetDay + 7 - now.getDay()) % 7));
			return resultDate;
		};

		// 2. GENERATE 12 WEEKS OF EVENTS
		for (const c of classes) {
			const firstDate = getNextDateForDay(c.day);
			const [sh, sm] = c.startTime.split(':');
			const [eh, em] = c.endTime.split(':');

			for (let week = 0; week < 12; week++) {
				const baseDate = new Date(firstDate);
				baseDate.setDate(firstDate.getDate() + week * 7);

				const startTime = new Date(baseDate);
				startTime.setHours(parseInt(sh), parseInt(sm), 0, 0);

				const endTime = new Date(baseDate);
				endTime.setHours(parseInt(eh), parseInt(em), 0, 0);

				events.push({
					userId,
					title: `Class: ${c.name}`,
					location: c.room || 'TBA',
					startTime,
					endTime,
					color: '#1973f0', // Signature Blue
					colorName: 'blue',
					meta: {
						source: 'timetable',
						classId: c.id,
						week: week + 1
					}
				});
			}
		}

		// 3. BATCH INSERT
		if (events.length > 0) {
			const result = await prisma.event.createMany({ data: events });
			console.log(`Successfully synced ${result.count} events.`);
			return { count: result.count };
		}

		return { count: 0 };
	} catch (error) {
		console.error('DETAILED SYNC ERROR:', error);
		throw error;
	}
};
