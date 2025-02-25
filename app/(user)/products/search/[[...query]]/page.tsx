/* eslint-disable @typescript-eslint/no-explicit-any */
import Cards from "@/components/Cards";
import {CategoryFilter,CustomSlider,SearchField, SearchFieldForLocation} from "@/components/Filters";
import { Button } from "@/components/ui/button";
import { getProductsByQuery } from "@/lib/actions/actions";
import { serializeProducts } from "@/utils/helpers";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";


export const metadata: Metadata = {
  title: "Products | FarmerMart",
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};


export default async function SearchQuery({
  params,
  searchParams,
}:any) {
  const { query } = await params;
  const { category, min, max } = await searchParams;

  const data = await getProductsByQuery({
    query,
    minPrice: min ? parseInt(min) : undefined,
    maxPrice: max ? parseInt(max) : undefined,
    category: category ? category : undefined,
  });
  const newData = serializeProducts(data);

  return (
    <>
      <div className="flex justify-center flex-1 text-center">
        <div className="w-1/6 flex flex-col items-center justify-start p-5 space-y-5 border-blue-50 border-r-2 h-auto flex-grow">
          <SearchField />
          <div className="w-full flex items-center justify-center text-left flex-col my-2 space-y-2">
            <h3 className="text-left w-full pl-2 font-medium text-2xl">
              Category
            </h3>
            <CategoryFilter />
            <h3 className="text-left w-full pl-2 font-medium text-2xl !mt-10">
              Price Range
            </h3>
            <CustomSlider />
            <div className="!my-10 w-full">
                        <SearchFieldForLocation />
                        </div>
          </div>
        </div>
        <div className="w-5/6 flex items-center justify-start flex-col space-y-20 p-10 h-auto">
          {newData.length === 0 ? (
            <div className="flex items-center justify-center w-full h-auto flex-col space-y-5">
              <h1 className="font-bold text-4xl">No Results found!</h1>
              <Button className="mybutton">
                <Link href="/products">Back to All Products</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-start gap-9 flex-wrap w-full">
              <Cards products={newData} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}