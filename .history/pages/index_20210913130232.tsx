import Head from "next/head";
//import Editor from "../components/Editor/Editor";
import Form from "../components/Form/Form";

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      <article style={{ margin: "10px auto", background: "green" }}>
        <Form />
      </article>
    </>
  );
};

export default Home;
