import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Failure() {
  return (
    <div className="flex items-center justify-center flex-1 text-center flex-col">
      <Image src="/Failure.png" alt="Success Gif" width={500} height={300} />
      <h1 className="text-[3rem]">
        Your order could not be placed! Please try later.
      </h1>
      <div className="mt-5 cursor-pointer flex flex-col space-y-4">
        <Link href="/products">
          <span className="mybutton !px-4 !py-3 rounded-md border-white ">
            Shop More!
          </span>
        </Link>
      </div>
    </div>
  );
}
