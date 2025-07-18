import { Router } from 'express';
import { scheduleSession, getMySessions } from '../controllers/sessionController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// POST /sessions/schedule
router.post('/schedule', authenticate, scheduleSession);

// GET /sessions/my-sessions
router.get('/my-sessions', authenticate, getMySessions);

export default router;
