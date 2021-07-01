// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { listBucket } from '../../services/aws/S3';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { prefix } = req.query;
  const data = await listBucket(prefix as string);
  return res.status(200).json(data);
}
