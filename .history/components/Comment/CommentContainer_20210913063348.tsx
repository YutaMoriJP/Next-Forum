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
      <Title as={"h2"}>Total Comments: {comments.length}</Title>
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
