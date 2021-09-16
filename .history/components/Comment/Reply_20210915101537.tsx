import React from "react";
import { CommentProp } from "./Container";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";
import Button from "../Button";
import Form from "../Form/Form";
import useToggle from "../../useHooks/useToggle";

const Comment = ({ comment }: CommentProp): JSX.Element => {
  const { open, toggle } = useToggle(false);
  return (
    <CommentWrapper>
      <Icon />
      <Column>
        <Row>
          <Text weight={500}>name</Text>
          <Text color="#495057" size="0.6rem">
            Posted at 09/02/2021
          </Text>
        </Row>
        <Text weight={200}>{comment}</Text>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            toggle();
          }}
        >
          Reply
        </Button>
        {open && <Form main={false} center={false} />}
      </Column>
    </CommentWrapper>
  );
};

export default Comment;
