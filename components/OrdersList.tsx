"use client";

import { Rating } from "@mui/material";
import { Trash } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

export default function OrderList({
  orders,
}: {
  orders: ProductType[];
}) {

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col space-y-5 flex-1">
        <p className="text-3xl">No Orders to show!</p>
        <Button className="mybutton">
          <Link href="/products">Shop Now!</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {orders.map((product) => (
        <div
          className="flex items-center justify-evenly w-[60%] p-5 bg-white rounded-3xl"
          key={product._id}
        >
          <div className="flex items-center gap-5 w-[50%]">
            <Image
              src={product.media[0]}
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
              onClick={() => toast.warning("Feature not implemented!")}
            >
              <Trash /> Provide a Review
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
