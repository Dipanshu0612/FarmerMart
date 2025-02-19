"use client"

import React, { useState } from "react";
import {
  CheckCircle,
  Save,
  Trash,
  Upload,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

const AddProductPage = () => {
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Beauty",
    "Sports",
    "Toys",
  ];

//   const addVariant = () => {
//     setVariants([
//       ...variants,
//       { id: Date.now(), color: "", size: "", price: "", stock: "" },
//     ]);
//   };

//   const removeVariant = (id) => {
//     setVariants(variants.filter((variant) => variant.id !== id));
//   };

//   const addImage = () => {
//     // In a real app, this would handle file uploads
//     setImages([...images, { id: Date.now(), url: "/api/placeholder/200/200" }]);
//   };

//   const removeImage = (id) => {
//     setImages(images.filter((image) => image.id !== id));
//   };

  const handleSaveProduct = () => {
    setSaving(true);
      // Simulate API call
      setImages([]);
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={handleSaveProduct}
            disabled={saving}
            className="min-w-24"
          >
            {saving ? (
              <span className="flex items-center">Saving...</span>
            ) : saveSuccess ? (
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Saved
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Save className="h-4 w-4" />
                Save Product
              </span>
            )}
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Product has been saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4 text-left">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the core details about your product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name *</Label>
                <Input id="product-name" placeholder="Enter product name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">
                  Product Description *
                </Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe your product in detail..."
                  className="min-h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-category">Category *</Label>
                  <Select>
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price *</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-gray-500 mr-2">
                      Rs. 
                    </span>
                    <Input
                      id="product-price"
                      className="pl-9 ml-2"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>
                Manage your product&apos;s inventory and shipping details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-quantity">Quantity *</Label>
                  <Input id="product-quantity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-location">Stock Location</Label>
                  <Input
                    id="product-location"
                    placeholder="e.g. Warehouse A, Shelf B3"
                  />
                </div>
              </div>

              <Separator className="my-2" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-weight">Weight (kg)</Label>
                  <Input id="product-weight" type="number" placeholder="0.00" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="text-left max-h-fit">
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>
              Upload product photos (max 4 images)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {images.map(() => (
                <div key={"image.id"} className="relative group">
                  <Image
                    src={"image.url"}
                    alt="Product"
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <button
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    //   onClick={() => removeImage(image.id)}
                  >
                    <Trash className="h-3 w-3 text-red-500" />
                  </button>
                </div>
              ))}

              {images.length < 8 && (
                <button
                  // onClick={addImage}
                  className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 transition-colors"
                >
                  <Upload className="h-5 w-5 mb-1" />
                  <span className="text-xs">Upload</span>
                </button>
              )}
            </div>

            <div className="text-xs text-gray-500">
              <p>Supported formats: JPG, PNG, GIF</p>
              <p>First image will be used as product thumbnail</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProductPage;
