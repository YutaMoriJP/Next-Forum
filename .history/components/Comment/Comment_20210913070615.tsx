import React from "react";
import { CommentProp } from "./CommentContainer";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";

const Comment = ({ comment }: CommentProp) => {
  return (
    <CommentWrapper>
      <Icon />
      <Column>
        <Row>
          <Text weight={500}>name</Text>
        </Row>
        <Text weight={200}>{comment}</Text>
      </Column>
    </CommentWrapper>
  );
};

export default Comment;
