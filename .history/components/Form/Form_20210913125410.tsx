import Input from "./Input";
import { useState } from "react";
import useToggle from "../../useHooks/useToggle";
//used for typing
import Button from "../Button/Button";
import Right from "../../styles/Right";
import Comments, { CommentProp } from "../Comment/Container";
import { v4 as uuidv4 } from "uuid";

type State = CommentProp[] | [];

interface FormProps {
  main?: boolean;
  sub?: boolean;
}

const comments = [
  { comment: "a", reply: [{ comment: "aa", reply: [] }] },
  {
    comment: "b",
    reply: [{ comment: "bb", reply: [{ comment: "bbb", reply: [] }] }],
  },
];

const Form = ({ main = true, sub = false }: FormProps): JSX.Element => {
  const [comments, setComments] = useState<State>([]);
  const [complex, setComplex] = useState([
    { comment: "main", id: "", reply: "" },
  ]);

  //used for clearing input field, after submit event is fired
  const { open, toggle } = useToggle();
  //dynamically import fuse module so async func.
  const handleMainSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    //extract input value as { comment: string }
    const { comment } = Object.fromEntries(new FormData(event.currentTarget));
    const newComment = {
      comment: comment as string,
      id: uuidv4() as string,
      reply: "",
    };
    setComplex(prev => [...prev, newComment]);
    setComments(prevComments => [newComment, ...prevComments]);
    toggle();
  };
  return (
    <>
      <form
        onSubmit={handleMainSubmit}
        style={{ background: "green", margin: 0 }}
      >
        <Input
          name="comment"
          id="Search User"
          onSubmitted={open}
          placeholder="Comment"
        />
        <Right>
          <Button>SUBMIT</Button>
        </Right>
        {main && <Comments comments={comments} />}
      </form>
    </>
  );
};

export default Form;
