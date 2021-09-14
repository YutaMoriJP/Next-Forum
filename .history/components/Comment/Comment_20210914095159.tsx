import React from "react";
import { CommentProp } from "./Container";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";
import Readmore from "../Readmore/Readmore";

const Comment = ({ comment = "main comment" }: CommentProp): JSX.Element => {
  return (
    <CommentWrapper>
      <Icon />
      <Column>
        <Row>
          {/* username */}
          <Text weight={500}>name</Text>
          {/* date */}
          <Text color="#495057" size="0.6rem">
            Posted at 09/02/2021
          </Text>
        </Row>
        {/* comment */}
        <Text weight={200}>
          <Readmore>{comment}</Readmore>
        </Text>
      </Column>
    </CommentWrapper>
  );
};

export default Comment;
