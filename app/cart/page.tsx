import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
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
        <div className="flex items-center justify-center flex-1 text-center flex-col">
          Sign In to continue!
          <div className="mt-5 cursor-pointer">
            <SignInButton mode="modal">
              <span className="bg-blue-500 text-white rounded-md p-3">
                Sign In
              </span>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
