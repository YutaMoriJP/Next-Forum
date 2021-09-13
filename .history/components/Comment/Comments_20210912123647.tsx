import Comment from "./Comment";

export interface CommentProp {
  id: string;
  comment: string;
}
interface CommentsProps {
  comments: Comment[];
}

const Comments = ({ comments }: CommentsProps): JSX.Element => {
  return (
    <>
      {comments.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </>
  );
};

export default Comments;
