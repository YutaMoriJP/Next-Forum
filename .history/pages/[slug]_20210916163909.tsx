import { GetStaticProps, GetStaticPaths } from "next";
import Form from "../components/Form/Form";
import Content from "../components/Content";

const Post = ({ post }) => {
  const { title, content, comments, slug, _id } = post;
  console.log("post", post);
  // -> /.netlify/functions/api/id -> comments
  return (
    <>
      {/* renders the post created by the user, containing with the title and content */}
      <Content title={title} content={content} main={false} />
      {/* renders the comment section, allowing users to send a POST request with the comment*/}
      <Form main={true} center={true} comment={comments} id={_id} />
    </>
  );
};
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          slug: "first-post",
        },
      },
      {
        params: {
          slug: "second-post",
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { slug } = params;
  return {
    props: {
      post: {
        title: "POST",
        content: "Tough days continue...",
        comments: [],
        slug,
        id: 1,
      },
    },
  };
};

export default Post;
