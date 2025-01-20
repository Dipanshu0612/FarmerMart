"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function AddToCartButton({ Width, Disable }: { Width?:string, Disable?: boolean }) {
  const addToCart = () => {
    toast.success("Item added to cart!");
  };
  const GivenWidth = Width || "";

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            className="cardbutton mb-2 mx-2 bg-transparent text-black"
            disabled={Disable}
          >
            Add to Cart
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Button
          className={`cardbutton mb-2 mx-2 bg-transparent text-black ${GivenWidth} ${
            Disable ? "cursor-not-allowed" : "curson-pointer"
          } `}
          disabled={Disable}
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </SignedIn>
    </>
  );
}
