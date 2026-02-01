// ============================================================================
// FIXED STUDY PLAN SERVICE - Saves Flat Structure
// ============================================================================
// File: src/lib/services/studyPlanService.mjs

import prisma from '../db.mjs';
import { generateWithGemini } from './geminiService.mjs';

/**
 * Generate a new study plan
 * @param {string} userId
 * @param {object} preferences - { subjects, deadline, dailyHours, includeBreaks, spacedRepetition }
 */
export const generatePlan = async (userId, preferences) => {
	console.log('[StudyPlan] Generating plan for user:', userId);
	console.log('[StudyPlan] Preferences:', JSON.stringify(preferences, null, 2));

	// Generate with AI
	let aiResult;
	try {
		aiResult = await generateWithGemini(preferences);
		console.log('[StudyPlan] AI returned', aiResult.tasks?.length || 0, 'tasks');
	} catch (err) {
		console.error('[StudyPlan] AI generation error:', err);
		throw new Error('Failed to generate plan with AI');
	}

	// Validate AI result
	if (!aiResult || !Array.isArray(aiResult.tasks)) {
		throw new Error('Invalid AI response structure');
	}

	// Save to database
	try {
		const plan = await prisma.studyPlan.create({
			data: {
				userId,
				preferences,
				schedule: {
					tasks: aiResult.tasks,
					backlog: aiResult.backlog || [],
					suggestions: aiResult.suggestions || []
				},
				tips: aiResult.tips || []
			}
		});

		console.log('[StudyPlan] Created plan:', plan.id);
		return plan;
	} catch (dbErr) {
		console.error('[StudyPlan] Database error:', dbErr);
		throw new Error('Failed to save plan to database');
	}
};

/**
 * Fetch a study plan by ID
 * @param {string} userId
 * @param {string} id
 */
export const fetchPlan = async (userId, id) => {
	console.log('[StudyPlan] Fetching plan:', id, 'for user:', userId);

	const plan = await prisma.studyPlan.findFirst({
		where: { id, userId }
	});

	if (!plan) {
		console.log('[StudyPlan] Plan not found');
		return null;
	}

	console.log('[StudyPlan] Found plan with', plan.schedule?.tasks?.length || 0, 'tasks');
	return plan;
};

/**
 * Fetch all plans for a user
 * @param {string} userId
 */
export const fetchAllPlans = async (userId) => {
	console.log('[StudyPlan] Fetching all plans for user:', userId);

	const plans = await prisma.studyPlan.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' }
	});

	console.log('[StudyPlan] Found', plans.length, 'plans');
	return plans;
};

/**
 * Regenerate a plan (keep preferences, get new schedule)
 * @param {string} userId
 * @param {string} id
 */
export const regeneratePlanService = async (userId, id) => {
	console.log('[StudyPlan] Regenerating plan:', id);

	// Get existing plan
	const existing = await fetchPlan(userId, id);
	if (!existing) {
		throw new Error('Plan not found');
	}

	// Generate new schedule with same preferences
	const aiResult = await generateWithGemini(existing.preferences);

	// Update plan
	const updated = await prisma.studyPlan.update({
		where: { id },
		data: {
			schedule: {
				tasks: aiResult.tasks,
				backlog: aiResult.backlog || [],
				suggestions: aiResult.suggestions || []
			},
			tips: aiResult.tips || []
		}
	});

	console.log('[StudyPlan] Regenerated plan:', updated.id);
	return updated;
};

/**
 * Delete a plan
 * @param {string} userId
 * @param {string} id
 */
export const deletePlanService = async (userId, id) => {
	console.log('[StudyPlan] Deleting plan:', id);

	await prisma.studyPlan.delete({
		where: { id, userId }
	});

	console.log('[StudyPlan] Deleted plan:', id);
	return { success: true };
};

/**
 * Update a plan (partial updates supported)
 * @param {string} userId
 * @param {string} id
 * @param {object} updates - may contain { schedule, preferences, tips }
 */
export const updatePlanService = async (userId, id, updates) => {
	console.log('[StudyPlan] Updating plan:', id);

	const existing = await fetchPlan(userId, id);
	if (!existing) {
		throw new Error('Plan not found');
	}

	const data = {};

	if (updates.schedule && typeof updates.schedule === 'object') {
		// Merge schedule parts defensively
		data.schedule = {
			tasks: Array.isArray(updates.schedule.tasks)
				? updates.schedule.tasks
				: existing.schedule?.tasks || [],
			backlog: Array.isArray(updates.schedule.backlog)
				? updates.schedule.backlog
				: existing.schedule?.backlog || [],
			suggestions: Array.isArray(updates.schedule.suggestions)
				? updates.schedule.suggestions
				: existing.schedule?.suggestions || []
		};
	}

	if (updates.preferences && typeof updates.preferences === 'object') {
		data.preferences = updates.preferences;
	}

	if (typeof updates.tips !== 'undefined') {
		data.tips = updates.tips;
	}

	if (Object.keys(data).length === 0) {
		// Nothing to update
		return existing;
	}

	const updated = await prisma.studyPlan.update({
		where: { id },
		data
	});

	console.log('[StudyPlan] Updated plan:', updated.id);
	return updated;
};
