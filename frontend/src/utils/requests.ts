import https from 'https';
import { ResonseTags } from './types';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const untrustedFetch = (url: string, props?: RequestInit) => {
  // @ts-ignore
  return fetch(url, { ...props, agent: httpsAgent }).then(res => res.json());
};

export const getImagePrompt = (): Promise<[prompt: string, image: string]> => {
  return untrustedFetch(`${process.env.AWS_BASE_URL}/get_image_prompt`);
};

export const getTokenForPrompt = (prompt: string): Promise<ResonseTags> => {
  return untrustedFetch(`${process.env.AWS_BASE_URL}/get_tags/${prompt}`);
};
