import express from 'express';
import {
	createStudyPlan,
	getStudyPlan,
	getAllStudyPlans,
	regenerateStudyPlan,
	deleteStudyPlan
} from '../../controllers/studyPlanController.mjs';

const router = express.Router();

router.post('/', createStudyPlan);
router.get('/', getAllStudyPlans);
router.get('/:id', getStudyPlan);
router.post('/:id/regenerate', regenerateStudyPlan);
router.delete('/:id', deleteStudyPlan);

export default router;
