const isStringEmpty = (word: string): boolean => {
  const { length } = word.replace(/\s/g, "");
  return !length;
};

export default isStringEmpty;
