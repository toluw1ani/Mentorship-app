export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'mentor' | 'mentee';
  bio?: string;
  skills?: string[];
  goals?: string;
}
