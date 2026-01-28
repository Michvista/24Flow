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

// This is the service function your checkConflicts controller calls
export const checkConflicts = async (userId, newClasses) => {
	// 1. Get all existing events for the user
	const existingEvents = await prisma.event.findMany({
		where: { userId },
		select: {
			title: true,
			startTime: true,
			endTime: true
		}
	});

	const conflicts = [];

	// Helper to calculate the next occurrence of a class (same logic as sync)
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

	for (const c of newClasses) {
		const classDate = getNextDateForDay(c.day);
		const [sh, sm] = c.startTime.split(':');
		const [eh, em] = c.endTime.split(':');

		const startTime = new Date(classDate);
		startTime.setHours(parseInt(sh), parseInt(sm), 0, 0);

		const endTime = new Date(classDate);
		endTime.setHours(parseInt(eh), parseInt(em), 0, 0);

		// --- THE DEDUPLICATION CHECK ---
		// Find if this EXACT class already exists
		const isExactMatch = existingEvents.some(
			(existing) =>
				// Check for variations like "Bio" vs "Class: Bio"
				(existing.title === c.name || existing.title === `Class: ${c.name}`) &&
				existing.startTime.getTime() === startTime.getTime() &&
				existing.endTime.getTime() === endTime.getTime()
		);

		if (isExactMatch) {
			continue; // Skip this class; it's already there, no conflict to report
		}
		// -------------------------------

		// 2. NOW check for real overlaps with other events
		const overlap = existingEvents.find((existing) => {
			return startTime < existing.endTime && endTime > existing.startTime;
		});

		if (overlap) {
			conflicts.push({
				type: 'overlap',
				newClass: c.name,
				existingEvent: overlap.title,
				timeSlot: `${c.startTime}-${c.endTime}`,
				strategy: overlap.title.includes(c.name) ? 'MOVE_EVENT' : 'CHOICE'
			});
		}
	}

	return conflicts;
};
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

export const syncCalendar = async (userId, classes) => {
	// 1. FETCH EXISTING EVENTS TO COMPARE
	// We get all events once to avoid hitting the DB inside the loop
	const existingEvents = await prisma.event.findMany({
		where: { userId: userId },
		select: { title: true, startTime: true, endTime: true }
	});

	// 2. DELETE PREVIOUS SYNCED EVENTS
	// Note: This only clears events tagged with 'timetable'.
	// Manual events or AI-generated tasks remain, which is why we deduplicate below.
	await prisma.event.deleteMany({
		where: {
			userId: userId,
			meta: {
				path: ['source'],
				equals: 'timetable'
			}
		}
	});

	// 3. SHUFFLE COLORS
	const shuffle = (arr) => {
		const a = arr.slice();
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	};

	const palette = shuffle(colors);
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

	// 4. GENERATE 12 WEEKS WITH DEDUPLICATION
	classes.forEach((c, classIdx) => {
		const firstDate = getNextDateForDay(c.day);
		const [sh, sm] = c.startTime.split(':');
		const [eh, em] = c.endTime.split(':');

		const style = palette[classIdx % palette.length];

		for (let week = 0; week < 12; week++) {
			const baseDate = new Date(firstDate);
			baseDate.setDate(firstDate.getDate() + week * 7);

			const startTime = new Date(baseDate);
			startTime.setHours(parseInt(sh), parseInt(sm), 0, 0);

			const endTime = new Date(baseDate);
			endTime.setHours(parseInt(eh), parseInt(em), 0, 0);

			const title = `Class: ${c.name}`;

			// --- CHECK FOR EXACT DUPLICATE ---
			// If an event with same title/time exists, skip it to avoid AI conflict flags
			const isDuplicate = existingEvents.some(
				(existing) =>
					existing.title === title &&
					existing.startTime.getTime() === startTime.getTime() &&
					existing.endTime.getTime() === endTime.getTime()
			);

			if (isDuplicate) continue;
			// ---------------------------------

			events.push({
				userId,
				title,
				location: c.room || 'TBA',
				startTime,
				endTime,
				color: style.bg,
				colorName: style.name,
				textColor: style.text,
				meta: {
					source: 'timetable',
					classId: c.id,
					week: week + 1
				}
			});
		}
	});

	// 5. INSERT
	if (events.length > 0) {
		const result = await prisma.event.createMany({ data: events });
		return { count: result.count };
	}

	return { count: 0 };
};

export const exportToSheets = async (req, res, next) => {
	try {
		const csv = await generateSheetsData(req.body.classes);
		res.json({ status: 'success', csv });
	} catch (e) {
		next(e);
	}
};
