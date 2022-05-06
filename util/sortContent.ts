import type { Comments as TComments } from "@/typings/comments";

const getTime = (date: string) => new Date(date).getTime();

const sortByNewest = (contents: TComments) => {
  const sorted = [...contents].sort((a, b) => {
    const [aDate, bDate] = [a.date, b.date].map(getTime);

    return bDate - aDate;
  });

  return sorted;
};

const sortByOldest = (contents: TComments) => {
  const sorted = [...contents].sort((a, b) => {
    const [aDate, bDate] = [a.date, b.date].map(getTime);

    return aDate - bDate;
  });

  return sorted;
};

export const sortContent = (content: TComments, sortBy: string) => {
  if (/new/.test(sortBy)) return sortByNewest(content);
  if (/old/.test(sortBy)) return sortByOldest(content);

  return content;
};
