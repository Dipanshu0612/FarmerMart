"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import MuiSlider from "@mui/material/Slider";
import { Suspense } from "react";

export const SearchField = ({ initialQuery = "" }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearch = useCallback(
    debounce((query: string) => {
      const searchParams = new URLSearchParams();

      if (query) {
        router.push(`/products/search/${query}?${searchParams.toString()}`);
      } else {
        router.push(`/products/search?${searchParams.toString()}`);
      }
    }, 500),
    []
  );

  return (
    <div className="w-full relative">
      <Input
        type="text"
        placeholder="Search Products..."
        id="search"
        className="bg-white rounded-full w-full overflow-hidden"
        value={searchQuery}
        autoComplete="off"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateSearch(searchQuery);
          }
        }}
      />
      <button
        className="bg-transparent absolute top-[0.04rem] right-[0.10rem] text-gray-500 overflow-hidden z-10 p-[0.4rem] rounded-full bg-white"
        onClick={() => updateSearch(searchQuery)}
      >
        <SearchIcon size={20} className="z-10" />
      </button>
    </div>
  );
};

const CategoryFilterContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

    const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (searchParams.get("category") === category) {
      newParams.delete("category");
      router.push(`/products`);
      return;
    } else {
      newParams.set("category", category);
    }
    router.push(`/products/search?${newParams.toString()}`);
  };

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
          {items.map((item: {label:string, value:string}, index) => (
        <div key={index} className="flex space-x-2 my-2 text-left">
          <Checkbox
            id={item.value}
            name="category"
            checked={item.value === searchParams.get("category")}
            onClick={() => handleCategoryChange(item.value)}
          />
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
};

export const CustomSliderContent = ({ initialMin = 0, initialMax = 10000 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<number[]>([initialMin, initialMax]);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePrice = useCallback(
    debounce((newRange: number[]) => {
      const newParams = new URLSearchParams(searchParams.toString());

      newParams.set("min", newRange[0].toString());
      newParams.set("max", newRange[1].toString());

    router.push(`/products/search?${newParams.toString()}`);
    }, 500),
    [searchParams]
  );

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const newRange = newValue as number[];
    setValue(newRange);
    updatePrice(newRange);
  };

  return (
    <MuiSlider
      getAriaLabel={() => "Price range"}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      className="!w-[80%] self-start ml-2"
      max={10000}
      marks={marks}
    />
  );
};

export const SearchFieldForLocation = ({ initialQuery = "" }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearch = useCallback(
    debounce((query: string) => {
      const searchParams = new URLSearchParams();

      if (query) {
        router.push(`/products/search/${query}?${searchParams.toString()}`);
      } else {
        router.push(`/products/search?${searchParams.toString()}`);
      }
    }, 500),
    []
  );

  return (
    <div className="w-full relative">
      <Input
        type="text"
        placeholder="Search location..."
        id="search"
        className="bg-white rounded-full w-full overflow-hidden"
        value={searchQuery}
        autoComplete="off"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateSearch(searchQuery);
          }
        }}
      />
      <button
        className="bg-transparent absolute top-[0.04rem] right-[0.10rem] text-gray-500 overflow-hidden z-10 p-[0.4rem] rounded-full bg-white"
        onClick={() => updateSearch(searchQuery)}
      >
        <SearchIcon size={20} className="z-10" />
      </button>
    </div>
  );
};

export const CategoryFilter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryFilterContent />
    </Suspense>
  );
};

export const CustomSlider = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomSliderContent />
    </Suspense>
  );
};