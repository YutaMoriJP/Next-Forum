import React from "react";
import { CommentProp } from "./CommentContainer";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";

const Comment = ({ comment }: CommentProp) => {
  return (
    <CommentWrapper>
      <Icon />
      <Text weight={500}>name</Text>
      <Text weight={200}>{comment}</Text>
    </CommentWrapper>
  );
};

export default Comment;
