import { GetServerSideProps } from "next";
import Form from "../components/Form/Form";
import Content from "../components/Content";
import { getAllPosts } from "../util/getAllPosts";
import Head from "next/head";
import Error from "next/error";

const Post = ({ post, isError }): JSX.Element => {
  console.log("post", post);
  console.log("isError", isError);
  //if isError is true, then render Error page, like a 404 page
  if (isError) return <Error statusCode={500} />;
  const { title, content, comments, _id, slug, createdAt } = post;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* renders the post created by the user, containing the title and content */}
      <Content title={title} content={content} main={false} />
      {/* renders the comment section, allowing users to send a POST request with the comment*/}
      <Form main={true} center={true} comment={comments} id={_id} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log("params object for each [slug] page", params);
  try {
    const { slug } = params; //{ slug: 'title-c8fc3155-497b-48c2-99f7-240a9407eea6' }
    const res = await getAllPosts();
    //request failed, render <Error/> page
    if (!res) return { props: { post: null, isError: true } };
    const post = res.find(post => post.slug === slug);
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    //network error
    return { props: { post: undefined, isError: true } };
  }
};
/*

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
 */

export default Post;
