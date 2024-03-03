import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { handleLogin } from './handleLogin'; // Replace with your actual file path
import { db } from '@/pages/lib/db';

jest.mock('@/pages/lib/helpers', () => {
  const original = jest.requireActual('@/pages/lib/helpers');
  return {
    ...original,
    secretKey: 'mock-secret-key',
  };
});

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('@/pages/lib/db');

describe('handleLogin', () => {
  const reqBody = { username: 'test-user', password: 'test-password' };
  const req = { body: reqBody } as NextApiRequest;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log in a user and return a token on successful login', async () => {
    (db.get as jest.Mock).mockResolvedValue({
      data: [ {
        id: 'mock-user-id',
        username: 'test-user',
        password: 'hashed-password',
      } ],
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (jwt.sign as jest.Mock).mockReturnValue('mock-token');

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as NextApiResponse;

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ token: 'mock-token', error: '' });
  });

  it('should return an error if we have multiple users with same username', async () => {
    (db.get as jest.Mock).mockResolvedValue({
      data: [ {
        id: 'mock-user-id',
        username: 'test-user',
        password: 'hashed-password',
      }, {
        id: 'mock-user-id2',
        username: 'test-user2',
        password: 'hashed-password2',
      } ],
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (jwt.sign as jest.Mock).mockReturnValue('mock-token');

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as NextApiResponse;

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT);
    expect(res.json).toHaveBeenCalledWith({ token: '', error: 'Multiple usernames' });
  });

  it('should return an error if the user is not found', async () => {
    (db.get as jest.Mock).mockResolvedValue({ data: [] });

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as NextApiResponse;

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ token: '', error: 'Invalid credentials' });
  });

  it('should return an error if the password is invalid', async () => {
    (db.get as jest.Mock).mockResolvedValue({
      data: [ {
        id: 'mock-user-id',
        username: 'test-user',
        password: 'hashed-password',
      } ],
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as NextApiResponse;

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ token: '', error: 'Invalid credentials' });
  });

  it('should return an internal server error if an exception occurs during login', async () => {
    (db.get as jest.Mock).mockRejectedValue(new Error('Test error'));

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as NextApiResponse;

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ token: '', error: 'Internal server error' });
  });
});
