import { getProductByID } from "@/lib/actions/actions";
import Product from "@/lib/models/productModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { product_id } = await req.json();
    const product = await getProductByID(product_id);
    if (!product) {
      return NextResponse.json(
        { message: "No product found with that product ID", success: false },
        { status: 400 }
      );
    }
    await Product.deleteOne({ _id: product_id });
    return NextResponse.json(
      { message: "Prodeuct Deleted Succesfully!", success:true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error Deleting Product!", Error: error, success: false },
      { status: 401 }
    );
  }
};
