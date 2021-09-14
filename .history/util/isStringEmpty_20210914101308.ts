const isStringEmpty = (word: string): boolean => {
  //removes space in string
  const { length } = word.replace(/\s/g, "");
  return !length;
};

export default isStringEmpty;
