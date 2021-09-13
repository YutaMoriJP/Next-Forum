import React from "react";
import { CommentProp } from "./Comments";
import CommentWrapper from '../../styles/Comment'

const Comment = ({ comment }: CommentProp) => {
  return <CommentWrapper></CommentWrapper><p>{comment}</p>;
};

export default Comment;
