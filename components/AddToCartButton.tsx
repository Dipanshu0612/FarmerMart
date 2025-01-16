"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function AddToCartButton() {
  const addToCart = () => {
    toast.success("Item added to cart!");
  };

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="cardbutton mb-2 mx-2 bg-transparent text-black">Add to Cart</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Button className="cardbutton mb-2 mx-2 bg-transparent text-black" onClick={addToCart}>
          Add to Cart
        </Button>
      </SignedIn>
    </>
  );
}
