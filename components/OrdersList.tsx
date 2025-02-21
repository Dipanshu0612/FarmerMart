"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from 'moment';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  order?: OrderType;
  productIndex: number;
}


export default function OrderList({ orders }: { orders: OrderType[] }) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
    const getStatusColor = (status: string) => {
      const statusMap: { [key: string]: string } = {
        Pending: "bg-yellow-100 text-yellow-800",
        Processing: "bg-blue-100 text-blue-800",
        Shipped: "bg-indigo-100 text-indigo-800",
        Delivered: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
        Refunded: "bg-gray-100 text-gray-800",
      };
      return statusMap[status] || "bg-gray-100 text-gray-800";
    };

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col space-y-5 flex-1">
        <p className="text-3xl">No Orders to show!</p>
        <Button className="mybutton">
          <Link href="/products">Shop Now!</Link>
        </Button>
      </div>
    );
  }
  console.log({orders})

  return (
    <>
      {orders.map((order) =>
        order.products_details.map((product, productIndex) => (
          <div
            className="flex items-center justify-between w-[60%] p-5 bg-white rounded-3xl"
            key={`${order._id}-${productIndex}`}
          >
            <div className="flex items-center gap-5 w-[50%]">
              <Image
                src={product.media[0]}
                alt="Product"
                width={200}
                height={0}
                className="!object-cover !h-[130px] !w-[200px] shadow-lg"
                loading="lazy"
              />
              <Link href={`/products/${product._id || order._id}`}>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="font-bold">{product.title}</h2>
                  <p className="text-sm">{product.description}</p>
                  <p>Sold By: {order.seller_id}</p>
                  <p>{order.seller_location}</p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col text-left space-y-2">
              <p>Quantity: {product.quantity}</p>
              <p>
                Amount: Rs.{" "}
                {(product.selling_price * product.quantity).toFixed(2)}
              </p>
              <p>
                Bought On: {moment(order.ordered_at).format("Do MMMM, YYYY")}
              </p>
              <p>
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    order.order_status
                  )}`}
                >
                  {order.order_status}
                </span>
              </p>
            </div>
            <div>
              <Button
                className={`mybutton !m-0 ${
                  order.order_status === "Pending" ? "hidden" : ""
                }`}
                onClick={() => setSelectedProductId(order._id)}
              >
                Write a Review
              </Button>
              <ReviewModal
                open={selectedProductId === order._id}
                onClose={() => setSelectedProductId(null)}
                order={order}
                productIndex={productIndex}
              />
            </div>
          </div>
        ))
      )}
    </>
  );
}


export function ReviewModal({
  open,
  onClose,
  order,
  productIndex,
}: ReviewModalProps) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const product = order?.products_details[productIndex];
      const ordered_at = order?.ordered_at;
      const res = await fetch(
        `api/users/review?productId=${product?._id || order?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, review, rating, ordered_at }),
        }
      );
      if (!res.ok) {
        throw new Error("Error submitting review!");
      }
      const data = await res.json();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setTitle("");
      setReview("");
      setRating(0);
      onClose();
    }
  };

  const StarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-none text-gray-300"
              } hover:text-yellow-400 transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Write a Review{" "}
            {order && `for ${order.products_details[productIndex].title}`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Rating</Label>
            <StarRating />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum up your review in a title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Review</Label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you like or dislike about this product?"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title || !review || !rating}>
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}