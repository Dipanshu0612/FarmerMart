import User from "@/lib/models/userModel";
import { connectToDB } from "@/lib/mongoDB";

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ message: "User Not Found!" }, { status: 404 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required!" },
        { status: 400 }
      );
    }

    const product = user.wishlist.includes(productId);

    if (product) {
      return NextResponse.json(
        { message: "Product already in wishlist" },
        { status: 400 }
      );
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    return NextResponse.json(
      { message: "Product added to wishlist" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ message: "User Not Found!" }, { status: 404 });
    }

    const url = new URL(req.url);
    const productId = url.searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required!" },
        { status: 400 }
      );
    }

    const product = user.wishlist.includes(productId);

    if (product) {
      user.wishlist = user.wishlist.filter((id:string) => id !== productId);
    }

    await user.save();

    return NextResponse.json(
      { message: "Product removed from wishlist" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
