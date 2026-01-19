import express from 'express';
import { createEvent, getEvents } from '../../controllers/eventController.mjs';
import { protect } from '../../middlewares/verifyAuth.mjs';

const router = express.Router();

// Apply protection to all event routes
router.use(protect); 

router.post('/', createEvent);
router.get('/', getEvents);

export default router;
