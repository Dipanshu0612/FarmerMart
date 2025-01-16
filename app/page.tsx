import { Button } from "@/components/ui/button";
import Image from "next/image";
import "./globals.css";
import Cards from "@/components/Cards";
import topProducts from "./utils/Top_Products";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 p-4 my-8 gap-6">
        <div className="flex items-center justify-center w-full h-full gap-5 my-10">
          <div className="flex items-center italic justify-center w-[50%] h-full flex-col p-2 gap-2">
            <h1 className="text-[4rem] text-left w-full">
              Welcome to the FarmerMart
            </h1>
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
            <Image src="/Home.png" alt="Home" width={800} height={500} />
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full flex-col gap-6 mt-10">
          <h2 className="font-semibold text-4xl my-5">Top Products Sold</h2>
          <div className="flex items-center justify-evenly w-full h-full flex-wrap ">
            <Cards products={topProducts} />
          </div>
          <Button className="mybutton">
            <Link href="/products">Shop More!</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
