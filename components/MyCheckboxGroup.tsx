"use client";

import React from "react";
import { Checkbox } from "./ui/checkbox";

export default function MyCheckboxGroup() {
  const items = [
    { label: "Fruits", value: "fruits" },
    { label: "Vegetables", value: "vegetables" },
    { label: "Cereals", value: "cereals" },
    { label: "Dairy", value: "dairy" },
    { label: "Meat", value: "meat" },
    { label: "Fish", value: "fish" },
  ];

  return (
    <div className="w-full pl-2 space-y-5">
      {" "}
      {items.map((item, index) => (
        <div key={index} className="flex space-x-2 my-2 text-left">
          <Checkbox id={item.value} />
          <label
            htmlFor={item.value}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}
