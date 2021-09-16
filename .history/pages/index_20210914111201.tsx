import Head from "next/head";
//import Editor from "../components/Editor/Editor";
import Form from "../components/Form/Form";
import Post from "../components/Post/Post";

const Home = (): JSX.Element => {
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

export default Home;
