import AddToCartButton from "@/components/AddToCartButton";
import QuantityControl from "@/components/QuantityButton";
import { Rating } from "@mui/material";
// import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import React from "react";
import { getProductByID } from "@/lib/actions/actions";
import Gallery from "@/components/ProductGallery";
import AddToWishListButton from "@/components/AddToWishListButton";
import Head from "next/head";

type Props = {
  params: {
    id: string;
  }
}

export default async function Product({ params }: Props) {
  const { id } = params;
  const data: ProductType = await getProductByID(id);
  return (
    <>
      <Head>
        <title>{data.title} - FarmerMart</title>
        <meta name="description" content={data.description} />
      </Head>


      <div className="flex items-center justify-center space-y-10 flex-1">
        <Gallery productImages={data.media} />

        <div className="flex flex-col items-center justify-center flex-1 text-left w-[50%] p-10 space-y-20 tracking-wider">
          <div className="flex flex-col items-start justify-center space-y-5 w-full">
            <h1 className="text-[4rem] font-semibold text-left">
              {data.title}
            </h1>
            <p className="mt-5 text-lg">{data.description}</p>
            <div className="flex items-center gap-3">
              {data.rating}
              <Rating
                name="read-only"
                value={data.rating}
                precision={0.5}
                readOnly
                className="text-[1.5rem]"
              />
              <span className="text-gray-500">
                {Math.ceil(data.original_price / 10)} Reviews
              </span>
            </div>
            <p className="mt-5 text-lg">Weight: {data.weight}kg</p>
            <p className="mt-5 text-lg">Sold By: {data.sold_by}</p>
            <p className="mt-5 text-lg">Location: {data.location}</p>
            <p className="mt-5 text-lg">
              Availability:{" "}
              {data.availability ? (
                <span className="text-green-500">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </p>
            <div className="flex items-center justify-center gap-3">
              Quantity:{" "}
              <QuantityControl Disable={data.availability ? false : true} />
            </div>
            <p className="mt-5 text-2xl">
              Price: <del className="text-lg">Rs. {data.original_price}</del>{" "}
              <span className="font-semibold">Rs. {data.selling_price}/-</span>
            </p>
          </div>

          <div className="w-full">
            <AddToCartButton
              Width="w-full"
              Disable={data.availability ? false : true}
            />
            <AddToWishListButton Width="w-full" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-y-5 flex-1 flex-col my-10">
        <h2 className="text-3xl">Product Reviews</h2>
        <div className="w-full flex items-center justify-center gap-5 p-10 flex-col">
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

        <Button className="mybutton">Load More!</Button>
      </div>
    </>
  );
}
