export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">
          🌍 Loading Server-Side Posts...
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Please wait while we fetch the latest posts from the server.
        </p>
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg animate-pulse"
            >
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
