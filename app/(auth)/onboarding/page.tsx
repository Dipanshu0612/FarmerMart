"use client";

import { useUser } from "@clerk/nextjs";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Sprout, ShoppingBasket } from "lucide-react";
import Image from "next/image";

export default function OnboardingPage() {
  const { user } = useUser();
  const [role, setRole] = useState("user");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await user?.update({
        unsafeMetadata: {
          role: role,
        },
      });
      window.location.href = role === "seller" ? "/seller" : "/";
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="flex items-center justify-around min-h-screen p-4 w-full">
      <div className="w-[50%]">
        <Image src="/Onboarding.png" alt="Onboarding" width={800} height={200} />
      </div>
      <div className="w-[50%] max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800">
            Welcome to FarmerMart
          </h1>
          <p className="text-gray-600 mt-2">
            Connect farmers with customers for fresh, local produce
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Tell us how you&apos;d like to use FarmerMart so we can personalize
              your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} id="onboarding-form">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="role-select"
                    className="text-base font-medium"
                  >
                    How will you use FarmerMart?
                  </Label>

                  <RadioGroup
                    value={role}
                    onValueChange={setRole}
                    className="mt-4 space-y-4"
                  >
                    <div
                      className={`flex items-start space-x-4 rounded-lg border p-4 cursor-pointer transition-all ${
                        role === "user"
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem
                        value="user"
                        id="user-option"
                        className="mt-1"
                      />
                      <div className="flex flex-1 items-start space-x-3">
                        <ShoppingBasket className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <Label
                            htmlFor="user-option"
                            className="text-base font-medium cursor-pointer"
                          >
                            Customer
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I want to browse and purchase fresh produce directly
                            from local farmers
                          </p>
                          {role === "user" && (
                            <div className="mt-2 flex items-center text-sm text-blue-600">
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Get access to weekly fresh produce and seasonal
                              specials
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex items-start space-x-4 rounded-lg border p-4 cursor-pointer transition-all ${
                        role === "seller"
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem
                        value="seller"
                        id="seller-option"
                        className="mt-1"
                      />
                      <div className="flex flex-1 items-start space-x-3">
                        <Sprout className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <Label
                            htmlFor="seller-option"
                            className="text-base font-medium cursor-pointer"
                          >
                            Farmer / Seller
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I want to sell my farm products directly to
                            customers
                          </p>
                          {role === "seller" && (
                            <div className="mt-2 flex items-center text-sm text-blue-600">
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Manage you products, see orders and reach out local buyers!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              form="onboarding-form"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Continue as {role === "seller" ? "Farmer" : "Customer"}
            </Button>
            <p className="text-xs text-center text-gray-500">
              You can change your account type later in your profile settings
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
