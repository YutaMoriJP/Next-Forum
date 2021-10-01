import React from "react";
import Link from "next/link";
import Box from "../../styles/Box";
import Title from "../../styles/Title";
import BoxHeader from "../../styles/BoxHeader";
import BoxContent from "../../styles/BoxContent";
import MaterialButton from "@material-ui/core/Button";
//used to shorten title like 'BAYERN WINS AGAIN BY LARGE MARGIN' -> 'BAYERN WINS AGAIN...'
import shortenText from "../../util/shortenText";
import ReactMarkDown from "react-markdown";
import Text from "../../styles/Text";
import { SingleComment } from "../Comment/Container";
import CommentIcon from "@material-ui/icons/Comment";
import { AiFillRead } from "react-icons/ai";
import { getToday } from "../../util/getDate";

interface ContentProps {
  title: string;
  content: string;
  creator: string;
  comments: Omit<SingleComment, "handleResponseSubmit">[];
  createdAt: Date;
  slug?: string;
  main?: boolean;
}

const Content = ({
  title,
  content,
  slug = "",
  main = false,
  createdAt,
  creator = "Annonymous",
  comments = [],
}: ContentProps): JSX.Element => {
  //the shortened title will only be used on the Home Page
  //controlled with the main prop, so if main points at true, then the shortedTitle is used
  //if not, like on the specific page of that post, the title prop is used as is
  const shortenedTitle = shortenText(title, 5);
  const shortenedReadMore = shortenText(title, 5);
  const totalComments = comments.length === 0 || comments.length > 1 ? "s" : "";
  return (
    <Box>
      <BoxHeader>
        <Title as="h1" position="left">
          {main ? shortenedTitle : title}
        </Title>
      </BoxHeader>
      <BoxContent>
        <Text weight={500} color="#656f79" size="0.8rem" align="right">
          {`Posted by ${creator}`} {getToday(new Date(createdAt))}
        </Text>
        <ReactMarkDown>{content}</ReactMarkDown>
        {/* if main is true, the clicking on 8 comments should navigate user to that post, but if not then only display comment count */}
        {main ? (
          <section>
            <Link href={`/${slug}`}>
              <MaterialButton startIcon={<CommentIcon />}>
                {comments.length} comment{totalComments}
              </MaterialButton>
            </Link>
          </section>
        ) : null}
      </BoxContent>
      {/* if main points at true, then <Content/> is rendered on the home page, if not, then it's the [slug].tsx page, and 'Read...' is not rendered */}
      {main ? (
        <section>
          <Link href={`/${slug}`}>
            <MaterialButton
              color="primary"
              variant="contained"
              startIcon={<AiFillRead />}
            >{`READ ${shortenedReadMore.toUpperCase()}`}</MaterialButton>
          </Link>
        </section>
      ) : null}
    </Box>
  );
};

export default Content;
