import { NextApiRequest, NextApiResponse } from 'next';
import { TodoResponse, TodosResponse } from '@/types/Todo';
import { handlePost } from '@/handlers/todos/handlePost';
import { handleGet } from '@/handlers/todos/handleGet';
import { handlePatch } from '@/handlers/todos/handlePatch';
import { handleDelete } from '@/handlers/todos/handleDelete';
import { StatusCodes } from 'http-status-codes';
import { getUserIdFromToken } from '@/pages/lib/auth/getUserIdFromToken';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodosResponse | TodoResponse>
) {
  const { method, headers } = req;

  const userId = getUserIdFromToken(headers.authorization);

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  switch (method) {
  case 'GET':
    return handleGet(res, userId);
  case 'POST':
    return handlePost(req, res, userId);
  case 'PATCH':
    return handlePatch(req, res, userId);
  case 'DELETE':
    return handleDelete(req, res, userId);
  default:
    res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }
}