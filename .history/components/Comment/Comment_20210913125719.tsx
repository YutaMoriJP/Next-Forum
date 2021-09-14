import React from "react";
import { CommentProp } from "./Container";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";
import Button from "../Button/Button";
import Form from "../Form/Form";
import useToggle from "../../useHooks/useToggle";
import Reply from "./Reply";

const Comment = ({ comment = "main comment" }: CommentProp): JSX.Element => {
  const { open, toggle } = useToggle(false);
  return (
    <CommentWrapper>
      <Icon />
      <Column>
        <Row>
          {/* username */}
          <Text weight={500}>name</Text>
          {/* date */}
          <Text color="#495057" size="0.8rem">
            Posted at 09/02/2021
          </Text>
        </Row>
        {/* comment */}
        <Text weight={200}>{comment}</Text>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            toggle();
          }}
        >
          Reply
        </Button>
        {/*        <Reply comment="Testing sub comment..." id={"100"} /> */}
        <p>???</p>
        <article>?????</article>
        {open && (
          <article
            style={{
              display: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Form main={false} />
          </article>
        )}
      </Column>
    </CommentWrapper>
  );
};

export default Comment;
