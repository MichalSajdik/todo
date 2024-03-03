import handler from '@/pages/api/auth';
import { handleRegister } from '@/handlers/auth/handleRegister';
import { handleLogin } from '@/handlers/auth/handleLogin';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthResponse } from '@/types/Auth';
import { StatusCodes } from 'http-status-codes';

jest.mock('@/handlers/auth/handleRegister');
jest.mock('@/handlers/auth/handleLogin');

describe('auth API handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call handleRegister for POST requests with action "register"', async () => {
    const req = { method: 'POST', body: { action: 'register' } } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), end: jest.fn() } as unknown as NextApiResponse<AuthResponse>;

    await handler(req, res);

    expect(handleRegister).toHaveBeenCalledWith(req, res);
    expect(handleLogin).not.toHaveBeenCalled();
  });

  it('should call handleLogin for POST requests with action "login"', async () => {
    const req = { method: 'POST', body: { action: 'login' } } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), end: jest.fn() } as unknown as NextApiResponse<AuthResponse>;

    await handler(req, res);

    expect(handleLogin).toHaveBeenCalledWith(req, res);
    expect(handleRegister).not.toHaveBeenCalled();
  });

  it('should respond with METHOD_NOT_ALLOWED for non-POST requests', async () => {
    const req = { method: 'GET' } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), end: jest.fn() } as unknown as NextApiResponse<AuthResponse>;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.METHOD_NOT_ALLOWED);
    expect(handleRegister).not.toHaveBeenCalled();
    expect(handleLogin).not.toHaveBeenCalled();
  });

  it('should respond with METHOD_NOT_ALLOWED for POST requests without a valid action', async () => {
    const req = { method: 'POST', body: {} } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), end: jest.fn() } as unknown as NextApiResponse<AuthResponse>;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.METHOD_NOT_ALLOWED);
    expect(handleRegister).not.toHaveBeenCalled();
    expect(handleLogin).not.toHaveBeenCalled();
  });
});
