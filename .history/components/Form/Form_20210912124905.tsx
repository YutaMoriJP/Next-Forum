import Input from "./Input";
import { useState } from "react";
import useToggle from "../../useHooks/useToggle";
//used for typing
import Button from "../Button/Button";
import Right from "../../styles/Right";
import Comments, { CommentProps } from "../Comment/Comments";

type State = CommentProps | [];

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

    setComments([{ comment, id: Math.random() * 1231 }]);
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

        {comments.length && <Comments comments={comments} />}
      </form>
    </>
  );
};

export default Form;
