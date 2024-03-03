import { NextApiRequest, NextApiResponse } from 'next';
import { Todo, TODO_STATUS, TodoResponse } from '@/types/Todo';
import { AxiosError, AxiosResponse } from 'axios';
import { db, DB_ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

export const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<TodoResponse>,
  userId: string
) => {
  try {
    const newTodo = {
      description: req.body.description,
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      status: TODO_STATUS.TODO,
      userId,
    };

    const response: AxiosResponse<Todo> = await db.post(`${DB_ROUTES.TODOS}`, newTodo);
    res.status(StatusCodes.CREATED).json({ data: response.data, error: '' });
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      error: axiosError.message || 'Error adding todo',
    });
  }
};
