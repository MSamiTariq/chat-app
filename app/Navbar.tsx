"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/src/firebase";
import { IoMdChatbubbles } from "react-icons/io";

const NavBar = () => {
  return (
    <nav className="border-b px-5 py-3 fixed top-0 bg-white min-w-full">
      <div>
        <div className="flex justify-between">
          <div className="flex align-center gap-8">
            <Link href="/">
              <IoMdChatbubbles size={32} style={{ color: "rgb(147 51 234)" }} />
            </Link>
            <NavLinks />
          </div>
          <AuthStatus />
        </div>
      </div>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Chat", href: "/chat" },
  ];

  return (
    <ul className="flex space-x-6 py-1">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "hover:text-purple-500": true,
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const [user, setUser] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setUser(true);
      // ...
    } else {
      // User is signed out
      setUser(false);
    }
  });
  //   const { status, data: session } = useSession();

  if (user === false)
    return (
      <button className="rounded-md px-4 py-2 bg-purple-600 text-white font-bold shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <Link href="/signup">Signup</Link>
      </button>
    );

  return (
    <button
      className="rounded-md bg-purple-600 px-4 py-2 text-white font-bold shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={() => {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            console.log("Sign out successful");
          })
          .catch((error: any) => {
            // An error happened.
            console.log("Error occured: ", error);
          });
      }}
    >
      <Link href="/">Sign Out</Link>
    </button>
  );

  //   if (status === "unauthenticated")
  //     return (
  //       <Link className="nav-link" href="/api/auth/signin">
  //         Login
  //       </Link>
  //     );

  return (
    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <svg
        className="absolute w-12 h-12 text-gray-400 -left-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default NavBar;
