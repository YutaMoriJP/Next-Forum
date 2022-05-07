import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";
import Readmore from "../Readmore/Readmore";
import { getIconName } from "../../util/getIconName";
import useToggle from "../../hooks/useToggle";
import Input from "../Form/Input";
import React from "react";
import Right from "../../styles/Right";
import Message from "../Message/Message";
import useInput from "../../hooks/useInput";
import isStringEmpty from "../../util/isStringEmpty";
import ReplyContainer from "../../styles/Reply";
import ReplyButtonContainer from "../../styles/ReplyButtonContainer";
import { BsFillReplyAllFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Center from "../../styles/Center";
// import MaterialButton from "@material-ui/core/Button";
import { MaterialButton } from "../../styles/Button";
import { getToday } from "../../util/getDate";

import type { HandleResponseSubmit } from "./Container";
import type { Comment as TComment } from "@/typings/comments";

type ReplyProps = {
  handleResponseSubmit: (reply: string, comment: string, originalUser: string, colorID: number) => Promise<void>;
  userName: string;
  comment: string;
  colorID: number;
};

// responsible for rendering the ui that allows a user replying to another comment
const Reply = ({ handleResponseSubmit, userName, comment, colorID }: ReplyProps): JSX.Element => {
  // controls whether Reply input field is mounted or not, it gets mounted whe user clicks 'reply' and unmounted when 'close' is clicked or reply is submitted
  const { open, toggle } = useToggle();

  // controls whether error message is mounted/unmounted. Used to alert the user about an error
  const { open: isMessageOpen, onOpen: openMessage, onClose: closeMessage } = useToggle(false);

  // manages response input field state
  const [responseValue, clearInput] = useInput("");

  const handleSubmit = (): void => {
    // extract value from response input field
    const { value } = responseValue;

    // check if value is empty or not
    const isEmpty = isStringEmpty(value);
    // if empty, alert the user and return from function
    if (isEmpty) {
      openMessage(); // mounts <Message/>
      return;
    }

    handleResponseSubmit(value, comment, userName, colorID);
    // clear input field
    clearInput();
    // unmounts input field as reply is already submitted
    toggle();
  };
  return (
    <>
      {/*opens/closes reply input field */}
      <ReplyButtonContainer>
        <MaterialButton
          onClick={toggle}
          startIcon={open ? <AiOutlineCloseCircle /> : <BsFillReplyAllFill />}
          size="small"
        >
          {open ? "Close" : "Reply"}
        </MaterialButton>
      </ReplyButtonContainer>

      {/* if open is true, then reply input field is rendered*/}
      {open ? (
        <>
          <Input
            id="User-Reply"
            name="Reply"
            placeholder={`Reply to ${userName}`}
            label={false}
            aria-describedby="alertMessage"
            aria-label="Type in response to comment above"
            as="textarea"
            style={{ resize: "vertical", fontFamily: "arial" }}
            {...responseValue}
          />
          <Right>
            <MaterialButton
              startIcon={<BiCommentDetail />}
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              size="small"
            >
              SUBMIT
            </MaterialButton>
          </Right>
        </>
      ) : null}

      {/* if invalid action happens, render message below */}
      {isMessageOpen && (
        <Center>
          <Message ms={3000} onClose={closeMessage} color="#f03e3e" role="alert" id="alertMessage">
            Please ensure your response isn't empty.
          </Message>
        </Center>
      )}
    </>
  );
};

const Comment = ({
  comment = "main comment",
  date,
  userName,
  colorID,
  reply,
  handleResponseSubmit // fired where responds to comment
}: TComment & { handleResponseSubmit: HandleResponseSubmit }): JSX.Element => {
  const iconName = getIconName(userName);

  // if reply is truthy, then the comment is a response to another user
  if (reply) {
    const replyIconName = getIconName(reply.originalUser);

    return (
      <CommentWrapper>
        <Icon count={colorID}>{iconName}</Icon>
        <Column>
          <Row>
            {/* username, added later when intergrated with netlify identity */}
            <Text as="span" weight={500}>
              {userName}
            </Text>

            {/* date */}
            <Text as="time" color="#495057" size="0.6rem" aria-label={getToday(new Date(date))} datetime={date}>
              {getToday(new Date(date))}
            </Text>
          </Row>

          {/* comment */}
          <Text weight={200}>
            <ReplyContainer>
              <Row>
                <Icon count={reply.colorID} small={1}>
                  {replyIconName}
                </Icon>

                <Text weight={300}>{reply.originalUser} posted:</Text>
              </Row>

              <Readmore>{comment}</Readmore>
            </ReplyContainer>

            <Readmore>{reply.comment}</Readmore>
          </Text>

          <Reply
            handleResponseSubmit={handleResponseSubmit}
            userName={userName}
            comment={reply.comment} // comment is what the user can reply to, but if the comment is already a reply to another comment, then reply needs to be the reply comment
            colorID={colorID}
          />
        </Column>
      </CommentWrapper>
    );
  }
  // if reply is falsy, then the rendered comment is a new comment and not a reply
  return (
    <CommentWrapper>
      <Icon count={colorID}>{iconName}</Icon>

      <Column>
        <Row>
          {/* username, added later when intergrated with netlify identity */}
          <Text as="span" weight={500}>
            {userName}
          </Text>

          {/* date */}
          <Text as="time" color="#495057" size="0.6rem" aria-label={getToday(new Date(date))} datetime={date}>
            {getToday(new Date(date))}
          </Text>
        </Row>

        {/* comment */}
        <Text weight={200}>
          <Readmore>{comment}</Readmore>
        </Text>

        <Reply handleResponseSubmit={handleResponseSubmit} userName={userName} comment={comment} colorID={colorID} />
      </Column>
    </CommentWrapper>
  );
};

export default Comment;
