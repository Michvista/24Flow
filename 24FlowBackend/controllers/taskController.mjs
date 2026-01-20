import prisma from '../db.mjs';

// Get all tasks for the logged-in user
export const getTasks = async (req, res, next) => {
	try {
		const tasks = await prisma.task.findMany({
			where: { userId: req.user.id },
			orderBy: { id: 'desc' }
		});
		res.status(200).json({ status: 'success', data: tasks });
	} catch (error) {
		next(error);
	}
};

// Create a new task
export const createTask = async (req, res, next) => {
	try {
		const { title, description } = req.body;

		if (!title) {
			return res.status(400).json({ status: 'fail', message: 'Title is required' });
		}

		const task = await prisma.task.create({
			data: {
				title,
				description,
				userId: req.user.id
			}
		});

		res.status(201).json({ status: 'success', data: task });
	} catch (error) {
		next(error);
	}
};

export const updateTask = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { completed } = req.body;

		const updatedTask = await prisma.task.update({
			where: { id, userId: req.user.id },
			data: { completed } 
		});

		res.status(200).json({ status: 'success', data: updatedTask });
	} catch (error) {
		next(error);
	}
};

// Delete a task
export const deleteTask = async (req, res, next) => {
	try {
		const { id } = req.params;
		await prisma.task.delete({
			where: { id, userId: req.user.id }
		});
		res.status(200).json({ status: 'success', message: 'Task deleted' });
	} catch (error) {
		next(error);
	}
};
