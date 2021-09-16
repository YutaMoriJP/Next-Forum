import useInput from "../../useHooks/useInput";
import Column from "../../styles/ColumnFlex";
import Center from "../../styles/Center";

const Post = (): JSX.Element => {
  const title = useInput("");
  const content = useInput("");
  return (
    <Center>
      <Column>
        <Text></Text>
        <input type="text" {...title} />
        <textarea name="content" {...content}></textarea>
      </Column>
    </Center>
  );
};

export default Post;
