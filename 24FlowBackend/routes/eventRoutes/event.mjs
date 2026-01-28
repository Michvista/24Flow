import express from 'express';
import {
	getEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
	rescheduleEvent
} from '../../controllers/eventController.mjs';
import { protect } from '../../middlewares/verifyAuth.mjs';

const router = express.Router();

// Apply protection to all event routes
router.use(protect); 

// Get all events (includes recurring instances)
router.get('/', getEvents);


// Get single event by ID
router.get('/:id', getEventById);

// Create new event
router.post('/', createEvent);

// Update event
router.patch('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

router.post('/:id/reschedule', rescheduleEvent);


export default router;
