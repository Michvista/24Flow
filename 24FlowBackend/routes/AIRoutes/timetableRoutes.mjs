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
router.post('/sync-calendar', async (req, res) => {
	try {
		// Ensure we only pass the string ID, not the whole object
		const userId = req.user.id;
		const { classes } = req.body;

		if (!classes || !Array.isArray(classes)) {
			return res.status(400).json({ error: 'Missing classes array' });
		}

		// Call the controller/service function
		const result = await syncCalendar(userId, classes);

		res.json({ success: true, count: result.count });
	} catch (err) {
		console.error('Route Error:', err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
router.post('/export/sheets', exportToSheets);

export default router;
