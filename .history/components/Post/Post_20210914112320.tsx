import useInput from "../../useHooks/useInput";
import Column from "../../styles/ColumnFlex";
import Center from "../../styles/Center";
import Text from "../../styles/Text";
import { useState } from "react";

const Post = (): JSX.Element => {
  const [post, setPost] = useState({});
  const [title, resetTitle] = useInput("");
  const [content, resetContent] = useInput("");
  const handleSubmit = () => {
    const { value: titleVal } = title;
    const { value: contentVal } = content;
    setPost({ title: titleVal, content: contentVal });
  };
  return (
    <Center>
      <Column align="center">
        <Text weight={900}>TITLE</Text>
        <input type="text" {...title} />
        <Text weight={900}>CONTENT</Text>
        <textarea name="content" {...content}></textarea>
        <button></button>
      </Column>
    </Center>
  );
};

export default Post;
