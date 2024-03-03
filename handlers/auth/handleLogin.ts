import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthResponse, User } from '@/types/Auth';
import { db, DB_ROUTES } from '@/pages/lib/db';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { secretKey } from '@/pages/lib/helpers';

export const handleLogin = async (
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const users: AxiosResponse<User[]> = await db.get(DB_ROUTES.USERS, {
      params: { username },
    });

    if (users.data.length === 0) {
      console.error('User not found');
      return res.status(StatusCodes.UNAUTHORIZED).json({ token: '', error: 'Invalid credentials' });
    }

    if (users.data.length > 1) {
      console.error('Multiple users found');
      return res.status(StatusCodes.CONFLICT).json({ token: '', error: 'Multiple usernames' });
    }

    const user = users.data[0];

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ token: '', error: 'Invalid credentials' });
    }

    if (!secretKey) {
      throw new Error('Secret key is not available');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, {
      expiresIn: '1h',
    });

    res.status(StatusCodes.OK).json({ token, error: '' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ token: '', error: 'Internal server error' });
  }
};