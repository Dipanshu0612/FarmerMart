import { connectToDB } from "../mongoDB";
import Product from "../models/productModel";
import User from "../models/userModel";

export const getProductsByQuery = async ({
  query,
  minPrice,
  maxPrice,
  category,
}: {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  }) => {
  
  await connectToDB();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any = {};
  if (query) {
    const searchText = Array.isArray(query) ? query[0] : query;
    filters.$text = { $search: searchText };
  }

  if (minPrice || maxPrice) {
    filters.selling_price = { $gte: minPrice, $lte: maxPrice };
  }

  if (category) {
    filters.category = { $in: category };
  }
  const data: ProductType[] = await Product.find(filters);
  return data;
};

export const getProducts = async () => {
  await connectToDB();
  const data = await Product.find({}).lean();
  return data as unknown as ProductType[];
};

export const getProductByID = async (id: string) => {
  await connectToDB();
  const data = await Product.findById(id).lean();
  if (!data) {
    throw new Error(`Product with id ${id} not found`);
  }
  return data as unknown as ProductType;
};

export const getWishlist = async (userID:string) => {
  await connectToDB();
  const user = await User.find({ clerkId: userID }).lean();
  if (!user) {
    throw new Error("User not found");
  }

  return user[0].wishlist;
}