import React from "react";
import Center from "../../styles/Center";
import Link from "next/link";

const Content = ({ title, content, slug }): JSX.Element => {
  return (
    <Center>
      <h1>{title}</h1>
      <p>{content}</p>
      <Link href={`/${slug}`}>
        <a>{title}</a>
      </Link>
    </Center>
  );
};

export default Content;
