"use client"
import React from "react";
import { Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-gray-900">500</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Something Went Wrong
        </h2>
        <p className="mt-4 text-gray-600">
          Our team has been notified and will be working to resolve this issue as soon as possible!
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="mybutton inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
