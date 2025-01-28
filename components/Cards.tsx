"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import { IoLocationOutline } from "react-icons/io5";
import { HeartButton } from "./AddToWishListButton"; 
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { toast } from "sonner";
import useCart from "@/lib/store/store";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "@clerk/nextjs";
// import { serializeProducts } from "@/utils/helpers";

export default function Cards({
  products,
}: {
  products: ProductType[];
  updateSignedInUser?: (updatedUser: UserType) => void;
  }) {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const createUser = async () => {
      try {
        const response = await fetch("/api/users", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to create user");
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    if (isSignedIn) {
      createUser();
    }
  }, [isSignedIn]);

  return (
    <>
      {products.map((product: ProductType) => (
        <Card
          key={product._id}
          className="w-[20rem] !rounded-3xl cursor-pointer cardhover shadow-none !bg-white"
        >
          <CardMedia
            component="img"
            alt={product.title}
            height="200px"
            image={product.media[0]}
            className="!h-[210px]"
            loading="lazy"
          />
          <CardContent className="space-y-5 text-left flex items-center justify-between">
            <div className="">
              <Link href={`/products/${product._id}`} key={product._id}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body1" className="!font-bold !mt-1">
                  Rs.{product.selling_price}/-
                </Typography>
                <Typography
                  variant="body1"
                  className="!font-bold flex items-center text-[1rem] gap-1"
                >
                  <span className="flex items-center justify-center mt-1">
                    {product.rating}
                  </span>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.5}
                    readOnly
                    className="text-[1.3rem]"
                  />
                </Typography>
                <Typography
                  variant="body2"
                  className="flex items-center gap-1 text-[1rem]"
                >
                  <IoLocationOutline /> {product.location}
                </Typography>
              </Link>
            </div>
            <div className="self-start !mt-0">
              <HeartButton Product={product} />
            </div>
          </CardContent>
          <CardActions className="flex items-center justify-between mt-1">
            <AddToCartButton Product={product} Quantity={1} />
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export function CardsSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <div key={index} className="w-[20rem] space-y-3">
          <Skeleton className="h-[210px] w-full rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-3/5" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </>
  );
}

export function AddToCartButton({
  Width,
  Disable,
  Product,
  Quantity,
}: {
  Width?: string;
  Disable?: boolean;
  Product: ProductType;
  Quantity?: number;
}) {
  const cart = useCart();
  const addToCart = () => {
    cart.addItem({ item: Product, quantity: Quantity || 1});
  };
  const GivenWidth = Width || "";

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            className="cardbutton mb-2 mx-2 bg-transparent text-black"
            disabled={Disable}
          >
            Add to Cart
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Button
          className={`cardbutton mb-2 mx-2 bg-transparent text-black ${GivenWidth} ${
            Disable ? "cursor-not-allowed" : "curson-pointer"
          } `}
          disabled={Disable}
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </SignedIn>
    </>
  );
}

export function QuantityControl({
  Disable,
  Product,
}: {
  Disable?: boolean;
  Product: ProductType;
}) {
  const cart = useCart();
  const Product_ID = Product._id;
  const product = cart.cartItems.find((prod) => prod.item._id === Product_ID);

  const increaseQuantity = () => {
    if (!product) {
      cart.addItem({ item: Product, quantity: 2 });
    } else {
      cart.increaseQuantity(Product_ID);
    }
  };

  const decreaseQuantity = () => {
    if (product && product.quantity > 1) {
      cart.decreaseQuantity(Product_ID);
    } else if (product) {
      if (confirm("Are you sure you want to remove this item from the cart?")) {
        cart.removeItem(Product_ID);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={decreaseQuantity}
        className={`h-[1.2rem] bg-transparent text-black cardbutton ${
          Disable ? "cursor-not-allowed" : "curson-pointer"
        }`}
        disabled={Disable}
      >
        -
      </Button>
      <span className="text-lg font-semibold">{product?.quantity || 1}</span>
      <Button
        onClick={increaseQuantity}
        className={`h-[1.2rem] bg-transparent text-black cardbutton ${
          Disable ? "cursor-not-allowed" : "curson-pointer"
        }`}
        disabled={Disable}
      >
        +
      </Button>
    </div>
  );
}

export function AddToWishListButton({ Width }: { Width?: string }) {
  const addToCart = () => {
    toast.success("Item added to wishlist!");
  };
  const GivenWidth = Width || "";

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="cardbutton mb-2 mx-2 bg-transparent text-black">
            Add to Wishlist
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Button
          className={`cardbutton mb-2 mx-2 bg-transparent text-black ${GivenWidth}`}
          onClick={addToCart}
        >
          Add to Wishlist
        </Button>
      </SignedIn>
    </>
  );
}
