import { GetStaticProps, GetStaticPaths } from "next";

const Post = () => {};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: { slug: "first-post" },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { slug } = params;
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
