import express from 'express';
import { getCurrentUser, getMentors } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/me', authenticate, getCurrentUser);
router.get('/mentors', authenticate, getMentors);

export default router;
