import { GetStaticProps } from "next";

const Post = () => {};

export const getStaticPaths = () => {};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      post: [
        {
          title: "POST",
          content: "Tough days continue...",
          slug: "first-post",
        },
      ],
    },
  };
};

export default Post;
