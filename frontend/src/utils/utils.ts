export const choice = <T>(arr: readonly T[], n: number): T[] => {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
};
