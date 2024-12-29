"use client"; 

export default function Error({ error, reset }) { 
  return (
    <div className="min-h-96 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-500">
      <h1 className="text-4xl font-bold text-red-600 dark:text-red-600">Something went wrong!</h1>
      <p className="text-lg text-gray-600 dark:text-white mt-4">
        An unexpected error has occurred. Please try refreshing the page.
      </p>
      <div className="mt-6 flex">
        <button
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg me-10"
          onClick={() => reset()}
        >
          Try Again
        </button>
        <a
          href="/"
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
