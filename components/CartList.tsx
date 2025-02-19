"use client";

import { serializeProducts } from "@/utils/helpers";
import useCart from "@/lib/store/store";
import { Rating } from "@mui/material";
import Image from "next/image";
import { QuantityControl } from "./Cards";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Suspense } from "react";
import { CartItemSkeleton } from "@/app/(user)/cart/page";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  : Promise.reject(new Error("Stripe public key is not defined"));

export default function CartList() {
  const cart = useCart();
  const { cartItems } = cart;
  let products_data = serializeProducts(cartItems.map((item) => item.item));
  products_data = products_data.map((product) => {
    return {
      ...product,
      quantity: cartItems.find((item) => item.item._id === product._id)
        ?.quantity,
    };
  });
  const total_price = products_data.reduce(
    (acc, product) =>
      acc +
      product.selling_price *
        (cartItems.find((item) => item.item._id === product._id)?.quantity ||
          1),
    0
  );

  if (products_data.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col space-y-5">
        <p className="text-3xl">No items in your cart</p>
        <Button className="mybutton">
          <Link href="/products">Shop Now!</Link>
        </Button>
      </div>
    );
  }
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products_data }),
      });

      if (!response.ok) {
        throw new Error(`Payment failed: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <Suspense fallback={<CartItemSkeleton />}>
        {products_data.map((product) => {
          return (
            <div
              className="flex items-center justify-around w-[70%] p-5 bg-white rounded-3xl"
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

              <div className="flex items-center gap-5 w-[50%] justify-around">
                <div>
                  <QuantityControl Product={product} />
                </div>
                <div>
                  <p>
                    Rs.{" "}
                    {(
                      product.selling_price *
                      (cartItems.find((item) => item.item._id === product._id)
                        ?.quantity || 1)
                    ).toFixed(2)}
                  </p>
                </div>
                <div>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => cart.removeItem(product._id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col items-center justify-around w-[70%] p-5 bg-white rounded-xl space-y-10 !mb-10">
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex flex-col gap-5 w-[50%] p-4 border rounded">
              <div className="flex items-center justify-between">
                <h2>Discount</h2>
                <p>
                  Rs. <span className="font-bold">0.0</span>/-
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2>Delivery Charges</h2>
                <p>
                  Rs. <span className="font-bold">50.00</span>/-
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 w-[50%] p-4 border rounded">
              <div className="flex items-center justify-between">
                <h2>Subtotal</h2>
                <p>
                  Rs.{" "}
                  <span className="font-bold">{total_price.toFixed(2)}</span>
                  /-
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Total</h2>
                <p>
                  Rs.{" "}
                  <span className="font-bold">
                    {(total_price + 50).toFixed(2)}
                  </span>
                  /-
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center gap-3 flex-col">
            <p className="self-start">
              If you have a promo code, please enter it here.
            </p>
            <div className="flex items-center justify-between w-full gap-3">
              <Input type="text" placeholder="Enter promo code..." />
              <Button
                className="bg-blue-500 hover:bg-blue-600 w-[50%]"
                onClick={() => alert("Not functional yet!")}
              >
                Apply Discount
              </Button>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-3">
            <Button className="w-[50%]">
              <Link href="/products">Back to Shop</Link>
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 w-[50%]"
              onClick={() => handleCheckout()}
            >
              Proceed to Checkout
            </Button>
          </div>
          <Button
            className="bg-red-500 hover:bg-red-700 w-full"
            onClick={() => cart.clearCart}
          >
            Clear Cart
          </Button>
        </div>
      </Suspense>
    </>
  );
}
