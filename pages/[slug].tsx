import { GetServerSideProps } from "next";
import Form from "../components/Form/Form";
import Content from "../components/Content";
import { getAllPosts } from "../util/getAllPosts";
import Head from "next/head";
import { useState } from "react";

const Post = ({ post }): JSX.Element => {
  //needed to re-render component PUT request is sent
  const [postState, setPostState] = useState(post);
  console.log("post", post);
  const { title, content, comments, _id, createdAt, creator, ...rest } =
    postState;

  console.log("postState", postState);
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
        setPostState={setPostState}
        _id={_id}
        {...rest}
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
export default Post;
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
