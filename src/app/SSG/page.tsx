import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Runs at build time (static generation)
export const revalidate = 60; // ISR: Revalidate every 60s

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

export default async function SSGPostsPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>📦 Static Posts (SSG + ISR)</h1>
      <ul>
        {posts.slice(0, 10).map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
