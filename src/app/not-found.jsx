export default function NotFound() {
    return (
      <div className="min-h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-500">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700 dark:text-white">404</h1>
          <p className="text-lg text-gray-600 dark:text-white mt-2">Oops! The page you're looking for doesn't exist.</p>
          <a
            href="/"
            className="mt-4 inline-block bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }
  