const sortByNewest = <T extends { date: Date }>(contents: T[]) => {
  const sorted = [...contents].sort((a, b) => {
    const bDate = new Date(b.date).getTime();
    const aDate = new Date(a.date).getTime();
    return bDate - aDate;
  });
  return sorted;
};

const sortByOldest = <T extends { date: Date }>(contents: T[]) => {
  const sorted = [...contents].sort((a, b) => {
    const bDate = new Date(b.date).getTime();
    const aDate = new Date(a.date).getTime();
    return aDate - bDate;
  });

  return sorted;
};

export const sortContent = <T extends { date: Date }>(
  content: T[],
  sortBy: string
) => {
  if (/new/.test(sortBy)) return sortByNewest(content);
  if (/old/.test(sortBy)) return sortByOldest(content);
  return content;
};
