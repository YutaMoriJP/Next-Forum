import Comment from "./Comment";
import Title from "../../styles/Title";
export interface CommentProp {
  id: string;
  comment: string;
  date: string;
  userName: string;
  colorID: number;
  [data: string]: any;
}
export interface CommentProps {
  comments: CommentProp[];
}

const Comments = ({ comments }): JSX.Element => {
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
          ({ comment, id, date, userName, colorID }): JSX.Element => {
            return (
              <Comment
                comment={comment}
                id={id}
                key={id}
                date={date}
                userName={userName}
                colorID={colorID}
              />
            );
          }
        )}
    </>
  );
};

export default Comments;
