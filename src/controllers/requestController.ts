import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { mentorshipRequests, MentorshipRequest } from '../data/requests';


// ✅ POST /mentorship/request
export const sendRequest = (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { mentorId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!mentorId) {
    return res.status(400).json({ message: 'Mentor ID is required' });
  }

  const newRequest: MentorshipRequest = {
  id: uuidv4(),
  mentorId,
  menteeId: userId,
  status: 'pending',
};


  mentorshipRequests.push(newRequest);
  res.status(201).json({ message: 'Request sent successfully', request: newRequest });
};

// ✅ GET /mentorship/sent-requests (Mentor's inbox)
export const getSentRequests = (req: Request, res: Response) => {
  const mentorId = (req as any).user?.id;

  if (!mentorId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const requests = mentorshipRequests.filter((r) => r.mentorId === mentorId);
  res.json(requests);
};

// ✅ GET /mentorship/my-requests (Mentee's sent requests)
export const getMyRequests = (req: Request, res: Response) => {
  const menteeId = (req as any).user?.id;

  if (!menteeId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const requests = mentorshipRequests.filter((r) => r.menteeId === menteeId);
  res.json(requests);
};
