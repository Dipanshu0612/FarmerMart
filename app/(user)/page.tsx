import { Button } from "@/components/ui/button";
import Image from "next/image";
import Cards, { CardsSkeleton } from "@/components/Cards";
import Link from "next/link";
import { getProducts } from "@/lib/actions/actions";
import { serializeProducts } from "../../utils/helpers";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FarmerMart - Farm to Table, Naturally",
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};

const ProductList = async () => {
  const products_data = await getProducts();
  let top_products = products_data
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 4);
  top_products = serializeProducts(top_products);
  return <Cards products={top_products} />;
};

export default async function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 p-4 md:p-6 my-2 gap-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full h-full gap-8 my-6 md:my-10">
          <div className="flex items-center justify-center w-full lg:w-1/2 h-full flex-col p-2 md:p-6 lg:p-10 gap-2">
            <h1 className="text-blue-950 text-4xl md:text-5xl lg:text-6xl w-full font-semibold tracking-wide text-center lg:text-left">
              Welcome to the FarmerMart
            </h1>
            <h4 className="text-2xl md:text-3xl font-semibold w-full text-center lg:text-left">
              Farm To Table, Naturally!
            </h4>
            <p className="text-base md:text-xl mt-4 md:mt-5 text-center lg:text-left">
              Discover fresh, farm-to-table goodness with FarmerMart. Connect
              directly with local farmers to shop for high-quality, sustainable
              produce and goods. Support local agriculture, enjoy the best of
              nature&apos;s harvest, and experience the true taste of farm-fresh
              products!
            </p>
            <div className="flex flex-col sm:flex-row self-center lg:self-start gap-3 md:gap-5 w-full sm:w-auto">
              <Button className="mybutton self-start w-full sm:w-auto" asChild>
                <Link href="/about">About Us</Link>
              </Button>
              <Button className="mybutton self-start w-full sm:w-auto" asChild>
                <Link href="/products">Shop Now!</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full lg:w-1/2 h-full">
            <Image
              src="/Home.svg"
              alt="Home"
              width={800}
              height={500}
              className="rounded-3xl w-full h-auto max-w-[800px]"
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full flex-col gap-6 mt-10">
          <h2 className="font-semibold text-3xl md:text-4xl my-5 text-blue-950 text-center">
            Top Products Sold
          </h2>
          <div className="flex items-center justify-center w-full h-full flex-wrap gap-6">
            <Suspense fallback={<CardsSkeleton />}>
              <ProductList />
            </Suspense>
          </div>
          <Button className="mybutton" asChild>
            <Link href="/products">Shop More!</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
