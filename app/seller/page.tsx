import React from "react";
import { ShoppingCart, TrendingUp, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { FaRupeeSign } from "react-icons/fa";
import { getSellerOrders, getSellerProducts } from "@/lib/actions/actions";
import moment from "moment";
import SellerDashboardChart from "@/components/SellerDashboardChart";
import { serializeOrders } from "@/utils/helpers";

const SellerDashboard = async () => {
  const user = await currentUser();
  let orders = await getSellerOrders(user?.id || "");
  const products = await getSellerProducts(user?.id || "");
  orders = serializeOrders(orders).filter((order) => order !== undefined);
  const totalCustomers = new Set(
    orders.map((order) => order.user_details.user_email)
  ).size; 
  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Shipped: "bg-indigo-100 text-indigo-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
      Refunded: "bg-gray-100 text-gray-800",
    };
    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.firstName + " " + user?.lastName}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <FaRupeeSign className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex text-2xl font-bold">
              Rs.{" "}
              {orders
                .filter((order) => order.order_status !== "Cancelled")
                .reduce(
                  (sum: number, order: OrderType) => sum + order.total_amount,
                  0
                )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex text-2xl font-bold">{totalCustomers}</div>
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
            <div className="flex text-2xl font-bold">
              Rs.{" "}
              {orders
                .filter((order) => order.order_status !== "Cancelled")
                .reduce((sum, order) => sum + order.total_amount, 0) /
                orders.filter((order) => order.order_status !== "Cancelled")
                  .length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
            <CardDescription>Last 12 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            <SellerDashboardChart orders={orders} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products?.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-left"
                >
                  <div>
                    <p className="font-medium">{product.title}</p>
                  </div>
                  <p className="font-medium">Rs. {product.selling_price}</p>
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
                {orders.map((order) => (
                  <tr key={order._id} className="border-b text-left">
                    <td className="py-2">{order._id}</td>
                    <td className="py-2">{order.user_details.user_name}</td>
                    <td className="py-2">
                      {moment(order.ordered_at).format("Do MMMM, YYYY")}
                    </td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          order.order_status
                        )}`}
                      >
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      Rs. {order.total_amount}
                    </td>
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
