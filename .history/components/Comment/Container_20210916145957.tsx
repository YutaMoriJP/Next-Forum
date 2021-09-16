import Comment from "./Comment";
import CommentsWrapper from "../../styles/CommentWrapper";
import Title from "../../styles/Title";
export interface CommentProp {
  id: string;
  comment: string;
  [data: string]: any;
}
export interface CommentProps {
  comments: CommentProp[];
}

const Comments = ({ comments }: CommentProps): JSX.Element => {
  console.log("comments component", comments);
  return (
    <>
      <Title as={"h4"} position="left">
        {comments.length} Comment
        {comments.length > 1 || comments.length === 0 ? "s" : ""}
      </Title>
      {!!comments.length &&
        comments.map((comment, index) => {
          console.log("iterated comment", comment);
          return <Comment comment={comment} id={index} key={index} />;
        })}
    </>
  );
};

export default Comments;
