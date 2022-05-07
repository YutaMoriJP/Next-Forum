import { GetServerSideProps } from "next";
import Form from "../components/Form/Form";
import Content from "../components/Content";
import { getAllPosts } from "../util/getAllPosts";
import Head from "next/head";
import Loading from "../components/Loading/";
import useGetPosts, { usePreFetchPostsQuery } from "../hooks/queries/useGetPosts";

import type { Post as TPost } from "@/typings/posts";

const Post = ({ slug }): JSX.Element => {
  // needed to re-render component PUT request is sent
  // const [postState, setPostState] = useState(post);

  const { data: posts, status } = useGetPosts();

  if (status === "loading") return <Loading />;

  const pagePost = (posts.find((post) => post.slug === slug) || {}) as TPost;

  const { title, content, comments, _id, createdAt, creator, ...rest } = pagePost;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta name="author" content={creator} />
      </Head>

      {/* renders the post created by the user, containing the title and content */}
      <Content
        title={title}
        content={content}
        main={false}
        creator={creator}
        createdAt={createdAt}
        comments={comments}
        _id={_id}
        {...rest}
      />

      {/* renders the comment section, allowing users to send a POST request with the comment*/}
      <Form main={true} center={true} comment={comments} id={_id} />
    </>
  );
};
/**
 * TODO re-usable func for queryclient
 * @see https://swizec.com/blog/prefetch-data-with-react-query-and-nextjs-codewithswiz-8-9/#add-react-query-to-the-mix
 */

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const dehydratedState = await usePreFetchPostsQuery();

  // { slug: 'title-c8fc3155-497b-48c2-99f7-240a9407eea6' }
  const { slug } = params;

  return {
    props: {
      dehydratedState,
      slug
    }
  };
};

/*
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getAllPosts();
  const paths = res.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: true,
  };
};

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
export default Post;
