import OrderList from "@/components/OrdersList";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import React, { Suspense } from "react";
import { CartItemSkeleton } from "../cart/page";
import { auth } from "@clerk/nextjs/server";
import { getOrders, getSellerName } from "@/lib/actions/actions";
import { serializeOrders } from "@/utils/helpers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | FarmerMart",
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};

export default async function Orders() {
  const { userId }: { userId: string | null } = await auth();
  if (userId === null) {
    return (
      <>
        <div className="flex items-center justify-center flex-1 text-center flex-col ">
          <h1 className="text-[3rem]">Sign in to view your orders!</h1>
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
      </>
    );
  }

  const data: OrderType[] | null = await getOrders(userId as string);
  const newData = data ? serializeOrders(data) : [];
  newData.filter((item): item is OrderType => item !== undefined);
  console.log({newdata:newData})
  const updatedDataPromises = newData.map(async (item) => {
    try {
      const seller_name = await getSellerName(item?.seller_id || "");
      if (!seller_name) {
        return undefined;
      }

      console.log({ Seller_Name: seller_name });

      return {
        ...item,
        seller_id: seller_name,
      };
    } catch (error) {
      console.error(
        error
      );
      return undefined; 
    }
  });
  const updatedData = (await Promise.all(updatedDataPromises)).filter(
    (item): item is OrderType => item !== undefined
  );
  return (
    <>
      <SignedIn>
        <h2 className="text-3xl font-semibold text-center mt-5">Your Orders</h2>
        <div className="flex items-center justify-start flex-1 text-center flex-col space-y-5 my-5">
          <Suspense fallback={<CartItemSkeleton />}>
            <OrderList orders={updatedData} />
          </Suspense>
        </div>
      </SignedIn>
    </>
  );
}
