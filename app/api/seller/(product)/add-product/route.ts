import Product from "@/lib/models/productModel";
import { connectToDB } from "@/lib/mongoDB";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await currentUser();
    if (user?.unsafeMetadata.role !== "seller") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const data = await req.formData();
    const product: ProductType = {
      title: data.get("name") as string,
      description: data.get("description") as string,
      category: data.get("category") as string,
      location: data.get("location") as string,
      quantity: Number(data.get("quantity") as unknown as string),
      original_price: Number(data.get("original_price") as unknown as string),
      selling_price: Number(data.get("selling_price") as unknown as string),
      weight: Number(data.get("weight") as unknown as string),
      sold_by: userId,
      media: JSON.parse((data.get("product_images") as string) || "[]"),
    };

    await Product.create(product);
    return NextResponse.json(
      { message: "Product added successfully!" },
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
