// index.ts
import Head from "next/head";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Content from "../components/Content"; // renders post content
import { useEffect, useRef } from "react";
import Loading from "../components/Loading"; // removed if static reg. isn't used
import Source from "../components/Source"; // used for linking to github
import useGetPosts, { usePreFetchPostsQuery } from "../hooks/queries/useGetPosts";

interface HomeProps {
  setPostsState: any;
  postSubmitted: boolean;
  stopLoading: () => void;
}
// TODO remove unnecessary stuff

/**
 * @note posts is pre-fetched by getServerSideProps
 */
const Home = ({ postSubmitted, stopLoading }: HomeProps): JSX.Element => {
  const { data, refetch, status } = useGetPosts();

  // if Home is mounted, setPostsState shouldn't be called, so it blocks data fetching in initial mounting phase
  const initialRender = useRef(true);

  useEffect(() => {
    // stops loading animation when navigated from slug.tsx->index.tsx
    stopLoading();
  }, []);

  // called when a new post submission happens, and fetches the updated data from the database
  useEffect(() => {
    // effect is only called when postSubmitted updates (POST request is sent)
    // prevents effect from running in initial mounting

    // don't fetch data in initial render, as data is only statically obtained
    if (!initialRender.current) refetch();

    return () => {
      // updates to false after the first render, so the data is updated
      // after post request is sent
      initialRender.current = false;
    };
  }, [postSubmitted]);

  // can be deleted if page is server side rendered
  if (status === "loading") return <Loading />; // If page is being statically re-generated

  return (
    <>
      <Head>
        <title>HOME</title>
        <meta name="description" content="Modern Forum Applications for fun discussions" />
        <meta name="keywords" content="Forum, Discussions, NextJS Forum, React Forum" />
      </Head>

      {/*Github link */}
      <Source />

      {/* renders Modal component by updating open state*/}
      {/* after  Modal is rendered by button click,the <Post/> component gets rendered, allowing users to submit a new post */}

      {/* posts content is fetched, and renders a posts list */}
      {data.map((post) => {
        return (
          <Content
            {...post}
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

// TODO look more into this
/**
 *
 * @see https://react-query.tanstack.com/guides/ssr#using-hydration
 * @see https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/#fetching-data-on-the-server
 */
export const getServerSideProps: GetServerSideProps = async () => {
  const dehydratedState = await usePreFetchPostsQuery();

  return {
    props: {
      dehydratedState
    }
  };
};

/*
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const res = await getAllPosts();
  const post = res.find(post => post.slug === slug);
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
*/
export default Home;
