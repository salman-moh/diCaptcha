export type ResonseTags = Record<
  'pos' | 'neg',
  [tag: string, score: number][]
> & {
  gold: string[];
};
