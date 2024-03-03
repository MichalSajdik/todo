import { NextApiResponse } from 'next';
import { Todo, TodosResponse } from '@/types/Todo';
import { AxiosError, AxiosResponse } from 'axios';
import { db, DB_ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

export const handleGet = async (
  res: NextApiResponse<TodosResponse>,
  userId: string
) => {
  try {
    const response: AxiosResponse<Todo[]> = await db.get(`${DB_ROUTES.TODOS}?userId=${userId}`);

    res.status(StatusCodes.OK).json({ data: response.data, error: '' });

  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: [],
      error: axiosError.message || 'Error fetching todos',
    });
  }
};