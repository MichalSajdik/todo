import { NextApiRequest, NextApiResponse } from 'next';
import { handlePatch } from '@/handlers/todos/handlePatch';
import { db } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

jest.mock('@/pages/lib/db', () => {
  const originalDb = jest.requireActual('@/pages/lib/db');
  const axiosInstance = {
    patch: jest.fn(),
  };
  return {
    ...originalDb,
    db: axiosInstance,
  };
});

describe('handlePatch', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse<any>>;

  beforeEach(() => {
    mockReq = { query: { id: '1' }, body: { description: 'Updated Todo' } };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn(), end: jest.fn() };

  });

  it('handles patch request successfully', async () => {
    (db.patch as jest.Mock).mockResolvedValue({});

    await handlePatch(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(db.patch).toHaveBeenCalledWith('/todos/1', {
      description: 'Updated Todo',
      lastModifiedAt: expect.any(Date),
    });
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('handles patch request with error', async () => {
    const error = new Error('Mocked patch error');
    (db.patch as jest.Mock).mockRejectedValue(error);

    await handlePatch(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(db.patch).toHaveBeenCalledWith('/todos/1', {
      description: 'Updated Todo',
      lastModifiedAt: expect.any(Date),
    });
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: null,
      error: error.message,
    });
  });
});
