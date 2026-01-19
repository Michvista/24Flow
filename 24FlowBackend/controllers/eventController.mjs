import prisma from '../db.mjs';

export const createEvent = async (req, res, next) => {
	try {
		const { title, description, startTime, endTime } = req.body;
		const userId = req.user.id;

		if (!title) {
			return res.status(400).json({ message: 'Title is required' });
		}

		const newEvent = await prisma.event.create({
			data: {
				title,
				desc: description || '',
				// Fallback to current time if UI doesn't send dates yet
				startTime: startTime ? new Date(startTime) : new Date(),
				endTime: endTime ? new Date(endTime) : new Date(Date.now() + 3600000),
				userId
			}
		});

		res.status(201).json({
			status: 'success',
			data: newEvent
		});
	} catch (error) {
		next(error);
	}
};

export const getEvents = async (req, res, next) => {
	try {
		const events = await prisma.event.findMany({
			where: { userId: req.user.id },
			orderBy: { startTime: 'desc' }
		});

		res.status(200).json({ status: 'success', data: events });
	} catch (error) {
		next(error);
	}
};
