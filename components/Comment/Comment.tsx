import { useState } from "react";
import { CommentProp } from "./Container";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";
import Readmore from "../Readmore/Readmore";
//helper functions to create icon
import { generateNumber } from "../../util/generateNum";
import { getIconName } from "../../util/getIconName";

const Comment = ({
  comment = "main comment",
  date = " Posted at 09/02/2021",
  userName,
}: CommentProp): JSX.Element => {
  const iconName = getIconName(userName);
  const count = useState((): number => {
    //<Comment> will be rendered every time a new comment is added
    //and while count state won't be updated for every render, generateNumber would be still be called if useState(fn())
    //but lazily setting the state like useState(() => 1), will only call it when component mounts
    //so generateNumber will only be called onec and not in every render!
    return generateNumber(1, 6);
  });

  return (
    <CommentWrapper>
      <Icon count={count}>{iconName}</Icon>
      <Column>
        <Row>
          {/* username, added later when intergrated with netlify identity */}
          <Text weight={500}>{userName}</Text>
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
