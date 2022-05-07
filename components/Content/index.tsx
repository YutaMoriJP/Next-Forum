import Box from "@/styles/Box";
import Title from "@/styles/Title";
import BoxHeader from "@/styles/BoxHeader";
import BoxContent from "@/styles/BoxContent";
import MaterialButton from "@material-ui/core/Button";
// used to shorten title like 'BAYERN WINS AGAIN BY LARGE MARGIN' -> 'BAYERN WINS AGAIN...'
import shortenText from "@/util/shortenText";
import Text from "@/styles/Text";
import CommentIcon from "@material-ui/icons/Comment";
import CreateIcon from "@material-ui/icons/Create";
import { AiFillRead } from "react-icons/ai";
import { getToday } from "@/util/getDate";
import { useAuth } from "@/store/AuthContext";
import { decrypt } from "@/util/encrypt";
import useToggle from "@/hooks/useToggle";
import Modal from "../Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Input from "../Form/Input";
import useInput from "@/hooks/useInput";
import isStringEmpty from "@/util/isStringEmpty"; // validates whether string is empty or not
import Message from "../Message/Message"; // rendered if invalid action occurs and renders a message
import Button from "@/styles/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import RowFlex from "@/styles/RowFlex";
import OverlayLoading from "../Loading";
import { useRouter } from "next/router";
import LinkWrapper from "../LinkWrapper";
import Markdown from "../Markdown";

import useUpdatePosts from "@/hooks/mutations/useUpdatePosts";

import type { Comments as TComments } from "@/typings/comments";

// send id as is
// server receives id, encrypts it and stores it in database

// PUT
// first authenticate user - only logged in users
// THEN if decrypted ID (encrypted upon POST request) matches with post ID, allow user to update/delete post
// then send id as is, and server will update it

interface ContentProps {
  title: string;
  content: string;
  creator: string;
  comments: TComments;
  createdAt: Date;
  _id: string;
  postID?: string;
  slug?: string;
  main?: boolean;
}
interface UpdateProps extends ContentProps {
  userID: string;
}

// used for sending PUT REQUEST to update the title/content of the post
const Update = ({ postID, userID, title, content, main, _id }: UpdateProps) => {
  // used to render loading ui
  const { open: showLoading, onClose: stopLoading, onOpen: startLoading } = useToggle();

  // if user is authorized to update content, then open state is used to open modal to update the content
  const { open, onClose, onOpen } = useToggle();

  const cleanUpAfterMutate = () => {
    onClose(); // closes modal
    stopLoading(); // unmount loading component
  };

  const { mutate: updatePosts, data } = useUpdatePosts(cleanUpAfterMutate);

  // input value for title && content, but it's for updating them, so default value is what <Update/> receives
  const [titleProps] = useInput(title);
  const [contentProps] = useInput(content);

  const router = useRouter();

  // used for <Message/> when invalid action happens
  const { open: messageOpen, onClose: closeMessage, onOpen: openMessage } = useToggle();

  // postID gets encrypted by the server, if decrypted userID is equal to userID
  // then the original author is authenticated and allowed to send PUT/DELETE requests
  const isAuthenticated = userID === decrypt(postID ? postID : "");

  // if user is not authenticated then PUT/DELETE requests are not allowed, so return null
  if (!isAuthenticated) return null;

  // update post
  const handleSubmit = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const { value: title } = titleProps;
    const { value: content } = contentProps;
    // if either title or content is filled, this block will not run
    // so only EITHER needs to be filled, if title is 'a' then isStringEmpty returns false
    // and false && true is false, or true && false is false
    // which ensures that only either title or content needs to be filled
    if (isStringEmpty(title) && isStringEmpty(content)) {
      openMessage(); // tell user what went wrong
      return;
    }

    closeMessage(); // closes <Message/> as user passed test
    // start loading ui to indicate pending state
    startLoading();

    // construct updated data, only pass the updated content
    const body =
      !isStringEmpty(title) && !isStringEmpty(content)
        ? { title, content }
        : !isStringEmpty(title)
        ? { title }
        : { content };

    updatePosts({
      method: "PUT",
      body,
      params: new URLSearchParams({ userID, _id, postUpdated: "true", main: JSON.stringify(main) })
    });
  };

  // send delete request with post ID and user ID, and delete=true
  // server encrypts and checks for post id and user id, and calls delete
  // call setPostState to update app with the updated posts state
  // if at home page then don't do anything
  // if at specific post, then router.push
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Do you really want to delete the post?");

    if (!confirmDelete) return;

    updatePosts({
      method: "DELETE",
      params: new URLSearchParams({ userID, _id, main: JSON.stringify(main) }),
      deleteHandler: () => router.asPath !== "/" && router.push("/")
    });
  };

  return (
    <>
      {/* used to indicate request is sent and app is being updated */}
      {showLoading ? <OverlayLoading fixed={true} /> : null}

      {/*rendered next to title of the post, CreateIcon opens Modal to update post, DeleteIcon will delete the post */}
      <IconButton onClick={onOpen}>
        <CreateIcon aria-label="Update Post" style={{ fontSize: "1rem" }} />
      </IconButton>

      <IconButton aria-label="Delete Post" onClick={handleDelete}>
        <DeleteIcon fontSize="small" style={{ fontSize: "1rem" }} />
      </IconButton>

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
                as="textarea"
                style={{ resize: "vertical", fontFamily: "arial" }}
                {...contentProps}
              />
            </BoxContent>

            <BoxContent>
              <Button onClick={handleSubmit}>UPDATE</Button>
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
// renders post content in / and /slug

const Content = (props: ContentProps): JSX.Element => {
  const { title, content, slug = "", main = false, createdAt, creator = "Anonymous", comments = [] } = props;

  // used to render loading ui
  const { open: showLoading, onOpen: startLoading } = useToggle();

  // the shortened title will only be used on the Home Page
  // controlled with the main prop, so if main points at true, then the shortedTitle is used
  // if not, like on the specific page of that post, the title prop is used as is
  const shortenedTitle = shortenText(title, 10, 45);
  // used for read more button, which shouldn't be too long
  const shortenedReadMore = shortenText(title, 5, 44);
  // shorten content
  const shortenContent = shortenText(content, 70, 700);

  const totalComments = comments.length === 0 || comments.length > 1 ? "s" : "";

  // user object is needed to allow PUT/DELETE actions
  const { user } = useAuth();

  return (
    <>
      {showLoading ? <OverlayLoading fixed={true} /> : null}

      <Box>
        <BoxHeader>
          {/* only render if user is logged in */}
          {/* if main is true, then turn title to a link */}
          {main ? (
            <LinkWrapper onClick={startLoading} href={`/${slug}`}>
              <Title as="h3" alignSelf="center" position="left" cursor="pointer">
                {/* if title was shortened, then add '...'*/}
                {shortenedTitle + (title.length > shortenedTitle.length ? "..." : "")}
              </Title>
            </LinkWrapper>
          ) : (
            // if not, then user is in the slug page, and it should not be a link
            <Title as="h4" position="left" alignSelf="center">
              {title}
            </Title>
          )}

          {/* first check if user is logged in, if they are not then UPDATE operations are not allowed so return null*/}
          {/* if user is loggedin, then Update component will check if user is allowed to update the post i.e. author of the post*/}
          {user ? (
            <RowFlex align="center" flex="0 1 120px" wrap="wrap" justify="flex-end">
              <Update {...props} userID={user.id} />{" "}
            </RowFlex>
          ) : null}
        </BoxHeader>

        <BoxContent>
          {/* DATE section */}
          <Text weight={500} color="#656f79" size="0.8rem" align="right">
            {`Posted by ${creator}`}{" "}
            <Text
              as="time"
              weight={500}
              color="#656f79"
              size="0.8rem"
              aria-label={getToday(new Date(createdAt))}
              datetime={createdAt}
            >
              {getToday(new Date(createdAt))}
            </Text>
          </Text>

          {/* POST CONTENT SECTION */}
          {/* this checks if content was shortened, if so add '...', if not then leave as is */}
          <Markdown>{main ? shortenContent + (content.length > shortenContent.length ? "..." : "") : content}</Markdown>

          {/* if main is true, the clicking on 8 comments should navigate user to that post, but if not then only display comment count */}
          {main ? (
            <section>
              <LinkWrapper onClick={startLoading} href={`/${slug}`}>
                <MaterialButton startIcon={<CommentIcon />}>
                  {comments.length} comment{totalComments}
                </MaterialButton>
              </LinkWrapper>
            </section>
          ) : null}
        </BoxContent>

        {/* if main points at true, then <Content/> is rendered on the home page, if not, then it's the [slug].tsx page, and 'Read...' is not rendered */}
        {main ? (
          <section>
            <LinkWrapper onClick={startLoading} href={`/${slug}`}>
              <MaterialButton color="primary" variant="contained" startIcon={<AiFillRead />} size="large">
                {`READ ${shortenedReadMore.toUpperCase()}` + (title.length > shortenedTitle.length ? "..." : "")}
              </MaterialButton>
            </LinkWrapper>
          </section>
        ) : null}
      </Box>
    </>
  );
};

export default Content;
