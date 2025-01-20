"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function AddToWishListButton({ Width }: { Width?: string }) {
  const addToCart = () => {
    toast.success("Item added to wishlist!");
  };
  const GivenWidth = Width || "";

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="cardbutton mb-2 mx-2 bg-transparent text-black">
            Add to Wishlist
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Button
          className={`cardbutton mb-2 mx-2 bg-transparent text-black ${GivenWidth}`}
          onClick={addToCart}
        >
          Add to Wishlist
        </Button>
      </SignedIn>
    </>
  );
}
