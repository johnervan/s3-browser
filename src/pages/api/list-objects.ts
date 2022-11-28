// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { listObjects } from '../../services/aws/S3';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { prefix } = req.query;
  const data = await listObjects(prefix as string);
  const filteredData = data.filter((object) => object.keyOrPrefix !== prefix);
  return res.status(200).json(filteredData);
}
