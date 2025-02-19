"use client"

import React, { useState } from "react";
import { Eye, Filter, Search} from "lucide-react";
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


const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const orders = [
    {
      id: "#ORD-7842",
      customer: "Elena Rodriguez",
      email: "elena.r@example.com",
      date: "2025-02-19",
      items: [
        { id: 1, name: "Wireless Headphones", quantity: 1, price: 129.99 },
        { id: 2, name: "Phone Case", quantity: 1, price: 24.99 },
      ],
      total: 154.98,
      status: "Pending",
      payment: "Credit Card",
      shipping: "Express Shipping",
    },
    {
      id: "#ORD-7841",
      customer: "David Chang",
      email: "david.c@example.com",
      date: "2025-02-19",
      items: [{ id: 3, name: "Smart Watch", quantity: 1, price: 249.99 }],
      total: 249.99,
      status: "Processing",
      payment: "PayPal",
      shipping: "Standard Shipping",
    },
    {
      id: "#ORD-7840",
      customer: "Michael Smith",
      email: "michael.s@example.com",
      date: "2025-02-18",
      items: [
        { id: 4, name: "Bluetooth Speaker", quantity: 1, price: 79.99 },
        { id: 5, name: "Power Bank", quantity: 2, price: 34.99 },
      ],
      total: 149.97,
      status: "Shipped",
      payment: "Credit Card",
      shipping: "Standard Shipping",
    },
    {
      id: "#ORD-7839",
      customer: "Jessica Williams",
      email: "jessica.w@example.com",
      date: "2025-02-18",
      items: [{ id: 6, name: "Laptop Sleeve", quantity: 1, price: 29.99 }],
      total: 29.99,
      status: "Delivered",
      payment: "Credit Card",
      shipping: "Standard Shipping",
    },
    {
      id: "#ORD-7838",
      customer: "Thomas Brown",
      email: "thomas.b@example.com",
      date: "2025-02-17",
      items: [
        { id: 7, name: "Wireless Mouse", quantity: 1, price: 49.99 },
        { id: 8, name: "Keyboard", quantity: 1, price: 69.99 },
      ],
      total: 119.98,
      status: "Delivered",
      payment: "PayPal",
      shipping: "Express Shipping",
    },
    {
      id: "#ORD-7837",
      customer: "Sophia Johnson",
      email: "sophia.j@example.com",
      date: "2025-02-17",
      items: [{ id: 9, name: "Fitness Tracker", quantity: 1, price: 89.99 }],
      total: 89.99,
      status: "Cancelled",
      payment: "Credit Card",
      shipping: "Standard Shipping",
    },
  ];
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

  // Filter orders by search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Today: Feb 19, 2025</span>
        </div>
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
                <Select defaultValue="all">
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
                <Select defaultValue="30">
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
                      <th className="py-3 px-4 text-left font-medium">
                        Total
                      </th>
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
                          key={order.id}
                          className="border-b hover:bg-gray-50 text-left"
                        >
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-gray-500 text-xs">
                              {order.email}
                            </div>
                          </td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">
                            {order.items.length} item(s)
                          </td>
                          <td className="py-3 px-4  font-medium">
                            Rs.{order.total.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Order Details - {order.id}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Placed on {order.date}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h3 className="font-medium">
                                          Customer
                                        </h3>
                                        <p>{order.customer}</p>
                                        <p className="text-sm text-gray-500">
                                          {order.email}
                                        </p>
                                      </div>
                                      <div>
                                        <h3 className="font-medium">
                                          Order Status
                                        </h3>
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                            order.status
                                          )}`}
                                        >
                                          {order.status}
                                        </span>
                                      </div>
                                    </div>

                                    <div>
                                      <h3 className="font-medium mb-2">
                                        Items
                                      </h3>
                                      {order.items.map((item) => (
                                        <div
                                          key={item.id}
                                          className="flex justify-between py-1 border-b"
                                        >
                                          <div>
                                            <span>{item.name} </span>
                                            <span className="text-gray-500">
                                              x{item.quantity}
                                            </span>
                                          </div>
                                          <span>${item.price.toFixed(2)}</span>
                                        </div>
                                      ))}
                                      <div className="flex justify-between mt-2 font-medium">
                                        <span>Total</span>
                                        <span>${order.total.toFixed(2)}</span>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h3 className="font-medium">
                                          Payment Method
                                        </h3>
                                        <p>{order.payment}</p>
                                      </div>
                                      <div>
                                        <h3 className="font-medium">
                                          Shipping Method
                                        </h3>
                                        <p>{order.shipping}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <Select defaultValue={order.status}>
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
                                    <Button>Update Order</Button>
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
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500 mt-1">Requires action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500 mt-1">+1 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Processing Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 days</div>
            <p className="text-xs text-green-500 mt-1">
              -0.3 days from last week
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrdersPage;
