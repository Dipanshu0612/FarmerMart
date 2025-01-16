"use client";

import { Button } from "./ui/button";
import React, { useState } from "react";

export default function QuantityControl() {
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
        className="h-[1.2rem] bg-transparent text-black cardbutton"
      >
        -
      </Button>
      <span className="text-lg font-semibold">{quantity}</span>
      <Button
        onClick={increaseQuantity}
        className="h-[1.2rem] bg-transparent text-black cardbutton"
      >
        +
      </Button>
    </div>
  );
}
