import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddToCartButton from "./AddToCartButton";
import QuantityControl from "./QuantityButton";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import { IoLocationOutline } from "react-icons/io5";
import HeartButton from "./HeartButton";



export default function Cards({ products }: { products: ProductType[] }) {
  return (
    <>
      {products.map((product) => (
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
            <QuantityControl />
            <AddToCartButton />
          </CardActions>
        </Card>
      ))}
    </>
  );
}
