type ProductType = {
  _id?: string;
  title?: string;
  description?: string;
  media?: string[];
  category?: string;
  sold_by?: string;
  location?: string;
  original_price?: number;
  selling_price?: number;
  weight?: number;
  availability?: boolean;
  rating?: number;
  tags?: [string];
  createdAt?: string;
  updatedAt?: string;
  quantity?: number;
  reviews?:[ProductReview]
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  orders: [string];
  createdAt: string;
  updatedAt: string;
};

type OrderType = {
  products_details: OrderProductDetails[];
  user_details: OrderUserDetails;
  total_amount: number;
  seller_id: string;
  seller_location: string;
  order_status: string;
  _id: string;
  ordered_at: string;
  createdAt: string;
  updatedAt: string;
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

type OrderProductDetails = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  selling_price: number;
  quantity: number;
};

type OrderUserDetails = {
  _id: string;
  user_name: string;
  user_email: string;
};