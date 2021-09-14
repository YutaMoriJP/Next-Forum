const isStringEmpty = (word: string) => {
  const { length } = word.replace(/\s/g, "");
  return !!length;
};

export default isStringEmpty;
