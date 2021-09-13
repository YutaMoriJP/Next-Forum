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
  return (
    <CommentsWrapper>
      <Title as={"h1"} position="left">
        {comments.length} Comment
        {comments.length > 1 || comments.length === 9 ? "s" : ""}
      </Title>
      {!!comments.length &&
        comments.map(
          ({ comment, id }): JSX.Element => (
            <Comment comment={comment} id={id} key={id} />
          )
        )}
    </CommentsWrapper>
  );
};

export default Comments;
