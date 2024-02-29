import { NextApiRequest, NextApiResponse } from 'next';
import { TodoResponse, TodosResponse } from '@/types/Todo';
import axios, { AxiosInstance } from 'axios';
import { handlePost } from '@/handlers/todos/handlePost';
import { handleGet } from '@/handlers/todos/handleGet';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodosResponse | TodoResponse>
) {
  const { method } = req;
  if (method === 'GET') {
    return handleGet(res, api);
  } else if (method === 'POST') {
    return handlePost(req, res, api);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}