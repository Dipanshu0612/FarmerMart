"use client";

import React, { useState } from "react";
import { Edit, Search, Trash2, Plus, Filter } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DeletePopup from "@/components/DeletePopup";

const SellerProductsPage = ({ products }: { products: ProductType[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingAvailability, setUpdatingAvailability] = useState<
    string | null
        >(null);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
  const router = useRouter();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      (product.title ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      (product.category ?? "").toLowerCase() === categoryFilter.toLowerCase();

    // const stockStatus = getStockStatus(product.quantity ?? 0);
    // const matchesStock =
    //   stockFilter === "all" ||
    //   (stockFilter === "out" && product.quantity === 0) ||
    //   (stockFilter === "low" && product.quantity < 10) ||
    //   (stockFilter === "in" && product.quantity >= 10);

    return matchesSearch && matchesCategory;
  });

  const deleteProduct = async (product_id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/seller/delete-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id }),
      });

      if (!res.ok) {
        toast.error("Failed to delete product!");
        return;
      }

      const data = await res.json();
      if (data.success) {
        router.refresh();
        toast.success("Product deleted successfully!");
      }
    } finally {
      setIsDeleting(false);
    }
  };
  const toggleAvailability = async (
    product_id: string,
    currentAvailability: boolean
  ) => {
    setUpdatingAvailability(product_id);
    try {
      const res = await fetch(`/api/seller/update-product-toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          availability: !currentAvailability,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to update product availability!");
        return;
      }

      const data = await res.json();
      if (data.success) {
        router.refresh();
        toast.success("Product availability updated successfully!");
      }
    } finally {
      setUpdatingAvailability(null);
    }
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Button className="mybutton !mt-0">
          <Plus className="h-4 w-4 mr-2" />
          <Link href="/seller/add-product">Add New Product</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>
            View and manage your product inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center w-full md:w-1/2 relative">
                <Search className="absolute left-2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products by name or description..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={categoryFilter}
                  onValueChange={(value) => setCategoryFilter(value)}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="home">Home & Living</SelectItem>
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
                    <tr className="bg-gray-50 border-b text-left">
                      <th className="py-3 px-4 text-left font-medium">
                        Product Image
                      </th>
                      <th className="py-3 px-4 text-left font-medium">
                        Product Title
                      </th>
                      <th className="py-3 px-4 text-left font-medium">
                        Category
                      </th>
                      <th className="py-3 px-4 text-left font-medium">Price</th>
                      <th className="py-3 px-4 text-left font-medium">
                        Available
                      </th>

                      <th className="py-3 px-4 text-center font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      <>
                        {filteredProducts.map((product) => (
                          <tr
                            key={product._id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Image
                                  src={
                                    product.media?.[0] ??
                                    "/placeholder-image.png"
                                  }
                                  alt={product.title || "Product"}
                                  className="h-20 w-32 rounded-md object-cover"
                                  width={500}
                                  height={500}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-col text-left px-4">
                                <div className="font-medium">
                                  {product.title}
                                </div>
                                <div className="text-gray-500 text-xs truncate w-48">
                                  {product.description}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-left">
                              {product.category?.charAt(0).toUpperCase() +
                                "" +
                                product.category?.slice(1)}
                            </td>
                            <td className="py-3 px-4 text-left">
                              Rs. {(product.selling_price ?? 0).toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center">
                                <Switch
                                  checked={product.availability ?? false}
                                  onCheckedChange={() =>
                                    toggleAvailability(
                                      product._id ?? "",
                                      product.availability ?? false
                                    )
                                  }
                                  disabled={
                                    updatingAvailability === product._id
                                  }
                                  className={
                                    updatingAvailability === product._id
                                      ? "opacity-50"
                                      : "text-blue-300"
                                  }
                                />
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => alert("Not Implemented Yet!")}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>{
                                      setProductToDelete(product._id ?? "");
                              setShowDeletePopup(true);
                                  }
                                    
                                  }
                                  disabled={isDeleting}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  {isDeleting ? (
                                    <>
                                      <span className="animate-spin mr-2">
                                        ◌
                                      </span>
                                    </>
                                  ) : (
                                    <Trash2 className="h-4 w-4 text-white" />
                                  )}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        <DeletePopup
                          isOpen={showDeletePopup}
                          onClose={() => {
                            setShowDeletePopup(false);
                            setProductToDelete(null);
                          }}
                          onConfirm={() => {
                            if (productToDelete) {
                              deleteProduct(
                                productToDelete,
                    )}
                          }}
                        />
                      </>
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-gray-500"
                        >
                          No products found matching your search criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing 1-{filteredProducts.length} of {filteredProducts.length}{" "}
                products
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
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                products.filter(
                  (product) =>
                    (product.quantity ?? 0) > 0 && (product.quantity ?? 0) < 10
                ).length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Out of Stock Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter((product) => product.quantity === 0).length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerProductsPage;
