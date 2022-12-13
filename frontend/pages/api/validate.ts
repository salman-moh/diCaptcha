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
  redis.del(hash);

  if (!retrievedCache) {
    return res.status(500).json({
      message: 'Server can not retirve the value from upstash in your region!',
    });
  }

  const posSet = new Set(retrievedCache.pos.map(pos => pos[0]));
  const negSet = new Set(retrievedCache.neg.map(neg => neg[0]));

  const negativeCounts = selecteds.filter(t => negSet.has(t)).length;
  const positiveCounts = selecteds.filter(t => posSet.has(t)).length;
  const score = positiveCounts - negativeCounts;

  let isHuman = true;
  if (negativeCounts < 2) {
    const count = score + negativeCounts;
    isHuman = count >= 2; // neg{0,1} pos{2,3,4}
  } else {
    isHuman = score >= 3; // +pos(0,1,2,3,4) - neg(2,3)
  }

  // console.log({
  //   posSet,
  //   negSet,
  //   selecteds,
  //   score,
  // });

  if (isHuman) {
    res.status(200).json({ token: nanoid().repeat(2) });
  } else {
    res.status(401).json({ message: 'can not be trusted yet!' });
  }
}
