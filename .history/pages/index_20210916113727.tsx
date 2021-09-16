import Head from "next/head";
//import Editor from "../components/Editor/Editor";
import { GetStaticProps } from "next";
import Content from "../components/Content";
import Post from "../components/Post";
import useToggle from "../useHooks/useToggle";
import Button from "../styles/Button";
import Right from "../styles/Right";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface Post {
  title: string;
  content: string;
  comment: [];
  slug: string;
  id: string;
}
interface HomeProps {
  posts: Post[];
}

const Home = ({ posts }: HomeProps): JSX.Element => {
  const { open, toggle, onClose } = useToggle();
  useEffect(() => {
    fetch("/.netlify/functions/api")
      .then(res => res.json())
      .then(data => console.log(data));
    fetch("/.netlify/functions/express/")
      .then(res => res.json())
      .then(data => console.log(data));
    fetch("/.netlify/functions/express/posts")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);
  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      {/* renders Modal component below*/}
      <Right width="95%" maxWidth="100%">
        <Button onClick={toggle}>{`${
          !open ? "CREATE" : "CLOSE"
        } THREAD`}</Button>
      </Right>
      {/* after  Modal is rendered by button click,the <Post/> component gets rendered, allowing users to submit a new post */}
      {open && (
        <AnimatePresence exitBeforeEnter>
          {open && (
            <Modal handleClose={onClose}>
              <Post handleClose={onClose} />
            </Modal>
          )}
        </AnimatePresence>
      )}
      {/* posts content is fetched, and renders a list */}
      {JSON.stringify(posts)}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "http://localhost:8888/.netlify/functions/express/posts",
    {
      method: "GET",
    }
  );
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
};

export default Home;
