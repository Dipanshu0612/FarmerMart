"use client";

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productImages }: { productImages: string[] }) => {
  const [mainImage, setMainImage] = useState(productImages[0] || "/Home.svg");

  return (
    <div className="flex items-center justify-center flex-1 text-center flex-col w-full lg:w-1/2 mt-5 space-y-6">
      <Image
        src={mainImage}
        width={800}
        height={500}
        className="object-cover h-[260px] sm:h-[360px] md:h-[440px] w-full max-w-[800px] shadow-lg rounded-xl"
        alt="Product_Image"
      />
      <div className="flex items-center justify-center gap-3 md:gap-5 cursor-pointer flex-wrap">
        {productImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={120}
            width={200}
            alt="product"
            className={`object-cover hover:scale-105 transition-transform duration-300 ease-in-out h-[80px] w-[120px] sm:h-[100px] sm:w-[160px] md:h-[120px] md:w-[200px] shadow-lg rounded-md ${
              mainImage === image ? "border-2 border-black opacity-50" : ""
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
