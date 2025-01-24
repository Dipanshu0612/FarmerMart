import { Button } from "@/components/ui/button";
import Image from "next/image";
import "./globals.css";
import Cards, { CardsSkeleton } from "@/components/Cards";
import Link from "next/link";
import { getProducts } from "@/lib/actions/actions";
import { serializeProducts } from "./utils/helpers";
import { Suspense } from "react";

const ProductList = async () => {
  const products_data = await getProducts();
  let top_products = products_data
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  top_products = serializeProducts(top_products);
  return <Cards products={top_products} />;
};

export default async function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 p-4 my-2 gap-6">
        <div className="flex items-center justify-center w-full h-full gap-5 my-10">
          <div className="flex items-center justify-center w-[50%] h-full flex-col p-10 gap-2">
            <h1 className="text-blue-950 text-[4rem] w-full font-semibold tracking-wide">
              Welcome to the FarmerMart
            </h1>
            <h4 className="text-[2rem] font-semibold w-full">
              Farm To Table, Naturally!
            </h4>
            <p className="text-[1.5rem] mt-5">
              Discover fresh, farm-to-table goodness with FarmerMart. Connect
              directly with local farmers to shop for high-quality, sustainable
              produce and goods. Support local agriculture, enjoy the best of
              nature&apos;s harvest, and experience the true taste of farm-fresh
              products!
            </p>
            <div className="flex self-start gap-5">
              <Button className="mybutton self-start">
                <Link href="/about">About Us</Link>
              </Button>
              <Button className="mybutton self-start">
                <Link href="/products">Shop Now!</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center w-[50%] h-full">
            <Image
              src="/Home.svg"
              alt="Home"
              width={800}
              height={500}
              className="rounded-3xl"
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full flex-col gap-6 mt-10">
          <h2 className="font-semibold text-4xl my-5 text-blue-950">
            Top Products Sold
          </h2>
          <div className="flex items-center justify-evenly w-full h-full flex-wrap ">
            <Suspense fallback={<CardsSkeleton />}>
              <ProductList />
            </Suspense>
          </div>
          <Button className="mybutton">
            <Link href="/products">Shop More!</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
