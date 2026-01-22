import express from 'express';
import passport from 'passport';
import {
    handleAiTool
} from '../../controllers/aiToolsController.mjs';
import { protect } from '../../middlewares/verifyAuth.mjs';

const router = express.Router();

// AI Tool Endpoint
router.post('/tool', protect, handleAiTool);

export default router;