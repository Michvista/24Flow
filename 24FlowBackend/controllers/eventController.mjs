import prisma from '../db.mjs';

/**
 * Helper to generate virtual recurring instances
 */
// HELPER: Check if two dates are the same calendar day

const isSameDay = (d1, d2) => {
	const date1 = new Date(d1);
	const date2 = new Date(d2);
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

export const getEvents = async (req, res, next) => {
	try {
		const { start, end } = req.query;

		const events = await prisma.event.findMany({
			where: { userId: req.user.id },
			orderBy: { startTime: 'asc' }
		});

		let allEvents = [];
		events.forEach((event) => {
			// Include the base event
			allEvents.push({
				...event,
				isRecurringInstance: false,
				parentEventId: event.id
			});

			// If it's a recurring event, generate the "virtual" copies
			if (event.recurringDays?.length > 0 && start && end) {
				allEvents.push(...generateRecurringEventsInRange(event, event.recurringDays, start, end));
			}
		});

		res.status(200).json({ status: 'success', data: allEvents });
	} catch (error) {
		next(error);
	}
};

const generateRecurringEventsInRange = (baseEvent, recurringDays, rangeStart, rangeEnd) => {
	const virtualEvents = [];
	const baseStart = new Date(baseEvent.startTime);
	const baseEnd = new Date(baseEvent.endTime);
	const duration = baseEnd.getTime() - baseStart.getTime();

	let currentDate = new Date(rangeStart);
	currentDate.setHours(0, 0, 0, 0);
	const finalDate = new Date(rangeEnd);

	while (currentDate <= finalDate) {
		const dayOfWeek = currentDate.getDay(); // 0 (Sun) to 6 (Sat)

		if (recurringDays.includes(dayOfWeek)) {
			const occurrenceStart = new Date(currentDate);
			occurrenceStart.setHours(baseStart.getHours(), baseStart.getMinutes(), 0, 0);

			// Don't duplicate the base event if it's on the same day
			// Also ensure we don't generate occurrences BEFORE the event was created
			if (!isSameDay(occurrenceStart, baseStart) && occurrenceStart > baseStart) {
				const occurrenceEnd = new Date(occurrenceStart.getTime() + duration);

				virtualEvents.push({
					...baseEvent,
					id: `${baseEvent.id}_${occurrenceStart.getTime()}`, // Unique virtual ID
					startTime: occurrenceStart.toISOString(),
					endTime: occurrenceEnd.toISOString(),
					isRecurringInstance: true,
					parentEventId: baseEvent.id
				});
			}
		}
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return virtualEvents;
};

export const createEvent = async (req, res, next) => {
	try {
		const {
			title,
			location,
			description,
			startTime,
			endTime,
			recurringDays,
			color,
			textColor,
			colorName
		} = req.body;

		if (!title || !startTime || !endTime) {
			return res.status(400).json({ status: 'fail', message: 'Missing required fields' });
		}

		const event = await prisma.event.create({
			data: {
				title,
				location: location || '',
				desc: description || '',
				startTime: new Date(startTime),
				endTime: new Date(endTime),
				recurringDays: recurringDays || [],
				color: color || '#3d7bff',
				colorName: colorName || 'blue',
				textColor: textColor || '#ffffff',
				user: { connect: { id: req.user.id } }
			}
		});

		res.status(201).json({ status: 'success', data: event });
	} catch (error) {
		console.error('Create Event Error:', error);
		next(error);
	}
};

export const getEventById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const isInstance = id.includes('_');
		const dbId = isInstance ? id.split('_')[0] : id;

		const event = await prisma.event.findFirst({
			where: { id: dbId, userId: req.user.id }
		});

		if (!event) return res.status(404).json({ status: 'fail', message: 'Not found' });

		if (isInstance) {
			const timestamp = parseInt(id.split('_')[1]);
			const occStart = new Date(timestamp);
			const duration = new Date(event.endTime).getTime() - new Date(event.startTime).getTime();

			return res.status(200).json({
				status: 'success',
				data: {
					...event,
					id: id,
					startTime: occStart.toISOString(),
					endTime: new Date(occStart.getTime() + duration).toISOString(),
					isRecurringInstance: true
				}
			});
		}

		res.status(200).json({ status: 'success', data: event });
	} catch (error) {
		next(error);
	}
};

export const updateEvent = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ status: 'fail', message: 'No ID provided' });
		}

		// Strip the virtual suffix (e.g., _w0_d1) to get the real Database UUID
		const dbId = id.includes('_') ? id.split('_')[0] : id;

		const { title, location, description, startTime, endTime } = req.body;
		const updateData = {};

		if (title) updateData.title = title;
		if (location !== undefined) updateData.location = location;
		if (description !== undefined) updateData.desc = description; // Mapping 'description' to 'desc'
		if (startTime) updateData.startTime = new Date(startTime);
		if (endTime) updateData.endTime = new Date(endTime);

		const updatedEvent = await prisma.event.update({
			where: {
				id: dbId,
				userId: req.user.id
			},
			data: updateData
		});

		res.status(200).json({ status: 'success', data: updatedEvent });
	} catch (error) {
		// Prisma throws P2025 if the record isn't found
		if (error.code === 'P2025') {
			return res.status(404).json({ status: 'fail', message: 'Event not found' });
		}
		next(error);
	}
};

export const deleteEvent = async (req, res, next) => {
	try {
		const { id } = req.params;
		const dbId = id.includes('_') ? id.split('_')[0] : id;

		await prisma.event.delete({
			where: { id: dbId, userId: req.user.id }
		});
		res.status(200).json({ status: 'success', message: 'Event series deleted' });
	} catch (error) {
		next(error);
	}
};
