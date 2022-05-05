import formatName from "./formatUsername";

const getUsername = (user: { user_metadata: { full_name: string } }): string => {
  // If user is null, then default value should be anonymous, optional chaining will prevent accessing property of undefined from throwing an error
  // Result will simply be undefined, so the logical OR operator passes control to right handed expression
  // And 'Anonymous' will be evaluated
  const username = user?.user_metadata?.full_name || "Anonymous";

  return formatName(username);
};

export default getUsername;
