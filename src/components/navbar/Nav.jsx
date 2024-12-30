"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import logo from '@/assets/logo.png'
function Nav() {
  const path = usePathname();
  const [theme, setTheme] = useState('light');

  const navLink = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "Converter",
      href: "/converter"
    },
    {
      name: "Currency",
      href: "/currency"
    },
    {
      name: "History",
      href: "/history"
    },
    {
      name: "About",
      href: "/about"
    }
  ]

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const handleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <>

      <nav className="bg-white dark:bg-black dark:text-white shadow-md mb-2">

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <div className='flex'>
            <img src={logo.src} className="h-8 me-3" />
            <span className="text-2xl font-semibold">Currency Converter</span>
          </div>


          <div>

            <ul className=' flex flex-row font-bold w-25 me-2'>
              {navLink.map((link, i) => {
                const isActive = path === link.href;
                return (
                  <li key={i}>
                    <Link className={`ms-1 ps-4 hover:text-blue-700 pe-5 p-3   hover:bg-gray-100 ${isActive ? "text-blue-700" : ""}`} href={link.href}>{link.name}</Link>
                  </li>
                )
              })}
              <li className='ms-16'>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" onChange={handleTheme} value="" checked={theme == 'dark'} className="invisible peer" />
                  <div className="relative w-11 h-6 bg-gray-200  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-bold text-gray-900 dark:text-gray-300">Change Theme</span>
                </label>
              </li>
            </ul>

          </div>


        </div>
      </nav>
    </>
  )
}

export default Nav