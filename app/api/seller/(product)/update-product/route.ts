import Order from "@/lib/models/ordersModel";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { order_id, order_status } = await req.json();
    console.log(order_id, order_status);
    await Order.findByIdAndUpdate(order_id, { order_status });
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
