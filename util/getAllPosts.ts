import { Posts } from "../typings/posts";

export const getAllPosts = async () => {
  try {
    const res = await fetch(`${process.env.API_URI}`, {
      method: "GET"
    });
    if (!res.ok) {
      return false;
    }
    const data: Posts = await res.json();

    return data;
  } catch (error) {
    return false;
  }
};
