import Head from "next/head";
import Form from "../components/Form/Form";
import Editor from "../components/Editor/Editor";

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Form />
      <Editor />
    </>
  );
};

export default Home;
