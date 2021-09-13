import Head from "next/head";
import Editor from "../components/Editor/Editor";
import Form from "../components/Form/Form";

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Editor />
    </>
  );
};

export default Home;
