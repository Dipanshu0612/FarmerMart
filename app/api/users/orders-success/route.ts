import Order from "@/lib/models/ordersModel";
import User from "@/lib/models/userModel";
import { connectToDB } from "@/lib/mongoDB";
import { auth, currentUser} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const clerkUser = await currentUser();
    await connectToDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ message: "User Not Found!" }, { status: 404 });
    }
    const orderData = await req.json();
    // console.log(orderData);

    const itemsBySeller: { [key: string]: OrderItems[] } = {};
    
    orderData.forEach((item:OrderItems) => {
      const sellerName = item.sold_by;
      if (!itemsBySeller[sellerName]) {
        itemsBySeller[sellerName] = [];
      }
      itemsBySeller[sellerName].push(item);
    });

    const orderPromises = Object.entries(itemsBySeller).map(
      ([sellerName, items]) => {
        const totalAmount = items.reduce((sum, item) => {
          return sum + item.selling_price * item.quantity;
        }, 0);
        const sellerLocation = items[0].location;
        const orderedAt = items[0].ordered_at;

        const newOrder = {
          products_details: items.map((item) => ({
            _id: item._id,
            title: item.title,
            description: item.description,
            selling_price: item.selling_price,
            quantity: item.quantity,
            media: item.media,
          })),
          user_details: { userId, user_name:clerkUser?.firstName + " " + clerkUser?.lastName },
          total_amount: totalAmount,
          seller_name: sellerName,
          seller_location: sellerLocation,
          ordered_at: orderedAt,
        };

        return Order.create(newOrder);
      }
    );
    const createdOrders = await Promise.all(orderPromises);
    const orderIds = createdOrders.map((order) => order._id);
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $push: {
          orders: {
            $each: orderIds,
          },
        },
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Orders added successfully",
        orders:{createdOrders, updatedUser}
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Internal Server Error", error: err }, { status: 500 });
  }
};
