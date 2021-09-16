import useInput from "../../useHooks/useInput";

const Post = (): JSX.Element => {
  const title = useInput("");
  const content = useInput("");
  return (
    <div>
      <input type="text" {...title} />
      <textarea value="" onChange={() => null}></textarea>
    </div>
  );
};

export default Post;
