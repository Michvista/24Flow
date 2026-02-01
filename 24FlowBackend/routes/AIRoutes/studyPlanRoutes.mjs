import express from 'express';
import {
	createStudyPlan,
	getStudyPlan,
	getAllStudyPlans,
	regenerateStudyPlan,
	deleteStudyPlan,
	updateStudyPlan
} from '../../controllers/studyPlanController.mjs';
import { protect } from '../../middlewares/verifyAuth.mjs';

const router = express.Router();

// Protect study plan endpoints - user must be authenticated
router.post('/', protect, createStudyPlan);
router.get('/', protect, getAllStudyPlans);
router.get('/:id', protect, getStudyPlan);
// Update (edit) a study plan
router.put('/:id', protect, updateStudyPlan);
router.post('/:id/regenerate', protect, regenerateStudyPlan);
router.delete('/:id', protect, deleteStudyPlan);

export default router;
