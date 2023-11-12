'use client';
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import Image from "next/image"
import trophy from '@/public/images/trophy_no_bg.png'
import styles from './NavBar.module.css'

import React from 'react'

const NavBar = () => {
    const { status, data} = useSession();
    const pathname = usePathname();

    const classes: {[key: string]: string} = {};

    ["register", "users", "upload", "admin", "testingLazyLoad"].forEach((url) => {
        classes[url] = pathname.includes(url) ? "font-bold" : "" // classnames({'font-bold': currentUrl.includes(url)});
    });

    return (
        <nav className={`bg-gray-800 ${styles.navBar}`}>
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className={`sm:hidden`} id={styles.menuToggle}>
                <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <div id={styles.menu} className="bg-gray-800">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                        </div>
                    </div>
           </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start w-full absolute sm:relative">
              <div className="flex flex-shrink-0 items-center">
                <Image className="h-8 w-auto" src={trophy} alt="Your Company" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button> */}
      
              {/* Profile dropdown */}
              {/* <div className="relative ml-3">
                <div>
                  <div className="relative flex rounded-full bg-gray-800 cursor-pointer" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <div className="flex flex-col justify-center items-center">
                        <Image className="h-8 w-8 rounded-full mb-1" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={100} height={100} />
                        <span className="text-xs font-bold text-yellow-300">Exercise Guru</span>
                    </div>
                    
                  </div>
                </div>
                <div className="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        
      </nav>
    )
}

export default NavBar