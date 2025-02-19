"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Box, CirclePlus, LayoutDashboardIcon, LayoutList, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SellerSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <div className="w-1/6 flex flex-col justify-start p-5 space-y-5 border-blue-50 border-r-2 h-auto">
      <div>
        <Image src="/Logo.svg" alt="Logo" height={100} width={300} />
      </div>
      <div className="flex-grow">
        <nav className="flex list-none justify-center space-y-5 flex-col">
          <li
            className={
              pathname === "/seller"
                ? "text-gray-400 border-blue-600 border-l-[3px] h-full flex items-center p-2"
                : "h-full flex items-center p-2"
            }
          >
            <Link href="/seller" className="flex space-x-3">
              <LayoutDashboardIcon />
              <p>Dashboard</p>
            </Link>
          </li>
          <li
            className={
              pathname === "/seller/products"
                ? "text-gray-400 border-blue-600 border-l-[3px] h-full flex items-center p-2"
                : "h-full flex items-center p-2"
            }
          >
            <Link href="/seller/products" className="flex space-x-3">
              <Box />
              <p>My Products</p>
            </Link>
          </li>
          <li
            className={
              pathname === "/seller/add-product"
                ? "text-gray-400 border-blue-600 border-l-[3px] h-full flex items-center p-2"
                : "h-full flex items-center p-2"
            }
          >
            <Link href="/seller/add-product" className="flex space-x-3">
              <CirclePlus />
              <p>Add Product</p>
            </Link>
          </li>

          <li
            className={
              pathname === "/seller/orders"
                ? "text-gray-400 border-blue-600 border-l-[3px] h-full flex items-center p-2"
                : "h-full flex items-center p-2"
            }
          >
            <Link href="/seller/orders" className="flex space-x-3">
              <LayoutList />
              <p>My Orders</p>
            </Link>
          </li>
          <li
            className={
              pathname === "/"
                ? "text-gray-400 border-blue-600 border-l-[3px] h-full flex items-center p-2"
                : "h-full flex items-center p-2"
            }
          >
            <Link href="/" className="flex space-x-3">
              <MoveLeft />
              <p>FarmerMart Home</p>
            </Link>
          </li>
        </nav>
      </div>
      <div className="flex">
        {domLoaded && (
          <>
            <SignedIn>
              <div className="flex space-x-2 items-center">
                <UserButton />
                <p>{user?.firstName + " " + user?.lastName}</p>
              </div>
            </SignedIn>
          </>
        )}
      </div>
    </div>
  );
}
