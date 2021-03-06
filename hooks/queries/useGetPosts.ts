import { useQuery, QueryClient, dehydrate } from "react-query";
import errorHandler from "@/util/errorHandler";

import type { Posts } from "../../typings/posts";
import type { UseQueryOptions } from "react-query";
import type { IError } from "../../typings/reactQuery";

export const POST_QUERY_KEY = "getPostList";

export const getPosts = async (): Promise<Posts> => {
  try {
    const res = await fetch("/.netlify/functions/express/posts", {
      method: "GET"
    });

    if (!res.ok) errorHandler.baseError(res);

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const preFetchPostsQuery = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(POST_QUERY_KEY, getPosts);

  return dehydrate(queryClient);
};

export default function useGetPosts(options?: UseQueryOptions<Posts, IError>) {
  return useQuery<Posts, IError>(POST_QUERY_KEY, getPosts, {
    ...options
  });
}
