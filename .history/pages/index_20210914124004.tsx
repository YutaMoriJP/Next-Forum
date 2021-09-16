import Head from "next/head";
//import Editor from "../components/Editor/Editor";
import Form from "../components/Form/Form";
import Post from "../components/Post/Post";
import { GetStaticProps } from "next";

const Home = ({ name }): JSX.Element => {
  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      {name}
      <Post />
      <Form center={true} />
    </>
  );
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

export default Home;
