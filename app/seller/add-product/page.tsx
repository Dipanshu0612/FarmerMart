/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CheckCircle, Save, Trash, Upload } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { toast } from "sonner";

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Product name is required"),
  description: Yup.string()
    .min(10, "Description too short!")
    .required("Description is required"),
  category: Yup.string().required("Category is required"),
  original_price: Yup.number()
    .min(0, "Price must be greater than 0")
    .required("Price is required"),
  selling_price: Yup.number()
    .min(0, "Price must be greater than 0")
    .required("Price is required"),
  quantity: Yup.number()
    .min(0, "Quantity must be greater than 0")
    .required("Quantity is required"),
  location: Yup.string().required("Please specify the location of the product"),
  weight: Yup.number().min(0, "Weight must be greater than or equal to 0").required("Weight is required"),
  product_images: Yup.array().min(1,"Atleast one image is required").max(4,"Maximum of 4 images are allowed!").required("At least one image is required!"),
});

const AddProductPage = () => {
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = [
    "Fruits",
    "Vegetables",
    "Cereals",
    "Dairy",
    "Meat",
    "Fish",
  ];

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const files = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);
    setFieldValue("product_images", newFiles);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    const updatedPreviewUrls = [...previewUrls, ...newPreviewUrls];
    setPreviewUrls(updatedPreviewUrls);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number, setFieldValue: any) => {
    const urlToRemove = previewUrls[index];
    if (urlToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(urlToRemove);
    }

    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);

    setSelectedFiles(newSelectedFiles);
    setPreviewUrls(newPreviewUrls);
    setFieldValue("product_images", newSelectedFiles);
  };

  const handleSaveProduct = async (values: any, { resetForm }: { resetForm: () => void }) => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key !== "product_images") {
          formData.append(key, values[key]);
        }
      });

      const uploadedImageUrls = await Promise.all(
        values.product_images?.map(async (file: File) => {
          const newFormData = new FormData();
          newFormData.append("image", file);
          if (!process.env.NEXT_PUBLIC_IMGDB_API_KEY) {
            throw new Error("IMGDB API key is not defined");
          }
          newFormData.append("key", process.env.NEXT_PUBLIC_IMGDB_API_KEY);

          const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: newFormData,
          });

          const data = await response.json();
          if (!data.success) {
            throw new Error(
              `Failed to upload image: ${
                data.error?.message || "Unknown error"
              }`
            );
          }
          return data.data.display_url;
        })
      );
      formData.append("product_images", JSON.stringify(uploadedImageUrls));

      const res = await fetch("/api/seller/add-product", {
        method: "POST",
        body: formData
      })

      if (res.redirected) {
        window.location.href = res.url;
        return;
      }
      if (!res.ok) {
        toast.error("Could not add product!");
      }
      toast.success("Product added Successfully!");
      resetForm(); 
      setPreviewUrls([]);
      setSelectedFiles([]);
      setSaving(false);
      
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <Formik
        initialValues={{
          name: "",
          description: "",
          category: "",
          original_price: "",
          selling_price: "",
          quantity: "",
          location: "",
          weight: "",
          product_images: [],
        }}
        validationSchema={ProductSchema}
        onSubmit={handleSaveProduct}
      >
        {({
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          setFieldValue,
        }) => (
          <Form className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-blue-950">
                Add New Product
              </h1>
              <div className="flex items-center space-x-3">
                <Button
                  type="submit"
                  disabled={saving || isSubmitting}
                  className="min-w-24 mybutton !mt-0"
                >
                  {saving ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      Updating...
                    </>
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
                    <CardTitle className="">Basic Information</CardTitle>
                    <CardDescription>
                      Enter the core details about your product
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter product name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500 text-sm">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Product Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your product in detail..."
                        className="min-h-32 resize-none"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                      {errors.description && touched.description && (
                        <div className="text-red-500 text-sm">
                          {errors.description}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          name="category"
                          onValueChange={(value) => {
                            handleChange({
                              target: { name: "category", value },
                            });
                          }}
                        >
                          <SelectTrigger id="category">
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
                        {errors.category && touched.category && (
                          <div className="text-red-500 text-sm">
                            {errors.category}
                          </div>
                        )}
                      </div>
                      <div></div>
                      <div className="space-y-2">
                        <Label htmlFor="original_price">Original Price *</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 mr-2">
                            Rs.
                          </span>
                          <Input
                            id="original_price"
                            name="original_price"
                            className="pl-9"
                            placeholder="0.00"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.original_price}
                          />
                        </div>
                        {errors.original_price && touched.original_price && (
                          <div className="text-red-500 text-sm">
                            {errors.original_price}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="selling_price">Selling Price *</Label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 mr-2">
                            Rs.
                          </span>
                          <Input
                            id="selling_price"
                            name="selling_price"
                            className="pl-9"
                            placeholder="0.00"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.selling_price}
                          />
                        </div>
                        {errors.selling_price && touched.selling_price && (
                          <div className="text-red-500 text-sm">
                            {errors.selling_price}
                          </div>
                        )}
                      </div>
                    </div>
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
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          placeholder="0"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantity}
                        />
                        {errors.quantity && touched.quantity && (
                          <div className="text-red-500 text-sm">
                            {errors.quantity}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="e.g. Warehouse A, Shelf B3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.location}
                        />
                        {errors.quantity && touched.quantity && (
                          <div className="text-red-500 text-sm">
                            {errors.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="my-2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          placeholder="0.00"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.weight}
                        />
                        {errors.weight && touched.weight && (
                          <div className="text-red-500 text-sm">
                            {errors.weight}
                          </div>
                        )}
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
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-[15rem] h-[8rem] object-cover rounded-md border"
                          width={0}
                          height={0}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, setFieldValue)}
                          className="absolute top-1 right-1 bg-white rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ))}

                    {previewUrls.length < 4 && (
                      <label className="relative cursor-pointer">
                        <div className="h-32 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <div className="text-center flex flex-col items-center justify-center">
                            <Upload className="h-5 w-5 mb-1" />
                            <span className="mt-2 block text-sm font-semibold text-gray-600">
                              Add Image
                            </span>
                          </div>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileSelect(e, setFieldValue)}
                        />
                      </label>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    <p>Supported formats: JPG, PNG</p>
                    <p>First image will be used as product thumbnail</p>
                  </div>
                  {errors.quantity && touched.quantity && (
                    <div className="text-red-500 text-sm">
                      {errors.product_images}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductPage;
