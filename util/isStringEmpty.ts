// Return true if word does not contain meaningful characters, i.e. it's empty or contains only spaces
const isStringEmpty = (word: string): boolean => {
  // Removes space in string
  const { length } = word.replace(/\s/g, "");
  // If length is zero, then it means word was an empty string or a string with only spaces

  return length === 0;
};

export default isStringEmpty;
