/* eslint-disable @typescript-eslint/no-explicit-any */
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const revalidate = 120; 

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return posts.slice(0, 10).map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <main>
      <h1>📝 Post {post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </main>
  );
}
