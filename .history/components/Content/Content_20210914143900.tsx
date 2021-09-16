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
    <Center align="center">
      <Box>
        <h1>{title}</h1>
        <p>{content}</p>
        {main && (
          <Link href={`/${slug}`}>
            <a>{title}</a>
          </Link>
        )}
      </Box>
    </Center>
  );
};

export default Content;
