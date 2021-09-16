import React from "react";
import Center from "../../styles/Center";
import Link from "next/link";

const Content = ({ title, content, slug = "", main = false }): JSX.Element => {
  return (
    <Center align="center">
      <h1>{title}</h1>
      <p>{content}</p>
      {main && (
        <Link href={`/${slug}`}>
          <a>{title}</a>
        </Link>
      )}
    </Center>
  );
};

export default Content;
