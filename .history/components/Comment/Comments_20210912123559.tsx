import Comment from "./Comment";

export interface Comment {
  id: string;
  comment: string;
}
interface CommentProps {
  comments: Comment[];
}

const Comments = ({ comments }: CommentProps): JSX.Element => {
  return (
    <>
      {comments.map(comment => (
        <p>{comment.comment}</p>
      ))}
    </>
  );
};

export default Comments;
