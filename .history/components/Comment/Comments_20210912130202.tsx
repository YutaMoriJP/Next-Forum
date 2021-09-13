import Comment from "./Comment";

export interface CommentProp {
  id: number;
  comment: string;
  [data: string]: any;
}
export interface CommentProps {
  comments: CommentProp[];
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
