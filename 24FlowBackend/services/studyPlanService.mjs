import prisma from '../db.mjs';
import { generateWithGemini } from './geminiService.mjs';

export const generatePlan = async (userId, preferences) => {
	const aiResult = await generateWithGemini(preferences);

	const plan = await prisma.studyPlan.create({
		data: {
			userId,
			preferences,
			schedule: aiResult.schedule,
			tips: aiResult.tips
		}
	});

	return plan;
};

export const fetchPlan = (userId, id) => prisma.studyPlan.findFirst({ where: { id, userId } });

export const fetchAllPlans = (userId) => prisma.studyPlan.findMany({ where: { userId } });

export const regeneratePlanService = async (userId, id) => {
	const existing = await fetchPlan(userId, id);

	const aiResult = await generateWithGemini(existing.preferences);

	return prisma.studyPlan.update({
		where: { id },
		data: {
			schedule: aiResult.schedule,
			tips: aiResult.tips
		}
	});
};

export const deletePlanService = (userId, id) => prisma.studyPlan.delete({ where: { id, userId } });
