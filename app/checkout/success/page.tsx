"use client";

import { useEffect } from "react";
import useCart from "@/lib/store/store";
import { serializeProducts } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

export default function Success() {
  const cart = useCart();
  const { cartItems } = cart;
  

  useEffect(() => {
    const submitOrder = async () => {
      try {
        if (cartItems.length === 0) return;

        let products_data = serializeProducts(
          cartItems.map((item) => item.item)
        );
        products_data = products_data.map((product) => {
          return {
            ...product,
            quantity: cartItems.find((item) => item.item._id === product._id)
              ?.quantity,
          };
        });

        const orders = products_data.map((item) => {
          return {
            _id: item._id,
            title: item.title,
            description: item.description,
            selling_price: item.selling_price,
            quantity: item.quantity,
            sold_by: item.sold_by,
            media: item.media,
            location:item.location,
            ordered_at: new Date()
          };
        });
        const res = await fetch("/api/users/orders-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orders),
        });

        if (!res.ok) {
          throw new Error(`Failed to add order: ${res.statusText}`);
        }

        if (res.status === 200) {
          cart.clearCart();
        }
      } catch (error) {
        console.error("Error submitting order:", error);
      }
    };

    submitOrder();
  }, [cart,cartItems]);

  return (
    <div className="flex items-center justify-center flex-1 text-center flex-col">
      <Image
        src="/Success.svg"
        alt="Success Gif"
        width={500}
        height={300}
        priority
      />
      <h1 className="text-[3rem]">Your order has been placed successfully!</h1>
      <div className="mt-5 cursor-pointer flex flex-col space-y-4">
        <Link href="/products">
          <span className="mybutton !px-4 !py-3 rounded-md border-white">
            Shop More!
          </span>
        </Link>
      </div>
    </div>
  );
}
