import React from "react";
import Link from "next/link";
import Box from "../../styles/Box";
import Text from "../../styles/Text";
import BoxHeader from "../../styles/BoxHeader";
import BoxContent from "../../styles/BoxContent";
import Button from "../../styles/Button";

interface ContentProps {
  title: string;
  content: string;
  slug: string;
  main: boolean;
}

const Content = ({
  title,
  content,
  slug = "",
  main = false,
}: ContentProps): JSX.Element => {
  return (
    <Box>
      <BoxHeader>
        <Text weight={600} size="1.2rem">
          {title}
        </Text>
      </BoxHeader>
      <BoxContent>
        <Text weight={400}>{content}</Text>
      </BoxContent>
      {main && (
        <Link href={`/${slug}`}>
          <Button>Read {title}</Button>
        </Link>
      )}
    </Box>
  );
};

export default Content;
