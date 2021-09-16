export const getAllPosts = async () => {
  const res = await fetch(
    "http://localhost:8888/.netlify/functions/express/posts",
    {
      method: "GET",
    }
  ).then(res => res.json());
};
