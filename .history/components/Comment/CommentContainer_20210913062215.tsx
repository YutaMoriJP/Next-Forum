import Comment from "./Comment";
import CommentsWrapper from "../../styles/CommentWrapper";
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
     {!!comments.length &&  {comments.map(
        ({ comment, id }): JSX.Element => (
          <Comment comment={comment} id={id} key={id} />
        )
      )}}
    </CommentsWrapper>
  );
};

export default Comments;
