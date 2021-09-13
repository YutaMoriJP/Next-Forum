import Comment from "./Comment";

export interface Comment {
  id: string;
  comment: string;
}
interface CommentProps {
  comments: Array<Comment>;
}

const Comments = ({ comments }: CommentProps) => {
  return comments.map(comment => <Comment comment={comment} />);
};

export default Comments;
