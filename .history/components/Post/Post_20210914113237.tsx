import useInput from "../../useHooks/useInput";
import Column from "../../styles/ColumnFlex";
import Center from "../../styles/Center";
import Text from "../../styles/Text";
import { useState } from "react";
import isStringEmptry from "../../util/isStringEmpty";
import Message from "../Message/Message";
import useToggle from "../../useHooks/useToggle";

type State =
  | { title: string; content: string; created: false }
  | { title: string; content: string; created: true };

const Post = (): JSX.Element => {
  const [post, setPost] = useState<State>({
    title: "",
    content: "",
    created: false,
  });
  //used for <Message/> when invalid action happens
  const { open, onClose, onOpen } = useToggle();
  //post title & content
  const [title, resetTitle] = useInput("");
  const [content, resetContent] = useInput("");
  //helper function to reset input fields
  const resetInput = () => {
    resetTitle();
    resetContent();
  };
  //called when user submits comment

  const handleClick = () => {
    const { value: titleVal } = title;
    const { value: contentVal } = content;
    if (isStringEmptry(titleVal) || isStringEmptry(contentVal)) {
      onOpen();
      return;
    }
    onClose();
    setPost({ title: titleVal, content: contentVal, created: true });
    //slug for the post, or create it in the server?
    const slug = titleVal.toLowerCase().split(" ").join("-");
    //clean up input
    resetInput();
  };
  return (
    <>
      <Center>
        <Column align="center">
          <Text weight={900}>TITLE</Text>
          <input type="text" {...title} />
          <Text weight={900}>CONTENT</Text>
          <textarea name="content" {...content}></textarea>
          <button onClick={handleClick}>SUBMIT POST</button>
        </Column>
        {open && (
          <Message onClose={onClose} ms={3000} color="#f03e3e">
            Both Title and Content must be filled.
          </Message>
        )}
      </Center>
    </>
  );
};

export default Post;
