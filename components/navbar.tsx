"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [state, setState] = React.useState(false);

  const { data, status } = useSession();
  console.log(data?.user, status);

  return (
    <nav className="bg-white w-full border-b md:border-0 shadow-lg">
      <div className="items-center max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-3xl font-bold px-3">🛒 Ecommerce</h1>
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:p-3 md:space-x-6 md:space-y-0 p-4">
            {status === "authenticated" ? (
              <>
                <li
                  className="text-gray-600 hover:text-indigo-600 cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Logout
                </li>
                <li className="text-gray-600 hover:text-indigo-600">
                  {data?.user?.role === "admin" ? "Admin" : ""}
                </li>
              </>
            ) : (
              <>
                <Link href="/register">Register</Link>
                <Link href="/login">Login</Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
