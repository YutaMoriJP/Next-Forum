import Comment from "./Comment";

export interface CommentProp {
  id: string;
  comment: string;
  [data: string]: any;
}
export interface CommentProps {
  comments: Comment[];
  length: number;
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
