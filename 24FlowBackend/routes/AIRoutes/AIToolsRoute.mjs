import express from 'express';
import passport from 'passport';
import { handleAiTool, getAiStatus, getInsights } from '../../controllers/aiToolsController.mjs';
import { protect } from '../../middlewares/verifyAuth.mjs';

const router = express.Router();

// AI Tool Endpoint
router.post('/tool', protect, handleAiTool);

// Public AI status endpoint (used by frontend to show whether AI backend is configured)
router.get('/status', getAiStatus);
// User-scoped AI insights (requires auth)
router.get('/insights', protect, getInsights);

export default router;
