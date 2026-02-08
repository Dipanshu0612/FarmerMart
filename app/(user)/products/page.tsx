import Cards, { CardsSkeleton } from "@/components/Cards";
import React, { Suspense } from "react";
import { getProducts } from "@/lib/actions/actions";
import { Metadata } from "next";
import { serializeProducts } from "@/utils/helpers";
import ProductsFilterPanel from "@/components/ProductsFilterPanel";

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
    <div className="flex flex-col lg:flex-row justify-center flex-1 text-center min-h-[70vh]">
      <ProductsFilterPanel />
      <section className="w-full lg:w-3/4 xl:w-5/6 flex-grow flex items-start justify-center flex-col p-4 md:p-8 h-full">
        <div className="flex items-center justify-center gap-6 md:gap-9 flex-wrap w-full">
          <Suspense fallback={<CardsSkeleton />}>
            <ProductList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
