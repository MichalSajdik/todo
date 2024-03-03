import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { handleRegister } from './handleRegister'; // Replace with your actual file path
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

describe('handleRegister', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user and return a token on successful registration', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

    (db.get as jest.Mock).mockResolvedValue({ data: [] });

    (db.post as jest.Mock).mockResolvedValue({
      data: { id: 'mock-user-id', username: 'mock-username', password: 'hashed-password' },
    });

    (jwt.sign as jest.Mock).mockReturnValue('mock-token');

    const reqBody = { username: 'test-user', password: 'test-password' };

    const req = { body: reqBody } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as NextApiResponse;

    await handleRegister(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(res.json).toHaveBeenCalledWith({ token: 'mock-token', error: '' });
  });

  it('should return an error if the username is already taken', async () => {
    (db.get as jest.Mock).mockResolvedValue({
      data: [ {
        id: 'existing-id',
        username: 'test-user',
        password: 'existing-password',
      } ],
    });

    const reqBody = { username: 'test-user', password: 'test-password' };

    const req = { body: reqBody } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as NextApiResponse;

    await handleRegister(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ token: '', error: 'Username already exists' });
  });

  it('should return an internal server error if an exception occurs during registration', async () => {
    (db.get as jest.Mock).mockRejectedValue(new Error('Test error'));

    const reqBody = { username: 'test-user', password: 'test-password' };

    const req = { body: reqBody } as NextApiRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as NextApiResponse;

    await handleRegister(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ token: '', error: 'Internal server error' });
  });
});
