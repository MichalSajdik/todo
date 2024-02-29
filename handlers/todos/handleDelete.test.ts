// __tests__/handlers/todos/handleDelete.test.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { handleDelete } from '@/handlers/todos/handleDelete';
import { db } from '@/pages/lib/db';

jest.mock('@/pages/lib/db', () => {
  const originalDb = jest.requireActual('@/pages/lib/db');
  const axiosInstance = {
    delete: jest.fn(),
  };
  return {
    ...originalDb,
    db: axiosInstance,
  };
});

describe('handleDelete', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse<any>>;

  beforeEach(() => {
    mockReq = { query: { id: '1' } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn(),
    };

  });

  it('handles delete request successfully', async () => {

    await handleDelete(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(db.delete).toHaveBeenCalledWith('/todos/1');
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);

  });

  it('handles delete request with error', async () => {
    (db.delete as jest.Mock).mockRejectedValue(new Error('error'));
    await handleDelete(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(db.delete).toHaveBeenCalledWith('/todos/1');
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);

  });
});
