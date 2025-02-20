import React from "react";
import { ShoppingCart, TrendingUp, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser} from "@clerk/nextjs/server";
import { FaRupeeSign } from "react-icons/fa";
import { redirect } from "next/navigation";

const SellerDashboard = async () => {
  const user = await currentUser();
  if (user?.unsafeMetadata.role !== "seller") {
    redirect("/");
  }
  // const revenueData = [
  //   { name: "Jan", revenue: 4000, orders: 240 },
  //   { name: "Feb", revenue: 3000, orders: 198 },
  //   { name: "Mar", revenue: 5000, orders: 305 },
  //   { name: "Apr", revenue: 4500, orders: 275 },
  //   { name: "May", revenue: 6000, orders: 410 },
  //   { name: "Jun", revenue: 5500, orders: 350 },
  // ];

  const topProducts = [
    { id: 1, name: "Wireless Headphones", sales: 145, revenue: 7250 },
    { id: 2, name: "Smart Watch", sales: 98, revenue: 9800 },
    { id: 3, name: "Fitness Tracker", sales: 87, revenue: 4350 },
    { id: 4, name: "Bluetooth Speaker", sales: 76, revenue: 3800 },
  ];

  const recentOrders = [
    {
      id: "#ORD-7539",
      customer: "Alex Johnson",
      date: "2025-02-18",
      status: "Delivered",
      amount: 129.99,
    },
    {
      id: "#ORD-7538",
      customer: "Maria Garcia",
      date: "2025-02-18",
      status: "Processing",
      amount: 79.95,
    },
    {
      id: "#ORD-7537",
      customer: "James Wilson",
      date: "2025-02-17",
      status: "Shipped",
      amount: 249.5,
    },
    {
      id: "#ORD-7536",
      customer: "Sarah Ahmed",
      date: "2025-02-17",
      status: "Delivered",
      amount: 59.99,
    },
  ];

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome, { user?.firstName + " " + user?.lastName}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Today: Feb 19, 2025</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <FaRupeeSign className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex text-2xl font-bold">Rs. 28,000</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex text-2xl font-bold">1,778</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex text-2xl font-bold">892</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Order Value
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex text-2xl font-bold">Rs. 72.40</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
            <CardDescription>Last 6 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Line
                  data={revenueData}
                  width={500}
                  height={300}
                  // margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                </Line> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between text-left"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.sales} units sold
                    </p>
                  </div>
                  <p className="font-medium">Rs. {product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium py-2">Order ID</th>
                  <th className="text-left font-medium py-2">Customer</th>
                  <th className="text-left font-medium py-2">Date</th>
                  <th className="text-left font-medium py-2">Status</th>
                  <th className="text-right font-medium py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b text-left">
                    <td className="py-2">{order.id}</td>
                    <td className="py-2">{order.customer}</td>
                    <td className="py-2">{order.date}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 text-right">Rs. {order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerDashboard;
