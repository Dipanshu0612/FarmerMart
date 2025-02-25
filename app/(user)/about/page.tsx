import { MyCarousel } from "@/components/MyCarousel";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "About D's FarmerMart",
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};


export default function About() {
  return (
    <>
      <div className="flex items-center justify-center space-y-10 flex-1">
        <div className="flex items-center justify-center flex-1 text-center flex-col w-[50%] mt-5">
          <MyCarousel />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 text-left w-[50%] p-5 space-y-20 tracking-wider">
          <div>
            <h1 className="text-[4rem] font-semibold text-left">
              About FarmerMart!
            </h1>
            <p className="mt-5 text-lg">
              Welcome to FarmerMart, your trusted online marketplace dedicated
              to connecting farmers with consumers. We are committed to
              providing fresh, high-quality produce directly from the farm to
              your table. Our mission is to empower farmers, support local
              agriculture, and help consumers access healthier,
              sustainably-grown food.
            </p>
          </div>

          <div className="mt-8 mx-auto">
            <h2 className="text-[3.5rem] font-semibold">Our Mission</h2>
            <p className="mt-4">
              At FarmerMart, we believe in the power of community and
              sustainability. Our platform is designed to bridge the gap between
              local farmers and consumers, ensuring fair prices and better
              access to fresh produce. We aim to make it easier for farmers to
              reach their customers and for families to enjoy healthier meals.
            </p>
          </div>

          <Button className="mybutton self-start">
            <Link href="/products">Shop More!</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
