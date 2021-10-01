import Comment from "./Comment";
import Title from "../../styles/Title";
import Row from "../../styles/RowFlex";
import Column from "../../styles/ColumnFlex";
import { useState } from "react";
import { sortContent } from "../../util/sortContent"; //sorts comments
import Select from "../Select";
import { v4 as uuidv4 } from "uuid";

//options array used for sorting comments, comments array is sorted by sortContent
const sortOptions = [
  { id: uuidv4(), value: "old", name: "Old" },
  { id: uuidv4(), value: "new", name: "New" },
];

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
  //state that manages what the sorting order is, for now it's either OLD or NEW
  const [sortBy, setSortBy] = useState("old");
  //setSortBy is called by HTMLSelectElement's onChange handler
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(event.currentTarget.value);
  return (
    <>
      <Row justify="space-between" align="center" marginTop="1.6rem">
        <Title as={"h5"} position="left" alignSelf="center">
          {/*add 's' to Comment if comments is 0 or more than 1*/}
          {`${comments.length} Comment${
            comments.length > 1 || comments.length === 0 ? "s" : ""
          }`}
        </Title>
        {/* gives users option to sort comments*/}
        <Column width="content-width">
          <Select
            name="Sorted by"
            label="sort-comments"
            labelName="Sort By:"
            aria-label="Sort comments by newest or oldest order"
            options={sortOptions}
            handleChange={handleChange}
          />
        </Column>
      </Row>
      {!!comments.length &&
        sortContent(comments, sortBy).map(
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
