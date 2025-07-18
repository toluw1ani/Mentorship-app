import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'mentor' | 'mentee' | 'admin';
  bio?: string;
  skills?: string[];
}

// ✅ Pre-filled users so they're available even after restart
export const users: User[] = [
  {
    id: 'alice-001',
    name: 'Alice',
    email: 'alice@example.com',
    password: 'password123',
    role: 'mentee',
  },
  {
    id: 'john-001',
    name: 'John Mentor',
    email: 'john@example.com',
    password: 'password123',
    role: 'mentor',
    bio: 'Experienced software engineer',
    skills: ['JavaScript', 'React', 'Node.js'],
  },
];

// ✅ Register a user
export const register = (req: Request, res: Response) => {
  const { name, email, password, role, bio, skills } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password,
    role,
    bio,
    skills,
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};

// ✅ Login and return JWT token
export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
