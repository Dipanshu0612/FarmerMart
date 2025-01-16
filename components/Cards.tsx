import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddToCartButton from "./AddToCartButton";
import QuantityControl from "./QuantityButton";

type Product = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function Cards({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Card
          key={product.name}
          className="w-[20rem] !rounded-3xl cursor-pointer cardhover shadow-none !bg-slate-50"
        >
          <CardMedia
            component="img"
            alt={product.name}
            height="200px"
            image={product.image}
          />
          <CardContent className="space-y-1">
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Typography variant="body1" className="!font-bold">
              Rs.{product.price}
            </Typography>
            <Typography variant="body1" className="!font-bold">
              4.2 ⭐
            </Typography>
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
