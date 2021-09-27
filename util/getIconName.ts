export const getIconName = (name: string): string => {
  const [first, last] = name.split(" ");
  if (first && last) {
    return first[0].toUpperCase() + last[0].toUpperCase();
  }
  return first[0].toUpperCase() + first.slice(-1).toUpperCase();
};
