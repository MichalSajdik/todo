import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { db, ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

export const handlePatch = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    await db.patch(`${ROUTES.TODOS}/${req.query.id}`, { description: req.body.description });
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      error: axiosError.message || 'Error adding todo',
    });
  }
};
