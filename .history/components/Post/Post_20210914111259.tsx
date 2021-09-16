import useInput from "../../useHooks/useInput";
import Column from "../../styles/ColumnFlex";
import Center from "../../styles/Center";

const Post = (): JSX.Element => {
  const title = useInput("");
  const content = useInput("");
  return (
    <div>
      <input type="text" {...title} />
      <textarea name="content" {...content}></textarea>
    </div>
  );
};

export default Post;
