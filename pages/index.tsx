//index.ts
import Head from "next/head";
//import Editor from "../components/Editor/Editor"; //used for richer editor experience, might be implemented later
import { GetServerSideProps } from "next";
import Content from "../components/Content"; //renders post content
import Post from "../components/Post"; //component used for creating & submitting new post
import { useEffect, useRef } from "react";
import { getAllPosts } from "../util/getAllPosts"; //fetches data from backend in serversideprops
import Loading from "../components/Loading"; //removed if static reg. isn't used
import Source from "../components/Source"; //used for linking to github

interface Post {
  title: string;
  content: string;
  comment: [];
  slug: string;
  _id: string;
}
interface HomeProps {
  posts: Post[];
  postsState: any;
  setPostsState: any;
  postSubmitted: boolean;
}

const Home = ({
  posts,
  postsState = [],
  setPostsState,
  postSubmitted,
}: HomeProps): JSX.Element => {
  //if Home is mounted, setPostsState shouldn't be called, so it blocks data fetching in initial mounting phase
  const initialRender = useRef(true);

  useEffect(() => {
    //postsState is managed by _app component, so the posts data is set here
    setPostsState(posts);
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
  console.log("postsState", postsState);
  console.log("posts", posts);
  if (!postsState.length) return <Loading />; //IF page is being statically re-generated

  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      {/*Github link */}

      <Source />
      {/* renders Modal component by updating open state*/}
      {/* after  Modal is rendered by button click,the <Post/> component gets rendered, allowing users to submit a new post */}

      {/* posts content is fetched, and renders a posts list */}
      {postsState.map(post => {
        return (
          <Content
            key={post._id}
            title={post.title}
            content={post.content}
            slug={post.slug}
            creator={post.creator}
            createdAt={post.createdAt}
            comments={post.comments}
            main={true}
          ></Content>
        );
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

export default Home;
