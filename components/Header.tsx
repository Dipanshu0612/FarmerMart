"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
  { href: "/wishlist", label: "Wishlist" },
];

const Header = () => {
  const { user } = useUser();
  const isSeller = user?.unsafeMetadata.role;
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const pathname = usePathname();

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <li className="h-full items-center" key={item.href}>
          <Link
            href={item.href}
            className={
              isActivePath(pathname, item.href)
                ? mobile
                  ? "text-blue-700 font-medium"
                  : "text-gray-500 border-blue-600 border-b-[3px] h-full flex items-center"
                : mobile
                  ? "text-black"
                  : "h-full flex items-center"
            }
          >
            {item.label}
          </Link>
        </li>
      ))}

      <li className="h-full items-center">
        <Link
          href="/cart"
          className={
            isActivePath(pathname, "/cart")
              ? mobile
                ? "text-blue-700 font-medium"
                : "text-gray-500 border-blue-600 border-b-[3px] h-full flex items-center"
              : mobile
                ? "text-black"
                : "h-full flex items-center"
          }
        >
          {mobile ? (
            "Cart"
          ) : (
            <Image
              src="/cart.svg"
              alt="cart"
              width={25}
              height={20}
              className="cursor-pointer"
            />
          )}
        </Link>
      </li>

      {isSeller === "seller" ? (
        <li className="h-full items-center">
          <Link
            href="/seller"
            className={
              isActivePath(pathname, "/seller")
                ? mobile
                  ? "text-blue-700 font-medium"
                  : "text-gray-500 border-blue-600 border-b-[3px] h-full flex items-center"
                : mobile
                  ? "text-black"
                  : "h-full flex items-center"
            }
          >
            Seller Dashboard
          </Link>
        </li>
      ) : null}
    </>
  );

  return (
    <>
      <div className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md min-h-[5rem] sticky top-0 w-full header">
        <div className="flex cursor-pointer uppercase font-bold shrink-0">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="logo"
              width={300}
              height={1}
              className="self-start block right-1 w-[170px] sm:w-[220px] md:w-[280px] h-auto"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex list-none justify-around items-center space-x-5 h-[inherit]">
          <NavLinks />
          {domLoaded && (
            <>
              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <li className="h-full items-center">
                  <Link href="/sign-in" className="h-full flex items-center">
                    Sign In
                  </Link>
                </li>
              </SignedOut>
            </>
          )}
        </nav>

        <div className="lg:hidden flex items-center gap-2">
          {domLoaded && (
            <SignedIn>
              <UserButton />
            </SignedIn>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] max-w-sm">
              <div className="flex items-center justify-between border-b pb-3">
                <p className="font-semibold">Menu</p>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>

              <ul className="mt-5 flex flex-col gap-5 text-lg">
                <NavLinks mobile />
                {domLoaded && (
                  <SignedOut>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/sign-in"
                          className="font-medium text-blue-700"
                        >
                          Sign In
                        </Link>
                      </SheetClose>
                    </li>
                  </SignedOut>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Header;
