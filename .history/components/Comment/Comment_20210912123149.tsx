interface Comment {
  id: string;
  comment: string;
}
interface CommentProps {
  comments: Array<Comment>;
}

const Comment = ({ comments }: CommentProps) => {
  return <div></div>;
};

export default Comment;
