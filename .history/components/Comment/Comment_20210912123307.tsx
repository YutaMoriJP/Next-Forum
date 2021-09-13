import React from "react";
import { Comment } from "./Comments";

const Comment = ({ comment }: Comment) => {
  return <p>{comment}</p>;
};

export default Comment;
