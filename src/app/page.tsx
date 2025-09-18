import Link from "next/link";

export default function Home() {
  const links = [
    { href: "/SSG", title: "Static (SSG)", description: "Pre-rendered at build time. Fast and SEO-friendly." },
    { href: "/SSR", title: "Server-Side (SSR)", description: "Rendered on the server for every request." },
    { href: "/CSR", title: "Client-Side (CSR)", description: "Rendered in the browser with JavaScript." },
    { href: "/examples/generate-static-params/1", title: "generateStaticParams", description: "App Router: Pre-builds dynamic pages." },
    { href: "/examples/static-page", title: "getStaticProps", description: "Pages Router: Fetches data at build time." },
    { href: "/examples/static-paths/1", title: "getStaticPaths", description: "Pages Router: Defines dynamic paths to pre-render." },
    { href: "/examples/server-side-rendering/1", title: "getServerSideProps", description: "Pages Router: Fetches data on every request." },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Next.js Rendering Examples</h1>
        <p className="text-lg text-gray-400">
          Explore different rendering strategies in Next.js.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-light dark:hover:border-neutral-800 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 h-full">
              <h2 className="mb-3 text-2xl font-semibold">
                {link.title}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
