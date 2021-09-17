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
  const { open: postSubmitted, toggle: postToggle } = useToggle();

  useEffect(() => {
    fetch("/.netlify/functions/api").then(data =>
      console.log("api data", data)
    );
    fetch("/.netlify/functions/express/")
      .then(data => {
        console.log("express data", data);
        return data.json();
      })
      .catch(e => {
        console.log(e);
        console.log(e.message);
      });
  }, []);
  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      {/* renders Modal component below*/}
      <Right width="96%" maxWidth="100%">
        <Button onClick={toggle}>{`${
          !open ? "CREATE" : "CLOSE"
        } THREAD`}</Button>
      </Right>
      {/* after  Modal is rendered by button click,the <Post/> component gets rendered, allowing users to submit a new post */}
      {open && (
        <AnimatePresence exitBeforeEnter>
          {open && (
            <Modal handleClose={onClose}>
              <Post handleClose={onClose} postToggle={postToggle} />
            </Modal>
          )}
        </AnimatePresence>
      )}
      {/* posts content is fetched, and renders a list */}
      {posts.map(post => {
        return (
          <Content
            key={post.id}
            title={post.title}
            content={post.content}
            slug={post.slug}
            main={true}
          ></Content>
        );
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      posts: [
        {
          title: "FIRST POST",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores perspiciatis ab dolore repellendus eius, deserunt est earum corrupti, laudantium nulla similique dicta quae cum neque ut necessitatibus veniam! Rem, excepturi.",
          comments: [],
          slug: "first-post",
          id: 1,
        },
        {
          title: "SECOND POST",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores perspiciatis ab dolore repellendus eius, deserunt est earum corrupti, laudantium nulla similique dicta quae cum neque ut necessitatibus veniam! Rem, excepturi.",
          comments: [],
          slug: "second-post",
          id: 2,
        },
      ],
    },
  };
};

export default Home;
