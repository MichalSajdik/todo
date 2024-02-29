import { NextApiResponse } from 'next';
import { Todo, TodosResponse } from '@/types/Todo';
import { AxiosError, AxiosResponse } from 'axios';
import { db, ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

export const handleGet = async (
  res: NextApiResponse<TodosResponse>,
) => {
  try {
    const response: AxiosResponse<Todo[]> = await db.get(`${ROUTES.TODOS}`);

    res.status(StatusCodes.OK).json({ data: response.data, error: '' });

  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: [],
      error: axiosError.message || 'Error fetching todos',
    });
  }
};