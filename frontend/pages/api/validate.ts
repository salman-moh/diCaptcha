import type { NextApiRequest, NextApiResponse } from 'next';
import { redis } from 'src/config/redis';
import { nanoid } from 'nanoid';

type ResponseData = { token: string } | { message: string };
type ValidTag = [tag: string, score: number];
type RetrievedCache = {
  pos: ValidTag[];
  neg: ValidTag[];
  client: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const hash: string = req.body.hash;
  const selecteds: string[] = req.body.selecteds;
  const retrievedCache = (await redis.get(hash)) as RetrievedCache;

  const posSet = new Set(retrievedCache.pos.map(pos => pos[0]));
  const negSet = new Set(retrievedCache.neg.map(neg => neg[0]));
  const goldSet = new Set(
    retrievedCache.pos.filter(pos => pos[1] == 1).map(pos => pos[0]),
  );

  const score = selecteds.reduce((score, tag) => {
    return (
      score +
      Number(posSet.has(tag)) +
      Number(goldSet.has(tag)) -
      Number(negSet.has(tag))
    );
  }, 0);

  const isHuman = score >= (retrievedCache.client.length === 10 ? 4 : 3);

  if (isHuman) {
    res.status(200).json({ token: nanoid().repeat(2) });
  } else {
    res.status(401).json({ message: 'can not be trusted yet!' });
  }
}
