import { Posts } from "../typings/posts";
import errorHandler from "@/util/errorHandler";

export const getAllPosts = async () => {
  try {
    const res = await fetch(`${process.env.API_URI}`, {
      method: "GET"
    });
    if (!res.ok) errorHandler.baseError(res);

    const data: Posts = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
