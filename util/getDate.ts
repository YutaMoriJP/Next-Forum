const getDate = () => {
  return new Date();
};

const getMonth = () => {
  return getDate().getMonth() + 1;
};

const getDay = () => {
  return getDate().getDate();
};

const getYear = () => {
  return getDate().getFullYear();
};

export const getToday = () => {
  const date = getDay();
  const month = getMonth();
  const year = getYear();
  return month + "/" + date + "/" + year;
};
