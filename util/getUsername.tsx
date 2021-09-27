import formatName from "./formatUsername";

const getUsername = (user: {
  user_metadata: { full_name: string };
}): string => {
  //if user is null, then default value should be annonymous, optional chaining will prevent accessing property of undefined from throwing an error
  //result will simply be undefined, so the logical OR operator passes control to right handed expression
  //and 'Annonymous' will be evaluated
  const username = user?.user_metadata?.full_name || "Annonymous";
  return formatName(username);
};

export default getUsername;
