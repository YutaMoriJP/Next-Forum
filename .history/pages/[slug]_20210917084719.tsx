import { GetStaticProps, GetStaticPaths } from "next";
import Form from "../components/Form/Form";
import Content from "../components/Content";
import { getAllPosts } from "../util/getAllPosts";
import Loading from "../components/Loading";
const Post = ({ post }): JSX.Element => {
  console.log("post", post);
  if (!post) return <Loading />;
  const { title, content, comments, _id, slug } = post;
  return (
    <>
      {/* renders the post created by the user, containing with the title and content */}
      <Content title={title} content={content} main={false} />
      {/* renders the comment section, allowing users to send a POST request with the comment*/}
      <Form main={true} center={true} comment={comments} id={_id} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getAllPosts();
  const paths = res.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const res = await getAllPosts();
  const post = res.find(post => post.slug === slug);
  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};

export default Post;
