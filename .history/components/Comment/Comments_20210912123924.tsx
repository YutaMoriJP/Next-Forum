import Comment from "./Comment";

export interface Comment {
  id: string;
  comment: string;
  [data: string]: any;
}
interface CommentProps {
  comments: Comment[];
}

const Comments = ({ comments }: CommentProps): JSX.Element => {
  return (
    <>
      {comments.map(
        ({ comment, id }): JSX.Element => (
          <Comment comment={comment} id={id} key={id} />
        )
      )}
    </>
  );
};

export default Comments;
