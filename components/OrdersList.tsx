"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import moment from 'moment';

export default function OrderList({ orders }: { orders: OrderItems[] }) {
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
          className="flex items-center justify-between w-[60%] p-5 bg-white rounded-3xl"
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
              </div>
            </Link>
          </div>
          <div className="flex flex-col text-left">
            <p>Quantity: {product.quantity}</p>
            <p>Amount: Rs. {(product.selling_price * product.quantity).toFixed(2)}</p>
            <p>Bought On: {moment(product.ordered_at).format('Do MMMM, YYYY')}</p>
          </div>
          <div>
            <Button
              className="mybutton !m-0"
              onClick={() => toast.warning("Feature not implemented!")}
            >
              {" "}
              Provide a Review
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
