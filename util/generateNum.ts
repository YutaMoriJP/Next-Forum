export const generateNumber = (start: number, end: number): number => {
  console.log("new number is generated");
  return Math.floor(Math.random() * end + start);
};
