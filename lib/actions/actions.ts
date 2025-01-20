import { connectToDB } from "../mongoDB";
import Product from "../models/productModel";

export const getProducts = async () => {
  await connectToDB();
  const data = await Product.find({});
  return data;
};

export const getProductByID = async (id: string) => {
  await connectToDB();
  const data = await Product.findById(id);
  return data;
};

export const getProductsByQuery = async ({
  query,
  minPrice,
  maxPrice,
  categories,
}: {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
}) => {
  await connectToDB();

  const filters: any = {};

  if (query) {
    filters.$text = { $search: query };
  }

  if (minPrice || maxPrice) {
    filters.price = { $gte: minPrice, $lte: maxPrice };
  }

  if (categories && categories.length > 0) {
    filters.category = { $in: categories };
  }

  const data = await Product.find(filters);

  return data;
};
