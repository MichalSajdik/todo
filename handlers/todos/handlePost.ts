import { NextApiRequest, NextApiResponse } from 'next';
import { Todo, TodoResponse, TodoStatus } from '@/types/Todo';
import { AxiosError, AxiosResponse } from 'axios';
import { db, ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

export const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<TodoResponse>,
) => {
  try {
    const newTodo = {
      description: req.body.description,
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      status: TodoStatus.TODO,
    };

    const response: AxiosResponse<Todo> = await db.post(`${ROUTES.TODOS}`, newTodo);
    res.status(StatusCodes.CREATED).json({ data: response.data, error: '' });
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      error: axiosError.message || 'Error adding todo',
    });
  }
};
