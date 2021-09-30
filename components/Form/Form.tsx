import Input from "./Input";
import { useState } from "react";
import useToggle from "../../useHooks/useToggle";
//used for typing
import Button from "../Button";
import Right from "../../styles/Right";
import Comments, { SingleComment } from "../Comment/Container";
import { v4 as uuidv4 } from "uuid";
import Center from "../../styles/Center";
import isStringEmpty from "../../util/isStringEmpty";
import Message from "../Message/Message";
import CommentsWrapper from "../../styles/CommentWrapper";
import FormStyled from "../../styles/Form";
import { useAuth } from "../../store/AuthContext";
import getUsername from "../../util/getUsername";
import { generateNumber } from "../../util/generateNum";

type State = SingleComment[] | [];

interface FormProps {
  main: boolean;
  center: boolean;
  comment: any[];
  id: string;
}

const Form = ({
  main = true,
  center = false,
  comment,
  id,
}: FormProps): JSX.Element => {
  const [comments, setComments] = useState<State>(comment);
  console.log("comments", comments);
  //used to store the name of the one who commented
  const { user } = useAuth();
  //getUsername gets the username from the user object and formats it
  const userName = getUsername(
    user || { user_metadata: { full_name: "Annonymous" } }
  );
  console.log("username", userName);
  //used for clearing input field, after submit event is fired
  const { open, toggle } = useToggle();
  //used for error handling when user submits comment without meaningful text
  const { open: isMessageOpen, onOpen, onClose } = useToggle(false);

  //fired when user submits a new comment
  const handleMainSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    //extract input value as { comment: string }
    const { comment } = Object.fromEntries(new FormData(event.currentTarget));
    const isEmpty = isStringEmpty(comment as string);
    if (isEmpty) {
      onOpen();
      return;
    }
    //unmounts <Message/> component if it's still mounted
    //it's not needed anymore since user has passed the test
    onClose();

    const updatedCommnents = [
      ...comments,
      {
        comment,
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
        userName,
        colorID: user?.user_metadata?.color || generateNumber(1, 6),
      },
    ];
    //update later
    fetch(`/.netlify/functions/express/posts?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCommnents),
    })
      .then(res => res.json())
      .then(({ comments }) => {
        console.log("fetch updated comments?", comments);
        setComments(comments);
      });
    toggle();
  };

  //user replies to another user
  const handleResponseSubmit = async (
    reply: string,
    comment: string,
    originalUser: string,
    colorID: number
  ) => {
    const replyComment = [
      ...comments,
      {
        comment,
        reply: { comment: reply, originalUser, colorID },
        id: uuidv4(),
        userName,
        date: new Date().toLocaleDateString(),
        colorID: user?.user_metadata?.color || generateNumber(1, 6),
      },
    ];

    //update later
    fetch(`/.netlify/functions/express/posts?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyComment),
    })
      .then(res => res.json())
      .then(({ comments }) => {
        console.log("fetch updated comments?", comments);
        setComments(comments);
      });
  };

  return (
    <CommentsWrapper>
      <FormStyled onSubmit={handleMainSubmit}>
        <Center center={center ? "center" : "flex-start"}>
          <Input
            name="comment"
            id="comment"
            onSubmitted={open}
            placeholder="Comment"
            center={center}
            //input is connected to comment(label) and alertMessage(<Message>ALERT</Message>)
            aria-describedby="comment alertMessage"
          />
          <Right center={center}>
            <Button type="submit">SUBMIT</Button>
          </Right>
          {/* <Message /> is rendered when user submits without commenting anything */}
          {/* component is unmounted after 2000ms */}
          {isMessageOpen && (
            <Message
              ms={3000}
              onClose={onClose}
              color="#f03e3e"
              role="alert"
              id="alertMessage"
            >
              Please ensure your comment isn't empty.
            </Message>
          )}
        </Center>
      </FormStyled>
      {/* renders comments */}
      {main && (
        <Comments
          comments={comments}
          handleResponseSubmit={handleResponseSubmit}
        />
      )}
    </CommentsWrapper>
  );
};

export default Form;
