"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut,  UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  const { user } = useUser();
  const isSeller = user?.unsafeMetadata.role;
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const pathname = usePathname();
  return (
    <>
      <div className="flex justify-around items-center p-5 shadow-md h-[5rem] sticky top-0 w-full header">
        <div className="flex cursor-pointer uppercase font-bold">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="logo"
              width={300}
              height={1}
              className="self-start block right-1 "
            />
          </Link>
        </div>
        <nav className="flex list-none justify-around items-center space-x-5 h-[inherit]">
          <li className="h-full items-center">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-gray-400 border-blue-600 border-b-[3px] h-full flex items-center"
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
                  ? "text-gray-400 border-blue-600 border-b-[3px] h-full flex items-center"
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
                  ? "text-gray-400 border-blue-600 border-b-[3px] h-full flex items-center"
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
                  ? "text-gray-400 border-blue-600 border-b-[3px] h-full flex items-center"
                  : "h-full flex items-center"
              }
            >
              <Image
                src="/cart.svg"
                alt="cart"
                width={25}
                height={20}
                className="cursor-pointer"
              />
            </Link>
          </li>
          <li className="h-full items-center">
            <Link
              href="/orders"
              className={
                pathname === "/orders"
                  ? "text-gray-400 border-blue-600 border-b-[3px] h-full flex items-center"
                  : "h-full flex items-center"
              }
            >
              Orders
            </Link>
          </li>
          <li className="h-full items-center">
            <Link
              href="/wishlist"
              className={
                pathname === "/wishlist"
                  ? "text-gray-400 border-blue-600 border-b-[3px] h-full flex items-center"
                  : "h-full flex items-center"
              }
            >
              Wishlist
            </Link>
          </li>
          {isSeller ==="seller" ?  <li className="h-full items-center">
            <Link
              href="/seller"
              className={
                pathname === "/seller"
                  ? "text-gray-400 border-blue-600 border-b-[3px] h-full flex items-center"
                  : "h-full flex items-center"
              }
            >
              Seller Dashboard
            </Link>
          </li> : ""}

          {domLoaded && (
            <>
              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <li className="h-full items-center">
                  <Link href="/sign-in" className="h-full flex items-center">
                    Sign In
                  </Link>
                </li>
              </SignedOut>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
