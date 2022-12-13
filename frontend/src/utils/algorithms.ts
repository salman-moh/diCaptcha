import { ResonseTags } from './types';
import { choice } from './utils';

type ValidTag = [tag: string, score: number];
export const selectTags = (tags: ResonseTags) => {
  // const goldenTags = tags.gold
  //   .filter(tag => tag.length > 3)
  //   .slice(0, 10) // select top 10
  //   .map(tag => [tag, 1] as ValidTag);
  // const positiveTags = tags.pos.filter(pos => pos[0].length > 3);
  // const negativeTags = tags.neg.filter(neg => neg[0].length > 3);

  // let nonNegativeTags = [...goldenTags, ...positiveTags];

  const result: { pos: ValidTag[]; neg: ValidTag[]; client: string[] } = {
    pos: tags.pos,
    // @ts-ignore
    neg: (tags.neg as string[]).map(n => [n, 0]),
    client: [],
  };
  // if (Math.random() > 0.5) {
  //   // Total 8 tags, 3 correct 5 wrong
  //   result.pos = choice(nonNegativeTags, 3);
  //   result.neg = choice(negativeTags, 5);
  // } else {
  //   // Total 10 tags, 4 correct 6 wrong
  //   result.pos = choice(nonNegativeTags, 4);
  //   result.neg = choice(negativeTags, 6);
  // }

  result.client = [
    ...result.pos.map(tag => tag[0]),
    ...result.neg.map(tag => tag[0]),
  ].sort(() => Math.random() - 0.5);
  return result;
};
