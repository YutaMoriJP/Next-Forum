import React from "react";
import { CommentProp } from "./CommentContainer";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";

const Comment = ({ comment }: CommentProp) => {
  return (
    <CommentWrapper>
      <Icon />
      <Column></Column>
    </CommentWrapper>
  );
};

export default Comment;
