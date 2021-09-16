import { GetStaticProps, GetStaticPaths } from "next";

const Post = () => {};

export const getStaticPaths: GetStaticPaths = () => {};

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
