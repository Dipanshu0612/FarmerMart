"use client";

import { Button } from "./ui/button";
import React, { useState } from "react";

export default function QuantityControl({ Disable }: { Disable?: boolean }) {
  
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={decreaseQuantity}
        className={`h-[1.2rem] bg-transparent text-black cardbutton ${Disable ? "cursor-not-allowed":"curson-pointer"}`}
        disabled={Disable}
        >
        -
      </Button>
      <span className="text-lg font-semibold">{quantity}</span>
      <Button
        onClick={increaseQuantity}
        className={`h-[1.2rem] bg-transparent text-black cardbutton ${Disable ? "cursor-not-allowed":"curson-pointer"}`}
        disabled={Disable}
      >
        +
      </Button>
    </div>
  );
}
