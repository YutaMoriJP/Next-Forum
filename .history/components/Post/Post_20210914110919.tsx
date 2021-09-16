import useInput from "../../useHooks/useInput";

const Post = (): JSX.Element => {
  const title = useInput("");
  const content = useInput<HTMLTextAreaElement>("");
  return (
    <div>
      <input type="text" {...title} />
      <textarea {...content}></textarea>
    </div>
  );
};

export default Post;
