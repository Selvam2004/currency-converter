import Image from "next/image";
import homeImage from "@/assets/home.jpg";
import Link from "next/link";

function HomePage() {

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center">

      <Image src={homeImage} fill alt="background" />

      <div className="absolute bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50">

        <div className="text-center p-8 rounded-lg shadow-lg">

          <h1 className="text-4xl font-bold text-white mb-4 dark:text-gray-900">
            Welcome to Currency Converter
          </h1>

          <p className="text-lg text-gray-300 mb-6 dark:text-gray-900">
            Convert currencies with live exchange rates in just a click.
          </p>

          <Link href="/converter">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg dark:text-black font-semibold hover:bg-blue-700 "
            >
              Get Started
            </button>
          </Link>

        </div>

      </div>
      
    </div>
  );
}

export default HomePage;
