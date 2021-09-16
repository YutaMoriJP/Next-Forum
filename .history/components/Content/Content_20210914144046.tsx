import React from "react";
import Center from "../../styles/Center";
import Link from "next/link";
import Box from "../../styles/Box";
import Text from "../../styles/Text";
import BoxHeader from "../../styles/BoxHeader";
import Input from "../Form/Input";
import useToggle from "../../useHooks/useToggle";
import BoxContent from "../../styles/BoxContent";
import Button from "../../styles/Button";

const Content = ({ title, content, slug = "", main = false }): JSX.Element => {
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
          <a>{title}</a>
        </Link>
      )}
    </Box>
  );
};

export default Content;
