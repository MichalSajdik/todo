import { NextApiResponse } from 'next';
import { handleGet } from '@/handlers/todos/handleGet';
import { db } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

jest.mock('@/pages/lib/db', () => {
  const originalDb = jest.requireActual('@/pages/lib/db');
  const axiosInstance = {
    get: jest.fn(),
  };
  return {
    ...originalDb,
    db: axiosInstance,
  };
});

describe('handleGet', () => {
  let mockRes: Partial<NextApiResponse<any>>;

  beforeEach(() => {
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  });

  it('handles get request successfully', async () => {
    const successfulResponse = { data: [ { id: '1', description: 'Test Todo' } ] };
    (db.get as jest.Mock).mockResolvedValue(successfulResponse);

    await handleGet(mockRes as NextApiResponse);

    expect(db.get).toHaveBeenCalledWith('/todos');
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: successfulResponse.data,
      error: '',
    });
  });

  it('handles get request with error', async () => {
    const error = new Error('Mocked get error');
    (db.get as jest.Mock).mockRejectedValue(error);

    await handleGet(mockRes as NextApiResponse);

    expect(db.get).toHaveBeenCalledWith('/todos');
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: [],
      error: error.message,
    });
  });
});
