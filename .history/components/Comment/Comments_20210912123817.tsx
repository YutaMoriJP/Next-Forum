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
      {comments.map(({ comment, id }) => (
        <Comment comment={comment} key={id} />
      ))}
    </>
  );
};

export default Comments;
