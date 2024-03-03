import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import handler from '@/pages/api/todos';
import { handleGet } from '@/handlers/todos/handleGet';
import { handlePost } from '@/handlers/todos/handlePost';
import { handlePatch } from '@/handlers/todos/handlePatch';
import { handleDelete } from '@/handlers/todos/handleDelete';

jest.mock('@/handlers/todos/handleGet');
jest.mock('@/handlers/todos/handlePost');
jest.mock('@/handlers/todos/handlePatch');
jest.mock('@/handlers/todos/handleDelete');

const MOCKED_USER_ID = '1';
jest.mock('@/pages/lib/auth/getUserIdFromToken', () => ({
  getUserIdFromToken: jest.fn().mockReturnValue('1'), //MOCKED_USER_ID
}));

describe('/api/todos', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse<any>>;

  beforeEach(() => {
    mockReq = {
      method: 'GET', headers: {
        authorization: 'Bearer token',
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(), end: jest.fn(), json: jest.fn(),
    };
  });

  it('handles GET request', async () => {
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(handleGet).toHaveBeenCalledWith(mockRes, MOCKED_USER_ID);
  });

  it('handles POST request', async () => {
    mockReq.method = 'POST';
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(handlePost).toHaveBeenCalledWith(mockReq, mockRes, MOCKED_USER_ID);
  });

  it('handles PATCH request', async () => {
    mockReq.method = 'PATCH';
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(handlePatch).toHaveBeenCalledWith(mockReq, mockRes, MOCKED_USER_ID);
  });

  it('handles DELETE request', async () => {
    mockReq.method = 'DELETE';
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(handleDelete).toHaveBeenCalledWith(mockReq, mockRes, MOCKED_USER_ID);
  });

  it('handles unknown method', async () => {
    mockReq.method = 'UNKNOWN';
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.METHOD_NOT_ALLOWED);
  });
});
