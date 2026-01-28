import express from 'express';
import {
	getTimetable,
	persistTimetable,
	checkConflicts,
	syncCalendar,
	exportToSheets
} from '../../controllers/timetableController.mjs';

import { protect } from '../../middlewares/verifyAuth.mjs';

const router = express.Router();

// Protect all routes - user must be authenticated
router.use(protect);

router.get('/', getTimetable);
router.post('/persist', persistTimetable);
router.post('/check-conflicts', checkConflicts);
router.post('/sync-calendar', syncCalendar);
router.post('/export/sheets', exportToSheets);

export default router;
