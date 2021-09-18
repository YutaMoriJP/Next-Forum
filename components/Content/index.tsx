import React from "react";
import Link from "next/link";
import Box from "../../styles/Box";
import Text from "../../styles/Text";
import Title from "../../styles/Title";
import BoxHeader from "../../styles/BoxHeader";
import BoxContent from "../../styles/BoxContent";
import Button from "../../styles/Button";
//used to shorten title like 'BAYERN WINS AGAIN BY LARGE MARGIN' -> 'BAYERN WINS AGAIN...'
import shortenText from "../../util/shortenText";

interface ContentProps {
  title: string;
  content: string;
  slug?: string;
  main?: boolean;
}

const Content = ({
  title,
  content,
  slug = "",
  main = false,
}: ContentProps): JSX.Element => {
  const shortenedTitle = shortenText(title, 5);
  const shortenedReadMore = shortenText(title, 5);
  return (
    <Box>
      <BoxHeader>
        <Title as="h3">{main ? shortenedTitle : title}</Title>
      </BoxHeader>
      <BoxContent>
        <Text weight={400}>{content}</Text>
      </BoxContent>
      {/* if main points at true, then <Content/> is rendered on the home page, if not, then it's the [slug].tsx page */}
      {main && (
        <Link href={`/${slug}`}>
          <Button>{`READ ${shortenedReadMore.toUpperCase()}`}</Button>
        </Link>
      )}
    </Box>
  );
};

export default Content;
