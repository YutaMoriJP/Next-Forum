import React from "react";
import { CommentProp } from "./CommentContainer";
import CommentWrapper from "../../styles/Comment";

const Comment = ({ comment }: CommentProp) => {
  return (
    <CommentWrapper>
      <p>name</p>
      <p>{comment}</p>
    </CommentWrapper>
  );
};

export default Comment;
