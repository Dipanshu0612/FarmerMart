type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  sold_by: string;
  location: string;
  original_price: number;
  selling_price: number;
  weight: number;
  availability: boolean;
  rating: number;
  tags: [string];
  createdAt: string;
  updatedAt: string;
  quantity?: number;
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  cart: [OrderItemType];
  orders: [OrderItemType];
  createdAt: string;
  updatedAt: string;
};

type OrderItemType = {
  product: ProductType;
  size: string;
  quantity: number;
  _id: string;
};

type OrderItems = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  sold_by: string;
  location: string;
  selling_price: number;
  quantity: number;
  ordered_at: string;
};