"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchField() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    router.push(`/products/search/${search}`);
  }
  return (
    <>
      <div className="w-full relative">
        <Input
          type="text"
          placeholder="Search Products..."
          id="search"
          className="bg-white rounded-full w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-transparent absolute top-[0.05rem] right-[0.10rem] text-gray-500 overflow-hidden z-10 bg-white p-[0.5rem] rounded-full" onClick={handleSearch}>
          <SearchIcon size={20} className="z-10" />
        </button>
      </div>
    </>
  );
}
