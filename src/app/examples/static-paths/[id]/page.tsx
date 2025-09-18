// App Router equivalent of getStaticPaths + getStaticProps

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

const StaticPathPage: FC<PageProps> = async ({ params }) => {
  const post = await getPost(params.id);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-gray-300">{post.body}</p>
      </div>
    </main>
  );
};

/**
 * This is the `generateStaticParams` function, which is the App Router
 * equivalent of `getStaticPaths`. It defines which paths to pre-render.
 */
export async function generateStaticParams() {
  const posts = await getPosts();

  // Pre-render the first 5 posts.
  return posts.slice(0, 5).map((post) => ({
    id: post.id.toString(),
  }));
}

export default StaticPathPage;
