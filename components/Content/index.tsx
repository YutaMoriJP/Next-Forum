import React from "react";
import Link from "next/link";
import Box from "../../styles/Box";
import Title from "../../styles/Title";
import BoxHeader from "../../styles/BoxHeader";
import BoxContent from "../../styles/BoxContent";
import Button from "../../styles/Button";
//used to shorten title like 'BAYERN WINS AGAIN BY LARGE MARGIN' -> 'BAYERN WINS AGAIN...'
import shortenText from "../../util/shortenText";
import ReactMarkDown from "react-markdown";
import Text from "../../styles/Text";

interface ContentProps {
  title: string;
  content: string;
  creator: string;
  slug?: string;
  main?: boolean;
}

const Content = ({
  title,
  content,
  slug = "",
  main = false,
  creator = "Annonymous",
}: ContentProps): JSX.Element => {
  //the shortened title will only be used on the Home Page
  //controlled with the main prop, so if main points at true, then the shortedTitle is used
  //if not, like on the specific page of that post, the title prop is used as is
  const shortenedTitle = shortenText(title, 5);
  const shortenedReadMore = shortenText(title, 5);
  return (
    <Box>
      <BoxHeader>
        <Title as="h1">{main ? shortenedTitle : title}</Title>
      </BoxHeader>
      <BoxContent>
        <Text weight={500}>{`Posted by: ${creator}`}</Text>
        <ReactMarkDown>{content}</ReactMarkDown>
      </BoxContent>
      {/* if main points at true, then <Content/> is rendered on the home page, if not, then it's the [slug].tsx page, and 'Read...' is not rendered */}
      {main && (
        <Link href={`/${slug}`}>
          <Button>{`READ ${shortenedReadMore.toUpperCase()}`}</Button>
        </Link>
      )}
    </Box>
  );
};

export default Content;
