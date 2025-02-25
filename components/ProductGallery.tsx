"use client";

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productImages }: { productImages: string[] }) => {
  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <div className="flex items-center justify-center flex-1 text-center flex-col w-[50%] mt-5 space-y-10">
      <Image
        src={mainImage}
        width={800}
        height={0}
        className="!object-cover !h-[500px] shadow-lg"
        alt="Product_Image"
      />
      <div className="flex items-center justify-center gap-5 cursor-pointer">
        {productImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={0}
            width={200}
            alt="product"
            className={`className="!object-cover hover:scale-110 transition-transform duration-500 ease-in-out !h-[120px] !w-[200px] shadow-lg" ${
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
