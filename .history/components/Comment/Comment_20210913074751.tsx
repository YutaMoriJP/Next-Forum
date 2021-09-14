import React from "react";
import { CommentProp } from "./CommentContainer";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";
import Button from "../Button/Button";

const Comment = ({ comment }: CommentProp) => {
  return (
    <CommentWrapper>
      <Icon />
      <Column>
        <Row>
          <Text weight={500}>name</Text>
          <Text color="#495057" size="0.8rem">
            Posted at 09/02/2021
          </Text>
        </Row>
        <Text weight={200}>{comment}</Text>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          Reply
        </Button>
      </Column>
    </CommentWrapper>
  );
};

export default Comment;
