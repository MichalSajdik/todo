import { NextApiRequest, NextApiResponse } from 'next';
import { Todo, TodoResponse, TodoStatus } from '@/types/Todo';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<TodoResponse>,
  api: AxiosInstance,
) => {
  try {
    const newTodo = {
      description: req.body.description,
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      status: TodoStatus.TODO,
    };

    const response: AxiosResponse<Todo> = await api.post('/todos', req.body);
    res.status(201).json({ data: response.data, error: '' });
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(500).json({ data: null, error: axiosError.message || 'Error adding todo' });
  }
};
