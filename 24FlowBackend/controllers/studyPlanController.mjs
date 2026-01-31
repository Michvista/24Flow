import {
	generatePlan,
	fetchPlan,
	fetchAllPlans,
	regeneratePlanService,
	deletePlanService
} from '../services/studyPlanService.mjs';

export const createStudyPlan = async (req, res, next) => {
	try {
		const result = await generatePlan(req.user.id, req.body);
		res.status(201).json({ status: 'success', data: result });
	} catch (err) {
		next(err);
	}
};

export const getStudyPlan = async (req, res, next) => {
	try {
		const plan = await fetchPlan(req.user.id, req.params.id);
		res.json({ status: 'success', data: plan });
	} catch (err) {
		next(err);
	}
};

export const getAllStudyPlans = async (req, res, next) => {
	try {
		const plans = await fetchAllPlans(req.user.id);
		res.json({ status: 'success', data: plans });
	} catch (err) {
		next(err);
	}
};

export const regenerateStudyPlan = async (req, res, next) => {
	try {
		const updated = await regeneratePlanService(req.user.id, req.params.id);
		res.json({ status: 'success', data: updated });
	} catch (err) {
		next(err);
	}
};

export const deleteStudyPlan = async (req, res, next) => {
	try {
		await deletePlanService(req.user.id, req.params.id);
		res.json({ status: 'success' });
	} catch (err) {
		next(err);
	}
};
