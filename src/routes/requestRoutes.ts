import express from 'express';
import { sendRequest, getSentRequests, getMyRequests } from '../controllers/requestController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/request', authenticate, sendRequest);             // Mentee sends request
router.get('/sent-requests', authenticate, getSentRequests);    // Mentor views incoming requests
router.get('/my-requests', authenticate, getMyRequests);        // Mentee views their sent requests

export default router;
