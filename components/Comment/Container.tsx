import Comment from "./Comment";
import Title from "../../styles/Title";

type Reply = {
  originalUser: string;
  comment: string;
  colorID: number;
};

export interface SingleComment {
  id: string;
  comment: string;
  date: Date;
  userName: string;
  colorID: number;
  handleResponseSubmit: (
    reply: string,
    comment: string,
    originalUser: string,
    colorID: number
  ) => Promise<void>;
  reply?: Reply;
  [data: string]: any;
}
export interface CommentProps {
  comments: SingleComment[];
  //fired when user replies to a comment, defined in <Form /> component
  handleResponseSubmit: (
    reply: string,
    comment: string,
    originalUser: string,
    colorID: number
  ) => Promise<void>;
}

const Comments = ({
  comments,
  handleResponseSubmit,
}: CommentProps): JSX.Element => {
  console.log(`Comments rendered`, comments);
  console.log("comments component", comments);
  return (
    <>
      <Title as={"h4"} position="left">
        {/*add 's' to Comment if comments is 0 or more than 1*/}
        {`${comments.length} Comment${
          comments.length > 1 || comments.length === 0 ? "s" : ""
        }`}
      </Title>
      {!!comments.length &&
        comments.map(
          ({ comment, id, date, userName, colorID, reply }): JSX.Element => {
            return (
              <Comment
                reply={reply}
                comment={comment}
                id={id}
                key={id}
                date={date}
                userName={userName}
                colorID={colorID}
                handleResponseSubmit={handleResponseSubmit}
              />
            );
          }
        )}
    </>
  );
};

export default Comments;
