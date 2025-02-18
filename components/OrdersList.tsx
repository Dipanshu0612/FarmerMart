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
  product?: OrderItems;
}


export default function OrderList({ orders }: { orders: OrderItems[] }) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

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

  return (
    <>
      {orders.map((product, index) => (
        <div
          className="flex items-center justify-between w-[60%] p-5 bg-white rounded-3xl"
          key={index}
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
            <Link href={`/products/${product._id}`}>
              <div className="flex flex-col gap-1 text-left">
                <h2 className="font-bold">{product.title}</h2>
                <p className="text-sm">{product.description}</p>
                <p>Sold By: {product.sold_by}</p>
                <p>{product.location}</p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col text-left">
            <p>Quantity: {product.quantity}</p>
            <p>
              Amount: Rs.{" "}
              {(product.selling_price * product.quantity).toFixed(2)}
            </p>
            <p>
              Bought On: {moment(product.ordered_at).format("Do MMMM, YYYY")}
            </p>
          </div>
          <div>
            <Button
              className="mybutton !m-0"
              onClick={() => setSelectedProductId(product._id)}
            >
              Write a Review
            </Button>
            <ReviewModal
              open={selectedProductId === product._id}
              onClose={() => setSelectedProductId(null)}
              product={product}
            />
          </div>
        </div>
      ))}
    </>
  );
}


export function ReviewModal({
  open,
  onClose,
  product,
}: ReviewModalProps) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ordered_at = product?.ordered_at;
      const res = await fetch(`api/users/review?productId=${product?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, review, rating, ordered_at }),
      });
      if (!res.ok) {
        throw new Error("Error submitting review!");
      }
      const data = await res.json();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
    finally {
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
            Write a Review {product && `for ${product.title}`}
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