import { GetStaticProps, GetStaticPaths } from "next";

const Post = ({ post: { title, content, slug, id } }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{content}</p>
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
          id: 1,
        },
      ],
    },
  };
};

export default Post;
