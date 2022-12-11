// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { redis } from 'src/config/redis';
import { selectTags } from 'src/utils/algorithms';
import { getImagePrompt, getTokenForPrompt } from 'src/utils/requests';

interface ResponseData {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const [prompt, image] = await getImagePrompt();
  const hash = nanoid();
  const tags = await getTokenForPrompt(prompt);
  const selectedTags = selectTags(tags);

  redis.set(hash, JSON.stringify(selectedTags));

  res.status(200).json({
    hash,
    tags: selectedTags.client,
    image: `${process.env.IMAGES_CDN_BASE_URL}/${image}`,
  });
}
