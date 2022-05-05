const getMonth = (date: Date) => {
  return date.getMonth() + 1;
};

const getDay = (date: Date) => {
  return date.getDate();
};

const getYear = (date: Date) => {
  return date.getFullYear();
};

export const getToday = (date: Date) => {
  const day = getDay(date);
  const month = getMonth(date);
  const year = getYear(date);

  return month + "/" + day + "/" + year;
};
