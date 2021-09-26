import formatName from "./formatUsername";

const getUsername = (user: {
  user_metadata: { full_name: string };
}): string => {
  //user is null, then default should be annonymous
  const username = user?.user_metadata?.full_name || "Annonymous";
  return formatName(username);
};

export default getUsername;
