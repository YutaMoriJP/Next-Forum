import Input from "./Input";
import { useState } from "react";
import useToggle from "../../useHooks/useToggle";
//used for typing
import Button from "../Button";
import Right from "../../styles/Right";
import Comments, { CommentProp } from "../Comment/Container";
import { v4 as uuidv4 } from "uuid";
import Center from "../../styles/Center";
import isStringEmpty from "../../util/isStringEmpty";
import Message from "../Message/Message";
import CommentsWrapper from "../../styles/CommentWrapper";
import FormStyled from "../../styles/Form";

type State = CommentProp[] | [];

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
  //used for clearing input field, after submit event is fired
  const { open, toggle } = useToggle();
  //used for error handling when user submits comment without meaningful text
  const { open: isMessageOpen, onOpen, onClose } = useToggle(false);
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

    console.log(new Date());
    const updatedCommnents = [
      ...comments,
      { comment, id: uuidv4(), date: new Date().toLocaleDateString() },
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
          />
          <Right center={center}>
            <Button>SUBMIT</Button>
          </Right>
          {/* <Message /> is rendered when user submits without commenting anything */}
          {/* component is unmounted after 2000ms */}
          {isMessageOpen && (
            <Message ms={3000} onClose={onClose} color="#f03e3e">
              Please ensure your comment isn't empty.
            </Message>
          )}
        </Center>
      </FormStyled>
      {main && <Comments comments={comments} />}
    </CommentsWrapper>
  );
};

export default Form;
