import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"
import CartList from "@/components/CartList";

export default async function Cart() {
  return (
    <>
      <SignedIn>
        <h2 className="text-3xl font-semibold text-center mt-5">Your Cart</h2>
        <div className="flex items-center justify-center flex-1 text-center flex-col space-y-5 mt-5">
            <CartList />
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center flex-1 text-center flex-col ">
          <h1 className="text-[3rem]">Sign in to access your cart!</h1>
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

export function CartItemSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center justify-around w-[70%] p-5 bg-white rounded-3xl">
          <div className="flex items-center gap-3">
            <Skeleton className="h-[130px] w-[200px] rounded-lg" />
            <div className="flex flex-col gap-2 text-left">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
          <div>
            <Skeleton className="h-10 w-24" />
          </div>
          <div>
            <Skeleton className="h-6 w-20" />
          </div>
          <div>
            <Button variant="outline" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}