import { Request, Response } from 'express';
import { users } from './authController'; // import the same user store

export const getCurrentUser = (req: Request, res: Response) => {
  const userId = (req as any).user?.id;


  const user = users.find((u: any) => u.id === userId);

  if (!user) return res.status(404).json({ message: 'User not found' });

  // Don't return password!
  const { password, ...safeUser } = user;
  res.json(safeUser);
};
export const getMentors = (_req: Request, res: Response) => {
  const mentors = users.filter((u) => u.role === 'mentor');
  const safeMentors = mentors.map(({ password, ...rest }) => rest);
  res.json(safeMentors);
};
