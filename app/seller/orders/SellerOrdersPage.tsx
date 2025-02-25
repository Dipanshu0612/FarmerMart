"use client";

import React, { useEffect, useState } from "react";
import { Eye, Filter, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import moment from "moment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SellerOrdersPage = ({ orders }: { orders: OrderType[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderType, setOrderType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

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

  const isWithinDateRange = (orderDate: string) => {
    if (dateRange === "all") return true;

    const today = moment();
    const orderMoment = moment(orderDate);
    const daysDifference = today.diff(orderMoment, "days");

    return daysDifference <= parseInt(dateRange);
  };
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user_details.user_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.user_details.user_email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      orderType === "all" ||
      order.order_status.toLowerCase() === orderType.toLowerCase();

    const matchesDate = isWithinDateRange(order.ordered_at);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const updateProduct = async (order_id: string, order_status: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/seller/update-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id, order_status }),
      });
      if (!res.ok) {
        toast.error("Failed to update the status of the order!");
        return;
      }
      const data = await res.json();
      if (data.success) {
        router.refresh();
        toast.success("Order Status Updated Successfully!");
      }
    } finally {
      setTimeout(() => {
        setIsUpdating(false);
      },2000)
      
    }
  };
  useEffect(() => {
    setOrderType("all");
    setDateRange("30");
  }, []);


  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            View and manage all your customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center w-full md:w-1/2 relative">
                <Search className="absolute left-2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by order ID, customer name, or email..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={orderType}
                  onValueChange={(value) => {
                    setOrderType(value);
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={dateRange}
                  onValueChange={(value) => setDateRange(value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left font-medium">
                        Order ID
                      </th>
                      <th className="py-3 px-4 text-left font-medium">
                        Customer
                      </th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Items</th>
                      <th className="py-3 px-4 text-left font-medium">Total</th>
                      <th className="py-3 px-4 text-center font-medium">
                        Status
                      </th>
                      <th className="py-3 px-4 text-center font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b hover:bg-gray-50 text-left"
                        >
                          <td className="py-3 px-4">{order._id}</td>
                          <td className="py-3 px-4">
                            <div className="font-medium">
                              {order.user_details.user_name}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {order.user_details.user_email}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {moment(order.ordered_at).format("Do MMMM, YYYY")}
                          </td>
                          <td className="py-3 px-4">
                            {order.products_details.length} item(s)
                          </td>
                          <td className="py-3 px-4  font-medium">
                            Rs.{order.total_amount.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                order.order_status
                              )}`}
                            >
                              {order.order_status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      setOrderStatus(order.order_status)
                                    }
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Order Details - {order._id}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Placed on{" "}
                                      {moment(order.ordered_at).format(
                                        "Do MMMM, YYYY"
                                      )}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h3 className="font-medium">
                                          Customer
                                        </h3>
                                        <p>{order.user_details.user_name}</p>
                                        <p className="text-sm text-gray-500">
                                          {order.user_details.user_email}
                                        </p>
                                      </div>
                                      <div>
                                        <h3 className="font-medium">
                                          Order Status
                                        </h3>
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                            order.order_status
                                          )}`}
                                        >
                                          {order.order_status}
                                        </span>
                                      </div>
                                    </div>

                                    <div>
                                      <h3 className="font-medium mb-2">
                                        Items
                                      </h3>
                                      {order.products_details.map(
                                        (item, index) => (
                                          <div
                                            key={index}
                                            className="flex justify-between py-1 border-b"
                                          >
                                            <div>
                                              <span>{item.title} </span>
                                              <span className="text-gray-500">
                                                x{item.quantity}
                                              </span>
                                            </div>
                                            <span>
                                              Rs.{" "}
                                              {item.selling_price.toFixed(2)}
                                            </span>
                                          </div>
                                        )
                                      )}
                                      <div className="flex justify-between mt-2 font-medium">
                                        <span>Total</span>
                                        <span>
                                          Rs. {order.total_amount.toFixed(2)}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h3 className="font-medium">
                                          Payment Method
                                        </h3>
                                        <p>{"N/A"}</p>
                                      </div>
                                      <div>
                                        <h3 className="font-medium">
                                          Shipping Method
                                        </h3>
                                        <p>{"N/A"}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <Select
                                      value={orderStatus}
                                      onValueChange={(value) => {
                                        setOrderStatus(value);
                                      }}
                                    >
                                      <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Update Status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Pending">
                                          Pending
                                        </SelectItem>
                                        <SelectItem value="Processing">
                                          Processing
                                        </SelectItem>
                                        <SelectItem value="Shipped">
                                          Shipped
                                        </SelectItem>
                                        <SelectItem value="Delivered">
                                          Delivered
                                        </SelectItem>
                                        <SelectItem value="Cancelled">
                                          Cancelled
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <Button
                                      onClick={() => {
                                        updateProduct(order._id, orderStatus);
                                      }}
                                      disabled={isUpdating}
                                    >
                                      {isUpdating ? (
                                        <>
                                          <span className="animate-spin mr-2">
                                            ◌
                                          </span>
                                          Updating...
                                        </>
                                      ) : (
                                        "Update Order"
                                      )}
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-6 text-center text-gray-500"
                        >
                          No orders found matching your search criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing 1-{filteredOrders.length} of {filteredOrders.length}{" "}
                orders
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-100">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                orders.filter((order) => order.order_status === "Pending")
                  .length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Shipped Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                orders.filter((order) => order.order_status === "Shipped")
                  .length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Delivered Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                orders.filter((order) => order.order_status === "Delivered")
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerOrdersPage;
