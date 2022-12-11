import axios from 'axios';
import https from 'https';
import { ResonseTags } from './types';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const getImagePrompt = async () => {
  const res = await instance.get<[prompt: string, image: string]>(
    `${process.env.AWS_BASE_URL}/get_image_prompt`,
  );
  return res.data;
};

export const getTokenForPrompt = async (prompt: string) => {
  const res = await instance.get<ResonseTags>(
    `${process.env.AWS_BASE_URL}/get_tags/${prompt}`,
  );
  return res.data;
};
