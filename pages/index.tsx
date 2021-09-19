//index.ts
import Head from "next/head";
//import Editor from "../components/Editor/Editor"; //used for richer editor experience, might be implemented later
import { GetServerSideProps } from "next";
import Content from "../components/Content"; //renders post content
import Post from "../components/Post"; //component used for creating & submitting new post
import useToggle from "../useHooks/useToggle"; //manages opening/closing modal, and fetching updated data from server
import Button from "../styles/Button"; //used for create/close thread button
import Right from "../styles/Right"; //aligns 'create thread' to the right side of the page
import Modal from "../components/Modal"; //used for submitting new post
import { AnimatePresence } from "framer-motion"; //used for modal animation
import { useEffect, useRef, useState } from "react";
import { getAllPosts } from "../util/getAllPosts"; //fetches data from backend in serversideprops
import Loading from "../components/Loading"; //removed if static reg. isn't used
import Source from "../components/Source"; //used for linking to github
import { useAuth } from "../store/AuthContext";

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
  //state managing forum posts data
  const [postsState, setPostsState] = useState(posts);
  //manages when postsState is updated (when user submits a new post)
  const { open: postSubmitted, toggle: postToggle } = useToggle();
  const [auth, dispatchAuth] = useAuth();
  console.log("auth", auth, dispatchAuth);

  //if Home is mounted, setPostsState shouldn't be called, so it blocks data fetching in initial mounting phase
  const initialRender = useRef(true);

  console.log("postsState", postsState);
  //removed later if page is statically re-generated
  if (!posts) return <Loading />; //IF page is being statically re-generated
  //can be removed later
  useEffect(() => {
    console.log(
      "%c App is currently in development, so console will be pretty messy, but will be cleaned up later :)",
      "color: lightseagreen; font-size: 1.2rem"
    );
    console.log("<Home/> mounted");
    return () => console.log("<home/> unmounted");
  }, []);

  //called when a new post submission happens, and fetches the updated data from the database
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
