import Input from "./Input";
import { useState } from "react";
import useToggle from "../../useHooks/useToggle";
//used for typing
import Button from "../Button/Button";
import Right from "../../styles/Right";
import Comments, { CommentProp } from "../Comment/Container";
import { v4 as uuidv4 } from "uuid";
import Center from "../../styles/Center";

type State = CommentProp[] | [];

interface FormProps {
  main?: boolean;
  sub?: boolean;
  center: boolean;
}

const comments = [
  { comment: "a", reply: [{ comment: "aa", reply: [] }] },
  {
    comment: "b",
    reply: [{ comment: "bb", reply: [{ comment: "bbb", reply: [] }] }],
  },
];

const Form = ({
  main = true,
  sub = false,
  center = false,
}: FormProps): JSX.Element => {
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
      <form onSubmit={handleMainSubmit}>
        <Center>
          {" "}
          <Input
            name="comment"
            id="Search User"
            onSubmitted={open}
            placeholder="Comment"
            center={center}
          />
          <Right center={center}>
            <Button>SUBMIT</Button>
          </Right>
        </Center>

        {main && <Comments comments={comments} />}
      </form>
    </>
  );
};

export default Form;
