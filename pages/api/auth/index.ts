import { NextApiRequest, NextApiResponse } from 'next';
import { handleRegister } from '@/handlers/auth/handleRegister';
import { handleLogin } from '@/handlers/auth/handleLogin';
import { AuthResponse } from '@/types/Auth';
import { StatusCodes } from 'http-status-codes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  if (req.method === 'POST') {
    if (req.body.action === 'register') {
      return handleRegister(req, res);
    }
    if (req.body.action === 'login') {
      return handleLogin(req, res);
    }
  }

  res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
}