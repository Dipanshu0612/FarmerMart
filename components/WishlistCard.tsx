"use client";

import { Rating } from "@mui/material";
import { Trash } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WishlistCard({
  wishlist,
}: {
  wishlist: ProductType[];
}) {
  const router = useRouter();

  const removeFromWishlist = async (product_id: string) => {
    try {
      const response = await fetch(
        `/api/users/wishlist?productId=${product_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
        return;
      }
      router.refresh();
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
      console.error(error);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col space-y-5">
        <p className="text-3xl">No items in your wishlist!</p>
        <Button className="mybutton">
          <Link href="/products">Shop Now!</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {wishlist.map((product) => (
        <div
          className="flex items-center justify-between w-[50%] p-5 bg-white rounded-3xl"
          key={product._id}
        >
          <div className="flex items-center gap-5 w-[50%]">
            <Image
              src={product.media ? product.media[0] : '/placeholder-image.png'}
              alt="Product"
              width={200}
              height={0}
              className="!object-cover !h-[130px] !w-[200px] shadow-lg"
              loading="lazy"
            />
            <Link href={`/products/${product._id}`}>
              <div className="flex flex-col gap-1 text-left">
                <h2 className="font-bold">{product.title}</h2>
                <p className="text-sm">{product.description}</p>
                <p>Sold By: {product.sold_by}</p>
                <p>{product.location}</p>
                <p className="flex items-center gap-1">
                  <span className="mt-1">{product.rating} </span>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.5}
                    readOnly
                    className="text-[1.3rem]"
                  />
                </p>
              </div>
            </Link>
          </div>
          <div>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => product._id && removeFromWishlist(product._id)}
            >
              <Trash /> Remove From Wishlist
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
