import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Wishlist() {
  return (
    <>
      <SignedIn>
        <div className="flex items-center justify-center flex-1 text-center">
          Wishlist Page
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center flex-1 text-center flex-col ">
          <h1 className="text-[3rem]">Sign in to access your wishlist!</h1>
          <div className="mt-5 cursor-pointer flex flex-col space-y-4">
            <Link href="/sign-in">
              <span className="bg-blue-500 text-white rounded-md px-4 py-2 text-xl">
                Sign In
              </span>
            </Link>

            <Link href="/sign-up">
              New User?{" "}
              <span className=" text-blue-400 hover:underline hover:text-blue-600">
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
