import { GetServerSideProps } from "next";
import Form from "../components/Form/Form";
import Content from "../components/Content";
import { getAllPosts } from "../util/getAllPosts";
import Head from "next/head";

const Post = ({ post }): JSX.Element => {
  console.log("post", post);
  const { title, content, comments, _id, slug, createdAt, creator } = post;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* renders the post created by the user, containing the title and content */}
      <Content
        title={title}
        content={content}
        main={false}
        creator={creator}
        createdAt={createdAt}
        comments={comments}
      />
      {/* renders the comment section, allowing users to send a POST request with the comment*/}
      <Form main={true} center={true} comment={comments} id={_id} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params; //{ slug: 'title-c8fc3155-497b-48c2-99f7-240a9407eea6' }
  const res = await getAllPosts();
  //request failed, render <Error/> page
  const post = res.find(post => post.slug === slug);
  return {
    props: {
      post,
    },
  };
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
