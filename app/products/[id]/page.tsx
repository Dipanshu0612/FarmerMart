import { AddToCartButton } from "@/components/Cards";
import { QuantityControl } from "@/components/Cards";
import { Rating } from "@mui/material";
// import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import React from "react";
import { getProductByID, getReviews } from "@/lib/actions/actions";
import Gallery from "@/components/ProductGallery";
import AddToWishListButton from "@/components/AddToWishListButton";
import Head from "next/head";
import { serializeProduct } from "@/utils/helpers";
import moment from "moment";

export default async function Product({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;
  const data: ProductType = await getProductByID(id);
  const newData = serializeProduct(data);
  const reviews = await getReviews(id);
  return (
    <>
      <Head>
        <title>{newData.title} - FarmerMart</title>
        <meta name="description" content={newData.description} />
      </Head>

      <div className="flex items-center justify-center space-y-10 flex-1">
        <Gallery productImages={newData.media} />

        <div className="flex flex-col items-center justify-center flex-1 text-left w-[50%] p-10 space-y-20 tracking-wider">
          <div className="flex flex-col items-start justify-center space-y-5 w-full">
            <h1 className="text-[4rem] font-semibold text-left">
              {newData.title}
            </h1>
            <p className="mt-5 text-lg">{newData.description}</p>
            <div className="flex items-center gap-3">
              {newData.rating.toFixed(1)}
              <Rating
                name="read-only"
                value={newData.rating}
                precision={0.5}
                readOnly
                className="text-[1.5rem]"
              />
              <span className="text-gray-500">{reviews.length} Reviews</span>
            </div>
            <p className="mt-5 text-lg">Weight: {newData.weight}kg</p>
            <p className="mt-5 text-lg">Sold By: {newData.sold_by}</p>
            <p className="mt-5 text-lg">Location: {newData.location}</p>
            <p className="mt-5 text-lg">
              Availability:{" "}
              {newData.availability ? (
                <span className="text-green-500 font-bold">In Stock</span>
              ) : (
                <span className="text-red-500 font-bold">Out of Stock</span>
              )}
            </p>
            <div className="flex items-center justify-center gap-3">
              Quantity:{" "}
              <QuantityControl
                Disable={newData.availability ? false : true}
                Product={newData}
              />
            </div>
            <p className="mt-5 text-2xl">
              Price: <del className="text-lg">Rs. {newData.original_price}</del>{" "}
              <span className="font-semibold">
                Rs. {newData.selling_price}/-
              </span>
            </p>
          </div>

          <div className="w-full flex flex-col">
            <AddToCartButton
              Width="w-full"
              Disable={newData.availability ? false : true}
              Product={newData}
            />
            <AddToWishListButton Width="w-full" Product={newData} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-y-5 flex-1 flex-col my-10">
        <h2 className="text-3xl">Product Reviews</h2>
        <div className="w-full flex items-center justify-center gap-5 p-10 flex-col">
          {reviews.length === 0 ? (
            <div className="flex items-center justify-center">
              <h1 className="text-3xl">No reviews found for this porduct</h1>
            </div>
          ) : (
            <>
              {reviews.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between border border-black w-[50%] p-5 bg-[#f2fbfc] space-y-2 rounded-3xl"
                  >
                    <div className="flex flex-col">
                      <h2 className="text-left w-full">{item.user}</h2>
                      {/* <h3 className="text-left w-full text-[0.8rem] text-gray-700">{item.user_email}</h3> */}
                      <p className="text-left w-full text-[0.8rem] text-gray-700">
                        Bought On:{" "}
                        {moment(item.data.ordered_at).format("Do MMMM, YYYY")}
                      </p>
                      <details>
                        <summary className="cursor-pointer mt-2">
                          {item.data.title}
                        </summary>
                        <p>{item.data.review}</p>
                      </details>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                      <h3 className="text-3xl">{(item.data.rating).toFixed(1)}</h3>
                      <Rating
                        name="read-only"
                        value={item.data.rating}
                        precision={0.5}
                        readOnly
                        className="text-[1rem]"
                      />
                    </div>
                  </div>
                );
              })}
              <Button className="mybutton">Load More!</Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
