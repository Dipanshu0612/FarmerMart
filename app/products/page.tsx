import Cards, { CardsSkeleton } from "@/components/Cards";
import React, { Suspense } from "react";
import {
  CategoryFilter,
  CustomSlider,
  SearchField,
  SearchFieldForLocation,
} from "@/components/Filters";
import { getProducts } from "@/lib/actions/actions";
import { Metadata } from "next";
import { serializeProducts } from "../../utils/helpers";

export const metadata: Metadata = {
  title: "Products | FarmerMart",
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};

async function ProductList() {
  const data = await getProducts();
  const newData = serializeProducts(data);

  return <Cards products={newData} />;
}

export default async function Products() {
  return (
    <>
      <div className="flex justify-center flex-1 text-center">
        <div className="w-1/6 flex flex-col items-center justify-start p-5 space-y-5 border-blue-50 border-r-2 h-auto">
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
        <div className="w-5/6 flex-grow flex items-center justify-center flex-col space-y-20 p-10 h-full">
          <div className="flex items-center justify-center gap-9 flex-wrap w-full">
            <Suspense fallback={<CardsSkeleton />}>
              <ProductList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
