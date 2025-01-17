import AddToCartButton from "@/components/AddToCartButton";
import QuantityControl from "@/components/QuantityButton";
import { Rating } from "@mui/material";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import Link from "next/link";
import React from "react";
// import topProducts from "@/app/utils/Top_Products";
export const metadata: Metadata = {
  title: `Product ID:  | D's FarmerMart`,
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};




export default function Product({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <div className="flex items-center justify-center space-y-10 flex-1">
        <div className="flex items-center justify-center flex-1 text-center flex-col w-[50%] mt-5 space-y-10">
          <Image
            src={`/Home.png`}
            width={800}
            height={700}
            className="object-fill"
            alt="Product_Image"
          />
          <div className="flex items-center justify-center gap-5 cursor-pointer">
            <Image
              src={`/Home.png`}
              width={200}
              height={200}
              className="object-fill hover:scale-110 transition-transform duration-500 ease-in-out"
              alt="Product_Image"
            />
            <Image
              src={`/Home.png`}
              width={200}
              height={200}
              className="object-fill hover:scale-110 transition-transform duration-500 ease-in-out"
              alt="Product_Image"
            />
            <Image
              src={`/Home.png`}
              width={200}
              height={200}
              className="object-fill hover:scale-110 transition-transform duration-500 ease-in-out"
              alt="Product_Image"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 text-left w-[50%] p-10 space-y-20 tracking-wider">
          <div className="flex flex-col items-start justify-center space-y-5 w-full">
            <h1 className="text-[4rem] font-semibold text-left">
              Product ID: {id}
            </h1>
            <p className="mt-5 text-lg">Description</p>
            <div className="flex items-center gap-3">
              <Rating
                name="read-only"
                value={4}
                precision={0.5}
                readOnly
                className="text-[1.5rem]"
              />
              <span className="text-gray-500">10 Reviews</span>
            </div>
            <p className="mt-5 text-lg">Weight: 2kg</p>
            <p className="mt-5 text-lg">Sold By: ABCD</p>
            <p className="mt-5 text-lg">Location: Vesu, Surat, Gujarat</p>
            <p className="mt-5 text-lg">
              Availability: <span className="text-green-500">In Stock</span>
            </p>
            <div className="flex items-center justify-center gap-3">
              Quantity: <QuantityControl />
            </div>
            <p className="mt-5 text-2xl">
              Price: <del className="text-lg">Rs. 149</del>{" "}
              <span className="font-semibold">Rs. 109/-</span>
            </p>
          </div>

          <AddToCartButton Width="w-full" />
        </div>
      </div>
      <div className="flex items-center justify-center space-y-5 flex-1 flex-col my-10">
        <h2 className="text-3xl">Product Reviews</h2>
        <div className="w-full flex items-center justify-center gap-5 p-10 flex-col">
          {/* Review Box to be multiplied */}
          <div className="flex items-center justify-between border border-black w-[50%] p-5 bg-[#f2fbfc] space-y-2 rounded-3xl">
            <div className="flex flex-col">
              <h2 className="text-left w-full">User Name</h2>
              <h3 className="text-left w-full">User Email</h3>
              <p className="text-left w-full">Date Bought</p>
              <details>
                <summary className="cursor-pointer">Product Review</summary>
                <p>Review</p>
              </details>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h3 className="text-3xl">4.2</h3>
              <Rating
                name="read-only"
                value={4.2}
                precision={0.5}
                readOnly
                className="text-[1rem]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border border-black w-[50%] p-5 bg-[#f2fbfc] space-y-2 rounded-3xl">
            <div className="flex flex-col">
              <h2 className="text-left w-full">User Name</h2>
              <h3 className="text-left w-full">User Email</h3>
              <p className="text-left w-full">Date Bought</p>
              <details>
                <summary className="cursor-pointer">Product Review</summary>
                <p>Review</p>
              </details>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h3 className="text-3xl">3.7</h3>
              <Rating
                name="read-only"
                value={3.7}
                precision={0.5}
                readOnly
                className="text-[1rem]"
              />
            </div>
          </div>
        </div>
        <Button className="mybutton">
          Load More!
        </Button>

      </div>
    </>
  );
}
