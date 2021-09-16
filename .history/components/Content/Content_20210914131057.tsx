import React from "react";
import Center from "../../styles/Center";

const Content = (): JSX.Element => {
  return (
    <Center>
      {" "}
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link href={`/${post.slug}`}>
        <a>{post.title}</a>
      </Link>
    </Center>
  );
};

export default Content;
