import Comment from "./Comment";

export interface CommentProp {
  id: string;
  comment: string;
  [data: string]: any;
}
interface CommentProps {
  comments: Comment[];
}

const Comments = ({ comments }: CommentProp): JSX.Element => {
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
