"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export default function AddToWishListButton({
  Width,
  Product,
}: {
  Width?: string;
  Product: ProductType;
}) {
  const addToWishlist = async () => {
    const user = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await fetch("/api/users/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId: Product._id, user }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!data.ok) {
      const result = await data.json();
      toast.error(result.message);
      return;
    }
    const result = await data.json();
    toast.success(result.message);
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
          onClick={addToWishlist}
        >
          Add to Wishlist
        </Button>
      </SignedIn>
    </>
  );
}

export function HeartButton({ Product }: { Product: ProductType }) {

  const addToWishlist = async () => {
    const user = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await fetch("/api/users/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId: Product._id, user }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!data.ok) {
      const result = await data.json();
      toast.error(result.message);
      return;
    }
    const result = await data.json();
    toast.success(result.message);
  };

  const removeFromWishlist = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await fetch(`/api/users/wishlist?productId=${Product._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!data.ok) {
      const result = await data.json();
      toast.error(result.message);
      return;
    }
    const result = await data.json();
    toast.success(result.message);
  };

  const [liked, setLiked] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          if (liked) {
            removeFromWishlist();
          } else {
            addToWishlist();
          }
          setLiked(!liked);
        }}
      >
        <Heart fill={`${liked ? "red" : "white"}`} />
      </button>
    </>
  );
}
