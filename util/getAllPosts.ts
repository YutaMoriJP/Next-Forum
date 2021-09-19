export const getAllPosts = async () => {
  try {
    const res: Response = await fetch(`${process.env.EXPRESS_URI}`, {
      method: "GET",
    });
    if (!res.ok) {
      return false;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return false;
  }
};
