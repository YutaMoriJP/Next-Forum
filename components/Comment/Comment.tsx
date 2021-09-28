import { CommentProp } from "./Container";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";
import Readmore from "../Readmore/Readmore";
import { getIconName } from "../../util/getIconName";

const Comment = ({
  comment = "main comment",
  date = " Posted at 09/02/2021",
  userName,
  colorID,
}: CommentProp): JSX.Element => {
  const iconName = getIconName(userName);

  return (
    <CommentWrapper>
      <Icon count={colorID}>{iconName}</Icon>
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
