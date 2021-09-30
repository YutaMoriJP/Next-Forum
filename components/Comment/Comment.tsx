import { SingleComment } from "./Container";
import CommentWrapper from "../../styles/Comment";
import Text from "../../styles/Text";
import Icon from "../../styles/Icon";
import Column from "../../styles/ColumnFlex";
import Row from "../../styles/RowFlex";
import Readmore from "../Readmore/Readmore";
import { getIconName } from "../../util/getIconName";
import useToggle from "../../useHooks/useToggle";
import Input from "../Form/Input";
import React from "react";
import Right from "../../styles/Right";
import Message from "../Message/Message";
import useInput from "../../useHooks/useInput";
import isStringEmpty from "../../util/isStringEmpty";
import ReplyContainer from "../../styles/Reply";
import ReplyButtonContainer from "../../styles/ReplyButtonContainer";
import { BsReply } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Center from "../../styles/Center";
//import MaterialButton from "@material-ui/core/Button";
import { MaterialButton } from "../../styles/Button";

type ReplyProps = {
  handleResponseSubmit: (
    reply: string,
    comment: string,
    originalUser: string,
    colorID: number
  ) => Promise<void>;
  userName: string;
  comment: string;
  colorID: number;
};

const Reply = ({
  handleResponseSubmit,
  userName,
  comment,
  colorID,
}: ReplyProps): JSX.Element => {
  //controls whether Reply input field is mounted or not, it gets mounted whe user clicks 'reply' and unmounted when 'close' is clicked or reply is submitted
  const { open, toggle } = useToggle();

  //controls whether error message is mounted/unmounted. Used to alert the user about an error
  const {
    open: isMessageOpen,
    onOpen: openMessage,
    onClose: closeMessage,
  } = useToggle(false);

  //manages response input field state
  const [responseValue, clearInput] = useInput("");

  const handleSubmit = () => {
    //extract value from response input field
    const { value } = responseValue;
    //check if value is empty or not
    const isEmpty = isStringEmpty(value);
    //if empty, alert the user and return from function
    if (isEmpty) {
      openMessage(); //mounts <Message/>
      return;
    }

    handleResponseSubmit(value, comment, userName, colorID);
    //clear input field
    clearInput();
    //unmounts input field as reply is already submitted
    toggle();
  };
  return (
    <>
      <ReplyButtonContainer>
        <MaterialButton
          onClick={toggle}
          startIcon={open ? <AiOutlineCloseCircle /> : <BsReply />}
          size="small"
          variant="contained"
          color="primary"
        >
          {open ? "Close" : "Reply"}
        </MaterialButton>
      </ReplyButtonContainer>
      {open ? (
        <>
          <Input
            id="User Reply"
            name="Reply"
            placeholder={`Reply to ${userName}`}
            label={false}
            aria-describedby="alertMessage"
            aria-label="Type in response to comment above"
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
      {isMessageOpen && (
        <Center>
          <Message
            ms={3000}
            onClose={closeMessage}
            color="#f03e3e"
            role="alert"
            id="alertMessage"
          >
            Please ensure your response isn't empty.
          </Message>
        </Center>
      )}
    </>
  );
};

const Comment = ({
  comment = "main comment",
  date = " Posted at 09/02/2021",
  userName,
  colorID,
  reply,
  handleResponseSubmit, //fired wher responds to comment
}: SingleComment): JSX.Element => {
  const iconName = getIconName(userName);
  //if reply is truthy, then the comment is a response to another user
  if (reply) {
    const replyIconName = getIconName(reply.originalUser);
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
            <ReplyContainer>
              <Row>
                <Icon count={reply.colorID} small={1}>
                  {replyIconName}
                </Icon>
                <Text weight={300}>{reply.originalUser} said:</Text>
              </Row>
              <Readmore>{comment}</Readmore>
            </ReplyContainer>
            <Readmore>{reply.comment}</Readmore>
          </Text>
          <Reply
            handleResponseSubmit={handleResponseSubmit}
            userName={userName}
            comment={reply.comment} //comment is what the user can reply to, but if the comment is already a reply to another comment, then reply needs to be the reply comment
            colorID={colorID}
          />
        </Column>
      </CommentWrapper>
    );
  }
  //if reply is falsy, then the rendered comment is a new comment and not a reply
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
        <Reply
          handleResponseSubmit={handleResponseSubmit}
          userName={userName}
          comment={comment}
          colorID={colorID}
        />
      </Column>
    </CommentWrapper>
  );
};

export default Comment;
