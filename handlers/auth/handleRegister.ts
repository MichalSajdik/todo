import bcrypt from 'bcrypt';
import { db } from '@/pages/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthResponse, User } from '@/types/Auth';
import { AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const handleRegister = async (
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser: AxiosResponse<User[]> = await db.get('/users', {
      params: { username },
    });

    if (existingUser.data.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ token: '', error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = { username, password: hashedPassword };
    const createdUser = await db.post('/users', newUser);
    // Generate a JWT token
    const token = jwt.sign({ userId: createdUser.data.id, username }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.status(StatusCodes.CREATED).json({ token, error: '' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ token: '', error: 'Internal server error' });
  }
};
