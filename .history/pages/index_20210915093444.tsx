import Head from "next/head";
//import Editor from "../components/Editor/Editor";
import Post from "../components/Post/Post";
import { GetStaticProps } from "next";
import Content from "../components/Content/Content";
import Mock from "../components/Post/Mock";
import useToggle from "../useHooks/useToggle";
import Button from "../styles/Button";
import Right from "../styles/Right";
import Modal from "../components/Modal";
import { AnimatePresence } from "framer-motion";

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
  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      <Right width="96%">
        <Button onClick={toggle}>{`${
          !open ? "CREATE" : "CLOSE"
        } THREAD`}</Button>
      </Right>
      {open && (
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {open && (
            <Modal handleClose={onClose}>
              <Mock />
            </Modal>
          )}
        </AnimatePresence>
      )}
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
          content: "Tough days continue...",
          comments: [],
          slug: "first-post",
          id: 1,
        },
        {
          title: "SECOND POST",
          content: "Tough days continue...",
          comments: [],
          slug: "second-post",
          id: 2,
        },
      ],
    },
  };
};

export default Home;
