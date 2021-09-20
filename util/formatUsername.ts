const formatUserName = (name: string) => {
  const [firstName]: string[] = name.split(" ");
  return firstName;
};

export default formatUserName;
