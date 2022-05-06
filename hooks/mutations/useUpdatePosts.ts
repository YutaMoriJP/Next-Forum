import { useMutation, useQueryClient } from "react-query";
import errorHandler from "../../util/errorHandler";

import { QUERY_KEY } from "../queries/useGetPosts";

import type { UseMutationOptions } from "react-query";
import type { Posts } from "../../typings/posts";
import type { IError } from "../../typings/reactQuery";

type ReqBody = Record<"title" | "content", string>;

type MutatePostsArgs = {
  method: string;
  body: Pick<ReqBody, "title" | "content">;
  params: URLSearchParams;
};

const mutatePosts = async ({ method, body, params }): Promise<Posts> => {
  try {
    const res = await fetch(`/.netlify/functions/express/posts?${params}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) errorHandler.baseError(res);

    return res.json();
  } catch (error) {
    throw error;
  }
};

export default function useCreatePixel(
  cleanUp?: () => void,
  options?: UseMutationOptions<Posts, IError, MutatePostsArgs>
) {
  const queryClient = useQueryClient();

  return useMutation(mutatePosts, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);

      typeof cleanUp === "function" && cleanUp();
    }
  });
}
