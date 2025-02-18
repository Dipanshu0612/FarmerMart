import Product from "@/lib/models/productModel";
import { connectToDB } from "@/lib/mongoDB";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    const productId = req.nextUrl.searchParams.get("productId");
    const data: ProductReview = await req.json();
    await connectToDB();

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return NextResponse.json(
        { message: "No product found!" },
        { status: 404 }
      );
    }
    const user = await currentUser();
    const review = {
      data,
      user: user?.firstName + " " + user?.lastName,
      user_email: user?.emailAddresses[0].emailAddress
    }
    const newRating = product.rating + (data.rating - product.rating) / (product.reviews.length + 1 || 1);
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        $push: { reviews: review },
        rating:newRating,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Review Submitted Successfully!", updatedProduct },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error Getting User!", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
