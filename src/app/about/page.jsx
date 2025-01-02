"use client"
import { useTheme } from "@/utils/themeProvider";

function About() { 
  const {theme} = useTheme();
  return (
    <div className="flex flex-col items-center">

      <div className={`${theme=='light'?"bg-white ":"bg-gray-950 text-white"}shadow-lg rounded-lg p-6 w-full mb-14 max-w-4xl`}>

        <h1 className={`${theme=='light'?"text-blue-800":"text-blue-900"} text-4xl font-bold text-center mb-6`}>
          About Our Currency Converter
        </h1>

        <p className={`${theme=='light'?"text-gray-700":"text-white"} text-lg`}>
          Welcome to the <span className="font-bold text-blue-800">Currency Converter</span>, 
          your reliable tool for quick and accurate currency conversion. 
          Whether you're a traveler, businessperson, or just curious about 
          exchange rates, this app is designed to make your life easier.
        </p>

        <div className="mt-6">
          <h2 className={`${theme=='light'?"text-gray-800":"text-white"} text-2xl font-semibold mb-4`}>Features</h2>
          <ul className={`${theme=='light'?"text-gray-700":"text-white"} list-disc list-inside space-y-2`}>
            <li>Real-time exchange rates.</li>
            <li>Supports a wide range of global currencies.</li>
            <li>Simple and intuitive interface for seamless conversions.</li>
            <li>Mobile-friendly design for use on any device.</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h2 className={`${theme=='light'?"text-gray-800":"text-white"} text-2xl font-semibold mb-4`}>How It Works</h2>
          <p className={`${theme=='light'?"text-gray-700":"text-white"}`}>
            Enter the amount you want to convert, select the source and target currencies, 
            and let our tool handle the rest. With real-time updates, you'll always have 
            the most accurate exchange rates at your fingertips.
          </p>
        </div>

        <div className="mt-6 text-center">
           
          <h2 className={`${theme=='light'?"text-gray-800":"text-white"} text-2xl font-semibold mb-4`}>Contact Us</h2>
          <p className={`${theme=='light'?"text-gray-700":"text-white"}`}>
            Have questions or feedback? Feel free to reach out to us at{" "}
            <a href="mailto:selvam@finestcoder.com" className="text-blue-800 underline">
              selvam@finestcoder.com
            </a>.
          </p>

        </div>

      </div>

    </div>
  )
}

export default About