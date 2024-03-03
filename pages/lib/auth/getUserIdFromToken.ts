import jwt from 'jsonwebtoken';
import { secretKey } from '@/pages/lib/helpers';

export const getUserIdFromToken = (bearerToken?: string): string | null => {
  if (!bearerToken) {
    return null;
  }

  const token = bearerToken?.replace('Bearer ', '');

  try {
    if (!secretKey) {
      throw new Error('Secret key is not available');
    }
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    return decoded.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};