import React from "react";
import Link from "next/link";
import Box from "../../styles/Box";
import Title from "../../styles/Title";
import BoxHeader from "../../styles/BoxHeader";
import BoxContent from "../../styles/BoxContent";
import MaterialButton from "@material-ui/core/Button";
//used to shorten title like 'BAYERN WINS AGAIN BY LARGE MARGIN' -> 'BAYERN WINS AGAIN...'
import shortenText from "../../util/shortenText";
import ReactMarkDown from "react-markdown";
import Text from "../../styles/Text";
import { SingleComment } from "../Comment/Container";
import CommentIcon from "@material-ui/icons/Comment";
import CreateIcon from "@material-ui/icons/Create";
import { AiFillRead } from "react-icons/ai";
import { getToday } from "../../util/getDate";
import { useAuth } from "../../store/AuthContext";
import { decrypt } from "../../util/encrypt";
import useToggle from "../../useHooks/useToggle";
import Modal from "../Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Input from "../Form/Input";
import useInput from "../../useHooks/useInput";
import isStringEmptry from "../../util/isStringEmpty"; //validates whether string is empty or not

import Message from "../Message/Message"; //rendered if invalid action occurs and renders a message

//send id as is
//server receives id, encrypts it and stores it in database

//PUT
//first authenticate user - only logged in users
//THEN if decrypted ID (encrypted upon POST request) matches with post ID, allow user to update/delete post
//then send id as is, and server will update it

interface ContentProps {
  title: string;
  content: string;
  creator: string;
  comments: Omit<SingleComment, "handleResponseSubmit">[];
  createdAt: Date;
  _id: string;
  setPostState: React.Dispatch<any>;
  postID?: string;
  slug?: string;
  main?: boolean;
}

interface UpdateProps extends ContentProps {
  userID: string;
}

const Update = ({
  setPostState,
  postID,
  userID,
  title,
  content,
  main,
  _id,
}: UpdateProps) => {
  //if user is authorized to update content, then open state is used to open modal to update the content
  const { open, onClose, onOpen } = useToggle();
  //input value for title && content, but it's for updating them, so default value is what <Update/> receives
  const [titleProps, resetTitle] = useInput(title);
  const [contentProps, contentTitle] = useInput(content);

  //used for <Message/> when invalid action happens
  const {
    open: messageOpen,
    onClose: closeMessage,
    onOpen: openMessage,
  } = useToggle();

  //postID gets encrypted by the server, if decrypted userID is equal to userID
  //then the original author is authenticated and allowed to send PUT/DELETE requests
  const isAuthenticated = userID === decrypt(postID ? postID : "");
  //if user is not authenticated then PUT/DELETE requests are not allowed, so return null
  if (!isAuthenticated) return null;

  //update post
  const handleSubmit = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const { value: title } = titleProps;
    const { value: content } = contentProps;

    //if either title or content is filled, this block will not run
    //so only EITHER needs to be filled, if title is 'a' then isStringEmpty returns false
    //and false && true is false, or true && false is false
    //which ensures that only either title or content needs to be filled
    if (isStringEmptry(title) && isStringEmptry(content)) {
      openMessage(); //tell user what went wrong
      return;
    }
    closeMessage(); //closes <Message/> as user passed test
    //construct updated data
    const body =
      !isStringEmptry(title) && !isStringEmptry(content)
        ? { title, content }
        : !isStringEmptry(title)
        ? { title }
        : { content };
    //send put request, and then update posts state
    await fetch(
      `/.netlify/functions/express/posts?postUpdated=true&userID=${userID}&_id=${_id}&main=${main}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
      .then(res => res.json())
      .then(posts => {
        console.log("posts", posts);
        setPostState(posts);
      })
      .then(() => onClose());
  };

  return (
    <>
      <MaterialButton endIcon={<CreateIcon />} onClick={onOpen}>
        UPDATE
      </MaterialButton>
      {open ? (
        <Modal handleClose={onClose}>
          <Box>
            <BoxHeader>
              <Title alignSelf="center">Update Post</Title>
              <IconButton onClick={onClose}>
                <CloseIcon aria-label="Close Thread" />
              </IconButton>
            </BoxHeader>

            <BoxContent>
              <Input
                id="Update-Title"
                labelText="Update Title"
                name="Title"
                placeholder="Update Title"
                label={true}
                required={true}
                {...titleProps}
              />
            </BoxContent>
            <BoxContent>
              <Input
                id="Update-Content"
                labelText="Update Content"
                name="Content"
                placeholder="Update Content"
                label={true}
                required={true}
                {...contentProps}
              />
            </BoxContent>
            <BoxContent>
              <MaterialButton onClick={handleSubmit}>UPDATE</MaterialButton>
            </BoxContent>
            {messageOpen && (
              <Message onClose={closeMessage} ms={3000} color="#f03e3e">
                *Either Title and Content must be filled.
              </Message>
            )}
          </Box>
        </Modal>
      ) : null}
    </>
  );
};

const Content = (props: ContentProps): JSX.Element => {
  const {
    title,
    content,
    slug = "",
    main = false,
    createdAt,
    creator = "Annonymous",
    comments = [],
  } = props;
  //the shortened title will only be used on the Home Page
  //controlled with the main prop, so if main points at true, then the shortedTitle is used
  //if not, like on the specific page of that post, the title prop is used as is
  const shortenedTitle = shortenText(title, 5);
  const shortenedReadMore = shortenText(title, 5);
  const totalComments = comments.length === 0 || comments.length > 1 ? "s" : "";
  //user object is needed to allow PUT/DELETE actions
  const { user } = useAuth();

  console.log("props", props);
  return (
    <Box>
      <BoxHeader>
        {/* only render if user is logged in */}
        {/* if main is true, then turn title to a link */}
        {main ? (
          <Link href={`/${slug}`}>
            <Title as="h1" position="left" cursor="pointer">
              {shortenedTitle}
            </Title>
          </Link>
        ) : (
          //if not, then user is in the slug page, and it should not be a link
          <Title as="h1" position="left">
            {title}
          </Title>
        )}
        {user ? <Update {...props} userID={user.id} /> : null}
      </BoxHeader>
      <BoxContent>
        <Text weight={500} color="#656f79" size="0.8rem" align="right">
          {`Posted by ${creator}`} {getToday(new Date(createdAt))}
        </Text>
        <ReactMarkDown>{content}</ReactMarkDown>
        {/* if main is true, the clicking on 8 comments should navigate user to that post, but if not then only display comment count */}
        {main ? (
          <section>
            <Link href={`/${slug}`}>
              <MaterialButton startIcon={<CommentIcon />}>
                {comments.length} comment{totalComments}
              </MaterialButton>
            </Link>
          </section>
        ) : null}
      </BoxContent>
      {/* if main points at true, then <Content/> is rendered on the home page, if not, then it's the [slug].tsx page, and 'Read...' is not rendered */}
      {main ? (
        <section>
          <Link href={`/${slug}`}>
            <MaterialButton
              color="primary"
              variant="contained"
              startIcon={<AiFillRead />}
              size="large"
            >{`READ ${shortenedReadMore.toUpperCase()}`}</MaterialButton>
          </Link>
        </section>
      ) : null}
    </Box>
  );
};

export default Content;
