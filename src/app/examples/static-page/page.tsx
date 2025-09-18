// App Router equivalent of a simple getStaticProps page

import { FC } from 'react';

interface Post {
  id: number;
  title: string;
}

// Helper function to fetch posts
async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

const StaticPage: FC = async () => {
  // In the App Router, data fetching in Server Components is cached by default.
  // This makes the page static, just like getStaticProps.
  const posts = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Static Page Example</h1>
        <p className="text-lg text-gray-400 mb-8 text-center">
          This page was pre-rendered at build time. The data is fetched once and cached.
        </p>
        <ul className="space-y-4">
          {posts.slice(0, 10).map((post) => (
            <li key={post.id} className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default StaticPage;
