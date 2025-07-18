import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import requestRoutes from './routes/requestRoutes'; // this can be named mentorshipRoutes.ts
import sessionRoutes from './routes/sessionRoutes';
import mentorshipRoutes from './routes/requestRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/mentorship', requestRoutes); // handles mentorship requests
app.use('/sessions', sessionRoutes);   // handles session scheduling
app.use('/mentorship', mentorshipRoutes); // ✅ Prefix for all mentorship routes

// ✅ Health check route
app.get('/', (_req, res) => {
  res.send('Mentorship API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
