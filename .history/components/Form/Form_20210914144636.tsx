import Input from "./Input";
import { useState } from "react";
import useToggle from "../../useHooks/useToggle";
//used for typing
import Button from "../Button/Button";
import Right from "../../styles/Right";
import Comments, { CommentProp } from "../Comment/Container";
import { v4 as uuidv4 } from "uuid";
import Center from "../../styles/Center";
import isStringEmpty from "../../util/isStringEmpty";
import Message from "../Message/Message";
import CommentsWrapper from "../../styles/CommentWrapper";

type State = CommentProp[] | [];

interface FormProps {
  title?: string;
  content?: string;
  main?: boolean;
  sub?: boolean;
  center: boolean;
}

const Form = ({
  main = true,
  center = false,
  title = "TITLE",
  content = "CONTENT",
}: FormProps): JSX.Element => {
  const [comments, setComments] = useState<State>([]);

  //used for clearing input field, after submit event is fired
  const { open, toggle } = useToggle();
  //used for error handling when user submits comment without meaningful text
  const { open: isMessageOpen, onOpen, onClose } = useToggle(false);
  //dynamically import fuse module so async func.
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
    const newComment = {
      comment: comment as string,
      id: uuidv4() as string,
    };
    setComments(prevComments => [newComment, ...prevComments]);
    toggle();
  };
  return (
    <>
      <form onSubmit={handleMainSubmit}>
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
        {main && <Comments comments={comments} />}
      </form>
    </>
  );
};

export default Form;
