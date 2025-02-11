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
    const orderData = await req.json();
    console.log(orderData);

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $push: {
          orders: {
            $each: orderData,
          },
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Order added successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
