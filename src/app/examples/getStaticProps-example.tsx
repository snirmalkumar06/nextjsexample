// NOTE: This is an example for the Pages Router.
// This file would typically be located at `pages/static-posts.tsx`.
// It will not work correctly inside the `app` directory.

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { FC } from 'react';

interface Post {
  id: number;
  title: string;
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

// The component receives the fetched data via props.
const StaticPostsPage: FC<PageProps> = ({ posts }) => {
  return (
    <main>
      <h1>Statically Generated Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
};

/**
 * getStaticProps runs at build time on the server.
 * It fetches data and passes it to the component as props.
 */
export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();

  return {
    props: {
      posts: posts.slice(0, 10), // Pass only the first 10 posts as props
    },
    // Optional: Enables Incremental Static Regeneration (ISR)
    revalidate: 60, // The page will be re-generated at most once every 60 seconds
  };
};

export default StaticPostsPage;
