"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import { IoLocationOutline } from "react-icons/io5";
import HeartButton from "./HeartButton";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { toast } from "sonner";
import useCart from "@/lib/store/store";


export default function Cards({ products }: { products: ProductType[] }) {
  return (
    <>
      {products.map((product : ProductType) => (
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
          <CardContent className="space-y-2 text-left flex items-center justify-between">
            <div>
              <Link href={`/products/${product._id}`} key={product._id}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body1" className="!font-bold">
                  Rs.{product.selling_price}/-
                </Typography>
                <Typography
                  variant="body1"
                  className="!font-bold flex items-center text-[1.1rem] gap-1"
                >
                  {product.rating}
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
              <HeartButton />
            </div>
          </CardContent>
          <CardActions className="flex items-center justify-between mt-2 mx-2">
            <QuantityControl Product_ID={product._id} />
            <AddToCartButton Product={ product }/>
          </CardActions>
        </Card>
      ))}
    </>
  );
}



export function AddToCartButton({
  Width,
  Disable,
  Product,
}: {
  Width?: string;
  Disable?: boolean;
  Product: ProductType;
}) {
  const cart = useCart();
  const addToCart = () => {
    cart.addItem({ item: Product, quantity: 1 });
    toast.success("Item added to cart!");
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
  Product_ID,
}: {
  Disable?: boolean;
  Product_ID:string;
}) {
  const cart = useCart();
  const product = cart.cartItems.find((item) => item.item._id === Product_ID);
  const increaseQuantity = () => {
    cart.increaseQuantity(Product_ID);
  };
  const decreaseQuantity = () => {
    cart.decreaseQuantity(Product_ID);
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
