import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { db, DB_ROUTES } from '@/pages/lib/db';
import { StatusCodes } from 'http-status-codes';

export const handlePatch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  try {
    await db.patch(`${DB_ROUTES.TODOS}/${req.query.id}?userId=${userId}`, {
      description: req.body.description,
      status: req.body.status,
      lastModifiedAt: new Date(),
    });
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      error: axiosError.message || 'Error adding todo',
    });
  }
};
