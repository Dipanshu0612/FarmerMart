"use client";

import React, { useState } from "react";
import MuiSlider from "@mui/material/Slider";
import { useRouter } from "next/navigation";

export default function CustomSlider() {
  const router = useRouter();
  const [value, setValue] = useState<number[]>([0, 1000]);
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10000,
      label: "10000",
    },
  ];
  const handleChange = (event: Event, newValue: number | number[]) => {
    const newRange = newValue as number[];
    setValue(newRange);
    router.push(
      `/products/search/min=${newRange[0]}&max=${newRange[1]}`
    );
  };
  return (
    <>
      <MuiSlider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        className="!w-[80%] self-start ml-2"
        max={10000}
        marks={marks}
      />
    </>
  );
}
