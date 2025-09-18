import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Force fetch on every request (SSR)
export const dynamic = "force-dynamic";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", 
  });
  return res.json();
}

export default async function SSRPostsPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>🌍 Server-Side Rendered Posts (SSR)</h1>
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
