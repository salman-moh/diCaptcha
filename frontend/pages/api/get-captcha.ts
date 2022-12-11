// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getImagePrompt, getTokenForPrompt } from 'src/utils/requests';
import { nanoid } from 'nanoid';
import { selectTags } from 'src/utils/algorithms';
import { redis } from 'src/config/redis';

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
    prompt,
    image: `${process.env.IMAGES_CDN_BASE_URL}/${image}`,
  });
}
