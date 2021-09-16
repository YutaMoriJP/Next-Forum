export const getAllPosts = async () => {
  const res = await fetch(process.env.EXPRESS_URI, {
    method: "GET",
  }).then(res => res.json());
  return res;
};
