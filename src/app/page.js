"use client"
import Image from "next/image";
import homeImage from "@/assets/home.jpg";
import Link from "next/link";
import { useTheme } from "@/utils/themeProvider";

function HomePage() {
  const {theme}=useTheme();
  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center">

      <Image src={homeImage} fill alt="background" />

      <div className={`${theme=='light'?"bg-black ":"bg-white"} absolute bg-opacity-50`}>

        <div className="text-center p-8 rounded-lg shadow-lg">

          <h1 className={`${theme=='light'?"text-white":"text-gray-900"} text-4xl font-bold  mb-4`}>
            Welcome to Currency Converter
          </h1>

          <p className={`${theme=='light'?" text-gray-300":"text-gray-900"} text-lg mb-6`}>
            Convert currencies with live exchange rates in just a click.
          </p>

          <Link href="/converter">
            <button
              className={`${theme=='light'?"text-white":"text-black"} bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 `}
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
