export const setItem = (key: string, value: any): void => {
  if (typeof value === "object") {
    //if value is of type object, then stringify it first
    window.localStorage.setItem(key, JSON.stringify(value));
    return undefined;
  } else {
    //if value is not an object, so a primitive, then leave as is
    window.localStorage.setItem(key, value);
    return undefined;
  }
};

export const getItem = (key: string) => {
  //first retrieve stored value and check if it's null(nothing is stored)
  const storedItem = window.localStorage.getItem(key);
  //check if it's null, if so, simply return null
  if (storedItem === null) return null;
  try {
    //try to call JSON.parse on the storedItem, string primitive will throw an error
    const deserializedItem = JSON.parse(storedItem);
    //if it doesn't throw an error, value is 1, [1,2], {a:1} etc., then return value
    return deserializedItem;
  } catch (error) {
    //JSON.parse(storedItem) threw a SyntaxError, check if it's a SyntaxError
    //if error is a SyntaxError, then simply return storedItem, which returns the stored string
    if (error.name === "SyntaxError") return storedItem;
    //if it's something else, then return the error, so we are aware of the error
    return error;
  }
};
