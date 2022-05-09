import { useMutation, useQueryClient } from "react-query";
import errorHandler from "@/util/errorHandler";

import { POST_QUERY_KEY } from "../queries/useGetPosts";

import type { UseMutationOptions } from "react-query";
import type { Comments } from "@/typings/comments";
import type { Post } from "@/typings/posts";

import type { IError } from "@/typings/reactQuery";

type MutatePostsArgs = {
  method: string;
  body: Comments;
  params?: URLSearchParams;
};

const mutatePosts = async ({ method, body, params }: MutatePostsArgs): Promise<Post> => {
  try {
    const res = await fetch(`/.netlify/functions/express/posts?${params ?? ""}`, {
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

export default function useUpdatePosts(
  cleanUp?: (data: Comments) => void,
  options?: UseMutationOptions<Post, IError, MutatePostsArgs>
) {
  const queryClient = useQueryClient();

  return useMutation(mutatePosts, {
    ...options,
    onSuccess: ({ comments }) => {
      /**
       * Keeps Query in sync with mutation
       * @see https://tkdodo.eu/blog/mastering-mutations-in-react-query
       */
      queryClient.invalidateQueries(POST_QUERY_KEY);

      // Takes care of clean up in the component using the hook - should be improved (see tkdodo)
      typeof cleanUp === "function" && cleanUp(comments);
    }
  });
}
