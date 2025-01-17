import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";

export default function Cart() {
  return (
    <>
      <SignedIn>
        <div className="flex items-center justify-center flex-1 text-center">
          Cart Page
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center flex-1 text-center flex-col ">
          <h1 className="text-[3rem]">Sign in to access your cart!</h1>
          <div className="mt-5 cursor-pointer flex flex-col space-y-4">
            <SignInButton mode="modal">
              <span className="bg-blue-500 text-white rounded-md p-3 text-xl">
                Sign In
              </span>
            </SignInButton>

            <SignUpButton mode="modal">
              <p>
                New User?{" " }
                <span className=" text-blue-400 hover:underline hover:text-blue-600">Sign Up</span>
              </p>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
