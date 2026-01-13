import express from 'express';
const router = express.Router();

// placeholder route (empty in original repo)
router.get('/', (req, res) => res.json({ message: 'sleep route' }));

export default router;
