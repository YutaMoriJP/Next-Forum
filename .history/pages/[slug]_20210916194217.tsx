const express = require("express");
const serverless = require("serverless-http");
//database stuff
const mongoose = require("mongoose");
//routers
//const { postRouter } = require("./router/routerCollection");

const app = express();

//middleware stuff
app.use(express.json());
//app.use("/.netlify/functions/express/posts", postRouter);

app.get("/.netlify/functions/express", (req, res) => {
  res.json({ msg: "express connected" });
});

module.exports.handler = serverless(app);

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
    fetch("/.netlify/functions/express/").then(data =>
      console.log("express data", data)
    );
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

import { GetStaticProps, GetStaticPaths } from "next";
import Form from "../components/Form/Form";
import Content from "../components/Content";

const Post = ({ post }) => {
  const { title, content, comments, slug, _id } = post;
  console.log("post", post);
  // -> /.netlify/functions/api/id -> comments
  return (
    <>
      {/* renders the post created by the user, containing with the title and content */}
      <Content title={title} content={content} main={false} />
      {/* renders the comment section, allowing users to send a POST request with the comment*/}
      <Form main={true} center={true} comment={comments} id={_id} />
    </>
  );
};
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          slug: "first-post",
        },
      },
      {
        params: {
          slug: "second-post",
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { slug } = params;
  return {
    props: {
      title: "FIRST POST",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores perspiciatis ab dolore repellendus eius, deserunt est earum corrupti, laudantium nulla similique dicta quae cum neque ut necessitatibus veniam! Rem, excepturi.",
      comments: [],
      slug: "first-post",
      id: 1,
    },
  };
};

export default Post;
