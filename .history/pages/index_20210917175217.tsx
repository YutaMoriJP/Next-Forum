//index.ts

import Head from "next/head";
//import Editor from "../components/Editor/Editor";
import { GetServerSideProps } from "next";
import Content from "../components/Content";
import Post from "../components/Post";
import useToggle from "../useHooks/useToggle";
import Button from "../styles/Button";
import Right from "../styles/Right";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getAllPosts } from "../util/getAllPosts";
import Loading from "../components/Loading";

import Source from "../components/Source";

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
  console.log("renders <Home/>");
  //used for controlling <Modal />
  const { open, toggle, onClose } = useToggle();
  //maintains forum posts
  const [postsState, setPostsState] = useState(posts);
  const { open: postSubmitted, toggle: postToggle } = useToggle();
  const initialRender = useRef(true);
  console.log("postsState", postsState);
  if (!posts) return <Loading />; //page is being statically re-generated

  useEffect(() => {
    console.log(
      "%c App is currently in development, so console will be pretty messy, but will be cleaned up later :)",
      "color: lightseagreen; font-size: 3rem"
    );
    console.log("<Home/> mounted");
    return () => console.log("<home/> unmounted");
  }, []);

  useEffect(() => {
    //effect is only called when postSubmitted updates (POST request is sent)
    //prevents effect from running in initial mounting
    if (initialRender.current) {
      console.log("initial render");
      //don't fetch data in initial render, as data is only statically obtained
    } else {
      //rewrite later
      console.log("not initial render");
      fetch("/.netlify/functions/express/posts")
        .then(res => res.json())
        .then(data => {
          console.log("new data", data);
          setPostsState(data);
        });
    }
    return () => {
      console.log("not called in initial render");
      //updates to false after first render, so data is updated
      //after post request is sent
      initialRender.current = false;
    };
  }, [postSubmitted]);
  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      {/*Github link */}
      <Source />
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
              {/* Composition avoids passing props from <Modal> => <Post/> but pass it directly */}
              <Post handleClose={onClose} postToggle={postToggle} />
            </Modal>
          )}
        </AnimatePresence>
      )}
      {/* posts content is fetched, and renders a posts list */}
      {postsState.map(post => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getAllPosts();
  //getStaticProps: GetStaticProps
  return {
    props: {
      posts,
    },
  };
};

export default Home;
