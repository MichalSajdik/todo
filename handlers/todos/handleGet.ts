import { NextApiResponse } from 'next';
import { Todo, TodosResponse } from '@/types/Todo';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const handleGet = async (
  res: NextApiResponse<TodosResponse>,
  api: AxiosInstance,
) => {
  try {
    const response: AxiosResponse<Todo[]> = await api.get('/todos');

    res.status(200).json({ data: response.data, error: '' });
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(500).json({ data: [], error: axiosError.message || 'Error fetching todos' });
  }
};