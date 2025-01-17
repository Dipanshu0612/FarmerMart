import Cards from "@/components/Cards";
import React from "react";
import topProducts from "../utils/Top_Products";
import SearchField from "@/components/SearchField";
import MyCheckboxGroup from "@/components/MyCheckboxGroup";
import CustomSlider from "@/components/Slider";

export default function Products() {
  return (
    <>
      <div className="flex justify-center flex-1 text-center">
        <div className="w-1/6 flex flex-col items-center justify-start p-5 space-y-5 border-blue-50 border-r-2 h-auto">
          <SearchField />
          <div className="w-full flex items-center justify-center text-left flex-col my-2 space-y-2">
            <h3 className="text-left w-full pl-2 font-medium text-2xl">
              Category
            </h3>
            <MyCheckboxGroup />
            <h3 className="text-left w-full pl-2 font-medium text-2xl !mt-10">
              Price Range
            </h3>
            <CustomSlider />
          </div>
        </div>
        <div className="w-5/6 flex-grow flex items-center justify-center flex-col space-y-20 p-10 h-full">
          <div className="flex items-center justify-center gap-9">
            <Cards products={topProducts} />
          </div>
          <div className="flex items-center justify-center gap-9">
            <Cards products={topProducts} />
          </div>
          <div className="flex items-center justify-center gap-9">
            <Cards products={topProducts} />
          </div>
          <div className="flex items-center justify-center gap-9">
            <Cards products={topProducts} />
          </div>
          <div className="flex items-center justify-center gap-9">
            <Cards products={topProducts} />
          </div>
        </div>
      </div>
    </>
  );
}
