"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import logo from '@/assets/logo.png'
import { useTheme } from '@/utils/themeProvider';
function Nav() {
  const path = usePathname(); 
  const {theme,handleTheme} = useTheme();

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
 
  return (
    <>

      <nav className={`${theme=="light"?"bg-white":"bg-black text-white"} shadow-md mb-2`}>

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
                    <Link className={`ms-1 ps-4 hover:text-blue-700 pe-5 p-3 hover:bg-gray-100 ${isActive ? "text-blue-700" : ""}`} href={link.href}>{link.name}</Link>
                  </li>
                )
              })}

              <li className='ms-16 '>
                <label className="toggle">
                  <input type="checkbox" onChange={handleTheme} checked={theme=='dark'?true:false} className='hidden'/>
                  <span className="slider"></span>  
                </label>
                
              </li>
              <li><span className='ms-3'>{theme=='dark'?'Light':'Dark'}</span></li>
              
            </ul>

          </div>


        </div>
      </nav>
    </>
  )
}

export default Nav