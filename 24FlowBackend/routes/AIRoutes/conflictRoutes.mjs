import express from 'express';
import {
	getConflicts,
	detectConflicts,
	acceptResolution,
	declineResolution,
	getConflictHistory
} from '../../controllers/conflictController.mjs';
import { protect } from '../../middlewares/verifyAuth.mjs';

const router = express.Router();

// Protect all routes - user must be authenticated
router.use(protect);

/**
 * @route   GET  conflicts
 * @desc    Get all active (pending) conflicts for the user
 * @access  Private
 */
router.get('/', getConflicts);

/**
 * @route   POST  conflicts/detect
 * @desc    Detect new conflicts and store them
 * @access  Private
 */
router.post('/detect', detectConflicts);

/**
 * @route   POST  conflicts/:conflictId/accept
 * @desc    Accept and apply a conflict resolution
 * @access  Private
 */
router.post('/:conflictId/accept', acceptResolution);

/**
 * @route   POST  conflicts/:conflictId/decline
 * @desc    Decline a conflict resolution
 * @access  Private
 */
router.post('/:conflictId/decline', declineResolution);

/**
 * @route   GET  conflicts/history
 * @desc    Get resolved conflict history
 * @access  Private
 */
router.get('/history', getConflictHistory);

export default router;
