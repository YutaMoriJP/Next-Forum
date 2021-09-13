import Input from "./Input";
import { useState } from "react";
import useToggle from "../../useHooks/useToggle";
//used for typing
import Button from "../Button/Button";
import Right from "../../styles/Right";
import Comments, { CommentProp } from "../Comment/Comments";

type State = CommentProp[] | [];

const Form = (): JSX.Element => {
  const [comments, setComments] = useState<State>([]);
  //used for clearing input field, after submit event is fired
  const { open, toggle } = useToggle();
  //dynamically import fuse module so async func.
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    //extract input value as { comment: string }
    const { comment } = Object.fromEntries(new FormData(event.currentTarget));
    const newComment = { comment: comment as string, id: Math.random() };
    setComments(prevComments => [...prevComments]);
    toggle();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          name="comment"
          id="Search User"
          onSubmitted={open}
          placeholder="Comment"
        />
        <Right>
          <Button>SUBMIT</Button>
        </Right>

        {!!comments.length && <Comments comments={comments} />}
      </form>
    </>
  );
};

export default Form;
