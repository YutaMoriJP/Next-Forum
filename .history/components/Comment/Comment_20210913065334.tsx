import React from "react";
import { CommentProp } from "./CommentContainer";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";

const Comment = ({ comment }: CommentProp) => {
  return (
    <CommentWrapper>
      <Text>name</Text>
      <Text>{comment}</Text>
    </CommentWrapper>
  );
};

export default Comment;
