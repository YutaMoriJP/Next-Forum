import useInput from "../../useHooks/useInput";

const Post = (): JSX.Element => {
  const title = useInput("");
  const content = useInput("");
  return (
    <div>
      <input type="text" {...title} />
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
  );
};

export default Post;
