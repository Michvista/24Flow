import {
	getActiveConflicts,
	detectAndStoreConflicts,
	applyConflictResolution,
	declineConflictResolution
} from '../services/conflictService.mjs';

/**
 * Get all active (pending) conflicts for the user
 */
export const getConflicts = async (req, res) => {
	try {
		const conflicts = await getActiveConflicts(req.user.id);

		res.status(200).json({
			status: 'success',
			data: conflicts
		});
	} catch (error) {
		console.error('Error fetching conflicts:', error);
		res.status(500).json({
			status: 'error',
			message: error.message || 'Failed to fetch conflicts'
		});
	}
};

/**
 * Detect new conflicts and store them in database
 */
export const detectConflicts = async (req, res) => {
	try {
		const conflicts = await detectAndStoreConflicts(req.user.id);

		res.status(200).json({
			status: 'success',
			message: `Detected ${conflicts.length} conflict(s)`,
			data: conflicts
		});
	} catch (error) {
		console.error('Error detecting conflicts:', error);
		res.status(500).json({
			status: 'error',
			message: error.message || 'Failed to detect conflicts'
		});
	}
};

/**
 * Accept and apply a conflict resolution
 */
export const acceptResolution = async (req, res) => {
	try {
		const { conflictId } = req.params;

		if (!conflictId) {
			return res.status(400).json({
				status: 'fail',
				message: 'Conflict ID is required'
			});
		}

		const result = await applyConflictResolution(conflictId, req.user.id);

		// Return updated active conflicts
		const remainingConflicts = await getActiveConflicts(req.user.id);

		res.status(200).json({
			status: 'success',
			message: 'Resolution applied successfully',
			data: {
				applied: result.success,
				updatedCount: result.updatedCount,
				remainingConflicts
			}
		});
	} catch (error) {
		console.error('Error applying resolution:', error);
		res.status(500).json({
			status: 'error',
			message: error.message || 'Failed to apply resolution'
		});
	}
};

/**
 * Decline a conflict resolution
 */
export const declineResolution = async (req, res) => {
	try {
		const { conflictId } = req.params;

		if (!conflictId) {
			return res.status(400).json({
				status: 'fail',
				message: 'Conflict ID is required'
			});
		}

		await declineConflictResolution(conflictId, req.user.id);

		// Return remaining active conflicts
		const remainingConflicts = await getActiveConflicts(req.user.id);

		res.status(200).json({
			status: 'success',
			message: 'Resolution declined',
			data: {
				remainingConflicts
			}
		});
	} catch (error) {
		console.error('Error declining resolution:', error);
		res.status(500).json({
			status: 'error',
			message: error.message || 'Failed to decline resolution'
		});
	}
};

/**
 * Get conflict history (resolved conflicts)
 */
export const getConflictHistory = async (req, res) => {
	try {
		const { limit = 20, offset = 0 } = req.query;

		const history = await prisma.conflict.findMany({
			where: {
				userId: req.user.id,
				status: { in: ['ACCEPTED', 'DECLINED'] }
			},
			include: {
				tasks: true,
				proposals: true
			},
			orderBy: {
				resolvedAt: 'desc'
			},
			take: parseInt(limit),
			skip: parseInt(offset)
		});

		const total = await prisma.conflict.count({
			where: {
				userId: req.user.id,
				status: { in: ['ACCEPTED', 'DECLINED'] }
			}
		});

		res.status(200).json({
			status: 'success',
			data: {
				history,
				pagination: {
					total,
					limit: parseInt(limit),
					offset: parseInt(offset),
					hasMore: parseInt(offset) + history.length < total
				}
			}
		});
	} catch (error) {
		console.error('Error fetching conflict history:', error);
		res.status(500).json({
			status: 'error',
			message: error.message || 'Failed to fetch conflict history'
		});
	}
};
