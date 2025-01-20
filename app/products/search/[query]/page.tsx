import Cards from "@/components/Cards";
import MyCheckboxGroup from "@/components/MyCheckboxGroup";
import SearchField from "@/components/SearchField";
import CustomSlider from "@/components/Slider";
import { getProductsByQuery } from "@/lib/actions/actions";
import React from "react";

export default async function SearchQuery({ params }: { params: { query: string } }) {
  const { query } = params;

  const data = await getProductsByQuery({query});

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
        <div className="w-5/6 flex-grow flex items-center justify-start flex-col space-y-20 p-10 h-full">
          {data.length === 0 ? <div className="flex items-center justify-center w-full h-full">
            <h1 className="font-bold text-4xl">No Results found!</h1>
          </div> :
            <div className="flex items-center justify-start gap-9 flex-wrap w-full">
              <Cards products={data} />
            </div>
          }
        </div>
      </div>
    </>
  );
}
