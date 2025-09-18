// App Router equivalent of getServerSideProps

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

// This tells Next.js to re-render this page on every request.
export const dynamic = 'force-dynamic';

// Helper function to fetch data
async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

const ServerSideRenderingPage: FC<PageProps> = async ({ params }) => {
  const post = await getPost(params.id);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Server-Side Rendering Example</h1>
        <p className="text-lg text-gray-400 mb-8">
          This page is re-rendered on the server for every request. Refresh the page to see the same post.
        </p>
        <div className="bg-light-blue-50 dark:bg-dark-blue-900 shadow-md p-6 rounded-lg text-left">
          <h2 className="text-2xl font-semibold mb-2">{post.title} (Post #{post.id})</h2>
          <p className="text-gray-300">{post.body}</p>
        </div>
      </div>
    </main>
  );
};

export default ServerSideRenderingPage;
