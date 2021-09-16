import { GetStaticProps } from "next";

const Post = () => {};

export const getStaticPaths = () => {};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      post: [{ title: "POST", content: "Tough days continue..." }],
    },
  };
};

export default Post;
