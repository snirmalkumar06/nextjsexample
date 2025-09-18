// NOTE: This is an example for the Pages Router.
// This file would typically be located at `pages/ssr-post.tsx`.
// It will not work correctly inside the `app` directory.

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FC } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

// The component receives the fetched data as props.
const SSRPostPage: FC<PageProps> = ({ post }) => {
  return (
    <main>
      <h1>Server-Side Rendered Post</h1>
      <p>(This page is re-rendered on every request)</p>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </main>
  );
};

/**
 * getServerSideProps runs on the server for every single request.
 * It's useful for data that must be fresh on every page load.
 */
export const getServerSideProps: GetServerSideProps<{ post: Post }> = async (context) => {
  // You can access request-specific information via the context object,
  // e.g., context.req.headers, context.query
  
  // For this example, we'll fetch post #1 on every request.
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/');
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export default SSRPostPage;
