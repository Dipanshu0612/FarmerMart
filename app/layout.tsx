import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ClerkProvider,
} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "D's Local Farmers Marketplace",
  description:
    "An E-Commerce NextJs project where users can browse and shop products from local farmers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
