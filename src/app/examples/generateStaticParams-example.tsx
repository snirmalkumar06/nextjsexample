// NOTE: This is an example for the App Router.
// This file would typically be located at `app/some-route/[id]/page.tsx`.

import { FC } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

// Helper function to fetch a single post
async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

// Helper function to fetch all posts
async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

// The Page component is an async Server Component that fetches its own data.
const Page: FC<PageProps> = async ({ params }) => {
  const post = await getPost(params.id);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
};

/**
 * generateStaticParams runs at build time to define which dynamic routes
 * should be pre-rendered into static HTML.
 */
export async function generateStaticParams() {
  const posts = await getPosts();

  // We'll pre-render the first 5 posts at build time.
  // Other posts will be rendered on-demand.
  return posts.slice(0, 5).map((post) => ({
    id: post.id.toString(),
  }));
}

export default Page;
