const isStringEmpty = (word: string): boolean => {
  //removes space in string
  const { length } = word.replace(/\s/g, "");
  //if length is zero, then it means word was an empty string or a string with only spaces
  return !length;
};

export default isStringEmpty;
