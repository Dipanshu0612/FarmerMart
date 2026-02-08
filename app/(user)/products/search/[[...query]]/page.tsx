/* eslint-disable @typescript-eslint/no-explicit-any */
import Cards from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { getProductsByQuery } from "@/lib/actions/actions";
import { serializeProducts } from "@/utils/helpers";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import SearchResultsFilterPanel from "@/components/SearchResultsFilterPanel";

export const metadata: Metadata = {
  title: "Products | FarmerMart",
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};

export default async function SearchQuery({ params, searchParams }: any) {
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
    <div className="flex flex-col lg:flex-row justify-center flex-1 text-center min-h-[70vh]">
      <SearchResultsFilterPanel />
      <section className="w-full lg:w-3/4 xl:w-5/6 flex items-center justify-start flex-col p-4 md:p-8 h-auto">
        {newData.length === 0 ? (
          <div className="flex items-center justify-center w-full h-auto flex-col space-y-5 py-10">
            <h1 className="font-bold text-3xl md:text-4xl">
              No Results found!
            </h1>
            <Button className="mybutton" asChild>
              <Link href="/products">Back to All Products</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-9 flex-wrap w-full">
            <Cards products={newData} />
          </div>
        )}
      </section>
    </div>
  );
}
