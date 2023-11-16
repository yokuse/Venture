import type { NextApiRequest, NextApiResponse } from 'next';
import logger from "../../Logger";

type Data = {
  status: string
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  logger.warn('invalid csrf token submitted')
  res.status(403).send({ status: 'invalid csrf token' });
}