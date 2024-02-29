import { NextApiRequest, NextApiResponse } from 'next';
import { TodoResponse, TodosResponse } from '@/types/Todo';
import { handlePost } from '@/handlers/todos/handlePost';
import { handleGet } from '@/handlers/todos/handleGet';
import { handlePatch } from '@/handlers/todos/handlePatch';
import { handleDelete } from '@/handlers/todos/handleDelete';
import { StatusCodes } from 'http-status-codes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodosResponse | TodoResponse>
) {
  const { method } = req;

  switch (method) {
  case 'GET':
    return handleGet(res);
  case 'POST':
    return handlePost(req, res);
  case 'PATCH':
    return handlePatch(req, res);
  case 'DELETE':
    return handleDelete(req, res);
  default:
    res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }

}