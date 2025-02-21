import { connectToDB } from "../mongoDB";
import Product from "../models/productModel";
import User from "../models/userModel";
import Order from "../models/ordersModel";
import { createClerkClient } from "@clerk/backend";
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

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
    filters.$or = [
      { name: { $regex: searchText, $options: "i" } },
      { description: { $regex: searchText, $options: "i" } },
      { category: { $regex: searchText, $options: "i" } },
      { location: { $regex: searchText, $options: "i" } },
    ];
  }

  if (minPrice || maxPrice) {
    filters.selling_price = { $gte: minPrice, $lte: maxPrice };
  }

  if (category) {
    filters.category = { $in: category };
  }
  const data = await Product.find(filters).lean();
  return data as unknown as ProductType[];
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

export const getWishlist = async (userID: string) => {
  await connectToDB();
  const user = await User.find({ clerkId: userID }).lean();
  if (!user) {
    throw new Error("User not found");
  }

  return user[0].wishlist;
};

export const getOrders = async (userID: string) => {
  await connectToDB();
  const user = await User.find({ clerkId: userID }).lean();
  if (!user[0]) {
    throw new Error("User not found");
  }
  const orderIds = user[0].orders;
  if (orderIds.length === 0) {
    return null;
  }
  const orders = await Promise.all(
    orderIds.map(async (orderId: string) => {
      const res = await getOrderById(orderId);
      return res;
    })
  );
  // console.log({ Orders_server: orders });
  return orders as unknown as OrderType[];
};

export const getReviews = async (id: string) => {
  await connectToDB();
  const data = await Product.findById(id).lean();
  if (!data) {
    throw new Error(`Product with id ${id} not found`);
  }
  if (!Array.isArray(data) && data.reviews) {
    const reviews = data.reviews;
    return reviews as unknown as ProductReviews[];
  }
  throw new Error(`Product with id ${id} does not have reviews`);
};

export const getOrderById = async (order_id: string) => {
  await connectToDB();
  const order = await Order.findById(order_id).lean();
  if (!order) {
    return;
  }
  return order as unknown as OrderType;
};

export const getSellerName = async (user_id: string) => {
  try {
    if (!user_id) return;
    const seller = await clerkClient.users.getUser(user_id);
    const seller_name = seller.firstName + " " + seller.lastName;
    return seller_name;
  } catch (error) {
    console.log({ error });
  }
};

export const getSellerOrders = async (seller_id: string) => {
  await connectToDB();
  const seller = await User.find({ clerkId: seller_id }).lean();
  if (!seller[0]) {
    throw new Error("Seller not found");
  }
  const orders = Order.find({ seller_id }).lean();

  // console.log({ Orders_server: orders });
  return orders as unknown as OrderType[];
};

export const getSellerProducts = async (seller_id: string) => {
  await connectToDB();
  const products = await Product.find({ sold_by: seller_id }).lean();
  if (!products) {
    return null;
  }
  return products as unknown as ProductType[];
};
