import Product from "@/lib/models/productModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const { product_id, availability } = await req.json();
    await Product.findByIdAndUpdate(product_id, { availability });
    return NextResponse.json(
      { message: "Product updated successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { message: "Internal Server Error", Error: error },
      { status: 500 }
    );
  }
};
