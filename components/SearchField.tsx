"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SearchField() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Input
        type="text"
        placeholder="Search Products..."
        id="search"
        className="bg-white rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}
