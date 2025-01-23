import QuantityControl from "@/components/QuantityButton";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/actions/actions";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Rating } from "@mui/material";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Cart() {
  const products_data = await getProducts();
  return (
    <>
      <SignedIn>
        <div className="flex items-center justify-center flex-1 text-center flex-col">
          <h2 className="text-3xl font-semibold">Your Cart</h2>
          <div className="flex items-center justify-around border border-black w-[70%] p-5 bg-white rounded-3xl">
            <div className="flex items-center gap-3">
              <Image
                src={products_data[0].media[0]}
                alt="Product"
                width={250}
                height={200}
                className="!object-cover !h-[130px] !w-[200px] shadow-lg"
              />
              <div className="flex flex-col gap-1 text-left">
                <h2>{products_data[0].title}</h2>
                <p>{products_data[0].description}</p>
                <p>Sold By: {products_data[0].sold_by}</p>
                <p>{products_data[0].location}</p>
                <p>
                  {products_data[0].rating}{" "}
                  <Rating
                    name="read-only"
                    value={products_data[0].rating}
                    precision={0.5}
                    readOnly
                    className="text-[1.3rem]"
                  />
                </p>
              </div>
            </div>
            <div>
              <QuantityControl />
            </div>
            <div>
              <p>Rs. { products_data[0].selling_price.toFixed(2)}</p>
            </div>
            <div>
              <Button className="bg-red-500 hover:bg-red-600"><Trash /></Button>
            </div>
          </div>
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
