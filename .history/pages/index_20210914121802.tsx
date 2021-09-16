import Head from "next/head";
//import Editor from "../components/Editor/Editor";
import Form from "../components/Form/Form";
import Post from "../components/Post/Post";

const Home = ({ name }): JSX.Element => {
  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      <Post />
      <Form center={true} />
    </>
  );
};

export const getStaticProps = () => {
  return {
    props: { name: "HOME" },
  };
};

export default Home;
