const isStringEmpty = (word: string) => {
  const { length } = word.replace(/\s/g, "");
};

export default isStringEmpty;
