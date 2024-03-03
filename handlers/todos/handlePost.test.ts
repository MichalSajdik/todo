import { NextApiRequest, NextApiResponse } from 'next';
import { handlePost } from '@/handlers/todos/handlePost';
import { db, DB_ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';
import { TODO_STATUS } from '@/types/Todo';

// Mocking the db module
jest.mock('@/pages/lib/db', () => {
  const originalDb = jest.requireActual('@/pages/lib/db');
  const axiosInstance = {
    post: jest.fn(),
  };
  return {
    ...originalDb,
    db: axiosInstance,
  };
});

describe('handlePost', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse<any>>;

  beforeEach(() => {
    mockReq = { body: { description: 'New Todo' } };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  });

  it('handles post request successfully', async () => {
    const successfulResponse = { data: { id: '1', description: 'New Todo' } };
    (db.post as jest.Mock).mockResolvedValue(successfulResponse);

    await handlePost(mockReq as NextApiRequest, mockRes as NextApiResponse, '1');

    expect(db.post).toHaveBeenCalledWith(DB_ROUTES.TODOS, {
      description: 'New Todo',
      createdAt: expect.any(Date),
      lastModifiedAt: expect.any(Date),
      status: TODO_STATUS.TODO,
      userId: '1',
    });
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: successfulResponse.data,
      error: '',
    });
  });

  it('handles post request with error', async () => {
    const error = new Error('Mocked post error');
    (db.post as jest.Mock).mockRejectedValue(error);

    await handlePost(mockReq as NextApiRequest, mockRes as NextApiResponse, '1');

    expect(db.post).toHaveBeenCalledWith(DB_ROUTES.TODOS, {
      description: 'New Todo',
      createdAt: expect.any(Date),
      lastModifiedAt: expect.any(Date),
      status: TODO_STATUS.TODO,
      userId: '1',
    });
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: null,
      error: error.message,
    });
  });
});
