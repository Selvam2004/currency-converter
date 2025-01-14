import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navbar/Nav";
import { ThemeProvider } from "@/utils/themeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); 

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Currency Converter",
  icons: "/logo.png"
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <ThemeProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-300 dark:bg-gray-500 h-screen`} 
      >
        <Nav/>
        <div className="ms-16 me-16 mt-5 h-96 ">
        {children}
        </div>        
      </body>
      </ThemeProvider>
    </html>
  );
}
