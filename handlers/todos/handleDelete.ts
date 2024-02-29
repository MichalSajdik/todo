import { NextApiRequest, NextApiResponse } from 'next';
import { TodoResponse } from '@/types/Todo';
import { AxiosError } from 'axios';
import { db, ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

export const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<TodoResponse>,
) => {
  try {
    await db.delete(`${ROUTES.TODOS}/${req.query.id}`);
    res.status(StatusCodes.OK).end();
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      error: axiosError.message || 'Error adding todo',
    });
  }
};
