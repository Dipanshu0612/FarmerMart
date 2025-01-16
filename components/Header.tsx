"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex justify-around items-center p-5 shadow-md rounded-b-3xl h-[5rem] sticky top-0 w-full z-50 bg-[rgba(255,244,228,1)]">
        <div className="flex cursor-pointer uppercase font-bold">
          FarmerMart
        </div>
        <nav className="flex list-none justify-around items-center space-x-5 h-[inherit]">
          <li className="h-full items-center">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-gray-400 border-black border-b-2 h-full flex items-center"
                  : "h-full flex items-center"
              }
            >
              Home
            </Link>
          </li>
          <li className="h-full items-center">
            <Link
              href="/about"
              className={
                pathname === "/about"
                  ? "text-gray-400 border-black border-b-2 h-full flex items-center"
                  : "h-full flex items-center"
              }
            >
              About
            </Link>
          </li>
          <li className="h-full items-center">
            <Link
              href="/products"
              className={
                pathname === "/products"
                  ? "text-gray-400 border-black border-b-2 h-full flex items-center"
                  : "h-full flex items-center"
              }
            >
              Products
            </Link>
          </li>
          <li className="h-full items-center">
            <Link
              href="/cart"
              className={
                pathname === "/cart"
                  ? "text-gray-400 border-black border-b-2 h-full flex items-center"
                  : "h-full flex items-center"
              }
            >
              <Image
                src="./cart.svg"
                alt="cart"
                width={25}
                height={20}
                className="cursor-pointer"
              />
            </Link>
          </li>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        </nav>
      </div>
    </>
  );
};

export default Header;
