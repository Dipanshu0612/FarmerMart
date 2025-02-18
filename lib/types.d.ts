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
  reviews?:[ProductReview]
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
type ProductReview = {
  title: string;
  review: string;
  rating: number;
  ordered_at: string;
};
type ProductReviews = {
  data: ProductReview,
  user: string;
  user_email: string;
}

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