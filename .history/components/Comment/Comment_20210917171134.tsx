import React from "react";
import { CommentProp } from "./Container";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";
import Readmore from "../Readmore/Readmore";

const Comment = ({
  comment = "main comment",
  date = " Posted at 09/02/2021",
}: CommentProp): JSX.Element => {
  return (
    <CommentWrapper>
      <Icon />
      <Column>
        <Row>
          {/* username, added later when intergrated with netlify identity */}
          <Text weight={500}>Annonymous</Text>
          {/* date */}
          <Text color="#495057" size="0.6rem">
            {date}
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
