import { NextApiRequest, NextApiResponse } from 'next';
import { TodoResponse } from '@/types/Todo';
import { AxiosError } from 'axios';
import { db, DB_ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

export const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<TodoResponse>,
  userId: string
) => {
  try {
    await db.delete(`${DB_ROUTES.TODOS}/${req.query.id}?userId=${userId}`);
    res.status(StatusCodes.OK).end();
  } catch (error) {
    const axiosError = error as AxiosError;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      error: axiosError.message || 'Error adding todo',
    });
  }
};
