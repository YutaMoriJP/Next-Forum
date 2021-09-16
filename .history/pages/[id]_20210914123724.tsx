import { GetStaticProps, GetStaticPaths } from "next";
import Form from "../components/Form/Form";

const Post = ({ post: { title, content, comments, slug, id } }) => {
  // -> /.netlify/functions/api/id
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
          comments: [],
          slug,
          id: 1,
        },
      ],
    },
  };
};

export default Post;
