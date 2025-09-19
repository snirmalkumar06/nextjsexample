// NOTE: This is an example for the App Router.
// This file would typically be located at `app/some-route/[id]/page.tsx`.

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
// Remove FC type annotation, use plain async function for Server Component
async function Page({ params }: PageProps) {
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
