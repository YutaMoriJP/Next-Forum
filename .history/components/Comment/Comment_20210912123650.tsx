import React from "react";
import { CommentProp } from "./Comments";

const Comment = ({ comment, id }: CommentProp) => {
  return <p>{comment}</p>;
};

export default Comment;
