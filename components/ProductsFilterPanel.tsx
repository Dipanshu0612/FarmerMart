"use client";

import { useState } from "react";
import {
  CategoryFilter,
  CustomSlider,
  SearchField,
  SearchFieldForLocation,
} from "@/components/Filters";
import { Button } from "@/components/ui/button";

export default function ProductsFilterPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-full lg:w-1/4 xl:w-1/6 lg:border-r-2 border-blue-50 lg:sticky lg:top-[5.2rem] lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <div className="lg:hidden p-4 pb-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} lg:block p-4 md:p-5 space-y-5`}
      >
        <SearchField />
        <div className="w-full flex items-center justify-center text-left flex-col my-2 space-y-2">
          <h3 className="text-left w-full pl-2 font-medium text-xl md:text-2xl">
            Category
          </h3>
          <CategoryFilter />

          <h3 className="text-left w-full pl-2 font-medium text-xl md:text-2xl !mt-8">
            Price Range
          </h3>
          <CustomSlider />

          <div className="!my-8 w-full">
            <SearchFieldForLocation />
          </div>
        </div>
      </div>
    </aside>
  );
}
