import useInput from "../../useHooks/useInput";
import Column from "../../styles/ColumnFlex";
import Center from "../../styles/Center";
import Text from "../../styles/Text";

const Post = (): JSX.Element => {
  const [post, setPost] = usestate([]);
  const title = useInput("");
  const content = useInput("");
  const handleSubmit = () => {};
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
function usestate(arg0: undefined[]): [any, any] {
  throw new Error("Function not implemented.");
}
