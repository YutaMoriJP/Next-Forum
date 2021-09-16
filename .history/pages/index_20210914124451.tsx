import Head from "next/head";
//import Editor from "../components/Editor/Editor";
import Form from "../components/Form/Form";
import Post from "../components/Post/Post";
import { GetStaticProps } from "next";

interface Post {
  title: string;
  content: string;
  comment: [];
  slug: string;
}
interface HomeProps {
  posts: [];
}

const Home = ({ posts }): JSX.Element => {
  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      {posts.map(post => {})}
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { slug } = params;
  return {
    props: {
      posts: [
        {
          title: "POST",
          content: "Tough days continue...",
          comments: [],
          slug: "first-post",
          id: 1,
        },
      ],
    },
  };
};

export default Home;
