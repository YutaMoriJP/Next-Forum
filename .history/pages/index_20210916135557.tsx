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
import { useEffect, useRef, useState } from "react";
import { getAllPosts } from "../util/getAllPosts";

interface Post {
  title: string;
  content: string;
  comment: [];
  slug: string;
  _id: string;
}
interface HomeProps {
  posts: Post[];
}

const Home = ({ posts }: HomeProps): JSX.Element => {
  //used for controlling <Modal />
  const { open, toggle, onClose } = useToggle();
  //maintains forum posts
  const [postsState, setPostsState] = useState(posts);
  const { open: postSubmitted, toggle: postToggle } = useToggle();
  const initialRender = useRef(true);

  console.log("postsState", postsState);

  //just for testing, will be removed
  useEffect(() => {
    return;
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

  useEffect(() => {
    //prevents effect from running in initial mounting
    console.log("initial", initialRender.current);
    // if (initialRender.current) return;
    //rewrite later
    fetch("/.netlify/functions/express/posts")
      .then(res => res.json())
      .then(data => {
        console.log("new data", data);
        setPostsState(data);
      });
    return () => {
      initialRender.current = false;
    };
  }, [postSubmitted]);
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
              {/*handleClose will close Modal, can be fired by Close Icon */}
              {/*postToggle is called after Post request is sent */}
              <Post handleClose={onClose} postToggle={postToggle} />
            </Modal>
          )}
        </AnimatePresence>
      )}
      {/* posts content is fetched, and renders a list */}
      {postsState.map(post => {
        console.log("post map iteration", post);
        return (
          <Content
            key={post._id}
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

export default Home;
