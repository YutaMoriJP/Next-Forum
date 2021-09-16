import { GetStaticProps, GetStaticPaths } from "next";

const Post = ({ post }) => {
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </>
  );
};

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
          slug,
          id:
        },
      ],
    },
  };
};

export default Post;
