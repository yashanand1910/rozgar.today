export const areSetsEqual = <T>(a: Set<T>, b: Set<T>) => {
  if (a?.size !== b?.size) return false;
  for (const i of a) if (!b.has(i)) return false;
  return true;
};
