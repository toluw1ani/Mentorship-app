// src/data/requests.ts

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  menteeId: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const mentorshipRequests: MentorshipRequest[] = [];
