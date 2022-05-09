import Input from "./Input";
import { useState } from "react";
import Comments from "../Comment/Container";
import { v4 as uuidv4 } from "uuid";
import Message from "../Message/Message";
import CommentsWrapper from "@/styles/CommentWrapper";
import Center from "@/styles/Center";
import Right from "@/styles/Right";
import FormStyled from "@/styles/Form";
import { useAuth } from "@/store/AuthContext";
import { MaterialButton } from "@/styles/Button";
import { BiCommentDetail } from "react-icons/bi";
import getUsername from "@/util/getUsername";
import { generateNumber } from "@/util/generateNum";
import isStringEmpty from "@/util/isStringEmpty";
import useToggle from "@/hooks/useToggle";
import useUpdateComments from "@/hooks/mutations/useUpdateComments";

import type { Comments as TComments } from "@/typings/comments";
import type { User } from "netlify-identity-widget";

interface FormProps {
  main: boolean;
  center: boolean;
  comment: any[];
  id: string;
}

const Form = ({ main = true, center = false, comment, id }: FormProps): JSX.Element => {
  const [comments, setComments] = useState<TComments>(comment);
  console.log("comments", comments);

  // used to store the name of the one who commented
  const { user } = useAuth();

  // getUsername gets the username from the user object and formats it
  const userName = getUsername((user || { user_metadata: { full_name: "Anonymous" } }) as User);
  console.log("username", userName);

  // used for clearing input field, after submit event is fired
  const { open, toggle } = useToggle();
  // used for error handling when user submits comment without meaningful text
  const { open: isMessageOpen, onOpen, onClose } = useToggle(false);

  const { mutate: updateComments } = useUpdateComments((comments: TComments) => setComments(comments));

  // fired when user submits a new comment
  const handleMainSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    // extract input value as { comment: string }
    const { comment } = Object.fromEntries(new FormData(event.currentTarget));

    const isEmpty = isStringEmpty(comment as string);

    if (isEmpty) {
      onOpen();

      return;
    }

    // unmounts <Message/> component if it's still mounted
    // it's not needed anymore since user has passed the test
    onClose();

    const updatedComments = [
      ...comments,
      {
        comment,
        id: uuidv4(),
        date: new Date(),
        userName,
        // @ts-ignore
        colorID: user?.user_metadata?.color || generateNumber(1, 6)
      }
    ] as unknown as TComments;

    updateComments({
      method: "PUT",
      body: updatedComments,
      params: new URLSearchParams({ id })
    });

    toggle();
  };

  // user replies to another user
  const handleResponseSubmit = async (reply: string, comment: string, originalUser: string, colorID: number) => {
    const replyComment = [
      ...comments,
      {
        comment,
        reply: { comment: reply, originalUser, colorID },
        id: uuidv4(),
        userName,
        date: new Date(),
        colorID: user?.user_metadata?.color || generateNumber(1, 6)
      }
    ] as unknown as TComments;

    updateComments({
      method: "PUT",
      body: replyComment,
      params: new URLSearchParams({ id })
    });
  };

  return (
    <CommentsWrapper>
      <FormStyled onSubmit={handleMainSubmit}>
        <Center $center={center ? "center" : "flex-start"}>
          <Input
            name="comment"
            id="comment"
            onSubmitted={open}
            placeholder="Comment"
            center={center}
            aria-label="Type new comment on post"
            // input is connected to comment(label) and alertMessage(<Message>ALERT</Message>)
            aria-describedby="comment alertMessage"
            as="textarea"
            style={{ resize: "vertical", fontFamily: "arial" }}
          />

          <Right $center={center}>
            <MaterialButton startIcon={<BiCommentDetail />} variant="contained" color="primary" type="submit">
              SUBMIT
            </MaterialButton>
          </Right>

          {/* <Message /> is rendered when user submits without commenting anything */}
          {isMessageOpen && (
            <Message ms={3000} onClose={onClose} color="#f03e3e" role="alert" id="alertMessage">
              Please ensure your comment isn&apos;t empty.
            </Message>
          )}
        </Center>
      </FormStyled>

      {/* renders comments */}
      {main && <Comments comments={comments} handleResponseSubmit={handleResponseSubmit} />}
    </CommentsWrapper>
  );
};

export default Form;
