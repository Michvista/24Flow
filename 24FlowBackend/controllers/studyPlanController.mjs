
import {
	generatePlan,
	fetchPlan,
	fetchAllPlans,
	regeneratePlanService,
	deletePlanService,
	updatePlanService
} from '../services/studyPlanService.mjs';

/**
 * Generate new study plan
 * POST  study-plan/generate
 */
export const generateController = async (req, res) => {
	try {
		const userId = req.user?.id || req.locals?.user?.id;

		if (!userId) {
			return res.status(401).json({
				success: false,
				error: 'Unauthorized - No user ID'
			});
		}

		const { subjects, deadline, dailyHours, includeBreaks, spacedRepetition } = req.body;

		// Validate input
		if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
			return res.status(400).json({
				success: false,
				error: 'At least one subject is required'
			});
		}

		if (!dailyHours || dailyHours < 1 || dailyHours > 12) {
			return res.status(400).json({
				success: false,
				error: 'Daily hours must be between 1 and 12'
			});
		}

		console.log('[Controller] Generating plan for user:', userId);
		console.log('[Controller] Subjects:', subjects.length);

		// Generate plan
		const plan = await generatePlan(userId, {
			subjects,
			deadline,
			dailyHours,
			includeBreaks: includeBreaks ?? true,
			spacedRepetition: spacedRepetition ?? false
		});

		console.log('[Controller] Plan generated:', plan.id);
		console.log('[Controller] Tasks:', plan.schedule?.tasks?.length || 0);

		return res.status(200).json({
			success: true,
			plan: {
				id: plan.id,
				tasks: plan.schedule?.tasks || [],
				backlog: plan.schedule?.backlog || [],
				suggestions: plan.schedule?.suggestions || [],
				tips: plan.tips || [],
				preferences: plan.preferences,
				createdAt: plan.createdAt
			}
		});
	} catch (error) {
		console.error('[Controller] Generate error:', error);
		return res.status(500).json({
			success: false,
			error: error.message || 'Failed to generate study plan'
		});
	}
};

/**
 * Get study plan by ID
 * GET  study-plan/:id
 */
export const getByIdController = async (req, res) => {
	try {
		const userId = req.user?.id || req.locals?.user?.id;

		if (!userId) {
			return res.status(401).json({
				success: false,
				error: 'Unauthorized'
			});
		}

		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Plan ID is required'
			});
		}

		console.log('[Controller] Fetching plan:', id);

		const plan = await fetchPlan(userId, id);

		if (!plan) {
			return res.status(404).json({
				success: false,
				error: 'Study plan not found'
			});
		}

		console.log('[Controller] Found plan with', plan.schedule?.tasks?.length || 0, 'tasks');

		return res.status(200).json({
			success: true,
			plan: {
				id: plan.id,
				tasks: plan.schedule?.tasks || [],
				backlog: plan.schedule?.backlog || [],
				suggestions: plan.schedule?.suggestions || [],
				tips: plan.tips || [],
				preferences: plan.preferences,
				createdAt: plan.createdAt,
				updatedAt: plan.updatedAt
			}
		});
	} catch (error) {
		console.error('[Controller] Get by ID error:', error);
		return res.status(500).json({
			success: false,
			error: error.message || 'Failed to fetch study plan'
		});
	}
};

/**
 * Get all study plans for user
 * GET  study-plan
 */
export const getAllController = async (req, res) => {
	try {
		const userId = req.user?.id || req.locals?.user?.id;

		if (!userId) {
			return res.status(401).json({
				success: false,
				error: 'Unauthorized'
			});
		}

		console.log('[Controller] Fetching all plans for user:', userId);

		const plans = await fetchAllPlans(userId);

		return res.status(200).json({
			success: true,
			plans: plans.map((plan) => ({
				id: plan.id,
				tasksCount: plan.schedule?.tasks?.length || 0,
				subjects: plan.preferences?.subjects || [],
				deadline: plan.preferences?.deadline,
				createdAt: plan.createdAt
			}))
		});
	} catch (error) {
		console.error('[Controller] Get all error:', error);
		return res.status(500).json({
			success: false,
			error: error.message || 'Failed to fetch study plans'
		});
	}
};

/**
 * Update (edit) a study plan
 * PUT  study-plan/:id
 */
export const updateController = async (req, res) => {
    try {
        const userId = req.user?.id || req.locals?.user?.id;
        const { id: planId } = req.params;
        const updates = req.body;

        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        // CALL THE SERVICE CORRECTLY
        const updated = await updatePlanService(userId, planId, updates);

        return res.status(200).json({
            success: true,
            plan: {
                id: updated.id,
                tasks: updated.schedule?.tasks || [],
                backlog: updated.schedule?.backlog || [],
                updatedAt: updated.updatedAt
            }
        });
    } catch (error) {
        console.error('Update Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Regenerate study plan (keep preferences, new schedule)
 * POST  study-plan/:id/regenerate
 */
export const regenerateController = async (req, res) => {
	try {
		const userId = req.user?.id || req.locals?.user?.id;

		if (!userId) {
			return res.status(401).json({
				success: false,
				error: 'Unauthorized'
			});
		}

		const { id } = req.params;

		console.log('[Controller] Regenerating plan:', id);

		const plan = await regeneratePlanService(userId, id);

		return res.status(200).json({
			success: true,
			plan: {
				id: plan.id,
				tasks: plan.schedule?.tasks || [],
				backlog: plan.schedule?.backlog || [],
				suggestions: plan.schedule?.suggestions || [],
				tips: plan.tips || []
			}
		});
	} catch (error) {
		console.error('[Controller] Regenerate error:', error);
		return res.status(500).json({
			success: false,
			error: error.message || 'Failed to regenerate study plan'
		});
	}
};

/**
 * Delete study plan
 * DELETE  study-plan/:id
 */
export const deleteController = async (req, res) => {
	try {
		const userId = req.user?.id || req.locals?.user?.id;

		if (!userId) {
			return res.status(401).json({
				success: false,
				error: 'Unauthorized'
			});
		}

		const { id } = req.params;

		console.log('[Controller] Deleting plan:', id);

		await deletePlanService(userId, id);

		return res.status(200).json({
			success: true,
			message: 'Study plan deleted'
		});
	} catch (error) {
		console.error('[Controller] Delete error:', error);
		return res.status(500).json({
			success: false,
			error: error.message || 'Failed to delete study plan'
		});
	}
};

// Named exports
export {
	generateController as createStudyPlan,
	getByIdController as getStudyPlan,
	getAllController as getAllStudyPlans,
	updateController as updateStudyPlan,
	regenerateController as regenerateStudyPlan,
	deleteController as deleteStudyPlan
};
