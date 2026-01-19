import prisma from '../db.mjs';

/**
 * Helper to generate virtual recurring instances
 */
const generateRecurringEvents = (baseEvent, recurringDays, weeksAhead = 8) => {
	if (!recurringDays || recurringDays.length === 0) return [baseEvent];

	const events = [];
	const startDate = new Date(baseEvent.startTime);
	const endDate = new Date(baseEvent.endTime);
	const dayOfWeek = startDate.getDay();
	const duration = endDate.getTime() - startDate.getTime();

	// Add original
	events.push(baseEvent);

	for (let week = 0; week < weeksAhead; week++) {
		recurringDays.forEach((targetDay) => {
			// Skip if it's the exact same day/week as the base event
			if (week === 0 && targetDay === dayOfWeek) return;

			const daysToAdd = ((targetDay - dayOfWeek + 7) % 7) + week * 7;
			const newStart = new Date(startDate);
			newStart.setDate(startDate.getDate() + daysToAdd);
			const newEnd = new Date(newStart.getTime() + duration);

			events.push({
				...baseEvent,
				// Using string IDs since your schema uses UUID Strings
				id: `${baseEvent.id}_w${week}_d${targetDay}`,
				startTime: newStart.toISOString(),
				endTime: newEnd.toISOString(),
				isRecurringInstance: true,
				parentEventId: baseEvent.id,
				date: newStart
			});
		});
	}
	return events;
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
				desc: description || '', // Prisma maps this to 'description' column
				startTime: new Date(startTime),
				endTime: new Date(endTime),
				recurringDays: recurringDays || [],
				color: color || '#3d7bff',
				colorName: colorName || 'blue',
				textColor: textColor || '#ffffff',
				// schema uses String UUIDs, so no parseInt needed
				user: { connect: { id: req.user.id } }
			}
		});

		res.status(201).json({ status: 'success', data: event });
	} catch (error) {
		console.error('Create Event Error:', error);
		next(error);
	}
};

export const getEvents = async (req, res, next) => {
	try {
		const events = await prisma.event.findMany({
			where: { userId: req.user.id },
			orderBy: { startTime: 'asc' }
		});

		let allEvents = [];
		events.forEach((event) => {
			if (event.recurringDays?.length > 0) {
				allEvents = [...allEvents, ...generateRecurringEvents(event, event.recurringDays)];
			} else {
				allEvents.push(event);
			}
		});

		allEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
		res.status(200).json({ status: 'success', data: allEvents });
	} catch (error) {
		next(error);
	}
};

export const getEventById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const isInstance = id.includes('_');
		const dbId = isInstance ? id.split('_')[0] : id;

		let event = await prisma.event.findFirst({
			where: { id: dbId, userId: req.user.id }
		});

		if (!event) return res.status(404).json({ status: 'fail', message: 'Not found' });

		if (isInstance) {
			const instances = generateRecurringEvents(event, event.recurringDays);
			event = instances.find((e) => e.id === id);
		}

		res.status(200).json({ status: 'success', data: event });
	} catch (error) {
		next(error);
	}
};

export const updateEvent = async (req, res, next) => {
	try {
		// Use the parameter name defined in your router (likely 'id')
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
				userId: req.user.id // Security: Ensure user owns the event
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
