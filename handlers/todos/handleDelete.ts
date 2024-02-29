import { NextApiRequest, NextApiResponse } from 'next';
import { Todo, TodoResponse } from '@/types/Todo';
import { AxiosError, AxiosResponse } from 'axios';
import { db, ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

export const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<TodoResponse>,
) => {
  try {
    const response: AxiosResponse<Todo> = await db.delete(`${ROUTES.TODOS}/${req.query.id}`);
    res.status(StatusCodes.OK).json({ data: response.data, error: '' });
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      error: axiosError.message || 'Error adding todo',
    });
  }
};
