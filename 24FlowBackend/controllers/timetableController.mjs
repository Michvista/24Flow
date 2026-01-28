import prisma from '../db.mjs';
import {
	checkTimetableConflicts,
	detectLargeGaps
} from '../services/timetableService.mjs';
import { generateSheetsData } from '../services/aiService.mjs';

export const getTimetable = async (req, res, next) => {
	try {
		const data = await prisma.timetableClass.findMany({
			where: { userId: req.user.id },
			orderBy: { startTime: 'asc' }
		});
		res.json({ status: 'success', data });
	} catch (e) {
		next(e);
	}
};

export const persistTimetable = async (req, res, next) => {
	try {
		const { classes } = req.body;
		const userId = req.user.id;

		await prisma.$transaction([
			prisma.timetableClass.deleteMany({ where: { userId } }),
			prisma.timetableClass.createMany({
				data: classes.map((c) => ({
					userId,
					name: c.name,
					day: c.day,
					startTime: c.startTime,
					endTime: c.endTime,
					room: c.room || 'TBA',
					icon: 'School'
				}))
			})
		]);

		res.json({ status: 'success' });
	} catch (e) {
		next(e);
	}
};

export const checkConflicts = async (req, res, next) => {
	try {
		// Fix: Destructure 'classes' from req.body
		const { classes } = req.body;
		const userId = req.user.id;

		if (!classes || !Array.isArray(classes)) {
			return res.status(400).json({ error: 'No classes provided' });
		}

		// Pass the extracted classes variable
		const conflicts = await checkTimetableConflicts(userId, classes);

		// Pass the extracted classes variable to the gap detector
		const tips = detectLargeGaps(classes);

		res.json({
			status: 'success',
			conflicts,
			tips
		});
	} catch (e) {
		console.error('Conflict Detection Failed:', e);
		next(e); // This passes the error to your global error handler
	}
};
/**
 * Syncs the staged timetable to the main calendar for a 12-week duration.
 * Includes duplicate protection by removing previous timetable-sourced events.
 */
export const syncCalendar = async (userId, classes) => {
	// 1. DELETE PROTECTION: Remove any previously synced timetable events
	// This ensures clicking 'Sync' twice doesn't double-book the calendar.
	await prisma.event.deleteMany({
		where: {
			userId,
			meta: {
				path: ['source'],
				equals: 'timetable'
			}
		}
	});

	const events = [];

	// Helper: Calculates the Date object for the next occurrence of a weekday
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
		// Calculate days until next occurrence
		resultDate.setDate(now.getDate() + ((targetDay + 7 - now.getDay()) % 7));
		return resultDate;
	};

	// 2. GENERATE 12 WEEKS OF EVENTS
	for (const c of classes) {
		const firstDate = getNextDateForDay(c.day);

		// We assume c.startTime and c.endTime are strings like "09:00"
		// If your data uses c.time (e.g. "09:00 - 10:30"), split it first:
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
				color: '#1973f0',
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
		await prisma.event.createMany({ data: events });
	}

	return { count: events.length };
};

export const exportToSheets = async (req, res, next) => {
	try {
		const csv = await generateSheetsData(req.body.classes);
		res.json({ status: 'success', csv });
	} catch (e) {
		next(e);
	}
};
