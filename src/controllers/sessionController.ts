import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { scheduledSessions } from '../data/sessions';
import { mentorshipRequests, MentorshipRequest } from '../data/requests';

// ✅ POST /sessions/schedule
export const scheduleSession = (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { requestId, dateTime } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const request = mentorshipRequests.find((r: MentorshipRequest) =>
  r.id === requestId && r.status === 'approved' && r.menteeId === userId
);

  if (!request) {
    return res.status(400).json({ message: 'Invalid or unapproved mentorship request' });
  }

  const newSession = {
    id: uuidv4(),
    requestId,
    mentorId: request.mentorId,
    menteeId: request.menteeId,
    dateTime,
  };

  scheduledSessions.push(newSession);
  res.status(201).json({ message: 'Session scheduled', session: newSession });
};

// ✅ GET /sessions/my-sessions
export const getMySessions = (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const mySessions = scheduledSessions.filter(
    (s) => s.menteeId === userId || s.mentorId === userId
  );

  res.json(mySessions);
};
